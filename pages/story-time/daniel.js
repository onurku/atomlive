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
import MainTitle from "@/components/ui/MainTitle";
import Color from "@/components/styles/color";

const styles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingBottom: theme.spacing(10)
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

  return (
    <>
      <Grid container className={classes.root} justifyContent="center">
        <Grid item xs={12}>
          <MainTitle text="Bilingual Story Time with Daniel" />
          <Container>
            <Grid container>
              <Grid item xs={12} md={6} justifyContent="center">
                <Box>
                  <iframe
                    width="100%"
                    height="310"
                    src="https://www.youtube.com/embed/CaogZj5jXv4"
                    title="Meet Daniel!"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} justifyContent="center">
                <Box sx={{ mt: 8 }}>
                  <Typography sx={{ mt: 3 }} variant="h5">
                    Meet Daniel, from Mexico
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    Meet Daniel, a teacher from Tijuana, Mexico, with a passion
                    for playing guitar, video games, puzzles, and walking his
                    dogs. He finds joy in using the Atom platform for teaching,
                    which enables him to narrate creative stories in an engaging
                    manner.
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    Using Atom's unique features, such as different masks and
                    voice tone changes, Daniel immerses himself in character to
                    deliver captivating readings to his students. He is thrilled
                    to be part of your learning journey and can't wait to share
                    his innovative teaching style with you.
                  </Typography>
                  <Button
                    sx={{ mt: 6 }}
                    variant="contained"
                    color="primary"
                    value="Book Class with Daniel"
                    href="https://calendly.com/atomlive/story-time-with-daniel"
                  >
                    Book Class With Daniel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
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
