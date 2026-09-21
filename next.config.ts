import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/Cardboardbox", destination: "/cardboardbox", permanent: true },
      { source: "/Booklet", destination: "/booklet", permanent: true },
      { source: "/Sticker", destination: "/sticker", permanent: true },
      { source: "/products", destination: "/katalog", permanent: true },
      { source: "/info", destination: "/o-kompanii", permanent: true },
      { source: "/delivery", destination: "/dostavka", permanent: true },
      { source: "/payment", destination: "/oplata", permanent: true },
      { source: "/contacts", destination: "/kontakty", permanent: true },
      { source: "/news", destination: "/novosti", permanent: true },
      { source: "/thanks", destination: "/spasibo", permanent: true },
    ];
  },
};

export default nextConfig;
