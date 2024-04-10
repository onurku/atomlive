//Library Components
import Button from "@mui/material/Button";
import { common, grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import { isMobile } from "mobile-device-detect";
import "@fontsource/lustria";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createStyles, makeStyles } from "@mui/styles";

// App components
import ExternalLayout from "@/components/layouts/ExternalLayout";
import ExternalLayoutMobile from "@/components/layouts/ExternalLayoutMobile";
import MainTitle from "@/components/ui/MainTitle";
import BookCardItem from "@/components/ui/BookCardItem";
import Color from "@/components/styles/color";
import { postData } from "@/utils/helpers";

const styles = makeStyles((theme) =>
  createStyles({
    subtitle: {
      marginTop: 64,
      marginBottom: 32,
      maxWidth: 800,
      margin: "0 auto"
    }
  })
);

const ReturnsPolicy = () => {
  const classes = styles();

  return (
    <>
      <Grid container className={classes.root} justifyContent="center">
        <Grid item xs={10}>
          <Typography align="center" className={classes.subtitle} variant="h4">
            100% SATISFACTION GUARANTEE! Love our books or your money back
          </Typography>
          <Typography align="center" variant="body1">
            We want you to be completely satisfied. If for any reason you are
            not, we offer a full refund. Send us an email to support@atom.live
            and we will take care of you.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

ReturnsPolicy.layout = ExternalLayout;

const ReturnsPolicyMobile = () => {
  return (
    <>
      <span>stories</span>
    </>
  );
};

ReturnsPolicyMobile.layout = ExternalLayoutMobile;

const ReturnsPolicyPage = isMobile ? ReturnsPolicyMobile : ReturnsPolicy;

export default ReturnsPolicy;
