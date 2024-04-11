import { useEffect, useState, useContext } from "react";
import Image from "next/legacy/image";
import Link from "next/link";

import { AppBar } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { makeStyles } from "@mui/styles";
import BrowseBooksButton from "../components/BrowseBooksButton";
import { Button } from "../components/Button";
import SignInButton from "../components/SignInButton";
import { LayoutContext } from "../context/LayoutContext";
import useScrollPosition from "../hooks/useScrollPosition";

const useStyles = makeStyles({
  navbar: {
    width: "100%",
    zIndex: 50,
    backgroundColor: "transparent",
    boxShadow: "none",
    color: "#09090b",
    "&.isScrolling": {
      backdropFilter: "blur(20px)",
      "&.onLightBackground": {
        backgroundColor: "rgba(224, 242, 254, 0.85)",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
      },
      "&.onDarkBackground": {
        backgroundColor: "rgba(14, 165, 233, 0.85)",
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
    "@media (max-width: 768px)": {
      padding: "12px 16px"
    }
  },
  buttonGap: {
    display: "flex",
    alignItems: "center",
    gap: 24,
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
    width: "80vw",
    padding: "24px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    "& > *": {
      "@media (max-width: 768px)": {
        fontSize: "24px !important"
      }
    }
  },
  signInButton: {
    minWidth: "160px"
  },
  navMobile: {
    "@media (min-width: 768px)": {
      display: "none"
    }
  },
  navDesktop: {
    "@media (max-width: 768px)": {
      display: "none"
    }
  }
});

const NavbarDesktop = () => {
  const classes = useStyles();
  const { navTheme } = useContext(LayoutContext);
  const logo =
    navTheme === "onLightBackground"
      ? "/static/atom-logo-blue.svg"
      : "/static/atom-logo-white-2.svg";
  return (
    <div className={`${classes.flexCenter} ${classes.navDesktop} ${navTheme}`}>
      <Link href="/">
        <Image
          className="cursor-pointer"
          width="127"
          height="48"
          src={logo}
          alt="Atom - Logo"
        />
      </Link>
      <div className={classes.buttonGap}>
        <Link href="/story-time">
          <>
            <img
              // className={classes.freeTag}
              src="/static/new-home/free-tag.svg"
              width={48}
              height={44}
              alt="Free Weekend Bilingual Storytimes at Atom"
            />
            Weekend Storytimes
          </>
        </Link>
        <BrowseBooksButton />
        {/* <Entrance /> */}
      </div>
    </div>
  );
};

const NavbarMobile = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { navTheme } = useContext(LayoutContext);
  const classes = useStyles();
  const logo =
    navTheme === "onLightBackground"
      ? "/static/atom-logo-blue.svg"
      : "/static/atom-logo-white-2.svg";

  const burgerIcon =
    navTheme === "onLightBackground"
      ? "/static/new-home/icon/burger-blue.svg"
      : "/static/new-home/icon/burger.svg";
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <div className={`${classes.flexCenter} ${classes.navMobile} ${navTheme}`}>
        <button className={classes.burgerButton} onClick={toggleDrawer}>
          <img src={burgerIcon} width={32} height={32} alt="" />
        </button>
        <Link href="/">
          <Image
            className="cursor-pointer"
            width="100"
            height="40"
            src={logo}
            alt="Atom - Logo"
          />
        </Link>
        <div className="ml-auto">
          <SignInButton />
        </div>
      </div>
      <SwipeableDrawer
        PaperProps={{
          sx: {
            backgroundColor: "#0EA5E9",
            color: "#09090B"
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
          <Link href="https://www.calendly.com/atomlive">
            <>
              <img
                className={classes.freeTag}
                src="/static/new-home/free-tag.svg"
                width={48}
                height={44}
                alt="Free Weekend Bilingual Storytimes at Atom"
              />{" "}
              Weekend Storytimes
            </>
          </Link>
          <Link href="/story-time">Meet the teachers</Link>
          <Button variant="ghost">
            <BrowseBooksButton />
          </Button>
        </div>
      </SwipeableDrawer>
    </>
  );
};

const Navbar = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const { navTheme } = useContext(LayoutContext);
  const scrollPos = useScrollPosition();

  useEffect(() => {
    setIsScrolling(scrollPos > 100);
  }, [scrollPos]);

  const classes = useStyles({ isScrolling });

  return (
    <AppBar
      className={`${classes.navbar} ${navTheme} ${
        isScrolling ? "isScrolling" : ""
      }`}
      position="fixed"
    >
      <NavbarDesktop />
      <NavbarMobile />
    </AppBar>
  );
};

export default Navbar;
