import { motion } from "framer-motion";

import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";

import useIsDesktop from "@/components/hooks/useIsDesktop";
import Youtube from "@/components/ui/Youtube";
import Text from "@/components/ui/Text";
import {
  bounceTransition,
  bounceTransitionItem,
  containerVariants,
  popOut
} from "@/components/ui/Transition";

const useStyles = makeStyles({
  heroSection: {
    position: "relative",
    overflow: "hidden",
    paddingTop: "164px",
    paddingBottom: "340px",
    backgroundColor: "#0C4A6E",
    "@media (max-width: 768px)": {
      paddingTop: "0"
    }
  },
  waveBlue: {
    backgroundImage: "url('/static/new-home/comunity-wave-blue.svg')",
    backgroundSize: "auto",
    backgroundPosition: "top center",
    backgroundRepeat: "repeat-x",
    "@media (max-width: 768px)": {
      backgroundPosition: "top center",
      backgroundSize: "100% auto"
    },
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1
  },
  rainbowTop: {
    backgroundImage: "url('/static/new-home/rainbow-top.png')",
    backgroundSize: "auto",
    backgroundPosition: "top right",
    backgroundRepeat: "no-repeat",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0
  },
  rainbowBottom: {
    backgroundImage: "url('/static/new-home/rainbow-bottom.png')",
    backgroundSize: "auto",
    backgroundPosition: "bottom left",
    backgroundRepeat: "no-repeat",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "420px",
    aspectRatio: "420 / 439",
    maxWidth: "100%",
    zIndex: 0
  },
  containerSection: {
    position: "relative",
    paddingTop: "96px",
    zIndex: 20,
    "@media (min-width: 768px)": {
      paddingTop: "0"
    }
  },
  textCenter: {
    textAlign: "center",
    marginBottom: "56px",
    color: "#ffffff"
  },
  gridLayout: {
    display: "grid",
    gap: "24px",
    gridTemplateColumns: "1fr",
    "@media (min-width: 768px)": {
      gridTemplateColumns: "repeat(2, 1fr)"
    }
  },
  videoFrame: {
    overflow: "hidden",
    position: "relative",
    paddingBottom: "56.25%",
    height: 0,
    borderRadius: "24px"
  },
  iframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "none"
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    marginTop: "56px"
  },
  joinButton: {
    minWidth: "272px"
  },
  bgSky950: {
    backgroundColor: "#082F49"
  },
  aspectContainer: {
    aspectRatio: "2 / 1",
    maxHeight: "240px",
    position: "relative",
    margin: "auto"
  },
  popOutContainer: {
    width: "480px",
    aspectRatio: "1",
    backgroundColor: "#FEF3C7",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    position: "absolute",
    top: "-240px",
    left: 0,
    right: 0,
    "@media (max-width: 600px)": {
      maxWidth: "90%"
    }
  },
  textContainer: {
    maxWidth: "240px",
    textAlign: "center",
    "@media (min-width: 600px)": {
      maxWidth: "320px"
    }
  },
  iconImage: {
    margin: "auto",
    marginBottom: "24px"
  },
  textLarge: {
    fontSize: "24px",
    fontWeight: "bold",
    "@media (min-width: 600px)": {
      fontSize: "32px"
    }
  },
  textMedium: {
    fontSize: "14px",
    fontWeight: "500",
    "@media (min-width: 600px)": {
      fontSize: "18px"
    }
  }
});

const JoinOurComunity = () => {
  const isDesktop = useIsDesktop();
  const classes = useStyles();
  const content = [
    {
      title: "Atom's video",
      videoId: "Yy9ipWLTqLk"
    },
    {
      title: "Atom's video",
      videoId: "CraDRRqrr4w"
    }
  ];

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className={classes.heroSection}
      >
        <div className={classes.waveBlue}></div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-200px" }}
          variants={
            isDesktop && bounceTransition({ delay: 0, yInitial: "-20%" })
          }
          className={classes.rainbowTop}
        ></motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-200px" }}
          variants={isDesktop && bounceTransition({ delay: 0 })}
          className={classes.rainbowBottom}
        ></motion.div>
        <div className={`${classes.containerSection} container-section`}>
          <div className={classes.textCenter}>
            <Text
              text="Join our community"
              wandSrc="/static/new-home/magic-wand.svg"
              animationDelay={0.3}
              tag="h2"
              animateOn={true}
            />
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-50px" }}
            className={classes.gridLayout}
          >
            {content.map((item, index) => (
              <motion.div
                variants={isDesktop && bounceTransitionItem}
                key={index}
                className={classes.videoFrame}
              >
                <Youtube
                  poster={`/static/new-home/thumbnail/${item.videoId}.jpg`}
                  height="100%"
                  embedId={item.videoId}
                  title="Bilingual, interactive books"
                  // style={{
                  //   border: 0,
                  //   border: "none",
                  //   position: "absolute",
                  //   width: "100%",
                  //   height: "100%",
                  //   top: 0,
                  //   left: 0
                  // }}
                />
              </motion.div>
            ))}
          </motion.div>
          <div className={classes.flexCenter}>
            <Button className={classes.joinButton} isRounded size="lg">
              Join Our Youtube Channel
            </Button>
          </div>
        </div>
      </motion.div>
      <div className={classes.bgSky950}>
        <div className={classes.aspectContainer}>
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={isDesktop && popOut}
            viewport={{ once: true, margin: "-200px" }}
            className={classes.popOutContainer}
          >
            <div className={classes.textContainer}>
              <img
                className={classes.iconImage}
                src="/static/new-home/icon/lightbub.svg"
                width={64}
                height={64}
                alt=""
              />
              <div className="space-y-4">
                <h2 className={classes.textLarge}>Did you know?</h2>
                <p className={classes.textMedium}>
                  50% of the world are bilingual, but only 2% of all books are
                  bilingual? We partner with multi-lingual authors so that all
                  of our books on Atom are available in at least 2 languages.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default JoinOurComunity;
