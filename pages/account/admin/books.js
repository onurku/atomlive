import { Fragment, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

//Library components
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { createStyles, makeStyles } from "@mui/styles";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import NextLink from "next/link";
import Paper from "@mui/material/Paper";
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
import Color from "@/components/styles/color";
import DashboardTitle from "@/components/ui/DashboardTitle";
import { getData } from "@/utils/helpers";
import LoadingDots from "@/components/ui/LoadingDots";
import NotSignedIn from "@/components/ui/NotSignedIn";
import ProfileLayout from "@/components/layouts/ProfileLayout";
import { useAdmin } from "@/components/hooks/useAdmin";
import { prettyName } from "@/components/hooks/useLanguage";

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
  const { status } = useSession();
  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState();
  const isUserAdmin = useAdmin();

  const [publishers, setPublishers] = useState([]);

  useEffect(async () => {
    const fetchBooks = async () => {
      setLoading(true);
      //get book data
      const allBooks = await getData("/api/content/all");
      //console.log("books", allBooks.data);
      if (allBooks.success) {
        setBookData(allBooks.data);
        console.log("publishersxxxxx", Object.keys(allBooks.data));
        setPublishers(Object.keys(allBooks.data));
      }
      setLoading(false);
    };
    if (!bookData) {
      fetchBooks();
    }
  }, [setBookData, setPublishers]);

  return (
    <>
      <DashboardTitle text="Admin - Verify data" />
      {(status === "unauthenticated" || status === "loading") && (
        <NotSignedIn status={status} />
      )}

      {isUserAdmin && !bookData && loading && <LoadingDots />}
      {isUserAdmin && !bookData && !loading && (
        <Typography
          sx={{
            padding: 3,
            marginBottom: 3
          }}
          variant="body1"
        >
          "Book data not retrieved"
        </Typography>
      )}
      {isUserAdmin && bookData && (
        <Grid container sx={{ marginTop: 5 }} justifyContent="center">
          <Grid
            item
            xs={12}
            sx={{
              p: 3,
              mx: 10,
              background: Color.ombre.beige
            }}
          >
            {publishers?.map((pub, ind) => {
              return (
                <Fragment key={ind}>
                  {bookData[pub]?.map((book, index) => {
                    const oneBook = JSON.parse(book.metadata) || {};

                    console.log("oneBook", oneBook, book.metadata);
                    const languages = Object.keys(oneBook.languages);
                    const effects = oneBook.effects
                      ? Object.values(oneBook.effects)
                      : [];
                    return (
                      <Stack key={index}>
                        <Typography variant="h4">
                          {oneBook.languages.en?.title} ({oneBook.pages} pages)
                        </Typography>
                        <Typography variant="body1">
                          Author: {oneBook.author}
                        </Typography>
                        <Typography variant="body1">
                          Publisher: {book.publisher_name}
                        </Typography>
                        <Typography variant="body1">
                          Last Update: {Date(book.modified_at)}
                        </Typography>

                        {oneBook?.effectDetails ? (
                          Object.values(oneBook?.effectDetails).map(
                            (effect, index) => {
                              const effectUrl = `${effect.file}`;
                              return (
                                <Fragment key={index}>
                                  <Typography variant="body2">
                                    {effectUrl}
                                  </Typography>
                                  <NextLink
                                    href={effectUrl}
                                    passHref
                                    key={effect}
                                  >
                                    Download
                                  </NextLink>
                                </Fragment>
                              );
                            }
                          )
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
                                Description:{" "}
                                {oneBook.languages[lang]?.description}
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
                </Fragment>
              );
            })}

            <Stack direction="row">
              <Typography variant="body1"></Typography>
            </Stack>
          </Grid>
        </Grid>
      )}
    </>
  );
};

Upload.layout = ProfileLayout;

export default Upload;
