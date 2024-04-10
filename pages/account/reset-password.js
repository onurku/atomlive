import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

//Library components
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { isMobile } from "mobile-device-detect";

// App Components
import ExternalLayout from "@/components/layouts/ExternalLayout";
import LoadingDots from "@/components/ui/LoadingDots";
import { postData } from "@/utils/helpers";

const SetNewPassword = () => {
  const router = useRouter();
  const { code, uuid } = router.query;
  const marginTop = isMobile ? 5 : 20;
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ type: "", content: "" });

  const handleSetPassword = async (e) => {
    setSubmitting(true);
    setErrorMessage({});

    if (password !== password2) {
      setSubmitting(false);
      return setErrorMessage({
        type: "error",
        content: "Passwords must match"
      });
    } else if (password.length < 6) {
      setSubmitting(false);
      return setErrorMessage({
        type: "error",
        content: "Passwords be 6+ characters"
      });
    }

    try {
      const response = await postData({
        url: "/api/account/reset_password",
        data: {
          new_password: password,
          code,
          uuid
        }
      });

      const { error, message, status } = response;

      if (error) {
        setSubmitting(false);
        return setErrorMessage({
          type: "error",
          content: `Error: ${message ? message : ""} (${status ? status : ""})`
        });
      }

      //success

      setSubmitting(false);
      router.push("/account/me/");
    } catch (error) {
      setSubmitting(false);
      setErrorMessage({
        type: "error",
        content: "Error. Try again later or contact support. "
      });
    }

    //success
    return;
  };

  const handlePasswordChange = (e, type) => {
    const newPassword = e.target.value;
    if (type === 0) {
      setPassword(newPassword);
    } else {
      setPassword2(newPassword);
    }
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={10} md={6} lg={4}>
          <Typography
            sx={{
              textAlign: "center",
              marginBottom: 3,
              marginTop: 14
            }}
            variant="h3"
          >
            Create a New Password
          </Typography>
          {errorMessage.type === "error" && (
            <Alert severity="error">
              {errorMessage.content ? errorMessage.content : "Error"}
            </Alert>
          )}
          <TextField
            fullWidth
            label="New Password"
            margin="normal"
            name="password"
            type="password"
            value={password}
            variant="outlined"
            onChange={(e) => handlePasswordChange(e, 0)}
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            margin="normal"
            name="password2"
            type="password"
            value={password2}
            variant="outlined"
            onChange={(e) => handlePasswordChange(e, 1)}
            required
          />

          <Button
            sx={{ marginTop: 3 }}
            color="primary"
            onClick={handleSetPassword}
            disabled={isSubmitting}
            fullWidth
            size="large"
            variant="contained"
          >
            {isSubmitting ? <LoadingDots /> : "Set New Password"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

SetNewPassword.layout = ExternalLayout;

export default SetNewPassword;
