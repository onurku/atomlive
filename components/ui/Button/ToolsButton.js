import { useState, useContext, useEffect } from "react";
import { GoogleLogin } from "react-google-login";

//Library components
import Box from "@mui/material/Box";
import { createStyles, makeStyles } from "@mui/styles";
import GroupsIcon from "@mui/icons-material/Groups";
import IconButton from "@mui/material/IconButton";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import Popover from "@mui/material/Popover";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

//App Components

const styles = makeStyles((theme) => {
  const activeState = {
    background: `rgba(0,0,0, 0.8) `,
    color: common.white
  };
  const passiveState = {
    background: "rgba(255, 255, 255, 0.5)",
    color: common.black
  };

  const visibleState = {
    visibility: "visible"
  };

  const roundControlButtons = {
    ...passiveState,
    border: `1px solid ${common.black}`,
    fontSize: "1.2rem"
  };

  return createStyles({
    buttonContainer: {
      textAlign: "center"
    },
    button: {
      borderRadius: theme.spacing(3),
      width: theme.spacing(5),
      height: theme.spacing(5),
      marginRight: theme.spacing(0.5),
      marginTop: theme.spacing(0.5),
      padding: 0,
      minWidth: 0,

      "&:hover": activeState,
      "&:focus": activeState,
      "&:pressed": activeState
    },
    passiveButton: passiveState,
    resizeButton: {
      borderRadius: theme.spacing(3),
      padding: theme.spacing(1.2),
      ...roundControlButtons,
      "&:hover": activeState,
      "&:focus": activeState,
      "&:pressed": activeState
    },
    screenButton: {
      borderRadius: theme.spacing(3),
      padding: theme.spacing(1.2),
      ...roundControlButtons
    }
  });
});

const ToolsButton = ({
  actionItem,
  toggleOnClick,
  itemId,
  handlePopoverClose,
  handlePopoverOpen,
  iconNameWhenTrue,
  iconNameWhenFalse,
  mediaEl
}) => {
  function getIcon(iconName, isOn, mediaEl) {
    switch (iconName) {
      case "mic":
        if (isOn) {
          return <MicIcon className={classes.screenButton} />;
        } else {
          return (
            <MicOffIcon className={`${classes.screenButton} ${classes.off}`} />
          );
        }
      case "video-camera":
        if (isOn) {
          return;
        }
    }
  }

  useEffect(() => {
    getIcon();
  }, []);

  return (
    <div className={classes.buttonContainer}>
      <IconButton
        aria-owns={actionItem ? id : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen(itemId)}
        onMouseLeave={handlePopoverClose}
        onClick={toggleOnClick}
      >
        {mic ? (
          <MicIcon className={classes.screenButton} />
        ) : (
          <MicOffIcon className={`${classes.screenButton} ${classes.off}`} />
        )}
      </IconButton>
      <Popover
        id={itemId}
        sx={{
          pointerEvents: "none"
        }}
        open={actionItem}
        anchorEl={mediaEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{mic ? "Mute" : "Unmute"}</Typography>
      </Popover>
    </div>
  );
};

export default ToolsButton;
