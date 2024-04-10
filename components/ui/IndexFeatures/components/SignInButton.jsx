import { useState } from "react";
import router from "next/router";

import Popover from "@mui/material/Popover";
import { makeStyles } from "@mui/styles";

import { Button } from "../components/Button"; // Assuming this is the custom Button we worked on earlier

const useStyles = makeStyles({
  title: {
    fontSize: "1.5rem"
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    width: 200,
    justifyContent: "center"
  },
  popoverContent: {
    width: "320px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  textCenter: {
    fontSize: 16,
    textAlign: "center"
  }
});

const SignInButton = ({ className }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/sign/in");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        isRounded
        className={className}
        onClick={handleClick}
      >
        <div className={classes.buttonContent}>
          <div className={classes.title}>Sign In</div>
        </div>
      </Button>
      <Popover
        PaperProps={{
          sx: {
            borderRadius: "16px",
            marginTop: "8px"
          }
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <div className={classes.popoverContent}>
          <div className={classes.textCenter}>Hello, please sign in.</div>
          <Button onClick={handleClose} isRounded>
            Sign In
          </Button>
          <Button onClick={handleClose} isRounded variant="outline">
            Register
          </Button>
        </div>
      </Popover>
    </>
  );
};

export default SignInButton;
