//Library components
import { common } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Stack from "@mui/material/Stack";

//App components
import Color from "@/components/styles/color";
import Footer from "@/components/ui/Footer";
import HeadMeta from "@/components/ui/HeadMeta";
import Navbar from "@/components/ui/Navbar/NavbarStatic";

const useStyles = makeStyles((theme) => ({
  root: {
    background: Color.hex.natural,
    minHeight: "100vh"
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
  main: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(10)
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

const StaticExternalLayout = ({ children, meta: pageMeta }) => {
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
          <Navbar />
          <div className={classes.main} id="main-section">
            {children}
          </div>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
};

export default StaticExternalLayout;
