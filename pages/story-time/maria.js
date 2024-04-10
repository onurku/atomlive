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
          <MainTitle text="Bilingual Story Time with Maria" />
          <Container>
            <Grid container>
              <Grid item xs={12} md={6}>
                <iframe
                  width="100%"
                  height="310"
                  src="https://www.youtube.com/embed/Ew7-b07APDY"
                  title="Meet Maria!"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                />
              </Grid>
              <Grid item xs={12} md={6} justifyContent="center">
                <Box
                  sx={{
                    pl: { xs: 3, md: 5 },
                    pr: { xs: 3, md: 0 },
                    py: { xs: 3, md: 0 }
                  }}
                >
                  <Typography gutterBottom variant="h5">
                    Meet Maria, from Dominican Republic!
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    Meet Maria, a multilingual dental student from the Dominican
                    Republic with a passion for teaching. Having been immersed
                    in an English-teaching environment from an early age, Maria
                    brings a unique, hands-on approach to her instruction,
                    drawing on her experiences assisting her mother at her
                    English institute.
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    <Typography gutterBottom sx={{ pt: 2 }} variant="body1">
                      Join her in interactive storytelling adventures. She looks
                      forward to seeing you there!
                    </Typography>
                  </Typography>
                  <Button
                    fullWidth
                    sx={{ mt: { xs: 2, sm: 6 } }}
                    variant="contained"
                    color="primary"
                    size="medium"
                    value="Book Class with Maria"
                    href="https://calendly.com/team-atom-maria/story-time"
                  >
                    Book Class With Maria!
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box pr={1} pt={4}>
                  <iframe
                    width="100%"
                    height="310"
                    src="https://www.youtube.com/embed/-_rpqao_DYo"
                    title="Meet Maria!"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  />
                </Box>
              </Grid>
              {/* <Grid item xs={12} sm={4}>
                <Box px={1} pt={4}>
                  <iframe
                    width="100%"
                    height="310"
                    src="https://www.youtube.com/embed/CrHxUN-ht-U"
                    title="The Town Musicians (Spanish)"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box pl={1} pt={4}>
                  <iframe
                    width="100%"
                    height="310"
                    src="https://www.youtube.com/embed/aMmoW187BEc"
                    title="The Town Musicians (English) by Maria"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  />
                </Box>
              </Grid> */}
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
