import { Fragment, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/legacy/image";
import { useRouter } from "next/router";

//Library components
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import { common, grey } from "@mui/material/colors";
import { createStyles, makeStyles } from "@mui/styles";
import Divider from "@mui/material/Divider";
import "@fontsource/libre-baskerville";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

//App components
import BookImageInList from "@/components/ui/BookCardItem/BookImageInList";
import Color from "@/components/styles/color";
import ExternalLayout from "@/components/layouts/ExternalLayout";
import LoadingDots from "@/components/ui/LoadingDots";
import { getData, postData } from "@/utils/helpers";
import { prettyName } from "@/components/hooks/useLanguage";
import UserContext from "@/components/contexts/UserContext";
import { useUpdateUser } from "@/components/hooks/useUser";
import ShoppingBag from "@/components/ui/ShoppingBag";
import TechPolicy from "@/components/ui/TechPolicy";

const styles = makeStyles((theme) =>
  createStyles({
    divider: {
      borderColor: common.black,
      padding: theme.spacing(1)
    },
    shoppingBagEmpty: {
      flexGrow: 1,
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      display: "flex",
      justifyContent: "center"
    },
    body1: {
      color: grey[600]
    }
  })
);

const heroHeight = 300;

const Bag = () => {
  const classes = styles();

  const [items, setItems] = useState();
  const { status, data: session } = useSession();
  const [loading, setLoading] = useState(status);
  const [user, setUser] = useContext(UserContext);
  const { userDetails, setUserDetails } = useUpdateUser(user);
  const [cartTotal, setCartTotal] = useState();
  const [numItems, setNumItems] = useState(
    user?.cart?.series?.length || 0 + user?.cart?.content?.length || 0
  );
  const [removeItemAlert, setRemoveItemAlert] = useState();
  const [loadingRemoveItem, setLoadingRemoveItem] = useState(false);
  const [alert, setAlert] = useState();
  const [techPolicy, setTechPolicy] = useState(false);
  const router = useRouter();

  const handleTechPolicyChange = () => {
    setTechPolicy(!techPolicy);
    console.log("techpolicy: ", techPolicy);
    setAlert(undefined);
  };

  useEffect(async () => {
    let userLocal = localStorage.getItem("user");
    if (userLocal) {
      userLocal = JSON.parse(userLocal);
      setUser(userLocal);
    } else {
      setUser(userDetails);
    }
    const cart = userLocal?.cart;

    setItems(cart);
    setNumItems(
      userDetails?.cart?.series?.length ||
        0 + userDetails?.cart?.content?.length ||
        0
    );

    if (cart) {
      const costContent = cart?.content?.reduce((a, b) => {
        return a + b.subscription_option.price;
      }, 0);
      const costSeries = cart?.series?.reduce((a, b) => {
        return a + b.subscription_option.price;
      }, 0);

      console.log("cartTotal", costContent, costSeries);

      setCartTotal(costContent || 0 + costSeries || 0);
    }
  }, [setUser, setItems, setNumItems]);

  const handleRemoveItemFromCart =
    ({ index, series_uuid, content_uuid }) =>
    async (e) => {
      e.preventDefault();
      setRemoveItemAlert();
      setLoadingRemoveItem(true);
      const { message, success } = await postData({
        url: "/api/cart/remove",
        data: {
          series_uuid
        }
      });

      setRemoveItemAlert({
        severity: success ? "success" : "error",
        message: message
      });

      setLoadingRemoveItem(false);
      let userLocal = localStorage.getItem("user");
      userLocal = JSON.parse(userLocal);

      if (series_uuid) {
        const series = userLocal?.cart?.series;
        series.splice(index); //remove the item from cart at index
        userLocal.cart.series = series;
      }
      localStorage.setItem("user", JSON.stringify(userLocal));
      const cart = userLocal?.cart;
      if (cart) {
        setItems(cart);
        setNumItems(cart?.series?.length || 0 + cart?.content?.length || 0);
      }
      setUser({ ...userLocal });
    };

  const handleCheckout = (e) => {
    e.stopPropagation();

    if (session) {
      router.push("/checkout/");
    } else {
      router.push("/sign/in?redirect=/checkout");
    }
  };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }} p={5}>
        {userDetails?.cart?.series?.length ||
        0 + userDetails?.cart?.content?.length ||
        0 ? (
          <Typography variant="h4" className={classes.shoppingBagEmpty}>
            In your bag (
            {userDetails?.cart?.content?.length ||
              0 + userDetails?.cart?.series?.length ||
              0}
            )
          </Typography>
        ) : (
          <Typography variant="h5" className={classes.shoppingBagEmpty}>
            Your shopping bag is empty
          </Typography>
        )}

        <Divider className={classes.divider} variant="fullWidth" />
        <Stack
          direction="row"
          sx={{ pt: 2, justifyContent: "space-between", display: "flex" }}
        >
          {/*****Content*****/}
          {userDetails?.cart?.content?.map((oneItem, index) => {
            const thisItem = oneItem?.item;
            const metadata = thisItem.details?.metadata
              ? JSON.parse(thisItem.details?.metadata)
              : null;
            const numPages = metadata ? metadata.pages : null;
            console.log("oneItem content", oneItem);
            return (
              <Fragment key={index}>
                <Stack direction="row" sx={{ p: 3, display: "flex" }}>
                  {metadata && (
                    <Image
                      unoptimized
                      width="150"
                      alt={oneItem.item.details.title}
                      src={
                        metadata?.illustrations[
                          `${metadata?.size?.desktop.default.width}x${metadata?.size?.desktop.default.height}`
                        ][0]
                      }
                      height={
                        (metadata?.size?.desktop?.default?.height /
                          metadata?.size?.desktop?.default?.width) *
                        150
                      }
                    />
                  )}
                  <Stack direction="row">
                    <Box sx={{ ml: 3, flexGrow: 1 }}>
                      <Typography variant="body1">
                        {thisItem?.details?.title}
                      </Typography>
                      <Typography variant="body2" className={classes.body1}>
                        Num pages: {numPages}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        className={classes.body1}
                      >
                        Subscription: Annual
                      </Typography>
                      <Button
                        variant="text"
                        size="small"
                        onClick={handleRemoveItemFromCart({
                          index, //index of item being removed
                          series_uuid: null, //if removing series, this param should be specified
                          content_uuid: thisItem.details.content_uuid //if removing series, this param null
                        })}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Stack>
                  <Box sx={{ ml: 3, width: "50px", display: "flex" }}>
                    <Typography variant="body1" className={classes.body1}>
                      price
                    </Typography>
                  </Box>
                </Stack>
                <Alert variant="filled" color="warning">
                  Log into atom.live to read.
                </Alert>
                <Divider className={classes.divider} />
              </Fragment>
            );
          })}
          {/****** Series ********/}
          {userDetails?.cart?.series?.map((oneItem, index) => {
            const thisItem = oneItem;
            const numPages = thisItem.details?.metadata
              ? JSON.parse(thisItem.details?.metadata).pages
              : "";
            console.log("seriesxxxx", oneItem);
            return (
              <Fragment key={index}>
                {/*key={thisItem?.details.uuid}*/}
                <Stack
                  direction="row"
                  sx={{ flexDirection: "row", width: "100%", display: "flex" }}
                >
                  <Image
                    unoptimized
                    width="320"
                    alt={thisItem?.details?.title}
                    height="200"
                    src={thisItem?.cover_url}
                  />
                  <Stack sx={{ ml: 3, mr: 3, flexGrow: 1, display: "flex" }}>
                    <Typography variant="body1">
                      {thisItem?.details?.title}
                    </Typography>
                    <Typography variant="body1">
                      {thisItem?.details?.series_name}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      className={classes.body1}
                    >
                      Subscription: Annual
                    </Typography>
                    <Button
                      variant="text"
                      size="small"
                      onClick={handleRemoveItemFromCart({
                        index, //index of item being removed
                        series_uuid: thisItem.details.series_uuid,
                        content_uuid: null //if removing content, this param should be specified}
                      })}
                    >
                      Remove
                    </Button>
                    {/* <Tooltip title="Remove from cart" placement="right">
                      <IconButton
                        aria-label="remove-item-from-cart"
                        aria-describedby="remove-item-from-cart"
                        data-series_uuid={thisItem.details.series_uuid}
                        disabled={loadingRemoveItem}
                        sx={{ width: 30 }}
                        onClick={handleRemoveItemFromCart({
                          index, //index of item being removed
                          series_uuid: thisItem.details.series_uuid,
                          content_uuid: null //if removing content, this param should be specified}
                        })}
                      >
                        <RemoveCircleOutlineIcon color="action" />
                      </IconButton>
                    </Tooltip> */}
                  </Stack>
                  <Typography variant="body1">
                    ${thisItem?.subscription_option?.price}
                  </Typography>
                </Stack>
              </Fragment>
            );
          })}
        </Stack>
        <Divider className={classes.divider} />
        <Box
          sx={{
            pt: 5,
            pr: 5,
            pb: 3,
            display: "flex",
            width: "100%",
            justifyContent: "flex-end"
          }}
        >
          <TechPolicy
            panelWidth="100%"
            handleTechPolicyChange={handleTechPolicyChange}
            techPolicy={techPolicy}
          />
        </Box>
        <Button
          sx={{ display: "flex", alignSelf: "flex-end" }}
          variant={techPolicy ? "contained" : "outlined"}
          color={techPolicy ? "primary" : "secondary"}
          disabled={techPolicy ? false : true}
          size="large"
          onClick={handleCheckout}
        >
          Check out
        </Button>
      </Box>
    </>
  );
};

Bag.layout = ExternalLayout;

export default Bag;
