import React, { useEffect, useState } from "react";

import { createStyles, makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import { common } from "@mui/material/colors";
import Container from "@mui/material/Container";
import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
  FaYoutube
} from "react-icons/fa";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import CustomLink from "@/components/ui/Link";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";

//App components
import Color from "@/components/styles/color";
import all from "@/ar_content/books/all";

const styles = makeStyles((theme) =>
  createStyles({
    footer: {
      backgroundColor: Color.hex.mednavy,
      width: "100vh",
      minWidth: "100%",
      color: Color.hex.lightblue
    },
    link: {
      color: Color.hex.aquagrey,
      fontSize: "1rem",
      cursor: "pointer"
    },
    title: {
      color: Color.hex.lightorange,
      fontWeight: "bold",
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(2)
    },
    rainbowContainer: {
      // background:
      //   "linear-gradient(left, #00BBFF, #00BBFF 14.3%, #2EB5E5 14.3%, #2EB5E5 28.6%, #E6E6E6 28.6%, #E6E6E6 42.9%, #F3D166 42.9%, #F3D166 57.2%, #222233 57.2%, #222233 71.5%, #444444 71.5%, #444444 85.8%, #85DB8C 85.8%)",
      transform: "scale(.7)",
      width: "100%",
      display: "flex",
      alignItems: "center",
      // display:"block",
      position: "relative",
      paddingTop: theme.spacing(5),
      width: 260,
      color: Color.hex.lightblue
    },
    rainbow: {
      animation: "$rainbow 5s ease-in-out infinite",
      borderRadius: "170px 0 0 0",
      display: "inline-block",
      boxShadow:
        "#FB323C -2px -2px 0 1px, #F99716 -4px -4px 0 3px, #FEE124 -6px -6px 0 5px, #AFDF2E -8px -8px 0 7px, #6AD7F8 -10px -10px 0 9px, #60B1F5 -12px -12px 0 11px, #A3459B -14px -14px 0 13px",
      height: 70,
      width: 70,
      transform: "rotate(40deg)",
      marginLeft: 30
    },
    rainbowShadow: {
      animation: "$rainbowShadow 5s ease-in-out infinite",
      background: common.white,
      borderRadius: "50%",
      content: "",
      opacity: 0.5,
      height: 15,
      width: 120
      // transform: "rotate(-40deg)",
      // transformOrigin: "50% 50%"
    },
    "@keyframes rainbow": {
      "50%": { transform: "rotate(50deg)" }
    },
    "@keyframes rainbowShadow": {
      "50%": {
        // transform: "rotate(-50deg) translate(10px) scale(.7)",
        transform: "translate(10px) scale(.7)",
        opacity: "0.15"
      }
    }
  })
);

