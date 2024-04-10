//event.js
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

//Library components
import { browserName } from "react-device-detect";
import { createStyles, makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// app components
import BookLayout from "@/components/layouts/BookLayout";
import EventNavbar from "@/components/ui/Navbar/EventNavbar";
import NoSsr from "@/components/ui/NoSsr";

const ParticipantMainframe = dynamic(
  () => import("@/components/ui/LiveStreaming/ParticipantMainframe"),
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

function Live() {
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
            <ParticipantMainframe />
          </div>
        )}
      </NoSsr>
    </>
  );
}

Live.layout = BookLayout;

export default Live;
