import { useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { isMobile } from "mobile-device-detect";
import useIsDesktop from "@/components/hooks/useIsDesktop";

//Library Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { common, grey } from "@mui/material/colors";
import { createStyles, makeStyles } from "@mui/styles";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import Grid from "@mui/material/Grid";
import NextLink from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// App components
import Calendly from "@/components/ui/Calendly";
import Color from "@/components/styles/color";
import { countryNames } from "@/components/ui/Navbar/countries";
import ExternalLayout from "@/components/layouts/ExternalLayout";
import ExternalLayoutMobile from "@/components/layouts/ExternalLayoutMobile";
import { LayoutContext } from "@/components/contexts/LayoutContext";
import Text from "@/components/ui/Text";
import { bounceTransition } from "@/components/ui/Transition";
import Wave from "@/components/ui/Wave";
import Youtube from "@/components/ui/Youtube";
import JoinOurCommunity from "@/components/pages/landing/JoinOurCommunity";
import Testimonial from "@/components/pages/landing/Testimonials";
import Language from "@/components/pages/landing/Languages";

const styles = makeStyles((theme) =>
  createStyles({
    aspectRatio: {
      aspectRatio: "819 / 460",
      borderRadius: theme.spacing(3),
      overflow: "hidden"
    },
    heroBackground: {
      backgroundColor: Color.hex.purple,
      color: common.black
    },
    heroSubtitle: {
      paddingTop: theme.spacing(3),
      color: common.black,
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.2rem"
      }
    },
    heroThird: {
      background: Color.hex.beige,
      position: "relative"
    },

    heroTitle: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "2.4rem"
      },
      fontWeight: "bold",
      paddingBottom: theme.spacing(4),
      paddingTop: theme.spacing(4)
    },
    heroVideo: {
      marginTop: 50,
      maxWidth: 819,
      margin: "auto",
      [theme.breakpoints.down("sm")]: {
        marginTop: 25,
        width: `calc(100% - 40px)`
      }
    },

    icon: {
      alignSelf: "center",
      fontSize: 48,
      color: Color.hex.brightpurple,
      paddingTop: theme.spacing(3)
    },
    atom: {
      color: common.black,
      paddingBottom: theme.spacing(10),
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.6rem",
        textAlign: "center",
        paddingBottom: theme.spacing(5)
      }
    },
    books: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(10),
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.6rem",
        textAlign: "center",
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        paddingLeft: theme.spacing(2),
        paddingright: theme.spacing(2)
      }
    },
    castle: {
      backgroundImage: "url('/static/new-home/hero-background-cloud.png')",
      backgroundSize: "cover",
      // backgroundPosition: "bottom -60px center",
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
    decorativeImage: {
      width: "100%",
      aspectRatio: 716 / 20,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundImage: "url('/static/new-home/decorative-image.svg')"
    },
    decorativeWraper: {
      maxWidth: "90%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    hiddenOnSmallScreens: {
      [theme.breakpoints.down("md")]: {
        display: "none"
      }
    },
    family: {
      paddingBottom: theme.spacing(10),
      paddingTop: theme.spacing(10),
      background: Color.hex.medblue,
      // borderRadius: "50%/100px 100px 0 0",
      borderRadius: "200px 4px 200px 4px",
      borderTop: "4px solid black",
      borderBottom: "4px solid black",
      textTransform: "uppercase",
      lineHeight: 1.5,
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        paddingLeft: theme.spacing(5),
        paddingright: theme.spacing(5)
      }
    },
    freeTag: {
      position: "relative",
      paddingTop: theme.spacing(2)
    },
    imageWrapper: {
      border: `${theme.spacing(1)} solid ${Color.hex.lightblue}`,
      overflow: "hidden",
      borderRadius: theme.spacing(3),
      display: "inline-flex",
      marginTop: theme.spacing(8)
    },
    motionDiv: {
      position: "absolute",
      zIndex: 10,
      aspectRatio: 150 / 258
    },
    quotesHeaderContainer: {
      backgroundColor: Color.hex.pink,
      color: common.black,
      paddingBottom: theme.spacing(15),
      paddingTop: theme.spacing(10)
    },
    quotesContainer: {
      color: grey[300]
    },
    quotes: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      paddingBottom: theme.spacing(10)
    },
    textHero: {
      color: Color.hex.lightpurple,
      paddingBottom: theme.spacing(5)
    },

    textOutlineHero: {
      color: Color.hex.yellow,
      fontWeight: 800,
      textShadow: `-1px -1px 0 ${common.black}, 1px -1px 0 ${common.black}, -1px 1px 0 ${common.black}, 1px 1px 0 ${common.black}`
    },
    textLive: {
      color: common.white
    },
    textOutlineLive: {
      color: Color.hex.brightlavender,
      fontWeight: 800,
      textShadow: `-1px -1px 0 ${common.black}, 1px -1px 0 ${common.black}, -1px 1px 0 ${common.black}, 1px 1px 0 ${common.black}`
    },
    textOutlineParents: {
      color: Color.hex.brightlavender,
      fontWeight: 800,
      textShadow: `-1px -1px 0 ${common.black}, 1px -1px 0 ${common.black}, -1px 1px 0 ${common.black}, 1px 1px 0 ${common.black}`
    },
    textOutlineLanguage: {
      color: Color.hex.brightpurple,
      fontWeight: 800,
      textShadow: `-1px -1px 0 ${common.black}, 1px -1px 0 ${common.black}, -1px 1px 0 ${common.black}, 1px 1px 0 ${common.black}`
    },
    textLanguage: {
      color: common.white
    },
    textOutlineStorytime: {
      color: Color.hex.brightblue,
      fontWeight: 800,
      textShadow: `-1px -1px 0 ${common.black}, 1px -1px 0 ${common.black}, -1px 1px 0 ${common.black}, 1px 1px 0 ${common.black}`
    },
    textStorytime: {
      color: Color.hex.greyblue
    },
    wave: {
      position: "absolute",
      bottom: 0,
      display: "flex",
      width: "100%"
    },
    weve: {
      paddingBottom: theme.spacing(10),
      [theme.breakpoints.down("xs")]: {
        textAlign: "left",
        paddingLeft: theme.spacing(2),
        paddingright: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        fontSize: "1.2rem"
      }
    }
  })
);

