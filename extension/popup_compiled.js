/* Copyright 2014 Google */
(function () {/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    var translitText;
    var gtxSourceAudio;
    var gtxSourceAudioElement;
    var k, aa = function (a) {
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
    }, ia = function (a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        if (b) return b.call(a);
        if ("number" == typeof a.length) return {next: aa(a)};
        throw Error(String(a) + " is not an iterable or ArrayLike");
    }, ja = function (a) {
        if (!(a instanceof Array)) {
            a = ia(a);
            for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
            a = c
        }
        return a
    }, ka = "function" == typeof Object.create ? Object.create : function (a) {
        var b =
            function () {
            };
        b.prototype = a;
        return new b
    }, la;
    if ("function" == typeof Object.setPrototypeOf) la = Object.setPrototypeOf; else {
        var ma;
        a:{
            var oa = {a: !0}, pa = {};
            try {
                pa.__proto__ = oa;
                ma = pa.a;
                break a
            } catch (a) {
            }
            ma = !1
        }
        la = ma ? function (a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
            return a
        } : null
    }
    var qa = la, m = function (a, b) {
        a.prototype = ka(b.prototype);
        a.prototype.constructor = a;
        if (qa) qa(a, b); else for (var c in b) if ("prototype" != c) if (Object.defineProperties) {
            var d = Object.getOwnPropertyDescriptor(b, c);
            d && Object.defineProperty(a, c, d)
        } else a[c] = b[c];
        a.I = b.prototype
    }, ra = function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    ea("WeakMap", function (a) {
        function b() {
        }

        function c(l) {
            var n = typeof l;
            return "object" === n && null !== l || "function" === n
        }

        function d(l) {
            if (!ra(l, f)) {
                var n = new b;
                ba(l, f, {value: n})
            }
        }

        function e(l) {
            var n = Object[l];
            n && (Object[l] = function (p) {
                if (p instanceof b) return p;
                Object.isExtensible(p) && d(p);
                return n(p)
            })
        }

        if (function () {
            if (!a || !Object.seal) return !1;
            try {
                var l = Object.seal({}), n = Object.seal({}), p = new a([[l, 2], [n, 3]]);
                if (2 != p.get(l) || 3 != p.get(n)) return !1;
                p.delete(l);
                p.set(n, 4);
                return !p.has(l) && 4 == p.get(n)
            } catch (r) {
                return !1
            }
        }()) return a;
        var f = "$jscomp_hidden_" + Math.random();
        e("freeze");
        e("preventExtensions");
        e("seal");
        var h = 0, g = function (l) {
            this.R = (h += Math.random() + 1).toString();
            if (l) {
                l = ia(l);
                for (var n; !(n = l.next()).done;) n = n.value, this.set(n[0], n[1])
            }
        };
        g.prototype.set = function (l, n) {
            if (!c(l)) throw Error("Invalid WeakMap key");
            d(l);
            if (!ra(l, f)) throw Error("WeakMap key fail: " + l);
            l[f][this.R] = n;
            return this
        };
        g.prototype.get = function (l) {
            return c(l) && ra(l, f) ? l[f][this.R] : void 0
        };
        g.prototype.has = function (l) {
            return c(l) && ra(l, f) && ra(l[f],
                this.R)
        };
        g.prototype.delete = function (l) {
            return c(l) && ra(l, f) && ra(l[f], this.R) ? delete l[f][this.R] : !1
        };
        return g
    });
    ea("Map", function (a) {
        if (function () {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
            try {
                var g = Object.seal({x: 4}), l = new a(ia([[g, "s"]]));
                if ("s" != l.get(g) || 1 != l.size || l.get({x: 4}) || l.set({x: 4}, "t") != l || 2 != l.size) return !1;
                var n = l.entries(), p = n.next();
                if (p.done || p.value[0] != g || "s" != p.value[1]) return !1;
                p = n.next();
                return p.done || 4 != p.value[0].x || "t" != p.value[1] || !n.next().done ? !1 : !0
            } catch (r) {
                return !1
            }
        }()) return a;
        var b = new WeakMap, c = function (g) {
            this.m = {};
            this.g =
                f();
            this.size = 0;
            if (g) {
                g = ia(g);
                for (var l; !(l = g.next()).done;) l = l.value, this.set(l[0], l[1])
            }
        };
        c.prototype.set = function (g, l) {
            g = 0 === g ? 0 : g;
            var n = d(this, g);
            n.list || (n.list = this.m[n.id] = []);
            n.entry ? n.entry.value = l : (n.entry = {
                next: this.g,
                previous: this.g.previous,
                head: this.g,
                key: g,
                value: l
            }, n.list.push(n.entry), this.g.previous.next = n.entry, this.g.previous = n.entry, this.size++);
            return this
        };
        c.prototype.delete = function (g) {
            g = d(this, g);
            return g.entry && g.list ? (g.list.splice(g.index, 1), g.list.length || delete this.m[g.id],
                g.entry.previous.next = g.entry.next, g.entry.next.previous = g.entry.previous, g.entry.head = null, this.size--, !0) : !1
        };
        c.prototype.clear = function () {
            this.m = {};
            this.g = this.g.previous = f();
            this.size = 0
        };
        c.prototype.has = function (g) {
            return !!d(this, g).entry
        };
        c.prototype.get = function (g) {
            return (g = d(this, g).entry) && g.value
        };
        c.prototype.entries = function () {
            return e(this, function (g) {
                return [g.key, g.value]
            })
        };
        c.prototype.keys = function () {
            return e(this, function (g) {
                return g.key
            })
        };
        c.prototype.values = function () {
            return e(this,
                function (g) {
                    return g.value
                })
        };
        c.prototype.forEach = function (g, l) {
            for (var n = this.entries(), p; !(p = n.next()).done;) p = p.value, g.call(l, p[1], p[0], this)
        };
        c.prototype[Symbol.iterator] = c.prototype.entries;
        var d = function (g, l) {
            var n = l && typeof l;
            "object" == n || "function" == n ? b.has(l) ? n = b.get(l) : (n = "" + ++h, b.set(l, n)) : n = "p_" + l;
            var p = g.m[n];
            if (p && ra(g.m, n)) for (g = 0; g < p.length; g++) {
                var r = p[g];
                if (l !== l && r.key !== r.key || l === r.key) return {id: n, list: p, index: g, entry: r}
            }
            return {id: n, list: p, index: -1, entry: void 0}
        }, e = function (g,
                         l) {
            var n = g.g;
            return fa(function () {
                if (n) {
                    for (; n.head != g.g;) n = n.previous;
                    for (; n.next != n.head;) return n = n.next, {done: !1, value: l(n)};
                    n = null
                }
                return {done: !0, value: void 0}
            })
        }, f = function () {
            var g = {};
            return g.previous = g.next = g.head = g
        }, h = 0;
        return c
    });
    ea("Array.prototype.find", function (a) {
        return a ? a : function (b, c) {
            a:{
                var d = this;
                d instanceof String && (d = String(d));
                for (var e = d.length, f = 0; f < e; f++) {
                    var h = d[f];
                    if (b.call(c, h, f, d)) {
                        b = h;
                        break a
                    }
                }
                b = void 0
            }
            return b
        }
    });
    var sa = function (a, b) {
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
    ea("Array.prototype.values", function (a) {
        return a ? a : function () {
            return sa(this, function (b, c) {
                return c
            })
        }
    });
    ea("Array.prototype.keys", function (a) {
        return a ? a : function () {
            return sa(this, function (b) {
                return b
            })
        }
    });
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
    ea("Array.from", function (a) {
        return a ? a : function (b, c, d) {
            c = null != c ? c : function (g) {
                return g
            };
            var e = [], f = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
            if ("function" == typeof f) {
                b = f.call(b);
                for (var h = 0; !(f = b.next()).done;) e.push(c.call(d, f.value, h++))
            } else for (f = b.length, h = 0; h < f; h++) e.push(c.call(d, b[h], h));
            return e
        }
    });
    ea("Array.prototype.entries", function (a) {
        return a ? a : function () {
            return sa(this, function (b, c) {
                return [b, c]
            })
        }
    });
    ea("Object.entries", function (a) {
        return a ? a : function (b) {
            var c = [], d;
            for (d in b) ra(b, d) && c.push([d, b[d]]);
            return c
        }
    });
    var ta = ta || {}, q = this || self, ua = function (a) {
        a.va = void 0;
        a.T = function () {
            return a.va ? a.va : a.va = new a
        }
    }, va = function (a) {
        var b = typeof a;
        return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
    }, wa = function (a) {
        var b = va(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }, xa = function (a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }, Aa = function (a) {
        return Object.prototype.hasOwnProperty.call(a, ya) && a[ya] || (a[ya] = ++za)
    }, ya = "closure_uid_" + (1E9 * Math.random() >>> 0), za = 0, Ba = function (a, b, c) {
        return a.call.apply(a.bind,
            arguments)
    }, Ca = function (a, b, c) {
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
    }, t = function (a, b, c) {
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? t = Ba : t = Ca;
        return t.apply(null, arguments)
    }, u = function (a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var d =
                c.slice();
            d.push.apply(d, arguments);
            return a.apply(this, d)
        }
    }, w = function (a, b) {
        function c() {
        }

        c.prototype = b.prototype;
        a.I = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.Fe = function (d, e, f) {
            for (var h = Array(arguments.length - 2), g = 2; g < arguments.length; g++) h[g - 2] = arguments[g];
            return b.prototype[e].apply(d, h)
        }
    }, Da = function (a) {
        return a
    };

    function Ea(a, b) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, Ea); else {
            var c = Error().stack;
            c && (this.stack = c)
        }
        a && (this.message = String(a));
        void 0 !== b && (this.cause = b)
    }

    w(Ea, Error);
    Ea.prototype.name = "CustomError";
    var Fa;

    function Ga(a, b) {
        a = a.split("%s");
        for (var c = "", d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : "%s");
        Ea.call(this, c + a[d])
    }

    w(Ga, Ea);
    Ga.prototype.name = "AssertionError";

    function Ha(a, b, c, d) {
        var e = "Assertion failed";
        if (c) {
            e += ": " + c;
            var f = d
        } else a && (e += ": " + a, f = b);
        throw new Ga("" + e, f || []);
    }

    var x = function (a, b, c) {
        a || Ha("", null, b, Array.prototype.slice.call(arguments, 2));
        return a
    }, Ia = function (a, b) {
        throw new Ga("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
    }, Ja = function (a, b, c) {
        "number" !== typeof a && Ha("Expected number but got %s: %s.", [va(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    }, Ka = function (a, b, c) {
        "string" !== typeof a && Ha("Expected string but got %s: %s.", [va(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    }, La = function (a, b, c) {
        xa(a) || Ha("Expected object but got %s: %s.",
            [va(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    }, Ma = function (a, b, c) {
        Array.isArray(a) || Ha("Expected array but got %s: %s.", [va(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    }, Na = function (a, b, c) {
        xa(a) && 1 == a.nodeType || Ha("Expected Element but got %s: %s.", [va(a), a], b, Array.prototype.slice.call(arguments, 2))
    }, Pa = function (a, b, c, d) {
        a instanceof b || Ha("Expected instanceof %s but got %s.", [Oa(b), Oa(a)], c, Array.prototype.slice.call(arguments, 3));
        return a
    };

    function Oa(a) {
        return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
    };var Qa = function (a) {
        return function () {
            return a
        }
    }, Ra = function (a, b) {
        for (var c = 0; c < b.length - 2; c += 3) {
            var d = b.charAt(c + 2);
            d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d);
            d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
            a = "+" == b.charAt(c) ? a + d & 4294967295 : a ^ d
        }
        return a
    }, Sa = null, Ta = function (a) {
        if (null !== Sa) var b = Sa; else {
            b = Qa(String.fromCharCode(84));
            var c = Qa(String.fromCharCode(75));
            b = [b(), b()];
            b[1] = c();
            b = (Sa = window[b.join(c())] || "") || ""
        }
        var d = Qa(String.fromCharCode(116));
        c = Qa(String.fromCharCode(107));
        d = [d(), d()];
        d[1] = c();
        c = "&" + d.join("") +
            "=";
        d = b.split(".");
        b = Number(d[0]) || 0;
        for (var e = [], f = 0, h = 0; h < a.length; h++) {
            var g = a.charCodeAt(h);
            128 > g ? e[f++] = g : (2048 > g ? e[f++] = g >> 6 | 192 : (55296 == (g & 64512) && h + 1 < a.length && 56320 == (a.charCodeAt(h + 1) & 64512) ? (g = 65536 + ((g & 1023) << 10) + (a.charCodeAt(++h) & 1023), e[f++] = g >> 18 | 240, e[f++] = g >> 12 & 63 | 128) : e[f++] = g >> 12 | 224, e[f++] = g >> 6 & 63 | 128), e[f++] = g & 63 | 128)
        }
        a = b;
        for (f = 0; f < e.length; f++) a += e[f], a = Ra(a, "+-a^+6");
        a = Ra(a, "+-3^+b+-f");
        a ^= Number(d[1]) || 0;
        0 > a && (a = (a & 2147483647) + 2147483648);
        a %= 1E6;
        return c + (a.toString() + "." +
            (a ^ b))
    };
    var Ua = function () {
    };
    var Va = Array.prototype.indexOf ? function (a, b) {
        x(null != a.length);
        return Array.prototype.indexOf.call(a, b, void 0)
    } : function (a, b) {
        if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
        return -1
    }, Wa = Array.prototype.forEach ? function (a, b) {
        x(null != a.length);
        Array.prototype.forEach.call(a, b, void 0)
    } : function (a, b) {
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++) e in d && b.call(void 0, d[e], e, a)
    };

    function Xa(a, b) {
        return 0 <= Va(a, b)
    }

    function Ya(a, b) {
        b = Va(a, b);
        var c;
        if (c = 0 <= b) x(null != a.length), Array.prototype.splice.call(a, b, 1);
        return c
    }

    function Za(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    };

    function $a(a, b, c) {
        for (var d in a) b.call(c, a[d], d, a)
    }

    function ab(a, b) {
        for (var c in a) if (a[c] == b) return !0;
        return !1
    }

    var bb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function cb(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var f = 0; f < bb.length; f++) c = bb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    }

    function db(a) {
        var b = arguments.length;
        if (1 == b && Array.isArray(arguments[0])) return db.apply(null, arguments[0]);
        if (b % 2) throw Error("Uneven number of arguments");
        for (var c = {}, d = 0; d < b; d += 2) c[arguments[d]] = arguments[d + 1];
        return c
    };var eb;
    var hb = function (a, b) {
        this.g = a === fb && b || "";
        this.m = gb
    };
    hb.prototype.Ra = !0;
    hb.prototype.za = function () {
        return this.g
    };
    hb.prototype.toString = function () {
        return "Const{" + this.g + "}"
    };
    var ib = function (a) {
        if (a instanceof hb && a.constructor === hb && a.m === gb) return a.g;
        Ia("expected object of type Const, got '" + a + "'");
        return "type_error:Const"
    }, gb = {}, fb = {};
    var jb = function (a) {
        return /^[\s\xa0]*$/.test(a)
    }, kb = String.prototype.trim ? function (a) {
        return a.trim()
    } : function (a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    }, lb = /&/g, mb = /</g, nb = />/g, ob = /"/g, pb = /'/g, qb = /\x00/g, rb = /[\x00&<>"']/, tb = function (a, b) {
        var c = 0;
        a = kb(String(a)).split(".");
        b = kb(String(b)).split(".");
        for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
            var f = a[e] || "", h = b[e] || "";
            do {
                f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
                if (0 == f[0].length &&
                    0 == h[0].length) break;
                c = sb(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == h[1].length ? 0 : parseInt(h[1], 10)) || sb(0 == f[2].length, 0 == h[2].length) || sb(f[2], h[2]);
                f = f[3];
                h = h[3]
            } while (0 == c)
        }
        return c
    }, sb = function (a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
    var vb = function (a, b) {
        this.g = b === ub ? a : ""
    };
    vb.prototype.toString = function () {
        return this.g.toString()
    };
    vb.prototype.Ra = !0;
    vb.prototype.za = function () {
        return this.g.toString()
    };
    var ub = {}, wb = new vb("about:invalid#zClosurez", ub);
    var xb = {}, yb = function (a, b) {
        this.g = b === xb ? a : "";
        this.Ra = !0
    };
    yb.prototype.za = function () {
        return this.g
    };
    yb.prototype.toString = function () {
        return this.g.toString()
    };
    var zb = function (a) {
        if (a instanceof yb && a.constructor === yb) return a.g;
        Ia("expected object of type SafeStyle, got '" + a + "' of type " + va(a));
        return "type_error:SafeStyle"
    };
    var Ab, Bb;
    a:{
        for (var Cb = ["CLOSURE_FLAGS"], Db = q, Eb = 0; Eb < Cb.length; Eb++) if (Db = Db[Cb[Eb]], null == Db) {
            Bb = null;
            break a
        }
        Bb = Db
    }
    var Fb = Bb && Bb[610401301];
    Ab = null != Fb ? Fb : !1;

    function Gb() {
        var a = q.navigator;
        return a && (a = a.userAgent) ? a : ""
    }

    var Hb, Ib = q.navigator;
    Hb = Ib ? Ib.userAgentData || null : null;

    function Jb(a) {
        return Ab ? Hb ? Hb.brands.some(function (b) {
            return (b = b.brand) && -1 != b.indexOf(a)
        }) : !1 : !1
    }

    function z(a) {
        return -1 != Gb().indexOf(a)
    };

    function Kb() {
        return Ab ? !!Hb && 0 < Hb.brands.length : !1
    }

    function Lb() {
        return Kb() ? !1 : z("Opera")
    }

    function Mb() {
        return z("Firefox") || z("FxiOS")
    }

    function Nb() {
        return Kb() ? Jb("Chromium") : (z("Chrome") || z("CriOS")) && !(Kb() ? 0 : z("Edge")) || z("Silk")
    };var Ob = {}, A = function (a, b) {
        this.g = b === Ob ? a : "";
        this.Ra = !0
    };
    A.prototype.za = function () {
        return this.g.toString()
    };
    A.prototype.toString = function () {
        return this.g.toString()
    };
    var Pb = function (a) {
        if (a instanceof A && a.constructor === A) return a.g;
        Ia("expected object of type SafeHtml, got '" + a + "' of type " + va(a));
        return "type_error:SafeHtml"
    }, Rb = function (a) {
        a instanceof A || (a = "object" == typeof a && a.Ra ? a.za() : String(a), rb.test(a) && (-1 != a.indexOf("&") && (a = a.replace(lb, "&amp;")), -1 != a.indexOf("<") && (a = a.replace(mb, "&lt;")), -1 != a.indexOf(">") && (a = a.replace(nb, "&gt;")), -1 != a.indexOf('"') && (a = a.replace(ob, "&quot;")), -1 != a.indexOf("'") && (a = a.replace(pb, "&#39;")), -1 != a.indexOf("\x00") &&
        (a = a.replace(qb, "&#0;"))), a = Qb(a));
        return a
    }, Sb = function (a) {
        if (a instanceof A) return a;
        a = Rb(a);
        return Qb(Pb(a).toString().replace(/(\r\n|\r|\n)/g, "<br>"))
    }, Qb = function (a) {
        if (void 0 === eb) {
            var b = null;
            var c = q.trustedTypes;
            if (c && c.createPolicy) {
                try {
                    b = c.createPolicy("goog#html", {createHTML: Da, createScript: Da, createScriptURL: Da})
                } catch (d) {
                    q.console && q.console.error(d.message)
                }
                eb = b
            } else eb = b
        }
        a = (b = eb) ? b.createHTML(a) : a;
        return new A(a, Ob)
    }, Tb = new A(q.trustedTypes && q.trustedTypes.emptyHTML || "", Ob);
    var Ub = function (a, b) {
        Ka(ib(a), "must provide justification");
        x(!jb(ib(a)), "must provide non-empty justification");
        return Qb(b)
    };
    var Vb = {MATH: !0, SCRIPT: !0, STYLE: !0, SVG: !0, TEMPLATE: !0}, Wb = function (a) {
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
        a.innerHTML = Pb(Tb);
        return !b.parentElement
    }), Xb = function (a, b) {
        if (Wb()) for (; a.lastChild;) a.removeChild(a.lastChild);
        a.innerHTML = Pb(b)
    };
    var $b = function (a) {
        return -1 != a.indexOf("&") ? "document" in q ? Yb(a) : Zb(a) : a
    }, Yb = function (a) {
        var b = {"&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"'};
        var c = q.document.createElement("div");
        return a.replace(ac, function (d, e) {
            var f = b[d];
            if (f) return f;
            "#" == e.charAt(0) && (e = Number("0" + e.slice(1)), isNaN(e) || (f = String.fromCharCode(e)));
            if (!f) {
                f = Ub(new hb(fb, "Single HTML entity."), d + " ");
                if (c.tagName && Vb[c.tagName.toUpperCase()]) throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of " + c.tagName +
                    ".");
                Xb(c, f);
                f = c.firstChild.nodeValue.slice(0, -1)
            }
            return b[d] = f
        })
    }, Zb = function (a) {
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
    }, ac = /&([^;\s<&]+);?/g, bc = function (a) {
        return null == a ? "" : String(a)
    };
    var cc = function (a) {
        if (a.oa && "function" == typeof a.oa) return a.oa();
        if ("undefined" !== typeof Map && a instanceof Map || "undefined" !== typeof Set && a instanceof Set) return Array.from(a.values());
        if ("string" === typeof a) return a.split("");
        if (wa(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
            return b
        }
        b = [];
        c = 0;
        for (d in a) b[c++] = a[d];
        return b
    }, dc = function (a) {
        if (a.Db && "function" == typeof a.Db) return a.Db();
        if (!a.oa || "function" != typeof a.oa) {
            if ("undefined" !== typeof Map && a instanceof Map) return Array.from(a.keys());
            if (!("undefined" !== typeof Set && a instanceof Set)) {
                if (wa(a) || "string" === typeof a) {
                    var b = [];
                    a = a.length;
                    for (var c = 0; c < a; c++) b.push(c);
                    return b
                }
                b = [];
                c = 0;
                for (var d in a) b[c++] = d;
                return b
            }
        }
    }, ec = function (a, b, c) {
        if (a.forEach && "function" == typeof a.forEach) a.forEach(b, c); else if (wa(a) || "string" === typeof a) Array.prototype.forEach.call(a, b, c); else for (var d = dc(a), e = cc(a), f = e.length, h = 0; h < f; h++) b.call(c, e[h], d && d[h], a)
    };
    var fc = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$"),
        gc = function (a, b) {
            if (a) {
                a = a.split("&");
                for (var c = 0; c < a.length; c++) {
                    var d = a[c].indexOf("="), e = null;
                    if (0 <= d) {
                        var f = a[c].substring(0, d);
                        e = a[c].substring(d + 1)
                    } else f = a[c];
                    b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
                }
            }
        };
    var hc = function (a) {
        this.m = this.g = null;
        this.s = a || null
    }, ic = function (a) {
        a.g || (a.g = new Map, a.m = 0, a.s && gc(a.s, function (b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
        }))
    };
    hc.prototype.add = function (a, b) {
        ic(this);
        this.s = null;
        a = String(a);
        var c = this.g.get(a);
        c || this.g.set(a, c = []);
        c.push(b);
        this.m = Ja(this.m) + 1;
        return this
    };
    hc.prototype.remove = function (a) {
        ic(this);
        a = String(a);
        return this.g.has(a) ? (this.s = null, this.m = Ja(this.m) - this.g.get(a).length, this.g.delete(a)) : !1
    };
    hc.prototype.clear = function () {
        this.g = this.s = null;
        this.m = 0
    };
    var jc = function (a, b) {
        ic(a);
        b = String(b);
        return a.g.has(b)
    };
    k = hc.prototype;
    k.forEach = function (a, b) {
        ic(this);
        this.g.forEach(function (c, d) {
            c.forEach(function (e) {
                a.call(b, e, d, this)
            }, this)
        }, this)
    };
    k.Db = function () {
        ic(this);
        for (var a = Array.from(this.g.values()), b = Array.from(this.g.keys()), c = [], d = 0; d < b.length; d++) for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
        return c
    };
    k.oa = function (a) {
        ic(this);
        var b = [];
        if ("string" === typeof a) jc(this, a) && (b = b.concat(this.g.get(String(a)))); else {
            a = Array.from(this.g.values());
            for (var c = 0; c < a.length; c++) b = b.concat(a[c])
        }
        return b
    };
    k.set = function (a, b) {
        ic(this);
        this.s = null;
        a = String(a);
        jc(this, a) && (this.m = Ja(this.m) - this.g.get(a).length);
        this.g.set(a, [b]);
        this.m = Ja(this.m) + 1;
        return this
    };
    k.get = function (a, b) {
        if (!a) return b;
        a = this.oa(a);
        return 0 < a.length ? String(a[0]) : b
    };
    k.toString = function () {
        if (this.s) return this.s;
        if (!this.g) return "";
        for (var a = [], b = Array.from(this.g.keys()), c = 0; c < b.length; c++) {
            var d = b[c], e = encodeURIComponent(String(d));
            d = this.oa(d);
            for (var f = 0; f < d.length; f++) {
                var h = e;
                "" !== d[f] && (h += "=" + encodeURIComponent(String(d[f])));
                a.push(h)
            }
        }
        return this.s = a.join("&")
    };
    k.nc = function (a) {
        for (var b = 0; b < arguments.length; b++) ec(arguments[b], function (c, d) {
            this.add(d, c)
        }, this)
    };/*

 SPDX-License-Identifier: Apache-2.0
*/
    var kc = "src srcdoc codebase data href rel action formaction sandbox cite poster icon".split(" ");
    var lc = {};
    var mc = function () {
    }, nc = function (a, b) {
        if (b !== lc) throw Error("Bad secret");
        this.g = a
    };
    m(nc, mc);
    nc.prototype.toString = function () {
        return this.g
    };

    function oc(a, b, c) {
        if (!Array.isArray(a) || !Array.isArray(a.raw) || !b && 1 !== a.length) throw new TypeError(c);
    };

    function pc(a, b) {
        var c = qc;
        if (0 === c.length) throw Error("No prefixes are provided");
        if (c.map(function (d) {
            if (d instanceof nc) d = d.g; else throw Error("Unexpected type when unwrapping SafeAttributePrefix");
            return d
        }).every(function (d) {
            return 0 !== "value".indexOf(d)
        })) throw Error('Attribute "value" does not match any of the allowed prefixes.');
        a.setAttribute("value", b)
    };var rc = Object.freeze || function (a) {
        return a
    };
    var sc = function (a, b) {
        this.name = a;
        this.value = b
    };
    sc.prototype.toString = function () {
        return this.name
    };
    var tc = new sc("OFF", Infinity), uc = new sc("SEVERE", 1E3), vc = new sc("WARNING", 900),
        wc = new sc("CONFIG", 700), xc = new sc("FINE", 500), yc = function () {
            this.clear()
        }, zc;
    yc.prototype.clear = function () {
    };
    var Ac = function (a, b, c) {
        this.reset(a || tc, b, c, void 0, void 0)
    };
    Ac.prototype.reset = function (a, b) {
        this.g = b
    };
    Ac.prototype.getMessage = function () {
        return this.g
    };
    var Bc = function (a, b) {
        this.g = null;
        this.B = [];
        this.m = (void 0 === b ? null : b) || null;
        this.u = [];
        this.s = {
            g: function () {
                return a
            }
        }
    }, Cc = function (a) {
        if (a.g) return a.g;
        if (a.m) return Cc(a.m);
        Ia("Root logger has no level set.");
        return tc
    };
    Bc.prototype.publish = function (a) {
        for (var b = this; b;) b.B.forEach(function (c) {
            c(a)
        }), b = b.m
    };
    var Dc = function () {
        this.entries = {};
        var a = new Bc("");
        a.g = wc;
        this.entries[""] = a
    }, Ec, Fc = function (a, b) {
        var c = a.entries[b];
        if (c) return c;
        c = Fc(a, b.slice(0, Math.max(b.lastIndexOf("."), 0)));
        var d = new Bc(b, c);
        a.entries[b] = d;
        c.u.push(d);
        return d
    }, Gc = function () {
        Ec || (Ec = new Dc);
        return Ec
    }, Hc = function (a, b, c) {
        var d;
        if (d = a) if (d = a && b) {
            d = b.value;
            var e = a ? Cc(Fc(Gc(), a.g())) : tc;
            d = d >= e.value
        }
        d && (b = b || tc, d = Fc(Gc(), a.g()), "function" === typeof c && (c = c()), zc || (zc = new yc), a = new Ac(b, c, a.g()), d.publish(a))
    }, Ic = function (a, b) {
        a &&
        Hc(a, uc, b)
    }, Jc = function (a, b) {
        a && Hc(a, xc, b)
    };
    var Kc;
    try {
        new URL("s://g"), Kc = !0
    } catch (a) {
        Kc = !1
    }
    var Lc = Kc, Mc = [], Nc = function () {
    };
    Oc(function (a) {
        var b = Fc(Gc(), "safevalues").s;
        b && Hc(b, vc, "A URL with content '" + a + "' was sanitized away.")
    });

    function Oc(a) {
        -1 === Mc.indexOf(a) && Mc.push(a);
        Nc = function (b) {
            Mc.forEach(function (c) {
                c(b)
            })
        }
    };

    function Pc(a) {
        oc(a, !1, "safeStyle is a template literal tag function that only accepts template literals without expressions. For example, safeStyle`foo`;");
        a = a[0];
        if (/[<>]/.test(a)) throw Error("Forbidden characters in style string: " + a);
        if (!/;$/.test(a)) throw Error('Style string does not end with ";": ' + a);
        if (!/:/.test(a)) throw Error('Style string should contain one or more ":": ' + a);
        return new yb(a, xb)
    };var Qc = function (a) {
        this.zc = a
    };

    function Rc(a) {
        return new Qc(function (b) {
            return b.substr(0, a.length + 1).toLowerCase() === a + ":"
        })
    }

    var Sc = [Rc("data"), Rc("http"), Rc("https"), Rc("mailto"), Rc("ftp"), new Qc(function (a) {
        return /^[^:]*([/?#]|$)/.test(a)
    })];

    function Tc(a) {
        var b = void 0 === b ? Sc : b;
        a:{
            b = void 0 === b ? Sc : b;
            for (var c = 0; c < b.length; ++c) {
                var d = b[c];
                if (d instanceof Qc && d.zc(a)) {
                    a = new vb(a, ub);
                    break a
                }
            }
            a = void 0
        }
        return a || wb
    };var Uc = {Ie: !0}, Vc = {He: !0}, Wc = function () {
        throw Error("Do not instantiate directly");
    };
    Wc.prototype.ub = null;
    Wc.prototype.getContent = function () {
        return this.content
    };
    Wc.prototype.toString = function () {
        return this.content
    };
    Wc.prototype.jc = function () {
        if (this.qa !== Uc) throw Error("Sanitized content was not of kind HTML.");
        return Ub(new hb(fb, "Soy SanitizedContent of kind HTML produces SafeHtml-contract-compliant value."), this.toString())
    };
    var Xc = function () {
        Wc.call(this)
    };
    w(Xc, Wc);
    Xc.prototype.qa = Uc;
    var Yc = function () {
        Wc.call(this)
    };
    w(Yc, Wc);
    Yc.prototype.qa = Vc;
    Yc.prototype.ub = 1;
    var Zc = function (a, b, c) {
        (b = null != a && a.qa === b) && x(a.constructor === c);
        return b
    };

    function $c() {
        return Ab ? !!Hb && !!Hb.platform : !1
    }

    function ad() {
        return z("iPhone") && !z("iPod") && !z("iPad")
    }

    function bd() {
        return ad() || z("iPad") || z("iPod")
    }

    function cd() {
        return $c() ? "macOS" === Hb.platform : z("Macintosh")
    };var dd = function (a) {
        dd[" "](a);
        return a
    };
    dd[" "] = function () {
    };
    var ed = function (a, b) {
        try {
            return dd(a[b]), !0
        } catch (c) {
        }
        return !1
    };
    var fd = Lb(), B = Kb() ? !1 : z("Trident") || z("MSIE"), gd = z("Edge"), hd = gd || B,
        C = z("Gecko") && !(-1 != Gb().toLowerCase().indexOf("webkit") && !z("Edge")) && !(z("Trident") || z("MSIE")) && !z("Edge"),
        id = -1 != Gb().toLowerCase().indexOf("webkit") && !z("Edge"), jd = cd(),
        kd = $c() ? "Windows" === Hb.platform : z("Windows"), ld = $c() ? "Android" === Hb.platform : z("Android"),
        md = ad(), nd = z("iPad"), od = z("iPod"), pd = bd(), qd = function () {
            var a = q.document;
            return a ? a.documentMode : void 0
        }, rd;
    a:{
        var sd = "", td = function () {
            var a = Gb();
            if (C) return /rv:([^\);]+)(\)|;)/.exec(a);
            if (gd) return /Edge\/([\d\.]+)/.exec(a);
            if (B) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (id) return /WebKit\/(\S+)/.exec(a);
            if (fd) return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        td && (sd = td ? td[1] : "");
        if (B) {
            var ud = qd();
            if (null != ud && ud > parseFloat(sd)) {
                rd = String(ud);
                break a
            }
        }
        rd = sd
    }
    var vd = rd, wd;
    if (q.document && B) {
        var xd = qd();
        wd = xd ? xd : parseInt(vd, 10) || void 0
    } else wd = void 0;
    var yd = wd;
    var zd = function (a) {
            if (null != a) switch (a.ub) {
                case 1:
                    return 1;
                case -1:
                    return -1;
                case 0:
                    return 0
            }
            return null
        }, Dd = function (a) {
            return Zc(a, Uc, Xc) ? a : a instanceof A ? Ad(Pb(a).toString()) : a instanceof A ? Ad(Pb(a).toString()) : Ad(String(String(a)).replace(Bd, Cd), zd(a))
        }, Ad = function (a) {
            function b(c) {
                this.content = c
            }

            b.prototype = a.prototype;
            return function (c, d) {
                c = new b(String(c));
                void 0 !== d && (c.ub = d);
                return c
            }
        }(Xc), Ed = {}, Fd = function (a, b) {
            return a && b && a.yc && b.yc ? a.qa !== b.qa ? !1 : a.toString() === b.toString() : a instanceof
            Wc && b instanceof Wc ? a.qa != b.qa ? !1 : a.toString() == b.toString() : a == b
        }, Jd = function (a) {
            if (Zc(a, Uc, Xc)) {
                var b = String;
                a = a.getContent();
                a = String(a).replace(Gd, "").replace(Hd, "&lt;");
                b = b(a).replace(Id, Cd)
            } else b = String(a).replace(Bd, Cd);
            return b
        }, Kd = {}, Ld = function () {
            x(Kd === Kd, "found an incorrect call marker, was an internal function called from the top level?")
        }, Md = {
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
        }, Cd = function (a) {
            return Md[a]
        }, Bd = /[\x00\x22\x26\x27\x3c\x3e]/g, Id = /[\x00\x22\x27\x3c\x3e]/g,
        Nd = /^(?!on|src|(?:action|archive|background|cite|classid|codebase|content|data|dsync|href|http-equiv|longdesc|style|usemap)\s*$)(?:[a-z0-9_$:-]*)$/i,
        Gd = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g, Hd = /</g;
    var D = function (a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0
    };
    D.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")"
    };
    var Od = function (a, b) {
        return new D(a.x - b.x, a.y - b.y)
    };
    D.prototype.ceil = function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    D.prototype.floor = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    D.prototype.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    D.prototype.translate = function (a, b) {
        a instanceof D ? (this.x += a.x, this.y += a.y) : (this.x += Number(a), "number" === typeof b && (this.y += b));
        return this
    };
    var Pd = function (a, b) {
        this.width = a;
        this.height = b
    };
    k = Pd.prototype;
    k.toString = function () {
        return "(" + this.width + " x " + this.height + ")"
    };
    k.aspectRatio = function () {
        return this.width / this.height
    };
    k.ceil = function () {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    k.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    k.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    var Sd = function (a) {
        return a ? new Qd(Rd(a)) : Fa || (Fa = new Qd)
    }, E = function (a) {
        return Td(document, a)
    }, Td = function (a, b) {
        return "string" === typeof b ? a.getElementById(b) : b
    }, Vd = function (a) {
        var b = a || document;
        return b.querySelectorAll && b.querySelector ? b.querySelectorAll(".jfk-tooltip-data") : Ud(document, "jfk-tooltip-data", a)
    }, Wd = function (a, b) {
        var c = b || document;
        if (c.getElementsByClassName) a = c.getElementsByClassName(a)[0]; else {
            c = document;
            var d = b || c;
            a = d.querySelectorAll && d.querySelector && a ? d.querySelector(a ? "." + a :
                "") : Ud(c, a, b)[0] || null
        }
        return a || null
    }, Ud = function (a, b, c) {
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
                "function" == typeof h.split && Xa(h.split(/\s+/), b) && (f[d++] = a)
            }
            f.length = d;
            return f
        }
        return e
    }, Yd = function (a, b) {
        $a(b, function (c, d) {
            c && "object" == typeof c && c.Ra && (c = c.za());
            "style" == d ? a.style.cssText =
                c : "class" == d ? a.className = c : "for" == d ? a.htmlFor = c : Xd.hasOwnProperty(d) ? a.setAttribute(Xd[d], c) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, c) : a[d] = c
        })
    }, Xd = {
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
    }, ae = function (a) {
        var b = Zd(a);
        a = $d(a);
        return B && a.pageYOffset != b.scrollTop ? new D(b.scrollLeft,
            b.scrollTop) : new D(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
    }, Zd = function (a) {
        return a.scrollingElement ? a.scrollingElement : !id && be(a) ? a.documentElement : a.body || a.documentElement
    }, $d = function (a) {
        return a.parentWindow || a.defaultView
    }, ce = function (a, b, c, d) {
        function e(g) {
            g && b.appendChild("string" === typeof g ? a.createTextNode(g) : g)
        }

        for (; d < c.length; d++) {
            var f = c[d];
            if (!wa(f) || xa(f) && 0 < f.nodeType) e(f); else {
                a:{
                    if (f && "number" == typeof f.length) {
                        if (xa(f)) {
                            var h = "function" == typeof f.item || "string" ==
                                typeof f.item;
                            break a
                        }
                        if ("function" === typeof f) {
                            h = "function" == typeof f.item;
                            break a
                        }
                    }
                    h = !1
                }
                Wa(h ? Za(f) : f, e)
            }
        }
    }, de = function (a, b) {
        b = String(b);
        "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
        return a.createElement(b)
    }, be = function (a) {
        return "CSS1Compat" == a.compatMode
    }, ee = function (a, b) {
        x(null != a && null != b, "goog.dom.appendChild expects non-null arguments");
        a.appendChild(b)
    }, fe = function (a) {
        for (var b; b = a.firstChild;) a.removeChild(b)
    }, ge = function (a) {
        a && a.parentNode && a.parentNode.removeChild(a)
    }, he =
        function (a, b) {
            if (!a || !b) return !1;
            if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
            if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
            for (; b && a != b;) b = b.parentNode;
            return b == a
        }, Rd = function (a) {
        x(a, "Node cannot be null or undefined.");
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }, ie = function (a, b) {
        x(null != a, "goog.dom.setTextContent expects a non-null value for node");
        if ("textContent" in a) a.textContent = b; else if (3 == a.nodeType) a.data = String(b);
        else if (a.firstChild && 3 == a.firstChild.nodeType) {
            for (; a.lastChild != a.firstChild;) a.removeChild(x(a.lastChild));
            a.firstChild.data = String(b)
        } else {
            fe(a);
            var c = Rd(a);
            a.appendChild(c.createTextNode(String(b)))
        }
    }, je = {SCRIPT: 1, STYLE: 1, HEAD: 1, IFRAME: 1, OBJECT: 1}, ke = {IMG: " ", BR: "\n"}, le = function (a, b) {
        b ? a.tabIndex = 0 : (a.tabIndex = -1, a.removeAttribute("tabIndex"))
    }, me = function (a) {
        a = a.tabIndex;
        return "number" === typeof a && 0 <= a && 32768 > a
    }, oe = function (a) {
        var b = [];
        ne(a, b, !1);
        return b.join("")
    }, ne = function (a, b, c) {
        if (!(a.nodeName in
            je)) if (3 == a.nodeType) c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue); else if (a.nodeName in ke) b.push(ke[a.nodeName]); else for (a = a.firstChild; a;) ne(a, b, c), a = a.nextSibling
    }, pe = function (a, b) {
        for (var c = 0; a;) {
            x("parentNode" != a.name);
            if (b(a)) return a;
            a = a.parentNode;
            c++
        }
        return null
    }, Qd = function (a) {
        this.g = a || q.document || document
    };
    k = Qd.prototype;
    k.D = function (a) {
        return Td(this.g, a)
    };
    k.setProperties = Yd;
    k.ma = function (a, b, c) {
        var d = this.g, e = arguments, f = e[1], h = de(d, String(e[0]));
        f && ("string" === typeof f ? h.className = f : Array.isArray(f) ? h.className = f.join(" ") : Yd(h, f));
        2 < e.length && ce(d, h, e, 2);
        return h
    };
    k.oc = function (a, b) {
        ce(Rd(a), a, arguments, 1)
    };
    k.getChildren = function (a) {
        return void 0 != a.children ? a.children : Array.prototype.filter.call(a.childNodes, function (b) {
            return 1 == b.nodeType
        })
    };
    k.contains = he;/*
 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    function qe(a, b) {
        var c = b || re;
        var d = c.query, e = c.kc, f = c.fc, h = c.ic, g = c.hc;
        b = c.Xb;
        c = c.popup;
        Ld();
        if (Ed["extension.translation"]) b = Ed["extension.translation"]({
            query: d,
            kc: e,
            fc: f,
            ic: h,
            hc: g,
            Xb: b,
            popup: c
        }, void 0); else {
            var l = "";
            if (d) if (e) {
                l += '<div class="gtx-language"><select class="gtx-lang-selector">';
                for (var n = g.length, p = 0; p < n; p++) {
                    var r = g[p];
                    l += Fd(r, "auto") ? "" : '<option value="' + Jd(r[0]) + '"' + (Fd(r[0], f) ? " selected" : "") + ">" + Dd(r[1]) + "</option>"
                }
                l += '</select></div>';
                l += '<div class="gtx-source-audio"><div class="jfk-button-img"></div></div>';
                l += '<div class="gtx-body">' + Dd(d) + '</div><br>';
                if (translitText) {
                    l += '<div class="gtx-pinyin">' + Dd(translitText) + '</div><br>';
                }
                l += '<div class="gtx-language">' + Dd(h) + '</div>';
                l += '<div class="gtx-target-audio"><div class="jfk-button-img"></div></div><div class="gtx-body">' + Dd(e) + "</div>";
                if (b) {
                    l += '<table style="width: 95%">';
                    d = b.length;
                    for (e = 0; e < d; e++) {
                        f = b[e];
                        l += '<tr><td class="gtx-td"><div class="gtx-pos">' + Dd(f.pos) + '</div></td><td class="gtx-td">';
                        if (c) for (f = f.terms, h = f.length, g = 0; g < h; g++) l += (0 != g ? ", " : "") + Dd(f[g]); else for (f = f.terms, h = f.length, g = 0; g < h; g++) n = f[g], l += 3 > g ? (0 != g ? ", " : "") + Dd(n) : "";
                        l += "</td></tr>"
                    }
                    l +=
                        "</table>"
                }
                l += "<br>"
            } else l += "No translation results for <b>" + Dd(d) + "</b>.";
            b = Ad(l)
        }
        b && b.m && a ? b.m(a) : (b = se(b), Xb(x(a), b))
    }

    function se(a) {
        if (!xa(a)) return Rb(String(a));
        if (a.jc) {
            var b = a.jc();
            if (b instanceof A) return b
        }
        Ia("Soy template output is unsafe for use as HTML: " + a);
        return Rb("zSoyz")
    }

    var te = /^<(body|caption|col|colgroup|head|html|tr|td|th|tbody|thead|tfoot)>/i, re = {};
    var ue = Mb(), ve = ad() || z("iPod"), xe = z("iPad"), ye = z("Android") && !(Nb() || Mb() || Lb() || z("Silk")),
        ze = Nb(),
        Ae = z("Safari") && !(Nb() || (Kb() ? 0 : z("Coast")) || Lb() || (Kb() ? 0 : z("Edge")) || (Kb() ? Jb("Microsoft Edge") : z("Edg/")) || (Kb() ? Jb("Opera") : z("OPR")) || Mb() || z("Silk") || z("Android")) && !bd();
    var Be = "function" === typeof Symbol && "symbol" === typeof Symbol() ? Symbol("INTERNAL_ARRAY_STATE") : void 0,
        Ce = Object.getOwnPropertyDescriptor(Array.prototype, "Ac");
    Object.defineProperties(Array.prototype, {
        Ac: {
            get: function () {
                function a(e, f) {
                    e & b && c.push(f)
                }

                var b = De(this), c = [];
                a(1, "IS_REPEATED_FIELD");
                a(2, "IS_IMMUTABLE_ARRAY");
                a(4, "IS_API_FORMATTED");
                a(8, "ONLY_MUTABLE_VALUES");
                a(16, "MUTABLE_REFERENCES_ARE_OWNED");
                a(32, "CONSTRUCTED");
                a(64, "TRANSFERRED");
                a(128, "IS_FIXED_GROUP");
                var d = c.join(",");
                return Ce ? Ce.get.call(this) + "|" + d : d
            }, configurable: !0, enumerable: !1
        }
    });

    function De(a) {
        Ma(a, "state is only maintained on arrays.");
        var b;
        Be ? b = a[Be] : b = a.Ge;
        return null == b ? 0 : b
    };var Ee = function () {
        throw Error("please construct maps as mutable then call toImmutable");
    };
    if ("undefined" != typeof Symbol && "undefined" != typeof Symbol.hasInstance) {
        var Fe = function () {
            throw Error("Cannot perform instanceof checks on ImmutableMap: please use isImmutableMap or isMutableMap to assert on the mutability of a map. See go/jspb-api-gotchas#immutable-classes for more information");
        }, Ge = {};
        Object.defineProperties(Ee, (Ge[Symbol.hasInstance] = {
            value: Fe,
            configurable: !1,
            writable: !1,
            enumerable: !1
        }, Ge));
        x(Ee[Symbol.hasInstance] === Fe, "defineProperties did not work: was it monkey-patched?")
    }
    ;
    if ("undefined" !== typeof Proxy) {
        var Ie = He;
        new Proxy({}, {
            getPrototypeOf: Ie,
            setPrototypeOf: Ie,
            isExtensible: Ie,
            preventExtensions: Ie,
            getOwnPropertyDescriptor: Ie,
            defineProperty: Ie,
            has: Ie,
            get: Ie,
            set: Ie,
            deleteProperty: Ie,
            apply: Ie,
            construct: Ie
        })
    }

    function He() {
        throw Error("this array or object is owned by JSPB and should not be reused, did you mean to copy it with copyJspbArray? See go/jspb-api-gotchas#construct_from_array");
        throw Error();
    };x(!0);

    function Je() {
    };(function () {
        var a = q.jspbGetTypeName;
        q.jspbGetTypeName = a ? function (b) {
            return a(b) || void 0
        } : Je
    })();
    var Ke = function (a) {
        return "string" == typeof a.className ? a.className : a.getAttribute && a.getAttribute("class") || ""
    }, Le = function (a) {
        return a.classList ? a.classList : Ke(a).match(/\S+/g) || []
    }, Me = function (a, b) {
        "string" == typeof a.className ? a.className = b : a.setAttribute && a.setAttribute("class", b)
    }, Ne = function (a, b) {
        return a.classList ? a.classList.contains(b) : Xa(Le(a), b)
    }, Oe = function (a, b) {
        if (a.classList) a.classList.add(b); else if (!Ne(a, b)) {
            var c = Ke(a);
            Me(a, c + (0 < c.length ? " " + b : b))
        }
    }, Pe = function (a, b) {
        if (a.classList) Array.prototype.forEach.call(b,
            function (e) {
                Oe(a, e)
            }); else {
            var c = {};
            Array.prototype.forEach.call(Le(a), function (e) {
                c[e] = !0
            });
            Array.prototype.forEach.call(b, function (e) {
                c[e] = !0
            });
            b = "";
            for (var d in c) b += 0 < b.length ? " " + d : d;
            Me(a, b)
        }
    }, Qe = function (a, b) {
        a.classList ? a.classList.remove(b) : Ne(a, b) && Me(a, Array.prototype.filter.call(Le(a), function (c) {
            return c != b
        }).join(" "))
    }, Re = function (a, b) {
        a.classList ? Array.prototype.forEach.call(b, function (c) {
            Qe(a, c)
        }) : Me(a, Array.prototype.filter.call(Le(a), function (c) {
            return !Xa(b, c)
        }).join(" "))
    };
    var Se = function () {
    };
    Se.prototype.F = function () {
    };
    var Te = function (a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    k = Te.prototype;
    k.toString = function () {
        return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
    };
    k.contains = function (a) {
        return this && a ? a instanceof Te ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    };
    k.ceil = function () {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    };
    k.floor = function () {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    k.round = function () {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    k.translate = function (a, b) {
        a instanceof D ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (Ja(a), this.left += a, this.right += a, "number" === typeof b && (this.top += b, this.bottom += b));
        return this
    };
    var Ue = function (a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    };
    k = Ue.prototype;
    k.toString = function () {
        return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
    };
    k.contains = function (a) {
        return a instanceof D ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
    };
    k.ceil = function () {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    k.floor = function () {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    k.round = function () {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    k.translate = function (a, b) {
        a instanceof D ? (this.left += a.x, this.top += a.y) : (this.left += Ja(a), "number" === typeof b && (this.top += b));
        return this
    };
    var Ve = function (a, b) {
        a:{
            var c = Rd(a);
            if (c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null))) {
                c = c[b] || c.getPropertyValue(b) || "";
                break a
            }
            c = ""
        }
        return c || (a.currentStyle ? a.currentStyle[b] : null) || a.style && a.style[b]
    }, Xe = function (a, b, c) {
        if (b instanceof D) {
            var d = b.x;
            b = b.y
        } else d = b, b = c;
        a.style.left = We(d);
        a.style.top = We(b)
    }, Ye = function (a) {
        try {
            return a.getBoundingClientRect()
        } catch (b) {
            return {left: 0, top: 0, right: 0, bottom: 0}
        }
    }, Ze = function (a) {
        if (B && !(8 <= Number(yd))) return x(a &&
            "offsetParent" in a), a.offsetParent;
        var b = Rd(a), c = Ve(a, "position"), d = "fixed" == c || "absolute" == c;
        for (a = a.parentNode; a && a != b; a = a.parentNode) if (11 == a.nodeType && a.host && (a = a.host), c = Ve(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) return a;
        return null
    }, af = function (a) {
        for (var b = new Te(0, Infinity, Infinity, 0), c = Sd(a), d = c.g.body, e = c.g.documentElement, f = Zd(c.g); a = Ze(a);) if (!(B && 0 == a.clientWidth ||
            id && 0 == a.clientHeight && a == d) && a != d && a != e && "visible" != Ve(a, "overflow")) {
            var h = $e(a), g = new D(a.clientLeft, a.clientTop);
            h.x += g.x;
            h.y += g.y;
            b.top = Math.max(b.top, h.y);
            b.right = Math.min(b.right, h.x + a.clientWidth);
            b.bottom = Math.min(b.bottom, h.y + a.clientHeight);
            b.left = Math.max(b.left, h.x)
        }
        d = f.scrollLeft;
        f = f.scrollTop;
        b.left = Math.max(b.left, d);
        b.top = Math.max(b.top, f);
        c = ($d(c.g) || window).document;
        c = be(c) ? c.documentElement : c.body;
        c = new Pd(c.clientWidth, c.clientHeight);
        b.right = Math.min(b.right, d + c.width);
        b.bottom =
            Math.min(b.bottom, f + c.height);
        return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null
    }, $e = function (a) {
        var b = Rd(a);
        La(a, "Parameter is required");
        var c = new D(0, 0);
        var d = b ? Rd(b) : document;
        d = !B || 9 <= Number(yd) || be(Sd(d).g) ? d.documentElement : d.body;
        if (a == d) return c;
        a = Ye(a);
        b = ae(Sd(b).g);
        c.x = a.left + b.x;
        c.y = a.top + b.y;
        return c
    }, cf = function (a, b) {
        a = bf(a);
        b = bf(b);
        return new D(a.x - b.x, a.y - b.y)
    }, df = function (a) {
        a = Ye(a);
        return new D(a.left, a.top)
    }, bf = function (a) {
        x(a);
        if (1 == a.nodeType) return df(a);
        a = a.changedTouches ?
            a.changedTouches[0] : a;
        return new D(a.clientX, a.clientY)
    }, We = function (a) {
        "number" == typeof a && (a += "px");
        return a
    }, ff = function (a) {
        var b = ef;
        if ("none" != Ve(a, "display")) return b(a);
        var c = a.style, d = c.display, e = c.visibility, f = c.position;
        c.visibility = "hidden";
        c.position = "absolute";
        c.display = "inline";
        a = b(a);
        c.display = d;
        c.position = f;
        c.visibility = e;
        return a
    }, ef = function (a) {
        var b = a.offsetWidth, c = a.offsetHeight, d = id && !b && !c;
        return (void 0 === b || d) && a.getBoundingClientRect ? (a = Ye(a), new Pd(a.right - a.left, a.bottom -
            a.top)) : new Pd(b, c)
    }, gf = function (a) {
        var b = $e(a);
        a = ff(a);
        return new Ue(b.x, b.y, a.width, a.height)
    }, hf = function (a, b) {
        a.style.display = b ? "" : "none"
    }, jf = function (a) {
        return "rtl" == Ve(a, "direction")
    }, kf = C ? "MozUserSelect" : id || gd ? "WebkitUserSelect" : null;
    var lf = function () {
        if (kd) {
            var a = /Windows NT ([0-9.]+)/;
            return (a = a.exec(Gb())) ? a[1] : "0"
        }
        return jd ? (a = /1[0|1][_.][0-9_.]+/, (a = a.exec(Gb())) ? a[0].replace(/_/g, ".") : "10") : ld ? (a = /Android\s+([^\);]+)(\)|;)/, (a = a.exec(Gb())) ? a[1] : "") : md || nd || od ? (a = /(?:iPhone|CPU)\s+OS\s+(\S+)/, (a = a.exec(Gb())) ? a[1].replace(/_/g, ".") : "") : ""
    }();
    var mf = function (a) {
        return (a = a.exec(Gb())) ? a[1] : ""
    }, nf = function () {
        if (ue) return mf(/Firefox\/([0-9.]+)/);
        if (B || gd || fd) return vd;
        if (ze) {
            if (bd() || cd()) {
                var a = mf(/CriOS\/([0-9.]+)/);
                if (a) return a
            }
            return mf(/Chrome\/([0-9.]+)/)
        }
        if (Ae && !bd()) return mf(/Version\/([0-9.]+)/);
        if (ve || xe) {
            if (a = /Version\/(\S+).*Mobile\/(\S+)/.exec(Gb())) return a[1] + "." + a[2]
        } else if (ye) return (a = mf(/Android\s+([0-9.]+)/)) ? a : mf(/Version\/([0-9.]+)/);
        return ""
    }();
    var of = function (a, b) {
        return (b & 8 && jf(a) ? b ^ 4 : b) & -9
    };
    var pf = function (a, b) {
        this.s = a;
        this.H = !!b;
        this.u = {0: this.s + "-arrowright", 1: this.s + "-arrowup", 2: this.s + "-arrowdown", 3: this.s + "-arrowleft"}
    };
    m(pf, Se);
    pf.prototype.F = function () {
        x(this.B, "Must call setElements first.");
        var a = this.sb;
        2 == a && (a = 0);
        qf(this, this.tb, a, 2 == this.sb ? rf(this.tb) ? this.g.offsetHeight / 2 : this.g.offsetWidth / 2 : 20, 0)
    };
    var qf = function (a, b, c, d, e, f) {
        if (a.m) {
            var h = sf(b, c), g = a.m;
            var l = ff(g);
            l = (rf(b) ? l.height / 2 : l.width / 2) - d;
            var n = of(g, h), p;
            if (p = af(g)) g = gf(g), g = new Te(g.top, g.left + g.width, g.top + g.height, g.left), rf(b) ? g.top < p.top && !(n & 1) ? l -= p.top - g.top : g.bottom > p.bottom && n & 1 && (l -= g.bottom - p.bottom) : g.left < p.left && !(n & 4) ? l -= p.left - g.left : g.right > p.right && n & 4 && (l -= g.right - p.right);
            p = rf(b) ? new D(a.Nb, l) : new D(l, a.Nb);
            n = rf(b) ? 6 : 9;
            a.qb && 2 == e && (n = rf(b) ? 4 : 1);
            l = b ^ 3;
            rf(b) && "rtl" == a.m.dir && (l = b);
            g = a.m;
            var r = sf(l, c);
            l = a.g;
            n = a.ec ?
                n : 0;
            x(l);
            var v = l.offsetParent;
            if (v) {
                var G = "HTML" == v.tagName || "BODY" == v.tagName;
                if (!G || "static" != Ve(v, "position")) {
                    var F = $e(v);
                    if (!G) {
                        G = jf(v);
                        var M;
                        if (M = G) {
                            M = Ae && 0 <= tb(nf, 10);
                            var K;
                            if (K = pd) K = 0 <= tb(lf, 10);
                            var P = ze && 0 <= tb(nf, 85);
                            M = C || M || K || P
                        }
                        G = M ? -v.scrollLeft : G && !hd && "visible" != Ve(v, "overflowX") ? v.scrollWidth - v.clientWidth - v.scrollLeft : v.scrollLeft;
                        F = Od(F, new D(G, v.scrollTop))
                    }
                }
            }
            F = F || new D;
            v = gf(g);
            if (G = af(g)) P = new Ue(G.left, G.top, G.right - G.left, G.bottom - G.top), G = Math.max(v.left, P.left), M = Math.min(v.left +
                v.width, P.left + P.width), G <= M && (K = Math.max(v.top, P.top), P = Math.min(v.top + v.height, P.top + P.height), K <= P && (v.left = G, v.top = K, v.width = M - G, v.height = P - K));
            G = Sd(g);
            K = Sd(l);
            if (G.g != K.g) {
                M = G.g.body;
                K = $d(K.g);
                P = new D(0, 0);
                var na = (na = Rd(M)) ? $d(na) : window;
                if (ed(na, "parent")) {
                    var we = M;
                    do {
                        var rh = na == K ? $e(we) : df(x(we));
                        P.x += rh.x;
                        P.y += rh.y
                    } while (na && na != K && na != na.parent && (we = na.frameElement) && (na = na.parent))
                }
                M = Od(P, $e(M));
                !B || 9 <= Number(yd) || be(G.g) || (M = Od(M, ae(G.g)));
                v.left += M.x;
                v.top += M.y
            }
            g = of(g, r);
            r = v.left;
            g & 4 ?
                r += v.width : g & 2 && (r += v.width / 2);
            r = new D(r, v.top + (g & 1 ? v.height : 0));
            r = Od(r, F);
            p && (r.x += (g & 4 ? -1 : 1) * p.x, r.y += (g & 1 ? -1 : 1) * p.y);
            var y;
            n && (y = af(l)) && (y.top -= F.y, y.right -= F.x, y.bottom -= F.y, y.left -= F.x);
            p = r;
            p = new D(p.x, p.y);
            r = of(l, h);
            h = ff(l);
            g = new Pd(h.width, h.height);
            p = new D(p.x, p.y);
            g = new Pd(g.width, g.height);
            F = 0;
            if (f || 0 != r) r & 4 ? p.x -= g.width + (f ? f.right : 0) : r & 2 ? p.x -= g.width / 2 : f && (p.x += f.left), r & 1 ? p.y -= g.height + (f ? f.bottom : 0) : f && (p.y += f.top);
            n && (y ? (r = p, F = g, v = 0, 65 == (n & 65) && (r.x < y.left || r.x >= y.right) && (n &= -2), 132 ==
            (n & 132) && (r.y < y.top || r.y >= y.bottom) && (n &= -5), r.x < y.left && n & 1 && (r.x = y.left, v |= 1), n & 16 && (G = r.x, r.x < y.left && (r.x = y.left, v |= 4), r.x + F.width > y.right && (F.width = Math.min(y.right - r.x, G + F.width - y.left), F.width = Math.max(F.width, 0), v |= 4)), r.x + F.width > y.right && n & 1 && (r.x = Math.max(y.right - F.width, y.left), v |= 1), n & 2 && (v |= (r.x < y.left ? 16 : 0) | (r.x + F.width > y.right ? 32 : 0)), r.y < y.top && n & 4 && (r.y = y.top, v |= 2), n & 32 && (G = r.y, r.y < y.top && (r.y = y.top, v |= 8), r.y + F.height > y.bottom && (F.height = Math.min(y.bottom - r.y, G + F.height - y.top), F.height =
                Math.max(F.height, 0), v |= 8)), r.y + F.height > y.bottom && n & 4 && (r.y = Math.max(y.bottom - F.height, y.top), v |= 2), n & 8 && (v |= (r.y < y.top ? 64 : 0) | (r.y + F.height > y.bottom ? 128 : 0)), y = v) : y = 256, F = y);
            n = new Ue(0, 0, 0, 0);
            n.left = p.x;
            n.top = p.y;
            n.width = g.width;
            n.height = g.height;
            y = F;
            y & 496 || (Xe(l, new D(n.left, n.top)), g = new Pd(n.width, n.height), h == g || h && g && h.width == g.width && h.height == g.height || (h = g, l = l.style, C ? l.MozBoxSizing = "border-box" : id ? l.WebkitBoxSizing = "border-box" : l.boxSizing = "border-box", l.width = Math.max(h.width, 0) + "px", l.height =
                Math.max(h.height, 0) + "px"));
            if (2 != e && y & 496) {
                qf(a, b ^ 3, c, d, a.qb && 0 == e ? 1 : 2, f);
                return
            }
            !a.H || y & 496 || (e = parseFloat(a.g.style.left), f = parseFloat(a.g.style.top), x(!isNaN(e) && !isNaN(f), "Could not parse position."), isFinite(e) && 0 == e % 1 && isFinite(f) && 0 == f % 1 || Xe(a.g, Math.round(e), Math.round(f)))
        }
        tf(a, b, c, d)
    }, tf = function (a, b, c, d) {
        var e = a.B;
        $a(a.u, function (f) {
            Qe(e, f)
        }, a);
        Oe(e, a.u[b]);
        e.style.top = e.style.left = e.style.right = e.style.bottom = "";
        a.m ? (c = cf(a.m, a.g), d = uf(a.m, b), rf(b) ? e.style.top = vf(c.y + d.y, a.g.offsetHeight -
            15) + "px" : e.style.left = vf(c.x + d.x, a.g.offsetWidth - 15) + "px") : e.style[0 == c ? rf(b) ? "top" : "left" : rf(b) ? "bottom" : "right"] = d + "px"
    }, vf = function (a, b) {
        return 15 > b ? 15 : Math.min(Math.max(a, 15), b)
    }, sf = function (a, b) {
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
    }, uf = function (a, b) {
        var c = 0, d = 0;
        a = ff(a);
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
        return new D(c, d)
    }, rf = function (a) {
        return 0 ==
            a || 3 == a
    };
    k = pf.prototype;
    k.ec = !1;
    k.sb = 2;
    k.tb = 3;
    k.Nb = -5;
    k.qb = !1;
    var wf = {
        Cc: "activedescendant",
        Hc: "atomic",
        Ic: "autocomplete",
        Kc: "busy",
        mc: "checked",
        Nc: "colindex",
        Sc: "controls",
        Tc: "current",
        Vc: "describedby",
        DISABLED: "disabled",
        Zc: "dropeffect",
        ad: "expanded",
        bd: "flowto",
        dd: "grabbed",
        hd: "haspopup",
        kd: "hidden",
        md: "invalid",
        nd: "label",
        od: "labelledby",
        pd: "level",
        ud: "live",
        Jd: "multiline",
        Kd: "multiselectable",
        Od: "orientation",
        Pd: "owns",
        Qd: "posinset",
        Sd: "pressed",
        Wd: "readonly",
        Yd: "relevant",
        Zd: "required",
        ee: "rowindex",
        ge: "selected",
        ie: "setsize",
        ke: "sort",
        Be: "valuemax",
        Ce: "valuemin",
        De: "valuenow",
        Ee: "valuetext"
    };
    var xf;
    var yf = {
        Dc: "alert",
        Ec: "alertdialog",
        Fc: "application",
        Gc: "article",
        Jc: "banner",
        Lc: "button",
        Mc: "checkbox",
        Oc: "columnheader",
        Pc: "combobox",
        Qc: "complementary",
        Rc: "contentinfo",
        Uc: "definition",
        Wc: "dialog",
        Xc: "directory",
        Yc: "document",
        cd: "form",
        ed: "grid",
        fd: "gridcell",
        gd: "group",
        jd: "heading",
        ld: "img",
        qd: "link",
        rd: "list",
        sd: "listbox",
        td: "listitem",
        vd: "log",
        wd: "main",
        xd: "marquee",
        yd: "math",
        zd: "menu",
        Ad: "menubar",
        Bd: "menuitem",
        Cd: "menuitemcheckbox",
        Dd: "menuitemradio",
        Ld: "navigation",
        Md: "note",
        Nd: "option",
        Rd: "presentation",
        Td: "progressbar",
        Ud: "radio",
        Vd: "radiogroup",
        Xd: "region",
        ae: "row",
        be: "rowgroup",
        ce: "rowheader",
        fe: "scrollbar",
        SEARCH: "search",
        he: "separator",
        je: "slider",
        le: "spinbutton",
        me: "status",
        TAB: "tab",
        oe: "tablist",
        pe: "tabpanel",
        qe: "textbox",
        re: "textinfo",
        se: "timer",
        ue: "toolbar",
        ve: "tooltip",
        we: "tree",
        xe: "treegrid",
        ye: "treeitem"
    };
    var zf = "combobox grid group listbox menu menubar radiogroup row rowgroup tablist textbox toolbar tree treegrid".split(" "),
        Af = function (a, b) {
            b ? (x(ab(yf, b), "No such ARIA role " + b), a.setAttribute("role", b)) : a.removeAttribute("role")
        }, Cf = function (a, b, c) {
            Array.isArray(c) && (c = c.join(" "));
            var d = Bf(b);
            "" === c || void 0 == c ? (xf || (c = {}, xf = (c.atomic = !1, c.autocomplete = "none", c.dropeffect = "none", c.haspopup = !1, c.live = "off", c.multiline = !1, c.multiselectable = !1, c.orientation = "vertical", c.readonly = !1, c.relevant = "additions text",
                c.required = !1, c.sort = "none", c.busy = !1, c.disabled = !1, c.hidden = !1, c.invalid = "false", c)), c = xf, b in c ? a.setAttribute(d, c[b]) : a.removeAttribute(d)) : a.setAttribute(d, c)
        }, Df = function (a) {
            var b = a.getAttribute(Bf("activedescendant"));
            b = null == b || void 0 == b ? "" : String(b);
            return Rd(a).getElementById(b)
        }, Bf = function (a) {
            x(a, "ARIA attribute cannot be empty.");
            x(ab(wf, a), "No such ARIA attribute " + a);
            return "aria-" + a
        };

    function Ef(a) {
        a && "function" == typeof a.ya && a.ya()
    };var H = function () {
        this.X = this.X;
        this.ea = this.ea
    };
    H.prototype.X = !1;
    H.prototype.ya = function () {
        this.X || (this.X = !0, this.J())
    };
    var Ff = function (a, b) {
        a.X ? b() : (a.ea || (a.ea = []), a.ea.push(b))
    };
    H.prototype.J = function () {
        if (this.ea) for (; this.ea.length;) this.ea.shift()()
    };
    var Gf = function (a) {
        H.call(this);
        this.dom = a || Sd()
    };
    m(Gf, H);
    Gf.prototype.u = function () {
        Af(this.D(), "tooltip");
        Cf(this.D(), "live", "polite")
    };
    var Hf = function (a) {
        Gf.call(this, a);
        this.g = this.dom.ma("DIV", "jfk-tooltip-contentId");
        this.s = this.dom.ma("DIV", "jfk-tooltip-arrow", this.dom.ma("DIV", "jfk-tooltip-arrowimplbefore"), this.dom.ma("DIV", "jfk-tooltip-arrowimplafter"));
        this.m = this.dom.ma("DIV", {"class": "jfk-tooltip", role: "tooltip"}, this.g, this.s);
        this.u()
    };
    m(Hf, Gf);
    Hf.prototype.D = function () {
        return this.m
    };
    Hf.prototype.J = function () {
        Gf.prototype.J.call(this);
        this.m && ge(this.m)
    };
    var If = function (a) {
        Hf.call(this, a)
    };
    m(If, Hf);
    If.prototype.u = function () {
        Af(this.D(), "tooltip")
    };
    var Jf = function (a, b) {
        this.type = a;
        this.m = this.target = b;
        this.defaultPrevented = this.u = !1
    };
    Jf.prototype.B = function () {
        this.u = !0
    };
    Jf.prototype.s = function () {
        this.defaultPrevented = !0
    };
    var Kf = function () {
        if (!q.addEventListener || !Object.defineProperty) return !1;
        var a = !1, b = Object.defineProperty({}, "passive", {
            get: function () {
                a = !0
            }
        });
        try {
            q.addEventListener("test", function () {
            }, b), q.removeEventListener("test", function () {
            }, b)
        } catch (c) {
        }
        return a
    }();
    var Mf = function (a, b) {
        Jf.call(this, a ? a.type : "");
        this.relatedTarget = this.m = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.keyCode = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.F = !1;
        this.pointerId = 0;
        this.pointerType = "";
        this.g = null;
        if (a) {
            var c = this.type = a.type, d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.m = b;
            (b = a.relatedTarget) ? C && (ed(b, "nodeName") || (b = null)) :
                "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
            this.relatedTarget = b;
            d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
            this.button = a.button;
            this.keyCode = a.keyCode || 0;
            this.key = a.key || "";
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.F = jd ? a.metaKey : a.ctrlKey;
            this.pointerId = a.pointerId || 0;
            this.pointerType = "string" === typeof a.pointerType ? a.pointerType : Lf[a.pointerType] || "";
            this.state = a.state;
            this.g = a;
            a.defaultPrevented && Mf.I.s.call(this)
        }
    };
    w(Mf, Jf);
    var Lf = rc({2: "touch", 3: "pen", 4: "mouse"});
    Mf.prototype.B = function () {
        Mf.I.B.call(this);
        this.g.stopPropagation ? this.g.stopPropagation() : this.g.cancelBubble = !0
    };
    Mf.prototype.s = function () {
        Mf.I.s.call(this);
        var a = this.g;
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    };
    var Nf = "closure_listenable_" + (1E6 * Math.random() | 0), Of = function (a) {
        return !(!a || !a[Nf])
    };
    var Pf = 0;
    var Qf = function (a, b, c, d, e) {
        this.listener = a;
        this.proxy = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.cb = e;
        this.key = ++Pf;
        this.removed = this.Wa = !1
    }, Rf = function (a) {
        a.removed = !0;
        a.listener = null;
        a.proxy = null;
        a.src = null;
        a.cb = null
    };
    var Sf = function (a) {
        this.src = a;
        this.g = {};
        this.m = 0
    };
    Sf.prototype.add = function (a, b, c, d, e) {
        var f = a.toString();
        a = this.g[f];
        a || (a = this.g[f] = [], this.m++);
        var h = Tf(a, b, d, e);
        -1 < h ? (b = a[h], c || (b.Wa = !1)) : (b = new Qf(b, this.src, f, !!d, e), b.Wa = c, a.push(b));
        return b
    };
    Sf.prototype.remove = function (a, b, c, d) {
        a = a.toString();
        if (!(a in this.g)) return !1;
        var e = this.g[a];
        b = Tf(e, b, c, d);
        return -1 < b ? (Rf(e[b]), x(null != e.length), Array.prototype.splice.call(e, b, 1), 0 == e.length && (delete this.g[a], this.m--), !0) : !1
    };
    var Uf = function (a, b) {
        var c = b.type;
        c in a.g && Ya(a.g[c], b) && (Rf(b), 0 == a.g[c].length && (delete a.g[c], a.m--))
    };
    Sf.prototype.removeAll = function (a) {
        a = a && a.toString();
        var b = 0, c;
        for (c in this.g) if (!a || c == a) {
            for (var d = this.g[c], e = 0; e < d.length; e++) ++b, Rf(d[e]);
            delete this.g[c];
            this.m--
        }
        return b
    };
    var Vf = function (a, b, c, d, e) {
        a = a.g[b.toString()];
        b = -1;
        a && (b = Tf(a, c, d, e));
        return -1 < b ? a[b] : null
    }, Tf = function (a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.removed && f.listener == b && f.capture == !!c && f.cb == d) return e
        }
        return -1
    };
    var Wf = "closure_lm_" + (1E6 * Math.random() | 0), Xf = {}, Yf = 0, $f = function (a, b, c, d, e) {
        if (d && d.once) return Zf(a, b, c, d, e);
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++) $f(a, b[f], c, d, e);
            return null
        }
        c = ag(c);
        return Of(a) ? a.listen(b, c, xa(d) ? !!d.capture : !!d, e) : bg(a, b, c, !1, d, e)
    }, bg = function (a, b, c, d, e, f) {
        if (!b) throw Error("Invalid event type");
        var h = xa(e) ? !!e.capture : !!e, g = cg(a);
        g || (a[Wf] = g = new Sf(a));
        c = g.add(b, c, d, h, f);
        if (c.proxy) return c;
        d = dg();
        c.proxy = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener) Kf || (e = h), void 0 ===
        e && (e = !1), a.addEventListener(b.toString(), d, e); else if (a.attachEvent) a.attachEvent(eg(b.toString()), d); else if (a.addListener && a.removeListener) x("change" === b, "MediaQueryList only has a change event"), a.addListener(d); else throw Error("addEventListener and attachEvent are unavailable.");
        Yf++;
        return c
    }, dg = function () {
        var a = fg, b = function (c) {
            return a.call(b.src, b.listener, c)
        };
        return b
    }, Zf = function (a, b, c, d, e) {
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++) Zf(a, b[f], c, d, e);
            return null
        }
        c = ag(c);
        return Of(a) ?
            a.s.add(String(b), c, !0, xa(d) ? !!d.capture : !!d, e) : bg(a, b, c, !0, d, e)
    }, gg = function (a, b, c, d, e) {
        if (Array.isArray(b)) for (var f = 0; f < b.length; f++) gg(a, b[f], c, d, e); else d = xa(d) ? !!d.capture : !!d, c = ag(c), Of(a) ? a.s.remove(String(b), c, d, e) : a && (a = cg(a)) && (b = Vf(a, b, c, d, e)) && hg(b)
    }, hg = function (a) {
        if ("number" !== typeof a && a && !a.removed) {
            var b = a.src;
            if (Of(b)) Uf(b.s, a); else {
                var c = a.type, d = a.proxy;
                b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(eg(c), d) : b.addListener && b.removeListener &&
                    b.removeListener(d);
                Yf--;
                (c = cg(b)) ? (Uf(c, a), 0 == c.m && (c.src = null, b[Wf] = null)) : Rf(a)
            }
        }
    }, eg = function (a) {
        return a in Xf ? Xf[a] : Xf[a] = "on" + a
    }, fg = function (a, b) {
        if (a.removed) a = !0; else {
            b = new Mf(b, this);
            var c = a.listener, d = a.cb || a.src;
            a.Wa && hg(a);
            a = c.call(d, b)
        }
        return a
    }, cg = function (a) {
        a = a[Wf];
        return a instanceof Sf ? a : null
    }, ig = "__closure_events_fn_" + (1E9 * Math.random() >>> 0), ag = function (a) {
        x(a, "Listener can not be null.");
        if ("function" === typeof a) return a;
        x(a.handleEvent, "An object listener must have handleEvent method.");
        a[ig] || (a[ig] = function (b) {
            return a.handleEvent(b)
        });
        return a[ig]
    };
    var jg = function () {
        H.call(this);
        this.s = new Sf(this);
        this.pc = this;
        this.Ba = null
    };
    w(jg, H);
    jg.prototype[Nf] = !0;
    jg.prototype.removeEventListener = function (a, b, c, d) {
        gg(this, a, b, c, d)
    };
    var I = function (a, b) {
        kg(a);
        var c = a.Ba;
        if (c) {
            var d = [];
            for (var e = 1; c; c = c.Ba) d.push(c), x(1E3 > ++e, "infinite loop")
        }
        a = a.pc;
        c = b.type || b;
        "string" === typeof b ? b = new Jf(b, a) : b instanceof Jf ? b.target = b.target || a : (e = b, b = new Jf(c, a), cb(b, e));
        e = !0;
        if (d) for (var f = d.length - 1; !b.u && 0 <= f; f--) {
            var h = b.m = d[f];
            e = lg(h, c, !0, b) && e
        }
        b.u || (h = b.m = a, e = lg(h, c, !0, b) && e, b.u || (e = lg(h, c, !1, b) && e));
        if (d) for (f = 0; !b.u && f < d.length; f++) h = b.m = d[f], e = lg(h, c, !1, b) && e;
        return e
    };
    jg.prototype.J = function () {
        jg.I.J.call(this);
        this.s && this.s.removeAll(void 0);
        this.Ba = null
    };
    jg.prototype.listen = function (a, b, c, d) {
        kg(this);
        return this.s.add(String(a), b, !1, c, d)
    };
    var lg = function (a, b, c, d) {
        b = a.s.g[String(b)];
        if (!b) return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var h = b[f];
            if (h && !h.removed && h.capture == c) {
                var g = h.listener, l = h.cb || h.src;
                h.Wa && Uf(a.s, h);
                e = !1 !== g.call(l, d) && e
            }
        }
        return e && !d.defaultPrevented
    }, kg = function (a) {
        x(a.s, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
    };
    q.console && q.console.createTask && q.console.createTask.bind(q.console);
    var mg = function (a, b, c) {
        if ("function" === typeof a) c && (a = t(a, c)); else if (a && "function" == typeof a.handleEvent) a = t(a.handleEvent, a); else throw Error("Invalid listener argument");
        return 2147483647 < Number(b) ? -1 : q.setTimeout(a, b || 0)
    };
    var ng = function (a, b, c) {
        H.call(this);
        this.g = a;
        this.u = b || 0;
        this.m = c;
        this.s = t(this.sc, this)
    };
    w(ng, H);
    k = ng.prototype;
    k.R = 0;
    k.J = function () {
        ng.I.J.call(this);
        this.stop();
        delete this.g;
        delete this.m
    };
    k.start = function (a) {
        this.stop();
        this.R = mg(this.s, void 0 !== a ? a : this.u)
    };
    k.stop = function () {
        this.isActive() && q.clearTimeout(this.R);
        this.R = 0
    };
    k.isActive = function () {
        return 0 != this.R
    };
    k.sc = function () {
        this.R = 0;
        this.g && this.g.call(this.m)
    };
    var og = function (a) {
        H.call(this);
        this.U = a;
        this.B = {}
    };
    w(og, H);
    var pg = [];
    og.prototype.listen = function (a, b, c, d) {
        Array.isArray(b) || (b && (pg[0] = b.toString()), b = pg);
        for (var e = 0; e < b.length; e++) {
            var f = $f(a, b[e], c || this.handleEvent, d || !1, this.U || this);
            if (!f) break;
            this.B[f.key] = f
        }
        return this
    };
    var qg = function (a, b, c, d, e, f) {
        if (Array.isArray(c)) for (var h = 0; h < c.length; h++) qg(a, b, c[h], d, e, f); else d = d || a.handleEvent, e = xa(e) ? !!e.capture : !!e, f = f || a.U || a, d = ag(d), e = !!e, c = Of(b) ? Vf(b.s, String(c), d, e, f) : b ? (b = cg(b)) ? Vf(b, c, d, e, f) : null : null, c && (hg(c), delete a.B[c.key]);
        return a
    };
    og.prototype.removeAll = function () {
        $a(this.B, function (a, b) {
            this.B.hasOwnProperty(b) && hg(a)
        }, this);
        this.B = {}
    };
    og.prototype.J = function () {
        og.I.J.call(this);
        this.removeAll()
    };
    og.prototype.handleEvent = function () {
        throw Error("EventHandler.handleEvent not implemented");
    };
    var tg = function (a) {
        return $b(kb(a.replace(rg, function (b, c) {
            return sg.test(c) ? "" : " "
        }).replace(/[\t\n ]+/g, " ")))
    }, sg = /^(?:abbr|acronym|address|b|em|i|small|strong|su[bp]|u)$/i, rg = /<[!\/]?([a-z0-9]+)([\/ ][^>]*)?>/gi;

    function ug(a, b) {
        if (b instanceof vb) b instanceof vb && b.constructor === vb ? b = b.g : (Ia("expected object of type SafeUrl, got '" + b + "' of type " + va(b)), b = "type_error:SafeUrl"); else {
            b:if (Lc) {
                try {
                    var c = new URL(b)
                } catch (d) {
                    c = "https:";
                    break b
                }
                c = c.protocol
            } else c:{
                c = document.createElement("a");
                try {
                    c.href = b
                } catch (d) {
                    c = void 0;
                    break c
                }
                c = c.protocol;
                c = ":" === c || "" === c ? "https:" : c
            }
            "javascript:" === c && (Nc(b), b = void 0)
        }
        void 0 !== b && (a.href = b)
    };var vg = {}, wg = function (a) {
        og.call(this);
        this.V = a;
        this.N = new ng(this.pa, 0, this);
        Ff(this, u(Ef, this.N));
        var b = window;
        this.H = "function" === typeof b.MutationObserver ? new b.MutationObserver(t(this.Ba, this)) : null;
        a = a.g;
        this.listen(a, "mouseout mousedown click blur focusout keydown".split(" "), this.ga, !0);
        this.listen(a, ["mouseover", "focus", "focusin"], this.na, !0)
    };
    m(wg, og);
    wg.prototype.J = function () {
        xg(this);
        og.prototype.J.call(this)
    };
    var yg = function (a, b) {
        switch (b.type) {
            case "mousedown":
            case "mouseover":
            case "mouseout":
            case "click":
                a.W = !1;
                break;
            case "keydown":
                a.W = !0
        }
    };
    wg.prototype.na = function (a) {
        this.H && this.H.disconnect();
        yg(this, a);
        var b = a.target;
        a = "focus" == a.type || "focusin" == a.type;
        var c = this.g && he(this.g.g, b);
        if (this.W || !a || c) {
            this.ka = a;
            if (a = b && b.getAttribute && this.H) a = b.getAttribute("role") || null, a = Xa(zf, a);
            a && (this.H.observe(b, {attributes: !0}), (a = Df(b)) && (b = a));
            this.s = b
        } else this.s = null;
        zg(this)
    };
    wg.prototype.ga = function (a) {
        yg(this, a);
        var b = a.target;
        a = "mousedown" == a.type || "click" == a.type;
        b = this.g && he(this.g.g, b);
        a && b || (this.s = null, zg(this))
    };
    wg.prototype.Ba = function (a) {
        Wa(a, t(function (b) {
            var c = Df(b.target);
            c && "aria-activedescendant" == b.attributeName && (this.s = c, zg(this))
        }, this))
    };
    var zg = function (a) {
        if (!(a.N.isActive() && a.m && a.F)) {
            xg(a);
            var b = null != a.F ? a.F : 50;
            a.N.start(a.m ? b : 300)
        }
    }, xg = function (a) {
        a.K && (q.clearTimeout(a.K), a.K = 0, a.m = null)
    };
    wg.prototype.pa = function () {
        if (!this.s) Ag(this), this.F = this.m = null; else if (!(this.m && this.g && he(this.g.D(), this.s)) || this.m.getAttribute("data-tooltip-unhoverable")) {
            var a = pe(this.s, function (g) {
                return g.getAttribute && (g.getAttribute("data-tooltip-contained") || g.getAttribute("data-tooltip") || g.g) && !g.getAttribute("data-tooltip-suspended")
            }), b = !1;
            this.m && this.m != a && (Ag(this), this.F = this.m = null, b = !0);
            if (!this.m && a && (this.m = a, !(a.getAttribute("data-tooltip-only-on-overflow") && a.offsetWidth >= a.scrollWidth &&
                a.offsetHeight >= a.scrollHeight || this.ka && "mouse" == a.getAttribute("data-tooltip-trigger")))) {
                var c = Tb;
                if (a.getAttribute("data-tooltip-contained")) for (var d = Vd(a), e = 0; e < d.length; e++) {
                    if (d[e].parentNode == a) {
                        c = d[e].cloneNode(!0);
                        break
                    }
                } else c = a.g ? a.g : Sb(a.getAttribute("data-tooltip"));
                d = a.getAttribute("data-tooltip-align");
                e = a.getAttribute("data-tooltip-class");
                var f = a.getAttribute("data-tooltip-offset");
                f = jb(bc(f)) ? -1 : Number(f);
                var h = a.getAttribute("data-tooltip-hide-delay");
                h = jb(bc(h)) ? null : Number(h);
                if (!b && (a = a.getAttribute("data-tooltip-delay"), a = Math.max(0, a - 300))) {
                    this.K = mg(u(this.Y, this.m, c, d, f, e, h), a, this);
                    return
                }
                this.Y(this.m, c, d, f, e, h)
            }
        }
    };
    var Bg = function (a) {
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
    wg.prototype.Y = function (a, b, c, d, e, f) {
        this.K = 0;
        this.F = f;
        if (!this.g) {
            this.g = new If(this.V);
            Ag(this);
            ee(this.V.g.body, this.g.D());
            Ff(this, u(Ef, this.g));
            this.u = new pf("jfk-tooltip", !0);
            this.u.ec = !0;
            this.u.qb = !0;
            f = this.u;
            var h = this.g.D(), g = this.g.s;
            f.g = h;
            f.B = g
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
        f = this.u;
        c = Bg(c);
        null != c && (f.tb = c);
        null != h && (f.sb = h);
        "number" === typeof d && (f.Nb = d);
        Qe(this.g.D(), "jfk-tooltip-hide");
        this.M != e && (this.M && !jb(bc(this.M)) &&
        Qe(this.g.D(), this.M), jb(bc(e)) || Oe(this.g.D(), e), this.M = e);
        Xe(this.g.D(), 0, 0);
        if (b instanceof A) {
            d = this.g.g;
            if (void 0 !== d.tagName) {
                if ("script" === d.tagName.toLowerCase()) throw Error("Use safeScriptEl.setTextContent with a SafeScript.");
                if ("style" === d.tagName.toLowerCase()) throw Error("Use safeStyleEl.setTextContent with a SafeStyleSheet.");
            }
            d.innerHTML = Pb(b)
        } else for (fe(this.g.g); d = b.firstChild;) this.g.g.appendChild(d);
        this.u.m = a;
        this.u.F()
    };
    var Ag = function (a) {
        a.g && Oe(a.g.D(), "jfk-tooltip-hide")
    };
    var Cg = [], Dg = function (a) {
        x(!Object.isSealed(a), "Cannot use getInstance() with a sealed constructor.");
        var b = "va";
        if (a.va && a.hasOwnProperty(b)) return a.va;
        Cg.push(a);
        var c = new a;
        a.va = c;
        x(a.hasOwnProperty(b), "Could not instantiate singleton.");
        return c
    };
    var Gg = function (a, b, c, d, e, f) {
        if (jd && e) return Eg(a);
        if (e && !d) return !1;
        if (!C) {
            "number" === typeof b && (b = Fg(b));
            var h = 17 == b || 18 == b || jd && 91 == b;
            if ((!c || jd) && h || jd && 16 == b && (d || f)) return !1
        }
        if ((id || gd) && d && c) switch (a) {
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
        if (B && d && b == a) return !1;
        switch (a) {
            case 13:
                return C ? f || e ? !1 : !(c && d) : !0;
            case 27:
                return !(id || gd || C)
        }
        return C && (d || e || f) ? !1 : Eg(a)
    }, Eg = function (a) {
        if (48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <=
            a && 90 >= a || (id || gd) && 0 == a) return !0;
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
                return C;
            default:
                return !1
        }
    }, Fg = function (a) {
        if (C) a = Hg(a); else if (jd && id) switch (a) {
            case 93:
                a = 91
        }
        return a
    }, Hg = function (a) {
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
    var Ig = function (a, b, c, d) {
        Mf.call(this, d);
        this.type = "key";
        this.keyCode = a;
        this.repeat = c
    };
    w(Ig, Mf);
    var Jg = function (a, b) {
        jg.call(this);
        a && this.attach(a, b)
    };
    w(Jg, jg);
    k = Jg.prototype;
    k.wa = null;
    k.fb = null;
    k.Mb = null;
    k.gb = null;
    k.S = -1;
    k.ia = -1;
    k.rb = !1;
    var Kg = {
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
    }, Lg = {
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
    }, Mg = jd && C;
    k = Jg.prototype;
    k.uc = function (a) {
        if (id || gd) if (17 == this.S && !a.ctrlKey || 18 == this.S && !a.altKey || jd && 91 == this.S && !a.metaKey) this.ia = this.S = -1;
        -1 == this.S && (a.ctrlKey && 17 != a.keyCode ? this.S = 17 : a.altKey && 18 != a.keyCode ? this.S = 18 : a.metaKey && 91 != a.keyCode && (this.S = 91));
        Gg(a.keyCode, this.S, a.shiftKey, a.ctrlKey, a.altKey, a.metaKey) ? (this.ia = Fg(a.keyCode), Mg && (this.rb = a.altKey)) : this.handleEvent(a)
    };
    k.wc = function (a) {
        this.ia = this.S = -1;
        this.rb = a.altKey
    };
    k.handleEvent = function (a) {
        var b = a.g, c = b.altKey;
        if (B && "keypress" == a.type) {
            var d = this.ia;
            var e = 13 != d && 27 != d ? b.keyCode : 0
        } else (id || gd) && "keypress" == a.type ? (d = this.ia, e = 0 <= b.charCode && 63232 > b.charCode && Eg(d) ? b.charCode : 0) : ("keypress" == a.type ? (Mg && (c = this.rb), b.keyCode == b.charCode ? 32 > b.keyCode ? (d = b.keyCode, e = 0) : (d = this.ia, e = b.charCode) : (d = b.keyCode || this.ia, e = b.charCode || 0)) : (d = b.keyCode || this.ia, e = b.charCode || 0), jd && 63 == e && 224 == d && (d = 191));
        var f = d = Fg(d);
        d ? 63232 <= d && d in Kg ? f = Kg[d] : 25 == d && a.shiftKey && (f =
            9) : b.keyIdentifier && b.keyIdentifier in Lg && (f = Lg[b.keyIdentifier]);
        if (!C || "keypress" != a.type || Gg(f, this.S, a.shiftKey, a.ctrlKey, c, a.metaKey)) a = f == this.S, this.S = f, b = new Ig(f, e, a, b), b.altKey = c, I(this, b)
    };
    k.D = function () {
        return this.wa
    };
    k.attach = function (a, b) {
        this.gb && this.detach();
        this.wa = a;
        this.fb = $f(this.wa, "keypress", this, b);
        this.Mb = $f(this.wa, "keydown", this.uc, b, this);
        this.gb = $f(this.wa, "keyup", this.wc, b, this)
    };
    k.detach = function () {
        this.fb && (hg(this.fb), hg(this.Mb), hg(this.gb), this.gb = this.Mb = this.fb = null);
        this.wa = null;
        this.ia = this.S = -1
    };
    k.J = function () {
        Jg.I.J.call(this);
        this.detach()
    };
    var Ng = function () {
    };
    ua(Ng);
    var Pg = function (a) {
        jg.call(this);
        this.u = a || Sd();
        this.ka = Og;
        this.R = null;
        this.aa = !1;
        this.m = null;
        this.H = void 0;
        this.U = this.ga = this.B = null;
        this.Vb = !1
    };
    w(Pg, jg);
    Ng.T();
    var Og = null, Qg = function (a, b) {
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
    }, Rg = function (a, b) {
        if (a.B && a.B.U) {
            var c = a.B.U, d = a.R;
            d in c && delete c[d];
            c = a.B.U;
            if (null !== c && b in c) throw Error('The object already contains the key "' + b + '"');
            c[b] = a
        }
        a.R = b
    };
    Pg.prototype.D = function () {
        return this.m
    };
    var Sg = function (a) {
        a = a.m;
        x(a, "Can not call getElementStrict before rendering/decorating.");
        return a
    }, Tg = function (a) {
        a.H || (a.H = new og(a));
        return x(a.H)
    };
    Pg.prototype.pa = function () {
        this.m = de(this.u.g, "DIV")
    };
    var Ug = function (a, b) {
        if (a.aa) throw Error("Component already rendered");
        a.m || a.pa();
        b ? b.insertBefore(a.m, null) : a.u.g.body.appendChild(a.m);
        a.B && !a.B.aa || a.ha()
    }, Vg = function (a, b) {
        if (a.aa) throw Error("Component already rendered");
        if (b && a.Pb(b)) {
            a.Vb = !0;
            var c = Rd(b);
            a.u && a.u.g == c || (a.u = Sd(b));
            a.Wb(b);
            a.ha()
        } else throw Error("Invalid element to decorate");
    };
    k = Pg.prototype;
    k.Pb = function () {
        return !0
    };
    k.Wb = function (a) {
        this.m = a
    };
    k.ha = function () {
        this.aa = !0;
        Wg(this, function (a) {
            !a.aa && a.D() && a.ha()
        })
    };
    k.Xa = function () {
        Wg(this, function (a) {
            a.aa && a.Xa()
        });
        this.H && this.H.removeAll();
        this.aa = !1
    };
    k.J = function () {
        this.aa && this.Xa();
        this.H && (this.H.ya(), delete this.H);
        Wg(this, function (a) {
            a.ya()
        });
        !this.Vb && this.m && ge(this.m);
        this.B = this.m = this.U = this.ga = null;
        Pg.I.J.call(this)
    };
    var Wg = function (a, b) {
        a.ga && a.ga.forEach(b, void 0)
    };
    var Xg = function () {
    }, Yg;
    ua(Xg);
    var Zg = {
        button: "pressed",
        checkbox: "checked",
        menuitem: "selected",
        menuitemcheckbox: "checked",
        menuitemradio: "checked",
        radio: "checked",
        tab: "selected",
        treeitem: "selected"
    };
    Xg.prototype.Ta = function () {
    };
    Xg.prototype.xa = function (a) {
        return a.u.ma("DIV", $g(this, a).join(" "), a.getContent())
    };
    var ah = function (a, b, c) {
        (a = a.D ? a.D() : a) && (c ? Pe : Re)(a, [b])
    };
    Xg.prototype.Qb = function () {
        return !0
    };
    Xg.prototype.ba = function (a, b) {
        b.id && Rg(a, b.id);
        b && b.firstChild ? bh(a, b.firstChild.nextSibling ? Za(b.childNodes) : b.firstChild) : a.Fa = null;
        var c = 0, d = this.L(), e = this.L(), f = !1, h = !1, g = Za(Le(b));
        g.forEach(function (l) {
            f || l != d ? h || l != e ? c |= ch(this, l) : h = !0 : (f = !0, e == d && (h = !0));
            1 == ch(this, l) && (Na(b), b.hasAttribute("tabindex") && me(b) && le(b, !1))
        }, this);
        a.O = c;
        f || (g.push(d), e == d && (h = !0));
        h || g.push(e);
        (a = a.Z) && g.push.apply(g, a);
        f && h && !a || Me(b, g.join(" "));
        return b
    };
    Xg.prototype.cc = function (a) {
        null == a.ka && (a.ka = jf(a.aa ? a.m : a.u.g.body));
        a.ka && this.Sb(a.D(), !0);
        a.isEnabled() && this.hb(a, a.isVisible())
    };
    var dh = function (a, b) {
        if (a = a.Ta()) {
            x(b, "The element passed as a first parameter cannot be null.");
            var c = b.getAttribute("role") || null;
            a != c && Af(b, a)
        }
    };
    k = Xg.prototype;
    k.lb = function (a, b) {
        var c = !b;
        b = B ? a.getElementsByTagName("*") : null;
        if (kf) {
            if (c = c ? "none" : "", a.style && (a.style[kf] = c), b) {
                a = 0;
                for (var d; d = b[a]; a++) d.style && (d.style[kf] = c)
            }
        } else if (B && (c = c ? "on" : "", a.setAttribute("unselectable", c), b)) for (a = 0; d = b[a]; a++) d.setAttribute("unselectable", c)
    };
    k.Sb = function (a, b) {
        ah(a, this.L() + "-rtl", b)
    };
    k.Rb = function (a) {
        var b;
        return a.P & 32 && (b = a.D()) ? b.hasAttribute("tabindex") && me(b) : !1
    };
    k.hb = function (a, b) {
        var c;
        if (a.P & 32 && (c = a.D())) {
            if (!b && a.O & 32) {
                try {
                    c.blur()
                } catch (d) {
                }
                a.O & 32 && a.ac(null)
            }
            (c.hasAttribute("tabindex") && me(c)) != b && le(c, b)
        }
    };
    k.mb = function (a, b, c) {
        var d = a.D();
        if (d) {
            var e = eh(this, b);
            e && ah(a, e, c);
            this.fa(d, b, c)
        }
    };
    k.fa = function (a, b, c) {
        Yg || (Yg = {1: "disabled", 8: "selected", 16: "checked", 64: "expanded"});
        x(a, "The element passed as a first parameter cannot be null.");
        b = Yg[b];
        var d = a.getAttribute("role") || null;
        d && (d = Zg[d] || b, b = "checked" == b || "selected" == b ? d : b);
        b && Cf(a, b, c)
    };
    k.L = function () {
        return "goog-control"
    };
    var $g = function (a, b) {
        var c = a.L(), d = [c], e = a.L();
        e != c && d.push(e);
        c = b.getState();
        for (e = []; c;) {
            var f = c & -c;
            e.push(eh(a, f));
            c &= ~f
        }
        d.push.apply(d, e);
        (a = b.Z) && d.push.apply(d, a);
        return d
    }, eh = function (a, b) {
        a.m || fh(a);
        return a.m[b]
    }, ch = function (a, b) {
        if (!a.N) {
            a.m || fh(a);
            var c = a.m, d = {}, e;
            for (e in c) d[c[e]] = e;
            a.N = d
        }
        a = parseInt(a.N[b], 10);
        return isNaN(a) ? 0 : a
    }, fh = function (a) {
        var b = a.L();
        var c = -1 != b.replace(/\xa0|\s/g, " ").indexOf(" ");
        x(!c, "ControlRenderer has an invalid css class: '" + b + "'");
        a.m = {
            1: b + "-disabled",
            2: b + "-hover",
            4: b + "-active",
            8: b + "-selected",
            16: b + "-checked",
            32: b + "-focused",
            64: b + "-open"
        }
    };
    var gh = function () {
    };
    w(gh, Xg);
    ua(gh);
    k = gh.prototype;
    k.Ta = function () {
        return "button"
    };
    k.fa = function (a, b, c) {
        switch (b) {
            case 8:
            case 16:
                x(a, "The button DOM element cannot be null.");
                Cf(a, "pressed", c);
                break;
            default:
            case 64:
            case 1:
                gh.I.fa.call(this, a, b, c)
        }
    };
    k.xa = function (a) {
        var b = gh.I.xa.call(this, a);
        this.jb(b, a.Oa());
        var c = a.ua();
        c && this.nb(b, c);
        a.P & 16 && this.fa(b, 16, a.Aa());
        return b
    };
    k.ba = function (a, b) {
        b = gh.I.ba.call(this, a, b);
        var c = this.ua(b);
        a.Ca = c;
        a.M = this.Oa(b);
        a.P & 16 && this.fa(b, 16, a.Aa());
        return b
    };
    k.ua = function () {
    };
    k.nb = function () {
    };
    k.Oa = function (a) {
        return a.title
    };
    k.jb = function (a, b) {
        a && (b ? a.title = b : a.removeAttribute("title"))
    };
    k.L = function () {
        return "goog-button"
    };
    var hh = {
        ob: "mousedown",
        pb: "mouseup",
        Tb: "mousecancel",
        Gd: "mousemove",
        Id: "mouseover",
        Hd: "mouseout",
        Ed: "mouseenter",
        Fd: "mouseleave"
    };
    var ih = function (a, b) {
        if (!a) throw Error("Invalid class name " + a);
        if ("function" !== typeof b) throw Error("Invalid decorator function " + b);
    }, jh = {};
    var J = function (a, b, c) {
        Pg.call(this, c);
        if (!b) {
            for (b = this.constructor; b;) {
                var d = Aa(b);
                if (d = jh[d]) break;
                b = (b = Object.getPrototypeOf(b.prototype)) && b.constructor
            }
            b = d ? "function" === typeof d.T ? d.T() : new d : null
        }
        this.g = b;
        this.Fa = void 0 !== a ? a : null
    };
    w(J, Pg);
    k = J.prototype;
    k.Fa = null;
    k.O = 0;
    k.P = 39;
    k.Ea = 255;
    k.lc = !0;
    k.Z = null;
    k.bb = !0;
    var lh = function (a) {
        a.aa && 0 != a.bb && kh(a, !1);
        a.bb = !1
    }, mh = function (a, b) {
        b && (a.Z ? Xa(a.Z, b) || a.Z.push(b) : a.Z = [b], ah(a, b, !0))
    };
    J.prototype.pa = function () {
        var a = this.g.xa(this);
        this.m = a;
        dh(this.g, a);
        this.g.lb(a, !1);
        this.isVisible() || (hf(a, !1), a && Cf(a, "hidden", !0))
    };
    J.prototype.Pb = function (a) {
        return this.g.Qb(a)
    };
    J.prototype.Wb = function (a) {
        this.m = a = this.g.ba(this, a);
        dh(this.g, a);
        this.g.lb(a, !1);
        this.lc = "none" != a.style.display
    };
    J.prototype.ha = function () {
        J.I.ha.call(this);
        var a = this.g, b = Sg(this);
        x(this);
        x(b);
        this.isVisible() || Cf(b, "hidden", !this.isVisible());
        this.isEnabled() || a.fa(b, 1, !this.isEnabled());
        this.P & 8 && a.fa(b, 8, this.isSelected());
        this.P & 16 && a.fa(b, 16, this.Aa());
        this.P & 64 && a.fa(b, 64, !!(this.O & 64));
        this.g.cc(this);
        this.P & -2 && (this.bb && kh(this, !0), this.P & 32 && (a = this.D())) && (b = this.K || (this.K = new Jg), b.attach(a), Tg(this).listen(b, "key", this.vc).listen(a, "focus", this.tc).listen(a, "blur", this.ac))
    };
    var kh = function (a, b) {
        var c = Tg(a), d = a.D();
        b ? (c.listen(d, hh.ob, a.Pa).listen(d, [hh.pb, hh.Tb], a.Qa).listen(d, "mouseover", a.Ua).listen(d, "mouseout", a.Da), a.V != Ua && c.listen(d, "contextmenu", a.V), B && !a.N && (a.N = new nh(a), Ff(a, u(Ef, a.N)))) : (qg(qg(qg(qg(c, d, hh.ob, a.Pa), d, [hh.pb, hh.Tb], a.Qa), d, "mouseover", a.Ua), d, "mouseout", a.Da), a.V != Ua && qg(c, d, "contextmenu", a.V), B && (Ef(a.N), a.N = null))
    };
    J.prototype.Xa = function () {
        J.I.Xa.call(this);
        this.K && this.K.detach();
        this.isVisible() && this.isEnabled() && this.g.hb(this, !1)
    };
    J.prototype.J = function () {
        J.I.J.call(this);
        this.K && (this.K.ya(), delete this.K);
        delete this.g;
        this.N = this.Z = this.Fa = null
    };
    J.prototype.getContent = function () {
        return this.Fa
    };
    var bh = function (a, b) {
        a.Fa = b
    };
    J.prototype.isVisible = function () {
        return this.lc
    };
    J.prototype.isEnabled = function () {
        return !(this.O & 1)
    };
    J.prototype.setEnabled = function (a) {
        var b = this.B;
        b && "function" == typeof b.isEnabled && !b.isEnabled() || !oh(this, 1, !a) || (a || (ph(this, !1), qh(this, !1)), this.isVisible() && this.g.hb(this, a), sh(this, 1, !a, !0))
    };
    var qh = function (a, b) {
        oh(a, 2, b) && sh(a, 2, b)
    };
    J.prototype.isActive = function () {
        return !!(this.O & 4)
    };
    var ph = function (a, b) {
        oh(a, 4, b) && sh(a, 4, b)
    };
    k = J.prototype;
    k.isSelected = function () {
        return !!(this.O & 8)
    };
    k.Aa = function () {
        return !!(this.O & 16)
    };
    k.Ob = function (a) {
        oh(this, 16, a) && sh(this, 16, a)
    };
    k.ib = function (a) {
        oh(this, 32, a) && sh(this, 32, a)
    };
    k.getState = function () {
        return this.O
    };
    var sh = function (a, b, c, d) {
        d || 1 != b ? a.P & b && c != !!(a.O & b) && (a.g.mb(a, b, c), a.O = c ? a.O | b : a.O & ~b) : a.setEnabled(!c)
    }, th = function (a) {
        if (a.aa && a.O & 32) throw Error("Component already rendered");
        a.O & 32 && sh(a, 32, !1);
        a.P &= -33
    }, L = function (a, b) {
        return !!(a.Ea & b) && !!(a.P & b)
    }, oh = function (a, b, c) {
        return !!(a.P & b) && !!(a.O & b) != c && (!(0 & b) || I(a, Qg(b, c))) && !a.X
    };
    J.prototype.Ua = function (a) {
        !uh(a, this.D()) && I(this, "enter") && this.isEnabled() && L(this, 2) && qh(this, !0)
    };
    J.prototype.Da = function (a) {
        !uh(a, this.D()) && I(this, "leave") && (L(this, 4) && ph(this, !1), L(this, 2) && qh(this, !1))
    };
    J.prototype.V = Ua;
    var uh = function (a, b) {
        return !!a.relatedTarget && he(b, a.relatedTarget)
    };
    k = J.prototype;
    k.Pa = function (a) {
        this.isEnabled() && (L(this, 2) && qh(this, !0), 0 != a.g.button || jd && a.ctrlKey || (L(this, 4) && ph(this, !0), this.g && this.g.Rb(this) && this.D().focus()));
        0 != a.g.button || jd && a.ctrlKey || a.s()
    };
    k.Qa = function (a) {
        this.isEnabled() && (L(this, 2) && qh(this, !0), this.isActive() && this.Sa(a) && L(this, 4) && ph(this, !1))
    };
    k.Sa = function (a) {
        L(this, 16) && this.Ob(!this.Aa());
        L(this, 8) && oh(this, 8, !0) && sh(this, 8, !0);
        if (L(this, 64)) {
            var b = !(this.O & 64);
            oh(this, 64, b) && sh(this, 64, b)
        }
        b = new Jf("action", this);
        a && (b.altKey = a.altKey, b.ctrlKey = a.ctrlKey, b.metaKey = a.metaKey, b.shiftKey = a.shiftKey, b.F = a.F);
        return I(this, b)
    };
    k.tc = function () {
        L(this, 32) && this.ib(!0)
    };
    k.ac = function () {
        L(this, 4) && ph(this, !1);
        L(this, 32) && this.ib(!1)
    };
    k.vc = function (a) {
        return this.isVisible() && this.isEnabled() && this.ab(a) ? (a.s(), a.B(), !0) : !1
    };
    k.ab = function (a) {
        return 13 == a.keyCode && this.Sa(a)
    };
    if ("function" !== typeof J) throw Error("Invalid component class " + J);
    if ("function" !== typeof Xg) throw Error("Invalid renderer class " + Xg);
    var vh = Aa(J);
    jh[vh] = Xg;
    ih("goog-control", function () {
        return new J(null)
    });
    var nh = function (a) {
        H.call(this);
        this.m = a;
        this.g = !1;
        this.s = new og(this);
        Ff(this, u(Ef, this.s));
        a = Sg(this.m);
        this.s.listen(a, hh.ob, this.B).listen(a, hh.pb, this.F).listen(a, "click", this.u)
    };
    w(nh, H);
    var wh = !B || 9 <= Number(yd);
    nh.prototype.B = function () {
        this.g = !1
    };
    nh.prototype.F = function () {
        this.g = !0
    };
    var xh = function (a, b) {
        if (!wh) return a.button = 0, a.type = b, a;
        var c = document.createEvent("MouseEvents");
        c.initMouseEvent(b, a.bubbles, a.cancelable, a.view || null, a.detail, a.screenX, a.screenY, a.clientX, a.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, a.relatedTarget || null);
        return c
    };
    nh.prototype.u = function (a) {
        if (this.g) this.g = !1; else {
            var b = a.g, c = b.button, d = b.type, e = xh(b, "mousedown");
            this.m.Pa(new Mf(e, a.m));
            e = xh(b, "mouseup");
            this.m.Qa(new Mf(e, a.m));
            wh || (b.button = c, b.type = d)
        }
    };
    nh.prototype.J = function () {
        this.m = null;
        nh.I.J.call(this)
    };
    var yh = function () {
    };
    w(yh, gh);
    ua(yh);
    k = yh.prototype;
    k.Ta = function () {
    };
    k.xa = function (a) {
        lh(a);
        a.Ea &= -256;
        th(a);
        var b = a.u, c = b.ma,
            d = {"class": $g(this, a).join(" "), disabled: !a.isEnabled(), title: a.Oa() || "", value: a.ua() || ""};
        if (a = a.getContent()) {
            if ("string" !== typeof a) if (Array.isArray(a)) a = a.map(oe).join(""); else {
                var e = [];
                ne(a, e, !0);
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
    k.Qb = function (a) {
        return "BUTTON" == a.tagName || "INPUT" == a.tagName && ("button" == a.type || "submit" == a.type || "reset" == a.type)
    };
    k.ba = function (a, b) {
        lh(a);
        a.Ea &= -256;
        th(a);
        if (b.disabled) {
            var c = Ka(eh(this, 1));
            Oe(b, c)
        }
        return yh.I.ba.call(this, a, b)
    };
    k.cc = function (a) {
        Tg(a).listen(a.D(), "click", a.Sa)
    };
    k.lb = function () {
    };
    k.Sb = function () {
    };
    k.Rb = function (a) {
        return a.isEnabled()
    };
    k.hb = function () {
    };
    k.mb = function (a, b, c) {
        yh.I.mb.call(this, a, b, c);
        (a = a.D()) && 1 == b && (a.disabled = c)
    };
    k.ua = function (a) {
        return a.value
    };
    k.nb = function (a, b) {
        a && (a.value = b)
    };
    k.fa = function () {
    };
    var zh = function (a, b, c) {
        J.call(this, a, b || yh.T(), c)
    };
    w(zh, J);
    k = zh.prototype;
    k.ua = function () {
        return this.Ca
    };
    k.Oa = function () {
        return this.M
    };
    k.jb = function (a) {
        this.M = a;
        this.g.jb(this.D(), a)
    };
    k.J = function () {
        zh.I.J.call(this);
        delete this.Ca;
        delete this.M
    };
    k.ha = function () {
        zh.I.ha.call(this);
        if (this.P & 32) {
            var a = this.D();
            a && Tg(this).listen(a, "keyup", this.ab)
        }
    };
    k.ab = function (a) {
        return 13 == a.keyCode && "key" == a.type || 32 == a.keyCode && "keyup" == a.type ? this.Sa(a) : 32 == a.keyCode
    };
    ih("goog-button", function () {
        return new zh(null)
    });
    var Ah = ha(["value"]), Ch = function (a, b, c, d) {
        zh.call(this, a, Bh.T(), b);
        this.W = c || 0;
        this.Y = d || 0;
        this.na = !1
    };
    w(Ch, zh);
    k = Ch.prototype;
    k.jb = function (a) {
        this.M = a;
        var b = this.D();
        if (b) if (this.na) {
            var c = a instanceof A ? tg(Pb(a).toString()) : a;
            b.removeAttribute("title");
            b.removeAttribute("data-tooltip-contained");
            b.removeAttribute("data-tooltip");
            a ? (a instanceof A ? b.g = a : (b.setAttribute("data-tooltip", a), b.g = null), b.setAttribute("aria-label", c)) : (b.g = null, b.removeAttribute("aria-label"));
            a = Sd(b) || Sd();
            b = Aa(a.g);
            vg[b] || (vg[b] = new wg(a))
        } else a ? b.title = a : b.removeAttribute("title")
    };
    k.setEnabled = function (a) {
        this.isEnabled() != a && (Ch.I.setEnabled.call(this, a), Dh(this))
    };
    k.ib = function (a) {
        Ch.I.ib.call(this, a);
        Eh(this, !1)
    };
    k.Pa = function (a) {
        Ch.I.Pa.call(this, a);
        this.isEnabled() && Eh(this, !0)
    };
    k.Qa = function (a) {
        Ch.I.Qa.call(this, a);
        this.isEnabled() && Eh(this, !0)
    };
    var Eh = function (a, b) {
        a.D() && (a = a.D(), b ? Oe(a, "jfk-button-clear-outline") : Qe(a, "jfk-button-clear-outline"))
    }, Dh = function (a) {
        a.D() && Fh(a.g, a)
    }, Hh = function () {
        var a = Gh("MSG_TRANSLATE");
        return new Ch(a, void 0, 2)
    }, Bh = function () {
        this.M = this.L() + "-standard";
        this.s = this.L() + "-action";
        this.K = this.L() + "-primary";
        this.F = this.L() + "-default";
        this.H = this.L() + "-flat";
        this.ea = this.L() + "-narrow";
        this.X = this.L() + "-mini";
        this.B = this.L() + "-contrast"
    };
    w(Bh, gh);
    Bh.T = function () {
        return Dg(Bh)
    };
    Bh.prototype.g = function (a, b, c) {
        a && c.W != a && (c.W = a, Dh(c));
        b && c.Y != b && (c.Y = b, Dh(c))
    };
    Bh.prototype.L = function () {
        return "jfk-button"
    };
    Bh.prototype.xa = function (a) {
        Pa(a, Ch, "Button is expected to be instance of jfk.Button");
        var b = a.u;
        var c = {
            disabled: !a.isEnabled(),
            checked: a.Aa(),
            style: a.W,
            title: a.Oa(),
            Bc: a.na,
            value: a.ua(),
            width: a.Y
        };
        if (Ed["jfk.templates.button.strict"]) var d = Ed["jfk.templates.button.strict"](c, void 0); else {
            c = c || {};
            var e = c.attributes;
            d = c.content;
            var f = c.disabled, h = c.id, g = c.Ke, l = c.title, n = c.Bc, p = c.value, r = Ad;
            h = '<div role="button"' + (h ? ' id="' + Jd(h) + '"' : "") + ' class="';
            var v = c || {};
            c = v.rc;
            var G = v.disabled, F = v.checked, M =
                v.style;
            v = v.width;
            Ld();
            if (Ed["jfk.templates.button.classes_"]) c = Ed["jfk.templates.button.classes_"]({
                rc: c,
                disabled: G,
                checked: F,
                style: M,
                width: v
            }, void 0); else {
                var K = "goog-inline-block jfk-button ";
                switch (xa(M) ? M.toString() : M) {
                    case 0:
                        K += "jfk-button-standard";
                        break;
                    case 2:
                        K += "jfk-button-action";
                        break;
                    case 3:
                        K += "jfk-button-primary";
                        break;
                    case 1:
                        K += "jfk-button-default";
                        break;
                    case 4:
                        K += "jfk-button-flat";
                        break;
                    case 5:
                        K += "jfk-button-mini";
                        break;
                    case 6:
                        K += "jfk-button-contrast";
                        break;
                    default:
                        K += "jfk-button-standard"
                }
                c =
                    K += (Fd(v, 1) ? " jfk-button-narrow" : "") + (F ? " jfk-button-checked" : "") + (c ? " " + c : "") + (G ? " jfk-button-disabled" : "")
            }
            f = h + Jd(c) + '"' + (f ? ' aria-disabled="true"' : ' tabindex="' + (g ? Jd(g) : "0") + '"') + (l ? n ? ' data-tooltip="' + Jd(l) + '"' : ' title="' + Jd(l) + '"' : "") + (p ? ' value="' + Jd(p) + '"' : "");
            e ? (Zc(e, Vc, Yc) ? e = e.getContent() : (e = String(e), Nd.test(e) || (Ia("Bad value `%s` for |filterHtmlAttributes", [e]), e = "zSoyz")), Zc(e, Vc, Yc) && (e = e.getContent()), e = (e && !e.startsWith(" ") ? " " : "") + e) : e = "";
            d = r(f + e + ">" + Dd(null != d ? d : "") + "</div>")
        }
        r =
            d;
        d = b || Sd();
        r && r.g ? d = r.g() : (d = de(d.g, "DIV"), r = se(r), e = r.za(), f = e.match(te), x(!f, "This template starts with a %s, which cannot be a child of a <div>, as required by soy internals. Consider using goog.soy.renderElement instead.\nTemplate output: %s", f && f[0], e), Xb(d, r));
        1 == d.childNodes.length && (r = d.firstChild, 1 == r.nodeType && (d = r));
        b.oc(d, a.getContent());
        this.ba(a, d);
        return d
    };
    Bh.prototype.ba = function (a, b) {
        Bh.I.ba.call(this, a, b);
        this.u || (this.u = db(this.M, u(this.g, 0, null), this.s, u(this.g, 2, null), this.K, u(this.g, 3, null), this.F, u(this.g, 1, null), this.H, u(this.g, 4, null), this.X, u(this.g, 5, null), this.B, u(this.g, 6, null), this.ea, u(this.g, null, 1)));
        for (var c = Le(b), d = 0; d < c.length; ++d) {
            var e = this.u[c[d]];
            e && e(a)
        }
        if (c = b.getAttribute("data-tooltip")) a.M = c, a.na = !0;
        return b
    };
    var qc = [function (a) {
        oc(a, !0, "safeAttr is a template literal tag function and should be called using the tagged template syntax. For example, safeAttr`foo`;");
        var b = a[0].toLowerCase();
        if (0 === b.indexOf("on") || 0 === "on".indexOf(b)) throw Error("Prefix '" + a[0] + "' does not guarantee the attribute to be safe as it is also a prefix for event handler attributesPlease use 'addEventListener' to set event handlers.");
        kc.forEach(function (c) {
            if (0 === c.indexOf(b)) throw Error("Prefix '" + a[0] + "' does not guarantee the attribute to be safe as it is also a prefix for the security sensitive attribute '" +
                (c + "'. Please use native or safe DOM APIs to set the attribute."));
        });
        return new nc(b, lc)
    }(Ah)];
    Bh.prototype.ua = function (a) {
        return a.getAttribute("value") || ""
    };
    Bh.prototype.nb = function (a, b) {
        a && pc(a, b)
    };
    var Fh = function (a, b) {
        function c(h, g) {
            (h ? d : e).push(g)
        }

        x(b.D(), "Button element must already exist when updating style.");
        var d = [], e = [], f = b.W;
        c(0 == f, a.M);
        c(2 == f, a.s);
        c(3 == f, a.K);
        c(4 == f, a.H);
        c(5 == f, a.X);
        c(1 == f, a.F);
        c(6 == f, a.B);
        c(1 == b.Y, a.ea);
        c(!b.isEnabled(), a.L() + "-disabled");
        Re(b.D(), e);
        Pe(b.D(), d)
    };
    var Ih = function () {
        Ch.call(this, "", void 0, 4);
        mh(this, "jfk-button-flat");
        mh(this, "gtx-audio-button");
        mh(this, "no-audio");
        this.Va = this.Ub = "";
        Tg(this).listen(this, "action", this.qc)
    };
    m(Ih, Ch);
    Ih.prototype.qc = function () {
        var a = chrome.runtime, b = a.sendMessage;
        var c = this.Ub;
        c = "https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=" + this.Va + Ta(c) + "&q=" + encodeURIComponent(String(c));
        b.call(a, {audioSrc: c})
    };
    var Lh = function (a, b, c) {
        var d = c.toLowerCase();
        d in Jh && Kh[Jh[d.toLowerCase()]] >= b.length ? (a.Z && Ya(a.Z, "no-audio") && (0 == a.Z.length && (a.Z = null), ah(a, "no-audio", !1)), a.Ub = b, a.Va = c) : mh(a, "no-audio")
    };

    function Mh(a) {
        a = String(a).toLowerCase().replace("_", "-");
        if ("zh-cn" == a) return "zh-CN";
        if ("zh-tw" == a) return "zh-TW";
        var b = a.indexOf("-");
        a = 0 <= b ? a.substring(0, b) : a;
        return "zh" == a ? "zh-CN" : a
    }

    function Gh(a) {
        a = chrome.i18n.getMessage(a);
        return chrome.i18n.getMessage(a)
    };var Oh = function () {
        this.m = [];
        chrome.i18n.getAcceptLanguages(t(this.H, this));
        this.g = "";
        this.u = "1";
        this.s = {};
        this.B = {};
        chrome.storage.local.get(null, t(this.X, this));
        Nh(this)
    }, Qh = function () {
        var a = Ph;
        if ("" != a.g) a = a.g; else a:{
            for (var b = 0; b < a.m.length; b++) {
                var c = Mh(a.m[b]);
                if (a.s[c]) {
                    a = c;
                    break a
                }
            }
            a = "en"
        }
        return a
    };
    Oh.prototype.X = function (a) {
        "gtxTargetLang" in a && (this.g = a.gtxTargetLang);
        "gtxShowBubble" in a && (this.u = a.gtxShowBubble);
        "gtxSourceLangList" in a && (this.B = Rh(this, a.gtxSourceLangList));
        "gtxTargetLangList" in a && (this.s = Rh(this, a.gtxTargetLangList));
        this.loaded = !0
    };
    var Rh = function (a, b) {
        var c = [], d;
        for (d in b) c.push({code: d, name: b[d]});
        c.sort(a.F);
        a = {};
        for (b = 0; b < c.length; b++) a[c[b].code] = c[b].name;
        return a
    };
    Oh.prototype.F = function (a, b) {
        return a.name.localeCompare(b.name)
    };
    var Nh = function (a) {
        chrome.storage.onChanged.addListener(function (b) {
            b.gtxTargetLang && (a.g = b.gtxTargetLang.newValue);
            b.gtxShowBubble && (a.u = b.gtxShowBubble.newValue)
        })
    };
    Oh.prototype.H = function (a) {
        this.m = a
    };
    var Sh = function (a) {
        var b = Ph;
        if ("sl" == a) return b.B;
        if ("tl" == a) return b.s;
        throw Error("Invalid input for getLangList()");
    };
    var Kh = [0, 200], Jh = {
        af: 1,
        ar: 1,
        bn: 1,
        bs: 1,
        ca: 1,
        cs: 1,
        cy: 1,
        da: 1,
        de: 1,
        el: 1,
        en: 1,
        eo: 1,
        es: 1,
        et: 1,
        fi: 1,
        fr: 1,
        gu: 1,
        hi: 1,
        hr: 1,
        hu: 1,
        hy: 1,
        id: 1,
        is: 1,
        it: 1,
        ja: 1,
        jw: 1,
        km: 1,
        kn: 1,
        ko: 1,
        la: 1,
        lv: 1,
        mk: 1,
        ml: 1,
        mr: 1,
        my: 1,
        ne: 1,
        nl: 1,
        no: 1,
        pl: 1,
        pt: 1,
        ro: 1,
        ru: 1,
        si: 1,
        sk: 1,
        sq: 1,
        sr: 1,
        su: 1,
        sv: 1,
        sw: 1,
        ta: 1,
        te: 1,
        th: 1,
        tl: 1,
        tr: 1,
        vi: 1,
        uk: 1,
        ur: 1,
        zh: 1,
        "zh-cn": 1,
        "zh-tw": 1
    };
    var Th = function () {
        this.m = [];
        this.g = {};
        this.s = !1;
        this.H = 1;
        this.u = {};
        $f(window, "beforeunload", this.F, !1, this)
    }, Uh = function (a, b, c) {
        if (null == b) return "1";
        switch (va(b)) {
            case "string":
                return a = b, 64 < a.length && (null == c || !c) && (a = a.substr(0, 64)), encodeURIComponent(String(a));
            case "number":
                return "" + b;
            case "boolean":
                return b ? "1" : "0";
            case "array":
                var d = [];
                for (var e in b) d.push(Uh(a, b[e], c));
                return d.join(",");
            case "object":
                d = [];
                for (var f in b) d.push(Vh(a, f, b[f], c));
                return d.join(",");
            default:
                return ""
        }
    }, Vh = function (a,
                      b, c, d) {
        return [encodeURIComponent(String(b)), Uh(a, c, d || "smtalt" == b)].join("=")
    };
    Th.prototype.log = function (a, b) {
        this.m.push([a, b]);
        this.s || (this.s = !0, mg(this.B, 0, this))
    };
    Th.prototype.B = function () {
        for (var a = 0; a < this.m.length; a++) {
            var b = this.m[a];
            Wh(this, "/gen204?" + Vh(this, b[0], b[1]))
        }
        this.m = [];
        this.s = !1
    };
    var Wh = function (a, b) {
        var c = new Image, d = a.H++;
        a.u[d] = c;
        c.onload = c.onerror = function () {
            delete Th.T().u[d]
        };
        c.src = b;
        c = null
    };
    Th.prototype.F = function () {
        this.B();
        for (var a in this.g) 0 != this.g[a] && (Wh(this, "/gen204?" + Vh(this, a, this.g[a][1])), a in this.g && (q.clearTimeout(this.g[a][0]), delete this.g[a]))
    };
    Th.T = function () {
        return Dg(Th)
    };
    var Xh = function () {
    };
    Xh.prototype.g = null;
    var Zh = function (a) {
        var b;
        (b = a.g) || (b = {}, Yh(a) && (b[0] = !0, b[1] = !0), b = a.g = b);
        return b
    };
    var $h, ai = function () {
    };
    w(ai, Xh);
    var bi = function (a) {
        return (a = Yh(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    }, Yh = function (a) {
        if (!a.m && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d), a.m = d
                } catch (e) {
                }
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return a.m
    };
    $h = new ai;
    var N = function (a) {
        jg.call(this);
        this.headers = new Map;
        this.W = a || null;
        this.u = !1;
        this.V = this.g = null;
        this.H = this.ka = this.F = "";
        this.B = this.ga = this.M = this.Y = !1;
        this.K = 0;
        this.N = null;
        this.pa = "";
        this.U = this.Da = !1
    };
    w(N, jg);
    N.prototype.m = Fc(Gc(), "goog.net.XhrIo").s;
    var ci = /^https?$/i, di = ["POST", "PUT"], ei = [], fi = function (a, b, c, d) {
        var e = new N;
        ei.push(e);
        b && e.listen("complete", b);
        e.s.add("ready", e.Ua, !0, void 0, void 0);
        e.send(a, c, d, void 0)
    };
    N.prototype.Ua = function () {
        this.ya();
        Ya(ei, this)
    };
    N.prototype.send = function (a, b, c, d) {
        if (this.g) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.F + "; newUri=" + a);
        b = b ? b.toUpperCase() : "GET";
        this.F = a;
        this.H = "";
        this.ka = b;
        this.Y = !1;
        this.u = !0;
        this.g = this.W ? bi(this.W) : bi($h);
        this.V = this.W ? Zh(this.W) : Zh($h);
        this.g.onreadystatechange = t(this.na, this);
        try {
            Jc(this.m, gi(this, "Opening Xhr")), this.ga = !0, this.g.open(b, String(a), !0), this.ga = !1
        } catch (h) {
            Jc(this.m, gi(this, "Error opening Xhr: " + h.message));
            hi(this, h);
            return
        }
        a = c || "";
        c = new Map(this.headers);
        if (d) if (Object.getPrototypeOf(d) === Object.prototype) for (var e in d) c.set(e, d[e]); else if ("function" === typeof d.keys && "function" === typeof d.get) {
            e = ia(d.keys());
            for (var f = e.next(); !f.done; f = e.next()) f = f.value, c.set(f, d.get(f))
        } else throw Error("Unknown input type for opt_headers: " + String(d));
        d = Array.from(c.keys()).find(function (h) {
            return "content-type" == h.toLowerCase()
        });
        e = q.FormData && a instanceof q.FormData;
        !Xa(di, b) || d || e || c.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        b =
            ia(c);
        for (d = b.next(); !d.done; d = b.next()) c = ia(d.value), d = c.next().value, c = c.next().value, this.g.setRequestHeader(d, c);
        this.pa && (this.g.responseType = this.pa);
        "withCredentials" in this.g && this.g.withCredentials !== this.Da && (this.g.withCredentials = this.Da);
        try {
            ii(this), 0 < this.K && (this.U = ji(this.g), Jc(this.m, gi(this, "Will abort after " + this.K + "ms if incomplete, xhr2 " + this.U)), this.U ? (this.g.timeout = this.K, this.g.ontimeout = t(this.Ca, this)) : this.N = mg(this.Ca, this.K, this)), Jc(this.m, gi(this, "Sending request")),
                this.M = !0, this.g.send(a), this.M = !1
        } catch (h) {
            Jc(this.m, gi(this, "Send error: " + h.message)), hi(this, h)
        }
    };
    var ji = function (a) {
        return B && "number" === typeof a.timeout && void 0 !== a.ontimeout
    };
    N.prototype.Ca = function () {
        "undefined" != typeof ta && this.g && (this.H = "Timed out after " + this.K + "ms, aborting", Jc(this.m, gi(this, this.H)), I(this, "timeout"), this.abort(8))
    };
    var hi = function (a, b) {
        a.u = !1;
        a.g && (a.B = !0, a.g.abort(), a.B = !1);
        a.H = b;
        ki(a);
        li(a)
    }, ki = function (a) {
        a.Y || (a.Y = !0, I(a, "complete"), I(a, "error"))
    };
    N.prototype.abort = function () {
        this.g && this.u && (Jc(this.m, gi(this, "Aborting")), this.u = !1, this.B = !0, this.g.abort(), this.B = !1, I(this, "complete"), I(this, "abort"), li(this))
    };
    N.prototype.J = function () {
        this.g && (this.u && (this.u = !1, this.B = !0, this.g.abort(), this.B = !1), li(this, !0));
        N.I.J.call(this)
    };
    N.prototype.na = function () {
        this.X || (this.ga || this.M || this.B ? mi(this) : this.Va())
    };
    N.prototype.Va = function () {
        mi(this)
    };
    var mi = function (a) {
        if (a.u && "undefined" != typeof ta) if (a.V[1] && 4 == ni(a) && 2 == a.sa()) Jc(a.m, gi(a, "Local request error detected and ignored")); else if (a.M && 4 == ni(a)) mg(a.na, 0, a); else if (I(a, "readystatechange"), 4 == ni(a)) {
            Jc(a.m, gi(a, "Request complete"));
            a.u = !1;
            try {
                if (oi(a)) I(a, "complete"), I(a, "success"); else {
                    try {
                        var b = 2 < ni(a) ? a.g.statusText : ""
                    } catch (c) {
                        Jc(a.m, "Can not get status: " + c.message), b = ""
                    }
                    a.H = b + " [" + a.sa() + "]";
                    ki(a)
                }
            } finally {
                li(a)
            }
        }
    }, li = function (a, b) {
        if (a.g) {
            ii(a);
            var c = a.g, d = a.V[0] ? function () {
                } :
                null;
            a.g = null;
            a.V = null;
            b || I(a, "ready");
            try {
                c.onreadystatechange = d
            } catch (e) {
                Ic(a.m, "Problem encountered resetting onreadystatechange: " + e.message)
            }
        }
    }, ii = function (a) {
        a.g && a.U && (a.g.ontimeout = null);
        a.N && (q.clearTimeout(a.N), a.N = null)
    };
    N.prototype.isActive = function () {
        return !!this.g
    };
    var oi = function (a) {
        var b = a.sa();
        a:switch (b) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
                var c = !0;
                break a;
            default:
                c = !1
        }
        if (!c) {
            if (b = 0 === b) a = String(a.F).match(fc)[1] || null, !a && q.self && q.self.location && (a = q.self.location.protocol.slice(0, -1)), b = !ci.test(a ? a.toLowerCase() : "");
            c = b
        }
        return c
    }, ni = function (a) {
        return a.g ? a.g.readyState : 0
    };
    N.prototype.sa = function () {
        try {
            return 2 < ni(this) ? this.g.status : -1
        } catch (a) {
            return -1
        }
    };
    var pi = function (a) {
        try {
            return a.g ? a.g.responseText : ""
        } catch (b) {
            return Jc(a.m, "Can not get responseText: " + b.message), ""
        }
    }, gi = function (a, b) {
        return b + " [" + a.ka + " " + a.F + " " + a.sa() + "]"
    };

    function qi(a, b) {
        void 0 === a.eb ? Object.defineProperties(a, {
            eb: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        }) : a.eb |= b
    }

    function ri(a) {
        return a.eb || 0
    }

    function si(a, b, c) {
        Object.defineProperties(a, {
            Lb: {value: b, configurable: !0, writable: !0, enumerable: !1},
            dc: {value: c, configurable: !0, writable: !0, enumerable: !1},
            xc: {value: void 0, configurable: !0, writable: !0, enumerable: !1}
        })
    }

    function ti(a) {
        return null != a.Lb
    }

    function ui(a) {
        return a.Lb
    }

    function vi(a, b) {
        a.Lb = b
    }

    function wi(a, b) {
        a.xc = b
    }

    function xi(a) {
        return a.dc
    }

    function yi(a, b) {
        x(0 <= Object.getOwnPropertyNames(a).indexOf("internalJsprotoWrapper"));
        return a.dc = b
    };var zi, Ai, Bi, Ci, Di, Ei, Fi, Gi, Hi;
    if ("function" === typeof Symbol && "symbol" === typeof Symbol()) {
        var Ii = Symbol("bitset"), Ji = Symbol("pivotFieldNumber"), Ki = Symbol("descriptor"),
            Li = Symbol("unparsedFields"), Mi = Symbol("wrapper");
        zi = function (a, b) {
            a[Ii] = Ai(a) | b
        };
        Ai = function (a) {
            return a[Ii] || 0
        };
        Ci = function (a, b, c, d) {
            a[Ji] = b;
            a[Mi] = c;
            a[Ki] = d;
            a[Li] = void 0
        };
        Bi = function (a) {
            return null != a[Ji]
        };
        Di = function (a) {
            return a[Ji]
        };
        Ei = function (a, b) {
            a[Ji] = b
        };
        Fi = function (a, b) {
            a[Li] = b
        };
        Gi = function (a) {
            return a[Mi]
        };
        Hi = function (a, b) {
            x(Bi(a));
            return a[Mi] = b
        }
    } else zi =
        qi, Ai = ri, Ci = si, Bi = ti, Di = ui, Ei = vi, Fi = wi, Gi = xi, Hi = yi;
    var Ni = function () {
    }, Oi = function () {
    };
    m(Oi, Ni);
    var Pi = function () {
    };
    m(Pi, Oi);

    function Qi(a) {
        return null != a && "object" === typeof a && !Array.isArray(a) && a.constructor === Object
    }

    function Ri(a) {
        var b = Ja(Di(a));
        if (b > a.length) return null;
        x(b === a.length);
        a = a[b - 1];
        x(Qi(a));
        return a
    }

    function Si(a, b, c) {
        x(0 < b);
        var d = Di(a);
        if (b < d) a[b - 1] = c; else {
            var e = Ri(a);
            e ? e[b] = c : (e = {}, a[d - 1] = (e[b] = c, e))
        }
    }

    function Ti(a, b) {
        x(0 < b);
        var c = Di(a);
        if (b < c) return x(!Qi(a[b - 1])), a[b - 1];
        var d;
        return null == (d = Ri(a)) ? void 0 : d[b]
    }

    function Ui(a, b, c) {
        a = Ti(a, b);
        return null == a ? c : a
    }

    var Vi = Object.freeze([]);
    var Wi = function () {
    };
    Wi.prototype[Symbol.iterator] = function () {
        return this.g()
    };
    var Xi = function (a, b) {
        this.s = a;
        this.m = b
    };
    m(Xi, Wi);
    Xi.prototype.g = function () {
        var a = this.s[Symbol.iterator](), b = this.m;
        return {
            next: function () {
                var c = a.next(), d = c.done;
                if (d) return c;
                c = b(c.value);
                return {done: d, value: c}
            }
        }
    };
    Xi.prototype.map = function (a) {
        return new Xi(this, a)
    };
    var Yi = function (a) {
        this.m = a
    };
    m(Yi, Wi);
    var $i = function (a) {
        a && a.length ? a = new Yi(Ma(a).slice()) : (Zi || (Zi = new Yi(Vi)), a = Zi);
        return a
    };
    Yi.prototype.g = function () {
        return this.m[Symbol.iterator]()
    };
    Yi.prototype.map = function (a) {
        return new Xi(this, a)
    };
    var Zi;

    function aj(a, b) {
        var c = Ti(a, b);
        return c instanceof Ni ? (c = Pa(c, Pi), Ma(c.g(a, b))) : $i(c)
    }

    function bj(a, b) {
        var c = Ti(a, b);
        c instanceof Oi && (c = Ti(a, b), Array.isArray(c) ? c = Ma(c) : c instanceof Oi ? c = Ma(c.g(a, b)) : (x(null == c), c = [], Si(a, b, c)));
        a = Ma(c);
        x(!1, "Index undefined out of bounds for array[" + (null == a ? void 0 : a.length) + "] fieldNumber " + b + ".");
        return null == a ? void 0 : a[void 0]
    };

    function O(a, b, c) {
        for (var d = a.h, e = 0; e < b.length; e++) {
            var f = b[e];
            if (null != Ti(d, f.i)) if (f.l) {
                var h = f.l(a);
                c[f.name] = f.C ? h.o() : h
            } else h = [].concat(ja(f.v(a))), c[f.name] = f.C ? h.map(function (g) {
                return g.o()
            }) : h
        }
    }

    function Q(a, b, c) {
        b = new Map(b.map(function (n) {
            return [n.name, n]
        }));
        c = new c;
        var d = c.h, e = {}, f;
        for (f in a) {
            if (x(a.hasOwnProperty(f))) {
                var h = x(b.get(f)), g = a[f];
                if (null != g) {
                    var l = void 0;
                    if (h.A) e.kb = h.A, l = function (n) {
                        return function (p) {
                            p = La(p);
                            return n.kb(p).h
                        }
                    }(e), h.l ? l = l(g) : (g = Ma(g).map(l), l = g.length ? g : null); else b:{
                        switch (typeof g) {
                            case "string":
                            case "number":
                            case "boolean":
                                l = g;
                                break b;
                            case "object":
                                if (Array.isArray(g)) {
                                    l = g.length ? g : null;
                                    break b
                                }
                        }
                        Ia("Unexpected value " + g);
                        l = void 0
                    }
                    null != l && Si(d, h.i, l)
                }
            }
            e =
                {kb: e.kb}
        }
        return c
    }

    function R(a, b, c) {
        for (var d = a.h, e = 0; e < b.length; e++) {
            var f = b[e];
            if (null != Ti(d, f.i)) if (f.l) {
                var h = f.l(a);
                c.push(f.j(f, h))
            } else {
                h = 0;
                for (var g = f.v(a)[Symbol.iterator](), l = g.next(); !l.done; l = g.next(), h++) c.push(f.j(f, l.value, h))
            }
        }
    }

    function S(a, b, c) {
        b instanceof Uint8Array ? b = '"' + [].concat(ja(b)).map(function (d) {
            return "\\x" + (16 > Ja(d) ? "0" : "") + d.toString(16)
        }).join("") + '"' : "string" === typeof b && null == a.Je && (b = '"' + b + '"');
        return a.name + ": " + b + (null == c ? "" : " #" + c)
    }

    function T(a, b, c) {
        b = b.G();
        var d = "", e = null == c ? "" : " #" + c;
        c = null == c ? "" : " " + c;
        b && (d = "\n  " + b.replace(/\n/g, "\n  "));
        return a.name + " {" + e + d + "\n} # " + a.name + c
    };

    function U(a, b, c) {
        return Ui(a, b, c || 0)
    }

    function cj(a, b) {
        a = aj(a, b);
        return a = a.map(Ja)
    };

    function V(a, b, c) {
        var d = dj(a, b, c);
        if (!d) {
            var e = [];
            d = new c(e);
            Si(a, b, e)
        }
        return d
    }

    function ej(a, b, c) {
        return (a = Ma(bj(a, b))) ? fj(a, c) : new c
    }

    function W(a, b, c) {
        return aj(a, b).map(function (d) {
            return fj(d, c)
        })
    }

    function dj(a, b, c) {
        if (a = Ti(a, b)) return fj(Ma(a), c)
    }

    function fj(a, b) {
        var c = Gi(a);
        return null == c ? new b(a) : c
    };

    function X(a, b) {
        return Ui(a, b, "")
    }

    function Y(a, b) {
        a = aj(a, b);
        return a = a.map(Ka)
    };Object.create(null);
    var Z = function (a, b) {
        a = a || [];
        if (Bi(a)) b && b > a.length && !Ri(a) && Ei(a, b), Hi(a, this); else {
            b = Math.max(b || 2147483647, a.length + 1);
            var c = a.length;
            c = c && a[c - 1];
            if (Qi(c)) {
                b = a.length;
                for (var d in c) {
                    var e = Number(d);
                    e < b && (a[e - 1] = c[d], delete c[e])
                }
            }
            Ci(a, b, this, void 0)
        }
        this.h = a
    };
    Z.prototype.clear = function () {
        this.h.length = 0;
        Fi(this.h, void 0)
    };
    var gj = function (a) {
        Z.call(this, a)
    };
    m(gj, Z);
    k = gj.prototype;
    k.vb = function () {
        return X(this.h, 1)
    };
    k.getTitle = function () {
        return X(this.h, 2)
    };
    k.setTitle = function (a) {
        Si(this.h, 2, a)
    };
    k.Ia = function () {
        return X(this.h, 3)
    };
    k.Ya = function () {
        return X(this.h, 4)
    };
    var hj = function () {
        return [{
            name: "alert_mid", i: 1, l: function (a) {
                return a.vb()
            }, j: S
        }, {
            name: "title", i: 2, l: function (a) {
                return a.getTitle()
            }, j: S
        }, {
            name: "description", i: 3, l: function (a) {
                return a.Ia()
            }, j: S
        }, {
            name: "link", i: 4, l: function (a) {
                return a.Ya()
            }, j: S
        }]
    }, ij = function (a) {
        return Q(a, hj(), gj)
    };
    gj.prototype.o = function () {
        var a = {};
        O(this, hj(), a);
        return a
    };
    gj.prototype.G = function () {
        var a = [];
        R(this, hj(), a);
        return a.join("\n")
    };
    gj.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var jj = function (a) {
        Z.call(this, a)
    };
    m(jj, Z);
    var kj = function (a) {
        return new jj(a)
    };
    jj.prototype.getType = function () {
        return U(this.h, 1)
    };
    var lj = function () {
        return [{
            name: "type", i: 1, l: function (a) {
                return a.getType()
            }, j: S
        }, {
            name: "display_text", i: 2, l: function (a) {
                return X(a.h, 2)
            }, j: S
        }, {
            name: "contact_text", i: 3, l: function (a) {
                return X(a.h, 3)
            }, j: S
        }]
    }, mj = function (a) {
        return Q(a, lj(), jj)
    };
    jj.prototype.o = function () {
        var a = {};
        O(this, lj(), a);
        return a
    };
    jj.prototype.G = function () {
        var a = [];
        R(this, lj(), a);
        return a.join("\n")
    };
    jj.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var nj = function (a) {
        Z.call(this, a)
    };
    m(nj, Z);
    var oj = function (a) {
        return new nj(a)
    };
    nj.prototype.getTitle = function () {
        return X(this.h, 3)
    };
    nj.prototype.setTitle = function (a) {
        Si(this.h, 3, a)
    };
    nj.prototype.Ia = function () {
        return X(this.h, 4)
    };
    var pj = function () {
        return [{
            name: "location", i: 1, l: function (a) {
                return X(a.h, 1)
            }, j: S
        }, {
            name: "language", i: 2, l: function (a) {
                return X(a.h, 2)
            }, j: S
        }, {
            name: "title", i: 3, l: function (a) {
                return a.getTitle()
            }, j: S
        }, {
            name: "description", i: 4, l: function (a) {
                return a.Ia()
            }, j: S
        }, {
            name: "contact_details", i: 5, C: kj, A: mj, v: function (a) {
                return W(a.h, 5, jj)
            }, j: T
        }]
    }, qj = function (a) {
        return Q(a, pj(), nj)
    };
    nj.prototype.o = function () {
        var a = {};
        O(this, pj(), a);
        return a
    };
    nj.prototype.G = function () {
        var a = [];
        R(this, pj(), a);
        return a.join("\n")
    };
    nj.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var rj = function (a) {
        Z.call(this, a)
    };
    m(rj, Z);
    rj.prototype.getTitle = function () {
        return X(this.h, 1)
    };
    rj.prototype.setTitle = function (a) {
        Si(this.h, 1, a)
    };
    rj.prototype.vb = function () {
        return X(this.h, 2)
    };
    var sj = function () {
        return [{
            name: "title", i: 1, l: function (a) {
                return a.getTitle()
            }, j: S
        }, {
            name: "alert_mid", i: 2, l: function (a) {
                return a.vb()
            }, j: S
        }, {
            name: "help_and_info", i: 3, C: oj, A: qj, v: function (a) {
                return W(a.h, 3, nj)
            }, j: T
        }]
    }, tj = function (a) {
        return Q(a, sj(), rj)
    };
    rj.prototype.o = function () {
        var a = {};
        O(this, sj(), a);
        return a
    };
    rj.prototype.G = function () {
        var a = [];
        R(this, sj(), a);
        return a.join("\n")
    };
    rj.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var uj = function (a) {
        Z.call(this, a)
    };
    m(uj, Z);
    var vj = function (a) {
        return new uj(a)
    };
    uj.prototype.xb = function () {
        return U(this.h, 1)
    };
    uj.prototype.Bb = function () {
        return cj(this.h, 2)
    };
    var wj = function () {
        return [{
            name: "backend", i: 1, l: function (a) {
                return a.xb()
            }, j: S
        }, {
            name: "features_applied", i: 2, v: function (a) {
                return a.Bb()
            }, j: S
        }]
    }, xj = function (a) {
        return Q(a, wj(), uj)
    };
    uj.prototype.o = function () {
        var a = {};
        O(this, wj(), a);
        return a
    };
    uj.prototype.G = function () {
        var a = [];
        R(this, wj(), a);
        return a.join("\n")
    };
    uj.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var yj = function (a) {
        Z.call(this, a)
    };
    m(yj, Z);
    var zj = function (a) {
        return new yj(a)
    };
    yj.prototype.Eb = function () {
        return U(this.h, 1)
    };
    var Aj = function () {
        return [{
            name: "label", i: 1, l: function (a) {
                return a.Eb()
            }, j: S
        }, {
            name: "oxford_label", i: 2, l: function (a) {
                return U(a.h, 2)
            }, j: S
        }]
    }, Bj = function (a) {
        return Q(a, Aj(), yj)
    };
    yj.prototype.o = function () {
        var a = {};
        O(this, Aj(), a);
        return a
    };
    yj.prototype.G = function () {
        var a = [];
        R(this, Aj(), a);
        return a.join("\n")
    };
    yj.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var Cj = function (a) {
        Z.call(this, a)
    };
    m(Cj, Z);
    var Dj = function (a) {
        return new Cj(a)
    };
    Cj.prototype.Jb = function () {
        return X(this.h, 1)
    };
    Cj.prototype.Fb = function () {
        return cj(this.h, 2)
    };
    Cj.prototype.Na = function () {
        return U(this.h, 3)
    };
    Cj.prototype.Ja = function () {
        return U(this.h, 4)
    };
    var Ej = function () {
        return [{
            name: "text", i: 1, l: function (a) {
                return a.Jb()
            }, j: S
        }, {
            name: "labels", i: 2, v: function (a) {
                return a.Fb()
            }, j: S
        }, {
            name: "start_pos", i: 3, l: function (a) {
                return a.Na()
            }, j: S
        }, {
            name: "end_pos", i: 4, l: function (a) {
                return a.Ja()
            }, j: S
        }, {
            name: "label_infos", i: 5, C: zj, A: Bj, v: function (a) {
                return W(a.h, 5, yj)
            }, j: T
        }]
    }, Fj = function (a) {
        return Q(a, Ej(), Cj)
    };
    Cj.prototype.o = function () {
        var a = {};
        O(this, Ej(), a);
        return a
    };
    Cj.prototype.G = function () {
        var a = [];
        R(this, Ej(), a);
        return a.join("\n")
    };
    Cj.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var Gj = function (a) {
        Z.call(this, a)
    };
    m(Gj, Z);
    var Hj = function (a) {
        return new Gj(a)
    };
    Gj.prototype.Hb = function () {
        return U(this.h, 2)
    };
    Gj.prototype.Cb = function () {
        return !!Ui(this.h, 3, !1)
    };
    Gj.prototype.wb = function () {
        return !!Ui(this.h, 4, !1)
    };
    Gj.prototype.ra = function () {
        return U(this.h, 8)
    };
    var Ij = function () {
        return [{
            name: "word_postproc", i: 1, l: function (a) {
                return X(a.h, 1)
            }, j: S
        }, {
            name: "score", i: 2, l: function (a) {
                return a.Hb()
            }, j: S
        }, {
            name: "has_preceding_space", i: 3, l: function (a) {
                return a.Cb()
            }, j: S
        }, {
            name: "attach_to_next_token", i: 4, l: function (a) {
                return a.wb()
            }, j: S
        }, {
            name: "backends", i: 5, v: function (a) {
                return cj(a.h, 5)
            }, j: S
        }, {
            name: "word_postproc_segments", i: 6, C: Dj, A: Fj, v: function (a) {
                return W(a.h, 6, Cj)
            }, j: T
        }, {
            name: "backend_infos", i: 7, C: vj, A: xj, v: function (a) {
                return W(a.h, 7, uj)
            }, j: T
        }, {
            name: "gender",
            i: 8, l: function (a) {
                return a.ra()
            }, j: S
        }]
    }, Jj = function (a) {
        return Q(a, Ij(), Gj)
    };
    Gj.prototype.o = function () {
        var a = {};
        O(this, Ij(), a);
        return a
    };
    Gj.prototype.G = function () {
        var a = [];
        R(this, Ij(), a);
        return a.join("\n")
    };
    Gj.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var Kj = function (a) {
        Z.call(this, a)
    };
    m(Kj, Z);
    var Lj = function (a) {
        return new Kj(a)
    };
    Kj.prototype.yb = function () {
        return U(this.h, 1)
    };
    Kj.prototype.Ab = function () {
        return U(this.h, 2)
    };
    var Mj = function () {
        return [{
            name: "begin", i: 1, l: function (a) {
                return a.yb()
            }, j: S
        }, {
            name: "end", i: 2, l: function (a) {
                return a.Ab()
            }, j: S
        }]
    }, Nj = function (a) {
        return Q(a, Mj(), Kj)
    };
    Kj.prototype.o = function () {
        var a = {};
        O(this, Mj(), a);
        return a
    };
    Kj.prototype.G = function () {
        var a = [];
        R(this, Mj(), a);
        return a.join("\n")
    };
    Kj.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var Oj = function (a) {
        Z.call(this, a)
    };
    m(Oj, Z);
    var Pj = function (a) {
        return new Oj(a)
    };
    Oj.prototype.Na = function () {
        return U(this.h, 6)
    };
    Oj.prototype.Ja = function () {
        return U(this.h, 7)
    };
    var Qj = function () {
        return [{
            name: "src_phrase", i: 1, l: function (a) {
                return X(a.h, 1)
            }, j: S
        }, {
            name: "alternative", i: 3, C: Hj, A: Jj, v: function (a) {
                return W(a.h, 3, Gj)
            }, j: T
        }, {
            name: "srcunicodeoffsets", i: 4, C: Lj, A: Nj, v: function (a) {
                return W(a.h, 4, Kj)
            }, j: T
        }, {
            name: "raw_src_segment", i: 5, l: function (a) {
                return X(a.h, 5)
            }, j: S
        }, {
            name: "start_pos", i: 6, l: function (a) {
                return a.Na()
            }, j: S
        }, {
            name: "end_pos", i: 7, l: function (a) {
                return a.Ja()
            }, j: S
        }, {
            name: "src_phrase_segments", i: 8, C: Dj, A: Fj, v: function (a) {
                return W(a.h, 8, Cj)
            }, j: T
        }]
    }, Rj = function (a) {
        return Q(a,
            Qj(), Oj)
    };
    Oj.prototype.o = function () {
        var a = {};
        O(this, Qj(), a);
        return a
    };
    Oj.prototype.G = function () {
        var a = [];
        R(this, Qj(), a);
        return a.join("\n")
    };
    Oj.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var Sj = function (a) {
        Z.call(this, a)
    };
    m(Sj, Z);
    var Tj = function (a) {
        return new Sj(a)
    };
    k = Sj.prototype;
    k.Za = function () {
        return X(this.h, 1)
    };
    k.Cb = function () {
        return !!Ui(this.h, 3, !1)
    };
    k.wb = function () {
        return !!Ui(this.h, 4, !1)
    };
    k.zb = function () {
        return U(this.h, 5)
    };
    k.Na = function () {
        return U(this.h, 6)
    };
    k.Ja = function () {
        return U(this.h, 7)
    };
    var Uj = function () {
            return [{
                name: "word", i: 1, l: function (a) {
                    return a.Za()
                }, j: S
            }, {
                name: "styles", i: 2, v: function (a) {
                    return cj(a.h, 2)
                }, j: S
            }, {
                name: "has_preceding_space", i: 3, l: function (a) {
                    return a.Cb()
                }, j: S
            }, {
                name: "attach_to_next_token", i: 4, l: function (a) {
                    return a.wb()
                }, j: S
            }, {
                name: "confidence", i: 5, l: function (a) {
                    return a.zb()
                }, j: S
            }, {
                name: "start_pos", i: 6, l: function (a) {
                    return a.Na()
                }, j: S
            }, {
                name: "end_pos", i: 7, l: function (a) {
                    return a.Ja()
                }, j: S
            }, {
                name: "not_from_first_segment", i: 8, l: function (a) {
                    return U(a.h, 8)
                }, j: S
            }]
        },
        Vj = function (a) {
            return Q(a, Uj(), Sj)
        };
    Sj.prototype.o = function () {
        var a = {};
        O(this, Uj(), a);
        return a
    };
    Sj.prototype.G = function () {
        var a = [];
        R(this, Uj(), a);
        return a.join("\n")
    };
    Sj.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var Wj = function (a) {
        Z.call(this, a)
    };
    m(Wj, Z);
    Wj.prototype.Fb = function () {
        return Y(this.h, 5)
    };
    var Xj = function () {
        return [{
            name: "register", i: 1, v: function (a) {
                return Y(a.h, 1)
            }, j: S
        }, {
            name: "geographic", i: 2, v: function (a) {
                return Y(a.h, 2)
            }, j: S
        }, {
            name: "subject", i: 3, v: function (a) {
                return Y(a.h, 3)
            }, j: S
        }, {
            name: "usage_label", i: 4, v: function (a) {
                return Y(a.h, 4)
            }, j: S
        }, {
            name: "labels", i: 5, v: function (a) {
                return a.Fb()
            }, j: S
        }]
    }, Yj = function (a) {
        return Q(a, Xj(), Wj)
    };
    Wj.prototype.o = function () {
        var a = {};
        O(this, Xj(), a);
        return a
    };
    Wj.prototype.G = function () {
        var a = [];
        R(this, Xj(), a);
        return a.join("\n")
    };
    Wj.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var Zj = function (a) {
        Z.call(this, a)
    };
    m(Zj, Z);
    var ak = function (a) {
        return new Zj(a)
    };
    Zj.prototype.Ha = function () {
        return X(this.h, 2)
    };
    Zj.prototype.Yb = function () {
        return X(this.h, 3)
    };
    Zj.prototype.La = function () {
        return V(this.h, 4, Wj)
    };
    var bk = function () {
        return [{
            name: "gloss", i: 1, l: function (a) {
                return X(a.h, 1)
            }, j: S
        }, {
            name: "definition_id", i: 2, l: function (a) {
                return a.Ha()
            }, j: S
        }, {
            name: "example", i: 3, l: function (a) {
                return a.Yb()
            }, j: S
        }, {
            name: "label_info", i: 4, C: Wj, A: Yj, l: function (a) {
                return a.La()
            }, j: T
        }]
    }, ck = function (a) {
        return Q(a, bk(), Zj)
    };
    Zj.prototype.o = function () {
        var a = {};
        O(this, bk(), a);
        return a
    };
    Zj.prototype.G = function () {
        var a = [];
        R(this, bk(), a);
        return a.join("\n")
    };
    Zj.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var dk = function (a) {
        Z.call(this, a)
    };
    m(dk, Z);
    var ek = function (a) {
        return new dk(a)
    };
    dk.prototype.Ma = function () {
        return X(this.h, 1)
    };
    dk.prototype.Ka = function () {
        return W(this.h, 2, Zj)
    };
    dk.prototype.Ga = function () {
        return X(this.h, 3)
    };
    dk.prototype.Gb = function () {
        return U(this.h, 4)
    };
    var fk = function () {
        return [{
            name: "pos", i: 1, l: function (a) {
                return a.Ma()
            }, j: S
        }, {
            name: "entry", i: 2, C: ak, A: ck, v: function (a) {
                return a.Ka()
            }, j: T
        }, {
            name: "base_form", i: 3, l: function (a) {
                return a.Ga()
            }, j: S
        }, {
            name: "pos_enum", i: 4, l: function (a) {
                return a.Gb()
            }, j: S
        }]
    }, gk = function (a) {
        return Q(a, fk(), dk)
    };
    dk.prototype.o = function () {
        var a = {};
        O(this, fk(), a);
        return a
    };
    dk.prototype.G = function () {
        var a = [];
        R(this, fk(), a);
        return a.join("\n")
    };
    dk.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var hk = function (a, b, c) {
        Z.call(this, c, a);
        this.containerId = b
    };
    m(hk, Z);
    var ik = function (a) {
        hk.call(this, 7, "76p9JA", a)
    };
    m(ik, hk);
    var jk = function (a) {
        return new ik(a)
    };
    ik.prototype.Za = function () {
        return X(this.h, 1)
    };
    ik.prototype.Hb = function () {
        return +Ui(this.h, 4, 0)
    };
    ik.prototype.ra = function () {
        return U(this.h, 6)
    };
    var kk = function () {
        return [{
            name: "word", i: 1, l: function (a) {
                return a.Za()
            }, j: S
        }, {
            name: "reverse_translation", i: 2, v: function (a) {
                return Y(a.h, 2)
            }, j: S
        }, {
            name: "synset_id", i: 3, v: function (a) {
                return cj(a.h, 3)
            }, j: S
        }, {
            name: "score", i: 4, l: function (a) {
                return a.Hb()
            }, j: S
        }, {
            name: "previous_word", i: 5, l: function (a) {
                return X(a.h, 5)
            }, j: S
        }, {
            name: "gender", i: 6, l: function (a) {
                return a.ra()
            }, j: S
        }]
    }, lk = function (a) {
        return Q(a, kk(), ik)
    };
    ik.prototype.o = function () {
        var a = {};
        O(this, kk(), a);
        return a
    };
    ik.prototype.G = function () {
        var a = [];
        R(this, kk(), a);
        return a.join("\n")
    };
    ik.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var mk = function (a) {
        Z.call(this, a)
    };
    m(mk, Z);
    var nk = function (a) {
        return new mk(a)
    };
    mk.prototype.Ma = function () {
        return X(this.h, 1)
    };
    mk.prototype.Ka = function () {
        return W(this.h, 3, ik)
    };
    mk.prototype.Ga = function () {
        return X(this.h, 4)
    };
    mk.prototype.Gb = function () {
        return U(this.h, 5)
    };
    var ok = function () {
        return [{
            name: "pos", i: 1, l: function (a) {
                return a.Ma()
            }, j: S
        }, {
            name: "terms", i: 2, v: function (a) {
                return Y(a.h, 2)
            }, j: S
        }, {
            name: "entry", i: 3, C: jk, A: lk, v: function (a) {
                return a.Ka()
            }, j: T
        }, {
            name: "base_form", i: 4, l: function (a) {
                return a.Ga()
            }, j: S
        }, {
            name: "pos_enum", i: 5, l: function (a) {
                return a.Gb()
            }, j: S
        }]
    }, pk = function (a) {
        return Q(a, ok(), mk)
    };
    mk.prototype.o = function () {
        var a = {};
        O(this, ok(), a);
        return a
    };
    mk.prototype.G = function () {
        var a = [];
        R(this, ok(), a);
        return a.join("\n")
    };
    mk.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var qk = function (a) {
        Z.call(this, a)
    };
    m(qk, Z);
    qk.prototype.Zb = function () {
        return X(this.h, 1)
    };
    var rk = function () {
        return [{
            name: "romanization", i: 1, l: function (a) {
                return a.Zb()
            }, j: S
        }]
    }, sk = function (a) {
        return Q(a, rk(), qk)
    };
    qk.prototype.o = function () {
        var a = {};
        O(this, rk(), a);
        return a
    };
    qk.prototype.G = function () {
        var a = [];
        R(this, rk(), a);
        return a.join("\n")
    };
    qk.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var tk = function (a) {
        Z.call(this, a)
    };
    m(tk, Z);
    var uk = function (a) {
        return new tk(a)
    }, vk = function () {
        return [{
            name: "source_span_index", i: 1, l: function (a) {
                return U(a.h, 1)
            }, j: S
        }, {
            name: "target_span_index", i: 2, l: function (a) {
                return U(a.h, 2)
            }, j: S
        }, {
            name: "direction", i: 3, l: function (a) {
                return U(a.h, 3)
            }, j: S
        }]
    }, wk = function (a) {
        return Q(a, vk(), tk)
    };
    tk.prototype.o = function () {
        var a = {};
        O(this, vk(), a);
        return a
    };
    tk.prototype.G = function () {
        var a = [];
        R(this, vk(), a);
        return a.join("\n")
    };
    tk.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var xk = function (a) {
        Z.call(this, a)
    };
    m(xk, Z);
    var yk = function (a) {
        return new xk(a)
    };
    xk.prototype.yb = function () {
        return U(this.h, 1)
    };
    xk.prototype.Ab = function () {
        return U(this.h, 2)
    };
    var zk = function () {
        return [{
            name: "begin", i: 1, l: function (a) {
                return a.yb()
            }, j: S
        }, {
            name: "end", i: 2, l: function (a) {
                return a.Ab()
            }, j: S
        }]
    }, Ak = function (a) {
        return Q(a, zk(), xk)
    };
    xk.prototype.o = function () {
        var a = {};
        O(this, zk(), a);
        return a
    };
    xk.prototype.G = function () {
        var a = [];
        R(this, zk(), a);
        return a.join("\n")
    };
    xk.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var Bk = function (a) {
        Z.call(this, a)
    };
    m(Bk, Z);
    Bk.prototype.Ya = function () {
        return ej(this.h, 3, tk)
    };
    var Ck = function () {
        return [{
            name: "source_span", i: 1, C: yk, A: Ak, v: function (a) {
                return W(a.h, 1, xk)
            }, j: T
        }, {
            name: "target_span", i: 2, C: yk, A: Ak, v: function (a) {
                return W(a.h, 2, xk)
            }, j: T
        }, {
            name: "link", i: 3, C: uk, A: wk, v: function (a) {
                return W(a.h, 3, tk)
            }, j: T
        }]
    }, Dk = function (a) {
        return Q(a, Ck(), Bk)
    };
    Bk.prototype.o = function () {
        var a = {};
        O(this, Ck(), a);
        return a
    };
    Bk.prototype.G = function () {
        var a = [];
        R(this, Ck(), a);
        return a.join("\n")
    };
    Bk.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var Ek = function (a) {
        Z.call(this, a)
    };
    m(Ek, Z);
    var Fk = function (a) {
        return new Ek(a)
    };
    Ek.prototype.Eb = function () {
        return X(this.h, 2)
    };
    var Gk = function () {
        return [{
            name: "model_path", i: 1, l: function (a) {
                return X(a.h, 1)
            }, j: S
        }, {
            name: "label", i: 2, l: function (a) {
                return a.Eb()
            }, j: S
        }, {
            name: "prefer_efficient_model", i: 8, l: function (a) {
                return !!Ui(a.h, 8, !1)
            }, j: S
        }, {
            name: "model_namespace", i: 9, l: function (a) {
                return X(a.h, 9)
            }, j: S
        }, {
            name: "vertex_ai_endpoint", i: 10, v: function (a) {
                return Y(a.h, 10)
            }, j: S
        }]
    }, Hk = function (a) {
        return Q(a, Gk(), Ek)
    };
    Ek.prototype.o = function () {
        var a = {};
        O(this, Gk(), a);
        return a
    };
    Ek.prototype.G = function () {
        var a = [];
        R(this, Gk(), a);
        return a.join("\n")
    };
    Ek.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var Ik = function (a) {
        Z.call(this, a)
    };
    m(Ik, Z);
    var Jk = function () {
        return [{
            name: "checkpoint_md5", i: 1, l: function (a) {
                return X(a.h, 1)
            }, j: S
        }, {
            name: "launch_doc", i: 2, l: function (a) {
                return X(a.h, 2)
            }, j: S
        }, {
            name: "launch_approvals", i: 3, v: function (a) {
                return Y(a.h, 3)
            }, j: S
        }]
    }, Kk = function (a) {
        return Q(a, Jk(), Ik)
    };
    Ik.prototype.o = function () {
        var a = {};
        O(this, Jk(), a);
        return a
    };
    Ik.prototype.G = function () {
        var a = [];
        R(this, Jk(), a);
        return a.join("\n")
    };
    Ik.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var Lk = function (a) {
        Z.call(this, a)
    };
    m(Lk, Z);
    var Mk = function (a) {
        return new Lk(a)
    };
    Lk.prototype.Bb = function () {
        return cj(this.h, 3)
    };
    var Nk = function () {
        return [{
            name: "model_tracking", i: 1, C: Ik, A: Kk, l: function (a) {
                return V(a.h, 1, Ik)
            }, j: T
        }, {
            name: "has_untranslatable_chunk", i: 2, l: function (a) {
                return !!Ui(a.h, 2, !1)
            }, j: S
        }, {
            name: "features_applied", i: 3, v: function (a) {
                return a.Bb()
            }, j: S
        }]
    }, Ok = function (a) {
        return Q(a, Nk(), Lk)
    };
    Lk.prototype.o = function () {
        var a = {};
        O(this, Nk(), a);
        return a
    };
    Lk.prototype.G = function () {
        var a = [];
        R(this, Nk(), a);
        return a.join("\n")
    };
    Lk.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var Pk = function (a) {
        Z.call(this, a)
    };
    m(Pk, Z);
    var Qk = function (a) {
        return new Pk(a)
    };
    Pk.prototype.xb = function () {
        return U(this.h, 5)
    };
    var Rk = function () {
        return [{
            name: "trans", i: 1, l: function (a) {
                return X(a.h, 1)
            }, j: S
        }, {
            name: "orig", i: 2, l: function (a) {
                return X(a.h, 2)
            }, j: S
        }, {
            name: "translit", i: 3, l: function (a) {
                return X(a.h, 3)
            }, j: S
        }, {
            name: "src_translit", i: 4, l: function (a) {
                return X(a.h, 4)
            }, j: S
        }, {
            name: "backend", i: 5, l: function (a) {
                return a.xb()
            }, j: S
        }, {
            name: "model", i: 6, v: function (a) {
                return Y(a.h, 6)
            }, j: S
        }, {
            name: "word_alignment", i: 7, C: Bk, A: Dk, l: function (a) {
                return V(a.h, 7, Bk)
            }, j: T
        }, {
            name: "model_specification", i: 8, C: Fk, A: Hk, v: function (a) {
                return W(a.h,
                    8, Ek)
            }, j: T
        }, {
            name: "translation_engine_debug_info", i: 9, C: Mk, A: Ok, v: function (a) {
                return W(a.h, 9, Lk)
            }, j: T
        }]
    }, Sk = function (a) {
        return Q(a, Rk(), Pk)
    };
    Pk.prototype.o = function () {
        var a = {};
        O(this, Rk(), a);
        return a
    };
    Pk.prototype.G = function () {
        var a = [];
        R(this, Rk(), a);
        return a.join("\n")
    };
    Pk.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var Tk = function (a) {
        Z.call(this, a)
    };
    m(Tk, Z);
    var Uk = function (a) {
        return new Tk(a)
    };
    Tk.prototype.ra = function () {
        return U(this.h, 1)
    };
    Tk.prototype.Kb = function () {
        return X(this.h, 2)
    };
    Tk.prototype.Ib = function () {
        return W(this.h, 3, Pk)
    };
    Tk.prototype.Zb = function () {
        return dj(this.h, 4, qk) || new qk
    };
    var Vk = function () {
        return [{
            name: "gender", i: 1, l: function (a) {
                return a.ra()
            }, j: S
        }, {
            name: "translation", i: 2, l: function (a) {
                return a.Kb()
            }, j: S
        }, {
            name: "sentences", i: 3, C: Qk, A: Sk, v: function (a) {
                return a.Ib()
            }, j: T
        }, {
            name: "romanization", i: 4, C: qk, A: sk, l: function (a) {
                return V(a.h, 4, qk)
            }, j: T
        }]
    }, Wk = function (a) {
        return Q(a, Vk(), Tk)
    };
    Tk.prototype.o = function () {
        var a = {};
        O(this, Vk(), a);
        return a
    };
    Tk.prototype.G = function () {
        var a = [];
        R(this, Vk(), a);
        return a.join("\n")
    };
    Tk.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var Xk = function (a) {
        Z.call(this, a)
    };
    m(Xk, Z);
    Xk.prototype.sa = function () {
        return U(this.h, 2)
    };
    var Yk = function () {
        return [{
            name: "gendered_translations", i: 1, C: Uk, A: Wk, v: function (a) {
                return W(a.h, 1, Tk)
            }, j: T
        }, {
            name: "status", i: 2, l: function (a) {
                return a.sa()
            }, j: S
        }]
    }, Zk = function (a) {
        return Q(a, Yk(), Xk)
    };
    Xk.prototype.o = function () {
        var a = {};
        O(this, Yk(), a);
        return a
    };
    Xk.prototype.G = function () {
        var a = [];
        R(this, Yk(), a);
        return a.join("\n")
    };
    Xk.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var $k = function (a) {
        Z.call(this, a)
    };
    m($k, Z);
    $k.prototype.ra = function () {
        return U(this.h, 5)
    };
    var al = function () {
        return [{
            name: "animacy", i: 1, l: function (a) {
                return U(a.h, 1, 1)
            }, j: S
        }, {
            name: "inflection_aspect", i: 2, l: function (a) {
                return U(a.h, 2, 1)
            }, j: S
        }, {
            name: "grammatical_case", i: 3, l: function (a) {
                return U(a.h, 3)
            }, j: S
        }, {
            name: "degree", i: 4, l: function (a) {
                return U(a.h, 4, 1)
            }, j: S
        }, {
            name: "gender", i: 5, l: function (a) {
                return a.ra()
            }, j: S
        }, {
            name: "mood", i: 6, l: function (a) {
                return U(a.h, 6, 1)
            }, j: S
        }, {
            name: "nonfinite_form", i: 7, l: function (a) {
                return U(a.h, 7, 1)
            }, j: S
        }, {
            name: "number", i: 8, l: function (a) {
                return U(a.h, 8, 1)
            }, j: S
        },
            {
                name: "person", i: 9, l: function (a) {
                    return U(a.h, 9)
                }, j: S
            }, {
                name: "polarity", i: 10, l: function (a) {
                    return U(a.h, 10, 1)
                }, j: S
            }, {
                name: "referent", i: 11, l: function (a) {
                    return U(a.h, 11, 1)
                }, j: S
            }, {
                name: "strength", i: 12, l: function (a) {
                    return U(a.h, 12, 1)
                }, j: S
            }, {
                name: "tense", i: 13, l: function (a) {
                    return U(a.h, 13, 1)
                }, j: S
            }, {
                name: "imperfect_suffix", i: 14, l: function (a) {
                    return U(a.h, 14, 1)
                }, j: S
            }, {
                name: "voice", i: 15, l: function (a) {
                    return U(a.h, 15, 1)
                }, j: S
            }, {
                name: "infinitive_number", i: 16, l: function (a) {
                    return U(a.h, 16, 1)
                }, j: S
            }, {
                name: "precedes",
                i: 17, l: function (a) {
                    return U(a.h, 17, 1)
                }, j: S
            }]
    }, bl = function (a) {
        return Q(a, al(), $k)
    };
    $k.prototype.o = function () {
        var a = {};
        O(this, al(), a);
        return a
    };
    $k.prototype.G = function () {
        var a = [];
        R(this, al(), a);
        return a.join("\n")
    };
    $k.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var cl = function (a) {
        Z.call(this, a)
    };
    m(cl, Z);
    var dl = function (a) {
        return new cl(a)
    }, el = function () {
        return [{
            name: "written_form", i: 1, l: function (a) {
                return X(a.h, 1)
            }, j: S
        }, {
            name: "features", i: 2, C: $k, A: bl, l: function (a) {
                return V(a.h, 2, $k)
            }, j: T
        }]
    }, fl = function (a) {
        return Q(a, el(), cl)
    };
    cl.prototype.o = function () {
        var a = {};
        O(this, el(), a);
        return a
    };
    cl.prototype.G = function () {
        var a = [];
        R(this, el(), a);
        return a.join("\n")
    };
    cl.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var gl = function (a) {
        Z.call(this, a)
    };
    m(gl, Z);
    var hl = function (a) {
        return new gl(a)
    };
    gl.prototype.getTitle = function () {
        return X(this.h, 1)
    };
    gl.prototype.setTitle = function (a) {
        Si(this.h, 1, a)
    };
    gl.prototype.Ia = function () {
        return X(this.h, 2)
    };
    var il = function () {
        return [{
            name: "title", i: 1, l: function (a) {
                return a.getTitle()
            }, j: S
        }, {
            name: "description", i: 2, l: function (a) {
                return a.Ia()
            }, j: S
        }, {
            name: "image_url", i: 3, l: function (a) {
                return X(a.h, 3)
            }, j: S
        }, {
            name: "image_ref_url", i: 4, l: function (a) {
                return X(a.h, 4)
            }, j: S
        }]
    }, jl = function (a) {
        return Q(a, il(), gl)
    };
    gl.prototype.o = function () {
        var a = {};
        O(this, il(), a);
        return a
    };
    gl.prototype.G = function () {
        var a = [];
        R(this, il(), a);
        return a.join("\n")
    };
    gl.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var kl = function (a) {
        Z.call(this, a)
    };
    m(kl, Z);
    var ll = function () {
            return [{
                name: "srclangs", i: 1, v: function (a) {
                    return Y(a.h, 1)
                }, j: S
            }, {
                name: "detected_target", i: 2, l: function (a) {
                    return X(a.h, 2)
                }, j: S
            }, {
                name: "srclangs_confidences", i: 3, v: function (a) {
                    a = Ti(a.h, 3);
                    a instanceof Ni && Ia("Unexpected kind of lazy reader for a JS API storage field.");
                    if (a && !(Ai(a) & 1)) {
                        for (var b = a.length, c = 0; c < b; c++) {
                            var d = c, e = a[c];
                            x("number" === typeof e || "string" === typeof e);
                            a[d] = +e
                        }
                        zi(a, 1)
                    }
                    return $i(a || Vi)
                }, j: S
            }, {
                name: "extended_srclangs", i: 4, v: function (a) {
                    return Y(a.h, 4)
                }, j: S
            }]
        },
        ml = function (a) {
            return Q(a, ll(), kl)
        };
    kl.prototype.o = function () {
        var a = {};
        O(this, ll(), a);
        return a
    };
    kl.prototype.G = function () {
        var a = [];
        R(this, ll(), a);
        return a.join("\n")
    };
    kl.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var nl = function (a) {
        Z.call(this, a)
    };
    m(nl, Z);
    nl.prototype.Za = function () {
        var a = bj(this.h, 1);
        return Ka(a)
    };
    var ol = function () {
        return [{
            name: "word", i: 1, v: function (a) {
                return Y(a.h, 1)
            }, j: S
        }]
    }, pl = function (a) {
        return Q(a, ol(), nl)
    };
    nl.prototype.o = function () {
        var a = {};
        O(this, ol(), a);
        return a
    };
    nl.prototype.G = function () {
        var a = [];
        R(this, ol(), a);
        return a.join("\n")
    };
    nl.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var ql = function (a) {
        Z.call(this, a)
    };
    m(ql, Z);
    var rl = function () {
        return [{
            name: "spell_html_res", i: 1, l: function (a) {
                return X(a.h, 1)
            }, j: S
        }, {
            name: "spell_res", i: 2, l: function (a) {
                return X(a.h, 2)
            }, j: S
        }, {
            name: "correction_type", i: 3, v: function (a) {
                return cj(a.h, 3)
            }, j: S
        }, {
            name: "correction_translation", i: 4, l: function (a) {
                return X(a.h, 4)
            }, j: S
        }, {
            name: "related", i: 5, l: function (a) {
                return !!Ui(a.h, 5, !1)
            }, j: S
        }, {
            name: "confident", i: 6, l: function (a) {
                return !!Ui(a.h, 6, !1)
            }, j: S
        }]
    }, sl = function (a) {
        return Q(a, rl(), ql)
    };
    ql.prototype.o = function () {
        var a = {};
        O(this, rl(), a);
        return a
    };
    ql.prototype.G = function () {
        var a = [];
        R(this, rl(), a);
        return a.join("\n")
    };
    ql.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var tl = function (a) {
        Z.call(this, a)
    };
    m(tl, Z);
    var ul = function (a) {
        return new tl(a)
    };
    tl.prototype.Ha = function () {
        return X(this.h, 2)
    };
    tl.prototype.La = function () {
        return V(this.h, 3, Wj)
    };
    var vl = function () {
        return [{
            name: "synonym", i: 1, v: function (a) {
                return Y(a.h, 1)
            }, j: S
        }, {
            name: "definition_id", i: 2, l: function (a) {
                return a.Ha()
            }, j: S
        }, {
            name: "label_info", i: 3, C: Wj, A: Yj, l: function (a) {
                return a.La()
            }, j: T
        }]
    }, wl = function (a) {
        return Q(a, vl(), tl)
    };
    tl.prototype.o = function () {
        var a = {};
        O(this, vl(), a);
        return a
    };
    tl.prototype.G = function () {
        var a = [];
        R(this, vl(), a);
        return a.join("\n")
    };
    tl.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var xl = function (a) {
        Z.call(this, a)
    };
    m(xl, Z);
    var yl = function (a) {
        return new xl(a)
    };
    xl.prototype.Ma = function () {
        return X(this.h, 1)
    };
    xl.prototype.Ka = function () {
        return W(this.h, 2, tl)
    };
    xl.prototype.Ga = function () {
        return X(this.h, 3)
    };
    var zl = function () {
        return [{
            name: "pos", i: 1, l: function (a) {
                return a.Ma()
            }, j: S
        }, {
            name: "entry", i: 2, C: ul, A: wl, v: function (a) {
                return a.Ka()
            }, j: T
        }, {
            name: "base_form", i: 3, l: function (a) {
                return a.Ga()
            }, j: S
        }]
    }, Al = function (a) {
        return Q(a, zl(), xl)
    };
    xl.prototype.o = function () {
        var a = {};
        O(this, zl(), a);
        return a
    };
    xl.prototype.G = function () {
        var a = [];
        R(this, zl(), a);
        return a.join("\n")
    };
    xl.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var Bl = function (a) {
        Z.call(this, a)
    };
    m(Bl, Z);
    var Cl = function (a) {
        return new Bl(a)
    };
    k = Bl.prototype;
    k.Jb = function () {
        return X(this.h, 1)
    };
    k.Ya = function () {
        return X(this.h, 3)
    };
    k.Kb = function () {
        return X(this.h, 4)
    };
    k.Ha = function () {
        return X(this.h, 6)
    };
    k.La = function () {
        return V(this.h, 7, Wj)
    };
    var Dl = function () {
        return [{
            name: "text", i: 1, l: function (a) {
                return a.Jb()
            }, j: S
        }, {
            name: "source", i: 2, l: function (a) {
                return X(a.h, 2)
            }, j: S
        }, {
            name: "link", i: 3, l: function (a) {
                return a.Ya()
            }, j: S
        }, {
            name: "translation", i: 4, l: function (a) {
                return a.Kb()
            }, j: S
        }, {
            name: "source_type", i: 5, l: function (a) {
                return U(a.h, 5, 1)
            }, j: S
        }, {
            name: "definition_id", i: 6, l: function (a) {
                return a.Ha()
            }, j: S
        }, {
            name: "label_info", i: 7, C: Wj, A: Yj, l: function (a) {
                return a.La()
            }, j: T
        }]
    }, El = function (a) {
        return Q(a, Dl(), Bl)
    };
    Bl.prototype.o = function () {
        var a = {};
        O(this, Dl(), a);
        return a
    };
    Bl.prototype.G = function () {
        var a = [];
        R(this, Dl(), a);
        return a.join("\n")
    };
    Bl.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var Fl = function (a) {
        Z.call(this, a)
    };
    m(Fl, Z);
    Fl.prototype.Yb = function () {
        return ej(this.h, 1, Bl)
    };
    var Gl = function () {
        return [{
            name: "example", i: 1, C: Cl, A: El, v: function (a) {
                return W(a.h, 1, Bl)
            }, j: T
        }]
    }, Hl = function (a) {
        return Q(a, Gl(), Fl)
    };
    Fl.prototype.o = function () {
        var a = {};
        O(this, Gl(), a);
        return a
    };
    Fl.prototype.G = function () {
        var a = [];
        R(this, Gl(), a);
        return a.join("\n")
    };
    Fl.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var Il = function (a) {
        Z.call(this, a)
    };
    m(Il, Z);
    Il.prototype.Ib = function () {
        return W(this.h, 1, Pk)
    };
    Il.prototype.zb = function () {
        return +Ui(this.h, 7, 0)
    };
    var Jl = function () {
        return [{
            name: "sentences", i: 1, C: Qk, A: Sk, v: function (a) {
                return a.Ib()
            }, j: T
        }, {
            name: "dict", i: 2, C: nk, A: pk, v: function (a) {
                return W(a.h, 2, mk)
            }, j: T
        }, {
            name: "src", i: 3, l: function (a) {
                return X(a.h, 3)
            }, j: S
        }, {
            name: "err", i: 4, l: function (a) {
                return X(a.h, 4)
            }, j: S
        }, {
            name: "styled_words", i: 5, C: Tj, A: Vj, v: function (a) {
                return W(a.h, 5, Sj)
            }, j: T
        }, {
            name: "alternative_translations", i: 6, C: Pj, A: Rj, v: function (a) {
                return W(a.h, 6, Oj)
            }, j: T
        }, {
            name: "confidence", i: 7, l: function (a) {
                return a.zb()
            }, j: S
        }, {
            name: "spell", i: 8, C: ql,
            A: sl, l: function (a) {
                return V(a.h, 8, ql)
            }, j: T
        }, {
            name: "ld_result", i: 9, C: kl, A: ml, l: function (a) {
                return V(a.h, 9, kl)
            }, j: T
        }, {
            name: "server_time", i: 10, l: function (a) {
                return U(a.h, 10)
            }, j: S
        }, {
            name: "autocorrection", i: 11, l: function (a) {
                return !!Ui(a.h, 11, !1)
            }, j: S
        }, {
            name: "synsets", i: 12, C: yl, A: Al, v: function (a) {
                return W(a.h, 12, xl)
            }, j: T
        }, {
            name: "definitions", i: 13, C: ek, A: gk, v: function (a) {
                return W(a.h, 13, dk)
            }, j: T
        }, {
            name: "examples", i: 14, C: Fl, A: Hl, l: function (a) {
                return V(a.h, 14, Fl)
            }, j: T
        }, {
            name: "related_words", i: 15, C: nl, A: pl,
            l: function (a) {
                return V(a.h, 15, nl)
            }, j: T
        }, {
            name: "knowledge_results", i: 16, C: hl, A: jl, v: function (a) {
                return W(a.h, 16, gl)
            }, j: T
        }, {
            name: "query_inflections", i: 17, C: dl, A: fl, v: function (a) {
                return W(a.h, 17, cl)
            }, j: T
        }, {
            name: "target_inflections", i: 18, C: dl, A: fl, v: function (a) {
                return W(a.h, 18, cl)
            }, j: T
        }, {
            name: "gendered_translation_result", i: 19, C: Xk, A: Zk, l: function (a) {
                return V(a.h, 19, Xk)
            }, j: T
        }, {
            name: "sos_alert", i: 20, C: rj, A: tj, l: function (a) {
                return V(a.h, 20, rj)
            }, j: T
        }, {
            name: "covid_19_alert", i: 21, C: gj, A: ij, l: function (a) {
                return V(a.h,
                    21, gj)
            }, j: T
        }]
    };
    Il.prototype.o = function () {
        var a = {};
        O(this, Jl(), a);
        return a
    };
    Il.prototype.G = function () {
        var a = [];
        R(this, Jl(), a);
        return a.join("\n")
    };
    Il.prototype.toString = function () {
        return JSON.stringify(this.o())
    };
    var Kl = function () {
        this.g = 0
    }, Ll = function (a) {
        a = a.oa("q").join("");
        return Ta(a)
    }, Ml = function (a, b, c, d) {
        var e = "https://translate.googleapis.com/translate_a/single";
        b = b.toString();
        b += Ll(c);
        c = c.toString();
        var f = "POST";
        e += "?" + b;
        2E3 > e.length + c.length && (f = "GET", e += "&" + c, c = "");
        ++a.g;
        fi(e, function (h) {
            --a.g;
            d(h)
        }, f, c)
    };
    Kl.prototype.m = function (a, b, c) {
        c = c.target;
        if (!oi(c) || "[" != pi(c)[0] && "{" != pi(c)[0]) {
            a = Th.T();
            var d = String(c.F), e = pi(c);
            a.log("invalidResponse", {q: d.substring(0, 500), ql: d.length, r: e.substring(0, 500), rl: e.length});
            b && b(c.sa())
        } else {
            b = pi(c);
            c = {"class": "trans.common.TranslationAPI", func: "handleSingleResult_", url: String(c.F)};
            try {
                d = JSON.parse(b)
            } catch (f) {
                throw a = Th.T(), c.js = b, c.error = f.message, a.log("jsonParseErr", c), f;
            }
            Array.isArray(d) && (d = new Il(d));
            a(d)
        }
    };
    var Nl = ha(["margin-left: 0px;"]), Ol = ha(["color: #A2A2A2; float: right; padding-top: 16px;"]), Ph = new Oh,
        Pl = function () {
        }, Ql = function (a, b, c, d) {
            if ("" != a) {
                window.selection = a;
                a = new Kl;
                var e = chrome.i18n.getUILanguage ? chrome.i18n.getUILanguage() : "en";
                d = d ? d : "auto";
                var f = Qh();
                c = new hc("source=" + c);
                var h = window.selection, g = new hc, l = new hc;
                g.set("client", "gtx");
                g.set("sl", d);
                g.set("tl", f);
                g.set("hl", e);
                e = ["t", "bd", "rm"];
                g.remove("dt");
                0 < e.length && (g.s = null, g.g.set("dt", Za(e)), g.m = Ja(g.m) + e.length);
                g.set("dj", "1");
                c && g.nc(c);
                l.set("q", h);
                Ml(a, g, l, t(a.m, a, b, void 0))
            }
        };
    Pl.prototype.g = function (a, b, c, d) {
        if (null != d) {
            for (var e = d.src, f = Qh(), h = [], g = [], l = d.sentences, n = 0; n < l.length; n++)
                h.push(l[n].orig), g.push(l[n].trans);
            h = h.join("");
            g = g.join("");
            translitText = d.sentences[d.sentences.length - 1];
            translitText = translitText.src_translit? translitText.src_translit: undefined; // pinyin text
            if (translitText && h.length > 30) {
                translitText = undefined;
            }
            l = Sh("tl")[f].toUpperCase();
            n = Sh("sl");
            var p = [], r;
            for (r in n) p.push([r, n[r]]);
            qe(c, {query: b, kc: g, ic: l, fc: e, hc: p, Xb: d.dict, popup: a});
            d = Wd("gtx-lang-selector", c);
            $f(d, "change", t(this.m, this, a, b, c), !1, this);
            b = new Ih;
            gtxSourceAudio = b;
            d = Wd("gtx-source-audio", c);
            gtxSourceAudioElement = d;
            Vg(b, d);
            Lh(b, h, e);
            b = new Ih;
            d = Wd("gtx-target-audio", c);
            Vg(b, d);
            Lh(b, g, f);
            e = "https://translate.google.com/?source=gtx_m#" +
                e + "/" + f + "/" + encodeURIComponent(window.selection);
            a ? (a = E("more"), ug(a, Tc(e)), c = new Ch("", void 0, 4), e = E("new-translation"), Ug(c, e), hf(E("new-translation"), !0), c = E("translate-page"), ie(a, Gh("MSG_OPEN_IN_TRANSLATE")), c.className = "gtx-a", e = Pc(Nl), c.style.cssText = zb(e), hf(a, !0)) : (a = de(document, "a"), a.id = "off", a.className = "gtx-a", a.setAttribute("target", "_blank"), ie(a, Gh("MSG_FOOTER_OPTIONS").toUpperCase()), ug(a, Tc(chrome.runtime.getURL("options.html"))), ee(c, a), a = de(document, "a"), a.id = "more", a.setAttribute("class",
                "gtx-a"), a.setAttribute("target", "_blank"), ie(a, Gh("MSG_MORE")), ug(a, Tc(e)), e = Pc(Ol), a.style.cssText = zb(e), ee(c, a))
        } else ie(E("translation"), Gh("MSG_TRANSLATION_ERROR"))
    };
    Pl.prototype.m = function (a, b, c, d) {
        Ql(b, t(this.g, this, a, b, c), "ls", d.target.value)
    };
    Pl.T = function () {
        return Dg(Pl)
    };
    var Rl = function () {
    };
    w(Rl, Xg);
    ua(Rl);
    Rl.prototype.xa = function (a) {
        var b = a.u.ma("SPAN", $g(this, a).join(" "));
        Sl(this, b, a.F);
        return b
    };
    Rl.prototype.ba = function (a, b) {
        b = Rl.I.ba.call(this, a, b);
        x(b);
        var c = Le(b), d = !1;
        Xa(c, Tl(this, null)) ? d = null : Xa(c, Tl(this, !0)) ? d = !0 : Xa(c, Tl(this, !1)) && (d = !1);
        a.F = d;
        x(b, "The element cannot be null.");
        Cf(b, "checked", null == d ? "mixed" : 1 == d ? "true" : "false");
        return b
    };
    Rl.prototype.Ta = function () {
        return "checkbox"
    };
    var Sl = function (a, b, c) {
        if (b) {
            x(b);
            var d = Tl(a, c);
            x(d);
            x(b);
            Ne(b, d) || ($a(Ul, function (e) {
                e = Tl(this, e);
                x(b);
                e == d ? Oe(b, e) : Qe(b, e)
            }, a), Cf(b, "checked", null == c ? "mixed" : 1 == c ? "true" : "false"))
        }
    };
    Rl.prototype.L = function () {
        return "goog-checkbox"
    };
    var Tl = function (a, b) {
        a = a.L();
        if (1 == b) return a + "-checked";
        if (0 == b) return a + "-unchecked";
        if (null == b) return a + "-undetermined";
        throw Error("Invalid checkbox state: " + b);
    };
    var Vl = function (a, b, c) {
        c = c || Rl.T();
        J.call(this, null, c, b);
        this.F = void 0 !== a ? a : !1
    };
    w(Vl, J);
    var Ul = {mc: !0, ze: !1, Ae: null};
    k = Vl.prototype;
    k.Aa = function () {
        return 1 == this.F
    };
    k.Ob = function (a) {
        a != this.F && (this.F = a, Sl(this.g, this.D(), this.F))
    };
    k.ha = function () {
        Vl.I.ha.call(this);
        this.bb && Tg(this).listen(this.D(), "click", this.bc);
        Sg(this)
    };
    k.bc = function (a) {
        a.B();
        var b = this.F ? "uncheck" : "check";
        this.isEnabled() && !a.target.href && I(this, b) && (a.s(), this.Ob(this.F ? !1 : !0), I(this, "change"))
    };
    k.ab = function (a) {
        32 == a.keyCode && (this.Sa(a), this.bc(a));
        return !1
    };
    ih("goog-checkbox", function () {
        return new Vl
    });
    var Wl = Pl.T(), Xl = chrome.extension.getBackgroundPage();
    document.addEventListener("DOMContentLoaded", function () {
        chrome.tabs.executeScript({code: "disposeWindowBubble();"});
        Yl();
        Zl();
        var a = E("new-translation");
        $f(a, "click", $l);
        ie(E("options-link"), Gh("MSG_FOOTER_OPTIONS"));
        ie(E("translate-link"), Gh("MSG_FOOTER_TRANSLATE"));
        am();
        chrome.runtime.connect()
    });
    var Yl = function () {
        var a = E("search-bar"), b = Hh(), c = E("text-input");
        Ug(b, a);
        $f(b, "action", bm);
        $f(c, "keypress", function (d) {
            13 == d.keyCode && bm()
        });
        cm()
    }, Zl = function () {
        var a = E("translate-page");
        ie(a, Gh("MSG_TRANSLATE_PAGE"));
        var b;
        chrome.tabs.query({active: !0, currentWindow: !0}, function (c) {
            b = c[0]
        });
        $f(a, "click", function () {
            Xl.translate.getTranslateManager().attach(b.id);
            window.close()
        })
    }, am = function () {
        chrome.tabs.executeScript({code: "window.getSelection().toString();", allFrames: !0}, function (a) {
            for (var b = 0; b <
            a.length; b++) if ("" != a[b]) {
                dm(a[b], "popup");
                break
            }
        })
    }, $l = function () {
        cm();
        hf(E("more"), !1);
        E("text-input").focus()
    }, cm = function () {
        E("text-input").value = "";
        hf(E("search-bar"), !0);
        hf(E("new-translation"), !1);
        hf(E("more"), !1);
        qe(E("translation"))
    }, bm = function () {
        var a = E("text-input").value;
        dm(a, "input")
    }, dm = function (a, b) {
        if ("" != a.trim()) {
            hf(E("search-bar"), !1);
            var c = E("translation");
            Ql(a, t(Wl.g, Wl, !0, a, c), b)
        }
    };

    document.addEventListener("keyup", e => {
        const focusedElementTag = document.activeElement?.tagName;
        if (focusedElementTag === 'INPUT' || focusedElementTag === 'FORM') return;
        if (e.code === "KeyS") {
            if (gtxSourceAudio) {
                e.stopImmediatePropagation();
                gtxSourceAudio.qc();
                let oldOpacity = gtxSourceAudioElement.style.opacity;
                gtxSourceAudioElement.style.opacity = '0.5';
                setTimeout(() => {
                    gtxSourceAudioElement.style.opacity = oldOpacity;
                }, 100);
            }
        } else if (e.code === "KeyQ" || e.code === "Escape") {
            window.close();
        }
    })
})();
