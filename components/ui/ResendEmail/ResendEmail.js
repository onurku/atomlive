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
import { getData } from "@/utils/helpers";

const ResendEmail = ({ setShowModal }) => {
  const router = useRouter();
  const [message, setMessage] = useState({ type: "", content: "" });
  const emailLocalStorage = localStorage
    ? JSON.parse(localStorage.getItem("user")).email
    : "";
  const [user, setUser] = useContext(UserContext);
  const [userProfile, setUserProfile] = useState(user);
  const initialValues = {
    email: emailLocalStorage
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
  const handleResendEmail = async (values, actions) => {
    setMessage({}); //clear error messages
    const { resetForm, setSubmitting } = actions;

    setSubmitting(true);

    const response = await getData(
      `/api/account/verify_email?email=${initialValues.email}`
    );

    const { success, status, message } = response;

    if (!success) {
      return setMessage({
        type: "error",
        content: `${message ? message.toUpperCase() : ""} (Error ${
          status ? status : ""
        })`
      });
    }

    //success
    setMessage({
      type: "success",
      content: message || "Email confirmation was sent"
    });
    if (setShowModal) {
      setShowModal(false);
    }
    setSubmitting(false);
    router.push("/account/verify-email/");
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("email")
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={5}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h4">
              Resend Email Confirmation
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleResendEmail}
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
                  {message.content && (
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
                  <Box sx={{ pt: 2, pb: 2 }}>
                    <Button
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? (
                        <LoadingDots />
                      ) : (
                        "Resend Email Confirmation"
                      )}
                    </Button>
                  </Box>
                </form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default ResendEmail;
