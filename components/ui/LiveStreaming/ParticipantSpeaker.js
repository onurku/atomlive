import { useEffect, useCallback, useLayoutEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import useAgora from "@/components/libs/agora/useAgora";
import MediaPlayer from "@/components/libs/agora/MediaPlayer";

// Library compoenents
import { createStyles, makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { common, red } from "@mui/material/colors";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
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

//app components
import EventNavbar from "@/components/ui/Navbar/EventNavbar";
import ContentText from "@/components/ui/LiveStreaming/ContentText";
import { useGetArEffects } from "@/components/hooks/useContent";
import { hoursToMinutes } from "date-fns/esm";

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
      display: "block",
      overflow: "auto",
      width: "100%",
      "&:after": {
        content: " ",
        display: "block",
        height: 0,
        clear: "both"
      }
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
      maxWidth: "2048px",
      justifyContent: "space-between"
      // justifyContent: "flex-end"
    },
    stage: {
      display: "block",
      position: "relative",
      float: "left",
      "&:hover #pages": visibleState,
      "&:hover #controlsBar": visibleState,
      "&:hover #controlsBarBottom": visibleState
    },
    stageControlsTop: {
      display: "flex",
      width: "fit-content",
      alignSelf: "flex-start",
      justifyContent: "flex-end"
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
      zIndex: 100,
      display: "block",
      flexGrow: 1,
      overflowX: "scroll"
    },
    webar: {
      maxWidth: "2048px",
      position: "relative",
      zIndex: 10,
      "& > canvas": {
        border: "1px solid black"
      }
    },
    playerContainer: {
      width: "100%",
      display: "block",
      minWidth: 300
    },
    localPlayerWrapper: {
      width: "50%",
      display: "flex"
    },
    localPlayerText: {
      display: "block",
      width: "100%"
    },
    remotePlayerWrapper: {
      width: "50%",
      display: "flex"
    },

    singleRemoteUser: {
      width: "100%",
      display: "flex"
    },
    storyText: {
      border: "1px solid black",
      fontFamily: "DM Sans, Roboto, Helvetica Neue, Arial, sans-serif",
      fontSize: "1.3rem",
      lineHeight: 1.1,
      padding: theme.spacing(3),
      overflowY: "scroll"
    },
    cameraOff: {
      position: "absolute",
      top: 0,
      left: 0,
      background: common.black,
      width: "100%"
    }
  })
);

const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL;
const client = AgoraRTC.createClient({ codec: "h264", mode: "rtc" });

