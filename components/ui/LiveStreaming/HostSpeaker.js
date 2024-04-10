import { useEffect, useCallback, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import AgoraRTC from "agora-rtc-sdk-ng";
import useAgora from "@/components/libs/agora/useAgora";
import MediaPlayer from "@/components/libs/agora/MediaPlayer";

// Library components
import { createStyles, makeStyles } from "@mui/styles";
import ArrowBackIosNewOutlined from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Color from "@/components/styles/color";
import { common, red } from "@mui/material/colors";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//app components
import EventNavbar from "@/components/ui/Navbar/EventNavbar";
import ContentText from "@/components/ui/LiveStreaming/ContentText";
import { useGetArEffects, useContent } from "@/components/hooks/useContent";
import ReadTogether from "@/components/ui/SideNavSlider/ReadTogether";

const activeState = {
  border: `1px solid ${Color.hex.navy}`,
  backgroundColor: `${Color.hex.navy}`,
  color: common.white
};

const passiveState = {
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  color: common.black,
  border: `1px solid ${Color.hex.navy}`
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
      "&:after": {
        content: " ",
        display: "block",
        height: 0,
        clear: "both"
      },
      margin: "0 auto"
    },
    bookBody: {
      minHeight: "100vh"
    },
    button: {
      borderRadius: theme.spacing(3),
      width: theme.spacing(5),
      height: theme.spacing(5),
      minWidth: 0
      // "&:hover": activeState,
      // "&:focus": activeState,
      // "&:pressed": activeState
    },
    activeButton: { ...activeState },
    passiveButton: { ...passiveState },
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
      position: "absolute",
      top: 0,
      width: "100%",
      maxWidth: "2048px",
      justifyContent: "flex-end"
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
      alignSelf: "flex-end",
      justifyContent: "flex-end"
    },
    stageControlsBottom: {
      display: "flex",
      position: "absolute",
      bottom: 0,
      left: "calc(50% - 77px)",
      padding: theme.spacing(2)
    },
    pageNavigation: {
      // padding: theme.spacing(1),
      zIndex: 100,
      flexGrow: 1,
      display: "block"
    },
    webar: {
      maxWidth: "2048px",
      position: "relative",
      zIndex: 10,
      "& > canvas": {
        border: "1px solid black",
        float: "right"
      }
    },
    playerContainerWrapper: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center"
    },
    playerContainer: {
      display: "flex"
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

function HostAsSpeaker({
  slug,
  prettyTitle,
  channel,
  eventRole,
  mode,
  handleModeChange,
  effectsList,
  publisher,
  videoWidth,
  videoHeight
}) {
  const classes = styles();
  const router = useRouter();

  const { bookStageSlug } = router.query;
  const [contentTextHeight, setContentTextHeight] = useState("100%");
  const [uid, setUid] = useState();

  const [activePageIndex, setActivePageIndex] = useState(0);
  const [pageButtonsVisible, setPageButtonsVisible] = useState(false);
  const [contentTextFontSize, setContentTextFontSize] = useState(1.3);
  const [currentPageText, setCurrentPageText] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState();
  const [totalNumPages, setTotalNumPages] = useState();
  const [storyTitle, setStoryTitle] = useState(prettyTitle);
  const [isDisplayDescription, setDisplayDescription] = useState(false);
  const [isDisplayDiscussion, setDisplayDiscussion] = useState(false);
  const {
    arContent,
    currentPageGestures,
    setCurrentPageGestures,
    setGesturesLegend
  } = useContent({
    title: slug,
    language: currentLanguage,
    page: activePageIndex
  });
  const [description, setDescription] = useState();
  const [moral, setMoral] = useState();

  //corner resize element
  const [maximized, setMaximized] = useState(
    videoWidth > videoHeight ? 75 : 50
  );
  const [minimized, setMinimized] = useState(
    videoWidth > videoHeight ? 25 : 50
  );
  const [resizeEl, setResizeEl] = useState(null);
  const resizeOpen = Boolean(resizeEl);

  //video
  const [videoCamera, setVideoCamera] = useState(true);
  const [mic, setMic] = useState(true);
  const [isOnStage, setIsOnStage] = useState(true);
  const arZoneId = "host-local-camera"; //id element to drop AR effects
  const [videoElementHeight, setVideoElementHeight] = useState(
    `${(window.innerWidth / videoWidth) * videoHeight * 0.75}px`
  );

  // popover control for media elements
  const mediaNull = { mic: null, videoCam: null, isOnStage: null };
  const [mediaEl, setMediaEl] = useState(mediaNull);
  const open = {
    mic: Boolean(mediaEl.mic),
    videoCam: Boolean(mediaEl.videoCam),
    isOnStage: Boolean(mediaEl.isOnStage),
    isStageMaximized: Boolean(mediaEl.isStageMaximized)
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
    activePageIndex,
    client,
    channel,
    arZoneId,
    effectsList,
    slug,
    eventRole,
    videoWidth,
    videoHeight
  });

  const handleFontSizeChange = useCallback(
    (e) => {
      e.stopPropagation();

      const task = parseInt(e.target.value);
      console.log("value", task, contentTextFontSize);
      if (task === 1) {
        console.log("here", task);
        if (contentTextFontSize < 1.7) {
          setContentTextFontSize(contentTextFontSize + 0.1);
        }
      } else if (task === -1) {
        if (contentTextFontSize > 1) {
          setContentTextFontSize(contentTextFontSize - 0.1);
        }
      }
    },
    [contentTextFontSize, setContentTextFontSize]
  );

  const handlePageArrow = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      const arrow = e.currentTarget.getAttribute("aria-label");
      console.log("arrow type", arrow);

      const activePageIndexLocal = localStorage.getItem("activePageIndex");
      let currentIndexInBook = activePageIndexLocal
        ? JSON.parse(activePageIndexLocal)
        : {};
      let currentPage = currentIndexInBook[slug] ? currentIndexInBook[slug] : 0;
      let nextPage = undefined;
      if (arrow === "page-next") {
        //right arrow
        //move onto next Page
        nextPage = currentPage < arContent.pages - 1 ? currentPage + 1 : 0;
      } else if (arrow === "page-prev") {
        //left arrow
        nextPage = currentPage > 0 ? currentPage - 1 : arContent.pages - 1;
      }

      if (nextPage !== undefined) {
        currentIndexInBook[slug] = nextPage;

        arPlayer?.use(arWebcam);
        arPlayer?.applyEffect(arEffects[nextPage]);

        localStorage.setItem(
          "activePageIndex",
          JSON.stringify(currentIndexInBook)
        );
        setGesturesLegend(nextPage);
        setActivePageIndex(nextPage);
      }
    },
    [arEffects, activePageIndex, setActivePageIndex, setGesturesLegend]
  );

  const handlePageClick = useCallback(
    (discussionOn, e) => {
      if (isDisplayDescription) {
        setDisplayDescription(false);
      }
      if (discussionOn) {
        setDisplayDiscussion(discussionOn);
      }

      let currentPage;
      if (e?.target?.id) {
        currentPage = parseInt(e.target.id) + 1;
      } else {
        currentPage = arContent?.pages;
      }

      console.log("handlePageClick", currentPage);

      arPlayer?.use(arWebcam);
      arPlayer?.applyEffect(arEffects[currentPage - 1]);

      setActivePageIndex(currentPage - 1);
      const activePageIndexLocal = localStorage.getItem("activePageIndex");
      if (activePageIndexLocal) {
        let currentIndexInBook = JSON.parse(activePageIndexLocal);
        currentIndexInBook[slug] = currentPage - 1;

        localStorage.setItem(
          "activePageIndex",
          JSON.stringify(currentIndexInBook)
        );
      } else {
        let currentIndexInBook = {};
        currentIndexInBook[slug] = currentPage - 1;

        localStorage.setItem(
          "activePageIndex",
          JSON.stringify(currentIndexInBook)
        );
      }

      setGesturesLegend(currentPage);
    },
    [activePageIndex, arEffects, setActivePageIndex, setGesturesLegend]
  );

  const handlePopoverOpen = (mediaType) => (e) => {
    const eventControls = { mic: null, videoCam: null, isOnStage: null };

    if (mediaType === "mic") {
      eventControls.mic = e.currentTarget;
    } else if (mediaType === "video-camera") {
      eventControls.videoCam = e.currentTarget;
    } else if (mediaType === "is-on-stage") {
      eventControls.isOnStage = e.currentTarget;
    }
    return setMediaEl(eventControls);
  };

  const handleContentTextHeight = useCallback(
    (newValue) => {
      setContentTextHeight(newValue);
    },
    [setContentTextHeight]
  );

  const handlePopoverClose = () => {
    setMediaEl(mediaNull);
    setResizeEl(null);
  };

  const toggleVideoCamera = (e) => {
    e.preventDefault();

    if (videoCamera) {
      pauseCamera();
    } else {
      unpauseCamera();
    }
    return setVideoCamera(!videoCamera);
  };

  const toggleMic = (e) => {
    e.preventDefault();
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
    // if (parseInt(maximized) === 100) {
    //   setVideoElementHeight(`${(window.innerWidth / 1280) * 720}px`);
    // } else {
    //   setVideoElementHeight(`${(window.innerWidth / 1280) * 720 * 0.75}px`);
    // }

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
    console.log("isDisplayDescription", isDisplayDescription);

    if (newLang !== null) {
      let langLocal = localStorage.getItem("activeLanguage");
      langLocal = langLocal ? JSON.parse(langLocal) : {};
      langLocal[slug] = newLang;

      setCurrentLanguage(newLang);
      localStorage.setItem(
        "activeLanguage 0",
        JSON.stringify(langLocal),
        isDisplayDescription
      );
      let storyContent = localStorage.getItem(slug);
      if (storyContent) {
        storyContent = JSON.parse(storyContent)?.languages[newLang];
      }
      if (!isDisplayDescription) {
        setStoryTitle(storyContent?.title);
      } else if (isDisplayDescription) {
        console.log("current", currentLanguage, activePageIndex);
        setDescription(storyContent?.description);
        setMoral(storyContent?.moral);
      }
    }
  };

  const joinEvent = () => {
    join(channel, uid);
  };

  const leaveEvent = () => {
    leave();
    handleWindowResize();
  };

  useEffect(async () => {
    let mounted = true;

    if (mounted) {
      const waitUntilEffectVisible = setTimeout(() => {
        setPageButtonsVisible(true);
      }, 10);

      const activePageIndexLocal = localStorage.getItem("activePageIndex")
        ? JSON.parse(localStorage.getItem("activePageIndex"))
        : null;

      const currentIndex =
        activePageIndexLocal && activePageIndexLocal[slug]
          ? parseInt(activePageIndexLocal[slug])
          : 0;

      if (arContent) {
        setTotalNumPages(arContent.pages);
      }
      setActivePageIndex(currentIndex);
      setCurrentPageGestures(
        arContent?.effectDetails[currentIndex + 1].actions
      );

      // const languageLocal = localStorage.getItem("activeLanguage")
      //   ? JSON.parse(localStorage.getItem("activeLanguage"))
      //   : "en";
      // if (languageLocal) {
      //   const activeLanguage = languageLocal[slug] ? languageLocal[slug] : "en";
      //   console.log("activeLanguage", activeLanguage);

      //   setCurrentLanguage(activeLanguage);
      //   setStoryTitle(arContent?.languages[activeLanguage]?.title);
      //   setDescription(arContent?.languages[activeLanguage]?.description);
      //   setMoral(arContent?.languages[activeLanguage]?.moral);
      // }

      setMaximized(videoWidth > videoHeight ? 75 : 50);
      setMinimized(videoWidth > videoHeight ? 25 : 50);
    }

    return () => {
      mounted = false;
      setPageButtonsVisible(false);
      //added

      if (waitUntilEffectVisible) {
        clearTimeout(waitUntilEffectVisible);
      }
    };
  }, [
    arContent,
    // currentLanguage,
    currentPageText,
    description,
    moral,
    isDisplayDescription,
    setActivePageIndex,
    setCurrentLanguage,
    setGesturesLegend,
    setTotalNumPages,
    contentTextHeight
  ]);

  useLayoutEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return window.removeEventListener("resize", handleWindowResize);
  }, [videoElementHeight]);

  const handleDisplayDescription = useCallback(
    (e) => {
      e.preventDefault();
      setDisplayDescription(!isDisplayDescription);
    },
    [isDisplayDescription]
  );

  const handleDisplayDiscussion = useCallback((e) => {
    e.stopPropagation();
    setDisplayDiscussion(true);
    handlePageClick(true);
  });

  const handlePageSwitch = useCallback(
    (e) => {
      e.preventDefault();
      const activePageIndexLocal = localStorage.getItem("activePageIndex");
      let currentIndexInBook = activePageIndexLocal
        ? JSON.parse(activePageIndexLocal)
        : {};
      let currentPage = currentIndexInBook[slug] ? currentIndexInBook[slug] : 0;
      let nextPage = undefined;
      if (e.keyCode === 39) {
        //right arrow
        //move onto next Page
        nextPage = currentPage < arContent.pages - 1 ? currentPage + 1 : 0;
      } else if (e.keyCode === 37) {
        //left arrow
        nextPage = currentPage > 0 ? currentPage - 1 : arContent.pages - 1;
      } else if (e.keyCode === 38) {
        //up arrow
        router.push("#top");
      } else if (e.keyCode === 40) {
        //down arrow
        router.push("#bottom");
      }

      console.log("next page", nextPage, typeof nextPage, activePageIndex);
      if (nextPage !== undefined) {
        currentIndexInBook[slug] = nextPage;

        arPlayer?.use(arWebcam);
        arPlayer?.applyEffect(arEffects[nextPage]);

        localStorage.setItem(
          "activePageIndex",
          JSON.stringify(currentIndexInBook)
        );
        setGesturesLegend(nextPage);
        setActivePageIndex(nextPage);
        if (isDisplayDescription) {
          setDisplayDescription(false);
        }
        if (nextPage < arContent.pages) {
          setDisplayDiscussion(false);
        } else {
          setDisplayDiscussion(true);
        }
      }
    },
    [arEffects, activePageIndex, setActivePageIndex, setGesturesLegend]
  );

  return (
    <>
      {!effectsList && <>not found</>}
      {effectsList && (
        <div
          className={classes.bookBody}
          id="book-stage"
          onKeyDown={handlePageSwitch}
          tabIndex={-1}
          role="button"
        >
          <Stack>
            <EventNavbar
              contentTextFontSize={contentTextFontSize}
              currentLanguage={currentLanguage}
              currentGestures={currentPageGestures}
              discussion={arContent?.languages[currentLanguage]?.discussion}
              handleDisplayDescription={handleDisplayDescription}
              handleFontSizeChange={handleFontSizeChange}
              handleLanguageSwitch={handleLanguageSwitch}
              isDisplayDescription={isDisplayDescription}
              join={joinEvent}
              joinState={joinState}
              leave={leaveEvent}
              page={activePageIndex + 1}
              setGesturesLegend={setGesturesLegend}
              showSideNavSlider={showSideNavSlider}
              slug={slug}
              title={storyTitle || prettyTitle}
              toggleSideNavSlider={toggleSideNavSlider}
              totalNumPages={totalNumPages}
            />

            <div className={classes.root} style={{ width: "100%" }}>
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
                  {!arPlayer?.isPlaying && (
                    <Skeleton
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 0,
                        maxHeight: videoElementHeight
                      }}
                      variant="rectangular"
                      width={videoWidth}
                      height="100%"
                    />
                  )}
                  <div id="host-local-camera" className={classes.webar}></div>
                  <Box
                    className={classes.cameraOff}
                    sx={{
                      width: "100%",
                      height:
                        videoWidth > videoHeight ? videoElementHeight : "none",
                      opacity: `${videoCamera ? 0 : 1}`,
                      zIndex: `${videoCamera ? 20 : 30}`
                    }}
                  ></Box>
                </>
              </Box>
              <Box
                sx={{
                  width: `calc(${minimized}% - 2px)`,
                  height:
                    videoWidth > videoHeight
                      ? videoElementHeight
                      : videoElementHeight,
                  scrollY: "auto",
                  float: "right",
                  borderTop: "1px solid black",
                  borderBottom: "1px solid black",
                  borderRight: "1px solid black",
                  borderLeft: "1px solid black",
                  backgroundColor: "#fff3e9"
                }}
              >
                <ContentText
                  id="story-text"
                  contentTextFontSize={contentTextFontSize}
                  contentTextHeight={contentTextHeight}
                  currentLanguage={currentLanguage}
                  description={description}
                  moral={moral}
                  isDisplayDescription={isDisplayDescription}
                  isDisplayDiscussion={
                    activePageIndex === parseInt(arContent?.pages - 1) &&
                    arContent?.languages["en"].discussion?.length > 0
                      ? true
                      : false
                  }
                  layout_percent={maximized}
                  page={activePageIndex + 1}
                  setContentTextHeight={handleContentTextHeight} //should be 50% if practice reading mode is on, 100% otherwise
                  title={slug}
                />
              </Box>
            </div>
          </Stack>
          <Stack direction="row" className={classes.playerContainerWrapper}>
            {arContent && (
              <Grid
                container
                align="center"
                sx={{
                  borderTop: "1px solid black",
                  // position: "fixed",
                  // bottom: 0,
                  // left: 0,
                  width: "100vw",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.7)"
                }}
              >
                <Grid
                  item
                  xs={12}
                  md={10}
                  sx={{ justifyContent: "center", alignItems: "center" }}
                >
                  <div className={classes.pageNavigation}>
                    <Stack direction="row" alignItems="center">
                      <Button
                        className={classes.button}
                        size="small"
                        color="secondary"
                        aria-label="page-prev"
                        variant="contained"
                        id="page-prev"
                        onClick={handlePageArrow}
                      >
                        <ArrowBackIosNewOutlined />
                      </Button>
                      <Box
                        sx={{
                          width: `calc(100% - 90px)`,
                          overflowX: "scroll",
                          display: "flex",
                          alignItems: "center",
                          padding: 1,
                          scrollbarWidth: "none"
                        }}
                      >
                        {}
                        <Button
                          size="small"
                          variant="text"
                          aria-label="about-story"
                          id="about-story"
                          onClick={handleDisplayDescription}
                          className={
                            isDisplayDescription ? classes.activeButton : ""
                          }
                        >
                          About
                        </Button>
                        <Box
                          sx={{
                            display: "flex",
                            width: Object.keys(effectsList).length * 48
                          }}
                        >
                          {Object.keys(effectsList)?.map((effect, index) => {
                            const len = Object.keys(effectsList).length;

                            return (
                              <Button
                                className={`${classes.button} ${
                                  activePageIndex === parseInt(index)
                                    ? classes.activeButton
                                    : classes.passiveButton
                                }`}
                                sx={{ mx: 0.25 }}
                                size="small"
                                aria-label={`page-${index}`}
                                id={index}
                                key={index + 1}
                                onClick={
                                  index < len - 1
                                    ? (e) => handlePageClick(false, e)
                                    : (e) => handlePageClick(true, e) //turn on display discussion
                                }
                              >
                                {parseInt(index + 1)}
                              </Button>
                            );
                          })}
                        </Box>
                      </Box>
                      <Button
                        className={classes.button}
                        size="small"
                        color="secondary"
                        aria-label="page-next"
                        variant="contained"
                        id="page-next"
                        onClick={handlePageArrow}
                      >
                        <ArrowForwardIos />
                      </Button>
                    </Stack>
                  </div>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Stack
                    spacing={2}
                    direction="row"
                    sx={{
                      border: "1px solid black",
                      p: 1
                    }}
                  >
                    <Stack>
                      <Typography variant="h6">Keys</Typography>
                    </Stack>
                    <Stack>
                      <Typography variant="body2">
                        LEFT/RIGHT:move pages
                      </Typography>
                      <Typography gutterBottom variant="body2">
                        UP/DOWN: scroll text
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            )}
            {joinState === true && remoteUsers.length === 0 && (
              <ReadTogether isWaitingForFriends={true} />
            )}
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
                  {remoteUsers.length > 0 &&
                    remoteUsers?.map((user) => (
                      <Stack key={user.uid}>
                        <MediaPlayer
                          videoTrack={user.videoTrack}
                          audioTrack={user.audioTrack}
                        ></MediaPlayer>
                        <div className="remote-player-text">{`remoteVideo(${user.uid})`}</div>
                      </Stack>
                    ))}
                </div>
              </>
            )}
          </Stack>
        </div>
      )}
    </>
  );
}

export default HostAsSpeaker;
