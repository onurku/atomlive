const Color = {
  hex: {
    aqua: "#8FD4D9",
    aquagrey: "#6c8387",
    atomic: "#f7996e",
    beige: "#efeae6",
    berry: "#844985",
    blue: "#234fdf",
    brightblue: "#21a8ff",
    brightgrape: "#7b2cbf",
    brightgreen: "#82f6a8",
    brightlavender: "#d596e6",
    brightviolet: "#9d4edd",
    brightliberty: "#240046",
    brightpink: "#fb76bf",
    brightpurple: "#ba53df",
    brightyellow: "#fefdad",
    canary: "#f9f3e3",
    chalk: "#f9f9f9",
    darkpurple: "#2F1E61",
    darksalmon: "#E4BF93",
    darkyellow: "#E29E21",
    fuchsia: "#da9b9d",
    liberty: "#231942",
    lightaqua: "#b8e5e8",
    lightblue: "#89A2DA",
    lightgrey: "#f0f0f0",
    lightgreen: "#a3f1bd",
    lightorange: "#ba8b53",
    lightnavy: "#0c4a6e",
    lightpink: "#fdc6e1",
    lightpurple: "#B699DE",
    lightyellow: "#fdf9d1",
    medblue: "#b3c8e9",
    mednavy: "#082f49",
    medpurple: "#B699DE",
    grape: "#9F86C0",
    green: "#6BCA6F",
    grey: "#2a2a39",
    greyblue: "#545677",
    lavender: "#c9a3cc",
    natural: "#e4d4c7",
    navy: "#1E3873",
    neonyellow: "#edf67d",
    orange: "#FF8B00",
    yellow: "#F5D05A",
    rose: "#E0B1CB",
    pink: "#fcced1",
    purple: "#551FAE",
    red: "#BD372A",
    salmon: "#ffcac2",
    tangerine: "#f8a27b"
  },
  hsl: {
    blue: "hsla(221, 37%, 45%, 1)",
    liberty: "hsla(240, 35%, 46%, 1)",
    grape: "hsla(158,102,191, 1)",
    purple: "hsla(294, 44%, 33%, 1)",
    berry: "hsla(299, 29%, 40%, 1)",
    fuchsia: "hsla(299, 29%, 40%, 1)",
    lavender: "hsla(337, 28%, 56%, 1)",
    rose: "hsla(358, 39%, 64%, 1)",
    atomic: "hsla(19, 90%, 70%, 1)",
    tangerine: "hsla(19, 90%, 70%, 1)",
    salmon: "hsla(18, 90%, 75%, 1)"
  },
  rgb: {
    blue: "rgba(14, 165, 233, 0.85)",
    liberty: "rgba(76, 76, 157, 1)",
    grape: "rgba(158,102,191, 1)",
    purple: "rgba(113, 47, 121, 1)",
    berry: "rgba(132, 73, 133, 1)",
    fuchsia: "rgba(151, 99, 145, 1)",
    lavender: "rgba(175, 113, 137, 1)",
    rose: "rgba(199, 126, 128, 1)",
    atomic: "rgba(247, 153, 110, 1)",
    tangerine: "rgba(248, 162, 123, 1)",
    salmon: "rgba(249, 170, 135, 1)"
  },
  gradient: {
    top: "linear-gradient(0deg, #48639cff, #4c4c9dff, #9e66bf, #712f79ff, #844985ff, #976391ff, #c77e80ff, #f7996eff, #f8a27bff, #f9aa87ff)",
    right:
      "linear-gradient(90deg, #48639cff, #4c4c9dff, #9e66bf, #712f79ff, #844985ff, #976391ff, #c77e80ff, #f7996eff, #f8a27bff, #f9aa87ff)",
    bottom:
      "linear-gradient(180deg, #48639cff, #4c4c9dff, #9e66bf, #712f79ff, #844985ff, #976391ff, #c77e80ff, #f7996eff, #f8a27bff, #f9aa87ff)",
    left: "linear-gradient(270deg, #48639cff, #4c4c9dff, #9e66bf, #712f79ff, #844985ff, #976391ff, #c77e80ff, #f7996eff, #f8a27bff, #f9aa87ff)",
    "top-right":
      "linear-gradient(45deg, #48639cff, #4c4c9dff, #9e66bf, #712f79ff, #844985ff, #976391ff, #c77e80ff, #f7996eff, #f8a27bff, #f9aa87ff)",
    "bottom-right":
      "linear-gradient(135deg, #48639cff, #4c4c9dff, #9e66bf, #712f79ff, #844985ff, #976391ff, #c77e80ff, #f7996eff, #f8a27bff, #f9aa87ff)",
    "top-left":
      "linear-gradient(225deg, #48639cff, #4c4c9dff, #9e66bf, #712f79ff, #844985ff, #976391ff, #c77e80ff, #f7996eff, #f8a27bff, #f9aa87ff)",
    "bottom-left":
      "linear-gradient(315deg, #48639cff, #4c4c9dff, #9e66bf, #712f79ff, #844985ff, #976391ff, #c77e80ff, #f7996eff, #f8a27bff, #f9aa87ff)",
    radial:
      "radial-gradient(#48639cff, #4c4c9dff, #9e66bf, #712f79ff, #844985ff, #976391ff, #c77e80ff, #f7996eff, #f8a27bff, #f9aa87ff)"
  },
  ombre: {
    beige: "linear-gradient(45deg, #fffff2, #f5f1ed)",
    natural: "linear-gradient(#f5f1eb, #ebeef5)",
    blue: "linear-gradient(90deg,  #47a9ff,#8356ff)",
    blueyellow: "linear-gradient(180deg, #cad7ec 0%, #FFEFC5 100%)",
    grey: `-webkit-radial-gradient(center, circle cover,  #333333 0%, #202124 100%)`,
    sunset:
      "linear-gradient(90deg, rgba(249, 170, 135, 0.6), rgba(113, 47, 121, 0.6))",
    horizon:
      "linear-gradient(45deg, rgba(72, 99, 156, 0.6), rgba(158,102,191, 0.6))",
    fog: "linear-gradient(#ffffff, #fff7f2)",
    liberty: `linear-gradient(90deg,#231942,#3c096c,#7b2cbf)`,
    passion: "linear-gradient(180deg, rgba(252, 210, 204, 1), #a863dc)",
    peach: "linear-gradient( 45deg , #dfd2dd , #f5a8a6 , #f7bea8 )",
    purple: `linear-gradient(90deg,#240046,#231942,#8356ff)`,
    pink: "linear-gradient(180deg, #F9C0D9 0%, #FFEFC5 100%)",
    lightpink: `-webkit-radial-gradient(center, circle cover, #9e66bf 0%, #976391ff 100%)`,
    tangerine: `-webkit-radial-gradient(center, circle cover, #ffccbc 0%, #ffcdd2 100%)`,
    reflection:
      "linear-gradient(45deg, rgba(255, 247, 242, 1), rgba(155, 178, 236, 0.3))",
    violet: "linear-gradient(45deg,  #231942, #5E548E, #9F86C0)"
  }
};

export default Color;
