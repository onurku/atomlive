import { useState, useEffect, useLayoutEffect } from "react";
import { createStyles, makeStyles } from "@mui/styles";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { HiOutlineQuestionMarkCircle, HiOutlineXCircle } from "react-icons/hi2";

const styles = makeStyles((theme) =>
  createStyles({
    paragraph: {
      marginBottom: theme.spacing(0)
    },
    pointer: {
      cursor: "pointer"
    },
    title: {
      paddingRight: theme.spacing(1),
      textDecoration: "none"
    },
    title2: {
      paddingRight: theme.spacing(2)
    }
  })
);

const GesturesLegend = ({
  currentGestures,
  handleDisplayDescription,
  isDisplayDescription,
  title,
  page,
  setGestures,
  totalNumPages
}) => {
  const classes = styles();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setGestures(page);
    }

    return () => {
      mounted = false;
    };
  }, [setGestures, page]);

  return (
    <Box sx={{ alignItems: "center", display: "flex" }}>
      <Stack direction="row">
        <Tooltip
          title={isDisplayDescription ? `Back to page` : `About the story`}
          className={classes.pointer}
        >
          <IconButton
            onClick={handleDisplayDescription}
            size="small"
            className={classes.pointer}
          >
            {isDisplayDescription ? (
              <HiOutlineXCircle className={classes.pointer} />
            ) : (
              <HiOutlineQuestionMarkCircle className={classes.pointer} />
            )}
          </IconButton>
        </Tooltip>
        <Typography variant="body1" className={classes.title}>
          {title}
        </Typography>
        {totalNumPages && (
          <Typography variant="body1" className={classes.title2}>
            {page}/{totalNumPages}
          </Typography>
        )}
      </Stack>
      {currentGestures?.leftHeadturn && (
        <Stack>
          {currentGestures?.leftHeadturn && (
            <Typography variant="body2" className={classes.paragraph}>
              Turn Head Left: {currentGestures?.leftHeadturn}
            </Typography>
          )}
          {currentGestures?.rightHeadturn && (
            <Typography variant="body2" className={classes.paragraph}>
              Turn Head Right: {currentGestures?.rightHeadturn}
            </Typography>
          )}
          {currentGestures?.default && (
            <Typography variant="body2" className={classes.paragraph}>
              Default: {currentGestures?.default}
            </Typography>
          )}
        </Stack>
      )}
      {!currentGestures?.leftHeadturn && (
        <>
          <Typography variant="body2" className={classes.paragraph}>
            No face mask
          </Typography>
        </>
      )}
    </Box>
  );
};

export default GesturesLegend;
