(() => {
  "use strict";
  var e,
    t = {
      7498: (e, t, n) => {
        n.d(t, { Z: () => r });
        class r {
          static copy(e, t) {
            navigator.clipboard.writeText(e).then(t);
          }
        }
      },
      46545: (e, t, n) => {
        n.d(t, { Z: () => d });
        var r = n(49412),
          o = n(31528),
          i = n.n(o),
          s = n(92672),
          a = n(73073);
        function c(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            (t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r));
          }
          return n;
        }
        function l(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        class d {
          static wrapEventType(e, t) {
            return `_${e}_:${t}`;
          }
          static async getPanelId(e) {
            if (e) return `panel:${e}`;
            return `panel:${(await s.Z.getCurrentWindow()).id}`;
          }
          static async getSidebarId(e) {
            const t = i().get(e, ["id"]);
            return t ? String(t) : await d.getPanelId();
          }
          static sendBackgroundMessage(e, t, n) {
            a.Z.hasId() &&
              chrome.runtime.sendMessage({ type: e, data: t }, (...e) => {
                (chrome.runtime.lastError && !String(chrome.runtime.lastError.message).startsWith("The message port closed before a response was received")) || (n && n(...e));
              });
          }
          static listenMessage(e, t, n = !1) {
            const r = (r, o, i) => {
              if (r.type === e) return (t(r.data, o, i), n);
            };
            return (chrome.runtime.onMessage.addListener(r), r);
          }
          static async listenWindowMessage(e, t, n, o = !1) {
            t = d.wrapEventType(e, t);
            let i = await r.Z.getCurrent();
            const s = (e, r, s) => {
              if (e.type === t) return e.tab || void 0 === i ? (n(e.data, r, s), o) : void 0;
            };
            return (chrome.runtime.onMessage.addListener(s), s);
          }
          static removeMessageListener(e) {
            e instanceof Promise
              ? Promise.all([e]).then((e) => {
                  chrome.runtime.onMessage.removeListener(e[0]);
                })
              : chrome.runtime.onMessage.removeListener(e);
          }
          static sendMessageToWindowTab(e, t, n, r) {
            e && e.id
              ? ((t = d.wrapEventType(e.windowId, t)), d.sendMessageTo(e.id, t, n, r, { tab: e }))
              : s.Z.getCurrentWindow().then((e) => {
                  d.sendMessageToPanel(e.id, t, n, r);
                });
          }
          static sendMessageTo(e, t, n, r, o = {}) {
            a.Z.hasId() &&
              chrome.tabs.sendMessage(
                e,
                (function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2
                      ? c(Object(n), !0).forEach(function (t) {
                          l(e, t, n[t]);
                        })
                      : Object.getOwnPropertyDescriptors
                        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                        : c(Object(n)).forEach(function (t) {
                            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                          });
                  }
                  return e;
                })({ type: t, data: n }, o),
                (...e) => {
                  const t = chrome.runtime.lastError;
                  if (!r) return;
                  if (!t) return r(...e);
                  const n = String(t.message);
                  (n.startsWith("The message port closed before a response was received") && !n.startsWith("Could not establish connection. Receiving end does not exist.")) || r(...e);
                },
              );
          }
          static sendMessageToPanel(e, t, n, r) {
            ((t = d.wrapEventType(e, t)), d.sendBackgroundMessage(t, n, r));
          }
          static sendMessageToPanels(e, t, n, r = []) {
            const o = r.map((e) => e.windowId);
            s.Z.getWindows().then((r) => {
              for (let i of r) o.includes(i.id) || d.sendMessageToPanel(i.id, e, t, n);
            });
          }
          static sendMessageToTabs(e, t, n, o = []) {
            const i = o.map((e) => e.id);
            r.Z.getTabs().then((r) => {
              for (let o of r || []) i.includes(o.id) || d.sendMessageToWindowTab(o, e, t, n);
            });
          }
          static sendMessageToAll(e, t, n) {
            (r.Z.getTabs().then((r) => {
              for (let o of r || []) d.sendMessageTo(o.id, e, t, n);
            }),
              d.sendBackgroundMessage(e, t, n));
          }
        }
      },
      62912: (e, t, n) => {
        n.d(t, { Z: () => i });
        var r = n(46545);
        function o(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        class i {
          static async getOS() {
            return new Promise((e) => {
              if (!chrome.runtime || !("getPlatformInfo" in chrome.runtime)) return r.Z.sendBackgroundMessage("platform-get-os", null, e);
              chrome.runtime.getPlatformInfo((t) => e(t ? t.os : ""));
            });
          }
          static async isIOS() {
            return (await i.getOS()) === i.IOS;
          }
          static async isLinux() {
            return (await i.getOS()) === i.LINUX;
          }
          static async isWindows() {
            return (await i.getOS()) === i.WIN;
          }
          static registerBackgroundScripts() {
            r.Z.listenMessage(
              "platform-get-os",
              async (e, t, n) => {
                n(await i.getOS());
              },
              !0,
            );
          }
          static normalizePlatformName(e) {
            switch ((e = String(e).toLowerCase())) {
              case "linux":
                return i.LINUX;
              case "macos":
              case "mac":
                return i.IOS;
              case "windows":
              case "win":
                return i.WIN;
            }
            return null;
          }
        }
        (o(i, "IOS", "mac"), o(i, "WIN", "win"), o(i, "LINUX", "linux"));
      },
      73073: (e, t, n) => {
        n.d(t, { Z: () => r });
        class r {
          static hasId() {
            return Boolean(chrome.runtime && chrome.runtime.id);
          }
          static getId() {
            return r.hasId() ? chrome.runtime.id : null;
          }
        }
      },
      73328: (e, t, n) => {
        n.d(t, { Z: () => s });
        var r = n(31528),
          o = n.n(r);
        function i(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        class s {
          static isApiSupported() {
            return Boolean(chrome.storage);
          }
          static onChange(e, t, n) {
            chrome.storage.onChanged.addListener((r, i) => {
              if (i === t && e in r) {
                const t = o().get(r, [e, "newValue"]),
                  i = o().get(r, [e, "oldValue"]);
                n(t, i);
              }
            });
          }
          static onFullChange(e, t) {
            chrome.storage.onChanged.addListener((n, r) => {
              r === e && t(n);
            });
          }
          static getAllLocal() {
            return new Promise((e, t) => {
              try {
                chrome.storage.local.get((n) => {
                  try {
                    e(n || {});
                  } catch (e) {
                    t(e);
                  }
                });
              } catch (e) {
                t(e);
              }
            });
          }
          static getLocal(e, t = null) {
            return new Promise((n, r) => {
              try {
                chrome.storage.local.get([e], (r) => {
                  const i = o().get(r, [e], t);
                  n(i);
                });
              } catch (e) {
                r(e);
              }
            });
          }
          static setLocal(e, t) {
            return new Promise((n) => {
              chrome.storage.local.set({ [e]: t }, n);
            });
          }
          static removeLocal(e) {
            return new Promise((t) => {
              chrome.storage.local.remove(e, t);
            });
          }
          static getAllSync() {
            return new Promise((e, t) => {
              try {
                chrome.storage.sync.get((n) => {
                  try {
                    e(n || {});
                  } catch (e) {
                    t(e);
                  }
                });
              } catch (e) {
                t(e);
              }
            });
          }
          static getSync(e, t = null) {
            return new Promise((n, r) => {
              try {
                chrome.storage.sync.get([e], (r) => {
                  const i = o().get(r, [e], t);
                  n(i);
                });
              } catch (e) {
                r(e);
              }
            });
          }
          static setSync(e, t) {
            return new Promise((n) => {
              chrome.storage.sync.set({ [e]: t }, n);
            });
          }
          static removeSync(e) {
            return new Promise((t) => {
              chrome.storage.sync.remove(e, t);
            });
          }
        }
        (i(s, "AREA_LOCAL", "local"), i(s, "AREA_SYNC", "sync"));
      },
      49412: (e, t, n) => {
        n.d(t, { Z: () => a });
        var r = n(46545);
        function o(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            (t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r));
          }
          return n;
        }
        function i(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? o(Object(n), !0).forEach(function (t) {
                  s(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : o(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
          }
          return e;
        }
        function s(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        class a {
          static filter(e, t) {
            return Array.from(e || []).filter((e) => {
              for (let n in t) if (n in t && e[n] !== t[n]) return !1;
              return !0;
            });
          }
          static async getActiveTabs() {
            return new Promise((e) => {
              chrome.tabs ? chrome.tabs.query({ active: !0 }, e) : r.Z.sendBackgroundMessage("api-tabs-active", {}, e);
            });
          }
          static async getActive(e = !0) {
            return new Promise((t) => {
              chrome.tabs
                ? chrome.tabs.query({ active: !0, currentWindow: e }, (e) => {
                    t(e.length ? e[0] : null);
                  })
                : r.Z.sendBackgroundMessage("api-tab-active", {}, t);
            });
          }
          static async getCurrent() {
            return new Promise((e) => {
              if (chrome.tabs && chrome.tabs.getCurrent) return chrome.tabs.getCurrent(e);
              r.Z.sendBackgroundMessage("api-tab-current", {}, e);
            });
          }
          static async getTab(e) {
            return new Promise((t) => {
              if (!e) return t(null);
              chrome.tabs
                ? chrome.tabs.get(e, (e) => {
                    if (chrome.runtime.lastError) return t(null);
                    t(e);
                  })
                : r.Z.sendBackgroundMessage("api-tab", { tabId: e }, t);
            });
          }
          static async getTabs(e = {}) {
            return new Promise((t) => {
              chrome.tabs ? chrome.tabs.query(e, t) : r.Z.sendBackgroundMessage("api-tabs", e, t);
            });
          }
          static async getZoom() {
            const { id: e } = await a.getActive();
            return new Promise((t) => chrome.tabs.getZoom(e, t));
          }
          static onMoved(e) {
            chrome.tabs.onMoved.addListener(e);
          }
          static onAttached(e) {
            chrome.tabs.onAttached.addListener(e);
          }
          static onDetached(e) {
            chrome.tabs.onDetached.addListener(e);
          }
          static onTabUpdated(e) {
            chrome.tabs.onUpdated.addListener(e);
          }
          static onTabCreated(e) {
            chrome.tabs.onCreated.addListener(e);
          }
          static onTabActivated(e) {
            chrome.tabs.onActivated.addListener(e);
          }
          static onTabRemoved(e) {
            chrome.tabs.onRemoved.addListener(e);
          }
          static onHighlighted(e) {
            chrome.tabs.onHighlighted.addListener(e);
          }
          static onReplaced(e) {
            chrome.tabs.onReplaced.addListener(e);
          }
          static remove(e, t) {
            chrome.tabs ? chrome.tabs.remove(e, t) : r.Z.sendBackgroundMessage("api-tab-remove", e, t);
          }
          static group(e, t = {}, n) {
            chrome.tabs ? chrome.tabs.group(i({ tabIds: e }, t), n) : r.Z.sendBackgroundMessage("api-tab-group", { tabIds: e, options: t }, n);
          }
          static groupAsync(e, t = {}) {
            return chrome.tabs.group(i({ tabIds: e }, t));
          }
          static ungroup(e, t) {
            chrome.tabs ? chrome.tabs.ungroup(e, t) : r.Z.sendBackgroundMessage("api-tab-ungroup", e, t);
          }
          static ungroupAsync(e) {
            return chrome.tabs.ungroup(e);
          }
          static openNewTab(e, t = {}, n) {
            const o = i({ url: e }, t);
            chrome.tabs ? chrome.tabs.create(o, n) : r.Z.sendBackgroundMessage("api-tab-create", o, n);
          }
          static openUrlInActiveTab(e, t = {}, n) {
            const r = i({ url: e }, t);
            a.update(null, r, n);
          }
          static move(e, t = {}, n) {
            chrome.tabs ? chrome.tabs.move(e, t, n) : r.Z.sendBackgroundMessage("api-tab-move", { tabId: e, moveProperties: t }, n);
          }
          static reload(e, t = {}, n) {
            chrome.tabs ? chrome.tabs.reload(e, t, n) : r.Z.sendBackgroundMessage("api-tab-reload", { tabId: e, reloadProperties: t }, n);
          }
          static duplicate(e, t) {
            chrome.tabs ? chrome.tabs.duplicate(e, t) : r.Z.sendBackgroundMessage("api-tab-duplicate", e, t);
          }
          static moveAsync(e, t = {}) {
            return chrome.tabs.move(e, t);
          }
          static update(e, t = {}, n) {
            chrome.tabs ? chrome.tabs.update(e, t, n) : r.Z.sendBackgroundMessage("api-tab-update", { tabId: e, params: t }, n);
          }
          static registerBackgroundScripts() {
            (r.Z.listenMessage("api-tab-create", (e, t, n) => {
              a.openNewTab(e.url, e, n);
            }),
              r.Z.listenMessage("api-tab-group", (e, t, n) => {
                a.group(e.tabIds, e.options, n);
              }),
              r.Z.listenMessage("api-tab-ungroup", (e, t, n) => {
                a.ungroup(e, n);
              }),
              r.Z.listenMessage("api-tab-remove", (e, t, n) => {
                a.remove(e, n);
              }),
              r.Z.listenMessage(
                "api-tab-current",
                async (e, t, n) => {
                  n(t.tab ? await a.getTab(t.tab.id) : void 0);
                },
                !0,
              ),
              r.Z.listenMessage(
                "api-tab-active",
                async (e, t, n) => {
                  n(await a.getActive());
                },
                !0,
              ),
              r.Z.listenMessage(
                "api-tabs-active",
                async (e, t, n) => {
                  n(await a.getActiveTabs());
                },
                !0,
              ),
              r.Z.listenMessage("api-tab-update", ({ tabId: e, params: t }, n, r) => {
                a.update(e, t, r);
              }),
              r.Z.listenMessage("api-tab-move", ({ tabId: e, moveProperties: t }, n, r) => {
                a.move(e, t, r);
              }),
              r.Z.listenMessage("api-tab-reload", ({ tabId: e, reloadProperties: t }, n, r) => {
                a.reload(e, t, r);
              }),
              r.Z.listenMessage("api-tab-duplicate", (e, t, n) => {
                a.duplicate(e, n);
              }),
              r.Z.listenMessage(
                "api-tabs",
                async (e, t, n) => {
                  n(await a.getTabs(e));
                },
                !0,
              ),
              r.Z.listenMessage(
                "api-tab",
                async ({ tabId: e }, t, n) => {
                  n(await a.getTab({ tabId: e }));
                },
                !0,
              ));
          }
        }
      },
      32839: (e, t, n) => {
        n.d(t, { Z: () => o });
        var r = n(46545);
        class o {
          static onCreated(e) {
            chrome.tabGroups.onCreated.addListener(e);
          }
          static onMoved(e) {
            chrome.tabGroups.onMoved.addListener(e);
          }
          static onRemoved(e) {
            chrome.tabGroups.onRemoved.addListener(e);
          }
          static onUpdated(e) {
            chrome.tabGroups.onUpdated.addListener(e);
          }
          static async getAll(e = {}) {
            return new Promise((t) => {
              chrome.tabGroups ? chrome.tabGroups.query(e, t) : r.Z.sendBackgroundMessage("api-tab-group-get-all", e, t);
            });
          }
          static move(e, t = {}, n) {
            chrome.tabGroups ? chrome.tabGroups.move(e, t, n) : r.Z.sendBackgroundMessage("api-tab-group-move", { groupId: e, moveProperties: t }, n);
          }
          static moveAsync(e, t = {}) {
            return chrome.tabGroups.move(e, t);
          }
          static update(e, t, n) {
            chrome.tabs ? chrome.tabGroups.update(e, t, n) : r.Z.sendBackgroundMessage("api-tab-group-update", { groupId: e, updateProperties: t }, n);
          }
          static registerBackgroundScripts() {
            (r.Z.listenMessage(
              "api-tab-group-get-all",
              async (e, t, n) => {
                n(await o.getAll(e));
              },
              !0,
            ),
              r.Z.listenMessage(
                "api-tab-group-update",
                async ({ groupId: e, updateProperties: t }, n, r) => {
                  o.update(e, t, r);
                },
                !0,
              ),
              r.Z.listenMessage(
                "api-tab-group-move",
                async ({ groupId: e, moveProperties: t }, n, r) => {
                  o.move(e, t, r);
                },
                !0,
              ));
          }
        }
      },
      92672: (e, t, n) => {
        n.d(t, { Z: () => s });
        var r = n(46545);
        function o(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            (t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r));
          }
          return n;
        }
        function i(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        class s {
          static onCreate(e, t = []) {
            chrome.windows.onCreated.addListener(e, { windowTypes: t });
          }
          static onRemoved(e, t = []) {
            chrome.windows.onRemoved.addListener(e, { windowTypes: t });
          }
          static openNewWindow(e, t = {}, n) {
            chrome.windows && chrome.windows.create
              ? chrome.windows.create(
                  (function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                      var n = null != arguments[t] ? arguments[t] : {};
                      t % 2
                        ? o(Object(n), !0).forEach(function (t) {
                            i(e, t, n[t]);
                          })
                        : Object.getOwnPropertyDescriptors
                          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                          : o(Object(n)).forEach(function (t) {
                              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                            });
                    }
                    return e;
                  })({ url: e }, t),
                  n,
                )
              : r.Z.sendBackgroundMessage("api-window-create", { url: e, options: t }, n);
          }
          static async getCurrentWindow() {
            return chrome.windows && chrome.windows.getCurrent
              ? chrome.windows.getCurrent()
              : new Promise((e) => {
                  r.Z.sendBackgroundMessage("api-window-current", {}, (t) => {
                    e(t);
                  });
                });
          }
          static async getWindows() {
            return chrome.windows && chrome.windows.getAll
              ? chrome.windows.getAll()
              : new Promise((e) => {
                  r.Z.sendBackgroundMessage("api-window-all", {}, (t) => {
                    e(t);
                  });
                });
          }
          static async updateWindow(e, t = {}) {
            return new Promise((n) => {
              chrome.windows.update(e, t, () => {
                chrome.runtime.lastError ? n(!1) : n(!0);
              });
            });
          }
          static removeWindow(e, t) {
            chrome.windows.remove(e, () => {
              t(Boolean(chrome.runtime.lastError));
            });
          }
          static registerBackgroundScripts() {
            (r.Z.listenMessage(
              "api-window-create",
              async ({ url: e, options: t }, n, r) => {
                await s.openNewWindow(e, t, r);
              },
              !0,
            ),
              r.Z.listenMessage(
                "api-window-current",
                async (e, t, n) => {
                  n(await s.getCurrentWindow());
                },
                !0,
              ),
              r.Z.listenMessage(
                "api-window-all",
                async (e, t, n) => {
                  n(await s.getWindows());
                },
                !0,
              ));
          }
        }
      },
      30269: (e, t, n) => {
        var r = n(67294),
          o = n(55971),
          i = n(20745),
          s = n(37424),
          a = n(92672),
          c = n(43757),
          l = n(73073),
          d = n(61256),
          u = n(38012),
          p = n(44884),
          g = n(27298),
          m = n(65725),
          _ = n(94103),
          h = n(13732),
          b = n(53261);
        const f = [],
          w = x("manganum-sidebar");
        let y;
        ((w.dom.style.zIndex = "2147483647"),
          (w.dom.style.pointerEvents = "none"),
          (w.dom.style.visibility = "visible"),
          (w.dom.style.position = "fixed"),
          (w.dom.style.height = "100%"),
          (w.dom.style.left = "0"),
          (w.dom.style.top = "0"),
          w.container.setAttribute("data-container", "dom"),
          (w.container.style.pointerEvents = "all"),
          (w.container.style.display = "none"),
          w.container.classList.add("mg-theme"),
          w.container.classList.add("mg-theme_init"),
          w.shadowRoot.appendChild(w.container),
          f.push(() => {
            (w.dom.remove(), w.root.unmount());
          }),
          (0, _._)(window.location.href) &&
            ((y = x("manganum-ai")),
            y.shadowRoot.appendChild(y.container),
            f.push(() => {
              (y.dom.remove(), y.root.unmount());
            })),
          chrome.runtime.onConnect.addListener((e) => {
            "inject-js" === e.name && e.postMessage({ ping: Date.now() });
          }));
        const v = () => {
          if ("visible" === document.visibilityState && !l.Z.hasId()) {
            document.removeEventListener("visibilitychange", v);
            for (let e of f) e();
          }
        };
        function x(e) {
          const t = document.createElement(e),
            n = t.attachShadow({ mode: "closed" }),
            r = document.createElement("div");
          return (
            n.appendChild(r),
            (r.style.display = "none"),
            r.classList.add("mg-theme"),
            r.classList.add("mg-theme_init"),
            n.appendChild(
              (function (e) {
                const t = document.createElement("link");
                return (t.setAttribute("data-assets-content", "css"), (t.href = (0, o.B0)("assets/content.css")), (t.type = "text/css"), (t.rel = "stylesheet"), (t.onload = e), t);
              })(() => {
                r.style.display = "block";
              }),
            ),
            { dom: t, shadowRoot: n, container: r, root: i.createRoot(r) }
          );
        }
        (document.addEventListener("visibilitychange", v),
          document.documentElement.appendChild(w.dom),
          a.Z.getCurrentWindow().then(async (e) => {
            const t = await (0, c.bh)({ entry: b.cQ, windowId: e.id });
            if (((0, u.Nj)(w.container), w.root.render(r.createElement(s.Provider, { store: t }, r.createElement(g.Z, null, r.createElement(p.Z, { mode: p.Z.MODE_FLEX })))), y)) {
              const e = t.getState();
              (0, h.w)(e.plus, e.site) && ((0, m.f)(y.dom), y.root.render(r.createElement(s.Provider, { store: t }, r.createElement(d.Z, null))));
            }
          }));
        var O = n(46545);
        let k;
        const Z = (e) => {
          const t = (0, u.Du)();
          t && k !== t && "manganum-sidebar" !== e.target.localName && ((k = t), O.Z.sendBackgroundMessage("translator-selection-text", { selectionText: t }));
        };
        (O.Z.listenMessage("translator-selection", (e, t, n) => {
          n({ selectionText: (0, u.Du)() });
        }),
          window.addEventListener("mouseup", Z),
          window.addEventListener("keyup", Z));
        var M = n(979),
          P = n(31528),
          j = n.n(P),
          E = n(60709);
        (document.addEventListener("fullscreenchange", () => {
          (0, c.RT)("window", "isFullScreen", Boolean(document.fullscreenElement));
        }),
          (0, M.bn)(M.iL, (e) => {
            (0, c.RT)("window", M.iL, e.target.state);
          }),
          a.Z.getCurrentWindow().then((e) => {
            O.Z.listenWindowMessage(e.id, "state-on-tab-update", async (e) => {
              const t = (0, c.y0)(),
                n = j().get(t, ["currentTabInfo", "hash"]);
              e.hash !== n && ((0, c.sy)("currentTabInfo", e), await (0, E.fF)("current-tab-info-content", "Changed success.", e));
            });
          }));
        var T = n(49412);
        let I = [],
          S = null,
          D = null;
        function A(e) {
          D = e;
          for (let e of I) e();
          I = [];
          const t = O.Z.listenWindowMessage(e, "remove-prop-glob-background", ({ key: e, property: t }, n, r) => {
            ((0, c.LN)(e, t), r());
          });
          I.push(() => O.Z.removeMessageListener(t));
          const n = O.Z.listenWindowMessage(e, "dispatch-prop-glob-background", ({ key: e, property: t, value: n }, r, o) => {
            ((0, c.RT)(e, t, n), o());
          });
          I.push(() => O.Z.removeMessageListener(n));
          const r = O.Z.listenWindowMessage(e, "dispatch-store-glob-background", ({ key: e, value: t }, n, r) => {
            ((0, c.sy)(e, t), r());
          });
          I.push(() => O.Z.removeMessageListener(r));
        }
        (a.Z.getCurrentWindow().then((e) => {
          A(e.id);
        }),
          T.Z.getCurrent().then((e) => {
            S = e ? e.id : null;
          }),
          O.Z.listenMessage("window-tab-attach", (e) => {
            S === e.id && D !== e.windowId && A(e.windowId);
          }));
        var C = n(91475),
          L = n(87293);
        ((0, L.W6)("settings").then(async ({ useSystemTheme: e, theme: t }) => {
          if (e || void 0 === e) {
            (0, C.bb)() !== t && (await (0, c.zQ)("settings", "theme", (0, C.bb)()));
          }
        }),
          (0, C.E4)(async (e) => {
            (await (0, L.W6)("settings", ["useSystemTheme"], !0)) && (await (0, c.zQ)("settings", "theme", e));
          }));
      },
      62983: (e, t, n) => {
        n.d(t, { CM: () => a, HM: () => i, L2: () => m, M9: () => c, SB: () => f, VP: () => p, Vp: () => _, ZF: () => l, eA: () => r, ff: () => s, h4: () => g, hl: () => b, m2: () => d, mF: () => h, nd: () => o, qA: () => u });
        const r = "spot",
          o = "badge",
          i = "pulse",
          s = "calendar",
          a = "calendar-spot",
          c = "calendar-pulse",
          l = "commands",
          d = "sync-spot",
          u = "drive",
          p = "drive-spot",
          g = "spt",
          m = "history",
          _ = "gmail",
          h = "google-messages-new",
          b = "messengers-new",
          f = "youtube-new";
      },
      35432: (e, t, n) => {
        n.d(t, { Z: () => d });
        var r = n(16913),
          o = n(38866),
          i = n(28866),
          s = n.n(i),
          a = n(31528),
          c = n.n(a);
        function l(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        class d {
          constructor(e = {}) {
            ((this.name = c().get(e, ["name"], null)), (this.type = c().get(e, ["type"], null)), (this.toolAction = c().get(e, ["toolAction"], null)), (this.priority = c().get(e, ["priority"], 1 / 0)), (this.backgroundColor = c().get(e, ["backgroundColor"], null)), (this.foregroundColor = c().get(e, ["foregroundColor"], null)), (this.visible = c().get(e, ["visible"], !1)), (this.viewed = c().get(e, ["viewed"], !1)), (this.extra = c().get(e, ["extra"], {})), (this.conditions = c().get(e, ["conditions"], [])), (this.protections = c().get(e, ["protections"], [])));
          }
          isNew() {
            return this.getExtra("isNew", !1);
          }
          markAsNew() {
            return (this.addExtra("isNew", !0), this);
          }
          showIf(e, t) {
            return (this.conditions.push({ rules: e, satisfy: t }), this);
          }
          showIfSync(e, t) {
            return (this.protections.push({ feature: e, value: t }), this);
          }
          isConditionSuccess(e) {
            for (let t of this.protections) {
              const n = c().get(t, ["feature"]),
                i = c().get(t, ["value"]);
              if (n === o.V1 && (0, r.So)(e.identity) !== i) return !1;
              if (n !== o.V1 && (0, r.FA)(e.identity, n) !== i) return !1;
            }
            for (let t of this.conditions) if (!s()(t, e)) return !1;
            return !0;
          }
          setName(e) {
            return ((this.name = e), this);
          }
          setType(e) {
            return ((this.type = e), this);
          }
          setToolAction(e) {
            return ((this.toolAction = e), this);
          }
          setPriority(e) {
            return ((this.priority = e), this);
          }
          makeVisible(e = !0) {
            return ((this.visible = e), this);
          }
          makeViewed(e = !0) {
            return ((this.viewed = e), this);
          }
          setBackgroundColor(e) {
            return ((this.backgroundColor = e), this);
          }
          setForegroundColor(e) {
            return ((this.foregroundColor = e), this);
          }
          addExtra(e, t) {
            return ((this.extra[e] = t), this);
          }
          getExtra(e, t = null) {
            return e in this.extra ? this.extra[e] : t;
          }
        }
        (l(d, "BADGE_EXTRA_I18N", "i18n"), l(d, "BADGE_EXTRA_I18N_PARAMS", "i18nParams"), l(d, "BADGE_EXTRA_STRETCH", "stretch"));
      },
      92209: (e, t, n) => {
        n.d(t, { C: () => a, W8: () => s, ah: () => o, tD: () => c, w7: () => i });
        var r = n(88873);
        n(31528);
        const o = (e, t) => (0, r.J1)(e, "name", t),
          i = (e) => (e ? e.backgroundColor : null),
          s = (e) => (e ? e.foregroundColor : null),
          a = (e) => !!e && !1 === e.viewed && !0 === e.visible,
          c = (e, t, n) => {
            const r = ((e) => e.filter((e) => a(e)))((e = e.filter((e) => e.type === t && e.toolAction === n)));
            return 0 === r.length ? null : r.reduce((e, t) => (e.priority < t.priority ? e : t)) || null;
          };
      },
      60516: (e, t, n) => {
        n.d(t, { cE: () => o, wA: () => i, xO: () => r });
        const r = "src",
          o = "url",
          i = "raw";
      },
      4162: (e, t, n) => {
        n.d(t, { X: () => r });
        const r = (e) => Array.from(e).sort((e, t) => (Number(e.name) < Number(t.name) ? -1 : 1));
      },
      38866: (e, t, n) => {
        n.d(t, { Lm: () => c, TK: () => i, V1: () => a, bW: () => d, cL: () => l, pJ: () => s, zv: () => o });
        var r = n(39773);
        const o = "success",
          i = "error-general",
          s = "error-permission",
          a = "account",
          c = "calendar",
          l = "drive",
          d = "gmail";
        (r.hL, r.H0, r.Z3, r.gh);
      },
      38795: (e, t, n) => {
        n.d(t, { Z: () => r });
        class r {
          constructor() {
            ((this.reconnecting = !1), (this.enabled = !1), (this.feature = null), (this.accountId = null));
          }
          setAccountId(e) {
            return ((this.accountId = e || null), this);
          }
          setFeature(e) {
            return ((this.feature = e || null), this);
          }
          reconnect(e) {
            return ((this.reconnecting = e), this);
          }
          enable(e) {
            return ((this.enabled = e), this);
          }
        }
      },
      16647: (e, t, n) => {
        n.d(t, { So: () => r.So, l7: () => l, rt: () => a, vs: () => c });
        var r = n(16913),
          o = n(38866),
          i = n(31528),
          s = n.n(i);
        const a = (e, t) => {
            const n = s().get(e, [o.V1, "accountId"]) || null;
            return (0, r.bG)(e, n, t);
          },
          c = (e) => {
            const t = s().get(e, [o.V1], {});
            return (0, r.cr)(t);
          },
          l = (e) => {
            const t = s().get(e, [o.V1], {});
            return (0, r.ZT)(t);
          };
      },
      75915: (e, t, n) => {
        n.d(t, { jl: () => d, rA: () => l, s0: () => c, x0: () => u });
        var r = n(16913),
          o = n(38866),
          i = n(31528),
          s = n.n(i);
        const a = (e) => (0, r.ND)(e, o.cL),
          c = (e, t, n) => (0, r.bG)(e, t, n),
          l = (e) => {
            const t = a(e);
            return s().get(t, [0, "accountId"]) || null;
          },
          d = (e, t) => {
            const n = (0, r.ZM)(e, o.cL, t);
            return (0, r.cr)(n);
          },
          u = (e, t) => {
            const n = (0, r.ZM)(e, o.cL, t);
            return (0, r.ZT)(n);
          };
      },
      79883: (e, t, n) => {
        n.d(t, { $: () => d, p: () => l });
        var r = n(38866),
          o = n(72867),
          i = n(83118);
        function s(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            (t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r));
          }
          return n;
        }
        function a(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? s(Object(n), !0).forEach(function (t) {
                  c(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : s(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
          }
          return e;
        }
        function c(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        const l = (e, t, n = {}) => {
            const s = `identity:${e}`;
            switch (t) {
              case r.TK:
                (0, o.WW)((0, i.a)("sync_error_title"), (0, i.a)("sync_error_text_1"), a({ id: s }, n));
                break;
              case r.pJ:
                (0, o.WW)((0, i.a)("sync_error_title"), (0, i.a)("sync_error_text_2"), a({ id: s }, n));
                break;
              default:
                (0, o.sy)(s);
            }
          },
          d = (e) => {
            (0, o.Fw)(`identity:${e}`);
          };
      },
      16913: (e, t, n) => {
        n.d(t, { FA: () => a, ME: () => c, ND: () => u, So: () => l, ZM: () => d, ZT: () => g, bG: () => s, cr: () => p });
        var r = n(38866),
          o = n(31528),
          i = n.n(o);
        const s = (e, t, n) => i().get(e, ["userInfo", t, ...(n ? [n] : [])]) || null,
          a = (e, t) => {
            if (!l(e)) return !1;
            const n = u(e, t);
            for (let r of n) {
              const n = d(e, t, r.accountId);
              if (p(n) && !g(n)) return !0;
            }
            return !1;
          },
          c = (e) => i().get(e, [r.V1], {}),
          l = (e) => {
            const t = i().get(e, [r.V1]);
            return p(t) && !g(t);
          },
          d = (e, t, n) => (i().get(e, ["features"]) || []).find((e) => e.feature === t && e.accountId === n) || null,
          u = (e, t) => (i().get(e, ["features"]) || []).filter((e) => e.feature === t) || [],
          p = (e) => !0 === i().get(e, ["enabled"]),
          g = (e) => !0 === i().get(e, ["reconnecting"]);
      },
      80377: (e, t, n) => {
        n.d(t, { VN: () => r, sb: () => o, yG: () => i });
        const r = 0.25,
          o = 0.125,
          i = [0, o, r];
      },
      25275: (e, t, n) => {
        n.d(t, { D: () => o });
        var r = n(80377);
        const o = (e) => {
          let t = r.yG.indexOf(e);
          t = -1 === t ? r.yG.indexOf(r.VN) - 1 : t;
          let n = t + 1;
          return ((n = n > r.yG.length - 1 ? 0 : n), r.yG[n]);
        };
      },
      65776: (e, t, n) => {
        n.d(t, { $s: () => p, Gg: () => o, Hj: () => s, O5: () => r, P$: () => d, RH: () => i, Sw: () => l, T4: () => a, bB: () => g, ch: () => _, j6: () => u, si: () => c, tf: () => m });
        const r = "active",
          o = "trialing-local",
          i = "trialing-stripe",
          s = "trialing-stripe-available",
          a = "trialing-stripe-unavailable",
          c = "one-time",
          l = "month",
          d = "year",
          u = "year_2",
          p = "payment",
          g = "subscription",
          m = 0,
          _ = 0;
      },
      24770: (e, t, n) => {
        n.d(t, { Dv: () => d, Lh: () => l, P7: () => m, Vu: () => u, Wx: () => c });
        var r = n(65776),
          o = n(31528),
          i = n.n(o),
          s = n(45806),
          a = n(60565);
        const c = (e) => {
            if (i().get(e, ["hideWarning"], !1)) return !1;
            if (m(e).status === r.Gg) {
              const t = i().get(e, ["trialTimestamp"]);
              return (0, a._v)(t, (0, a.an)(r.ch), (0, a.an)(r.tf));
            }
            return !1;
          },
          l = (e) => {
            const t = m(e);
            return [r.O5, r.RH, r.Gg].includes(t.status);
          },
          d = (e) => !l(e),
          u = (e) => Math.max(r.tf - p(e), 0),
          p = (e) => new s.Z(Date.now()).diff(Number(e), "days"),
          g = (e, t = 90) => {
            const n = new s.Z(Date.now()).subtract(t, "days").unix();
            return e.timestampEnd > n;
          },
          m = (e) => {
            const t = i().get(e, ["subscriptions"]) || [],
              n = i().get(e, ["trialTimestamp"]);
            for (let e of t) if ("payment" === e.mode) return { status: r.O5, mode: e.mode, amount: e.amount, interval: r.si, currency: e.currency };
            for (let e of t) if ("subscription" === e.mode && ["active", "trialing"].includes(e.status)) return { status: "active" === e.status ? r.O5 : r.RH, mode: e.mode, amount: e.amount, currency: e.currency, interval: e.interval, canceled: e.canceled, timestampEnd: e.timestampEnd, timestampStart: e.timestampStart };
            for (let e of t) if ("subscription" === e.mode && "canceled" === e.status && g(e)) return { status: r.T4, mode: e.mode, amount: e.amount, currency: e.currency, interval: e.interval, canceled: e.canceled, timestampEnd: e.timestampEnd, timestampStart: e.timestampStart };
            return (o = n) && !(0, a.YM)(o, (0, a.an)(r.tf)) ? { status: r.Gg } : { status: r.Hj };
            var o;
          };
      },
      8774: (e, t, n) => {
        n.d(t, { Z: () => r });
        class r {
          constructor() {
            ((this.actions = []), (this.isRunning = !1));
          }
          push(e, ...t) {
            return (this.actions.push({ callback: e, payload: t }), this);
          }
          run() {
            this.isRunning ||
              ((this.isRunning = !0),
              this._runner().finally(() => {
                this.isRunning = !1;
              }));
          }
          async _runner() {
            if (0 === this.actions.length) return;
            const { callback: e, payload: t } = this.actions[0];
            (await e(...t), this.actions.splice(0, 1), 0 !== this.actions.length && (await this._runner()));
          }
        }
      },
      50497: (e, t, n) => {
        n.d(t, { b: () => d, l: () => l });
        var r = n(49412),
          o = n(2568),
          i = n.n(o);
        function s(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            (t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r));
          }
          return n;
        }
        function a(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? s(Object(n), !0).forEach(function (t) {
                  c(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : s(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
          }
          return e;
        }
        function c(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        const l = async () => {
            const e = (await r.Z.getCurrent()) || (await r.Z.getActive());
            return d(e);
          },
          d = (e) => {
            const t = { id: e.id, url: e.url, title: e.title, windowId: e.windowId, favIconUrl: e.favIconUrl };
            return a(a({}, t), {}, { hash: i()(JSON.stringify(t)) });
          };
      },
      88873: (e, t, n) => {
        n.d(t, { J1: () => g, MT: () => c, RK: () => m, Tw: () => u, Vr: () => _, cx: () => d, jS: () => p, o3: () => l, ru: () => h });
        var r = n(31528),
          o = n.n(r);
        function i(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            (t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r));
          }
          return n;
        }
        function s(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? i(Object(n), !0).forEach(function (t) {
                  a(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : i(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
          }
          return e;
        }
        function a(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        const c = (e, t, n) => {
            const r = [...e];
            return (r.splice(t + 1, 0, n), r);
          },
          l = (e, t, n) => {
            for (let r = 0; r < e.length; r++) if (e[r][t] === n) return r;
            return null;
          },
          d = (e, t) => {
            for (let n = 0; n < e.length; n++) if (t(e[n], n)) return n;
            return null;
          },
          u = (e, t = null) =>
            Array.from(e).filter((e, n, r) => {
              if (t) {
                for (let o = 0; o < r.length; o++) if (r[o][t] === e[t]) return o === n;
                return !1;
              }
              return r.indexOf(e) === n;
            }),
          p = (e, t, n) => e.filter((e) => e[t] !== n) || [],
          g = (e, t, n) => e.find((e) => e[t] === n) || null,
          m = (e, t, n = [], r) => {
            const i = -1 === t ? 1 : -1,
              s = -1 === t ? -1 : 1;
            return n
              ? e.sort((e, t) => {
                  const a = r ? r(o().get(e, n)) : o().get(e, n),
                    c = r ? r(o().get(t, n)) : o().get(t, n);
                  return a === c ? 0 : a < c ? i : s;
                })
              : e.sort((e, t) => {
                  const n = r ? r(e) : e,
                    o = r ? r(t) : t;
                  return n === o ? 0 : n < o ? i : s;
                });
          },
          _ = (e, t) => {
            let n = [];
            for (let r of e) {
              const e = s({}, r);
              if (t in e) {
                const r = [...e[t]];
                (delete e[t], n.push(e), (n = n.concat(_(r, t))));
              } else n.push(e);
            }
            return n;
          },
          h = (e, t, n) => {
            let r = {};
            for (let i = 0; i < e.length; i++) {
              r[o().get(e[i], t)] = n ? n(e[i], i) : e[i];
            }
            return r;
          };
      },
      43977: (e, t, n) => {
        n.d(t, { K7: () => s, LK: () => c, Mo: () => l, PM: () => i, lJ: () => a });
        var r = n(31528),
          o = n.n(r);
        self.__mgCache = self.__mgCache || {};
        const i = (e, t, ...n) => (l(e) || s(e, t(...n)), a(e)),
          s = (e, t) => {
            o().set(self.__mgCache, e, t);
          },
          a = (e, t = null) => o().get(self.__mgCache, e, t),
          c = (e) => {
            l(e) && o().del(self.__mgCache, e);
          },
          l = (e) => o().has(self.__mgCache, e);
      },
      8318: (e, t, n) => {
        n.d(t, { R4: () => c, SH: () => l, Vz: () => p, X2: () => a, q9: () => g, t_: () => i });
        var r = n(31528),
          o = n.n(r);
        const i = "application/vnd.google-apps.form",
          s = "application/vnd.google-apps.folder",
          a = "application/vnd.google-apps.document",
          c = "application/vnd.google-apps.spreadsheet",
          l = "application/vnd.google-apps.presentation",
          d = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          u = { "application/vnd.google-apps.map": { icon: null, iconAdd: null }, [i]: { icon: "painted/google-forms", iconAdd: "painted/google-forms-add" }, [s]: { icon: null, iconAdd: null }, [a]: { icon: "painted/google-docs", iconAdd: "painted/google-docs-add" }, [c]: { icon: "painted/google-sheets", iconAdd: "painted/google-sheets-add" }, [l]: { icon: "painted/google-slides", iconAdd: "painted/google-slides-add" }, [d]: { icon: null, iconAdd: null } },
          p = (e, t = "icon") => o().get(u, [e, t], null),
          g = (e) => (e ? e.replace(/\d{2}\/(type\/(application|text|image))/, "32/$1") : e);
      },
      6393: (e, t, n) => {
        n.d(t, { l: () => r });
        const r = (e) => (0 === String(e).search(/^--/) ? `var(${e})` : e);
      },
      92865: (e, t, n) => {
        n.d(t, { vD: () => s });
        var r = n(60565),
          o = n(17019);
        (0, r.LK)(15);
        const i = () =>
            o.r8
              ? [
                  { id: "price_1POQ1fCHvjzLO1pJh69b8Cvz", isBest: !1, isTrial: !0, name: "1-year plan", text: "$5 per month", title: "LIMITED WELCOME OFFER: 50% OFF", label: null, interval: "trial", price: { sum: 59.99, perMonth: 5, save: 60, fullSum: 120 } },
                  { id: "price_1NwibrCHvjzLO1pJn63Pj6v2", isBest: !1, isTrial: !1, name: "1-month plan", text: "$10 per month", title: "1-month plan", label: null, interval: "month", price: { sum: 10, perMonth: 10, save: 0, fullSum: 10 } },
                  { id: "price_1NwiclCHvjzLO1pJgeVoLEk9", isBest: !1, isTrial: !1, name: "1-year plan", text: "$5 per month", title: "1-year plan — 50% OFF, save $60", label: null, interval: "year", price: { sum: 60, perMonth: 5, save: 60, fullSum: 120 } },
                  { id: "price_1Oiy9HCHvjzLO1pJhZL1CKJc", isBest: !0, isTrial: !1, name: "2-year plan", text: "$4 per month", title: "2-year plan — 60% OFF, save $144", label: "Best deal", interval: "year_2", price: { sum: 96, perMonth: 4, save: 144, fullSum: 240 } },
                ]
              : [
                  { id: "price_1PlTkDCHvjzLO1pJweydQwKW", isBest: !1, isTrial: !0, name: "1-year plan", text: "$8.33 per month", title: "LIMITED WELCOME OFFER: 60% OFF", label: null, interval: "trial", price: { sum: 99.99, perMonth: 8.33, save: 140, fullSum: 240 } },
                  { id: "price_1PloiWCHvjzLO1pJbIQ8qXzp", isBest: !1, isTrial: !1, name: "1-month plan", text: "$20 per month", title: "1-month plan", label: null, interval: "month", price: { sum: 20, perMonth: 20, save: 0, fullSum: 20 } },
                  { id: "price_1PlTyJCHvjzLO1pJotVxzDyA", isBest: !1, isTrial: !1, name: "1-year plan", text: "$10 per month", title: "1-year plan — 50% OFF, save $120", label: null, interval: "year", price: { sum: 119.99, perMonth: 10, save: 120, fullSum: 240 } },
                  { id: "price_1PlU3iCHvjzLO1pJOxVUa9Gv", isBest: !0, isTrial: !1, name: "2-year plan", text: "$8.33 per month", title: "2-year plan — 60% OFF, save $280", label: "Best deal", interval: "year_2", price: { sum: 199.99, perMonth: 8.33, save: 280, fullSum: 480 } },
                ],
          s = () => i().filter((e) => !e.isTrial);
      },
      87293: (e, t, n) => {
        n.d(t, { W6: () => R, aU: () => N, sY: () => H, u$: () => B });
        var r = n(89386),
          o = n.n(r),
          i = n(30738),
          s = n.n(i),
          a = n(17019),
          c = n(31528),
          l = n.n(c),
          d = n(15668),
          u = n(73328),
          p = n(3219),
          g = n(39773),
          m = n(31194),
          _ = n(73098),
          h = n(13784),
          b = n(33025),
          f = n(73006),
          w = n(17834),
          y = n(38795),
          v = n(84868),
          x = n(82184),
          O = n(38866),
          k = n(81344),
          Z = n(27012),
          M = n(74653),
          P = n(96073),
          j = n(80377),
          E = n(24517),
          T = n(67007),
          I = n(66410),
          S = n(92865);
        function D(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            (t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r));
          }
          return n;
        }
        function A(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? D(Object(n), !0).forEach(function (t) {
                  C(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : D(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
          }
          return e;
        }
        function C(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        const L = new m.Z(),
          z = new h.Z(),
          F = (0, p.vc)(new Date()),
          Y = {
            api: { url: a.r8 ? "https://api-dev.manganum.app" : "https://api.manganum.app", socketUrl: a.r8 ? "ws://socket-dev.manganum.app" : "ws://socket.manganum.app", aiURL: a.r8 ? "https://ai-dev.manganum.app" : "https://ai.manganum.app" },
            firestore: { url: a.r8 ? "https://us-central1-manganum-test.cloudfunctions.net" : "https://us-central1-manganum-app.cloudfunctions.net" },
            chrome: { accounts: [], activeIds: {} },
            frames: { tabs: {}, desmos: { active: M.sx } },
            focusTime: { enabled: !1, completed: !0, soundVolume: j.VN, timestamp: null, ruleIds: [v.M, v.Bb, v.cH] },
            sidebar: { behavior: f.x, ahead: g.Zt, topOrders: E.tg, opened: !1, activeChildTools: A({}, E.iW), tabs: {} },
            sidePanel: {},
            messages: [],
            activity: { timeOpen: { launchpad: null, translate: null, calendar: null, tasks: null, notes: null, debug: null, more: null, sms: null }, timePing: { launchpad: null, translate: null, calendar: null, tasks: null, notes: null, debug: null, more: null, sms: null } },
            extension: { os: null, platform: null, installId: null, installTime: null, installVersion: null, currentVersion: null, updateTime: null, browser: null, browserLang: null, browserVersion: null, displaySize: null },
            utm: {},
            settings: A({ theme: null, useSystemTheme: !0 }, p.Sv),
            panel: { pinned: !1 },
            identity: { windows: [], userInfo: {}, features: [], [O.V1]: new y.Z(), provider: { timestamp: null, enabled: !1 } },
            widgets: { time: { enabled: !0 }, weather: { enabled: !0, errorCode: null, tempFormat: null, isDay: !0, tempC: null, tempF: null, iconName: null, iconText: null, iconCode: null, lastUpdateTime: null }, location: { source: _.KV, country: null, countryCode: null, district: null, lat: null, lon: null }, motivation: { enabled: !0, activeItemKey: 1 }, affirmation: { id: null, text: null, viewDate: null, isKing: !1, excluded: [], viewed: [] }, quote: { author: "Someone wise", excluded: [], id: 12, isKing: !1, text: "A beautiful thing is never perfect.", viewDate: F, viewed: [12] }, focus: { text: null, subText: null, finished: !1 }, lifeTimer: { date: null, type: null } },
            launchpad: {
              remove: null,
              visited: [],
              favorite: (0, x.q)(),
              bookmarks: [],
              bookmarksOpen: {},
              recentDocs: [],
              chromeTools: (0, w.o)(),
              googleWorkspace: (0, P.a)(),
              sections: [
                { enabled: !0, id: "favorite" },
                { enabled: !0, id: "visited" },
                { enabled: !0, id: "recent-docs" },
                { enabled: !0, id: "google-workspace" },
                { enabled: !0, id: "chrome-tools" },
                { enabled: !0, id: "bookmarks" },
              ],
            },
            translator: { sourceLang: null, targetLang: null, recentLanguages: {}, cache: {} },
            calendar: { data: {}, process: !1, autoOpen: !0, showPulse: !0, timestampList: 0, timestampEvents: 0, openedEventsIds: [] },
            times: [],
            gmail: { process: !1, inboxId: k.sk, syncTimestamp: null, labels: [] },
            tasks: { changeTimestamp: null, refreshTimestamp: null, showCompleted: !0, activeListId: null, activeTaskId: null, process: !1, items: {}, list: [] },
            notes: { items: [], activeNoteId: null, syncTimestamp: null, changeTimestamp: null },
            sms: { installs: {}, messages: [], viewedIds: [], disconnectIds: [], syncTimestamp: null, showPulse: !0, showBadge: !0, process: !1 },
            history: { recent: [] },
            contextRaw: { [m.Z.getSlotName(L)]: { loaded: [L.id] } },
            contextActive: null,
            contextCover: { [m.Z.getSlotName(L)]: L, [h.Z.SLOT_NAME]: z },
            contextSettings: { enabledAutoUpdate: !0, isProcess: !1, isEmpty: !1, isKing: !1, filters: { coverIds: Z.Z.DEFAULT_SELECTED, preference: d.Z.PREFERENCE_WITH_VIDEO }, excluded: {}, animations: { [T.Z.ANIM_LOAD]: new T.Z(T.Z.ANIM_LOAD, 500, "ease-in"), [T.Z.ANIM_SHOW]: new T.Z(T.Z.ANIM_SHOW, 500, "ease-in"), [T.Z.ANIM_HIDE]: new T.Z(T.Z.ANIM_HIDE, 500, "ease-out"), [T.Z.ANIM_SLIDE]: new T.Z(T.Z.ANIM_SLIDE, 750, "cubic-bezier(0.45, 0.05, 0.55, 0.95)"), [T.Z.ANIM_REPLAY]: new T.Z(T.Z.ANIM_REPLAY, 2e3, "linear").addExtraParam("videoStart", null).addExtraParam("videoEnd", null), [T.Z.ANIM_CHANGE]: new T.Z(T.Z.ANIM_CHANGE, 750, "cubic-bezier(0.45, 0.05, 0.55, 0.95)"), [T.Z.ANIM_SWITCH]: new T.Z(T.Z.ANIM_SWITCH, 2e3, "ease-in-out") } },
            onboarding: { [I.aG]: { step: 1, enabled: !1, sidebar: !0, settings: !0 }, [I.EU]: { step: 1 }, [I.Y_]: { window: !0 }, [I.o3]: {} },
            news: { timestampView: null },
            site: { searchAI: { enabled: !0 } },
            search: { autofocus: !1, autoSwitch: !1, engineName: b.nN },
            plus: { trialTimestamp: Date.now(), subscriptions: [], hideWarning: !1 },
            prices: (0, S.vD)(),
            commands: [],
            commandActivation: {},
            badges: [],
            debugConfig: { debugKeys: [] },
            cacheStorage: {},
            events: { batch: [], batchTimestamp: null },
            fcm: { cache: {} },
            hashes: {},
            driveSettings: { lastFolderId: null, sections: {}, sort: {} },
            updates: { version: null, timestamp: null },
            trial: { startTimestamp: null },
          },
          R = async (e, t = [], n = null) => {
            const r = await u.Z.getLocal(e),
              o = l().get(r, t);
            if (null != o) return o;
            const i = W(e, Y, r);
            return l().get(i, t, n);
          },
          N = async (e) => {
            const t = {},
              n = H();
            e = Array.isArray(e) ? e : Object.keys(n);
            const r = (await u.Z.getAllLocal()) || {};
            for (let o of e) {
              if (!(o in n)) throw new Error(`Unknown property '${o}'.`);
              t[o] = o in r ? r[o] : n[o];
            }
            return t;
          },
          W = (e, t, n) => {
            const r = l().get(t, [e], {});
            return Array.isArray(r) ? (null == n ? s()(r, !0) : n) : o()(s()(r, !0), n);
          },
          H = (e = []) => l().get(s()(Y, !0), e),
          B = async (e, t, n) => {
            if (0 === t.length) return await u.Z.setLocal(e, n);
            const r = (await R(e)) || {};
            return (l().set(r, t.map(String), n), await u.Z.setLocal(e, r));
          };
      },
      86101: (e, t, n) => {
        n.d(t, { N: () => s });
        var r = n(33893),
          o = n(31528),
          i = n.n(o);
        const s = (e, t = {}) => {
          const n = i().get(t, ["delimiter"], ","),
            o = /("[^"]*.*?["$]*"\s<.*?>)/,
            s = e.split(o),
            a = [];
          for (let e of s)
            if (((e = e ? (0, r.fy)(e) : e), e))
              if (0 !== e.search(o)) for (let t of e.split(n)) ((t = t ? (0, r.fy)(t) : t), t && a.push(t));
              else a.push(e);
          return a;
        };
      },
      13444: (e, t, n) => {
        n.d(t, { Z: () => d });
        var r = n(27484),
          o = n.n(r),
          i = n(70178),
          s = n.n(i),
          a = n(45806),
          c = n(29387),
          l = n.n(c);
        (o().extend(s()), o().extend(l()));
        class d extends a.Z {
          constructor(e, t) {
            super(o().tz(e, t));
          }
          tz(e, t) {
            return ((this._d = this._d.tz(e, t)), this);
          }
          static guess() {
            return o().tz.guess();
          }
        }
      },
      45806: (e, t, n) => {
        n.d(t, { Z: () => b });
        var r = n(27484),
          o = n.n(r),
          i = (n(25054), n(7124)),
          s = n.n(i),
          a = n(66607),
          c = n.n(a),
          l = n(79212),
          d = n.n(l),
          u = n(37412),
          p = n.n(u),
          g = n(28734),
          m = n.n(g),
          _ = n(10285),
          h = n.n(_);
        (o().extend(s()), o().extend(c()), o().extend(d()), o().extend(p()), o().extend(m()), o().extend(h()));
        class b {
          constructor(e, t, n, r) {
            this._d = o()(b.wrap(e), t, n, r);
          }
          static wrap(e) {
            return e instanceof b ? e._d : e;
          }
          format(e) {
            return this._d.format(e);
          }
          subtract(e, t) {
            return ((this._d = this._d.subtract(e, t)), this);
          }
          add(e, t) {
            return ((this._d = this._d.add(e, t)), this);
          }
          set(e, t) {
            return ((this._d = this._d.set(e, t)), this);
          }
          locale(e, t) {
            return ((this._d = this._d.locale(e, t)), this);
          }
          toISOString() {
            return this._d.toISOString();
          }
          isSame(e, t) {
            return this._d.isSame(b.wrap(e), t);
          }
          isSameOrBefore(e, t) {
            return this._d.isSameOrBefore(b.wrap(e), t);
          }
          isSameOrAfter(e, t) {
            return this._d.isSameOrAfter(b.wrap(e), t);
          }
          isBefore(e, t) {
            return this._d.isBefore(b.wrap(e), t);
          }
          isToday() {
            return this._d.isToday();
          }
          isAfter(e, t) {
            return this._d.isAfter(b.wrap(e), t);
          }
          isBetween(e, t, n, r) {
            return this._d.isBetween(b.wrap(e), b.wrap(t), n, r);
          }
          startOf(e) {
            return ((this._d = this._d.startOf(e)), this);
          }
          endOf(e) {
            return ((this._d = this._d.endOf(e)), this);
          }
          diff(e, t, n) {
            return this._d.diff(b.wrap(e), t, n);
          }
          clone() {
            return new b(this._d.clone());
          }
          unix() {
            return this._d.unix();
          }
          utc(e) {
            return ((this._d = this._d.utc(e)), this);
          }
          toDate() {
            return this._d.toDate();
          }
          toString() {
            return this._d.toString();
          }
          isValid() {
            return this._d.isValid();
          }
        }
      },
      3219: (e, t, n) => {
        n.d(t, { IL: () => u, OS: () => w, Sv: () => g, Vv: () => y, Yp: () => h, c0: () => v, cz: () => d, lD: () => l, ln: () => p, nl: () => b, vc: () => f, zk: () => x });
        var r = n(45806),
          o = n(31528),
          i = n.n(o);
        function s(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            (t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r));
          }
          return n;
        }
        function a(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? s(Object(n), !0).forEach(function (t) {
                  c(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : s(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
          }
          return e;
        }
        function c(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        const l = { formatDDM: "ddd, MMM D", formatDDMY: "ddd, MMM D YYYY", formatDM: "MMM D", formatDMY: "MMM D, YYYY", formatInput: "MM.DD.YYYY" },
          d = { formatHM: "h:mm", formatHMA: "h:mma" },
          u = { formatDDM: "ddd, D MMM", formatDDMY: "ddd, D MMM YYYY", formatDM: "D MMM", formatDMY: "D MMM, YYYY", formatInput: "DD.MM.YYYY" },
          p = { formatHM: "HH:mm", formatHMA: "HH:mm" },
          g = a(a({}, l), d),
          m = (a(a({}, u), p), { "ddd, MMM D": "dddd, MMMM D", "ddd, D MMM": "dddd, D MMMM", "ddd, MMM D YYYY": "dddd, MMMM D, YYYY", "ddd, D MMM YYYY": "dddd, D MMMM, YYYY", "MMM D, YYYY": "MMMM D, YYYY", "D MMM, YYYY": "D MMMM, YYYY", "MMM D": "MMMM D", "D MMM": "D MMMM" }),
          _ = { "ddd, MMM D": "dddd, MMMM Do", "ddd, D MMM": "dddd, Do MMMM", "ddd, MMM D YYYY": "dddd, MMMM Do, YYYY", "ddd, D MMM YYYY": "dddd, Do MMMM, YYYY", "MMM D, YYYY": "MMM Do, YYYY", "D MMM, YYYY": "Do MMM, YYYY", "MMM D": "MMM Do", "D MMM": "Do MMM" },
          h = (e) => i().get(m, [e]),
          b = (e) => i().get(_, [e]),
          f = (e, t = "YYYY-MM-DD") => new r.Z(e).format(t),
          w = (e, t, n) => {
            const r = O(e, n) ? t.formatDM : t.formatDMY;
            return f(e, r);
          },
          y = (e, t, n) => {
            const r = O(e, n) ? `${t.formatDM}, ${t.formatHMA}` : `${t.formatDMY}, ${t.formatHMA}`;
            return f(e, r);
          },
          v = (e, t, n) => {
            const r = O(e, n) ? t.formatDDM : t.formatDDMY;
            return f(e, r);
          },
          x = (e, t) => new r.Z(e).isSame(new r.Z(t || new Date()), "day"),
          O = (e, t) => new r.Z(e).isSame(new r.Z(t || new Date()), "year");
      },
      60709: (e, t, n) => {
        n.d(t, { fF: () => a, oM: () => o });
        var r = n(87293);
        n(88873);
        const o = ["events", "badges", "socket", "socket-sync", "update-context", "events-batch", "identity", "calendar", "tasks", "notes", "sms", "synchronization", "offscreen", "keep-alive", "plus", "gmail", "current-tab-info-bg", "current-tab-info-content", "updates", "chrome-info"],
          i = { loaded: !1, keys: [] },
          s = async () => (!1 === i.loaded && ((i.loaded = !0), (i.keys = await (0, r.W6)("debugConfig", ["debugKeys"], []))), i.keys),
          a = async (e, ...t) => {
            for (let e in t) "function" == typeof t[e] && (t[e] = t[e]());
            (await s()).includes(e) && c("[" + e + "]", ...t);
          },
          c = (...e) => {
            console.log(...e);
          };
      },
      44169: (e, t, n) => {
        n.d(t, { A8: () => s, dT: () => o, sB: () => i });
        var r = n(46545);
        n(87293);
        const o = (e, t, n, o = {}) => {
            r.Z.sendBackgroundMessage("dispatch-prop-glob-content", { key: e, property: t, value: n, options: o });
          },
          i = (e, t, n = {}) => {
            r.Z.sendBackgroundMessage("remove-prop-glob-content", { key: e, property: t, options: n });
          },
          s = (e, t, n = {}) => {
            r.Z.sendBackgroundMessage("dispatch-store-glob-content", { key: e, value: t, options: n });
          };
      },
      38012: (e, t, n) => {
        n.d(t, { $9: () => m, $H: () => b, Du: () => h, F8: () => g, Nj: () => c, Ru: () => d, dt: () => l, ji: () => p, lQ: () => _, sD: () => u });
        var r = n(43977),
          o = n(31528),
          i = n.n(o),
          s = n(75877);
        let a = document.body;
        const c = (e) => {
            a = e;
          },
          l = () => a,
          d = (e, t, n) => {
            const r = l();
            return u(r, e, t, n);
          },
          u = (e, t, n, r) => {
            const o = (e) => {
              const t = String(e.target.nodeName).toLowerCase();
              if (["manganum-sidebar"].includes(t)) return;
              const o = e.composedPath();
              for (let e of o) if (n === e) return;
              r(e);
            };
            return (e.addEventListener(t, o, !0), o);
          },
          p = (e, t) => {
            l().removeEventListener(e, t, !0);
          },
          g = (e, t = {}) => {
            const n = e.getBoundingClientRect(),
              r = i().get(t, ["elementHeight"]),
              o = r ? n.top + r : n.bottom;
            let a;
            (i().get(t, ["detectScrollCollision"], !0) && (a = e.closest(s.C)), a || (a = l().querySelector('[data-content="top"]') || l()));
            return o > a.getBoundingClientRect().bottom ? "up" : "down";
          },
          m = (e) => {
            const t = (t) => e("visible" === document.visibilityState, t);
            return (document.addEventListener("visibilitychange", t), t);
          },
          _ = (e) => {
            document.removeEventListener("visibilitychange", e);
          },
          h = () => {
            let e;
            return (window.getSelection ? (e = window.getSelection()) : document.selection && (e = document.selection.createRange()), e.toString());
          },
          b = (e, t = {}) => {
            const n = { margin: i().get(t, ["margin"], "0"), padding: i().get(t, ["padding"], "0"), fontSize: i().get(t, ["fontSize"], "12"), borderWidth: i().get(t, ["borderWidth"], "0"), fontWeight: i().get(t, ["fontWeight"], "normal"), boxSizing: i().get(t, ["boxSizing"], "border-box"), letterSpacing: i().get(t, ["letterSpacing"], "normal"), fontFamily: i().get(t, ["font-family"], "Inter, sans-serif") },
              o = `text-width:${e}:${Object.values(n).join(":")}`,
              s = (0, r.lJ)(o);
            if (s || 0 === s) return s;
            const a = document.createElement("span");
            for (let e in n) a.style[e] = n[e];
            ((a.style.visibility = "hidden"), (a.style.position = "fixed"), (a.style.top = "-1000px"), (a.innerHTML = e), l().append(a));
            const c = a.getBoundingClientRect();
            return ((0, r.K7)(o, Math.ceil(c.width)), a.remove(), (0, r.lJ)(o));
          };
      },
      56729: (e, t, n) => {
        n.d(t, { n: () => r });
        const r = (e) => e && e.includes("@manganum.app");
      },
      52914: (e, t, n) => {
        n.d(t, { Z: () => c });
        var r = n(6767),
          o = n.n(r),
          i = n(31528),
          s = n.n(i),
          a = n(31982);
        class c {
          constructor(e) {
            this._color = o()(e);
          }
          contrast(e) {
            return this._color.contrast(o()(e));
          }
          correctContrast(e, t) {
            const n = new a.Il({ name: "Color", colorKeys: [this.toHex()], ratios: [e], colorspace: "HSL" }),
              r = new a.Q2({ colors: [n], backgroundColor: t || "#FFFFFF" });
            return s().get(r.contrastColors, [1, "values", 0, "value"], null);
          }
          toHex() {
            return this._color.hex();
          }
        }
      },
      33259: (e, t, n) => {
        n.d(t, { Z: () => s });
        var r = n(31528),
          o = n.n(r);
        function i(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        class s {
          constructor(e = {}) {
            ((this.id = o().get(e, ["id"], null)), (this.type = o().get(e, ["type"], null)), (this.coverId = o().get(e, ["coverId"], null)), (this.posterUrl = o().get(e, ["posterUrl"], null)), (this.originImageURL = o().get(e, ["originImageURL"], null)), (this.originVideoURL = o().get(e, ["originVideoURL"], null)), (this.colors = o().get(e, ["colors"], [])), (this.description = o().get(e, ["description"], {})), (this.copyright = o().get(e, ["copyright"], {})), (this.videoPause = o().get(e, ["videoPause"], !1)), (this.viewDate = o().get(e, ["viewDate"], null)), (this.visa = o().get(e, ["visa"], null)), (this.extra = o().get(e, ["extra"], {})), (this.isActive = o().get(e, ["isActive"], !1)));
          }
          static getSlotName(e) {
            return `${e.coverId}-${e.type}`;
          }
          activate(e = !0) {
            return ((this.isActive = e), this);
          }
          setId(e) {
            return ((this.id = null !== e ? String(e) : null), this);
          }
          setCoverId(e) {
            return ((this.coverId = null !== e ? String(e) : null), this);
          }
          setType(e) {
            return ((this.type = e), this);
          }
          setImageOriginURL(e) {
            return ((this.originImageURL = e), this);
          }
          setPosterUrl(e) {
            return ((this.posterUrl = e), this);
          }
          setVideoOriginURL(e) {
            return ((this.originVideoURL = e), this);
          }
          setColors(e) {
            return ((this.colors = e), this);
          }
          addColor(e) {
            return (this.colors.push(e), this);
          }
          setDescription(e) {
            return ((this.description = e), this);
          }
          addDescription(e, t) {
            return ((this.description[e] = t), this);
          }
          setCopyright(e) {
            return ((this.copyright = e), this);
          }
          addCopyright(e, t) {
            return ((this.copyright[e] = t), this);
          }
          setVideoPause(e) {
            return ((this.videoPause = e), this);
          }
          setVisa(e) {
            return ((this.visa = e), this);
          }
          setViewDate(e) {
            return ((this.viewDate = e), this);
          }
          addExtraParam(e, t) {
            return ((this.extra[e] = t), this);
          }
        }
        (i(s, "VISA_BASE", "base"), i(s, "VISA_AUTO", "auto"), i(s, "VISA_CUSTOM", "custom"), i(s, "TYPE_IMAGE", "image"), i(s, "TYPE_VIDEO", "video"), i(s, "TYPE_COLOR", "color"), i(s, "TYPE_PALLET", "palette"));
      },
      31194: (e, t, n) => {
        n.d(t, { Z: () => a });
        var r = n(17019),
          o = n(3219),
          i = n(33259),
          s = n(91082);
        class a extends i.Z {
          constructor() {
            (super(),
              r.r8
                ? this.activate(!0)
                    .setId("50030")
                    .setCoverId("5")
                    .setVisa(i.Z.VISA_BASE)
                    .setType(i.Z.TYPE_PALLET)
                    .setColors(["#08D9D6", "#252A34", "#FF2E63", "#EAEAEA"])
                    .addDescription(s.k$, "Bright Turquoise, Charade, Radical Red and Gallery.")
                    .addCopyright(s.k$, 'Palette from <a href="https://colorhunt.co/palette/17117" target="_blank">Color Hunt</a>.')
                    .setViewDate((0, o.vc)(new Date()))
                : this.activate(!0)
                    .setId("10070")
                    .setCoverId("1")
                    .setVisa(i.Z.VISA_BASE)
                    .setType(i.Z.TYPE_VIDEO)
                    .setVideoOriginURL("/assets/images/context/10070-fhd.mp4")
                    .addDescription(s.k$, "Moraine Lake.")
                    .addCopyright(s.k$, "Video from our signature collection.")
                    .addExtraParam("videoTransition", 2e3)
                    .addExtraParam("videoStart", null)
                    .addExtraParam("videoEnd", null)
                    .setViewDate((0, o.vc)(new Date())));
          }
        }
      },
      13784: (e, t, n) => {
        n.d(t, { Z: () => a });
        var r,
          o,
          i,
          s = n(33259);
        class a extends s.Z {
          constructor(e) {
            (super(e), this.setId("0").setCoverId("0").activate(!0).setVisa(s.Z.VISA_CUSTOM));
          }
        }
        ((i = "custom"), (o = "SLOT_NAME") in (r = a) ? Object.defineProperty(r, o, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : (r[o] = i));
      },
      15668: (e, t, n) => {
        n.d(t, { Z: () => a });
        var r = n(31528),
          o = n.n(r),
          i = n(33259);
        function s(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        class a {
          constructor(e) {
            ((this.id = o().get(e, ["id"], null)), (this.name = o().get(e, ["name"], null)), (this.i18n = o().get(e, ["i18n"], null)), (this.imageUrl = o().get(e, ["imageUrl"], null)), (this.contextTypes = o().get(e, ["contextTypes"], [])));
          }
          get icons() {
            const e = [],
              t = this.contextTypes;
            return ((t.includes(i.Z.TYPE_IMAGE) || t.includes(i.Z.TYPE_COLOR) || t.includes(i.Z.TYPE_PALLET)) && e.push("photo"), t.includes(i.Z.TYPE_VIDEO) && e.push("video"), e);
          }
          setId(e) {
            return ((this.id = null !== e ? String(e) : null), this);
          }
          setName(e) {
            return ((this.name = e), this);
          }
          setI18n(e) {
            return ((this.i18n = e), this);
          }
          setImageUrl(e) {
            return ((this.imageUrl = e), this);
          }
          addContextTypes(e) {
            return (this.contextTypes.includes(e) || this.contextTypes.push(e), this);
          }
          isActive(e, t) {
            return e.includes(this.id) && !1 === this.isDisabled(t);
          }
          isDisabled(e) {
            return e === a.PREFERENCE_ONLY_VIDEO && !this.contextTypes.includes(i.Z.TYPE_VIDEO);
          }
          coverTypes() {
            const e = [];
            return ((this.contextTypes.includes(i.Z.TYPE_IMAGE) || this.contextTypes.includes(i.Z.TYPE_COLOR) || this.contextTypes.includes(i.Z.TYPE_PALLET)) && e.push(a.TYPE_IMAGE), this.contextTypes.includes(i.Z.TYPE_VIDEO) && e.push(a.TYPE_VIDEO), e);
          }
        }
        (s(a, "PREFERENCE_NO_VIDEO", "no-video"), s(a, "PREFERENCE_WITH_VIDEO", "with-video"), s(a, "PREFERENCE_ONLY_VIDEO", "only-video"), s(a, "TYPE_IMAGE", "image"), s(a, "TYPE_VIDEO", "video"));
      },
      27012: (e, t, n) => {
        n.d(t, { Z: () => l });
        var r,
          o,
          i,
          s = n(55971),
          a = n(33259),
          c = n(15668);
        class l {
          constructor() {
            this.items = [
              new c.Z()
                .setId(1)
                .setName("nature")
                .setI18n("collection_name_nature")
                .setImageUrl((0, s.B0)("/assets/images/cover/image-1.jpg"))
                .addContextTypes(a.Z.TYPE_VIDEO)
                .addContextTypes(a.Z.TYPE_IMAGE),
              new c.Z()
                .setId(2)
                .setName("architecture")
                .setI18n("collection_name_architecture")
                .setImageUrl((0, s.B0)("/assets/images/cover/image-2.jpg"))
                .addContextTypes(a.Z.TYPE_IMAGE),
              new c.Z()
                .setId(3)
                .setName("satellite")
                .setI18n("collection_name_earth")
                .setImageUrl((0, s.B0)("/assets/images/cover/image-3.jpg"))
                .addContextTypes(a.Z.TYPE_IMAGE),
              new c.Z()
                .setId(4)
                .setName("art")
                .setI18n("collection_name_art")
                .setImageUrl((0, s.B0)("/assets/images/cover/image-4.jpg"))
                .addContextTypes(a.Z.TYPE_IMAGE),
              new c.Z()
                .setId(5)
                .setName("colors")
                .setI18n("collection_name_color")
                .setImageUrl((0, s.B0)("/assets/images/cover/image-5.jpg"))
                .addContextTypes(a.Z.TYPE_PALLET),
              new c.Z()
                .setId(6)
                .setName("visualisingai")
                .setI18n("collection_name_ai")
                .setImageUrl((0, s.B0)("/assets/images/cover/image-6.jpg"))
                .addContextTypes(a.Z.TYPE_IMAGE),
            ];
          }
          map(e) {
            return this.items.map(e);
          }
          filter(e) {
            return this.items.filter(e);
          }
          get slots() {
            const e = [];
            for (const t of this.items) for (const n of t.contextTypes) e.push({ slotName: `${t.id}-${n}`, cover: t, contextType: n });
            return e;
          }
          getCover(e) {
            return this.items.find((t) => t.id === e) || null;
          }
        }
        ((i = ["1", "2", "3", "4"]), (o = "DEFAULT_SELECTED") in (r = l) ? Object.defineProperty(r, o, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : (r[o] = i));
      },
      17019: (e, t, n) => {
        n.d(t, { i8: () => i, jF: () => s, oi: () => r, r8: () => o });
        const r = "mn" === "mn",
          o = !1,
          i = "26.10.12",
          s = 0;
      },
      47132: (e, t, n) => {
        n.d(t, { n4: () => a });
        (n(87293), n(24770));
        var r = n(17019),
          o = (n(94502), n(46545)),
          i = n(8774);
        (n(31528), n(60709));
        const s = r.oi,
          a =
            (new i.Z(),
            (e, t = {}) => {
              s && o.Z.sendBackgroundMessage("events-batch", { eventName: e, extraParams: t });
            });
        Math.round(Date.now() / 1e3);
      },
      94502: (e, t, n) => {
        (n(55971), n(17563), n(87293));
      },
      83118: (e, t, n) => {
        n.d(t, { a: () => l });
        var r = n(31528),
          o = n.n(r),
          i = n(81933),
          s = n.n(i),
          a = n(91082);
        const c = (function (e) {
          let t = {};
          for (let n of e) for (const e of a.E7) (e in t || (t[e] = {}), (t[e][n.locales] = { [n.message]: n[e] }));
          return t;
        })(s());
        const l = (e, t) => {
          if (chrome.i18n)
            try {
              return chrome.i18n.getMessage(e, t);
            } catch (e) {}
          return o().get(c, [(0, a.G3)(), e, "message"], null);
        };
      },
      44846: (e, t, n) => {
        n.d(t, { O: () => a, r: () => s });
        var r = n(38012),
          o = n(43977),
          i = n(72045);
        const s = (e, t) => {
            const n = (0, i.Z)();
            let s = setInterval(e, t);
            (0, o.K7)(["interval-keys", n], s);
            return {
              func: (0, r.$9)((r) => {
                (clearInterval(s), r && (e(), (s = setInterval(e, t)), (0, o.K7)(["interval-keys", n], s)));
              }),
              id: n,
            };
          },
          a = (e) => {
            if (e) {
              const t = (0, o.lJ)(["interval-keys", e.id]);
              (clearInterval(t), (0, r.lQ)(e.func), (0, o.LK)(["interval-keys", e.id]));
            }
          };
      },
      17583: (e, t, n) => {
        n.d(t, { d: () => i });
        var r = n(31528),
          o = n.n(r);
        const i = (e, t = {}) => {
          const n = o().get(t, ["direction"], "down"),
            r = o().get(t, ["activeIndex"], null),
            i = o().get(t, ["useEmpty"], !1);
          return "up" === n ? (null === r || r < 0 ? e.length - 1 : 0 === r ? (i ? null : e.length - 1) : r - 1) : null === r || r < 0 ? 0 : r >= e.length - 1 ? (i ? null : 0) : r + 1;
        };
      },
      91082: (e, t, n) => {
        n.d(t, { E7: () => s, G3: () => c, k$: () => i });
        var r = n(31528),
          o = n.n(r);
        const i = "en",
          s = ["en"];
        let a = null;
        const c = () => {
          if (a) return a;
          if (chrome.i18n)
            try {
              const e = /^(?<language>[a-z]{2})/.exec(chrome.i18n.getUILanguage()),
                t = o().get(e, ["groups", "language"], i);
              return ((a = s.includes(t) ? t : i), a);
            } catch (e) {}
          return i;
        };
      },
      73098: (e, t, n) => {
        n.d(t, { KV: () => r });
        const r = "auto";
      },
      72867: (e, t, n) => {
        n.d(t, { Fw: () => m, Gd: () => b, MZ: () => u, SR: () => f, WW: () => p, sy: () => _ });
        var r = n(72045),
          o = n(31528),
          i = n.n(o),
          s = n(43757);
        function a(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            (t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r));
          }
          return n;
        }
        function c(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? a(Object(n), !0).forEach(function (t) {
                  l(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : a(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
          }
          return e;
        }
        function l(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        const d = "global",
          u = 5,
          p = (e, t, n = {}) => {
            const r = w(e, t, c(c({}, n), {}, { func: "local" }));
            return ((0, s.RT)("messagesState", r.id, r), r);
          },
          g = (e) => {
            (0, s.RH)("messagesState", e);
          },
          m = (e) => {
            (0, s.LN)("messagesState", e);
          },
          _ = (e) => {
            const t = h(e);
            t ? (0, s.RT)("messagesState", e, c(c({}, t), {}, { show: !1 })) : m(e);
          },
          h = (e) => i().get((0, s.y0)(), ["messagesState", e]) || null,
          b = (e) => {
            e.func === d ? g(e.id) : m(e.id);
          },
          f = (e) => {
            e.func === d
              ? ((e) => {
                  const t = h(e);
                  t ? (0, s.Z7)("messagesState", e, c(c({}, t), {}, { show: !1 })) : g(e);
                })(e.id)
              : _(e.id);
          },
          w = (e, t, n) => ({ title: e, text: t, show: !0, timestamp: Date.now(), func: i().get(n, ["func"]), id: i().get(n, ["id"]) || (0, r.Z)(), autoClose: i().get(n, ["autoClose"], !0), leavingTime: i().get(n, ["leavingTime"], u), includeActions: i().get(n, ["includeActions"]) || [], excludeActions: i().get(n, ["excludeActions"]) || [], extra: i().get(n, ["extra"], {}) });
      },
      2527: (e, t, n) => {
        n.d(t, { Fv: () => r });
        const r = (e) => (null === e ? e : Number(String(e).replace(/\s/, "")));
      },
      66410: (e, t, n) => {
        n.d(t, { EU: () => c, Oh: () => _, Tv: () => m, Y_: () => l, _x: () => u, aG: () => a, ao: () => b, hM: () => h, ku: () => p, nz: () => g, o3: () => d });
        var r = n(53261),
          o = n(31528),
          i = n.n(o),
          s = n(17019);
        const a = "setup",
          c = "brows_setup",
          l = "side-panel",
          d = "sidebar-tool",
          u = "explore-pin",
          p = "explore-apps",
          g = "explore-hover",
          m = "explore-hover-open",
          _ = (e, t) => !!b(e, a) && i().get(e, [a, t], !0),
          h = (e, t) => (b(e, a) ? a : b(e, p, { entry: t }) ? p : b(e, g, { entry: t }) ? g : b(e, m, { entry: t }) ? m : b(e, u, { entry: t }) ? u : null),
          b = (e, t, n = {}) => {
            if (s.r8) return !1;
            switch (t) {
              case l: {
                const r = i().get(n, ["feature"]);
                return i().get(e, [t, r], !0);
              }
              case a: {
                const n = i().get(e, [t, "sidebar"], !1),
                  r = i().get(e, [t, "settings"], !1);
                return (n || r) && i().get(e, [t, "enabled"], !1);
              }
              case d: {
                const r = i().get(n, ["action"]);
                return i().get(e, [t, r], !1);
              }
              case p:
                return i().get(n, ["entry"]) === r.WW && i().get(e, [t], !1);
              case g:
                return i().get(n, ["entry"]) === r.cQ && i().get(e, [t], !1);
              case m:
                return i().get(n, ["entry"]) === r.cQ && i().get(e, [t], !1);
              case u:
                return i().get(n, ["entry"]) === r.cQ && i().get(e, [t], !1);
              case "first-auth":
                return i().get(e, [t], !1);
            }
            return !1;
          };
      },
      35488: (e, t, n) => {
        n.d(t, { j0: () => c });
        var r = n(53261),
          o = n(17563),
          i = (n(55971), n(31528)),
          s = n.n(i);
        const a = "welcome",
          c = (e, t) => {
            if (e === r.WW) {
              const e = o.parseUrl(t),
                n = s().get(e.query, ["_page"], null);
              if (n === a) return n;
            }
            return null;
          };
      },
      979: (e, t, n) => {
        n.d(t, { AD: () => s, Li: () => i, R3: () => o, bn: () => a, iL: () => r });
        const r = "microphone",
          o = "denied",
          i = "prompt",
          s = (e) =>
            new Promise((t) => {
              navigator.permissions.query({ name: e }).then((e) => {
                t(e.state);
              });
            }),
          a = (e, t) => {
            navigator.permissions.query({ name: e }).then((e) => {
              e.onchange = t;
            });
          };
      },
      51111: (e, t, n) => {
        n.d(t, { dE: () => d, fq: () => l, pv: () => u });
        var r = n(24517),
          o = n(43757),
          i = n(46545);
        function s(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            (t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r));
          }
          return n;
        }
        function a(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? s(Object(n), !0).forEach(function (t) {
                  c(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : s(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
          }
          return e;
        }
        function c(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        const l = (e, t, n) => {
            (0, o.zQ)("sidebar", "tabs", a(a({}, e.tabs), {}, { [t.panelId]: { activeAction: t.action, extra: t.extra || {} } })).then(n);
          },
          d = (e, t, n) => {
            i.Z.sendBackgroundMessage("chrome-panel-open", {}, () => {
              l(e, t, n);
            });
          },
          u = (e, t, n) => {
            const s = (0, r.Vw)([...r.MZ, ...r.zy], t.action);
            s && ((0, o.MS)("sidebar", a(a({}, e), {}, { activeChildTools: a(a({}, e.activeChildTools), {}, { [s.action]: t.action }), tabs: a(a({}, e.tabs), {}, { [t.panelId]: { activeAction: s.action, extra: t.extra || {} } }) })).catch(console.warn), i.Z.sendBackgroundMessage("chrome-panel-open", {}, n));
          };
      },
      84261: (e, t, n) => {
        function r(e = []) {
          return e[Math.floor(Math.random() * e.length)];
        }
        n.d(t, { M9: () => r });
      },
      32796: (e, t, n) => {
        n.d(t, { Z: () => s });
        var r = n(67294),
          o = n(31528),
          i = n.n(o);
        class s {
          constructor() {
            this._storage = {};
          }
          create(e) {
            return ((this._storage[e] = (0, r.createRef)()), this);
          }
          upsert(e) {
            return this._storage[e] || (this._storage[e] = (0, r.createRef)());
          }
          element(e, t = 0) {
            let n = i().get(this._storage, [e, "current"]);
            for (let e = 0; e < t; e++) if (((n = i().get(n, ["ref", "current"])), !n)) return null;
            return n;
          }
        }
      },
      94688: (e, t, n) => {
        n.d(t, { Z: () => o });
        var r = n(25271);
        const o = { eq: (e, t) => (0, r.compare)(e, t, "="), lt: (e, t) => (0, r.compare)(e, t, "<"), gt: (e, t) => (0, r.compare)(e, t, ">"), lte: (e, t) => (0, r.compare)(e, t, "<="), gte: (e, t) => (0, r.compare)(e, t, ">=") };
      },
      99272: (e, t, n) => {
        n.d(t, { Qd: () => g, TC: () => p, UQ: () => m, bp: () => d, l2: () => u });
        var r = n(43757),
          o = n(87293),
          i = n(31528),
          s = n.n(i);
        function a(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            (t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r));
          }
          return n;
        }
        function c(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? a(Object(n), !0).forEach(function (t) {
                  l(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : a(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
          }
          return e;
        }
        function l(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        const d = (e = {}, t) => {
            m(c(c({}, e), {}, { activeAction: null }), t);
          },
          u = (e, t = {}, n) => {
            m(c(c({}, t), {}, { showWidget: !0, activeAction: e }), n);
          },
          p = (e = {}, t) => {
            m(c(c({}, e), {}, { extra: {}, showWidget: !1 }), t);
          },
          g = (e, t = {}, n) => {
            const r = _();
            (0, o.W6)("sidebar", ["tabs", r]).then((r) => {
              if (s().get(r, ["showWidget"], !1)) {
                const o = s().get(r, ["activeAction"], null);
                e === o ? p(t, n) : u(e, t, n);
              } else u(e, t, n);
            });
          },
          m = (e, t) => {
            const n = _();
            (0, o.W6)("sidebar", ["tabs"]).then((o) => {
              const i = s().get(o, [n]) || {},
                a = c(c({}, o || {}), {}, { [n]: c(c({}, i), e) });
              (0, r.zQ)("sidebar", "tabs", a, { onlyCurrentTab: !0 }).then(t);
            });
          },
          _ = () => {
            const e = (0, r.y0)(),
              t = s().get(e, ["tab", "windowId"]);
            return s().get(e, ["sidePanel", t, "visible"], !1) ? s().get(e, ["panelId"]) : s().get(e, ["instId"]);
          };
      },
      4445: (e, t, n) => {
        n.d(t, { Z: () => i });
        var r = n(31528),
          o = n.n(r);
        class i {
          constructor(e) {
            ((this.recognition = new window.webkitSpeechRecognition()), (this.recognition.continuous = o().get(e, ["continuous"], !1)), (this.recognition.interimResults = o().get(e, ["interimResults"], !0)), (this._final = ""), (this._interim = ""));
          }
          setLang(e) {
            return ((this.recognition.lang = e), this);
          }
          start() {
            return ((this._final = ""), this.recognition.start(), this);
          }
          stop() {
            return (this.recognition.stop(), this);
          }
          abort() {
            return ((this._final = ""), (this._interim = ""), this.recognition.abort(), this);
          }
          onStart(e) {
            return ((this.recognition.onstart = e), this);
          }
          onResult(e) {
            return (
              (this.recognition.onresult = (t) => {
                this._interim = "";
                for (let e = t.resultIndex; e < t.results.length; ++e) t.results[e].isFinal ? (this._final += t.results[e][0].transcript) : (this._interim += t.results[e][0].transcript);
                e({ final: this._final, interim: this._interim }, t);
              }),
              this
            );
          }
          onError(e) {
            return ((this.recognition.onerror = e), this);
          }
          onEnd(e) {
            return ((this.recognition.onend = e), this);
          }
        }
      },
      33893: (e, t, n) => {
        n.d(t, { Xv: () => d, fy: () => c, hI: () => u, wp: () => l });
        n(31528);
        var r = n(88047),
          o = n.n(r);
        n(50601);
        function i(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            (t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r));
          }
          return n;
        }
        function s(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? i(Object(n), !0).forEach(function (t) {
                  a(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : i(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
          }
          return e;
        }
        function a(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        const c = (e, t = "\\s\\n") => {
            const n = new RegExp(`^[${t}]+|[${t}]+$`);
            return e ? String(e).replace(n, "") : e;
          },
          l = (e) => (e ? String(`${e}`).replace(/\\$/, "") : e),
          d = (e) => (e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : e),
          u = (e, t) => (e ? o()(e, s({ defaultProtocol: "https", target: "_blank", nl2br: !0 }, t)) : e);
      },
      65351: (e, t, n) => {
        n.d(t, { At: () => s, RB: () => a, ti: () => i });
        var r = n(46545),
          o = n(49412);
        const i = (e, t) => {
            const n = e.ctrlKey || e.metaKey;
            if ((!0 === n && !1 === e.shiftKey) || 1 === e.button) {
              const e = { newWindow: !1, newTab: !0, active: !1, url: t };
              r.Z.sendBackgroundMessage("tabs-open-one", e);
            } else if (!1 === n && !0 === e.shiftKey) {
              const e = { newWindow: !0, newTab: !0, active: !0, url: t };
              r.Z.sendBackgroundMessage("tabs-open-one", e);
            } else if (!0 === n && !0 === e.shiftKey) {
              const e = { newWindow: !1, newTab: !0, active: !0, url: t };
              r.Z.sendBackgroundMessage("tabs-open-one", e);
            } else {
              const e = { newWindow: !1, newTab: !1, active: !0, url: t };
              r.Z.sendBackgroundMessage("tabs-open-one", e);
            }
          },
          s = (e, t) => {
            const n = e.ctrlKey || e.metaKey;
            if (!0 === n && !1 === e.shiftKey) {
              const e = { incognito: !1, newWindow: !1, group: !1, active: !1, urls: t };
              r.Z.sendBackgroundMessage("tabs-open-many", e);
            } else if (!1 === n && !0 === e.shiftKey) {
              const e = { incognito: !1, newWindow: !0, group: !1, active: !0, urls: t };
              r.Z.sendBackgroundMessage("tabs-open-many", e);
            } else {
              const e = { incognito: !1, newWindow: !1, group: !1, active: !0, urls: t };
              r.Z.sendBackgroundMessage("tabs-open-many", e);
            }
          },
          a = (e, t, n) => {
            o.Z.openNewTab(e, t, n);
          };
      },
      91475: (e, t, n) => {
        n.d(t, { E4: () => c, bb: () => a, jA: () => i, qx: () => s });
        var r = n(31528),
          o = n.n(r);
        const i = "dark",
          s = "light",
          a = (e = {}) => {
            const t = o().get(e, ["theme"], null);
            if (t && [i, s].includes(t)) return t;
            const { matches: n } = window.matchMedia(`(prefers-color-scheme: ${i})`);
            return n ? i : s;
          },
          c = (e) => {
            window.matchMedia(`(prefers-color-scheme: ${i})`).addEventListener("change", ({ matches: t }) => e(t ? i : s));
          };
      },
      60565: (e, t, n) => {
        n.d(t, { EP: () => d, LK: () => c, YM: () => o, _v: () => i, an: () => l, m9: () => a });
        var r = n(45806);
        const o = (e, t, n) => !e || s(n) - e >= t,
          i = (e, t, n, r) => {
            if (!e) return !1;
            const o = s(r) - e;
            return o >= t && o <= n;
          },
          s = (e) => (e || (e = Date.now()), e instanceof Date && (e = e.getTime()), e),
          a = (e) => 1e3 * e,
          c = (e) => 6e4 * e,
          l = (e) => 864e5 * e,
          d = (e, t, n = "s|m|h|d") => {
            const r = u(e, t),
              o = n.split("|"),
              i = o[o.length - 1];
            return o.includes("s") && ((Math.abs(r) < 60 && Math.abs(r) >= 0) || "s" === i) ? { diff: r, type: "s" } : o.includes("m") && (Math.abs(r / 60) < 60 || "m" === i) ? { diff: p(e, t), type: "m" } : (o.includes("h") || "h" === i) && Math.abs(r / 60 / 60) < 24 ? { diff: g(e, t), type: "h" } : { diff: m(e, t), type: "d" };
          },
          u = (e, t) => new r.Z(e).diff(t, "seconds"),
          p = (e, t) => new r.Z(e).diff(t, "minutes"),
          g = (e, t) => new r.Z(e).diff(t, "hours"),
          m = (e, t) => new r.Z(e).startOf("day").diff(new r.Z(t).startOf("day"), "days");
      },
      55971: (e, t, n) => {
        n.d(t, { B0: () => a, QY: () => i, XP: () => o, en: () => c });
        var r = n(17563);
        const o = (e, t = "https") => (e ? (s(e) ? e : `${t}://${e.replace(/^(:?\/?\/)/, "")}`) : e),
          i = (e) => {
            if (!e) return null;
            try {
              return new URL(o(e)).hostname;
            } catch (e) {
              return null;
            }
          },
          s = (e) =>
            ((e, t) => {
              if (!e) return !1;
              const n = new RegExp(`^(${t})://`);
              return 0 === String(e).search(n);
            })(e, ["http", "https", "chrome", "(filesystem:)?chrome-extension"].join("|")),
          a = (e, t) => {
            const n = r.stringifyUrl({ url: e, query: t });
            return chrome.runtime.getURL(n);
          },
          c = (e) => {
            try {
              return new URL(e);
            } catch (e) {
              return null;
            }
          };
      },
      92466: (e, t, n) => {
        n.d(t, { PJ: () => s, sG: () => a });
        var r = n(52914),
          o = n(91475),
          i = n(43977);
        const s = (e, t) => {
            switch (e) {
              case o.jA:
                return (0, i.PM)(`${e}-color-${t}`, l, t);
              case o.qx:
                return (0, i.PM)(`${e}-color-${t}`, c, t);
              default:
                return t;
            }
          },
          a = (e, t) => {
            switch (e) {
              case o.jA:
                return "#151B1E";
              case o.qx:
                return "#FFFFFF";
              default:
                return t;
            }
          },
          c = (e) => {
            const t = new r.Z(e),
              n = "#FFFFFF";
            return t.contrast(n) >= 5 ? e : t.correctContrast(5, n);
          },
          l = (e) => {
            const t = new r.Z(e),
              n = "#151B1E";
            return t.contrast(n) >= 7 ? e : t.correctContrast(7, n);
          };
      },
      57793: (e, t, n) => {
        n.d(t, { ju: () => i });
        n(31528);
        var r = n(45806),
          o = (n(3219), n(78387));
        n(86249);
        const i = (e, t) => ((t = new r.Z(t)), (e = [...e].filter((e) => (e.start.dateTime && e.end.dateTime ? (t.isSame(e.start.dateTime, "day") || t.isSame(e.end.dateTime, "day")) && t.isBefore(e.end.dateTime, "seconds") : t.isSame(e.date, "day")))), (0, o.fp)(e));
      },
      32251: (e, t, n) => {
        n.d(t, { iW: () => w, re: () => s, t4: () => b, vT: () => f });
        n(55971);
        var r = n(31528),
          o = n.n(r);
        const i = "meeting",
          s = "google",
          a = "zoom",
          c = "webex",
          l = "teams",
          d = "jitsi",
          u = "goto",
          p = "jeans",
          g = "around",
          m = "skype",
          _ = "facetime",
          h = "luma",
          b = { [i]: { name: "Meeting", icon: "video-camera" }, [s]: { name: "Google Meet", icon: "google-meet" }, [a]: { name: "Zoom", icon: "zoom" }, [c]: { name: "Webex", icon: "webex" }, [l]: { name: "MS Teams", icon: "teams" }, [d]: { name: "Jitsi Meet", icon: "jitsi" }, [u]: { name: "GoToMeeting", icon: "goto-meeting" }, [p]: { name: "BlueJeans", icon: "blue-jeans" }, "8x8": { name: "8x8", icon: "icon-8x8" }, [g]: { name: "Around", icon: "around" }, [_]: { name: "FaceTime", icon: "facetime" }, aws: { name: "Amazon Chime", icon: "chime" }, [m]: { name: "Skype", icon: "skype" }, [h]: { name: "Luma", icon: "luma" } },
          f = (e, t) => o().get(e, [t, "name"], null),
          w = (e, t) => o().get(e, [t, "icon"], null);
      },
      86249: (e, t, n) => {
        n.d(t, { M7: () => a, RT: () => o, Vd: () => i, de: () => s, wd: () => r });
        n(31528);
        const r = "everyone-declined",
          o = "self-waiting",
          i = "self-accepted",
          s = "self-tentative",
          a = "self-declined";
      },
      36453: (e, t, n) => {
        n.d(t, { F: () => o, K: () => r });
        const r = "focusTime",
          o = "outOfOffice";
      },
      78387: (e, t, n) => {
        n.d(t, { AD: () => a, CP: () => l, E6: () => s, fp: () => d, l_: () => i, pV: () => c });
        var r = n(31528),
          o = n.n(r);
        n(57793);
        const i = "birthday",
          s = "holiday",
          a = (e) => o().get(e, ["process"], !1),
          c = (e) => o().get(e, ["data"], {}),
          l = (e, t, n, r) => {
            const i = c(e);
            return o().get(i, [t, n], r);
          },
          d = (e) => e.sort((e, t) => (e.priority !== t.priority ? (e.priority < t.priority ? -1 : 1) : 0));
      },
      57174: (e, t, n) => {
        n.d(t, { $: () => s, _: () => i });
        var r = n(31528),
          o = n.n(r);
        const i = (e, t) => {
            const n = o().get(t, ["accounts"], []),
              r = o().get(t, ["activeIds", e], null);
            if (r) {
              const e = n.find((e) => e.id === r);
              if (e) return e;
            }
            return n.find((e) => e.isActive) || null;
          },
          s = (e, t) => {
            const n = i(e, t);
            return n ? n.id : null;
          };
      },
      67007: (e, t, n) => {
        n.d(t, { Z: () => a });
        var r = n(31528),
          o = n.n(r),
          i = n(2527);
        function s(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        class a {
          constructor(e, t = null, n = null) {
            ((this.name = e), (this.time = (0, i.Fv)(t)), (this.extra = {}), (this.timingFunction = n));
          }
          fromData(e) {
            return ((this.time = o().get(e, ["time"], null)), (this.name = o().get(e, ["name"], null)), (this.extra = o().get(e, ["extra"], {})), (this.timingFunction = o().get(e, ["timingFunction"], {})), this);
          }
          addExtraParam(e, t) {
            return ((this.extra[e] = t), this);
          }
          hasAnimation() {
            return this.time && this.time > 0;
          }
        }
        (s(a, "ANIM_LOAD", "load"), s(a, "ANIM_SHOW", "show"), s(a, "ANIM_HIDE", "hide"), s(a, "ANIM_REPLAY", "replay"), s(a, "ANIM_CHANGE", "change"), s(a, "ANIM_SLIDE", "slide"), s(a, "ANIM_SWITCH", "switch"));
      },
      67457: (e, t, n) => {
        n.d(t, { E6: () => g, II: () => _, Ry: () => c, Te: () => l, XH: () => a, cV: () => o, cp: () => i, dx: () => d, hO: () => m, jG: () => s, pr: () => p, sl: () => u });
        var r = n(8318);
        const o = [
            { icon: r.Vz(r.X2), iconAdd: r.Vz(r.X2, "iconAdd"), mimeType: r.X2, i18n: "drive_add_doc", type: "document" },
            { icon: r.Vz(r.R4), iconAdd: r.Vz(r.R4, "iconAdd"), mimeType: r.R4, i18n: "drive_add_sheet", type: "spreadsheets" },
            { icon: r.Vz(r.SH), iconAdd: r.Vz(r.SH, "iconAdd"), mimeType: r.SH, i18n: "drive_add_slide", type: "presentation" },
            { icon: r.Vz(r.t_), iconAdd: r.Vz(r.t_, "iconAdd"), mimeType: r.t_, i18n: "drive_add_form", type: "forms" },
          ],
          i = 1,
          s = 2,
          a = 3,
          c = 4,
          l = 5,
          d = 6,
          u = "asc",
          p = "desc",
          g = "name",
          m = "modifiedTime",
          _ = [
            { id: i, i18n: "drive_section_suggested", icon: null, url: "https://drive.google.com" },
            { id: s, i18n: "drive_section_my_drive", icon: "my-drive", url: "https://drive.google.com/drive/my-drive" },
            { id: a, i18n: "drive_section_shared_drives", icon: "shared-drive", url: "https://drive.google.com/drive/shared-drives" },
            { id: c, i18n: "drive_section_shared_with_me", icon: "shared-with-me", url: "https://drive.google.com/drive/shared-with-me" },
            { id: l, i18n: "drive_section_recent", icon: "history", url: "https://drive.google.com/drive/recent" },
            { id: d, i18n: "drive_section_starred", icon: null, url: "https://drive.google.com/drive/starred" },
          ];
      },
      84868: (e, t, n) => {
        n.d(t, { Bb: () => i, KE: () => r, M: () => s, cH: () => o, j1: () => a });
        const r = 25,
          o = 900001,
          i = 900002,
          s = 900003,
          a = { [o]: { order: 3, iconOff: "youtube-off", iconOn: "youtube", iconText: "Youtube", siteName: "Youtube" }, [i]: { order: 2, iconOff: "facebook-off", iconOn: "facebook", iconText: "Facebook", siteName: "Facebook" }, [s]: { order: 1, iconOff: "twitter-off", iconOn: "twitter", iconText: "Twitter", siteName: "Twitter" } };
      },
      73547: (e, t, n) => {
        n.d(t, { V: () => l });
        var r = n(80377),
          o = n(47132),
          i = n(7282),
          s = n(31528),
          a = n.n(s);
        const c = (e, t, n, o) => {
            const s = a().get(e, ["soundVolume"], r.VN),
              c = a().get(e, ["ruleIds"], []);
            return { action: t, volume: s, trigger: n, context: o, access: (0, i.FH)(c).map((e) => e.siteName) };
          },
          l = (e, t, n) => {
            (0, o.n4)("focus_action", c(e, t, "left-click", n));
          };
      },
      7282: (e, t, n) => {
        n.d(t, { FH: () => l, S4: () => u, Sd: () => d, cN: () => p, uD: () => c });
        var r = n(80377),
          o = n(84868),
          i = n(45806),
          s = n(31528),
          a = n.n(s);
        const c = (e) =>
            Object.keys(o.j1)
              .map((t) => ({ ruleId: (t = Number(t)), text: a().get(o.j1, [t, "iconText"], null), siteName: a().get(o.j1, [t, "siteName"], null), icon: e.includes(t) ? a().get(o.j1, [t, "iconOff"], null) : a().get(o.j1, [t, "iconOn"], null) }))
              .sort((e, t) => {
                const n = a().get(o.j1, [e.ruleId, "order"], null),
                  r = a().get(o.j1, [t.ruleId, "order"], null);
                return n === r ? 0 : n < r ? -1 : 1;
              }),
          l = (e) => c(e).filter(({ ruleId: t }) => e.includes(t)),
          d = (e) => {
            const t = a().get(e, ["timestamp"], !1);
            if (!t) return 0;
            const n = new i.Z().diff(t, "minutes");
            return n < 1 ? 1 : n;
          },
          u = (e) => o.KE + 1 - d(e),
          p = (e) => (e === r.sb ? "volume-half" : e <= 0 ? "volume-off" : "volume");
      },
      74653: (e, t, n) => {
        n.d(t, { GZ: () => u, HC: () => s, Jv: () => y, M1: () => f, bz: () => p, gI: () => h, gz: () => l, it: () => a, l4: () => v, o$: () => w, oW: () => _, oZ: () => o, sx: () => b, t1: () => i, x2: () => m, x8: () => d, y5: () => c, z5: () => g });
        var r = n(39773);
        const o = "widget-focus",
          i = "notes-create",
          s = "todoist.com",
          a = "chatgpt.com",
          c = "web.telegram.org",
          l = "web.whatsapp.com",
          d = "youtube.com",
          u = "music.youtube.com",
          p = "messages.google.com",
          g = "translate.google.com",
          m = "tasks.google.com",
          _ = "keep.google.com",
          h = "gemini.google.com",
          b = "fourfunction",
          f = "scientific",
          w = "graphic",
          y = "matrix",
          v = {
            "ticktick.com": { regExp: /^https:\/\/ticktick.com/, src: "https://ticktick.com/webapp/", action: r.hd },
            [g]: { regExp: /^https:\/\/translate\.google\.com/, src: "https://translate.google.com?hl=en-US", action: r.$f },
            [m]: { regExp: /^https:\/\/tasks\.google\.com/, src: "https://tasks.google.com/embed/?origin=https%3A%2F%2Fmail.google.com", goTo: "https://calendar.google.com/calendar/r/tasks", action: r.v6 },
            [_]: { regExp: /^https:\/\/keep\.google\.com/, src: "https://keep.google.com", action: r.St },
            [h]: { regExp: /^https:\/\/gemini\.google\.com/, src: "https://gemini.google.com/app", action: r.Jl },
            [a]: { regExp: /^https:\/\/chatgpt\.com/, src: "https://chatgpt.com", action: r.II },
            [s]: { regExp: /^https:\/\/(app\.)?todoist\.com/, src: "https://app.todoist.com/app", action: r.L1 },
            [b]: { regExp: /desmos\.com\/fourfunction/, src: "https://www.desmos.com/fourfunction", action: r.uH },
            [f]: { regExp: /desmos\.com\/matrix/, src: "https://www.desmos.com/matrix", action: r.uH },
            [y]: { regExp: /desmos\.com\/scientific/, src: "https://www.desmos.com/scientific", action: r.uH },
            [w]: { regExp: /desmos\.com\/calculator/, src: "https://www.desmos.com/calculator", action: r.uH },
            [c]: { regExp: /web\.telegram\.org/, src: "https://web.telegram.org/k", action: r.OV },
            [l]: { regExp: /web\.whatsapp\.com/, src: "https://web.whatsapp.com/", action: r.L2 },
            [u]: { regExp: /music\.youtube\.com/, src: "https://music.youtube.com/signin?next=https%3A%2F%2Fmusic.youtube.com%2F", action: r.yE },
            [d]: { regExp: /(www\.)?youtube\.com/, src: "https://www.youtube.com/signin?next=%2F", action: r.Ny },
            [p]: { regExp: /messages\.google\.com/, src: "https://messages.google.com/web", action: r.r2 },
            "copilot.microsoft.com": { regExp: /copilot\.microsoft\.com/, src: "https://copilot.microsoft.com", action: r.rI },
            "deepl.com": { regExp: /(www\.)?\.deepl\.com/, src: "https://www.deepl.com/translator", action: r.rI },
          };
      },
      72874: (e, t, n) => {
        n.d(t, { GZ: () => o.GZ, Gk: () => i.Gk, HC: () => o.HC, Jv: () => o.Jv, M1: () => o.M1, bg: () => a, bz: () => o.bz, gI: () => o.gI, gz: () => o.gz, it: () => o.it, o$: () => o.o$, oW: () => o.oW, oZ: () => o.oZ, os: () => i.os, sx: () => o.sx, t1: () => o.t1, ui: () => s, x2: () => o.x2, x8: () => o.x8, y5: () => o.y5, z5: () => o.z5 });
        var r = n(46545),
          o = n(74653),
          i = n(60416);
        const s = (e) => {
            r.Z.sendBackgroundMessage("frame-refresh", { widgetName: e });
          },
          a = (e, t, n = {}) => {
            r.Z.sendBackgroundMessage("frame-trigger-content", { widgetName: e, triggerName: t, extra: n });
          };
      },
      60416: (e, t, n) => {
        n.d(t, { Gk: () => l, cY: () => d, os: () => u });
        var r = n(57174),
          o = n(74653),
          i = n(17563),
          s = n(31528),
          a = n.n(s);
        const c = (e, t, n) => {
            switch (t) {
              case o.z5:
              case o.oW:
              case o.x2:
              case o.gI: {
                const o = (0, r._)(t, n),
                  s = a().get(o, ["email"]);
                return i.stringifyUrl({ url: e, query: { authuser: s } });
              }
              case o.x8:
              case o.GZ: {
                const o = (0, r._)(t, n),
                  s = a().get(o, ["index"]);
                return i.stringifyUrl({ url: e, query: { authuser: s } });
              }
              default:
                return e;
            }
          },
          l = (e, t) => {
            const n = a().get(o.l4, [e, "src"], null);
            return c(n, e, t);
          },
          d = (e) => {
            for (let t in o.l4) if (o.l4[t].action === e) return t;
            return null;
          },
          u = (e, t) => {
            const n = a().get(o.l4, [e, "goTo"], null);
            return n ? c(n, e, t) : l(e);
          };
      },
      81344: (e, t, n) => {
        n.d(t, { Rh: () => l, cA: () => c, lD: () => p, qf: () => i, sk: () => r, sl: () => g, t8: () => s, tc: () => u, uZ: () => d, ve: () => a, y6: () => o });
        const r = -1,
          o = 30,
          i = "star",
          s = "starred",
          a = "read",
          c = "read-all",
          l = "unread",
          d = "archive",
          u = "archive-all",
          p = "trash",
          g = "label-as";
      },
      24665: (e, t, n) => {
        n.d(t, { JT: () => s, oI: () => i });
        var r = n(91475);
        const o = (e) => (e ? e.replace(/(-{9,})/g, '<span style="font-family: sans-serif;">$1</span>') : e),
          i = (e) => o(e),
          s = (e, t, n) =>
            ((e, t, n) => {
              const o = chrome.runtime.getURL("/assets/fonts/Inter"),
                i = chrome.runtime.getURL("/assets/js/darkreader.min.js"),
                s = chrome.runtime.getURL("/assets/js/gmail-iframe.js");
              return `\n      <html>\n        <head>\n          <meta http-equiv="Content-Security-Policy" content="script-src 'self'">\n          <base target="_blank">\n\n         <style>\n            ::-webkit-scrollbar {\n              height: 12px;\n              background-color: transparent;\n            }\n\n            ::-webkit-scrollbar-track {\n              background-color: transparent;\n            }\n\n            ::-webkit-scrollbar-thumb {\n              border-radius: 10px;\n              background-color: ${n === r.jA ? "rgba(255, 255, 255, 0.25)" : "rgba(21, 27, 30, 0.25)"};\n              border: 4px solid transparent;\n              background-clip: content-box;\n            }\n\n            ::-webkit-scrollbar-thumb:hover {\n              background-color: ${n === r.jA ? "rgba(255, 255, 255, 0.75)" : "rgba(21, 27, 30, 0.75)"};\n              border: 4px solid transparent;\n              background-clip: content-box;\n            }\n\n            body {\n              font-family: Inter;\n              font-size: 14px;\n              font-style: normal;\n              font-weight: 400;\n              color: ${n === r.jA ? "#FFFFFF" : "#151B1E"};\n              margin: 16px;\n              padding: 0;\n              overflow-y: hidden !important;\n              white-space: ${"text/plain" === t ? "pre-line" : "initial"};\n              word-wrap: ${"text/plain" === t ? "break-word" : "initial"};\n            }\n\n            html > body {\n              /*\n              Этот стиль нужно для правильного определения высоты iframe.\n              Если окажится что эта часть стилей ломает верстку сообщения,\n              нужно искать новое решение GmailDetails.registerResizeObserver(...)\n              */\n              height: auto !important;\n            }\n\n            a {\n              text-decoration-line: underline;\n              color: ${n === r.jA ? "#1E88E5" : "#1976D2"};\n            }\n\n            a:hover,\n            a:hover:visited {\n              color: ${n === r.jA ? "#E53935" : "#D32F2F"};\n            }\n\n            a:visited {\n              color: ${n === r.jA ? "#9966CC" : "#8244C1"};\n            }\n\n            img {\n              max-width: 100%;\n              height: unset;\n              object-fit: contain;\n            }\n\n            @font-face {\n              font-family: 'Inter';\n              font-style: normal;\n              font-weight: 400;\n              font-display: block;\n              src: url(${o}/Inter-cyrillic.woff2) format('woff2');\n              unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n            }\n\n            @font-face {\n              font-family: 'Inter';\n              font-style: normal;\n              font-weight: 400;\n              font-display: block;\n              src: url(${o}/Inter-greek-ext.woff2) format('woff2');\n              unicode-range: U+1F00-1FFF;\n            }\n\n            @font-face {\n              font-family: 'Inter';\n              font-style: normal;\n              font-weight: 400;\n              font-display: block;\n              src: url(${o}/Inter-greek.woff2) format('woff2');\n              unicode-range: U+0370-03FF;\n            }\n\n            @font-face {\n              font-family: 'Inter';\n              font-style: normal;\n              font-weight: 400;\n              font-display: block;\n              src: url(${o}/Inter-vietnamese.woff2) format('woff2');\n              unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n            }\n\n            @font-face {\n              font-family: 'Inter';\n              font-style: normal;\n              font-weight: 400;\n              font-display: block;\n              src: url(${o}/Inter-latin-ext.woff2) format('woff2');\n              unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n            }\n\n            @font-face {\n              font-family: 'Inter';\n              font-style: normal;\n              font-weight: 400;\n              font-display: block;\n              src: url(${o}/Inter-latin.woff2) format('woff2');\n              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n            }\n          </style>\n\n          <script defer src="${i}"><\/script>\n          <script defer src="${s}"><\/script>\n\n        </head>\n        <body data-theme="${n}">${e}</body>\n      </html>\n    `;
            })(o(e), t, n);
      },
      81435: (e, t, n) => {
        n.d(t, { Ay: () => P, B3: () => D, Dw: () => _, GN: () => A, NY: () => m, OI: () => O, Ot: () => M, VJ: () => T, aA: () => k, c8: () => Z, dM: () => y, eb: () => b, f6: () => v, hR: () => w, jL: () => f, jc: () => j, lV: () => I, lu: () => h, vq: () => E, xb: () => S, yh: () => x });
        var r = n(81344),
          o = n(3219),
          i = n(88873),
          s = n(86101),
          a = n(45806),
          c = n(31528),
          l = n.n(c),
          d = n(33893);
        function u(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            (t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r));
          }
          return n;
        }
        function p(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? u(Object(n), !0).forEach(function (t) {
                  g(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : u(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
          }
          return e;
        }
        function g(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        const m = (e, t = []) => l().get(e, [0, ...t]),
          _ = (e) => {
            for (let t = 0; t < e.length; t++) if (f(e[t]) || t === e.length - 1) return l().get(e, [t, "snippet"], null);
            return null;
          },
          h = (e) => {
            for (let t of e.messages) if (b(t)) return !0;
            return !1;
          },
          b = (e) => l().get(e, ["labelIds"], []).includes("STARRED"),
          f = (e) => l().get(e, ["labelIds"], []).includes("UNREAD"),
          w = (e) => (0, s.N)(e).map((e) => e.split(/\s</).map((e) => ((e = e.replace(/[<>"]/g, "")), (0, d.fy)(e, "\\s\\n")))),
          y = (e, t) =>
            w(e).map((e) => {
              const n = 1 === e.length ? e[0] : e[1];
              return t ? t(n) : n;
            }),
          v = (e, t) => w(e).map((e) => (t ? t(e[0]) : e[0])),
          x = (e, t, n) =>
            l()
              .get(t, ["labelIds"], [])
              .filter((t) => "user" === l().get(e, [t, "type"]) && "hide" !== l().get(e, [t, "messageListVisibility"]))
              .map((t) => {
                const r = l().get(e, [t]);
                return n ? n(r) : r;
              }),
          O = (e, t = []) => {
            const n = [...e].sort((e, t) => {
              const n = e.name.toLowerCase(),
                r = t.name.toLowerCase();
              return n < r ? -1 : n > r ? 1 : 0;
            });
            if (0 === t.length) return n;
            const r = [],
              o = [];
            for (let e of n) t.includes(e.id) ? r.push(e) : o.push(e);
            return [...r, ...o];
          },
          k = (e) => ((e = e.filter((e) => e && Object.keys(e).length > 0)), (0, i.ru)(e, "accountId", (e) => (0, i.ru)(e.labels, "id"))),
          Z = (e) => {
            if (!e) return e;
            const t = e.split("/");
            return t.length > 1 ? `../${t[t.length - 1]}` : t[t.length - 1];
          },
          M = (e, t) => {
            e = p({}, e);
            for (let n = 0; n < e.messages.length; n++) {
              const r = l().get(e.messages, [n]);
              e.messages[n].labelIds = t(r);
            }
            return e;
          },
          P = (e, t, n) => {
            e = [...e];
            for (let r = 0; r < e.length; r++) e[r].accountId === t.accountId && e[r].id === t.id && (e[r] = M(e[r], n));
            return e;
          },
          j = (e, t) => (e.push(t), (0, i.Tw)(e)),
          E = (e, t) => {
            const n = e.indexOf(t);
            return (-1 !== n && e.splice(n, 1), (0, i.Tw)(e));
          },
          T = (e, t) => {
            e = [...e];
            for (let n = 0; n < e.length; n++) e[n].accountId === t.accountId && e[n].id === t.id && e.splice(n, 1);
            return e;
          },
          I = (e, t) => {
            if (t === r.sk) return { threads: [], modifyThreads: [...e] };
            const n = [],
              o = [];
            for (let r of e) r.accountId === t ? o.push(r) : n.push(r);
            return { threads: n, modifyThreads: o };
          },
          S = (e) =>
            e.sort((e, t) => {
              const n = e.timestamp,
                r = t.timestamp;
              return n === r ? 0 : n < r ? 1 : -1;
            }),
          D = (e, t, n) => ((0, o.zk)(e, n) ? new a.Z(e).format(t.formatHMA) : (0, o.OS)(e, t, n)),
          A = (e, t, n) => ((0, o.zk)(e, n) ? new a.Z(e).format(t.formatHMA) : (0, o.Vv)(e, t, n));
      },
      74601: (e, t, n) => {
        n.d(t, { _: () => r });
        const r = "window";
      },
      45090: (e, t, n) => {
        n.d(t, { m: () => c });
        var r = n(82184),
          o = n(58995),
          i = n(96073),
          s = n(17834);
        const a = [
          { name: "popular", icons: (0, o.z)().map((e) => ({ img: e.img, key: l(e.url) })) },
          { name: "favorite", icons: (0, r.q)().map((e) => ({ img: e.img, key: l(e.url) })) },
          { name: "google", icons: (0, i.f)().map((e) => ({ img: e.img, key: l(e.url) })) },
          { name: "chrome", icons: (0, s.T)().map((e) => ({ icon: e.icon, key: l(e.url) })) },
        ];
        function c(e) {
          if (!e) return null;
          const t = l(e);
          for (let { icons: e } of a)
            for (let n of e)
              if (n.key === t) {
                if (n.img) return { img: n.img };
                if (n.icon) return { icon: n.icon };
              }
          return null;
        }
        function l(e) {
          return e ? e.replace(/(https?|chrome):\/\/(www\.)?/, "").replace(/\/$/, "") : e;
        }
      },
      40629: (e, t, n) => {
        n.d(t, { EH: () => c });
        (n(44169), n(87293), n(46545));
        var r = n(31528),
          o = n.n(r),
          i = (n(60709), n(60565), n(94688)),
          s = (n(49412), n(17019));
        const a = (e, t) => e && i.Z.gt(e, t),
          c = (e) => {
            const t = o().get(e, ["version"]),
              n = o().get(e, ["timestamp"]);
            return !(!t || !n) && Date.now() > n && a(t, s.i8);
          };
      },
      7784: (e, t, n) => {
        n.d(t, { kT: () => B, pq: () => X, TK: () => q, yq: () => H, M_: () => G, fc: () => V, Qk: () => U, X8: () => J });
        var r = n(72045),
          o = n(31528),
          i = n.n(o),
          s = n(88873);
        function a(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            (t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r));
          }
          return n;
        }
        function c(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? a(Object(n), !0).forEach(function (t) {
                  l(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : a(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
          }
          return e;
        }
        function l(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        const d = "move",
          u = "clear",
          p = "trash",
          g = "create",
          m = "update",
          _ = "complete",
          h = (e, t) => e.find((e) => (e.children || []).find((e) => e.id === t.id)),
          b = (e, t, n) => {
            for (let r = 0; r < e.length; r++) {
              if (e[r].id === t.id) {
                e[r] = n(e[r], null);
                break;
              }
              const o = i().get(e, [r, "children"], []);
              if (o.length > 0) {
                if (M(o, t)) {
                  e[r].children = b(o, t, n);
                  break;
                }
              }
            }
            return e;
          },
          f = (e, t, n = !1, r = null, o = null, i = Date.now()) => {
            if (o) {
              let t = (0, s.o3)(e, "id", o);
              const n = e[t];
              e[t] = c(c({}, n), {}, { actions: w(n, d), extraParams: O(n, d, i) });
            }
            const a = M(e, t),
              l = c(c({}, a), {}, { actions: w(a, d), extraParams: O(a, d, i) });
            return ((e = Z(e, t)), x(e, l, n, r, o));
          },
          w = (e, t) => {
            const n = i().get(e, ["actions"], []);
            return (0, s.Tw)([...n, t]);
          },
          y = (e, t) => {
            const n = i().get(e, ["actions"], []),
              r = n.indexOf(t);
            return (r >= 0 && n.splice(r, 1), n);
          },
          v = (e, t) => i().get(e, ["actions"], []).includes(t),
          x = (e, t, n = !1, r = null, o = null) => {
            if ((((r || o) && 0 !== e.length) || (n ? e.unshift(t) : e.push(t)), !r && o)) {
              const n = (0, s.o3)(e, "id", o);
              e = (0, s.MT)(e, n, t);
            }
            if (r) {
              const a = (0, s.o3)(e, "id", r),
                c = i().get(e, [a], {});
              let l = i().get(c, ["children"], []);
              if (o && 0 !== l.length) {
                const e = (0, s.o3)(l, "id", o);
                l = (0, s.MT)(l, e, t);
              } else n ? l.unshift(t) : l.push(t);
              e[a].children = l;
            }
            return e;
          },
          O = (e, t, n = Date.now()) => c(c({}, i().get(e, ["extraParams"], {})), {}, { [`${t}Time`]: n }),
          k = (e, t) => {
            const n = i().get(e, ["extraParams"], {}),
              r = `${t}Time`;
            return (r in n && delete n[r], n);
          },
          Z = (e, t) => {
            const n = [];
            for (let r = 0; r < e.length; r++) {
              if (e[r].id === t.id) continue;
              let o = i().get(e, [r, "children"], []);
              (o.length > 0 && (e[r].children = Z(o, t)), n.push(c({}, e[r])));
            }
            return n;
          },
          M = (e, t) => {
            for (let n = 0; n < e.length; n++) {
              if (e[n].id === t.id) return e[n];
              let r = i().get(e, [n, "children"], []);
              if (r.length > 0) {
                const e = M(r, t);
                if (e) return e;
              }
            }
            return null;
          },
          P = (e, t = null) => {
            const n = Array.from(e);
            for (let r = 0; r < n.length; r++) {
              const o = i().get(n, [r, "extraParams"], {});
              n[r].extraParams = c(c({}, o), {}, { parentId: t, previousId: i().get(e, [r - 1, "id"], null), nextId: i().get(e, [r + 1, "id"], null) });
              const s = i().get(e, [r, "children"], []);
              if (s.length > 0) {
                const t = i().get(e, [r, "id"], null);
                n[r].children = P(s, t);
              }
            }
            return n;
          };
        var j,
          E,
          T,
          I = n(84261),
          S = n(46545);
        function D(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        class A {
          constructor(e) {
            this.name = e;
          }
          create(e, t) {
            return (this._sendMessage(A.ACTION_CREATE, e, t), this);
          }
          update(e, t) {
            return (this._sendMessage(A.ACTION_UPDATE, e, t), this);
          }
          trash(e, t) {
            return (this._sendMessage(A.ACTION_TRASH, e, t), this);
          }
          restore(e, t) {
            return (this._sendMessage(A.ACTION_RESTORE, e, t), this);
          }
          move(e, t) {
            return (this._sendMessage(A.ACTION_MOVE, e, t), this);
          }
          destroy(e, t, n) {
            return (this._sendMessage(A.ACTION_DESTROY, e, t, { index: n }), this);
          }
          _sendMessage(e, t, n, r = {}) {
            S.Z.sendBackgroundMessage(`${A.PREFIX}-${this.name}`, { action: e, index: (0, s.o3)(t, "id", n.id), item: this.format((0, s.J1)(t, "id", n.id), { action: e, items: t, data: r }) });
          }
          format(e, t) {
            return e;
          }
        }
        (D(A, "PREFIX", "sync"), D(A, "ACTION_RESTORE", "restore"), D(A, "ACTION_DESTROY", "destroy"), D(A, "ACTION_CREATE", "create"), D(A, "ACTION_UPDATE", "update"), D(A, "ACTION_TRASH", "trash"), D(A, "ACTION_MOVE", "move"));
        class C extends A {
          constructor() {
            super(C.NAME);
          }
        }
        function L(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            (t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r));
          }
          return n;
        }
        function z(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? L(Object(n), !0).forEach(function (t) {
                  F(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : L(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
          }
          return e;
        }
        function F(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        ((T = "notes"), (E = "NAME") in (j = C) ? Object.defineProperty(j, E, { value: T, enumerable: !0, configurable: !0, writable: !0 }) : (j[E] = T));
        function Y(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            (t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r));
          }
          return n;
        }
        function R(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        const N = ["notes_placeholder_1", "notes_placeholder_2", "notes_placeholder_3", "notes_placeholder_4", "notes_placeholder_5", "notes_placeholder_6", "notes_placeholder_7", "notes_placeholder_8", "notes_placeholder_9", "notes_placeholder_10", "notes_placeholder_11"],
          W = new C(),
          H = (e = {}) =>
            ((e, t = {}) => ({ id: i().get(e, ["id"], null), link: i().get(e, ["link"], null), text: i().get(e, ["text"], null), colorId: i().get(e, ["colorId"], null), placeholderId: i().get(e, ["placeholderId"], null), extraParams: z(z({}, i().get(e, ["extraParams"], {})), t) }))(
              (function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n = null != arguments[t] ? arguments[t] : {};
                  t % 2
                    ? Y(Object(n), !0).forEach(function (t) {
                        R(e, t, n[t]);
                      })
                    : Object.getOwnPropertyDescriptors
                      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                      : Y(Object(n)).forEach(function (t) {
                          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                        });
                }
                return e;
              })({ id: (0, r.Z)(), placeholderId: (0, I.M9)(N) }, e),
            ),
          B = (e, t) => {
            const n = i().get(e, [0], null);
            return (
              (e = ((e, t, n = !1, r = null, o = null, i = Date.now()) => {
                const s = c(c({}, t), {}, { actions: [g], extraParams: O({}, g, i) });
                return x(e, s, n, r, o);
              })(e, t, !0)),
              W.create(e, t),
              n ? q(e, n, t.id) : e
            );
          },
          U = (e, t) => ((e = ((e, t, n = Date.now()) => b(e, t, (e) => c(c(c({}, e), t), {}, { actions: w(e, m), extraParams: O(e, m, n) })))(e, t)), W.update(e, t), e),
          V = (e, t) => ((e = ((e, t, n = Date.now()) => b(e, t, (e) => c(c({}, e), {}, { actions: w(e, p), extraParams: O(e, p, n) })))(e, t)), W.trash(e, t), e),
          G = (e, t) => (
            (e = ((e, t, n) => {
              e = b(e, t, (e) => c(c({}, e), {}, { actions: y(e, n), extraParams: k(e, n) }));
              const r = h(e, t);
              return (r && (v(r, p) || v(r, _) || v(r, u)) && (e = f(e, t, !0)), e);
            })(e, t, p)),
            W.restore(e, t),
            e
          ),
          q = (e, t, n = null) => {
            const r = (0, s.o3)(e, "id", t.id),
              o = i().get(e, [r - 1], null),
              a = i().get(e, [r + 1], null);
            e = P(f(e, t, !0, null, n));
            r === (0, s.o3)(e, "id", t.id) ? W.update(e, t) : W.move(e, t);
            const c = (0, s.o3)(e, "id", t.id),
              l = [],
              d = [o, a, i().get(e, [c - 1], null), i().get(e, [c + 1], null)];
            for (let t of d) {
              if (!t || l.includes(t.id)) continue;
              const n = (0, s.o3)(e, "id", t.id);
              if (null !== n) {
                const r = i().get(e, [n - 1, "id"], null);
                e = P(f(e, t, !0, null, r));
                n === (0, s.o3)(e, "id", t.id) ? W.update(e, t) : W.move(e, t);
              }
              l.push(t.id);
            }
            return e;
          },
          J = (e) => e.filter((e) => !v(e, p)),
          X = (e, t) => {
            for (let n of e) if (n.id === t) return n;
            return null;
          };
      },
      65725: (e, t, n) => {
        n.d(t, { V: () => r, f: () => o });
        const r = (e) => {
            let t = Array.from(document.querySelectorAll('#bres [href^="/search"]:not(block-component a)'));
            return (0 === t.length && (t = Array.from(document.querySelectorAll('[data-abe] [href^="/search"]'))), (t = t.map((e) => ({ text: e.innerText || null, href: e.getAttribute("href") || null })).filter((e) => e.text && e.href)), void 0 !== e ? t.splice(0, e) : t);
          },
          o = (e) => {
            const t =
              document.querySelector("#rhs") ||
              (function () {
                const e = document.querySelector("#rcnt");
                if (e) {
                  const t = document.createElement("div");
                  return ((t.style.display = "flex"), (t.style.flexDirection = "column"), (t.id = "rhs"), e.appendChild(t), t);
                }
                return null;
              })();
            t && (t.childNodes.length > 0 ? t.insertBefore(e, t.childNodes[0]) : t.appendChild(e));
          };
      },
      13732: (e, t, n) => {
        n.d(t, { B: () => s, w: () => a });
        var r = n(24770),
          o = n(31528),
          i = n.n(o);
        const s = (e) => i().get(e, ["searchAI", "enabled"], !1),
          a = (e, t) => s(t) && (0, r.Lh)(e);
      },
      94103: (e, t, n) => {
        n.d(t, { _: () => o });
        n(55971);
        const r = /https:\/\/(www\.)?google\.[a-z]{2,3}\/search/,
          o = (e) => e && r.test(e);
      },
      54571: (e, t, n) => {
        n.d(t, { XZ: () => o });
        (n(17563), n(31528));
        var r = n(72045);
        const o = (e) => ({ id: (0, r.Z)(), relevance: 1 / 0, type: "search", text: e, html: e, default: !0, search: e });
      },
      51590: (e, t, n) => {
        n.d(t, { V$: () => i, _H: () => r, ir: () => s, jP: () => o });
        const r = "auto",
          o = "click",
          i = "detach",
          s = "shortcut";
      },
      16704: (e, t, n) => {
        n.d(t, { Nw: () => i, jP: () => r.jP });
        n(24517);
        var r = n(51590),
          o = (n(87293), n(46545));
        const i = (e, t, n) => {
          o.Z.sendBackgroundMessage("open-widget-on-content", { method: e, action: t }, n);
        };
      },
      72946: (e, t, n) => {
        n.d(t, { Q: () => a, R: () => c });
        var r = n(91475),
          o = n(31528),
          i = n.n(o);
        const s = { [r.qx]: { grey: "#5F6368", blue: "#2474E9", red: "#D72F23", yellow: "#F7AB00", green: "#208037", pink: "#CE1784", purple: "#A043F5", cyan: "#117B83", orange: "#F8903C" }, [r.jA]: { grey: "#DADCE0", blue: "#8CB4F9", red: "#F08B82", yellow: "#FCD661", green: "#84C995", pink: "#FD8BCB", purple: "#C48AFA", cyan: "#7DD9ED", orange: "#FAAD6F" } },
          a = (e, t) => i().get(s, [e, t]),
          c = (e) => {
            const t = i().get(s, [e], {});
            return Object.entries(t);
          };
      },
      19868: (e, t, n) => {
        n.d(t, { KT: () => o, Yx: () => r, hg: () => i });
        const r = (e, t, n) => {
            e = [...e];
            for (let o = 0; o < e.length; o++) {
              let i = e[o];
              "children" in i ? (e[o] = r(i.children, t, n)) : i.windowId === t && (e[o].active = i.id === n);
            }
            return e;
          },
          o = (e, t) => (t ? ((t = t.toLowerCase()), e.filter((e) => !(!e.title || !e.title.toLowerCase().includes(t)) || (e.url && e.url.toLowerCase().includes(t)))) : [...e]),
          i = (e) => !1 === e.discarded && "loading" === e.status;
      },
      20975: (e, t, n) => {
        n.d(t, { R: () => r });
        const r = [
          { id: 1, name: "San Francisco", refresh: !1, process: !1, timezone: "America/Los_Angeles", params: {} },
          { id: 2, refresh: !1, process: !1, timezone: "America/New_York", name: "New York", params: {} },
          { id: 3, refresh: !1, process: !1, timezone: "Europe/London", name: "London", params: {} },
          { id: 4, refresh: !1, process: !1, timezone: "Japan", name: "Tokyo", params: {} },
        ];
      },
      57610: (e, t, n) => {
        n.d(t, { g: () => i });
        var r = n(20975),
          o = n(88873);
        const i = (e) => [...r.R].map((t) => (0, o.J1)(e, "id", t.id) || t);
      },
      43757: (e, t, n) => {
        n.d(t, { Ac: () => O, LD: () => T, LN: () => P, MS: () => S, RH: () => C, RT: () => M, Z7: () => A, bh: () => k, sO: () => E, sy: () => j, y0: () => Z, zQ: () => I });
        var r = n(44169),
          o = n(87293),
          i = n(50497),
          s = n(979),
          a = n(53261),
          c = n(85657),
          l = n(57610),
          d = n(46545),
          u = n(91475),
          p = n(35488),
          g = n(92672),
          m = n(3219),
          _ = n(31528),
          h = n.n(_),
          b = n(35281),
          f = n(55971),
          w = n(49412);
        function y(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            (t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r));
          }
          return n;
        }
        function v(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? y(Object(n), !0).forEach(function (t) {
                  x(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : y(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
          }
          return e;
        }
        function x(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        window.__mnStore = null;
        const O = async (e = {}) => {
            const t = await (0, o.aU)(["api", "firestore", "sms", "tasks", "notes", "panel", "search", "site", "badges", "sidebar", "sidePanel", "widgets", "messages", "identity", "calendar", "commands", "commandActivation", "launchpad", "extension", "translator", "debugConfig", "contextCover", "contextSettings", "settings", "history", "frames", "chrome", "prices", "driveSettings", "onboarding", "plus", "gmail", "updates", "times", "focusTime", "trial"]),
              n = await w.Z.getCurrent(),
              r = t.settings || {},
              _ = await g.Z.getCurrentWindow(),
              b = h().get(n, ["id"], null),
              y = h().get(n, ["url"], null),
              x = y ? (0, f.en)(y) : null,
              O = await d.Z.getPanelId(_.id),
              k = e.entry,
              Z = window.location.href;
            return v(v({}, t), {}, { panelId: O, times: (0, l.g)(t.times || []), instId: k === a.wB ? O : `${b}`, tab: { id: b, url: y, windowId: _.id, host: x ? x.host : null }, currentTabInfo: (0, i.b)(await (0, i.l)()), window: { id: _.id, onLine: !0, isFullScreen: Boolean(document.fullscreenElement), [s.iL]: await (0, s.AD)(s.iL) }, tabs: [], settings: v(v(v({}, m.Sv), r), {}, { theme: (0, u.bb)(r) }), identityState: { features: {}, multi: { process: !1 } }, messagesState: {}, sidebarState: { esc: !0 }, focusTimeState: { soundProcess: !1 }, entry: k, pageState: { name: (0, p.j0)(k, Z) }, widgetWrapper: (0, c.x6)(Z) });
          },
          k = async (e = {}) =>
            window.__mnStore
              ? window.__mnStore
              : await (async (e = {}) => {
                  const t = v({}, await O(e));
                  return (
                    (window.__mnStore = (0, b.MT)((e = t, n) => {
                      const { key: r, property: o } = n;
                      switch (n.type) {
                        case 1:
                          return ((e[r] = v(v({}, e[r]), {}, { [o]: n.value })), v({}, e));
                        case 4:
                          return (r in e && o in e[r] && (delete e[r][o], (e[r] = v({}, e[r]))), v({}, e));
                        case 5:
                          return (r in e && delete e[r], v({}, e));
                        case 2:
                          return v(v({}, e), {}, { [r]: n.value });
                        case 3:
                          return v(v({}, e), n.data);
                      }
                      return e;
                    })),
                    window.__mnStore
                  );
                })(e),
          Z = () => (window.__mnStore ? window.__mnStore.getState() : null),
          M = (e, t, n) => {
            window.__mnStore && window.__mnStore.dispatch({ type: 1, key: e, property: t, value: n });
          },
          P = (e, t) => {
            window.__mnStore && window.__mnStore.dispatch({ type: 4, key: e, property: t });
          },
          j = (e, t) => {
            window.__mnStore && window.__mnStore.dispatch({ type: 2, key: e, value: t });
          },
          E = (e) => {
            window.__mnStore && window.__mnStore.dispatch({ type: 3, data: e });
          },
          T = async (e, t, n) => {
            (M(e, t, n), await (0, o.u$)(e, [t], n));
          },
          I = async (e, t, n, r = {}) => {
            (A(e, t, n, r), await (0, o.u$)(e, [t], n));
          },
          S = async (e, t, n = {}) => {
            (D(e, t, n), await (0, o.u$)(e, [], t));
          },
          D = (e, t, n = {}) => {
            (!1 === h().get(n, ["excludeCurrentTab"], !1) && j(e, t), (0, r.A8)(e, t, v(v({}, n), {}, { excludeCurrentTab: !0 })));
          },
          A = (e, t, n, o = {}) => {
            (!1 === h().get(o, ["excludeCurrentTab"], !1) && M(e, t, n), (0, r.dT)(e, t, n, v(v({}, o), {}, { excludeCurrentTab: !0 })));
          },
          C = (e, t, n = {}) => {
            (!1 === h().get(n, ["excludeCurrentTab"], !1) && P(e, t), (0, r.sB)(e, t, v(v({}, n), {}, { excludeCurrentTab: !0 })));
          };
      },
      17834: (e, t, n) => {
        n.d(t, { T: () => o, o: () => i });
        var r = n(83118);
        const o = () => [
            { icon: "new-tab", title: (0, r.a)("icon_chrome_item_new_tab"), url: "chrome://new-tab-page" },
            { icon: "delete", title: (0, r.a)("icon_chrome_item_clear"), url: "chrome://settings/clearBrowserData" },
            { icon: "settings-gear", title: (0, r.a)("icon_chrome_item_settings"), url: "chrome://settings" },
            { icon: "download", title: (0, r.a)("icon_chrome_item_downloads"), url: "chrome://downloads" },
            { icon: "history", title: (0, r.a)("icon_chrome_item_history"), url: "chrome://history" },
            { icon: "password", title: (0, r.a)("icon_chrome_item_passwords"), url: "chrome://password-manager" },
            { icon: "payment", title: (0, r.a)("icon_chrome_item_payments"), url: "chrome://settings/payments" },
            { icon: "place", title: (0, r.a)("icon_chrome_item_addresses"), url: "chrome://settings/addresses" },
            { icon: "dino-game", title: (0, r.a)("icon_chrome_item_game"), url: "chrome://dino/" },
            { icon: "extension", title: (0, r.a)("icon_chrome_item_extensions"), url: "chrome://extensions" },
            { icon: "apps", title: (0, r.a)("icon_chrome_item_apps"), url: "chrome://apps" },
            { icon: "info", title: (0, r.a)("icon_chrome_item_about"), url: "chrome://settings/help" },
          ],
          i = () => [
            { id: 1, icon: "incognito", title: (0, r.a)("icon_chrome_item_incognito"), action: "incognito" },
            { id: 2, icon: "window", title: (0, r.a)("icon_chrome_item_window"), action: "window" },
            { id: 3, icon: "history", title: (0, r.a)("icon_chrome_item_history"), url: "chrome://history", action: "history" },
            { id: 4, icon: "download", title: (0, r.a)("icon_chrome_item_downloads"), url: "chrome://downloads", action: "downloads" },
            { id: 5, icon: "delete", title: (0, r.a)("icon_chrome_item_clear"), url: "chrome://settings/clearBrowserData", action: "clear" },
          ];
      },
      82184: (e, t, n) => {
        n.d(t, { q: () => r });
        const r = () => [
          { id: 1, img: "youtube", title: "YouTube", url: "https://www.youtube.com/" },
          { id: 2, img: "facebook", title: "Facebook", url: "https://facebook.com/" },
          { id: 3, img: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/feed" },
          { id: 4, img: "amazon", title: "Amazon", url: "https://www.amazon.com/" },
        ];
      },
      96073: (e, t, n) => {
        n.d(t, { a: () => i, f: () => o });
        var r = n(83118);
        const o = () => [
            { img: "gmail", title: (0, r.a)("icon_google_item_gmail"), url: "https://mail.google.com/mail/" },
            { img: "youtube", title: (0, r.a)("icon_google_item_youtube"), url: "https://www.youtube.com/" },
            { img: "keep", title: (0, r.a)("icon_google_item_keep"), url: "https://keep.google.com/" },
            { img: "classroom", title: (0, r.a)("icon_google_item_classroom"), url: "https://classroom.google.com/" },
            { img: "drive", title: (0, r.a)("icon_google_item_drive"), url: "https://drive.google.com/" },
            { img: "docs", title: (0, r.a)("icon_google_item_docs"), url: "https://docs.google.com/document/" },
            { img: "sheets", title: (0, r.a)("icon_google_item_sheets"), url: "https://docs.google.com/spreadsheets/" },
            { img: "slides", title: (0, r.a)("icon_google_item_slides"), url: "https://docs.google.com/presentation/" },
            { img: "maps", title: (0, r.a)("icon_google_item_maps"), url: "https://maps.google.com/" },
            { img: "play", title: (0, r.a)("icon_google_item_play"), url: "https://play.google.com/" },
            { img: "news", title: (0, r.a)("icon_google_item_news"), url: "https://news.google.com/" },
            { img: "photos", title: (0, r.a)("icon_google_item_photos"), url: "https://photos.google.com/" },
          ],
          i = () => [
            { id: 1, img: "gmail", title: (0, r.a)("icon_google_item_gmail"), url: "https://mail.google.com/mail/" },
            { id: 2, img: "drive", title: (0, r.a)("icon_google_item_drive"), url: "https://drive.google.com/" },
            { id: 3, img: "calendar", title: (0, r.a)("icon_google_item_calendar"), url: "https://calendar.google.com/calendar/" },
            { id: 4, img: "meet", title: (0, r.a)("icon_google_item_meet"), url: "https://meet.new/" },
            { id: 5, img: "account", title: (0, r.a)("icon_google_item_account"), url: "https://myaccount.google.com/" },
          ];
      },
      58995: (e, t, n) => {
        n.d(t, { z: () => o });
        var r = n(83118);
        const o = () => [
          { img: "gmail", title: (0, r.a)("icon_popular_item_gmail"), url: "https://gmail.com/" },
          { img: "youtube", title: (0, r.a)("icon_popular_item_youtube"), url: "https://www.youtube.com/" },
          { img: "drive", title: (0, r.a)("icon_popular_item_drive"), url: "https://drive.google.com/" },
          { img: "keep", title: (0, r.a)("icon_popular_item_keep"), url: "https://keep.google.com/" },
          { img: "facebook", title: (0, r.a)("icon_popular_item_facebook"), url: "https://facebook.com/" },
          { img: "twitter", title: (0, r.a)("icon_popular_item_twitter"), url: "https://twitter.com/" },
          { img: "linkedin", title: (0, r.a)("icon_popular_item_linkedin"), url: "https://www.linkedin.com/" },
          { img: "netflix", title: (0, r.a)("icon_popular_item_netflix"), url: "https://www.netflix.com/" },
          { img: "amazon", title: (0, r.a)("icon_popular_item_amazon"), url: "https://www.amazon.com/" },
          { img: "ebay", title: (0, r.a)("icon_popular_item_ebay"), url: "https://www.ebay.com/" },
          { img: "walmart", title: (0, r.a)("icon_popular_item_walmart"), url: "https://www.walmart.com/" },
          { img: "aliexpress", title: (0, r.a)("icon_popular_item_ali"), url: "https://aliexpress.com/" },
        ];
      },
      33025: (e, t, n) => {
        n.d(t, { CV: () => u, YM: () => f, nN: () => c, pi: () => s, ti: () => w });
        n(31528);
        function r(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            (t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r));
          }
          return n;
        }
        function o(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? r(Object(n), !0).forEach(function (t) {
                  i(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : r(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
          }
          return e;
        }
        function i(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        const s = "chrome",
          a = "duckduckgo",
          c = "google",
          l = "ecosia",
          d = "neeva",
          u = "bing",
          p = "web",
          g = "map",
          m = "news",
          _ = "photo",
          h = "video",
          b = {},
          f = [
            { text: "Chrome", placeholder: "Search the web", desc: null, enabled: !0, svg: "search", engineName: s },
            { text: "Google", placeholder: "Search Google", desc: null, enabled: !1, svg: "painted/google", engineName: c },
            { text: "Bing", placeholder: "Search Bing", desc: null, enabled: !1, svg: "painted/bing", engineName: u },
            { text: "Neeva", placeholder: "Search Neeva", desc: null, enabled: !1, svg: "painted/neeva", engineName: d },
            { text: "DuckDuckGo", placeholder: "Search DuckDuckGo", desc: null, enabled: !1, svg: "painted/duck-duck-go", engineName: a },
            { text: "Ecosia", placeholder: "Search Ecosia", enabled: !1, svg: "painted/ecosia", engineName: l },
          ],
          w = (o({}, b), o({}, b), o({}, b), o({}, b), o({}, b), (e) => f.find((t) => t.engineName === e) || null);
      },
      13623: (e, t, n) => {
        n.d(t, { Bj: () => a, E8: () => i, O9: () => s });
        var r = n(31528),
          o = n.n(r);
        const i = 100,
          s = [
            { id: 100, color: "var(--color-hex-100)" },
            { id: 101, color: "var(--color-hex-101)" },
            { id: 102, color: "var(--color-hex-102)" },
            { id: 103, color: "var(--color-hex-103)" },
            { id: 104, color: "var(--color-hex-104)" },
            { id: 105, color: "var(--color-hex-105)" },
            { id: 106, color: "var(--color-hex-106)" },
            { id: 107, color: "var(--color-hex-107)" },
          ],
          a = (e) => {
            const t = s.find((t) => t.id === e);
            return o().get(t, ["color"], null);
          };
      },
      78579: (e, t, n) => {
        n.d(t, { Z: () => a });
        var r = n(72045),
          o = n(31528),
          i = n.n(o);
        function s(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        class a {
          constructor(e, t) {
            ((this.id = (0, r.Z)()), (this.action = e), (this.icon = t), (this.type = a.TYPE_COMPONENT), (this.hintI18n = null), (this.titleI18n = null), (this.extra = {}), (this.keepAlive = !1), (this.pin = { site: !1, ntp: !1 }), (this.resize = { minWidth: 360, maxWidth: 360 }), (this.children = []));
          }
          setResize(e) {
            return ((this.resize.minWidth = i().get(e, ["minWidth"], 360)), (this.resize.maxWidth = i().get(e, ["maxWidth"], 360)), (this.resize.adviseMinWidth = i().get(e, ["adviseMinWidth"], 360)), this);
          }
          pinFromSite() {
            return ((this.pin.site = !0), this);
          }
          pinFromNtp() {
            return ((this.pin.ntp = !0), this);
          }
          addChild(e) {
            return (this.children.push(e), this);
          }
          alive(e) {
            return ((this.keepAlive = e), this);
          }
          setType(e) {
            return ((this.type = e), this);
          }
          setAction(e) {
            return ((this.action = e), this);
          }
          setIcon(e) {
            return ((this.icon = e), this);
          }
          setHint(e) {
            return ((this.hintI18n = e), this);
          }
          setTitle(e) {
            return ((this.titleI18n = e), this);
          }
          setExtraParams(e) {
            return ((this.extra = e), this);
          }
        }
        (s(a, "TYPE_LINK", "link"), s(a, "TYPE_COMPONENT", "component"));
      },
      39773: (e, t, n) => {
        n.d(t, { $f: () => o, F1: () => S, FT: () => Z, G9: () => C, H0: () => _, II: () => D, Jl: () => A, L1: () => j, L2: () => f, Lj: () => w, Ny: () => y, OV: () => b, RK: () => u, St: () => M, XD: () => P, Z3: () => h, Zt: () => r, _b: () => d, eo: () => k, f5: () => c, fK: () => g, gh: () => I, hL: () => s, hd: () => E, je: () => l, mk: () => i, nR: () => p, r2: () => x, rI: () => O, uH: () => m, v6: () => T, yE: () => v, z2: () => a });
        const r = "launchpad",
          o = "translator",
          i = "google-translator",
          s = "calendar",
          a = "games",
          c = "settings",
          l = "sync",
          d = "detach",
          u = "pin",
          p = "other",
          g = "history",
          m = "desmos",
          _ = "drive",
          h = "gmail",
          b = "telegram",
          f = "whatsapp",
          w = "messengers",
          y = "youtube",
          v = "youtube-music",
          x = "google-messages",
          O = "ms-copilot",
          k = "notes",
          Z = "manganum-notes",
          M = "google-keep",
          P = "tasks",
          j = "todoist",
          E = "tick-tick",
          T = "google-tasks",
          I = "manganum-tasks",
          S = "gpt",
          D = "chat-gpt",
          A = "google-bard",
          C = "debug";
      },
      73006: (e, t, n) => {
        n.d(t, { r: () => o, x: () => r });
        const r = "auto",
          o = "shortcut";
      },
      24517: (e, t, n) => {
        n.d(t, { $h: () => u, I$: () => b, Jb: () => w, MZ: () => d, Vw: () => O, XJ: () => k, _D: () => h, bN: () => f, iW: () => p, jp: () => y, mZ: () => M, pL: () => Z, tg: () => g, v3: () => _, zZ: () => v, zy: () => m });
        n(88873);
        var r = n(78579),
          o = n(39773),
          i = n(31528),
          s = n.n(i);
        function a(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            (t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r));
          }
          return n;
        }
        function c(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? a(Object(n), !0).forEach(function (t) {
                  l(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : a(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
          }
          return e;
        }
        function l(e, t, n) {
          return (t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e);
        }
        const d = [
            new r.Z(o.Zt, "launchpad").setHint("side_bar_tool_launchpad").setTitle("side_bar_tool_launchpad"),
            new r.Z(o.mk, "translate")
              .setResize({ maxWidth: 1 / 0 })
              .setHint("side_bar_tool_google_translate")
              .setTitle("side_bar_tool_google_translate")
              .alive(!0),
            new r.Z(o.fK, "tabs").setHint("side_bar_tool_history").setTitle("side_bar_tool_history"),
            new r.Z(o.hL, "calendar").setHint("side_bar_tool_calendar").setTitle("side_bar_tool_calendar"),
            new r.Z(o.XD, "tasks")
              .setHint("side_bar_tool_tasks")
              .setTitle("side_bar_tool_tasks")
              .addChild(new r.Z(o.v6, "google-tasks").setHint("side_bar_tool_google_tasks").setTitle("side_bar_tool_google_tasks").alive(!0))
              .addChild(
                new r.Z(o.L1, "todoist")
                  .setHint("side_bar_tool_todoits")
                  .setTitle("side_bar_tool_todoits")
                  .setResize({ maxWidth: 1 / 0 })
                  .alive(!0),
              ),
            new r.Z(o.eo, "notes")
              .setHint("side_bar_tool_notes")
              .setTitle("side_bar_tool_notes")
              .addChild(
                new r.Z(o.St, "google-keep")
                  .setResize({ maxWidth: 1 / 0 })
                  .setHint("side_bar_tool_google_keep")
                  .setTitle("side_bar_tool_google_keep")
                  .alive(!0),
              )
              .addChild(new r.Z(o.FT, "notes").setHint("side_bar_tool_manganum_notes").setTitle("side_bar_tool_manganum_notes")),
            new r.Z(o.r2, "google-messages")
              .setHint("side_bar_tool_google_messages")
              .setTitle("side_bar_tool_google_messages")
              .setResize({ maxWidth: 1 / 0 })
              .pinFromSite()
              .pinFromNtp()
              .alive(!0),
            new r.Z(o.F1, "gpt")
              .setHint("side_bar_tool_gpt")
              .setTitle("side_bar_tool_gpt")
              .pinFromSite()
              .addChild(
                new r.Z(o.II, "gpt")
                  .setResize({ maxWidth: 1 / 0 })
                  .setHint("side_bar_tool_gpt")
                  .setTitle("side_bar_tool_gpt")
                  .pinFromSite()
                  .alive(!0),
              )
              .addChild(
                new r.Z(o.Jl, "google-gemini")
                  .setHint("side_bar_tool_gemini")
                  .setTitle("side_bar_tool_gemini")
                  .setResize({ maxWidth: 1 / 0 })
                  .pinFromSite()
                  .alive(!0),
              ),
            new r.Z(o.uH, "calculator").setHint("side_bar_tool_desmos").setTitle("side_bar_tool_desmos").alive(!0),
            new r.Z(o.H0, "google-drive").setHint("side_bar_tool_drive").setTitle("side_bar_tool_drive").alive(!0),
            new r.Z(o.Z3, "mail").setHint("side_bar_tool_gmail").setTitle("side_bar_tool_gmail").alive(!0),
            new r.Z(o.nR, "arrow-wide-down").setHint("side_bar_tool_other_show").setTitle("side_bar_tool_other_show").setExtraParams({ divider: !0 }),
            new r.Z(o.z2, "games").setHint("side_bar_tool_games").setTitle("side_bar_tool_games"),
            new r.Z(o.Lj, "sms")
              .setHint("side_bar_tool_messengers")
              .setTitle("side_bar_tool_messengers")
              .pinFromSite()
              .pinFromNtp()
              .addChild(
                new r.Z(o.L2, "whatsapp")
                  .setResize({ maxWidth: 1 / 0, adviseMinWidth: 800 })
                  .setHint("side_bar_tool_whatsapp")
                  .setTitle("side_bar_tool_whatsapp")
                  .pinFromSite()
                  .pinFromNtp()
                  .alive(!0),
              )
              .addChild(
                new r.Z(o.OV, "telegram")
                  .setResize({ maxWidth: 1 / 0 })
                  .setHint("side_bar_tool_telegram")
                  .setTitle("side_bar_tool_telegram")
                  .pinFromSite()
                  .pinFromNtp()
                  .alive(!0),
              ),
            new r.Z(o.yE, "youtube-music")
              .setHint("side_bar_tool_youtube_music")
              .setTitle("side_bar_tool_youtube_music")
              .setResize({ maxWidth: 1 / 0 })
              .pinFromSite()
              .pinFromNtp()
              .alive(!0),
            new r.Z(o.Ny, "youtube")
              .setHint("side_bar_tool_youtube")
              .setTitle("side_bar_tool_youtube")
              .setResize({ maxWidth: 1 / 0 })
              .pinFromSite()
              .pinFromNtp()
              .alive(!0),
          ],
          u = [o.v6, o.St, o.Jl, o.mk, o.Ny, o.yE],
          p = { [o.XD]: o.v6, [o.eo]: o.FT, [o.F1]: o.II, [o.Lj]: o.L2 },
          g = { [o.Zt]: 0, [o.Z3]: 1, [o.hL]: 2, [o.XD]: 3, [o.eo]: 4, [o.F1]: 5, [o.mk]: 6, [o.Ny]: 7, [o.yE]: 8, [o.Lj]: 9, [o.r2]: 10, [o.fK]: 11, [o.nR]: 12, [o.H0]: 13, [o.uH]: 14, [o.z2]: 15 },
          m = [new r.Z(o.RK, "pin-outline").setHint("side_bar_tool_pin").setTitle("side_bar_tool_pin"), new r.Z(o.f5, "settings").setHint("side_bar_tool_settings").setTitle("side_bar_tool_settings"), new r.Z(o.je, "account-small").setHint("side_bar_tool_sync").setTitle("side_bar_tool_sync"), new r.Z(o.G9, "debug").setHint("side_bar_tool_debug").setTitle("side_bar_tool_debug")],
          _ = { [o.f5]: 10, [o.G9]: 20, [o.je]: 30 },
          h = (e, t) => e.sort((e, n) => ((void 0 === t[e.action] ? 1 / 0 : t[e.action]) < (void 0 === t[n.action] ? 1 / 0 : t[n.action]) ? -1 : 1)),
          b = (e) => {
            const t = d.find((t) => t.action === e) || null;
            return t || m.find((t) => t.action === e) || null;
          },
          f = (e, t) => {
            for (let n of e) {
              if (n.action === t) return n;
              const e = x(n, t);
              if (e) return e;
            }
            return null;
          },
          w = (e) => !0 === s().get(e, ["extra", "divider"]),
          y = (e) => Array.from(e).filter((e) => !w(e)),
          v = (e) => s().get(e, ["children"], []),
          x = (e, t) => v(e).find((e) => e.action === t) || null,
          O = (e, t) => {
            for (let n of e) if (x(n, t)) return n;
            return null;
          },
          k = (e, t) => s().get(c(c({}, p), t), [e], null),
          Z = (e, t) => {
            const n = k(e.action, t);
            return x(e, n);
          },
          M = (e, t) => {
            const n = Z(e, t) || e;
            return c(c({}, e), {}, { icon: n.icon, hintI18n: n.hintI18n, titleI18n: n.titleI18n });
          };
      },
      87937: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { account: "X55iS" };
      },
      19330: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { balloon: "qe1Yb", balloon_content: "lzr9W", "balloon_content--visible": "_2HgtT", balloon_caret: "hTGed", "balloon_caret--top": "KsRmJ", "balloon_caret--left": "Xv4M_" };
      },
      51998: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = {
          btn: "CtWHo",
          btn_stretch: "Dttxh",
          btn_wrap: "j11SO",
          btn_content: "wOhHk",
          "btn_radius--2": "r5jmA",
          "btn_radius--3": "vFiDG",
          "btn_radius--4": "zbqJJ",
          "btn_radius--6": "Q4Y5R",
          "btn_radius--8": "Rwk4L",
          "btn_align--left": "KqiVR",
          "btn_align--center": "Svi5L",
          "btn_align--right": "DQzIb",
          "btn_align--between": "AHNQJ",
          "btn_padding--4": "g3ycJ",
          "btn_padding--6": "JYSQC",
          "btn_padding--8": "ZDw0g",
          "btn_padding--10": "_ozO3",
          "btn_padding--12": "KtTUT",
          "btn_padding--16": "hhGXY",
          "btn_padding--24": "SpGSn",
          "btn_padding--32": "I0cZO",
          btn_margin: "OuAPP",
          "btn_size--22": "RIKm8",
          "btn_size--32": "bMWo_",
          "btn_size--36": "XHCex",
          "btn_size--40": "s1mDb",
          "btn_size--48": "Rr5b0",
          "btn_size--52": "eLAmv",
          "btn_size--60": "btPr4",
          "btn_shadow--gray-015": "mCI_X",
          "btn_shadow--black-075": "_WjDW",
          "btn_skin--plus": "EMsV2",
          "btn-plus-anime": "t6Kgz",
          btn_icon: "JrYfp",
          "btn_skin--reverse-base-border": "GVXgx",
          "btn_skin--reverse-default-border": "e1vrm",
          "btn_skin--reverse-base": "swlWG",
          "btn_skin--reverse-default": "MiiRJ",
          "btn_skin--fixed-white-border": "WVYeb",
          "btn_skin--fixed-black-border": "Nrtyo",
          "btn_skin--fixed-blue-border": "qgAWL",
          "btn_skin--fixed-hex-03-border": "USCgZ",
          "btn_skin--fixed-hex-02-border": "u6zuw",
          "btn_skin--fixed-white": "PQmMy",
          "btn_skin--fixed-black": "JZLQy",
          "btn_skin--fixed-blue": "OR0lo",
          "btn_skin--fixed-blue-active": "CIsSs",
          "btn_skin--transparent-border": "k8gKQ",
          "btn_skin--transparent": "Me1cg",
          "btn_skin--link": "Ethus",
          "btn_icon--10": "zxTUt",
          "btn_icon--left": "fle64",
          "btn_icon--right": "kaHlp",
          "btn_icon--12": "UnJxi",
          "btn_icon--16": "lHcEW",
          "btn_icon--18": "IsrcJ",
          "btn_icon--20": "JOH6f",
          "btn_icon--24": "grRDp",
          btn_ellipsis: "R2vUD",
        };
      },
      77461: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { button: "YZVOB" };
      },
      77491: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { caret: "OiLZD", caret_title: "wu8qH", "caret_title--stretch": "djSF4", caret_icon: "jygpe", "caret_icon--active": "nk2sz", "caret_skin--default-025": "A_ibM", "caret_icon--base": "Bh97l", "caret_skin--default-050": "Qf8sw", "caret_skin--default-100": "ta2mq", "caret_skin--blue-100": "Ll6lO", "caret_skin--white-100": "kI4x0", caret_badge: "qU44t" };
      },
      31218: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { contextmenu: "DcRUS", contextmenu_hidden: "HPCbz" };
      },
      50668: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { copy: "wIjhT", "mg-copy-move": "UWDCY" };
      },
      91902: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { copyright: "kceph" };
      },
      61437: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { counter: "JzF4F", "counter_size--6": "GNlxx", "counter_size--12": "B9T76", "counter_size--16": "EtsUd", "counter_size--18": "hsXbG", counter_skin: "VJs78", "counter_skin--hex-01": "OdpP5", "counter_skin--hex-02": "MorIU", "counter_skin--hex-03": "YPLzj", "counter_skin--hex-04": "wDq65", "counter_skin--hex-05": "PMJUW", "counter_skin--hex-06": "Yng5D", "counter_skin--default-050": "J2AVj" };
      },
      72363: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { day: "SBzTS", day_bg: "ymx_q", day_content: "I74Xf", "day_radius--2": "P1RSS", "day_radius--4": "zozwm", "day--round": "rWtva", "day--readonly": "wINha", "day--active": "eJXXp", "day--default": "vh8a6", "day--current": "r0g6k", "day_skin--default_025": "sOP4k", "day_skin--default_050": "xIzhB", "day_skin--default_075": "b63_H", "day_skin--default_100": "xEbr7", "day_skin--current_01": "Ym9cU", "day_skin--current_02": "sWcDU", "day_size--20": "MwWcn", "day_size--22": "R6gcK", "day_size--36": "wKbbF", "day_size--38": "Kytcd", "day_size--42": "yI_fo" };
      },
      28644: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { head: "erw_j", head_month: "utEb_", "head_month--02": "opebA", "head_month--04": "lAAh0", "head_month--06": "PDmbZ", "head_month--08": "fyPwx", "head_month--10": "tooOf", "head_month--12": "lHqqu", "head_size--22": "cGlxC", "head_size--20": "PbKCt" };
      },
      46891: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { head: "yM01X", "head_size--20": "S57cd", "head_size--22": "KT8ku", "head_size--36": "okFcj", "head_size--38": "xZpuA", "head_size--42": "s6N7X" };
      },
      52173: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { picker: "p7sTD", "picker--shadow": "IVsba", "picker--border": "f8EWR", picker_table: "_gpLa", picker_row: "UA4jc", "picker_skin--base-100": "z7flU", "picker_skin--default-100": "wQoWh", "picker_radius--2": "bcMo8", "picker_radius--4": "PSEnb", "picker_gap--2": "zf4uk", "picker_gap--4": "A4Oev", "picker_week-day": "I9UiC", picker_controls: "MwQPA" };
      },
      20793: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { divider: "H117s", divider_h: "_MOKK", divider_v: "vC5fG", "divider_skin--default": "tnfUA", "divider_skin--default-d010": "Oyr_3", "divider_skin--default-d025": "FiITf", "divider_skin--default-d050": "eysrS", "divider_skin--default-d075": "NoFHo", "divider_skin--base": "wzKlI", "divider_skin--base-b010": "lUPdT", "divider_skin--base-b025": "x4zpx", "divider_skin--base-b050": "awEeA", "divider_skin--base-b075": "SoDwZ", "divider_skin--white": "SESdO" };
      },
      39876: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { dropdown: "IWs60", "dropdown--stretch": "UxFoZ", dropdown_list: "MtWS4", "dropdown_list--stretch": "wnnZT", "dropdown_list--active": "tRD67" };
      },
      31208: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { dropdown: "YtSVq", dropdown_list: "brNDq", "dropdown_list--active": "u5qZU", "dropdown_direction--up-40": "gUYVe", "dropdown_direction--down-40": "OyB0r", dropdown_field: "UqqWh", dropdown_text: "RByZy", dropdown_desc: "JVarR", "dropdown_size--40": "KOx1c", "dropdown_skin--base-100": "aOcON", "dropdown_field--active": "qW2i4", dropdown_wrap: "KEPFf", dropdown_shadow: "g94io", "dropdown_radius--4": "HZ13p", "dropdown_radius--8": "WNbHj", dropdown_caret: "ApLMg", dropdown_icon: "wro9t" };
      },
      18097: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { dropdown: "_3ZZcg", "dropdown--stretch": "uXBXS", dropdown_list: "usIBT", "dropdown_list--stretch": "qzp9K", "dropdown_list--active": "Gv5FO" };
      },
      88277: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { dropdown: "H7sd1", "dropdown--stretch": "_sMv8", dropdown_list: "MCgKM", "dropdown_list--active": "MAkTk", "dropdown_list--stretch": "HQpU6", dropdown_icon: "G93c2" };
      },
      2889: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { dropdown: "EmXDC", "dropdown--stretch": "Ff30b", dropdown_list: "o5Yih", "dropdown_list--active": "ZvfZw", "dropdown_list--stretch": "vV0xV", dropdown_caret: "yJu_8" };
      },
      23086: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { ellipsis: "O5IEA", "ellipsis--row": "Fr8M7", "ellipsis--rows": "jumI2" };
      },
      68619: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { empty: "BWVYe", empty_wrap: "zrshw", empty_icon: "om4Qv" };
      },
      12619: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { header: "N2Pp5", "header--bordered": "_NYlx", "header--shadow": "cmbrP", header_cover: "v9BZl", header_calendar: "SWUFe" };
      },
      32705: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { meet_button: "TGd2a", meet_text: "Mrl6R", meet_svg: "IchRn", meet_cover: "ic9an", meet_content: "x0ECx", meet_container: "aaonz", meet_divider: "bz09Z" };
      },
      94061: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { "meet_line-through": "t4BtF", meet_button: "T_U7M", meet_text: "TxJLz", meet_svg: "YManV", meet_container: "RZg1a", meet_content: "w5n6A", meet_cover: "YhzqS" };
      },
      46917: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { wrap: "VwqLc", "wrap--disabled": "yvEhf", "wrap--hover": "mcwG1", "wrap--press": "_uiTs", wrap_content: "LWexG", wrap_cover: "KHC3J", wrap_bg: "nJZBo", "wrap_bg--tentative": "sa0FO", wrap_marker: "GDQEb", wrap_divider: "yu6nI" };
      },
      50325: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { meet_button: "TFI1t", meet_text: "iKGRG", meet_svg: "Pq0ZD", meet_cover: "NFmc5", meet_content: "wpKXh", meet_container: "njguZ", "meet_container--default": "ihFsN", "meet_container--default-active": "gWUBa", "meet_container--base-active": "tYArx", meet_divider: "qBibE" };
      },
      75313: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { event: "udoQ6", event_lottie: "rjJdO" };
      },
      12386: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { expand: "l38LQ", "expand_height--40": "IP0pk", expand_icon: "ybaFX", expand_text: "GHENy", expand_circle: "wT6u8" };
      },
      12742: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { label: "dcaHY", "label_gap--2": "bjLnc", "label_gap--4": "BVzMS", "label_radius--2": "waOPa", "label_radius--4": "qlQrz", "label_icon--12": "PYsSf", label_bg: "miP9P", "label_skin--default": "K57SR" };
      },
      45715: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { labels: "gvKRQ", labels_wrap: "S5Vmy", labels_icon: "FU4DY", labels_group: "FMaBR" };
      },
      68553: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { item: "GHTdf", item_labels: "A70uq", item_time: "BqmG2", item_controls: "aG6qH", item_star: "S3p3o", item_content: "tamH2", item_row: "S2kNP", item_attach: "KKGhh", item_dot: "OzZh4" };
      },
      38873: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { tool: "L8XuS", "tool_radius--4": "bJksY", "tool_size--24": "epESZ", "tool--default": "L7yHw", "tool--active": "ywhsW" };
      },
      44439: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { item: "MRaVl", item_hover: "QROmG", item_active: "tzFO3", item_controls: "TufrC", item_caret: "y7TkH", item_wrap: "wtFl7", item_avatar: "zt7iy", item_content: "c7Ji1", item_row: "zR7Ox", item_labels: "BISCK", item_attach: "UtFK2" };
      },
      68247: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { item: "bJ8zw", item_row: "SfT3t", item_str: "IuCiB", item_column: "r5IeF", item_hover: "S3bTu" };
      },
      95810: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { controls: "X82bX", controls_group: "E1BjH", "controls_group--col": "jHbzr", "controls_group--center": "P0s5t" };
      },
      76550: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { close: "bF71q" };
      },
      40615: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { icon: "LDEyG", icon_circle: "IlQU6", "icon_size--20": "OWuIW", icon_svg: "glrb6", "icon_size--32": "e_phf", "icon_size--36": "fH9JS", icon_border: "n4G3w", icon_hover: "gVdhG", icon_skin: "CoyCe", "icon_skin--default": "Eodry", "icon_skin--orange": "zDGpB", "icon_skin--red": "chnRj", "icon_skin--green": "DE38G", "icon_skin--default-025": "wmrrW", "icon_skin--transparent": "o094P" };
      },
      63592: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { icon_container: "uTGMC", icon_caret: "FWlly", "icon_container--pointer": "m6tiT", "icon_container--disabled": "biNGb", "icon_skin--default-050": "DHcZj", "icon_skin--base-050": "Ot5IU", "icon--active": "hw4nj", "icon_skin--default-075": "sI28r" };
      },
      17433: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = {
          input: "nE8Gu",
          "input--transition": "pVDqm",
          "input_height--32": "Apd4l",
          "input_height--36": "mxGDZ",
          "input_height--40": "G335A",
          "input_radius--4": "dtvsW",
          "input_radius--8": "z1esZ",
          input_content: "kbR0D",
          input_placeholder: "lAY5S",
          "input_placeholder--transition": "TNMyn",
          "input_placeholder--hide": "jvHeI",
          "input_placeholder--left": "xopJD",
          "input_placeholder--right": "ccFZb",
          "input_placeholder--center": "Ma8FF",
          "input_placeholder--pl": "uW0vm",
          "input_placeholder--pr": "SfgQG",
          "input_placeholder--ph": "bpOMn",
          "input_skin--default": "xOE6t",
          "input_skin--transparent": "vLa3c",
          input_focus: "D9VVZ",
          input_error: "l50MS",
          input_stretch: "YLDyc",
          "input_cursor--left": "UGssj",
          "input_cursor--center": "dMDtq",
          "input_cursor--right": "K_BBM",
          input_field: "a6XSD",
          "input_padding--left": "enaML",
          "input_padding--right": "Mor7w",
          input_icon: "RRanN",
          "input_icon--svg": "cnjx7",
          "input_icon--svg-100": "le3Cu",
          "input_icon--svg-050": "nbrDm",
          "input_icon--right": "NtqIu",
          "input_icon--left": "EG98P",
        };
      },
      21966: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { input: "_jIdc", input_scrollbar: "okE2L", input_items: "_gBwH" };
      },
      41233: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { item: "CaWT7", item_label: "X5rNm", item_icon: "hSOne" };
      },
      16158: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { item: "UOYW6", "item--hover": "wnRDL", item_icon: "GLCBf", "item--shadow": "eHyW7" };
      },
      32050: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { item: "dFce0", "item--focus": "soEx5", "item--default": "dEBVQ", "item--grab": "Dbpsk", "item--shadow": "gGEmN", "item_radius--4": "TMwvn", item_overlay: "qLr5_", item_bordered: "kfisA", item_divider: "VWSqI" };
      },
      36800: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { btn: "P6bAK", btn_stop: "MjDfY", "voice-playing": "i2A9p", "btn_icon--play": "r4XKh", "btn_icon--stop": "dMs2J" };
      },
      75460: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { grid: "o_4H5" };
      },
      78175: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { label: "ovwOP", label_gradient: "FuYDW" };
      },
      25370: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { section: "NlMfW", section_border: "wzvhJ", section_wrap: "aBb5B", section_offset: "ruA0X", section_head: "AERXG", section_controls: "K9msh", "section_controls--visible": "xcOvS", "section--disabled": "bdZzE", "section--enabled": "_34IaX" };
      },
      94525: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { tile: "XwC3G", tile_box: "jh0pS", "tile_box--init": "NbA9t", "tile_box--placeholder": "Esevu", tile_shadow: "Pw20v", tile_bg: "SJ65D", tile_glass: "ThASg", "tile--active": "t6qZh", "tile--hover": "LS0WW", "tile-bg-anim": "inFdO", tile_title: "WC4V3", "tile--disable": "gxA34", tile_icon: "s6Df7", tile_spinner: "VztQZ", "tile_icon--loading": "mwZ54", "tile_align-x--start": "kcg8B", "tile_align-x--end": "beRjE", "tile_align-x--center": "l8SEo", "tile_align-y--start": "bp2jq", "tile_align-y--end": "WG5fd", "tile_align-y--center": "XpoQF", tile_empty: "I23X7" };
      },
      9320: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { tile: "ZpRCP", tile_title: "VQGbT" };
      },
      34592: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { tile: "hXCD5" };
      },
      25235: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { tile: "HgFxH", "tile_disable--hover": "YWWYx", "tile--hover": "uhY0a", tile_title: "rDQlz", tile_controls: "wgsPh", "tile_disable--active": "e3KMm", "tile--active": "EwJVZ", "tile--disable": "HMJOX", tile_icon: "ddNBW", tile_spinner: "HfyoM", "tile_icon--loading": "cUhxc", tile_wrap: "jvA8j", "tile_controls--show": "R924r" };
      },
      75356: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { tree: "paIvc", tree_icon: "kSCML" };
      },
      10853: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { row: "yNWg3", row_controls: "xRrqU" };
      },
      37346: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { link: "OrM64", link_underline: "uoCLc", "link_underline--3": "EAEVV", "link_skin--default-050": "JqST_", "link_skin--default-075": "nFXnj", "link_skin--default-100": "FCGLL" };
      },
      83572: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { logo: "pCieo", logo_icon: "sq6Cd", "logo_gap--8": "UPab8", "logo_gap--14": "HWYF8", "logo_gap--16": "d8abd" };
      },
      78825: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { menu: "j3CuO", menu_wrap: "B_SsL" };
      },
      64471: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { item: "X4EP4", item_icon: "oBhro", item_outbound: "MGmn6", "item--transition": "RvIUr" };
      },
      21483: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { error: "fwNI5", error_wrap: "w2eIP", error_title: "Mpf3H", error_text: "GuEi_", error_buttons: "CYJW_" };
      },
      58463: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { message: "TI_iR", message_icon: "DMlcw", message_wrap: "nclnL" };
      },
      97076: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { modal: "ICg68", "modal--visible": "jGhQu", modal_input: "SD_Hh" };
      },
      11253: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { item: "GtOV3", item_divider: "WC4MH", "item--edit": "Fs9Cp", "item--empty": "EdonU", item_group: "yZMqf", item_meta: "YrJjI", item_content: "v0O9g", "item_content--shadow": "Ek22M", item_colors: "aunG6", item_color: "iZvMe", "item_color--active": "lMARN" };
      },
      36501: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { option: "UthbD", "option_radius--4": "q9bwl", option_skin: "_4N1rL", "option_skin--default-005": "DTk8u", "option--hover": "YklbR", "option--active": "fiHdA", "option--press": "wgTKx", "option_skin--blue-005": "LJkUK", option_icon: "ZYQxL", "option_image-wrap": "SOPAL", option_image: "jYRxX", option_group: "DVUly", option_text: "bHKa8", option_desc: "XyjPR", option_wrap: "xS6jU", option_button: "XmPnA" };
      },
      58289: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { option: "VdCbI", option_content: "oXR3G", option_skin: "fM1H6", "option_skin--default-005": "b7O9n", "option--active": "L9Yqi", "option--hover": "otqlq", option_icon: "S9R3y", option_group: "zqgdJ", option_text: "N4seS", "option_text-small": "u6Uft", option_wrap: "q6WKn" };
      },
      34807: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { outbound: "i0GrY", "outbound_position--button": "rxzyj", "outbound_position--link": "FNuey", "outbound_skin--fixed-white-075": "RpexA", "outbound_skin--fixed-white-050": "_walm", "outbound_skin--fixed-blue-075": "Oz6Et", "outbound_skin--default-025": "KSnjq", "outbound_skin--default-050": "XgzMT", "outbound_skin--default-100": "PK5IJ", "outbound_skin--base-050": "KBuLV", "outbound_skin--base-100": "TqBgy", "outbound_skin--hex-02": "W3Iyl" };
      },
      33920: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { panel: "vW_xN", panel_tabs: "L5Qju", panel_dash: "iIZjt", panel_shadow: "VhXUF", "panel_radius--0": "oqnAi", "panel_radius--4": "E9VvF", "panel_radius--8": "_hrJe", "panel_skin--head": "lXXIM", "panel_skin--tabs": "aoXqZ", "panel_skin--tab": "_771Jd", "panel_skin--tab-active": "eVxeX", "panel_skin--dash": "vnPn9", panel_body: "RslSh", panel_container: "KlPwh", panel_cover: "YdWgb", "panel_cover--active": "aYnJD" };
      },
      45207: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { paper: "pn1sE", "paper_skin--base-100": "SpSzt", "paper_skin--white-100": "XIfDo", "paper_skin--default-005": "GCYgT", "paper_border--default-005": "UUhEg", "paper_border--base-100": "GcS4z", "paper_border--white-100": "N2Jzy", "paper_radius--4": "d0c4M", "paper_radius--7": "g5DtN", "paper_radius--8": "rRKfp", "paper_radius--16": "SrXl8", "paper--disabled": "TwhRn", "paper--shadow": "R0EH6" };
      },
      69478: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { frame: "SeemM", frame_title: "zFgYw", "frame_padding--04": "e6l2V", "frame_padding--08": "E90u1", "frame_padding--16": "TqAJX", "frame_radius--04": "gSY6t", "frame_radius--08": "FWizd", "frame_radius--16": "JrHcQ", "frame_skin--base-100": "HYeV_" };
      },
      1844: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { card_logo: "NIsRY", card_content: "RbilM", card_body: "VCEaw" };
      },
      93873: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { card: "fH7qv", card_wrap: "m5dBj", card_control: "ARUk7", card_skin: "KB29X", "card_skin--grb02-010": "XFFuz", "card_skin--default-010": "ekium", card_outbound: "zkM6c" };
      },
      27359: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { pulse: "IgVFy", pulse_wrap: "nXVlm", "pulse_glow-2": "YCx3w", "pulse-shadow-2-1": "U_AV5", "pulse-shadow-2-2": "u89GJ", pulse_glow: "pZeXR", "pulse-shadow": "xYY6n" };
      },
      79330: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { group: "xfHLf", group_wrap: "Moekh", group_shadow: "mEFIz", "group_margin--4": "Qc6_v", "group_gap--4": "be14A", "group_gap--5": "SxChn", "group_radius--4": "tR26y", "group_radius--8": "XMvE1", "group_skin--base-100": "ncRVF" };
      },
      27794: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { item: "aJvwP", item_active: "jEFkj", item_skin: "YYiyY", "item_skin--base-100": "GGiMr", "item_radius--4": "KwxAx", "item_radius--8": "zODjA", item_wrap: "xEvEw" };
      },
      26434: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { process: "qjUet", process_percent: "hSvws", process_icon: "AFg3r", "process--visible": "Mhq8I" };
      },
      26778: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { search: "xMV2J", search_input: "J_9bD", search_paper: "FeRwa", search_items: "wny5Q", search_icon: "zL9y6" };
      },
      19952: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { "shortcut-key": "fEwei", "shortcut-key_wrap": "Qcbnb", "shortcut-key_wrap--border": "gyiUB", "shortcut-key_wrap--sm": "T748a", "shortcut-key_wrap--md": "dwOxS", "shortcut-key_skin--default-010": "FLvsY", "shortcut-key_skin--base-025": "RQBkx", "shortcut-key_size--sm": "nRAvx", "shortcut-key_size--md": "elG3o" };
      },
      27297: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { "sign-in": "mZE2M", "sign-in_content": "MApa6", "sign-in_form": "AR3mh", "sign-in_logo": "kv_AZ", "sign-in_title": "uc6t7", "sign-in_img": "vvbHi", "sign-in_text": "_hkY1", "sign-in_msg": "ystnv" };
      },
      32918: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { "sign-out": "u3M2P", "sign-out--hide": "j8oLd", "sign-out_info": "Gnvra", "sign-out_btn": "S4LNH", "sign-out_spinner": "ciWOW" };
      },
      61383: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { skeleton: "Uruk1", skeleton_gradient: "afW1j", "skeleton-anim": "EIbkj", skeleton_block: "PmELF", skeleton_group: "MP8cQ", skeleton_line: "mV5oe", skeleton_box: "AbVHU", skeleton_skin: "Em6Ht" };
      },
      91426: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { item: "rGHhC", item_bordered: "quRij", item_placeholder: "vmNQb", "item--active": "qJecv" };
      },
      43706: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { item: "nSi9P", "item--active": "HUbNp" };
      },
      4165: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = {
          "svg_filter--default": "lHpfv",
          "svg_size--8": "dmwIp",
          "svg_size--10": "W8cro",
          "svg_size--12": "uD7LL",
          "svg_size--14": "lXShS",
          "svg_size--16": "YFick",
          "svg_size--18": "JclPd",
          "svg_size--20": "vwcTi",
          "svg_size--22": "JKaGA",
          "svg_size--24": "MqsgC",
          "svg_size--26": "AIYSq",
          "svg_size--28": "Lgqic",
          "svg_size--30": "aVBWC",
          "svg_size--32": "XsQOW",
          "svg_size--34": "Lp7yu",
          "svg_size--36": "e3IPh",
          "svg_size--38": "UfrIP",
          "svg_size--40": "DC4iT",
          "svg_skin--hex-01": "pAT97",
          "svg_skin--hex-02": "AVFx3",
          "svg_skin--hex-03": "D0D0S",
          "svg_skin--hex-04": "Yji1M",
          "svg_skin--hex-05": "llSwt",
          "svg_skin--hex-06": "arUh_",
          "svg_skin--white-025": "HHl14",
          "svg_skin--white-050": "tCiI_",
          "svg_skin--white-075": "lZq2b",
          "svg_skin--white-100": "V9wxj",
          "svg_skin--blue-025": "fKsTk",
          "svg_skin--blue-050": "DNUzT",
          "svg_skin--blue-075": "dhKlQ",
          "svg_skin--blue-100": "iQEff",
          "svg_skin--base-025": "_nHDh",
          "svg_skin--base-050": "Pypfc",
          "svg_skin--base-075": "iPzgc",
          "svg_skin--base-100": "zzCgu",
          "svg_skin--default-025": "fLaEY",
          "svg_skin--default-050": "s8oiY",
          "svg_skin--default-075": "o7YZm",
          "svg_skin--default-100": "TCuU1",
        };
      },
      98149: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { switch: "z5DWJ", "switch_padding--x-16": "fUWjC", "switch_padding--y-12": "wfUfD", "switch_radius--4": "Wm08p", "switch_radius--8": "zeyXI", "switch--bordered": "tSkvm", "switch--disabled": "Ngq9v", "switch--hover": "NRUtb", "switch--active": "TTLS3", "switch--stretch": "Ccl7X", switch_icon: "Km0bH", switch_group: "STUUD", switch_input: "VKf9h", switch_marker: "isY6k", "switch_marker--disabled": "PAaaR", switch_label: "KXu6h", "switch_margin--left": "bLoIk", "switch_margin--right": "dkibX" };
      },
      6806: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { switch: "l8yuF", switch_wrap: "SfGcw", "switch_radius--4": "DaWjX", "switch_radius--8": "qhoMf", "switch_skin--base-100": "FJsgk", switch_border: "yAX4Q", "switch_skin--default-005": "F_GXv", switch_box: "DtcAV", switch_icon: "nlszR", switch_shadow: "I9BLs" };
      },
      5658: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { head: "fNo5A", head_border: "ueUNn", head_container: "tcSuh", head_shadow: "v9Cbl", head_controls: "sYX6S", head_list: "U4GSO", head_value: "_Q2NX" };
      },
      65772: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { item: "CVL0F", item_wrap: "SPUCu", item_marker: "yS6V8", "item_marker--checked": "Rl43U", item_field: "INUbz", item_controls: "WpLsH" };
      },
      22134: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = {
          text: "eIUc4",
          "text_display--inline": "pKsJI",
          "text_display--grid": "aXx5B",
          "text_display--flex": "Fo04j",
          "text_display--row": "sIIgA",
          "text_display--col": "E9xNH",
          "text_display--between": "MZQF3",
          "text_align--x-start": "epw2u",
          "text_align--x-center": "rM5YV",
          "text_align--x-end": "aVSpw",
          "text_align--y-start": "zu9wW",
          "text_align--y-center": "YE0tT",
          "text_align--y-end": "RSl5h",
          "text_skin--hex-01": "SJj2D",
          "text_skin--hex-02": "AxT4F",
          "text_skin--hex-03": "wFsBz",
          "text_skin--hex-04": "ME_Lq",
          "text_skin--hex-05": "gMeGm",
          "text_skin--hex-06": "XweN3",
          "text_skin--gray-100": "rZ0X2",
          "text_skin--white-025": "GhKE5",
          "text_skin--white-050": "F4O2l",
          "text_skin--white-075": "zfAKk",
          "text_skin--white-100": "hvxp9",
          "text_skin--blue-025": "uXEvO",
          "text_skin--blue-050": "qr716",
          "text_skin--blue-075": "vxGjb",
          "text_skin--blue-100": "LOot2",
          "text_skin--base-025": "FnLkq",
          "text_skin--base-050": "JZyWJ",
          "text_skin--base-075": "NC5tf",
          "text_skin--base-100": "AtLAJ",
          "text_skin--default-025": "Om2YP",
          "text_skin--default-050": "qQY6I",
          "text_skin--default-075": "mppgF",
          "text_skin--default-100": "KjKSl",
          "text_font--title": "r3imZ",
          "text_font--text": "dWgAL",
          "text_font--arial": "RjpHl",
          "text_weight--100": "LO66x",
          "text_weight--200": "t407T",
          "text_weight--300": "PgDvZ",
          "text_weight--400": "esF85",
          "text_weight--500": "BB0Fc",
          "text_weight--600": "ouusQ",
          "text_weight--700": "_2lIt",
          "text_weight--800": "ELOp1",
          "text_weight--900": "RbNIk",
          "text_height--8": "RHAHe",
          "text_height--9": "oNXr3",
          "text_height--10": "l46Dd",
          "text_height--11": "Ul3RM",
          "text_height--12": "vyM8a",
          "text_height--13": "hrvpC",
          "text_height--14": "FAVig",
          "text_height--15": "Fhz3E",
          "text_height--16": "X0TGZ",
          "text_height--17": "QOgOa",
          "text_height--18": "LxM3_",
          "text_height--19": "Wbm_d",
          "text_height--20": "Cm0q3",
          "text_height--21": "cF1Bw",
          "text_height--22": "ZsjWw",
          "text_height--23": "osn6f",
          "text_height--24": "V50J7",
          "text_height--25": "ZLzeN",
          "text_height--26": "f89hd",
          "text_height--27": "JbUs0",
          "text_height--28": "lyhgF",
          "text_height--29": "at2br",
          "text_height--30": "zN3Zm",
          "text_height--31": "Wcb1F",
          "text_height--32": "T7GpI",
          "text_height--33": "_ZVgY",
          "text_height--34": "YU4Bs",
          "text_height--35": "abpeQ",
          "text_height--36": "_6Rdfc",
          "text_height--37": "F6Iih",
          "text_height--38": "x21Z5",
          "text_height--39": "mLGEi",
          "text_height--40": "hkGei",
          "text_height--41": "p6FSq",
          "text_height--42": "ICvRf",
          "text_height--43": "cGO8u",
          "text_height--44": "bRc99",
          "text_height--45": "FL9aA",
          "text_height--46": "ubCzx",
          "text_height--47": "zUDAb",
          "text_height--48": "BL_vJ",
          "text_height--49": "dlKQn",
          "text_height--50": "AyGjM",
          "text_height--51": "hjVFU",
          "text_height--52": "CMk9R",
          "text_height--53": "nnEy6",
          "text_height--54": "L7OZv",
          "text_height--55": "AAovE",
          "text_height--56": "Xntpu",
          "text_height--57": "S9y3Z",
          "text_height--58": "tJsSl",
          "text_height--59": "YrH9x",
          "text_height--60": "qCtcq",
          "text_size--8": "M4WKE",
          "text_size--10": "ups0y",
          "text_size--12": "lzj4e",
          "text_size--14": "NG1nx",
          "text_size--16": "kC_2b",
          "text_size--18": "ExloS",
          "text_size--20": "UDl8b",
          "text_size--22": "PyENy",
          "text_size--24": "vendc",
          "text_size--26": "AeWfv",
          "text_size--28": "ZfdQu",
          "text_size--30": "kdLyW",
          "text_size--32": "Xi_bF",
          "text_size--34": "RFWoL",
          "text_size--36": "ECinW",
          "text_size--38": "tAblf",
          "text_size--40": "LGJqY",
          "text_size--42": "AF6MN",
          "text_size--44": "BEoRV",
          "text_size--46": "KPYUH",
          "text_size--48": "KIg0e",
          "text_transform--uppercase": "r1MiO",
          "text_transform--lowercase": "mas9L",
          text_line: "jhfPf",
          text_through: "dSlxk",
          "text_gap--2": "RBoYX",
          "text_gap--3": "_iiMK",
          "text_gap--4": "Difyv",
          "text_gap--5": "Zp4ej",
          "text_gap--6": "ZZoc_",
          "text_gap--7": "ZWkX0",
          "text_gap--8": "oW3zZ",
          "text_gap--9": "AUiCX",
          "text_gap--10": "NqnqV",
          "text_gap--11": "kCAdd",
          "text_gap--12": "cf_lT",
          "text_gap--13": "aYygh",
          "text_gap--14": "L_piv",
          "text_gap--15": "JBYDo",
          "text_gap--16": "D3J59",
          "text_gap--17": "V3a16",
          "text_gap--18": "XcK4K",
          "text_gap--19": "VIB_n",
          "text_gap--20": "kQsrN",
          "text_gap--21": "tqjMQ",
          "text_gap--22": "PvHpd",
          "text_gap--23": "OpLrT",
          "text_gap--24": "O4h0i",
          "text_gap--25": "yNBxB",
          "text_gap--26": "hzq4R",
          "text_gap--27": "aRVL7",
          "text_gap--28": "wDDbL",
          "text_gap--29": "w8Hi2",
          "text_gap--30": "syDGt",
          "text_gap--31": "omx5c",
          "text_gap--32": "iaHFm",
          "text_gap--33": "GdSoX",
          "text_gap--34": "oo8Mx",
          "text_gap--35": "YBFJa",
          "text_gap--36": "_eMpt",
          "text_gap--37": "Rg5NR",
          "text_gap--38": "ru1p5",
          "text_gap--39": "nkU0E",
          "text_gap--40": "vUvTj",
          "text_gap--41": "Qq4TW",
          "text_gap--42": "ReRt5",
          "text_gap--43": "F2oCt",
          "text_gap--44": "yPdgJ",
          "text_gap--45": "WCiMy",
          "text_gap--46": "GCxYU",
          "text_gap--47": "d_2Ek",
          "text_gap--48": "eA091",
        };
      },
      8717: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { ai: "b3JAa", ai_cursor: "X17gb", ai_flicker: "pp1MY", "cursor-flicker": "unPdf" };
      },
      17175: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { time: "yWdji", "time--hover": "nY9mM", "time--press": "ile75", "time--hidden": "zgV8I" };
      },
      62488: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { tool: "MExY2", "tool_size--mc": "hkJTK", "tool_size--sm": "Aw3kU", tool_wrapper: "Lcio3", "tool_wrapper--mc": "iUMEc", "tool_wrapper--sm": "IzrEu", "tool--default-050": "tT2g6", "tool--default-075": "GJE1_", "tool--active": "oxs7v", "tool--disabled": "ioY8y", tool_spot: "xRNiZ" };
      },
      52571: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { tooltip: "Aq1QX", "tooltip--hidden": "biCHA", tooltip_context: "Oiyr1", "tooltip_context--delay": "JycMw", "tooltip_skin--default-100": "_kRMW", "tooltip_skin--orange": "BIuUg", "tooltip_skin--green": "yF2gg", tooltip_multiline: "pJiLu", tooltip_icon: "zQFkc", "tooltip_icon--left": "iYhcH", "tooltip_icon--right": "aHbud" };
      },
      82423: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { header: "WjNA_", "header_size--46": "R_wRO", "header_size--52": "yE90D", "header_align--xl": "ijOU9", "header_align--xr": "KE6Ol", "header_align--xc": "yDX8T", "header_align--xb": "TLIkq", header_title: "u5lDT", header_wrap: "fx2K3", header_icon: "mZCnI" };
      },
      69513: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { wrap: "yZau5", wrap_span: "eGMc_", wrap_pre: "_8g1S", wrap_b: "NN6VT", wrap_i: "f4lAD", wrap_u: "k2yHC", wrap_a: "t_rfl" };
      },
      17371: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { ai: "Ycdmx", ai_head: "zAbfw", ai_suggest: "JoMPD", "ai_suggest--disabled": "adEsV" };
      },
      75759: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { icon: "MfDFH", icon_spin: "ZLJEc" };
      },
      55190: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { sidebar: "fDqxP", sidebar_lock: "iAldW", sidebar_panel: "vqshJ", "sidebar_site--open": "qpXEZ", "sidebar_site--close": "qlUll", "sidebar_tab--open": "WLVVP", "sidebar_tab--close": "tgX2O", sidebar_cursor: "bZ4Tt", "sidebar_cursor--dragging": "HVslS", "sidebar_cursor--resize": "jkQwd", "sidebar_cursor--resize-top": "bbW4M", "sidebar_cursor--resize-bottom": "rHmhz", "sidebar_widget--transition": "eiyGk", "sidebar_widget--open": "hKjj4", "sidebar_widget--close": "YekxT", sidebar_resize: "LtROu", "sidebar_resize--top": "gXvbS", "sidebar_resize--bottom": "gQIpc", sidebar_tool: "KPOWu", sidebar_wrapper: "aRBPm", "sidebar_wrapper--panel": "mWyfv", "sidebar_wrapper--site-open": "LGKCD", "sidebar_wrapper--site-close": "T1ccU", "sidebar_wrapper--tab-open": "j7aow", "sidebar_wrapper--tab-close": "pWNP8", sidebar_over: "JWNx3" };
      },
      30937: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { panel: "kX7bL", "panel--grab": "AtzOK", "panel--hover": "KgxPE", panel_drag: "HkN10", panel_wrapper: "N8e0P", "panel_wrapper--plus": "uqd_6", panel_tool: "NXv85" };
      },
      10376: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { tools_tool: "R0SQc", tools_badge: "oEblh", tools_collapse: "t726S", tools_explore: "F8gc8" };
      },
      20268: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { widget: "_KCOT", "widget--radius": "TCGB6", widget_wrap: "fKDnM" };
      },
      91416: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { avatar: "wS48V", "avatar--border": "LQ2Po", avatar_text: "_njWh", avatar_img: "EjjLx", avatar_icon: "MuzSy" };
      },
      81211: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { desmos: "LEBY8", desmos_tabs: "bC0ib", desmos_body: "PRNJr", desmos_container: "K3m5p" };
      },
      50706: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { apps: "NmVG_", "apps--bordered": "iWW2r" };
      },
      98720: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { event: "XukQ9", event_counter: "LRdWe", "event_counter--yes": "P0o0I", "event_counter--no": "kF9ci", "event_counter--maybe": "Z_mbe", "event_counter--wait": "_1raa", event_copy: "XrYOz", event_attach: "eQaH6" };
      },
      52604: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { modal: "BCuId", modal_container: "mxJRW", modal_wrap: "w5bww" };
      },
      87610: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { sync: "crZ0K" };
      },
      19204: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { wrap: "cGfAD", "wrap--disabled": "ixRu5", wrap_head: "f8B4v", wrap_foot: "KTTCx", wrap_app: "QD7yE", wrap_content: "AI1MX" };
      },
      23480: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { panel: "ePlcQ", panel_tabs: "OXqDz", panel_body: "TU3Gs", panel_container: "_1whAl" };
      },
      93361: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { drive: "QU3n_", drive_head: "ILihm", "drive_head--bordered": "xJ_BS", "drive_scroll-content": "o8kfS" };
      },
      24032: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { drive: "xvgOP", drive_spinner: "b6Q4A" };
      },
      76845: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { head_wrap: "pMwyv", "head_search-icon": "qy0ku", head_field: "tnwGV", "head_field--active": "uwzV3", head_controls: "Bx19Q", "head_control-add": "N_B5e", "head_add-list": "faBI1", "head--hidden": "ecat2" };
      },
      14692: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { drive: "zn3e3" };
      },
      70964: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { skeleton: "OUvnm", skeleton_block: "FN8FX" };
      },
      92689: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { settings: "KuB6F" };
      },
      92002: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { control: "i4T4e", control_icon: "NHDuy", "control_icon--base": "iLAxf", "control_icon--active": "yqQ3V", control_base: "eognD", control_active: "filCd" };
      },
      70289: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { section: "Y2fX0", section_icon: "bVwud" };
      },
      51694: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { img: "IIPbt" };
      },
      63111: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { section: "agIpZ", section_icon: "STgwq" };
      },
      40775: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { row: "BAn5F", row_content: "SoGfR", row_controls: "O4PDE", "row_controls--active": "VE3Cm", row_text: "LHoMT", "row--active": "V8JJ1", row_icon: "TsHGN", "row_icon-wrap": "ZUGyf", row_star: "JsM1Q" };
      },
      38415: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { section: "gSQWM", section_head: "VJ1wk", section_body: "CTYtt" };
      },
      99369: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { section: "Lx53W", section_icon: "LR5e5" };
      },
      32082: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { title: "zgXy2", title_back: "B0XGu", "title_back-icon": "L9iVG", title_content: "v_H9o", title_order: "qz9tx", "title_order-icon": "KFiJF", "title_order-icon--up": "S8XEX", "title_order-icon--down": "bHWor" };
      },
      24565: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { gmail_list: "LUnaR", "gmail_list--hidden": "pKYJc", gmail_action: "jD6aP" };
      },
      13081: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { view: "xiehd", "view--disabled": "Yf1N8", view_labels: "VQu0U", view_title: "zY2mA" };
      },
      64676: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { gmail: "TleH6", "gmail--disabled": "n6L7G", gmail_wrap: "ADrZQ", gmail_icon: "MFUFg" };
      },
      13688: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { "head--disabled": "qel2G" };
      },
      2858: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { head: "nxjNz", "head--disabled": "exiOZ", head_content: "ZSdWe" };
      },
      46662: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { "list--disabled": "BFYn1", list_spinner: "WF9Nk", list_item: "t0w5R" };
      },
      39212: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { modal: "VvCH_" };
      },
      26494: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { contextmenu_caret: "wZHI_", "contextmenu_caret--active": "sxOQG", contextmenu_radio: "YltkS", contextmenu_icon: "erw1q", contextmenu_colors: "tQ8yX", contextmenu_color: "dxwKJ", "contextmenu_color--active": "Qtge5" };
      },
      2129: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { history: "MpnLJ", history_search: "rb838", history_border: "iiEI6", history_body: "jNWUS", history_section: "r7RD2" };
      },
      19193: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { history_tile: "TipKv", history_remove: "eg03r" };
      },
      61056: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { icon: "Xf2VJ" };
      },
      65669: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { section: "QeR_r", section_column: "aZOQw" };
      },
      53420: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { launchpad: "bJc3k", launchpad_process: "LB1DX" };
      },
      1015: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { modal: "m2x6Q", modal_container: "ImAjp", modal_wrap: "j7xV9", modal_label: "hn0aw", modal_input: "Q29Mv", modal_tabs: "vnLlc", modal_tab: "qG4vD", "modal_tab--active": "JsZyD", modal_tile: "oQzmj", modal_title: "HRLZ7" };
      },
      73693: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { search: "tBfM2", "search--disabled": "eW9Zm", "search--enabled": "Mq4Ub", "search--bordered": "tGTlI", search_wrap: "SX9q6", search_controls: "hkfxq", "search_controls-group": "dYC4T", search_icon: "r_fux" };
      },
      99421: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { section_dropdown: "E2BxM", section_menu: "scNTZ" };
      },
      89225: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { settings: "nVVpG", settings_wrap: "XzWBA", settings_control: "viRfl", settings_mouse: "q38S0" };
      },
      58305: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { item_button: "XqBH7", item_row: "ppZl_", item_icon: "tBlRJ", item_arrow: "o_PBR", item_badge: "YWmec" };
      },
      39129: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { global_theme: "I79nW" };
      },
      78385: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { panel: "zntsI", panel_tabs: "y4SoP", panel_body: "Ktm0W", panel_container: "p6ROx" };
      },
      8570: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { link: "eO0wm", link_wrap: "_mHLB", link_icon: "T5awQ", link_outbound: "Mgqnn", "link_skin--transparent": "geAjb", "link_skin--gift": "RWHGa" };
      },
      57694: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { sync_content: "OYhsc", sync_body: "iCG70" };
      },
      81637: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { info: "elf3U", info_wrap: "Que1S", info_block: "rNrvG" };
      },
      93239: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { sync_logo: "M95UG" };
      },
      42058: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { sync_button: "zSjbt" };
      },
      15615: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { account: "lKn50", "account--show": "ViBZX", account_slide: "hFWaA", account_caret: "GduLM", account_field: "jI_6t", account_avatar: "HgCeo", account_icon: "mfUzQ", account_wrap: "VOI_T", account_cover: "Gw3rM", account_row: "V5ISw", account_overlay: "K6CVc", account_list: "zCNbG", account_shadow: "hFJDT" };
      },
      7516: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { frame: "kbteH", frame_view: "p0zA1" };
      },
      62685: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { view: "_wNra", view_wrap: "tuqU3", view_logo: "HzKc5", view_icon: "l_fwE", "view_icon--warn": "fLQWG", view_outbound: "Tbgqf" };
      },
      84929: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { header: "RyNBY", header_wrap: "oj13a", header_title: "m7mX5", header_dropdown: "PVrB4", "header_dropdown--enabled": "SDEGn", "header_dropdown--active": "EMFe3", header_caret: "OeB9T", "header_list-wrap": "r9D2W", header_list: "gKcdF", header_icon: "f3APp", header_controls: "XXfmt" };
      },
      79564: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { header: "HHB_e" };
      },
      55115: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { section: "qhwSs" };
      },
      99318: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { wrapper: "Wlv5U", wrapper_warn: "G8jF0", wrapper_body: "pTVu2", "wrapper_skin--default-003": "NMRwf", "wrapper_skin--base-100": "t7MZz" };
      },
      76365: (e, t, n) => {
        n.d(t, { Z: () => r });
        const r = { messages: "HZqco" };
      },
    },
    n = {};
  function r(e) {
    var o = n[e];
    if (void 0 !== o) return o.exports;
    var i = (n[e] = { exports: {} });
    return (t[e].call(i.exports, i, i.exports, r), i.exports);
  }
  ((r.m = t),
    (r.amdO = {}),
    (e = []),
    (r.O = (t, n, o, i) => {
      if (!n) {
        var s = 1 / 0;
        for (d = 0; d < e.length; d++) {
          for (var [n, o, i] = e[d], a = !0, c = 0; c < n.length; c++) (!1 & i || s >= i) && Object.keys(r.O).every((e) => r.O[e](n[c])) ? n.splice(c--, 1) : ((a = !1), i < s && (s = i));
          if (a) {
            e.splice(d--, 1);
            var l = o();
            void 0 !== l && (t = l);
          }
        }
        return t;
      }
      i = i || 0;
      for (var d = e.length; d > 0 && e[d - 1][2] > i; d--) e[d] = e[d - 1];
      e[d] = [n, o, i];
    }),
    (r.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return (r.d(t, { a: t }), t);
    }),
    (r.d = (e, t) => {
      for (var n in t) r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (r.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (r.r = (e) => {
      ("undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }));
    }),
    (r.j = 665),
    (() => {
      var e = { 665: 0 };
      r.O.j = (t) => 0 === e[t];
      var t = (t, n) => {
          var o,
            i,
            [s, a, c] = n,
            l = 0;
          if (s.some((t) => 0 !== e[t])) {
            for (o in a) r.o(a, o) && (r.m[o] = a[o]);
            if (c) var d = c(r);
          }
          for (t && t(n); l < s.length; l++) ((i = s[l]), r.o(e, i) && e[i] && e[i][0](), (e[i] = 0));
          return r.O(d);
        },
        n = (self.webpackChunkmanganum_ext = self.webpackChunkmanganum_ext || []);
      (n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n))));
    })());
  var o = r.O(void 0, [947, 423, 309, 956], () => r(30269));
  o = r.O(o);
})();
