/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve Node.js built-in modules on the client side
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        path: false,
        crypto: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
        util: false,
        url: false,
        querystring: false,
        os: false,
      };
      
      // Mark problematic packages as external on the client side
      config.externals.push({
        'pg': 'commonjs pg',
        'pg-hstore': 'commonjs pg-hstore',
        '@neondatabase/serverless': 'commonjs @neondatabase/serverless',
        'postgres': 'commonjs postgres',
        'better-sqlite3': 'commonjs better-sqlite3',
        'sqlite3': 'commonjs sqlite3',
        'mysql2': 'commonjs mysql2',
      });
    }
    return config;
  },
};

export default nextConfig;