import React, { useEffect, useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

//Library components
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import { createStyles, makeStyles } from "@mui/styles";
import { grey, green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { common } from "@mui/material/colors";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { FiX } from "react-icons/fi";
import HelpIcon from "@mui/icons-material/Help";
import Image from "next/legacy/image";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NextLink from "next/link";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

//app component
import Color from "@/components/styles/color";
import LoadingDots from "@/components/ui/LoadingDots";
import UserContext from "@/components/contexts/UserContext";
import Entrance from "@/components/ui/Entrance/";
import Modal from "@/components/ui/Modal";
import ResendEmail from "@/components/ui/ResendEmail";
import ShoppingBag from "@/components/ui/ShoppingBag";
import { path } from "ramda";

const styles = makeStyles((theme) =>
  createStyles({
    navbar: {
      backgroundColor: "#e4d4c7",
      padding: theme.spacing(1)
    },
    dialogTitle: {
      display: "flex",
      justifyContent: "right",
      alignItems: "right"
    },
    closeButton: {
      position: "absolute !important",
      top: 0,
      right: 0
    },
    verifyEmail: {
      background: green[500],
      padding: 16
    },
    menuContainer: {
      padding: theme.spacing(3),

      [theme.breakpoints.down("xs")]: {
        justifyContent: "center",
        paddingLeft: theme.spacing(2),
        paddingright: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        fontSize: "1.2rem"
      }
    },
    navlink: {
      color: common.black
    },
    itemLeft: {
      paddingTop: theme.spacing(3),
      paddingRight: theme.spacing(5),
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(5),
      display: "flex",
      flexGrow: 1,
      justifyContent: "left",
      [theme.breakpoints.down("xs")]: {
        justifyContent: "center"
      }
    },
    itemRight: { display: "flex", justifyContent: "right" }
  })
);

const Navbar = () => {
  const classes = styles();
  const { data: session, status } = useSession();
  const router = useRouter();
  const { pathname } = router;

  const [user, setUser] = useContext(UserContext);
  const [showShoppingBag, setShowShoppingBag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  let shouldDisplayLogo = false;

  const [isBrowseBooksLoading, setBrowseBooksLoading] = useState();

  if (
    pathname === "/" ||
    pathname.includes("info") ||
    pathname.includes("books")
  ) {
    shouldDisplayLogo = true;
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleBrowseBooks = (event) => {
    event.preventDefault();

    if (pathname !== "/books") {
      setBrowseBooksLoading(true);
    }
    router.push("/books/");
  };

  const toggleShoppingBagDrawer = (open) => (event) => {
    console.log("open", open);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setShowShoppingBag(open);
  };

  const toggleModal = () => (e) => {
    console.log("toggleModal");

    setShowModal(!showModal);
    return;
  };

  useEffect(() => {
    let userLocalDetails = localStorage.getItem("user");
    if (
      typeof userLocalDetails === "string" ||
      userLocalDetails instanceof String
    ) {
      userLocalDetails = JSON.parse(userLocalDetails);
      setUser({ ...userLocalDetails });
    }

    if (pathname.includes("books")) {
      setBrowseBooksLoading(false);
    }
  }, [router.asPath, session, setUser]);

  return (
    <>
      {showModal && (
        <Modal>
          <Dialog
            maxWidth="md"
            fullWidth={true}
            open={showModal}
            onClose={toggleModal()}
            aria-labelledby="verify-email"
            aria-describedby="verify-email"
          >
            <DialogTitle className={classes.dialogTitle}>
              <IconButton
                size="large"
                className={classes.closeButton}
                onClick={toggleModal()}
              >
                <FiX />
              </IconButton>
            </DialogTitle>
            <DialogContent id="verify-email">
              <Box
                fullWidth
                sx={{
                  marginLeft: 3,
                  marginRight: 3,
                  borderBottom: 1,
                  borderColor: "divider"
                }}
              >
                <ResendEmail setShowModal={setShowModal} />
              </Box>
            </DialogContent>
          </Dialog>
        </Modal>
      )}
      {status === "authenticated" && user?.is_email_verified === false && (
        <>
          <Box className={classes.verifyEmail}>
            <Typography variant="body1">Your email is not verified.</Typography>
            <Link component="button" variant="body2" onClick={toggleModal()}>
              <Typography variant="body1">Resend Email Confirmation</Typography>
            </Link>
          </Box>
        </>
      )}

      <AppBar
        position="fixed"
        sx={{
          backgroundColor: Color.hex.purple,
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            <Link href="/">
              <Image
                width="127"
                height="48"
                src={`/static/logo-atom-white.svg`}
                alt="Atom, where bored kids become bilingual superstars"
              />
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" }
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <NextLink href="/books">Multilingual Books</NextLink>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <NextLink href="/story-time">
                    <>
                      <img
                        className={classes.freeTag}
                        src="/static/new-home/free-tag.svg"
                        width={48}
                        height={30}
                        alt="Free Weekend Bilingual Storytimes at Atom"
                      />{" "}
                      Weekend Storytimes
                    </>
                  </NextLink>
                </MenuItem>
                {status === "authenticated" && (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <NextLink href="/account/">My Account</NextLink>
                  </MenuItem>
                )}
                {status !== "authenticated" && (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <NextLink href="/sign/in" passHref>
                      <Button
                        variant="contained"
                        component="a"
                        sx={{ width: "100%" }}
                        size="small"
                      >
                        Sign In
                      </Button>
                    </NextLink>
                  </MenuItem>
                )}
              </Menu>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "right",
                alignItems: "center"
              }}
            >
              <Stack
                direction="row"
                spacing={{ xs: 1, sm: 2 }}
                sx={{ alignItems: "center" }}
              >
                <NextLink
                  className={classes.navlink}
                  href="https://www.calendly.com/atomdotlive"
                >
                  <>
                    <img
                      className={classes.freeTag}
                      src="/static/new-home/free-tag.svg"
                      width={48}
                      height={30}
                      alt="Free Weekend Bilingual Storytimes at Atom"
                    />{" "}
                    Weekend Storytimes
                  </>
                </NextLink>
                <NextLink className={classes.navlink} href="/books/">
                  Multilingual Books
                </NextLink>
                <Entrance />
              </Stack>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" }
              }}
            ></Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
