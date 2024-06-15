/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  basePath: "/story",
  async rewrites() {
    return [
      {
        source: "/game",
        destination: "https://choosetale-game.vercel.app",
      },
      {
        source: "/game/:path*",
        destination: "https://choosetale-game.vercel.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
