import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import Image from "next/legacy/image";
import Youtube from "../../Youtube";
import { Button } from "../components/Button"; // Assuming this is the custom Button component you have
import Text from "../components/Text"; // Assuming this is the custom Text component you have
import { bounceTransition } from "../components/transitionConfig";
import useIsDesktop from "../hooks/useIsDesktop";

import Box from "@mui/material/Box";
import { common } from "@mui/material/colors";
import Color from "@/components/styles/color";

const useStyles = makeStyles({
  heroContainer: {
    position: "relative",
    paddingBottom: "156px",
    paddingTop: "144px",
    backgroundColor: "#0EA5E9" // bg-sky-500
  },
  overflowHiddenContainer: {
    // overflow: "hidden"
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
    // overflow: "hidden",
    width: "100%",
    height: "100%"
  },
  castle: {
    backgroundImage: "url('/static/new-home/hero-background.png')",
    backgroundSize: "auto",
    backgroundPosition: "bottom -60px center",
    backgroundRepeat: "repeat-x",
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: 10,
    left: 0,
    "@media (max-width: 768px)": {
      backgroundPosition: "bottom center",
      backgroundSize: "100% auto"
    }
  },
  waveBlue: {
    backgroundImage: "url('/static/new-home/hero-wave-blue.svg')",
    backgroundSize: "auto",
    backgroundPosition: "bottom center",
    backgroundRepeat: "repeat-x",
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: 10,
    left: 0,
    "@media (max-width: 768px)": {
      backgroundPosition: "bottom center",
      backgroundSize: "100% auto"
    }
  },
  waveWhite: {
    backgroundImage: "url('/static/new-home/hero-wave-white.svg')",
    backgroundSize: "auto",
    backgroundPosition: "bottom center",
    backgroundRepeat: "repeat-x",
    bottom: "-1px",
    width: "100%",
    height: "100%",
    zIndex: 11,
    left: 0,
    position: "absolute",
    "@media (max-width: 768px)": {
      backgroundPosition: "bottom center",
      backgroundSize: "100% auto"
    }
  },
  relativeContainer: {
    position: "relative",
    zIndex: 20
  },
  heroVideo: {
    marginTop: "100px",
    maxWidth: "819px",
    margin: "auto",
    "@media (max-width: 768px)": {
      marginTop: "50px"
    }
  },
  motionDiv: {
    position: "absolute",
    zIndex: 10
  },
  motionDivWave: {
    position: "absolute",
    zIndex: 10
  },
  aspectRatio: {
    aspectRatio: "819 / 460",
    borderRadius: "24px",
    overflow: "hidden"
  },
  iframe: {
    width: "100%",
    height: "100%",
    border: "none"
  },
  textCenter: {
    marginTop: "24px",
    maxWidth: "606px",
    color: "white",
    textAlign: "center",
    fontWeight: "semibold",
    fontSize: "18px",
    margin: "auto"
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    marginTop: "32px"
  },
  minWidthButton: {
    minWidth: "272px"
  },
  hiddenOnSmallScreens: {
    "@media (max-width: 1024px)": {
      display: "none"
    }
  },
  decorativeWraper: {
    maxWidth: "90%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  textSky: {
    color: Color.hex.brightgreen
    // textShadow: `-1px -1px 0 ${common.black}, 1px -1px 0 ${common.black}, -1px 1px 0 ${common.black}, 1px 1px 0 ${common.black}`
  },
  outlineWhite: {
    color: Color.hex.brightyellow,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 800,
    textShadow: `-1px -1px 0 ${common.black}, 1px -1px 0 ${common.black}, -1px 1px 0 ${common.black}, 1px 1px 0 ${common.black}`
  }
});

const Hero = () => {
  const isDesktop = useIsDesktop();
  const classes = useStyles();

  return (
    <div className={classes.heroContainer}>
      <div className={classes.overflowHiddenContainer}>
        <div className={classes.backgroundContainer}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={isDesktop && bounceTransition()}
            className={`${classes.castle}`}
          ></motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={isDesktop && bounceTransition()}
            className={`${classes.waveBlue}`}
          ></motion.div>
          <div className={classes.waveWhite}></div>
        </div>
        <div className={`${classes.relativeContainer} container-section`}>
          <Box>
            <Text
              className={classes.outlineWhite}
              text="Bored Kids,"
              wandSrc="/static/new-home/magic-wand.svg"
              tag="h1"
              animateOn={true}
            />
            <Text
              className={classes.outlineWhite}
              text="Turned Bilingual Superstars"
              wandSrc="/static/new-home/magic-wand.svg"
              tag="h1"
              animateOn={true}
            />
          </Box>
          <Text
            className={classes.textSky}
            text="Read the same story, in multiple languages"
            wandSrc="/static/new-home/magic-wand.svg"
            tag="h3"
            animateOn={true}
          />
          <div className={classes.heroVideo}>
            <div className="relative">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                delay={1.2}
                variants={isDesktop && bounceTransition({ delay: 1.2 })}
                className={`${classes.motionDiv} ${classes.hiddenOnSmallScreens}`}
                style={{
                  top: -70,
                  left: -40,
                  width: "117.5px",
                  aspectRatio: "235 / 222"
                }}
              >
                <Image
                  layout="fill"
                  src="/static/new-home/hero-crown.png"
                  alt="Hero Crown"
                />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={isDesktop && bounceTransition({ delay: 1.5 })}
                className={`${classes.motionDiv} ${classes.hiddenOnSmallScreens}`}
                style={{
                  top: "-100px",
                  right: "-300px",
                  width: "377px",
                  aspectRatio: "377 / 378.05"
                }}
              >
                <Image
                  layout="fill"
                  src="/static/new-home/hero-dragon.png"
                  alt="Hero Dragon"
                />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={isDesktop && bounceTransition({ delay: 1.8 })}
                className={`${classes.motionDiv} ${classes.hiddenOnSmallScreens}`}
                style={{
                  bottom: "-50px",
                  left: "-100px",
                  width: "150px",
                  aspectRatio: "150 / 258"
                }}
              >
                <Image
                  layout="fill"
                  src="/static/new-home/hero-girl.png"
                  alt="Hero Girl"
                />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={isDesktop && bounceTransition({ delay: 0.9 })}
              >
                <div className={classes.aspectRatio}>
                  <Youtube
                    poster="/static/new-home/thumbnail/ZfqzB61A4lc.jpg"
                    height="100%"
                    embedId="ZfqzB61A4lc"
                    title="Atom's video"
                    style={{
                      border: 0
                    }}
                  />
                </div>
                <div className={classes.decorativeWraper}>
                  <div className="decorative-image"></div>
                </div>
              </motion.div>
            </div>
          </div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={isDesktop && bounceTransition({ delay: 0.9 })}
            className={classes.textCenter}
          >
            Give your child the gift of reading through stories and adventure, a
            legacy that will endure within them throughout their entire life.
          </motion.p>
          <div className={classes.flexCenter}>
            <Button className={classes.minWidthButton} isRounded size="lg">
              Let's Read Together
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
