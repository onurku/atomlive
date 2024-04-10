import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import moment from "moment";

//Library components
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import {
  FcOk,
  FcMoneyTransfer,
  FcHighPriority,
  FcCheckmark
} from "react-icons/fc";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Icon from "@mui/material/Icon";
import { makeStyles } from "@mui/styles";
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
import MainTitle from "@/components/ui/MainTitle";
import NotSignedIn from "@/components/ui/NotSignedIn";
import ProfileLayout from "@/components/layouts/ProfileLayout";
import { useAdmin } from "@/components/hooks/useAdmin";
import { useStripeDetails } from "@/components/hooks/useStripeDetails";
import { patchData, postData } from "@/utils/helpers";

const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_STRIPE_OAUTH_CLIENT_ID;
const REDIRECT_URL = `${process.env.NEXT_PUBLIC_VERCEL_URL}publishers/admin`;
const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;

const styles = makeStyles((theme) => ({
  description: {
    backgroundColor: Color.hex.beige
  },
  steps: {
    backgroundColor: Color.hex.beige,
    padding: theme.spacing(5)
  },
  info: {
    backgroundColor: Color.hex.beige,
    padding: theme.spacing(5)
  }
}));
const ConnectStripe = () => {
  const router = useRouter();
  const { code, scope } = router.query;
  const { data: session } = useSession();
  const classes = styles();
  const iconSize = 36;
  const [isUpdateSuccess, setUpdateSuccess] = useState();

  const { stripe, status } = useStripeDetails();
  const [stripeDetails, setStripeDetails] = useState(stripe);

  useEffect(async () => {
    let mounted = true;

    if (mounted) {
      if (code) {
        //update data from stripe into db
        const response = await postData({
          url: `/api/publishers/verify_stripe`,
          data: { code }
        });

        console.log("stripe data", response);
        if (response.success) {
          setStripeDetails(response);
          setUpdateSuccess(true);
        } else {
          setUpdateSuccess(false);
        }
      } else {
        // data coming from database
        setStripeDetails(stripe);
      }
    }
    return () => {
      mounted = false;
    };
  }, [setStripeDetails, stripe, session, status]);

  const handleStripeOnboardPublisher = async (e) => {
    e.preventDefault();

    if (window) {
      // const url = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&scope=read_write&redirect_uri=${REDIRECT_URL}`;
      // router.push(url);
      router.push(stripe.data.account_link);
    }
  };
  return (
    <>
      <DashboardTitle text="Payments and Billing" />
      {!session && (
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ px: 3, py: 3, mb: 3, mx: 10, background: Color.hex.beige }}
          >
            <Typography variant="h6">
              You are not logged in. Please{" "}
              <NextLink href={"/sign/in?redirect=/account/publishers"}>
                sign in
              </NextLink>
            </Typography>
          </Grid>
        </Grid>
      )}
      {session && (
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              px: 3,
              pt: 3,
              mb: 3,
              mx: 10,
              background: Color.hex.beige
            }}
          >
            <Stack direction="row" className={classes.description}>
              <Icon sx={{ fontSize: 68, mr: 3 }}>
                <FcMoneyTransfer />
              </Icon>
              <Box>
                <Typography variant="h6">Set Up Stripe to get paid</Typography>
                <Typography sx={{ mb: 2 }} gutterBottom variant="body2">
                  We integrate checkout with Stripe so you can see every sale,
                  process refunds, and track payment receipts on Stripe's
                  real-time dashboard. Set up your Stripe account now, track
                  sales, and get paid directly from Stripe.
                </Typography>
                {isUpdateSuccess === true && (
                  <Stack
                    sx={{ display: "flex", alignItems: "center" }}
                    direction="row"
                  >
                    <Icon sx={{ fontSize: 32, mr: 3 }}>
                      <FcCheckmark />
                    </Icon>
                    <Typography sx={{ color: Color.hex.green }} variant="body1">
                      Successfully connected Stripe account.
                    </Typography>
                  </Stack>
                )}
                {isUpdateSuccess === false && (
                  <Stack
                    sx={{ display: "flex", alignItems: "center" }}
                    direction="row"
                  >
                    <Icon sx={{ fontSize: 32, mr: 3 }}>
                      <FcCheckmark />
                    </Icon>
                    <Typography variant="body1">
                      Failed to connect Stripe account. Please try again.
                    </Typography>
                  </Stack>
                )}

                <Stack
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3
                  }}
                  spacing={3}
                  direction="row"
                >
                  {stripeDetails?.data?.display_name && (
                    <Stack
                      sx={{
                        display: "flex",
                        flexGrow: 1,
                        border: `1px solid ${Color.hex.liberty}`,
                        p: 3,
                        mt: 3,
                        mr: 3,
                        maxWidth: 480
                      }}
                    >
                      <Typography variant="h6">Stripe Details</Typography>
                      <Typography variant="body2">
                        Country: {stripeDetails?.data?.country}
                      </Typography>
                      <Typography variant="body2">
                        Business Name: {stripeDetails?.data?.display_name}
                      </Typography>

                      <Typography variant="body2">
                        Last Updated:{" "}
                        {moment(stripeDetails?.data?.modified_at).format(
                          "MM-DD-YYYY"
                        )}
                      </Typography>
                    </Stack>
                  )}
                  {status !== "loading" && (
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={handleStripeOnboardPublisher}
                    >
                      {stripeDetails?.data?.has_completed_process &&
                        "Update Stripe "}
                      {!stripeDetails?.data?.has_completed_process &&
                        "Connect Stripe "}
                    </Button>
                  )}

                  {status === "loading" && (
                    <Stack
                      sx={{
                        justifySelf: "center",
                        justifyContent: "center"
                      }}
                    >
                      <LoadingDots />
                      <Typography variant="h5">
                        Retrieving Payouts Info...
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} sx={{ px: 3, pb: 3, mx: 7 }}>
            {status === "loaded" && (
              <Stack direction="row" className={classes.steps}>
                <List sx={{ width: "100%", alignItems: "flex-start" }}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: Color.hex.liberty }}>1</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Create a Business Stripe Account"
                      secondary="Required to begin selling books on Atom"
                    />
                    {!stripeDetails?.data?.has_connected_account && (
                      <>
                        <Icon sx={{ fontSize: iconSize, mr: 1 }}>
                          <FcHighPriority />
                        </Icon>
                        <Typography variant="h5">Incomplete</Typography>
                      </>
                    )}
                    {stripeDetails?.data?.has_connected_account && (
                      <>
                        <Icon sx={{ fontSize: iconSize, mr: 1 }}>
                          <FcOk />
                        </Icon>
                        <Typography variant="h5">Done</Typography>
                      </>
                    )}
                  </ListItem>
                  <ListItem>
                    <Stack direction="row">
                      <ListItemAvatar>
                        <Avatar sx={{ mt: 1, bgcolor: Color.hex.liberty }}>
                          2
                        </Avatar>
                      </ListItemAvatar>
                      <Stack sx={{ pr: 3 }}>
                        <ListItemText
                          primary="Payout Bank Account Info"
                          secondary="Required to withdraw money from Stripe. Stripe charges 1% transaction fee if payout bank account's currency is different from USD. You can begin selling on Atom without having this step completed, just be sure to complete this at a later date."
                        />
                      </Stack>
                      {!stripeDetails?.data?.payouts_enabled && (
                        <>
                          <Icon sx={{ fontSize: iconSize, mr: 1 }}>
                            <FcHighPriority />
                          </Icon>
                          <Typography variant="h5">Incomplete</Typography>
                        </>
                      )}
                      {stripeDetails?.data?.payouts_enabled && (
                        <>
                          <Icon sx={{ fontSize: iconSize, mr: 1 }}>
                            <FcOk />
                          </Icon>
                          <Typography variant="h5">Done</Typography>
                        </>
                      )}
                    </Stack>
                  </ListItem>
                  <ListItem>
                    <Stack direction="row">
                      <ListItemAvatar>
                        <Avatar sx={{ mt: 1, bgcolor: Color.hex.liberty }}>
                          3
                        </Avatar>
                      </ListItemAvatar>
                      <Stack sx={{ pr: 3 }}>
                        <ListItemText primary="Check for Miscellaneous Missing Info" />
                        {stripeDetails?.data?.has_overdue_requirements && (
                          <Stack sx={{ alignItems: "center" }} direction="row">
                            <Icon sx={{ fontSize: iconSize / 1.5, mr: 1 }}>
                              <FcHighPriority />
                            </Icon>
                            <Typography variant="body2">
                              Your Stripe account contains overdue requirements.
                              {stripeDetails?.data?.has_overdue_requirements}
                            </Typography>
                          </Stack>
                        )}

                        <Typography
                          sx={{ border: "1px solid black", p: 3, mt: 3 }}
                          variant="body2"
                        >
                          Note: You do not have to request a payout from Atom!
                          It takes up to 30 days for payments to be reflected on
                          the your Stripe dashboard. Processing time depends on
                          countries based on Stripe's processing time. Questions
                          related to payouts, refunds, should be escalated to
                          Stripe as we do not have insights on Stripe's business
                          operations.
                        </Typography>
                      </Stack>

                      {!stripeDetails?.data?.has_completed_process && (
                        <>
                          <Icon sx={{ fontSize: iconSize, mr: 1 }}>
                            <FcHighPriority />
                          </Icon>
                          <Typography variant="h5">Incomplete</Typography>
                        </>
                      )}
                      {stripeDetails?.data?.has_completed_process && (
                        <>
                          <Icon sx={{ fontSize: iconSize, mr: 1 }}>
                            <FcOk />
                          </Icon>
                          <Typography variant="h5">Done</Typography>
                        </>
                      )}
                    </Stack>
                  </ListItem>
                </List>
              </Stack>
            )}
          </Grid>

          <Grid item xs={12} sx={{ px: 3, pb: 3, mx: 7 }}>
            <Stack className={classes.info}>
              <Typography gutterBottom variant="h4">
                How we handle refund
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: Color.hex.brightblue }}
                variant="h6"
              >
                If you are an author requesting a refund from Atom
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: grey[800], mb: 2 }}
                variant="body1"
              >
                All monthly subscriptions are subject to automatic renewable
                monthly charges until you cancel the applicable subscription. If
                you cancel the monthly subscription, your service will terminate
                at the end of that month, and you can still use the service
                until the end of the month during which we received your
                cancellation notice. The subscription will not be renewed, and
                we will no longer place automatic monthly charges starting from
                the following month. For clarity, the subscription fee you paid
                for the month during which your cancellation request is received
                is not refundable.
              </Typography>
              <Typography sx={{ color: grey[800], mb: 2 }} variant="body1">
                Any service fees prepaid for the production of custom AR books
                are not refundable.
              </Typography>
              <Typography sx={{ color: grey[800], mb: 2 }} variant="body1">
                If any fraudulent transactions or missing payments are reported
                to us, Atom has the right to (i) cancel the subscription
                immediately without notice to the author and (ii) charge
                additional services fees if applicable. Atom also reserves the
                right, in our sole discretion, to limit or deny refund requests
                in cases where we believe there is an abuse of our refund terms.
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: Color.hex.brightblue }}
                variant="h6"
              >
                If a parent or customer requests a refund from you, the author
              </Typography>
              <Typography sx={{ color: grey[800], mb: 2 }} variant="body1">
                Individual AR book refund policies and decisions will be made by
                the author. When Atom receives a refund request from an attendee
                through support channels, that request will be escalated to the
                author for final approval. If a parent encounters technical
                issues/a product bug, contacts Atom for support, and the issue
                can not be resolved, Atom will issue a refund.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      )}
    </>
  );
};

ConnectStripe.layout = ProfileLayout;

export default ConnectStripe;
