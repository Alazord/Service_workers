importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js');
importScripts('https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js');

var CACHE_NAME = 'main-cache-v1';
var urlsToCache = [
  // '/index.html',
];

// Init indexedDB using idb-keyval, https://github.com/jakearchibald/idb-keyval
const store = new idbKeyval.Store('GraphQL-Cache', 'PostResponses');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

// Workbox with custom handler to use IndexedDB for cache.
workbox.routing.registerRoute(
  new RegExp('https://rickandmortyapi.com/graphql(/)?'),
  // Uncomment below to see the error thrown from Cache Storage API.
  //workbox.strategies.staleWhileRevalidate(),
  async ({
    event
  }) => {
    return staleWhileRevalidate(event);
  },
  'POST'
);

/*
// When installing SW.
self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});
*/

// Return cached response when possible, and fetch new results from server in
// the background and update the cache.
self.addEventListener('fetch', async (event) => {
  if (event.request.method === 'POST') {
    event.respondWith(staleWhileRevalidate(event));
  }

  // TODO: Handles other types of requests.
});

async function staleWhileRevalidate(event) {
  let promise = null;
  let cachedResponse = await getCache(event.request.clone());
  let fetchPromise = fetch(event.request.clone())
    .then((response) => {
      setCache(event.request.clone(), response.clone());
      return response;
    })
    .catch((err) => {
      console.error(err);
    });
  return cachedResponse ? Promise.resolve(cachedResponse) : fetchPromise;
}

async function serializeResponse(response) {
  let serializedHeaders = {};
  for (var entry of response.headers.entries()) {
    serializedHeaders[entry[0]] = entry[1];
  }
  let serialized = {
    headers: serializedHeaders,
    status: response.status,
    statusText: response.statusText
  };
  serialized.body = await response.json();
  return serialized;
}

async function setCache(request, response) {
  var key, data;
  let body = await request.json();
  let id = CryptoJS.MD5(body.query).toString();

  var entry = {
    query: body.query,
    response: await serializeResponse(response),
    timestamp: Date.now()
  };
  idbKeyval.set(id, entry, store);
}

async function getCache(request) {
  let data;
  try {
    let body = await request.json();
    let id = CryptoJS.MD5(body.query).toString();
    data = await idbKeyval.get(id, store);
    if (!data) return null;

    // Check cache max age.
    let cacheControl = request.headers.get('Cache-Control');
    let maxAge = cacheControl ? parseInt(cacheControl.split('=')[1]) : 3600;
    if (Date.now() - data.timestamp > maxAge * 1000) {
      console.log(`Cache expired. Load from API endpoint.`);
      return null;
    }

    console.log(`Load response from cache.`);
    return new Response(JSON.stringify(data.response.body), data.response);
  } catch (err) {
    return null;
  }
}

async function getPostKey(request) {
  let body = await request.json();
  return JSON.stringify(body);
}


import { skipWaiting, clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { NetworkOnly, NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute, setDefaultHandler, setCatchHandler } from 'workbox-routing';
import { matchPrecache, precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

skipWaiting();
clientsClaim();

const WB_MANIFEST = self.__WB_MANIFEST;
WB_MANIFEST.push({
  url: '/fallback',
  revision: '1234567890',
});
precacheAndRoute(WB_MANIFEST);

cleanupOutdatedCaches();
registerRoute(
  '/',
  new NetworkFirst({
    cacheName: 'start-url',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);
registerRoute(
  /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
  new NetworkFirst({
    cacheName: 'google-fonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 4,
        maxAgeSeconds: 31536e3,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);
registerRoute(
  /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
  new NetworkFirst({
    cacheName: 'static-font-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 4,
        maxAgeSeconds: 604800,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);
registerRoute(
  /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
  new NetworkFirst({
    cacheName: 'static-image-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 64,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);
registerRoute(
  /\.(?:js)$/i,
  new NetworkFirst({
    cacheName: 'static-js-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);
registerRoute(
  /\.(?:css|less)$/i,
  new NetworkFirst({
    cacheName: 'static-style-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);
registerRoute(
  /\.(?:json|xml|csv)$/i,
  new NetworkFirst({
    cacheName: 'static-data-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);
registerRoute(
  /\/api\/.*$/i,
  new NetworkFirst({
    cacheName: 'apis',
    networkTimeoutSeconds: 10,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 16,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);
registerRoute(
  /.*/i,
  new NetworkFirst({
    cacheName: 'others',
    networkTimeoutSeconds: 10,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);

setDefaultHandler(new NetworkFirst());
setCatchHandler(({ event }) => {
  switch (event.request.destination) {
    case 'document':
    case 'image':
    case 'font':
        return matchPrecache('/fallback');
    default:
      // If we don't have a fallback, just return an error response.
      return Response.error();
  }
});