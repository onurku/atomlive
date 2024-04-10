import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

//Library components
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import NextLink from "next/link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

//App components
import all from "@/ar_content/books/all";
import Color from "@/components/styles/color";
import DashboardTitle from "@/components/ui/DashboardTitle";
import LoadingDots from "@/components/ui/LoadingDots";
import NotSignedIn from "@/components/ui/NotSignedIn";
import ProfileLayout from "@/components/layouts/ProfileLayout";
import { useAdmin } from "@/components/hooks/useAdmin";
import { patchData, postData } from "@/utils/helpers";

const ConnectStripe = (props) => {
  const { session, status } = useSession();

  console.log("props", props);

  useEffect(async () => {}, []);

  return (
    <>
      <Grid sx={{ paddingTop: 3 }} container align="center">
        <Grid item xs={12}>
          Success
        </Grid>
      </Grid>
    </>
  );
};

ConnectStripe.layout = ProfileLayout;

export const getServerSideProps = async ({ req }) => {
  const body = req?.__NEXT_INIT_QUERY;

  if (!body?.code) {
    return { props: { data: null, req: body } };
  }

  let response;
  try {
    response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/pubishers/verify_stripe",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then((res) => res.json());
  } catch (error) {
    return { props: { data: { error }, req: body } };
  }

  return { props: { data: response, req: body } };
};

export default ConnectStripe;
