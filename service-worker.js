importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js"
);
importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js"
);
importScripts(
  "https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js"
);

import { skipWaiting, clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import {
  NetworkOnly,
  NetworkFirst,
  CacheFirst,
  StaleWhileRevalidate,
} from "workbox-strategies";
import {
  registerRoute,
  setDefaultHandler,
  setCatchHandler,
} from "workbox-routing";
import {
  matchPrecache,
  precacheAndRoute,
  cleanupOutdatedCaches,
} from "workbox-precaching";

skipWaiting();
clientsClaim();

const WB_MANIFEST = self.__WB_MANIFEST;
WB_MANIFEST.push({
  url: "/fallback",
  revision: "1234567890",
});
precacheAndRoute(WB_MANIFEST);
cleanupOutdatedCaches();

const store = new idbKeyval.Store("GraphQL-Cache", "PostResponses");

if (workbox) {
  console.log(`Workbox is loaded`);
} else {
  console.log(`Workbox didn't load`);
}

workbox.routing.registerRoute(
  new RegExp("https://rickandmortyapi.com/graphql(/)?"),
  async ({ event }) => {
    return staleWhileRevalidate(event);
  },
  "POST"
);

self.addEventListener("fetch", async (event) => {
  if (event.request.method === "POST") {
    event.respondWith(staleWhileRevalidate(event));
  }
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

async function cacheOnly(event) {
  let promise = null;
  let cachedResponse = await getCache(event.request.clone());
  return Promise.resolve(cachedResponse);
}

async function networkOnly(event) {
  let promise = null;
  let fetchPromise = fetch(event.request.clone())
    .then((response) => {
      setCache(event.request.clone(), response.clone());
      return response;
    })
    .catch((err) => {
      console.error(err);
    });
  return fetchPromise;
}

async function cacheFirst(event) {
  let promise = null;
  let cachedResponse = await getCache(event.request.clone());
  if (cachedResponse) {
    return Promise.resolve(cachedResponse);
  }
  let fetchPromise = fetch(event.request.clone())
    .then((response) => {
      setCache(event.request.clone(), response.clone());
      return response;
    })
    .catch((err) => {
      console.error(err);
    });
  return fetchPromise;
}

async function networkFirst(event) {
  let promise = null;
  let error;
  let cachedResponse = await getCache(event.request.clone());
  let fetchPromise = fetch(event.request.clone())
    .then((response) => {
      setCache(event.request.clone(), response.clone());
      return response;
    })
    .catch((err) => {
      return cachedResponse? Promise.resolve(cachedResponse):null;
    });
  return fetchPromise;
}

async function serializeResponse(response) {
  let serializedHeaders = {};
  for (var entry of response.headers.entries()) {
    serializedHeaders[entry[0]] = entry[1];
  }
  let serialized = {
    headers: serializedHeaders,
    status: response.status,
    statusText: response.statusText,
  };
  serialized.body = await response.json();
  return serialized;
}

async function setCache(request, response) {
  try{
    var key, data;
    let body = await request.json();
    let id = CryptoJS.MD5(body.query+""+body.variables.submit).toString();

    var entry = {
      query: body.query,
      response: await serializeResponse(response),
      timestamp: Date.now(),
    };
    idbKeyval.set(id, entry, store);
  }catch(err){
    console.log("data cached");
  }
}

async function getCache(request) {
  let data;
  const one_day=60*60*24;
  try {
    let body = await request.json();
    let id=CryptoJS.MD5(body.query+""+body.variables.submit).toString();
    data = await idbKeyval.get(id, store);
    if (!data) return null;

    // Check cache max age.
    let cacheControl = request.headers.get("Cache-Control");
    let maxAge = cacheControl ? parseInt(cacheControl.split("=")[1]) :one_day;
    if (Date.now() - data.timestamp > maxAge * 1000) {
      console.log(`Cache expired. Load from API endpoint.`);
      return null;
    }
    return new Response(JSON.stringify(data.response.body), data.response);
  } catch (err) {
    return null;
  }
}

async function getPostKey(request) {
  let body = await request.json();
  return JSON.stringify(body);
}

registerRoute(
  "/",
  new StaleWhileRevalidate({
    cacheName: "start-url",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  "GET"
);
registerRoute(
  /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
  new StaleWhileRevalidate({
    cacheName: "google-fonts",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 40,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  "GET"
);
registerRoute(
  /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
  new StaleWhileRevalidate({
    cacheName: "static-font-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 40,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  "GET"
);
registerRoute(
  /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
  new StaleWhileRevalidate({
    cacheName: "static-image-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 264,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  "GET"
);
registerRoute(
  /\.(?:js)$/i,
  new StaleWhileRevalidate({
    cacheName: "static-js-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  "GET"
);
registerRoute(
  /\.(?:css|less)$/i,
  new StaleWhileRevalidate({
    cacheName: "static-style-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  "GET"
);
registerRoute(
  /\.(?:json|xml|csv)$/i,
  new StaleWhileRevalidate({
    cacheName: "static-data-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  "GET"
);
registerRoute(
  /\/api\/.*$/i,
  new StaleWhileRevalidate({
    cacheName: "apis",
    networkTimeoutSeconds: 86400,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  "GET"
);
registerRoute(
  /.*/i,
  new StaleWhileRevalidate({
    cacheName: "others",
    networkTimeoutSeconds: 86400,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 320,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  "GET"
);

setDefaultHandler(new StaleWhileRevalidate());
setCatchHandler(({ event }) => {
  switch (event.request.destination) {
    case "document":
    case "image":
    case "font":
      return matchPrecache("/fallback");
    default:
      return Response.error();
  }
});
