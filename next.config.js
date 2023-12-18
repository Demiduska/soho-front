/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sohopublic.s3.eu-north-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
      },

      use: ["@svgr/webpack"],
    });

    return config;
  },
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "en",
    localeDetection: true,
  },
  output: "standalone",
  experimental: {
    //largePageDataBytes: 128 * 1000, // 128KB by default
    largePageDataBytes: 128 * 100000,
  },
};

module.exports = nextConfig;
