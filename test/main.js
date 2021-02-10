"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.default = void 0;

var _core = require("../build/index"),
    _minimist = _interopRequireDefault(require("minimist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var a = new WeakMap(); return _getRequireWildcardCache = function() { return a; }, a; }

function _interopRequireWildcard(a) {
    if (a && a.__esModule) return a;
    if (a === null || typeof a !== "object" && typeof a !== "function") return { default: a };
    var b = _getRequireWildcardCache();
    if (b && b.has(a)) return b.get(a);
    var c = {},
        d = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var e in a)
        if (Object.prototype.hasOwnProperty.call(a, e)) {
            var f = d ? Object.getOwnPropertyDescriptor(a, e) : null;
            f && (f.get || f.set) ? Object.defineProperty(c, e, f) : c[e] = a[e];
        }
    return c.default = a, b && b.set(a, c), c;
}

function asyncGeneratorStep(a, b, c, d, e, f, g) {
    try {
        var h = a[f](g),
            i = h.value;
    } catch (a) { return void c(a); }
    h.done ? b(i) : Promise.resolve(i).then(d, e);
}

function _asyncToGenerator(a) {
    return function() {
        var b = this,
            c = arguments;
        return new Promise(function(d, e) {
            function f(a) { asyncGeneratorStep(h, d, e, f, g, "next", a); }

            function g(a) { asyncGeneratorStep(h, d, e, f, g, "throw", a); }
            var h = a.apply(b, c);
            f(undefined);
        });
    };
}

/**
 * Converting Javascript to Python
 * @module main
 */
var _default = /*#__PURE__*/ _asyncToGenerator(function*() {
    const a = yield Promise.resolve().then(() => _interopRequireWildcard(require("acorn"))),
        b = yield Promise.resolve().then(() => _interopRequireWildcard(require("fs"))),
        d = yield Promise.resolve().then(() => _interopRequireWildcard(require("path"))),
        e = (0, _minimist.default)(process.argv.slice(2), {
            alias: {
                m: "mode",
                t: "test",
                v: "version",
                o: "out",
                n: "not",
                op: "optimisation"
            }
        }),
        f = a === null || a === void 0 ? void 0 : a.parse((0, _core.read)(d.resolve(d.resolve(process.argv[2]))), {
            ecmaVersion: "latest",
            allowAwaitOutsideFunction: !0,
            allowImportExportEverywhere: !0,
            allowReserved: !0
        });
    if (e.v && (yield _asyncToGenerator(function*() {
            const a = yield Promise.resolve().then(() => _interopRequireWildcard(require("./../package.json")));
            console.log(a.version);
        })()), !e._[0]) return 0; //出力先の変数

    let g = "jstc_build"; //outオプションの確認

    if (e.o && (typeof e.o === "string" ? g = e.o : console.log("引数が不足しています")), (0, _core.check)(d.resolve(g)) || b.mkdir(d.resolve(g), a => {
            if (a) throw a;
        }), !e.not) {
        let a;
        typeof e.m === "string" ? (a = e.m, a == "py" || a == "python" ? yield _asyncToGenerator(function*() {
            const {
                python: a
            } = yield Promise.resolve().then(() => _interopRequireWildcard(require("../build/index")));
            let h = a(f, "python", {
                optimisation: e.op
            });
            b.writeFileSync("".concat(d.resolve(g), "/index.py"), h.code, "utf8"), console.log(h.code);
        })() : a == "rb" || a == "ruby" ? yield _asyncToGenerator(function*() {
            const {
                ruby: a
            } = yield Promise.resolve().then(() => _interopRequireWildcard(require("../build/index")));
            let h = a(f, "ruby", {
                optimisation: e.op
            });
            b.writeFileSync("".concat(d.resolve(g), "/index.rb"), h.code, "utf8"), console.log(h.code);
        })() : yield _asyncToGenerator(function*() {
            const {
                python: a
            } = yield Promise.resolve().then(() => _interopRequireWildcard(require("../build/index")));
            let h = a(f, "python", {
                optimisation: e.op
            });
            b.writeFileSync("".concat(d.resolve(g), "/index.py"), h.code, "utf8"), console.log(h.code);
        })()) : console.log("引数が不足しています");
    } else yield _asyncToGenerator(function*() {
        const {
            python: a
        } = yield Promise.resolve().then(() => _interopRequireWildcard(require("../build/index")));
        let e = a(f, "python");
        b.writeFileSync("".concat(d.resolve(g), "/index.py"), e.code, "utf8"), console.log(e.code);
    })(); //解析結果出力オプションの確認


    return e.t && b.writeFileSync(d.resolve("".concat(d.resolve(g), "/build.json")), f ? JSON.stringify(f) : "{}", 'utf8'), 0;
});

exports.default = _default;