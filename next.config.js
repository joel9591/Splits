/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "x-middleware-rewrite",
            value: "/",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
