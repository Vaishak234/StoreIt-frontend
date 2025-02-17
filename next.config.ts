import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 webpack: (config) => {
    config.resolve.fallback = { canvas: false }; // Prevents canvas import errors
    return config;
  },
  images: {
    domains: ['stackup-bucket.s3.ap-south-1.amazonaws.com']
  },

};

export default nextConfig;


