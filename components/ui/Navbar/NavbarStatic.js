import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

//Library components
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import { createStyles, makeStyles } from "@mui/styles";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { FiX } from "react-icons/fi";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NextLink from "next/link";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

//app component
import Color from "@/components/styles/color";
import UserContext from "@/components/contexts/UserContext";
import Modal from "@/components/ui/Modal";
import ResendEmail from "@/components/ui/ResendEmail";

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

const NavbarStatic = () => {
  const classes = styles();
  const router = useRouter();
  const { data, status } = useSession();

  const [user, setUser] = useContext(UserContext);
  const [showShoppingBag, setShowShoppingBag] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  let shouldDisplayLogo = false;
  const { pathname } = useRouter();
  console.log(pathname);
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

  const toggleShoppingBagDrawer = (open) => (event) => {
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
    const userProfile = localStorage.getItem("user");
    if (localStorage && userProfile && setUser) {
      setUser({ ...JSON.parse(userProfile) });
    }
  }, [setUser]);

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
        position="static"
        sx={{
          backgroundColor: Color.hex.beige,
          color: "black",
          alignItems: "center",
          height: "auto"
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <NextLink href="/" passHref>
                <Link sx={{ textDecoration: "none" }}>
                  <Stack
                    direction="row"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Image
                      width="100"
                      height="30"
                      src="/static/logo-atom-maroon.svg"
                      alt="Atom turns bored kids into bilingual superstars"
                    />
                  </Stack>
                </Link>
              </NextLink>
            </Typography>

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
                  <NextLink href="/books">
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
              <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <NextLink href="/books">Multilingual Books</NextLink>
                </MenuItem>
                {status === "authenticated" && (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <NextLink href="/account/">My Account</NextLink>
                  </MenuItem>
                )}
                {status !== "authenticated" && (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <NextLink href="/sign/in" passHref>
                      <Button variant="contained" component="a" size="small">
                        Sign In
                      </Button>
                    </NextLink>
                  </MenuItem>
                )}
                {/* <NextLink href="/sign/in/">
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    align="center"
                  >
                    Sign In
                  </Button>
                </NextLink> */}
                {/* <NextLink href="/info/for-authors/">
                  <Button>For Authors</Button>
                </NextLink> */}
              </Stack>
            </Box>

            <Box
              sx={{
                flexGrow: 0,
                display: { xs: "flex", md: "none" }
              }}
            >
              {/* <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip> */}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* <Grid container sx={{ background: Color.hex.beige }}>
        <Grid item className={classes.itemLeft} xs={12} sm={4} md={7} lg={6}>
          {shouldDisplayLogo && (
            <Box>
              <NextLink href="/" passHref>
                <Link sx={{ textDecoration: "none" }}>
                  <Typography variant="h3">atom.live</Typography>
                  <Typography variant="subtitle2">
                    Live inside a book.
                  </Typography>
                </Link>
              </NextLink>
            </Box>
          )}
        </Grid>
        <Grid item className={classes.itemRight} xs={12} sm={8} md={5} lg={6}>
          <Box className={classes.menuContainer}>
            <Entrance />
            <ShoppingBag
              showShoppingBag={showShoppingBag}
              toggleShoppingBagDrawer={toggleShoppingBagDrawer}
            />
          </Box>
        </Grid>
      </Grid> */}
    </>
  );
};

export default NavbarStatic;
