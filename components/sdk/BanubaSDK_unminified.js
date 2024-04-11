/* eslint-disable */
export class MediaStream {
  constructor(e) {
    this._stream = e;
  }
  async *[Symbol.asyncIterator]() {
    const t = new e(this._stream);
    for (; this._stream.active; ) yield await t.getImageData();
  }
  stop() {
    for (const e of this._stream.getVideoTracks()) e.stop();
  }
}
class e {
  constructor(e) {
    this.stream = e;
  }
  async getImageData() {
    const e = this._video ?? (this._video = await t(this.stream)),
      n = this._ctx ?? (this._ctx = r(e.videoWidth, e.videoHeight));
    return (
      n.drawImage(e, 0, 0), n.getImageData(0, 0, e.videoWidth, e.videoHeight)
    );
  }
}
const t = async (e) =>
    new Promise((t) => {
      const r = document.createElement("video");
      (r.muted = !0), (r.srcObject = e);
      const n = setInterval(() => r.readyState, 300);
      r.addEventListener("play", (e) => clearInterval(n), { once: !0 }),
        r.addEventListener("play", (e) => t(r), { once: !0 }),
        r.addEventListener("loadedmetadata", (e) => r.play(), { once: !0 });
    }),
  r = (e, t) => {
    let r;
    return (
      "undefined" == typeof OffscreenCanvas
        ? ((r = document.createElement("canvas")),
          (r.width = e),
          (r.height = t))
        : (r = new OffscreenCanvas(e, t)),
      r.getContext("2d", { alpha: !1 })
    );
  };
class n {
  constructor(e) {
    this._src = "string" == typeof e ? e : URL.createObjectURL(e);
  }
  async *[Symbol.asyncIterator]() {
    const e = document.createElement("img");
    await new Promise((t, r) => {
      (e.onload = t), (e.onerror = r), (e.src = this._src);
    });
    const t = document.createElement("canvas");
    (t.width = e.width),
      (t.height = e.height),
      t.getContext("2d", { alpha: !1 }).drawImage(e, 0, 0);
    const r = new MediaStream(t.captureStream());
    yield* r;
  }
}
export { n as Image };
const a = { loop: !1 };
export class Video {
  constructor(e, t) {
    (this._options = { ...a, ...t }),
      (this._src = "string" == typeof e ? e : URL.createObjectURL(e));
  }
  async *[Symbol.asyncIterator]() {
    const e = document.createElement("video"),
      t = new MediaStream(e.captureStream());
    await new Promise((t, r) => {
      (e.muted = !0),
        (e.loop = this._options.loop),
        (e.onplay = t),
        (e.onerror = r),
        (e.onloadedmetadata = e.play),
        (e.src = this._src);
    }),
      yield* t;
  }
}
let i;
const o = screen.height > screen.width,
  u = {
    facingMode: "user",
    width: o ? void 0 : { min: 640, ideal: 1280, max: 1920 },
    height: o ? void 0 : { min: 480, ideal: 720, max: 1080 },
    resizeMode: { ideal: "crop-and-scale" }
  };
i = Symbol.asyncIterator;
export class Webcam {
  constructor(e) {
    var t, r, n;
    (n = null),
      (r = "_stream") in (t = this)
        ? Object.defineProperty(t, r, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
          })
        : (t[r] = n),
      (this._constraints = { ...u, ...e });
  }
  async start() {
    return this._stream ?? (this._stream = await s(this._constraints)), this;
  }
  async *[i]() {
    const e = this._stream ?? (this._stream = await s(this._constraints));
    yield* e;
  }
  stop() {
    this._stream && (this._stream.stop(), (this._stream = null));
  }
}
const s = async (e) => {
    if (void 0 === navigator.mediaDevices)
      throw new Error(
        "SecureContext is required to access webcam\nIt's likely you need to set up HTTPS/TLS for your website\nSee https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Encryption_based_security for details "
      );
    return new MediaStream(
      await navigator.mediaDevices.getUserMedia({ video: e })
    );
  },
  c = new WeakMap();
export const Dom = {
  render: (e, t) => {
    const r = "string" == typeof t ? document.querySelector(t) : t;
    if (!(r instanceof HTMLElement))
      throw new Error("Target container is not a DOM element");
    c.set(r, e), r.appendChild(e._sdk.canvas), e.play();
  },
  unmount: (e) => {
    const t = "string" == typeof e ? document.querySelector(e) : e;
    if (!(t instanceof HTMLElement))
      throw new Error("Target container is not a DOM element");
    const r = c.get(t);
    r && t.removeChild(r._sdk.canvas), c.delete(t);
  }
};
export class ImageCapture {
  constructor(e) {
    this._player = e;
  }
  async takePhoto(e) {
    this._player.isPlaying &&
      (await new Promise((e) =>
        this._player.addEventListener("framerendered", e, { once: !0 })
      ));
    const t = l(this._player._sdk.canvas, e?.width, e?.height);
    return await new Promise((r, n) =>
      t.toBlob(
        (e) =>
          e ? r(e) : n(new Error("Unexpected error: Unable to create Blob")),
        e?.type ?? "image/jpeg",
        e?.quality
      )
    );
  }
}
const l = (e, t = e.width, r = e.height) => {
    if (t !== e.width && r !== e.height) {
      const n = f(t, r);
      return n.getContext("2d").drawImage(e, 0, 0, n.width, n.height), n;
    }
    return e;
  },
  f = (e, t) => {
    let r;
    return (
      "undefined" == typeof OffscreenCanvas
        ? ((r = document.createElement("canvas")),
          (r.width = e),
          (r.height = t))
        : ((r = new OffscreenCanvas(e, t)),
          (r.toBlob = function (e, t, r) {
            this.convertToBlob({ type: t, quality: r })
              .then(e)
              .catch((t) => e(null));
          })),
      r
    );
  };
export class MediaStreamCapture extends globalThis.MediaStream {
  constructor(e) {
    super(e._sdk.canvas.captureStream());
  }
  getVideoTrack(e = 0) {
    return this.getVideoTracks()[e];
  }
  getAudioTrack(e = 0) {
    return this.getAudioTracks()[e];
  }
}
export class VideoRecorder extends MediaRecorder {
  constructor(e) {
    super(e._sdk.canvas.captureStream(), {
      mimeType: [
        "video/mp4",
        "video/webm;codecs=h264",
        "video/webm;codecs=avc1",
        "video/webm"
      ].find(MediaRecorder.isTypeSupported)
    });
  }
  async stop() {
    return new Promise((e, t) => {
      const r = (t) => {
          super.removeEventListener("dataavailable", r),
            super.removeEventListener("error", n),
            e(t.data);
        },
        n = (e) => {
          super.removeEventListener("dataavailable", r),
            super.removeEventListener("error", n),
            t(e.error);
        };
      super.addEventListener("dataavailable", r),
        super.addEventListener("error", n),
        super.stop();
    });
  }
}
var d,
  m,
  p = {},
  v = {};
(p = v),
  (v.parse = function (e, t) {
    for (
      var r = v.bin.readUshort,
        n = v.bin.readUint,
        a = 0,
        i = {},
        o = new Uint8Array(e),
        u = o.length - 4;
      101010256 != n(o, u);

    )
      u--;
    a = u;
    a += 4;
    var s = r(o, (a += 4)),
      c = (r(o, (a += 2)), n(o, (a += 2))),
      l = n(o, (a += 4));
    (a += 4), (a = l);
    for (var f = 0; f < s; f++) {
      n(o, a);
      (a += 4), (a += 4), (a += 4);
      n(o, (a += 4)), (c = n(o, (a += 4)));
      var d = n(o, (a += 4)),
        m = r(o, (a += 4)),
        p = r(o, a + 2),
        h = r(o, a + 4);
      a += 6;
      var g = n(o, (a += 8));
      (a += 4), (a += m + p + h), v._readLocal(o, g, i, c, d, t);
    }
    return i;
  }),
  (v._readLocal = function (e, t, r, n, a, i) {
    var o = v.bin.readUshort,
      u = v.bin.readUint,
      s = (u(e, t), o(e, (t += 4)), o(e, (t += 2)), o(e, (t += 2)));
    u(e, (t += 2)), u(e, (t += 4));
    t += 4;
    var c = o(e, (t += 8)),
      l = o(e, (t += 2));
    t += 2;
    var f = v.bin.readUTF8(e, t, c);
    if (((t += c), (t += l), i)) r[f] = { size: a, csize: n };
    else {
      var d = new Uint8Array(e.buffer, t);
      if (0 == s) r[f] = new Uint8Array(d.buffer.slice(t, t + n));
      else {
        if (8 != s) throw "unknown compression method: " + s;
        var m = new Uint8Array(a);
        v.inflateRaw(d, m), (r[f] = m);
      }
    }
  }),
  (v.inflateRaw = function (e, t) {
    return v.F.inflate(e, t);
  }),
  (v.inflate = function (e, t) {
    e[0], e[1];
    return v.inflateRaw(
      new Uint8Array(e.buffer, e.byteOffset + 2, e.length - 6),
      t
    );
  }),
  (v.deflate = function (e, t) {
    null == t && (t = { level: 6 });
    var r = 0,
      n = new Uint8Array(50 + Math.floor(1.1 * e.length));
    (n[r] = 120),
      (n[r + 1] = 156),
      (r += 2),
      (r = v.F.deflateRaw(e, n, r, t.level));
    var a = v.adler(e, 0, e.length);
    return (
      (n[r + 0] = (a >>> 24) & 255),
      (n[r + 1] = (a >>> 16) & 255),
      (n[r + 2] = (a >>> 8) & 255),
      (n[r + 3] = (a >>> 0) & 255),
      new Uint8Array(n.buffer, 0, r + 4)
    );
  }),
  (v.deflateRaw = function (e, t) {
    null == t && (t = { level: 6 });
    var r = new Uint8Array(50 + Math.floor(1.1 * e.length)),
      n = v.F.deflateRaw(e, r, n, t.level);
    return new Uint8Array(r.buffer, 0, n);
  }),
  (v.encode = function (e, t) {
    null == t && (t = !1);
    var r = 0,
      n = v.bin.writeUint,
      a = v.bin.writeUshort,
      i = {};
    for (var o in e) {
      var u = !v._noNeed(o) && !t,
        s = e[o],
        c = v.crc.crc(s, 0, s.length);
      i[o] = { cpr: u, usize: s.length, crc: c, file: u ? v.deflateRaw(s) : s };
    }
    for (var o in i) r += i[o].file.length + 30 + 46 + 2 * v.bin.sizeUTF8(o);
    r += 22;
    var l = new Uint8Array(r),
      f = 0,
      d = [];
    for (var o in i) {
      var m = i[o];
      d.push(f), (f = v._writeHeader(l, f, o, m, 0));
    }
    var p = 0,
      h = f;
    for (var o in i) {
      m = i[o];
      d.push(f), (f = v._writeHeader(l, f, o, m, 1, d[p++]));
    }
    var g = f - h;
    return (
      n(l, f, 101010256),
      (f += 4),
      a(l, (f += 4), p),
      a(l, (f += 2), p),
      n(l, (f += 2), g),
      n(l, (f += 4), h),
      (f += 4),
      (f += 2),
      l.buffer
    );
  }),
  (v._noNeed = function (e) {
    var t = e.split(".").pop().toLowerCase();
    return -1 != "png,jpg,jpeg,zip".indexOf(t);
  }),
  (v._writeHeader = function (e, t, r, n, a, i) {
    var o = v.bin.writeUint,
      u = v.bin.writeUshort,
      s = n.file;
    return (
      o(e, t, 0 == a ? 67324752 : 33639248),
      (t += 4),
      1 == a && (t += 2),
      u(e, t, 20),
      u(e, (t += 2), 0),
      u(e, (t += 2), n.cpr ? 8 : 0),
      o(e, (t += 2), 0),
      o(e, (t += 4), n.crc),
      o(e, (t += 4), s.length),
      o(e, (t += 4), n.usize),
      u(e, (t += 4), v.bin.sizeUTF8(r)),
      u(e, (t += 2), 0),
      (t += 2),
      1 == a && ((t += 2), (t += 2), o(e, (t += 6), i), (t += 4)),
      (t += v.bin.writeUTF8(e, t, r)),
      0 == a && (e.set(s, t), (t += s.length)),
      t
    );
  }),
  (v.crc = {
    table: (function () {
      for (var e = new Uint32Array(256), t = 0; t < 256; t++) {
        for (var r = t, n = 0; n < 8; n++)
          1 & r ? (r = 3988292384 ^ (r >>> 1)) : (r >>>= 1);
        e[t] = r;
      }
      return e;
    })(),
    update: function (e, t, r, n) {
      for (var a = 0; a < n; a++)
        e = v.crc.table[255 & (e ^ t[r + a])] ^ (e >>> 8);
      return e;
    },
    crc: function (e, t, r) {
      return 4294967295 ^ v.crc.update(4294967295, e, t, r);
    }
  }),
  (v.adler = function (e, t, r) {
    for (var n = 1, a = 0, i = t, o = t + r; i < o; ) {
      for (var u = Math.min(i + 5552, o); i < u; ) a += n += e[i++];
      (n %= 65521), (a %= 65521);
    }
    return (a << 16) | n;
  }),
  (v.bin = {
    readUshort: function (e, t) {
      return e[t] | (e[t + 1] << 8);
    },
    writeUshort: function (e, t, r) {
      (e[t] = 255 & r), (e[t + 1] = (r >> 8) & 255);
    },
    readUint: function (e, t) {
      return 16777216 * e[t + 3] + ((e[t + 2] << 16) | (e[t + 1] << 8) | e[t]);
    },
    writeUint: function (e, t, r) {
      (e[t] = 255 & r),
        (e[t + 1] = (r >> 8) & 255),
        (e[t + 2] = (r >> 16) & 255),
        (e[t + 3] = (r >> 24) & 255);
    },
    readASCII: function (e, t, r) {
      for (var n = "", a = 0; a < r; a++) n += String.fromCharCode(e[t + a]);
      return n;
    },
    writeASCII: function (e, t, r) {
      for (var n = 0; n < r.length; n++) e[t + n] = r.charCodeAt(n);
    },
    pad: function (e) {
      return e.length < 2 ? "0" + e : e;
    },
    readUTF8: function (e, t, r) {
      for (var n, a = "", i = 0; i < r; i++)
        a += "%" + v.bin.pad(e[t + i].toString(16));
      try {
        n = decodeURIComponent(a);
      } catch (n) {
        return v.bin.readASCII(e, t, r);
      }
      return n;
    },
    writeUTF8: function (e, t, r) {
      for (var n = r.length, a = 0, i = 0; i < n; i++) {
        var o = r.charCodeAt(i);
        if (0 == (4294967168 & o)) (e[t + a] = o), a++;
        else if (0 == (4294965248 & o))
          (e[t + a] = 192 | (o >> 6)),
            (e[t + a + 1] = 128 | ((o >> 0) & 63)),
            (a += 2);
        else if (0 == (4294901760 & o))
          (e[t + a] = 224 | (o >> 12)),
            (e[t + a + 1] = 128 | ((o >> 6) & 63)),
            (e[t + a + 2] = 128 | ((o >> 0) & 63)),
            (a += 3);
        else {
          if (0 != (4292870144 & o)) throw "e";
          (e[t + a] = 240 | (o >> 18)),
            (e[t + a + 1] = 128 | ((o >> 12) & 63)),
            (e[t + a + 2] = 128 | ((o >> 6) & 63)),
            (e[t + a + 3] = 128 | ((o >> 0) & 63)),
            (a += 4);
        }
      }
      return a;
    },
    sizeUTF8: function (e) {
      for (var t = e.length, r = 0, n = 0; n < t; n++) {
        var a = e.charCodeAt(n);
        if (0 == (4294967168 & a)) r++;
        else if (0 == (4294965248 & a)) r += 2;
        else if (0 == (4294901760 & a)) r += 3;
        else {
          if (0 != (4292870144 & a)) throw "e";
          r += 4;
        }
      }
      return r;
    }
  }),
  (v.F = {}),
  (v.F.deflateRaw = function (e, t, r, n) {
    var a = [
        [0, 0, 0, 0, 0],
        [4, 4, 8, 4, 0],
        [4, 5, 16, 8, 0],
        [4, 6, 16, 16, 0],
        [4, 10, 16, 32, 0],
        [8, 16, 32, 32, 0],
        [8, 16, 128, 128, 0],
        [8, 32, 128, 256, 0],
        [32, 128, 258, 1024, 1],
        [32, 258, 258, 4096, 1]
      ][n],
      i = v.F.U,
      o = v.F._goodIndex,
      u = (v.F._hash, v.F._putsE),
      s = 0,
      c = r << 3,
      l = 0,
      f = e.length;
    if (0 == n) {
      for (; s < f; ) {
        u(t, c, s + (k = Math.min(65535, f - s)) == f ? 1 : 0),
          (c = v.F._copyExact(e, s, k, t, c + 8)),
          (s += k);
      }
      return c >>> 3;
    }
    var d = i.lits,
      m = i.strt,
      p = i.prev,
      h = 0,
      g = 0,
      y = 0,
      _ = 0,
      w = 0,
      b = 0;
    f > 2 && (m[(b = v.F._hash(e, 0))] = 0);
    for (s = 0; s < f; s++) {
      if (((w = b), s + 1 < f - 2)) {
        b = v.F._hash(e, s + 1);
        var C = (s + 1) & 32767;
        (p[C] = m[b]), (m[b] = C);
      }
      if (l <= s) {
        (h > 14e3 || g > 26697) &&
          f - s > 100 &&
          (l < s && ((d[h] = s - l), (h += 2), (l = s)),
          (c = v.F._writeBlock(
            s == f - 1 || l == f ? 1 : 0,
            d,
            h,
            _,
            e,
            y,
            s - y,
            t,
            c
          )),
          (h = g = _ = 0),
          (y = s));
        var E = 0;
        s < f - 2 &&
          (E = v.F._bestMatch(e, s, p, w, Math.min(a[2], f - s), a[3]));
        var k = E >>> 16,
          x = 65535 & E;
        if (0 != E) {
          x = 65535 & E;
          var F = o((k = E >>> 16), i.of0);
          i.lhst[257 + F]++;
          var S = o(x, i.df0);
          i.dhst[S]++,
            (_ += i.exb[F] + i.dxb[S]),
            (d[h] = (k << 23) | (s - l)),
            (d[h + 1] = (x << 16) | (F << 8) | S),
            (h += 2),
            (l = s + k);
        } else i.lhst[e[s]]++;
        g++;
      }
    }
    for (
      (y == s && 0 != e.length) ||
      (l < s && ((d[h] = s - l), (h += 2), (l = s)),
      (c = v.F._writeBlock(1, d, h, _, e, y, s - y, t, c)),
      (h = 0),
      (g = 0),
      (h = g = _ = 0),
      (y = s));
      0 != (7 & c);

    )
      c++;
    return c >>> 3;
  }),
  (v.F._bestMatch = function (e, t, r, n, a, i) {
    var o = 32767 & t,
      u = r[o],
      s = (o - u + 32768) & 32767;
    if (u == o || n != v.F._hash(e, t - s)) return 0;
    for (
      var c = 0, l = 0, f = Math.min(32767, t);
      s <= f && 0 != --i && u != o;

    ) {
      if (0 == c || e[t + c] == e[t + c - s]) {
        var d = v.F._howLong(e, t, s);
        if (d > c) {
          if (((l = s), (c = d) >= a)) break;
          s + 2 < d && (d = s + 2);
          for (var m = 0, p = 0; p < d - 2; p++) {
            var h = (t - s + p + 32768) & 32767,
              g = (h - r[h] + 32768) & 32767;
            g > m && ((m = g), (u = h));
          }
        }
      }
      s += ((o = u) - (u = r[o]) + 32768) & 32767;
    }
    return (c << 16) | l;
  }),
  (v.F._howLong = function (e, t, r) {
    if (
      e[t] != e[t - r] ||
      e[t + 1] != e[t + 1 - r] ||
      e[t + 2] != e[t + 2 - r]
    )
      return 0;
    var n = t,
      a = Math.min(e.length, t + 258);
    for (t += 3; t < a && e[t] == e[t - r]; ) t++;
    return t - n;
  }),
  (v.F._hash = function (e, t) {
    return (((e[t] << 8) | e[t + 1]) + (e[t + 2] << 4)) & 65535;
  }),
  (v.saved = 0),
  (v.F._writeBlock = function (e, t, r, n, a, i, o, u, s) {
    var c,
      l,
      f,
      d,
      m,
      p,
      h,
      g,
      y,
      _ = v.F.U,
      w = v.F._putsF,
      b = v.F._putsE;
    _.lhst[256]++,
      (l = (c = v.F.getTrees())[0]),
      (f = c[1]),
      (d = c[2]),
      (m = c[3]),
      (p = c[4]),
      (h = c[5]),
      (g = c[6]),
      (y = c[7]);
    var C = 32 + (0 == ((s + 3) & 7) ? 0 : 8 - ((s + 3) & 7)) + (o << 3),
      E = n + v.F.contSize(_.fltree, _.lhst) + v.F.contSize(_.fdtree, _.dhst),
      k = n + v.F.contSize(_.ltree, _.lhst) + v.F.contSize(_.dtree, _.dhst);
    k +=
      14 +
      3 * h +
      v.F.contSize(_.itree, _.ihst) +
      (2 * _.ihst[16] + 3 * _.ihst[17] + 7 * _.ihst[18]);
    for (var x = 0; x < 286; x++) _.lhst[x] = 0;
    for (x = 0; x < 30; x++) _.dhst[x] = 0;
    for (x = 0; x < 19; x++) _.ihst[x] = 0;
    var F = C < E && C < k ? 0 : E < k ? 1 : 2;
    w(u, s, e), w(u, s + 1, F);
    s += 3;
    if (0 == F) {
      for (; 0 != (7 & s); ) s++;
      s = v.F._copyExact(a, i, o, u, s);
    } else {
      var S, D;
      if ((1 == F && ((S = _.fltree), (D = _.fdtree)), 2 == F)) {
        v.F.makeCodes(_.ltree, l),
          v.F.revCodes(_.ltree, l),
          v.F.makeCodes(_.dtree, f),
          v.F.revCodes(_.dtree, f),
          v.F.makeCodes(_.itree, d),
          v.F.revCodes(_.itree, d),
          (S = _.ltree),
          (D = _.dtree),
          b(u, s, m - 257),
          b(u, (s += 5), p - 1),
          b(u, (s += 5), h - 4),
          (s += 4);
        for (var P = 0; P < h; P++)
          b(u, s + 3 * P, _.itree[1 + (_.ordr[P] << 1)]);
        (s += 3 * h),
          (s = v.F._codeTiny(g, _.itree, u, s)),
          (s = v.F._codeTiny(y, _.itree, u, s));
      }
      for (var T = i, M = 0; M < r; M += 2) {
        for (var A = t[M], L = A >>> 23, I = T + (8388607 & A); T < I; )
          s = v.F._writeLit(a[T++], S, u, s);
        if (0 != L) {
          var B = t[M + 1],
            R = B >> 16,
            O = (B >> 8) & 255,
            N = 255 & B;
          b(u, (s = v.F._writeLit(257 + O, S, u, s)), L - _.of0[O]),
            (s += _.exb[O]),
            w(u, (s = v.F._writeLit(N, D, u, s)), R - _.df0[N]),
            (s += _.dxb[N]),
            (T += L);
        }
      }
      s = v.F._writeLit(256, S, u, s);
    }
    return s;
  }),
  (v.F._copyExact = function (e, t, r, n, a) {
    var i = a >>> 3;
    return (
      (n[i] = r),
      (n[i + 1] = r >>> 8),
      (n[i + 2] = 255 - n[i]),
      (n[i + 3] = 255 - n[i + 1]),
      (i += 4),
      n.set(new Uint8Array(e.buffer, t, r), i),
      a + ((r + 4) << 3)
    );
  }),
  (v.F.getTrees = function () {
    for (
      var e = v.F.U,
        t = v.F._hufTree(e.lhst, e.ltree, 15),
        r = v.F._hufTree(e.dhst, e.dtree, 15),
        n = [],
        a = v.F._lenCodes(e.ltree, n),
        i = [],
        o = v.F._lenCodes(e.dtree, i),
        u = 0;
      u < n.length;
      u += 2
    )
      e.ihst[n[u]]++;
    for (u = 0; u < i.length; u += 2) e.ihst[i[u]]++;
    for (
      var s = v.F._hufTree(e.ihst, e.itree, 7), c = 19;
      c > 4 && 0 == e.itree[1 + (e.ordr[c - 1] << 1)];

    )
      c--;
    return [t, r, s, a, o, c, n, i];
  }),
  (v.F.getSecond = function (e) {
    for (var t = [], r = 0; r < e.length; r += 2) t.push(e[r + 1]);
    return t;
  }),
  (v.F.nonZero = function (e) {
    for (var t = "", r = 0; r < e.length; r += 2)
      0 != e[r + 1] && (t += (r >> 1) + ",");
    return t;
  }),
  (v.F.contSize = function (e, t) {
    for (var r = 0, n = 0; n < t.length; n++) r += t[n] * e[1 + (n << 1)];
    return r;
  }),
  (v.F._codeTiny = function (e, t, r, n) {
    for (var a = 0; a < e.length; a += 2) {
      var i = e[a],
        o = e[a + 1];
      n = v.F._writeLit(i, t, r, n);
      var u = 16 == i ? 2 : 17 == i ? 3 : 7;
      i > 15 && (v.F._putsE(r, n, o, u), (n += u));
    }
    return n;
  }),
  (v.F._lenCodes = function (e, t) {
    for (var r = e.length; 2 != r && 0 == e[r - 1]; ) r -= 2;
    for (var n = 0; n < r; n += 2) {
      var a = e[n + 1],
        i = n + 3 < r ? e[n + 3] : -1,
        o = n + 5 < r ? e[n + 5] : -1,
        u = 0 == n ? -1 : e[n - 1];
      if (0 == a && i == a && o == a) {
        for (var s = n + 5; s + 2 < r && e[s + 2] == a; ) s += 2;
        (c = Math.min((s + 1 - n) >>> 1, 138)) < 11
          ? t.push(17, c - 3)
          : t.push(18, c - 11),
          (n += 2 * c - 2);
      } else if (a == u && i == a && o == a) {
        for (s = n + 5; s + 2 < r && e[s + 2] == a; ) s += 2;
        var c = Math.min((s + 1 - n) >>> 1, 6);
        t.push(16, c - 3), (n += 2 * c - 2);
      } else t.push(a, 0);
    }
    return r >>> 1;
  }),
  (v.F._hufTree = function (e, t, r) {
    var n = [],
      a = e.length,
      i = t.length,
      o = 0;
    for (o = 0; o < i; o += 2) (t[o] = 0), (t[o + 1] = 0);
    for (o = 0; o < a; o++) 0 != e[o] && n.push({ lit: o, f: e[o] });
    var u = n.length,
      s = n.slice(0);
    if (0 == u) return 0;
    if (1 == u) {
      var c = n[0].lit;
      s = 0 == c ? 1 : 0;
      return (t[1 + (c << 1)] = 1), (t[1 + (s << 1)] = 1), 1;
    }
    n.sort(function (e, t) {
      return e.f - t.f;
    });
    var l = n[0],
      f = n[1],
      d = 0,
      m = 1,
      p = 2;
    for (n[0] = { lit: -1, f: l.f + f.f, l: l, r: f, d: 0 }; m != u - 1; )
      (l = d != m && (p == u || n[d].f < n[p].f) ? n[d++] : n[p++]),
        (f = d != m && (p == u || n[d].f < n[p].f) ? n[d++] : n[p++]),
        (n[m++] = { lit: -1, f: l.f + f.f, l: l, r: f });
    var h = v.F.setDepth(n[m - 1], 0);
    for (h > r && (v.F.restrictDepth(s, r, h), (h = r)), o = 0; o < u; o++)
      t[1 + (s[o].lit << 1)] = s[o].d;
    return h;
  }),
  (v.F.setDepth = function (e, t) {
    return -1 != e.lit
      ? ((e.d = t), t)
      : Math.max(v.F.setDepth(e.l, t + 1), v.F.setDepth(e.r, t + 1));
  }),
  (v.F.restrictDepth = function (e, t, r) {
    var n = 0,
      a = 1 << (r - t),
      i = 0;
    for (
      e.sort(function (e, t) {
        return t.d == e.d ? e.f - t.f : t.d - e.d;
      }),
        n = 0;
      n < e.length && e[n].d > t;
      n++
    ) {
      var o = e[n].d;
      (e[n].d = t), (i += a - (1 << (r - o)));
    }
    for (i >>>= r - t; i > 0; ) {
      (o = e[n].d) < t ? (e[n].d++, (i -= 1 << (t - o - 1))) : n++;
    }
    for (; n >= 0; n--) e[n].d == t && i < 0 && (e[n].d--, i++);
    0 != i && console.log("debt left");
  }),
  (v.F._goodIndex = function (e, t) {
    var r = 0;
    return (
      t[16 | r] <= e && (r |= 16),
      t[8 | r] <= e && (r |= 8),
      t[4 | r] <= e && (r |= 4),
      t[2 | r] <= e && (r |= 2),
      t[1 | r] <= e && (r |= 1),
      r
    );
  }),
  (v.F._writeLit = function (e, t, r, n) {
    return v.F._putsF(r, n, t[e << 1]), n + t[1 + (e << 1)];
  }),
  (v.F.inflate = function (e, t) {
    var r = Uint8Array;
    if (3 == e[0] && 0 == e[1]) return t || new r(0);
    var n = v.F,
      a = n._bitsF,
      i = n._bitsE,
      o = n._decodeTiny,
      u = n.makeCodes,
      s = n.codes2map,
      c = n._get17,
      l = n.U,
      f = null == t;
    f && (t = new r((e.length >>> 2) << 3));
    for (
      var d, m, p = 0, h = 0, g = 0, y = 0, _ = 0, w = 0, b = 0, C = 0, E = 0;
      0 == p;

    )
      if (((p = a(e, E, 1)), (h = a(e, E + 1, 2)), (E += 3), 0 != h)) {
        if (
          (f && (t = v.F._check(t, C + (1 << 17))),
          1 == h && ((d = l.flmap), (m = l.fdmap), (w = 511), (b = 31)),
          2 == h)
        ) {
          (g = i(e, E, 5) + 257),
            (y = i(e, E + 5, 5) + 1),
            (_ = i(e, E + 10, 4) + 4);
          E += 14;
          for (var k = 0; k < 38; k += 2)
            (l.itree[k] = 0), (l.itree[k + 1] = 0);
          var x = 1;
          for (k = 0; k < _; k++) {
            var F = i(e, E + 3 * k, 3);
            (l.itree[1 + (l.ordr[k] << 1)] = F), F > x && (x = F);
          }
          (E += 3 * _),
            u(l.itree, x),
            s(l.itree, x, l.imap),
            (d = l.lmap),
            (m = l.dmap),
            (E = o(l.imap, (1 << x) - 1, g + y, e, E, l.ttree));
          var S = n._copyOut(l.ttree, 0, g, l.ltree);
          w = (1 << S) - 1;
          var D = n._copyOut(l.ttree, g, y, l.dtree);
          (b = (1 << D) - 1),
            u(l.ltree, S),
            s(l.ltree, S, d),
            u(l.dtree, D),
            s(l.dtree, D, m);
        }
        for (;;) {
          var P = d[c(e, E) & w];
          E += 15 & P;
          var T = P >>> 4;
          if (T >>> 8 == 0) t[C++] = T;
          else {
            if (256 == T) break;
            var M = C + T - 254;
            if (T > 264) {
              var A = l.ldef[T - 257];
              (M = C + (A >>> 3) + i(e, E, 7 & A)), (E += 7 & A);
            }
            var L = m[c(e, E) & b];
            E += 15 & L;
            var I = L >>> 4,
              B = l.ddef[I],
              R = (B >>> 4) + a(e, E, 15 & B);
            for (E += 15 & B, f && (t = v.F._check(t, C + (1 << 17))); C < M; )
              (t[C] = t[C++ - R]),
                (t[C] = t[C++ - R]),
                (t[C] = t[C++ - R]),
                (t[C] = t[C++ - R]);
            C = M;
          }
        }
      } else {
        0 != (7 & E) && (E += 8 - (7 & E));
        var O = 4 + (E >>> 3),
          N = e[O - 4] | (e[O - 3] << 8);
        f && (t = v.F._check(t, C + N)),
          t.set(new r(e.buffer, e.byteOffset + O, N), C),
          (E = (O + N) << 3),
          (C += N);
      }
    return t.length == C ? t : t.slice(0, C);
  }),
  (v.F._check = function (e, t) {
    var r = e.length;
    if (t <= r) return e;
    var n = new Uint8Array(Math.max(r << 1, t));
    return n.set(e, 0), n;
  }),
  (v.F._decodeTiny = function (e, t, r, n, a, i) {
    for (var o = v.F._bitsE, u = v.F._get17, s = 0; s < r; ) {
      var c = e[u(n, a) & t];
      a += 15 & c;
      var l = c >>> 4;
      if (l <= 15) (i[s] = l), s++;
      else {
        var f = 0,
          d = 0;
        16 == l
          ? ((d = 3 + o(n, a, 2)), (a += 2), (f = i[s - 1]))
          : 17 == l
          ? ((d = 3 + o(n, a, 3)), (a += 3))
          : 18 == l && ((d = 11 + o(n, a, 7)), (a += 7));
        for (var m = s + d; s < m; ) (i[s] = f), s++;
      }
    }
    return a;
  }),
  (v.F._copyOut = function (e, t, r, n) {
    for (var a = 0, i = 0, o = n.length >>> 1; i < r; ) {
      var u = e[i + t];
      (n[i << 1] = 0), (n[1 + (i << 1)] = u), u > a && (a = u), i++;
    }
    for (; i < o; ) (n[i << 1] = 0), (n[1 + (i << 1)] = 0), i++;
    return a;
  }),
  (v.F.makeCodes = function (e, t) {
    for (
      var r, n, a, i, o = v.F.U, u = e.length, s = o.bl_count, c = 0;
      c <= t;
      c++
    )
      s[c] = 0;
    for (c = 1; c < u; c += 2) s[e[c]]++;
    var l = o.next_code;
    for (r = 0, s[0] = 0, n = 1; n <= t; n++)
      (r = (r + s[n - 1]) << 1), (l[n] = r);
    for (a = 0; a < u; a += 2) 0 != (i = e[a + 1]) && ((e[a] = l[i]), l[i]++);
  }),
  (v.F.codes2map = function (e, t, r) {
    for (var n = e.length, a = v.F.U.rev15, i = 0; i < n; i += 2)
      if (0 != e[i + 1])
        for (
          var o = i >> 1,
            u = e[i + 1],
            s = (o << 4) | u,
            c = t - u,
            l = e[i] << c,
            f = l + (1 << c);
          l != f;

        ) {
          (r[a[l] >>> (15 - t)] = s), l++;
        }
  }),
  (v.F.revCodes = function (e, t) {
    for (var r = v.F.U.rev15, n = 15 - t, a = 0; a < e.length; a += 2) {
      var i = e[a] << (t - e[a + 1]);
      e[a] = r[i] >>> n;
    }
  }),
  (v.F._putsE = function (e, t, r) {
    r <<= 7 & t;
    var n = t >>> 3;
    (e[n] |= r), (e[n + 1] |= r >>> 8);
  }),
  (v.F._putsF = function (e, t, r) {
    r <<= 7 & t;
    var n = t >>> 3;
    (e[n] |= r), (e[n + 1] |= r >>> 8), (e[n + 2] |= r >>> 16);
  }),
  (v.F._bitsE = function (e, t, r) {
    return (
      ((e[t >>> 3] | (e[1 + (t >>> 3)] << 8)) >>> (7 & t)) & ((1 << r) - 1)
    );
  }),
  (v.F._bitsF = function (e, t, r) {
    return (
      ((e[t >>> 3] | (e[1 + (t >>> 3)] << 8) | (e[2 + (t >>> 3)] << 16)) >>>
        (7 & t)) &
      ((1 << r) - 1)
    );
  }),
  (v.F._get17 = function (e, t) {
    return (
      (e[t >>> 3] | (e[1 + (t >>> 3)] << 8) | (e[2 + (t >>> 3)] << 16)) >>>
      (7 & t)
    );
  }),
  (v.F._get25 = function (e, t) {
    return (
      (e[t >>> 3] |
        (e[1 + (t >>> 3)] << 8) |
        (e[2 + (t >>> 3)] << 16) |
        (e[3 + (t >>> 3)] << 24)) >>>
      (7 & t)
    );
  }),
  (v.F.U =
    ((d = Uint16Array),
    (m = Uint32Array),
    {
      next_code: new d(16),
      bl_count: new d(16),
      ordr: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
      of0: [
        3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59,
        67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999
      ],
      exb: [
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4,
        5, 5, 5, 5, 0, 0, 0, 0
      ],
      ldef: new d(32),
      df0: [
        1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385,
        513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577,
        65535, 65535
      ],
      dxb: [
        0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
        10, 11, 11, 12, 12, 13, 13, 0, 0
      ],
      ddef: new m(32),
      flmap: new d(512),
      fltree: [],
      fdmap: new d(32),
      fdtree: [],
      lmap: new d(32768),
      ltree: [],
      ttree: [],
      dmap: new d(32768),
      dtree: [],
      imap: new d(512),
      itree: [],
      rev15: new d(32768),
      lhst: new m(286),
      dhst: new m(30),
      ihst: new m(19),
      lits: new m(15e3),
      strt: new d(65536),
      prev: new d(32768)
    })),
  (function () {
    for (var e = v.F.U, t = 0; t < 32768; t++) {
      var r = t;
      (r =
        ((4278255360 &
          (r =
            ((4042322160 &
              (r =
                ((3435973836 &
                  (r = ((2863311530 & r) >>> 1) | ((1431655765 & r) << 1))) >>>
                  2) |
                ((858993459 & r) << 2))) >>>
              4) |
            ((252645135 & r) << 4))) >>>
          8) |
        ((16711935 & r) << 8)),
        (e.rev15[t] = ((r >>> 16) | (r << 16)) >>> 17);
    }
    function n(e, t, r) {
      for (; 0 != t--; ) e.push(0, r);
    }
    for (t = 0; t < 32; t++)
      (e.ldef[t] = (e.of0[t] << 3) | e.exb[t]),
        (e.ddef[t] = (e.df0[t] << 4) | e.dxb[t]);
    n(e.fltree, 144, 8),
      n(e.fltree, 112, 9),
      n(e.fltree, 24, 7),
      n(e.fltree, 8, 8),
      v.F.makeCodes(e.fltree, 9),
      v.F.codes2map(e.fltree, 9, e.flmap),
      v.F.revCodes(e.fltree, 9),
      n(e.fdtree, 32, 5),
      v.F.makeCodes(e.fdtree, 5),
      v.F.codes2map(e.fdtree, 5, e.fdmap),
      v.F.revCodes(e.fdtree, 5),
      n(e.itree, 19, 0),
      n(e.ltree, 286, 0),
      n(e.dtree, 30, 0),
      n(e.ttree, 320, 0);
  })();
function h(e, t) {
  try {
    return e.lstat(t), !0;
  } catch (e) {
    if (44 === e.errno || "ENOENT" === e.code) return !1;
    throw e;
  }
}
export class Effect extends class {
  static async preload(e) {
    if (Array.isArray(e))
      return await Promise.all(e.map((e) => this.preload(e)));
    const t = new this(e);
    return await t._load(), t;
  }
  constructor(e) {
    this._source = e;
  }
  async _load() {
    if (this._data) return this._data;
    let e = this._source;
    return (
      "string" == typeof e && (e = await fetch(e).then((e) => e.blob())),
      e instanceof Blob &&
        (this._data = await e
          .arrayBuffer()
          .then(p.parse)
          .then((e) => Object.entries(e))
          .then((e) => e.filter(([e]) => !e.startsWith("__MACOSX/")))
          .then((e) => e.filter(([e, t]) => t.length))
          .then(Object.fromEntries)),
      this._data
    );
  }
  async _write(e) {
    const t = await this._load();
    Object.entries(t).forEach(([t, r]) =>
      (function (e, t, r) {
        const n = t.split("/");
        "" === n[0] && n.shift();
        n.length > 1 &&
          n.reduce((t, r) => (h(e, t) || e.mkdir(t), `${t}/${r}`));
        e.writeFile(t, r);
      })(e, t, r)
    );
  }
} {
  static async preload(e) {
    return Array.isArray(e), super.preload(e);
  }
  async _write(e) {
    const t = await super._load(),
      [r] = Object.keys(t)[0].split("/");
    return h(e, r) || (await super._write(e)), r;
  }
}
var g,
  y =
    ((g =
      "undefined" != typeof document && document.currentScript
        ? document.currentScript.src
        : void 0),
    function (e) {
      (e = void 0 !== (e = e || {}) ? e : {}).expectedDataFileDownloads ||
        ((e.expectedDataFileDownloads = 0), (e.finishedDataFileDownloads = 0)),
        e.expectedDataFileDownloads++,
        (function (t) {
          if ("object" == typeof window)
            window.encodeURIComponent(
              window.location.pathname
                .toString()
                .substring(
                  0,
                  window.location.pathname.toString().lastIndexOf("/")
                ) + "/"
            );
          else {
            if ("undefined" == typeof location)
              throw "using preloaded data can only be done on a web page or in a web worker";
            encodeURIComponent(
              location.pathname
                .toString()
                .substring(0, location.pathname.toString().lastIndexOf("/")) +
                "/"
            );
          }
          var r = "BanubaSDK.data";
          "function" != typeof e.locateFilePackage ||
            e.locateFile ||
            ((e.locateFile = e.locateFilePackage),
            f(
              "warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)"
            ));
          var n = e.locateFile ? e.locateFile(r, "") : r,
            a = t.remote_package_size;
          t.package_uuid;
          var i,
            o,
            u,
            s,
            c = null,
            l = e.getPreloadedPackage ? e.getPreloadedPackage(n, a) : null;
          function d() {
            function r(e, t) {
              if (!e) throw t + new Error().stack;
            }
            function n(e, t, r) {
              (this.start = e), (this.end = t), (this.audio = r);
            }
            e.FS_createPath("/", "frx", !0, !0),
              e.FS_createPath("/frx", "16.05.2018-char", !0, !0),
              e.FS_createPath("/frx/16.05.2018-char", "classifier", !0, !0),
              e.FS_createPath(
                "/frx/16.05.2018-char",
                "supersynth30symmetry",
                !0,
                !0
              ),
              e.FS_createPath("/", "MoMoFRX", !0, !0),
              e.FS_createPath("/", "flow", !0, !0),
              e.FS_createPath("/", "renderer", !0, !0),
              (n.prototype = {
                requests: {},
                open: function (t, r) {
                  (this.name = r),
                    (this.requests[r] = this),
                    e.addRunDependency("fp " + this.name);
                },
                send: function () {},
                onload: function () {
                  var e = this.byteArray.subarray(this.start, this.end);
                  this.finish(e);
                },
                finish: function (t) {
                  e.FS_createDataFile(this.name, null, t, !0, !0, !0),
                    e.removeRunDependency("fp " + this.name),
                    (this.requests[this.name] = null);
                }
              });
            for (var a = t.files, i = 0; i < a.length; ++i)
              new n(a[i].start, a[i].end, a[i].audio).open(
                "GET",
                a[i].filename
              );
            function o(a) {
              e.finishedDataFileDownloads++,
                r(a, "Loading data file failed."),
                r(a instanceof ArrayBuffer, "bad input to processPackageData");
              var i = new Uint8Array(a);
              n.prototype.byteArray = i;
              for (var o = t.files, u = 0; u < o.length; ++u)
                n.prototype.requests[o[u].filename].onload();
              e.removeRunDependency("datafile_BanubaSDK.data");
            }
            e.addRunDependency("datafile_BanubaSDK.data"),
              e.preloadResults || (e.preloadResults = {}),
              (e.preloadResults["BanubaSDK.data"] = { fromCache: !1 }),
              l ? (o(l), (l = null)) : (c = o);
          }
          l ||
            ((i = n),
            (o = a),
            (u = function (e) {
              c ? (c(e), (c = null)) : (l = e);
            }),
            (s = new XMLHttpRequest()).open("GET", i, !0),
            (s.responseType = "arraybuffer"),
            (s.onprogress = function (t) {
              var r = i,
                n = o;
              if ((t.total && (n = t.total), t.loaded)) {
                s.addedTotal
                  ? (e.dataFileDownloads[r].loaded = t.loaded)
                  : ((s.addedTotal = !0),
                    e.dataFileDownloads || (e.dataFileDownloads = {}),
                    (e.dataFileDownloads[r] = { loaded: t.loaded, total: n }));
                var a = 0,
                  u = 0,
                  c = 0;
                for (var l in e.dataFileDownloads) {
                  var f = e.dataFileDownloads[l];
                  (a += f.total), (u += f.loaded), c++;
                }
                (a = Math.ceil((a * e.expectedDataFileDownloads) / c)),
                  e.setStatus &&
                    e.setStatus("Downloading data... (" + u + "/" + a + ")");
              } else
                e.dataFileDownloads ||
                  (e.setStatus && e.setStatus("Downloading data..."));
            }),
            (s.onerror = function (e) {
              throw new Error("NetworkError for: " + i);
            }),
            (s.onload = function (e) {
              if (
                !(
                  200 == s.status ||
                  304 == s.status ||
                  206 == s.status ||
                  (0 == s.status && s.response)
                )
              )
                throw new Error(s.statusText + " : " + s.responseURL);
              var t = s.response;
              u(t);
            }),
            s.send(null)),
            e.calledRun ? d() : (e.preRun || (e.preRun = []), e.preRun.push(d));
        })({
          files: [
            {
              filename: "/frx/16.05.2018-char/head.c2a.pcabasis",
              start: 0,
              end: 793920,
              audio: 0
            },
            {
              filename: "/frx/16.05.2018-char/head.c2a.eigenvalues",
              start: 793920,
              end: 794e3,
              audio: 0
            },
            {
              filename: "/frx/16.05.2018-char/head_au.tex",
              start: 794e3,
              end: 820464,
              audio: 0
            },
            {
              filename: "/frx/16.05.2018-char/head_au.triangles",
              start: 820464,
              end: 897696,
              audio: 0
            },
            {
              filename: "/frx/16.05.2018-char/head_au.verts",
              start: 897696,
              end: 937392,
              audio: 0
            },
            {
              filename:
                "/frx/16.05.2018-char/classifier/train.posthub640_86_au_zero_sym_rs_03_11.extx1x16c30_pstv_nl_nl_12_20h-symm-v40.model",
              start: 937392,
              end: 12470458,
              audio: 0
            },
            {
              filename:
                "/frx/16.05.2018-char/supersynth30symmetry/head.3308.DA.c30.tm.pca2.86.blendshapes",
              start: 12470458,
              end: 13661338,
              audio: 0
            },
            {
              filename:
                "/frx/16.05.2018-char/supersynth30symmetry/head.3308.DA.c30.tm.pca2.86.means",
              start: 13661338,
              end: 13701034,
              audio: 0
            },
            {
              filename: "/frx/frx.js",
              start: 13701034,
              end: 13703518,
              audio: 0
            },
            {
              filename: "/MoMoFRX/edgetopology1.ef",
              start: 13703518,
              end: 13750758,
              audio: 0
            },
            {
              filename: "/MoMoFRX/edgetopology1.ev",
              start: 13750758,
              end: 13797998,
              audio: 0
            },
            {
              filename: "/MoMoFRX/head.3308.DA.c30.tm.pca2.86.blendshapes",
              start: 13797998,
              end: 14988878,
              audio: 0
            },
            {
              filename: "/MoMoFRX/head.3308.DA.c30.tm.pca2.86.means",
              start: 14988878,
              end: 15028574,
              audio: 0
            },
            {
              filename: "/MoMoFRX/head.verts",
              start: 15028574,
              end: 15068270,
              audio: 0
            },
            {
              filename: "/MoMoFRX/head1.triangles",
              start: 15068270,
              end: 15145502,
              audio: 0
            },
            {
              filename: "/MoMoFRX/head_au.tex",
              start: 15145502,
              end: 15171966,
              audio: 0
            },
            {
              filename: "/flow/landmarks_128.tflite",
              start: 15171966,
              end: 17056610,
              audio: 0
            },
            {
              filename: "/flow/frx_prior.tflite",
              start: 17056610,
              end: 17824842,
              audio: 0
            },
            {
              filename: "/flow/ssd_uint8.tflite",
              start: 17824842,
              end: 18059858,
              audio: 0
            },
            {
              filename: "/flow/squared_p_uint8.tflite",
              start: 18059858,
              end: 18606802,
              audio: 0
            },
            {
              filename: "/renderer/lut3d_eyes_low.png",
              start: 18606802,
              end: 18714620,
              audio: 0
            },
            {
              filename: "/renderer/lut3d_teeth_highlighter5.png",
              start: 18714620,
              end: 18929393,
              audio: 0
            },
            {
              filename: "/renderer/retouch.frag",
              start: 18929393,
              end: 18933576,
              audio: 0
            },
            {
              filename: "/renderer/retouch.vert",
              start: 18933576,
              end: 18934323,
              audio: 0
            },
            {
              filename: "/renderer/solid.frag",
              start: 18934323,
              end: 18934585,
              audio: 0
            },
            {
              filename: "/renderer/solid.vert",
              start: 18934585,
              end: 18934857,
              audio: 0
            }
          ],
          remote_package_size: 18934857,
          package_uuid: "03defb97-26c7-47d8-bd84-aabd2ea52e9b"
        });
      var t,
        r = {};
      for (t in e) e.hasOwnProperty(t) && (r[t] = e[t]);
      var n,
        a,
        i,
        o = [],
        u = "./this.program",
        s = function (e, t) {
          throw t;
        },
        c = "";
      document.currentScript && (c = document.currentScript.src),
        g && (c = g),
        (c =
          0 !== c.indexOf("blob:") ? c.substr(0, c.lastIndexOf("/") + 1) : ""),
        (n = function (e) {
          var t = new XMLHttpRequest();
          return t.open("GET", e, !1), t.send(null), t.responseText;
        }),
        (a = function (e, t, r) {
          var n = new XMLHttpRequest();
          n.open("GET", e, !0),
            (n.responseType = "arraybuffer"),
            (n.onload = function () {
              200 == n.status || (0 == n.status && n.response)
                ? t(n.response)
                : r();
            }),
            (n.onerror = r),
            n.send(null);
        });
      var l = e.print || console.log.bind(console),
        f = e.printErr || console.warn.bind(console);
      for (t in r) r.hasOwnProperty(t) && (e[t] = r[t]);
      function d(e) {
        var t = O[K >> 2],
          r = (t + e + 15) & -16;
        return (O[K >> 2] = r), t;
      }
      function m(e) {
        switch (e) {
          case "i1":
          case "i8":
            return 1;
          case "i16":
            return 2;
          case "i32":
            return 4;
          case "i64":
            return 8;
          case "float":
            return 4;
          case "double":
            return 8;
          default:
            if ("*" === e[e.length - 1]) return 4;
            if ("i" === e[0]) {
              var t = Number(e.substr(1));
              return (
                k(
                  t % 8 == 0,
                  "getNativeTypeSize invalid bits " + t + ", type " + e
                ),
                t / 8
              );
            }
            return 0;
        }
      }
      function p(e) {
        p.shown || (p.shown = {}), p.shown[e] || ((p.shown[e] = 1), f(e));
      }
      (r = null),
        e.arguments && (o = e.arguments),
        e.thisProgram && (u = e.thisProgram),
        e.quit && (s = e.quit);
      var v,
        h,
        y,
        _ = 0,
        w = function (e) {
          _ = e;
        };
      function b(e, t, r, n) {
        switch (
          ("*" === (r = r || "i8").charAt(r.length - 1) && (r = "i32"), r)
        ) {
          case "i1":
          case "i8":
            L[e >> 0] = t;
            break;
          case "i16":
            B[e >> 1] = t;
            break;
          case "i32":
            O[e >> 2] = t;
            break;
          case "i64":
            (_e = [
              t >>> 0,
              ((ye = t),
              +oe(ye) >= 1
                ? ye > 0
                  ? (0 | ce(+se(ye / 4294967296), 4294967295)) >>> 0
                  : ~~+ue((ye - +(~~ye >>> 0)) / 4294967296) >>> 0
                : 0)
            ]),
              (O[e >> 2] = _e[0]),
              (O[(e + 4) >> 2] = _e[1]);
            break;
          case "float":
            U[e >> 2] = t;
            break;
          case "double":
            j[e >> 3] = t;
            break;
          default:
            ve("invalid type for setValue: " + r);
        }
      }
      e.wasmBinary && (v = e.wasmBinary),
        e.noExitRuntime && (h = e.noExitRuntime),
        "object" != typeof WebAssembly && f("no native wasm support detected");
      var C = new WebAssembly.Table({
          initial: 5911,
          maximum: 5911,
          element: "anyfunc"
        }),
        E = !1;
      function k(e, t) {
        e || ve("Assertion failed: " + t);
      }
      function x(e, t, r, n) {
        var a, i;
        "number" == typeof e ? ((a = !0), (i = e)) : ((a = !1), (i = e.length));
        var o,
          u = "string" == typeof t ? t : null;
        if (
          ((o = 3 == r ? n : [$r, on, d][r](Math.max(i, u ? 1 : t.length))), a)
        ) {
          var s;
          for (n = o, k(0 == (3 & o)), s = o + (-4 & i); n < s; n += 4)
            O[n >> 2] = 0;
          for (s = o + i; n < s; ) L[n++ >> 0] = 0;
          return o;
        }
        if ("i8" === u)
          return (
            e.subarray || e.slice ? I.set(e, o) : I.set(new Uint8Array(e), o), o
          );
        for (var c, l, f, p = 0; p < i; ) {
          var v = e[p];
          0 !== (c = u || t[p])
            ? ("i64" == c && (c = "i32"),
              b(o + p, v, c),
              f !== c && ((l = m(c)), (f = c)),
              (p += l))
            : p++;
        }
        return o;
      }
      var F =
        "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
      function S(e, t, r) {
        for (var n = t + r, a = t; e[a] && !(a >= n); ) ++a;
        if (a - t > 16 && e.subarray && F) return F.decode(e.subarray(t, a));
        for (var i = ""; t < a; ) {
          var o = e[t++];
          if (128 & o) {
            var u = 63 & e[t++];
            if (192 != (224 & o)) {
              var s = 63 & e[t++];
              if (
                (o =
                  224 == (240 & o)
                    ? ((15 & o) << 12) | (u << 6) | s
                    : ((7 & o) << 18) | (u << 12) | (s << 6) | (63 & e[t++])) <
                65536
              )
                i += String.fromCharCode(o);
              else {
                var c = o - 65536;
                i += String.fromCharCode(55296 | (c >> 10), 56320 | (1023 & c));
              }
            } else i += String.fromCharCode(((31 & o) << 6) | u);
          } else i += String.fromCharCode(o);
        }
        return i;
      }
      function D(e, t) {
        return e ? S(I, e, t) : "";
      }
      function P(e, t, r, n) {
        if (!(n > 0)) return 0;
        for (var a = r, i = r + n - 1, o = 0; o < e.length; ++o) {
          var u = e.charCodeAt(o);
          if (
            (u >= 55296 &&
              u <= 57343 &&
              (u = (65536 + ((1023 & u) << 10)) | (1023 & e.charCodeAt(++o))),
            u <= 127)
          ) {
            if (r >= i) break;
            t[r++] = u;
          } else if (u <= 2047) {
            if (r + 1 >= i) break;
            (t[r++] = 192 | (u >> 6)), (t[r++] = 128 | (63 & u));
          } else if (u <= 65535) {
            if (r + 2 >= i) break;
            (t[r++] = 224 | (u >> 12)),
              (t[r++] = 128 | ((u >> 6) & 63)),
              (t[r++] = 128 | (63 & u));
          } else {
            if (r + 3 >= i) break;
            (t[r++] = 240 | (u >> 18)),
              (t[r++] = 128 | ((u >> 12) & 63)),
              (t[r++] = 128 | ((u >> 6) & 63)),
              (t[r++] = 128 | (63 & u));
          }
        }
        return (t[r] = 0), r - a;
      }
      function T(e, t, r) {
        return P(e, I, t, r);
      }
      function M(e) {
        for (var t = 0, r = 0; r < e.length; ++r) {
          var n = e.charCodeAt(r);
          n >= 55296 &&
            n <= 57343 &&
            (n = (65536 + ((1023 & n) << 10)) | (1023 & e.charCodeAt(++r))),
            n <= 127 ? ++t : (t += n <= 2047 ? 2 : n <= 65535 ? 3 : 4);
        }
        return t;
      }
      var A,
        L,
        I,
        B,
        R,
        O,
        N,
        U,
        j,
        z =
          "undefined" != typeof TextDecoder
            ? new TextDecoder("utf-16le")
            : void 0;
      function W(e) {
        for (var t = e, r = t >> 1; B[r]; ) ++r;
        if ((t = r << 1) - e > 32 && z) return z.decode(I.subarray(e, t));
        for (var n = 0, a = ""; ; ) {
          var i = B[(e + 2 * n) >> 1];
          if (0 == i) return a;
          ++n, (a += String.fromCharCode(i));
        }
      }
      function G(e, t, r) {
        if ((void 0 === r && (r = 2147483647), r < 2)) return 0;
        for (
          var n = t, a = (r -= 2) < 2 * e.length ? r / 2 : e.length, i = 0;
          i < a;
          ++i
        ) {
          var o = e.charCodeAt(i);
          (B[t >> 1] = o), (t += 2);
        }
        return (B[t >> 1] = 0), t - n;
      }
      function $(e) {
        return 2 * e.length;
      }
      function q(e) {
        for (var t = 0, r = ""; ; ) {
          var n = O[(e + 4 * t) >> 2];
          if (0 == n) return r;
          if ((++t, n >= 65536)) {
            var a = n - 65536;
            r += String.fromCharCode(55296 | (a >> 10), 56320 | (1023 & a));
          } else r += String.fromCharCode(n);
        }
      }
      function V(e, t, r) {
        if ((void 0 === r && (r = 2147483647), r < 4)) return 0;
        for (var n = t, a = n + r - 4, i = 0; i < e.length; ++i) {
          var o = e.charCodeAt(i);
          if (
            (o >= 55296 &&
              o <= 57343 &&
              (o = (65536 + ((1023 & o) << 10)) | (1023 & e.charCodeAt(++i))),
            (O[t >> 2] = o),
            (t += 4) + 4 > a)
          )
            break;
        }
        return (O[t >> 2] = 0), t - n;
      }
      function Y(e) {
        for (var t = 0, r = 0; r < e.length; ++r) {
          var n = e.charCodeAt(r);
          n >= 55296 && n <= 57343 && ++r, (t += 4);
        }
        return t;
      }
      function X(e) {
        var t = M(e) + 1,
          r = $r(t);
        return r && P(e, L, r, t), r;
      }
      function Q(e, t) {
        L.set(e, t);
      }
      function H(t) {
        (A = t),
          (e.HEAP8 = L = new Int8Array(t)),
          (e.HEAP16 = B = new Int16Array(t)),
          (e.HEAP32 = O = new Int32Array(t)),
          (e.HEAPU8 = I = new Uint8Array(t)),
          (e.HEAPU16 = R = new Uint16Array(t)),
          (e.HEAPU32 = N = new Uint32Array(t)),
          (e.HEAPF32 = U = new Float32Array(t)),
          (e.HEAPF64 = j = new Float64Array(t));
      }
      var K = 9175376,
        Z = e.INITIAL_MEMORY || 67108864;
      function J(t) {
        for (; t.length > 0; ) {
          var r = t.shift();
          if ("function" != typeof r) {
            var n = r.func;
            "number" == typeof n
              ? void 0 === r.arg
                ? e.dynCall_v(n)
                : e.dynCall_vi(n, r.arg)
              : n(void 0 === r.arg ? null : r.arg);
          } else r(e);
        }
      }
      (y = e.wasmMemory
        ? e.wasmMemory
        : new WebAssembly.Memory({ initial: Z / 65536, maximum: 32768 })) &&
        (A = y.buffer),
        (Z = A.byteLength),
        H(A),
        (O[K >> 2] = 19661296);
      var ee = [],
        te = [],
        re = [],
        ne = [],
        ae = [],
        ie = !1,
        oe = Math.abs,
        ue = Math.ceil,
        se = Math.floor,
        ce = Math.min,
        le = 0,
        fe = null,
        de = null;
      function me(t) {
        le++, e.monitorRunDependencies && e.monitorRunDependencies(le);
      }
      function pe(t) {
        if (
          (le--,
          e.monitorRunDependencies && e.monitorRunDependencies(le),
          0 == le && (null !== fe && (clearInterval(fe), (fe = null)), de))
        ) {
          var r = de;
          (de = null), r();
        }
      }
      function ve(t) {
        throw (
          (e.onAbort && e.onAbort(t),
          l((t += "")),
          f(t),
          (E = !0),
          (t = "abort(" + t + "). Build with -s ASSERTIONS=1 for more info."),
          new WebAssembly.RuntimeError(t))
        );
      }
      function he(e) {
        return (
          (t = e),
          (r = "data:application/octet-stream;base64,"),
          String.prototype.startsWith ? t.startsWith(r) : 0 === t.indexOf(r)
        );
        var t, r;
      }
      (e.preloadedImages = {}), (e.preloadedAudios = {});
      var ge,
        ye,
        _e,
        we = "BanubaSDK.wasm";
      function be() {
        try {
          if (v) return new Uint8Array(v);
          if (i) return i(we);
          throw "both async and sync fetching of the wasm failed";
        } catch (e) {
          ve(e);
        }
      }
      he(we) || ((ge = we), (we = e.locateFile ? e.locateFile(ge, c) : c + ge));
      var Ce = {
        2541: function (t) {
          e.onFPSUpdate && e.onFPSUpdate(t);
        }
      };
      function Ee() {
        var t = (function () {
          var e = new Error();
          if (!e.stack) {
            try {
              throw new Error();
            } catch (t) {
              e = t;
            }
            if (!e.stack) return "(no stack trace available)";
          }
          return e.stack.toString();
        })();
        return e.extraStackTrace && (t += "\n" + e.extraStackTrace()),
        t.replace(/\b_Z[\w\d_]+/g, function (e) {
          return e == e ? e : e + " [" + e + "]";
        });
      }
      function ke(e, t) {
        ne.unshift({ func: e, arg: t });
      }
      te.push({
        func: function () {
          jr();
        }
      });
      var xe = [],
        Fe = {};
      function Se(e) {
        return (O[Wr() >> 2] = e), e;
      }
      var De = {
          splitPath: function (e) {
            return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
              .exec(e)
              .slice(1);
          },
          normalizeArray: function (e, t) {
            for (var r = 0, n = e.length - 1; n >= 0; n--) {
              var a = e[n];
              "." === a
                ? e.splice(n, 1)
                : ".." === a
                ? (e.splice(n, 1), r++)
                : r && (e.splice(n, 1), r--);
            }
            if (t) for (; r; r--) e.unshift("..");
            return e;
          },
          normalize: function (e) {
            var t = "/" === e.charAt(0),
              r = "/" === e.substr(-1);
            return (
              (e = De.normalizeArray(
                e.split("/").filter(function (e) {
                  return !!e;
                }),
                !t
              ).join("/")) ||
                t ||
                (e = "."),
              e && r && (e += "/"),
              (t ? "/" : "") + e
            );
          },
          dirname: function (e) {
            var t = De.splitPath(e),
              r = t[0],
              n = t[1];
            return r || n ? (n && (n = n.substr(0, n.length - 1)), r + n) : ".";
          },
          basename: function (e) {
            if ("/" === e) return "/";
            var t = e.lastIndexOf("/");
            return -1 === t ? e : e.substr(t + 1);
          },
          extname: function (e) {
            return De.splitPath(e)[3];
          },
          join: function () {
            var e = Array.prototype.slice.call(arguments, 0);
            return De.normalize(e.join("/"));
          },
          join2: function (e, t) {
            return De.normalize(e + "/" + t);
          }
        },
        Pe = {
          resolve: function () {
            for (
              var e = "", t = !1, r = arguments.length - 1;
              r >= -1 && !t;
              r--
            ) {
              var n = r >= 0 ? arguments[r] : Ae.cwd();
              if ("string" != typeof n)
                throw new TypeError(
                  "Arguments to path.resolve must be strings"
                );
              if (!n) return "";
              (e = n + "/" + e), (t = "/" === n.charAt(0));
            }
            return (
              (t ? "/" : "") +
                (e = De.normalizeArray(
                  e.split("/").filter(function (e) {
                    return !!e;
                  }),
                  !t
                ).join("/")) || "."
            );
          },
          relative: function (e, t) {
            function r(e) {
              for (var t = 0; t < e.length && "" === e[t]; t++);
              for (var r = e.length - 1; r >= 0 && "" === e[r]; r--);
              return t > r ? [] : e.slice(t, r - t + 1);
            }
            (e = Pe.resolve(e).substr(1)), (t = Pe.resolve(t).substr(1));
            for (
              var n = r(e.split("/")),
                a = r(t.split("/")),
                i = Math.min(n.length, a.length),
                o = i,
                u = 0;
              u < i;
              u++
            )
              if (n[u] !== a[u]) {
                o = u;
                break;
              }
            var s = [];
            for (u = o; u < n.length; u++) s.push("..");
            return (s = s.concat(a.slice(o))).join("/");
          }
        },
        Te = {
          ttys: [],
          init: function () {},
          shutdown: function () {},
          register: function (e, t) {
            (Te.ttys[e] = { input: [], output: [], ops: t }),
              Ae.registerDevice(e, Te.stream_ops);
          },
          stream_ops: {
            open: function (e) {
              var t = Te.ttys[e.node.rdev];
              if (!t) throw new Ae.ErrnoError(43);
              (e.tty = t), (e.seekable = !1);
            },
            close: function (e) {
              e.tty.ops.flush(e.tty);
            },
            flush: function (e) {
              e.tty.ops.flush(e.tty);
            },
            read: function (e, t, r, n, a) {
              if (!e.tty || !e.tty.ops.get_char) throw new Ae.ErrnoError(60);
              for (var i = 0, o = 0; o < n; o++) {
                var u;
                try {
                  u = e.tty.ops.get_char(e.tty);
                } catch (e) {
                  throw new Ae.ErrnoError(29);
                }
                if (void 0 === u && 0 === i) throw new Ae.ErrnoError(6);
                if (null == u) break;
                i++, (t[r + o] = u);
              }
              return i && (e.node.timestamp = Date.now()), i;
            },
            write: function (e, t, r, n, a) {
              if (!e.tty || !e.tty.ops.put_char) throw new Ae.ErrnoError(60);
              try {
                for (var i = 0; i < n; i++) e.tty.ops.put_char(e.tty, t[r + i]);
              } catch (e) {
                throw new Ae.ErrnoError(29);
              }
              return n && (e.node.timestamp = Date.now()), i;
            }
          },
          default_tty_ops: {
            get_char: function (e) {
              if (!e.input.length) {
                var t = null;
                if (
                  ("undefined" != typeof window &&
                  "function" == typeof window.prompt
                    ? null !== (t = window.prompt("Input: ")) && (t += "\n")
                    : "function" == typeof readline &&
                      null !== (t = readline()) &&
                      (t += "\n"),
                  !t)
                )
                  return null;
                e.input = Rr(t, !0);
              }
              return e.input.shift();
            },
            put_char: function (e, t) {
              null === t || 10 === t
                ? (l(S(e.output, 0)), (e.output = []))
                : 0 != t && e.output.push(t);
            },
            flush: function (e) {
              e.output &&
                e.output.length > 0 &&
                (l(S(e.output, 0)), (e.output = []));
            }
          },
          default_tty1_ops: {
            put_char: function (e, t) {
              null === t || 10 === t
                ? (f(S(e.output, 0)), (e.output = []))
                : 0 != t && e.output.push(t);
            },
            flush: function (e) {
              e.output &&
                e.output.length > 0 &&
                (f(S(e.output, 0)), (e.output = []));
            }
          }
        },
        Me = {
          ops_table: null,
          mount: function (e) {
            return Me.createNode(null, "/", 16895, 0);
          },
          createNode: function (e, t, r, n) {
            if (Ae.isBlkdev(r) || Ae.isFIFO(r)) throw new Ae.ErrnoError(63);
            Me.ops_table ||
              (Me.ops_table = {
                dir: {
                  node: {
                    getattr: Me.node_ops.getattr,
                    setattr: Me.node_ops.setattr,
                    lookup: Me.node_ops.lookup,
                    mknod: Me.node_ops.mknod,
                    rename: Me.node_ops.rename,
                    unlink: Me.node_ops.unlink,
                    rmdir: Me.node_ops.rmdir,
                    readdir: Me.node_ops.readdir,
                    symlink: Me.node_ops.symlink
                  },
                  stream: { llseek: Me.stream_ops.llseek }
                },
                file: {
                  node: {
                    getattr: Me.node_ops.getattr,
                    setattr: Me.node_ops.setattr
                  },
                  stream: {
                    llseek: Me.stream_ops.llseek,
                    read: Me.stream_ops.read,
                    write: Me.stream_ops.write,
                    allocate: Me.stream_ops.allocate,
                    mmap: Me.stream_ops.mmap,
                    msync: Me.stream_ops.msync
                  }
                },
                link: {
                  node: {
                    getattr: Me.node_ops.getattr,
                    setattr: Me.node_ops.setattr,
                    readlink: Me.node_ops.readlink
                  },
                  stream: {}
                },
                chrdev: {
                  node: {
                    getattr: Me.node_ops.getattr,
                    setattr: Me.node_ops.setattr
                  },
                  stream: Ae.chrdev_stream_ops
                }
              });
            var a = Ae.createNode(e, t, r, n);
            return (
              Ae.isDir(a.mode)
                ? ((a.node_ops = Me.ops_table.dir.node),
                  (a.stream_ops = Me.ops_table.dir.stream),
                  (a.contents = {}))
                : Ae.isFile(a.mode)
                ? ((a.node_ops = Me.ops_table.file.node),
                  (a.stream_ops = Me.ops_table.file.stream),
                  (a.usedBytes = 0),
                  (a.contents = null))
                : Ae.isLink(a.mode)
                ? ((a.node_ops = Me.ops_table.link.node),
                  (a.stream_ops = Me.ops_table.link.stream))
                : Ae.isChrdev(a.mode) &&
                  ((a.node_ops = Me.ops_table.chrdev.node),
                  (a.stream_ops = Me.ops_table.chrdev.stream)),
              (a.timestamp = Date.now()),
              e && (e.contents[t] = a),
              a
            );
          },
          getFileDataAsRegularArray: function (e) {
            if (e.contents && e.contents.subarray) {
              for (var t = [], r = 0; r < e.usedBytes; ++r)
                t.push(e.contents[r]);
              return t;
            }
            return e.contents;
          },
          getFileDataAsTypedArray: function (e) {
            return e.contents
              ? e.contents.subarray
                ? e.contents.subarray(0, e.usedBytes)
                : new Uint8Array(e.contents)
              : new Uint8Array(0);
          },
          expandFileStorage: function (e, t) {
            var r = e.contents ? e.contents.length : 0;
            if (!(r >= t)) {
              (t = Math.max(t, (r * (r < 1048576 ? 2 : 1.125)) >>> 0)),
                0 != r && (t = Math.max(t, 256));
              var n = e.contents;
              (e.contents = new Uint8Array(t)),
                e.usedBytes > 0 &&
                  e.contents.set(n.subarray(0, e.usedBytes), 0);
            }
          },
          resizeFileStorage: function (e, t) {
            if (e.usedBytes != t) {
              if (0 == t) return (e.contents = null), void (e.usedBytes = 0);
              if (!e.contents || e.contents.subarray) {
                var r = e.contents;
                return (
                  (e.contents = new Uint8Array(t)),
                  r && e.contents.set(r.subarray(0, Math.min(t, e.usedBytes))),
                  void (e.usedBytes = t)
                );
              }
              if ((e.contents || (e.contents = []), e.contents.length > t))
                e.contents.length = t;
              else for (; e.contents.length < t; ) e.contents.push(0);
              e.usedBytes = t;
            }
          },
          node_ops: {
            getattr: function (e) {
              var t = {};
              return (
                (t.dev = Ae.isChrdev(e.mode) ? e.id : 1),
                (t.ino = e.id),
                (t.mode = e.mode),
                (t.nlink = 1),
                (t.uid = 0),
                (t.gid = 0),
                (t.rdev = e.rdev),
                Ae.isDir(e.mode)
                  ? (t.size = 4096)
                  : Ae.isFile(e.mode)
                  ? (t.size = e.usedBytes)
                  : Ae.isLink(e.mode)
                  ? (t.size = e.link.length)
                  : (t.size = 0),
                (t.atime = new Date(e.timestamp)),
                (t.mtime = new Date(e.timestamp)),
                (t.ctime = new Date(e.timestamp)),
                (t.blksize = 4096),
                (t.blocks = Math.ceil(t.size / t.blksize)),
                t
              );
            },
            setattr: function (e, t) {
              void 0 !== t.mode && (e.mode = t.mode),
                void 0 !== t.timestamp && (e.timestamp = t.timestamp),
                void 0 !== t.size && Me.resizeFileStorage(e, t.size);
            },
            lookup: function (e, t) {
              throw Ae.genericErrors[44];
            },
            mknod: function (e, t, r, n) {
              return Me.createNode(e, t, r, n);
            },
            rename: function (e, t, r) {
              if (Ae.isDir(e.mode)) {
                var n;
                try {
                  n = Ae.lookupNode(t, r);
                } catch (e) {}
                if (n) for (var a in n.contents) throw new Ae.ErrnoError(55);
              }
              delete e.parent.contents[e.name],
                (e.name = r),
                (t.contents[r] = e),
                (e.parent = t);
            },
            unlink: function (e, t) {
              delete e.contents[t];
            },
            rmdir: function (e, t) {
              var r = Ae.lookupNode(e, t);
              for (var n in r.contents) throw new Ae.ErrnoError(55);
              delete e.contents[t];
            },
            readdir: function (e) {
              var t = [".", ".."];
              for (var r in e.contents)
                e.contents.hasOwnProperty(r) && t.push(r);
              return t;
            },
            symlink: function (e, t, r) {
              var n = Me.createNode(e, t, 41471, 0);
              return (n.link = r), n;
            },
            readlink: function (e) {
              if (!Ae.isLink(e.mode)) throw new Ae.ErrnoError(28);
              return e.link;
            }
          },
          stream_ops: {
            read: function (e, t, r, n, a) {
              var i = e.node.contents;
              if (a >= e.node.usedBytes) return 0;
              var o = Math.min(e.node.usedBytes - a, n);
              if (o > 8 && i.subarray) t.set(i.subarray(a, a + o), r);
              else for (var u = 0; u < o; u++) t[r + u] = i[a + u];
              return o;
            },
            write: function (e, t, r, n, a, i) {
              if ((t.buffer === L.buffer && (i = !1), !n)) return 0;
              var o = e.node;
              if (
                ((o.timestamp = Date.now()),
                t.subarray && (!o.contents || o.contents.subarray))
              ) {
                if (i)
                  return (
                    (o.contents = t.subarray(r, r + n)), (o.usedBytes = n), n
                  );
                if (0 === o.usedBytes && 0 === a)
                  return (o.contents = t.slice(r, r + n)), (o.usedBytes = n), n;
                if (a + n <= o.usedBytes)
                  return o.contents.set(t.subarray(r, r + n), a), n;
              }
              if (
                (Me.expandFileStorage(o, a + n),
                o.contents.subarray && t.subarray)
              )
                o.contents.set(t.subarray(r, r + n), a);
              else for (var u = 0; u < n; u++) o.contents[a + u] = t[r + u];
              return (o.usedBytes = Math.max(o.usedBytes, a + n)), n;
            },
            llseek: function (e, t, r) {
              var n = t;
              if (
                (1 === r
                  ? (n += e.position)
                  : 2 === r &&
                    Ae.isFile(e.node.mode) &&
                    (n += e.node.usedBytes),
                n < 0)
              )
                throw new Ae.ErrnoError(28);
              return n;
            },
            allocate: function (e, t, r) {
              Me.expandFileStorage(e.node, t + r),
                (e.node.usedBytes = Math.max(e.node.usedBytes, t + r));
            },
            mmap: function (e, t, r, n, a, i, o) {
              if (!Ae.isFile(e.node.mode)) throw new Ae.ErrnoError(43);
              var u,
                s,
                c = e.node.contents;
              if (2 & o || c.buffer !== t.buffer) {
                (a > 0 || a + n < c.length) &&
                  (c = c.subarray
                    ? c.subarray(a, a + n)
                    : Array.prototype.slice.call(c, a, a + n)),
                  (s = !0);
                var l = t.buffer == L.buffer;
                if (!(u = $r(n))) throw new Ae.ErrnoError(48);
                (l ? L : t).set(c, u);
              } else (s = !1), (u = c.byteOffset);
              return { ptr: u, allocated: s };
            },
            msync: function (e, t, r, n, a) {
              if (!Ae.isFile(e.node.mode)) throw new Ae.ErrnoError(43);
              return 2 & a || Me.stream_ops.write(e, t, 0, n, r, !1), 0;
            }
          }
        },
        Ae = {
          root: null,
          mounts: [],
          devices: {},
          streams: [],
          nextInode: 1,
          nameTable: null,
          currentPath: "/",
          initialized: !1,
          ignorePermissions: !0,
          trackingDelegate: {},
          tracking: { openFlags: { READ: 1, WRITE: 2 } },
          ErrnoError: null,
          genericErrors: {},
          filesystems: null,
          syncFSRequests: 0,
          handleFSError: function (e) {
            if (!(e instanceof Ae.ErrnoError)) throw e + " : " + Ee();
            return Se(e.errno);
          },
          lookupPath: function (e, t) {
            if (((t = t || {}), !(e = Pe.resolve(Ae.cwd(), e))))
              return { path: "", node: null };
            var r = { follow_mount: !0, recurse_count: 0 };
            for (var n in r) void 0 === t[n] && (t[n] = r[n]);
            if (t.recurse_count > 8) throw new Ae.ErrnoError(32);
            for (
              var a = De.normalizeArray(
                  e.split("/").filter(function (e) {
                    return !!e;
                  }),
                  !1
                ),
                i = Ae.root,
                o = "/",
                u = 0;
              u < a.length;
              u++
            ) {
              var s = u === a.length - 1;
              if (s && t.parent) break;
              if (
                ((i = Ae.lookupNode(i, a[u])),
                (o = De.join2(o, a[u])),
                Ae.isMountpoint(i) &&
                  (!s || (s && t.follow_mount)) &&
                  (i = i.mounted.root),
                !s || t.follow)
              )
                for (var c = 0; Ae.isLink(i.mode); ) {
                  var l = Ae.readlink(o);
                  if (
                    ((o = Pe.resolve(De.dirname(o), l)),
                    (i = Ae.lookupPath(o, {
                      recurse_count: t.recurse_count
                    }).node),
                    c++ > 40)
                  )
                    throw new Ae.ErrnoError(32);
                }
            }
            return { path: o, node: i };
          },
          getPath: function (e) {
            for (var t; ; ) {
              if (Ae.isRoot(e)) {
                var r = e.mount.mountpoint;
                return t ? ("/" !== r[r.length - 1] ? r + "/" + t : r + t) : r;
              }
              (t = t ? e.name + "/" + t : e.name), (e = e.parent);
            }
          },
          hashName: function (e, t) {
            for (var r = 0, n = 0; n < t.length; n++)
              r = ((r << 5) - r + t.charCodeAt(n)) | 0;
            return ((e + r) >>> 0) % Ae.nameTable.length;
          },
          hashAddNode: function (e) {
            var t = Ae.hashName(e.parent.id, e.name);
            (e.name_next = Ae.nameTable[t]), (Ae.nameTable[t] = e);
          },
          hashRemoveNode: function (e) {
            var t = Ae.hashName(e.parent.id, e.name);
            if (Ae.nameTable[t] === e) Ae.nameTable[t] = e.name_next;
            else
              for (var r = Ae.nameTable[t]; r; ) {
                if (r.name_next === e) {
                  r.name_next = e.name_next;
                  break;
                }
                r = r.name_next;
              }
          },
          lookupNode: function (e, t) {
            var r = Ae.mayLookup(e);
            if (r) throw new Ae.ErrnoError(r, e);
            for (
              var n = Ae.hashName(e.id, t), a = Ae.nameTable[n];
              a;
              a = a.name_next
            ) {
              var i = a.name;
              if (a.parent.id === e.id && i === t) return a;
            }
            return Ae.lookup(e, t);
          },
          createNode: function (e, t, r, n) {
            var a = new Ae.FSNode(e, t, r, n);
            return Ae.hashAddNode(a), a;
          },
          destroyNode: function (e) {
            Ae.hashRemoveNode(e);
          },
          isRoot: function (e) {
            return e === e.parent;
          },
          isMountpoint: function (e) {
            return !!e.mounted;
          },
          isFile: function (e) {
            return 32768 == (61440 & e);
          },
          isDir: function (e) {
            return 16384 == (61440 & e);
          },
          isLink: function (e) {
            return 40960 == (61440 & e);
          },
          isChrdev: function (e) {
            return 8192 == (61440 & e);
          },
          isBlkdev: function (e) {
            return 24576 == (61440 & e);
          },
          isFIFO: function (e) {
            return 4096 == (61440 & e);
          },
          isSocket: function (e) {
            return 49152 == (49152 & e);
          },
          flagModes: {
            r: 0,
            rs: 1052672,
            "r+": 2,
            w: 577,
            wx: 705,
            xw: 705,
            "w+": 578,
            "wx+": 706,
            "xw+": 706,
            a: 1089,
            ax: 1217,
            xa: 1217,
            "a+": 1090,
            "ax+": 1218,
            "xa+": 1218
          },
          modeStringToFlags: function (e) {
            var t = Ae.flagModes[e];
            if (void 0 === t) throw new Error("Unknown file open mode: " + e);
            return t;
          },
          flagsToPermissionString: function (e) {
            var t = ["r", "w", "rw"][3 & e];
            return 512 & e && (t += "w"), t;
          },
          nodePermissions: function (e, t) {
            return Ae.ignorePermissions ||
              ((-1 === t.indexOf("r") || 292 & e.mode) &&
                (-1 === t.indexOf("w") || 146 & e.mode) &&
                (-1 === t.indexOf("x") || 73 & e.mode))
              ? 0
              : 2;
          },
          mayLookup: function (e) {
            var t = Ae.nodePermissions(e, "x");
            return t || (e.node_ops.lookup ? 0 : 2);
          },
          mayCreate: function (e, t) {
            try {
              return Ae.lookupNode(e, t), 20;
            } catch (e) {}
            return Ae.nodePermissions(e, "wx");
          },
          mayDelete: function (e, t, r) {
            var n;
            try {
              n = Ae.lookupNode(e, t);
            } catch (e) {
              return e.errno;
            }
            var a = Ae.nodePermissions(e, "wx");
            if (a) return a;
            if (r) {
              if (!Ae.isDir(n.mode)) return 54;
              if (Ae.isRoot(n) || Ae.getPath(n) === Ae.cwd()) return 10;
            } else if (Ae.isDir(n.mode)) return 31;
            return 0;
          },
          mayOpen: function (e, t) {
            return e
              ? Ae.isLink(e.mode)
                ? 32
                : Ae.isDir(e.mode) &&
                  ("r" !== Ae.flagsToPermissionString(t) || 512 & t)
                ? 31
                : Ae.nodePermissions(e, Ae.flagsToPermissionString(t))
              : 44;
          },
          MAX_OPEN_FDS: 4096,
          nextfd: function (e, t) {
            (e = e || 0), (t = t || Ae.MAX_OPEN_FDS);
            for (var r = e; r <= t; r++) if (!Ae.streams[r]) return r;
            throw new Ae.ErrnoError(33);
          },
          getStream: function (e) {
            return Ae.streams[e];
          },
          createStream: function (e, t, r) {
            Ae.FSStream ||
              ((Ae.FSStream = function () {}),
              (Ae.FSStream.prototype = {
                object: {
                  get: function () {
                    return this.node;
                  },
                  set: function (e) {
                    this.node = e;
                  }
                },
                isRead: {
                  get: function () {
                    return 1 != (2097155 & this.flags);
                  }
                },
                isWrite: {
                  get: function () {
                    return 0 != (2097155 & this.flags);
                  }
                },
                isAppend: {
                  get: function () {
                    return 1024 & this.flags;
                  }
                }
              }));
            var n = new Ae.FSStream();
            for (var a in e) n[a] = e[a];
            e = n;
            var i = Ae.nextfd(t, r);
            return (e.fd = i), (Ae.streams[i] = e), e;
          },
          closeStream: function (e) {
            Ae.streams[e] = null;
          },
          chrdev_stream_ops: {
            open: function (e) {
              var t = Ae.getDevice(e.node.rdev);
              (e.stream_ops = t.stream_ops),
                e.stream_ops.open && e.stream_ops.open(e);
            },
            llseek: function () {
              throw new Ae.ErrnoError(70);
            }
          },
          major: function (e) {
            return e >> 8;
          },
          minor: function (e) {
            return 255 & e;
          },
          makedev: function (e, t) {
            return (e << 8) | t;
          },
          registerDevice: function (e, t) {
            Ae.devices[e] = { stream_ops: t };
          },
          getDevice: function (e) {
            return Ae.devices[e];
          },
          getMounts: function (e) {
            for (var t = [], r = [e]; r.length; ) {
              var n = r.pop();
              t.push(n), r.push.apply(r, n.mounts);
            }
            return t;
          },
          syncfs: function (e, t) {
            "function" == typeof e && ((t = e), (e = !1)),
              Ae.syncFSRequests++,
              Ae.syncFSRequests > 1 &&
                f(
                  "warning: " +
                    Ae.syncFSRequests +
                    " FS.syncfs operations in flight at once, probably just doing extra work"
                );
            var r = Ae.getMounts(Ae.root.mount),
              n = 0;
            function a(e) {
              return Ae.syncFSRequests--, t(e);
            }
            function i(e) {
              if (e) return i.errored ? void 0 : ((i.errored = !0), a(e));
              ++n >= r.length && a(null);
            }
            r.forEach(function (t) {
              if (!t.type.syncfs) return i(null);
              t.type.syncfs(t, e, i);
            });
          },
          mount: function (e, t, r) {
            var n,
              a = "/" === r,
              i = !r;
            if (a && Ae.root) throw new Ae.ErrnoError(10);
            if (!a && !i) {
              var o = Ae.lookupPath(r, { follow_mount: !1 });
              if (((r = o.path), (n = o.node), Ae.isMountpoint(n)))
                throw new Ae.ErrnoError(10);
              if (!Ae.isDir(n.mode)) throw new Ae.ErrnoError(54);
            }
            var u = { type: e, opts: t, mountpoint: r, mounts: [] },
              s = e.mount(u);
            return (
              (s.mount = u),
              (u.root = s),
              a
                ? (Ae.root = s)
                : n && ((n.mounted = u), n.mount && n.mount.mounts.push(u)),
              s
            );
          },
          unmount: function (e) {
            var t = Ae.lookupPath(e, { follow_mount: !1 });
            if (!Ae.isMountpoint(t.node)) throw new Ae.ErrnoError(28);
            var r = t.node,
              n = r.mounted,
              a = Ae.getMounts(n);
            Object.keys(Ae.nameTable).forEach(function (e) {
              for (var t = Ae.nameTable[e]; t; ) {
                var r = t.name_next;
                -1 !== a.indexOf(t.mount) && Ae.destroyNode(t), (t = r);
              }
            }),
              (r.mounted = null);
            var i = r.mount.mounts.indexOf(n);
            r.mount.mounts.splice(i, 1);
          },
          lookup: function (e, t) {
            return e.node_ops.lookup(e, t);
          },
          mknod: function (e, t, r) {
            var n = Ae.lookupPath(e, { parent: !0 }).node,
              a = De.basename(e);
            if (!a || "." === a || ".." === a) throw new Ae.ErrnoError(28);
            var i = Ae.mayCreate(n, a);
            if (i) throw new Ae.ErrnoError(i);
            if (!n.node_ops.mknod) throw new Ae.ErrnoError(63);
            return n.node_ops.mknod(n, a, t, r);
          },
          create: function (e, t) {
            return (
              (t = void 0 !== t ? t : 438),
              (t &= 4095),
              (t |= 32768),
              Ae.mknod(e, t, 0)
            );
          },
          mkdir: function (e, t) {
            return (
              (t = void 0 !== t ? t : 511),
              (t &= 1023),
              (t |= 16384),
              Ae.mknod(e, t, 0)
            );
          },
          mkdirTree: function (e, t) {
            for (var r = e.split("/"), n = "", a = 0; a < r.length; ++a)
              if (r[a]) {
                n += "/" + r[a];
                try {
                  Ae.mkdir(n, t);
                } catch (e) {
                  if (20 != e.errno) throw e;
                }
              }
          },
          mkdev: function (e, t, r) {
            return (
              void 0 === r && ((r = t), (t = 438)),
              (t |= 8192),
              Ae.mknod(e, t, r)
            );
          },
          symlink: function (e, t) {
            if (!Pe.resolve(e)) throw new Ae.ErrnoError(44);
            var r = Ae.lookupPath(t, { parent: !0 }).node;
            if (!r) throw new Ae.ErrnoError(44);
            var n = De.basename(t),
              a = Ae.mayCreate(r, n);
            if (a) throw new Ae.ErrnoError(a);
            if (!r.node_ops.symlink) throw new Ae.ErrnoError(63);
            return r.node_ops.symlink(r, n, e);
          },
          rename: function (e, t) {
            var r,
              n,
              a = De.dirname(e),
              i = De.dirname(t),
              o = De.basename(e),
              u = De.basename(t);
            try {
              (r = Ae.lookupPath(e, { parent: !0 }).node),
                (n = Ae.lookupPath(t, { parent: !0 }).node);
            } catch (e) {
              throw new Ae.ErrnoError(10);
            }
            if (!r || !n) throw new Ae.ErrnoError(44);
            if (r.mount !== n.mount) throw new Ae.ErrnoError(75);
            var s,
              c = Ae.lookupNode(r, o),
              l = Pe.relative(e, i);
            if ("." !== l.charAt(0)) throw new Ae.ErrnoError(28);
            if ("." !== (l = Pe.relative(t, a)).charAt(0))
              throw new Ae.ErrnoError(55);
            try {
              s = Ae.lookupNode(n, u);
            } catch (e) {}
            if (c !== s) {
              var d = Ae.isDir(c.mode),
                m = Ae.mayDelete(r, o, d);
              if (m) throw new Ae.ErrnoError(m);
              if ((m = s ? Ae.mayDelete(n, u, d) : Ae.mayCreate(n, u)))
                throw new Ae.ErrnoError(m);
              if (!r.node_ops.rename) throw new Ae.ErrnoError(63);
              if (Ae.isMountpoint(c) || (s && Ae.isMountpoint(s)))
                throw new Ae.ErrnoError(10);
              if (n !== r && (m = Ae.nodePermissions(r, "w")))
                throw new Ae.ErrnoError(m);
              try {
                Ae.trackingDelegate.willMovePath &&
                  Ae.trackingDelegate.willMovePath(e, t);
              } catch (r) {
                f(
                  "FS.trackingDelegate['willMovePath']('" +
                    e +
                    "', '" +
                    t +
                    "') threw an exception: " +
                    r.message
                );
              }
              Ae.hashRemoveNode(c);
              try {
                r.node_ops.rename(c, n, u);
              } catch (e) {
                throw e;
              } finally {
                Ae.hashAddNode(c);
              }
              try {
                Ae.trackingDelegate.onMovePath &&
                  Ae.trackingDelegate.onMovePath(e, t);
              } catch (r) {
                f(
                  "FS.trackingDelegate['onMovePath']('" +
                    e +
                    "', '" +
                    t +
                    "') threw an exception: " +
                    r.message
                );
              }
            }
          },
          rmdir: function (e) {
            var t = Ae.lookupPath(e, { parent: !0 }).node,
              r = De.basename(e),
              n = Ae.lookupNode(t, r),
              a = Ae.mayDelete(t, r, !0);
            if (a) throw new Ae.ErrnoError(a);
            if (!t.node_ops.rmdir) throw new Ae.ErrnoError(63);
            if (Ae.isMountpoint(n)) throw new Ae.ErrnoError(10);
            try {
              Ae.trackingDelegate.willDeletePath &&
                Ae.trackingDelegate.willDeletePath(e);
            } catch (t) {
              f(
                "FS.trackingDelegate['willDeletePath']('" +
                  e +
                  "') threw an exception: " +
                  t.message
              );
            }
            t.node_ops.rmdir(t, r), Ae.destroyNode(n);
            try {
              Ae.trackingDelegate.onDeletePath &&
                Ae.trackingDelegate.onDeletePath(e);
            } catch (t) {
              f(
                "FS.trackingDelegate['onDeletePath']('" +
                  e +
                  "') threw an exception: " +
                  t.message
              );
            }
          },
          readdir: function (e) {
            var t = Ae.lookupPath(e, { follow: !0 }).node;
            if (!t.node_ops.readdir) throw new Ae.ErrnoError(54);
            return t.node_ops.readdir(t);
          },
          unlink: function (e) {
            var t = Ae.lookupPath(e, { parent: !0 }).node,
              r = De.basename(e),
              n = Ae.lookupNode(t, r),
              a = Ae.mayDelete(t, r, !1);
            if (a) throw new Ae.ErrnoError(a);
            if (!t.node_ops.unlink) throw new Ae.ErrnoError(63);
            if (Ae.isMountpoint(n)) throw new Ae.ErrnoError(10);
            try {
              Ae.trackingDelegate.willDeletePath &&
                Ae.trackingDelegate.willDeletePath(e);
            } catch (t) {
              f(
                "FS.trackingDelegate['willDeletePath']('" +
                  e +
                  "') threw an exception: " +
                  t.message
              );
            }
            t.node_ops.unlink(t, r), Ae.destroyNode(n);
            try {
              Ae.trackingDelegate.onDeletePath &&
                Ae.trackingDelegate.onDeletePath(e);
            } catch (t) {
              f(
                "FS.trackingDelegate['onDeletePath']('" +
                  e +
                  "') threw an exception: " +
                  t.message
              );
            }
          },
          readlink: function (e) {
            var t = Ae.lookupPath(e).node;
            if (!t) throw new Ae.ErrnoError(44);
            if (!t.node_ops.readlink) throw new Ae.ErrnoError(28);
            return Pe.resolve(Ae.getPath(t.parent), t.node_ops.readlink(t));
          },
          stat: function (e, t) {
            var r = Ae.lookupPath(e, { follow: !t }).node;
            if (!r) throw new Ae.ErrnoError(44);
            if (!r.node_ops.getattr) throw new Ae.ErrnoError(63);
            return r.node_ops.getattr(r);
          },
          lstat: function (e) {
            return Ae.stat(e, !0);
          },
          chmod: function (e, t, r) {
            var n;
            if (
              !(n =
                "string" == typeof e
                  ? Ae.lookupPath(e, { follow: !r }).node
                  : e).node_ops.setattr
            )
              throw new Ae.ErrnoError(63);
            n.node_ops.setattr(n, {
              mode: (4095 & t) | (-4096 & n.mode),
              timestamp: Date.now()
            });
          },
          lchmod: function (e, t) {
            Ae.chmod(e, t, !0);
          },
          fchmod: function (e, t) {
            var r = Ae.getStream(e);
            if (!r) throw new Ae.ErrnoError(8);
            Ae.chmod(r.node, t);
          },
          chown: function (e, t, r, n) {
            var a;
            if (
              !(a =
                "string" == typeof e
                  ? Ae.lookupPath(e, { follow: !n }).node
                  : e).node_ops.setattr
            )
              throw new Ae.ErrnoError(63);
            a.node_ops.setattr(a, { timestamp: Date.now() });
          },
          lchown: function (e, t, r) {
            Ae.chown(e, t, r, !0);
          },
          fchown: function (e, t, r) {
            var n = Ae.getStream(e);
            if (!n) throw new Ae.ErrnoError(8);
            Ae.chown(n.node, t, r);
          },
          truncate: function (e, t) {
            if (t < 0) throw new Ae.ErrnoError(28);
            var r;
            if (
              !(r =
                "string" == typeof e
                  ? Ae.lookupPath(e, { follow: !0 }).node
                  : e).node_ops.setattr
            )
              throw new Ae.ErrnoError(63);
            if (Ae.isDir(r.mode)) throw new Ae.ErrnoError(31);
            if (!Ae.isFile(r.mode)) throw new Ae.ErrnoError(28);
            var n = Ae.nodePermissions(r, "w");
            if (n) throw new Ae.ErrnoError(n);
            r.node_ops.setattr(r, { size: t, timestamp: Date.now() });
          },
          ftruncate: function (e, t) {
            var r = Ae.getStream(e);
            if (!r) throw new Ae.ErrnoError(8);
            if (0 == (2097155 & r.flags)) throw new Ae.ErrnoError(28);
            Ae.truncate(r.node, t);
          },
          utime: function (e, t, r) {
            var n = Ae.lookupPath(e, { follow: !0 }).node;
            n.node_ops.setattr(n, { timestamp: Math.max(t, r) });
          },
          open: function (t, r, n, a, i) {
            if ("" === t) throw new Ae.ErrnoError(44);
            var o;
            if (
              ((n = void 0 === n ? 438 : n),
              (n =
                64 & (r = "string" == typeof r ? Ae.modeStringToFlags(r) : r)
                  ? (4095 & n) | 32768
                  : 0),
              "object" == typeof t)
            )
              o = t;
            else {
              t = De.normalize(t);
              try {
                o = Ae.lookupPath(t, { follow: !(131072 & r) }).node;
              } catch (e) {}
            }
            var u = !1;
            if (64 & r)
              if (o) {
                if (128 & r) throw new Ae.ErrnoError(20);
              } else (o = Ae.mknod(t, n, 0)), (u = !0);
            if (!o) throw new Ae.ErrnoError(44);
            if (
              (Ae.isChrdev(o.mode) && (r &= -513),
              65536 & r && !Ae.isDir(o.mode))
            )
              throw new Ae.ErrnoError(54);
            if (!u) {
              var s = Ae.mayOpen(o, r);
              if (s) throw new Ae.ErrnoError(s);
            }
            512 & r && Ae.truncate(o, 0), (r &= -131713);
            var c = Ae.createStream(
              {
                node: o,
                path: Ae.getPath(o),
                flags: r,
                seekable: !0,
                position: 0,
                stream_ops: o.stream_ops,
                ungotten: [],
                error: !1
              },
              a,
              i
            );
            c.stream_ops.open && c.stream_ops.open(c),
              !e.logReadFiles ||
                1 & r ||
                (Ae.readFiles || (Ae.readFiles = {}),
                t in Ae.readFiles ||
                  ((Ae.readFiles[t] = 1),
                  f("FS.trackingDelegate error on read file: " + t)));
            try {
              if (Ae.trackingDelegate.onOpenFile) {
                var l = 0;
                1 != (2097155 & r) && (l |= Ae.tracking.openFlags.READ),
                  0 != (2097155 & r) && (l |= Ae.tracking.openFlags.WRITE),
                  Ae.trackingDelegate.onOpenFile(t, l);
              }
            } catch (e) {
              f(
                "FS.trackingDelegate['onOpenFile']('" +
                  t +
                  "', flags) threw an exception: " +
                  e.message
              );
            }
            return c;
          },
          close: function (e) {
            if (Ae.isClosed(e)) throw new Ae.ErrnoError(8);
            e.getdents && (e.getdents = null);
            try {
              e.stream_ops.close && e.stream_ops.close(e);
            } catch (e) {
              throw e;
            } finally {
              Ae.closeStream(e.fd);
            }
            e.fd = null;
          },
          isClosed: function (e) {
            return null === e.fd;
          },
          llseek: function (e, t, r) {
            if (Ae.isClosed(e)) throw new Ae.ErrnoError(8);
            if (!e.seekable || !e.stream_ops.llseek)
              throw new Ae.ErrnoError(70);
            if (0 != r && 1 != r && 2 != r) throw new Ae.ErrnoError(28);
            return (
              (e.position = e.stream_ops.llseek(e, t, r)),
              (e.ungotten = []),
              e.position
            );
          },
          read: function (e, t, r, n, a) {
            if (n < 0 || a < 0) throw new Ae.ErrnoError(28);
            if (Ae.isClosed(e)) throw new Ae.ErrnoError(8);
            if (1 == (2097155 & e.flags)) throw new Ae.ErrnoError(8);
            if (Ae.isDir(e.node.mode)) throw new Ae.ErrnoError(31);
            if (!e.stream_ops.read) throw new Ae.ErrnoError(28);
            var i = void 0 !== a;
            if (i) {
              if (!e.seekable) throw new Ae.ErrnoError(70);
            } else a = e.position;
            var o = e.stream_ops.read(e, t, r, n, a);
            return i || (e.position += o), o;
          },
          write: function (e, t, r, n, a, i) {
            if (n < 0 || a < 0) throw new Ae.ErrnoError(28);
            if (Ae.isClosed(e)) throw new Ae.ErrnoError(8);
            if (0 == (2097155 & e.flags)) throw new Ae.ErrnoError(8);
            if (Ae.isDir(e.node.mode)) throw new Ae.ErrnoError(31);
            if (!e.stream_ops.write) throw new Ae.ErrnoError(28);
            e.seekable && 1024 & e.flags && Ae.llseek(e, 0, 2);
            var o = void 0 !== a;
            if (o) {
              if (!e.seekable) throw new Ae.ErrnoError(70);
            } else a = e.position;
            var u = e.stream_ops.write(e, t, r, n, a, i);
            o || (e.position += u);
            try {
              e.path &&
                Ae.trackingDelegate.onWriteToFile &&
                Ae.trackingDelegate.onWriteToFile(e.path);
            } catch (t) {
              f(
                "FS.trackingDelegate['onWriteToFile']('" +
                  e.path +
                  "') threw an exception: " +
                  t.message
              );
            }
            return u;
          },
          allocate: function (e, t, r) {
            if (Ae.isClosed(e)) throw new Ae.ErrnoError(8);
            if (t < 0 || r <= 0) throw new Ae.ErrnoError(28);
            if (0 == (2097155 & e.flags)) throw new Ae.ErrnoError(8);
            if (!Ae.isFile(e.node.mode) && !Ae.isDir(e.node.mode))
              throw new Ae.ErrnoError(43);
            if (!e.stream_ops.allocate) throw new Ae.ErrnoError(138);
            e.stream_ops.allocate(e, t, r);
          },
          mmap: function (e, t, r, n, a, i, o) {
            if (0 != (2 & i) && 0 == (2 & o) && 2 != (2097155 & e.flags))
              throw new Ae.ErrnoError(2);
            if (1 == (2097155 & e.flags)) throw new Ae.ErrnoError(2);
            if (!e.stream_ops.mmap) throw new Ae.ErrnoError(43);
            return e.stream_ops.mmap(e, t, r, n, a, i, o);
          },
          msync: function (e, t, r, n, a) {
            return e && e.stream_ops.msync
              ? e.stream_ops.msync(e, t, r, n, a)
              : 0;
          },
          munmap: function (e) {
            return 0;
          },
          ioctl: function (e, t, r) {
            if (!e.stream_ops.ioctl) throw new Ae.ErrnoError(59);
            return e.stream_ops.ioctl(e, t, r);
          },
          readFile: function (e, t) {
            if (
              (((t = t || {}).flags = t.flags || "r"),
              (t.encoding = t.encoding || "binary"),
              "utf8" !== t.encoding && "binary" !== t.encoding)
            )
              throw new Error('Invalid encoding type "' + t.encoding + '"');
            var r,
              n = Ae.open(e, t.flags),
              a = Ae.stat(e).size,
              i = new Uint8Array(a);
            return (
              Ae.read(n, i, 0, a, 0),
              "utf8" === t.encoding
                ? (r = S(i, 0))
                : "binary" === t.encoding && (r = i),
              Ae.close(n),
              r
            );
          },
          writeFile: function (e, t, r) {
            (r = r || {}).flags = r.flags || "w";
            var n = Ae.open(e, r.flags, r.mode);
            if ("string" == typeof t) {
              var a = new Uint8Array(M(t) + 1),
                i = P(t, a, 0, a.length);
              Ae.write(n, a, 0, i, void 0, r.canOwn);
            } else {
              if (!ArrayBuffer.isView(t))
                throw new Error("Unsupported data type");
              Ae.write(n, t, 0, t.byteLength, void 0, r.canOwn);
            }
            Ae.close(n);
          },
          cwd: function () {
            return Ae.currentPath;
          },
          chdir: function (e) {
            var t = Ae.lookupPath(e, { follow: !0 });
            if (null === t.node) throw new Ae.ErrnoError(44);
            if (!Ae.isDir(t.node.mode)) throw new Ae.ErrnoError(54);
            var r = Ae.nodePermissions(t.node, "x");
            if (r) throw new Ae.ErrnoError(r);
            Ae.currentPath = t.path;
          },
          createDefaultDirectories: function () {
            Ae.mkdir("/tmp"), Ae.mkdir("/home"), Ae.mkdir("/home/web_user");
          },
          createDefaultDevices: function () {
            var e;
            if (
              (Ae.mkdir("/dev"),
              Ae.registerDevice(Ae.makedev(1, 3), {
                read: function () {
                  return 0;
                },
                write: function (e, t, r, n, a) {
                  return n;
                }
              }),
              Ae.mkdev("/dev/null", Ae.makedev(1, 3)),
              Te.register(Ae.makedev(5, 0), Te.default_tty_ops),
              Te.register(Ae.makedev(6, 0), Te.default_tty1_ops),
              Ae.mkdev("/dev/tty", Ae.makedev(5, 0)),
              Ae.mkdev("/dev/tty1", Ae.makedev(6, 0)),
              "object" == typeof crypto &&
                "function" == typeof crypto.getRandomValues)
            ) {
              var t = new Uint8Array(1);
              e = function () {
                return crypto.getRandomValues(t), t[0];
              };
            }
            e ||
              (e = function () {
                ve("random_device");
              }),
              Ae.createDevice("/dev", "random", e),
              Ae.createDevice("/dev", "urandom", e),
              Ae.mkdir("/dev/shm"),
              Ae.mkdir("/dev/shm/tmp");
          },
          createSpecialDirectories: function () {
            Ae.mkdir("/proc"),
              Ae.mkdir("/proc/self"),
              Ae.mkdir("/proc/self/fd"),
              Ae.mount(
                {
                  mount: function () {
                    var e = Ae.createNode("/proc/self", "fd", 16895, 73);
                    return (
                      (e.node_ops = {
                        lookup: function (e, t) {
                          var r = +t,
                            n = Ae.getStream(r);
                          if (!n) throw new Ae.ErrnoError(8);
                          var a = {
                            parent: null,
                            mount: { mountpoint: "fake" },
                            node_ops: {
                              readlink: function () {
                                return n.path;
                              }
                            }
                          };
                          return (a.parent = a), a;
                        }
                      }),
                      e
                    );
                  }
                },
                {},
                "/proc/self/fd"
              );
          },
          createStandardStreams: function () {
            e.stdin
              ? Ae.createDevice("/dev", "stdin", e.stdin)
              : Ae.symlink("/dev/tty", "/dev/stdin"),
              e.stdout
                ? Ae.createDevice("/dev", "stdout", null, e.stdout)
                : Ae.symlink("/dev/tty", "/dev/stdout"),
              e.stderr
                ? Ae.createDevice("/dev", "stderr", null, e.stderr)
                : Ae.symlink("/dev/tty1", "/dev/stderr"),
              Ae.open("/dev/stdin", "r"),
              Ae.open("/dev/stdout", "w"),
              Ae.open("/dev/stderr", "w");
          },
          ensureErrnoError: function () {
            Ae.ErrnoError ||
              ((Ae.ErrnoError = function (e, t) {
                (this.node = t),
                  (this.setErrno = function (e) {
                    this.errno = e;
                  }),
                  this.setErrno(e),
                  (this.message = "FS error");
              }),
              (Ae.ErrnoError.prototype = new Error()),
              (Ae.ErrnoError.prototype.constructor = Ae.ErrnoError),
              [44].forEach(function (e) {
                (Ae.genericErrors[e] = new Ae.ErrnoError(e)),
                  (Ae.genericErrors[e].stack = "<generic error, no stack>");
              }));
          },
          staticInit: function () {
            Ae.ensureErrnoError(),
              (Ae.nameTable = new Array(4096)),
              Ae.mount(Me, {}, "/"),
              Ae.createDefaultDirectories(),
              Ae.createDefaultDevices(),
              Ae.createSpecialDirectories(),
              (Ae.filesystems = { MEMFS: Me });
          },
          init: function (t, r, n) {
            (Ae.init.initialized = !0),
              Ae.ensureErrnoError(),
              (e.stdin = t || e.stdin),
              (e.stdout = r || e.stdout),
              (e.stderr = n || e.stderr),
              Ae.createStandardStreams();
          },
          quit: function () {
            Ae.init.initialized = !1;
            var t = e._fflush;
            t && t(0);
            for (var r = 0; r < Ae.streams.length; r++) {
              var n = Ae.streams[r];
              n && Ae.close(n);
            }
          },
          getMode: function (e, t) {
            var r = 0;
            return e && (r |= 365), t && (r |= 146), r;
          },
          joinPath: function (e, t) {
            var r = De.join.apply(null, e);
            return t && "/" == r[0] && (r = r.substr(1)), r;
          },
          absolutePath: function (e, t) {
            return Pe.resolve(t, e);
          },
          standardizePath: function (e) {
            return De.normalize(e);
          },
          findObject: function (e, t) {
            var r = Ae.analyzePath(e, t);
            return r.exists ? r.object : (Se(r.error), null);
          },
          analyzePath: function (e, t) {
            try {
              e = (n = Ae.lookupPath(e, { follow: !t })).path;
            } catch (e) {}
            var r = {
              isRoot: !1,
              exists: !1,
              error: 0,
              name: null,
              path: null,
              object: null,
              parentExists: !1,
              parentPath: null,
              parentObject: null
            };
            try {
              var n = Ae.lookupPath(e, { parent: !0 });
              (r.parentExists = !0),
                (r.parentPath = n.path),
                (r.parentObject = n.node),
                (r.name = De.basename(e)),
                (n = Ae.lookupPath(e, { follow: !t })),
                (r.exists = !0),
                (r.path = n.path),
                (r.object = n.node),
                (r.name = n.node.name),
                (r.isRoot = "/" === n.path);
            } catch (e) {
              r.error = e.errno;
            }
            return r;
          },
          createFolder: function (e, t, r, n) {
            var a = De.join2("string" == typeof e ? e : Ae.getPath(e), t),
              i = Ae.getMode(r, n);
            return Ae.mkdir(a, i);
          },
          createPath: function (e, t, r, n) {
            e = "string" == typeof e ? e : Ae.getPath(e);
            for (var a = t.split("/").reverse(); a.length; ) {
              var i = a.pop();
              if (i) {
                var o = De.join2(e, i);
                try {
                  Ae.mkdir(o);
                } catch (e) {}
                e = o;
              }
            }
            return o;
          },
          createFile: function (e, t, r, n, a) {
            var i = De.join2("string" == typeof e ? e : Ae.getPath(e), t),
              o = Ae.getMode(n, a);
            return Ae.create(i, o);
          },
          createDataFile: function (e, t, r, n, a, i) {
            var o = t
                ? De.join2("string" == typeof e ? e : Ae.getPath(e), t)
                : e,
              u = Ae.getMode(n, a),
              s = Ae.create(o, u);
            if (r) {
              if ("string" == typeof r) {
                for (
                  var c = new Array(r.length), l = 0, f = r.length;
                  l < f;
                  ++l
                )
                  c[l] = r.charCodeAt(l);
                r = c;
              }
              Ae.chmod(s, 146 | u);
              var d = Ae.open(s, "w");
              Ae.write(d, r, 0, r.length, 0, i), Ae.close(d), Ae.chmod(s, u);
            }
            return s;
          },
          createDevice: function (e, t, r, n) {
            var a = De.join2("string" == typeof e ? e : Ae.getPath(e), t),
              i = Ae.getMode(!!r, !!n);
            Ae.createDevice.major || (Ae.createDevice.major = 64);
            var o = Ae.makedev(Ae.createDevice.major++, 0);
            return (
              Ae.registerDevice(o, {
                open: function (e) {
                  e.seekable = !1;
                },
                close: function (e) {
                  n && n.buffer && n.buffer.length && n(10);
                },
                read: function (e, t, n, a, i) {
                  for (var o = 0, u = 0; u < a; u++) {
                    var s;
                    try {
                      s = r();
                    } catch (e) {
                      throw new Ae.ErrnoError(29);
                    }
                    if (void 0 === s && 0 === o) throw new Ae.ErrnoError(6);
                    if (null == s) break;
                    o++, (t[n + u] = s);
                  }
                  return o && (e.node.timestamp = Date.now()), o;
                },
                write: function (e, t, r, a, i) {
                  for (var o = 0; o < a; o++)
                    try {
                      n(t[r + o]);
                    } catch (e) {
                      throw new Ae.ErrnoError(29);
                    }
                  return a && (e.node.timestamp = Date.now()), o;
                }
              }),
              Ae.mkdev(a, i, o)
            );
          },
          createLink: function (e, t, r, n, a) {
            var i = De.join2("string" == typeof e ? e : Ae.getPath(e), t);
            return Ae.symlink(r, i);
          },
          forceLoadFile: function (e) {
            if (e.isDevice || e.isFolder || e.link || e.contents) return !0;
            var t = !0;
            if ("undefined" != typeof XMLHttpRequest)
              throw new Error(
                "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
              );
            if (!n)
              throw new Error("Cannot load without read() or XMLHttpRequest.");
            try {
              (e.contents = Rr(n(e.url), !0)),
                (e.usedBytes = e.contents.length);
            } catch (e) {
              t = !1;
            }
            return t || Se(29), t;
          },
          createLazyFile: function (e, t, r, n, a) {
            function i() {
              (this.lengthKnown = !1), (this.chunks = []);
            }
            if (
              ((i.prototype.get = function (e) {
                if (!(e > this.length - 1 || e < 0)) {
                  var t = e % this.chunkSize,
                    r = (e / this.chunkSize) | 0;
                  return this.getter(r)[t];
                }
              }),
              (i.prototype.setDataGetter = function (e) {
                this.getter = e;
              }),
              (i.prototype.cacheLength = function () {
                var e = new XMLHttpRequest();
                if (
                  (e.open("HEAD", r, !1),
                  e.send(null),
                  !((e.status >= 200 && e.status < 300) || 304 === e.status))
                )
                  throw new Error(
                    "Couldn't load " + r + ". Status: " + e.status
                  );
                var t,
                  n = Number(e.getResponseHeader("Content-length")),
                  a =
                    (t = e.getResponseHeader("Accept-Ranges")) && "bytes" === t,
                  i =
                    (t = e.getResponseHeader("Content-Encoding")) &&
                    "gzip" === t,
                  o = 1048576;
                a || (o = n);
                var u = this;
                u.setDataGetter(function (e) {
                  var t = e * o,
                    a = (e + 1) * o - 1;
                  if (
                    ((a = Math.min(a, n - 1)),
                    void 0 === u.chunks[e] &&
                      (u.chunks[e] = (function (e, t) {
                        if (e > t)
                          throw new Error(
                            "invalid range (" +
                              e +
                              ", " +
                              t +
                              ") or no bytes requested!"
                          );
                        if (t > n - 1)
                          throw new Error(
                            "only " + n + " bytes available! programmer error!"
                          );
                        var a = new XMLHttpRequest();
                        if (
                          (a.open("GET", r, !1),
                          n !== o &&
                            a.setRequestHeader("Range", "bytes=" + e + "-" + t),
                          "undefined" != typeof Uint8Array &&
                            (a.responseType = "arraybuffer"),
                          a.overrideMimeType &&
                            a.overrideMimeType(
                              "text/plain; charset=x-user-defined"
                            ),
                          a.send(null),
                          !(
                            (a.status >= 200 && a.status < 300) ||
                            304 === a.status
                          ))
                        )
                          throw new Error(
                            "Couldn't load " + r + ". Status: " + a.status
                          );
                        return void 0 !== a.response
                          ? new Uint8Array(a.response || [])
                          : Rr(a.responseText || "", !0);
                      })(t, a)),
                    void 0 === u.chunks[e])
                  )
                    throw new Error("doXHR failed!");
                  return u.chunks[e];
                }),
                  (!i && n) ||
                    ((o = n = 1),
                    (n = this.getter(0).length),
                    (o = n),
                    l(
                      "LazyFiles on gzip forces download of the whole file when length is accessed"
                    )),
                  (this._length = n),
                  (this._chunkSize = o),
                  (this.lengthKnown = !0);
              }),
              "undefined" != typeof XMLHttpRequest)
            )
              throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
            var o = { isDevice: !1, url: r },
              u = Ae.createFile(e, t, o, n, a);
            o.contents
              ? (u.contents = o.contents)
              : o.url && ((u.contents = null), (u.url = o.url)),
              Object.defineProperties(u, {
                usedBytes: {
                  get: function () {
                    return this.contents.length;
                  }
                }
              });
            var s = {};
            return (
              Object.keys(u.stream_ops).forEach(function (e) {
                var t = u.stream_ops[e];
                s[e] = function () {
                  if (!Ae.forceLoadFile(u)) throw new Ae.ErrnoError(29);
                  return t.apply(null, arguments);
                };
              }),
              (s.read = function (e, t, r, n, a) {
                if (!Ae.forceLoadFile(u)) throw new Ae.ErrnoError(29);
                var i = e.node.contents;
                if (a >= i.length) return 0;
                var o = Math.min(i.length - a, n);
                if (i.slice) for (var s = 0; s < o; s++) t[r + s] = i[a + s];
                else for (s = 0; s < o; s++) t[r + s] = i.get(a + s);
                return o;
              }),
              (u.stream_ops = s),
              u
            );
          },
          createPreloadedFile: function (t, r, n, a, i, o, u, s, c, l) {
            ar.init();
            var f = r ? Pe.resolve(De.join2(t, r)) : t;
            function d(n) {
              function d(e) {
                l && l(),
                  s || Ae.createDataFile(t, r, e, a, i, c),
                  o && o(),
                  pe();
              }
              var m = !1;
              e.preloadPlugins.forEach(function (e) {
                m ||
                  (e.canHandle(f) &&
                    (e.handle(n, f, d, function () {
                      u && u(), pe();
                    }),
                    (m = !0)));
              }),
                m || d(n);
            }
            me(),
              "string" == typeof n
                ? ar.asyncLoad(
                    n,
                    function (e) {
                      d(e);
                    },
                    u
                  )
                : d(n);
          },
          indexedDB: function () {
            return (
              window.indexedDB ||
              window.mozIndexedDB ||
              window.webkitIndexedDB ||
              window.msIndexedDB
            );
          },
          DB_NAME: function () {
            return "EM_FS_" + window.location.pathname;
          },
          DB_VERSION: 20,
          DB_STORE_NAME: "FILE_DATA",
          saveFilesToDB: function (e, t, r) {
            (t = t || function () {}), (r = r || function () {});
            var n = Ae.indexedDB();
            try {
              var a = n.open(Ae.DB_NAME(), Ae.DB_VERSION);
            } catch (e) {
              return r(e);
            }
            (a.onupgradeneeded = function () {
              l("creating db"), a.result.createObjectStore(Ae.DB_STORE_NAME);
            }),
              (a.onsuccess = function () {
                var n = a.result.transaction([Ae.DB_STORE_NAME], "readwrite"),
                  i = n.objectStore(Ae.DB_STORE_NAME),
                  o = 0,
                  u = 0,
                  s = e.length;
                function c() {
                  0 == u ? t() : r();
                }
                e.forEach(function (e) {
                  var t = i.put(Ae.analyzePath(e).object.contents, e);
                  (t.onsuccess = function () {
                    ++o + u == s && c();
                  }),
                    (t.onerror = function () {
                      u++, o + u == s && c();
                    });
                }),
                  (n.onerror = r);
              }),
              (a.onerror = r);
          },
          loadFilesFromDB: function (e, t, r) {
            (t = t || function () {}), (r = r || function () {});
            var n = Ae.indexedDB();
            try {
              var a = n.open(Ae.DB_NAME(), Ae.DB_VERSION);
            } catch (e) {
              return r(e);
            }
            (a.onupgradeneeded = r),
              (a.onsuccess = function () {
                var n = a.result;
                try {
                  var i = n.transaction([Ae.DB_STORE_NAME], "readonly");
                } catch (e) {
                  return void r(e);
                }
                var o = i.objectStore(Ae.DB_STORE_NAME),
                  u = 0,
                  s = 0,
                  c = e.length;
                function l() {
                  0 == s ? t() : r();
                }
                e.forEach(function (e) {
                  var t = o.get(e);
                  (t.onsuccess = function () {
                    Ae.analyzePath(e).exists && Ae.unlink(e),
                      Ae.createDataFile(
                        De.dirname(e),
                        De.basename(e),
                        t.result,
                        !0,
                        !0,
                        !0
                      ),
                      ++u + s == c && l();
                  }),
                    (t.onerror = function () {
                      s++, u + s == c && l();
                    });
                }),
                  (i.onerror = r);
              }),
              (a.onerror = r);
          }
        },
        Le = {
          mappings: {},
          DEFAULT_POLLMASK: 5,
          umask: 511,
          calculateAt: function (e, t) {
            if ("/" !== t[0]) {
              var r;
              if (-100 === e) r = Ae.cwd();
              else {
                var n = Ae.getStream(e);
                if (!n) throw new Ae.ErrnoError(8);
                r = n.path;
              }
              t = De.join2(r, t);
            }
            return t;
          },
          doStat: function (e, t, r) {
            try {
              var n = e(t);
            } catch (e) {
              if (
                e &&
                e.node &&
                De.normalize(t) !== De.normalize(Ae.getPath(e.node))
              )
                return -54;
              throw e;
            }
            return (
              (O[r >> 2] = n.dev),
              (O[(r + 4) >> 2] = 0),
              (O[(r + 8) >> 2] = n.ino),
              (O[(r + 12) >> 2] = n.mode),
              (O[(r + 16) >> 2] = n.nlink),
              (O[(r + 20) >> 2] = n.uid),
              (O[(r + 24) >> 2] = n.gid),
              (O[(r + 28) >> 2] = n.rdev),
              (O[(r + 32) >> 2] = 0),
              (_e = [
                n.size >>> 0,
                ((ye = n.size),
                +oe(ye) >= 1
                  ? ye > 0
                    ? (0 | ce(+se(ye / 4294967296), 4294967295)) >>> 0
                    : ~~+ue((ye - +(~~ye >>> 0)) / 4294967296) >>> 0
                  : 0)
              ]),
              (O[(r + 40) >> 2] = _e[0]),
              (O[(r + 44) >> 2] = _e[1]),
              (O[(r + 48) >> 2] = 4096),
              (O[(r + 52) >> 2] = n.blocks),
              (O[(r + 56) >> 2] = (n.atime.getTime() / 1e3) | 0),
              (O[(r + 60) >> 2] = 0),
              (O[(r + 64) >> 2] = (n.mtime.getTime() / 1e3) | 0),
              (O[(r + 68) >> 2] = 0),
              (O[(r + 72) >> 2] = (n.ctime.getTime() / 1e3) | 0),
              (O[(r + 76) >> 2] = 0),
              (_e = [
                n.ino >>> 0,
                ((ye = n.ino),
                +oe(ye) >= 1
                  ? ye > 0
                    ? (0 | ce(+se(ye / 4294967296), 4294967295)) >>> 0
                    : ~~+ue((ye - +(~~ye >>> 0)) / 4294967296) >>> 0
                  : 0)
              ]),
              (O[(r + 80) >> 2] = _e[0]),
              (O[(r + 84) >> 2] = _e[1]),
              0
            );
          },
          doMsync: function (e, t, r, n, a) {
            var i = I.slice(e, e + r);
            Ae.msync(t, i, a, r, n);
          },
          doMkdir: function (e, t) {
            return (
              "/" === (e = De.normalize(e))[e.length - 1] &&
                (e = e.substr(0, e.length - 1)),
              Ae.mkdir(e, t, 0),
              0
            );
          },
          doMknod: function (e, t, r) {
            switch (61440 & t) {
              case 32768:
              case 8192:
              case 24576:
              case 4096:
              case 49152:
                break;
              default:
                return -28;
            }
            return Ae.mknod(e, t, r), 0;
          },
          doReadlink: function (e, t, r) {
            if (r <= 0) return -28;
            var n = Ae.readlink(e),
              a = Math.min(r, M(n)),
              i = L[t + a];
            return T(n, t, r + 1), (L[t + a] = i), a;
          },
          doAccess: function (e, t) {
            if (-8 & t) return -28;
            var r;
            if (!(r = Ae.lookupPath(e, { follow: !0 }).node)) return -44;
            var n = "";
            return (
              4 & t && (n += "r"),
              2 & t && (n += "w"),
              1 & t && (n += "x"),
              n && Ae.nodePermissions(r, n) ? -2 : 0
            );
          },
          doDup: function (e, t, r) {
            var n = Ae.getStream(r);
            return n && Ae.close(n), Ae.open(e, t, 0, r, r).fd;
          },
          doReadv: function (e, t, r, n) {
            for (var a = 0, i = 0; i < r; i++) {
              var o = O[(t + 8 * i) >> 2],
                u = O[(t + (8 * i + 4)) >> 2],
                s = Ae.read(e, L, o, u, n);
              if (s < 0) return -1;
              if (((a += s), s < u)) break;
            }
            return a;
          },
          doWritev: function (e, t, r, n) {
            for (var a = 0, i = 0; i < r; i++) {
              var o = O[(t + 8 * i) >> 2],
                u = O[(t + (8 * i + 4)) >> 2],
                s = Ae.write(e, L, o, u, n);
              if (s < 0) return -1;
              a += s;
            }
            return a;
          },
          varargs: void 0,
          get: function () {
            return (Le.varargs += 4), O[(Le.varargs - 4) >> 2];
          },
          getStr: function (e) {
            return D(e);
          },
          getStreamFromFD: function (e) {
            var t = Ae.getStream(e);
            if (!t) throw new Ae.ErrnoError(8);
            return t;
          },
          get64: function (e, t) {
            return e;
          }
        };
      function Ie(e) {
        switch (e) {
          case 1:
            return 0;
          case 2:
            return 1;
          case 4:
            return 2;
          case 8:
            return 3;
          default:
            throw new TypeError("Unknown type size: " + e);
        }
      }
      var Be = void 0;
      function Re(e) {
        for (var t = "", r = e; I[r]; ) t += Be[I[r++]];
        return t;
      }
      var Oe = {},
        Ne = {},
        Ue = {};
      function je(e) {
        if (void 0 === e) return "_unknown";
        var t = (e = e.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(0);
        return t >= 48 && t <= 57 ? "_" + e : e;
      }
      function ze(e, t) {
        return (
          (e = je(e)),
          new Function(
            "body",
            "return function " +
              e +
              '() {\n    "use strict";    return body.apply(this, arguments);\n};\n'
          )(t)
        );
      }
      function We(e, t) {
        var r = ze(t, function (e) {
          (this.name = t), (this.message = e);
          var r = new Error(e).stack;
          void 0 !== r &&
            (this.stack =
              this.toString() + "\n" + r.replace(/^Error(:[^\n]*)?\n/, ""));
        });
        return (
          (r.prototype = Object.create(e.prototype)),
          (r.prototype.constructor = r),
          (r.prototype.toString = function () {
            return void 0 === this.message
              ? this.name
              : this.name + ": " + this.message;
          }),
          r
        );
      }
      var Ge = void 0;
      function $e(e) {
        throw new Ge(e);
      }
      var qe = void 0;
      function Ve(e) {
        throw new qe(e);
      }
      function Ye(e, t, r) {
        function n(t) {
          var n = r(t);
          n.length !== e.length && Ve("Mismatched type converter count");
          for (var a = 0; a < e.length; ++a) Xe(e[a], n[a]);
        }
        e.forEach(function (e) {
          Ue[e] = t;
        });
        var a = new Array(t.length),
          i = [],
          o = 0;
        t.forEach(function (e, t) {
          Ne.hasOwnProperty(e)
            ? (a[t] = Ne[e])
            : (i.push(e),
              Oe.hasOwnProperty(e) || (Oe[e] = []),
              Oe[e].push(function () {
                (a[t] = Ne[e]), ++o === i.length && n(a);
              }));
        }),
          0 === i.length && n(a);
      }
      function Xe(e, t, r) {
        if (((r = r || {}), !("argPackAdvance" in t)))
          throw new TypeError(
            "registerType registeredInstance requires argPackAdvance"
          );
        var n = t.name;
        if (
          (e ||
            $e('type "' + n + '" must have a positive integer typeid pointer'),
          Ne.hasOwnProperty(e))
        ) {
          if (r.ignoreDuplicateRegistrations) return;
          $e("Cannot register type '" + n + "' twice");
        }
        if (((Ne[e] = t), delete Ue[e], Oe.hasOwnProperty(e))) {
          var a = Oe[e];
          delete Oe[e],
            a.forEach(function (e) {
              e();
            });
        }
      }
      function Qe(e) {
        if (!(this instanceof st)) return !1;
        if (!(e instanceof st)) return !1;
        for (
          var t = this.$$.ptrType.registeredClass,
            r = this.$$.ptr,
            n = e.$$.ptrType.registeredClass,
            a = e.$$.ptr;
          t.baseClass;

        )
          (r = t.upcast(r)), (t = t.baseClass);
        for (; n.baseClass; ) (a = n.upcast(a)), (n = n.baseClass);
        return t === n && r === a;
      }
      function He(e) {
        $e(e.$$.ptrType.registeredClass.name + " instance already deleted");
      }
      var Ke = !1;
      function Ze(e) {}
      function Je(e) {
        (e.count.value -= 1),
          0 === e.count.value &&
            (function (e) {
              e.smartPtr
                ? e.smartPtrType.rawDestructor(e.smartPtr)
                : e.ptrType.registeredClass.rawDestructor(e.ptr);
            })(e);
      }
      function et(e) {
        return "undefined" == typeof FinalizationGroup
          ? ((et = function (e) {
              return e;
            }),
            e)
          : ((Ke = new FinalizationGroup(function (e) {
              for (var t = e.next(); !t.done; t = e.next()) {
                var r = t.value;
                r.ptr
                  ? Je(r)
                  : console.warn("object already deleted: " + r.ptr);
              }
            })),
            (Ze = function (e) {
              Ke.unregister(e.$$);
            }),
            (et = function (e) {
              return Ke.register(e, e.$$, e.$$), e;
            })(e));
      }
      function tt() {
        if ((this.$$.ptr || He(this), this.$$.preservePointerOnDelete))
          return (this.$$.count.value += 1), this;
        var e,
          t = et(
            Object.create(Object.getPrototypeOf(this), {
              $$: {
                value:
                  ((e = this.$$),
                  {
                    count: e.count,
                    deleteScheduled: e.deleteScheduled,
                    preservePointerOnDelete: e.preservePointerOnDelete,
                    ptr: e.ptr,
                    ptrType: e.ptrType,
                    smartPtr: e.smartPtr,
                    smartPtrType: e.smartPtrType
                  })
              }
            })
          );
        return (t.$$.count.value += 1), (t.$$.deleteScheduled = !1), t;
      }
      function rt() {
        this.$$.ptr || He(this),
          this.$$.deleteScheduled &&
            !this.$$.preservePointerOnDelete &&
            $e("Object already scheduled for deletion"),
          Ze(this),
          Je(this.$$),
          this.$$.preservePointerOnDelete ||
            ((this.$$.smartPtr = void 0), (this.$$.ptr = void 0));
      }
      function nt() {
        return !this.$$.ptr;
      }
      var at = void 0,
        it = [];
      function ot() {
        for (; it.length; ) {
          var e = it.pop();
          (e.$$.deleteScheduled = !1), e.delete();
        }
      }
      function ut() {
        return (
          this.$$.ptr || He(this),
          this.$$.deleteScheduled &&
            !this.$$.preservePointerOnDelete &&
            $e("Object already scheduled for deletion"),
          it.push(this),
          1 === it.length && at && at(ot),
          (this.$$.deleteScheduled = !0),
          this
        );
      }
      function st() {}
      var ct = {};
      function lt(e, t, r) {
        if (void 0 === e[t].overloadTable) {
          var n = e[t];
          (e[t] = function () {
            return (
              e[t].overloadTable.hasOwnProperty(arguments.length) ||
                $e(
                  "Function '" +
                    r +
                    "' called with an invalid number of arguments (" +
                    arguments.length +
                    ") - expects one of (" +
                    e[t].overloadTable +
                    ")!"
                ),
              e[t].overloadTable[arguments.length].apply(this, arguments)
            );
          }),
            (e[t].overloadTable = []),
            (e[t].overloadTable[n.argCount] = n);
        }
      }
      function ft(t, r, n) {
        e.hasOwnProperty(t)
          ? ((void 0 === n ||
              (void 0 !== e[t].overloadTable &&
                void 0 !== e[t].overloadTable[n])) &&
              $e("Cannot register public name '" + t + "' twice"),
            lt(e, t, t),
            e.hasOwnProperty(n) &&
              $e(
                "Cannot register multiple overloads of a function with the same number of arguments (" +
                  n +
                  ")!"
              ),
            (e[t].overloadTable[n] = r))
          : ((e[t] = r), void 0 !== n && (e[t].numArguments = n));
      }
      function dt(e, t, r, n, a, i, o, u) {
        (this.name = e),
          (this.constructor = t),
          (this.instancePrototype = r),
          (this.rawDestructor = n),
          (this.baseClass = a),
          (this.getActualType = i),
          (this.upcast = o),
          (this.downcast = u),
          (this.pureVirtualFunctions = []);
      }
      function mt(e, t, r) {
        for (; t !== r; )
          t.upcast ||
            $e(
              "Expected null or instance of " +
                r.name +
                ", got an instance of " +
                t.name
            ),
            (e = t.upcast(e)),
            (t = t.baseClass);
        return e;
      }
      function pt(e, t) {
        if (null === t)
          return this.isReference && $e("null is not a valid " + this.name), 0;
        t.$$ || $e('Cannot pass "' + Xt(t) + '" as a ' + this.name),
          t.$$.ptr ||
            $e("Cannot pass deleted object as a pointer of type " + this.name);
        var r = t.$$.ptrType.registeredClass;
        return mt(t.$$.ptr, r, this.registeredClass);
      }
      function vt(e, t) {
        var r;
        if (null === t)
          return (
            this.isReference && $e("null is not a valid " + this.name),
            this.isSmartPointer
              ? ((r = this.rawConstructor()),
                null !== e && e.push(this.rawDestructor, r),
                r)
              : 0
          );
        t.$$ || $e('Cannot pass "' + Xt(t) + '" as a ' + this.name),
          t.$$.ptr ||
            $e("Cannot pass deleted object as a pointer of type " + this.name),
          !this.isConst &&
            t.$$.ptrType.isConst &&
            $e(
              "Cannot convert argument of type " +
                (t.$$.smartPtrType
                  ? t.$$.smartPtrType.name
                  : t.$$.ptrType.name) +
                " to parameter type " +
                this.name
            );
        var n = t.$$.ptrType.registeredClass;
        if (((r = mt(t.$$.ptr, n, this.registeredClass)), this.isSmartPointer))
          switch (
            (void 0 === t.$$.smartPtr &&
              $e("Passing raw pointer to smart pointer is illegal"),
            this.sharingPolicy)
          ) {
            case 0:
              t.$$.smartPtrType === this
                ? (r = t.$$.smartPtr)
                : $e(
                    "Cannot convert argument of type " +
                      (t.$$.smartPtrType
                        ? t.$$.smartPtrType.name
                        : t.$$.ptrType.name) +
                      " to parameter type " +
                      this.name
                  );
              break;
            case 1:
              r = t.$$.smartPtr;
              break;
            case 2:
              if (t.$$.smartPtrType === this) r = t.$$.smartPtr;
              else {
                var a = t.clone();
                (r = this.rawShare(
                  r,
                  qt(function () {
                    a.delete();
                  })
                )),
                  null !== e && e.push(this.rawDestructor, r);
              }
              break;
            default:
              $e("Unsupporting sharing policy");
          }
        return r;
      }
      function ht(e, t) {
        if (null === t)
          return this.isReference && $e("null is not a valid " + this.name), 0;
        t.$$ || $e('Cannot pass "' + Xt(t) + '" as a ' + this.name),
          t.$$.ptr ||
            $e("Cannot pass deleted object as a pointer of type " + this.name),
          t.$$.ptrType.isConst &&
            $e(
              "Cannot convert argument of type " +
                t.$$.ptrType.name +
                " to parameter type " +
                this.name
            );
        var r = t.$$.ptrType.registeredClass;
        return mt(t.$$.ptr, r, this.registeredClass);
      }
      function gt(e) {
        return this.fromWireType(N[e >> 2]);
      }
      function yt(e) {
        return this.rawGetPointee && (e = this.rawGetPointee(e)), e;
      }
      function _t(e) {
        this.rawDestructor && this.rawDestructor(e);
      }
      function wt(e) {
        null !== e && e.delete();
      }
      function bt(e, t, r) {
        if (t === r) return e;
        if (void 0 === r.baseClass) return null;
        var n = bt(e, t, r.baseClass);
        return null === n ? null : r.downcast(n);
      }
      function Ct() {
        return Object.keys(xt).length;
      }
      function Et() {
        var e = [];
        for (var t in xt) xt.hasOwnProperty(t) && e.push(xt[t]);
        return e;
      }
      function kt(e) {
        (at = e), it.length && at && at(ot);
      }
      var xt = {};
      function Ft(e, t) {
        return (
          (t = (function (e, t) {
            for (
              void 0 === t && $e("ptr should not be undefined");
              e.baseClass;

            )
              (t = e.upcast(t)), (e = e.baseClass);
            return t;
          })(e, t)),
          xt[t]
        );
      }
      function St(e, t) {
        return (
          (t.ptrType && t.ptr) ||
            Ve("makeClassHandle requires ptr and ptrType"),
          !!t.smartPtrType != !!t.smartPtr &&
            Ve("Both smartPtrType and smartPtr must be specified"),
          (t.count = { value: 1 }),
          et(Object.create(e, { $$: { value: t } }))
        );
      }
      function Dt(e) {
        var t = this.getPointee(e);
        if (!t) return this.destructor(e), null;
        var r = Ft(this.registeredClass, t);
        if (void 0 !== r) {
          if (0 === r.$$.count.value)
            return (r.$$.ptr = t), (r.$$.smartPtr = e), r.clone();
          var n = r.clone();
          return this.destructor(e), n;
        }
        function a() {
          return this.isSmartPointer
            ? St(this.registeredClass.instancePrototype, {
                ptrType: this.pointeeType,
                ptr: t,
                smartPtrType: this,
                smartPtr: e
              })
            : St(this.registeredClass.instancePrototype, {
                ptrType: this,
                ptr: e
              });
        }
        var i,
          o = this.registeredClass.getActualType(t),
          u = ct[o];
        if (!u) return a.call(this);
        i = this.isConst ? u.constPointerType : u.pointerType;
        var s = bt(t, this.registeredClass, i.registeredClass);
        return null === s
          ? a.call(this)
          : this.isSmartPointer
          ? St(i.registeredClass.instancePrototype, {
              ptrType: i,
              ptr: s,
              smartPtrType: this,
              smartPtr: e
            })
          : St(i.registeredClass.instancePrototype, { ptrType: i, ptr: s });
      }
      function Pt(e, t, r, n, a, i, o, u, s, c, l) {
        (this.name = e),
          (this.registeredClass = t),
          (this.isReference = r),
          (this.isConst = n),
          (this.isSmartPointer = a),
          (this.pointeeType = i),
          (this.sharingPolicy = o),
          (this.rawGetPointee = u),
          (this.rawConstructor = s),
          (this.rawShare = c),
          (this.rawDestructor = l),
          a || void 0 !== t.baseClass
            ? (this.toWireType = vt)
            : n
            ? ((this.toWireType = pt), (this.destructorFunction = null))
            : ((this.toWireType = ht), (this.destructorFunction = null));
      }
      function Tt(t, r, n) {
        e.hasOwnProperty(t) || Ve("Replacing nonexistant public symbol"),
          void 0 !== e[t].overloadTable && void 0 !== n
            ? (e[t].overloadTable[n] = r)
            : ((e[t] = r), (e[t].argCount = n));
      }
      function Mt(t, r) {
        t = Re(t);
        var n = (function (e) {
          for (var n = [], a = 1; a < t.length; ++a) n.push("a" + a);
          var i =
            "return function dynCall_" +
            t +
            "_" +
            r +
            "(" +
            n.join(", ") +
            ") {\n";
          return (
            (i +=
              "    return dynCall(rawFunction" +
              (n.length ? ", " : "") +
              n.join(", ") +
              ");\n"),
            (i += "};\n"),
            new Function("dynCall", "rawFunction", i)(e, r)
          );
        })(e["dynCall_" + t]);
        return (
          "function" != typeof n &&
            $e("unknown function pointer with signature " + t + ": " + r),
          n
        );
      }
      var At = void 0;
      function Lt(e) {
        var t = Kr(e),
          r = Re(t);
        return Gr(t), r;
      }
      function It(e, t) {
        var r = [],
          n = {};
        throw (
          (t.forEach(function e(t) {
            n[t] ||
              Ne[t] ||
              (Ue[t] ? Ue[t].forEach(e) : (r.push(t), (n[t] = !0)));
          }),
          new At(e + ": " + r.map(Lt).join([", "])))
        );
      }
      function Bt(e, t) {
        if (!(e instanceof Function))
          throw new TypeError(
            "new_ called with constructor type " +
              typeof e +
              " which is not a function"
          );
        var r = ze(e.name || "unknownFunctionName", function () {});
        r.prototype = e.prototype;
        var n = new r(),
          a = e.apply(n, t);
        return a instanceof Object ? a : n;
      }
      function Rt(e) {
        for (; e.length; ) {
          var t = e.pop();
          e.pop()(t);
        }
      }
      function Ot(e, t, r, n, a) {
        var i = t.length;
        i < 2 &&
          $e(
            "argTypes array size mismatch! Must at least get return value and 'this' types!"
          );
        for (
          var o = null !== t[1] && null !== r, u = !1, s = 1;
          s < t.length;
          ++s
        )
          if (null !== t[s] && void 0 === t[s].destructorFunction) {
            u = !0;
            break;
          }
        var c = "void" !== t[0].name,
          l = "",
          f = "";
        for (s = 0; s < i - 2; ++s)
          (l += (0 !== s ? ", " : "") + "arg" + s),
            (f += (0 !== s ? ", " : "") + "arg" + s + "Wired");
        var d =
          "return function " +
          je(e) +
          "(" +
          l +
          ") {\nif (arguments.length !== " +
          (i - 2) +
          ") {\nthrowBindingError('function " +
          e +
          " called with ' + arguments.length + ' arguments, expected " +
          (i - 2) +
          " args!');\n}\n";
        u && (d += "var destructors = [];\n");
        var m = u ? "destructors" : "null",
          p = [
            "throwBindingError",
            "invoker",
            "fn",
            "runDestructors",
            "retType",
            "classParam"
          ],
          v = [$e, n, a, Rt, t[0], t[1]];
        for (
          o &&
            (d += "var thisWired = classParam.toWireType(" + m + ", this);\n"),
            s = 0;
          s < i - 2;
          ++s
        )
          (d +=
            "var arg" +
            s +
            "Wired = argType" +
            s +
            ".toWireType(" +
            m +
            ", arg" +
            s +
            "); // " +
            t[s + 2].name +
            "\n"),
            p.push("argType" + s),
            v.push(t[s + 2]);
        if (
          (o && (f = "thisWired" + (f.length > 0 ? ", " : "") + f),
          (d +=
            (c ? "var rv = " : "") +
            "invoker(fn" +
            (f.length > 0 ? ", " : "") +
            f +
            ");\n"),
          u)
        )
          d += "runDestructors(destructors);\n";
        else
          for (s = o ? 1 : 2; s < t.length; ++s) {
            var h = 1 === s ? "thisWired" : "arg" + (s - 2) + "Wired";
            null !== t[s].destructorFunction &&
              ((d += h + "_dtor(" + h + "); // " + t[s].name + "\n"),
              p.push(h + "_dtor"),
              v.push(t[s].destructorFunction));
          }
        return (
          c && (d += "var ret = retType.fromWireType(rv);\nreturn ret;\n"),
          (d += "}\n"),
          p.push(d),
          Bt(Function, p).apply(null, v)
        );
      }
      function Nt(e, t) {
        for (var r = [], n = 0; n < e; n++) r.push(O[(t >> 2) + n]);
        return r;
      }
      function Ut(e, t, r) {
        return (
          e instanceof Object || $e(r + ' with invalid "this": ' + e),
          e instanceof t.registeredClass.constructor ||
            $e(r + ' incompatible with "this" of type ' + e.constructor.name),
          e.$$.ptr ||
            $e(
              "cannot call emscripten binding method " +
                r +
                " on deleted object"
            ),
          mt(e.$$.ptr, e.$$.ptrType.registeredClass, t.registeredClass)
        );
      }
      var jt = [],
        zt = [
          {},
          { value: void 0 },
          { value: null },
          { value: !0 },
          { value: !1 }
        ];
      function Wt(e) {
        e > 4 && 0 == --zt[e].refcount && ((zt[e] = void 0), jt.push(e));
      }
      function Gt() {
        for (var e = 0, t = 5; t < zt.length; ++t) void 0 !== zt[t] && ++e;
        return e;
      }
      function $t() {
        for (var e = 5; e < zt.length; ++e) if (void 0 !== zt[e]) return zt[e];
        return null;
      }
      function qt(e) {
        switch (e) {
          case void 0:
            return 1;
          case null:
            return 2;
          case !0:
            return 3;
          case !1:
            return 4;
          default:
            var t = jt.length ? jt.pop() : zt.length;
            return (zt[t] = { refcount: 1, value: e }), t;
        }
      }
      function Vt(e, t, r) {
        switch (t) {
          case 0:
            return function (e) {
              var t = r ? L : I;
              return this.fromWireType(t[e]);
            };
          case 1:
            return function (e) {
              var t = r ? B : R;
              return this.fromWireType(t[e >> 1]);
            };
          case 2:
            return function (e) {
              var t = r ? O : N;
              return this.fromWireType(t[e >> 2]);
            };
          default:
            throw new TypeError("Unknown integer type: " + e);
        }
      }
      function Yt(e, t) {
        var r = Ne[e];
        return void 0 === r && $e(t + " has unknown type " + Lt(e)), r;
      }
      function Xt(e) {
        if (null === e) return "null";
        var t = typeof e;
        return "object" === t || "array" === t || "function" === t
          ? e.toString()
          : "" + e;
      }
      function Qt(e, t) {
        switch (t) {
          case 2:
            return function (e) {
              return this.fromWireType(U[e >> 2]);
            };
          case 3:
            return function (e) {
              return this.fromWireType(j[e >> 3]);
            };
          default:
            throw new TypeError("Unknown float type: " + e);
        }
      }
      function Ht(e, t, r) {
        switch (t) {
          case 0:
            return r
              ? function (e) {
                  return L[e];
                }
              : function (e) {
                  return I[e];
                };
          case 1:
            return r
              ? function (e) {
                  return B[e >> 1];
                }
              : function (e) {
                  return R[e >> 1];
                };
          case 2:
            return r
              ? function (e) {
                  return O[e >> 2];
                }
              : function (e) {
                  return N[e >> 2];
                };
          default:
            throw new TypeError("Unknown integer type: " + e);
        }
      }
      function Kt(e) {
        return e || $e("Cannot use deleted val. handle = " + e), zt[e].value;
      }
      function Zt(e, t) {
        for (var r = new Array(e), n = 0; n < e; ++n)
          r[n] = Yt(O[(t >> 2) + n], "parameter " + n);
        return r;
      }
      var Jt = {};
      function er(e) {
        var t = Jt[e];
        return void 0 === t ? Re(e) : t;
      }
      var tr,
        rr = [];
      function nr(e, t) {
        if (
          ((ar.mainLoop.timingMode = e),
          (ar.mainLoop.timingValue = t),
          !ar.mainLoop.func)
        )
          return 1;
        if (0 == e)
          (ar.mainLoop.scheduler = function () {
            var e = 0 | Math.max(0, ar.mainLoop.tickStartTime + t - tr());
            setTimeout(ar.mainLoop.runner, e);
          }),
            (ar.mainLoop.method = "timeout");
        else if (1 == e)
          (ar.mainLoop.scheduler = function () {
            ar.requestAnimationFrame(ar.mainLoop.runner);
          }),
            (ar.mainLoop.method = "rAF");
        else if (2 == e) {
          if ("undefined" == typeof setImmediate) {
            var r = [],
              n = "setimmediate";
            addEventListener(
              "message",
              function (e) {
                (e.data !== n && e.data.target !== n) ||
                  (e.stopPropagation(), r.shift()());
              },
              !0
            ),
              (setImmediate = function (e) {
                r.push(e), postMessage(n, "*");
              });
          }
          (ar.mainLoop.scheduler = function () {
            setImmediate(ar.mainLoop.runner);
          }),
            (ar.mainLoop.method = "immediate");
        }
        return 0;
      }
      tr = function () {
        return performance.now();
      };
      var ar = {
          mainLoop: {
            scheduler: null,
            method: "",
            currentlyRunningMainloop: 0,
            func: null,
            arg: 0,
            timingMode: 0,
            timingValue: 0,
            currentFrameNumber: 0,
            queue: [],
            pause: function () {
              (ar.mainLoop.scheduler = null),
                ar.mainLoop.currentlyRunningMainloop++;
            },
            resume: function () {
              ar.mainLoop.currentlyRunningMainloop++;
              var t = ar.mainLoop.timingMode,
                r = ar.mainLoop.timingValue,
                n = ar.mainLoop.func;
              (ar.mainLoop.func = null),
                (function (t, r, n, a, i) {
                  var o;
                  (h = !0),
                    k(
                      !ar.mainLoop.func,
                      "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters."
                    ),
                    (ar.mainLoop.func = t),
                    (ar.mainLoop.arg = a),
                    (o =
                      void 0 !== a
                        ? function () {
                            e.dynCall_vi(t, a);
                          }
                        : function () {
                            e.dynCall_v(t);
                          });
                  var u = ar.mainLoop.currentlyRunningMainloop;
                  if (
                    ((ar.mainLoop.runner = function () {
                      if (!E)
                        if (ar.mainLoop.queue.length > 0) {
                          var e = Date.now(),
                            t = ar.mainLoop.queue.shift();
                          if ((t.func(t.arg), ar.mainLoop.remainingBlockers)) {
                            var r = ar.mainLoop.remainingBlockers,
                              n = r % 1 == 0 ? r - 1 : Math.floor(r);
                            t.counted
                              ? (ar.mainLoop.remainingBlockers = n)
                              : ((n += 0.5),
                                (ar.mainLoop.remainingBlockers =
                                  (8 * r + n) / 9));
                          }
                          if (
                            (console.log(
                              'main loop blocker "' +
                                t.name +
                                '" took ' +
                                (Date.now() - e) +
                                " ms"
                            ),
                            ar.mainLoop.updateStatus(),
                            u < ar.mainLoop.currentlyRunningMainloop)
                          )
                            return;
                          setTimeout(ar.mainLoop.runner, 0);
                        } else
                          u < ar.mainLoop.currentlyRunningMainloop ||
                            ((ar.mainLoop.currentFrameNumber =
                              (ar.mainLoop.currentFrameNumber + 1) | 0),
                            1 == ar.mainLoop.timingMode &&
                            ar.mainLoop.timingValue > 1 &&
                            ar.mainLoop.currentFrameNumber %
                              ar.mainLoop.timingValue !=
                              0
                              ? ar.mainLoop.scheduler()
                              : (0 == ar.mainLoop.timingMode &&
                                  (ar.mainLoop.tickStartTime = tr()),
                                ar.mainLoop.runIter(o),
                                u < ar.mainLoop.currentlyRunningMainloop ||
                                  ("object" == typeof SDL &&
                                    SDL.audio &&
                                    SDL.audio.queueNewAudioData &&
                                    SDL.audio.queueNewAudioData(),
                                  ar.mainLoop.scheduler())));
                    }),
                    i ||
                      (r && r > 0 ? nr(0, 1e3 / r) : nr(1, 1),
                      ar.mainLoop.scheduler()),
                    n)
                  )
                    throw "unwind";
                })(n, 0, !1, ar.mainLoop.arg, !0),
                nr(t, r),
                ar.mainLoop.scheduler();
            },
            updateStatus: function () {
              if (e.setStatus) {
                var t = e.statusMessage || "Please wait...",
                  r = ar.mainLoop.remainingBlockers,
                  n = ar.mainLoop.expectedBlockers;
                r
                  ? r < n
                    ? e.setStatus(t + " (" + (n - r) + "/" + n + ")")
                    : e.setStatus(t)
                  : e.setStatus("");
              }
            },
            runIter: function (t) {
              if (!E) {
                if (e.preMainLoop && !1 === e.preMainLoop()) return;
                try {
                  t();
                } catch (e) {
                  if (e instanceof cn) return;
                  throw (
                    (e &&
                      "object" == typeof e &&
                      e.stack &&
                      f("exception thrown: " + [e, e.stack]),
                    e)
                  );
                }
                e.postMainLoop && e.postMainLoop();
              }
            }
          },
          isFullscreen: !1,
          pointerLock: !1,
          moduleContextCreatedCallbacks: [],
          workers: [],
          init: function () {
            if ((e.preloadPlugins || (e.preloadPlugins = []), !ar.initted)) {
              ar.initted = !0;
              try {
                new Blob(), (ar.hasBlobConstructor = !0);
              } catch (e) {
                (ar.hasBlobConstructor = !1),
                  console.log(
                    "warning: no blob constructor, cannot create blobs with mimetypes"
                  );
              }
              (ar.BlobBuilder =
                "undefined" != typeof MozBlobBuilder
                  ? MozBlobBuilder
                  : "undefined" != typeof WebKitBlobBuilder
                  ? WebKitBlobBuilder
                  : ar.hasBlobConstructor
                  ? null
                  : console.log("warning: no BlobBuilder")),
                (ar.URLObject =
                  "undefined" != typeof window
                    ? window.URL
                      ? window.URL
                      : window.webkitURL
                    : void 0),
                e.noImageDecoding ||
                  void 0 !== ar.URLObject ||
                  (console.log(
                    "warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."
                  ),
                  (e.noImageDecoding = !0));
              var t = {
                canHandle: function (t) {
                  return !e.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(t);
                },
                handle: function (t, r, n, a) {
                  var i = null;
                  if (ar.hasBlobConstructor)
                    try {
                      (i = new Blob([t], { type: ar.getMimetype(r) })).size !==
                        t.length &&
                        (i = new Blob([new Uint8Array(t).buffer], {
                          type: ar.getMimetype(r)
                        }));
                    } catch (e) {
                      p(
                        "Blob constructor present but fails: " +
                          e +
                          "; falling back to blob builder"
                      );
                    }
                  if (!i) {
                    var o = new ar.BlobBuilder();
                    o.append(new Uint8Array(t).buffer), (i = o.getBlob());
                  }
                  var u = ar.URLObject.createObjectURL(i),
                    s = new Image();
                  (s.onload = function () {
                    k(s.complete, "Image " + r + " could not be decoded");
                    var a = document.createElement("canvas");
                    (a.width = s.width),
                      (a.height = s.height),
                      a.getContext("2d").drawImage(s, 0, 0),
                      (e.preloadedImages[r] = a),
                      ar.URLObject.revokeObjectURL(u),
                      n && n(t);
                  }),
                    (s.onerror = function (e) {
                      console.log("Image " + u + " could not be decoded"),
                        a && a();
                    }),
                    (s.src = u);
                }
              };
              e.preloadPlugins.push(t);
              var r = {
                canHandle: function (t) {
                  return (
                    !e.noAudioDecoding &&
                    t.substr(-4) in { ".ogg": 1, ".wav": 1, ".mp3": 1 }
                  );
                },
                handle: function (t, r, n, a) {
                  var i = !1;
                  function o(a) {
                    i || ((i = !0), (e.preloadedAudios[r] = a), n && n(t));
                  }
                  function u() {
                    i ||
                      ((i = !0),
                      (e.preloadedAudios[r] = new Audio()),
                      a && a());
                  }
                  if (!ar.hasBlobConstructor) return u();
                  try {
                    var s = new Blob([t], { type: ar.getMimetype(r) });
                  } catch (e) {
                    return u();
                  }
                  var c = ar.URLObject.createObjectURL(s),
                    l = new Audio();
                  l.addEventListener(
                    "canplaythrough",
                    function () {
                      o(l);
                    },
                    !1
                  ),
                    (l.onerror = function (e) {
                      i ||
                        (console.log(
                          "warning: browser could not fully decode audio " +
                            r +
                            ", trying slower base64 approach"
                        ),
                        (l.src =
                          "data:audio/x-" +
                          r.substr(-3) +
                          ";base64," +
                          (function (e) {
                            for (
                              var t =
                                  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                                r = "",
                                n = 0,
                                a = 0,
                                i = 0;
                              i < e.length;
                              i++
                            )
                              for (n = (n << 8) | e[i], a += 8; a >= 6; ) {
                                var o = (n >> (a - 6)) & 63;
                                (a -= 6), (r += t[o]);
                              }
                            return (
                              2 == a
                                ? ((r += t[(3 & n) << 4]), (r += "=="))
                                : 4 == a &&
                                  ((r += t[(15 & n) << 2]), (r += "=")),
                              r
                            );
                          })(t)),
                        o(l));
                    }),
                    (l.src = c),
                    ar.safeSetTimeout(function () {
                      o(l);
                    }, 1e4);
                }
              };
              e.preloadPlugins.push(r);
              var n = e.canvas;
              n &&
                ((n.requestPointerLock =
                  n.requestPointerLock ||
                  n.mozRequestPointerLock ||
                  n.webkitRequestPointerLock ||
                  n.msRequestPointerLock ||
                  function () {}),
                (n.exitPointerLock =
                  document.exitPointerLock ||
                  document.mozExitPointerLock ||
                  document.webkitExitPointerLock ||
                  document.msExitPointerLock ||
                  function () {}),
                (n.exitPointerLock = n.exitPointerLock.bind(document)),
                document.addEventListener("pointerlockchange", a, !1),
                document.addEventListener("mozpointerlockchange", a, !1),
                document.addEventListener("webkitpointerlockchange", a, !1),
                document.addEventListener("mspointerlockchange", a, !1),
                e.elementPointerLock &&
                  n.addEventListener(
                    "click",
                    function (t) {
                      !ar.pointerLock &&
                        e.canvas.requestPointerLock &&
                        (e.canvas.requestPointerLock(), t.preventDefault());
                    },
                    !1
                  ));
            }
            function a() {
              ar.pointerLock =
                document.pointerLockElement === e.canvas ||
                document.mozPointerLockElement === e.canvas ||
                document.webkitPointerLockElement === e.canvas ||
                document.msPointerLockElement === e.canvas;
            }
          },
          createContext: function (t, r, n, a) {
            if (r && e.ctx && t == e.canvas) return e.ctx;
            var i, o;
            if (r) {
              var u = {
                antialias: !1,
                alpha: !1,
                majorVersion:
                  "undefined" != typeof WebGL2RenderingContext ? 2 : 1
              };
              if (a) for (var s in a) u[s] = a[s];
              void 0 !== fr &&
                (o = fr.createContext(t, u)) &&
                (i = fr.getContext(o).GLctx);
            } else i = t.getContext("2d");
            return i
              ? (n &&
                  (r ||
                    k(
                      void 0 === Mr,
                      "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"
                    ),
                  (e.ctx = i),
                  r && fr.makeContextCurrent(o),
                  (e.useWebGL = r),
                  ar.moduleContextCreatedCallbacks.forEach(function (e) {
                    e();
                  }),
                  ar.init()),
                i)
              : null;
          },
          destroyContext: function (e, t, r) {},
          fullscreenHandlersInstalled: !1,
          lockPointer: void 0,
          resizeCanvas: void 0,
          requestFullscreen: function (t, r) {
            (ar.lockPointer = t),
              (ar.resizeCanvas = r),
              void 0 === ar.lockPointer && (ar.lockPointer = !0),
              void 0 === ar.resizeCanvas && (ar.resizeCanvas = !1);
            var n = e.canvas;
            function a() {
              ar.isFullscreen = !1;
              var t = n.parentNode;
              (document.fullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement ||
                document.webkitFullscreenElement ||
                document.webkitCurrentFullScreenElement) === t
                ? ((n.exitFullscreen = ar.exitFullscreen),
                  ar.lockPointer && n.requestPointerLock(),
                  (ar.isFullscreen = !0),
                  ar.resizeCanvas
                    ? ar.setFullscreenCanvasSize()
                    : ar.updateCanvasDimensions(n))
                : (t.parentNode.insertBefore(n, t),
                  t.parentNode.removeChild(t),
                  ar.resizeCanvas
                    ? ar.setWindowedCanvasSize()
                    : ar.updateCanvasDimensions(n)),
                e.onFullScreen && e.onFullScreen(ar.isFullscreen),
                e.onFullscreen && e.onFullscreen(ar.isFullscreen);
            }
            ar.fullscreenHandlersInstalled ||
              ((ar.fullscreenHandlersInstalled = !0),
              document.addEventListener("fullscreenchange", a, !1),
              document.addEventListener("mozfullscreenchange", a, !1),
              document.addEventListener("webkitfullscreenchange", a, !1),
              document.addEventListener("MSFullscreenChange", a, !1));
            var i = document.createElement("div");
            n.parentNode.insertBefore(i, n),
              i.appendChild(n),
              (i.requestFullscreen =
                i.requestFullscreen ||
                i.mozRequestFullScreen ||
                i.msRequestFullscreen ||
                (i.webkitRequestFullscreen
                  ? function () {
                      i.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                  : null) ||
                (i.webkitRequestFullScreen
                  ? function () {
                      i.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                  : null)),
              i.requestFullscreen();
          },
          exitFullscreen: function () {
            return (
              !!ar.isFullscreen &&
              ((
                document.exitFullscreen ||
                document.cancelFullScreen ||
                document.mozCancelFullScreen ||
                document.msExitFullscreen ||
                document.webkitCancelFullScreen ||
                function () {}
              ).apply(document, []),
              !0)
            );
          },
          nextRAF: 0,
          fakeRequestAnimationFrame: function (e) {
            var t = Date.now();
            if (0 === ar.nextRAF) ar.nextRAF = t + 1e3 / 60;
            else for (; t + 2 >= ar.nextRAF; ) ar.nextRAF += 1e3 / 60;
            var r = Math.max(ar.nextRAF - t, 0);
            setTimeout(e, r);
          },
          requestAnimationFrame: function (e) {
            "function" != typeof requestAnimationFrame
              ? (0, ar.fakeRequestAnimationFrame)(e)
              : requestAnimationFrame(e);
          },
          safeCallback: function (e) {
            return function () {
              if (!E) return e.apply(null, arguments);
            };
          },
          allowAsyncCallbacks: !0,
          queuedAsyncCallbacks: [],
          pauseAsyncCallbacks: function () {
            ar.allowAsyncCallbacks = !1;
          },
          resumeAsyncCallbacks: function () {
            if (
              ((ar.allowAsyncCallbacks = !0),
              ar.queuedAsyncCallbacks.length > 0)
            ) {
              var e = ar.queuedAsyncCallbacks;
              (ar.queuedAsyncCallbacks = []),
                e.forEach(function (e) {
                  e();
                });
            }
          },
          safeRequestAnimationFrame: function (e) {
            return ar.requestAnimationFrame(function () {
              E ||
                (ar.allowAsyncCallbacks
                  ? e()
                  : ar.queuedAsyncCallbacks.push(e));
            });
          },
          safeSetTimeout: function (e, t) {
            return (
              (h = !0),
              setTimeout(function () {
                E ||
                  (ar.allowAsyncCallbacks
                    ? e()
                    : ar.queuedAsyncCallbacks.push(e));
              }, t)
            );
          },
          safeSetInterval: function (e, t) {
            return (
              (h = !0),
              setInterval(function () {
                E || (ar.allowAsyncCallbacks && e());
              }, t)
            );
          },
          getMimetype: function (e) {
            return {
              jpg: "image/jpeg",
              jpeg: "image/jpeg",
              png: "image/png",
              bmp: "image/bmp",
              ogg: "audio/ogg",
              wav: "audio/wav",
              mp3: "audio/mpeg"
            }[e.substr(e.lastIndexOf(".") + 1)];
          },
          getUserMedia: function (e) {
            window.getUserMedia ||
              (window.getUserMedia =
                navigator.getUserMedia || navigator.mozGetUserMedia),
              window.getUserMedia(e);
          },
          getMovementX: function (e) {
            return e.movementX || e.mozMovementX || e.webkitMovementX || 0;
          },
          getMovementY: function (e) {
            return e.movementY || e.mozMovementY || e.webkitMovementY || 0;
          },
          getMouseWheelDelta: function (e) {
            var t = 0;
            switch (e.type) {
              case "DOMMouseScroll":
                t = e.detail / 3;
                break;
              case "mousewheel":
                t = e.wheelDelta / 120;
                break;
              case "wheel":
                switch (((t = e.deltaY), e.deltaMode)) {
                  case 0:
                    t /= 100;
                    break;
                  case 1:
                    t /= 3;
                    break;
                  case 2:
                    t *= 80;
                    break;
                  default:
                    throw "unrecognized mouse wheel delta mode: " + e.deltaMode;
                }
                break;
              default:
                throw "unrecognized mouse wheel event: " + e.type;
            }
            return t;
          },
          mouseX: 0,
          mouseY: 0,
          mouseMovementX: 0,
          mouseMovementY: 0,
          touches: {},
          lastTouches: {},
          calculateMouseEvent: function (t) {
            if (ar.pointerLock)
              "mousemove" != t.type && "mozMovementX" in t
                ? (ar.mouseMovementX = ar.mouseMovementY = 0)
                : ((ar.mouseMovementX = ar.getMovementX(t)),
                  (ar.mouseMovementY = ar.getMovementY(t))),
                "undefined" != typeof SDL
                  ? ((ar.mouseX = SDL.mouseX + ar.mouseMovementX),
                    (ar.mouseY = SDL.mouseY + ar.mouseMovementY))
                  : ((ar.mouseX += ar.mouseMovementX),
                    (ar.mouseY += ar.mouseMovementY));
            else {
              var r = e.canvas.getBoundingClientRect(),
                n = e.canvas.width,
                a = e.canvas.height,
                i =
                  void 0 !== window.scrollX
                    ? window.scrollX
                    : window.pageXOffset,
                o =
                  void 0 !== window.scrollY
                    ? window.scrollY
                    : window.pageYOffset;
              if (
                "touchstart" === t.type ||
                "touchend" === t.type ||
                "touchmove" === t.type
              ) {
                var u = t.touch;
                if (void 0 === u) return;
                var s = u.pageX - (i + r.left),
                  c = u.pageY - (o + r.top),
                  l = { x: (s *= n / r.width), y: (c *= a / r.height) };
                if ("touchstart" === t.type)
                  (ar.lastTouches[u.identifier] = l),
                    (ar.touches[u.identifier] = l);
                else if ("touchend" === t.type || "touchmove" === t.type) {
                  var f = ar.touches[u.identifier];
                  f || (f = l),
                    (ar.lastTouches[u.identifier] = f),
                    (ar.touches[u.identifier] = l);
                }
                return;
              }
              var d = t.pageX - (i + r.left),
                m = t.pageY - (o + r.top);
              (d *= n / r.width),
                (m *= a / r.height),
                (ar.mouseMovementX = d - ar.mouseX),
                (ar.mouseMovementY = m - ar.mouseY),
                (ar.mouseX = d),
                (ar.mouseY = m);
            }
          },
          asyncLoad: function (e, t, r, n) {
            var i = n ? "" : "al " + e;
            a(
              e,
              function (r) {
                k(r, 'Loading data file "' + e + '" failed (no arrayBuffer).'),
                  t(new Uint8Array(r)),
                  i && pe();
              },
              function (t) {
                if (!r) throw 'Loading data file "' + e + '" failed.';
                r();
              }
            ),
              i && me();
          },
          resizeListeners: [],
          updateResizeListeners: function () {
            var t = e.canvas;
            ar.resizeListeners.forEach(function (e) {
              e(t.width, t.height);
            });
          },
          setCanvasSize: function (t, r, n) {
            var a = e.canvas;
            ar.updateCanvasDimensions(a, t, r), n || ar.updateResizeListeners();
          },
          windowedWidth: 0,
          windowedHeight: 0,
          setFullscreenCanvasSize: function () {
            if ("undefined" != typeof SDL) {
              var t = N[SDL.screen >> 2];
              (t |= 8388608), (O[SDL.screen >> 2] = t);
            }
            ar.updateCanvasDimensions(e.canvas), ar.updateResizeListeners();
          },
          setWindowedCanvasSize: function () {
            if ("undefined" != typeof SDL) {
              var t = N[SDL.screen >> 2];
              (t &= -8388609), (O[SDL.screen >> 2] = t);
            }
            ar.updateCanvasDimensions(e.canvas), ar.updateResizeListeners();
          },
          updateCanvasDimensions: function (t, r, n) {
            r && n
              ? ((t.widthNative = r), (t.heightNative = n))
              : ((r = t.widthNative), (n = t.heightNative));
            var a = r,
              i = n;
            if (
              (e.forcedAspectRatio &&
                e.forcedAspectRatio > 0 &&
                (a / i < e.forcedAspectRatio
                  ? (a = Math.round(i * e.forcedAspectRatio))
                  : (i = Math.round(a / e.forcedAspectRatio))),
              (document.fullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement ||
                document.webkitFullscreenElement ||
                document.webkitCurrentFullScreenElement) === t.parentNode &&
                "undefined" != typeof screen)
            ) {
              var o = Math.min(screen.width / a, screen.height / i);
              (a = Math.round(a * o)), (i = Math.round(i * o));
            }
            ar.resizeCanvas
              ? (t.width != a && (t.width = a),
                t.height != i && (t.height = i),
                void 0 !== t.style &&
                  (t.style.removeProperty("width"),
                  t.style.removeProperty("height")))
              : (t.width != r && (t.width = r),
                t.height != n && (t.height = n),
                void 0 !== t.style &&
                  (a != r || i != n
                    ? (t.style.setProperty("width", a + "px", "important"),
                      t.style.setProperty("height", i + "px", "important"))
                    : (t.style.removeProperty("width"),
                      t.style.removeProperty("height"))));
          },
          wgetRequests: {},
          nextWgetRequestHandle: 0,
          getNextWgetRequestHandle: function () {
            var e = ar.nextWgetRequestHandle;
            return ar.nextWgetRequestHandle++, e;
          }
        },
        ir = {
          QUEUE_INTERVAL: 25,
          QUEUE_LOOKAHEAD: 0.1,
          DEVICE_NAME: "Emscripten OpenAL",
          CAPTURE_DEVICE_NAME: "Emscripten OpenAL capture",
          ALC_EXTENSIONS: { ALC_SOFT_pause_device: !0, ALC_SOFT_HRTF: !0 },
          AL_EXTENSIONS: {
            AL_EXT_float32: !0,
            AL_SOFT_loop_points: !0,
            AL_SOFT_source_length: !0,
            AL_EXT_source_distance_model: !0,
            AL_SOFT_source_spatialize: !0
          },
          _alcErr: 0,
          alcErr: 0,
          deviceRefCounts: {},
          alcStringCache: {},
          paused: !1,
          stringCache: {},
          contexts: {},
          currentCtx: null,
          buffers: {
            0: {
              id: 0,
              refCount: 0,
              audioBuf: null,
              frequency: 0,
              bytesPerSample: 2,
              channels: 1,
              length: 0
            }
          },
          paramArray: [],
          _nextId: 1,
          newId: function () {
            return ir.freeIds.length > 0 ? ir.freeIds.pop() : ir._nextId++;
          },
          freeIds: [],
          scheduleContextAudio: function (e) {
            if (
              1 !== ar.mainLoop.timingMode ||
              "visible" == document.visibilityState
            )
              for (var t in e.sources) ir.scheduleSourceAudio(e.sources[t]);
          },
          scheduleSourceAudio: function (e, t) {
            if (
              (1 !== ar.mainLoop.timingMode ||
                "visible" == document.visibilityState) &&
              4114 === e.state
            ) {
              for (
                var r = ir.updateSourceTime(e),
                  n = e.bufStartTime,
                  a = e.bufOffset,
                  i = e.bufsProcessed,
                  o = 0;
                o < e.audioQueue.length;
                o++
              )
                (n = (l = e.audioQueue[o])._startTime + l._duration),
                  (a = 0),
                  (i += l._skipCount + 1);
              t || (t = ir.QUEUE_LOOKAHEAD);
              for (var u = r + t, s = 0; n < u; ) {
                if (i >= e.bufQueue.length) {
                  if (!e.looping) break;
                  i %= e.bufQueue.length;
                }
                var c = e.bufQueue[i % e.bufQueue.length];
                if (0 === c.length) {
                  if (++s === e.bufQueue.length) break;
                } else {
                  var l;
                  ((l = e.context.audioCtx.createBufferSource()).buffer =
                    c.audioBuf),
                    (l.playbackRate.value = e.playbackRate),
                    (c.audioBuf._loopStart || c.audioBuf._loopEnd) &&
                      ((l.loopStart = c.audioBuf._loopStart),
                      (l.loopEnd = c.audioBuf._loopEnd));
                  var f = 0;
                  4136 === e.type && e.looping
                    ? ((f = Number.POSITIVE_INFINITY),
                      (l.loop = !0),
                      c.audioBuf._loopStart &&
                        (l.loopStart = c.audioBuf._loopStart),
                      c.audioBuf._loopEnd && (l.loopEnd = c.audioBuf._loopEnd))
                    : (f = (c.audioBuf.duration - a) / e.playbackRate),
                    (l._startOffset = a),
                    (l._duration = f),
                    (l._skipCount = s),
                    (s = 0),
                    l.connect(e.gain),
                    void 0 !== l.start
                      ? ((n = Math.max(n, e.context.audioCtx.currentTime)),
                        l.start(n, a))
                      : void 0 !== l.noteOn &&
                        ((n = Math.max(n, e.context.audioCtx.currentTime)),
                        l.noteOn(n)),
                    (l._startTime = n),
                    e.audioQueue.push(l),
                    (n += f);
                }
                (a = 0), i++;
              }
            }
          },
          updateSourceTime: function (e) {
            var t = e.context.audioCtx.currentTime;
            if (4114 !== e.state) return t;
            isFinite(e.bufStartTime) ||
              ((e.bufStartTime = t - e.bufOffset / e.playbackRate),
              (e.bufOffset = 0));
            for (var r = 0; e.audioQueue.length; ) {
              var n = e.audioQueue[0];
              if (
                ((e.bufsProcessed += n._skipCount),
                t < (r = n._startTime + n._duration))
              )
                break;
              e.audioQueue.shift(),
                (e.bufStartTime = r),
                (e.bufOffset = 0),
                e.bufsProcessed++;
            }
            if (e.bufsProcessed >= e.bufQueue.length && !e.looping)
              ir.setSourceState(e, 4116);
            else if (4136 === e.type && e.looping)
              if (0 === (c = e.bufQueue[0]).length) e.bufOffset = 0;
              else {
                var a = (t - e.bufStartTime) * e.playbackRate,
                  i = c.audioBuf._loopStart || 0,
                  o = c.audioBuf._loopEnd || c.audioBuf.duration;
                o <= i && (o = c.audioBuf.duration),
                  (e.bufOffset = a < o ? a : i + ((a - i) % (o - i)));
              }
            else if (e.audioQueue[0])
              e.bufOffset = (t - e.audioQueue[0]._startTime) * e.playbackRate;
            else {
              if (4136 !== e.type && e.looping) {
                var u = ir.sourceDuration(e) / e.playbackRate;
                u > 0 &&
                  (e.bufStartTime += Math.floor((t - e.bufStartTime) / u) * u);
              }
              for (var s = 0; s < e.bufQueue.length; s++) {
                if (e.bufsProcessed >= e.bufQueue.length) {
                  if (!e.looping) {
                    ir.setSourceState(e, 4116);
                    break;
                  }
                  e.bufsProcessed %= e.bufQueue.length;
                }
                var c;
                if ((c = e.bufQueue[e.bufsProcessed]).length > 0) {
                  if (
                    t <
                    (r = e.bufStartTime + c.audioBuf.duration / e.playbackRate)
                  ) {
                    e.bufOffset = (t - e.bufStartTime) * e.playbackRate;
                    break;
                  }
                  e.bufStartTime = r;
                }
                (e.bufOffset = 0), e.bufsProcessed++;
              }
            }
            return t;
          },
          cancelPendingSourceAudio: function (e) {
            ir.updateSourceTime(e);
            for (var t = 1; t < e.audioQueue.length; t++)
              e.audioQueue[t].stop();
            e.audioQueue.length > 1 && (e.audioQueue.length = 1);
          },
          stopSourceAudio: function (e) {
            for (var t = 0; t < e.audioQueue.length; t++)
              e.audioQueue[t].stop();
            e.audioQueue.length = 0;
          },
          setSourceState: function (e, t) {
            4114 === t
              ? ((4114 !== e.state && 4116 != e.state) ||
                  ((e.bufsProcessed = 0), (e.bufOffset = 0)),
                ir.stopSourceAudio(e),
                (e.state = 4114),
                (e.bufStartTime = Number.NEGATIVE_INFINITY),
                ir.scheduleSourceAudio(e))
              : 4115 === t
              ? 4114 === e.state &&
                (ir.updateSourceTime(e),
                ir.stopSourceAudio(e),
                (e.state = 4115))
              : 4116 === t
              ? 4113 !== e.state &&
                ((e.state = 4116),
                (e.bufsProcessed = e.bufQueue.length),
                (e.bufStartTime = Number.NEGATIVE_INFINITY),
                (e.bufOffset = 0),
                ir.stopSourceAudio(e))
              : 4113 === t &&
                4113 !== e.state &&
                ((e.state = 4113),
                (e.bufsProcessed = 0),
                (e.bufStartTime = Number.NEGATIVE_INFINITY),
                (e.bufOffset = 0),
                ir.stopSourceAudio(e));
          },
          initSourcePanner: function (e) {
            if (4144 !== e.type) {
              for (var t = ir.buffers[0], r = 0; r < e.bufQueue.length; r++)
                if (0 !== e.bufQueue[r].id) {
                  t = e.bufQueue[r];
                  break;
                }
              if (
                1 === e.spatialize ||
                (2 === e.spatialize && 1 === t.channels)
              ) {
                if (e.panner) return;
                (e.panner = e.context.audioCtx.createPanner()),
                  ir.updateSourceGlobal(e),
                  ir.updateSourceSpace(e),
                  e.panner.connect(e.context.gain),
                  e.gain.disconnect(),
                  e.gain.connect(e.panner);
              } else {
                if (!e.panner) return;
                e.panner.disconnect(),
                  e.gain.disconnect(),
                  e.gain.connect(e.context.gain),
                  (e.panner = null);
              }
            }
          },
          updateContextGlobal: function (e) {
            for (var t in e.sources) ir.updateSourceGlobal(e.sources[t]);
          },
          updateSourceGlobal: function (e) {
            var t = e.panner;
            if (t)
              switch (
                ((t.refDistance = e.refDistance),
                (t.maxDistance = e.maxDistance),
                (t.rolloffFactor = e.rolloffFactor),
                (t.panningModel = e.context.hrtf ? "HRTF" : "equalpower"),
                e.context.sourceDistanceModel
                  ? e.distanceModel
                  : e.context.distanceModel)
              ) {
                case 0:
                  (t.distanceModel = "inverse"), (t.refDistance = 340282e33);
                  break;
                case 53249:
                case 53250:
                  t.distanceModel = "inverse";
                  break;
                case 53251:
                case 53252:
                  t.distanceModel = "linear";
                  break;
                case 53253:
                case 53254:
                  t.distanceModel = "exponential";
              }
          },
          updateListenerSpace: function (e) {
            var t = e.audioCtx.listener;
            for (var r in (t.positionX
              ? ((t.positionX.value = e.listener.position[0]),
                (t.positionY.value = e.listener.position[1]),
                (t.positionZ.value = e.listener.position[2]))
              : t.setPosition(
                  e.listener.position[0],
                  e.listener.position[1],
                  e.listener.position[2]
                ),
            t.forwardX
              ? ((t.forwardX.value = e.listener.direction[0]),
                (t.forwardY.value = e.listener.direction[1]),
                (t.forwardZ.value = e.listener.direction[2]),
                (t.upX.value = e.listener.up[0]),
                (t.upY.value = e.listener.up[1]),
                (t.upZ.value = e.listener.up[2]))
              : t.setOrientation(
                  e.listener.direction[0],
                  e.listener.direction[1],
                  e.listener.direction[2],
                  e.listener.up[0],
                  e.listener.up[1],
                  e.listener.up[2]
                ),
            e.sources))
              ir.updateSourceSpace(e.sources[r]);
          },
          updateSourceSpace: function (e) {
            if (e.panner) {
              var t = e.panner,
                r = e.position[0],
                n = e.position[1],
                a = e.position[2],
                i = e.direction[0],
                o = e.direction[1],
                u = e.direction[2],
                s = e.context.listener,
                c = s.position[0],
                l = s.position[1],
                f = s.position[2];
              if (e.relative) {
                var d = -s.direction[0],
                  m = -s.direction[1],
                  p = -s.direction[2],
                  v = s.up[0],
                  h = s.up[1],
                  g = s.up[2],
                  y = function (e, t, r) {
                    var n = Math.sqrt(e * e + t * t + r * r);
                    return n < Number.EPSILON ? 0 : 1 / n;
                  },
                  _ = y(d, m, p);
                (d *= _), (m *= _), (p *= _);
                var w = (h *= _ = y(v, h, g)) * p - (g *= _) * m,
                  b = g * d - (v *= _) * p,
                  C = v * m - h * d,
                  E = i,
                  k = o,
                  x = u;
                (i =
                  E * (w *= _ = y(w, b, C)) +
                  k * (v = m * (C *= _) - p * (b *= _)) +
                  x * d),
                  (o = E * b + k * (h = p * w - d * C) + x * m),
                  (u = E * C + k * (g = d * b - m * w) + x * p),
                  (r = (E = r) * w + (k = n) * v + (x = a) * d),
                  (n = E * b + k * h + x * m),
                  (a = E * C + k * g + x * p),
                  (r += c),
                  (n += l),
                  (a += f);
              }
              t.positionX
                ? ((t.positionX.value = r),
                  (t.positionY.value = n),
                  (t.positionZ.value = a))
                : t.setPosition(r, n, a),
                t.orientationX
                  ? ((t.orientationX.value = i),
                    (t.orientationY.value = o),
                    (t.orientationZ.value = u))
                  : t.setOrientation(i, o, u);
              var F = e.dopplerShift,
                S = e.velocity[0],
                D = e.velocity[1],
                P = e.velocity[2],
                T = s.velocity[0],
                M = s.velocity[1],
                A = s.velocity[2];
              if (
                (r === c && n === l && a === f) ||
                (S === T && D === M && P === A)
              )
                e.dopplerShift = 1;
              else {
                var L = e.context.speedOfSound,
                  I = e.context.dopplerFactor,
                  B = c - r,
                  R = l - n,
                  O = f - a,
                  N = Math.sqrt(B * B + R * R + O * O),
                  U = (B * T + R * M + O * A) / N,
                  j = (B * S + R * D + O * P) / N;
                (U = Math.min(U, L / I)),
                  (j = Math.min(j, L / I)),
                  (e.dopplerShift = (L - I * U) / (L - I * j));
              }
              e.dopplerShift !== F && ir.updateSourceRate(e);
            }
          },
          updateSourceRate: function (e) {
            if (4114 === e.state) {
              ir.cancelPendingSourceAudio(e);
              var t,
                r = e.audioQueue[0];
              if (!r) return;
              (t =
                4136 === e.type && e.looping
                  ? Number.POSITIVE_INFINITY
                  : (r.buffer.duration - r._startOffset) / e.playbackRate),
                (r._duration = t),
                (r.playbackRate.value = e.playbackRate),
                ir.scheduleSourceAudio(e);
            }
          },
          sourceDuration: function (e) {
            for (var t = 0, r = 0; r < e.bufQueue.length; r++) {
              var n = e.bufQueue[r].audioBuf;
              t += n ? n.duration : 0;
            }
            return t;
          },
          sourceTell: function (e) {
            ir.updateSourceTime(e);
            for (var t = 0, r = 0; r < e.bufsProcessed; r++)
              t += e.bufQueue[r].audioBuf.duration;
            return (t += e.bufOffset);
          },
          sourceSeek: function (e, t) {
            var r = 4114 == e.state;
            if (
              (r && ir.setSourceState(e, 4113),
              null !== e.bufQueue[e.bufsProcessed].audioBuf)
            ) {
              for (
                e.bufsProcessed = 0;
                t > e.bufQueue[e.bufsProcessed].audioBuf.duration;

              )
                (t -= e.bufQueue[e.bufsProcessed].audiobuf.duration),
                  e.bufsProcessed++;
              e.bufOffset = t;
            }
            r && ir.setSourceState(e, 4114);
          },
          getGlobalParam: function (e, t) {
            if (!ir.currentCtx) return null;
            switch (t) {
              case 49152:
                return ir.currentCtx.dopplerFactor;
              case 49155:
                return ir.currentCtx.speedOfSound;
              case 53248:
                return ir.currentCtx.distanceModel;
              default:
                return (ir.currentCtx.err = 40962), null;
            }
          },
          setGlobalParam: function (e, t, r) {
            if (ir.currentCtx)
              switch (t) {
                case 49152:
                  if (!Number.isFinite(r) || r < 0)
                    return void (ir.currentCtx.err = 40963);
                  (ir.currentCtx.dopplerFactor = r),
                    ir.updateListenerSpace(ir.currentCtx);
                  break;
                case 49155:
                  if (!Number.isFinite(r) || r <= 0)
                    return void (ir.currentCtx.err = 40963);
                  (ir.currentCtx.speedOfSound = r),
                    ir.updateListenerSpace(ir.currentCtx);
                  break;
                case 53248:
                  switch (r) {
                    case 0:
                    case 53249:
                    case 53250:
                    case 53251:
                    case 53252:
                    case 53253:
                    case 53254:
                      (ir.currentCtx.distanceModel = r),
                        ir.updateContextGlobal(ir.currentCtx);
                      break;
                    default:
                      return void (ir.currentCtx.err = 40963);
                  }
                  break;
                default:
                  return void (ir.currentCtx.err = 40962);
              }
          },
          getListenerParam: function (e, t) {
            if (!ir.currentCtx) return null;
            switch (t) {
              case 4100:
                return ir.currentCtx.listener.position;
              case 4102:
                return ir.currentCtx.listener.velocity;
              case 4111:
                return ir.currentCtx.listener.direction.concat(
                  ir.currentCtx.listener.up
                );
              case 4106:
                return ir.currentCtx.gain.gain.value;
              default:
                return (ir.currentCtx.err = 40962), null;
            }
          },
          setListenerParam: function (e, t, r) {
            if (ir.currentCtx)
              if (null !== r) {
                var n = ir.currentCtx.listener;
                switch (t) {
                  case 4100:
                    if (
                      !Number.isFinite(r[0]) ||
                      !Number.isFinite(r[1]) ||
                      !Number.isFinite(r[2])
                    )
                      return void (ir.currentCtx.err = 40963);
                    (n.position[0] = r[0]),
                      (n.position[1] = r[1]),
                      (n.position[2] = r[2]),
                      ir.updateListenerSpace(ir.currentCtx);
                    break;
                  case 4102:
                    if (
                      !Number.isFinite(r[0]) ||
                      !Number.isFinite(r[1]) ||
                      !Number.isFinite(r[2])
                    )
                      return void (ir.currentCtx.err = 40963);
                    (n.velocity[0] = r[0]),
                      (n.velocity[1] = r[1]),
                      (n.velocity[2] = r[2]),
                      ir.updateListenerSpace(ir.currentCtx);
                    break;
                  case 4106:
                    if (!Number.isFinite(r) || r < 0)
                      return void (ir.currentCtx.err = 40963);
                    ir.currentCtx.gain.gain.value = r;
                    break;
                  case 4111:
                    if (
                      !(
                        Number.isFinite(r[0]) &&
                        Number.isFinite(r[1]) &&
                        Number.isFinite(r[2]) &&
                        Number.isFinite(r[3]) &&
                        Number.isFinite(r[4]) &&
                        Number.isFinite(r[5])
                      )
                    )
                      return void (ir.currentCtx.err = 40963);
                    (n.direction[0] = r[0]),
                      (n.direction[1] = r[1]),
                      (n.direction[2] = r[2]),
                      (n.up[0] = r[3]),
                      (n.up[1] = r[4]),
                      (n.up[2] = r[5]),
                      ir.updateListenerSpace(ir.currentCtx);
                    break;
                  default:
                    return void (ir.currentCtx.err = 40962);
                }
              } else ir.currentCtx.err = 40962;
          },
          getBufferParam: function (e, t, r) {
            if (ir.currentCtx) {
              var n = ir.buffers[t];
              if (n && 0 !== t)
                switch (r) {
                  case 8193:
                    return n.frequency;
                  case 8194:
                    return 8 * n.bytesPerSample;
                  case 8195:
                    return n.channels;
                  case 8196:
                    return n.length * n.bytesPerSample * n.channels;
                  case 8213:
                    return 0 === n.length
                      ? [0, 0]
                      : [
                          (n.audioBuf._loopStart || 0) * n.frequency,
                          (n.audioBuf._loopEnd || n.length) * n.frequency
                        ];
                  default:
                    return (ir.currentCtx.err = 40962), null;
                }
              else ir.currentCtx.err = 40961;
            }
          },
          setBufferParam: function (e, t, r, n) {
            if (ir.currentCtx) {
              var a = ir.buffers[t];
              if (a && 0 !== t)
                if (null !== n)
                  switch (r) {
                    case 8196:
                      if (0 !== n) return void (ir.currentCtx.err = 40963);
                      break;
                    case 8213:
                      if (
                        n[0] < 0 ||
                        n[0] > a.length ||
                        n[1] < 0 ||
                        n[1] > a.Length ||
                        n[0] >= n[1]
                      )
                        return void (ir.currentCtx.err = 40963);
                      if (a.refCount > 0)
                        return void (ir.currentCtx.err = 40964);
                      a.audioBuf &&
                        ((a.audioBuf._loopStart = n[0] / a.frequency),
                        (a.audioBuf._loopEnd = n[1] / a.frequency));
                      break;
                    default:
                      return void (ir.currentCtx.err = 40962);
                  }
                else ir.currentCtx.err = 40962;
              else ir.currentCtx.err = 40961;
            }
          },
          getSourceParam: function (e, t, r) {
            if (!ir.currentCtx) return null;
            var n = ir.currentCtx.sources[t];
            if (!n) return (ir.currentCtx.err = 40961), null;
            switch (r) {
              case 514:
                return n.relative;
              case 4097:
                return n.coneInnerAngle;
              case 4098:
                return n.coneOuterAngle;
              case 4099:
                return n.pitch;
              case 4100:
                return n.position;
              case 4101:
                return n.direction;
              case 4102:
                return n.velocity;
              case 4103:
                return n.looping;
              case 4105:
                return 4136 === n.type ? n.bufQueue[0].id : 0;
              case 4106:
                return n.gain.gain.value;
              case 4109:
                return n.minGain;
              case 4110:
                return n.maxGain;
              case 4112:
                return n.state;
              case 4117:
                return 1 === n.bufQueue.length && 0 === n.bufQueue[0].id
                  ? 0
                  : n.bufQueue.length;
              case 4118:
                return (1 === n.bufQueue.length && 0 === n.bufQueue[0].id) ||
                  n.looping
                  ? 0
                  : n.bufsProcessed;
              case 4128:
                return n.refDistance;
              case 4129:
                return n.rolloffFactor;
              case 4130:
                return n.coneOuterGain;
              case 4131:
                return n.maxDistance;
              case 4132:
                return ir.sourceTell(n);
              case 4133:
                return (
                  (a = ir.sourceTell(n)) > 0 && (a *= n.bufQueue[0].frequency),
                  a
                );
              case 4134:
                var a;
                return (
                  (a = ir.sourceTell(n)) > 0 &&
                    (a *=
                      n.bufQueue[0].frequency * n.bufQueue[0].bytesPerSample),
                  a
                );
              case 4135:
                return n.type;
              case 4628:
                return n.spatialize;
              case 8201:
                for (var i = 0, o = 0, u = 0; u < n.bufQueue.length; u++)
                  (i += n.bufQueue[u].length),
                    0 !== n.bufQueue[u].id &&
                      (o =
                        n.bufQueue[u].bytesPerSample * n.bufQueue[u].channels);
                return i * o;
              case 8202:
                for (i = 0, u = 0; u < n.bufQueue.length; u++)
                  i += n.bufQueue[u].length;
                return i;
              case 8203:
                return ir.sourceDuration(n);
              case 53248:
                return n.distanceModel;
              default:
                return (ir.currentCtx.err = 40962), null;
            }
          },
          setSourceParam: function (e, t, r, n) {
            if (ir.currentCtx) {
              var a = ir.currentCtx.sources[t];
              if (a)
                if (null !== n)
                  switch (r) {
                    case 514:
                      if (1 === n) (a.relative = !0), ir.updateSourceSpace(a);
                      else {
                        if (0 !== n) return void (ir.currentCtx.err = 40963);
                        (a.relative = !1), ir.updateSourceSpace(a);
                      }
                      break;
                    case 4097:
                      if (!Number.isFinite(n))
                        return void (ir.currentCtx.err = 40963);
                      (a.coneInnerAngle = n),
                        a.panner && (a.panner.coneInnerAngle = n % 360);
                      break;
                    case 4098:
                      if (!Number.isFinite(n))
                        return void (ir.currentCtx.err = 40963);
                      (a.coneOuterAngle = n),
                        a.panner && (a.panner.coneOuterAngle = n % 360);
                      break;
                    case 4099:
                      if (!Number.isFinite(n) || n <= 0)
                        return void (ir.currentCtx.err = 40963);
                      if (a.pitch === n) break;
                      (a.pitch = n), ir.updateSourceRate(a);
                      break;
                    case 4100:
                      if (
                        !Number.isFinite(n[0]) ||
                        !Number.isFinite(n[1]) ||
                        !Number.isFinite(n[2])
                      )
                        return void (ir.currentCtx.err = 40963);
                      (a.position[0] = n[0]),
                        (a.position[1] = n[1]),
                        (a.position[2] = n[2]),
                        ir.updateSourceSpace(a);
                      break;
                    case 4101:
                      if (
                        !Number.isFinite(n[0]) ||
                        !Number.isFinite(n[1]) ||
                        !Number.isFinite(n[2])
                      )
                        return void (ir.currentCtx.err = 40963);
                      (a.direction[0] = n[0]),
                        (a.direction[1] = n[1]),
                        (a.direction[2] = n[2]),
                        ir.updateSourceSpace(a);
                      break;
                    case 4102:
                      if (
                        !Number.isFinite(n[0]) ||
                        !Number.isFinite(n[1]) ||
                        !Number.isFinite(n[2])
                      )
                        return void (ir.currentCtx.err = 40963);
                      (a.velocity[0] = n[0]),
                        (a.velocity[1] = n[1]),
                        (a.velocity[2] = n[2]),
                        ir.updateSourceSpace(a);
                      break;
                    case 4103:
                      if (1 === n)
                        (a.looping = !0),
                          ir.updateSourceTime(a),
                          4136 === a.type &&
                            a.audioQueue.length > 0 &&
                            (((i = a.audioQueue[0]).loop = !0),
                            (i._duration = Number.POSITIVE_INFINITY));
                      else {
                        if (0 !== n) return void (ir.currentCtx.err = 40963);
                        a.looping = !1;
                        var i,
                          o = ir.updateSourceTime(a);
                        4136 === a.type &&
                          a.audioQueue.length > 0 &&
                          (((i = a.audioQueue[0]).loop = !1),
                          (i._duration =
                            a.bufQueue[0].audioBuf.duration / a.playbackRate),
                          (i._startTime = o - a.bufOffset / a.playbackRate));
                      }
                      break;
                    case 4105:
                      if (4114 === a.state || 4115 === a.state)
                        return void (ir.currentCtx.err = 40964);
                      if (0 === n) {
                        for (var u in a.bufQueue) a.bufQueue[u].refCount--;
                        (a.bufQueue.length = 1),
                          (a.bufQueue[0] = ir.buffers[0]),
                          (a.bufsProcessed = 0),
                          (a.type = 4144);
                      } else {
                        if (!(d = ir.buffers[n]))
                          return void (ir.currentCtx.err = 40963);
                        for (var u in a.bufQueue) a.bufQueue[u].refCount--;
                        (a.bufQueue.length = 0),
                          d.refCount++,
                          (a.bufQueue = [d]),
                          (a.bufsProcessed = 0),
                          (a.type = 4136);
                      }
                      ir.initSourcePanner(a), ir.scheduleSourceAudio(a);
                      break;
                    case 4106:
                      if (!Number.isFinite(n) || n < 0)
                        return void (ir.currentCtx.err = 40963);
                      a.gain.gain.value = n;
                      break;
                    case 4109:
                      if (
                        !Number.isFinite(n) ||
                        n < 0 ||
                        n > Math.min(a.maxGain, 1)
                      )
                        return void (ir.currentCtx.err = 40963);
                      a.minGain = n;
                      break;
                    case 4110:
                      if (
                        !Number.isFinite(n) ||
                        n < Math.max(0, a.minGain) ||
                        n > 1
                      )
                        return void (ir.currentCtx.err = 40963);
                      a.maxGain = n;
                      break;
                    case 4128:
                      if (!Number.isFinite(n) || n < 0)
                        return void (ir.currentCtx.err = 40963);
                      (a.refDistance = n),
                        a.panner && (a.panner.refDistance = n);
                      break;
                    case 4129:
                      if (!Number.isFinite(n) || n < 0)
                        return void (ir.currentCtx.err = 40963);
                      (a.rolloffFactor = n),
                        a.panner && (a.panner.rolloffFactor = n);
                      break;
                    case 4130:
                      if (!Number.isFinite(n) || n < 0 || n > 1)
                        return void (ir.currentCtx.err = 40963);
                      (a.coneOuterGain = n),
                        a.panner && (a.panner.coneOuterGain = n);
                      break;
                    case 4131:
                      if (!Number.isFinite(n) || n < 0)
                        return void (ir.currentCtx.err = 40963);
                      (a.maxDistance = n),
                        a.panner && (a.panner.maxDistance = n);
                      break;
                    case 4132:
                      if (n < 0 || n > ir.sourceDuration(a))
                        return void (ir.currentCtx.err = 40963);
                      ir.sourceSeek(a, n);
                      break;
                    case 4133:
                      if ((l = ir.sourceDuration(a)) > 0) {
                        var s;
                        for (var c in a.bufQueue)
                          if (c) {
                            s = a.bufQueue[c].frequency;
                            break;
                          }
                        n /= s;
                      }
                      if (n < 0 || n > l)
                        return void (ir.currentCtx.err = 40963);
                      ir.sourceSeek(a, n);
                      break;
                    case 4134:
                      var l;
                      if ((l = ir.sourceDuration(a)) > 0) {
                        var f;
                        for (var c in a.bufQueue)
                          if (c) {
                            var d;
                            f =
                              (d = a.bufQueue[c]).frequency *
                              d.bytesPerSample *
                              d.channels;
                            break;
                          }
                        n /= f;
                      }
                      if (n < 0 || n > l)
                        return void (ir.currentCtx.err = 40963);
                      ir.sourceSeek(a, n);
                      break;
                    case 4628:
                      if (0 !== n && 1 !== n && 2 !== n)
                        return void (ir.currentCtx.err = 40963);
                      (a.spatialize = n), ir.initSourcePanner(a);
                      break;
                    case 8201:
                    case 8202:
                    case 8203:
                      ir.currentCtx.err = 40964;
                      break;
                    case 53248:
                      switch (n) {
                        case 0:
                        case 53249:
                        case 53250:
                        case 53251:
                        case 53252:
                        case 53253:
                        case 53254:
                          (a.distanceModel = n),
                            ir.currentCtx.sourceDistanceModel &&
                              ir.updateContextGlobal(ir.currentCtx);
                          break;
                        default:
                          return void (ir.currentCtx.err = 40963);
                      }
                      break;
                    default:
                      return void (ir.currentCtx.err = 40962);
                  }
                else ir.currentCtx.err = 40962;
              else ir.currentCtx.err = 40961;
            }
          },
          captures: {},
          sharedCaptureAudioCtx: null,
          requireValidCaptureDevice: function (e, t) {
            if (0 === e) return (ir.alcErr = 40961), null;
            var r = ir.captures[e];
            return r
              ? r.mediaStreamError
                ? ((ir.alcErr = 40961), null)
                : r
              : ((ir.alcErr = 40961), null);
          }
        };
      function or(e, t, r) {
        switch (t) {
          case 514:
          case 4097:
          case 4098:
          case 4103:
          case 4105:
          case 4128:
          case 4129:
          case 4131:
          case 4132:
          case 4133:
          case 4134:
          case 4628:
          case 8201:
          case 8202:
          case 53248:
            ir.setSourceParam("alSourcei", e, t, r);
            break;
          default:
            ir.setSourceParam("alSourcei", e, t, null);
        }
      }
      var ur = 0;
      function sr(e) {
        try {
          return y.grow((e - A.byteLength + 65535) >>> 16), H(y.buffer), 1;
        } catch (e) {}
      }
      var cr = {};
      function lr() {
        if (!lr.strings) {
          var e = {
            USER: "web_user",
            LOGNAME: "web_user",
            PATH: "/",
            PWD: "/",
            HOME: "/home/web_user",
            LANG:
              (
                ("object" == typeof navigator &&
                  navigator.languages &&
                  navigator.languages[0]) ||
                "C"
              ).replace("-", "_") + ".UTF-8",
            _: u || "./this.program"
          };
          for (var t in cr) e[t] = cr[t];
          var r = [];
          for (var t in e) r.push(t + "=" + e[t]);
          lr.strings = r;
        }
        return lr.strings;
      }
      var fr = {
          counter: 1,
          lastError: 0,
          buffers: [],
          mappedBuffers: {},
          programs: [],
          framebuffers: [],
          renderbuffers: [],
          textures: [],
          uniforms: [],
          shaders: [],
          vaos: [],
          contexts: [],
          currentContext: null,
          offscreenCanvases: {},
          timerQueriesEXT: [],
          queries: [],
          samplers: [],
          transformFeedbacks: [],
          syncs: [],
          programInfos: {},
          stringCache: {},
          stringiCache: {},
          unpackAlignment: 4,
          init: function () {
            for (
              var e = new Float32Array(fr.MINI_TEMP_BUFFER_SIZE), t = 0;
              t < fr.MINI_TEMP_BUFFER_SIZE;
              t++
            )
              fr.miniTempBufferFloatViews[t] = e.subarray(0, t + 1);
            var r = new Int32Array(fr.MINI_TEMP_BUFFER_SIZE);
            for (t = 0; t < fr.MINI_TEMP_BUFFER_SIZE; t++)
              fr.miniTempBufferIntViews[t] = r.subarray(0, t + 1);
          },
          recordError: function (e) {
            fr.lastError || (fr.lastError = e);
          },
          getNewId: function (e) {
            for (var t = fr.counter++, r = e.length; r < t; r++) e[r] = null;
            return t;
          },
          MINI_TEMP_BUFFER_SIZE: 256,
          miniTempBufferFloatViews: [0],
          miniTempBufferIntViews: [0],
          getSource: function (e, t, r, n) {
            for (var a = "", i = 0; i < t; ++i) {
              var o = n ? O[(n + 4 * i) >> 2] : -1;
              a += D(O[(r + 4 * i) >> 2], o < 0 ? void 0 : o);
            }
            return a;
          },
          createContext: function (e, t) {
            var r =
              t.majorVersion > 1
                ? e.getContext("webgl2", t)
                : e.getContext("webgl", t);
            return r ? fr.registerContext(r, t) : 0;
          },
          registerContext: function (e, t) {
            var r = fr.getNewId(fr.contexts),
              n = {
                handle: r,
                attributes: t,
                version: t.majorVersion,
                GLctx: e
              };
            return (
              e.canvas && (e.canvas.GLctxObject = n),
              (fr.contexts[r] = n),
              (void 0 === t.enableExtensionsByDefault ||
                t.enableExtensionsByDefault) &&
                fr.initExtensions(n),
              r
            );
          },
          makeContextCurrent: function (t) {
            return (
              (fr.currentContext = fr.contexts[t]),
              (e.ctx = Mr = fr.currentContext && fr.currentContext.GLctx),
              !(t && !Mr)
            );
          },
          getContext: function (e) {
            return fr.contexts[e];
          },
          deleteContext: function (e) {
            fr.currentContext === fr.contexts[e] && (fr.currentContext = null),
              "object" == typeof JSEvents &&
                JSEvents.removeAllHandlersOnTarget(fr.contexts[e].GLctx.canvas),
              fr.contexts[e] &&
                fr.contexts[e].GLctx.canvas &&
                (fr.contexts[e].GLctx.canvas.GLctxObject = void 0),
              (fr.contexts[e] = null);
          },
          initExtensions: function (e) {
            if ((e || (e = fr.currentContext), !e.initExtensionsDone)) {
              e.initExtensionsDone = !0;
              var t,
                r = e.GLctx;
              !(function (e) {
                var t = e.getExtension("ANGLE_instanced_arrays");
                t &&
                  ((e.vertexAttribDivisor = function (e, r) {
                    t.vertexAttribDivisorANGLE(e, r);
                  }),
                  (e.drawArraysInstanced = function (e, r, n, a) {
                    t.drawArraysInstancedANGLE(e, r, n, a);
                  }),
                  (e.drawElementsInstanced = function (e, r, n, a, i) {
                    t.drawElementsInstancedANGLE(e, r, n, a, i);
                  }));
              })(r),
                (function (e) {
                  var t = e.getExtension("OES_vertex_array_object");
                  t &&
                    ((e.createVertexArray = function () {
                      return t.createVertexArrayOES();
                    }),
                    (e.deleteVertexArray = function (e) {
                      t.deleteVertexArrayOES(e);
                    }),
                    (e.bindVertexArray = function (e) {
                      t.bindVertexArrayOES(e);
                    }),
                    (e.isVertexArray = function (e) {
                      return t.isVertexArrayOES(e);
                    }));
                })(r),
                (function (e) {
                  var t = e.getExtension("WEBGL_draw_buffers");
                  t &&
                    (e.drawBuffers = function (e, r) {
                      t.drawBuffersWEBGL(e, r);
                    });
                })(r),
                ((t = r).dibvbi = t.getExtension(
                  "WEBGL_draw_instanced_base_vertex_base_instance"
                )),
                (r.disjointTimerQueryExt = r.getExtension(
                  "EXT_disjoint_timer_query"
                ));
              var n = [
                "OES_texture_float",
                "OES_texture_half_float",
                "OES_standard_derivatives",
                "OES_vertex_array_object",
                "WEBGL_compressed_texture_s3tc",
                "WEBGL_depth_texture",
                "OES_element_index_uint",
                "EXT_texture_filter_anisotropic",
                "EXT_frag_depth",
                "WEBGL_draw_buffers",
                "ANGLE_instanced_arrays",
                "OES_texture_float_linear",
                "OES_texture_half_float_linear",
                "EXT_blend_minmax",
                "EXT_shader_texture_lod",
                "EXT_texture_norm16",
                "WEBGL_compressed_texture_pvrtc",
                "EXT_color_buffer_half_float",
                "WEBGL_color_buffer_float",
                "EXT_sRGB",
                "WEBGL_compressed_texture_etc1",
                "EXT_disjoint_timer_query",
                "WEBGL_compressed_texture_etc",
                "WEBGL_compressed_texture_astc",
                "EXT_color_buffer_float",
                "WEBGL_compressed_texture_s3tc_srgb",
                "EXT_disjoint_timer_query_webgl2",
                "WEBKIT_WEBGL_compressed_texture_pvrtc"
              ];
              (r.getSupportedExtensions() || []).forEach(function (e) {
                -1 != n.indexOf(e) && r.getExtension(e);
              });
            }
          },
          populateUniformTable: function (e) {
            for (
              var t = fr.programs[e],
                r = (fr.programInfos[e] = {
                  uniforms: {},
                  maxUniformLength: 0,
                  maxAttributeLength: -1,
                  maxUniformBlockNameLength: -1
                }),
                n = r.uniforms,
                a = Mr.getProgramParameter(t, 35718),
                i = 0;
              i < a;
              ++i
            ) {
              var o = Mr.getActiveUniform(t, i),
                u = o.name;
              (r.maxUniformLength = Math.max(r.maxUniformLength, u.length + 1)),
                "]" == u.slice(-1) && (u = u.slice(0, u.lastIndexOf("[")));
              var s = Mr.getUniformLocation(t, u);
              if (s) {
                var c = fr.getNewId(fr.uniforms);
                (n[u] = [o.size, c]), (fr.uniforms[c] = s);
                for (var l = 1; l < o.size; ++l) {
                  var f = u + "[" + l + "]";
                  (s = Mr.getUniformLocation(t, f)),
                    (c = fr.getNewId(fr.uniforms)),
                    (fr.uniforms[c] = s);
                }
              }
            }
          }
        },
        dr = [];
      function mr(e, t, r, n) {
        for (var a = 0; a < e; a++) {
          var i = Mr[r](),
            o = i && fr.getNewId(n);
          i ? ((i.name = o), (n[o] = i)) : fr.recordError(1282),
            (O[(t + 4 * a) >> 2] = o);
        }
      }
      function pr(e, t, r) {
        if (t) {
          var n,
            a,
            i = void 0;
          switch (e) {
            case 36346:
              i = 1;
              break;
            case 36344:
              return void (0 != r && 1 != r && fr.recordError(1280));
            case 34814:
            case 36345:
              i = 0;
              break;
            case 34466:
              var o = Mr.getParameter(34467);
              i = o ? o.length : 0;
              break;
            case 33309:
              if (fr.currentContext.version < 2)
                return void fr.recordError(1282);
              i = 2 * (Mr.getSupportedExtensions() || []).length;
              break;
            case 33307:
            case 33308:
              if (fr.currentContext.version < 2)
                return void fr.recordError(1280);
              i = 33307 == e ? 3 : 0;
          }
          if (void 0 === i) {
            var u = Mr.getParameter(e);
            switch (typeof u) {
              case "number":
                i = u;
                break;
              case "boolean":
                i = u ? 1 : 0;
                break;
              case "string":
                return void fr.recordError(1280);
              case "object":
                if (null === u)
                  switch (e) {
                    case 34964:
                    case 35725:
                    case 34965:
                    case 36006:
                    case 36007:
                    case 32873:
                    case 34229:
                    case 36662:
                    case 36663:
                    case 35053:
                    case 35055:
                    case 36010:
                    case 35097:
                    case 35869:
                    case 32874:
                    case 36389:
                    case 35983:
                    case 35368:
                    case 34068:
                      i = 0;
                      break;
                    default:
                      return void fr.recordError(1280);
                  }
                else {
                  if (
                    u instanceof Float32Array ||
                    u instanceof Uint32Array ||
                    u instanceof Int32Array ||
                    u instanceof Array
                  ) {
                    for (var s = 0; s < u.length; ++s)
                      switch (r) {
                        case 0:
                          O[(t + 4 * s) >> 2] = u[s];
                          break;
                        case 2:
                          U[(t + 4 * s) >> 2] = u[s];
                          break;
                        case 4:
                          L[(t + s) >> 0] = u[s] ? 1 : 0;
                      }
                    return;
                  }
                  try {
                    i = 0 | u.name;
                  } catch (t) {
                    return (
                      fr.recordError(1280),
                      void f(
                        "GL_INVALID_ENUM in glGet" +
                          r +
                          "v: Unknown object returned from WebGL getParameter(" +
                          e +
                          ")! (error: " +
                          t +
                          ")"
                      )
                    );
                  }
                }
                break;
              default:
                return (
                  fr.recordError(1280),
                  void f(
                    "GL_INVALID_ENUM in glGet" +
                      r +
                      "v: Native code calling glGet" +
                      r +
                      "v(" +
                      e +
                      ") and it returns " +
                      u +
                      " of type " +
                      typeof u +
                      "!"
                  )
                );
            }
          }
          switch (r) {
            case 1:
              (a = i),
                (N[(n = t) >> 2] = a),
                (N[(n + 4) >> 2] = (a - N[n >> 2]) / 4294967296);
              break;
            case 0:
              O[t >> 2] = i;
              break;
            case 2:
              U[t >> 2] = i;
              break;
            case 4:
              L[t >> 0] = i ? 1 : 0;
          }
        } else fr.recordError(1281);
      }
      function vr(e) {
        return parseInt(e);
      }
      function hr(e) {
        return 0 == (e -= 5120)
          ? L
          : 1 == e
          ? I
          : 2 == e
          ? B
          : 4 == e
          ? O
          : 6 == e
          ? U
          : 5 == e || 28922 == e || 28520 == e || 30779 == e || 30782 == e
          ? N
          : R;
      }
      function gr(e) {
        return 31 - Math.clz32(e.BYTES_PER_ELEMENT);
      }
      function yr(e, t, r, n, a, i) {
        var o = hr(e),
          u = gr(o),
          s = 1 << u,
          c = (function (e, t, r, n) {
            var a;
            return t * ((e * r + (a = n) - 1) & -a);
          })(
            r,
            n,
            (function (e) {
              return (
                {
                  5: 3,
                  6: 4,
                  8: 2,
                  29502: 3,
                  29504: 4,
                  26917: 2,
                  26918: 2,
                  29846: 3,
                  29847: 4
                }[e - 6402] || 1
              );
            })(t) * s,
            fr.unpackAlignment
          );
        return o.subarray(a >> u, (a + c) >> u);
      }
      function _r(e, t, r, n, a, i) {
        (this.id = e),
          (this.x = 0),
          (this.y = 0),
          (this.fullscreen = !1),
          (this.storedX = 0),
          (this.storedY = 0),
          (this.width = t),
          (this.height = r),
          (this.storedWidth = t),
          (this.storedHeight = r),
          (this.title = n),
          (this.monitor = a),
          (this.share = i),
          (this.attributes = wr.hints),
          (this.inputModes = { 208897: 212993, 208898: 0, 208899: 0 }),
          (this.buttons = 0),
          (this.keys = new Array()),
          (this.domKeys = new Array()),
          (this.shouldClose = 0),
          (this.title = null),
          (this.windowPosFunc = null),
          (this.windowSizeFunc = null),
          (this.windowCloseFunc = null),
          (this.windowRefreshFunc = null),
          (this.windowFocusFunc = null),
          (this.windowIconifyFunc = null),
          (this.framebufferSizeFunc = null),
          (this.mouseButtonFunc = null),
          (this.cursorPosFunc = null),
          (this.cursorEnterFunc = null),
          (this.scrollFunc = null),
          (this.dropFunc = null),
          (this.keyFunc = null),
          (this.charFunc = null),
          (this.userptr = null);
      }
      var wr = {
          WindowFromId: function (e) {
            return e <= 0 || !wr.windows ? null : wr.windows[e - 1];
          },
          joystickFunc: null,
          errorFunc: null,
          monitorFunc: null,
          active: null,
          windows: null,
          monitors: null,
          monitorString: null,
          versionString: null,
          initialTime: null,
          extensions: null,
          hints: null,
          defaultHints: {
            131073: 0,
            131074: 0,
            131075: 1,
            131076: 1,
            131077: 1,
            135169: 8,
            135170: 8,
            135171: 8,
            135172: 8,
            135173: 24,
            135174: 8,
            135175: 0,
            135176: 0,
            135177: 0,
            135178: 0,
            135179: 0,
            135180: 0,
            135181: 0,
            135182: 0,
            135183: 0,
            139265: 196609,
            139266: 1,
            139267: 0,
            139268: 0,
            139269: 0,
            139270: 0,
            139271: 0,
            139272: 0
          },
          DOMToGLFWKeyCode: function (e) {
            switch (e) {
              case 32:
                return 32;
              case 222:
                return 39;
              case 188:
                return 44;
              case 173:
              case 189:
                return 45;
              case 190:
                return 46;
              case 191:
                return 47;
              case 48:
                return 48;
              case 49:
                return 49;
              case 50:
                return 50;
              case 51:
                return 51;
              case 52:
                return 52;
              case 53:
                return 53;
              case 54:
                return 54;
              case 55:
                return 55;
              case 56:
                return 56;
              case 57:
                return 57;
              case 59:
                return 59;
              case 61:
              case 187:
                return 61;
              case 65:
                return 65;
              case 66:
                return 66;
              case 67:
                return 67;
              case 68:
                return 68;
              case 69:
                return 69;
              case 70:
                return 70;
              case 71:
                return 71;
              case 72:
                return 72;
              case 73:
                return 73;
              case 74:
                return 74;
              case 75:
                return 75;
              case 76:
                return 76;
              case 77:
                return 77;
              case 78:
                return 78;
              case 79:
                return 79;
              case 80:
                return 80;
              case 81:
                return 81;
              case 82:
                return 82;
              case 83:
                return 83;
              case 84:
                return 84;
              case 85:
                return 85;
              case 86:
                return 86;
              case 87:
                return 87;
              case 88:
                return 88;
              case 89:
                return 89;
              case 90:
                return 90;
              case 219:
                return 91;
              case 220:
                return 92;
              case 221:
                return 93;
              case 192:
                return 94;
              case 27:
                return 256;
              case 13:
                return 257;
              case 9:
                return 258;
              case 8:
                return 259;
              case 45:
                return 260;
              case 46:
                return 261;
              case 39:
                return 262;
              case 37:
                return 263;
              case 40:
                return 264;
              case 38:
                return 265;
              case 33:
                return 266;
              case 34:
                return 267;
              case 36:
                return 268;
              case 35:
                return 269;
              case 20:
                return 280;
              case 145:
                return 281;
              case 144:
                return 282;
              case 44:
                return 283;
              case 19:
                return 284;
              case 112:
                return 290;
              case 113:
                return 291;
              case 114:
                return 292;
              case 115:
                return 293;
              case 116:
                return 294;
              case 117:
                return 295;
              case 118:
                return 296;
              case 119:
                return 297;
              case 120:
                return 298;
              case 121:
                return 299;
              case 122:
                return 300;
              case 123:
                return 301;
              case 124:
                return 302;
              case 125:
                return 303;
              case 126:
                return 304;
              case 127:
                return 305;
              case 128:
                return 306;
              case 129:
                return 307;
              case 130:
                return 308;
              case 131:
                return 309;
              case 132:
                return 310;
              case 133:
                return 311;
              case 134:
                return 312;
              case 135:
                return 313;
              case 136:
                return 314;
              case 96:
                return 320;
              case 97:
                return 321;
              case 98:
                return 322;
              case 99:
                return 323;
              case 100:
                return 324;
              case 101:
                return 325;
              case 102:
                return 326;
              case 103:
                return 327;
              case 104:
                return 328;
              case 105:
                return 329;
              case 110:
                return 330;
              case 111:
                return 331;
              case 106:
                return 332;
              case 109:
                return 333;
              case 107:
                return 334;
              case 16:
                return 340;
              case 17:
                return 341;
              case 18:
                return 342;
              case 91:
                return 343;
              case 93:
                return 348;
              default:
                return -1;
            }
          },
          getModBits: function (e) {
            var t = 0;
            return (
              e.keys[340] && (t |= 1),
              e.keys[341] && (t |= 2),
              e.keys[342] && (t |= 4),
              e.keys[343] && (t |= 8),
              t
            );
          },
          onKeyPress: function (e) {
            if (wr.active && wr.active.charFunc && !e.ctrlKey && !e.metaKey) {
              var t = e.charCode;
              0 == t ||
                (t >= 0 && t <= 31) ||
                en(wr.active.charFunc, wr.active.id, t);
            }
          },
          onKeyChanged: function (e, t) {
            if (wr.active) {
              var r = wr.DOMToGLFWKeyCode(e);
              if (-1 != r) {
                var n = t && wr.active.keys[r];
                (wr.active.keys[r] = t),
                  (wr.active.domKeys[e] = t),
                  wr.active.keyFunc &&
                    (n && (t = 2),
                    rn(
                      wr.active.keyFunc,
                      wr.active.id,
                      r,
                      e,
                      t,
                      wr.getModBits(wr.active)
                    ));
              }
            }
          },
          onGamepadConnected: function (e) {
            wr.refreshJoysticks();
          },
          onGamepadDisconnected: function (e) {
            wr.refreshJoysticks();
          },
          onKeydown: function (e) {
            wr.onKeyChanged(e.keyCode, 1),
              (8 !== e.keyCode && 9 !== e.keyCode) || e.preventDefault();
          },
          onKeyup: function (e) {
            wr.onKeyChanged(e.keyCode, 0);
          },
          onBlur: function (e) {
            if (wr.active)
              for (var t = 0; t < wr.active.domKeys.length; ++t)
                wr.active.domKeys[t] && wr.onKeyChanged(t, 0);
          },
          onMousemove: function (t) {
            wr.active &&
              (ar.calculateMouseEvent(t),
              t.target == e.canvas &&
                wr.active.cursorPosFunc &&
                dynCall_vidd(
                  wr.active.cursorPosFunc,
                  wr.active.id,
                  ar.mouseX,
                  ar.mouseY
                ));
          },
          DOMToGLFWMouseButton: function (e) {
            var t = e.button;
            return t > 0 && (t = 1 == t ? 2 : 1), t;
          },
          onMouseenter: function (t) {
            wr.active &&
              t.target == e.canvas &&
              wr.active.cursorEnterFunc &&
              en(wr.active.cursorEnterFunc, wr.active.id, 1);
          },
          onMouseleave: function (t) {
            wr.active &&
              t.target == e.canvas &&
              wr.active.cursorEnterFunc &&
              en(wr.active.cursorEnterFunc, wr.active.id, 0);
          },
          onMouseButtonChanged: function (t, r) {
            if (
              wr.active &&
              (ar.calculateMouseEvent(t), t.target == e.canvas)
            ) {
              var n = wr.DOMToGLFWMouseButton(t);
              if (1 == r) {
                wr.active.buttons |= 1 << n;
                try {
                  t.target.setCapture();
                } catch (e) {}
              } else wr.active.buttons &= ~(1 << n);
              wr.active.mouseButtonFunc &&
                tn(
                  wr.active.mouseButtonFunc,
                  wr.active.id,
                  n,
                  r,
                  wr.getModBits(wr.active)
                );
            }
          },
          onMouseButtonDown: function (e) {
            wr.active && wr.onMouseButtonChanged(e, 1);
          },
          onMouseButtonUp: function (e) {
            wr.active && wr.onMouseButtonChanged(e, 0);
          },
          onMouseWheel: function (t) {
            var r = -ar.getMouseWheelDelta(t);
            if (
              ((r = 0 == r ? 0 : r > 0 ? Math.max(r, 1) : Math.min(r, -1)),
              (wr.wheelPos += r),
              wr.active && wr.active.scrollFunc && t.target == e.canvas)
            ) {
              var n = 0,
                a = 0;
              "mousewheel" == t.type
                ? ((n = t.wheelDeltaX), (a = t.wheelDeltaY))
                : ((n = t.deltaX), (a = t.deltaY)),
                dynCall_vidd(wr.active.scrollFunc, wr.active.id, n, a),
                t.preventDefault();
            }
          },
          onCanvasResize: function (e, t) {
            if (wr.active) {
              var r = !0;
              document.fullscreen ||
              document.fullScreen ||
              document.mozFullScreen ||
              document.webkitIsFullScreen
                ? ((wr.active.storedX = wr.active.x),
                  (wr.active.storedY = wr.active.y),
                  (wr.active.storedWidth = wr.active.width),
                  (wr.active.storedHeight = wr.active.height),
                  (wr.active.x = wr.active.y = 0),
                  (wr.active.width = screen.width),
                  (wr.active.height = screen.height),
                  (wr.active.fullscreen = !0))
                : 1 == wr.active.fullscreen
                ? ((wr.active.x = wr.active.storedX),
                  (wr.active.y = wr.active.storedY),
                  (wr.active.width = wr.active.storedWidth),
                  (wr.active.height = wr.active.storedHeight),
                  (wr.active.fullscreen = !1))
                : wr.active.width != e || wr.active.height != t
                ? ((wr.active.width = e), (wr.active.height = t))
                : (r = !1),
                r &&
                  (ar.setCanvasSize(wr.active.width, wr.active.height, !0),
                  wr.onWindowSizeChanged(),
                  wr.onFramebufferSizeChanged());
            }
          },
          onWindowSizeChanged: function () {
            wr.active &&
              wr.active.windowSizeFunc &&
              sn(
                wr.active.windowSizeFunc,
                wr.active.id,
                wr.active.width,
                wr.active.height
              );
          },
          onFramebufferSizeChanged: function () {
            wr.active &&
              wr.active.framebufferSizeFunc &&
              sn(
                wr.active.framebufferSizeFunc,
                wr.active.id,
                wr.active.width,
                wr.active.height
              );
          },
          getTime: function () {
            return tr() / 1e3;
          },
          setWindowTitle: function (e, t) {
            var r = wr.WindowFromId(e);
            r &&
              ((r.title = D(t)),
              wr.active.id == r.id && (document.title = r.title));
          },
          setJoystickCallback: function (e) {
            (wr.joystickFunc = e), wr.refreshJoysticks();
          },
          joys: {},
          lastGamepadState: null,
          lastGamepadStateFrame: null,
          refreshJoysticks: function () {
            if (
              ar.mainLoop.currentFrameNumber !== wr.lastGamepadStateFrame ||
              !ar.mainLoop.currentFrameNumber
            ) {
              (wr.lastGamepadState = navigator.getGamepads
                ? navigator.getGamepads()
                : navigator.webkitGetGamepads
                ? navigator.webkitGetGamepads
                : null),
                (wr.lastGamepadStateFrame = ar.mainLoop.currentFrameNumber);
              for (var e = 0; e < wr.lastGamepadState.length; ++e) {
                var t = wr.lastGamepadState[e];
                if (t) {
                  wr.joys[e] ||
                    (console.log("glfw joystick connected:", e),
                    (wr.joys[e] = {
                      id: x(Rr(t.id), "i8", 0),
                      buttonsCount: t.buttons.length,
                      axesCount: t.axes.length,
                      buttons: x(new Array(t.buttons.length), "i8", 0),
                      axes: x(new Array(4 * t.axes.length), "float", 0)
                    }),
                    wr.joystickFunc && en(wr.joystickFunc, e, 262145));
                  for (var r = wr.joys[e], n = 0; n < t.buttons.length; ++n)
                    b(r.buttons + n, t.buttons[n].pressed, "i8");
                  for (n = 0; n < t.axes.length; ++n)
                    b(r.axes + 4 * n, t.axes[n], "float");
                } else
                  wr.joys[e] &&
                    (console.log("glfw joystick disconnected", e),
                    wr.joystickFunc && en(wr.joystickFunc, e, 262146),
                    Gr(wr.joys[e].id),
                    Gr(wr.joys[e].buttons),
                    Gr(wr.joys[e].axes),
                    delete wr.joys[e]);
              }
            }
          },
          setKeyCallback: function (e, t) {
            var r = wr.WindowFromId(e);
            if (!r) return null;
            var n = r.keyFunc;
            return (r.keyFunc = t), n;
          },
          setCharCallback: function (e, t) {
            var r = wr.WindowFromId(e);
            if (!r) return null;
            var n = r.charFunc;
            return (r.charFunc = t), n;
          },
          setMouseButtonCallback: function (e, t) {
            var r = wr.WindowFromId(e);
            if (!r) return null;
            var n = r.mouseButtonFunc;
            return (r.mouseButtonFunc = t), n;
          },
          setCursorPosCallback: function (e, t) {
            var r = wr.WindowFromId(e);
            if (!r) return null;
            var n = r.cursorPosFunc;
            return (r.cursorPosFunc = t), n;
          },
          setScrollCallback: function (e, t) {
            var r = wr.WindowFromId(e);
            if (!r) return null;
            var n = r.scrollFunc;
            return (r.scrollFunc = t), n;
          },
          setDropCallback: function (e, t) {
            var r = wr.WindowFromId(e);
            if (!r) return null;
            var n = r.dropFunc;
            return (r.dropFunc = t), n;
          },
          onDrop: function (e) {
            if (
              wr.active &&
              wr.active.dropFunc &&
              e.dataTransfer &&
              e.dataTransfer.files &&
              0 != e.dataTransfer.files.length
            ) {
              e.preventDefault();
              var t = x(new Array(4 * e.dataTransfer.files.length), "i8*", 0),
                r = [],
                n = e.dataTransfer.files.length,
                a = 0,
                i = ".glfw_dropped_files";
              Ae.createPath("/", i);
              for (var o = 0; o < n; ++o) u(e.dataTransfer.files[o]);
              return !1;
            }
            function u(e) {
              var u = "/" + i + "/" + e.name.replace(/\//g, "_"),
                s = new FileReader();
              (s.onloadend = function (i) {
                if (2 != s.readyState)
                  return (
                    ++a,
                    void console.log(
                      "failed to read dropped file: " + e.name + ": " + s.error
                    )
                  );
                var o = i.target.result;
                if ((Ae.writeFile(u, new Uint8Array(o)), ++a === n)) {
                  sn(wr.active.dropFunc, wr.active.id, n, t);
                  for (var c = 0; c < r.length; ++c) Gr(r[c]);
                  Gr(t);
                }
              }),
                s.readAsArrayBuffer(e);
              var c = x(Rr(u), "i8", 0);
              r.push(c), b(t + 4 * o, c, "i8*");
            }
          },
          onDragover: function (e) {
            if (wr.active && wr.active.dropFunc) return e.preventDefault(), !1;
          },
          setWindowSizeCallback: function (e, t) {
            var r = wr.WindowFromId(e);
            if (!r) return null;
            var n = r.windowSizeFunc;
            return (r.windowSizeFunc = t), n;
          },
          setWindowCloseCallback: function (e, t) {
            var r = wr.WindowFromId(e);
            if (!r) return null;
            var n = r.windowCloseFunc;
            return (r.windowCloseFunc = t), n;
          },
          setWindowRefreshCallback: function (e, t) {
            var r = wr.WindowFromId(e);
            if (!r) return null;
            var n = r.windowRefreshFunc;
            return (r.windowRefreshFunc = t), n;
          },
          onClickRequestPointerLock: function (t) {
            !ar.pointerLock &&
              e.canvas.requestPointerLock &&
              (e.canvas.requestPointerLock(), t.preventDefault());
          },
          setInputMode: function (t, r, n) {
            var a = wr.WindowFromId(t);
            if (a)
              switch (r) {
                case 208897:
                  switch (n) {
                    case 212993:
                      (a.inputModes[r] = n),
                        e.canvas.removeEventListener(
                          "click",
                          wr.onClickRequestPointerLock,
                          !0
                        ),
                        e.canvas.exitPointerLock();
                      break;
                    case 212994:
                      console.log(
                        "glfwSetInputMode called with GLFW_CURSOR_HIDDEN value not implemented."
                      );
                      break;
                    case 212995:
                      (a.inputModes[r] = n),
                        e.canvas.addEventListener(
                          "click",
                          wr.onClickRequestPointerLock,
                          !0
                        ),
                        e.canvas.requestPointerLock();
                      break;
                    default:
                      console.log(
                        "glfwSetInputMode called with unknown value parameter value: " +
                          n +
                          "."
                      );
                  }
                  break;
                case 208898:
                  console.log(
                    "glfwSetInputMode called with GLFW_STICKY_KEYS mode not implemented."
                  );
                  break;
                case 208899:
                  console.log(
                    "glfwSetInputMode called with GLFW_STICKY_MOUSE_BUTTONS mode not implemented."
                  );
                  break;
                default:
                  console.log(
                    "glfwSetInputMode called with unknown mode parameter value: " +
                      r +
                      "."
                  );
              }
          },
          getKey: function (e, t) {
            var r = wr.WindowFromId(e);
            return r ? r.keys[t] : 0;
          },
          getMouseButton: function (e, t) {
            var r = wr.WindowFromId(e);
            return r ? (r.buttons & (1 << t)) > 0 : 0;
          },
          getCursorPos: function (e, t, r) {
            b(t, ar.mouseX, "double"), b(r, ar.mouseY, "double");
          },
          getMousePos: function (e, t, r) {
            b(t, ar.mouseX, "i32"), b(r, ar.mouseY, "i32");
          },
          setCursorPos: function (e, t, r) {},
          getWindowPos: function (e, t, r) {
            var n = 0,
              a = 0,
              i = wr.WindowFromId(e);
            i && ((n = i.x), (a = i.y)), b(t, n, "i32"), b(r, a, "i32");
          },
          setWindowPos: function (e, t, r) {
            var n = wr.WindowFromId(e);
            n && ((n.x = t), (n.y = r));
          },
          getWindowSize: function (e, t, r) {
            var n = 0,
              a = 0,
              i = wr.WindowFromId(e);
            i && ((n = i.width), (a = i.height)),
              b(t, n, "i32"),
              b(r, a, "i32");
          },
          setWindowSize: function (e, t, r) {
            var n = wr.WindowFromId(e);
            n &&
              (wr.active.id == n.id &&
                (t == screen.width && r == screen.height
                  ? ar.requestFullscreen()
                  : (ar.exitFullscreen(),
                    ar.setCanvasSize(t, r),
                    (n.width = t),
                    (n.height = r))),
              n.windowSizeFunc && sn(n.windowSizeFunc, n.id, t, r));
          },
          createWindow: function (t, r, n, a, i) {
            var o, u;
            for (o = 0; o < wr.windows.length && null !== wr.windows[o]; o++);
            if (o > 0)
              throw "glfwCreateWindow only supports one window at time currently";
            if (((u = o + 1), t <= 0 || r <= 0)) return 0;
            for (
              a ? ar.requestFullscreen() : ar.setCanvasSize(t, r), o = 0;
              o < wr.windows.length && null == wr.windows[o];
              o++
            );
            if (o == wr.windows.length) {
              var s = {
                antialias: wr.hints[135181] > 1,
                depth: wr.hints[135173] > 0,
                stencil: wr.hints[135174] > 0,
                alpha: wr.hints[135172] > 0
              };
              e.ctx = ar.createContext(e.canvas, !0, !0, s);
            }
            if (!e.ctx) return 0;
            var c = new _r(u, t, r, n, a, i);
            return (
              u - 1 == wr.windows.length
                ? wr.windows.push(c)
                : (wr.windows[u - 1] = c),
              (wr.active = c),
              c.id
            );
          },
          destroyWindow: function (t) {
            var r = wr.WindowFromId(t);
            if (r) {
              r.windowCloseFunc && Jr(r.windowCloseFunc, r.id),
                (wr.windows[r.id - 1] = null),
                wr.active.id == r.id && (wr.active = null);
              for (var n = 0; n < wr.windows.length; n++)
                if (null !== wr.windows[n]) return;
              e.ctx = ar.destroyContext(e.canvas, !0, !0);
            }
          },
          swapBuffers: function (e) {},
          GLFW2ParamToGLFW3Param: function (e) {
            return {
              196609: 0,
              196610: 0,
              196611: 0,
              196612: 0,
              196613: 0,
              196614: 0,
              131073: 0,
              131074: 0,
              131075: 0,
              131076: 0,
              131077: 135169,
              131078: 135170,
              131079: 135171,
              131080: 135172,
              131081: 135173,
              131082: 135174,
              131083: 135183,
              131084: 135175,
              131085: 135176,
              131086: 135177,
              131087: 135178,
              131088: 135179,
              131089: 135180,
              131090: 0,
              131091: 135181,
              131092: 139266,
              131093: 139267,
              131094: 139270,
              131095: 139271,
              131096: 139272
            }[e];
          }
        },
        br = (T("GMT", 9175440, 4), 9175440);
      function Cr(e, t) {
        var r = new Date(1e3 * O[e >> 2]);
        (O[t >> 2] = r.getUTCSeconds()),
          (O[(t + 4) >> 2] = r.getUTCMinutes()),
          (O[(t + 8) >> 2] = r.getUTCHours()),
          (O[(t + 12) >> 2] = r.getUTCDate()),
          (O[(t + 16) >> 2] = r.getUTCMonth()),
          (O[(t + 20) >> 2] = r.getUTCFullYear() - 1900),
          (O[(t + 24) >> 2] = r.getUTCDay()),
          (O[(t + 36) >> 2] = 0),
          (O[(t + 32) >> 2] = 0);
        var n = Date.UTC(r.getUTCFullYear(), 0, 1, 0, 0, 0, 0),
          a = ((r.getTime() - n) / 864e5) | 0;
        return (O[(t + 28) >> 2] = a), (O[(t + 40) >> 2] = br), t;
      }
      function Er() {
        if (!Er.called) {
          (Er.called = !0),
            (O[Qr() >> 2] = 60 * new Date().getTimezoneOffset());
          var e = new Date().getFullYear(),
            t = new Date(e, 0, 1),
            r = new Date(e, 6, 1);
          O[Xr() >> 2] = Number(t.getTimezoneOffset() != r.getTimezoneOffset());
          var n = u(t),
            a = u(r),
            i = X(n),
            o = X(a);
          r.getTimezoneOffset() < t.getTimezoneOffset()
            ? ((O[Yr() >> 2] = i), (O[(Yr() + 4) >> 2] = o))
            : ((O[Yr() >> 2] = o), (O[(Yr() + 4) >> 2] = i));
        }
        function u(e) {
          var t = e.toTimeString().match(/\(([A-Za-z ]+)\)$/);
          return t ? t[1] : "GMT";
        }
      }
      function kr(e) {
        return e % 4 == 0 && (e % 100 != 0 || e % 400 == 0);
      }
      function xr(e, t) {
        for (var r = 0, n = 0; n <= t; r += e[n++]);
        return r;
      }
      var Fr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        Sr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      function Dr(e, t) {
        for (var r = new Date(e.getTime()); t > 0; ) {
          var n = kr(r.getFullYear()),
            a = r.getMonth(),
            i = (n ? Fr : Sr)[a];
          if (!(t > i - r.getDate())) return r.setDate(r.getDate() + t), r;
          (t -= i - r.getDate() + 1),
            r.setDate(1),
            a < 11
              ? r.setMonth(a + 1)
              : (r.setMonth(0), r.setFullYear(r.getFullYear() + 1));
        }
        return r;
      }
      function Pr(e, t, r, n) {
        var a = O[(n + 40) >> 2],
          i = {
            tm_sec: O[n >> 2],
            tm_min: O[(n + 4) >> 2],
            tm_hour: O[(n + 8) >> 2],
            tm_mday: O[(n + 12) >> 2],
            tm_mon: O[(n + 16) >> 2],
            tm_year: O[(n + 20) >> 2],
            tm_wday: O[(n + 24) >> 2],
            tm_yday: O[(n + 28) >> 2],
            tm_isdst: O[(n + 32) >> 2],
            tm_gmtoff: O[(n + 36) >> 2],
            tm_zone: a ? D(a) : ""
          },
          o = D(r),
          u = {
            "%c": "%a %b %d %H:%M:%S %Y",
            "%D": "%m/%d/%y",
            "%F": "%Y-%m-%d",
            "%h": "%b",
            "%r": "%I:%M:%S %p",
            "%R": "%H:%M",
            "%T": "%H:%M:%S",
            "%x": "%m/%d/%y",
            "%X": "%H:%M:%S",
            "%Ec": "%c",
            "%EC": "%C",
            "%Ex": "%m/%d/%y",
            "%EX": "%H:%M:%S",
            "%Ey": "%y",
            "%EY": "%Y",
            "%Od": "%d",
            "%Oe": "%e",
            "%OH": "%H",
            "%OI": "%I",
            "%Om": "%m",
            "%OM": "%M",
            "%OS": "%S",
            "%Ou": "%u",
            "%OU": "%U",
            "%OV": "%V",
            "%Ow": "%w",
            "%OW": "%W",
            "%Oy": "%y"
          };
        for (var s in u) o = o.replace(new RegExp(s, "g"), u[s]);
        var c = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          l = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ];
        function f(e, t, r) {
          for (
            var n = "number" == typeof e ? e.toString() : e || "";
            n.length < t;

          )
            n = r[0] + n;
          return n;
        }
        function d(e, t) {
          return f(e, t, "0");
        }
        function m(e, t) {
          function r(e) {
            return e < 0 ? -1 : e > 0 ? 1 : 0;
          }
          var n;
          return (
            0 === (n = r(e.getFullYear() - t.getFullYear())) &&
              0 === (n = r(e.getMonth() - t.getMonth())) &&
              (n = r(e.getDate() - t.getDate())),
            n
          );
        }
        function p(e) {
          switch (e.getDay()) {
            case 0:
              return new Date(e.getFullYear() - 1, 11, 29);
            case 1:
              return e;
            case 2:
              return new Date(e.getFullYear(), 0, 3);
            case 3:
              return new Date(e.getFullYear(), 0, 2);
            case 4:
              return new Date(e.getFullYear(), 0, 1);
            case 5:
              return new Date(e.getFullYear() - 1, 11, 31);
            case 6:
              return new Date(e.getFullYear() - 1, 11, 30);
          }
        }
        function v(e) {
          var t = Dr(new Date(e.tm_year + 1900, 0, 1), e.tm_yday),
            r = new Date(t.getFullYear(), 0, 4),
            n = new Date(t.getFullYear() + 1, 0, 4),
            a = p(r),
            i = p(n);
          return m(a, t) <= 0
            ? m(i, t) <= 0
              ? t.getFullYear() + 1
              : t.getFullYear()
            : t.getFullYear() - 1;
        }
        var h = {
          "%a": function (e) {
            return c[e.tm_wday].substring(0, 3);
          },
          "%A": function (e) {
            return c[e.tm_wday];
          },
          "%b": function (e) {
            return l[e.tm_mon].substring(0, 3);
          },
          "%B": function (e) {
            return l[e.tm_mon];
          },
          "%C": function (e) {
            return d(((e.tm_year + 1900) / 100) | 0, 2);
          },
          "%d": function (e) {
            return d(e.tm_mday, 2);
          },
          "%e": function (e) {
            return f(e.tm_mday, 2, " ");
          },
          "%g": function (e) {
            return v(e).toString().substring(2);
          },
          "%G": function (e) {
            return v(e);
          },
          "%H": function (e) {
            return d(e.tm_hour, 2);
          },
          "%I": function (e) {
            var t = e.tm_hour;
            return 0 == t ? (t = 12) : t > 12 && (t -= 12), d(t, 2);
          },
          "%j": function (e) {
            return d(
              e.tm_mday + xr(kr(e.tm_year + 1900) ? Fr : Sr, e.tm_mon - 1),
              3
            );
          },
          "%m": function (e) {
            return d(e.tm_mon + 1, 2);
          },
          "%M": function (e) {
            return d(e.tm_min, 2);
          },
          "%n": function () {
            return "\n";
          },
          "%p": function (e) {
            return e.tm_hour >= 0 && e.tm_hour < 12 ? "AM" : "PM";
          },
          "%S": function (e) {
            return d(e.tm_sec, 2);
          },
          "%t": function () {
            return "\t";
          },
          "%u": function (e) {
            return e.tm_wday || 7;
          },
          "%U": function (e) {
            var t = new Date(e.tm_year + 1900, 0, 1),
              r = 0 === t.getDay() ? t : Dr(t, 7 - t.getDay()),
              n = new Date(e.tm_year + 1900, e.tm_mon, e.tm_mday);
            if (m(r, n) < 0) {
              var a = xr(kr(n.getFullYear()) ? Fr : Sr, n.getMonth() - 1) - 31,
                i = 31 - r.getDate() + a + n.getDate();
              return d(Math.ceil(i / 7), 2);
            }
            return 0 === m(r, t) ? "01" : "00";
          },
          "%V": function (e) {
            var t,
              r = new Date(e.tm_year + 1900, 0, 4),
              n = new Date(e.tm_year + 1901, 0, 4),
              a = p(r),
              i = p(n),
              o = Dr(new Date(e.tm_year + 1900, 0, 1), e.tm_yday);
            return m(o, a) < 0
              ? "53"
              : m(i, o) <= 0
              ? "01"
              : ((t =
                  a.getFullYear() < e.tm_year + 1900
                    ? e.tm_yday + 32 - a.getDate()
                    : e.tm_yday + 1 - a.getDate()),
                d(Math.ceil(t / 7), 2));
          },
          "%w": function (e) {
            return e.tm_wday;
          },
          "%W": function (e) {
            var t = new Date(e.tm_year, 0, 1),
              r =
                1 === t.getDay()
                  ? t
                  : Dr(t, 0 === t.getDay() ? 1 : 7 - t.getDay() + 1),
              n = new Date(e.tm_year + 1900, e.tm_mon, e.tm_mday);
            if (m(r, n) < 0) {
              var a = xr(kr(n.getFullYear()) ? Fr : Sr, n.getMonth() - 1) - 31,
                i = 31 - r.getDate() + a + n.getDate();
              return d(Math.ceil(i / 7), 2);
            }
            return 0 === m(r, t) ? "01" : "00";
          },
          "%y": function (e) {
            return (e.tm_year + 1900).toString().substring(2);
          },
          "%Y": function (e) {
            return e.tm_year + 1900;
          },
          "%z": function (e) {
            var t = e.tm_gmtoff,
              r = t >= 0;
            return (
              (t = ((t = Math.abs(t) / 60) / 60) * 100 + (t % 60)),
              (r ? "+" : "-") + String("0000" + t).slice(-4)
            );
          },
          "%Z": function (e) {
            return e.tm_zone;
          },
          "%%": function () {
            return "%";
          }
        };
        for (var s in h)
          o.indexOf(s) >= 0 && (o = o.replace(new RegExp(s, "g"), h[s](i)));
        var g = Rr(o, !1);
        return g.length > t ? 0 : (Q(g, e), g.length - 1);
      }
      function Tr(e, t) {
        Tr.array || (Tr.array = []);
        var r,
          n = Tr.array;
        for (n.length = 0; (r = I[e++]); )
          100 === r || 102 === r
            ? ((t = (t + 7) & -8), n.push(j[t >> 3]), (t += 8))
            : ((t = (t + 3) & -4), n.push(O[t >> 2]), (t += 4));
        return n;
      }
      var Mr,
        Ar = function (e, t, r, n) {
          e || (e = this),
            (this.parent = e),
            (this.mount = e.mount),
            (this.mounted = null),
            (this.id = Ae.nextInode++),
            (this.name = t),
            (this.mode = r),
            (this.node_ops = {}),
            (this.stream_ops = {}),
            (this.rdev = n);
        },
        Lr = 365,
        Ir = 146;
      Object.defineProperties(Ar.prototype, {
        read: {
          get: function () {
            return (this.mode & Lr) === Lr;
          },
          set: function (e) {
            e ? (this.mode |= Lr) : (this.mode &= -366);
          }
        },
        write: {
          get: function () {
            return (this.mode & Ir) === Ir;
          },
          set: function (e) {
            e ? (this.mode |= Ir) : (this.mode &= -147);
          }
        },
        isFolder: {
          get: function () {
            return Ae.isDir(this.mode);
          }
        },
        isDevice: {
          get: function () {
            return Ae.isChrdev(this.mode);
          }
        }
      }),
        (Ae.FSNode = Ar),
        Ae.staticInit(),
        (e.FS_createFolder = Ae.createFolder),
        (e.FS_createPath = Ae.createPath),
        (e.FS_createDataFile = Ae.createDataFile),
        (e.FS_createPreloadedFile = Ae.createPreloadedFile),
        (e.FS_createLazyFile = Ae.createLazyFile),
        (e.FS_createLink = Ae.createLink),
        (e.FS_createDevice = Ae.createDevice),
        (e.FS_unlink = Ae.unlink),
        (function () {
          for (var e = new Array(256), t = 0; t < 256; ++t)
            e[t] = String.fromCharCode(t);
          Be = e;
        })(),
        (Ge = e.BindingError = We(Error, "BindingError")),
        (qe = e.InternalError = We(Error, "InternalError")),
        (st.prototype.isAliasOf = Qe),
        (st.prototype.clone = tt),
        (st.prototype.delete = rt),
        (st.prototype.isDeleted = nt),
        (st.prototype.deleteLater = ut),
        (Pt.prototype.getPointee = yt),
        (Pt.prototype.destructor = _t),
        (Pt.prototype.argPackAdvance = 8),
        (Pt.prototype.readValueFromPointer = gt),
        (Pt.prototype.deleteObject = wt),
        (Pt.prototype.fromWireType = Dt),
        (e.getInheritedInstanceCount = Ct),
        (e.getLiveInheritedInstances = Et),
        (e.flushPendingDeletes = ot),
        (e.setDelayFunction = kt),
        (At = e.UnboundTypeError = We(Error, "UnboundTypeError")),
        (e.count_emval_handles = Gt),
        (e.get_first_emval = $t),
        (e.requestFullscreen = function (e, t) {
          ar.requestFullscreen(e, t);
        }),
        (e.requestAnimationFrame = function (e) {
          ar.requestAnimationFrame(e);
        }),
        (e.setCanvasSize = function (e, t, r) {
          ar.setCanvasSize(e, t, r);
        }),
        (e.pauseMainLoop = function () {
          ar.mainLoop.pause();
        }),
        (e.resumeMainLoop = function () {
          ar.mainLoop.resume();
        }),
        (e.getUserMedia = function () {
          ar.getUserMedia();
        }),
        (e.createContext = function (e, t, r, n) {
          return ar.createContext(e, t, r, n);
        }),
        fr.init();
      for (var Br = 0; Br < 32; Br++) dr.push(new Array(Br));
      function Rr(e, t, r) {
        var n = r > 0 ? r : M(e) + 1,
          a = new Array(n),
          i = P(e, a, 0, a.length);
        return t && (a.length = i), a;
      }
      var Or = {
          _ZN3bnb13video_texture14get_gl_textureEv: function () {
            f("missing function: _ZN3bnb13video_texture14get_gl_textureEv"),
              ve(-1);
          },
          _ZN3bnb13video_texture14update_textureEv: function () {
            f("missing function: _ZN3bnb13video_texture14update_textureEv"),
              ve(-1);
          },
          _ZN3bnb13video_texture4playEddb: function () {
            f("missing function: _ZN3bnb13video_texture4playEddb"), ve(-1);
          },
          _ZN3bnb13video_texture4stopEv: function () {
            f("missing function: _ZN3bnb13video_texture4stopEv"), ve(-1);
          },
          _ZN3bnb13video_texture5pauseEv: function () {
            f("missing function: _ZN3bnb13video_texture5pauseEv"), ve(-1);
          },
          _ZN3bnb13video_texture9set_stateERKNS_14playback_stateE: function () {
            f(
              "missing function: _ZN3bnb13video_texture9set_stateERKNS_14playback_stateE"
            ),
              ve(-1);
          },
          _ZN3bnb13video_textureD1Ev: function () {
            f("missing function: _ZN3bnb13video_textureD1Ev"), ve(-1);
          },
          _ZNK3bnb13video_texture9get_stateEv: function () {
            f("missing function: _ZNK3bnb13video_texture9get_stateEv"), ve(-1);
          },
          __cxa_allocate_exception: function (e) {
            return $r(e);
          },
          __cxa_atexit: function (e, t) {
            return ke(e, t);
          },
          __cxa_rethrow: function () {
            var e = xe.pop();
            throw (
              ((e = (function (e) {
                if (!e || Fe[e]) return e;
                for (var t in Fe)
                  for (
                    var r = +t, n = Fe[r].adjusted, a = n.length, i = 0;
                    i < a;
                    i++
                  )
                    if (n[i] === e) return r;
                return e;
              })(e)),
              Fe[e].rethrown || (xe.push(e), (Fe[e].rethrown = !0)),
              e)
            );
          },
          __cxa_thread_atexit: function (e, t) {
            return ke(e, t);
          },
          __cxa_throw: function (e, t, r) {
            throw (
              ((Fe[e] = {
                ptr: e,
                adjusted: [e],
                type: t,
                destructor: r,
                refcount: 0,
                caught: !1,
                rethrown: !1
              }),
              "uncaught_exception" in Vr
                ? Vr.uncaught_exceptions++
                : (Vr.uncaught_exceptions = 1),
              e)
            );
          },
          __map_file: function (e, t) {
            return Se(63), -1;
          },
          __sys_fcntl64: function (e, t, r) {
            Le.varargs = r;
            try {
              var n = Le.getStreamFromFD(e);
              switch (t) {
                case 0:
                  return (a = Le.get()) < 0
                    ? -28
                    : Ae.open(n.path, n.flags, 0, a).fd;
                case 1:
                case 2:
                  return 0;
                case 3:
                  return n.flags;
                case 4:
                  var a = Le.get();
                  return (n.flags |= a), 0;
                case 12:
                  return (a = Le.get()), (B[(a + 0) >> 1] = 2), 0;
                case 13:
                case 14:
                  return 0;
                case 16:
                case 8:
                  return -28;
                case 9:
                  return Se(28), -1;
                default:
                  return -28;
              }
            } catch (e) {
              return (
                (void 0 !== Ae && e instanceof Ae.ErrnoError) || ve(e), -e.errno
              );
            }
          },
          __sys_fstat64: function (e, t) {
            try {
              var r = Le.getStreamFromFD(e);
              return Le.doStat(Ae.stat, r.path, t);
            } catch (e) {
              return (
                (void 0 !== Ae && e instanceof Ae.ErrnoError) || ve(e), -e.errno
              );
            }
          },
          __sys_ftruncate64: function (e, t, r, n) {
            try {
              var a = Le.get64(r, n);
              return Ae.ftruncate(e, a), 0;
            } catch (e) {
              return (
                (void 0 !== Ae && e instanceof Ae.ErrnoError) || ve(e), -e.errno
              );
            }
          },
          __sys_getdents64: function (e, t, r) {
            try {
              var n = Le.getStreamFromFD(e);
              n.getdents || (n.getdents = Ae.readdir(n.path));
              for (
                var a = 280,
                  i = 0,
                  o = Ae.llseek(n, 0, 1),
                  u = Math.floor(o / a);
                u < n.getdents.length && i + a <= r;

              ) {
                var s,
                  c,
                  l = n.getdents[u];
                if ("." === l[0]) (s = 1), (c = 4);
                else {
                  var f = Ae.lookupNode(n.node, l);
                  (s = f.id),
                    (c = Ae.isChrdev(f.mode)
                      ? 2
                      : Ae.isDir(f.mode)
                      ? 4
                      : Ae.isLink(f.mode)
                      ? 10
                      : 8);
                }
                (_e = [
                  s >>> 0,
                  ((ye = s),
                  +oe(ye) >= 1
                    ? ye > 0
                      ? (0 | ce(+se(ye / 4294967296), 4294967295)) >>> 0
                      : ~~+ue((ye - +(~~ye >>> 0)) / 4294967296) >>> 0
                    : 0)
                ]),
                  (O[(t + i) >> 2] = _e[0]),
                  (O[(t + i + 4) >> 2] = _e[1]),
                  (_e = [
                    ((u + 1) * a) >>> 0,
                    ((ye = (u + 1) * a),
                    +oe(ye) >= 1
                      ? ye > 0
                        ? (0 | ce(+se(ye / 4294967296), 4294967295)) >>> 0
                        : ~~+ue((ye - +(~~ye >>> 0)) / 4294967296) >>> 0
                      : 0)
                  ]),
                  (O[(t + i + 8) >> 2] = _e[0]),
                  (O[(t + i + 12) >> 2] = _e[1]),
                  (B[(t + i + 16) >> 1] = 280),
                  (L[(t + i + 18) >> 0] = c),
                  T(l, t + i + 19, 256),
                  (i += a),
                  (u += 1);
              }
              return Ae.llseek(n, u * a, 0), i;
            } catch (e) {
              return (
                (void 0 !== Ae && e instanceof Ae.ErrnoError) || ve(e), -e.errno
              );
            }
          },
          __sys_getpid: function () {
            return 42;
          },
          __sys_ioctl: function (e, t, r) {
            Le.varargs = r;
            try {
              var n = Le.getStreamFromFD(e);
              switch (t) {
                case 21509:
                case 21505:
                  return n.tty ? 0 : -59;
                case 21510:
                case 21511:
                case 21512:
                case 21506:
                case 21507:
                case 21508:
                  return n.tty ? 0 : -59;
                case 21519:
                  if (!n.tty) return -59;
                  var a = Le.get();
                  return (O[a >> 2] = 0), 0;
                case 21520:
                  return n.tty ? -28 : -59;
                case 21531:
                  return (a = Le.get()), Ae.ioctl(n, t, a);
                case 21523:
                case 21524:
                  return n.tty ? 0 : -59;
                default:
                  ve("bad ioctl syscall " + t);
              }
            } catch (e) {
              return (
                (void 0 !== Ae && e instanceof Ae.ErrnoError) || ve(e), -e.errno
              );
            }
          },
          __sys_lstat64: function (e, t) {
            try {
              return (e = Le.getStr(e)), Le.doStat(Ae.lstat, e, t);
            } catch (e) {
              return (
                (void 0 !== Ae && e instanceof Ae.ErrnoError) || ve(e), -e.errno
              );
            }
          },
          __sys_mmap2: function (e, t, r, n, a, i) {
            try {
              return (function (e, t, r, n, a, i) {
                var o;
                i <<= 12;
                var u = !1;
                if (0 != (16 & n) && e % 16384 != 0) return -28;
                if (0 != (32 & n)) {
                  if (!(o = Zr(16384, t))) return -48;
                  zr(o, 0, t), (u = !0);
                } else {
                  var s = Ae.getStream(a);
                  if (!s) return -8;
                  var c = Ae.mmap(s, I, e, t, i, r, n);
                  (o = c.ptr), (u = c.allocated);
                }
                return (
                  (Le.mappings[o] = {
                    malloc: o,
                    len: t,
                    allocated: u,
                    fd: a,
                    prot: r,
                    flags: n,
                    offset: i
                  }),
                  o
                );
              })(e, t, r, n, a, i);
            } catch (e) {
              return (
                (void 0 !== Ae && e instanceof Ae.ErrnoError) || ve(e), -e.errno
              );
            }
          },
          __sys_munmap: function (e, t) {
            try {
              return (function (e, t) {
                if (-1 == (0 | e) || 0 === t) return -28;
                var r = Le.mappings[e];
                if (!r) return 0;
                if (t === r.len) {
                  var n = Ae.getStream(r.fd);
                  2 & r.prot && Le.doMsync(e, n, t, r.flags, r.offset),
                    Ae.munmap(n),
                    (Le.mappings[e] = null),
                    r.allocated && Gr(r.malloc);
                }
                return 0;
              })(e, t);
            } catch (e) {
              return (
                (void 0 !== Ae && e instanceof Ae.ErrnoError) || ve(e), -e.errno
              );
            }
          },
          __sys_open: function (e, t, r) {
            Le.varargs = r;
            try {
              var n = Le.getStr(e),
                a = Le.get();
              return Ae.open(n, t, a).fd;
            } catch (e) {
              return (
                (void 0 !== Ae && e instanceof Ae.ErrnoError) || ve(e), -e.errno
              );
            }
          },
          __sys_read: function (e, t, r) {
            try {
              var n = Le.getStreamFromFD(e);
              return Ae.read(n, L, t, r);
            } catch (e) {
              return (
                (void 0 !== Ae && e instanceof Ae.ErrnoError) || ve(e), -e.errno
              );
            }
          },
          __sys_stat64: function (e, t) {
            try {
              return (e = Le.getStr(e)), Le.doStat(Ae.stat, e, t);
            } catch (e) {
              return (
                (void 0 !== Ae && e instanceof Ae.ErrnoError) || ve(e), -e.errno
              );
            }
          },
          _embind_register_bool: function (e, t, r, n, a) {
            var i = Ie(r);
            Xe(e, {
              name: (t = Re(t)),
              fromWireType: function (e) {
                return !!e;
              },
              toWireType: function (e, t) {
                return t ? n : a;
              },
              argPackAdvance: 8,
              readValueFromPointer: function (e) {
                var n;
                if (1 === r) n = L;
                else if (2 === r) n = B;
                else {
                  if (4 !== r)
                    throw new TypeError("Unknown boolean type size: " + t);
                  n = O;
                }
                return this.fromWireType(n[e >> i]);
              },
              destructorFunction: null
            });
          },
          _embind_register_class: function (
            e,
            t,
            r,
            n,
            a,
            i,
            o,
            u,
            s,
            c,
            l,
            f,
            d
          ) {
            (l = Re(l)),
              (i = Mt(a, i)),
              u && (u = Mt(o, u)),
              c && (c = Mt(s, c)),
              (d = Mt(f, d));
            var m = je(l);
            ft(m, function () {
              It("Cannot construct " + l + " due to unbound types", [n]);
            }),
              Ye([e, t, r], n ? [n] : [], function (t) {
                var r, a;
                (t = t[0]),
                  (a = n
                    ? (r = t.registeredClass).instancePrototype
                    : st.prototype);
                var o = ze(m, function () {
                    if (Object.getPrototypeOf(this) !== s)
                      throw new Ge("Use 'new' to construct " + l);
                    if (void 0 === f.constructor_body)
                      throw new Ge(l + " has no accessible constructor");
                    var e = f.constructor_body[arguments.length];
                    if (void 0 === e)
                      throw new Ge(
                        "Tried to invoke ctor of " +
                          l +
                          " with invalid number of parameters (" +
                          arguments.length +
                          ") - expected (" +
                          Object.keys(f.constructor_body).toString() +
                          ") parameters instead!"
                      );
                    return e.apply(this, arguments);
                  }),
                  s = Object.create(a, { constructor: { value: o } });
                o.prototype = s;
                var f = new dt(l, o, s, d, r, i, u, c),
                  p = new Pt(l, f, !0, !1, !1),
                  v = new Pt(l + "*", f, !1, !1, !1),
                  h = new Pt(l + " const*", f, !1, !0, !1);
                return (
                  (ct[e] = { pointerType: v, constPointerType: h }),
                  Tt(m, o),
                  [p, v, h]
                );
              });
          },
          _embind_register_class_class_function: function (
            e,
            t,
            r,
            n,
            a,
            i,
            o
          ) {
            var u = Nt(r, n);
            (t = Re(t)),
              (i = Mt(a, i)),
              Ye([], [e], function (e) {
                var n = (e = e[0]).name + "." + t;
                function a() {
                  It("Cannot call " + n + " due to unbound types", u);
                }
                var s = e.registeredClass.constructor;
                return (
                  void 0 === s[t]
                    ? ((a.argCount = r - 1), (s[t] = a))
                    : (lt(s, t, n), (s[t].overloadTable[r - 1] = a)),
                  Ye([], u, function (e) {
                    var a = [e[0], null].concat(e.slice(1)),
                      u = Ot(n, a, null, i, o);
                    return (
                      void 0 === s[t].overloadTable
                        ? ((u.argCount = r - 1), (s[t] = u))
                        : (s[t].overloadTable[r - 1] = u),
                      []
                    );
                  }),
                  []
                );
              });
          },
          _embind_register_class_constructor: function (e, t, r, n, a, i) {
            k(t > 0);
            var o = Nt(t, r);
            a = Mt(n, a);
            var u = [i],
              s = [];
            Ye([], [e], function (e) {
              var r = "constructor " + (e = e[0]).name;
              if (
                (void 0 === e.registeredClass.constructor_body &&
                  (e.registeredClass.constructor_body = []),
                void 0 !== e.registeredClass.constructor_body[t - 1])
              )
                throw new Ge(
                  "Cannot register multiple constructors with identical number of parameters (" +
                    (t - 1) +
                    ") for class '" +
                    e.name +
                    "'! Overload resolution is currently only performed using the parameter count, not actual type info!"
                );
              return (
                (e.registeredClass.constructor_body[t - 1] = function () {
                  It("Cannot construct " + e.name + " due to unbound types", o);
                }),
                Ye([], o, function (n) {
                  return (
                    (e.registeredClass.constructor_body[t - 1] = function () {
                      arguments.length !== t - 1 &&
                        $e(
                          r +
                            " called with " +
                            arguments.length +
                            " arguments, expected " +
                            (t - 1)
                        ),
                        (s.length = 0),
                        (u.length = t);
                      for (var e = 1; e < t; ++e)
                        u[e] = n[e].toWireType(s, arguments[e - 1]);
                      var i = a.apply(null, u);
                      return Rt(s), n[0].fromWireType(i);
                    }),
                    []
                  );
                }),
                []
              );
            });
          },
          _embind_register_class_function: function (e, t, r, n, a, i, o, u) {
            var s = Nt(r, n);
            (t = Re(t)),
              (i = Mt(a, i)),
              Ye([], [e], function (e) {
                var n = (e = e[0]).name + "." + t;
                function a() {
                  It("Cannot call " + n + " due to unbound types", s);
                }
                u && e.registeredClass.pureVirtualFunctions.push(t);
                var c = e.registeredClass.instancePrototype,
                  l = c[t];
                return (
                  void 0 === l ||
                  (void 0 === l.overloadTable &&
                    l.className !== e.name &&
                    l.argCount === r - 2)
                    ? ((a.argCount = r - 2), (a.className = e.name), (c[t] = a))
                    : (lt(c, t, n), (c[t].overloadTable[r - 2] = a)),
                  Ye([], s, function (a) {
                    var u = Ot(n, a, e, i, o);
                    return (
                      void 0 === c[t].overloadTable
                        ? ((u.argCount = r - 2), (c[t] = u))
                        : (c[t].overloadTable[r - 2] = u),
                      []
                    );
                  }),
                  []
                );
              });
          },
          _embind_register_class_property: function (
            e,
            t,
            r,
            n,
            a,
            i,
            o,
            u,
            s,
            c
          ) {
            (t = Re(t)),
              (a = Mt(n, a)),
              Ye([], [e], function (e) {
                var n = (e = e[0]).name + "." + t,
                  l = {
                    get: function () {
                      It("Cannot access " + n + " due to unbound types", [
                        r,
                        o
                      ]);
                    },
                    enumerable: !0,
                    configurable: !0
                  };
                return (
                  (l.set = s
                    ? function () {
                        It("Cannot access " + n + " due to unbound types", [
                          r,
                          o
                        ]);
                      }
                    : function (e) {
                        $e(n + " is a read-only property");
                      }),
                  Object.defineProperty(
                    e.registeredClass.instancePrototype,
                    t,
                    l
                  ),
                  Ye([], s ? [r, o] : [r], function (r) {
                    var o = r[0],
                      l = {
                        get: function () {
                          var t = Ut(this, e, n + " getter");
                          return o.fromWireType(a(i, t));
                        },
                        enumerable: !0
                      };
                    if (s) {
                      s = Mt(u, s);
                      var f = r[1];
                      l.set = function (t) {
                        var r = Ut(this, e, n + " setter"),
                          a = [];
                        s(c, r, f.toWireType(a, t)), Rt(a);
                      };
                    }
                    return (
                      Object.defineProperty(
                        e.registeredClass.instancePrototype,
                        t,
                        l
                      ),
                      []
                    );
                  }),
                  []
                );
              });
          },
          _embind_register_emval: function (e, t) {
            Xe(e, {
              name: (t = Re(t)),
              fromWireType: function (e) {
                var t = zt[e].value;
                return Wt(e), t;
              },
              toWireType: function (e, t) {
                return qt(t);
              },
              argPackAdvance: 8,
              readValueFromPointer: gt,
              destructorFunction: null
            });
          },
          _embind_register_enum: function (e, t, r, n) {
            var a = Ie(r);
            function i() {}
            (t = Re(t)),
              (i.values = {}),
              Xe(e, {
                name: t,
                constructor: i,
                fromWireType: function (e) {
                  return this.constructor.values[e];
                },
                toWireType: function (e, t) {
                  return t.value;
                },
                argPackAdvance: 8,
                readValueFromPointer: Vt(t, a, n),
                destructorFunction: null
              }),
              ft(t, i);
          },
          _embind_register_enum_value: function (e, t, r) {
            var n = Yt(e, "enum");
            t = Re(t);
            var a = n.constructor,
              i = Object.create(n.constructor.prototype, {
                value: { value: r },
                constructor: { value: ze(n.name + "_" + t, function () {}) }
              });
            (a.values[r] = i), (a[t] = i);
          },
          _embind_register_float: function (e, t, r) {
            var n = Ie(r);
            Xe(e, {
              name: (t = Re(t)),
              fromWireType: function (e) {
                return e;
              },
              toWireType: function (e, t) {
                if ("number" != typeof t && "boolean" != typeof t)
                  throw new TypeError(
                    'Cannot convert "' + Xt(t) + '" to ' + this.name
                  );
                return t;
              },
              argPackAdvance: 8,
              readValueFromPointer: Qt(t, n),
              destructorFunction: null
            });
          },
          _embind_register_function: function (e, t, r, n, a, i) {
            var o = Nt(t, r);
            (e = Re(e)),
              (a = Mt(n, a)),
              ft(
                e,
                function () {
                  It("Cannot call " + e + " due to unbound types", o);
                },
                t - 1
              ),
              Ye([], o, function (r) {
                var n = [r[0], null].concat(r.slice(1));
                return Tt(e, Ot(e, n, null, a, i), t - 1), [];
              });
          },
          _embind_register_integer: function (e, t, r, n, a) {
            (t = Re(t)), -1 === a && (a = 4294967295);
            var i = Ie(r),
              o = function (e) {
                return e;
              };
            if (0 === n) {
              var u = 32 - 8 * r;
              o = function (e) {
                return (e << u) >>> u;
              };
            }
            var s = -1 != t.indexOf("unsigned");
            Xe(e, {
              name: t,
              fromWireType: o,
              toWireType: function (e, r) {
                if ("number" != typeof r && "boolean" != typeof r)
                  throw new TypeError(
                    'Cannot convert "' + Xt(r) + '" to ' + this.name
                  );
                if (r < n || r > a)
                  throw new TypeError(
                    'Passing a number "' +
                      Xt(r) +
                      '" from JS side to C/C++ side to an argument of type "' +
                      t +
                      '", which is outside the valid range [' +
                      n +
                      ", " +
                      a +
                      "]!"
                  );
                return s ? r >>> 0 : 0 | r;
              },
              argPackAdvance: 8,
              readValueFromPointer: Ht(t, i, 0 !== n),
              destructorFunction: null
            });
          },
          _embind_register_memory_view: function (e, t, r) {
            var n = [
              Int8Array,
              Uint8Array,
              Int16Array,
              Uint16Array,
              Int32Array,
              Uint32Array,
              Float32Array,
              Float64Array
            ][t];
            function a(e) {
              var t = N,
                r = t[(e >>= 2)],
                a = t[e + 1];
              return new n(A, a, r);
            }
            Xe(
              e,
              {
                name: (r = Re(r)),
                fromWireType: a,
                argPackAdvance: 8,
                readValueFromPointer: a
              },
              { ignoreDuplicateRegistrations: !0 }
            );
          },
          _embind_register_smart_ptr: function (
            e,
            t,
            r,
            n,
            a,
            i,
            o,
            u,
            s,
            c,
            l,
            f
          ) {
            (r = Re(r)),
              (i = Mt(a, i)),
              (u = Mt(o, u)),
              (c = Mt(s, c)),
              (f = Mt(l, f)),
              Ye([e], [t], function (e) {
                return (
                  (e = e[0]),
                  [new Pt(r, e.registeredClass, !1, !1, !0, e, n, i, u, c, f)]
                );
              });
          },
          _embind_register_std_string: function (e, t) {
            var r = "std::string" === (t = Re(t));
            Xe(e, {
              name: t,
              fromWireType: function (e) {
                var t,
                  n = N[e >> 2];
                if (r) {
                  var a = I[e + 4 + n],
                    i = 0;
                  0 != a && ((i = a), (I[e + 4 + n] = 0));
                  for (var o = e + 4, u = 0; u <= n; ++u) {
                    var s = e + 4 + u;
                    if (0 == I[s]) {
                      var c = D(o);
                      void 0 === t
                        ? (t = c)
                        : ((t += String.fromCharCode(0)), (t += c)),
                        (o = s + 1);
                    }
                  }
                  0 != i && (I[e + 4 + n] = i);
                } else {
                  var l = new Array(n);
                  for (u = 0; u < n; ++u)
                    l[u] = String.fromCharCode(I[e + 4 + u]);
                  t = l.join("");
                }
                return Gr(e), t;
              },
              toWireType: function (e, t) {
                t instanceof ArrayBuffer && (t = new Uint8Array(t));
                var n = "string" == typeof t;
                n ||
                  t instanceof Uint8Array ||
                  t instanceof Uint8ClampedArray ||
                  t instanceof Int8Array ||
                  $e("Cannot pass non-string to std::string");
                var a = (
                    r && n
                      ? function () {
                          return M(t);
                        }
                      : function () {
                          return t.length;
                        }
                  )(),
                  i = $r(4 + a + 1);
                if (((N[i >> 2] = a), r && n)) T(t, i + 4, a + 1);
                else if (n)
                  for (var o = 0; o < a; ++o) {
                    var u = t.charCodeAt(o);
                    u > 255 &&
                      (Gr(i),
                      $e(
                        "String has UTF-16 code units that do not fit in 8 bits"
                      )),
                      (I[i + 4 + o] = u);
                  }
                else for (o = 0; o < a; ++o) I[i + 4 + o] = t[o];
                return null !== e && e.push(Gr, i), i;
              },
              argPackAdvance: 8,
              readValueFromPointer: gt,
              destructorFunction: function (e) {
                Gr(e);
              }
            });
          },
          _embind_register_std_wstring: function (e, t, r) {
            var n, a, i, o, u;
            (r = Re(r)),
              2 === t
                ? ((n = W),
                  (a = G),
                  (o = $),
                  (i = function () {
                    return R;
                  }),
                  (u = 1))
                : 4 === t &&
                  ((n = q),
                  (a = V),
                  (o = Y),
                  (i = function () {
                    return N;
                  }),
                  (u = 2)),
              Xe(e, {
                name: r,
                fromWireType: function (e) {
                  var r,
                    a = N[e >> 2],
                    o = i(),
                    s = o[(e + 4 + a * t) >> u],
                    c = 0;
                  0 != s && ((c = s), (o[(e + 4 + a * t) >> u] = 0));
                  for (var l = e + 4, f = 0; f <= a; ++f) {
                    var d = e + 4 + f * t;
                    if (0 == o[d >> u]) {
                      var m = n(l);
                      void 0 === r
                        ? (r = m)
                        : ((r += String.fromCharCode(0)), (r += m)),
                        (l = d + t);
                    }
                  }
                  return 0 != c && (o[(e + 4 + a * t) >> u] = c), Gr(e), r;
                },
                toWireType: function (e, n) {
                  "string" != typeof n &&
                    $e("Cannot pass non-string to C++ string type " + r);
                  var i = o(n),
                    s = $r(4 + i + t);
                  return (
                    (N[s >> 2] = i >> u),
                    a(n, s + 4, i + t),
                    null !== e && e.push(Gr, s),
                    s
                  );
                },
                argPackAdvance: 8,
                readValueFromPointer: gt,
                destructorFunction: function (e) {
                  Gr(e);
                }
              });
          },
          _embind_register_void: function (e, t) {
            Xe(e, {
              isVoid: !0,
              name: (t = Re(t)),
              argPackAdvance: 0,
              fromWireType: function () {},
              toWireType: function (e, t) {}
            });
          },
          _emval_as: function (e, t, r) {
            (e = Kt(e)), (t = Yt(t, "emval::as"));
            var n = [],
              a = qt(n);
            return (O[r >> 2] = a), t.toWireType(n, e);
          },
          _emval_call: function (e, t, r, n) {
            e = Kt(e);
            for (var a = Zt(t, r), i = new Array(t), o = 0; o < t; ++o) {
              var u = a[o];
              (i[o] = u.readValueFromPointer(n)), (n += u.argPackAdvance);
            }
            return qt(e.apply(void 0, i));
          },
          _emval_call_void_method: function (e, t, r, n) {
            (e = rr[e])((t = Kt(t)), (r = er(r)), null, n);
          },
          _emval_decref: Wt,
          _emval_get_method_caller: function (e, t) {
            for (
              var r = Zt(e, t),
                n = r[0],
                a =
                  n.name +
                  "_$" +
                  r
                    .slice(1)
                    .map(function (e) {
                      return e.name;
                    })
                    .join("_") +
                  "$",
                i = ["retType"],
                o = [n],
                u = "",
                s = 0;
              s < e - 1;
              ++s
            )
              (u += (0 !== s ? ", " : "") + "arg" + s),
                i.push("argType" + s),
                o.push(r[1 + s]);
            var c =
                "return function " +
                je("methodCaller_" + a) +
                "(handle, name, destructors, args) {\n",
              l = 0;
            for (s = 0; s < e - 1; ++s)
              (c +=
                "    var arg" +
                s +
                " = argType" +
                s +
                ".readValueFromPointer(args" +
                (l ? "+" + l : "") +
                ");\n"),
                (l += r[s + 1].argPackAdvance);
            for (
              c += "    var rv = handle[name](" + u + ");\n", s = 0;
              s < e - 1;
              ++s
            )
              r[s + 1].deleteObject &&
                (c += "    argType" + s + ".deleteObject(arg" + s + ");\n");
            n.isVoid ||
              (c += "    return retType.toWireType(destructors, rv);\n"),
              (c += "};\n"),
              i.push(c);
            var f,
              d,
              m = Bt(Function, i).apply(null, o);
            return (f = m), (d = rr.length), rr.push(f), d;
          },
          _emval_get_property: function (e, t) {
            return qt((e = Kt(e))[(t = Kt(t))]);
          },
          _emval_incref: function (e) {
            e > 4 && (zt[e].refcount += 1);
          },
          _emval_is_number: function (e) {
            return "number" == typeof (e = Kt(e));
          },
          _emval_new_cstring: function (e) {
            return qt(er(e));
          },
          _emval_run_destructors: function (e) {
            Rt(zt[e].value), Wt(e);
          },
          _emval_take_value: function (e, t) {
            return qt((e = Yt(e, "_emval_take_value")).readValueFromPointer(t));
          },
          abort: function () {
            ve();
          },
          alBufferData: function (e, t, r, n, a) {
            if (ir.currentCtx) {
              var i = ir.buffers[e];
              if (i)
                if (a <= 0) ir.currentCtx.err = 40963;
                else {
                  var o = null;
                  try {
                    switch (t) {
                      case 4352:
                        if (n > 0)
                          for (
                            var u = (o = ir.currentCtx.audioCtx.createBuffer(
                                1,
                                n,
                                a
                              )).getChannelData(0),
                              s = 0;
                            s < n;
                            ++s
                          )
                            u[s] = 0.0078125 * I[r++] - 1;
                        (i.bytesPerSample = 1),
                          (i.channels = 1),
                          (i.length = n);
                        break;
                      case 4353:
                        if (n > 0)
                          for (
                            u = (o = ir.currentCtx.audioCtx.createBuffer(
                              1,
                              n >> 1,
                              a
                            )).getChannelData(0),
                              r >>= 1,
                              s = 0;
                            s < n >> 1;
                            ++s
                          )
                            u[s] = 30517578125e-15 * B[r++];
                        (i.bytesPerSample = 2),
                          (i.channels = 1),
                          (i.length = n >> 1);
                        break;
                      case 4354:
                        if (n > 0) {
                          u = (o = ir.currentCtx.audioCtx.createBuffer(
                            2,
                            n >> 1,
                            a
                          )).getChannelData(0);
                          var c = o.getChannelData(1);
                          for (s = 0; s < n >> 1; ++s)
                            (u[s] = 0.0078125 * I[r++] - 1),
                              (c[s] = 0.0078125 * I[r++] - 1);
                        }
                        (i.bytesPerSample = 1),
                          (i.channels = 2),
                          (i.length = n >> 1);
                        break;
                      case 4355:
                        if (n > 0)
                          for (
                            u = (o = ir.currentCtx.audioCtx.createBuffer(
                              2,
                              n >> 2,
                              a
                            )).getChannelData(0),
                              c = o.getChannelData(1),
                              r >>= 1,
                              s = 0;
                            s < n >> 2;
                            ++s
                          )
                            (u[s] = 30517578125e-15 * B[r++]),
                              (c[s] = 30517578125e-15 * B[r++]);
                        (i.bytesPerSample = 2),
                          (i.channels = 2),
                          (i.length = n >> 2);
                        break;
                      case 65552:
                        if (n > 0)
                          for (
                            u = (o = ir.currentCtx.audioCtx.createBuffer(
                              1,
                              n >> 2,
                              a
                            )).getChannelData(0),
                              r >>= 2,
                              s = 0;
                            s < n >> 2;
                            ++s
                          )
                            u[s] = U[r++];
                        (i.bytesPerSample = 4),
                          (i.channels = 1),
                          (i.length = n >> 2);
                        break;
                      case 65553:
                        if (n > 0)
                          for (
                            u = (o = ir.currentCtx.audioCtx.createBuffer(
                              2,
                              n >> 3,
                              a
                            )).getChannelData(0),
                              c = o.getChannelData(1),
                              r >>= 2,
                              s = 0;
                            s < n >> 3;
                            ++s
                          )
                            (u[s] = U[r++]), (c[s] = U[r++]);
                        (i.bytesPerSample = 4),
                          (i.channels = 2),
                          (i.length = n >> 3);
                        break;
                      default:
                        return void (ir.currentCtx.err = 40963);
                    }
                    (i.frequency = a), (i.audioBuf = o);
                  } catch (e) {
                    return void (ir.currentCtx.err = 40963);
                  }
                }
              else ir.currentCtx.err = 40963;
            }
          },
          alDeleteBuffers: function (e, t) {
            if (ir.currentCtx) {
              for (var r = 0; r < e; ++r)
                if (0 !== (n = O[(t + 4 * r) >> 2])) {
                  if (!ir.buffers[n]) return void (ir.currentCtx.err = 40961);
                  if (ir.buffers[n].refCount)
                    return void (ir.currentCtx.err = 40964);
                }
              for (r = 0; r < e; ++r) {
                var n;
                0 !== (n = O[(t + 4 * r) >> 2]) &&
                  (ir.deviceRefCounts[ir.buffers[n].deviceId]--,
                  delete ir.buffers[n],
                  ir.freeIds.push(n));
              }
            }
          },
          alDeleteSources: function (e, t) {
            if (ir.currentCtx) {
              for (var r = 0; r < e; ++r) {
                var n = O[(t + 4 * r) >> 2];
                if (!ir.currentCtx.sources[n])
                  return void (ir.currentCtx.err = 40961);
              }
              for (r = 0; r < e; ++r)
                (n = O[(t + 4 * r) >> 2]),
                  ir.setSourceState(ir.currentCtx.sources[n], 4116),
                  or(n, 4105, 0),
                  delete ir.currentCtx.sources[n],
                  ir.freeIds.push(n);
            }
          },
          alGenBuffers: function (e, t) {
            if (ir.currentCtx)
              for (var r = 0; r < e; ++r) {
                var n = {
                  deviceId: ir.currentCtx.deviceId,
                  id: ir.newId(),
                  refCount: 0,
                  audioBuf: null,
                  frequency: 0,
                  bytesPerSample: 2,
                  channels: 1,
                  length: 0
                };
                ir.deviceRefCounts[n.deviceId]++,
                  (ir.buffers[n.id] = n),
                  (O[(t + 4 * r) >> 2] = n.id);
              }
          },
          alGenSources: function (e, t) {
            if (ir.currentCtx)
              for (var r = 0; r < e; ++r) {
                var n = ir.currentCtx.audioCtx.createGain();
                n.connect(ir.currentCtx.gain);
                var a = {
                  context: ir.currentCtx,
                  id: ir.newId(),
                  type: 4144,
                  state: 4113,
                  bufQueue: [ir.buffers[0]],
                  audioQueue: [],
                  looping: !1,
                  pitch: 1,
                  dopplerShift: 1,
                  gain: n,
                  minGain: 0,
                  maxGain: 1,
                  panner: null,
                  bufsProcessed: 0,
                  bufStartTime: Number.NEGATIVE_INFINITY,
                  bufOffset: 0,
                  relative: !1,
                  refDistance: 1,
                  maxDistance: 340282e33,
                  rolloffFactor: 1,
                  position: [0, 0, 0],
                  velocity: [0, 0, 0],
                  direction: [0, 0, 0],
                  coneOuterGain: 0,
                  coneInnerAngle: 360,
                  coneOuterAngle: 360,
                  distanceModel: 53250,
                  spatialize: 2,
                  get playbackRate() {
                    return this.pitch * this.dopplerShift;
                  }
                };
                (ir.currentCtx.sources[a.id] = a), (O[(t + 4 * r) >> 2] = a.id);
              }
          },
          alGetError: function () {
            if (ir.currentCtx) {
              var e = ir.currentCtx.err;
              return (ir.currentCtx.err = 0), e;
            }
            return 40964;
          },
          alGetSourcei: function (e, t, r) {
            var n = ir.getSourceParam("alGetSourcei", e, t);
            if (null !== n)
              if (r)
                switch (t) {
                  case 514:
                  case 4097:
                  case 4098:
                  case 4103:
                  case 4105:
                  case 4112:
                  case 4117:
                  case 4118:
                  case 4128:
                  case 4129:
                  case 4131:
                  case 4132:
                  case 4133:
                  case 4134:
                  case 4135:
                  case 4628:
                  case 8201:
                  case 8202:
                  case 53248:
                    O[r >> 2] = n;
                    break;
                  default:
                    return void (ir.currentCtx.err = 40962);
                }
              else ir.currentCtx.err = 40963;
          },
          alGetString: function (e) {
            if (!ir.currentCtx) return 0;
            if (ir.stringCache[e]) return ir.stringCache[e];
            var t;
            switch (e) {
              case 0:
                t = "No Error";
                break;
              case 40961:
                t = "Invalid Name";
                break;
              case 40962:
                t = "Invalid Enum";
                break;
              case 40963:
                t = "Invalid Value";
                break;
              case 40964:
                t = "Invalid Operation";
                break;
              case 40965:
                t = "Out of Memory";
                break;
              case 45057:
                t = "Emscripten";
                break;
              case 45058:
                t = "1.1";
                break;
              case 45059:
                t = "WebAudio";
                break;
              case 45060:
                for (var r in ((t = ""), ir.AL_EXTENSIONS))
                  t = (t = t.concat(r)).concat(" ");
                t = t.trim();
                break;
              default:
                return (ir.currentCtx.err = 40962), 0;
            }
            return (t = x(Rr(t), "i8", 0)), (ir.stringCache[e] = t), t;
          },
          alSourcePause: function (e) {
            if (ir.currentCtx) {
              var t = ir.currentCtx.sources[e];
              t ? ir.setSourceState(t, 4115) : (ir.currentCtx.err = 40961);
            }
          },
          alSourcePlay: function (e) {
            if (ir.currentCtx) {
              var t = ir.currentCtx.sources[e];
              t ? ir.setSourceState(t, 4114) : (ir.currentCtx.err = 40961);
            }
          },
          alSourceStop: function (e) {
            if (ir.currentCtx) {
              var t = ir.currentCtx.sources[e];
              t ? ir.setSourceState(t, 4116) : (ir.currentCtx.err = 40961);
            }
          },
          alSourcef: function (e, t, r) {
            switch (t) {
              case 4097:
              case 4098:
              case 4099:
              case 4106:
              case 4109:
              case 4110:
              case 4128:
              case 4129:
              case 4130:
              case 4131:
              case 4132:
              case 4133:
              case 4134:
              case 8203:
                ir.setSourceParam("alSourcef", e, t, r);
                break;
              default:
                ir.setSourceParam("alSourcef", e, t, null);
            }
          },
          alSourcei: or,
          alcCloseDevice: function (e) {
            return !(e in ir.deviceRefCounts) || ir.deviceRefCounts[e] > 0
              ? 0
              : (delete ir.deviceRefCounts[e], ir.freeIds.push(e), 1);
          },
          alcCreateContext: function (e, t) {
            if (!(e in ir.deviceRefCounts)) return (ir.alcErr = 40961), 0;
            var r = null,
              n = [],
              a = null;
            if ((t >>= 2))
              for (var i = 0, o = 0; (i = O[t++]), n.push(i), 0 !== i; )
                switch (((o = O[t++]), n.push(o), i)) {
                  case 4103:
                    r || (r = {}), (r.sampleRate = o);
                    break;
                  case 4112:
                  case 4113:
                    break;
                  case 6546:
                    switch (o) {
                      case 0:
                        a = !1;
                        break;
                      case 1:
                        a = !0;
                        break;
                      case 2:
                        break;
                      default:
                        return (ir.alcErr = 40964), 0;
                    }
                    break;
                  case 6550:
                    if (0 !== o) return (ir.alcErr = 40964), 0;
                    break;
                  default:
                    return (ir.alcErr = 40964), 0;
                }
            var u = window.AudioContext || window.webkitAudioContext,
              s = null;
            try {
              s = r ? new u(r) : new u();
            } catch (e) {
              return (
                "NotSupportedError" === e.name
                  ? (ir.alcErr = 40964)
                  : (ir.alcErr = 40961),
                0
              );
            }
            void 0 === s.createGain && (s.createGain = s.createGainNode);
            var c = s.createGain();
            c.connect(s.destination);
            var l = {
              deviceId: e,
              id: ir.newId(),
              attrs: n,
              audioCtx: s,
              listener: {
                position: [0, 0, 0],
                velocity: [0, 0, 0],
                direction: [0, 0, 0],
                up: [0, 0, 0]
              },
              sources: [],
              interval: setInterval(function () {
                ir.scheduleContextAudio(l);
              }, ir.QUEUE_INTERVAL),
              gain: c,
              distanceModel: 53250,
              speedOfSound: 343.3,
              dopplerFactor: 1,
              sourceDistanceModel: !1,
              hrtf: a || !1,
              _err: 0,
              get err() {
                return this._err;
              },
              set err(e) {
                (0 !== this._err && 0 !== e) || (this._err = e);
              }
            };
            if ((ir.deviceRefCounts[e]++, (ir.contexts[l.id] = l), null !== a))
              for (var f in ir.contexts) {
                var d = ir.contexts[f];
                d.deviceId === e && ((d.hrtf = a), ir.updateContextGlobal(d));
              }
            return l.id;
          },
          alcDestroyContext: function (e) {
            var t = ir.contexts[e];
            ir.currentCtx !== t
              ? (ir.contexts[e].interval &&
                  clearInterval(ir.contexts[e].interval),
                ir.deviceRefCounts[t.deviceId]--,
                delete ir.contexts[e],
                ir.freeIds.push(e))
              : (ir.alcErr = 40962);
          },
          alcGetError: function (e) {
            var t = ir.alcErr;
            return (ir.alcErr = 0), t;
          },
          alcGetString: function (e, t) {
            if (ir.alcStringCache[t]) return ir.alcStringCache[t];
            var r;
            switch (t) {
              case 0:
                r = "No Error";
                break;
              case 40961:
                r = "Invalid Device";
                break;
              case 40962:
                r = "Invalid Context";
                break;
              case 40963:
                r = "Invalid Enum";
                break;
              case 40964:
                r = "Invalid Value";
                break;
              case 40965:
                r = "Out of Memory";
                break;
              case 4100:
                if (
                  "undefined" == typeof AudioContext &&
                  "undefined" == typeof webkitAudioContext
                )
                  return 0;
                r = ir.DEVICE_NAME;
                break;
              case 4101:
                r =
                  "undefined" != typeof AudioContext ||
                  "undefined" != typeof webkitAudioContext
                    ? ir.DEVICE_NAME.concat("\0")
                    : "\0";
                break;
              case 785:
                r = ir.CAPTURE_DEVICE_NAME;
                break;
              case 784:
                if (0 === e) r = ir.CAPTURE_DEVICE_NAME.concat("\0");
                else {
                  var n = ir.requireValidCaptureDevice(e, "alcGetString");
                  if (!n) return 0;
                  r = n.deviceName;
                }
                break;
              case 4102:
                if (!e) return (ir.alcErr = 40961), 0;
                for (var a in ((r = ""), ir.ALC_EXTENSIONS))
                  r = (r = r.concat(a)).concat(" ");
                r = r.trim();
                break;
              default:
                return (ir.alcErr = 40963), 0;
            }
            return (r = x(Rr(r), "i8", 0)), (ir.alcStringCache[t] = r), r;
          },
          alcMakeContextCurrent: function (e) {
            return 0 === e
              ? ((ir.currentCtx = null), 0)
              : ((ir.currentCtx = ir.contexts[e]), 1);
          },
          alcOpenDevice: function (e) {
            if (e && D(e) !== ir.DEVICE_NAME) return 0;
            if (
              "undefined" != typeof AudioContext ||
              "undefined" != typeof webkitAudioContext
            ) {
              var t = ir.newId();
              return (ir.deviceRefCounts[t] = 0), t;
            }
            return 0;
          },
          clock_gettime: function (e, t) {
            var r;
            if (0 === e) r = Date.now();
            else {
              if (1 !== e && 4 !== e) return Se(28), -1;
              r = tr();
            }
            return (
              (O[t >> 2] = (r / 1e3) | 0),
              (O[(t + 4) >> 2] = ((r % 1e3) * 1e3 * 1e3) | 0),
              0
            );
          },
          difftime: function (e, t) {
            return e - t;
          },
          dlopen: function (e, t) {
            ve(
              "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
            );
          },
          dlsym: function (e, t) {
            ve(
              "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
            );
          },
          emscripten_asm_const_iii: function (e, t, r) {
            var n = Tr(t, r);
            return Ce[e].apply(null, n);
          },
          emscripten_get_sbrk_ptr: function () {
            return 9175376;
          },
          emscripten_longjmp: function (e, t) {
            !(function (e, t) {
              throw (Hr(e, t || 1), "longjmp");
            })(e, t);
          },
          emscripten_memcpy_big: function (e, t, r) {
            I.copyWithin(e, t, t + r);
          },
          emscripten_resize_heap: function (e) {
            e >>>= 0;
            var t = I.length,
              r = 2147483648;
            if (e > r) return !1;
            for (var n, a, i = 1; i <= 4; i *= 2) {
              var o = t * (1 + 0.2 / i);
              if (
                ((o = Math.min(o, e + 100663296)),
                sr(
                  Math.min(
                    r,
                    ((n = Math.max(16777216, e, o)) % (a = 65536) > 0 &&
                      (n += a - (n % a)),
                    n)
                  )
                ))
              )
                return !0;
            }
            return !1;
          },
          environ_get: function (e, t) {
            var r = 0;
            return (
              lr().forEach(function (n, a) {
                var i = t + r;
                (O[(e + 4 * a) >> 2] = i),
                  (function (e, t, r) {
                    for (var n = 0; n < e.length; ++n)
                      L[t++ >> 0] = e.charCodeAt(n);
                    r || (L[t >> 0] = 0);
                  })(n, i),
                  (r += n.length + 1);
              }),
              0
            );
          },
          environ_sizes_get: function (e, t) {
            var r = lr();
            O[e >> 2] = r.length;
            var n = 0;
            return (
              r.forEach(function (e) {
                n += e.length + 1;
              }),
              (O[t >> 2] = n),
              0
            );
          },
          exit: function (t) {
            !(function (t, r) {
              (r && h && 0 === t) ||
                (h || ((E = !0), e.onExit && e.onExit(t)), s(t, new cn(t)));
            })(t);
          },
          fd_close: function (e) {
            try {
              var t = Le.getStreamFromFD(e);
              return Ae.close(t), 0;
            } catch (e) {
              return (
                (void 0 !== Ae && e instanceof Ae.ErrnoError) || ve(e), e.errno
              );
            }
          },
          fd_fdstat_get: function (e, t) {
            try {
              var r = Le.getStreamFromFD(e),
                n = r.tty
                  ? 2
                  : Ae.isDir(r.mode)
                  ? 3
                  : Ae.isLink(r.mode)
                  ? 7
                  : 4;
              return (L[t >> 0] = n), 0;
            } catch (e) {
              return (
                (void 0 !== Ae && e instanceof Ae.ErrnoError) || ve(e), e.errno
              );
            }
          },
          fd_read: function (e, t, r, n) {
            try {
              var a = Le.getStreamFromFD(e),
                i = Le.doReadv(a, t, r);
              return (O[n >> 2] = i), 0;
            } catch (e) {
              return (
                (void 0 !== Ae && e instanceof Ae.ErrnoError) || ve(e), e.errno
              );
            }
          },
          fd_seek: function (e, t, r, n, a) {
            try {
              var i = Le.getStreamFromFD(e),
                o = 4294967296 * r + (t >>> 0),
                u = 9007199254740992;
              return o <= -u || o >= u
                ? -61
                : (Ae.llseek(i, o, n),
                  (_e = [
                    i.position >>> 0,
                    ((ye = i.position),
                    +oe(ye) >= 1
                      ? ye > 0
                        ? (0 | ce(+se(ye / 4294967296), 4294967295)) >>> 0
                        : ~~+ue((ye - +(~~ye >>> 0)) / 4294967296) >>> 0
                      : 0)
                  ]),
                  (O[a >> 2] = _e[0]),
                  (O[(a + 4) >> 2] = _e[1]),
                  i.getdents && 0 === o && 0 === n && (i.getdents = null),
                  0);
            } catch (e) {
              return (
                (void 0 !== Ae && e instanceof Ae.ErrnoError) || ve(e), e.errno
              );
            }
          },
          fd_write: function (e, t, r, n) {
            try {
              var a = Le.getStreamFromFD(e),
                i = Le.doWritev(a, t, r);
              return (O[n >> 2] = i), 0;
            } catch (e) {
              return (
                (void 0 !== Ae && e instanceof Ae.ErrnoError) || ve(e), e.errno
              );
            }
          },
          getTempRet0: function () {
            return 0 | _;
          },
          gettimeofday: function (e) {
            var t = Date.now();
            return (
              (O[e >> 2] = (t / 1e3) | 0),
              (O[(e + 4) >> 2] = ((t % 1e3) * 1e3) | 0),
              0
            );
          },
          glActiveTexture: function (e) {
            Mr.activeTexture(e);
          },
          glAttachShader: function (e, t) {
            Mr.attachShader(fr.programs[e], fr.shaders[t]);
          },
          glBindBuffer: function (e, t) {
            35051 == e
              ? (Mr.currentPixelPackBufferBinding = t)
              : 35052 == e && (Mr.currentPixelUnpackBufferBinding = t),
              Mr.bindBuffer(e, fr.buffers[t]);
          },
          glBindBufferBase: function (e, t, r) {
            Mr.bindBufferBase(e, t, fr.buffers[r]);
          },
          glBindBufferRange: function (e, t, r, n, a) {
            Mr.bindBufferRange(e, t, fr.buffers[r], n, a);
          },
          glBindFramebuffer: function (e, t) {
            Mr.bindFramebuffer(e, fr.framebuffers[t]);
          },
          glBindRenderbuffer: function (e, t) {
            Mr.bindRenderbuffer(e, fr.renderbuffers[t]);
          },
          glBindSampler: function (e, t) {
            Mr.bindSampler(e, fr.samplers[t]);
          },
          glBindTexture: function (e, t) {
            Mr.bindTexture(e, fr.textures[t]);
          },
          glBindVertexArray: function (e) {
            Mr.bindVertexArray(fr.vaos[e]);
          },
          glBlendEquation: function (e) {
            Mr.blendEquation(e);
          },
          glBlendEquationSeparate: function (e, t) {
            Mr.blendEquationSeparate(e, t);
          },
          glBlendFunc: function (e, t) {
            Mr.blendFunc(e, t);
          },
          glBlendFuncSeparate: function (e, t, r, n) {
            Mr.blendFuncSeparate(e, t, r, n);
          },
          glBlitFramebuffer: function (e, t, r, n, a, i, o, u, s, c) {
            Mr.blitFramebuffer(e, t, r, n, a, i, o, u, s, c);
          },
          glBufferData: function (e, t, r, n) {
            fr.currentContext.version >= 2
              ? r
                ? Mr.bufferData(e, I, n, r, t)
                : Mr.bufferData(e, t, n)
              : Mr.bufferData(e, r ? I.subarray(r, r + t) : t, n);
          },
          glBufferSubData: function (e, t, r, n) {
            fr.currentContext.version >= 2
              ? Mr.bufferSubData(e, t, I, n, r)
              : Mr.bufferSubData(e, t, I.subarray(n, n + r));
          },
          glCheckFramebufferStatus: function (e) {
            return Mr.checkFramebufferStatus(e);
          },
          glClear: function (e) {
            Mr.clear(e);
          },
          glClearBufferfv: function (e, t, r) {
            Mr.clearBufferfv(e, t, U, r >> 2);
          },
          glClearColor: function (e, t, r, n) {
            Mr.clearColor(e, t, r, n);
          },
          glClearDepthf: function (e) {
            Mr.clearDepth(e);
          },
          glColorMask: function (e, t, r, n) {
            Mr.colorMask(!!e, !!t, !!r, !!n);
          },
          glCompileShader: function (e) {
            Mr.compileShader(fr.shaders[e]);
          },
          glCompressedTexSubImage2D: function (e, t, r, n, a, i, o, u, s) {
            fr.currentContext.version >= 2
              ? Mr.currentPixelUnpackBufferBinding
                ? Mr.compressedTexSubImage2D(e, t, r, n, a, i, o, u, s)
                : Mr.compressedTexSubImage2D(e, t, r, n, a, i, o, I, s, u)
              : Mr.compressedTexSubImage2D(
                  e,
                  t,
                  r,
                  n,
                  a,
                  i,
                  o,
                  s ? I.subarray(s, s + u) : null
                );
          },
          glCompressedTexSubImage3D: function (
            e,
            t,
            r,
            n,
            a,
            i,
            o,
            u,
            s,
            c,
            l
          ) {
            Mr.currentPixelUnpackBufferBinding
              ? Mr.compressedTexSubImage3D(e, t, r, n, a, i, o, u, s, c, l)
              : Mr.compressedTexSubImage3D(e, t, r, n, a, i, o, u, s, I, l, c);
          },
          glCreateProgram: function () {
            var e = fr.getNewId(fr.programs),
              t = Mr.createProgram();
            return (t.name = e), (fr.programs[e] = t), e;
          },
          glCreateShader: function (e) {
            var t = fr.getNewId(fr.shaders);
            return (fr.shaders[t] = Mr.createShader(e)), t;
          },
          glCullFace: function (e) {
            Mr.cullFace(e);
          },
          glDeleteBuffers: function (e, t) {
            for (var r = 0; r < e; r++) {
              var n = O[(t + 4 * r) >> 2],
                a = fr.buffers[n];
              a &&
                (Mr.deleteBuffer(a),
                (a.name = 0),
                (fr.buffers[n] = null),
                n == fr.currArrayBuffer && (fr.currArrayBuffer = 0),
                n == fr.currElementArrayBuffer &&
                  (fr.currElementArrayBuffer = 0),
                n == Mr.currentPixelPackBufferBinding &&
                  (Mr.currentPixelPackBufferBinding = 0),
                n == Mr.currentPixelUnpackBufferBinding &&
                  (Mr.currentPixelUnpackBufferBinding = 0));
            }
          },
          glDeleteFramebuffers: function (e, t) {
            for (var r = 0; r < e; ++r) {
              var n = O[(t + 4 * r) >> 2],
                a = fr.framebuffers[n];
              a &&
                (Mr.deleteFramebuffer(a),
                (a.name = 0),
                (fr.framebuffers[n] = null));
            }
          },
          glDeleteProgram: function (e) {
            if (e) {
              var t = fr.programs[e];
              t
                ? (Mr.deleteProgram(t),
                  (t.name = 0),
                  (fr.programs[e] = null),
                  (fr.programInfos[e] = null))
                : fr.recordError(1281);
            }
          },
          glDeleteRenderbuffers: function (e, t) {
            for (var r = 0; r < e; r++) {
              var n = O[(t + 4 * r) >> 2],
                a = fr.renderbuffers[n];
              a &&
                (Mr.deleteRenderbuffer(a),
                (a.name = 0),
                (fr.renderbuffers[n] = null));
            }
          },
          glDeleteSamplers: function (e, t) {
            for (var r = 0; r < e; r++) {
              var n = O[(t + 4 * r) >> 2],
                a = fr.samplers[n];
              a && (Mr.deleteSampler(a), (a.name = 0), (fr.samplers[n] = null));
            }
          },
          glDeleteShader: function (e) {
            if (e) {
              var t = fr.shaders[e];
              t
                ? (Mr.deleteShader(t), (fr.shaders[e] = null))
                : fr.recordError(1281);
            }
          },
          glDeleteTextures: function (e, t) {
            for (var r = 0; r < e; r++) {
              var n = O[(t + 4 * r) >> 2],
                a = fr.textures[n];
              a && (Mr.deleteTexture(a), (a.name = 0), (fr.textures[n] = null));
            }
          },
          glDeleteVertexArrays: function (e, t) {
            for (var r = 0; r < e; r++) {
              var n = O[(t + 4 * r) >> 2];
              Mr.deleteVertexArray(fr.vaos[n]), (fr.vaos[n] = null);
            }
          },
          glDepthFunc: function (e) {
            Mr.depthFunc(e);
          },
          glDepthMask: function (e) {
            Mr.depthMask(!!e);
          },
          glDisable: function (e) {
            Mr.disable(e);
          },
          glDrawArrays: function (e, t, r) {
            Mr.drawArrays(e, t, r);
          },
          glDrawArraysInstanced: function (e, t, r, n) {
            Mr.drawArraysInstanced(e, t, r, n);
          },
          glDrawBuffers: function (e, t) {
            for (var r = dr[e], n = 0; n < e; n++) r[n] = O[(t + 4 * n) >> 2];
            Mr.drawBuffers(r);
          },
          glDrawElements: function (e, t, r, n) {
            Mr.drawElements(e, t, r, n);
          },
          glDrawElementsInstanced: function (e, t, r, n, a) {
            Mr.drawElementsInstanced(e, t, r, n, a);
          },
          glEnable: function (e) {
            Mr.enable(e);
          },
          glEnableVertexAttribArray: function (e) {
            Mr.enableVertexAttribArray(e);
          },
          glFramebufferRenderbuffer: function (e, t, r, n) {
            Mr.framebufferRenderbuffer(e, t, r, fr.renderbuffers[n]);
          },
          glFramebufferTexture2D: function (e, t, r, n, a) {
            Mr.framebufferTexture2D(e, t, r, fr.textures[n], a);
          },
          glFramebufferTextureLayer: function (e, t, r, n, a) {
            Mr.framebufferTextureLayer(e, t, fr.textures[r], n, a);
          },
          glGenBuffers: function (e, t) {
            mr(e, t, "createBuffer", fr.buffers);
          },
          glGenFramebuffers: function (e, t) {
            mr(e, t, "createFramebuffer", fr.framebuffers);
          },
          glGenRenderbuffers: function (e, t) {
            mr(e, t, "createRenderbuffer", fr.renderbuffers);
          },
          glGenSamplers: function (e, t) {
            mr(e, t, "createSampler", fr.samplers);
          },
          glGenTextures: function (e, t) {
            mr(e, t, "createTexture", fr.textures);
          },
          glGenVertexArrays: function (e, t) {
            mr(e, t, "createVertexArray", fr.vaos);
          },
          glGenerateMipmap: function (e) {
            Mr.generateMipmap(e);
          },
          glGetActiveUniform: function (e, t, r, n, a, i, o) {
            e = fr.programs[e];
            var u = Mr.getActiveUniform(e, t);
            if (u) {
              var s = r > 0 && o ? T(u.name, o, r) : 0;
              n && (O[n >> 2] = s),
                a && (O[a >> 2] = u.size),
                i && (O[i >> 2] = u.type);
            }
          },
          glGetActiveUniformBlockName: function (e, t, r, n, a) {
            e = fr.programs[e];
            var i = Mr.getActiveUniformBlockName(e, t);
            if (i)
              if (a && r > 0) {
                var o = T(i, a, r);
                n && (O[n >> 2] = o);
              } else n && (O[n >> 2] = 0);
          },
          glGetActiveUniformBlockiv: function (e, t, r, n) {
            if (n)
              switch (((e = fr.programs[e]), r)) {
                case 35393:
                  var a = Mr.getActiveUniformBlockName(e, t);
                  return void (O[n >> 2] = a.length + 1);
                default:
                  var i = Mr.getActiveUniformBlockParameter(e, t, r);
                  if (!i) return;
                  if ("number" == typeof i) O[n >> 2] = i;
                  else
                    for (var o = 0; o < i.length; o++)
                      O[(n + 4 * o) >> 2] = i[o];
              }
            else fr.recordError(1281);
          },
          glGetActiveUniformsiv: function (e, t, r, n, a) {
            if (a)
              if (t > 0 && 0 == r) fr.recordError(1281);
              else {
                e = fr.programs[e];
                for (var i = [], o = 0; o < t; o++) i.push(O[(r + 4 * o) >> 2]);
                var u = Mr.getActiveUniforms(e, i, n);
                if (u) {
                  var s = u.length;
                  for (o = 0; o < s; o++) O[(a + 4 * o) >> 2] = u[o];
                }
              }
            else fr.recordError(1281);
          },
          glGetAttribLocation: function (e, t) {
            return Mr.getAttribLocation(fr.programs[e], D(t));
          },
          glGetError: function () {
            var e = Mr.getError() || fr.lastError;
            return (fr.lastError = 0), e;
          },
          glGetIntegerv: function (e, t) {
            pr(e, t, 0);
          },
          glGetInternalformativ: function (e, t, r, n, a) {
            if (n < 0) fr.recordError(1281);
            else if (a) {
              var i = Mr.getInternalformatParameter(e, t, r);
              if (null !== i)
                for (var o = 0; o < i.length && o < n; ++o)
                  O[(a + o) >> 2] = i[o];
            } else fr.recordError(1281);
          },
          glGetProgramInfoLog: function (e, t, r, n) {
            var a = Mr.getProgramInfoLog(fr.programs[e]);
            null === a && (a = "(unknown error)");
            var i = t > 0 && n ? T(a, n, t) : 0;
            r && (O[r >> 2] = i);
          },
          glGetProgramiv: function (e, t, r) {
            if (r)
              if (e >= fr.counter) fr.recordError(1281);
              else {
                var n = fr.programInfos[e];
                if (n)
                  if (35716 == t) {
                    var a = Mr.getProgramInfoLog(fr.programs[e]);
                    null === a && (a = "(unknown error)"),
                      (O[r >> 2] = a.length + 1);
                  } else if (35719 == t) O[r >> 2] = n.maxUniformLength;
                  else if (35722 == t) {
                    if (-1 == n.maxAttributeLength) {
                      e = fr.programs[e];
                      var i = Mr.getProgramParameter(e, 35721);
                      n.maxAttributeLength = 0;
                      for (var o = 0; o < i; ++o) {
                        var u = Mr.getActiveAttrib(e, o);
                        n.maxAttributeLength = Math.max(
                          n.maxAttributeLength,
                          u.name.length + 1
                        );
                      }
                    }
                    O[r >> 2] = n.maxAttributeLength;
                  } else if (35381 == t) {
                    if (-1 == n.maxUniformBlockNameLength) {
                      e = fr.programs[e];
                      var s = Mr.getProgramParameter(e, 35382);
                      for (n.maxUniformBlockNameLength = 0, o = 0; o < s; ++o) {
                        var c = Mr.getActiveUniformBlockName(e, o);
                        n.maxUniformBlockNameLength = Math.max(
                          n.maxUniformBlockNameLength,
                          c.length + 1
                        );
                      }
                    }
                    O[r >> 2] = n.maxUniformBlockNameLength;
                  } else O[r >> 2] = Mr.getProgramParameter(fr.programs[e], t);
                else fr.recordError(1282);
              }
            else fr.recordError(1281);
          },
          glGetShaderInfoLog: function (e, t, r, n) {
            var a = Mr.getShaderInfoLog(fr.shaders[e]);
            null === a && (a = "(unknown error)");
            var i = t > 0 && n ? T(a, n, t) : 0;
            r && (O[r >> 2] = i);
          },
          glGetShaderiv: function (e, t, r) {
            if (r)
              if (35716 == t) {
                var n = Mr.getShaderInfoLog(fr.shaders[e]);
                null === n && (n = "(unknown error)"),
                  (O[r >> 2] = n.length + 1);
              } else if (35720 == t) {
                var a = Mr.getShaderSource(fr.shaders[e]),
                  i = null === a || 0 == a.length ? 0 : a.length + 1;
                O[r >> 2] = i;
              } else O[r >> 2] = Mr.getShaderParameter(fr.shaders[e], t);
            else fr.recordError(1281);
          },
          glGetUniformBlockIndex: function (e, t) {
            return Mr.getUniformBlockIndex(fr.programs[e], D(t));
          },
          glGetUniformLocation: function (e, t) {
            var r = 0;
            if ("]" == (t = D(t))[t.length - 1]) {
              var n = t.lastIndexOf("[");
              (r = "]" != t[n + 1] ? vr(t.slice(n + 1)) : 0),
                (t = t.slice(0, n));
            }
            var a = fr.programInfos[e] && fr.programInfos[e].uniforms[t];
            return a && r >= 0 && r < a[0] ? a[1] + r : -1;
          },
          glInvalidateFramebuffer: function (e, t, r) {
            for (var n = dr[t], a = 0; a < t; a++) n[a] = O[(r + 4 * a) >> 2];
            Mr.invalidateFramebuffer(e, n);
          },
          glIsEnabled: function (e) {
            return Mr.isEnabled(e);
          },
          glLinkProgram: function (e) {
            Mr.linkProgram(fr.programs[e]), fr.populateUniformTable(e);
          },
          glMapBufferRange: function () {
            f("missing function: glMapBufferRange"), ve(-1);
          },
          glPixelStorei: function (e, t) {
            3317 == e && (fr.unpackAlignment = t), Mr.pixelStorei(e, t);
          },
          glReadBuffer: function (e) {
            Mr.readBuffer(e);
          },
          glReadPixels: function (e, t, r, n, a, i, o) {
            if (fr.currentContext.version >= 2)
              if (Mr.currentPixelPackBufferBinding)
                Mr.readPixels(e, t, r, n, a, i, o);
              else {
                var u = hr(i);
                Mr.readPixels(e, t, r, n, a, i, u, o >> gr(u));
              }
            else {
              var s = yr(i, a, r, n, o);
              s ? Mr.readPixels(e, t, r, n, a, i, s) : fr.recordError(1280);
            }
          },
          glRenderbufferStorage: function (e, t, r, n) {
            Mr.renderbufferStorage(e, t, r, n);
          },
          glRenderbufferStorageMultisample: function (e, t, r, n, a) {
            Mr.renderbufferStorageMultisample(e, t, r, n, a);
          },
          glScissor: function (e, t, r, n) {
            Mr.scissor(e, t, r, n);
          },
          glShaderSource: function (e, t, r, n) {
            var a = fr.getSource(e, t, r, n);
            Mr.shaderSource(fr.shaders[e], a);
          },
          glTexImage2D: function (e, t, r, n, a, i, o, u, s) {
            if (fr.currentContext.version >= 2)
              if (Mr.currentPixelUnpackBufferBinding)
                Mr.texImage2D(e, t, r, n, a, i, o, u, s);
              else if (s) {
                var c = hr(u);
                Mr.texImage2D(e, t, r, n, a, i, o, u, c, s >> gr(c));
              } else Mr.texImage2D(e, t, r, n, a, i, o, u, null);
            else
              Mr.texImage2D(
                e,
                t,
                r,
                n,
                a,
                i,
                o,
                u,
                s ? yr(u, o, n, a, s) : null
              );
          },
          glTexParameteri: function (e, t, r) {
            Mr.texParameteri(e, t, r);
          },
          glTexStorage2D: function (e, t, r, n, a) {
            Mr.texStorage2D(e, t, r, n, a);
          },
          glTexStorage3D: function (e, t, r, n, a, i) {
            Mr.texStorage3D(e, t, r, n, a, i);
          },
          glTexSubImage2D: function (e, t, r, n, a, i, o, u, s) {
            if (fr.currentContext.version >= 2)
              if (Mr.currentPixelUnpackBufferBinding)
                Mr.texSubImage2D(e, t, r, n, a, i, o, u, s);
              else if (s) {
                var c = hr(u);
                Mr.texSubImage2D(e, t, r, n, a, i, o, u, c, s >> gr(c));
              } else Mr.texSubImage2D(e, t, r, n, a, i, o, u, null);
            else {
              var l = null;
              s && (l = yr(u, o, a, i, s)),
                Mr.texSubImage2D(e, t, r, n, a, i, o, u, l);
            }
          },
          glTexSubImage3D: function (e, t, r, n, a, i, o, u, s, c, l) {
            if (Mr.currentPixelUnpackBufferBinding)
              Mr.texSubImage3D(e, t, r, n, a, i, o, u, s, c, l);
            else if (l) {
              var f = hr(c);
              Mr.texSubImage3D(e, t, r, n, a, i, o, u, s, c, f, l >> gr(f));
            } else Mr.texSubImage3D(e, t, r, n, a, i, o, u, s, c, null);
          },
          glUniform1f: function (e, t) {
            Mr.uniform1f(fr.uniforms[e], t);
          },
          glUniform1i: function (e, t) {
            Mr.uniform1i(fr.uniforms[e], t);
          },
          glUniform1ui: function (e, t) {
            Mr.uniform1ui(fr.uniforms[e], t);
          },
          glUniform2f: function (e, t, r) {
            Mr.uniform2f(fr.uniforms[e], t, r);
          },
          glUniform2fv: function (e, t, r) {
            if (fr.currentContext.version >= 2)
              Mr.uniform2fv(fr.uniforms[e], U, r >> 2, 2 * t);
            else {
              if (2 * t <= fr.MINI_TEMP_BUFFER_SIZE)
                for (
                  var n = fr.miniTempBufferFloatViews[2 * t - 1], a = 0;
                  a < 2 * t;
                  a += 2
                )
                  (n[a] = U[(r + 4 * a) >> 2]),
                    (n[a + 1] = U[(r + (4 * a + 4)) >> 2]);
              else n = U.subarray(r >> 2, (r + 8 * t) >> 2);
              Mr.uniform2fv(fr.uniforms[e], n);
            }
          },
          glUniform3fv: function (e, t, r) {
            if (fr.currentContext.version >= 2)
              Mr.uniform3fv(fr.uniforms[e], U, r >> 2, 3 * t);
            else {
              if (3 * t <= fr.MINI_TEMP_BUFFER_SIZE)
                for (
                  var n = fr.miniTempBufferFloatViews[3 * t - 1], a = 0;
                  a < 3 * t;
                  a += 3
                )
                  (n[a] = U[(r + 4 * a) >> 2]),
                    (n[a + 1] = U[(r + (4 * a + 4)) >> 2]),
                    (n[a + 2] = U[(r + (4 * a + 8)) >> 2]);
              else n = U.subarray(r >> 2, (r + 12 * t) >> 2);
              Mr.uniform3fv(fr.uniforms[e], n);
            }
          },
          glUniform4f: function (e, t, r, n, a) {
            Mr.uniform4f(fr.uniforms[e], t, r, n, a);
          },
          glUniform4fv: function (e, t, r) {
            if (fr.currentContext.version >= 2)
              Mr.uniform4fv(fr.uniforms[e], U, r >> 2, 4 * t);
            else {
              if (4 * t <= fr.MINI_TEMP_BUFFER_SIZE) {
                var n = fr.miniTempBufferFloatViews[4 * t - 1],
                  a = U;
                r >>= 2;
                for (var i = 0; i < 4 * t; i += 4) {
                  var o = r + i;
                  (n[i] = a[o]),
                    (n[i + 1] = a[o + 1]),
                    (n[i + 2] = a[o + 2]),
                    (n[i + 3] = a[o + 3]);
                }
              } else n = U.subarray(r >> 2, (r + 16 * t) >> 2);
              Mr.uniform4fv(fr.uniforms[e], n);
            }
          },
          glUniformBlockBinding: function (e, t, r) {
            (e = fr.programs[e]), Mr.uniformBlockBinding(e, t, r);
          },
          glUniformMatrix2fv: function (e, t, r, n) {
            if (fr.currentContext.version >= 2)
              Mr.uniformMatrix2fv(fr.uniforms[e], !!r, U, n >> 2, 4 * t);
            else {
              if (4 * t <= fr.MINI_TEMP_BUFFER_SIZE)
                for (
                  var a = fr.miniTempBufferFloatViews[4 * t - 1], i = 0;
                  i < 4 * t;
                  i += 4
                )
                  (a[i] = U[(n + 4 * i) >> 2]),
                    (a[i + 1] = U[(n + (4 * i + 4)) >> 2]),
                    (a[i + 2] = U[(n + (4 * i + 8)) >> 2]),
                    (a[i + 3] = U[(n + (4 * i + 12)) >> 2]);
              else a = U.subarray(n >> 2, (n + 16 * t) >> 2);
              Mr.uniformMatrix2fv(fr.uniforms[e], !!r, a);
            }
          },
          glUniformMatrix3fv: function (e, t, r, n) {
            if (fr.currentContext.version >= 2)
              Mr.uniformMatrix3fv(fr.uniforms[e], !!r, U, n >> 2, 9 * t);
            else {
              if (9 * t <= fr.MINI_TEMP_BUFFER_SIZE)
                for (
                  var a = fr.miniTempBufferFloatViews[9 * t - 1], i = 0;
                  i < 9 * t;
                  i += 9
                )
                  (a[i] = U[(n + 4 * i) >> 2]),
                    (a[i + 1] = U[(n + (4 * i + 4)) >> 2]),
                    (a[i + 2] = U[(n + (4 * i + 8)) >> 2]),
                    (a[i + 3] = U[(n + (4 * i + 12)) >> 2]),
                    (a[i + 4] = U[(n + (4 * i + 16)) >> 2]),
                    (a[i + 5] = U[(n + (4 * i + 20)) >> 2]),
                    (a[i + 6] = U[(n + (4 * i + 24)) >> 2]),
                    (a[i + 7] = U[(n + (4 * i + 28)) >> 2]),
                    (a[i + 8] = U[(n + (4 * i + 32)) >> 2]);
              else a = U.subarray(n >> 2, (n + 36 * t) >> 2);
              Mr.uniformMatrix3fv(fr.uniforms[e], !!r, a);
            }
          },
          glUniformMatrix4fv: function (e, t, r, n) {
            if (fr.currentContext.version >= 2)
              Mr.uniformMatrix4fv(fr.uniforms[e], !!r, U, n >> 2, 16 * t);
            else {
              if (16 * t <= fr.MINI_TEMP_BUFFER_SIZE) {
                var a = fr.miniTempBufferFloatViews[16 * t - 1],
                  i = U;
                n >>= 2;
                for (var o = 0; o < 16 * t; o += 16) {
                  var u = n + o;
                  (a[o] = i[u]),
                    (a[o + 1] = i[u + 1]),
                    (a[o + 2] = i[u + 2]),
                    (a[o + 3] = i[u + 3]),
                    (a[o + 4] = i[u + 4]),
                    (a[o + 5] = i[u + 5]),
                    (a[o + 6] = i[u + 6]),
                    (a[o + 7] = i[u + 7]),
                    (a[o + 8] = i[u + 8]),
                    (a[o + 9] = i[u + 9]),
                    (a[o + 10] = i[u + 10]),
                    (a[o + 11] = i[u + 11]),
                    (a[o + 12] = i[u + 12]),
                    (a[o + 13] = i[u + 13]),
                    (a[o + 14] = i[u + 14]),
                    (a[o + 15] = i[u + 15]);
                }
              } else a = U.subarray(n >> 2, (n + 64 * t) >> 2);
              Mr.uniformMatrix4fv(fr.uniforms[e], !!r, a);
            }
          },
          glUnmapBuffer: function () {
            f("missing function: glUnmapBuffer"), ve(-1);
          },
          glUseProgram: function (e) {
            Mr.useProgram(fr.programs[e]);
          },
          glVertexAttribIPointer: function (e, t, r, n, a) {
            Mr.vertexAttribIPointer(e, t, r, n, a);
          },
          glVertexAttribPointer: function (e, t, r, n, a, i) {
            Mr.vertexAttribPointer(e, t, r, !!n, a, i);
          },
          glViewport: function (e, t, r, n) {
            Mr.viewport(e, t, r, n);
          },
          glfwCreateWindow: function (e, t, r, n, a) {
            return wr.createWindow(e, t, r, n, a);
          },
          glfwDestroyWindow: function (e) {
            return wr.destroyWindow(e);
          },
          glfwInit: function () {
            return (
              wr.windows ||
                ((wr.initialTime = wr.getTime()),
                (wr.hints = wr.defaultHints),
                (wr.windows = new Array()),
                (wr.active = null),
                window.addEventListener(
                  "gamepadconnected",
                  wr.onGamepadConnected,
                  !0
                ),
                window.addEventListener(
                  "gamepaddisconnected",
                  wr.onGamepadDisconnected,
                  !0
                ),
                window.addEventListener("keydown", wr.onKeydown, !0),
                window.addEventListener("keypress", wr.onKeyPress, !0),
                window.addEventListener("keyup", wr.onKeyup, !0),
                window.addEventListener("blur", wr.onBlur, !0),
                e.canvas.addEventListener("touchmove", wr.onMousemove, !0),
                e.canvas.addEventListener(
                  "touchstart",
                  wr.onMouseButtonDown,
                  !0
                ),
                e.canvas.addEventListener(
                  "touchcancel",
                  wr.onMouseButtonUp,
                  !0
                ),
                e.canvas.addEventListener("touchend", wr.onMouseButtonUp, !0),
                e.canvas.addEventListener("mousemove", wr.onMousemove, !0),
                e.canvas.addEventListener(
                  "mousedown",
                  wr.onMouseButtonDown,
                  !0
                ),
                e.canvas.addEventListener("mouseup", wr.onMouseButtonUp, !0),
                e.canvas.addEventListener("wheel", wr.onMouseWheel, !0),
                e.canvas.addEventListener("mousewheel", wr.onMouseWheel, !0),
                e.canvas.addEventListener("mouseenter", wr.onMouseenter, !0),
                e.canvas.addEventListener("mouseleave", wr.onMouseleave, !0),
                e.canvas.addEventListener("drop", wr.onDrop, !0),
                e.canvas.addEventListener("dragover", wr.onDragover, !0),
                ar.resizeListeners.push(function (e, t) {
                  wr.onCanvasResize(e, t);
                })),
              1
            );
          },
          glfwMakeContextCurrent: function (e) {},
          glfwTerminate: function () {
            window.removeEventListener(
              "gamepadconnected",
              wr.onGamepadConnected,
              !0
            ),
              window.removeEventListener(
                "gamepaddisconnected",
                wr.onGamepadDisconnected,
                !0
              ),
              window.removeEventListener("keydown", wr.onKeydown, !0),
              window.removeEventListener("keypress", wr.onKeyPress, !0),
              window.removeEventListener("keyup", wr.onKeyup, !0),
              window.removeEventListener("blur", wr.onBlur, !0),
              e.canvas.removeEventListener("touchmove", wr.onMousemove, !0),
              e.canvas.removeEventListener(
                "touchstart",
                wr.onMouseButtonDown,
                !0
              ),
              e.canvas.removeEventListener(
                "touchcancel",
                wr.onMouseButtonUp,
                !0
              ),
              e.canvas.removeEventListener("touchend", wr.onMouseButtonUp, !0),
              e.canvas.removeEventListener("mousemove", wr.onMousemove, !0),
              e.canvas.removeEventListener(
                "mousedown",
                wr.onMouseButtonDown,
                !0
              ),
              e.canvas.removeEventListener("mouseup", wr.onMouseButtonUp, !0),
              e.canvas.removeEventListener("wheel", wr.onMouseWheel, !0),
              e.canvas.removeEventListener("mousewheel", wr.onMouseWheel, !0),
              e.canvas.removeEventListener("mouseenter", wr.onMouseenter, !0),
              e.canvas.removeEventListener("mouseleave", wr.onMouseleave, !0),
              e.canvas.removeEventListener("drop", wr.onDrop, !0),
              e.canvas.removeEventListener("dragover", wr.onDragover, !0),
              (e.canvas.width = e.canvas.height = 1),
              (wr.windows = null),
              (wr.active = null);
          },
          glfwWindowHint: function (e, t) {
            wr.hints[e] = t;
          },
          gmtime: function (e) {
            return Cr(e, 9175392);
          },
          gmtime_r: Cr,
          invoke_iii: function (e, t, r) {
            var n = an();
            try {
              return nn(e, t, r);
            } catch (e) {
              if ((un(n), e !== e + 0 && "longjmp" !== e)) throw e;
              Hr(1, 0);
            }
          },
          invoke_vi: function (e, t) {
            var r = an();
            try {
              Jr(e, t);
            } catch (e) {
              if ((un(r), e !== e + 0 && "longjmp" !== e)) throw e;
              Hr(1, 0);
            }
          },
          invoke_vii: function (e, t, r) {
            var n = an();
            try {
              en(e, t, r);
            } catch (e) {
              if ((un(n), e !== e + 0 && "longjmp" !== e)) throw e;
              Hr(1, 0);
            }
          },
          invoke_viiii: function (e, t, r, n, a) {
            var i = an();
            try {
              tn(e, t, r, n, a);
            } catch (e) {
              if ((un(i), e !== e + 0 && "longjmp" !== e)) throw e;
              Hr(1, 0);
            }
          },
          invoke_viiiii: function (e, t, r, n, a, i) {
            var o = an();
            try {
              rn(e, t, r, n, a, i);
            } catch (e) {
              if ((un(o), e !== e + 0 && "longjmp" !== e)) throw e;
              Hr(1, 0);
            }
          },
          localtime_r: function (e, t) {
            Er();
            var r = new Date(1e3 * O[e >> 2]);
            (O[t >> 2] = r.getSeconds()),
              (O[(t + 4) >> 2] = r.getMinutes()),
              (O[(t + 8) >> 2] = r.getHours()),
              (O[(t + 12) >> 2] = r.getDate()),
              (O[(t + 16) >> 2] = r.getMonth()),
              (O[(t + 20) >> 2] = r.getFullYear() - 1900),
              (O[(t + 24) >> 2] = r.getDay());
            var n = new Date(r.getFullYear(), 0, 1),
              a = ((r.getTime() - n.getTime()) / 864e5) | 0;
            (O[(t + 28) >> 2] = a),
              (O[(t + 36) >> 2] = -60 * r.getTimezoneOffset());
            var i = new Date(r.getFullYear(), 6, 1).getTimezoneOffset(),
              o = n.getTimezoneOffset(),
              u = 0 | (i != o && r.getTimezoneOffset() == Math.min(o, i));
            O[(t + 32) >> 2] = u;
            var s = O[(Yr() + (u ? 4 : 0)) >> 2];
            return (O[(t + 40) >> 2] = s), t;
          },
          memory: y,
          mktime: function (e) {
            Er();
            var t = new Date(
                O[(e + 20) >> 2] + 1900,
                O[(e + 16) >> 2],
                O[(e + 12) >> 2],
                O[(e + 8) >> 2],
                O[(e + 4) >> 2],
                O[e >> 2],
                0
              ),
              r = O[(e + 32) >> 2],
              n = t.getTimezoneOffset(),
              a = new Date(t.getFullYear(), 0, 1),
              i = new Date(t.getFullYear(), 6, 1).getTimezoneOffset(),
              o = a.getTimezoneOffset(),
              u = Math.min(o, i);
            if (r < 0) O[(e + 32) >> 2] = Number(i != o && u == n);
            else if (r > 0 != (u == n)) {
              var s = Math.max(o, i),
                c = r > 0 ? u : s;
              t.setTime(t.getTime() + 6e4 * (c - n));
            }
            O[(e + 24) >> 2] = t.getDay();
            var l = ((t.getTime() - a.getTime()) / 864e5) | 0;
            return (O[(e + 28) >> 2] = l), (t.getTime() / 1e3) | 0;
          },
          nanosleep: function (e, t) {
            if (0 === e) return Se(28), -1;
            var r = O[e >> 2],
              n = O[(e + 4) >> 2];
            return n < 0 || n > 999999999 || r < 0
              ? (Se(28), -1)
              : (0 !== t && ((O[t >> 2] = 0), (O[(t + 4) >> 2] = 0)),
                (function (e) {
                  for (var t = tr(); tr() - t < e / 1e3; );
                })(1e6 * r + n / 1e3));
          },
          pthread_condattr_destroy: function () {
            return 0;
          },
          pthread_condattr_init: function () {
            return 0;
          },
          pthread_condattr_setclock: function () {
            return 0;
          },
          pthread_create: function () {
            return 6;
          },
          pthread_join: function () {},
          pthread_mutexattr_destroy: function () {},
          pthread_mutexattr_init: function () {},
          pthread_mutexattr_settype: function () {},
          pthread_rwlock_destroy: function () {
            return 0;
          },
          pthread_rwlock_init: function () {
            return 0;
          },
          pthread_rwlock_rdlock: function () {
            return 0;
          },
          pthread_rwlock_unlock: function () {
            return 0;
          },
          pthread_rwlock_wrlock: function () {
            return 0;
          },
          pthread_setcancelstate: function () {
            return 0;
          },
          round: function (e) {
            return (e = +e) >= 0 ? +se(e + 0.5) : +ue(e - 0.5);
          },
          roundf: function (e) {
            return (e = +e) >= 0 ? +se(e + 0.5) : +ue(e - 0.5);
          },
          saveSetjmp: function e(t, r, n, a) {
            (r |= 0), (n |= 0), (a |= 0);
            var i = 0;
            for (
              ur = (ur + 1) | 0, O[(t |= 0) >> 2] = ur;
              (0 | i) < (0 | a);

            ) {
              if (0 == (0 | O[(n + (i << 3)) >> 2]))
                return (
                  (O[(n + (i << 3)) >> 2] = ur),
                  (O[(n + (4 + (i << 3))) >> 2] = r),
                  (O[(n + (8 + (i << 3))) >> 2] = 0),
                  w(0 | a),
                  0 | n
                );
              i = (i + 1) | 0;
            }
            return (
              (n =
                0 |
                e(
                  0 | t,
                  0 | r,
                  0 |
                    (n =
                      0 | qr(0 | n, (8 * ((1 + (a = (2 * a) | 0)) | 0)) | 0)),
                  0 | a
                )),
              w(0 | a),
              0 | n
            );
          },
          setTempRet0: function (e) {
            w(0 | e);
          },
          strftime: Pr,
          strftime_l: function (e, t, r, n) {
            return Pr(e, t, r, n);
          },
          strptime: function (e, t, r) {
            for (
              var n = D(t),
                a = "\\!@#$^&*()+=-[]/{}|:<>?,.",
                i = 0,
                o = a.length;
              i < o;
              ++i
            )
              n = n.replace(new RegExp("\\" + a[i], "g"), "\\" + a[i]);
            var u = {
              "%A": "%a",
              "%B": "%b",
              "%c": "%a %b %d %H:%M:%S %Y",
              "%D": "%m\\/%d\\/%y",
              "%e": "%d",
              "%F": "%Y-%m-%d",
              "%h": "%b",
              "%R": "%H\\:%M",
              "%r": "%I\\:%M\\:%S\\s%p",
              "%T": "%H\\:%M\\:%S",
              "%x": "%m\\/%d\\/(?:%y|%Y)",
              "%X": "%H\\:%M\\:%S"
            };
            for (var s in u) n = n.replace(s, u[s]);
            var c = {
              "%a": "(?:Sun(?:day)?)|(?:Mon(?:day)?)|(?:Tue(?:sday)?)|(?:Wed(?:nesday)?)|(?:Thu(?:rsday)?)|(?:Fri(?:day)?)|(?:Sat(?:urday)?)",
              "%b": "(?:Jan(?:uary)?)|(?:Feb(?:ruary)?)|(?:Mar(?:ch)?)|(?:Apr(?:il)?)|May|(?:Jun(?:e)?)|(?:Jul(?:y)?)|(?:Aug(?:ust)?)|(?:Sep(?:tember)?)|(?:Oct(?:ober)?)|(?:Nov(?:ember)?)|(?:Dec(?:ember)?)",
              "%C": "\\d\\d",
              "%d": "0[1-9]|[1-9](?!\\d)|1\\d|2\\d|30|31",
              "%H": "\\d(?!\\d)|[0,1]\\d|20|21|22|23",
              "%I": "\\d(?!\\d)|0\\d|10|11|12",
              "%j": "00[1-9]|0?[1-9](?!\\d)|0?[1-9]\\d(?!\\d)|[1,2]\\d\\d|3[0-6]\\d",
              "%m": "0[1-9]|[1-9](?!\\d)|10|11|12",
              "%M": "0\\d|\\d(?!\\d)|[1-5]\\d",
              "%n": "\\s",
              "%p": "AM|am|PM|pm|A\\.M\\.|a\\.m\\.|P\\.M\\.|p\\.m\\.",
              "%S": "0\\d|\\d(?!\\d)|[1-5]\\d|60",
              "%U": "0\\d|\\d(?!\\d)|[1-4]\\d|50|51|52|53",
              "%W": "0\\d|\\d(?!\\d)|[1-4]\\d|50|51|52|53",
              "%w": "[0-6]",
              "%y": "\\d\\d",
              "%Y": "\\d\\d\\d\\d",
              "%%": "%",
              "%t": "\\s"
            };
            for (var l in c) n = n.replace(l, "(" + l + c[l] + ")");
            var f = [];
            for (i = n.indexOf("%"); i >= 0; i = n.indexOf("%"))
              f.push(n[i + 1]),
                (n = n.replace(new RegExp("\\%" + n[i + 1], "g"), ""));
            var d = new RegExp("^" + n, "i").exec(D(e));
            if (d) {
              var m,
                p = (function () {
                  function e(e, t, r) {
                    return "number" != typeof e || isNaN(e)
                      ? t
                      : e >= t
                      ? e <= r
                        ? e
                        : r
                      : t;
                  }
                  return {
                    year: e(O[(r + 20) >> 2] + 1900, 1970, 9999),
                    month: e(O[(r + 16) >> 2], 0, 11),
                    day: e(O[(r + 12) >> 2], 1, 31),
                    hour: e(O[(r + 8) >> 2], 0, 23),
                    min: e(O[(r + 4) >> 2], 0, 59),
                    sec: e(O[r >> 2], 0, 59)
                  };
                })(),
                v = function (e) {
                  var t = f.indexOf(e);
                  if (t >= 0) return d[t + 1];
                };
              if (
                ((m = v("S")) && (p.sec = vr(m)),
                (m = v("M")) && (p.min = vr(m)),
                (m = v("H")))
              )
                p.hour = vr(m);
              else if ((m = v("I"))) {
                var h = vr(m);
                (m = v("p")) && (h += "P" === m.toUpperCase()[0] ? 12 : 0),
                  (p.hour = h);
              }
              if ((m = v("Y"))) p.year = vr(m);
              else if ((m = v("y"))) {
                var g = vr(m);
                (m = v("C")) ? (g += 100 * vr(m)) : (g += g < 69 ? 2e3 : 1900),
                  (p.year = g);
              }
              if (
                ((m = v("m"))
                  ? (p.month = vr(m) - 1)
                  : (m = v("b")) &&
                    (p.month =
                      {
                        JAN: 0,
                        FEB: 1,
                        MAR: 2,
                        APR: 3,
                        MAY: 4,
                        JUN: 5,
                        JUL: 6,
                        AUG: 7,
                        SEP: 8,
                        OCT: 9,
                        NOV: 10,
                        DEC: 11
                      }[m.substring(0, 3).toUpperCase()] || 0),
                (m = v("d")))
              )
                p.day = vr(m);
              else if ((m = v("j")))
                for (var y = vr(m), _ = kr(p.year), w = 0; w < 12; ++w) {
                  var b = xr(_ ? Fr : Sr, w - 1);
                  y <= b + (_ ? Fr : Sr)[w] && (p.day = y - b);
                }
              else if ((m = v("a"))) {
                var C = m.substring(0, 3).toUpperCase();
                if ((m = v("U"))) {
                  var E = {
                      SUN: 0,
                      MON: 1,
                      TUE: 2,
                      WED: 3,
                      THU: 4,
                      FRI: 5,
                      SAT: 6
                    }[C],
                    k = vr(m);
                  (F =
                    0 === (x = new Date(p.year, 0, 1)).getDay()
                      ? Dr(x, E + 7 * (k - 1))
                      : Dr(x, 7 - x.getDay() + E + 7 * (k - 1))),
                    (p.day = F.getDate()),
                    (p.month = F.getMonth());
                } else if ((m = v("W"))) {
                  var x, F;
                  (E = {
                    MON: 0,
                    TUE: 1,
                    WED: 2,
                    THU: 3,
                    FRI: 4,
                    SAT: 5,
                    SUN: 6
                  }[C]),
                    (k = vr(m)),
                    (F =
                      1 === (x = new Date(p.year, 0, 1)).getDay()
                        ? Dr(x, E + 7 * (k - 1))
                        : Dr(x, 7 - x.getDay() + 1 + E + 7 * (k - 1))),
                    (p.day = F.getDate()),
                    (p.month = F.getMonth());
                }
              }
              var S = new Date(p.year, p.month, p.day, p.hour, p.min, p.sec, 0);
              return (
                (O[r >> 2] = S.getSeconds()),
                (O[(r + 4) >> 2] = S.getMinutes()),
                (O[(r + 8) >> 2] = S.getHours()),
                (O[(r + 12) >> 2] = S.getDate()),
                (O[(r + 16) >> 2] = S.getMonth()),
                (O[(r + 20) >> 2] = S.getFullYear() - 1900),
                (O[(r + 24) >> 2] = S.getDay()),
                (O[(r + 28) >> 2] =
                  xr(kr(S.getFullYear()) ? Fr : Sr, S.getMonth() - 1) +
                  S.getDate() -
                  1),
                (O[(r + 32) >> 2] = 0),
                e + Rr(d[0]).length - 1
              );
            }
            return 0;
          },
          sysconf: function (e) {
            switch (e) {
              case 30:
                return 16384;
              case 85:
                return 131072;
              case 132:
              case 133:
              case 12:
              case 137:
              case 138:
              case 15:
              case 235:
              case 16:
              case 17:
              case 18:
              case 19:
              case 20:
              case 149:
              case 13:
              case 10:
              case 236:
              case 153:
              case 9:
              case 21:
              case 22:
              case 159:
              case 154:
              case 14:
              case 77:
              case 78:
              case 139:
              case 80:
              case 81:
              case 82:
              case 68:
              case 67:
              case 164:
              case 11:
              case 29:
              case 47:
              case 48:
              case 95:
              case 52:
              case 51:
              case 46:
              case 79:
                return 200809;
              case 27:
              case 246:
              case 127:
              case 128:
              case 23:
              case 24:
              case 160:
              case 161:
              case 181:
              case 182:
              case 242:
              case 183:
              case 184:
              case 243:
              case 244:
              case 245:
              case 165:
              case 178:
              case 179:
              case 49:
              case 50:
              case 168:
              case 169:
              case 175:
              case 170:
              case 171:
              case 172:
              case 97:
              case 76:
              case 32:
              case 173:
              case 35:
                return -1;
              case 176:
              case 177:
              case 7:
              case 155:
              case 8:
              case 157:
              case 125:
              case 126:
              case 92:
              case 93:
              case 129:
              case 130:
              case 131:
              case 94:
              case 91:
                return 1;
              case 74:
              case 60:
              case 69:
              case 70:
              case 4:
                return 1024;
              case 31:
              case 42:
              case 72:
                return 32;
              case 87:
              case 26:
              case 33:
                return 2147483647;
              case 34:
              case 1:
                return 47839;
              case 38:
              case 36:
                return 99;
              case 43:
              case 37:
                return 2048;
              case 0:
                return 2097152;
              case 3:
                return 65536;
              case 28:
                return 32768;
              case 44:
                return 32767;
              case 75:
                return 16384;
              case 39:
                return 1e3;
              case 89:
                return 700;
              case 71:
                return 256;
              case 40:
                return 255;
              case 2:
                return 100;
              case 180:
                return 64;
              case 25:
                return 20;
              case 5:
                return 16;
              case 6:
                return 6;
              case 73:
                return 4;
              case 84:
                return (
                  ("object" == typeof navigator &&
                    navigator.hardwareConcurrency) ||
                  1
                );
            }
            return Se(28), -1;
          },
          table: C,
          testSetjmp: function (e, t, r) {
            (e |= 0), (t |= 0), (r |= 0);
            for (
              var n = 0, a = 0;
              (0 | n) < (0 | r) && 0 != (0 | (a = 0 | O[(t + (n << 3)) >> 2]));

            ) {
              if ((0 | a) == (0 | e)) return 0 | O[(t + (4 + (n << 3))) >> 2];
              n = (n + 1) | 0;
            }
            return 0;
          },
          time: function (e) {
            var t = (Date.now() / 1e3) | 0;
            return e && (O[e >> 2] = t), t;
          },
          timegm: function (e) {
            Er();
            var t = Date.UTC(
                O[(e + 20) >> 2] + 1900,
                O[(e + 16) >> 2],
                O[(e + 12) >> 2],
                O[(e + 8) >> 2],
                O[(e + 4) >> 2],
                O[e >> 2],
                0
              ),
              r = new Date(t);
            O[(e + 24) >> 2] = r.getUTCDay();
            var n = Date.UTC(r.getUTCFullYear(), 0, 1, 0, 0, 0, 0),
              a = ((r.getTime() - n) / 864e5) | 0;
            return (O[(e + 28) >> 2] = a), (r.getTime() / 1e3) | 0;
          }
        },
        Nr = (function () {
          var t = { env: Or, wasi_snapshot_preview1: Or };
          function r(t, r) {
            var n = t.exports;
            (e.asm = n), pe();
          }
          function n(e) {
            r(e.instance);
          }
          function a(e) {
            return (
              v || "function" != typeof fetch
                ? new Promise(function (e, t) {
                    e(be());
                  })
                : fetch(we, { credentials: "same-origin" })
                    .then(function (e) {
                      if (!e.ok)
                        throw "failed to load wasm binary file at '" + we + "'";
                      return e.arrayBuffer();
                    })
                    .catch(function () {
                      return be();
                    })
            )
              .then(function (e) {
                return WebAssembly.instantiate(e, t);
              })
              .then(e, function (e) {
                f("failed to asynchronously prepare wasm: " + e), ve(e);
              });
          }
          if ((me(), e.instantiateWasm))
            try {
              return e.instantiateWasm(t, r);
            } catch (e) {
              return (
                f("Module.instantiateWasm callback failed with error: " + e), !1
              );
            }
          return (
            (function () {
              if (
                v ||
                "function" != typeof WebAssembly.instantiateStreaming ||
                he(we) ||
                "function" != typeof fetch
              )
                return a(n);
              fetch(we, { credentials: "same-origin" }).then(function (e) {
                return WebAssembly.instantiateStreaming(e, t).then(
                  n,
                  function (e) {
                    f("wasm streaming compile failed: " + e),
                      f("falling back to ArrayBuffer instantiation"),
                      a(n);
                  }
                );
              });
            })(),
            {}
          );
        })();
      e.asm = Nr;
      var Ur,
        jr = (e.___wasm_call_ctors = function () {
          return (jr = e.___wasm_call_ctors = e.asm.__wasm_call_ctors).apply(
            null,
            arguments
          );
        }),
        zr = (e._memset = function () {
          return (zr = e._memset = e.asm.memset).apply(null, arguments);
        }),
        Wr = (e.___errno_location = function () {
          return (Wr = e.___errno_location = e.asm.__errno_location).apply(
            null,
            arguments
          );
        }),
        Gr = (e._free = function () {
          return (Gr = e._free = e.asm.free).apply(null, arguments);
        }),
        $r = (e._malloc = function () {
          return ($r = e._malloc = e.asm.malloc).apply(null, arguments);
        }),
        qr = (e._realloc = function () {
          return (qr = e._realloc = e.asm.realloc).apply(null, arguments);
        }),
        Vr = (e.__ZSt18uncaught_exceptionv = function () {
          return (Vr = e.__ZSt18uncaught_exceptionv =
            e.asm._ZSt18uncaught_exceptionv).apply(null, arguments);
        }),
        Yr =
          ((e._htonl = function () {
            return (e._htonl = e.asm.htonl).apply(null, arguments);
          }),
          (e._htons = function () {
            return (e._htons = e.asm.htons).apply(null, arguments);
          }),
          (e._ntohs = function () {
            return (e._ntohs = e.asm.ntohs).apply(null, arguments);
          }),
          (e.__get_tzname = function () {
            return (Yr = e.__get_tzname = e.asm._get_tzname).apply(
              null,
              arguments
            );
          })),
        Xr = (e.__get_daylight = function () {
          return (Xr = e.__get_daylight = e.asm._get_daylight).apply(
            null,
            arguments
          );
        }),
        Qr = (e.__get_timezone = function () {
          return (Qr = e.__get_timezone = e.asm._get_timezone).apply(
            null,
            arguments
          );
        }),
        Hr = (e._setThrew = function () {
          return (Hr = e._setThrew = e.asm.setThrew).apply(null, arguments);
        }),
        Kr = (e.___getTypeName = function () {
          return (Kr = e.___getTypeName = e.asm.__getTypeName).apply(
            null,
            arguments
          );
        }),
        Zr =
          ((e.___embind_register_native_and_builtin_types = function () {
            return (e.___embind_register_native_and_builtin_types =
              e.asm.__embind_register_native_and_builtin_types).apply(
              null,
              arguments
            );
          }),
          (e._memalign = function () {
            return (Zr = e._memalign = e.asm.memalign).apply(null, arguments);
          })),
        Jr =
          ((e._emscripten_main_thread_process_queued_calls = function () {
            return (e._emscripten_main_thread_process_queued_calls =
              e.asm.emscripten_main_thread_process_queued_calls).apply(
              null,
              arguments
            );
          }),
          (e.dynCall_vi = function () {
            return (Jr = e.dynCall_vi = e.asm.dynCall_vi).apply(
              null,
              arguments
            );
          })),
        en = (e.dynCall_vii = function () {
          return (en = e.dynCall_vii = e.asm.dynCall_vii).apply(
            null,
            arguments
          );
        }),
        tn = (e.dynCall_viiii = function () {
          return (tn = e.dynCall_viiii = e.asm.dynCall_viiii).apply(
            null,
            arguments
          );
        }),
        rn = (e.dynCall_viiiii = function () {
          return (rn = e.dynCall_viiiii = e.asm.dynCall_viiiii).apply(
            null,
            arguments
          );
        }),
        nn = (e.dynCall_iii = function () {
          return (nn = e.dynCall_iii = e.asm.dynCall_iii).apply(
            null,
            arguments
          );
        }),
        an = (e.stackSave = function () {
          return (an = e.stackSave = e.asm.stackSave).apply(null, arguments);
        }),
        on = (e.stackAlloc = function () {
          return (on = e.stackAlloc = e.asm.stackAlloc).apply(null, arguments);
        }),
        un = (e.stackRestore = function () {
          return (un = e.stackRestore = e.asm.stackRestore).apply(
            null,
            arguments
          );
        }),
        sn =
          ((e.__growWasmMemory = function () {
            return (e.__growWasmMemory = e.asm.__growWasmMemory).apply(
              null,
              arguments
            );
          }),
          (e.dynCall_viff = function () {
            return (e.dynCall_viff = e.asm.dynCall_viff).apply(null, arguments);
          }),
          (e.dynCall_ii = function () {
            return (e.dynCall_ii = e.asm.dynCall_ii).apply(null, arguments);
          }),
          (e.dynCall_viii = function () {
            return (sn = e.dynCall_viii = e.asm.dynCall_viii).apply(
              null,
              arguments
            );
          }));
      function cn(e) {
        (this.name = "ExitStatus"),
          (this.message = "Program terminated with exit(" + e + ")"),
          (this.status = e);
      }
      function ln(t) {
        function r() {
          Ur ||
            ((Ur = !0),
            (e.calledRun = !0),
            E ||
              ((ie = !0),
              e.noFSInit || Ae.init.initialized || Ae.init(),
              Te.init(),
              J(te),
              (Ae.ignorePermissions = !1),
              J(re),
              e.onRuntimeInitialized && e.onRuntimeInitialized(),
              (function () {
                if (e.postRun)
                  for (
                    "function" == typeof e.postRun && (e.postRun = [e.postRun]);
                    e.postRun.length;

                  )
                    (t = e.postRun.shift()), ae.unshift(t);
                var t;
                J(ae);
              })()));
        }
        (t = t || o),
          le > 0 ||
            ((function () {
              if (e.preRun)
                for (
                  "function" == typeof e.preRun && (e.preRun = [e.preRun]);
                  e.preRun.length;

                )
                  (t = e.preRun.shift()), ee.unshift(t);
              var t;
              J(ee);
            })(),
            le > 0 ||
              (e.setStatus
                ? (e.setStatus("Running..."),
                  setTimeout(function () {
                    setTimeout(function () {
                      e.setStatus("");
                    }, 1),
                      r();
                  }, 1))
                : r()));
      }
      if (
        ((e.dynCall_viiifiii = function () {
          return (e.dynCall_viiifiii = e.asm.dynCall_viiifiii).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_viifiii = function () {
          return (e.dynCall_viifiii = e.asm.dynCall_viifiii).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_v = function () {
          return (e.dynCall_v = e.asm.dynCall_v).apply(null, arguments);
        }),
        (e.dynCall_vif = function () {
          return (e.dynCall_vif = e.asm.dynCall_vif).apply(null, arguments);
        }),
        (e.dynCall_vf = function () {
          return (e.dynCall_vf = e.asm.dynCall_vf).apply(null, arguments);
        }),
        (e.dynCall_ji = function () {
          return (e.dynCall_ji = e.asm.dynCall_ji).apply(null, arguments);
        }),
        (e.dynCall_iiii = function () {
          return (e.dynCall_iiii = e.asm.dynCall_iiii).apply(null, arguments);
        }),
        (e.dynCall_i = function () {
          return (e.dynCall_i = e.asm.dynCall_i).apply(null, arguments);
        }),
        (e.dynCall_iiiiiii = function () {
          return (e.dynCall_iiiiiii = e.asm.dynCall_iiiiiii).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_viiiiii = function () {
          return (e.dynCall_viiiiii = e.asm.dynCall_viiiiii).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_iiiii = function () {
          return (e.dynCall_iiiii = e.asm.dynCall_iiiii).apply(null, arguments);
        }),
        (e.dynCall_viif = function () {
          return (e.dynCall_viif = e.asm.dynCall_viif).apply(null, arguments);
        }),
        (e.dynCall_viiif = function () {
          return (e.dynCall_viiif = e.asm.dynCall_viiif).apply(null, arguments);
        }),
        (e.dynCall_iiiif = function () {
          return (e.dynCall_iiiif = e.asm.dynCall_iiiif).apply(null, arguments);
        }),
        (e.dynCall_iiiffffffffffffffii = function () {
          return (e.dynCall_iiiffffffffffffffii =
            e.asm.dynCall_iiiffffffffffffffii).apply(null, arguments);
        }),
        (e.dynCall_iiiiiiiiiiiiiiiiii = function () {
          return (e.dynCall_iiiiiiiiiiiiiiiiii =
            e.asm.dynCall_iiiiiiiiiiiiiiiiii).apply(null, arguments);
        }),
        (e.dynCall_iiiiii = function () {
          return (e.dynCall_iiiiii = e.asm.dynCall_iiiiii).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_iifffi = function () {
          return (e.dynCall_iifffi = e.asm.dynCall_iifffi).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_fii = function () {
          return (e.dynCall_fii = e.asm.dynCall_fii).apply(null, arguments);
        }),
        (e.dynCall_viiiiff = function () {
          return (e.dynCall_viiiiff = e.asm.dynCall_viiiiff).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_vij = function () {
          return (e.dynCall_vij = e.asm.dynCall_vij).apply(null, arguments);
        }),
        (e.dynCall_viiid = function () {
          return (e.dynCall_viiid = e.asm.dynCall_viiid).apply(null, arguments);
        }),
        (e.dynCall_viiddid = function () {
          return (e.dynCall_viiddid = e.asm.dynCall_viiddid).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_viiddi = function () {
          return (e.dynCall_viiddi = e.asm.dynCall_viiddi).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_viid = function () {
          return (e.dynCall_viid = e.asm.dynCall_viid).apply(null, arguments);
        }),
        (e.dynCall_viiiiij = function () {
          return (e.dynCall_viiiiij = e.asm.dynCall_viiiiij).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_fi = function () {
          return (e.dynCall_fi = e.asm.dynCall_fi).apply(null, arguments);
        }),
        (e.dynCall_viiiiiii = function () {
          return (e.dynCall_viiiiiii = e.asm.dynCall_viiiiiii).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_viiij = function () {
          return (e.dynCall_viiij = e.asm.dynCall_viiij).apply(null, arguments);
        }),
        (e.dynCall_viijii = function () {
          return (e.dynCall_viijii = e.asm.dynCall_viijii).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_viffff = function () {
          return (e.dynCall_viffff = e.asm.dynCall_viffff).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_viiiff = function () {
          return (e.dynCall_viiiff = e.asm.dynCall_viiiff).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_viiiiiiii = function () {
          return (e.dynCall_viiiiiiii = e.asm.dynCall_viiiiiiii).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_viiijj = function () {
          return (e.dynCall_viiijj = e.asm.dynCall_viiijj).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_viiiiiiiiii = function () {
          return (e.dynCall_viiiiiiiiii = e.asm.dynCall_viiiiiiiiii).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_viiiiiiiii = function () {
          return (e.dynCall_viiiiiiiii = e.asm.dynCall_viiiiiiiii).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_viiiiiiiiidd = function () {
          return (e.dynCall_viiiiiiiiidd = e.asm.dynCall_viiiiiiiiidd).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_viiiiiiiddi = function () {
          return (e.dynCall_viiiiiiiddi = e.asm.dynCall_viiiiiiiddi).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_viiiiiiiiiiddi = function () {
          return (e.dynCall_viiiiiiiiiiddi =
            e.asm.dynCall_viiiiiiiiiiddi).apply(null, arguments);
        }),
        (e.dynCall_iiiiiiiii = function () {
          return (e.dynCall_iiiiiiiii = e.asm.dynCall_iiiiiiiii).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_viiiid = function () {
          return (e.dynCall_viiiid = e.asm.dynCall_viiiid).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_viidi = function () {
          return (e.dynCall_viidi = e.asm.dynCall_viidi).apply(null, arguments);
        }),
        (e.dynCall_vidii = function () {
          return (e.dynCall_vidii = e.asm.dynCall_vidii).apply(null, arguments);
        }),
        (e.dynCall_iiiji = function () {
          return (e.dynCall_iiiji = e.asm.dynCall_iiiji).apply(null, arguments);
        }),
        (e.dynCall_iiij = function () {
          return (e.dynCall_iiij = e.asm.dynCall_iiij).apply(null, arguments);
        }),
        (e.dynCall_iijii = function () {
          return (e.dynCall_iijii = e.asm.dynCall_iijii).apply(null, arguments);
        }),
        (e.dynCall_iiijiji = function () {
          return (e.dynCall_iiijiji = e.asm.dynCall_iiijiji).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_ddd = function () {
          return (e.dynCall_ddd = e.asm.dynCall_ddd).apply(null, arguments);
        }),
        (e.dynCall_dd = function () {
          return (e.dynCall_dd = e.asm.dynCall_dd).apply(null, arguments);
        }),
        (e.dynCall_jiji = function () {
          return (e.dynCall_jiji = e.asm.dynCall_jiji).apply(null, arguments);
        }),
        (e.dynCall_iidiiii = function () {
          return (e.dynCall_iidiiii = e.asm.dynCall_iidiiii).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_iiiiij = function () {
          return (e.dynCall_iiiiij = e.asm.dynCall_iiiiij).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_iiiiid = function () {
          return (e.dynCall_iiiiid = e.asm.dynCall_iiiiid).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_iiiiijj = function () {
          return (e.dynCall_iiiiijj = e.asm.dynCall_iiiiijj).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_iiiiiiii = function () {
          return (e.dynCall_iiiiiiii = e.asm.dynCall_iiiiiiii).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_iiiiiijj = function () {
          return (e.dynCall_iiiiiijj = e.asm.dynCall_iiiiiijj).apply(
            null,
            arguments
          );
        }),
        (e.dynCall_fff = function () {
          return (e.dynCall_fff = e.asm.dynCall_fff).apply(null, arguments);
        }),
        (e.dynCall_jjj = function () {
          return (e.dynCall_jjj = e.asm.dynCall_jjj).apply(null, arguments);
        }),
        (e.dynCall_iiff = function () {
          return (e.dynCall_iiff = e.asm.dynCall_iiff).apply(null, arguments);
        }),
        (e.asm = Nr),
        (e.getMemory = function (e) {
          return ie ? $r(e) : d(e);
        }),
        (e.addRunDependency = me),
        (e.removeRunDependency = pe),
        (e.FS_createFolder = Ae.createFolder),
        (e.FS_createPath = Ae.createPath),
        (e.FS_createDataFile = Ae.createDataFile),
        (e.FS_createPreloadedFile = Ae.createPreloadedFile),
        (e.FS_createLazyFile = Ae.createLazyFile),
        (e.FS_createLink = Ae.createLink),
        (e.FS_createDevice = Ae.createDevice),
        (e.FS_unlink = Ae.unlink),
        (e.FS = Ae),
        (e.then = function (t) {
          if (Ur) t(e);
          else {
            var r = e.onRuntimeInitialized;
            e.onRuntimeInitialized = function () {
              r && r(), t(e);
            };
          }
          return e;
        }),
        (de = function e() {
          Ur || ln(), Ur || (de = e);
        }),
        (e.run = ln),
        e.preInit)
      )
        for (
          "function" == typeof e.preInit && (e.preInit = [e.preInit]);
          e.preInit.length > 0;

        )
          e.preInit.pop()();
      return (h = !0), ln(), e;
    });
async function _(e) {
  const t =
      e.canvas ??
      (function () {
        const e = document.createElement("canvas");
        return (e.style.maxWidth = "100%"), e;
      })(),
    r =
      "object" == typeof e.locateFile
        ? ((n = e.locateFile), (e) => n[e])
        : e.locateFile;
  var n;
  const a = await y({ ...e, canvas: t, locateFile: r }).then(
    (e) => (delete e.then, e)
  );
  let i, o, u, s;
  a.init_sdk(
    1,
    1,
    e.devicePixelRatio ?? window.devicePixelRatio ?? 1,
    e.cameraOrientation ?? 0,
    e.enableMirroring ?? !0,
    e.clientToken
  ),
    a.set_face_search_mode(
      a.face_search_mode[e.faceSearchingMode ?? "good_for_first_face"]
    ),
    a.set_effect_volume(0);
  const c = a.process_frame;
  return (
    (a.process_frame = (e, t, r) => {
      o !== e.length && ((o = e.length), a._free(i), (i = a._malloc(o))),
        (u === t && s === r) ||
          ((u = t), (s = r), a.set_effect_size(u, s), a.surface_changed(u, s)),
        a.HEAP8.set(e, i),
        c(i, u, s);
    }),
    a
  );
}
const w = (e) =>
  [8, 9].includes(e.keyCode) ? e.stopImmediatePropagation() : null;
function b(e, t, r) {
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
window.addEventListener("keydown", w, !0),
  window.addEventListener("keyup", w, !0);
let C = {};
export class Player extends EventTarget {
  static setDefaultOptions(e) {
    C = e;
  }
  static async create(e) {
    const t = { ...C, ...e },
      r = await _(t);
    return new Player(r);
  }
  constructor(e) {
    super(),
      b(this, "isPlaying", !1),
      b(this, "_frames", (async function* () {})()),
      (this._sdk = e);
  }
  use(e) {
    this._frames = e[Symbol.asyncIterator]();
  }
  async applyEffect(e) {
    const t = this._sdk.FS,
      r = await e._write(t);
    this._sdk.load_effect(r);
  }
  clearEffect() {
    this._sdk.unload_effect();
  }
  callJsMethod(e, t = "") {
    this._sdk.call_js_method(e, t);
  }
  setVolume(e) {
    this._sdk.set_effect_volume(e),
      this.dispatchEvent(new CustomEvent("volumechange", { detail: e }));
  }
  async _render() {
    await new Promise(requestAnimationFrame);
    const { value: e } = await this._frames.next();
    if (!e) return !1;
    const { data: t, width: r, height: n } = e;
    return (
      this._sdk.process_frame(t, r, n),
      this.dispatchEvent(new CustomEvent("framerendered")),
      await new Promise(requestPostAnimationFrame),
      !0
    );
  }
  async play() {
    if (!this.isPlaying)
      for (this.isPlaying = !0; this.isPlaying; )
        this.isPlaying && (this.isPlaying = await this._render());
  }
  pause() {
    this.isPlaying = !1;
  }
}
if ("function" != typeof requestPostAnimationFrame) {
  const e = new MessageChannel(),
    t = [];
  let r = 0,
    n = !1;
  (e.port2.onmessage = (e) => {
    n = !1;
    const a = t.slice();
    (t.length = 0),
      a.forEach((e) => {
        try {
          e(r);
        } catch (e) {}
      });
  }),
    (window.requestPostAnimationFrame = function (a) {
      if ("function" != typeof a)
        throw new TypeError("Argument 1 is not callable");
      t.push(a),
        n ||
          (requestAnimationFrame((t) => {
            (r = t), e.port1.postMessage("");
          }),
          (n = !0));
    });
}
