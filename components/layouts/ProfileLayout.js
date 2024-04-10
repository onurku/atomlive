import { useState } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Color from "@/components/styles/color";

import Navbar from "@/components/ui/Navbar";
import HeadMeta from "@/components/ui/HeadMeta";
import LeftNavigation from "@/components/ui/LeftNavigation";
import Entrance from "@/components/ui/Entrance";

const styles = makeStyles({
  root2: {
    display: "flex",
    minHeight: "100vh",
    overflow: "scroll"
  },
  dialogTitle: {
    display: "flex",
    // flexDirection: "row",
    // flex: "1 1 auto",
    justifyContent: "right",
    alignItems: "right"
  },
  closeButton: {
    position: "absolute !important",
    top: 0,
    right: 0
  },
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  headerContainer: {
    display: "flex",
    justifyContent: "flex-end"
  },
  outletContainer: {
    width: "calc(100% - 70px)",
    background: Color.ombre.sunset,
    overflow: "scroll",
    height: "100%"
  }
});

const drawerWidth = 260;

const ProfileLayout = ({ children, meta }) => {
  const classes = styles();
  const [isAuthenticated, setAuthenticated] = useState(false);

  const pageMeta = {
    title: "Atom.live",
    description: "Reading Magic",
    cardImage: "/og.jpg",
    ...meta
  };

  return (
    <>
      <HeadMeta meta={pageMeta} />
      <Box className={classes.container}>
        <LeftNavigation drawerWidth={drawerWidth} />
        <div className={classes.outletContainer}>
          {/* <Navbar /> */}
          <section id="profile-section">{children}</section>
        </div>
      </Box>
    </>
  );
};

export default ProfileLayout;
