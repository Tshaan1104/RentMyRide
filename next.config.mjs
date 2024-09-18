/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "static.vecteezy.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "qgczojvqewinpiarilqo.supabase.co",
        protocol: "https",
        port: "",
      },
      {
        hostname: "w7.pngwing.com",
        protocol: "https",
        port: "",
      },
      
    ],
  },
};

export default nextConfig;
