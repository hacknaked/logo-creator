export const BUNNY_ACCESS_KEY = env('BUNNY_ACCESS_KEY')
export const BUNNY_HOSTNAME = env('BUNNY_HOSTNAME', 'ny.storage.bunnycdn.com')
export const BUNNY_STORAGE_ZONE = env('BUNNY_STORAGE_ZONE', 'us-newyork')
export const CDN_PUBLIC_URL = env('CDN_PUBLIC_URL', 'https://astonap.b-cdn.net')
export const DATABASE_URL = env('DATABASE_URL', 'file:./dev.sqlite')
export const STABILITY_API_KEY = env('STABILITY_API_KEY')

/**
 * Helper private function that retrieves the value of the specified
 * environment variable.
 */
function env(varName: string, defaultValue: string | number = null): string {
  if (varName in process.env) {
    return String(process.env[varName])
  }
  if (defaultValue !== null) {
    return String(defaultValue)
  }
  throw new Error(`Environment missing variable '${varName}'`)
}
