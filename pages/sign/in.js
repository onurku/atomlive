import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Button from "@mui/material/Button";
import GitHub from "@/components/icons/GitHub";
import Input from "@/components/ui/Input";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import Logo from "@/components/icons/Logo";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//app components
import StaticExternalLayout from "@/components/layouts/StaticExternalLayout";
import SignIn from "@/components/ui/SignIn";
import SignUp from "@/components/ui/SignUp";
import ResetPassword from "@/components/ui/ResetPassword";
import LoadingDots from "@/components/ui/LoadingDots";
import UserContext from "@/components/contexts/UserContext";
import { useUpdateUser } from "@/components/hooks/useUser";

const SignInPage = () => {
  const { status, data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signType, setSignType] = useState("signin"); //"signup" or "resetpassword"
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [user, setUser] = useContext(UserContext);
  const { userDetails } = useUpdateUser(user);
  const router = useRouter();
  const { redirect } = router.query;
  console.log("session", status, session);
  console.log(
    "router",
    `${router.basePath}${redirect}`,
    router,
    "redirect",
    redirect
  );
  if (session) {
    if (redirect) {
      console.log("redirect with session", redirect);
      router.push(`${redirect}`);
    } else {
      router.push("/account/");
    }
  } else {
    console.log("no session");
  }

  const switchSignType = (e, signType) => {
    e.preventDefault();
    setSignType(signType);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    setMessage({});

    try {
      const { data, error } = await postData({
        url: "/api/account/login",
        data: { email, password }
      });
      setLoading(false);

      if (error) {
        console.log("error", error);
        setMessage({
          type: "error",
          content: `Error: ${error.status ? error.status : ""} ${
            error.message ? error.message : ""
          }`
        });
        return;
      }

      setMessage({
        type: "note",
        content: data.message
      });
    } catch (error) {
      console.error("Post data error", error);
    }

    setLoading(false);
  };

  useEffect(() => {}, [userDetails]);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid
          item
          xs={11}
          md={8}
          xl={6}
          sx={{ mt: 8, backgroundColor: "white" }}
        >
          <Stack sx={{ p: 5 }}>
            <Stack
              sx={{ mb: { xs: 1, md: 5 } }}
              direction="row"
              justifyContent={"center"}
            >
              <Button
                variant="text"
                color={signType === "signin" ? "primary" : "secondary"}
                onClick={(e) => switchSignType(e, "signin")}
              >
                Sign In
              </Button>
              <Button
                variant="text"
                color={signType === "signup" ? "primary" : "secondary"}
                onClick={(e) => switchSignType(e, "signup")}
              >
                Sign Up
              </Button>
              <Button
                variant="text"
                color={signType === "resetpassword" ? "primary" : "secondary"}
                onClick={(e) => switchSignType(e, "resetpassword")}
              >
                Reset Password
              </Button>
            </Stack>
            {signType === "signin" && <SignIn />}
            {signType === "signup" && <SignUp />}
            {signType === "resetpassword" && <ResetPassword />}
          </Stack>
        </Grid>
      </Grid>
    </>
  );

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <LoadingDots />
      <Typography variant="h3">Loading</Typography>
    </Stack>
  );
};

SignInPage.layout = StaticExternalLayout;
export default SignInPage;
