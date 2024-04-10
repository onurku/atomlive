import { useSession } from "next-auth/react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

//app components
import Color from "@/components/styles/color";
import DashboardTitle from "@/components/ui/DashboardTitle";
import NotSignedIn from "@/components/ui/NotSignedIn";
import ProfileLayout from "@/components/layouts/ProfileLayout";

const Purchases = () => {
  const { status } = useSession();

  return (
    <>
      <DashboardTitle text="My Books" />
      {(status === "loading" || status === "unauthenticated") && (
        <NotSignedIn status={status} />
      )}
      {status === "authenticated" && (
        <Grid container justifyContent="center">
          <Grid
            item
            xs={12}
            sx={{
              padding: 3,
              mx: 10,
              mb: 5,
              background: Color.hex.beige
            }}
          >
            Nothing in your library yet.
          </Grid>
        </Grid>
      )}
    </>
  );
};

Purchases.layout = ProfileLayout;

export default Purchases;
