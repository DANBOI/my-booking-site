/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
    ],
    // for dynamic srcs
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "**",
    //   },
    // ],
  },
};

module.exports = nextConfig;
