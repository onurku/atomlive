import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import Image from "next/legacy/image";
import Link from "next/link";

import { Button } from "../components/Button";
import Text from "@/components/ui/Text";
import {
  bounceTransitionItem,
  containerVariants
} from "@/components/ui/Transition";
import useIsDesktop from "@/components/hooks/useIsDesktop";
import Color from "@/components/styles/color";
import { common } from "@mui/material/colors";

const useStyles = makeStyles({
  heroSection: {
    backgroundImage:
      "url('/static/new-home/story-time-wave-up.svg'), url('/static/new-home/story-time-wave-down.svg')",
    backgroundSize: "auto, auto",
    backgroundPosition: "top -1px center, bottom -1px center",
    backgroundRepeat: "repeat-x, repeat-x",
    overflow: "hidden",
    marginTop: -2,
    backgroundColor: "#0EA5E9",
    "@media (max-width: 768px)": {
      backgroundSize: "100%"
    },
    "@media (min-width: 640px)": {
      paddingTop: 200,
      paddingBottom: 176
    }
  },
  textCenter: {
    textAlign: "center",
    marginBottom: "56px"
  },
  motionDiv: {
    position: "relative",
    width: "1027px",
    maxWidth: "100%",
    aspectRatio: "1027 / 539",
    marginBottom: "24px"
  },
  gridLayout: {
    display: "grid",
    gap: "24px",
    gridTemplateColumns: "1fr",
    "@media (min-width: 768px)": {
      gridTemplateColumns: "repeat(2, 1fr)"
    }
  },
  contentBox: {
    height: "100%",
    padding: "32px", // sm:p-8
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    "@media (max-width: 640px)": {
      padding: "16px"
    }
  },
  contentTitle: {
    fontSize: "24px",
    lineHeight: "1.25",
    marginBottom: "16px",
    fontWeight: "bold",
    fontFamily: "Petrona",
    "@media (min-width: 600px)": {
      fontSize: "32px"
    }
  },
  contentText: {
    fontSize: "18px",
    color: "#71717A"
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    marginTop: "56px"
  },
  minButtonWidth: {
    minWidth: "272px",
    marginTop: "24px"
  },
  textSky100: {
    color: "#E0F2FE"
  },
  outlinePink: {
    color: Color.hex.brightpink,
    textShadow: `-1px -1px 0 ${common.black}, 1px -1px 0 ${common.black}, -1px 1px 0 ${common.black}, 1px 1px 0 ${common.black}`
  },
  textSubtitle: {
    marginTop: "1rem",
    color: Color.hex.brightgreen
  }
});

const LiveInsideTheBook = () => {
  const isDesktop = useIsDesktop();
  const classes = useStyles();
  const content = [
    {
      title: "Social and emotional learning",
      content:
        "Talking about the story is a great way to share, discuss feelings, and bolster reading social skills. Ask your child what they think of the story, or why a character made a certain decision. Ask your child what they would do differently in these situations."
    },
    {
      title: "Educational screen time, better together",
      content:
        "Reading is a fun and enjoyable way to spend family time. Bedtime is not necessarily the only time to read with your child. Consider reading together before dinner, after school, or any time in a cozy spot in the house. Make it part of your family's daily routine, and before long, it will most certainly become an activity that your child looks forward to."
    }
  ];
  return (
    <div className={classes.heroSection}>
      <div className="container-full">
        <div className="container-section">
          <div className={classes.textCenter}>
            <Text
              className={classes.outlinePink}
              text="Live Inside the Books"
              wandSrc="/static/new-home/magic-wand.svg"
              tag="h2"
              animateOn={true}
            />
            <Text
              className={classes.textSubtitle}
              text="Encourage your child to take the lead while reading"
              wandSrc="/static/new-home/magic-wand.svg"
              tag="h5"
              wandSize={48}
              animateOn={true}
            />
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={isDesktop && bounceTransitionItem}
            className={classes.motionDiv}
          >
            <Image
              className="rounded-3xl"
              layout="fill"
              src="https://atomproduction.s3.amazonaws.com/public/website/info/atom-reading-bilingual-rachel.jpg"
              alt="Princess"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={isDesktop && containerVariants}
            viewport={{ once: true, margin: "-50px" }}
            className={classes.gridLayout}
          >
            {content.map((item, index) => (
              <motion.div
                variants={isDesktop && bounceTransitionItem}
                key={index}
                className={classes.contentBox}
              >
                <h3 className={classes.contentTitle}>{item.title}</h3>
                <p className={classes.contentText}>{item.content}</p>
              </motion.div>
            ))}
          </motion.div>
          <div className={classes.flexCenter}>
            <Button className={classes.minButtonWidth} isRounded size="lg">
              <Link href="/books">
                <a>Browse The Books</a>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveInsideTheBook;
