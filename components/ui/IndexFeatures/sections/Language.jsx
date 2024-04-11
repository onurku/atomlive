import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/legacy/image";
import Link from "next/link";

import { makeStyles } from "@mui/styles";
import { common } from "@mui/material/colors";
import Typography from "@mui/material/Typography";

import { Button } from "../components/Button";
import Text from "@/components/ui/Text";
import { bounceAnimatePresence } from "@/components/ui/Transition";
import useIsDesktop from "@/components/hooks/useIsDesktop";
import { countryNames } from "@/components/ui/Navbar/countries";
import Color from "@/components/styles/color";

const bounceTransitionItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 1
    }
  }
};

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const useStyles = makeStyles({
  heroSection: {
    overflow: "hidden",
    paddingTop: "50px",
    paddingBottom: "50px",
    background:
      "url(/static/new-home/story-time-wave-up.svg) top -1px center repeat-x, url(/static/new-home/story-time-wave-down.svg) bottom -1px center repeat-x",
    "@media (max-width: 768px)": {
      backgroundSize: "100%"
    }
  },
  textCenter: {
    textAlign: "center",
    marginBottom: "56px"
  },
  flexWrapCenter: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "12px",
    marginTop: "56px",
    marginBottom: "56px"
  },
  buttonStyle: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "8px",
    padding: "12px",
    borderRadius: "20px",
    border: "1px solid #F4F4F5",
    backgroundColor: "transparent",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    width: "calc(33.333% - 12px)",
    "@media (min-width: 600px)": {
      width: "136px"
    }
  },
  activeButton: {
    borderColor: Color.hex.brightblue
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    padding: 12
  },
  contentBox: {
    display: "flex",
    flexDirection: "column",
    gap: 12
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    fontFamily: "Petrona",
    "@media (max-width: 600px)": {
      fontSize: "24px"
    }
  },
  titleShort: {
    fontSize: "16px",
    fontWeight: "500",
    marginTop: "8px",
    "@media (max-width: 600px)": {
      fontSize: "14px"
    }
  },
  subTitle: {
    fontSize: "24px",
    fontWeight: "semibold",
    fontFamily: "Petrona",
    color: "#71717A",
    "@media (max-width: 600px)": {
      fontSize: "20px"
    }
  },
  description: {
    fontSize: "18px",
    fontWeight: "medium"
  },
  buttonContainer: {
    display: "flex",
    marginTop: "24px"
  },
  minButtonWidth: {
    minWidth: "272px"
  },
  gridLayout: {
    display: "grid",
    gridTemplateColumns: "1fr",
    alignItems: "center",
    gap: "24px",
    "@media (min-width: 768px)": {
      gridTemplateColumns: "repeat(2, 1fr)"
    }
  },
  outlinePurple: {
    color: Color.hex.brightpurple,
    textShadow: `-1px -1px 0 ${common.black}, 1px -1px 0 ${common.black}, -1px 1px 0 ${common.black}, 1px 1px 0 ${common.black}`
  },
  textSubtitle: {
    marginTop: "1rem",
    color: Color.hex.greyblue
  }
});

