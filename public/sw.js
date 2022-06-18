!(function () {
  "use strict";
  var e = {
      913: function () {
        try {
          self["workbox:core:6.5.2"] && _();
        } catch (e) {}
      },
      550: function () {
        try {
          self["workbox:expiration:6.5.2"] && _();
        } catch (e) {}
      },
      977: function () {
        try {
          self["workbox:precaching:6.5.2"] && _();
        } catch (e) {}
      },
      80: function () {
        try {
          self["workbox:routing:6.5.2"] && _();
        } catch (e) {}
      },
      873: function () {
        try {
          self["workbox:strategies:6.5.2"] && _();
        } catch (e) {}
      },
    },
    t = {};
  function s(n) {
    var a = t[n];
    if (void 0 !== a) return a.exports;
    var r = (t[n] = { exports: {} }),
      i = !0;
    try {
      e[n](r, r.exports, s), (i = !1);
    } finally {
      i && delete t[n];
    }
    return r.exports;
  }
  !(function () {
    s(913);
    const e = (e, ...t) => {
      let s = e;
      return t.length > 0 && (s += ` :: ${JSON.stringify(t)}`), s;
    };
    class t extends Error {
      constructor(t, s) {
        super(e(t, s)), (this.name = t), (this.details = s);
      }
    }
    const n = new Set();
    const a = {
        googleAnalytics: "googleAnalytics",
        precache: "precache-v2",
        prefix: "workbox",
        runtime: "runtime",
        suffix: "undefined" !== typeof registration ? registration.scope : "",
      },
      r = (e) =>
        [a.prefix, e, a.suffix].filter((e) => e && e.length > 0).join("-"),
      i = (e) => e || r(a.precache),
      c = (e) => e || r(a.runtime);
    function o(e, t) {
      const s = new URL(e);
      for (const n of t) s.searchParams.delete(n);
      return s.href;
    }
    let h;
    function l(e) {
      e.then(() => {});
    }
    class u {
      constructor() {
        this.promise = new Promise((e, t) => {
          (this.resolve = e), (this.reject = t);
        });
      }
    }
    const d = (e) =>
      new URL(String(e), location.href).href.replace(
        new RegExp(`^${location.origin}`),
        ""
      );
    function f(e, t) {
      const s = t();
      return e.waitUntil(s), s;
    }
    async function p(e, s) {
      let n = null;
      if (e.url) {
        n = new URL(e.url).origin;
      }
      if (n !== self.location.origin)
        throw new t("cross-origin-copy-response", { origin: n });
      const a = e.clone(),
        r = {
          headers: new Headers(a.headers),
          status: a.status,
          statusText: a.statusText,
        },
        i = s ? s(r) : r,
        c = (function () {
          if (void 0 === h) {
            const t = new Response("");
            if ("body" in t)
              try {
                new Response(t.body), (h = !0);
              } catch (e) {
                h = !1;
              }
            h = !1;
          }
          return h;
        })()
          ? a.body
          : await a.blob();
      return new Response(c, i);
    }
    let g, m;
    const w = new WeakMap(),
      y = new WeakMap(),
      _ = new WeakMap(),
      v = new WeakMap(),
      b = new WeakMap();
    let R = {
      get(e, t, s) {
        if (e instanceof IDBTransaction) {
          if ("done" === t) return y.get(e);
          if ("objectStoreNames" === t) return e.objectStoreNames || _.get(e);
          if ("store" === t)
            return s.objectStoreNames[1]
              ? void 0
              : s.objectStore(s.objectStoreNames[0]);
        }
        return C(e[t]);
      },
      set: (e, t, s) => ((e[t] = s), !0),
      has: (e, t) =>
        (e instanceof IDBTransaction && ("done" === t || "store" === t)) ||
        t in e,
    };
    function x(e) {
      return e !== IDBDatabase.prototype.transaction ||
        "objectStoreNames" in IDBTransaction.prototype
        ? (
            m ||
            (m = [
              IDBCursor.prototype.advance,
              IDBCursor.prototype.continue,
              IDBCursor.prototype.continuePrimaryKey,
            ])
          ).includes(e)
          ? function (...t) {
              return e.apply(T(this), t), C(w.get(this));
            }
          : function (...t) {
              return C(e.apply(T(this), t));
            }
        : function (t, ...s) {
            const n = e.call(T(this), t, ...s);
            return _.set(n, t.sort ? t.sort() : [t]), C(n);
          };
    }
    function E(e) {
      return "function" === typeof e
        ? x(e)
        : (e instanceof IDBTransaction &&
            (function (e) {
              if (y.has(e)) return;
              const t = new Promise((t, s) => {
                const n = () => {
                    e.removeEventListener("complete", a),
                      e.removeEventListener("error", r),
                      e.removeEventListener("abort", r);
                  },
                  a = () => {
                    t(), n();
                  },
                  r = () => {
                    s(e.error || new DOMException("AbortError", "AbortError")),
                      n();
                  };
                e.addEventListener("complete", a),
                  e.addEventListener("error", r),
                  e.addEventListener("abort", r);
              });
              y.set(e, t);
            })(e),
          (t = e),
          (
            g ||
            (g = [
              IDBDatabase,
              IDBObjectStore,
              IDBIndex,
              IDBCursor,
              IDBTransaction,
            ])
          ).some((e) => t instanceof e)
            ? new Proxy(e, R)
            : e);
      var t;
    }
    function C(e) {
      if (e instanceof IDBRequest)
        return (function (e) {
          const t = new Promise((t, s) => {
            const n = () => {
                e.removeEventListener("success", a),
                  e.removeEventListener("error", r);
              },
              a = () => {
                t(C(e.result)), n();
              },
              r = () => {
                s(e.error), n();
              };
            e.addEventListener("success", a), e.addEventListener("error", r);
          });
          return (
            t
              .then((t) => {
                t instanceof IDBCursor && w.set(t, e);
              })
              .catch(() => {}),
            b.set(t, e),
            t
          );
        })(e);
      if (v.has(e)) return v.get(e);
      const t = E(e);
      return t !== e && (v.set(e, t), b.set(t, e)), t;
    }
    const T = (e) => b.get(e);
    const L = ["get", "getKey", "getAll", "getAllKeys", "count"],
      k = ["put", "add", "delete", "clear"],
      q = new Map();
    function D(e, t) {
      if (!(e instanceof IDBDatabase) || t in e || "string" !== typeof t)
        return;
      if (q.get(t)) return q.get(t);
      const s = t.replace(/FromIndex$/, ""),
        n = t !== s,
        a = k.includes(s);
      if (
        !(s in (n ? IDBIndex : IDBObjectStore).prototype) ||
        (!a && !L.includes(s))
      )
        return;
      const r = async function (e, ...t) {
        const r = this.transaction(e, a ? "readwrite" : "readonly");
        let i = r.store;
        return (
          n && (i = i.index(t.shift())),
          (await Promise.all([i[s](...t), a && r.done]))[0]
        );
      };
      return q.set(t, r), r;
    }
    R = ((e) => ({
      ...e,
      get: (t, s, n) => D(t, s) || e.get(t, s, n),
      has: (t, s) => !!D(t, s) || e.has(t, s),
    }))(R);
    s(550);
    const N = "cache-entries",
      U = (e) => {
        const t = new URL(e, location.href);
        return (t.hash = ""), t.href;
      };
    class S {
      constructor(e) {
        (this._db = null), (this._cacheName = e);
      }
      _upgradeDb(e) {
        const t = e.createObjectStore(N, { keyPath: "id" });
        t.createIndex("cacheName", "cacheName", { unique: !1 }),
          t.createIndex("timestamp", "timestamp", { unique: !1 });
      }
      _upgradeDbAndDeleteOldDbs(e) {
        this._upgradeDb(e),
          this._cacheName &&
            (function (e, { blocked: t } = {}) {
              const s = indexedDB.deleteDatabase(e);
              t && s.addEventListener("blocked", () => t()),
                C(s).then(() => {});
            })(this._cacheName);
      }
      async setTimestamp(e, t) {
        const s = {
            url: (e = U(e)),
            timestamp: t,
            cacheName: this._cacheName,
            id: this._getId(e),
          },
          n = (await this.getDb()).transaction(N, "readwrite", {
            durability: "relaxed",
          });
        await n.store.put(s), await n.done;
      }
      async getTimestamp(e) {
        const t = await this.getDb(),
          s = await t.get(N, this._getId(e));
        return null === s || void 0 === s ? void 0 : s.timestamp;
      }
      async expireEntries(e, t) {
        const s = await this.getDb();
        let n = await s
          .transaction(N)
          .store.index("timestamp")
          .openCursor(null, "prev");
        const a = [];
        let r = 0;
        for (; n; ) {
          const s = n.value;
          s.cacheName === this._cacheName &&
            ((e && s.timestamp < e) || (t && r >= t) ? a.push(n.value) : r++),
            (n = await n.continue());
        }
        const i = [];
        for (const c of a) await s.delete(N, c.id), i.push(c.url);
        return i;
      }
      _getId(e) {
        return this._cacheName + "|" + U(e);
      }
      async getDb() {
        return (
          this._db ||
            (this._db = await (function (
              e,
              t,
              { blocked: s, upgrade: n, blocking: a, terminated: r } = {}
            ) {
              const i = indexedDB.open(e, t),
                c = C(i);
              return (
                n &&
                  i.addEventListener("upgradeneeded", (e) => {
                    n(
                      C(i.result),
                      e.oldVersion,
                      e.newVersion,
                      C(i.transaction)
                    );
                  }),
                s && i.addEventListener("blocked", () => s()),
                c
                  .then((e) => {
                    r && e.addEventListener("close", () => r()),
                      a && e.addEventListener("versionchange", () => a());
                  })
                  .catch(() => {}),
                c
              );
            })("workbox-expiration", 1, {
              upgrade: this._upgradeDbAndDeleteOldDbs.bind(this),
            })),
          this._db
        );
      }
    }
    class I {
      constructor(e, t = {}) {
        (this._isRunning = !1),
          (this._rerunRequested = !1),
          (this._maxEntries = t.maxEntries),
          (this._maxAgeSeconds = t.maxAgeSeconds),
          (this._matchOptions = t.matchOptions),
          (this._cacheName = e),
          (this._timestampModel = new S(e));
      }
      async expireEntries() {
        if (this._isRunning) return void (this._rerunRequested = !0);
        this._isRunning = !0;
        const e = this._maxAgeSeconds
            ? Date.now() - 1e3 * this._maxAgeSeconds
            : 0,
          t = await this._timestampModel.expireEntries(e, this._maxEntries),
          s = await self.caches.open(this._cacheName);
        for (const n of t) await s.delete(n, this._matchOptions);
        (this._isRunning = !1),
          this._rerunRequested &&
            ((this._rerunRequested = !1), l(this.expireEntries()));
      }
      async updateTimestamp(e) {
        await this._timestampModel.setTimestamp(e, Date.now());
      }
      async isURLExpired(e) {
        if (this._maxAgeSeconds) {
          const t = await this._timestampModel.getTimestamp(e),
            s = Date.now() - 1e3 * this._maxAgeSeconds;
          return void 0 === t || t < s;
        }
        return !1;
      }
      async delete() {
        (this._rerunRequested = !1),
          await this._timestampModel.expireEntries(1 / 0);
      }
    }
    class P {
      constructor(e = {}) {
        (this.cachedResponseWillBeUsed = async ({
          event: e,
          request: t,
          cacheName: s,
          cachedResponse: n,
        }) => {
          if (!n) return null;
          const a = this._isResponseDateFresh(n),
            r = this._getCacheExpiration(s);
          l(r.expireEntries());
          const i = r.updateTimestamp(t.url);
          if (e)
            try {
              e.waitUntil(i);
            } catch (c) {
              0;
            }
          return a ? n : null;
        }),
          (this.cacheDidUpdate = async ({ cacheName: e, request: t }) => {
            const s = this._getCacheExpiration(e);
            await s.updateTimestamp(t.url), await s.expireEntries();
          }),
          (this._config = e),
          (this._maxAgeSeconds = e.maxAgeSeconds),
          (this._cacheExpirations = new Map()),
          e.purgeOnQuotaError &&
            (function (e) {
              n.add(e);
            })(() => this.deleteCacheAndMetadata());
      }
      _getCacheExpiration(e) {
        if (e === c()) throw new t("expire-custom-caches-only");
        let s = this._cacheExpirations.get(e);
        return (
          s || ((s = new I(e, this._config)), this._cacheExpirations.set(e, s)),
          s
        );
      }
      _isResponseDateFresh(e) {
        if (!this._maxAgeSeconds) return !0;
        const t = this._getDateHeaderTimestamp(e);
        if (null === t) return !0;
        return t >= Date.now() - 1e3 * this._maxAgeSeconds;
      }
      _getDateHeaderTimestamp(e) {
        if (!e.headers.has("date")) return null;
        const t = e.headers.get("date"),
          s = new Date(t).getTime();
        return isNaN(s) ? null : s;
      }
      async deleteCacheAndMetadata() {
        for (const [e, t] of this._cacheExpirations)
          await self.caches.delete(e), await t.delete();
        this._cacheExpirations = new Map();
      }
    }
    s(873);
    function O(e) {
      return "string" === typeof e ? new Request(e) : e;
    }
    class A {
      constructor(e, t) {
        (this._cacheKeys = {}),
          Object.assign(this, t),
          (this.event = t.event),
          (this._strategy = e),
          (this._handlerDeferred = new u()),
          (this._extendLifetimePromises = []),
          (this._plugins = [...e.plugins]),
          (this._pluginStateMap = new Map());
        for (const s of this._plugins) this._pluginStateMap.set(s, {});
        this.event.waitUntil(this._handlerDeferred.promise);
      }
      async fetch(e) {
        const { event: s } = this;
        let n = O(e);
        if (
          "navigate" === n.mode &&
          s instanceof FetchEvent &&
          s.preloadResponse
        ) {
          const e = await s.preloadResponse;
          if (e) return e;
        }
        const a = this.hasCallback("fetchDidFail") ? n.clone() : null;
        try {
          for (const e of this.iterateCallbacks("requestWillFetch"))
            n = await e({ request: n.clone(), event: s });
        } catch (i) {
          if (i instanceof Error)
            throw new t("plugin-error-request-will-fetch", {
              thrownErrorMessage: i.message,
            });
        }
        const r = n.clone();
        try {
          let e;
          e = await fetch(
            n,
            "navigate" === n.mode ? void 0 : this._strategy.fetchOptions
          );
          for (const t of this.iterateCallbacks("fetchDidSucceed"))
            e = await t({ event: s, request: r, response: e });
          return e;
        } catch (c) {
          throw (
            (a &&
              (await this.runCallbacks("fetchDidFail", {
                error: c,
                event: s,
                originalRequest: a.clone(),
                request: r.clone(),
              })),
            c)
          );
        }
      }
      async fetchAndCachePut(e) {
        const t = await this.fetch(e),
          s = t.clone();
        return this.waitUntil(this.cachePut(e, s)), t;
      }
      async cacheMatch(e) {
        const t = O(e);
        let s;
        const { cacheName: n, matchOptions: a } = this._strategy,
          r = await this.getCacheKey(t, "read"),
          i = Object.assign(Object.assign({}, a), { cacheName: n });
        s = await caches.match(r, i);
        for (const c of this.iterateCallbacks("cachedResponseWillBeUsed"))
          s =
            (await c({
              cacheName: n,
              matchOptions: a,
              cachedResponse: s,
              request: r,
              event: this.event,
            })) || void 0;
        return s;
      }
      async cachePut(e, s) {
        const a = O(e);
        var r;
        await ((r = 0), new Promise((e) => setTimeout(e, r)));
        const i = await this.getCacheKey(a, "write");
        if (!s) throw new t("cache-put-with-no-response", { url: d(i.url) });
        const c = await this._ensureResponseSafeToCache(s);
        if (!c) return !1;
        const { cacheName: h, matchOptions: l } = this._strategy,
          u = await self.caches.open(h),
          f = this.hasCallback("cacheDidUpdate"),
          p = f
            ? await (async function (e, t, s, n) {
                const a = o(t.url, s);
                if (t.url === a) return e.match(t, n);
                const r = Object.assign(Object.assign({}, n), {
                    ignoreSearch: !0,
                  }),
                  i = await e.keys(t, r);
                for (const c of i) if (a === o(c.url, s)) return e.match(c, n);
              })(u, i.clone(), ["__WB_REVISION__"], l)
            : null;
        try {
          await u.put(i, f ? c.clone() : c);
        } catch (g) {
          if (g instanceof Error)
            throw (
              ("QuotaExceededError" === g.name &&
                (await (async function () {
                  for (const e of n) await e();
                })()),
              g)
            );
        }
        for (const t of this.iterateCallbacks("cacheDidUpdate"))
          await t({
            cacheName: h,
            oldResponse: p,
            newResponse: c.clone(),
            request: i,
            event: this.event,
          });
        return !0;
      }
      async getCacheKey(e, t) {
        const s = `${e.url} | ${t}`;
        if (!this._cacheKeys[s]) {
          let n = e;
          for (const e of this.iterateCallbacks("cacheKeyWillBeUsed"))
            n = O(
              await e({
                mode: t,
                request: n,
                event: this.event,
                params: this.params,
              })
            );
          this._cacheKeys[s] = n;
        }
        return this._cacheKeys[s];
      }
      hasCallback(e) {
        for (const t of this._strategy.plugins) if (e in t) return !0;
        return !1;
      }
      async runCallbacks(e, t) {
        for (const s of this.iterateCallbacks(e)) await s(t);
      }
      *iterateCallbacks(e) {
        for (const t of this._strategy.plugins)
          if ("function" === typeof t[e]) {
            const s = this._pluginStateMap.get(t),
              n = (n) => {
                const a = Object.assign(Object.assign({}, n), { state: s });
                return t[e](a);
              };
            yield n;
          }
      }
      waitUntil(e) {
        return this._extendLifetimePromises.push(e), e;
      }
      async doneWaiting() {
        let e;
        for (; (e = this._extendLifetimePromises.shift()); ) await e;
      }
      destroy() {
        this._handlerDeferred.resolve(null);
      }
      async _ensureResponseSafeToCache(e) {
        let t = e,
          s = !1;
        for (const n of this.iterateCallbacks("cacheWillUpdate"))
          if (
            ((t =
              (await n({
                request: this.request,
                response: t,
                event: this.event,
              })) || void 0),
            (s = !0),
            !t)
          )
            break;
        return s || (t && 200 !== t.status && (t = void 0)), t;
      }
    }
    class K {
      constructor(e = {}) {
        (this.cacheName = c(e.cacheName)),
          (this.plugins = e.plugins || []),
          (this.fetchOptions = e.fetchOptions),
          (this.matchOptions = e.matchOptions);
      }
      handle(e) {
        const [t] = this.handleAll(e);
        return t;
      }
      handleAll(e) {
        e instanceof FetchEvent && (e = { event: e, request: e.request });
        const t = e.event,
          s =
            "string" === typeof e.request ? new Request(e.request) : e.request,
          n = "params" in e ? e.params : void 0,
          a = new A(this, { event: t, request: s, params: n }),
          r = this._getResponse(a, s, t);
        return [r, this._awaitComplete(r, a, s, t)];
      }
      async _getResponse(e, s, n) {
        let a;
        await e.runCallbacks("handlerWillStart", { event: n, request: s });
        try {
          if (((a = await this._handle(s, e)), !a || "error" === a.type))
            throw new t("no-response", { url: s.url });
        } catch (r) {
          if (r instanceof Error)
            for (const t of e.iterateCallbacks("handlerDidError"))
              if (((a = await t({ error: r, event: n, request: s })), a)) break;
          if (!a) throw r;
        }
        for (const t of e.iterateCallbacks("handlerWillRespond"))
          a = await t({ event: n, request: s, response: a });
        return a;
      }
      async _awaitComplete(e, t, s, n) {
        let a, r;
        try {
          a = await e;
        } catch (r) {}
        try {
          await t.runCallbacks("handlerDidRespond", {
            event: n,
            request: s,
            response: a,
          }),
            await t.doneWaiting();
        } catch (i) {
          i instanceof Error && (r = i);
        }
        if (
          (await t.runCallbacks("handlerDidComplete", {
            event: n,
            request: s,
            response: a,
            error: r,
          }),
          t.destroy(),
          r)
        )
          throw r;
      }
    }
    const M = {
      cacheWillUpdate: async ({ response: e }) =>
        200 === e.status || 0 === e.status ? e : null,
    };
    class W extends K {
      constructor(e = {}) {
        super(e),
          this.plugins.some((e) => "cacheWillUpdate" in e) ||
            this.plugins.unshift(M),
          (this._networkTimeoutSeconds = e.networkTimeoutSeconds || 0);
      }
      async _handle(e, s) {
        const n = [];
        const a = [];
        let r;
        if (this._networkTimeoutSeconds) {
          const { id: t, promise: i } = this._getTimeoutPromise({
            request: e,
            logs: n,
            handler: s,
          });
          (r = t), a.push(i);
        }
        const i = this._getNetworkPromise({
          timeoutId: r,
          request: e,
          logs: n,
          handler: s,
        });
        a.push(i);
        const c = await s.waitUntil(
          (async () => (await s.waitUntil(Promise.race(a))) || (await i))()
        );
        if (!c) throw new t("no-response", { url: e.url });
        return c;
      }
      _getTimeoutPromise({ request: e, logs: t, handler: s }) {
        let n;
        return {
          promise: new Promise((t) => {
            n = setTimeout(async () => {
              t(await s.cacheMatch(e));
            }, 1e3 * this._networkTimeoutSeconds);
          }),
          id: n,
        };
      }
      async _getNetworkPromise({
        timeoutId: e,
        request: t,
        logs: s,
        handler: n,
      }) {
        let a, r;
        try {
          r = await n.fetchAndCachePut(t);
        } catch (i) {
          i instanceof Error && (a = i);
        }
        return (
          e && clearTimeout(e), (!a && r) || (r = await n.cacheMatch(t)), r
        );
      }
    }
    s(80);
    const j = (e) => (e && "object" === typeof e ? e : { handle: e });
    class B {
      constructor(e, t, s = "GET") {
        (this.handler = j(t)), (this.match = e), (this.method = s);
      }
      setCatchHandler(e) {
        this.catchHandler = j(e);
      }
    }
    class H extends B {
      constructor(e, t, s) {
        super(
          ({ url: t }) => {
            const s = e.exec(t.href);
            if (s && (t.origin === location.origin || 0 === s.index))
              return s.slice(1);
          },
          t,
          s
        );
      }
    }
    class F {
      constructor() {
        (this._routes = new Map()), (this._defaultHandlerMap = new Map());
      }
      get routes() {
        return this._routes;
      }
      addFetchListener() {
        self.addEventListener("fetch", (e) => {
          const { request: t } = e,
            s = this.handleRequest({ request: t, event: e });
          s && e.respondWith(s);
        });
      }
      addCacheListener() {
        self.addEventListener("message", (e) => {
          if (e.data && "CACHE_URLS" === e.data.type) {
            const { payload: t } = e.data;
            0;
            const s = Promise.all(
              t.urlsToCache.map((t) => {
                "string" === typeof t && (t = [t]);
                const s = new Request(...t);
                return this.handleRequest({ request: s, event: e });
              })
            );
            e.waitUntil(s),
              e.ports && e.ports[0] && s.then(() => e.ports[0].postMessage(!0));
          }
        });
      }
      handleRequest({ request: e, event: t }) {
        const s = new URL(e.url, location.href);
        if (!s.protocol.startsWith("http")) return void 0;
        const n = s.origin === location.origin,
          { params: a, route: r } = this.findMatchingRoute({
            event: t,
            request: e,
            sameOrigin: n,
            url: s,
          });
        let i = r && r.handler;
        const c = e.method;
        if (
          (!i &&
            this._defaultHandlerMap.has(c) &&
            (i = this._defaultHandlerMap.get(c)),
          !i)
        )
          return void 0;
        let o;
        try {
          o = i.handle({ url: s, request: e, event: t, params: a });
        } catch (l) {
          o = Promise.reject(l);
        }
        const h = r && r.catchHandler;
        return (
          o instanceof Promise &&
            (this._catchHandler || h) &&
            (o = o.catch(async (n) => {
              if (h) {
                0;
                try {
                  return await h.handle({
                    url: s,
                    request: e,
                    event: t,
                    params: a,
                  });
                } catch (r) {
                  r instanceof Error && (n = r);
                }
              }
              if (this._catchHandler)
                return this._catchHandler.handle({
                  url: s,
                  request: e,
                  event: t,
                });
              throw n;
            })),
          o
        );
      }
      findMatchingRoute({ url: e, sameOrigin: t, request: s, event: n }) {
        const a = this._routes.get(s.method) || [];
        for (const r of a) {
          let a;
          const i = r.match({ url: e, sameOrigin: t, request: s, event: n });
          if (i)
            return (
              (a = i),
              ((Array.isArray(a) && 0 === a.length) ||
                (i.constructor === Object && 0 === Object.keys(i).length) ||
                "boolean" === typeof i) &&
                (a = void 0),
              { route: r, params: a }
            );
        }
        return {};
      }
      setDefaultHandler(e, t = "GET") {
        this._defaultHandlerMap.set(t, j(e));
      }
      setCatchHandler(e) {
        this._catchHandler = j(e);
      }
      registerRoute(e) {
        this._routes.has(e.method) || this._routes.set(e.method, []),
          this._routes.get(e.method).push(e);
      }
      unregisterRoute(e) {
        if (!this._routes.has(e.method))
          throw new t("unregister-route-but-not-found-with-method", {
            method: e.method,
          });
        const s = this._routes.get(e.method).indexOf(e);
        if (!(s > -1)) throw new t("unregister-route-route-not-registered");
        this._routes.get(e.method).splice(s, 1);
      }
    }
    let $;
    const G = () => (
      $ || (($ = new F()), $.addFetchListener(), $.addCacheListener()), $
    );
    function Q(e, s, n) {
      let a;
      if ("string" === typeof e) {
        const t = new URL(e, location.href);
        0;
        a = new B(({ url: e }) => e.href === t.href, s, n);
      } else if (e instanceof RegExp) a = new H(e, s, n);
      else if ("function" === typeof e) a = new B(e, s, n);
      else {
        if (!(e instanceof B))
          throw new t("unsupported-route-type", {
            moduleName: "workbox-routing",
            funcName: "registerRoute",
            paramName: "capture",
          });
        a = e;
      }
      return G().registerRoute(a), a;
    }
    s(977);
    function V(e) {
      if (!e) throw new t("add-to-cache-list-unexpected-type", { entry: e });
      if ("string" === typeof e) {
        const t = new URL(e, location.href);
        return { cacheKey: t.href, url: t.href };
      }
      const { revision: s, url: n } = e;
      if (!n) throw new t("add-to-cache-list-unexpected-type", { entry: e });
      if (!s) {
        const e = new URL(n, location.href);
        return { cacheKey: e.href, url: e.href };
      }
      const a = new URL(n, location.href),
        r = new URL(n, location.href);
      return (
        a.searchParams.set("__WB_REVISION__", s),
        { cacheKey: a.href, url: r.href }
      );
    }
    class J {
      constructor() {
        (this.updatedURLs = []),
          (this.notUpdatedURLs = []),
          (this.handlerWillStart = async ({ request: e, state: t }) => {
            t && (t.originalRequest = e);
          }),
          (this.cachedResponseWillBeUsed = async ({
            event: e,
            state: t,
            cachedResponse: s,
          }) => {
            if (
              "install" === e.type &&
              t &&
              t.originalRequest &&
              t.originalRequest instanceof Request
            ) {
              const e = t.originalRequest.url;
              s ? this.notUpdatedURLs.push(e) : this.updatedURLs.push(e);
            }
            return s;
          });
      }
    }
    class z {
      constructor({ precacheController: e }) {
        (this.cacheKeyWillBeUsed = async ({ request: e, params: t }) => {
          const s =
            (null === t || void 0 === t ? void 0 : t.cacheKey) ||
            this._precacheController.getCacheKeyForURL(e.url);
          return s ? new Request(s, { headers: e.headers }) : e;
        }),
          (this._precacheController = e);
      }
    }
    class X extends K {
      constructor(e = {}) {
        (e.cacheName = i(e.cacheName)),
          super(e),
          (this._fallbackToNetwork = !1 !== e.fallbackToNetwork),
          this.plugins.push(X.copyRedirectedCacheableResponsesPlugin);
      }
      async _handle(e, t) {
        const s = await t.cacheMatch(e);
        return (
          s ||
          (t.event && "install" === t.event.type
            ? await this._handleInstall(e, t)
            : await this._handleFetch(e, t))
        );
      }
      async _handleFetch(e, s) {
        let n;
        const a = s.params || {};
        if (!this._fallbackToNetwork)
          throw new t("missing-precache-entry", {
            cacheName: this.cacheName,
            url: e.url,
          });
        {
          0;
          const t = a.integrity,
            r = e.integrity,
            i = !r || r === t;
          if (
            ((n = await s.fetch(new Request(e, { integrity: r || t }))), t && i)
          ) {
            this._useDefaultCacheabilityPluginIfNeeded();
            await s.cachePut(e, n.clone());
            0;
          }
        }
        return n;
      }
      async _handleInstall(e, s) {
        this._useDefaultCacheabilityPluginIfNeeded();
        const n = await s.fetch(e);
        if (!(await s.cachePut(e, n.clone())))
          throw new t("bad-precaching-response", {
            url: e.url,
            status: n.status,
          });
        return n;
      }
      _useDefaultCacheabilityPluginIfNeeded() {
        let e = null,
          t = 0;
        for (const [s, n] of this.plugins.entries())
          n !== X.copyRedirectedCacheableResponsesPlugin &&
            (n === X.defaultPrecacheCacheabilityPlugin && (e = s),
            n.cacheWillUpdate && t++);
        0 === t
          ? this.plugins.push(X.defaultPrecacheCacheabilityPlugin)
          : t > 1 && null !== e && this.plugins.splice(e, 1);
      }
    }
    (X.defaultPrecacheCacheabilityPlugin = {
      cacheWillUpdate: async ({ response: e }) =>
        !e || e.status >= 400 ? null : e,
    }),
      (X.copyRedirectedCacheableResponsesPlugin = {
        cacheWillUpdate: async ({ response: e }) =>
          e.redirected ? await p(e) : e,
      });
    class Y {
      constructor({
        cacheName: e,
        plugins: t = [],
        fallbackToNetwork: s = !0,
      } = {}) {
        (this._urlsToCacheKeys = new Map()),
          (this._urlsToCacheModes = new Map()),
          (this._cacheKeysToIntegrities = new Map()),
          (this._strategy = new X({
            cacheName: i(e),
            plugins: [...t, new z({ precacheController: this })],
            fallbackToNetwork: s,
          })),
          (this.install = this.install.bind(this)),
          (this.activate = this.activate.bind(this));
      }
      get strategy() {
        return this._strategy;
      }
      precache(e) {
        this.addToCacheList(e),
          this._installAndActiveListenersAdded ||
            (self.addEventListener("install", this.install),
            self.addEventListener("activate", this.activate),
            (this._installAndActiveListenersAdded = !0));
      }
      addToCacheList(e) {
        const s = [];
        for (const n of e) {
          "string" === typeof n
            ? s.push(n)
            : n && void 0 === n.revision && s.push(n.url);
          const { cacheKey: e, url: a } = V(n),
            r = "string" !== typeof n && n.revision ? "reload" : "default";
          if (
            this._urlsToCacheKeys.has(a) &&
            this._urlsToCacheKeys.get(a) !== e
          )
            throw new t("add-to-cache-list-conflicting-entries", {
              firstEntry: this._urlsToCacheKeys.get(a),
              secondEntry: e,
            });
          if ("string" !== typeof n && n.integrity) {
            if (
              this._cacheKeysToIntegrities.has(e) &&
              this._cacheKeysToIntegrities.get(e) !== n.integrity
            )
              throw new t("add-to-cache-list-conflicting-integrities", {
                url: a,
              });
            this._cacheKeysToIntegrities.set(e, n.integrity);
          }
          if (
            (this._urlsToCacheKeys.set(a, e),
            this._urlsToCacheModes.set(a, r),
            s.length > 0)
          ) {
            const e = `Workbox is precaching URLs without revision info: ${s.join(
              ", "
            )}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
            console.warn(e);
          }
        }
      }
      install(e) {
        return f(e, async () => {
          const t = new J();
          this.strategy.plugins.push(t);
          for (const [a, r] of this._urlsToCacheKeys) {
            const t = this._cacheKeysToIntegrities.get(r),
              s = this._urlsToCacheModes.get(a),
              n = new Request(a, {
                integrity: t,
                cache: s,
                credentials: "same-origin",
              });
            await Promise.all(
              this.strategy.handleAll({
                params: { cacheKey: r },
                request: n,
                event: e,
              })
            );
          }
          const { updatedURLs: s, notUpdatedURLs: n } = t;
          return { updatedURLs: s, notUpdatedURLs: n };
        });
      }
      activate(e) {
        return f(e, async () => {
          const e = await self.caches.open(this.strategy.cacheName),
            t = await e.keys(),
            s = new Set(this._urlsToCacheKeys.values()),
            n = [];
          for (const a of t) s.has(a.url) || (await e.delete(a), n.push(a.url));
          return { deletedURLs: n };
        });
      }
      getURLsToCacheKeys() {
        return this._urlsToCacheKeys;
      }
      getCachedURLs() {
        return [...this._urlsToCacheKeys.keys()];
      }
      getCacheKeyForURL(e) {
        const t = new URL(e, location.href);
        return this._urlsToCacheKeys.get(t.href);
      }
      getIntegrityForCacheKey(e) {
        return this._cacheKeysToIntegrities.get(e);
      }
      async matchPrecache(e) {
        const t = e instanceof Request ? e.url : e,
          s = this.getCacheKeyForURL(t);
        if (s) {
          return (await self.caches.open(this.strategy.cacheName)).match(s);
        }
      }
      createHandlerBoundToURL(e) {
        const s = this.getCacheKeyForURL(e);
        if (!s) throw new t("non-precached-url", { url: e });
        return (t) => (
          (t.request = new Request(e)),
          (t.params = Object.assign({ cacheKey: s }, t.params)),
          this.strategy.handle(t)
        );
      }
    }
    let Z;
    const ee = () => (Z || (Z = new Y()), Z);
    class te extends B {
      constructor(e, t) {
        super(({ request: s }) => {
          const n = e.getURLsToCacheKeys();
          for (const a of (function* (
            e,
            {
              ignoreURLParametersMatching: t = [/^utm_/, /^fbclid$/],
              directoryIndex: s = "index.html",
              cleanURLs: n = !0,
              urlManipulation: a,
            } = {}
          ) {
            const r = new URL(e, location.href);
            (r.hash = ""), yield r.href;
            const i = (function (e, t = []) {
              for (const s of [...e.searchParams.keys()])
                t.some((e) => e.test(s)) && e.searchParams.delete(s);
              return e;
            })(r, t);
            if ((yield i.href, s && i.pathname.endsWith("/"))) {
              const e = new URL(i.href);
              (e.pathname += s), yield e.href;
            }
            if (n) {
              const e = new URL(i.href);
              (e.pathname += ".html"), yield e.href;
            }
            if (a) {
              const e = a({ url: r });
              for (const t of e) yield t.href;
            }
          })(s.url, t)) {
            const t = n.get(a);
            if (t) {
              return { cacheKey: t, integrity: e.getIntegrityForCacheKey(t) };
            }
          }
        }, e.strategy);
      }
    }
    self.skipWaiting(),
      self.addEventListener("activate", () => self.clients.claim());
    var se,
      ne,
      ae = [
        {
          revision: "4633220c74b9ff1de2def8bd21e2b97c",
          url: "/_next/static/6Ac64iVV6hWDpjEy-Xqfn/_buildManifest.js",
        },
        {
          revision: "fb2823d66b3e778e04a3f681d0d2fb19",
          url: "/_next/static/6Ac64iVV6hWDpjEy-Xqfn/_middlewareManifest.js",
        },
        {
          revision: "b6652df95db52feb4daf4eca35380933",
          url: "/_next/static/6Ac64iVV6hWDpjEy-Xqfn/_ssgManifest.js",
        },
        {
          revision: "49352af4edae8439",
          url: "/_next/static/chunks/527-49352af4edae8439.js",
        },
        {
          revision: "6f6e35c51f433877",
          url: "/_next/static/chunks/941-6f6e35c51f433877.js",
        },
        {
          revision: "9dc43b6814679974",
          url: "/_next/static/chunks/959-9dc43b6814679974.js",
        },
        {
          revision: "1f10003e17636e37",
          url: "/_next/static/chunks/framework-1f10003e17636e37.js",
        },
        {
          revision: "5035a05945ec0e6e",
          url: "/_next/static/chunks/main-5035a05945ec0e6e.js",
        },
        {
          revision: "1019f2d017ea2147",
          url: "/_next/static/chunks/pages/_app-1019f2d017ea2147.js",
        },
        {
          revision: "0a004b8b8498208d",
          url: "/_next/static/chunks/pages/_error-0a004b8b8498208d.js",
        },
        {
          revision: "c16e57f091308835",
          url: "/_next/static/chunks/pages/char_page-c16e57f091308835.js",
        },
        {
          revision: "7c042e697adf1219",
          url: "/_next/static/chunks/pages/character/%5Bchar%5D-7c042e697adf1219.js",
        },
        {
          revision: "d491318ff4593114",
          url: "/_next/static/chunks/pages/episode/%5Bepi%5D-d491318ff4593114.js",
        },
        {
          revision: "320bb7d1f2724c6e",
          url: "/_next/static/chunks/pages/episode_page-320bb7d1f2724c6e.js",
        },
        {
          revision: "5e6debcd6a5ccb4b",
          url: "/_next/static/chunks/pages/fallback-5e6debcd6a5ccb4b.js",
        },
        {
          revision: "f8379d99e40706ee",
          url: "/_next/static/chunks/pages/index-f8379d99e40706ee.js",
        },
        {
          revision: "47f05c903e3ef555",
          url: "/_next/static/chunks/pages/navBar-47f05c903e3ef555.js",
        },
        {
          revision: "99442aec5788bccac9b2f0ead2afdd6b",
          url: "/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",
        },
        {
          revision: "9b0e45c24ba97727",
          url: "/_next/static/chunks/webpack-9b0e45c24ba97727.js",
        },
        {
          revision: "856fb580267675dc",
          url: "/_next/static/css/856fb580267675dc.css",
        },
        {
          revision: "c6ec71636087e735",
          url: "/_next/static/css/c6ec71636087e735.css",
        },
        { revision: "c30c7d42707a47a3f4591831641e50dc", url: "/favicon.ico" },
        {
          revision: "14570acc7272a456b185a1016be39ece",
          url: "/images/Background.png",
        },
        {
          revision: "fa564f6d1601c73054930ed74eba64ca",
          url: "/images/Vector.png",
        },
        {
          revision: "b79533ce4ebae3f8cc81b566edaf3e99",
          url: "/images/Vector.svg",
        },
        {
          revision: "8bcc048b63aca78a99aa19dbd676d178",
          url: "/images/bethSmith.png",
        },
        {
          revision: "ee73065f14142c94031c11c556acecf7",
          url: "/images/jerrySmith.png",
        },
        {
          revision: "555bb50e6b872763a175bccbd663ff31",
          url: "/images/mortySmith.png",
        },
        {
          revision: "b008d7ac13a811899c2adbd6b7260d98",
          url: "/images/rickMorty.jpeg",
        },
        {
          revision: "7e679447441ff8dd0be18e65d35fb3aa",
          url: "/images/rickSanchez.png",
        },
        {
          revision: "96ea48cfde80e9ea6975dc6390fba10d",
          url: "/images/summerSmith.png",
        },
        { revision: "6585c2dd5bdb78d17c12a62417436317", url: "/manifest.json" },
        { revision: "2149f2965508ace8c368847600fd6330", url: "/sw.js" },
        { revision: "4b4f1876502eb6721764637fe5c41702", url: "/vercel.svg" },
      ];
    ae.push({ url: "/fallback", revision: "1234567890" }),
      (function (e) {
        ee().precache(e);
      })(ae),
      (function (e) {
        const t = ee();
        Q(new te(t, e));
      })(se),
      self.addEventListener("activate", (e) => {
        const t = i();
        e.waitUntil(
          (async (e, t = "-precache-") => {
            const s = (await self.caches.keys()).filter(
              (s) =>
                s.includes(t) && s.includes(self.registration.scope) && s !== e
            );
            return await Promise.all(s.map((e) => self.caches.delete(e))), s;
          })(t).then((e) => {})
        );
      }),
      Q(
        "/",
        new W({
          cacheName: "start-url",
          plugins: [
            new P({
              maxEntries: 1,
              maxAgeSeconds: 86400,
              purgeOnQuotaError: !0,
            }),
          ],
        }),
        "GET"
      ),
      Q(
        /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
        new W({
          cacheName: "google-fonts",
          plugins: [
            new P({
              maxEntries: 4,
              maxAgeSeconds: 31536e3,
              purgeOnQuotaError: !0,
            }),
          ],
        }),
        "GET"
      ),
      Q(
        /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
        new W({
          cacheName: "static-font-assets",
          plugins: [
            new P({
              maxEntries: 4,
              maxAgeSeconds: 604800,
              purgeOnQuotaError: !0,
            }),
          ],
        }),
        "GET"
      ),
      Q(
        /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
        new W({
          cacheName: "static-image-assets",
          plugins: [
            new P({
              maxEntries: 64,
              maxAgeSeconds: 86400,
              purgeOnQuotaError: !0,
            }),
          ],
        }),
        "GET"
      ),
      Q(
        /\.(?:js)$/i,
        new W({
          cacheName: "static-js-assets",
          plugins: [
            new P({
              maxEntries: 32,
              maxAgeSeconds: 86400,
              purgeOnQuotaError: !0,
            }),
          ],
        }),
        "GET"
      ),
      Q(
        /\.(?:css|less)$/i,
        new W({
          cacheName: "static-style-assets",
          plugins: [
            new P({
              maxEntries: 32,
              maxAgeSeconds: 86400,
              purgeOnQuotaError: !0,
            }),
          ],
        }),
        "GET"
      ),
      Q(
        /\.(?:json|xml|csv)$/i,
        new W({
          cacheName: "static-data-assets",
          plugins: [
            new P({
              maxEntries: 32,
              maxAgeSeconds: 86400,
              purgeOnQuotaError: !0,
            }),
          ],
        }),
        "GET"
      ),
      Q(
        /\/api\/.*$/i,
        new W({
          cacheName: "apis",
          networkTimeoutSeconds: 10,
          plugins: [
            new P({
              maxEntries: 16,
              maxAgeSeconds: 86400,
              purgeOnQuotaError: !0,
            }),
          ],
        }),
        "GET"
      ),
      Q(
        /.*/i,
        new W({
          cacheName: "others",
          networkTimeoutSeconds: 10,
          plugins: [
            new P({
              maxEntries: 32,
              maxAgeSeconds: 86400,
              purgeOnQuotaError: !0,
            }),
          ],
        }),
        "GET"
      ),
      (ne = new W()),
      G().setDefaultHandler(ne),
      (function (e) {
        G().setCatchHandler(e);
      })(function (e) {
        var t;
        switch (e.event.request.destination) {
          case "document":
            return (t = "/fallback"), ee().matchPrecache(t);
          case "image":
            break;
          default:
            return Response.error();
        }
      });
  })();
})();
