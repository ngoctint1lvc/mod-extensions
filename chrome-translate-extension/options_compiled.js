/* Copyright 2014 Google */
(function () {/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    var g, aa = function (a) {
        var b = 0;
        return function () {
            return b < a.length ? {done: !1, value: a[b++]} : {done: !0}
        }
    }, ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a
    }, ca = function (a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c
        }
        throw Error("Cannot find global object");
    }, da = ca(this), ea = function (a, b) {
        if (b) a:{
            var c = da;
            a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var e = a[d];
                if (!(e in c)) break a;
                c = c[e]
            }
            a = a[a.length - 1];
            d = c[a];
            b = b(d);
            b != d && null != b && ba(c, a, {configurable: !0, writable: !0, value: b})
        }
    };
    ea("Symbol", function (a) {
        if (a) return a;
        var b = function (f, h) {
            this.g = f;
            ba(this, "description", {configurable: !0, writable: !0, value: h})
        };
        b.prototype.toString = function () {
            return this.g
        };
        var c = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_", d = 0, e = function (f) {
            if (this instanceof e) throw new TypeError("Symbol is not a constructor");
            return new b(c + (f || "") + "_" + d++, f)
        };
        return e
    });
    ea("Symbol.iterator", function (a) {
        if (a) return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = da[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function () {
                    return fa(aa(this))
                }
            })
        }
        return a
    });
    var fa = function (a) {
        a = {next: a};
        a[Symbol.iterator] = function () {
            return this
        };
        return a
    }, ha = function (a) {
        return a.raw = a
    }, ia = "function" == typeof Object.create ? Object.create : function (a) {
        var b = function () {
        };
        b.prototype = a;
        return new b
    }, ja;
    if ("function" == typeof Object.setPrototypeOf) ja = Object.setPrototypeOf; else {
        var ka;
        a:{
            var la = {a: !0}, ma = {};
            try {
                ma.__proto__ = la;
                ka = ma.a;
                break a
            } catch (a) {
            }
            ka = !1
        }
        ja = ka ? function (a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
            return a
        } : null
    }
    var na = ja, l = function (a, b) {
        a.prototype = ia(b.prototype);
        a.prototype.constructor = a;
        if (na) na(a, b); else for (var c in b) if ("prototype" != c) if (Object.defineProperties) {
            var d = Object.getOwnPropertyDescriptor(b, c);
            d && Object.defineProperty(a, c, d)
        } else a[c] = b[c];
        a.s = b.prototype
    };
    ea("String.prototype.startsWith", function (a) {
        return a ? a : function (b, c) {
            if (null == this) throw new TypeError("The 'this' value for String.prototype.startsWith must not be null or undefined");
            if (b instanceof RegExp) throw new TypeError("First argument to String.prototype.startsWith must not be a regular expression");
            var d = this + "";
            b += "";
            var e = d.length, f = b.length;
            c = Math.max(0, Math.min(c | 0, d.length));
            for (var h = 0; h < f && c < e;) if (d[c++] != b[h++]) return !1;
            return h >= f
        }
    });
    var oa = function (a, b) {
        a instanceof String && (a += "");
        var c = 0, d = !1, e = {
            next: function () {
                if (!d && c < a.length) {
                    var f = c++;
                    return {value: b(f, a[f]), done: !1}
                }
                d = !0;
                return {done: !0, value: void 0}
            }
        };
        e[Symbol.iterator] = function () {
            return e
        };
        return e
    };
    ea("Array.prototype.entries", function (a) {
        return a ? a : function () {
            return oa(this, function (b, c) {
                return [b, c]
            })
        }
    });
    ea("Object.entries", function (a) {
        return a ? a : function (b) {
            var c = [], d;
            for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push([d, b[d]]);
            return c
        }
    });
    var t = this || self, pa = function (a) {
        a.ha = void 0;
        a.aa = function () {
            return a.ha ? a.ha : a.ha = new a
        }
    }, qa = function (a) {
        var b = typeof a;
        return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
    }, ra = function (a) {
        var b = qa(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }, v = function (a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }, ua = function (a) {
        return Object.prototype.hasOwnProperty.call(a, sa) && a[sa] || (a[sa] = ++ta)
    }, sa = "closure_uid_" + (1E9 * Math.random() >>> 0), ta = 0, va = function (a, b, c) {
        return a.call.apply(a.bind,
            arguments)
    }, wa = function (a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e)
            }
        }
        return function () {
            return a.apply(b, arguments)
        }
    }, y = function (a, b, c) {
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? y = va : y = wa;
        return y.apply(null, arguments)
    }, z = function (a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var d =
                c.slice();
            d.push.apply(d, arguments);
            return a.apply(this, d)
        }
    }, A = function (a, b) {
        function c() {
        }

        c.prototype = b.prototype;
        a.s = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.Ld = function (d, e, f) {
            for (var h = Array(arguments.length - 2), k = 2; k < arguments.length; k++) h[k - 2] = arguments[k];
            return b.prototype[e].apply(d, h)
        }
    }, xa = function (a) {
        return a
    };

    function ya(a) {
        a = String(a).toLowerCase().replace("_", "-");
        if ("zh-cn" == a) return "zh-CN";
        if ("zh-tw" == a) return "zh-TW";
        var b = a.indexOf("-");
        a = 0 <= b ? a.substring(0, b) : a;
        return "zh" == a ? "zh-CN" : a
    }

    function B(a) {
        a = chrome.i18n.getMessage(a);
        return chrome.i18n.getMessage(a)
    };

    function za(a, b) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, za); else {
            var c = Error().stack;
            c && (this.stack = c)
        }
        a && (this.message = String(a));
        void 0 !== b && (this.cause = b)
    }

    A(za, Error);
    za.prototype.name = "CustomError";
    var Aa;

    function Ba(a, b) {
        a = a.split("%s");
        for (var c = "", d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : "%s");
        za.call(this, c + a[d])
    }

    A(Ba, za);
    Ba.prototype.name = "AssertionError";

    function Ca(a, b, c, d) {
        var e = "Assertion failed";
        if (c) {
            e += ": " + c;
            var f = d
        } else a && (e += ": " + a, f = b);
        throw new Ba("" + e, f || []);
    }

    var C = function (a, b, c) {
        a || Ca("", null, b, Array.prototype.slice.call(arguments, 2));
        return a
    }, Da = function (a, b) {
        throw new Ba("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
    }, Ea = function (a, b, c) {
        "number" !== typeof a && Ca("Expected number but got %s: %s.", [qa(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    }, Fa = function (a, b, c) {
        "string" !== typeof a && Ca("Expected string but got %s: %s.", [qa(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    }, Ga = function (a, b, c) {
        v(a) || Ca("Expected object but got %s: %s.",
            [qa(a), a], b, Array.prototype.slice.call(arguments, 2))
    }, Ha = function (a, b, c) {
        Array.isArray(a) || Ca("Expected array but got %s: %s.", [qa(a), a], b, Array.prototype.slice.call(arguments, 2))
    }, Ia = function (a, b, c) {
        v(a) && 1 == a.nodeType || Ca("Expected Element but got %s: %s.", [qa(a), a], b, Array.prototype.slice.call(arguments, 2))
    }, Ka = function (a, b, c, d) {
        a instanceof b || Ca("Expected instanceof %s but got %s.", [Ja(b), Ja(a)], c, Array.prototype.slice.call(arguments, 3))
    };

    function Ja(a) {
        return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
    };var La;
    var Oa = function (a, b) {
        this.g = a === Ma && b || "";
        this.h = Na
    };
    Oa.prototype.Wa = !0;
    Oa.prototype.Aa = function () {
        return this.g
    };
    Oa.prototype.toString = function () {
        return "Const{" + this.g + "}"
    };
    var Pa = function (a) {
        if (a instanceof Oa && a.constructor === Oa && a.h === Na) return a.g;
        Da("expected object of type Const, got '" + a + "'");
        return "type_error:Const"
    }, Na = {}, Ma = {};
    var Qa = function () {
    };
    var Ra = Array.prototype.indexOf ? function (a, b) {
        C(null != a.length);
        return Array.prototype.indexOf.call(a, b, void 0)
    } : function (a, b) {
        if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
        return -1
    }, Sa = Array.prototype.forEach ? function (a, b, c) {
        C(null != a.length);
        Array.prototype.forEach.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
    };

    function Ta(a, b) {
        return 0 <= Ra(a, b)
    }

    function Ua(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    }

    function Va(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (ra(d)) {
                var e = a.length || 0, f = d.length || 0;
                a.length = e + f;
                for (var h = 0; h < f; h++) a[e + h] = d[h]
            } else a.push(d)
        }
    }

    function Wa(a, b, c, d) {
        C(null != a.length);
        Array.prototype.splice.apply(a, Xa(arguments, 1))
    }

    function Xa(a, b, c) {
        C(null != a.length);
        return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
    };var Ya, Za;
    a:{
        for (var $a = ["CLOSURE_FLAGS"], ab = t, bb = 0; bb < $a.length; bb++) if (ab = ab[$a[bb]], null == ab) {
            Za = null;
            break a
        }
        Za = ab
    }
    var cb = Za && Za[610401301];
    Ya = null != cb ? cb : !1;
    var db = function (a) {
        return /^[\s\xa0]*$/.test(a)
    }, eb = String.prototype.trim ? function (a) {
        return a.trim()
    } : function (a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    }, fb = /&/g, gb = /</g, hb = />/g, ib = /"/g, jb = /'/g, kb = /\x00/g, lb = /[\x00&<>"']/, nb = function (a, b) {
        var c = 0;
        a = eb(String(a)).split(".");
        b = eb(String(b)).split(".");
        for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
            var f = a[e] || "", h = b[e] || "";
            do {
                f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
                if (0 == f[0].length &&
                    0 == h[0].length) break;
                c = mb(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == h[1].length ? 0 : parseInt(h[1], 10)) || mb(0 == f[2].length, 0 == h[2].length) || mb(f[2], h[2]);
                f = f[3];
                h = h[3]
            } while (0 == c)
        }
        return c
    }, mb = function (a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };

    function ob() {
        var a = t.navigator;
        return a && (a = a.userAgent) ? a : ""
    }

    var pb, qb = t.navigator;
    pb = qb ? qb.userAgentData || null : null;

    function rb(a) {
        return Ya ? pb ? pb.brands.some(function (b) {
            return (b = b.brand) && -1 != b.indexOf(a)
        }) : !1 : !1
    }

    function D(a) {
        return -1 != ob().indexOf(a)
    };

    function sb() {
        return Ya ? !!pb && 0 < pb.brands.length : !1
    }

    function tb() {
        return sb() ? !1 : D("Opera")
    }

    function ub() {
        return D("Firefox") || D("FxiOS")
    }

    function vb() {
        return sb() ? rb("Chromium") : (D("Chrome") || D("CriOS")) && !(sb() ? 0 : D("Edge")) || D("Silk")
    };

    function wb() {
        return Ya ? !!pb && !!pb.platform : !1
    }

    function xb() {
        return D("iPhone") && !D("iPod") && !D("iPad")
    }

    function yb() {
        return xb() || D("iPad") || D("iPod")
    }

    function zb() {
        return wb() ? "macOS" === pb.platform : D("Macintosh")
    };var Ab = function (a) {
        Ab[" "](a);
        return a
    };
    Ab[" "] = function () {
    };
    var Bb = function (a, b) {
        try {
            return Ab(a[b]), !0
        } catch (c) {
        }
        return !1
    };
    var Cb = tb(), G = sb() ? !1 : D("Trident") || D("MSIE"), Db = D("Edge"), Eb = Db || G,
        H = D("Gecko") && !(-1 != ob().toLowerCase().indexOf("webkit") && !D("Edge")) && !(D("Trident") || D("MSIE")) && !D("Edge"),
        I = -1 != ob().toLowerCase().indexOf("webkit") && !D("Edge"), J = zb(),
        Fb = wb() ? "Windows" === pb.platform : D("Windows"), Gb = wb() ? "Android" === pb.platform : D("Android"),
        Hb = xb(), Ib = D("iPad"), Jb = D("iPod"), Kb = yb(), Lb = function () {
            var a = t.document;
            return a ? a.documentMode : void 0
        }, Mb;
    a:{
        var Nb = "", Ob = function () {
            var a = ob();
            if (H) return /rv:([^\);]+)(\)|;)/.exec(a);
            if (Db) return /Edge\/([\d\.]+)/.exec(a);
            if (G) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (I) return /WebKit\/(\S+)/.exec(a);
            if (Cb) return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        Ob && (Nb = Ob ? Ob[1] : "");
        if (G) {
            var Pb = Lb();
            if (null != Pb && Pb > parseFloat(Nb)) {
                Mb = String(Pb);
                break a
            }
        }
        Mb = Nb
    }
    var Qb = Mb, Rb;
    if (t.document && G) {
        var Sb = Lb();
        Rb = Sb ? Sb : parseInt(Qb, 10) || void 0
    } else Rb = void 0;
    var Tb = Rb;

    function Ub(a, b, c) {
        for (var d in a) b.call(c, a[d], d, a)
    }

    function Vb(a, b) {
        for (var c in a) if (a[c] == b) return !0;
        return !1
    }

    var Wb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function Xb(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var f = 0; f < Wb.length; f++) c = Wb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    }

    function Yb(a) {
        var b = arguments.length;
        if (1 == b && Array.isArray(arguments[0])) return Yb.apply(null, arguments[0]);
        if (b % 2) throw Error("Uneven number of arguments");
        for (var c = {}, d = 0; d < b; d += 2) c[arguments[d]] = arguments[d + 1];
        return c
    };var Zb = {}, L = function (a, b) {
        this.g = b === Zb ? a : "";
        this.Wa = !0
    };
    L.prototype.Aa = function () {
        return this.g.toString()
    };
    L.prototype.toString = function () {
        return this.g.toString()
    };
    var $b = function (a) {
        if (a instanceof L && a.constructor === L) return a.g;
        Da("expected object of type SafeHtml, got '" + a + "' of type " + qa(a));
        return "type_error:SafeHtml"
    }, bc = function (a) {
        a instanceof L || (a = "object" == typeof a && a.Wa ? a.Aa() : String(a), lb.test(a) && (-1 != a.indexOf("&") && (a = a.replace(fb, "&amp;")), -1 != a.indexOf("<") && (a = a.replace(gb, "&lt;")), -1 != a.indexOf(">") && (a = a.replace(hb, "&gt;")), -1 != a.indexOf('"') && (a = a.replace(ib, "&quot;")), -1 != a.indexOf("'") && (a = a.replace(jb, "&#39;")), -1 != a.indexOf("\x00") &&
        (a = a.replace(kb, "&#0;"))), a = ac(a));
        return a
    }, cc = function (a) {
        if (a instanceof L) return a;
        a = bc(a);
        return ac($b(a).toString().replace(/(\r\n|\r|\n)/g, "<br>"))
    }, ac = function (a) {
        if (void 0 === La) {
            var b = null;
            var c = t.trustedTypes;
            if (c && c.createPolicy) {
                try {
                    b = c.createPolicy("goog#html", {createHTML: xa, createScript: xa, createScriptURL: xa})
                } catch (d) {
                    t.console && t.console.error(d.message)
                }
                La = b
            } else La = b
        }
        a = (b = La) ? b.createHTML(a) : a;
        return new L(a, Zb)
    }, dc = new L(t.trustedTypes && t.trustedTypes.emptyHTML || "", Zb);
    var ec = function (a, b) {
        Fa(Pa(a), "must provide justification");
        C(!db(Pa(a)), "must provide non-empty justification");
        return ac(b)
    };
    var fc = {MATH: !0, SCRIPT: !0, STYLE: !0, SVG: !0, TEMPLATE: !0}, gc = function (a) {
        var b = !1, c;
        return function () {
            b || (c = a(), b = !0);
            return c
        }
    }(function () {
        if ("undefined" === typeof document) return !1;
        var a = document.createElement("div"), b = document.createElement("div");
        b.appendChild(document.createElement("div"));
        a.appendChild(b);
        if (!a.firstChild) return !1;
        b = a.firstChild.firstChild;
        a.innerHTML = $b(dc);
        return !b.parentElement
    }), hc = function (a, b) {
        if (gc()) for (; a.lastChild;) a.removeChild(a.lastChild);
        a.innerHTML = $b(b)
    };
    var M = function (a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0
    };
    M.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")"
    };
    var ic = function (a, b) {
        return new M(a.x - b.x, a.y - b.y)
    };
    M.prototype.ceil = function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    M.prototype.floor = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    M.prototype.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    M.prototype.translate = function (a, b) {
        a instanceof M ? (this.x += a.x, this.y += a.y) : (this.x += Number(a), "number" === typeof b && (this.y += b));
        return this
    };
    var jc = function (a, b) {
        this.width = a;
        this.height = b
    };
    g = jc.prototype;
    g.toString = function () {
        return "(" + this.width + " x " + this.height + ")"
    };
    g.aspectRatio = function () {
        return this.width / this.height
    };
    g.ceil = function () {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    g.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    g.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    var mc = function (a) {
        return -1 != a.indexOf("&") ? "document" in t ? kc(a) : lc(a) : a
    }, kc = function (a) {
        var b = {"&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"'};
        var c = t.document.createElement("div");
        return a.replace(nc, function (d, e) {
            var f = b[d];
            if (f) return f;
            "#" == e.charAt(0) && (e = Number("0" + e.slice(1)), isNaN(e) || (f = String.fromCharCode(e)));
            if (!f) {
                f = ec(new Oa(Ma, "Single HTML entity."), d + " ");
                if (c.tagName && fc[c.tagName.toUpperCase()]) throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of " + c.tagName +
                    ".");
                hc(c, f);
                f = c.firstChild.nodeValue.slice(0, -1)
            }
            return b[d] = f
        })
    }, lc = function (a) {
        return a.replace(/&([^;]+);/g, function (b, c) {
            switch (c) {
                case "amp":
                    return "&";
                case "lt":
                    return "<";
                case "gt":
                    return ">";
                case "quot":
                    return '"';
                default:
                    return "#" != c.charAt(0) || (c = Number("0" + c.slice(1)), isNaN(c)) ? b : String.fromCharCode(c)
            }
        })
    }, nc = /&([^;\s<&]+);?/g, oc = function (a) {
        return null == a ? "" : String(a)
    };
    var N = function (a) {
            return a ? new pc(qc(a)) : Aa || (Aa = new pc)
        }, O = function (a) {
            return rc(document, a)
        }, rc = function (a, b) {
            return "string" === typeof b ? a.getElementById(b) : b
        }, tc = function (a) {
            var b = a || document;
            return b.querySelectorAll && b.querySelector ? b.querySelectorAll(".jfk-tooltip-data") : sc(document, "jfk-tooltip-data", a)
        }, uc = function (a, b) {
            var c = b || document;
            if (c.getElementsByClassName) a = c.getElementsByClassName(a)[0]; else {
                c = document;
                var d = b || c;
                a = d.querySelectorAll && d.querySelector && a ? d.querySelector(a ? "." + a : "") :
                    sc(c, a, b)[0] || null
            }
            return a || null
        }, sc = function (a, b, c) {
            var d;
            a = c || a;
            if (a.querySelectorAll && a.querySelector && b) return a.querySelectorAll(b ? "." + b : "");
            if (b && a.getElementsByClassName) {
                var e = a.getElementsByClassName(b);
                return e
            }
            e = a.getElementsByTagName("*");
            if (b) {
                var f = {};
                for (c = d = 0; a = e[c]; c++) {
                    var h = a.className;
                    "function" == typeof h.split && Ta(h.split(/\s+/), b) && (f[d++] = a)
                }
                f.length = d;
                return f
            }
            return e
        }, wc = function (a, b) {
            Ub(b, function (c, d) {
                c && "object" == typeof c && c.Wa && (c = c.Aa());
                "style" == d ? a.style.cssText =
                    c : "class" == d ? a.className = c : "for" == d ? a.htmlFor = c : vc.hasOwnProperty(d) ? a.setAttribute(vc[d], c) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, c) : a[d] = c
            })
        }, vc = {
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            colspan: "colSpan",
            frameborder: "frameBorder",
            height: "height",
            maxlength: "maxLength",
            nonce: "nonce",
            role: "role",
            rowspan: "rowSpan",
            type: "type",
            usemap: "useMap",
            valign: "vAlign",
            width: "width"
        }, zc = function (a) {
            var b = xc(a);
            a = yc(a);
            return G && a.pageYOffset != b.scrollTop ? new M(b.scrollLeft,
                b.scrollTop) : new M(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
        }, xc = function (a) {
            return a.scrollingElement ? a.scrollingElement : !I && Ac(a) ? a.documentElement : a.body || a.documentElement
        }, yc = function (a) {
            return a.parentWindow || a.defaultView
        }, Cc = function (a, b, c) {
            return Bc(document, arguments)
        }, Bc = function (a, b) {
            var c = b[1], d = Dc(a, String(b[0]));
            c && ("string" === typeof c ? d.className = c : Array.isArray(c) ? d.className = c.join(" ") : wc(d, c));
            2 < b.length && Ec(a, d, b, 2);
            return d
        }, Ec = function (a, b, c, d) {
            function e(k) {
                k &&
                b.appendChild("string" === typeof k ? a.createTextNode(k) : k)
            }

            for (; d < c.length; d++) {
                var f = c[d];
                if (!ra(f) || v(f) && 0 < f.nodeType) e(f); else {
                    a:{
                        if (f && "number" == typeof f.length) {
                            if (v(f)) {
                                var h = "function" == typeof f.item || "string" == typeof f.item;
                                break a
                            }
                            if ("function" === typeof f) {
                                h = "function" == typeof f.item;
                                break a
                            }
                        }
                        h = !1
                    }
                    Sa(h ? Ua(f) : f, e)
                }
            }
        }, Dc = function (a, b) {
            b = String(b);
            "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
            return a.createElement(b)
        }, Ac = function (a) {
            return "CSS1Compat" == a.compatMode
        }, Fc = function (a,
                          b) {
            Ec(qc(a), a, arguments, 1)
        }, Gc = function (a) {
            for (var b; b = a.firstChild;) a.removeChild(b)
        }, Hc = function (a) {
            a && a.parentNode && a.parentNode.removeChild(a)
        }, Ic = function (a, b) {
            if (!a || !b) return !1;
            if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
            if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
            for (; b && a != b;) b = b.parentNode;
            return b == a
        }, qc = function (a) {
            C(a, "Node cannot be null or undefined.");
            return 9 == a.nodeType ? a : a.ownerDocument || a.document
        }, P = function (a,
                         b) {
            C(null != a, "goog.dom.setTextContent expects a non-null value for node");
            if ("textContent" in a) a.textContent = b; else if (3 == a.nodeType) a.data = String(b); else if (a.firstChild && 3 == a.firstChild.nodeType) {
                for (; a.lastChild != a.firstChild;) a.removeChild(C(a.lastChild));
                a.firstChild.data = String(b)
            } else {
                Gc(a);
                var c = qc(a);
                a.appendChild(c.createTextNode(String(b)))
            }
        }, Jc = {SCRIPT: 1, STYLE: 1, HEAD: 1, IFRAME: 1, OBJECT: 1}, Kc = {IMG: " ", BR: "\n"}, Lc = function (a, b) {
            b ? a.tabIndex = 0 : (a.tabIndex = -1, a.removeAttribute("tabIndex"))
        },
        Mc = function (a) {
            a = a.tabIndex;
            return "number" === typeof a && 0 <= a && 32768 > a
        }, Oc = function (a) {
            var b = [];
            Nc(a, b, !1);
            return b.join("")
        }, Nc = function (a, b, c) {
            if (!(a.nodeName in Jc)) if (3 == a.nodeType) c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue); else if (a.nodeName in Kc) b.push(Kc[a.nodeName]); else for (a = a.firstChild; a;) Nc(a, b, c), a = a.nextSibling
        }, Pc = function (a, b) {
            for (var c = 0; a;) {
                C("parentNode" != a.name);
                if (b(a)) return a;
                a = a.parentNode;
                c++
            }
            return null
        }, pc = function (a) {
            this.g = a || t.document ||
                document
        };
    g = pc.prototype;
    g.j = function (a) {
        return rc(this.g, a)
    };
    g.setProperties = wc;
    g.Z = function (a, b, c) {
        return Bc(this.g, arguments)
    };
    g.tb = Fc;
    g.getChildren = function (a) {
        return void 0 != a.children ? a.children : Array.prototype.filter.call(a.childNodes, function (b) {
            return 1 == b.nodeType
        })
    };
    g.contains = Ic;
    t.console && t.console.createTask && t.console.createTask.bind(t.console);
    var Rc = function () {
        this.l = [];
        chrome.i18n.getAcceptLanguages(y(this.u, this));
        this.g = "";
        this.h = "1";
        this.i = !0;
        this.m = {};
        chrome.storage.local.get(null, y(this.H, this));
        Qc(this)
    };
    Rc.prototype.H = function (a) {
        "gtxTargetLang" in a && (this.g = a.gtxTargetLang);
        "gtxShowBubble" in a && (this.h = a.gtxShowBubble);
        "gtxDetectLanguage" in a && (this.i = a.gtxDetectLanguage);
        "gtxSourceLangList" in a && Sc(this, a.gtxSourceLangList);
        "gtxTargetLangList" in a && (this.m = Sc(this, a.gtxTargetLangList));
        this.loaded = !0
    };
    var Sc = function (a, b) {
        var c = [], d;
        for (d in b) c.push({code: d, name: b[d]});
        c.sort(a.o);
        a = {};
        for (b = 0; b < c.length; b++) a[c[b].code] = c[b].name;
        return a
    };
    Rc.prototype.o = function (a, b) {
        return a.name.localeCompare(b.name)
    };
    var Tc = function (a) {
        var b = {};
        b.gtxTargetLang = a.g;
        b.gtxShowBubble = a.h;
        b.gtxDetectLanguage = a.i;
        chrome.storage.local.set(b)
    }, Qc = function (a) {
        chrome.storage.onChanged.addListener(function (b) {
            b.gtxTargetLang && (a.g = b.gtxTargetLang.newValue);
            b.gtxShowBubble && (a.h = b.gtxShowBubble.newValue)
        })
    };
    Rc.prototype.u = function (a) {
        this.l = a
    };
    var Uc = !!chrome.i18n.detectLanguage;/*

 SPDX-License-Identifier: Apache-2.0
*/
    var Vc = "src srcdoc codebase data href rel action formaction sandbox cite poster icon".split(" ");
    var Wc = {};
    var Xc = function () {
    }, Yc = function (a, b) {
        if (b !== Wc) throw Error("Bad secret");
        this.g = a
    };
    l(Yc, Xc);
    Yc.prototype.toString = function () {
        return this.g
    };

    function Zc(a) {
        if (!Array.isArray(a) || !Array.isArray(a.raw)) throw new TypeError("safeAttr is a template literal tag function and should be called using the tagged template syntax. For example, safeAttr`foo`;");
        var b = a[0].toLowerCase();
        if (0 === b.indexOf("on") || 0 === "on".indexOf(b)) throw Error("Prefix '" + a[0] + "' does not guarantee the attribute to be safe as it is also a prefix for event handler attributesPlease use 'addEventListener' to set event handlers.");
        Vc.forEach(function (c) {
            if (0 === c.indexOf(b)) throw Error("Prefix '" +
                a[0] + "' does not guarantee the attribute to be safe as it is also a prefix for the security sensitive attribute '" + (c + "'. Please use native or safe DOM APIs to set the attribute."));
        });
        return new Yc(b, Wc)
    };

    function $c(a, b, c, d) {
        if (0 === a.length) throw Error("No prefixes are provided");
        a = a.map(function (f) {
            if (f instanceof Yc) f = f.g; else throw Error("Unexpected type when unwrapping SafeAttributePrefix");
            return f
        });
        var e = c.toLowerCase();
        if (a.every(function (f) {
            return 0 !== e.indexOf(f)
        })) throw Error('Attribute "' + c + '" does not match any of the allowed prefixes.');
        b.setAttribute(c, d)
    };var ad = Object.freeze || function (a) {
        return a
    };
    var bd = function (a, b) {
        this.name = a;
        this.value = b
    };
    bd.prototype.toString = function () {
        return this.name
    };
    var dd = new bd("OFF", Infinity), ed = new bd("WARNING", 900), fd = new bd("CONFIG", 700), gd = function () {
        this.clear()
    }, hd;
    gd.prototype.clear = function () {
    };
    var id = function (a, b, c) {
        this.reset(a || dd, b, c, void 0, void 0)
    };
    id.prototype.reset = function (a, b) {
        this.g = b
    };
    id.prototype.getMessage = function () {
        return this.g
    };
    var jd = function (a, b) {
        this.g = null;
        this.l = [];
        this.h = (void 0 === b ? null : b) || null;
        this.i = [];
        this.m = {
            g: function () {
                return a
            }
        }
    }, kd = function (a) {
        if (a.g) return a.g;
        if (a.h) return kd(a.h);
        Da("Root logger has no level set.");
        return dd
    };
    jd.prototype.publish = function (a) {
        for (var b = this; b;) b.l.forEach(function (c) {
            c(a)
        }), b = b.h
    };
    var ld = function () {
        this.entries = {};
        var a = new jd("");
        a.g = fd;
        this.entries[""] = a
    }, md, nd = function (a, b) {
        var c = a.entries[b];
        if (c) return c;
        c = nd(a, b.slice(0, Math.max(b.lastIndexOf("."), 0)));
        var d = new jd(b, c);
        a.entries[b] = d;
        c.i.push(d);
        return d
    }, od = function () {
        md || (md = new ld);
        return md
    };
    var pd = [], qd = function (a) {
        var b;
        if (b = nd(od(), "safevalues").m) {
            a = "A URL with content '" + a + "' was sanitized away.";
            var c = ed, d;
            if (d = b) if (d = b && c) {
                d = c.value;
                var e = b ? kd(nd(od(), b.g())) : dd;
                d = d >= e.value
            }
            d && (c = c || dd, d = nd(od(), b.g()), "function" === typeof a && (a = a()), hd || (hd = new gd), b = new id(c, a, b.g()), d.publish(b))
        }
    };
    -1 === pd.indexOf(qd) && pd.push(qd);
    var rd = {Nd: !0}, sd = {Md: !0}, td = function () {
        throw Error("Do not instantiate directly");
    };
    td.prototype.Ta = null;
    td.prototype.getContent = function () {
        return this.content
    };
    td.prototype.toString = function () {
        return this.content
    };
    td.prototype.pb = function () {
        if (this.ta !== rd) throw Error("Sanitized content was not of kind HTML.");
        return ec(new Oa(Ma, "Soy SanitizedContent of kind HTML produces SafeHtml-contract-compliant value."), this.toString())
    };
    var ud = function () {
        td.call(this)
    };
    A(ud, td);
    ud.prototype.ta = rd;
    var vd = function () {
        td.call(this)
    };
    A(vd, td);
    vd.prototype.ta = sd;
    vd.prototype.Ta = 1;
    var wd = function (a, b, c) {
        (b = null != a && a.ta === b) && C(a.constructor === c);
        return b
    };
    var xd = function (a) {
            if (null != a) switch (a.Ta) {
                case 1:
                    return 1;
                case -1:
                    return -1;
                case 0:
                    return 0
            }
            return null
        }, Bd = function (a) {
            return wd(a, rd, ud) ? a : a instanceof L ? yd($b(a).toString()) : a instanceof L ? yd($b(a).toString()) : yd(String(String(a)).replace(zd, Ad), xd(a))
        }, yd = function (a) {
            function b(c) {
                this.content = c
            }

            b.prototype = a.prototype;
            return function (c, d) {
                c = new b(String(c));
                void 0 !== d && (c.Ta = d);
                return c
            }
        }(ud), Cd = {}, Q = function (a) {
            if (wd(a, rd, ud)) {
                var b = String;
                a = a.getContent();
                a = String(a).replace(Dd, "").replace(Ed,
                    "&lt;");
                b = b(a).replace(Fd, Ad)
            } else b = String(a).replace(zd, Ad);
            return b
        }, Hd = function (a) {
            wd(a, sd, vd) ? a = a.getContent() : (a = String(a), Gd.test(a) || (Da("Bad value `%s` for |filterHtmlAttributes", [a]), a = "zSoyz"));
            return a
        }, Id = function (a) {
            wd(a, sd, vd) && (a = a.getContent());
            return (a && !a.startsWith(" ") ? " " : "") + a
        }, Jd = {}, Kd = function () {
            C(Jd === Jd, "found an incorrect call marker, was an internal function called from the top level?")
        }, Ld = {
            "\x00": "&#0;",
            "\t": "&#9;",
            "\n": "&#10;",
            "\v": "&#11;",
            "\f": "&#12;",
            "\r": "&#13;",
            " ": "&#32;",
            '"': "&quot;",
            "&": "&amp;",
            "'": "&#39;",
            "-": "&#45;",
            "/": "&#47;",
            "<": "&lt;",
            "=": "&#61;",
            ">": "&gt;",
            "`": "&#96;",
            "\u0085": "&#133;",
            "\u00a0": "&#160;",
            "\u2028": "&#8232;",
            "\u2029": "&#8233;"
        }, Ad = function (a) {
            return Ld[a]
        }, zd = /[\x00\x22\x26\x27\x3c\x3e]/g, Fd = /[\x00\x22\x27\x3c\x3e]/g,
        Gd = /^(?!on|src|(?:action|archive|background|cite|classid|codebase|content|data|dsync|href|http-equiv|longdesc|style|usemap)\s*$)(?:[a-z0-9_$:-]*)$/i,
        Dd = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,
        Ed = /</g;/*
 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    function Md(a, b, c) {
        a = a(b || Nd, void 0);
        c = c || N();
        if (a && a.g) c = a.g(); else {
            c = Dc(c.g, "DIV");
            b:if (v(a)) {
                if (a.pb && (b = a.pb(), b instanceof L)) {
                    a = b;
                    break b
                }
                Da("Soy template output is unsafe for use as HTML: " + a);
                a = bc("zSoyz")
            } else a = bc(String(a));
            b = a.Aa();
            var d = b.match(Od);
            C(!d, "This template starts with a %s, which cannot be a child of a <div>, as required by soy internals. Consider using goog.soy.renderElement instead.\nTemplate output: %s", d && d[0], b);
            hc(c, a)
        }
        1 == c.childNodes.length && (a = c.firstChild, 1 == a.nodeType &&
        (c = a));
        return c
    }

    var Od = /^<(body|caption|col|colgroup|head|html|tr|td|th|tbody|thead|tfoot)>/i, Nd = {};
    var Pd = function (a, b) {
        if (Cd["jfk.templates.button.strict"]) return Cd["jfk.templates.button.strict"](a, b);
        a = a || {};
        var c = a.attributes, d = a.content, e = a.disabled, f = a.id, h = a.ob, k = a.title, p = a.Jb, q = a.value,
            u = yd;
        f = '<div role="button"' + (f ? ' id="' + Q(f) + '"' : "") + ' class="';
        var m = a || {};
        a = m.sa;
        var n = m.disabled, x = m.checked, w = m.style;
        m = m.width;
        Kd();
        if (Cd["jfk.templates.button.classes_"]) b = Cd["jfk.templates.button.classes_"]({
            sa: a,
            disabled: n,
            checked: x,
            style: w,
            width: m
        }, b); else {
            b = "goog-inline-block jfk-button ";
            switch (v(w) ?
                w.toString() : w) {
                case 0:
                    b += "jfk-button-standard";
                    break;
                case 2:
                    b += "jfk-button-action";
                    break;
                case 3:
                    b += "jfk-button-primary";
                    break;
                case 1:
                    b += "jfk-button-default";
                    break;
                case 4:
                    b += "jfk-button-flat";
                    break;
                case 5:
                    b += "jfk-button-mini";
                    break;
                case 6:
                    b += "jfk-button-contrast";
                    break;
                default:
                    b += "jfk-button-standard"
            }
            b += ((m && m.Hb && (1).Hb ? m.ta !== (1).ta ? 0 : m.toString() === (1).toString() : 1 == m) ? " jfk-button-narrow" : "") + (x ? " jfk-button-checked" : "") + (a ? " " + a : "") + (n ? " jfk-button-disabled" : "")
        }
        return u(f + Q(b) + '"' + (e ? ' aria-disabled="true"' :
            ' tabindex="' + (h ? Q(h) : "0") + '"') + (k ? p ? ' data-tooltip="' + Q(k) + '"' : ' title="' + Q(k) + '"' : "") + (q ? ' value="' + Q(q) + '"' : "") + (c ? Id(Hd(c)) : "") + ">" + Bd(null != d ? d : "") + "</div>")
    };
    var Qd = ub(), Rd = xb() || D("iPod"), Sd = D("iPad"), Td = D("Android") && !(vb() || ub() || tb() || D("Silk")),
        Ud = vb(),
        Vd = D("Safari") && !(vb() || (sb() ? 0 : D("Coast")) || tb() || (sb() ? 0 : D("Edge")) || (sb() ? rb("Microsoft Edge") : D("Edg/")) || (sb() ? rb("Opera") : D("OPR")) || ub() || D("Silk") || D("Android")) && !yb();
    var Wd = "function" === typeof Symbol && "symbol" === typeof Symbol() ? Symbol("INTERNAL_ARRAY_STATE") : void 0,
        Xd = Object.getOwnPropertyDescriptor(Array.prototype, "Ib");
    Object.defineProperties(Array.prototype, {
        Ib: {
            get: function () {
                function a(e, f) {
                    e & b && c.push(f)
                }

                var b = Yd(this), c = [];
                a(1, "IS_REPEATED_FIELD");
                a(2, "IS_IMMUTABLE_ARRAY");
                a(4, "IS_API_FORMATTED");
                a(8, "ONLY_MUTABLE_VALUES");
                a(16, "MUTABLE_REFERENCES_ARE_OWNED");
                a(32, "CONSTRUCTED");
                a(64, "TRANSFERRED");
                a(128, "IS_FIXED_GROUP");
                var d = c.join(",");
                return Xd ? Xd.get.call(this) + "|" + d : d
            }, configurable: !0, enumerable: !1
        }
    });

    function Yd(a) {
        Ha(a, "state is only maintained on arrays.");
        var b;
        Wd ? b = a[Wd] : b = a.g;
        return null == b ? 0 : b
    };var Zd = function () {
        throw Error("please construct maps as mutable then call toImmutable");
    };
    if ("undefined" != typeof Symbol && "undefined" != typeof Symbol.hasInstance) {
        var $d = function () {
            throw Error("Cannot perform instanceof checks on ImmutableMap: please use isImmutableMap or isMutableMap to assert on the mutability of a map. See go/jspb-api-gotchas#immutable-classes for more information");
        }, ae = {};
        Object.defineProperties(Zd, (ae[Symbol.hasInstance] = {
            value: $d,
            configurable: !1,
            writable: !1,
            enumerable: !1
        }, ae));
        C(Zd[Symbol.hasInstance] === $d, "defineProperties did not work: was it monkey-patched?")
    }
    ;
    if ("undefined" !== typeof Proxy) {
        var R = be;
        new Proxy({}, {
            getPrototypeOf: R,
            setPrototypeOf: R,
            isExtensible: R,
            preventExtensions: R,
            getOwnPropertyDescriptor: R,
            defineProperty: R,
            has: R,
            get: R,
            set: R,
            deleteProperty: R,
            apply: R,
            construct: R
        })
    }

    function be() {
        throw Error("this array or object is owned by JSPB and should not be reused, did you mean to copy it with copyJspbArray? See go/jspb-api-gotchas#construct_from_array");
        throw Error();
    };C(!0);

    function ce() {
    };(function () {
        var a = t.jspbGetTypeName;
        t.jspbGetTypeName = a ? function (b) {
            return a(b) || void 0
        } : ce
    })();
    var de = function (a) {
        return "string" == typeof a.className ? a.className : a.getAttribute && a.getAttribute("class") || ""
    }, ee = function (a) {
        return a.classList ? a.classList : de(a).match(/\S+/g) || []
    }, fe = function (a, b) {
        "string" == typeof a.className ? a.className = b : a.setAttribute && a.setAttribute("class", b)
    }, ge = function (a, b) {
        return a.classList ? a.classList.contains(b) : Ta(ee(a), b)
    }, he = function (a, b) {
        if (a.classList) a.classList.add(b); else if (!ge(a, b)) {
            var c = de(a);
            fe(a, c + (0 < c.length ? " " + b : b))
        }
    }, ie = function (a, b) {
        if (a.classList) Array.prototype.forEach.call(b,
            function (e) {
                he(a, e)
            }); else {
            var c = {};
            Array.prototype.forEach.call(ee(a), function (e) {
                c[e] = !0
            });
            Array.prototype.forEach.call(b, function (e) {
                c[e] = !0
            });
            b = "";
            for (var d in c) b += 0 < b.length ? " " + d : d;
            fe(a, b)
        }
    }, je = function (a, b) {
        a.classList ? a.classList.remove(b) : ge(a, b) && fe(a, Array.prototype.filter.call(ee(a), function (c) {
            return c != b
        }).join(" "))
    }, ke = function (a, b) {
        a.classList ? Array.prototype.forEach.call(b, function (c) {
            je(a, c)
        }) : fe(a, Array.prototype.filter.call(ee(a), function (c) {
            return !Ta(b, c)
        }).join(" "))
    };
    var le = function () {
    };
    le.prototype.o = function () {
    };
    var me = function (a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    g = me.prototype;
    g.toString = function () {
        return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
    };
    g.contains = function (a) {
        return this && a ? a instanceof me ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    };
    g.ceil = function () {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    };
    g.floor = function () {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    g.round = function () {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    g.translate = function (a, b) {
        a instanceof M ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (Ea(a), this.left += a, this.right += a, "number" === typeof b && (this.top += b, this.bottom += b));
        return this
    };
    var ne = function (a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    };
    g = ne.prototype;
    g.toString = function () {
        return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
    };
    g.contains = function (a) {
        return a instanceof M ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
    };
    g.ceil = function () {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    g.floor = function () {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    g.round = function () {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    g.translate = function (a, b) {
        a instanceof M ? (this.left += a.x, this.top += a.y) : (this.left += Ea(a), "number" === typeof b && (this.top += b));
        return this
    };
    var oe = function (a, b) {
        a:{
            var c = qc(a);
            if (c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null))) {
                c = c[b] || c.getPropertyValue(b) || "";
                break a
            }
            c = ""
        }
        return c || (a.currentStyle ? a.currentStyle[b] : null) || a.style && a.style[b]
    }, qe = function (a, b, c) {
        if (b instanceof M) {
            var d = b.x;
            b = b.y
        } else d = b, b = c;
        a.style.left = pe(d);
        a.style.top = pe(b)
    }, re = function (a) {
        try {
            return a.getBoundingClientRect()
        } catch (b) {
            return {left: 0, top: 0, right: 0, bottom: 0}
        }
    }, se = function (a) {
        if (G && !(8 <= Number(Tb))) return C(a &&
            "offsetParent" in a), a.offsetParent;
        var b = qc(a), c = oe(a, "position"), d = "fixed" == c || "absolute" == c;
        for (a = a.parentNode; a && a != b; a = a.parentNode) if (11 == a.nodeType && a.host && (a = a.host), c = oe(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) return a;
        return null
    }, ue = function (a) {
        for (var b = new me(0, Infinity, Infinity, 0), c = N(a), d = c.g.body, e = c.g.documentElement, f = xc(c.g); a = se(a);) if (!(G && 0 == a.clientWidth ||
            I && 0 == a.clientHeight && a == d) && a != d && a != e && "visible" != oe(a, "overflow")) {
            var h = te(a), k = new M(a.clientLeft, a.clientTop);
            h.x += k.x;
            h.y += k.y;
            b.top = Math.max(b.top, h.y);
            b.right = Math.min(b.right, h.x + a.clientWidth);
            b.bottom = Math.min(b.bottom, h.y + a.clientHeight);
            b.left = Math.max(b.left, h.x)
        }
        d = f.scrollLeft;
        f = f.scrollTop;
        b.left = Math.max(b.left, d);
        b.top = Math.max(b.top, f);
        c = (yc(c.g) || window).document;
        c = Ac(c) ? c.documentElement : c.body;
        c = new jc(c.clientWidth, c.clientHeight);
        b.right = Math.min(b.right, d + c.width);
        b.bottom =
            Math.min(b.bottom, f + c.height);
        return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null
    }, te = function (a) {
        var b = qc(a);
        Ga(a, "Parameter is required");
        var c = new M(0, 0);
        var d = b ? qc(b) : document;
        d = !G || 9 <= Number(Tb) || Ac(N(d).g) ? d.documentElement : d.body;
        if (a == d) return c;
        a = re(a);
        b = zc(N(b).g);
        c.x = a.left + b.x;
        c.y = a.top + b.y;
        return c
    }, we = function (a, b) {
        a = ve(a);
        b = ve(b);
        return new M(a.x - b.x, a.y - b.y)
    }, xe = function (a) {
        a = re(a);
        return new M(a.left, a.top)
    }, ve = function (a) {
        C(a);
        if (1 == a.nodeType) return xe(a);
        a = a.changedTouches ?
            a.changedTouches[0] : a;
        return new M(a.clientX, a.clientY)
    }, pe = function (a) {
        "number" == typeof a && (a += "px");
        return a
    }, ze = function (a) {
        var b = ye;
        if ("none" != oe(a, "display")) return b(a);
        var c = a.style, d = c.display, e = c.visibility, f = c.position;
        c.visibility = "hidden";
        c.position = "absolute";
        c.display = "inline";
        a = b(a);
        c.display = d;
        c.position = f;
        c.visibility = e;
        return a
    }, ye = function (a) {
        var b = a.offsetWidth, c = a.offsetHeight, d = I && !b && !c;
        return (void 0 === b || d) && a.getBoundingClientRect ? (a = re(a), new jc(a.right - a.left, a.bottom - a.top)) :
            new jc(b, c)
    }, Ae = function (a) {
        var b = te(a);
        a = ze(a);
        return new ne(b.x, b.y, a.width, a.height)
    }, Be = function (a) {
        return "rtl" == oe(a, "direction")
    }, Ce = H ? "MozUserSelect" : I || Db ? "WebkitUserSelect" : null;
    var De = function () {
        if (Fb) {
            var a = /Windows NT ([0-9.]+)/;
            return (a = a.exec(ob())) ? a[1] : "0"
        }
        return J ? (a = /1[0|1][_.][0-9_.]+/, (a = a.exec(ob())) ? a[0].replace(/_/g, ".") : "10") : Gb ? (a = /Android\s+([^\);]+)(\)|;)/, (a = a.exec(ob())) ? a[1] : "") : Hb || Ib || Jb ? (a = /(?:iPhone|CPU)\s+OS\s+(\S+)/, (a = a.exec(ob())) ? a[1].replace(/_/g, ".") : "") : ""
    }();
    var Ee = function (a) {
        return (a = a.exec(ob())) ? a[1] : ""
    }, Fe = function () {
        if (Qd) return Ee(/Firefox\/([0-9.]+)/);
        if (G || Db || Cb) return Qb;
        if (Ud) {
            if (yb() || zb()) {
                var a = Ee(/CriOS\/([0-9.]+)/);
                if (a) return a
            }
            return Ee(/Chrome\/([0-9.]+)/)
        }
        if (Vd && !yb()) return Ee(/Version\/([0-9.]+)/);
        if (Rd || Sd) {
            if (a = /Version\/(\S+).*Mobile\/(\S+)/.exec(ob())) return a[1] + "." + a[2]
        } else if (Td) return (a = Ee(/Android\s+([0-9.]+)/)) ? a : Ee(/Version\/([0-9.]+)/);
        return ""
    }();
    var Ge = function (a, b) {
        return (b & 8 && Be(a) ? b ^ 4 : b) & -9
    };
    var He = function (a, b) {
        this.i = a;
        this.u = !!b;
        this.l = {0: this.i + "-arrowright", 1: this.i + "-arrowup", 2: this.i + "-arrowdown", 3: this.i + "-arrowleft"}
    };
    l(He, le);
    He.prototype.o = function () {
        C(this.m, "Must call setElements first.");
        var a = this.Ra;
        2 == a && (a = 0);
        Ie(this, this.Sa, a, 2 == this.Ra ? Je(this.Sa) ? this.g.offsetHeight / 2 : this.g.offsetWidth / 2 : 20, 0)
    };
    var Ie = function (a, b, c, d, e, f) {
        if (a.h) {
            var h = Ke(b, c), k = a.h;
            var p = ze(k);
            p = (Je(b) ? p.height / 2 : p.width / 2) - d;
            var q = Ge(k, h), u;
            if (u = ue(k)) k = Ae(k), k = new me(k.top, k.left + k.width, k.top + k.height, k.left), Je(b) ? k.top < u.top && !(q & 1) ? p -= u.top - k.top : k.bottom > u.bottom && q & 1 && (p -= k.bottom - u.bottom) : k.left < u.left && !(q & 4) ? p -= u.left - k.left : k.right > u.right && q & 4 && (p -= k.right - u.right);
            u = Je(b) ? new M(a.Ya, p) : new M(p, a.Ya);
            q = Je(b) ? 6 : 9;
            a.Pa && 2 == e && (q = Je(b) ? 4 : 1);
            p = b ^ 3;
            Je(b) && "rtl" == a.h.dir && (p = b);
            k = a.h;
            var m = Ke(p, c);
            p = a.g;
            q = a.nb ?
                q : 0;
            C(p);
            var n = p.offsetParent;
            if (n) {
                var x = "HTML" == n.tagName || "BODY" == n.tagName;
                if (!x || "static" != oe(n, "position")) {
                    var w = te(n);
                    if (!x) {
                        x = Be(n);
                        var E;
                        if (E = x) {
                            E = Vd && 0 <= nb(Fe, 10);
                            var K;
                            if (K = Kb) K = 0 <= nb(De, 10);
                            var F = Ud && 0 <= nb(Fe, 85);
                            E = H || E || K || F
                        }
                        x = E ? -n.scrollLeft : x && !Eb && "visible" != oe(n, "overflowX") ? n.scrollWidth - n.clientWidth - n.scrollLeft : n.scrollLeft;
                        w = ic(w, new M(x, n.scrollTop))
                    }
                }
            }
            w = w || new M;
            n = Ae(k);
            if (x = ue(k)) F = new ne(x.left, x.top, x.right - x.left, x.bottom - x.top), x = Math.max(n.left, F.left), E = Math.min(n.left +
                n.width, F.left + F.width), x <= E && (K = Math.max(n.top, F.top), F = Math.min(n.top + n.height, F.top + F.height), K <= F && (n.left = x, n.top = K, n.width = E - x, n.height = F - K));
            x = N(k);
            K = N(p);
            if (x.g != K.g) {
                E = x.g.body;
                K = yc(K.g);
                F = new M(0, 0);
                var W = (W = qc(E)) ? yc(W) : window;
                if (Bb(W, "parent")) {
                    var cd = E;
                    do {
                        var Le = W == K ? te(cd) : xe(C(cd));
                        F.x += Le.x;
                        F.y += Le.y
                    } while (W && W != K && W != W.parent && (cd = W.frameElement) && (W = W.parent))
                }
                E = ic(F, te(E));
                !G || 9 <= Number(Tb) || Ac(x.g) || (E = ic(E, zc(x.g)));
                n.left += E.x;
                n.top += E.y
            }
            k = Ge(k, m);
            m = n.left;
            k & 4 ? m += n.width : k & 2 &&
                (m += n.width / 2);
            m = new M(m, n.top + (k & 1 ? n.height : 0));
            m = ic(m, w);
            u && (m.x += (k & 4 ? -1 : 1) * u.x, m.y += (k & 1 ? -1 : 1) * u.y);
            var r;
            q && (r = ue(p)) && (r.top -= w.y, r.right -= w.x, r.bottom -= w.y, r.left -= w.x);
            u = m;
            u = new M(u.x, u.y);
            m = Ge(p, h);
            h = ze(p);
            k = new jc(h.width, h.height);
            u = new M(u.x, u.y);
            k = new jc(k.width, k.height);
            w = 0;
            if (f || 0 != m) m & 4 ? u.x -= k.width + (f ? f.right : 0) : m & 2 ? u.x -= k.width / 2 : f && (u.x += f.left), m & 1 ? u.y -= k.height + (f ? f.bottom : 0) : f && (u.y += f.top);
            q && (r ? (m = u, w = k, n = 0, 65 == (q & 65) && (m.x < r.left || m.x >= r.right) && (q &= -2), 132 == (q & 132) && (m.y <
                r.top || m.y >= r.bottom) && (q &= -5), m.x < r.left && q & 1 && (m.x = r.left, n |= 1), q & 16 && (x = m.x, m.x < r.left && (m.x = r.left, n |= 4), m.x + w.width > r.right && (w.width = Math.min(r.right - m.x, x + w.width - r.left), w.width = Math.max(w.width, 0), n |= 4)), m.x + w.width > r.right && q & 1 && (m.x = Math.max(r.right - w.width, r.left), n |= 1), q & 2 && (n |= (m.x < r.left ? 16 : 0) | (m.x + w.width > r.right ? 32 : 0)), m.y < r.top && q & 4 && (m.y = r.top, n |= 2), q & 32 && (x = m.y, m.y < r.top && (m.y = r.top, n |= 8), m.y + w.height > r.bottom && (w.height = Math.min(r.bottom - m.y, x + w.height - r.top), w.height = Math.max(w.height,
                0), n |= 8)), m.y + w.height > r.bottom && q & 4 && (m.y = Math.max(r.bottom - w.height, r.top), n |= 2), q & 8 && (n |= (m.y < r.top ? 64 : 0) | (m.y + w.height > r.bottom ? 128 : 0)), r = n) : r = 256, w = r);
            q = new ne(0, 0, 0, 0);
            q.left = u.x;
            q.top = u.y;
            q.width = k.width;
            q.height = k.height;
            r = w;
            r & 496 || (qe(p, new M(q.left, q.top)), k = new jc(q.width, q.height), h == k || h && k && h.width == k.width && h.height == k.height || (h = k, p = p.style, H ? p.MozBoxSizing = "border-box" : I ? p.WebkitBoxSizing = "border-box" : p.boxSizing = "border-box", p.width = Math.max(h.width, 0) + "px", p.height = Math.max(h.height,
                0) + "px"));
            if (2 != e && r & 496) {
                Ie(a, b ^ 3, c, d, a.Pa && 0 == e ? 1 : 2, f);
                return
            }
            !a.u || r & 496 || (e = parseFloat(a.g.style.left), f = parseFloat(a.g.style.top), C(!isNaN(e) && !isNaN(f), "Could not parse position."), isFinite(e) && 0 == e % 1 && isFinite(f) && 0 == f % 1 || qe(a.g, Math.round(e), Math.round(f)))
        }
        Me(a, b, c, d)
    }, Me = function (a, b, c, d) {
        var e = a.m;
        Ub(a.l, function (f) {
            je(e, f)
        }, a);
        he(e, a.l[b]);
        e.style.top = e.style.left = e.style.right = e.style.bottom = "";
        a.h ? (c = we(a.h, a.g), d = Ne(a.h, b), Je(b) ? e.style.top = Oe(c.y + d.y, a.g.offsetHeight - 15) + "px" : e.style.left =
            Oe(c.x + d.x, a.g.offsetWidth - 15) + "px") : e.style[0 == c ? Je(b) ? "top" : "left" : Je(b) ? "bottom" : "right"] = d + "px"
    }, Oe = function (a, b) {
        return 15 > b ? 15 : Math.min(Math.max(a, 15), b)
    }, Ke = function (a, b) {
        switch (a) {
            case 2:
                return 0 == b ? 1 : 5;
            case 1:
                return 0 == b ? 0 : 4;
            case 0:
                return 0 == b ? 12 : 13;
            default:
                return 0 == b ? 8 : 9
        }
    }, Ne = function (a, b) {
        var c = 0, d = 0;
        a = ze(a);
        switch (b) {
            case 2:
                c = a.width / 2;
                break;
            case 1:
                c = a.width / 2;
                d = a.height;
                break;
            case 0:
                d = a.height / 2;
                break;
            case 3:
                c = a.width, d = a.height / 2
        }
        return new M(c, d)
    }, Je = function (a) {
        return 0 == a || 3 == a
    };
    g = He.prototype;
    g.nb = !1;
    g.Ra = 2;
    g.Sa = 3;
    g.Ya = -5;
    g.Pa = !1;
    var Pe = {
        Kb: "activedescendant",
        Pb: "atomic",
        Qb: "autocomplete",
        Sb: "busy",
        sb: "checked",
        Vb: "colindex",
        ac: "controls",
        bc: "current",
        dc: "describedby",
        DISABLED: "disabled",
        ic: "dropeffect",
        jc: "expanded",
        kc: "flowto",
        mc: "grabbed",
        qc: "haspopup",
        sc: "hidden",
        uc: "invalid",
        vc: "label",
        wc: "labelledby",
        xc: "level",
        Cc: "live",
        Rc: "multiline",
        Sc: "multiselectable",
        Wc: "orientation",
        Xc: "owns",
        Yc: "posinset",
        ad: "pressed",
        ed: "readonly",
        gd: "relevant",
        hd: "required",
        md: "rowindex",
        od: "selected",
        qd: "setsize",
        sd: "sort",
        Hd: "valuemax",
        Id: "valuemin",
        Jd: "valuenow",
        Kd: "valuetext"
    };
    var Qe;
    var Re = {
        Lb: "alert",
        Mb: "alertdialog",
        Nb: "application",
        Ob: "article",
        Rb: "banner",
        Tb: "button",
        Ub: "checkbox",
        Wb: "columnheader",
        Xb: "combobox",
        Yb: "complementary",
        Zb: "contentinfo",
        cc: "definition",
        ec: "dialog",
        fc: "directory",
        hc: "document",
        lc: "form",
        nc: "grid",
        oc: "gridcell",
        pc: "group",
        rc: "heading",
        tc: "img",
        yc: "link",
        zc: "list",
        Ac: "listbox",
        Bc: "listitem",
        Dc: "log",
        Ec: "main",
        Fc: "marquee",
        Gc: "math",
        Hc: "menu",
        Ic: "menubar",
        Jc: "menuitem",
        Kc: "menuitemcheckbox",
        Lc: "menuitemradio",
        Tc: "navigation",
        Uc: "note",
        Vc: "option",
        Zc: "presentation",
        bd: "progressbar",
        cd: "radio",
        dd: "radiogroup",
        fd: "region",
        jd: "row",
        kd: "rowgroup",
        ld: "rowheader",
        nd: "scrollbar",
        SEARCH: "search",
        pd: "separator",
        rd: "slider",
        td: "spinbutton",
        ud: "status",
        TAB: "tab",
        vd: "tablist",
        wd: "tabpanel",
        xd: "textbox",
        yd: "textinfo",
        zd: "timer",
        Ad: "toolbar",
        Bd: "tooltip",
        Cd: "tree",
        Dd: "treegrid",
        Ed: "treeitem"
    };
    var Se = "combobox grid group listbox menu menubar radiogroup row rowgroup tablist textbox toolbar tree treegrid".split(" "),
        Te = function (a, b) {
            b ? (C(Vb(Re, b), "No such ARIA role " + b), a.setAttribute("role", b)) : a.removeAttribute("role")
        }, Ve = function (a, b, c) {
            Array.isArray(c) && (c = c.join(" "));
            var d = Ue(b);
            "" === c || void 0 == c ? (Qe || (c = {}, Qe = (c.atomic = !1, c.autocomplete = "none", c.dropeffect = "none", c.haspopup = !1, c.live = "off", c.multiline = !1, c.multiselectable = !1, c.orientation = "vertical", c.readonly = !1, c.relevant = "additions text",
                c.required = !1, c.sort = "none", c.busy = !1, c.disabled = !1, c.hidden = !1, c.invalid = "false", c)), c = Qe, b in c ? a.setAttribute(d, c[b]) : a.removeAttribute(d)) : a.setAttribute(d, c)
        }, We = function (a, b) {
            a = a.getAttribute(Ue(b));
            return null == a || void 0 == a ? "" : String(a)
        }, Xe = function (a) {
            var b = We(a, "activedescendant");
            return qc(a).getElementById(b)
        }, Ue = function (a) {
            C(a, "ARIA attribute cannot be empty.");
            C(Vb(Pe, a), "No such ARIA attribute " + a);
            return "aria-" + a
        };

    function Ye(a) {
        a && "function" == typeof a.va && a.va()
    };var S = function () {
        this.O = this.O;
        this.H = this.H
    };
    S.prototype.O = !1;
    S.prototype.va = function () {
        this.O || (this.O = !0, this.v())
    };
    var Ze = function (a, b) {
        b = z(Ye, b);
        a.O ? b() : (a.H || (a.H = []), a.H.push(b))
    };
    S.prototype.v = function () {
        if (this.H) for (; this.H.length;) this.H.shift()()
    };
    var $e = function (a) {
        S.call(this);
        this.dom = a || N()
    };
    l($e, S);
    $e.prototype.l = function () {
        Te(this.j(), "tooltip");
        Ve(this.j(), "live", "polite")
    };
    var af = function (a) {
        $e.call(this, a);
        this.g = this.dom.Z("DIV", "jfk-tooltip-contentId");
        this.i = this.dom.Z("DIV", "jfk-tooltip-arrow", this.dom.Z("DIV", "jfk-tooltip-arrowimplbefore"), this.dom.Z("DIV", "jfk-tooltip-arrowimplafter"));
        this.h = this.dom.Z("DIV", {"class": "jfk-tooltip", role: "tooltip"}, this.g, this.i);
        this.l()
    };
    l(af, $e);
    af.prototype.j = function () {
        return this.h
    };
    af.prototype.v = function () {
        $e.prototype.v.call(this);
        this.h && Hc(this.h)
    };
    var bf = function (a) {
        af.call(this, a)
    };
    l(bf, af);
    bf.prototype.l = function () {
        Te(this.j(), "tooltip")
    };
    var cf = function (a, b) {
        this.type = a;
        this.i = this.target = b;
        this.defaultPrevented = this.m = !1
    };
    cf.prototype.o = function () {
        this.m = !0
    };
    cf.prototype.l = function () {
        this.defaultPrevented = !0
    };
    var df = function () {
        if (!t.addEventListener || !Object.defineProperty) return !1;
        var a = !1, b = Object.defineProperty({}, "passive", {
            get: function () {
                a = !0
            }
        });
        try {
            t.addEventListener("test", function () {
            }, b), t.removeEventListener("test", function () {
            }, b)
        } catch (c) {
        }
        return a
    }();
    var T = function (a, b) {
        cf.call(this, a ? a.type : "");
        this.relatedTarget = this.i = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.g = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.u = !1;
        this.pointerId = 0;
        this.pointerType = "";
        this.h = null;
        if (a) {
            var c = this.type = a.type, d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.i = b;
            (b = a.relatedTarget) ? H && (Bb(b, "nodeName") || (b = null)) : "mouseover" ==
            c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
            this.relatedTarget = b;
            d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
            this.button = a.button;
            this.g = a.keyCode || 0;
            this.key = a.key || "";
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.u = J ? a.metaKey : a.ctrlKey;
            this.pointerId = a.pointerId || 0;
            this.pointerType = "string" === typeof a.pointerType ? a.pointerType : ef[a.pointerType] || "";
            this.state = a.state;
            this.h = a;
            a.defaultPrevented && T.s.l.call(this)
        }
    };
    A(T, cf);
    var ef = ad({2: "touch", 3: "pen", 4: "mouse"});
    T.prototype.o = function () {
        T.s.o.call(this);
        this.h.stopPropagation ? this.h.stopPropagation() : this.h.cancelBubble = !0
    };
    T.prototype.l = function () {
        T.s.l.call(this);
        var a = this.h;
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    };
    var ff = "closure_listenable_" + (1E6 * Math.random() | 0), gf = function (a) {
        return !(!a || !a[ff])
    };
    var hf = 0;
    var jf = function (a, b, c, d, e) {
        this.listener = a;
        this.proxy = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.Da = e;
        this.key = ++hf;
        this.removed = this.ya = !1
    }, kf = function (a) {
        a.removed = !0;
        a.listener = null;
        a.proxy = null;
        a.src = null;
        a.Da = null
    };
    var lf = function (a) {
        this.src = a;
        this.g = {};
        this.h = 0
    };
    lf.prototype.add = function (a, b, c, d, e) {
        var f = a.toString();
        a = this.g[f];
        a || (a = this.g[f] = [], this.h++);
        var h = mf(a, b, d, e);
        -1 < h ? (b = a[h], c || (b.ya = !1)) : (b = new jf(b, this.src, f, !!d, e), b.ya = c, a.push(b));
        return b
    };
    lf.prototype.remove = function (a, b, c, d) {
        a = a.toString();
        if (!(a in this.g)) return !1;
        var e = this.g[a];
        b = mf(e, b, c, d);
        return -1 < b ? (kf(e[b]), C(null != e.length), Array.prototype.splice.call(e, b, 1), 0 == e.length && (delete this.g[a], this.h--), !0) : !1
    };
    var nf = function (a, b) {
        var c = b.type;
        if (c in a.g) {
            var d = a.g[c], e = Ra(d, b), f;
            if (f = 0 <= e) C(null != d.length), Array.prototype.splice.call(d, e, 1);
            f && (kf(b), 0 == a.g[c].length && (delete a.g[c], a.h--))
        }
    };
    lf.prototype.removeAll = function (a) {
        a = a && a.toString();
        var b = 0, c;
        for (c in this.g) if (!a || c == a) {
            for (var d = this.g[c], e = 0; e < d.length; e++) ++b, kf(d[e]);
            delete this.g[c];
            this.h--
        }
        return b
    };
    var of = function (a, b, c, d, e) {
        a = a.g[b.toString()];
        b = -1;
        a && (b = mf(a, c, d, e));
        return -1 < b ? a[b] : null
    }, mf = function (a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.removed && f.listener == b && f.capture == !!c && f.Da == d) return e
        }
        return -1
    };
    var pf = "closure_lm_" + (1E6 * Math.random() | 0), qf = {}, rf = 0, tf = function (a, b, c, d, e) {
        if (d && d.once) return sf(a, b, c, d, e);
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++) tf(a, b[f], c, d, e);
            return null
        }
        c = uf(c);
        return gf(a) ? a.listen(b, c, v(d) ? !!d.capture : !!d, e) : vf(a, b, c, !1, d, e)
    }, vf = function (a, b, c, d, e, f) {
        if (!b) throw Error("Invalid event type");
        var h = v(e) ? !!e.capture : !!e, k = wf(a);
        k || (a[pf] = k = new lf(a));
        c = k.add(b, c, d, h, f);
        if (c.proxy) return c;
        d = xf();
        c.proxy = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener) df || (e = h), void 0 ===
        e && (e = !1), a.addEventListener(b.toString(), d, e); else if (a.attachEvent) a.attachEvent(yf(b.toString()), d); else if (a.addListener && a.removeListener) C("change" === b, "MediaQueryList only has a change event"), a.addListener(d); else throw Error("addEventListener and attachEvent are unavailable.");
        rf++;
        return c
    }, xf = function () {
        var a = zf, b = function (c) {
            return a.call(b.src, b.listener, c)
        };
        return b
    }, sf = function (a, b, c, d, e) {
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++) sf(a, b[f], c, d, e);
            return null
        }
        c = uf(c);
        return gf(a) ?
            a.m.add(String(b), c, !0, v(d) ? !!d.capture : !!d, e) : vf(a, b, c, !0, d, e)
    }, Af = function (a, b, c, d, e) {
        if (Array.isArray(b)) for (var f = 0; f < b.length; f++) Af(a, b[f], c, d, e); else d = v(d) ? !!d.capture : !!d, c = uf(c), gf(a) ? a.m.remove(String(b), c, d, e) : a && (a = wf(a)) && (b = of(a, b, c, d, e)) && Bf(b)
    }, Bf = function (a) {
        if ("number" !== typeof a && a && !a.removed) {
            var b = a.src;
            if (gf(b)) nf(b.m, a); else {
                var c = a.type, d = a.proxy;
                b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(yf(c), d) : b.addListener && b.removeListener &&
                    b.removeListener(d);
                rf--;
                (c = wf(b)) ? (nf(c, a), 0 == c.h && (c.src = null, b[pf] = null)) : kf(a)
            }
        }
    }, yf = function (a) {
        return a in qf ? qf[a] : qf[a] = "on" + a
    }, zf = function (a, b) {
        if (a.removed) a = !0; else {
            b = new T(b, this);
            var c = a.listener, d = a.Da || a.src;
            a.ya && Bf(a);
            a = c.call(d, b)
        }
        return a
    }, wf = function (a) {
        a = a[pf];
        return a instanceof lf ? a : null
    }, Cf = "__closure_events_fn_" + (1E9 * Math.random() >>> 0), uf = function (a) {
        C(a, "Listener can not be null.");
        if ("function" === typeof a) return a;
        C(a.handleEvent, "An object listener must have handleEvent method.");
        a[Cf] || (a[Cf] = function (b) {
            return a.handleEvent(b)
        });
        return a[Cf]
    };
    var U = function () {
        S.call(this);
        this.m = new lf(this);
        this.ub = this;
        this.Y = null
    };
    A(U, S);
    U.prototype[ff] = !0;
    g = U.prototype;
    g.Za = function (a) {
        this.Y = a
    };
    g.removeEventListener = function (a, b, c, d) {
        Af(this, a, b, c, d)
    };
    g.K = function (a) {
        Df(this);
        var b = this.Y;
        if (b) {
            var c = [];
            for (var d = 1; b; b = b.Y) c.push(b), C(1E3 > ++d, "infinite loop")
        }
        b = this.ub;
        d = a.type || a;
        if ("string" === typeof a) a = new cf(a, b); else if (a instanceof cf) a.target = a.target || b; else {
            var e = a;
            a = new cf(d, b);
            Xb(a, e)
        }
        e = !0;
        if (c) for (var f = c.length - 1; !a.m && 0 <= f; f--) {
            var h = a.i = c[f];
            e = Ef(h, d, !0, a) && e
        }
        a.m || (h = a.i = b, e = Ef(h, d, !0, a) && e, a.m || (e = Ef(h, d, !1, a) && e));
        if (c) for (f = 0; !a.m && f < c.length; f++) h = a.i = c[f], e = Ef(h, d, !1, a) && e;
        return e
    };
    g.v = function () {
        U.s.v.call(this);
        this.m && this.m.removeAll(void 0);
        this.Y = null
    };
    g.listen = function (a, b, c, d) {
        Df(this);
        return this.m.add(String(a), b, !1, c, d)
    };
    var Ef = function (a, b, c, d) {
        b = a.m.g[String(b)];
        if (!b) return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var h = b[f];
            if (h && !h.removed && h.capture == c) {
                var k = h.listener, p = h.Da || h.src;
                h.ya && nf(a.m, h);
                e = !1 !== k.call(p, d) && e
            }
        }
        return e && !d.defaultPrevented
    }, Df = function (a) {
        C(a.m, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
    };
    var Ff = function (a, b, c) {
        if ("function" === typeof a) c && (a = y(a, c)); else if (a && "function" == typeof a.handleEvent) a = y(a.handleEvent, a); else throw Error("Invalid listener argument");
        return 2147483647 < Number(b) ? -1 : t.setTimeout(a, b || 0)
    };
    var Gf = function (a, b, c) {
        S.call(this);
        this.g = a;
        this.l = b || 0;
        this.h = c;
        this.i = y(this.xb, this)
    };
    A(Gf, S);
    g = Gf.prototype;
    g.U = 0;
    g.v = function () {
        Gf.s.v.call(this);
        this.stop();
        delete this.g;
        delete this.h
    };
    g.start = function (a) {
        this.stop();
        this.U = Ff(this.i, void 0 !== a ? a : this.l)
    };
    g.stop = function () {
        this.isActive() && t.clearTimeout(this.U);
        this.U = 0
    };
    g.isActive = function () {
        return 0 != this.U
    };
    g.xb = function () {
        this.U = 0;
        this.g && this.g.call(this.h)
    };
    var V = function (a) {
        S.call(this);
        this.S = a;
        this.m = {}
    };
    A(V, S);
    var Hf = [];
    V.prototype.listen = function (a, b, c, d) {
        Array.isArray(b) || (b && (Hf[0] = b.toString()), b = Hf);
        for (var e = 0; e < b.length; e++) {
            var f = tf(a, b[e], c || this.handleEvent, d || !1, this.S || this);
            if (!f) break;
            this.m[f.key] = f
        }
        return this
    };
    var If = function (a, b, c, d, e, f) {
        if (Array.isArray(c)) for (var h = 0; h < c.length; h++) If(a, b, c[h], d, e, f); else d = d || a.handleEvent, e = v(e) ? !!e.capture : !!e, f = f || a.S || a, d = uf(d), e = !!e, c = gf(b) ? of(b.m, String(c), d, e, f) : b ? (b = wf(b)) ? of(b, c, d, e, f) : null : null, c && (Bf(c), delete a.m[c.key]);
        return a
    };
    V.prototype.removeAll = function () {
        Ub(this.m, function (a, b) {
            this.m.hasOwnProperty(b) && Bf(a)
        }, this);
        this.m = {}
    };
    V.prototype.v = function () {
        V.s.v.call(this);
        this.removeAll()
    };
    V.prototype.handleEvent = function () {
        throw Error("EventHandler.handleEvent not implemented");
    };
    var Lf = function (a) {
        return mc(eb(a.replace(Jf, function (b, c) {
            return Kf.test(c) ? "" : " "
        }).replace(/[\t\n ]+/g, " ")))
    }, Kf = /^(?:abbr|acronym|address|b|em|i|small|strong|su[bp]|u)$/i, Jf = /<[!\/]?([a-z0-9]+)([\/ ][^>]*)?>/gi;
    var Mf = {}, Nf = function (a) {
        V.call(this);
        this.X = a;
        this.G = new Gf(this.ra, 0, this);
        Ze(this, this.G);
        var b = window;
        this.u = "function" === typeof b.MutationObserver ? new b.MutationObserver(y(this.ma, this)) : null;
        a = a.g;
        this.listen(a, "mouseout mousedown click blur focusout keydown".split(" "), this.P, !0);
        this.listen(a, ["mouseover", "focus", "focusin"], this.qa, !0)
    };
    l(Nf, V);
    Nf.prototype.v = function () {
        Of(this);
        V.prototype.v.call(this)
    };
    var Pf = function (a, b) {
        switch (b.type) {
            case "mousedown":
            case "mouseover":
            case "mouseout":
            case "click":
                a.Y = !1;
                break;
            case "keydown":
                a.Y = !0
        }
    };
    Nf.prototype.qa = function (a) {
        this.u && this.u.disconnect();
        Pf(this, a);
        var b = a.target;
        a = "focus" == a.type || "focusin" == a.type;
        var c = this.g && Ic(this.g.g, b);
        if (this.Y || !a || c) {
            this.na = a;
            if (a = b && b.getAttribute && this.u) a = b.getAttribute("role") || null, a = Ta(Se, a);
            a && (this.u.observe(b, {attributes: !0}), (a = Xe(b)) && (b = a));
            this.i = b
        } else this.i = null;
        Qf(this)
    };
    Nf.prototype.P = function (a) {
        Pf(this, a);
        var b = a.target;
        a = "mousedown" == a.type || "click" == a.type;
        b = this.g && Ic(this.g.g, b);
        a && b || (this.i = null, Qf(this))
    };
    Nf.prototype.ma = function (a) {
        Sa(a, y(function (b) {
            var c = Xe(b.target);
            c && "aria-activedescendant" == b.attributeName && (this.i = c, Qf(this))
        }, this))
    };
    var Qf = function (a) {
        if (!(a.G.isActive() && a.h && a.o)) {
            Of(a);
            var b = null != a.o ? a.o : 50;
            a.G.start(a.h ? b : 300)
        }
    }, Of = function (a) {
        a.C && (t.clearTimeout(a.C), a.C = 0, a.h = null)
    };
    Nf.prototype.ra = function () {
        if (!this.i) Rf(this), this.o = this.h = null; else if (!(this.h && this.g && Ic(this.g.j(), this.i)) || this.h.getAttribute("data-tooltip-unhoverable")) {
            var a = Pc(this.i, function (k) {
                return k.getAttribute && (k.getAttribute("data-tooltip-contained") || k.getAttribute("data-tooltip") || k.g) && !k.getAttribute("data-tooltip-suspended")
            }), b = !1;
            this.h && this.h != a && (Rf(this), this.o = this.h = null, b = !0);
            if (!this.h && a && (this.h = a, !(a.getAttribute("data-tooltip-only-on-overflow") && a.offsetWidth >= a.scrollWidth &&
                a.offsetHeight >= a.scrollHeight || this.na && "mouse" == a.getAttribute("data-tooltip-trigger")))) {
                var c = dc;
                if (a.getAttribute("data-tooltip-contained")) for (var d = tc(a), e = 0; e < d.length; e++) {
                    if (d[e].parentNode == a) {
                        c = d[e].cloneNode(!0);
                        break
                    }
                } else c = a.g ? a.g : cc(a.getAttribute("data-tooltip"));
                d = a.getAttribute("data-tooltip-align");
                e = a.getAttribute("data-tooltip-class");
                var f = a.getAttribute("data-tooltip-offset");
                f = db(oc(f)) ? -1 : Number(f);
                var h = a.getAttribute("data-tooltip-hide-delay");
                h = db(oc(h)) ? null : Number(h);
                if (!b && (a = a.getAttribute("data-tooltip-delay"), a = Math.max(0, a - 300))) {
                    this.C = Ff(z(this.L, this.h, c, d, f, e, h), a, this);
                    return
                }
                this.L(this.h, c, d, f, e, h)
            }
        }
    };
    var Sf = function (a) {
        if (a) switch (a.toLowerCase().split(",")[0]) {
            case "l":
                return 0;
            case "t":
                return 2;
            case "r":
                return 3
        }
        return 1
    };
    Nf.prototype.L = function (a, b, c, d, e, f) {
        this.C = 0;
        this.o = f;
        if (!this.g) {
            this.g = new bf(this.X);
            Rf(this);
            f = this.X.g.body;
            var h = this.g.j();
            C(null != f && null != h, "goog.dom.appendChild expects non-null arguments");
            f.appendChild(h);
            Ze(this, this.g);
            this.l = new He("jfk-tooltip", !0);
            this.l.nb = !0;
            this.l.Pa = !0;
            f = this.l;
            h = this.g.j();
            var k = this.g.i;
            f.g = h;
            f.m = k
        }
        a:{
            if (c) switch (c.toLowerCase().split(",")[1]) {
                case "l":
                    h = 0;
                    break a;
                case "r":
                    h = 1;
                    break a
            }
            h = 2
        }
        f = this.l;
        c = Sf(c);
        null != c && (f.Sa = c);
        null != h && (f.Ra = h);
        "number" === typeof d &&
        (f.Ya = d);
        je(this.g.j(), "jfk-tooltip-hide");
        this.D != e && (this.D && !db(oc(this.D)) && je(this.g.j(), this.D), db(oc(e)) || he(this.g.j(), e), this.D = e);
        qe(this.g.j(), 0, 0);
        if (b instanceof L) {
            d = this.g.g;
            if (void 0 !== d.tagName) {
                if ("script" === d.tagName.toLowerCase()) throw Error("Use safeScriptEl.setTextContent with a SafeScript.");
                if ("style" === d.tagName.toLowerCase()) throw Error("Use safeStyleEl.setTextContent with a SafeStyleSheet.");
            }
            d.innerHTML = $b(b)
        } else for (Gc(this.g.g); d = b.firstChild;) this.g.g.appendChild(d);
        this.l.h = a;
        this.l.o()
    };
    var Rf = function (a) {
        a.g && he(a.g.j(), "jfk-tooltip-hide")
    };
    var Tf = [], Uf = function (a) {
        C(!Object.isSealed(a), "Cannot use getInstance() with a sealed constructor.");
        var b = "ha";
        if (a.ha && a.hasOwnProperty(b)) return a.ha;
        Tf.push(a);
        var c = new a;
        a.ha = c;
        C(a.hasOwnProperty(b), "Could not instantiate singleton.");
        return c
    };
    var Xf = function (a, b, c, d, e, f) {
        if (J && e) return Vf(a);
        if (e && !d) return !1;
        if (!H) {
            "number" === typeof b && (b = Wf(b));
            var h = 17 == b || 18 == b || J && 91 == b;
            if ((!c || J) && h || J && 16 == b && (d || f)) return !1
        }
        if ((I || Db) && d && c) switch (a) {
            case 220:
            case 219:
            case 221:
            case 192:
            case 186:
            case 189:
            case 187:
            case 188:
            case 190:
            case 191:
            case 192:
            case 222:
                return !1
        }
        if (G && d && b == a) return !1;
        switch (a) {
            case 13:
                return H ? f || e ? !1 : !(c && d) : !0;
            case 27:
                return !(I || Db || H)
        }
        return H && (d || e || f) ? !1 : Vf(a)
    }, Vf = function (a) {
        if (48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <= a && 90 >=
            a || (I || Db) && 0 == a) return !0;
        switch (a) {
            case 32:
            case 43:
            case 63:
            case 64:
            case 107:
            case 109:
            case 110:
            case 111:
            case 186:
            case 59:
            case 189:
            case 187:
            case 61:
            case 188:
            case 190:
            case 191:
            case 192:
            case 222:
            case 219:
            case 220:
            case 221:
            case 163:
            case 58:
                return !0;
            case 173:
                return H;
            default:
                return !1
        }
    }, Wf = function (a) {
        if (H) a = Yf(a); else if (J && I) switch (a) {
            case 93:
                a = 91
        }
        return a
    }, Yf = function (a) {
        switch (a) {
            case 61:
                return 187;
            case 59:
                return 186;
            case 173:
                return 189;
            case 224:
                return 91;
            case 0:
                return 224;
            default:
                return a
        }
    };
    var Zf = function (a, b, c, d) {
        T.call(this, d);
        this.type = "key";
        this.g = a;
        this.repeat = c
    };
    A(Zf, T);
    var $f = function (a, b) {
        U.call(this);
        a && this.attach(a, b)
    };
    A($f, U);
    g = $f.prototype;
    g.ia = null;
    g.Ea = null;
    g.Xa = null;
    g.Fa = null;
    g.I = -1;
    g.ba = -1;
    g.Qa = !1;
    var ag = {
        3: 13,
        12: 144,
        63232: 38,
        63233: 40,
        63234: 37,
        63235: 39,
        63236: 112,
        63237: 113,
        63238: 114,
        63239: 115,
        63240: 116,
        63241: 117,
        63242: 118,
        63243: 119,
        63244: 120,
        63245: 121,
        63246: 122,
        63247: 123,
        63248: 44,
        63272: 46,
        63273: 36,
        63275: 35,
        63276: 33,
        63277: 34,
        63289: 144,
        63302: 45
    }, bg = {
        Up: 38,
        Down: 40,
        Left: 37,
        Right: 39,
        Enter: 13,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        "U+007F": 46,
        Home: 36,
        End: 35,
        PageUp: 33,
        PageDown: 34,
        Insert: 45
    }, cg = J && H;
    g = $f.prototype;
    g.Db = function (a) {
        if (I || Db) if (17 == this.I && !a.ctrlKey || 18 == this.I && !a.altKey || J && 91 == this.I && !a.metaKey) this.ba = this.I = -1;
        -1 == this.I && (a.ctrlKey && 17 != a.g ? this.I = 17 : a.altKey && 18 != a.g ? this.I = 18 : a.metaKey && 91 != a.g && (this.I = 91));
        Xf(a.g, this.I, a.shiftKey, a.ctrlKey, a.altKey, a.metaKey) ? (this.ba = Wf(a.g), cg && (this.Qa = a.altKey)) : this.handleEvent(a)
    };
    g.Fb = function (a) {
        this.ba = this.I = -1;
        this.Qa = a.altKey
    };
    g.handleEvent = function (a) {
        var b = a.h, c = b.altKey;
        if (G && "keypress" == a.type) {
            var d = this.ba;
            var e = 13 != d && 27 != d ? b.keyCode : 0
        } else (I || Db) && "keypress" == a.type ? (d = this.ba, e = 0 <= b.charCode && 63232 > b.charCode && Vf(d) ? b.charCode : 0) : ("keypress" == a.type ? (cg && (c = this.Qa), b.keyCode == b.charCode ? 32 > b.keyCode ? (d = b.keyCode, e = 0) : (d = this.ba, e = b.charCode) : (d = b.keyCode || this.ba, e = b.charCode || 0)) : (d = b.keyCode || this.ba, e = b.charCode || 0), J && 63 == e && 224 == d && (d = 191));
        var f = d = Wf(d);
        d ? 63232 <= d && d in ag ? f = ag[d] : 25 == d && a.shiftKey && (f =
            9) : b.keyIdentifier && b.keyIdentifier in bg && (f = bg[b.keyIdentifier]);
        if (!H || "keypress" != a.type || Xf(f, this.I, a.shiftKey, a.ctrlKey, c, a.metaKey)) a = f == this.I, this.I = f, b = new Zf(f, e, a, b), b.altKey = c, this.K(b)
    };
    g.j = function () {
        return this.ia
    };
    g.attach = function (a, b) {
        this.Fa && this.detach();
        this.ia = a;
        this.Ea = tf(this.ia, "keypress", this, b);
        this.Xa = tf(this.ia, "keydown", this.Db, b, this);
        this.Fa = tf(this.ia, "keyup", this.Fb, b, this)
    };
    g.detach = function () {
        this.Ea && (Bf(this.Ea), Bf(this.Xa), Bf(this.Fa), this.Fa = this.Xa = this.Ea = null);
        this.ia = null;
        this.ba = this.I = -1
    };
    g.v = function () {
        $f.s.v.call(this);
        this.detach()
    };
    var dg = function () {
    };
    pa(dg);
    dg.prototype.g = 0;
    var fg = function (a) {
        U.call(this);
        this.i = a || N();
        this.La = eg;
        this.U = null;
        this.N = !1;
        this.h = null;
        this.u = void 0;
        this.S = this.na = this.l = null;
        this.jb = !1
    };
    A(fg, U);
    fg.prototype.vb = dg.aa();
    var eg = null, gg = function (a, b) {
        switch (a) {
            case 1:
                return b ? "disable" : "enable";
            case 2:
                return b ? "highlight" : "unhighlight";
            case 4:
                return b ? "activate" : "deactivate";
            case 8:
                return b ? "select" : "unselect";
            case 16:
                return b ? "check" : "uncheck";
            case 32:
                return b ? "focus" : "blur";
            case 64:
                return b ? "open" : "close"
        }
        throw Error("Invalid component state");
    }, hg = function (a, b) {
        if (a.l && a.l.S) {
            var c = a.l.S, d = a.U;
            d in c && delete c[d];
            c = a.l.S;
            if (null !== c && b in c) throw Error('The object already contains the key "' + b + '"');
            c[b] = a
        }
        a.U = b
    };
    fg.prototype.j = function () {
        return this.h
    };
    var ig = function (a) {
        a = a.h;
        C(a, "Can not call getElementStrict before rendering/decorating.");
        return a
    }, jg = function (a) {
        return a.h ? uc("jfk-checkbox-checkmark", a.h || a.i.g) : null
    }, kg = function (a) {
        a.u || (a.u = new V(a));
        return C(a.u)
    };
    fg.prototype.Za = function (a) {
        if (this.l && this.l != a) throw Error("Method not supported");
        fg.s.Za.call(this, a)
    };
    fg.prototype.ma = function () {
        this.h = Dc(this.i.g, "DIV")
    };
    var lg = function (a, b) {
        if (a.N) throw Error("Component already rendered");
        a.h || a.ma();
        b ? b.insertBefore(a.h, null) : a.i.g.body.appendChild(a.h);
        a.l && !a.l.N || a.T()
    }, mg = function (a, b) {
        if (a.N) throw Error("Component already rendered");
        if (b && a.bb(b)) {
            a.jb = !0;
            var c = qc(b);
            a.i && a.i.g == c || (a.i = N(b));
            a.za(b);
            a.T()
        } else throw Error("Invalid element to decorate");
    };
    g = fg.prototype;
    g.bb = function () {
        return !0
    };
    g.za = function (a) {
        this.h = a
    };
    g.T = function () {
        this.N = !0;
        ng(this, function (a) {
            !a.N && a.j() && a.T()
        })
    };
    g.wa = function () {
        ng(this, function (a) {
            a.N && a.wa()
        });
        this.u && this.u.removeAll();
        this.N = !1
    };
    g.v = function () {
        this.N && this.wa();
        this.u && (this.u.va(), delete this.u);
        ng(this, function (a) {
            a.va()
        });
        !this.jb && this.h && Hc(this.h);
        this.l = this.h = this.S = this.na = null;
        fg.s.v.call(this)
    };
    var ng = function (a, b) {
        a.na && a.na.forEach(b, void 0)
    };
    var og = function () {
    }, pg;
    pa(og);
    var rg = function () {
        var a = new qg;
        a.A = function () {
            return "jfk-checkbox"
        };
        return a
    }, sg = {
        button: "pressed",
        checkbox: "checked",
        menuitem: "selected",
        menuitemcheckbox: "checked",
        menuitemradio: "checked",
        radio: "checked",
        tab: "selected",
        treeitem: "selected"
    };
    g = og.prototype;
    g.oa = function () {
    };
    g.fa = function (a) {
        return a.i.Z("DIV", tg(this, a).join(" "), a.getContent())
    };
    g.pa = function (a) {
        return a
    };
    g.cb = function () {
        return !0
    };
    g.M = function (a, b) {
        b.id && hg(a, b.id);
        var c = this.pa(b);
        c && c.firstChild ? ug(a, c.firstChild.nextSibling ? Ua(c.childNodes) : c.firstChild) : a.ua = null;
        var d = 0, e = this.A(), f = this.A(), h = !1, k = !1, p = Ua(ee(b));
        p.forEach(function (q) {
            h || q != e ? k || q != f ? d |= vg(this, q) : k = !0 : (h = !0, f == e && (k = !0));
            1 == vg(this, q) && (Ia(c), c.hasAttribute("tabindex") && Mc(c) && Lc(c, !1))
        }, this);
        a.B = d;
        h || (p.push(e), f == e && (k = !0));
        k || p.push(f);
        (a = a.Ua) && p.push.apply(p, a);
        h && k && !a || fe(b, p.join(" "));
        return b
    };
    g.mb = function (a) {
        null == a.La && (a.La = Be(a.N ? a.h : a.i.g.body));
        a.La && this.fb(a.j(), !0);
        a.isEnabled() && this.Ga(a, a.isVisible())
    };
    var wg = function (a, b) {
        if (a = a.oa()) {
            C(b, "The element passed as a first parameter cannot be null.");
            var c = b.getAttribute("role") || null;
            a != c && Te(b, a)
        }
    };
    g = og.prototype;
    g.Ia = function (a, b) {
        var c = !b;
        b = G ? a.getElementsByTagName("*") : null;
        if (Ce) {
            if (c = c ? "none" : "", a.style && (a.style[Ce] = c), b) {
                a = 0;
                for (var d; d = b[a]; a++) d.style && (d.style[Ce] = c)
            }
        } else if (G && (c = c ? "on" : "", a.setAttribute("unselectable", c), b)) for (a = 0; d = b[a]; a++) d.setAttribute("unselectable", c)
    };
    g.fb = function (a, b) {
        var c = this.A() + "-rtl";
        (a = a.j ? a.j() : a) && (b ? ie : ke)(a, [c])
    };
    g.eb = function (a) {
        var b;
        return a.F & 32 && (b = a.j()) ? b.hasAttribute("tabindex") && Mc(b) : !1
    };
    g.Ga = function (a, b) {
        var c;
        if (a.F & 32 && (c = a.j())) {
            if (!b && a.B & 32) {
                try {
                    c.blur()
                } catch (d) {
                }
                a.B & 32 && a.kb(null)
            }
            (c.hasAttribute("tabindex") && Mc(c)) != b && Lc(c, b)
        }
    };
    g.Ja = function (a, b, c) {
        var d = a.j();
        if (d) {
            var e = xg(this, b);
            e && (a = a.j ? a.j() : a) && (c ? ie : ke)(a, [e]);
            this.W(d, b, c)
        }
    };
    g.W = function (a, b, c) {
        pg || (pg = {1: "disabled", 8: "selected", 16: "checked", 64: "expanded"});
        C(a, "The element passed as a first parameter cannot be null.");
        b = pg[b];
        var d = a.getAttribute("role") || null;
        d && (d = sg[d] || b, b = "checked" == b || "selected" == b ? d : b);
        b && Ve(a, b, c)
    };
    g.A = function () {
        return "goog-control"
    };
    var tg = function (a, b) {
        var c = a.A(), d = [c], e = a.A();
        e != c && d.push(e);
        c = b.getState();
        for (e = []; c;) {
            var f = c & -c;
            e.push(xg(a, f));
            c &= ~f
        }
        d.push.apply(d, e);
        (a = b.Ua) && d.push.apply(d, a);
        return d
    }, xg = function (a, b) {
        a.h || yg(a);
        return a.h[b]
    }, vg = function (a, b) {
        if (!a.G) {
            a.h || yg(a);
            var c = a.h, d = {}, e;
            for (e in c) d[c[e]] = e;
            a.G = d
        }
        a = parseInt(a.G[b], 10);
        return isNaN(a) ? 0 : a
    }, yg = function (a) {
        var b = a.A();
        var c = -1 != b.replace(/\xa0|\s/g, " ").indexOf(" ");
        C(!c, "ControlRenderer has an invalid css class: '" + b + "'");
        a.h = {
            1: b + "-disabled",
            2: b + "-hover",
            4: b + "-active",
            8: b + "-selected",
            16: b + "-checked",
            32: b + "-focused",
            64: b + "-open"
        }
    };
    var zg = function () {
    };
    A(zg, og);
    pa(zg);
    g = zg.prototype;
    g.oa = function () {
        return "button"
    };
    g.W = function (a, b, c) {
        switch (b) {
            case 8:
            case 16:
                C(a, "The button DOM element cannot be null.");
                Ve(a, "pressed", c);
                break;
            default:
            case 64:
            case 1:
                zg.s.W.call(this, a, b, c)
        }
    };
    g.fa = function (a) {
        var b = zg.s.fa.call(this, a);
        this.Ha(b, a.xa());
        var c = a.R();
        c && this.Ka(b, c);
        a.F & 16 && this.W(b, 16, a.V());
        return b
    };
    g.M = function (a, b) {
        b = zg.s.M.call(this, a, b);
        var c = this.R(b);
        a.hb = c;
        a.D = this.xa(b);
        a.F & 16 && this.W(b, 16, a.V());
        return b
    };
    g.R = function () {
    };
    g.Ka = function () {
    };
    g.xa = function (a) {
        return a.title
    };
    g.Ha = function (a, b) {
        a && (b ? a.title = b : a.removeAttribute("title"))
    };
    g.A = function () {
        return "goog-button"
    };
    var Ag = {
        Ma: "mousedown",
        Na: "mouseup",
        gb: "mousecancel",
        Oc: "mousemove",
        Qc: "mouseover",
        Pc: "mouseout",
        Mc: "mouseenter",
        Nc: "mouseleave"
    };
    var Bg = function (a, b) {
        if (!a) throw Error("Invalid class name " + a);
        if ("function" !== typeof b) throw Error("Invalid decorator function " + b);
    }, Cg = {};
    var X = function (a, b, c) {
        fg.call(this, c);
        if (!b) {
            for (b = this.constructor; b;) {
                var d = ua(b);
                if (d = Cg[d]) break;
                b = (b = Object.getPrototypeOf(b.prototype)) && b.constructor
            }
            b = d ? "function" === typeof d.aa ? d.aa() : new d : null
        }
        this.g = b;
        this.ua = void 0 !== a ? a : null
    };
    A(X, fg);
    g = X.prototype;
    g.ua = null;
    g.B = 0;
    g.F = 39;
    g.ga = 255;
    g.rb = !0;
    g.Ua = null;
    g.Ba = !0;
    var Eg = function (a) {
        a.N && 0 != a.Ba && Dg(a, !1);
        a.Ba = !1
    };
    X.prototype.ma = function () {
        var a = this.g.fa(this);
        this.h = a;
        wg(this.g, a);
        this.g.Ia(a, !1);
        this.isVisible() || (a.style.display = "none", a && Ve(a, "hidden", !0))
    };
    X.prototype.bb = function (a) {
        return this.g.cb(a)
    };
    X.prototype.za = function (a) {
        this.h = a = this.g.M(this, a);
        wg(this.g, a);
        this.g.Ia(a, !1);
        this.rb = "none" != a.style.display
    };
    X.prototype.T = function () {
        X.s.T.call(this);
        var a = this.g, b = ig(this);
        C(this);
        C(b);
        this.isVisible() || Ve(b, "hidden", !this.isVisible());
        this.isEnabled() || a.W(b, 1, !this.isEnabled());
        this.F & 8 && a.W(b, 8, this.isSelected());
        this.F & 16 && a.W(b, 16, this.V());
        this.F & 64 && a.W(b, 64, !!(this.B & 64));
        this.g.mb(this);
        this.F & -2 && (this.Ba && Dg(this, !0), this.F & 32 && (a = this.j())) && (b = this.C || (this.C = new $f), b.attach(a), kg(this).listen(b, "key", this.Eb).listen(a, "focus", this.Cb).listen(a, "blur", this.kb))
    };
    var Dg = function (a, b) {
        var c = kg(a), d = a.j();
        b ? (c.listen(d, Ag.Ma, a.ca).listen(d, [Ag.Na, Ag.gb], a.ka).listen(d, "mouseover", a.ra).listen(d, "mouseout", a.qa), a.X != Qa && c.listen(d, "contextmenu", a.X), G && !a.G && (a.G = new Fg(a), Ze(a, a.G))) : (If(If(If(If(c, d, Ag.Ma, a.ca), d, [Ag.Na, Ag.gb], a.ka), d, "mouseover", a.ra), d, "mouseout", a.qa), a.X != Qa && If(c, d, "contextmenu", a.X), G && (Ye(a.G), a.G = null))
    };
    X.prototype.wa = function () {
        X.s.wa.call(this);
        this.C && this.C.detach();
        this.isVisible() && this.isEnabled() && this.g.Ga(this, !1)
    };
    X.prototype.v = function () {
        X.s.v.call(this);
        this.C && (this.C.va(), delete this.C);
        delete this.g;
        this.G = this.Ua = this.ua = null
    };
    X.prototype.getContent = function () {
        return this.ua
    };
    var ug = function (a, b) {
        a.ua = b
    };
    X.prototype.isVisible = function () {
        return this.rb
    };
    X.prototype.isEnabled = function () {
        return !(this.B & 1)
    };
    X.prototype.setEnabled = function (a) {
        var b = this.l;
        b && "function" == typeof b.isEnabled && !b.isEnabled() || !Gg(this, 1, !a) || (a || (Hg(this, !1), Ig(this, !1)), this.isVisible() && this.g.Ga(this, a), Jg(this, 1, !a, !0))
    };
    var Ig = function (a, b) {
        Gg(a, 2, b) && Jg(a, 2, b)
    };
    X.prototype.isActive = function () {
        return !!(this.B & 4)
    };
    var Hg = function (a, b) {
        Gg(a, 4, b) && Jg(a, 4, b)
    };
    g = X.prototype;
    g.isSelected = function () {
        return !!(this.B & 8)
    };
    g.ab = function (a) {
        Gg(this, 8, a) && Jg(this, 8, a)
    };
    g.V = function () {
        return !!(this.B & 16)
    };
    g.ea = function (a) {
        Gg(this, 16, a) && Jg(this, 16, a)
    };
    g.la = function (a) {
        Gg(this, 32, a) && Jg(this, 32, a)
    };
    g.getState = function () {
        return this.B
    };
    var Jg = function (a, b, c, d) {
        d || 1 != b ? a.F & b && c != !!(a.B & b) && (a.g.Ja(a, b, c), a.B = c ? a.B | b : a.B & ~b) : a.setEnabled(!c)
    }, Kg = function (a, b, c) {
        if (a.N && a.B & b && !c) throw Error("Component already rendered");
        !c && a.B & b && Jg(a, b, !1);
        a.F = c ? a.F | b : a.F & ~b
    }, Y = function (a, b) {
        return !!(a.ga & b) && !!(a.F & b)
    }, Gg = function (a, b, c) {
        return !!(a.F & b) && !!(a.B & b) != c && (!(0 & b) || a.K(gg(b, c))) && !a.O
    };
    X.prototype.ra = function (a) {
        !Lg(a, this.j()) && this.K("enter") && this.isEnabled() && Y(this, 2) && Ig(this, !0)
    };
    X.prototype.qa = function (a) {
        !Lg(a, this.j()) && this.K("leave") && (Y(this, 4) && Hg(this, !1), Y(this, 2) && Ig(this, !1))
    };
    X.prototype.X = Qa;
    var Lg = function (a, b) {
        return !!a.relatedTarget && Ic(b, a.relatedTarget)
    };
    g = X.prototype;
    g.ca = function (a) {
        this.isEnabled() && (Y(this, 2) && Ig(this, !0), 0 != a.h.button || J && a.ctrlKey || (Y(this, 4) && Hg(this, !0), this.g && this.g.eb(this) && this.j().focus()));
        0 != a.h.button || J && a.ctrlKey || a.l()
    };
    g.ka = function (a) {
        this.isEnabled() && (Y(this, 2) && Ig(this, !0), this.isActive() && this.da(a) && Y(this, 4) && Hg(this, !1))
    };
    g.da = function (a) {
        Y(this, 16) && this.ea(!this.V());
        Y(this, 8) && this.ab(!0);
        if (Y(this, 64)) {
            var b = !(this.B & 64);
            Gg(this, 64, b) && Jg(this, 64, b)
        }
        b = new cf("action", this);
        a && (b.altKey = a.altKey, b.ctrlKey = a.ctrlKey, b.metaKey = a.metaKey, b.shiftKey = a.shiftKey, b.u = a.u);
        return this.K(b)
    };
    g.Cb = function () {
        Y(this, 32) && this.la(!0)
    };
    g.kb = function () {
        Y(this, 4) && Hg(this, !1);
        Y(this, 32) && this.la(!1)
    };
    g.Eb = function (a) {
        return this.isVisible() && this.isEnabled() && this.ja(a) ? (a.l(), a.o(), !0) : !1
    };
    g.ja = function (a) {
        return 13 == a.g && this.da(a)
    };
    if ("function" !== typeof X) throw Error("Invalid component class " + X);
    if ("function" !== typeof og) throw Error("Invalid renderer class " + og);
    var Mg = ua(X);
    Cg[Mg] = og;
    Bg("goog-control", function () {
        return new X(null)
    });
    var Fg = function (a) {
        S.call(this);
        this.h = a;
        this.g = !1;
        this.i = new V(this);
        Ze(this, this.i);
        a = ig(this.h);
        this.i.listen(a, Ag.Ma, this.m).listen(a, Ag.Na, this.o).listen(a, "click", this.l)
    };
    A(Fg, S);
    var Ng = !G || 9 <= Number(Tb);
    Fg.prototype.m = function () {
        this.g = !1
    };
    Fg.prototype.o = function () {
        this.g = !0
    };
    var Og = function (a, b) {
        if (!Ng) return a.button = 0, a.type = b, a;
        var c = document.createEvent("MouseEvents");
        c.initMouseEvent(b, a.bubbles, a.cancelable, a.view || null, a.detail, a.screenX, a.screenY, a.clientX, a.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, a.relatedTarget || null);
        return c
    };
    Fg.prototype.l = function (a) {
        if (this.g) this.g = !1; else {
            var b = a.h, c = b.button, d = b.type, e = Og(b, "mousedown");
            this.h.ca(new T(e, a.i));
            e = Og(b, "mouseup");
            this.h.ka(new T(e, a.i));
            Ng || (b.button = c, b.type = d)
        }
    };
    Fg.prototype.v = function () {
        this.h = null;
        Fg.s.v.call(this)
    };
    var Pg = function () {
    };
    A(Pg, zg);
    pa(Pg);
    g = Pg.prototype;
    g.oa = function () {
    };
    g.fa = function (a) {
        Eg(a);
        a.ga &= -256;
        Kg(a, 32, !1);
        var b = a.i, c = b.Z,
            d = {"class": tg(this, a).join(" "), disabled: !a.isEnabled(), title: a.xa() || "", value: a.R() || ""};
        if (a = a.getContent()) {
            if ("string" !== typeof a) if (Array.isArray(a)) a = a.map(Oc).join(""); else {
                var e = [];
                Nc(a, e, !0);
                a = e.join("");
                a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
                a = a.replace(/\u200B/g, "");
                a = a.replace(/ +/g, " ");
                " " != a && (a = a.replace(/^\s*/, ""))
            }
            a = a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
        } else a = "";
        return c.call(b, "BUTTON",
            d, a || "")
    };
    g.cb = function (a) {
        return "BUTTON" == a.tagName || "INPUT" == a.tagName && ("button" == a.type || "submit" == a.type || "reset" == a.type)
    };
    g.M = function (a, b) {
        Eg(a);
        a.ga &= -256;
        Kg(a, 32, !1);
        if (b.disabled) {
            var c = Fa(xg(this, 1));
            he(b, c)
        }
        return Pg.s.M.call(this, a, b)
    };
    g.mb = function (a) {
        kg(a).listen(a.j(), "click", a.da)
    };
    g.Ia = function () {
    };
    g.fb = function () {
    };
    g.eb = function (a) {
        return a.isEnabled()
    };
    g.Ga = function () {
    };
    g.Ja = function (a, b, c) {
        Pg.s.Ja.call(this, a, b, c);
        (a = a.j()) && 1 == b && (a.disabled = c)
    };
    g.R = function (a) {
        return a.value
    };
    g.Ka = function (a, b) {
        a && (a.value = b)
    };
    g.W = function () {
    };
    var Qg = function (a, b, c) {
        X.call(this, a, b || Pg.aa(), c)
    };
    A(Qg, X);
    g = Qg.prototype;
    g.R = function () {
        return this.hb
    };
    g.xa = function () {
        return this.D
    };
    g.Ha = function (a) {
        this.D = a;
        this.g.Ha(this.j(), a)
    };
    g.v = function () {
        Qg.s.v.call(this);
        delete this.hb;
        delete this.D
    };
    g.T = function () {
        Qg.s.T.call(this);
        if (this.F & 32) {
            var a = this.j();
            a && kg(this).listen(a, "keyup", this.ja)
        }
    };
    g.ja = function (a) {
        return 13 == a.g && "key" == a.type || 32 == a.g && "keyup" == a.type ? this.da(a) : 32 == a.g
    };
    Bg("goog-button", function () {
        return new Qg(null)
    });
    var Rg = ha(["value"]), Sg = function (a, b, c, d) {
        Qg.call(this, a, Z.aa(), b);
        this.L = c || 0;
        this.P = d || 0;
        this.Oa = !1
    };
    A(Sg, Qg);
    g = Sg.prototype;
    g.Ha = function (a) {
        this.D = a;
        var b = this.j();
        if (b) if (this.Oa) {
            var c = a instanceof L ? Lf($b(a).toString()) : a;
            b.removeAttribute("title");
            b.removeAttribute("data-tooltip-contained");
            b.removeAttribute("data-tooltip");
            a ? (a instanceof L ? b.g = a : (b.setAttribute("data-tooltip", a), b.g = null), b.setAttribute("aria-label", c)) : (b.g = null, b.removeAttribute("aria-label"));
            a = N(b) || N();
            b = ua(a.g);
            Mf[b] || (Mf[b] = new Nf(a))
        } else a ? b.title = a : b.removeAttribute("title")
    };
    g.setEnabled = function (a) {
        this.isEnabled() != a && (Sg.s.setEnabled.call(this, a), Tg(this))
    };
    g.la = function (a) {
        Sg.s.la.call(this, a);
        Ug(this, !1)
    };
    g.ca = function (a) {
        Sg.s.ca.call(this, a);
        this.isEnabled() && Ug(this, !0)
    };
    g.ka = function (a) {
        Sg.s.ka.call(this, a);
        this.isEnabled() && Ug(this, !0)
    };
    var Ug = function (a, b) {
        a.j() && (a = a.j(), b ? he(a, "jfk-button-clear-outline") : je(a, "jfk-button-clear-outline"))
    }, Tg = function (a) {
        a.j() && Vg(a.g, a)
    }, Z = function () {
        this.D = this.A() + "-standard";
        this.i = this.A() + "-action";
        this.C = this.A() + "-primary";
        this.o = this.A() + "-default";
        this.u = this.A() + "-flat";
        this.O = this.A() + "-narrow";
        this.H = this.A() + "-mini";
        this.m = this.A() + "-contrast"
    };
    A(Z, zg);
    Z.aa = function () {
        return Uf(Z)
    };
    Z.prototype.g = function (a, b, c) {
        a && c.L != a && (c.L = a, Tg(c));
        b && c.P != b && (c.P = b, Tg(c))
    };
    Z.prototype.A = function () {
        return "jfk-button"
    };
    Z.prototype.fa = function (a) {
        Ka(a, Sg, "Button is expected to be instance of jfk.Button");
        var b = a.i, c = Md(Pd, {
            disabled: !a.isEnabled(),
            checked: a.V(),
            style: a.L,
            title: a.xa(),
            Jb: a.Oa,
            value: a.R(),
            width: a.P
        }, b);
        b.tb(c, a.getContent());
        this.M(a, c);
        return c
    };
    Z.prototype.M = function (a, b) {
        Z.s.M.call(this, a, b);
        this.l || (this.l = Yb(this.D, z(this.g, 0, null), this.i, z(this.g, 2, null), this.C, z(this.g, 3, null), this.o, z(this.g, 1, null), this.u, z(this.g, 4, null), this.H, z(this.g, 5, null), this.m, z(this.g, 6, null), this.O, z(this.g, null, 1)));
        for (var c = ee(b), d = 0; d < c.length; ++d) {
            var e = this.l[c[d]];
            e && e(a)
        }
        if (c = b.getAttribute("data-tooltip")) a.D = c, a.Oa = !0;
        return b
    };
    var Wg = [Zc(Rg)];
    Z.prototype.R = function (a) {
        return a.getAttribute("value") || ""
    };
    Z.prototype.Ka = function (a, b) {
        a && $c(Wg, a, "value", b)
    };
    var Vg = function (a, b) {
        function c(h, k) {
            (h ? d : e).push(k)
        }

        C(b.j(), "Button element must already exist when updating style.");
        var d = [], e = [], f = b.L;
        c(0 == f, a.D);
        c(2 == f, a.i);
        c(3 == f, a.C);
        c(4 == f, a.u);
        c(5 == f, a.H);
        c(1 == f, a.o);
        c(6 == f, a.m);
        c(1 == b.P, a.O);
        c(!b.isEnabled(), a.A() + "-disabled");
        ke(b.j(), e);
        ie(b.j(), d)
    };
    var Xg = function (a, b) {
        a = a || {};
        var c = a.attributes;
        var d = a.sa, e = a.checked, f = a.disabled, h = a.id, k = a.ob, p = a.qb, q = a.ariaLabel;
        a = a.wb;
        Kd();
        Cd["jfk.templates.checkbox.main"] ? c = Cd["jfk.templates.checkbox.main"]({
            attributes: c,
            sa: d,
            checked: e,
            disabled: f,
            id: h,
            ob: k,
            qb: p,
            ariaLabel: q,
            wb: a
        }, b) : (b = p ? " " + Q("jfk-checkbox-undetermined") : e ? " " + Q("jfk-checkbox-checked") : " " + Q("jfk-checkbox-unchecked"), e = p ? "mixed" : e ? "true" : "false", q = a ? ' aria-labelledby="' + Q(a) + '"' : q ? ' aria-label="' + Q(q) + '"' : "", c = yd('<span class="' + Q("jfk-checkbox") +
            " " + Q("goog-inline-block") + b + (f ? " " + Q("jfk-checkbox-disabled") : "") + (d ? " " + Q(d) : "") + '" role="checkbox" aria-checked="' + e + '"' + q + (h ? ' id="' + Q(h) + '"' : "") + (f ? ' aria-disabled="true" tabindex="-1"' : ' tabindex="' + (k ? Q(k) : "0") + '"') + (c ? Id(Hd(c)) : "") + ' dir="ltr"><div class="' + Q("jfk-checkbox-checkmark") + '" role="presentation"></div></span>'));
        return c
    };
    var qg = function () {
    };
    A(qg, og);
    pa(qg);
    qg.prototype.fa = function (a) {
        var b = a.i.Z("SPAN", tg(this, a).join(" "));
        Yg(this, b, a.o);
        return b
    };
    qg.prototype.M = function (a, b) {
        b = qg.s.M.call(this, a, b);
        C(b);
        var c = ee(b), d = !1;
        Ta(c, Zg(this, null)) ? d = null : Ta(c, Zg(this, !0)) ? d = !0 : Ta(c, Zg(this, !1)) && (d = !1);
        a.o = d;
        C(b, "The element cannot be null.");
        Ve(b, "checked", null == d ? "mixed" : 1 == d ? "true" : "false");
        return b
    };
    qg.prototype.oa = function () {
        return "checkbox"
    };
    var Yg = function (a, b, c) {
        if (b) {
            C(b);
            var d = Zg(a, c);
            C(d);
            C(b);
            ge(b, d) || (Ub($g, function (e) {
                e = Zg(this, e);
                C(b);
                e == d ? he(b, e) : je(b, e)
            }, a), Ve(b, "checked", null == c ? "mixed" : 1 == c ? "true" : "false"))
        }
    };
    qg.prototype.A = function () {
        return "goog-checkbox"
    };
    var Zg = function (a, b) {
        a = a.A();
        if (1 == b) return a + "-checked";
        if (0 == b) return a + "-unchecked";
        if (null == b) return a + "-undetermined";
        throw Error("Invalid checkbox state: " + b);
    };
    var ah = function (a, b, c) {
        c = c || qg.aa();
        X.call(this, null, c, b);
        this.o = void 0 !== a ? a : !1
    };
    A(ah, X);
    var $g = {sb: !0, Fd: !1, Gd: null};
    g = ah.prototype;
    g.J = null;
    g.V = function () {
        return 1 == this.o
    };
    g.ea = function (a) {
        a != this.o && (this.o = a, Yg(this.g, this.j(), this.o))
    };
    g.T = function () {
        ah.s.T.call(this);
        if (this.Ba) {
            var a = kg(this);
            this.J && a.listen(this.J, "click", this.Va).listen(this.J, "mouseover", this.ra).listen(this.J, "mouseout", this.qa).listen(this.J, "mousedown", this.ca).listen(this.J, "mouseup", this.ka);
            a.listen(this.j(), "click", this.Va)
        }
        a = ig(this);
        if (this.J && a != this.J && db(We(a, "label"))) {
            if (!this.J.id) {
                var b = this.J;
                var c = (this.U || (this.U = ":" + (this.vb.g++).toString(36))) + ".lbl";
                b.id = c
            }
            Ve(a, "labelledby", this.J.id)
        }
    };
    g.Va = function (a) {
        a.o();
        var b = this.o ? "uncheck" : "check";
        this.isEnabled() && !a.target.href && this.K(b) && (a.l(), this.ea(this.o ? !1 : !0), this.K("change"))
    };
    g.ja = function (a) {
        32 == a.g && (this.da(a), this.Va(a));
        return !1
    };
    Bg("goog-checkbox", function () {
        return new ah
    });
    var bh = function (a, b) {
        var c = rg();
        ah.call(this, a, b, c);
        Kg(this, 4, !0)
    };
    l(bh, ah);
    bh.prototype.ma = function () {
        this.h = Md(Xg, {checked: this.V(), disabled: !this.isEnabled(), qb: null == this.o}, this.i)
    };
    bh.prototype.za = function (a) {
        ah.prototype.za.call(this, a);
        he(a, "goog-inline-block");
        this.j().dir = "ltr";
        jg(this) || (a = this.i.Z("DIV", "jfk-checkbox-checkmark"), this.j().appendChild(a));
        a = jg(this);
        C(a, "Expected element in component with class: %s", "jfk-checkbox-checkmark");
        Te(a, "presentation")
    };
    bh.prototype.la = function (a) {
        ah.prototype.la.call(this, a);
        ch(this, !1)
    };
    bh.prototype.ca = function (a) {
        ah.prototype.ca.call(this, a);
        this.isEnabled() && ch(this, !0)
    };
    var ch = function (a, b) {
        a.j() && (a = a.j(), b ? he(a, "jfk-checkbox-clearOutline") : je(a, "jfk-checkbox-clearOutline"))
    };
    var dh = function (a, b) {
        a = a || {};
        var c = a.attributes, d = a.checked, e = a.sa, f = a.disabled, h = a.id, k = a.label, p = a.name;
        a = a.value;
        Kd();
        return Cd["jfk.templates.radiobutton.strict"] ? Cd["jfk.templates.radiobutton.strict"]({
            attributes: c,
            checked: d,
            sa: e,
            disabled: f,
            id: h,
            label: k,
            name: p,
            value: a
        }, b) : yd('<div class="' + Q("jfk-radiobutton") + (d ? " " + Q("jfk-radiobutton-checked") : "") + (f ? " " + Q("jfk-radiobutton-disabled") : "") + (e ? " " + Q(e) : "") + '"' + (p ? ' data-name="' + Q(p) + '"' : "") + (a ? ' data-value="' + Q(a) + '"' : "") + (h ? ' id="' + Q(h) + '"' :
            "") + (c ? Id(Hd(c)) : "") + ' role="radio"><span class="' + Q("jfk-radiobutton-radio") + '"></span><span class="' + Q("jfk-radiobutton-label") + '">' + (k ? Bd(k) : "") + "</span></div>")
    };
    var eh = ha(["data-"]), fh = ha(["data-"]), ih = function (a, b, c, d) {
        X.call(this, null, gh.aa(), a);
        this.P = c || "";
        this.L = d || "";
        Kg(this, 16, !0);
        this.ga &= -17;
        b && hh(this, b)
    };
    l(ih, X);
    ih.prototype.da = function (a) {
        this.ea(!0);
        return X.prototype.da.call(this, a)
    };
    ih.prototype.ja = function (a) {
        switch (a.g) {
            case 38:
            case 37:
                return this.K(a.ctrlKey ? "b" : "d"), !0;
            case 40:
            case 39:
                return this.K(a.ctrlKey ? "a" : "c"), !0;
            case 32:
                return this.da(a);
            case 9:
                return this.K(a.shiftKey ? "g" : "f"), !1
        }
        return X.prototype.ja.call(this, a)
    };
    ih.prototype.R = function () {
        return this.P
    };
    var jh = function (a, b) {
        a.L = b;
        (a = a.j()) && $c([Zc(fh)], a, "data-name", b)
    };
    ih.prototype.ea = function (a) {
        X.prototype.ea.call(this, a)
    };
    ih.prototype.setEnabled = function (a) {
        X.prototype.setEnabled.call(this, a);
        this.K("e")
    };
    var hh = function (a, b) {
        a.ib = b;
        var c = a.j();
        c && (b = a.ib, a = a.g.pa(c), C(a), Gc(a), Fc(a, b))
    }, gh = function () {
    };
    l(gh, og);
    g = gh.prototype;
    g.fa = function (a) {
        var b = Md(dh, {checked: a.V(), disabled: !a.isEnabled(), name: a.L, value: a.R()}, a.i);
        if (a = a.ib) {
            var c = this.pa(b);
            C(c);
            Gc(c);
            Fc(c, a)
        }
        return b
    };
    g.M = function (a, b) {
        og.prototype.M.call(this, a, b);
        var c = b.getAttribute("data-value");
        if (c) {
            a.P = c;
            var d = a.j();
            d && $c([Zc(eh)], d, "data-value", c)
        }
        (c = b.getAttribute("data-name")) && jh(a, c);
        c = this.pa(b);
        C(c);
        c.firstChild ? hh(a, c.firstChild.nextSibling ? Ua(c.childNodes) : c.firstChild) : hh(a, null);
        return b
    };
    g.oa = function () {
        return "radio"
    };
    g.pa = function (a) {
        return uc(this.A() + "-label", a)
    };
    g.A = function () {
        return "jfk-radiobutton"
    };
    gh.aa = function () {
        return Uf(gh)
    };
    var lh = function (a) {
        U.call(this);
        this.g = [];
        kh(this, a)
    };
    A(lh, U);
    lh.prototype.h = null;
    lh.prototype.i = null;
    var kh = function (a, b) {
        b && (b.forEach(function (c) {
            mh(this, c, !1)
        }, a), Va(a.g, b))
    };
    lh.prototype.clear = function () {
        var a = this.g;
        if (!Array.isArray(a)) for (var b = a.length - 1; 0 <= b; b--) delete a[b];
        a.length = 0;
        this.h = null
    };
    lh.prototype.v = function () {
        lh.s.v.call(this);
        delete this.g;
        this.h = null
    };
    var mh = function (a, b, c) {
        b && ("function" == typeof a.i ? a.i(b, c) : "function" == typeof b.ab && b.ab(c))
    };
    var oh = function (a, b) {
        U.call(this);
        this.i = b || "";
        this.g = new lh;
        Ze(this, this.g);
        this.h = new V(this);
        Ze(this, this.h);
        this.g.i = nh;
        this.h.listen(this.g, "select", z(this.K, "change"));
        this.h.listen(this, "a", this.zb);
        this.h.listen(this, "b", this.Ab);
        this.h.listen(this, "c", this.Bb);
        this.h.listen(this, "d", this.Gb);
        this.h.listen(this, "e", this.Ca);
        this.h.listen(this, "f", z(this.lb, !1));
        this.h.listen(this, "g", z(this.lb, !0));
        a && Sa(a, this.l, this)
    };
    l(oh, U);
    oh.prototype.l = function (a) {
        C(null != a);
        this.h.listen(a, "action", this.yb);
        a.Za(this);
        jh(a, this.i);
        var b = a.V(), c = this.g, d = c.g.length;
        a && (mh(c, a, !1), Wa(c.g, d, 0, a));
        b && ph(this, a);
        a.j() && this.Ca()
    };
    var ph = function (a, b) {
        var c = a.g;
        b != c.h && (mh(c, c.h, !1), c.h = b, mh(c, b, !0));
        c.K("select");
        a.Ca()
    }, qh = function (a) {
        return (a = a.g.h) ? a.R() : null
    }, rh = function (a, b, c) {
        var d = a.g.g[b] || null;
        c && ph(a, d);
        Sa(Ua(a.g.g), function (e) {
            e.j() && Lc(e.j(), d == e)
        });
        try {
            d.j().focus()
        } catch (e) {
        }
    }, th = function (a, b, c, d) {
        c = sh(a, b, c);
        -1 != c && a.g.g[c] && (Lc(b.j(), !1), rh(a, c, d))
    }, sh = function (a, b, c) {
        var d = a.g.g.length;
        b = b ? a.g.g.indexOf(b) : -1;
        for (var e = 1; e <= d; e++) {
            var f = (b + c * e) % d;
            f = 0 > f * d ? f + d : f;
            if ((a.g.g[f] || null).isEnabled()) return f
        }
        return -1
    };
    g = oh.prototype;
    g.Gb = function (a) {
        a = a.target;
        C(a);
        th(this, a, -1, !0)
    };
    g.Bb = function (a) {
        a = a.target;
        C(a);
        th(this, a, 1, !0)
    };
    g.Ab = function (a) {
        a = a.target;
        C(a);
        th(this, a, -1, !1)
    };
    g.zb = function (a) {
        a = a.target;
        C(a);
        th(this, a, 1, !1)
    };
    g.lb = function (a, b) {
        b = this.Ca(b);
        try {
            var c = b[a ? 0 : 1];
            c && c.j().focus()
        } catch (d) {
        }
    };
    g.Ca = function () {
        var a = this.g.h, b = this.g.g[0] || null, c = a && a.isEnabled(), d = c ? a : b;
        C(d, "Must have at least one button in the group");
        d.isEnabled() || (a = sh(this, d, 1), d = -1 != a ? this.g.g[a] || null : null);
        var e = d;
        d && !c && (a = sh(this, d, -1), e = -1 != a ? this.g.g[a] || null : null);
        Sa(Ua(this.g.g), function (f) {
            f.j() && Lc(f.j(), d == f || e == f)
        });
        return [d, e]
    };
    g.yb = function (a) {
        a = a.target;
        ph(this, a);
        try {
            a.j().focus()
        } catch (b) {
        }
    };
    g.v = function () {
        Sa(Ua(this.g.g), function (a) {
            Ye(a)
        });
        U.prototype.v.call(this)
    };
    var nh = function (a, b) {
        a.ea(b);
        a.j() && Lc(a.j(), b)
    };
    var vh = function () {
        this.g = new Rc;
        this.l = O("targetLangSel");
        uh();
        this.S = new Sg;
        mg(this.S, O("saveBtn"));
        this.G = new Sg;
        mg(this.G, O("resetBtn"));
        this.u = O("saveStatus");
        this.C = new ih(void 0, B("MSG_OPTIONS_ICON_DESC"), "1");
        this.O = new ih(void 0, B("MSG_OPTIONS_POPUP_DESC"), "2");
        this.D = new ih(void 0, B("MSG_OPTIONS_NONE_DESC"), "0");
        var a = O("popup-option-content");
        lg(this.C, a);
        if (!Uc) {
            this.m = Cc("DIV", "popup-option-ai");
            O("popup-option-content").appendChild(this.m);
            this.i = new bh;
            this.o = Cc("SPAN", "popup-option-ai-lbl");
            P(this.o, B("MSG_OPTIONS_ALWAYS_SHOW_ICON"));
            a = this.i;
            var b = this.o;
            if (a.N) {
                var c = !!(a.B & 32);
                a.wa();
                a.J = b;
                a.T();
                c && ig(a).focus()
            } else a.J = b;
            lg(this.i, this.m);
            this.m.appendChild(this.o)
        }
        a = O("popup-option-content");
        lg(this.O, a);
        a = Cc("DIV", "popup-option-tip", B("MSG_OPTIONS_POPUP_TIP"));
        O("popup-option-content").appendChild(a);
        a = O("popup-option-content");
        lg(this.D, a);
        a = Cc("DIV", "popup-option-tip", B("MSG_OPTIONS_NONE_TIP"));
        O("popup-option-content").appendChild(a);
        this.h = new oh([this.C, this.O, this.D])
    };
    vh.prototype.H = function () {
        if (this.g.loaded) {
            uh();
            wh(this);
            for (var a = this.h.g.g.length, b = 0; b < a; ++b) {
                var c = this.h.g.g[b] || null;
                if (c.R() == this.g.h) {
                    ph(this.h, c);
                    break
                }
            }
            this.l.addEventListener("change", y(this.P, this));
            tf(this.h, "change", this.Y, !1, this);
            Uc || (this.i.ea(!this.g.i), Uc || this.i.setEnabled("1" == qh(this.h)), tf(this.i, "change", this.X, !1, this));
            tf(this.S, "action", this.L, !1, this);
            tf(this.G, "action", function () {
                window.history.go(0)
            })
        } else Ff(this.H, 50, this)
    };
    var wh = function (a) {
        var b = 0;
        a:{
            var c = a.g.m;
            break a;
            throw Error("Invalid input for getLangList()");
        }
        var d = a.g;
        if ("" != d.g) d = d.g; else a:{
            for (var e = 0; e < d.l.length; e++) {
                var f = ya(d.l[e]);
                if (d.m[f]) {
                    d = f;
                    break a
                }
            }
            d = "en"
        }
        d = d || "";
        for (var h in c) e = document.createElement("option"), e.value = h, e.text = c[h], e.h = b++, a.l.appendChild(e), h == d && (e.selected = !0)
    };
    vh.prototype.P = function () {
        this.g.g = this.l.value
    };
    vh.prototype.Y = function () {
        Uc || this.i.setEnabled("1" == qh(this.h));
        if (null != qh(this.h)) {
            var a = qh(this.h);
            this.g.h = a
        }
    };
    vh.prototype.X = function () {
        this.g.i = !this.i.V()
    };
    vh.prototype.L = function () {
        Tc(this.g);
        this.u.style.display = "";
        this.u.style.setProperty("-webkit-transition", "opacity 0.4s ease-out");
        this.u.style.opacity = 1;
        window.setTimeout(function () {
            document.getElementById("saveStatus").style.opacity = 0
        }, 1500)
    };
    var uh = function () {
        P(O("options-page-title"), B("MSG_OPTIONS_PAGE_TITLE"));
        P(O("options-title-heading"), B("MSG_OPTIONS_TITLE"));
        P(O("lang-option"), B("MSG_OPTIONS_LANG"));
        P(O("popup-option"), B("MSG_OPTIONS_POPUP"));
        P(O("popup-option-title"), B("MSG_OPTIONS_POPUP_TITLE"));
        P(O("saveBtn"), B("MSG_OPTIONS_SAVE"));
        P(O("resetBtn"), B("MSG_OPTIONS_RESET"));
        P(O("saveStatus"), B("MSG_OPTIONS_SAVED_STATUS"));
        P(O("footer-homepage"), B("MSG_OPTIONS_FOOTER_HOMEPAGE"));
        P(O("footer-privacy"), B("MSG_OPTIONS_FOOTER_PRIVACY"))
    };
    document.addEventListener("DOMContentLoaded", function () {
        (new vh).H()
    });
})();
