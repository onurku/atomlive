import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";

//Library components
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { createStyles, makeStyles } from "@mui/styles";
import Divider from "@mui/material/Divider";
import FormHelperText from "@mui/material/FormHelperText";
import { Formik } from "formik";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as Yup from "yup";

//App Components
import { postData } from "@/utils/helpers";

const styles = makeStyles((theme) =>
  createStyles({
    span: {
      marginLeft: 16
    }
  })
);

const GoogleSign = ({ isSignInPage }) => {
  const classes = styles();
  const { session, status } = useSession();

  const handleGoogleSignup = (e) => {
    const response = signIn("google");
    console.log("google response", response, session);
  };

  useEffect(() => {}, []);

  return (
    <>
      <Stack>
        <Button
          size="large"
          sx={{ marginBottom: 3 }}
          variant="outlined"
          onClick={handleGoogleSignup}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="28px"
            height="28px"
            viewBox="0 0 48 48"
          >
            <g>
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              ></path>
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              ></path>
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              ></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </g>
          </svg>
          <span className={classes.span}>
            {isSignInPage ? "Sign In" : "Sign up"} with Google
          </span>
        </Button>
      </Stack>
    </>
  );
};

export default GoogleSign;
