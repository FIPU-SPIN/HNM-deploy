import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the EC2 public IP to request /_next/* dev resources cross-origin.
  allowedDevOrigins: ["16.192.20.160"],
};

export default nextConfig;
