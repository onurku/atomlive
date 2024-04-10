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
          <MainTitle text="Bilingual Story Time with Miriam" />
          <Container>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Box>
                  <iframe
                    width="100%"
                    height="310"
                    src="https://www.youtube.com/embed/_mduni8QqOM"
                    title="Meet Miriam!"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} justifyContent="center">
                <Box pl={{ xs: 0, md: 3 }}>
                  <Typography gutterBottom variant="h5">
                    Meet Miriam, from Spain!
                  </Typography>
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
                  <Button
                    sx={{ mt: 4 }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    value="Book Class with Maria"
                    href="https://calendly.com/atomlive/story-time-with-miriam"
                  >
                    Book Class With Miriam!
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
