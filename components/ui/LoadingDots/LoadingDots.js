import { createStyles, makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";

const styles = makeStyles((theme) =>
  createStyles({
    loadingdots: {
      width: 40,
      display: "flex",
      justifyContent: "space-between",
      margin: "0 auto",
      alignItems: "center",
      height: 28
    },
    dot: {
      width: 10,
      height: 10,
      backgroundColor: grey[600],
      border: "1px solid white",
      borderRadius: "50%",
      animation: "$loadingDots 1.4s infinite ease-in-out both",
      "&:nth-child(1)": {
        animationDelay: "-0.32s"
      },
      "&:nth-child(2)": {
        animationDelay: "-0.16s"
      }
    },
    "@keyframes loadingDots": {
      "0%": {
        transform: "scale(0)"
      },
      "80%": {
        transform: "scale(0)"
      },
      "  100%": {
        transform: "scale(0)"
      },
      "40%": {
        transform: "scale(1)"
      },
      "70%": {
        opacity: 0.3
      }
    },
    "@keyframes loading": {
      "0%": {
        background: "#ccc"
      },
      "50%": {
        background: "#4a4a4a"
      },
      "100%": {
        background: "#ccc"
      }
    }
  })
);

const LoadingDots = () => {
  const classes = styles();
  return (
    <>
      <div className={classes.loadingdots}>
        <div className={classes.dot}></div>
        <div className={classes.dot}></div>
        <div className={classes.dot}></div>
      </div>
    </>
  );
};

export default LoadingDots;
