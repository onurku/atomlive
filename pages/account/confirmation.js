import { useContext, useEffect } from "react";

//Library components
import "@fontsource/lustria";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { isMobile } from "mobile-device-detect";

// App Components
import EmailVerifySvg from "@/components/icons/EmailVerifySvg";
import PlainLayout from "@/components/layouts/PlainLayout";

const Confirmation = () => {
  const marginTop = isMobile ? 5 : 20;

  useEffect(() => {});

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={10} md={6} lg={4}>
          <Typography
            sx={{
              textAlign: "center",
              marginBottom: 5,
              marginTop: 14,
              fontWeight: 700,
              fontFamily: "Lustria, Times New Roman"
            }}
            variant="h4"
          >
            We’ve sent you a confirmation email
          </Typography>
          <Typography
            sx={{ textAlign: "center", fontWeight: "bold" }}
            variant="body1"
          >
            Time to check your email.
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="h6">
            Click on the link in your email to confirm your account. If you
            can’t find the email, please check the spam or promotional folders.
          </Typography>
          <EmailVerifySvg />
        </Grid>
      </Grid>
    </>
  );
};

Confirmation.layout = PlainLayout;

export default Confirmation;
