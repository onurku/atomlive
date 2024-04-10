import { useState, useCallback, useEffect } from "react";
import useAgora from "@/components/libs/agora/useAgora";
import AgoraRTC from "agora-rtc-sdk-ng";

import { createStyles, makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { common, red, green } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//components
import { useContent, useGetArEffects } from "@/components/hooks/useContent";
import MainTitle from "@/components/ui/MainTitle";
import effectsList_audience from "@/components/ui/LiveStreaming/effectsList_audience";

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
    paragraph: {
      marginBottom: theme.spacing(1)
    },
    pageNavigation: {
      zIndex: 100,
      display: "block",
      flexGrow: 1,
      overflowX: "scroll",
      marginBottom: theme.spacing(1)
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
    }
  })
);

const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL;
const client = AgoraRTC.createClient({ codec: "h264", mode: "rtc" });

const InvitedPortal = ({ bookTitle, channel, hostFirstName, eventRole }) => {
  const classes = styles();
  const arZoneId = "camera-zone";

  const [effects, setEffects] = useState();
  const [effectsList, setEffectsList] = useState(effectsList_audience);
  const [activeEffectIndex, setActiveEffectIndex] = useState(0);
  const [masksVisible, setMasksVisible] = useState(false);
  const { description, prettyTitle, status } = useGetArEffects(bookTitle);
  console.log("InvitedPortal", { description, prettyTitle, status });

  const {
    // localAudioTrack,
    // localVideoTrack,
    // leave,
    // join,
    // pauseCamera,
    // unpauseCamera,
    // mute,
    // unmute,
    // joinState,
    // remoteUsers,
    arEffects,
    arPlayer
  } = useAgora({
    arZoneId,
    channel,
    client,
    bookTitle,
    effectsList,
    eventRole
  });

  const handlePageClick = useCallback(
    (e) => {
      e.preventDefault();

      const currentPage = parseInt(e.target.id) + 1;
      //arPlayer?.use(arWebcam);
      arPlayer?.applyEffect(arEffects[currentPage - 1]);
      setActiveEffectIndex(currentPage - 1);
      //console.log("handlePageClick index", currentPage);
    },
    [activeEffectIndex]
  );

  useEffect(async () => {
    const waitUntilEffectVisible = setTimeout(() => {
      setMasksVisible(true);
      setEffects(arEffects);
    }, 1000);

    return () => {
      if (waitUntilEffectVisible) {
        clearTimeout(waitUntilEffectVisible);
      }
    };
  }, [activeEffectIndex]);

  console.log("InvitedPortal arEffects", arEffects, effects);

  const joinEvent = (e) => {
    console.log(e.target.id);
  };

  return (
    <>
      <Grid container align="center" justifyContent="center">
        <Grid item xs={12} md={8}>
          <MainTitle text="Let's Make Magic" />
        </Grid>
        <Grid item xs={12}>
          <Grid container align="center" justifyContent="center" spacing={2}>
            <Grid item xs={3}>
              <PhotoCameraFrontIcon sx={{ fontSize: 80, color: green[500] }} />
            </Grid>
            <Grid item xs={7}>
              <Typography sx={{ marginBottom: 3 }} align="left" variant="h6">
                You've been invited by {hostFirstName} to read "{prettyTitle}"
                together. Enable your camera and enjoy the book!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10} sm={4}>
          {status === "unloaded" && (
            <Typography variant="body1">Loading...</Typography>
          )}
          <Typography align="left" variant="body1" sx={{ marginRight: 3 }}>
            {description}
          </Typography>
        </Grid>
        <Grid item xs={10} sm={6}>
          <div id="camera-zone"></div>
          <Button
            fullWidth
            aria-label="Join reading event"
            variant="contained"
            size="large"
            onClick={joinEvent}
          >
            Join reading event
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default InvitedPortal;
