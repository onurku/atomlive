//Library Components
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { common, grey } from "@mui/material/colors";
import Container from "@mui/material/Container";
import { createStyles, makeStyles } from "@mui/styles";
import Divider from "@mui/material/Divider";
import StarIcon from "@mui/icons-material/Star";

import Grid from "@mui/material/Grid";
import { isMobile } from "mobile-device-detect";
import "@fontsource/lustria";
import Link from "@/components/ui/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// App components
import ExternalLayout from "@/components/layouts/ExternalLayout";
import ExternalLayoutMobile from "@/components/layouts/ExternalLayoutMobile";
import MainTitle from "@/components/ui/MainTitle";
import BookCardItem from "@/components/ui/BookCardItem";
import Color from "@/components/styles/color";
import { postData } from "@/utils/helpers";

const styles = makeStyles((theme) =>
  createStyles({
    subtitle: {
      marginTop: 64,
      marginBottom: 32,
      maxWidth: 800,
      margin: "0 auto"
    },
    subtitle2: {
      marginTop: 32,
      marginBottom: 32,
      maxWidth: 800,
      margin: "0 auto"
    }
  })
);

const Faq = () => {
  const classes = styles();

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <MainTitle text="Uplifting world authors" />
          <Container>
            <Grid container>
              <Grid item xs={12} sm={3}>
                <Box>
                  <img src="/info/about/me.jpg" alt="lien" width="100%" />
                </Box>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Box
                  sx={{
                    pl: { xs: 1, sm: 2, md: 4, lg: 10 },
                    pr: { xs: 1, sm: 2, md: 4, lg: 10 }
                  }}
                >
                  <Typography
                    sx={{ pt: { xs: 4, sm: 0, md: 0, lg: 0 } }}
                    gutterBottom
                    variant="h4"
                  >
                    Amplify your work
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    In 2020, at the height of the pandemic, I was helping a
                    local ESL teacher at a public school in San Jose,
                    California, find more books in Vietnamese for her students
                    to read together. Because the classes were taught online,
                    the teachers were physically holding the books to read with
                    the kids. This required both the teachers and the student to
                    have physical copies of the same book.
                    {/* In 2020, at the height of the pandemic, a local ESL teacher
                    of a San Jose public school reached out to me. She was a
                    bilingual teacher of Vietnamese and English students and
                    wanted to know how to get access to more interesting books.
                    Even though there are eBooks on Amazon, the content was
                    limited, and reading using eBooks felt dry when reading
                    together. I referred her to a book store in Vietnam, and
                    offered to donate $100 worth of books and free shipping.
                    Even though the books did not cost very much, the shipping
                    for these books cost $250. Even after spending a total of
                    $350, I was unable give all students in her class all of the
                    titles from this purchase. */}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    While I was exploring how I enhance this experience, I
                    learned that there are eBooks available on Amazon, using
                    eBooks to read together was not fun for young children. Many
                    of them want to see their teachers' face while they're
                    reading the books together. This is the experience of book
                    reading I've created for those kids today.
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    With the books I've created, parents, teachers and kids can
                    "live" inside these books while reading together - all
                    accessible from any computer with a webcam. I want to be
                    able to help every author, every book around the world,
                    eventually removing barriers to books.
                  </Typography>
                  <Typography gutterBottom varient="body1"></Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <Typography
                  sx={{ pt: { xs: 2, sm: 4 } }}
                  gutterBottom
                  variant="h4"
                >
                  Convert your books to augmented reality (AR)
                </Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Box sx={{ p: 10 }}>
                  <Typography sx={{ pb: 10 }} gutterBottom variant="body1">
                    As a software engineer, my ultimate goal is to use tech to
                    uplift authors and your work, making your work more
                    accessible to every child, in every language, all around the
                    world.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={7}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon sx={{ color: Color.hex.brightblue }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Earn additional revenue stream for your books"
                      secondary="Offer your books as a standalone AR book or bundle it with your existing eBooks and physical books."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon sx={{ color: Color.hex.brightblue }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Use AR books during author's visit to schools"
                      secondary="Offer your books as a standalone AR book or bundle it with your existing eBooks and physical books."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon sx={{ color: Color.hex.brightblue }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Use AR books as a marketing tool"
                      secondary="Read all of the books for your videos on Youtube, Facebook, TikTok, Instagram."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon sx={{ color: Color.hex.brightblue }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Set your book prices"
                      secondary="You have complete autonomy on the pricing of your books."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon sx={{ color: Color.hex.brightblue }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Choose how you much you want to pay."
                      secondary="Keep 70% when you sell AR books standalone, or pay a monthly fee for your readers to access AR books when they buy your existing eBooks or physical books. You can also offer both."
                    />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} sm={5}>
                <Typography sx={{ p: 10, pb: 5 }} gutterBottom variant="body1">
                  Rather than running on a traditional and outdated business
                  model, such as royalty or licensing, where the major sale of
                  the book goes to the publishing company, I believe in the
                  power of the author.
                </Typography>
                <Typography
                  sx={{ pl: 10, pr: 10, pb: 10 }}
                  gutterBottom
                  variant="body1"
                >
                  Authors should be in control of your work and retain the
                  majority of the revenue from the sale of your books.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Typography
                  sx={{ pt: { xs: 2, sm: 4 } }}
                  gutterBottom
                  variant="h4"
                >
                  How can I help?
                </Typography>
                <Typography gutterBottom variant="body1">
                  There are several stages of making these books:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon sx={{ color: Color.hex.brightblue }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Convert your book illustrations into code using augmented reality
                      (AR) technology."
                      secondary="Currently, I only produce and web-based
                      AR books, but I will be able to support iPhone and
                      Android, so your books will be available on these
                      platforms."
                    />
                  </ListItem>
                  {/* <ListItem>
                    <ListItemIcon>
                      <StarIcon sx={{ color: Color.hex.brightblue }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="If you have audiobooks, I will publish on my podcast."
                      secondary="By generating audiobooks, more children will have an additional touch point to have access to your work. If you do not have audiobooks, I can give you recommendations on how to create them."
                    />
                  </ListItem> */}
                  {/* <ListItem>
                        <ListItemIcon>
                          <StarIcon sx={{ color: Color.hex.brightblue }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Push your books to our website, podcast, and social media channels, so they can be found among fellow children's authors."
                          secondary="Leverage fellow authors' for additional reach and discovery. Some of our authors have an existing 2m+ and 5m+ readers, so you will be able to gain additional discovery from being in Atom's collective author platform."
                        />
                      </ListItem> */}
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon sx={{ color: Color.hex.brightblue }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Gain an additional venue for sales of your books."
                      secondary="You may choose to couple the sale of AR books with your physical book, or simply as standalone AR books on my website. (or both)."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon sx={{ color: Color.hex.brightblue }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Recurring revenue"
                      secondary="AR books are currently sold as an annual subscription, so you will be able to earn recurring revenue when a customer re-subscribes."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon sx={{ color: Color.hex.brightblue }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Technical support on cruise control"
                      secondary="For technnical questions related to your AR books, I will handle and resolve the customer inquiries related, so you can remain focus on your existing business. For non-technical and questions about your author business oeprations, I will forward the questions to you."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon sx={{ color: Color.hex.brightblue }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Choose how you want to pay: "
                      secondary="My goal is to support children's book authors, so you retain most of the revenue from sales."
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography sx={{ p: 10 }} gutterBottom variant="body1">
                  Affordable pricing for authors
                </Typography>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Typography
                  sx={{ pt: { xs: 2, sm: 4 } }}
                  gutterBottom
                  variant="h4"
                >
                  What is the cost to create books for AR?
                </Typography>
                <Typography gutterBottom variant="body1">
                  There are 3 parts of the cost. Authors can choose to simply
                  bundle it with your existing books to help boost sales, or
                  sell it as a standalone offering. Choose the payment model 1
                  or 2
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon sx={{ color: Color.hex.brightblue }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Conversion to AR"
                      secondary="I manually convert the illustrations and generate facial masks. The cost will be determined based on the size of your books. This step is required for every book and it's non-refundable."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon sx={{ color: Color.hex.brightblue }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Payment model 1: Based on reader volume, monthly cost"
                      secondary="Offer AR books for your existing readers. If you bundle it to your existing paper books and eBooks, the monthly cost starts at $15/month ($99/year) for up to 1000 readers, $30/month for 5000 readers."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon sx={{ color: Color.hex.brightblue }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Payment model 2: Sell your AR books as standalone offering on Atom"
                      secondary="$0 monthly charge. I take 30% of each sale, which helps me covers website operations, payment processing fees, tech licenses, partnership engagements, customer support, etc. You retain 70% of the sales."
                    />
                  </ListItem>
                </List>
                {/* <Typography
                  sx={{ pt: { xs: 2, sm: 4 }, pb: { xs: 2 } }}
                  gutterBottom
                  variant="body1"
                >
                  I'm constantly on the look out for authors related to niches,
                  special interests and diverse languages and lifestyle stories
                  of authors around the world.
                </Typography> */}
                <Link
                  size="large"
                  variant="secondary"
                  to="https://docs.google.com/forms/d/e/1FAIpQLScjtPDzdDrJSk9dILyL6yeZFORZ5Il0w0y9nrSqBl0gooJ1Eg/viewform?usp=sf_link"
                >
                  <Typography variant="h6">Contact Me</Typography>
                </Link>
              </Grid>
              <Grid item xs={12} lg={10}>
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
          </Container>
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
