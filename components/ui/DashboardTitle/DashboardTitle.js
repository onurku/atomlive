import { useState } from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Color from "@/components/styles/color";

const styles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5)
  }
}));

const DashboardTitle = ({ text, subtitle }) => {
  const classes = styles();

  return (
    <>
      <Box className={classes.root}>
        {subtitle ? (
          <>
            <Typography gutterBottom variant="h3">
              {text}
            </Typography>
            <Typography gutterBottom variant="body1">
              {subtitle}
            </Typography>
          </>
        ) : (
          <Typography variant="h4">{text}</Typography>
        )}
      </Box>
    </>
  );
};

export default DashboardTitle;