const Landing = () => {
  const classes = styles();
  const { changeNavTheme } = useContext(LayoutContext);

  const isDesktop = useIsDesktop();
  const bull = <span className={classes.bullet}>•</span>;
  const shocked = (
    <span className={classes.bullet}>
      <img
        className={classes.emoji}
        src="/static/img/home/emojis/emoji-shocked.png"
        alt="shocked emoji"
      />
    </span>
  );
  const [alignment, setAlignment] = useState("en");
  const [introVideo, setIntroVideo] = useState("");

  const homepage_hero = `/static/info/mask-switch-small.gif`;
  const homepage_language_switch =
    "https://uploads-ssl.webflow.com/5fd99a2f6eb4655d66b77a18/6310f3179cbb9c7c2b6e2784_language-switch-merged.gif";
  const homepage_mask_single =
    "https://atomproduction.s3.amazonaws.com/public/website/info/atom-reading-bilingual-rachel.jpg";

  // const waveColorsFirst = [
  //   blueGrey[100],
  //   blue[300],
  //   blue[600],
  //   Color.hex.liberty
  // ];
  // const waveColorsFirst = ["#BE95C4", "#9F86C0", "#5E548E", "#231942"];
  const waveColorsFirst = [
    Color.hex.rose,
    Color.hex.grape,
    Color.hex.greyblue,
    Color.hex.medblue
  ];
  const waveColorsSecond = [
    "#5E548E",
    "#9F86C0",
    Color.hex.medblue,
    common.white
  ];
  const waveColorsLive = [
    Color.hex.medblue,
    "#9F86C0",
    "#5E548E",
    Color.hex.purple
  ];
  const waveColorsLanguages = [
    Color.hex.medblue,
    "#9F86C0",
    "#5E548E",
    Color.hex.purple
  ];
  const waveColorsParents = [
    "#5E548E",
    "#9F86C0",
    Color.hex.medblue,
    Color.hex.salmon
  ];
  const waveColorsFun = ["#5E548E", "#9F86C0", Color.hex.medblue, common.white];
  const waveColorsCommunity = [
    "#5E548E",
    "#9F86C0",
    Color.hex.medblue,
    Color.hex.lightnavy
  ];
  const handleChange = useCallback((e, newLang) => {
    e.stopPropagation();

    if (newLang === "en") {
      setIntroVideo("");
    } else {
      setIntroVideo(`-${newLang}`);
    }
    setAlignment(newLang);
  });

  useEffect(() => {
    changeNavTheme("onDarkBackground");
    return () => {
      changeNavTheme("onLightBackground");
    };
  }, [changeNavTheme]);

  return (
    <>
      <Grid
        container
        align="center"
        justifyContent="center"
        sx={{ backgroundColor: Color.hex.purple }}
        className={classes.castle}
      >
        <Grid
          item
          xs={11}
          sx={{
            pt: { xs: 10, sm: 10, md: 12 }
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              mx: { xs: 3, md: 6 }
            }}
          >
            <Text
              className={classes.textOutlineHero}
              text="Bored Kids,"
              wandSrc="/static/new-home/magic-wand.svg"
              tag="h3"
              animateOn={true}
            />
            <Text
              className={classes.textOutlineHero}
              text="Turned Bilingual Superstars"
              wandSrc="/static/new-home/magic-wand.svg"
              tag="h3"
              animateOn={true}
            />
            <Text
              className={classes.textHero}
              text="Read the same story, twice, in a different language"
              wandSrc="/static/new-home/magic-wand.svg"
              tag="h5"
              animateOn={true}
            />
            {/* <div className={classes.aspectRatio}>
              <Youtube
                poster="https://atomproduction.s3.amazonaws.com/public/website/info/about/9.jpg"
                width="100%"
                height="100%"
                embedId="ZfqzB61A4lc"
                title="Atom is a platform for multilingual, interactive books"
                style={{
                  border: 0
                }}
              />
            </div> */}
            <div className={classes.heroVideo}>
              <Box className="relative">
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
                  style={{ bottom: "-50px", left: "-100px", width: "150px" }}
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
                      poster="https://atomproduction.s3.amazonaws.com/public/website/info/about/9.jpg"
                      width={720}
                      height="100%"
                      embedId="ZfqzB61A4lc"
                      title="Atom is a platform for multilingual, interactive books"
                    />
                  </div>
                  <div className={classes.decorativeWraper}>
                    <div className={classes.decorativeImage}></div>
                  </div>
                </motion.div>
              </Box>
            </div>
          </Box>

          <NextLink href="/books/" passHref>
            <Button
              sx={{
                marginTop: 10
              }}
              variant="contained"
              size="large"
              color="primary"
              align="center"
            >
              Browse The Books
            </Button>
          </NextLink>
        </Grid>
        <Grid item xs={15} sx={{ pt: 5 }}>
          <Wave waveColors={waveColorsSecond} />
        </Grid>
      </Grid>
      <Grid
        container
        align="center"
        justifyContent="center"
        sx={{
          background: `linear-gradient(180deg, ${common.white} 0%, #DDF0F8 52.26%, #FFF 97.57%)`
        }}
      >
        <Grid item xs={12}>
          <Box sx={{ pt: 10, pb: 2 }}>
            <Stack
              direction="row"
              sx={{ position: "relative", display: "inline-flex" }}
            >
              <img
                className={classes.freeTag}
                src="/static/new-home/free-tag.svg"
                width={48}
                height={44}
                alt="Free Weekend Bilingual Storytimes at Atom"
              />
              <Text
                className={classes.textOutlineStorytime}
                text="Bilingual Storytimes!"
                wandSrc="/static/new-home/magic-wand.svg"
                tag="h2"
                animateOn={false}
              />
            </Stack>
            <Text
              className={classes.textStorytime}
              text="Screen time, but better, because we talk to each other"
              wandSrc="/static/new-home/magic-wand.svg"
              tag="h5"
              animateOn={false}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          <Stack direction="row-reverse" sx={{ px: 6 }}>
            <FormatQuoteRoundedIcon
              sx={{ ml: -1, fontSize: 48, color: Color.hex.brightblue }}
            />
            <Typography sx={{ pt: 6 }} gutterBottom variant="body1">
              If we can make screen time something that’s valuable and
              connecting, I far prefer that as a mom [than] to just passively
              put kids in front of screens.
            </Typography>
          </Stack>
          <Typography sx={{ pb: 6 }} variant="body2">
            Randi Zuckerberg, Founder and CEO, Zuckerberg Media
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              border: `8px solid ${Color.hex.lightblue}`,
              borderRadius: 8,
              mt: { xs: 0, md: 5 },
              mb: 8,
              mx: 10,
              overflow: "hidden"
            }}
          >
            <Calendly width="100%" height={640} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ px: 6, pb: 10 }}>
            <NextLink href="https://www.calendly.com/atomlive" passHref>
              <Button color="secondary" size="large" variant="contained">
                Let's Read Together
              </Button>
            </NextLink>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Wave waveColors={waveColorsLive} />
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        sx={{
          backgroundColor: Color.hex.purple
        }}
      >
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              pt: 10,
              pb: 2,
              textAlign: "center"
            }}
          >
            <Text
              className={classes.textOutlineLive}
              text="Live Inside the Books"
              wandSrc="/static/new-home/magic-wand.svg"
              tag="h1"
              animateOn={false}
            />
            <Text
              className={classes.textLive}
              text="Kids take the lead while reading"
              wandSrc="/static/new-home/magic-wand.svg"
              tag="h5"
              wandSize={48}
              animateOn={false}
            />
            <Box className={classes.imageWrapper}>
              <Image
                loader={() => homepage_mask_single}
                src={homepage_mask_single}
                width={1080}
                height={(1080 / 1600) * 840}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Grid container spacing={3} sx={{ height: "inherit" }}>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  background: common.white,
                  borderRadius: 3,
                  py: 5,
                  px: { xs: 10, sm: 4 },
                  textAlign: "left",
                  height: "100%"
                }}
              >
                <Typography gutterBottom variant="h4">
                  Social and emotional learning
                </Typography>
                <Typography gutterBottom variant="body1">
                  Talking about the story is a great way to share, discuss
                  feelings, and bolster reading social skills. Ask your child
                  what they think of the story, or why a character made a
                  certain decision. Ask your child what they would do
                  differently in these situations.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  background: common.white,
                  borderRadius: 3,
                  py: 5,
                  px: { xs: 10, sm: 4 },
                  textAlign: "left",
                  height: "100%"
                }}
              >
                <Typography gutterBottom variant="h4">
                  Educational screen time, better together
                </Typography>
                <Typography gutterBottom variant="body1">
                  Reading is a fun and enjoyable way to spend family time.
                  Bedtime is not necessarily the only time to read with your
                  child. Consider reading together before dinner, after school,
                  or any time in a cozy spot in the house. Make it part of your
                  family's daily routine, and before long, it will most
                  certainly become an activity that your child looks forward to.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <NextLink href="/books/" passHref>
              <Button
                component="a"
                variant="outlined"
                size="large"
                color="primary"
              >
                Browse the Books
              </Button>
            </NextLink>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Wave waveColors={waveColorsFun} />
        </Grid>
      </Grid>
      <Grid
        sx={{ backgroundColor: common.white }}
        container
        justifyContent="center"
        align="center"
      >
        <Grid item xs={12}>
          <Language />
        </Grid>
        <Grid item xs={12}>
          <Wave waveColors={waveColorsParents} />
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        align="center"
        sx={{ backgroundColor: Color.hex.salmon }}
      >
        <Grid
          item
          xs={12}
          sx={{
            py: 8,
            textAlign: "center"
          }}
        >
          <Box
            sx={{
              pb: 8,
              textAlign: "center"
            }}
          >
            <Text
              className={classes.textOutlineParents}
              text="What parents are saying!"
              wandSrc="/static/new-home/magic-wand.svg"
              tag="h2"
              animateOn={false}
            />
          </Box>
          <Testimonial />
        </Grid>
        <Grid item xs={12}>
          <Wave waveColors={waveColorsCommunity} />
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        align="center"
        sx={{ backgroundColor: Color.hex.lightnavy }}
      >
        <Grid
          item
          xs={12}
          sx={{
            textAlign: "center"
          }}
        >
          <JoinOurCommunity />
        </Grid>
      </Grid>
    </>
  );
};

Landing.layout = ExternalLayout;

const LandingMobile = () => {
  return (
    <>
      <span>stories</span>
    </>
  );
};

LandingMobile.layout = ExternalLayoutMobile;

const LandingPage = isMobile ? Landing : Landing;

export default LandingPage;
