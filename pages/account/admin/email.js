import { useContext, useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

//Library components
import Button from "@mui/material/Button";
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
import LoadingDots from "@/components/ui/LoadingDots";
import NotSignedIn from "@/components/ui/NotSignedIn";
import { patchData, postData } from "@/utils/helpers";
import ProfileLayout from "@/components/layouts/ProfileLayout";
import { useAdmin } from "@/components/hooks/useAdmin";
import UserContext from "@/components/contexts/UserContext";
import { v4 } from "uuid";
const uuidv4 = v4;

const Upload = () => {
  const { status } = useSession();
  const [user, setUser] = useContext(UserContext);
  const [session, setSession] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const [publishers, setPublishers] = useState([]);
  const bookData = all;
  //console.log("books", bookData);

  useEffect(async () => {
    const allPublishers = Object.keys(all);
    console.log(allPublishers);
    setPublishers(allPublishers);
  }, [setSession, setPublishers]);

  const handleUpload = async (
    e,
    { author_uuid, book_uuid, title, publisher_name, publisher_uuid, metadata }
  ) => {
    console.log(
      "handleUpload",
      title,
      publisher_name,
      JSON.parse(metadata),
      book_uuid
    );

    const data = await patchData({
      url: `/api/content/`,
      data: {
        author_uuid,
        book_uuid,
        force_update: 1,
        metadata,
        publisher_name,
        publisher_uuid,
        title
      }
    });

    console.log(data);
  };

  const handleCreateBook = async (e, { title, publisher_name, metadata }) => {
    e.preventDefault();
    console.log("create book,", title, publisher_name, metadata);
    console.log("create book, uuid=", uuidv4());

    const data = await postData({
      url: `/api/content`,
      data: { title, publisher_name, metadata }
    });

    console.log(data);
  };

  return (
    <>
      <DashboardTitle text="Admin - Review book data before upload" />
      {(status === "unauthenticated" || status === "loading") && (
        <NotSignedIn status={status} />
      )}
      {status === "authenticated" && !user?.roles?.includes("atom-admin") && (
        <Typography variant="h5">
          You do not have access to this page.
        </Typography>
      )}
      {status === "authenticated" && user?.roles?.includes("atom-admin") && (
        <Grid container justifyContent="center">
          <Grid
            item
            xs={12}
            lg={10}
            sx={{
              padding: 3,
              marginBottom: 3,
              background: Color.ombre.beige
            }}
          >
            {publishers?.map((publisher) => {
              // const allTitles = Object.keys(all[publisher]).filter(
              //   (title) =>
              //     title !== "effects" &&
              //     title !== "effectDetails" &&
              //     title !== "founder" &&
              //     title !== "intro" &&
              //     title !== "name" &&
              //     title !== "social"
              // );
              const allTitles = Object.keys(all[publisher].content);

              return (
                <Stack sx={{ mb: 6 }} key={publisher}>
                  <Typography variant="h4" gutterBottom>
                    {all[publisher].name}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {all[publisher].intro}
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Title</TableCell>
                          <TableCell align="right">en</TableCell>
                          <TableCell align="right">es</TableCell>
                          <TableCell align="right">de</TableCell>
                          <TableCell align="right">fr</TableCell>
                          <TableCell align="right">ru</TableCell>
                          <TableCell align="right">vn</TableCell>
                          <TableCell align="right">Pages</TableCell>
                          <TableCell align="right">Upload</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {all[publisher] &&
                          allTitles?.map((title) => {
                            const thisTitle =
                              all[publisher].content[
                                title
                              ]?.languages?.en?.title.split(" ") || [];
                            const capitalizedTitle =
                              thisTitle
                                ?.map(
                                  (word) =>
                                    word[0].toUpperCase() + word.substring(1)
                                )
                                ?.join(" ") || "";

                            if (title !== "intro" && title !== "name") {
                              return (
                                <TableRow
                                  key={title}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0
                                    }
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    <NextLink
                                      href={`/admin/${title}?publisher=${publisher}`}
                                      passHref
                                    >
                                      {capitalizedTitle}
                                    </NextLink>
                                  </TableCell>
                                  <TableCell align="right">
                                    {all[publisher].content[title].languages?.en
                                      ? "yes"
                                      : "no"}
                                  </TableCell>
                                  <TableCell align="right">
                                    {all[publisher].content[title].languages?.es
                                      ? "yes"
                                      : "no"}
                                  </TableCell>
                                  <TableCell align="right">
                                    {all[publisher].content[title].languages?.fr
                                      ? "yes"
                                      : "no"}
                                  </TableCell>
                                  <TableCell align="right">
                                    {all[publisher].content[title].languages?.fr
                                      ? "yes"
                                      : "no"}
                                  </TableCell>
                                  <TableCell align="right">
                                    {all[publisher].content[title].languages?.ru
                                      ? "yes"
                                      : "no"}
                                  </TableCell>
                                  <TableCell align="right">
                                    {all[publisher].content[title].languages?.vn
                                      ? "yes"
                                      : "no"}
                                  </TableCell>
                                  <TableCell align="right">
                                    {all[publisher].content[title].pages}
                                  </TableCell>
                                  <TableCell align="right">
                                    {all[publisher]?.content[title]?.uuid && (
                                      <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={(e) =>
                                          handleUpload(e, {
                                            title: capitalizedTitle,
                                            publisher_name: all[publisher].name,
                                            publisher_uuid:
                                              all[publisher].publisher_uuid,
                                            author_uuid: all[publisher]
                                              .author_uuid
                                              ? all[publisher].author_uuid
                                              : all[publisher].publisher_uuid,
                                            metadata: JSON.stringify(
                                              all[publisher].content[title]
                                            ),
                                            book_uuid:
                                              all[publisher]?.content[title]
                                                ?.uuid
                                          })
                                        }
                                      >
                                        {loading !== false ? (
                                          <LoadingDots />
                                        ) : (
                                          "Upload"
                                        )}
                                      </Button>
                                    )}
                                    {!all[publisher]?.content[title]?.uuid && (
                                      <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={(e) =>
                                          handleCreateBook(e, {
                                            title: title,
                                            publisher_name: all[publisher].name,
                                            metadata: JSON.stringify(
                                              all[publisher].content[title]
                                            ),
                                            book_uuid: uuidv4()
                                          })
                                        }
                                      >
                                        {loading !== false ? (
                                          <LoadingDots />
                                        ) : (
                                          "Create"
                                        )}
                                      </Button>
                                    )}
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>
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
