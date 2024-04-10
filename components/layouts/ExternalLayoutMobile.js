//Library components
import { common } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Stack from "@mui/material/Stack";

// App components
import Color from "@/components/styles/color";
import HeadMeta from "@/components/ui/HeadMeta";

const useStyles = makeStyles((theme) => ({
  root: {
    background: Color.ombre.sunset,
    minHeight: "100vh"
  },
  container: {
    display: "flex",
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
  }
}));

const ExternalLayoutMobile = ({ children, meta: pageMeta }) => {
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
          <section id="main-section">{children}</section>
        </Grid>
      </Grid>
    </>
  );
};

export default ExternalLayoutMobile;
