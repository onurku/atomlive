import { useEffect, useContext, useRef, useState } from "react";
import {
  AgoraVideoCall,
  AgoraStartEvent,
  AgoraEndEvent
} from "@/components/libs/agora/rtc-client";

//Library components
import { createStyles, makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { common, red } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import EventEmitter from "events";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import IconButton from "@mui/material/IconButton";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

//App components
import Color from "@/components/styles/color";
import ExternalLayout from "@/components/layouts/ExternalLayout";

// import { RtcRole } from "agora-access-token";
// import {
//   useLive,
//   useLiveUsers,
//   useStart
// } from "@/components/contexts/LiveContext";

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

const styles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "block"
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
      ...roundControlButtons
    },
    screenButton: {
      borderRadius: theme.spacing(3),
      padding: theme.spacing(1.2),
      ...roundControlButtons
    },
    off: {
      background: red[900],
      color: common.white,
      border: `1px solid ${red[900]}`
    },
    offText: {
      border: 0,
      color: red[900],
      background: "rgba(255, 255, 255, 0.5)",
      padding: theme.spacing(1)
    },
    buttonContainer: {
      textAlign: "center"
    },
    controlsContainer: {
      display: "flex",
      visibility: "hidden",
      position: "absolute",
      top: 0,
      width: "100%",
      maxWidth: "2048px"
    },
    stage: {
      display: "block",
      position: "relative",
      "&:hover #pages": visibleState,
      "&:hover #controlsBar": visibleState,
      "&:hover #controlsBarBottom": visibleState
    },
    stageControlsTop: {
      display: "flex",
      position: "absolute",
      top: 0,
      right: 0
    },
    stageControlsBottom: {
      display: "flex",
      position: "absolute",
      bottom: 0,
      left: "calc(50% - 77px)",
      visibility: "hidden",
      padding: theme.spacing(2)
    },
    pageNavigation: {
      padding: theme.spacing(1),
      overflow: "scroll",
      zIndex: 100,

      overflow: "scroll"
    },
    webar: {
      maxWidth: "2048px",
      position: "relative"
    }
  })
);

const BASEURL = process.env.NEXT_PUBLIC_VERCEL_URL;
const TOKEN = process.env.NEXT_PUBLIC_CLIENT_TOKEN_1;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID;

