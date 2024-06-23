/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  async rewrites() {
    return [
      {
        source: "/tale",
        destination: "https://choosetale-tale.vercel.app",
      },
      {
        source: "/tale/:path*",
        destination: "https://choosetale-tale.vercel.app/:path*",
      },
      {
        source: "/gamebuilder",
        destination: "https://choosetale-gamebuilder.vercel.app",
      },
      {
        source: "/gamebuilder/:path*",
        destination: "https://choosetale-gamebuilder.vercel.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
