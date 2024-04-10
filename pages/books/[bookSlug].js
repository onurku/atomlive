import { Fragment, useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

//Library components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import { createStyles, makeStyles } from "@mui/styles";
import { FaChrome, FaFirefox, FaSafari } from "react-icons/fa";
import "@fontsource/libre-baskerville";
import Grid from "@mui/material/Grid";
import LaptopIcon from "@mui/icons-material/Laptop";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NextLink from "next/link";
import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";

//App components
import BookImageInList from "@/components/ui/BookCardItem/BookImageInList";
import bookslugs from "@/ar_content/books/slugs";
import Color from "@/components/styles/color";
import LoadingDots from "@/components/ui/LoadingDots";
import { getData } from "@/utils/helpers";
import { useAdmin } from "@/components/hooks/useAdmin";
import { prettyName } from "@/components/hooks/useLanguage";
import getContentBySlug from "@/utils/books/getContentBySlug";
import StaticExternalLayout from "@/components/layouts/StaticExternalLayout";

const styles = makeStyles((theme) =>
  createStyles({
    hero: {
      width: "100%",
      height: "auto",
      position: "absolute",
      top: 0,
      zIndex: 1
    },
    sideImage: {
      border: "1px solid black"
    },
    sideLanguages: {
      fontWeight: 100,
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    },
    languages: {
      color: "white",
      textAlign: "center"
    },
    sideTitle: {
      fontFamily: "Libre Baskerville, Times New Roman",
      fontWeight: "300"
    },
    title: {
      color: "white",
      textAlign: "center",
      fontFamily: "Libre Baskerville, Times New Roman",
      fontWeight: "300"
    }
  })
);

const heroHeight = 300;

const SingleBook = (props) => {
  const data = props;
  const { status, data: sessionData } = useSession();

  useEffect(async () => {}, [status]);
  const classes = styles();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [techPolicy, setTechPolicy] = useState(false);
  const metadata = data ? JSON.parse(data.metadata) : null;
  const slug = data?.slug || undefined;
  const width = metadata?.size.desktop.default.width;
  const height = metadata?.size.desktop.default.height;
  const size = data ? `${width}x${height}` : null;
  let width0, height0, width2, height2;
  if (height === 800) {
    width0 = 500;
    height0 = 312;
  } else {
    width0 = 500;
    height0 = 280;
  }

  const [session, setSession] = useState(undefined);
  const isUserAdmin = useAdmin();

  const books = data?.series.filter(
    (book) => !JSON.parse(book.metadata).isFree
  );

  const handleTechPolicyChange = () => {
    setTechPolicy(!techPolicy);
  };

  const handleSubscribe = (e) => {
    setLoading(true);
    if (status === "authenticated") {
      router.push(`/books/in/stage/${data.slug}`);
    } else {
      router.push(`/sign/in?redirect=/books/in/stage/${data.slug}`);
    }
  };

  return (
    <>
      {slug && (
        <>
          <Box sx={{ p: 3 }}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Box>
                  <img
                    src={
                      metadata.illustrations[size][metadata.illustrations.cover]
                    }
                    alt={`${slug} ${metadata.languages.en.title}`}
                    width="100%"
                    className={classes.sideImage}
                  />

                  <Grid container>
                    {metadata.isFree && (
                      <>
                        <Grid item xs={6}>
                          <Box>
                            <img
                              src={metadata.illustrations[size][3]}
                              alt={`${slug} ${metadata.languages.en.title}`}
                              width="100%"
                              className={classes.sideImage}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box>
                            <img
                              src={metadata.illustrations[size][5]}
                              alt={`${slug} ${metadata.languages.en.title}`}
                              width="100%"
                              className={classes.sideImage}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box>
                            <img
                              src={metadata.illustrations[size][1]}
                              alt={`${slug} ${metadata.languages.en.title}`}
                              width="100%"
                              className={classes.sideImage}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box>
                            <img
                              src={metadata.illustrations[size][0]}
                              alt={`${slug} ${metadata.languages.en.title}`}
                              width="100%"
                              className={classes.sideImage}
                            />
                          </Box>
                        </Grid>
                      </>
                    )}
                    {!metadata.isFree && (
                      <Grid item xs={12}>
                        <Stack
                          sx={{ overflow: "hidden", border: "1px solid black" }}
                        >
                          <Stack
                            sx={{
                              p: 5,
                              justifyContent: "center"
                            }}
                            direction="row"
                            spacing={1}
                          >
                            <Typography variant="h5">
                              subscription includes
                            </Typography>
                            <Chip
                              sx={{ fontSize: "1.5rem" }}
                              label={books.length}
                              color="primary"
                            />
                            <Typography variant="h5">
                              {" "}
                              books in this series
                            </Typography>
                          </Stack>
                          <Box
                            sx={{
                              flexGrow: 1,
                              display: "flex",
                              height: { xs: 180, sm: "auto" },
                              overflowY: "scroll",
                              flexDirection: "row"
                            }}
                          >
                            <Grid container>
                              {books.map((oneBook, index) => {
                                const meta = JSON.parse(oneBook.metadata);
                                return (
                                  <Grid item xs={6} key={index}>
                                    {meta.illustrations && (
                                      <Stack
                                        sx={{
                                          width: "100%"
                                        }}
                                      >
                                        <BookImageInList
                                          title={oneBook.title}
                                          illustration={
                                            meta.illustrations[size][1]
                                          }
                                        />
                                      </Stack>
                                    )}
                                  </Grid>
                                );
                              })}
                            </Grid>
                          </Box>
                        </Stack>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    pt: 4,
                    pr: { xs: 0, md: 5, lg: 0 },
                    pl: { xs: 0, md: 5, lg: 10 }
                  }}
                >
                  <Typography variant="h3" className={classes.sideTitle}>
                    {metadata?.languages.en.title}
                  </Typography>
                  {metadata?.author && (
                    <Typography variant="body1">
                      Author: {metadata?.author}
                    </Typography>
                  )}
                  {metadata?.illustrator && (
                    <Typography variant="body1">
                      Illustrator: {metadata?.illustrator}
                    </Typography>
                  )}
                  <Typography className={classes.sideLanguages} variant="h5">
                    Available in:{" "}
                    {Object.keys(metadata.languages).map((lang, index) => {
                      return (
                        <Fragment key={lang}>
                          <span>{prettyName(lang)}</span>
                          {index <
                            Object.keys(metadata.languages).length - 1 && (
                            <span> | </span>
                          )}
                        </Fragment>
                      );
                    })}
                  </Typography>
                  <Typography gutterBottom variant="body1"></Typography>
                  <Stack direction="row" spacing={1}>
                    <Typography variant="h6">Pages in this book</Typography>
                    <Chip label={metadata.pages} color="primary" />
                  </Stack>
                  <Typography variant="body1">
                    {metadata.languages.en.description}
                  </Typography>
                  {metadata.languages.en.discussion && (
                    <Typography variant="body1">
                      Learning Lesson: {metadata.moral}
                    </Typography>
                  )}
                  <Box
                    sx={{
                      background: "white",
                      p: 3,
                      mt: 5,
                      border: "1px solid black",
                      "&:hover": {
                        boxShadow: `black 0px 0px 0px 1px inset, rgb(255, 255, 255) 8px -8px 0px -3px, ${Color.hex.brightgrape} 8px -8px, rgb(255, 255, 255) 16px -16px 0px -3px, ${Color.hex.brightlavender} 16px -16px, rgb(255, 255, 255) 24px -24px 0px -3px, ${Color.hex.brightviolet} 24px -24px, rgb(255, 255, 255) 32px -32px 0px -3px, ${Color.hex.fuchsia} 32px -32px;`
                        // boxShadow:
                        //   `black 0px 0px 0px 1px inset, rgb(255, 255, 255) 8px -8px 0px -3px, rgb(31, 193, 27) 8px -8px, rgb(255, 255, 255) 16px -16px 0px -3px, rgb(255, 217, 19) 16px -16px, rgb(255, 255, 255) 24px -24px 0px -3px, rgb(255, 156, 85) 24px -24px, rgb(255, 255, 255) 32px -32px 0px -3px, rgb(255, 85, 85) 32px -32px;`
                      }
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold" }} variant="body1">
                      We use an augmented reality technology only available on a
                      desktop browser. In order to read the books, you must:
                    </Typography>

                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <PhotoCameraFrontIcon
                            sx={{ color: Color.hex.brightblue }}
                          />
                        </ListItemIcon>
                        <ListItemText primary="Turn on your webcam" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <LaptopIcon sx={{ color: Color.hex.brightblue }} />
                        </ListItemIcon>
                        <ListItemText primary=" Use laptop or desktop. Smart phones will not work." />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <FaChrome
                            style={{
                              fontSize: 18,
                              color: Color.hex.brightblue
                            }}
                          />
                          <FaFirefox
                            style={{
                              fontSize: 18,
                              color: Color.hex.brightblue
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText primary="Use Chrome or Firefox. Safari will not work." />
                      </ListItem>
                    </List>
                    <Stack direction="row">
                      <Checkbox
                        sx={{ "&:hover": { background: "white" } }}
                        checked={techPolicy}
                        name="technology_policy"
                        onChange={handleTechPolicyChange}
                      />
                      <Typography sx={{ lineHeight: 5 }} variant="body2">
                        I agree (required)
                      </Typography>
                    </Stack>
                  </Box>

                  <Box
                    sx={{
                      justifyContent: "center",
                      mt: 2,
                      mb: 2,
                      pt: { xs: 1, lg: 5 },
                      pb: { xs: 1, lg: 5 },
                      display: "flex"
                    }}
                  >
                    <Stack>
                      {!techPolicy && (
                        <Button
                          sx={{ justifyItems: "center" }}
                          size="large"
                          variant="contained"
                          disabled={!techPolicy}
                        >
                          <>
                            <Typography gutterBottom sx={{ color: "black" }}>
                              Agree to tech policy
                            </Typography>
                          </>
                        </Button>
                      )}
                      {metadata.isFree && techPolicy && (
                        <NextLink
                          href={`/books/in/stage/${data.slug}`}
                          passHref
                        >
                          <Button
                            aria-label="Free Reading"
                            sx={{ maxWidth: 400 }}
                            size="large"
                            variant="contained"
                          >
                            Free Read
                          </Button>
                        </NextLink>
                      )}
                      {!metadata.isFree && techPolicy && (
                        <>
                          <Stack
                            sx={{ justifyContent: "center", display: "flex" }}
                          >
                            <Typography
                              gutterBottom
                              sx={{ textAlign: "center" }}
                              variant="h5"
                            >
                              {" "}
                              This is an annual subscription
                            </Typography>
                            {!techPolicy && (
                              <Button
                                sx={{ justifyItems: "center" }}
                                size="large"
                                variant="contained"
                                disabled={!techPolicy}
                              >
                                <>
                                  <Typography
                                    gutterBottom
                                    sx={{ color: "black" }}
                                  >
                                    Agree to tech policy
                                  </Typography>
                                </>
                              </Button>
                            )}
                            {techPolicy && (
                              <Button
                                sx={{ justifyItems: "center" }}
                                size="large"
                                variant="contained"
                                disabled={!techPolicy || loading}
                                onClick={handleSubscribe}
                              >
                                {!loading && "Read Now"}
                                {loading && <LoadingDots />}
                              </Button>
                            )}
                            <Typography
                              gutterBottom
                              sx={{ pt: { xs: 1 }, textAlign: "center" }}
                              variant="h5"
                            >
                              Backed by a 100% satisfaction guarantee.
                            </Typography>
                          </Stack>
                        </>
                      )}
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      {!slug && <>not found</>}
    </>
  );
};

export const getStaticProps = async ({ req, params }) => {
  const { bookSlug } = params;
  const body = req?.__NEXT_INIT_QUERY;
  const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL;

  const thebook = await getContentBySlug(bookSlug);
  let series;
  let data = JSON.parse(JSON.stringify(thebook));

  if (data && !data.slug) {
    data.slug = bookSlug;
  }

  return {
    props: data // will be passed to the page component as props
  };
};

export async function getStaticPaths() {
  const slugs = bookslugs;

  const bookSlugs = slugs.map((slug) => {
    return {
      params: {
        bookSlug: slug
      }
    };
  });

  return {
    paths: bookSlugs,
    fallback: "blocking"
  };
}

SingleBook.layout = StaticExternalLayout;

export default SingleBook;
