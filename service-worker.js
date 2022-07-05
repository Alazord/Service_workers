importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js"
);

import { skipWaiting, clientsClaim } from "workbox-core";
import { StaleWhileRevalidate } from "workbox-strategies";
import { staleWhileRevalidate} from "./serviceWorker/cachingStrategies";
import { setDefaultHandler,setCatchHandler} from "workbox-routing";
import {
  matchPrecache,
  precacheAndRoute,
  cleanupOutdatedCaches,
} from "workbox-precaching";

import { registers } from "./serviceWorker/registers";

skipWaiting(); //forces the waiting service worker to become the active.
clientsClaim(); //ensures that updates to the service worker take effect immediately for client.

const manifest = self.__WB_MANIFEST;
manifest.push({
  url: "/fallback",
  revision: "1234567890", 
});

precacheAndRoute(manifest); //add entries to the precache list and add a route to respond to fetch events.
cleanupOutdatedCaches(); //event listener which will clean up incompatible precaches.

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

registers();

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
