import { useEffect } from "react";
import "@fontsource/dm-sans";

//Library Components
import { createStyles, makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// App components
import ExternalLayout from "@/components/layouts/ExternalLayout";

const NotFound = () => {
  return (
    <>
      <Grid container justifyContent="center">
        <Grid sx={{ pb: 10, textAlign: "center" }} item xs={12} lg={8}>
          <Typography sx={{ p: 10, textAlign: "center" }} variant="h3">
            Uh-Oh! Page Not Found
          </Typography>
          <Typography variant="h4">You’re in the middle of nowhere.</Typography>
          <Typography gutterBottom variant="body2">
            The page you requested either was moved or doesn’t exist.
          </Typography>
          <Typography sx={{ pt: 3 }} variant="h5">
            "You're on your own.
          </Typography>
          <Typography gutterBottom variant="h5">
            And you know,
            <br /> what you know.
          </Typography>
          <Typography gutterBottom variant="h5">
            And you're the one,
            <br /> who'll decide
            <br /> where to go."
          </Typography>
          <Typography variant="h5">
            <em>- Dr. Seuss</em>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

NotFound.layout = ExternalLayout;

export default NotFound;
