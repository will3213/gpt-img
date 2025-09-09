import { NextRequest, NextResponse } from 'next/server';
import { ipRateLimiter, minuteRateLimiter, getClientIP, isIPBlacklisted } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    // 获取客户端IP
    const clientIP = getClientIP(request);
    
    // 检查IP黑名单
    if (isIPBlacklisted(clientIP)) {
      return NextResponse.json(
        { error: 'Access denied.' },
        { status: 403 }
      );
    }
    
    // 应用限流规则
    if (!minuteRateLimiter.isAllowed(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait 1 minute before trying again.' },
        { status: 429 }
      );
    }
    
    if (!ipRateLimiter.isAllowed(clientIP)) {
      return NextResponse.json(
        { error: 'Hourly limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Invalid prompt provided' },
        { status: 400 }
      );
    }

    if (prompt.length > 500) {
      return NextResponse.json(
        { error: 'Prompt too long. Maximum 500 characters allowed.' },
        { status: 400 }
      );
    }

    const rapidApiKey = process.env.RAPIDAPI_KEY;
    const rapidApiHost = process.env.RAPIDAPI_HOST;

    if (!rapidApiKey || !rapidApiHost) {
      console.error('Missing RapidAPI configuration');
      return NextResponse.json(
        { error: 'Service configuration error' },
        { status: 500 }
      );
    }

    const response = await fetch('https://gemini-2-5-flash-image-nano-banana.p.rapidapi.com/nano-banana', {
      method: 'POST',
      headers: {
        'x-rapidapi-key': rapidApiKey,
        'x-rapidapi-host': rapidApiHost,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt.trim() }),
    });

    if (!response.ok) {
      console.error('RapidAPI request failed:', response.status, response.statusText);
      
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'API rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
      
      return NextResponse.json(
        { error: 'Image generation service temporarily unavailable' },
        { status: 503 }
      );
    }

    // Check if the response is an image (binary data)
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.startsWith('image/')) {
      // Response is binary image data, convert to base64
      const buffer = await response.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      const dataUrl = `data:${contentType};base64,${base64}`;
      
      return NextResponse.json({
        success: true,
        imageUrl: dataUrl,
        prompt: prompt.trim()
      });
    } else {
      // Response should be JSON
      const data = await response.json();
      
      if (!data || !data.image_url) {
        console.error('Invalid response from RapidAPI:', data);
        return NextResponse.json(
          { error: 'Failed to generate image' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        imageUrl: data.image_url,
        prompt: prompt.trim()
      });
    }

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}