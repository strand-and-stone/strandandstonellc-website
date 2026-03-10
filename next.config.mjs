/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.strandandstonellc.com" }],
        destination: "https://strandandstonellc.com/:path*",
        permanent: true, // 308 permanent redirect — correct for SEO
      },
    ];
  },
};

export default nextConfig;
