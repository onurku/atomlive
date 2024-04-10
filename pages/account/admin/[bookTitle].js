import { Fragment, useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

//Library components
import Box from "@mui/material/Box";
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
import Color from "@/components/styles/color";
import DashboardTitle from "@/components/ui/DashboardTitle";
import NotSignedIn from "@/components/ui/NotSignedIn";
import ProfileLayout from "@/components/layouts/ProfileLayout";
import { useAdmin } from "@/components/hooks/useAdmin";
import { prettyName } from "@/components/hooks/useLanguage";
import all from "@/ar_content/books/all";

const BookDetails = () => {
  const { status } = useSession();
  const router = useRouter();
  const [session, setSession] = useState(undefined);
  const isUserAdmin = useAdmin();

  const { bookTitle, publisher } = router.query;
  const [publishers, setPublishers] = useState([]);
  const bookData = all;

  const [languages, setLanguages] = useState([]);

  useEffect(async () => {
    const newSession = await getSession();
    setSession(newSession);
    console.log(session);

    const allPublishers = Object.keys(all);
    console.log(allPublishers);
    setPublishers(allPublishers);

    const allLanguages =
      publisher && bookTitle
        ? Object.keys(all[publisher][bookTitle].languages)
        : ["en"];

    setLanguages(allLanguages);
  }, [setSession, setPublishers, setLanguages]);

  return (
    <>
      <DashboardTitle text={`Admin - Book Info`} />
      {(status === "unauthenticated" || status === "loading") && (
        <NotSignedIn status={status} />
      )}
      {isUserAdmin && (
        <Grid container sx={{ marginTop: 5 }} justifyContent="center">
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
            <Stack>
              <Typography variant="h4" gutterBottom>
                {all[publisher][bookTitle].languages["en"].title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Author: {all[publisher][bookTitle].author}
              </Typography>
              {all[publisher][bookTitle].illustrator && (
                <Typography variant="body1" gutterBottom>
                  Illustrator: {all[publisher][bookTitle].illustrator}
                </Typography>
              )}
              {all[publisher][bookTitle].composer && (
                <Typography variant="body1" gutterBottom>
                  Composer: {all[publisher][bookTitle].composer}
                </Typography>
              )}
              <Typography variant="body1" gutterBottom>
                Pages: {all[publisher][bookTitle].pages}
              </Typography>
              {languages.map((lang) => {
                if (lang.length === 2) {
                  const prettyLanguageName = prettyName(lang);
                  const moral =
                    all[publisher][bookTitle].languages[lang]?.moral;
                  const description =
                    all[publisher][bookTitle].languages[lang]?.description;
                  const discussion =
                    all[publisher][bookTitle].languages[lang]?.discussion;
                  return (
                    <Fragment key={lang}>
                      <Divider sx={{ mt: 3, mb: 3 }} />
                      <Typography variant="h4" gutterBottom>
                        {prettyLanguageName}
                      </Typography>
                      {description?.length > 0 && (
                        <>
                          <Typography variant="body1">Description:</Typography>
                          <Typography variant="subtitle1" gutterBottom>
                            {description}
                          </Typography>
                        </>
                      )}

                      {moral?.length > 0 && (
                        <>
                          <Typography variant="body1">Moral:</Typography>
                          <Typography variant="subtitle1" gutterBottom>
                            {moral}
                          </Typography>
                        </>
                      )}
                      {discussion?.length > 0 && (
                        <>
                          <Typography variant="body1">Discussion:</Typography>
                          {discussion.map((question) => {
                            return (
                              <Typography key={question} variant="subtitle1">
                                {question}
                              </Typography>
                            );
                          })}
                        </>
                      )}
                    </Fragment>
                  );
                }
              })}

              {/* <Typography variant="body1">
                {JSON.stringify(all[publisher][bookTitle])}
              </Typography> */}
            </Stack>
          </Grid>
        </Grid>
      )}
    </>
  );
};

BookDetails.layout = ProfileLayout;

export default BookDetails;
