import { useEffect, useState, useCallback, useContext } from "react";
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

//App Components
import UserContext from "@/components/contexts/UserContext";
import LoadingDots from "@/components/ui/LoadingDots";

const ResetPassword = ({ handleTabChange, setShowModal }) => {
  const router = useRouter();
  const [message, setMessage] = useState({ type: "", content: "" });
  const [email, setEmail] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [userProfile, setUserProfile] = useState(user);
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: ""
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setUser(userProfile);
    }

    return () => (mounted = false);
  }, [userProfile]);

  // This is a <Formik> method
  // handleEmailLogin is used for onSubmit: This handles what happens after the user submits.The onSubmit prop takes a callback function that will only run when there are no errors, meaning the user inputs are valid.
  const handleResetPassword = async (values, actions) => {
    console.log(values);
    setMessage({}); //clear error messages
    const { resetForm, setSubmitting } = actions;
    setLoading(true);
    setSubmitting(true);

    const response = await fetch(`/api/account/reset_password/${values.email}`);
    const { success, status, message } = (await response?.json()) || {};

    setLoading(false);
    setSubmitting(false);

    if (!response.ok) {
      return setMessage({
        type: "error",
        content: `${message ? message.toUpperCase() : ""} (Error ${
          status ? status : ""
        })`
      });
    }

    //success
    setMessage({
      type: "note",
      content: message
    });

    if (setShowModal) {
      setShowModal(false);
    }

    resetForm(initialValues);
    router.push("/account/confirm-email/");
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("email please :) ")
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={5}>
          <Box mb={3} mt={2}>
            <Typography color="textPrimary" variant="h3">
              Reset password
            </Typography>
            <Typography color="textSecondary" variant="h6" gutterBottom>
              Check your spam folder!
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleResetPassword}
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
                  {message.content && message.type === "error" && (
                    <Alert severity="error">{message.content}</Alert>
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
                  <Box sx={{ pt: 2, pb: 2 }}>
                    <Button
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      {loading ? <LoadingDots /> : "Reset Password"}
                    </Button>
                  </Box>
                  <Typography color="textSecondary" variant="body2">
                    Don&apos;t have an account?{" "}
                    <Link
                      variant="h6"
                      underline="always"
                      onClick={(e) => handleTabChange(e, "0")} //switch to register, which is tab value 0
                    >
                      Register for a new account
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

export default ResetPassword;
