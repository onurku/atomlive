import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/legacy/image";
import NextLink from "next/link";

import { makeStyles } from "@mui/styles";
import { common } from "@mui/material/colors";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
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
    paddingTop: 50,
    paddingBottom: 50
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
    color: Color.hex.greyblue,
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
    marginTop: "24px",
    justifyContent: "center"
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
    fontWeight: 800,
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
      title: "English/Spanish",
      titleShort: "Spanish",
      flag: `https://flagcdn.com/flags/w1160/${countryNames[
        "Spain"
      ].code.toLowerCase()}.webp`,
      decorativeImage:
        "https://atomproduction.s3.amazonaws.com/public/atom/goldilocks_and_the_three_bears/jpg/500x280/4.jpg",
      bookname: "Goldilocks and The Three Bears",
      sub: `The moral lesson behind "Goldilocks and the Three Bears" is the importance of respecting others' property and boundaries. Goldilocks enters the bears' home without permission, consumes their food, and disrupts their belongings. Her actions lead to consequences when the bears return. The story teaches children about the values of respect, responsibility, and not trespassing on others' spaces, emphasizing the consequences of one's actions when they don't follow these principles.`,
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/books/goldilocks-and-the-three-bears`
    },
    {
      title: "English/French",
      titleShort: "French",
      flag: `https://flagcdn.com/flags/w1160/${countryNames[
        "France"
      ].code.toLowerCase()}.webp`,
      decorativeImage:
        "https://atomproduction.s3.amazonaws.com/public/diveo_media/a_fun_walk/jpg/1280x800/5.jpg",
      bookname: "A Fun Walk",
      sub: "One day, a curious wombat goes for a walk. Along the way, they meet strange animals with important life lessons. Find out what each animal teaches the wombat in this wild and wacky adventure!",
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/books/a-fun-walk`
    },
    {
      title: "English/German",
      titleShort: "German",
      flag: `https://flagcdn.com/flags/w1160/${countryNames[
        "Germany"
      ].code.toLowerCase()}.webp`,
      decorativeImage:
        "https://atomproduction.s3.amazonaws.com/public/diveo_media/a_fun_walk/jpg/1280x800/2.jpg",
      bookname: "A Fun Walk",
      sub: "One day, a curious wombat goes for a walk. Along the way, they meet strange animals with important life lessons. Find out what each animal teaches the wombat in this wild and wacky adventure!",
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/books/a-fun-walk`
    },
    {
      title: "English/Russian",
      titleShort: "Russian",
      flag: `https://flagcdn.com/flags/w1160/${countryNames[
        "Russian Federation"
      ].code.toLowerCase()}.webp`,
      decorativeImage:
        "https://atomproduction.s3.amazonaws.com/public/diveo_media/a_fun_walk/jpg/1280x800/10.jpg",
      bookname: "A Fun Walk",
      sub: "One day, a curious wombat goes for a walk. Along the way, they meet strange animals with important life lessons. Find out what each animal teaches the wombat in this wild and wacky adventure!",
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/books/a-fun-walk`
    },
    {
      title: "English/Arabic",
      titleShort: "Arabic",
      flag: `https://flagcdn.com/flags/w1160/${countryNames[
        "Egypt"
      ].code.toLowerCase()}.webp`,
      decorativeImage:
        "https://atomproduction.s3.amazonaws.com/public/atom/the_elves_and_the_shoemaker/jpg/500x280/3.jpg",
      bookname: "The Elves and the Shoemaker",
      sub: "The moral value behind the story is the importance of kindness, hard work, and helping others. In the story, the shoemaker and his wife show generosity by providing shoes for the needy elves, who then repay the kindness by making exquisite shoes for the shoemaker. This tale teaches the virtues of selflessness and the idea that good deeds can be rewarded in unexpected ways. It also emphasizes the notion that helping those in need can lead to positive outcomes for both the giver and receiver.",
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/books/the-elves-and-the-shoemaker`
    },
    {
      title: "English/Turkish",
      titleShort: "Turkish",
      flag: "/static/new-home/flags/turkey.svg",
      decorativeImage:
        "https://atomproduction.s3.amazonaws.com/public/atom/the_frog_prince/jpg/500x280/3.jpg",
      bookname: "The Frog Prince",
      sub: "This book teaches 2 moral lessons. First of all, when we make a promise to someone, we have to keep it, no matter how hard it is. We should never promise someone without the intent to keep it. The second lesson is never judge a person based on his or her appearance. What is on the inside is more important than what is on the outside.",
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/books/the-frog-prince`
    },
    {
      title: "English/Vietnamese",
      titleShort: "Vietnamese",
      flag: "/static/new-home/flags/vietnam.svg",
      decorativeImage:
        "https://atomproduction.s3.amazonaws.com/public/atom/little_red_riding_hood/jpg/500x280/3.jpg",
      bookname: "Little Red Riding Hood",
      sub: "One common lesson to teach a child is the importance of caution and not talking to strangers. Little Red Riding Hood encounters a wolf who deceives her, leading to a dangerous situation. The story emphasizes the need for children to be aware of potential dangers and to exercise caution when interacting with unfamiliar individuals. Strangers might harm us when we give them personal information, such as where we live, and where are are going.",
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/books/little-red-riding-hood`
    }
    // {
    //   title: "English/Hindi",
    //   titleShort: "Hindi",
    //   flag: `https://flagcdn.com/flags/w1160/${countryNames[
    //     "India"
    //   ].code.toLowerCase()}.webp`,
    //   decorativeImage: "/static/new-home/person/turkish.png",
    //   bookname: "The Elves and the Shoemaker",
    //   sub: 'Join us for a Magical Storytime with Maria! Featured Story: "The Elves and The Shoemaker" What Kids Think of Atom'
    // },
    // {
    //   title: "English/Hindi",
    //   titleShort: "Gujarati",
    //   flag: `https://flagcdn.com/flags/w1160/${countryNames[
    //     "India"
    //   ].code.toLowerCase()}.webp`,
    //   decorativeImage: "/static/new-home/person/turkish.png",
    //   bookname: "The Elves and the Shoemaker",
    //   sub: 'Join us for a Magical Storytime with Maria! Featured Story: "The Elves and The Shoemaker" What Kids Think of Atom'
    // }
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
                animateOn={false}
              />
              <Text
                className={classes.textSubtitle}
                text="Switch between languages easily as you read"
                wandSrc="/static/new-home/magic-wand.svg"
                tag="h5"
                wandSize={48}
                animateOn={false}
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
                      width={500}
                      height={280}
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
                      <NextLink href={content[currentActive].url}>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                        >
                          Read Now
                        </Button>
                      </NextLink>
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
