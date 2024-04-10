//Library components
import { common } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Stack from "@mui/material/Stack";

//App components
import Color from "@/components/styles/color";
import HeadMeta from "@/components/ui/HeadMeta";
import Navbar from "@/components/ui/Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    background: Color.ombre.sunset,
    minHeight: "100vh",
    "-ms-overflow-style": "none" /* for Internet Explorer, Edge */,
    "scrollbar-width": "none" /* for Firefox */,
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none" /* for Chrome, Safari, and Opera */
    }
  },
  container: {
    display: "block",
    margin: 0,
    padding: 0
  },
  logoContainer: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    justifyContent: "center"
  },

  logoText: {
    color: common.grey,
    paddingLeft: theme.spacing(1),
    fontWeight: 500,
    fontSize: 36,
    "&:hover": {
      textDecoration: "none"
    }
  },
  outlet: {
    paddingTop: theme.spacing(5),
    margin: 0
  },
  pageBody: {
    minHeight: "100%"
  }
}));

const BookLayout = ({ children, meta: pageMeta }) => {
  const classes = useStyles();

  const meta = {
    title: "Atom.live",
    description:
      "multilingual, interactive books. Read the same book in multiple languages",
    cardImage: "/og.jpg",
    ...pageMeta
  };

  return (
    <>
      <HeadMeta meta={meta} />
      <Grid container className={classes.root} justifyContent="center">
        <Grid item className={classes.container} xs={12}>
          <Stack className={classes.pageBody}>
            <div className={classes.pageBody} id="main-section">
              {children}
            </div>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default BookLayout;
