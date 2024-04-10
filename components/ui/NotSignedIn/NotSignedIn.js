import { useState } from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import LoadingDots from "@/components/ui/LoadingDots";

const styles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const NotSignedIn = ({ status }) => {
  const classes = styles();
  return (
    <Box className={classes.root}>
      {status === "unauthenticated" && "Please sign in to view this section"}
      {status === "loading" && <LoadingDots />}
    </Box>
  );
};

export default NotSignedIn;
