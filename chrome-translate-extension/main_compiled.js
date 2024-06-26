/* Copyright 2014 Google */
(function () {/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    var aa = function (a) {
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
            for (var e = 0; e < a.length - 1; e++) {
                var d = a[e];
                if (!(d in c)) break a;
                c = c[d]
            }
            a = a[a.length - 1];
            e = c[a];
            b = b(e);
            b != e && null != b && ba(c, a, {configurable: !0, writable: !0, value: b})
        }
    }, fa = function () {
        for (var a = Number(this), b = [], c = a; c < arguments.length; c++) b[c - a] = arguments[c];
        return b
    };
    ea("Symbol", function (a) {
        if (a) return a;
        var b = function (f, g) {
            this.g = f;
            ba(this, "description", {configurable: !0, writable: !0, value: g})
        };
        b.prototype.toString = function () {
            return this.g
        };
        var c = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_", e = 0, d = function (f) {
            if (this instanceof d) throw new TypeError("Symbol is not a constructor");
            return new b(c + (f || "") + "_" + e++, f)
        };
        return d
    });
    var k = this || self, m = function (a) {
            var b = typeof a;
            return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
        }, n = function (a) {
            var b = typeof a;
            return "object" == b && null != a || "function" == b
        }, ha = function (a, b, c) {
            return a.call.apply(a.bind, arguments)
        }, ia = function (a, b, c) {
            if (!a) throw Error();
            if (2 < arguments.length) {
                var e = Array.prototype.slice.call(arguments, 2);
                return function () {
                    var d = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(d, e);
                    return a.apply(b, d)
                }
            }
            return function () {
                return a.apply(b, arguments)
            }
        },
        p = function (a, b, c) {
            Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? p = ha : p = ia;
            return p.apply(null, arguments)
        }, q = function (a, b) {
            function c() {
            }

            c.prototype = b.prototype;
            a.O = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.N = function (e, d, f) {
                for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
                return b.prototype[d].apply(e, g)
            }
        }, r = function (a) {
            return a
        };

    function t(a, b) {
        return a.replace(/\{\{\$.*?\}\}/g, function (c) {
            c = c.substr(3, c.length - 5);
            return String(b[c]) || ""
        })
    }

    function u(a) {
        a = String(a).toLowerCase().replace("_", "-");
        if ("zh-cn" == a) return "zh-CN";
        if ("zh-tw" == a) return "zh-TW";
        var b = a.indexOf("-");
        a = 0 <= b ? a.substring(0, b) : a;
        return "zh" == a ? "zh-CN" : a
    };

    function v(a, b) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, v); else {
            var c = Error().stack;
            c && (this.stack = c)
        }
        a && (this.message = String(a));
        void 0 !== b && (this.cause = b)
    }

    q(v, Error);
    v.prototype.name = "CustomError";

    function w(a, b) {
        a = a.split("%s");
        for (var c = "", e = a.length - 1, d = 0; d < e; d++) c += a[d] + (d < b.length ? b[d] : "%s");
        v.call(this, c + a[e])
    }

    q(w, v);
    w.prototype.name = "AssertionError";

    function ja(a, b, c, e) {
        var d = "Assertion failed";
        if (c) {
            d += ": " + c;
            var f = e
        } else a && (d += ": " + a, f = b);
        throw new w("" + d, f || []);
    }

    var y = function (a, b, c) {
        a || ja("", null, b, Array.prototype.slice.call(arguments, 2));
        return a
    }, ka = function (a, b, c) {
        null == a && ja("Expected to exist: %s.", [a], b, Array.prototype.slice.call(arguments, 2));
        return a
    }, z = function (a, b) {
        throw new w("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
    }, A = function (a, b, c) {
        "function" !== typeof a && ja("Expected function but got %s: %s.", [m(a), a], b, Array.prototype.slice.call(arguments, 2))
    };
    var B;
    var C = function (a, b) {
        this.g = a === la && b || "";
        this.h = ma
    };
    C.prototype.B = !0;
    C.prototype.A = function () {
        return this.g
    };
    C.prototype.toString = function () {
        return "Const{" + this.g + "}"
    };
    var ma = {}, la = {};
    var D = function (a, b) {
        this.g = b === na ? a : ""
    };
    D.prototype.toString = function () {
        return this.g + ""
    };
    D.prototype.B = !0;
    D.prototype.A = function () {
        return this.g.toString()
    };
    var oa = function (a) {
        if (a instanceof D && a.constructor === D) return a.g;
        z("expected object of type TrustedResourceUrl, got '" + a + "' of type " + m(a));
        return "type_error:TrustedResourceUrl"
    }, pa = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/, na = {}, qa = function (a) {
        if (void 0 === B) {
            var b = null;
            var c = k.trustedTypes;
            if (c && c.createPolicy) {
                try {
                    b = c.createPolicy("goog#html", {createHTML: r, createScript: r, createScriptURL: r})
                } catch (e) {
                    k.console && k.console.error(e.message)
                }
                B = b
            } else B = b
        }
        a = (b = B) ? b.createScriptURL(a) : a;
        return new D(a, na)
    }, ra =
        function (a, b, c) {
            if (null == c) return b;
            if ("string" === typeof c) return c ? a + encodeURIComponent(c) : "";
            for (var e in c) if (Object.prototype.hasOwnProperty.call(c, e)) {
                var d = c[e];
                d = Array.isArray(d) ? d : [d];
                for (var f = 0; f < d.length; f++) {
                    var g = d[f];
                    null != g && (b || (b = a), b += (b.length > a.length ? "&" : "") + encodeURIComponent(e) + "=" + encodeURIComponent(String(g)))
                }
            }
            return b
        };
    var sa = function () {
    };
    var ta = Array.prototype.some ? function (a, b) {
        y(null != a.length);
        return Array.prototype.some.call(a, b, void 0)
    } : function (a, b) {
        for (var c = a.length, e = "string" === typeof a ? a.split("") : a, d = 0; d < c; d++) if (d in e && b.call(void 0, e[d], d, a)) return !0;
        return !1
    };
    var ua = function (a, b) {
        if (!n(a) || !n(a) || !n(a) || 1 !== a.nodeType || a.namespaceURI && "http://www.w3.org/1999/xhtml" !== a.namespaceURI || a.tagName.toUpperCase() !== b.toString()) {
            b = b.toString() + "; got: ";
            if (n(a)) try {
                var c = a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a)
            } catch (e) {
                c = "<object could not be stringified>"
            } else c = void 0 === a ? "undefined" : null === a ? "null" : typeof a;
            z("Argument is not an HTML Element with tag name " + (b + c))
        }
    };
    var va, E;
    a:{
        for (var wa = ["CLOSURE_FLAGS"], F = k, xa = 0; xa < wa.length; xa++) if (F = F[wa[xa]], null == F) {
            E = null;
            break a
        }
        E = F
    }
    var ya = E && E[610401301];
    va = null != ya ? ya : !1;

    function H() {
        var a = k.navigator;
        return a && (a = a.userAgent) ? a : ""
    }

    var I, za = k.navigator;
    I = za ? za.userAgentData || null : null;

    function Aa(a, b) {
        for (var c in a) b.call(void 0, a[c], c, a)
    }

    var Ba = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function Ca(a, b) {
        for (var c, e, d = 1; d < arguments.length; d++) {
            e = arguments[d];
            for (c in e) a[c] = e[c];
            for (var f = 0; f < Ba.length; f++) c = Ba[f], Object.prototype.hasOwnProperty.call(e, c) && (a[c] = e[c])
        }
    };var J = function (a, b) {
        this.g = b === Da ? a : ""
    };
    J.prototype.toString = function () {
        return this.g.toString()
    };
    J.prototype.B = !0;
    J.prototype.A = function () {
        return this.g.toString()
    };
    var Ea;
    try {
        new URL("s://g"), Ea = !0
    } catch (a) {
        Ea = !1
    }
    var Fa = Ea, Da = {};
    var Ga = function (a) {
        var b = K;
        ua(b, "AUDIO");
        if (!(a instanceof J || a instanceof J)) {
            a = "object" == typeof a && a.B ? a.A() : String(a);
            b:{
                var c = a;
                if (Fa) {
                    try {
                        var e = new URL(c)
                    } catch (d) {
                        c = "https:";
                        break b
                    }
                    c = e.protocol
                } else c:{
                    e = document.createElement("a");
                    try {
                        e.href = c
                    } catch (d) {
                        c = void 0;
                        break c
                    }
                    c = e.protocol;
                    c = ":" === c || "" === c ? "https:" : c
                }
            }
            y("javascript:" !== c, "%s is a javascript: URL", a) || (a = "about:invalid#zClosurez");
            a = new J(a, Da)
        }
        a instanceof J && a.constructor === J ? a = a.g : (z("expected object of type SafeUrl, got '" + a +
            "' of type " + m(a)), a = "type_error:SafeUrl");
        b.src = a
    }, Ia = function (a, b) {
        ua(a, "SCRIPT");
        a:{
            var c = (a.ownerDocument && a.ownerDocument.defaultView || k).document;
            if (c.querySelector && (c = c.querySelector("script[nonce]")) && (c = c.nonce || c.getAttribute("nonce")) && Ha.test(c)) break a;
            c = ""
        }
        c && a.setAttribute("nonce", c);
        a.src = oa(b)
    }, Ha = /^[\w+/_-]+[=]{0,2}$/;
    var Ka = function (a, b) {
        Aa(b, function (c, e) {
            c && "object" == typeof c && c.B && (c = c.A());
            "style" == e ? a.style.cssText = c : "class" == e ? a.className = c : "for" == e ? a.htmlFor = c : Ja.hasOwnProperty(e) ? a.setAttribute(Ja[e], c) : 0 == e.lastIndexOf("aria-", 0) || 0 == e.lastIndexOf("data-", 0) ? a.setAttribute(e, c) : a[e] = c
        })
    }, Ja = {
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
    }, La = function (a, b) {
        b = String(b);
        "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
        return a.createElement(b)
    }, L = function (a) {
        this.g = a || k.document || document
    };
    L.prototype.setProperties = Ka;
    L.prototype.getChildren = function (a) {
        return void 0 != a.children ? a.children : Array.prototype.filter.call(a.childNodes, function (b) {
            return 1 == b.nodeType
        })
    };
    L.prototype.contains = function (a, b) {
        if (!a || !b) return !1;
        if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;) b = b.parentNode;
        return b == a
    };

    function Ma() {
    };var Na = function (a, b) {
        this.i = a;
        this.j = b;
        this.h = 0;
        this.g = null
    };
    Na.prototype.get = function () {
        if (0 < this.h) {
            this.h--;
            var a = this.g;
            this.g = a.next;
            a.next = null
        } else a = this.i();
        return a
    };
    var Oa = function (a, b) {
        a.j(b);
        100 > a.h && (a.h++, b.next = a.g, a.g = b)
    };
    var Pa, Sa = function () {
        var a = k.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && -1 == H().indexOf("Presto") && (a = function () {
            var d = La(document, "IFRAME");
            d.style.display = "none";
            document.documentElement.appendChild(d);
            var f = d.contentWindow;
            d = f.document;
            d.open();
            d.close();
            var g = "callImmediate" + Math.random(),
                h = "file:" == f.location.protocol ? "*" : f.location.protocol + "//" + f.location.host;
            d = p(function (l) {
                    if (("*" == h || l.origin == h) && l.data == g) this.port1.onmessage()
                },
                this);
            f.addEventListener("message", d, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function () {
                    f.postMessage(g, h)
                }
            }
        });
        if ("undefined" !== typeof a && (va && I && 0 < I.brands.length || -1 == H().indexOf("Trident") && -1 == H().indexOf("MSIE"))) {
            var b = new a, c = {}, e = c;
            b.port1.onmessage = function () {
                if (void 0 !== c.next) {
                    c = c.next;
                    var d = c.J;
                    c.J = null;
                    d()
                }
            };
            return function (d) {
                e.next = {J: d};
                e = e.next;
                b.port2.postMessage(0)
            }
        }
        return function (d) {
            k.setTimeout(d, 0)
        }
    };

    function Ta(a) {
        k.setTimeout(function () {
            throw a;
        }, 0)
    };var Ua = function () {
        this.h = this.g = null
    };
    Ua.prototype.add = function (a, b) {
        var c = Va.get();
        c.set(a, b);
        this.h ? this.h.next = c : (y(!this.g), this.g = c);
        this.h = c
    };
    Ua.prototype.remove = function () {
        var a = null;
        this.g && (a = this.g, this.g = this.g.next, this.g || (this.h = null), a.next = null);
        return a
    };
    var Va = new Na(function () {
        return new Wa
    }, function (a) {
        return a.reset()
    }), Wa = function () {
        this.next = this.g = this.h = null
    };
    Wa.prototype.set = function (a, b) {
        this.h = a;
        this.g = b;
        this.next = null
    };
    Wa.prototype.reset = function () {
        this.next = this.g = this.h = null
    };
    var Xa = k.console && k.console.createTask ? k.console.createTask.bind(k.console) : void 0,
        Ya = Xa ? Symbol("consoleTask") : void 0;

    function Za(a, b) {
        function c() {
            var d = fa.apply(0, arguments), f = this;
            return e.run(function () {
                var g = a.call, h = g.apply, l = [f], G = l.concat;
                if (d instanceof Array) var x = d; else {
                    if (x = "undefined" != typeof Symbol && Symbol.iterator && d[Symbol.iterator]) x = x.call(d); else if ("number" == typeof d.length) x = {next: aa(d)}; else throw Error(String(d) + " is not an iterable or ArrayLike");
                    for (var Qa, Ra = []; !(Qa = x.next()).done;) Ra.push(Qa.value);
                    x = Ra
                }
                return h.call(g, a, G.call(l, x))
            })
        }

        b = void 0 === b ? "anonymous" : b;
        if (!Xa || a[ka(Ya)]) return a;
        var e = Xa(a.name || b);
        c[ka(Ya)] = e;
        return c
    };var M, $a = !1, ab = new Ua, cb = function (a, b) {
        M || bb();
        $a || (M(), $a = !0);
        a = Za(a, "goog.async.run");
        ab.add(a, b)
    }, bb = function () {
        if (k.Promise && k.Promise.resolve) {
            var a = k.Promise.resolve(void 0);
            M = function () {
                a.then(db)
            }
        } else M = function () {
            var b = db, c;
            !(c = "function" !== typeof k.setImmediate) && (c = k.Window && k.Window.prototype) && ((c = va ? !!I && 0 < I.brands.length : !1) || (c = -1 == H().indexOf("Edge")), c = c && k.Window.prototype.setImmediate == k.setImmediate);
            c ? (Pa || (Pa = Sa()), Pa(b)) : k.setImmediate(b)
        }
    }, db = function () {
        for (var a; a = ab.remove();) {
            try {
                a.h.call(a.g)
            } catch (b) {
                Ta(b)
            }
            Oa(Va,
                a)
        }
        $a = !1
    };
    var eb = function (a) {
        if (!a) return !1;
        try {
            return !!a.$goog_Thenable
        } catch (b) {
            return !1
        }
    };
    var P = function (a) {
        this.g = 0;
        this.s = void 0;
        this.j = this.h = this.i = null;
        this.l = this.m = !1;
        if (a != sa) try {
            var b = this;
            a.call(void 0, function (c) {
                N(b, 2, c)
            }, function (c) {
                if (!(c instanceof O)) try {
                    if (c instanceof Error) throw c;
                    throw Error("Promise rejected.");
                } catch (e) {
                }
                N(b, 3, c)
            })
        } catch (c) {
            N(this, 3, c)
        }
    }, fb = function () {
        this.next = this.j = this.i = this.h = this.g = null;
        this.l = !1
    };
    fb.prototype.reset = function () {
        this.j = this.i = this.h = this.g = null;
        this.l = !1
    };
    var gb = new Na(function () {
        return new fb
    }, function (a) {
        a.reset()
    }), hb = function (a, b, c) {
        var e = gb.get();
        e.h = a;
        e.i = b;
        e.j = c;
        return e
    };
    P.prototype.then = function (a, b, c) {
        null != a && A(a, "opt_onFulfilled should be a function.");
        null != b && A(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
        return ib(this, "function" === typeof a ? a : null, "function" === typeof b ? b : null, c)
    };
    P.prototype.$goog_Thenable = !0;
    P.prototype.cancel = function (a) {
        if (0 == this.g) {
            var b = new O(a);
            cb(function () {
                jb(this, b)
            }, this)
        }
    };
    var jb = function (a, b) {
        if (0 == a.g) if (a.i) {
            var c = a.i;
            if (c.h) {
                for (var e = 0, d = null, f = null, g = c.h; g && (g.l || (e++, g.g == a && (d = g), !(d && 1 < e))); g = g.next) d || (f = g);
                d && (0 == c.g && 1 == e ? jb(c, b) : (f ? (e = f, y(c.h), y(null != e), e.next == c.j && (c.j = e), e.next = e.next.next) : kb(c), lb(c, d, 3, b)))
            }
            a.i = null
        } else N(a, 3, b)
    }, nb = function (a, b) {
        a.h || 2 != a.g && 3 != a.g || mb(a);
        y(null != b.h);
        a.j ? a.j.next = b : a.h = b;
        a.j = b
    }, ib = function (a, b, c, e) {
        b && (b = Za(b, "goog.Promise.then"));
        c && (c = Za(c, "goog.Promise.then"));
        var d = hb(null, null, null);
        d.g = new P(function (f,
                              g) {
            d.h = b ? function (h) {
                try {
                    var l = b.call(e, h);
                    f(l)
                } catch (G) {
                    g(G)
                }
            } : f;
            d.i = c ? function (h) {
                try {
                    var l = c.call(e, h);
                    void 0 === l && h instanceof O ? g(h) : f(l)
                } catch (G) {
                    g(G)
                }
            } : g
        });
        d.g.i = a;
        nb(a, d);
        return d.g
    };
    P.prototype.v = function (a) {
        y(1 == this.g);
        this.g = 0;
        N(this, 2, a)
    };
    P.prototype.D = function (a) {
        y(1 == this.g);
        this.g = 0;
        N(this, 3, a)
    };
    var N = function (a, b, c) {
        if (0 == a.g) {
            a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself"));
            a.g = 1;
            a:{
                var e = c, d = a.v, f = a.D;
                if (e instanceof P) {
                    null != d && A(d, "opt_onFulfilled should be a function.");
                    null != f && A(f, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
                    nb(e, hb(d || sa, f || null, a));
                    var g = !0
                } else if (eb(e)) e.then(d, f, a), g = !0; else {
                    if (n(e)) try {
                        var h = e.then;
                        if ("function" === typeof h) {
                            ob(e, h, d, f, a);
                            g = !0;
                            break a
                        }
                    } catch (l) {
                        f.call(a, l);
                        g = !0;
                        break a
                    }
                    g = !1
                }
            }
            g || (a.s = c, a.g = b, a.i = null, mb(a), 3 != b || c instanceof O || pb(a, c))
        }
    }, ob = function (a, b, c, e, d) {
        var f = !1, g = function (l) {
            f || (f = !0, c.call(d, l))
        }, h = function (l) {
            f || (f = !0, e.call(d, l))
        };
        try {
            b.call(a, g, h)
        } catch (l) {
            h(l)
        }
    }, mb = function (a) {
        a.m || (a.m = !0, cb(a.u, a))
    }, kb = function (a) {
        var b = null;
        a.h && (b = a.h, a.h = b.next, b.next = null);
        a.h || (a.j = null);
        null != b && y(null != b.h);
        return b
    };
    P.prototype.u = function () {
        for (var a; a = kb(this);) lb(this, a, this.g, this.s);
        this.m = !1
    };
    var lb = function (a, b, c, e) {
        if (3 == c && b.i && !b.l) for (; a && a.l; a = a.i) a.l = !1;
        if (b.g) b.g.i = null, qb(b, c, e); else try {
            b.l ? b.h.call(b.j) : qb(b, c, e)
        } catch (d) {
            rb.call(null, d)
        }
        Oa(gb, b)
    }, qb = function (a, b, c) {
        2 == b ? a.h.call(a.j, c) : a.i && a.i.call(a.j, c)
    }, pb = function (a, b) {
        a.l = !0;
        cb(function () {
            a.l && rb.call(null, b)
        })
    }, rb = Ta, O = function (a) {
        v.call(this, a)
    };
    q(O, v);
    O.prototype.name = "cancel";/*

 Copyright 2005, 2007 Bob Ippolito. All Rights Reserved.
 Copyright The Closure Library Authors.
 SPDX-License-Identifier: MIT
*/
    var Q = function (a, b) {
        this.l = [];
        this.I = a;
        this.H = b || null;
        this.j = this.i = !1;
        this.h = void 0;
        this.v = this.D = this.s = !1;
        this.m = 0;
        this.g = null;
        this.u = 0
    };
    q(Q, Ma);
    Q.prototype.cancel = function (a) {
        if (this.i) this.h instanceof Q && this.h.cancel(); else {
            if (this.g) {
                var b = this.g;
                delete this.g;
                a ? b.cancel(a) : (b.u--, 0 >= b.u && b.cancel())
            }
            this.I ? this.I.call(this.H, this) : this.v = !0;
            this.i || sb(this, new R(this))
        }
    };
    Q.prototype.G = function (a, b) {
        this.s = !1;
        tb(this, a, b)
    };
    var tb = function (a, b, c) {
        a.i = !0;
        a.h = c;
        a.j = !b;
        ub(a)
    }, vb = function (a) {
        if (a.i) {
            if (!a.v) throw new S(a);
            a.v = !1
        }
    }, sb = function (a, b) {
        vb(a);
        wb(b);
        tb(a, !1, b)
    }, wb = function (a) {
        y(!(a instanceof Q), "An execution sequence may not be initiated with a blocking Deferred.")
    }, xb = function (a, b, c, e) {
        y(!a.D, "Blocking Deferreds can not be re-used");
        a.l.push([b, c, e]);
        a.i && ub(a)
    };
    Q.prototype.then = function (a, b, c) {
        var e, d, f = new P(function (g, h) {
            d = g;
            e = h
        });
        xb(this, d, function (g) {
            g instanceof R ? f.cancel() : e(g);
            return yb
        }, this);
        return f.then(a, b, c)
    };
    Q.prototype.$goog_Thenable = !0;
    Q.prototype.isError = function (a) {
        return a instanceof Error
    };
    var zb = function (a) {
        return ta(a.l, function (b) {
            return "function" === typeof b[1]
        })
    }, yb = {}, ub = function (a) {
        if (a.m && a.i && zb(a)) {
            var b = a.m, c = T[b];
            c && (k.clearTimeout(c.o), delete T[b]);
            a.m = 0
        }
        a.g && (a.g.u--, delete a.g);
        b = a.h;
        for (var e = c = !1; a.l.length && !a.s;) {
            var d = a.l.shift(), f = d[0], g = d[1];
            d = d[2];
            if (f = a.j ? g : f) try {
                var h = f.call(d || a.H, b);
                h === yb && (h = void 0);
                void 0 !== h && (a.j = a.j && (h == b || a.isError(h)), a.h = b = h);
                if (eb(b) || "function" === typeof k.Promise && b instanceof k.Promise) e = !0, a.s = !0
            } catch (l) {
                b = l, a.j = !0, zb(a) || (c =
                    !0)
            }
        }
        a.h = b;
        e && (h = p(a.G, a, !0), e = p(a.G, a, !1), b instanceof Q ? (xb(b, h, e), b.D = !0) : b.then(h, e));
        c && (b = new Ab(b), T[b.o] = b, a.m = b.o)
    }, S = function () {
        v.call(this)
    };
    q(S, v);
    S.prototype.message = "Deferred has already fired";
    S.prototype.name = "AlreadyCalledError";
    var R = function () {
        v.call(this)
    };
    q(R, v);
    R.prototype.message = "Deferred was canceled";
    R.prototype.name = "CanceledError";
    var Ab = function (a) {
        this.o = k.setTimeout(p(this.h, this), 0);
        this.g = a
    };
    Ab.prototype.h = function () {
        y(T[this.o], "Cannot throw an error that is not scheduled.");
        delete T[this.o];
        throw this.g;
    };
    var T = {};
    var Eb = function (a, b) {
        var c = b || {};
        b = c.document || document;
        var e = oa(a).toString(), d = La((new L(b)).g, "SCRIPT"), f = {L: d, C: void 0}, g = new Q(Bb, f), h = null,
            l = null != c.timeout ? c.timeout : 5E3;
        0 < l && (h = window.setTimeout(function () {
            U(d, !0);
            sb(g, new Cb(1, "Timeout reached for loading script " + e))
        }, l), f.C = h);
        d.onload = d.onreadystatechange = function () {
            d.readyState && "loaded" != d.readyState && "complete" != d.readyState || (U(d, c.M || !1, h), vb(g), wb(null), tb(g, !0, null))
        };
        d.onerror = function () {
            U(d, !0, h);
            sb(g, new Cb(0, "Error while loading script " +
                e))
        };
        f = c.attributes || {};
        Ca(f, {type: "text/javascript", charset: "UTF-8"});
        Ka(d, f);
        Ia(d, a);
        Db(b).appendChild(d);
        return g
    }, Db = function (a) {
        var b;
        return (b = (a || document).getElementsByTagName("HEAD")) && 0 !== b.length ? b[0] : a.documentElement
    }, Bb = function () {
        if (this && this.L) {
            var a = this.L;
            a && "SCRIPT" == a.tagName && U(a, !0, this.C)
        }
    }, U = function (a, b, c) {
        null != c && k.clearTimeout(c);
        a.onload = function () {
        };
        a.onerror = function () {
        };
        a.onreadystatechange = function () {
        };
        b && window.setTimeout(function () {
                a && a.parentNode && a.parentNode.removeChild(a)
            },
            0)
    }, Cb = function (a, b) {
        var c = "Jsloader error (code #" + a + ")";
        b && (c += ": " + b);
        v.call(this, c);
        this.code = a
    };
    q(Cb, v);
    var Fb = function (a) {
        this.g = a;
        this.C = 5E3
    }, Gb = 0;
    Fb.prototype.send = function (a, b, c, e) {
        if (a) {
            var d = {};
            for (f in a) d[f] = a[f];
            a = d
        } else a = {};
        e = e || "_" + (Gb++).toString(36) + Date.now().toString(36);
        d = "_callbacks___" + e;
        b && (k[d] = Hb(e, b), a.cb = d);
        b = {timeout: this.C, M: !0};
        d = oa(this.g).toString();
        d = pa.exec(d);
        var f = d[3] || "";
        d = qa(d[1] + ra("?", d[2] || "", a) + ra("#", f));
        b = Eb(d, b);
        xb(b, null, Ib(e, a, c));
        return {o: e, K: b}
    };
    Fb.prototype.cancel = function (a) {
        a && (a.K && a.K.cancel(), a.o && Jb(a.o, !1))
    };
    var Ib = function (a, b, c) {
        return function () {
            Jb(a, !1);
            c && c(b)
        }
    }, Hb = function (a, b) {
        return function (c) {
            Jb(a, !0);
            b.apply(void 0, arguments)
        }
    }, Jb = function (a, b) {
        a = "_callbacks___" + a;
        if (k[a]) if (b) try {
            delete k[a]
        } catch (c) {
            k[a] = void 0
        } else k[a] = sa
    };
    var V = function () {
        this.h = [];
        chrome.i18n.getAcceptLanguages(p(this.m, this));
        this.g = "";
        this.j = "1";
        this.i = {};
        chrome.storage.local.get(null, p(this.u, this));
        Kb(this)
    }, Mb = function () {
        var a = Lb;
        if ("" != a.g) a = a.g; else a:{
            for (var b = 0; b < a.h.length; b++) {
                var c = u(a.h[b]);
                if (a.i[c]) {
                    a = c;
                    break a
                }
            }
            a = "en"
        }
        return a
    };
    V.prototype.u = function (a) {
        "gtxTargetLang" in a && (this.g = a.gtxTargetLang);
        "gtxShowBubble" in a && (this.j = a.gtxShowBubble);
        "gtxSourceLangList" in a && Nb(this, a.gtxSourceLangList);
        "gtxTargetLangList" in a && (this.i = Nb(this, a.gtxTargetLangList));
        this.loaded = !0;
        var b = (new Date).getTime(), c = "gtxTimeStamp" in a ? a.gtxTimeStamp : 0,
            e = chrome.i18n.getUILanguage ? chrome.i18n.getUILanguage() : "en";
        a = "gtxDisplayLanguage" in a ? a.gtxDisplayLanguage : "";
        if (864E5 < Math.abs(b - c) || e != a) b = new C(la, "https://translate.googleapis.com/translate_a/l"),
            b instanceof C && b.constructor === C && b.h === ma ? b = b.g : (z("expected object of type Const, got '" + b + "'"), b = "type_error:Const"), b = qa(b), (new Fb(b)).send({
            client: "gtx",
            hl: e
        }, p(this.s, this, e))
    };
    var Nb = function (a, b) {
        var c = [], e;
        for (e in b) c.push({code: e, name: b[e]});
        c.sort(a.l);
        a = {};
        for (b = 0; b < c.length; b++) a[c[b].code] = c[b].name;
        return a
    };
    V.prototype.l = function (a, b) {
        return a.name.localeCompare(b.name)
    };
    var Kb = function (a) {
        chrome.storage.onChanged.addListener(function (b) {
            b.gtxTargetLang && (a.g = b.gtxTargetLang.newValue);
            b.gtxShowBubble && (a.j = b.gtxShowBubble.newValue)
        })
    };
    V.prototype.m = function (a) {
        this.h = a
    };
    V.prototype.s = function (a, b) {
        var c = (new Date).getTime(), e = {};
        e.gtxSourceLangList = b.sl;
        e.gtxTargetLangList = b.tl;
        e.gtxDisplayLanguage = a;
        e.gtxTimeStamp = c;
        chrome.storage.local.set(e);
        this.i = b.tl
    };
    var Ob = t("(function(){({{$code}})();})();", {code: window.injection.toString()}),
        Pb = t("(function(){({{$code}})();})();", {code: window.injector.toString()}), Qb = /^[A-z-]{2,}$/;
    delete window.injector;
    delete window.injection;

    function Rb(a, b, c) {
        if (!Qb.test(c)) throw Error("Invalid language in local storage!");
        b = {pageLang: b, userLang: c};
        b.content = t(Ob, b).replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, "\\n");
        chrome.tabs.executeScript(a, {code: t(Pb, b)}, function () {
            chrome.runtime.lastError && console.error(chrome.runtime.lastError.message)
        })
    }

    var Sb = function (a) {
        this.i = a;
        this.F = this.g = !1
    };
    Sb.prototype.popup = function () {
        this.g || this.F || (this.g = !0, this.h = "", chrome.tabs.detectLanguage(this.i, p(this.j, this)))
    };
    Sb.prototype.j = function (a) {
        if (!this.F) {
            if (!a || "und" == a || a.match("invalid")) a = "auto";
            this.h = a;
            a = u(Mb());
            var b = u(this.h);
            Rb(this.i, b, a);
            this.g = !1
        }
    };
    var W = function () {
        this.g = {}
    };
    W.prototype.attach = function (a) {
        this.g[a] || (this.g[a] = new Sb(a));
        this.g[a].popup()
    };
    W.prototype.detach = function (a) {
        this.g[a] && (this.g[a].F = !0, delete this.g[a])
    };
    var Tb = new W, Lb = new V, K = La(document, "AUDIO");
    chrome.runtime.onMessage.addListener(function (a, b) {
        a.audioSrc ? K.paused || a.audioSrc != K.src ? (Ga(a.audioSrc), K.load(), K.play()) : (K.pause(), K.currentTime = 0) : a.bubbleClosed || a.popupClosed ? K.pause() : a.detectLanguage && chrome.tabs.detectLanguage(function (c) {
            chrome.tabs.sendMessage(b.tab.id, {"gtx.detected": c})
        })
    });
    chrome.runtime.onConnect.addListener(function (a) {
        a.onDisconnect.addListener(function () {
            chrome.runtime.sendMessage({popupClosed: !0})
        })
    });
    chrome.runtime.onInstalled.addListener(function () {
        var a = chrome.contextMenus, b = a.create;
        var c = chrome.i18n.getMessage("MSG_FOOTER_TRANSLATE");
        c = chrome.i18n.getMessage(c);
        b.call(a, {id: "translate", title: c, contexts: ["selection"]})
    });
    chrome.contextMenus.onClicked.addListener(function (a) {
        var b = chrome.tabs, c = b.create;
        a = "https://translate.google.com/?source=gtx_c#auto/" + Mb() + "/" + encodeURIComponent(a.selectionText);
        c.call(b, {url: a})
    });
    var Ub = function () {
        return Tb
    }, X = ["translate", "getTranslateManager"], Y = k;
    X[0] in Y || "undefined" == typeof Y.execScript || Y.execScript("var " + X[0]);
    for (var Z; X.length && (Z = X.shift());) X.length || void 0 === Ub ? Y[Z] && Y[Z] !== Object.prototype[Z] ? Y = Y[Z] : Y = Y[Z] = {} : Y[Z] = Ub;
    W.prototype.attach = W.prototype.attach;
    W.prototype.detach = W.prototype.detach;
})();
