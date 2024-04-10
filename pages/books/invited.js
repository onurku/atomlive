//event.js
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

//Library components
import { browserName } from "react-device-detect";
import { createStyles, makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// app components
import ExternalLayout from "@/components/layouts/ExternalLayout";
import NoSsr from "@/components/ui/NoSsr";

const InvitedPortal = dynamic(
  () => import("@/components/ui/LiveStreaming/InvitedPortal"),
  {
    ssr: false
  }
);

const styles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "block"
    }
  })
);

function Invited() {
  const classes = styles();

  return (
    <>
      <NoSsr>
        {!(
          browserName.toLowerCase().includes("chrome") ||
          browserName.toLowerCase().includes("firefox") ||
          (browserName.toLowerCase().includes("safari") &&
            parseFloat(browserVersion) >= 14.5)
        ) && (
          <Grid container align="center" justifyContent="center">
            <Grid item>
              <Typography variant="body1">
                This page works only on Chrome or Firefox. You are using{" "}
                {browserName}.
              </Typography>
            </Grid>
          </Grid>
        )}
        {(browserName.toLowerCase().includes("chrome") ||
          browserName.toLowerCase().includes("firefox") ||
          (browserName.toLowerCase().includes("safari") &&
            parseFloat(browserVersion) >= 14.5)) && (
          <div suppressHydrationWarning={true}>
            <InvitedPortal
              bookTitle="the_king_of_the_birds"
              channel="demo_channel"
              eventRole="participant"
              hostFirstName="Lien"
            />
          </div>
        )}
      </NoSsr>
    </>
  );
}

Invited.layout = ExternalLayout;

export default Invited;
