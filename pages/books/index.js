import { useCallback, useEffect, useState } from "react";
import { getSession } from "next-auth/react";

//Library Components
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { common, grey } from "@mui/material/colors";
import Container from "@mui/material/Container";
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
import { v4 } from "uuid";

// App components
import all from "@/ar_content/books/all";
import BookCardItem from "@/components/ui/BookCardItem";
import Color from "@/components/styles/color";
import { countryNames } from "@/components/ui/Navbar/countries";
import ExternalLayout from "@/components/layouts/ExternalLayout";
import ExternalLayoutMobile from "@/components/layouts/ExternalLayoutMobile";
import { getData } from "@/utils/helpers";
import MainTitle from "@/components/ui/MainTitle";
import { prettyName } from "@/components/hooks/useLanguage";
import Subtitle from "@/components/ui/MainTitle/Subtitle";

const styles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundImage: Color.ombre.natural
    },
    inputLabel: {
      backgroundColor: Color.ombre.natural,
      paddingLeft: 5,
      paddingRight: 5
    },
    subtitle: {
      color: grey[800],
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
      marginBottom: theme.spacing(5),
      "&:first-of-type": {
        marginTop: theme.spacing(5)
      }
    },
    box: {
      minWidth: 200,
      display: "flex",
      flexFlow: "row nowrap",
      justifyContent: "center",
      marginBottom: theme.spacing(5)
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
  console.log("country names========", countryNames);
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
  const langList = books[0]?.metadata
    ? Object.keys(JSON.parse(books[0]?.metadata)?.languages).map((lang) =>
        prettyName(lang)
      )
    : [];
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
  if (props?.data) {
    props.data["Atom"]?.map((book, index) => {
      metadata = JSON.parse(book.metadata);
      if (metadata.isFree) {
        booksFree.push(book);
      }
    });
  }

  const uuidv4 = v4;
  console.log("uuid", uuidv4());

  const booksPaid = [];
  if (props?.data) {
    props.data[publisher]?.map((book, index) => {
      const metadata = JSON.parse(book?.metadata);
      if (!metadata.isFree) {
        booksPaid.push(book);
      }
    });
  }

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
  };

  useEffect(() => {
    console.log("languageList", languageList);
  }, [setPublisher, setLanguageList]);

  return (
    <>
      <Grid container className={classes.root} justifyContent="center">
        <Grid item xs={12}>
          <Box
            py={10}
            sx={{
              backgroundColor: Color.hex.navy,
              backgroundImage:
                "url('/static/new-home/hero-background-cloud.png')",
              backgroundSize: "cover",
              // backgroundPosition: "bottom -60px center",
              backgroundRepeat: "repeat-x",
              top: -100,
              width: "100%",
              height: "100%",
              zIndex: 10,
              left: 0,
              color: grey[300],
              "@media (max-width: 768px)": {
                backgroundPosition: "bottom center",
                backgroundSize: "100% auto"
              }
            }}
          >
            <MainTitle text="Experience Reading Magic" />
            <Subtitle text="Inspire your kids to daily reading, and language learning." />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              overflow: "scroll",
              p: 3,
              mb: 5,
              display: "flex",
              justifyContent: { sm: "center" },
              background: Color.hex.natural
            }}
          >
            <Stack direction="row" spacing={3}>
              <img
                loading="lazy"
                width="40"
                src={`https://flagcdn.com/flags/w1160/${countryNames[
                  "United States"
                ].code.toLowerCase()}.webp`}
                srcSet={`https://flagcdn.com/w40/${countryNames[
                  "United States"
                ].code.toLowerCase()}.png 2x`}
                alt=""
              />
              <Typography variant="body1">English</Typography>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ ml: 3 }}>
              <img
                loading="lazy"
                width="40"
                src={`https://flagcdn.com/flags/w1160/${countryNames[
                  "Spain"
                ].code.toLowerCase()}.webp`}
                srcSet={`https://flagcdn.com/w40/${countryNames[
                  "Spain"
                ].code.toLowerCase()}.png 2x`}
                alt=""
              />
              <Typography variant="body1">Spanish</Typography>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ ml: 3 }}>
              <img
                loading="lazy"
                width="40"
                src={`https://flagcdn.com/flags/w1160/${countryNames[
                  "France"
                ].code.toLowerCase()}.webp`}
                srcSet={`https://flagcdn.com/w40/${countryNames[
                  "France"
                ].code.toLowerCase()}.png 2x`}
                alt=""
              />
              <Typography variant="body1">French</Typography>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ ml: 3 }}>
              <img
                loading="lazy"
                width="40"
                src={`https://flagcdn.com/flags/w1160/${countryNames[
                  "Germany"
                ].code.toLowerCase()}.webp`}
                srcSet={`https://flagcdn.com/w40/${countryNames[
                  "Germany"
                ].code.toLowerCase()}.png 2x`}
                alt=""
              />
              <Typography variant="body1">German</Typography>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ ml: 3 }}>
              <img
                loading="lazy"
                width="40"
                src={`https://flagcdn.com/flags/w1160/${countryNames[
                  "Russian Federation"
                ].code.toLowerCase()}.webp`}
                srcSet={`https://flagcdn.com/w40/${countryNames[
                  "Russian Federation"
                ].code.toLowerCase()}.png 2x`}
                alt=""
              />
              <Typography variant="body1">Russian</Typography>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ ml: 3 }}>
              <img
                loading="lazy"
                width="40"
                src={`https://flagcdn.com/flags/w1160/${countryNames[
                  "Vietnam"
                ].code.toLowerCase()}.webp`}
                srcSet={`https://flagcdn.com/w40/${countryNames[
                  "Vietnam"
                ].code.toLowerCase()}.png 2x`}
                alt=""
              />
              <Typography variant="body1">Vietnamese</Typography>
            </Stack>
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

        <Grid item xs={12} sm={4}>
          <Box sx={{ pl: 10, pr: 2, pb: { xs: 2, md: 4 } }}>
            <FormControl fullWidth>
              <InputLabel id="select-publisher" className={classes.inputLabel}>
                Book Series
              </InputLabel>
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
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pr: 2,
              pb: { xs: 2, sm: 4 },
              pl: { xs: 0, sm: 0 }
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
                {languageList?.map((item) => {
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
        {/* <Grid item xs={12} sm={4}>
          <Box
            sx={{
              pr: 10,
              pt: { xs: 0, sm: 4 },
              pb: 2,
              display: "flex",
              justifyContent: { xs: "center", md: "left" }
            }}
          >
            <Button variant="contained" size="large">
              Subscribe $29/year ({booksPaid.length} books)
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
              <Typography variant="body2">
                100% NO-RISK MONEY BACK GUARANTEE
              </Typography>
              <HtmlTooltip
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
              </HtmlTooltip>
            </Stack>
          </Box>
        </Grid> */}
        <Grid item xs={12}>
          <Box sx={{ p: 3, mb: 20 }}>
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
            <Grid item xs={12}>
              <Accordion
                sx={{
                  border: 0,
                  p: 5,

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
                    I create virtual, interactive books to help actively engage
                    a young reader's growing brain.{" "}
                    <Link href="https://www.childresearch.net/papers/new/2019_04.html#:~:text=Education%20is%20defined%20as%20activities%20in%20the%20%22place,quality%20of%20life%20even%20when%20they%20get%20older.">
                      Research
                    </Link>{" "}
                    shows that feelings of elation and excitement helps build
                    constructive learning over time for a child. By making
                    reading as fun as possible, we hope to instill lifelong
                    confidence in constructive learning very early on, while
                    resurfacing historical identity, understanding, cultural
                    competence, and empathy in every child.
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    I support our authors by giving them an additional medium to
                    reach an audience for their books. By buying books on my
                    website, you are directly supporting the independent authors
                    around the world. Thank you for your support, cheers to
                    these creative souls at work, making the world a better
                    place.
                  </Typography>
                </AccordionDetails>
              </Accordion>
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

  console.log("get content /books", body);
  const session = await getSession({ req });

  const response = await getData(`${BASE_URL}api/content/all`);

  const { data } = response;

  return {
    props: { data: data ? data : null } // will be passed to the page component as props
  };
};

export default BookList;
