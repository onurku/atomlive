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

const styles = makeStyles((theme) =>
  createStyles({
    shoppingBagMessage: {
      display: "flex",
      position: "relative",
      justifyContent: "space-between",
      alignItem: "right"
    },
    shoppingBagEmpty: {
      flexGrow: 1
    },
    actionBox: {
      background: Color.ombre.beige,
      paddingTop: theme.spacing(4),
      paddingRight: 0,
      paddingBottom: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      marginBottom: theme.spacing(2),
      flexGrow: 1,
      width: "100%"
    },
    closeButton: {
      display: "flex",
      position: "absolute",
      top: 0,
      right: 0
    }
  })
);

const ReadTogether = ({ handleOnClose, isWaitingForFriends }) => {
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
      <Stack
        direction={isWaitingForFriends ? "row" : "column"}
        className={classes.actionBox}
        sx={
          {
            // alignItems: isWaitingForFriends ? "center" : "flex-start",
            // justifyContent: isWaitingForFriends ? "center" : "left"
          }
        }
      >
        <Stack direction="row">
          {!isWaitingForFriends && (
            <Typography
              sx={{ paddingRight: 10 }}
              component="div"
              variant="h3"
              gutterBottom
            >
              Read Together
            </Typography>
          )}
          {isWaitingForFriends && (
            <Typography sx={{ margin: 3 }} variant="h4">
              Waiting for friends to join...
            </Typography>
          )}
          {handleOnClose && (
            <IconButton
              sx={{ alignSelf: "flex-start" }}
              className={classes.closeButton}
              size="large"
              onClick={handleOnClose(false)}
            >
              <FiX />
            </IconButton>
          )}
        </Stack>
        <Stack direction="row">
          <IconButton
            sx={{ cursor: "pointer" }}
            color="primary"
            aria-label="copy invite url"
            component="span"
          >
            {copyIcon}
          </IconButton>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
            onClick={handleCopy}
            sx={{ cursor: "pointer" }}
          >
            Invite a friend to read with you: <br />
            <span>{window.location.href}</span>
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default ReadTogether;
