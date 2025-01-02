// next.config.js
const nextConfig = {
  // output: "export", // この行を削除またはコメントアウト
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;