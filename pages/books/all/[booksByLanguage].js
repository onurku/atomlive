import { useCallback, useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

//Library Components
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { common, grey } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import { isMobile } from "mobile-device-detect";
import Link from "@mui/material/Link";
import "@fontsource/lustria";
import MenuItem from "@mui/material/MenuItem";
import NextLink from "next/link";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createStyles, makeStyles } from "@mui/styles";

// App components
import all from "@/ar_content/books/all";
import BookCardItem from "@/components/ui/BookCardItem";
import Color from "@/components/styles/color";
import ExternalLayout from "@/components/layouts/ExternalLayout";
import ExternalLayoutMobile from "@/components/layouts/ExternalLayoutMobile";
import { getData } from "@/utils/helpers";
import MainTitle from "@/components/ui/MainTitle";
import { prettyName } from "@/components/hooks/useLanguage";

const styles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundImage: Color.ombre.natural
    },
    subtitle: {
      // fontFamily: "Lustria, Times New Roman",
      color: grey[800],
      marginLeft: 40,
      marginRight: 40,
      marginBottom: 40
    },
    box: {
      minWidth: 200,
      display: "flex",
      flexFlow: "row nowrap",
      justifyContent: "center",
      marginBottom: 40
    },
    book: {
      borderLeft: `1px solid ${common.black}`,
      borderBottom: `1px solid ${common.black}`,
      [theme.breakpoints.up("xs")]: {
        borderTop: 0,
        borderRight: `1px solid ${common.black}`,
        "&:first-child": {
          borderTop: `1px solid ${common.black}`
        }
      },
      [theme.breakpoints.up("md")]: {
        borderTop: 0,
        "&:nth-child( odd )": {
          borderRight: 0
        },
        "&:nth-child( even )": {
          borderRight: `1px solid ${common.black}`
        },
        "&:nth-child(1)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(2)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:last-child": {
          borderRight: `1px solid ${common.black}`
        }
      },
      [theme.breakpoints.up("lg")]: {
        borderTop: 0,
        "&:nth-child( 3n + 1 )": {
          borderRight: 0
        },
        "&:nth-child( 3n+2)": {
          borderRight: 0
        },
        "&:nth-child( 3n+3)": {
          borderRight: `1px solid ${common.black}`
        },
        "&:nth-child(1)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(2)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(3)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:last-child": {
          borderRight: `1px solid ${common.black}`
        }
      },
      [theme.breakpoints.up("xl")]: {
        borderTop: 0,
        "&:nth-child( 4n + 1 )": {
          borderRight: 0
        },
        "&:nth-child( 4n+2)": {
          borderRight: 0
        },
        "&:nth-child( 4n+3)": {
          borderRight: 0
        },
        "&:nth-child( 4n+4)": {
          borderRight: `1px solid ${common.black}`
        },
        "&:nth-child(1)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(2)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(3)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(4)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:last-child": {
          borderRight: `1px solid ${common.black}`
        }
      },
      [theme.breakpoints.up("xxl")]: {
        borderTop: 0,
        "&:nth-child( 5n + 1 )": {
          borderRight: 0
        },
        "&:nth-child( 5n+2)": {
          borderRight: 0
        },
        "&:nth-child( 5n+3)": {
          borderRight: 0
        },
        "&:nth-child( 5n+4)": {
          borderRight: `1px solid ${common.black}`
        },
        "&:nth-child( 5n+5)": {
          borderRight: `1px solid ${common.black}`
        },
        "&:nth-child(1)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(2)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(3)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(4)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(5)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:last-child": {
          borderRight: `1px solid ${common.black}`
        }
      }
    }
  })
);

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9"
  }
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<AddIcon sx={{ fontSize: 40 }} />}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(45deg)"
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1)
  }
}));

