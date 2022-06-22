// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

// module.exports = {
//   images: {
//     domains: ["rickandmortyapi.com"],
//   },
// };

const withPWA = require('next-pwa');

module.exports = withPWA({
  images: {
    domains: ["rickandmortyapi.com"],
  },
  pwa: {
    dest: 'public',
    swSrc: 'service-worker.js',
  },
});