const Footer = ({}) => {
  const classes = styles();
  const list = all;

  const publishers = Object.keys(list);
  const titles = Object.keys(list.diveo_media.content);

  return (
    <>
      <Box className={classes.footer}>
        <Container maxWidth="xl">
          <Grid container>
            <Grid item xs={6} md={3}>
              <Box sx={{ pl: 5, pt: 5, pb: 10 }}>
                <Typography variant="h5" className={classes.title}>
                  Languages
                </Typography>
                <Link href="/books/">
                  <Typography variant="body1" className={classes.link}>
                    English
                  </Typography>
                </Link>
                <Link href="/books/">
                  <Typography variant="body1" className={classes.link}>
                    French
                  </Typography>
                </Link>
                <Link href="/books/">
                  <Typography variant="body1" className={classes.link}>
                    German
                  </Typography>
                </Link>
                <Link href="/books/">
                  <Typography variant="body1" className={classes.link}>
                    Russian
                  </Typography>
                </Link>
                <Link href="/books/">
                  <Typography variant="body1" className={classes.link}>
                    Spanish
                  </Typography>
                </Link>
                <Link href="/books/">
                  <Typography variant="body1" className={classes.link}>
                    Vietnamese
                  </Typography>
                </Link>
                {/* <Link>
                <Typography variant="h5">
                  Subscribe when new languages are announce
                </Typography>
              </Link> */}
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ pt: 5, pb: 10 }}>
                <Typography variant="h5" className={classes.title}>
                  Partners
                </Typography>
                {publishers.map((publisher, key) => {
                  console.log("publisher ", key, publisher);
                  const publisherName = publisher.split("_").join(" ");
                  const pubName = publisherName
                    .split(" ")
                    .map((pname) => pname[0].toUpperCase() + pname.substring(1))
                    .join(" ");
                  return (
                    <Link
                      key={key}
                      sx={{ fontWeight: 700, color: Color.hex.lightblue }}
                      href={`/publishers/${publisher.split("_").join("-")}`}
                    >
                      <Typography className={classes.link}>
                        {publisher !== "atom" ? pubName : "Classic Fairy Tales"}
                      </Typography>
                    </Link>
                  );
                })}

                {/* <Link href="/info/for-authors/">
                  <Typography variant="body1">For Authors</Typography>
                </Link> */}

                <Typography variant="h5" className={classes.title}>
                  Social
                </Typography>
                {/* Her goal is to uplift diverse authors inside the world of
              children's books, removing barriers and amplifying access to
              bilingual and multilingual literature. */}
                <Stack sx={{ pt: 2 }} direction="row" spacing={2}>
                  {/* <Link href="https://www.instagram.com/atomdotlive">
                    <FaInstagram
                      icon="true"
                      size="24px"
                      color={Color.hex.aquagrey}
                    />
                  </Link> */}
                  <Link
                    href="https://www.linkedin.com/company/atomdotlive"
                    className={classes.link}
                  >
                    <FaLinkedin
                      icon="true"
                      size="24px"
                      color={Color.hex.aquagrey}
                    />
                  </Link>
                  <Link
                    href="https://www.youtube.com/@atomdotlive"
                    className={classes.link}
                  >
                    <FaYoutube
                      icon="true"
                      size="24px"
                      color={Color.hex.aquagrey}
                    />
                  </Link>
                  <Link
                    href="https://wa.me/17203529271"
                    className={classes.link}
                  >
                    <FaWhatsapp
                      icon="true"
                      size="24px"
                      color={Color.hex.aquagrey}
                    />
                  </Link>
                </Stack>
              </Box>
            </Grid>
            {/* <Grid item xs={6} md={3}>
              <Box sx={{ pt: 10, pb: 10, color: Color.hex.aquagrey }}>
                <Typography gutterBottom variant="body2" align="left">
                  It's the enchantment of words that can weave our hearts and
                  craft unforgettable memories. Reading allows a child to
                  discover themself, to nurture their own perspective. Reading
                  is a gateway to discovering their own tastes and interests.
                </Typography>
                <Typography gutterBottom variant="body2" align="left">
                  Engaging in conversations with them about books can unveil
                  worlds your child never even imagined, spinning up stories
                  that make dinnertime last forever.
                </Typography>
                <Typography gutterBottom variant="body2" align="left">
                  And discussing books that have left a profound impact on a
                  child's life, also nurtures the love for reading. This year,
                  join us in fostering the love for reading for your child,
                  endeavor to shape a new generation, and to inspire them to
                  live in a better society!
                </Typography>
              </Box>
            </Grid> */}
            {/* <Grid item xs={12} md={6}>
              <Stack
                sx={{
                  backgroundColor: Color.hex.purple,
                  color: common.white,
                  p: 5,
                  m: { xs: 0, sm: 5 },
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <Typography
                  gutterBottom
                  sx={{ display: "flex", justifyContent: "center" }}
                  variant="h4"
                >
                  Meet bilingual authors and parents?
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ pb: 2, display: "flex", justifyContent: "center" }}
                  variant="h5"
                >
                  Get advice, ask questions, receive support and more
                </Typography>
                <CustomLink to="https://www.facebook.com/groups/687421765716269">
                  <Typography variant="h6">
                    Join Atom Parents Community
                  </Typography>
                </CustomLink>
              </Stack>
            </Grid> */}
            <Grid item xs={12}>
              <Stack
                sx={{
                  direction: "flex",
                  alignItems: "center",
                  borderTop: `2px solid ${common.black}`
                }}
                direction="row"
                spacing={2}
              >
                <Stack className={classes.rainbowContainer}>
                  <Box className={classes.rainbow} />
                  <Box className={classes.rainbowShadow} />
                </Stack>
                <Typography variant="body2">
                  At Atom, we turn bored kids into bilingual kids, by teaching
                  them to read, all through stories.
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
