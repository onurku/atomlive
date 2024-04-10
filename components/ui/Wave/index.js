import React, { Fragment } from "react";
import { makeStyles } from "@mui/styles";
import Color from "@/components/styles/color";

const styles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    position: "relative",
    //background: `linear-gradient(60deg, ${purple[900]} 0%, ${purple[200]} 100%)`,
    zIndex: 100,
    top: 0
  },
  waves: {
    position: "relative",
    width: "100%",
    height: "200px",
    marginBottom: -7,
    /*Fix for safari gap*/
    minHeight: 50,
    maxHeight: 100
  },
  use: {
    animation: "$move 15s cubic-bezier(.55, .5, .45, .5) infinite"
  },
  useOrder: [
    { animationDelay: "-2s", animationDuration: "7s" },
    { animationDelay: "-3s", animationDuration: "10s" },
    { animationDelay: "-4s", animationDuration: "13s" },
    { animationDelay: "-5s", animationDuration: "20s" }
  ],
  "@keyframes move": {
    "0%": {
      transform: "translate3d(-90px, 0, 0)"
    },
    "100%": {
      transform: "translate3d(85px, 0, 0)"
    }
  }
}));

const Wave = (props) => {
  const classes = styles(props);
  const waveColors = props.waveColors || [
    Color.hex.purple,
    Color.hex.grape,
    Color.hex.lavender,
    Color.hex.oldRose
  ];

  return (
    <Fragment>
      <div className={classes.wrapper}>
        <svg
          className={classes.waves}
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g>
            <use
              className={`${classes.use} ${classes.useOrder[0]}`}
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill={waveColors[0]}
            />
            <use
              className={`${classes.use} ${classes.useOrder[1]}`}
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill={waveColors[1]}
            />
            <use
              className={`${classes.use} ${classes.useOrder[2]}`}
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill={waveColors[2]}
            />
            <use
              className={`${classes.use} ${classes.useOrder[3]}`}
              xlinkHref="#gentle-wave"
              x="48"
              y="7"
              fill={waveColors[3]}
            />
          </g>
        </svg>
      </div>
    </Fragment>
  );
};

export default Wave;
