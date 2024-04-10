import { useCallback, useContext, useEffect, useState } from "react";
// import { Helmet } from "react-helmet";
import { useRouter } from "next/router";

//Libraries
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";

//App Components
import UserContext from "@/components/contexts/UserContext";
import GoogleSign from "@/components/ui/Button/GoogleSign";
import LoadingDots from "@/components/ui/LoadingDots";
import { getData } from "@/utils/helpers";

const SignIn = ({ handleTabChange, setShowModal }) => {
  const router = useRouter();
  const { redirect } = router.query;

  const [message, setMessage] = useState({ type: "", content: "" });

  const [user, setUser] = useContext(UserContext);
  const [userProfile, setUserProfile] = useState(user);

  useEffect(() => {
    let mounted = true;
    if (mounted && setUser) {
      setUser(userProfile);
    }

    return () => (mounted = false);
  }, [userProfile]);

  const initialValues = {
    email: "",
    password: ""
  };

  // This is a <Formik> method
  // handleEmailLogin is used for onSubmit: This handles what happens after the user submits.The onSubmit prop takes a callback function that will only run when there are no errors, meaning the user inputs are valid.
  const handleEmailLogin = useCallback(
    async (values, actions) => {
      setMessage({}); //clear error messages
      const { resetForm, setSubmitting } = actions;

      try {
        const signInRes = await signIn("credentials", {
          redirect: false,
          ...values
        });

        const { error, status } = signInRes;
        if (error) {
          return setMessage({
            type: "error",
            content: `Error: ${error.status ? error.status : ""}
        ${
          status
            ? `Incorrect credentials. Check your email and password. (${status})`
            : ""
        }
        ${error.message ? error.message.toUpperCase() : ""}`
          });
        }

        //if success

        const response = await getData("/api/account/profile");
        if (response?.error) {
          const userProfileError = response.error;
          return setMessage({
            type: "error",
            content: `${
              userProfileError.message
                ? userProfileError.message.toUpperCase()
                : ""
            } (Error ${userProfileError.status ? userProfileError.status : ""})`
          });
        }

        //success
        const data = response;
        console.log("user data", data);
        setMessage({
          type: "success",
          content: "You have successfully logged in."
        });
        setUserProfile(data);
        if (localStorage) {
          localStorage.setItem("user", JSON.stringify(data));
        }
        setUser(data);
        if (setShowModal) {
          setShowModal(false);
        }

        if (redirect) {
          router.push(redirect);
        }
      } catch (error) {
        return setMessage({
          type: "error",
          content: error.message.toUpperCase()
        });
      }

      setSubmitting(false);
      resetForm(initialValues);
      return;
    },
    [userProfile]
  );

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("email please :)"),
    password: Yup.string()
      .max(255)
      .min(6, "Password is too short - should be 6 chars minimum")
      .required("A blank password doesn't exist anywhere in the world")
  });

  return (
    <>
      {/* <Helmet>
        <title>Atom.live | Login | Foreign language books</title>
      </Helmet> */}
      <Grid container>
        <Grid item xs={12} md={5}>
          <Box mb={3} mt={2}>
            <Typography color="textPrimary" variant="h3">
              Sign in {user?.first_name}
            </Typography>
            <Typography color="textSecondary" variant="h6" gutterBottom>
              Start some reading magic.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          <GoogleSign isSignInPage={true} />
          <Divider>
            <Typography
              gutterBottom
              align="center"
              color="textSecondary"
              variant="body1"
            >
              or sign in your email address
            </Typography>
          </Divider>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleEmailLogin}
          >
            {(formik) => {
              const {
                dirty,
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
                  {message?.type === "error" && (
                    <Alert severity={message.type}>{message.content}</Alert>
                  )}
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
                  <Box sx={{ py: 2 }}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      {!isSubmitting && "Log In Now"}
                      {isSubmitting && <LoadingDots />}
                    </Button>
                  </Box>
                  <Typography color="textSecondary" variant="body2">
                    Don&apos;t have an account?{" "}
                    <Link
                      underline="always"
                      onClick={(e) => handleTabChange(e, "0")} //switch to register, which is tab value 0
                    >
                      Register
                    </Link>{" "}
                    or{" "}
                    <Link
                      underline="always"
                      onClick={(e) => handleTabChange(e, "2")} //switch to reset password, which is tab value 2
                    >
                      Reset password
                    </Link>
                  </Typography>
                </form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;
