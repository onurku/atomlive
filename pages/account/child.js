import { useCallback, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

//Library components
import Alert from "@mui/material/Alert";
import {
  deepOrange,
  pink,
  deepPurple,
  blueGrey,
  blue,
  common
} from "@mui/material/colors";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";

//App components
import UserContext from "@/components/contexts/UserContext";
import Color from "@/components/styles/color";
import DashboardTitle from "@/components/ui/DashboardTitle";
import NotSignedIn from "@/components/ui/NotSignedIn";
import ProfileEditChild from "@/components/ui/ProfileEdit/ProfileEditChild";
import ProfileLayout from "@/components/layouts/ProfileLayout";
import ProfileDetailsChild from "@/components/ui/ProfileDetails/ProfileDetailsChild";
import ProfilePhoto from "@/components/ui/ProfilePhoto";
import { getData } from "@/utils/helpers";

const styles = makeStyles((theme) => ({
  dialogTitle: {
    display: "flex",
    justifyContent: "right",
    alignItems: "right"
  },
  closeButton: {
    position: "absolute !important",
    top: 0,
    right: 0
  },
  edit: {
    // padding: theme.spacing(3)
  },
  editWPadding: {
    // padding: theme.spacing(3)
  },

  photo: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    background: Color.ombre.beige
  },
  photoWPadding: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    background: Color.ombre.beige
  },
  profile: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    background: Color.ombre.beige
  }
}));

const Child = () => {
  const { data: session, status } = useSession();
  const classes = styles();
  const [children, setChildren] = useState();
  const [user, setUser] = useContext(UserContext);
  const [edit, setEdit] = useState({ mode: false });
  const [alert, setAlert] = useState(undefined);

  const colors = [pink[500], deepPurple[500], deepOrange[500], blueGrey[500]];

  const handleEditMode = (editMode) => (e) => {
    e.preventDefault();
    setEdit(editMode);
    console.log("edit", edit);
  };

  const handleEditChild = useCallback(
    ({ child, index }) =>
      (e) => {
        const newEdit = { mode: true, child: child, index: index };
        setEdit(newEdit);
        handleEditModeChange(newEdit);
        console.log(edit);
      },
    [setEdit]
  );

  const handleSnackbarClose = useCallback(() => {
    console.log("close snackbar");
    setEdit({ mode: false });
    setAlert(undefined);
  }, [setAlert]);

  const handleEditModeChange = useCallback(
    (newEdit) => {
      setEdit(newEdit);
    },
    [setEdit]
  );

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      console.log(user, edit);
    }

    return () => (mounted = false);
  }, [setUser, setEdit]);

  return (
    <>
      {(status === "unauthenticated" || status === "loading") && (
        <>
          <DashboardTitle text="Your Kids" />
          <NotSignedIn status={status} />
        </>
      )}

      {status === "authenticated" && (
        <>
          <DashboardTitle
            text="Your Kids"
            subtitle="Please add your child's name so that each child can use this account"
          />
          <Grid container justifyContent="center">
            {user?.children?.length === 0 && (
              <>
                <Grid item xs={12} lg={10} className={classes.photoWPadding}>
                  <ProfilePhoto person="child" />
                </Grid>
                <Grid item xs={12} lg={10} className={classes.profile}>
                  <ProfileDetailsChild />
                </Grid>
              </>
            )}

            {edit.mode === true && user?.children?.length > 0 && (
              <Grid item xs={12} lg={10} align="right" className={classes.edit}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleEditMode({ mode: false })}
                >
                  Back
                </Button>
              </Grid>
            )}

            {edit.mode === false && user?.children?.length > 0 && (
              <Grid
                item
                xs={12}
                lg={10}
                align="right"
                className={classes.editWPadding}
              >
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleEditMode({ mode: true })}
                >
                  Add Child
                </Button>
                <Stack
                  sx={{
                    flexWrap: "wrap",
                    pt: 3
                  }}
                  direction="row"
                >
                  {user.children.map((child, index) => {
                    return (
                      <ProfileEditChild
                        key={`${index}_${child}`}
                        child={child}
                        index={index}
                        handleEditChild={handleEditChild}
                      />
                    );
                  })}
                </Stack>
              </Grid>
            )}
            {edit.mode === true && user?.children?.length > 0 && (
              <>
                <Grid item xs={12} md={3} className={classes.photo}>
                  <ProfilePhoto
                    child={edit.child}
                    index={edit.index}
                    person="child"
                  />
                </Grid>
                <Grid item xs={12} md={7} className={classes.profile}>
                  <ProfileDetailsChild
                    child={edit.child}
                    index={edit.index}
                    setEdit={handleEditModeChange}
                  />
                </Grid>
              </>
            )}
            {alert && (
              <Snackbar
                open={alert !== undefined}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
              >
                <Alert onClose={handleSnackbarClose} severity={alert?.type}>
                  {alert?.content}
                </Alert>
              </Snackbar>
            )}
          </Grid>
        </>
      )}
    </>
  );
};

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library

//   const url = "/api/account/profile/";
//   const user = (await getData(url)) || {};

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       user
//     }
//   };
// }

Child.layout = ProfileLayout;

export default Child;
