import { useCallback, useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

//Library Components
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { common, grey } from "@mui/material/colors";
import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaTiktok,
  FaTwitter
} from "react-icons/fa";
import Grid from "@mui/material/Grid";
import { isMobile } from "mobile-device-detect";
import "@fontsource/lustria";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createStyles, makeStyles } from "@mui/styles";

// App components
import ExternalLayout from "@/components/layouts/ExternalLayout";
import ExternalLayoutMobile from "@/components/layouts/ExternalLayoutMobile";
import all from "@/ar_content/books/all";
import { prettyName } from "@/components/hooks/useLanguage";
import BookCardItem from "@/components/ui/BookCardItem";
import Color from "@/components/styles/color";
import { getData } from "@/utils/helpers";

const styles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundImage: Color.ombre.natural,
      padding: theme.spacing(5)
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
          borderRight: 0,
          borderRight: `1px solid ${common.black}`
        },
        "&:nth-child( 3n+3)": {
          borderRight: 0
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

const BookList = (props) => {
  const classes = styles();
  const { data } = props;
  console.log(data);
  const { books, publisher_name, publisher_intro } = data;
  console.log("data", books, publisher_name, publisher_intro);
  const publisherNameUnderscore = publisher_name.replace("-", "_");

  const metadata = books ? JSON.parse(books[2].metadata) : null;
  const width = metadata?.size.desktop.default.width;
  const height = metadata?.size.desktop.default.height;
  const size = data ? `${width}x${height}` : null;

  const languages = metadata ? Object.keys(metadata.languages) : null;
  const langs = languages
    ? languages.map((language) => prettyName(language)).join(", ")
    : "English";
  console.log("languages", langs);

  const booksFree = [];
  const booksPaid = [];
  if (books) {
    books?.map((book, index) => {
      const metadata = JSON.parse(book.metadata);
      if (metadata.isFree) {
        booksFree.push(book);
      } else {
        booksPaid.push(book);
      }
    });
  }

  const titles = {
    atom: "Classic Fairy Tales",
    "diveo-media": "Little Stories"
    // "esther-leung-kong": "Wonderfully Made",
    // "sokheap-heng": "Where I Belong"
  };

  const backgroundImage = all[publisherNameUnderscore]?.social?.banner
    ? all[publisherNameUnderscore]?.social?.banner
    : "";

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: 180,
          display: "flex",
          flexGrow: 1,
          overflow: "visible",
          position: "relative",
          justifyContent: "center",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundImage: `url("${backgroundImage}")`
        }}
      >
        <Avatar
          sx={{
            border: `10px solid ${Color.hex.natural}`,
            width: 120,
            height: 120,
            position: "absolute",
            bottom: -50
          }}
          alt={publisherNameUnderscore}
          src={`${all[publisherNameUnderscore].social.profile_photo}`}
        />
      </Box>
      <Box
        sx={{
          pt: 5,
          pb: 5,
          pl: 20,
          pr: 20
          // background: `linear-gradient(90deg ,${Color.hex.beige} 10px,transparent 1%) 50%,linear-gradient(${Color.hex.beige} 10px, transparent 1%) 50%, #000`,
          // backgroundSize: "11px 11px"
        }}
      >
        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%"
          }}
        >
          <Typography
            sx={{
              fontFamily: "Lustria, Times New Roman",
              fontWeight: 600
            }}
            align="center"
            variant="h2"
          >
            {titles[publisher_name]}
          </Typography>
          <Typography gutterBottom align="center" variant="h4">
            Available in {langs}
          </Typography>
          {publisher_name && publisher_name !== "atom" && (
            <Typography align="center" variant="h5">
              by {all[publisherNameUnderscore].founder}
            </Typography>
          )}
        </Stack>
        <Stack sx={{ p: 5, justifyContent: "center" }} direction="row">
          {all[publisherNameUnderscore].social.facebook && (
            <Link
              sx={{ pr: 2 }}
              href={all[publisherNameUnderscore].social.facebook}
            >
              <FaFacebook icon="true" size="32px" color={grey[700]} />
            </Link>
          )}
          {all[publisherNameUnderscore].social.instagram && (
            <Link
              sx={{ pr: 2 }}
              href={all[publisherNameUnderscore].social.instagram}
            >
              <FaInstagram icon="true" size="32px" color={grey[700]} />
            </Link>
          )}
          {all[publisherNameUnderscore].social.twitter && (
            <Link
              sx={{ pr: 2 }}
              href={all[publisherNameUnderscore].social.twitter}
            >
              <FaTwitter icon="true" size="32px" color={grey[700]} />
            </Link>
          )}
          {all[publisherNameUnderscore].social.tiktok && (
            <Link
              sx={{ pr: 2 }}
              href={all[publisherNameUnderscore].social.tiktok}
            >
              <FaTiktok icon="true" size="32px" color={grey[700]} />
            </Link>
          )}
          {all[publisherNameUnderscore].social.website && (
            <Link href={all[publisherNameUnderscore].social.website}>
              <FaGlobe icon="true" size="32px" color={grey[700]} />
            </Link>
          )}
        </Stack>

        {publisher_intro.split("<br/>").map((intro, index) => {
          return (
            <Typography key={index} sx={{ pb: 2 }} variant="body1">
              {intro}
            </Typography>
          );
        })}
      </Box>
      <Box sx={{ ml: 3, mr: 3 }}>
        <Grid container>
          {booksFree &&
            booksFree?.map((book, index) => {
              const meta = JSON.parse(book.metadata);
              const cover = meta.illustrations
                ? meta.illustrations[size][meta.illustrations.cover]
                : "";

              if (!meta.illustrations) {
                console.log("undefined", book.title);
              }
              console.log("book", meta, cover);
              return (
                <Grid className={classes.book} key={index} item xs={12} md={6}>
                  <BookCardItem
                    isFree={meta.isFree}
                    about={meta.languages.en.description}
                    alt={book.title}
                    coverImageUrl={cover}
                    title={book.title}
                    bookFormatList=""
                    languageList=""
                  />
                </Grid>
              );
            })}

          {booksPaid &&
            booksPaid?.map((book, index) => {
              const meta = JSON.parse(book.metadata);
              const cover = meta.illustrations
                ? meta.illustrations[size][meta.illustrations.cover]
                : "";

              if (!meta.illustrations) {
                console.log("undefined", book.title);
              }
              console.log("book", meta, cover);
              return (
                <Grid
                  className={classes.book}
                  key={index}
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  xl={3}
                >
                  <BookCardItem
                    isFree={meta.isFree}
                    about={meta.languages.en.description}
                    alt={book.title}
                    coverImageUrl={cover}
                    title={book.title}
                    bookFormatList=""
                    languageList=""
                  />
                </Grid>
              );
            })}
        </Grid>
      </Box>
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

export const getServerSideProps = async ({ req, params }) => {
  const { publisherName } = params;
  const publishers = [
    "atom",
    "diveo-media",
    "esther-leung-kong",
    "sokheap-heng"
  ];
  if (!publishers.includes(publisherName)) {
    return { props: { data: null } };
  }

  const body = req?.__NEXT_INIT_QUERY;
  const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL;

  const response = await getData(
    `${BASE_URL}api/content/all/by_publisher?publisher_name=${publisherName}`
  );

  const publisher = publisherName
    ? publisherName.toLowerCase().split("-").join("_")
    : "";

  const pubIntro = all[publisher] ? all[publisher].intro : "";
  const { data } = response;

  return {
    props: {
      data: data
        ? {
            books: data,
            publisher_name: publisherName,
            publisher_intro: pubIntro
          }
        : null
    } // will be passed to the page component as props
  };
};

export default BookList;
