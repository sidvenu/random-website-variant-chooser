!(function(e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function(e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          n.d(
            r,
            o,
            function(t) {
              return e[t];
            }.bind(null, o)
          );
      return r;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 0));
})([
  function(e, t, n) {
    "use strict";
    n.r(t);
    class r {
      element(e) {
        switch (e.tagName.toUpperCase()) {
          case "TITLE":
            e.setInnerContent("Show Off Open Source");
            break;
          case "H1":
            "title" === e.getAttribute("id") &&
              e.append(": Contribute to Show Off Open Source");
            break;
          case "P":
            "description" === e.getAttribute("id") &&
              e.setInnerContent(
                "Bored of the lockdown? Want to help an open source organisation?\n          Head to Show Off Open Source. We are commited\n          to building templates for people to use easily in making their personal portfolio\n          websites."
              );
            break;
          case "A":
            "url" === e.getAttribute("id") &&
              (e.setAttribute("href", "https://github.com/show-off/"),
              e.setAttribute("target", "_blank"),
              e.setInnerContent("Here we go!"));
        }
      }
    }
    addEventListener("fetch", e => {
      e.respondWith(
        (async function(e) {
          try {
            const e = await (async function() {
              const e = (
                await (async function() {
                  const e = await fetch(
                    "https://cfw-takehome.developers.workers.dev/api/variants"
                  );
                  if (e.ok) return await e.json();
                  return { variants: [] };
                })()
              ).variants;
              return e[
                (function(e) {
                  if (e <= 0) return 0;
                  return Date.now() % e;
                })(e.length)
              ];
            })();
            return class {
              static modifyResponse(e) {
                return new HTMLRewriter().on("*", new r()).transform(e);
              }
            }.modifyResponse(await fetch(e));
          } catch (e) {
            return (
              console.log("Exception " + e),
              new Response("Internal Server Error", { status: 500 })
            );
          }
        })(e.request)
      );
    });
  }
]);
