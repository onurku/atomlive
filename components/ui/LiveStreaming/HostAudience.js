import { useEffect, useCallback, useLayoutEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import useAgora from "@/components/libs/agora/useAgora";
import MediaPlayer from "@/components/libs/agora/MediaPlayer";

// Library compoenents
import { createStyles, makeStyles } from "@mui/styles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { common, red } from "@mui/material/colors";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
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

//app components
import EventNavbar from "@/components/ui/Navbar/EventNavbar";
import ContentText from "@/components/ui/LiveStreaming/ContentText";
import { useGetArEffects } from "@/components/hooks/useContent";

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
      width: "inherit",
      alignSelf: "flex-start",
      justifyContent: "space-between"
    },
    stageControlsBottom: {
      display: "flex",
      position: "absolute",
      bottom: 0,
      left: "calc(50% - 77px)",
      visibility: "hidden"
    },
    pageNavigation: {
      padding: theme.spacing(1),
      zIndex: 100,
      flexGrow: 1,
      overflow: "scroll",
      "-ms-overflow-style": "none" /* for Internet Explorer, Edge */,
      scrollbarWidth: "none" /* for Firefox */,
      scrollbarHeight: "none" /* for Firefox */,
      "&::-webkit-scrollbar": {
        display: "none" /* for Chrome, Safari, and Opera */
      }
    },
    webar: {
      maxWidth: 320,
      position: "relative",
      zIndex: 10,
      "& > canvas": {
        borderTop: 0,
        borderRight: "1px solid black",
        borderBottom: "1px solid black",
        borderLeft: "1px solid black",
        maxHeight: 180
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
      display: "flex"
    },

    singleRemoteUser: {
      display: "flex"
    },
    storyText: {
      border: "1px solid black",
      fontFamily: "DM Sans, Roboto, Helvetica Neue, Arial, sans-serif",
      fontSize: "1.3rem",
      lineHeight: 1.1,
      padding: theme.spacing(3),
      overflowY: "scroll",
      "-ms-overflow-style": "none" /* for Internet Explorer, Edge */,
      scrollbarWidth: "none" /* for Firefox */,
      "&::-webkit-scrollbar": {
        display: "none" /* for Chrome, Safari, and Opera */
      }
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

function HostAsAudience({
  bookTitle,
  channel,
  eventRole,
  effectsList, //effects for themselves
  effectsBook, //effects for the story
  mode,
  handleModeChange
}) {
  console.log("host as audience", mode);
  const classes = styles();
  const [uid, setUid] = useState("");
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [activeEffectIndex, setActiveEffectIndex] = useState(0);
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
  const [isAudience, setAsAudience] = useState(true);
  const arZoneId = "host-as-audience"; //id element to drop AR effects
  const [videoElementHeight, setVideoElementHeight] = useState(
    `${(window.innerWidth / 1280) * 720 * 0.75}px`
  );
  // popover control for media elements
  const mediaNull = { mic: null, videoCam: null, isAudience: null };
  const [mediaEl, setMediaEl] = useState(mediaNull);
  const open = {
    mic: Boolean(mediaEl.mic),
    videoCam: Boolean(mediaEl.videoCam),
    isAudience: Boolean(mediaEl.isAudience)
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
  console.log("host_as_audience");

  const handlePageClick = useCallback(
    (e) => {
      e.preventDefault();

      const currentPage = parseInt(e.target.id) + 1;
      // arPlayer?.use(arWebcam);
      // arPlayer?.applyEffect(new Effect(effectsBook[currentPage - 1]));
      setActivePageIndex(currentPage - 1);
      //we need to update the page respectively
      //console.log("handlePageClick index", currentPage);
    },
    [activePageIndex]
  );

  const changeEffect = useCallback(
    (e) => {
      e.preventDefault();
      const currentEffect = parseInt(e.target.id) + 1;
      arPlayer?.use(arWebcam);
      arPlayer?.applyEffect(arEffects[currentEffect - 1]);
      setActiveEffectIndex(currentEffect - 1);
    },
    [activeEffectIndex]
  );

  const handlePopoverOpen = (mediaType) => (e) => {
    console.log("handlePopoverOpen", mediaType);
    const eventControls = { mic: null, videoCam: null, isAudience: null };

    if (mediaType === "mic") {
      eventControls.mic = e.currentTarget;
    } else if (mediaType === "video-camera") {
      eventControls.videoCam = e.currentTarget;
    } else if (mediaType === "is-audience") {
      eventControls.isAudience = e.currentTarget;
    }
    return setMediaEl(eventControls);
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

  const promoteToStage = (e) => {
    e.preventDefault();

    console.log("promote to stage");
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
  console.log("host as audience");

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
              <Typography
                sx={{
                  padding: 10,
                  borderTop: "1px solid black",
                  borderRight: 0,
                  borderBottom: "1px solid black",
                  borderLeft: "1px solid black",
                  height: `calc(${videoElementHeight} - 160px)`,
                  width: `calc(100% - 160px)`
                }}
                variant="h5"
              >
                Take turns to read. Promote someone onto the stage
              </Typography>
              <div id="webar3" className={classes.webar}></div>
              <Box
                className={classes.cameraOff}
                sx={{
                  width: "100%",
                  height: videoElementHeight,
                  opacity: `${videoCamera ? 0 : 1}`, //hide when camera visible
                  zIndex: `${videoCamera ? 20 : 30}` //when camera is off, put the black screen forward
                }}
              ></Box>
              <Stack
                sx={{ zIndex: `${videoCamera ? 30 : 20}` }} //when camera is on, put the controls forward
                direction="row"
                id="controlsBar"
                className={classes.controlsContainer}
              >
                <div className={classes.stageControlsTop}>
                  <div className={classes.pageNavigation}>
                    {Object.values(effectsBook).map((effect, index) => {
                      return (
                        <Button
                          className={`${classes.button} ${
                            activePageIndex === index
                              ? ""
                              : classes.passiveButton
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
      <Stack
        direction="row"
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        <Stack
          sx={{ position: "relative", width: 320, height: 180 }}
          className={classes.stage}
        >
          <div id="host-as-audience" className={classes.webar}></div>
          <Stack
            direction="row"
            sx={{ zIndex: 30 }}
            id="controlsBarBottom"
            className={classes.stageControlsBottom}
          >
            <div className={classes.buttonContainer}>
              <IconButton
                aria-owns="is-audience"
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen("is-audience")}
                onMouseLeave={handlePopoverClose}
                onClick={handleModeChange("host_as_speaker")}
              >
                <ArrowUpwardIcon className={classes.screenButton} />
              </IconButton>
              <Popover
                id="is-audience"
                sx={{
                  pointerEvents: "none"
                }}
                open={open.isAudience}
                anchorEl={mediaEl.isAudience}
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
                <Typography sx={{ p: 1 }}>Send to Stage</Typography>
              </Popover>
            </div>

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
                <Typography sx={{ p: 1 }}>{mic ? "Mute" : "Unmute"}</Typography>
              </Popover>
            </div>
          </Stack>
        </Stack>
        {remoteUsers && (
          <>
            {/* <div className={classes.playerContainer}> */}
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
                    <div className={classes.videoPlayerWrapper}>
                      <MediaPlayer
                        videoTrack={user.videoTrack}
                        audioTrack={user.audioTrack}
                      ></MediaPlayer>
                    </div>
                    <div className="remote-player-text">{`remoteVideo(${user.uid})`}</div>
                  </Stack>
                ))}
            </div>
            {/* </div> */}
          </>
        )}
      </Stack>
    </>
  );
}

export default HostAsAudience;
