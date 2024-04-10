import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";

//Library components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { isMobile } from "mobile-device-detect";
import Stack from "@mui/material/Stack";

//App components
import Color from "@/components/styles/color";
import DashboardTitle from "@/components/ui/DashboardTitle";
import NotSignedIn from "@/components/ui/NotSignedIn";
import ProfileLayout from "@/components/layouts/ProfileLayout";
import ProfileDetails from "@/components/ui/ProfileDetails";
import ProfilePhoto from "@/components/ui/ProfilePhoto";
import { getData } from "@/utils/helpers";

const Me = ({}) => {
  const { status } = useSession();
  const [session, setSession] = useState(undefined);

  useEffect(async () => {
    const newSession = await getSession();
    setSession(newSession);
    console.log(session);
  }, [setSession]);

  return (
    <>
      <DashboardTitle text="Manage Events" />
      {(status === "unauthenticated" || status === "loading") && (
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
            Events
          </Grid>
        </Grid>
      )}
    </>
  );
};

Me.layout = ProfileLayout;

const MeMobile = () => {
  return (
    <>
      <DashboardTitle text="Account" />
      <Stack sx={{ padding: 1 }} spacing={1}>
        <div>MobileMe</div>
        <ProfilePhoto />
        <ProfileDetails />
      </Stack>
    </>
  );
};

MeMobile.layout = ProfileLayout;

const MePage = isMobile ? MeMobile : Me;

export default MePage;
