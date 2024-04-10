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
                    src="https://www.youtube.com/embed/z3Mf0iv2Y_M"
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
                    Meet Cindy, from Nicaragua
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    Meet Cindy, a seasoned English teacher hailing from
                    Nicaragua with seven years of experience working with
                    children. Cindy brings her personal passions into her work;
                    she is a big fan of music, particularly K-pop, and is a
                    proud member of the BTS Army.
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    Cindy is eager to help your child understand and appreciate
                    learning Spanish, sharing her culture and experiences along
                    the way. She's delighted to meet your child and start this
                    language learning journey together!
                  </Typography>
                  <Button
                    fullWidth
                    size="large"
                    sx={{ mt: 6, fontSize: { xs: "1.5rem" } }}
                    variant="contained"
                    color="primary"
                    value="Book Class with Cindy"
                    href="https://calendly.com/atomlive/story-time-with-cindy"
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
