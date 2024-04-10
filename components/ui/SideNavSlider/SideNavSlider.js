import { useState } from "react";
import { FiShoppingBag, FiX } from "react-icons/fi";
import { createStyles, makeStyles } from "@mui/styles";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

//app components
import Color from "@/components/styles/color";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ReadTogether from "@/components/ui/SideNavSlider/ReadTogether";

const styles = makeStyles((theme) =>
  createStyles({
    shoppingBagMessage: {
      display: "flex",
      justifyContent: "space-between",
      alignItem: "right"
    },
    shoppingBagEmpty: {
      flexGrow: 1
    },
    actionBox: {
      background: Color.ombre.beige,
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    closeButton: {
      display: "flex"
    }
  })
);

const SideNavSlider = ({ showSideSlider, toggleSideSlider }) => {
  const classes = styles();
  const [copyIcon, setCopyIcon] = useState(
    <Tooltip title="Copy Invite URL">
      <IconButton onClick={() => handleCopy()}>
        <FileCopyIcon />
      </IconButton>
    </Tooltip>
  );

  async function handleCopy() {
    await navigator.clipboard.writeText(`${window.location.href}`);
    setCopyIcon(
      <Tooltip title="Copied">
        <IconButton color="success" onClick={handleCopy}>
          <CheckIcon />
        </IconButton>
      </Tooltip>
    );
    return;
  }

  const actions = [
    { icon: <HomeIcon />, name: "Home" },
    { icon: <MenuBookIcon />, name: "Book 3" },
    { icon: <MenuBookIcon />, name: "Book 2" },
    { icon: <MenuBookIcon />, name: "Book 1" }
    // { icon: <SaveIcon />, name: "Save" },
    // { icon: <PrintIcon />, name: "Print" },
    // { icon: <ShareIcon />, name: "Share" }
  ];

  return (
    <>
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="add"
        onClick={toggleSideSlider(true)}
      >
        <ArrowForwardIosIcon />
      </Fab>
      <Drawer id="side-nav-slider" anchor="right" open={showSideSlider}>
        <ReadTogether handleOnClose={toggleSideSlider} />
      </Drawer>
    </>
  );
};

export default SideNavSlider;
