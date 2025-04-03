import { LRUCache } from "lru-cache"

// Update the CacheOptions type to better match LRUCache's expected types
type CacheOptions = {
  max?: number
  ttl?: number // Time to live in milliseconds
  updateAgeOnGet?: boolean
  ttlAutopurge?: boolean
}

// Update the defaultOptions to ensure ttl is always defined
const defaultOptions = {
  max: 500, // Maximum number of items
  ttl: 1000 * 60 * 5, // 5 minutes default TTL
  updateAgeOnGet: true, // Reset TTL when item is accessed
  ttlAutopurge: true, // Automatically purge expired items
} as const

// Define the cache key type
export type CacheKey = string

// Create a singleton cache instance
const globalCache = new LRUCache<CacheKey, any>(defaultOptions)

// Cache manager class for creating namespaced caches
export class CacheManager {
  private cache: LRUCache<CacheKey, any>
  private namespace: string

  // Update the constructor to properly handle options
  constructor(namespace: string, options: Partial<CacheOptions> = {}) {
    this.namespace = namespace
    this.cache = globalCache
  }

  // Generate a namespaced key
  private getNamespacedKey(key: CacheKey): string {
    return `${this.namespace}:${key}`
  }

  // Update the set method to handle ttl properly
  set(key: CacheKey, value: any, ttl?: number): void {
    const namespacedKey = this.getNamespacedKey(key)
    if (ttl !== undefined) {
      this.cache.set(namespacedKey, value, { ttl })
    } else {
      this.cache.set(namespacedKey, value)
    }
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

  // Update the getOrCompute method to handle ttl properly
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
    if (ttl !== undefined) {
      this.cache.set(namespacedKey, computedValue, { ttl })
    } else {
      this.cache.set(namespacedKey, computedValue)
    }

    return computedValue
  }
}

// Create cache instances for different parts of the application
export const userCache = new CacheManager("users")
export const medicalCaseCache = new CacheManager("medical-cases")
// Update the regionCache and systemSettingsCache definitions
export const regionCache = new CacheManager("regions")
export const systemSettingsCache = new CacheManager("system-settings")
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

