import { useState, useEffect } from "react";

//Library components
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { isMobile } from "mobile-device-detect";

// App Components
import EmailVerifySvg from "@/components/icons/EmailVerifySvg";
import ExternalLayout from "@/components/layouts/ExternalLayout";

const SetNewPassword = () => {
  const marginTop = isMobile ? 5 : 20;
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isEmailConfirmed, setEmailConfirmed] = useState(true);

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
            Time to check your email.
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="h6">
            Click on the link in your email to confirm your email. If you can’t
            find the email, please check the spam or promotional folders.
          </Typography>
          <EmailVerifySvg />
        </Grid>
      </Grid>
    </>
  );
};

SetNewPassword.layout = ExternalLayout;

export default SetNewPassword;
