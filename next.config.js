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
