importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js"
);
importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js"
);
importScripts(
  "https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js"
);

import {ONE_DAY as oneDay} from "./../components/Constants"

const store = new idbKeyval.Store("GraphQL-Cache", "PostResponses");

export async function staleWhileRevalidate(event) {
  let cachedResponse = await getCache(event.request.clone());
  if (cachedResponse) {
    return Promise.resolve(cachedResponse);
  }
  let fetchPromise = fetch(event.request.clone())
    .then((response) => {
      setCache(event.request.clone(), response.clone());
      return response;
    })
  return fetchPromise;
}

export async function getCache(request) {
  let data;
  try {
    let body = await request.json();
    let id=CryptoJS.MD5(body.query+""+body.variables.submit).toString();
    data = await idbKeyval.get(id, store);
    if (!data) {
      return null;
    }

    if (Date.now() - data.timestamp > oneDay * 1000) {
      return null;
    }
    return new Response(JSON.stringify(data.response.body), data.response);
  } catch (err) {
    return null;
  }
}

export async function setCache(request, response) {
  let body = await request.json();
  let id = CryptoJS.MD5(body.query+""+body.variables.submit).toString();

  const entry = {
    query: body.query,
    response: await serializeResponse(response),
    timestamp: Date.now(),
  };
  idbKeyval.set(id, entry, store);
}

export async function serializeResponse(response) {
  let serializedHeaders = {};
  for (const entry of response.headers.entries()) { 
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

