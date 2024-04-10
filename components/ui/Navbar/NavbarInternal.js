import { forwardRef, useEffect, useState, useContext } from "react";
import Image from "next/image";
import NextLink from "next/link";

import { AppBar } from "@mui/material";
import { common } from "@mui/material/colors";
import { createBreakpoints } from "@mui/system";
import { createStyles, makeStyles } from "@mui/styles";
import Stack from "@mui/material/Stack";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import Color from "@/components/styles/color";
import Entrance from "@/components/ui/Entrance";
import { LayoutContext } from "@/components/contexts/LayoutContext";
import useScrollPosition from "@/components/hooks/useScrollPosition";

const breakpoints = createBreakpoints({});

const styles = makeStyles((theme) =>
  createStyles({
    navbar: {
      width: "100%",
      zIndex: 50,
      backgroundColor: "transparent",
      boxShadow: "none",
      color: common.white,
      "&.isScrolling": {
        backdropFilter: "blur(20px)",
        "&.onLightBackground": {
          color: common.black,
          backgroundColor: "rgba(224, 242, 254, 0.85)",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
        },
        "&.onDarkBackground": {
          color: common.white,
          backgroundColor: Color.hex.purple,
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
        }
      }
    },
    flexCenter: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 32px",
      [breakpoints.down("md")]: {
        padding: "12px 16px"
      }
    },
    buttonGap: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: 18
    },
    burgerButton: {
      display: "flex",
      alignItems: "center",
      width: "40px",
      height: "40px",
      padding: 0,
      backgroundColor: "transparent",
      border: 0,
      cursor: "pointer"
    },
    drawerContent: {
      color: common.white,
      width: "90vw",
      padding: theme.spacing(3),
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(3),
      "& > *": {
        [breakpoints.down("md")]: {
          fontSize: "24px !important"
        }
      }
    },
    signInButton: {
      minWidth: theme.spacing(20)
    },
    navMobile: {
      [breakpoints.up("md")]: {
        display: "none"
      }
    },
    navDesktop: {
      [breakpoints.down("md")]: {
        display: "none"
      }
    }
  })
);

const FreeWeekendStorytimesButton = forwardRef(({ href, ...props }, ref) => {
  return (
    <>
      <Stack direction="row" spacing={1}>
        <Image
          src="/static/new-home/free-tag.svg"
          width={30}
          height={30}
          alt="Free Weekend Bilingual Storytimes at Atom"
        />
        <span>Weekend Storytimes</span>
      </Stack>
    </>
  );
});

const NavbarDesktop = () => {
  const classes = styles();
  const { navTheme } = useContext(LayoutContext);

  const logo =
    navTheme === "onLightBackground"
      ? "/static/atom-logo-blue.svg"
      : "/static/logo-atom-white.svg";

  const navLinkColor =
    navTheme === "onLightBackground" ? common.black : common.white;

  return (
    <div className={`${classes.flexCenter} ${classes.navDesktop} ${navTheme}`}>
      <NextLink href="/">
        <img
          className="cursor-pointer"
          width="127"
          height="30"
          src={logo}
          alt="Atom, home of the bilingual superstars"
        />
      </NextLink>
      <Stack direction="row" spacing={2} className={classes.buttonGap}>
        <NextLink sx={{ color: navLinkColor }} href="/story-time">
          <FreeWeekendStorytimesButton />
        </NextLink>
        <NextLink sx={{ color: navLinkColor }} href="/books">
          Multilingual books
        </NextLink>
        <Entrance />
      </Stack>
    </div>
  );
};

const NavbarMobile = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { navTheme } = useContext(LayoutContext);
  const classes = styles();
  const logo =
    navTheme === "onLightBackground"
      ? "/static/atom-logo-blue.svg"
      : "/static/logo-atom-white.svg";

  const burgerIcon =
    navTheme === "onLightBackground"
      ? "/static/new-home/icon/burger-blue.svg"
      : "/static/new-home/icon/burger.svg";

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <div className={`${classes.flexCenter} ${navTheme}`}>
        <button className={classes.burgerButton} onClick={toggleDrawer}>
          <Image src={burgerIcon} width={32} height={32} alt="Atom home" />
        </button>
        <NextLink href="/">
          <img
            width="180"
            height="60"
            src={logo}
            alt="Atom, home of the bilingual superstars"
          />
        </NextLink>
        <div className="ml-auto">{/* <SignInButton /> */}</div>
      </div>
      <SwipeableDrawer
        PaperProps={{
          sx: {
            backgroundColor: Color.hex.purple,
            color: common.white
          }
        }}
        onOpen={toggleDrawer}
        onClose={toggleDrawer}
        anchor="left"
        open={drawerOpen}
      >
        <div className={classes.drawerContent} onClick={toggleDrawer}>
          <button className={classes.burgerButton} onClick={toggleDrawer}>
            <img
              src="/static/new-home/icon/close.svg"
              width={32}
              height={32}
              alt=""
            />
          </button>
          <NextLink href="https://www.calendly.com/atomlive">
            <FreeWeekendStorytimesButton />
          </NextLink>
          <NextLink href="/books">Multilingual Books</NextLink>
          <NextLink href="/sign/in">Sign In</NextLink>
        </div>
      </SwipeableDrawer>
    </>
  );
};

const NavbarInternal = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const { navTheme } = useContext(LayoutContext);
  const scrollPos = useScrollPosition();

  useEffect(() => {
    setIsScrolling(scrollPos > 100);
  }, [scrollPos]);

  const classes = styles({ isScrolling });

  return (
    <AppBar
      className={`${classes.navbar} ${navTheme} ${
        isScrolling ? "isScrolling" : ""
      }`}
      position="fixed"
    >
      {/* <NavbarDesktop /> */}
      <Navbar />
    </AppBar>
  );
};

export default NavbarInternal;
