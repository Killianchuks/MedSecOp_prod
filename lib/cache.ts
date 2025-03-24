import { LRUCache } from "lru-cache"

// Define cache options type
type CacheOptions = {
  max?: number
  ttl?: number // Time to live in milliseconds
  updateAgeOnGet?: boolean
}

// Define the cache key type
export type CacheKey = string

// Create a default cache instance
const defaultOptions: CacheOptions = {
  max: 500, // Maximum number of items
  ttl: 1000 * 60 * 5, // 5 minutes default TTL
  updateAgeOnGet: true, // Reset TTL when item is accessed
}

// Create a singleton cache instance
const globalCache = new LRUCache<CacheKey, any>(defaultOptions)

// Cache manager class for creating namespaced caches
export class CacheManager {
  private cache: LRUCache<CacheKey, any>
  private namespace: string

  constructor(namespace: string, options: CacheOptions = {}) {
    this.namespace = namespace
    this.cache = globalCache
  }

  // Generate a namespaced key
  private getNamespacedKey(key: CacheKey): string {
    return `${this.namespace}:${key}`
  }

  // Set a value in the cache
  set(key: CacheKey, value: any, ttl?: number): void {
    const namespacedKey = this.getNamespacedKey(key)
    this.cache.set(namespacedKey, value, ttl ? { ttl } : undefined)
  }

  // Get a value from the cache
  get<T>(key: CacheKey): T | undefined {
    const namespacedKey = this.getNamespacedKey(key)
    return this.cache.get(namespacedKey) as T | undefined
  }

  // Check if a key exists in the cache
  has(key: CacheKey): boolean {
    const namespacedKey = this.getNamespacedKey(key)
    return this.cache.has(namespacedKey)
  }

  // Delete a key from the cache
  delete(key: CacheKey): void {
    const namespacedKey = this.getNamespacedKey(key)
    this.cache.delete(namespacedKey)
  }

  // Clear all keys in this namespace
  clear(): void {
    const namespacedPrefix = `${this.namespace}:`
    for (const key of this.cache.keys()) {
      if (key.startsWith(namespacedPrefix)) {
        this.cache.delete(key)
      }
    }
  }

  // Get a value from cache or compute it if not present
  async getOrCompute<T>(key: CacheKey, compute: () => Promise<T>, ttl?: number): Promise<T> {
    const namespacedKey = this.getNamespacedKey(key)

    // Check if value exists in cache
    const cachedValue = this.cache.get(namespacedKey) as T | undefined
    if (cachedValue !== undefined) {
      return cachedValue
    }

    // Compute the value
    const computedValue = await compute()

    // Store in cache
    this.cache.set(namespacedKey, computedValue, ttl ? { ttl } : undefined)

    return computedValue
  }
}

// Create cache instances for different parts of the application
export const userCache = new CacheManager("users")
export const medicalCaseCache = new CacheManager("medical-cases")
export const regionCache = new CacheManager("regions", {
  ttl: 1000 * 60 * 60 * 24, // 24 hours TTL for region data
})
export const systemSettingsCache = new CacheManager("system-settings", {
  ttl: 1000 * 60 * 30, // 30 minutes TTL for system settings
})
export const doctorCache = new CacheManager("doctors")
export const patientCache = new CacheManager("patients")

// Function to invalidate caches when data changes
export function invalidateRelatedCaches(entity: string, id: string): void {
  switch (entity) {
    case "user":
      userCache.delete(id)
      doctorCache.delete(id)
      patientCache.delete(id)
      break
    case "medical-case":
      medicalCaseCache.delete(id)
      // Also invalidate related user caches
      break
    case "system-settings":
      systemSettingsCache.clear()
      break
    default:
      // No specific cache to invalidate
      break
  }
}

