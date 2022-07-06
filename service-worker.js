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

// don't wait and install immediately
skipWaiting();

// take the control of the application in the current tab immediately
clientsClaim(); 

const manifest = self.__WB_MANIFEST;
manifest.push({
  url: "/fallback",
  revision: "100000000",
});
// precache the fallback page
precacheAndRoute(manifest);

 //event listener which will clean up incompatible precaches.
cleanupOutdatedCaches(); 

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
