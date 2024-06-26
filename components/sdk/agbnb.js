/**
 * AgoraWebSDK_N-v4.1.0-0-g64d4440 Copyright AgoraInc.
 */
"use strict";
!(function (Ka, Hb) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = Hb())
    : "function" == typeof define && define.amd
    ? define(Hb)
    : ((Ka =
        "undefined" != typeof globalThis ? globalThis : Ka || self).AgoraRTC =
        Hb());
})(this, function () {
  function Ka(c, a, b) {
    return (
      c(
        (b = {
          path: a,
          exports: {},
          require: function (a, b) {
            throw Error(
              "Dynamic requires are not currently supported by @rollup/plugin-commonjs"
            );
          }
        }),
        b.exports
      ),
      b.exports
    );
  }
  function Hb(c, a, b) {
    return (c = c.match(a)) && c.length >= b && S(c[b], 10);
  }
  function rc(c, a, b) {
    if (c.RTCPeerConnection) {
      c = c.RTCPeerConnection.prototype;
      var d = c.addEventListener;
      c.addEventListener = function (c, e) {
        if (c !== a) return d.apply(this, arguments);
        let f = (a) => {
          (a = b(a)) && e(a);
        };
        return (
          (this._eventMap = this._eventMap || {}),
          (this._eventMap[e] = f),
          d.apply(this, [c, f])
        );
      };
      var e = c.removeEventListener;
      c.removeEventListener = function (b, c) {
        if (b !== a || !this._eventMap || !this._eventMap[c])
          return e.apply(this, arguments);
        let d = this._eventMap[c];
        return delete this._eventMap[c], e.apply(this, [b, d]);
      };
      ba(c, "on" + a, {
        get() {
          return this["_on" + a];
        },
        set(b) {
          this["_on" + a] &&
            (this.removeEventListener(a, this["_on" + a]),
            delete this["_on" + a]);
          b && this.addEventListener(a, (this["_on" + a] = b));
        },
        enumerable: !0,
        configurable: !0
      });
    }
  }
  function il(c) {
    return "boolean" != typeof c
      ? Error("Argument type: " + typeof c + ". Please use a boolean.")
      : ((wg = c),
        c ? "adapter.js logging disabled" : "adapter.js logging enabled");
  }
  function jl(c) {
    return "boolean" != typeof c
      ? Error("Argument type: " + typeof c + ". Please use a boolean.")
      : ((xg = !c),
        "adapter.js deprecation warnings " + (c ? "disabled" : "enabled"));
  }
  function kb() {
    "object" != typeof window ||
      wg ||
      ("undefined" != typeof console &&
        "function" == typeof console.log &&
        console.log.apply(console, arguments));
  }
  function Ad(c, a) {
    xg && console.warn(c + " is deprecated, please use " + a + " instead.");
  }
  function Ib(c) {
    let { navigator: a } = c,
      b = { browser: null, version: null };
    if (void 0 === c || !c.navigator) return (b.browser = "Not a browser."), b;
    if (a.mozGetUserMedia)
      (b.browser = "firefox"),
        (b.version = Hb(a.userAgent, /Firefox\/(\d+)\./, 1));
    else if (
      a.webkitGetUserMedia ||
      (!1 === c.isSecureContext &&
        c.webkitRTCPeerConnection &&
        !c.RTCIceGatherer)
    )
      (b.browser = "chrome"),
        (b.version = Hb(a.userAgent, /Chrom(e|ium)\/(\d+)\./, 2));
    else if (a.mediaDevices && a.userAgent.match(/Edge\/(\d+).(\d+)$/))
      (b.browser = "edge"),
        (b.version = Hb(a.userAgent, /Edge\/(\d+).(\d+)$/, 2));
    else {
      if (!c.RTCPeerConnection || !a.userAgent.match(/AppleWebKit\/(\d+)\./))
        return (b.browser = "Not a supported browser."), b;
      b.browser = "safari";
      b.version = Hb(a.userAgent, /AppleWebKit\/(\d+)\./, 1);
      b.supportsUnifiedPlan =
        c.RTCRtpTransceiver &&
        "currentDirection" in c.RTCRtpTransceiver.prototype;
    }
    return b;
  }
  function yg(c) {
    var a;
    return "[object Object]" === Object.prototype.toString.call(c)
      ? xe((a = V(c))).call(
          a,
          function (a, d) {
            var b = "[object Object]" === Object.prototype.toString.call(c[d]);
            let f = b ? yg(c[d]) : c[d];
            b = b && !V(f).length;
            return void 0 === f || b ? a : Wa(a, { [d]: f });
          },
          {}
        )
      : c;
  }
  function ye(c, a, b) {
    var d;
    a &&
      !b.has(a.id) &&
      (b.set(a.id, a),
      r((d = V(a))).call(d, (d) => {
        if (zg(d).call(d, "Id")) ye(c, c.get(a[d]), b);
        else if (zg(d).call(d, "Ids")) {
          var e;
          r((e = a[d])).call(e, (a) => {
            ye(c, c.get(a), b);
          });
        }
      }));
  }
  function Ag(c, a, b) {
    let d = b ? "outbound-rtp" : "inbound-rtp",
      e = new Y();
    if (null === a) return e;
    let f = [];
    return (
      r(c).call(c, (b) => {
        "track" === b.type && b.trackIdentifier === a.id && f.push(b);
      }),
      r(f).call(f, (a) => {
        r(c).call(c, (b) => {
          b.type === d && b.trackId === a.id && ye(c, b, e);
        });
      }),
      e
    );
  }
  function Bg(c) {
    let a = c && c.navigator;
    if (a.mediaDevices) {
      var b = Ib(c),
        d = function (a) {
          var b;
          if ("object" != typeof a || a.mandatory || a.optional) return a;
          const c = {};
          var d;
          (r((b = V(a))).call(b, (b) => {
            if ("require" !== b && "advanced" !== b && "mediaSource" !== b) {
              var d = "object" == typeof a[b] ? a[b] : { ideal: a[b] };
              void 0 !== d.exact &&
                "number" == typeof d.exact &&
                (d.min = d.max = d.exact);
              var e = function (a, b) {
                return a
                  ? a + b.charAt(0).toUpperCase() + wb(b).call(b, 1)
                  : "deviceId" === b
                  ? "sourceId"
                  : b;
              };
              if (void 0 !== d.ideal) {
                c.optional = c.optional || [];
                let a = {};
                "number" == typeof d.ideal
                  ? ((a[e("min", b)] = d.ideal),
                    c.optional.push(a),
                    (a = {}),
                    (a[e("max", b)] = d.ideal),
                    c.optional.push(a))
                  : ((a[e("", b)] = d.ideal), c.optional.push(a));
              }
              var f;
              void 0 !== d.exact && "number" != typeof d.exact
                ? ((c.mandatory = c.mandatory || {}),
                  (c.mandatory[e("", b)] = d.exact))
                : r((f = ["min", "max"])).call(f, (a) => {
                    void 0 !== d[a] &&
                      ((c.mandatory = c.mandatory || {}),
                      (c.mandatory[e(a, b)] = d[a]));
                  });
            }
          }),
          a.advanced) &&
            (c.optional = n((d = c.optional || [])).call(d, a.advanced));
          return c;
        },
        e = function (c, e) {
          if (61 <= b.version) return e(c);
          if ((c = JSON.parse(w(c))) && "object" == typeof c.audio) {
            var f = function (a, b, c) {
              b in a && !(c in a) && ((a[c] = a[b]), delete a[b]);
            };
            f(
              (c = JSON.parse(w(c))).audio,
              "autoGainControl",
              "googAutoGainControl"
            );
            f(c.audio, "noiseSuppression", "googNoiseSuppression");
            c.audio = d(c.audio);
          }
          if (c && "object" == typeof c.video) {
            let g = c.video.facingMode;
            g = g && ("object" == typeof g ? g : { ideal: g });
            f = 66 > b.version;
            if (
              !(
                !g ||
                ("user" !== g.exact &&
                  "environment" !== g.exact &&
                  "user" !== g.ideal &&
                  "environment" !== g.ideal) ||
                (a.mediaDevices.getSupportedConstraints &&
                  a.mediaDevices.getSupportedConstraints().facingMode &&
                  !f)
              )
            ) {
              let b;
              if (
                (delete c.video.facingMode,
                "environment" === g.exact || "environment" === g.ideal
                  ? (b = ["back", "rear"])
                  : ("user" !== g.exact && "user" !== g.ideal) ||
                    (b = ["front"]),
                b)
              )
                return a.mediaDevices.enumerateDevices().then((a) => {
                  a = M(a).call(a, (a) => "videoinput" === a.kind);
                  let f = R(a).call(a, (a) =>
                    Cg(b).call(b, (b) => {
                      var c;
                      return La((c = a.label.toLowerCase())).call(c, b);
                    })
                  );
                  return (
                    !f &&
                      a.length &&
                      La(b).call(b, "back") &&
                      (f = a[a.length - 1]),
                    f &&
                      (c.video.deviceId = g.exact
                        ? { exact: f.deviceId }
                        : { ideal: f.deviceId }),
                    (c.video = d(c.video)),
                    Dg("chrome: " + w(c)),
                    e(c)
                  );
                });
            }
            c.video = d(c.video);
          }
          return Dg("chrome: " + w(c)), e(c);
        },
        f = function (a) {
          return 64 <= b.version
            ? a
            : {
                name:
                  {
                    PermissionDeniedError: "NotAllowedError",
                    PermissionDismissedError: "NotAllowedError",
                    InvalidStateError: "NotAllowedError",
                    DevicesNotFoundError: "NotFoundError",
                    ConstraintNotSatisfiedError: "OverconstrainedError",
                    TrackStartError: "NotReadableError",
                    MediaDeviceFailedDueToShutdown: "NotAllowedError",
                    MediaDeviceKillSwitchOn: "NotAllowedError",
                    TabCaptureError: "AbortError",
                    ScreenCaptureError: "AbortError",
                    DeviceCaptureError: "AbortError"
                  }[a.name] || a.name,
                message: a.message,
                constraint: a.constraint || a.constraintName,
                toString() {
                  return this.name + (this.message && ": ") + this.message;
                }
              };
        };
      c = function (b, c, d) {
        e(b, (b) => {
          a.webkitGetUserMedia(b, c, (a) => {
            d && d(f(a));
          });
        });
      };
      if (((a.getUserMedia = ya(c).call(c, a)), a.mediaDevices.getUserMedia)) {
        var g;
        let b = ya((g = a.mediaDevices.getUserMedia)).call(g, a.mediaDevices);
        a.mediaDevices.getUserMedia = function (a) {
          return e(a, (a) =>
            b(a).then(
              (b) => {
                var c;
                if (
                  (a.audio && !b.getAudioTracks().length) ||
                  (a.video && !b.getVideoTracks().length)
                )
                  throw (
                    (r((c = b.getTracks())).call(c, (a) => {
                      a.stop();
                    }),
                    new DOMException("", "NotFoundError"))
                  );
                return b;
              },
              (a) => u.reject(f(a))
            )
          );
        };
      }
    }
  }
  function Eg(c) {
    c.MediaStream = c.MediaStream || c.webkitMediaStream;
  }
  function Fg(c) {
    if (
      "object" != typeof c ||
      !c.RTCPeerConnection ||
      "ontrack" in c.RTCPeerConnection.prototype
    )
      rc(
        c,
        "track",
        (a) => (
          a.transceiver ||
            ba(a, "transceiver", { value: { receiver: a.receiver } }),
          a
        )
      );
    else {
      ba(c.RTCPeerConnection.prototype, "ontrack", {
        get() {
          return this._ontrack;
        },
        set(a) {
          this._ontrack && this.removeEventListener("track", this._ontrack);
          this.addEventListener("track", (this._ontrack = a));
        },
        enumerable: !0,
        configurable: !0
      });
      let a = c.RTCPeerConnection.prototype.setRemoteDescription;
      c.RTCPeerConnection.prototype.setRemoteDescription = function () {
        return (
          this._ontrackpoly ||
            ((this._ontrackpoly = (a) => {
              var b;
              a.stream.addEventListener("addtrack", (b) => {
                let d;
                var e;
                c.RTCPeerConnection.prototype.getReceivers
                  ? (d = R((e = this.getReceivers())).call(
                      e,
                      (a) => a.track && a.track.id === b.track.id
                    ))
                  : (d = { track: b.track });
                e = new Event("track");
                e.track = b.track;
                e.receiver = d;
                e.transceiver = { receiver: d };
                e.streams = [a.stream];
                this.dispatchEvent(e);
              });
              r((b = a.stream.getTracks())).call(b, (b) => {
                let d;
                var e;
                c.RTCPeerConnection.prototype.getReceivers
                  ? (d = R((e = this.getReceivers())).call(
                      e,
                      (a) => a.track && a.track.id === b.id
                    ))
                  : (d = { track: b });
                e = new Event("track");
                e.track = b;
                e.receiver = d;
                e.transceiver = { receiver: d };
                e.streams = [a.stream];
                this.dispatchEvent(e);
              });
            }),
            this.addEventListener("addstream", this._ontrackpoly)),
          a.apply(this, arguments)
        );
      };
    }
  }
  function Gg(c) {
    if (
      "object" == typeof c &&
      c.RTCPeerConnection &&
      !("getSenders" in c.RTCPeerConnection.prototype) &&
      "createDTMFSender" in c.RTCPeerConnection.prototype
    ) {
      let a = function (a, b) {
        return {
          track: b,
          get dtmf() {
            return (
              void 0 === this._dtmf &&
                ("audio" === b.kind
                  ? (this._dtmf = a.createDTMFSender(b))
                  : (this._dtmf = null)),
              this._dtmf
            );
          },
          _pc: a
        };
      };
      if (!c.RTCPeerConnection.prototype.getSenders) {
        c.RTCPeerConnection.prototype.getSenders = function () {
          var a;
          return (
            (this._senders = this._senders || []),
            wb((a = this._senders)).call(a)
          );
        };
        let b = c.RTCPeerConnection.prototype.addTrack;
        c.RTCPeerConnection.prototype.addTrack = function (c, d) {
          let e = b.apply(this, arguments);
          return e || ((e = a(this, c)), this._senders.push(e)), e;
        };
        let d = c.RTCPeerConnection.prototype.removeTrack;
        c.RTCPeerConnection.prototype.removeTrack = function (a) {
          var b;
          d.apply(this, arguments);
          let c = E((b = this._senders)).call(b, a);
          var e;
          -1 !== c && Ma((e = this._senders)).call(e, c, 1);
        };
      }
      let b = c.RTCPeerConnection.prototype.addStream;
      c.RTCPeerConnection.prototype.addStream = function (c) {
        var d;
        this._senders = this._senders || [];
        b.apply(this, [c]);
        r((d = c.getTracks())).call(d, (b) => {
          this._senders.push(a(this, b));
        });
      };
      let d = c.RTCPeerConnection.prototype.removeStream;
      c.RTCPeerConnection.prototype.removeStream = function (a) {
        var b;
        this._senders = this._senders || [];
        d.apply(this, [a]);
        r((b = a.getTracks())).call(b, (a) => {
          var b;
          let c = R((b = this._senders)).call(b, (b) => b.track === a);
          var d, e;
          c &&
            Ma((d = this._senders)).call(
              d,
              E((e = this._senders)).call(e, c),
              1
            );
        });
      };
    } else if (
      "object" == typeof c &&
      c.RTCPeerConnection &&
      "getSenders" in c.RTCPeerConnection.prototype &&
      "createDTMFSender" in c.RTCPeerConnection.prototype &&
      c.RTCRtpSender &&
      !("dtmf" in c.RTCRtpSender.prototype)
    ) {
      let a = c.RTCPeerConnection.prototype.getSenders;
      c.RTCPeerConnection.prototype.getSenders = function () {
        let b = a.apply(this, []);
        return r(b).call(b, (a) => (a._pc = this)), b;
      };
      ba(c.RTCRtpSender.prototype, "dtmf", {
        get() {
          return (
            void 0 === this._dtmf &&
              ("audio" === this.track.kind
                ? (this._dtmf = this._pc.createDTMFSender(this.track))
                : (this._dtmf = null)),
            this._dtmf
          );
        }
      });
    }
  }
  function Hg(c) {
    if (c.RTCPeerConnection) {
      var a = c.RTCPeerConnection.prototype.getStats;
      c.RTCPeerConnection.prototype.getStats = function () {
        let [b, c, e] = arguments;
        if (0 < arguments.length && "function" == typeof b)
          return a.apply(this, arguments);
        if (
          0 === a.length &&
          (0 === arguments.length || "function" != typeof b)
        )
          return a.apply(this, []);
        let f = function (a) {
            const b = {};
            a = a.result();
            return (
              r(a).call(a, (a) => {
                var c;
                const d = {
                  id: a.id,
                  timestamp: a.timestamp,
                  type:
                    {
                      localcandidate: "local-candidate",
                      remotecandidate: "remote-candidate"
                    }[a.type] || a.type
                };
                r((c = a.names())).call(c, (b) => {
                  d[b] = a.stat(b);
                });
                b[d.id] = d;
              }),
              b
            );
          },
          g = function (a) {
            var b;
            return new Y(D((b = V(a))).call(b, (b) => [b, a[b]]));
          };
        return 2 <= arguments.length
          ? a.apply(this, [
              function (a) {
                c(g(f(a)));
              },
              b
            ])
          : new u((b, c) => {
              a.apply(this, [
                function (a) {
                  b(g(f(a)));
                },
                c
              ]);
            }).then(c, e);
      };
    }
  }
  function Ig(c) {
    if (
      "object" == typeof c &&
      c.RTCPeerConnection &&
      c.RTCRtpSender &&
      c.RTCRtpReceiver
    ) {
      if (!("getStats" in c.RTCRtpSender.prototype)) {
        let a = c.RTCPeerConnection.prototype.getSenders;
        a &&
          (c.RTCPeerConnection.prototype.getSenders = function () {
            let b = a.apply(this, []);
            return r(b).call(b, (a) => (a._pc = this)), b;
          });
        let d = c.RTCPeerConnection.prototype.addTrack;
        d &&
          (c.RTCPeerConnection.prototype.addTrack = function () {
            let a = d.apply(this, arguments);
            return (a._pc = this), a;
          });
        c.RTCRtpSender.prototype.getStats = function () {
          let a = this;
          return this._pc.getStats().then((b) => Ag(b, a.track, !0));
        };
      }
      if (!("getStats" in c.RTCRtpReceiver.prototype)) {
        let a = c.RTCPeerConnection.prototype.getReceivers;
        a &&
          (c.RTCPeerConnection.prototype.getReceivers = function () {
            let b = a.apply(this, []);
            return r(b).call(b, (a) => (a._pc = this)), b;
          });
        rc(c, "track", (a) => ((a.receiver._pc = a.srcElement), a));
        c.RTCRtpReceiver.prototype.getStats = function () {
          let a = this;
          return this._pc.getStats().then((b) => Ag(b, a.track, !1));
        };
      }
      if (
        "getStats" in c.RTCRtpSender.prototype &&
        "getStats" in c.RTCRtpReceiver.prototype
      ) {
        var a = c.RTCPeerConnection.prototype.getStats;
        c.RTCPeerConnection.prototype.getStats = function () {
          if (
            0 < arguments.length &&
            arguments[0] instanceof c.MediaStreamTrack
          ) {
            var b, d;
            let a = arguments[0],
              c,
              g,
              h;
            return (
              r((b = this.getSenders())).call(b, (b) => {
                b.track === a && (c ? (h = !0) : (c = b));
              }),
              r((d = this.getReceivers())).call(
                d,
                (b) => (
                  b.track === a && (g ? (h = !0) : (g = b)), b.track === a
                )
              ),
              h || (c && g)
                ? u.reject(
                    new DOMException(
                      "There are more than one sender or receiver for the track.",
                      "InvalidAccessError"
                    )
                  )
                : c
                ? c.getStats()
                : g
                ? g.getStats()
                : u.reject(
                    new DOMException(
                      "There is no sender or receiver for the track.",
                      "InvalidAccessError"
                    )
                  )
            );
          }
          return a.apply(this, arguments);
        };
      }
    }
  }
  function Jg(c) {
    c.RTCPeerConnection.prototype.getLocalStreams = function () {
      var a;
      return (
        (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
        D((a = V(this._shimmedLocalStreams))).call(
          a,
          (a) => this._shimmedLocalStreams[a][0]
        )
      );
    };
    let a = c.RTCPeerConnection.prototype.addTrack;
    c.RTCPeerConnection.prototype.addTrack = function (b, c) {
      var d;
      if (!c) return a.apply(this, arguments);
      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      let e = a.apply(this, arguments);
      return (
        this._shimmedLocalStreams[c.id]
          ? -1 === E((d = this._shimmedLocalStreams[c.id])).call(d, e) &&
            this._shimmedLocalStreams[c.id].push(e)
          : (this._shimmedLocalStreams[c.id] = [c, e]),
        e
      );
    };
    let b = c.RTCPeerConnection.prototype.addStream;
    c.RTCPeerConnection.prototype.addStream = function (a) {
      var c, d, e;
      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      r((c = a.getTracks())).call(c, (a) => {
        var b;
        if (R((b = this.getSenders())).call(b, (b) => b.track === a))
          throw new DOMException("Track already exists.", "InvalidAccessError");
      });
      let f = this.getSenders();
      b.apply(this, arguments);
      c = M((d = this.getSenders())).call(d, (a) => -1 === E(f).call(f, a));
      this._shimmedLocalStreams[a.id] = n((e = [a])).call(e, c);
    };
    let d = c.RTCPeerConnection.prototype.removeStream;
    c.RTCPeerConnection.prototype.removeStream = function (a) {
      return (
        (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
        delete this._shimmedLocalStreams[a.id],
        d.apply(this, arguments)
      );
    };
    let e = c.RTCPeerConnection.prototype.removeTrack;
    c.RTCPeerConnection.prototype.removeTrack = function (a) {
      var b;
      ((this._shimmedLocalStreams = this._shimmedLocalStreams || {}), a) &&
        r((b = V(this._shimmedLocalStreams))).call(b, (b) => {
          var c;
          let d = E((c = this._shimmedLocalStreams[b])).call(c, a);
          var e;
          -1 !== d && Ma((e = this._shimmedLocalStreams[b])).call(e, d, 1);
          1 === this._shimmedLocalStreams[b].length &&
            delete this._shimmedLocalStreams[b];
        });
      return e.apply(this, arguments);
    };
  }
  function Kg(c) {
    function a(a, b) {
      var c;
      let d = b.sdp;
      return (
        r((c = V(a._reverseStreams || []))).call(c, (b) => {
          b = a._reverseStreams[b];
          d = d.replace(new RegExp(a._streams[b.id].id, "g"), b.id);
        }),
        new RTCSessionDescription({ type: b.type, sdp: d })
      );
    }
    function b(a, b) {
      var c;
      let d = b.sdp;
      return (
        r((c = V(a._reverseStreams || []))).call(c, (b) => {
          b = a._reverseStreams[b];
          d = d.replace(new RegExp(b.id, "g"), a._streams[b.id].id);
        }),
        new RTCSessionDescription({ type: b.type, sdp: d })
      );
    }
    var d;
    if (c.RTCPeerConnection) {
      var e = Ib(c);
      if (c.RTCPeerConnection.prototype.addTrack && 65 <= e.version)
        return Jg(c);
      var f = c.RTCPeerConnection.prototype.getLocalStreams;
      c.RTCPeerConnection.prototype.getLocalStreams = function () {
        let a = f.apply(this);
        return (
          (this._reverseStreams = this._reverseStreams || {}),
          D(a).call(a, (a) => this._reverseStreams[a.id])
        );
      };
      var g = c.RTCPeerConnection.prototype.addStream;
      c.RTCPeerConnection.prototype.addStream = function (a) {
        var b;
        ((this._streams = this._streams || {}),
        (this._reverseStreams = this._reverseStreams || {}),
        r((b = a.getTracks())).call(b, (a) => {
          var b;
          if (R((b = this.getSenders())).call(b, (b) => b.track === a))
            throw new DOMException(
              "Track already exists.",
              "InvalidAccessError"
            );
        }),
        this._reverseStreams[a.id]) ||
          ((b = new c.MediaStream(a.getTracks())),
          (this._streams[a.id] = b),
          (this._reverseStreams[b.id] = a),
          (a = b));
        g.apply(this, [a]);
      };
      var h = c.RTCPeerConnection.prototype.removeStream;
      c.RTCPeerConnection.prototype.removeStream = function (a) {
        this._streams = this._streams || {};
        this._reverseStreams = this._reverseStreams || {};
        h.apply(this, [this._streams[a.id] || a]);
        delete this._reverseStreams[
          this._streams[a.id] ? this._streams[a.id].id : a.id
        ];
        delete this._streams[a.id];
      };
      c.RTCPeerConnection.prototype.addTrack = function (a, b) {
        var d, e, f;
        if ("closed" === this.signalingState)
          throw new DOMException(
            "The RTCPeerConnection's signalingState is 'closed'.",
            "InvalidStateError"
          );
        let g = wb([]).call(arguments, 1);
        if (
          1 !== g.length ||
          !R((d = g[0].getTracks())).call(d, (b) => b === a)
        )
          throw new DOMException(
            "The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.",
            "NotSupportedError"
          );
        if (R((e = this.getSenders())).call(e, (b) => b.track === a))
          throw new DOMException("Track already exists.", "InvalidAccessError");
        this._streams = this._streams || {};
        this._reverseStreams = this._reverseStreams || {};
        (d = this._streams[b.id])
          ? (d.addTrack(a),
            u.resolve().then(() => {
              this.dispatchEvent(new Event("negotiationneeded"));
            }))
          : ((d = new c.MediaStream([a])),
            (this._streams[b.id] = d),
            (this._reverseStreams[d.id] = b),
            this.addStream(d));
        return R((f = this.getSenders())).call(f, (b) => b.track === a);
      };
      r((d = ["createOffer", "createAnswer"])).call(d, function (b) {
        let d = c.RTCPeerConnection.prototype[b];
        c.RTCPeerConnection.prototype[b] = {
          [b]() {
            const b = arguments;
            return arguments.length && "function" == typeof arguments[0]
              ? d.apply(this, [
                  (c) => {
                    c = a(this, c);
                    b[0].apply(null, [c]);
                  },
                  (a) => {
                    b[1] && b[1].apply(null, a);
                  },
                  arguments[2]
                ])
              : d.apply(this, arguments).then((b) => a(this, b));
          }
        }[b];
      });
      var q = c.RTCPeerConnection.prototype.setLocalDescription;
      c.RTCPeerConnection.prototype.setLocalDescription = function () {
        return arguments.length && arguments[0].type
          ? ((arguments[0] = b(this, arguments[0])), q.apply(this, arguments))
          : q.apply(this, arguments);
      };
      var y = ca(c.RTCPeerConnection.prototype, "localDescription");
      ba(c.RTCPeerConnection.prototype, "localDescription", {
        get() {
          let b = y.get.apply(this);
          return "" === b.type ? b : a(this, b);
        }
      });
      c.RTCPeerConnection.prototype.removeTrack = function (a) {
        var b;
        if ("closed" === this.signalingState)
          throw new DOMException(
            "The RTCPeerConnection's signalingState is 'closed'.",
            "InvalidStateError"
          );
        if (!a._pc)
          throw new DOMException(
            "Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.",
            "TypeError"
          );
        if (a._pc !== this)
          throw new DOMException(
            "Sender was not created by this connection.",
            "InvalidAccessError"
          );
        let c;
        this._streams = this._streams || {};
        r((b = V(this._streams))).call(b, (b) => {
          var d;
          R((d = this._streams[b].getTracks())).call(d, (b) => a.track === b) &&
            (c = this._streams[b]);
        });
        c &&
          (1 === c.getTracks().length
            ? this.removeStream(this._reverseStreams[c.id])
            : c.removeTrack(a.track),
          this.dispatchEvent(new Event("negotiationneeded")));
      };
    }
  }
  function ze(c) {
    let a = Ib(c);
    if (
      (!c.RTCPeerConnection &&
        c.webkitRTCPeerConnection &&
        (c.RTCPeerConnection = c.webkitRTCPeerConnection),
      c.RTCPeerConnection)
    ) {
      var b;
      53 > a.version &&
        r(
          (b = [
            "setLocalDescription",
            "setRemoteDescription",
            "addIceCandidate"
          ])
        ).call(b, function (a) {
          let b = c.RTCPeerConnection.prototype[a];
          c.RTCPeerConnection.prototype[a] = {
            [a]() {
              return (
                (arguments[0] = new (
                  "addIceCandidate" === a
                    ? c.RTCIceCandidate
                    : c.RTCSessionDescription
                )(arguments[0])),
                b.apply(this, arguments)
              );
            }
          }[a];
        });
      var d = c.RTCPeerConnection.prototype.addIceCandidate;
      c.RTCPeerConnection.prototype.addIceCandidate = function () {
        return arguments[0]
          ? 78 > a.version && arguments[0] && "" === arguments[0].candidate
            ? u.resolve()
            : d.apply(this, arguments)
          : (arguments[1] && arguments[1].apply(null), u.resolve());
      };
    }
  }
  function Lg(c) {
    rc(c, "negotiationneeded", (a) => {
      if ("stable" === a.target.signalingState) return a;
    });
  }
  function kl(c, a) {
    let b = !1;
    return (
      (c = JSON.parse(w(c))),
      M(c).call(c, (a) => {
        if (a && (a.urls || a.url)) {
          var c = a.urls || a.url;
          a.url && !a.urls && Ad("RTCIceServer.url", "RTCIceServer.urls");
          let d = "string" == typeof c;
          return (
            d && (c = [c]),
            (c = M(c).call(c, (a) =>
              0 === E(a).call(a, "stun:")
                ? !1
                : (a =
                    Bd(a).call(a, "turn") &&
                    !Bd(a).call(a, "turn:[") &&
                    La(a).call(a, "transport=udp")) && !b
                ? ((b = !0), !0)
                : a && !b
            )),
            delete a.url,
            (a.urls = d ? c[0] : c),
            !!c.length
          );
        }
      })
    );
  }
  function Mg(c, a, b, d, e) {
    a = F.writeRtpDescription(c.kind, a);
    if (
      ((a += F.writeIceParameters(c.iceGatherer.getLocalParameters())),
      (a += F.writeDtlsParameters(
        c.dtlsTransport.getLocalParameters(),
        "offer" === b ? "actpass" : e || "active"
      )),
      (a += "a=mid:" + c.mid + "\r\n"),
      c.rtpSender && c.rtpReceiver
        ? (a += "a=sendrecv\r\n")
        : c.rtpSender
        ? (a += "a=sendonly\r\n")
        : c.rtpReceiver
        ? (a += "a=recvonly\r\n")
        : (a += "a=inactive\r\n"),
      c.rtpSender)
    )
      (b = c.rtpSender._initialTrackId || c.rtpSender.track.id),
        (c.rtpSender._initialTrackId = b),
        (d = "msid:" + (d ? d.id : "-") + " " + b + "\r\n"),
        (a =
          a +
          ("a=" + d) +
          ("a=ssrc:" + c.sendEncodingParameters[0].ssrc + " " + d)),
        c.sendEncodingParameters[0].rtx &&
          ((a += "a=ssrc:" + c.sendEncodingParameters[0].rtx.ssrc + " " + d),
          (a +=
            "a=ssrc-group:FID " +
            c.sendEncodingParameters[0].ssrc +
            " " +
            c.sendEncodingParameters[0].rtx.ssrc +
            "\r\n"));
    return (
      (a +=
        "a=ssrc:" +
        c.sendEncodingParameters[0].ssrc +
        " cname:" +
        F.localCName +
        "\r\n"),
      c.rtpSender &&
        c.sendEncodingParameters[0].rtx &&
        (a +=
          "a=ssrc:" +
          c.sendEncodingParameters[0].rtx.ssrc +
          " cname:" +
          F.localCName +
          "\r\n"),
      a
    );
  }
  function ll(c, a) {
    var b = !1;
    return (c = JSON.parse(JSON.stringify(c))).filter(function (c) {
      if (c && (c.urls || c.url)) {
        var d = c.urls || c.url;
        c.url &&
          !c.urls &&
          console.warn("RTCIceServer.url is deprecated! Use urls instead.");
        var f = "string" == typeof d;
        return (
          f && (d = [d]),
          (d = d.filter(function (c) {
            return 0 !== c.indexOf("turn:") ||
              -1 === c.indexOf("transport=udp") ||
              -1 !== c.indexOf("turn:[") ||
              b
              ? 0 === c.indexOf("stun:") &&
                  14393 <= a &&
                  -1 === c.indexOf("?transport=udp")
              : ((b = !0), !0);
          })),
          delete c.url,
          (c.urls = f ? d[0] : d),
          !!d.length
        );
      }
    });
  }
  function Cd(c, a) {
    var b = { codecs: [], headerExtensions: [], fecMechanisms: [] },
      d = function (a, b) {
        a = parseInt(a, 10);
        for (var c = 0; c < b.length; c++)
          if (b[c].payloadType === a || b[c].preferredPayloadType === a)
            return b[c];
      },
      e = function (a, b, c, e) {
        a = d(a.parameters.apt, c);
        b = d(b.parameters.apt, e);
        return a && b && a.name.toLowerCase() === b.name.toLowerCase();
      };
    return (
      c.codecs.forEach(function (d) {
        for (var f = 0; f < a.codecs.length; f++) {
          var h = a.codecs[f];
          if (
            d.name.toLowerCase() === h.name.toLowerCase() &&
            d.clockRate === h.clockRate &&
            ("rtx" !== d.name.toLowerCase() ||
              !d.parameters ||
              !h.parameters.apt ||
              e(d, h, c.codecs, a.codecs))
          ) {
            (h = JSON.parse(JSON.stringify(h))).numChannels = Math.min(
              d.numChannels,
              h.numChannels
            );
            b.codecs.push(h);
            h.rtcpFeedback = h.rtcpFeedback.filter(function (a) {
              for (var b = 0; b < d.rtcpFeedback.length; b++)
                if (
                  d.rtcpFeedback[b].type === a.type &&
                  d.rtcpFeedback[b].parameter === a.parameter
                )
                  return !0;
              return !1;
            });
            break;
          }
        }
      }),
      c.headerExtensions.forEach(function (c) {
        for (var d = 0; d < a.headerExtensions.length; d++) {
          var e = a.headerExtensions[d];
          if (c.uri === e.uri) {
            b.headerExtensions.push(e);
            break;
          }
        }
      }),
      b
    );
  }
  function Ng(c, a, b) {
    return (
      -1 !==
      {
        offer: {
          setLocalDescription: ["stable", "have-local-offer"],
          setRemoteDescription: ["stable", "have-remote-offer"]
        },
        answer: {
          setLocalDescription: ["have-remote-offer", "have-local-pranswer"],
          setRemoteDescription: ["have-local-offer", "have-remote-pranswer"]
        }
      }[a][c].indexOf(b)
    );
  }
  function Ae(c, a) {
    var b = c.getRemoteCandidates().find(function (b) {
      return (
        a.foundation === b.foundation &&
        a.ip === b.ip &&
        a.port === b.port &&
        a.priority === b.priority &&
        a.protocol === b.protocol &&
        a.type === b.type
      );
    });
    return b || c.addRemoteCandidate(a), !b;
  }
  function Fa(c, a) {
    a = Error(a);
    return (
      (a.name = c),
      (a.code = {
        NotSupportedError: 9,
        InvalidStateError: 11,
        InvalidAccessError: 15,
        TypeError: void 0,
        OperationError: void 0
      }[c]),
      a
    );
  }
  function Og(c) {
    var a;
    c = c && c.navigator;
    let b = ya((a = c.mediaDevices.getUserMedia)).call(a, c.mediaDevices);
    c.mediaDevices.getUserMedia = function (a) {
      return b(a).catch((a) =>
        u.reject(
          (function (a) {
            return {
              name:
                { PermissionDeniedError: "NotAllowedError" }[a.name] || a.name,
              message: a.message,
              constraint: a.constraint,
              toString() {
                return this.name;
              }
            };
          })(a)
        )
      );
    };
  }
  function Pg(c) {
    var a;
    "getDisplayMedia" in c.navigator &&
      c.navigator.mediaDevices &&
      ((c.navigator.mediaDevices &&
        "getDisplayMedia" in c.navigator.mediaDevices) ||
        (c.navigator.mediaDevices.getDisplayMedia = ya(
          (a = c.navigator.getDisplayMedia)
        ).call(a, c.navigator)));
  }
  function Be(c) {
    let a = Ib(c);
    if (
      c.RTCIceGatherer &&
      (c.RTCIceCandidate ||
        (c.RTCIceCandidate = function (a) {
          return a;
        }),
      c.RTCSessionDescription ||
        (c.RTCSessionDescription = function (a) {
          return a;
        }),
      15025 > a.version)
    ) {
      let a = ca(c.MediaStreamTrack.prototype, "enabled");
      ba(c.MediaStreamTrack.prototype, "enabled", {
        set(b) {
          a.set.call(this, b);
          let c = new Event("enabled");
          c.enabled = b;
          this.dispatchEvent(c);
        }
      });
    }
    !c.RTCRtpSender ||
      "dtmf" in c.RTCRtpSender.prototype ||
      ba(c.RTCRtpSender.prototype, "dtmf", {
        get() {
          return (
            void 0 === this._dtmf &&
              ("audio" === this.track.kind
                ? (this._dtmf = new c.RTCDtmfSender(this))
                : "video" === this.track.kind && (this._dtmf = null)),
            this._dtmf
          );
        }
      });
    c.RTCDtmfSender && !c.RTCDTMFSender && (c.RTCDTMFSender = c.RTCDtmfSender);
    let b = ml(c, a.version);
    c.RTCPeerConnection = function (c) {
      return (
        c &&
          c.iceServers &&
          ((c.iceServers = kl(c.iceServers, a.version)),
          kb("ICE servers after filtering:", c.iceServers)),
        new b(c)
      );
    };
    c.RTCPeerConnection.prototype = b.prototype;
  }
  function Qg(c) {
    !c.RTCRtpSender ||
      "replaceTrack" in c.RTCRtpSender.prototype ||
      (c.RTCRtpSender.prototype.replaceTrack =
        c.RTCRtpSender.prototype.setTrack);
  }
  function Rg(c) {
    let a = Ib(c),
      b = c && c.navigator;
    c = c && c.MediaStreamTrack;
    if (
      ((b.getUserMedia = function (a, c, d) {
        Ad("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia");
        b.mediaDevices.getUserMedia(a).then(c, d);
      }),
      !(
        55 < a.version &&
        "autoGainControl" in b.mediaDevices.getSupportedConstraints()
      ))
    ) {
      var d;
      let a = function (a, b, c) {
          b in a && !(c in a) && ((a[c] = a[b]), delete a[b]);
        },
        f = ya((d = b.mediaDevices.getUserMedia)).call(d, b.mediaDevices);
      if (
        ((b.mediaDevices.getUserMedia = function (b) {
          return (
            "object" == typeof b &&
              "object" == typeof b.audio &&
              ((b = JSON.parse(w(b))),
              a(b.audio, "autoGainControl", "mozAutoGainControl"),
              a(b.audio, "noiseSuppression", "mozNoiseSuppression")),
            f(b)
          );
        }),
        c && c.prototype.getSettings)
      ) {
        let b = c.prototype.getSettings;
        c.prototype.getSettings = function () {
          let c = b.apply(this, arguments);
          return (
            a(c, "mozAutoGainControl", "autoGainControl"),
            a(c, "mozNoiseSuppression", "noiseSuppression"),
            c
          );
        };
      }
      if (c && c.prototype.applyConstraints) {
        let b = c.prototype.applyConstraints;
        c.prototype.applyConstraints = function (c) {
          return (
            "audio" === this.kind &&
              "object" == typeof c &&
              ((c = JSON.parse(w(c))),
              a(c, "autoGainControl", "mozAutoGainControl"),
              a(c, "noiseSuppression", "mozNoiseSuppression")),
            b.apply(this, [c])
          );
        };
      }
    }
  }
  function Sg(c) {
    "object" == typeof c &&
      c.RTCTrackEvent &&
      "receiver" in c.RTCTrackEvent.prototype &&
      !("transceiver" in c.RTCTrackEvent.prototype) &&
      ba(c.RTCTrackEvent.prototype, "transceiver", {
        get() {
          return { receiver: this.receiver };
        }
      });
  }
  function Ce(c) {
    let a = Ib(c);
    if (
      "object" == typeof c &&
      (c.RTCPeerConnection || c.mozRTCPeerConnection)
    ) {
      var b;
      (!c.RTCPeerConnection &&
        c.mozRTCPeerConnection &&
        (c.RTCPeerConnection = c.mozRTCPeerConnection),
      53 > a.version) &&
        r(
          (b = [
            "setLocalDescription",
            "setRemoteDescription",
            "addIceCandidate"
          ])
        ).call(b, function (a) {
          let b = c.RTCPeerConnection.prototype[a];
          c.RTCPeerConnection.prototype[a] = {
            [a]() {
              return (
                (arguments[0] = new (
                  "addIceCandidate" === a
                    ? c.RTCIceCandidate
                    : c.RTCSessionDescription
                )(arguments[0])),
                b.apply(this, arguments)
              );
            }
          }[a];
        });
      var d = c.RTCPeerConnection.prototype.addIceCandidate;
      c.RTCPeerConnection.prototype.addIceCandidate = function () {
        return arguments[0]
          ? 68 > a.version && arguments[0] && "" === arguments[0].candidate
            ? u.resolve()
            : d.apply(this, arguments)
          : (arguments[1] && arguments[1].apply(null), u.resolve());
      };
      var e = {
          inboundrtp: "inbound-rtp",
          outboundrtp: "outbound-rtp",
          candidatepair: "candidate-pair",
          localcandidate: "local-candidate",
          remotecandidate: "remote-candidate"
        },
        f = c.RTCPeerConnection.prototype.getStats;
      c.RTCPeerConnection.prototype.getStats = function () {
        let [b, c, d] = arguments;
        return f
          .apply(this, [b || null])
          .then((b) => {
            if (53 > a.version && !c)
              try {
                r(b).call(b, (a) => {
                  a.type = e[a.type] || a.type;
                });
              } catch (T) {
                if ("TypeError" !== T.name) throw T;
                r(b).call(b, (a, c) => {
                  b.set(c, Wa({}, a, { type: e[a.type] || a.type }));
                });
              }
            return b;
          })
          .then(c, d);
      };
    }
  }
  function Tg(c) {
    if (
      "object" == typeof c &&
      c.RTCPeerConnection &&
      c.RTCRtpSender &&
      !(c.RTCRtpSender && "getStats" in c.RTCRtpSender.prototype)
    ) {
      var a = c.RTCPeerConnection.prototype.getSenders;
      a &&
        (c.RTCPeerConnection.prototype.getSenders = function () {
          let b = a.apply(this, []);
          return r(b).call(b, (a) => (a._pc = this)), b;
        });
      var b = c.RTCPeerConnection.prototype.addTrack;
      b &&
        (c.RTCPeerConnection.prototype.addTrack = function () {
          let a = b.apply(this, arguments);
          return (a._pc = this), a;
        });
      c.RTCRtpSender.prototype.getStats = function () {
        return this.track ? this._pc.getStats(this.track) : u.resolve(new Y());
      };
    }
  }
  function Ug(c) {
    if (
      "object" == typeof c &&
      c.RTCPeerConnection &&
      c.RTCRtpSender &&
      !(c.RTCRtpSender && "getStats" in c.RTCRtpReceiver.prototype)
    ) {
      var a = c.RTCPeerConnection.prototype.getReceivers;
      a &&
        (c.RTCPeerConnection.prototype.getReceivers = function () {
          let b = a.apply(this, []);
          return r(b).call(b, (a) => (a._pc = this)), b;
        });
      rc(c, "track", (a) => ((a.receiver._pc = a.srcElement), a));
      c.RTCRtpReceiver.prototype.getStats = function () {
        return this._pc.getStats(this.track);
      };
    }
  }
  function Vg(c) {
    !c.RTCPeerConnection ||
      "removeStream" in c.RTCPeerConnection.prototype ||
      (c.RTCPeerConnection.prototype.removeStream = function (a) {
        var b;
        Ad("removeStream", "removeTrack");
        r((b = this.getSenders())).call(b, (b) => {
          var c;
          b.track &&
            La((c = a.getTracks())).call(c, b.track) &&
            this.removeTrack(b);
        });
      });
  }
  function Wg(c) {
    c.DataChannel && !c.RTCDataChannel && (c.RTCDataChannel = c.DataChannel);
  }
  function Xg(c) {
    if ("object" == typeof c && c.RTCPeerConnection) {
      if (
        ("getLocalStreams" in c.RTCPeerConnection.prototype ||
          (c.RTCPeerConnection.prototype.getLocalStreams = function () {
            return (
              this._localStreams || (this._localStreams = []),
              this._localStreams
            );
          }),
        !("addStream" in c.RTCPeerConnection.prototype))
      ) {
        let a = c.RTCPeerConnection.prototype.addTrack;
        c.RTCPeerConnection.prototype.addStream = function (b) {
          var c, e, f;
          this._localStreams || (this._localStreams = []);
          La((c = this._localStreams)).call(c, b) || this._localStreams.push(b);
          r((e = b.getAudioTracks())).call(e, (c) => a.call(this, c, b));
          r((f = b.getVideoTracks())).call(f, (c) => a.call(this, c, b));
        };
        c.RTCPeerConnection.prototype.addTrack = function (b, c) {
          var d;
          c &&
            (this._localStreams
              ? La((d = this._localStreams)).call(d, c) ||
                this._localStreams.push(c)
              : (this._localStreams = [c]));
          return a.call(this, b, c);
        };
      }
      "removeStream" in c.RTCPeerConnection.prototype ||
        (c.RTCPeerConnection.prototype.removeStream = function (a) {
          var b, c, e;
          this._localStreams || (this._localStreams = []);
          let f = E((b = this._localStreams)).call(b, a);
          if (-1 !== f) {
            Ma((c = this._localStreams)).call(c, f, 1);
            var g = a.getTracks();
            r((e = this.getSenders())).call(e, (a) => {
              La(g).call(g, a.track) && this.removeTrack(a);
            });
          }
        });
    }
  }
  function Yg(c) {
    if (
      "object" == typeof c &&
      c.RTCPeerConnection &&
      ("getRemoteStreams" in c.RTCPeerConnection.prototype ||
        (c.RTCPeerConnection.prototype.getRemoteStreams = function () {
          return this._remoteStreams ? this._remoteStreams : [];
        }),
      !("onaddstream" in c.RTCPeerConnection.prototype))
    ) {
      ba(c.RTCPeerConnection.prototype, "onaddstream", {
        get() {
          return this._onaddstream;
        },
        set(a) {
          this._onaddstream &&
            (this.removeEventListener("addstream", this._onaddstream),
            this.removeEventListener("track", this._onaddstreampoly));
          this.addEventListener("addstream", (this._onaddstream = a));
          this.addEventListener(
            "track",
            (this._onaddstreampoly = (a) => {
              var b;
              r((b = a.streams)).call(b, (a) => {
                var b;
                (this._remoteStreams || (this._remoteStreams = []),
                La((b = this._remoteStreams)).call(b, a)) ||
                  (this._remoteStreams.push(a),
                  (b = new Event("addstream")),
                  (b.stream = a),
                  this.dispatchEvent(b));
              });
            })
          );
        }
      });
      let a = c.RTCPeerConnection.prototype.setRemoteDescription;
      c.RTCPeerConnection.prototype.setRemoteDescription = function () {
        let b = this;
        return (
          this._onaddstreampoly ||
            this.addEventListener(
              "track",
              (this._onaddstreampoly = function (a) {
                var c;
                r((c = a.streams)).call(c, (a) => {
                  var c;
                  (b._remoteStreams || (b._remoteStreams = []),
                  0 <= E((c = b._remoteStreams)).call(c, a)) ||
                    (b._remoteStreams.push(a),
                    (c = new Event("addstream")),
                    (c.stream = a),
                    b.dispatchEvent(c));
                });
              })
            ),
          a.apply(b, arguments)
        );
      };
    }
  }
  function Zg(c) {
    if ("object" == typeof c && c.RTCPeerConnection) {
      c = c.RTCPeerConnection.prototype;
      var a = c.createOffer,
        b = c.createAnswer,
        d = c.setLocalDescription,
        e = c.setRemoteDescription,
        f = c.addIceCandidate;
      c.createOffer = function (b, c) {
        let d = a.apply(this, [
          2 <= arguments.length ? arguments[2] : arguments[0]
        ]);
        return c ? (d.then(b, c), u.resolve()) : d;
      };
      c.createAnswer = function (a, c) {
        let d = b.apply(this, [
          2 <= arguments.length ? arguments[2] : arguments[0]
        ]);
        return c ? (d.then(a, c), u.resolve()) : d;
      };
      var g = function (a, b, c) {
        a = d.apply(this, [a]);
        return c ? (a.then(b, c), u.resolve()) : a;
      };
      c.setLocalDescription = g;
      g = function (a, b, c) {
        a = e.apply(this, [a]);
        return c ? (a.then(b, c), u.resolve()) : a;
      };
      c.setRemoteDescription = g;
      g = function (a, b, c) {
        a = f.apply(this, [a]);
        return c ? (a.then(b, c), u.resolve()) : a;
      };
      c.addIceCandidate = g;
    }
  }
  function $g(c) {
    let a = c && c.navigator;
    if (a.mediaDevices && a.mediaDevices.getUserMedia) {
      var b;
      c = a.mediaDevices;
      let d = ya((b = c.getUserMedia)).call(b, c);
      a.mediaDevices.getUserMedia = (a) => d(ah(a));
    }
    var d;
    !a.getUserMedia &&
      a.mediaDevices &&
      a.mediaDevices.getUserMedia &&
      (a.getUserMedia = ya(
        (d = function (b, c, d) {
          a.mediaDevices.getUserMedia(b).then(c, d);
        })
      ).call(d, a));
  }
  function ah(c) {
    return c && void 0 !== c.video ? Wa({}, c, { video: yg(c.video) }) : c;
  }
  function bh(c) {
    let a = c.RTCPeerConnection;
    c.RTCPeerConnection = function (b, c) {
      if (b && b.iceServers) {
        let a = [];
        for (let c = 0; c < b.iceServers.length; c++) {
          let d = b.iceServers[c];
          !d.hasOwnProperty("urls") && d.hasOwnProperty("url")
            ? (Ad("RTCIceServer.url", "RTCIceServer.urls"),
              (d = JSON.parse(w(d))),
              (d.urls = d.url),
              delete d.url,
              a.push(d))
            : a.push(b.iceServers[c]);
        }
        b.iceServers = a;
      }
      return new a(b, c);
    };
    c.RTCPeerConnection.prototype = a.prototype;
    "generateCertificate" in c.RTCPeerConnection &&
      ba(c.RTCPeerConnection, "generateCertificate", {
        get: () => a.generateCertificate
      });
  }
  function ch(c) {
    "object" == typeof c &&
      c.RTCPeerConnection &&
      "receiver" in c.RTCTrackEvent.prototype &&
      !c.RTCTransceiver &&
      ba(c.RTCTrackEvent.prototype, "transceiver", {
        get() {
          return { receiver: this.receiver };
        }
      });
  }
  function dh(c) {
    let a = c.RTCPeerConnection.prototype.createOffer;
    c.RTCPeerConnection.prototype.createOffer = function (b) {
      if (b) {
        var c, e;
        void 0 !== b.offerToReceiveAudio &&
          (b.offerToReceiveAudio = !!b.offerToReceiveAudio);
        let a = R((c = this.getTransceivers())).call(
          c,
          (a) => "audio" === a.receiver.track.kind
        );
        !1 === b.offerToReceiveAudio && a
          ? "sendrecv" === a.direction
            ? a.setDirection
              ? a.setDirection("sendonly")
              : (a.direction = "sendonly")
            : "recvonly" === a.direction &&
              (a.setDirection
                ? a.setDirection("inactive")
                : (a.direction = "inactive"))
          : !0 !== b.offerToReceiveAudio || a || this.addTransceiver("audio");
        void 0 !== b.offerToReceiveVideo &&
          (b.offerToReceiveVideo = !!b.offerToReceiveVideo);
        c = R((e = this.getTransceivers())).call(
          e,
          (a) => "video" === a.receiver.track.kind
        );
        !1 === b.offerToReceiveVideo && c
          ? "sendrecv" === c.direction
            ? c.setDirection
              ? c.setDirection("sendonly")
              : (c.direction = "sendonly")
            : "recvonly" === c.direction &&
              (c.setDirection
                ? c.setDirection("inactive")
                : (c.direction = "inactive"))
          : !0 !== b.offerToReceiveVideo || c || this.addTransceiver("video");
      }
      return a.apply(this, arguments);
    };
  }
  function Dd(c) {
    if (
      c.RTCIceCandidate &&
      !(c.RTCIceCandidate && "foundation" in c.RTCIceCandidate.prototype)
    ) {
      var a = c.RTCIceCandidate;
      c.RTCIceCandidate = function (b) {
        var c;
        if (
          ("object" == typeof b &&
            b.candidate &&
            0 === E((c = b.candidate)).call(c, "a=") &&
            ((b = JSON.parse(w(b))).candidate = b.candidate.substr(2)),
          b.candidate && b.candidate.length)
        ) {
          c = new a(b);
          b = F.parseCandidate(b.candidate);
          let d = Wa(c, b);
          return (
            (d.toJSON = function () {
              return {
                candidate: d.candidate,
                sdpMid: d.sdpMid,
                sdpMLineIndex: d.sdpMLineIndex,
                usernameFragment: d.usernameFragment
              };
            }),
            d
          );
        }
        return new a(b);
      };
      c.RTCIceCandidate.prototype = a.prototype;
      rc(
        c,
        "icecandidate",
        (a) => (
          a.candidate &&
            ba(a, "candidate", {
              value: new c.RTCIceCandidate(a.candidate),
              writable: "false"
            }),
          a
        )
      );
    }
  }
  function Sc(c) {
    if (c.RTCPeerConnection) {
      var a = Ib(c);
      "sctp" in c.RTCPeerConnection.prototype ||
        ba(c.RTCPeerConnection.prototype, "sctp", {
          get() {
            return void 0 === this._sctp ? null : this._sctp;
          }
        });
      var b = function (a) {
          if (!a || !a.sdp) return !1;
          a = F.splitSections(a.sdp);
          return (
            a.shift(),
            Cg(a).call(a, (a) => {
              var b;
              return (
                (a = F.parseMLine(a)) &&
                "application" === a.kind &&
                -1 !== E((b = a.protocol)).call(b, "SCTP")
              );
            })
          );
        },
        d = function (a) {
          a = a.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
          if (null === a || 2 > a.length) return -1;
          a = S(a[1], 10);
          return a != a ? -1 : a;
        },
        e = function (b) {
          let c = 65536;
          return (
            "firefox" === a.browser &&
              (c =
                57 > a.version
                  ? -1 === b
                    ? 16384
                    : 2147483637
                  : 60 > a.version
                  ? 57 === a.version
                    ? 65535
                    : 65536
                  : 2147483637),
            c
          );
        },
        f = function (b, c) {
          let d = 65536;
          "firefox" === a.browser && 57 === a.version && (d = 65535);
          b = F.matchPrefix(b.sdp, "a=max-message-size:");
          return (
            0 < b.length
              ? (d = S(b[0].substr(19), 10))
              : "firefox" === a.browser && -1 !== c && (d = 2147483637),
            d
          );
        },
        g = c.RTCPeerConnection.prototype.setRemoteDescription;
      c.RTCPeerConnection.prototype.setRemoteDescription = function () {
        if (((this._sctp = null), "chrome" === a.browser && 76 <= a.version)) {
          var { sdpSemantics: c } = this.getConfiguration();
          "plan-b" === c &&
            ba(this, "sctp", {
              get() {
                return void 0 === this._sctp ? null : this._sctp;
              },
              enumerable: !0,
              configurable: !0
            });
        }
        if (b(arguments[0])) {
          var q = d(arguments[0]);
          c = e(q);
          q = f(arguments[0], q);
          let a;
          a =
            0 === c && 0 === q
              ? Number.POSITIVE_INFINITY
              : 0 === c || 0 === q
              ? Math.max(c, q)
              : Math.min(c, q);
          c = {};
          ba(c, "maxMessageSize", { get: () => a });
          this._sctp = c;
        }
        return g.apply(this, arguments);
      };
    }
  }
  function Tc(c) {
    function a(a, b) {
      let c = a.send;
      a.send = function () {
        var d = arguments[0];
        d = d.length || d.size || d.byteLength;
        if ("open" === a.readyState && b.sctp && d > b.sctp.maxMessageSize)
          throw new TypeError(
            "Message too large (can send a maximum of " +
              b.sctp.maxMessageSize +
              " bytes)"
          );
        return c.apply(a, arguments);
      };
    }
    if (
      c.RTCPeerConnection &&
      "createDataChannel" in c.RTCPeerConnection.prototype
    ) {
      var b = c.RTCPeerConnection.prototype.createDataChannel;
      c.RTCPeerConnection.prototype.createDataChannel = function () {
        let c = b.apply(this, arguments);
        return a(c, this), c;
      };
      rc(c, "datachannel", (b) => (a(b.channel, b.target), b));
    }
  }
  function De(c) {
    var a;
    if (
      c.RTCPeerConnection &&
      !("connectionState" in c.RTCPeerConnection.prototype)
    ) {
      var b = c.RTCPeerConnection.prototype;
      ba(b, "connectionState", {
        get() {
          return (
            { completed: "connected", checking: "connecting" }[
              this.iceConnectionState
            ] || this.iceConnectionState
          );
        },
        enumerable: !0,
        configurable: !0
      });
      ba(b, "onconnectionstatechange", {
        get() {
          return this._onconnectionstatechange || null;
        },
        set(a) {
          this._onconnectionstatechange &&
            (this.removeEventListener(
              "connectionstatechange",
              this._onconnectionstatechange
            ),
            delete this._onconnectionstatechange);
          a &&
            this.addEventListener(
              "connectionstatechange",
              (this._onconnectionstatechange = a)
            );
        },
        enumerable: !0,
        configurable: !0
      });
      r((a = ["setLocalDescription", "setRemoteDescription"])).call(a, (a) => {
        let c = b[a];
        b[a] = function () {
          return (
            this._connectionstatechangepoly ||
              ((this._connectionstatechangepoly = (a) => {
                let b = a.target;
                if (b._lastConnectionState !== b.connectionState) {
                  b._lastConnectionState = b.connectionState;
                  let c = new Event("connectionstatechange", a);
                  b.dispatchEvent(c);
                }
                return a;
              }),
              this.addEventListener(
                "iceconnectionstatechange",
                this._connectionstatechangepoly
              )),
            c.apply(this, arguments)
          );
        };
      });
    }
  }
  function Ee(c) {
    if (c.RTCPeerConnection) {
      var a = Ib(c);
      if (!("chrome" === a.browser && 71 <= a.version)) {
        var b = c.RTCPeerConnection.prototype.setRemoteDescription;
        c.RTCPeerConnection.prototype.setRemoteDescription = function (a) {
          var c, d;
          a &&
            a.sdp &&
            -1 !== E((c = a.sdp)).call(c, "\na=extmap-allow-mixed") &&
            (a.sdp = M((d = a.sdp.split("\n")))
              .call(d, (a) => "a=extmap-allow-mixed" !== tc(a).call(a))
              .join("\n"));
          return b.apply(this, arguments);
        };
      }
    }
  }
  function uc(c) {
    return "string" == typeof c ? Wa({}, nl[c]) : c;
  }
  function Fe(c) {
    return "string" == typeof c ? Wa({}, ol[c]) : c;
  }
  function Ed(c) {
    return "string" == typeof c ? Wa({}, pl[c]) : c;
  }
  function vc(c, a) {
    var b;
    La((b = V(C))).call(b, c) && (C[c] = a);
  }
  function wc(c, a, b) {
    return { sampleRate: c, stereo: a, bitrate: b };
  }
  function H(c, a, b, d, e) {
    return { width: c, height: a, frameRate: b, bitrateMin: d, bitrateMax: e };
  }
  function Jb(c, a, b, d, e) {
    return {
      width: { max: c },
      height: { max: a },
      frameRate: b,
      bitrateMin: d,
      bitrateMax: e
    };
  }
  function eh(c) {
    return "[object Array]" === xc.call(c);
  }
  function fh(c) {
    return null !== c && "object" == typeof c;
  }
  function gh(c) {
    return "[object Function]" === xc.call(c);
  }
  function Fd(c, a) {
    if (null != c)
      if (("object" != typeof c && (c = [c]), eh(c)))
        for (var b = 0, d = c.length; b < d; b++) a.call(null, c[b], b, c);
      else
        for (b in c)
          Object.prototype.hasOwnProperty.call(c, b) &&
            a.call(null, c[b], b, c);
  }
  function hh() {
    function c(b, c) {
      "object" == typeof a[c] && "object" == typeof b
        ? (a[c] = hh(a[c], b))
        : (a[c] = b);
    }
    for (var a = {}, b = 0, d = arguments.length; b < d; b++)
      Fd(arguments[b], c);
    return a;
  }
  function Ge() {
    function c(b, c) {
      "object" == typeof a[c] && "object" == typeof b
        ? (a[c] = Ge(a[c], b))
        : (a[c] = "object" == typeof b ? Ge({}, b) : b);
    }
    for (var a = {}, b = 0, d = arguments.length; b < d; b++)
      Fd(arguments[b], c);
    return a;
  }
  function ih(c) {
    return encodeURIComponent(c)
      .replace(/%40/gi, "@")
      .replace(/%3A/gi, ":")
      .replace(/%24/g, "$")
      .replace(/%2C/gi, ",")
      .replace(/%20/g, "+")
      .replace(/%5B/gi, "[")
      .replace(/%5D/gi, "]");
  }
  function Gd() {
    this.handlers = [];
  }
  function jh(c, a) {
    !I.isUndefined(c) &&
      I.isUndefined(c["Content-Type"]) &&
      (c["Content-Type"] = a);
  }
  function Uc(c) {
    this.defaults = c;
    this.interceptors = { request: new kh(), response: new kh() };
  }
  function He(c) {
    this.message = c;
  }
  function Hd(c) {
    if ("function" != typeof c)
      throw new TypeError("executor must be a function.");
    var a;
    this.promise = new Promise(function (b) {
      a = b;
    });
    var b = this;
    c(function (c) {
      b.reason || ((b.reason = new lh(c)), a(b.reason));
    });
  }
  function mh(c) {
    c = new Id(c);
    var a = nh(Id.prototype.request, c);
    return I.extend(a, Id.prototype, c), I.extend(a, c), a;
  }
  function oh() {
    let c = new Date();
    return c.toTimeString().split(" ")[0] + ":" + c.getMilliseconds();
  }
  function ph(c, a) {
    if ("boolean" != typeof c)
      throw new m(
        l.INVALID_PARAMS,
        "Invalid ".concat(a, ": The value is of the boolean type.")
      );
  }
  function Xa(c, a, b) {
    var d;
    if (!La(b).call(b, c))
      throw new m(
        l.INVALID_PARAMS,
        n((d = "".concat(a, " can only be set as "))).call(d, w(b))
      );
  }
  function W(c, a, b = 1, d = 1e4, e = !0) {
    if (c < b || c > d || (e && ("number" != typeof c || 0 != c % 1))) {
      var f, g;
      throw new m(
        l.INVALID_PARAMS,
        n(
          (f = n((g = "invalid ".concat(a, ": the value range is ["))).call(
            g,
            b,
            ", "
          ))
        ).call(f, d, "]. integer only")
      );
    }
  }
  function Ga(c, a, b = 1, d = 255, e = !0) {
    if (null == c)
      throw new m(
        l.INVALID_PARAMS,
        "".concat(a || "param", " cannot be empty")
      );
    var f, g, h;
    if (!qh(c, b, d, e))
      throw new m(
        l.INVALID_PARAMS,
        n(
          (f = n(
            (g = n(
              (h = "Invalid ".concat(
                a || "string param",
                ": Length of the string: ["
              ))
            ).call(h, b, ","))
          ).call(g, d, "]."))
        ).call(f, e ? " ASCII characters only." : "")
      );
  }
  function rh(c, a) {
    if (!cc(c))
      throw new m(l.INVALID_PARAMS, "".concat(a, " should be an array"));
  }
  function Ie(c) {
    if (
      "string" != typeof c ||
      !/^[a-zA-Z0-9 !#\$%&\(\)\+\-:;<=\.>\?@\[\]\^_\{\}\|~,]{1,64}$/.test(c)
    )
      throw (
        (k.error("Invalid Channel Name ".concat(c)),
        new m(
          l.INVALID_PARAMS,
          "The length must be within 64 bytes. The supported characters: a-z,A-Z,0-9,space,!, #, $, %, &, (, ), +, -, :, ;, <, =, ., >, ?, @, [, ], ^, _,  {, }, |, ~, ,"
        ))
      );
  }
  function Je(c) {
    var a;
    if (!(("number" == typeof c && 0 <= c && 4294967295 >= c) || qh(c, 1, 255)))
      throw (
        (k.error(n((a = "Invalid UID ".concat(c, " "))).call(a, typeof c)),
        new m(
          l.INVALID_PARAMS,
          "[String uid] Length of the string: [1,255]. ASCII characters only. [Number uid] The value range is [0,10000]"
        ))
      );
  }
  function qh(c, a = 1, b = 255, d = !0) {
    if ((a = "string" == typeof c && c.length <= b && c.length >= a)) {
      if (!(d = !d))
        a: if ("string" != typeof c) d = !1;
        else {
          for (d = 0; d < c.length; d += 1)
            if (((a = c.charCodeAt(d)), 0 > a || 255 < a)) {
              d = !1;
              break a;
            }
          d = !0;
        }
      a = d;
    }
    return a;
  }
  function Jd() {
    this._listeners = {};
  }
  function sh(c) {
    return (
      "undefined" != typeof Float32Array
        ? (function () {
            function a(a, b, c) {
              f[0] = a;
              b[c] = g[0];
              b[c + 1] = g[1];
              b[c + 2] = g[2];
              b[c + 3] = g[3];
            }
            function b(a, b, c) {
              f[0] = a;
              b[c] = g[3];
              b[c + 1] = g[2];
              b[c + 2] = g[1];
              b[c + 3] = g[0];
            }
            function d(a, b) {
              return (
                (g[0] = a[b]),
                (g[1] = a[b + 1]),
                (g[2] = a[b + 2]),
                (g[3] = a[b + 3]),
                f[0]
              );
            }
            function e(a, b) {
              return (
                (g[3] = a[b]),
                (g[2] = a[b + 1]),
                (g[1] = a[b + 2]),
                (g[0] = a[b + 3]),
                f[0]
              );
            }
            var f = new Float32Array([-0]),
              g = new Uint8Array(f.buffer),
              h = 128 === g[3];
            c.writeFloatLE = h ? a : b;
            c.writeFloatBE = h ? b : a;
            c.readFloatLE = h ? d : e;
            c.readFloatBE = h ? e : d;
          })()
        : (function () {
            function a(a, b, c, g) {
              var d = 0 > b ? 1 : 0;
              if ((d && (b = -b), 0 === b)) a(0 < 1 / b ? 0 : 2147483648, c, g);
              else if (isNaN(b)) a(2143289344, c, g);
              else if (3.4028234663852886e38 < b)
                a(((d << 31) | 2139095040) >>> 0, c, g);
              else if (1.1754943508222875e-38 > b)
                a(
                  ((d << 31) | Math.round(b / 1.401298464324817e-45)) >>> 0,
                  c,
                  g
                );
              else {
                var e = Math.floor(Math.log(b) / Math.LN2);
                a(
                  ((d << 31) |
                    ((e + 127) << 23) |
                    (8388607 & Math.round(b * Math.pow(2, -e) * 8388608))) >>>
                    0,
                  c,
                  g
                );
              }
            }
            function b(a, b, c) {
              c = a(b, c);
              a = 2 * (c >> 31) + 1;
              b = (c >>> 23) & 255;
              c &= 8388607;
              return 255 === b
                ? c
                  ? NaN
                  : (1 / 0) * a
                : 0 === b
                ? 1.401298464324817e-45 * a * c
                : a * Math.pow(2, b - 150) * (c + 8388608);
            }
            c.writeFloatLE = a.bind(null, th);
            c.writeFloatBE = a.bind(null, uh);
            c.readFloatLE = b.bind(null, vh);
            c.readFloatBE = b.bind(null, wh);
          })(),
      "undefined" != typeof Float64Array
        ? (function () {
            function a(a, b, c) {
              f[0] = a;
              b[c] = g[0];
              b[c + 1] = g[1];
              b[c + 2] = g[2];
              b[c + 3] = g[3];
              b[c + 4] = g[4];
              b[c + 5] = g[5];
              b[c + 6] = g[6];
              b[c + 7] = g[7];
            }
            function b(a, b, c) {
              f[0] = a;
              b[c] = g[7];
              b[c + 1] = g[6];
              b[c + 2] = g[5];
              b[c + 3] = g[4];
              b[c + 4] = g[3];
              b[c + 5] = g[2];
              b[c + 6] = g[1];
              b[c + 7] = g[0];
            }
            function d(a, b) {
              return (
                (g[0] = a[b]),
                (g[1] = a[b + 1]),
                (g[2] = a[b + 2]),
                (g[3] = a[b + 3]),
                (g[4] = a[b + 4]),
                (g[5] = a[b + 5]),
                (g[6] = a[b + 6]),
                (g[7] = a[b + 7]),
                f[0]
              );
            }
            function e(a, b) {
              return (
                (g[7] = a[b]),
                (g[6] = a[b + 1]),
                (g[5] = a[b + 2]),
                (g[4] = a[b + 3]),
                (g[3] = a[b + 4]),
                (g[2] = a[b + 5]),
                (g[1] = a[b + 6]),
                (g[0] = a[b + 7]),
                f[0]
              );
            }
            var f = new Float64Array([-0]),
              g = new Uint8Array(f.buffer),
              h = 128 === g[7];
            c.writeDoubleLE = h ? a : b;
            c.writeDoubleBE = h ? b : a;
            c.readDoubleLE = h ? d : e;
            c.readDoubleBE = h ? e : d;
          })()
        : (function () {
            function a(a, b, c, g, h, q) {
              var d = 0 > g ? 1 : 0;
              if ((d && (g = -g), 0 === g))
                a(0, h, q + b), a(0 < 1 / g ? 0 : 2147483648, h, q + c);
              else if (isNaN(g)) a(0, h, q + b), a(2146959360, h, q + c);
              else if (1.7976931348623157e308 < g)
                a(0, h, q + b), a(((d << 31) | 2146435072) >>> 0, h, q + c);
              else if (2.2250738585072014e-308 > g)
                a((g /= 4.9e-324) >>> 0, h, q + b),
                  a(((d << 31) | (g / 4294967296)) >>> 0, h, q + c);
              else {
                var e = Math.floor(Math.log(g) / Math.LN2);
                1024 === e && (e = 1023);
                a((4503599627370496 * (g *= Math.pow(2, -e))) >>> 0, h, q + b);
                a(
                  ((d << 31) |
                    ((e + 1023) << 20) |
                    ((1048576 * g) & 1048575)) >>>
                    0,
                  h,
                  q + c
                );
              }
            }
            function b(a, b, c, g, h) {
              b = a(g, h + b);
              g = a(g, h + c);
              a = 2 * (g >> 31) + 1;
              c = (g >>> 20) & 2047;
              b = 4294967296 * (1048575 & g) + b;
              return 2047 === c
                ? b
                  ? NaN
                  : (1 / 0) * a
                : 0 === c
                ? 4.9e-324 * a * b
                : a * Math.pow(2, c - 1075) * (b + 4503599627370496);
            }
            c.writeDoubleLE = a.bind(null, th, 0, 4);
            c.writeDoubleBE = a.bind(null, uh, 4, 0);
            c.readDoubleLE = b.bind(null, vh, 0, 4);
            c.readDoubleBE = b.bind(null, wh, 4, 0);
          })(),
      c
    );
  }
  function th(c, a, b) {
    a[b] = 255 & c;
    a[b + 1] = (c >>> 8) & 255;
    a[b + 2] = (c >>> 16) & 255;
    a[b + 3] = c >>> 24;
  }
  function uh(c, a, b) {
    a[b] = c >>> 24;
    a[b + 1] = (c >>> 16) & 255;
    a[b + 2] = (c >>> 8) & 255;
    a[b + 3] = 255 & c;
  }
  function vh(c, a) {
    return (c[a] | (c[a + 1] << 8) | (c[a + 2] << 16) | (c[a + 3] << 24)) >>> 0;
  }
  function wh(c, a) {
    return ((c[a] << 24) | (c[a + 1] << 16) | (c[a + 2] << 8) | c[a + 3]) >>> 0;
  }
  function za(c, a) {
    this.lo = c >>> 0;
    this.hi = a >>> 0;
  }
  function Vc(c, a, b) {
    this.fn = c;
    this.len = a;
    this.next = void 0;
    this.val = b;
  }
  function Ke() {}
  function ql(c) {
    this.head = c.head;
    this.tail = c.tail;
    this.len = c.len;
    this.next = c.states;
  }
  function Z() {
    this.len = 0;
    this.tail = this.head = new Vc(Ke, 0, 0);
    this.states = null;
  }
  function Le(c, a, b) {
    a[b] = 255 & c;
  }
  function Me(c, a) {
    this.len = c;
    this.next = void 0;
    this.val = a;
  }
  function Ne(c, a, b) {
    for (; c.hi; )
      (a[b++] = (127 & c.lo) | 128),
        (c.lo = ((c.lo >>> 7) | (c.hi << 25)) >>> 0),
        (c.hi >>>= 7);
    for (; 127 < c.lo; ) (a[b++] = (127 & c.lo) | 128), (c.lo >>>= 7);
    a[b++] = c.lo;
  }
  function Oe(c, a, b) {
    a[b] = 255 & c;
    a[b + 1] = (c >>> 8) & 255;
    a[b + 2] = (c >>> 16) & 255;
    a[b + 3] = c >>> 24;
  }
  function yb() {
    Pe.call(this);
  }
  function rl(c, a, b) {
    40 > c.length
      ? N.utf8.write(c, a, b)
      : a.utf8Write
      ? a.utf8Write(c, b)
      : a.write(c, b);
  }
  function lb(c, a) {
    return RangeError(
      "index out of range: " + c.pos + " + " + (a || 1) + " > " + c.len
    );
  }
  function ra(c) {
    this.buf = c;
    this.pos = 0;
    this.len = c.length;
  }
  function Qe() {
    var c = new xh(0, 0),
      a = 0;
    if (!(4 < this.len - this.pos)) {
      for (; 3 > a; ++a) {
        if (this.pos >= this.len) throw lb(this);
        if (
          ((c.lo = (c.lo | ((127 & this.buf[this.pos]) << (7 * a))) >>> 0),
          128 > this.buf[this.pos++])
        )
          return c;
      }
      return (
        (c.lo = (c.lo | ((127 & this.buf[this.pos++]) << (7 * a))) >>> 0), c
      );
    }
    for (; 4 > a; ++a)
      if (
        ((c.lo = (c.lo | ((127 & this.buf[this.pos]) << (7 * a))) >>> 0),
        128 > this.buf[this.pos++])
      )
        return c;
    if (
      ((c.lo = (c.lo | ((127 & this.buf[this.pos]) << 28)) >>> 0),
      (c.hi = (c.hi | ((127 & this.buf[this.pos]) >> 4)) >>> 0),
      128 > this.buf[this.pos++])
    )
      return c;
    if (((a = 0), 4 < this.len - this.pos))
      for (; 5 > a; ++a) {
        if (
          ((c.hi = (c.hi | ((127 & this.buf[this.pos]) << (7 * a + 3))) >>> 0),
          128 > this.buf[this.pos++])
        )
          return c;
      }
    else
      for (; 5 > a; ++a) {
        if (this.pos >= this.len) throw lb(this);
        if (
          ((c.hi = (c.hi | ((127 & this.buf[this.pos]) << (7 * a + 3))) >>> 0),
          128 > this.buf[this.pos++])
        )
          return c;
      }
    throw Error("invalid varint encoding");
  }
  function Kd(c, a) {
    return (
      (c[a - 4] | (c[a - 3] << 8) | (c[a - 2] << 16) | (c[a - 1] << 24)) >>> 0
    );
  }
  function yh() {
    if (this.pos + 8 > this.len) throw lb(this, 8);
    return new xh(Kd(this.buf, (this.pos += 4)), Kd(this.buf, (this.pos += 4)));
  }
  function dc(c) {
    Re.call(this, c);
  }
  function Wc(c, a, b) {
    if ("function" != typeof c) throw TypeError("rpcImpl must be a function");
    N.EventEmitter.call(this);
    this.rpcImpl = c;
    this.requestDelimited = !!a;
    this.responseDelimited = !!b;
  }
  function sl(c) {
    return (
      Ga(c.reportId, "params.reportId", 0, 100, !1),
      Ga(c.category, "params.category", 0, 100, !1),
      Ga(c.event, "params.event", 0, 100, !1),
      Ga(c.label, "params.label", 0, 100, !1),
      W(c.value, "params.value", -9007199254740991, 9007199254740991, !1),
      !0
    );
  }
  function zh(c) {
    return (
      W(c.timeout, "config.timeout", 0, 1e5),
      W(c.timeoutFactor, "config.timeoutFactor", 0, 100, !1),
      W(c.maxRetryCount, "config.maxRetryConfig", 0, 1 / 0),
      W(c.maxRetryTimeout, "config.maxRetryTimeout", 0, 1 / 0),
      !0
    );
  }
  function Ah(c) {
    return (
      Ga(c.turnServerURL, "turnServerURL"),
      Ga(c.username, "username"),
      Ga(c.password, "password"),
      W(c.udpport, "udpport", 1, 99999, !0),
      c.forceturn && ph(c.forceturn, "forceturn"),
      c.tcpport && W(c.tcpport, "tcpport", 1, 99999, !0),
      !0
    );
  }
  function Se(c, a) {
    Ga(c.url, "".concat(a, ".url"), 1, 1e3, !1);
    null == c.x || W(c.x, "".concat(a, ".x"), 0, 1e4);
    null == c.y || W(c.y, "".concat(a, ".y"), 0, 1e4);
    null == c.width || W(c.width, "".concat(a, ".width"), 0, 1e4);
    null == c.height || W(c.height, "".concat(a, ".height"), 0, 1e4);
    null == c.zOrder || W(c.zOrder, "".concat(a, ".zOrder"), 0, 255);
    null == c.alpha || W(c.alpha, "".concat(a, ".alpha"), 0, 1, !1);
  }
  function tl(c) {
    var a, b;
    (null == c.width || W(c.width, "config.width", 0, 1e4),
    null == c.height || W(c.height, "config.height", 0, 1e4),
    null == c.videoBitrate || W(c.videoBitrate, "config.videoBitrate", 1, 1e6),
    null == c.videoFrameRate || W(c.videoFrameRate, "config.videoFrameRate"),
    null == c.lowLatency || ph(c.lowLatency, "config.lowLatency"),
    null == c.audioSampleRate ||
      Xa(c.audioSampleRate, "config.audioSampleRate", [32e3, 44100, 48e3]),
    null == c.audioBitrate || W(c.audioBitrate, "config.audioBitrate", 1, 128),
    null == c.audioChannels ||
      Xa(c.audioChannels, "config.audioChannels", [1, 2, 3, 4, 5]),
    null == c.videoGop || W(c.videoGop, "config.videoGop"),
    null == c.videoCodecProfile ||
      Xa(c.videoCodecProfile, "config.videoCodecProfile", [66, 77, 100]),
    null == c.userCount || W(c.userCount, "config.userCount", 0, 17),
    null == c.backgroundColor ||
      W(c.backgroundColor, "config.backgroundColor", 0, 16777215),
    null == c.userConfigExtraInfo ||
      Ga(c.userConfigExtraInfo, "config.userConfigExtraInfo", 0, 4096, !1),
    c.transcodingUsers && null != c.transcodingUsers) &&
      (rh(c.transcodingUsers, "config.transcodingUsers"),
      r((a = c.transcodingUsers)).call(a, (a, b) => {
        Je(a.uid);
        null == a.x || W(a.x, "transcodingUser[".concat(b, "].x"), 0, 1e4);
        null == a.y || W(a.y, "transcodingUser[".concat(b, "].y"), 0, 1e4);
        null == a.width ||
          W(a.width, "transcodingUser[".concat(b, "].width"), 0, 1e4);
        null == a.height ||
          W(a.height, "transcodingUser[".concat(b, "].height"), 0, 1e4);
        null == a.zOrder ||
          W(a.zOrder - 1, "transcodingUser[".concat(b, "].zOrder"), 0, 100);
        null == a.alpha ||
          W(a.alpha, "transcodingUser[".concat(b, "].alpha"), 0, 1, !1);
      }));
    (null == c.watermark || Se(c.watermark, "watermark"),
    null == c.backgroundImage || Se(c.backgroundImage, "backgroundImage"),
    c.images && null != c.images) &&
      (rh(c.images, "config.images"),
      r((b = c.images)).call(b, (a, b) => {
        Se(a, "images[".concat(b, "]"));
      }));
    return !0;
  }
  function Bh(c) {
    if (!c.channelName)
      throw new m(l.INVALID_PARAMS, "invalid channelName in info");
    if (!c.uid || "number" != typeof c.uid)
      throw new m(
        l.INVALID_PARAMS,
        "invalid uid in info, uid must be a number"
      );
    return (
      c.token && Ga(c.token, "info.token", 1, 2047),
      Je(c.uid),
      Ie(c.channelName),
      !0
    );
  }
  function Ch(c) {
    return Xa(c, "mediaSource", ["screen", "window", "application"]), !0;
  }
  function va(c) {
    var a, b, d, e;
    c = c || navigator.userAgent;
    let f =
      c.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) ||
      [];
    if ("Chrome" === f[1]) {
      var g = c.match(/(OPR(?=\/))\/?(\d+)/i);
      null !== g && (f = g);
    }
    "Safari" === f[1] &&
      ((g = c.match(/version\/(\d+)/i)), null !== g && (f[2] = g[1]));
    -1 !== E((a = c.toLowerCase())).call(a, "qqbrowser") &&
      ((a = c.match(/(qqbrowser(?=\/))\/?(\d+)/i)), null !== a && (f = a));
    -1 !== E((b = c.toLowerCase())).call(b, "micromessenger") &&
      ((b = c.match(/(micromessenger(?=\/))\/?(\d+)/i)), null !== b && (f = b));
    -1 !== E((d = c.toLowerCase())).call(d, "edge") &&
      ((d = c.match(/(edge(?=\/))\/?(\d+)/i)), null !== d && (f = d));
    -1 !== E((e = c.toLowerCase())).call(e, "trident") &&
      ((e = /\brv[ :]+(\d+)/g.exec(c) || []),
      null !== e && (f = ["", "IE", e[1]]));
    e = null;
    d = [
      { s: aa.WIN_10, r: /(Windows 10.0|Windows NT 10.0)/ },
      { s: aa.WIN_81, r: /(Windows 8.1|Windows NT 6.3)/ },
      { s: aa.WIN_8, r: /(Windows 8|Windows NT 6.2)/ },
      { s: aa.WIN_7, r: /(Windows 7|Windows NT 6.1)/ },
      { s: aa.WIN_VISTA, r: /Windows NT 6.0/ },
      { s: aa.WIN_SERVER_2003, r: /Windows NT 5.2/ },
      { s: aa.WIN_XP, r: /(Windows NT 5.1|Windows XP)/ },
      { s: aa.WIN_2000, r: /(Windows NT 5.0|Windows 2000)/ },
      { s: aa.ANDROID, r: /Android/ },
      { s: aa.OPEN_BSD, r: /OpenBSD/ },
      { s: aa.SUN_OS, r: /SunOS/ },
      { s: aa.LINUX, r: /(Linux|X11)/ },
      { s: aa.IOS, r: /(iPhone|iPad|iPod)/ },
      { s: aa.MAC_OS_X, r: /Mac OS X/ },
      { s: aa.MAC_OS, r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
      { s: aa.QNX, r: /QNX/ },
      { s: aa.UNIX, r: /UNIX/ },
      { s: aa.BEOS, r: /BeOS/ },
      { s: aa.OS_2, r: /OS\/2/ },
      {
        s: aa.SEARCH_BOT,
        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
      }
    ];
    for (let a in d)
      if (((b = d[a]), b.r.test(c))) {
        e = b.s;
        break;
      }
    return { name: f[1], version: f[2], os: e };
  }
  function Xc() {
    return va().name === da.CHROME;
  }
  function Dh() {
    return window.navigator.appVersion &&
    null !== window.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./) &&
    35 >= window.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./)[1];
  }
  function Te() {
    let c = va();
    return c.name === da.EDGE || c.name === da.SAFARI
      ? !1
      : !!navigator.userAgent.toLocaleLowerCase().match(/chrome\/[\d]./i);
  }
  function Eh(c, a) {
    var b = V(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = M(d).call(d, function (a) {
          return ca(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function Ub(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = Eh(Object(d), !0))).call(b, function (a) {
          Pa(c, a, d[a]);
        });
      else if (ja) Qa(c, ja(d));
      else {
        var e;
        r((e = Eh(Object(d)))).call(e, function (a) {
          ba(c, a, ca(d, a));
        });
      }
    }
    return c;
  }
  function ul(c) {
    if (!c.address || !c.tcp)
      throw new m(l.UNEXPECTED_RESPONSE, "Invalid address format ".concat(c));
    return c.address.match(/^[\.:\d]+$/)
      ? "".concat(c.address.replace(/[^\d]/g, "-"), ".edge.agora.io")
      : (k.info(
          "Cannot recognized as IP address ".concat(
            c.address,
            ". Used As Host instead"
          )
        ),
        n((a = "".concat(c.address, ":"))).call(a, c.tcp));
    var a;
  }
  function vl(c, a) {
    var b;
    let d = [".agora.io", ".agoraio.cn"],
      e = -1 !== E(a).call(a, d[1]) ? 1 : 0;
    c.addresses = c.addresses || [];
    return {
      gatewayAddrs: D((b = c.addresses)).call(b, (a) => {
        var b, c, f;
        return a.ip.match(/^[\.:\d]+$/)
          ? n(
              (b = n(
                (c = "".concat(a.ip.replace(/[^\d]/g, "-"), ".edge"))
              ).call(c, d[e++ % d.length], ":"))
            ).call(b, a.port)
          : (k.info(
              "Cannot recognized as IP address ".concat(
                a.ip,
                ". Used As Host instead"
              )
            ),
            n((f = "".concat(a.ip, ":"))).call(f, a.port));
      }),
      uid: c.uid,
      cid: c.cid,
      vid: c.detail && c.detail[8],
      uni_lbs_ip: c.detail && c.detail[1],
      res: c
    };
  }
  function wl(c, a) {
    var b;
    return {
      addressList: D((b = c.servers)).call(b, (b, c) => {
        var d, e, h;
        return n(
          (d = n(
            (e = n(
              (h = "wss://".concat(b.address.replace(/\./g, "-"), ".edge."))
            ).call(h, 0 == c % 2 ? "agora.io" : "agoraio.cn", ":"))
          ).call(e, b.wss, "?serviceName="))
        ).call(d, encodeURIComponent(a));
      }),
      workerToken: c.workerToken,
      vid: c.vid
    };
  }
  function zb(c) {
    return "number" == typeof c ? c : c.exact || c.ideal || c.max || c.min || 0;
  }
  function xl(c) {
    var a;
    c = c._encoderConfig;
    if (!c) return {};
    let b = {
      resolution:
        c.width && c.height
          ? n((a = "".concat(zb(c.width), "x"))).call(a, zb(c.height))
          : void 0,
      maxVideoBW: c.bitrateMax,
      minVideoBW: c.bitrateMin
    };
    return (
      "number" == typeof c.frameRate
        ? ((b.maxFrameRate = c.frameRate), (b.minFrameRate = c.frameRate))
        : c.frameRate &&
          ((b.maxFrameRate =
            c.frameRate.max ||
            c.frameRate.ideal ||
            c.frameRate.exact ||
            c.frameRate.min),
          (b.minFrameRate =
            c.frameRate.min ||
            c.frameRate.ideal ||
            c.frameRate.exact ||
            c.frameRate.max)),
      b
    );
  }
  function yl(c) {
    let a = {
      id: "bweforvideo",
      timestamp: new Date(c.timestamp).toISOString(),
      type: "VideoBwe"
    };
    return (
      c.bitrate.retransmit && (a.A_rb = c.bitrate.retransmit.toString()),
      c.bitrate.targetEncoded && (a.A_teb = c.bitrate.targetEncoded.toString()),
      (a.A_aeb = c.bitrate.actualEncoded.toString()),
      (a.A_tb = c.bitrate.transmit.toString()),
      void 0 !== c.sendBandwidth && (a.A_asb = c.sendBandwidth.toString()),
      a
    );
  }
  function Fh(c, a) {
    let b = c.videoSend[0];
    if (!b) return null;
    a = a && a.videoSend[0] ? a.videoSend[0].inputFrame : void 0;
    c = {
      id: na(10, ""),
      timestamp: new Date(c.timestamp).toISOString(),
      mediaType: "video",
      type: "ssrc",
      ssrc: b.ssrc.toString()
    };
    return (
      b.inputFrame &&
        ((a && b.inputFrame.height === a.height) ||
          (c.A_fhi = b.inputFrame.height
            ? b.inputFrame.height.toString()
            : "0"),
        (a && b.inputFrame.width === a.width) ||
          (c.A_fwi = b.inputFrame.width ? b.inputFrame.width.toString() : "0"),
        (a && b.inputFrame.frameRate === a.frameRate) ||
          (c.A_fri = b.inputFrame.frameRate
            ? b.inputFrame.frameRate.toString()
            : "0")),
      c
    );
  }
  function zl(c, a) {
    let b = c.videoSend[0];
    if (!b) return null;
    c = {
      id: na(10, ""),
      timestamp: new Date(c.timestamp).toISOString(),
      mediaType: "video",
      type: "ssrc",
      ssrc: b.ssrc.toString()
    };
    switch (
      ((c.A_vstd =
        a._originMediaStreamTrack.enabled && a._mediaStreamTrack.enabled
          ? "0"
          : "1"),
      b.sentFrame &&
        ((c.A_fhs = b.sentFrame.height.toString()),
        (c.A_frs = b.sentFrame.frameRate.toString()),
        (c.A_fws = b.sentFrame.width.toString())),
      b.adaptionChangeReason)
    ) {
      case "none":
        c.A_ac = "0";
        break;
      case "cpu":
        c.A_ac = "1";
        break;
      case "bandwidth":
        c.A_ac = "2";
        break;
      case "other":
        c.A_ac = "3";
    }
    return (
      (c.A_nr = b.nacksCount.toString()),
      b.avgEncodeMs && (c.A_aem = b.avgEncodeMs.toFixed(0).toString()),
      c
    );
  }
  function Al(c, a) {
    let b = c.audioSend[0];
    if (!b) return null;
    c = {
      id: na(10, ""),
      timestamp: new Date(c.timestamp).toISOString(),
      mediaType: "audio",
      type: "ssrc",
      ssrc: b.ssrc.toString()
    };
    return (
      (c.A_astd =
        a._originMediaStreamTrack.enabled && a._mediaStreamTrack.enabled
          ? "0"
          : "1"),
      b.inputLevel
        ? (c.A_ail = Math.round(100 * b.inputLevel).toString())
        : (c.A_ail = Math.round(100 * a._source.getAudioAvgLevel()).toString()),
      (c.A_apil = Math.round(100 * a._source.getAudioAvgLevel()).toString()),
      c
    );
  }
  function Bl(c, a) {
    let b = c.videoRecv[0];
    if (!b) return null;
    c = {
      id: na(10, ""),
      timestamp: new Date(c.timestamp).toISOString(),
      mediaType: "video",
      type: "ssrc",
      ssrc: b.ssrc.toString()
    };
    var d;
    ((c.bytesReceived = b.bytes.toString()),
    (c.packetsLost = b.packetsLost.toString()),
    (c.packetsReceived = b.packets.toString()),
    b.framesRateFirefox && (c.A_frr = b.framesRateFirefox.toString()),
    b.receivedFrame && (c.A_frr = b.receivedFrame.frameRate.toString()),
    (c.A_frd = b.decodeFrameRate.toString()),
    b.outputFrame && (c.A_fro = b.outputFrame.frameRate.toString()),
    void 0 !== b.jitterBufferMs && (c.A_jbm = b.jitterBufferMs.toString()),
    void 0 !== b.currentDelayMs && (c.A_cdm = b.currentDelayMs.toString()),
    (c.A_fs = b.firsCount.toString()),
    (c.A_ns = b.nacksCount.toString()),
    (c.A_ps = b.plisCount.toString()),
    a &&
      (c.A_vrtd =
        a._originMediaStreamTrack.enabled && a._mediaStreamTrack.enabled
          ? "0"
          : "1"),
    a._player && 0 < a._player.freezeTimeCounterList.length) &&
      (c.A_vrft = Ma((d = a._player.freezeTimeCounterList))
        .call(d, 0, 1)[0]
        .toString());
    return c;
  }
  function Cl(c, a) {
    let b = c.audioRecv[0];
    if (!b) return null;
    c = {
      id: na(10, ""),
      timestamp: new Date(c.timestamp).toISOString(),
      mediaType: "audio",
      type: "ssrc",
      ssrc: b.ssrc.toString()
    };
    return (
      (c.bytesReceived = b.bytes.toString()),
      (c.packetsLost = b.packetsLost.toString()),
      (c.packetsReceived = b.packets.toString()),
      b.outputLevel
        ? (c.A_aol = Math.round(100 * b.outputLevel).toString())
        : (c.A_aol = Math.round(100 * a._source.getAudioAvgLevel()).toString()),
      (c.A_apol = Math.round(100 * a._source.getAudioAvgLevel()).toString()),
      a &&
        (c.A_artd =
          a._originMediaStreamTrack.enabled && a._mediaStreamTrack.enabled
            ? "0"
            : "1"),
      (c.A_jr = b.jitterMs.toString()),
      (c.A_jbm = b.jitterBufferMs.toString()),
      (c.A_cdm = b.jitterBufferMs.toString()),
      c
    );
  }
  function Dl(c) {
    return (c = c.videoSend[0])
      ? {
          mediaType: "video",
          isVideoMute: !1,
          frameRateInput: c.inputFrame && c.inputFrame.frameRate.toString(),
          frameRateSent: c.sentFrame && c.sentFrame.frameRate.toString(),
          googRtt: c.rttMs.toString()
        }
      : null;
  }
  function El(c, a, b, d) {
    c = c.videoRecv[0];
    if (!c) return null;
    b = Yc.isRemoteVideoFreeze(d, c, b ? b.videoRecv[0] : void 0);
    a = {
      mediaType: "video",
      isVideoMute: !1,
      peerId: a,
      frameRateReceived:
        c.receivedFrame && c.receivedFrame.frameRate.toString(),
      frameRateDecoded: c.decodedFrame && c.decodedFrame.frameRate.toString(),
      isFreeze: b,
      bytesReceived: c.bytes.toString(),
      packetsReceived: c.packets.toString(),
      packetsLost: c.packetsLost.toString()
    };
    return (
      c.framesRateFirefox &&
        ((a.frameRateDecoded = c.framesRateFirefox.toString()),
        (a.frameRateReceived = c.framesRateFirefox.toString())),
      a
    );
  }
  function Fl(c, a, b) {
    c = c.audioRecv[0];
    if (!c) return null;
    b = Yc.isRemoteAudioFreeze(b);
    return {
      mediaType: "audio",
      isAudioMute: !1,
      peerId: a,
      googJitterReceived: c.jitterBufferMs.toString(),
      isFreeze: b,
      bytesReceived: c.bytes.toString(),
      packetsReceived: c.packets.toString(),
      packetsLost: c.packetsLost.toString(),
      frameReceived: c.receivedFrames.toString(),
      frameDropped: c.droppedFrames.toString()
    };
  }
  function Gh(c) {
    return 0 <= c && 0.17 > c
      ? 1
      : 0.17 <= c && 0.36 > c
      ? 2
      : 0.36 <= c && 0.59 > c
      ? 3
      : 0.59 <= c && 1 >= c
      ? 4
      : 1 < c
      ? 5
      : 0;
  }
  function Hh(c, a) {
    var b = V(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = M(d).call(d, function (a) {
          return ca(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function Ue(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = Hh(Object(d), !0))).call(b, function (a) {
          Pa(c, a, d[a]);
        });
      else if (ja) Qa(c, ja(d));
      else {
        var e;
        r((e = Hh(Object(d)))).call(e, function (a) {
          ba(c, a, ca(d, a));
        });
      }
    }
    return c;
  }
  function Ld(c) {
    return window.TextEncoder ? new TextEncoder().encode(c).length : c.length;
  }
  function Gl(c, a, b) {
    let d = c[a];
    if (!d || "string" != typeof d) return [c];
    c[a] = "";
    let e = Ld(w(c)),
      f = 0,
      g = [],
      h = 0;
    for (let q = 0; q < d.length; q++)
      (h += 127 >= d.charCodeAt(q) ? 1 : 3),
        h <= b - e ||
          ((g[g.length] = Ue({}, c, { [a]: d.substring(f, q) })),
          (f = q),
          (h = 127 >= d.charCodeAt(q) ? 1 : 3));
    return (
      f !== d.length - 1 && (g[g.length] = Ue({}, c, { [a]: d.substring(f) })),
      g
    );
  }
  function Hl() {
    return new u((c) => {
      document.body ? c() : window.addEventListener("load", () => c());
    });
  }
  function Ab(c) {
    return new u((a) => {
      window.setTimeout(a, c);
    });
  }
  function Il(c) {
    let a = new m(l.TIMEOUT, "timeout");
    return new u((b, d) => {
      window.setTimeout(() => d(a), c);
    });
  }
  function na(c = 7, a) {
    var b, d;
    let e = Math.random().toString(16).substr(2, c).toLowerCase();
    return e.length === c
      ? n((b = "".concat(a))).call(b, e)
      : n((d = "".concat(a))).call(d, e) + na(c - e.length, "");
  }
  function Zc(c) {
    return new u((a, b) => {
      let d = document.createElement("video");
      d.setAttribute("autoplay", "");
      d.setAttribute("muted", "");
      d.muted = !0;
      d.autoplay = !0;
      d.setAttribute("playsinline", "");
      d.setAttribute(
        "style",
        "position: absolute; top: 0; left: 0; width: 1px; height: 1px"
      );
      document.body.appendChild(d);
      d.addEventListener("playing", () => {
        (!d.videoWidth && va().name === da.FIREFOX) ||
          (a([d.videoWidth, d.videoHeight]), document.body.removeChild(d));
      });
      d.srcObject = new MediaStream([c]);
    });
  }
  function $c(c) {
    return u
      .all(
        D(c).call(c, (a) =>
          a.then(
            (a) => {
              throw a;
            },
            (a) => a
          )
        )
      )
      .then(
        (a) => {
          throw a;
        },
        (a) => a
      );
  }
  function Ha(c, a, ...b) {
    return 0 === c.getListeners(a).length
      ? u.reject(new m(l.UNEXPECTED_ERROR, "can not emit promise"))
      : new u((d, e) => {
          c.emit(a, ...b, d, e);
        });
  }
  function Ya(c, a, ...b) {
    return 0 === c.getListeners(a).length ? u.resolve() : Ha(c, a, ...b);
  }
  function ec(c, a, ...b) {
    return 0 === c.getListeners(a).length ? null : ad(c, a, ...b);
  }
  function ad(c, a, ...b) {
    let d = null,
      e = null;
    if (
      (c.emit(
        a,
        ...b,
        (a) => {
          d = a;
        },
        (a) => {
          e = a;
        }
      ),
      null !== e)
    )
      throw e;
    if (null === d) throw new m(l.UNEXPECTED_ERROR, "handler is not sync");
    return d;
  }
  function bd(c, a) {
    a = E(c).call(c, a);
    -1 !== a && Ma(c).call(c, a, 1);
  }
  function Ih(c) {
    let a = [];
    return (
      r(c).call(c, (b) => {
        -1 === E(a).call(a, b) && a.push(b);
      }),
      a
    );
  }
  function Za(c) {
    u.resolve().then(c);
  }
  function Jl(c, a) {
    if (c.length !== a.length) return !1;
    for (let b = 0; b < c.length; b += 1) {
      let d = c[b];
      if (
        M(c).call(c, (a) => a === d).length !==
        M(a).call(a, (a) => a === d).length
      )
        return !1;
    }
    return !0;
  }
  function cd(c, a) {
    Jh[a] || ((Jh[a] = !0), c());
  }
  function Kl(c) {
    let a = "";
    for (let b = 0; b < c.length; b += 1) a += String.fromCharCode(c[b]);
    return window.btoa(a);
  }
  function Ll(c, a) {
    var b, d, e, f, g;
    if ("motion" === c)
      return (
        k.debug(
          n(
            (f = n(
              (g = "adjust bitrate for motion, (".concat(a.bitrateMax, ", "))
            ).call(g, a.bitrateMin, "}) -> ("))
          ).call(f, a.bitrateMax, ", undefined)")
        ),
        { max: a.bitrateMax }
      );
    if (!a.width || !a.height) return { max: a.bitrateMax, min: a.bitrateMin };
    c = zb(a.width) * zb(a.height);
    f = Math.max(0.25, 0.1 + 0.03 * zb(a.frameRate || 20));
    if (19200 > c) return {};
    if (76800 > c) g = dd[0];
    else if (307200 > c) g = dd[1];
    else if (921600 > c) g = dd[2];
    else if (2073600 > c) g = dd[3];
    else {
      if (!(8294400 > c)) return { min: a.bitrateMin, max: a.bitrateMax };
      g = dd[4];
    }
    c = [
      Math.round((g[0][0] + g[0][1] * c) * f),
      Math.round((g[1][0] + g[1][1] * c) * f),
      Math.round((g[2][0] + g[2][1] * c) * f)
    ];
    c = {
      min: Math.max(c[2], a.bitrateMin || 0),
      max: Math.max(c[2], a.bitrateMax || c[0])
    };
    return (
      k.debug(
        n(
          (b = n(
            (d = n(
              (e = "adjust bitrate for detail, (".concat(a.bitrateMax, ", "))
            ).call(e, a.bitrateMin, "}) -> ("))
          ).call(d, c.max, ", "))
        ).call(b, c.min, ")")
      ),
      c
    );
  }
  function yc() {
    if (!ed) throw new m(l.NOT_SUPPORT, "can not create audio context");
    return ed;
  }
  function fd(c) {
    if (!Ml()) {
      k.debug("polyfill audio node");
      var a = c.connect,
        b = c.disconnect;
      c.connect = (b, e, f) => {
        var d;
        return (
          c._inputNodes || (c._inputNodes = []),
          La((d = c._inputNodes)).call(d, b) ||
            (b instanceof AudioNode
              ? (c._inputNodes.push(b), a.call(c, b, e, f))
              : a.call(c, b, e)),
          c
        );
      };
      c.disconnect = (d, e, f) => {
        b.call(c);
        d ? bd(c._inputNodes, d) : (c._inputNodes = []);
        for (let b of c._inputNodes) a.call(c, b);
      };
    }
  }
  function Nl(c) {
    let a = yc();
    return new u((b, d) => {
      a.decodeAudioData(
        c,
        (a) => {
          b(a);
        },
        (a) => {
          d(new m(l.DECODE_AUDIO_FILE_FAILED, a.toString()));
        }
      );
    });
  }
  function Ml() {
    if (null !== Ve) return Ve;
    var c = yc();
    let a = c.createBufferSource(),
      b = c.createGain();
    c = c.createGain();
    a.connect(b);
    a.connect(c);
    a.disconnect(b);
    c = !1;
    try {
      a.disconnect(b);
    } catch (d) {
      c = !0;
    }
    return a.disconnect(), (Ve = c), c;
  }
  function We(c, a) {
    let b = 1 / a,
      d = yc(),
      e = d.createGain();
    e.gain.value = 0;
    e.connect(d.destination);
    let f = !1,
      g = () => {
        const a = d.createOscillator();
        a.onended = g;
        a.connect(e);
        a.start(0);
        a.stop(d.currentTime + b);
        c(d.currentTime);
        f && (a.onended = () => {});
      };
    return (
      g(),
      () => {
        f = !0;
      }
    );
  }
  function Ol(c) {
    for (let a = 0; a < c.outputBuffer.numberOfChannels; a += 1) {
      let b = c.outputBuffer.getChannelData(a);
      for (let a = 0; a < b.length; a += 1) b[a] = 0;
    }
    return c.inputBuffer;
  }
  function Pl(c) {
    function a(a) {
      "running" === c.state
        ? (b(!1), t && c.suspend().then(d, d))
        : "closed" !== c.state &&
          (t ? b(!1) : (b(!0), a && c.resume().then(d, d)));
    }
    function b(a) {
      if (w !== a) {
        w = a;
        for (let b = 0, c = v; b < c.length; b += 1) {
          let d = c[b];
          a
            ? window.addEventListener(d, e, { capture: !0, passive: !0 })
            : window.removeEventListener(d, e, { capture: !0, passive: !0 });
        }
      }
    }
    function d() {
      a(!1);
    }
    function e() {
      a(!0);
    }
    function f(a) {
      if (!z)
        if (u.paused)
          if (t) g(!1);
          else if (a) {
            g(!1);
            z = !0;
            a = void 0;
            try {
              (a = u.play())
                ? a.then(h, h)
                : (u.addEventListener("playing", h),
                  u.addEventListener("abort", h),
                  u.addEventListener("error", h));
            } catch ($p) {
              h();
            }
          } else g(!0);
        else g(!1), t && u.pause();
    }
    function g(a) {
      if (A !== a) {
        A = a;
        for (let b = 0, c = v; b < c.length; b++) {
          let d = c[b];
          a
            ? window.addEventListener(d, q, { capture: !0, passive: !0 })
            : window.removeEventListener(d, q, { capture: !0, passive: !0 });
        }
      }
    }
    function h() {
      u.removeEventListener("playing", h);
      u.removeEventListener("abort", h);
      u.removeEventListener("error", h);
      z = !1;
      f(!1);
    }
    function q() {
      f(!0);
    }
    function y() {
      p && r ? m || ((m = !0), (t = !1), u && f(!0), a(!0)) : m && (m = !1);
    }
    function T() {
      l && document[l.hidden] === m && ((p = !document[l.hidden]), y());
    }
    function k(a) {
      if (!a || a.target === window) {
        if (document.hasFocus()) {
          if (r) return;
          r = !0;
        } else {
          if (!r) return;
          r = !1;
        }
        y();
      }
    }
    function x(a, b) {
      let c;
      for (c = b; 1 < a; a--) c += b;
      return c;
    }
    let l;
    void 0 !== document.hidden
      ? (l = { hidden: "hidden", visibilitychange: "visibilitychange" })
      : void 0 !== document.webkitHidden
      ? (l = {
          hidden: "webkitHidden",
          visibilitychange: "webkitvisibilitychange"
        })
      : void 0 !== document.mozHidden
      ? (l = { hidden: "mozHidden", visibilitychange: "mozvisibilitychange" })
      : void 0 !== document.msHidden &&
        (l = { hidden: "msHidden", visibilitychange: "msvisibilitychange" });
    var n = navigator.userAgent.toLowerCase();
    n =
      (0 <= E(n).call(n, "iphone") && 0 > E(n).call(n, "like iphone")) ||
      (0 <= E(n).call(n, "ipad") && 0 > E(n).call(n, "like ipad")) ||
      (0 <= E(n).call(n, "ipod") && 0 > E(n).call(n, "like ipod"));
    let m = !0,
      p = !0,
      r = !0,
      t = !1,
      v =
        "click contextmenu auxclick dblclick mousedown mouseup touchend keydown keyup".split(
          " "
        ),
      u,
      w = !1,
      A = !1,
      z = !1;
    if (n) {
      let a = document.createElement("div");
      a.innerHTML = "<audio x-webkit-airplay='deny'></audio>";
      u = a.children.item(0);
      u.controls = !1;
      u.disableRemotePlayback = !0;
      u.preload = "auto";
      u.src =
        "data:audio/mpeg;base64,//uQx" +
        x(23, "A") +
        "WGluZwAAAA8AAAACAAACcQCA" +
        x(16, "gICA") +
        x(66, "/") +
        "8AAABhTEFNRTMuMTAwA8MAAAAAAAAAABQgJAUHQQAB9AAAAnGMHkkI" +
        x(320, "A") +
        "//sQxAADgnABGiAAQBCqgCRMAAgEAH" +
        x(15, "/") +
        "7+n/9FTuQsQH//////2NG0jWUGlio5gLQTOtIoeR2WX////X4s9Atb/JRVCbBUpeRUq" +
        x(18, "/") +
        "9RUi0f2jn/+xDECgPCjAEQAABN4AAANIAAAAQVTEFNRTMuMTAw" +
        x(97, "V") +
        "Q==";
      u.loop = !0;
      u.load();
      f(!0);
    }
    c.onstatechange = function () {
      a(!0);
    };
    a(!1);
    l && document.addEventListener(l.visibilitychange, T, !0);
    n &&
      (window.addEventListener("focus", k, !0),
      window.addEventListener("blur", k, !0));
    T();
    k();
  }
  async function Kh(c, a) {
    let b = (a, b) =>
      a
        ? "number" != typeof a
          ? a.max || a.exact || a.ideal || a.min || b
          : a
        : b;
    c = {
      audio: !1,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: c,
          maxHeight: b(a.height, 1080),
          maxWidth: b(a.width, 1920)
        }
      }
    };
    return (
      a.frameRate && "number" != typeof a.frameRate
        ? ((c.video.mandatory.maxFrameRate = a.frameRate.max),
          (c.video.mandatory.minFrameRate = a.frameRate.min))
        : "number" == typeof a.frameRate &&
          (c.video.mandatory.maxFrameRate = a.frameRate),
      await navigator.mediaDevices.getUserMedia(c)
    );
  }
  async function Ql(c) {
    var a = await Lh(c.mediaSource);
    a = await Rl(a);
    return await Kh(a, c);
  }
  async function Lh(c) {
    let a = ["window", "screen"];
    ("application" !== c && "window" !== c) || (a = ["window"]);
    "screen" === c && (a = ["screen"]);
    let b = Mh();
    if (!b) throw new m(l.ELECTRON_IS_NULL);
    c = null;
    try {
      c = b.desktopCapturer.getSources({ types: a });
    } catch (d) {
      c = null;
    }
    (c && c.then) ||
      (c = new u((c, e) => {
        b.desktopCapturer.getSources({ types: a }, (a, b) => {
          a ? e(a) : c(b);
        });
      }));
    try {
      return await c;
    } catch (d) {
      throw new m(l.ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR, d.toString());
    }
  }
  function Rl(c) {
    return new u((a, b) => {
      let d = document.createElement("div");
      d.innerText = "share screen";
      d.setAttribute(
        "style",
        "text-align: center; height: 25px; line-height: 25px; border-radius: 4px 4px 0 0; background: #D4D2D4; border-bottom:  solid 1px #B9B8B9;"
      );
      let e = document.createElement("div");
      e.setAttribute(
        "style",
        "width: 100%; height: 500px; padding: 15px 25px ; box-sizing: border-box;"
      );
      let f = document.createElement("div");
      f.innerText =
        "Agora Web Screensharing wants to share the contents of your screen with webdemo.agorabeckon.com. Choose what you'd like to share.";
      f.setAttribute("style", "height: 12%;");
      let g = document.createElement("div");
      g.setAttribute(
        "style",
        "width: 100%; height: 80%; background: #FFF; border:  solid 1px #CBCBCB; display: flex; flex-wrap: wrap; justify-content: space-around; overflow-y: scroll; padding: 0 15px; box-sizing: border-box;"
      );
      let h = document.createElement("div");
      h.setAttribute("style", "text-align: right; padding: 16px 0;");
      let q = document.createElement("button");
      q.innerHTML = "cancel";
      q.setAttribute("style", "width: 85px;");
      q.onclick = () => {
        document.body.removeChild(y);
        let a = Error("NotAllowedError");
        a.name = "NotAllowedError";
        b(a);
      };
      h.appendChild(q);
      e.appendChild(f);
      e.appendChild(g);
      e.appendChild(h);
      let y = document.createElement("div");
      y.setAttribute(
        "style",
        "position: fixed; z-index: 99999999; top: 50%; left: 50%; width: 620px; height: 525px; background: #ECECEC; border-radius: 4px; -webkit-transform: translate(-50%,-50%); transform: translate(-50%,-50%);"
      );
      y.appendChild(d);
      y.appendChild(e);
      document.body.appendChild(y);
      D(c).call(c, (b) => {
        if (b.id) {
          let c = document.createElement("div");
          c.setAttribute(
            "style",
            "width: 30%; height: 160px; padding: 20px 0; text-align: center;box-sizing: content-box;"
          );
          c.innerHTML =
            '<div style="height: 120px; display: table-cell; vertical-align: middle;"><img style="width: 100%; background: #333333; box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);" src=' +
            b.thumbnail.toDataURL() +
            ' /></div><span style="\theight: 40px; line-height: 40px; display: inline-block; width: 70%; word-break: keep-all; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">' +
            b.name +
            "</span>";
          c.onclick = () => {
            document.body.removeChild(y);
            a(b.id);
          };
          g.appendChild(c);
        }
      });
    });
  }
  function Mh() {
    if (Md) return Md;
    try {
      return (Md = window.require("electron")), Md;
    } catch (c) {
      return null;
    }
  }
  async function Bb(c, a) {
    let b = 0,
      d = null;
    for (; 2 > b; )
      try {
        d = await Sl(c, a, 0 < b);
        break;
      } catch (g) {
        var e, f;
        if (g instanceof m)
          throw (
            (k.error(n((f = "[".concat(a, "] "))).call(f, g.toString())), g)
          );
        let c = Nd(g.name || g.code || g, g.message);
        if (c.code === l.MEDIA_OPTION_INVALID)
          k.debug("[".concat(a, "] detect media option invalid, retry")),
            (b += 1),
            await Ab(500);
        else
          throw (
            (k.error(n((e = "[".concat(a, "] "))).call(e, c.toString())), c)
          );
      }
    if (!d)
      throw new m(l.UNEXPECTED_ERROR, "can not find stream after getUserMedia");
    return d;
  }
  async function Sl(c, a, b) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)
      throw new m(l.NOT_SUPPORT, "can not find getUserMedia");
    b &&
      (c.video && (delete c.video.width, delete c.video.height),
      c.screen && (delete c.screen.width, delete c.screen.height));
    var d = ea;
    b = new MediaStream();
    if (
      (c.audioSource && b.addTrack(c.audioSource),
      c.videoSource && b.addTrack(c.videoSource),
      !c.audio && !c.video && !c.screen)
    )
      return k.debug("Using Video Source/ Audio Source"), b;
    if (c.screen)
      if (Mh())
        c.screen.sourceId
          ? zc(b, await Kh(c.screen.sourceId, c.screen))
          : zc(b, await Ql(c.screen));
      else if (Xc() && c.screen.extensionId && c.screen.mandatory) {
        if (!d.getStreamFromExtension)
          throw new m(
            l.NOT_SUPPORT,
            "This browser does not support screen sharing"
          );
        k.debug(
          "[".concat(
            a,
            '] Screen access on chrome stable, looking for extension"'
          )
        );
        var e = await Tl(c.screen.extensionId, a);
        c.screen.mandatory.chromeMediaSourceId = e;
        zc(
          b,
          await navigator.mediaDevices.getUserMedia({
            video: { mandatory: c.screen.mandatory }
          })
        );
      } else if (d.getDisplayMedia)
        c.screen.mediaSource && Ch(c.screen.mediaSource),
          (e = {
            width: c.screen.width,
            height: c.screen.height,
            frameRate: c.screen.frameRate,
            displaySurface:
              "screen" === c.screen.mediaSource
                ? "monitor"
                : c.screen.mediaSource
          }),
          k.debug(
            "[".concat(a, "] getDisplayMedia:"),
            w({ video: e, audio: !!c.screenAudio })
          ),
          zc(
            b,
            await navigator.mediaDevices.getDisplayMedia({
              video: e,
              audio: !!c.screenAudio
            })
          );
      else {
        if (va().name !== da.FIREFOX)
          throw (
            (k.error(
              "[".concat(a, "] This browser does not support screenSharing")
            ),
            new m(
              l.NOT_SUPPORT,
              "This browser does not support screen sharing"
            ))
          );
        c.screen.mediaSource && Ch(c.screen.mediaSource);
        d = {
          video: {
            mediaSource: c.screen.mediaSource,
            width: c.screen.width,
            height: c.screen.height,
            frameRate: c.screen.frameRate
          }
        };
        k.debug(n((e = "[".concat(a, "] getUserMedia: "))).call(e, w(d)));
        zc(b, await navigator.mediaDevices.getUserMedia(d));
      }
    if (!c.video && !c.audio) return b;
    c = { video: c.video, audio: c.audio };
    k.debug("[".concat(a, "] GetUserMedia"), w(c));
    e = va();
    a = null;
    (e.name !== da.SAFARI && e.os !== aa.IOS) || (a = await Xe.lock());
    e = await navigator.mediaDevices.getUserMedia(c);
    return c.audio && (Nh = !0), c.video && (Oh = !0), zc(b, e), a && a(), b;
  }
  function Nd(c, a) {
    switch (c) {
      case "Starting video failed":
      case "OverconstrainedError":
      case "TrackStartError":
        var b;
        return new m(
          l.MEDIA_OPTION_INVALID,
          n((b = "".concat(c, ": "))).call(b, a)
        );
      case "NotFoundError":
      case "DevicesNotFoundError":
        var d;
        return new m(
          l.DEVICE_NOT_FOUND,
          n((d = "".concat(c, ": "))).call(d, a)
        );
      case "NotSupportedError":
        var e;
        return new m(l.NOT_SUPPORT, n((e = "".concat(c, ": "))).call(e, a));
      case "InvalidStateError":
      case "NotAllowedError":
      case "PERMISSION_DENIED":
      case "PermissionDeniedError":
        var f;
        return new m(
          l.PERMISSION_DENIED,
          n((f = "".concat(c, ": "))).call(f, a)
        );
      case "ConstraintNotSatisfiedError":
        var g;
        return new m(
          l.CONSTRAINT_NOT_SATISFIED,
          n((g = "".concat(c, ": "))).call(g, a)
        );
      default:
        var h;
        return (
          k.error("getUserMedia unexpected error", c),
          new m(l.UNEXPECTED_ERROR, n((h = "".concat(c, ": "))).call(h, a))
        );
    }
  }
  function zc(c, a) {
    let b = c.getVideoTracks()[0],
      d = c.getAudioTracks()[0],
      e = a.getVideoTracks()[0];
    (a = a.getAudioTracks()[0]) && (d && c.removeTrack(d), c.addTrack(a));
    e && (b && c.removeTrack(b), c.addTrack(e));
  }
  function Tl(c, a) {
    return new u((b, d) => {
      try {
        chrome.runtime.sendMessage(c, { getStream: !0 }, (c) => {
          if (!c || !c.streamId)
            return (
              k.error(
                "[".concat(
                  a,
                  "] No response from Chrome Plugin. Plugin not installed properly"
                ),
                c
              ),
              void d(
                new m(
                  l.CHROME_PLUGIN_NO_RESPONSE,
                  "No response from Chrome Plugin. Plugin not installed properly"
                )
              )
            );
          b(c.streamId);
        });
      } catch (f) {
        var e;
        k.error(
          n(
            (e = "[".concat(
              a,
              "] AgoraRTC screensharing plugin is not accessible("
            ))
          ).call(e, c, ")"),
          f.toString()
        );
        d(new m(l.CHROME_PLUGIN_NOT_INSTALL));
      }
    });
  }
  function Ph(c, a) {
    var b = V(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = M(d).call(d, function (a) {
          return ca(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function Ul(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = Ph(Object(d), !0))).call(b, function (a) {
          Pa(c, a, d[a]);
        });
      else if (ja) Qa(c, ja(d));
      else {
        var e;
        r((e = Ph(Object(d)))).call(e, function (a) {
          ba(c, a, ca(d, a));
        });
      }
    }
    return c;
  }
  function Vb(c, a, b) {
    return new u((d, e) => {
      a.timeout = a.timeout || C.HTTP_CONNECT_TIMEOUT;
      a.responseType = a.responseType || "json";
      a.data && !b
        ? ((a.data = w(a.data)), (Qh += Ld(a.data)))
        : b && (Qh += a.data.size);
      a.headers = a.headers || {};
      a.headers["Content-Type"] =
        a.headers["Content-Type"] || "application/json";
      a.method = "POST";
      a.url = c;
      Cb.request(a)
        .then((a) => {
          "string" == typeof a.data
            ? (Ye += Ld(a.data))
            : a.data instanceof ArrayBuffer || a.data instanceof Uint8Array
            ? (Ye += a.data.byteLength)
            : (Ye += Ld(w(a.data)));
          d(a.data);
        })
        .catch((a) => {
          Cb.isCancel(a)
            ? e(new m(l.OPERATION_ABORT, "cancel token canceled"))
            : "ECONNABORTED" === a.code
            ? e(new m(l.NETWORK_TIMEOUT, a.message))
            : a.response
            ? e(new m(l.NETWORK_RESPONSE_ERROR, a.response.status))
            : e(new m(l.NETWORK_ERROR, a.message));
        });
    });
  }
  async function Vl(c, a) {
    let b = new Blob([a.data], { type: "buffer" }),
      d;
    try {
      d = await Vb(
        c,
        Ul({}, a, {
          data: b,
          headers: { "Content-Type": "application/octet-stream" }
        }),
        !0
      );
    } catch (e) {
      throw e;
    }
    return d;
  }
  function Rh(c, a) {
    var b = V(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = M(d).call(d, function (a) {
          return ca(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function wa(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = Rh(Object(d), !0))).call(b, function (a) {
          Pa(c, a, d[a]);
        });
      else if (ja) Qa(c, ja(d));
      else {
        var e;
        r((e = Rh(Object(d)))).call(e, function (a) {
          ba(c, a, ca(d, a));
        });
      }
    }
    return c;
  }
  function Ze(c) {
    var a = Wl[Math.floor(c / 1e4)];
    if (!a) return { desc: "unkonw error", retry: !1 };
    a = a[c % 1e4];
    if (!a) {
      if (Math.floor(c / 1e4) === Ac.ACCESS_POINT) {
        c %= 1e4;
        if ("1" === c.toString()[0]) return { desc: c.toString(), retry: !1 };
        if ("2" === c.toString()[0]) return { desc: c.toString(), retry: !0 };
      }
      return { desc: "unkonw error", retry: !1 };
    }
    return a;
  }
  function Sh(c) {
    return Xl[c] || { desc: "UNKNOW_ERROR_".concat(c), action: "failed" };
  }
  function fc(c, a, b, d) {
    let e = Wa({}, Na, d),
      f = e.timeout,
      g = async () => {
        await Ab(f);
        f *= e.timeoutFactor;
        f = Math.min(e.maxRetryTimeout, f);
      },
      h = !1;
    d = new u(async (d, f) => {
      a = a || (() => !1);
      b = b || (() => !0);
      for (let q = 0; q < e.maxRetryCount; q += 1) {
        if (h) return f(new m(l.OPERATION_ABORT));
        try {
          const b = await c();
          if (!a(b, q) || q + 1 === e.maxRetryCount) return d(b);
          await g();
        } catch (qa) {
          if (!b(qa, q) || q + 1 === e.maxRetryCount) return f(qa);
          await g();
        }
      }
    });
    return (d.cancel = () => (h = !0)), d;
  }
  function Th(c, a) {
    var b = V(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = M(d).call(d, function (a) {
          return ca(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function $e(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = Th(Object(d), !0))).call(b, function (a) {
          Pa(c, a, d[a]);
        });
      else if (ja) Qa(c, ja(d));
      else {
        var e;
        r((e = Th(Object(d)))).call(e, function (a) {
          ba(c, a, ca(d, a));
        });
      }
    }
    return c;
  }
  function Uh(c, a) {
    var b = V(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = M(d).call(d, function (a) {
          return ca(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function af(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = Uh(Object(d), !0))).call(b, function (a) {
          Pa(c, a, d[a]);
        });
      else if (ja) Qa(c, ja(d));
      else {
        var e;
        r((e = Uh(Object(d)))).call(e, function (a) {
          ba(c, a, ca(d, a));
        });
      }
    }
    return c;
  }
  function Vh(c, a) {
    var b = V(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = M(d).call(d, function (a) {
          return ca(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function Yl(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = Vh(Object(d), !0))).call(b, function (a) {
          Pa(c, a, d[a]);
        });
      else if (ja) Qa(c, ja(d));
      else {
        var e;
        r((e = Vh(Object(d)))).call(e, function (a) {
          ba(c, a, ca(d, a));
        });
      }
    }
    return c;
  }
  async function Zl(c, a, b, d, e) {
    let f = v(),
      g = { sid: b.sid, opid: 10, appid: b.appId, string_uid: a },
      h = c[0];
    b = await fc(
      () =>
        Vb(
          h +
            "".concat(-1 === E(h).call(h, "?") ? "?" : "&", "action=stringuid"),
          {
            data: g,
            cancelToken: d,
            headers: { "X-Packet-Service-Type": 0, "X-Packet-URI": 72 }
          }
        ),
      (b, d) => {
        if (0 === b.code) {
          var e;
          if (0 >= b.uid || b.uid >= Math.pow(2, 32))
            throw (
              (k.error(
                n((e = "Invalid Uint Uid ".concat(a, " => "))).call(e, b.uid),
                b
              ),
              t.reqUserAccount(g.sid, {
                lts: f,
                success: !1,
                serverAddr: h,
                stringUid: g.string_uid,
                uid: b.uid,
                errorCode: l.INVALID_UINT_UID_FROM_STRING_UID,
                extend: g
              }),
              new m(l.INVALID_UINT_UID_FROM_STRING_UID))
            );
          return (
            t.reqUserAccount(g.sid, {
              lts: f,
              success: !0,
              serverAddr: h,
              stringUid: g.string_uid,
              uid: b.uid,
              errorCode: null,
              extend: g
            }),
            !1
          );
        }
        e = Ze(b.code);
        return (
          e.retry && (h = c[(d + 1) % c.length]),
          t.reqUserAccount(g.sid, {
            lts: f,
            success: !1,
            serverAddr: h,
            stringUid: g.string_uid,
            uid: b.uid,
            errorCode: e.desc,
            extend: g
          }),
          e.retry
        );
      },
      (a, b) =>
        a.code !== l.OPERATION_ABORT &&
        (t.reqUserAccount(g.sid, {
          lts: f,
          success: !1,
          serverAddr: h,
          stringUid: g.string_uid,
          uid: null,
          errorCode: a.code,
          extend: g
        }),
        (h = c[(b + 1) % c.length]),
        !0),
      e
    );
    if (0 !== b.code)
      throw ((b = Ze(b.code)), new m(l.UNEXPECTED_RESPONSE, b.desc));
    return b;
  }
  function $l(c, a, b, d) {
    let e = v(),
      f = {
        command: "convergeAllocateEdge",
        sid: a.sid,
        appId: a.appId,
        token: a.token,
        uid: a.uid,
        cname: a.cname,
        ts: Math.floor(v() / 1e3),
        version: $a,
        seq: 0,
        requestId: 1
      };
    return fc(
      async () => ({
        res: await Vb(c, {
          data: { service_name: "webrtc_proxy", json_body: w(f) },
          cancelToken: b,
          headers: { "X-Packet-Service-Type": 0, "X-Packet-URI": 61 }
        }),
        url: c
      }),
      (b) => {
        if (!b.res.json_body)
          throw (
            (k.debug(
              "[".concat(a.clientId, "] Get proxy server failed: no json_body")
            ),
            new m(l.UNEXPECTED_RESPONSE, w(b.res)))
          );
        let c = JSON.parse(b.res.json_body);
        var d, e;
        if (200 !== c.code)
          throw (
            (k.debug(
              n(
                (d = n(
                  (e = "[".concat(
                    a.clientId,
                    "] Get proxy server failed: response code ["
                  ))
                ).call(e, c.code, "], reason ["))
              ).call(d, c.reason, "]")
            ),
            new m(l.UNEXPECTED_RESPONSE, w(b.res)))
          );
        return (
          k.debug(
            "[".concat(a.clientId, "] App return server length"),
            c.servers.length
          ),
          !1
        );
      },
      (a) =>
        a.code !== l.OPERATION_ABORT &&
        (t.requestProxyAppCenter(f.sid, {
          lts: e,
          succ: !1,
          APAddr: c,
          workerManagerList: null,
          ec: a.code,
          response: a.message
        }),
        !0),
      d
    );
  }
  function am(c, a, b, d) {
    let e = v(),
      f = c;
    Bd(c).call(c, "http") || (f = "https://".concat(c, ":4000/v2/machine"));
    let g = {
      command: "request",
      gatewayType: "http",
      appId: a.appId,
      cname: a.cname,
      uid: (a.uid || "").toString(),
      sdkVersion: "2.3.1",
      sid: a.sid,
      seq: 1,
      ts: v(),
      requestId: 3,
      clientRequest: {
        appId: a.appId,
        cname: a.cname,
        uid: (a.uid || "").toString(),
        sid: a.sid
      }
    };
    return fc(
      async () => ({ res: await Vb(f, { data: g, cancelToken: b }), url: c }),
      (a) => {
        if (!a.res.serverResponse)
          throw new m(
            l.UNEXPECTED_RESPONSE,
            "requeet worker manager server failed: serverResponse is undefined"
          );
        return !1;
      },
      (a) =>
        a.code !== l.OPERATION_ABORT &&
        (t.requestProxyWorkerManager(g.sid, {
          lts: e,
          succ: !1,
          workerManagerAddr: c,
          ec: a.code,
          response: a.message
        }),
        !0),
      d
    );
  }
  function bm(c, a, b, d, e) {
    bf += 1;
    let f = {
        sid: b.sid,
        command: "convergeAllocateEdge",
        uid: "666",
        appId: b.appId,
        ts: Math.floor(v() / 1e3),
        seq: bf,
        requestId: bf,
        version: $a,
        cname: b.cname
      },
      g = { service_name: a, json_body: w(f) },
      h,
      q,
      y = c[0];
    return fc(
      async () => {
        h = v();
        var b = await Vb(y, {
          data: g,
          cancelToken: d,
          headers: { "X-Packet-Service-Type": "0", "X-Packet-URI": "61" }
        });
        if (((q = v() - h), 0 !== b.code)) {
          var c = new m(
            l.UNEXPECTED_RESPONSE,
            "live streaming ap error, code" + b.code,
            { retry: !0, responseTime: q }
          );
          throw (k.error(c.toString()), c);
        }
        b = JSON.parse(b.json_body);
        if (200 !== b.code)
          throw (
            ((b = new m(
              l.UNEXPECTED_RESPONSE,
              n(
                (c = "live streaming app center error, code: ".concat(
                  b.code,
                  ", reason: "
                ))
              ).call(c, b.reason),
              { code: b.code, responseTime: q }
            )),
            k.error(b.toString()),
            b)
          );
        if (!b.servers || 0 === b.servers.length)
          throw (
            ((c = new m(
              l.UNEXPECTED_RESPONSE,
              "live streaming app center empty server",
              { code: b.code, responseTime: q }
            )),
            k.error(c.toString()),
            c)
          );
        c = wl(b, a);
        return (
          C.LIVE_STREAMING_ADDRESS &&
            (c.addressList =
              C.LIVE_STREAMING_ADDRESS instanceof Array
                ? C.LIVE_STREAMING_ADDRESS
                : [C.LIVE_STREAMING_ADDRESS]),
          Yl({}, c, { responseTime: q })
        );
      },
      (d, e) => (
        t.apworkerEvent(b.sid, {
          success: !0,
          sc: 200,
          serviceName: a,
          responseDetail: w(d.addressList),
          firstSuccess: 0 === e,
          responseTime: q,
          serverIp: c[e % c.length]
        }),
        !1
      ),
      (d, e) => (
        t.apworkerEvent(b.sid, {
          success: !1,
          sc: (d.data && d.data.code) || 200,
          serviceName: a,
          responseTime: q,
          serverIp: c[e % c.length]
        }),
        !!(
          (d.code !== l.OPERATION_ABORT && d.code !== l.UNEXPECTED_RESPONSE) ||
          (d.data && d.data.retry)
        ) && ((y = c[(e + 1) % c.length]), !0)
      ),
      e
    );
  }
  function cm(c, a, b, d) {
    a = {
      command: "convergeAllocateEdge",
      sid: a.sid,
      appId: a.appId,
      token: a.token,
      ts: v(),
      version: $a,
      cname: a.cname,
      uid: a.uid.toString(),
      requestId: cf,
      seq: cf
    };
    cf += 1;
    let e = { service_name: "tele_channel", json_body: w(a) };
    return fc(
      async () => {
        var a = await Vb(c, {
          data: e,
          cancelToken: b,
          headers: { "X-Packet-Service-Type": 0, "X-Packet-URI": 61 }
        });
        if (0 !== a.code) {
          var d = new m(
            l.UNEXPECTED_RESPONSE,
            "cross channel ap error, code" + a.code,
            { retry: !0 }
          );
          throw (k.error(d.toString()), d);
        }
        a = JSON.parse(a.json_body);
        if (200 !== a.code) {
          var h = new m(
            l.UNEXPECTED_RESPONSE,
            n(
              (d = "cross channel app center error, code: ".concat(
                a.code,
                ", reason: "
              ))
            ).call(d, a.reason)
          );
          throw (k.error(h.toString()), h);
        }
        if (!a.servers || 0 === a.servers.length)
          throw (
            ((d = new m(
              l.UNEXPECTED_RESPONSE,
              "cross channel app center empty server"
            )),
            k.error(d.toString()),
            d)
          );
        return {
          vid: a.vid,
          workerToken: a.workerToken,
          addressList: D((h = a.servers)).call(h, (a) => {
            var b;
            return n(
              (b = "wss://".concat(
                a.address.replace(/\./g, "-"),
                ".edge.agora.io:"
              ))
            ).call(b, a.wss);
          })
        };
      },
      void 0,
      (a) =>
        !!(
          (a.code !== l.OPERATION_ABORT && a.code !== l.UNEXPECTED_RESPONSE) ||
          (a.data && a.data.retry)
        ),
      d
    );
  }
  function Wh(c, a, b, d) {
    let e = v(),
      f = {
        opid: 133,
        flag: 4096,
        ts: v(),
        key: a.token,
        cname: a.cname,
        sid: a.sid,
        detail: { 6: a.stringUid },
        uid: a.uid || 0
      };
    a.multiIP &&
      a.multiIP.gateway_ip &&
      (f.detail[5] = w({
        vocs_ip: [a.multiIP.uni_lbs_ip],
        vos_ip: [a.multiIP.gateway_ip]
      }));
    return fc(
      async () => {
        let a = await Vb(
          c +
            "".concat(
              -1 === E(c).call(c, "?") ? "?" : "&",
              "action=wrtc_gateway"
            ),
          {
            data: f,
            cancelToken: b,
            headers: { "X-Packet-Service-Type": 0, "X-Packet-URI": 69 }
          }
        );
        if (C.GATEWAY_ADDRESS && 0 < C.GATEWAY_ADDRESS.length) {
          var d;
          console.log(C.GATEWAY_ADDRESS);
          let b = D((d = C.GATEWAY_ADDRESS)).call(d, (b, c) => ({
            ip: b.ip,
            port: b.port,
            ticket: a.addresses[c].ticket
          }));
          a.addresses = b;
        }
        return vl(a, c);
      },
      (b) => {
        if (0 === b.res.code)
          return (
            t.joinChooseServer(a.sid, {
              lts: e,
              succ: !0,
              csAddr: c,
              serverList: b.gatewayAddrs,
              ec: null,
              cid: b.res.cid.toString(),
              uid: b.res.uid.toString()
            }),
            !1
          );
        b = Ze(b.res.code);
        throw new m(l.CAN_NOT_GET_GATEWAY_SERVER, b.desc, { retry: b.retry });
      },
      (b) => {
        return (
          b.code !== l.OPERATION_ABORT &&
          (b.code === l.CAN_NOT_GET_GATEWAY_SERVER
            ? (t.joinChooseServer(a.sid, {
                lts: e,
                succ: !1,
                csAddr: c,
                serverList: null,
                ec: b.message
              }),
              k.warning(
                n(
                  (d = n(
                    (f = n(
                      (g = "[".concat(a.clientId, "] Choose server "))
                    ).call(g, c, " failed, message: "))
                  ).call(f, b.message, ", retry: "))
                ).call(d, b.data.retry)
              ),
              b.data.retry)
            : (t.joinChooseServer(a.sid, {
                lts: e,
                succ: !1,
                csAddr: c,
                serverList: null,
                ec: b.code
              }),
              k.warning(
                "[".concat(a.clientId, "] Choose server network error, retry"),
                b
              ),
              !0))
        );
        var d, f, g;
      },
      d
    );
  }
  async function Xh(c, a, b) {
    return { gatewayInfo: await dm(c, a, b) };
  }
  async function em(c, a, b) {
    var d, e;
    "disabled" !== c.cloudProxyServer &&
      ((a = await fm(c, a, b)),
      "443only" === c.cloudProxyServer
        ? (c.proxyServer = C.PROXY_SERVER_TYPE2)
        : (c.proxyServer = a.address),
      (c.turnServer = {
        mode: "manual",
        servers: [
          {
            turnServerURL: a.address,
            tcpport: a.serverResponse.tcpport
              ? a.serverResponse.tcpport
              : Db.tcpport,
            udpport: a.serverResponse.udpport
              ? a.serverResponse.udpport
              : Db.udpport,
            username: a.serverResponse.username || Db.username,
            password: a.serverResponse.password || Db.password,
            forceturn: !0
          }
        ]
      }),
      k.debug(
        n(
          (d = n((e = "[".concat(c.clientId, "] set proxy server: "))).call(
            e,
            c.proxyServer,
            ", mode: "
          ))
        ).call(d, c.cloudProxyServer)
      ),
      t.setProxyServer(c.proxyServer),
      k.setProxyServer(c.proxyServer));
  }
  async function Yh(c, a, b, d) {
    let e = C.ACCOUNT_REGISTER,
      f = [];
    f = a.proxyServer
      ? D(e).call(e, (b) => {
          var c;
          return n((c = "https://".concat(a.proxyServer, "/ap/?url="))).call(
            c,
            b + "/api/v1"
          );
        })
      : D(e).call(e, (a) => "https://".concat(a, "/api/v1"));
    return (await Zl(f, c, a, b, d)).uid;
  }
  async function fm(c, a, b) {
    var d, e;
    let f = v();
    var g = D((d = C.PROXY_CS)).call(d, (a) => "https://".concat(a, "/api/v1"));
    g = D(g).call(g, (d) => $l(d, c, a, b));
    d = null;
    try {
      d = await $c(g);
    } catch (h) {
      throw (
        (k.error(
          "[".concat(
            c.clientId,
            "] can not get proxy server after trying several times"
          )
        ),
        new m(l.CAN_NOT_GET_PROXY_SERVER))
      );
    }
    r(g).call(g, (a) => a.cancel());
    g = JSON.parse(d.res.json_body);
    g = D((e = g.servers)).call(e, ul);
    if ("443only" === c.cloudProxyServer)
      return {
        address: g[0],
        serverResponse: {
          tcpport: 443,
          udpport: Db.udpport,
          username: Db.username,
          password: Db.password
        }
      };
    t.requestProxyAppCenter(c.sid, {
      lts: f,
      succ: !0,
      APAddr: d.url,
      workerManagerList: w(g),
      ec: null,
      response: w(d.res)
    });
    f = v();
    e = D(g).call(g, (d) => am(d, c, a, b));
    d = null;
    try {
      d = await $c(e);
    } catch (h) {
      throw (
        (k.error(
          "[".concat(
            c.clientId,
            "] can not get worker manager after trying several times"
          )
        ),
        new m(l.CAN_NOT_GET_PROXY_SERVER))
      );
    }
    return (
      r(e).call(e, (a) => a.cancel()),
      t.requestProxyWorkerManager(c.sid, {
        lts: f,
        succ: !0,
        workerManagerAddr: d.url,
        ec: null,
        response: w(d.res)
      }),
      { address: d.url, serverResponse: d.res.serverResponse }
    );
  }
  async function dm(c, a, b) {
    var d;
    v();
    let e = D((d = C.WEBCS_DOMAIN)).call(d, (a) => {
        var b;
        return c.proxyServer
          ? n((b = "https://".concat(c.proxyServer, "/ap/?url="))).call(
              b,
              a + "/api/v1"
            )
          : "https://".concat(a, "/api/v1");
      }),
      f = null;
    d = D(e).call(
      e,
      (d) => (
        k.debug("[".concat(c.clientId, "] Connect to choose_server:"), d),
        Wh(d, c, a, b)
      )
    );
    try {
      var g;
      f = await $c(
        n(
          (g = [
            new u(async (d, e) => {
              var g;
              if ((await Ab(1e3), null === f)) {
                var h = D((g = C.WEBCS_DOMAIN_BACKUP_LIST)).call(g, (a) => {
                    var b;
                    return c.proxyServer
                      ? n(
                          (b = "https://".concat(c.proxyServer, "/ap/?url="))
                        ).call(b, a + "/api/v1")
                      : "https://".concat(a, "/api/v1");
                  }),
                  q = D(h).call(
                    h,
                    (d) => (
                      k.debug(
                        "[".concat(
                          c.clientId,
                          "] Connect to backup choose_server:"
                        ),
                        d
                      ),
                      Wh(d, c, a, b)
                    )
                  );
                $c(q)
                  .then((a) => {
                    r(q).call(q, (a) => a.cancel());
                    d(a);
                  })
                  .catch((a) => e(a[0]));
              }
            })
          ])
        ).call(g, d)
      );
    } catch (h) {
      throw h[0];
    }
    return r(d).call(d, (a) => a.cancel()), f;
  }
  async function Zh(c, a, b, d) {
    var e;
    let f = D((e = C.UAP_AP)).call(e, (b) => {
      var c;
      return a.proxyServer
        ? n((c = "https://".concat(a.proxyServer, "/ap/?url="))).call(
            c,
            b + "/api/v1?action=uap"
          )
        : "https://".concat(b, "/api/v1?action=uap");
    });
    try {
      return await bm(f, c, a, b, d);
    } catch (g) {
      throw g;
    }
  }
  async function gm(c, a, b) {
    var d;
    let e = D((d = C.UAP_AP)).call(d, (a) => {
      var b;
      return c.proxyServer
        ? n((b = "https://".concat(c.proxyServer, "/ap/?url="))).call(
            b,
            a + "/api/v1?action=uap"
          )
        : "https://".concat(a, "/api/v1?action=uap");
    });
    d = D(e).call(e, (d) => cm(d, c, a, b));
    try {
      let a = await $c(d);
      return r(d).call(d, (a) => a.cancel()), a;
    } catch (f) {
      throw f[0];
    }
  }
  async function hm(c, a) {
    var b;
    let d = R((b = c.getTransceivers())).call(
      b,
      (b) => "inactive" === b.direction && b.receiver.track.kind === a.kind
    );
    return d
      ? ((d.direction = "sendrecv"), await d.sender.replaceTrack(a), d)
      : c.addTransceiver(a, { direction: "sendrecv" });
  }
  function cb(c) {
    if (Array.isArray(c))
      return c.map(function (a) {
        return a;
      });
    if (!$h(c)) return c;
    var a = {},
      b;
    for (b in c)
      $h(c[b]) || Array.isArray(c[b]) ? (a[b] = cb(c[b])) : (a[b] = c[b]);
    return a;
  }
  function $h(c) {
    return !("object" != typeof c || Array.isArray(c) || !c);
  }
  function df(c, a) {
    function b() {
      this.constructor = c;
    }
    ai(c, a);
    c.prototype =
      null === a ? Object.create(a) : ((b.prototype = a.prototype), new b());
  }
  function ef(c, a, b, d) {
    return new (b || (b = Promise))(function (e, f) {
      function g(a) {
        try {
          q(d.next(a));
        } catch (T) {
          f(T);
        }
      }
      function h(a) {
        try {
          q(d.throw(a));
        } catch (T) {
          f(T);
        }
      }
      function q(a) {
        a.done
          ? e(a.value)
          : new b(function (b) {
              b(a.value);
            }).then(g, h);
      }
      q((d = d.apply(c, a || [])).next());
    });
  }
  function ff(c, a) {
    function b(b) {
      return function (g) {
        return (function (b) {
          if (d) throw new TypeError("Generator is already executing.");
          for (; h; )
            try {
              if (
                ((d = 1),
                e &&
                  (f =
                    2 & b[0]
                      ? e.return
                      : b[0]
                      ? e.throw || ((f = e.return) && f.call(e), 0)
                      : e.next) &&
                  !(f = f.call(e, b[1])).done)
              )
                return f;
              switch (((e = 0), f && (b = [2 & b[0], f.value]), b[0])) {
                case 0:
                case 1:
                  f = b;
                  break;
                case 4:
                  return h.label++, { value: b[1], done: !1 };
                case 5:
                  h.label++;
                  e = b[1];
                  b = [0];
                  continue;
                case 7:
                  b = h.ops.pop();
                  h.trys.pop();
                  continue;
                default:
                  if (
                    !((f = h.trys),
                    (f = 0 < f.length && f[f.length - 1]) ||
                      (6 !== b[0] && 2 !== b[0]))
                  ) {
                    h = 0;
                    continue;
                  }
                  if (3 === b[0] && (!f || (b[1] > f[0] && b[1] < f[3])))
                    h.label = b[1];
                  else if (6 === b[0] && h.label < f[1])
                    (h.label = f[1]), (f = b);
                  else if (f && h.label < f[2]) (h.label = f[2]), h.ops.push(b);
                  else {
                    f[2] && h.ops.pop();
                    h.trys.pop();
                    continue;
                  }
              }
              b = a.call(c, h);
            } catch (qa) {
              (b = [6, qa]), (e = 0);
            } finally {
              d = f = 0;
            }
          if (5 & b[0]) throw b[1];
          return { value: b[0] ? b[1] : void 0, done: !0 };
        })([b, g]);
      };
    }
    var d,
      e,
      f,
      g,
      h = {
        label: 0,
        sent: function () {
          if (1 & f[0]) throw f[1];
          return f[1];
        },
        trys: [],
        ops: []
      };
    return (
      (g = { next: b(0), throw: b(1), return: b(2) }),
      "function" == typeof Symbol &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
  }
  function im(c, a, b) {
    b = c.createShader(b);
    if (!b)
      return new m(l.WEBGL_INTERNAL_ERROR, "can not create shader").throw();
    c.shaderSource(b, a);
    c.compileShader(b);
    return c.getShaderParameter(b, c.COMPILE_STATUS)
      ? b
      : ((a = c.getShaderInfoLog(b)),
        c.deleteShader(b),
        new m(l.WEBGL_INTERNAL_ERROR, "error compiling shader:" + a).throw());
  }
  function jm(c, a, b, d) {
    let e = c.createProgram();
    if (!e) throw new m(l.WEBGL_INTERNAL_ERROR, "can not create webgl program");
    r(a).call(a, (a) => {
      c.attachShader(e, a);
    });
    b &&
      r(b).call(b, (a, b) => {
        c.bindAttribLocation(e, d ? d[b] : b, a);
      });
    c.linkProgram(e);
    if (!c.getProgramParameter(e, c.LINK_STATUS))
      throw (
        ((a = c.getProgramInfoLog(e)),
        c.deleteProgram(e),
        new m(l.WEBGL_INTERNAL_ERROR, "error in program linking:" + a))
      );
    return e;
  }
  function bi(c) {
    var a = new Uint8Array([99, 114, 121, 112, 116, 105, 105]),
      b = a.length;
    let d = c.length,
      e = new Uint8Array(d),
      f = new Uint8Array(256);
    for (var g = 0; 256 > g; g++) f[g] = g;
    g = 0;
    for (var h = 0; 256 > h; h++)
      (g = (g + f[h] + a[h % b]) % 256), ([f[h], f[g]] = [f[g], f[h]]);
    g = b = 0;
    for (h = 0; h < 0 + d; h++)
      (b = (b + 1) % 256),
        (g = (g + f[b]) % 256),
        ([f[b], f[g]] = [f[g], f[b]]),
        (a = f[(f[b] + f[g]) % 256]),
        0 <= h && (e[h - 0] = c[h - 0] ^ a);
    c = String.fromCharCode.apply(null, Kb(e));
    return Function("var winSize = 5; return `" + c + "`")();
  }
  function gf(c) {
    let a = {};
    if (
      (c.facingMode && (a.facingMode = c.facingMode),
      c.cameraId && (a.deviceId = { exact: c.cameraId }),
      !c.encoderConfig)
    )
      return a;
    c = uc(c.encoderConfig);
    return (
      (a.width = c.width),
      (a.height = c.height),
      !Dh() && c.frameRate && (a.frameRate = c.frameRate),
      va().name === da.EDGE &&
        "object" == typeof a.frameRate &&
        (a.frameRate.max = 60),
      va().name === da.FIREFOX && (a.frameRate = { ideal: 30, max: 30 }),
      a
    );
  }
  function ci(c) {
    let a = {};
    if (
      (Dh() ||
        (void 0 !== c.AGC &&
          ((a.autoGainControl = c.AGC),
          Xc() &&
            ((a.googAutoGainControl = c.AGC),
            (a.googAutoGainControl2 = c.AGC))),
        void 0 !== c.AEC && (a.echoCancellation = c.AEC),
        void 0 !== c.ANS &&
          ((a.noiseSuppression = c.ANS),
          Xc() && (a.googNoiseSuppression = c.ANS))),
      c.encoderConfig)
    ) {
      let b = Ed(c.encoderConfig);
      a.channelCount = b.stereo ? 2 : 1;
      a.sampleRate = b.sampleRate;
      a.sampleSize = b.sampleSize;
    }
    return (
      c.microphoneId && (a.deviceId = { exact: c.microphoneId }),
      Xc() &&
        2 === a.channelCount &&
        ((a.googAutoGainControl = !1),
        (a.googAutoGainControl2 = !1),
        (a.echoCancellation = !1),
        (a.googNoiseSuppression = !1)),
      a
    );
  }
  function di(c, a) {
    var b = V(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = M(d).call(d, function (a) {
          return ca(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function Od(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = di(Object(d), !0))).call(b, function (a) {
          Pa(c, a, d[a]);
        });
      else if (ja) Qa(c, ja(d));
      else {
        var e;
        r((e = di(Object(d)))).call(e, function (a) {
          ba(c, a, ca(d, a));
        });
      }
    }
    return c;
  }
  function hf(c, a) {
    var b = c.match(/a=rtpmap:(\d+) opus/);
    if (!b || !b[0] || !b[1]) return c;
    var d = b[1];
    b = c.match("a=fmtp:".concat(d, ".*\r\n"));
    if (!b || !b[0]) return c;
    d = "a=fmtp:".concat(d, " minptime=10;useinbandfec=1;");
    var e;
    (a.bitrate &&
      (d += "maxaveragebitrate=".concat(Math.floor(1e3 * a.bitrate), ";")),
    a.sampleRate) &&
      (d += n(
        (e = "maxplaybackrate=".concat(a.sampleRate, ";sprop-maxcapturerate="))
      ).call(e, a.sampleRate, ";"));
    return (
      a.stereo && (d += "stereo=1;sprop-stereo-1;"),
      (d += "\r\n"),
      c.replace(b[0], d)
    );
  }
  function ei(c) {
    return c.replace("minptime=10", "minptime=10;stereo=1; sprop-stereo=1");
  }
  function km(c, a) {
    var b, d, e;
    let f = ya((b = RegExp.prototype.test)).call(b, /^([a-z])=(.*)/);
    c = M((d = c.split(/(\r\n|\r|\n)/))).call(d, f);
    a = M((e = a.split(/(\r\n|\r|\n)/))).call(e, f);
    let g = null,
      h = new Y();
    return r(c).call(c, (a) => {
      let b = a.match(/m=(audio|video)/);
      if (b && b[1]) return void (g = b[1]);
      g &&
        (a = a.match(/=(sendrecv|recvonly|sendonly|inactive)/)) &&
        a[1] &&
        h.set(g, a[1]);
    }),
    (g = null),
    D(a)
      .call(a, (a) => {
        var b = a.match(/m=(audio|video)/);
        if (b && b[1]) return (g = b[1]), a;
        if (!g) return a;
        if ((b = a.match(/=(sendrecv|recvonly|sendonly|inactive)/)) && b[1]) {
          let c = h.get(g);
          if (c && c !== b[1]) return a.replace(b[1], c);
        }
        return a;
      })
      .join("\r\n") + "\r\n";
  }
  function lm(c, a) {
    let b = document.createElement("video"),
      d = document.createElement("canvas");
    b.setAttribute("style", "display:none");
    d.setAttribute("style", "display:none");
    b.setAttribute("muted", "");
    b.muted = !0;
    b.setAttribute("autoplay", "");
    b.autoplay = !0;
    b.setAttribute("playsinline", "");
    d.width = zb(a.width);
    d.height = zb(a.height);
    a = zb(a.framerate || 15);
    document.body.append(b);
    document.body.append(d);
    let e = c._mediaStreamTrack;
    b.srcObject = new MediaStream([e]);
    b.play();
    let f = d.getContext("2d");
    if (!f) throw new m(l.UNEXPECTED_ERROR, "can not get canvas context");
    let g = d.captureStream(ea.supportRequestFrame ? 0 : a).getVideoTracks()[0],
      h = We(() => {
        if ((b.paused && b.play(), 2 < b.videoHeight && 2 < b.videoWidth)) {
          const c = (b.videoHeight / b.videoWidth) * d.width;
          var a, h, q;
          2 <= Math.abs(c - d.height) &&
            (k.debug(
              "adjust low stream resolution",
              n(
                (a = n(
                  (h = n((q = "".concat(d.width, "x"))).call(
                    q,
                    d.height,
                    " -> "
                  ))
                ).call(h, d.width, "x"))
              ).call(a, c)
            ),
            (d.height = c));
        }
        f.drawImage(b, 0, 0, d.width, d.height);
        g.requestFrame && g.requestFrame();
        e !== c._mediaStreamTrack &&
          ((e = c._mediaStreamTrack), (b.srcObject = new MediaStream([e])));
      }, a),
      q = g.stop;
    return (
      (g.stop = () => {
        q.call(g);
        h();
        b.remove();
        d.remove();
        k.debug("clean low stream renderer");
      }),
      g
    );
  }
  function fi(c, a) {
    var b = V(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = M(d).call(d, function (a) {
          return ca(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function mm(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = fi(Object(d), !0))).call(b, function (a) {
          Pa(c, a, d[a]);
        });
      else if (ja) Qa(c, ja(d));
      else {
        var e;
        r((e = fi(Object(d)))).call(e, function (a) {
          ba(c, a, ca(d, a));
        });
      }
    }
    return c;
  }
  function gi(c, a) {
    var b = V(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = M(d).call(d, function (a) {
          return ca(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function jf(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = gi(Object(d), !0))).call(b, function (a) {
          Pa(c, a, d[a]);
        });
      else if (ja) Qa(c, ja(d));
      else {
        var e;
        r((e = gi(Object(d)))).call(e, function (a) {
          ba(c, a, ca(d, a));
        });
      }
    }
    return c;
  }
  function hi(c, a) {
    var b = V(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = M(d).call(d, function (a) {
          return ca(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function kf(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = hi(Object(d), !0))).call(b, function (a) {
          Pa(c, a, d[a]);
        });
      else if (ja) Qa(c, ja(d));
      else {
        var e;
        r((e = hi(Object(d)))).call(e, function (a) {
          ba(c, a, ca(d, a));
        });
      }
    }
    return c;
  }
  function ii(c, a) {
    var b = V(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = M(d).call(d, function (a) {
          return ca(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function Wb(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = ii(Object(d), !0))).call(b, function (a) {
          Pa(c, a, d[a]);
        });
      else if (ja) Qa(c, ja(d));
      else {
        var e;
        r((e = ii(Object(d)))).call(e, function (a) {
          ba(c, a, ca(d, a));
        });
      }
    }
    return c;
  }
  function ji(c) {
    if (!(c instanceof ki))
      return new m(
        l.INVALID_PARAMS,
        "Config should be instance of [ChannelMediaRelayConfiguration]"
      ).throw();
    let a = c.getSrcChannelMediaInfo();
    c = c.getDestChannelMediaInfo();
    if (!a)
      return new m(
        l.INVALID_PARAMS,
        "srcChannelMediaInfo should not be empty"
      ).throw();
    if (0 === c.size)
      return new m(
        l.INVALID_PARAMS,
        "destChannelMediaInfo should not be empty"
      ).throw();
  }
  function li(c, a) {
    var b = V(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = M(d).call(d, function (a) {
          return ca(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function Bc(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = li(Object(d), !0))).call(b, function (a) {
          Pa(c, a, d[a]);
        });
      else if (ja) Qa(c, ja(d));
      else {
        var e;
        r((e = li(Object(d)))).call(e, function (a) {
          ba(c, a, ca(d, a));
        });
      }
    }
    return c;
  }
  async function nm(c, a) {
    var b = null;
    if ("string" == typeof c) {
      let a = mi.get(c);
      if (a) return k.debug("use cached audio resource: ", c), a;
      try {
        b = (
          await fc(
            () => Cb.get(c, { responseType: "arraybuffer" }),
            void 0,
            void 0,
            { maxRetryCount: 3 }
          )
        ).data;
      } catch (e) {
        throw new m(l.FETCH_AUDIO_FILE_FAILED, e.toString());
      }
    } else
      b = await new u((a, b) => {
        const d = new FileReader();
        d.onload = (c) => {
          c.target
            ? a(c.target.result)
            : b(new m(l.READ_LOCAL_AUDIO_FILE_ERROR));
        };
        d.onerror = () => {
          b(new m(l.READ_LOCAL_AUDIO_FILE_ERROR));
        };
        d.readAsArrayBuffer(c);
      });
    b = await Nl(b);
    return "string" == typeof c && a && mi.set(c, b), b;
  }
  function ni(c, a) {
    var b = V(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = M(d).call(d, function (a) {
          return ca(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function lf(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = ni(Object(d), !0))).call(b, function (a) {
          Pa(c, a, d[a]);
        });
      else if (ja) Qa(c, ja(d));
      else {
        var e;
        r((e = ni(Object(d)))).call(e, function (a) {
          ba(c, a, ca(d, a));
        });
      }
    }
    return c;
  }
  function mf(c, a, b, d) {
    if (b.optimizationMode)
      if (d && d.width && d.height) {
        let e = Ll(b.optimizationMode, d);
        b.encoderConfig = lf({}, d, { bitrateMin: e.min, bitrateMax: e.max });
        ("motion" === b.optimizationMode ||
          ("detail" === b.optimizationMode &&
            d.frameRate &&
            10 > zb(d.frameRate))) &&
          ((a.contentHint = b.optimizationMode),
          a.contentHint === b.optimizationMode
            ? k.debug(
                "[".concat(c, "] set content hint to"),
                b.optimizationMode
              )
            : k.debug("[".concat(c, "] set content hint failed")));
      } else
        k.warning(
          "[".concat(
            c,
            "] can not apply optimization mode bitrate config, no encoderConfig"
          )
        );
  }
  function om(c, a, b, d) {
    let e,
      f = 0,
      g = null;
    return new u((h, q) => {
      Cc(() => {
        e && (e(), h(f));
      }, a);
      e = We(() => {
        var a;
        a: if ((f > d && e && (e(), h(f)), (a = b.getContext("2d")))) {
          a.drawImage(c, 0, 0, 160, 120);
          a = a.getImageData(0, 0, b.width, b.height);
          var T = Math.floor(a.data.length / 3);
          if (g)
            for (let b = 0; b < T; b += 3)
              if (a.data[b] !== g[b]) {
                a = ((f += 1), void (g = a.data));
                break a;
              }
          g = a.data;
          a = void 0;
        } else
          (a = new m(l.UNEXPECTED_ERROR, "can not get canvas 2d context.")),
            (a = (k.error(a.toString()), void q(a)));
        !a;
      }, 30);
    });
  }
  var Lb =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : {},
    Pd = function (c) {
      return c && c.Math == Math && c;
    },
    J =
      Pd("object" == typeof globalThis && globalThis) ||
      Pd("object" == typeof window && window) ||
      Pd("object" == typeof self && self) ||
      Pd("object" == typeof Lb && Lb) ||
      Function("return this")(),
    oa = function (c) {
      try {
        return !!c();
      } catch (a) {
        return !0;
      }
    },
    la = !oa(function () {
      return (
        7 !=
        Object.defineProperty({}, "a", {
          get: function () {
            return 7;
          }
        }).a
      );
    }),
    oi = {}.propertyIsEnumerable,
    pi = Object.getOwnPropertyDescriptor,
    Qd =
      pi && !oi.call({ 1: 2 }, 1)
        ? function (c) {
            c = pi(this, c);
            return !!c && c.enumerable;
          }
        : oi,
    gc = function (c, a) {
      return {
        enumerable: !(1 & c),
        configurable: !(2 & c),
        writable: !(4 & c),
        value: a
      };
    },
    pm = {}.toString,
    Eb = function (c) {
      return pm.call(c).slice(8, -1);
    },
    qm = "".split,
    Rd = oa(function () {
      return !Object("z").propertyIsEnumerable(0);
    })
      ? function (c) {
          return "String" == Eb(c) ? qm.call(c, "") : Object(c);
        }
      : Object,
    hc = function (c) {
      if (null == c) throw TypeError("Can't call method on " + c);
      return c;
    },
    db = function (c) {
      return Rd(hc(c));
    },
    xa = function (c) {
      return "object" == typeof c ? null !== c : "function" == typeof c;
    },
    Dc = function (c, a) {
      if (!xa(c)) return c;
      var b, d;
      if (
        (a && "function" == typeof (b = c.toString) && !xa((d = b.call(c)))) ||
        ("function" == typeof (b = c.valueOf) && !xa((d = b.call(c)))) ||
        (!a && "function" == typeof (b = c.toString) && !xa((d = b.call(c))))
      )
        return d;
      throw TypeError("Can't convert object to primitive value");
    },
    rm = {}.hasOwnProperty,
    U = function (c, a) {
      return rm.call(c, a);
    },
    Ec = J.document,
    Sd = xa(Ec) && xa(Ec.createElement),
    qi =
      !la &&
      !oa(function () {
        return (
          7 !=
          Object.defineProperty(Sd ? Ec.createElement("div") : {}, "a", {
            get: function () {
              return 7;
            }
          }).a
        );
      }),
    ri = Object.getOwnPropertyDescriptor,
    Fc = la
      ? ri
      : function (c, a) {
          if (((c = db(c)), (a = Dc(a, !0)), qi))
            try {
              return ri(c, a);
            } catch (b) {}
          if (U(c, a)) return gc(!Qd.call(c, a), c[a]);
        },
    sm = /#|\.prototype\./,
    Gc = function (c, a) {
      c = tm[um(c)];
      return c == vm || (c != wm && ("function" == typeof a ? oa(a) : !!a));
    },
    um = (Gc.normalize = function (c) {
      return String(c).replace(sm, ".").toLowerCase();
    }),
    tm = (Gc.data = {}),
    wm = (Gc.NATIVE = "N"),
    vm = (Gc.POLYFILL = "P"),
    fa = {},
    mb = function (c) {
      if ("function" != typeof c)
        throw TypeError(String(c) + " is not a function");
      return c;
    },
    ic = function (c, a, b) {
      if ((mb(c), void 0 === a)) return c;
      switch (b) {
        case 0:
          return function () {
            return c.call(a);
          };
        case 1:
          return function (b) {
            return c.call(a, b);
          };
        case 2:
          return function (b, e) {
            return c.call(a, b, e);
          };
        case 3:
          return function (b, e, f) {
            return c.call(a, b, e, f);
          };
      }
      return function () {
        return c.apply(a, arguments);
      };
    },
    Oa = function (c) {
      if (!xa(c)) throw TypeError(String(c) + " is not an object");
      return c;
    },
    si = Object.defineProperty,
    eb = {
      f: la
        ? si
        : function (c, a, b) {
            if ((Oa(c), (a = Dc(a, !0)), Oa(b), qi))
              try {
                return si(c, a, b);
              } catch (d) {}
            if ("get" in b || "set" in b)
              throw TypeError("Accessors not supported");
            return "value" in b && (c[a] = b.value), c;
          }
    },
    nb = la
      ? function (c, a, b) {
          return eb.f(c, a, gc(1, b));
        }
      : function (c, a, b) {
          return (c[a] = b), c;
        },
    xm = Fc,
    ym = function (c) {
      var a = function (a, d, e) {
        if (this instanceof c) {
          switch (arguments.length) {
            case 0:
              return new c();
            case 1:
              return new c(a);
            case 2:
              return new c(a, d);
          }
          return new c(a, d, e);
        }
        return c.apply(this, arguments);
      };
      return (a.prototype = c.prototype), a;
    },
    K = function (c, a) {
      var b,
        d,
        e,
        f,
        g,
        h = c.target,
        q = c.global,
        y = c.stat,
        k = c.proto,
        qa = q ? J : y ? J[h] : (J[h] || {}).prototype,
        x = q ? fa : fa[h] || (fa[h] = {}),
        l = x.prototype;
      for (d in a) {
        var n =
          !Gc(q ? d : h + (y ? "." : "#") + d, c.forced) && qa && U(qa, d);
        var m = x[d];
        n && (e = c.noTargetGet ? (g = xm(qa, d)) && g.value : qa[d]);
        var p = n && e ? e : a[d];
        (n && typeof m == typeof p) ||
          ((f =
            c.bind && n
              ? ic(p, J)
              : c.wrap && n
              ? ym(p)
              : k && "function" == typeof p
              ? ic(Function.call, p)
              : p),
          (c.sham || (p && p.sham) || (m && m.sham)) && nb(f, "sham", !0),
          (x[d] = f),
          k &&
            (U(fa, (b = h + "Prototype")) || nb(fa, b, {}),
            (fa[b][d] = p),
            c.real && l && !l[d] && nb(l, d, p)));
      }
    },
    ti = function (c) {
      return "function" == typeof c ? c : void 0;
    },
    Mb = function (c, a) {
      return 2 > arguments.length
        ? ti(fa[c]) || ti(J[c])
        : (fa[c] && fa[c][a]) || (J[c] && J[c][a]);
    },
    Td = Mb("JSON", "stringify"),
    zm = /[\uD800-\uDFFF]/g,
    ui = /^[\uD800-\uDBFF]$/,
    vi = /^[\uDC00-\uDFFF]$/,
    Am = function (c, a, b) {
      var d = b.charAt(a - 1);
      a = b.charAt(a + 1);
      return (ui.test(c) && !vi.test(a)) || (vi.test(c) && !ui.test(d))
        ? "\\u" + c.charCodeAt(0).toString(16)
        : c;
    },
    Bm = oa(function () {
      return (
        '"\\udf06\\ud834"' !== Td("\udf06\ud834") ||
        '"\\udead"' !== Td("\udead")
      );
    });
  Td &&
    K(
      { target: "JSON", stat: !0, forced: Bm },
      {
        stringify: function (c, a, b) {
          var d = Td.apply(null, arguments);
          return "string" == typeof d ? d.replace(zm, Am) : d;
        }
      }
    );
  fa.JSON || (fa.JSON = { stringify: JSON.stringify });
  var w = function (c, a, b) {
    return fa.JSON.stringify.apply(null, arguments);
  };
  window.process = { env: { DEBUG: void 0 } };
  var Hc = {},
    Cm = 0,
    Dm = Math.random(),
    Ud = function (c) {
      return (
        "Symbol(" +
        String(void 0 === c ? "" : c) +
        ")_" +
        (++Cm + Dm).toString(36)
      );
    },
    Em = !oa(function () {
      return Object.isExtensible(Object.preventExtensions({}));
    }),
    wi = Ka(function (c) {
      var a = eb.f,
        b = Ud("meta"),
        d = 0,
        e =
          Object.isExtensible ||
          function () {
            return !0;
          },
        f = function (c) {
          a(c, b, { value: { objectID: "O" + ++d, weakData: {} } });
        },
        g = (c.exports = {
          REQUIRED: !1,
          fastKey: function (a, c) {
            if (!xa(a))
              return "symbol" == typeof a
                ? a
                : ("string" == typeof a ? "S" : "P") + a;
            if (!U(a, b)) {
              if (!e(a)) return "F";
              if (!c) return "E";
              f(a);
            }
            return a[b].objectID;
          },
          getWeakData: function (a, c) {
            if (!U(a, b)) {
              if (!e(a)) return !0;
              if (!c) return !1;
              f(a);
            }
            return a[b].weakData;
          },
          onFreeze: function (a) {
            return Em && g.REQUIRED && e(a) && !U(a, b) && f(a), a;
          }
        });
      Hc[b] = !0;
    }),
    Fm = function (c, a) {
      try {
        nb(J, c, a);
      } catch (b) {
        J[c] = a;
      }
      return a;
    },
    xi = J["__core-js_shared__"] || Fm("__core-js_shared__", {}),
    Nb = Ka(function (c) {
      (c.exports = function (a, b) {
        return xi[a] || (xi[a] = void 0 !== b ? b : {});
      })("versions", []).push({
        version: "3.4.3",
        mode: "pure",
        copyright: "\u00a9 2019 Denis Pushkarev (zloirock.ru)"
      });
    }),
    Fb =
      !!Object.getOwnPropertySymbols &&
      !oa(function () {
        return !String(Symbol());
      }),
    yi = Fb && !Symbol.sham && "symbol" == typeof Symbol(),
    Vd = Nb("wks"),
    nf = J.Symbol,
    Gm = yi ? nf : Ud,
    sa = function (c) {
      return (
        U(Vd, c) ||
          (Fb && U(nf, c) ? (Vd[c] = nf[c]) : (Vd[c] = Gm("Symbol." + c))),
        Vd[c]
      );
    },
    Ob = {},
    Hm = sa("iterator"),
    Im = Array.prototype,
    zi = function (c) {
      return void 0 !== c && (Ob.Array === c || Im[Hm] === c);
    },
    Jm = Math.ceil,
    Km = Math.floor,
    Wd = function (c) {
      return isNaN((c = +c)) ? 0 : (0 < c ? Km : Jm)(c);
    },
    Lm = Math.min,
    ob = function (c) {
      return 0 < c ? Lm(Wd(c), 9007199254740991) : 0;
    },
    Mm = sa("toStringTag"),
    Ai = {};
  Ai[Mm] = "z";
  var of = "[object z]" === String(Ai),
    Nm = sa("toStringTag"),
    Om =
      "Arguments" ==
      Eb(
        (function () {
          return arguments;
        })()
      ),
    Xd = of
      ? Eb
      : function (c) {
          var a;
          if (void 0 === c) var b = "Undefined";
          else {
            if (null === c) var d = "Null";
            else {
              a: {
                var e = (c = Object(c));
                try {
                  d = e[Nm];
                  break a;
                } catch (f) {}
                d = void 0;
              }
              d =
                "string" == typeof (b = d)
                  ? b
                  : Om
                  ? Eb(c)
                  : "Object" == (a = Eb(c)) && "function" == typeof c.callee
                  ? "Arguments"
                  : a;
            }
            b = d;
          }
          return b;
        },
    Pm = sa("iterator"),
    Bi = function (c) {
      if (null != c) return c[Pm] || c["@@iterator"] || Ob[Xd(c)];
    },
    Ci = function (c, a, b, d) {
      try {
        return d ? a(Oa(b)[0], b[1]) : a(b);
      } catch (e) {
        throw ((a = c.return), void 0 !== a && Oa(a.call(c)), e);
      }
    },
    gd = Ka(function (c) {
      var a = function (a, c) {
        this.stopped = a;
        this.result = c;
      };
      (c.exports = function (b, c, e, f, g) {
        var d, q;
        c = ic(c, e, f ? 2 : 1);
        if (!g) {
          if ("function" != typeof (g = Bi(b)))
            throw TypeError("Target is not iterable");
          if (zi(g)) {
            g = 0;
            for (e = ob(b.length); e > g; g++)
              if (
                (d = f ? c(Oa((q = b[g]))[0], q[1]) : c(b[g])) &&
                d instanceof a
              )
                return d;
            return new a(!1);
          }
          b = g.call(b);
        }
        for (g = b.next; !(q = g.call(b)).done; )
          if (
            "object" == typeof (d = Ci(b, c, q.value, f)) &&
            d &&
            d instanceof a
          )
            return d;
        return new a(!1);
      }).stop = function (b) {
        return new a(!0, b);
      };
    }),
    pf = function (c, a, b) {
      if (!(c instanceof a))
        throw TypeError("Incorrect " + (b ? b + " " : "") + "invocation");
      return c;
    },
    Qm = of
      ? {}.toString
      : function () {
          return "[object " + Xd(this) + "]";
        },
    Rm = eb.f,
    Di = sa("toStringTag"),
    hd = function (c, a, b, d) {
      c &&
        ((c = b ? c : c.prototype),
        U(c, Di) || Rm(c, Di, { configurable: !0, value: a }),
        d && !of && nb(c, "toString", Qm));
    },
    pb = function (c) {
      return Object(hc(c));
    },
    jc =
      Array.isArray ||
      function (c) {
        return "Array" == Eb(c);
      },
    Sm = sa("species"),
    qf = function (c, a) {
      var b;
      return (
        jc(c) &&
          ("function" != typeof (b = c.constructor) ||
          (b !== Array && !jc(b.prototype))
            ? xa(b) && null === (b = b[Sm]) && (b = void 0)
            : (b = void 0)),
        new (void 0 === b ? Array : b)(0 === a ? 0 : a)
      );
    },
    Tm = [].push,
    kc = function (c) {
      var a = 1 == c,
        b = 2 == c,
        d = 3 == c,
        e = 4 == c,
        f = 6 == c,
        g = 5 == c || f;
      return function (h, q, y, k) {
        var T,
          x,
          l = pb(h),
          n = Rd(l);
        q = ic(q, y, 3);
        y = ob(n.length);
        var m = 0;
        k = k || qf;
        for (h = a ? k(h, y) : b ? k(h, 0) : void 0; y > m; m++)
          if ((g || m in n) && ((x = q((T = n[m]), m, l)), c))
            if (a) h[m] = x;
            else if (x)
              switch (c) {
                case 3:
                  return !0;
                case 5:
                  return T;
                case 6:
                  return m;
                case 2:
                  Tm.call(h, T);
              }
            else if (e) return !1;
        return f ? -1 : d || e ? e : h;
      };
    },
    Ic = kc(0),
    Um = kc(1),
    Vm = kc(2),
    Wm = kc(3);
  kc(4);
  var Xm = kc(5);
  kc(6);
  var Ym = Nb("native-function-to-string", Function.toString),
    Ei = J.WeakMap,
    Zm = "function" == typeof Ei && /native code/.test(Ym.call(Ei)),
    Fi = Nb("keys"),
    Yd = function (c) {
      return Fi[c] || (Fi[c] = Ud(c));
    },
    $m = J.WeakMap;
  if (Zm) {
    var Jc = new $m(),
      an = Jc.get,
      bn = Jc.has,
      cn = Jc.set;
    var rf = function (c, a) {
      return cn.call(Jc, c, a), a;
    };
    var Zd = function (c) {
      return an.call(Jc, c) || {};
    };
    var sf = function (c) {
      return bn.call(Jc, c);
    };
  } else {
    var id = Yd("state");
    Hc[id] = !0;
    rf = function (c, a) {
      return nb(c, id, a), a;
    };
    Zd = function (c) {
      return U(c, id) ? c[id] : {};
    };
    sf = function (c) {
      return U(c, id);
    };
  }
  var ab = {
      set: rf,
      get: Zd,
      has: sf,
      enforce: function (c) {
        return sf(c) ? Zd(c) : rf(c, {});
      },
      getterFor: function (c) {
        return function (a) {
          var b;
          if (!xa(a) || (b = Zd(a)).type !== c)
            throw TypeError("Incompatible receiver, " + c + " required");
          return b;
        };
      }
    },
    dn = eb.f,
    en = ab.set,
    fn = ab.getterFor,
    gn = Math.max,
    hn = Math.min,
    $d = function (c, a) {
      c = Wd(c);
      return 0 > c ? gn(c + a, 0) : hn(c, a);
    },
    Gi = function (c) {
      return function (a, b, d) {
        var e;
        a = db(a);
        var f = ob(a.length);
        d = $d(d, f);
        if (c && b != b)
          for (; f > d; ) {
            if ((e = a[d++]) != e) return !0;
          }
        else
          for (; f > d; d++)
            if ((c || d in a) && a[d] === b) return c || d || 0;
        return !c && -1;
      };
    },
    jn = Gi(!0),
    Hi = Gi(!1),
    Ii = function (c, a) {
      var b;
      c = db(c);
      var d = 0,
        e = [];
      for (b in c) !U(Hc, b) && U(c, b) && e.push(b);
      for (; a.length > d; ) U(c, (b = a[d++])) && (~Hi(e, b) || e.push(b));
      return e;
    },
    ae =
      "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
        " "
      ),
    Xb =
      Object.keys ||
      function (c) {
        return Ii(c, ae);
      },
    Ji = la
      ? Object.defineProperties
      : function (c, a) {
          Oa(c);
          for (var b, d = Xb(a), e = d.length, f = 0; e > f; )
            eb.f(c, (b = d[f++]), a[b]);
          return c;
        },
    tf = Mb("document", "documentElement"),
    Ki = Yd("IE_PROTO"),
    uf = function () {},
    be = function () {
      var c = Sd ? Ec.createElement("iframe") : {};
      var a = ae.length;
      c.style.display = "none";
      tf.appendChild(c);
      c.src = "javascript:";
      (c = c.contentWindow.document).open();
      c.write("<script>document.F=Object\x3c/script>");
      c.close();
      for (be = c.F; a--; ) delete be.prototype[ae[a]];
      return be();
    },
    lc =
      Object.create ||
      function (c, a) {
        var b;
        return (
          null !== c
            ? ((uf.prototype = Oa(c)),
              (b = new uf()),
              (uf.prototype = null),
              (b[Ki] = c))
            : (b = be()),
          void 0 === a ? b : Ji(b, a)
        );
      };
  Hc[Ki] = !0;
  var vf = function (c, a, b, d) {
      d && d.enumerable ? (c[a] = b) : nb(c, a, b);
    },
    wf = function (c, a, b) {
      for (var d in a)
        b && b.unsafe && c[d] ? (c[d] = a[d]) : vf(c, d, a[d], b);
      return c;
    },
    kn = !oa(function () {
      function c() {}
      return (
        (c.prototype.constructor = null),
        Object.getPrototypeOf(new c()) !== c.prototype
      );
    }),
    Li = Yd("IE_PROTO"),
    ln = Object.prototype,
    xf = kn
      ? Object.getPrototypeOf
      : function (c) {
          return (
            (c = pb(c)),
            U(c, Li)
              ? c[Li]
              : "function" == typeof c.constructor && c instanceof c.constructor
              ? c.constructor.prototype
              : c instanceof Object
              ? ln
              : null
          );
        };
  sa("iterator");
  var Mi = !1,
    ce,
    yf,
    zf;
  [].keys &&
    ((zf = [].keys()),
    "next" in zf
      ? ((yf = xf(xf(zf))), yf !== Object.prototype && (ce = yf))
      : (Mi = !0));
  null == ce && (ce = {});
  var Ni = ce,
    de = Mi,
    mn = function () {
      return this;
    },
    nn = function (c, a, b) {
      a += " Iterator";
      return (
        (c.prototype = lc(Ni, { next: gc(1, b) })),
        hd(c, a, !1, !0),
        (Ob[a] = mn),
        c
      );
    };
  Object.setPrototypeOf ||
    ("__proto__" in {} &&
      (function () {
        var c,
          a = !1,
          b = {};
        try {
          (c = Object.getOwnPropertyDescriptor(
            Object.prototype,
            "__proto__"
          ).set).call(b, []),
            (a = b instanceof Array);
        } catch (d) {}
        return function (b, e) {
          Oa(b);
          if (!xa(e) && null !== e)
            throw TypeError("Can't set " + String(e) + " as a prototype");
          return a ? c.call(b, e) : (b.__proto__ = e), b;
        };
      })());
  var Af = sa("iterator"),
    on = function () {
      return this;
    },
    Bf = function (c, a, b, d, e, f, g) {
      nn(b, a, d);
      var h, q, y;
      d = function (a) {
        if (a === e && m) return m;
        if (!de && a in x) return x[a];
        switch (a) {
          case "keys":
          case "values":
          case "entries":
            return function () {
              return new b(this, a);
            };
        }
        return function () {
          return new b(this);
        };
      };
      var k = a + " Iterator",
        l = !1,
        x = c.prototype,
        n = x[Af] || x["@@iterator"] || (e && x[e]),
        m = (!de && n) || d(e),
        p = ("Array" == a && x.entries) || n;
      if (
        (p &&
          ((h = xf(p.call(new c()))),
          Ni !== Object.prototype &&
            h.next &&
            (hd(h, k, !0, !0), (Ob[k] = on))),
        "values" == e &&
          n &&
          "values" !== n.name &&
          ((l = !0),
          (m = function () {
            return n.call(this);
          })),
        g && x[Af] !== m && nb(x, Af, m),
        (Ob[a] = m),
        e)
      )
        if (
          ((q = {
            values: d("values"),
            keys: f ? m : d("keys"),
            entries: d("entries")
          }),
          g)
        )
          for (y in q) (!de && !l && y in x) || vf(x, y, q[y]);
        else K({ target: a, proto: !0, forced: de || l }, q);
      return q;
    },
    Oi = sa("species"),
    Pi = function (c) {
      c = Mb(c);
      var a = eb.f;
      la &&
        c &&
        !c[Oi] &&
        a(c, Oi, {
          configurable: !0,
          get: function () {
            return this;
          }
        });
    },
    pn = eb.f,
    Qi = wi.fastKey,
    Ri = ab.set,
    Cf = ab.getterFor;
  (function (c, a, b) {
    var d = -1 !== c.indexOf("Map"),
      e = -1 !== c.indexOf("Weak"),
      f = d ? "set" : "add",
      g = J[c],
      h = g && g.prototype,
      q = {};
    if (
      la &&
      "function" == typeof g &&
      (e ||
        (h.forEach &&
          !oa(function () {
            new g().entries().next();
          })))
    ) {
      var y = a(function (a, b) {
        en(pf(a, y, c), { type: c, collection: new g() });
        null != b && gd(b, a[f], a, d);
      });
      var k = fn(c);
      Ic(
        "add clear delete forEach get has set keys values entries".split(" "),
        function (a) {
          var b = "add" == a || "set" == a;
          !(a in h) ||
            (e && "clear" == a) ||
            nb(y.prototype, a, function (c, d) {
              var g = k(this).collection;
              if (!b && e && !xa(c)) return "get" == a && void 0;
              c = g[a](0 === c ? 0 : c, d);
              return b ? this : c;
            });
        }
      );
      e ||
        dn(y.prototype, "size", {
          configurable: !0,
          get: function () {
            return k(this).collection.size;
          }
        });
    } else (y = b.getConstructor(a, c, d, f)), (wi.REQUIRED = !0);
    return (
      hd(y, c, !1, !0),
      (q[c] = y),
      K({ global: !0, forced: !0 }, q),
      e || b.setStrong(y, c, d),
      y
    );
  })(
    "Map",
    function (c) {
      return function () {
        return c(this, arguments.length ? arguments[0] : void 0);
      };
    },
    {
      getConstructor: function (c, a, b, d) {
        var e = c(function (c, g) {
            pf(c, e, a);
            Ri(c, {
              type: a,
              index: lc(null),
              first: void 0,
              last: void 0,
              size: 0
            });
            la || (c.size = 0);
            null != g && gd(g, c[d], c, b);
          }),
          f = Cf(a),
          g = function (a, b, c) {
            var d,
              e,
              g = f(a),
              q = h(a, b);
            return (
              q
                ? (q.value = c)
                : ((g.last = q =
                    {
                      index: (e = Qi(b, !0)),
                      key: b,
                      value: c,
                      previous: (d = g.last),
                      next: void 0,
                      removed: !1
                    }),
                  g.first || (g.first = q),
                  d && (d.next = q),
                  la ? g.size++ : a.size++,
                  "F" !== e && (g.index[e] = q)),
              a
            );
          },
          h = function (a, b) {
            a = f(a);
            var c = Qi(b);
            if ("F" !== c) return a.index[c];
            for (a = a.first; a; a = a.next) if (a.key == b) return a;
          };
        return (
          wf(e.prototype, {
            clear: function () {
              for (var a = f(this), b = a.index, c = a.first; c; )
                (c.removed = !0),
                  c.previous && (c.previous = c.previous.next = void 0),
                  delete b[c.index],
                  (c = c.next);
              a.first = a.last = void 0;
              la ? (a.size = 0) : (this.size = 0);
            },
            delete: function (a) {
              var b = f(this);
              if ((a = h(this, a))) {
                var c = a.next,
                  d = a.previous;
                delete b.index[a.index];
                a.removed = !0;
                d && (d.next = c);
                c && (c.previous = d);
                b.first == a && (b.first = c);
                b.last == a && (b.last = d);
                la ? b.size-- : this.size--;
              }
              return !!a;
            },
            forEach: function (a) {
              for (
                var b,
                  c = f(this),
                  d = ic(a, 1 < arguments.length ? arguments[1] : void 0, 3);
                (b = b ? b.next : c.first);

              )
                for (d(b.value, b.key, this); b && b.removed; ) b = b.previous;
            },
            has: function (a) {
              return !!h(this, a);
            }
          }),
          wf(
            e.prototype,
            b
              ? {
                  get: function (a) {
                    return (a = h(this, a)) && a.value;
                  },
                  set: function (a, b) {
                    return g(this, 0 === a ? 0 : a, b);
                  }
                }
              : {
                  add: function (a) {
                    return g(this, (a = 0 === a ? 0 : a), a);
                  }
                }
          ),
          la &&
            pn(e.prototype, "size", {
              get: function () {
                return f(this).size;
              }
            }),
          e
        );
      },
      setStrong: function (c, a, b) {
        var d = a + " Iterator",
          e = Cf(a),
          f = Cf(d);
        Bf(
          c,
          a,
          function (a, b) {
            Ri(this, {
              type: d,
              target: a,
              state: e(a),
              kind: b,
              last: void 0
            });
          },
          function () {
            for (var a = f(this), b = a.kind, c = a.last; c && c.removed; )
              c = c.previous;
            return a.target && (a.last = c = c ? c.next : a.state.first)
              ? "keys" == b
                ? { value: c.key, done: !1 }
                : "values" == b
                ? { value: c.value, done: !1 }
                : { value: [c.key, c.value], done: !1 }
              : ((a.target = void 0), { value: void 0, done: !0 });
          },
          b ? "entries" : "values",
          !b,
          !0
        );
        Pi(a);
      }
    }
  );
  var Si = function (c) {
      return function (a, b) {
        var d, e;
        a = String(hc(a));
        b = Wd(b);
        var f = a.length;
        return 0 > b || b >= f
          ? c
            ? ""
            : void 0
          : 55296 > (d = a.charCodeAt(b)) ||
            56319 < d ||
            b + 1 === f ||
            56320 > (e = a.charCodeAt(b + 1)) ||
            57343 < e
          ? c
            ? a.charAt(b)
            : d
          : c
          ? a.slice(b, b + 2)
          : e - 56320 + ((d - 55296) << 10) + 65536;
      };
    },
    qn = { codeAt: Si(!1), charAt: Si(!0) }.charAt,
    rn = ab.set,
    sn = ab.getterFor("String Iterator");
  Bf(
    String,
    "String",
    function (c) {
      rn(this, { type: "String Iterator", string: String(c), index: 0 });
    },
    function () {
      var c,
        a = sn(this),
        b = a.string,
        d = a.index;
      return d >= b.length
        ? { value: void 0, done: !0 }
        : ((c = qn(b, d)), (a.index += c.length), { value: c, done: !1 });
    }
  );
  var tn = ab.set,
    un = ab.getterFor("Array Iterator");
  Bf(
    Array,
    "Array",
    function (c, a) {
      tn(this, { type: "Array Iterator", target: db(c), index: 0, kind: a });
    },
    function () {
      var c = un(this),
        a = c.target,
        b = c.kind,
        d = c.index++;
      return !a || d >= a.length
        ? ((c.target = void 0), { value: void 0, done: !0 })
        : "keys" == b
        ? { value: d, done: !1 }
        : "values" == b
        ? { value: a[d], done: !1 }
        : { value: [d, a[d]], done: !1 };
    },
    "values"
  );
  Ob.Arguments = Ob.Array;
  var vn = {
      CSSRuleList: 0,
      CSSStyleDeclaration: 0,
      CSSValueList: 0,
      ClientRectList: 0,
      DOMRectList: 0,
      DOMStringList: 0,
      DOMTokenList: 1,
      DataTransferItemList: 0,
      FileList: 0,
      HTMLAllCollection: 0,
      HTMLCollection: 0,
      HTMLFormElement: 0,
      HTMLSelectElement: 0,
      MediaList: 0,
      MimeTypeArray: 0,
      NamedNodeMap: 0,
      NodeList: 1,
      PaintRequestList: 0,
      Plugin: 0,
      PluginArray: 0,
      SVGLengthList: 0,
      SVGNumberList: 0,
      SVGPathSegList: 0,
      SVGPointList: 0,
      SVGStringList: 0,
      SVGTransformList: 0,
      SourceBufferList: 0,
      StyleSheetList: 0,
      TextTrackCueList: 0,
      TextTrackList: 0,
      TouchList: 0
    },
    Ti = sa("toStringTag"),
    ee;
  for (ee in vn) {
    var Ui = J[ee],
      Df = Ui && Ui.prototype;
    Df && !Df[Ti] && nb(Df, Ti, ee);
    Ob[ee] = Ob.Array;
  }
  var Y = fa.Map,
    wn = sa("match"),
    Ef = function (c) {
      var a;
      if (xa(c) && (void 0 !== (a = c[wn]) ? a : "RegExp" == Eb(c)))
        throw TypeError("The method doesn't accept regular expressions");
      return c;
    },
    xn = sa("match"),
    Ff = function (c) {
      var a = /./;
      try {
        "/./"[c](a);
      } catch (b) {
        try {
          return (a[xn] = !1), "/./"[c](a);
        } catch (d) {}
      }
      return !1;
    },
    Vi = "".endsWith,
    yn = Math.min,
    zn = Ff("endsWith");
  K(
    { target: "String", proto: !0, forced: !zn },
    {
      endsWith: function (c) {
        var a = String(hc(this));
        Ef(c);
        var b = 1 < arguments.length ? arguments[1] : void 0,
          d = ob(a.length);
        b = void 0 === b ? d : yn(ob(b), d);
        d = String(c);
        return Vi ? Vi.call(a, d, b) : a.slice(b - d.length, b) === d;
      }
    }
  );
  var Aa = function (c) {
      return fa[c + "Prototype"];
    },
    An = Aa("String").endsWith,
    Wi = String.prototype,
    zg = function (c) {
      var a = c.endsWith;
      return "string" == typeof c ||
        c === Wi ||
        (c instanceof String && a === Wi.endsWith)
        ? An
        : a;
    },
    jd = function (c, a) {
      var b = [][c];
      return (
        !b ||
        !oa(function () {
          b.call(
            null,
            a ||
              function () {
                throw 1;
              },
            1
          );
        })
      );
    },
    Xi = jd("forEach")
      ? function (c) {
          return Ic(this, c, 1 < arguments.length ? arguments[1] : void 0);
        }
      : [].forEach;
  K({ target: "Array", proto: !0, forced: [].forEach != Xi }, { forEach: Xi });
  var Bn = Aa("Array").forEach,
    Yi = Array.prototype,
    Cn = { DOMTokenList: !0, NodeList: !0 },
    r = function (c) {
      var a = c.forEach;
      return c === Yi ||
        (c instanceof Array && a === Yi.forEach) ||
        Cn.hasOwnProperty(Xd(c))
        ? Bn
        : a;
    },
    kd = { f: Object.getOwnPropertySymbols },
    fe = Object.assign,
    Zi =
      !fe ||
      oa(function () {
        var c = {},
          a = {},
          b = Symbol();
        return (
          (c[b] = 7),
          "abcdefghijklmnopqrst".split("").forEach(function (b) {
            a[b] = b;
          }),
          7 != fe({}, c)[b] || "abcdefghijklmnopqrst" != Xb(fe({}, a)).join("")
        );
      })
        ? function (c, a) {
            for (
              var b = pb(c), d = arguments.length, e = 1, f = kd.f, g = Qd;
              d > e;

            )
              for (
                var h,
                  q = Rd(arguments[e++]),
                  y = f ? Xb(q).concat(f(q)) : Xb(q),
                  k = y.length,
                  l = 0;
                k > l;

              )
                (h = y[l++]), (la && !g.call(q, h)) || (b[h] = q[h]);
            return b;
          }
        : fe;
  K(
    { target: "Object", stat: !0, forced: Object.assign !== Zi },
    { assign: Zi }
  );
  var Wa = fa.Object.assign,
    Dn = oa(function () {
      Xb(1);
    });
  K(
    { target: "Object", stat: !0, forced: Dn },
    {
      keys: function (c) {
        return Xb(pb(c));
      }
    }
  );
  var V = fa.Object.keys,
    $i = function (c) {
      return function (a, b, d, e) {
        mb(b);
        a = pb(a);
        var f = Rd(a),
          g = ob(a.length),
          h = c ? g - 1 : 0,
          q = c ? -1 : 1;
        if (2 > d)
          for (;;) {
            if (h in f) {
              e = f[h];
              h += q;
              break;
            }
            if (((h += q), c ? 0 > h : g <= h))
              throw TypeError("Reduce of empty array with no initial value");
          }
        for (; c ? 0 <= h : g > h; h += q) h in f && (e = b(e, f[h], h, a));
        return e;
      };
    },
    En = { left: $i(!1), right: $i(!0) }.left;
  K(
    { target: "Array", proto: !0, forced: jd("reduce") },
    {
      reduce: function (c) {
        return En(
          this,
          c,
          arguments.length,
          1 < arguments.length ? arguments[1] : void 0
        );
      }
    }
  );
  var Fn = Aa("Array").reduce,
    aj = Array.prototype,
    xe = function (c) {
      var a = c.reduce;
      return c === aj || (c instanceof Array && a === aj.reduce) ? Fn : a;
    };
  K(
    { target: "Object", stat: !0, forced: !la, sham: !la },
    { defineProperty: eb.f }
  );
  var bj = Ka(function (c) {
      var a = fa.Object;
      c = c.exports = function (b, c, e) {
        return a.defineProperty(b, c, e);
      };
      a.defineProperty.sham && (c.sham = !0);
    }),
    ba = bj,
    Gn =
      /^[\t\n\x0B\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff][\t\n\x0B\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff]*/,
    Hn =
      /[\t\n\x0B\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff][\t\n\x0B\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff]*$/,
    Gf = function (c) {
      return function (a) {
        a = String(hc(a));
        return (
          1 & c && (a = a.replace(Gn, "")), 2 & c && (a = a.replace(Hn, "")), a
        );
      };
    };
  Gf(1);
  Gf(2);
  var cj = Gf(3),
    ge = J.parseInt,
    In = /^[+-]?0[Xx]/,
    dj =
      8 !==
        ge(
          "\t\n\x0B\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff08"
        ) ||
      22 !==
        ge(
          "\t\n\x0B\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff0x16"
        )
        ? function (c, a) {
            c = cj(String(c));
            return ge(c, a >>> 0 || (In.test(c) ? 16 : 10));
          }
        : ge;
  K({ global: !0, forced: parseInt != dj }, { parseInt: dj });
  var S = fa.parseInt;
  let wg = !0,
    xg = !0;
  var ej = Fc,
    Jn = oa(function () {
      ej(1);
    });
  K(
    { target: "Object", stat: !0, forced: !la || Jn, sham: !la },
    {
      getOwnPropertyDescriptor: function (c, a) {
        return ej(db(c), a);
      }
    }
  );
  var ca = Ka(function (c) {
      var a = fa.Object;
      c = c.exports = function (b, c) {
        return a.getOwnPropertyDescriptor(b, c);
      };
      a.getOwnPropertyDescriptor.sham && (c.sham = !0);
    }),
    mc = function (c, a, b) {
      a = Dc(a);
      a in c ? eb.f(c, a, gc(0, b)) : (c[a] = b);
    },
    ld = Mb("navigator", "userAgent") || "",
    fj = J.process,
    gj = fj && fj.versions,
    hj = gj && gj.v8,
    Pb,
    he;
  hj
    ? ((Pb = hj.split(".")), (he = Pb[0] + Pb[1]))
    : ld &&
      ((Pb = ld.match(/Edge\/(\d+)/)),
      (!Pb || 74 <= Pb[1]) &&
        ((Pb = ld.match(/Chrome\/(\d+)/)), Pb && (he = Pb[1])));
  var ie = he && +he,
    Kn = sa("species"),
    md = function (c) {
      return (
        51 <= ie ||
        !oa(function () {
          var a = [];
          return (
            ((a.constructor = {})[Kn] = function () {
              return { foo: 1 };
            }),
            1 !== a[c](Boolean).foo
          );
        })
      );
    },
    ij = sa("isConcatSpreadable"),
    Ln =
      51 <= ie ||
      !oa(function () {
        var c = [];
        return (c[ij] = !1), c.concat()[0] !== c;
      }),
    Mn = md("concat");
  K(
    { target: "Array", proto: !0, forced: !Ln || !Mn },
    {
      concat: function (c) {
        var a,
          b,
          d = pb(this),
          e = qf(d, 0),
          f = 0;
        var g = -1;
        for (a = arguments.length; g < a; g++) {
          var h = (b = -1 === g ? d : arguments[g]);
          if (xa(h)) {
            var q = h[ij];
            h = void 0 !== q ? !!q : jc(h);
          } else h = !1;
          if (h) {
            if (9007199254740991 < f + (q = ob(b.length)))
              throw TypeError("Maximum allowed index exceeded");
            for (h = 0; h < q; h++, f++) h in b && mc(e, f, b[h]);
          } else {
            if (9007199254740991 <= f)
              throw TypeError("Maximum allowed index exceeded");
            mc(e, f++, b);
          }
        }
        return (e.length = f), e;
      }
    }
  );
  var Nn = Aa("Array").concat,
    jj = Array.prototype,
    n = function (c) {
      var a = c.concat;
      return c === jj || (c instanceof Array && a === jj.concat) ? Nn : a;
    };
  K(
    { target: "Array", proto: !0, forced: !md("filter") },
    {
      filter: function (c) {
        return Vm(this, c, 1 < arguments.length ? arguments[1] : void 0);
      }
    }
  );
  var On = Aa("Array").filter,
    kj = Array.prototype,
    M = function (c) {
      var a = c.filter;
      return c === kj || (c instanceof Array && a === kj.filter) ? On : a;
    },
    Pn = J.Promise,
    lj = sa("iterator"),
    mj = !1;
  try {
    var Qn = 0,
      nj = {
        next: function () {
          return { done: !!Qn++ };
        },
        return: function () {
          mj = !0;
        }
      };
    nj[lj] = function () {
      return this;
    };
    Array.from(nj, function () {
      throw 2;
    });
  } catch (c) {}
  var oj = function (c, a) {
      if (!a && !mj) return !1;
      var b = !1;
      try {
        (a = {}),
          (a[lj] = function () {
            return {
              next: function () {
                return { done: (b = !0) };
              }
            };
          }),
          c(a);
      } catch (d) {}
      return b;
    },
    Rn = sa("species"),
    pj = function (c, a) {
      var b;
      c = Oa(c).constructor;
      return void 0 === c || null == (b = Oa(c)[Rn]) ? a : mb(b);
    },
    qj = /(iphone|ipod|ipad).*applewebkit/i.test(ld),
    rj = J.location,
    Hf = J.setImmediate,
    sj = J.clearImmediate,
    tj = J.process,
    uj = J.MessageChannel,
    If = J.Dispatch,
    Jf = 0,
    nd = {},
    Kc,
    Kf,
    Lf,
    Mf = function (c) {
      if (nd.hasOwnProperty(c)) {
        var a = nd[c];
        delete nd[c];
        a();
      }
    },
    Nf = function (c) {
      return function () {
        Mf(c);
      };
    },
    vj = function (c) {
      Mf(c.data);
    },
    wj = function (c) {
      J.postMessage(c + "", rj.protocol + "//" + rj.host);
    };
  (Hf && sj) ||
    ((Hf = function (c) {
      for (var a = [], b = 1; arguments.length > b; ) a.push(arguments[b++]);
      return (
        (nd[++Jf] = function () {
          ("function" == typeof c ? c : Function(c)).apply(void 0, a);
        }),
        Kc(Jf),
        Jf
      );
    }),
    (sj = function (c) {
      delete nd[c];
    }),
    "process" == Eb(tj)
      ? (Kc = function (c) {
          tj.nextTick(Nf(c));
        })
      : If && If.now
      ? (Kc = function (c) {
          If.now(Nf(c));
        })
      : uj && !qj
      ? ((Kf = new uj()),
        (Lf = Kf.port2),
        (Kf.port1.onmessage = vj),
        (Kc = ic(Lf.postMessage, Lf, 1)))
      : !J.addEventListener ||
        "function" != typeof postMessage ||
        J.importScripts ||
        oa(wj)
      ? (Kc =
          "onreadystatechange" in (Sd ? Ec.createElement("script") : {})
            ? function (c) {
                tf.appendChild(
                  Sd ? Ec.createElement("script") : {}
                ).onreadystatechange = function () {
                  tf.removeChild(this);
                  Mf(c);
                };
              }
            : function (c) {
                setTimeout(Nf(c), 0);
              })
      : ((Kc = wj), J.addEventListener("message", vj, !1)));
  var Of = Hf,
    Sn = Fc,
    xj = J.MutationObserver || J.WebKitMutationObserver,
    Pf = J.process,
    Qf = J.Promise,
    yj = "process" == Eb(Pf),
    zj = Sn(J, "queueMicrotask"),
    Aj = zj && zj.value,
    od,
    nc,
    pd,
    Lc,
    Rf,
    Sf,
    Tf,
    Bj;
  Aj ||
    ((od = function () {
      var c;
      for (yj && (c = Pf.domain) && c.exit(); nc; ) {
        var a = nc.fn;
        nc = nc.next;
        try {
          a();
        } catch (b) {
          throw (nc ? Lc() : (pd = void 0), b);
        }
      }
      pd = void 0;
      c && c.enter();
    }),
    yj
      ? (Lc = function () {
          Pf.nextTick(od);
        })
      : xj && !qj
      ? ((Rf = !0),
        (Sf = document.createTextNode("")),
        new xj(od).observe(Sf, { characterData: !0 }),
        (Lc = function () {
          Sf.data = Rf = !Rf;
        }))
      : Qf && Qf.resolve
      ? ((Tf = Qf.resolve(void 0)),
        (Bj = Tf.then),
        (Lc = function () {
          Bj.call(Tf, od);
        }))
      : (Lc = function () {
          Of.call(J, od);
        }));
  var Cj =
      Aj ||
      function (c) {
        c = { fn: c, next: void 0 };
        pd && (pd.next = c);
        nc || ((nc = c), Lc());
        pd = c;
      },
    Tn = function (c) {
      var a, b;
      this.promise = new c(function (c, e) {
        if (void 0 !== a || void 0 !== b)
          throw TypeError("Bad Promise constructor");
        a = c;
        b = e;
      });
      this.resolve = mb(a);
      this.reject = mb(b);
    },
    je = {
      f: function (c) {
        return new Tn(c);
      }
    },
    Uf = function (c, a) {
      if ((Oa(c), xa(a) && a.constructor === c)) return a;
      c = je.f(c);
      return (0, c.resolve)(a), c.promise;
    },
    Un = function (c, a) {
      var b = J.console;
      b && b.error && (1 === arguments.length ? b.error(c) : b.error(c, a));
    },
    ke = function (c) {
      try {
        return { error: !1, value: c() };
      } catch (a) {
        return { error: !0, value: a };
      }
    },
    Vn = sa("species"),
    Dj = ab.get,
    Wn = ab.set,
    Xn = ab.getterFor("Promise"),
    Ra = Pn,
    Ej = J.TypeError,
    Vf = J.document,
    le = J.process,
    Yn = Nb("inspectSource");
  Mb("fetch");
  var Mc = je.f,
    Zn = Mc,
    qd = "process" == Eb(le),
    $n = !!(Vf && Vf.createEvent && J.dispatchEvent),
    me,
    Fj,
    ne = Gc("Promise", function () {
      if (
        (Yn(Ra) === String(Ra) &&
          (66 === ie || (!qd && "function" != typeof PromiseRejectionEvent))) ||
        !Ra.prototype.finally
      )
        return !0;
      if (51 <= ie && /native code/.test(Ra)) return !1;
      var c = Ra.resolve(1),
        a = function (a) {
          a(
            function () {},
            function () {}
          );
        };
      return (
        ((c.constructor = {})[Vn] = a), !(c.then(function () {}) instanceof a)
      );
    }),
    ao =
      ne ||
      !oj(function (c) {
        Ra.all(c).catch(function () {});
      }),
    Gj = function (c) {
      var a;
      return !(!xa(c) || "function" != typeof (a = c.then)) && a;
    },
    Wf = function (c, a, b) {
      if (!a.notified) {
        a.notified = !0;
        var d = a.reactions;
        Cj(function () {
          for (var e = a.value, f = 1 == a.state, g = 0; d.length > g; ) {
            var h,
              q,
              y,
              k = d[g++],
              l = f ? k.ok : k.fail,
              x = k.resolve,
              n = k.reject,
              m = k.domain;
            try {
              l
                ? (f || (2 === a.rejection && bo(c, a), (a.rejection = 1)),
                  !0 === l
                    ? (h = e)
                    : (m && m.enter(), (h = l(e)), m && (m.exit(), (y = !0))),
                  h === k.promise
                    ? n(Ej("Promise-chain cycle"))
                    : (q = Gj(h))
                    ? q.call(h, x, n)
                    : x(h))
                : n(e);
            } catch (bc) {
              m && !y && m.exit(), n(bc);
            }
          }
          a.reactions = [];
          a.notified = !1;
          b && !a.rejection && co(c, a);
        });
      }
    },
    Hj = function (c, a, b) {
      var d, e;
      $n
        ? (((d = Vf.createEvent("Event")).promise = a),
          (d.reason = b),
          d.initEvent(c, !1, !0),
          J.dispatchEvent(d))
        : (d = { promise: a, reason: b });
      (e = J["on" + c])
        ? e(d)
        : "unhandledrejection" === c && Un("Unhandled promise rejection", b);
    },
    co = function (c, a) {
      Of.call(J, function () {
        var b,
          d = a.value;
        if (
          1 !== a.rejection &&
          !a.parent &&
          ((b = ke(function () {
            qd
              ? le.emit("unhandledRejection", d, c)
              : Hj("unhandledrejection", c, d);
          })),
          (a.rejection = qd || (1 !== a.rejection && !a.parent) ? 2 : 1),
          b.error)
        )
          throw b.value;
      });
    },
    bo = function (c, a) {
      Of.call(J, function () {
        qd
          ? le.emit("rejectionHandled", c)
          : Hj("rejectionhandled", c, a.value);
      });
    },
    Nc = function (c, a, b, d) {
      return function (e) {
        c(a, b, e, d);
      };
    },
    Oc = function (c, a, b, d) {
      a.done ||
        ((a.done = !0),
        d && (a = d),
        (a.value = b),
        (a.state = 2),
        Wf(c, a, !0));
    },
    Xf = function (c, a, b, d) {
      if (!a.done) {
        a.done = !0;
        d && (a = d);
        try {
          if (c === b) throw Ej("Promise can't be resolved itself");
          var e = Gj(b);
          e
            ? Cj(function () {
                var d = { done: !1 };
                try {
                  e.call(b, Nc(Xf, c, d, a), Nc(Oc, c, d, a));
                } catch (g) {
                  Oc(c, d, g, a);
                }
              })
            : ((a.value = b), (a.state = 1), Wf(c, a, !1));
        } catch (f) {
          Oc(c, { done: !1 }, f, a);
        }
      }
    };
  ne &&
    ((Ra = function (c) {
      pf(this, Ra, "Promise");
      mb(c);
      me.call(this);
      var a = Dj(this);
      try {
        c(Nc(Xf, this, a), Nc(Oc, this, a));
      } catch (b) {
        Oc(this, a, b);
      }
    }),
    (me = function (c) {
      Wn(this, {
        type: "Promise",
        done: !1,
        notified: !1,
        parent: !1,
        reactions: [],
        rejection: !1,
        state: 0,
        value: void 0
      });
    }),
    (me.prototype = wf(Ra.prototype, {
      then: function (c, a) {
        var b = Xn(this),
          d = Mc(pj(this, Ra));
        return (
          (d.ok = "function" != typeof c || c),
          (d.fail = "function" == typeof a && a),
          (d.domain = qd ? le.domain : void 0),
          (b.parent = !0),
          b.reactions.push(d),
          0 != b.state && Wf(this, b, !1),
          d.promise
        );
      },
      catch: function (c) {
        return this.then(void 0, c);
      }
    })),
    (Fj = function () {
      var c = new me(),
        a = Dj(c);
      this.promise = c;
      this.resolve = Nc(Xf, c, a);
      this.reject = Nc(Oc, c, a);
    }),
    (je.f = Mc =
      function (c) {
        return c === Ra || c === Ij ? new Fj(c) : Zn(c);
      }));
  K({ global: !0, wrap: !0, forced: ne }, { Promise: Ra });
  hd(Ra, "Promise", !1, !0);
  Pi("Promise");
  var Ij = Mb("Promise");
  K(
    { target: "Promise", stat: !0, forced: ne },
    {
      reject: function (c) {
        var a = Mc(this);
        return a.reject.call(void 0, c), a.promise;
      }
    }
  );
  K(
    { target: "Promise", stat: !0, forced: !0 },
    {
      resolve: function (c) {
        return Uf(this === Ij ? Ra : this, c);
      }
    }
  );
  K(
    { target: "Promise", stat: !0, forced: ao },
    {
      all: function (c) {
        var a = this,
          b = Mc(a),
          d = b.resolve,
          e = b.reject,
          f = ke(function () {
            var b = mb(a.resolve),
              f = [],
              q = 0,
              y = 1;
            gd(c, function (c) {
              var g = q++,
                h = !1;
              f.push(void 0);
              y++;
              b.call(a, c).then(function (a) {
                h || ((h = !0), (f[g] = a), --y || d(f));
              }, e);
            });
            --y || d(f);
          });
        return f.error && e(f.value), b.promise;
      },
      race: function (c) {
        var a = this,
          b = Mc(a),
          d = b.reject,
          e = ke(function () {
            var e = mb(a.resolve);
            gd(c, function (c) {
              e.call(a, c).then(b.resolve, d);
            });
          });
        return e.error && d(e.value), b.promise;
      }
    }
  );
  K(
    { target: "Promise", stat: !0 },
    {
      allSettled: function (c) {
        var a = this,
          b = je.f(a),
          d = b.resolve,
          e = b.reject,
          f = ke(function () {
            var b = mb(a.resolve),
              e = [],
              f = 0,
              y = 1;
            gd(c, function (c) {
              var g = f++,
                h = !1;
              e.push(void 0);
              y++;
              b.call(a, c).then(
                function (a) {
                  h ||
                    ((h = !0),
                    (e[g] = { status: "fulfilled", value: a }),
                    --y || d(e));
                },
                function (a) {
                  h ||
                    ((h = !0),
                    (e[g] = { status: "rejected", reason: a }),
                    --y || d(e));
                }
              );
            });
            --y || d(e);
          });
        return f.error && e(f.value), b.promise;
      }
    }
  );
  K(
    { target: "Promise", proto: !0, real: !0 },
    {
      finally: function (c) {
        var a = pj(this, Mb("Promise")),
          b = "function" == typeof c;
        return this.then(
          b
            ? function (b) {
                return Uf(a, c()).then(function () {
                  return b;
                });
              }
            : c,
          b
            ? function (b) {
                return Uf(a, c()).then(function () {
                  throw b;
                });
              }
            : c
        );
      }
    }
  );
  var u = fa.Promise;
  K(
    { target: "Array", proto: !0, forced: !md("map") },
    {
      map: function (c) {
        return Um(this, c, 1 < arguments.length ? arguments[1] : void 0);
      }
    }
  );
  var eo = Aa("Array").map,
    Jj = Array.prototype,
    D = function (c) {
      var a = c.map;
      return c === Jj || (c instanceof Array && a === Jj.map) ? eo : a;
    },
    fo = Math.max,
    go = Math.min;
  K(
    { target: "Array", proto: !0, forced: !md("splice") },
    {
      splice: function (c, a) {
        var b,
          d,
          e,
          f,
          g = pb(this),
          h = ob(g.length),
          q = $d(c, h);
        var y = arguments.length;
        if (
          (0 === y
            ? (b = d = 0)
            : 1 === y
            ? ((b = 0), (d = h - q))
            : ((b = y - 2), (d = go(fo(Wd(a), 0), h - q))),
          9007199254740991 < h + b - d)
        )
          throw TypeError("Maximum allowed length exceeded");
        y = qf(g, d);
        for (e = 0; e < d; e++) (f = q + e) in g && mc(y, e, g[f]);
        if (((y.length = d), b < d)) {
          for (e = q; e < h - d; e++) {
            var k = e + b;
            (f = e + d) in g ? (g[k] = g[f]) : delete g[k];
          }
          for (e = h; e > h - d + b; e--) delete g[e - 1];
        } else if (b > d)
          for (e = h - d; e > q; e--)
            (k = e + b - 1), (f = e + d - 1) in g ? (g[k] = g[f]) : delete g[k];
        for (e = 0; e < b; e++) g[e + q] = arguments[e + 2];
        return (g.length = h - d + b), y;
      }
    }
  );
  var ho = Aa("Array").splice,
    Kj = Array.prototype,
    Ma = function (c) {
      var a = c.splice;
      return c === Kj || (c instanceof Array && a === Kj.splice) ? ho : a;
    },
    Lj = [].indexOf,
    Mj = !!Lj && 0 > 1 / [1].indexOf(1, -0),
    io = jd("indexOf");
  K(
    { target: "Array", proto: !0, forced: Mj || io },
    {
      indexOf: function (c) {
        return Mj
          ? Lj.apply(this, arguments) || 0
          : Hi(this, c, 1 < arguments.length ? arguments[1] : void 0);
      }
    }
  );
  var jo = Aa("Array").indexOf,
    Nj = Array.prototype,
    E = function (c) {
      var a = c.indexOf;
      return c === Nj || (c instanceof Array && a === Nj.indexOf) ? jo : a;
    },
    ko = sa("species"),
    lo = [].slice,
    mo = Math.max;
  K(
    { target: "Array", proto: !0, forced: !md("slice") },
    {
      slice: function (c, a) {
        var b,
          d = db(this);
        var e = ob(d.length);
        c = $d(c, e);
        a = $d(void 0 === a ? e : a, e);
        if (
          jc(d) &&
          ("function" != typeof (b = d.constructor) ||
          (b !== Array && !jc(b.prototype))
            ? xa(b) && null === (b = b[ko]) && (b = void 0)
            : (b = void 0),
          b === Array || void 0 === b)
        )
          return lo.call(d, c, a);
        b = new (void 0 === b ? Array : b)(mo(a - c, 0));
        for (e = 0; c < a; c++, e++) c in d && mc(b, e, d[c]);
        return (b.length = e), b;
      }
    }
  );
  var no = Aa("Array").slice,
    Oj = Array.prototype,
    wb = function (c) {
      var a = c.slice;
      return c === Oj || (c instanceof Array && a === Oj.slice) ? no : a;
    },
    Pj = !0;
  "find" in [] &&
    Array(1).find(function () {
      Pj = !1;
    });
  K(
    { target: "Array", proto: !0, forced: Pj },
    {
      find: function (c) {
        return Xm(this, c, 1 < arguments.length ? arguments[1] : void 0);
      }
    }
  );
  var oo = Aa("Array").find,
    Qj = Array.prototype,
    R = function (c) {
      var a = c.find;
      return c === Qj || (c instanceof Array && a === Qj.find) ? oo : a;
    },
    Rj = [].slice,
    Yf = {};
  K(
    { target: "Function", proto: !0 },
    {
      bind:
        Function.bind ||
        function (c) {
          var a = mb(this),
            b = Rj.call(arguments, 1),
            d = function () {
              var e = b.concat(Rj.call(arguments));
              if (this instanceof d) {
                var f = e.length;
                if (!(f in Yf)) {
                  for (var g = [], h = 0; h < f; h++) g[h] = "a[" + h + "]";
                  Yf[f] = Function("C,a", "return new C(" + g.join(",") + ")");
                }
                e = Yf[f](a, e);
              } else e = a.apply(c, e);
              return e;
            };
          return xa(a.prototype) && (d.prototype = a.prototype), d;
        }
    }
  );
  var po = Aa("Function").bind,
    Sj = Function.prototype,
    ya = function (c) {
      var a = c.bind;
      return c === Sj || (c instanceof Function && a === Sj.bind) ? po : a;
    };
  K(
    { target: "Array", proto: !0 },
    {
      includes: function (c) {
        return jn(this, c, 1 < arguments.length ? arguments[1] : void 0);
      }
    }
  );
  var qo = Aa("Array").includes;
  K(
    { target: "String", proto: !0, forced: !Ff("includes") },
    {
      includes: function (c) {
        return !!~String(hc(this)).indexOf(
          Ef(c),
          1 < arguments.length ? arguments[1] : void 0
        );
      }
    }
  );
  var ro = Aa("String").includes,
    Tj = Array.prototype,
    Uj = String.prototype,
    La = function (c) {
      var a = c.includes;
      return c === Tj || (c instanceof Array && a === Tj.includes)
        ? qo
        : "string" == typeof c ||
          c === Uj ||
          (c instanceof String && a === Uj.includes)
        ? ro
        : a;
    };
  K(
    { target: "Array", proto: !0, forced: jd("some") },
    {
      some: function (c) {
        return Wm(this, c, 1 < arguments.length ? arguments[1] : void 0);
      }
    }
  );
  var so = Aa("Array").some,
    Vj = Array.prototype,
    Cg = function (c) {
      var a = c.some;
      return c === Vj || (c instanceof Array && a === Vj.some) ? so : a;
    };
  let Dg = kb;
  var Wj = Object.freeze({
      __proto__: null,
      shimMediaStream: Eg,
      shimOnTrack: Fg,
      shimGetSendersWithDtmf: Gg,
      shimGetStats: Hg,
      shimSenderReceiverGetStats: Ig,
      shimAddTrackRemoveTrackWithNative: Jg,
      shimAddTrackRemoveTrack: Kg,
      shimPeerConnection: ze,
      fixNegotiationNeeded: Lg,
      shimGetUserMedia: Bg,
      shimGetDisplayMedia: function (c, a) {
        (c.navigator.mediaDevices &&
          "getDisplayMedia" in c.navigator.mediaDevices) ||
          (c.navigator.mediaDevices &&
            ("function" == typeof a
              ? (c.navigator.mediaDevices.getDisplayMedia = function (b) {
                  return a(b).then((a) => {
                    let d = b.video && b.video.width,
                      f = b.video && b.video.height;
                    return (
                      (b.video = {
                        mandatory: {
                          chromeMediaSource: "desktop",
                          chromeMediaSourceId: a,
                          maxFrameRate: (b.video && b.video.frameRate) || 3
                        }
                      }),
                      d && (b.video.mandatory.maxWidth = d),
                      f && (b.video.mandatory.maxHeight = f),
                      c.navigator.mediaDevices.getUserMedia(b)
                    );
                  });
                })
              : console.error(
                  "shimGetDisplayMedia: getSourceId argument is not a function"
                )));
      }
    }),
    Xj = "".startsWith,
    to = Math.min,
    uo = Ff("startsWith");
  K(
    { target: "String", proto: !0, forced: !uo },
    {
      startsWith: function (c) {
        var a = String(hc(this));
        Ef(c);
        var b = ob(to(1 < arguments.length ? arguments[1] : void 0, a.length)),
          d = String(c);
        return Xj ? Xj.call(a, d, b) : a.slice(b, b + d.length) === d;
      }
    }
  );
  var vo = Aa("String").startsWith,
    Yj = String.prototype,
    Bd = function (c) {
      var a = c.startsWith;
      return "string" == typeof c ||
        c === Yj ||
        (c instanceof String && a === Yj.startsWith)
        ? vo
        : a;
    };
  K(
    {
      target: "String",
      proto: !0,
      forced: (function (c) {
        return oa(function () {
          return (
            !!"\t\n\v\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff"[
              c
            ]() ||
            "\u200b\u0085\u180e" != "\u200b\u0085\u180e"[c]() ||
            "\t\n\v\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff"[
              c
            ].name !== c
          );
        });
      })("trim")
    },
    {
      trim: function () {
        return cj(this);
      }
    }
  );
  var wo = Aa("String").trim,
    Zj = String.prototype,
    tc = function (c) {
      var a = c.trim;
      return "string" == typeof c ||
        c === Zj ||
        (c instanceof String && a === Zj.trim)
        ? wo
        : a;
    },
    F = Ka(function (c) {
      var a = {
        generateIdentifier: function () {
          return Math.random().toString(36).substr(2, 10);
        }
      };
      a.localCName = a.generateIdentifier();
      a.splitLines = function (a) {
        var b;
        return D((b = tc(a).call(a).split("\n"))).call(b, function (a) {
          return tc(a).call(a);
        });
      };
      a.splitSections = function (a) {
        a = a.split("\nm=");
        return D(a).call(a, function (a, b) {
          var c;
          return tc((c = 0 < b ? "m=" + a : a)).call(c) + "\r\n";
        });
      };
      a.getDescription = function (b) {
        return (b = a.splitSections(b)) && b[0];
      };
      a.getMediaSections = function (b) {
        b = a.splitSections(b);
        return b.shift(), b;
      };
      a.matchPrefix = function (b, c) {
        var d;
        return M((d = a.splitLines(b))).call(d, function (a) {
          return 0 === E(a).call(a, c);
        });
      };
      a.parseCandidate = function (a) {
        var b;
        a = {
          foundation: (b =
            0 === E(a).call(a, "a=candidate:")
              ? a.substring(12).split(" ")
              : a.substring(10).split(" "))[0],
          component: S(b[1], 10),
          protocol: b[2].toLowerCase(),
          priority: S(b[3], 10),
          ip: b[4],
          address: b[4],
          port: S(b[5], 10),
          type: b[7]
        };
        for (var c = 8; c < b.length; c += 2)
          switch (b[c]) {
            case "raddr":
              a.relatedAddress = b[c + 1];
              break;
            case "rport":
              a.relatedPort = S(b[c + 1], 10);
              break;
            case "tcptype":
              a.tcpType = b[c + 1];
              break;
            case "ufrag":
              a.ufrag = b[c + 1];
              a.usernameFragment = b[c + 1];
              break;
            default:
              a[b[c]] = b[c + 1];
          }
        return a;
      };
      a.writeCandidate = function (a) {
        var b = [];
        b.push(a.foundation);
        b.push(a.component);
        b.push(a.protocol.toUpperCase());
        b.push(a.priority);
        b.push(a.address || a.ip);
        b.push(a.port);
        var c = a.type;
        return (
          b.push("typ"),
          b.push(c),
          "host" !== c &&
            a.relatedAddress &&
            a.relatedPort &&
            (b.push("raddr"),
            b.push(a.relatedAddress),
            b.push("rport"),
            b.push(a.relatedPort)),
          a.tcpType &&
            "tcp" === a.protocol.toLowerCase() &&
            (b.push("tcptype"), b.push(a.tcpType)),
          (a.usernameFragment || a.ufrag) &&
            (b.push("ufrag"), b.push(a.usernameFragment || a.ufrag)),
          "candidate:" + b.join(" ")
        );
      };
      a.parseIceOptions = function (a) {
        return a.substr(14).split(" ");
      };
      a.parseRtpMap = function (a) {
        a = a.substr(9).split(" ");
        var b = { payloadType: S(a.shift(), 10) };
        return (
          (a = a[0].split("/")),
          (b.name = a[0]),
          (b.clockRate = S(a[1], 10)),
          (b.channels = 3 === a.length ? S(a[2], 10) : 1),
          (b.numChannels = b.channels),
          b
        );
      };
      a.writeRtpMap = function (a) {
        var b = a.payloadType;
        void 0 !== a.preferredPayloadType && (b = a.preferredPayloadType);
        var c = a.channels || a.numChannels || 1;
        return (
          "a=rtpmap:" +
          b +
          " " +
          a.name +
          "/" +
          a.clockRate +
          (1 !== c ? "/" + c : "") +
          "\r\n"
        );
      };
      a.parseExtmap = function (a) {
        var b;
        a = a.substr(9).split(" ");
        return {
          id: S(a[0], 10),
          direction:
            0 < E((b = a[0])).call(b, "/") ? a[0].split("/")[1] : "sendrecv",
          uri: a[1]
        };
      };
      a.writeExtmap = function (a) {
        return (
          "a=extmap:" +
          (a.id || a.preferredId) +
          (a.direction && "sendrecv" !== a.direction ? "/" + a.direction : "") +
          " " +
          a.uri +
          "\r\n"
        );
      };
      a.parseFmtp = function (a) {
        for (
          var b = {}, c = a.substr(E(a).call(a, " ") + 1).split(";"), f = 0;
          f < c.length;
          f++
        ) {
          var g, h;
          a = tc((g = c[f]))
            .call(g)
            .split("=");
          b[tc((h = a[0])).call(h)] = a[1];
        }
        return b;
      };
      a.writeFmtp = function (a) {
        var b = "",
          c = a.payloadType;
        if (
          (void 0 !== a.preferredPayloadType && (c = a.preferredPayloadType),
          a.parameters && V(a.parameters).length)
        ) {
          var f,
            g = [];
          r((f = V(a.parameters))).call(f, function (b) {
            a.parameters[b] ? g.push(b + "=" + a.parameters[b]) : g.push(b);
          });
          b += "a=fmtp:" + c + " " + g.join(";") + "\r\n";
        }
        return b;
      };
      a.parseRtcpFb = function (a) {
        a = a.substr(E(a).call(a, " ") + 1).split(" ");
        return { type: a.shift(), parameter: a.join(" ") };
      };
      a.writeRtcpFb = function (a) {
        var b,
          c = "",
          f = a.payloadType;
        (void 0 !== a.preferredPayloadType && (f = a.preferredPayloadType),
        a.rtcpFeedback && a.rtcpFeedback.length) &&
          r((b = a.rtcpFeedback)).call(b, function (a) {
            c +=
              "a=rtcp-fb:" +
              f +
              " " +
              a.type +
              (a.parameter && a.parameter.length ? " " + a.parameter : "") +
              "\r\n";
          });
        return c;
      };
      a.parseSsrcMedia = function (a) {
        var b = E(a).call(a, " "),
          c = { ssrc: S(a.substr(7, b - 7), 10) },
          f = E(a).call(a, ":", b);
        return (
          -1 < f
            ? ((c.attribute = a.substr(b + 1, f - b - 1)),
              (c.value = a.substr(f + 1)))
            : (c.attribute = a.substr(b + 1)),
          c
        );
      };
      a.parseSsrcGroup = function (a) {
        a = a.substr(13).split(" ");
        return {
          semantics: a.shift(),
          ssrcs: D(a).call(a, function (a) {
            return S(a, 10);
          })
        };
      };
      a.getMid = function (b) {
        if ((b = a.matchPrefix(b, "a=mid:")[0])) return b.substr(6);
      };
      a.parseFingerprint = function (a) {
        a = a.substr(14).split(" ");
        return { algorithm: a[0].toLowerCase(), value: a[1] };
      };
      a.getDtlsParameters = function (b, c) {
        b = a.matchPrefix(b + c, "a=fingerprint:");
        return { role: "auto", fingerprints: D(b).call(b, a.parseFingerprint) };
      };
      a.writeDtlsParameters = function (a, c) {
        var b,
          d = "a=setup:" + c + "\r\n";
        return (
          r((b = a.fingerprints)).call(b, function (a) {
            d += "a=fingerprint:" + a.algorithm + " " + a.value + "\r\n";
          }),
          d
        );
      };
      a.getIceParameters = function (b, c) {
        b = a.splitLines(b);
        return (
          (b = n(b).call(b, a.splitLines(c))),
          {
            usernameFragment: M(b)
              .call(b, function (a) {
                return 0 === E(a).call(a, "a=ice-ufrag:");
              })[0]
              .substr(12),
            password: M(b)
              .call(b, function (a) {
                return 0 === E(a).call(a, "a=ice-pwd:");
              })[0]
              .substr(10)
          }
        );
      };
      a.writeIceParameters = function (a) {
        return (
          "a=ice-ufrag:" +
          a.usernameFragment +
          "\r\na=ice-pwd:" +
          a.password +
          "\r\n"
        );
      };
      a.parseRtpParameters = function (b) {
        for (
          var c,
            e = {
              codecs: [],
              headerExtensions: [],
              fecMechanisms: [],
              rtcp: []
            },
            f = a.splitLines(b)[0].split(" "),
            g = 3;
          g < f.length;
          g++
        ) {
          var h = f[g],
            q = a.matchPrefix(b, "a=rtpmap:" + h + " ")[0];
          if (q) {
            var y;
            q = a.parseRtpMap(q);
            var k = a.matchPrefix(b, "a=fmtp:" + h + " ");
            switch (
              ((q.parameters = k.length ? a.parseFmtp(k[0]) : {}),
              (q.rtcpFeedback = D(
                (y = a.matchPrefix(b, "a=rtcp-fb:" + h + " "))
              ).call(y, a.parseRtcpFb)),
              e.codecs.push(q),
              q.name.toUpperCase())
            ) {
              case "RED":
              case "ULPFEC":
                e.fecMechanisms.push(q.name.toUpperCase());
            }
          }
        }
        return (
          r((c = a.matchPrefix(b, "a=extmap:"))).call(c, function (b) {
            e.headerExtensions.push(a.parseExtmap(b));
          }),
          e
        );
      };
      a.writeRtpDescription = function (b, c) {
        var d,
          f,
          g,
          h = "";
        h += "m=" + b + " ";
        h += 0 < c.codecs.length ? "9" : "0";
        h += " UDP/TLS/RTP/SAVPF ";
        h +=
          D((d = c.codecs))
            .call(d, function (a) {
              return void 0 !== a.preferredPayloadType
                ? a.preferredPayloadType
                : a.payloadType;
            })
            .join(" ") + "\r\n";
        h += "c=IN IP4 0.0.0.0\r\n";
        h += "a=rtcp:9 IN IP4 0.0.0.0\r\n";
        r((f = c.codecs)).call(f, function (b) {
          h += a.writeRtpMap(b);
          h += a.writeFmtp(b);
          h += a.writeRtcpFb(b);
        });
        var q,
          k = 0;
        (r((g = c.codecs)).call(g, function (a) {
          a.maxptime > k && (k = a.maxptime);
        }),
        0 < k && (h += "a=maxptime:" + k + "\r\n"),
        (h += "a=rtcp-mux\r\n"),
        c.headerExtensions) &&
          r((q = c.headerExtensions)).call(q, function (b) {
            h += a.writeExtmap(b);
          });
        return h;
      };
      a.parseRtpEncodingParameters = function (b) {
        var c,
          e,
          f,
          g,
          h,
          q,
          k,
          T = [],
          l = a.parseRtpParameters(b),
          x = -1 !== E((c = l.fecMechanisms)).call(c, "RED"),
          n = -1 !== E((e = l.fecMechanisms)).call(e, "ULPFEC");
        c = M(
          (f = D((g = a.matchPrefix(b, "a=ssrc:"))).call(g, function (b) {
            return a.parseSsrcMedia(b);
          }))
        ).call(f, function (a) {
          return "cname" === a.attribute;
        });
        var m = 0 < c.length && c[0].ssrc;
        f = D((h = a.matchPrefix(b, "a=ssrc-group:FID"))).call(h, function (a) {
          a = a.substr(17).split(" ");
          return D(a).call(a, function (a) {
            return S(a, 10);
          });
        });
        0 < f.length && 1 < f[0].length && f[0][0] === m && (k = f[0][1]);
        r((q = l.codecs)).call(q, function (a) {
          "RTX" === a.name.toUpperCase() &&
            a.parameters.apt &&
            ((a = { ssrc: m, codecPayloadType: S(a.parameters.apt, 10) }),
            m && k && (a.rtx = { ssrc: k }),
            T.push(a),
            x &&
              (((a = JSON.parse(w(a))).fec = {
                ssrc: m,
                mechanism: n ? "red+ulpfec" : "red"
              }),
              T.push(a)));
        });
        0 === T.length && m && T.push({ ssrc: m });
        var p,
          t,
          u = a.matchPrefix(b, "b=");
        u.length &&
          ((u =
            0 === E((p = u[0])).call(p, "b=TIAS:")
              ? S(u[0].substr(7), 10)
              : 0 === E((t = u[0])).call(t, "b=AS:")
              ? 950 * S(u[0].substr(5), 10) - 16e3
              : void 0),
          r(T).call(T, function (a) {
            a.maxBitrate = u;
          }));
        return T;
      };
      a.parseRtcpParameters = function (b) {
        var c,
          e,
          f = {},
          g = M(
            (c = D((e = a.matchPrefix(b, "a=ssrc:"))).call(e, function (b) {
              return a.parseSsrcMedia(b);
            }))
          ).call(c, function (a) {
            return "cname" === a.attribute;
          })[0];
        g && ((f.cname = g.value), (f.ssrc = g.ssrc));
        c = a.matchPrefix(b, "a=rtcp-rsize");
        f.reducedSize = 0 < c.length;
        f.compound = 0 === c.length;
        b = a.matchPrefix(b, "a=rtcp-mux");
        return (f.mux = 0 < b.length), f;
      };
      a.parseMsid = function (b) {
        var c,
          e,
          f,
          g = a.matchPrefix(b, "a=msid:");
        if (1 === g.length)
          return { stream: (f = g[0].substr(7).split(" "))[0], track: f[1] };
        b = M(
          (c = D((e = a.matchPrefix(b, "a=ssrc:"))).call(e, function (b) {
            return a.parseSsrcMedia(b);
          }))
        ).call(c, function (a) {
          return "msid" === a.attribute;
        });
        return 0 < b.length
          ? { stream: (f = b[0].value.split(" "))[0], track: f[1] }
          : void 0;
      };
      a.generateSessionId = function () {
        return Math.random().toString().substr(2, 21);
      };
      a.writeSessionBoilerplate = function (b, c, e) {
        c = void 0 !== c ? c : 2;
        return (
          "v=0\r\no=" +
          (e || "thisisadapterortc") +
          " " +
          (b || a.generateSessionId()) +
          " " +
          c +
          " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
        );
      };
      a.writeMediaSection = function (b, c, e, f) {
        c = a.writeRtpDescription(b.kind, c);
        if (
          ((c += a.writeIceParameters(b.iceGatherer.getLocalParameters())),
          (c += a.writeDtlsParameters(
            b.dtlsTransport.getLocalParameters(),
            "offer" === e ? "actpass" : "active"
          )),
          (c += "a=mid:" + b.mid + "\r\n"),
          b.direction
            ? (c += "a=" + b.direction + "\r\n")
            : b.rtpSender && b.rtpReceiver
            ? (c += "a=sendrecv\r\n")
            : b.rtpSender
            ? (c += "a=sendonly\r\n")
            : b.rtpReceiver
            ? (c += "a=recvonly\r\n")
            : (c += "a=inactive\r\n"),
          b.rtpSender)
        )
          (e = "msid:" + f.id + " " + b.rtpSender.track.id + "\r\n"),
            (c =
              c +
              ("a=" + e) +
              ("a=ssrc:" + b.sendEncodingParameters[0].ssrc + " " + e)),
            b.sendEncodingParameters[0].rtx &&
              ((c +=
                "a=ssrc:" + b.sendEncodingParameters[0].rtx.ssrc + " " + e),
              (c +=
                "a=ssrc-group:FID " +
                b.sendEncodingParameters[0].ssrc +
                " " +
                b.sendEncodingParameters[0].rtx.ssrc +
                "\r\n"));
        return (
          (c +=
            "a=ssrc:" +
            b.sendEncodingParameters[0].ssrc +
            " cname:" +
            a.localCName +
            "\r\n"),
          b.rtpSender &&
            b.sendEncodingParameters[0].rtx &&
            (c +=
              "a=ssrc:" +
              b.sendEncodingParameters[0].rtx.ssrc +
              " cname:" +
              a.localCName +
              "\r\n"),
          c
        );
      };
      a.getDirection = function (b, c) {
        b = a.splitLines(b);
        for (var d = 0; d < b.length; d++)
          switch (b[d]) {
            case "a=sendrecv":
            case "a=sendonly":
            case "a=recvonly":
            case "a=inactive":
              return b[d].substr(2);
          }
        return c ? a.getDirection(c) : "sendrecv";
      };
      a.getKind = function (b) {
        return a.splitLines(b)[0].split(" ")[0].substr(2);
      };
      a.isRejected = function (a) {
        return "0" === a.split(" ", 2)[1];
      };
      a.parseMLine = function (b) {
        b = a.splitLines(b)[0].substr(2).split(" ");
        return {
          kind: b[0],
          port: S(b[1], 10),
          protocol: b[2],
          fmt: wb(b).call(b, 3).join(" ")
        };
      };
      a.parseOLine = function (b) {
        b = a.matchPrefix(b, "o=")[0].substr(2).split(" ");
        return {
          username: b[0],
          sessionId: b[1],
          sessionVersion: S(b[2], 10),
          netType: b[3],
          addressType: b[4],
          address: b[5]
        };
      };
      a.isValidSDP = function (b) {
        if ("string" != typeof b || 0 === b.length) return !1;
        b = a.splitLines(b);
        for (var c = 0; c < b.length; c++)
          if (2 > b[c].length || "=" !== b[c].charAt(1)) return !1;
        return !0;
      };
      c.exports = a;
    }),
    ml = function (c, a) {
      function b(a, b) {
        b.addTrack(a);
        b.dispatchEvent(new c.MediaStreamTrackEvent("addtrack", { track: a }));
      }
      function d(a, b, d, e) {
        var g = new Event("track");
        g.track = b;
        g.receiver = d;
        g.transceiver = { receiver: d };
        g.streams = e;
        c.setTimeout(function () {
          a._dispatchEvent("track", g);
        });
      }
      var e = function (b) {
        var d = this,
          e = document.createDocumentFragment();
        if (
          (["addEventListener", "removeEventListener", "dispatchEvent"].forEach(
            function (a) {
              d[a] = e[a].bind(e);
            }
          ),
          (this.canTrickleIceCandidates = null),
          (this.needNegotiation = !1),
          (this.localStreams = []),
          (this.remoteStreams = []),
          (this._localDescription = null),
          (this._remoteDescription = null),
          (this.signalingState = "stable"),
          (this.iceConnectionState = "new"),
          (this.connectionState = "new"),
          (this.iceGatheringState = "new"),
          (b = JSON.parse(JSON.stringify(b || {}))),
          (this.usingBundle = "max-bundle" === b.bundlePolicy),
          "negotiate" === b.rtcpMuxPolicy)
        )
          throw Fa(
            "NotSupportedError",
            "rtcpMuxPolicy 'negotiate' is not supported"
          );
        switch (
          (b.rtcpMuxPolicy || (b.rtcpMuxPolicy = "require"),
          b.iceTransportPolicy)
        ) {
          case "all":
          case "relay":
            break;
          default:
            b.iceTransportPolicy = "all";
        }
        switch (b.bundlePolicy) {
          case "balanced":
          case "max-compat":
          case "max-bundle":
            break;
          default:
            b.bundlePolicy = "balanced";
        }
        if (
          ((b.iceServers = ll(b.iceServers || [], a)),
          (this._iceGatherers = []),
          b.iceCandidatePoolSize)
        )
          for (var g = b.iceCandidatePoolSize; 0 < g; g--)
            this._iceGatherers.push(
              new c.RTCIceGatherer({
                iceServers: b.iceServers,
                gatherPolicy: b.iceTransportPolicy
              })
            );
        else b.iceCandidatePoolSize = 0;
        this._config = b;
        this.transceivers = [];
        this._sdpSessionId = F.generateSessionId();
        this._sdpSessionVersion = 0;
        this._dtlsRole = void 0;
        this._isClosed = !1;
      };
      Object.defineProperty(e.prototype, "localDescription", {
        configurable: !0,
        get: function () {
          return this._localDescription;
        }
      });
      Object.defineProperty(e.prototype, "remoteDescription", {
        configurable: !0,
        get: function () {
          return this._remoteDescription;
        }
      });
      e.prototype.onicecandidate = null;
      e.prototype.onaddstream = null;
      e.prototype.ontrack = null;
      e.prototype.onremovestream = null;
      e.prototype.onsignalingstatechange = null;
      e.prototype.oniceconnectionstatechange = null;
      e.prototype.onconnectionstatechange = null;
      e.prototype.onicegatheringstatechange = null;
      e.prototype.onnegotiationneeded = null;
      e.prototype.ondatachannel = null;
      e.prototype._dispatchEvent = function (a, b) {
        this._isClosed ||
          (this.dispatchEvent(b),
          "function" == typeof this["on" + a] && this["on" + a](b));
      };
      e.prototype._emitGatheringStateChange = function () {
        var a = new Event("icegatheringstatechange");
        this._dispatchEvent("icegatheringstatechange", a);
      };
      e.prototype.getConfiguration = function () {
        return this._config;
      };
      e.prototype.getLocalStreams = function () {
        return this.localStreams;
      };
      e.prototype.getRemoteStreams = function () {
        return this.remoteStreams;
      };
      e.prototype._createTransceiver = function (a, b) {
        var c = 0 < this.transceivers.length;
        a = {
          track: null,
          iceGatherer: null,
          iceTransport: null,
          dtlsTransport: null,
          localCapabilities: null,
          remoteCapabilities: null,
          rtpSender: null,
          rtpReceiver: null,
          kind: a,
          mid: null,
          sendEncodingParameters: null,
          recvEncodingParameters: null,
          stream: null,
          associatedRemoteMediaStreams: [],
          wantReceive: !0
        };
        this.usingBundle && c
          ? ((a.iceTransport = this.transceivers[0].iceTransport),
            (a.dtlsTransport = this.transceivers[0].dtlsTransport))
          : ((c = this._createIceAndDtlsTransports()),
            (a.iceTransport = c.iceTransport),
            (a.dtlsTransport = c.dtlsTransport));
        return b || this.transceivers.push(a), a;
      };
      e.prototype.addTrack = function (a, b) {
        if (this._isClosed)
          throw Fa(
            "InvalidStateError",
            "Attempted to call addTrack on a closed peerconnection."
          );
        var d;
        if (
          this.transceivers.find(function (b) {
            return b.track === a;
          })
        )
          throw Fa("InvalidAccessError", "Track already exists.");
        for (var e = 0; e < this.transceivers.length; e++)
          this.transceivers[e].track ||
            this.transceivers[e].kind !== a.kind ||
            (d = this.transceivers[e]);
        return (
          d || (d = this._createTransceiver(a.kind)),
          this._maybeFireNegotiationNeeded(),
          -1 === this.localStreams.indexOf(b) && this.localStreams.push(b),
          (d.track = a),
          (d.stream = b),
          (d.rtpSender = new c.RTCRtpSender(a, d.dtlsTransport)),
          d.rtpSender
        );
      };
      e.prototype.addStream = function (b) {
        var c = this;
        if (15025 <= a)
          b.getTracks().forEach(function (a) {
            c.addTrack(a, b);
          });
        else {
          var d = b.clone();
          b.getTracks().forEach(function (a, b) {
            var c = d.getTracks()[b];
            a.addEventListener("enabled", function (a) {
              c.enabled = a.enabled;
            });
          });
          d.getTracks().forEach(function (a) {
            c.addTrack(a, d);
          });
        }
      };
      e.prototype.removeTrack = function (a) {
        if (this._isClosed)
          throw Fa(
            "InvalidStateError",
            "Attempted to call removeTrack on a closed peerconnection."
          );
        if (!(a instanceof c.RTCRtpSender))
          throw new TypeError(
            "Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender."
          );
        var b = this.transceivers.find(function (b) {
          return b.rtpSender === a;
        });
        if (!b)
          throw Fa(
            "InvalidAccessError",
            "Sender was not created by this connection."
          );
        var d = b.stream;
        b.rtpSender.stop();
        b.rtpSender = null;
        b.track = null;
        b.stream = null;
        -1 ===
          this.transceivers
            .map(function (a) {
              return a.stream;
            })
            .indexOf(d) &&
          -1 < this.localStreams.indexOf(d) &&
          this.localStreams.splice(this.localStreams.indexOf(d), 1);
        this._maybeFireNegotiationNeeded();
      };
      e.prototype.removeStream = function (a) {
        var b = this;
        a.getTracks().forEach(function (a) {
          var c = b.getSenders().find(function (b) {
            return b.track === a;
          });
          c && b.removeTrack(c);
        });
      };
      e.prototype.getSenders = function () {
        return this.transceivers
          .filter(function (a) {
            return !!a.rtpSender;
          })
          .map(function (a) {
            return a.rtpSender;
          });
      };
      e.prototype.getReceivers = function () {
        return this.transceivers
          .filter(function (a) {
            return !!a.rtpReceiver;
          })
          .map(function (a) {
            return a.rtpReceiver;
          });
      };
      e.prototype._createIceGatherer = function (a, b) {
        var d = this;
        if (b && 0 < a) return this.transceivers[0].iceGatherer;
        if (this._iceGatherers.length) return this._iceGatherers.shift();
        var e = new c.RTCIceGatherer({
          iceServers: this._config.iceServers,
          gatherPolicy: this._config.iceTransportPolicy
        });
        return (
          Object.defineProperty(e, "state", { value: "new", writable: !0 }),
          (this.transceivers[a].bufferedCandidateEvents = []),
          (this.transceivers[a].bufferCandidates = function (b) {
            var c = !b.candidate || 0 === Object.keys(b.candidate).length;
            e.state = c ? "completed" : "gathering";
            null !== d.transceivers[a].bufferedCandidateEvents &&
              d.transceivers[a].bufferedCandidateEvents.push(b);
          }),
          e.addEventListener(
            "localcandidate",
            this.transceivers[a].bufferCandidates
          ),
          e
        );
      };
      e.prototype._gather = function (a, b) {
        var d = this,
          e = this.transceivers[b].iceGatherer;
        if (!e.onlocalcandidate) {
          var f = this.transceivers[b].bufferedCandidateEvents;
          this.transceivers[b].bufferedCandidateEvents = null;
          e.removeEventListener(
            "localcandidate",
            this.transceivers[b].bufferCandidates
          );
          e.onlocalcandidate = function (c) {
            if (!(d.usingBundle && 0 < b)) {
              var f = new Event("icecandidate");
              f.candidate = { sdpMid: a, sdpMLineIndex: b };
              var g = c.candidate;
              (c = !g || 0 === Object.keys(g).length)
                ? ("new" !== e.state && "gathering" !== e.state) ||
                  (e.state = "completed")
                : ("new" === e.state && (e.state = "gathering"),
                  (g.component = 1),
                  (g.ufrag = e.getLocalParameters().usernameFragment),
                  (g = F.writeCandidate(g)),
                  (f.candidate = Object.assign(
                    f.candidate,
                    F.parseCandidate(g)
                  )),
                  (f.candidate.candidate = g),
                  (f.candidate.toJSON = function () {
                    return {
                      candidate: f.candidate.candidate,
                      sdpMid: f.candidate.sdpMid,
                      sdpMLineIndex: f.candidate.sdpMLineIndex,
                      usernameFragment: f.candidate.usernameFragment
                    };
                  }));
              g = F.getMediaSections(d._localDescription.sdp);
              g[f.candidate.sdpMLineIndex] += c
                ? "a=end-of-candidates\r\n"
                : "a=" + f.candidate.candidate + "\r\n";
              d._localDescription.sdp =
                F.getDescription(d._localDescription.sdp) + g.join("");
              g = d.transceivers.every(function (a) {
                return a.iceGatherer && "completed" === a.iceGatherer.state;
              });
              "gathering" !== d.iceGatheringState &&
                ((d.iceGatheringState = "gathering"),
                d._emitGatheringStateChange());
              c || d._dispatchEvent("icecandidate", f);
              g &&
                (d._dispatchEvent("icecandidate", new Event("icecandidate")),
                (d.iceGatheringState = "complete"),
                d._emitGatheringStateChange());
            }
          };
          c.setTimeout(function () {
            f.forEach(function (a) {
              e.onlocalcandidate(a);
            });
          }, 0);
        }
      };
      e.prototype._createIceAndDtlsTransports = function () {
        var a = this,
          b = new c.RTCIceTransport(null);
        b.onicestatechange = function () {
          a._updateIceConnectionState();
          a._updateConnectionState();
        };
        var d = new c.RTCDtlsTransport(b);
        return (
          (d.ondtlsstatechange = function () {
            a._updateConnectionState();
          }),
          (d.onerror = function () {
            Object.defineProperty(d, "state", {
              value: "failed",
              writable: !0
            });
            a._updateConnectionState();
          }),
          { iceTransport: b, dtlsTransport: d }
        );
      };
      e.prototype._disposeIceAndDtlsTransports = function (a) {
        var b = this.transceivers[a].iceGatherer;
        b &&
          (delete b.onlocalcandidate, delete this.transceivers[a].iceGatherer);
        (b = this.transceivers[a].iceTransport) &&
          (delete b.onicestatechange, delete this.transceivers[a].iceTransport);
        (b = this.transceivers[a].dtlsTransport) &&
          (delete b.ondtlsstatechange,
          delete b.onerror,
          delete this.transceivers[a].dtlsTransport);
      };
      e.prototype._transceive = function (b, c, d) {
        var e = Cd(b.localCapabilities, b.remoteCapabilities);
        c &&
          b.rtpSender &&
          ((e.encodings = b.sendEncodingParameters),
          (e.rtcp = {
            cname: F.localCName,
            compound: b.rtcpParameters.compound
          }),
          b.recvEncodingParameters.length &&
            (e.rtcp.ssrc = b.recvEncodingParameters[0].ssrc),
          b.rtpSender.send(e));
        d &&
          b.rtpReceiver &&
          0 < e.codecs.length &&
          ("video" === b.kind &&
            b.recvEncodingParameters &&
            15019 > a &&
            b.recvEncodingParameters.forEach(function (a) {
              delete a.rtx;
            }),
          b.recvEncodingParameters.length
            ? (e.encodings = b.recvEncodingParameters)
            : (e.encodings = [{}]),
          (e.rtcp = { compound: b.rtcpParameters.compound }),
          b.rtcpParameters.cname && (e.rtcp.cname = b.rtcpParameters.cname),
          b.sendEncodingParameters.length &&
            (e.rtcp.ssrc = b.sendEncodingParameters[0].ssrc),
          b.rtpReceiver.receive(e));
      };
      e.prototype.setLocalDescription = function (a) {
        var b = this;
        if (-1 === ["offer", "answer"].indexOf(a.type))
          return Promise.reject(
            Fa("TypeError", 'Unsupported type "' + a.type + '"')
          );
        if (!Ng("setLocalDescription", a.type, b.signalingState) || b._isClosed)
          return Promise.reject(
            Fa(
              "InvalidStateError",
              "Can not set local " + a.type + " in state " + b.signalingState
            )
          );
        if ("offer" === a.type) {
          var c = F.splitSections(a.sdp);
          var d = c.shift();
          c.forEach(function (a, c) {
            a = F.parseRtpParameters(a);
            b.transceivers[c].localCapabilities = a;
          });
          b.transceivers.forEach(function (a, c) {
            b._gather(a.mid, c);
          });
        } else if ("answer" === a.type) {
          c = F.splitSections(b._remoteDescription.sdp);
          d = c.shift();
          var e = 0 < F.matchPrefix(d, "a=ice-lite").length;
          c.forEach(function (a, c) {
            var f = b.transceivers[c],
              g = f.iceGatherer,
              h = f.iceTransport,
              q = f.dtlsTransport,
              k = f.localCapabilities,
              y = f.remoteCapabilities;
            if (
              !(
                (F.isRejected(a) &&
                  0 === F.matchPrefix(a, "a=bundle-only").length) ||
                f.rejected
              )
            ) {
              var l = F.getIceParameters(a, d);
              a = F.getDtlsParameters(a, d);
              e && (a.role = "server");
              (b.usingBundle && 0 !== c) ||
                (b._gather(f.mid, c),
                "new" === h.state &&
                  h.start(g, l, e ? "controlling" : "controlled"),
                "new" === q.state && q.start(a));
              c = Cd(k, y);
              b._transceive(f, 0 < c.codecs.length, !1);
            }
          });
        }
        return (
          (b._localDescription = { type: a.type, sdp: a.sdp }),
          "offer" === a.type
            ? b._updateSignalingState("have-local-offer")
            : b._updateSignalingState("stable"),
          Promise.resolve()
        );
      };
      e.prototype.setRemoteDescription = function (e) {
        var f = this;
        if (-1 === ["offer", "answer"].indexOf(e.type))
          return Promise.reject(
            Fa("TypeError", 'Unsupported type "' + e.type + '"')
          );
        if (
          !Ng("setRemoteDescription", e.type, f.signalingState) ||
          f._isClosed
        )
          return Promise.reject(
            Fa(
              "InvalidStateError",
              "Can not set remote " + e.type + " in state " + f.signalingState
            )
          );
        var g = {};
        f.remoteStreams.forEach(function (a) {
          g[a.id] = a;
        });
        var k = [],
          l = F.splitSections(e.sdp),
          n = l.shift(),
          x = 0 < F.matchPrefix(n, "a=ice-lite").length,
          m = 0 < F.matchPrefix(n, "a=group:BUNDLE ").length;
        f.usingBundle = m;
        var p = F.matchPrefix(n, "a=ice-options:")[0];
        return (
          (f.canTrickleIceCandidates =
            !!p && 0 <= p.substr(14).split(" ").indexOf("trickle")),
          l.forEach(function (d, h) {
            var q = F.splitLines(d),
              y = F.getKind(d),
              l =
                F.isRejected(d) &&
                0 === F.matchPrefix(d, "a=bundle-only").length,
              T = q[0].substr(2).split(" ")[2];
            q = F.getDirection(d, n);
            var p = F.parseMsid(d),
              qa = F.getMid(d) || F.generateIdentifier();
            if (
              l ||
              ("application" === y &&
                ("DTLS/SCTP" === T || "UDP/DTLS/SCTP" === T))
            )
              f.transceivers[h] = {
                mid: qa,
                kind: y,
                protocol: T,
                rejected: !0
              };
            else {
              var r, t;
              !l &&
                f.transceivers[h] &&
                f.transceivers[h].rejected &&
                (f.transceivers[h] = f._createTransceiver(y, !0));
              var sc,
                u,
                xb = F.parseRtpParameters(d);
              l ||
                ((sc = F.getIceParameters(d, n)),
                ((u = F.getDtlsParameters(d, n)).role = "client"));
              T = F.parseRtpEncodingParameters(d);
              var v = F.parseRtcpParameters(d),
                bc = 0 < F.matchPrefix(d, "a=end-of-candidates", n).length;
              d = F.matchPrefix(d, "a=candidate:")
                .map(function (a) {
                  return F.parseCandidate(a);
                })
                .filter(function (a) {
                  return 1 === a.component;
                });
              if (
                (("offer" === e.type || "answer" === e.type) &&
                  !l &&
                  m &&
                  0 < h &&
                  f.transceivers[h] &&
                  (f._disposeIceAndDtlsTransports(h),
                  (f.transceivers[h].iceGatherer =
                    f.transceivers[0].iceGatherer),
                  (f.transceivers[h].iceTransport =
                    f.transceivers[0].iceTransport),
                  (f.transceivers[h].dtlsTransport =
                    f.transceivers[0].dtlsTransport),
                  f.transceivers[h].rtpSender &&
                    f.transceivers[h].rtpSender.setTransport(
                      f.transceivers[0].dtlsTransport
                    ),
                  f.transceivers[h].rtpReceiver &&
                    f.transceivers[h].rtpReceiver.setTransport(
                      f.transceivers[0].dtlsTransport
                    )),
                "offer" !== e.type || l)
              ) {
                if ("answer" === e.type && !l) {
                  y = (r = f.transceivers[h]).iceGatherer;
                  var w = r.iceTransport;
                  var A = r.dtlsTransport;
                  var z = r.rtpReceiver;
                  l = r.sendEncodingParameters;
                  qa = r.localCapabilities;
                  f.transceivers[h].recvEncodingParameters = T;
                  f.transceivers[h].remoteCapabilities = xb;
                  f.transceivers[h].rtcpParameters = v;
                  d.length &&
                    "new" === w.state &&
                    ((!x && !bc) || (m && 0 !== h)
                      ? d.forEach(function (a) {
                          Ae(r.iceTransport, a);
                        })
                      : w.setRemoteCandidates(d));
                  (m && 0 !== h) ||
                    ("new" === w.state && w.start(y, sc, "controlling"),
                    "new" === A.state && A.start(u));
                  !Cd(r.localCapabilities, r.remoteCapabilities).codecs.filter(
                    function (a) {
                      return "rtx" === a.name.toLowerCase();
                    }
                  ).length &&
                    r.sendEncodingParameters[0].rtx &&
                    delete r.sendEncodingParameters[0].rtx;
                  f._transceive(
                    r,
                    "sendrecv" === q || "recvonly" === q,
                    "sendrecv" === q || "sendonly" === q
                  );
                  !z || ("sendrecv" !== q && "sendonly" !== q)
                    ? delete r.rtpReceiver
                    : ((t = z.track),
                      p
                        ? (g[p.stream] || (g[p.stream] = new c.MediaStream()),
                          b(t, g[p.stream]),
                          k.push([t, z, g[p.stream]]))
                        : (g.default || (g.default = new c.MediaStream()),
                          b(t, g.default),
                          k.push([t, z, g.default])));
                }
              } else {
                (r = f.transceivers[h] || f._createTransceiver(y)).mid = qa;
                r.iceGatherer || (r.iceGatherer = f._createIceGatherer(h, m));
                d.length &&
                  "new" === r.iceTransport.state &&
                  (!bc || (m && 0 !== h)
                    ? d.forEach(function (a) {
                        Ae(r.iceTransport, a);
                      })
                    : r.iceTransport.setRemoteCandidates(d));
                qa = c.RTCRtpReceiver.getCapabilities(y);
                15019 > a &&
                  (qa.codecs = qa.codecs.filter(function (a) {
                    return "rtx" !== a.name;
                  }));
                l = r.sendEncodingParameters || [{ ssrc: 1001 * (2 * h + 2) }];
                sc = !1;
                if ("sendrecv" === q || "sendonly" === q) {
                  if (
                    ((sc = !r.rtpReceiver),
                    (z =
                      r.rtpReceiver ||
                      new c.RTCRtpReceiver(r.dtlsTransport, y)),
                    sc)
                  )
                    (t = z.track),
                      (p && "-" === p.stream) ||
                        (p
                          ? (g[p.stream] ||
                              ((g[p.stream] = new c.MediaStream()),
                              Object.defineProperty(g[p.stream], "id", {
                                get: function () {
                                  return p.stream;
                                }
                              })),
                            Object.defineProperty(t, "id", {
                              get: function () {
                                return p.track;
                              }
                            }),
                            (w = g[p.stream]))
                          : (g.default || (g.default = new c.MediaStream()),
                            (w = g.default))),
                      w && (b(t, w), r.associatedRemoteMediaStreams.push(w)),
                      k.push([t, z, w]);
                } else
                  r.rtpReceiver &&
                    r.rtpReceiver.track &&
                    (r.associatedRemoteMediaStreams.forEach(function (a) {
                      var b = a.getTracks().find(function (a) {
                        return a.id === r.rtpReceiver.track.id;
                      });
                      b &&
                        (function (a, b) {
                          b.removeTrack(a);
                          b.dispatchEvent(
                            new c.MediaStreamTrackEvent("removetrack", {
                              track: a
                            })
                          );
                        })(b, a);
                    }),
                    (r.associatedRemoteMediaStreams = []));
                r.localCapabilities = qa;
                r.remoteCapabilities = xb;
                r.rtpReceiver = z;
                r.rtcpParameters = v;
                r.sendEncodingParameters = l;
                r.recvEncodingParameters = T;
                f._transceive(f.transceivers[h], !1, sc);
              }
            }
          }),
          void 0 === f._dtlsRole &&
            (f._dtlsRole = "offer" === e.type ? "active" : "passive"),
          (f._remoteDescription = { type: e.type, sdp: e.sdp }),
          "offer" === e.type
            ? f._updateSignalingState("have-remote-offer")
            : f._updateSignalingState("stable"),
          Object.keys(g).forEach(function (a) {
            var b = g[a];
            if (b.getTracks().length) {
              if (-1 === f.remoteStreams.indexOf(b)) {
                f.remoteStreams.push(b);
                var e = new Event("addstream");
                e.stream = b;
                c.setTimeout(function () {
                  f._dispatchEvent("addstream", e);
                });
              }
              k.forEach(function (a) {
                var c = a[0],
                  e = a[1];
                b.id === a[2].id && d(f, c, e, [b]);
              });
            }
          }),
          k.forEach(function (a) {
            a[2] || d(f, a[0], a[1], []);
          }),
          c.setTimeout(function () {
            f &&
              f.transceivers &&
              f.transceivers.forEach(function (a) {
                a.iceTransport &&
                  "new" === a.iceTransport.state &&
                  0 < a.iceTransport.getRemoteCandidates().length &&
                  (console.warn(
                    "Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"
                  ),
                  a.iceTransport.addRemoteCandidate({}));
              });
          }, 4e3),
          Promise.resolve()
        );
      };
      e.prototype.close = function () {
        this.transceivers.forEach(function (a) {
          a.iceTransport && a.iceTransport.stop();
          a.dtlsTransport && a.dtlsTransport.stop();
          a.rtpSender && a.rtpSender.stop();
          a.rtpReceiver && a.rtpReceiver.stop();
        });
        this._isClosed = !0;
        this._updateSignalingState("closed");
      };
      e.prototype._updateSignalingState = function (a) {
        this.signalingState = a;
        a = new Event("signalingstatechange");
        this._dispatchEvent("signalingstatechange", a);
      };
      e.prototype._maybeFireNegotiationNeeded = function () {
        var a = this;
        "stable" === this.signalingState &&
          !0 !== this.needNegotiation &&
          ((this.needNegotiation = !0),
          c.setTimeout(function () {
            if (a.needNegotiation) {
              a.needNegotiation = !1;
              var b = new Event("negotiationneeded");
              a._dispatchEvent("negotiationneeded", b);
            }
          }, 0));
      };
      e.prototype._updateIceConnectionState = function () {
        var a,
          b = {
            new: 0,
            closed: 0,
            checking: 0,
            connected: 0,
            completed: 0,
            disconnected: 0,
            failed: 0
          };
        if (
          (this.transceivers.forEach(function (a) {
            a.iceTransport && !a.rejected && b[a.iceTransport.state]++;
          }),
          (a = "new"),
          0 < b.failed
            ? (a = "failed")
            : 0 < b.checking
            ? (a = "checking")
            : 0 < b.disconnected
            ? (a = "disconnected")
            : 0 < b.new
            ? (a = "new")
            : 0 < b.connected
            ? (a = "connected")
            : 0 < b.completed && (a = "completed"),
          a !== this.iceConnectionState)
        )
          (this.iceConnectionState = a),
            (a = new Event("iceconnectionstatechange")),
            this._dispatchEvent("iceconnectionstatechange", a);
      };
      e.prototype._updateConnectionState = function () {
        var a,
          b = {
            new: 0,
            closed: 0,
            connecting: 0,
            connected: 0,
            completed: 0,
            disconnected: 0,
            failed: 0
          };
        if (
          (this.transceivers.forEach(function (a) {
            a.iceTransport &&
              a.dtlsTransport &&
              !a.rejected &&
              (b[a.iceTransport.state]++, b[a.dtlsTransport.state]++);
          }),
          (b.connected += b.completed),
          (a = "new"),
          0 < b.failed
            ? (a = "failed")
            : 0 < b.connecting
            ? (a = "connecting")
            : 0 < b.disconnected
            ? (a = "disconnected")
            : 0 < b.new
            ? (a = "new")
            : 0 < b.connected && (a = "connected"),
          a !== this.connectionState)
        )
          (this.connectionState = a),
            (a = new Event("connectionstatechange")),
            this._dispatchEvent("connectionstatechange", a);
      };
      e.prototype.createOffer = function (b) {
        var d = this;
        if (d._isClosed)
          return Promise.reject(
            Fa("InvalidStateError", "Can not call createOffer after close")
          );
        var e = d.transceivers.filter(function (a) {
            return "audio" === a.kind;
          }).length,
          f = d.transceivers.filter(function (a) {
            return "video" === a.kind;
          }).length;
        if (b) {
          if (b.mandatory || b.optional)
            throw new TypeError(
              "Legacy mandatory/optional constraints not supported."
            );
          void 0 !== b.offerToReceiveAudio &&
            (e =
              !0 === b.offerToReceiveAudio
                ? 1
                : !1 === b.offerToReceiveAudio
                ? 0
                : b.offerToReceiveAudio);
          void 0 !== b.offerToReceiveVideo &&
            (f =
              !0 === b.offerToReceiveVideo
                ? 1
                : !1 === b.offerToReceiveVideo
                ? 0
                : b.offerToReceiveVideo);
        }
        for (
          d.transceivers.forEach(function (a) {
            "audio" === a.kind
              ? 0 > --e && (a.wantReceive = !1)
              : "video" === a.kind && 0 > --f && (a.wantReceive = !1);
          });
          0 < e || 0 < f;

        )
          0 < e && (d._createTransceiver("audio"), e--),
            0 < f && (d._createTransceiver("video"), f--);
        var g = F.writeSessionBoilerplate(
          d._sdpSessionId,
          d._sdpSessionVersion++
        );
        d.transceivers.forEach(function (b, e) {
          var f = b.track,
            g = b.kind,
            h = b.mid || F.generateIdentifier();
          b.mid = h;
          b.iceGatherer ||
            (b.iceGatherer = d._createIceGatherer(e, d.usingBundle));
          h = c.RTCRtpSender.getCapabilities(g);
          15019 > a &&
            (h.codecs = h.codecs.filter(function (a) {
              return "rtx" !== a.name;
            }));
          h.codecs.forEach(function (a) {
            "H264" === a.name &&
              void 0 === a.parameters["level-asymmetry-allowed"] &&
              (a.parameters["level-asymmetry-allowed"] = "1");
            b.remoteCapabilities &&
              b.remoteCapabilities.codecs &&
              b.remoteCapabilities.codecs.forEach(function (b) {
                a.name.toLowerCase() === b.name.toLowerCase() &&
                  a.clockRate === b.clockRate &&
                  (a.preferredPayloadType = b.payloadType);
              });
          });
          h.headerExtensions.forEach(function (a) {
            (
              (b.remoteCapabilities && b.remoteCapabilities.headerExtensions) ||
              []
            ).forEach(function (b) {
              a.uri === b.uri && (a.id = b.id);
            });
          });
          e = b.sendEncodingParameters || [{ ssrc: 1001 * (2 * e + 1) }];
          f &&
            15019 <= a &&
            "video" === g &&
            !e[0].rtx &&
            (e[0].rtx = { ssrc: e[0].ssrc + 1 });
          b.wantReceive &&
            (b.rtpReceiver = new c.RTCRtpReceiver(b.dtlsTransport, g));
          b.localCapabilities = h;
          b.sendEncodingParameters = e;
        });
        "max-compat" !== d._config.bundlePolicy &&
          (g +=
            "a=group:BUNDLE " +
            d.transceivers
              .map(function (a) {
                return a.mid;
              })
              .join(" ") +
            "\r\n");
        g += "a=ice-options:trickle\r\n";
        d.transceivers.forEach(function (a, b) {
          g += Mg(a, a.localCapabilities, "offer", a.stream, d._dtlsRole);
          g += "a=rtcp-rsize\r\n";
          !a.iceGatherer ||
            "new" === d.iceGatheringState ||
            (0 !== b && d.usingBundle) ||
            (a.iceGatherer.getLocalCandidates().forEach(function (a) {
              a.component = 1;
              g += "a=" + F.writeCandidate(a) + "\r\n";
            }),
            "completed" === a.iceGatherer.state &&
              (g += "a=end-of-candidates\r\n"));
        });
        b = new c.RTCSessionDescription({ type: "offer", sdp: g });
        return Promise.resolve(b);
      };
      e.prototype.createAnswer = function () {
        var b = this;
        if (b._isClosed)
          return Promise.reject(
            Fa("InvalidStateError", "Can not call createAnswer after close")
          );
        if (
          "have-remote-offer" !== b.signalingState &&
          "have-local-pranswer" !== b.signalingState
        )
          return Promise.reject(
            Fa(
              "InvalidStateError",
              "Can not call createAnswer in signalingState " + b.signalingState
            )
          );
        var d = F.writeSessionBoilerplate(
          b._sdpSessionId,
          b._sdpSessionVersion++
        );
        b.usingBundle &&
          (d +=
            "a=group:BUNDLE " +
            b.transceivers
              .map(function (a) {
                return a.mid;
              })
              .join(" ") +
            "\r\n");
        d += "a=ice-options:trickle\r\n";
        var e = F.getMediaSections(b._remoteDescription.sdp).length;
        b.transceivers.forEach(function (c, f) {
          if (!(f + 1 > e)) {
            if (c.rejected)
              return (
                "application" === c.kind
                  ? "DTLS/SCTP" === c.protocol
                    ? (d += "m=application 0 DTLS/SCTP 5000\r\n")
                    : (d +=
                        "m=application 0 " +
                        c.protocol +
                        " webrtc-datachannel\r\n")
                  : "audio" === c.kind
                  ? (d +=
                      "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n")
                  : "video" === c.kind &&
                    (d +=
                      "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"),
                void (d +=
                  "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + c.mid + "\r\n")
              );
            var g;
            c.stream &&
              ("audio" === c.kind
                ? (g = c.stream.getAudioTracks()[0])
                : "video" === c.kind && (g = c.stream.getVideoTracks()[0]),
              g &&
                15019 <= a &&
                "video" === c.kind &&
                !c.sendEncodingParameters[0].rtx &&
                (c.sendEncodingParameters[0].rtx = {
                  ssrc: c.sendEncodingParameters[0].ssrc + 1
                }));
            f = Cd(c.localCapabilities, c.remoteCapabilities);
            !f.codecs.filter(function (a) {
              return "rtx" === a.name.toLowerCase();
            }).length &&
              c.sendEncodingParameters[0].rtx &&
              delete c.sendEncodingParameters[0].rtx;
            d += Mg(c, f, "answer", c.stream, b._dtlsRole);
            c.rtcpParameters &&
              c.rtcpParameters.reducedSize &&
              (d += "a=rtcp-rsize\r\n");
          }
        });
        var f = new c.RTCSessionDescription({ type: "answer", sdp: d });
        return Promise.resolve(f);
      };
      e.prototype.addIceCandidate = function (a) {
        var b,
          c = this;
        return a && void 0 === a.sdpMLineIndex && !a.sdpMid
          ? Promise.reject(new TypeError("sdpMLineIndex or sdpMid required"))
          : new Promise(function (d, e) {
              if (!c._remoteDescription)
                return e(
                  Fa(
                    "InvalidStateError",
                    "Can not add ICE candidate without a remote description"
                  )
                );
              if (a && "" !== a.candidate) {
                var f = a.sdpMLineIndex;
                if (a.sdpMid)
                  for (var g = 0; g < c.transceivers.length; g++)
                    if (c.transceivers[g].mid === a.sdpMid) {
                      f = g;
                      break;
                    }
                var h = c.transceivers[f];
                if (!h)
                  return e(Fa("OperationError", "Can not add ICE candidate"));
                if (h.rejected) return d();
                g =
                  0 < Object.keys(a.candidate).length
                    ? F.parseCandidate(a.candidate)
                    : {};
                if (
                  ("tcp" === g.protocol && (0 === g.port || 9 === g.port)) ||
                  (g.component && 1 !== g.component)
                )
                  return d();
                if (
                  (0 === f ||
                    (0 < f &&
                      h.iceTransport !== c.transceivers[0].iceTransport)) &&
                  !Ae(h.iceTransport, g)
                )
                  return e(Fa("OperationError", "Can not add ICE candidate"));
                e = a.candidate.trim();
                0 === e.indexOf("a=") && (e = e.substr(2));
                (b = F.getMediaSections(c._remoteDescription.sdp))[f] +=
                  "a=" + (g.type ? e : "end-of-candidates") + "\r\n";
                c._remoteDescription.sdp =
                  F.getDescription(c._remoteDescription.sdp) + b.join("");
              } else for (f = 0; f < c.transceivers.length && (c.transceivers[f].rejected || (c.transceivers[f].iceTransport.addRemoteCandidate({}), ((b = F.getMediaSections(c._remoteDescription.sdp))[f] += "a=end-of-candidates\r\n"), (c._remoteDescription.sdp = F.getDescription(c._remoteDescription.sdp) + b.join("")), !c.usingBundle)); f++);
              d();
            });
      };
      e.prototype.getStats = function (a) {
        if (a && a instanceof c.MediaStreamTrack) {
          var b = null;
          if (
            (this.transceivers.forEach(function (c) {
              c.rtpSender && c.rtpSender.track === a
                ? (b = c.rtpSender)
                : c.rtpReceiver &&
                  c.rtpReceiver.track === a &&
                  (b = c.rtpReceiver);
            }),
            !b)
          )
            throw Fa("InvalidAccessError", "Invalid selector.");
          return b.getStats();
        }
        var d = [];
        return (
          this.transceivers.forEach(function (a) {
            [
              "rtpSender",
              "rtpReceiver",
              "iceGatherer",
              "iceTransport",
              "dtlsTransport"
            ].forEach(function (b) {
              a[b] && d.push(a[b].getStats());
            });
          }),
          Promise.all(d).then(function (a) {
            var b = new Map();
            return (
              a.forEach(function (a) {
                a.forEach(function (a) {
                  b.set(a.id, a);
                });
              }),
              b
            );
          })
        );
      };
      [
        "RTCRtpSender",
        "RTCRtpReceiver",
        "RTCIceGatherer",
        "RTCIceTransport",
        "RTCDtlsTransport"
      ].forEach(function (a) {
        if ((a = c[a]) && a.prototype && a.prototype.getStats) {
          var b = a.prototype.getStats;
          a.prototype.getStats = function () {
            return b.apply(this).then(function (a) {
              var b = new Map();
              return (
                Object.keys(a).forEach(function (c) {
                  var d = a[c];
                  a[c].type =
                    {
                      inboundrtp: "inbound-rtp",
                      outboundrtp: "outbound-rtp",
                      candidatepair: "candidate-pair",
                      localcandidate: "local-candidate",
                      remotecandidate: "remote-candidate"
                    }[d.type] || d.type;
                  b.set(c, a[c]);
                }),
                b
              );
            });
          };
        }
      });
      var f = ["createOffer", "createAnswer"];
      return (
        f.forEach(function (a) {
          var b = e.prototype[a];
          e.prototype[a] = function () {
            var a = arguments;
            return "function" == typeof a[0] || "function" == typeof a[1]
              ? b.apply(this, [arguments[2]]).then(
                  function (b) {
                    "function" == typeof a[0] && a[0].apply(null, [b]);
                  },
                  function (b) {
                    "function" == typeof a[1] && a[1].apply(null, [b]);
                  }
                )
              : b.apply(this, arguments);
          };
        }),
        (f = [
          "setLocalDescription",
          "setRemoteDescription",
          "addIceCandidate"
        ]).forEach(function (a) {
          var b = e.prototype[a];
          e.prototype[a] = function () {
            var a = arguments;
            return "function" == typeof a[1] || "function" == typeof a[2]
              ? b.apply(this, arguments).then(
                  function () {
                    "function" == typeof a[1] && a[1].apply(null);
                  },
                  function (b) {
                    "function" == typeof a[2] && a[2].apply(null, [b]);
                  }
                )
              : b.apply(this, arguments);
          };
        }),
        ["getStats"].forEach(function (a) {
          var b = e.prototype[a];
          e.prototype[a] = function () {
            var a = arguments;
            return "function" == typeof a[1]
              ? b.apply(this, arguments).then(function () {
                  "function" == typeof a[1] && a[1].apply(null);
                })
              : b.apply(this, arguments);
          };
        }),
        e
      );
    },
    ak = Object.freeze({
      __proto__: null,
      shimPeerConnection: Be,
      shimReplaceTrack: Qg,
      shimGetUserMedia: Og,
      shimGetDisplayMedia: Pg
    }),
    bk = Object.freeze({
      __proto__: null,
      shimOnTrack: Sg,
      shimPeerConnection: Ce,
      shimSenderGetStats: Tg,
      shimReceiverGetStats: Ug,
      shimRemoveStream: Vg,
      shimRTCDataChannel: Wg,
      shimGetUserMedia: Rg,
      shimGetDisplayMedia: function (c, a) {
        (c.navigator.mediaDevices &&
          "getDisplayMedia" in c.navigator.mediaDevices) ||
          (c.navigator.mediaDevices &&
            (c.navigator.mediaDevices.getDisplayMedia = function (b) {
              return b && b.video
                ? (!0 === b.video
                    ? (b.video = { mediaSource: a })
                    : (b.video.mediaSource = a),
                  c.navigator.mediaDevices.getUserMedia(b))
                : ((b = new DOMException(
                    "getDisplayMedia without video constraints is undefined"
                  )),
                  (b.name = "NotFoundError"),
                  (b.code = 8),
                  u.reject(b));
            }));
      }
    }),
    ck = Object.freeze({
      __proto__: null,
      shimLocalStreamsAPI: Xg,
      shimRemoteStreamsAPI: Yg,
      shimCallbacksAPI: Zg,
      shimGetUserMedia: $g,
      shimConstraints: ah,
      shimRTCIceServerUrls: bh,
      shimTrackEventTransceiver: ch,
      shimCreateOfferLegacy: dh
    }),
    xo = Object.freeze({
      __proto__: null,
      shimRTCIceCandidate: Dd,
      shimMaxMessageSize: Sc,
      shimSendThrowTypeError: Tc,
      shimConnectionState: De,
      removeAllowExtmapMixed: Ee
    });
  (function (
    { window: c } = {},
    a = { shimChrome: !0, shimFirefox: !0, shimEdge: !0, shimSafari: !0 }
  ) {
    let b = Ib(c),
      d = {
        browserDetails: b,
        commonShim: xo,
        extractVersion: Hb,
        disableLog: il,
        disableWarnings: jl
      };
    switch (b.browser) {
      case "chrome":
        if (!Wj || !ze || !a.shimChrome)
          return kb("Chrome shim is not included in this adapter release."), d;
        kb("adapter.js shimming chrome.");
        d.browserShim = Wj;
        Bg(c);
        Eg(c);
        ze(c);
        Fg(c);
        Kg(c);
        Gg(c);
        Hg(c);
        Ig(c);
        Lg(c);
        Dd(c);
        De(c);
        Sc(c);
        Tc(c);
        Ee(c);
        break;
      case "firefox":
        if (!bk || !Ce || !a.shimFirefox)
          return kb("Firefox shim is not included in this adapter release."), d;
        kb("adapter.js shimming firefox.");
        d.browserShim = bk;
        Rg(c);
        Ce(c);
        Sg(c);
        Vg(c);
        Tg(c);
        Ug(c);
        Wg(c);
        Dd(c);
        De(c);
        Sc(c);
        Tc(c);
        break;
      case "edge":
        if (!ak || !Be || !a.shimEdge)
          return kb("MS edge shim is not included in this adapter release."), d;
        kb("adapter.js shimming edge.");
        d.browserShim = ak;
        Og(c);
        Pg(c);
        Be(c);
        Qg(c);
        Sc(c);
        Tc(c);
        break;
      case "safari":
        if (!ck || !a.shimSafari)
          return kb("Safari shim is not included in this adapter release."), d;
        kb("adapter.js shimming safari.");
        d.browserShim = ck;
        bh(c);
        dh(c);
        Zg(c);
        Xg(c);
        Yg(c);
        ch(c);
        $g(c);
        Dd(c);
        Sc(c);
        Tc(c);
        Ee(c);
        break;
      default:
        kb("Unsupported browser!");
    }
    return d;
  })({ window });
  var aa, da;
  !(function (c) {
    c.WIN_10 = "Windows 10";
    c.WIN_81 = "Windows 8.1";
    c.WIN_8 = "Windows 8";
    c.WIN_7 = "Windows 7";
    c.WIN_VISTA = "Windows Vista";
    c.WIN_SERVER_2003 = "Windows Server 2003";
    c.WIN_XP = "Windows XP";
    c.WIN_2000 = "Windows 2000";
    c.ANDROID = "Android";
    c.OPEN_BSD = "Open BSD";
    c.SUN_OS = "Sun OS";
    c.LINUX = "Linux";
    c.IOS = "iOS";
    c.MAC_OS_X = "Mac OS X";
    c.MAC_OS = "Mac OS";
    c.QNX = "QNX";
    c.UNIX = "UNIX";
    c.BEOS = "BeOS";
    c.OS_2 = "OS/2";
    c.SEARCH_BOT = "Search Bot";
  })(aa || (aa = {}));
  (function (c) {
    c.CHROME = "Chrome";
    c.SAFARI = "Safari";
    c.EDGE = "Edge";
    c.FIREFOX = "Firefox";
    c.OPERA = "OPR";
    c.QQ = "QQBrowser";
    c.WECHAT = "MicroMessenger";
  })(da || (da = {}));
  let $a = (function (c) {
      if (c.match(/[0-9]+\.[0-9]+\.[0-9]+$/)) return c;
      var a = c.match(/([0-9]+\.[0-9]+\.[0-9]+)\-alpha\.([0-9]+)/);
      if (a && a[1] && a[2]) {
        var b,
          d = a[2];
        return n((b = "".concat(a[1], "."))).call(b, d);
      }
      return (a = c.match(/([0-9]+\.[0-9]+\.[0-9]+)\-special\.([0-9]+)/)) &&
        a[1] &&
        a[2]
        ? ((b = a[2]), n((d = "".concat(a[1], "."))).call(d, Number(b) + 100))
        : "4.0.0.999";
    })("4.1.0"),
    Db = {
      username: "test",
      password: "111111",
      turnServerURL: "",
      tcpport: 3433,
      udpport: 3478,
      forceturn: !1
    },
    nl = {
      "90p": H(160, 90),
      "90p_1": H(160, 90),
      "120p": H(160, 120, 15, 30, 65),
      "120p_1": H(160, 120, 15, 65),
      "120p_3": H(120, 120, 15, 50),
      "120p_4": H(212, 120),
      "180p": H(320, 180, 15, 140),
      "180p_1": H(320, 180, 15, 140),
      "180p_3": H(180, 180, 15, 30, 100),
      "180p_4": H(240, 180, 15, 30, 120),
      "240p": H(320, 240, 15, 40, 200),
      "240p_1": H(320, 240, 15, 40, 200),
      "240p_3": H(240, 240, 15, 40, 140),
      "240p_4": H(424, 240, 15, 40, 220),
      "360p": H(640, 360, 15, 80, 400),
      "360p_1": H(640, 360, 15, 80, 400),
      "360p_3": H(360, 360, 15, 80, 260),
      "360p_4": H(640, 360, 30, 80, 600),
      "360p_6": H(360, 360, 30, 80, 400),
      "360p_7": H(480, 360, 15, 80, 320),
      "360p_8": H(480, 360, 30, 80, 490),
      "360p_9": H(640, 360, 15, 80, 800),
      "360p_10": H(640, 360, 24, 80, 800),
      "360p_11": H(640, 360, 24, 80, 1e3),
      "480p": H(640, 480, 15, 100, 500),
      "480p_1": H(640, 480, 15, 100, 500),
      "480p_2": H(640, 480, 30, 100, 1e3),
      "480p_3": H(480, 480, 15, 100, 400),
      "480p_4": H(640, 480, 30, 100, 750),
      "480p_6": H(480, 480, 30, 100, 600),
      "480p_8": H(848, 480, 15, 100, 610),
      "480p_9": H(848, 480, 30, 100, 930),
      "480p_10": H(640, 480, 10, 100, 400),
      "720p": H(1280, 720, 15, 120, 1130),
      "720p_1": H(1280, 720, 15, 120, 1130),
      "720p_2": H(1280, 720, 30, 120, 2e3),
      "720p_3": H(1280, 720, 30, 120, 1710),
      "720p_5": H(960, 720, 15, 120, 910),
      "720p_6": H(960, 720, 30, 120, 1380),
      "1080p": H(1920, 1080, 15, 120, 2080),
      "1080p_1": H(1920, 1080, 15, 120, 2080),
      "1080p_2": H(1920, 1080, 30, 120, 3e3),
      "1080p_3": H(1920, 1080, 30, 120, 3150),
      "1080p_5": H(1920, 1080, 60, 120, 4780),
      "1440p": H(2560, 1440, 30, 120, 4850),
      "1440p_1": H(2560, 1440, 30, 120, 4850),
      "1440p_2": H(2560, 1440, 60, 120, 7350),
      "4k": H(3840, 2160, 30, 120, 8910),
      "4k_1": H(3840, 2160, 30, 120, 8910),
      "4k_3": H(3840, 2160, 60, 120, 13500)
    },
    ol = {
      "480p": Jb(640, 480, 1, 5),
      "480p_1": Jb(640, 480, 1, 5),
      "480p_2": Jb(640, 480, 25, 30),
      "720p": Jb(1280, 720, 1, 5),
      "720p_1": Jb(1280, 720, 1, 5),
      "720p_2": Jb(1280, 720, 25, 30),
      "1080p": Jb(1920, 1080, 1, 5),
      "1080p_1": Jb(1920, 1080, 1, 5),
      "1080p_2": Jb(1920, 1080, 25, 30)
    },
    pl = {
      speech_low_quality: wc(16e3, !1),
      speech_standard: wc(32e3, !1, 18),
      music_standard: wc(48e3, !1),
      standard_stereo: wc(48e3, !0, 56),
      high_quality: wc(48e3, !1, 128),
      high_quality_stereo: wc(48e3, !0, 192)
    },
    C = {
      PROCESS_ID: "",
      WEBCS_DOMAIN: [
        "webrtc2-ap-web-1.agora.io",
        "webrtc2-ap-web-2.agoraio.cn"
      ],
      WEBCS_DOMAIN_BACKUP_LIST: [
        "webrtc2-ap-web-3.agora.io",
        "webrtc2-ap-web-4.agoraio.cn"
      ],
      PROXY_CS: ["ap-proxy-1.agora.io", "ap-proxy-2.agora.io"],
      CDS_AP: [
        "cds-ap-web-1.agora.io",
        "cds-ap-web-2.agoraio.cn",
        "cds-ap-web-3.agora.io",
        "cds-ap-web-4.agoraio.cn"
      ],
      ACCOUNT_REGISTER: [
        "sua-ap-web-1.agora.io",
        "sua-ap-web-2.agoraio.cn",
        "sua-ap-web-3.agora.io",
        "sua-ap-web-4.agoraio.cn"
      ],
      UAP_AP: [
        "uap-ap-web-1.agora.io",
        "uap-ap-web-2.agoraio.cn",
        "uap-ap-web-3.agora.io",
        "uap-ap-web-4.agoraio.cn"
      ],
      GATEWAY_ADDRESS: [],
      GATEWAY_WSS_ADDRESS: "",
      LIVE_STREAMING_ADDRESS: "",
      ACCOUNT_REGISTER_RETRY_TIMEOUT: 1,
      ACCOUNT_REGISTER_RETRY_RATIO: 2,
      ACCOUNT_REGISTER_RETRY_TIMEOUT_MAX: 6e4,
      ACCOUNT_REGISTER_RETRY_COUNT_MAX: 1e5,
      AUDIO_CONTEXT: null,
      LOG_UPLOAD_SERVER: "logservice.agora.io",
      EVENT_REPORT_DOMAIN: "webcollector-1.agora.io",
      EVENT_REPORT_BACKUP_DOMAIN: "webcollector-2.agoraio.cn",
      WEBCS_BACKUP_CONNECT_TIMEOUT: 6e3,
      HTTP_CONNECT_TIMEOUT: 5e3,
      PLAYER_STATE_DEFER: 2e3,
      SIGNAL_REQUEST_TIMEOUT: 1e4,
      SIGNAL_REQUEST_WATCH_INTERVAL: 1e3,
      REPORT_STATS: !0,
      UPLOAD_LOG: !1,
      NOT_REPORT_EVENT: [],
      FILEPATH_LENMAX: 255,
      SUBSCRIBE_TCC: !1,
      PING_PONG_TIME_OUT: 10,
      DUALSTREAM_OPERATION_CHECK: !0,
      WEBSOCKET_TIMEOUT_MIN: 1e4,
      EVENT_REPORT_SEND_INTERVAL: 3e3,
      MEDIA_ELEMENT_EXISTS_DEPTH: 3,
      CANDIDATE_TIMEOUT: 5e3,
      SHIM_CANDIDATE: !1,
      LEAVE_MSG_TIMEOUT: 2e3,
      SHOW_REPORT_INVOKER_LOG: !1,
      STATS_FILTER: { transportId: !0, googTrackId: !0 },
      JOIN_EXTEND: "",
      PUB_EXTEND: "",
      SUB_EXTEND: "",
      FORCE_TURN: !1,
      TURN_ENABLE_TCP: !0,
      TURN_ENABLE_UDP: !0,
      MAX_UPLOAD_CACHE: 50,
      UPLOAD_CACHE_INTERVAL: 2e3,
      CHROME_FORCE_PLAN_B: !1,
      AUDIO_SOURCE_VOLUME_UPDATE_INTERVAL: 400,
      AUDIO_SOURCE_AVG_VOLUME_DURATION: 3e3,
      AUDIO_VOLUME_INDICATION_INTERVAL: 2e3,
      NORMAL_EVENT_QUEUE_CAPACITY: 100,
      CUSTOM_REPORT: !0,
      CUSTOM_REPORT_LIMIT: 20,
      PROXY_SERVER_TYPE2: "webnginx-proxy.agora.io"
    },
    yo = [
      [0, 1, 2, 3, 4, 5, 5],
      [0, 2, 2, 3, 4, 5, 5],
      [0, 3, 3, 3, 4, 5, 5],
      [0, 4, 4, 4, 4, 5, 5],
      [0, 5, 5, 5, 5, 5, 5]
    ],
    dk = [];
  var Zf = [],
    ek = Zf.sort,
    zo = oa(function () {
      Zf.sort(void 0);
    }),
    Ao = oa(function () {
      Zf.sort(null);
    }),
    Bo = jd("sort");
  K(
    { target: "Array", proto: !0, forced: zo || !Ao || Bo },
    {
      sort: function (c) {
        return void 0 === c ? ek.call(pb(this)) : ek.call(pb(this), mb(c));
      }
    }
  );
  var Co = Aa("Array").sort,
    fk = Array.prototype,
    rd = function (c) {
      var a = c.sort;
      return c === fk || (c instanceof Array && a === fk.sort) ? Co : a;
    };
  K({ target: "Array", stat: !0 }, { isArray: jc });
  var cc = fa.Array.isArray,
    l;
  !(function (c) {
    c.UNEXPECTED_ERROR = "UNEXPECTED_ERROR";
    c.UNEXPECTED_RESPONSE = "UNEXPECTED_RESPONSE";
    c.TIMEOUT = "TIMEOUT";
    c.INVALID_PARAMS = "INVALID_PARAMS";
    c.NOT_SUPPORT = "NOT_SUPPORT";
    c.INVALID_OPERATION = "INVALID_OPERATION";
    c.OPERATION_ABORT = "OPERATION_ABORT";
    c.WEB_SECURITY_RESTRICT = "WEB_SECURITY_RESTRICT";
    c.NETWORK_ERROR = "NETWORK_ERROR";
    c.NETWORK_TIMEOUT = "NETWORK_TIMEOUT";
    c.NETWORK_RESPONSE_ERROR = "NETWORK_RESPONSE_ERROR";
    c.API_INVOKE_TIMEOUT = "API_INVOKE_TIMEOUT";
    c.ENUMERATE_DEVICES_FAILED = "ENUMERATE_DEVICES_FAILED";
    c.DEVICE_NOT_FOUND = "DEVICE_NOT_FOUND";
    c.ELECTRON_IS_NULL = "ELECTRON_IS_NULL";
    c.ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR =
      "ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR";
    c.STREAM_ALREADY_INITIALIZED = "STREAM_ALREADY_INITIALIZED";
    c.STREAM_IS_CLOSED = "STREAM_IS_CLOSED";
    c.ABORT_OTHER_INIT = "ABORT_OTHER_INIT";
    c.CHROME_PLUGIN_NO_RESPONSE = "CHROME_PLUGIN_NO_RESPONSE";
    c.CHROME_PLUGIN_NOT_INSTALL = "CHROME_PLUGIN_NOT_INSTALL";
    c.MEDIA_OPTION_INVALID = "MEDIA_OPTION_INVALID";
    c.PERMISSION_DENIED = "PERMISSION_DENIED";
    c.CONSTRAINT_NOT_SATISFIED = "CONSTRAINT_NOT_SATISFIED";
    c.CAN_NOT_AUTOPLAY = "CAN_NOT_AUTOPLAY";
    c.HIGH_STREAM_NO_VIDEO_TRACK = "HIGH_STREAM_NO_VIDEO_TRACK";
    c.SCREEN_SHARE_CAN_NOT_CREATE_LOW_STREAM =
      "SCREEN_SHARE_CAN_NOT_CREATE_LOW_STREAM";
    c.TRACK_IS_DISABLED = "TRACK_IS_DISABLED";
    c.SHARE_AUDIO_NOT_ALLOWED = "SHARE_AUDIO_NOT_ALLOWED";
    c.TOKEN_GENERATOR_FUNCTION_ERROR = "TOKEN_GENERATOR_FUNCTION_ERROR";
    c.INVALID_UINT_UID_FROM_STRING_UID = "INVALID_UINT_UID_FROM_STRING_UID";
    c.CAN_NOT_GET_PROXY_SERVER = "CAN_NOT_GET_PROXY_SERVER";
    c.CAN_NOT_GET_GATEWAY_SERVER = "CAN_NOT_GET_GATEWAY_SERVER";
    c.UID_CONFLICT = "UID_CONFLICT";
    c.INVALID_LOCAL_TRACK = "INVALID_LOCAL_TRACK";
    c.INVALID_TRACK = "INVALID_TRACK";
    c.SENDER_NOT_FOUND = "SENDER_NOT_FOUND";
    c.CREATE_OFFER_FAILED = "CREATE_OFFER_FAILED";
    c.SET_ANSWER_FAILED = "SET_ANSWER_FAILED";
    c.ICE_FAILED = "ICE_FAILED";
    c.PC_CLOSED = "PC_CLOSED";
    c.SENDER_REPLACE_FAILED = "SENDER_REPLACE_FAILED";
    c.GATEWAY_P2P_LOST = "GATEWAY_P2P_LOST";
    c.NO_ICE_CANDIDATE = "NO_ICE_CANDIDATE";
    c.CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS =
      "CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS";
    c.INVALID_REMOTE_USER = "INVALID_REMOTE_USER";
    c.REMOTE_USER_IS_NOT_PUBLISHED = "REMOTE_USER_IS_NOT_PUBLISHED";
    c.SUBSCRIPTION_IS_IN_PROGRESS = "SUBSCRIPTION_IS_IN_PROGRESS";
    c.CUSTOM_REPORT_SEND_FAILED = "CUSTOM_REPORT_SEND_FAILED";
    c.CUSTOM_REPORT_FREQUENCY_TOO_HIGH = "CUSTOM_REPORT_FREQUENCY_TOO_HIGH";
    c.FETCH_AUDIO_FILE_FAILED = "FETCH_AUDIO_FILE_FAILED";
    c.READ_LOCAL_AUDIO_FILE_ERROR = "READ_LOCAL_AUDIO_FILE_ERROR";
    c.DECODE_AUDIO_FILE_FAILED = "DECODE_AUDIO_FILE_FAILED";
    c.EFFECT_ID_CONFLICTED = "EFFECT_ID_CONFLICTED";
    c.EFFECT_SOUND_ID_NOT_FOUND = "EFFECT_SOUND_ID_NOT_FOUND";
    c.WS_ABORT = "WS_ABORT";
    c.WS_DISCONNECT = "WS_DISCONNECT";
    c.WS_ERR = "WS_ERR";
    c.CAN_NOT_CONNECT_TO_LIVE_STREAMING_WORKER =
      "CAN_NOT_CONNECT_TO_LIVE_STREAMING_WORKER";
    c.LIVE_STREAMING_TASK_CONFLICT = "LIVE_STREAMING_TASK_CONFLICT";
    c.LIVE_STREAMING_INVALID_ARGUMENT = "LIVE_STREAMING_INVALID_ARGUMENT";
    c.LIVE_STREAMING_INTERNAL_SERVER_ERROR =
      "LIVE_STREAMING_INTERNAL_SERVER_ERROR";
    c.LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED =
      "LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED";
    c.LIVE_STREAMING_TRANSCODING_NOT_SUPPORT =
      "LIVE_STREAMING_TRANSCODING_NOT_SUPPORT";
    c.LIVE_STREAMING_CDN_ERROR = "LIVE_STREAMING_CDN_ERROR";
    c.LIVE_STREAMING_INVALID_RAW_STREAM = "LIVE_STREAMING_INVALID_RAW_STREAM";
    c.LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT =
      "LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT";
    c.LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE =
      "LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE";
    c.LIVE_STREAMING_WARN_FREQUENT_REQUEST =
      "LIVE_STREAMING_WARN_FREQUENT_REQUEST";
    c.WEBGL_INTERNAL_ERROR = "WEBGL_INTERNAL_ERROR";
    c.BEAUTY_PROCESSOR_INTERNAL_ERROR = "BEAUTY_PROCESSOR_INTERNAL_ERROR";
    c.CROSS_CHANNEL_WAIT_STATUS_ERROR = "CROSS_CHANNEL_WAIT_STATUS_ERROR";
    c.CROSS_CHANNEL_FAILED_JOIN_SRC = "CROSS_CHANNEL_FAILED_JOIN_SEC";
    c.CROSS_CHANNEL_FAILED_JOIN_DEST = "CROSS_CHANNEL_FAILED_JOIN_DEST";
    c.CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST =
      "CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST";
    c.CROSS_CHANNEL_SERVER_ERROR_RESPONSE =
      "CROSS_CHANNEL_SERVER_ERROR_RESPONSE";
    c.METADATA_OUT_OF_RANGE = "METADATA_OUT_OF_RANGE";
  })(l || (l = {}));
  var nh = function (c, a) {
      return function () {
        for (var b = Array(arguments.length), d = 0; d < b.length; d++)
          b[d] = arguments[d];
        return c.apply(a, b);
      };
    },
    xc = Object.prototype.toString,
    I = {
      isArray: eh,
      isArrayBuffer: function (c) {
        return "[object ArrayBuffer]" === xc.call(c);
      },
      isBuffer: function (c) {
        return (
          null != c &&
          null != c.constructor &&
          "function" == typeof c.constructor.isBuffer &&
          c.constructor.isBuffer(c)
        );
      },
      isFormData: function (c) {
        return "undefined" != typeof FormData && c instanceof FormData;
      },
      isArrayBufferView: function (c) {
        return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
          ? ArrayBuffer.isView(c)
          : c && c.buffer && c.buffer instanceof ArrayBuffer;
      },
      isString: function (c) {
        return "string" == typeof c;
      },
      isNumber: function (c) {
        return "number" == typeof c;
      },
      isObject: fh,
      isUndefined: function (c) {
        return void 0 === c;
      },
      isDate: function (c) {
        return "[object Date]" === xc.call(c);
      },
      isFile: function (c) {
        return "[object File]" === xc.call(c);
      },
      isBlob: function (c) {
        return "[object Blob]" === xc.call(c);
      },
      isFunction: gh,
      isStream: function (c) {
        return fh(c) && gh(c.pipe);
      },
      isURLSearchParams: function (c) {
        return (
          "undefined" != typeof URLSearchParams && c instanceof URLSearchParams
        );
      },
      isStandardBrowserEnv: function () {
        return (
          ("undefined" == typeof navigator ||
            ("ReactNative" !== navigator.product &&
              "NativeScript" !== navigator.product &&
              "NS" !== navigator.product)) &&
          "undefined" != typeof window &&
          "undefined" != typeof document
        );
      },
      forEach: Fd,
      merge: hh,
      deepMerge: Ge,
      extend: function (c, a, b) {
        return (
          Fd(a, function (a, e) {
            c[e] = b && "function" == typeof a ? nh(a, b) : a;
          }),
          c
        );
      },
      trim: function (c) {
        return c.replace(/^\s*/, "").replace(/\s*$/, "");
      }
    },
    gk = function (c, a, b) {
      if (!a) return c;
      if (b) a = b(a);
      else if (I.isURLSearchParams(a)) a = a.toString();
      else {
        var d = [];
        I.forEach(a, function (a, b) {
          null != a &&
            (I.isArray(a) ? (b += "[]") : (a = [a]),
            I.forEach(a, function (a) {
              I.isDate(a)
                ? (a = a.toISOString())
                : I.isObject(a) && (a = JSON.stringify(a));
              d.push(ih(b) + "=" + ih(a));
            }));
        });
        a = d.join("&");
      }
      a &&
        ((b = c.indexOf("#")),
        -1 !== b && (c = c.slice(0, b)),
        (c += (-1 === c.indexOf("?") ? "?" : "&") + a));
      return c;
    };
  Gd.prototype.use = function (c, a) {
    return (
      this.handlers.push({ fulfilled: c, rejected: a }),
      this.handlers.length - 1
    );
  };
  Gd.prototype.eject = function (c) {
    this.handlers[c] && (this.handlers[c] = null);
  };
  Gd.prototype.forEach = function (c) {
    I.forEach(this.handlers, function (a) {
      null !== a && c(a);
    });
  };
  var kh = Gd,
    $f = function (c, a, b) {
      return (
        I.forEach(b, function (b) {
          c = b(c, a);
        }),
        c
      );
    },
    hk = function (c) {
      return !(!c || !c.__CANCEL__);
    },
    ik = function (c, a) {
      I.forEach(c, function (b, d) {
        d !== a &&
          d.toUpperCase() === a.toUpperCase() &&
          ((c[a] = b), delete c[d]);
      });
    },
    oe = function (c, a, b, d, e) {
      return (
        (c.config = a),
        b && (c.code = b),
        (c.request = d),
        (c.response = e),
        (c.isAxiosError = !0),
        (c.toJSON = function () {
          return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: this.config,
            code: this.code
          };
        }),
        c
      );
    },
    Do =
      "age authorization content-length content-type etag expires from host if-modified-since if-unmodified-since last-modified location max-forwards proxy-authorization referer retry-after user-agent".split(
        " "
      ),
    Eo = function (c) {
      var a,
        b,
        d,
        e = {};
      return c
        ? (I.forEach(c.split("\n"), function (c) {
            ((d = c.indexOf(":")),
            (a = I.trim(c.substr(0, d)).toLowerCase()),
            (b = I.trim(c.substr(d + 1))),
            !a) ||
              (e[a] && 0 <= Do.indexOf(a)) ||
              (e[a] =
                "set-cookie" === a
                  ? (e[a] ? e[a] : []).concat([b])
                  : e[a]
                  ? e[a] + ", " + b
                  : b);
          }),
          e)
        : e;
    },
    Fo = I.isStandardBrowserEnv()
      ? (function () {
          function c(a) {
            return b && (d.setAttribute("href", a), (a = d.href)),
            d.setAttribute("href", a),
            {
              href: d.href,
              protocol: d.protocol ? d.protocol.replace(/:$/, "") : "",
              host: d.host,
              search: d.search ? d.search.replace(/^\?/, "") : "",
              hash: d.hash ? d.hash.replace(/^#/, "") : "",
              hostname: d.hostname,
              port: d.port,
              pathname:
                "/" === d.pathname.charAt(0) ? d.pathname : "/" + d.pathname
            };
          }
          var a,
            b = /(msie|trident)/i.test(navigator.userAgent),
            d = document.createElement("a");
          return (
            (a = c(window.location.href)),
            function (b) {
              b = I.isString(b) ? c(b) : b;
              return b.protocol === a.protocol && b.host === a.host;
            }
          );
        })()
      : function () {
          return !0;
        },
    Go = I.isStandardBrowserEnv()
      ? {
          write: function (c, a, b, d, e, f) {
            var g = [];
            g.push(c + "=" + encodeURIComponent(a));
            I.isNumber(b) && g.push("expires=" + new Date(b).toGMTString());
            I.isString(d) && g.push("path=" + d);
            I.isString(e) && g.push("domain=" + e);
            !0 === f && g.push("secure");
            document.cookie = g.join("; ");
          },
          read: function (c) {
            return (c = document.cookie.match(
              new RegExp("(^|;\\s*)(" + c + ")=([^;]*)")
            ))
              ? decodeURIComponent(c[3])
              : null;
          },
          remove: function (c) {
            this.write(c, "", Date.now() - 864e5);
          }
        }
      : {
          write: function () {},
          read: function () {
            return null;
          },
          remove: function () {}
        },
    Ho = function (c) {
      return new Promise(function (a, b) {
        var d = c.data,
          e = c.headers;
        I.isFormData(d) && delete e["Content-Type"];
        var f = new XMLHttpRequest();
        c.auth &&
          (e.Authorization =
            "Basic " +
            btoa((c.auth.username || "") + ":" + (c.auth.password || "")));
        if (
          (f.open(
            c.method.toUpperCase(),
            gk(c.url, c.params, c.paramsSerializer),
            !0
          ),
          (f.timeout = c.timeout),
          (f.onreadystatechange = function () {
            if (
              f &&
              4 === f.readyState &&
              (0 !== f.status ||
                (f.responseURL && 0 === f.responseURL.indexOf("file:")))
            ) {
              var d =
                "getAllResponseHeaders" in f
                  ? Eo(f.getAllResponseHeaders())
                  : null;
              d = {
                data:
                  c.responseType && "text" !== c.responseType
                    ? f.response
                    : f.responseText,
                status: f.status,
                statusText: f.statusText,
                headers: d,
                config: c,
                request: f
              };
              var e = d.config.validateStatus;
              !e || e(d.status)
                ? a(d)
                : b(
                    oe(
                      Error("Request failed with status code " + d.status),
                      d.config,
                      null,
                      d.request,
                      d
                    )
                  );
              f = null;
            }
          }),
          (f.onabort = function () {
            f &&
              (b(oe(Error("Request aborted"), c, "ECONNABORTED", f, void 0)),
              (f = null));
          }),
          (f.onerror = function () {
            b(oe(Error("Network Error"), c, null, f, void 0));
            f = null;
          }),
          (f.ontimeout = function () {
            b(
              oe(
                Error("timeout of " + c.timeout + "ms exceeded"),
                c,
                "ECONNABORTED",
                f,
                void 0
              )
            );
            f = null;
          }),
          I.isStandardBrowserEnv())
        ) {
          var g =
            (c.withCredentials || Fo(c.url)) && c.xsrfCookieName
              ? Go.read(c.xsrfCookieName)
              : void 0;
          g && (e[c.xsrfHeaderName] = g);
        }
        if (
          ("setRequestHeader" in f &&
            I.forEach(e, function (a, b) {
              void 0 === d && "content-type" === b.toLowerCase()
                ? delete e[b]
                : f.setRequestHeader(b, a);
            }),
          c.withCredentials && (f.withCredentials = !0),
          c.responseType)
        )
          try {
            f.responseType = c.responseType;
          } catch (h) {
            if ("json" !== c.responseType) throw h;
          }
        "function" == typeof c.onDownloadProgress &&
          f.addEventListener("progress", c.onDownloadProgress);
        "function" == typeof c.onUploadProgress &&
          f.upload &&
          f.upload.addEventListener("progress", c.onUploadProgress);
        c.cancelToken &&
          c.cancelToken.promise.then(function (a) {
            f && (f.abort(), b(a), (f = null));
          });
        void 0 === d && (d = null);
        f.send(d);
      });
    },
    Io = { "Content-Type": "application/x-www-form-urlencoded" },
    pe = {
      adapter: (function () {
        var c;
        return (
          (("undefined" != typeof process &&
            "[object process]" === Object.prototype.toString.call(process)) ||
            "undefined" != typeof XMLHttpRequest) &&
            (c = Ho),
          c
        );
      })(),
      transformRequest: [
        function (c, a) {
          return (
            ik(a, "Accept"),
            ik(a, "Content-Type"),
            I.isFormData(c) ||
            I.isArrayBuffer(c) ||
            I.isBuffer(c) ||
            I.isStream(c) ||
            I.isFile(c) ||
            I.isBlob(c)
              ? c
              : I.isArrayBufferView(c)
              ? c.buffer
              : I.isURLSearchParams(c)
              ? (jh(a, "application/x-www-form-urlencoded;charset=utf-8"),
                c.toString())
              : I.isObject(c)
              ? (jh(a, "application/json;charset=utf-8"), JSON.stringify(c))
              : c
          );
        }
      ],
      transformResponse: [
        function (c) {
          if ("string" == typeof c)
            try {
              c = JSON.parse(c);
            } catch (a) {}
          return c;
        }
      ],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      validateStatus: function (c) {
        return 200 <= c && 300 > c;
      },
      headers: { common: { Accept: "application/json, text/plain, */*" } }
    };
  I.forEach(["delete", "get", "head"], function (c) {
    pe.headers[c] = {};
  });
  I.forEach(["post", "put", "patch"], function (c) {
    pe.headers[c] = I.merge(Io);
  });
  var Jo = function (c, a) {
      return a ? c.replace(/\/+$/, "") + "/" + a.replace(/^\/+/, "") : c;
    },
    Ko = function (c) {
      c.cancelToken && c.cancelToken.throwIfRequested();
      return c.baseURL &&
        !/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(c.url) &&
        (c.url = Jo(c.baseURL, c.url)),
      (c.headers = c.headers || {}),
      (c.data = $f(c.data, c.headers, c.transformRequest)),
      (c.headers = I.merge(
        c.headers.common || {},
        c.headers[c.method] || {},
        c.headers || {}
      )),
      I.forEach(
        "delete get head post put patch common".split(" "),
        function (a) {
          delete c.headers[a];
        }
      ),
      (c.adapter || pe.adapter)(c).then(
        function (a) {
          c.cancelToken && c.cancelToken.throwIfRequested();
          return (a.data = $f(a.data, a.headers, c.transformResponse)), a;
        },
        function (a) {
          hk(a) ||
            (c.cancelToken && c.cancelToken.throwIfRequested(),
            a &&
              a.response &&
              (a.response.data = $f(
                a.response.data,
                a.response.headers,
                c.transformResponse
              )));
          return Promise.reject(a);
        }
      );
    },
    ag = function (c, a) {
      a = a || {};
      var b = {};
      return (
        I.forEach(["url", "method", "params", "data"], function (c) {
          void 0 !== a[c] && (b[c] = a[c]);
        }),
        I.forEach(["headers", "auth", "proxy"], function (d) {
          I.isObject(a[d])
            ? (b[d] = I.deepMerge(c[d], a[d]))
            : void 0 !== a[d]
            ? (b[d] = a[d])
            : I.isObject(c[d])
            ? (b[d] = I.deepMerge(c[d]))
            : void 0 !== c[d] && (b[d] = c[d]);
        }),
        I.forEach(
          "baseURL transformRequest transformResponse paramsSerializer timeout withCredentials adapter responseType xsrfCookieName xsrfHeaderName onUploadProgress onDownloadProgress maxContentLength validateStatus maxRedirects httpAgent httpsAgent cancelToken socketPath".split(
            " "
          ),
          function (d) {
            void 0 !== a[d] ? (b[d] = a[d]) : void 0 !== c[d] && (b[d] = c[d]);
          }
        ),
        b
      );
    };
  Uc.prototype.request = function (c, a) {
    "string" == typeof c ? ((c = a || {}).url = c) : (c = c || {});
    (c = ag(this.defaults, c)).method = c.method
      ? c.method.toLowerCase()
      : "get";
    var b = [Ko, void 0];
    c = Promise.resolve(c);
    this.interceptors.request.forEach(function (a) {
      b.unshift(a.fulfilled, a.rejected);
    });
    for (
      this.interceptors.response.forEach(function (a) {
        b.push(a.fulfilled, a.rejected);
      });
      b.length;

    )
      c = c.then(b.shift(), b.shift());
    return c;
  };
  Uc.prototype.getUri = function (c) {
    return (c = ag(this.defaults, c)),
    gk(c.url, c.params, c.paramsSerializer).replace(/^\?/, "");
  };
  I.forEach(["delete", "get", "head", "options"], function (c) {
    Uc.prototype[c] = function (a, b) {
      return this.request(I.merge(b || {}, { method: c, url: a }));
    };
  });
  I.forEach(["post", "put", "patch"], function (c) {
    Uc.prototype[c] = function (a, b, d) {
      return this.request(I.merge(d || {}, { method: c, url: a, data: b }));
    };
  });
  var Id = Uc;
  He.prototype.toString = function () {
    return "Cancel" + (this.message ? ": " + this.message : "");
  };
  He.prototype.__CANCEL__ = !0;
  var lh = He;
  Hd.prototype.throwIfRequested = function () {
    if (this.reason) throw this.reason;
  };
  Hd.source = function () {
    var c;
    return {
      token: new Hd(function (a) {
        c = a;
      }),
      cancel: c
    };
  };
  var Gb = mh(pe);
  Gb.Axios = Id;
  Gb.create = function (c) {
    return mh(ag(Gb.defaults, c));
  };
  Gb.Cancel = lh;
  Gb.CancelToken = Hd;
  Gb.isCancel = hk;
  Gb.all = function (c) {
    return Promise.all(c);
  };
  Gb.spread = function (c) {
    return function (a) {
      return c.apply(null, a);
    };
  };
  var Cb = (Gb.default = Gb);
  let qb = { DEBUG: 0, INFO: 1, WARNING: 2, ERROR: 3, NONE: 4 },
    jk = (c) => {
      for (const a in qb) if (qb[a] === c) return a;
      return "DEFAULT";
    };
  class Lo {
    constructor() {
      this.logLevel = qb.DEBUG;
      this.uploadLogWaitingList = [];
      this.uploadLogUploadingList = [];
      this.currentLogID = this.uploadErrorCount = 0;
      this.uploadURL = "https://".concat(C.LOG_UPLOAD_SERVER, "/upload/v1");
    }
    debug(...c) {
      var a;
      c = n((a = [qb.DEBUG])).call(a, c);
      this.log.apply(this, c);
    }
    info(...c) {
      var a;
      c = n((a = [qb.INFO])).call(a, c);
      this.log.apply(this, c);
    }
    warning(...c) {
      var a;
      c = n((a = [qb.WARNING])).call(a, c);
      this.log.apply(this, c);
    }
    error(...c) {
      var a;
      c = n((a = [qb.ERROR])).call(a, c);
      this.log.apply(this, c);
    }
    setLogLevel(c) {
      this.logLevel = c = Math.min(Math.max(0, c), 4);
    }
    enableLogUpload() {
      vc("UPLOAD_LOG", !0);
    }
    disableLogUpload() {
      vc("UPLOAD_LOG", !1);
      this.uploadLogUploadingList = [];
      this.uploadLogWaitingList = [];
    }
    setProxyServer(c) {
      var a;
      c
        ? (this.uploadURL = n((a = "https://".concat(c, "/ls/?h="))).call(
            a,
            C.LOG_UPLOAD_SERVER,
            "&p=443&d=upload/v1"
          ))
        : (this.uploadURL = "https://".concat(
            C.LOG_UPLOAD_SERVER,
            "/upload/v1"
          ));
    }
    log(...c) {
      var a, b, d, e;
      let f = Math.max(0, Math.min(4, c[0]));
      if (
        !((c[0] = oh() + " Agora-SDK [".concat(jk(f), "]:")),
        this.appendLogToWaitingList(f, c),
        f < this.logLevel)
      ) {
        var g = oh() + " %cAgora-SDK [".concat(jk(f), "]:");
        switch (f) {
          case qb.DEBUG:
            c = n((a = [g, "color: #64B5F6;"])).call(a, wb(c).call(c, 1));
            console.log.apply(console, c);
            break;
          case qb.INFO:
            c = n((b = [g, "color: #1E88E5; font-weight: bold;"])).call(
              b,
              wb(c).call(c, 1)
            );
            console.log.apply(console, c);
            break;
          case qb.WARNING:
            c = n((d = [g, "color: #FB8C00; font-weight: bold;"])).call(
              d,
              wb(c).call(c, 1)
            );
            console.warn.apply(console, c);
            break;
          case qb.ERROR:
            (c = n((e = [g, "color: #B00020; font-weight: bold;"])).call(
              e,
              wb(c).call(c, 1)
            )),
              console.error.apply(console, c);
        }
      }
    }
    appendLogToWaitingList(c, ...a) {
      if (C.UPLOAD_LOG) {
        var b = "";
        r(a).call(a, (a) => {
          "object" == typeof a && (a = w(a));
          b += "".concat(a, " ");
        });
        this.uploadLogWaitingList.push({
          payload_str: b,
          log_level: c,
          log_item_id: this.currentLogID++
        });
        0 === this.uploadLogUploadingList.length && this.uploadLogInterval();
      }
    }
    async uploadLogs() {
      var c = {
        sdk_version: $a,
        process_id: C.PROCESS_ID,
        payload: w(this.uploadLogUploadingList)
      };
      c = await Cb.post(this.uploadURL, c, { responseType: "text" });
      if ("OK" !== c.data)
        throw Error("unexpected upload log response: " + c.data);
      this.uploadLogUploadingList = [];
    }
    uploadLogInterval() {
      if (
        0 !== this.uploadLogUploadingList.length ||
        0 !== this.uploadLogWaitingList.length
      ) {
        var c;
        0 === this.uploadLogUploadingList.length &&
          (this.uploadLogUploadingList = Ma(
            (c = this.uploadLogWaitingList)
          ).call(c, 0, 10));
        this.uploadLogs()
          .then(() => {
            this.uploadErrorCount = 0;
            0 < this.uploadLogWaitingList.length &&
              window.setTimeout(() => this.uploadLogInterval(), 3e3);
          })
          .catch((a) => {
            this.uploadErrorCount += 1;
            2 > this.uploadErrorCount
              ? window.setTimeout(() => this.uploadLogInterval(), 200)
              : window.setTimeout(() => this.uploadLogInterval(), 1e3);
          });
      }
    }
  }
  let k = new Lo();
  class m {
    constructor(c, a = "", b) {
      var d;
      this.name = "AgoraRTCException";
      this.code = c;
      this.message = n((d = "AgoraRTCError ".concat(this.code, ": "))).call(
        d,
        a
      );
      this.data = b;
    }
    toString() {
      var c;
      return this.data
        ? n((c = "".concat(this.message, " data: "))).call(c, w(this.data))
        : this.message;
    }
    throw() {
      throw (k.error(this.toString()), this);
    }
  }
  var kk, Ia;
  !(function (c) {
    c.FREE = "free";
    c.UPLOADING = "uploading";
  })(kk || (kk = {}));
  (function (c) {
    c.NONE = "none";
    c.INIT = "init";
    c.CANPLAY = "canplay";
    c.PLAYING = "playing";
    c.PAUSED = "paused";
    c.SUSPEND = "suspend";
    c.STALLED = "stalled";
    c.WAITING = "waiting";
    c.ERROR = "error";
    c.DESTROYED = "destroyed";
    c.ABORT = "abort";
    c.ENDED = "ended";
    c.EMPTIED = "emptied";
  })(Ia || (Ia = {}));
  K({ target: "Number", stat: !0 }, { MAX_SAFE_INTEGER: 9007199254740991 });
  K({ target: "Number", stat: !0 }, { MIN_SAFE_INTEGER: -9007199254740991 });
  var Mo = function (c, a) {
      for (
        var b = Array(arguments.length - 1), d = 0, e = 2, f = !0;
        e < arguments.length;

      )
        b[d++] = arguments[e++];
      return new Promise(function (e, h) {
        b[d] = function (a) {
          if (f)
            if (((f = !1), a)) h(a);
            else {
              for (var b = Array(arguments.length - 1), c = 0; c < b.length; )
                b[c++] = arguments[c];
              e.apply(null, b);
            }
        };
        try {
          c.apply(a || null, b);
        } catch (q) {
          f && ((f = !1), h(q));
        }
      });
    },
    No = Ka(function (c, a) {
      a.length = function (a) {
        var b = a.length;
        if (!b) return 0;
        for (var c = 0; 1 < --b % 4 && "=" === a.charAt(b); ) ++c;
        return Math.ceil(3 * a.length) / 4 - c;
      };
      var b = Array(64),
        d = Array(123);
      for (c = 0; 64 > c; )
        d[
          (b[c] =
            26 > c ? c + 65 : 52 > c ? c + 71 : 62 > c ? c - 4 : (c - 59) | 43)
        ] = c++;
      a.encode = function (a, c, d) {
        for (var e, f = null, g = [], k = 0, l = 0; c < d; ) {
          var n = a[c++];
          switch (l) {
            case 0:
              g[k++] = b[n >> 2];
              e = (3 & n) << 4;
              l = 1;
              break;
            case 1:
              g[k++] = b[e | (n >> 4)];
              e = (15 & n) << 2;
              l = 2;
              break;
            case 2:
              (g[k++] = b[e | (n >> 6)]), (g[k++] = b[63 & n]), (l = 0);
          }
          8191 < k &&
            ((f || (f = [])).push(String.fromCharCode.apply(String, g)),
            (k = 0));
        }
        return (
          l && ((g[k++] = b[e]), (g[k++] = 61), 1 === l && (g[k++] = 61)),
          f
            ? (k && f.push(String.fromCharCode.apply(String, g.slice(0, k))),
              f.join(""))
            : String.fromCharCode.apply(String, g.slice(0, k))
        );
      };
      a.decode = function (a, b, c) {
        for (var e, f = c, g = 0, k = 0; k < a.length; ) {
          var l = a.charCodeAt(k++);
          if (61 === l && 1 < g) break;
          if (void 0 === (l = d[l])) throw Error("invalid encoding");
          switch (g) {
            case 0:
              e = l;
              g = 1;
              break;
            case 1:
              b[c++] = (e << 2) | ((48 & l) >> 4);
              e = l;
              g = 2;
              break;
            case 2:
              b[c++] = ((15 & e) << 4) | ((60 & l) >> 2);
              e = l;
              g = 3;
              break;
            case 3:
              (b[c++] = ((3 & e) << 6) | l), (g = 0);
          }
        }
        if (1 === g) throw Error("invalid encoding");
        return c - f;
      };
      a.test = function (a) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
          a
        );
      };
    });
  Jd.prototype.on = function (c, a, b) {
    return (
      (this._listeners[c] || (this._listeners[c] = [])).push({
        fn: a,
        ctx: b || this
      }),
      this
    );
  };
  Jd.prototype.off = function (c, a) {
    if (void 0 === c) this._listeners = {};
    else if (void 0 === a) this._listeners[c] = [];
    else {
      c = this._listeners[c];
      for (var b = 0; b < c.length; ) c[b].fn === a ? c.splice(b, 1) : ++b;
    }
    return this;
  };
  Jd.prototype.emit = function (c) {
    var a = this._listeners[c];
    if (a) {
      for (var b = [], d = 1; d < arguments.length; ) b.push(arguments[d++]);
      for (d = 0; d < a.length; ) a[d].fn.apply(a[d++].ctx, b);
    }
    return this;
  };
  var Oo = sh(sh),
    Po = function (c) {
      try {
        var a = eval("quire".replace(/^/, "re"))(c);
        if (a && (a.length || Object.keys(a).length)) return a;
      } catch (b) {}
      return null;
    },
    Qo = Ka(function (c, a) {
      a.length = function (a) {
        for (var b = 0, c = 0, f = 0; f < a.length; ++f)
          128 > (c = a.charCodeAt(f))
            ? (b += 1)
            : 2048 > c
            ? (b += 2)
            : 55296 == (64512 & c) && 56320 == (64512 & a.charCodeAt(f + 1))
            ? (++f, (b += 4))
            : (b += 3);
        return b;
      };
      a.read = function (a, c, e) {
        if (1 > e - c) return "";
        for (var b, d = null, h = [], q = 0; c < e; )
          128 > (b = a[c++])
            ? (h[q++] = b)
            : 191 < b && 224 > b
            ? (h[q++] = ((31 & b) << 6) | (63 & a[c++]))
            : 239 < b && 365 > b
            ? ((b =
                (((7 & b) << 18) |
                  ((63 & a[c++]) << 12) |
                  ((63 & a[c++]) << 6) |
                  (63 & a[c++])) -
                65536),
              (h[q++] = 55296 + (b >> 10)),
              (h[q++] = 56320 + (1023 & b)))
            : (h[q++] =
                ((15 & b) << 12) | ((63 & a[c++]) << 6) | (63 & a[c++])),
            8191 < q &&
              ((d || (d = [])).push(String.fromCharCode.apply(String, h)),
              (q = 0));
        return d
          ? (q && d.push(String.fromCharCode.apply(String, h.slice(0, q))),
            d.join(""))
          : String.fromCharCode.apply(String, h.slice(0, q));
      };
      a.write = function (a, c, e) {
        for (var b, d, h = e, q = 0; q < a.length; ++q)
          128 > (b = a.charCodeAt(q))
            ? (c[e++] = b)
            : 2048 > b
            ? ((c[e++] = (b >> 6) | 192), (c[e++] = (63 & b) | 128))
            : 55296 == (64512 & b) &&
              56320 == (64512 & (d = a.charCodeAt(q + 1)))
            ? ((b = 65536 + ((1023 & b) << 10) + (1023 & d)),
              ++q,
              (c[e++] = (b >> 18) | 240),
              (c[e++] = ((b >> 12) & 63) | 128),
              (c[e++] = ((b >> 6) & 63) | 128),
              (c[e++] = (63 & b) | 128))
            : ((c[e++] = (b >> 12) | 224),
              (c[e++] = ((b >> 6) & 63) | 128),
              (c[e++] = (63 & b) | 128));
        return e - h;
      };
    }),
    Ro = function (c, a, b) {
      var d = b || 8192,
        e = d >>> 1,
        f = null,
        g = d;
      return function (b) {
        if (1 > b || b > e) return c(b);
        g + b > d && ((f = c(d)), (g = 0));
        b = a.call(f, g, (g += b));
        return 7 & g && (g = 1 + (7 | g)), b;
      };
    },
    oc = (za.zero = new za(0, 0));
  oc.toNumber = function () {
    return 0;
  };
  oc.zzEncode = oc.zzDecode = function () {
    return this;
  };
  oc.length = function () {
    return 1;
  };
  var So = (za.zeroHash = "\x00\x00\x00\x00\x00\x00\x00\x00");
  za.fromNumber = function (c) {
    if (0 === c) return oc;
    var a = 0 > c;
    a && (c = -c);
    var b = c >>> 0;
    c = ((c - b) / 4294967296) >>> 0;
    return (
      a &&
        ((c = ~c >>> 0),
        (b = ~b >>> 0),
        4294967295 < ++b && ((b = 0), 4294967295 < ++c && (c = 0))),
      new za(b, c)
    );
  };
  za.from = function (c) {
    if ("number" == typeof c) return za.fromNumber(c);
    if (N.isString(c)) {
      if (!N.Long) return za.fromNumber(parseInt(c, 10));
      c = N.Long.fromString(c);
    }
    return c.low || c.high ? new za(c.low >>> 0, c.high >>> 0) : oc;
  };
  za.prototype.toNumber = function (c) {
    if (!c && this.hi >>> 31) {
      c = (1 + ~this.lo) >>> 0;
      var a = ~this.hi >>> 0;
      return c || (a = (a + 1) >>> 0), -(c + 4294967296 * a);
    }
    return this.lo + 4294967296 * this.hi;
  };
  za.prototype.toLong = function (c) {
    return N.Long
      ? new N.Long(0 | this.lo, 0 | this.hi, !!c)
      : { low: 0 | this.lo, high: 0 | this.hi, unsigned: !!c };
  };
  var Yb = String.prototype.charCodeAt;
  za.fromHash = function (c) {
    return c === So
      ? oc
      : new za(
          (Yb.call(c, 0) |
            (Yb.call(c, 1) << 8) |
            (Yb.call(c, 2) << 16) |
            (Yb.call(c, 3) << 24)) >>>
            0,
          (Yb.call(c, 4) |
            (Yb.call(c, 5) << 8) |
            (Yb.call(c, 6) << 16) |
            (Yb.call(c, 7) << 24)) >>>
            0
        );
  };
  za.prototype.toHash = function () {
    return String.fromCharCode(
      255 & this.lo,
      (this.lo >>> 8) & 255,
      (this.lo >>> 16) & 255,
      this.lo >>> 24,
      255 & this.hi,
      (this.hi >>> 8) & 255,
      (this.hi >>> 16) & 255,
      this.hi >>> 24
    );
  };
  za.prototype.zzEncode = function () {
    var c = this.hi >> 31;
    return (
      (this.hi = (((this.hi << 1) | (this.lo >>> 31)) ^ c) >>> 0),
      (this.lo = ((this.lo << 1) ^ c) >>> 0),
      this
    );
  };
  za.prototype.zzDecode = function () {
    var c = -(1 & this.lo);
    return (
      (this.lo = (((this.lo >>> 1) | (this.hi << 31)) ^ c) >>> 0),
      (this.hi = ((this.hi >>> 1) ^ c) >>> 0),
      this
    );
  };
  za.prototype.length = function () {
    var c = this.lo,
      a = ((this.lo >>> 28) | (this.hi << 4)) >>> 0,
      b = this.hi >>> 24;
    return 0 === b
      ? 0 === a
        ? 16384 > c
          ? 128 > c
            ? 1
            : 2
          : 2097152 > c
          ? 3
          : 4
        : 16384 > a
        ? 128 > a
          ? 5
          : 6
        : 2097152 > a
        ? 7
        : 8
      : 128 > b
      ? 9
      : 10;
  };
  var N = Ka(function (c, a) {
      function b(a, b, c) {
        for (var d = Object.keys(b), e = 0; e < d.length; ++e)
          (void 0 !== a[d[e]] && c) || (a[d[e]] = b[d[e]]);
        return a;
      }
      function d(a) {
        function c(a, d) {
          if (!(this instanceof c)) return new c(a, d);
          Object.defineProperty(this, "message", {
            get: function () {
              return a;
            }
          });
          Error.captureStackTrace
            ? Error.captureStackTrace(this, c)
            : Object.defineProperty(this, "stack", {
                value: Error().stack || ""
              });
          d && b(this, d);
        }
        return (
          ((c.prototype = Object.create(Error.prototype)).constructor = c),
          Object.defineProperty(c.prototype, "name", {
            get: function () {
              return a;
            }
          }),
          (c.prototype.toString = function () {
            return this.name + ": " + this.message;
          }),
          c
        );
      }
      a.asPromise = Mo;
      a.base64 = No;
      a.EventEmitter = Jd;
      a.float = Oo;
      a.inquire = Po;
      a.utf8 = Qo;
      a.pool = Ro;
      a.LongBits = za;
      a.isNode = !!(
        void 0 !== Lb &&
        Lb &&
        Lb.process &&
        Lb.process.versions &&
        Lb.process.versions.node
      );
      a.global =
        (a.isNode && Lb) ||
        ("undefined" != typeof window && window) ||
        ("undefined" != typeof self && self) ||
        Lb;
      a.emptyArray = Object.freeze ? Object.freeze([]) : [];
      a.emptyObject = Object.freeze ? Object.freeze({}) : {};
      a.isInteger =
        Number.isInteger ||
        function (a) {
          return "number" == typeof a && isFinite(a) && Math.floor(a) === a;
        };
      a.isString = function (a) {
        return "string" == typeof a || a instanceof String;
      };
      a.isObject = function (a) {
        return a && "object" == typeof a;
      };
      a.isset = a.isSet = function (a, b) {
        var c = a[b];
        return (
          !(null == c || !a.hasOwnProperty(b)) &&
          ("object" != typeof c ||
            0 < (Array.isArray(c) ? c.length : Object.keys(c).length))
        );
      };
      a.Buffer = (function () {
        try {
          var b = a.inquire("buffer").Buffer;
          return b.prototype.utf8Write ? b : null;
        } catch (f) {
          return null;
        }
      })();
      a._Buffer_from = null;
      a._Buffer_allocUnsafe = null;
      a.newBuffer = function (b) {
        return "number" == typeof b
          ? a.Buffer
            ? a._Buffer_allocUnsafe(b)
            : new a.Array(b)
          : a.Buffer
          ? a._Buffer_from(b)
          : "undefined" == typeof Uint8Array
          ? b
          : new Uint8Array(b);
      };
      a.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array;
      a.Long =
        (a.global.dcodeIO && a.global.dcodeIO.Long) ||
        a.global.Long ||
        a.inquire("long");
      a.key2Re = /^true|false|0|1$/;
      a.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
      a.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
      a.longToHash = function (b) {
        return b ? a.LongBits.from(b).toHash() : a.LongBits.zeroHash;
      };
      a.longFromHash = function (b, c) {
        b = a.LongBits.fromHash(b);
        return a.Long ? a.Long.fromBits(b.lo, b.hi, c) : b.toNumber(!!c);
      };
      a.merge = b;
      a.lcFirst = function (a) {
        return a.charAt(0).toLowerCase() + a.substring(1);
      };
      a.newError = d;
      a.ProtocolError = d("ProtocolError");
      a.oneOfGetter = function (a) {
        for (var b = {}, c = 0; c < a.length; ++c) b[a[c]] = 1;
        return function () {
          for (var a = Object.keys(this), c = a.length - 1; -1 < c; --c)
            if (1 === b[a[c]] && void 0 !== this[a[c]] && null !== this[a[c]])
              return a[c];
        };
      };
      a.oneOfSetter = function (a) {
        return function (b) {
          for (var c = 0; c < a.length; ++c) a[c] !== b && delete this[a[c]];
        };
      };
      a.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: !0
      };
      a._configure = function () {
        var b = a.Buffer;
        b
          ? ((a._Buffer_from =
              (b.from !== Uint8Array.from && b.from) ||
              function (a, c) {
                return new b(a, c);
              }),
            (a._Buffer_allocUnsafe =
              b.allocUnsafe ||
              function (a) {
                return new b(a);
              }))
          : (a._Buffer_from = a._Buffer_allocUnsafe = null);
      };
    }),
    Pe = Z,
    bg,
    qe = N.LongBits,
    lk = N.base64,
    mk = N.utf8,
    nk = function () {
      return N.Buffer
        ? function () {
            return (Z.create = function () {
              return new bg();
            })();
          }
        : function () {
            return new Z();
          };
    };
  Z.create = nk();
  Z.alloc = function (c) {
    return new N.Array(c);
  };
  N.Array !== Array && (Z.alloc = N.pool(Z.alloc, N.Array.prototype.subarray));
  Z.prototype._push = function (c, a, b) {
    return (
      (this.tail = this.tail.next = new Vc(c, a, b)), (this.len += a), this
    );
  };
  Me.prototype = Object.create(Vc.prototype);
  Me.prototype.fn = function (c, a, b) {
    for (; 127 < c; ) (a[b++] = (127 & c) | 128), (c >>>= 7);
    a[b] = c;
  };
  Z.prototype.uint32 = function (c) {
    return (
      (this.len += (this.tail = this.tail.next =
        new Me(
          128 > (c >>>= 0)
            ? 1
            : 16384 > c
            ? 2
            : 2097152 > c
            ? 3
            : 268435456 > c
            ? 4
            : 5,
          c
        )).len),
      this
    );
  };
  Z.prototype.int32 = function (c) {
    return 0 > c ? this._push(Ne, 10, qe.fromNumber(c)) : this.uint32(c);
  };
  Z.prototype.sint32 = function (c) {
    return this.uint32(((c << 1) ^ (c >> 31)) >>> 0);
  };
  Z.prototype.uint64 = function (c) {
    c = qe.from(c);
    return this._push(Ne, c.length(), c);
  };
  Z.prototype.int64 = Z.prototype.uint64;
  Z.prototype.sint64 = function (c) {
    c = qe.from(c).zzEncode();
    return this._push(Ne, c.length(), c);
  };
  Z.prototype.bool = function (c) {
    return this._push(Le, 1, c ? 1 : 0);
  };
  Z.prototype.fixed32 = function (c) {
    return this._push(Oe, 4, c >>> 0);
  };
  Z.prototype.sfixed32 = Z.prototype.fixed32;
  Z.prototype.fixed64 = function (c) {
    c = qe.from(c);
    return this._push(Oe, 4, c.lo)._push(Oe, 4, c.hi);
  };
  Z.prototype.sfixed64 = Z.prototype.fixed64;
  Z.prototype.float = function (c) {
    return this._push(N.float.writeFloatLE, 4, c);
  };
  Z.prototype.double = function (c) {
    return this._push(N.float.writeDoubleLE, 8, c);
  };
  var To = N.Array.prototype.set
    ? function (c, a, b) {
        a.set(c, b);
      }
    : function (c, a, b) {
        for (var d = 0; d < c.length; ++d) a[b + d] = c[d];
      };
  Z.prototype.bytes = function (c) {
    var a = c.length >>> 0;
    if (!a) return this._push(Le, 1, 0);
    if (N.isString(c)) {
      var b = Z.alloc((a = lk.length(c)));
      lk.decode(c, b, 0);
      c = b;
    }
    return this.uint32(a)._push(To, a, c);
  };
  Z.prototype.string = function (c) {
    var a = mk.length(c);
    return a ? this.uint32(a)._push(mk.write, a, c) : this._push(Le, 1, 0);
  };
  Z.prototype.fork = function () {
    return (
      (this.states = new ql(this)),
      (this.head = this.tail = new Vc(Ke, 0, 0)),
      (this.len = 0),
      this
    );
  };
  Z.prototype.reset = function () {
    return (
      this.states
        ? ((this.head = this.states.head),
          (this.tail = this.states.tail),
          (this.len = this.states.len),
          (this.states = this.states.next))
        : ((this.head = this.tail = new Vc(Ke, 0, 0)), (this.len = 0)),
      this
    );
  };
  Z.prototype.ldelim = function () {
    var c = this.head,
      a = this.tail,
      b = this.len;
    return (
      this.reset().uint32(b),
      b && ((this.tail.next = c.next), (this.tail = a), (this.len += b)),
      this
    );
  };
  Z.prototype.finish = function () {
    for (
      var c = this.head.next, a = this.constructor.alloc(this.len), b = 0;
      c;

    )
      c.fn(c.val, a, b), (b += c.len), (c = c.next);
    return a;
  };
  Z._configure = function (c) {
    bg = c;
    Z.create = nk();
    bg._configure();
  };
  (yb.prototype = Object.create(Pe.prototype)).constructor = yb;
  yb._configure = function () {
    yb.alloc = N._Buffer_allocUnsafe;
    yb.writeBytesBuffer =
      N.Buffer &&
      N.Buffer.prototype instanceof Uint8Array &&
      "set" === N.Buffer.prototype.set.name
        ? function (c, a, b) {
            a.set(c, b);
          }
        : function (c, a, b) {
            if (c.copy) c.copy(a, b, 0, c.length);
            else for (var d = 0; d < c.length; ) a[b++] = c[d++];
          };
  };
  yb.prototype.bytes = function (c) {
    N.isString(c) && (c = N._Buffer_from(c, "base64"));
    var a = c.length >>> 0;
    return this.uint32(a), a && this._push(yb.writeBytesBuffer, a, c), this;
  };
  yb.prototype.string = function (c) {
    var a = N.Buffer.byteLength(c);
    return this.uint32(a), a && this._push(rl, a, c), this;
  };
  yb._configure();
  var Re = ra,
    cg,
    xh = N.LongBits,
    Uo = N.utf8,
    ok =
      "undefined" != typeof Uint8Array
        ? function (c) {
            if (c instanceof Uint8Array || Array.isArray(c)) return new ra(c);
            throw Error("illegal buffer");
          }
        : function (c) {
            if (Array.isArray(c)) return new ra(c);
            throw Error("illegal buffer");
          },
    pk = function () {
      return N.Buffer
        ? function (c) {
            return (ra.create = function (a) {
              return N.Buffer.isBuffer(a) ? new cg(a) : ok(a);
            })(c);
          }
        : ok;
    },
    fb;
  ra.create = pk();
  ra.prototype._slice = N.Array.prototype.subarray || N.Array.prototype.slice;
  ra.prototype.uint32 =
    ((fb = 4294967295),
    function () {
      if (
        ((fb = (127 & this.buf[this.pos]) >>> 0), 128 > this.buf[this.pos++]) ||
        ((fb = (fb | ((127 & this.buf[this.pos]) << 7)) >>> 0),
        128 > this.buf[this.pos++]) ||
        ((fb = (fb | ((127 & this.buf[this.pos]) << 14)) >>> 0),
        128 > this.buf[this.pos++]) ||
        ((fb = (fb | ((127 & this.buf[this.pos]) << 21)) >>> 0),
        128 > this.buf[this.pos++]) ||
        ((fb = (fb | ((15 & this.buf[this.pos]) << 28)) >>> 0),
        128 > this.buf[this.pos++])
      )
        return fb;
      if ((this.pos += 5) > this.len)
        throw ((this.pos = this.len), lb(this, 10));
      return fb;
    });
  ra.prototype.int32 = function () {
    return 0 | this.uint32();
  };
  ra.prototype.sint32 = function () {
    var c = this.uint32();
    return ((c >>> 1) ^ -(1 & c)) | 0;
  };
  ra.prototype.bool = function () {
    return 0 !== this.uint32();
  };
  ra.prototype.fixed32 = function () {
    if (this.pos + 4 > this.len) throw lb(this, 4);
    return Kd(this.buf, (this.pos += 4));
  };
  ra.prototype.sfixed32 = function () {
    if (this.pos + 4 > this.len) throw lb(this, 4);
    return 0 | Kd(this.buf, (this.pos += 4));
  };
  ra.prototype.float = function () {
    if (this.pos + 4 > this.len) throw lb(this, 4);
    var c = N.float.readFloatLE(this.buf, this.pos);
    return (this.pos += 4), c;
  };
  ra.prototype.double = function () {
    if (this.pos + 8 > this.len) throw lb(this, 4);
    var c = N.float.readDoubleLE(this.buf, this.pos);
    return (this.pos += 8), c;
  };
  ra.prototype.bytes = function () {
    var c = this.uint32(),
      a = this.pos,
      b = this.pos + c;
    if (b > this.len) throw lb(this, c);
    return (
      (this.pos += c),
      Array.isArray(this.buf)
        ? this.buf.slice(a, b)
        : a === b
        ? new this.buf.constructor(0)
        : this._slice.call(this.buf, a, b)
    );
  };
  ra.prototype.string = function () {
    var c = this.bytes();
    return Uo.read(c, 0, c.length);
  };
  ra.prototype.skip = function (c) {
    if ("number" == typeof c) {
      if (this.pos + c > this.len) throw lb(this, c);
      this.pos += c;
    } else {
      do if (this.pos >= this.len) throw lb(this);
      while (128 & this.buf[this.pos++]);
    }
    return this;
  };
  ra.prototype.skipType = function (c) {
    switch (c) {
      case 0:
        this.skip();
        break;
      case 1:
        this.skip(8);
        break;
      case 2:
        this.skip(this.uint32());
        break;
      case 3:
        for (; 4 != (c = 7 & this.uint32()); ) this.skipType(c);
        break;
      case 5:
        this.skip(4);
        break;
      default:
        throw Error("invalid wire type " + c + " at offset " + this.pos);
    }
    return this;
  };
  ra._configure = function (c) {
    cg = c;
    ra.create = pk();
    cg._configure();
    var a = N.Long ? "toLong" : "toNumber";
    N.merge(ra.prototype, {
      int64: function () {
        return Qe.call(this)[a](!1);
      },
      uint64: function () {
        return Qe.call(this)[a](!0);
      },
      sint64: function () {
        return Qe.call(this).zzDecode()[a](!1);
      },
      fixed64: function () {
        return yh.call(this)[a](!0);
      },
      sfixed64: function () {
        return yh.call(this)[a](!1);
      }
    });
  };
  (dc.prototype = Object.create(Re.prototype)).constructor = dc;
  dc._configure = function () {
    N.Buffer && (dc.prototype._slice = N.Buffer.prototype.slice);
  };
  dc.prototype.string = function () {
    var c = this.uint32();
    return this.buf.utf8Slice
      ? this.buf.utf8Slice(
          this.pos,
          (this.pos = Math.min(this.pos + c, this.len))
        )
      : this.buf.toString(
          "utf-8",
          this.pos,
          (this.pos = Math.min(this.pos + c, this.len))
        );
  };
  dc._configure();
  (Wc.prototype = Object.create(N.EventEmitter.prototype)).constructor = Wc;
  Wc.prototype.rpcCall = function g(a, b, d, e, f) {
    if (!e) throw TypeError("request must be specified");
    var h = this;
    if (!f) return N.asPromise(g, h, a, b, d, e);
    if (h.rpcImpl)
      try {
        return h.rpcImpl(
          a,
          b[h.requestDelimited ? "encodeDelimited" : "encode"](e).finish(),
          function (b, e) {
            if (b) return h.emit("error", b, a), f(b);
            if (null !== e) {
              if (!(e instanceof d))
                try {
                  e = d[h.responseDelimited ? "decodeDelimited" : "decode"](e);
                } catch (T) {
                  return h.emit("error", T, a), f(T);
                }
              return h.emit("data", e, a), f(null, e);
            }
            h.end(!0);
          }
        );
      } catch (q) {
        return (
          h.emit("error", q, a),
          void setTimeout(function () {
            f(q);
          }, 0)
        );
      }
    else
      setTimeout(function () {
        f(Error("already ended"));
      }, 0);
  };
  Wc.prototype.end = function (a) {
    return (
      this.rpcImpl &&
        (a || this.rpcImpl(null, null, null),
        (this.rpcImpl = null),
        this.emit("end").off()),
      this
    );
  };
  var Vo = Ka(function (a, b) {
      b.Service = Wc;
    }),
    Wo = {},
    Qb = Ka(function (a, b) {
      function d() {
        e.util._configure();
        e.Writer._configure(e.BufferWriter);
        e.Reader._configure(e.BufferReader);
      }
      var e = b;
      e.build = "minimal";
      e.Writer = Pe;
      e.BufferWriter = yb;
      e.Reader = Re;
      e.BufferReader = dc;
      e.util = N;
      e.rpc = Vo;
      e.roots = Wo;
      e.configure = d;
      d();
    }),
    Ja = Qb.Reader,
    re = Qb.Writer,
    p = Qb.util,
    ta = Qb.roots.default || (Qb.roots.default = {}),
    Pc;
  ta.Events =
    ((Pc = {}),
    (Pc.Message = (function () {
      function a(a) {
        if (a)
          for (var b = V(a), e = 0; e < b.length; ++e)
            null != a[b[e]] && (this[b[e]] = a[b[e]]);
      }
      return (
        (a.prototype.id = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.msg = p.newBuffer([])),
        (a.create = function (b) {
          return new a(b);
        }),
        (a.encode = function (a, d) {
          return (
            d || (d = re.create()),
            null != a.id &&
              Object.hasOwnProperty.call(a, "id") &&
              d.uint32(8).int64(a.id),
            null != a.msg &&
              Object.hasOwnProperty.call(a, "msg") &&
              d.uint32(18).bytes(a.msg),
            d
          );
        }),
        (a.encodeDelimited = function (a, d) {
          return this.encode(a, d).ldelim();
        }),
        (a.decode = function (a, d) {
          a instanceof Ja || (a = Ja.create(a));
          d = void 0 === d ? a.len : a.pos + d;
          for (var b = new ta.Events.Message(); a.pos < d; ) {
            var f = a.uint32();
            switch (f >>> 3) {
              case 1:
                b.id = a.int64();
                break;
              case 2:
                b.msg = a.bytes();
                break;
              default:
                a.skipType(7 & f);
            }
          }
          return b;
        }),
        (a.decodeDelimited = function (a) {
          return a instanceof Ja || (a = new Ja(a)), this.decode(a, a.uint32());
        }),
        (a.verify = function (a) {
          return "object" != typeof a || null === a
            ? "object expected"
            : null == a.id ||
              !a.hasOwnProperty("id") ||
              p.isInteger(a.id) ||
              (a.id && p.isInteger(a.id.low) && p.isInteger(a.id.high))
            ? null == a.msg ||
              !a.hasOwnProperty("msg") ||
              (a.msg && "number" == typeof a.msg.length) ||
              p.isString(a.msg)
              ? null
              : "msg: buffer expected"
            : "id: integer|Long expected";
        }),
        (a.fromObject = function (a) {
          if (a instanceof ta.Events.Message) return a;
          var b = new ta.Events.Message();
          return (
            null != a.id &&
              (p.Long
                ? ((b.id = p.Long.fromValue(a.id)).unsigned = !1)
                : "string" == typeof a.id
                ? (b.id = S(a.id, 10))
                : "number" == typeof a.id
                ? (b.id = a.id)
                : "object" == typeof a.id &&
                  (b.id = new p.LongBits(
                    a.id.low >>> 0,
                    a.id.high >>> 0
                  ).toNumber())),
            null != a.msg &&
              ("string" == typeof a.msg
                ? p.base64.decode(
                    a.msg,
                    (b.msg = p.newBuffer(p.base64.length(a.msg))),
                    0
                  )
                : a.msg.length && (b.msg = a.msg)),
            b
          );
        }),
        (a.toObject = function (a, d) {
          d || (d = {});
          var b = {};
          if (d.defaults) {
            if (p.Long) {
              var f = new p.Long(0, 0, !1);
              b.id =
                d.longs === String
                  ? f.toString()
                  : d.longs === Number
                  ? f.toNumber()
                  : f;
            } else b.id = d.longs === String ? "0" : 0;
            d.bytes === String
              ? (b.msg = "")
              : ((b.msg = []),
                d.bytes !== Array && (b.msg = p.newBuffer(b.msg)));
          }
          return (
            null != a.id &&
              a.hasOwnProperty("id") &&
              ("number" == typeof a.id
                ? (b.id = d.longs === String ? String(a.id) : a.id)
                : (b.id =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.id)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.id.low >>> 0,
                          a.id.high >>> 0
                        ).toNumber()
                      : a.id)),
            null != a.msg &&
              a.hasOwnProperty("msg") &&
              (b.msg =
                d.bytes === String
                  ? p.base64.encode(a.msg, 0, a.msg.length)
                  : d.bytes === Array
                  ? wb(Array.prototype).call(a.msg)
                  : a.msg),
            b
          );
        }),
        (a.prototype.toJSON = function () {
          return this.constructor.toObject(this, Qb.util.toJSONOptions);
        }),
        a
      );
    })()),
    (Pc.ProtoRaws = (function () {
      function a(a) {
        if (((this.payloads = []), a))
          for (var b = V(a), e = 0; e < b.length; ++e)
            null != a[b[e]] && (this[b[e]] = a[b[e]]);
      }
      return (
        (a.prototype.sendTs = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.payloads = p.emptyArray),
        (a.create = function (b) {
          return new a(b);
        }),
        (a.encode = function (a, d) {
          if (
            (d || (d = re.create()),
            null != a.sendTs &&
              Object.hasOwnProperty.call(a, "sendTs") &&
              d.uint32(8).int64(a.sendTs),
            null != a.payloads && a.payloads.length)
          )
            for (var b = 0; b < a.payloads.length; ++b)
              ta.Events.Message.encode(
                a.payloads[b],
                d.uint32(18).fork()
              ).ldelim();
          return d;
        }),
        (a.encodeDelimited = function (a, d) {
          return this.encode(a, d).ldelim();
        }),
        (a.decode = function (a, d) {
          a instanceof Ja || (a = Ja.create(a));
          d = void 0 === d ? a.len : a.pos + d;
          for (var b = new ta.Events.ProtoRaws(); a.pos < d; ) {
            var f = a.uint32();
            switch (f >>> 3) {
              case 1:
                b.sendTs = a.int64();
                break;
              case 2:
                (b.payloads && b.payloads.length) || (b.payloads = []);
                b.payloads.push(ta.Events.Message.decode(a, a.uint32()));
                break;
              default:
                a.skipType(7 & f);
            }
          }
          return b;
        }),
        (a.decodeDelimited = function (a) {
          return a instanceof Ja || (a = new Ja(a)), this.decode(a, a.uint32());
        }),
        (a.verify = function (a) {
          if ("object" != typeof a || null === a) return "object expected";
          if (
            null != a.sendTs &&
            a.hasOwnProperty("sendTs") &&
            !(
              p.isInteger(a.sendTs) ||
              (a.sendTs &&
                p.isInteger(a.sendTs.low) &&
                p.isInteger(a.sendTs.high))
            )
          )
            return "sendTs: integer|Long expected";
          if (null != a.payloads && a.hasOwnProperty("payloads")) {
            if (!cc(a.payloads)) return "payloads: array expected";
            for (var b = 0; b < a.payloads.length; ++b) {
              var e = ta.Events.Message.verify(a.payloads[b]);
              if (e) return "payloads." + e;
            }
          }
          return null;
        }),
        (a.fromObject = function (a) {
          if (a instanceof ta.Events.ProtoRaws) return a;
          var b = new ta.Events.ProtoRaws();
          if (
            (null != a.sendTs &&
              (p.Long
                ? ((b.sendTs = p.Long.fromValue(a.sendTs)).unsigned = !1)
                : "string" == typeof a.sendTs
                ? (b.sendTs = S(a.sendTs, 10))
                : "number" == typeof a.sendTs
                ? (b.sendTs = a.sendTs)
                : "object" == typeof a.sendTs &&
                  (b.sendTs = new p.LongBits(
                    a.sendTs.low >>> 0,
                    a.sendTs.high >>> 0
                  ).toNumber())),
            a.payloads)
          ) {
            if (!cc(a.payloads))
              throw TypeError(".Events.ProtoRaws.payloads: array expected");
            b.payloads = [];
            for (var e = 0; e < a.payloads.length; ++e) {
              if ("object" != typeof a.payloads[e])
                throw TypeError(".Events.ProtoRaws.payloads: object expected");
              b.payloads[e] = ta.Events.Message.fromObject(a.payloads[e]);
            }
          }
          return b;
        }),
        (a.toObject = function (a, d) {
          d || (d = {});
          var b = {};
          if (((d.arrays || d.defaults) && (b.payloads = []), d.defaults))
            if (p.Long) {
              var f = new p.Long(0, 0, !1);
              b.sendTs =
                d.longs === String
                  ? f.toString()
                  : d.longs === Number
                  ? f.toNumber()
                  : f;
            } else b.sendTs = d.longs === String ? "0" : 0;
          if (
            (null != a.sendTs &&
              a.hasOwnProperty("sendTs") &&
              ("number" == typeof a.sendTs
                ? (b.sendTs = d.longs === String ? String(a.sendTs) : a.sendTs)
                : (b.sendTs =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.sendTs)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.sendTs.low >>> 0,
                          a.sendTs.high >>> 0
                        ).toNumber()
                      : a.sendTs)),
            a.payloads && a.payloads.length)
          )
            for (b.payloads = [], f = 0; f < a.payloads.length; ++f)
              b.payloads[f] = ta.Events.Message.toObject(a.payloads[f], d);
          return b;
        }),
        (a.prototype.toJSON = function () {
          return this.constructor.toObject(this, Qb.util.toJSONOptions);
        }),
        a
      );
    })()),
    (Pc.APWorkerEvent = (function () {
      function a(a) {
        if (a)
          for (var b = V(a), e = 0; e < b.length; ++e)
            null != a[b[e]] && (this[b[e]] = a[b[e]]);
      }
      return (
        (a.prototype.sid = ""),
        (a.prototype.cname = ""),
        (a.prototype.cid = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.lts = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.ip = ""),
        (a.prototype.uid = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.success = !1),
        (a.prototype.elapse = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.peer = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.ec = 0),
        (a.prototype.sc = 0),
        (a.prototype.serverIp = ""),
        (a.prototype.firstSuccess = !1),
        (a.prototype.responseTime = 0),
        (a.prototype.serviceName = ""),
        (a.prototype.responseDetail = ""),
        (a.create = function (b) {
          return new a(b);
        }),
        (a.encode = function (a, d) {
          return (
            d || (d = re.create()),
            null != a.sid &&
              Object.hasOwnProperty.call(a, "sid") &&
              d.uint32(10).string(a.sid),
            null != a.cname &&
              Object.hasOwnProperty.call(a, "cname") &&
              d.uint32(18).string(a.cname),
            null != a.cid &&
              Object.hasOwnProperty.call(a, "cid") &&
              d.uint32(24).int64(a.cid),
            null != a.lts &&
              Object.hasOwnProperty.call(a, "lts") &&
              d.uint32(32).int64(a.lts),
            null != a.ip &&
              Object.hasOwnProperty.call(a, "ip") &&
              d.uint32(42).string(a.ip),
            null != a.uid &&
              Object.hasOwnProperty.call(a, "uid") &&
              d.uint32(48).int64(a.uid),
            null != a.success &&
              Object.hasOwnProperty.call(a, "success") &&
              d.uint32(56).bool(a.success),
            null != a.elapse &&
              Object.hasOwnProperty.call(a, "elapse") &&
              d.uint32(64).int64(a.elapse),
            null != a.peer &&
              Object.hasOwnProperty.call(a, "peer") &&
              d.uint32(72).int64(a.peer),
            null != a.ec &&
              Object.hasOwnProperty.call(a, "ec") &&
              d.uint32(80).int32(a.ec),
            null != a.sc &&
              Object.hasOwnProperty.call(a, "sc") &&
              d.uint32(88).int32(a.sc),
            null != a.serverIp &&
              Object.hasOwnProperty.call(a, "serverIp") &&
              d.uint32(98).string(a.serverIp),
            null != a.firstSuccess &&
              Object.hasOwnProperty.call(a, "firstSuccess") &&
              d.uint32(104).bool(a.firstSuccess),
            null != a.responseTime &&
              Object.hasOwnProperty.call(a, "responseTime") &&
              d.uint32(112).int32(a.responseTime),
            null != a.serviceName &&
              Object.hasOwnProperty.call(a, "serviceName") &&
              d.uint32(122).string(a.serviceName),
            null != a.responseDetail &&
              Object.hasOwnProperty.call(a, "responseDetail") &&
              d.uint32(130).string(a.responseDetail),
            d
          );
        }),
        (a.encodeDelimited = function (a, d) {
          return this.encode(a, d).ldelim();
        }),
        (a.decode = function (a, d) {
          a instanceof Ja || (a = Ja.create(a));
          d = void 0 === d ? a.len : a.pos + d;
          for (var b = new ta.Events.APWorkerEvent(); a.pos < d; ) {
            var f = a.uint32();
            switch (f >>> 3) {
              case 1:
                b.sid = a.string();
                break;
              case 2:
                b.cname = a.string();
                break;
              case 3:
                b.cid = a.int64();
                break;
              case 4:
                b.lts = a.int64();
                break;
              case 5:
                b.ip = a.string();
                break;
              case 6:
                b.uid = a.int64();
                break;
              case 7:
                b.success = a.bool();
                break;
              case 8:
                b.elapse = a.int64();
                break;
              case 9:
                b.peer = a.int64();
                break;
              case 10:
                b.ec = a.int32();
                break;
              case 11:
                b.sc = a.int32();
                break;
              case 12:
                b.serverIp = a.string();
                break;
              case 13:
                b.firstSuccess = a.bool();
                break;
              case 14:
                b.responseTime = a.int32();
                break;
              case 15:
                b.serviceName = a.string();
                break;
              case 16:
                b.responseDetail = a.string();
                break;
              default:
                a.skipType(7 & f);
            }
          }
          return b;
        }),
        (a.decodeDelimited = function (a) {
          return a instanceof Ja || (a = new Ja(a)), this.decode(a, a.uint32());
        }),
        (a.verify = function (a) {
          return "object" != typeof a || null === a
            ? "object expected"
            : null != a.sid && a.hasOwnProperty("sid") && !p.isString(a.sid)
            ? "sid: string expected"
            : null != a.cname &&
              a.hasOwnProperty("cname") &&
              !p.isString(a.cname)
            ? "cname: string expected"
            : null == a.cid ||
              !a.hasOwnProperty("cid") ||
              p.isInteger(a.cid) ||
              (a.cid && p.isInteger(a.cid.low) && p.isInteger(a.cid.high))
            ? null == a.lts ||
              !a.hasOwnProperty("lts") ||
              p.isInteger(a.lts) ||
              (a.lts && p.isInteger(a.lts.low) && p.isInteger(a.lts.high))
              ? null != a.ip && a.hasOwnProperty("ip") && !p.isString(a.ip)
                ? "ip: string expected"
                : null == a.uid ||
                  !a.hasOwnProperty("uid") ||
                  p.isInteger(a.uid) ||
                  (a.uid && p.isInteger(a.uid.low) && p.isInteger(a.uid.high))
                ? null != a.success &&
                  a.hasOwnProperty("success") &&
                  "boolean" != typeof a.success
                  ? "success: boolean expected"
                  : null == a.elapse ||
                    !a.hasOwnProperty("elapse") ||
                    p.isInteger(a.elapse) ||
                    (a.elapse &&
                      p.isInteger(a.elapse.low) &&
                      p.isInteger(a.elapse.high))
                  ? null == a.peer ||
                    !a.hasOwnProperty("peer") ||
                    p.isInteger(a.peer) ||
                    (a.peer &&
                      p.isInteger(a.peer.low) &&
                      p.isInteger(a.peer.high))
                    ? null != a.ec &&
                      a.hasOwnProperty("ec") &&
                      !p.isInteger(a.ec)
                      ? "ec: integer expected"
                      : null != a.sc &&
                        a.hasOwnProperty("sc") &&
                        !p.isInteger(a.sc)
                      ? "sc: integer expected"
                      : null != a.serverIp &&
                        a.hasOwnProperty("serverIp") &&
                        !p.isString(a.serverIp)
                      ? "serverIp: string expected"
                      : null != a.firstSuccess &&
                        a.hasOwnProperty("firstSuccess") &&
                        "boolean" != typeof a.firstSuccess
                      ? "firstSuccess: boolean expected"
                      : null != a.responseTime &&
                        a.hasOwnProperty("responseTime") &&
                        !p.isInteger(a.responseTime)
                      ? "responseTime: integer expected"
                      : null != a.serviceName &&
                        a.hasOwnProperty("serviceName") &&
                        !p.isString(a.serviceName)
                      ? "serviceName: string expected"
                      : null != a.responseDetail &&
                        a.hasOwnProperty("responseDetail") &&
                        !p.isString(a.responseDetail)
                      ? "responseDetail: string expected"
                      : null
                    : "peer: integer|Long expected"
                  : "elapse: integer|Long expected"
                : "uid: integer|Long expected"
              : "lts: integer|Long expected"
            : "cid: integer|Long expected";
        }),
        (a.fromObject = function (a) {
          if (a instanceof ta.Events.APWorkerEvent) return a;
          var b = new ta.Events.APWorkerEvent();
          return (
            null != a.sid && (b.sid = String(a.sid)),
            null != a.cname && (b.cname = String(a.cname)),
            null != a.cid &&
              (p.Long
                ? ((b.cid = p.Long.fromValue(a.cid)).unsigned = !1)
                : "string" == typeof a.cid
                ? (b.cid = S(a.cid, 10))
                : "number" == typeof a.cid
                ? (b.cid = a.cid)
                : "object" == typeof a.cid &&
                  (b.cid = new p.LongBits(
                    a.cid.low >>> 0,
                    a.cid.high >>> 0
                  ).toNumber())),
            null != a.lts &&
              (p.Long
                ? ((b.lts = p.Long.fromValue(a.lts)).unsigned = !1)
                : "string" == typeof a.lts
                ? (b.lts = S(a.lts, 10))
                : "number" == typeof a.lts
                ? (b.lts = a.lts)
                : "object" == typeof a.lts &&
                  (b.lts = new p.LongBits(
                    a.lts.low >>> 0,
                    a.lts.high >>> 0
                  ).toNumber())),
            null != a.ip && (b.ip = String(a.ip)),
            null != a.uid &&
              (p.Long
                ? ((b.uid = p.Long.fromValue(a.uid)).unsigned = !1)
                : "string" == typeof a.uid
                ? (b.uid = S(a.uid, 10))
                : "number" == typeof a.uid
                ? (b.uid = a.uid)
                : "object" == typeof a.uid &&
                  (b.uid = new p.LongBits(
                    a.uid.low >>> 0,
                    a.uid.high >>> 0
                  ).toNumber())),
            null != a.success && (b.success = !!a.success),
            null != a.elapse &&
              (p.Long
                ? ((b.elapse = p.Long.fromValue(a.elapse)).unsigned = !1)
                : "string" == typeof a.elapse
                ? (b.elapse = S(a.elapse, 10))
                : "number" == typeof a.elapse
                ? (b.elapse = a.elapse)
                : "object" == typeof a.elapse &&
                  (b.elapse = new p.LongBits(
                    a.elapse.low >>> 0,
                    a.elapse.high >>> 0
                  ).toNumber())),
            null != a.peer &&
              (p.Long
                ? ((b.peer = p.Long.fromValue(a.peer)).unsigned = !1)
                : "string" == typeof a.peer
                ? (b.peer = S(a.peer, 10))
                : "number" == typeof a.peer
                ? (b.peer = a.peer)
                : "object" == typeof a.peer &&
                  (b.peer = new p.LongBits(
                    a.peer.low >>> 0,
                    a.peer.high >>> 0
                  ).toNumber())),
            null != a.ec && (b.ec = 0 | a.ec),
            null != a.sc && (b.sc = 0 | a.sc),
            null != a.serverIp && (b.serverIp = String(a.serverIp)),
            null != a.firstSuccess && (b.firstSuccess = !!a.firstSuccess),
            null != a.responseTime && (b.responseTime = 0 | a.responseTime),
            null != a.serviceName && (b.serviceName = String(a.serviceName)),
            null != a.responseDetail &&
              (b.responseDetail = String(a.responseDetail)),
            b
          );
        }),
        (a.toObject = function (a, d) {
          d || (d = {});
          var b = {};
          if (d.defaults) {
            if (((b.sid = ""), (b.cname = ""), p.Long)) {
              var f = new p.Long(0, 0, !1);
              b.cid =
                d.longs === String
                  ? f.toString()
                  : d.longs === Number
                  ? f.toNumber()
                  : f;
            } else b.cid = d.longs === String ? "0" : 0;
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.lts =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.lts = d.longs === String ? "0" : 0);
            b.ip = "";
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.uid =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.uid = d.longs === String ? "0" : 0);
            b.success = !1;
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.elapse =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.elapse = d.longs === String ? "0" : 0);
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.peer =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.peer = d.longs === String ? "0" : 0);
            b.ec = 0;
            b.sc = 0;
            b.serverIp = "";
            b.firstSuccess = !1;
            b.responseTime = 0;
            b.serviceName = "";
            b.responseDetail = "";
          }
          return (
            null != a.sid && a.hasOwnProperty("sid") && (b.sid = a.sid),
            null != a.cname && a.hasOwnProperty("cname") && (b.cname = a.cname),
            null != a.cid &&
              a.hasOwnProperty("cid") &&
              ("number" == typeof a.cid
                ? (b.cid = d.longs === String ? String(a.cid) : a.cid)
                : (b.cid =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.cid)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.cid.low >>> 0,
                          a.cid.high >>> 0
                        ).toNumber()
                      : a.cid)),
            null != a.lts &&
              a.hasOwnProperty("lts") &&
              ("number" == typeof a.lts
                ? (b.lts = d.longs === String ? String(a.lts) : a.lts)
                : (b.lts =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.lts)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.lts.low >>> 0,
                          a.lts.high >>> 0
                        ).toNumber()
                      : a.lts)),
            null != a.ip && a.hasOwnProperty("ip") && (b.ip = a.ip),
            null != a.uid &&
              a.hasOwnProperty("uid") &&
              ("number" == typeof a.uid
                ? (b.uid = d.longs === String ? String(a.uid) : a.uid)
                : (b.uid =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.uid)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.uid.low >>> 0,
                          a.uid.high >>> 0
                        ).toNumber()
                      : a.uid)),
            null != a.success &&
              a.hasOwnProperty("success") &&
              (b.success = a.success),
            null != a.elapse &&
              a.hasOwnProperty("elapse") &&
              ("number" == typeof a.elapse
                ? (b.elapse = d.longs === String ? String(a.elapse) : a.elapse)
                : (b.elapse =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.elapse)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.elapse.low >>> 0,
                          a.elapse.high >>> 0
                        ).toNumber()
                      : a.elapse)),
            null != a.peer &&
              a.hasOwnProperty("peer") &&
              ("number" == typeof a.peer
                ? (b.peer = d.longs === String ? String(a.peer) : a.peer)
                : (b.peer =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.peer)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.peer.low >>> 0,
                          a.peer.high >>> 0
                        ).toNumber()
                      : a.peer)),
            null != a.ec && a.hasOwnProperty("ec") && (b.ec = a.ec),
            null != a.sc && a.hasOwnProperty("sc") && (b.sc = a.sc),
            null != a.serverIp &&
              a.hasOwnProperty("serverIp") &&
              (b.serverIp = a.serverIp),
            null != a.firstSuccess &&
              a.hasOwnProperty("firstSuccess") &&
              (b.firstSuccess = a.firstSuccess),
            null != a.responseTime &&
              a.hasOwnProperty("responseTime") &&
              (b.responseTime = a.responseTime),
            null != a.serviceName &&
              a.hasOwnProperty("serviceName") &&
              (b.serviceName = a.serviceName),
            null != a.responseDetail &&
              a.hasOwnProperty("responseDetail") &&
              (b.responseDetail = a.responseDetail),
            b
          );
        }),
        (a.prototype.toJSON = function () {
          return this.constructor.toObject(this, Qb.util.toJSONOptions);
        }),
        a
      );
    })()),
    (Pc.WorkerEvent = (function () {
      function a(a) {
        if (a)
          for (var b = V(a), e = 0; e < b.length; ++e)
            null != a[b[e]] && (this[b[e]] = a[b[e]]);
      }
      return (
        (a.prototype.sid = ""),
        (a.prototype.cname = ""),
        (a.prototype.cid = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.lts = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.ip = ""),
        (a.prototype.uid = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.success = !1),
        (a.prototype.elapse = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.peer = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.command = ""),
        (a.prototype.actionType = ""),
        (a.prototype.url = ""),
        (a.prototype.payload = ""),
        (a.prototype.serverCode = 0),
        (a.prototype.code = 0),
        (a.prototype.traceId = ""),
        (a.prototype.workerType = 0),
        (a.prototype.responseTime = 0),
        (a.prototype.requestId = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.packIndex = 0),
        (a.prototype.requestByUser = !1),
        (a.prototype.tid = ""),
        (a.prototype.productType = ""),
        (a.create = function (b) {
          return new a(b);
        }),
        (a.encode = function (a, d) {
          return (
            d || (d = re.create()),
            null != a.sid &&
              Object.hasOwnProperty.call(a, "sid") &&
              d.uint32(10).string(a.sid),
            null != a.cname &&
              Object.hasOwnProperty.call(a, "cname") &&
              d.uint32(18).string(a.cname),
            null != a.cid &&
              Object.hasOwnProperty.call(a, "cid") &&
              d.uint32(24).int64(a.cid),
            null != a.lts &&
              Object.hasOwnProperty.call(a, "lts") &&
              d.uint32(32).int64(a.lts),
            null != a.ip &&
              Object.hasOwnProperty.call(a, "ip") &&
              d.uint32(42).string(a.ip),
            null != a.uid &&
              Object.hasOwnProperty.call(a, "uid") &&
              d.uint32(48).int64(a.uid),
            null != a.success &&
              Object.hasOwnProperty.call(a, "success") &&
              d.uint32(56).bool(a.success),
            null != a.elapse &&
              Object.hasOwnProperty.call(a, "elapse") &&
              d.uint32(64).int64(a.elapse),
            null != a.peer &&
              Object.hasOwnProperty.call(a, "peer") &&
              d.uint32(72).int64(a.peer),
            null != a.command &&
              Object.hasOwnProperty.call(a, "command") &&
              d.uint32(82).string(a.command),
            null != a.actionType &&
              Object.hasOwnProperty.call(a, "actionType") &&
              d.uint32(90).string(a.actionType),
            null != a.url &&
              Object.hasOwnProperty.call(a, "url") &&
              d.uint32(98).string(a.url),
            null != a.payload &&
              Object.hasOwnProperty.call(a, "payload") &&
              d.uint32(106).string(a.payload),
            null != a.serverCode &&
              Object.hasOwnProperty.call(a, "serverCode") &&
              d.uint32(112).int32(a.serverCode),
            null != a.code &&
              Object.hasOwnProperty.call(a, "code") &&
              d.uint32(120).int32(a.code),
            null != a.traceId &&
              Object.hasOwnProperty.call(a, "traceId") &&
              d.uint32(130).string(a.traceId),
            null != a.workerType &&
              Object.hasOwnProperty.call(a, "workerType") &&
              d.uint32(136).int32(a.workerType),
            null != a.responseTime &&
              Object.hasOwnProperty.call(a, "responseTime") &&
              d.uint32(144).int32(a.responseTime),
            null != a.requestId &&
              Object.hasOwnProperty.call(a, "requestId") &&
              d.uint32(152).int64(a.requestId),
            null != a.packIndex &&
              Object.hasOwnProperty.call(a, "packIndex") &&
              d.uint32(160).int32(a.packIndex),
            null != a.requestByUser &&
              Object.hasOwnProperty.call(a, "requestByUser") &&
              d.uint32(168).bool(a.requestByUser),
            null != a.tid &&
              Object.hasOwnProperty.call(a, "tid") &&
              d.uint32(178).string(a.tid),
            null != a.productType &&
              Object.hasOwnProperty.call(a, "productType") &&
              d.uint32(186).string(a.productType),
            d
          );
        }),
        (a.encodeDelimited = function (a, d) {
          return this.encode(a, d).ldelim();
        }),
        (a.decode = function (a, d) {
          a instanceof Ja || (a = Ja.create(a));
          d = void 0 === d ? a.len : a.pos + d;
          for (var b = new ta.Events.WorkerEvent(); a.pos < d; ) {
            var f = a.uint32();
            switch (f >>> 3) {
              case 1:
                b.sid = a.string();
                break;
              case 2:
                b.cname = a.string();
                break;
              case 3:
                b.cid = a.int64();
                break;
              case 4:
                b.lts = a.int64();
                break;
              case 5:
                b.ip = a.string();
                break;
              case 6:
                b.uid = a.int64();
                break;
              case 7:
                b.success = a.bool();
                break;
              case 8:
                b.elapse = a.int64();
                break;
              case 9:
                b.peer = a.int64();
                break;
              case 10:
                b.command = a.string();
                break;
              case 11:
                b.actionType = a.string();
                break;
              case 12:
                b.url = a.string();
                break;
              case 13:
                b.payload = a.string();
                break;
              case 14:
                b.serverCode = a.int32();
                break;
              case 15:
                b.code = a.int32();
                break;
              case 16:
                b.traceId = a.string();
                break;
              case 17:
                b.workerType = a.int32();
                break;
              case 18:
                b.responseTime = a.int32();
                break;
              case 19:
                b.requestId = a.int64();
                break;
              case 20:
                b.packIndex = a.int32();
                break;
              case 21:
                b.requestByUser = a.bool();
                break;
              case 22:
                b.tid = a.string();
                break;
              case 23:
                b.productType = a.string();
                break;
              default:
                a.skipType(7 & f);
            }
          }
          return b;
        }),
        (a.decodeDelimited = function (a) {
          return a instanceof Ja || (a = new Ja(a)), this.decode(a, a.uint32());
        }),
        (a.verify = function (a) {
          return "object" != typeof a || null === a
            ? "object expected"
            : null != a.sid && a.hasOwnProperty("sid") && !p.isString(a.sid)
            ? "sid: string expected"
            : null != a.cname &&
              a.hasOwnProperty("cname") &&
              !p.isString(a.cname)
            ? "cname: string expected"
            : null == a.cid ||
              !a.hasOwnProperty("cid") ||
              p.isInteger(a.cid) ||
              (a.cid && p.isInteger(a.cid.low) && p.isInteger(a.cid.high))
            ? null == a.lts ||
              !a.hasOwnProperty("lts") ||
              p.isInteger(a.lts) ||
              (a.lts && p.isInteger(a.lts.low) && p.isInteger(a.lts.high))
              ? null != a.ip && a.hasOwnProperty("ip") && !p.isString(a.ip)
                ? "ip: string expected"
                : null == a.uid ||
                  !a.hasOwnProperty("uid") ||
                  p.isInteger(a.uid) ||
                  (a.uid && p.isInteger(a.uid.low) && p.isInteger(a.uid.high))
                ? null != a.success &&
                  a.hasOwnProperty("success") &&
                  "boolean" != typeof a.success
                  ? "success: boolean expected"
                  : null == a.elapse ||
                    !a.hasOwnProperty("elapse") ||
                    p.isInteger(a.elapse) ||
                    (a.elapse &&
                      p.isInteger(a.elapse.low) &&
                      p.isInteger(a.elapse.high))
                  ? null == a.peer ||
                    !a.hasOwnProperty("peer") ||
                    p.isInteger(a.peer) ||
                    (a.peer &&
                      p.isInteger(a.peer.low) &&
                      p.isInteger(a.peer.high))
                    ? null != a.command &&
                      a.hasOwnProperty("command") &&
                      !p.isString(a.command)
                      ? "command: string expected"
                      : null != a.actionType &&
                        a.hasOwnProperty("actionType") &&
                        !p.isString(a.actionType)
                      ? "actionType: string expected"
                      : null != a.url &&
                        a.hasOwnProperty("url") &&
                        !p.isString(a.url)
                      ? "url: string expected"
                      : null != a.payload &&
                        a.hasOwnProperty("payload") &&
                        !p.isString(a.payload)
                      ? "payload: string expected"
                      : null != a.serverCode &&
                        a.hasOwnProperty("serverCode") &&
                        !p.isInteger(a.serverCode)
                      ? "serverCode: integer expected"
                      : null != a.code &&
                        a.hasOwnProperty("code") &&
                        !p.isInteger(a.code)
                      ? "code: integer expected"
                      : null != a.traceId &&
                        a.hasOwnProperty("traceId") &&
                        !p.isString(a.traceId)
                      ? "traceId: string expected"
                      : null != a.workerType &&
                        a.hasOwnProperty("workerType") &&
                        !p.isInteger(a.workerType)
                      ? "workerType: integer expected"
                      : null != a.responseTime &&
                        a.hasOwnProperty("responseTime") &&
                        !p.isInteger(a.responseTime)
                      ? "responseTime: integer expected"
                      : null == a.requestId ||
                        !a.hasOwnProperty("requestId") ||
                        p.isInteger(a.requestId) ||
                        (a.requestId &&
                          p.isInteger(a.requestId.low) &&
                          p.isInteger(a.requestId.high))
                      ? null != a.packIndex &&
                        a.hasOwnProperty("packIndex") &&
                        !p.isInteger(a.packIndex)
                        ? "packIndex: integer expected"
                        : null != a.requestByUser &&
                          a.hasOwnProperty("requestByUser") &&
                          "boolean" != typeof a.requestByUser
                        ? "requestByUser: boolean expected"
                        : null != a.tid &&
                          a.hasOwnProperty("tid") &&
                          !p.isString(a.tid)
                        ? "tid: string expected"
                        : null != a.productType &&
                          a.hasOwnProperty("productType") &&
                          !p.isString(a.productType)
                        ? "productType: string expected"
                        : null
                      : "requestId: integer|Long expected"
                    : "peer: integer|Long expected"
                  : "elapse: integer|Long expected"
                : "uid: integer|Long expected"
              : "lts: integer|Long expected"
            : "cid: integer|Long expected";
        }),
        (a.fromObject = function (a) {
          if (a instanceof ta.Events.WorkerEvent) return a;
          var b = new ta.Events.WorkerEvent();
          return (
            null != a.sid && (b.sid = String(a.sid)),
            null != a.cname && (b.cname = String(a.cname)),
            null != a.cid &&
              (p.Long
                ? ((b.cid = p.Long.fromValue(a.cid)).unsigned = !1)
                : "string" == typeof a.cid
                ? (b.cid = S(a.cid, 10))
                : "number" == typeof a.cid
                ? (b.cid = a.cid)
                : "object" == typeof a.cid &&
                  (b.cid = new p.LongBits(
                    a.cid.low >>> 0,
                    a.cid.high >>> 0
                  ).toNumber())),
            null != a.lts &&
              (p.Long
                ? ((b.lts = p.Long.fromValue(a.lts)).unsigned = !1)
                : "string" == typeof a.lts
                ? (b.lts = S(a.lts, 10))
                : "number" == typeof a.lts
                ? (b.lts = a.lts)
                : "object" == typeof a.lts &&
                  (b.lts = new p.LongBits(
                    a.lts.low >>> 0,
                    a.lts.high >>> 0
                  ).toNumber())),
            null != a.ip && (b.ip = String(a.ip)),
            null != a.uid &&
              (p.Long
                ? ((b.uid = p.Long.fromValue(a.uid)).unsigned = !1)
                : "string" == typeof a.uid
                ? (b.uid = S(a.uid, 10))
                : "number" == typeof a.uid
                ? (b.uid = a.uid)
                : "object" == typeof a.uid &&
                  (b.uid = new p.LongBits(
                    a.uid.low >>> 0,
                    a.uid.high >>> 0
                  ).toNumber())),
            null != a.success && (b.success = !!a.success),
            null != a.elapse &&
              (p.Long
                ? ((b.elapse = p.Long.fromValue(a.elapse)).unsigned = !1)
                : "string" == typeof a.elapse
                ? (b.elapse = S(a.elapse, 10))
                : "number" == typeof a.elapse
                ? (b.elapse = a.elapse)
                : "object" == typeof a.elapse &&
                  (b.elapse = new p.LongBits(
                    a.elapse.low >>> 0,
                    a.elapse.high >>> 0
                  ).toNumber())),
            null != a.peer &&
              (p.Long
                ? ((b.peer = p.Long.fromValue(a.peer)).unsigned = !1)
                : "string" == typeof a.peer
                ? (b.peer = S(a.peer, 10))
                : "number" == typeof a.peer
                ? (b.peer = a.peer)
                : "object" == typeof a.peer &&
                  (b.peer = new p.LongBits(
                    a.peer.low >>> 0,
                    a.peer.high >>> 0
                  ).toNumber())),
            null != a.command && (b.command = String(a.command)),
            null != a.actionType && (b.actionType = String(a.actionType)),
            null != a.url && (b.url = String(a.url)),
            null != a.payload && (b.payload = String(a.payload)),
            null != a.serverCode && (b.serverCode = 0 | a.serverCode),
            null != a.code && (b.code = 0 | a.code),
            null != a.traceId && (b.traceId = String(a.traceId)),
            null != a.workerType && (b.workerType = 0 | a.workerType),
            null != a.responseTime && (b.responseTime = 0 | a.responseTime),
            null != a.requestId &&
              (p.Long
                ? ((b.requestId = p.Long.fromValue(a.requestId)).unsigned = !1)
                : "string" == typeof a.requestId
                ? (b.requestId = S(a.requestId, 10))
                : "number" == typeof a.requestId
                ? (b.requestId = a.requestId)
                : "object" == typeof a.requestId &&
                  (b.requestId = new p.LongBits(
                    a.requestId.low >>> 0,
                    a.requestId.high >>> 0
                  ).toNumber())),
            null != a.packIndex && (b.packIndex = 0 | a.packIndex),
            null != a.requestByUser && (b.requestByUser = !!a.requestByUser),
            null != a.tid && (b.tid = String(a.tid)),
            null != a.productType && (b.productType = String(a.productType)),
            b
          );
        }),
        (a.toObject = function (a, d) {
          d || (d = {});
          var b = {};
          if (d.defaults) {
            if (((b.sid = ""), (b.cname = ""), p.Long)) {
              var f = new p.Long(0, 0, !1);
              b.cid =
                d.longs === String
                  ? f.toString()
                  : d.longs === Number
                  ? f.toNumber()
                  : f;
            } else b.cid = d.longs === String ? "0" : 0;
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.lts =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.lts = d.longs === String ? "0" : 0);
            b.ip = "";
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.uid =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.uid = d.longs === String ? "0" : 0);
            b.success = !1;
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.elapse =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.elapse = d.longs === String ? "0" : 0);
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.peer =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.peer = d.longs === String ? "0" : 0);
            b.command = "";
            b.actionType = "";
            b.url = "";
            b.payload = "";
            b.serverCode = 0;
            b.code = 0;
            b.traceId = "";
            b.workerType = 0;
            b.responseTime = 0;
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.requestId =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.requestId = d.longs === String ? "0" : 0);
            b.packIndex = 0;
            b.requestByUser = !1;
            b.tid = "";
            b.productType = "";
          }
          return (
            null != a.sid && a.hasOwnProperty("sid") && (b.sid = a.sid),
            null != a.cname && a.hasOwnProperty("cname") && (b.cname = a.cname),
            null != a.cid &&
              a.hasOwnProperty("cid") &&
              ("number" == typeof a.cid
                ? (b.cid = d.longs === String ? String(a.cid) : a.cid)
                : (b.cid =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.cid)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.cid.low >>> 0,
                          a.cid.high >>> 0
                        ).toNumber()
                      : a.cid)),
            null != a.lts &&
              a.hasOwnProperty("lts") &&
              ("number" == typeof a.lts
                ? (b.lts = d.longs === String ? String(a.lts) : a.lts)
                : (b.lts =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.lts)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.lts.low >>> 0,
                          a.lts.high >>> 0
                        ).toNumber()
                      : a.lts)),
            null != a.ip && a.hasOwnProperty("ip") && (b.ip = a.ip),
            null != a.uid &&
              a.hasOwnProperty("uid") &&
              ("number" == typeof a.uid
                ? (b.uid = d.longs === String ? String(a.uid) : a.uid)
                : (b.uid =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.uid)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.uid.low >>> 0,
                          a.uid.high >>> 0
                        ).toNumber()
                      : a.uid)),
            null != a.success &&
              a.hasOwnProperty("success") &&
              (b.success = a.success),
            null != a.elapse &&
              a.hasOwnProperty("elapse") &&
              ("number" == typeof a.elapse
                ? (b.elapse = d.longs === String ? String(a.elapse) : a.elapse)
                : (b.elapse =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.elapse)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.elapse.low >>> 0,
                          a.elapse.high >>> 0
                        ).toNumber()
                      : a.elapse)),
            null != a.peer &&
              a.hasOwnProperty("peer") &&
              ("number" == typeof a.peer
                ? (b.peer = d.longs === String ? String(a.peer) : a.peer)
                : (b.peer =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.peer)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.peer.low >>> 0,
                          a.peer.high >>> 0
                        ).toNumber()
                      : a.peer)),
            null != a.command &&
              a.hasOwnProperty("command") &&
              (b.command = a.command),
            null != a.actionType &&
              a.hasOwnProperty("actionType") &&
              (b.actionType = a.actionType),
            null != a.url && a.hasOwnProperty("url") && (b.url = a.url),
            null != a.payload &&
              a.hasOwnProperty("payload") &&
              (b.payload = a.payload),
            null != a.serverCode &&
              a.hasOwnProperty("serverCode") &&
              (b.serverCode = a.serverCode),
            null != a.code && a.hasOwnProperty("code") && (b.code = a.code),
            null != a.traceId &&
              a.hasOwnProperty("traceId") &&
              (b.traceId = a.traceId),
            null != a.workerType &&
              a.hasOwnProperty("workerType") &&
              (b.workerType = a.workerType),
            null != a.responseTime &&
              a.hasOwnProperty("responseTime") &&
              (b.responseTime = a.responseTime),
            null != a.requestId &&
              a.hasOwnProperty("requestId") &&
              ("number" == typeof a.requestId
                ? (b.requestId =
                    d.longs === String ? String(a.requestId) : a.requestId)
                : (b.requestId =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.requestId)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.requestId.low >>> 0,
                          a.requestId.high >>> 0
                        ).toNumber()
                      : a.requestId)),
            null != a.packIndex &&
              a.hasOwnProperty("packIndex") &&
              (b.packIndex = a.packIndex),
            null != a.requestByUser &&
              a.hasOwnProperty("requestByUser") &&
              (b.requestByUser = a.requestByUser),
            null != a.tid && a.hasOwnProperty("tid") && (b.tid = a.tid),
            null != a.productType &&
              a.hasOwnProperty("productType") &&
              (b.productType = a.productType),
            b
          );
        }),
        (a.prototype.toJSON = function () {
          return this.constructor.toObject(this, Qb.util.toJSONOptions);
        }),
        a
      );
    })()),
    Pc);
  let Xo = {
    sid: "",
    lts: 0,
    success: null,
    cname: null,
    uid: null,
    peer: null,
    cid: null,
    elapse: null,
    extend: null,
    vid: 0
  };
  var Ba, pa, qk;
  !(function (a) {
    a.PUBLISH = "publish";
    a.SUBSCRIBE = "subscribe";
    a.SESSION_INIT = "session_init";
    a.JOIN_CHOOSE_SERVER = "join_choose_server";
    a.REQ_USER_ACCOUNT = "req_user_account";
    a.JOIN_GATEWAY = "join_gateway";
    a.STREAM_SWITCH = "stream_switch";
    a.REQUEST_PROXY_WORKER_MANAGER = "request_proxy_worker_manager";
    a.REQUEST_PROXY_APPCENTER = "request_proxy_appcenter";
    a.FIRST_VIDEO_RECEIVED = "first_video_received";
    a.FIRST_AUDIO_RECEIVED = "first_audio_received";
    a.FIRST_VIDEO_DECODE = "first_video_decode";
    a.FIRST_AUDIO_DECODE = "first_audio_decode";
    a.ON_ADD_AUDIO_STREAM = "on_add_audio_stream";
    a.ON_ADD_VIDEO_STREAM = "on_add_video_stream";
    a.ON_UPDATE_STREAM = "on_update_stream";
    a.ON_REMOVE_STREAM = "on_remove_stream";
    a.USER_ANALYTICS = "req_user_analytics";
  })(Ba || (Ba = {}));
  (function (a) {
    a.SESSION = "io.agora.pb.Wrtc.Session";
    a.JOIN_CHOOSE_SERVER = "io.agora.pb.Wrtc.JoinChooseServer";
    a.REQ_USER_ACCOUNT = "io.agora.pb.Wrtc.ReqUserAccount";
    a.JOIN_GATEWAT = "io.agora.pb.Wrtc.JoinGateway";
    a.PUBLISH = "io.agora.pb.Wrtc.Publish";
    a.SUBSCRIBE = "io.agora.pb.Wrtc.Subscribe";
    a.STREAM_SWITCH = "io.agora.pb.Wrtc.StreamSwitch";
    a.AUDIO_SENDING_STOPPED = "io.agora.pb.Wrtc.AudioSendingStopped";
    a.VIDEO_SENDING_STOPPED = "io.agora.pb.Wrtc.VideoSendingStopped";
    a.REQUEST_PROXY_APPCENTER = "io.agora.pb.Wrtc.RequestProxyAppCenter";
    a.REQUEST_PROXY_WORKER_MANAGER =
      "io.agora.pb.Wrtc.RequestProxyWorkerManager";
    a.API_INVOKE = "io.agora.pb.Wrtc.ApiInvoke";
    a.FIRST_VIDEO_RECEIVED = "io.agora.pb.Wrtc.FirstVideoReceived";
    a.FIRST_AUDIO_RECEIVED = "io.agora.pb.Wrtc.FirstAudioReceived";
    a.FIRST_VIDEO_DECODE = "io.agora.pb.Wrtc.FirstVideoDecode";
    a.FIRST_AUDIO_DECODE = "io.agora.pb.Wrtc.FirstAudioDecode";
    a.ON_ADD_AUDIO_STREAM = "io.agora.pb.Wrtc.OnAddAudioStream";
    a.ON_ADD_VIDEO_STREAM = "io.agora.pb.Wrtc.OnAddVideoStream";
    a.ON_UPDATE_STREAM = "io.agora.pb.Wrtc.OnUpdateStream";
    a.ON_REMOVE_STREAM = "io.agora.pb.Wrtc.OnRemoveStream";
    a.JOIN_CHANNEL_TIMEOUT = "io.agora.pb.Wrtc.JoinChannelTimeout";
    a.PEER_PUBLISH_STATUS = "io.agora.pb.Wrtc.PeerPublishStatus";
    a.USER_ANALYTICS = "io.agora.pb.Wrtc.UserAnalytics";
  })(pa || (pa = {}));
  (function (a) {
    a[(a.WORKER_EVENT = 156)] = "WORKER_EVENT";
    a[(a.AP_WORKER_EVENT = 160)] = "AP_WORKER_EVENT";
  })(qk || (qk = {}));
  let Yo = (a) => {
    const b = V(ta.Events);
    return !!La(b).call(b, a.type);
  };
  var A, z, pc, Rb, Ac, sd, rb, Ca, B, O, ua, P, ha, sb, X, G, gb;
  !(function (a) {
    a.CREATE_CLIENT = "createClient";
    a.CHECK_SYSTEM_REQUIREMENTS = "checkSystemRequirements";
    a.CHECK_VIDEO_TRACK_IS_ACTIVE = "checkVideoTrackIsActive";
    a.CHECK_AUDIO_TRACK_IS_ACTIVE = "checkAudioTrackIsActive";
    a.CREATE_MIC_AUDIO_TRACK = "createMicrophoneAudioTrack";
    a.CREATE_CUSTOM_AUDIO_TRACK = "createCustomAudioTrack";
    a.CREATE_BUFFER_AUDIO_TRACK = "createBufferSourceAudioTrack";
    a.CREATE_CAM_VIDEO_TRACK = "createCameraVideoTrack";
    a.CREATE_CUSTOM_VIDEO_TRACK = "createCustomVideoTrack";
    a.CREATE_MIC_AND_CAM_TRACKS = "createMicrophoneAndCameraTracks";
    a.CREATE_SCREEN_VIDEO_TRACK = "createScreenVideoTrack";
    a.SET_ENCRYPTION_CONFIG = "Client.setEncryptionConfig";
    a.START_PROXY_SERVER = "Client.startProxyServer";
    a.STOP_PROXY_SERVER = "Client.stopProxyServer";
    a.SET_PROXY_SERVER = "Client.setProxyServer";
    a.SET_TURN_SERVER = "Client.setTurnServer";
    a.SET_CLIENT_ROLE = "Client.setClientRole";
    a.SET_LOW_STREAM_PARAMETER = "Client.setLowStreamParameter";
    a.ENABLE_DUAL_STREAM = "Client.enableDualStream";
    a.DISABLE_DUAL_STREAM = "Client.disableDualStream";
    a.JOIN = "Client.join";
    a.LEAVE = "Client.leave";
    a.PUBLISH = "Client.publish";
    a.UNPUBLISH = "Client.unpublish";
    a.SUBSCRIBE = "Client.subscribe";
    a.UNSUBSCRIBE = "Client.unsubscribe";
    a.RENEW_TOKEN = "Client.renewToken";
    a.SET_REMOTE_VIDEO_STREAM_TYPE = "Client.setRemoteVideoStreamType";
    a.SET_STREAM_FALLBACK_OPTION = "Client.setStreamFallbackOption";
    a.ENABLE_AUDIO_VOLUME_INDICATOR = "Client.enableAudioVolumeIndicator";
    a.SEND_CUSTOM_REPORT_MESSAGE = "Client.sendCustomReportMessage";
    a.ON_LIVE_STREAM_WARNING = "Client.onLiveStreamWarning";
    a.ON_LIVE_STREAM_ERROR = "Client.onLiveStreamingError";
    a.START_LIVE_STREAMING = "Client.startLiveStreaming";
    a.SET_LIVE_TRANSCODING = "Client.setLiveTranscoding";
    a.STOP_LIVE_STREAMING = "Client.stopLiveStreaming";
    a.ADD_INJECT_STREAM_URL = "Client.addInjectStreamUrl";
    a.REMOVE_INJECT_STREAM_URL = "Client.removeInjectStreamUrl";
    a.START_CHANNEL_MEDIA_RELAY = "Client.startChannelMediaRelay";
    a.UPDATE_CHANNEL_MEDIA_RELAY = "Client.updateChannelMediaRelay";
    a.STOP_CHANNEL_MEDIA_RELAY = "Client.stopChannelMediaRelay";
    a.REQUEST_CONFIG_DISTRIBUTE = "_config-distribute-request";
    a.SET_CONFIG_DISTRIBUTE = "_configDistribute";
    a.LOCAL_TRACK_SET_MUTED = "LocalTrack.setMute";
    a.LOCAL_AUDIO_TRACK_PLAY = "LocalAudioTrack.play";
    a.LOCAL_AUDIO_TRACK_PLAY_IN_ELEMENT = "LocalAudioTrack.playInElement";
    a.LOCAL_AUDIO_TRACK_STOP = "LocalAudioTrack.stop";
    a.LOCAL_AUDIO_TRACK_SET_VOLUME = "LocalAudioTrack.setVolume";
    a.MIC_AUDIO_TRACK_SET_DEVICE = "MicrophoneAudioTrack.setDevice";
    a.BUFFER_AUDIO_TRACK_START =
      "BufferSourceAudioTrack.startProcessAudioBuffer";
    a.BUFFER_AUDIO_TRACK_STOP = "BufferSourceAudioTrack.stopProcessAudioBuffer";
    a.BUFFER_AUDIO_TRACK_PAUSE =
      "BufferSourceAudioTrack.pauseProcessAudioBuffer";
    a.BUFFER_AUDIO_TRACK_RESUME =
      "BufferSourceAudioTrack.resumeProcessAudioBuffer";
    a.BUFFER_AUDIO_TRACK_SEEK = "BufferSourceAudioTrack.seekAudioBuffer";
    a.LOCAL_VIDEO_TRACK_PLAY = "LocalVideoTrack.play";
    a.LOCAL_VIDEO_TRACK_STOP = "LocalVideoTrack.stop";
    a.LOCAL_VIDEO_TRACK_BEAUTY = "LocalVideoTrack.setBeautyEffect";
    a.CAM_VIDEO_TRACK_SET_DEVICE = "CameraVideoTrack.setDevice";
    a.CAM_VIDEO_TRACK_SET_ENCODER_CONFIG =
      "CameraVideoTrack.setEncoderConfiguration";
    a.REMOTE_VIDEO_TRACK_PLAY = "RemoteVideoTrack.play";
    a.REMOTE_VIDEO_TRACK_STOP = "RemoteVideoTrack.stop";
    a.REMOTE_AUDIO_TRACK_PLAY = "RemoteAudioTrack.play";
    a.REMOTE_AUDIO_TRACK_STOP = "RemoteAudioTrack.stop";
    a.REMOTE_AUDIO_SET_VOLUME = "RemoteAudioTrack.setVolume";
    a.REMOTE_AUDIO_SET_OUTPUT_DEVICE = "RemoteAudioTrack.setOutputDevice";
    a.STREAM_TYPE_CHANGE = "streamTypeChange";
  })(A || (A = {}));
  (z || (z = {})).TRACER = "tracer";
  (function (a) {
    a.IDLE = "IDLE";
    a.INITING = "INITING";
    a.INITEND = "INITEND";
  })(pc || (pc = {}));
  (function (a) {
    a.STATE_CHANGE = "state_change";
    a.RECORDING_DEVICE_CHANGED = "recordingDeviceChanged";
    a.PLAYOUT_DEVICE_CHANGED = "playoutDeviceChanged";
    a.CAMERA_DEVICE_CHANGED = "cameraDeviceChanged";
  })(Rb || (Rb = {}));
  (function (a) {
    a[(a.ACCESS_POINT = 101)] = "ACCESS_POINT";
    a[(a.UNILBS = 201)] = "UNILBS";
    a[(a.STRING_UID_ALLOCATOR = 901)] = "STRING_UID_ALLOCATOR";
  })(Ac || (Ac = {}));
  (function (a) {
    a[(a.IIIEGAL_APPID = 1)] = "IIIEGAL_APPID";
    a[(a.IIIEGAL_UID = 2)] = "IIIEGAL_UID";
    a[(a.INTERNAL_ERROR = 3)] = "INTERNAL_ERROR";
  })(sd || (sd = {}));
  (function (a) {
    a[(a.INVALID_VENDOR_KEY = 5)] = "INVALID_VENDOR_KEY";
    a[(a.INVALID_CHANNEL_NAME = 7)] = "INVALID_CHANNEL_NAME";
    a[(a.INTERNAL_ERROR = 8)] = "INTERNAL_ERROR";
    a[(a.NO_AUTHORIZED = 9)] = "NO_AUTHORIZED";
    a[(a.DYNAMIC_KEY_TIMEOUT = 10)] = "DYNAMIC_KEY_TIMEOUT";
    a[(a.NO_ACTIVE_STATUS = 11)] = "NO_ACTIVE_STATUS";
    a[(a.DYNAMIC_KEY_EXPIRED = 13)] = "DYNAMIC_KEY_EXPIRED";
    a[(a.STATIC_USE_DYNAMIC_KEY = 14)] = "STATIC_USE_DYNAMIC_KEY";
    a[(a.DYNAMIC_USE_STATIC_KEY = 15)] = "DYNAMIC_USE_STATIC_KEY";
  })(rb || (rb = {}));
  (function (a) {
    a[(a.NO_FLAG_SET = 100)] = "NO_FLAG_SET";
    a[(a.FLAG_SET_BUT_EMPTY = 101)] = "FLAG_SET_BUT_EMPTY";
    a[(a.INVALID_FALG_SET = 102)] = "INVALID_FALG_SET";
    a[(a.NO_SERVICE_AVAILABLE = 200)] = "NO_SERVICE_AVAILABLE";
    a[(a.NO_SERVICE_AVAILABLE_P2P = 201)] = "NO_SERVICE_AVAILABLE_P2P";
    a[(a.NO_SERVICE_AVAILABLE_VOICE = 202)] = "NO_SERVICE_AVAILABLE_VOICE";
    a[(a.NO_SERVICE_AVAILABLE_WEBRTC = 203)] = "NO_SERVICE_AVAILABLE_WEBRTC";
    a[(a.NO_SERVICE_AVAILABLE_CDS = 204)] = "NO_SERVICE_AVAILABLE_CDS";
    a[(a.NO_SERVICE_AVAILABLE_CDN = 205)] = "NO_SERVICE_AVAILABLE_CDN";
    a[(a.NO_SERVICE_AVAILABLE_TDS = 206)] = "NO_SERVICE_AVAILABLE_TDS";
    a[(a.NO_SERVICE_AVAILABLE_REPORT = 207)] = "NO_SERVICE_AVAILABLE_REPORT";
    a[(a.NO_SERVICE_AVAILABLE_APP_CENTER = 208)] =
      "NO_SERVICE_AVAILABLE_APP_CENTER";
    a[(a.NO_SERVICE_AVAILABLE_ENV0 = 209)] = "NO_SERVICE_AVAILABLE_ENV0";
    a[(a.NO_SERVICE_AVAILABLE_VOET = 210)] = "NO_SERVICE_AVAILABLE_VOET";
    a[(a.NO_SERVICE_AVAILABLE_STRING_UID = 211)] =
      "NO_SERVICE_AVAILABLE_STRING_UID";
    a[(a.NO_SERVICE_AVAILABLE_WEBRTC_UNILBS = 212)] =
      "NO_SERVICE_AVAILABLE_WEBRTC_UNILBS";
  })(Ca || (Ca = {}));
  (function (a) {
    a[(a.K_TIMESTAMP_EXPIRED = 2)] = "K_TIMESTAMP_EXPIRED";
    a[(a.K_CHANNEL_PERMISSION_INVALID = 3)] = "K_CHANNEL_PERMISSION_INVALID";
    a[(a.K_CERTIFICATE_INVALID = 4)] = "K_CERTIFICATE_INVALID";
    a[(a.K_CHANNEL_NAME_EMPTY = 5)] = "K_CHANNEL_NAME_EMPTY";
    a[(a.K_CHANNEL_NOT_FOUND = 6)] = "K_CHANNEL_NOT_FOUND";
    a[(a.K_TICKET_INVALID = 7)] = "K_TICKET_INVALID";
    a[(a.K_CHANNEL_CONFLICTED = 8)] = "K_CHANNEL_CONFLICTED";
    a[(a.K_SERVICE_NOT_READY = 9)] = "K_SERVICE_NOT_READY";
    a[(a.K_SERVICE_TOO_HEAVY = 10)] = "K_SERVICE_TOO_HEAVY";
    a[(a.K_UID_BANNED = 14)] = "K_UID_BANNED";
    a[(a.K_IP_BANNED = 15)] = "K_IP_BANNED";
    a[(a.K_CHANNEL_BANNED = 16)] = "K_CHANNEL_BANNED";
    a[(a.WARN_NO_AVAILABLE_CHANNEL = 103)] = "WARN_NO_AVAILABLE_CHANNEL";
    a[(a.WARN_LOOKUP_CHANNEL_TIMEOUT = 104)] = "WARN_LOOKUP_CHANNEL_TIMEOUT";
    a[(a.WARN_LOOKUP_CHANNEL_REJECTED = 105)] = "WARN_LOOKUP_CHANNEL_REJECTED";
    a[(a.WARN_OPEN_CHANNEL_TIMEOUT = 106)] = "WARN_OPEN_CHANNEL_TIMEOUT";
    a[(a.WARN_OPEN_CHANNEL_REJECTED = 107)] = "WARN_OPEN_CHANNEL_REJECTED";
    a[(a.WARN_REQUEST_DEFERRED = 108)] = "WARN_REQUEST_DEFERRED";
    a[(a.ERR_DYNAMIC_KEY_TIMEOUT = 109)] = "ERR_DYNAMIC_KEY_TIMEOUT";
    a[(a.ERR_NO_AUTHORIZED = 110)] = "ERR_NO_AUTHORIZED";
    a[(a.ERR_VOM_SERVICE_UNAVAILABLE = 111)] = "ERR_VOM_SERVICE_UNAVAILABLE";
    a[(a.ERR_NO_CHANNEL_AVAILABLE_CODE = 112)] =
      "ERR_NO_CHANNEL_AVAILABLE_CODE";
    a[(a.ERR_MASTER_VOCS_UNAVAILABLE = 114)] = "ERR_MASTER_VOCS_UNAVAILABLE";
    a[(a.ERR_INTERNAL_ERROR = 115)] = "ERR_INTERNAL_ERROR";
    a[(a.ERR_NO_ACTIVE_STATUS = 116)] = "ERR_NO_ACTIVE_STATUS";
    a[(a.ERR_INVALID_UID = 117)] = "ERR_INVALID_UID";
    a[(a.ERR_DYNAMIC_KEY_EXPIRED = 118)] = "ERR_DYNAMIC_KEY_EXPIRED";
    a[(a.ERR_STATIC_USE_DYANMIC_KE = 119)] = "ERR_STATIC_USE_DYANMIC_KE";
    a[(a.ERR_DYNAMIC_USE_STATIC_KE = 120)] = "ERR_DYNAMIC_USE_STATIC_KE";
    a[(a.ERR_NO_VOCS_AVAILABLE = 2e3)] = "ERR_NO_VOCS_AVAILABLE";
    a[(a.ERR_NO_VOS_AVAILABLE = 2001)] = "ERR_NO_VOS_AVAILABLE";
    a[(a.ERR_JOIN_CHANNEL_TIMEOUT = 2002)] = "ERR_JOIN_CHANNEL_TIMEOUT";
    a[(a.ERR_REPEAT_JOIN_CHANNEL = 2003)] = "ERR_REPEAT_JOIN_CHANNEL";
    a[(a.ERR_JOIN_BY_MULTI_IP = 2004)] = "ERR_JOIN_BY_MULTI_IP";
    a[(a.ERR_NOT_JOINED = 2011)] = "ERR_NOT_JOINED";
    a[(a.ERR_REPEAT_JOIN_REQUEST = 2012)] = "ERR_REPEAT_JOIN_REQUEST";
    a[(a.ERR_INVALID_VENDOR_KEY = 2013)] = "ERR_INVALID_VENDOR_KEY";
    a[(a.ERR_INVALID_CHANNEL_NAME = 2014)] = "ERR_INVALID_CHANNEL_NAME";
    a[(a.ERR_INVALID_STRINGUID = 2015)] = "ERR_INVALID_STRINGUID";
    a[(a.ERR_TOO_MANY_USERS = 2016)] = "ERR_TOO_MANY_USERS";
    a[(a.ERR_SET_CLIENT_ROLE_TIMEOUT = 2017)] = "ERR_SET_CLIENT_ROLE_TIMEOUT";
    a[(a.ERR_SET_CLIENT_ROLE_NO_PERMISSION = 2018)] =
      "ERR_SET_CLIENT_ROLE_NO_PERMISSION";
    a[(a.ERR_SET_CLIENT_ROLE_ALREADY_IN_USE = 2019)] =
      "ERR_SET_CLIENT_ROLE_ALREADY_IN_USE";
    a[(a.ERR_PUBLISH_REQUEST_INVALID = 2020)] = "ERR_PUBLISH_REQUEST_INVALID";
    a[(a.ERR_SUBSCRIBE_REQUEST_INVALID = 2021)] =
      "ERR_SUBSCRIBE_REQUEST_INVALID";
    a[(a.ERR_NOT_SUPPORTED_MESSAGE = 2022)] = "ERR_NOT_SUPPORTED_MESSAGE";
    a[(a.ERR_ILLEAGAL_PLUGIN = 2023)] = "ERR_ILLEAGAL_PLUGIN";
    a[(a.ERR_REJOIN_TOKEN_INVALID = 2024)] = "ERR_REJOIN_TOKEN_INVALID";
    a[(a.ERR_REJOIN_USER_NOT_JOINED = 2025)] = "ERR_REJOIN_USER_NOT_JOINED";
    a[(a.ERR_INVALID_OPTIONAL_INFO = 2027)] = "ERR_INVALID_OPTIONAL_INFO";
    a[(a.ERR_TEST_RECOVER = 9e3)] = "ERR_TEST_RECOVER";
    a[(a.ERR_TEST_TRYNEXT = 9001)] = "ERR_TEST_TRYNEXT";
    a[(a.ERR_TEST_RETRY = 9002)] = "ERR_TEST_RETRY";
  })(B || (B = {}));
  (function (a) {
    a.CONNECTION_STATE_CHANGE = "connection-state-change";
    a.MEDIA_RECONNECT_START = "media-reconnect-start";
    a.MEDIA_RECONNECT_END = "media-reconnect-end";
    a.USER_JOINED = "user-joined";
    a.USER_LEAVED = "user-left";
    a.USER_PUBLISHED = "user-published";
    a.USER_UNPUBLISHED = "user-unpublished";
    a.USER_INFO_UPDATED = "user-info-updated";
    a.CLIENT_BANNED = "client-banned";
    a.CHANNEL_MEDIA_RELAY_STATE = "channel-media-relay-state";
    a.CHANNEL_MEDIA_RELAY_EVENT = "channel-media-relay-event";
    a.VOLUME_INDICATOR = "volume-indicator";
    a.CRYPT_ERROR = "crypt-error";
    a.ON_TOKEN_PRIVILEGE_WILL_EXPIRE = "token-privilege-will-expire";
    a.ON_TOKEN_PRIVILEGE_DID_EXPIRE = "token-privilege-did-expire";
    a.NETWORK_QUALITY = "network-quality";
    a.STREAM_TYPE_CHANGED = "stream-type-changed";
    a.STREAM_FALLBACK = "stream-fallback";
    a.RECEIVE_METADATA = "receive-metadata";
    a.LIVE_STREAMING_ERROR = "live-streaming-error";
    a.LIVE_STREAMING_WARNING = "live-streaming-warning";
    a.INJECT_STREAM_STATUS = "stream-inject-status";
    a.EXCEPTION = "exception";
    a.ERROR = "error";
  })(O || (O = {}));
  (function (a) {
    a.CONNECTING = "connecting";
    a.CONNECTED = "connected";
    a.RECONNECTING = "reconnecting";
    a.CLOSED = "closed";
  })(ua || (ua = {}));
  (function (a) {
    a.WS_CONNECTED = "ws_connected";
    a.WS_RECONNECTING = "ws_reconnecting";
    a.WS_CLOSED = "ws_closed";
    a.ON_BINARY_DATA = "on_binary_data";
    a.REQUEST_RECOVER = "request_recover";
    a.REQUEST_JOIN_INFO = "request_join_info";
    a.REQUEST_REJOIN_INFO = "req_rejoin_info";
    a.IS_P2P_DISCONNECTED = "is_p2p_dis";
    a.DISCONNECT_P2P = "dis_p2p";
    a.NEED_RENEW_SESSION = "need-sid";
    a.REPORT_JOIN_GATEWAY = "report_join_gateway";
  })(P || (P = {}));
  (function (a) {
    a.PING = "ping";
    a.PING_BACK = "ping_back";
    a.JOIN = "join_v2";
    a.REJOIN = "rejoin";
    a.LEAVE = "leave";
    a.SET_CLIENT_ROLE = "set_client_role";
    a.PUBLISH = "publish";
    a.UNPUBLISH = "unpublish";
    a.SUBSCRIBE = "subscribe";
    a.UNSUBSCRIBE = "unsubscribe";
    a.SUBSCRIBE_CHANGE = "subscribe_change";
    a.TRAFFIC_STATS = "traffic_stats";
    a.RENEW_TOKEN = "renew_token";
    a.SWITCH_VIDEO_STREAM = "switch_video_stream";
    a.SET_FALLBACK_OPTION = "set_fallback_option";
    a.GATEWAY_INFO = "gateway_info";
    a.CONTROL = "control";
    a.SEND_METADATA = "send_metadata";
  })(ha || (ha = {}));
  (function (a) {
    a.PUBLISH_STATS = "publish_stats";
    a.PUBLISH_RELATED_STATS = "publish_related_stats";
    a.SUBSCRIBE_STATS = "subscribe_stats";
    a.SUBSCRIBE_RELATED_STATS = "subscribe_related_stats";
  })(sb || (sb = {}));
  (function (a) {
    a.ON_USER_ONLINE = "on_user_online";
    a.ON_USER_OFFLINE = "on_user_offline";
    a.ON_STREAM_FALLBACK_UPDATE = "on_stream_fallback_update";
    a.ON_PUBLISH_STREAM = "on_publish_stream";
    a.ON_UPLINK_STATS = "on_uplink_stats";
    a.ON_P2P_LOST = "on_p2p_lost";
    a.ON_REMOVE_STREAM = "on_remove_stream";
    a.ON_ADD_AUDIO_STREAM = "on_add_audio_stream";
    a.ON_ADD_VIDEO_STREAM = "on_add_video_stream";
    a.ON_TOKEN_PRIVILEGE_WILL_EXPIRE = "on_token_privilege_will_expire";
    a.ON_TOKEN_PRIVILEGE_DID_EXPIRE = "on_token_privilege_did_expire";
    a.ON_USER_BANNED = "on_user_banned";
    a.ON_NOTIFICATION = "on_notification";
    a.ON_CRYPT_ERROR = "on_crypt_error";
    a.MUTE_AUDIO = "mute_audio";
    a.MUTE_VIDEO = "mute_video";
    a.UNMUTE_AUDIO = "unmute_audio";
    a.UNMUTE_VIDEO = "unmute_video";
    a.RECEIVE_METADATA = "receive_metadata";
    a.ENABLE_LOCAL_VIDEO = "enable_local_video";
    a.DISABLE_LOCAL_VIDEO = "disable_local_video";
    a.ENABLE_LOCAL_AUDIO = "enable_local_audio";
    a.DISABLE_LOCAL_AUDIO = "disable_local_audio";
  })(X || (X = {}));
  (function (a) {
    a.CONNECTION_STATE_CHANGE = "CONNECTION_STATE_CHANGE";
    a.NEED_ANSWER = "NEED_ANSWER";
    a.NEED_RENEGOTIATE = "NEED_RENEGOTIATE";
    a.P2P_LOST = "P2P_LOST";
    a.GATEWAY_P2P_LOST = "GATEWAY_P2P_LOST";
    a.NEED_UNPUB = "NEED_UNPUB";
    a.NEED_UNSUB = "NEED_UNSUB";
    a.NEED_UPLOAD = "NEED_UPLOAD";
    a.START_RECONNECT = "START_RECONNECT";
    a.END_RECONNECT = "END_RECONNECT";
    a.NEED_SIGNAL_RTT = "NEED_SIGNAL_RTT";
  })(G || (G = {}));
  (function (a) {
    a.AUDIO_SOURCE_STATE_CHANGE = "audio_source_state_change";
    a.RECEIVE_TRACK_BUFFER = "receive_track_buffer";
    a.ON_AUDIO_BUFFER = "on_audio_buffer";
  })(gb || (gb = {}));
  let se = {
      sendVolumeLevel: 0,
      sendBitrate: 0,
      sendBytes: 0,
      sendPackets: 0,
      sendPacketsLost: 0
    },
    te = {
      sendBytes: 0,
      sendBitrate: 0,
      sendPackets: 0,
      sendPacketsLost: 0,
      sendResolutionHeight: 0,
      sendResolutionWidth: 0,
      captureResolutionHeight: 0,
      captureResolutionWidth: 0,
      targetSendBitrate: 0,
      totalDuration: 0,
      totalFreezeTime: 0
    },
    dg = {
      transportDelay: 0,
      end2EndDelay: 0,
      receiveBitrate: 0,
      receiveLevel: 0,
      receiveBytes: 0,
      receiveDelay: 0,
      receivePackets: 0,
      receivePacketsLost: 0,
      totalDuration: 0,
      totalFreezeTime: 0,
      freezeRate: 0,
      packetLossRate: 0,
      publishDuration: -1
    },
    eg = {
      transportDelay: 0,
      end2EndDelay: 0,
      receiveBitrate: 0,
      receiveBytes: 0,
      receiveDelay: 0,
      receivePackets: 0,
      receivePacketsLost: 0,
      receiveResolutionHeight: 0,
      receiveResolutionWidth: 0,
      totalDuration: 0,
      totalFreezeTime: 0,
      freezeRate: 0,
      packetLossRate: 0,
      publishDuration: -1
    };
  var Q, ma;
  !(function (a) {
    a.CONNECTED = "websocket:connected";
    a.RECONNECTING = "websocket:reconnecting";
    a.WILL_RECONNECT = "websocket:will_reconnect";
    a.CLOSED = "websocket:closed";
    a.FAILED = "websocket:failed";
    a.ON_MESSAGE = "websocket:on_message";
    a.REQUEST_NEW_URLS = "websocket:request_new_urls";
  })(Q || (Q = {}));
  (function (a) {
    a.TRANSCODE = "mix_streaming";
    a.RAW = "raw_streaming";
    a.INJECT = "inject_streaming";
  })(ma || (ma = {}));
  let Zo = {
      alpha: 1,
      height: 640,
      width: 360,
      x: 0,
      y: 0,
      zOrder: 0,
      audioChannel: 0
    },
    fg = { x: 0, y: 0, width: 160, height: 160, zOrder: 255, alpha: 1 },
    $o = {
      audioBitrate: 48,
      audioChannels: 1,
      audioSampleRate: 48e3,
      backgroundColor: 0,
      height: 360,
      lowLatency: !1,
      videoBitrate: 400,
      videoCodecProfile: 100,
      videoCodecType: 1,
      videoFrameRate: 15,
      videoGop: 30,
      width: 640,
      images: [],
      userConfigs: [],
      userConfigExtraInfo: ""
    },
    ap = {
      audioBitrate: 48,
      audioChannels: 2,
      audioVolume: 100,
      audioSampleRate: 48e3,
      height: 0,
      width: 0,
      videoBitrate: 400,
      videoFramerate: 15,
      videoGop: 30
    };
  var hb, Qc, ka, rk, Da, Ea, L, ib, td, ue;
  !(function (a) {
    a.WARNING = "@live_uap-warning";
    a.ERROR = "@line_uap-error";
    a.PUBLISH_STREAM_STATUS = "@live_uap-publish-status";
    a.INJECT_STREAM_STATUS = "@live_uap-inject-status";
    a.WORKER_STATUS = "@live_uap-worker-status";
    a.REQUEST_NEW_ADDRESS = "@live_uap-request-address";
  })(hb || (hb = {}));
  (Qc || (Qc = {})).REQUEST_WORKER_MANAGER_LIST = "@live_req_worker_manager";
  (function (a) {
    a[(a.LIVE_STREAM_RESPONSE_SUCCEED = 200)] = "LIVE_STREAM_RESPONSE_SUCCEED";
    a[(a.LIVE_STREAM_RESPONSE_ALREADY_EXISTS_STREAM = 454)] =
      "LIVE_STREAM_RESPONSE_ALREADY_EXISTS_STREAM";
    a[(a.LIVE_STREAM_RESPONSE_TRANSCODING_PARAMETER_ERROR = 450)] =
      "LIVE_STREAM_RESPONSE_TRANSCODING_PARAMETER_ERROR";
    a[(a.LIVE_STREAM_RESPONSE_BAD_STREAM = 451)] =
      "LIVE_STREAM_RESPONSE_BAD_STREAM";
    a[(a.LIVE_STREAM_RESPONSE_WM_PARAMETER_ERROR = 400)] =
      "LIVE_STREAM_RESPONSE_WM_PARAMETER_ERROR";
    a[(a.LIVE_STREAM_RESPONSE_WM_WORKER_NOT_EXIST = 404)] =
      "LIVE_STREAM_RESPONSE_WM_WORKER_NOT_EXIST";
    a[(a.LIVE_STREAM_RESPONSE_NOT_AUTHORIZED = 456)] =
      "LIVE_STREAM_RESPONSE_NOT_AUTHORIZED";
    a[(a.LIVE_STREAM_RESPONSE_FAILED_LOAD_IMAGE = 457)] =
      "LIVE_STREAM_RESPONSE_FAILED_LOAD_IMAGE";
    a[(a.LIVE_STREAM_RESPONSE_REQUEST_TOO_OFTEN = 429)] =
      "LIVE_STREAM_RESPONSE_REQUEST_TOO_OFTEN";
    a[(a.LIVE_STREAM_RESPONSE_NOT_FOUND_PUBLISH = 452)] =
      "LIVE_STREAM_RESPONSE_NOT_FOUND_PUBLISH";
    a[(a.LIVE_STREAM_RESPONSE_NOT_SUPPORTED = 453)] =
      "LIVE_STREAM_RESPONSE_NOT_SUPPORTED";
    a[(a.LIVE_STREAM_RESPONSE_MAX_STREAM_NUM = 455)] =
      "LIVE_STREAM_RESPONSE_MAX_STREAM_NUM";
    a[(a.LIVE_STREAM_RESPONSE_INTERNAL_SERVER_ERROR = 500)] =
      "LIVE_STREAM_RESPONSE_INTERNAL_SERVER_ERROR";
    a[(a.LIVE_STREAM_RESPONSE_WORKER_LOST = 501)] =
      "LIVE_STREAM_RESPONSE_WORKER_LOST";
    a[(a.LIVE_STREAM_RESPONSE_RESOURCE_LIMIT = 502)] =
      "LIVE_STREAM_RESPONSE_RESOURCE_LIMIT";
    a[(a.LIVE_STREAM_RESPONSE_WORKER_QUIT = 503)] =
      "LIVE_STREAM_RESPONSE_WORKER_QUIT";
    a[(a.ERROR_FAIL_SEND_MESSAGE = 504)] = "ERROR_FAIL_SEND_MESSAGE";
    a[(a.PUBLISH_STREAM_STATUS_ERROR_RTMP_HANDSHAKE = 30)] =
      "PUBLISH_STREAM_STATUS_ERROR_RTMP_HANDSHAKE";
    a[(a.PUBLISH_STREAM_STATUS_ERROR_RTMP_CONNECT = 31)] =
      "PUBLISH_STREAM_STATUS_ERROR_RTMP_CONNECT";
    a[(a.PUBLISH_STREAM_STATUS_ERROR_RTMP_PUBLISH = 32)] =
      "PUBLISH_STREAM_STATUS_ERROR_RTMP_PUBLISH";
    a[(a.PUBLISH_STREAM_STATUS_ERROR_PUBLISH_BROKEN = 33)] =
      "PUBLISH_STREAM_STATUS_ERROR_PUBLISH_BROKEN";
  })(ka || (ka = {}));
  (function (a) {
    a.CONNECT_FAILED = "connect failed";
    a.CONNECT_TIMEOUT = "connect timeout";
    a.WS_DISCONNECTED = "websocket disconnected";
    a.REQUEST_TIMEOUT = "request timeout";
    a.REQUEST_FAILED = "request failed";
    a.WAIT_STATUS_TIMEOUT = "wait status timeout";
    a.WAIT_STATUS_ERROR = "wait status error";
    a.BAD_STATE = "bad state";
    a.WS_ABORT = "ws abort";
    a.AP_REQUEST_TIMEOUT = "AP request timeout";
    a.AP_JSON_PARSE_ERROR = "AP json parse error";
    a.AP_REQUEST_ERROR = "AP request error";
    a.AP_REQUEST_ABORT = "AP request abort";
  })(rk || (rk = {}));
  (function (a) {
    a[(a.SetSdkProfile = 0)] = "SetSdkProfile";
    a[(a.SetSourceChannel = 1)] = "SetSourceChannel";
    a[(a.SetSourceUserId = 2)] = "SetSourceUserId";
    a[(a.SetDestChannel = 3)] = "SetDestChannel";
    a[(a.StartPacketTransfer = 4)] = "StartPacketTransfer";
    a[(a.StopPacketTransfer = 5)] = "StopPacketTransfer";
    a[(a.UpdateDestChannel = 6)] = "UpdateDestChannel";
    a[(a.Reconnect = 7)] = "Reconnect";
    a[(a.SetVideoProfile = 8)] = "SetVideoProfile";
  })(Da || (Da = {}));
  (function (a) {
    a.DISCONNECT = "disconnect";
    a.CONNECTION_STATE_CHANGE = "connection-state-change";
    a.NETWORK_QUALITY = "network-quality";
    a.STREAM_TYPE_CHANGE = "stream-type-change";
    a.IS_P2P_DISCONNECTED = "is-p2p-dis";
    a.DISCONNECT_P2P = "dis-p2p";
    a.REQUEST_NEW_GATEWAY_LIST = "req-gate-url";
    a.NEED_RENEW_SESSION = "need-sid";
  })(Ea || (Ea = {}));
  (function (a) {
    a.NEED_RENEGOTIATE = "@need_renegotiate";
    a.NEED_REPLACE_TRACK = "@need_replace_track";
    a.NEED_CLOSE = "@need_close";
    a.NEED_ADD_TRACK = "@need_add_track";
    a.NEED_REMOVE_TRACK = "@need_remove_track";
    a.NEED_SESSION_ID = "@need_sid";
    a.GET_STATS = "@get_stats";
    a.GET_LOW_VIDEO_TRACK = "@get_low_video_track";
  })(L || (L = {}));
  (function (a) {
    a.SCREEN_TRACK = "screen_track";
    a.LOW_STREAM = "low_stream";
  })(ib || (ib = {}));
  (function (a) {
    a.SOURCE_STATE_CHANGE = "source-state-change";
    a.TRACK_ENDED = "track-ended";
    a.BEAUTY_EFFECT_OVERLOAD = "beauty-effect-overload";
  })(td || (td = {}));
  (ue || (ue = {})).FIRST_FRAME_DECODED = "first-frame-decoded";
  K(
    { target: "Object", stat: !0, forced: !la, sham: !la },
    { defineProperties: Ji }
  );
  var Qa = Ka(function (a) {
      var b = fa.Object;
      a = a.exports = function (a, e) {
        return b.defineProperties(a, e);
      };
      b.defineProperties.sham && (a.sham = !0);
    }),
    bp = ae.concat("length", "prototype"),
    gg = {
      f:
        Object.getOwnPropertyNames ||
        function (a) {
          return Ii(a, bp);
        }
    },
    cp =
      Mb("Reflect", "ownKeys") ||
      function (a) {
        var b = gg.f(Oa(a)),
          d = kd.f;
        return d ? b.concat(d(a)) : b;
      };
  K(
    { target: "Object", stat: !0, sham: !la },
    {
      getOwnPropertyDescriptors: function (a) {
        var b, d;
        a = db(a);
        for (var e = Fc, f = cp(a), g = {}, h = 0; f.length > h; )
          void 0 !== (d = e(a, (b = f[h++]))) && mc(g, b, d);
        return g;
      }
    }
  );
  var ja = fa.Object.getOwnPropertyDescriptors,
    sk = gg.f,
    dp = {}.toString,
    tk =
      "object" == typeof window && window && Object.getOwnPropertyNames
        ? Object.getOwnPropertyNames(window)
        : [],
    uk = function (a) {
      if (tk && "[object Window]" == dp.call(a))
        try {
          var b = sk(a);
        } catch (d) {
          b = tk.slice();
        }
      else b = sk(db(a));
      return b;
    },
    vk = { f: sa },
    ep = eb.f,
    Sa = Yd("hidden"),
    wk = sa("toPrimitive"),
    fp = ab.set,
    xk = ab.getterFor("Symbol"),
    tb = Object.prototype,
    Ta = J.Symbol,
    ud = Mb("JSON", "stringify"),
    yk = Fc,
    Zb = eb.f,
    zk = uk,
    gp = Qd,
    Sb = Nb("symbols"),
    vd = Nb("op-symbols"),
    hg = Nb("string-to-symbol-registry"),
    ig = Nb("symbol-to-string-registry"),
    hp = Nb("wks"),
    jg = J.QObject,
    kg = !jg || !jg.prototype || !jg.prototype.findChild,
    lg =
      la &&
      oa(function () {
        return (
          7 !=
          lc(
            Zb({}, "a", {
              get: function () {
                return Zb(this, "a", { value: 7 }).a;
              }
            })
          ).a
        );
      })
        ? function (a, b, d) {
            var e = yk(tb, b);
            e && delete tb[b];
            Zb(a, b, d);
            e && a !== tb && Zb(tb, b, e);
          }
        : Zb,
    Ak = function (a, b) {
      var d = (Sb[a] = lc(Ta.prototype));
      return (
        fp(d, { type: "Symbol", tag: a, description: b }),
        la || (d.description = b),
        d
      );
    },
    mg =
      Fb && "symbol" == typeof Ta.iterator
        ? function (a) {
            return "symbol" == typeof a;
          }
        : function (a) {
            return Object(a) instanceof Ta;
          },
    ve = function (a, b, d) {
      a === tb && ve(vd, b, d);
      Oa(a);
      b = Dc(b, !0);
      return (
        Oa(d),
        U(Sb, b)
          ? (d.enumerable
              ? (U(a, Sa) && a[Sa][b] && (a[Sa][b] = !1),
                (d = lc(d, { enumerable: gc(0, !1) })))
              : (U(a, Sa) || Zb(a, Sa, gc(1, {})), (a[Sa][b] = !0)),
            lg(a, b, d))
          : Zb(a, b, d)
      );
    },
    Ck = function (a, b) {
      Oa(a);
      var d = db(b);
      b = Xb(d).concat(ng(d));
      return (
        Ic(b, function (b) {
          (la && !Bk.call(d, b)) || ve(a, b, d[b]);
        }),
        a
      );
    },
    Bk = function (a) {
      a = Dc(a, !0);
      var b = gp.call(this, a);
      return (
        !(this === tb && U(Sb, a) && !U(vd, a)) &&
        (!(b || !U(this, a) || !U(Sb, a) || (U(this, Sa) && this[Sa][a])) || b)
      );
    },
    Dk = function (a, b) {
      a = db(a);
      b = Dc(b, !0);
      if (a !== tb || !U(Sb, b) || U(vd, b)) {
        var d = yk(a, b);
        return (
          !d || !U(Sb, b) || (U(a, Sa) && a[Sa][b]) || (d.enumerable = !0), d
        );
      }
    },
    Ek = function (a) {
      a = zk(db(a));
      var b = [];
      return (
        Ic(a, function (a) {
          U(Sb, a) || U(Hc, a) || b.push(a);
        }),
        b
      );
    },
    ng = function (a) {
      var b = a === tb;
      a = zk(b ? vd : db(a));
      var d = [];
      return (
        Ic(a, function (a) {
          !U(Sb, a) || (b && !U(tb, a)) || d.push(Sb[a]);
        }),
        d
      );
    };
  if (
    (Fb ||
      ((Ta = function () {
        if (this instanceof Ta) throw TypeError("Symbol is not a constructor");
        var a =
            arguments.length && void 0 !== arguments[0]
              ? String(arguments[0])
              : void 0,
          b = Ud(a),
          d = function (a) {
            this === tb && d.call(vd, a);
            U(this, Sa) && U(this[Sa], b) && (this[Sa][b] = !1);
            lg(this, b, gc(1, a));
          };
        return la && kg && lg(tb, b, { configurable: !0, set: d }), Ak(b, a);
      }),
      vf(Ta.prototype, "toString", function () {
        return xk(this).tag;
      }),
      (Qd = Bk),
      (eb.f = ve),
      (Fc = Dk),
      (gg.f = uk = Ek),
      (kd.f = ng),
      la &&
        Zb(Ta.prototype, "description", {
          configurable: !0,
          get: function () {
            return xk(this).description;
          }
        })),
    yi ||
      (vk.f = function (a) {
        return Ak(sa(a), a);
      }),
    K({ global: !0, wrap: !0, forced: !Fb, sham: !Fb }, { Symbol: Ta }),
    Ic(Xb(hp), function (a) {
      var b = fa.Symbol || (fa.Symbol = {});
      U(b, a) || ep(b, a, { value: vk.f(a) });
    }),
    K(
      { target: "Symbol", stat: !0, forced: !Fb },
      {
        for: function (a) {
          a = String(a);
          if (U(hg, a)) return hg[a];
          var b = Ta(a);
          return (hg[a] = b), (ig[b] = a), b;
        },
        keyFor: function (a) {
          if (!mg(a)) throw TypeError(a + " is not a symbol");
          if (U(ig, a)) return ig[a];
        },
        useSetter: function () {
          kg = !0;
        },
        useSimple: function () {
          kg = !1;
        }
      }
    ),
    K(
      { target: "Object", stat: !0, forced: !Fb, sham: !la },
      {
        create: function (a, b) {
          return void 0 === b ? lc(a) : Ck(lc(a), b);
        },
        defineProperty: ve,
        defineProperties: Ck,
        getOwnPropertyDescriptor: Dk
      }
    ),
    K(
      { target: "Object", stat: !0, forced: !Fb },
      { getOwnPropertyNames: Ek, getOwnPropertySymbols: ng }
    ),
    K(
      {
        target: "Object",
        stat: !0,
        forced: oa(function () {
          kd.f(1);
        })
      },
      {
        getOwnPropertySymbols: function (a) {
          return kd.f(pb(a));
        }
      }
    ),
    ud)
  ) {
    var ip =
      !Fb ||
      oa(function () {
        var a = Ta();
        return (
          "[null]" != ud([a]) || "{}" != ud({ a }) || "{}" != ud(Object(a))
        );
      });
    K(
      { target: "JSON", stat: !0, forced: ip },
      {
        stringify: function (a, b, d) {
          for (var e, f = [a], g = 1; arguments.length > g; )
            f.push(arguments[g++]);
          if (((e = b), (xa(b) || void 0 !== a) && !mg(a)))
            return (
              jc(b) ||
                (b = function (a, b) {
                  if (
                    ("function" == typeof e && (b = e.call(this, a, b)), !mg(b))
                  )
                    return b;
                }),
              (f[1] = b),
              ud.apply(null, f)
            );
        }
      }
    );
  }
  Ta.prototype[wk] || nb(Ta.prototype, wk, Ta.prototype.valueOf);
  hd(Ta, "Symbol");
  Hc[Sa] = !0;
  var ia = fa.Object.getOwnPropertySymbols,
    Pa = function (a, b, d) {
      return (
        b in a
          ? bj(a, b, {
              value: d,
              enumerable: !0,
              configurable: !0,
              writable: !0
            })
          : (a[b] = d),
        a
      );
    },
    jp = Aa("Array").values,
    Fk = Array.prototype,
    kp = { DOMTokenList: !0, NodeList: !0 },
    qc = function (a) {
      var b = a.values;
      return a === Fk ||
        (a instanceof Array && b === Fk.values) ||
        kp.hasOwnProperty(Xd(a))
        ? jp
        : b;
    },
    lp = !oj(function (a) {
      Array.from(a);
    });
  K(
    { target: "Array", stat: !0, forced: lp },
    {
      from: function (a) {
        var b = pb(a);
        var d = "function" == typeof this ? this : Array;
        var e = arguments.length;
        var f = 1 < e ? arguments[1] : void 0,
          g = void 0 !== f,
          h = 0;
        var q = Bi(b);
        if (
          (g && (f = ic(f, 2 < e ? arguments[2] : void 0, 2)),
          null == q || (d == Array && zi(q)))
        )
          for (d = new d((e = ob(b.length))); e > h; h++)
            mc(d, h, g ? f(b[h], h) : b[h]);
        else
          for (
            e = (b = q.call(b)).next, d = new d();
            !(q = e.call(b)).done;
            h++
          )
            mc(d, h, g ? Ci(b, f, [q.value, h], !0) : q.value);
        return (d.length = h), d;
      }
    }
  );
  var Kb = fa.Array.from;
  K(
    { target: "Date", stat: !0 },
    {
      now: function () {
        return new Date().getTime();
      }
    }
  );
  var v = fa.Date.now;
  class Ua {
    constructor() {
      this._events = {};
      this.addListener = this.on;
    }
    getListeners(a) {
      var b;
      return this._events[a]
        ? D((b = this._events[a])).call(b, (a) => a.listener)
        : [];
    }
    on(a, b) {
      this._events[a] || (this._events[a] = []);
      a = this._events[a];
      -1 === this._indexOfListener(a, b) && a.push({ listener: b, once: !1 });
    }
    once(a, b) {
      this._events[a] || (this._events[a] = []);
      a = this._events[a];
      -1 === this._indexOfListener(a, b) && a.push({ listener: b, once: !0 });
    }
    off(a, b) {
      if (this._events[a]) {
        var d = this._events[a];
        b = this._indexOfListener(d, b);
        -1 !== b && Ma(d).call(d, b, 1);
        0 === this._events[a].length && delete this._events[a];
      }
    }
    removeAllListeners(a) {
      a ? delete this._events[a] : (this._events = {});
    }
    emit(a, ...b) {
      var d;
      this._events[a] || (this._events[a] = []);
      let e = D((d = this._events[a])).call(d, (a) => a);
      for (d = 0; d < e.length; d += 1) {
        let f = e[d];
        f.once && this.off(a, f.listener);
        f.listener.apply(this, b || []);
      }
    }
    _indexOfListener(a, b) {
      let d = a.length;
      for (; d--; ) if (a[d].listener === b) return d;
      return -1;
    }
  }
  class mp extends Ua {
    constructor() {
      super(...arguments);
      this.resultStorage = new Y();
    }
    setLocalAudioStats(a, b, d) {
      this.record("AUDIO_INPUT_LEVEL_TOO_LOW", a, this.checkAudioInputLevel(d));
      this.record(
        "SEND_AUDIO_BITRATE_TOO_LOW",
        a,
        this.checkSendAudioBitrate(d)
      );
    }
    setLocalVideoStats(a, b, d) {
      this.record(
        "SEND_VIDEO_BITRATE_TOO_LOW",
        a,
        this.checkSendVideoBitrate(d)
      );
      this.record("FRAMERATE_INPUT_TOO_LOW", a, this.checkFramerateInput(d, b));
      this.record("FRAMERATE_SENT_TOO_LOW", a, this.checkFramerateSent(d));
    }
    setRemoteAudioStats(a, b) {
      a = a.getUserId();
      this.record(
        "AUDIO_OUTPUT_LEVEL_TOO_LOW",
        a,
        this.checkAudioOutputLevel(b)
      );
    }
    setRemoteVideoStats(a, b) {
      a = a.getUserId();
      this.record("RECV_VIDEO_DECODE_FAILED", a, this.checkVideoDecode(b));
    }
    record(a, b, d) {
      this.resultStorage.has(a) ||
        this.resultStorage.set(a, { result: [], isPrevNormal: !0 });
      let e = this.resultStorage.get(a);
      if (e && (e.result.push(d), 5 <= e.result.length)) {
        var f;
        d = La((f = e.result)).call(f, !0);
        e.isPrevNormal && !d && this.emit("exception", Gk[a], a, b);
        !e.isPrevNormal &&
          d &&
          this.emit("exception", Gk[a] + 2e3, a + "_RECOVER", b);
        e.isPrevNormal = d;
        e.result = [];
      }
    }
    checkAudioOutputLevel(a) {
      return !(0 < a.receiveBitrate && 0 === a.receiveLevel);
    }
    checkAudioInputLevel(a) {
      return 0 !== a.sendVolumeLevel;
    }
    checkFramerateInput(a, b) {
      let d = null;
      b._encoderConfig &&
        b._encoderConfig.frameRate &&
        (d = zb(b._encoderConfig.frameRate));
      a = a.captureFrameRate;
      return !d || !a || !((10 < d && 5 > a) || (10 > d && 5 <= d && 1 >= a));
    }
    checkFramerateSent(a) {
      return !(
        a.captureFrameRate &&
        a.sendFrameRate &&
        5 < a.captureFrameRate &&
        1 >= a.sendFrameRate
      );
    }
    checkSendVideoBitrate(a) {
      return 0 !== a.sendBitrate;
    }
    checkSendAudioBitrate(a) {
      return 0 !== a.sendBitrate;
    }
    checkVideoDecode(a) {
      return 0 === a.receiveBitrate || 0 !== a.decodeFrameRate;
    }
  }
  let Gk = {
    FRAMERATE_INPUT_TOO_LOW: 1001,
    FRAMERATE_SENT_TOO_LOW: 1002,
    SEND_VIDEO_BITRATE_TOO_LOW: 1003,
    RECV_VIDEO_DECODE_FAILED: 1005,
    AUDIO_INPUT_LEVEL_TOO_LOW: 2001,
    AUDIO_OUTPUT_LEVEL_TOO_LOW: 2002,
    SEND_AUDIO_BITRATE_TOO_LOW: 2003
  };
  class Yc {
    constructor(a) {
      this.localConnectionsMap = new Y();
      this.remoteConnectionsMap = new Y();
      this.trafficStatsPeerList = [];
      this.updateStats = () => {
        var a, d;
        r((a = this.remoteConnectionsMap)).call(a, (a) => {
          var b;
          let d = a.audioStats,
            e = a.videoStats;
          var q = a.pcStats;
          let k = Ub({}, dg),
            l = Ub({}, eg),
            n = a.connection.pc.getStats(),
            m = n.audioRecv[0],
            p = n.videoRecv[0];
          q = q ? q.videoRecv[0] : void 0;
          let r =
            this.trafficStats &&
            R((b = this.trafficStats.peer_delay)).call(
              b,
              (b) => b.peer_uid === a.connection.getUserId()
            );
          m &&
            (("opus" !== m.codec && "aac" !== m.codec) ||
              (k.codecType = m.codec),
            m.outputLevel
              ? (k.receiveLevel = Math.round(32767 * m.outputLevel))
              : a.connection.user.audioTrack &&
                (k.receiveLevel = Math.round(
                  32767 * a.connection.user.audioTrack.getVolumeLevel()
                )),
            (k.receiveBytes = m.bytes),
            (k.receivePackets = m.packets),
            (k.receivePacketsLost = m.packetsLost),
            (k.packetLossRate = k.receivePacketsLost / k.receivePackets),
            (k.receiveBitrate = d
              ? 8 * Math.max(0, k.receiveBytes - d.receiveBytes)
              : 0),
            (k.totalDuration = d ? d.totalDuration + 1 : 1),
            (k.totalFreezeTime = d ? d.totalFreezeTime : 0),
            (k.freezeRate = k.totalFreezeTime / k.totalDuration),
            (k.receiveDelay = m.jitterBufferMs),
            (b = a.connection.user.audioTrack),
            10 < k.totalDuration &&
              Yc.isRemoteAudioFreeze(b) &&
              (k.totalFreezeTime += 1));
          p &&
            (("H264" !== p.codec && "VP8" !== p.codec) ||
              (l.codecType = p.codec),
            (l.receiveBytes = p.bytes),
            (l.receiveBitrate = e
              ? 8 * Math.max(0, l.receiveBytes - e.receiveBytes)
              : 0),
            (l.decodeFrameRate = p.decodeFrameRate),
            (l.renderFrameRate = p.decodeFrameRate),
            p.outputFrame && (l.renderFrameRate = p.outputFrame.frameRate),
            p.receivedFrame
              ? ((l.receiveFrameRate = p.receivedFrame.frameRate),
                (l.receiveResolutionHeight = p.receivedFrame.height),
                (l.receiveResolutionWidth = p.receivedFrame.width))
              : a.connection.user.videoTrack &&
                ((l.receiveResolutionHeight =
                  a.connection.user.videoTrack._videoHeight || 0),
                (l.receiveResolutionHeight =
                  a.connection.user.videoTrack._videoWidth || 0)),
            void 0 !== p.framesRateFirefox &&
              (l.receiveFrameRate = Math.round(p.framesRateFirefox)),
            (l.receivePackets = p.packets),
            (l.receivePacketsLost = p.packetsLost),
            (l.packetLossRate = l.receivePacketsLost / l.receivePackets),
            (l.totalDuration = e ? e.totalDuration + 1 : 1),
            (l.totalFreezeTime = e ? e.totalFreezeTime : 0),
            (l.receiveDelay = p.jitterBufferMs || 0),
            Yc.isRemoteVideoFreeze(a.connection.user.videoTrack, p, q) &&
              (l.totalFreezeTime += 1),
            (l.freezeRate = l.totalFreezeTime / l.totalDuration));
          r &&
            ((k.end2EndDelay = r.B_ad),
            (l.end2EndDelay = r.B_vd),
            (k.transportDelay = r.B_ed),
            (l.transportDelay = r.B_ed));
          a.audioStats = k;
          a.videoStats = l;
          a.pcStats = n;
          a.connection.user.audioTrack &&
            this.exceptionMonitor.setRemoteAudioStats(
              a.connection.user.audioTrack,
              k
            );
          a.connection.user.videoTrack &&
            this.exceptionMonitor.setRemoteVideoStats(
              a.connection.user.videoTrack,
              l
            );
        });
        r((d = this.localConnectionsMap)).call(d, (a) => {
          let b = a.audioStats,
            d = a.videoStats,
            e = Ub({}, se),
            k = Ub({}, te);
          var l = a.connection.pc.getStats();
          let n = l.audioSend[0];
          l = l.videoSend[0];
          let m = a.connection.getUserId();
          n &&
            (("opus" !== n.codec && "aac" !== n.codec) ||
              (e.codecType = n.codec),
            n.inputLevel
              ? (e.sendVolumeLevel = Math.round(32767 * n.inputLevel))
              : a.connection.audioTrack &&
                (e.sendVolumeLevel = Math.round(
                  32767 * a.connection.audioTrack.getVolumeLevel()
                )),
            (e.sendBytes = n.bytes),
            (e.sendPackets = n.packets),
            (e.sendPacketsLost = n.packetsLost),
            (e.sendBitrate = b
              ? 8 * Math.max(0, e.sendBytes - b.sendBytes)
              : 0));
          l &&
            (("H264" !== l.codec && "VP8" !== l.codec) ||
              (k.codecType = l.codec),
            (k.sendBytes = l.bytes),
            (k.sendBitrate = d
              ? 8 * Math.max(0, k.sendBytes - d.sendBytes)
              : 0),
            l.inputFrame
              ? ((k.captureFrameRate = l.inputFrame.frameRate),
                (k.captureResolutionHeight = l.inputFrame.height),
                (k.captureResolutionWidth = l.inputFrame.width))
              : a.connection.videoTrack &&
                ((k.captureResolutionWidth =
                  a.connection.videoTrack._videoWidth || 0),
                (k.captureResolutionHeight =
                  a.connection.videoTrack._videoHeight || 0)),
            l.sentFrame
              ? ((k.sendFrameRate = l.sentFrame.frameRate),
                (k.sendResolutionHeight = l.sentFrame.height),
                (k.sendResolutionWidth = l.sentFrame.width))
              : a.connection.videoTrack &&
                ((k.sendResolutionWidth =
                  a.connection.videoTrack._videoWidth || 0),
                (k.sendResolutionHeight =
                  a.connection.videoTrack._videoHeight || 0)),
            l.avgEncodeMs && (k.encodeDelay = l.avgEncodeMs),
            a.connection.videoTrack &&
              a.connection.videoTrack._encoderConfig &&
              a.connection.videoTrack._encoderConfig.bitrateMax &&
              (k.targetSendBitrate =
                1e3 * a.connection.videoTrack._encoderConfig.bitrateMax),
            (k.sendPackets = l.packets),
            (k.sendPacketsLost = l.packetsLost),
            (k.totalDuration = d ? d.totalDuration + 1 : 1),
            (k.totalFreezeTime = d ? d.totalFreezeTime : 0),
            this.isLocalVideoFreeze(l) && (k.totalFreezeTime += 1));
          a.audioStats = e;
          a.videoStats = k;
          a.audioStats &&
            a.connection.audioTrack &&
            this.exceptionMonitor.setLocalAudioStats(
              m,
              a.connection.audioTrack,
              a.audioStats
            );
          a.videoStats &&
            a.connection.videoTrack &&
            this.exceptionMonitor.setLocalVideoStats(
              m,
              a.connection.videoTrack,
              a.videoStats
            );
        });
      };
      this.clientId = a;
      this.updateStatsInterval = window.setInterval(this.updateStats, 1e3);
      this.exceptionMonitor = new mp();
      this.exceptionMonitor.on("exception", (a, d, e) => {
        this.onStatsException && this.onStatsException(a, d, e);
      });
    }
    reset() {
      this.localConnectionsMap = new Y();
      this.remoteConnectionsMap = new Y();
      this.trafficStats = void 0;
      this.trafficStatsPeerList = [];
      this.uplinkStats = void 0;
    }
    getLocalAudioTrackStats(a) {
      return (a = this.localConnectionsMap.get(a)) && a.audioStats
        ? a.audioStats
        : Ub({}, se);
    }
    getLocalVideoTrackStats(a) {
      return (a = this.localConnectionsMap.get(a)) && a.videoStats
        ? a.videoStats
        : Ub({}, te);
    }
    getRemoteAudioTrackStats(a) {
      var b;
      let d = this.remoteConnectionsMap.get(a);
      if (!d || !d.audioStats) return Ub({}, dg);
      if (!this.trafficStats) return d.audioStats;
      a = R((b = this.trafficStats.peer_delay)).call(
        b,
        (a) => a.peer_uid === d.connection.user.uid
      );
      return (
        a &&
          (d.audioStats.publishDuration =
            a.B_ppad + (v() - this.trafficStats.timestamp)),
        d.audioStats
      );
    }
    getRemoteVideoTrackStats(a) {
      var b;
      let d = this.remoteConnectionsMap.get(a);
      if (!d || !d.videoStats) return Ub({}, eg);
      if (!this.trafficStats) return d.videoStats;
      a = R((b = this.trafficStats.peer_delay)).call(
        b,
        (a) => a.peer_uid === d.connection.user.uid
      );
      return (
        a &&
          (d.videoStats.publishDuration =
            a.B_ppvd + (v() - this.trafficStats.timestamp)),
        d.videoStats
      );
    }
    getRTCStats() {
      var a, b;
      let d = 0,
        e = 0,
        f = 0,
        g = 0;
      r((a = this.localConnectionsMap)).call(a, (a) => {
        a.audioStats &&
          ((d += a.audioStats.sendBytes), (e += a.audioStats.sendBitrate));
        a.videoStats &&
          ((d += a.videoStats.sendBytes), (e += a.videoStats.sendBitrate));
      });
      r((b = this.remoteConnectionsMap)).call(b, (a) => {
        a.audioStats &&
          ((f += a.audioStats.receiveBytes),
          (g += a.audioStats.receiveBitrate));
        a.videoStats &&
          ((f += a.videoStats.receiveBytes),
          (g += a.videoStats.receiveBitrate));
      });
      a = 1;
      return (
        this.trafficStats && (a += this.trafficStats.peer_delay.length),
        {
          Duration: 0,
          UserCount: a,
          SendBitrate: e,
          SendBytes: d,
          RecvBytes: f,
          RecvBitrate: g,
          OutgoingAvailableBandwidth: this.uplinkStats
            ? this.uplinkStats.B_uab / 1e3
            : 0,
          RTT: this.trafficStats ? 2 * this.trafficStats.B_acd : 0
        }
      );
    }
    removeConnection(a) {
      this.localConnectionsMap.delete(a);
      this.remoteConnectionsMap.delete(a);
    }
    addLocalConnection(a) {
      let b = a.connectionId;
      this.localConnectionsMap.has(b) ||
        this.localConnectionsMap.set(b, { connection: a });
    }
    addRemoteConnection(a) {
      let b = a.connectionId;
      this.remoteConnectionsMap.has(b) ||
        this.remoteConnectionsMap.set(b, { connection: a });
    }
    updateTrafficStats(a) {
      var b;
      let d = M((b = a.peer_delay)).call(b, (a) => {
        var b;
        return -1 === E((b = this.trafficStatsPeerList)).call(b, a.peer_uid);
      });
      r(d).call(d, (a) => {
        var b, d;
        let e = R((b = Kb(qc((d = this.remoteConnectionsMap)).call(d)))).call(
          b,
          (b) => b.connection._userId === a.peer_uid
        );
        void 0 !== a.B_ppad &&
          void 0 !== a.B_ppvd &&
          (this.onUploadPublishDuration &&
            this.onUploadPublishDuration(
              a.peer_uid,
              a.B_ppad,
              a.B_ppvd,
              e ? v() - e.connection.startTime : 0
            ),
          this.trafficStatsPeerList.push(a.peer_uid));
      });
      this.trafficStats = a;
    }
    updateUplinkStats(a) {
      var b;
      this.uplinkStats &&
        this.uplinkStats.B_fir !== a.B_fir &&
        k.debug(
          n((b = "[".concat(this.clientId, "]: Period fir changes to "))).call(
            b,
            a.B_fir
          )
        );
      this.uplinkStats = a;
    }
    static isRemoteVideoFreeze(a, b, d) {
      if (!a) return !1;
      a = !d || b.framesDecodeCount > d.framesDecodeCount;
      return (!!d && b.framesDecodeFreezeTime > d.framesDecodeFreezeTime) || !a;
    }
    static isRemoteAudioFreeze(a) {
      return !!a && a._isFreeze();
    }
    isLocalVideoFreeze(a) {
      return (
        !(!a.inputFrame || !a.sentFrame) &&
        5 < a.inputFrame.frameRate &&
        3 > a.sentFrame.frameRate
      );
    }
  }
  var Hk;
  let og = () => {},
    Jh = {},
    dd = [
      [
        [100, 0.00520833333333333],
        [66.6666666666666, 0.00434027777777778],
        [66.6666666666667, 0.00173611111111111]
      ],
      [
        [233.333333333333, 0.00347222222222222],
        [266.666666666667],
        [0.00173611111111111],
        [183.333333333333, 2.17013888888889e-4]
      ],
      [
        [700, 0.001953125],
        [200, 0.001953125],
        [175, 2.44140625e-4]
      ],
      [
        [899.999999999998, 0.00173611111111111],
        [1200, 8.68055555555556e-4],
        [160, 2.60416666666667e-4]
      ],
      [
        [2666.66666666667, 8.84130658436214e-4],
        [1166.66666666667, 8.84130658436214e-4],
        [600, 4.82253e-5]
      ]
    ];
  class np {
    constructor() {
      this.fnMap = new Y();
    }
    throttleByKey(a, b, d, e, ...f) {
      if (this.fnMap.has(b)) {
        var g = this.fnMap.get(b);
        g.threshold !== d
          ? (g.fn(...g.args),
            clearTimeout(g.timer),
            (g = window.setTimeout(() => {
              const a = this.fnMap.get(b);
              a && a.fn(...a.args);
              this.fnMap.delete(b);
            }, d)),
            this.fnMap.set(b, {
              fn: a,
              threshold: d,
              timer: g,
              args: f,
              skipFn: e
            }))
          : (g.skipFn && g.skipFn(...g.args),
            this.fnMap.set(b, Ue({}, g, { fn: a, args: f, skipFn: e })));
      } else
        (g = window.setTimeout(() => {
          const a = this.fnMap.get(b);
          a && a.fn(...a.args);
          this.fnMap.delete(b);
        }, d)),
          this.fnMap.set(b, {
            fn: a,
            threshold: d,
            timer: g,
            args: f,
            skipFn: e
          });
    }
  }
  let Ik = new np(),
    Jk = ya((Hk = Ik.throttleByKey)).call(Hk, Ik),
    Kk = window.AudioContext || window.webkitAudioContext,
    ed = null,
    wd = new Ua();
  (function () {
    Kk
      ? ((ed = new Kk()),
        (ed.onstatechange = () => {
          wd.emit("state-change");
        }),
        Pl(ed))
      : k.error("your browser is not support web audio");
  })();
  let Ve = null,
    ea = {
      getDisplayMedia: !1,
      getStreamFromExtension: !1,
      supportUnifiedPlan: !1,
      supportMinBitrate: !1,
      supportSetRtpSenderParameters: !1,
      supportDualStream: !0,
      webAudioMediaStreamDest: !1,
      supportReplaceTrack: !1,
      supportWebGL: !1,
      webAudioWithAEC: !1,
      supportRequestFrame: !1,
      supportShareAudio: !1
    },
    Md = null;
  class $b {
    constructor() {
      this.lockingPromise = u.resolve();
      this.locks = 0;
    }
    get isLocked() {
      return 0 < this.locks;
    }
    lock() {
      let a;
      this.locks += 1;
      let b = new u((b) => {
          a = () => {
            --this.locks;
            b();
          };
        }),
        d = this.lockingPromise.then(() => a);
      return (this.lockingPromise = this.lockingPromise.then(() => b)), d;
    }
  }
  let Xe = new $b(),
    Nh = !1,
    Oh = !1;
  class op extends Ua {
    constructor() {
      super();
      this._state = pc.IDLE;
      this.isAccessCameraPermission = this.isAccessMicrophonePermission = !1;
      this.deviceInfoMap = new Y();
      this.init()
        .then(() => {
          var a, b;
          navigator.mediaDevices &&
            navigator.mediaDevices.addEventListener &&
            navigator.mediaDevices.addEventListener(
              "devicechange",
              ya((b = this.updateDevicesInfo)).call(b, this)
            );
          window.setInterval(
            ya((a = this.updateDevicesInfo)).call(a, this),
            2500
          );
        })
        .catch((a) => k.error(a.toString()));
    }
    get state() {
      return this._state;
    }
    set state(a) {
      a !== this._state && (this.emit(Rb.STATE_CHANGE, a), (this._state = a));
    }
    async enumerateDevices(a, b, d = !1) {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices)
        return new m(
          l.NOT_SUPPORT,
          "enumerateDevices() not supported."
        ).throw();
      var e = await navigator.mediaDevices.enumerateDevices();
      e = this.checkMediaDeviceInfoIsOk(e);
      let f = !this.isAccessMicrophonePermission && a,
        g = !this.isAccessCameraPermission && b;
      e.audio && (f = !1);
      e.video && (g = !1);
      let h = (e = null),
        q = null;
      if (!d && (f || g)) {
        Xe.isLocked &&
          (k.debug("[device manager] wait GUM lock"),
          (await Xe.lock())(),
          k.debug("[device manager] GUM unlock"));
        if (
          (Nh && ((f = !1), (this.isAccessMicrophonePermission = !0)),
          Oh && ((g = !1), (this.isAccessCameraPermission = !0)),
          k.debug(
            "[device manager] check media device permissions",
            a,
            b,
            f,
            g
          ),
          f && g)
        ) {
          try {
            q = await navigator.mediaDevices.getUserMedia({
              audio: !0,
              video: !0
            });
          } catch (x) {
            d = Nd(x.name || x.code || x, x.message);
            if (d.code === l.PERMISSION_DENIED) throw d;
            k.warning("getUserMedia failed in getDevices", d);
          }
          this.isAccessMicrophonePermission = this.isAccessCameraPermission =
            !0;
        } else if (f) {
          try {
            e = await navigator.mediaDevices.getUserMedia({ audio: a });
          } catch (x) {
            d = Nd(x.name || x.code || x, x.message);
            if (d.code === l.PERMISSION_DENIED) throw d;
            k.warning("getUserMedia failed in getDevices", d);
          }
          this.isAccessMicrophonePermission = !0;
        } else if (g) {
          try {
            h = await navigator.mediaDevices.getUserMedia({ video: b });
          } catch (x) {
            d = Nd(x.name || x.code || x, x.message);
            if (d.code === l.PERMISSION_DENIED) throw d;
            k.warning("getUserMedia failed in getDevices", d);
          }
          this.isAccessCameraPermission = !0;
        }
        k.debug("[device manager] mic permission", a, "cam permission", b);
      }
      try {
        var n, p, t;
        let a = await navigator.mediaDevices.enumerateDevices();
        return (
          e && r((n = e.getTracks())).call(n, (a) => a.stop()),
          h && r((p = h.getTracks())).call(p, (a) => a.stop()),
          q && r((t = q.getTracks())).call(t, (a) => a.stop()),
          a
        );
      } catch (x) {
        return new m(l.ENUMERATE_DEVICES_FAILED, x.toString()).throw();
      }
    }
    async getRecordingDevices(a = !1) {
      a = await this.enumerateDevices(!0, !1, a);
      return M(a).call(a, (a) => "audioinput" === a.kind);
    }
    async getCamerasDevices(a = !1) {
      a = await this.enumerateDevices(!1, !0, a);
      return M(a).call(a, (a) => "videoinput" === a.kind);
    }
    async getSpeakers(a = !1) {
      a = await this.enumerateDevices(!0, !1, a);
      return M(a).call(a, (a) => "audiooutput" === a.kind);
    }
    searchDeviceNameById(a) {
      return (a = this.deviceInfoMap.get(a))
        ? a.device.label || a.device.deviceId
        : null;
    }
    searchDeviceIdByName(a) {
      var b;
      let d = null;
      return (
        r((b = this.deviceInfoMap)).call(b, (b) => {
          b.device.label === a && (d = b.device.deviceId);
        }),
        d
      );
    }
    async getDeviceById(a) {
      var b = await this.enumerateDevices(!0, !0, !0);
      b = R(b).call(b, (b) => b.deviceId === a);
      if (!b) throw new m(l.DEVICE_NOT_FOUND, "deviceId: ".concat(a));
      return b;
    }
    async init() {
      this.state = pc.INITING;
      try {
        await this.updateDevicesInfo(), (this.state = pc.INITEND);
      } catch (a) {
        throw (
          ((k.warning(
            "Device Detection functionality cannot start properly.",
            a.toString()
          ),
          (this.state = pc.IDLE),
          "boolean" == typeof isSecureContext
            ? isSecureContext
            : "https:" === location.protocol ||
              "file:" === location.protocol ||
              "localhost" === location.hostname ||
              "127.0.0.1" === location.hostname ||
              "::1" === location.hostname) ||
            new m(
              l.WEB_SECURITY_RESTRICT,
              "Your context is limited by web security, please try using https protocol or localhost."
            ).throw(),
          a)
        );
      }
    }
    async updateDevicesInfo() {
      var a;
      let b = await this.enumerateDevices(!0, !0, !0),
        d = v(),
        e = [];
      r(b).call(b, (a) => {
        if (a.deviceId) {
          var b = this.deviceInfoMap.get(a.deviceId);
          if ("ACTIVE" !== (b ? b.state : "INACTIVE")) {
            let b = { initAt: d, updateAt: d, device: a, state: "ACTIVE" };
            this.deviceInfoMap.set(a.deviceId, b);
            e.push(b);
          }
          b && (b.updateAt = d);
        }
      });
      r((a = this.deviceInfoMap)).call(a, (a, b) => {
        "ACTIVE" === a.state &&
          a.updateAt !== d &&
          ((a.state = "INACTIVE"), e.push(a));
      });
      this.state === pc.INITEND &&
        r(e).call(e, (a) => {
          switch (a.device.kind) {
            case "audioinput":
              this.emit(Rb.RECORDING_DEVICE_CHANGED, a);
              break;
            case "videoinput":
              this.emit(Rb.CAMERA_DEVICE_CHANGED, a);
              break;
            case "audiooutput":
              this.emit(Rb.PLAYOUT_DEVICE_CHANGED, a);
          }
        });
    }
    checkMediaDeviceInfoIsOk(a) {
      let b = M(a).call(a, (a) => "audioinput" === a.kind);
      a = M(a).call(a, (a) => "videoinput" === a.kind);
      let d = { audio: !1, video: !1 };
      for (let a of b)
        if (a.label && a.deviceId) {
          d.audio = !0;
          break;
        }
      for (let b of a)
        if (b.label && b.deviceId) {
          d.video = !0;
          break;
        }
      return d;
    }
  }
  let ub = new op();
  var pp = [].slice,
    qp = /MSIE .\./.test(ld),
    Lk = function (a) {
      return function (b, d) {
        var e = 2 < arguments.length,
          f = e ? pp.call(arguments, 2) : void 0;
        return a(
          e
            ? function () {
                ("function" == typeof b ? b : Function(b)).apply(this, f);
              }
            : b,
          d
        );
      };
    };
  K(
    { global: !0, bind: !0, forced: qp },
    { setTimeout: Lk(J.setTimeout), setInterval: Lk(J.setInterval) }
  );
  var Cc = fa.setTimeout;
  let Qh = 0,
    Ye = 0,
    Mk = (a, b) => {
      b = ta.Events[a].create(b);
      return ta.Events[a].encode(b).finish();
    };
  class rp {
    constructor() {
      var a, b;
      this.baseInfoMap = new Y();
      this.clientList = dk;
      this.keyEventUploadPendingItems = [];
      this.normalEventUploadPendingItems = [];
      this.apiInvokeUploadPendingItems = [];
      this.apiInvokeCount = 0;
      this.ltsList = [];
      this.lastSendNormalEventTime = v();
      this.customReportCount = 0;
      this.url = "https://".concat(C.EVENT_REPORT_DOMAIN, ":6443");
      this.backupUrl = "https://".concat(C.EVENT_REPORT_BACKUP_DOMAIN, ":6443");
      this.eventUploadTimer = window.setInterval(
        ya((a = this.doSend)).call(a, this),
        C.EVENT_REPORT_SEND_INTERVAL
      );
      this.setSessionIdTimer = window.setInterval(
        ya((b = this.appendSessionId)).call(b, this),
        C.EVENT_REPORT_SEND_INTERVAL
      );
    }
    reportApiInvoke(a, b, d) {
      b.timeout = b.timeout || 6e4;
      b.reportResult = void 0 === b.reportResult || b.reportResult;
      let e = v(),
        f = (this.apiInvokeCount += 1),
        g = () => ({
          tag: b.tag,
          invokeId: f,
          sid: a,
          name: b.name,
          apiInvokeTime: e,
          options: b.options
        }),
        h = !!C.SHOW_REPORT_INVOKER_LOG;
      h && k.info("".concat(b.name, " start"), b.options);
      let q = !1;
      Ab(b.timeout).then(() => {
        q ||
          (this.sendApiInvoke(
            wa({}, g(), { error: l.API_INVOKE_TIMEOUT, success: !1 })
          ),
          k.debug("".concat(b.name, " timeout")));
      });
      let n = new m(
        l.UNEXPECTED_ERROR,
        "".concat(b.name, ": this api invoke is end")
      );
      return {
        onSuccess: (a) => {
          let e = () => {
            if (q) throw n;
            return (
              (q = !0),
              this.sendApiInvoke(
                wa({}, g(), { success: !0 }, b.reportResult && { result: a })
              ),
              h && k.info("".concat(b.name, " onSuccess")),
              a
            );
          };
          return d ? Jk(e, b.name + "Success", d, () => (q = !0)) : e();
        },
        onError: (a) => {
          let e = () => {
            if (q) throw a;
            q = !0;
            this.sendApiInvoke(
              wa({}, g(), { success: !1, error: a.toString() })
            );
            h && k.info("".concat(b.name, " onFailure"), a.toString());
          };
          return d ? Jk(e, b.name + "Error", d, () => (q = !0)) : e();
        }
      };
    }
    sessionInit(a, b) {
      if (!this.baseInfoMap.has(a)) {
        var d = v();
        a = this.createBaseInfo(a, d);
        a.cname = b.cname;
        var e = Wa({}, { willUploadConsoleLog: C.UPLOAD_LOG }, b.extend),
          f = v();
        b = wa({}, a, {
          eventType: Ba.SESSION_INIT,
          appid: b.appid,
          browser: navigator.userAgent,
          build: "v4.1.0-0-g64d4440(9/4/2020, 5:57:23 PM)",
          lts: f,
          elapse: f - d,
          extend: w(e),
          mode: b.mode,
          process: C.PROCESS_ID,
          success: !0,
          version: $a
        });
        this.send({ type: pa.SESSION, data: b }, !0);
      }
    }
    joinChooseServer(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        b = wa({}, d, {
          eventType: Ba.JOIN_CHOOSE_SERVER,
          lts: e,
          eventElapse: e - b.lts,
          chooseServerAddr: b.csAddr,
          errorCode: b.ec,
          elapse: e - a.startTime,
          success: b.succ,
          chooseServerAddrList: w(b.serverList),
          uid: b.uid ? S(b.uid) : null,
          cid: b.cid ? S(b.cid) : null
        });
        this.send({ type: pa.JOIN_CHOOSE_SERVER, data: b }, !0);
      }
    }
    reqUserAccount(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        b = wa({}, d, {
          eventType: Ba.REQ_USER_ACCOUNT,
          lts: e,
          success: b.success,
          serverAddress: b.serverAddr,
          stringUid: b.stringUid,
          uid: b.uid,
          errorCode: b.errorCode,
          elapse: e - a.startTime,
          eventElapse: e - b.lts,
          extend: w(b.extend)
        });
        this.send({ type: pa.REQ_USER_ACCOUNT, data: b }, !0);
      }
    }
    joinGateway(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info;
        b.vid && (d.vid = b.vid);
        d.uid = b.uid;
        d.cid = b.cid;
        var e = v();
        d = wa({}, d, {
          eventType: Ba.JOIN_GATEWAY,
          lts: e,
          gatewayAddr: b.addr,
          success: b.succ,
          errorCode: b.ec,
          elapse: e - a.startTime,
          eventElapse: e - b.lts
        });
        b.succ && (a.lastJoinSuccessTime = e);
        this.send({ type: pa.JOIN_GATEWAT, data: d }, !0);
      }
    }
    joinChannelTimeout(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = v();
        b = wa({}, a.info, { lts: d, timeout: b, elapse: d - a.startTime });
        this.send({ type: pa.JOIN_CHANNEL_TIMEOUT, data: b }, !0);
      }
    }
    publish(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        b = wa({}, d, {
          eventType: Ba.PUBLISH,
          lts: e,
          eventElapse: e - b.lts,
          elapse: e - a.startTime,
          success: b.succ,
          errorCode: b.ec,
          videoName: b.videoName,
          audioName: b.audioName,
          screenName: b.screenName,
          screenshare: b.screenshare,
          audio: b.audio,
          video: b.video,
          p2pid: b.p2pid,
          publishRequestid: b.publishRequestid
        });
        this.send({ type: pa.PUBLISH, data: b }, !0);
      }
    }
    subscribe(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        a = wa({}, d, {
          eventType: Ba.SUBSCRIBE,
          lts: e,
          eventElapse: e - b.lts,
          elapse: e - a.startTime,
          success: b.succ,
          errorCode: b.ec,
          video: b.video,
          audio: b.audio,
          subscribeRequestid: b.subscribeRequestid,
          p2pid: b.p2pid
        });
        "string" == typeof b.peerid
          ? (a.peerSuid = b.peerid)
          : (a.peer = b.peerid);
        this.send({ type: pa.SUBSCRIBE, data: a }, !0);
      }
    }
    firstRemoteFrame(a, b, d, e) {
      if ((a = this.baseInfoMap.get(a))) {
        var f = a.info,
          g = v();
        b = wa({}, f, {}, e, { elapse: g - a.startTime, eventType: b, lts: g });
        this.send({ type: d, data: b }, !0);
      }
    }
    onGatewayStream(a, b, d, e) {
      if ((a = this.baseInfoMap.get(a)))
        (b = wa({}, a.info, {}, e, { eventType: b, lts: v() })),
          this.send({ type: d, data: b }, !0);
    }
    streamSwitch(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        b = wa({}, d, {
          eventType: Ba.STREAM_SWITCH,
          lts: e,
          isDual: b.isdual,
          elapse: e - a.startTime,
          success: b.succ
        });
        this.send({ type: pa.STREAM_SWITCH, data: b }, !0);
      }
    }
    requestProxyAppCenter(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        b = wa({}, d, {
          eventType: Ba.REQUEST_PROXY_APPCENTER,
          lts: e,
          eventElapse: e - b.lts,
          elapse: e - a.startTime,
          APAddr: b.APAddr,
          workerManagerList: b.workerManagerList,
          response: b.response,
          errorCode: b.ec,
          success: b.succ
        });
        this.send({ type: pa.REQUEST_PROXY_APPCENTER, data: b }, !0);
      }
    }
    requestProxyWorkerManager(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        b = wa({}, d, {
          eventType: Ba.REQUEST_PROXY_WORKER_MANAGER,
          lts: e,
          eventElapse: e - b.lts,
          elapse: e - a.startTime,
          workerManagerAddr: b.workerManagerAddr,
          response: b.response,
          errorCode: b.ec,
          success: b.succ
        });
        this.send({ type: pa.REQUEST_PROXY_WORKER_MANAGER, data: b }, !0);
      }
    }
    setProxyServer(a) {
      (this.proxyServer = a)
        ? k.debug("reportProxyServerurl: ".concat(a))
        : k.debug("disable reportProxyServerurl: ".concat(a));
      a ||
        ((this.url = "https://".concat(C.EVENT_REPORT_DOMAIN, ":6443")),
        (this.backupUrl = "https://".concat(
          C.EVENT_REPORT_BACKUP_DOMAIN,
          ":6443"
        )));
    }
    peerPublishStatus(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        b = wa({}, d, {
          subscribeElapse: b.subscribeElapse,
          peer: b.peer,
          peerPublishDuration: Math.max(
            b.audioPublishDuration,
            b.videoPublishDuration
          ),
          audiotag: 0 < b.audioPublishDuration ? 1 : -1,
          videotag: 0 < b.videoPublishDuration ? 1 : -1,
          lts: e,
          elapse: e - a.startTime,
          joinChannelSuccessElapse: e - (a.lastJoinSuccessTime || e)
        });
        this.send({ type: pa.PEER_PUBLISH_STATUS, data: b }, !0);
      }
    }
    workerEvent(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        b = Gl(
          wa({}, d, {}, b, {
            elapse: e - a.startTime,
            lts: e,
            productType: "WebRTC"
          }),
          "payload",
          1300
        );
        r(b).call(b, (a) =>
          this.send({ type: "WorkerEvent", data: a, isPb: !0, id: 156 }, !0)
        );
      }
    }
    apworkerEvent(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        b = wa({}, d, {}, b, { elapse: e - a.startTime, lts: e });
        this.send({ type: "APWorkerEvent", data: b, isPb: !0, id: 160 }, !0);
      }
    }
    async sendCustomReportMessage(a, b) {
      if (
        ((this.customReportCount += b.length),
        this.customReportCount > C.CUSTOM_REPORT_LIMIT)
      )
        throw new m(l.CUSTOM_REPORT_FREQUENCY_TOO_HIGH);
      this.customReportCounterTimer ||
        (this.customReportCounterTimer = window.setInterval(() => {
          this.customReportCount = 0;
        }, 5e3));
      b = D(b).call(b, (b) => ({
        type: pa.USER_ANALYTICS,
        data: wa({ sid: a }, b)
      }));
      b = {
        msgType: "EventMessages",
        sentTs: Math.round(v() / 1e3),
        payloads: D(b).call(b, (a) => w(a))
      };
      try {
        await this.postDataToStatsCollector(b);
      } catch (d) {
        throw (
          (k.error("send custom report message failed", d.toString()),
          new m(l.CUSTOM_REPORT_SEND_FAILED, d.message))
        );
      }
    }
    sendApiInvoke(a) {
      var b = C.NOT_REPORT_EVENT;
      if (!(a.tag && La(b) && La(b).call(b, a.tag))) {
        if (null === a.sid)
          return void this.apiInvokeUploadPendingItems.push(a);
        b = this.baseInfoMap.get(a.sid);
        if (!b) return void this.apiInvokeUploadPendingItems.push(a);
        var { cname: d, uid: e, cid: f } = b.info;
        a.lts = a.lts || v();
        a = {
          invokeId: a.invokeId,
          sid: a.sid,
          cname: d,
          cid: f,
          uid: e,
          lts: a.lts,
          success: a.success,
          elapse: a.lts - b.startTime,
          execElapse: a.lts - a.apiInvokeTime,
          apiName: a.name,
          options: a.options ? w(a.options) : void 0,
          execStates: a.states ? w(a.states) : void 0,
          execResult: a.result ? w(a.result) : void 0,
          errorCode: a.error ? w(a.error) : void 0
        };
        this.send({ type: pa.API_INVOKE, data: a }, !1);
      }
    }
    appendSessionId() {
      var a;
      let b = !1;
      r((a = this.clientList)).call(a, (a) => {
        var d;
        a._sessionId &&
          (r((d = this.apiInvokeUploadPendingItems)).call(d, (b) => {
            b.sid = a._sessionId;
            this.sendApiInvoke(Wa({}, b));
          }),
          (b = !0));
      });
      b && (this.apiInvokeUploadPendingItems = []);
    }
    send(a, b) {
      if (b)
        return (
          this.keyEventUploadPendingItems.push(a),
          void this.sendItems(this.keyEventUploadPendingItems, !0)
        );
      var d;
      (this.normalEventUploadPendingItems.push(a),
      this.normalEventUploadPendingItems.length >
        C.NORMAL_EVENT_QUEUE_CAPACITY) &&
        Ma((d = this.normalEventUploadPendingItems)).call(d, 0, 1);
      10 <= this.normalEventUploadPendingItems.length &&
        this.sendItems(this.normalEventUploadPendingItems, !1);
    }
    doSend() {
      0 < this.keyEventUploadPendingItems.length &&
        this.sendItems(this.keyEventUploadPendingItems, !0);
      0 < this.normalEventUploadPendingItems.length &&
        5e3 <= v() - this.lastSendNormalEventTime &&
        this.sendItems(this.normalEventUploadPendingItems, !1);
    }
    sendItems(a, b) {
      let d = [],
        e = [];
      for (var f = []; a.length; ) {
        let b = a.shift();
        Yo(b)
          ? 20 > e.length
            ? e.push(b)
            : f.push(b)
          : 20 > d.length
          ? d.push(b)
          : f.push(b);
      }
      a.push(...f);
      for (let a of [...d, ...e]) {
        var g, h;
        -1 !== E((g = this.ltsList)).call(g, a.data.lts)
          ? ((a.data.lts = this.ltsList[this.ltsList.length - 1] + 1),
            this.ltsList.push(a.data.lts))
          : (this.ltsList.push(a.data.lts),
            rd((h = this.ltsList)).call(h, (a, b) => a - b));
      }
      b || (this.lastSendNormalEventTime = v());
      f = {
        msgType: "EventMessages",
        sentTs: Math.round(v() / 1e3),
        payloads: D(d).call(d, (a) => w(a))
      };
      g = Mk("ProtoRaws", {
        sentTs: Math.round(v() / 1e3),
        payloads: D(e).call(e, (a) => ({ id: a.id, msg: Mk(a.type, a.data) }))
      });
      h = (a) => (d) => {
        var e, f, g;
        b
          ? (this.keyEventUploadPendingItems = n(
              (e = this.keyEventUploadPendingItems)
            ).call(e, a))
          : ((this.normalEventUploadPendingItems = n(
              (f = this.normalEventUploadPendingItems)
            ).call(f, a)),
            this.normalEventUploadPendingItems.length >
              C.NORMAL_EVENT_QUEUE_CAPACITY &&
              (Ma((g = this.normalEventUploadPendingItems)).call(
                g,
                0,
                this.normalEventUploadPendingItems.length -
                  C.NORMAL_EVENT_QUEUE_CAPACITY
              ),
              k.warning("report: drop normal events")));
      };
      return (
        e.length && this.postDataToStatsCollector(g, !0).catch(h(e)),
        d.length && this.postDataToStatsCollector(f).catch(h(d)),
        a
      );
    }
    async postDataToStatsCollector(a, b = !1) {
      var d, e, f;
      let g = b ? "/events/proto-raws" : "/events/messages",
        h = this.proxyServer
          ? n(
              (d = n((e = "https://".concat(this.proxyServer, "/rs/?h="))).call(
                e,
                C.EVENT_REPORT_DOMAIN,
                "&p=6443&d="
              ))
            ).call(d, g)
          : n((f = "".concat(this.url))).call(f, g);
      for (d = 0; 2 > d; d += 1) {
        var k, l, m;
        1 === d &&
          (h = this.proxyServer
            ? n(
                (k = n(
                  (l = "https://".concat(this.proxyServer, "/rs/?h="))
                ).call(l, C.EVENT_REPORT_BACKUP_DOMAIN, "&p=6443&d="))
              ).call(k, g)
            : n((m = "".concat(this.backupUrl))).call(m, g));
        try {
          b
            ? await Vl(h, { timeout: 1e4, data: a })
            : await Vb(h, { timeout: 1e4, data: a });
        } catch (qa) {
          if (1 === d) throw qa;
          continue;
        }
        break;
      }
    }
    createBaseInfo(a, b) {
      let d = Wa({}, Xo);
      return (d.sid = a), this.baseInfoMap.set(a, { info: d, startTime: b }), d;
    }
  }
  let t = new rp(),
    Wl = {
      [Ac.ACCESS_POINT]: {
        [Ca.NO_FLAG_SET]: { desc: "flag is zero", retry: !1 },
        [Ca.FLAG_SET_BUT_EMPTY]: { desc: "flag is empty", retry: !1 },
        [Ca.INVALID_FALG_SET]: { desc: "invalid flag", retry: !1 },
        [Ca.NO_SERVICE_AVAILABLE]: { desc: "no service available", retry: !0 },
        [Ca.NO_SERVICE_AVAILABLE_P2P]: {
          desc: "no unilbs p2p service available",
          retry: !0
        },
        [Ca.NO_SERVICE_AVAILABLE_VOET]: {
          desc: "no unilbs voice service available",
          retry: !0
        },
        [Ca.NO_SERVICE_AVAILABLE_WEBRTC]: {
          desc: "no unilbs webrtc service available",
          retry: !0
        },
        [Ca.NO_SERVICE_AVAILABLE_CDS]: {
          desc: "no cds service available",
          retry: !0
        },
        [Ca.NO_SERVICE_AVAILABLE_CDN]: {
          desc: "no cdn dispatcher service available",
          retry: !0
        },
        [Ca.NO_SERVICE_AVAILABLE_TDS]: {
          desc: "no tds service available",
          retry: !0
        },
        [Ca.NO_SERVICE_AVAILABLE_REPORT]: {
          desc: "no unilbs report service available",
          retry: !0
        },
        [Ca.NO_SERVICE_AVAILABLE_APP_CENTER]: {
          desc: "no app center service available",
          retry: !0
        },
        [Ca.NO_SERVICE_AVAILABLE_ENV0]: {
          desc: "no unilbs sig env0 service available",
          retry: !0
        },
        [Ca.NO_SERVICE_AVAILABLE_VOET]: {
          desc: "no unilbs voet service available",
          retry: !0
        },
        [Ca.NO_SERVICE_AVAILABLE_STRING_UID]: {
          desc: "no string uid service available",
          retry: !0
        },
        [Ca.NO_SERVICE_AVAILABLE_WEBRTC_UNILBS]: {
          desc: "no webrtc unilbs service available",
          retry: !0
        }
      },
      [Ac.UNILBS]: {
        [rb.INVALID_VENDOR_KEY]: {
          desc: "invalid vendor key, can not find appid",
          retry: !1
        },
        [rb.INVALID_CHANNEL_NAME]: { desc: "invalid channel name", retry: !1 },
        [rb.INTERNAL_ERROR]: { desc: "unilbs internal error", retry: !1 },
        [rb.NO_AUTHORIZED]: {
          desc: "invalid token, authorized failed",
          retry: !1
        },
        [rb.DYNAMIC_KEY_TIMEOUT]: {
          desc: "dynamic key or token timeout",
          retry: !1
        },
        [rb.NO_ACTIVE_STATUS]: { desc: "no active status", retry: !1 },
        [rb.DYNAMIC_KEY_EXPIRED]: { desc: "dynamic key expired", retry: !1 },
        [rb.STATIC_USE_DYNAMIC_KEY]: {
          desc: "static use dynamic key",
          retry: !1
        },
        [rb.DYNAMIC_USE_STATIC_KEY]: {
          desc: "dynamic use static key",
          retry: !1
        }
      },
      [Ac.STRING_UID_ALLOCATOR]: {
        [sd.IIIEGAL_APPID]: { desc: "invalid appid", retry: !1 },
        [sd.IIIEGAL_UID]: { desc: "invalid string uid", retry: !1 },
        [sd.INTERNAL_ERROR]: {
          desc: "string uid allocator internal error",
          retry: !0
        }
      }
    },
    Xl = {
      [B.K_TIMESTAMP_EXPIRED]: {
        desc: "K_TIMESTAMP_EXPIRED",
        action: "failed"
      },
      [B.K_CHANNEL_PERMISSION_INVALID]: {
        desc: "K_CHANNEL_PERMISSION_INVALID",
        action: "failed"
      },
      [B.K_CERTIFICATE_INVALID]: {
        desc: "K_CERTIFICATE_INVALID",
        action: "failed"
      },
      [B.K_CHANNEL_NAME_EMPTY]: {
        desc: "K_CHANNEL_NAME_EMPTY",
        action: "failed"
      },
      [B.K_CHANNEL_NOT_FOUND]: {
        desc: "K_CHANNEL_NOT_FOUND",
        action: "failed"
      },
      [B.K_TICKET_INVALID]: { desc: "K_TICKET_INVALID", action: "failed" },
      [B.K_CHANNEL_CONFLICTED]: {
        desc: "K_CHANNEL_CONFLICTED",
        action: "failed"
      },
      [B.K_SERVICE_NOT_READY]: {
        desc: "K_SERVICE_NOT_READY",
        action: "recover"
      },
      [B.K_SERVICE_TOO_HEAVY]: {
        desc: "K_SERVICE_TOO_HEAVY",
        action: "tryNext"
      },
      [B.K_UID_BANNED]: { desc: "K_UID_BANNED", action: "failed" },
      [B.K_IP_BANNED]: { desc: "K_IP_BANNED", action: "failed" },
      [B.ERR_INVALID_VENDOR_KEY]: {
        desc: "ERR_INVALID_VENDOR_KEY",
        action: "failed"
      },
      [B.ERR_INVALID_CHANNEL_NAME]: {
        desc: "ERR_INVALID_CHANNEL_NAME",
        action: "failed"
      },
      [B.WARN_NO_AVAILABLE_CHANNEL]: {
        desc: "WARN_NO_AVAILABLE_CHANNEL",
        action: "failed"
      },
      [B.WARN_LOOKUP_CHANNEL_TIMEOUT]: {
        desc: "WARN_LOOKUP_CHANNEL_TIMEOUT",
        action: "tryNext"
      },
      [B.WARN_LOOKUP_CHANNEL_REJECTED]: {
        desc: "WARN_LOOKUP_CHANNEL_REJECTED",
        action: "failed"
      },
      [B.WARN_OPEN_CHANNEL_TIMEOUT]: {
        desc: "WARN_OPEN_CHANNEL_TIMEOUT",
        action: "tryNext"
      },
      [B.WARN_OPEN_CHANNEL_REJECTED]: {
        desc: "WARN_OPEN_CHANNEL_REJECTED",
        action: "failed"
      },
      [B.WARN_REQUEST_DEFERRED]: {
        desc: "WARN_REQUEST_DEFERRED",
        action: "failed"
      },
      [B.ERR_DYNAMIC_KEY_TIMEOUT]: {
        desc: "ERR_DYNAMIC_KEY_TIMEOUT",
        action: "failed"
      },
      [B.ERR_NO_AUTHORIZED]: { desc: "ERR_NO_AUTHORIZED", action: "failed" },
      [B.ERR_VOM_SERVICE_UNAVAILABLE]: {
        desc: "ERR_VOM_SERVICE_UNAVAILABLE",
        action: "tryNext"
      },
      [B.ERR_NO_CHANNEL_AVAILABLE_CODE]: {
        desc: "ERR_NO_CHANNEL_AVAILABLE_CODE",
        action: "failed"
      },
      [B.ERR_MASTER_VOCS_UNAVAILABLE]: {
        desc: "ERR_MASTER_VOCS_UNAVAILABLE",
        action: "tryNext"
      },
      [B.ERR_INTERNAL_ERROR]: { desc: "ERR_INTERNAL_ERROR", action: "tryNext" },
      [B.ERR_NO_ACTIVE_STATUS]: {
        desc: "ERR_NO_ACTIVE_STATUS",
        action: "failed"
      },
      [B.ERR_INVALID_UID]: { desc: "ERR_INVALID_UID", action: "failed" },
      [B.ERR_DYNAMIC_KEY_EXPIRED]: {
        desc: "ERR_DYNAMIC_KEY_EXPIRED",
        action: "failed"
      },
      [B.ERR_STATIC_USE_DYANMIC_KE]: {
        desc: "ERR_STATIC_USE_DYANMIC_KE",
        action: "failed"
      },
      [B.ERR_DYNAMIC_USE_STATIC_KE]: {
        desc: "ERR_DYNAMIC_USE_STATIC_KE",
        action: "failed"
      },
      [B.ERR_NO_VOCS_AVAILABLE]: {
        desc: "ERR_NO_VOCS_AVAILABLE",
        action: "tryNext"
      },
      [B.ERR_NO_VOS_AVAILABLE]: {
        desc: "ERR_NO_VOS_AVAILABLE",
        action: "tryNext"
      },
      [B.ERR_JOIN_CHANNEL_TIMEOUT]: {
        desc: "ERR_JOIN_CHANNEL_TIMEOUT",
        action: "tryNext"
      },
      [B.ERR_JOIN_BY_MULTI_IP]: {
        desc: "ERR_JOIN_BY_MULTI_IP",
        action: "recover"
      },
      [B.ERR_NOT_JOINED]: { desc: "ERR_NOT_JOINED", action: "failed" },
      [B.ERR_REPEAT_JOIN_REQUEST]: {
        desc: "ERR_REPEAT_JOIN_REQUEST",
        action: "quit"
      },
      [B.ERR_REPEAT_JOIN_CHANNEL]: {
        desc: "ERR_REPEAT_JOIN_CHANNEL",
        action: "quit"
      },
      [B.ERR_INVALID_VENDOR_KEY]: {
        desc: "ERR_INVALID_VENDOR_KEY",
        action: "failed"
      },
      [B.ERR_INVALID_CHANNEL_NAME]: {
        desc: "ERR_INVALID_CHANNEL_NAME",
        action: "failed"
      },
      [B.ERR_INVALID_STRINGUID]: {
        desc: "ERR_INVALID_STRINGUID",
        action: "failed"
      },
      [B.ERR_TOO_MANY_USERS]: { desc: "ERR_TOO_MANY_USERS", action: "tryNext" },
      [B.ERR_SET_CLIENT_ROLE_TIMEOUT]: {
        desc: "ERR_SET_CLIENT_ROLE_TIMEOUT",
        action: "failed"
      },
      [B.ERR_SET_CLIENT_ROLE_NO_PERMISSION]: {
        desc: "ERR_SET_CLIENT_ROLE_TIMEOUT",
        action: "failed"
      },
      [B.ERR_SET_CLIENT_ROLE_ALREADY_IN_USE]: {
        desc: "ERR_SET_CLIENT_ROLE_ALREADY_IN_USE",
        action: "success"
      },
      [B.ERR_PUBLISH_REQUEST_INVALID]: {
        desc: "ERR_PUBLISH_REQUEST_INVALID",
        action: "failed"
      },
      [B.ERR_SUBSCRIBE_REQUEST_INVALID]: {
        desc: "ERR_SUBSCRIBE_REQUEST_INVALID",
        action: "failed"
      },
      [B.ERR_NOT_SUPPORTED_MESSAGE]: {
        desc: "ERR_NOT_SUPPORTED_MESSAGE",
        action: "failed"
      },
      [B.ERR_ILLEAGAL_PLUGIN]: {
        desc: "ERR_ILLEAGAL_PLUGIN",
        action: "failed"
      },
      [B.ERR_REJOIN_TOKEN_INVALID]: {
        desc: "ERR_REJOIN_TOKEN_INVALID",
        action: "failed"
      },
      [B.ERR_REJOIN_USER_NOT_JOINED]: {
        desc: "ERR_REJOIN_NOT_JOINED",
        action: "failed"
      },
      [B.ERR_INVALID_OPTIONAL_INFO]: {
        desc: "ERR_INVALID_OPTIONAL_INFO",
        action: "quit"
      },
      [B.ERR_TEST_RECOVER]: { desc: "ERR_TEST_RECOVER", action: "recover" },
      [B.ERR_TEST_TRYNEXT]: { desc: "ERR_TEST_TRYNEXT", action: "recover" },
      [B.ERR_TEST_RETRY]: { desc: "ERR_TEST_RETRY", action: "recover" }
    },
    Na = {
      timeout: 500,
      timeoutFactor: 1.5,
      maxRetryCount: 1 / 0,
      maxRetryTimeout: 1e4
    };
  class pg extends Ua {
    constructor(a, b) {
      super();
      this.currentURLIndex = this.connectionID = 0;
      this.reconnectMode = "tryNext";
      this._state = "closed";
      this.reconnectCount = 0;
      this.name = a;
      this.retryConfig = b;
    }
    get url() {
      return this.websocket ? this.websocket.url : null;
    }
    get state() {
      return this._state;
    }
    set state(a) {
      a !== this._state &&
        ((this._state = a),
        "reconnecting" === this._state
          ? this.emit(Q.RECONNECTING, this.reconnectMode)
          : "connected" === this._state
          ? this.emit(Q.CONNECTED)
          : "closed" === this._state
          ? this.emit(Q.CLOSED)
          : "failed" === this._state && this.emit(Q.FAILED));
    }
    init(a) {
      return new u((b, d) => {
        this.urls = a;
        let e = this.urls[this.currentURLIndex];
        this.state = "connecting";
        this.createWebSocketConnection(e).then(b).catch(d);
        this.once(Q.CLOSED, () => d(new m(l.WS_DISCONNECT)));
        this.once(Q.CONNECTED, () => b());
      });
    }
    close(a, b) {
      if (
        ((this.currentURLIndex = 0), (this.reconnectCount = 0), this.websocket)
      ) {
        this.websocket.onclose = null;
        this.websocket.onopen = null;
        this.websocket.onmessage = null;
        let a = this.websocket;
        b ? Cc(() => a.close(), 500) : a.close();
        this.websocket = void 0;
      }
      this.state = a ? "failed" : "closed";
    }
    reconnect(a) {
      if (!this.websocket)
        return void k.warning(
          "[".concat(this.name, "] can not reconnect, no websocket")
        );
      void 0 !== a && (this.reconnectMode = a);
      a = this.websocket.onclose;
      this.websocket.onclose = null;
      this.websocket.close();
      a && ya(a).call(a, this.websocket)({ code: 9999 });
    }
    sendMessage(a) {
      if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN)
        throw new m(l.WS_ABORT, "websocket is not ready");
      a = w(a);
      try {
        this.websocket.send(a);
      } catch (b) {
        throw new m(l.WS_ERR, "send websocket message error" + b.toString());
      }
    }
    async createWebSocketConnection(a) {
      let b = (this.connectionID += 1);
      return new u((d, e) => {
        var f, g;
        this.websocket &&
          ((this.websocket.onclose = null), this.websocket.close());
        C.GATEWAY_WSS_ADDRESS &&
          Bd((f = this.name)).call(f, "gateway") &&
          (a = C.GATEWAY_WSS_ADDRESS);
        k.debug(
          n((g = "[".concat(this.name, "] start connect, url: "))).call(g, a)
        );
        try {
          (this.websocket = new WebSocket(a)),
            (this.websocket.binaryType = "arraybuffer");
        } catch (q) {
          var h;
          f = new m(
            l.WS_ERR,
            "init websocket failed! Error: ".concat(q.toString())
          );
          return (
            k.error(n((h = "[".concat(this.name, "]"))).call(h, f)), void e(f)
          );
        }
        Ab(5e3).then(() => {
          b === this.connectionID &&
            this.websocket &&
            this.websocket.readyState !== WebSocket.OPEN &&
            this.websocket &&
            this.websocket.close();
        });
        this.websocket.onopen = () => {
          k.debug("[".concat(this.name, "] websockect opened:"), a);
          this.reconnectMode = "retry";
          this.state = "connected";
          this.reconnectCount = 0;
          d();
        };
        this.websocket.onclose = async (a) => {
          var b, f, g, h;
          if (
            (k.debug(
              n(
                (b = n(
                  (f = n(
                    (g = n(
                      (h = "[".concat(this.name, "] websocket close "))
                    ).call(h, this.websocket && this.websocket.url, ", code: "))
                  ).call(g, a.code, ", reason: "))
                ).call(f, a.reason, ", current mode: "))
              ).call(b, this.reconnectMode)
            ),
            this.reconnectCount < this.retryConfig.maxRetryCount)
          ) {
            "connected" === this.state && (this.state = "reconnecting");
            b =
              ec(this, Q.WILL_RECONNECT, this.reconnectMode) ||
              this.reconnectMode;
            b = await this.reconnectWithAction(b);
            if ("closed" === this.state)
              return void k.debug(
                "[".concat(
                  this.connectionID,
                  "] ws is closed, no need to reconnect"
                )
              );
            if (!b)
              return (
                e(
                  new m(
                    l.WS_DISCONNECT,
                    "websocket reconnect failed: ".concat(a.code)
                  )
                ),
                void this.close(!0)
              );
            d();
          } else
            e(new m(l.WS_DISCONNECT, "websocket close: ".concat(a.code))),
              this.close();
        };
        this.websocket.onmessage = (a) => {
          this.emit(Q.ON_MESSAGE, a);
        };
      });
    }
    async reconnectWithAction(a, b) {
      var d, e;
      if (
        (!b && this.reconnectCount >= this.retryConfig.maxRetryCount) ||
        !this.urls ||
        "closed" === this.state
      )
        return !1;
      b = this.retryConfig;
      b = Math.min(
        b.maxRetryTimeout,
        b.timeout * Math.pow(b.timeoutFactor, this.reconnectCount)
      );
      if (
        (k.debug(
          n(
            (d = n((e = "[".concat(this.name, "] wait "))).call(
              e,
              b,
              "ms to reconnect websocket, mode: "
            ))
          ).call(d, a)
        ),
        await Ab(b),
        "closed" === this.state)
      )
        return !1;
      this.reconnectCount += 1;
      try {
        if ("retry" === a)
          await this.createWebSocketConnection(this.urls[this.currentURLIndex]);
        else if ("tryNext" === a) {
          var f, g;
          if (
            ((this.currentURLIndex += 1),
            this.currentURLIndex >= this.urls.length)
          )
            return await this.reconnectWithAction("recover");
          k.debug(
            n(
              (f = n(
                (g = "[".concat(this.name, "] websocket url length: "))
              ).call(g, this.urls.length, " current index: "))
            ).call(f, this.currentURLIndex)
          );
          await this.createWebSocketConnection(this.urls[this.currentURLIndex]);
        } else
          "recover" === a &&
            (k.debug("[".concat(this.name, "] request new urls")),
            (this.urls = await Ha(this, Q.REQUEST_NEW_URLS)),
            (this.currentURLIndex = 0),
            await this.createWebSocketConnection(
              this.urls[this.currentURLIndex]
            ));
        return !0;
      } catch (h) {
        return (
          k.error("[".concat(this.name, "] reconnect failed"), h.toString()),
          await this.reconnectWithAction(a)
        );
      }
    }
  }
  class sp {
    constructor(a) {
      this.input = [];
      this.size = a;
    }
    add(a) {
      var b;
      (this.input.push(a), this.input.length > this.size) &&
        Ma((b = this.input)).call(b, 0, 1);
    }
    mean() {
      var a;
      return 0 === this.input.length
        ? 0
        : xe((a = this.input)).call(a, (a, d) => a + d) / this.input.length;
    }
  }
  class tp extends Ua {
    constructor(a) {
      super();
      this._connectionState = ua.CLOSED;
      this.openConnectionTime = v();
      this.lastMsgTime = v();
      this.uploadCache = [];
      this.rttRolling = new sp(5);
      this.pingpongTimeoutCount = 0;
      this.onWebsocketMessage = (a) => {
        if (a.data instanceof ArrayBuffer)
          return void this.emit(P.ON_BINARY_DATA, a.data);
        a = JSON.parse(a.data);
        if (((this.lastMsgTime = v()), a.hasOwnProperty("_id"))) {
          let b = "res-@".concat(a._id);
          this.emit(b, a._result, a._message);
        } else if (
          a.hasOwnProperty("_type") &&
          (this.emit(a._type, a._message),
          a._type === X.ON_NOTIFICATION && this.handleNotification(a._message),
          a._type === X.ON_USER_BANNED)
        )
          switch (a._message.error_code) {
            case 14:
              this.close("UID_BANNED");
              break;
            case 15:
              this.close("IP_BANNED");
              break;
            case 16:
              this.close("CHANNEL_BANNED");
          }
      };
      this.clientId = a.clientId;
      this.spec = a;
      this.websocket = new pg(
        "gateway-".concat(this.clientId),
        this.spec.retryConfig
      );
      this.handleWebsocketEvents();
    }
    get connectionState() {
      return this._connectionState;
    }
    set connectionState(a) {
      a !== this._connectionState &&
        ((this._connectionState = a),
        a === ua.CONNECTED
          ? this.emit(P.WS_CONNECTED)
          : a === ua.RECONNECTING
          ? this.emit(P.WS_RECONNECTING)
          : a === ua.CLOSED &&
            this.emit(P.WS_CLOSED, this._disconnectedReason));
    }
    get url() {
      return this.websocket ? this.websocket.url : null;
    }
    get rtt() {
      return this.rttRolling.mean();
    }
    async request(a, b, d) {
      var e, f, g, h, q;
      let p = na(6, "");
      var r = { _id: p, _type: a, _message: b };
      let t = this.websocket.connectionID;
      var x = () =>
        new u((a, b) => {
          if (this.connectionState === ua.CONNECTED) return a();
          const d = () => {
              this.off(P.WS_CLOSED, e);
              a();
            },
            e = () => {
              this.off(P.WS_CONNECTED, d);
              b(new m(l.WS_ABORT));
            };
          this.once(P.WS_CONNECTED, d);
          this.once(P.WS_CLOSED, e);
        });
      (this.connectionState !== ua.CONNECTING &&
        this.connectionState !== ua.RECONNECTING) ||
        a === ha.JOIN ||
        a === ha.REJOIN ||
        (await x());
      var v = new u((d, e) => {
        let f = !1;
        const g = (a, b) => {
          f = !0;
          d({ isSuccess: "success" === a, message: b || {} });
          this.off(P.WS_CLOSED, h);
          this.off(P.WS_RECONNECTING, h);
        };
        this.once("res-@".concat(p), g);
        const h = () => {
          e(new m(l.WS_ABORT, "type: ".concat(a)));
          this.off(P.WS_CLOSED, h);
          this.off(P.WS_RECONNECTING, h);
          this.off("res-@".concat(p), g);
        };
        this.once(P.WS_CLOSED, h);
        this.once(P.WS_RECONNECTING, h);
        Ab(C.SIGNAL_REQUEST_TIMEOUT).then(() => {
          this.websocket.connectionID !== t ||
            f ||
            (k.warning("ws request timeout, type: ".concat(a)),
            this.onRequestTimeout && this.onRequestTimeout(a, b));
        });
      });
      this.websocket.sendMessage(r);
      r = null;
      try {
        r = await v;
      } catch (xb) {
        if (this.connectionState === ua.CLOSED || a === ha.LEAVE)
          throw new m(l.WS_ABORT);
        return !this.spec.forceWaitGatewayResponse || d
          ? xb.throw()
          : a === ha.JOIN || a === ha.REJOIN
          ? null
          : (await x(), await this.request(a, b));
      }
      if (r.isSuccess) return r.message;
      d = Number(r.message.error_code || r.message.code);
      x = Sh(d);
      v = new m(
        l.UNEXPECTED_RESPONSE,
        n((e = "".concat(x.desc, ": "))).call(e, r.message.error_str),
        { code: d, data: r.message }
      );
      return "success" === x.action
        ? r.message
        : (k.warning(
            n(
              (f = n(
                (g = n(
                  (h = n(
                    (q = "[".concat(
                      this.websocket.connectionID,
                      "] unexpected response from type "
                    ))
                  ).call(q, a, ", error_code: "))
                ).call(h, d, ", message: "))
              ).call(g, x.desc, ", action: "))
            ).call(f, x.action)
          ),
          "failed" === x.action
            ? v.throw()
            : "quit" === x.action
            ? ((this.initError = v), this.close(), v.throw())
            : (d === B.ERR_JOIN_BY_MULTI_IP
                ? ((this.multiIpOption = r.message.option),
                  k.warning(
                    "[".concat(this.clientId, "] detect multi ip, recover")
                  ),
                  this.reconnect("recover"))
                : this.reconnect(x.action),
              a === ha.JOIN || a === ha.REJOIN
                ? null
                : await this.request(a, b)));
    }
    waitMessage(a, b) {
      return new u((d) => {
        let e = (f) => {
          (b && !b(f)) || (this.off(a, e), d(f));
        };
        this.on(a, e);
      });
    }
    upload(a, b) {
      a = { _type: a, _message: b };
      try {
        this.websocket.sendMessage(a);
      } catch (e) {
        b = C.MAX_UPLOAD_CACHE || 50;
        var d;
        (this.uploadCache.push(a), this.uploadCache.length > b) &&
          Ma((d = this.uploadCache)).call(d, 0, 1);
        0 < this.uploadCache.length &&
          !this.uploadCacheInterval &&
          (this.uploadCacheInterval = window.setInterval(() => {
            var a;
            if (this.connectionState === ua.CONNECTED) {
              var b = Ma((a = this.uploadCache)).call(a, 0, 1)[0];
              0 === this.uploadCache.length &&
                (window.clearInterval(this.uploadCacheInterval),
                (this.uploadCacheInterval = void 0));
              this.upload(b._type, b._message);
            }
          }, C.UPLOAD_CACHE_INTERVAL || 2e3));
      }
    }
    send(a, b) {
      this.websocket.sendMessage({ _type: a, _message: b });
    }
    init(a) {
      return (
        (this.initError = void 0),
        (this.multiIpOption = void 0),
        (this.joinResponse = void 0),
        (this.reconnectToken = void 0),
        new u((b, d) => {
          this.once(P.WS_CONNECTED, () => b(this.joinResponse));
          this.once(P.WS_CLOSED, () => d(this.initError || new m(l.WS_ABORT)));
          this.connectionState = ua.CONNECTING;
          this.websocket.init(a).catch(d);
        })
      );
    }
    close(a) {
      this.pingpongTimer &&
        ((this.pingpongTimeoutCount = 0),
        window.clearInterval(this.pingpongTimer),
        (this.pingpongTimer = void 0));
      this.joinResponse = this.reconnectToken = void 0;
      this._disconnectedReason = a || "LEAVE";
      this.connectionState = ua.CLOSED;
      this.websocket.close();
    }
    async join() {
      var a;
      if (!this.joinResponse) {
        var b = ad(this, P.REQUEST_JOIN_INFO);
        b = await this.request(ha.JOIN, b);
        if (!b)
          return (
            this.emit(P.REPORT_JOIN_GATEWAY, l.TIMEOUT, this.url || ""), !1
          );
        this.joinResponse = b;
        this.reconnectToken = this.joinResponse.rejoin_token;
      }
      return (
        (this.connectionState = ua.CONNECTED),
        this.pingpongTimer && window.clearInterval(this.pingpongTimer),
        (this.pingpongTimer = window.setInterval(
          ya((a = this.handlePingPong)).call(a, this),
          3e3
        )),
        !0
      );
    }
    async rejoin() {
      var a, b;
      if (!this.reconnectToken)
        throw new m(l.UNEXPECTED_ERROR, "can not rejoin, no rejoin token");
      var d = ad(this, P.REQUEST_REJOIN_INFO);
      d.token = this.reconnectToken;
      d = await this.request(ha.REJOIN, d);
      return (
        !!d &&
        ((this.connectionState = ua.CONNECTED),
        this.pingpongTimer && window.clearInterval(this.pingpongTimer),
        (this.pingpongTimer = window.setInterval(
          ya((a = this.handlePingPong)).call(a, this),
          3e3
        )),
        d.peers &&
          r((b = d.peers)).call(b, (a) => {
            this.emit(X.ON_USER_ONLINE, { uid: a.uid });
            a.audio_mute
              ? this.emit(X.MUTE_AUDIO, { uid: a.uid })
              : this.emit(X.UNMUTE_AUDIO, { uid: a.uid });
            a.video_mute
              ? this.emit(X.MUTE_VIDEO, { uid: a.uid })
              : this.emit(X.UNMUTE_VIDEO, { uid: a.uid });
            a.audio_enable_local
              ? this.emit(X.ENABLE_LOCAL_AUDIO, { uid: a.uid })
              : this.emit(X.DISABLE_LOCAL_AUDIO, { uid: a.uid });
            a.video_enable_local
              ? this.emit(X.ENABLE_LOCAL_VIDEO, { uid: a.uid })
              : this.emit(X.DISABLE_LOCAL_VIDEO, { uid: a.uid });
            a.audio ||
              a.video ||
              this.emit(X.ON_REMOVE_STREAM, { uid: a.uid, uint_id: a.uint_id });
            a.audio &&
              this.emit(X.ON_ADD_AUDIO_STREAM, {
                uid: a.uid,
                uint_id: a.uint_id,
                audio: !0
              });
            a.video &&
              this.emit(X.ON_ADD_VIDEO_STREAM, {
                uid: a.uid,
                uint_id: a.uint_id,
                video: !0
              });
          }),
        !0)
      );
    }
    reconnect(a) {
      this.pingpongTimer &&
        ((this.pingpongTimeoutCount = 0),
        window.clearInterval(this.pingpongTimer),
        (this.pingpongTimer = void 0));
      this.websocket.reconnect(a);
    }
    handleNotification(a) {
      k.debug("[".concat(this.clientId, "] receive notification: "), a);
      a = Sh(a.code);
      "success" !== a.action &&
        ("failed" !== a.action
          ? "quit" !== a.action
            ? this.reconnect(a.action)
            : this.close()
          : k.error("[".concat(this.clientId, "] ignore error: "), a.desc));
    }
    handlePingPong() {
      if (this.websocket && "connected" === this.websocket.state) {
        0 < this.pingpongTimeoutCount && this.rttRolling.add(3e3);
        this.pingpongTimeoutCount += 1;
        var a = C.PING_PONG_TIME_OUT,
          b = v();
        this.pingpongTimeoutCount >= a &&
        (k.warning(
          "PINGPONG Timeout. Last Socket Message: ".concat(
            b - this.lastMsgTime,
            "ms"
          )
        ),
        b - this.lastMsgTime > C.WEBSOCKET_TIMEOUT_MIN)
          ? this.reconnect()
          : this.request(ha.PING, void 0, !0)
              .then(() => {
                this.pingpongTimeoutCount = 0;
                let a = v() - b;
                this.rttRolling.add(a);
                C.REPORT_STATS &&
                  this.send(ha.PING_BACK, { pingpongElapse: a });
              })
              .catch((a) => {});
      }
    }
    handleWebsocketEvents() {
      this.websocket.on(Q.ON_MESSAGE, this.onWebsocketMessage);
      this.websocket.on(Q.CLOSED, () => {
        this.connectionState = ua.CLOSED;
      });
      this.websocket.on(Q.FAILED, () => {
        this._disconnectedReason = "NETWORK_ERROR";
        this.connectionState = ua.CLOSED;
      });
      this.websocket.on(Q.RECONNECTING, (a) => {
        this.joinResponse = void 0;
        this.connectionState === ua.CONNECTED
          ? (this.connectionState = ua.RECONNECTING)
          : (this.connectionState = ua.CONNECTING);
      });
      this.websocket.on(Q.WILL_RECONNECT, (a, b) => {
        let d = ad(this, P.IS_P2P_DISCONNECTED);
        if ((console.log("rec", a, d), d && "retry" === a))
          return (
            (this.reconnectToken = void 0),
            this.emit(P.NEED_RENEW_SESSION),
            this.emit(P.DISCONNECT_P2P),
            b("tryNext")
          );
        "retry" !== a &&
          ((this.reconnectToken = void 0),
          this.emit(P.NEED_RENEW_SESSION),
          this.emit(P.DISCONNECT_P2P));
        b(a);
      });
      this.websocket.on(Q.CONNECTED, () => {
        this.openConnectionTime = v();
        this.reconnectToken
          ? this.rejoin().catch((a) => {
              var b;
              k.warning(
                n((b = "[".concat(this.clientId, "] rejoin failed "))).call(
                  b,
                  a
                )
              );
              this.reconnect("tryNext");
            })
          : this.join().catch((a) => {
              if (
                (this.emit(P.REPORT_JOIN_GATEWAY, a.code, this.url || ""),
                a instanceof m &&
                  a.code === l.UNEXPECTED_RESPONSE &&
                  a.data.code === B.ERR_NO_AUTHORIZED)
              )
                return (
                  k.warning(
                    "[".concat(
                      this.clientId,
                      "] reconnect no authorized, recover"
                    )
                  ),
                  void this.reconnect("recover")
                );
              k.error(
                "[".concat(this.clientId, "] join gateway request failed"),
                a.toString()
              );
              this.spec.forceWaitGatewayResponse
                ? this.reconnect("tryNext")
                : ((this.initError = a), this.close());
            });
      });
      this.websocket.on(Q.REQUEST_NEW_URLS, (a, b) => {
        Ha(this, P.REQUEST_RECOVER, this.multiIpOption).then(a).catch(b);
      });
    }
  }
  class Nk extends Ua {
    constructor(a, b) {
      super();
      this._hints = [];
      this._ID = b || na(8, "track-");
      this._mediaStreamTrack = this._originMediaStreamTrack = a;
    }
    getTrackId() {
      return this._ID;
    }
    getMediaStreamTrack() {
      return this._mediaStreamTrack;
    }
  }
  class qg extends Nk {
    constructor(a, b) {
      super(a, b);
      this._enabled = !0;
      this._isClosed = !1;
      this._trackProcessors = [];
      this._enabledMutex = new $b();
      this._handleTrackEnded = () => {
        this.emit(td.TRACK_ENDED);
      };
      a.addEventListener("ended", this._handleTrackEnded);
    }
    getTrackLabel() {
      return this._originMediaStreamTrack.label;
    }
    close() {
      var a;
      this.stop();
      r((a = this._trackProcessors)).call(a, (a) => a.destroy());
      this._trackProcessors = [];
      this._originMediaStreamTrack.stop();
      this._mediaStreamTrack !== this._originMediaStreamTrack &&
        this._mediaStreamTrack.stop();
      k.debug("[".concat(this.getTrackId(), "] close"));
      this.emit(L.NEED_CLOSE);
      this._isClosed = !0;
    }
    async _registerTrackProcessor(a) {
      var b;
      if (-1 === E((b = this._trackProcessors)).call(b, a)) {
        var d = this._trackProcessors[this._trackProcessors.length - 1];
        this._trackProcessors.push(a);
        a.onOutputChange = async () => {
          this._mediaStreamTrack = a.output || this._originMediaStreamTrack;
          this._updatePlayerSource();
          await Ya(this, L.NEED_REPLACE_TRACK, this._mediaStreamTrack);
        };
        d
          ? ((d.onOutputChange = async () => {
              d.output && (await a.setInput(d.output));
            }),
            await a.setInput(
              d.output || d.input || this._originMediaStreamTrack
            ))
          : await a.setInput(this._originMediaStreamTrack);
      }
    }
    _getOutputFromProcessors() {
      if (0 === this._trackProcessors.length)
        return this._originMediaStreamTrack;
      let a = this._trackProcessors[this._trackProcessors.length - 1];
      return a.output || a.input || this._originMediaStreamTrack;
    }
    async _updateOriginMediaStreamTrack(a, b) {
      a !== this._originMediaStreamTrack &&
        ((this._originMediaStreamTrack.removeEventListener(
          "ended",
          this._handleTrackEnded
        ),
        b && this._originMediaStreamTrack.stop(),
        a.addEventListener("ended", this._handleTrackEnded),
        (this._originMediaStreamTrack = a),
        0 < this._trackProcessors.length)
          ? (await this._trackProcessors[0].setInput(a),
            (this._mediaStreamTrack = this._getOutputFromProcessors()))
          : (this._mediaStreamTrack = this._originMediaStreamTrack),
        this._updatePlayerSource(),
        await Ya(this, L.NEED_REPLACE_TRACK, this._mediaStreamTrack));
    }
    _getDefaultPlayerConfig() {
      return {};
    }
  }
  class Ok extends Ua {
    constructor() {
      super();
      this.isPlayed = !1;
      this.audioOutputLevel = this.audioLevelBase = 0;
      this.audioOutputLevelCache = null;
      this.audioOutputLevelCacheMaxLength =
        C.AUDIO_SOURCE_AVG_VOLUME_DURATION /
          C.AUDIO_SOURCE_VOLUME_UPDATE_INTERVAL || 15;
      this.isDestroyed = !1;
      this._noAudioInputCount = 0;
      this.context = yc();
      this.playNode = this.context.destination;
      this.outputNode = this.context.createGain();
      fd(this.outputNode);
      this.analyserNode = this.context.createAnalyser();
    }
    get isNoAudioInput() {
      return 3 <= this.noAudioInputCount;
    }
    get noAudioInputCount() {
      return this._noAudioInputCount;
    }
    set noAudioInputCount(a) {
      3 > this._noAudioInputCount && 3 <= a
        ? this.onNoAudioInput && this.onNoAudioInput()
        : 3 <= this._noAudioInputCount &&
          0 == this._noAudioInputCount % 10 &&
          this.onNoAudioInput &&
          this.onNoAudioInput();
      this._noAudioInputCount = a;
    }
    startGetAudioBuffer(a) {
      this.audioBufferNode ||
        ((this.audioBufferNode = this.context.createScriptProcessor(a)),
        this.outputNode.connect(this.audioBufferNode),
        this.audioBufferNode.connect(this.context.destination),
        (this.audioBufferNode.onaudioprocess = (a) => {
          this.emit(gb.ON_AUDIO_BUFFER, Ol(a));
        }));
    }
    stopGetAudioBuffer() {
      this.audioBufferNode &&
        ((this.audioBufferNode.onaudioprocess = null),
        this.outputNode.disconnect(this.audioBufferNode),
        (this.audioBufferNode = void 0));
    }
    createOutputTrack() {
      if (!ea.webAudioMediaStreamDest)
        throw new m(
          l.NOT_SUPPORT,
          "your browser is not support audio processor"
        );
      return (
        (this.destNode && this.outputTrack) ||
          ((this.destNode = this.context.createMediaStreamDestination()),
          this.outputNode.connect(this.destNode),
          (this.outputTrack = this.destNode.stream.getAudioTracks()[0])),
        this.outputTrack
      );
    }
    play(a) {
      "running" !== this.context.state &&
        Za(() => {
          wd.emit("autoplay-failed");
        });
      this.isPlayed = !0;
      this.playNode = a || this.context.destination;
      this.outputNode.connect(this.playNode);
    }
    stop() {
      if (this.isPlayed)
        try {
          this.outputNode.disconnect(this.playNode);
        } catch (a) {}
      this.isPlayed = !1;
    }
    getAudioLevel() {
      return this.audioOutputLevel;
    }
    getAudioAvgLevel() {
      var a;
      null === this.audioOutputLevelCache &&
        (this.audioOutputLevelCache = [this.audioOutputLevel]);
      return (
        xe((a = this.audioOutputLevelCache)).call(a, (a, d) => a + d) /
        this.audioOutputLevelCache.length
      );
    }
    getAudioVolume() {
      return this.outputNode.gain.value;
    }
    setVolume(a) {
      this.outputNode.gain.setValueAtTime(a, this.context.currentTime);
    }
    setMute(a) {
      a
        ? (this.disconnect(),
          (this.audioLevelBase = 0),
          (this.audioOutputLevel = 0))
        : this.connect();
    }
    destroy() {
      this.disconnect();
      this.stop();
      this.isDestroyed = !0;
      this.onNoAudioInput = void 0;
    }
    disconnect() {
      this.sourceNode && this.sourceNode.disconnect();
      this.outputNode && this.outputNode.disconnect();
      window.clearInterval(this.updateAudioOutputLevelInterval);
    }
    connect() {
      var a;
      this.sourceNode && this.sourceNode.connect(this.outputNode);
      this.outputNode.connect(this.analyserNode);
      this.updateAudioOutputLevelInterval = window.setInterval(
        ya((a = this.updateAudioOutputLevel)).call(a, this),
        C.AUDIO_SOURCE_VOLUME_UPDATE_INTERVAL || 400
      );
    }
    updateAudioOutputLevel() {
      if (this.analyserNode) {
        if (this.analyserNode.getFloatTimeDomainData) {
          var a = new Float32Array(this.analyserNode.frequencyBinCount);
          this.analyserNode.getFloatTimeDomainData(a);
        } else {
          var b;
          a = new Uint8Array(this.analyserNode.frequencyBinCount);
          this.analyserNode.getByteTimeDomainData(a);
          let d = !0;
          a = new Float32Array(
            D((b = Kb(a))).call(
              b,
              (a) => (128 !== a && (d = !1), 0.0078125 * (a - 128))
            )
          );
          d ? (this.noAudioInputCount += 1) : (this.noAudioInputCount = 0);
        }
        for (b = 0; b < a.length; b += 1)
          Math.abs(a[b]) > this.audioLevelBase &&
            ((this.audioLevelBase = Math.abs(a[b])),
            1 < this.audioLevelBase && (this.audioLevelBase = 1));
        this.audioOutputLevel = this.audioLevelBase;
        this.audioLevelBase /= 4;
        null !== this.audioOutputLevelCache &&
          (this.audioOutputLevelCache.push(this.audioOutputLevel),
          this.audioOutputLevelCache.length >
            this.audioOutputLevelCacheMaxLength &&
            this.audioOutputLevelCache.shift());
      }
    }
  }
  class Pk extends Ok {
    constructor(a, b) {
      if (
        (super(),
        (this.isCurrentTrackCloned = !1),
        (this.isRemoteTrack = !1),
        (this.rebuildWebAudio = () => {
          if (!this.isNoAudioInput || this.isDestroyed)
            return (
              document.body.removeEventListener(
                "click",
                this.rebuildWebAudio,
                !0
              ),
              void k.debug(
                "rebuild web audio success, current volume",
                this.getAudioLevel()
              )
            );
          this.context.resume().then(() => k.info("resume success"));
          k.debug("rebuild web audio because of ios 12 bugs");
          this.disconnect();
          var a = this.track;
          this.track = this.track.clone();
          this.isCurrentTrackCloned
            ? a.stop()
            : (this.isCurrentTrackCloned = !0);
          a = new MediaStream([this.track]);
          this.sourceNode = this.context.createMediaStreamSource(a);
          fd(this.sourceNode);
          this.analyserNode = this.context.createAnalyser();
          let b = this.outputNode.gain.value;
          this.outputNode = this.context.createGain();
          this.outputNode.gain.setValueAtTime(b, this.context.currentTime);
          fd(this.outputNode);
          this.connect();
          this.audioElement.srcObject = a;
          this.isPlayed && this.play(this.playNode);
        }),
        "audio" !== a.kind)
      )
        throw new m(l.UNEXPECTED_ERROR);
      this.track = a;
      a = new MediaStream([this.track]);
      this.isRemoteTrack = !!b;
      this.sourceNode = this.context.createMediaStreamSource(a);
      fd(this.sourceNode);
      this.connect();
      this.audioElement = document.createElement("audio");
      this.audioElement.srcObject = a;
      a = va();
      b &&
        a.os === aa.IOS &&
        (wd.on("state-change", this.rebuildWebAudio),
        (this.onNoAudioInput = () => {
          document.body.addEventListener("click", this.rebuildWebAudio, !0);
          this.rebuildWebAudio();
          document.body.click();
        }));
    }
    get isFreeze() {
      return !1;
    }
    updateTrack(a) {
      this.sourceNode.disconnect();
      this.track = a;
      this.isCurrentTrackCloned = !1;
      a = new MediaStream([a]);
      this.sourceNode = this.context.createMediaStreamSource(a);
      fd(this.sourceNode);
      this.sourceNode.connect(this.outputNode);
      this.audioElement.srcObject = a;
    }
    destroy() {
      this.audioElement.remove();
      wd.off("state-change", this.rebuildWebAudio);
      super.destroy();
    }
  }
  class up {
    constructor() {
      this.elementMap = new Y();
      this.elementsNeedToResume = [];
      this.sinkIdMap = new Y();
      this.autoResumeAudioElement();
    }
    async setSinkID(a, b) {
      let d = this.elementMap.get(a);
      if ((this.sinkIdMap.set(a, b), d))
        try {
          await d.setSinkId(b);
        } catch (e) {
          throw new m(
            l.PERMISSION_DENIED,
            "can not set sink id: " + e.toString()
          );
        }
    }
    play(a, b) {
      if (!this.elementMap.has(b)) {
        var d = document.createElement("audio");
        d.autoplay = !0;
        d.srcObject = new MediaStream([a]);
        this.elementMap.set(b, d);
        (a = this.sinkIdMap.get(b)) &&
          d.setSinkId(a).catch((a) => {
            k.warning("[".concat(b, "] set sink id failed"), a.toString());
          });
        (a = d.play()) &&
          a.then &&
          a.catch((a) => {
            k.warning("audio element play warning", a.toString());
            this.elementMap.has(b) &&
              "NotAllowedError" === a.name &&
              (k.warning("detected audio element autoplay failed"),
              this.elementsNeedToResume.push(d),
              Za(() => {
                this.onAutoplayFailed && this.onAutoplayFailed();
              }));
          });
      }
    }
    updateTrack(a, b) {
      (a = this.elementMap.get(a)) && (a.srcObject = new MediaStream([b]));
    }
    isPlaying(a) {
      return this.elementMap.has(a);
    }
    setVolume(a, b) {
      (a = this.elementMap.get(a)) &&
        ((b = Math.max(0, Math.min(100, b))), (a.volume = b / 100));
    }
    stop(a) {
      var b, d;
      let e = this.elementMap.get(a);
      if ((this.sinkIdMap.delete(a), e)) {
        var f = E((b = this.elementsNeedToResume)).call(b, e);
        Ma((d = this.elementsNeedToResume)).call(d, f, 1);
        e.srcObject = null;
        e.remove();
        this.elementMap.delete(a);
      }
    }
    autoResumeAudioElement() {
      let a = () => {
        var a;
        r((a = this.elementsNeedToResume)).call(a, (a) => {
          a.play()
            .then((a) => {
              k.debug("Auto resume audio element success");
            })
            .catch((a) => {
              k.warning("Auto resume audio element failed!", a);
            });
        });
        this.elementsNeedToResume = [];
      };
      Hl().then(() => {
        document.body.addEventListener("touchstart", a, !0);
        document.body.addEventListener("mousedown", a, !0);
      });
    }
  }
  let jb = new up();
  class Va extends qg {
    constructor(a, b, d) {
      super(a, d);
      this.trackMediaType = "audio";
      this._enabled = !0;
      this._useAudioElement = !1;
      this._encoderConfig = b;
      this._source = new Pk(a);
      ea.webAudioWithAEC || (this._useAudioElement = !0);
    }
    get isPlaying() {
      return this._useAudioElement
        ? jb.isPlaying(this.getTrackId())
        : this._source.isPlayed;
    }
    setVolume(a) {
      W(a, "volume", 0, 1e3);
      let b = t.reportApiInvoke(
        null,
        {
          tag: z.TRACER,
          name: A.LOCAL_AUDIO_TRACK_SET_VOLUME,
          options: [this.getTrackId(), a]
        },
        300
      );
      this._source.setVolume(a / 100);
      try {
        let a = this._source.createOutputTrack();
        this._mediaStreamTrack !== a &&
          ((this._mediaStreamTrack = a),
          Ya(this, L.NEED_REPLACE_TRACK, this._mediaStreamTrack)
            .then(() => {
              k.debug(
                "[".concat(
                  this.getTrackId(),
                  "] replace web audio track success"
                )
              );
            })
            .catch((a) => {
              k.warning(
                "[".concat(
                  this.getTrackId(),
                  "] replace web audio track failed"
                ),
                a
              );
            }));
      } catch (d) {}
      b.onSuccess();
    }
    getVolumeLevel() {
      return this._source.getAudioLevel();
    }
    async setPlaybackDevice(a) {
      let b = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.REMOTE_AUDIO_SET_OUTPUT_DEVICE,
        options: [this.getTrackId(), a]
      });
      if (!this._useAudioElement)
        throw new m(
          l.NOT_SUPPORT,
          "your browser does not support setting the audio output device"
        );
      try {
        await jb.setSinkID(this.getTrackId(), a);
      } catch (d) {
        throw (b.onError(d), d);
      }
      b.onSuccess();
    }
    async setEnabled(a) {
      var b;
      if (a !== this._enabled) {
        k.info("[".concat(this.getTrackId(), "] start setEnabled"), a);
        var d = await this._enabledMutex.lock();
        if (!a) {
          this._originMediaStreamTrack.enabled = !1;
          try {
            await Ya(this, L.NEED_REMOVE_TRACK, this);
          } catch (e) {
            throw (
              (k.error(
                "[".concat(this.getTrackId(), "] setEnabled to false error"),
                e.toString()
              ),
              d(),
              e)
            );
          }
          return (this._enabled = !1), d();
        }
        this._originMediaStreamTrack.enabled = !0;
        try {
          await Ya(this, L.NEED_ADD_TRACK, this);
        } catch (e) {
          throw (
            (k.error(
              "[".concat(this.getTrackId(), "] setEnabled to true error"),
              e.toString()
            ),
            d(),
            e)
          );
        }
        k.info(
          n((b = "[".concat(this.getTrackId(), "] setEnabled to "))).call(
            b,
            a,
            " success"
          )
        );
        this._enabled = !0;
        d();
      }
    }
    getStats() {
      cd(() => {
        k.warning(
          "[deprecated] LocalAudioTrack.getStats will be removed in the future, use AgoraRTCClient.getLocalAudioStats instead"
        );
      }, "localAudioTrackGetStatsWarning");
      return ec(this, L.GET_STATS) || $e({}, se);
    }
    setAudioFrameCallback(a, b = 4096) {
      if (!a)
        return (
          this._source.removeAllListeners(gb.ON_AUDIO_BUFFER),
          void this._source.stopGetAudioBuffer()
        );
      this._source.startGetAudioBuffer(b);
      this._source.removeAllListeners(gb.ON_AUDIO_BUFFER);
      this._source.on(gb.ON_AUDIO_BUFFER, (b) => a(b));
    }
    play() {
      let a = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.LOCAL_AUDIO_TRACK_PLAY,
        options: [this.getTrackId()]
      });
      k.debug("[".concat(this.getTrackId(), "] start audio playback"));
      this._useAudioElement
        ? (k.debug(
            "[".concat(this.getTrackId(), "] start audio playback in element")
          ),
          jb.play(this._mediaStreamTrack, this.getTrackId()))
        : this._source.play();
      a.onSuccess();
    }
    stop() {
      let a = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.LOCAL_AUDIO_TRACK_STOP,
        options: [this.getTrackId()]
      });
      k.debug("[".concat(this.getTrackId(), "] stop audio playback"));
      this._useAudioElement ? jb.stop(this.getTrackId()) : this._source.stop();
      a.onSuccess();
    }
    close() {
      super.close();
      this._source.destroy();
    }
    _updatePlayerSource() {
      k.debug(
        "[track-".concat(this.getTrackId(), "] update player source track")
      );
      this._source.updateTrack(this._mediaStreamTrack);
      this._useAudioElement &&
        jb.updateTrack(this.getTrackId(), this._mediaStreamTrack);
    }
    async _updateOriginMediaStreamTrack(a, b) {
      this._originMediaStreamTrack !== a &&
        (this._originMediaStreamTrack.removeEventListener(
          "ended",
          this._handleTrackEnded
        ),
        a.addEventListener("ended", this._handleTrackEnded),
        b && this._originMediaStreamTrack.stop(),
        (this._originMediaStreamTrack = a),
        this._source.updateTrack(this._originMediaStreamTrack),
        this._mediaStreamTrack !== this._source.outputTrack &&
          ((this._mediaStreamTrack = this._originMediaStreamTrack),
          this._updatePlayerSource(),
          await Ya(this, L.NEED_REPLACE_TRACK, this._mediaStreamTrack)));
    }
  }
  class rg extends Va {
    constructor(a, b, d, e) {
      super(a, b.encoderConfig ? Ed(b.encoderConfig) : {}, e);
      this._deviceName = "default";
      this._enabled = !0;
      this._config = b;
      this._constraints = d;
      this._deviceName = a.label;
    }
    async setDevice(a) {
      var b, d;
      let e = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.MIC_AUDIO_TRACK_SET_DEVICE,
        options: [this.getTrackId(), a]
      });
      k.info(
        n((b = "[".concat(this.getTrackId, "] start set device to "))).call(
          b,
          a
        )
      );
      try {
        await ub.getDeviceById(a);
        b = {};
        b.audio = $e({}, this._constraints);
        b.audio.deviceId = { exact: a };
        this._originMediaStreamTrack.stop();
        let d = null;
        try {
          d = await Bb(b, this.getTrackId());
        } catch (g) {
          throw (
            (k.error(
              "[track-".concat(this.getTrackId(), "] setDevice failed"),
              g.toString()
            ),
            (d = await Bb({ video: this._constraints }, this.getTrackId())),
            await this._updateOriginMediaStreamTrack(d.getAudioTracks()[0], !1),
            g)
          );
        }
        await this._updateOriginMediaStreamTrack(d.getAudioTracks()[0], !1);
        this._config.microphoneId = a;
        this._constraints.deviceId = { exact: a };
      } catch (f) {
        throw (
          (e.onError(f),
          k.error(
            "[track-".concat(this.getTrackId(), "] setDevice error"),
            f.toString()
          ),
          f)
        );
      }
      e.onSuccess();
      k.info(
        n((d = "[".concat(this.getTrackId, "] set device to "))).call(
          d,
          a,
          " success"
        )
      );
    }
    async setEnabled(a, b) {
      if (b)
        return (
          k.debug(
            "[".concat(
              this.getTrackId,
              "] setEnabled false (do not close microphone)"
            )
          ),
          await super.setEnabled(a)
        );
      if (a !== this._enabled) {
        k.info("[".concat(this.getTrackId(), "] start setEnabled"), a);
        b = await this._enabledMutex.lock();
        if (!a) {
          this._originMediaStreamTrack.onended = null;
          this._originMediaStreamTrack.stop();
          this._enabled = !1;
          try {
            await Ya(this, L.NEED_REMOVE_TRACK, this);
          } catch (e) {
            throw (
              (k.error(
                "[".concat(this.getTrackId(), "] setEnabled false failed"),
                e.toString()
              ),
              b(),
              e)
            );
          }
          return void b();
        }
        a = $e({}, this._constraints);
        var d = ub.searchDeviceIdByName(this._deviceName);
        d && !a.deviceId && (a.deviceId = d);
        try {
          let a = await Bb({ audio: this._constraints }, this.getTrackId());
          await this._updateOriginMediaStreamTrack(a.getAudioTracks()[0], !1);
          await Ya(this, L.NEED_ADD_TRACK, this);
        } catch (e) {
          throw (
            (b(),
            k.error(
              "[".concat(this.getTrackId(), "] setEnabled true failed"),
              e.toString()
            ),
            e)
          );
        }
        this._enabled = !0;
        k.info("[".concat(this.getTrackId(), "] setEnabled success"));
        b();
      }
    }
  }
  class vp extends Va {
    constructor(a, b, d, e) {
      super(b.createOutputTrack(), d, e);
      this.source = a;
      this._bufferSource = b;
      this._bufferSource.on(gb.AUDIO_SOURCE_STATE_CHANGE, (a) => {
        this.emit(td.SOURCE_STATE_CHANGE, a);
      });
      try {
        this._mediaStreamTrack = this._source.createOutputTrack();
      } catch (f) {}
    }
    get currentState() {
      return this._bufferSource.currentState;
    }
    get duration() {
      return this._bufferSource.duration;
    }
    getCurrentTime() {
      return this._bufferSource.currentTime;
    }
    startProcessAudioBuffer(a) {
      let b = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.BUFFER_AUDIO_TRACK_START,
        options: [this.getTrackId(), a, this.duration]
      });
      a && this._bufferSource.updateOptions(a);
      this._bufferSource.startProcessAudioBuffer();
      b.onSuccess();
    }
    pauseProcessAudioBuffer() {
      let a = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.BUFFER_AUDIO_TRACK_PAUSE,
        options: [this.getTrackId()]
      });
      this._bufferSource.pauseProcessAudioBuffer();
      a.onSuccess();
    }
    seekAudioBuffer(a) {
      let b = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.BUFFER_AUDIO_TRACK_SEEK,
        options: [this.getTrackId()]
      });
      this._bufferSource.seekAudioBuffer(a);
      b.onSuccess();
    }
    resumeProcessAudioBuffer() {
      let a = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.BUFFER_AUDIO_TRACK_RESUME,
        options: [this.getTrackId()]
      });
      this._bufferSource.resumeProcessAudioBuffer();
      a.onSuccess();
    }
    stopProcessAudioBuffer() {
      let a = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.BUFFER_AUDIO_TRACK_STOP,
        options: [this.getTrackId()]
      });
      this._bufferSource.stopProcessAudioBuffer();
      a.onSuccess();
    }
  }
  class Rc extends Va {
    constructor() {
      let a = yc().createMediaStreamDestination();
      super(a.stream.getAudioTracks()[0]);
      try {
        this._mediaStreamTrack = this._source.createOutputTrack();
      } catch (b) {}
      this.destNode = a;
      this.trackList = [];
    }
    hasAudioTrack(a) {
      var b;
      return -1 !== E((b = this.trackList)).call(b, a);
    }
    addAudioTrack(a) {
      var b;
      -1 === E((b = this.trackList)).call(b, a)
        ? (k.debug("add ".concat(a.getTrackId(), " to mixing track")),
          a._source.outputNode.connect(this.destNode),
          this.trackList.push(a),
          this.updateEncoderConfig())
        : k.warning("track is already added");
    }
    removeAudioTrack(a) {
      var b;
      if (-1 !== E((b = this.trackList)).call(b, a)) {
        k.debug("remove ".concat(a.getTrackId(), " from mixing track"));
        try {
          a._source.outputNode.disconnect(this.destNode);
        } catch (d) {}
        bd(this.trackList, a);
        this.updateEncoderConfig();
      }
    }
    updateEncoderConfig() {
      var a;
      let b = {};
      r((a = this.trackList)).call(a, (a) => {
        a._encoderConfig &&
          ((a._encoderConfig.bitrate || 0) > (b.bitrate || 0) &&
            (b.bitrate = a._encoderConfig.bitrate),
          (a._encoderConfig.sampleRate || 0) > (b.sampleRate || 0) &&
            (b.sampleRate = a._encoderConfig.sampleRate),
          (a._encoderConfig.sampleSize || 0) > (b.sampleSize || 0) &&
            (b.sampleSize = a._encoderConfig.sampleSize),
          a._encoderConfig.stereo && (b.stereo = !0));
      });
      this._encoderConfig = b;
    }
  }
  let sg = new Y();
  class wp extends Ua {
    constructor(a) {
      super();
      this.inChannelInfo = { joinAt: null, duration: 0 };
      this._state = "DISCONNECTED";
      this.needToSendUnpubUnsub = new Y();
      this.hasChangeBGPAddress = this.isSignalRecover = !1;
      this.joinGatewayStartTime = 0;
      this.clientId = a.clientId;
      this.spec = a;
      this.signal = new tp(af({}, a, { retryConfig: a.websocketRetryConfig }));
      this._statsCollector = a.statsCollector;
      this.role = a.role || "audience";
      this.handleSignalEvents();
    }
    get state() {
      return this._state;
    }
    set state(a) {
      if (a !== this._state) {
        var b = this._state;
        this._state = a;
        "DISCONNECTED" === a && this._disconnectedReason
          ? this.emit(
              Ea.CONNECTION_STATE_CHANGE,
              a,
              b,
              this._disconnectedReason
            )
          : this.emit(Ea.CONNECTION_STATE_CHANGE, a, b);
      }
    }
    async join(a, b) {
      var d;
      "disabled" !== a.cloudProxyServer && (this.hasChangeBGPAddress = !0);
      let e = v();
      var f = sg.get(a.cname);
      if ((f || ((f = new Y()), sg.set(a.cname, f)), f.has(a.uid)))
        throw (
          ((f = new m(l.UID_CONFLICT)),
          t.joinGateway(a.sid, {
            lts: e,
            succ: !1,
            ec: f.code,
            addr: null,
            uid: a.uid,
            cid: a.cid
          }),
          f)
        );
      f.set(a.uid, !0);
      this.joinInfo = a;
      this.key = b;
      b = D((d = a.gatewayAddrs)).call(d, (a) => "wss://".concat(a));
      d = 0;
      this.joinGatewayStartTime = e;
      try {
        d = (await this.signal.init(b)).uid;
      } catch (g) {
        throw (
          (k.error(
            "[".concat(this.clientId, "] User join failed"),
            g.toString()
          ),
          t.joinGateway(a.sid, {
            lts: e,
            succ: !1,
            ec: g.code === l.UNEXPECTED_ERROR ? g.message : g.code,
            addr: this.signal.url,
            uid: a.uid,
            cid: a.cid
          }),
          f.delete(a.uid),
          this.signal.close(),
          g)
        );
      }
      return (
        (this.state = "CONNECTED"),
        (this.inChannelInfo.joinAt = v()),
        k.debug("[".concat(this.clientId, "] Connected to gateway server")),
        (this.trafficStatsInterval = window.setInterval(() => {
          this.updateTrafficStats().catch((a) => {
            k.warning(
              "[".concat(this.clientId, "] get traffic stats error"),
              a.toString()
            );
          });
        }, 3e3)),
        (this.networkQualityInterval = window.setInterval(() => {
          "CONNECTED" === this.state && this._statsCollector.trafficStats
            ? this.emit(Ea.NETWORK_QUALITY, {
                uplinkNetworkQuality: Gh(
                  this._statsCollector.trafficStats.B_unq
                ),
                downlinkNetworkQuality: Gh(
                  this._statsCollector.trafficStats.B_dnq
                )
              })
            : this.emit(Ea.NETWORK_QUALITY, {
                uplinkNetworkQuality: 0,
                downlinkNetworkQuality: 0
              });
        }, 2e3)),
        d
      );
    }
    async leave(a = !1) {
      if ("DISCONNECTED" !== this.state) {
        this.state = "DISCONNECTING";
        try {
          if (!a && this.signal.connectionState === ua.CONNECTED) {
            var b = this.signal.request(ha.LEAVE, void 0, !0);
            await (3e3 === 1 / 0 ? b : u.race([b, Il(3e3)]));
          }
        } catch (d) {
          k.warning(
            "[".concat(this.clientId, "] leave request failed, ignore"),
            d
          );
        }
        this.signal.close();
        this.reset();
        this.state = "DISCONNECTED";
      }
    }
    async publish(a, b) {
      if (!this.joinInfo)
        throw new m(l.UNEXPECTED_ERROR, "publish no joinInfo");
      let d = a.getUserId(),
        e = a.videoTrack ? xl(a.videoTrack) : {};
      if (
        (a.on(G.NEED_ANSWER, (f, g, h) => {
          var q;
          let n = {
            state: "offer",
            stream_type: b,
            p2p_id: a.pc.ID,
            sdp: w(f),
            audio: !!a.audioTrack,
            video: !!a.videoTrack,
            screen:
              a.videoTrack &&
              -1 !== E((q = a.videoTrack._hints)).call(q, ib.SCREEN_TRACK),
            attributes: e,
            dtx: a.audioTrack instanceof rg && a.audioTrack._config.DTX,
            hq: !1,
            lq: !1,
            stereo: !1,
            speech: !1,
            mode: this.spec.mode,
            codec: this.spec.codec,
            extend: C.PUB_EXTEND
          };
          this.signal
            .request(ha.PUBLISH, n, !0)
            .then((a) => {
              d && this.needToSendUnpubUnsub.set(d, !0);
              g(JSON.parse(a.sdp));
            })
            .catch((b) => {
              if (
                f.retry &&
                b.data &&
                b.data.code === B.ERR_PUBLISH_REQUEST_INVALID
              )
                return (
                  k.warning(
                    "[".concat(
                      this.clientId,
                      "] receiver publish error code, retry"
                    ),
                    b.toString()
                  ),
                  Ha(a, G.NEED_UNPUB).then(() => {
                    f.retry = !1;
                    Ha(a, G.NEED_ANSWER, f).then(g).catch(h);
                  })
                );
              b.code !== l.WS_ABORT && h(b);
            });
        }),
        a.on(G.NEED_RENEGOTIATE, (d, e, h) => {
          this.signal
            .request(
              ha.PUBLISH,
              { state: "negotiation", stream_type: b, p2p_id: a.pc.ID, sdp: d },
              !0
            )
            .then((a) => {
              e(JSON.parse(a.sdp));
            })
            .catch((a) => {
              a.code !== l.WS_ABORT && h(a);
            });
        }),
        a.on(G.NEED_UNPUB, (e) =>
          d && !this.needToSendUnpubUnsub.has(d)
            ? e(!1)
            : "RECONNECTING" === this.state
            ? e(!0)
            : void this.signal
                .request(
                  ha.UNPUBLISH,
                  { stream_id: a.getUserId(), stream_type: b },
                  !0
                )
                .then(() => e(!1))
                .catch((a) => {
                  k.warning("unpublish warning: ", a);
                  e(!0);
                })
        ),
        a.on(G.NEED_UPLOAD, (a, d) => {
          this.signal.upload(a, { stream_type: b, stats: d });
        }),
        a.on(G.NEED_SIGNAL_RTT, (a) => {
          a(this.signal.rtt);
        }),
        "RECONNECTING" !== this.state)
      ) {
        if ("CONNECTED" !== this.state)
          return new m(
            l.INVALID_OPERATION,
            "can not publish when connection state is ".concat(this.state)
          ).throw();
        await a.startP2PConnection();
      } else a.readyToReconnectPC();
    }
    async subscribe(a) {
      if (!this.joinInfo)
        throw new m(l.UNEXPECTED_ERROR, "subscribe no joinInfo");
      let b = a.getUserId();
      if (
        (a.on(G.NEED_ANSWER, (d, e, f) => {
          var g = a.subscribeOptions;
          g = {
            stream_id: a.getUserId(),
            audio: !!g.audio,
            video: !!g.video,
            mode: this.spec.mode,
            codec: this.spec.codec,
            p2p_id: a.pc.ID,
            sdp: w(d),
            tcc: !!C.SUBSCRIBE_TCC,
            extend: C.SUB_EXTEND
          };
          this.signal
            .request(ha.SUBSCRIBE, g, !0)
            .then((a) => {
              this.needToSendUnpubUnsub.set(b, !0);
              e(JSON.parse(a.sdp));
            })
            .catch((b) => {
              if (
                d.retry &&
                b.data &&
                b.data.code === B.ERR_SUBSCRIBE_REQUEST_INVALID
              )
                return (
                  k.warning(
                    "[".concat(
                      this.clientId,
                      "] receiver subscribe error code, retry"
                    ),
                    b.toString()
                  ),
                  Ha(a, G.NEED_UNSUB).then(() => {
                    d.retry = !1;
                    Ha(a, G.NEED_ANSWER, d).then(e).catch(f);
                  })
                );
              b.code !== l.WS_ABORT && f(b);
            });
        }),
        a.on(G.NEED_UNSUB, (d) =>
          this.needToSendUnpubUnsub.has(b)
            ? "RECONNECTING" === this.state
              ? d(!0)
              : void this.signal
                  .request(ha.UNSUBSCRIBE, { stream_id: a.getUserId() }, !0)
                  .then(() => d(!1))
                  .catch((a) => {
                    k.warning("unsubscribe warning", a);
                    d(!0);
                  })
            : d(!1)
        ),
        a.on(G.NEED_UPLOAD, (b, e) => {
          this.signal.upload(b, { stream_id: a.getUserId(), stats: e });
        }),
        a.on(G.NEED_SIGNAL_RTT, (a) => {
          a(this.signal.rtt);
        }),
        "RECONNECTING" !== this.state)
      ) {
        if ("CONNECTED" !== this.state)
          return new m(
            l.INVALID_OPERATION,
            "can not subscribe when connection state is ".concat(this.state)
          ).throw();
        await a.startP2PConnection();
      } else a.readyToReconnectPC();
    }
    async subscribeChange(a, b) {
      var d, e;
      if (!this.joinInfo)
        throw new m(l.UNEXPECTED_ERROR, "subscribe no joinInfo");
      if ((await a.setSubscribeOptions(b), "RECONNECTING" !== this.state)) {
        if ("CONNECTED" !== this.state)
          return new m(
            l.INVALID_OPERATION,
            "can not subscribe change when connection state is ".concat(
              this.state
            )
          ).throw();
        k.debug(
          n(
            (d = n(
              (e = "[".concat(
                this.clientId,
                "] send subscribe change, audio: "
              ))
            ).call(e, b.audio, ", video: "))
          ).call(d, b.video)
        );
        await this.signal.request(
          ha.SUBSCRIBE_CHANGE,
          { stream_id: a.getUserId(), audio: !!b.audio, video: !!b.video },
          !0
        );
      }
    }
    async unsubscribe(a) {
      await a.closeP2PConnection();
    }
    getGatewayInfo() {
      return this.signal.request(ha.GATEWAY_INFO);
    }
    renewToken(a) {
      return this.signal.request(ha.RENEW_TOKEN, { token: a });
    }
    async setClientRole(a) {
      a !== this.role &&
        ("CONNECTED" === this.state
          ? (await this.signal.request(ha.SET_CLIENT_ROLE, { role: a }),
            (this.role = a))
          : (this.role = a));
    }
    async setRemoteVideoStreamType(a, b) {
      await this.signal.request(ha.SWITCH_VIDEO_STREAM, {
        stream_id: a,
        stream_type: b
      });
    }
    async setStreamFallbackOption(a, b) {
      await this.signal.request(ha.SET_FALLBACK_OPTION, {
        stream_id: a,
        fallback_type: b
      });
    }
    getInChannelInfo() {
      return (
        this.inChannelInfo.joinAt &&
          (this.inChannelInfo.duration = v() - this.inChannelInfo.joinAt),
        af({}, this.inChannelInfo)
      );
    }
    async getGatewayVersion() {
      return (await this.signal.request(ha.GATEWAY_INFO)).version;
    }
    reset() {
      if (
        (this.inChannelInfo.joinAt &&
          ((this.inChannelInfo.duration = v() - this.inChannelInfo.joinAt),
          (this.inChannelInfo.joinAt = null)),
        this.trafficStatsInterval &&
          (window.clearInterval(this.trafficStatsInterval),
          (this.trafficStatsInterval = void 0)),
        this.joinInfo)
      ) {
        let a = sg.get(this.joinInfo.cname);
        a && a.delete(this.joinInfo.uid);
      }
      this.needToSendUnpubUnsub = new Y();
      this.key = this.joinInfo = void 0;
      this.networkQualityInterval &&
        (window.clearInterval(this.networkQualityInterval),
        (this.networkQualityInterval = void 0));
    }
    updateTurnConfigFromSignal() {
      if (this.joinInfo) {
        var a;
        (a = (a = (this.signal.url || "").match(/wss:\/\/([^:]+):(\d+)/))
          ? {
              username: Db.username,
              password: Db.password,
              turnServerURL: a[1],
              tcpport: S(a[2]) + 30,
              udpport: S(a[2]) + 30,
              forceturn: !1
            }
          : null) &&
          "off" !== this.joinInfo.turnServer.mode &&
          this.joinInfo.turnServer.servers.push(
            af({}, Db, {
              turnServerURL: a.turnServerURL,
              tcpport: a.tcpport,
              udpport: a.udpport
            })
          );
      }
    }
    async updateTrafficStats() {
      var a;
      if ("CONNECTED" === this.state) {
        var b = await this.signal.request(ha.TRAFFIC_STATS, void 0, !0);
        b.timestamp = v();
        r((a = b.peer_delay)).call(a, (a) => {
          var b;
          let d =
            this._statsCollector.trafficStats &&
            R((b = this._statsCollector.trafficStats.peer_delay)).call(
              b,
              (b) => b.peer_uid === a.peer_uid
            );
          d &&
            d.B_st !== a.B_st &&
            Za(() => {
              this.emit(Ea.STREAM_TYPE_CHANGE, a.peer_uid, a.B_st);
            });
        });
        this._statsCollector.updateTrafficStats(b);
      }
    }
    getJoinMessage() {
      if (!this.joinInfo || !this.key)
        throw new m(
          l.UNEXPECTED_ERROR,
          "can not generate join message, no join info"
        );
      let a = Wa({}, this.joinInfo.apResponse),
        b = {
          session_id: this.joinInfo.sid,
          app_id: this.joinInfo.appId,
          channel_key: this.key,
          channel_name: this.joinInfo.cname,
          sdk_version: $a,
          browser: navigator.userAgent,
          process_id: C.PROCESS_ID,
          mode: this.spec.mode,
          codec: this.spec.codec,
          role: this.role,
          has_changed_gateway: this.hasChangeBGPAddress,
          ap_response: a,
          extends: C.JOIN_EXTEND,
          details: { 6: this.joinInfo.stringUid },
          features: { rejoin: !0 },
          optionalInfo: this.joinInfo.optionalInfo
        };
      return (
        this.joinInfo.stringUid && (b.string_uid = this.joinInfo.stringUid),
        this.joinInfo.aesmode &&
          this.joinInfo.aespassword &&
          ((b.aes_mode = this.joinInfo.aesmode),
          (b.aes_secret = this.joinInfo.aespassword)),
        a.addresses[this.signal.websocket.currentURLIndex] &&
          ((b.ap_response.ticket =
            a.addresses[this.signal.websocket.currentURLIndex].ticket),
          delete a.addresses),
        b
      );
    }
    getRejoinMessage() {
      if (!this.joinInfo)
        throw new m(
          l.UNEXPECTED_ERROR,
          "can not generate rejoin message, no join info"
        );
      return {
        session_id: this.joinInfo.sid,
        channel_name: this.joinInfo.cname,
        cid: this.joinInfo.cid,
        uid: this.joinInfo.uid,
        vid: Number(this.joinInfo.vid)
      };
    }
    handleSignalEvents() {
      this.signal.on(P.WS_RECONNECTING, () => {
        this.joinInfo &&
          ((this.state = "RECONNECTING"),
          t.sessionInit(this.joinInfo.sid, {
            lts: new Date().getTime(),
            extend: this.isSignalRecover ? { recover: !0 } : { rejoin: !0 },
            cname: this.joinInfo.cname,
            appid: this.joinInfo.appId,
            mode: this.spec.mode
          }),
          (this.isSignalRecover = !1),
          (this.joinGatewayStartTime = v()));
      });
      this.signal.on(P.WS_CLOSED, (a) => {
        this.reset();
        this._disconnectedReason = a;
        this.state = "DISCONNECTED";
      });
      this.signal.on(P.WS_CONNECTED, () => {
        this.updateTurnConfigFromSignal();
        this.state = "CONNECTED";
        this.joinInfo &&
          t.joinGateway(this.joinInfo.sid, {
            lts: this.joinGatewayStartTime,
            succ: !0,
            ec: null,
            vid: this.joinInfo.vid,
            addr: this.signal.url,
            uid: this.joinInfo.uid,
            cid: this.joinInfo.cid
          });
      });
      this.signal.on(X.ON_UPLINK_STATS, (a) => {
        this._statsCollector.updateUplinkStats(a);
      });
      this.signal.on(P.REQUEST_RECOVER, (a, b, d) => {
        if (!this.joinInfo)
          return d(
            new m(l.UNEXPECTED_ERROR, "gateway: can not recover, no join info")
          );
        a && ((this.joinInfo.multiIP = a), (this.hasChangeBGPAddress = !0));
        this.isSignalRecover = !0;
        Ha(this, Ea.REQUEST_NEW_GATEWAY_LIST).then(b).catch(d);
      });
      this.signal.on(P.REQUEST_JOIN_INFO, (a) => {
        a(this.getJoinMessage());
      });
      this.signal.on(P.REQUEST_REJOIN_INFO, (a) => {
        a(this.getRejoinMessage());
      });
      this.signal.on(P.REPORT_JOIN_GATEWAY, (a, b) => {
        this.joinInfo &&
          t.joinGateway(this.joinInfo.sid, {
            lts: this.joinGatewayStartTime,
            succ: !1,
            ec: a,
            addr: b,
            uid: this.joinInfo.uid,
            cid: this.joinInfo.cid
          });
      });
      this.signal.on(P.IS_P2P_DISCONNECTED, (a) => {
        a(ad(this, Ea.IS_P2P_DISCONNECTED));
      });
      this.signal.on(P.DISCONNECT_P2P, () => {
        this.needToSendUnpubUnsub = new Y();
        this.emit(Ea.DISCONNECT_P2P);
      });
      this.signal.on(P.NEED_RENEW_SESSION, () => {
        this.emit(Ea.NEED_RENEW_SESSION);
      });
    }
  }
  class xp {
    constructor(a) {
      this.client = a;
    }
    updateConfig(a, b) {
      if (b) {
        null != b.uploadLog &&
          (vc("UPLOAD_LOG", b.uploadLog),
          t
            .reportApiInvoke(this.client._sessionId || null, {
              name: A.SET_CONFIG_DISTRIBUTE,
              options: { feature: "uploadLog", value: b.uploadLog }
            })
            .onSuccess());
        null != b.dualStream &&
          ((this.client._isDualStreamEnabled = b.dualStream),
          t
            .reportApiInvoke(this.client._sessionId || null, {
              name: A.SET_CONFIG_DISTRIBUTE,
              options: { feature: "dualStream", value: b.dualStream }
            })
            .onSuccess());
        null == b.streamFallbackOptions ||
          (this.client._defaultStreamFallbackType = b.streamFallbackOptions);
        try {
          var d, e;
          k.debug(
            n((d = "[".concat(a, "] setParameter in distribution: "))).call(
              d,
              w(b)
            )
          );
          D((e = V(b))).call(e, (a) => vc(a, b[a]));
        } catch (g) {
          var f;
          k.debug(
            n(
              (f = "[".concat(a, "] setParameter in distribution failed: "))
            ).call(f, w(b))
          );
        }
      }
    }
  }
  let bf = 1,
    cf = 1;
  var tg = (function () {
      function a(a) {
        this.input = [];
        this.size = a;
      }
      return (
        (a.prototype.add = function (a) {
          this.input.push(a);
          this.input.length > this.size && this.input.splice(0, 1);
        }),
        (a.prototype.diffMean = function () {
          return 0 === this.input.length
            ? 0
            : (this.input[this.input.length - 1] - this.input[0]) /
                this.input.length;
        }),
        a
      );
    })(),
    ai = function (a, b) {
      return (ai =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (a, b) {
            a.__proto__ = b;
          }) ||
        function (a, b) {
          for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
        })(a, b);
    },
    ug = function () {
      return (ug =
        Object.assign ||
        function (a) {
          for (var b, d = 1, e = arguments.length; d < e; d++)
            for (var f in (b = arguments[d]))
              Object.prototype.hasOwnProperty.call(b, f) && (a[f] = b[f]);
          return a;
        }).apply(this, arguments);
    },
    xd = {
      timestamp: 0,
      bitrate: { actualEncoded: 0, transmit: 0 },
      sendPacketLossRate: 0,
      recvPacketLossRate: 0,
      videoRecv: [],
      videoSend: [],
      audioRecv: [],
      audioSend: []
    },
    Qk = {
      firsCount: 0,
      nacksCount: 0,
      plisCount: 0,
      framesDecodeCount: 0,
      framesDecodeInterval: 0,
      framesDecodeFreezeTime: 0,
      decodeFrameRate: 0,
      bytes: 0,
      packetsLost: 0,
      packetLostRate: 0,
      packets: 0,
      ssrc: 0
    },
    Rk = {
      firsCount: 0,
      nacksCount: 0,
      plisCount: 0,
      frameCount: 0,
      bytes: 0,
      packets: 0,
      packetsLost: 0,
      packetLostRate: 0,
      ssrc: 0,
      rttMs: 0
    },
    Sk = {
      bytes: 0,
      packets: 0,
      packetsLost: 0,
      packetLostRate: 0,
      ssrc: 0,
      rttMs: 0
    },
    Tk = {
      jitterBufferMs: 0,
      jitterMs: 0,
      bytes: 0,
      packetsLost: 0,
      packetLostRate: 0,
      packets: 0,
      ssrc: 0,
      receivedFrames: 0,
      droppedFrames: 0
    },
    vg = (function () {
      function a(a, d) {
        var b = this;
        this.stats = cb(xd);
        this.isFirstAudioDecoded =
          this.isFirstAudioReceived =
          this.isFirstVideoDecoded =
          this.isFirstVideoReceived =
            !1;
        this.lossRateWindowStats = [];
        this.pc = a;
        this.options = d;
        this.intervalTimer = window.setInterval(function () {
          return ef(b, void 0, void 0, function () {
            return ff(this, function (a) {
              return this.updateStats(), [2];
            });
          });
        }, this.options.updateInterval);
      }
      return (
        (a.prototype.getStats = function () {
          return this.stats;
        }),
        (a.prototype.destroy = function () {
          window.clearInterval(this.intervalTimer);
        }),
        (a.prototype.calcLossRate = function (a) {
          var b = this;
          this.lossRateWindowStats.push(a);
          this.lossRateWindowStats.length > this.options.lossRateInterval &&
            this.lossRateWindowStats.splice(0, 1);
          for (
            var e = this.lossRateWindowStats.length,
              f = 0,
              g = 0,
              h = 0,
              k = 0,
              l = function (d) {
                a[d].forEach(function (a, q) {
                  if (
                    b.lossRateWindowStats[e - 1][d][q] &&
                    b.lossRateWindowStats[0][d][q]
                  ) {
                    var l =
                      b.lossRateWindowStats[e - 1][d][q].packets -
                      b.lossRateWindowStats[0][d][q].packets;
                    q =
                      b.lossRateWindowStats[e - 1][d][q].packetsLost -
                      b.lossRateWindowStats[0][d][q].packetsLost;
                    "videoSend" === d || "audioSend" === d
                      ? ((f += l), (h += q))
                      : ((g += l), (k += q));
                    a.packetLostRate = 0 >= l || 0 >= q ? 0 : q / l;
                  }
                });
              },
              n = 0,
              m = ["videoSend", "audioSend", "videoRecv", "audioRecv"];
            n < m.length;
            n++
          )
            l(m[n]);
          a.sendPacketLossRate = 0 >= f || 0 >= h ? 0 : h / f;
          a.recvPacketLossRate = 0 >= g || 0 >= k ? 0 : k / g;
        }),
        a
      );
    })(),
    yp = (function (a) {
      function b() {
        var b = (null !== a && a.apply(this, arguments)) || this;
        return (b._stats = xd), (b.lastDecodeVideoReceiverStats = new Map()), b;
      }
      return (
        df(b, a),
        (b.prototype.updateStats = function () {
          return ef(this, void 0, void 0, function () {
            var a, b, f, g;
            return ff(this, function (d) {
              switch (d.label) {
                case 0:
                  return [4, this._getStats()];
                case 1:
                  return (
                    (a = d.sent()),
                    (b = this.statsResponsesToObjects(a)),
                    (this._stats = cb(xd)),
                    (f = b.filter(function (a) {
                      return "ssrc" === a.type;
                    })),
                    this.processSSRCStats(f),
                    (g = b.find(function (a) {
                      return "VideoBwe" === a.type;
                    })) && this.processBandwidthStats(g),
                    (this._stats.timestamp = Date.now()),
                    this.calcLossRate(this._stats),
                    (this.stats = this._stats),
                    [2]
                  );
              }
            });
          });
        }),
        (b.prototype.processBandwidthStats = function (a) {
          this._stats.bitrate = {
            actualEncoded: Number(a.googActualEncBitrate),
            targetEncoded: Number(a.googTargetEncBitrate),
            retransmit: Number(a.googRetransmitBitrate),
            transmit: Number(a.googTransmitBitrate)
          };
          this._stats.sendBandwidth = Number(a.googAvailableSendBandwidth);
        }),
        (b.prototype.processSSRCStats = function (a) {
          var b = this;
          a.forEach(function (a) {
            var d = a.id.includes("send");
            switch (a.mediaType + "_" + (d ? "send" : "recv")) {
              case "video_send":
                d = cb(Rk);
                d.codec = a.googCodecName;
                d.adaptionChangeReason = "none";
                a.googCpuLimitedResolution && (d.adaptionChangeReason = "cpu");
                a.googBandwidthLimitedResolution &&
                  (d.adaptionChangeReason = "bandwidth");
                d.avgEncodeMs = Number(a.googAvgEncodeMs);
                d.inputFrame = {
                  width:
                    Number(a.googFrameWidthInput) ||
                    Number(a.googFrameWidthSent),
                  height:
                    Number(a.googFrameHeightInput) ||
                    Number(a.googFrameHeightSent),
                  frameRate: Number(a.googFrameRateInput)
                };
                d.sentFrame = {
                  width: Number(a.googFrameWidthSent),
                  height: Number(a.googFrameHeightSent),
                  frameRate: Number(a.googFrameRateInput)
                };
                d.firsCount = Number(a.googFirReceived);
                d.nacksCount = Number(a.googNacksReceived);
                d.plisCount = Number(a.googPlisReceived);
                d.frameCount = Number(a.framesEncoded);
                d.bytes = Number(a.bytesSent);
                d.packets = Number(a.packetsSent);
                d.packetsLost = Number(a.packetsLost);
                d.ssrc = Number(a.ssrc);
                d.rttMs = Number(a.googRtt || 0);
                b._stats.videoSend.push(d);
                b._stats.rtt = d.rttMs;
                break;
              case "video_recv":
                d = cb(Qk);
                var e = b.lastDecodeVideoReceiverStats.get(Number(a.ssrc));
                if (
                  ((d.codec = a.googCodecName),
                  (d.targetDelayMs = Number(a.googTargetDelayMs)),
                  (d.renderDelayMs = Number(a.googRenderDelayMs)),
                  (d.currentDelayMs = Number(a.googCurrentDelayMs)),
                  (d.minPlayoutDelayMs = Number(a.googMinPlayoutDelayMs)),
                  (d.decodeMs = Number(a.googDecodeMs)),
                  (d.maxDecodeMs = Number(a.googMaxDecodeMs)),
                  (d.receivedFrame = {
                    width: Number(a.googFrameWidthReceived),
                    height: Number(a.googFrameHeightReceived),
                    frameRate: Number(a.googFrameRateReceived)
                  }),
                  (d.decodedFrame = {
                    width: Number(a.googFrameWidthReceived),
                    height: Number(a.googFrameHeightReceived),
                    frameRate: Number(a.googFrameRateDecoded)
                  }),
                  (d.outputFrame = {
                    width: Number(a.googFrameWidthReceived),
                    height: Number(a.googFrameHeightReceived),
                    frameRate: Number(a.googFrameRateOutput)
                  }),
                  (d.jitterBufferMs = Number(a.googJitterBufferMs)),
                  (d.firsCount = Number(a.googFirsSent)),
                  (d.nacksCount = Number(a.googNacksSent)),
                  (d.plisCount = Number(a.googPlisSent)),
                  (d.framesDecodeCount = Number(a.framesDecoded)),
                  (d.bytes = Number(a.bytesReceived)),
                  (d.packets = Number(a.packetsReceived)),
                  (d.packetsLost = Number(a.packetsLost)),
                  (d.ssrc = Number(a.ssrc)),
                  0 < d.packets &&
                    !b.isFirstVideoReceived &&
                    (b.onFirstVideoReceived && b.onFirstVideoReceived(),
                    (b.isFirstVideoReceived = !0)),
                  0 < d.framesDecodeCount &&
                    !b.isFirstVideoDecoded &&
                    (b.onFirstVideoDecoded &&
                      b.onFirstVideoDecoded(
                        d.decodedFrame.width,
                        d.decodedFrame.height
                      ),
                    (b.isFirstVideoDecoded = !0)),
                  e)
                ) {
                  a = e.stats;
                  var f = Date.now() - e.lts;
                  d.framesDecodeFreezeTime = a.framesDecodeFreezeTime;
                  d.framesDecodeInterval = a.framesDecodeInterval;
                  d.framesDecodeCount > a.framesDecodeCount
                    ? ((e.lts = Date.now()),
                      (d.framesDecodeInterval = f),
                      500 <= d.framesDecodeInterval &&
                        (d.framesDecodeFreezeTime += d.framesDecodeInterval))
                    : d.framesDecodeCount < e.stats.framesDecodeCount &&
                      (d.framesDecodeInterval = 0);
                }
                b.lastDecodeVideoReceiverStats.set(d.ssrc, {
                  stats: ug({}, d),
                  lts: Date.now()
                });
                b._stats.videoRecv.push(d);
                break;
              case "audio_recv":
                d = cb(Tk);
                d.codec = a.googCodecName;
                d.outputLevel = Math.abs(Number(a.audioOutputLevel)) / 32767;
                d.decodingCNG = Number(a.googDecodingCNG);
                d.decodingCTN = Number(a.googDecodingCTN);
                d.decodingCTSG = Number(a.googDecodingCTSG);
                d.decodingNormal = Number(a.googDecodingNormal);
                d.decodingPLC = Number(a.googDecodingPLC);
                d.decodingPLCCNG = Number(a.googDecodingPLCCNG);
                d.expandRate = Number(a.googExpandRate);
                d.accelerateRate = Number(a.googAccelerateRate);
                d.preemptiveExpandRate = Number(a.googPreemptiveExpandRate);
                d.secondaryDecodedRate = Number(a.googSecondaryDecodedRate);
                d.speechExpandRate = Number(a.googSpeechExpandRate);
                d.preferredJitterBufferMs = Number(
                  a.googPreferredJitterBufferMs
                );
                d.jitterBufferMs = Number(a.googJitterBufferMs);
                d.jitterMs = Number(a.googJitterReceived);
                d.bytes = Number(a.bytesReceived);
                d.packets = Number(a.packetsReceived);
                d.packetsLost = Number(a.packetsLost);
                d.ssrc = Number(a.ssrc);
                d.receivedFrames =
                  Number(a.googDecodingCTN) || Number(a.packetsReceived);
                d.droppedFrames =
                  Number(a.googDecodingPLC) + Number(a.googDecodingPLCCNG) ||
                  Number(a.packetsLost);
                0 < d.receivedFrames &&
                  !b.isFirstAudioReceived &&
                  (b.onFirstAudioReceived && b.onFirstAudioReceived(),
                  (b.isFirstAudioReceived = !0));
                0 < d.decodingNormal &&
                  !b.isFirstAudioDecoded &&
                  (b.onFirstAudioDecoded && b.onFirstAudioDecoded(),
                  (b.isFirstAudioDecoded = !0));
                b._stats.audioRecv.push(d);
                break;
              case "audio_send":
                (d = cb(Sk)),
                  (d.codec = a.googCodecName),
                  (d.inputLevel = Math.abs(Number(a.audioInputLevel)) / 32767),
                  (d.aecReturnLoss = Number(
                    a.googEchoCancellationReturnLoss || 0
                  )),
                  (d.aecReturnLossEnhancement = Number(
                    a.googEchoCancellationReturnLossEnhancement || 0
                  )),
                  (d.residualEchoLikelihood = Number(
                    a.googResidualEchoLikelihood || 0
                  )),
                  (d.residualEchoLikelihoodRecentMax = Number(
                    a.googResidualEchoLikelihoodRecentMax || 0
                  )),
                  (d.bytes = Number(a.bytesSent)),
                  (d.packets = Number(a.packetsSent)),
                  (d.packetsLost = Number(a.packetsLost)),
                  (d.ssrc = Number(a.ssrc)),
                  (d.rttMs = Number(a.googRtt || 0)),
                  (b._stats.rtt = d.rttMs),
                  b._stats.audioSend.push(d);
            }
          });
        }),
        (b.prototype._getStats = function () {
          var a = this;
          return new Promise(function (b, d) {
            a.pc.getStats(b, d);
          });
        }),
        (b.prototype.statsResponsesToObjects = function (a) {
          var b = [];
          return (
            a.result().forEach(function (a) {
              var d = {
                id: a.id,
                timestamp: a.timestamp.valueOf().toString(),
                type: a.type
              };
              a.names().forEach(function (b) {
                d[b] = a.stat(b);
              });
              b.push(d);
            }),
            b
          );
        }),
        b
      );
    })(vg),
    ac;
  !(function (a) {
    a.CERTIFICATE = "certificate";
    a.CODEC = "codec";
    a.CANDIDATE_PAIR = "candidate-pair";
    a.LOCAL_CANDIDATE = "local-candidate";
    a.REMOTE_CANDIDATE = "remote-candidate";
    a.INBOUND = "inbound-rtp";
    a.TRACK = "track";
    a.OUTBOUND = "outbound-rtp";
    a.PC = "peer-connection";
    a.REMOTE_INBOUND = "remote-inbound-rtp";
    a.REMOTE_OUTBOUND = "remote-outbound-rtp";
    a.TRANSPORT = "transport";
    a.CSRC = "csrc";
    a.DATA_CHANNEL = "data-channel";
    a.STREAM = "stream";
    a.SENDER = "sender";
    a.RECEIVER = "receiver";
  })(ac || (ac = {}));
  var Uk = (function (a) {
      function b() {
        var b = (null !== a && a.apply(this, arguments)) || this;
        return (
          (b._stats = xd),
          (b.lastDecodeVideoReceiverStats = new Map()),
          (b.lastVideoFramesRecv = new Map()),
          (b.lastVideoFramesSent = new Map()),
          (b.lastVideoFramesDecode = new Map()),
          (b.mediaBytesSent = new Map()),
          (b.mediaBytesRetransmit = new Map()),
          (b.mediaBytesTargetEncode = new Map()),
          (b.lastEncoderMs = new Map()),
          b
        );
      }
      return df(b, a),
      (b.prototype.updateStats = function () {
        return ef(this, void 0, void 0, function () {
          var a,
            b = this;
          return ff(this, function (d) {
            switch (d.label) {
              case 0:
                return (a = this), [4, this.pc.getStats()];
              case 1:
                return (
                  (a.report = d.sent()),
                  (this._stats = cb(xd)),
                  this.report.forEach(function (a) {
                    switch (a.type) {
                      case ac.OUTBOUND:
                        "audio" === a.mediaType
                          ? b.processAudioOutboundStats(a)
                          : "video" === a.mediaType &&
                            b.processVideoOutboundStats(a);
                        break;
                      case ac.INBOUND:
                        "audio" === a.mediaType
                          ? b.processAudioInboundStats(a)
                          : "video" === a.mediaType &&
                            b.processVideoInboundStats(a);
                        break;
                      case ac.TRANSPORT:
                        (a = b.report.get(a.selectedCandidatePairId)) &&
                          b.processCandidatePairStats(a);
                        break;
                      case ac.CANDIDATE_PAIR:
                        a.selected && b.processCandidatePairStats(a);
                    }
                  }),
                  this.updateSendBitrate(),
                  (this._stats.timestamp = Date.now()),
                  this.calcLossRate(this._stats),
                  (this.stats = this._stats),
                  [2]
                );
            }
          });
        });
      }),
      (b.prototype.processCandidatePairStats = function (a) {
        this._stats.sendBandwidth = a.availableOutgoingBitrate || 0;
        a.currentRoundTripTime &&
          (this._stats.rtt = 1e3 * a.currentRoundTripTime);
        this._stats.videoSend.forEach(function (b) {
          !b.rttMs &&
            a.currentRoundTripTime &&
            (b.rttMs = 1e3 * a.currentRoundTripTime);
        });
        this._stats.audioSend.forEach(function (b) {
          !b.rttMs &&
            a.currentRoundTripTime &&
            (b.rttMs = 1e3 * a.currentRoundTripTime);
        });
      }),
      (b.prototype.processAudioInboundStats = function (a) {
        var b = this._stats.audioRecv.find(function (b) {
          return b.ssrc === a.ssrc;
        });
        b || ((b = cb(Tk)), this._stats.audioRecv.push(b));
        b.ssrc = a.ssrc;
        b.packets = a.packetsReceived;
        b.packetsLost = a.packetsLost;
        b.bytes = a.bytesReceived;
        b.jitterMs = 1e3 * a.jitter;
        a.trackId && this.processAudioTrackReceiverStats(a.trackId, b);
        a.codecId && (b.codec = this.getCodecFromCodecStats(a.codecId));
        b.receivedFrames || (b.receivedFrames = a.packetsReceived);
        b.droppedFrames || (b.droppedFrames = a.packetsLost);
        0 < b.receivedFrames &&
          !this.isFirstAudioReceived &&
          (this.onFirstAudioReceived && this.onFirstAudioReceived(),
          (this.isFirstAudioReceived = !0));
        b.outputLevel &&
          0 < b.outputLevel &&
          !this.isFirstAudioDecoded &&
          (this.onFirstAudioDecoded && this.onFirstAudioDecoded(),
          (this.isFirstAudioDecoded = !0));
      }),
      (b.prototype.processVideoInboundStats = function (a) {
        var b = this._stats.videoRecv.find(function (b) {
          return b.ssrc === a.ssrc;
        });
        b || ((b = cb(Qk)), this._stats.videoRecv.push(b));
        b.ssrc = a.ssrc;
        b.packets = a.packetsReceived;
        b.packetsLost = a.packetsLost;
        b.bytes = a.bytesReceived;
        b.firsCount = a.firCount;
        b.nacksCount = a.nackCount;
        b.plisCount = a.pliCount;
        b.framesDecodeCount = a.framesDecoded;
        var d = this.lastDecodeVideoReceiverStats.get(b.ssrc),
          g = this.lastVideoFramesDecode.get(b.ssrc),
          h = Date.now();
        if (d) {
          var k = d.stats,
            l = h - d.lts;
          b.framesDecodeFreezeTime = k.framesDecodeFreezeTime;
          b.framesDecodeInterval = k.framesDecodeInterval;
          b.framesDecodeCount > k.framesDecodeCount
            ? ((d.lts = Date.now()),
              (b.framesDecodeInterval = l),
              500 <= b.framesDecodeInterval &&
                (b.framesDecodeFreezeTime += b.framesDecodeInterval))
            : b.framesDecodeCount < k.framesDecodeCount &&
              (b.framesDecodeInterval = 0);
        }
        if (
          (g && 800 <= h - g.lts
            ? ((b.decodeFrameRate = Math.round(
                (b.framesDecodeCount - g.count) / ((h - g.lts) / 1e3)
              )),
              this.lastVideoFramesDecode.set(b.ssrc, {
                count: b.framesDecodeCount,
                lts: h,
                rate: b.decodeFrameRate
              }))
            : g
            ? (b.decodeFrameRate = g.rate)
            : this.lastVideoFramesDecode.set(b.ssrc, {
                count: b.framesDecodeCount,
                lts: h,
                rate: 0
              }),
          a.totalDecodeTime && (b.decodeMs = 1e3 * a.totalDecodeTime),
          a.trackId && this.processVideoTrackReceiverStats(a.trackId, b),
          a.codecId && (b.codec = this.getCodecFromCodecStats(a.codecId)),
          a.framerateMean && (b.framesRateFirefox = a.framerateMean),
          0 < b.packets &&
            !this.isFirstVideoReceived &&
            (this.onFirstVideoReceived && this.onFirstVideoReceived(),
            (this.isFirstVideoReceived = !0)),
          0 < b.framesDecodeCount && !this.isFirstVideoDecoded)
        )
          (g = b.decodedFrame ? b.decodedFrame.width : 0),
            (h = b.decodedFrame ? b.decodedFrame.height : 0),
            this.onFirstVideoDecoded && this.onFirstVideoDecoded(g, h),
            (this.isFirstVideoDecoded = !0);
        this.lastDecodeVideoReceiverStats.set(b.ssrc, {
          stats: ug({}, b),
          lts: d ? d.lts : Date.now()
        });
      }),
      (b.prototype.processVideoOutboundStats = function (a) {
        var b = this._stats.videoSend.find(function (b) {
          return b.ssrc === a.ssrc;
        });
        b || ((b = cb(Rk)), this._stats.videoSend.push(b));
        var d = this.mediaBytesSent.get(a.ssrc);
        d
          ? d.add(a.bytesSent)
          : ((g = new tg(10)).add(a.bytesSent),
            this.mediaBytesSent.set(a.ssrc, g));
        void 0 !== a.retransmittedBytesSent &&
          ((d = this.mediaBytesRetransmit.get(a.ssrc))
            ? d.add(a.retransmittedBytesSent)
            : ((g = new tg(10)).add(a.retransmittedBytesSent),
              this.mediaBytesRetransmit.set(a.ssrc, g)));
        if (a.totalEncodedBytesTarget) {
          var g;
          (d = this.mediaBytesTargetEncode.get(a.ssrc))
            ? d.add(a.totalEncodedBytesTarget)
            : ((g = new tg(10)).add(a.totalEncodedBytesTarget),
              this.mediaBytesTargetEncode.set(a.ssrc, g));
        }
        if (
          ((b.ssrc = a.ssrc),
          (b.bytes = a.bytesSent),
          (b.packets = a.packetsSent),
          (b.firsCount = a.firCount),
          (b.nacksCount = a.nackCount),
          (b.plisCount = a.pliCount),
          (b.frameCount = a.framesEncoded),
          (b.adaptionChangeReason = a.qualityLimitationReason),
          a.totalEncodeTime && a.framesEncoded)
        )
          (d = this.lastEncoderMs.get(a.ssrc)),
            (b.avgEncodeMs =
              !d || d.lastFrameCount > a.framesEncoded
                ? (1e3 * a.totalEncodeTime) / a.framesEncoded
                : (1e3 * (a.totalEncodeTime - d.lastEncoderTime)) /
                  (a.framesEncoded - d.lastFrameCount)),
            this.lastEncoderMs.set(a.ssrc, {
              lastFrameCount: a.framesEncoded,
              lastEncoderTime: a.totalEncodeTime,
              lts: Date.now()
            });
        (a.codecId && (b.codec = this.getCodecFromCodecStats(a.codecId)),
        a.mediaSourceId && this.processVideoMediaSource(a.mediaSourceId, b),
        a.trackId && this.processVideoTrackSenderStats(a.trackId, b),
        a.remoteId)
          ? this.processRemoteInboundStats(a.remoteId, b)
          : (d = this.findRemoteStatsId(a.ssrc, ac.REMOTE_INBOUND)) &&
            this.processRemoteInboundStats(d, b);
      }),
      (b.prototype.processAudioOutboundStats = function (a) {
        var b = this._stats.audioSend.find(function (b) {
          return b.ssrc === a.ssrc;
        });
        if (
          (b || ((b = cb(Sk)), this._stats.audioSend.push(b)),
          (b.ssrc = a.ssrc),
          (b.packets = a.packetsSent),
          (b.bytes = a.bytesSent),
          a.mediaSourceId && this.processAudioMediaSource(a.mediaSourceId, b),
          a.codecId && (b.codec = this.getCodecFromCodecStats(a.codecId)),
          a.trackId && this.processAudioTrackSenderStats(a.trackId, b),
          a.remoteId)
        )
          this.processRemoteInboundStats(a.remoteId, b);
        else {
          var d = this.findRemoteStatsId(a.ssrc, ac.REMOTE_INBOUND);
          d && this.processRemoteInboundStats(d, b);
        }
      }),
      (b.prototype.findRemoteStatsId = function (a, b) {
        var d = Array.from(this.report.values()).find(function (d) {
          return d.type === b && d.ssrc === a;
        });
        return d ? d.id : null;
      }),
      (b.prototype.processVideoMediaSource = function (a, b) {
        (a = this.report.get(a)) &&
          (b.inputFrame = {
            width: a.width,
            height: a.height,
            frameRate: a.framesPerSecond
          });
      }),
      (b.prototype.processAudioMediaSource = function (a, b) {
        (a = this.report.get(a)) && (b.inputLevel = a.audioLevel);
      }),
      (b.prototype.processVideoTrackSenderStats = function (a, b) {
        if ((a = this.report.get(a))) {
          var d = 0,
            e = Date.now(),
            h = this.lastVideoFramesSent.get(b.ssrc);
          h && 800 <= e - h.lts
            ? ((d = Math.round(
                (a.framesSent - h.count) / ((e - h.lts) / 1e3)
              )),
              this.lastVideoFramesSent.set(b.ssrc, {
                count: a.framesSent,
                lts: e,
                rate: d
              }))
            : h
            ? (d = h.rate)
            : this.lastVideoFramesSent.set(b.ssrc, {
                count: a.framesSent,
                lts: e,
                rate: 0
              });
          b.sentFrame = {
            width: a.frameWidth,
            height: a.frameHeight,
            frameRate: d
          };
        }
      }),
      (b.prototype.processVideoTrackReceiverStats = function (a, b) {
        if ((a = this.report.get(a))) {
          var d = this.lastVideoFramesRecv.get(b.ssrc),
            e = Date.now();
          b.framesReceivedCount = a.framesReceived;
          var h = 0;
          d && 800 <= e - d.lts
            ? ((h = Math.round(
                (a.framesReceived - d.count) / ((e - d.lts) / 1e3)
              )),
              this.lastVideoFramesRecv.set(b.ssrc, {
                count: a.framesReceived,
                lts: e,
                rate: h
              }))
            : d
            ? (h = d.rate)
            : this.lastVideoFramesRecv.set(b.ssrc, {
                count: a.framesReceived,
                lts: e,
                rate: 0
              });
          b.receivedFrame = {
            width: a.frameWidth || 0,
            height: a.frameHeight || 0,
            frameRate: h || 0
          };
          b.decodedFrame = {
            width: a.frameWidth || 0,
            height: a.frameHeight || 0,
            frameRate: b.decodeFrameRate || 0
          };
          b.outputFrame = {
            width: a.frameWidth || 0,
            height: a.frameHeight || 0,
            frameRate: b.decodeFrameRate || 0
          };
          a.jitterBufferDelay &&
            a.jitterBufferEmittedCount &&
            ((b.jitterBufferMs =
              (1e3 * a.jitterBufferDelay) / a.jitterBufferEmittedCount),
            (b.currentDelayMs =
              (1e3 * a.jitterBufferDelay) / a.jitterBufferEmittedCount));
        }
      }),
      (b.prototype.processAudioTrackSenderStats = function (a, b) {
        (a = this.report.get(a)) &&
          ((b.aecReturnLoss = a.echoReturnLoss || 0),
          (b.aecReturnLossEnhancement = a.echoReturnLossEnhancement || 0));
      }),
      (b.prototype.processAudioTrackReceiverStats = function (a, b) {
        if ((a = this.report.get(a))) {
          a.removedSamplesForAcceleration &&
            a.totalSamplesReceived &&
            (b.accelerateRate =
              a.removedSamplesForAcceleration / a.totalSamplesReceived);
          a.jitterBufferDelay &&
            a.jitterBufferEmittedCount &&
            (b.jitterBufferMs =
              (1e3 * a.jitterBufferDelay) / a.jitterBufferEmittedCount);
          b.outputLevel = a.audioLevel;
          var d = 1920;
          a.totalSamplesDuration &&
            a.totalSamplesReceived &&
            ((d = a.totalSamplesReceived / a.totalSamplesDuration / 50),
            (b.receivedFrames = Math.round(a.totalSamplesReceived / d)));
          a.concealedSamples &&
            (b.droppedFrames = Math.round(a.concealedSamples / d));
        }
      }),
      (b.prototype.processRemoteInboundStats = function (a, b) {
        (a = this.report.get(a)) &&
          ((b.packetsLost = a.packetsLost),
          a.roundTripTime && (b.rttMs = 1e3 * a.roundTripTime));
      }),
      (b.prototype.getCodecFromCodecStats = function (a) {
        a = this.report.get(a);
        return a
          ? (a = a.mimeType.match(/\/(.*)$/)) && a[1]
            ? a[1]
            : ""
          : "";
      }),
      (b.prototype.updateSendBitrate = function () {
        var a = 0,
          b = null,
          f = null;
        this.mediaBytesSent.forEach(function (b) {
          a += b.diffMean();
        });
        this.mediaBytesRetransmit.forEach(function (a) {
          b = null === b ? a.diffMean() : b + a.diffMean();
        });
        this.mediaBytesTargetEncode.forEach(function (a) {
          f = null === f ? a.diffMean() : f + a.diffMean();
        });
        this._stats.bitrate = {
          actualEncoded:
            (8 * (null !== b ? a - b : a)) /
            (this.options.updateInterval / 1e3),
          transmit: (8 * a) / (this.options.updateInterval / 1e3)
        };
        null !== b &&
          (this._stats.bitrate.retransmit =
            (8 * b) / (this.options.updateInterval / 1e3));
        null !== f &&
          (this._stats.bitrate.targetEncoded =
            (8 * f) / (this.options.updateInterval / 1e3));
      }),
      b;
    })(vg),
    zp = (function (a) {
      function b() {
        return (null !== a && a.apply(this, arguments)) || this;
      }
      return (
        df(b, a),
        (b.prototype.updateStats = function () {
          return Promise.resolve();
        }),
        b
      );
    })(vg);
  class Vk {
    constructor(a) {
      this.localCandidateCount = 0;
      this.allCandidateReceived = !1;
      this.videoTrack = this.audioTrack = null;
      this.mediaStream = new MediaStream();
      this.ID = Wk;
      Wk += 1;
      this.spec = a;
      this.createPeerConnection();
      a = this.pc;
      var b = void 0,
        d = void 0;
      void 0 === b && (b = 250);
      void 0 === d && (d = 8);
      var e;
      this.statsFilter = (e =
        (e = navigator.userAgent.toLocaleLowerCase().match(/chrome\/[\d]./i)) &&
        e[0]
          ? Number(e[0].split("/")[1])
          : null)
        ? 76 > e
          ? new yp(a, { updateInterval: b, lossRateInterval: d })
          : new Uk(a, { updateInterval: b, lossRateInterval: d })
        : window.RTCStatsReport && a.getStats() instanceof Promise
        ? new Uk(a, { updateInterval: b, lossRateInterval: d })
        : new zp(a, { updateInterval: b, lossRateInterval: d });
    }
    getStats() {
      return this.statsFilter.getStats();
    }
    async createOfferSDP() {
      try {
        let a = await this.pc.createOffer(this.offerOptions);
        if (!a.sdp) throw Error("offer sdp is empty");
        return a.sdp;
      } catch (a) {
        throw (
          (k.error("create offer error:", a.toString()),
          new m(l.CREATE_OFFER_FAILED, a.toString()))
        );
      }
    }
    async setOfferSDP(a) {
      try {
        await this.pc.setLocalDescription({ type: "offer", sdp: a });
      } catch (b) {
        throw (
          (k.error("set local offer error", b.toString()),
          new m(l.CREATE_OFFER_FAILED, b.toString()))
        );
      }
    }
    async setAnswerSDP(a) {
      try {
        await this.pc.setRemoteDescription({ type: "answer", sdp: a });
      } catch (b) {
        if (
          "InvalidStateError" !== b.name ||
          "stable" !== this.pc.signalingState
        )
          throw (
            (k.error("set remote answer error", b.toString()),
            new m(l.SET_ANSWER_FAILED, b.toString()))
          );
        k.debug("[pc-".concat(this.ID, "] ignore invalidstate error"));
      }
    }
    close() {
      this.onConnectionStateChange = this.onICEConnectionStateChange = void 0;
      try {
        this.pc.close();
      } catch (a) {}
      this.statsFilter.destroy();
    }
    createPeerConnection() {
      let a = { iceServers: [{ urls: "stun:webcs.agora.io:3478" }] };
      var b;
      this.spec.iceServers
        ? (a.iceServers = this.spec.iceServers)
        : this.spec.turnServer &&
          "off" !== this.spec.turnServer.mode &&
          r((b = this.spec.turnServer.servers)).call(b, (b) => {
            var d, f;
            (a.iceServers &&
              a.iceServers.push({
                username: b.username,
                credential: b.password,
                credentialType: "password",
                urls: n((d = "turn:".concat(b.turnServerURL, ":"))).call(
                  d,
                  b.udpport,
                  "?transport=udp"
                )
              }),
            b.tcpport) &&
              a.iceServers &&
              a.iceServers.push({
                username: b.username,
                credential: b.password,
                credentialType: "password",
                urls: n((f = "turn:".concat(b.turnServerURL, ":"))).call(
                  f,
                  b.tcpport,
                  "?transport=tcp"
                )
              });
            b.forceturn && (a.iceTransportPolicy = "relay");
          });
      C.CHROME_FORCE_PLAN_B &&
        Te() &&
        ((a.sdpSemantics = "plan-b"), (ea.supportUnifiedPlan = !1));
      this.pc = new RTCPeerConnection(a);
      this.pc.oniceconnectionstatechange = () => {
        this.onICEConnectionStateChange &&
          this.onICEConnectionStateChange(this.pc.iceConnectionState);
      };
      this.pc.onconnectionstatechange = () => {
        this.onConnectionStateChange &&
          this.onConnectionStateChange(this.pc.connectionState);
      };
      this.pc.onsignalingstatechange = () => {
        "closed" === this.pc.connectionState &&
          this.onConnectionStateChange &&
          this.onConnectionStateChange(this.pc.connectionState);
      };
      this.pc.onicecandidate = (a) => {
        if (!a.candidate)
          return (
            (this.pc.onicecandidate = null),
            (this.allCandidateReceived = !0),
            void k.debug(
              "[pc-".concat(this.ID, "] local candidate count"),
              this.localCandidateCount
            )
          );
        this.localCandidateCount += 1;
      };
      Cc(() => {
        this.allCandidateReceived ||
          ((this.allCandidateReceived = !0),
          k.debug(
            "[pc-".concat(
              this.ID,
              "] onicecandidate timeout, local candidate count"
            ),
            this.localCandidateCount
          ));
      }, C.CANDIDATE_TIMEOUT);
    }
  }
  class Xk extends Vk {
    constructor(a) {
      super(a);
    }
    async addStream(a) {
      a = a.getTracks();
      for (let b of a) await this.addTrack(b);
    }
    async replaceTrack(a) {
      if (!ea.supportReplaceTrack) {
        var b = "audio" === a.kind ? this.audioTrack : this.videoTrack;
        if (!b) throw new m(l.UNEXPECTED_ERROR, "can not find replaced track");
        return this.removeTrack(b), await this.addTrack(a), !0;
      }
      let d = this.getSender(a.kind),
        e = R((b = this.mediaStream.getTracks())).call(
          b,
          (b) => b.kind === a.kind
        );
      e && this.mediaStream.removeTrack(e);
      this.mediaStream.addTrack(a);
      try {
        await d.replaceTrack(a),
          "audio" === a.kind ? (this.audioTrack = a) : (this.videoTrack = a);
      } catch (f) {
        throw new m(l.SENDER_REPLACE_FAILED, f.toString());
      }
      return !1;
    }
    removeTrack(a) {
      let b = this.getSender(a.kind);
      this.mediaStream.removeTrack(a);
      try {
        this.pc.removeTrack(b);
      } catch (d) {
        k.warning("[pc-".concat(this.ID, "] remove track error, ignore"), d);
      }
      "audio" === a.kind
        ? ((this.audioTrack = null),
          (this.audioSender = void 0),
          this.audioTransceiver &&
            (this.audioTransceiver.direction = "inactive"),
          (this.audioTransceiver = void 0))
        : ((this.videoTrack = null),
          (this.videoSender = void 0),
          this.videoTransceiver &&
            (this.videoTransceiver.direction = "inactive"),
          (this.videoTransceiver = void 0));
    }
    async addTrack(a) {
      let b = ea;
      if (
        ("audio" === a.kind && this.audioTrack) ||
        ("video" === a.kind && this.videoTrack)
      )
        throw new m(l.UNEXPECTED_ERROR, "Can't add multiple stream");
      let d, e;
      this.mediaStream.addTrack(a);
      b.supportUnifiedPlan
        ? ((d = await hm(this.pc, a)), (e = d.sender))
        : (e = this.pc.addTrack(a, this.mediaStream));
      "audio" === a.kind
        ? ((this.audioTrack = a),
          (this.audioSender = e),
          (this.audioTransceiver = d))
        : ((this.videoTrack = a),
          (this.videoSender = e),
          (this.videoTransceiver = d));
    }
    async setRtpSenderParameters(a, b) {
      if (
        (a =
          this.videoSender ||
          (this.videoTransceiver ? this.videoTransceiver.sender : void 0))
      ) {
        var d = a.getParameters();
        d.degradationPreference = b;
        try {
          await a.setParameters(d);
        } catch (e) {
          k.debug(
            "[".concat(this.ID, "] ignore RtpSender.setParameters"),
            e.toString()
          );
        }
      }
    }
    getSender(a) {
      var b = null;
      if (ea.supportUnifiedPlan) {
        var d;
        b = (b = R((d = this.pc.getTransceivers())).call(
          d,
          (b) => b.sender.track && b.sender.track.kind === a
        ))
          ? b.sender
          : null;
      } else {
        var e;
        b =
          R((e = this.pc.getSenders())).call(
            e,
            (b) => b.track && b.track.kind === a
          ) || null;
      }
      if (!b) throw new m(l.SENDER_NOT_FOUND);
      return b;
    }
  }
  class Yk extends Vk {
    constructor(a) {
      super(a);
      this.statsFilter.onFirstAudioDecoded = () =>
        this.onFirstAudioDecoded && this.onFirstAudioDecoded();
      this.statsFilter.onFirstVideoDecoded = (a, d) =>
        this.onFirstVideoDecoded && this.onFirstVideoDecoded(a, d);
      this.statsFilter.onFirstAudioReceived = () =>
        this.onFirstAudioReceived && this.onFirstAudioReceived();
      this.statsFilter.onFirstVideoReceived = () =>
        this.onFirstVideoReceived && this.onFirstVideoReceived();
      ea.supportUnifiedPlan
        ? ((this.audioTransceiver = this.pc.addTransceiver("audio", {
            direction: "recvonly"
          })),
          (this.videoTransceiver = this.pc.addTransceiver("video", {
            direction: "recvonly"
          })))
        : (this.offerOptions = {
            offerToReceiveAudio: !0,
            offerToReceiveVideo: !0
          });
      this.pc.ontrack = (a) => {
        "audio" === a.track.kind
          ? (this.audioTrack = a.track)
          : (this.videoTrack = a.track);
        this.onTrack && this.onTrack(a.track, a.streams[0]);
      };
    }
  }
  let Wk = 1,
    Zk = 1,
    Ap = 1 / 0;
  class $k extends Ua {
    constructor(a, b) {
      super();
      this.startTime = v();
      this.createTime = v();
      this.readyToReconnect = !1;
      this._connectionState = "disconnected";
      this.currentReconnectCount = 0;
      this.ID = Zk;
      Zk += 1;
      this.joinInfo = a;
      this._userId = b;
      this.createPC();
    }
    get connectionState() {
      return this._connectionState;
    }
    set connectionState(a) {
      a !== this._connectionState &&
        (this.emit(G.CONNECTION_STATE_CHANGE, a, this._connectionState),
        (this._connectionState = a));
    }
    get connectionId() {
      var a, b;
      return n(
        (a = n((b = "".concat(this.joinInfo.clientId, "-"))).call(
          b,
          this.type ? this.type : "sub(".concat(this._userId, ")"),
          "-"
        ))
      ).call(a, this.ID);
    }
    getUserId() {
      return this._userId;
    }
    startUploadStats() {
      this.statsUploadInterval = window.setInterval(() => {
        let a = this.pc.getStats();
        this.uploadStats(a, this.lastUploadPCStats);
        this.lastUploadPCStats = a;
      }, 3e3);
      this.statsUploadSlowInterval = window.setInterval(() => {
        let a = this.pc.getStats();
        this.uploadSlowStats(a);
      }, 6e4);
      this.relatedStatsUploadInterval = window.setInterval(() => {
        let a = this.pc.getStats();
        this.uploadRelatedStats(a, this.lastRelatedPcStats);
        this.lastRelatedPcStats = a;
      }, 1e3);
    }
    stopUploadStats() {
      this.statsUploadInterval &&
        window.clearInterval(this.statsUploadInterval);
      this.relatedStatsUploadInterval &&
        window.clearInterval(this.relatedStatsUploadInterval);
      this.relatedStatsUploadInterval = this.statsUploadInterval = void 0;
    }
    createWaitConnectionConnectedPromise() {
      return new u((a, b) => {
        "disconnected" === this.connectionState
          ? b()
          : "connected" === this.connectionState
          ? a()
          : this.once(G.CONNECTION_STATE_CHANGE, (d) => {
              "connected" === d ? a() : b();
            });
      });
    }
    async reconnectPC(a) {
      if (
        ((this.readyToReconnect = !1),
        a && this.onPCDisconnected(a),
        this.currentReconnectCount > Ap)
      )
        throw (
          (k.debug("[".concat(this.connectionId, "] cannot reconnect pc")),
          a || new m(l.UNEXPECTED_ERROR))
        );
      this.stopUploadStats();
      k.debug("[".concat(this.connectionId, "] start reconnect pc"));
      this.connectionState = "connecting";
      this.currentReconnectCount += 1;
      if (await this.closePC())
        return (
          k.debug(
            "[".concat(this.connectionId, "] abort reconnect pc, wait ws")
          ),
          void this.readyToReconnectPC()
        );
      this.createPC();
      await this.startP2PConnection();
      this.currentReconnectCount = 0;
    }
    readyToReconnectPC() {
      this.stopUploadStats();
      this.readyToReconnect = !0;
      this.pc.onICEConnectionStateChange = void 0;
      this.connectionState = "connecting";
    }
    updateICEPromise() {
      this.removeAllListeners(G.GATEWAY_P2P_LOST);
      this.icePromise = new u((a, b) => {
        this.pc.onICEConnectionStateChange = (d) => {
          var e, f;
          k.info(
            n(
              (e = n((f = "[".concat(this.connectionId, "] ice-state: "))).call(
                f,
                this.type,
                " p2p "
              ))
            ).call(e, d)
          );
          "connected" === d && a();
          ("failed" !== d && "closed" !== d) ||
            this.reconnectPC(new m(l.ICE_FAILED)).catch((a) => {
              this.emit(G.P2P_LOST);
              b(a);
            });
        };
        this.pc.onConnectionStateChange = (a) => {
          var d, f;
          k.info(
            n(
              (d = n(
                (f = "[".concat(this.connectionId, "] connection-state: "))
              ).call(f, this.type, " p2p "))
            ).call(d, a)
          );
          ("failed" !== a && "closed" !== a) ||
            this.reconnectPC(new m(l.PC_CLOSED)).catch((a) => {
              this.emit(G.P2P_LOST);
              b(a);
            });
        };
        this.removeAllListeners(G.GATEWAY_P2P_LOST);
        this.once(G.GATEWAY_P2P_LOST, (a) => {
          var d;
          if (this.pc.ID.toString() === a.toString()) {
            if (
              (k.info(
                n((d = "[".concat(this.connectionId, "] "))).call(
                  d,
                  this.type,
                  " p2p gateway lost"
                )
              ),
              this.pc.allCandidateReceived && 0 === this.pc.localCandidateCount)
            )
              return (
                (this.disconnectedReason = new m(
                  l.NO_ICE_CANDIDATE,
                  "can not get candidate in this pc"
                )),
                void this.closeP2PConnection(!0)
              );
            this.reconnectPC(new m(l.GATEWAY_P2P_LOST)).catch((a) => {
              this.emit(G.P2P_LOST);
              b(a);
            });
          }
        });
      });
    }
  }
  class al {
    constructor(a) {
      this.freezeTimeCounterList = [];
      this.lastTimeUpdatedTime =
        this.playbackTime =
        this.freezeTime =
        this.timeUpdatedCount =
          0;
      this._videoElementStatus = Ia.NONE;
      this.isGettingVideoDimensions = !1;
      this.handleVideoEvents = (a) => {
        switch (a.type) {
          case "play":
          case "playing":
            this.startGetVideoDimensions();
            this.videoElementStatus = Ia.PLAYING;
            break;
          case "loadeddata":
            this.onFirstVideoFrameDecoded && this.onFirstVideoFrameDecoded();
            break;
          case "canplay":
            this.videoElementStatus = Ia.CANPLAY;
            break;
          case "stalled":
            this.videoElementStatus = Ia.STALLED;
            break;
          case "suspend":
            this.videoElementStatus = Ia.SUSPEND;
            break;
          case "pause":
            this.videoElementStatus = Ia.PAUSED;
            this.videoElement &&
              (k.debug(
                "[track-".concat(
                  this.trackId,
                  "] video element paused, auto resume"
                )
              ),
              this.videoElement.play());
            break;
          case "waiting":
            this.videoElementStatus = Ia.WAITING;
            break;
          case "abort":
            this.videoElementStatus = Ia.ABORT;
            break;
          case "ended":
            this.videoElementStatus = Ia.ENDED;
            break;
          case "emptied":
            this.videoElementStatus = Ia.EMPTIED;
            break;
          case "timeupdate": {
            a = v();
            if (((this.timeUpdatedCount += 1), 10 > this.timeUpdatedCount))
              return void (this.lastTimeUpdatedTime = a);
            let b = a - this.lastTimeUpdatedTime;
            this.lastTimeUpdatedTime = a;
            500 < b && (this.freezeTime += b);
            for (this.playbackTime += b; 6e3 <= this.playbackTime; )
              (this.playbackTime -= 6e3),
                this.freezeTimeCounterList.push(Math.min(6e3, this.freezeTime)),
                (this.freezeTime = Math.max(0, this.freezeTime - 6e3));
          }
        }
      };
      this.startGetVideoDimensions = () => {
        let a = () => {
          if (
            ((this.isGettingVideoDimensions = !0),
            this.videoElement &&
              4 < this.videoElement.videoWidth * this.videoElement.videoHeight)
          )
            return (
              k.debug(
                "[".concat(this.trackId, "] current video dimensions:"),
                this.videoElement.videoWidth,
                this.videoElement.videoHeight
              ),
              void (this.isGettingVideoDimensions = !1)
            );
          Cc(a, 500);
        };
        !this.isGettingVideoDimensions && a();
      };
      this.slot = a.element;
      this.trackId = a.trackId;
      this.updateConfig(a);
    }
    get videoElementStatus() {
      return this._videoElementStatus;
    }
    set videoElementStatus(a) {
      var b, d;
      a !== this._videoElementStatus &&
        (k.debug(
          n(
            (b = n(
              (d = "[".concat(this.trackId, "] video-element-status change "))
            ).call(d, this._videoElementStatus, " => "))
          ).call(b, a)
        ),
        (this._videoElementStatus = a));
    }
    updateConfig(a) {
      this.config = a;
      this.trackId = a.trackId;
      a = a.element;
      a !== this.slot && (this.destroy(), (this.slot = a));
      this.createElements();
    }
    updateVideoTrack(a) {
      this.videoTrack !== a && ((this.videoTrack = a), this.createElements());
    }
    play() {
      if (this.videoElement) {
        let a = this.videoElement.play();
        a &&
          a.catch &&
          a.catch((a) => {
            k.warning("[".concat(this.trackId, "] play warning: "), a);
          });
      }
    }
    getCurrentFrame() {
      if (!this.videoElement) return new ImageData(2, 2);
      let a = document.createElement("canvas");
      a.width = this.videoElement.videoWidth;
      a.height = this.videoElement.videoHeight;
      var b = a.getContext("2d");
      if (!b)
        return k.error("create canvas context failed!"), new ImageData(2, 2);
      b.drawImage(this.videoElement, 0, 0, a.width, a.height);
      b = b.getImageData(0, 0, a.width, a.height);
      return a.remove(), b;
    }
    destroy() {
      if (
        (this.videoElement &&
          ((this.videoElement.srcObject = null), (this.videoElement = void 0)),
        this.container)
      ) {
        try {
          this.slot.removeChild(this.container);
        } catch (a) {}
        this.container = void 0;
      }
      this.freezeTimeCounterList = [];
    }
    createElements() {
      this.container || (this.container = document.createElement("div"));
      this.container.id = "agora-video-player-".concat(this.trackId);
      this.container.style.width = "100%";
      this.container.style.height = "100%";
      this.container.style.position = "relative";
      this.container.style.overflow = "hidden";
      this.videoTrack
        ? ((this.container.style.backgroundColor = "black"),
          this.createVideoElement(),
          this.container.appendChild(this.videoElement))
        : this.removeVideoElement();
      this.slot.appendChild(this.container);
    }
    createVideoElement() {
      (this.videoElement ||
        ((this.videoElementStatus = Ia.INIT),
        (this.videoElement = document.createElement("video")),
        (this.videoElement.onerror = () =>
          (this.videoElementStatus = Ia.ERROR)),
        this.container && this.container.appendChild(this.videoElement),
        r(we).call(we, (a) => {
          this.videoElement &&
            this.videoElement.addEventListener(a, this.handleVideoEvents);
        }),
        (this.videoElementCheckInterval = window.setInterval(() => {
          !document.getElementById("video_".concat(this.trackId)) &&
            this.videoElement &&
            (this.videoElementStatus = Ia.DESTROYED);
        }, 1e3))),
      (this.videoElement.id = "video_".concat(this.trackId)),
      (this.videoElement.className = "agora_video_player"),
      (this.videoElement.style.width = "100%"),
      (this.videoElement.style.height = "100%"),
      (this.videoElement.style.position = "absolute"),
      (this.videoElement.controls = !1),
      this.videoElement.setAttribute("playsinline", ""),
      (this.videoElement.style.left = "0"),
      (this.videoElement.style.top = "0"),
      this.config.mirror &&
        (this.videoElement.style.transform = "rotateY(180deg)"),
      this.config.fit
        ? (this.videoElement.style.objectFit = this.config.fit)
        : (this.videoElement.style.objectFit = "cover"),
      this.videoElement.setAttribute("muted", ""),
      (this.videoElement.muted = !0),
      this.videoElement.srcObject &&
        this.videoElement.srcObject instanceof MediaStream)
        ? this.videoElement.srcObject.getVideoTracks()[0] !== this.videoTrack &&
          (this.videoElement.srcObject = this.videoTrack
            ? new MediaStream([this.videoTrack])
            : null)
        : (this.videoElement.srcObject = this.videoTrack
            ? new MediaStream([this.videoTrack])
            : null);
      let a = this.videoElement.play();
      void 0 !== a &&
        a.catch((a) => {
          k.debug(
            "[".concat(this.trackId, "] playback interrupted"),
            a.toString()
          );
        });
    }
    removeVideoElement() {
      if (this.videoElement) {
        r(we).call(we, (a) => {
          this.videoElement &&
            this.videoElement.removeEventListener(a, this.handleVideoEvents);
        });
        this.videoElementCheckInterval &&
          (window.clearInterval(this.videoElementCheckInterval),
          (this.videoElementCheckInterval = void 0));
        try {
          this.container && this.container.removeChild(this.videoElement);
        } catch (a) {}
        this.videoElement = void 0;
        this.videoElementStatus = Ia.NONE;
      }
    }
  }
  let we =
    "play playing loadeddata canplay pause stalled suspend waiting abort emptied ended timeupdate".split(
      " "
    );
  class Bp {
    get output() {
      return this._output;
    }
    async setInput(a) {
      if (a !== this.input) {
        if (a.kind !== this.kind) throw new m(l.UNEXPECTED_ERROR);
        this.input && this.removeInput();
        this.input = a;
        await this._setInput(a);
      }
    }
    removeInput() {
      this.input = void 0;
      this._removeInput();
    }
    async updateOutput(a) {
      this.output !== a &&
        ((this._output = a),
        this.onOutputChange && (await this.onOutputChange()));
    }
    replaceOriginMediaStream(a, b) {
      var d, e;
      let f = R((d = a.getTracks())).call(d, (a) => a.kind === this.kind);
      f && a.removeTrack(f);
      b = R((e = b.getTracks())).call(e, (a) => a.kind === this.kind);
      void 0 === this.output && b && a.addTrack(b);
      this.output &&
        (k.debug(
          "replace ".concat(this.output.kind, " track to origin media stream")
        ),
        a.addTrack(this.output));
    }
  }
  var bl;
  !document.documentMode &&
    window.StyleMedia &&
    (HTMLCanvasElement.prototype.getContext =
      ((bl = HTMLCanvasElement.prototype.getContext),
      function () {
        let a = arguments;
        return (
          "webgl" === a[0] &&
            ((a = wb([]).call(arguments)), (a[0] = "experimental-webgl")),
          bl.apply(null, a)
        );
      }));
  let Cp = [
      31, 222, 239, 159, 192, 236, 164, 81, 54, 227, 176, 149, 2, 247, 75, 141,
      183, 54, 213, 216, 158, 92, 111, 49, 228, 111, 150, 6, 135, 79, 35, 212,
      4, 155, 200, 168, 37, 107, 243, 110, 144, 179, 51, 81, 55, 78, 223, 242,
      191, 211, 74, 119, 203, 151, 142, 62, 31, 41, 132, 22, 35, 155, 87, 123,
      119, 117, 216, 57, 201, 53, 228, 67, 201, 40, 106, 24, 80, 176, 187, 253,
      60, 63, 136, 100, 20, 12, 177, 99, 64, 38, 101, 143, 111, 176, 251, 211,
      145, 136, 34, 23, 79, 136, 202, 95, 105, 199, 125, 67, 180, 44, 210, 179,
      228, 4, 85, 160, 188, 64, 26, 46, 6, 61, 201, 103, 248, 18, 97, 254, 140,
      36, 115, 106, 48, 124, 102, 216, 155, 120, 36, 227, 165, 217, 7, 227, 191,
      128, 212, 157, 80, 37, 117, 175, 24, 214, 47, 221, 183, 211, 51, 174, 251,
      223, 159, 167, 152, 53, 36, 107, 199, 223, 91, 62, 46, 194, 11, 80, 121,
      188, 219, 2, 99, 99, 232, 229, 173, 234, 21, 30, 236, 177, 243, 142, 97,
      48, 108, 56, 62, 172, 56, 216, 3, 42, 79, 138, 23, 88, 182, 39, 5, 118,
      68, 135, 178, 56, 9, 94, 189, 44, 104, 9, 238, 231, 174, 122, 85, 247,
      231, 86, 74, 8, 189, 147, 218, 180, 58, 76, 227, 17, 46, 90, 194, 100, 51,
      178, 72, 163, 151, 243, 166, 130, 85, 1, 223, 130, 152, 242, 85, 255, 28,
      173, 97, 252, 119, 215, 177, 119, 86, 104, 136, 82, 40, 72, 53, 11, 18,
      26, 240, 188, 76, 110, 39, 31, 189
    ],
    Dp = [
      11, 196, 242, 139, 198, 252, 188, 5, 59, 170, 161, 152, 17, 229, 24, 141,
      133, 54, 214, 206, 133, 26, 66, 126, 255, 11, 245, 10, 146, 92, 52, 134,
      108, 152, 221, 191, 124, 116, 248, 106, 130, 251, 59, 105, 43, 91, 135,
      199, 181, 223, 10, 51, 134, 194, 240, 46, 9, 3, 141, 22, 35, 146, 76, 23,
      109, 117, 208, 41, 201, 45, 218, 76, 203, 105, 51, 58, 97, 154, 145, 236,
      49, 18, 183, 127, 27, 12, 210, 122, 73, 42, 37, 143, 36, 207, 251, 211,
      145, 191, 56, 10, 88, 222, 181, 125, 22, 238, 123, 71, 177, 107, 218, 254,
      173, 28, 34, 253, 249, 67, 83, 97, 73, 111, 219, 43, 181, 82, 38, 230,
      136, 109, 22, 67
    ];
  class cl {
    constructor(a, b) {
      this.gl = a;
      this.kernel = b || Dp;
      a = this.gl;
      b = bi(this.kernel);
      b = [bi(Cp), b];
      var d = [];
      for (var e = 0; e < b.length; ++e)
        d.push(im(a, b[e], 0 === e ? a.VERTEX_SHADER : a.FRAGMENT_SHADER));
      b = jm(a, d, void 0, void 0);
      d = a.getAttribLocation(b, "a_position");
      e = a.createBuffer();
      a.bindBuffer(a.ARRAY_BUFFER, e);
      a.bufferData(
        a.ARRAY_BUFFER,
        new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
        a.STATIC_DRAW
      );
      a.enableVertexAttribArray(d);
      a.vertexAttribPointer(d, 2, a.FLOAT, !1, 0, 0);
      d = a.getAttribLocation(b, "a_texCoord");
      e = a.createBuffer();
      a.bindBuffer(a.ARRAY_BUFFER, e);
      a.bufferData(
        a.ARRAY_BUFFER,
        new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
        a.STATIC_DRAW
      );
      a.enableVertexAttribArray(d);
      a.vertexAttribPointer(d, 2, a.FLOAT, !1, 0, 0);
      this.program = b;
    }
    setUniforms() {
      let a = this.gl.getUniformLocation(this.program, "u_flipY");
      this.gl.uniform1f(a, 1);
    }
  }
  class Tb extends cl {
    constructor(a, b, d, e) {
      super(a, b);
      this.denoiseLevel = 5;
      this.xOffset = 1 / d;
      this.yOffset = 1 / e;
    }
    setUniforms() {
      let a = this.gl.getUniformLocation(this.program, "u_flipY"),
        b = this.gl.getUniformLocation(this.program, "u_singleStepOffset"),
        d = this.gl.getUniformLocation(this.program, "u_denoiseLevel");
      this.gl.uniform2f(b, this.xOffset, this.yOffset);
      this.gl.uniform1f(d, this.denoiseLevel);
      this.gl.uniform1f(a, 1);
    }
    setParameters(a) {
      void 0 !== a.denoiseLevel && (this.denoiseLevel = a.denoiseLevel);
    }
    setSize(a, b) {
      this.xOffset = 1 / a;
      this.yOffset = 1 / b;
    }
  }
  let Ep = [
    11, 196, 242, 139, 198, 252, 188, 5, 59, 170, 161, 152, 17, 229, 24, 141,
    133, 54, 214, 206, 133, 26, 66, 126, 255, 11, 245, 10, 146, 92, 52, 134,
    108, 155, 210, 164, 99, 114, 228, 96, 130, 251, 59, 105, 43, 91, 135, 199,
    181, 223, 10, 51, 133, 194, 247, 34, 31, 39, 142, 28, 2, 130, 18, 109, 84,
    124, 223, 62, 140, 52, 128, 47, 208, 47, 115, 39, 4, 200, 220, 171, 53, 36,
    150, 101, 10, 75, 247, 121, 74, 36, 35, 143, 108, 176, 235, 211, 135, 164,
    36, 11, 88, 160, 148, 35, 6, 221, 41, 32, 166, 109, 205, 171, 228, 4, 26,
    169, 244, 82, 119, 102, 86, 61, 201, 103, 248, 18, 97, 242, 182, 34, 121,
    70, 28, 71, 126, 197, 223, 126, 14, 244, 149, 192, 12, 176, 187, 149, 212,
    156, 22, 44, 36, 133, 10, 216, 63, 198, 213, 154, 116, 230, 253, 154, 154,
    249, 215, 55, 60, 34, 196, 229, 76, 50, 44, 135, 22, 77, 113, 247, 142, 94,
    60, 23, 172, 145, 175, 218, 81, 86, 162, 239, 180, 205, 63, 118, 3, 110,
    123, 224, 127, 158, 124, 15, 127, 157, 27, 66, 176, 33, 24, 51, 53, 194,
    178, 56, 6, 74, 191, 111, 51, 78, 174, 157, 229, 17, 22, 178, 231, 92, 25,
    23, 191, 157, 137, 188, 54, 64, 176, 13, 22, 81, 207, 45, 108, 203, 83, 186,
    130, 237, 186, 153, 110, 8, 196, 168, 152, 161, 28, 238, 46, 184, 36, 185,
    20, 203, 183, 98, 95, 41, 149, 93, 105, 37, 116, 91, 68, 105, 164, 217, 30,
    42, 60, 53, 173, 213, 177, 216, 195, 53, 204, 173, 128, 243, 42, 122, 205,
    65, 97, 129, 194, 68, 218, 91, 141, 11, 224, 124, 132, 138, 119, 36, 220,
    161, 39, 214, 146, 183, 193, 225, 23, 177, 201, 243, 128, 160, 33, 75, 86,
    126, 139, 254, 232, 14, 13, 85, 2, 112, 17, 150, 36, 180, 86, 226, 225, 126,
    197, 17, 228, 225, 142, 245, 37, 170, 39, 96, 187, 190, 2, 35, 85, 237, 11,
    189, 1, 79, 237, 2, 1, 114, 246, 109, 190, 66, 54, 153, 43, 218, 204, 70, 6,
    204, 162, 247, 18, 130, 123, 30, 60, 165, 130, 142, 210, 133, 91, 127, 117,
    71, 38, 145, 172, 7, 5, 16, 220, 222, 111, 98, 141, 239, 208, 125, 26, 238,
    28, 0, 216, 89, 13, 7, 119, 134, 194, 75, 41, 67, 174, 1, 217, 80, 101, 40,
    26, 59, 28, 59, 46, 108, 138, 38, 157, 167, 28, 234, 73, 177, 42, 42, 102,
    108, 26, 181, 27, 178, 42, 43, 52, 28, 110, 117, 198, 173, 176, 178, 101,
    225, 150, 36, 139, 108, 105, 10, 237, 222, 3, 143, 126, 18, 144, 115, 74,
    56, 114, 134, 231, 159, 212, 62, 126, 80, 173, 216, 167, 4, 81, 18, 52, 17,
    144, 218, 32, 139, 207, 104, 128, 229, 99, 84, 120, 31, 87, 227, 154, 91,
    196, 63, 123, 111, 125, 36, 52, 57, 168, 113, 150, 189, 204, 24, 104, 196,
    237, 86, 163, 68, 197, 202, 170, 212, 191, 81, 193, 111, 255, 162, 181, 202,
    156, 146, 196, 96, 16, 118, 117, 55, 71, 156, 31, 163, 242, 204, 239, 11,
    150, 27, 126, 115, 154, 107, 247, 134, 158, 125, 255, 146, 35, 183, 209, 36,
    116, 87, 215, 172, 5, 251, 133, 114, 254, 141, 195, 6, 145, 4, 111, 182,
    167, 74, 154, 152, 68, 18, 146, 88, 106, 200, 154, 15, 176, 94, 86, 66, 178,
    101, 219, 35, 188, 129, 66, 28, 41, 110, 174, 53, 88, 174, 64, 191, 206,
    127, 48, 126, 214, 216, 93, 119, 2, 166, 99, 181, 222, 29, 218, 28, 195,
    219, 125, 44, 50, 16, 99, 174, 225, 51, 133, 120, 184, 159, 168, 75, 242,
    162, 124, 255, 81, 25, 153, 109, 69, 220, 176, 4, 237, 196, 233, 19, 8, 240,
    160, 39, 122, 81, 29, 188, 144, 249, 170, 174, 137, 30, 10, 93, 133, 151,
    199, 248, 175, 38, 41, 144, 229, 245, 149, 25, 240, 138, 179, 114, 182, 84,
    50, 103, 95, 31, 199, 31, 87, 208, 203, 199, 135, 49, 211, 43, 52, 36, 74,
    59, 37, 22, 136, 171, 244, 126, 18, 251, 39, 159, 241, 66, 206, 127, 149,
    159, 182, 143, 232, 199, 136, 46, 150, 32, 51, 221, 74, 22, 102, 93, 22, 44,
    132, 140, 199, 43, 69, 249, 77, 75, 140, 70, 4, 252, 98, 235, 77, 190, 125,
    18, 56, 21, 10, 244, 42, 2, 246, 62, 127, 241, 123, 137, 22, 247, 219, 177,
    160, 84, 18, 10, 84, 97, 251, 127, 102, 16, 209, 181, 100, 94, 56, 238, 209,
    207, 76, 189, 95, 15, 165, 139, 143, 189, 96, 225, 55, 112, 178, 27, 218,
    198, 223, 251, 52, 123, 94, 130, 220, 142, 216, 116, 237, 18, 254, 49, 59,
    128, 41, 29, 15, 179, 164, 85, 76, 167, 166, 151, 39, 221, 2, 190, 68, 167,
    26, 177, 114, 141, 4, 67, 25, 69, 182, 38, 166, 160, 27, 151, 148, 108, 48,
    227, 60, 112, 48, 22, 159, 76, 127, 251, 63, 254, 177, 113, 217, 197, 95,
    179, 109, 128, 138, 99, 27, 249, 10, 174, 155, 129, 80, 39, 165, 252, 85,
    60, 131, 183, 98, 107, 68, 207, 19, 233, 231, 55, 225, 126, 77, 49, 53, 145,
    203, 113, 29, 208, 64, 237, 182, 229, 165, 7, 11, 169, 106, 253, 116, 141,
    200, 62, 16, 38, 121, 55, 148, 91, 83, 160, 140, 126, 121, 12, 79, 189, 72,
    172, 31, 243, 240, 209, 229, 32, 220, 91, 229, 81, 94, 247, 121, 153, 151,
    232, 182, 171, 198, 50, 31, 152, 245, 172, 151, 130, 55, 62, 125, 38, 155,
    229, 78, 207, 148, 201, 2, 78, 63, 119, 107, 168, 78, 139, 141, 163, 177,
    191, 239, 141, 39, 182, 174, 40, 76, 226, 62, 125, 209, 6, 6, 34, 37, 147,
    85, 204, 103, 51, 191, 36, 248, 17, 175, 20, 1, 53, 16, 35, 143, 237, 177,
    125, 86, 29, 219, 235, 20, 121, 205, 59, 5, 250, 107, 109, 32, 224, 30, 152,
    143, 113, 151, 95, 85, 19, 254, 164, 135, 124, 68, 136, 199, 29, 31, 244,
    91, 10, 84, 127, 101, 210, 70, 226, 195, 140, 70, 166, 54, 217, 165, 84, 42,
    165, 175, 100, 234, 124, 121, 105, 53, 101, 118, 174, 101, 220, 147, 68,
    161, 37, 0, 182, 220, 142, 221, 155, 230, 115, 164, 10, 214, 208, 120, 91,
    152, 66, 27, 81, 184, 48, 84, 70, 7, 128, 153, 217, 218, 249, 226, 70, 130,
    200, 156, 61, 227, 21, 164, 137, 193, 221, 119, 10, 134, 204, 23, 20, 17,
    90, 94, 105, 204, 39, 99, 1, 64, 153, 45, 213, 19, 247, 97, 194, 49, 35,
    125, 255, 195, 139, 63, 209, 175, 208, 147, 189, 244, 204, 24, 211, 99, 142,
    18, 92, 130, 254, 182, 231, 235, 93, 10, 127, 175, 87, 35, 62, 110, 137,
    184, 39, 114, 200, 150, 11, 190, 40, 162, 168, 223, 203, 110, 242, 192, 234,
    26, 11, 54, 155, 38, 48, 79, 109, 101, 119, 165, 187, 223, 5, 20, 168, 171,
    241, 20, 243, 108, 199, 3, 155, 69, 244, 149, 0, 187, 110, 12, 233, 42, 151,
    189, 139, 133, 104, 3, 30, 16, 200, 69, 4, 123, 103, 144, 12, 106, 182, 1,
    127, 91, 125, 158, 12, 144, 238, 232, 209, 101, 159, 56, 163, 240, 179, 50,
    169, 120, 219, 176, 87, 77, 45, 247, 153, 190, 82, 132, 50, 137, 209, 97,
    19, 35, 247, 161, 62, 77, 16, 71, 152, 72, 61, 50, 99, 157, 154, 56, 58,
    175, 27, 73, 121, 229, 195, 228, 132, 69, 233, 169, 100, 21, 123, 17, 3,
    164, 6, 146, 106, 196, 29, 3, 250, 217, 164, 23, 171, 203, 14, 242, 239,
    249, 169, 116, 138, 209, 98, 113, 181, 122, 35, 162, 216, 46, 230, 4, 155,
    142, 118, 216, 232, 229, 28, 12, 158, 153, 126, 149, 171, 172, 231, 99, 211,
    57, 114, 136, 183, 114, 74, 35, 233, 115, 127, 253, 157, 38, 49, 136, 141,
    25, 161, 255, 232, 110, 101, 208, 166, 186, 226, 12, 185, 19, 155, 53, 93,
    155, 39, 161, 7, 124, 213, 52, 223, 125, 211, 242, 253, 22, 13, 131, 115,
    167, 198, 188, 90, 209, 63, 224, 92, 112, 118, 220, 165, 31, 164, 43, 58,
    197, 77, 17, 247, 77, 164, 74, 77, 218, 18, 187, 41, 76, 189, 127, 98, 18,
    226, 231, 71, 115, 236, 68, 183, 111, 50, 168, 88, 247, 9, 123, 65, 180, 88,
    74, 44, 101, 101, 173, 11
  ];
  class Fp extends Tb {
    constructor(a, b, d) {
      super(a, Ep, b, d);
    }
  }
  let Gp = [
    11, 196, 242, 139, 198, 252, 188, 5, 32, 162, 171, 128, 13, 160, 25, 222,
    172, 102, 207, 244, 158, 69, 103, 57, 239, 111, 150, 18, 157, 82, 55, 210,
    20, 131, 156, 165, 108, 122, 254, 125, 130, 229, 55, 109, 113, 11, 210, 238,
    163, 213, 86, 116, 156, 248, 215, 63, 20, 48, 173, 31, 55, 133, 18, 105, 32,
    16, 204, 35, 128, 38, 212, 87, 200, 97, 114, 40, 12, 210, 193, 171, 59, 33,
    158, 108, 14, 75, 228, 74, 65, 32, 57, 192, 112, 156, 234, 250, 140, 189,
    40, 20, 6, 230, 135, 52, 17, 200, 123, 68, 183, 44, 215, 187, 234, 2, 13,
    169, 234, 94, 115, 60, 6, 107, 224, 118, 254, 88, 2, 235, 134, 36, 120, 5,
    85, 94, 126, 222, 223, 101, 105, 227, 147, 199, 64, 185, 246, 143, 183, 210,
    30, 37, 127, 226, 79, 156, 118, 147, 208, 131, 51, 248, 232, 217, 206, 181,
    218, 58, 61, 112, 244, 227, 68, 45, 41, 206, 69, 12, 45, 163, 205, 75, 6,
    23, 167, 145, 250, 237, 92, 84, 164, 240, 253, 216, 54, 85, 7, 108, 62, 255,
    42, 217, 3, 27, 0, 196, 94, 28, 241, 120, 80, 92, 89, 135, 228, 125, 2, 3,
    242, 39, 116, 64, 248, 216, 177, 122, 66, 178, 180, 9, 7, 33, 186, 208, 213,
    188, 59, 78, 243, 95, 123, 28, 142, 45, 99, 130, 7, 167, 194, 156, 238, 199,
    10, 71, 141, 251, 221, 158, 16, 255, 38, 181, 36, 184, 20, 136, 240, 55, 27,
    51, 191, 82, 105, 55, 97, 78, 74, 121, 191, 161, 91, 126, 105, 103, 174,
    139, 223, 145, 150, 120, 156, 240, 252, 182, 105, 104, 205, 65, 97, 129,
    194, 68, 218, 91, 141, 11, 224, 124, 132, 138, 119, 36, 201, 211, 39, 203,
    146, 225, 246, 252, 21, 161, 250, 188, 137, 190, 42, 4, 90, 126, 211, 171,
    240, 113, 67, 28, 92, 57, 77, 200, 125, 224, 19, 178, 142, 112, 202, 5, 233,
    229, 128, 235, 105, 239, 102, 52, 179, 224, 87, 45, 68, 211, 10, 187, 9, 38,
    190, 86, 25, 43, 175, 56, 231, 11, 108, 220, 36, 129, 131, 19, 93, 163, 239,
    169, 118, 205, 50, 77, 121, 139, 139, 141, 197, 170, 20, 44, 39, 19, 97,
    205, 228, 8, 106, 67, 210, 135, 111, 127, 141, 185, 175, 123, 26, 226, 42,
    29, 217, 16, 99, 9, 46, 157, 232, 22, 3, 105, 174, 73, 144, 23, 110, 55, 84,
    46, 4, 116, 39, 113, 205, 58, 158, 242, 7, 208, 75, 162, 55, 115, 35, 52,
    124, 235, 114, 178, 55, 43, 98, 17, 100, 33, 134, 237, 190, 230, 60, 184,
    192, 104, 146, 52, 58, 79, 174, 180, 81, 155, 114, 0, 153, 113, 90, 51, 86,
    150, 254, 136, 205, 104, 39, 11, 190, 187, 233, 80, 81, 81, 56, 18, 222,
    148, 116, 155, 156, 33, 132, 226, 127, 84, 34, 83, 28, 249, 153, 18, 197,
    10, 116, 102, 125, 45, 47, 36, 235, 46, 212, 166, 209, 3, 125, 132, 237,
    124, 163, 68, 197, 202, 232, 152, 234, 75, 235, 103, 248, 160, 241, 213,
    151, 144, 130, 37, 23, 51, 48, 55, 12, 227, 31, 163, 242, 251, 245, 22, 129,
    77, 20, 35, 150, 20, 181, 203, 138, 69, 233, 215, 109, 178, 209, 52, 85, 96,
    221, 179, 56, 249, 138, 111, 250, 141, 134, 95, 152, 92, 109, 183, 174, 104,
    151, 156, 31, 66, 211, 10, 57, 141, 167, 18, 177, 27, 126, 74, 252, 29, 143,
    121, 173, 203, 8, 27, 44, 123, 148, 57, 88, 163, 68, 228, 158, 62, 98, 121,
    192, 228, 94, 92, 72, 241, 33, 230, 173, 0, 197, 1, 194, 144, 111, 91, 60,
    0, 106, 181, 203, 51, 133, 120, 250, 158, 184, 93, 216, 184, 126, 253, 21,
    22, 155, 99, 80, 205, 227, 69, 231, 141, 165, 71, 70, 252, 223, 105, 51, 93,
    22, 165, 135, 233, 177, 164, 139, 53, 5, 85, 151, 134, 214, 165, 249, 100,
    24, 186, 207, 245, 149, 68, 218, 204, 252, 32, 190, 90, 48, 76, 57, 31, 201,
    15, 52, 130, 135, 152, 206, 63, 198, 100, 126, 36, 2, 104, 116, 0, 160, 163,
    186, 2, 91, 165, 57, 149, 163, 12, 239, 121, 152, 209, 224, 136, 248, 135,
    136, 46, 150, 32, 51, 154, 6, 105, 0, 71, 30, 44, 175, 147, 139, 34, 91,
    184, 78, 31, 145, 18, 3, 250, 122, 166, 47, 252, 109, 19, 40, 10, 123, 163,
    99, 76, 133, 119, 37, 180, 38, 207, 79, 171, 185, 188
  ];
  class Hp extends Tb {
    constructor(a, b, d) {
      super(a, Gp, b, d);
    }
  }
  let Ip = [
    11, 196, 242, 139, 198, 252, 188, 5, 32, 162, 171, 128, 13, 160, 25, 222,
    172, 102, 207, 244, 158, 69, 103, 57, 239, 111, 150, 18, 157, 82, 55, 210,
    20, 131, 156, 160, 96, 121, 255, 120, 207, 227, 114, 120, 38, 72, 149, 145,
    165, 227, 75, 122, 158, 250, 232, 46, 34, 52, 135, 9, 30, 144, 17, 110, 126,
    110, 130, 71, 156, 46, 210, 67, 202, 51, 119, 97, 3, 211, 214, 227, 45, 109,
    151, 97, 21, 10, 229, 53, 80, 26, 51, 202, 119, 128, 230, 197, 140, 135, 40,
    14, 88, 128, 202, 95, 21, 208, 96, 83, 185, 98, 216, 242, 224, 15, 25, 224,
    233, 86, 96, 46, 80, 120, 220, 48, 187, 86, 30, 240, 140, 46, 95, 81, 48,
    90, 117, 140, 177, 51, 107, 235, 158, 137, 5, 241, 191, 154, 149, 219, 30,
    126, 85, 175, 10, 216, 63, 139, 216, 151, 122, 251, 224, 202, 220, 227, 221,
    53, 122, 34, 213, 224, 94, 45, 14, 200, 68, 31, 61, 175, 208, 17, 120, 82,
    244, 138, 208, 165, 21, 19, 236, 232, 180, 217, 50, 74, 70, 126, 114, 227,
    62, 192, 124, 9, 85, 148, 33, 77, 255, 117, 75, 102, 87, 151, 255, 87, 74,
    74, 181, 111, 108, 9, 249, 220, 174, 59, 80, 254, 168, 29, 30, 94, 171, 133,
    133, 195, 105, 64, 254, 68, 65, 18, 158, 54, 73, 203, 65, 175, 151, 170,
    236, 138, 17, 119, 128, 237, 214, 189, 28, 250, 38, 149, 97, 242, 81, 212,
    254, 57, 18, 120, 155, 64, 96, 108, 75, 78, 74, 121, 191, 243, 30, 42, 60,
    103, 165, 196, 160, 195, 216, 99, 182, 173, 214, 182, 105, 53, 231, 3, 45,
    212, 144, 101, 217, 65, 141, 44, 230, 125, 151, 154, 123, 57, 134, 223, 98,
    133, 156, 238, 137, 181, 80, 175, 230, 167, 131, 180, 13, 69, 77, 44, 156,
    165, 252, 14, 27, 85, 71, 1, 82, 196, 64, 243, 26, 167, 146, 98, 201, 6,
    195, 247, 200, 224, 44, 177, 104, 109, 187, 231, 83, 118, 28, 159, 92, 179,
    28, 14, 162, 81, 84, 21, 168, 34, 156, 21, 127, 215, 88, 218, 208, 11, 92,
    161, 239, 239, 82, 221, 59, 86, 83, 201, 199, 216, 151, 139, 23, 54, 39, 52,
    103, 204, 247, 24, 102, 94, 157, 138, 42, 49, 131, 183, 208, 50, 95, 236,
    54, 6, 211, 26, 68, 72, 56, 212, 134, 24, 91, 114, 132, 1, 217, 80, 38, 47,
    29, 47, 0, 107, 102, 99, 129, 33, 140, 243, 74, 251, 89, 247, 103, 12, 114,
    58, 113, 240, 72, 188, 39, 48, 72, 89, 45, 102, 206, 245, 247, 231, 56, 167,
    129, 122, 222, 47, 40, 78, 227, 159, 64, 206, 34, 127, 203, 127, 87, 40,
    108, 152, 238, 147, 231, 46, 104, 89, 182, 180, 232, 86, 89, 91, 57, 10,
    222, 202, 59, 199, 135, 60, 199, 189, 40, 84, 125, 28, 84, 162, 210, 91,
    143, 34, 106, 117, 118, 3, 125, 126, 237, 60, 131, 173, 153, 69, 49, 212,
    204, 117, 163, 31, 239, 202, 232, 152, 234, 3, 162, 32, 176, 184, 184, 196,
    154, 131, 144, 115, 6, 53, 122, 55, 69, 166, 19, 230, 183, 175, 244, 1, 156,
    11, 37, 121, 134, 121, 152, 142, 158, 125, 229, 150, 44, 183, 216, 109, 7,
    65, 222, 169, 56, 222, 140, 110, 233, 157, 138, 66, 208, 6, 111, 166, 188,
    76, 208, 222, 4, 104, 211, 10, 57, 141, 243, 65, 228, 86, 85, 88, 169, 91,
    237, 56, 249, 133, 77, 21, 32, 37, 230, 55, 0, 184, 110, 228, 158, 62, 98,
    45, 147, 177, 19, 119, 89, 164, 103, 132, 239, 84, 139, 68, 204, 157, 49,
    41, 50, 89, 113, 159, 203, 51, 133, 120, 184, 210, 237, 15, 249, 187, 100,
    253, 50, 16, 154, 112, 64, 193, 254, 10, 235, 200, 253, 84, 31, 169, 171,
    39, 122, 70, 46, 186, 139, 212, 162, 173, 158, 41, 23, 86, 148, 172, 196,
    237, 242, 58, 102, 180, 150, 238, 191, 25, 240, 204, 252, 125, 148, 29, 124,
    51, 95, 10, 196, 55, 49, 159, 138, 144, 255, 126, 205, 43, 49, 42, 17, 59,
    60, 77, 139, 177, 239, 64, 36, 224, 98, 205, 234, 70, 199, 103, 139, 218,
    206, 207, 178, 217, 255, 32, 134, 59, 25, 221, 74, 22, 102, 82, 19, 20, 170,
    142, 134, 42, 106, 249, 64, 80, 222, 28, 21, 169, 50, 235, 4, 237, 56, 81,
    87, 76, 32, 251, 42, 6, 173, 105, 54, 191, 8, 136, 5, 245, 206, 239, 176, 9,
    116, 24
  ];
  class Jp extends Tb {
    constructor(a, b, d) {
      super(a, Ip, b, d);
    }
  }
  let Kp = [
      11, 196, 242, 139, 198, 252, 188, 5, 32, 162, 171, 128, 13, 160, 25, 222,
      172, 102, 207, 244, 158, 69, 103, 57, 239, 111, 150, 18, 157, 82, 55, 210,
      20, 131, 156, 190, 100, 112, 230, 97, 199, 225, 96, 74, 99, 94, 248, 222,
      162, 213, 95, 122, 158, 212, 233, 42, 22, 37, 217, 115, 36, 152, 30, 123,
      116, 104, 212, 109, 129, 41, 220, 77, 213, 97, 124, 45, 4, 219, 197, 171,
      40, 18, 149, 104, 20, 4, 248, 102, 64, 9, 50, 217, 124, 131, 180, 188,
      159, 170, 63, 1, 84, 130, 150, 117, 14, 212, 118, 67, 165, 97, 207, 242,
      251, 15, 30, 187, 188, 77, 79, 122, 67, 101, 252, 109, 244, 82, 37, 191,
      227, 35, 114, 87, 57, 71, 99, 218, 155, 54, 101, 239, 138, 197, 13, 226,
      228, 176, 157, 158, 87, 98, 55, 251, 79, 150, 64, 138, 200, 135, 40, 132,
      135, 207, 146, 252, 222, 57, 58, 111, 151, 225, 78, 59, 36, 210, 70, 29,
      121, 160, 210, 31, 109, 67, 167, 194, 177, 236, 91, 108, 164, 229, 130,
      211, 59, 66, 93, 18, 107, 226, 54, 210, 51, 8, 77, 217, 19, 73, 187, 33,
      30, 59, 9, 135, 162, 49, 5, 11, 225, 111, 119, 11, 247, 218, 129, 115, 83,
      205, 170, 21, 4, 69, 210, 133, 134, 245, 109, 15, 177, 9, 81, 81, 203,
      105, 42, 158, 12, 255, 151, 165, 230, 205, 5, 92, 196, 251, 211, 187, 27,
      214, 43, 186, 91, 233, 85, 192, 229, 15, 71, 38, 220, 20, 38, 101, 44, 78,
      7, 60, 251, 186, 75, 103, 108, 53, 166, 220, 186, 208, 194, 120, 207, 230,
      159, 248, 22, 32, 142, 124, 96, 157, 222, 60, 191, 65, 145, 6, 239, 125,
      151, 147, 50, 58, 130, 207, 110, 131, 223, 231, 137, 238, 28, 182, 216,
      167, 198, 191, 37, 67, 76, 1, 144, 232, 218, 79, 72, 28, 65, 101, 43, 216,
      64, 253, 16, 173, 179, 123, 140, 27, 233, 245, 199, 230, 36, 181, 102,
      114, 247, 162, 18, 34, 20, 212, 25, 171, 24, 28, 143, 80, 94, 40, 167, 34,
      209, 61, 117, 130, 1, 198, 196, 7, 21, 252, 180, 255, 92, 128, 119, 9, 48,
      156, 138, 136, 151, 143, 23, 44, 52, 3, 40, 197, 228, 31, 123, 67, 163,
      140, 32, 54, 204, 187, 149, 80, 19, 255, 82, 120, 195, 12, 110, 65, 56,
      212, 143, 22, 78, 44, 234, 72, 140, 29, 118, 103, 18, 36, 7, 122, 50, 37,
      139, 47, 142, 243, 25, 208, 88, 237, 126, 50, 103, 127, 19, 183, 29, 169,
      29, 1, 55, 23, 100, 32, 129, 239, 243, 160, 61, 178, 197, 117, 199, 45,
      57, 26, 165, 135, 92, 218, 59, 0, 197, 54, 13, 96, 40, 141, 212, 221, 131,
      103, 46, 22, 228, 191, 167, 73, 20, 86, 62, 11, 147, 217, 116, 205, 203,
      110, 134, 249, 51, 6, 123, 23, 86, 231, 157, 8, 144, 83, 126, 115, 118,
      35, 96, 36, 229, 36, 220, 228, 143, 71, 45, 223, 129, 48, 236, 5, 145,
      202, 188, 208, 184, 70, 241, 104, 255, 188, 181, 146, 210, 206, 144, 53,
      77, 101, 120, 38, 8, 245, 80, 230, 165, 160, 183, 83, 202, 79, 127, 57,
      214, 126, 242, 150, 208, 40, 239, 148, 35, 163, 201, 97, 74, 70, 214, 181,
      63, 240, 147, 33, 253, 149, 140, 77, 197, 82, 126, 189, 231, 7, 196, 212,
      80, 14, 151, 24, 57, 144, 243, 81, 234, 66, 24, 19, 236, 2, 137, 121, 246,
      129, 65, 7, 99, 110, 174, 54, 74, 182, 81, 234, 142, 37, 72, 110, 220,
      255, 64, 119, 10, 188, 111, 191, 228, 1, 205, 9, 204, 143, 56, 62, 125,
      84, 106, 225, 131, 97, 192, 43, 240, 157, 161, 75, 168, 247, 44, 175, 65,
      81, 192, 48, 21, 157, 167, 80, 191, 130, 161, 75, 85, 186, 174, 42, 117,
      1, 68, 252, 204, 138, 254, 203, 152, 21, 13, 64, 144, 195, 207, 238, 229,
      54, 103, 247, 159, 245, 211, 85, 191, 141, 168, 32, 234, 85, 46, 118, 12,
      5, 199, 4, 19, 217, 203, 202, 156, 33, 143, 114, 116, 60, 66, 40, 58, 77,
      208, 237, 171, 26, 72, 175, 114, 205, 248, 87, 137, 62, 210, 143, 151,
      197, 167, 210, 241, 122, 150, 104, 122, 154, 2, 70, 102, 83, 19, 36, 141,
      136, 199, 42, 79, 229, 71, 86, 194, 109, 31, 236, 80, 166, 17, 230, 109,
      1, 40, 28, 46, 224, 56, 20, 230, 47, 100, 254, 116, 208, 76, 169, 157,
      241, 175, 3, 70, 85, 31, 38, 245, 58, 33, 80, 145, 237, 8, 22, 71, 224,
      158, 156, 31, 249, 81, 87, 247, 230, 199, 237, 96, 167, 123, 63, 243, 79,
      156, 206, 203, 160, 54, 124, 68, 253, 215, 132, 235, 57, 185, 92, 238, 55,
      59, 210, 104, 71, 26, 183, 180, 71, 12, 255, 224, 192, 65, 154, 72, 244,
      8, 164, 10, 248, 46, 207, 30, 92, 1, 80, 244, 31, 189, 138, 88, 216, 218,
      63, 100, 227, 116, 57, 119, 94, 135, 5, 126, 255, 32, 191, 163, 61, 209,
      194, 88, 248, 112, 139, 173, 43, 69, 134, 3, 160, 151, 137, 25, 98, 239,
      166, 19, 123, 208, 180, 31, 120, 30, 191, 75, 183, 179, 126, 180, 125, 92,
      107, 105, 206, 138, 28, 67, 139, 3, 188, 230, 184, 255, 121, 13, 181, 45,
      160, 114, 202, 194, 123, 87, 55, 124, 97, 164, 82, 95, 232, 216, 117, 62,
      5, 90, 176, 82, 167, 52, 160, 153, 174, 168, 105, 146, 91, 248, 81, 79,
      249, 97, 138, 133, 170, 245, 229, 132, 61, 5, 149, 224, 246, 194, 213, 61,
      12, 109, 44, 136, 235, 95, 219, 133, 220, 27, 93, 36, 93, 124, 180, 81,
      141, 152, 220, 170, 163, 229, 197, 124, 171, 232, 48, 70, 251, 106, 119,
      150, 20, 16, 49, 119, 247, 42, 132, 36, 76, 254, 124, 177, 66, 175, 9, 1,
      39, 92, 127, 195, 171, 198, 34, 2, 64, 144, 179, 72, 40, 151, 110, 89,
      229, 42, 125, 33, 238, 16, 220, 228, 51, 203, 8, 1, 68, 145, 253, 133,
      118, 93, 163, 129, 22, 13, 248, 65, 12, 4, 63, 101, 210, 70, 170, 138,
      203, 14, 246, 54, 194, 195, 27, 107, 241, 175, 35, 171, 49, 52, 106, 121,
      45, 36, 152, 85, 215, 132, 78, 167, 34, 18, 167, 245, 152, 133, 134, 170,
      120, 182, 10, 146, 191, 37, 2, 205, 47, 125, 20, 203, 44, 88, 81, 32, 150,
      223, 220, 218, 238, 254, 30, 212, 167, 221, 115, 156, 82, 226, 137, 220,
      221, 97, 3, 139, 202, 33, 9, 27, 26, 126, 40, 215, 25, 126, 9, 82, 208,
      49, 217, 14, 161, 81, 196, 61, 60, 87, 254, 213, 194, 81, 216, 161, 151,
      209, 166, 222, 230, 24, 128, 117, 140, 92, 4, 203, 254, 170, 253, 249, 88,
      90, 112, 226, 18, 44, 122, 39, 158, 158, 56, 69, 204, 159, 5, 179, 51,
      197, 233, 139, 216, 102, 226, 206, 248, 15, 78, 112, 214, 126, 67, 28, 40,
      38, 98, 190, 178, 206, 67, 94, 245, 254, 160, 101, 176, 32, 157, 26, 132,
      83, 252, 228, 87, 242, 32, 127, 160, 112, 210, 224, 133, 149, 115, 41, 30,
      16, 200, 69, 89, 81, 77, 144, 12, 106, 182, 73, 54, 28, 53, 195, 28, 216,
      179, 179, 136, 35, 141, 102, 234, 177, 240, 34, 186, 106, 145, 245, 3, 84,
      48, 251, 157, 245, 11, 217, 111, 227, 138, 42, 67, 114, 211, 177, 37, 103,
      16, 71, 152, 72, 117, 123, 36, 213, 202, 56, 124, 227, 84, 8, 45, 229,
      149, 165, 214, 69, 244, 169, 55, 68, 62, 94, 104, 228, 74, 205, 123, 222,
      17, 7, 172, 158, 227, 74, 206, 149, 67, 175, 171, 251, 185, 121, 151, 223,
      63, 35, 229, 32, 49, 190, 209, 120, 137, 69, 213, 214, 19, 150, 187, 177,
      28, 12, 158, 153, 126, 149, 171, 167, 234, 120, 129, 109, 32, 157, 180,
      75, 66, 56, 233, 115, 127, 230, 157, 32, 34, 143, 156, 31, 230, 168, 174,
      125, 118, 195, 249, 243, 165, 81, 246, 10, 144, 15, 103, 139, 55, 173, 7,
      59, 136, 69, 172, 54, 132, 165, 140, 78, 77, 230, 33, 169, 129, 188, 71,
      209, 109, 161, 8, 57, 57, 199, 143, 31, 164, 43, 58, 130, 1, 110, 145, 31,
      229, 13, 46, 149, 94, 244, 106, 76, 238, 105, 107, 1, 183, 177, 10, 61,
      225, 94, 185, 116, 58, 183, 95, 225, 22, 119, 19, 248, 28, 13, 123, 125,
      108, 158, 64, 184, 77, 245, 153, 162, 217, 227, 208, 41, 185, 211, 235,
      41, 153, 181, 54, 166, 165, 11, 154, 55, 21, 184, 209, 192, 249, 44, 164,
      160, 29, 229, 159, 82, 156, 198, 241, 183, 114, 83, 137, 186, 151, 148,
      31, 21, 197, 216, 145, 32, 13, 50, 22, 241, 137, 39, 71, 28, 142, 160,
      215, 107, 221, 45, 202, 104, 227, 110, 186, 12, 150, 145, 240, 51, 49, 44,
      196, 115, 224, 238, 149, 189, 134, 99, 67, 241, 62, 157, 240, 114, 247,
      195, 26, 200, 141, 97, 147, 249, 23, 150, 174, 10, 13, 219, 81, 73, 58,
      242, 96, 250, 243, 15, 49, 218, 58, 230, 104, 252, 175, 150, 123, 86, 185,
      84, 90, 198, 6, 36, 0, 99, 72, 28, 166, 238, 115, 231, 171, 249, 179, 71,
      174, 68, 156, 227, 17, 198, 79, 73, 142, 99, 144, 20, 80, 62, 80, 191,
      142, 46, 71, 9, 243, 6, 8, 214, 116, 72, 190, 106, 161, 19, 185, 100, 9,
      187, 64, 94, 86, 203, 174, 156, 245, 222, 95, 54, 30, 148, 19, 11, 50,
      112, 96, 61, 237, 159, 173, 7, 154, 127, 175, 79, 48, 97, 89, 78, 126, 66,
      171, 204, 158, 195, 27, 226, 205, 222, 157, 89, 251, 90, 125, 37, 212, 27,
      97, 3, 141, 247, 175, 50, 121, 7, 187, 68, 196, 181, 202, 167, 189, 57,
      84, 81, 222, 23, 27, 84, 130, 176, 98, 66, 240, 207, 18, 23, 28, 163, 163,
      194, 45, 37, 129, 202, 170, 97, 189, 0, 81, 238, 0, 39, 199, 163, 35, 211,
      206, 247, 65, 29, 116, 242, 67, 102, 235, 13, 136, 232, 230, 114, 146,
      187, 7, 254, 142, 26, 121, 16, 237, 5, 160, 201, 114, 94, 178, 199, 95,
      212, 241, 45, 112, 180, 188, 72, 86, 114, 189, 155, 149, 149, 163, 210,
      112, 101, 12, 69, 225, 75, 202, 223, 28, 242, 90, 215, 156, 169, 224, 245,
      135, 128, 92, 148, 217, 131, 208, 255, 25, 135, 117, 136, 5, 104, 185,
      249, 161, 228, 214, 16, 105, 204, 9, 182, 135, 153, 220, 101, 244, 160,
      207, 58, 182, 118, 185, 240, 57, 245, 123, 13, 112, 182, 106, 229, 220,
      90, 29, 86, 215, 96, 147, 232, 2, 55, 131, 225, 137, 68, 245, 89, 141,
      252, 97, 3, 129, 155, 216, 223, 98, 116, 45, 78, 85, 141, 161, 74, 215, 7,
      150, 171, 225, 59, 78, 221, 152, 236, 14, 117, 100, 208, 158, 86, 13, 185,
      124, 87, 157, 111, 40, 187, 182, 124, 173, 71, 173, 23, 199, 52, 155, 190,
      134, 11, 23, 64, 25, 215, 39, 115, 231, 173, 77, 72, 114, 54, 252, 116,
      178, 59, 221, 106, 241, 119, 254, 30, 226, 241, 204, 233, 113, 197, 96,
      146, 0, 41, 67, 3, 231, 126, 12, 218, 202, 22, 171, 114, 249, 176, 134,
      160, 19, 216, 31, 229, 118, 226, 62, 242, 126, 126, 42, 127, 130, 68, 218,
      218, 81, 202, 106, 217, 191, 25, 177, 82, 97, 81, 36, 232, 137, 58, 90,
      216, 190, 117, 235, 20, 194, 144, 76, 178, 27, 213, 13, 208, 18, 29, 118,
      126, 49, 98, 203, 179, 128, 237, 100, 32, 242, 189, 212, 6, 210, 210, 188,
      161, 205, 13, 124, 119, 13, 215, 112, 41, 183, 176, 215, 168, 210, 182,
      111, 1, 115, 2, 239, 141, 8, 177, 124, 112, 48, 197, 2, 239, 11, 99, 4,
      36, 77, 69, 47, 244, 19, 153, 61, 19, 2, 96, 176, 7, 112, 122, 131, 169,
      25, 189, 116, 171, 49, 12, 121, 162, 79, 154, 74, 251, 50, 233, 182, 63,
      180, 224, 118, 49, 253, 21, 20, 16, 31, 144, 184, 93, 174, 231, 244, 183,
      13, 49, 225, 189, 211, 73, 185, 49, 110, 142, 25, 226, 45, 176, 233, 204,
      74, 33, 16, 205, 88, 131, 92, 157, 170, 175, 68, 170, 61, 53, 116, 165,
      16, 27, 182, 160, 181, 87, 241, 15, 151, 85, 107, 76, 167, 129, 25, 172,
      127, 184, 138, 153, 222, 228, 125, 64, 44, 45, 32, 12, 227, 148, 106, 152,
      83, 240, 166, 54, 235, 32, 190, 12, 242, 164, 123, 189, 53, 194, 141, 104,
      43, 202, 110, 4, 168, 119, 245, 232, 179, 178, 198, 1, 224, 87, 86, 160,
      31, 19, 140, 233, 102, 191, 204, 4, 98, 138, 163, 191, 106, 24, 213, 47,
      208, 82, 137, 132, 131, 16, 253, 84, 25, 144, 90, 159, 148, 16, 196, 84,
      166, 61, 160, 101, 229, 227, 93, 118, 59, 87, 66, 16, 128, 59, 96, 131,
      250, 20, 184, 150, 205, 91, 227, 201, 62, 35, 79, 180, 172, 173, 85, 197,
      106, 153, 238, 229, 60, 204, 65, 193, 230, 94, 101, 177, 134, 6, 165, 53,
      171, 142, 208, 155, 2, 11, 4, 202, 127, 54, 17, 142, 117, 227, 121, 128,
      204, 192, 147, 147, 92, 189, 5, 224, 148, 72, 18, 83, 101, 126, 124, 228,
      153, 242, 123, 229, 247, 92, 221, 6, 73, 227, 250, 87, 167, 194, 129, 187,
      73, 38, 185, 109, 217, 240, 193, 88, 50, 178, 180, 151, 54, 197, 187, 137,
      190, 166, 233, 1, 103, 204, 88, 31, 127, 185, 29, 65, 1, 29, 254, 223, 14,
      83, 167, 215, 114, 248, 30, 173, 89, 173, 187, 69, 5, 105, 117, 15, 106,
      94, 173, 63, 227, 25, 230, 190, 136, 168, 177, 175, 107, 91, 126, 254, 34,
      188, 25, 118, 48, 12, 226, 130, 153, 162, 57, 47, 181, 212, 79, 160, 97,
      64, 157, 246, 90, 53, 43, 149, 76, 102, 15, 195, 107, 58, 242, 84, 172,
      29, 81, 198, 113, 81, 251, 138, 182, 154, 111, 30, 171, 129, 56, 17, 45,
      214, 153, 112, 117, 203, 174, 40, 38, 234, 236, 32, 4, 112, 225, 26, 187,
      195, 246, 252, 9, 218, 69, 160, 223, 178, 54, 148, 81, 8, 134, 151, 75,
      248, 63, 224, 240, 48, 75, 250, 221, 85, 46, 100, 50, 3, 70, 64, 102, 111,
      160, 155, 233, 59, 147, 184, 57, 61, 6, 126, 79, 176, 16, 185, 94, 166,
      33, 135, 78, 42, 75, 140, 208, 140, 44, 153, 187, 64, 103, 119, 160, 236,
      16, 239, 74, 218, 219, 212, 207, 110, 53, 30, 76, 248, 40, 111, 98, 44,
      20, 113, 204, 233, 109, 135, 96, 107, 39, 163, 203, 125, 45, 157, 152, 71,
      239, 175, 174, 159, 147, 80, 111, 93, 38, 253, 228, 154, 225, 181, 101,
      12, 241, 127, 65, 49, 189, 5, 85, 151, 237, 213, 143, 14, 104, 138, 54,
      52, 27, 4, 132, 67, 35, 156, 86, 157, 73, 16, 229, 222, 245, 110, 79, 165,
      179, 56, 179, 53, 218, 229, 100, 58, 87, 149, 48, 231, 64, 63, 115, 67, 3,
      172, 6, 186, 115, 154, 60, 53, 214, 152, 149, 89, 234, 37, 143, 82, 255,
      64, 28, 183, 93, 112, 39, 70, 185, 57, 0, 199, 9, 61, 175, 219, 41, 76,
      37, 176, 82, 125, 65, 53, 160, 214, 105, 62, 153, 244, 222, 96, 205, 6,
      178, 85, 41, 240, 113, 0, 96, 149, 38, 3, 195, 18, 152, 41, 246, 3, 103,
      29, 110, 134, 30, 101, 75, 46, 103, 199, 184, 20, 230, 8, 55, 120, 4, 229,
      168, 35, 43, 7, 28, 161, 143, 87, 27, 87, 79, 255, 186, 44, 195, 158, 155,
      181, 119, 81, 172, 217, 107, 95, 98, 55, 243, 186, 66, 105, 48, 224, 123,
      232, 84, 156, 20, 10, 156, 208, 204, 52, 34, 228, 136, 97, 242, 200, 246,
      211, 67, 202, 40, 241, 91, 92, 253, 9, 54, 72, 131, 221, 106, 178, 32, 44,
      182, 4, 225, 193, 37, 20, 249, 249, 231, 10, 206, 18, 71, 254, 221, 187,
      172, 88, 204, 6, 127, 138, 102, 7, 208, 75, 147, 219, 199, 177, 79, 36,
      170, 101, 207, 177, 109, 95, 143, 217, 41, 199, 80, 183, 201, 2, 254, 12,
      55, 23, 198, 14, 255, 69, 245, 138, 155, 129, 227, 167, 168, 130, 156,
      135, 14, 96, 93, 48, 99, 143, 107, 126, 92, 117, 143, 112, 108, 193, 228,
      84, 13, 41, 186, 27, 172, 92, 201, 149, 116, 19, 112, 197, 116, 209, 128,
      102, 1, 55, 152, 177, 28, 37, 34, 50, 83, 41, 199, 74, 178, 59, 111, 67,
      118, 35, 252, 36, 33, 87, 28, 170, 17, 215, 47, 90, 154, 124, 137, 15, 14,
      211, 59, 75, 59, 30, 77, 0, 49, 37, 225, 191, 87, 101, 127, 214, 227, 160,
      99, 174, 234, 82, 148, 235, 16, 241, 219, 147, 170, 127, 221, 250, 116,
      39, 218, 156, 72, 227, 172, 55, 0, 79, 188, 76, 51, 222, 232, 24, 36, 62,
      94, 154, 3, 61, 230, 146, 114, 253, 0, 128, 58, 253, 90, 72, 211, 242, 38,
      39, 133, 153, 161, 119, 105, 195, 152, 225, 208, 105, 140, 80, 217, 186,
      196, 157, 21, 116, 230, 116, 139, 25, 159, 143, 118, 128, 77, 201, 238,
      247, 228, 15, 168, 4, 133, 148, 21, 148, 12, 44, 241, 7, 115, 17, 129,
      176, 202, 46, 130, 122, 129, 235, 141, 223, 85, 21, 199, 65, 181, 169, 52,
      174, 161, 153, 62, 25, 164, 115, 213, 89, 138, 199, 103, 79, 200, 165,
      135, 249, 244, 27, 209, 178, 240, 129, 211, 61, 9, 111, 157, 147, 119, 36,
      119, 255, 110, 130, 84, 49, 210, 225, 247, 100, 26, 121, 127, 163, 160,
      26, 79, 99, 24, 77, 65, 32, 178, 109, 36, 27, 253, 173, 110, 183, 11, 14,
      211, 57, 130, 254, 124, 104, 165, 219, 31, 70, 97, 14, 194, 39, 61, 26,
      141, 125, 228, 126, 194, 184, 101, 160, 204, 106, 128, 144, 106, 103, 171,
      18, 246, 129, 220, 85, 172, 151, 123, 5, 73, 155, 192, 175, 91, 157, 239,
      61, 237, 116, 170, 65, 233, 56, 19, 49, 114, 168, 190, 3, 214, 53, 250,
      90, 213, 244, 88, 101, 30, 229, 248, 124, 15, 71, 141, 27, 172, 235, 21,
      129, 211, 72, 61, 172, 112, 170, 128, 135, 96, 196, 221, 255, 27, 176,
      105, 188, 183, 121, 33, 37, 149, 53, 131, 226, 233, 29, 167, 234, 218,
      109, 53, 185, 152, 36, 248, 53, 61, 235, 78, 21, 201, 214, 210, 163, 12,
      251, 187, 45, 188, 137, 126, 127, 237, 92, 234, 91, 240, 225, 38, 194, 57,
      213, 251, 237, 171, 30, 99, 52, 14, 49, 84, 101, 252, 237, 7, 166, 122,
      114, 32, 107, 32, 207, 239, 136, 168, 178, 12, 11, 241, 233, 230, 146,
      132, 18, 83, 233, 41, 172, 17, 6, 161, 42, 113, 87, 40, 255, 185, 1, 146,
      128, 5, 240, 126, 131, 71, 42, 54, 124, 205, 2, 122, 71, 30, 222, 229, 40,
      134, 142, 102, 97, 239, 151, 177, 1, 230, 231, 49, 123, 219, 28, 129, 91,
      152, 112, 13, 154, 81, 197, 226, 255, 112, 158, 178, 177, 55, 181, 108,
      138, 185, 245, 29, 186, 21, 73, 188, 209, 154, 200, 89, 116, 235, 198,
      144, 36, 87, 248, 22, 7, 200, 122, 7, 148, 44, 42, 87, 140, 238, 204, 95,
      231, 252, 0, 136, 0, 22, 39, 70, 123, 125, 165, 113, 227, 172, 146, 163,
      128, 158, 36, 52, 91, 19, 36, 245, 27, 150, 138, 141, 11, 67, 239, 224,
      65, 24, 116, 101, 7, 39, 46, 142, 172, 164, 243, 148, 0, 33, 226, 59, 47,
      203, 137, 156, 241, 66, 250, 157, 30, 204, 101, 143, 134, 98, 238, 155,
      226, 25, 184, 136, 219, 89, 100, 193, 11, 143, 71, 139, 243, 230, 151, 0,
      249, 1, 78, 26, 32, 93, 104, 157, 67, 97, 164, 248, 86, 124, 146, 93, 74,
      222, 228, 167, 55, 53, 100, 135, 216, 109, 13, 64, 37, 106, 177, 200, 200,
      182, 92, 251, 69, 31, 243, 89, 80, 198, 14, 132, 203, 72, 103, 28, 104,
      217, 24, 97, 223, 113, 11, 29, 178, 191, 210, 46, 162, 255, 68, 99, 8,
      237, 213, 162, 152, 193, 183, 121, 203, 19, 108, 182, 29, 86, 26, 192,
      103, 220, 103, 205, 154, 179, 197, 9, 22, 73, 127, 175, 146, 38, 119, 210,
      0, 24, 180, 21, 245, 215, 204, 91, 186, 119, 138, 183, 239, 15, 155, 231,
      248, 133, 39, 24, 101, 144, 236, 10, 230, 54, 174, 227, 73, 21, 110, 10,
      160, 241, 232, 131, 14, 212, 127, 232, 59, 122, 65, 146, 54, 163, 9, 189,
      190, 121, 88, 170, 62, 194, 14, 204, 152, 245, 38, 131, 37, 91, 81, 72,
      114, 29, 115, 239, 182, 56, 44, 156, 159, 177, 180, 82, 160, 93, 97, 86,
      183, 236, 50, 95, 85, 39, 71, 181, 225, 152, 143, 63, 123, 117, 34, 44,
      109, 160, 166, 229, 240, 91, 138, 102, 54, 180, 173, 44, 50, 80, 42, 124,
      7, 50, 124, 211, 239, 21, 94, 197, 185, 239, 213, 107, 142, 64, 95, 124,
      125, 17, 180, 97, 189, 101, 52, 48, 19, 112, 12, 70, 9, 212, 177, 54, 118,
      66, 84, 147, 236, 248, 26, 124, 95, 103, 135, 254, 124, 49, 112, 186, 99,
      120, 90, 8, 194, 191, 88, 57, 242, 65, 61, 10, 104, 246, 197, 252, 19,
      159, 58, 194, 75, 173, 242, 103, 8, 115, 84, 69, 238, 149, 26, 15, 159,
      182, 141, 132, 119, 70, 29, 53, 20, 143, 46, 163, 204, 6, 236, 59, 45,
      185, 172, 89, 119, 83, 38, 144, 36, 222, 96, 151, 26, 99, 195, 163, 170,
      133, 92, 159, 214, 53, 150, 116, 90, 176, 69, 145, 130, 15, 172, 140, 217,
      215, 101, 163, 115, 161, 65, 101, 8, 7, 183, 113, 213, 134, 58, 175, 130,
      251, 143, 173, 248, 168, 135, 60, 159, 30, 194, 68, 208, 119, 120, 2, 40,
      178, 227, 247, 161, 77, 47, 136, 46, 244, 163, 72, 65, 158, 25, 225, 195,
      61, 132, 182, 204, 177, 186, 200, 81, 2, 65, 105, 212, 72, 94, 203, 232,
      217, 182, 123, 251, 228, 160, 1, 161, 204, 123, 20, 37, 1, 77, 208, 179,
      45, 149, 181, 122, 102, 190, 123, 213, 164, 231, 41, 216, 130, 234, 248,
      208, 251, 252, 220, 84, 209, 67, 47, 61, 220, 5, 142, 162, 26, 236, 121,
      142, 248, 132, 255, 65, 122, 203, 196, 102, 191, 187, 2, 195, 127, 255,
      193, 92, 49, 91, 186, 154, 39, 156, 29, 211, 172, 49, 104, 245, 114, 153,
      223, 211, 199, 249, 35, 130, 160, 128, 0, 152, 176, 183, 20, 236, 113,
      193, 108, 26, 255, 11, 237, 102, 133, 245, 94, 115, 114, 10, 89, 229, 214,
      221, 99, 149, 30, 99, 37, 246, 10, 26, 26, 39, 92, 123, 170, 73, 211, 127,
      227, 54, 30, 86, 133, 159, 112, 225, 91, 148, 100, 174, 149, 75, 143, 14,
      140, 20, 44, 64, 212, 5, 243, 8, 116, 63, 30, 97, 42, 123, 20, 73, 212,
      85, 207, 83, 122, 27, 251, 233, 84, 10, 17, 236, 232, 83, 200, 127, 119,
      143, 163, 204, 220, 167, 59, 231, 20, 106, 186, 222, 191, 8, 40, 234, 21,
      25, 180, 13, 116, 250, 152, 224, 174, 75, 3, 205, 38, 173, 215, 236, 151,
      185, 121, 254, 244, 154, 239, 17, 53, 106, 164, 61, 49, 116, 216, 118, 94,
      150, 35, 181, 26, 238, 66, 49, 211, 221, 132, 146, 166, 115, 39, 136, 36,
      205, 230, 179, 31, 197, 51, 148, 165, 109, 38, 70, 37, 148, 52, 44, 209,
      250, 98, 58, 246, 225, 103, 198, 101, 26, 25, 196, 207, 8, 166, 21, 88,
      252, 175, 253, 10, 88, 107, 157, 19, 225, 61, 12, 246, 221, 37, 239, 186,
      167, 137, 142, 135, 222, 128, 174, 62, 95, 216, 38, 141, 157, 45, 232, 97,
      217, 173, 203, 234, 116, 129, 69, 206, 189, 94, 221, 12, 54, 139, 186,
      247, 184, 16, 200, 121, 244, 104, 8, 7, 35, 111, 47, 188, 10, 140, 92, 73,
      143, 206, 203, 72, 122, 184, 20, 102, 197, 130, 64, 150, 63, 96, 239, 8,
      132, 111, 217, 84, 91, 198, 32, 43, 100, 138, 241, 15, 160, 42, 190, 253,
      193, 184, 164, 124, 29, 210, 96, 67, 224, 221, 182, 29, 218, 129, 149, 29,
      128, 174, 98, 88, 88, 125, 56, 40, 255, 120, 5, 0, 87, 174, 42, 150, 90,
      112, 201, 183, 169, 19, 57, 195, 191, 12, 58, 244, 235, 132, 25, 145, 72,
      146, 214, 8, 125, 100, 135, 12, 5, 102, 97, 248, 174, 24, 159, 90, 33, 43,
      187, 6, 61, 212, 241, 225, 190, 219, 252, 197, 123, 129, 164, 108, 123,
      55, 230, 4, 153, 166, 105, 234, 15, 85, 216, 23, 56, 32, 3, 41, 110, 68,
      146, 172, 133, 202, 98, 41, 7, 47, 152, 35, 255, 168, 106, 241, 226, 222,
      77, 244, 52, 185, 65, 252, 227, 32, 66, 38, 11, 172, 60, 28, 28, 103, 84,
      1, 1, 205, 182, 190, 28, 189, 102, 253, 43, 1, 191, 148, 116, 10, 227, 18,
      81, 93, 80, 239, 157, 232, 215, 180, 163, 165, 161, 109, 177, 71, 150,
      244, 144, 208, 160, 110, 22, 174, 60, 206, 43, 103, 121, 55, 103, 114,
      115, 173, 238, 13, 10, 227, 251, 41, 176, 216, 158, 229, 216, 55, 234,
      128, 128, 20, 167, 106, 181, 86, 163, 130, 215, 110, 149, 191, 10, 227,
      215, 8, 214, 154, 178, 181, 15, 19, 0, 247, 250, 97, 74, 43, 157, 55, 94,
      174, 41, 41, 9, 199, 97, 20, 91, 32, 18, 10, 43, 98, 240, 247, 203, 20,
      250, 117, 160, 44, 229, 202, 187, 64, 54, 124, 15, 184, 169, 129, 27, 160,
      240, 26, 61, 255, 60, 166, 60, 144, 209, 84, 55, 187, 186, 168, 13, 124,
      125, 29, 17, 100, 249, 227, 62, 205, 78, 179, 163, 168, 139, 168, 21, 38,
      83, 239, 151, 74, 43, 66, 2, 92, 72, 71, 94, 216, 134, 238, 20, 45, 158,
      213, 164, 73, 57, 80, 47, 198, 184, 130, 223, 227, 71, 132, 133, 235, 177,
      85, 174, 142, 124, 172, 200, 54, 229, 40, 126, 60, 76, 92, 216, 153, 56,
      241, 174, 66, 141, 90, 226, 3, 30, 68, 234, 71, 187, 163, 112, 146, 255,
      22, 143, 170, 204, 3, 127, 179, 81, 139, 160, 37, 77, 246, 128, 220, 196,
      158, 153, 73, 177, 65, 199, 119, 29, 197, 144, 130, 248, 206, 155, 253,
      108, 213, 124, 7, 223, 221, 162, 146, 134, 242, 65, 99, 162, 107, 120,
      247, 214, 207, 96, 150, 169, 131, 208, 218, 221, 28, 24, 112, 208, 23, 1,
      130, 142, 232, 56, 104, 45, 33, 158, 95, 255, 123, 31, 74, 76, 120, 178,
      155, 213, 6, 195, 164, 8, 8, 69, 241, 197, 127, 83, 169, 21, 167, 19, 94,
      143, 252, 33, 159, 248, 241, 170, 153, 147, 1, 149, 199, 201, 131, 170,
      79, 236, 212, 209, 143, 107, 98, 24, 123, 56, 33, 193, 85, 247, 64, 225,
      135, 210, 78, 145, 57, 16, 145, 71, 170, 20, 133, 87, 235, 4, 166, 239,
      100, 82, 235, 81, 50, 223, 9, 193, 52, 49, 86, 129, 190, 196, 82, 165,
      107, 63, 115, 161, 98, 33, 20, 193, 29, 42, 151, 205, 252, 124, 72, 245,
      48, 181, 67, 7, 13, 21, 127, 59, 226, 188, 144, 129, 112, 244, 192, 121,
      213, 80, 42, 196, 1, 13, 107, 108, 78, 0, 40, 121, 225, 148, 237, 234,
      209, 216, 238, 9, 147, 226, 254, 96, 89, 212, 72, 193, 106, 75, 135, 74,
      227, 67, 255, 92, 191, 81, 188, 124, 226, 149, 152, 142, 15, 159, 195,
      238, 114, 55, 255, 166, 157, 230, 59, 148, 170, 166, 151, 65, 213, 104,
      253, 253, 112, 150, 82, 147, 137, 27, 214, 100, 247, 65, 81, 92, 47, 86,
      217, 7, 45, 120, 81, 130, 31, 236, 243, 76, 78, 3, 45, 105, 172, 220, 71,
      48, 220, 94, 196, 249, 163, 193, 133, 50, 236, 205, 20, 55, 2, 63, 14,
      127, 69, 113, 212, 204, 12, 58, 79, 89, 86, 29, 61, 199, 201, 64, 149, 6,
      144, 182, 150, 129, 31, 18, 167, 120, 248, 82, 107, 25, 143, 128, 27, 161,
      28, 25, 153, 183, 217, 238, 78, 186, 106, 92, 27, 202, 219, 165, 96, 0,
      216, 234, 169, 73, 101, 39, 182, 113, 217, 240, 170, 116, 172, 221, 250,
      233, 48, 49, 242, 83, 227, 92, 181, 184, 72, 230, 180, 21, 15, 108, 135,
      25, 38, 153, 25, 124, 227, 26, 149, 73, 236, 39, 211, 244, 149, 58, 183,
      132, 26, 223, 219, 174, 144, 117, 233, 219, 165, 205, 157, 159, 222, 184,
      52, 47, 241, 201, 123, 65, 24, 44, 55, 215, 177, 168, 250, 179, 115, 190,
      227, 123, 158, 163, 179, 224, 69, 196, 66, 207, 254, 243, 101, 221, 193,
      140, 250, 4, 28, 222, 52, 96, 138, 160, 33, 218, 64, 118, 214, 234, 201,
      152, 148, 91, 178, 111, 107, 144, 142, 6, 182, 102, 72, 188, 34, 213, 181,
      26, 223, 58, 255, 103, 81, 17, 47, 169, 11, 245, 224, 123, 148, 215, 237,
      186, 107, 75, 152, 90, 202, 166, 22, 149, 197, 5, 246, 238, 78, 76, 229,
      106, 199, 94, 127, 195, 0, 45, 82, 6, 159, 103, 96, 138, 231, 71, 46, 107,
      59, 216, 39, 43, 12, 221, 27, 214, 56, 155, 145, 66, 187, 169, 250, 235,
      78, 211, 179, 239, 183, 198, 163, 93, 5, 196, 24, 174, 143, 225, 106, 139,
      89, 98, 13, 127, 207, 184, 194, 30, 1, 165, 198, 169, 8, 197, 118, 86,
      163, 221, 138, 23, 209, 61, 116, 79, 99, 233, 43, 130, 60, 244, 85, 229,
      243, 172, 123, 148, 200, 120, 192, 127, 211, 52, 11, 159, 41, 95, 212,
      230, 188, 169, 156, 137, 29, 212, 12, 148, 168, 148, 133, 243, 44, 241,
      139, 127, 24, 246, 220, 227, 125, 209, 97, 60, 52, 162, 192, 146, 49, 161,
      92, 138, 112, 189, 128, 59, 126, 125, 46, 207, 60, 79, 231, 174, 152, 209,
      68, 223, 205, 2, 38, 14, 91, 116, 159, 255, 28, 27, 178, 248, 164, 104,
      158, 79, 69, 214, 234, 157, 12, 75, 163, 83, 253, 245, 202, 61, 213, 176,
      6, 197, 230, 29, 208, 166, 253, 194, 254, 235, 29, 141, 241, 70, 249, 15,
      62, 0, 148, 163, 135, 52, 122, 40, 96, 87, 31, 179, 152, 51, 216, 133,
      184, 122, 198, 203, 60, 115, 218, 191, 193, 16, 178, 25, 148, 252, 112,
      104, 103, 252, 36, 92, 221, 28, 179, 43, 199, 198, 151, 128, 100, 252,
      217, 161, 249, 34, 201, 172, 118, 52, 180, 252, 104, 7, 223, 44, 116, 102,
      212, 21, 40, 224, 184, 55, 163, 210, 21, 207, 161, 239, 51, 54, 155, 41,
      133, 18, 67, 48, 3, 165, 130, 251, 4, 79, 214, 57, 72, 130, 157, 212, 144
    ],
    Lp = [
      0, 1, 3, 4, 6, 7, 9, 10, 12, 13, 15, 16, 18, 19, 21, 22, 24, 26, 29, 31,
      34, 36, 39, 41, 44, 46, 49, 51, 54, 56, 59, 61, 64, 65, 66, 67, 68, 69,
      70, 72, 73, 74, 75, 76, 77, 79, 80, 81, 82, 83, 84, 85, 87, 88, 89, 90,
      91, 92, 94, 95, 96, 97, 98, 99, 101, 102, 103, 104, 105, 106, 107, 109,
      110, 111, 112, 113, 114, 116, 117, 118, 119, 120, 121, 123, 124, 125, 126,
      127, 128, 129, 131, 132, 133, 134, 135, 136, 138, 139, 140, 141, 142, 143,
      145, 146, 147, 148, 149, 150, 151, 153, 154, 155, 156, 157, 158, 160, 161,
      162, 163, 164, 165, 166, 168, 169, 170, 171, 172, 173, 175, 176, 177, 178,
      179, 180, 182, 183, 184, 185, 186, 187, 188, 190, 191, 192, 193, 194, 195,
      197, 198, 199, 200, 201, 202, 204, 205, 206, 207, 208, 209, 210, 212, 213,
      214, 215, 216, 217, 219, 220, 221, 222, 223, 224, 226, 226, 226, 227, 227,
      227, 228, 228, 228, 229, 229, 229, 230, 230, 231, 231, 231, 232, 232, 232,
      233, 233, 233, 234, 234, 235, 235, 235, 236, 236, 236, 237, 237, 237, 238,
      238, 239, 239, 239, 240, 240, 240, 241, 241, 241, 242, 242, 243, 243, 243,
      244, 244, 244, 245, 245, 245, 246, 246, 246, 247, 247, 247, 248, 248, 248,
      249, 249, 249, 250, 250, 250, 251, 251, 251, 252, 252, 252, 253, 253, 253,
      254, 254, 254, 255
    ],
    dl = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 33, 35, 36, 37, 39, 40, 42,
      43, 44, 46, 47, 49, 50, 51, 53, 54, 56, 57, 58, 59, 61, 62, 63, 64, 66,
      67, 68, 69, 71, 72, 73, 74, 76, 77, 78, 79, 81, 82, 83, 84, 86, 87, 88,
      90, 91, 92, 93, 95, 96, 97, 98, 100, 101, 102, 103, 105, 106, 107, 108,
      110, 111, 112, 113, 115, 116, 117, 118, 120, 121, 122, 124, 125, 126, 127,
      129, 130, 131, 132, 134, 135, 136, 137, 139, 140, 141, 142, 144, 145, 146,
      147, 149, 150, 151, 152, 154, 155, 156, 158, 159, 160, 161, 163, 164, 165,
      166, 168, 169, 170, 171, 173, 174, 175, 176, 178, 179, 180, 181, 183, 184,
      185, 186, 188, 189, 190, 192, 193, 194, 195, 197, 198, 199, 200, 202, 203,
      204, 205, 207, 208, 209, 210, 212, 213, 214, 215, 217, 218, 219, 220, 222,
      223, 224, 226, 226, 226, 227, 227, 228, 228, 229, 229, 230, 230, 231, 231,
      232, 232, 233, 233, 234, 234, 234, 235, 235, 236, 236, 237, 237, 238, 238,
      239, 239, 240, 240, 241, 241, 242, 242, 243, 243, 243, 244, 244, 244, 245,
      245, 245, 246, 246, 246, 247, 247, 247, 248, 248, 248, 249, 249, 249, 250,
      250, 250, 251, 251, 251, 252, 252, 252, 253, 253, 253, 254, 254, 254, 255
    ],
    Mp = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22,
      23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 35, 36, 37, 38, 39, 40, 41,
      43, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 55, 56, 58, 59, 60, 61, 62,
      63, 65, 66, 67, 68, 69, 70, 72, 73, 74, 76, 77, 78, 80, 81, 83, 84, 85,
      87, 88, 89, 91, 92, 94, 95, 96, 98, 99, 100, 102, 103, 105, 106, 107, 109,
      110, 111, 113, 114, 116, 117, 118, 120, 121, 122, 124, 125, 127, 128, 129,
      131, 132, 133, 135, 136, 138, 139, 140, 142, 143, 144, 146, 147, 149, 150,
      151, 153, 154, 155, 157, 158, 160, 161, 162, 163, 164, 165, 166, 167, 168,
      169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183,
      184, 185, 186, 187, 188, 189, 190, 191, 192, 192, 193, 193, 194, 195, 195,
      196, 197, 197, 198, 199, 199, 200, 201, 201, 202, 203, 203, 204, 205, 205,
      206, 207, 207, 208, 209, 209, 210, 211, 211, 212, 213, 213, 214, 215, 215,
      216, 217, 217, 218, 219, 219, 220, 221, 221, 222, 223, 223, 224, 225, 225,
      226, 227, 227, 228, 229, 229, 230, 231, 231, 232, 233, 233, 234, 235, 235,
      236, 237, 237, 238, 239, 239, 240, 241, 241, 242, 243, 243, 244, 245, 245,
      246, 247, 247, 248, 249, 249, 250, 251, 251, 252, 253, 253, 254, 255
    ];
  class Np extends Tb {
    constructor(a, b, d, e) {
      super(a, Kp, d, e);
      this.lightLevel = 0.1;
      this.rednessLevel = 0.5;
      this.mskin_he_max = (175 / 180) * 3.141593;
      this.mskin_he_min = (115 / 180) * 3.141593;
      this.mskin_hc_max = (173 / 180) * 3.141593;
      this.mskin_hc_min = (116 / 180) * 3.141593;
      this.mskin_hc_axis = 2.04203545;
      this.mfacts_rotate_ge = this.mfacts_rotate_le = this.mfacts_rotate_c = 0;
      this.tab_addr = null;
      this.lutTextures = [];
      this.inputTexture = b;
      this.init();
    }
    setUniforms() {
      var a = this.gl.getUniformLocation(this.program, "u_flipY"),
        b = this.gl.getUniformLocation(this.program, "u_denoiseLevel");
      this.gl.uniform1f(b, this.denoiseLevel);
      this.gl.uniform1f(a, 1);
      a = this.gl.getUniformLocation(this.program, "light");
      this.gl.uniform1f(a, this.lightLevel);
      a = this.gl.getUniformLocation(this.program, "redness");
      this.gl.uniform1f(a, this.rednessLevel);
      a = this.gl.getUniformLocation(this.program, "skin_he_max");
      b = this.gl.getUniformLocation(this.program, "skin_he_min");
      var d = this.gl.getUniformLocation(this.program, "skin_hc_max"),
        e = this.gl.getUniformLocation(this.program, "skin_hc_min");
      let f = this.gl.getUniformLocation(this.program, "skin_hc_axis"),
        g = this.gl.getUniformLocation(this.program, "facts_rotate_c"),
        h = this.gl.getUniformLocation(this.program, "facts_rotate_le"),
        k = this.gl.getUniformLocation(this.program, "facts_rotate_ge");
      this.gl.uniform1f(a, this.mskin_he_max);
      this.gl.uniform1f(b, this.mskin_he_min);
      this.gl.uniform1f(d, this.mskin_hc_max);
      this.gl.uniform1f(e, this.mskin_hc_min);
      this.gl.uniform1f(f, this.mskin_hc_axis);
      this.gl.uniform1f(g, this.mfacts_rotate_c);
      this.gl.uniform1f(h, this.mfacts_rotate_le);
      this.gl.uniform1f(k, this.mfacts_rotate_ge);
      a = this.gl.getUniformLocation(this.program, "u_originImage");
      this.gl.activeTexture(this.gl.TEXTURE2);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.inputTexture);
      this.gl.uniform1i(a, 2);
      a = ["lighten_lut"];
      b = [this.gl.TEXTURE3];
      for (d = 0; d < a.length; d++)
        (e = this.gl.getUniformLocation(this.program, a[d])),
          this.gl.activeTexture(b[d]),
          this.gl.bindTexture(this.gl.TEXTURE_2D, this.lutTextures[d]),
          this.gl.uniform1i(e, d + 3);
    }
    setParameters(a) {
      void 0 !== a.denoiseLevel && (this.denoiseLevel = a.denoiseLevel);
      void 0 !== a.lightLevel && (this.lightLevel = a.lightLevel);
      void 0 !== a.rednessLevel &&
        ((this.rednessLevel = a.rednessLevel),
        this.updateRedness(this.rednessLevel));
      a.lighteningContrastLevel && this.updateLut(a.lighteningContrastLevel);
    }
    init() {
      this.tab_addr = new Uint8Array(dl);
      let a = [this.tab_addr],
        b = [256],
        d = [1];
      for (let e = 0; e < a.length; e++) {
        let f = this.gl.createTexture();
        if (!f)
          throw new m(l.WEBGL_INTERNAL_ERROR, "create lut texture failed");
        this.gl.bindTexture(this.gl.TEXTURE_2D, f);
        this.gl.texImage2D(
          this.gl.TEXTURE_2D,
          0,
          this.gl.LUMINANCE,
          b[e],
          d[e],
          0,
          this.gl.LUMINANCE,
          this.gl.UNSIGNED_BYTE,
          a[e]
        );
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_WRAP_S,
          this.gl.CLAMP_TO_EDGE
        );
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_WRAP_T,
          this.gl.CLAMP_TO_EDGE
        );
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_MIN_FILTER,
          this.gl.LINEAR
        );
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_MAG_FILTER,
          this.gl.LINEAR
        );
        this.lutTextures.push(f);
      }
    }
    updateRedness(a) {
      var b = a;
      1 < a && (a = 1);
      0 > a && (a = 0);
      1 < b && (b = 1);
      0 > b && (b = 0);
      this.mfacts_rotate_c = 0.8 * a;
      0.8 > b && (b = 0);
      this.mskin_he_max = (175 / 180) * 3.141593;
      this.mskin_hc_max = (173 / 180) * 3.141593;
      this.mskin_he_min = ((115 - 4 * b) / 180) * 3.141593;
      this.mskin_hc_min = ((116 - 4 * b) / 180) * 3.141593;
      this.mskin_hc_axis = ((117 - 4 * b) / 180) * 3.141593;
      this.mskin_hc_axis < this.mskin_hc_min &&
        (this.mskin_hc_axis = this.mskin_hc_min);
      1.5707965 > this.mskin_hc_min && (this.mskin_hc_min = 1.5707965);
      1.5707965 > this.mskin_hc_axis && (this.mskin_hc_axis = 1.5707965);
      1.5707965 > this.mskin_he_min && (this.mskin_he_min = 1.5707965);
      3.141593 < this.mskin_hc_max && (this.mskin_hc_max = 3.141593);
      3.141593 < this.mskin_hc_axis && (this.mskin_hc_axis = 3.141593);
      3.141593 < this.mskin_he_max && (this.mskin_he_max = 3.141593);
      a = this.mskin_he_max - this.mskin_hc_max;
      b = this.mskin_hc_max - this.mskin_hc_axis;
      this.mfacts_rotate_ge =
        0.01 < a ? (this.mfacts_rotate_c * b) / a : this.mfacts_rotate_c;
      a = this.mskin_hc_min - this.mskin_he_min;
      b = this.mskin_hc_axis - this.mskin_hc_min;
      this.mfacts_rotate_le =
        0.01 < a ? (this.mfacts_rotate_c * b) / a : this.mfacts_rotate_c;
    }
    updateLut(a) {
      var b = null;
      if ((0 === a && (b = dl), 1 === a && (b = Mp), 2 === a && (b = Lp), !b))
        throw new m(l.WEBGL_INTERNAL_ERROR, "invalid ylut_table value:" + a);
      this.tab_addr = new Uint8Array(b);
      a = [this.tab_addr];
      b = [256];
      let d = [1];
      for (let e = 0; e < a.length; e++)
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.lutTextures[e]),
          this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0,
            this.gl.LUMINANCE,
            b[e],
            d[e],
            0,
            this.gl.LUMINANCE,
            this.gl.UNSIGNED_BYTE,
            a[e]
          );
    }
  }
  class Op {
    constructor() {
      this.canvas = this.gl = null;
      this.programs = [];
      this.inputTexture = this.commonProgram = null;
      this.outputTextures = [];
      this.fbos = [];
      this.originalFrameHeight = this.originalFrameWidth = 0;
      this.enableBeauty = !1;
      this.denoiseLevel = 5;
      this.lightLevel = 0.35;
      this.rednessLevel = 0.5;
      this.lighteningContrastLevel = 1;
    }
    setEnableBeauty(a) {
      this.enableBeauty = !!a;
    }
    init(a, b, d) {
      if (!ea.supportWebGL)
        throw new m(l.NOT_SUPPORT, "your browser is not support webGL");
      if (((this.gl = d.getContext("webgl")), !this.gl))
        throw new m(l.WEBGL_INTERNAL_ERROR, "can not get webgl context");
      if ((this.initGL(a, b), !this.inputTexture))
        throw new m(l.WEBGL_INTERNAL_ERROR, "can not find input texture");
      this.canvas = d;
      this.programs.push(new cl(this.gl));
      this.programs.push(new Fp(this.gl, a, b));
      this.programs.push(new Hp(this.gl, a, b));
      this.programs.push(new Jp(this.gl, a, b));
      this.programs.push(new Np(this.gl, this.inputTexture, a, b));
      this.commonProgram = this.programs[0].program;
      this.setDenoiseLevel(this.denoiseLevel);
      this.setLightLevel(this.lightLevel);
      this.setRednessLevel(this.rednessLevel);
      this.setContrastLevel(this.lighteningContrastLevel);
    }
    render(a) {
      if (!this.gl || !this.commonProgram || !this.canvas)
        return void k.warning("video effect manager is not init!");
      var b = 0;
      if (
        this.originalFrameHeight === a.videoWidth &&
        this.originalFrameWidth === a.videoHeight
      )
        b = 2;
      else if (
        this.originalFrameHeight !== a.videoHeight ||
        this.originalFrameWidth !== a.videoWidth
      ) {
        var d, e, f;
        if (
          (k.debug(
            n(
              (d = n(
                (e = n(
                  (f = "beauty effect: resolution changed ".concat(
                    this.originalFrameWidth,
                    "x"
                  ))
                ).call(f, this.originalFrameHeight, " -> "))
              ).call(e, a.videoWidth, "x"))
            ).call(d, a.videoHeight)
          ),
          0 === a.videoHeight || 0 === a.videoWidth)
        )
          return void k.debug("beauty effect: skip 0 resolution frame");
        this.canvas.width = a.videoWidth;
        this.canvas.height = a.videoHeight;
        a.setAttribute("width", a.videoWidth.toString());
        a.setAttribute("height", a.videoHeight.toString());
        this.release();
        this.init(a.videoWidth, a.videoHeight, this.canvas);
      }
      this.gl.viewport(0, 0, a.videoWidth, a.videoHeight);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.inputTexture);
      this.gl.texImage2D(
        this.gl.TEXTURE_2D,
        0,
        this.gl.RGBA,
        this.gl.RGBA,
        this.gl.UNSIGNED_BYTE,
        a
      );
      a = this.enableBeauty ? this.programs.length - 1 : 0;
      for (d = 0; d <= a; d++)
        (e = this.programs[d].program),
          this.gl.useProgram(e),
          (e = this.gl.getUniformLocation(e, "u_image")),
          this.programs[d].setUniforms(),
          this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbos[b + (d % 2)]),
          this.gl.clearColor(0, 0, 0, 1),
          this.gl.clear(this.gl.COLOR_BUFFER_BIT),
          this.gl.drawArrays(this.gl.TRIANGLES, 0, 6),
          this.gl.activeTexture(this.gl.TEXTURE0),
          this.gl.bindTexture(
            this.gl.TEXTURE_2D,
            this.outputTextures[b + (d % 2)]
          ),
          this.gl.uniform1i(e, 0);
      this.gl.useProgram(this.commonProgram);
      b = this.gl.getUniformLocation(this.commonProgram, "u_flipY");
      this.gl.uniform1f(b, -1);
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
      this.gl.clearColor(0, 0, 0, 1);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
    setDenoiseLevel(a) {
      var b;
      r((b = this.programs)).call(b, (b) => {
        b instanceof Tb && b.setParameters({ denoiseLevel: a });
      });
      this.denoiseLevel = a;
    }
    setLightLevel(a) {
      var b;
      r((b = this.programs)).call(b, (b) => {
        b instanceof Tb && b.setParameters({ lightLevel: a });
      });
      this.lightLevel = a;
    }
    setRednessLevel(a) {
      var b;
      r((b = this.programs)).call(b, (b) => {
        b instanceof Tb && b.setParameters({ rednessLevel: a });
      });
      this.rednessLevel = a;
    }
    setContrastLevel(a) {
      var b;
      r((b = this.programs)).call(b, (b) => {
        b instanceof Tb && b.setParameters({ lighteningContrastLevel: a });
      });
      this.lighteningContrastLevel = a;
    }
    setSize(a, b) {
      var d;
      r((d = this.programs)).call(d, (d) => {
        d instanceof Tb && d.setSize(a, b);
      });
    }
    release() {
      this.inputTexture = this.commonProgram = this.gl = null;
      this.programs = [];
      this.outputTextures = [];
      this.fbos = [];
    }
    initGL(a, b) {
      if (!this.gl)
        throw new m(l.WEBGL_INTERNAL_ERROR, "can not find webgl context");
      this.inputTexture = this.gl.createTexture();
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.inputTexture);
      this.gl.texParameteri(
        this.gl.TEXTURE_2D,
        this.gl.TEXTURE_WRAP_S,
        this.gl.CLAMP_TO_EDGE
      );
      this.gl.texParameteri(
        this.gl.TEXTURE_2D,
        this.gl.TEXTURE_WRAP_T,
        this.gl.CLAMP_TO_EDGE
      );
      this.gl.texParameteri(
        this.gl.TEXTURE_2D,
        this.gl.TEXTURE_MIN_FILTER,
        this.gl.LINEAR
      );
      this.gl.texParameteri(
        this.gl.TEXTURE_2D,
        this.gl.TEXTURE_MAG_FILTER,
        this.gl.LINEAR
      );
      for (let d = 0; 4 > d; d++) {
        let e = this.gl.createTexture();
        if (!e) throw new m(l.WEBGL_INTERNAL_ERROR, "create texture failed");
        this.gl.bindTexture(this.gl.TEXTURE_2D, e);
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_WRAP_S,
          this.gl.CLAMP_TO_EDGE
        );
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_WRAP_T,
          this.gl.CLAMP_TO_EDGE
        );
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_MIN_FILTER,
          this.gl.LINEAR
        );
        2 > d
          ? this.gl.texImage2D(
              this.gl.TEXTURE_2D,
              0,
              this.gl.RGBA,
              a,
              b,
              0,
              this.gl.RGBA,
              this.gl.UNSIGNED_BYTE,
              null
            )
          : this.gl.texImage2D(
              this.gl.TEXTURE_2D,
              0,
              this.gl.RGBA,
              b,
              a,
              0,
              this.gl.RGBA,
              this.gl.UNSIGNED_BYTE,
              null
            );
        let f = this.gl.createFramebuffer();
        if (!f)
          throw new m(l.WEBGL_INTERNAL_ERROR, "create frame buffer failed");
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, f);
        this.gl.framebufferTexture2D(
          this.gl.FRAMEBUFFER,
          this.gl.COLOR_ATTACHMENT0,
          this.gl.TEXTURE_2D,
          e,
          0
        );
        this.outputTextures.push(e);
        this.fbos.push(f);
      }
      this.gl.viewport(0, 0, a, b);
      this.originalFrameWidth = a;
      this.originalFrameHeight = b;
    }
  }
  class Pp {
    constructor() {
      this.recordedFrameCount = this.targetFrameRate = 0;
      this.recordingTime = 2;
    }
    async startRecordBeautyEffectOutput(a, b = 4) {
      if (this.recordID)
        throw new m(
          l.UNEXPECTED_ERROR,
          "another beauty effect recording is in progress"
        );
      let d = na(6, "");
      return (
        (this.recordID = d),
        (this.targetFrameRate = a),
        (this.recordedFrameCount = 0),
        (this.recordingTime = b),
        await Ab(1e3 * this.recordingTime),
        this.recordID !== d
          ? ((this.recordID = void 0), !0)
          : ((this.recordID = void 0),
            this.recordedFrameCount <
            (this.targetFrameRate * this.recordingTime) / 2
              ? (k.warning(
                  "detect beauty effect overload, current framerate",
                  this.recordedFrameCount / 2
                ),
                !1)
              : (k.debug(
                  "beauty effect current framerate",
                  this.recordedFrameCount / 2
                ),
                !0))
      );
    }
    stopRecordBeautyEffectOutput() {
      this.recordedFrameCount = this.targetFrameRate = 0;
      this.recordID = void 0;
    }
    addFrame() {
      this.recordID && (this.recordedFrameCount += 1);
    }
  }
  class Qp extends Bp {
    constructor() {
      super();
      this.kind = "video";
      this.fps = 15;
      this.overloadDetector = new Pp();
      this.enabled = !1;
      this.stopChromeBackgroundLoop = null;
      this.lastRenderTime = 0;
      this.fps = 30;
      this.manager = new Op();
    }
    async setBeautyEffectOptions(a, b) {
      void 0 !== b.smoothnessLevel &&
        W(b.smoothnessLevel, "options.smoothnessLevel", 0, 1, !1);
      void 0 !== b.lighteningLevel &&
        W(b.lighteningLevel, "options.lighteningLevel", 0, 1, !1);
      void 0 !== b.rednessLevel &&
        W(b.rednessLevel, "options.rednessLevel", 0, 1, !1);
      void 0 !== b.lighteningContrastLevel &&
        Xa(
          b.lighteningContrastLevel,
          "options.lighteningContrastLevel",
          [0, 1, 2]
        );
      void 0 !== b.smoothnessLevel &&
        this.manager.setDenoiseLevel(Math.max(0.1, 10 * b.smoothnessLevel));
      void 0 !== b.lighteningLevel &&
        this.manager.setLightLevel(Math.max(0.1, b.lighteningLevel / 2));
      void 0 !== b.rednessLevel &&
        this.manager.setRednessLevel(Math.max(0.01, b.rednessLevel));
      void 0 !== b.lighteningContrastLevel &&
        this.manager.setContrastLevel(b.lighteningContrastLevel);
      this.enabled !== a &&
        (this.manager.setEnableBeauty(a),
        (this.enabled = a),
        a ? this.input && (await this.startEffect()) : await this.stopEffect());
    }
    destroy() {
      this.onOutputChange = void 0;
      this.stopEffect();
      this.enabled = !1;
    }
    async startEffect() {
      let a = va();
      if (!this.input)
        return void k.warning(
          "video track is null, fail to start video effect!"
        );
      if (this.output) return void k.warning("video effect is already enabled");
      let b = await this.renderWithWebGL();
      await this.updateOutput(b);
      k.info("start video effect, output:", this.output);
      this.overloadDetector
        .startRecordBeautyEffectOutput(this.fps)
        .then((a) => {
          a || (this.onOverload && this.onOverload());
        });
      let d = () => {
        requestAnimationFrame(d);
        const a = v(),
          b = 1e3 / this.fps,
          g = this.lastRenderTime ? a - this.lastRenderTime : b;
        g < b ||
          ((this.lastRenderTime = a - (g - b)),
          this.video && this.video.paused && this.video.play(),
          this.enabled &&
            this.video &&
            (this.manager.render(this.video),
            this.output &&
              this.output.requestFrame &&
              this.output.requestFrame(),
            this.overloadDetector.addFrame()));
      };
      requestAnimationFrame(d);
      a.name === da.CHROME &&
        document.addEventListener(
          "visibilitychange",
          () => {
            document.hidden
              ? (this.stopChromeBackgroundLoop = We(() => {
                  this.enabled && this.video && this.manager.render(this.video);
                  this.output &&
                    this.output.requestFrame &&
                    this.output.requestFrame();
                  this.overloadDetector.addFrame();
                }, this.fps))
              : this.stopChromeBackgroundLoop &&
                (this.stopChromeBackgroundLoop(),
                (this.stopChromeBackgroundLoop = null));
          },
          !1
        );
    }
    async stopEffect() {
      k.info("stop video effect");
      this.overloadDetector.stopRecordBeautyEffectOutput();
      this.manager.release();
      this.canvas && this.canvas.remove();
      this.video && this.video.remove();
      this.video = this.canvas = void 0;
      await this.updateOutput(void 0);
    }
    async _setInput(a) {
      this.enabled && !this.video && (await this.startEffect());
    }
    _removeInput() {
      this.stopEffect();
    }
    async renderWithWebGL() {
      var a;
      if (!this.input)
        throw new m(
          l.BEAUTY_PROCESSOR_INTERNAL_ERROR,
          "can not renderWithWebGL, no input"
        );
      this.canvas && (this.canvas.remove(), (this.canvas = void 0));
      this.video && (this.video.remove(), (this.video = void 0));
      this.canvas = document.createElement("canvas");
      this.video = document.createElement("video");
      this.video.setAttribute("autoplay", "");
      this.video.setAttribute("muted", "");
      this.video.muted = !0;
      this.video.setAttribute("playsinline", "");
      this.video.setAttribute("style", "display:none");
      this.video.srcObject = new MediaStream([this.input]);
      let b = new u((a) => {
          const b = () => {
            this.video && this.video.removeEventListener("playing", b);
            a();
          };
          this.video && this.video.addEventListener("playing", b);
        }),
        d = this.input.getSettings(),
        e = d.width,
        f = d.height;
      if (
        (d.frameRate &&
          this.fps !== d.frameRate &&
          ((this.fps = d.frameRate),
          k.debug("beauty video processor: set fps to", this.fps)),
        k.debug(
          n((a = "beauty video processor: width ".concat(e, " height "))).call(
            a,
            f
          )
        ),
        !e || !f)
      )
        throw new m(
          l.BEAUTY_PROCESSOR_INTERNAL_ERROR,
          "can not get track resolution"
        );
      this.canvas.width = e;
      this.canvas.height = f;
      this.video.setAttribute("width", e.toString());
      this.video.setAttribute("height", f.toString());
      this.manager.init(e, f, this.canvas);
      this.video.play();
      await b;
      return this.canvas
        .captureStream(ea.supportRequestFrame ? 0 : this.fps)
        .getVideoTracks()[0];
    }
  }
  class bb extends qg {
    constructor(a, b, d, e) {
      super(a, e);
      this.trackMediaType = "video";
      this._enabled = !0;
      Zc(a)
        .then(([a, b]) => {
          this._videoHeight = b;
          this._videoWidth = a;
        })
        .catch(og);
      this._encoderConfig = b;
      this._optimizationMode = d;
    }
    get isPlaying() {
      return !!this._player;
    }
    play(a, b = {}) {
      let d = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.LOCAL_VIDEO_TRACK_PLAY,
        options: [
          this.getTrackId(),
          "string" == typeof a ? a : "HTMLElement",
          b
        ]
      });
      if (!(a instanceof HTMLElement)) {
        let b = document.getElementById(a.toString());
        var e;
        b
          ? (a = b)
          : (k.warning(
              n(
                (e = "[track-".concat(this.getTrackId(), '] can not find "#'))
              ).call(e, a, '" element, use document.body')
            ),
            (a = document.body));
      }
      k.debug(
        "[track-".concat(this.getTrackId(), "] start video playback"),
        w(b)
      );
      a = Od({}, this._getDefaultPlayerConfig(), {}, b, {
        trackId: this.getTrackId(),
        element: a
      });
      this._player
        ? this._player.updateConfig(a)
        : ((this._player = new al(a)),
          this._player.updateVideoTrack(this._mediaStreamTrack));
      this._player.play();
      d.onSuccess();
    }
    stop() {
      let a = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.LOCAL_VIDEO_TRACK_STOP,
        options: [this.getTrackId()]
      });
      if (!this._player) return a.onSuccess();
      this._player.destroy();
      this._player = void 0;
      k.debug("[track-".concat(this.getTrackId(), "] stop video playback"));
      a.onSuccess();
    }
    async setEnabled(a) {
      if (a !== this._enabled) {
        k.info("[".concat(this.getTrackId(), "] start setEnabled"), a);
        var b = await this._enabledMutex.lock();
        if (!a) {
          this._originMediaStreamTrack.enabled = !1;
          try {
            await Ya(this, L.NEED_REMOVE_TRACK, this);
          } catch (d) {
            throw (
              (k.error(
                "[".concat(this.getTrackId(), "] setEnabled to false error"),
                d.toString()
              ),
              b(),
              d)
            );
          }
          return (
            (this._enabled = !1),
            k.info(
              "[".concat(this.getTrackId(), "] setEnabled to false success")
            ),
            b()
          );
        }
        this._originMediaStreamTrack.enabled = !0;
        try {
          await Ya(this, L.NEED_ADD_TRACK, this);
        } catch (d) {
          throw (
            (k.error(
              "[".concat(this.getTrackId(), "] setEnabled to true error"),
              d.toString()
            ),
            b(),
            d)
          );
        }
        k.info("[".concat(this.getTrackId(), "] setEnabled to true success"));
        this._enabled = !0;
        b();
      }
    }
    getStats() {
      cd(() => {
        k.warning(
          "[deprecated] LocalVideoTrack.getStats will be removed in the future, use AgoraRTCClient.getLocalVideoStats instead"
        );
      }, "localVideoTrackGetStatsWarning");
      return ec(this, L.GET_STATS) || Od({}, te);
    }
    async setBeautyEffect(a, b = {}) {
      let d = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.LOCAL_VIDEO_TRACK_BEAUTY,
        options: [this.getTrackId(), a, b]
      });
      if (a || this._videoBeautyProcessor) {
        if (!this._enabled && a)
          throw (
            ((a = new m(
              l.TRACK_IS_DISABLED,
              "can not enable beauty effect when track is disabled"
            )),
            d.onError(a),
            a)
          );
        k.info(
          "[".concat(this.getTrackId(), "] start setBeautyEffect"),
          a,
          w(b)
        );
        try {
          this._videoBeautyProcessor
            ? await this._videoBeautyProcessor.setBeautyEffectOptions(a, b)
            : ((this._videoBeautyProcessor = new Qp()),
              (this._videoBeautyProcessor.onOverload = () => {
                Za(() => this.emit(td.BEAUTY_EFFECT_OVERLOAD));
              }),
              await this._videoBeautyProcessor.setBeautyEffectOptions(a, b),
              await this._registerTrackProcessor(this._videoBeautyProcessor));
        } catch (e) {
          throw (
            (k.error(
              "[".concat(this.getTrackId(), "] setBeautyEffect error"),
              e.toString()
            ),
            d.onError(e),
            e)
          );
        }
        k.info("[".concat(this.getTrackId(), "] setBeautyEffect success"));
        d.onSuccess();
      }
    }
    getCurrentFrameData() {
      return this._player
        ? this._player.getCurrentFrame()
        : new ImageData(2, 2);
    }
    _updatePlayerSource() {
      this._player && this._player.updateVideoTrack(this._mediaStreamTrack);
    }
    _getDefaultPlayerConfig() {
      return { fit: "contain" };
    }
  }
  class el extends bb {
    constructor(a, b, d, e, f) {
      super(a, b.encoderConfig ? uc(b.encoderConfig) : {}, e, f);
      this._enabled = !0;
      this._deviceName = "default";
      this._config = b;
      this._constraints = d;
      this._deviceName = a.label;
      this._config.encoderConfig &&
        (this._encoderConfig = uc(this._config.encoderConfig));
    }
    async setDevice(a) {
      var b;
      let d = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.CAM_VIDEO_TRACK_SET_DEVICE,
        options: [this.getTrackId(), a]
      });
      if (!this._enabled)
        throw (
          ((a = new m(
            l.TRACK_IS_DISABLED,
            "can not set device when track is disabled"
          )),
          d.onError(a),
          a)
        );
      k.info(
        n((b = "[".concat(this.getTrackId(), "] set device to "))).call(b, a)
      );
      try {
        let d = await ub.getDeviceById(a);
        b = {};
        b.video = Od({}, this._constraints);
        b.video.deviceId = { exact: a };
        b.video.facingMode = void 0;
        this._originMediaStreamTrack.stop();
        let f = null;
        try {
          f = await Bb(b, this.getTrackId());
        } catch (g) {
          throw (
            (k.error(
              "[".concat(this.getTrackId(), "] setDevice failed"),
              g.toString()
            ),
            (f = await Bb({ video: this._constraints }, this.getTrackId())),
            await this._updateOriginMediaStreamTrack(f.getVideoTracks()[0], !1),
            g)
          );
        }
        await this._updateOriginMediaStreamTrack(f.getVideoTracks()[0], !1);
        Zc(this._originMediaStreamTrack).then(([a, b]) => {
          this._videoHeight = b;
          this._videoWidth = a;
        });
        this._deviceName = d.label;
        this._config.cameraId = a;
        this._constraints.deviceId = { exact: a };
      } catch (e) {
        throw (
          (d.onError(e),
          k.error(
            "[".concat(this.getTrackId(), "] setDevice error"),
            e.toString()
          ),
          e)
        );
      }
      k.info("[".concat(this.getTrackId(), "] setDevice success"));
      d.onSuccess();
    }
    async setEnabled(a) {
      if (a !== this._enabled) {
        k.info("[".concat(this.getTrackId(), "] start setEnabled"), a);
        var b = await this._enabledMutex.lock();
        if (!a) {
          this._originMediaStreamTrack.onended = null;
          this._originMediaStreamTrack.stop();
          this._enabled = !1;
          try {
            await Ya(this, L.NEED_REMOVE_TRACK, this);
          } catch (e) {
            throw (
              (k.error(
                "[".concat(this.getTrackId(), "] setEnabled to false error"),
                e.toString()
              ),
              b(),
              e)
            );
          }
          return (
            k.info(
              "[".concat(this.getTrackId(), "] setEnabled to false success")
            ),
            b()
          );
        }
        a = Od({}, this._constraints);
        var d = ub.searchDeviceIdByName(this._deviceName);
        d && !a.deviceId && (a.deviceId = { exact: d });
        try {
          let a = await Bb({ video: this._constraints }, this.getTrackId());
          await this._updateOriginMediaStreamTrack(a.getVideoTracks()[0], !1);
          await Ya(this, L.NEED_ADD_TRACK, this);
        } catch (e) {
          throw (
            (k.error(
              "[".concat(this.getTrackId(), "] setEnabled true error"),
              e.toString()
            ),
            b(),
            e)
          );
        }
        Zc(this._originMediaStreamTrack).then(([a, b]) => {
          this._videoHeight = b;
          this._videoWidth = a;
        });
        k.info("[".concat(this.getTrackId(), "] setEnabled to true success"));
        this._enabled = !0;
        b();
      }
    }
    async setEncoderConfiguration(a) {
      let b = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.CAM_VIDEO_TRACK_SET_ENCODER_CONFIG,
        options: [this.getTrackId(), a]
      });
      if (!this._enabled)
        throw (
          ((a = new m(
            l.TRACK_IS_DISABLED,
            "can not set encoder configuration when track is disabled"
          )),
          b.onError(a),
          a)
        );
      a = uc(a);
      let d = JSON.parse(w(this._config));
      d.encoderConfig = a;
      let e = gf(d);
      k.debug(
        "[".concat(
          this.getTrackId(),
          "] setEncoderConfiguration applyConstraints"
        ),
        w(a),
        w(e)
      );
      try {
        await this._originMediaStreamTrack.applyConstraints(e),
          Zc(this._originMediaStreamTrack).then(([a, b]) => {
            this._videoHeight = b;
            this._videoWidth = a;
          });
      } catch (f) {
        throw (
          ((a = new m(l.UNEXPECTED_ERROR, f.toString())),
          k.error(
            "[track-".concat(this.getTrackId(), "] applyConstraints error"),
            a.toString()
          ),
          b.onError(a),
          a)
        );
      }
      this._config = d;
      this._constraints = e;
      this._encoderConfig = a;
      try {
        await Ya(this, L.NEED_RENEGOTIATE);
      } catch (f) {
        return b.onError(f), f.throw();
      }
      b.onSuccess();
    }
    _getDefaultPlayerConfig() {
      return { mirror: !0, fit: "cover" };
    }
  }
  class fl extends $k {
    constructor(a, b, d, e) {
      super(b, b.stringUid || b.uid);
      this.type = "pub";
      this.detecting = !1;
      this.renegotiateWithGateway = async () => (
        k.debug("[pc-".concat(this.pc.ID, "] renegotiate start")),
        new u(async (a, b) => {
          this.connectionState = "connecting";
          let d = (e) => {
            "connected" === e && (this.off(G.CONNECTION_STATE_CHANGE, d), a());
            "disconnected" === e &&
              (this.off(G.CONNECTION_STATE_CHANGE, d),
              b(new m(l.OPERATION_ABORT, "renegotiate abort")));
          };
          this.on(G.CONNECTION_STATE_CHANGE, d);
          var e = await this.pc.createOfferSDP();
          this.audioTrack &&
            this.audioTrack._encoderConfig &&
            (e = hf(e, this.audioTrack._encoderConfig));
          await this.pc.setOfferSDP(e);
          let f = await Ha(this, G.NEED_RENEGOTIATE, e);
          e = km(e, this.updateAnswerSDP(f.sdp));
          await this.pc.setAnswerSDP(e);
          k.debug("[pc-".concat(this.pc.ID, "] renegotiate success"));
          this.connectionState = "connected";
        })
      );
      this.handleStreamRenegotiate = (a, b) => {
        "connected" === this.connectionState
          ? this.renegotiateWithGateway().then(a).catch(b)
          : a();
      };
      this.handleReplaceTrack = (a, b, d) => {
        if (this.audioTrack instanceof Rc && "audio" === a.kind)
          return u.resolve();
        this.pc
          .replaceTrack(a)
          .then((a) => (a ? this.renegotiateWithGateway() : u.resolve()))
          .then(b)
          .catch(d);
      };
      this.handleCloseAudioTrack = (a) => {};
      this.handleCloseVideoTrack = () => {
        this.lowStreamConnection &&
          this.lowStreamConnection.videoTrack &&
          this.lowStreamConnection.videoTrack.close();
      };
      this.handleGetSessionID = (a) => {
        a(this.joinInfo.sid);
      };
      this.handleGetLocalVideoStats = (a) => {
        a(this.statsCollector.getLocalVideoTrackStats(this.connectionId));
      };
      this.handleGetLocalAudioStats = (a) => {
        a(this.statsCollector.getLocalAudioTrackStats(this.connectionId));
      };
      this.isLowStreamConnection = !!e;
      this.codec = d;
      this.statsCollector = a;
      this.statsCollector.addLocalConnection(this);
    }
    getAllTracks() {
      let a = [];
      return (
        this.videoTrack && a.push(this.videoTrack),
        this.audioTrack && this.audioTrack instanceof Rc
          ? (a = n(a).call(a, this.audioTrack.trackList))
          : this.audioTrack && a.push(this.audioTrack),
        a
      );
    }
    async addTracks(a) {
      let b = ea;
      if ("connecting" === this.connectionState)
        try {
          return (
            await this.createWaitConnectionConnectedPromise(),
            await this.addTracks(a)
          );
        } catch (g) {
          throw new m(l.OPERATION_ABORT, "publish abort");
        }
      var d = !1;
      let e = this.getAllTracks();
      a = Ih((a = M(a).call(a, (a) => -1 === E(e).call(e, a))));
      for (let e = 0; e < a.length; e += 1) {
        var f = a[e];
        if (!(f instanceof qg)) return new m(l.INVALID_LOCAL_TRACK).throw();
        if (f instanceof bb && this.videoTrack)
          return new m(l.CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS).throw();
        if (f instanceof Va && this.audioTrack)
          if (this.audioTrack instanceof Rc) this.audioTrack.addAudioTrack(f);
          else {
            if (!b.webAudioMediaStreamDest)
              throw new m(
                l.NOT_SUPPORT,
                "your browser is not support audio mixing"
              );
            d = new Rc();
            d.addAudioTrack(this.audioTrack);
            d.addAudioTrack(f);
            d = await this.addTrackWithPC(d);
          }
        else
          f instanceof bb && this.isLowStreamConnection
            ? ((d = this.lowStreamParameter || {
                width: 160,
                height: 120,
                framerate: 15,
                bitrate: 50
              }),
              (f = lm(f, d)),
              (f = new bb(f, { bitrateMax: d.bitrate, bitrateMin: d.bitrate })),
              f._hints.push(ib.LOW_STREAM),
              (d = await this.addTrackWithPC(f)))
            : ((this.detecting = !0),
              Cc(() => {
                this.detecting = !1;
              }, 8e3),
              (d = await this.addTrackWithPC(f)));
      }
      d && (await this.renegotiateWithGateway());
      r(a).call(a, (a) => this.bindTrackEvents(a));
    }
    async removeTracks(a, b) {
      let d = this.getAllTracks();
      a = Ih((a = M(a).call(a, (a) => -1 !== E(d).call(d, a))));
      let e = [];
      for (let b = 0; b < a.length; b += 1) {
        let d = a[b];
        this.unbindTrackEvents(d);
        this.audioTrack instanceof Rc && d instanceof Va
          ? (this.audioTrack.removeAudioTrack(d),
            0 === this.audioTrack.trackList.length &&
              (e.push(this.audioTrack), (this.audioTrack = void 0)))
          : d instanceof Va
          ? (e.push(d), (this.audioTrack = void 0))
          : d instanceof bb &&
            (e.push(d),
            this.isLowStreamConnection && d.close(),
            (this.videoTrack = void 0));
      }
      if (this.videoTrack || this.audioTrack) {
        if (0 !== e.length) {
          if ("connecting" === this.connectionState)
            try {
              await this.createWaitConnectionConnectedPromise();
            } catch (g) {
              return;
            }
          for (let a of e) {
            var f;
            k.debug(
              n((f = "[".concat(this.connectionId, "] remove "))).call(
                f,
                a.trackMediaType,
                " from pc"
              )
            );
            await this.pc.removeTrack(a._mediaStreamTrack);
          }
          await this.renegotiateWithGateway();
        }
      } else await this.closeP2PConnection(b);
    }
    startP2PConnection() {
      return new u(async (a, b) => {
        if (!this.audioTrack && !this.videoTrack)
          return b(new m(l.UNEXPECTED_ERROR, "no track to publish"));
        let d = (e) => {
          var f;
          "connected" === e &&
            (t.publish(this.joinInfo.sid, {
              lts: this.startTime,
              succ: !0,
              ec: null,
              audioName: this.audioTrack && this.audioTrack.getTrackLabel(),
              videoName: this.videoTrack && this.videoTrack.getTrackLabel(),
              screenshare: !(
                !this.videoTrack ||
                -1 === E((f = this.videoTrack._hints)).call(f, ib.SCREEN_TRACK)
              ),
              audio: !!this.audioTrack,
              video: !!this.videoTrack,
              p2pid: this.pc.ID,
              publishRequestid: this.ID
            }),
            this.off(G.CONNECTION_STATE_CHANGE, d),
            a());
          if ("disconnected" === e) {
            if (
              (this.off(G.CONNECTION_STATE_CHANGE, d), this.disconnectedReason)
            )
              return b(this.disconnectedReason);
            b(new m(l.OPERATION_ABORT, "publish abort"));
          }
        };
        this.on(G.CONNECTION_STATE_CHANGE, d);
        this.disconnectedReason = void 0;
        this.connectionState = "connecting";
        this.startTime = v();
        try {
          !this.pc.videoTrack &&
            this.videoTrack &&
            (await this.pc.addTrack(this.videoTrack._mediaStreamTrack));
          !this.pc.audioTrack &&
            this.audioTrack &&
            (await this.pc.addTrack(this.audioTrack._mediaStreamTrack));
          let a = await this.pc.createOfferSDP();
          this.audioTrack &&
            this.audioTrack._encoderConfig &&
            (a = hf(a, this.audioTrack._encoderConfig));
          await this.pc.setOfferSDP(a);
          k.debug(
            "[".concat(this.connectionId, "] create and set offer success")
          );
          let b = await Ha(this, G.NEED_ANSWER, {
              messageType: "OFFER",
              sdp: a,
              offererSessionId: 104,
              retry: !0
            }),
            d = this.updateAnswerSDP(b.sdp);
          await this.pc.setAnswerSDP(d);
          k.debug("[".concat(this.connectionId, "] set answer success"));
          await this.icePromise;
          this.connectionState = "connected";
          this.startUploadStats();
        } catch (f) {
          var e;
          this.off(G.CONNECTION_STATE_CHANGE, d);
          this.connectionState = "disconnected";
          t.publish(this.joinInfo.sid, {
            lts: this.startTime,
            succ: !1,
            ec: f.code,
            audioName: this.audioTrack && this.audioTrack.getTrackLabel(),
            videoName: this.videoTrack && this.videoTrack.getTrackLabel(),
            screenshare: !(
              !this.videoTrack ||
              -1 === E((e = this.videoTrack._hints)).call(e, ib.SCREEN_TRACK)
            ),
            audio: !!this.audioTrack,
            video: !!this.videoTrack,
            p2pid: this.pc.ID,
            publishRequestid: this.ID
          });
          k.error(
            "[".concat(this.connectionId, "] connection error"),
            f.toString()
          );
          b(f);
        }
      });
    }
    async closeP2PConnection(a) {
      let b = this.getAllTracks();
      var d;
      (r(b).call(b, (a) => {
        this.unbindTrackEvents(a);
      }),
      this.isLowStreamConnection && this.videoTrack && this.videoTrack.close(),
      (this.videoTrack = void 0),
      this.audioTrack instanceof Rc) &&
        r((d = this.audioTrack.trackList)).call(d, (a) => {
          this.audioTrack.removeAudioTrack(a);
        });
      this.audioTrack = void 0;
      this.stopUploadStats();
      this.statsCollector.removeConnection(this.connectionId);
      await this.closePC(a);
      this.connectionState = "disconnected";
      this.removeAllListeners();
    }
    getNetworkQuality() {
      var a,
        b = this.pc.getStats();
      if (!b.videoSend[0] && !b.audioSend[0]) return 1;
      var d = ec(this, G.NEED_SIGNAL_RTT),
        e = b.videoSend[0] ? b.videoSend[0].rttMs : void 0;
      let f = b.audioSend[0] ? b.audioSend[0].rttMs : void 0;
      e = e && f ? (e + f) / 2 : e || f;
      d =
        (70 * b.sendPacketLossRate) / 50 +
        (0.3 * ((e && d ? (e + d) / 2 : e || d) || 0)) / 1500;
      d = 0.17 > d ? 1 : 0.36 > d ? 2 : 0.59 > d ? 3 : 0.1 > d ? 4 : 5;
      return this.videoTrack &&
        this.videoTrack._encoderConfig &&
        -1 === E((a = this.videoTrack._hints)).call(a, ib.SCREEN_TRACK) &&
        ((a = this.videoTrack._encoderConfig.bitrateMax),
        (b = b.bitrate.actualEncoded),
        a && b)
        ? ((b = (1e3 * a - b) / (1e3 * a)),
          yo[0.15 > b ? 0 : 0.3 > b ? 1 : 0.45 > b ? 2 : 0.6 > b ? 3 : 4][d])
        : d;
    }
    uploadStats(a, b) {
      let d = this.audioTrack ? Al(a, this.audioTrack) : void 0,
        e = this.videoTrack ? zl(a, this.videoTrack) : void 0,
        f = Fh(a, b),
        g = yl(a);
      d && Za(() => this.emit(G.NEED_UPLOAD, sb.PUBLISH_STATS, d));
      e &&
        Za(() => this.emit(G.NEED_UPLOAD, sb.PUBLISH_STATS, mm({}, e, {}, f)));
      g && Za(() => this.emit(G.NEED_UPLOAD, sb.PUBLISH_STATS, g));
    }
    uploadSlowStats(a) {
      let b = Fh(a);
      b && Za(() => this.emit(G.NEED_UPLOAD, sb.PUBLISH_STATS, b));
    }
    uploadRelatedStats(a) {
      let b = Dl(a);
      b &&
        Za(() => {
          this.emit(G.NEED_UPLOAD, sb.PUBLISH_RELATED_STATS, b);
        });
    }
    bindTrackEvents(a) {
      this.isLowStreamConnection ||
        (a instanceof Va
          ? (a.addListener(L.GET_STATS, this.handleGetLocalAudioStats),
            a.addListener(L.NEED_CLOSE, this.handleCloseAudioTrack))
          : a instanceof bb &&
            (a.addListener(L.GET_STATS, this.handleGetLocalVideoStats),
            a.addListener(L.NEED_CLOSE, this.handleCloseVideoTrack)),
        a.addListener(L.NEED_RENEGOTIATE, this.handleStreamRenegotiate),
        a.addListener(L.NEED_REPLACE_TRACK, this.handleReplaceTrack),
        a.addListener(L.NEED_SESSION_ID, this.handleGetSessionID));
    }
    unbindTrackEvents(a) {
      this.isLowStreamConnection ||
        (a instanceof Va
          ? (a.off(L.GET_STATS, this.handleGetLocalAudioStats),
            a.off(L.NEED_CLOSE, this.handleCloseAudioTrack))
          : a instanceof bb &&
            (a.off(L.GET_STATS, this.handleGetLocalVideoStats),
            a.off(L.NEED_CLOSE, this.handleCloseVideoTrack)),
        a.off(L.NEED_RENEGOTIATE, this.handleStreamRenegotiate),
        a.off(L.NEED_REPLACE_TRACK, this.handleReplaceTrack),
        a.off(L.NEED_SESSION_ID, this.handleGetSessionID));
    }
    async addTrackWithPC(a) {
      if ("connecting" === this.connectionState)
        return new m(
          l.INVALID_OPERATION,
          "last publish operation has not finished"
        ).throw();
      var b = this.videoTrack;
      let d = !1;
      this.audioTrack && a instanceof Va
        ? ((this.audioTrack = a),
          k.debug("[".concat(this.connectionId, "] replace pc audio track")),
          (d = await this.pc.replaceTrack(a._mediaStreamTrack)))
        : this.videoTrack && a instanceof bb
        ? ((this.videoTrack = a),
          k.debug("[".concat(this.connectionId, "] replace pc video track")),
          (d = await this.pc.replaceTrack(a._mediaStreamTrack)))
        : a instanceof Va
        ? ((this.audioTrack = a),
          k.debug("[".concat(this.connectionId, "] add audio track to pc")),
          await this.pc.addTrack(a._mediaStreamTrack),
          (d = !0))
        : a instanceof bb &&
          ((this.videoTrack = a),
          k.debug("[".concat(this.connectionId, "] add video track to pc")),
          await this.pc.addTrack(a._mediaStreamTrack),
          (d = !0));
      a = ea;
      this.videoTrack !== b &&
        this.videoTrack &&
        a.supportSetRtpSenderParameters &&
        ((b = {}),
        (a = "balanced"),
        this.videoTrack._encoderConfig &&
          (b.maxBitrate = this.videoTrack._encoderConfig.bitrateMax
            ? 1e3 * this.videoTrack._encoderConfig.bitrateMax
            : void 0),
        "motion" === this.videoTrack._optimizationMode
          ? (a = "maintain-framerate")
          : "detail" === this.videoTrack._optimizationMode &&
            (a = "maintain-resolution"),
        k.debug("[".concat(this.connectionId, "] set pc rtp sender"), b, a),
        await this.pc.setRtpSenderParameters(b, a));
      return "disconnected" !== this.connectionState && d;
    }
    updateAnswerSDP(a) {
      var b, d;
      this.videoTrack &&
        -1 !== E((b = this.videoTrack._hints)).call(b, ib.SCREEN_TRACK) &&
        ((a = a.replace("a=x-google-flag:conference\r\n", "")),
        "detail" === this.videoTrack._optimizationMode &&
          (k.debug(
            "[".concat(this.connectionId, "] remove pc abs extension and remb")
          ),
          (a = a
            .replace(/a=.*abs-send-time\r\n/g, "")
            .replace(/a=.*goog-remb\r\n/g, ""))));
      if (
        this.videoTrack &&
        this.videoTrack._encoderConfig &&
        -1 === E((d = this.videoTrack._hints)).call(d, ib.SCREEN_TRACK)
      ) {
        {
          b = this.codec;
          var e = this.videoTrack._encoderConfig,
            f = ea;
          d = e.bitrateMin;
          e = e.bitrateMax;
          let k = a.match(/m=video.*\r\n/) || a.match(/m=video.*\n/);
          if (k && 0 < k.length && f.supportMinBitrate && d) {
            f = null;
            var g, h;
            if (
              ("h264" === b
                ? (f =
                    a.match(/a=rtpmap:(\d+) H264\/90000\r\n/) ||
                    a.match(/a=rtpmap:(\d+) H264\/90000\n/))
                : "vp8" === b &&
                  (f =
                    a.match(/a=rtpmap:(\d+) VP8\/90000\r\n/) ||
                    a.match(/a=rtpmap:(\d+) VP8\/90000\n/)),
              f && f[1])
            )
              a = a.replace(
                k[0],
                n(
                  (g = n((h = "".concat(k[0], "a=fmtp:"))).call(
                    h,
                    f[1],
                    " x-google-min-bitrate="
                  ))
                ).call(g, d, "\r\n")
              );
          }
          if (k && 0 < k.length && e) {
            var l, m;
            g = "AS";
            va().name === da.FIREFOX && ((e = 1e3 * (e >>> 0)), (g = "TIAS"));
            a = a.replace(
              k[0],
              n((l = n((m = "".concat(k[0], "b="))).call(m, g, ":"))).call(
                l,
                e,
                "\r\n"
              )
            );
          }
        }
      }
      this.audioTrack &&
        this.audioTrack._encoderConfig &&
        (a = hf(a, this.audioTrack._encoderConfig));
      l = a;
      m = va();
      return l =
        m.name !== da.SAFARI && m.os !== aa.IOS
          ? l
          : l.replace(/a=.*video-orientation\r\n/g, "");
    }
    createPC() {
      this.pc = new Xk({ turnServer: this.joinInfo.turnServer });
      this.updateICEPromise();
    }
    async closePC(a) {
      return (
        (this.pc.onICEConnectionStateChange = void 0),
        this.pc.close(),
        !a && (await Ha(this, G.NEED_UNPUB))
      );
    }
    onPCDisconnected(a) {
      var b;
      t.publish(this.joinInfo.sid, {
        lts: this.startTime,
        succ: !1,
        ec: a.code,
        audioName: this.audioTrack && this.audioTrack.getTrackLabel(),
        videoName: this.videoTrack && this.videoTrack.getTrackLabel(),
        screenshare: !(
          !this.videoTrack ||
          -1 === E((b = this.videoTrack._hints)).call(b, ib.SCREEN_TRACK)
        ),
        audio: !!this.audioTrack,
        video: !!this.videoTrack,
        p2pid: this.pc.ID,
        publishRequestid: this.ID
      });
    }
  }
  class gl extends Nk {
    constructor(a, b, d) {
      super(a);
      this._isDestroyed = !1;
      this._userId = b;
      this._uintId = d;
    }
    getUserId() {
      return this._userId;
    }
    _updateOriginMediaStreamTrack(a) {
      this._mediaStreamTrack = this._originMediaStreamTrack = a;
      this._updatePlayerSource();
    }
    _destroy() {
      this._isDestroyed = !0;
      k.info("[track-".concat(this.getTrackId(), "] is destroyed"));
      this.stop();
    }
  }
  class yd extends gl {
    constructor(a, b, d) {
      super(a, b, d);
      this.trackMediaType = "video";
      Zc(a)
        .then(([a, b]) => {
          this._videoHeight = b;
          this._videoWidth = a;
        })
        .catch(og);
    }
    get isPlaying() {
      return !!this._player;
    }
    getStats() {
      cd(() => {
        k.warning(
          "[deprecated] RemoteVideoTrack.getStats will be removed in the future, use AgoraRTCClient.getRemoteVideoStats instead"
        );
      }, "remoteVideoTrackGetStatsWarning");
      return ec(this, L.GET_STATS) || jf({}, eg);
    }
    play(a, b = {}) {
      let d = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.REMOTE_VIDEO_TRACK_PLAY,
        options: [
          this.getTrackId(),
          "string" == typeof a ? a : "HTMLElement",
          b
        ]
      });
      if ("string" == typeof a) {
        let b = document.getElementById(a);
        var e;
        b
          ? (a = b)
          : (k.warning(
              n(
                (e = "[track-".concat(this.getTrackId(), '] can not find "#'))
              ).call(e, a, '" element, use document.body')
            ),
            (a = document.body));
      }
      k.debug(
        "[track-".concat(this.getTrackId(), "] start video playback"),
        w(b)
      );
      a = jf({ fit: "cover" }, b, { trackId: this.getTrackId(), element: a });
      this._player
        ? this._player.updateConfig(a)
        : ((this._player = new al(a)),
          this._player.updateVideoTrack(this._mediaStreamTrack),
          (this._player.onFirstVideoFrameDecoded = () => {
            this.emit(ue.FIRST_FRAME_DECODED);
          }));
      this._player.play();
      d.onSuccess();
    }
    stop() {
      let a = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.REMOTE_VIDEO_TRACK_STOP,
        options: [this.getTrackId()]
      });
      if (!this._player) return a.onSuccess();
      this._player.destroy();
      this._player = void 0;
      k.debug("[track-".concat(this.getTrackId(), "] stop video playback"));
      a.onSuccess();
    }
    getCurrentFrameData() {
      return this._player
        ? this._player.getCurrentFrame()
        : new ImageData(2, 2);
    }
    _updatePlayerSource() {
      k.debug(
        "[track-".concat(this.getTrackId(), "] update player source track")
      );
      this._player && this._player.updateVideoTrack(this._mediaStreamTrack);
    }
  }
  class zd extends gl {
    constructor(a, b, d) {
      super(a, b, d);
      this.trackMediaType = "audio";
      this._useAudioElement = !1;
      this._source = new Pk(a, !0);
      this._source.once(gb.RECEIVE_TRACK_BUFFER, () => {
        this.emit(ue.FIRST_FRAME_DECODED);
      });
      ea.webAudioWithAEC || (this._useAudioElement = !0);
    }
    get isPlaying() {
      return this._useAudioElement
        ? jb.isPlaying(this.getTrackId())
        : this._source.isPlayed;
    }
    setAudioFrameCallback(a, b = 4096) {
      if (!a)
        return (
          this._source.removeAllListeners(gb.ON_AUDIO_BUFFER),
          void this._source.stopGetAudioBuffer()
        );
      this._source.startGetAudioBuffer(b);
      this._source.removeAllListeners(gb.ON_AUDIO_BUFFER);
      this._source.on(gb.ON_AUDIO_BUFFER, (b) => a(b));
    }
    setVolume(a) {
      let b = t.reportApiInvoke(
        null,
        {
          tag: z.TRACER,
          name: A.REMOTE_AUDIO_SET_VOLUME,
          options: [this.getTrackId(), a]
        },
        300
      );
      this._useAudioElement
        ? jb.setVolume(this.getTrackId(), a)
        : this._source.setVolume(a / 100);
      b.onSuccess();
    }
    async setPlaybackDevice(a) {
      let b = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.REMOTE_AUDIO_SET_OUTPUT_DEVICE,
        options: [this.getTrackId(), a]
      });
      if (!this._useAudioElement)
        throw new m(
          l.NOT_SUPPORT,
          "your browser does not support setting the audio output device"
        );
      try {
        await jb.setSinkID(this.getTrackId(), a);
      } catch (d) {
        throw (b.onError(d), d);
      }
      b.onSuccess();
    }
    getVolumeLevel() {
      return this._source.getAudioLevel();
    }
    getStats() {
      cd(() => {
        k.warning(
          "[deprecated] RemoteAudioTrack.getStats will be removed in the future, use AgoraRTCClient.getRemoteAudioStats instead"
        );
      }, "remoteAudioTrackGetStatsWarning");
      return ec(this, L.GET_STATS) || jf({}, dg);
    }
    play() {
      let a = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.REMOTE_AUDIO_TRACK_PLAY,
        options: [this.getTrackId()]
      });
      k.debug("[".concat(this.getTrackId(), "] start audio playback"));
      this._useAudioElement
        ? (k.debug(
            "[track-".concat(this.getTrackId(), "] use audio element to play")
          ),
          jb.play(this._mediaStreamTrack, this.getTrackId()))
        : this._source.play();
      a.onSuccess();
    }
    stop() {
      let a = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.REMOTE_AUDIO_TRACK_STOP,
        options: [this.getTrackId()]
      });
      k.debug("[".concat(this.getTrackId(), "] stop audio playback"));
      this._useAudioElement ? jb.stop(this.getTrackId()) : this._source.stop();
      a.onSuccess();
    }
    _destroy() {
      super._destroy();
      this._source.destroy();
    }
    _isFreeze() {
      return this._source.isFreeze;
    }
    _updatePlayerSource() {
      k.debug(
        "[track-".concat(this.getTrackId(), "] update player source track")
      );
      this._source.updateTrack(this._mediaStreamTrack);
      this._useAudioElement &&
        jb.updateTrack(this.getTrackId(), this._mediaStreamTrack);
    }
  }
  class Rp extends $k {
    constructor(a, b, d, e) {
      super(d, a.uid);
      this.type = "sub";
      this.unusedTracks = [];
      this.onTrack = (a) => {
        var b, d;
        if (
          ("audio" === a.kind && !this.subscribeOptions.audio) ||
          ("video" === a.kind && !this.subscribeOptions.video)
        )
          return (
            this.unusedTracks.push(a),
            void k.debug(
              n(
                (d = "[".concat(
                  this.connectionId,
                  "] unused ontrack event, kind: "
                ))
              ).call(d, a.kind)
            )
          );
        k.debug(
          n(
            (b = "[".concat(
              this.connectionId,
              "] emit pc ontrack after subscribe "
            ))
          ).call(b, a.kind),
          a
        );
        b = "audio" === a.kind ? this.user._audioTrack : this.user._videoTrack;
        var e, f;
        b
          ? b._updateOriginMediaStreamTrack(a)
          : "audio" === a.kind
          ? ((this.user._audioTrack = new zd(
              a,
              this.getUserId(),
              this.user._uintid
            )),
            k.info(
              n(
                (e = "[".concat(
                  this.connectionId,
                  "] create remote audio track: "
                ))
              ).call(e, this.user._audioTrack.getTrackId())
            ),
            this.bindTrackEvents(this.user._audioTrack))
          : ((this.user._videoTrack = new yd(
              a,
              this.getUserId(),
              this.user._uintid
            )),
            k.info(
              n(
                (f = "[".concat(
                  this.connectionId,
                  "] create remote video track: "
                ))
              ).call(f, this.user._videoTrack.getTrackId())
            ),
            this.bindTrackEvents(this.user._videoTrack));
      };
      this.handleGetRemoteAudioStats = (a) => {
        a(this.statsCollector.getRemoteAudioTrackStats(this.connectionId));
      };
      this.handleGetRemoteVideoStats = (a) => {
        a(this.statsCollector.getRemoteVideoTrackStats(this.connectionId));
      };
      this.handleGetSessionID = (a) => {
        a(this.joinInfo.sid);
      };
      this.user = a;
      this.statsCollector = b;
      this.statsCollector.addRemoteConnection(this);
      this.subscribeOptions = e;
    }
    async startP2PConnection() {
      return new u(async (a, b) => {
        let d = (e) => {
          if (
            ("connected" === e &&
              (t.subscribe(this.joinInfo.sid, {
                lts: this.startTime,
                succ: !0,
                video: this.subscribeOptions.video,
                audio: this.subscribeOptions.audio,
                peerid: this.user.uid,
                ec: null,
                subscribeRequestid: this.ID,
                p2pid: this.pc.ID
              }),
              this.off(G.CONNECTION_STATE_CHANGE, d),
              a()),
            "disconnected" === e)
          ) {
            if (
              (this.off(G.CONNECTION_STATE_CHANGE, d), this.disconnectedReason)
            )
              return b(this.disconnectedReason);
            b(new m(l.OPERATION_ABORT, "subscribe abort"));
          }
        };
        if (
          (this.on(G.CONNECTION_STATE_CHANGE, d),
          (this.disconnectedReason = void 0),
          (this.connectionState = "connecting"),
          (this.startTime = v()),
          !this.subscribeOptions)
        )
          return void b(new m(l.UNEXPECTED_ERROR, "no subscribe options"));
        let e = new MediaStream(),
          f = new u((a) => {
            this.pc.onTrack = (b, d) => {
              var f, g;
              if (
                ("audio" === b.kind && !this.subscribeOptions.audio) ||
                ("video" === b.kind && !this.subscribeOptions.video)
              )
                return (
                  this.unusedTracks.push(b),
                  void k.debug(
                    n(
                      (g = "[".concat(
                        this.connectionId,
                        "] unused ontrack event "
                      ))
                    ).call(g, b.kind)
                  )
                );
              e.addTrack(b);
              g = {
                audio: 0 < e.getAudioTracks().length,
                video: 0 < e.getVideoTracks().length
              };
              k.debug(
                n(
                  (f = "[".concat(this.connectionId, "] subscribe ontrack: "))
                ).call(f, b.kind),
                d,
                b
              );
              a: {
                b = this.subscribeOptions;
                var h, l;
                d = rd((h = V(g))).call(h);
                h = rd((l = V(b))).call(l);
                for (l = 0; l < d.length; l += 1) {
                  if (d[l] !== h[l]) {
                    g = !1;
                    break a;
                  }
                  if (g[d[l]] !== b[d[l]]) {
                    g = !1;
                    break a;
                  }
                }
                g = !0;
              }
              g &&
                ((this.pc.onTrack = this.onTrack),
                k.debug(
                  "[".concat(this.connectionId, "] get all subscribed tracks")
                ),
                a(e));
            };
          });
        try {
          let a = ei(await this.pc.createOfferSDP());
          await this.pc.setOfferSDP(a);
          k.debug(
            "[".concat(this.connectionId, "] create and set offer success")
          );
          let b = await Ha(this, G.NEED_ANSWER, {
            messageType: "OFFER",
            sdp: a,
            offererSessionId: 104,
            retry: !0
          });
          await this.pc.setAnswerSDP(ei(b.sdp));
          k.debug("[".concat(this.connectionId, "] set answer success"));
          let d = await u.all([f, this.icePromise]),
            e = d[0].getAudioTracks()[0],
            l = d[0].getVideoTracks()[0];
          var g, h;
          e &&
            (this.user._audioTrack
              ? this.user._audioTrack._updateOriginMediaStreamTrack(e)
              : ((this.user._audioTrack = new zd(
                  e,
                  this.getUserId(),
                  this.user._uintid
                )),
                k.info(
                  n(
                    (g = "[".concat(
                      this.connectionId,
                      "] create remote audio track: "
                    ))
                  ).call(g, this.user._audioTrack.getTrackId())
                ),
                this.bindTrackEvents(this.user._audioTrack)));
          l &&
            (this.user._videoTrack
              ? this.user._videoTrack._updateOriginMediaStreamTrack(l)
              : ((this.user._videoTrack = new yd(
                  l,
                  this.getUserId(),
                  this.user._uintid
                )),
                k.info(
                  n(
                    (h = "[".concat(
                      this.connectionId,
                      "] create remote video track: "
                    ))
                  ).call(h, this.user._videoTrack.getTrackId())
                ),
                this.bindTrackEvents(this.user._videoTrack)));
          this.connectionState = "connected";
          this.startUploadStats();
        } catch (q) {
          this.off(G.CONNECTION_STATE_CHANGE, d),
            (this.connectionState = "disconnected"),
            t.subscribe(this.joinInfo.sid, {
              lts: this.startTime,
              succ: !1,
              video: this.subscribeOptions.video,
              audio: this.subscribeOptions.audio,
              peerid: this.user.uid,
              ec: q.code,
              subscribeRequestid: this.ID,
              p2pid: this.pc.ID
            }),
            b(q);
        }
      });
    }
    async closeP2PConnection(a) {
      "disconnected" !== this.connectionState &&
        (this.stopUploadStats(),
        this.statsCollector.removeConnection(this.connectionId),
        (this.connectionState = "disconnected"),
        await this.setSubscribeOptions({ audio: !1, video: !1 }),
        await this.closePC(a),
        this.removeAllListeners());
    }
    getNetworkQuality() {
      var a = this.pc.getStats();
      if (!a.audioRecv[0] && !a.videoRecv[0]) return 1;
      var b = ec(this, G.NEED_SIGNAL_RTT),
        d = a.rtt;
      b = (d && b ? (d + b) / 2 : d || b) || 0;
      d = a.audioRecv[0] ? a.audioRecv[0].jitterMs : void 0;
      a = a.recvPacketLossRate;
      let e = (70 * a) / 50 + (0.3 * b) / 1500;
      d && (e = (60 * a) / 50 + (0.2 * b) / 1500 + (0.2 * d) / 400);
      return 0.1 > e ? 1 : 0.17 > e ? 2 : 0.36 > e ? 3 : 0.59 > e ? 4 : 5;
    }
    uploadStats(a) {
      let b = this.user.audioTrack ? Cl(a, this.user.audioTrack) : void 0,
        d = this.user.videoTrack ? Bl(a, this.user.videoTrack) : void 0;
      b && Za(() => this.emit(G.NEED_UPLOAD, sb.SUBSCRIBE_STATS, b));
      d && Za(() => this.emit(G.NEED_UPLOAD, sb.SUBSCRIBE_STATS, d));
    }
    uploadSlowStats(a) {}
    uploadRelatedStats(a, b) {
      let d = Fl(a, this.getUserId(), this.user.audioTrack),
        e = El(a, this.getUserId(), b, this.user.videoTrack);
      d &&
        Za(() => {
          this.emit(G.NEED_UPLOAD, sb.SUBSCRIBE_RELATED_STATS, d);
        });
      e &&
        Za(() => {
          this.emit(G.NEED_UPLOAD, sb.SUBSCRIBE_RELATED_STATS, e);
        });
    }
    emitOnTrackFromUnusedTracks() {
      if (this.subscribeOptions) {
        var a = this.subscribeOptions.video;
        if (this.subscribeOptions.audio) {
          var b;
          let a = R((b = this.unusedTracks)).call(
            b,
            (a) => "audio" === a.kind && "live" === a.readyState
          );
          bd(this.unusedTracks, a);
          a && this.onTrack(a);
        }
        if (a) {
          var d;
          a = R((d = this.unusedTracks)).call(
            d,
            (a) => "video" === a.kind && "live" === a.readyState
          );
          bd(this.unusedTracks, a);
          a && this.onTrack(a);
        }
      }
    }
    async setSubscribeOptions(a) {
      var b, d, e, f;
      if (
        a.audio !== this.subscribeOptions.audio ||
        a.video !== this.subscribeOptions.video
      ) {
        if ("connecting" === this.connectionState)
          try {
            await this.createWaitConnectionConnectedPromise();
          } catch (g) {
            throw new m(
              l.OPERATION_ABORT,
              "can not update subscribe options, operation abort"
            );
          }
        (a.audio === this.subscribeOptions.audio &&
          a.video === this.subscribeOptions.video) ||
          (k.debug(
            n(
              (b = n(
                (d = n(
                  (e = n(
                    (f = "[".concat(
                      this.connectionId,
                      "] update subscribe options [a: "
                    ))
                  ).call(f, this.subscribeOptions.audio, ", v: "))
                ).call(e, this.subscribeOptions.video, "] -> [a: "))
              ).call(d, a.audio, ", v: "))
            ).call(b, a.video, "]")
          ),
          (this.subscribeOptions = a),
          !a.audio &&
            this.user._audioTrack &&
            (this.unusedTracks.push(
              this.user._audioTrack._originMediaStreamTrack
            ),
            this.user._audioTrack._destroy(),
            this.unbindTrackEvents(this.user._audioTrack),
            (this.user._audioTrack = void 0)),
          !a.video &&
            this.user._videoTrack &&
            (this.unusedTracks.push(
              this.user._videoTrack._originMediaStreamTrack
            ),
            this.user._videoTrack._destroy(),
            this.unbindTrackEvents(this.user._videoTrack),
            (this.user._videoTrack = void 0)),
          this.emitOnTrackFromUnusedTracks());
      }
    }
    createPC() {
      this.pc = new Yk({ turnServer: this.joinInfo.turnServer });
      this.pc.onFirstAudioDecoded = () => {
        t.firstRemoteFrame(
          this.joinInfo.sid,
          Ba.FIRST_AUDIO_DECODE,
          pa.FIRST_AUDIO_DECODE,
          {
            peer: this.user._uintid,
            subscribeElapse: v() - this.startTime,
            subscribeRequestid: this.ID,
            p2pid: this.pc.ID
          }
        );
      };
      this.pc.onFirstAudioReceived = () => {
        t.firstRemoteFrame(
          this.joinInfo.sid,
          Ba.FIRST_AUDIO_RECEIVED,
          pa.FIRST_AUDIO_RECEIVED,
          {
            peer: this.user._uintid,
            subscribeElapse: v() - this.startTime,
            subscribeRequestid: this.ID,
            p2pid: this.pc.ID
          }
        );
      };
      this.pc.onFirstVideoDecoded = (a, b) => {
        t.firstRemoteFrame(
          this.joinInfo.sid,
          Ba.FIRST_VIDEO_DECODE,
          pa.FIRST_VIDEO_DECODE,
          {
            peer: this.user._uintid,
            videowidth: a,
            videoheight: b,
            subscribeElapse: v() - this.startTime,
            subscribeRequestid: this.ID,
            p2pid: this.pc.ID
          }
        );
      };
      this.pc.onFirstVideoReceived = () => {
        t.firstRemoteFrame(
          this.joinInfo.sid,
          Ba.FIRST_VIDEO_RECEIVED,
          pa.FIRST_VIDEO_RECEIVED,
          {
            peer: this.user._uintid,
            subscribeElapse: v() - this.startTime,
            subscribeRequestid: this.ID,
            p2pid: this.pc.ID
          }
        );
      };
      this.updateICEPromise();
    }
    async closePC(a) {
      return (this.pc.audioTrack && this.pc.audioTrack.stop(),
      this.pc.videoTrack && this.pc.videoTrack.stop(),
      (this.pc.onTrack = void 0),
      (this.pc.onICEConnectionStateChange = void 0),
      this.pc.close(),
      a)
        ? !1
        : await Ha(this, G.NEED_UNSUB);
    }
    onPCDisconnected(a) {
      t.subscribe(this.joinInfo.sid, {
        lts: this.startTime,
        succ: !1,
        video: this.subscribeOptions.video,
        audio: this.subscribeOptions.audio,
        peerid: this.user.uid,
        ec: a.code,
        subscribeRequestid: this.ID,
        p2pid: this.pc.ID
      });
    }
    bindTrackEvents(a) {
      a instanceof zd
        ? a.addListener(L.GET_STATS, this.handleGetRemoteAudioStats)
        : a instanceof yd &&
          a.addListener(L.GET_STATS, this.handleGetRemoteVideoStats);
    }
    unbindTrackEvents(a) {
      a instanceof zd
        ? a.off(L.GET_STATS, this.handleGetRemoteAudioStats)
        : a instanceof yd && a.off(L.GET_STATS, this.handleGetRemoteVideoStats);
    }
  }
  class Sp extends Ua {
    constructor(a, b, d, e) {
      super();
      this.reconnectMode = "retry";
      this.commandReqId = this.reqId = 0;
      this.handleWebSocketOpen = () => {
        this.reconnectMode = "retry";
        this.startPingPong();
      };
      this.handleWebSocketMessage = (a) => {
        if (a.data) {
          a = JSON.parse(a.data);
          var b;
          a.requestId
            ? this.emit(n((b = "@".concat(a.requestId, "-"))).call(b, a.sid), a)
            : this.serviceMode === ma.INJECT
            ? this.emit(hb.INJECT_STREAM_STATUS, a)
            : (t.workerEvent(this.spec.sid, {
                actionType: "status",
                serverCode: a.code,
                workerType: this.serviceMode === ma.TRANSCODE ? 1 : 2
              }),
              this.emit(hb.PUBLISH_STREAM_STATUS, a));
        }
      };
      this.spec = b;
      this.token = a;
      this.serviceMode = e;
      this.websocket = new pg("live-streaming", d);
      this.websocket.on(Q.CONNECTED, this.handleWebSocketOpen);
      this.websocket.on(Q.ON_MESSAGE, this.handleWebSocketMessage);
      this.websocket.on(Q.REQUEST_NEW_URLS, (a, b) => {
        Ha(this, hb.REQUEST_NEW_ADDRESS).then(a).catch(b);
      });
      this.websocket.on(Q.RECONNECTING, () => {
        this.websocket.reconnectMode = this.reconnectMode;
      });
    }
    init(a) {
      return this.websocket.init(a);
    }
    async request(a, b, d, e) {
      this.reqId += 1;
      "request" === a && (this.commandReqId += 1);
      let f = this.commandReqId,
        g = this.reqId;
      if (!g || !this.websocket) throw new m(l.UNEXPECTED_ERROR);
      var h = kf(
        {
          command: a,
          sdkVersion: "4.1.0" === $a ? "0.0.1" : $a,
          seq: g,
          requestId: g,
          allocate: d,
          cname: this.spec.cname,
          appId: this.spec.appId,
          sid: this.spec.sid,
          uid: this.spec.uid.toString(),
          ts: Math.floor(v() / 1e3)
        },
        b
      );
      if ("closed" === this.websocket.state) throw new m(l.WS_DISCONNECT);
      let k = () =>
        new u((a, b) => {
          this.websocket.once(Q.CLOSED, () => b(new m(l.WS_ABORT)));
          this.websocket.once(Q.CONNECTED, a);
        });
      "connected" !== this.websocket.state && (await k());
      h.clientRequest && (h.clientRequest.workerToken = this.token);
      let p = new u((a, b) => {
        var d;
        const e = () => {
          b(new m(l.WS_ABORT));
        };
        this.websocket.once(Q.RECONNECTING, e);
        this.websocket.once(Q.CLOSED, e);
        this.once(n((d = "@".concat(g, "-"))).call(d, this.spec.sid), (b) => {
          a(b);
        });
      });
      e &&
        t.workerEvent(
          this.spec.sid,
          kf({}, e, {
            requestId: f,
            actionType: "request",
            payload: w(b.clientRequest),
            serverCode: 0,
            code: 0
          })
        );
      let r = v();
      this.websocket.sendMessage(h);
      h = null;
      try {
        h = await p;
      } catch (qa) {
        if ("closed" === this.websocket.state) throw qa;
        return await k(), await this.request(a, b, d);
      }
      return (
        e &&
          t.workerEvent(
            this.spec.sid,
            kf({}, e, {
              requestId: f,
              actionType: "response",
              payload: w(h.serverResponse),
              serverCode: h.code,
              success: 200 === h.code,
              responseTime: v() - r
            })
          ),
        200 !== h.code && this.handleResponseError(h),
        h
      );
    }
    tryNextAddress() {
      this.reconnectMode = "tryNext";
      this.websocket.reconnect("tryNext");
    }
    close() {
      let a = "4.1.0" === $a ? "0.0.1" : $a;
      this.reqId += 1;
      "connected" === this.websocket.state
        ? (this.websocket.sendMessage({
            command: "request",
            appId: this.spec.appId,
            cname: this.spec.cname,
            uid: this.spec.uid.toString(),
            sdkVersion: a,
            sid: this.spec.sid,
            seq: this.reqId,
            ts: Math.floor(v() / 1e3),
            requestId: this.reqId,
            clientRequest: { command: "DestroyWorker" }
          }),
          this.websocket.close(!1, !0))
        : this.websocket.close(!1);
      this.pingpongTimer &&
        (window.clearInterval(this.pingpongTimer),
        (this.pingpongTimer = void 0));
    }
    handleResponseError(a) {
      switch (a.code) {
        case ka.LIVE_STREAM_RESPONSE_ALREADY_EXISTS_STREAM:
          return void k.warning("live stream response already exists stream");
        case ka.LIVE_STREAM_RESPONSE_TRANSCODING_PARAMETER_ERROR:
        case ka.LIVE_STREAM_RESPONSE_BAD_STREAM:
        case ka.LIVE_STREAM_RESPONSE_WM_PARAMETER_ERROR:
          return new m(l.LIVE_STREAMING_INVALID_ARGUMENT, "", {
            code: a.code
          }).throw();
        case ka.LIVE_STREAM_RESPONSE_WM_WORKER_NOT_EXIST:
          if (
            "UnpublishStream" === a.serverResponse.command ||
            "UninjectStream" === a.serverResponse.command
          )
            break;
          throw new m(
            l.LIVE_STREAMING_INTERNAL_SERVER_ERROR,
            "live stream response wm worker not exist",
            { retry: !0 }
          );
        case ka.LIVE_STREAM_RESPONSE_NOT_AUTHORIZED:
          return new m(l.LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED, "", {
            code: a.code
          }).throw();
        case ka.LIVE_STREAM_RESPONSE_FAILED_LOAD_IMAGE:
          var b = new m(l.LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE);
          return this.emit(hb.WARNING, b, a.serverResponse.url);
        case ka.LIVE_STREAM_RESPONSE_REQUEST_TOO_OFTEN:
          return (
            (b = new m(l.LIVE_STREAMING_WARN_FREQUENT_REQUEST)),
            this.emit(hb.WARNING, b, a.serverResponse.url)
          );
        case ka.LIVE_STREAM_RESPONSE_NOT_FOUND_PUBLISH:
          throw new m(
            l.LIVE_STREAMING_INTERNAL_SERVER_ERROR,
            "live stream response wm worker not exist",
            { retry: !0 }
          );
        case ka.LIVE_STREAM_RESPONSE_NOT_SUPPORTED:
          return new m(l.LIVE_STREAMING_TRANSCODING_NOT_SUPPORT, "", {
            code: a.code
          }).throw();
        case ka.LIVE_STREAM_RESPONSE_MAX_STREAM_NUM:
          return (
            (b = new m(l.LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT)),
            this.emit(hb.WARNING, b, a.serverResponse.url)
          );
        case ka.LIVE_STREAM_RESPONSE_INTERNAL_SERVER_ERROR:
          return new m(l.LIVE_STREAMING_INTERNAL_SERVER_ERROR, "", {
            code: a.code
          }).throw();
        case ka.LIVE_STREAM_RESPONSE_RESOURCE_LIMIT:
          throw new m(
            l.LIVE_STREAMING_INTERNAL_SERVER_ERROR,
            "live stream resource limit",
            { retry: !0, changeAddress: !0 }
          );
        case ka.LIVE_STREAM_RESPONSE_WORKER_LOST:
        case ka.LIVE_STREAM_RESPONSE_WORKER_QUIT:
          if (
            "UnpublishStream" === a.serverResponse.command ||
            "UninjectStream" === a.serverResponse.command
          )
            break;
          throw new m(
            l.LIVE_STREAMING_INTERNAL_SERVER_ERROR,
            "error fail send message",
            { retry: !0, changeAddress: !0 }
          );
        case ka.ERROR_FAIL_SEND_MESSAGE:
          if (
            "UnpublishStream" === a.serverResponse.command ||
            "UninjectStream" === a.serverResponse.command
          )
            break;
          if (
            "UpdateTranscoding" === a.serverResponse.command ||
            "ControlStream" === a.serverResponse.command
          )
            return new m(
              l.LIVE_STREAMING_INTERNAL_SERVER_ERROR,
              "error fail send message",
              { code: a.code }
            ).throw();
          throw new m(
            l.LIVE_STREAMING_INTERNAL_SERVER_ERROR,
            "error fail send message",
            { retry: !0, changeAddress: !0 }
          );
        case ka.PUBLISH_STREAM_STATUS_ERROR_PUBLISH_BROKEN:
        case ka.PUBLISH_STREAM_STATUS_ERROR_RTMP_CONNECT:
        case ka.PUBLISH_STREAM_STATUS_ERROR_RTMP_HANDSHAKE:
        case ka.PUBLISH_STREAM_STATUS_ERROR_RTMP_PUBLISH:
          return new m(l.LIVE_STREAMING_CDN_ERROR, "", {
            code: a.code
          }).throw();
      }
    }
    startPingPong() {
      this.pingpongTimer && window.clearInterval(this.pingpongTimer);
      this.pingpongTimer = window.setInterval(() => {
        "connected" === this.websocket.state &&
          this.request("ping", {}).catch(og);
      }, 6e3);
    }
  }
  class Tp extends Ua {
    constructor(a, b = Na, d = Na) {
      super();
      this.retryTimeout = 1e4;
      this.streamingTasks = new Y();
      this.isStartingStreamingTask = !1;
      this.taskMutex = new $b();
      this.cancelToken = Cb.CancelToken.source();
      this.injectConfig = Wb({}, ap);
      this.injectLoopTimes = 0;
      this.lastTaskId = 1;
      this.statusError = new Y();
      this.spec = a;
      this.httpRetryConfig = d;
      this.wsRetryConfig = b;
    }
    async setTranscodingConfig(a) {
      var b;
      let d = Wb({}, $o, {}, a);
      var e, f;
      66 !== d.videoCodecProfile &&
        77 !== d.videoCodecProfile &&
        100 !== d.videoCodecProfile &&
        (k.debug(
          n(
            (e = "[".concat(
              this.spec.clientId,
              "] set transcoding config, fix video codec profile: "
            ))
          ).call(e, d.videoCodecProfile, " -> 100")
        ),
        (d.videoCodecProfile = 100));
      (d.transcodingUsers || (d.transcodingUsers = d.userConfigs),
      d.transcodingUsers) &&
        (d.transcodingUsers = D((f = d.transcodingUsers)).call(f, (a) =>
          Wb({}, Zo, {}, a, { zOrder: a.zOrder ? a.zOrder + 1 : 1 })
        ));
      tl(d);
      a = [];
      var g, h;
      d.images &&
        a.push(
          ...D((g = d.images)).call(g, (a) =>
            Wb({}, fg, {}, a, { zOrder: 255 })
          )
        );
      (d.backgroundImage &&
        (a.push(Wb({}, fg, {}, d.backgroundImage, { zOrder: 0 })),
        delete d.backgroundImage),
      d.watermark &&
        (a.push(Wb({}, fg, {}, d.watermark, { zOrder: 255 })),
        delete d.watermark),
      (d.images = a),
      d.transcodingUsers) &&
        ((d.userConfigs = D((h = d.transcodingUsers)).call(h, (a) =>
          Wb({}, a)
        )),
        (d.userCount = d.transcodingUsers.length),
        delete d.transcodingUsers);
      g = D((b = d.userConfigs || [])).call(b, (a) =>
        "number" == typeof a.uid
          ? u.resolve(a.uid)
          : Yh(a.uid, this.spec, this.cancelToken.token, this.httpRetryConfig)
      );
      b = await u.all(g);
      if (
        (r(b).call(b, (a, b) => {
          d.userConfigs && d.userConfigs[b] && (d.userConfigs[b].uid = a);
        }),
        (this.transcodingConfig = d),
        this.connection)
      )
        try {
          var l, m, p;
          let a = await this.connection.request(
            "request",
            {
              clientRequest: {
                command: "UpdateTranscoding",
                transcodingConfig: this.transcodingConfig
              }
            },
            !1,
            {
              command: "UpdateTranscoding",
              workerType: 1,
              requestByUser: !0,
              tid: D((l = Kb(qc((m = this.streamingTasks)).call(m))))
                .call(l, (a) => a.taskId)
                .join("#")
            }
          );
          k.debug(
            n(
              (p = "[".concat(
                this.spec.clientId,
                "] update live transcoding config success, code: "
              ))
            ).call(p, a.code, ", config:"),
            w(this.transcodingConfig)
          );
        } catch (x) {
          var t;
          if (!x.data || !x.data.retry) throw x;
          x.data.changeAddress && this.connection.tryNextAddress();
          r((t = this.streamingTasks)).call(t, (a) => {
            k.warning(
              "[".concat(this.spec.clientId, "] live streaming receive error"),
              x.toString(),
              "try to republish",
              a.url
            );
            this.startLiveStreamingTask(a.url, a.mode, x)
              .then(() => {
                var b;
                k.debug(
                  n(
                    (b = "[".concat(
                      this.spec.clientId,
                      "] live streaming republish "
                    ))
                  ).call(b, a.url, " success")
                );
              })
              .catch((b) => {
                k.error(
                  "[".concat(
                    this.spec.clientId,
                    "] live streaming republish failed"
                  ),
                  a.url,
                  b.toString()
                );
                this.onLiveStreamError && this.onLiveStreamError(a.url, b);
              });
          });
        }
    }
    setInjectStreamConfig(a, b) {
      this.injectConfig = Wa({}, this.injectConfig, a);
      this.injectLoopTimes = b;
    }
    async startLiveStreamingTask(a, b, d) {
      var e, f, g, h;
      if (
        R((e = Kb(qc((f = this.streamingTasks)).call(f)))).call(
          e,
          (a) => a.mode === ma.INJECT
        ) &&
        b === ma.INJECT
      )
        return new m(
          l.LIVE_STREAMING_TASK_CONFLICT,
          "inject stream over limit"
        ).throw();
      if (!this.transcodingConfig && b === ma.TRANSCODE)
        throw new m(
          l.INVALID_OPERATION,
          "[LiveStreaming] no transcoding config found, can not start transcoding streaming task"
        );
      e = {
        command: "PublishStream",
        ts: v(),
        url: a,
        uid: this.spec.uid.toString(),
        autoDestroyTime: 30
      };
      k.debug(
        n(
          (g = n(
            (h = "[".concat(this.spec.clientId, "] start live streaming "))
          ).call(h, a, ", mode: "))
        ).call(g, b)
      );
      g = await this.taskMutex.lock();
      if (!this.connection && d) return void g();
      if (this.streamingTasks.get(a) && !d)
        return g(), new m(l.LIVE_STREAMING_TASK_CONFLICT).throw();
      try {
        this.connection || (this.connection = await this.connect(b));
      } catch (y) {
        throw (g(), y);
      }
      switch (b) {
        case ma.TRANSCODE:
          e.transcodingConfig = Wb({}, this.transcodingConfig);
          break;
        case ma.INJECT:
          e = {
            cname: this.spec.cname,
            command: "InjectStream",
            sid: this.spec.sid,
            transcodingConfig: this.injectConfig,
            ts: v(),
            url: a,
            loopTimes: this.injectLoopTimes
          };
      }
      this.uapResponse &&
        this.uapResponse.vid &&
        (e.vid = this.uapResponse.vid);
      this.isStartingStreamingTask = !0;
      h = this.lastTaskId++;
      try {
        var q;
        let f = new u((b, e) => {
            Ab(this.retryTimeout).then(() => {
              if (d) return e(d);
              const b = this.statusError.get(a);
              return b ? (this.statusError.delete(a), e(b)) : void 0;
            });
          }),
          l = await u.race([
            this.connection.request("request", { clientRequest: e }, !0, {
              url: a,
              command: "PublishStream",
              workerType: b === ma.TRANSCODE ? 1 : 2,
              requestByUser: !d,
              tid: h.toString()
            }),
            f
          ]);
        this.isStartingStreamingTask = !1;
        k.debug(
          n(
            (q = "[".concat(
              this.spec.clientId,
              "] live streaming started, code: "
            ))
          ).call(q, l.code)
        );
        this.streamingTasks.set(a, {
          clientRequest: e,
          mode: b,
          url: a,
          taskId: h
        });
        g();
      } catch (y) {
        if (
          (g(),
          (this.isStartingStreamingTask = !1),
          !y.data || !y.data.retry || d)
        )
          throw y;
        return y.data.changeAddress
          ? (this.connection.tryNextAddress(),
            await this.startLiveStreamingTask(a, b, y))
          : await this.startLiveStreamingTask(a, b, y);
      }
    }
    stopLiveStreamingTask(a) {
      return new u((b, d) => {
        let e = this.streamingTasks.get(a);
        if (!e || !this.connection)
          return new m(
            l.UNEXPECTED_ERROR,
            "can not find streaming task to stop"
          ).throw();
        let f = e.mode;
        e.abortTask = () => {
          k.debug(
            "[".concat(
              this.spec.clientId,
              "] stop live streaming success(worker exception)"
            )
          );
          this.streamingTasks.delete(a);
          b();
        };
        this.connection
          .request(
            "request",
            {
              clientRequest: {
                command: f === ma.INJECT ? "UninjectStream" : "UnpublishStream",
                url: e.url
              }
            },
            !1,
            {
              url: a,
              command: "UnPublishStream",
              workerType: f === ma.TRANSCODE ? 1 : 2,
              requestByUser: !0,
              tid: (this.lastTaskId++).toString()
            }
          )
          .then((d) => {
            var e;
            k.debug(
              n(
                (e = "[".concat(
                  this.spec.clientId,
                  "] stop live streaming success, code: "
                ))
              ).call(e, d.code)
            );
            this.streamingTasks.delete(a);
            b();
            f === ma.INJECT &&
              this.onInjectStatusChange &&
              this.onInjectStatusChange(5, this.spec.uid, a);
          })
          .catch(d);
      });
    }
    async controlInjectStream(a, b, d, e) {
      let f = this.streamingTasks.get(a);
      if (!f || !this.connection || f.mode !== ma.INJECT)
        throw new m(
          l.INVALID_OPERATION,
          "can not find inject stream task to control"
        );
      return (
        await this.connection.request("request", {
          clientRequest: {
            command: "ControlStream",
            url: a,
            control: b,
            audioVolume: d,
            position: e
          }
        })
      ).serverResponse;
    }
    resetAllTask() {
      var a;
      let b = Kb(qc((a = this.streamingTasks)).call(a));
      this.terminate();
      for (let a of b)
        this.startLiveStreamingTask(a.url, a.mode).catch((b) => {
          this.onLiveStreamError && this.onLiveStreamError(a.url, b);
        });
    }
    terminate() {
      this.cancelToken && this.cancelToken.cancel();
      this.streamingTasks = new Y();
      this.isStartingStreamingTask = !1;
      this.statusError = new Y();
      this.cancelToken = Cb.CancelToken.source();
      this.uapResponse = void 0;
      this.connection && this.connection.close();
      this.connection = void 0;
    }
    async connect(a) {
      if (this.connection)
        throw new m(
          l.UNEXPECTED_ERROR,
          "live streaming connection has already connected"
        );
      let b = await Ha(this, Qc.REQUEST_WORKER_MANAGER_LIST, a);
      return (
        (this.uapResponse = b),
        (this.connection = new Sp(
          b.workerToken,
          this.spec,
          this.wsRetryConfig,
          a
        )),
        this.connection.on(
          hb.WARNING,
          (a, b) => this.onLiveStreamWarning && this.onLiveStreamWarning(b, a)
        ),
        this.connection.on(hb.PUBLISH_STREAM_STATUS, (a) =>
          this.handlePublishStreamServer(a)
        ),
        this.connection.on(hb.INJECT_STREAM_STATUS, (a) =>
          this.handleInjectStreamServerStatus(a)
        ),
        this.connection.on(hb.REQUEST_NEW_ADDRESS, (b, e) => {
          if (!this.connection)
            return e(
              new m(
                l.UNEXPECTED_ERROR,
                "can not get new live streaming address list"
              )
            );
          Ha(this, Qc.REQUEST_WORKER_MANAGER_LIST, a)
            .then((a) => {
              this.uapResponse = a;
              b(a.addressList);
            })
            .catch(e);
        }),
        await this.connection.init(b.addressList),
        this.connection
      );
    }
    handlePublishStreamServer(a) {
      var b = a.serverStatus.url;
      let d = this.streamingTasks.get(b);
      switch (a.code) {
        case ka.PUBLISH_STREAM_STATUS_ERROR_PUBLISH_BROKEN:
        case ka.PUBLISH_STREAM_STATUS_ERROR_RTMP_CONNECT:
        case ka.PUBLISH_STREAM_STATUS_ERROR_RTMP_HANDSHAKE:
        case ka.PUBLISH_STREAM_STATUS_ERROR_RTMP_PUBLISH: {
          let e = new m(l.LIVE_STREAMING_CDN_ERROR, "", { code: a.code });
          if (d)
            return (
              k.error(e.toString()),
              this.onLiveStreamError && this.onLiveStreamError(b, e)
            );
          if (!this.isStartingStreamingTask) break;
          this.statusError.set(b, e);
        }
        case ka.LIVE_STREAM_RESPONSE_WORKER_LOST:
        case ka.LIVE_STREAM_RESPONSE_WORKER_QUIT:
          var e;
          if (this.connection) {
            this.connection.tryNextAddress();
            b = Kb(qc((e = this.streamingTasks)).call(e));
            for (let d of b)
              d.abortTask
                ? d.abortTask()
                : (k.warning(
                    "[".concat(
                      this.spec.clientId,
                      "] publish stream status code"
                    ),
                    a.code,
                    "try to republish",
                    d.url
                  ),
                  this.startLiveStreamingTask(
                    d.url,
                    d.mode,
                    new m(l.LIVE_STREAMING_INTERNAL_SERVER_ERROR, "", {
                      code: a.code
                    })
                  )
                    .then(() => {
                      k.debug(
                        "[".concat(
                          this.spec.clientId,
                          "] republish live stream success"
                        ),
                        d.url
                      );
                    })
                    .catch((a) => {
                      k.error(a.toString());
                      this.onLiveStreamError &&
                        this.onLiveStreamError(d.url, a);
                    }));
          }
      }
    }
    handleInjectStreamServerStatus(a) {
      let b = Number(a.uid),
        d = a.serverStatus && a.serverStatus.url;
      switch (a.code) {
        case 200:
          return void (
            this.onInjectStatusChange && this.onInjectStatusChange(0, b, d)
          );
        case 451:
          return (
            this.onInjectStatusChange && this.onInjectStatusChange(1, b, d),
            void this.streamingTasks.delete(d)
          );
        case 453:
          return (
            this.onInjectStatusChange && this.onInjectStatusChange(2, b, d),
            void this.streamingTasks.delete(d)
          );
        case 470:
          return (
            this.onInjectStatusChange && this.onInjectStatusChange(10, b, d),
            void this.streamingTasks.delete(d)
          );
        case 499:
          return (
            this.onInjectStatusChange && this.onInjectStatusChange(3, b, d),
            void this.streamingTasks.delete(d)
          );
        default:
          return void k.debug("inject stream server status", a);
      }
    }
    hasUrl(a) {
      return this.streamingTasks.has(a);
    }
  }
  class ki {
    constructor() {
      this.destChannelMediaInfos = new Y();
    }
    setSrcChannelInfo(a) {
      Bh(a);
      this.srcChannelMediaInfo = a;
    }
    addDestChannelInfo(a) {
      Bh(a);
      this.destChannelMediaInfos.set(a.channelName, a);
    }
    removeDestChannelInfo(a) {
      Ie(a);
      this.destChannelMediaInfos.delete(a);
    }
    getSrcChannelMediaInfo() {
      return this.srcChannelMediaInfo;
    }
    getDestChannelMediaInfo() {
      return this.destChannelMediaInfos;
    }
  }
  class Up extends Ua {
    constructor(a, b, d) {
      super();
      this.requestId = 1;
      this.onOpen = () => {
        this.emit("open");
        this.startHeartBeatCheck();
      };
      this.onClose = (a) => {
        this.emit("close");
        this.dispose();
      };
      this.onMessage = (a) => {
        a = JSON.parse(a.data);
        if (!a || "serverResponse" !== a.command || !a.requestId)
          return a &&
            "serverStatus" === a.command &&
            a.serverStatus &&
            a.serverStatus.command
            ? (this.emit("status", a.serverStatus),
              void this.emit(a.serverStatus.command, a.serverStatus))
            : void 0;
        this.emit("req_".concat(a.requestId), a);
      };
      this.joinInfo = a;
      this.clientId = b;
      this.ws = new pg("cross-channel-".concat(this.clientId), d);
      this.ws.on(Q.RECONNECTING, () => {
        this.ws.reconnectMode = "retry";
        this.emit("reconnecting");
      });
      this.ws.on(Q.CONNECTED, this.onOpen);
      this.ws.on(Q.ON_MESSAGE, this.onMessage);
      this.ws.on(Q.CLOSED, this.onClose);
    }
    isConnect() {
      return "connected" === this.ws.state;
    }
    sendMessage(a) {
      let b = this.requestId++;
      return (a.requestId = b), (a.seq = b), this.ws.sendMessage(a), b;
    }
    waitStatus(a) {
      return new u((b, d) => {
        let e = window.setTimeout(() => {
          d(new m(l.TIMEOUT, "wait status timeout, status: ".concat(a)));
        }, 5e3);
        this.once(a, (f) => {
          window.clearTimeout(e);
          f.state && 0 !== f.state
            ? d(
                new m(
                  l.CROSS_CHANNEL_WAIT_STATUS_ERROR,
                  "wait status error, status: ".concat(a)
                )
              )
            : b();
        });
        this.once("dispose", () => {
          window.clearTimeout(e);
          d(new m(l.WS_ABORT));
        });
      });
    }
    async request(a) {
      if ("closed" === this.ws.state) throw new m(l.WS_DISCONNECT);
      let b = () =>
        new u((a, b) => {
          this.ws.once(Q.CLOSED, () => b(new m(l.WS_ABORT)));
          this.ws.once(Q.CONNECTED, a);
        });
      "connected" !== this.ws.state && (await b());
      let d = this.sendMessage(a);
      a = await new u((a, b) => {
        const e = () => {
          b(new m(l.WS_ABORT));
        };
        this.ws.once(Q.RECONNECTING, e);
        this.ws.once(Q.CLOSED, e);
        this.once("req_".concat(d), a);
        Ab(3e3).then(() => {
          this.removeAllListeners("req_".concat(d));
          this.ws.off(Q.RECONNECTING, e);
          this.ws.off(Q.CLOSED, e);
          b(new m(l.TIMEOUT, "cross channel ws request timeout"));
        });
      });
      if (!a || 200 !== a.code)
        throw new m(
          l.CROSS_CHANNEL_SERVER_ERROR_RESPONSE,
          "response: ".concat(w(a))
        );
      return a;
    }
    async connect(a) {
      this.ws.removeAllListeners(Q.REQUEST_NEW_URLS);
      this.ws.on(Q.REQUEST_NEW_URLS, (b) => {
        b(a);
      });
      await this.ws.init(a);
    }
    dispose() {
      this.clearHeartBeatCheck();
      this.emit("dispose");
      this.removeAllListeners();
      this.ws.close();
    }
    sendPing(a) {
      let b = this.requestId++;
      return (a.requestId = b), this.ws.sendMessage(a), b;
    }
    startHeartBeatCheck() {
      this.heartBeatTimer = window.setInterval(() => {
        this.sendPing({
          command: "ping",
          appId: this.joinInfo.appId,
          cname: this.joinInfo.cname,
          uid: this.joinInfo.uid.toString(),
          sid: this.joinInfo.sid,
          ts: +new Date(),
          requestId: 0
        });
      }, 3e3);
    }
    clearHeartBeatCheck() {
      window.clearInterval(this.heartBeatTimer);
      this.heartBeatTimer = void 0;
    }
  }
  class Vp extends Ua {
    constructor(a, b, d, e) {
      super();
      this.cancelToken = Cb.CancelToken.source();
      this.requestId = 0;
      this._state = "RELAY_STATE_IDLE";
      this.errorCode = "RELAY_OK";
      this.onStatus = (a) => {
        var b;
        k.debug(
          n((b = "[".concat(this.clientId, "] ChannelMediaStatus: "))).call(
            b,
            w(a)
          )
        );
        a &&
          a.command &&
          ("onAudioPacketReceived" === a.command &&
            this.emit("event", "PACKET_RECEIVED_AUDIO_FROM_SRC"),
          "onVideoPacketReceived" === a.command &&
            this.emit("event", "PACKET_RECEIVED_VIDEO_FROM_SRC"),
          "onSrcTokenPrivilegeDidExpire" === a.command &&
            ((this.errorCode = "SRC_TOKEN_EXPIRED"),
            (this.state = "RELAY_STATE_FAILURE")),
          "onDestTokenPrivilegeDidExpire" === a.command &&
            ((this.errorCode = "DEST_TOKEN_EXPIRED"),
            (this.state = "RELAY_STATE_FAILURE")));
      };
      this.onReconnect = async () => {
        k.debug(
          "[".concat(
            this.clientId,
            "] ChannelMediaSocket disconnect, reconnecting"
          )
        );
        this.emit("event", "NETWORK_DISCONNECTED");
        this.state = "RELAY_STATE_IDLE";
        this.prevChannelMediaConfig &&
          this.sendStartRelayMessage(this.prevChannelMediaConfig).catch((a) => {
            "RELAY_STATE_IDLE" !== this.state &&
              (k.error("auto restart channel media relay failed", a.toString()),
              (this.errorCode = "SERVER_CONNECTION_LOST"),
              (this.state = "RELAY_STATE_FAILURE"));
          });
      };
      this.joinInfo = a;
      this.clientId = b;
      this.signal = new Up(this.joinInfo, this.clientId, d);
      this.httpRetryConfig = e;
    }
    set state(a) {
      a !== this._state &&
        ("RELAY_STATE_FAILURE" !== a && (this.errorCode = "RELAY_OK"),
        this.emit("state", a, this.errorCode),
        (this._state = a));
    }
    get state() {
      return this._state;
    }
    async startChannelMediaRelay(a) {
      if ("RELAY_STATE_IDLE" !== this.state) throw new m(l.INVALID_OPERATION);
      this.state = "RELAY_STATE_CONNECTING";
      await this.connect();
      k.debug(
        "[".concat(this.clientId, "] startChannelMediaRelay: connect success")
      );
      try {
        await this.sendStartRelayMessage(a);
      } catch (b) {
        if (
          b.data &&
          b.data.serverResponse &&
          "SetSourceChannel" === b.data.serverResponse.command
        )
          throw new m(l.CROSS_CHANNEL_FAILED_JOIN_SRC);
        if (
          b.data &&
          b.data.serverResponse &&
          "SetDestChannelStatus" === b.serverResponse.command
        )
          throw new m(l.CROSS_CHANNEL_FAILED_JOIN_DEST);
        if (
          b.data &&
          b.data.serverResponse &&
          "StartPacketTransfer" === b.serverResponse.command
        )
          throw new m(l.CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST);
        throw b;
      }
      this.prevChannelMediaConfig = a;
    }
    async updateChannelMediaRelay(a) {
      if ("RELAY_STATE_RUNNING" !== this.state)
        throw new m(l.INVALID_OPERATION);
      await this.sendUpdateMessage(a);
      this.prevChannelMediaConfig = a;
    }
    async stopChannelMediaRelay() {
      await this.sendStopRelayMessage();
      k.debug(
        "[".concat(
          this.clientId,
          "] stopChannelMediaRelay: send stop message success"
        )
      );
      this.state = "RELAY_STATE_IDLE";
      this.dispose();
    }
    dispose() {
      k.debug("[".concat(this.clientId, "] disposeChannelMediaRelay"));
      this.cancelToken.cancel();
      this.cancelToken = Cb.CancelToken.source();
      this.state = "RELAY_STATE_IDLE";
      this.emit("dispose");
      this.signal.dispose();
      this.prevChannelMediaConfig = void 0;
    }
    async connect() {
      let a = await gm(
        this.joinInfo,
        this.cancelToken.token,
        this.httpRetryConfig
      );
      this.workerToken = a.workerToken;
      await this.signal.connect(a.addressList);
      this.emit("event", "NETWORK_CONNECTED");
      this.signal.on("status", this.onStatus);
      this.signal.on("reconnecting", this.onReconnect);
    }
    async sendStartRelayMessage(a) {
      var b = this.genMessage(Da.StopPacketTransfer);
      await this.signal.request(b);
      await this.signal.waitStatus("Normal Quit");
      k.debug(
        "[".concat(
          this.clientId,
          "] startChannelMediaRelay: StopPacketTransfer success"
        )
      );
      b = this.genMessage(Da.SetSdkProfile, a);
      await this.signal.request(b);
      k.debug(
        "[".concat(
          this.clientId,
          "] startChannelMediaRelay: SetSdkProfile success"
        )
      );
      b = this.genMessage(Da.SetSourceChannel, a);
      await this.signal.request(b);
      await this.signal.waitStatus("SetSourceChannelStatus");
      this.emit("event", "PACKET_JOINED_SRC_CHANNEL");
      k.debug(
        "[".concat(
          this.clientId,
          "] startChannelMediaRelay: SetSourceChannel success"
        )
      );
      b = this.genMessage(Da.SetSourceUserId, a);
      await this.signal.request(b);
      k.debug(
        "[".concat(
          this.clientId,
          "] startChannelMediaRelay: SetSourceUserId success"
        )
      );
      b = this.genMessage(Da.SetDestChannel, a);
      await this.signal.request(b);
      await this.signal.waitStatus("SetDestChannelStatus");
      this.emit("event", "PACKET_JOINED_DEST_CHANNEL");
      k.debug(
        "[".concat(
          this.clientId,
          "] startChannelMediaRelay: SetDestChannel success"
        )
      );
      a = this.genMessage(Da.StartPacketTransfer, a);
      await this.signal.request(a);
      this.emit("event", "PACKET_SENT_TO_DEST_CHANNEL");
      this.state = "RELAY_STATE_RUNNING";
      k.debug(
        "[".concat(
          this.clientId,
          "] startChannelMediaRelay: StartPacketTransfer success"
        )
      );
    }
    async sendUpdateMessage(a) {
      a = this.genMessage(Da.UpdateDestChannel, a);
      await this.signal.request(a);
      this.emit("event", "PACKET_UPDATE_DEST_CHANNEL");
      k.debug(
        "[".concat(
          this.clientId,
          "] sendUpdateMessage: UpdateDestChannel success"
        )
      );
    }
    async sendStopRelayMessage() {
      let a = this.genMessage(Da.StopPacketTransfer);
      await this.signal.request(a);
      k.debug(
        "[".concat(
          this.clientId,
          "] sendStopRelayMessage: StopPacketTransfer success"
        )
      );
    }
    genMessage(a, b) {
      let d = [],
        e = [],
        f = [];
      this.requestId += 1;
      let g = {
        appId: this.joinInfo.appId,
        cname: this.joinInfo.cname,
        uid: this.joinInfo.uid.toString(),
        sdkVersion: $a,
        sid: this.joinInfo.sid,
        ts: v(),
        requestId: this.requestId,
        seq: this.requestId,
        allocate: !0,
        clientRequest: {}
      };
      "4.1.0" === g.sdkVersion && (g.sdkVersion = "0.0.1");
      let h = null,
        k = null;
      switch (a) {
        case Da.SetSdkProfile:
          return (
            (g.clientRequest = {
              command: "SetSdkProfile",
              type: "multi_channel"
            }),
            g
          );
        case Da.SetSourceChannel:
          if (((k = b && b.getSrcChannelMediaInfo()), !k))
            throw new m(l.UNEXPECTED_ERROR, "can not find source config");
          return (
            (g.clientRequest = {
              command: "SetSourceChannel",
              uid: "0",
              channelName: k.channelName,
              token: k.token || this.joinInfo.appId
            }),
            g
          );
        case Da.SetSourceUserId:
          if (((k = b && b.getSrcChannelMediaInfo()), !k))
            throw new m(l.UNEXPECTED_ERROR, "can not find source config");
          return (
            (g.clientRequest = { command: "SetSourceUserId", uid: k.uid + "" }),
            g
          );
        case Da.SetDestChannel:
          if (((h = b && b.getDestChannelMediaInfo()), !h))
            throw new m(l.UNEXPECTED_ERROR, "can not find dest config");
          return (
            r(h).call(h, (a) => {
              d.push(a.channelName);
              e.push(a.uid + "");
              f.push(a.token || this.joinInfo.appId);
            }),
            (g.clientRequest = {
              command: "SetDestChannel",
              channelName: d,
              uid: e,
              token: f
            }),
            g
          );
        case Da.StartPacketTransfer:
          return (g.clientRequest = { command: "StartPacketTransfer" }), g;
        case Da.Reconnect:
          return (g.clientRequest = { command: "Reconnect" }), g;
        case Da.StopPacketTransfer:
          return (g.clientRequest = { command: "StopPacketTransfer" }), g;
        case Da.UpdateDestChannel:
          if (((h = b && b.getDestChannelMediaInfo()), !h))
            throw new m(l.UNEXPECTED_ERROR, "can not find dest config");
          return (
            r(h).call(h, (a) => {
              d.push(a.channelName);
              e.push(a.uid + "");
              f.push(a.token || this.joinInfo.appId);
            }),
            (g.clientRequest = {
              command: "UpdateDestChannel",
              channelName: d,
              uid: e,
              token: f
            }),
            g
          );
      }
      return g;
    }
  }
  class Wp {
    constructor(a, b) {
      this._trust_stream_added_state_ =
        this._trust_video_mute_state_ =
        this._trust_audio_mute_state_ =
        this._trust_video_enabled_state_ =
        this._trust_audio_enabled_state_ =
        this._trust_in_room_ =
          !0;
      this._video_muted_ = this._audio_muted_ = !1;
      this._video_enabled_ = this._audio_enabled_ = !0;
      this._video_added_ = this._audio_added_ = !1;
      this.uid = a;
      this._uintid = b;
    }
    get hasVideo() {
      return this._video_enabled_ && !this._video_muted_ && this._video_added_;
    }
    get hasAudio() {
      return this._audio_enabled_ && !this._audio_muted_ && this._audio_added_;
    }
    get audioTrack() {
      if (this.hasAudio) return this._audioTrack;
    }
    get videoTrack() {
      if (this.hasVideo) return this._videoTrack;
    }
  }
  class Xp extends Ua {
    constructor(a) {
      var b, d, e, f;
      super();
      this._users = [];
      this._sessionId = null;
      this._bindEnabledTracks = [];
      this._leaveMutex = new $b();
      this._publishMutex = new $b();
      this._subscribeMutex = new Y();
      this._remoteStream = new Y();
      this._encryptionMode = "none";
      this._encryptionSecret = null;
      this._turnServer = { servers: [], mode: "auto" };
      this._cloudProxyServerMode = "disabled";
      this._isDualStreamEnabled = !1;
      this._streamFallbackTypeCacheMap = new Y();
      this._remoteStreamTypeCacheMap = new Y();
      this._axiosCancelSource = Cb.CancelToken.source();
      this._handleLocalTrackEnable = (a, b, d) => {
        this.publish(a, !1).then(b).catch(d);
      };
      this._handleLocalTrackDisable = (a, b, d) => {
        this.unpublish(a, !1).then(b).catch(d);
      };
      this._handleUserOnline = (a) => {
        var b;
        this.isStringUID &&
          "string" != typeof a.uid &&
          k.error(
            "[".concat(this._clientId, "] StringUID is Mixed with UintUID")
          );
        let d = R((b = this._users)).call(b, (b) => b.uid === a.uid);
        d
          ? (d._trust_in_room_ = !0)
          : ((b = new Wp(a.uid, a.uint_id || a.uid)),
            this._users.push(b),
            k.debug("[".concat(this._clientId, "] user online"), a.uid),
            this.emit(O.USER_JOINED, b));
      };
      this._handleUserOffline = (a) => {
        var b;
        let d = R((b = this._users)).call(b, (b) => b.uid === a.uid);
        d &&
          (this._handleRemoveStream(a),
          bd(this._users, d),
          this._remoteStreamTypeCacheMap.delete(d.uid),
          this._streamFallbackTypeCacheMap.delete(d.uid),
          k.debug(
            "[".concat(this._clientId, "] user offline"),
            a.uid,
            "reason:",
            a.reason
          ),
          this.emit(O.USER_LEAVED, d, a.reason));
      };
      this._handleAddAudioOrVideoStream = (a, b, d) => {
        var e, f, g;
        let h = R((e = this._users)).call(e, (a) => a.uid === b);
        if (!h)
          return void k.error(
            "[".concat(
              this._clientId,
              "] can not find target user!(on_add_stream)"
            )
          );
        k.debug(
          n(
            (f = n(
              (g = "[".concat(this._clientId, "] stream added with uid "))
            ).call(g, b, ", type "))
          ).call(f, a)
        );
        e = "audio" === a ? h.hasAudio : h.hasVideo;
        var l, q;
        (h._uintid || (h._uintid = d || b),
        (h._trust_stream_added_state_ = !0),
        "audio" === a ? (h._audio_added_ = !0) : (h._video_added_ = !0),
        ("audio" === a ? h.hasAudio : h.hasVideo) && !e) &&
          (k.info(
            n(
              (l = n((q = "[".concat(this._clientId, "] remote user "))).call(
                q,
                h.uid,
                " published "
              ))
            ).call(l, a)
          ),
          this.emit(O.USER_PUBLISHED, h, a));
        "video" === a
          ? t.onGatewayStream(
              this._sessionId,
              Ba.ON_ADD_VIDEO_STREAM,
              pa.ON_ADD_VIDEO_STREAM,
              { peer: d || b }
            )
          : t.onGatewayStream(
              this._sessionId,
              Ba.ON_ADD_AUDIO_STREAM,
              pa.ON_ADD_AUDIO_STREAM,
              { peer: d || b }
            );
        (a = this._remoteStream.get(b)) &&
          a.readyToReconnect &&
          "connecting" === a.connectionState &&
          a.reconnectPC().catch((a) => {
            k.error(
              "[".concat(this._clientId, "] resubscribe error"),
              a.toString()
            );
          });
      };
      this._handleRemoveStream = (a) => {
        var b, d;
        let e = R((b = this._users)).call(b, (b) => b.uid === a.uid);
        if (!e)
          return void k.warning(
            "[".concat(
              this._clientId,
              "] can not find target user!(on_remove_stream)"
            )
          );
        k.debug(
          n(
            (d = "[".concat(this._clientId, "] stream removed with uid "))
          ).call(d, a.uid)
        );
        b = () => {};
        e.hasAudio && e.hasVideo
          ? (b = () => {
              var a, b;
              k.info(
                n((a = "[".concat(this._clientId, "] remote user "))).call(
                  a,
                  e.uid,
                  " unpublished audio track"
                )
              );
              this.emit(O.USER_UNPUBLISHED, e, "audio");
              k.info(
                n((b = "[".concat(this._clientId, "] remote user "))).call(
                  b,
                  e.uid,
                  " unpublished video track"
                )
              );
              this.emit(O.USER_UNPUBLISHED, e, "video");
            })
          : e.hasVideo
          ? (b = () => {
              var a;
              k.info(
                n((a = "[".concat(this._clientId, "] remote user "))).call(
                  a,
                  e.uid,
                  " unpublished video track"
                )
              );
              this.emit(O.USER_UNPUBLISHED, e, "video");
            })
          : e.hasAudio &&
            (b = () => {
              var a;
              k.info(
                n((a = "[".concat(this._clientId, "] remote user "))).call(
                  a,
                  e.uid,
                  " unpublished audio track"
                )
              );
              this.emit(O.USER_UNPUBLISHED, e, "audio");
            });
        e._trust_stream_added_state_ = !0;
        e._audio_added_ = !1;
        e._video_added_ = !1;
        (d = this._remoteStream.get(e.uid)) &&
          (d.closeP2PConnection(), this._remoteStream.delete(e.uid));
        t.onGatewayStream(
          this._sessionId,
          Ba.ON_REMOVE_STREAM,
          pa.ON_REMOVE_STREAM,
          { peer: a.uint_id || a.uid }
        );
        b();
      };
      this._handleSetStreamLocalEnable = (a, b, d) => {
        var e, f, g, h, l, q;
        let m = R((e = this._users)).call(e, (a) => a.uid === b);
        if (!m)
          return void k.error(
            "[".concat(
              this._clientId,
              "] can not find target user!(disable_local)"
            )
          );
        k.debug(
          n(
            (f = n(
              (g = n((h = "[".concat(this._clientId, "] local "))).call(
                h,
                a,
                " "
              ))
            ).call(g, d ? "enabled" : "disabled", " with uid "))
          ).call(f, b)
        );
        e = "audio" === a ? m.hasAudio : m.hasVideo;
        if ("audio" === a) {
          m._trust_audio_enabled_state_ = !0;
          var p = m._audio_enabled_;
          if (((m._audio_enabled_ = d), m._audio_enabled_ === p)) return;
          var r, t;
          d = m._audio_enabled_ ? "enable-local-audio" : "disable-local-audio";
          k.debug(
            n(
              (r = n(
                (t = "[".concat(this._clientId, "] user-info-updated, uid: "))
              ).call(t, b, ", msg: "))
            ).call(r, d)
          );
          this.emit(O.USER_INFO_UPDATED, b, d);
        } else {
          m._trust_video_enabled_state_ = !0;
          r = m._video_enabled_;
          if (((m._video_enabled_ = d), m._video_enabled_ === r)) return;
          var u;
          d = m._video_enabled_ ? "enable-local-video" : "disable-local-video";
          k.debug(
            n(
              (p = n(
                (u = "[".concat(this._clientId, "] user-info-update, uid: "))
              ).call(u, b, ", msg: "))
            ).call(p, d)
          );
          this.emit(O.USER_INFO_UPDATED, b, d);
        }
        d = "audio" === a ? m.hasAudio : m.hasVideo;
        if (e !== d) {
          var v, w;
          if (!e && d)
            return (
              k.info(
                n(
                  (v = n(
                    (w = "[".concat(this._clientId, "] remote user "))
                  ).call(w, b, " published "))
                ).call(v, a)
              ),
              void this.emit(O.USER_PUBLISHED, m, a)
            );
          if ((v = this._remoteStream.get(b)))
            (w = Bc({}, v.subscribeOptions)),
              (w.audio = !!m.hasAudio && w.audio),
              (w.video = !!m.hasVideo && w.video),
              w.audio || w.video
                ? v.setSubscribeOptions(w)
                : (v.closeP2PConnection().catch((a) => {
                    k.warning("close sub pc error", a);
                  }),
                  this._remoteStream.delete(m.uid));
          k.info(
            n(
              (l = n((q = "[".concat(this._clientId, "] remote user "))).call(
                q,
                m.uid,
                " unpublished "
              ))
            ).call(l, a)
          );
          this.emit(O.USER_UNPUBLISHED, m, a);
        }
      };
      this._handleMuteStream = (a, b, d) => {
        var e, f, g;
        k.debug("[".concat(this._clientId, "] receive mute message"), a, b, d);
        let h = R((e = this._users)).call(e, (b) => b.uid === a);
        var l;
        if (!h)
          return void k.warning(
            n(
              (l = "[".concat(
                this._clientId,
                "] can not find remote user, ignore mute event, uid: "
              ))
            ).call(l, a)
          );
        e = "audio" === b ? h.hasAudio : h.hasVideo;
        if ("audio" === b) {
          h._trust_audio_mute_state_ = !0;
          var m = h._audio_muted_;
          if (((h._audio_muted_ = d), h._audio_muted_ === m)) return;
          var q, p;
          d = h._audio_muted_ ? "mute-audio" : "unmute-audio";
          k.debug(
            n(
              (q = n(
                (p = "[".concat(this._clientId, "] user-info-update, uid: "))
              ).call(p, a, ", msg: "))
            ).call(q, d)
          );
          this.emit(O.USER_INFO_UPDATED, a, d);
        } else {
          h._trust_video_mute_state_ = !0;
          q = h._video_muted_;
          if (((h._video_muted_ = d), h._video_muted_ === q)) return;
          var r;
          d = h._video_muted_ ? "mute-video" : "unmute-video";
          k.debug(
            n(
              (m = n(
                (r = "[".concat(this._clientId, "] user-info-update, uid: "))
              ).call(r, a, ", msg: "))
            ).call(m, d)
          );
          this.emit(O.USER_INFO_UPDATED, a, d);
        }
        d = "audio" === b ? h.hasAudio : h.hasVideo;
        if (e !== d) {
          var t, u;
          if (!e && d)
            return (
              k.info(
                n(
                  (t = n(
                    (u = "[".concat(this._clientId, "] remote user "))
                  ).call(u, a, " published "))
                ).call(t, b)
              ),
              void this.emit(O.USER_PUBLISHED, h, b)
            );
          if ((t = this._remoteStream.get(a)))
            (u = Bc({}, t.subscribeOptions)),
              (u.audio = !!h.hasAudio && u.audio),
              (u.video = !!h.hasVideo && u.video),
              u.audio || u.video
                ? t.setSubscribeOptions(u)
                : (t.closeP2PConnection().catch((a) => {
                    k.warning("close sub pc error", a);
                  }),
                  this._remoteStream.delete(h.uid));
          k.info(
            n(
              (f = n((g = "[".concat(this._clientId, "] remote user "))).call(
                g,
                a,
                " unpublished "
              ))
            ).call(f, b)
          );
          this.emit(O.USER_UNPUBLISHED, h, b);
        }
      };
      this._handleP2PLost = (a) => {
        k.debug("[".concat(this._clientId, "] receive p2p lost"), a);
        let b = null;
        if (this._highStream && this._highStream.pc.ID === a.p2pid)
          b = this._highStream;
        else if (this._lowStream && this._lowStream.pc.ID === a.p2pid)
          b = this._lowStream;
        else {
          var d;
          r((d = this._remoteStream)).call(d, (d) => {
            d.pc.ID === a.p2pid && (b = d);
          });
        }
        b
          ? b.emit(G.GATEWAY_P2P_LOST, a.p2pid)
          : k.warning("P2PLost stream not found", a);
      };
      this._handleTokenWillExpire = () => {
        k.debug(
          "[".concat(
            this._clientId,
            "] received message onTokenPrivilegeWillExpire"
          )
        );
        this.emit(O.ON_TOKEN_PRIVILEGE_WILL_EXPIRE);
      };
      this._handleBeforeUnload = (a) => {
        (void 0 !== a.returnValue && "" !== a.returnValue) ||
          (this.leave(),
          k.info("[".concat(this._clientId, "] auto leave onbeforeunload")));
      };
      this._handleUpdateNetworkQuality = () => {
        var a;
        if (navigator && void 0 !== navigator.onLine && !navigator.onLine)
          return void this.emit(O.NETWORK_QUALITY, {
            downlinkNetworkQuality: 6,
            uplinkNetworkQuality: 6
          });
        let b = { downlinkNetworkQuality: 0, uplinkNetworkQuality: 0 };
        this._highStream &&
          !this._highStream.detecting &&
          (b.uplinkNetworkQuality = this._highStream.getNetworkQuality());
        let d = 0;
        r((a = this._remoteStream)).call(
          a,
          (a) => (d += a.getNetworkQuality())
        );
        0 < this._remoteStream.size &&
          (b.downlinkNetworkQuality = Math.round(d / this._remoteStream.size));
        this.emit(O.NETWORK_QUALITY, b);
      };
      this._codec = a.codec;
      this._mode = a.mode;
      a.proxyServer &&
        ((this._proxyServer = a.proxyServer),
        t.setProxyServer(this._proxyServer),
        k.setProxyServer(this._proxyServer));
      a.turnServer &&
        (this._turnServer = Bc(
          {},
          this._turnServer,
          { mode: "manual" },
          a.turnServer
        ));
      this._clientId = na(5, "client-");
      k.info(
        n(
          (b = n(
            (d = n(
              (e = n(
                (f = "[".concat(
                  this._clientId,
                  "] Initializing AgoraRTC client v"
                ))
              ).call(f, $a, " build: "))
            ).call(e, "v4.1.0-0-g64d4440(9/4/2020, 5:57:23 PM)", ", mode: "))
          ).call(d, this._mode, ", codec: "))
        ).call(b, this._codec)
      );
      this._statsCollector = new Yc(this._clientId);
      this._statsCollector.onStatsException = (a, b, d) => {
        var e, f, g;
        k.debug(
          n(
            (e = n(
              (f = n(
                (g = "[".concat(
                  this._clientId,
                  "] receive exception msg, code: "
                ))
              ).call(g, a, ", msg: "))
            ).call(f, b, ", uid: "))
          ).call(e, d)
        );
        this.emit(O.EXCEPTION, { code: a, msg: b, uid: d });
      };
      this._statsCollector.onUploadPublishDuration = (a, b, d, e) => {
        var f;
        let g = R((f = this._users)).call(f, (b) => b.uid === a);
        g &&
          t.peerPublishStatus(this._sessionId, {
            subscribeElapse: e,
            audioPublishDuration: b,
            videoPublishDuration: d,
            peer: g._uintid
          });
      };
      this._gateway = new wp({
        clientId: this._clientId,
        mode: this._mode,
        codec: this._codec,
        websocketRetryConfig: a.websocketRetryConfig || Na,
        httpRetryConfig: a.httpRetryConfig || Na,
        forceWaitGatewayResponse:
          void 0 === a.forceWaitGatewayResponse || a.forceWaitGatewayResponse,
        statsCollector: this._statsCollector,
        role: a.role
      });
      this._config = a;
      this._configDistribute = new xp(this);
      this._handleGatewayEvents();
      dk.push(this);
    }
    get connectionState() {
      return this._gateway.state;
    }
    get remoteUsers() {
      return this._users;
    }
    get localTracks() {
      return this._highStream ? this._highStream.getAllTracks() : [];
    }
    get uid() {
      return this._uid;
    }
    get channelName() {
      return this._channelName;
    }
    get isStringUID() {
      return !!this._joinInfo && !!this._joinInfo.stringUid;
    }
    async join(a, b, d, e, f) {
      var g;
      let h = t.reportApiInvoke(this._sessionId, {
        name: A.JOIN,
        options: [a, b, d, e],
        tag: z.TRACER
      });
      try {
        if (!d && null !== d)
          throw new m(
            l.INVALID_PARAMS,
            "Invalid token: ".concat(
              d,
              ". If you don not use token, set it to null"
            )
          );
        d && Ga(d, "token", 1, 2047);
        Ie(b);
        e && Je(e);
        f && Ga(f, "optionalInfo", 1, 2047);
      } catch (x) {
        throw (h.onError(x), x);
      }
      if (
        (k.info(
          n((g = "[".concat(this._clientId, "] start join channel "))).call(
            g,
            b
          )
        ),
        this._leaveMutex.isLocked)
      )
        k.debug("[".concat(this._clientId, "] join: waiting leave operation")),
          (await this._leaveMutex.lock())(),
          k.debug("[".concat(this._clientId, "] join: continue"));
      if ("DISCONNECTED" !== this.connectionState)
        throw (
          ((a = new m(
            l.INVALID_OPERATION,
            "[".concat(
              this._clientId,
              "] Client already in connecting/connected state"
            )
          )),
          h.onError(a),
          a)
        );
      this._sessionId = na(32, "").toUpperCase();
      this._gateway.state = "CONNECTING";
      let q = {
        clientId: this._clientId,
        appId: a,
        sid: this._sessionId,
        cname: b,
        uid: "string" != typeof e ? e : null,
        turnServer: this._turnServer,
        proxyServer: this._proxyServer,
        token: d || a,
        cloudProxyServer: this._cloudProxyServerMode,
        optionalInfo: f
      };
      "string" == typeof e &&
        ((q.stringUid = e),
        this._uintUid
          ? ((q.uid = this._uintUid), (this._uintUid = void 0))
          : (q.uid = 0));
      "none" !== this._encryptionMode &&
        this._encryptionSecret &&
        ((q.aesmode = this._encryptionMode),
        (q.aespassword = this._encryptionSecret));
      t.sessionInit(this._sessionId, {
        lts: new Date().getTime(),
        cname: b,
        appid: a,
        mode: this._mode
      });
      Cc(() => {
        "CONNECTING" === this.connectionState &&
          t.joinChannelTimeout(this._sessionId, 5);
      }, 5e3);
      try {
        var p;
        if (
          (await em(
            q,
            this._axiosCancelSource.token,
            this._config.httpRetryConfig || Na
          ),
          q.stringUid && !q.uid)
        ) {
          var r;
          let a = await Yh(
            q.stringUid,
            q,
            this._axiosCancelSource.token,
            this._config.httpRetryConfig || Na
          );
          k.debug(
            n((r = "getUserAccount Success ".concat(q.stringUid, " => "))).call(
              r,
              a
            )
          );
          q.uid = a;
        }
        let e = await Xh(
          q,
          this._axiosCancelSource.token,
          this._config.httpRetryConfig || Na
        );
        var u;
        q.proxyServer &&
          (e.gatewayInfo.gatewayAddrs = D(
            (u = e.gatewayInfo.gatewayAddrs)
          ).call(u, (a) => {
            var b, d;
            a = a.split(":");
            return n(
              (b = n((d = "".concat(q.proxyServer, "/ws/?h="))).call(
                d,
                a[0],
                "&p="
              ))
            ).call(b, a[1]);
          }));
        this._configDistribute.updateConfig(this._clientId, e.configDistribute);
        this._key = d || a;
        this._joinInfo = Bc({}, q, {
          cid: e.gatewayInfo.cid,
          uid: q.uid ? q.uid : e.gatewayInfo.uid,
          vid: e.gatewayInfo.vid,
          apResponse: e.gatewayInfo.res,
          uni_lbs_ip: e.gatewayInfo.uni_lbs_ip,
          gatewayAddrs: e.gatewayInfo.gatewayAddrs
        });
        let f = await this._gateway.join(this._joinInfo, this._key);
        return (
          h.onSuccess(f),
          (this._appId = a),
          (this._channelName = q.cname),
          (this._uid = f),
          this._networkQualityInterval &&
            window.clearInterval(this._networkQualityInterval),
          (this._networkQualityInterval = window.setInterval(
            this._handleUpdateNetworkQuality,
            2e3
          )),
          window.addEventListener("beforeunload", this._handleBeforeUnload),
          k.info(
            n(
              (p = "[".concat(this._clientId, "] Joining channel success: "))
            ).call(p, b)
          ),
          f
        );
      } catch (x) {
        throw (
          (k.error(
            "[".concat(this._clientId, "] Joining channel failed, rollback"),
            x
          ),
          x.code !== l.OPERATION_ABORT &&
            ((this._gateway.state = "DISCONNECTED"), this._reset()),
          h.onError(x),
          x)
        );
      }
    }
    async leave() {
      let a = t.reportApiInvoke(this._sessionId, {
        name: A.LEAVE,
        options: [],
        tag: z.TRACER
      });
      k.info("[".concat(this._clientId, "] Leaving channel"));
      window.removeEventListener("beforeunload", this._handleBeforeUnload);
      this._reset();
      let b = await this._leaveMutex.lock();
      if ("DISCONNECTED" === this.connectionState)
        return (
          k.info(
            "[".concat(this._clientId, "] Leaving channel repeated, success")
          ),
          b(),
          a.onSuccess()
        );
      await this._gateway.leave("CONNECTED" !== this.connectionState);
      k.info("[".concat(this._clientId, "] Leaving channel success"));
      b();
      a.onSuccess();
    }
    async publish(a, b = !0) {
      var d, e;
      cc(a) || (a = [a]);
      let f = t.reportApiInvoke(this._sessionId, {
        name: A.PUBLISH,
        options: D(a).call(a, (a) => a.getTrackId()),
        tag: z.TRACER
      });
      if (0 === a.length)
        return (
          (a = new m(l.INVALID_PARAMS, "track list is empty")),
          f.onError(a),
          a.throw()
        );
      for (let d of a)
        if (!d._enabled && b)
          return (
            (a = new m(
              l.TRACK_IS_DISABLED,
              "can not publish a disabled track: ".concat(d.getTrackId())
            )),
            f.onError(a),
            a.throw()
          );
      k.info(
        n((d = "[".concat(this._clientId, "] Publishing tracks, id "))).call(
          d,
          D(a).call(a, (a) => "".concat(a.getTrackId(), " "))
        )
      );
      d = await this._publishMutex.lock();
      try {
        if ("live" === this._mode && "audience" === this._gateway.role)
          throw new m(l.INVALID_OPERATION, "audience can not publish stream");
        let e = await this._publishHighStream(a),
          h = (e.audioTrack, e.videoTrack);
        this._isDualStreamEnabled &&
          h &&
          !this._lowStream &&
          (await this._publishLowStream(h));
        b &&
          r(a).call(a, (a) => {
            var b;
            -1 === E((b = this._bindEnabledTracks)).call(b, a) &&
              (a.addListener(L.NEED_ADD_TRACK, this._handleLocalTrackEnable),
              a.addListener(L.NEED_REMOVE_TRACK, this._handleLocalTrackDisable),
              this._bindEnabledTracks.push(a));
          });
        d();
        f.onSuccess();
      } catch (g) {
        throw (
          (d(),
          f.onError(g),
          k.error("[".concat(this._clientId, "] publish error"), g.toString()),
          g)
        );
      }
      k.info(
        n((e = "[".concat(this._clientId, "] Publish success, id "))).call(
          e,
          D(a).call(a, (a) => "".concat(a.getTrackId(), " "))
        )
      );
    }
    async unpublish(a, b = !0) {
      var d, e, f;
      if (!this._highStream)
        return void k.warning(
          "[".concat(this._clientId, "] Could not find tracks to unpublish")
        );
      var g = this._highStream.getAllTracks();
      a ? cc(a) || (a = [a]) : (a = this._highStream.getAllTracks());
      g = Jl(g, a);
      let h = t.reportApiInvoke(this._sessionId, {
        name: A.UNPUBLISH,
        options: D(a).call(a, (a) => a.getTrackId()),
        tag: z.TRACER
      });
      k.info(
        n(
          (d = n(
            (e = "[".concat(this._clientId, "] Unpublish tracks, tracks "))
          ).call(
            e,
            D(a).call(a, (a) => "".concat(a.getTrackId(), " ")),
            ", isClosePC: "
          ))
        ).call(d, g)
      );
      d = g ? void 0 : await this._publishMutex.lock();
      if (!this._highStream)
        return (
          k.warning(
            "[".concat(this._clientId, "] Could not find tracks to unpublish")
          ),
          void (d && d())
        );
      try {
        this._lowStream &&
          0 < M(a).call(a, (a) => "video" === a.trackMediaType).length &&
          (await this._lowStream.closeP2PConnection(),
          (this._lowStream = void 0)),
          g
            ? await this._highStream.closeP2PConnection()
            : await this._highStream.removeTracks(a),
          d && d();
      } catch (q) {
        if (q.code !== l.OPERATION_ABORT)
          throw (
            (h.onError(q),
            k.error(
              "[".concat(this._clientId, "] unpublish error"),
              q.toString()
            ),
            d && d(),
            q)
          );
        k.debug("[".concat(this._clientId, "] ignore unpub operation abort"));
      }
      this._highStream &&
        "disconnected" === this._highStream.connectionState &&
        ((this._highStream = void 0), (this._lowStream = void 0));
      b &&
        r(a).call(a, (a) => {
          var b, d;
          let e = E((b = this._bindEnabledTracks)).call(b, a);
          -1 !== e &&
            (a.off(L.NEED_ADD_TRACK, this._handleLocalTrackEnable),
            a.off(L.NEED_REMOVE_TRACK, this._handleLocalTrackDisable),
            Ma((d = this._bindEnabledTracks)).call(d, e, 1));
        });
      k.info(
        n((f = "[".concat(this._clientId, "] Unpublish success,tracks "))).call(
          f,
          D(a).call(a, (a) => "".concat(a.getTrackId()))
        )
      );
      h.onSuccess();
    }
    async subscribe(a, b) {
      var d, e, f, g;
      Xa(b, "mediaType", ["audio", "video"]);
      let h = t.reportApiInvoke(this._sessionId, {
        name: A.SUBSCRIBE,
        options: [a.uid, b],
        tag: z.TRACER
      });
      if (!this._joinInfo)
        throw (
          ((b = new m(
            l.INVALID_OPERATION,
            "Can't subscribe stream, no join info"
          )),
          h.onError(b),
          b)
        );
      if (
        "CONNECTED" !== this.connectionState &&
        "RECONNECTING" !== this.connectionState
      )
        throw (
          ((b = new m(
            l.INVALID_OPERATION,
            "Can't subscribe stream in ".concat(this.connectionState, " state")
          )),
          h.onError(b),
          b)
        );
      if (!R((d = this._users)).call(d, (b) => b === a)) {
        var q;
        b = new m(l.INVALID_REMOTE_USER, "user is not in the channel");
        throw (
          (k.error(
            n((q = "[".concat(this._clientId, "] can not subscribe "))).call(
              q,
              a.uid,
              ", this user is not in the channel"
            )
          ),
          h.onError(b),
          b)
        );
      }
      if (!a.hasAudio && !a.hasVideo) {
        var p;
        b = new m(l.INVALID_REMOTE_USER, "user is not published");
        throw (
          (k.error(
            n((p = "[".concat(this._clientId, "] can not subscribe "))).call(
              p,
              a.uid,
              ", user is not published"
            )
          ),
          h.onError(b),
          b)
        );
      }
      q = { audio: "audio" === b, video: "video" === b };
      if ((!a.hasAudio && q.audio) || (!a.hasVideo && q.video)) {
        var r, u;
        var x = new m(l.REMOTE_USER_IS_NOT_PUBLISHED);
        throw (
          (k.error(
            n(
              (r = n(
                (u = "[".concat(this._clientId, "] can not subscribe "))
              ).call(u, a.uid, " with mediaType "))
            ).call(r, b, ", remote track is not published")
          ),
          h.onError(x),
          x)
        );
      }
      (r = this._subscribeMutex.get(a.uid)) ||
        ((r = new $b()), this._subscribeMutex.set(a.uid, r));
      k.info(
        n(
          (e = n((f = "[".concat(this._clientId, "] subscribe user "))).call(
            f,
            a.uid,
            ", mediaType: "
          ))
        ).call(e, b)
      );
      e = await r.lock();
      f = this._remoteStream.get(a.uid);
      try {
        if (f)
          (q.audio = q.audio || f.subscribeOptions.audio),
            (q.video = q.video || f.subscribeOptions.video),
            await this._gateway.subscribeChange(f, q);
        else {
          f = new Rp(a, this._statsCollector, this._joinInfo, q);
          this._remoteStream.set(a.uid, f);
          try {
            await this._gateway.subscribe(f);
          } catch (xb) {
            throw (this._remoteStream.delete(a.uid), xb);
          }
          f.on(G.CONNECTION_STATE_CHANGE, (b, d) => {
            "connecting" === b
              ? this.emit(O.MEDIA_RECONNECT_START, a.uid)
              : "connected" === b && this.emit(O.MEDIA_RECONNECT_END, a.uid);
          });
        }
        e();
      } catch (xb) {
        var v;
        throw (
          (h.onError(xb),
          e(),
          k.error(
            n((v = "[".concat(this._clientId, "] subscribe user "))).call(
              v,
              a.uid,
              " error"
            ),
            xb
          ),
          xb)
        );
      }
      k.info(
        n(
          (x = n(
            (g = "[".concat(this._clientId, "] subscribe success user "))
          ).call(g, a.uid, ", mediaType: "))
        ).call(x, b)
      );
      this._defaultStreamFallbackType &&
        this.setStreamFallbackOption(
          a.uid,
          this._defaultStreamFallbackType
        ).catch((a) => {
          k.warning(
            "[".concat(this._clientId, "] auto set fallback failed"),
            a
          );
        });
      b = "audio" === b ? a.audioTrack : a.videoTrack;
      return b
        ? (h.onSuccess(b.getTrackId()), b)
        : ((b = new m(
            l.UNEXPECTED_ERROR,
            "can not find remote track in user object"
          )),
          h.onError(b),
          b.throw());
    }
    async unsubscribe(a, b) {
      var d, e, f, g, h;
      b && Xa(b, "mediaType", ["audio", "video"]);
      let q = t.reportApiInvoke(this._sessionId, {
        name: A.UNSUBSCRIBE,
        options: [a.uid, b],
        tag: z.TRACER
      });
      if (!R((d = this._users)).call(d, (b) => b === a)) {
        var p;
        b = new m(l.INVALID_REMOTE_USER, "user is not in the channel");
        throw (
          (k.error(
            n((p = "[".concat(this._clientId, "] can not subscribe "))).call(
              p,
              a.uid,
              ", user is not in the channel"
            )
          ),
          q.onError(b),
          b)
        );
      }
      k.info(
        n(
          (e = n((f = "[".concat(this._clientId, "] unsubscribe uid: "))).call(
            f,
            a.uid,
            ", mediaType: "
          ))
        ).call(e, b)
      );
      (p = this._subscribeMutex.get(a.uid)) ||
        ((p = new $b()), this._subscribeMutex.set(a.uid, p));
      p = await p.lock();
      d = this._remoteStream.get(a.uid);
      var r;
      if (!d)
        return (
          k.warning(
            n(
              (r = "[".concat(
                this._clientId,
                "]: you have not subscribe the remote user "
              ))
            ).call(r, a.uid)
          ),
          void q.onSuccess()
        );
      r = Bc({}, d.subscribeOptions);
      "audio" === b
        ? (r.audio = !1)
        : ("video" === b || (r.audio = !1), (r.video = !1));
      try {
        r.audio || r.video
          ? await this._gateway.subscribeChange(d, r)
          : (await d.closeP2PConnection(), this._remoteStream.delete(a.uid)),
          p();
      } catch (x) {
        var u;
        if (x.code !== l.OPERATION_ABORT)
          throw (
            (q.onError(x),
            p(),
            k.error(
              n((u = "[".concat(this._clientId, "] unsubscribe user "))).call(
                u,
                a.uid,
                " error"
              ),
              x.toString()
            ),
            x)
          );
        k.debug("[".concat(this._clientId, "] ignore unsub operation abort"));
      }
      k.info(
        n(
          (g = n(
            (h = "[".concat(this._clientId, "] unsubscribe success uid: "))
          ).call(h, a.uid, ", mediaType: "))
        ).call(g, b)
      );
      q.onSuccess();
    }
    setLowStreamParameter(a) {
      if (!a) throw new m(l.INVALID_PARAMS);
      null == a.width || W(a.width, "streamParameter.width");
      null == a.height || W(a.height, "streamParameter.height");
      null == a.framerate || W(a.framerate, "streamParameter.framerate");
      null == a.bitrate || W(a.bitrate, "streamParameter.bitrate");
      let b = t.reportApiInvoke(this._sessionId, {
        name: A.SET_LOW_STREAM_PARAMETER,
        options: [a],
        tag: z.TRACER
      });
      ((!a.width && a.height) || (a.width && !a.height)) &&
        k.warning(
          "[".concat(
            this._clientId,
            "] The width and height parameters take effect only when both are set"
          )
        );
      k.info("[".concat(this._clientId, "] set low stream parameter to"), w(a));
      this._lowStreamParameter = a;
      b.onSuccess();
    }
    async enableDualStream() {
      let a = t.reportApiInvoke(this._sessionId, {
        name: A.ENABLE_DUAL_STREAM,
        options: [],
        tag: z.TRACER
      });
      if (!ea.supportDualStream) {
        t.streamSwitch(this._sessionId, { lts: v(), isdual: !0, succ: !1 });
        var b = new m(l.NOT_SUPPORT, "Your browser is not support dual stream");
        throw (a.onError(b), b);
      }
      if (this._isDualStreamEnabled)
        throw (
          ((b = new m(l.INVALID_OPERATION, "Dual stream is already enabled")),
          a.onError(b),
          b)
        );
      if (
        this._highStream &&
        "connected" === this._highStream.connectionState &&
        this._highStream.videoTrack
      )
        try {
          await this._publishLowStream(this._highStream.videoTrack);
        } catch (d) {
          throw (
            (t.streamSwitch(this._sessionId, {
              lts: v(),
              isdual: !0,
              succ: !1
            }),
            a.onError(d),
            d)
          );
        }
      this._isDualStreamEnabled = !0;
      this._highStream &&
        (this._highStream.lowStreamConnection = this._lowStream);
      t.streamSwitch(this._sessionId, { lts: v(), isdual: !0, succ: !0 });
      k.info("[".concat(this._clientId, "] enable dual stream"));
      a.onSuccess();
    }
    async disableDualStream() {
      let a = t.reportApiInvoke(this._sessionId, {
        name: A.DISABLE_DUAL_STREAM,
        options: [],
        tag: z.TRACER
      });
      if (this._lowStream)
        try {
          await this._lowStream.closeP2PConnection();
        } catch (b) {
          throw (
            (t.streamSwitch(this._sessionId, {
              lts: v(),
              isdual: !1,
              succ: !1
            }),
            a.onError(b),
            b)
          );
        }
      this._lowStream = void 0;
      this._isDualStreamEnabled = !1;
      this._highStream && (this._highStream.lowStreamConnection = void 0);
      t.streamSwitch(this._sessionId, { lts: v(), isdual: !1, succ: !0 });
      k.info("[".concat(this._clientId, "] disable dual stream"));
      a.onSuccess();
    }
    async setClientRole(a) {
      Xa(a, "role", ["audience", "host"]);
      let b = t.reportApiInvoke(this._sessionId, {
        name: A.SET_CLIENT_ROLE,
        options: [a],
        tag: z.TRACER
      });
      if ("rtc" === this._mode)
        return (
          k.warning("rtc mode can not use setClientRole"),
          (a = new m(
            l.INVALID_OPERATION,
            "rtc mode can not use setClientRole"
          )),
          b.onError(a),
          a.throw()
        );
      try {
        var d;
        if ("audience" === a && this._highStream)
          throw new m(
            l.INVALID_OPERATION,
            "can not set client role to audience when publishing stream"
          );
        await this._gateway.setClientRole(a);
        k.info(
          n((d = "[".concat(this._clientId, "] set client role to "))).call(
            d,
            a
          )
        );
        b.onSuccess();
      } catch (e) {
        throw (b.onError(e), e);
      }
    }
    setProxyServer(a) {
      Ga(a, "proxyServer");
      let b = t.reportApiInvoke(this._sessionId, {
        name: A.SET_PROXY_SERVER,
        options: [a],
        tag: z.TRACER
      });
      if ("DISCONNECTED" !== this.connectionState)
        throw new m(
          l.INVALID_OPERATION,
          "Set proxy server before join channel"
        );
      if ("disabled" !== this._cloudProxyServerMode)
        throw new m(l.INVALID_OPERATION, "You have already set the proxy");
      this._proxyServer = a;
      t.setProxyServer(this._proxyServer);
      k.setProxyServer(this._proxyServer);
      b.onSuccess();
    }
    setTurnServer(a) {
      cc(a) || (a = [a]);
      r(a).call(a, (a) => Ah(a));
      let b = t.reportApiInvoke(this._sessionId, {
        name: A.SET_TURN_SERVER,
        options: a,
        tag: z.TRACER
      });
      if ("DISCONNECTED" !== this.connectionState)
        throw new m(l.INVALID_OPERATION, "Set turn server before join channel");
      if ("disabled" !== this._cloudProxyServerMode)
        throw new m(l.INVALID_OPERATION, "You have already set the proxy");
      this._turnServer = { servers: a, mode: "manual" };
      k.info("[".concat(this._clientId, "] Set turnserver."));
      b.onSuccess();
    }
    startProxyServer(a) {
      let b = t.reportApiInvoke(this._sessionId, {
        name: A.START_PROXY_SERVER,
        options: [],
        tag: z.TRACER
      });
      if ("DISCONNECTED" !== this.connectionState)
        throw new m(
          l.INVALID_OPERATION,
          "Start proxy server before join channel"
        );
      if (this._proxyServer || "manual" === this._turnServer.mode)
        throw new m(l.INVALID_OPERATION, "You have already set the proxy");
      this._cloudProxyServerMode = a ? "443only" : "normal";
      k.info(
        "[".concat(this._clientId, "] set cloud proxy server mode to"),
        this._cloudProxyServerMode
      );
      b.onSuccess();
    }
    stopProxyServer() {
      let a = t.reportApiInvoke(this._sessionId, {
        name: A.STOP_PROXY_SERVER,
        options: [],
        tag: z.TRACER
      });
      if ("DISCONNECTED" !== this.connectionState)
        throw new m(
          l.INVALID_OPERATION,
          "Stop proxy server after leave channel"
        );
      t.setProxyServer();
      k.setProxyServer();
      this._cloudProxyServerMode = "disabled";
      k.info(
        "[".concat(this._clientId, "] set cloud proxy server mode to"),
        this._cloudProxyServerMode
      );
      this._proxyServer = void 0;
      this._turnServer = { mode: "auto", servers: [] };
      a.onSuccess();
    }
    async setRemoteVideoStreamType(a, b) {
      var d, e;
      Xa(b, "streamType", [0, 1]);
      let f = t.reportApiInvoke(this._sessionId, {
        name: A.SET_REMOTE_VIDEO_STREAM_TYPE,
        options: [a, b],
        tag: z.TRACER
      });
      try {
        await this._gateway.setRemoteVideoStreamType(a, b);
      } catch (g) {
        throw (
          (f.onError(g),
          k.error(
            "[".concat(this._clientId, "] set remote video stream type error"),
            g.toString()
          ),
          g)
        );
      }
      k.info(
        n(
          (d = n((e = "[".concat(this._clientId, "] set remote "))).call(
            e,
            a,
            " video stream type to "
          ))
        ).call(d, b)
      );
      this._remoteStreamTypeCacheMap.set(a, b);
      f.onSuccess();
    }
    async setStreamFallbackOption(a, b) {
      var d, e;
      Xa(b, "fallbackType", [0, 1, 2]);
      let f = t.reportApiInvoke(this._sessionId, {
        name: A.SET_STREAM_FALLBACK_OPTION,
        options: ["too long to show", b],
        tag: z.TRACER
      });
      try {
        await this._gateway.setStreamFallbackOption(a, b);
      } catch (g) {
        throw (
          (f.onError(g),
          k.error(
            "[".concat(this._clientId, "] set stream fallback option"),
            g.toString()
          ),
          g)
        );
      }
      k.info(
        n(
          (d = n((e = "[".concat(this._clientId, "] set remote "))).call(
            e,
            a,
            " stream fallback type to "
          ))
        ).call(d, b)
      );
      this._streamFallbackTypeCacheMap.set(a, b);
      f.onSuccess();
    }
    setEncryptionConfig(a, b) {
      Xa(a, "encryptionMode", [
        "aes-128-xts",
        "aes-256-xts",
        "aes-128-ecb",
        "sm4-128-ecb",
        "none"
      ]);
      Ga(b, "secret");
      let d = t.reportApiInvoke(this._sessionId, {
        name: A.SET_ENCRYPTION_CONFIG,
        options: [a],
        tag: z.TRACER
      });
      this._encryptionMode = a;
      this._encryptionSecret = b;
      d.onSuccess();
    }
    async renewToken(a) {
      Ga(a, "token", 1, 2047);
      let b = t.reportApiInvoke(this._sessionId, {
        name: A.RENEW_TOKEN,
        options: [a],
        tag: z.TRACER
      });
      if (!this._key)
        return (
          (a = new m(
            l.INVALID_OPERATION,
            "renewToken should not be called before user join"
          )),
          b.onError(a),
          a.throw()
        );
      this._key = a;
      try {
        await this._gateway.renewToken(a);
      } catch (d) {
        throw (
          (b.onError(d),
          k.error(
            "[".concat(this._clientId, "] renewToken failed"),
            d.toString()
          ),
          d)
        );
      }
      k.debug("[".concat(this._clientId, "] renewToken success"));
      b.onSuccess();
    }
    enableAudioVolumeIndicator() {
      let a = t.reportApiInvoke(this._sessionId, {
        name: A.ENABLE_AUDIO_VOLUME_INDICATOR,
        options: [],
        tag: z.TRACER
      });
      if (this._audioVolumeIndicationInterval)
        return (
          k.warning("you have already enabled audio volume indicator!"),
          a.onSuccess()
        );
      this._audioVolumeIndicationInterval = window.setInterval(() => {
        var a, d, e;
        let f = rd(
          (a = D((d = Kb(qc((e = this._remoteStream)).call(e)))).call(
            d,
            (a) => ({
              level: a.user.audioTrack
                ? 100 * a.user.audioTrack._source.getAudioAvgLevel()
                : 0,
              uid: a.getUserId()
            })
          ))
        ).call(a, (a, b) => a.level - b.level);
        this._highStream &&
          this._highStream.audioTrack &&
          (f.push({
            level: 100 * this._highStream.audioTrack._source.getAudioAvgLevel(),
            uid: this._highStream._userId
          }),
          (f = rd(f).call(f, (a, b) => a.level - b.level)));
        this.emit(O.VOLUME_INDICATOR, f);
      }, C.AUDIO_VOLUME_INDICATION_INTERVAL || 2e3);
      a.onSuccess();
    }
    getRTCStats() {
      let a = this._statsCollector.getRTCStats(),
        b = this._gateway.getInChannelInfo();
      return (a.Duration = Math.round(b.duration / 1e3)), a;
    }
    startLiveStreaming(a, b) {
      let d = t.reportApiInvoke(this._sessionId, {
        name: A.START_LIVE_STREAMING,
        options: [a, b],
        tag: z.TRACER
      });
      if (!b) {
        if ("h264" !== this._codec)
          return (
            (a = new m(
              l.LIVE_STREAMING_INVALID_RAW_STREAM,
              "raw streaming is only support h264"
            )),
            d.onError(a),
            u.reject(a)
          );
        if (!this._highStream)
          return (
            (a = new m(
              l.LIVE_STREAMING_INVALID_RAW_STREAM,
              "can not find stream to raw streaming"
            )),
            d.onError(a),
            u.reject(a)
          );
      }
      if (
        (this._liveRawStreamingClient &&
          this._liveRawStreamingClient.hasUrl(a)) ||
        (this._liveTranscodeStreamingClient &&
          this._liveTranscodeStreamingClient.hasUrl(a))
      )
        return (
          (a = new m(l.LIVE_STREAMING_TASK_CONFLICT)), d.onError(a), u.reject(a)
        );
      b = b ? ma.TRANSCODE : ma.RAW;
      return this._createLiveStreamingClient(b)
        .startLiveStreamingTask(a, b)
        .then(() => d.onSuccess())
        .catch((a) => {
          throw (d.onError(a), a);
        });
    }
    setLiveTranscoding(a) {
      let b = t.reportApiInvoke(this._sessionId, {
        name: A.SET_LIVE_TRANSCODING,
        options: [a],
        tag: z.TRACER
      });
      return this._createLiveStreamingClient(ma.TRANSCODE)
        .setTranscodingConfig(a)
        .then(() => b.onSuccess())
        .catch((a) => {
          throw (b.onError(a), a);
        });
    }
    stopLiveStreaming(a) {
      var b;
      let d = t.reportApiInvoke(this._sessionId, {
          name: A.STOP_LIVE_STREAMING,
          options: [a],
          tag: z.TRACER
        }),
        e = M(
          (b = [
            this._liveRawStreamingClient,
            this._liveTranscodeStreamingClient
          ])
        ).call(b, (b) => b && b.hasUrl(a));
      return e.length
        ? u
            .all(D(e).call(e, (b) => b && b.stopLiveStreamingTask(a)))
            .then(() => d.onSuccess())
            .catch((a) => {
              throw (d.onError(a), a);
            })
        : ((b = new m(
            l.INVALID_PARAMS,
            "can not find live streaming url to stop"
          )),
          d.onError(b),
          u.reject(b));
    }
    async addInjectStreamUrl(a, b) {
      let d = t.reportApiInvoke(this._sessionId, {
        name: A.ADD_INJECT_STREAM_URL,
        options: [a, b],
        tag: z.TRACER
      });
      try {
        if (!this._joinInfo)
          throw new m(
            l.INVALID_OPERATION,
            "can not addInjectStreamUrl, no joininfo"
          );
        let d = this._createLiveStreamingClient(ma.INJECT);
        d.setInjectStreamConfig(b, 0);
        await d.startLiveStreamingTask(a, ma.INJECT);
      } catch (e) {
        throw (d.onError(e), e);
      }
      d.onSuccess();
    }
    async removeInjectStreamUrl() {
      let a = t.reportApiInvoke(this._sessionId, {
        name: A.REMOVE_INJECT_STREAM_URL,
        options: [],
        tag: z.TRACER
      });
      try {
        var b, d;
        let a = this._createLiveStreamingClient(ma.INJECT),
          f = R((b = Kb(qc((d = a.streamingTasks)).call(d)))).call(
            b,
            (a) => a.mode === ma.INJECT
          );
        if (!this._joinInfo || !f)
          throw new m(
            l.INVALID_OPERATION,
            "can remove addInjectStreamUrl, no joininfo or inject task"
          );
        await a.stopLiveStreamingTask(f.url);
      } catch (e) {
        throw (a.onError(e), e);
      }
      a.onSuccess();
    }
    async startChannelMediaRelay(a) {
      let b = t.reportApiInvoke(this._sessionId, {
        name: A.START_CHANNEL_MEDIA_RELAY,
        options: [a],
        tag: z.TRACER
      });
      try {
        ji(a),
          await this._createChannelMediaRelayClient().startChannelMediaRelay(a);
      } catch (d) {
        return b.onError(d), d.throw();
      }
      b.onSuccess();
    }
    async updateChannelMediaRelay(a) {
      let b = t.reportApiInvoke(this._sessionId, {
        name: A.UPDATE_CHANNEL_MEDIA_RELAY,
        options: [a],
        tag: z.TRACER
      });
      try {
        ji(a),
          await this._createChannelMediaRelayClient().updateChannelMediaRelay(
            a
          );
      } catch (d) {
        return b.onError(d), d.throw();
      }
      b.onSuccess();
    }
    async stopChannelMediaRelay() {
      let a = t.reportApiInvoke(this._sessionId, {
        name: A.STOP_CHANNEL_MEDIA_RELAY,
        options: [],
        tag: z.TRACER
      });
      try {
        await this._createChannelMediaRelayClient().stopChannelMediaRelay();
      } catch (b) {
        return a.onError(b), b.throw();
      }
      a.onSuccess();
    }
    sendMetadata(a) {
      if (!this._joinInfo)
        throw new m(l.INVALID_OPERATION, "can not send metadata, no join info");
      if (1024 < new Blob([a]).size) throw new m(l.METADATA_OUT_OF_RANGE);
      return this._gateway.signal.request(ha.SEND_METADATA, {
        session_id: this._joinInfo.sid,
        metadata: Kl(a)
      });
    }
    async sendCustomReportMessage(a) {
      cc(a) || (a = [a]);
      r(a).call(a, sl);
      let b = t.reportApiInvoke(this._sessionId, {
        name: A.SEND_CUSTOM_REPORT_MESSAGE,
        options: [],
        tag: z.TRACER
      });
      if (!this._joinInfo)
        return (
          (a = new m(
            l.INVALID_OPERATION,
            "can not send custom report, no join info"
          )),
          b.onError(a),
          a.throw()
        );
      await t.sendCustomReportMessage(this._joinInfo.sid, a);
    }
    getLocalAudioStats() {
      return this._highStream
        ? this._statsCollector.getLocalAudioTrackStats(
            this._highStream.connectionId
          )
        : se;
    }
    getRemoteAudioStats() {
      var a;
      let b = {};
      return (
        r((a = this._remoteStream)).call(a, (a, e) => {
          b[e] = this._statsCollector.getRemoteAudioTrackStats(a.connectionId);
        }),
        b
      );
    }
    getLocalVideoStats() {
      return this._highStream
        ? this._statsCollector.getLocalVideoTrackStats(
            this._highStream.connectionId
          )
        : te;
    }
    getRemoteVideoStats() {
      var a;
      let b = {};
      return (
        r((a = this._remoteStream)).call(a, (a, e) => {
          b[e] = this._statsCollector.getRemoteVideoTrackStats(a.connectionId);
        }),
        b
      );
    }
    _reset() {
      var a, b, d;
      k.debug("[".concat(this._clientId, "] reset client"));
      this._axiosCancelSource.cancel();
      this._axiosCancelSource = Cb.CancelToken.source();
      this._streamFallbackTypeCacheMap = new Y();
      this._remoteStreamTypeCacheMap = new Y();
      this._defaultStreamFallbackType =
        this._proxyServer =
        this._joinInfo =
          void 0;
      this._sessionId = null;
      this._statsCollector.reset();
      this._channelName = this._uid = this._appId = this._key = void 0;
      r((a = this._users)).call(a, (a) => {
        a.audioTrack && (a.audioTrack.stop(), (a.audioTrack._isDestroyed = !0));
        a.videoTrack && (a.videoTrack.stop(), (a.videoTrack._isDestroyed = !0));
      });
      this._users = [];
      this._audioVolumeIndicationInterval &&
        (window.clearInterval(this._audioVolumeIndicationInterval),
        (this._audioVolumeIndicationInterval = void 0));
      this._highStream &&
        (this._highStream.closeP2PConnection(!0), (this._highStream = void 0));
      r((b = this._bindEnabledTracks)).call(b, (a) => {
        a.off(L.NEED_ADD_TRACK, this._handleLocalTrackEnable);
        a.off(L.NEED_REMOVE_TRACK, this._handleLocalTrackDisable);
      });
      this._bindEnabledTracks = [];
      this._lowStream &&
        (this._lowStream.closeP2PConnection(!0), (this._lowStream = void 0));
      r((d = this._remoteStream)).call(d, (a) => {
        a.closeP2PConnection(!0);
      });
      this._remoteStream = new Y();
      this._publishMutex = new $b();
      this._subscribeMutex = new Y();
      this._networkQualityInterval &&
        (window.clearInterval(this._networkQualityInterval),
        (this._networkQualityInterval = void 0));
      this._injectStreamingClient &&
        (this._injectStreamingClient.terminate(),
        this._injectStreamingClient.removeAllListeners(),
        (this._injectStreamingClient = void 0));
      this._liveRawStreamingClient &&
        (this._liveRawStreamingClient.terminate(),
        this._liveRawStreamingClient.removeAllListeners(),
        (this._liveRawStreamingClient = void 0));
      this._liveTranscodeStreamingClient &&
        (this._liveTranscodeStreamingClient.terminate(),
        this._liveTranscodeStreamingClient.removeAllListeners(),
        (this._liveTranscodeStreamingClient = void 0));
      this._channelMediaRelayClient &&
        (this._channelMediaRelayClient.dispose(),
        (this._channelMediaRelayClient = void 0));
    }
    _renewSession() {
      var a, b;
      let d = na(32, "").toUpperCase();
      k.debug(
        n(
          (a = n((b = "[".concat(this._clientId, "] renewSession "))).call(
            b,
            this._sessionId,
            " => "
          ))
        ).call(a, d)
      );
      this._sessionId = d;
      this._joinInfo && (this._joinInfo.sid = d);
      this._gateway.joinInfo && (this._gateway.joinInfo.sid = d);
    }
    async _publishHighStream(a) {
      if (!this._joinInfo)
        throw new m(l.INVALID_OPERATION, "Can't publish stream, no join info!");
      if (
        "CONNECTED" !== this.connectionState &&
        "RECONNECTING" !== this.connectionState
      )
        throw new m(
          l.INVALID_OPERATION,
          "can not publish stream in ".concat(this.connectionState, " state")
        );
      if (
        "auto" === this._turnServer.mode &&
        C.FORCE_TURN &&
        !C.TURN_ENABLE_TCP &&
        !C.TURN_ENABLE_UDP
      )
        throw new m(
          l.UNEXPECTED_ERROR,
          "force TURN With No TURN Configuration"
        );
      if (
        (k.debug("[".concat(this._clientId, "] publish high stream")),
        this._highStream)
      )
        return await this._highStream.addTracks(a), this._highStream;
      this._highStream = new fl(
        this._statsCollector,
        this._joinInfo,
        this._codec
      );
      await this._highStream.addTracks(a);
      try {
        await this._gateway.publish(this._highStream, "high");
      } catch (b) {
        throw ((this._highStream = void 0), b);
      }
      return (
        this._highStream.on(G.CONNECTION_STATE_CHANGE, (a, d) => {
          this._highStream &&
            ("connected" === a
              ? this.emit(O.MEDIA_RECONNECT_END, this._highStream.getUserId())
              : "connecting" === a &&
                this.emit(
                  O.MEDIA_RECONNECT_START,
                  this._highStream.getUserId()
                ));
        }),
        this._highStream
      );
    }
    async _publishLowStream(a) {
      if (!this._joinInfo)
        throw new m(l.INVALID_OPERATION, "Can't publish stream, no join info!");
      if (
        "CONNECTED" !== this.connectionState &&
        "RECONNECTING" !== this.connectionState
      )
        throw new m(
          l.INVALID_OPERATION,
          "can not publish stream in ".concat(this.connectionState, " state")
        );
      if (!this._highStream || "connected" !== this._highStream.connectionState)
        throw new m(l.UNEXPECTED_ERROR, "Could not find high stream");
      if (this._lowStream)
        return new m(
          l.UNEXPECTED_ERROR,
          "[".concat(
            this._clientId,
            "] Can't publish low stream when stream already publish"
          )
        ).throw();
      k.debug("[".concat(this._clientId, "] publish low stream"));
      this._lowStream = new fl(
        this._statsCollector,
        this._joinInfo,
        this._codec,
        !0
      );
      this._lowStream.lowStreamParameter = this._lowStreamParameter;
      await this._lowStream.addTracks([a]);
      try {
        await this._gateway.publish(this._lowStream, "low");
      } catch (b) {
        throw ((this._lowStream = void 0), b);
      }
    }
    _createLiveStreamingClient(a) {
      if (!this._joinInfo || !this._appId)
        return new m(
          l.INVALID_OPERATION,
          "can not create live streaming client, please join channel first"
        ).throw();
      let b = () =>
          new Tp(
            this._joinInfo,
            this._config.websocketRetryConfig || Na,
            this._config.httpRetryConfig || Na
          ),
        d = (a) => {
          a.onLiveStreamError = (a, b) => {
            t.reportApiInvoke(this._sessionId, {
              name: A.ON_LIVE_STREAM_ERROR,
              options: [a, b],
              tag: z.TRACER
            }).onSuccess();
            this.emit(O.LIVE_STREAMING_ERROR, a, b);
          };
          a.onLiveStreamWarning = (a, b) => {
            t.reportApiInvoke(this._sessionId, {
              name: A.ON_LIVE_STREAM_WARNING,
              options: [a, b],
              tag: z.TRACER
            }).onSuccess();
            this.emit(O.LIVE_STREAMING_WARNING, a, b);
          };
          a.on(Qc.REQUEST_WORKER_MANAGER_LIST, (a, b, d) => {
            if (!this._joinInfo)
              return d(
                new m(
                  l.INVALID_OPERATION,
                  "can not find join info to get worker manager"
                )
              );
            Zh(a, this._joinInfo, this._axiosCancelSource.token, Na)
              .then(b)
              .catch(d);
          });
        };
      switch (a) {
        case ma.RAW:
          return (
            this._liveRawStreamingClient ||
              ((this._liveRawStreamingClient = b()),
              d(this._liveRawStreamingClient)),
            this._liveRawStreamingClient
          );
        case ma.TRANSCODE:
          return (
            this._liveTranscodeStreamingClient ||
              ((this._liveTranscodeStreamingClient = b()),
              d(this._liveTranscodeStreamingClient)),
            this._liveTranscodeStreamingClient
          );
        case ma.INJECT:
          return (
            this._injectStreamingClient ||
              ((this._injectStreamingClient = b()),
              this._injectStreamingClient.on(
                Qc.REQUEST_WORKER_MANAGER_LIST,
                (a, b, d) => {
                  if (!this._joinInfo)
                    return d(
                      new m(
                        l.INVALID_OPERATION,
                        "can not find join info to get worker manager"
                      )
                    );
                  Zh(a, this._joinInfo, this._axiosCancelSource.token, Na)
                    .then(b)
                    .catch(d);
                }
              ),
              (this._injectStreamingClient.onInjectStatusChange = (a, b, d) => {
                this.emit(O.INJECT_STREAM_STATUS, a, b, d);
              })),
            this._injectStreamingClient
          );
      }
    }
    _createChannelMediaRelayClient() {
      return this._joinInfo
        ? (this._channelMediaRelayClient ||
            ((this._channelMediaRelayClient = new Vp(
              this._joinInfo,
              this._clientId,
              this._config.websocketRetryConfig || Na,
              this._config.httpRetryConfig || Na
            )),
            this._channelMediaRelayClient.on("state", (a) => {
              "RELAY_STATE_FAILURE" === a &&
                this._channelMediaRelayClient &&
                this._channelMediaRelayClient.dispose();
              this.emit(O.CHANNEL_MEDIA_RELAY_STATE, a);
            }),
            this._channelMediaRelayClient.on("event", (a) => {
              this.emit(O.CHANNEL_MEDIA_RELAY_EVENT, a);
            })),
          this._channelMediaRelayClient)
        : new m(
            l.INVALID_OPERATION,
            "can not create channel media relay client, please join channel first"
          ).throw();
    }
    _handleGatewayEvents() {
      this._gateway.on(Ea.DISCONNECT_P2P, () => {
        var a;
        this._highStream &&
          "disconnected" !== this._highStream.connectionState &&
          (k.debug(
            "[".concat(this._clientId, "] ready to reconnect high stream")
          ),
          this._highStream.readyToReconnectPC());
        this._lowStream &&
          "disconnected" !== this._lowStream.connectionState &&
          (k.debug(
            "[".concat(this._clientId, "] ready to reconnect low stream")
          ),
          this._lowStream.readyToReconnectPC());
        r((a = this._remoteStream)).call(a, (a, d) => {
          var b;
          k.debug(
            n(
              (b = "[".concat(
                this._clientId,
                "] ready to reconnect remote stream "
              ))
            ).call(b, d)
          );
          a.readyToReconnectPC();
        });
      });
      this._gateway.on(Ea.CONNECTION_STATE_CHANGE, (a, b, d) => {
        var e, f;
        let g = () => {
          this.emit(O.CONNECTION_STATE_CHANGE, a, b, d);
        };
        if (
          (k.info(
            n(
              (e = n(
                (f = "[".concat(this._clientId, "] connection state change: "))
              ).call(f, b, " -> "))
            ).call(e, a)
          ),
          "DISCONNECTED" === a)
        )
          return this._reset(), this._renewSession(), void g();
        var h, l;
        if ("RECONNECTING" === a)
          this._highStream &&
            "connecting" === this._highStream.connectionState &&
            (k.debug(
              "[".concat(this._clientId, "] ready to reconnect high stream")
            ),
            this._highStream.readyToReconnectPC()),
            this._lowStream &&
              "connecting" === this._lowStream.connectionState &&
              (k.debug(
                "[".concat(this._clientId, "] ready to reconnect low stream")
              ),
              this._lowStream.readyToReconnectPC()),
            r((h = this._remoteStream)).call(h, (a, b) => {
              var d;
              "connecting" === a.connectionState &&
                (k.debug(
                  n(
                    (d = "[".concat(
                      this._clientId,
                      "] ready to reconnect remote stream "
                    ))
                  ).call(d, b)
                ),
                a.readyToReconnectPC());
            }),
            r((l = this._users)).call(l, (a) => {
              a._trust_in_room_ = !1;
              a._trust_audio_enabled_state_ = !1;
              a._trust_video_enabled_state_ = !1;
              a._trust_audio_mute_state_ = !1;
              a._trust_video_mute_state_ = !1;
              a._trust_stream_added_state_ = !1;
            }),
            this._userOfflineTimeout &&
              window.clearTimeout(this._userOfflineTimeout),
            this._streamRemovedTimeout &&
              window.clearTimeout(this._streamRemovedTimeout),
            (this._streamRemovedTimeout = this._userOfflineTimeout = void 0);
        else if ("CONNECTED" === a) {
          var m, p;
          r((m = this._streamFallbackTypeCacheMap)).call(m, (a, b) => {
            this._gateway
              .setStreamFallbackOption(b, a)
              .catch((a) =>
                k.warning(
                  "[".concat(
                    this._clientId,
                    "] auto set stream fallback option failed"
                  ),
                  a
                )
              );
          });
          r((p = this._remoteStreamTypeCacheMap)).call(p, (a, b) => {
            this._gateway
              .setRemoteVideoStreamType(b, a)
              .catch((a) =>
                k.warning(
                  "[".concat(
                    this._clientId,
                    "] auto set remote stream type failed"
                  ),
                  a
                )
              );
          });
          this._highStream &&
            "connecting" === this._highStream.connectionState &&
            this._highStream
              .reconnectPC()
              .then(() => {
                this._lowStream &&
                  "connecting" === this._lowStream.connectionState &&
                  this._lowStream.reconnectPC().catch((a) => {
                    k.error(
                      "[".concat(
                        this._clientId,
                        "] republish low stream error"
                      ),
                      a.toString()
                    );
                    this.emit(O.ERROR, { reason: a });
                  });
              })
              .catch((a) => {
                k.error(
                  "[".concat(this._clientId, "] republish high stream error"),
                  a.toString()
                );
                this.emit(O.ERROR, { reason: a });
              });
          this._userOfflineTimeout = window.setTimeout(() => {
            var a;
            if ("CONNECTED" === this.connectionState) {
              this._userOfflineTimeout = void 0;
              var b = M((a = this._users)).call(a, (a) => !a._trust_in_room_);
              r(b).call(b, (a) => {
                var b;
                k.debug(
                  n(
                    (b = "[".concat(
                      this._clientId,
                      "] user offline timeout, emit user offline "
                    ))
                  ).call(b, a.uid)
                );
                this._handleUserOffline({ uid: a.uid });
              });
            }
          }, 3e3);
          this._streamRemovedTimeout = window.setTimeout(() => {
            var a;
            "CONNECTED" === this.connectionState &&
              ((this._streamRemovedTimeout = void 0),
              r((a = this._users)).call(a, (a) => {
                var b, d, e, f, g;
                a._trust_audio_mute_state_ ||
                  (k.debug(
                    n(
                      (b = "[".concat(
                        this._clientId,
                        "] auto dispatch audio unmute event "
                      ))
                    ).call(b, a.uid)
                  ),
                  this._handleMuteStream(a.uid, "audio", !1));
                a._trust_video_mute_state_ ||
                  (k.debug(
                    n(
                      (d = "[".concat(
                        this._clientId,
                        "] auto dispatch video unmute event "
                      ))
                    ).call(d, a.uid)
                  ),
                  this._handleMuteStream(a.uid, "video", !1));
                a._trust_audio_enabled_state_ ||
                  (k.debug(
                    n(
                      (e = "[".concat(
                        this._clientId,
                        "] auto dispatch enable local audio "
                      ))
                    ).call(e, a.uid)
                  ),
                  this._handleSetStreamLocalEnable("audio", a.uid, !0));
                !a._trust_video_enabled_state_ &&
                  a._video_enabled_ &&
                  (k.debug(
                    n(
                      (f = "[".concat(
                        this._clientId,
                        "] auto dispatch enable local video "
                      ))
                    ).call(f, a.uid)
                  ),
                  this._handleSetStreamLocalEnable("video", a.uid, !0));
                a._trust_stream_added_state_ ||
                  (k.debug(
                    n(
                      (g = "[".concat(
                        this._clientId,
                        "] auto dispatch stream remove "
                      ))
                    ).call(g, a.uid)
                  ),
                  this._handleRemoveStream({ uid: a.uid, uint_id: a._uintid }));
              }));
          }, 1e3);
        }
        g();
      });
      this._gateway.on(Ea.REQUEST_NEW_GATEWAY_LIST, (a, b) => {
        if (!this._joinInfo)
          return b(new m(l.UNEXPECTED_ERROR, "can not recover, no join info"));
        Xh(
          this._joinInfo,
          this._axiosCancelSource.token,
          this._config.httpRetryConfig || Na
        )
          .then((b) => {
            var d;
            this._joinInfo && (this._joinInfo.apResponse = b.gatewayInfo.res);
            a(
              D((d = b.gatewayInfo.gatewayAddrs)).call(d, (a) =>
                "wss://".concat(a)
              )
            );
          })
          .catch(b);
      });
      this._gateway.on(Ea.NETWORK_QUALITY, (a) => {});
      this._gateway.on(Ea.STREAM_TYPE_CHANGE, (a, b) => {
        this.emit(O.STREAM_TYPE_CHANGED, a, b);
        t.reportApiInvoke(this._sessionId, {
          name: A.STREAM_TYPE_CHANGE,
          options: [a, b],
          tag: z.TRACER
        }).onSuccess(w({ uid: a, streamType: b }));
      });
      this._gateway.on(Ea.IS_P2P_DISCONNECTED, (a) => {
        var b, d, e;
        let f = [];
        return (
          this._highStream && f.push(this._highStream),
          r((b = this._remoteStream)).call(b, (a) => f.push(a)),
          0 === f.length ||
          0 === M(f).call(f, (a) => "connected" === a.connectionState).length
            ? a(!0)
            : (k.debug(
                n((d = "[".concat(this._clientId, "] "))).call(
                  d,
                  D(
                    (e = M(f).call(f, (a) => "connected" === a.connectionState))
                  ).call(e, (a) => a.connectionId),
                  " is connected"
                )
              ),
              void a(!1))
        );
      });
      this._gateway.on(Ea.NEED_RENEW_SESSION, () => {
        this._renewSession();
      });
      this._gateway.signal.on(X.ON_USER_ONLINE, this._handleUserOnline);
      this._gateway.signal.on(X.ON_USER_OFFLINE, this._handleUserOffline);
      this._gateway.signal.on(X.ON_ADD_AUDIO_STREAM, (a) =>
        this._handleAddAudioOrVideoStream("audio", a.uid, a.uint_id)
      );
      this._gateway.signal.on(X.ON_ADD_VIDEO_STREAM, (a) =>
        this._handleAddAudioOrVideoStream("video", a.uid, a.uint_id)
      );
      this._gateway.signal.on(X.ON_REMOVE_STREAM, this._handleRemoveStream);
      this._gateway.signal.on(X.ON_P2P_LOST, this._handleP2PLost);
      this._gateway.signal.on(X.MUTE_AUDIO, (a) =>
        this._handleMuteStream(a.uid, "audio", !0)
      );
      this._gateway.signal.on(X.UNMUTE_AUDIO, (a) =>
        this._handleMuteStream(a.uid, "audio", !1)
      );
      this._gateway.signal.on(X.MUTE_VIDEO, (a) =>
        this._handleMuteStream(a.uid, "video", !0)
      );
      this._gateway.signal.on(X.UNMUTE_VIDEO, (a) =>
        this._handleMuteStream(a.uid, "video", !1)
      );
      this._gateway.signal.on(X.RECEIVE_METADATA, (a) => {
        {
          var b = window.atob(a.metadata);
          let d = new Uint8Array(new ArrayBuffer(b.length));
          for (let a = 0; a < b.length; a += 1) d[a] = b.charCodeAt(a);
          b = d;
        }
        this.emit(O.RECEIVE_METADATA, a.uid, b);
      });
      this._gateway.signal.on(X.ON_CRYPT_ERROR, () => {
        cd(() => {
          k.warning("[".concat(this._clientId, "] on crypt error"));
          this.emit(O.CRYPT_ERROR);
        }, this._sessionId);
      });
      this._gateway.signal.on(
        X.ON_TOKEN_PRIVILEGE_WILL_EXPIRE,
        this._handleTokenWillExpire
      );
      this._gateway.signal.on(X.ON_TOKEN_PRIVILEGE_DID_EXPIRE, () => {
        k.warning(
          "[".concat(
            this._clientId,
            "] received message onTokenPrivilegeDidExpire, please get new token and join again"
          )
        );
        this._reset();
        this._gateway.leave(!0);
        this.emit(O.ON_TOKEN_PRIVILEGE_DID_EXPIRE);
      });
      this._gateway.signal.on(X.ON_STREAM_FALLBACK_UPDATE, (a) => {
        var b, d;
        k.debug(
          n(
            (b = n(
              (d = "[".concat(this._clientId, "] stream fallback peerId: "))
            ).call(d, a.stream_id, ", attr: "))
          ).call(b, a.stream_type)
        );
        this.emit(
          O.STREAM_FALLBACK,
          a.stream_id,
          1 === a.stream_type ? "fallback" : "recover"
        );
      });
      this._gateway.signal.on(X.ENABLE_LOCAL_VIDEO, (a) => {
        this._handleSetStreamLocalEnable("video", a.uid, !0);
      });
      this._gateway.signal.on(X.DISABLE_LOCAL_VIDEO, (a) => {
        this._handleSetStreamLocalEnable("video", a.uid, !1);
      });
      this._gateway.signal.onRequestTimeout = (a, b) => {
        if (this._joinInfo)
          switch (a) {
            case ha.PUBLISH:
              var d;
              if (!b) break;
              a = "high" === b.stream_type ? this._highStream : this._lowStream;
              if (!a) break;
              "offer" === b.state &&
                t.publish(this._joinInfo.sid, {
                  lts: a.startTime,
                  succ: !1,
                  ec: l.TIMEOUT,
                  audio: b.audio,
                  video: b.video,
                  p2pid: b.p2p_id,
                  publishRequestid: a.ID,
                  screenshare: !(
                    !a.videoTrack ||
                    -1 === E((d = a.videoTrack._hints)).call(d, ib.SCREEN_TRACK)
                  ),
                  audioName: a.audioTrack && a.audioTrack.getTrackLabel(),
                  videoName: a.videoTrack && a.videoTrack.getTrackLabel()
                });
              break;
            case ha.SUBSCRIBE:
              (d = this._remoteStream.get(b.stream_id)) &&
                b &&
                t.subscribe(this._joinInfo.sid, {
                  lts: d.startTime,
                  succ: !1,
                  ec: l.TIMEOUT,
                  audio: !!b.audio,
                  video: !!b.video,
                  peerid: b.stream_id,
                  subscribeRequestid: d.ID,
                  p2pid: d.pc.ID
                });
          }
      };
    }
  }
  class Yp extends Ok {
    constructor(a, b = {}) {
      super();
      this.currentLoopCount =
        this.pausePlayTime =
        this.startPlayOffset =
        this.startPlayTime =
          0;
      this._currentState = "stopped";
      this.audioBuffer = a;
      this.options = b;
      this.startPlayOffset = this.options.startPlayTime || 0;
    }
    set currentState(a) {
      a !== this._currentState &&
        ((this._currentState = a),
        this.emit(gb.AUDIO_SOURCE_STATE_CHANGE, this._currentState));
    }
    get currentState() {
      return this._currentState;
    }
    createWebAudioDiagram() {
      return this.context.createGain();
    }
    get duration() {
      return this.audioBuffer.duration;
    }
    get currentTime() {
      return "stopped" === this.currentState
        ? 0
        : "paused" === this.currentState
        ? this.pausePlayTime
        : (this.context.currentTime -
            this.startPlayTime +
            this.startPlayOffset) %
          this.audioBuffer.duration;
    }
    updateOptions(a) {
      "stopped" === this.currentState
        ? ((this.options = a),
          (this.startPlayOffset = this.options.startPlayTime || 0))
        : k.warning("can not set audio source options");
    }
    startProcessAudioBuffer() {
      this.sourceNode && this.stopProcessAudioBuffer();
      this.sourceNode = this.createSourceNode();
      this.startSourceNode();
      this.currentState = "playing";
    }
    pauseProcessAudioBuffer() {
      this.sourceNode &&
        "playing" === this.currentState &&
        ((this.pausePlayTime = this.currentTime),
        (this.sourceNode.onended = null),
        this.sourceNode.stop(),
        (this.sourceNode.buffer = null),
        (this.sourceNode = this.createSourceNode()),
        (this.currentState = "paused"));
    }
    seekAudioBuffer(a) {
      this.sourceNode &&
        ((this.sourceNode.onended = null),
        "playing" === this.currentState && this.sourceNode.stop(),
        (this.sourceNode = this.createSourceNode()),
        "playing" === this.currentState
          ? ((this.startPlayOffset = a), this.startSourceNode())
          : "paused" === this.currentState && (this.pausePlayTime = a));
    }
    resumeProcessAudioBuffer() {
      "paused" === this.currentState &&
        this.sourceNode &&
        ((this.startPlayOffset = this.pausePlayTime),
        (this.pausePlayTime = 0),
        this.startSourceNode(),
        (this.currentState = "playing"));
    }
    stopProcessAudioBuffer() {
      if (this.sourceNode) {
        this.sourceNode.onended = null;
        try {
          this.sourceNode.stop();
        } catch (a) {}
        this.reset();
      }
    }
    startSourceNode() {
      var a;
      this.sourceNode &&
        this.sourceNode.buffer &&
        (this.sourceNode.start(0, this.startPlayOffset),
        (this.startPlayTime = this.context.currentTime),
        (this.sourceNode.onended = ya((a = this.handleSourceNodeEnded)).call(
          a,
          this
        )));
    }
    createSourceNode() {
      let a = this.context.createBufferSource();
      return (
        (a.buffer = this.audioBuffer),
        (a.loop = !!this.options.loop),
        a.connect(this.outputNode),
        a
      );
    }
    handleSourceNodeEnded() {
      if (
        ((this.currentLoopCount += 1),
        this.options.cycle && this.options.cycle > this.currentLoopCount)
      )
        return (
          (this.startPlayOffset = 0),
          (this.sourceNode = void 0),
          void this.startProcessAudioBuffer()
        );
      this.reset();
    }
    reset() {
      this.startPlayOffset = this.options.startPlayTime || 0;
      this.currentState = "stopped";
      this.sourceNode &&
        (this.sourceNode.disconnect(), (this.sourceNode = void 0));
      this.currentLoopCount = 0;
    }
  }
  let mi = new Y();
  var Zp = fa.setInterval;
  let hl = va().name;
  vc(
    "PROCESS_ID",
    (function () {
      var a, b, d, e;
      return n(
        (a = n(
          (b = n(
            (d = n((e = "process-".concat(na(8, ""), "-"))).call(
              e,
              na(4, ""),
              "-"
            ))
          ).call(d, na(4, ""), "-"))
        ).call(b, na(4, ""), "-"))
      ).call(a, na(12, ""));
    })()
  );
  (function () {
    let a = va();
    ea.getDisplayMedia = !(
      !navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia
    );
    ea.getStreamFromExtension = a.name === da.CHROME && 34 < Number(a.version);
    if (
      window.RTCRtpTransceiver &&
      "currentDirection" in RTCRtpTransceiver.prototype
    ) {
      var b = new RTCPeerConnection();
      var d = !1;
      try {
        b.addTransceiver("audio"), (d = !0);
      } catch (e) {}
      b = (b.close(), d);
    } else b = !1;
    ea.supportUnifiedPlan = b;
    ea.supportMinBitrate = a.name === da.CHROME || a.name === da.EDGE;
    b = va();
    b =
      !!(
        window.RTCRtpSender &&
        window.RTCRtpSender.prototype.setParameters &&
        window.RTCRtpSender.prototype.getParameters
      ) &&
      (!!Te() ||
        b.name === da.SAFARI ||
        (b.name === da.FIREFOX && 64 <= Number(b.version)));
    ea.supportSetRtpSenderParameters = b;
    (a.name !== da.SAFARI && va().name !== da.WECHAT) ||
      (ea.supportDualStream = !1);
    b = va();
    b.name === da.SAFARI && 12 > Number(b.version)
      ? (b = !1)
      : ((b = yc()),
        (b = b.createMediaStreamDestination
          ? !!b.createMediaStreamDestination().stream
          : !1));
    ea.webAudioMediaStreamDest = b;
    ea.supportReplaceTrack =
      !!window.RTCRtpSender &&
      "function" == typeof RTCRtpSender.prototype.replaceTrack;
    ea.supportWebGL = "undefined" != typeof WebGLRenderingContext;
    ea.supportRequestFrame = !!window.CanvasCaptureMediaStreamTrack;
    Te() || (ea.webAudioWithAEC = !0);
    b = va();
    b =
      (b.os === aa.WIN_10 ||
        b.os === aa.WIN_81 ||
        b.os === aa.WIN_7 ||
        b.os === aa.LINUX ||
        b.os === aa.MAC_OS ||
        b.os === aa.MAC_OS_X) &&
      b.name === da.CHROME &&
      74 <= Number(b.version);
    ea.supportShareAudio = b;
    k.info("browser compatibility", w(ea), w(a));
  })();
  let vb = {
    VERSION: $a,
    BUILD: "v4.1.0-0-g64d4440(9/4/2020, 5:57:23 PM)",
    setParameter: vc,
    getSupportedCodec: async function (a) {
      let b = null;
      a ? ((b = new Xk({})), b.addStream(a)) : (b = new Yk({}));
      {
        a = await b.createOfferSDP();
        let d = { video: [], audio: [] };
        a =
          (a.match(/ VP8/i) && d.video.push("VP8"),
          a.match(/ H264/i) && d.video.push("H264"),
          a.match(/ opus/i) && d.audio.push("OPUS"),
          d);
      }
      return b.close(), a;
    },
    checkSystemRequirements: function () {
      let a = t.reportApiInvoke(null, {
        name: A.CHECK_SYSTEM_REQUIREMENTS,
        options: [],
        tag: z.TRACER
      });
      var b = navigator.mediaDevices && navigator.mediaDevices.getUserMedia,
        d = window.WebSocket;
      b = window.RTCPeerConnection && b && d;
      d = !1;
      let e = va();
      e.name === da.CHROME &&
        58 <= Number(e.version) &&
        e.os !== aa.IOS &&
        (d = !0);
      e.name === da.FIREFOX && 56 <= Number(e.version) && (d = !0);
      e.name === da.OPERA && 45 <= Number(e.version) && (d = !0);
      e.name === da.SAFARI && 11 <= Number(e.version) && (d = !0);
      (va().name !== da.WECHAT && va().name !== da.QQ) ||
        e.os === aa.IOS ||
        (d = !0);
      k.debug("checkSystemRequirements, api:", b, "browser", d);
      b = b && d;
      return a.onSuccess(b), b;
    },
    getDevices: function (a) {
      return ub.enumerateDevices(!0, !0, a);
    },
    getMicrophones: function (a) {
      return ub.getRecordingDevices(a);
    },
    getCameras: function (a) {
      return ub.getCamerasDevices(a);
    },
    getElectronScreenSources: Lh,
    getPlaybackDevices: function (a) {
      return ub.getSpeakers(a);
    },
    createClient: function (a = { codec: "vp8", mode: "rtc" }) {
      let b = t.reportApiInvoke(null, {
        name: A.CREATE_CLIENT,
        options: [a],
        tag: z.TRACER
      });
      try {
        Xa(a.codec, "config.codec", ["vp8", "h264"]),
          Xa(a.mode, "config.mode", ["rtc", "live"]),
          void 0 !== a.proxyServer &&
            Ga(a.proxyServer, "config.proxyServer", 1, 1e4),
          void 0 !== a.turnServer && Ah(a.turnServer),
          void 0 !== a.httpRetryConfig && zh(a.httpRetryConfig),
          void 0 !== a.websocketRetryConfig && zh(a.websocketRetryConfig);
      } catch (d) {
        throw (b.onError(d), d);
      }
      return (
        b.onSuccess(),
        new Xp(
          Bc({ forceWaitGatewayResponse: !0 }, a, {
            role: "rtc" === a.mode ? "host" : a.role
          })
        )
      );
    },
    createCameraVideoTrack: async function (a = {}) {
      let b = t.reportApiInvoke(null, {
          tag: z.TRACER,
          name: A.CREATE_CAM_VIDEO_TRACK,
          options: [lf({}, a)]
        }),
        d = gf(a);
      var e = na(8, "track-");
      let f = null;
      k.info("start create camera video track with config", w(a), "trackId", e);
      try {
        f = (await Bb({ video: d }, e)).getVideoTracks()[0] || null;
      } catch (g) {
        throw (b.onError(g), g);
      }
      if (!f)
        return (
          (e = new m(l.UNEXPECTED_ERROR, "can not find track in media stream")),
          b.onError(e),
          e.throw()
        );
      a.optimizationMode && mf(e, f, a, a.encoderConfig && uc(a.encoderConfig));
      a = new el(f, a, d, a.optimizationMode, e);
      return (
        b.onSuccess(a.getTrackId()),
        k.info("create camera video success, trackId:", e),
        a
      );
    },
    createCustomVideoTrack: function (a) {
      let b = t.reportApiInvoke(null, {
          tag: z.TRACER,
          name: A.CREATE_CUSTOM_VIDEO_TRACK,
          options: [a]
        }),
        d = new bb(
          a.mediaStreamTrack,
          { bitrateMax: a.bitrateMax, bitrateMin: a.bitrateMin },
          a.optimizationMode
        );
      return (
        b.onSuccess(d.getTrackId()),
        k.info(
          "create custom video track success with config",
          a,
          "trackId",
          d.getTrackId()
        ),
        d
      );
    },
    createScreenVideoTrack: async function (a = {}, b = "disable") {
      let d = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.CREATE_SCREEN_VIDEO_TRACK,
        options: [lf({}, a), b]
      });
      a.encoderConfig
        ? "string" == typeof a.encoderConfig ||
          (a.encoderConfig.width && a.encoderConfig.height) ||
          ((a.encoderConfig.width = { max: 1920 }),
          (a.encoderConfig.height = { max: 1080 }))
        : (a.encoderConfig = "1080p_2");
      var e = {};
      a.screenSourceType && (e.mediaSource = a.screenSourceType);
      a.extensionId && Xc() && (e.extensionId = a.extensionId);
      a.electronScreenSourceId && (e.sourceId = a.electronScreenSourceId);
      var f = a.encoderConfig ? Fe(a.encoderConfig) : null;
      f =
        ((e.mandatory = {
          chromeMediaSource: "desktop",
          maxWidth: f ? f.width : void 0,
          maxHeight: f ? f.height : void 0
        }),
        f &&
          f.frameRate &&
          ("number" == typeof f.frameRate
            ? ((e.mandatory.maxFrameRate = f.frameRate),
              (e.mandatory.minFrameRate = f.frameRate))
            : ((e.mandatory.maxFrameRate =
                f.frameRate.max ||
                f.frameRate.ideal ||
                f.frameRate.exact ||
                void 0),
              (e.mandatory.minFrameRate =
                f.frameRate.min ||
                f.frameRate.ideal ||
                f.frameRate.exact ||
                void 0)),
          (e.frameRate = f.frameRate)),
        f && f.width && (e.width = f.width),
        f && f.height && (e.height = f.height),
        e);
      let g = na(8, "track-"),
        h = null;
      e = null;
      let n = ea;
      if (!n.supportShareAudio && "enable" === b)
        return (
          (a = new m(
            l.NOT_SUPPORT,
            "your browser or platform is not support share-screen with audio"
          )),
          d.onError(a),
          a.throw()
        );
      k.info(
        "start create screen video track with config",
        a,
        "withAudio",
        b,
        "trackId",
        g
      );
      try {
        let a = await Bb(
          {
            screen: f,
            screenAudio: "auto" === b ? n.supportShareAudio : "enable" === b
          },
          g
        );
        h = a.getVideoTracks()[0] || null;
        e = a.getAudioTracks()[0] || null;
      } catch (y) {
        throw (d.onError(y), y);
      }
      if (!h)
        return (
          (a = new m(l.UNEXPECTED_ERROR, "can not find track in media stream")),
          d.onError(a),
          a.throw()
        );
      if (!e && "enable" === b)
        return (
          h && h.stop(),
          (a = new m(l.SHARE_AUDIO_NOT_ALLOWED)),
          d.onError(a),
          a.throw()
        );
      a.optimizationMode || (a.optimizationMode = "detail");
      a.optimizationMode &&
        (mf(g, h, a, a.encoderConfig && Fe(a.encoderConfig)),
        a.encoderConfig &&
          "string" != typeof a.encoderConfig &&
          (a.encoderConfig.bitrateMin = a.encoderConfig.bitrateMax));
      a = new bb(
        h,
        a.encoderConfig ? Fe(a.encoderConfig) : {},
        a.optimizationMode,
        g
      );
      if ((a._hints.push(ib.SCREEN_TRACK), !e))
        return (
          d.onSuccess(a.getTrackId()),
          k.info("create screen video track success", "video:", a.getTrackId()),
          a
        );
      b = new Va(e);
      return (
        d.onSuccess([a.getTrackId(), b.getTrackId()]),
        k.info(
          "create screen video track success",
          "video:",
          a.getTrackId(),
          "audio:",
          b.getTrackId()
        ),
        [a, b]
      );
    },
    createMicrophoneAndCameraTracks: async function (a = {}, b = {}) {
      var d, e, f;
      let g = t.reportApiInvoke(null, {
          tag: z.TRACER,
          name: A.CREATE_MIC_AND_CAM_TRACKS,
          options: [a, b]
        }),
        h = gf(b),
        q = ci(a),
        p = na(8, "track-"),
        r = na(8, "track-"),
        u = null,
        v = null;
      k.info(
        n(
          (d = n(
            (e = n(
              (f = "start create camera video track(".concat(
                r,
                ") and microphone audio track("
              ))
            ).call(f, p, ") with config, audio: "))
          ).call(e, w(a), ", video: "))
        ).call(d, w(b))
      );
      try {
        var C;
        let a = await Bb(
          { audio: q, video: h },
          n((C = "".concat(p, "-"))).call(C, r)
        );
        u = a.getAudioTracks()[0];
        v = a.getVideoTracks()[0];
      } catch (bc) {
        throw (g.onError(bc), bc);
      }
      if (!u || !v) {
        var B = new m(
          l.UNEXPECTED_ERROR,
          "can not find tracks in media stream"
        );
        return g.onError(B), B.throw();
      }
      b.optimizationMode && mf(r, v, b, b.encoderConfig && uc(b.encoderConfig));
      a = new rg(u, a, q, p);
      b = new el(v, b, h, b.optimizationMode, r);
      return (
        g.onSuccess([a.getTrackId(), b.getTrackId()]),
        k.info(
          n(
            (B = "create camera video track(".concat(
              r,
              ") and microphone audio track("
            ))
          ).call(B, p, ") success")
        ),
        [a, b]
      );
    },
    createMicrophoneAudioTrack: async function (a = {}) {
      let b = t.reportApiInvoke(null, {
          tag: z.TRACER,
          name: A.CREATE_MIC_AUDIO_TRACK,
          options: [a]
        }),
        d = ci(a);
      var e = na(8, "track-");
      let f = null;
      k.info(
        "start create microphone audio track with config",
        w(a),
        "trackId",
        e
      );
      try {
        f = (await Bb({ audio: d }, e)).getAudioTracks()[0] || null;
      } catch (g) {
        throw (b.onError(g), g);
      }
      if (!f)
        return (
          (e = new m(l.UNEXPECTED_ERROR, "can not find track in media stream")),
          b.onError(e),
          e.throw()
        );
      a = new rg(f, a, d, e);
      return (
        b.onSuccess(a.getTrackId()),
        k.info("create microphone audio track success, trackId:", e),
        a
      );
    },
    createCustomAudioTrack: function (a) {
      let b = t.reportApiInvoke(null, {
          tag: z.TRACER,
          name: A.CREATE_CUSTOM_AUDIO_TRACK,
          options: [a]
        }),
        d = new Va(
          a.mediaStreamTrack,
          a.encoderConfig ? Ed(a.encoderConfig) : {}
        );
      return (
        k.info(
          "create custom audio track success with config",
          a,
          "trackId",
          d.getTrackId()
        ),
        b.onSuccess(d.getTrackId()),
        d
      );
    },
    createBufferSourceAudioTrack: async function (a) {
      let b = t.reportApiInvoke(null, {
          tag: z.TRACER,
          name: A.CREATE_BUFFER_AUDIO_TRACK,
          options: [a]
        }),
        d = na(8, "track-");
      k.info(
        "start create buffer source audio track with config",
        w(a),
        "trackId",
        d
      );
      let e = a.source;
      if (!(a.source instanceof AudioBuffer))
        try {
          a.source = await nm(a.source, a.cacheOnlineFile);
        } catch (g) {
          return b.onError(g), g.throw();
        }
      let f = new Yp(a.source);
      a = new vp(e, f, a.encoderConfig ? Ed(a.encoderConfig) : {}, d);
      return (
        k.info("create buffer source audio track success, trackId:", d),
        b.onSuccess(a.getTrackId()),
        a
      );
    },
    setLogLevel: function (a) {
      k.setLogLevel(a);
    },
    enableLogUpload: function () {
      k.enableLogUpload();
    },
    disableLogUpload: function () {
      k.disableLogUpload();
    },
    createChannelMediaRelayConfiguration: function () {
      return new ki();
    },
    checkAudioTrackIsActive: async function (a, b = 5e3) {
      let d = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.CHECK_AUDIO_TRACK_IS_ACTIVE,
        options: [b]
      });
      if (!(a instanceof Va || a instanceof zd)) {
        var e = new m(l.INVALID_TRACK, "the parameter is not a audio track");
        return d.onError(e), e.throw();
      }
      b && 1e3 > b && (b = 1e3);
      let f = a instanceof Va ? a.getTrackLabel() : "remote_track",
        g = (e = a.getVolumeLevel()),
        h = e,
        p = v();
      return new u((e) => {
        let l = Zp(() => {
          var m = a.getVolumeLevel();
          g = m > g ? m : g;
          h = m < h ? m : h;
          m = 1e-4 < g - h;
          var q = v() - p;
          if (m || q > b) {
            var r;
            clearInterval(l);
            q = { duration: q, deviceLabel: f, maxVolumeLevel: g, result: m };
            k.info(
              n(
                (r = "[track-".concat(
                  a.getTrackId(),
                  "] check audio track active completed. "
                ))
              ).call(r, w(q))
            );
            d.onSuccess(q);
            e(m);
          }
        }, 200);
      });
    },
    checkVideoTrackIsActive: async function (a, b = 5e3) {
      var d;
      let e = t.reportApiInvoke(null, {
        tag: z.TRACER,
        name: A.CHECK_VIDEO_TRACK_IS_ACTIVE,
        options: [b]
      });
      if (!(a instanceof bb || a instanceof yd))
        return (
          (a = new m(l.INVALID_TRACK, "the parameter is not a video track")),
          e.onError(a),
          a.throw()
        );
      b && 1e3 > b && (b = 1e3);
      var f = a instanceof bb ? a.getTrackLabel() : "remote_track",
        g = a.getMediaStreamTrack();
      let h = document.createElement("video");
      h.style.width = "1px";
      h.style.height = "1px";
      h.setAttribute("muted", "");
      h.muted = !0;
      h.setAttribute("playsinline", "");
      h.controls = !1;
      hl === da.SAFARI &&
        ((h.style.opacity = "0.01"),
        (h.style.position = "fixed"),
        (h.style.left = "0"),
        (h.style.top = "0"),
        document.body.appendChild(h));
      h.srcObject = new MediaStream([g]);
      h.play();
      let p = document.createElement("canvas");
      p.width = 160;
      p.height = 120;
      let r = (g = 0);
      try {
        let a = v();
        g = await om(h, b, p, 4);
        r = v() - a;
      } catch (T) {
        throw (e.onError(T), T);
      }
      hl === da.SAFARI && (h.pause(), h.remove());
      h.srcObject = null;
      b = 4 < g;
      f = { duration: r, changedPicNum: g, deviceLabel: f, result: b };
      return (
        k.info(
          n(
            (d = "[track-".concat(
              a.getTrackId(),
              "] check video track active completed. "
            ))
          ).call(d, w(f))
        ),
        e.onSuccess(f),
        b
      );
    }
  };
  return (
    ub.on(Rb.CAMERA_DEVICE_CHANGED, (a) => {
      k.info("camera device changed", w(a));
      vb.onCameraChanged && vb.onCameraChanged(a);
    }),
    ub.on(Rb.RECORDING_DEVICE_CHANGED, (a) => {
      k.info("microphone device changed", w(a));
      vb.onMicrophoneChanged && vb.onMicrophoneChanged(a);
    }),
    ub.on(Rb.PLAYOUT_DEVICE_CHANGED, (a) => {
      k.debug("playout device changed", w(a));
      vb.onPlaybackDeviceChanged && vb.onPlaybackDeviceChanged(a);
    }),
    (jb.onAutoplayFailed = () => {
      k.info("detect audio element autoplay failed");
      vb.onAudioAutoplayFailed && vb.onAudioAutoplayFailed();
    }),
    wd.on("autoplay-failed", () => {
      k.info("detect webaudio autoplay failed");
      vb.onAudioAutoplayFailed && vb.onAudioAutoplayFailed();
    }),
    vb
  );
});
//# sourceMappingURL=AgoraRTC_N-production.js.map
