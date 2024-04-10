import { Fragment, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

//Library components
import Alert from "@mui/material/Alert";
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
import Color from "@/components/styles/color";
import ExternalLayout from "@/components/layouts/ExternalLayout";
import LoadingDots from "@/components/ui/LoadingDots";
import { getData, postData } from "@/utils/helpers";
import { prettyName } from "@/components/hooks/useLanguage";
import UserContext from "@/components/contexts/UserContext";
import { useUpdateUser } from "@/components/hooks/useUser";

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
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      background: "rgba(0,0,0,0.65)",
      color: "white",
      fontFamily: "Libre Baskerville, Times New Roman",
      fontWeight: "300"
    }
  })
);

const heroHeight = 300;

const SingleBook = () => {
  const classes = styles();
  const router = useRouter();
  const { bookSlug } = router.query;
  const { status, data: sessionData } = useSession();
  const [data, setData] = useState();
  const [user, setUser] = useContext(UserContext);
  const { userDetails, setUserDetails } = useUpdateUser(user);
  const [loading, setLoading] = useState(false);
  const [techPolicy, setTechPolicy] = useState(false);
  const [alert, setAlert] = useState();
  const metadata = data ? JSON.parse(data.metadata) : null;
  const slug = bookSlug;
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

  const books = data?.series?.books?.filter((book) =>
    book?.metadata ? !JSON.parse(book.metadata).isFree : []
  );

  const handleTechPolicyChange = () => {
    setTechPolicy(!techPolicy);
    setAlert(undefined);
  };

  useEffect(async () => {
    let mounted = true;

    if (mounted) {
      if (status === "unauthenticated") {
        router.push(`/books/${bookSlug}`);
      } else {
        if (bookSlug && !data) {
          const response = await getData(`/api/content/${bookSlug}`);
          setData(response.data);
        }
      }
    }

    return () => {
      mounted = false;
    };
  }, [status, setData]);

  const handleSubscribe = (e) => {
    e.stopPropagation();
    setLoading(true);
    if (status === "authenticated") {
      router.push(`/books/in/stage/${data.slug}`);
    } else {
      router.push(`/sign/in?redirect=/books/in/stage/${data.slug}`);
    }
  };

  const handleAddSubscription =
    ({ item_id, item_type_id }) =>
    async (e) => {
      e.preventDefault();

      setLoading(true);
      setAlert(undefined);
      const cart = await postData({
        url: "/api/cart",
        data: {
          item_type_id: item_type_id,
          series_uuid: data.series.series_uuid,
          item_id
        }
      });

      setAlert({
        severity: cart.success ? "success" : "error",
        message: cart.message
      });
      const localUserDetails = localStorage.getItem("user");
      const userLocal = localUserDetails ? JSON.parse(localUserDetails) : null;
      userLocal.cart = cart.data;
      localStorage.setItem("user", JSON.stringify(userLocal));
      setUser({ ...userLocal });
      setLoading(false);
    };
  return (
    <>
      {slug && !data && (
        <Stack
          direction="column"
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            minHeight: "100vh",
            alignItems: "center",
            p: 10
          }}
        >
          {/* <CircularProgress /> */}
          <LoadingDots />
          <Typography variant="h3">Loading</Typography>
        </Stack>
      )}
      {slug && data && (
        <>
          <Box sx={{ p: 3 }}>
            <Grid container>
              <Grid item xs={12} md={7}>
                <Box>
                  <img
                    src={
                      metadata?.illustrations[size][
                        metadata?.illustrations.cover
                      ]
                    }
                    alt={`${slug} ${metadata?.languages?.en.title}`}
                    width="100%"
                    className={classes.sideImage}
                  />

                  <Grid container>
                    {metadata?.isFree && (
                      <>
                        <Grid item xs={6}>
                          <Box>
                            <img
                              src={metadata?.illustrations[size][3]}
                              alt={`${slug} ${metadata?.languages.en.title}`}
                              width="100%"
                              className={classes.sideImage}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box>
                            <img
                              src={metadata?.illustrations[size][5]}
                              alt={`${slug} ${metadata?.languages.en.title}`}
                              width="100%"
                              className={classes.sideImage}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box>
                            <img
                              src={metadata?.illustrations[size][1]}
                              alt={`${slug} ${metadata?.languages.en.title}`}
                              width="100%"
                              className={classes.sideImage}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box>
                            <img
                              src={metadata?.illustrations[size][0]}
                              alt={`${slug} ${metadata?.languages.en.title}`}
                              width="100%"
                              className={classes.sideImage}
                            />
                          </Box>
                        </Grid>
                      </>
                    )}
                    {!metadata?.isFree && (
                      <Grid item xs={12}>
                        <Stack
                          sx={{
                            overflow: "hidden",
                            border: "1px solid black"
                          }}
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
                              Subscription contains
                            </Typography>
                            <Chip
                              sx={{ fontSize: "1.5rem" }}
                              label={books?.length}
                              color="primary"
                            />
                            <Typography variant="h5"> books</Typography>
                          </Stack>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              height: { xs: 180, sm: "auto" },
                              overflowY: "scroll",
                              flexDirection: "row"
                            }}
                          >
                            <Grid container>
                              {books?.map((oneBook, index) => {
                                const meta = JSON.parse(oneBook.metadata);

                                return (
                                  <Grid
                                    item
                                    xs={6}
                                    sx={{
                                      display: "flex"
                                      // width: "50%",
                                      // height: 280
                                    }}
                                    key={index}
                                  >
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

              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    pt: 4,
                    pr: { xs: 0, md: 4, lg: 8 },
                    pl: { xs: 0, md: 4, lg: 8 }
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
                  <Typography className={classes.sideLanguages} variant="body1">
                    Available in:{" "}
                    {metadata?.languages &&
                      Object.keys(metadata?.languages)?.map((lang, index) => {
                        return (
                          <Fragment key={lang}>
                            <span>{prettyName(lang)}</span>
                            {index <
                              Object.keys(metadata?.languages).length - 1 && (
                              <span> | </span>
                            )}
                          </Fragment>
                        );
                      })}
                  </Typography>
                  <Stack sx={{ pb: 2 }} direction="row" spacing={1}>
                    <Typography variant="h5">Pages in this book: </Typography>
                    <Chip label={metadata?.pages} color="primary" />
                  </Stack>
                  <Typography variant="body1">
                    {metadata?.languages.en.description}
                  </Typography>
                  {metadata?.moral && (
                    <Typography variant="body1">
                      Learning Lesson: {metadata?.moral}
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
                      pt: { xs: 1, lg: 5 },
                      pb: { xs: 1, lg: 5 },
                      display: "flex"
                    }}
                  >
                    <Stack>
                      {!techPolicy && (
                        <Button
                          aria-label="Agree to tech policy"
                          sx={{ justifyItems: "center", mt: 2, mb: 2 }}
                          size="large"
                          variant="contained"
                          disabled={!techPolicy}
                        >
                          <Typography gutterBottom sx={{ color: "black" }}>
                            Agree to tech policy
                          </Typography>
                        </Button>
                      )}
                      {metadata?.isFree && techPolicy && (
                        <NextLink href={`/books/in/stage/${bookSlug}`}>
                          <Button
                            aria-label="Free Reading"
                            sx={{ maxWidth: 400 }}
                            size="large"
                            variant="contained"
                            disabled={!techPolicy}
                          >
                            Free Read
                          </Button>
                        </NextLink>
                      )}
                      {!metadata?.isFree && techPolicy && (
                        <>
                          <Stack
                            sx={{ justifyContent: "center", display: "flex" }}
                          >
                            {alert && (
                              <Alert severity={alert.severity}>
                                {alert.message}
                              </Alert>
                            )}
                            <Button
                              aria-label="Read Now"
                              sx={{ justifyItems: "center" }}
                              size="large"
                              variant="contained"
                              disabled={loading}
                              onClick={handleSubscribe}
                            >
                              {loading ? (
                                <LoadingDots />
                              ) : (
                                <>
                                  Read Now
                                  {data?.series?.subscription_options[0]?.price
                                    ? ` $${data?.series?.subscription_options[0]?.price}`
                                    : ""}
                                </>
                              )}
                            </Button>
                            {/* <Button
                              aria-label="Subscribe to series"
                              sx={{ justifyItems: "center" }}
                              size="large"
                              variant="contained"
                              disabled={loading}
                              onClick={handleAddSubscription({
                                item_id:
                                  data?.series?.subscription_options[0]?.item_id
                              })}
                            >
                              {loading ? (
                                <LoadingDots />
                              ) : (
                                <>
                                  Add subscription to cart
                                  {data?.series?.subscription_options[0]?.price
                                    ? ` $${data?.series?.subscription_options[0]?.price}`
                                    : ""}
                                </>
                              )}
                            </Button> */}
                            {/* </NextLink> */}
                          </Stack>
                        </>
                      )}
                    </Stack>
                  </Box>
                  {!metadata?.isFree && (
                    <>
                      {/* <Typography
                        gutterBottom
                        sx={{ pt: { xs: 1 } }}
                        variant="h5"
                      >
                        Books included in subscription:
                      </Typography> */}

                      {books?.map((oneBook, index) => {
                        return (
                          <></>
                          // <ListItem key={index}>
                          //   <ListItemIcon>
                          //     <StarIcon sx={{ color: Color.hex.brightblue }} />
                          //   </ListItemIcon>
                          //   <ListItemText
                          //     primary={`${index + 1} - ${oneBook.title}`}
                          //   />
                          // </ListItem>
                        );
                      })}
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      {!bookSlug && <>not found</>}
    </>
  );
};

SingleBook.layout = ExternalLayout;

export default SingleBook;
