import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

//Library components
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { createStyles, makeStyles } from "@mui/styles";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import NextLink from "next/link";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

//App components
import all from "@/ar_content/books/all";
import BookData from "@/ar_content/books/a_guest_on_a_farm";
import Color from "@/components/styles/color";
import DashboardTitle from "@/components/ui/DashboardTitle";
import { getData, postData } from "@/utils/helpers";
import LoadingDots from "@/components/ui/LoadingDots";
import NotSignedIn from "@/components/ui/NotSignedIn";
import { prettyName } from "@/components/hooks/useLanguage";
import ProfileLayout from "@/components/layouts/ProfileLayout";
import { useAdmin } from "@/components/hooks/useAdmin";
import UserContext from "@/components/contexts/UserContext";

const styles = makeStyles((theme) =>
  createStyles({
    divider: {
      marginTop: 32,
      marginBottom: 32
    }
  })
);

const Upload = () => {
  const classes = styles();
  const userSession = useSession();
  const { status } = userSession;
  const [session, setSession] = useState(userSession);
  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState(undefined);
  const [user, setUser] = useContext(UserContext);
  const isUserAdmin = useAdmin();
  const [publisher, setPublisher] = useState("Atom");

  const series = {
    Atom: {
      name: "Classic Fairy Tales",
      uuid: "ca11d477-eda4-44cd-ad49-b7dd73805e6f"
    },
    "Diveo Media": {
      name: "Little Stories",
      uuid: "2a527e29-3b04-499d-a0f8-42465ff10a73"
    }
  };

  const fetchBooksByPublisher = async (pub) => {
    setLoading(true);
    const allBooks = await getData(
      `/api/content/all/by_publisher?publisher_name=${pub}`
    );
    // console.log("books", allBooks.data);
    setLoading(false);
    if (allBooks.success) {
      return setBookData(allBooks.data);
    }
  };

  useEffect(async () => {
    let mounted = true;
    if (mounted) {
      // fetchBooksByPublisher(publisher);
      fetchSeriesByUuid(series[publisher].uuid);
    }
    //get book data

    return () => (mounted = false);
  }, [setBookData, setSession, setPublisher]);

  const handleSelectPublisher = useCallback(
    async (e) => {
      const pub_name = e.target.value;
      console.log("handleSelectPublisher", pub_name);
      setPublisher(pub_name);

      fetchBooksByPublisher(pub_name);
      console.log("bookdata", BookData);
    },
    [setPublisher]
  );

  const fetchSeriesByUuid = async (series_uuid) => {
    const allBooks = await getData(`/api/content/list/${series_uuid}`);
    // console.log("books", allBooks.data);
    if (allBooks.success) {
      return setBookData(allBooks.data);
    }
  };

  const handleGetSeries = useCallback(
    async (e) => {
      e.preventDefault();
      const series_uuid = series[publisher].uuid;
      console.log("series_uuid", series_uuid);

      await fetchSeriesByUuid(series_uuid);
      console.log("bookdata", bookData);
    },
    [setPublisher, setBookData]
  );

  const handleGenerateSeries = async (e) => {
    e.preventDefault();
    console.log(
      "handleGenerateSeries",
      publisher,
      bookData,
      Array.isArray(bookData)
    );

    const uuids = bookData?.map((book) => book.uuid);
    const data = {
      book_uuids: uuids,
      series_name: series[publisher].name,
      series_uuid: series[publisher].uuid
    };

    const response = await postData({
      url: "/api/content/list/",
      data
    });

    console.log(response);
  };

  const handleUploadSeriesToStripe =
    ({ name, description }) =>
    async (e) => {
      e.preventDefault();

      const data = {
        type: "series",
        series_uuid: series[publisher].uuid,
        name,
        description
      };

      console.log("data", data);

      const response = await postData({
        url: `/api/publishers/push_to_stripe`,
        data
      });

      console.log("stripe", response);
    };

  return (
    <>
      <DashboardTitle text="Admin - Verify Books By Publisher" />
      {(status === "unauthenticated" || status === "loading") && (
        <NotSignedIn status={status} />
      )}
      <Grid container sx={{ marginTop: 5 }} justifyContent="center">
        {isUserAdmin && (
          <Grid
            item
            xs={10}
            sx={{
              padding: 3,
              marginBottom: 3,
              background: Color.ombre.beige
            }}
          >
            {bookData && (
              <Typography variant="h5" gutterBottom>
                Num of books: {Object.keys({ ...bookData }).length}
              </Typography>
            )}
            <Stack direction="row" spacing={3}>
              <FormControl fullWidth>
                <InputLabel id="select-publisher-label">Publisher</InputLabel>
                <Select
                  labelId="select-publisher-label"
                  id="select-publisher-select"
                  value={publisher}
                  label="Publisher"
                  onChange={handleSelectPublisher}
                >
                  <MenuItem value="Atom">Atom</MenuItem>
                  <MenuItem value="Diveo Media">Diveo Media</MenuItem>
                </Select>
              </FormControl>

              <Button
                size="small"
                variant="outlined"
                onClick={handleGenerateSeries}
              >
                Generate series
              </Button>
            </Stack>
            <Stack>
              <FormControl fullWidth>
                {/* <InputLabel id="select-publisher-label">Publisher</InputLabel>
                <Select
                  labelId="select-publisher-label"
                  id="select-publisher-select"
                  value={publisher}
                  label="Publisher"
                  onChange={handleSelectPublisher}
                >
                  <MenuItem value="Atom">Atom</MenuItem>
                  <MenuItem value="Diveo Media">Diveo Media</MenuItem>
                </Select> */}
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleGetSeries}
                >
                  Get All Books In Series
                </Button>
              </FormControl>
            </Stack>
          </Grid>
        )}
        {loading && (
          <Grid
            item
            xs={12}
            lg={3}
            sx={{
              textAlign: "center",
              padding: 3,
              marginBottom: 3,
              background: Color.ombre.beige
            }}
          >
            <LoadingDots />
          </Grid>
        )}
        {!loading && isUserAdmin && bookData && (
          <Grid
            item
            xs={12}
            lg={3}
            sx={{
              padding: 3,
              marginBottom: 3,
              background: Color.ombre.beige
            }}
          >
            <Button
              variant="h4"
              onClick={handleUploadSeriesToStripe({
                name: `${
                  publisher === "Atom"
                    ? "Brothers Grimm Classic Fairy Tales"
                    : "Diveo Media Little Stories"
                }`,
                description: `A collection of ${
                  bookData.length
                } online books from ${
                  publisher === "Atom" ? "Brothers Grimm" : "Diveo Media"
                }`
              })}
            >
              Upload series to Stripe
            </Button>
            {bookData?.map((book, index) => {
              const oneBook = JSON.parse(book.metadata) || {};
              const languages = Object.keys(oneBook.languages);
              const effects = oneBook.effects
                ? Object.values(oneBook.effects)
                : [];
              return (
                <Stack key={index}>
                  <Typography variant="h5">
                    {oneBook.languages.en?.title} ({oneBook.pages} pages)
                  </Typography>
                  <Typography variant="body2">
                    Author: {oneBook.author}
                  </Typography>
                  <Typography variant="body2">
                    Publisher: {book.publisher_name}
                  </Typography>
                  <Typography variant="body2">
                    Last Update: {Date(book.modified_at)}
                  </Typography>
                  {oneBook.effects ? (
                    effects.map((effect, index) => {
                      const effectUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL}webar${effect}`;
                      return (
                        <Fragment key={index}>
                          <Typography variant="body2">{effectUrl}</Typography>
                          <NextLink href={effectUrl} passHref key={effect}>
                            Download
                          </NextLink>
                        </Fragment>
                      );
                    })
                  ) : (
                    <Alert severity="error">Effects Completed: No</Alert>
                  )}

                  <Typography variant="body2">{oneBook.uuid}</Typography>
                  {languages.map((lang) => {
                    return (
                      <Fragment key={lang}>
                        <Typography variant="body1">
                          {prettyName(lang)}
                        </Typography>
                        <Typography variant="body1">
                          Title: {oneBook.languages[lang]?.title}
                        </Typography>

                        <Typography variant="body2">
                          Description: {oneBook.languages[lang]?.description}
                        </Typography>
                        <Typography variant="body2">
                          Moral: {oneBook.languages[lang]?.moral}
                        </Typography>
                        {oneBook.languages[lang]?.discussion && (
                          <Typography variant="subtitle1">
                            Discussion
                          </Typography>
                        )}
                        {oneBook.languages.en?.discussion?.map(
                          (question, index) => {
                            return (
                              <Typography variant="body2" key={index}>
                                {question}
                              </Typography>
                            );
                          }
                        )}
                      </Fragment>
                    );
                  })}

                  <Divider className={classes.divider} />
                </Stack>
              );
            })}
            <Stack direction="row">
              <Typography variant="body1"></Typography>
            </Stack>
          </Grid>
        )}
      </Grid>
    </>
  );
};

Upload.layout = ProfileLayout;

export default Upload;
