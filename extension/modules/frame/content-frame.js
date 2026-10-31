(() => {
  var e,
    t = {
      3234: (e, t, r) => {
        "use strict";
        var n = r(31528),
          o = r.n(n);
        const a = "launchpad",
          i = "google-translator",
          s = "calendar",
          c = "games",
          u = "settings",
          l = "sync",
          d = "other",
          f = "history",
          h = "desmos",
          p = "drive",
          m = "gmail",
          g = "telegram",
          b = "whatsapp",
          v = "messengers",
          y = "youtube",
          w = "youtube-music",
          _ = "google-messages",
          S = "ms-copilot",
          k = "notes",
          E = "manganum-notes",
          x = "google-keep",
          T = "tasks",
          M = "todoist",
          O = "google-tasks",
          C = "gpt",
          A = "chat-gpt",
          D = "google-bard",
          I = "debug",
          P = "widget-focus",
          L = "widget-translate",
          j = "deepl.com",
          R = "todoist.com",
          N = "chatgpt.com",
          V = "web.whatsapp.com",
          F = "youtube.com",
          $ = "music.youtube.com",
          U = "ticktick.com",
          B = "messages.google.com",
          Y = "translate.google.com",
          H = "tasks.google.com",
          W = "keep.google.com",
          q = "gemini.google.com",
          G = "fourfunction",
          z = "scientific",
          K = "graphic",
          Q = "matrix",
          Z = {
            [U]: { regExp: /^https:\/\/ticktick.com/, src: "https://ticktick.com/webapp/", action: "tick-tick" },
            [Y]: { regExp: /^https:\/\/translate\.google\.com/, src: "https://translate.google.com?hl=en-US", action: "translator" },
            [H]: { regExp: /^https:\/\/tasks\.google\.com/, src: "https://tasks.google.com/embed/?origin=https%3A%2F%2Fmail.google.com", goTo: "https://calendar.google.com/calendar/r/tasks", action: O },
            [W]: { regExp: /^https:\/\/keep\.google\.com/, src: "https://keep.google.com", action: x },
            [q]: { regExp: /^https:\/\/gemini\.google\.com/, src: "https://gemini.google.com/app", action: D },
            [N]: { regExp: /^https:\/\/chatgpt\.com/, src: "https://chatgpt.com", action: A },
            [R]: { regExp: /^https:\/\/(app\.)?todoist\.com/, src: "https://app.todoist.com/app", action: M },
            [G]: { regExp: /desmos\.com\/fourfunction/, src: "https://www.desmos.com/fourfunction", action: h },
            [z]: { regExp: /desmos\.com\/matrix/, src: "https://www.desmos.com/matrix", action: h },
            [Q]: { regExp: /desmos\.com\/scientific/, src: "https://www.desmos.com/scientific", action: h },
            [K]: { regExp: /desmos\.com\/calculator/, src: "https://www.desmos.com/calculator", action: h },
            "web.telegram.org": { regExp: /web\.telegram\.org/, src: "https://web.telegram.org/k", action: g },
            [V]: { regExp: /web\.whatsapp\.com/, src: "https://web.whatsapp.com/", action: b },
            [$]: { regExp: /music\.youtube\.com/, src: "https://music.youtube.com/signin?next=https%3A%2F%2Fmusic.youtube.com%2F", action: w },
            [F]: { regExp: /(www\.)?youtube\.com/, src: "https://www.youtube.com/signin?next=%2F", action: y },
            [B]: { regExp: /messages\.google\.com/, src: "https://messages.google.com/web", action: _ },
            "copilot.microsoft.com": { regExp: /copilot\.microsoft\.com/, src: "https://copilot.microsoft.com", action: S },
            [j]: { regExp: /(www\.)?\.deepl\.com/, src: "https://www.deepl.com/translator", action: S },
          };
        var X = r(17563);
        const J = (e) => {
            try {
              for (let t in Z) {
                const r = ee(t);
                if (r && r.test(e)) return t;
              }
              return null;
            } catch (e) {
              return null;
            }
          },
          ee = (e) => o().get(Z, [e, "regExp"], null),
          te = (e, t, r) => {
            const n = e.querySelectorAll(t);
            if (n.length > 0) r(n);
            else {
              let n = 0,
                o = setInterval(() => {
                  const a = e.querySelectorAll(t);
                  (a.length > 0 && r(a), (a.length > 0 || n > 600) && clearInterval(o), n++);
                }, 1e3 / 60);
            }
          },
          re = (e, t) => {
            const r = e.querySelector(t);
            (r && r.focus(),
              setTimeout(() => {
                const r = e.querySelector(t);
                r && r.focus();
              }, 100));
          },
          ne = (e, t) => {
            (e.focus(), "select" in e && e.select(), document.execCommand("insertText", !1, t) || (e.value = t), e.dispatchEvent(new Event("change", { bubbles: !0 })));
          };
        var oe = r(89386),
          ae = r.n(oe),
          ie = r(30738),
          se = r.n(ie);
        function ce(e, t, r) {
          return (t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r), e);
        }
        class ue {
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
        function le(e, t, r) {
          return (t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r), e);
        }
        (ce(ue, "VISA_BASE", "base"), ce(ue, "VISA_AUTO", "auto"), ce(ue, "VISA_CUSTOM", "custom"), ce(ue, "TYPE_IMAGE", "image"), ce(ue, "TYPE_VIDEO", "video"), ce(ue, "TYPE_COLOR", "color"), ce(ue, "TYPE_PALLET", "palette"));
        class de {
          constructor(e) {
            ((this.id = o().get(e, ["id"], null)), (this.name = o().get(e, ["name"], null)), (this.i18n = o().get(e, ["i18n"], null)), (this.imageUrl = o().get(e, ["imageUrl"], null)), (this.contextTypes = o().get(e, ["contextTypes"], [])));
          }
          get icons() {
            const e = [],
              t = this.contextTypes;
            return ((t.includes(ue.TYPE_IMAGE) || t.includes(ue.TYPE_COLOR) || t.includes(ue.TYPE_PALLET)) && e.push("photo"), t.includes(ue.TYPE_VIDEO) && e.push("video"), e);
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
            return e === de.PREFERENCE_ONLY_VIDEO && !this.contextTypes.includes(ue.TYPE_VIDEO);
          }
          coverTypes() {
            const e = [];
            return ((this.contextTypes.includes(ue.TYPE_IMAGE) || this.contextTypes.includes(ue.TYPE_COLOR) || this.contextTypes.includes(ue.TYPE_PALLET)) && e.push(de.TYPE_IMAGE), this.contextTypes.includes(ue.TYPE_VIDEO) && e.push(de.TYPE_VIDEO), e);
          }
        }
        function fe(e, t, r) {
          return (t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r), e);
        }
        (le(de, "PREFERENCE_NO_VIDEO", "no-video"), le(de, "PREFERENCE_WITH_VIDEO", "with-video"), le(de, "PREFERENCE_ONLY_VIDEO", "only-video"), le(de, "TYPE_IMAGE", "image"), le(de, "TYPE_VIDEO", "video"));
        class he {
          static isApiSupported() {
            return Boolean(chrome.storage);
          }
          static onChange(e, t, r) {
            chrome.storage.onChanged.addListener((n, a) => {
              if (a === t && e in n) {
                const t = o().get(n, [e, "newValue"]),
                  a = o().get(n, [e, "oldValue"]);
                r(t, a);
              }
            });
          }
          static onFullChange(e, t) {
            chrome.storage.onChanged.addListener((r, n) => {
              n === e && t(r);
            });
          }
          static getAllLocal() {
            return new Promise((e, t) => {
              try {
                chrome.storage.local.get((r) => {
                  try {
                    e(r || {});
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
            return new Promise((r, n) => {
              try {
                chrome.storage.local.get([e], (n) => {
                  const a = o().get(n, [e], t);
                  r(a);
                });
              } catch (e) {
                n(e);
              }
            });
          }
          static setLocal(e, t) {
            return new Promise((r) => {
              chrome.storage.local.set({ [e]: t }, r);
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
                chrome.storage.sync.get((r) => {
                  try {
                    e(r || {});
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
            return new Promise((r, n) => {
              try {
                chrome.storage.sync.get([e], (n) => {
                  const a = o().get(n, [e], t);
                  r(a);
                });
              } catch (e) {
                n(e);
              }
            });
          }
          static setSync(e, t) {
            return new Promise((r) => {
              chrome.storage.sync.set({ [e]: t }, r);
            });
          }
          static removeSync(e) {
            return new Promise((t) => {
              chrome.storage.sync.remove(e, t);
            });
          }
        }
        (fe(he, "AREA_LOCAL", "local"), fe(he, "AREA_SYNC", "sync"));
        var pe = r(27484),
          me = r.n(pe),
          ge = (r(25054), r(7124)),
          be = r.n(ge),
          ve = r(66607),
          ye = r.n(ve),
          we = r(79212),
          _e = r.n(we),
          Se = r(37412),
          ke = r.n(Se),
          Ee = r(28734),
          xe = r.n(Ee),
          Te = r(10285),
          Me = r.n(Te);
        (me().extend(be()), me().extend(ye()), me().extend(_e()), me().extend(ke()), me().extend(xe()), me().extend(Me()));
        class Oe {
          constructor(e, t, r, n) {
            this._d = me()(Oe.wrap(e), t, r, n);
          }
          static wrap(e) {
            return e instanceof Oe ? e._d : e;
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
            return this._d.isSame(Oe.wrap(e), t);
          }
          isSameOrBefore(e, t) {
            return this._d.isSameOrBefore(Oe.wrap(e), t);
          }
          isSameOrAfter(e, t) {
            return this._d.isSameOrAfter(Oe.wrap(e), t);
          }
          isBefore(e, t) {
            return this._d.isBefore(Oe.wrap(e), t);
          }
          isToday() {
            return this._d.isToday();
          }
          isAfter(e, t) {
            return this._d.isAfter(Oe.wrap(e), t);
          }
          isBetween(e, t, r, n) {
            return this._d.isBetween(Oe.wrap(e), Oe.wrap(t), r, n);
          }
          startOf(e) {
            return ((this._d = this._d.startOf(e)), this);
          }
          endOf(e) {
            return ((this._d = this._d.endOf(e)), this);
          }
          diff(e, t, r) {
            return this._d.diff(Oe.wrap(e), t, r);
          }
          clone() {
            return new Oe(this._d.clone());
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
        function Ce(e, t) {
          var r = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            (t &&
              (n = n.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              r.push.apply(r, n));
          }
          return r;
        }
        function Ae(e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? Ce(Object(r), !0).forEach(function (t) {
                  De(e, t, r[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
                : Ce(Object(r)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                  });
          }
          return e;
        }
        function De(e, t, r) {
          return (t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r), e);
        }
        const Ie = Ae(Ae({}, { formatDDM: "ddd, MMM D", formatDDMY: "ddd, MMM D YYYY", formatDM: "MMM D", formatDMY: "MMM D, YYYY", formatInput: "MM.DD.YYYY" }), { formatHM: "h:mm", formatHMA: "h:mma" }),
          Pe = (Ae(Ae({}, { formatDDM: "ddd, D MMM", formatDDMY: "ddd, D MMM YYYY", formatDM: "D MMM", formatDMY: "D MMM, YYYY", formatInput: "DD.MM.YYYY" }), { formatHM: "HH:mm", formatHMA: "HH:mm" }), (e, t = "YYYY-MM-DD") => new Oe(e).format(t)),
          Le = "en",
          je = ["en"];
        let Re = null;
        const Ne = () => {
          if (Re) return Re;
          if (chrome.i18n)
            try {
              const e = /^(?<language>[a-z]{2})/.exec(chrome.i18n.getUILanguage()),
                t = o().get(e, ["groups", "language"], Le);
              return ((Re = je.includes(t) ? t : Le), Re);
            } catch (e) {}
          return Le;
        };
        class Ve extends ue {
          constructor() {
            (super(), this.activate(!0).setId("10070").setCoverId("1").setVisa(ue.VISA_BASE).setType(ue.TYPE_VIDEO).setVideoOriginURL("/assets/images/context/10070-fhd.mp4").addDescription(Le, "Moraine Lake.").addCopyright(Le, "Video from our signature collection.").addExtraParam("videoTransition", 2e3).addExtraParam("videoStart", null).addExtraParam("videoEnd", null).setViewDate(Pe(new Date())));
          }
        }
        const Fe = "auto";
        class $e extends ue {
          constructor(e) {
            (super(e), this.setId("0").setCoverId("0").activate(!0).setVisa(ue.VISA_CUSTOM));
          }
        }
        var Ue, Be, Ye;
        function He(e, t) {
          var r = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            (t &&
              (n = n.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              r.push.apply(r, n));
          }
          return r;
        }
        function We(e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? He(Object(r), !0).forEach(function (t) {
                  qe(e, t, r[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
                : He(Object(r)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                  });
          }
          return e;
        }
        function qe(e, t, r) {
          return (t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r), e);
        }
        ((Ye = "custom"), (Be = "SLOT_NAME") in (Ue = $e) ? Object.defineProperty(Ue, Be, { value: Ye, enumerable: !0, configurable: !0, writable: !0 }) : (Ue[Be] = Ye));
        const Ge = "chrome",
          ze = "duckduckgo",
          Ke = "google",
          Qe = "ecosia",
          Ze = "neeva",
          Xe = "bing",
          Je = "web",
          et = "map",
          tt = "news",
          rt = "photo",
          nt = "video",
          ot = {};
        (We({}, ot), We({}, ot), We({}, ot), We({}, ot), We({}, ot));
        var at = r(81933);
        const it = (function (e) {
          let t = {};
          for (let r of e) for (const e of je) (e in t || (t[e] = {}), (t[e][r.locales] = { [r.message]: r[e] }));
          return t;
        })(r.n(at)());
        const st = (e, t) => {
          if (chrome.i18n)
            try {
              return chrome.i18n.getMessage(e, t);
            } catch (e) {}
          return o().get(it, [Ne(), e, "message"], null);
        };
        const ct = 900001,
          ut = 900002,
          lt = 900003,
          dt = (e, t) => {
            const r = X.stringifyUrl({ url: e, query: t });
            return chrome.runtime.getURL(r);
          };
        class ft {
          constructor() {
            this.items = [new de().setId(1).setName("nature").setI18n("collection_name_nature").setImageUrl(dt("/assets/images/cover/image-1.jpg")).addContextTypes(ue.TYPE_VIDEO).addContextTypes(ue.TYPE_IMAGE), new de().setId(2).setName("architecture").setI18n("collection_name_architecture").setImageUrl(dt("/assets/images/cover/image-2.jpg")).addContextTypes(ue.TYPE_IMAGE), new de().setId(3).setName("satellite").setI18n("collection_name_earth").setImageUrl(dt("/assets/images/cover/image-3.jpg")).addContextTypes(ue.TYPE_IMAGE), new de().setId(4).setName("art").setI18n("collection_name_art").setImageUrl(dt("/assets/images/cover/image-4.jpg")).addContextTypes(ue.TYPE_IMAGE), new de().setId(5).setName("colors").setI18n("collection_name_color").setImageUrl(dt("/assets/images/cover/image-5.jpg")).addContextTypes(ue.TYPE_PALLET), new de().setId(6).setName("visualisingai").setI18n("collection_name_ai").setImageUrl(dt("/assets/images/cover/image-6.jpg")).addContextTypes(ue.TYPE_IMAGE)];
          }
          map(e) {
            return this.items.map(e);
          }
          filter(e) {
            return this.items.filter(e);
          }
          get slots() {
            const e = [];
            for (const t of this.items) for (const r of t.contextTypes) e.push({ slotName: `${t.id}-${r}`, cover: t, contextType: r });
            return e;
          }
          getCover(e) {
            return this.items.find((t) => t.id === e) || null;
          }
        }
        !(function (e, t, r) {
          t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r);
        })(ft, "DEFAULT_SELECTED", ["1", "2", "3", "4"]);
        const ht = { randomUUID: "undefined" != typeof crypto && crypto.randomUUID && crypto.randomUUID.bind(crypto) };
        let pt;
        const mt = new Uint8Array(16);
        function gt() {
          if (!pt && ((pt = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)), !pt)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
          return pt(mt);
        }
        const bt = [];
        for (let e = 0; e < 256; ++e) bt.push((e + 256).toString(16).slice(1));
        function vt(e, t = 0) {
          return (bt[e[t + 0]] + bt[e[t + 1]] + bt[e[t + 2]] + bt[e[t + 3]] + "-" + bt[e[t + 4]] + bt[e[t + 5]] + "-" + bt[e[t + 6]] + bt[e[t + 7]] + "-" + bt[e[t + 8]] + bt[e[t + 9]] + "-" + bt[e[t + 10]] + bt[e[t + 11]] + bt[e[t + 12]] + bt[e[t + 13]] + bt[e[t + 14]] + bt[e[t + 15]]).toLowerCase();
        }
        const yt = function (e, t, r) {
          if (ht.randomUUID && !t && !e) return ht.randomUUID();
          const n = (e = e || {}).random || (e.rng || gt)();
          if (((n[6] = (15 & n[6]) | 64), (n[8] = (63 & n[8]) | 128), t)) {
            r = r || 0;
            for (let e = 0; e < 16; ++e) t[r + e] = n[e];
            return t;
          }
          return vt(n);
        };
        function wt(e, t, r) {
          return (t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r), e);
        }
        class _t {
          constructor(e, t) {
            ((this.id = yt()), (this.action = e), (this.icon = t), (this.type = _t.TYPE_COMPONENT), (this.hintI18n = null), (this.titleI18n = null), (this.extra = {}), (this.keepAlive = !1), (this.pin = { site: !1, ntp: !1 }), (this.resize = { minWidth: 360, maxWidth: 360 }), (this.children = []));
          }
          setResize(e) {
            return ((this.resize.minWidth = o().get(e, ["minWidth"], 360)), (this.resize.maxWidth = o().get(e, ["maxWidth"], 360)), (this.resize.adviseMinWidth = o().get(e, ["adviseMinWidth"], 360)), this);
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
        (wt(_t, "TYPE_LINK", "link"), wt(_t, "TYPE_COMPONENT", "component"));
        (new _t(a, "launchpad").setHint("side_bar_tool_launchpad").setTitle("side_bar_tool_launchpad"),
          new _t(i, "translate")
            .setResize({ maxWidth: 1 / 0 })
            .setHint("side_bar_tool_google_translate")
            .setTitle("side_bar_tool_google_translate")
            .alive(!0),
          new _t(f, "tabs").setHint("side_bar_tool_history").setTitle("side_bar_tool_history"),
          new _t(s, "calendar").setHint("side_bar_tool_calendar").setTitle("side_bar_tool_calendar"),
          new _t(T, "tasks")
            .setHint("side_bar_tool_tasks")
            .setTitle("side_bar_tool_tasks")
            .addChild(new _t(O, "google-tasks").setHint("side_bar_tool_google_tasks").setTitle("side_bar_tool_google_tasks").alive(!0))
            .addChild(
              new _t(M, "todoist")
                .setHint("side_bar_tool_todoits")
                .setTitle("side_bar_tool_todoits")
                .setResize({ maxWidth: 1 / 0 })
                .alive(!0),
            ),
          new _t(k, "notes")
            .setHint("side_bar_tool_notes")
            .setTitle("side_bar_tool_notes")
            .addChild(
              new _t(x, "google-keep")
                .setResize({ maxWidth: 1 / 0 })
                .setHint("side_bar_tool_google_keep")
                .setTitle("side_bar_tool_google_keep")
                .alive(!0),
            )
            .addChild(new _t(E, "notes").setHint("side_bar_tool_manganum_notes").setTitle("side_bar_tool_manganum_notes")),
          new _t(_, "google-messages")
            .setHint("side_bar_tool_google_messages")
            .setTitle("side_bar_tool_google_messages")
            .setResize({ maxWidth: 1 / 0 })
            .pinFromSite()
            .pinFromNtp()
            .alive(!0),
          new _t(C, "gpt")
            .setHint("side_bar_tool_gpt")
            .setTitle("side_bar_tool_gpt")
            .pinFromSite()
            .addChild(
              new _t(A, "gpt")
                .setResize({ maxWidth: 1 / 0 })
                .setHint("side_bar_tool_gpt")
                .setTitle("side_bar_tool_gpt")
                .pinFromSite()
                .alive(!0),
            )
            .addChild(
              new _t(D, "google-gemini")
                .setHint("side_bar_tool_gemini")
                .setTitle("side_bar_tool_gemini")
                .setResize({ maxWidth: 1 / 0 })
                .pinFromSite()
                .alive(!0),
            ),
          new _t(h, "calculator").setHint("side_bar_tool_desmos").setTitle("side_bar_tool_desmos").alive(!0),
          new _t(p, "google-drive").setHint("side_bar_tool_drive").setTitle("side_bar_tool_drive").alive(!0),
          new _t(m, "mail").setHint("side_bar_tool_gmail").setTitle("side_bar_tool_gmail").alive(!0),
          new _t(d, "arrow-wide-down").setHint("side_bar_tool_other_show").setTitle("side_bar_tool_other_show").setExtraParams({ divider: !0 }),
          new _t(c, "games").setHint("side_bar_tool_games").setTitle("side_bar_tool_games"),
          new _t(v, "sms")
            .setHint("side_bar_tool_messengers")
            .setTitle("side_bar_tool_messengers")
            .pinFromSite()
            .pinFromNtp()
            .addChild(
              new _t(b, "whatsapp")
                .setResize({ maxWidth: 1 / 0, adviseMinWidth: 800 })
                .setHint("side_bar_tool_whatsapp")
                .setTitle("side_bar_tool_whatsapp")
                .pinFromSite()
                .pinFromNtp()
                .alive(!0),
            )
            .addChild(
              new _t(g, "telegram")
                .setResize({ maxWidth: 1 / 0 })
                .setHint("side_bar_tool_telegram")
                .setTitle("side_bar_tool_telegram")
                .pinFromSite()
                .pinFromNtp()
                .alive(!0),
            ),
          new _t(w, "youtube-music")
            .setHint("side_bar_tool_youtube_music")
            .setTitle("side_bar_tool_youtube_music")
            .setResize({ maxWidth: 1 / 0 })
            .pinFromSite()
            .pinFromNtp()
            .alive(!0),
          new _t(y, "youtube")
            .setHint("side_bar_tool_youtube")
            .setTitle("side_bar_tool_youtube")
            .setResize({ maxWidth: 1 / 0 })
            .pinFromSite()
            .pinFromNtp()
            .alive(!0));
        const St = { [T]: O, [k]: E, [C]: A, [v]: b },
          kt = { [a]: 0, [m]: 1, [s]: 2, [T]: 3, [k]: 4, [C]: 5, [i]: 6, [y]: 7, [w]: 8, [v]: 9, [_]: 10, [f]: 11, [d]: 12, [p]: 13, [h]: 14, [c]: 15 };
        (new _t("pin", "pin-outline").setHint("side_bar_tool_pin").setTitle("side_bar_tool_pin"), new _t(u, "settings").setHint("side_bar_tool_settings").setTitle("side_bar_tool_settings"), new _t(l, "account-small").setHint("side_bar_tool_sync").setTitle("side_bar_tool_sync"), new _t(I, "debug").setHint("side_bar_tool_debug").setTitle("side_bar_tool_debug"));
        function Et(e, t, r) {
          return (t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r), e);
        }
        class xt {
          constructor(e, t = null, r = null) {
            var n;
            ((this.name = e), (this.time = null === (n = t) ? n : Number(String(n).replace(/\s/, ""))), (this.extra = {}), (this.timingFunction = r));
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
        (Et(xt, "ANIM_LOAD", "load"), Et(xt, "ANIM_SHOW", "show"), Et(xt, "ANIM_HIDE", "hide"), Et(xt, "ANIM_REPLAY", "replay"), Et(xt, "ANIM_CHANGE", "change"), Et(xt, "ANIM_SLIDE", "slide"), Et(xt, "ANIM_SWITCH", "switch"));
        const Tt = "setup",
          Mt = "brows_setup",
          Ot = "side-panel",
          Ct = "sidebar-tool";
        function At(e, t) {
          var r = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            (t &&
              (n = n.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              r.push.apply(r, n));
          }
          return r;
        }
        function Dt(e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? At(Object(r), !0).forEach(function (t) {
                  It(e, t, r[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
                : At(Object(r)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                  });
          }
          return e;
        }
        function It(e, t, r) {
          return (t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r), e);
        }
        const Pt = new Ve(),
          Lt = new $e(),
          jt = Pe(new Date()),
          Rt = {
            api: { url: "https://api.manganum.app", socketUrl: "ws://socket.manganum.app", aiURL: "https://ai.manganum.app" },
            firestore: { url: "https://us-central1-manganum-app.cloudfunctions.net" },
            chrome: { accounts: [], activeIds: {} },
            frames: { tabs: {}, desmos: { active: G } },
            focusTime: { enabled: !1, completed: !0, soundVolume: 0.25, timestamp: null, ruleIds: [lt, ut, ct] },
            sidebar: { behavior: "auto", ahead: a, topOrders: kt, opened: !1, activeChildTools: Dt({}, St), tabs: {} },
            sidePanel: {},
            messages: [],
            activity: { timeOpen: { launchpad: null, translate: null, calendar: null, tasks: null, notes: null, debug: null, more: null, sms: null }, timePing: { launchpad: null, translate: null, calendar: null, tasks: null, notes: null, debug: null, more: null, sms: null } },
            extension: { os: null, platform: null, installId: null, installTime: null, installVersion: null, currentVersion: null, updateTime: null, browser: null, browserLang: null, browserVersion: null, displaySize: null },
            utm: {},
            settings: Dt({ theme: null, useSystemTheme: !0 }, Ie),
            panel: { pinned: !1 },
            identity: {
              windows: [],
              userInfo: {},
              features: [],
              account: new (class {
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
              })(),
              provider: { timestamp: null, enabled: !1 },
            },
            widgets: { time: { enabled: !0 }, weather: { enabled: !0, errorCode: null, tempFormat: null, isDay: !0, tempC: null, tempF: null, iconName: null, iconText: null, iconCode: null, lastUpdateTime: null }, location: { source: Fe, country: null, countryCode: null, district: null, lat: null, lon: null }, motivation: { enabled: !0, activeItemKey: 1 }, affirmation: { id: null, text: null, viewDate: null, isKing: !1, excluded: [], viewed: [] }, quote: { author: "Someone wise", excluded: [], id: 12, isKing: !1, text: "A beautiful thing is never perfect.", viewDate: jt, viewed: [12] }, focus: { text: null, subText: null, finished: !1 }, lifeTimer: { date: null, type: null } },
            launchpad: {
              remove: null,
              visited: [],
              favorite: [
                { id: 1, img: "youtube", title: "YouTube", url: "https://www.youtube.com/" },
                { id: 2, img: "facebook", title: "Facebook", url: "https://facebook.com/" },
                { id: 3, img: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/feed" },
                { id: 4, img: "amazon", title: "Amazon", url: "https://www.amazon.com/" },
              ],
              bookmarks: [],
              bookmarksOpen: {},
              recentDocs: [],
              chromeTools: [
                { id: 1, icon: "incognito", title: st("icon_chrome_item_incognito"), action: "incognito" },
                { id: 2, icon: "window", title: st("icon_chrome_item_window"), action: "window" },
                { id: 3, icon: "history", title: st("icon_chrome_item_history"), url: "chrome://history", action: "history" },
                { id: 4, icon: "download", title: st("icon_chrome_item_downloads"), url: "chrome://downloads", action: "downloads" },
                { id: 5, icon: "delete", title: st("icon_chrome_item_clear"), url: "chrome://settings/clearBrowserData", action: "clear" },
              ],
              googleWorkspace: [
                { id: 1, img: "gmail", title: st("icon_google_item_gmail"), url: "https://mail.google.com/mail/" },
                { id: 2, img: "drive", title: st("icon_google_item_drive"), url: "https://drive.google.com/" },
                { id: 3, img: "calendar", title: st("icon_google_item_calendar"), url: "https://calendar.google.com/calendar/" },
                { id: 4, img: "meet", title: st("icon_google_item_meet"), url: "https://meet.new/" },
                { id: 5, img: "account", title: st("icon_google_item_account"), url: "https://myaccount.google.com/" },
              ],
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
            gmail: { process: !1, inboxId: -1, syncTimestamp: null, labels: [] },
            tasks: { changeTimestamp: null, refreshTimestamp: null, showCompleted: !0, activeListId: null, activeTaskId: null, process: !1, items: {}, list: [] },
            notes: { items: [], activeNoteId: null, syncTimestamp: null, changeTimestamp: null },
            sms: { installs: {}, messages: [], viewedIds: [], disconnectIds: [], syncTimestamp: null, showPulse: !0, showBadge: !0, process: !1 },
            history: { recent: [] },
            contextRaw: { [Ve.getSlotName(Pt)]: { loaded: [Pt.id] } },
            contextActive: null,
            contextCover: { [Ve.getSlotName(Pt)]: Pt, [$e.SLOT_NAME]: Lt },
            contextSettings: { enabledAutoUpdate: !0, isProcess: !1, isEmpty: !1, isKing: !1, filters: { coverIds: ft.DEFAULT_SELECTED, preference: de.PREFERENCE_WITH_VIDEO }, excluded: {}, animations: { [xt.ANIM_LOAD]: new xt(xt.ANIM_LOAD, 500, "ease-in"), [xt.ANIM_SHOW]: new xt(xt.ANIM_SHOW, 500, "ease-in"), [xt.ANIM_HIDE]: new xt(xt.ANIM_HIDE, 500, "ease-out"), [xt.ANIM_SLIDE]: new xt(xt.ANIM_SLIDE, 750, "cubic-bezier(0.45, 0.05, 0.55, 0.95)"), [xt.ANIM_REPLAY]: new xt(xt.ANIM_REPLAY, 2e3, "linear").addExtraParam("videoStart", null).addExtraParam("videoEnd", null), [xt.ANIM_CHANGE]: new xt(xt.ANIM_CHANGE, 750, "cubic-bezier(0.45, 0.05, 0.55, 0.95)"), [xt.ANIM_SWITCH]: new xt(xt.ANIM_SWITCH, 2e3, "ease-in-out") } },
            onboarding: { [Tt]: { step: 1, enabled: !1, sidebar: !0, settings: !0 }, [Mt]: { step: 1 }, [Ot]: { window: !0 }, [Ct]: {} },
            news: { timestampView: null },
            site: { searchAI: { enabled: !0 } },
            search: { autofocus: !1, autoSwitch: !1, engineName: Ke },
            plus: { trialTimestamp: Date.now(), subscriptions: [], hideWarning: !1 },
            prices: [
              { id: "price_1PlTkDCHvjzLO1pJweydQwKW", isBest: !1, isTrial: !0, name: "1-year plan", text: "$8.33 per month", title: "LIMITED WELCOME OFFER: 60% OFF", label: null, interval: "trial", price: { sum: 99.99, perMonth: 8.33, save: 140, fullSum: 240 } },
              { id: "price_1PloiWCHvjzLO1pJbIQ8qXzp", isBest: !1, isTrial: !1, name: "1-month plan", text: "$20 per month", title: "1-month plan", label: null, interval: "month", price: { sum: 20, perMonth: 20, save: 0, fullSum: 20 } },
              { id: "price_1PlTyJCHvjzLO1pJotVxzDyA", isBest: !1, isTrial: !1, name: "1-year plan", text: "$10 per month", title: "1-year plan — 50% OFF, save $120", label: null, interval: "year", price: { sum: 119.99, perMonth: 10, save: 120, fullSum: 240 } },
              { id: "price_1PlU3iCHvjzLO1pJOxVUa9Gv", isBest: !0, isTrial: !1, name: "2-year plan", text: "$8.33 per month", title: "2-year plan — 60% OFF, save $280", label: "Best deal", interval: "year_2", price: { sum: 199.99, perMonth: 8.33, save: 280, fullSum: 480 } },
            ].filter((e) => !e.isTrial),
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
          Nt = async (e, t = [], r = null) => {
            const n = await he.getLocal(e),
              a = o().get(n, t);
            if (null != a) return a;
            const i = Vt(e, Rt, n);
            return o().get(i, t, r);
          },
          Vt = (e, t, r) => {
            const n = o().get(t, [e], {});
            return Array.isArray(n) ? (null == r ? se()(n, !0) : r) : ae()(se()(n, !0), r);
          },
          Ft = async (e, t, r) => {
            if (0 === t.length) return await he.setLocal(e, r);
            const n = (await Nt(e)) || {};
            return (o().set(n, t.map(String), r), await he.setLocal(e, n));
          };
        class $t {
          constructor(e) {
            ((this.name = e), (this.port = null), (this.connections = []));
          }
          connect() {
            return ((this.port = chrome.runtime.connect({ name: this.name })), this);
          }
          sendMessage(e, t) {
            this.port && this.port.postMessage({ type: e, data: t });
          }
          sendMessageTo(e, t, r) {
            const n = o().get(e, ["id"], chrome.runtime.id),
              a = o().get(e, ["winId"]),
              i = o().get(e, ["tabId"]),
              s = o().get(e, ["frameId"]);
            for (const { key: e, port: o } of this.connections) {
              const c = this._parsePortKey(e);
              (s && c.frameId !== s) || (i && c.tabId !== i) || (a && c.winId !== a) || (n && c.id !== n) || o.postMessage({ type: t, data: r });
            }
          }
          listen(e, t) {
            this.port.onMessage.addListener((r, ...n) => {
              r.type === e && t(r.data, n.sender);
            });
          }
          listenPort(e, t, r) {
            e.onMessage.addListener((e, ...n) => {
              e.type === t && r(e.data, n.sender);
            });
          }
          onConnect(e) {
            return (
              chrome.runtime.onConnect.addListener((t) => {
                t.name === this.name &&
                  (t.onDisconnect.addListener((e) => {
                    this._delConnection(e);
                  }),
                  this._addConnection(t),
                  e && e(t));
              }),
              this
            );
          }
          _getPortKey(e) {
            return `${o().get(e, ["sender", "id"], chrome.runtime.id)}:${o().get(e, ["sender", "tab", "windowId"], -1)}:${o().get(e, ["sender", "tab", "id"], -1)}:${o().get(e, ["sender", "frameId"], -1)}`;
          }
          _parsePortKey(e) {
            const t = e.split(":");
            return { id: t[0], winId: Number(t[1]), tabId: Number(t[2]), frameId: Number(t[3]) };
          }
          _addConnection(e) {
            const t = this._getPortKey(e);
            return (this.connections.push({ key: t, port: e }), this);
          }
          _delConnection(e) {
            const t = this._getPortKey(e),
              r = [];
            for (let e of this.connections) e.key !== t && r.push(e);
            return ((this.connections = r), this);
          }
        }
        function Ut(e, t) {
          var r = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            (t &&
              (n = n.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              r.push.apply(r, n));
          }
          return r;
        }
        function Bt(e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? Ut(Object(r), !0).forEach(function (t) {
                  Yt(e, t, r[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
                : Ut(Object(r)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                  });
          }
          return e;
        }
        function Yt(e, t, r) {
          return (t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r), e);
        }
        class Ht {
          static filter(e, t) {
            return Array.from(e || []).filter((e) => {
              for (let r in t) if (r in t && e[r] !== t[r]) return !1;
              return !0;
            });
          }
          static async getActiveTabs() {
            return new Promise((e) => {
              chrome.tabs ? chrome.tabs.query({ active: !0 }, e) : Zt.sendBackgroundMessage("api-tabs-active", {}, e);
            });
          }
          static async getActive(e = !0) {
            return new Promise((t) => {
              chrome.tabs
                ? chrome.tabs.query({ active: !0, currentWindow: e }, (e) => {
                    t(e.length ? e[0] : null);
                  })
                : Zt.sendBackgroundMessage("api-tab-active", {}, t);
            });
          }
          static async getCurrent() {
            return new Promise((e) => {
              if (chrome.tabs && chrome.tabs.getCurrent) return chrome.tabs.getCurrent(e);
              Zt.sendBackgroundMessage("api-tab-current", {}, e);
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
                : Zt.sendBackgroundMessage("api-tab", { tabId: e }, t);
            });
          }
          static async getTabs(e = {}) {
            return new Promise((t) => {
              chrome.tabs ? chrome.tabs.query(e, t) : Zt.sendBackgroundMessage("api-tabs", e, t);
            });
          }
          static async getZoom() {
            const { id: e } = await Ht.getActive();
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
            chrome.tabs ? chrome.tabs.remove(e, t) : Zt.sendBackgroundMessage("api-tab-remove", e, t);
          }
          static group(e, t = {}, r) {
            chrome.tabs ? chrome.tabs.group(Bt({ tabIds: e }, t), r) : Zt.sendBackgroundMessage("api-tab-group", { tabIds: e, options: t }, r);
          }
          static groupAsync(e, t = {}) {
            return chrome.tabs.group(Bt({ tabIds: e }, t));
          }
          static ungroup(e, t) {
            chrome.tabs ? chrome.tabs.ungroup(e, t) : Zt.sendBackgroundMessage("api-tab-ungroup", e, t);
          }
          static ungroupAsync(e) {
            return chrome.tabs.ungroup(e);
          }
          static openNewTab(e, t = {}, r) {
            const n = Bt({ url: e }, t);
            chrome.tabs ? chrome.tabs.create(n, r) : Zt.sendBackgroundMessage("api-tab-create", n, r);
          }
          static openUrlInActiveTab(e, t = {}, r) {
            const n = Bt({ url: e }, t);
            Ht.update(null, n, r);
          }
          static move(e, t = {}, r) {
            chrome.tabs ? chrome.tabs.move(e, t, r) : Zt.sendBackgroundMessage("api-tab-move", { tabId: e, moveProperties: t }, r);
          }
          static reload(e, t = {}, r) {
            chrome.tabs ? chrome.tabs.reload(e, t, r) : Zt.sendBackgroundMessage("api-tab-reload", { tabId: e, reloadProperties: t }, r);
          }
          static duplicate(e, t) {
            chrome.tabs ? chrome.tabs.duplicate(e, t) : Zt.sendBackgroundMessage("api-tab-duplicate", e, t);
          }
          static moveAsync(e, t = {}) {
            return chrome.tabs.move(e, t);
          }
          static update(e, t = {}, r) {
            chrome.tabs ? chrome.tabs.update(e, t, r) : Zt.sendBackgroundMessage("api-tab-update", { tabId: e, params: t }, r);
          }
          static registerBackgroundScripts() {
            (Zt.listenMessage("api-tab-create", (e, t, r) => {
              Ht.openNewTab(e.url, e, r);
            }),
              Zt.listenMessage("api-tab-group", (e, t, r) => {
                Ht.group(e.tabIds, e.options, r);
              }),
              Zt.listenMessage("api-tab-ungroup", (e, t, r) => {
                Ht.ungroup(e, r);
              }),
              Zt.listenMessage("api-tab-remove", (e, t, r) => {
                Ht.remove(e, r);
              }),
              Zt.listenMessage(
                "api-tab-current",
                async (e, t, r) => {
                  r(t.tab ? await Ht.getTab(t.tab.id) : void 0);
                },
                !0,
              ),
              Zt.listenMessage(
                "api-tab-active",
                async (e, t, r) => {
                  r(await Ht.getActive());
                },
                !0,
              ),
              Zt.listenMessage(
                "api-tabs-active",
                async (e, t, r) => {
                  r(await Ht.getActiveTabs());
                },
                !0,
              ),
              Zt.listenMessage("api-tab-update", ({ tabId: e, params: t }, r, n) => {
                Ht.update(e, t, n);
              }),
              Zt.listenMessage("api-tab-move", ({ tabId: e, moveProperties: t }, r, n) => {
                Ht.move(e, t, n);
              }),
              Zt.listenMessage("api-tab-reload", ({ tabId: e, reloadProperties: t }, r, n) => {
                Ht.reload(e, t, n);
              }),
              Zt.listenMessage("api-tab-duplicate", (e, t, r) => {
                Ht.duplicate(e, r);
              }),
              Zt.listenMessage(
                "api-tabs",
                async (e, t, r) => {
                  r(await Ht.getTabs(e));
                },
                !0,
              ),
              Zt.listenMessage(
                "api-tab",
                async ({ tabId: e }, t, r) => {
                  r(await Ht.getTab({ tabId: e }));
                },
                !0,
              ));
          }
        }
        function Wt(e, t) {
          var r = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            (t &&
              (n = n.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              r.push.apply(r, n));
          }
          return r;
        }
        function qt(e, t, r) {
          return (t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r), e);
        }
        class Gt {
          static onCreate(e, t = []) {
            chrome.windows.onCreated.addListener(e, { windowTypes: t });
          }
          static onRemoved(e, t = []) {
            chrome.windows.onRemoved.addListener(e, { windowTypes: t });
          }
          static openNewWindow(e, t = {}, r) {
            chrome.windows && chrome.windows.create
              ? chrome.windows.create(
                  (function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                      var r = null != arguments[t] ? arguments[t] : {};
                      t % 2
                        ? Wt(Object(r), !0).forEach(function (t) {
                            qt(e, t, r[t]);
                          })
                        : Object.getOwnPropertyDescriptors
                          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
                          : Wt(Object(r)).forEach(function (t) {
                              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                            });
                    }
                    return e;
                  })({ url: e }, t),
                  r,
                )
              : Zt.sendBackgroundMessage("api-window-create", { url: e, options: t }, r);
          }
          static async getCurrentWindow() {
            return chrome.windows && chrome.windows.getCurrent
              ? chrome.windows.getCurrent()
              : new Promise((e) => {
                  Zt.sendBackgroundMessage("api-window-current", {}, (t) => {
                    e(t);
                  });
                });
          }
          static async getWindows() {
            return chrome.windows && chrome.windows.getAll
              ? chrome.windows.getAll()
              : new Promise((e) => {
                  Zt.sendBackgroundMessage("api-window-all", {}, (t) => {
                    e(t);
                  });
                });
          }
          static async updateWindow(e, t = {}) {
            return new Promise((r) => {
              chrome.windows.update(e, t, () => {
                chrome.runtime.lastError ? r(!1) : r(!0);
              });
            });
          }
          static removeWindow(e, t) {
            chrome.windows.remove(e, () => {
              t(Boolean(chrome.runtime.lastError));
            });
          }
          static registerBackgroundScripts() {
            (Zt.listenMessage(
              "api-window-create",
              async ({ url: e, options: t }, r, n) => {
                await Gt.openNewWindow(e, t, n);
              },
              !0,
            ),
              Zt.listenMessage(
                "api-window-current",
                async (e, t, r) => {
                  r(await Gt.getCurrentWindow());
                },
                !0,
              ),
              Zt.listenMessage(
                "api-window-all",
                async (e, t, r) => {
                  r(await Gt.getWindows());
                },
                !0,
              ));
          }
        }
        class zt {
          static hasId() {
            return Boolean(chrome.runtime && chrome.runtime.id);
          }
          static getId() {
            return zt.hasId() ? chrome.runtime.id : null;
          }
        }
        function Kt(e, t) {
          var r = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            (t &&
              (n = n.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              r.push.apply(r, n));
          }
          return r;
        }
        function Qt(e, t, r) {
          return (t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r), e);
        }
        class Zt {
          static wrapEventType(e, t) {
            return `_${e}_:${t}`;
          }
          static async getPanelId(e) {
            if (e) return `panel:${e}`;
            return `panel:${(await Gt.getCurrentWindow()).id}`;
          }
          static async getSidebarId(e) {
            const t = o().get(e, ["id"]);
            return t ? String(t) : await Zt.getPanelId();
          }
          static sendBackgroundMessage(e, t, r) {
            zt.hasId() &&
              chrome.runtime.sendMessage({ type: e, data: t }, (...e) => {
                (chrome.runtime.lastError && !String(chrome.runtime.lastError.message).startsWith("The message port closed before a response was received")) || (r && r(...e));
              });
          }
          static listenMessage(e, t, r = !1) {
            const n = (n, o, a) => {
              if (n.type === e) return (t(n.data, o, a), r);
            };
            return (chrome.runtime.onMessage.addListener(n), n);
          }
          static async listenWindowMessage(e, t, r, n = !1) {
            t = Zt.wrapEventType(e, t);
            let o = await Ht.getCurrent();
            const a = (e, a, i) => {
              if (e.type === t) return e.tab || void 0 === o ? (r(e.data, a, i), n) : void 0;
            };
            return (chrome.runtime.onMessage.addListener(a), a);
          }
          static removeMessageListener(e) {
            e instanceof Promise
              ? Promise.all([e]).then((e) => {
                  chrome.runtime.onMessage.removeListener(e[0]);
                })
              : chrome.runtime.onMessage.removeListener(e);
          }
          static sendMessageToWindowTab(e, t, r, n) {
            e && e.id
              ? ((t = Zt.wrapEventType(e.windowId, t)), Zt.sendMessageTo(e.id, t, r, n, { tab: e }))
              : Gt.getCurrentWindow().then((e) => {
                  Zt.sendMessageToPanel(e.id, t, r, n);
                });
          }
          static sendMessageTo(e, t, r, n, o = {}) {
            zt.hasId() &&
              chrome.tabs.sendMessage(
                e,
                (function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2
                      ? Kt(Object(r), !0).forEach(function (t) {
                          Qt(e, t, r[t]);
                        })
                      : Object.getOwnPropertyDescriptors
                        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
                        : Kt(Object(r)).forEach(function (t) {
                            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                          });
                  }
                  return e;
                })({ type: t, data: r }, o),
                (...e) => {
                  const t = chrome.runtime.lastError;
                  if (!n) return;
                  if (!t) return n(...e);
                  const r = String(t.message);
                  (r.startsWith("The message port closed before a response was received") && !r.startsWith("Could not establish connection. Receiving end does not exist.")) || n(...e);
                },
              );
          }
          static sendMessageToPanel(e, t, r, n) {
            ((t = Zt.wrapEventType(e, t)), Zt.sendBackgroundMessage(t, r, n));
          }
          static sendMessageToPanels(e, t, r, n = []) {
            const o = n.map((e) => e.windowId);
            Gt.getWindows().then((n) => {
              for (let a of n) o.includes(a.id) || Zt.sendMessageToPanel(a.id, e, t, r);
            });
          }
          static sendMessageToTabs(e, t, r, n = []) {
            const o = n.map((e) => e.id);
            Ht.getTabs().then((n) => {
              for (let a of n || []) o.includes(a.id) || Zt.sendMessageToWindowTab(a, e, t, r);
            });
          }
          static sendMessageToAll(e, t, r) {
            (Ht.getTabs().then((n) => {
              for (let o of n || []) Zt.sendMessageTo(o.id, e, t, r);
            }),
              Zt.sendBackgroundMessage(e, t, r));
          }
        }
        var Xt = r(90159);
        const Jt = "dark",
          er = (e) => new Promise((t) => setTimeout(t, e));
        function tr(e, t) {
          var r = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            (t &&
              (n = n.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              r.push.apply(r, n));
          }
          return r;
        }
        function rr(e, t, r) {
          return (t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r), e);
        }
        async function nr(e, t) {
          const r = ["tabs", e, t],
            n = await Nt("frames", r, null);
          if (n) {
            const e = o().get(n, ["text"], "");
            te(document, '[contenteditable][aria-label^="Take a not"]', (t) => {
              ((t[0].innerText = e), t[0].dispatchEvent(new Event("input", { bubbles: !0 })));
            });
            const t = o().get(n, ["title"], "");
            (te(document, '[contenteditable][aria-label="Title"]', (e) => {
              ((e[0].innerText = t), e[0].dispatchEvent(new Event("input", { bubbles: !0 })));
            }),
              await Ft("frames", r, null));
          }
        }
        function or(e) {
          if (
            (function (e) {
              return String(e).startsWith("https://accounts.google.com/v3");
            })(e)
          )
            return (function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2
                  ? tr(Object(r), !0).forEach(function (t) {
                      rr(e, t, r[t]);
                    })
                  : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
                    : tr(Object(r)).forEach(function (t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                      });
              }
              return e;
            })(
              {},
              (function (e) {
                const t = new URL(e).searchParams.get("continue");
                return { src: t, isLoginPage: Boolean(t), widgetName: t ? J(t) : null };
              })(e),
            );
          const t = J(e);
          return { isLoginPage: ir(t, e), widgetName: t, src: e };
        }
        function ar(e) {
          if ((e.focus(), void 0 !== window.getSelection && void 0 !== document.createRange)) {
            const t = document.createRange();
            (t.selectNodeContents(e), t.collapse(!1));
            const r = window.getSelection();
            (r.removeAllRanges(), r.addRange(t));
          } else if (void 0 !== document.body.createTextRange) {
            const t = document.body.createTextRange();
            (t.moveToElementText(e), t.collapse(!1), t.select());
          }
        }
        function ir(e, t) {
          const r = ((e) => {
            try {
              return new URL(e).pathname;
            } catch (e) {
              return null;
            }
          })(t);
          switch (e) {
            case R:
            case N:
              return !0 === ["/auth/login"].includes(r);
            case B: {
              const e = /\/web(\/u\/\d{1,3})?\/conversations/;
              return !!r && !e.test(r);
            }
            case q: {
              const e = /\/app\/?/;
              return !!r && !e.test(r);
            }
            case U:
              return "/" === r;
          }
          return !1;
        }
        (async () => {
          if (window === top) return;
          if (1 !== location.ancestorOrigins.length) return;
          let e = or(location.href);
          if (!(t = e.widgetName) || !Object.keys(Z).includes(t)) return;
          var t;
          if (e.widgetName === B) (await er(2e3), (e = or(location.href)));
          const r = new $t("frame-child").connect();
          (!(function (e, { widgetName: t }) {
            switch (t) {
              case N:
                return void te(document, "body", () => {
                  document.body.addEventListener("keydown", (e) => {
                    if ("TEXTAREA" !== e.target.nodeName || e.shiftKey) return;
                    const t = e.target.nextElementSibling;
                    t && "BUTTON" === t.nodeName && 13 === e.which && e.target.value && (e.preventDefault(), t.click());
                  });
                });
              case B:
              case V: {
                const r = /\((?<value>\d{1,})\).+/,
                  n = document.head.querySelector("title");
                if (n) {
                  const a = r.exec(n.innerText),
                    i = o().get(a, ["groups", "value"]);
                  e.sendMessage("frame-badge", { widgetName: t, params: { unreadCount: i ? Number(i) : 0 } });
                  const s = new MutationObserver(() => {
                    const a = r.exec(n.innerText),
                      i = o().get(a, ["groups", "value"]);
                    e.sendMessage("frame-badge", { widgetName: t, params: { unreadCount: i ? Number(i) : 0 } });
                  });
                  s.observe(n, { characterData: !0, subtree: !0, characterDataOldValue: !0, childList: !0 });
                }
              }
            }
          })(r, e),
            (function ({ widgetName: e, isLoginPage: t }) {
              const r = document.createElement("style");
              let n = "";
              switch (e) {
                case R:
                  t && (n += "#todoist_app > div > div { min-width: unset !important; }");
                  break;
                case Y: {
                  ((n += "body { overflow-y: unset !important; }"), (n += "#gb, c-wiz[data-ogpc] > div:first-child > div:first-child:empty { display: none !important; }"), (n += 'div[aria-haspopup="dialog"][role="button"][tabindex="0"] { display: none !important; }'), (n += 'button[aria-label="Translate by voice"] { display: none !important; }'), (n += 'body:has(a[href^="https://accounts.google.com/ServiceLogin?"]) nav[aria-labelledby]:has([href^="./history"]) { display: none !important; }'));
                  const e = 'nav[aria-labelledby]:not(:has([href^="./history"])) > :nth-child(4) button';
                  ((n += `${e} { display: flex !important; }`),
                    te(document.documentElement, `${e} span`, (e) => {
                      e[0].innerText = "Docs";
                    }),
                    (n += 'div:has(> textarea) *, [aria-live="polite"] span { font-size: 18px !important; line-height: normal !important; }'));
                  break;
                }
                case W:
                  ((n += "#gb [data-ogsr-up] { display: none !important; }"), (n += '#ognwrapper [href^="?authuser="] { display: none !important; }'), (n += '\n        @media (max-width: 450px) {\n          /* Header burger */\n          #ognwrapper div[aria-expanded][role="button"] { display: none !important; }\n          /* Items */\n          .notes-container [style*="width: 344px"] { width: 332px !important; }\n          /* Sidebar */\n          .notes-container > div:nth-child(2) > div:first-child { display: none !important; }\n          /* Container items */\n          .notes-container [style*="height"] { display: flex !important; justify-content: center !important; }\n          /* Colors */\n          [aria-label^="Background options"]:has([role="listbox"]) {\n            left: -46px !important;\n            transform: scale(0.7);\n          }\n        }\n      '));
                  break;
                case q:
                  ((n += ".boqOnegoogleliteOgbOneGoogleBar { height: 48px; }"), (n += "#gb { display: none !important; }"), (n += "top-bar-actions { --offset: 0px !important; }"));
                  break;
                case F:
                  ((n += "#avatar-btn { display: none !important; }"), (n += "#buttons ytd-topbar-menu-button-renderer:has(#button) { display: none !important; }"));
                  break;
                case $:
                  ((n += "#right-content { display: none !important; }"), (n += "ytmusic-nav-bar .center-content .cast-button-center { display: none !important; }"));
                  break;
                case j:
                  ((n += '[data-testid="dl-cookieBanner"] { display: none !important; }'), (n += "header, footer { display: none !important; }"), (n += "#translation-modes-heading { display: none !important; }"), (n += "nav:has(#translation-modes-heading) > div > div:nth-child(1) { display: none !important; }"), (n += "main:has(#primary-heading-container) { padding: 0 !important; }"), (n += 'nav div>:has([id^="headlessui-tabs-panel"]) { margin: 0 !important; }'), (n += '[data-testid="translator"] > div:nth-child(n+2) { display: none !important; }'), (n += 'd-textarea[name="source"] { min-height: 240px !important; }'));
              }
              ((r.innerHTML = n), document.documentElement.appendChild(r));
            })(e));
          (await Nt("settings", ["theme"])) === Jt &&
            (function ({ widgetName: e }) {
              [Y, G, z, K, Q, H, j].includes(e) && (Xt.setFetchMethod(() => new Response("", { status: 200 })), Xt.isEnabled() || Xt.enable({ darkSchemeBackgroundColor: "#151B1E", darkSchemeTextColor: "rgba(255, 255, 255, 0.75)", brightness: 100, contrast: 100, sepia: 0 }));
            })(e);
          let n = !1 === e.isLoginPage;
          if ((r.sendMessage("frame-render", { widgetName: e.widgetName, showWidget: n }), !n)) return;
          const a = await Ht.getCurrent(),
            i = await Zt.getSidebarId(a),
            s = ["tabs", i, e.widgetName];
          switch (e.widgetName) {
            case Y: {
              const e = await Nt("frames", [...s, "selectionText"]);
              e &&
                (await Ft("frames", [...s, "selectionText"], null),
                te(document, "textarea", (t) => {
                  ne(t[0], e);
                }));
              break;
            }
            case j: {
              const e = await Nt("frames", [...s, "selectionText"]);
              if (e) {
                await Ft("frames", [...s, "selectionText"], null);
                const t = document.querySelector('d-textarea[name="source"] [contenteditable="true"]:first-child');
                ((t.innerText = e), t.dispatchEvent(new Event("input", { bubbles: !0 })), t.dispatchEvent(new Event("keyup", { bubbles: !0 })), ar(t));
              }
              break;
            }
            case W:
              await nr(i, e.widgetName);
          }
          switch (e.widgetName) {
            case Y:
            case j: {
              let t = location.href;
              (r.sendMessage("frame-src", { widgetName: e.widgetName, src: location.href }),
                setInterval(async () => {
                  t !== location.href && ((t = location.href), r.sendMessage("frame-src", { widgetName: e.widgetName, src: t }));
                }, 1e3));
            }
          }
          r.listen("frame-events", async (t) => {
            if (t.widgetName === e.widgetName)
              switch (t.widgetName) {
                case G:
                case z:
                case K:
                case Q:
                  if (t.triggerName === P) return void re(document, "textarea");
                  break;
                case Y:
                  if (t.triggerName === P) return void re(document, "textarea");
                  if (t.triggerName === L)
                    return void te(document, "textarea", (e) => {
                      ne(e[0], t.extra.value);
                    });
                  break;
                case j: {
                  const e = document.querySelector('d-textarea[name="source"] [contenteditable="true"]:first-child');
                  if (t.triggerName === P) return void ar(e);
                  if (t.triggerName === L) return ((e.innerText = t.extra.value), e.dispatchEvent(new Event("input", { bubbles: !0 })), e.dispatchEvent(new Event("keyup", { bubbles: !0 })), void ar(e));
                  break;
                }
                case W:
                  "notes-create" === t.triggerName && (await nr(i, e.widgetName));
              }
          });
        })();
      },
      30738: (e, t, r) => {
        "use strict";
        const n = r(63341),
          o = r(26401),
          a = r(55299);
        function i(e, t) {
          switch (o(e)) {
            case "object":
              return (function (e, t) {
                if ("function" == typeof t) return t(e);
                if (t || a(e)) {
                  const r = new e.constructor();
                  for (let n in e) r[n] = i(e[n], t);
                  return r;
                }
                return e;
              })(e, t);
            case "array":
              return (function (e, t) {
                const r = new e.constructor(e.length);
                for (let n = 0; n < e.length; n++) r[n] = i(e[n], t);
                return r;
              })(e, t);
            default:
              return n(e);
          }
        }
        e.exports = i;
      },
      90159: function (e, t) {
        !(function (e) {
          "use strict";
          var t,
            r = function () {
              return (
                (r =
                  Object.assign ||
                  function (e) {
                    for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in (t = arguments[r])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e;
                  }),
                r.apply(this, arguments)
              );
            };
          function n(e, t, r, n) {
            function o(e) {
              return e instanceof r
                ? e
                : new r(function (t) {
                    t(e);
                  });
            }
            return new (r || (r = Promise))(function (r, a) {
              function i(e) {
                try {
                  c(n.next(e));
                } catch (e) {
                  a(e);
                }
              }
              function s(e) {
                try {
                  c(n.throw(e));
                } catch (e) {
                  a(e);
                }
              }
              function c(e) {
                e.done ? r(e.value) : o(e.value).then(i, s);
              }
              c((n = n.apply(e, t || [])).next());
            });
          }
          function o(e, t) {
            var r,
              n,
              o,
              a,
              i = {
                label: 0,
                sent: function () {
                  if (1 & o[0]) throw o[1];
                  return o[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (a = { next: s(0), throw: s(1), return: s(2) }),
              "function" == typeof Symbol &&
                (a[Symbol.iterator] = function () {
                  return this;
                }),
              a
            );
            function s(e) {
              return function (t) {
                return c([e, t]);
              };
            }
            function c(a) {
              if (r) throw new TypeError("Generator is already executing.");
              for (; i; )
                try {
                  if (((r = 1), n && (o = 2 & a[0] ? n.return : a[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, a[1])).done)) return o;
                  switch (((n = 0), o && (a = [2 & a[0], o.value]), a[0])) {
                    case 0:
                    case 1:
                      o = a;
                      break;
                    case 4:
                      return (i.label++, { value: a[1], done: !1 });
                    case 5:
                      (i.label++, (n = a[1]), (a = [0]));
                      continue;
                    case 7:
                      ((a = i.ops.pop()), i.trys.pop());
                      continue;
                    default:
                      if (!((o = (o = i.trys).length > 0 && o[o.length - 1]) || (6 !== a[0] && 2 !== a[0]))) {
                        i = 0;
                        continue;
                      }
                      if (3 === a[0] && (!o || (a[1] > o[0] && a[1] < o[3]))) {
                        i.label = a[1];
                        break;
                      }
                      if (6 === a[0] && i.label < o[1]) {
                        ((i.label = o[1]), (o = a));
                        break;
                      }
                      if (o && i.label < o[2]) {
                        ((i.label = o[2]), i.ops.push(a));
                        break;
                      }
                      (o[2] && i.ops.pop(), i.trys.pop());
                      continue;
                  }
                  a = t.call(e, i);
                } catch (e) {
                  ((a = [6, e]), (n = 0));
                } finally {
                  r = o = 0;
                }
              if (5 & a[0]) throw a[1];
              return { value: a[0] ? a[1] : void 0, done: !0 };
            }
          }
          function a(e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
              r = t && e[t],
              n = 0;
            if (r) return r.call(e);
            if (e && "number" == typeof e.length)
              return {
                next: function () {
                  return (e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e });
                },
              };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
          }
          function i(e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n,
              o,
              a = r.call(e),
              i = [];
            try {
              for (; (void 0 === t || t-- > 0) && !(n = a.next()).done; ) i.push(n.value);
            } catch (e) {
              o = { error: e };
            } finally {
              try {
                n && !n.done && (r = a.return) && r.call(a);
              } finally {
                if (o) throw o.error;
              }
            }
            return i;
          }
          function s(e, t, r) {
            if (r || 2 === arguments.length) for (var n, o = 0, a = t.length; o < a; o++) (!n && o in t) || (n || (n = Array.prototype.slice.call(t, 0, o)), (n[o] = t[o]));
            return e.concat(n || Array.prototype.slice.call(t));
          }
          !(function (e) {
            ((e.UI_GET_DATA = "ui-get-data"),
              (e.UI_SUBSCRIBE_TO_CHANGES = "ui-subscribe-to-changes"),
              (e.UI_UNSUBSCRIBE_FROM_CHANGES = "ui-unsubscribe-from-changes"),
              (e.UI_CHANGE_SETTINGS = "ui-change-settings"),
              (e.UI_SET_THEME = "ui-set-theme"),
              (e.UI_SET_SHORTCUT = "ui-set-shortcut"),
              (e.UI_TOGGLE_ACTIVE_TAB = "ui-toggle-active-tab"),
              (e.UI_MARK_NEWS_AS_READ = "ui-mark-news-as-read"),
              (e.UI_MARK_NEWS_AS_DISPLAYED = "ui-mark-news-as-displayed"),
              (e.UI_LOAD_CONFIG = "ui-load-config"),
              (e.UI_APPLY_DEV_DYNAMIC_THEME_FIXES = "ui-apply-dev-dynamic-theme-fixes"),
              (e.UI_RESET_DEV_DYNAMIC_THEME_FIXES = "ui-reset-dev-dynamic-theme-fixes"),
              (e.UI_APPLY_DEV_INVERSION_FIXES = "ui-apply-dev-inversion-fixes"),
              (e.UI_RESET_DEV_INVERSION_FIXES = "ui-reset-dev-inversion-fixes"),
              (e.UI_APPLY_DEV_STATIC_THEMES = "ui-apply-dev-static-themes"),
              (e.UI_RESET_DEV_STATIC_THEMES = "ui-reset-dev-static-themes"),
              (e.UI_SAVE_FILE = "ui-save-file"),
              (e.UI_REQUEST_EXPORT_CSS = "ui-request-export-css"),
              (e.UI_COLOR_SCHEME_CHANGE = "ui-color-scheme-change"),
              (e.BG_CHANGES = "bg-changes"),
              (e.BG_ADD_CSS_FILTER = "bg-add-css-filter"),
              (e.BG_ADD_STATIC_THEME = "bg-add-static-theme"),
              (e.BG_ADD_SVG_FILTER = "bg-add-svg-filter"),
              (e.BG_ADD_DYNAMIC_THEME = "bg-add-dynamic-theme"),
              (e.BG_EXPORT_CSS = "bg-export-css"),
              (e.BG_UNSUPPORTED_SENDER = "bg-unsupported-sender"),
              (e.BG_CLEAN_UP = "bg-clean-up"),
              (e.BG_RELOAD = "bg-reload"),
              (e.BG_FETCH_RESPONSE = "bg-fetch-response"),
              (e.BG_UI_UPDATE = "bg-ui-update"),
              (e.BG_CSS_UPDATE = "bg-css-update"),
              (e.CS_COLOR_SCHEME_CHANGE = "cs-color-scheme-change"),
              (e.CS_FRAME_CONNECT = "cs-frame-connect"),
              (e.CS_FRAME_FORGET = "cs-frame-forget"),
              (e.CS_FRAME_FREEZE = "cs-frame-freeze"),
              (e.CS_FRAME_RESUME = "cs-frame-resume"),
              (e.CS_EXPORT_CSS_RESPONSE = "cs-export-css-response"),
              (e.CS_FETCH = "cs-fetch"),
              (e.CS_DARK_THEME_DETECTED = "cs-dark-theme-detected"),
              (e.CS_DARK_THEME_NOT_DETECTED = "cs-dark-theme-not-detected"),
              (e.CS_LOG = "cs-log"));
          })(t || (t = {}));
          var c = "undefined" != typeof navigator,
            u = c
              ? navigator.userAgentData && Array.isArray(navigator.userAgentData.brands)
                ? navigator.userAgentData.brands
                    .map(function (e) {
                      return "".concat(e.brand.toLowerCase(), " ").concat(e.version);
                    })
                    .join(" ")
                : navigator.userAgent.toLowerCase()
              : "some useragent",
            l = c ? (navigator.userAgentData && "string" == typeof navigator.userAgentData.platform ? navigator.userAgentData.platform.toLowerCase() : navigator.platform.toLowerCase()) : "some platform",
            d = u.includes("chrome") || u.includes("chromium"),
            f = u.includes("thunderbird"),
            h = u.includes("firefox") || u.includes("librewolf") || f;
          (u.includes("vivaldi"), u.includes("yabrowser"), u.includes("opr") || u.includes("opera"), u.includes("edg"));
          var p = u.includes("safari") && !d,
            m = l.startsWith("win"),
            g = l.startsWith("mac");
          c && navigator.userAgentData ? navigator.userAgentData.mobile : u.includes("mobile");
          var b,
            v = "function" == typeof ShadowRoot,
            y = "function" == typeof MediaQueryList && "function" == typeof MediaQueryList.prototype.addEventListener;
          ((b = u.match(/chrom(?:e|ium)(?:\/| )([^ ]+)/)) && b[1] && b[1],
            (function () {
              var e = u.match(/(?:firefox|librewolf)(?:\/| )([^ ]+)/);
              e && e[1] && e[1];
            })());
          var w = (function () {
              try {
                return (document.querySelector(":defined"), !0);
              } catch (e) {
                return !1;
              }
            })(),
            _ = (function () {
              if ("undefined" == typeof document) return !1;
              var e = document.createElement("div");
              return (e.setAttribute("style", "color-scheme: dark"), e.style && "dark" === e.style.colorScheme);
            })();
          function S(e, t, r) {
            return n(this, void 0, void 0, function () {
              var n;
              return o(this, function (o) {
                switch (o.label) {
                  case 0:
                    return [4, fetch(e, { cache: "force-cache", credentials: "omit", referrer: r })];
                  case 1:
                    if (((n = o.sent()), h && "text/css" === t && e.startsWith("moz-extension://") && e.endsWith(".css"))) return [2, n];
                    if (t && !n.headers.get("Content-Type").startsWith(t)) throw new Error("Mime type mismatch when loading ".concat(e));
                    if (!n.ok) throw new Error("Unable to load ".concat(e, " ").concat(n.status, " ").concat(n.statusText));
                    return [2, n];
                }
              });
            });
          }
          function k(e, t) {
            return n(this, void 0, void 0, function () {
              return o(this, function (r) {
                switch (r.label) {
                  case 0:
                    return [4, S(e, t)];
                  case 1:
                    return [4, E(r.sent())];
                  case 2:
                    return [2, r.sent()];
                }
              });
            });
          }
          function E(e) {
            return n(this, void 0, void 0, function () {
              var t;
              return o(this, function (r) {
                switch (r.label) {
                  case 0:
                    return [4, e.blob()];
                  case 1:
                    return (
                      (t = r.sent()),
                      [
                        4,
                        new Promise(function (e) {
                          var r = new FileReader();
                          ((r.onloadend = function () {
                            return e(r.result);
                          }),
                            r.readAsDataURL(t));
                        }),
                      ]
                    );
                  case 2:
                    return [2, r.sent()];
                }
              });
            });
          }
          var x = function (e) {
              return n(void 0, void 0, void 0, function () {
                return o(this, function (t) {
                  return [2, Promise.reject(new Error(["Embedded Dark Reader cannot access a cross-origin resource", e, "Overview your URLs and CORS policies or use", "`DarkReader.setFetchMethod(fetch: (url) => Promise<Response>))`.", "See if using `DarkReader.setFetchMethod(window.fetch)`", "before `DarkReader.enable()` works."].join(" ")))];
                });
              });
            },
            T = x;
          function M(e) {
            T = e || x;
          }
          function O(e) {
            return n(this, void 0, void 0, function () {
              return o(this, function (t) {
                switch (t.label) {
                  case 0:
                    return [4, T(e)];
                  case 1:
                    return [2, t.sent()];
                }
              });
            });
          }
          (window.chrome || (window.chrome = {}), chrome.runtime || (chrome.runtime = {}));
          var C,
            A,
            D = new Set();
          function I() {
            for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
            return n(this, void 0, void 0, function () {
              var r, n, a, i, s, c, u;
              return o(this, function (o) {
                switch (o.label) {
                  case 0:
                    if (!e[0] || e[0].type !== t.CS_FETCH) return [3, 8];
                    ((r = e[0].id), (o.label = 1));
                  case 1:
                    return (o.trys.push([1, 7, , 8]), (n = e[0].data), (a = n.url), (i = n.responseType), [4, O(a)]);
                  case 2:
                    return ((s = o.sent()), "data-url" !== i ? [3, 4] : [4, E(s)]);
                  case 3:
                    return ((c = o.sent()), [3, 6]);
                  case 4:
                    return [4, s.text()];
                  case 5:
                    ((c = o.sent()), (o.label = 6));
                  case 6:
                    return (
                      D.forEach(function (e) {
                        return e({ type: t.BG_FETCH_RESPONSE, data: c, error: null, id: r });
                      }),
                      [3, 8]
                    );
                  case 7:
                    return (
                      (u = o.sent()),
                      console.error(u),
                      D.forEach(function (e) {
                        return e({ type: t.BG_FETCH_RESPONSE, data: null, error: u, id: r });
                      }),
                      [3, 8]
                    );
                  case 8:
                    return [2];
                }
              });
            });
          }
          function P(e) {
            D.add(e);
          }
          if ("function" == typeof chrome.runtime.sendMessage) {
            var L = chrome.runtime.sendMessage;
            chrome.runtime.sendMessage = function () {
              for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
              (I.apply(void 0, s([], i(e), !1)), L.apply(chrome.runtime, e));
            };
          } else chrome.runtime.sendMessage = I;
          if ((chrome.runtime.onMessage || (chrome.runtime.onMessage = {}), "function" == typeof chrome.runtime.onMessage.addListener)) {
            var j = chrome.runtime.onMessage.addListener;
            chrome.runtime.onMessage.addListener = function () {
              for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
              (P(e[0]), j.apply(chrome.runtime.onMessage, e));
            };
          } else
            chrome.runtime.onMessage.addListener = function () {
              for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
              return P(e[0]);
            };
          ((function (e) {
            ((e.cssFilter = "cssFilter"), (e.svgFilter = "svgFilter"), (e.staticTheme = "staticTheme"), (e.dynamicTheme = "dynamicTheme"));
          })(C || (C = {})),
            (function (e) {
              ((e.NONE = ""), (e.TIME = "time"), (e.SYSTEM = "system"), (e.LOCATION = "location"));
            })(A || (A = {})));
          var R = { darkScheme: { background: "#181a1b", text: "#e8e6e3" }, lightScheme: { background: "#dcdad7", text: "#181a1b" } },
            N = { mode: 1, brightness: 100, contrast: 100, grayscale: 0, sepia: 0, useFont: !1, fontFamily: g ? "Helvetica Neue" : m ? "Segoe UI" : "Open Sans", textStroke: 0, engine: C.dynamicTheme, stylesheet: "", darkSchemeBackgroundColor: R.darkScheme.background, darkSchemeTextColor: R.darkScheme.text, lightSchemeBackgroundColor: R.lightScheme.background, lightSchemeTextColor: R.lightScheme.text, scrollbarColor: g ? "" : "auto", selectionColor: "auto", styleSystemControls: !_, lightColorScheme: "Default", darkColorScheme: "Default", immediateModify: !1 };
          function V(e) {
            return null != e.length;
          }
          function F(e, t) {
            var r, n;
            if (V(e)) for (var o = 0, i = e.length; o < i; o++) t(e[o]);
            else
              try {
                for (var s = a(e), c = s.next(); !c.done; c = s.next()) t(c.value);
              } catch (e) {
                r = { error: e };
              } finally {
                try {
                  c && !c.done && (n = s.return) && n.call(s);
                } finally {
                  if (r) throw r.error;
                }
              }
          }
          function $(e, t) {
            F(t, function (t) {
              return e.push(t);
            });
          }
          function U(e) {
            for (var t = [], r = 0, n = e.length; r < n; r++) t.push(e[r]);
            return t;
          }
          function B() {}
          function Y() {}
          function H(e) {
            var t,
              r = !1,
              n = null,
              o = function () {
                for (var o = [], a = 0; a < arguments.length; a++) o[a] = arguments[a];
                ((t = o),
                  n
                    ? (r = !0)
                    : (e.apply(void 0, s([], i(t), !1)),
                      (n = requestAnimationFrame(function () {
                        ((n = null), r && (e.apply(void 0, s([], i(t), !1)), (r = !1)));
                      }))));
              },
              a = function () {
                (cancelAnimationFrame(n), (r = !1), (n = null));
              };
            return Object.assign(o, { cancel: a });
          }
          function W() {
            var e = [],
              t = null;
            function r() {
              for (var r; (r = e.shift()); ) r();
              t = null;
            }
            function n(n) {
              (e.push(n), t || (t = requestAnimationFrame(r)));
            }
            function o() {
              (e.splice(0), cancelAnimationFrame(t), (t = null));
            }
            return { add: n, cancel: o };
          }
          function q(e) {
            var t = 0;
            return (e.seconds && (t += 1e3 * e.seconds), e.minutes && (t += 60 * e.minutes * 1e3), e.hours && (t += 60 * e.hours * 60 * 1e3), e.days && (t += 24 * e.days * 60 * 60 * 1e3), t);
          }
          function G(e) {
            e && e.parentNode && e.parentNode.removeChild(e);
          }
          function z(e, t, r) {
            void 0 === r && (r = Function.prototype);
            var n = 10,
              o = q({ seconds: 2 }),
              a = q({ seconds: 10 }),
              i = e.previousSibling,
              s = e.parentNode;
            if (!s) throw new Error("Unable to watch for node position: parent element not found");
            if ("prev-sibling" === t && !i) throw new Error("Unable to watch for node position: there is no previous sibling");
            var c = 0,
              u = null,
              l = null,
              d = H(function () {
                if (!l) {
                  c++;
                  var h = Date.now();
                  if (null == u) u = h;
                  else if (c >= n) {
                    if (h - u < a)
                      return void (l = setTimeout(function () {
                        ((u = null), (c = 0), (l = null), d());
                      }, o));
                    ((u = h), (c = 1));
                  }
                  if ("parent" === t && i && i.parentNode !== s) p();
                  else {
                    if ("prev-sibling" === t) {
                      if (null == i.parentNode) return void p();
                      i.parentNode !== s && g(i.parentNode);
                    }
                    (s.insertBefore(e, i ? i.nextSibling : s.firstChild), f.takeRecords(), r && r());
                  }
                }
              }),
              f = new MutationObserver(function () {
                (("parent" === t && e.parentNode !== s) || ("prev-sibling" === t && e.previousSibling !== i)) && d();
              }),
              h = function () {
                f.observe(s, { childList: !0 });
              },
              p = function () {
                (clearTimeout(l), f.disconnect(), d.cancel());
              },
              m = function () {
                f.takeRecords();
              },
              g = function (e) {
                ((s = e), p(), h());
              };
            return (h(), { run: h, stop: p, skip: m });
          }
          function K(e, t) {
            if (null != e)
              for (
                var r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
                    acceptNode: function (e) {
                      return null == e.shadowRoot ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
                    },
                  }),
                  n = e.shadowRoot ? r.currentNode : r.nextNode();
                null != n;
                n = r.nextNode()
              )
                n.classList.contains("surfingkeys_hints_host") || (t(n), K(n.shadowRoot, t));
          }
          A.NONE;
          var Q = function () {
            return "complete" === document.readyState || "interactive" === document.readyState;
          };
          function Z(e) {
            Q = e;
          }
          var X = new Set();
          function J(e) {
            Q() ? e() : X.add(e);
          }
          function ee(e) {
            X.delete(e);
          }
          function te() {
            return "complete" === document.readyState;
          }
          var re = new Set();
          function ne(e) {
            te() ? e() : re.add(e);
          }
          function oe() {
            re.clear();
          }
          if (!Q()) {
            var ae = function () {
              Q() &&
                (X.forEach(function (e) {
                  return e();
                }),
                X.clear(),
                te() &&
                  (document.removeEventListener("readystatechange", ae),
                  re.forEach(function (e) {
                    return e();
                  }),
                  re.clear()));
            };
            document.addEventListener("readystatechange", ae);
          }
          var ie = 1e3;
          function se(e) {
            if (e.length > ie) return !0;
            for (var t = 0, r = 0; r < e.length; r++) if ((t += e[r].addedNodes.length) > ie) return !0;
            return !1;
          }
          function ce(e) {
            var t = new Set(),
              r = new Set(),
              n = new Set();
            e.forEach(function (e) {
              (F(e.addedNodes, function (e) {
                e instanceof Element && e.isConnected && t.add(e);
              }),
                F(e.removedNodes, function (e) {
                  e instanceof Element && (e.isConnected ? (n.add(e), t.delete(e)) : r.add(e));
                }));
            });
            var o = [],
              a = [];
            return (
              t.forEach(function (e) {
                t.has(e.parentElement) && o.push(e);
              }),
              r.forEach(function (e) {
                r.has(e.parentElement) && a.push(e);
              }),
              o.forEach(function (e) {
                return t.delete(e);
              }),
              a.forEach(function (e) {
                return r.delete(e);
              }),
              { additions: t, moves: n, deletions: r }
            );
          }
          var ue,
            le = new Map(),
            de = new WeakMap();
          function fe(e, t) {
            var r, n, o;
            if (le.has(e)) ((r = le.get(e)), (n = de.get(r)));
            else {
              var a = !1,
                i = !1;
              ((r = new MutationObserver(function (t) {
                if (se(t))
                  (!a || Q()
                    ? n.forEach(function (t) {
                        return (0, t.onHugeMutations)(e);
                      })
                    : i ||
                      (J(
                        (o = function () {
                          return n.forEach(function (t) {
                            return (0, t.onHugeMutations)(e);
                          });
                        }),
                      ),
                      (i = !0)),
                    (a = !0));
                else {
                  var r = ce(t);
                  n.forEach(function (e) {
                    return (0, e.onMinorMutations)(r);
                  });
                }
              })).observe(e, { childList: !0, subtree: !0 }),
                le.set(e, r),
                (n = new Set()),
                de.set(r, n));
            }
            return (
              n.add(t),
              {
                disconnect: function () {
                  (n.delete(t), o && ee(o), 0 === n.size && (r.disconnect(), de.delete(r), le.delete(e)));
                },
              }
            );
          }
          var he = new Map();
          function pe(e) {
            return (ue || (ue = document.createElement("a")), (ue.href = e), ue.href);
          }
          function me(e, t) {
            void 0 === t && (t = null);
            var r = "".concat(e).concat(t ? ";".concat(t) : "");
            if (he.has(r)) return he.get(r);
            if (t) {
              var n = new URL(e, pe(t));
              return (he.set(r, n), n);
            }
            var o = new URL(pe(e));
            return (he.set(e, o), o);
          }
          function ge(e, t) {
            if (t.match(/^data\\?\:/)) return t;
            if (/^\/\//.test(t)) return "".concat(location.protocol).concat(t);
            var r = me(e);
            return me(t, r.href).href;
          }
          function be(e) {
            if (e.startsWith("data:")) return !0;
            var t = me(e);
            return t.protocol === location.protocol && t.hostname === location.hostname && t.port === location.port && t.pathname === location.pathname;
          }
          function ve(e, t, r) {
            F(e, function (e) {
              if (e.selectorText) t(e);
              else if (e.href)
                try {
                  ve(e.styleSheet.cssRules, t, r);
                } catch (e) {
                  (B("Found a non-loaded link."), r && r());
                }
              else if (e.media) {
                var n = Array.from(e.media),
                  o = n.some(function (e) {
                    return e.startsWith("screen") || e.startsWith("all") || e.startsWith("(");
                  }),
                  a = n.some(function (e) {
                    return e.startsWith("print") || e.startsWith("speech");
                  });
                (!o && a) || ve(e.cssRules, t, r);
              } else e.conditionText ? CSS.supports(e.conditionText) && ve(e.cssRules, t, r) : Y("CSSRule type not supported", e);
            });
          }
          var ye = ["background", "border", "border-color", "border-bottom", "border-left", "border-right", "border-top", "outline", "outline-color"],
            we = p
              ? ye.map(function (e) {
                  return [e, new RegExp("".concat(e, ":\\s*(.*?)\\s*;"))];
                })
              : null;
          function _e(e, t) {
            F(e, function (r) {
              var n = e.getPropertyValue(r).trim();
              n && t(r, n);
            });
            var r = e.cssText;
            r.includes("var(") &&
              (p
                ? we.forEach(function (e) {
                    var n = i(e, 2),
                      o = n[0],
                      a = n[1],
                      s = r.match(a);
                    if (s && s[1]) {
                      var c = s[1].trim();
                      t(o, c);
                    }
                  })
                : ye.forEach(function (r) {
                    var n = e.getPropertyValue(r);
                    n && n.includes("var(") && t(r, n);
                  }));
          }
          var Se = /url\((('.*?')|(".*?")|([^\)]*?))\)/g,
            ke = /@import\s*(url\()?(('.+?')|(".+?")|([^\)]*?))\)? ?(screen)?;?/gi;
          function Ee(e) {
            return e
              .trim()
              .replace(/[\n\r\\]+/g, "")
              .replace(/^url\((.*)\)$/, "$1")
              .trim()
              .replace(/^"(.*)"$/, "$1")
              .replace(/^'(.*)'$/, "$1")
              .replace(/(?:\\(.))/g, "$1");
          }
          function xe(e) {
            var t = me(e);
            return "".concat(t.origin).concat(t.pathname.replace(/\?.*$/, "").replace(/(\/)([^\/]+)$/i, "$1"));
          }
          function Te(e, t) {
            return e.replace(Se, function (e) {
              var r = Ee(e);
              try {
                return "url('".concat(ge(t, r), "')");
              } catch (t) {
                return e;
              }
            });
          }
          var Me = /\/\*[\s\S]*?\*\//g;
          function Oe(e) {
            return e.replace(Me, "");
          }
          var Ce = /@font-face\s*{[^}]*}/g;
          function Ae(e) {
            return e.replace(Ce, "");
          }
          function De(e) {
            for (var t, r = [], n = [], o = 0, a = e.length; o < a; o++) {
              var c = e[o];
              if (c && " " !== c) {
                if (Pe.has(c)) {
                  for (var u = Pe.get(c); n.length; ) {
                    var l = Pe.get(n[0]);
                    if (!l) break;
                    if (!u.lessOrEqualThan(l)) break;
                    r.push(n.shift());
                  }
                  n.unshift(c);
                } else !t || Pe.has(t) ? r.push(c) : (r[r.length - 1] += c);
                t = c;
              }
            }
            r.push.apply(r, s([], i(n), !1));
            var d = [];
            for (o = 0, a = r.length; o < a; o++)
              if ((u = Pe.get(r[o]))) {
                var f = d.splice(0, 2);
                d.push(u.exec(f[1], f[0]));
              } else d.unshift(parseFloat(r[o]));
            return d[0];
          }
          var Ie = (function () {
              function e(e, t) {
                ((this.precendce = e), (this.execMethod = t));
              }
              return (
                (e.prototype.exec = function (e, t) {
                  return this.execMethod(e, t);
                }),
                (e.prototype.lessOrEqualThan = function (e) {
                  return this.precendce <= e.precendce;
                }),
                e
              );
            })(),
            Pe = new Map([
              [
                "+",
                new Ie(1, function (e, t) {
                  return e + t;
                }),
              ],
              [
                "-",
                new Ie(1, function (e, t) {
                  return e - t;
                }),
              ],
              [
                "*",
                new Ie(2, function (e, t) {
                  return e * t;
                }),
              ],
              [
                "/",
                new Ie(2, function (e, t) {
                  return e / t;
                }),
              ],
            ]);
          function Le(e, t, r) {
            void 0 === r && (r = 0);
            for (var n, o = []; (n = e.exec(t)); ) o.push(n[r]);
            return o;
          }
          function je(e) {
            function t(e) {
              return e.replace(/^\s+/, "");
            }
            function r(e) {
              return 0 === e ? "" : " ".repeat(4 * e);
            }
            if (e.length < 5e4) for (var n = /[^{}]+{\s*}/; n.test(e); ) e = e.replace(n, "");
            for (
              var o = e
                  .replace(/\s{2,}/g, " ")
                  .replace(/\{/g, "{\n")
                  .replace(/\}/g, "\n}\n")
                  .replace(/\;(?![^\(|\"]*(\)|\"))/g, ";\n")
                  .replace(/\,(?![^\(|\"]*(\)|\"))/g, ",\n")
                  .replace(/\n\s*\n/g, "\n")
                  .split("\n"),
                a = 0,
                i = [],
                s = 0,
                c = o.length;
              s < c;
              s++
            ) {
              var u = "".concat(o[s], "\n");
              u.includes("{") ? i.push(r(a++) + t(u)) : u.includes("}") ? i.push(r(--a) + t(u)) : i.push(r(a) + t(u));
            }
            return i.join("").trim();
          }
          function Re(e, t) {
            void 0 === t && (t = 0);
            for (var r = e.length, n = 0, o = -1, a = t; a < r; a++)
              if (0 === n) {
                if ((i = e.indexOf("(", a)) < 0) break;
                ((o = i), n++, (a = i));
              } else {
                var i,
                  s = e.indexOf(")", a);
                if (s < 0) break;
                if ((i = e.indexOf("(", a)) < 0 || s < i) {
                  if (0 == --n) return { start: o, end: s + 1 };
                  a = s;
                } else (n++, (a = i));
              }
            return null;
          }
          var Ne = new Map(),
            Ve = new Map();
          function Fe(e) {
            if (((e = e.trim()), Ve.has(e))) return Ve.get(e);
            e.includes("calc(") && (e = ut(e));
            var t = Ze(e);
            return (t && Ve.set(e, t), t);
          }
          function $e(e) {
            if (Ne.has(e)) return Ne.get(e);
            var t = Fe(e);
            if (!t) return null;
            var r = Ye(t);
            return (Ne.set(e, r), r);
          }
          function Ue() {
            (Ne.clear(), Ve.clear());
          }
          function Be(e) {
            var t = e.h,
              r = e.s,
              n = e.l,
              o = e.a,
              a = void 0 === o ? 1 : o;
            if (0 === r) {
              var s = i(
                  [n, n, n].map(function (e) {
                    return Math.round(255 * e);
                  }),
                  3,
                ),
                c = s[0],
                u = s[1];
              return { r: c, g: s[2], b: u, a };
            }
            var l = (1 - Math.abs(2 * n - 1)) * r,
              d = l * (1 - Math.abs(((t / 60) % 2) - 1)),
              f = n - l / 2,
              h = i(
                (t < 60 ? [l, d, 0] : t < 120 ? [d, l, 0] : t < 180 ? [0, l, d] : t < 240 ? [0, d, l] : t < 300 ? [d, 0, l] : [l, 0, d]).map(function (e) {
                  return Math.round(255 * (e + f));
                }),
                3,
              );
            return { r: h[0], g: h[1], b: h[2], a };
          }
          function Ye(e) {
            var t = e.r,
              r = e.g,
              n = e.b,
              o = e.a,
              a = void 0 === o ? 1 : o,
              i = t / 255,
              s = r / 255,
              c = n / 255,
              u = Math.max(i, s, c),
              l = Math.min(i, s, c),
              d = u - l,
              f = (u + l) / 2;
            if (0 === d) return { h: 0, s: 0, l: f, a };
            var h = 60 * (u === i ? ((s - c) / d) % 6 : u === s ? (c - i) / d + 2 : (i - s) / d + 4);
            return (h < 0 && (h += 360), { h, s: d / (1 - Math.abs(2 * f - 1)), l: f, a });
          }
          function He(e, t) {
            void 0 === t && (t = 0);
            var r = e.toFixed(t);
            if (0 === t) return r;
            var n = r.indexOf(".");
            if (n >= 0) {
              var o = r.match(/0+$/);
              if (o) return o.index === n + 1 ? r.substring(0, n) : r.substring(0, o.index);
            }
            return r;
          }
          function We(e) {
            var t = e.r,
              r = e.g,
              n = e.b,
              o = e.a;
            return null != o && o < 1 ? "rgba(".concat(He(t), ", ").concat(He(r), ", ").concat(He(n), ", ").concat(He(o, 2), ")") : "rgb(".concat(He(t), ", ").concat(He(r), ", ").concat(He(n), ")");
          }
          function qe(e) {
            var t = e.r,
              r = e.g,
              n = e.b,
              o = e.a;
            return "#".concat(
              (null != o && o < 1 ? [t, r, n, Math.round(255 * o)] : [t, r, n])
                .map(function (e) {
                  return "".concat(e < 16 ? "0" : "").concat(e.toString(16));
                })
                .join(""),
            );
          }
          function Ge(e) {
            var t = e.h,
              r = e.s,
              n = e.l,
              o = e.a;
            return null != o && o < 1
              ? "hsla("
                  .concat(He(t), ", ")
                  .concat(He(100 * r), "%, ")
                  .concat(He(100 * n), "%, ")
                  .concat(He(o, 2), ")")
              : "hsl("
                  .concat(He(t), ", ")
                  .concat(He(100 * r), "%, ")
                  .concat(He(100 * n), "%)");
          }
          var ze = /^rgba?\([^\(\)]+\)$/,
            Ke = /^hsla?\([^\(\)]+\)$/,
            Qe = /^#[0-9a-f]+$/i;
          function Ze(e) {
            var t = e.trim().toLowerCase();
            return t.match(ze) ? rt(t) : t.match(Ke) ? at(t) : t.match(Qe) ? it(t) : lt.has(t) ? st(t) : dt.has(t) ? ct(t) : "transparent" === e ? { r: 0, g: 0, b: 0, a: 0 } : null;
          }
          function Xe(e) {
            var t = [],
              r = 0,
              n = !1,
              o = e.indexOf("(");
            e = e.substring(o + 1, e.length - 1);
            for (var a = 0; a < e.length; a++) {
              var i = e[a];
              (i >= "0" && i <= "9") || "." === i || "+" === i || "-" === i ? (n = !0) : !n || (" " !== i && "," !== i) ? n || (r = a + 1) : (t.push(e.substring(r, a)), (n = !1), (r = a + 1));
            }
            return (n && t.push(e.substring(r, e.length)), t);
          }
          function Je(e, t, r) {
            var n = Xe(e),
              o = Object.entries(r);
            return n
              .map(function (e) {
                return e.trim();
              })
              .map(function (e, r) {
                var n,
                  a = o.find(function (t) {
                    var r = i(t, 1)[0];
                    return e.endsWith(r);
                  });
                return ((n = a ? (parseFloat(e.substring(0, e.length - a[0].length)) / a[1]) * t[r] : parseFloat(e)), t[r] > 1 ? Math.round(n) : n);
              });
          }
          var et = [255, 255, 255, 1],
            tt = { "%": 100 };
          function rt(e) {
            var t = i(Je(e, et, tt), 4),
              r = t[0],
              n = t[1],
              o = t[2],
              a = t[3];
            return { r, g: n, b: o, a: void 0 === a ? 1 : a };
          }
          var nt = [360, 1, 1, 1],
            ot = { "%": 100, deg: 360, rad: 2 * Math.PI, turn: 1 };
          function at(e) {
            var t = i(Je(e, nt, ot), 4),
              r = t[0],
              n = t[1],
              o = t[2],
              a = t[3];
            return Be({ h: r, s: n, l: o, a: void 0 === a ? 1 : a });
          }
          function it(e) {
            var t = e.substring(1);
            switch (t.length) {
              case 3:
              case 4:
                var r = i(
                  [0, 1, 2].map(function (e) {
                    return parseInt("".concat(t[e]).concat(t[e]), 16);
                  }),
                  3,
                );
                return { r: r[0], g: r[1], b: r[2], a: 3 === t.length ? 1 : parseInt("".concat(t[3]).concat(t[3]), 16) / 255 };
              case 6:
              case 8:
                var n = i(
                  [0, 2, 4].map(function (e) {
                    return parseInt(t.substring(e, e + 2), 16);
                  }),
                  3,
                );
                return { r: n[0], g: n[1], b: n[2], a: 6 === t.length ? 1 : parseInt(t.substring(6, 8), 16) / 255 };
            }
            return null;
          }
          function st(e) {
            var t = lt.get(e);
            return { r: (t >> 16) & 255, g: (t >> 8) & 255, b: (t >> 0) & 255, a: 1 };
          }
          function ct(e) {
            var t = dt.get(e);
            return { r: (t >> 16) & 255, g: (t >> 8) & 255, b: (t >> 0) & 255, a: 1 };
          }
          function ut(e) {
            for (
              var t = 0,
                r = function (t, r, n) {
                  e = e.substring(0, t) + n + e.substring(r);
                };
              -1 !== (t = e.indexOf("calc("));
            ) {
              var n = Re(e, t);
              if (!n) break;
              var o = e.slice(n.start + 1, n.end - 1),
                a = o.includes("%");
              o = o.split("%").join("");
              var i = Math.round(De(o));
              r(n.start - 4, n.end, i + (a ? "%" : ""));
            }
            return e;
          }
          var lt = new Map(
              Object.entries({
                aliceblue: 15792383,
                antiquewhite: 16444375,
                aqua: 65535,
                aquamarine: 8388564,
                azure: 15794175,
                beige: 16119260,
                bisque: 16770244,
                black: 0,
                blanchedalmond: 16772045,
                blue: 255,
                blueviolet: 9055202,
                brown: 10824234,
                burlywood: 14596231,
                cadetblue: 6266528,
                chartreuse: 8388352,
                chocolate: 13789470,
                coral: 16744272,
                cornflowerblue: 6591981,
                cornsilk: 16775388,
                crimson: 14423100,
                cyan: 65535,
                darkblue: 139,
                darkcyan: 35723,
                darkgoldenrod: 12092939,
                darkgray: 11119017,
                darkgrey: 11119017,
                darkgreen: 25600,
                darkkhaki: 12433259,
                darkmagenta: 9109643,
                darkolivegreen: 5597999,
                darkorange: 16747520,
                darkorchid: 10040012,
                darkred: 9109504,
                darksalmon: 15308410,
                darkseagreen: 9419919,
                darkslateblue: 4734347,
                darkslategray: 3100495,
                darkslategrey: 3100495,
                darkturquoise: 52945,
                darkviolet: 9699539,
                deeppink: 16716947,
                deepskyblue: 49151,
                dimgray: 6908265,
                dimgrey: 6908265,
                dodgerblue: 2003199,
                firebrick: 11674146,
                floralwhite: 16775920,
                forestgreen: 2263842,
                fuchsia: 16711935,
                gainsboro: 14474460,
                ghostwhite: 16316671,
                gold: 16766720,
                goldenrod: 14329120,
                gray: 8421504,
                grey: 8421504,
                green: 32768,
                greenyellow: 11403055,
                honeydew: 15794160,
                hotpink: 16738740,
                indianred: 13458524,
                indigo: 4915330,
                ivory: 16777200,
                khaki: 15787660,
                lavender: 15132410,
                lavenderblush: 16773365,
                lawngreen: 8190976,
                lemonchiffon: 16775885,
                lightblue: 11393254,
                lightcoral: 15761536,
                lightcyan: 14745599,
                lightgoldenrodyellow: 16448210,
                lightgray: 13882323,
                lightgrey: 13882323,
                lightgreen: 9498256,
                lightpink: 16758465,
                lightsalmon: 16752762,
                lightseagreen: 2142890,
                lightskyblue: 8900346,
                lightslategray: 7833753,
                lightslategrey: 7833753,
                lightsteelblue: 11584734,
                lightyellow: 16777184,
                lime: 65280,
                limegreen: 3329330,
                linen: 16445670,
                magenta: 16711935,
                maroon: 8388608,
                mediumaquamarine: 6737322,
                mediumblue: 205,
                mediumorchid: 12211667,
                mediumpurple: 9662683,
                mediumseagreen: 3978097,
                mediumslateblue: 8087790,
                mediumspringgreen: 64154,
                mediumturquoise: 4772300,
                mediumvioletred: 13047173,
                midnightblue: 1644912,
                mintcream: 16121850,
                mistyrose: 16770273,
                moccasin: 16770229,
                navajowhite: 16768685,
                navy: 128,
                oldlace: 16643558,
                olive: 8421376,
                olivedrab: 7048739,
                orange: 16753920,
                orangered: 16729344,
                orchid: 14315734,
                palegoldenrod: 15657130,
                palegreen: 10025880,
                paleturquoise: 11529966,
                palevioletred: 14381203,
                papayawhip: 16773077,
                peachpuff: 16767673,
                peru: 13468991,
                pink: 16761035,
                plum: 14524637,
                powderblue: 11591910,
                purple: 8388736,
                rebeccapurple: 6697881,
                red: 16711680,
                rosybrown: 12357519,
                royalblue: 4286945,
                saddlebrown: 9127187,
                salmon: 16416882,
                sandybrown: 16032864,
                seagreen: 3050327,
                seashell: 16774638,
                sienna: 10506797,
                silver: 12632256,
                skyblue: 8900331,
                slateblue: 6970061,
                slategray: 7372944,
                slategrey: 7372944,
                snow: 16775930,
                springgreen: 65407,
                steelblue: 4620980,
                tan: 13808780,
                teal: 32896,
                thistle: 14204888,
                tomato: 16737095,
                turquoise: 4251856,
                violet: 15631086,
                wheat: 16113331,
                white: 16777215,
                whitesmoke: 16119285,
                yellow: 16776960,
                yellowgreen: 10145074,
              }),
            ),
            dt = new Map(
              Object.entries({ ActiveBorder: 3906044, ActiveCaption: 0, AppWorkspace: 11184810, Background: 6513614, ButtonFace: 16777215, ButtonHighlight: 15329769, ButtonShadow: 10461343, ButtonText: 0, CaptionText: 0, GrayText: 8355711, Highlight: 11720703, HighlightText: 0, InactiveBorder: 16777215, InactiveCaption: 16777215, InactiveCaptionText: 0, InfoBackground: 16514245, InfoText: 0, Menu: 16185078, MenuText: 16777215, Scrollbar: 11184810, ThreeDDarkShadow: 0, ThreeDFace: 12632256, ThreeDHighlight: 16777215, ThreeDLightShadow: 16777215, ThreeDShadow: 0, Window: 15527148, WindowFrame: 11184810, WindowText: 0, "-webkit-focus-ring-color": 15046400 }).map(function (e) {
                var t = i(e, 2),
                  r = t[0],
                  n = t[1];
                return [r.toLowerCase(), n];
              }),
            );
          function ft(e, t, r) {
            return (0.2126 * e + 0.7152 * t + 0.0722 * r) / 255;
          }
          function ht(e, t, r, n, o) {
            return ((e - t) * (o - n)) / (r - t) + n;
          }
          function pt(e, t, r) {
            return Math.min(r, Math.max(t, e));
          }
          function mt(e, t) {
            for (var r = [], n = 0, o = e.length; n < o; n++) {
              r[n] = [];
              for (var a = 0, i = t[0].length; a < i; a++) {
                for (var s = 0, c = 0, u = e[0].length; c < u; c++) s += e[n][c] * t[c][a];
                r[n][a] = s;
              }
            }
            return r;
          }
          function gt(e) {
            var t = vt.identity();
            return (0 !== e.sepia && (t = mt(t, vt.sepia(e.sepia / 100))), 0 !== e.grayscale && (t = mt(t, vt.grayscale(e.grayscale / 100))), 100 !== e.contrast && (t = mt(t, vt.contrast(e.contrast / 100))), 100 !== e.brightness && (t = mt(t, vt.brightness(e.brightness / 100))), 1 === e.mode && (t = mt(t, vt.invertNHue())), t);
          }
          function bt(e, t) {
            var r = i(e, 3),
              n = mt(t, [[r[0] / 255], [r[1] / 255], [r[2] / 255], [1], [1]]);
            return [0, 1, 2].map(function (e) {
              return pt(Math.round(255 * n[e][0]), 0, 255);
            });
          }
          var vt = {
            identity: function () {
              return [
                [1, 0, 0, 0, 0],
                [0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 1, 0],
                [0, 0, 0, 0, 1],
              ];
            },
            invertNHue: function () {
              return [
                [0.333, -0.667, -0.667, 0, 1],
                [-0.667, 0.333, -0.667, 0, 1],
                [-0.667, -0.667, 0.333, 0, 1],
                [0, 0, 0, 1, 0],
                [0, 0, 0, 0, 1],
              ];
            },
            brightness: function (e) {
              return [
                [e, 0, 0, 0, 0],
                [0, e, 0, 0, 0],
                [0, 0, e, 0, 0],
                [0, 0, 0, 1, 0],
                [0, 0, 0, 0, 1],
              ];
            },
            contrast: function (e) {
              var t = (1 - e) / 2;
              return [
                [e, 0, 0, 0, t],
                [0, e, 0, 0, t],
                [0, 0, e, 0, t],
                [0, 0, 0, 1, 0],
                [0, 0, 0, 0, 1],
              ];
            },
            sepia: function (e) {
              return [
                [0.393 + 0.607 * (1 - e), 0.769 - 0.769 * (1 - e), 0.189 - 0.189 * (1 - e), 0, 0],
                [0.349 - 0.349 * (1 - e), 0.686 + 0.314 * (1 - e), 0.168 - 0.168 * (1 - e), 0, 0],
                [0.272 - 0.272 * (1 - e), 0.534 - 0.534 * (1 - e), 0.131 + 0.869 * (1 - e), 0, 0],
                [0, 0, 0, 1, 0],
                [0, 0, 0, 0, 1],
              ];
            },
            grayscale: function (e) {
              return [
                [0.2126 + 0.7874 * (1 - e), 0.7152 - 0.7152 * (1 - e), 0.0722 - 0.0722 * (1 - e), 0, 0],
                [0.2126 - 0.2126 * (1 - e), 0.7152 + 0.2848 * (1 - e), 0.0722 - 0.0722 * (1 - e), 0, 0],
                [0.2126 - 0.2126 * (1 - e), 0.7152 - 0.7152 * (1 - e), 0.0722 + 0.9278 * (1 - e), 0, 0],
                [0, 0, 0, 1, 0],
                [0, 0, 0, 0, 1],
              ];
            },
          };
          function yt(e) {
            return e[1 === e.mode ? "darkSchemeBackgroundColor" : "lightSchemeBackgroundColor"];
          }
          function wt(e) {
            return e[1 === e.mode ? "darkSchemeTextColor" : "lightSchemeTextColor"];
          }
          var _t = new Map();
          function St() {
            _t.clear();
          }
          var kt = ["r", "g", "b", "a"],
            Et = ["mode", "brightness", "contrast", "grayscale", "sepia", "darkSchemeBackgroundColor", "darkSchemeTextColor", "lightSchemeBackgroundColor", "lightSchemeTextColor"];
          function xt(e, t) {
            var r = "";
            return (
              kt.forEach(function (t) {
                r += "".concat(e[t], ";");
              }),
              Et.forEach(function (e) {
                r += "".concat(t[e], ";");
              }),
              r
            );
          }
          function Tt(e, t, r, n, o) {
            var a;
            _t.has(r) ? (a = _t.get(r)) : ((a = new Map()), _t.set(r, a));
            var s = xt(e, t);
            if (a.has(s)) return a.get(s);
            var c = Be(r(Ye(e), null == n ? null : $e(n), null == o ? null : $e(o))),
              u = c.r,
              l = c.g,
              d = c.b,
              f = c.a,
              h = i(bt([u, l, d], gt(t)), 3),
              p = h[0],
              m = h[1],
              g = h[2],
              b = 1 === f ? qe({ r: p, g: m, b: g }) : We({ r: p, g: m, b: g, a: f });
            return (a.set(s, b), b);
          }
          function Mt(e) {
            return e;
          }
          function Ot(e, t) {
            return Tt(e, t, Mt);
          }
          function Ct(e, t) {
            var r = yt(t);
            return Tt(e, t, At, wt(t), r);
          }
          function At(e, t, r) {
            var n = e.h,
              o = e.s,
              a = e.l,
              i = e.a,
              s = a < 0.5,
              c = n,
              u = a;
            return ((s ? a < 0.2 || o < 0.12 : o < 0.24 || (a > 0.8 && n > 200 && n < 280)) && (s ? ((c = t.h), (u = t.s)) : ((c = r.h), (u = r.s))), { h: c, s: u, l: ht(a, 0, 1, t.l, r.l), a: i });
          }
          var Dt = 0.4;
          function It(e, t) {
            var r = e.h,
              n = e.s,
              o = e.l,
              a = e.a,
              i = n < 0.12 || (o > 0.8 && r > 200 && r < 280);
            if (o < 0.5) {
              var s = ht(o, 0, 0.5, 0, Dt);
              return i ? { h: t.h, s: t.s, l: s, a } : { h: r, s: n, l: s, a };
            }
            var c = ht(o, 0.5, 1, Dt, t.l);
            if (i) return { h: t.h, s: t.s, l: c, a };
            var u = r;
            return (r > 60 && r < 180 && (u = r > 120 ? ht(r, 120, 180, 135, 180) : ht(r, 60, 120, 60, 105)), u > 40 && u < 80 && (c *= 0.75), { h: u, s: n, l: c, a });
          }
          function Pt(e, t) {
            if (0 === t.mode) return Ct(e, t);
            var n = yt(t);
            return Tt(e, r(r({}, t), { mode: 0 }), It, n);
          }
          var Lt,
            jt = 0.55;
          function Rt(e) {
            return ht(e, 205, 245, 205, 220);
          }
          function Nt(e, t) {
            var r = e.h,
              n = e.s,
              o = e.l,
              a = e.a,
              i = o < 0.2 || n < 0.24,
              s = !i && r > 205 && r < 245;
            if (o > 0.5) {
              var c = ht(o, 0.5, 1, jt, t.l);
              if (i) return { h: t.h, s: t.s, l: c, a };
              var u = r;
              return (s && (u = Rt(r)), { h: u, s: n, l: c, a });
            }
            if (i) return { h: t.h, s: t.s, l: ht(o, 0, 0.5, t.l, jt), a };
            var l,
              d = r;
            return (s ? ((d = Rt(r)), (l = ht(o, 0, 0.5, t.l, Math.min(1, jt + 0.05)))) : (l = ht(o, 0, 0.5, t.l, jt)), { h: d, s: n, l, a });
          }
          function Vt(e, t) {
            if (0 === t.mode) return Ct(e, t);
            var n = wt(t);
            return Tt(e, r(r({}, t), { mode: 0 }), Nt, n);
          }
          function Ft(e, t, r) {
            var n = e.h,
              o = e.s,
              a = e.l,
              i = e.a,
              s = n,
              c = o;
            return ((a < 0.2 || o < 0.24) && (a < 0.5 ? ((s = t.h), (c = t.s)) : ((s = r.h), (c = r.s))), { h: s, s: c, l: ht(a, 0, 1, 0.5, 0.2), a: i });
          }
          function $t(e, t) {
            if (0 === t.mode) return Ct(e, t);
            var n = wt(t),
              o = yt(t);
            return Tt(e, r(r({}, t), { mode: 0 }), Ft, n, o);
          }
          function Ut(e, t) {
            return Pt(e, t);
          }
          function Bt(e, t) {
            return Pt(e, t);
          }
          function Yt(e) {
            var t = [];
            return (t.push('*:not(pre, pre *, code, .far, .fa, .glyphicon, [class*="vjs-"], .fab, .fa-github, .fas, .material-icons, .icofont, .typcn, mu, [class*="mu-"], .glyphicon, .icon) {'), e.useFont && e.fontFamily && t.push("  font-family: ".concat(e.fontFamily, " !important;")), e.textStroke > 0 && (t.push("  -webkit-text-stroke: ".concat(e.textStroke, "px !important;")), t.push("  text-stroke: ".concat(e.textStroke, "px !important;"))), t.push("}"), t.join("\n"));
          }
          function Ht(e) {
            var t = [];
            return (e.mode === Lt.dark && t.push("invert(100%) hue-rotate(180deg)"), 100 !== e.brightness && t.push("brightness(".concat(e.brightness, "%)")), 100 !== e.contrast && t.push("contrast(".concat(e.contrast, "%)")), 0 !== e.grayscale && t.push("grayscale(".concat(e.grayscale, "%)")), 0 !== e.sepia && t.push("sepia(".concat(e.sepia, "%)")), 0 === t.length ? null : t.join(" "));
          }
          function Wt(e) {
            return e
              .slice(0, 4)
              .map(function (e) {
                return e
                  .map(function (e) {
                    return e.toFixed(3);
                  })
                  .join(" ");
              })
              .join(" ");
          }
          function qt(e) {
            return Wt(gt(e));
          }
          !(function (e) {
            ((e[(e.light = 0)] = "light"), (e[(e.dark = 1)] = "dark"));
          })(Lt || (Lt = {}));
          var Gt = 0,
            zt = new Map(),
            Kt = new Map();
          function Qt(e) {
            return n(this, void 0, void 0, function () {
              return o(this, function (r) {
                return [
                  2,
                  new Promise(function (r, n) {
                    var o = ++Gt;
                    (zt.set(o, r), Kt.set(o, n), chrome.runtime.sendMessage({ type: t.CS_FETCH, data: e, id: o }));
                  }),
                ];
              });
            });
          }
          chrome.runtime.onMessage.addListener(function (e) {
            var r = e.type,
              n = e.data,
              o = e.error,
              a = e.id;
            if (r === t.BG_FETCH_RESPONSE) {
              var i = zt.get(a),
                s = Kt.get(a);
              (zt.delete(a), Kt.delete(a), o ? s && s(o) : i && i(n));
            }
          });
          var Zt = new ((function () {
            function e() {
              ((this.queue = []), (this.timerId = null), (this.frameDuration = 1e3 / 60));
            }
            return (
              (e.prototype.addToQueue = function (e) {
                (this.queue.push(e), this.startQueue());
              }),
              (e.prototype.stopQueue = function () {
                (null !== this.timerId && (cancelAnimationFrame(this.timerId), (this.timerId = null)), (this.queue = []));
              }),
              (e.prototype.startQueue = function () {
                var e = this;
                this.timerId ||
                  (this.timerId = requestAnimationFrame(function () {
                    e.timerId = null;
                    for (var t, r = Date.now(); (t = e.queue.shift()); )
                      if ((t(), Date.now() - r >= e.frameDuration)) {
                        e.startQueue();
                        break;
                      }
                  }));
              }),
              e
            );
          })())();
          function Xt(e) {
            return n(this, void 0, void 0, function () {
              var t = this;
              return o(this, function (a) {
                return [
                  2,
                  new Promise(function (a, i) {
                    return n(t, void 0, void 0, function () {
                      var t, n, s, c;
                      return o(this, function (o) {
                        switch (o.label) {
                          case 0:
                            return e.startsWith("data:") ? ((t = e), [3, 4]) : [3, 1];
                          case 1:
                            return (o.trys.push([1, 3, , 4]), [4, Jt(e)]);
                          case 2:
                            return ((t = o.sent()), [3, 4]);
                          case 3:
                            return ((n = o.sent()), i(n), [2]);
                          case 4:
                            return (o.trys.push([4, 6, , 7]), [4, er(t)]);
                          case 5:
                            return (
                              (s = o.sent()),
                              Zt.addToQueue(function () {
                                a(r({ src: e, dataURL: t, width: s.naturalWidth, height: s.naturalHeight }, sr(s)));
                              }),
                              [3, 7]
                            );
                          case 6:
                            return ((c = o.sent()), i(c), [3, 7]);
                          case 7:
                            return [2];
                        }
                      });
                    });
                  }),
                ];
              });
            });
          }
          function Jt(e) {
            return n(this, void 0, void 0, function () {
              return o(this, function (t) {
                switch (t.label) {
                  case 0:
                    return new URL(e).origin !== location.origin ? [3, 2] : [4, k(e)];
                  case 1:
                  case 3:
                    return [2, t.sent()];
                  case 2:
                    return [4, Qt({ url: e, responseType: "data-url" })];
                }
              });
            });
          }
          function er(e) {
            return n(this, void 0, void 0, function () {
              return o(this, function (t) {
                return [
                  2,
                  new Promise(function (t, r) {
                    var n = new Image();
                    ((n.onload = function () {
                      return t(n);
                    }),
                      (n.onerror = function () {
                        return r("Unable to load image ".concat(e));
                      }),
                      (n.src = e));
                  }),
                ];
              });
            });
          }
          var tr,
            rr,
            nr = 1024;
          function or() {
            var e = nr,
              t = nr;
            (((tr = document.createElement("canvas")).width = e), (tr.height = t), ((rr = tr.getContext("2d")).imageSmoothingEnabled = !1));
          }
          function ar() {
            ((tr = null), (rr = null));
          }
          var ir = 5242880;
          function sr(e) {
            tr || or();
            var t = e.naturalWidth,
              r = e.naturalHeight;
            if (0 === r || 0 === t) return (Y("logWarn(Image is empty ".concat(e.currentSrc, ")")), null);
            if (t * r * 4 > ir) return { isDark: !1, isLight: !1, isTransparent: !1, isLarge: !1, isTooLarge: !0 };
            var n = t * r,
              o = Math.min(1, Math.sqrt(nr / n)),
              a = Math.ceil(t * o),
              i = Math.ceil(r * o);
            (rr.clearRect(0, 0, a, i), rr.drawImage(e, 0, 0, t, r, 0, 0, a, i));
            var s,
              c,
              u,
              l,
              d,
              f,
              h,
              p = rr.getImageData(0, 0, a, i).data,
              m = 0.05,
              g = 0.4,
              b = 0.7,
              v = 0,
              y = 0,
              w = 0;
            for (u = 0; u < i; u++) for (c = 0; c < a; c++) ((l = p[0 + (s = 4 * (u * a + c))]), (d = p[s + 1]), (f = p[s + 2]), p[s + 3] / 255 < m ? v++ : ((h = ft(l, d, f)) < g && y++, h > b && w++));
            var _ = a * i,
              S = _ - v;
            return { isDark: y / S >= 0.7, isLight: w / S >= 0.7, isTransparent: v / _ >= 0.1, isLarge: n >= 48e4, isTooLarge: !1 };
          }
          function cr(e, t) {
            var r = e.dataURL,
              n = e.width,
              o = e.height,
              a = qt(t),
              i = ['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'.concat(n, '" height="').concat(o, '">'), "<defs>", '<filter id="darkreader-image-filter">', '<feColorMatrix type="matrix" values="'.concat(a, '" />'), "</filter>", "</defs>", '<image width="'.concat(n, '" height="').concat(o, '" filter="url(#darkreader-image-filter)" xlink:href="').concat(r, '" />'), "</svg>"].join("");
            return "data:image/svg+xml;base64,".concat(btoa(i));
          }
          function ur() {
            (Zt && Zt.stopQueue(), ar());
          }
          var lr = "gradient".length,
            dr = "conic-",
            fr = dr.length,
            hr = "radial-",
            pr = "linear-";
          function mr(e) {
            for (
              var t = [],
                r = 0,
                n = dr.length,
                o = function () {
                  var o;
                  if (
                    ([pr, hr, dr].find(function (t) {
                      if (r - t.length >= 0 && e.substring(r - t.length, r) === t) return "repeating" === e.slice(r - t.length - 10, r - t.length - 1) ? ((o = "repeating-".concat(t, "gradient")), !0) : "-webkit" === e.slice(r - t.length - 8, r - t.length - 1) ? ((o = "-webkit-".concat(t, "gradient")), !0) : ((o = "".concat(t, "gradient")), !0);
                    }),
                    !o)
                  )
                    return "break";
                  var a = Re(e, r + lr),
                    i = a.start,
                    s = a.end,
                    c = e.substring(i + 1, s - 1);
                  ((n = s + 1 + fr), t.push({ typeGradient: o, match: c, offset: o.length + 2, index: r - o.length + lr, hasComma: !0 }));
                };
              -1 !== (r = e.indexOf("gradient", n)) && "break" !== o();
            );
            return (t.length && (t[t.length - 1].hasComma = !1), t);
          }
          function gr(e, t) {
            return Boolean(e && e.getPropertyPriority(t));
          }
          function br(e, t, r, n, o, a) {
            if (e.startsWith("--")) {
              if ((i = Ir(n, e, t, r, o, a))) return { property: e, value: i, important: gr(r.style, e), sourceValue: t };
            } else if (t.includes("var(")) {
              if ((i = Pr(n, e, t))) return { property: e, value: i, important: gr(r.style, e), sourceValue: t };
            } else {
              if ("color-scheme" === e) return null;
              if ((e.includes("color") && "-webkit-print-color-adjust" !== e) || "fill" === e || "stroke" === e || "stop-color" === e) {
                if ((i = xr(e, t, r))) return { property: e, value: i, important: gr(r.style, e), sourceValue: t };
              } else if ("background-image" === e || "list-style-image" === e) {
                if ((i = Cr(t, r, o, a))) return { property: e, value: i, important: gr(r.style, e), sourceValue: t };
              } else if (e.includes("shadow")) {
                var i;
                if ((i = Dr(t))) return { property: e, value: i, important: gr(r.style, e), sourceValue: t };
              }
            }
            return null;
          }
          function vr() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return e.filter(Boolean).join(", ");
          }
          function yr(e, t, r) {
            var n = [];
            (t || (n.push("html {"), n.push("    background-color: ".concat(Pt({ r: 255, g: 255, b: 255 }, e), " !important;")), n.push("}")), _ && (n.push("html {"), n.push("    color-scheme: ".concat(1 === e.mode ? "dark" : "dark light", " !important;")), n.push("}")));
            var o = vr(t ? "" : "html, body", r ? "input, textarea, select, button, dialog" : "");
            return (
              o && (n.push("".concat(o, " {")), n.push("    background-color: ".concat(Pt({ r: 255, g: 255, b: 255 }, e), ";")), n.push("}")),
              n.push("".concat(vr("html, body", r ? "input, textarea, select, button" : ""), " {")),
              n.push("    border-color: ".concat($t({ r: 76, g: 76, b: 76 }, e), ";")),
              n.push("    color: ".concat(Vt({ r: 0, g: 0, b: 0 }, e), ";")),
              n.push("}"),
              n.push("a {"),
              n.push("    color: ".concat(Vt({ r: 0, g: 64, b: 255 }, e), ";")),
              n.push("}"),
              n.push("table {"),
              n.push("    border-color: ".concat($t({ r: 128, g: 128, b: 128 }, e), ";")),
              n.push("}"),
              n.push("::placeholder {"),
              n.push("    color: ".concat(Vt({ r: 169, g: 169, b: 169 }, e), ";")),
              n.push("}"),
              n.push("input:-webkit-autofill,"),
              n.push("textarea:-webkit-autofill,"),
              n.push("select:-webkit-autofill {"),
              n.push("    background-color: ".concat(Pt({ r: 250, g: 255, b: 189 }, e), " !important;")),
              n.push("    color: ".concat(Vt({ r: 0, g: 0, b: 0 }, e), " !important;")),
              n.push("}"),
              e.scrollbarColor && n.push(Sr(e)),
              e.selectionColor && n.push(_r(e)),
              n.join("\n")
            );
          }
          function wr(e) {
            var t, n;
            if ("auto" === e.selectionColor) ((t = Pt({ r: 0, g: 96, b: 212 }, r(r({}, e), { grayscale: 0 }))), (n = Vt({ r: 255, g: 255, b: 255 }, r(r({}, e), { grayscale: 0 }))));
            else {
              var o = Ye(Fe(e.selectionColor));
              ((t = e.selectionColor), (n = o.l < 0.5 ? "#FFF" : "#000"));
            }
            return { backgroundColorSelection: t, foregroundColorSelection: n };
          }
          function _r(e) {
            var t = [],
              r = wr(e),
              n = r.backgroundColorSelection,
              o = r.foregroundColorSelection;
            return (
              ["::selection", "::-moz-selection"].forEach(function (e) {
                (t.push("".concat(e, " {")), t.push("    background-color: ".concat(n, " !important;")), t.push("    color: ".concat(o, " !important;")), t.push("}"));
              }),
              t.join("\n")
            );
          }
          function Sr(e) {
            var t,
              n,
              o,
              a,
              i,
              s,
              c = [];
            if ("auto" === e.scrollbarColor) ((t = Pt({ r: 241, g: 241, b: 241 }, e)), (n = Vt({ r: 96, g: 96, b: 96 }, e)), (o = Pt({ r: 176, g: 176, b: 176 }, e)), (a = Pt({ r: 144, g: 144, b: 144 }, e)), (i = Pt({ r: 96, g: 96, b: 96 }, e)), (s = Pt({ r: 255, g: 255, b: 255 }, e)));
            else {
              var u = Ye(Fe(e.scrollbarColor)),
                l = u.l > 0.5,
                d = function (e) {
                  return r(r({}, u), { l: pt(u.l + e, 0, 1) });
                },
                f = function (e) {
                  return r(r({}, u), { l: pt(u.l - e, 0, 1) });
                };
              ((t = Ge(f(0.4))), (n = Ge(l ? f(0.4) : d(0.4))), (o = Ge(u)), (a = Ge(d(0.1))), (i = Ge(d(0.2))));
            }
            return (c.push("::-webkit-scrollbar {"), c.push("    background-color: ".concat(t, ";")), c.push("    color: ".concat(n, ";")), c.push("}"), c.push("::-webkit-scrollbar-thumb {"), c.push("    background-color: ".concat(o, ";")), c.push("}"), c.push("::-webkit-scrollbar-thumb:hover {"), c.push("    background-color: ".concat(a, ";")), c.push("}"), c.push("::-webkit-scrollbar-thumb:active {"), c.push("    background-color: ".concat(i, ";")), c.push("}"), c.push("::-webkit-scrollbar-corner {"), c.push("    background-color: ".concat(s, ";")), c.push("}"), h && (c.push("* {"), c.push("    scrollbar-color: ".concat(o, " ").concat(t, ";")), c.push("}")), c.join("\n"));
          }
          function kr(e, t) {
            var r = t.strict,
              n = [],
              o = ["microsoft.com", "docs.microsoft.com"].includes(location.hostname);
            return (n.push("html, body, ".concat(r ? "body :not(iframe)".concat(o ? ':not(div[style^="position:absolute;top:0;left:-"]' : "") : "body > :not(iframe)", " {")), n.push("    background-color: ".concat(Pt({ r: 255, g: 255, b: 255 }, e), " !important;")), n.push("    border-color: ".concat($t({ r: 64, g: 64, b: 64 }, e), " !important;")), n.push("    color: ".concat(Vt({ r: 0, g: 0, b: 0 }, e), " !important;")), n.push("}"), n.join("\n"));
          }
          var Er = new Set(["inherit", "transparent", "initial", "currentcolor", "none", "unset"]);
          function xr(e, t, r) {
            if (Er.has(t.toLowerCase())) return t;
            var n = Fe(t);
            return n
              ? e.includes("background")
                ? (r.style.webkitMaskImage && "none" !== r.style.webkitMaskImage) || (r.style.webkitMask && !r.style.webkitMask.startsWith("none")) || (r.style.mask && "none" !== r.style.mask) || (r.style.getPropertyValue("mask-image") && "none" !== r.style.getPropertyValue("mask-image"))
                  ? function (e) {
                      return Vt(n, e);
                    }
                  : function (e) {
                      return Pt(n, e);
                    }
                : e.includes("border") || e.includes("outline")
                  ? function (e) {
                      return $t(n, e);
                    }
                  : function (e) {
                      return Vt(n, e);
                    }
              : null;
          }
          var Tr = new Map(),
            Mr = new Map();
          function Or(e, t) {
            if (!e || 0 === t.length) return !1;
            if (
              t.some(function (e) {
                return "*" === e;
              })
            )
              return !0;
            for (
              var r = e.split(/,\s*/g),
                n = function (e) {
                  var n = t[e];
                  if (
                    r.some(function (e) {
                      return e === n;
                    })
                  )
                    return { value: !0 };
                },
                o = 0;
              o < t.length;
              o++
            ) {
              var a = n(o);
              if ("object" == typeof a) return a.value;
            }
            return !1;
          }
          function Cr(e, t, a, i) {
            var s = this;
            try {
              var c = mr(e),
                u = Le(Se, e);
              if (0 === u.length && 0 === c.length) return e;
              var l = function (t) {
                  var r = 0;
                  return t.map(function (t) {
                    var n = e.indexOf(t, r);
                    return ((r = n + t.length), { match: t, index: n });
                  });
                },
                d = c
                  .map(function (e) {
                    return r({ type: "gradient" }, e);
                  })
                  .concat(
                    l(u).map(function (e) {
                      return r({ type: "url", offset: 0 }, e);
                    }),
                  )
                  .sort(function (e, t) {
                    return e.index > t.index ? 1 : -1;
                  }),
                f = function (e) {
                  var t = e.typeGradient,
                    r = e.match,
                    n = e.hasComma,
                    o = /^(from|color-stop|to)\(([^\(\)]*?,\s*)?(.*?)\)$/,
                    a = Le(/([^\(\),]+(\([^\(\)]*(\([^\(\)]*\)*[^\(\)]*)?\))?([^\(\), ]|( (?!calc)))*),?/g, r, 1).map(function (e) {
                      var t = Fe((e = e.trim()));
                      if (t)
                        return function (e) {
                          return Bt(t, e);
                        };
                      var r = e.lastIndexOf(" ");
                      if ((t = Fe(e.substring(0, r))))
                        return function (n) {
                          return "".concat(Bt(t, n), " ").concat(e.substring(r + 1));
                        };
                      var n = e.match(o);
                      return n && (t = Fe(n[3]))
                        ? function (e) {
                            return ""
                              .concat(n[1], "(")
                              .concat(n[2] ? "".concat(n[2], ", ") : "")
                              .concat(Bt(t, e), ")");
                          }
                        : function () {
                            return e;
                          };
                    });
                  return function (e) {
                    return ""
                      .concat(t, "(")
                      .concat(
                        a
                          .map(function (t) {
                            return t(e);
                          })
                          .join(", "),
                        ")",
                      )
                      .concat(n ? ", " : "");
                  };
                },
                h = function (e) {
                  var r;
                  if (Or(t.selectorText, a)) return null;
                  var c = Ee(e),
                    u = 0 === c.length,
                    l = t.parentStyleSheet,
                    d = l && l.href ? xe(l.href) : (null === (r = l.ownerNode) || void 0 === r ? void 0 : r.baseURI) || location.origin;
                  c = ge(d, c);
                  var f = 'url("'.concat(c, '")');
                  return function (e) {
                    return n(s, void 0, void 0, function () {
                      var t, r;
                      return o(this, function (n) {
                        switch (n.label) {
                          case 0:
                            return u ? [2, "url('')"] : Tr.has(c) ? ((t = Tr.get(c)), [3, 7]) : [3, 1];
                          case 1:
                            return (
                              n.trys.push([1, 6, , 7]),
                              Mr.has(c)
                                ? ((r = Mr.get(c)),
                                  [
                                    4,
                                    new Promise(function (e) {
                                      return r.push(e);
                                    }),
                                  ])
                                : [3, 3]
                            );
                          case 2:
                            return (t = n.sent()) ? [3, 5] : [2, null];
                          case 3:
                            return (Mr.set(c, []), [4, Xt(c)]);
                          case 4:
                            ((t = n.sent()),
                              Tr.set(c, t),
                              Mr.get(c).forEach(function (e) {
                                return e(t);
                              }),
                              Mr.delete(c),
                              (n.label = 5));
                          case 5:
                            return i() ? [2, null] : [3, 7];
                          case 6:
                            return (
                              Y(n.sent()),
                              Mr.has(c) &&
                                (Mr.get(c).forEach(function (e) {
                                  return e(null);
                                }),
                                Mr.delete(c)),
                              [2, f]
                            );
                          case 7:
                            return [2, p(t, e) || f];
                        }
                      });
                    });
                  };
                },
                p = function (e, t) {
                  var n,
                    o = e.isDark,
                    a = e.isLight,
                    i = e.isTransparent,
                    s = e.isLarge,
                    c = e.isTooLarge,
                    u = e.width;
                  if (c) n = 'url("'.concat(e.src, '")');
                  else if (o && i && 1 === t.mode && !s && u > 2) {
                    B("Inverting dark image ".concat(e.src));
                    var l = cr(e, r(r({}, t), { sepia: pt(t.sepia + 10, 0, 100) }));
                    n = 'url("'.concat(l, '")');
                  } else if (a && !i && 1 === t.mode)
                    if (s) n = "none";
                    else {
                      B("Dimming light image ".concat(e.src));
                      var d = cr(e, t);
                      n = 'url("'.concat(d, '")');
                    }
                  else if (0 === t.mode && a && !s) {
                    B("Applying filter to image ".concat(e.src));
                    var f = cr(e, r(r({}, t), { brightness: pt(t.brightness - 10, 5, 200), sepia: pt(t.sepia + 10, 0, 100) }));
                    n = 'url("'.concat(f, '")');
                  } else n = null;
                  return n;
                },
                m = [],
                g = 0,
                b = !1;
              return (
                d.forEach(function (t, r) {
                  var n = t.type,
                    o = t.match,
                    a = t.index,
                    i = t.typeGradient,
                    s = t.hasComma,
                    c = t.offset,
                    u = a,
                    l = g,
                    p = u + o.length + c;
                  ((g = p),
                    l !== u &&
                      (b
                        ? m.push(function () {
                            var t = e.substring(l, u);
                            return ("," === t[0] && (t = t.substring(1)), t);
                          })
                        : m.push(function () {
                            return e.substring(l, u);
                          })),
                    (b = s || !1),
                    "url" === n ? m.push(h(o)) : "gradient" === n && m.push(f({ match: o, index: a, typeGradient: i, hasComma: s, offset: c })),
                    r === d.length - 1 &&
                      m.push(function () {
                        return e.substring(p);
                      }));
                }),
                function (e) {
                  var t = m.filter(Boolean).map(function (t) {
                    return t(e);
                  });
                  if (
                    t.some(function (e) {
                      return e instanceof Promise;
                    })
                  )
                    return Promise.all(t).then(function (e) {
                      return e.filter(Boolean).join("");
                    });
                  var r = t.join("");
                  return r.endsWith(", initial") ? r.slice(0, -9) : r;
                }
              );
            } catch (e) {
              return null;
            }
          }
          function Ar(e) {
            try {
              var t = 0,
                r = Le(/(^|\s)(?!calc)([a-z]+\(.+?\)|#[0-9a-f]+|[a-z]+)(.*?(inset|outset)?($|,))/gi, e, 2),
                n = 0,
                o = r.map(function (o, a) {
                  var i = t,
                    s = e.indexOf(o, t),
                    c = s + o.length;
                  t = c;
                  var u = Fe(o);
                  return u
                    ? function (t) {
                        return ""
                          .concat(e.substring(i, s))
                          .concat(Ut(u, t))
                          .concat(a === r.length - 1 ? e.substring(c) : "");
                      }
                    : (n++,
                      function () {
                        return e.substring(i, c);
                      });
                });
              return function (e) {
                var t = o
                  .map(function (t) {
                    return t(e);
                  })
                  .join("");
                return { matchesLength: r.length, unparseableMatchesLength: n, result: t };
              };
            } catch (e) {
              return null;
            }
          }
          function Dr(e) {
            var t = Ar(e);
            return t
              ? function (e) {
                  return t(e).result;
                }
              : null;
          }
          function Ir(e, t, r, n, o, a) {
            return e.getModifierForVariable({ varName: t, sourceValue: r, rule: n, ignoredImgSelectors: o, isCancelled: a });
          }
          function Pr(e, t, r) {
            return e.getModifierForVarDependant(t, r);
          }
          function Lr() {
            (St(), Tr.clear(), ur(), Mr.clear());
          }
          var jr = 1,
            Rr = 2,
            Nr = 4,
            Vr = 8,
            Fr = new ((function () {
              function e() {
                ((this.varTypes = new Map()), (this.rulesQueue = []), (this.definedVars = new Set()), (this.varRefs = new Map()), (this.unknownColorVars = new Set()), (this.unknownBgVars = new Set()), (this.undefinedVars = new Set()), (this.initialVarTypes = new Map()), (this.changedTypeVars = new Set()), (this.typeChangeSubscriptions = new Map()), (this.unstableVarValues = new Map()));
              }
              return (
                (e.prototype.clear = function () {
                  (this.varTypes.clear(), this.rulesQueue.splice(0), this.definedVars.clear(), this.varRefs.clear(), this.unknownColorVars.clear(), this.unknownBgVars.clear(), this.undefinedVars.clear(), this.initialVarTypes.clear(), this.changedTypeVars.clear(), this.typeChangeSubscriptions.clear(), this.unstableVarValues.clear());
                }),
                (e.prototype.isVarType = function (e, t) {
                  return this.varTypes.has(e) && (this.varTypes.get(e) & t) > 0;
                }),
                (e.prototype.addRulesForMatching = function (e) {
                  this.rulesQueue.push(e);
                }),
                (e.prototype.matchVariablesAndDependants = function () {
                  var e = this;
                  (this.changedTypeVars.clear(),
                    (this.initialVarTypes = new Map(this.varTypes)),
                    this.collectRootVariables(),
                    this.collectVariablesAndVarDep(this.rulesQueue),
                    this.rulesQueue.splice(0),
                    this.collectRootVarDependants(),
                    this.varRefs.forEach(function (t, r) {
                      t.forEach(function (t) {
                        e.varTypes.has(r) && e.resolveVariableType(t, e.varTypes.get(r));
                      });
                    }),
                    this.unknownColorVars.forEach(function (t) {
                      e.unknownBgVars.has(t) ? (e.unknownColorVars.delete(t), e.unknownBgVars.delete(t), e.resolveVariableType(t, jr)) : e.isVarType(t, jr | Rr | Nr) ? e.unknownColorVars.delete(t) : e.undefinedVars.add(t);
                    }),
                    this.unknownBgVars.forEach(function (t) {
                      null !=
                      e.findVarRef(t, function (t) {
                        return e.unknownColorVars.has(t) || e.isVarType(t, Rr | Nr);
                      })
                        ? e.itarateVarRefs(t, function (t) {
                            e.resolveVariableType(t, jr);
                          })
                        : e.isVarType(t, jr | Vr)
                          ? e.unknownBgVars.delete(t)
                          : e.undefinedVars.add(t);
                    }),
                    this.changedTypeVars.forEach(function (t) {
                      e.typeChangeSubscriptions.has(t) &&
                        e.typeChangeSubscriptions.get(t).forEach(function (e) {
                          e();
                        });
                    }),
                    this.changedTypeVars.clear());
                }),
                (e.prototype.getModifierForVariable = function (e) {
                  var t = this;
                  return function (r) {
                    var n = e.varName,
                      o = e.sourceValue,
                      a = e.rule,
                      i = e.ignoredImgSelectors,
                      s = e.isCancelled,
                      c = function () {
                        var e = [],
                          c = function (a, i, s) {
                            if (t.isVarType(n, a)) {
                              var c,
                                u = i(n);
                              if (Zr(o))
                                if (Xr(o)) {
                                  var l = sn(o, t.unstableVarValues);
                                  (l || (l = a === jr ? "#ffffff" : "#000000"), (c = s(l, r)));
                                } else
                                  c = Hr(
                                    o,
                                    function (e) {
                                      return i(e);
                                    },
                                    function (e) {
                                      return s(e, r);
                                    },
                                  );
                              else c = s(o, r);
                              e.push({ property: u, value: c });
                            }
                          };
                        if ((c(jr, qr, nn), c(Rr, Gr, on), c(Nr, zr, an), t.isVarType(n, Vr))) {
                          var u = Kr(n),
                            l = o;
                          Zr(o) &&
                            (l = Hr(
                              o,
                              function (e) {
                                return qr(e);
                              },
                              function (e) {
                                return nn(e, r);
                              },
                            ));
                          var d = Cr(l, a, i, s);
                          ((l = "function" == typeof d ? d(r) : d), e.push({ property: u, value: l }));
                        }
                        return e;
                      },
                      u = new Set(),
                      l = function (e) {
                        var r = function () {
                          var t = c();
                          e(t);
                        };
                        (u.add(r), t.subscribeForVarTypeChange(n, r));
                      },
                      d = function () {
                        u.forEach(function (e) {
                          t.unsubscribeFromVariableTypeChanges(n, e);
                        });
                      };
                    return { declarations: c(), onTypeChange: { addListener: l, removeListeners: d } };
                  };
                }),
                (e.prototype.getModifierForVarDependant = function (e, t) {
                  var r = this;
                  if (t.match(/^\s*(rgb|hsl)a?\(/)) {
                    var n = e.startsWith("background"),
                      o = Jr(e);
                    return function (e) {
                      var a = sn(t, r.unstableVarValues);
                      return (a || (a = n ? "#ffffff" : "#000000"), (n ? nn : o ? on : an)(a, e));
                    };
                  }
                  return "background-color" === e
                    ? function (e) {
                        return Hr(
                          t,
                          function (e) {
                            return qr(e);
                          },
                          function (t) {
                            return nn(t, e);
                          },
                        );
                      }
                    : Jr(e)
                      ? function (e) {
                          return Hr(
                            t,
                            function (e) {
                              return Gr(e);
                            },
                            function (t) {
                              return on(t, e);
                            },
                          );
                        }
                      : "background" === e || "background-image" === e || "box-shadow" === e
                        ? function (n) {
                            var o = new Set(),
                              a = function () {
                                var a = Hr(
                                  t,
                                  function (e) {
                                    return r.isVarType(e, jr) ? qr(e) : r.isVarType(e, Vr) ? Kr(e) : (o.add(e), e);
                                  },
                                  function (e) {
                                    return nn(e, n);
                                  },
                                );
                                if ("box-shadow" === e) {
                                  var i = Ar(a)(n);
                                  if (i.unparseableMatchesLength !== i.matchesLength) return i.result;
                                }
                                return a;
                              },
                              i = a();
                            return o.size > 0
                              ? new Promise(function (e) {
                                  var t = o.values().next().value,
                                    n = function () {
                                      r.unsubscribeFromVariableTypeChanges(t, n);
                                      var o = a();
                                      e(o);
                                    };
                                  r.subscribeForVarTypeChange(t, n);
                                })
                              : i;
                          }
                        : e.startsWith("border") || e.startsWith("outline")
                          ? function (e) {
                              return Hr(
                                t,
                                function (e) {
                                  return zr(e);
                                },
                                function (t) {
                                  return an(t, e);
                                },
                              );
                            }
                          : null;
                }),
                (e.prototype.subscribeForVarTypeChange = function (e, t) {
                  this.typeChangeSubscriptions.has(e) || this.typeChangeSubscriptions.set(e, new Set());
                  var r = this.typeChangeSubscriptions.get(e);
                  r.has(t) || r.add(t);
                }),
                (e.prototype.unsubscribeFromVariableTypeChanges = function (e, t) {
                  this.typeChangeSubscriptions.has(e) && this.typeChangeSubscriptions.get(e).delete(t);
                }),
                (e.prototype.collectVariablesAndVarDep = function (e) {
                  var t = this;
                  e.forEach(function (e) {
                    ve(e, function (e) {
                      e.style &&
                        _e(e.style, function (e, r) {
                          (Qr(e) && t.inspectVariable(e, r), Zr(r) && t.inspectVarDependant(e, r));
                        });
                    });
                  });
                }),
                (e.prototype.collectRootVariables = function () {
                  var e = this;
                  _e(document.documentElement.style, function (t, r) {
                    Qr(t) && e.inspectVariable(t, r);
                  });
                }),
                (e.prototype.inspectVariable = function (e, t) {
                  (this.unstableVarValues.set(e, t), Zr(t) && Xr(t) && (this.unknownColorVars.add(e), this.definedVars.add(e)), this.definedVars.has(e) || (this.definedVars.add(e), Fe(t) ? this.unknownColorVars.add(e) : (t.includes("url(") || t.includes("linear-gradient(") || t.includes("radial-gradient(")) && this.resolveVariableType(e, Vr)));
                }),
                (e.prototype.resolveVariableType = function (e, t) {
                  var r = this.initialVarTypes.get(e) || 0,
                    n = (this.varTypes.get(e) || 0) | t;
                  (this.varTypes.set(e, n), (n !== r || this.undefinedVars.has(e)) && (this.changedTypeVars.add(e), this.undefinedVars.delete(e)), this.unknownColorVars.delete(e), this.unknownBgVars.delete(e));
                }),
                (e.prototype.collectRootVarDependants = function () {
                  var e = this;
                  _e(document.documentElement.style, function (t, r) {
                    Zr(r) && e.inspectVarDependant(t, r);
                  });
                }),
                (e.prototype.inspectVarDependant = function (e, t) {
                  var r = this;
                  Qr(e)
                    ? this.iterateVarDeps(t, function (t) {
                        (r.varRefs.has(e) || r.varRefs.set(e, new Set()), r.varRefs.get(e).add(t));
                      })
                    : "background-color" === e || "box-shadow" === e
                      ? this.iterateVarDeps(t, function (e) {
                          return r.resolveVariableType(e, jr);
                        })
                      : Jr(e)
                        ? this.iterateVarDeps(t, function (e) {
                            return r.resolveVariableType(e, Rr);
                          })
                        : e.startsWith("border") || e.startsWith("outline")
                          ? this.iterateVarDeps(t, function (e) {
                              return r.resolveVariableType(e, Nr);
                            })
                          : ("background" !== e && "background-image" !== e) ||
                            this.iterateVarDeps(t, function (e) {
                              if (!r.isVarType(e, jr | Vr)) {
                                var t =
                                  null !=
                                  r.findVarRef(e, function (e) {
                                    return r.unknownColorVars.has(e) || r.isVarType(e, Rr | Nr);
                                  });
                                r.itarateVarRefs(e, function (e) {
                                  t ? r.resolveVariableType(e, jr) : r.unknownBgVars.add(e);
                                });
                              }
                            });
                }),
                (e.prototype.iterateVarDeps = function (e, t) {
                  var r = new Set();
                  (Wr(e, function (e) {
                    return r.add(e);
                  }),
                    r.forEach(function (e) {
                      return t(e);
                    }));
                }),
                (e.prototype.findVarRef = function (e, t, r) {
                  var n, o;
                  if ((void 0 === r && (r = new Set()), r.has(e))) return null;
                  if ((r.add(e), t(e))) return e;
                  var i = this.varRefs.get(e);
                  if (!i || 0 === i.size) return null;
                  try {
                    for (var s = a(i), c = s.next(); !c.done; c = s.next()) {
                      var u = c.value,
                        l = this.findVarRef(u, t, r);
                      if (l) return l;
                    }
                  } catch (e) {
                    n = { error: e };
                  } finally {
                    try {
                      c && !c.done && (o = s.return) && o.call(s);
                    } finally {
                      if (n) throw n.error;
                    }
                  }
                  return null;
                }),
                (e.prototype.itarateVarRefs = function (e, t) {
                  this.findVarRef(e, function (e) {
                    return (t(e), !1);
                  });
                }),
                (e.prototype.setOnRootVariableChange = function (e) {
                  this.onRootVariableDefined = e;
                }),
                (e.prototype.putRootVars = function (e, t) {
                  var r,
                    n,
                    o = this,
                    s = e.sheet;
                  s.cssRules.length > 0 && s.deleteRule(0);
                  var c = new Map();
                  _e(document.documentElement.style, function (e, r) {
                    Qr(e) && (o.isVarType(e, jr) && c.set(qr(e), nn(r, t)), o.isVarType(e, Rr) && c.set(Gr(e), on(r, t)), o.isVarType(e, Nr) && c.set(zr(e), an(r, t)), o.subscribeForVarTypeChange(e, o.onRootVariableDefined));
                  });
                  var u = [];
                  u.push(":root {");
                  try {
                    for (var l = a(c), d = l.next(); !d.done; d = l.next()) {
                      var f = i(d.value, 2),
                        h = f[0],
                        p = f[1];
                      u.push("    ".concat(h, ": ").concat(p, ";"));
                    }
                  } catch (e) {
                    r = { error: e };
                  } finally {
                    try {
                      d && !d.done && (n = l.return) && n.call(l);
                    } finally {
                      if (r) throw r.error;
                    }
                  }
                  u.push("}");
                  var m = u.join("\n");
                  s.insertRule(m);
                }),
                e
              );
            })())();
          function $r(e, t) {
            void 0 === t && (t = 0);
            var r = e.indexOf("var(", t);
            if (r >= 0) {
              var n = Re(e, r + 3);
              return n ? { start: r, end: n.end } : null;
            }
          }
          function Ur(e) {
            for (var t, r = [], n = 0; (t = $r(e, n)); ) {
              var o = t.start,
                a = t.end;
              (r.push({ start: o, end: a, value: e.substring(o, a) }), (n = t.end + 1));
            }
            return r;
          }
          function Br(e, t) {
            var r = Ur(e),
              n = r.length;
            if (0 === n) return e;
            var o = e.length,
              a = r.map(function (e) {
                return t(e.value);
              }),
              i = [];
            i.push(e.substring(0, r[0].start));
            for (var s = 0; s < n; s++) {
              i.push(a[s]);
              var c = r[s].end,
                u = s < n - 1 ? r[s + 1].start : o;
              i.push(e.substring(c, u));
            }
            return i.join("");
          }
          function Yr(e) {
            var t,
              r,
              n = e.indexOf(",");
            return (n >= 0 ? ((t = e.substring(4, n).trim()), (r = e.substring(n + 1, e.length - 1).trim())) : ((t = e.substring(4, e.length - 1).trim()), (r = "")), { name: t, fallback: r });
          }
          function Hr(e, t, r) {
            return Br(e, function (e) {
              var n,
                o = Yr(e),
                a = o.name,
                i = o.fallback,
                s = t(a);
              return i ? ((n = Zr(i) ? Hr(i, t, r) : r ? r(i) : i), "var(".concat(s, ", ").concat(n, ")")) : "var(".concat(s, ")");
            });
          }
          function Wr(e, t) {
            Hr(e, function (e) {
              return (t(e), e);
            });
          }
          function qr(e) {
            return "--darkreader-bg".concat(e);
          }
          function Gr(e) {
            return "--darkreader-text".concat(e);
          }
          function zr(e) {
            return "--darkreader-border".concat(e);
          }
          function Kr(e) {
            return "--darkreader-bgimg".concat(e);
          }
          function Qr(e) {
            return e.startsWith("--");
          }
          function Zr(e) {
            return e.includes("var(");
          }
          function Xr(e) {
            return e.match(/^\s*(rgb|hsl)a?\(/);
          }
          function Jr(e) {
            return "color" === e || "caret-color" === e || "-webkit-text-fill-color" === e;
          }
          var en = /^\d{1,3}, ?\d{1,3}, ?\d{1,3}$/;
          function tn(e) {
            if (en.test(e)) {
              var t = e.split(","),
                r = "rgb(";
              return (
                t.forEach(function (e) {
                  r += "".concat(e.trim(), ", ");
                }),
                (r = r.substring(0, r.length - 2)),
                { isRaw: !0, color: (r += ")") }
              );
            }
            return { isRaw: !1, color: e };
          }
          function rn(e, t, r) {
            var n = tn(e),
              o = n.isRaw,
              a = n.color,
              i = Fe(a);
            if (i) {
              var s = r(i, t);
              if (o) {
                var c = Fe(s);
                return c ? "".concat(c.r, ", ").concat(c.g, ", ").concat(c.b) : s;
              }
              return s;
            }
            return a;
          }
          function nn(e, t) {
            return rn(e, t, Pt);
          }
          function on(e, t) {
            return rn(e, t, Vt);
          }
          function an(e, t) {
            return rn(e, t, $t);
          }
          function sn(e, t, r) {
            void 0 === r && (r = new Set());
            var n = !1,
              o = Br(e, function (e) {
                var o = Yr(e),
                  a = o.name,
                  i = o.fallback;
                if (r.has(a)) return ((n = !0), null);
                r.add(a);
                var s = t.get(a) || i,
                  c = null;
                return (s && (c = Zr(s) ? sn(s, t, r) : s), c || ((n = !0), null));
              });
            return n ? null : o;
          }
          var cn = {
              "background-color": { customProp: "--darkreader-inline-bgcolor", cssProp: "background-color", dataAttr: "data-darkreader-inline-bgcolor" },
              "background-image": { customProp: "--darkreader-inline-bgimage", cssProp: "background-image", dataAttr: "data-darkreader-inline-bgimage" },
              "border-color": { customProp: "--darkreader-inline-border", cssProp: "border-color", dataAttr: "data-darkreader-inline-border" },
              "border-bottom-color": { customProp: "--darkreader-inline-border-bottom", cssProp: "border-bottom-color", dataAttr: "data-darkreader-inline-border-bottom" },
              "border-left-color": { customProp: "--darkreader-inline-border-left", cssProp: "border-left-color", dataAttr: "data-darkreader-inline-border-left" },
              "border-right-color": { customProp: "--darkreader-inline-border-right", cssProp: "border-right-color", dataAttr: "data-darkreader-inline-border-right" },
              "border-top-color": { customProp: "--darkreader-inline-border-top", cssProp: "border-top-color", dataAttr: "data-darkreader-inline-border-top" },
              "box-shadow": { customProp: "--darkreader-inline-boxshadow", cssProp: "box-shadow", dataAttr: "data-darkreader-inline-boxshadow" },
              color: { customProp: "--darkreader-inline-color", cssProp: "color", dataAttr: "data-darkreader-inline-color" },
              fill: { customProp: "--darkreader-inline-fill", cssProp: "fill", dataAttr: "data-darkreader-inline-fill" },
              stroke: { customProp: "--darkreader-inline-stroke", cssProp: "stroke", dataAttr: "data-darkreader-inline-stroke" },
              "outline-color": { customProp: "--darkreader-inline-outline", cssProp: "outline-color", dataAttr: "data-darkreader-inline-outline" },
              "stop-color": { customProp: "--darkreader-inline-stopcolor", cssProp: "stop-color", dataAttr: "data-darkreader-inline-stopcolor" },
            },
            un = Object.values(cn),
            ln = {};
          un.forEach(function (e) {
            var t = e.cssProp,
              r = e.customProp;
            return (ln[r] = t);
          });
          var dn = ["style", "fill", "stop-color", "stroke", "bgcolor", "color"],
            fn = dn
              .map(function (e) {
                return "[".concat(e, "]");
              })
              .join(", ");
          function hn() {
            return un
              .map(function (e) {
                var t = e.dataAttr,
                  r = e.customProp,
                  n = e.cssProp;
                return ["[".concat(t, "] {"), "  ".concat(n, ": var(").concat(r, ") !important;"), "}"].join("\n");
              })
              .join("\n");
          }
          function pn(e) {
            var t = [];
            return (e instanceof Element && e.matches(fn) && t.push(e), (e instanceof Element || (v && e instanceof ShadowRoot) || e instanceof Document) && $(t, e.querySelectorAll(fn)), t);
          }
          var mn = new Map(),
            gn = new Map();
          function bn(e, t) {
            (vn(document, e, t),
              K(document.documentElement, function (r) {
                vn(r.shadowRoot, e, t);
              }));
          }
          function vn(e, t, r) {
            mn.has(e) && (mn.get(e).disconnect(), gn.get(e).disconnect());
            var n = new WeakSet();
            function o(e) {
              (pn(e).forEach(function (e) {
                n.has(e) || (n.add(e), t(e));
              }),
                K(e, function (o) {
                  n.has(e) || (n.add(e), r(o.shadowRoot), vn(o.shadowRoot, t, r));
                }));
            }
            var a = fe(e, {
              onMinorMutations: function (e) {
                e.additions.forEach(function (e) {
                  return o(e);
                });
              },
              onHugeMutations: function () {
                o(e);
              },
            });
            mn.set(e, a);
            var c = 0,
              u = null,
              l = q({ seconds: 10 }),
              d = q({ seconds: 2 }),
              f = 50,
              h = [],
              p = null,
              m = H(function (e) {
                e.forEach(function (e) {
                  dn.includes(e.attributeName) && t(e.target);
                });
              }),
              g = new MutationObserver(function (e) {
                if (p) h.push.apply(h, s([], i(e), !1));
                else {
                  c++;
                  var t = Date.now();
                  if (null == u) u = t;
                  else if (c >= f) {
                    if (t - u < l)
                      return (
                        (p = setTimeout(function () {
                          ((u = null), (c = 0), (p = null));
                          var e = h;
                          ((h = []), m(e));
                        }, d)),
                        void h.push.apply(h, s([], i(e), !1))
                      );
                    ((u = t), (c = 1));
                  }
                  m(e);
                }
              });
            (g.observe(e, {
              attributes: !0,
              attributeFilter: dn.concat(
                un.map(function (e) {
                  return e.dataAttr;
                }),
              ),
              subtree: !0,
            }),
              gn.set(e, g));
          }
          function yn() {
            (mn.forEach(function (e) {
              return e.disconnect();
            }),
              gn.forEach(function (e) {
                return e.disconnect();
              }),
              mn.clear(),
              gn.clear());
          }
          var wn = new WeakMap(),
            _n = ["brightness", "contrast", "grayscale", "sepia", "mode"];
          function Sn(e, t) {
            return dn
              .map(function (t) {
                return "".concat(t, '="').concat(e.getAttribute(t), '"');
              })
              .concat(
                _n.map(function (e) {
                  return "".concat(e, '="').concat(t[e], '"');
                }),
              )
              .join(" ");
          }
          function kn(e, t) {
            for (var r = 0, n = t.length; r < n; r++) {
              var o = t[r];
              if (e.matches(o)) return !0;
            }
            return !1;
          }
          function En(e, t, r, n) {
            if (Sn(e, t) !== wn.get(e)) {
              var o = new Set(Object.keys(cn));
              if (r.length > 0 && kn(e, r))
                o.forEach(function (t) {
                  e.removeAttribute(cn[t].dataAttr);
                });
              else {
                if ((e.hasAttribute("bgcolor") && (((c = e.getAttribute("bgcolor")).match(/^[0-9a-f]{3}$/i) || c.match(/^[0-9a-f]{6}$/i)) && (c = "#".concat(c)), u("background-color", "background-color", c)), e.hasAttribute("color") && "mask-icon" !== e.rel && (((c = e.getAttribute("color")).match(/^[0-9a-f]{3}$/i) || c.match(/^[0-9a-f]{6}$/i)) && (c = "#".concat(c)), u("color", "color", c)), e instanceof SVGElement)) {
                  if (e.hasAttribute("fill")) {
                    var a = 32,
                      i = e.getAttribute("fill");
                    if ("none" !== i)
                      if (e instanceof SVGTextElement) u("fill", "color", i);
                      else {
                        var s = function () {
                          var t = e.getBoundingClientRect(),
                            r = t.width,
                            n = t.height;
                          u("fill", r > a || n > a ? "background-color" : "color", i);
                        };
                        te() ? s() : ne(s);
                      }
                  }
                  e.hasAttribute("stop-color") && u("stop-color", "background-color", e.getAttribute("stop-color"));
                }
                if (e.hasAttribute("stroke")) {
                  var c = e.getAttribute("stroke");
                  u("stroke", e instanceof SVGLineElement || e instanceof SVGTextElement ? "border-color" : "color", c);
                }
                (e.style &&
                  _e(e.style, function (t, r) {
                    if ("background-image" !== t || !r.includes("url"))
                      if (cn.hasOwnProperty(t) || (t.startsWith("--") && !ln[t])) u(t, t, r);
                      else {
                        var n = ln[t];
                        if (n && !e.style.getPropertyValue(n) && !e.hasAttribute(n)) {
                          if ("background-color" === n && e.hasAttribute("bgcolor")) return;
                          e.style.setProperty(t, "");
                        }
                      }
                  }),
                  e.style && e instanceof SVGTextElement && e.style.fill && u("fill", "color", e.style.getPropertyValue("fill")),
                  F(o, function (t) {
                    e.removeAttribute(cn[t].dataAttr);
                  }),
                  wn.set(e, Sn(e, t)));
              }
            }
            function u(r, a, i) {
              var s = r.startsWith("--"),
                c = s ? {} : cn[r],
                u = c.customProp,
                l = c.dataAttr,
                d = br(a, i, { style: e.style }, Fr, n, null);
              if (d) {
                var f = d.value;
                ("function" == typeof f && (f = f(t)),
                  s && "object" == typeof f
                    ? f.declarations.forEach(function (t) {
                        var r = t.property,
                          n = t.value;
                        !(n instanceof Promise) && e.style.setProperty(r, n);
                      })
                    : (e.style.setProperty(u, f), e.hasAttribute(l) || e.setAttribute(l, ""), o.delete(r)));
              }
            }
          }
          var xn = "theme-color",
            Tn = 'meta[name="'.concat(xn, '"]'),
            Mn = null,
            On = null;
          function Cn(e, t) {
            var r = Fe((Mn = Mn || e.content));
            r && (e.content = Pt(r, t));
          }
          function An(e) {
            var t = document.querySelector(Tn);
            t
              ? Cn(t, e)
              : (On && On.disconnect(),
                (On = new MutationObserver(function (t) {
                  e: for (var r = 0; r < t.length; r++)
                    for (var n = t[r].addedNodes, o = 0; o < n.length; o++) {
                      var a = n[o];
                      if (a instanceof HTMLMetaElement && a.name === xn) {
                        (On.disconnect(), (On = null), Cn(a, e));
                        break e;
                      }
                    }
                })).observe(document.head, { childList: !0 }));
          }
          function Dn() {
            On && (On.disconnect(), (On = null));
            var e = document.querySelector(Tn);
            e && Mn && (e.content = Mn);
          }
          var In = ["mode", "brightness", "contrast", "grayscale", "sepia", "darkSchemeBackgroundColor", "darkSchemeTextColor", "lightSchemeBackgroundColor", "lightSchemeTextColor"];
          function Pn(e) {
            var t = "";
            return (
              In.forEach(function (r) {
                t += "".concat(r, ":").concat(e[r], ";");
              }),
              t
            );
          }
          var Ln = W();
          function jn() {
            var e = 0,
              t = new Set(),
              r = new Map(),
              n = new Set(),
              o = null,
              a = !1,
              c = !1;
            function u() {
              return a && !c;
            }
            function l(u) {
              var l = u.sourceCSSRules,
                d = u.theme,
                f = u.ignoreImageAnalysis,
                h = u.force,
                p = u.prepareSheet,
                m = u.isAsyncCancelled,
                g = 0 === r.size,
                b = new Set(r.keys()),
                v = Pn(d),
                y = v !== o;
              a && (c = !0);
              var w = [];
              if (
                (ve(
                  l,
                  function (e) {
                    var n = e.cssText,
                      o = !1;
                    if ((b.delete(n), e.parentRule instanceof CSSMediaRule && (n += ";".concat(e.parentRule.media.mediaText)), t.has(n) || (t.add(n), (o = !0)), o)) {
                      g = !0;
                      var a = [];
                      e.style &&
                        _e(e.style, function (t, r) {
                          var n = br(t, r, e, Fr, f, m);
                          n && a.push(n);
                        });
                      var i = null;
                      if (a.length > 0) {
                        var s = e.parentRule;
                        ((i = { selector: e.selectorText, declarations: a, parentRule: s }), w.push(i));
                      }
                      r.set(n, i);
                    } else w.push(r.get(n));
                  },
                  function () {
                    a = !0;
                  },
                ),
                b.forEach(function (e) {
                  (t.delete(e), r.delete(e));
                }),
                (o = v),
                h || g || y)
              ) {
                e++;
                var _ = new Map(),
                  S = new Map(),
                  k = 0,
                  E = 0,
                  x = { rule: null, rules: [], isGroup: !0 },
                  T = new WeakMap();
                (n.forEach(function (e) {
                  return e();
                }),
                  n.clear(),
                  w
                    .filter(function (e) {
                      return e;
                    })
                    .forEach(function (t) {
                      var r = t.selector,
                        o = t.declarations,
                        a = C(t.parentRule),
                        c = { selector: r, declarations: [], isGroup: !1 },
                        u = c.declarations;
                      function l(t, r, n, o) {
                        var a = ++k,
                          i = { property: t, value: null, important: n, asyncKey: a, sourceValue: o };
                        u.push(i);
                        var s = e;
                        r.then(function (t) {
                          t &&
                            !m() &&
                            s === e &&
                            ((i.value = t),
                            Ln.add(function () {
                              m() || s !== e || D(a);
                            }));
                        });
                      }
                      function f(t, r, o, a) {
                        var c = r,
                          d = c.declarations,
                          f = c.onTypeChange,
                          h = ++E,
                          p = e,
                          g = u.length,
                          b = [];
                        if (0 === d.length) {
                          var v = { property: t, value: a, important: o, sourceValue: a, varKey: h };
                          (u.push(v), (b = [v]));
                        }
                        (d.forEach(function (e) {
                          if (e.value instanceof Promise) l(e.property, e.value, o, a);
                          else {
                            var t = { property: e.property, value: e.value, important: o, sourceValue: a, varKey: h };
                            (u.push(t), b.push(t));
                          }
                        }),
                          f.addListener(function (t) {
                            if (!m() && p === e) {
                              var r = t.map(function (e) {
                                  return { property: e.property, value: e.value, important: o, sourceValue: a, varKey: h };
                                }),
                                n = u.indexOf(b[0], g);
                              (u.splice.apply(u, s([n, b.length], i(r), !1)), (b = r), I(h));
                            }
                          }),
                          n.add(function () {
                            return f.removeListeners();
                          }));
                      }
                      (a.rules.push(c),
                        o.forEach(function (e) {
                          var t = e.property,
                            r = e.value,
                            n = e.important,
                            o = e.sourceValue;
                          if ("function" == typeof r) {
                            var a = r(d);
                            a instanceof Promise ? l(t, a, n, o) : t.startsWith("--") ? f(t, a, n, o) : u.push({ property: t, value: a, important: n, sourceValue: o });
                          } else u.push({ property: t, value: r, important: n, sourceValue: o });
                        }));
                    }));
                var M = p();
                A();
              }
              function O(e, t, r) {
                var n = r.selector,
                  o = r.declarations,
                  a = function (e) {
                    var t = e.property,
                      r = e.value,
                      n = e.important,
                      o = e.sourceValue;
                    return ""
                      .concat(t, ": ")
                      .concat(null == r ? o : r)
                      .concat(n ? " !important" : "", ";");
                  },
                  i = "";
                o.forEach(function (e) {
                  i += "".concat(a(e), " ");
                });
                var s = "".concat(n, " { ").concat(i, " }");
                e.insertRule(s, t);
              }
              function C(e) {
                if (null == e) return x;
                if (T.has(e)) return T.get(e);
                var t = { rule: e, rules: [], isGroup: !0 };
                return (T.set(e, t), C(e.parentRule).rules.push(t), t);
              }
              function A() {
                function e(e, t) {
                  var r = e.rule;
                  if (r instanceof CSSMediaRule) {
                    var n = r.media,
                      o = t.cssRules.length;
                    return (t.insertRule("@media ".concat(n.mediaText, " {}"), o), t.cssRules[o]);
                  }
                  return t;
                }
                function t(r, n, o) {
                  r.rules.forEach(function (r) {
                    r.isGroup ? t(r, e(r, n), o) : o(r, n);
                  });
                }
                t(x, M, function (e, t) {
                  var r = t.cssRules.length;
                  (e.declarations.forEach(function (n) {
                    var o = n.asyncKey,
                      a = n.varKey;
                    (null != o && _.set(o, { rule: e, target: t, index: r }), null != a && S.set(a, { rule: e, target: t, index: r }));
                  }),
                    O(t, r, e));
                });
              }
              function D(e) {
                var t = _.get(e),
                  r = t.rule,
                  n = t.target,
                  o = t.index;
                (n.deleteRule(o), O(n, o, r), _.delete(e));
              }
              function I(e) {
                var t = S.get(e),
                  r = t.rule,
                  n = t.target,
                  o = t.index;
                (n.deleteRule(o), O(n, o, r));
              }
            }
            return { modifySheet: l, shouldRebuildStyle: u };
          }
          var Rn = 'style, link[rel*="stylesheet" i]:not([disabled])';
          function Nn(e) {
            if (!e.href) return !1;
            try {
              return "fonts.googleapis.com" === new URL(e.href).hostname;
            } catch (t) {
              return (B("Couldn't construct ".concat(e.href, " as URL")), !1);
            }
          }
          function Vn(e) {
            return (e instanceof HTMLStyleElement || e instanceof SVGStyleElement || (e instanceof HTMLLinkElement && e.rel && e.rel.toLowerCase().includes("stylesheet") && e.href && !e.disabled && (!h || !e.href.startsWith("moz-extension://")) && !Nn(e))) && !e.classList.contains("darkreader") && "print" !== e.media.toLowerCase() && !e.classList.contains("stylus");
          }
          function Fn(e, t, r) {
            return (
              void 0 === t && (t = []),
              void 0 === r && (r = !0),
              Vn(e)
                ? t.push(e)
                : (e instanceof Element || (v && e instanceof ShadowRoot) || e === document) &&
                  (F(e.querySelectorAll(Rn), function (e) {
                    return Fn(e, t, !1);
                  }),
                  r &&
                    K(e, function (e) {
                      return Fn(e.shadowRoot, t, !1);
                    })),
              t
            );
          }
          var $n = new WeakSet(),
            Un = new WeakSet(),
            Bn = !1;
          document.addEventListener("__darkreader__inlineScriptsAllowed", function () {
            Bn = !0;
          });
          var Yn = 0,
            Hn = new Map();
          function Wn() {
            Hn.clear();
          }
          function qn(e, t) {
            for (var r = t.update, a = t.loadingStart, s = t.loadingEnd, c = [], u = e; (u = u.nextElementSibling) && u.matches(".darkreader"); ) c.push(u);
            var l =
                c.find(function (e) {
                  return e.matches(".darkreader--cors") && !Un.has(e);
                }) || null,
              d =
                c.find(function (e) {
                  return e.matches(".darkreader--sync") && !$n.has(e);
                }) || null,
              f = null,
              h = null,
              m = !1,
              g = !0,
              b = jn(),
              v = new MutationObserver(function () {
                r();
              }),
              y = { attributes: !0, childList: !0, subtree: !0, characterData: !0 };
            function w() {
              return e instanceof HTMLStyleElement && e.textContent.trim().match(ke);
            }
            function _(e, t) {
              var r = !1;
              if (e) {
                var n = void 0;
                e: for (var o = 0, a = e.length; o < a; o++)
                  if ((n = e[o]).href) {
                    if (!t) {
                      r = !0;
                      break e;
                    }
                    if (n.href.startsWith("http") && !n.href.startsWith(location.origin)) {
                      r = !0;
                      break e;
                    }
                  }
              }
              return r;
            }
            function S() {
              if (l) return l.sheet.cssRules;
              if (w()) return null;
              var t = L();
              return (e instanceof HTMLLinkElement && !be(e.href) && _(t, !1)) || _(t, !0) ? null : t;
            }
            function k() {
              l ? (e.nextSibling !== l && e.parentNode.insertBefore(l, e.nextSibling), l.nextSibling !== d && e.parentNode.insertBefore(d, l.nextSibling)) : e.nextSibling !== d && e.parentNode.insertBefore(d, e.nextSibling);
            }
            function E() {
              ((d = e instanceof SVGStyleElement ? document.createElementNS("http://www.w3.org/2000/svg", "style") : document.createElement("style")).classList.add("darkreader"), d.classList.add("darkreader--sync"), (d.media = "screen"), e.title && (d.title = e.title), $n.add(d));
            }
            var x = !1,
              T = !1,
              M = ++Yn;
            function O() {
              return n(this, void 0, void 0, function () {
                var t, r, n, a, s, c, u;
                return o(this, function (o) {
                  switch (o.label) {
                    case 0:
                      if (!(e instanceof HTMLLinkElement)) return [3, 7];
                      if (((n = i(I(), 2)), (a = n[0]), (s = n[1]), (a || s || p) && (!p || e.sheet) && !P(s))) return [3, 5];
                      o.label = 1;
                    case 1:
                      return (o.trys.push([1, 3, , 4]), [4, Gn(e, M)]);
                    case 2:
                      return (o.sent(), [3, 4]);
                    case 3:
                      return (o.sent(), (T = !0), [3, 4]);
                    case 4:
                      if (m) return [2, null];
                      ((u = i(I(), 2)), (a = u[0]), (s = u[1]), (o.label = 5));
                    case 5:
                      return a && !_(a, !1) ? [2, a] : [4, Kn(e.href)];
                    case 6:
                      return ((t = o.sent()), (r = xe(e.href)), m ? [2, null] : [3, 8]);
                    case 7:
                      if (!w()) return [2, null];
                      ((t = e.textContent.trim()), (r = xe(location.href)), (o.label = 8));
                    case 8:
                      if (!t) return [3, 13];
                      o.label = 9;
                    case 9:
                      return (o.trys.push([9, 11, , 12]), [4, Qn(t, r)]);
                    case 10:
                      return ((c = o.sent()), (l = Zn(e, c)), [3, 12]);
                    case 11:
                      return (o.sent(), [3, 12]);
                    case 12:
                      if (l) return ((f = z(l, "prev-sibling")), [2, l.sheet.cssRules]);
                      o.label = 13;
                    case 13:
                      return [2, null];
                  }
                });
              });
            }
            function C(e) {
              var t = S();
              return t
                ? { rules: t }
                : (e.secondRound ||
                    x ||
                    T ||
                    ((x = !0),
                    a(),
                    O()
                      .then(function (e) {
                        ((x = !1), s(), e && r());
                      })
                      .catch(function (e) {
                        ((x = !1), s());
                      })),
                  null);
            }
            var A = !1;
            function D(e, t) {
              var n = S();
              function o(e) {
                for (var t = e.cssRules.length - 1; t >= 0; t--) e.deleteRule(t);
              }
              function a() {
                return (
                  d || E(),
                  h && h.stop(),
                  k(),
                  null == d.sheet && (d.textContent = ""),
                  o(d.sheet),
                  h
                    ? h.run()
                    : (h = z(d, "prev-sibling", function () {
                        ((A = !0), i());
                      })),
                  d.sheet
                );
              }
              function i() {
                var o = A;
                ((A = !1),
                  b.modifySheet({
                    prepareSheet: a,
                    sourceCSSRules: n,
                    theme: e,
                    ignoreImageAnalysis: t,
                    force: o,
                    isAsyncCancelled: function () {
                      return m;
                    },
                  }),
                  (g = 0 === d.sheet.cssRules.length),
                  b.shouldRebuildStyle() &&
                    ne(function () {
                      return r();
                    }));
              }
              n && ((m = !1), i());
            }
            function I() {
              try {
                return null == e.sheet ? [null, null] : [e.sheet.cssRules, null];
              } catch (e) {
                return [null, e];
              }
            }
            function P(e) {
              return e && e.message && e.message.includes("loading");
            }
            function L() {
              var e = i(I(), 2),
                t = e[0];
              return e[1] ? null : t;
            }
            function j() {
              (H(), (Bn && e.sheet) || $());
            }
            var R = null,
              N = null;
            function V() {
              var e = L();
              return e ? e.length : null;
            }
            function F() {
              return V() !== R;
            }
            function $() {
              ((R = V()), U());
              var t = function () {
                (F() && ((R = V()), r()), Bn && e.sheet ? U() : (N = requestAnimationFrame(t)));
              };
              t();
            }
            function U() {
              cancelAnimationFrame(N);
            }
            var B = !1;
            function Y() {
              function e() {
                ((B = !1), m || r());
              }
              ((Bn = !0), U(), B || ((B = !0), "function" == typeof queueMicrotask ? queueMicrotask(e) : requestAnimationFrame(e)));
            }
            function H() {
              e.addEventListener("__darkreader__updateSheet", Y);
            }
            function W() {
              e.removeEventListener("__darkreader__updateSheet", Y);
            }
            function q() {
              (W(), U());
            }
            function K() {
              (v.disconnect(), (m = !0), f && f.stop(), h && h.stop(), q());
            }
            function Q() {
              if ((K(), G(l), G(d), s(), Hn.has(M))) {
                var e = Hn.get(M);
                (Hn.delete(M), e && e());
              }
            }
            function Z() {
              (v.observe(e, y), e instanceof HTMLStyleElement && j());
            }
            var X = 10,
              J = 0;
            function ee() {
              d && (++J > X || (k(), f && f.skip(), h && h.skip(), g || ((A = !0), r())));
            }
            return { details: C, render: D, pause: K, destroy: Q, watch: Z, restore: ee };
          }
          function Gn(e, t) {
            return n(this, void 0, void 0, function () {
              return o(this, function (r) {
                return [
                  2,
                  new Promise(function (r, n) {
                    var o = function () {
                        (e.removeEventListener("load", a), e.removeEventListener("error", i), Hn.delete(t));
                      },
                      a = function () {
                        (o(), r());
                      },
                      i = function () {
                        (o(), n("Linkelement ".concat(t, " couldn't be loaded. ").concat(e.href)));
                      };
                    (Hn.set(t, function () {
                      (o(), n());
                    }),
                      e.addEventListener("load", a),
                      e.addEventListener("error", i),
                      e.href || i());
                  }),
                ];
              });
            });
          }
          function zn(e) {
            return Ee(
              e
                .substring(7)
                .trim()
                .replace(/;$/, "")
                .replace(/screen$/, ""),
            );
          }
          function Kn(e) {
            return n(this, void 0, void 0, function () {
              return o(this, function (t) {
                switch (t.label) {
                  case 0:
                    return e.startsWith("data:") ? [4, fetch(e)] : [3, 3];
                  case 1:
                    return [4, t.sent().text()];
                  case 2:
                  case 4:
                    return [2, t.sent()];
                  case 3:
                    return [4, Qt({ url: e, responseType: "text", mimeType: "text/css", origin: window.location.origin })];
                }
              });
            });
          }
          function Qn(e, t, r) {
            return (
              void 0 === r && (r = new Map()),
              n(this, void 0, void 0, function () {
                var n, i, s, c, u, l, d, f, h, p;
                return o(this, function (o) {
                  switch (o.label) {
                    case 0:
                      ((e = Te((e = Ae((e = Oe(e)))), t)), (n = Le(ke, e)), (o.label = 1));
                    case 1:
                      (o.trys.push([1, 10, 11, 12]), (i = a(n)), (s = i.next()), (o.label = 2));
                    case 2:
                      return s.done ? [3, 9] : ((c = s.value), (u = zn(c)), (l = ge(t, u)), (d = void 0), r.has(l) ? ((d = r.get(l)), [3, 7]) : [3, 3]);
                    case 3:
                      return (o.trys.push([3, 6, , 7]), [4, Kn(l)]);
                    case 4:
                      return ((d = o.sent()), r.set(l, d), [4, Qn(d, xe(l), r)]);
                    case 5:
                      return ((d = o.sent()), [3, 7]);
                    case 6:
                      return (o.sent(), (d = ""), [3, 7]);
                    case 7:
                      ((e = e.split(c).join(d)), (o.label = 8));
                    case 8:
                      return ((s = i.next()), [3, 2]);
                    case 9:
                      return [3, 12];
                    case 10:
                      return ((f = o.sent()), (h = { error: f }), [3, 12]);
                    case 11:
                      try {
                        s && !s.done && (p = i.return) && p.call(i);
                      } finally {
                        if (h) throw h.error;
                      }
                      return [7];
                    case 12:
                      return [2, (e = e.trim())];
                  }
                });
              })
            );
          }
          function Zn(e, t) {
            if (!t) return null;
            var r = document.createElement("style");
            return (r.classList.add("darkreader"), r.classList.add("darkreader--cors"), (r.media = "screen"), (r.textContent = t), e.parentNode.insertBefore(r, e.nextSibling), (r.sheet.disabled = !0), Un.add(r), r);
          }
          var Xn,
            Jn,
            eo = [],
            to = new Map();
          function ro(e) {
            w &&
              F(e.querySelectorAll(":not(:defined)"), function (e) {
                var t = e.tagName.toLowerCase();
                if (!t.includes("-")) {
                  var r = e.getAttribute("is");
                  if (!r) return;
                  t = r;
                }
                (to.has(t) ||
                  (to.set(t, new Set()),
                  io(t).then(function () {
                    if (Jn) {
                      var e = to.get(t);
                      (to.delete(t), Jn(Array.from(e)));
                    }
                  })),
                  to.get(t).add(e));
              });
          }
          var no = !1;
          document.addEventListener("__darkreader__inlineScriptsAllowed", function () {
            no = !0;
          });
          var oo = new Map();
          function ao(e) {
            ((no = !0), oo.has(e.detail.tag) && oo.get(e.detail.tag)());
          }
          function io(e) {
            return n(this, void 0, void 0, function () {
              return o(this, function (t) {
                return [
                  2,
                  new Promise(function (t) {
                    if (window.customElements && "function" == typeof customElements.whenDefined)
                      customElements.whenDefined(e).then(function () {
                        return t();
                      });
                    else if (no) (oo.set(e, t), document.dispatchEvent(new CustomEvent("__darkreader__addUndefinedResolver", { detail: { tag: e } })));
                    else {
                      var r = function () {
                        var n = to.get(e);
                        n && n.size > 0 && (n.values().next().value.matches(":defined") ? t() : requestAnimationFrame(r));
                      };
                      requestAnimationFrame(r);
                    }
                  }),
                ];
              });
            });
          }
          function so(e) {
            Jn = e;
          }
          function co() {
            ((Jn = null), to.clear(), document.removeEventListener("__darkreader__isDefined", ao));
          }
          function uo(e, t, r) {
            fo();
            var n = new Set(e),
              o = new WeakMap(),
              a = new WeakMap();
            function i(e) {
              (o.set(e, e.previousElementSibling), a.set(e, e.nextElementSibling));
            }
            function s(e) {
              (o.delete(e), a.delete(e));
            }
            function c(e) {
              return e.previousElementSibling !== o.get(e) || e.nextElementSibling !== a.get(e);
            }
            function u(e) {
              var r = e.createdStyles,
                o = e.removedStyles,
                a = e.movedStyles;
              (r.forEach(function (e) {
                return i(e);
              }),
                a.forEach(function (e) {
                  return i(e);
                }),
                o.forEach(function (e) {
                  return s(e);
                }),
                r.forEach(function (e) {
                  return n.add(e);
                }),
                o.forEach(function (e) {
                  return n.delete(e);
                }),
                r.size + o.size + a.size > 0 && t({ created: Array.from(r), removed: Array.from(o), moved: Array.from(a), updated: [] }));
            }
            function l(e) {
              var t = e.additions,
                r = e.moves,
                n = e.deletions,
                o = new Set(),
                a = new Set(),
                i = new Set();
              (t.forEach(function (e) {
                return Fn(e).forEach(function (e) {
                  return o.add(e);
                });
              }),
                n.forEach(function (e) {
                  return Fn(e).forEach(function (e) {
                    return a.add(e);
                  });
                }),
                r.forEach(function (e) {
                  return Fn(e).forEach(function (e) {
                    return i.add(e);
                  });
                }),
                u({ createdStyles: o, removedStyles: a, movedStyles: i }),
                t.forEach(function (e) {
                  (K(e, p), ro(e));
                }));
            }
            function d(e) {
              var t = new Set(Fn(e)),
                r = new Set(),
                o = new Set(),
                a = new Set();
              (t.forEach(function (e) {
                n.has(e) || r.add(e);
              }),
                n.forEach(function (e) {
                  t.has(e) || o.add(e);
                }),
                t.forEach(function (e) {
                  r.has(e) || o.has(e) || !c(e) || a.add(e);
                }),
                u({ createdStyles: r, removedStyles: o, movedStyles: a }),
                K(e, p),
                ro(e));
            }
            function f(e) {
              var r = new Set(),
                n = new Set();
              (e.forEach(function (e) {
                var t = e.target;
                t.isConnected && (Vn(t) ? r.add(t) : t instanceof HTMLLinkElement && t.disabled && n.add(t));
              }),
                r.size + n.size > 0 && t({ updated: Array.from(r), created: [], removed: Array.from(n), moved: [] }));
            }
            function h(e) {
              var t = fe(e, { onMinorMutations: l, onHugeMutations: d }),
                r = new MutationObserver(f);
              (r.observe(e, { attributes: !0, attributeFilter: ["rel", "disabled", "media", "href"], subtree: !0 }), eo.push(t, r), Xn.add(e));
            }
            function p(e) {
              var t = e.shadowRoot;
              null == t || Xn.has(t) || (h(t), r(t));
            }
            (e.forEach(i),
              h(document),
              K(document.documentElement, p),
              so(function (e) {
                var r = [];
                (e.forEach(function (e) {
                  return $(r, Fn(e.shadowRoot));
                }),
                  t({ created: r, updated: [], removed: [], moved: [] }),
                  e.forEach(function (e) {
                    var t = e.shadowRoot;
                    null != t && (p(e), K(t, p), ro(t));
                  }));
              }),
              document.addEventListener("__darkreader__isDefined", ao),
              ro(document));
          }
          function lo() {
            (eo.forEach(function (e) {
              return e.disconnect();
            }),
              eo.splice(0, eo.length),
              (Xn = new WeakSet()));
          }
          function fo() {
            (lo(), co());
          }
          function ho(e) {
            return (e < 16 ? "0" : "") + e.toString(16);
          }
          function po() {
            if ("randomUUID" in crypto) {
              var e = crypto.randomUUID();
              return e.substring(0, 8) + e.substring(9, 13) + e.substring(14, 18) + e.substring(19, 23) + e.substring(24);
            }
            return Array.from(crypto.getRandomValues(new Uint8Array(16)))
              .map(function (e) {
                return ho(e);
              })
              .join("");
          }
          var mo = new WeakMap(),
            go = new WeakSet();
          function bo(e) {
            var t = !1;
            function r(t, r) {
              var n = s([], i(e.adoptedStyleSheets), !1),
                o = n.indexOf(t),
                a = n.indexOf(r);
              o !== a - 1 && (a >= 0 && n.splice(a, 1), n.splice(o + 1, 0, r), (e.adoptedStyleSheets = n));
            }
            function n() {
              t = !0;
              var r = s([], i(e.adoptedStyleSheets), !1);
              (e.adoptedStyleSheets.forEach(function (e) {
                if (go.has(e)) {
                  var t = r.indexOf(e);
                  (t >= 0 && r.splice(t, 1), mo.delete(e), go.delete(e));
                }
              }),
                (e.adoptedStyleSheets = r));
            }
            function o(n, o) {
              e.adoptedStyleSheets.forEach(function (e) {
                if (!go.has(e)) {
                  var a = e.rules,
                    i = new CSSStyleSheet();
                  jn().modifySheet({
                    prepareSheet: s,
                    sourceCSSRules: a,
                    theme: n,
                    ignoreImageAnalysis: o,
                    force: !1,
                    isAsyncCancelled: function () {
                      return t;
                    },
                  });
                }
                function s() {
                  for (var t = i.cssRules.length - 1; t >= 0; t--) i.deleteRule(t);
                  return (r(e, i), mo.set(e, i), go.add(i), i);
                }
              });
            }
            return { render: o, destroy: n };
          }
          function vo(e) {
            document.dispatchEvent(new CustomEvent("__darkreader__inlineScriptsAllowed"));
            var t = Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype, "addRule"),
              r = Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype, "insertRule"),
              n = Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype, "deleteRule"),
              o = Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype, "removeRule"),
              a = e ? Object.getOwnPropertyDescriptor(Document.prototype, "styleSheets") : null,
              c = ["baidu.com", "baike.baidu.com", "ditu.baidu.com", "map.baidu.com", "maps.baidu.com", "haokan.baidu.com", "pan.baidu.com", "passport.baidu.com", "tieba.baidu.com", "www.baidu.com"].includes(location.hostname),
              u = c ? Object.getOwnPropertyDescriptor(Element.prototype, "getElementsByTagName") : null,
              l = function () {
                (Object.defineProperty(CSSStyleSheet.prototype, "addRule", t), Object.defineProperty(CSSStyleSheet.prototype, "insertRule", r), Object.defineProperty(CSSStyleSheet.prototype, "deleteRule", n), Object.defineProperty(CSSStyleSheet.prototype, "removeRule", o), document.removeEventListener("__darkreader__cleanUp", l), document.removeEventListener("__darkreader__addUndefinedResolver", d), e && Object.defineProperty(Document.prototype, "styleSheets", a), c && Object.defineProperty(Element.prototype, "getElementsByTagName", u));
              },
              d = function (e) {
                customElements.whenDefined(e.detail.tag).then(function () {
                  document.dispatchEvent(new CustomEvent("__darkreader__isDefined", { detail: { tag: e.detail.tag } }));
                });
              };
            (document.addEventListener("__darkreader__cleanUp", l), document.addEventListener("__darkreader__addUndefinedResolver", d));
            var f = new Event("__darkreader__updateSheet");
            function h(e, r, n) {
              return (t.value.call(this, e, r, n), this.ownerNode && !this.ownerNode.classList.contains("darkreader") && this.ownerNode.dispatchEvent(f), -1);
            }
            function p(e, t) {
              var n = r.value.call(this, e, t);
              return (this.ownerNode && !this.ownerNode.classList.contains("darkreader") && this.ownerNode.dispatchEvent(f), n);
            }
            function m(e) {
              (n.value.call(this, e), this.ownerNode && !this.ownerNode.classList.contains("darkreader") && this.ownerNode.dispatchEvent(f));
            }
            function g(e) {
              (o.value.call(this, e), this.ownerNode && !this.ownerNode.classList.contains("darkreader") && this.ownerNode.dispatchEvent(f));
            }
            function b() {
              var e = this,
                t = function () {
                  var t = s([], i(a.get.call(e)), !1).filter(function (e) {
                    return !e.ownerNode.classList.contains("darkreader");
                  });
                  return (
                    (t.item = function (e) {
                      return t[e];
                    }),
                    Object.setPrototypeOf(t, StyleSheetList.prototype)
                  );
                },
                r = t();
              return (r = new Proxy(r, {
                get: function (e, r) {
                  return t()[r];
                },
              }));
            }
            function v(e) {
              var t = this;
              if ("style" !== e) return u.value.call(this, e);
              var r = function () {
                  var r = u.value.call(t, e);
                  return Object.setPrototypeOf(
                    s([], i(r), !1).filter(function (e) {
                      return !e.classList.contains("darkreader");
                    }),
                    NodeList.prototype,
                  );
                },
                n = r();
              return (n = new Proxy(n, {
                get: function (e, t) {
                  return r()[Number(t) || t];
                },
              }));
            }
            (Object.defineProperty(CSSStyleSheet.prototype, "addRule", Object.assign({}, t, { value: h })), Object.defineProperty(CSSStyleSheet.prototype, "insertRule", Object.assign({}, r, { value: p })), Object.defineProperty(CSSStyleSheet.prototype, "deleteRule", Object.assign({}, n, { value: m })), Object.defineProperty(CSSStyleSheet.prototype, "removeRule", Object.assign({}, o, { value: g })), e && Object.defineProperty(Document.prototype, "styleSheets", Object.assign({}, a, { get: b })), c && Object.defineProperty(Element.prototype, "getElementsByTagName", Object.assign({}, u, { value: v })));
          }
          var yo = po(),
            wo = new Map(),
            _o = [],
            So = null,
            ko = null,
            Eo = null,
            xo = null,
            To = null;
          function Mo(e, t) {
            void 0 === t && (t = document.head || document);
            var r = t.querySelector(".".concat(e));
            return (r || ((r = document.createElement("style")).classList.add("darkreader"), r.classList.add(e), (r.media = "screen"), (r.textContent = "")), r);
          }
          function Oo(e, t) {
            void 0 === t && (t = document.head || document);
            var r = t.querySelector(".".concat(e));
            return (r || ((r = document.createElement("script")).classList.add("darkreader"), r.classList.add(e)), r);
          }
          var Co = new Map();
          function Ao(e, t) {
            (Co.has(t) && Co.get(t).stop(), Co.set(t, z(e, "parent")));
          }
          function Do() {
            (F(Co.values(), function (e) {
              return e.stop();
            }),
              Co.clear());
          }
          function Io() {
            var e = Mo("darkreader--fallback", document);
            ((e.textContent = kr(So, { strict: !0 })), document.head.insertBefore(e, document.head.firstChild), Ao(e, "fallback"));
            var t = Mo("darkreader--user-agent");
            ((t.textContent = yr(So, Eo, So.styleSystemControls)), document.head.insertBefore(t, e.nextSibling), Ao(t, "user-agent"));
            var n = Mo("darkreader--text");
            (So.useFont || So.textStroke > 0 ? (n.textContent = Yt(So)) : (n.textContent = ""), document.head.insertBefore(n, e.nextSibling), Ao(n, "text"));
            var o = Mo("darkreader--invert");
            (ko && Array.isArray(ko.invert) && ko.invert.length > 0 ? (o.textContent = ["".concat(ko.invert.join(", "), " {"), "    filter: ".concat(Ht(r(r({}, So), { contrast: 0 === So.mode ? So.contrast : pt(So.contrast - 10, 0, 100) })), " !important;"), "}"].join("\n")) : (o.textContent = ""), document.head.insertBefore(o, n.nextSibling), Ao(o, "invert"));
            var a = Mo("darkreader--inline");
            ((a.textContent = hn()), document.head.insertBefore(a, o.nextSibling), Ao(a, "inline"));
            var i = Mo("darkreader--override");
            ((i.textContent = ko && ko.css ? jo(ko.css) : ""), document.head.appendChild(i), Ao(i, "override"));
            var s = Mo("darkreader--variables"),
              c = wr(So),
              u = So.darkSchemeBackgroundColor,
              l = So.darkSchemeTextColor,
              d = So.lightSchemeBackgroundColor,
              f = So.lightSchemeTextColor,
              h = So.mode,
              p = 0 === h ? d : u,
              m = 0 === h ? f : l;
            ((p = Pt(Fe(p), So)), (m = Vt(Fe(m), So)), (s.textContent = [":root {", "   --darkreader-neutral-background: ".concat(p, ";"), "   --darkreader-neutral-text: ".concat(m, ";"), "   --darkreader-selection-background: ".concat(c.backgroundColorSelection, ";"), "   --darkreader-selection-text: ".concat(c.foregroundColorSelection, ";"), "}"].join("\n")), document.head.insertBefore(s, a.nextSibling), Ao(s, "variables"));
            var g = Mo("darkreader--root-vars");
            document.head.insertBefore(g, s.nextSibling);
            var b = !(ko && ko.disableStyleSheetsProxy),
              v = Oo("darkreader--proxy");
            (v.append("(".concat(vo, ")(").concat(b, ")")), document.head.insertBefore(v, g.nextSibling), v.remove());
          }
          var Po = new Set();
          function Lo(e) {
            var t = Mo("darkreader--inline", e);
            ((t.textContent = hn()), e.insertBefore(t, e.firstChild));
            var n = Mo("darkreader--override", e);
            ((n.textContent = ko && ko.css ? jo(ko.css) : ""), e.insertBefore(n, t.nextSibling));
            var o = Mo("darkreader--invert", e);
            (ko && Array.isArray(ko.invert) && ko.invert.length > 0 ? (o.textContent = ["".concat(ko.invert.join(", "), " {"), "    filter: ".concat(Ht(r(r({}, So), { contrast: 0 === So.mode ? So.contrast : pt(So.contrast - 10, 0, 100) })), " !important;"), "}"].join("\n")) : (o.textContent = ""), e.insertBefore(o, n.nextSibling), Po.add(e));
          }
          function jo(e) {
            return e.replace(/\${(.+?)}/g, function (e, t) {
              var r = Fe(t);
              return r ? Ot(r, So) : t;
            });
          }
          function Ro() {
            var e = document.querySelector(".darkreader--fallback");
            e && (e.textContent = "");
          }
          function No() {
            Yo();
            var e = Fn(document)
              .filter(function (e) {
                return !wo.has(e);
              })
              .map(function (e) {
                return $o(e);
              });
            (e
              .map(function (e) {
                return e.details({ secondRound: !1 });
              })
              .filter(function (e) {
                return e && e.rules.length > 0;
              })
              .forEach(function (e) {
                Fr.addRulesForMatching(e.rules);
              }),
              Fr.matchVariablesAndDependants(),
              Fr.setOnRootVariableChange(function () {
                Fr.putRootVars(document.head.querySelector(".darkreader--root-vars"), So);
              }),
              Fr.putRootVars(document.head.querySelector(".darkreader--root-vars"), So),
              wo.forEach(function (e) {
                return e.render(So, xo);
              }),
              0 === Fo.size && Ro(),
              e.forEach(function (e) {
                return e.watch();
              }));
            var t = U(document.querySelectorAll(fn));
            (K(document.documentElement, function (e) {
              Lo(e.shadowRoot);
              var r = e.shadowRoot.querySelectorAll(fn);
              r.length > 0 && $(t, r);
            }),
              t.forEach(function (e) {
                return En(e, So, To, xo);
              }),
              Zo(document));
          }
          var Vo = 0,
            Fo = new Set();
          function $o(e) {
            var t = ++Vo;
            function r() {
              if (!Q() || !Go) {
                (Fo.add(t), B("Current amount of styles loading: ".concat(Fo.size)));
                var e = document.querySelector(".darkreader--fallback");
                e.textContent || (e.textContent = kr(So, { strict: !1 }));
              }
            }
            function n() {
              (Fo.delete(t), B("Removed loadingStyle ".concat(t, ", now awaiting: ").concat(Fo.size)), 0 === Fo.size && Q() && Ro());
            }
            function o() {
              var e = a.details({ secondRound: !0 });
              e && (Fr.addRulesForMatching(e.rules), Fr.matchVariablesAndDependants(), a.render(So, xo));
            }
            var a = qn(e, { update: o, loadingStart: r, loadingEnd: n });
            return (wo.set(e, a), a);
          }
          function Uo(e) {
            var t = wo.get(e);
            t && (t.destroy(), wo.delete(e));
          }
          var Bo = H(function (e) {
              (wo.forEach(function (e) {
                return e.render(So, xo);
              }),
                _o.forEach(function (e) {
                  return e.render(So, xo);
                }),
                e && e());
            }),
            Yo = function () {
              Bo.cancel();
            };
          function Ho() {
            0 !== Fo.size || Ro();
          }
          var Wo,
            qo = null,
            Go = !document.hidden;
          function zo(e) {
            var t = Boolean(qo);
            ((qo = function () {
              document.hidden || (Ko(), e(), (Go = !0));
            }),
              t || document.addEventListener("visibilitychange", qo));
          }
          function Ko() {
            (document.removeEventListener("visibilitychange", qo), (qo = null));
          }
          function Qo() {
            function e() {
              (No(), Xo());
            }
            (Io(), document.hidden && !So.immediateModify ? zo(e) : e(), An(So));
          }
          function Zo(e) {
            try {
              if (Array.isArray(e.adoptedStyleSheets) && e.adoptedStyleSheets.length > 0) {
                var t = bo(e);
                (_o.push(t), t.render(So, xo));
              }
            } catch (e) {}
          }
          function Xo() {
            (uo(
              Array.from(wo.keys()),
              function (e) {
                var t = e.created,
                  r = e.updated,
                  n = e.removed,
                  o = e.moved,
                  a = n,
                  i = t
                    .concat(r)
                    .concat(o)
                    .filter(function (e) {
                      return !wo.has(e);
                    }),
                  s = o.filter(function (e) {
                    return wo.has(e);
                  });
                a.forEach(function (e) {
                  return Uo(e);
                });
                var c = i.map(function (e) {
                  return $o(e);
                });
                (c
                  .map(function (e) {
                    return e.details({ secondRound: !1 });
                  })
                  .filter(function (e) {
                    return e && e.rules.length > 0;
                  })
                  .forEach(function (e) {
                    Fr.addRulesForMatching(e.rules);
                  }),
                  Fr.matchVariablesAndDependants(),
                  c.forEach(function (e) {
                    return e.render(So, xo);
                  }),
                  c.forEach(function (e) {
                    return e.watch();
                  }),
                  s.forEach(function (e) {
                    return wo.get(e).restore();
                  }));
              },
              function (e) {
                (Lo(e), Zo(e));
              },
            ),
              bn(
                function (e) {
                  (En(e, So, To, xo), e === document.documentElement && (e.getAttribute("style") || "").includes("--") && (Fr.matchVariablesAndDependants(), Fr.putRootVars(document.head.querySelector(".darkreader--root-vars"), So)));
                },
                function (e) {
                  Lo(e);
                  var t = e.querySelectorAll(fn);
                  t.length > 0 &&
                    F(t, function (e) {
                      return En(e, So, To, xo);
                    });
                },
              ),
              J(Ho));
          }
          function Jo() {
            (wo.forEach(function (e) {
              return e.pause();
            }),
              Do(),
              fo(),
              yn(),
              ee(Ho),
              oe());
          }
          function ea() {
            (Wo = new MutationObserver(function () {
              document.querySelector('meta[name="darkreader-lock"]') && (Wo.disconnect(), aa());
            })).observe(document.head, { childList: !0, subtree: !0 });
          }
          function ta() {
            var e = document.createElement("meta");
            ((e.name = "darkreader"), (e.content = yo), document.head.appendChild(e));
          }
          function ra() {
            if (document.querySelector('meta[name="darkreader-lock"]')) return !0;
            var e = document.querySelector('meta[name="darkreader"]');
            return e ? e.content !== yo : (ta(), ea(), !1);
          }
          function na(e, t, r) {
            if (
              ((So = e),
              (ko = t) ? ((xo = Array.isArray(ko.ignoreImageAnalysis) ? ko.ignoreImageAnalysis : []), (To = Array.isArray(ko.ignoreInlineStyle) ? ko.ignoreInlineStyle : [])) : ((xo = []), (To = [])),
              So.immediateModify &&
                Z(function () {
                  return !0;
                }),
              (Eo = r),
              document.head)
            ) {
              if (ra()) return;
              (document.documentElement.setAttribute("data-darkreader-mode", "dynamic"), document.documentElement.setAttribute("data-darkreader-scheme", So.mode ? "dark" : "dimmed"), Qo());
            } else {
              if (!h) {
                var n = Mo("darkreader--fallback");
                (document.documentElement.appendChild(n), (n.textContent = kr(So, { strict: !0 })));
              }
              var o = new MutationObserver(function () {
                if (document.head) {
                  if ((o.disconnect(), ra())) return void aa();
                  Qo();
                }
              });
              o.observe(document, { childList: !0, subtree: !0 });
            }
          }
          function oa() {
            (document.dispatchEvent(new CustomEvent("__darkreader__cleanUp")), G(document.head.querySelector(".darkreader--proxy")));
          }
          function aa() {
            (document.documentElement.removeAttribute("data-darkreader-mode"),
              document.documentElement.removeAttribute("data-darkreader-scheme"),
              ia(),
              G(document.querySelector(".darkreader--fallback")),
              document.head && (Dn(), G(document.head.querySelector(".darkreader--user-agent")), G(document.head.querySelector(".darkreader--text")), G(document.head.querySelector(".darkreader--invert")), G(document.head.querySelector(".darkreader--inline")), G(document.head.querySelector(".darkreader--override")), G(document.head.querySelector(".darkreader--variables")), G(document.head.querySelector(".darkreader--root-vars")), G(document.head.querySelector('meta[name="darkreader"]')), oa()),
              Po.forEach(function (e) {
                (G(e.querySelector(".darkreader--inline")), G(e.querySelector(".darkreader--override")));
              }),
              Po.clear(),
              F(wo.keys(), function (e) {
                return Uo(e);
              }),
              Fo.clear(),
              Wn(),
              F(document.querySelectorAll(".darkreader"), G),
              _o.forEach(function (e) {
                e.destroy();
              }),
              _o.splice(0),
              Wo && Wo.disconnect());
          }
          function ia() {
            (Fr.clear(), he.clear(), Ko(), Yo(), Jo(), Lr(), Ue());
          }
          var sa = /url\(\"(blob\:.*?)\"\)/g;
          function ca(e) {
            return n(this, void 0, void 0, function () {
              var t, r;
              return o(this, function (n) {
                switch (n.label) {
                  case 0:
                    return (
                      (t = []),
                      Le(sa, e, 1).forEach(function (e) {
                        var r = k(e);
                        t.push(r);
                      }),
                      [4, Promise.all(t)]
                    );
                  case 1:
                    return (
                      (r = n.sent()),
                      [
                        2,
                        e.replace(sa, function () {
                          return 'url("'.concat(r.shift(), '")');
                        }),
                      ]
                    );
                }
              });
            });
          }
          var ua =
            '/*\n                        _______\n                       /       \\\n                      .==.    .==.\n                     ((  ))==((  ))\n                    / "=="    "=="\\\n                   /____|| || ||___\\\n       ________     ____    ________  ___    ___\n       |  ___  \\   /    \\   |  ___  \\ |  |  /  /\n       |  |  \\  \\ /  /\\  \\  |  |  \\  \\|  |_/  /\n       |  |   )  /  /__\\  \\ |  |__/  /|  ___  \\\n       |  |__/  /  ______  \\|  ____  \\|  |  \\  \\\n_______|_______/__/ ____ \\__\\__|___\\__\\__|___\\__\\____\n|  ___  \\ |  ____/ /    \\   |  ___  \\ |  ____|  ___  \\\n|  |  \\  \\|  |___ /  /\\  \\  |  |  \\  \\|  |___|  |  \\  \\\n|  |__/  /|  ____/  /__\\  \\ |  |   )  |  ____|  |__/  /\n|  ____  \\|  |__/  ______  \\|  |__/  /|  |___|  ____  \\\n|__|   \\__\\____/__/      \\__\\_______/ |______|__|   \\__\\\n                https://darkreader.org\n*/\n\n/*! Dark reader generated CSS | Licensed under MIT https://github.com/darkreader/darkreader/blob/main/LICENSE */\n';
          function la() {
            return n(this, void 0, void 0, function () {
              function e(e, r) {
                var n = document.querySelector(e);
                n && n.textContent && (t.push("/* ".concat(r, " */")), t.push(n.textContent), t.push(""));
              }
              var t, r, n, a, i;
              return o(this, function (o) {
                switch (o.label) {
                  case 0:
                    return (
                      (t = [ua]),
                      e(".darkreader--fallback", "Fallback Style"),
                      e(".darkreader--user-agent", "User-Agent Style"),
                      e(".darkreader--text", "Text Style"),
                      e(".darkreader--invert", "Invert Style"),
                      e(".darkreader--variables", "Variables Style"),
                      (r = []),
                      document.querySelectorAll(".darkreader--sync").forEach(function (e) {
                        F(e.sheet.cssRules, function (e) {
                          e && e.cssText && r.push(e.cssText);
                        });
                      }),
                      r.length ? ((n = je(r.join("\n"))), t.push("/* Modified CSS */"), (i = (a = t).push), [4, ca(n)]) : [3, 2]
                    );
                  case 1:
                    (i.apply(a, [o.sent()]), t.push(""), (o.label = 2));
                  case 2:
                    return (e(".darkreader--override", "Override Style"), [2, t.join("\n")]);
                }
              });
            });
          }
          var da = !1,
            fa = (function () {
              try {
                return window.self !== window.top;
              } catch (e) {
                return (console.warn(e), !0);
              }
            })();
          function ha(e, t) {
            (void 0 === e && (e = {}), void 0 === t && (t = null));
            var n = r(r({}, N), e);
            if (n.engine !== C.dynamicTheme) throw new Error("Theme engine is not supported.");
            (na(n, t, fa), (da = !0));
          }
          function pa() {
            return da;
          }
          function ma() {
            (aa(), (da = !1));
          }
          var ga = matchMedia("(prefers-color-scheme: dark)"),
            ba = { themeOptions: null, fixes: null };
          function va() {
            ga.matches ? ha(ba.themeOptions, ba.fixes) : ma();
          }
          function ya(e, t) {
            (void 0 === e && (e = {}), void 0 === t && (t = null), e ? ((ba = { themeOptions: e, fixes: t }), va(), y ? ga.addEventListener("change", va) : ga.addListener(va)) : (y ? ga.removeEventListener("change", va) : ga.removeListener(va), ma()));
          }
          function wa() {
            return n(this, void 0, void 0, function () {
              return o(this, function (e) {
                switch (e.label) {
                  case 0:
                    return [4, la()];
                  case 1:
                    return [2, e.sent()];
                }
              });
            });
          }
          var _a = M;
          ((e.auto = ya), (e.disable = ma), (e.enable = ha), (e.exportGeneratedCSS = wa), (e.isEnabled = pa), (e.setFetchMethod = _a), Object.defineProperty(e, "__esModule", { value: !0 }));
        })(t);
      },
      27484: function (e) {
        e.exports = (function () {
          "use strict";
          var e = 1e3,
            t = 6e4,
            r = 36e5,
            n = "millisecond",
            o = "second",
            a = "minute",
            i = "hour",
            s = "day",
            c = "week",
            u = "month",
            l = "quarter",
            d = "year",
            f = "date",
            h = "Invalid Date",
            p = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
            m = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
            g = {
              name: "en",
              weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
              months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
              ordinal: function (e) {
                var t = ["th", "st", "nd", "rd"],
                  r = e % 100;
                return "[" + e + (t[(r - 20) % 10] || t[r] || t[0]) + "]";
              },
            },
            b = function (e, t, r) {
              var n = String(e);
              return !n || n.length >= t ? e : "" + Array(t + 1 - n.length).join(r) + e;
            },
            v = {
              s: b,
              z: function (e) {
                var t = -e.utcOffset(),
                  r = Math.abs(t),
                  n = Math.floor(r / 60),
                  o = r % 60;
                return (t <= 0 ? "+" : "-") + b(n, 2, "0") + ":" + b(o, 2, "0");
              },
              m: function e(t, r) {
                if (t.date() < r.date()) return -e(r, t);
                var n = 12 * (r.year() - t.year()) + (r.month() - t.month()),
                  o = t.clone().add(n, u),
                  a = r - o < 0,
                  i = t.clone().add(n + (a ? -1 : 1), u);
                return +(-(n + (r - o) / (a ? o - i : i - o)) || 0);
              },
              a: function (e) {
                return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
              },
              p: function (e) {
                return (
                  { M: u, y: d, w: c, d: s, D: f, h: i, m: a, s: o, ms: n, Q: l }[e] ||
                  String(e || "")
                    .toLowerCase()
                    .replace(/s$/, "")
                );
              },
              u: function (e) {
                return void 0 === e;
              },
            },
            y = "en",
            w = {};
          w[y] = g;
          var _ = "$isDayjsObject",
            S = function (e) {
              return e instanceof T || !(!e || !e[_]);
            },
            k = function e(t, r, n) {
              var o;
              if (!t) return y;
              if ("string" == typeof t) {
                var a = t.toLowerCase();
                (w[a] && (o = a), r && ((w[a] = r), (o = a)));
                var i = t.split("-");
                if (!o && i.length > 1) return e(i[0]);
              } else {
                var s = t.name;
                ((w[s] = t), (o = s));
              }
              return (!n && o && (y = o), o || (!n && y));
            },
            E = function (e, t) {
              if (S(e)) return e.clone();
              var r = "object" == typeof t ? t : {};
              return ((r.date = e), (r.args = arguments), new T(r));
            },
            x = v;
          ((x.l = k),
            (x.i = S),
            (x.w = function (e, t) {
              return E(e, { locale: t.$L, utc: t.$u, x: t.$x, $offset: t.$offset });
            }));
          var T = (function () {
              function g(e) {
                ((this.$L = k(e.locale, null, !0)), this.parse(e), (this.$x = this.$x || e.x || {}), (this[_] = !0));
              }
              var b = g.prototype;
              return (
                (b.parse = function (e) {
                  ((this.$d = (function (e) {
                    var t = e.date,
                      r = e.utc;
                    if (null === t) return new Date(NaN);
                    if (x.u(t)) return new Date();
                    if (t instanceof Date) return new Date(t);
                    if ("string" == typeof t && !/Z$/i.test(t)) {
                      var n = t.match(p);
                      if (n) {
                        var o = n[2] - 1 || 0,
                          a = (n[7] || "0").substring(0, 3);
                        return r ? new Date(Date.UTC(n[1], o, n[3] || 1, n[4] || 0, n[5] || 0, n[6] || 0, a)) : new Date(n[1], o, n[3] || 1, n[4] || 0, n[5] || 0, n[6] || 0, a);
                      }
                    }
                    return new Date(t);
                  })(e)),
                    this.init());
                }),
                (b.init = function () {
                  var e = this.$d;
                  ((this.$y = e.getFullYear()), (this.$M = e.getMonth()), (this.$D = e.getDate()), (this.$W = e.getDay()), (this.$H = e.getHours()), (this.$m = e.getMinutes()), (this.$s = e.getSeconds()), (this.$ms = e.getMilliseconds()));
                }),
                (b.$utils = function () {
                  return x;
                }),
                (b.isValid = function () {
                  return !(this.$d.toString() === h);
                }),
                (b.isSame = function (e, t) {
                  var r = E(e);
                  return this.startOf(t) <= r && r <= this.endOf(t);
                }),
                (b.isAfter = function (e, t) {
                  return E(e) < this.startOf(t);
                }),
                (b.isBefore = function (e, t) {
                  return this.endOf(t) < E(e);
                }),
                (b.$g = function (e, t, r) {
                  return x.u(e) ? this[t] : this.set(r, e);
                }),
                (b.unix = function () {
                  return Math.floor(this.valueOf() / 1e3);
                }),
                (b.valueOf = function () {
                  return this.$d.getTime();
                }),
                (b.startOf = function (e, t) {
                  var r = this,
                    n = !!x.u(t) || t,
                    l = x.p(e),
                    h = function (e, t) {
                      var o = x.w(r.$u ? Date.UTC(r.$y, t, e) : new Date(r.$y, t, e), r);
                      return n ? o : o.endOf(s);
                    },
                    p = function (e, t) {
                      return x.w(r.toDate()[e].apply(r.toDate("s"), (n ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(t)), r);
                    },
                    m = this.$W,
                    g = this.$M,
                    b = this.$D,
                    v = "set" + (this.$u ? "UTC" : "");
                  switch (l) {
                    case d:
                      return n ? h(1, 0) : h(31, 11);
                    case u:
                      return n ? h(1, g) : h(0, g + 1);
                    case c:
                      var y = this.$locale().weekStart || 0,
                        w = (m < y ? m + 7 : m) - y;
                      return h(n ? b - w : b + (6 - w), g);
                    case s:
                    case f:
                      return p(v + "Hours", 0);
                    case i:
                      return p(v + "Minutes", 1);
                    case a:
                      return p(v + "Seconds", 2);
                    case o:
                      return p(v + "Milliseconds", 3);
                    default:
                      return this.clone();
                  }
                }),
                (b.endOf = function (e) {
                  return this.startOf(e, !1);
                }),
                (b.$set = function (e, t) {
                  var r,
                    c = x.p(e),
                    l = "set" + (this.$u ? "UTC" : ""),
                    h = ((r = {}), (r[s] = l + "Date"), (r[f] = l + "Date"), (r[u] = l + "Month"), (r[d] = l + "FullYear"), (r[i] = l + "Hours"), (r[a] = l + "Minutes"), (r[o] = l + "Seconds"), (r[n] = l + "Milliseconds"), r)[c],
                    p = c === s ? this.$D + (t - this.$W) : t;
                  if (c === u || c === d) {
                    var m = this.clone().set(f, 1);
                    (m.$d[h](p), m.init(), (this.$d = m.set(f, Math.min(this.$D, m.daysInMonth())).$d));
                  } else h && this.$d[h](p);
                  return (this.init(), this);
                }),
                (b.set = function (e, t) {
                  return this.clone().$set(e, t);
                }),
                (b.get = function (e) {
                  return this[x.p(e)]();
                }),
                (b.add = function (n, l) {
                  var f,
                    h = this;
                  n = Number(n);
                  var p = x.p(l),
                    m = function (e) {
                      var t = E(h);
                      return x.w(t.date(t.date() + Math.round(e * n)), h);
                    };
                  if (p === u) return this.set(u, this.$M + n);
                  if (p === d) return this.set(d, this.$y + n);
                  if (p === s) return m(1);
                  if (p === c) return m(7);
                  var g = ((f = {}), (f[a] = t), (f[i] = r), (f[o] = e), f)[p] || 1,
                    b = this.$d.getTime() + n * g;
                  return x.w(b, this);
                }),
                (b.subtract = function (e, t) {
                  return this.add(-1 * e, t);
                }),
                (b.format = function (e) {
                  var t = this,
                    r = this.$locale();
                  if (!this.isValid()) return r.invalidDate || h;
                  var n = e || "YYYY-MM-DDTHH:mm:ssZ",
                    o = x.z(this),
                    a = this.$H,
                    i = this.$m,
                    s = this.$M,
                    c = r.weekdays,
                    u = r.months,
                    l = r.meridiem,
                    d = function (e, r, o, a) {
                      return (e && (e[r] || e(t, n))) || o[r].slice(0, a);
                    },
                    f = function (e) {
                      return x.s(a % 12 || 12, e, "0");
                    },
                    p =
                      l ||
                      function (e, t, r) {
                        var n = e < 12 ? "AM" : "PM";
                        return r ? n.toLowerCase() : n;
                      };
                  return n.replace(m, function (e, n) {
                    return (
                      n ||
                      (function (e) {
                        switch (e) {
                          case "YY":
                            return String(t.$y).slice(-2);
                          case "YYYY":
                            return x.s(t.$y, 4, "0");
                          case "M":
                            return s + 1;
                          case "MM":
                            return x.s(s + 1, 2, "0");
                          case "MMM":
                            return d(r.monthsShort, s, u, 3);
                          case "MMMM":
                            return d(u, s);
                          case "D":
                            return t.$D;
                          case "DD":
                            return x.s(t.$D, 2, "0");
                          case "d":
                            return String(t.$W);
                          case "dd":
                            return d(r.weekdaysMin, t.$W, c, 2);
                          case "ddd":
                            return d(r.weekdaysShort, t.$W, c, 3);
                          case "dddd":
                            return c[t.$W];
                          case "H":
                            return String(a);
                          case "HH":
                            return x.s(a, 2, "0");
                          case "h":
                            return f(1);
                          case "hh":
                            return f(2);
                          case "a":
                            return p(a, i, !0);
                          case "A":
                            return p(a, i, !1);
                          case "m":
                            return String(i);
                          case "mm":
                            return x.s(i, 2, "0");
                          case "s":
                            return String(t.$s);
                          case "ss":
                            return x.s(t.$s, 2, "0");
                          case "SSS":
                            return x.s(t.$ms, 3, "0");
                          case "Z":
                            return o;
                        }
                        return null;
                      })(e) ||
                      o.replace(":", "")
                    );
                  });
                }),
                (b.utcOffset = function () {
                  return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
                }),
                (b.diff = function (n, f, h) {
                  var p,
                    m = this,
                    g = x.p(f),
                    b = E(n),
                    v = (b.utcOffset() - this.utcOffset()) * t,
                    y = this - b,
                    w = function () {
                      return x.m(m, b);
                    };
                  switch (g) {
                    case d:
                      p = w() / 12;
                      break;
                    case u:
                      p = w();
                      break;
                    case l:
                      p = w() / 3;
                      break;
                    case c:
                      p = (y - v) / 6048e5;
                      break;
                    case s:
                      p = (y - v) / 864e5;
                      break;
                    case i:
                      p = y / r;
                      break;
                    case a:
                      p = y / t;
                      break;
                    case o:
                      p = y / e;
                      break;
                    default:
                      p = y;
                  }
                  return h ? p : x.a(p);
                }),
                (b.daysInMonth = function () {
                  return this.endOf(u).$D;
                }),
                (b.$locale = function () {
                  return w[this.$L];
                }),
                (b.locale = function (e, t) {
                  if (!e) return this.$L;
                  var r = this.clone(),
                    n = k(e, t, !0);
                  return (n && (r.$L = n), r);
                }),
                (b.clone = function () {
                  return x.w(this.$d, this);
                }),
                (b.toDate = function () {
                  return new Date(this.valueOf());
                }),
                (b.toJSON = function () {
                  return this.isValid() ? this.toISOString() : null;
                }),
                (b.toISOString = function () {
                  return this.$d.toISOString();
                }),
                (b.toString = function () {
                  return this.$d.toUTCString();
                }),
                g
              );
            })(),
            M = T.prototype;
          return (
            (E.prototype = M),
            [
              ["$ms", n],
              ["$s", o],
              ["$m", a],
              ["$H", i],
              ["$W", s],
              ["$M", u],
              ["$y", d],
              ["$D", f],
            ].forEach(function (e) {
              M[e[1]] = function (t) {
                return this.$g(t, e[0], e[1]);
              };
            }),
            (E.extend = function (e, t) {
              return (e.$i || (e(t, T, E), (e.$i = !0)), E);
            }),
            (E.locale = k),
            (E.isDayjs = S),
            (E.unix = function (e) {
              return E(1e3 * e);
            }),
            (E.en = w[y]),
            (E.Ls = w),
            (E.p = {}),
            E
          );
        })();
      },
      25054: function (e) {
        e.exports = (function () {
          "use strict";
          return {
            name: "en",
            weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            ordinal: function (e) {
              var t = ["th", "st", "nd", "rd"],
                r = e % 100;
              return "[" + e + (t[(r - 20) % 10] || t[r] || t[0]) + "]";
            },
          };
        })();
      },
      28734: function (e) {
        e.exports = (function () {
          "use strict";
          return function (e, t) {
            var r = t.prototype,
              n = r.format;
            r.format = function (e) {
              var t = this,
                r = this.$locale();
              if (!this.isValid()) return n.bind(this)(e);
              var o = this.$utils(),
                a = (e || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function (e) {
                  switch (e) {
                    case "Q":
                      return Math.ceil((t.$M + 1) / 3);
                    case "Do":
                      return r.ordinal(t.$D);
                    case "gggg":
                      return t.weekYear();
                    case "GGGG":
                      return t.isoWeekYear();
                    case "wo":
                      return r.ordinal(t.week(), "W");
                    case "w":
                    case "ww":
                      return o.s(t.week(), "w" === e ? 1 : 2, "0");
                    case "W":
                    case "WW":
                      return o.s(t.isoWeek(), "W" === e ? 1 : 2, "0");
                    case "k":
                    case "kk":
                      return o.s(String(0 === t.$H ? 24 : t.$H), "k" === e ? 1 : 2, "0");
                    case "X":
                      return Math.floor(t.$d.getTime() / 1e3);
                    case "x":
                      return t.$d.getTime();
                    case "z":
                      return "[" + t.offsetName() + "]";
                    case "zzz":
                      return "[" + t.offsetName("long") + "]";
                    default:
                      return e;
                  }
                });
              return n.bind(this)(a);
            };
          };
        })();
      },
      10285: function (e) {
        e.exports = (function () {
          "use strict";
          var e = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" },
            t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,
            r = /\d\d/,
            n = /\d\d?/,
            o = /\d*[^-_:/,()\s\d]+/,
            a = {},
            i = function (e) {
              return (e = +e) + (e > 68 ? 1900 : 2e3);
            },
            s = function (e) {
              return function (t) {
                this[e] = +t;
              };
            },
            c = [
              /[+-]\d\d:?(\d\d)?|Z/,
              function (e) {
                (this.zone || (this.zone = {})).offset = (function (e) {
                  if (!e) return 0;
                  if ("Z" === e) return 0;
                  var t = e.match(/([+-]|\d\d)/g),
                    r = 60 * t[1] + (+t[2] || 0);
                  return 0 === r ? 0 : "+" === t[0] ? -r : r;
                })(e);
              },
            ],
            u = function (e) {
              var t = a[e];
              return t && (t.indexOf ? t : t.s.concat(t.f));
            },
            l = function (e, t) {
              var r,
                n = a.meridiem;
              if (n) {
                for (var o = 1; o <= 24; o += 1)
                  if (e.indexOf(n(o, 0, t)) > -1) {
                    r = o > 12;
                    break;
                  }
              } else r = e === (t ? "pm" : "PM");
              return r;
            },
            d = {
              A: [
                o,
                function (e) {
                  this.afternoon = l(e, !1);
                },
              ],
              a: [
                o,
                function (e) {
                  this.afternoon = l(e, !0);
                },
              ],
              S: [
                /\d/,
                function (e) {
                  this.milliseconds = 100 * +e;
                },
              ],
              SS: [
                r,
                function (e) {
                  this.milliseconds = 10 * +e;
                },
              ],
              SSS: [
                /\d{3}/,
                function (e) {
                  this.milliseconds = +e;
                },
              ],
              s: [n, s("seconds")],
              ss: [n, s("seconds")],
              m: [n, s("minutes")],
              mm: [n, s("minutes")],
              H: [n, s("hours")],
              h: [n, s("hours")],
              HH: [n, s("hours")],
              hh: [n, s("hours")],
              D: [n, s("day")],
              DD: [r, s("day")],
              Do: [
                o,
                function (e) {
                  var t = a.ordinal,
                    r = e.match(/\d+/);
                  if (((this.day = r[0]), t)) for (var n = 1; n <= 31; n += 1) t(n).replace(/\[|\]/g, "") === e && (this.day = n);
                },
              ],
              M: [n, s("month")],
              MM: [r, s("month")],
              MMM: [
                o,
                function (e) {
                  var t = u("months"),
                    r =
                      (
                        u("monthsShort") ||
                        t.map(function (e) {
                          return e.slice(0, 3);
                        })
                      ).indexOf(e) + 1;
                  if (r < 1) throw new Error();
                  this.month = r % 12 || r;
                },
              ],
              MMMM: [
                o,
                function (e) {
                  var t = u("months").indexOf(e) + 1;
                  if (t < 1) throw new Error();
                  this.month = t % 12 || t;
                },
              ],
              Y: [/[+-]?\d+/, s("year")],
              YY: [
                r,
                function (e) {
                  this.year = i(e);
                },
              ],
              YYYY: [/\d{4}/, s("year")],
              Z: c,
              ZZ: c,
            };
          function f(r) {
            var n, o;
            ((n = r), (o = a && a.formats));
            for (
              var i = (r = n.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function (t, r, n) {
                  var a = n && n.toUpperCase();
                  return (
                    r ||
                    o[n] ||
                    e[n] ||
                    o[a].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function (e, t, r) {
                      return t || r.slice(1);
                    })
                  );
                })).match(t),
                s = i.length,
                c = 0;
              c < s;
              c += 1
            ) {
              var u = i[c],
                l = d[u],
                f = l && l[0],
                h = l && l[1];
              i[c] = h ? { regex: f, parser: h } : u.replace(/^\[|\]$/g, "");
            }
            return function (e) {
              for (var t = {}, r = 0, n = 0; r < s; r += 1) {
                var o = i[r];
                if ("string" == typeof o) n += o.length;
                else {
                  var a = o.regex,
                    c = o.parser,
                    u = e.slice(n),
                    l = a.exec(u)[0];
                  (c.call(t, l), (e = e.replace(l, "")));
                }
              }
              return (
                (function (e) {
                  var t = e.afternoon;
                  if (void 0 !== t) {
                    var r = e.hours;
                    (t ? r < 12 && (e.hours += 12) : 12 === r && (e.hours = 0), delete e.afternoon);
                  }
                })(t),
                t
              );
            };
          }
          return function (e, t, r) {
            ((r.p.customParseFormat = !0), e && e.parseTwoDigitYear && (i = e.parseTwoDigitYear));
            var n = t.prototype,
              o = n.parse;
            n.parse = function (e) {
              var t = e.date,
                n = e.utc,
                i = e.args;
              this.$u = n;
              var s = i[1];
              if ("string" == typeof s) {
                var c = !0 === i[2],
                  u = !0 === i[3],
                  l = c || u,
                  d = i[2];
                (u && (d = i[2]),
                  (a = this.$locale()),
                  !c && d && (a = r.Ls[d]),
                  (this.$d = (function (e, t, r) {
                    try {
                      if (["x", "X"].indexOf(t) > -1) return new Date(("X" === t ? 1e3 : 1) * e);
                      var n = f(t)(e),
                        o = n.year,
                        a = n.month,
                        i = n.day,
                        s = n.hours,
                        c = n.minutes,
                        u = n.seconds,
                        l = n.milliseconds,
                        d = n.zone,
                        h = new Date(),
                        p = i || (o || a ? 1 : h.getDate()),
                        m = o || h.getFullYear(),
                        g = 0;
                      (o && !a) || (g = a > 0 ? a - 1 : h.getMonth());
                      var b = s || 0,
                        v = c || 0,
                        y = u || 0,
                        w = l || 0;
                      return d ? new Date(Date.UTC(m, g, p, b, v, y, w + 60 * d.offset * 1e3)) : r ? new Date(Date.UTC(m, g, p, b, v, y, w)) : new Date(m, g, p, b, v, y, w);
                    } catch (e) {
                      return new Date("");
                    }
                  })(t, s, n)),
                  this.init(),
                  d && !0 !== d && (this.$L = this.locale(d).$L),
                  l && t != this.format(s) && (this.$d = new Date("")),
                  (a = {}));
              } else if (s instanceof Array)
                for (var h = s.length, p = 1; p <= h; p += 1) {
                  i[1] = s[p - 1];
                  var m = r.apply(this, i);
                  if (m.isValid()) {
                    ((this.$d = m.$d), (this.$L = m.$L), this.init());
                    break;
                  }
                  p === h && (this.$d = new Date(""));
                }
              else o.call(this, e);
            };
          };
        })();
      },
      66607: function (e) {
        e.exports = (function () {
          "use strict";
          return function (e, t, r) {
            t.prototype.isBetween = function (e, t, n, o) {
              var a = r(e),
                i = r(t),
                s = "(" === (o = o || "()")[0],
                c = ")" === o[1];
              return ((s ? this.isAfter(a, n) : !this.isBefore(a, n)) && (c ? this.isBefore(i, n) : !this.isAfter(i, n))) || ((s ? this.isBefore(a, n) : !this.isAfter(a, n)) && (c ? this.isAfter(i, n) : !this.isBefore(i, n)));
            };
          };
        })();
      },
      79212: function (e) {
        e.exports = (function () {
          "use strict";
          return function (e, t) {
            t.prototype.isSameOrAfter = function (e, t) {
              return this.isSame(e, t) || this.isAfter(e, t);
            };
          };
        })();
      },
      37412: function (e) {
        e.exports = (function () {
          "use strict";
          return function (e, t) {
            t.prototype.isSameOrBefore = function (e, t) {
              return this.isSame(e, t) || this.isBefore(e, t);
            };
          };
        })();
      },
      7124: function (e) {
        e.exports = (function () {
          "use strict";
          return function (e, t, r) {
            t.prototype.isToday = function () {
              var e = "YYYY-MM-DD",
                t = r();
              return this.format(e) === t.format(e);
            };
          };
        })();
      },
      44020: (e) => {
        "use strict";
        var t = "%[a-f0-9]{2}",
          r = new RegExp(t, "gi"),
          n = new RegExp("(" + t + ")+", "gi");
        function o(e, t) {
          try {
            return decodeURIComponent(e.join(""));
          } catch (e) {}
          if (1 === e.length) return e;
          t = t || 1;
          var r = e.slice(0, t),
            n = e.slice(t);
          return Array.prototype.concat.call([], o(r), o(n));
        }
        function a(e) {
          try {
            return decodeURIComponent(e);
          } catch (a) {
            for (var t = e.match(r), n = 1; n < t.length; n++) t = (e = o(t, n).join("")).match(r);
            return e;
          }
        }
        e.exports = function (e) {
          if ("string" != typeof e) throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof e + "`");
          try {
            return ((e = e.replace(/\+/g, " ")), decodeURIComponent(e));
          } catch (t) {
            return (function (e) {
              for (var t = { "%FE%FF": "��", "%FF%FE": "��" }, r = n.exec(e); r; ) {
                try {
                  t[r[0]] = decodeURIComponent(r[0]);
                } catch (e) {
                  var o = a(r[0]);
                  o !== r[0] && (t[r[0]] = o);
                }
                r = n.exec(e);
              }
              t["%C2"] = "�";
              for (var i = Object.keys(t), s = 0; s < i.length; s++) {
                var c = i[s];
                e = e.replace(new RegExp(c, "g"), t[c]);
              }
              return e;
            })(e);
          }
        };
      },
      92806: (e) => {
        "use strict";
        e.exports = function (e, t) {
          for (var r = {}, n = Object.keys(e), o = Array.isArray(t), a = 0; a < n.length; a++) {
            var i = n[a],
              s = e[i];
            (o ? -1 !== t.indexOf(i) : t(i, s, e)) && (r[i] = s);
          }
          return r;
        };
      },
      55299: (e, t, r) => {
        "use strict";
        var n = r(47798);
        function o(e) {
          return !0 === n(e) && "[object Object]" === Object.prototype.toString.call(e);
        }
        e.exports = function (e) {
          var t, r;
          return !1 !== o(e) && "function" == typeof (t = e.constructor) && !1 !== o((r = t.prototype)) && !1 !== r.hasOwnProperty("isPrototypeOf");
        };
      },
      47798: (e) => {
        "use strict";
        e.exports = function (e) {
          return null != e && "object" == typeof e && !1 === Array.isArray(e);
        };
      },
      26401: (e) => {
        var t = Object.prototype.toString;
        function r(e) {
          return "function" == typeof e.constructor ? e.constructor.name : null;
        }
        e.exports = function (e) {
          if (void 0 === e) return "undefined";
          if (null === e) return "null";
          var n,
            o = typeof e;
          if ("boolean" === o) return "boolean";
          if ("string" === o) return "string";
          if ("number" === o) return "number";
          if ("symbol" === o) return "symbol";
          if ("function" === o) return ((n = e), "GeneratorFunction" === r(n) ? "generatorfunction" : "function");
          if (
            (function (e) {
              return Array.isArray ? Array.isArray(e) : e instanceof Array;
            })(e)
          )
            return "array";
          if (
            (function (e) {
              if (e.constructor && "function" == typeof e.constructor.isBuffer) return e.constructor.isBuffer(e);
              return !1;
            })(e)
          )
            return "buffer";
          if (
            (function (e) {
              try {
                if ("number" == typeof e.length && "function" == typeof e.callee) return !0;
              } catch (e) {
                if (-1 !== e.message.indexOf("callee")) return !0;
              }
              return !1;
            })(e)
          )
            return "arguments";
          if (
            (function (e) {
              return e instanceof Date || ("function" == typeof e.toDateString && "function" == typeof e.getDate && "function" == typeof e.setDate);
            })(e)
          )
            return "date";
          if (
            (function (e) {
              return e instanceof Error || ("string" == typeof e.message && e.constructor && "number" == typeof e.constructor.stackTraceLimit);
            })(e)
          )
            return "error";
          if (
            (function (e) {
              return e instanceof RegExp || ("string" == typeof e.flags && "boolean" == typeof e.ignoreCase && "boolean" == typeof e.multiline && "boolean" == typeof e.global);
            })(e)
          )
            return "regexp";
          switch (r(e)) {
            case "Symbol":
              return "symbol";
            case "Promise":
              return "promise";
            case "WeakMap":
              return "weakmap";
            case "WeakSet":
              return "weakset";
            case "Map":
              return "map";
            case "Set":
              return "set";
            case "Int8Array":
              return "int8array";
            case "Uint8Array":
              return "uint8array";
            case "Uint8ClampedArray":
              return "uint8clampedarray";
            case "Int16Array":
              return "int16array";
            case "Uint16Array":
              return "uint16array";
            case "Int32Array":
              return "int32array";
            case "Uint32Array":
              return "uint32array";
            case "Float32Array":
              return "float32array";
            case "Float64Array":
              return "float64array";
          }
          if (
            (function (e) {
              return "function" == typeof e.throw && "function" == typeof e.return && "function" == typeof e.next;
            })(e)
          )
            return "generator";
          switch ((o = t.call(e))) {
            case "[object Object]":
              return "object";
            case "[object Map Iterator]":
              return "mapiterator";
            case "[object Set Iterator]":
              return "setiterator";
            case "[object String Iterator]":
              return "stringiterator";
            case "[object Array Iterator]":
              return "arrayiterator";
          }
          return o.slice(8, -1).toLowerCase().replace(/\s/g, "");
        };
      },
      89386: (e) => {
        "use strict";
        const t = (e) => "function" == typeof e || ("object" == typeof e && null !== e && !Array.isArray(e)),
          r = (e) => "__proto__" !== e && "constructor" !== e && "prototype" !== e,
          n = (e, ...n) => {
            for (let a of n) if (t(a)) for (let t in a) r(t) && o(e, a[t], t);
            return e;
          };
        function o(e, r, o) {
          let a = e[o];
          t(r) && t(a) ? n(a, r) : (e[o] = r);
        }
        e.exports = n;
      },
      31528: function (e, t) {
        var r, n, o;
        !(function (a, i) {
          "use strict";
          "object" == typeof e.exports ? (e.exports = i()) : ((n = []), void 0 === (o = "function" == typeof (r = i) ? r.apply(t, n) : r) || (e.exports = o));
        })(0, function () {
          "use strict";
          var e = Object.prototype.toString;
          function t(e, t) {
            return null != e && Object.prototype.hasOwnProperty.call(e, t);
          }
          function r(e) {
            if (!e) return !0;
            if (o(e) && 0 === e.length) return !0;
            if ("string" != typeof e) {
              for (var r in e) if (t(e, r)) return !1;
              return !0;
            }
            return !1;
          }
          function n(t) {
            return e.call(t);
          }
          var o =
            Array.isArray ||
            function (t) {
              return "[object Array]" === e.call(t);
            };
          function a(e) {
            var t = parseInt(e);
            return t.toString() === e ? t : e;
          }
          function i(e) {
            var i,
              s,
              c = function (e) {
                return Object.keys(c).reduce(function (t, r) {
                  return ("create" === r || ("function" == typeof c[r] && (t[r] = c[r].bind(c, e))), t);
                }, {});
              };
            function u(e, t) {
              if (i(e, t)) return e[t];
            }
            function l(e, t, r, n) {
              if (("number" == typeof t && (t = [t]), !t || 0 === t.length)) return e;
              if ("string" == typeof t) return l(e, t.split(".").map(a), r, n);
              var o = t[0],
                i = s(e, o);
              return 1 === t.length ? ((void 0 !== i && n) || (e[o] = r), i) : (void 0 === i && ("number" == typeof t[1] ? (e[o] = []) : (e[o] = {})), l(e[o], t.slice(1), r, n));
            }
            return (
              (i = (e = e || {}).includeInheritedProps
                ? function () {
                    return !0;
                  }
                : function (e, r) {
                    return ("number" == typeof r && Array.isArray(e)) || t(e, r);
                  }),
              (s = e.includeInheritedProps
                ? function (e, t) {
                    "string" != typeof t && "number" != typeof t && (t = String(t));
                    var r = u(e, t);
                    if ("__proto__" === t || "prototype" === t || ("constructor" === t && "function" == typeof r)) throw new Error("For security reasons, object's magic properties cannot be set");
                    return r;
                  }
                : function (e, t) {
                    return u(e, t);
                  }),
              (c.has = function (r, n) {
                if (("number" == typeof n ? (n = [n]) : "string" == typeof n && (n = n.split(".")), !n || 0 === n.length)) return !!r;
                for (var i = 0; i < n.length; i++) {
                  var s = a(n[i]);
                  if (!(("number" == typeof s && o(r) && s < r.length) || (e.includeInheritedProps ? s in Object(r) : t(r, s)))) return !1;
                  r = r[s];
                }
                return !0;
              }),
              (c.ensureExists = function (e, t, r) {
                return l(e, t, r, !0);
              }),
              (c.set = function (e, t, r, n) {
                return l(e, t, r, n);
              }),
              (c.insert = function (e, t, r, n) {
                var a = c.get(e, t);
                ((n = ~~n), o(a) || ((a = []), c.set(e, t, a)), a.splice(n, 0, r));
              }),
              (c.empty = function (e, t) {
                var a, s;
                if (!r(t) && null != e && (a = c.get(e, t))) {
                  if ("string" == typeof a) return c.set(e, t, "");
                  if (
                    (function (e) {
                      return "boolean" == typeof e || "[object Boolean]" === n(e);
                    })(a)
                  )
                    return c.set(e, t, !1);
                  if ("number" == typeof a) return c.set(e, t, 0);
                  if (o(a)) a.length = 0;
                  else {
                    if (
                      !(function (e) {
                        return "object" == typeof e && "[object Object]" === n(e);
                      })(a)
                    )
                      return c.set(e, t, null);
                    for (s in a) i(a, s) && delete a[s];
                  }
                }
              }),
              (c.push = function (e, t) {
                var r = c.get(e, t);
                (o(r) || ((r = []), c.set(e, t, r)), r.push.apply(r, Array.prototype.slice.call(arguments, 2)));
              }),
              (c.coalesce = function (e, t, r) {
                for (var n, o = 0, a = t.length; o < a; o++) if (void 0 !== (n = c.get(e, t[o]))) return n;
                return r;
              }),
              (c.get = function (e, t, r) {
                if (("number" == typeof t && (t = [t]), !t || 0 === t.length)) return e;
                if (null == e) return r;
                if ("string" == typeof t) return c.get(e, t.split("."), r);
                var n = a(t[0]),
                  o = s(e, n);
                return void 0 === o ? r : 1 === t.length ? o : c.get(e[n], t.slice(1), r);
              }),
              (c.del = function (e, t) {
                if (("number" == typeof t && (t = [t]), null == e)) return e;
                if (r(t)) return e;
                if ("string" == typeof t) return c.del(e, t.split("."));
                var n = a(t[0]);
                return (s(e, n), i(e, n) ? (1 !== t.length ? c.del(e[n], t.slice(1)) : (o(e) ? e.splice(n, 1) : delete e[n], e)) : e);
              }),
              c
            );
          }
          var s = i();
          return ((s.create = i), (s.withInheritedProps = i({ includeInheritedProps: !0 })), s);
        });
      },
      17563: (e, t, r) => {
        "use strict";
        const n = r(70610),
          o = r(44020),
          a = r(80500),
          i = r(92806),
          s = Symbol("encodeFragmentIdentifier");
        function c(e) {
          if ("string" != typeof e || 1 !== e.length) throw new TypeError("arrayFormatSeparator must be single character string");
        }
        function u(e, t) {
          return t.encode ? (t.strict ? n(e) : encodeURIComponent(e)) : e;
        }
        function l(e, t) {
          return t.decode ? o(e) : e;
        }
        function d(e) {
          return Array.isArray(e)
            ? e.sort()
            : "object" == typeof e
              ? d(Object.keys(e))
                  .sort((e, t) => Number(e) - Number(t))
                  .map((t) => e[t])
              : e;
        }
        function f(e) {
          const t = e.indexOf("#");
          return (-1 !== t && (e = e.slice(0, t)), e);
        }
        function h(e) {
          const t = (e = f(e)).indexOf("?");
          return -1 === t ? "" : e.slice(t + 1);
        }
        function p(e, t) {
          return (t.parseNumbers && !Number.isNaN(Number(e)) && "string" == typeof e && "" !== e.trim() ? (e = Number(e)) : !t.parseBooleans || null === e || ("true" !== e.toLowerCase() && "false" !== e.toLowerCase()) || (e = "true" === e.toLowerCase()), e);
        }
        function m(e, t) {
          c((t = Object.assign({ decode: !0, sort: !0, arrayFormat: "none", arrayFormatSeparator: ",", parseNumbers: !1, parseBooleans: !1 }, t)).arrayFormatSeparator);
          const r = (function (e) {
              let t;
              switch (e.arrayFormat) {
                case "index":
                  return (e, r, n) => {
                    ((t = /\[(\d*)\]$/.exec(e)), (e = e.replace(/\[\d*\]$/, "")), t ? (void 0 === n[e] && (n[e] = {}), (n[e][t[1]] = r)) : (n[e] = r));
                  };
                case "bracket":
                  return (e, r, n) => {
                    ((t = /(\[\])$/.exec(e)), (e = e.replace(/\[\]$/, "")), t ? (void 0 !== n[e] ? (n[e] = [].concat(n[e], r)) : (n[e] = [r])) : (n[e] = r));
                  };
                case "colon-list-separator":
                  return (e, r, n) => {
                    ((t = /(:list)$/.exec(e)), (e = e.replace(/:list$/, "")), t ? (void 0 !== n[e] ? (n[e] = [].concat(n[e], r)) : (n[e] = [r])) : (n[e] = r));
                  };
                case "comma":
                case "separator":
                  return (t, r, n) => {
                    const o = "string" == typeof r && r.includes(e.arrayFormatSeparator),
                      a = "string" == typeof r && !o && l(r, e).includes(e.arrayFormatSeparator);
                    r = a ? l(r, e) : r;
                    const i = o || a ? r.split(e.arrayFormatSeparator).map((t) => l(t, e)) : null === r ? r : l(r, e);
                    n[t] = i;
                  };
                case "bracket-separator":
                  return (t, r, n) => {
                    const o = /(\[\])$/.test(t);
                    if (((t = t.replace(/\[\]$/, "")), !o)) return void (n[t] = r ? l(r, e) : r);
                    const a = null === r ? [] : r.split(e.arrayFormatSeparator).map((t) => l(t, e));
                    void 0 !== n[t] ? (n[t] = [].concat(n[t], a)) : (n[t] = a);
                  };
                default:
                  return (e, t, r) => {
                    void 0 !== r[e] ? (r[e] = [].concat(r[e], t)) : (r[e] = t);
                  };
              }
            })(t),
            n = Object.create(null);
          if ("string" != typeof e) return n;
          if (!(e = e.trim().replace(/^[?#&]/, ""))) return n;
          for (const o of e.split("&")) {
            if ("" === o) continue;
            let [e, i] = a(t.decode ? o.replace(/\+/g, " ") : o, "=");
            ((i = void 0 === i ? null : ["comma", "separator", "bracket-separator"].includes(t.arrayFormat) ? i : l(i, t)), r(l(e, t), i, n));
          }
          for (const e of Object.keys(n)) {
            const r = n[e];
            if ("object" == typeof r && null !== r) for (const e of Object.keys(r)) r[e] = p(r[e], t);
            else n[e] = p(r, t);
          }
          return !1 === t.sort
            ? n
            : (!0 === t.sort ? Object.keys(n).sort() : Object.keys(n).sort(t.sort)).reduce((e, t) => {
                const r = n[t];
                return (Boolean(r) && "object" == typeof r && !Array.isArray(r) ? (e[t] = d(r)) : (e[t] = r), e);
              }, Object.create(null));
        }
        ((t.extract = h),
          (t.parse = m),
          (t.stringify = (e, t) => {
            if (!e) return "";
            c((t = Object.assign({ encode: !0, strict: !0, arrayFormat: "none", arrayFormatSeparator: "," }, t)).arrayFormatSeparator);
            const r = (r) => (t.skipNull && null == e[r]) || (t.skipEmptyString && "" === e[r]),
              n = (function (e) {
                switch (e.arrayFormat) {
                  case "index":
                    return (t) => (r, n) => {
                      const o = r.length;
                      return void 0 === n || (e.skipNull && null === n) || (e.skipEmptyString && "" === n) ? r : null === n ? [...r, [u(t, e), "[", o, "]"].join("")] : [...r, [u(t, e), "[", u(o, e), "]=", u(n, e)].join("")];
                    };
                  case "bracket":
                    return (t) => (r, n) => (void 0 === n || (e.skipNull && null === n) || (e.skipEmptyString && "" === n) ? r : null === n ? [...r, [u(t, e), "[]"].join("")] : [...r, [u(t, e), "[]=", u(n, e)].join("")]);
                  case "colon-list-separator":
                    return (t) => (r, n) => (void 0 === n || (e.skipNull && null === n) || (e.skipEmptyString && "" === n) ? r : null === n ? [...r, [u(t, e), ":list="].join("")] : [...r, [u(t, e), ":list=", u(n, e)].join("")]);
                  case "comma":
                  case "separator":
                  case "bracket-separator": {
                    const t = "bracket-separator" === e.arrayFormat ? "[]=" : "=";
                    return (r) => (n, o) => (void 0 === o || (e.skipNull && null === o) || (e.skipEmptyString && "" === o) ? n : ((o = null === o ? "" : o), 0 === n.length ? [[u(r, e), t, u(o, e)].join("")] : [[n, u(o, e)].join(e.arrayFormatSeparator)]));
                  }
                  default:
                    return (t) => (r, n) => (void 0 === n || (e.skipNull && null === n) || (e.skipEmptyString && "" === n) ? r : null === n ? [...r, u(t, e)] : [...r, [u(t, e), "=", u(n, e)].join("")]);
                }
              })(t),
              o = {};
            for (const t of Object.keys(e)) r(t) || (o[t] = e[t]);
            const a = Object.keys(o);
            return (
              !1 !== t.sort && a.sort(t.sort),
              a
                .map((r) => {
                  const o = e[r];
                  return void 0 === o ? "" : null === o ? u(r, t) : Array.isArray(o) ? (0 === o.length && "bracket-separator" === t.arrayFormat ? u(r, t) + "[]" : o.reduce(n(r), []).join("&")) : u(r, t) + "=" + u(o, t);
                })
                .filter((e) => e.length > 0)
                .join("&")
            );
          }),
          (t.parseUrl = (e, t) => {
            t = Object.assign({ decode: !0 }, t);
            const [r, n] = a(e, "#");
            return Object.assign({ url: r.split("?")[0] || "", query: m(h(e), t) }, t && t.parseFragmentIdentifier && n ? { fragmentIdentifier: l(n, t) } : {});
          }),
          (t.stringifyUrl = (e, r) => {
            r = Object.assign({ encode: !0, strict: !0, [s]: !0 }, r);
            const n = f(e.url).split("?")[0] || "",
              o = t.extract(e.url),
              a = t.parse(o, { sort: !1 }),
              i = Object.assign(a, e.query);
            let c = t.stringify(i, r);
            c && (c = `?${c}`);
            let l = (function (e) {
              let t = "";
              const r = e.indexOf("#");
              return (-1 !== r && (t = e.slice(r)), t);
            })(e.url);
            return (e.fragmentIdentifier && (l = `#${r[s] ? u(e.fragmentIdentifier, r) : e.fragmentIdentifier}`), `${n}${c}${l}`);
          }),
          (t.pick = (e, r, n) => {
            n = Object.assign({ parseFragmentIdentifier: !0, [s]: !1 }, n);
            const { url: o, query: a, fragmentIdentifier: c } = t.parseUrl(e, n);
            return t.stringifyUrl({ url: o, query: i(a, r), fragmentIdentifier: c }, n);
          }),
          (t.exclude = (e, r, n) => {
            const o = Array.isArray(r) ? (e) => !r.includes(e) : (e, t) => !r(e, t);
            return t.pick(e, o, n);
          }));
      },
      63341: (e, t, r) => {
        "use strict";
        const n = Symbol.prototype.valueOf,
          o = r(26401);
        e.exports = function (e, t) {
          switch (o(e)) {
            case "array":
              return e.slice();
            case "object":
              return Object.assign({}, e);
            case "date":
              return new e.constructor(Number(e));
            case "map":
              return new Map(e);
            case "set":
              return new Set(e);
            case "buffer":
              return (function (e) {
                const t = e.length,
                  r = Buffer.allocUnsafe ? Buffer.allocUnsafe(t) : Buffer.from(t);
                return (e.copy(r), r);
              })(e);
            case "symbol":
              return (function (e) {
                return n ? Object(n.call(e)) : {};
              })(e);
            case "arraybuffer":
              return (function (e) {
                const t = new e.constructor(e.byteLength);
                return (new Uint8Array(t).set(new Uint8Array(e)), t);
              })(e);
            case "float32array":
            case "float64array":
            case "int16array":
            case "int32array":
            case "int8array":
            case "uint16array":
            case "uint32array":
            case "uint8clampedarray":
            case "uint8array":
              return (function (e, t) {
                return new e.constructor(e.buffer, e.byteOffset, e.length);
              })(e);
            case "regexp":
              return (function (e) {
                const t = void 0 !== e.flags ? e.flags : /\w+$/.exec(e) || void 0,
                  r = new e.constructor(e.source, t);
                return ((r.lastIndex = e.lastIndex), r);
              })(e);
            case "error":
              return Object.create(e);
            default:
              return e;
          }
        };
      },
      80500: (e) => {
        "use strict";
        e.exports = (e, t) => {
          if ("string" != typeof e || "string" != typeof t) throw new TypeError("Expected the arguments to be of type `string`");
          if ("" === t) return [e];
          const r = e.indexOf(t);
          return -1 === r ? [e] : [e.slice(0, r), e.slice(r + t.length)];
        };
      },
      70610: (e) => {
        "use strict";
        e.exports = (e) => encodeURIComponent(e).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`);
      },
    },
    r = {};
  function n(e) {
    var o = r[e];
    if (void 0 !== o) return o.exports;
    var a = (r[e] = { exports: {} });
    return (t[e].call(a.exports, a, a.exports, n), a.exports);
  }
  ((n.m = t),
    (e = []),
    (n.O = (t, r, o, a) => {
      if (!r) {
        var i = 1 / 0;
        for (l = 0; l < e.length; l++) {
          for (var [r, o, a] = e[l], s = !0, c = 0; c < r.length; c++) (!1 & a || i >= a) && Object.keys(n.O).every((e) => n.O[e](r[c])) ? r.splice(c--, 1) : ((s = !1), a < i && (i = a));
          if (s) {
            e.splice(l--, 1);
            var u = o();
            void 0 !== u && (t = u);
          }
        }
        return t;
      }
      a = a || 0;
      for (var l = e.length; l > 0 && e[l - 1][2] > a; l--) e[l] = e[l - 1];
      e[l] = [r, o, a];
    }),
    (n.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return (n.d(t, { a: t }), t);
    }),
    (n.d = (e, t) => {
      for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      var e = { 999: 0 };
      n.O.j = (t) => 0 === e[t];
      var t = (t, r) => {
          var o,
            a,
            [i, s, c] = r,
            u = 0;
          if (i.some((t) => 0 !== e[t])) {
            for (o in s) n.o(s, o) && (n.m[o] = s[o]);
            if (c) var l = c(n);
          }
          for (t && t(r); u < i.length; u++) ((a = i[u]), n.o(e, a) && e[a] && e[a][0](), (e[a] = 0));
          return n.O(l);
        },
        r = (self.webpackChunkmanganum_ext = self.webpackChunkmanganum_ext || []);
      (r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r))));
    })());
  var o = n.O(void 0, [947], () => n(3234));
  o = n.O(o);
})();
