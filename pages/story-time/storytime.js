import { useContext, useEffect } from "react";
//Library Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { common } from "@mui/material/colors";
import Container from "@mui/material/Container";
import { createStyles, makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import { isMobile } from "mobile-device-detect";
import "@fontsource/lustria";
import NextLink from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// App components
import ExternalLayout from "@/components/layouts/ExternalLayout";
import ExternalLayoutMobile from "@/components/layouts/ExternalLayoutMobile";
import { LayoutContext } from "@/components/contexts/LayoutContext";
import MainTitle from "@/components/ui/MainTitle";
import Color from "@/components/styles/color";

const styles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingBottom: theme.spacing(10),
      paddingTop: theme.spacing(5)
    },
    title: {
      paddingBottom: theme.spacing(5)
    },
    iframe: {
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      position: "absolute",
      border: 0
    }
  })
);

const StoryTime = () => {
  const classes = styles();
  const { changeNavTheme } = useContext(LayoutContext);
  useEffect(() => {
    changeNavTheme("onLightBackground");
    return () => {
      changeNavTheme("onLightBackground");
    };
  }, [changeNavTheme]);

  return (
    <>
      <Grid container className={classes.root} justifyContent="center">
        <Grid item xs={12}>
          <MainTitle text="Story times" />
          <Grid container>
            <Grid item xs={12} md={2}></Grid>
            <Grid item xs={12} md={8} justifyContent="center">
              <Box px={4}>
                <Typography
                  gutterBottom
                  variant="h4"
                  align="center"
                  className={classes.title}
                >
                  It's reading time: Get to know the teachers!
                </Typography>
                <Typography
                  gutterBottom
                  variant="body1"
                  sx={{
                    fontSize: {
                      xs: "1.5rem",
                      md: "1.2rem"
                    }
                  }}
                >
                  Give yourself some free time and allow your child to embark on
                  a wild reading adventure!
                </Typography>
                <Typography
                  gutterBottom
                  variant="body1"
                  sx={{
                    fontSize: {
                      xs: "1.5rem",
                      md: "1.2rem"
                    }
                  }}
                >
                  There's no better way for your child to build language than
                  reading face-to-face with a teacher. Better yet, these classes
                  are bilingual and are taught in Spanish and English.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  pt: { xs: 5, md: 10 },
                  display: "block",
                  margin: "0 auto",
                  width: "100%"
                }}
              >
                <iframe
                  style={{
                    display: "block",
                    margin: "0 auto"
                  }}
                  width="100%"
                  height="310"
                  src="https://www.youtube.com/embed/Ew7-b07APDY"
                  title="Meet Maria!"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                />
                <Stack sx={{ px: { xs: 4, md: 5 } }}>
                  <Typography gutterBottom sx={{ mt: 3 }} variant="h5">
                    Meet Maria, from Dominican Republic!
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    value="Book Class with Maria"
                    href="https://calendly.com/team-atom-maria/story-time"
                  >
                    Book Class With Maria!
                  </Button>
                  <Typography gutterBottom variant="body1">
                    Meet Maria, a multilingual dental student from the Dominican
                    Republic with a passion for teaching. Having been immersed
                    in an English-teaching environment from an early age, Maria
                    brings a unique, hands-on approach to her instruction,
                    drawing on her experiences assisting her mother at her
                    English institute. Join her in interactive storytelling
                    adventures. She looks forward to seeing you there!
                  </Typography>
                  <Typography
                    gutterBottom
                    sx={{ pt: 2 }}
                    variant="body1"
                  ></Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  pt: 10,
                  display: "block",
                  margin: "0 auto",
                  width: "100%"
                }}
              >
                <iframe
                  style={{
                    display: "block",
                    margin: "0 auto"
                  }}
                  width="100%"
                  height="310"
                  src="https://www.youtube.com/embed/z3Mf0iv2Y_M"
                  title="Meet Cindy!"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                />
                <Stack sx={{ px: { xs: 10, md: 5 } }}>
                  <Typography gutterBottom sx={{ mt: 3 }} variant="h5">
                    Meet Cindy, from Nicaragua!
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    value="Book Class with Cindy"
                    href="https://calendly.com/atomlive/story-time-with-cindy"
                  >
                    Book Class With Cindy!
                  </Button>
                  <Typography gutterBottom sx={{ pt: 2 }} variant="body1">
                    Meet Cindy, a seasoned English teacher hailing from
                    Nicaragua with seven years of experience working with
                    children. Cindy brings her personal passions into her work;
                    she is a big fan of music, particularly K-pop, and is a
                    proud member of the BTS Army.
                  </Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  pt: 10,
                  display: "block",
                  margin: "0 auto",
                  width: "100%"
                }}
              >
                <iframe
                  style={{
                    display: "block",
                    margin: "0 auto"
                  }}
                  width="100%"
                  height="310"
                  src="https://www.youtube.com/embed/_mduni8QqOM"
                  title="Meet Miriam!"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                />
                <Stack sx={{ px: { xs: 10, md: 5 } }}>
                  <Typography gutterBottom sx={{ mt: 3 }} variant="h5">
                    Meet Miriam, from Spain!
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    value="Book Class with Miriam"
                    href="https://calendly.com/atomlive/story-time-with-miriam"
                  >
                    Book Class With Miriam!
                  </Button>
                  <Typography gutterBottom sx={{ pt: 2 }} variant="body1">
                    Meet Miriam, teacher from Spain who has been devotedly
                    teaching English to children between ages 3-17 for over a
                    year.
                  </Typography>
                  <Typography gutterBottom sx={{ pt: 2 }} variant="body1">
                    With a wealth of experience working with various age groups,
                    she is skilled at observing children's reactions, gauging
                    their individual needs, and fostering a learning environment
                    where children can grow at their own pace, gaining
                    confidence while having fun.
                  </Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ mt: 10 }}>
                <Box sx={{ display: "block", margin: "0 auto", width: "100%" }}>
                  <iframe
                    style={{
                      display: "block",
                      margin: "0 auto"
                    }}
                    width="100%"
                    height="310"
                    src="https://www.youtube.com/embed/NMFzZaa-Wds"
                    title="Meet Cindy!"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  />
                </Box>
                <Stack sx={{ px: { xs: 10, md: 5 } }}>
                  <Typography gutterBottom sx={{ mt: 3 }} variant="h5">
                    Meet Cindy, from Venezuela!
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    value="Book Class with Cindy"
                    href="https://calendly.com/atomlive/story-time-with-cindy-2"
                  >
                    Book Class With Cindy!
                  </Button>
                  <Typography gutterBottom sx={{ pt: 2 }} variant="body1">
                    Meet Cindy, a seasoned language teacher originally from
                    Venezuela and currently residing in Colombia. With a decade
                    of experience in teaching children, Cindy brings a playful
                    and immersive approach to learning. She strives to make
                    learning fun through games, songs, and activities that help
                    children understand story contexts and learn new vocabulary
                    in Spanish.
                  </Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  pt: 10,
                  display: "block",
                  margin: "0 auto",
                  width: "100%"
                }}
              >
                <iframe
                  style={{
                    display: "block",
                    margin: "0 auto"
                  }}
                  width="100%"
                  height="310"
                  src="https://www.youtube.com/embed/CaogZj5jXv4"
                  title="Meet Daniel!"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                />
                <Stack sx={{ px: { xs: 10, md: 5 } }}>
                  <Typography gutterBottom sx={{ mt: 3 }} variant="h5">
                    Meet Daniel, from Mexico!
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    value="Book Class with Daniel"
                    href="https://calendly.com/atomlive/story-time-with-daniel"
                  >
                    Book Class With Daniel!
                  </Button>
                  <Typography gutterBottom sx={{ pt: 2 }} variant="body1">
                    Meet Daniel, a teacher from Tijuana, Mexico, with a passion
                    for playing guitar, video games, puzzles, and walking his
                    dogs. He finds joy in using the Atom platform for teaching,
                    which enables him to narrate creative stories in an engaging
                    manner. He is thrilled to be part of your learning journey
                    and can't wait to share his innovative teaching style with
                    you.
                  </Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  pt: 10,
                  pb: 20,
                  display: "block",
                  margin: "0 auto",
                  width: "100%"
                }}
              >
                <iframe
                  style={{
                    display: "block",
                    margin: "0 auto"
                  }}
                  width="100%"
                  height="310"
                  src="https://www.youtube.com/embed/Fj6rQ3jKz5Y"
                  title="Meet Eiling!"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                />
                <Stack sx={{ px: { xs: 10, md: 5 } }}>
                  <Typography gutterBottom sx={{ mt: 3 }} variant="h5">
                    Meet Eiling, from Venezuela
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    value="Book Class with Eiling"
                    href="https://calendly.com/atomlive/story-time-with-eiling"
                  >
                    Book Class With Eiling!
                  </Button>

                  <Typography gutterBottom sx={{ pt: 2 }} variant="body1">
                    Meet Eiling, an teacher from Venezuela who has been working
                    with children aged 3-10 years since she received her
                    bachelor's degree in 2010. Eiling brings a joyful energy to
                    her classes; she loves traveling, dancing, singing, and
                    baking and strives to share this zest for life with her
                    students.
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

StoryTime.layout = ExternalLayout;

// const FaqMobile = () => {
//   return (
//     <>
//       <span>stories</span>
//     </>
//   );
// };

// StoryTimeMobile.layout = ExternalLayoutMobile;

// const StoryTimePage = isMobile ? StoryTimeMobile : StoryTime;

export default StoryTime;
