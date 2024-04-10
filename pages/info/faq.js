//Library Components
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import { common, grey } from "@mui/material/colors";
import { createStyles, makeStyles } from "@mui/styles";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import { isMobile } from "mobile-device-detect";
import "@fontsource/lustria";
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
      <Grid container className={classes.root} justifyContent="center">
        <Grid item xs={10}>
          <Typography align="center" className={classes.subtitle} variant="h4">
            Have Questions?
          </Typography>
          <Typography align="center" className={classes.subtitle} variant="h5">
            Click on some frequently asked questions below to see if we can
            answer your questions.
          </Typography>
          <Typography align="center" variant="body1"></Typography>
          <Divider />
          <Typography align="center" className={classes.subtitle2} variant="h5">
            Questions about Atom books
          </Typography>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel-content-what-is-atom-dot-live"
              id="panel-header-what-is-atom-dot-live"
            >
              <Typography variant="h5">What is atom.live?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography gutterBottom variant="body1">
                We build virtual, immersive books for children while installing
                in them a love for reading. We are a marketplace of independent
                publishers and authors. We support our partners by giving them a
                channel to create a virtual experience for their books, while
                allowing them to control their prices accordingly. We do not own
                the rights to the books - our partners themselves retain the
                rights to their work. By buying books on our site, you are
                directly supporting the independent authors around the world.
                Thank you for your support, cheers to the creative artists
                around the world.
              </Typography>
              <Typography gutterBottom variant="body1">
                While supporting our independent authors, we also sell books on
                Classic Fairy Tales, written by historically famous authors,
                from different cultures around the world. We wish to haven each
                child gain access to foreign books that may not be accessible in
                their own country. We truly believe that books unite children
                across distance and time, all around the world. Our lifelong
                mission is to instill historical identity, understanding,
                cultural competence, and empathy in every child.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel-content-do-you-ship-the-books"
              id="panel-header-do-you-ship-the-books"
            >
              <Typography variant="h5">Do you ship the books?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                No, we do no ship our books. All of our books are digital and
                can only be read on our site. You have to log into atom.live to
                access the books.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel-content-do-you-offer-ebooks"
              id="panel-header-do-you-offer-ebooks"
            >
              <Typography variant="h5">Do you offer e-books?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We do not offer e-books. We are currently focused on giving
                children the most fun way to read, with the hope to instill in
                them a lifelong love for reading.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel-content-why-do-you-offer-subscriptions"
              id="panel-header-why-do-you-offer-subscriptions"
            >
              <Typography variant="h5">
                Why am I paying an annual subscription for books?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                The experience of reading the book is immersive on our website.
                Each time you access a book, there is a cost for us to pay for
                our servers and technologies. The annual subscription allows us
                to sustain our operations.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel-content-do-you-offer-monthly-subscriptions"
              id="panel-header-do-you-offer-monthly-subscriptions"
            >
              <Typography variant="h5">
                Do you offer monthly subscriptions?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We are currently in beta, and we offer annual subscriptions
                only.
              </Typography>
            </AccordionDetails>
          </Accordion>
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
