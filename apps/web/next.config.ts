import type { NextConfig } from 'next';
import path from 'path';
import fs from 'fs';

// Read TypeScript config to get path mappings
function getTsConfigPaths() {
  const tsConfigPath = path.resolve(__dirname, '../../tsconfig.base.json');
  const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
  const paths = tsConfig.compilerOptions?.paths || {};

  // Convert TypeScript paths to aliases
  const aliases: Record<string, string> = {};

  Object.entries(paths).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      // Remove the /* from the key and the first path value
      const aliasKey = key.replace('/*', '');
      const aliasPath = (value[0] as string).replace('/*', '');
      aliases[aliasKey] = path.resolve(__dirname, '../../', aliasPath);
    }
  });

  return aliases;
}

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true, // Allow imports from outside the app directory
    // Turbopack configuration
    turbo: {
      resolveAlias: getTsConfigPaths(),
    },
  },
  // Webpack configuration (for builds when not using Turbopack)
  webpack: (config, { dev }) => {
    // Add path aliases from TypeScript config
    config.resolve.alias = {
      ...config.resolve.alias,
      ...getTsConfigPaths(),
    };

    // Improve file watching in Docker (only for webpack)
    if (dev) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300, // Delay before rebuilding
        ignored: /node_modules/,
      };
    }

    return config;
  },

  // Enable fast refresh and improve development experience
  reactStrictMode: true,

  // Optimize for development
  ...(process.env.NODE_ENV === 'development' && {
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    },
  }),
};

export default nextConfig;
