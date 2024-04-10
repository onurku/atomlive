import { createTheme } from "@mui/material/styles";
import { common, grey, indigo, teal } from "@mui/material/colors";
import Color from "@/components/styles/color";
import shadows from "@/components/styles/shadows";
import typography from "@/components/styles/typography";
import { createBreakpoints } from "@mui/system";
const breakpoints = createBreakpoints({});

const fontWeight400 = {
  fontWeight: 400
};
const fontWeight300 = {
  fontWeight: 300
};
const fontWeight600 = {
  fontWeight: 600
};
const paddingSizeLarge = "12px 32px";
const paddingSizeMed = "12px 24px";
const paddingSizeSmall = "8px 18px";
const disableRipple = {
  disableRipple: true,
  disableTouchRipple: true
};

const monochrome = createTheme({
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl", "xxl"],
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 2200
    }
  },
  // palette: {
  //   type: "light",
  //   primary: {
  //     light: "#757ce8",
  //     main: "#3f50b5",
  //     dark: "#002884",
  //     contrastText: "#fff"
  //   },
  //   secondary: {
  //     light: "#ff7961",
  //     main: "#f44336",
  //     dark: "#ba000d",
  //     contrastText: "#000"
  //   }
  // },
  palette: {
    type: "light",
    primary: {
      main: Color.hex.darkpurple
    },
    secondary: {
      main: Color.hex.red
    },
    text: {
      primary: common.black,
      secondary: grey[800]
    }
  },
  shadows,
  typography,
  props: {
    MuiButton: disableRipple,
    MuiIconButton: disableRipple
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        ...disableRipple
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: `transparent`
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          border: 0,
          color: common.black,
          cursor: "pointer",
          letterSpacing: ".1rem",
          textTransform: "uppercase",
          // padding: paddingSizeMed,
          "&:hover": {
            color: common.black
          }
        },
        contained: {
          cursor: "pointer"
        },
        containedPrimary: {
          backgroundColor: Color.hex.yellow,
          color: Color.hex.navy,
          border: `1px solid ${Color.hex.navy}`,
          cursor: "pointer",
          textDecoration: "none",
          "&:hover": {
            backgroundColor: Color.hex.darkyellow,
            border: `1px solid ${Color.hex.navy}`,
            color: Color.hex.navy
          }
        },
        containedSecondary: {
          backgroundColor: Color.hex.lightpurple,
          border: `1px solid ${Color.hex.darkpurple}`,
          color: Color.hex.darkpurple,
          textDecoration: "none",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: Color.hex.darkpurple,
            color: common.white,
            border: `1px solid ${common.white}`
          }
        },
        outlinedPrimary: {
          backgroundColor: common.white,
          color: Color.hex.darkpurple,
          border: `2px solid ${Color.hex.darkpurple}`,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: Color.hex.lightaqua,
            color: Color.hex.red,
            border: `2px solid ${Color.hex.red}`
          },
          "&:focus": {
            backgroundColor: Color.hex.darkpurple,
            color: common.white,
            border: `1px solid ${common.white}`
          }
        },
        outlinedSecondary: {
          backgroundColor: common.white,
          color: Color.hex.navy,
          border: `2px solid ${Color.hex.navy}`,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: Color.hex.lightaqua,
            border: `2px solid ${Color.hex.navy}`
          },
          "&:focus": {
            backgroundColor: Color.hex.darkpurple,
            color: common.white,
            border: `1px solid ${common.white}`
          }
        },
        textPrimary: {
          backgroundColor: "transparent",
          border: "1px solid transparent",
          color: common.black,
          padding: paddingSizeSmall,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: Color.hex.lightaqua
          }
        },
        textSecondary: {
          backgroundColor: "transparent",
          border: "1px solid transparent",
          color: common.white,
          padding: paddingSizeSmall,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: Color.hex.lightaqua,
            color: common.black
          }
        },
        textSizeLarge: {
          "&:hover": {
            backgroundColor: `transparent`
          }
        },
        containedSizeSmall: {
          padding: paddingSizeSmall
        },
        containedSizeLarge: {
          padding: paddingSizeLarge
        },
        outlinedSizeLarge: {
          padding: paddingSizeLarge
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: Color.ombre.fog
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.MuiInputBase-root.Mui-disabled": {
            background: grey[300],
            color: "rgba(0, 0, 0, 0.8)"
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          color: grey[600]
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: "pointer"
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // borderRadius: 0
        }
      }
    },
    MuiPopoverPaper: {
      styleOverrides: {
        root: {
          // borderRadius: 0
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 0
        }
      }
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: 0
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: `transparent`,
          border: 0
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        filledWarning: {
          backgroundColor: "#efefe8",
          color: common.black
        },
        icon: { color: common.black }
      }
    }
  },
  overrides: {
    MuiIconButton: {
      colorPrimary: {
        backgroundColor: teal["A700"],
        color: `${teal["A700"]} important!`
      },
      colorSecondary: {
        color: `${teal["A700"]} important!`
      }
    },
    // MuiButton: {
    //   root: {
    //     disableElevation: true,
    //     disableRipple: true,
    //     disableTouchRipple: true,
    //     fontSize: "1.2rem"
    //   },
    //   containedPrimary: {
    //     backgroundColor: Color.hex.liberty,
    //     color: Color.hex.purple
    //   },
    //   sizeLarge: {
    //     fontSize: `1.25rem`
    //   },
    //   containedSizeLarge: {
    //     padding: paddingSizeLarge
    //   },
    //   containedSizeSmall: {
    //     padding: paddingSizeSmall
    //   },
    //   containedSecondary: {
    //     backgroundColor: Color.hex.neonyellow,
    //     color: Color.hex.liberty,
    //     "&:hover": {
    //       backgroundColor: indigo[800]
    //     }
    //   },
    //   outlinedPrimary: {
    //     border: `1px solid ${Color.hex.liberty}`,
    //     color: Color.hex.liberty,
    //     "&:hover": {
    //       backgroundColor: grey[800],
    //       color: common.white,
    //       border: `1px solid ${Color.hex.liberty}`
    //     }
    //   },
    //   outlinedSecondary: {
    //     backgroundColor: Color.hex.neonyellow,
    //     color: Color.hex.liberty,
    //     border: `1px solid ${Color.hex.liberty}`
    //   },
    //   outlinedSizeLarge: {
    //     padding: paddingSizeLarge
    //   }
    // },
    MuiCircularProgress: {
      size: 20
    },
    MuiOutlinedInputBase: {
      root: {
        "& $notchedOutline": {
          color: Color.hex.grey
        },
        "&:hover $notchedOutline": {
          color: Color.hex.grey
        },
        "&$focused $notchedOutline": {
          color: Color.hex.grey
        }
      }
    },
    MuiTableCell: {
      root: {
        fontSize: "1rem"
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: "1.2rem"
      }
    }
  }
});

export default monochrome;
