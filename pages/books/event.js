//event.js
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

//Library components
import {
  browserName,
  engineVersion,
  deviceDetect,
  browserVersion
} from "react-device-detect";
import { createStyles, makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// app components
import BookLayout from "@/components/layouts/BookLayout";
import NoSsr from "@/components/ui/NoSsr";

const HostMainframe = dynamic(
  () => import("@/components/ui/LiveStreaming/HostMainframe"),
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

function Event() {
  const classes = styles();
  console.log(
    "browserName",
    browserName,
    engineVersion,
    deviceDetect,
    browserVersion
  );
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
                This page works only on Chrome or Firefox, Safari 14.5+. You are
                using {browserName} {browserVersion}
              </Typography>
            </Grid>
          </Grid>
        )}
        {(browserName.toLowerCase().includes("chrome") ||
          browserName.toLowerCase().includes("firefox") ||
          (browserName.toLowerCase().includes("safari") &&
            parseInt(browserVersion) >= 14)) && (
          <div suppressHydrationWarning={true}>
            <HostMainframe />
          </div>
        )}
      </NoSsr>
    </>
  );
}

Event.layout = BookLayout;

export default Event;
