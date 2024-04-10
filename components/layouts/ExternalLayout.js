//Library components
import Stack from "@mui/material/Stack";
import { common } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

//App components
import Color from "@/components/styles/color";
import Footer from "@/components/ui/Footer";
import HeadMeta from "@/components/ui/HeadMeta";
import { LayoutProvider } from "@/components/contexts/LayoutContext";
import Navbar from "@/components/ui/Navbar";

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
  logoText: {
    color: common.grey,
    paddingLeft: theme.spacing(1),
    fontWeight: 500,
    fontSize: 36,
    "&:hover": {
      textDecoration: "none"
    }
  },
  main: {
    display: "flex",
    flexDirection: "column",
    minWidth: "100vh",
    backgroundImage: Color.ombre.natural
  },
  outlet: {
    paddingTop: theme.spacing(5),
    margin: 0
  }
}));

const ExternalLayout = ({ children, meta: pageMeta }) => {
  const classes = useStyles();

  const meta = {
    title: "Atom.live",
    description:
      "multilingual, interactive books. Read the same book, twice, in a different language",
    cardImage: "/og.jpg",
    ...pageMeta
  };

  return (
    <>
      <LayoutProvider>
        <HeadMeta meta={meta} />
        <Stack className={classes.main}>
          <Navbar />
          <Stack className={classes.pageBody}>
            <div id="main-section">{children}</div>
          </Stack>
          <Footer />
        </Stack>
      </LayoutProvider>
    </>
  );
};

export default ExternalLayout;
