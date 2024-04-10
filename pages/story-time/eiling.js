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
          <MainTitle text="Bilingual Story Time with Eiling" />
          <Container>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Box>
                  <iframe
                    width="100%"
                    height="310"
                    src="https://www.youtube.com/embed/Fj6rQ3jKz5Y"
                    title="Meet Eiling!"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} justifyContent="center">
                <Box sx={{ mt: 8 }}>
                  <Typography sx={{ mt: 3 }} variant="h5">
                    Meet Eiling, from Venezuela
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    Give yourself some free time and allow your child to embark
                    on a wild reading adventure!
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    There's no better way for your child to build language than
                    reading face-to-face with a teacher. Better yet, these
                    classes are bilingual and are taught in Spanish and English.
                  </Typography>
                  <Button
                    sx={{ mt: 6 }}
                    variant="contained"
                    color="primary"
                    value="Book Class with Eiling"
                    href="https://calendly.com/atomlive/story-time-with-eiling"
                  >
                    Book Class With Eiling!
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
