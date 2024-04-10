import "@fontsource/dm-sans";
import "@fontsource/lato";
import { createBreakpoints } from "@mui/system";
const breakpoints = createBreakpoints({});

export default {
  fontFamily: [
    "DM Sans",
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif"
  ].join(","),
  h1: {
    fontWeight: 500,
    letterSpacing: "-0.24px",
    fontSize: "4rem",
    [breakpoints.down("sm")]: {
      fontSize: "2.4rem"
    }
  },
  h2: {
    fontSize: "4.2rem",
    fontWeight: 300,
    letterSpacing: "-0.24px",
    paddingBottom: "0.3em",
    paddingTop: "0.5em",
    fontSize: "3.6rem",
    [breakpoints.down("sm")]: {
      fontSize: "2.2rem"
    }
  },
  h3: {
    fontWeight: 400,
    letterSpacing: "-0.06px",
    fontFamily: "Petrona",
    fontSize: "3.2rem",
    [breakpoints.down("sm")]: {
      fontSize: "2rem"
    }
  },
  h4: {
    fontWeight: 400,
    letterSpacing: "-0.06px",
    fontFamily: "Lato",
    [breakpoints.down("sm")]: {
      fontSize: "1.8rem"
    }
  },
  h5: {
    fontWeight: 400,
    [breakpoints.down("sm")]: {
      fontSize: "1.6rem"
    }
  },
  h6: {
    fontWeight: 400,
    [breakpoints.down("sm")]: {
      fontSize: "1.2rem"
    }
  },
  body1: {
    [breakpoints.down("sm")]: {
      fontSize: "1.2rem"
    }
  },
  subtitle: {},
  subtitle2: {},
  overline: {
    fontWeight: 700
  }
};
