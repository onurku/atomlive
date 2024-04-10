import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { makeStyles, createStyles } from "@mui/styles";
import useIsDesktop from "@/components/hooks/useIsDesktop";

const styles = makeStyles((theme) =>
  createStyles({
    textContainer: {
      textAlign: "center"
    },
    relativeInlineFlex: {
      position: "relative",
      display: "inline-flex"
    },
    absoluteTopRight: {
      position: "absolute",
      top: 0,
      right: 0
    },
    h1Style: {
      fontFamily: "Petrona",
      fontSize: 64,
      fontWeight: 800,
      lineHeight: 1.8,
      [theme.breakpoints.down("sm")]: {
        fontSize: 56
      }
    },
    h2Style: {
      fontFamily: "Petrona",
      fontSize: 56,
      fontWeight: 600,
      lineHeight: 1.25,
      [theme.breakpoints.down("sm")]: {
        fontSize: 48
      }
    },
    h3Style: {
      fontFamily: "Petrona",
      fontSize: 48,
      lineHeight: 1.25,
      [theme.breakpoints.down("xs")]: {
        fontSize: 36
      }
    },
    h4Style: {
      fontSize: 36,
      fontFamily: "Petrona",
      lineHeight: 1.25,
      [theme.breakpoints.down("xs")]: {
        fontSize: 24
      }
    },
    h5Style: {
      fontSize: 24,
      paddingTop: theme.spacing(3),
      fontFamily: "Petrona",
      lineHeight: 1.25,
      [theme.breakpoints.down("xs")]: {
        fontSize: 16,
        paddingTop: theme.spacing(3)
      }
    },
    h6Style: {
      fontSize: 16,
      fontFamily: "Petrona",
      lineHeight: 1.25,
      [theme.breakpoints.down("xs")]: {
        fontSize: 12
      }
    },
    pStyle: {
      fontSize: 24,
      lineHeight: 1.25
    },
    imgWand: {
      display: "block",
      maxWidth: "100%",
      height: "auto"
    },
    menuContainer: {
      padding: theme.spacing(3)
    },
    itemLeft: {
      paddingTop: theme.spacing(3),
      paddingRight: theme.spacing(5),
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(5),
      display: "flex",
      flexGrow: 1,
      justifyContent: "left",
      [theme.breakpoints.down("xs")]: {
        justifyContent: "center"
      }
    },
    itemRight: { display: "flex", justifyContent: "right" }
  })
);

export default function Text({
  text,
  wandSrc = "/static/new-home/magic-wand.svg",
  tag = "h1",
  className,
  animationDelay = 0.6, // default delay
  animationDuration = 0.6, // default duration
  animateOn = true, // default to on
  wandSize = 96, // default size
  textCenter = true,
  ...props
}) {
  const isDesktop = useIsDesktop();
  const classes = styles();
  const ref = useRef(null);
  const controlsText = useAnimation();
  const controlsWand = useAnimation();
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView && animateOn) {
      controlsWand.start("popUp").then(() => {
        controlsWand.start("animate");
        controlsText.start("animate");
      });
    }
  }, [isInView, animateOn, controlsWand]);

  const textRevealVariants = {
    initial: {
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
    },
    animate: {
      clipPath: "polygon(100% 0, 0% 0, 0% 100%, 100% 100%)",
      transition: {
        type: "tween",
        duration: animationDuration
      }
    }
  };

  const wandAnimation = {
    initial: {
      scale: 0,
      x: "65%",
      right: 0
    },
    popUp: {
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.3,
        stiffness: 260,
        damping: 20,
        delay: animationDelay
      }
    },
    animate: {
      right: "100%",
      transition: {
        duration: animationDuration,
        type: "tween"
      }
    }
  };

  const Tag = motion[tag] || motion.div;
  const tagStyles = {
    h1: classes.h1Style,
    h2: classes.h2Style,
    h3: classes.h3Style,
    h4: classes.h4Style,
    h5: classes.h5Style,
    h6: classes.h6Style,
    p: classes.pStyle
  };

  return (
    <div ref={ref} className={textCenter ? classes.textCenter : ""}>
      <div className={classes.relativeInlineFlex}>
        <Tag
          initial={animateOn && isDesktop ? "initial" : "animate"}
          animate={animateOn && isDesktop ? controlsText : ""}
          variants={textRevealVariants}
          className={`${tagStyles[tag]} ${className}`}
          {...props}
        >
          {text}
        </Tag>
        <motion.div
          initial="initial"
          animate={animateOn && isDesktop ? controlsWand : ""}
          variants={wandAnimation}
          className={classes.absoluteTopRight}
        >
          <img
            className={classes.imgWand}
            src={wandSrc}
            width={wandSize}
            alt="Magic Wand"
          />
        </motion.div>
      </div>
    </div>
  );
}
