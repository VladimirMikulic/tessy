parcelRequire = (function (e, r, t, n) {
  var i,
    o = 'function' == typeof parcelRequire && parcelRequire,
    u = 'function' == typeof require && require;
  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = 'function' == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && 'string' == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw ((c.code = 'MODULE_NOT_FOUND'), c);
      }
      (p.resolve = function (r) {
        return e[t][1][r] || r;
      }),
        (p.cache = {});
      var l = (r[t] = new f.Module(t));
      e[t][0].call(l.exports, p, l, l.exports, this);
    }
    return r[t].exports;
    function p(e) {
      return f(p.resolve(e));
    }
  }
  (f.isParcelRequire = !0),
    (f.Module = function (e) {
      (this.id = e), (this.bundle = f), (this.exports = {});
    }),
    (f.modules = e),
    (f.cache = r),
    (f.parent = o),
    (f.register = function (r, t) {
      e[r] = [
        function (e, r) {
          r.exports = t;
        },
        {}
      ];
    });
  for (var c = 0; c < t.length; c++)
    try {
      f(t[c]);
    } catch (e) {
      i || (i = e);
    }
  if (t.length) {
    var l = f(t[t.length - 1]);
    'object' == typeof exports && 'undefined' != typeof module
      ? (module.exports = l)
      : 'function' == typeof define && define.amd
      ? define(function () {
          return l;
        })
      : n && (this[n] = l);
  }
  if (((parcelRequire = f), i)) throw i;
  return f;
})(
  {
    olYk: [
      function (require, module, exports) {
        var t = {};
        module.exports = {
          setItem: function (e, n) {
            return (t[e] = n), t[e];
          },
          getItem: function (e) {
            return t[e];
          }
        };
      },
      {}
    ],
    O3AG: [
      function (require, module, exports) {
        (exports.isEmptyObject = function (n) {
          for (var t in n) if (n.hasOwnProperty(t)) return !1;
          return !0;
        }),
          (exports.isFunction = function (n) {
            return 'function' == typeof n;
          });
      },
      {}
    ],
    k9Cv: [
      function (require, module, exports) {
        function e(e, t) {
          var r = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t &&
              (n = n.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function t(t) {
          for (var n = 1; n < arguments.length; n++) {
            var o = null != arguments[n] ? arguments[n] : {};
            n % 2
              ? e(Object(o), !0).forEach(function (e) {
                  r(t, e, o[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o))
              : e(Object(o)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(o, e)
                  );
                });
          }
          return t;
        }
        function r(e, t, r) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0
                })
              : (e[t] = r),
            e
          );
        }
        var n = require('./store'),
          o = require('./utils'),
          i = o.isEmptyObject;
        function a() {
          try {
            return n
              .getItem('monPageDocument')
              .querySelector('meta[name="monetization"]')
              .getAttribute('content');
          } catch (e) {
            throw new Error(
              'Please specify payment pointer in meta tag or pass it as an option.'
            );
          }
        }
        function c(e) {
          var t = n.getItem('monPageDocument'),
            r = t.createElement('meta');
          r.setAttribute('name', 'monetization'),
            r.setAttribute('content', e),
            t.head.appendChild(r);
        }
        var u = {},
          p = {
            amount: '10000',
            assetCode: 'USD',
            assetScale: 9,
            get paymentPointer() {
              return a();
            }
          };
        function s() {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return e.paymentPointer && c(e.paymentPointer), (u = t(t({}, p), e));
        }
        var m = function () {
          return !i(u) ? u : p;
        };
        module.exports = { initPluginOptions: s, getPluginOptions: m };
      },
      { './store': 'olYk', './utils': 'O3AG' }
    ],
    Yeg4: [
      function (require, module, exports) {
        var t = require('./store'),
          e = require('./options'),
          a = e.getPluginOptions;
        function n(t) {
          var e = {
            requestId: 'c7ff7da9-8a41-4660-98a8-ca4df0176fbe',
            paymentPointer: a().paymentPointer
          };
          if ('monetizationprogress' === t) {
            var n = a(),
              o = n.amount,
              i = n.assetCode,
              s = n.assetScale;
            Object.assign(e, { amount: o, assetCode: i, assetScale: s });
          }
          return new CustomEvent(t, { detail: e });
        }
        function o(e) {
          var a = n(e),
            o = t.getItem('monPageDocument');
          return (
            o.monetization.dispatchEvent(a),
            'monetizationstart' === e && (o.monetization.state = 'started'),
            a
          );
        }
        module.exports = { emit: o };
      },
      { './store': 'olYk', './options': 'k9Cv' }
    ],
    aPN2: [
      function (require, module, exports) {
        var t = require('./store'),
          e = require('./events'),
          n = e.emit,
          i = n.bind(null, 'monetizationstart'),
          o = n.bind(null, 'monetizationprogress'),
          a = function () {
            var e = t.getItem('monInterval');
            e || (o(), (e = setInterval(o, 1e3)), t.setItem('monInterval', e));
          },
          m = function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : null,
              n = t.getItem('monInterval');
            clearInterval(n),
              t.setItem('monInterval', null),
              e && setTimeout(a, e);
          },
          r = function (e) {
            var i = e.document;
            t.setItem('monPageDocument', i),
              (i.monetizationExtensionInstalled = !0),
              (i.monetization = i.createElement('div')),
              (i.monetization.emit = n),
              (i.monetization.pauseMonetization = m),
              (i.monetization.resumeMonetization = a);
          },
          l = function (e) {
            if (!e.document.monetization)
              throw new Error("Web Monetization API hasn't been initialized.");
            i(), o();
            var n = setInterval(o, 1e3);
            t.setItem('monInterval', n);
          };
        module.exports = {
          initWebMonetizationAPI: r,
          simulateWebMonetization: l
        };
      },
      { './store': 'olYk', './events': 'Yeg4' }
    ],
    uBxZ: [
      function (require, module, exports) {
        var i = require('./options'),
          t = i.initPluginOptions,
          n = require('./monetization'),
          o = n.initWebMonetizationAPI,
          e = n.simulateWebMonetization;
        module.exports = {
          initPluginOptions: t,
          initWebMonetizationAPI: o,
          simulateWebMonetization: e
        };
      },
      { './options': 'k9Cv', './monetization': 'aPN2' }
    ],
    XMxx: [
      function (require, module, exports) {
        var n = require('../src/index'),
          i = n.initPluginOptions,
          t = n.initWebMonetizationAPI,
          e = n.simulateWebMonetization;
        t(window),
          (document.onreadystatechange = function () {
            'complete' === document.readyState &&
              (i(window.monetizationPluginOptions), e(window));
          });
      },
      { '../src/index': 'uBxZ' }
    ]
  },
  {},
  ['XMxx'],
  null
);
