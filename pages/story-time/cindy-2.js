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
          <MainTitle text="Bilingual Story Time with Cindy" />
          <Container>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Box>
                  <iframe
                    width="100%"
                    height="310"
                    src="https://www.youtube.com/embed/NMFzZaa-Wds"
                    title="Meet Cindy!"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} justifyContent="center">
                <Box pl={{ xs: 0, md: 3 }}>
                  <Typography variant="h5">
                    Meet Cindy, from Venezuela
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    Meet Cindy, a seasoned language teacher originally from
                    Venezuela and currently residing in Colombia. With a decade
                    of experience in teaching children,
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    Cindy brings a playful and immersive approach to learning.
                    She strives to make learning fun through games, songs, and
                    activities that help children understand story contexts and
                    learn new vocabulary in Spanish.
                  </Typography>
                  <Button
                    fullWidth
                    sx={{ mt: 6, fontSize: { xs: "1.5rem" } }}
                    variant="contained"
                    color="primary"
                    value="Book Class with Cindy"
                    href="https://calendly.com/atomlive/story-time-with-cindy-2"
                  >
                    Book Class With Cindy!
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
