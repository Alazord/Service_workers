import "../styles/globals.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  // if ('serviceWorker' in navigator) {
  //   window.addEventListener('load', function() {
  //     navigator.serviceWorker.register('/sw.js').then(function(registration) {
  //       // Registration was successful
  //       console.log('ServiceWorker registration successful with scope: ', registration.scope);
  //       // Initializing list.
  //       updateList(null, null);
  //     }, function(err) {
  //       // registration failed :(
  //       console.log('ServiceWorker registration failed: ', err);
  //     });
  //   });
  // }
  useEffect(() => {
    if("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
       navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, [])
  return <Component {...pageProps} />;
}

export default MyApp;
