importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js"
);
importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js"
);
importScripts(
  "https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js"
);

const store = new idbKeyval.Store("GraphQL-Cache", "PostResponses");

export async function serializeResponse(response) {
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

export async function setCache(request, response) {
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

  export async function getCache(request) {
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

  export async function cacheOnly(event) {
    let promise = null;
    let cachedResponse = await getCache(event.request.clone());
    return Promise.resolve(cachedResponse);
  }

  export async function networkOnly(event) {
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

  export async function cacheFirst(event) {
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

  export async function networkFirst(event) {
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

  export async function staleWhileRevalidate(event) {
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

