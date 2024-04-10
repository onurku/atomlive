import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

//Libraries
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { common } from "@mui/material/colors";
import { deepOrange } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import { makeStyles } from "@mui/styles";
import Popover from "@mui/material/Popover";
import SignIn from "@/components/ui/SignIn";
import SignUp from "@/components/ui/SignUp";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import { FiChevronDown, FiX } from "react-icons/fi";

//App Components
import UserContext from "@/components/contexts/UserContext";
import LoadingDots from "@/components/ui/LoadingDots";
import Modal from "@/components/ui/Modal";
import ResetPassword from "@/components/ui/ResetPassword";
import { handleSignOut, getData } from "@/utils/helpers";

const styles = makeStyles({
  dialogTitle: {
    display: "flex",
    justifyContent: "right",
    alignItems: "right"
  },
  closeButton: {
    position: "absolute !important",
    top: 0,
    right: 0
  }
});

const Entrance = ({ navLinkColor }) => {
  const classes = styles();

  const { data: session, status } = useSession();
  console.log("session", session);
  const [user, setUser] = useContext(UserContext); //global user context
  const [userStatus, setUserStatus] = useState("unloaded");
  const [anchorPopoverEl, setAnchorPopoverEl] = useState(null);
  const [showPopover, setShowPopover] = useState(Boolean(anchorPopoverEl));
  const idPopover = showPopover ? "sign-in-top-bar" : undefined;
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tabValue, setTabValue] = useState("0");

  const openPopover = (event) => {
    setShowPopover(!showPopover);
    setAnchorPopoverEl(event.currentTarget);
    return;
  };

  const closePopover = () => {
    setShowPopover(!showPopover);
    setAnchorPopoverEl(null);
    return;
  };

  const toggleModal = (showRegisterModal) => (e) => {
    console.log("toggleModal", showRegisterModal);

    setShowRegisterModal(showRegisterModal);
    setShowModal(!showModal);
    setTabValue(showRegisterModal ? "0" : "1");
    setShowPopover(false); //should not set anchorPopoverEl to null
    return;
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  };

  const handleTabChange = (event, newValue) => {
    console.log("handleTabChange", newValue);
    //0: register, 1: sign in, 2: reset password
    setTabValue(newValue);
    setShowRegisterModal(!showRegisterModal);
  };

  useEffect(async () => {
    let mounted = true;

    if (mounted && session) {
      const userLocal = JSON.parse(localStorage.getItem("user"));
      const isUserEmpty =
        userLocal && Object.keys(userLocal).length
          ? Object.keys(userLocal).length === 0
          : Object.keys(user).length === 0;

      console.log("isEmpty", isUserEmpty);
      if (isUserEmpty) {
        setUserStatus("loading");
        const updatedUser = await getData(`/api/account/profile`);

        setUserStatus("loaded");
        setUser(updatedUser);
      }
    }

    return () => {
      mounted = false;
    };
  }, [session, setUser, setUserStatus]);

  return (
    <>
      {showModal && (
        <Modal>
          <Dialog
            maxWidth="md"
            fullWidth={true}
            open={showModal}
            onClose={toggleModal(false)}
            aria-labelledby="log-into-atom-or-create-a-new-account"
            aria-describedby="log-into-atom-or-create-a-new-account"
          >
            <DialogTitle className={classes.dialogTitle}>
              <IconButton
                size="large"
                className={classes.closeButton}
                onClick={toggleModal(false)}
              >
                <FiX />
              </IconButton>
            </DialogTitle>
            <DialogContent id="log-into-atom-or-create-a-new-account">
              <TabContext value={tabValue}>
                <Box
                  fullWidth
                  sx={{
                    marginLeft: 3,
                    marginRight: 3,
                    borderBottom: 1,
                    borderColor: "divider"
                  }}
                >
                  <TabList
                    onChange={handleTabChange}
                    aria-label="Register or Sign In Tab inside Modal"
                  >
                    <Tab label="Register" value="0" {...a11yProps(0)} />
                    <Tab label="Sign In" value="1" {...a11yProps(1)} />
                    <Tab label="Reset Password" value="2" {...a11yProps(2)} />
                  </TabList>
                </Box>
                <TabPanel value="0" index={0}>
                  <SignUp
                    handleTabChange={handleTabChange}
                    setShowModal={setShowModal}
                  />
                </TabPanel>
                <TabPanel value="1" index={1}>
                  <SignIn
                    handleTabChange={handleTabChange}
                    setShowModal={setShowModal}
                  />
                </TabPanel>
                <TabPanel value="2" index={2}>
                  <ResetPassword
                    handleTabChange={handleTabChange}
                    setShowModal={setShowModal}
                  />
                </TabPanel>
              </TabContext>
            </DialogContent>
          </Dialog>
        </Modal>
      )}
      {status === "unauthenticated" && (
        <>
          <Button
            sx={{ marginLeft: 1, fontSize: { xs: "2rem", md: "1rem" } }}
            color="secondary"
            variant="contained"
            size="small"
            aria-describedby={idPopover}
            onClick={openPopover}
            endIcon={<FiChevronDown />}
          >
            Sign In
          </Button>
          <Popover
            id={idPopover}
            open={showPopover}
            anchorEl={anchorPopoverEl}
            onClose={closePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
          >
            <Stack spacing={1} sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom>
                Hello, please sign in.
              </Typography>
              <Button
                color="primary"
                onClick={toggleModal(false)}
                size="large"
                variant="contained"
                sx={{ marginBottom: 1 }}
              >
                Sign In
              </Button>
              <Button
                color="primary"
                onClick={toggleModal(true)}
                size="large"
                variant="outlined"
                sx={{ marginBottom: 1 }}
              >
                Register
              </Button>
            </Stack>
          </Popover>
        </>
      )}
      {status === "loading" && ""}
      {status === "authenticated" && (
        <>
          {user?.first_name && (
            <Button
              sx={{
                backgroundColor: "transparent",
                "&:hover": { backgroundColor: "transparent" }
              }}
              aria-describedby="my-account"
              onClick={openPopover}
            >
              {user?.photo_url && (
                <Avatar
                  sx={{ bgcolor: deepOrange[800] }}
                  alt={`${user?.first_name} ${user?.last_name}`}
                  src={user?.photo_url}
                />
              )}
              {Object.is(user?.photo_url, null) && (
                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                  {user?.first_name && user?.first_name[0]?.toUpperCase()}
                  {user?.last_name && user?.last_name[0]?.toUpperCase()}
                </Avatar>
              )}
            </Button>
          )}

          {!user?.first_name && (
            <>
              {user?.photo_url && (
                <Avatar
                  alt={`${user?.first_name} ${user?.last_name}`}
                  src={user?.photo_url}
                />
              )}
              {!user?.photo_url && (
                <NextLink href="/account/me" passHref>
                  <Button component="a" color="secondary" variant="contained">
                    My Account
                  </Button>
                </NextLink>
              )}
            </>
          )}
          <Popover
            id={idPopover}
            open={showPopover}
            anchorEl={anchorPopoverEl}
            onClose={closePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
          >
            <Stack spacing={1}>
              <Typography sx={{ pt: 3, pr: 3, pl: 3, pb: 1 }} variant="body1">
                Welcome{user?.first_name ? ` ${user.first_name}!` : "!"}
              </Typography>
              <Divider variant="fullWidth" />
              <Typography sx={{ pl: 3, pr: 3 }} variant="body2">
                <NextLink href="/account/me" passHref>
                  <Link color="primary">My Account</Link>
                </NextLink>
              </Typography>
              <Button
                sx={{ color: common.black }}
                color="secondary"
                size="large"
                onClick={handleSignOut(session)}
              >
                Log out
              </Button>
            </Stack>
          </Popover>
        </>
      )}
    </>
  );
};

export default Entrance;