const Language = () => {
  const isDesktop = useIsDesktop();
  const classes = useStyles();
  const [currentActive, setCurrentActive] = useState(0);

  const content = [
    {
      title: "English",
      titleShort: "English",
      flag: `https://flagcdn.com/flags/w1160/${countryNames[
        "United States"
      ].code.toLowerCase()}.webp`,
      decorativeImage: "/static/new-home/person/turkish.png",
      bookname: "The Elves and the Shoemaker",
      sub: 'Join us for a Magical Storytime with Maria! Featured Story: "The Elves and The Shoemaker" What Kids Think of Atom'
    },
    {
      title: "English/Spanish",
      titleShort: "Spanish",
      flag: `https://flagcdn.com/flags/w1160/${countryNames[
        "Spain"
      ].code.toLowerCase()}.webp`,
      decorativeImage: "/static/new-home/person/turkish.png",
      bookname: "The Elves and the Shoemaker",
      sub: 'Join us for a Magical Storytime with Maria! Featured Story: "The Elves and The Shoemaker" What Kids Think of Atom'
    },
    {
      title: "English/French",
      titleShort: "French",
      flag: `https://flagcdn.com/flags/w1160/${countryNames[
        "France"
      ].code.toLowerCase()}.webp`,
      decorativeImage: "/static/new-home/person/turkish.png",
      bookname: "The Elves and the Shoemaker",
      sub: 'Join us for a Magical Storytime with Maria! Featured Story: "The Elves and The Shoemaker" What Kids Think of Atom'
    },
    {
      title: "English/German",
      titleShort: "German",
      flag: `https://flagcdn.com/flags/w1160/${countryNames[
        "Germany"
      ].code.toLowerCase()}.webp`,
      decorativeImage: "/static/new-home/person/turkish.png",
      bookname: "The Elves and the Shoemaker",
      sub: 'Join us for a Magical Storytime with Maria! Featured Story: "The Elves and The Shoemaker" What Kids Think of Atom'
    },
    {
      title: "English/Russian",
      titleShort: "Russian",
      flag: `https://flagcdn.com/flags/w1160/${countryNames[
        "Russian Federation"
      ].code.toLowerCase()}.webp`,
      decorativeImage: "/static/new-home/person/turkish.png",
      bookname: "The Elves and the Shoemaker",
      sub: 'Join us for a Magical Storytime with Maria! Featured Story: "The Elves and The Shoemaker" What Kids Think of Atom'
    },
    {
      title: "English/Arabic",
      titleShort: "Arabic",
      flag: `https://flagcdn.com/flags/w1160/${countryNames[
        "Egypt"
      ].code.toLowerCase()}.webp`,
      decorativeImage: "/static/new-home/person/turkish.png",
      bookname: "The Elves and the Shoemaker",
      sub: 'Join us for a Magical Storytime with Maria! Featured Story: "The Elves and The Shoemaker" What Kids Think of Atom'
    },
    {
      title: "English/Turkish",
      titleShort: "Turkish",
      flag: "/static/new-home/flags/turkey.svg",
      decorativeImage: "/static/new-home/person/turkish.png",
      bookname: "The Elves and the Shoemaker",
      sub: 'Join us for a Magical Storytime with Maria! Featured Story: "The Elves and The Shoemaker" What Kids Think of Atom'
    },
    {
      title: "English/Vietnamese",
      titleShort: "Vietnamese",
      flag: "/static/new-home/flags/vietnam.svg",
      decorativeImage: "/static/new-home/person/turkish.png",
      bookname: "The Elves and the Shoemaker",
      sub: 'Join us for a Magical Storytime with Maria! Featured Story: "The Elves and The Shoemaker" What Kids Think of Atom'
    },
    {
      title: "English/Hindi",
      titleShort: "Hindi",
      flag: `https://flagcdn.com/flags/w1160/${countryNames[
        "India"
      ].code.toLowerCase()}.webp`,
      decorativeImage: "/static/new-home/person/turkish.png",
      bookname: "The Elves and the Shoemaker",
      sub: 'Join us for a Magical Storytime with Maria! Featured Story: "The Elves and The Shoemaker" What Kids Think of Atom'
    },
    {
      title: "English/Hindi",
      titleShort: "Gujarati",
      flag: `https://flagcdn.com/flags/w1160/${countryNames[
        "India"
      ].code.toLowerCase()}.webp`,
      decorativeImage: "/static/new-home/person/turkish.png",
      bookname: "The Elves and the Shoemaker",
      sub: 'Join us for a Magical Storytime with Maria! Featured Story: "The Elves and The Shoemaker" What Kids Think of Atom'
    }
  ];
  return (
    <>
      <div className={classes.heroSection}>
        <div className="container-full">
          <div className="container-section">
            <div className={classes.textCenter}>
              <Text
                className={classes.outlinePurple}
                text="The fun comes in many languages"
                wandSrc="/static/new-home/magic-wand.svg"
                tag="h2"
                animateOn={true}
              />
              <Text
                className={classes.textSubtitle}
                text="Switch between languages easily as you read"
                wandSrc="/static/new-home/magic-wand.svg"
                tag="h3"
                wandSize={48}
                animateOn={true}
              />
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={isDesktop && containerVariants}
              viewport={{ once: true, margin: "-100px" }}
              className={classes.flexWrapCenter}
            >
              {content.map((item, index) => (
                <motion.button
                  variants={bounceTransitionItem}
                  key={index}
                  onClick={() => setCurrentActive(index)}
                  className={`${classes.buttonStyle} ${
                    index === currentActive ? classes.activeButton : ""
                  }`}
                >
                  <div>
                    {item.flag && (
                      <Image
                        src={item.flag}
                        width={24}
                        height={24}
                        alt={`${item.titleShort} flag`}
                      />
                    )}
                    {item.name && (
                      <Typography variant="body1">{item.name}</Typography>
                    )}
                    <Typography sx={{ pt: 1 }} variant="body1">
                      {item.titleShort}
                    </Typography>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            <div className={classes.buttonContainer}>
              <AnimatePresence exitBeforeEnter>
                <motion.div
                  key={content[currentActive].title}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={bounceAnimatePresence}
                  className={classes.gridLayout}
                >
                  <div className={classes.imageWrapper}>
                    <Image
                      src={content[currentActive].decorativeImage}
                      width={400}
                      height={400}
                      alt={content[currentActive].title}
                    />
                  </div>
                  <div className={classes.contentBox}>
                    <h3 className={classes.title}>
                      {content[currentActive].title}
                    </h3>
                    <h4 className={classes.subTitle}>
                      {content[currentActive].bookname}
                    </h4>
                    <p className={classes.description}>
                      {content[currentActive].sub}
                    </p>
                    <div className={classes.buttonContainer}>
                      <Button
                        className={classes.minButtonWidth}
                        isRounded
                        size="lg"
                      >
                        <Link href="/books">
                          <a>Browse The Books</a>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Language;
