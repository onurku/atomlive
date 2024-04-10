import { useEffect } from "react";
import "@fontsource/dm-sans";

//Library Components
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
            Uh-Oh!
          </Typography>
          <Typography variant="h4">
            Server encountered an small glitch. Try again later.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

NotFound.layout = ExternalLayout;

export default NotFound;