const Book = () => {
  const classes = styles();

  let BanubaImport = useRef();
  let AgoraImport = useRef();
  // const rtc = useLive();
  const [effects, setEffects] = useState([]);
  const [arPlayer, setArPlayer] = useState();
  const [arWebcam, setArWebcam] = useState();
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [pageButtonsVisible, setPageButtonsVisible] = useState(false);

  const [videoCamera, setVideoCamera] = useState(false);
  const [mic, setMic] = useState(false);

  // popover control for media elements
  const mediaNull = { mic: null, videoCam: null };
  const [mediaEl, setMediaEl] = useState(mediaNull);
  const open = {
    mic: Boolean(mediaEl.mic),
    videoCam: Boolean(mediaEl.videoCam)
  };

  const displayBookData = async (title, language, page) => {
    const response = await fetch("/api/books");
    const data = await response.json();

    console.log("displayBookData", data);
  };

  //corner resize element
  const [maximized, setMaximized] = useState(70);
  const [minimized, setMinimized] = useState(30);
  const [resizeEl, setResizeEl] = useState(null);
  const resizeOpen = Boolean(resizeEl);

  const handlePopoverOpen = (mediaType) => (e) => {
    console.log("handlePopoverOpen", mediaType);
    if (mediaType === "mic") {
      setMediaEl({ mic: e.currentTarget, videoCam: null });
    } else {
      setMediaEl({ mic: null, videoCam: e.currentTarget });
    }
  };

  const handlePopoverClose = () => {
    setMediaEl(mediaNull);
    setResizeEl(null);
  };

  const toggleVideoCamera = (e) => {
    e.preventDefault();
    console.log(videoCamera, "video camera");
    return setVideoCamera(!videoCamera);
  };

  const toggleMic = (e) => {
    e.preventDefault();
    console.log(mic, "mic");
    return setMic(!mic);
  };

  const files = [];
  for (let i = 1; i <= 13; i++) {
    files.push(i);
  }
  const pagesOfBook = [
    ...files
    // "Afro",
    // "PoliceMan",
    // "Glasses",
    // "MonsterFactory",
    // "Spider",
  ];

  const effectsArr = [];

  useEffect(async () => {
    // only load this on client side
    BanubaImport = await import("@/components/sdk/BanubaSDK");
    const { Webcam, Player, Effect, Dom, MediaStreamCapture } = BanubaImport;

    //const AgoraImport = await import("@/components/sdk/agbnb");
    //const AgoraImport = await import("@/components/sdk/AgoraRTC_N-4.7.2");
    AgoraImport = await import("agora-rtc-sdk-ng");

    // console.log("=======");
    // console.log(Webcam);
    // console.log(Player);
    // console.log(Dom);
    // console.log(Effect);
    // console.log("=======");
    const webcam = new Webcam();
    // const webcam = new Webcam();
    setArWebcam(webcam);
    let waitUntilEffectVisible;
    await Player.create({
      clientToken: TOKEN,
      locateFile: {
        "BanubaSDK.wasm": `${BASEURL}/webar/BanubaSDK.wasm`,
        "BanubaSDK.data": `${BASEURL}/webar/BanubaSDK.data`
      }
    }).then(async (player) => {
      Dom.unmount("#webar");
      setArPlayer(player);

      pagesOfBook.map(async (page) => {
        const effect = await Effect.preload(
          `${BASEURL}/webar/the_king_of_the_birds/${page}.zip`
        );
        effectsArr[parseInt(page) - 1] = effect;
      });
      setEffects(effectsArr);

      player.use(webcam);
      player.applyEffect(
        new Effect(`${BASEURL}/webar/the_king_of_the_birds/1.zip`)
      );
      Dom.render(player, "#webar");
      waitUntilEffectVisible = setTimeout(() => {
        setPageButtonsVisible(true);
      }, 3000);
      AgoraVideoCall(AgoraImport, BanubaImport, "demo_channel", 101);
    });

    return () => {
      webcam.stop();
      Dom.unmount("#webar");
      setPageButtonsVisible(false);
      waitUntilEffectVisible.clearTimeout();
    };
  }, []); //end useEffect()

  const handlePageClick = (e) => {
    e.preventDefault();

    const currentPage = parseInt(e.target.id) + 1;
    arPlayer.use(arWebcam);
    arPlayer.applyEffect(effects[currentPage - 1]);
    //console.log(effects[currentPage - 1]);
    return setActivePageIndex(currentPage - 1);
  };

  const openFullScreen = (e) => {
    e.preventDefault();

    const stageSize = 70;
    const rightSize = 100 - stageSize;

    if (parseInt(maximized) < 100) {
      setMaximized(100);
      setMinimized(100);
    } else {
      setMaximized(stageSize);
      setMinimized(rightSize);
    }
    return;
  };

  return (
    <>
      <Button size="small" variant="contained" onClick={AgoraStartEvent}>
        Start Event
      </Button>
      <Button
        sx={{
          background: red[900],
          "&:hover": {
            backgroundColor: red[800]
          }
        }}
        size="small"
        variant="contained"
        onClick={AgoraEndEvent}
      >
        Leave
      </Button>
      <div className={classes.root}>
        <Box
          sx={{
            width: `${maximized}%`,
            float: "left"
          }}
          className={classes.stage}
        >
          <div id="webar" className={classes.webar}></div>
          {pageButtonsVisible && (
            <>
              <Stack
                direction="row"
                id="controlsBar"
                className={classes.controlsContainer}
              >
                <div className={classes.pageNavigation}>
                  {pagesOfBook.map((page, index) => {
                    return (
                      <Button
                        className={`${classes.button} ${
                          activePageIndex === index ? "" : classes.passiveButton
                        }`}
                        size="small"
                        color="primary"
                        aria-label={`page-${page}`}
                        variant={`${
                          activePageIndex === index ? "contained" : "outlined"
                        }`}
                        id={index}
                        key={page}
                        onClick={handlePageClick}
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>
                <div className={classes.stageControlsTop}>
                  <IconButton onClick={openFullScreen}>
                    {maximized < 100 && (
                      <OpenInFullIcon className={classes.resizeButton} />
                    )}
                    {maximized === 100 && (
                      <CloseFullscreenIcon className={classes.resizeButton} />
                    )}
                  </IconButton>
                  <Popover
                    id="resize"
                    sx={{
                      pointerEvents: "none"
                    }}
                    open={resizeOpen}
                    anchorEl={resizeEl}
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
                    <Typography sx={{ p: 1 }}>
                      {mic ? "Mute" : "Unmute"}
                    </Typography>
                  </Popover>
                </div>
              </Stack>
              <div
                id="controlsBarBottom"
                className={classes.stageControlsBottom}
              >
                <div className={classes.buttonContainer}>
                  <IconButton
                    aria-owns={open.videoCam ? "video-camera" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen("video-camera")}
                    onMouseLeave={handlePopoverClose}
                    onClick={toggleVideoCamera}
                  >
                    {videoCamera ? (
                      <VideocamIcon className={classes.screenButton} />
                    ) : (
                      <VideocamOffIcon
                        className={`${classes.screenButton} ${classes.off}`}
                      />
                    )}
                  </IconButton>
                  <Popover
                    id="video-camera"
                    sx={{
                      pointerEvents: "none"
                    }}
                    open={open.videoCam}
                    anchorEl={mediaEl.videoCam}
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
                    <Typography sx={{ p: 1 }}>
                      {videoCamera ? "Video Off" : "Video On"}
                    </Typography>
                  </Popover>
                </div>
                <div className={classes.buttonContainer}>
                  <IconButton
                    aria-owns={open.mic ? "mic" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen("mic")}
                    onMouseLeave={handlePopoverClose}
                    onClick={toggleMic}
                  >
                    {mic ? (
                      <MicIcon className={classes.screenButton} />
                    ) : (
                      <MicOffIcon
                        className={`${classes.screenButton} ${classes.off}`}
                      />
                    )}
                  </IconButton>
                  <Popover
                    id="mic"
                    sx={{
                      pointerEvents: "none"
                    }}
                    open={open.mic}
                    anchorEl={mediaEl.mic}
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
                    <Typography sx={{ p: 1 }}>
                      {mic ? "Mute" : "Unmute"}
                    </Typography>
                  </Popover>
                </div>
              </div>
            </>
          )}
        </Box>
        <Box sx={{ width: `${minimized}%`, float: "right" }}>
          <Typography sx={{ width: "100%" }} variant="h4" align="center">
            Invited
          </Typography>
          <div id="user-published"></div>
        </Box>
      </div>
    </>
  );
};

Book.layout = ExternalLayout;

export default Book;
