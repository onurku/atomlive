import { useRef, useEffect } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { minHeight } from "@mui/system";

const styles = makeStyles((theme) =>
  createStyles({
    videoPlayer: {
      display: "block",
      width: "100%",
      height: "100%",
      width: "320px",
      height: "180px",
      borderTop: 0,
      borderRight: "1px solid black",
      borderBottom: "1px solid black",
      borderLeft: "1px solid black"
    }
  })
);

const MediaPlayer = ({ audioTrack, videoTrack }) => {
  const classes = styles();

  const container = useRef(null); //html element

  useEffect(() => {
    if (!container.current) {
      return;
    }
    videoTrack?.play(container.current);
    return () => {
      videoTrack?.stop();
    };
  }, [container, videoTrack]);

  useEffect(() => {
    if (audioTrack) {
      audioTrack?.play();
    }
    return () => {
      audioTrack?.stop();
    };
  }, [audioTrack]);

  return (
    <div
      ref={container}
      className={classes.videoPlayer}
      // style={{
      //   width: "320px",
      //   height: "180px"
      // }}
    ></div>
  );
};

export default MediaPlayer;
