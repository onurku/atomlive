import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingDots from "@/components/ui/LoadingDots";

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
import UserContext from "@/components/contexts/UserContext";
import { postData } from "@/utils/helpers";
import GoogleSign from "@/components/ui/Button/GoogleSign";

const styles = makeStyles((theme) =>
  createStyles({
    span: {
      marginLeft: 16
    }
  })
);

const SignUp = ({ handleTabChange, setShowModal }) => {
  const classes = styles();

  const registrationFormSchema = Yup.object().shape({
    email: Yup.string()
      .email("oops, email is not valid")
      .max(255)
      .required("email please :)"),
    first_name: Yup.string()
      .min(2, "Should be min 2 characters")
      .max(50, "Should be max 50 characters")
      .required("What your friends call you"),
    last_name: Yup.string()
      .min(2, "Should be minimum 2 characters")
      .max(50, "Should be minimum 50 characters")
      .required("What your friends call your family"),
    password: Yup.string()
      .max(255)
      .min(6, "Password is too short - should be minimum 6 characters.")
      .required("no blank password exists in the world"),
    policy: Yup.boolean().oneOf(
      [true],
      "Reading these agreements is a good thing."
    )
  });

  const initialValues = {
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    policy: false
  };
  const router = useRouter();
  const [registrationValues, setRegistrationValues] = useState(initialValues);
  const emptyAlert = { severity: "", content: "" };
  const [message, setMessage] = useState(emptyAlert);
  const [user, setUser] = useContext(UserContext);
  const [userProfile, setUserProfile] = useState(user);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setUser({ ...userProfile });
    }

    return () => (mounted = false);
  }, [userProfile]);

  const handleEmailRegistration = async (values, actions) => {
    console.log("handleEmailRegistration", values);
    setMessage(emptyAlert); //clear error messages
    const { resetForm, setSubmitting } = actions;
    setSubmitting(true);

    if (localStorage) {
      localStorage.removeItem("user");
    }

    const response = await postData({
      url: "/api/account/register",
      data: values
    });
    setSubmitting(false);

    const { success, status, message } = response;
    console.log("Sign up", response);

    if (!success) {
      return setMessage({
        severity: "error",
        content: `${message ? message.toUpperCase() : ""} (Error ${
          status ? status : ""
        })`
      });
    } else {
      const userInfo = values;
      delete userInfo.password;
      setUserProfile(userInfo);
      if (localStorage) {
        localStorage.setItem("user", JSON.stringify(userInfo));
      }
      if (setShowModal) {
        setShowModal(false);
      }

      setUser({ ...userInfo });
      resetForm(initialValues);

      setMessage({
        severity: "success",
        content: message || "Your account has been created"
      });
      router.push("/account/confirmation/");
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5} mt={2}>
          <Typography color="textPrimary" variant="h3">
            New Account
          </Typography>
          <Typography color="textSecondary" variant="h6" gutterBottom>
            Reading adventures inside.
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <GoogleSign />
          <Divider>
            <Typography
              gutterBottom
              align="center"
              color="textSecondary"
              variant="body1"
            >
              or sign up with your email address
            </Typography>
          </Divider>
          <Formik
            initialValues={registrationValues}
            validationSchema={registrationFormSchema}
            onSubmit={handleEmailRegistration}
          >
            {(formik) => {
              const {
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              } = formik;
              return (
                <form onSubmit={handleSubmit}>
                  <Stack direction="row">
                    <TextField
                      fullWidth
                      sx={{ marginRight: 2 }}
                      error={Boolean(touched.first_name && errors.first_name)}
                      helperText={touched.first_name && errors.first_name}
                      label="First name"
                      margin="normal"
                      name="first_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.first_name}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      error={Boolean(touched.last_name && errors.last_name)}
                      helperText={touched.last_name && errors.last_name}
                      label="Last name"
                      margin="normal"
                      name="last_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.last_name}
                      variant="outlined"
                    />
                  </Stack>
                  <Stack direction="column">
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="Email Address"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      helperText={touched.password && errors.password}
                      label="Password"
                      margin="normal"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        ml: -1
                      }}
                    >
                      <Checkbox
                        checked={values.policy}
                        name="policy"
                        onChange={handleChange}
                      />
                      <Typography color="textSecondary" variant="body2">
                        I have read the{" "}
                        <Link
                          color="primary"
                          href="/info/terms"
                          underline="always"
                          variant="body2"
                        >
                          Terms and Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          color="primary"
                          href="/info/terms"
                          underline="always"
                          variant="body2"
                        >
                          Privacy Policy
                        </Link>
                      </Typography>
                    </Box>

                    {Boolean(touched.policy && errors.policy) && (
                      <FormHelperText error>{errors.policy}</FormHelperText>
                    )}
                    {message.content && (
                      <Alert severity={message.severity}>
                        {message.content}
                      </Alert>
                    )}
                    <Button
                      sx={{ marginTop: 2, marginBottom: 2 }}
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      {!isSubmitting && "Sign up now"}
                      {isSubmitting && <LoadingDots />}
                    </Button>

                    <Typography color="textSecondary" variant="h6">
                      Have an account?{" "}
                      <Link
                        variant="text"
                        underline="always"
                        onClick={(e) => handleTabChange(e, "1")} //switch to sign in
                      >
                        Sign In
                      </Link>{" "}
                      or{" "}
                      <Link
                        variant="text"
                        underline="always"
                        onClick={(e) => handleTabChange(e, "2")} //switch to sign in
                      >
                        Reset Password
                      </Link>
                    </Typography>
                    <Typography color="textSecondary" variant="h6"></Typography>
                  </Stack>
                </form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;
