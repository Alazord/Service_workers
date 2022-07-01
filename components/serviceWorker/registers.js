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

export function Registers(){
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
}