function ParticipantAsSpeaker({ bookTitle, channel, eventRole }) {
  const classes = styles();
  const [uid, setUid] = useState("");
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [pageButtonsVisible, setPageButtonsVisible] = useState(false);
  const [currentPageText, setCurrentPageText] = useState("");
  const [arContent, setArContent] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [arLanguageList, setArLanguageList] = useState([]);
  //corner resize element
  const [maximized, setMaximized] = useState(75);
  const [minimized, setMinimized] = useState(25);
  const [resizeEl, setResizeEl] = useState(null);
  const resizeOpen = Boolean(resizeEl);
  //video
  const [videoCamera, setVideoCamera] = useState(true);
  const [mic, setMic] = useState(true);
  const arZoneId = "participant-as-speaker"; //id element to drop AR effects
  const [videoElementHeight, setVideoElementHeight] = useState(
    `${(window.innerWidth / 1280) * 720 * 0.75}px`
  );
  const { description, effectsList, prettyTitle, status } =
    useGetArEffects(bookTitle);
  console.log("Stage", { description, effectsList, prettyTitle, status });

  // popover control for media elements
  const mediaNull = { mic: null, videoCam: null };
  const [mediaEl, setMediaEl] = useState(mediaNull);
  const open = {
    mic: Boolean(mediaEl.mic),
    videoCam: Boolean(mediaEl.videoCam)
  };

  const {
    localAudioTrack,
    localVideoTrack,
    leave,
    join,
    pauseCamera,
    unpauseCamera,
    mute,
    unmute,
    joinState,
    remoteUsers,
    arEffects,
    arPlayer,
    arWebcam
  } = useAgora({
    client,
    channel,
    arZoneId,
    effectsList,
    bookTitle,
    eventRole
  });

  const handlePageClick = useCallback(
    (e) => {
      e.preventDefault();

      const currentPage = parseInt(e.target.id) + 1;
      arPlayer?.use(arWebcam);
      arPlayer?.applyEffect(arEffects[currentPage - 1]);
      setActivePageIndex(currentPage - 1);
      //console.log("handlePageClick index", currentPage);
    },
    [activePageIndex]
  );

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
    if (videoCamera) {
      pauseCamera();
    } else {
      unpauseCamera();
    }
    return setVideoCamera(!videoCamera);
  };

  const toggleMic = (e) => {
    e.preventDefault();
    console.log(mic, "mic");
    if (mic) {
      mute();
    } else {
      unmute();
    }
    return setMic(!mic);
  };

  const openFullScreen = (e) => {
    e.preventDefault();
    const stageSize = 75;
    const rightSize = 100 - stageSize;

    if (parseInt(maximized) === 75) {
      setMaximized(100);
      setMinimized(100);
      setVideoElementHeight(`${(window.innerWidth / 1280) * 720}px`);
    } else {
      setMaximized(stageSize);
      setMinimized(rightSize);
      setVideoElementHeight(`${(window.innerWidth / 1280) * 720 * 0.75}px`);
    }
    return;
  };

  const handleWindowResize = () => {
    console.log("maximized", maximized);
    if (parseInt(maximized) === 100) {
      setVideoElementHeight(`${(window.innerWidth / 1280) * 720}px`);
    } else {
      setVideoElementHeight(`${(window.innerWidth / 1280) * 720 * 0.75}px`);
    }

    return;
  };

  const [showSideNavSlider, setShowSideNavSlider] = useState(false);
  const toggleSideNavSlider = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setShowSideNavSlider(open);
  };

  const handleLanguageSwitch = (e, newLang) => {
    e.preventDefault();
    console.log("newLang", newLang);
    setCurrentLanguage(newLang);
  };

  const joinEvent = () => {
    join(channel, uid);
  };

  const leaveEvent = () => {
    leave();
    handleWindowResize();
  };

  useEffect(async () => {
    const waitUntilEffectVisible = setTimeout(() => {
      setPageButtonsVisible(true);
    }, 1000);

    return () => {
      setPageButtonsVisible(false);
      if (waitUntilEffectVisible) {
        clearTimeout(waitUntilEffectVisible);
      }
    };
  }, [arContent, currentPageText, activePageIndex]);

  useLayoutEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return window.removeEventListener("resize", handleWindowResize);
  }, [videoElementHeight]);

  return (
    <>
      <Stack>
        <EventNavbar
          title={bookTitle}
          join={joinEvent}
          leave={leaveEvent}
          joinState={joinState}
          currentLanguage={currentLanguage}
          handleLanguageSwitch={handleLanguageSwitch}
          showSideNavSlider={showSideNavSlider}
          toggleSideNavSlider={toggleSideNavSlider}
        />

        <div className={classes.root}>
          <Box
            sx={{
              width: `${maximized}%`,
              position: "relative",
              maxHeight: videoElementHeight
            }}
            className={classes.stage}
            id="video-container"
          >
            <>
              <Skeleton
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 0,
                  maxHeight: videoElementHeight
                }}
                variant="rectangular"
                width="100%"
                height="100%"
              />
              <div id="participant-as-speaker" className={classes.webar}></div>
              <Box
                className={classes.cameraOff}
                sx={{
                  width: "100%",
                  height: videoElementHeight,
                  opacity: `${videoCamera ? 0 : 1}`,
                  zIndex: `${videoCamera ? 20 : 30}`
                }}
              ></Box>
              <Stack
                sx={{ zIndex: `${videoCamera ? 30 : 20}` }}
                direction="row"
                id="controlsBar"
                className={classes.controlsContainer}
              >
                <div className={classes.pageNavigation}>
                  {arEffects?.map((effect, index) => {
                    return (
                      <Button
                        className={`${classes.button} ${
                          activePageIndex === index ? "" : classes.passiveButton
                        }`}
                        size="small"
                        color="primary"
                        aria-label={`page-${index}`}
                        variant={`${
                          activePageIndex === index ? "contained" : "outlined"
                        }`}
                        id={index}
                        key={index + 1}
                        onClick={handlePageClick}
                      >
                        {parseInt(index + 1)}
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
              <Stack
                direction="row"
                sx={{ zIndex: 30 }}
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
                      {videoCamera ? "Turn Off Camera" : "Turn On Camera"}
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
              </Stack>
            </>
          </Box>
          <Box
            sx={{
              width: `${minimized}%`,
              float: "right"
            }}
          >
            <ContentText
              id="story-text"
              title={bookTitle}
              language={currentLanguage}
              page={activePageIndex + 1}
              layout_percent={maximized}
            />
          </Box>
        </div>
      </Stack>
      <Stack direction="row">
        {remoteUsers && (
          <>
            <div className={classes.playerContainer}>
              {/* <div className={classes.localPlayerWrapper}>
            <div className={classes.localPlayerText}>
              {localVideoTrack && `localTrack`}
              {joinState && localVideoTrack ? `(${client.uid})` : ""}
            </div>
            <MediaPlayer
              videoTrack={localVideoTrack}
              audioTrack={undefined}
            ></MediaPlayer>
          </div> */}

              <div className={classes.remotePlayerWrapper}>
                {remoteUsers !== undefined &&
                  remoteUsers?.map((user) => (
                    <Stack className={classes.singleRemoteUser} key={user.uid}>
                      <MediaPlayer
                        videoTrack={user.videoTrack}
                        audioTrack={user.audioTrack}
                      ></MediaPlayer>
                      <div className="remote-player-text">{`remoteVideo(${user.uid})`}</div>
                    </Stack>
                  ))}
              </div>
            </div>

            {/* {pageButtonsVisible && (
          <div className={classes.pageNavigation}>
            {arEffects.map((effect, index) => {
              return (
                <Button
                  className={`${classes.button} ${
                    activePageIndex === index ? "" : classes.passiveButton
                  }`}
                  size="small"
                  color="primary"
                  aria-label={`page-${index}`}
                  variant={`${
                    activePageIndex === index ? "contained" : "outlined"
                  }`}
                  id={index}
                  key={index + 1}
                  onClick={handlePageClick}
                >
                  {parseInt(index + 1)}
                </Button>
              );
            })}
          </div>
        )}
        {!pageButtonsVisible && <Skeleton width={"100%"} height={60} />} */}
          </>
        )}
      </Stack>
    </>
  );
}

export default ParticipantAsSpeaker;
