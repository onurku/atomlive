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

const ConnectStripe = () => {
  const { session, status } = useSession();

  useEffect(async () => {}, []);

  return (
    <>
      <Grid sx={{ paddingTop: 3 }} container align="center">
        <Grid item xs={12}>
          Refresh
        </Grid>
      </Grid>
    </>
  );
};

ConnectStripe.layout = ProfileLayout;

export default ConnectStripe;
