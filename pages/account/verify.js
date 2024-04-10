import { useState, useContext, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

//Library components
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { isMobile } from "mobile-device-detect";

// App Components
import UserContext from "@/components/contexts/UserContext";
import DashboardTitle from "@/components/ui/DashboardTitle";
import EmailVerifySvg from "@/components/icons/EmailVerifySvg";
import ExternalLayout from "@/components/layouts/ExternalLayout";
import LoadingDots from "@/components/ui/LoadingDots";
import ProfileLayout from "@/components/layouts/ProfileLayout";
import ProfileDetailsChild from "@/components/ui/ProfileDetails/ProfileDetailsChild";
import { getData, postData } from "@/utils/helpers";

const VerifyEmail = () => {
  const marginTop = isMobile ? 5 : 20;
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ severity: "", content: "" });
  const router = useRouter();
  const { code, uuid } = router.query;

  console.log("code, uuid", code, uuid);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // empty array as second argument equivalent to componentDidMount
      const url = `/api/account/verify_email/code?code=${code}&uuid=${uuid}`;

      const response = await getData(url);
      const { error } = response;
      console.log("getData", url, response);

      if (error) {
        setLoading(false);
        return setMessage({ success: false, severity: "error", error });
      }

      //successfully verified
      const updatedUser =
        localStorage && localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user"))
          : null;
      if (updatedUser) {
        updatedUser.is_email_verified = true;

        if (localStorage) {
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }

        if (setUser) {
          setUser({ ...updatedUser });
        }
        setLoading(false);

        return setMessage({
          success: true,
          severity: "success",
          content:
            "Email has been successfully verified. Please sign in using your credentials."
        });
        //router.push("/books/");
      }
      setLoading(false);
      return setMessage({
        success: false,
        severity: "error",
        content: "Unknown account error."
      });
    }

    let mounted = true;

    if (mounted && code && uuid) {
      fetchData();
    }

    return () => {
      mounted = false;
    };
  }, [code, uuid, setUser]);

  const { severity, content, success } = message;
  return (
    <>
      <Grid
        sx={{ minHeight: "100vh", alignItems: "center" }}
        container
        justifyContent="center"
      >
        <Grid item xs={10} md={4}>
          <Typography
            sx={{
              textAlign: "center",
              pb: 3
            }}
            variant="h3"
          >
            Verifying Email
          </Typography>

          <Box fullWidth sx={{ textAlign: "center" }}>
            {loading ? (
              <LoadingDots />
            ) : (
              severity &&
              content && (
                <Alert severity={severity ? severity : ""}>{content}</Alert>
              )
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

VerifyEmail.layout = ExternalLayout;

export default VerifyEmail;
