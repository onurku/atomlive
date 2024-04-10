import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useSpeechRecognition } from "react-speech-recognition";

import { createStyles, makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { common, green } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Color from "@/components/styles/color";

import { useContent } from "@/components/hooks/useContent";

const styles = makeStyles((theme) =>
  createStyles({
    voiceRoot: {
      marginBottom: theme.spacing(2)
    },
    panel: {
      width: "auto",
      height: "auto",
      display: "flex",
      overflowWrap: "break-word",
      whiteSpace: "normal",
      hyphens: "manual",
      flexWrap: "wrap",
      display: "flex",
      fontSize: "2rem",
      fontFamily: 'DM Sans, Roboto, "Helvetica Neue", Arial, sans-serif'
    },

    start: {
      alignSelf: "center",
      display: "flex",
      width: 30,
      height: 30,
      marginTop: theme.spacing(2),
      marginBotto: theme.spacing(2),
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: 15,
      backgroundColor: Color.hex.brightblue,
      animation: "$pulse 1.5s infinite ease-in-out both"
    },
    "@keyframes pulse": {
      "0%": {
        boxShadow: `0px 0px 5px 0px rgba(0, 0, 173, 0.3)`
      },
      "65%": {
        boxShadow: "0px 0px 5px 13px rgba(0, 0, 173, 0.3)"
      },
      "90%": {
        boxShadow: "0px 0px 5px 13px rgba(0, 0, 173, 0)"
      }
    }
  })
);

const ShowDescription = ({ description, moral }) => {
  console.log("description", description, moral);

  useEffect(() => {}, [description, moral]);
  return (
    <>
      <Typography gutterBottom variant="h5">
        About The Story
      </Typography>
      <Typography gutterBottom variant="body1">
        {description}
      </Typography>
      {moral && (
        <>
          <Typography gutterBottom variant="h5">
            What We Learn
          </Typography>
          <Typography gutterBottom variant="body1">
            {moral}
          </Typography>
        </>
      )}
    </>
  );
};

export default ShowDescription;
