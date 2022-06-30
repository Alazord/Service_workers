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
  networkOnly,
  networkFirst,
  cacheFirst,
  staleWhileRevalidate,
} from "./components/serviceWorker/cachingStrategies";
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

import {Registers} from "./components/serviceWorker/registers"

skipWaiting();
clientsClaim();

const WB_MANIFEST = self.__WB_MANIFEST;
WB_MANIFEST.push({
  url: "/fallback",
  revision: "1234567890",
});
precacheAndRoute(WB_MANIFEST);
cleanupOutdatedCaches();

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

Registers();

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
