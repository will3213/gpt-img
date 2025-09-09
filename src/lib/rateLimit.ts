// 简单的内存限流器
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // 获取该标识符的请求记录
    const requests = this.requests.get(identifier) || [];

    // 清理过期的请求记录
    const validRequests = requests.filter(time => time > windowStart);

    // 检查是否超过限制
    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    // 记录新请求
    validRequests.push(now);
    this.requests.set(identifier, validRequests);

    return true;
  }

  // 清理过期数据（定期调用）
  cleanup(): void {
    const now = Date.now();
    for (const [identifier, requests] of this.requests.entries()) {
      const validRequests = requests.filter(time => time > now - this.windowMs);
      if (validRequests.length === 0) {
        this.requests.delete(identifier);
      } else {
        this.requests.set(identifier, validRequests);
      }
    }
  }
}

// 全局限流器实例
// IP级别：每小时最多10次请求  
export const ipRateLimiter = new RateLimiter(10, 60 * 60 * 1000);

// 每分钟限流：防止快速请求
export const minuteRateLimiter = new RateLimiter(2, 60 * 1000);

// 获取客户端IP
export function getClientIP(req: Request): string {
  // 优先从 x-forwarded-for 获取（适用于代理/CDN）
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  // 其他常见的代理头
  const realIP = req.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  const cfConnectingIP = req.headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // 如果都没有，返回默认值（本地开发）
  return '127.0.0.1';
}

// IP黑名单（可以从环境变量或数据库加载）
const BLACKLISTED_IPS = new Set<string>([
  // 添加需要封禁的IP地址
  // '192.168.1.100',
  // '10.0.0.50'
]);

// 检查IP是否在黑名单中
export function isIPBlacklisted(ip: string): boolean {
  return BLACKLISTED_IPS.has(ip);
}

// 添加IP到黑名单
export function addToBlacklist(ip: string): void {
  BLACKLISTED_IPS.add(ip);
  console.log(`IP ${ip} added to blacklist`);
}

// 从黑名单移除IP
export function removeFromBlacklist(ip: string): void {
  BLACKLISTED_IPS.delete(ip);
  console.log(`IP ${ip} removed from blacklist`);
}

// 定期清理过期数据
setInterval(() => {
  ipRateLimiter.cleanup();
  minuteRateLimiter.cleanup();
}, 5 * 60 * 1000); // 每5分钟清理一次