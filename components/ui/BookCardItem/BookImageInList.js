import { useEffect, useCallback, useState } from "react";

//Library Components
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import "@fontsource/libre-baskerville";
import NextLink from "next/link";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

//App components
import Color from "@/components/styles/color";

const styles = makeStyles((theme) => ({
  title: {
    background: Color.hex.liberty,
    color: "white",
    height: "100%",
    flexGrow: 1,
    height: 68,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    fontFamily: "Libre Baskerville, Times New Roman",
    fontWeight: "300"
  },
  image: {
    alignItems: "center",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "row",

    justifyContent: "center",
    textAlign: "center",
    width: "100%"
  }
}));

const BookImageInList = ({ title, illustration }) => {
  const classes = styles();

  return (
    <>
      <Box>
        <Typography
          sx={{ variant: { xs: "h6", md: "h5" } }}
          className={classes.title}
        >
          {title}
        </Typography>
      </Box>
      <Box
        className={classes.image}
        sx={{
          height: { xs: 180, md: 240 },
          backgroundImage: `url(${illustration})`
        }}
      ></Box>
    </>
  );
};

export default BookImageInList;
