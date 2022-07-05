import { ExpirationPlugin } from "workbox-expiration";
import { StaleWhileRevalidate } from "workbox-strategies";
import { registerRoute } from "workbox-routing";

const oneDay = 24 * 60 * 60;
const entries = 100;

export function registers(){ //register start url
    registerRoute(
        "/",
        new StaleWhileRevalidate({
          cacheName: "start-url",
          plugins: [
            new ExpirationPlugin({
              maxEntries: entries,
              maxAgeSeconds: oneDay,
              purgeOnQuotaError: true, //Automatically cleanup if quota is exceeded
            }),
          ],
        }),
        "GET"
      );
      registerRoute( // register google fonts
        /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
        new StaleWhileRevalidate({
          cacheName: "google-fonts",
          plugins: [
            new ExpirationPlugin({
              maxEntries: entries,
              maxAgeSeconds: oneDay,
              purgeOnQuotaError: true, //Automatically cleanup if quota is exceeded
            }),
          ],
        }),
        "GET"
      );
      registerRoute( //register statis font assets
        /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
        new StaleWhileRevalidate({
          cacheName: "static-font-assets",
          plugins: [
            new ExpirationPlugin({
              maxEntries: entries,
              maxAgeSeconds: oneDay,
              purgeOnQuotaError: true, //Automatically cleanup if quota is exceeded
            }),
          ],
        }),
        "GET"
      );
      registerRoute( //register statis image assets
        /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
        new StaleWhileRevalidate({
          cacheName: "static-image-assets",
          plugins: [
            new ExpirationPlugin({
              maxEntries: entries,
              maxAgeSeconds: oneDay,
              purgeOnQuotaError: true, //Automatically cleanup if quota is exceeded
            }),
          ],
        }),
        "GET"
      );
      registerRoute( //register js assets
        /\.(?:js)$/i,
        new StaleWhileRevalidate({
          cacheName: "static-js-assets",
          plugins: [
            new ExpirationPlugin({
              maxEntries: entries,
              maxAgeSeconds: oneDay,
              purgeOnQuotaError: true, //Automatically cleanup if quota is exceeded
            }),
          ],
        }),
        "GET"
      );
      registerRoute( //register statis style assets
        /\.(?:css|less)$/i,
        new StaleWhileRevalidate({
          cacheName: "static-style-assets",
          plugins: [
            new ExpirationPlugin({
              maxEntries: entries,
              maxAgeSeconds: oneDay,
              purgeOnQuotaError: true, //Automatically cleanup if quota is exceeded
            }),
          ],
        }),
        "GET"
      );
      registerRoute( //register static data assets
        /\.(?:json|xml|csv)$/i,
        new StaleWhileRevalidate({
          cacheName: "static-data-assets",
          plugins: [
            new ExpirationPlugin({
              maxEntries: entries,
              maxAgeSeconds: oneDay,
              purgeOnQuotaError: true, //Automatically cleanup if quota is exceeded
            }),
          ],
        }),
        "GET"
      );
      registerRoute( //register apis
        /\/api\/.*$/i,
        new StaleWhileRevalidate({
          cacheName: "apis",
          networkTimeoutSeconds: oneDay,
          plugins: [
            new ExpirationPlugin({
              maxEntries: entries,
              maxAgeSeconds: oneDay,
              purgeOnQuotaError: true, //Automatically cleanup if quota is exceeded
            }),
          ],
        }),
        "GET"
      );
      registerRoute( //register others
        /.*/i,
        new StaleWhileRevalidate({
          cacheName: "others",
          networkTimeoutSeconds: oneDay,
          plugins: [
            new ExpirationPlugin({
              maxEntries: entries,
              maxAgeSeconds: oneDay,
              purgeOnQuotaError: true, //Automatically cleanup if quota is exceeded
            }),
          ],
        }),
        "GET"
      );
}