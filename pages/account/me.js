import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

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
      <DashboardTitle text="Account" />
      {(status === "unauthenticated" || status === "loading") && (
        <NotSignedIn status={status} />
      )}
      {status === "authenticated" && (
        <Grid container justifyContent="center">
          <Grid
            item
            xs={12}
            lg={3}
            sx={{
              padding: 3,
              marginBottom: 3,
              background: Color.hex.beige
            }}
          >
            <ProfilePhoto />
          </Grid>
          <Grid
            item
            xs={12}
            lg={7}
            sx={{
              padding: 3,
              marginBottom: 3,
              background: Color.hex.beige
            }}
          >
            <ProfileDetails />
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
      <Stack spacing={1}>
        <ProfilePhoto />
        <ProfileDetails />
      </Stack>
    </>
  );
};

MeMobile.layout = ProfileLayout;

const MePage = isMobile ? Me : Me;

export default MePage;
