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

const Faq = () => {
  const classes = styles();

  return (
    <>
      <Grid container className={classes.root} justifyContent="center">
        <Grid item xs={12}>
          <MainTitle text="Why I created Atom" />
          <Container>
            <Grid container>
              <Grid item xs={12} md={3}>
                <Box sx={{ mb: { xs: 5 } }}>
                  <img
                    src="/static/info/about/me.jpg"
                    alt="lien"
                    width="100%"
                    height="auto"
                  />

                  {/* <iframe
                    src="https://anchor.fm/lien-nguyen58/embed/episodes/About-Atom-e1f7k5j"
                    width="100%"
                    frameBorder="0"
                    scrolling="no"
                  ></iframe> */}
                  {/* <Box
                    sx={{
                      left: 0,
                      width: "100%",
                      height: 500,
                      position: "relative"
                    }}
                  >
                  
                    <iframe
                      src="https://www.tiktok.com/embed/7132640369459711274"
                      className={classes.iframe}
                      allowfullscreen
                      scrolling="no"
                      allow="encrypted-media;"
                    ></iframe>
                  </Box> */}
                </Box>
              </Grid>
              <Grid item xs={12} md={9}>
                <Container>
                  <Box sx={{ pl: { xs: 4, lg: 10 }, pr: { xs: 4, lg: 10 } }}>
                    <Typography gutterBottom variant="h5">
                      Hi, I'm Lien and I'm passionate about helping kids create
                      a lifelong love for learning.
                    </Typography>
                    {/* <Typography gutterBottom variant="body1">
                      I started Atom because raising bilingual and multilingual
                      children is important for families of different
                      backgrounds. Being able to share language, culture with
                      their kids is important to many parents.
                    </Typography>
                    <Typography gutterBottom variant="body1">
                      Furthermore, exposure to sophisticated spoken words is
                      important as spoken language drives vocabulary acquisition
                      and retention, regardless it's your main language or a
                      secondary language. Even when your child doesn't
                      understand a word, your child's brain is working to
                      process the meaning of the word.
                    </Typography> */}
                    <Typography gutterBottom variant="body1">
                      Every time you read to your child, different neurological
                      patterns emerge inside the child's brain. This repeated
                      exposure of words becomes the key to reading and language
                      proficiency, contributing to your child's growing
                      vocabulary over time.
                    </Typography>
                    <Typography gutterBottom variant="body1">
                      I work with authors to bring your family amazing reading
                      experiences. By buying Atom's live books, you're not only
                      supporting me in this journey, but you're also supporting
                      the work of many authors around the world. Thank you for
                      being here with me!
                    </Typography>
                    {/* <Typography gutterBottom variant="body1">
                      DM me on Instagram:
                    </Typography>
                    <NextLink
                      href="https://www.instagram.com/atomdotlive"
                      passHref
                    >
                      @atomdotlive
                    </NextLink> */}
                    {/* <Typography gutterBottom variant="body1">
                      I’m so glad you’re here. My name is Lienne and I’ve been
                      multilingual most of my life. As a child, my family and I
                      lived in Vietnam and Europe, so I grew up learning to
                      speak Vietnamese, Spanish, and finally English.
                    </Typography>
                    <Typography gutterBottom variant="body1">
                      I started this site making bilingual books for kids when I
                      realized that not many books are available for very young
                      children to learn multiple languages. Parents - if you
                      have a hard time finding books in your language, know that
                      you’re not alone. This is because even though there are
                      50% of us in the world who are bilingual, only 2% of the
                      books are bilingual.
                    </Typography>
                    <Typography gutterBottom variant="body1">
                      While I’m a software engineer, and I'm not a book author,
                      I work with children’s book authors to help them convert
                      physical books into a digital, theater format. Your child
                      can participate in speaking in a fun way by wearing
                      character masks. I want to give a child a way to live
                      inside these imaginary world of stories, indulging in the
                      fun, and helping your family to have the best family time,
                      reading together. In these books, you can switch from one
                      language to the other while reading. This makes it easy to
                      practice reading aloud, which is the best way to improve
                      language learning.
                    </Typography>
                    <Typography gutterBottom variant="body1">
                      Language learning a journey. It’s a journey that involves
                      allowing your child to make mistakes. Give your child the
                      freedom to do it often, because practice makes perfect. By
                      giving your children the gift of bilingualism, you’re not
                      only giving them the gift of language, but you’re teaching
                      your child a core foundation of lifelong values:
                      persistence, resilience, and the ability to indulge in
                      failing and learning, rather than being afraid of making
                      mistakes.
                    </Typography>
                    <Typography gutterBottom variant="body1">
                      This is the basic building block, or atom, of learning
                      everything in life. Language learning is possible for you
                      and your family, you just need the right tools to teach
                      your child. Click at the the bottom of this page to join
                      my Facebook community with other bilingual parents. I’m
                      also on Tiktok and Instagram. I will often release read
                      aloud videos on my social media channels, so see all of
                      you there.
                    </Typography> */}
                  </Box>
                </Container>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid item xs={12}>
          {/**** Tiktok ****/}
          <Stack direction="row">
            {/* <Link href="https://www.tiktok.com/@atomdotlive/video/7071039823959559466?is_from_webapp=1&sender_device=pc&web_id7060709524407961094">
            <img
              mode="2"
              src="https://p16-sign.tiktokcdn-us.com/obj/tos-useast5-p-0068-tx/6673721a9aff49ca9bf189c52b7c1588?x-expires=1646398800&amp;x-signature=eQkql3nYzinjflcg0WsvQcDhaAI%3D"
              alt="When it comes to screen time, there is no one size fits all. However, there is a basic recommendation for healthy model for screen time. 0-2: no screen time at all, except video chat2-5: limit to 1 hour per day, parents must watch with kids6+: increase screen time after prioritizing sleep, play"
              loading="lazy"
              class="tiktok-j6dmhd-ImgPoster e1yey0rl1"
              width="180"
            />
          </Link> */}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

Faq.layout = ExternalLayout;

const FaqMobile = () => {
  return (
    <>
      <span>stories</span>
    </>
  );
};

FaqMobile.layout = ExternalLayoutMobile;

const FaqPage = isMobile ? FaqMobile : Faq;

export default Faq;
