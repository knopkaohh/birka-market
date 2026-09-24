import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: [
    "127.0.0.1",
    "*.trycloudflare.com",
    "**.trycloudflare.com",
    "*.cursor.com",
    "**.cursor.com",
    "*.cursor.sh",
    "**.cursor.sh",
    "*.cursor.app",
    "**.cursor.app",
    "*.on-cursor.com",
    "**.on-cursor.com",
    "*.ngrok.io",
    "**.ngrok.io",
    "*.ngrok-free.app",
    "**.ngrok-free.app",
    "*.loca.lt",
    "**.loca.lt",
    ...(process.env.ALLOWED_DEV_ORIGINS?.split(",").map((item) => item.trim()).filter(Boolean) ?? []),
  ],
  async redirects() {
    return [
      { source: "/products", destination: "/katalog", permanent: true },
      { source: "/info", destination: "/o-kompanii", permanent: true },
      { source: "/delivery", destination: "/dostavka", permanent: true },
      { source: "/payment", destination: "/oplata", permanent: true },
      { source: "/contacts", destination: "/kontakty", permanent: true },
      { source: "/news", destination: "/novosti", permanent: true },
      { source: "/news/:path*", destination: "/novosti", permanent: true },
      { source: "/thanks", destination: "/spasibo", permanent: true },
      { source: "/sayty", destination: "/razrabotka-saytov", permanent: true },
      { source: "/landing", destination: "/lending", permanent: true },
      { source: "/landing-page", destination: "/lending", permanent: true },
    ];
  },
};

export default nextConfig;
