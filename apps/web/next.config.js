/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
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
      {
        source: "/story",
        destination: "https://choosetale-storybuilder.vercel.app",
      },
      {
        source: "/story/:path*",
        destination: "https://choosetale-storybuilder.vercel.app/:path*",
      },
      {
        source: "/google",
        destination: "https://www.google.com",
      },
    ];
  },
};

module.exports = nextConfig;
