import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import Youtube from "../../Youtube";
import Text from "../components/Text";
import { bounceTransition } from "@/components/ui/Transition";
import useIsDesktop from "@/components/hooks/useIsDesktop";
import Color from "@/components/styles/color";
import { common } from "@mui/material/colors";

const useStyles = makeStyles({
  bookAstory: {
    overflow: "hidden",
    padding: "50px 0",
    background: "linear-gradient(180deg, #FFF 0%, #DDF0F8 52.26%, #FFF 97.57%)"
  },
  textCenter: {
    textAlign: "center"
  },
  heroVideo: {
    margin: "auto",
    marginTop: "3.5rem",
    marginBottom: "3.5rem"
  },
  iframeContainer: {
    maxWidth: "819px",
    margin: "auto",
    position: "relative",
    paddingBottom: "56.25%", // for aspect ratio 16:9
    height: 0,
    overflow: "hidden",
    borderRadius: "24px",
    border: "8px solid #87CEEB"
  },
  textLarge: {
    marginTop: "1.5rem",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "818px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "1.5",
    fontFamily: "Petrona, serif",
    fontStyle: "italic",
    "@media (min-width: 768px)": {
      fontSize: "32px"
    }
  },
  textMedium: {
    textAlign: "center",
    color: Color.hex.aquagrey,
    marginTop: "1rem"
  },
  calendlyIframe: {
    width: "100%",
    height: "440px",
    border: "none",
    "@media (min-width: 768px)": {
      height: "800px"
    }
  },
  outlineBlue: {
    color: Color.hex.brightblue,
    textShadow: `-1px -1px 0 ${common.black}, 1px -1px 0 ${common.black}, -1px 1px 0 ${common.black}, 1px 1px 0 ${common.black}`
  },
  textSubtitle: {
    marginTop: "1rem",
    color: Color.hex.greyblue
  }
});

const BookAStoryTime = () => {
  const isDesktop = useIsDesktop();
  const classes = useStyles();
  return (
    <>
      <div className={classes.bookAstory}>
        <div className="container-full">
          <div className="container-section">
            <div className={`${classes.textCenter} ${classes.spaceY3}`}>
              <Text
                className={classes.outlineBlue}
                text="Free Weekend Bilingual Storytimes"
                wandSrc="/static/new-home/magic-wand.svg"
                tag="h2"
                animateOn={true}
              />
              <Text
                className={classes.textSubtitle}
                text="Screen time, but better when spent together"
                wandSrc="/static/new-home/magic-wand.svg"
                tag="h3"
                wandSize={48}
                animateOn={true}
              />
            </div>
            <div className={classes.heroVideo}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={isDesktop && bounceTransition({ delay: 0.3 })}
                className={classes.iframeContainer}
              >
                <Youtube
                  poster="/static/new-home/thumbnail/f3kJ0CNdIa0.jpg"
                  height="100%"
                  embedId="f3kJ0CNdIa0"
                  title="Atom's video"
                  style={{
                    border: 0,
                    border: "none",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0
                  }}
                />
              </motion.div>
            </div>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={isDesktop && bounceTransition({ delay: 0.3 })}
              className={classes.textLarge}
            >
              “If we can make screen time something that’s valuable and
              connecting, I far prefer that as a mom [than] to just passively
              put kids in front of screens.”
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={isDesktop && bounceTransition({ delay: 0.3 })}
              className={classes.textMedium}
            >
              Randi Zuckerberg, Founder and CEO, Zuckerberg Media
            </motion.p>
            <div className={classes.heroVideo}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={isDesktop && bounceTransition({ delay: 0.3 })}
                className={classes.iframeContainer}
              >
                <iframe
                  className={classes.iframe}
                  src="https://www.youtube.com/embed/f3kJ0CNdIa0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Atom's video"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-section">
        <iframe
          className={classes.calendlyIframe}
          src="https://calendly.com/atomlive"
        ></iframe>
      </div>
    </>
  );
};

export default BookAStoryTime;