const BookList = (props) => {
  const classes = styles();
  const publisherList = props.data ? Object.keys(props?.data) : [];
  console.log("props", props, publisherList);
  const [publisher, setPublisher] = useState(publisherList[0]);
  const pubIntro = all[publisher?.toLowerCase()]
    ? all[publisher?.toLowerCase()]?.intro
    : "";
  const [publisherIntro, setPublisherIntro] = useState(
    all[publisher?.toLowerCase()]?.intro
  );

  const books = props.data ? props.data[publisher] : [];
  const langList = Object.keys(JSON?.parse(books[0]?.metadata)?.languages)?.map(
    (lang) => prettyName(lang)
  );
  const [languageList, setLanguageList] = useState(langList ? langList : []);
  const [languageListAllBooks, setLanguageListAllBooks] = useState([
    "English",
    "Spanish",
    "French",
    "German",
    "Russian",
    "Vietnamese"
  ]);
  const [languageInBooks, setLanguageInBook] = useState("English");

  const booksFree = [];
  let size, metadata;
  if (props) {
    props.data["Atom"]?.map((book, index) => {
      metadata = JSON.parse(book.metadata);
      if (metadata.isFree) {
        booksFree.push(book);
      }
    });
  }

  const booksPaid = [];
  props.data[publisher]?.map((book, index) => {
    const metadata = JSON.parse(book.metadata);
    if (!metadata.isFree) {
      booksPaid.push(book);
    }
  });

  const handlePublisherChange = useCallback(
    (e) => {
      setPublisher(e.target.value);
      const intro = all[e.target.value.toLowerCase().split(" ").join("_")]
        ?.intro
        ? all[e.target.value.toLowerCase().split(" ").join("_")]?.intro
        : "";

      setPublisherIntro(intro);
      const langs = Object.keys(
        JSON.parse(props.data[e.target.value][0].metadata).languages
      ).map((lang) => prettyName(lang));

      setLanguageList(langs);
    },
    [setLanguageList, setPublisher]
  );

  const handleLanguageChange = useCallback((e) => {
    console.log("handle language change");
    console.log(e.target.value);
    setLanguageInBook(e.target.value);
  });

  const titles = {
    Atom: "Classic Fairy Tales",
    "Diveo Media": "Little Stories"
    // "Sokheap Heng": "Where I belong",
    // "Esther Leung-Kong": "Wonderfully Made"
  };

  useEffect(() => {
    console.log("languageList", languageList);
  }, [setPublisher, setLanguageList]);

  return (
    <>
      <Grid container className={classes.root} justifyContent="center">
        <Grid item xs={12}>
          <Box>
            <MainTitle text="Experience Reading Magic" />
            <Typography
              align="center"
              className={classes.subtitle}
              variant="h4"
            >
              Bilingual Books for Language Learners
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ pb: 10 }}>
            <Grid container justifyContent="center">
              {booksFree.map((book, index) => {
                const metadata = JSON.parse(book.metadata);
                const illustrations = metadata.illustrations;
                const bookPreviewImageSize = Object.keys(
                  metadata.illustrations
                )[1];
                console.log("bookPreviewImageSize", bookPreviewImageSize);
                size = metadata.size
                  ? `${metadata.size.desktop.default.width}x${metadata.size.desktop.default.height}`
                  : "";
                const cover = illustrations ? illustrations[size] : [""];
                return (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    md={5}
                    className={classes.book}
                  >
                    <BookCardItem
                      isFree={metadata.isFree}
                      about={metadata?.languages?.en.description}
                      alt={book.title}
                      coverImageUrl={
                        metadata.illustrations.cover
                          ? metadata.illustrations[bookPreviewImageSize][
                              metadata.illustrations.cover
                            ]
                          : metadata.illustrations[bookPreviewImageSize][1]
                      }
                      title={book.title}
                      bookFormatList=""
                      languageList=""
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Accordion
            sx={{
              border: 0,
              p: 5,
              mb: 5,
              background: `linear-gradient(90deg, ${Color.hex.beige} 20px, transparent 1%) center, linear-gradient(${Color.hex.beige} 20px, transparent 1%) center, #c0c0c0`,
              backgroundSize: "22px 22px"
              //grid background
              // backgroundSize: "20px 20px",
              // backgroundImage:
              //   "linear-gradient(to right, lightgrey 1px, transparent 1px), linear-gradient(to bottom, lightgrey 1px, transparent 1px)"
            }}
          >
            <AccordionSummary
              expandIcon={<AddIcon sx={{ fontSize: "2.5rem" }} />}
              aria-controls="panel-content-learn-more-about-independent-authors"
              id="panel-header-learn-more-about-independent-authors"
            >
              <Typography variant="h4">
                Learn More About Independent Authors
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography gutterBottom variant="body1">
                We create virtual, interactive books to help actively engage a
                young reader's growing brain.{" "}
                <Link href="https://www.childresearch.net/papers/new/2019_04.html#:~:text=Education%20is%20defined%20as%20activities%20in%20the%20%22place,quality%20of%20life%20even%20when%20they%20get%20older.">
                  Research
                </Link>{" "}
                shows that feelings of elation and excitement helps build
                constructive learning over time for a child. By making reading
                as fun as possible, we hope to instill lifelong confidence in
                constructive learning very early on, while resurfacing
                historical identity, understanding, cultural competence, and
                empathy in every child.
              </Typography>
              <Typography gutterBottom variant="body1">
                We support our authors by giving them an additional medium to
                reach an audience for their books. We do not own the rights to
                the books - our partners themselves retain the rights to their
                work. By buying books on our site, you are directly supporting
                the independent authors around the world. Thank you for your
                support, cheers to these creative souls at work, making the
                world a better place.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} sx={{ mt: 5 }}></Grid>
        <Grid item xs={6} md={4} lg={3} xxl={2}>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="select-publisher">Book Series</InputLabel>
              <Select
                labelId="select-publisher-label"
                id="id-select-publisher"
                value={publisher}
                label="Publisher"
                onChange={handlePublisherChange}
              >
                {publisherList?.map((item) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {titles[item]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6} md={4} lg={3} xxl={2}>
          <Box
            sx={{
              pl: { xs: 6, sm: 3 },
              pb: { xs: 1, lg: 0 },
              pt: { xs: 3, sm: 3, md: 0 }
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="select-publisher">Language</InputLabel>
              <Select
                labelId="select-publisher-label"
                id="id-select-publisher"
                value={languageInBooks}
                label="Publisher"
                onChange={handleLanguageChange}
              >
                {languageListAllBooks?.map((item) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} md={8} lg={6} justifyContent="center">
          <Stack
            sx={{
              pl: { xs: 6, sm: 3 },
              pr: 3,
              pb: { xs: 1, lg: 0 },
              pt: { xs: 3, sm: 3, md: 0 }
            }}
          >
            <Button variant="contained" size="large">
              Read Me!
              {/* Subscribe - Series of {booksPaid.length} books ($29/year) */}
            </Button>
            <Stack
              sx={{
                pl: { xs: 6, sm: 3 },
                pr: 3,
                pt: { xs: 3, sm: 3, md: 0 }
              }}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {/* <Typography variant="body2">
                100% NO-RISK MONEY BACK GUARANTEE
              </Typography> */}
              {/* <HtmlTooltip
                title={
                  <>
                    <Typography color="inherit">
                      <NextLink href="/info/faq">
                        Why is this an annual subscription?
                      </NextLink>
                    </Typography>
                  </>
                }
              >
                <IconButton
                  aria-label="why-do-we-sell-subscription"
                  size="large"
                  color="primary"
                >
                  <HelpIcon fontSize="inherit" />
                </IconButton>
              </HtmlTooltip> */}
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={10} xl={8}>
          <Box sx={{ p: 5 }}>
            {publisherIntro &&
              publisherIntro.split("<br/>").map((paragraph, index) => {
                return (
                  <Typography key={index} sx={{ pb: 5 }} variant="h5">
                    {paragraph}
                  </Typography>
                );
              })}
            {languageList && (
              <Typography variant="h5">
                This series is available in {languageList.join(", ")}.
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ p: 3 }}>
            <Grid container>
              {booksPaid.map((book, index) => {
                const metadata = JSON.parse(book.metadata);
                const illustrations = metadata.illustrations;
                const bookPreviewImageSize = Object.keys(
                  metadata.illustrations
                )[1];
                console.log("bookPreviewImageSize", bookPreviewImageSize);
                size = metadata.size
                  ? `${metadata.size.desktop.default.width}x${metadata.size.desktop.default.height}`
                  : "";

                const cover = illustrations ? illustrations[size] : [""];
                const imageIndex = illustrations?.cover;
                let imageUrl;
                if (illustrations && illustrations[bookPreviewImageSize]) {
                  imageUrl = illustrations
                    ? illustrations[bookPreviewImageSize][imageIndex]
                    : "";
                }

                // console.log(
                //   "metadata",
                //   index,
                //   imageIndex,
                //   cover,
                //   imageUrl,
                //   book.title,
                //   size
                // );

                return (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    xl={3}
                    className={classes.book}
                  >
                    <BookCardItem
                      isFree={metadata.isFree}
                      about={metadata?.languages?.en.description}
                      alt={book.title}
                      coverImageUrl={imageUrl}
                      title={book.title}
                      bookFormatList=""
                      languageList=""
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

BookList.layout = ExternalLayout;

const BookListMobile = () => {
  return (
    <>
      <span>stories</span>
    </>
  );
};

BookListMobile.layout = ExternalLayoutMobile;

const BookListPage = isMobile ? BookListMobile : BookList;

export const getServerSideProps = async ({ req }) => {
  const body = req?.__NEXT_INIT_QUERY;
  const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL;

  const session = await getSession({ req });

  const response = await getData(`${BASE_URL}api/content/all`);

  const { data } = response;

  return {
    props: { data: data ? data : null } // will be passed to the page component as props
  };
};

export default BookList;
