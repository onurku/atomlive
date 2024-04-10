import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

//Library components
import { FiShoppingBag, FiX } from "react-icons/fi";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { common, grey } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { FaChrome, FaFirefox, FaSafari } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import LaptopIcon from "@mui/icons-material/Laptop";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//app components
import Color from "@/components/styles/color";
import LoadingDots from "@/components/ui/LoadingDots";
import { postData } from "@/utils/helpers";
import TechPolicy from "@/components/ui/TechPolicy";
import UserContext from "@/components/contexts/UserContext";
import { useUpdateUser } from "@/components/hooks/useUser";

const styles = makeStyles({
  shoppingBagMessage: {
    display: "flex",
    justifyContent: "space-between",
    alignItem: "right"
  },
  shoppingBagEmpty: {
    flexGrow: 1
  },
  divider: {
    borderColor: common.black
  },
  body1: {
    color: grey[600]
  }
});

const ShoppingBag = ({ showShoppingBag, toggleShoppingBagDrawer }) => {
  const classes = styles();
  const router = useRouter();
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
  const [alert, setAlert] = useState(undefined);
  const [techPolicy, setTechPolicy] = useState(false);

  const handleTechPolicyChange = () => {
    setTechPolicy(!techPolicy);
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
    console.log("cart", cart);
    setItems(cart);
    setNumItems(
      userDetails?.cart?.series?.length ||
        0 + userDetails?.cart?.content?.length ||
        0
    );
    console.log("userLocal", userLocal);

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
    e.preventDefault();
    toggleShoppingBagDrawer(false)(e);
    console.log("session", session);
    if (session) {
      router.push("/checkout");
    } else {
      router.push("/sign/in");
    }
  };

  const handleViewCart = (e) => {
    e.preventDefault();
    toggleShoppingBagDrawer(false)(e);
    router.push("/bag");
  };

  return (
    <>
      {!userDetails?.cart && <LoadingDots />}
      {userDetails?.cart && (
        <>
          <IconButton
            sx={{ marginLeft: 1 }}
            size="medium"
            aria-label="shopping bag"
            aria-describedby="shopping-bag"
            // onClick={openPopover}
            color="primary"
            component="span"
            onClick={toggleShoppingBagDrawer(true)}
          >
            <FiShoppingBag />
            <Typography sx={{ pl: 0.5 }} variant="subtitle2">
              {userDetails?.cart?.series?.length ||
                0 + userDetails?.cart?.content?.length ||
                0}
            </Typography>
          </IconButton>

          <Drawer
            id="shopping-bag"
            anchor="right"
            open={showShoppingBag !== undefined ? showShoppingBag : true}
            onClose={
              toggleShoppingBagDrawer ? toggleShoppingBagDrawer(false) : null
            }
          >
            <Stack
              sx={{
                borderLeft: `2px solid ${common.black}`,
                height: "100vh",
                minWidth: 360
              }}
            >
              <Box
                sx={{ minWidth: 420, pl: 3 }}
                className={classes.shoppingBagMessage}
              >
                {userDetails?.cart?.series?.length ||
                0 + userDetails?.cart?.content?.length ||
                0 ? (
                  <Typography
                    variant="h5"
                    pt={3}
                    pb={3}
                    className={classes.shoppingBagEmpty}
                  >
                    In your bag (
                    {userDetails?.cart?.content?.length ||
                      0 + userDetails?.cart?.series?.length ||
                      0}
                    )
                  </Typography>
                ) : (
                  <Typography
                    variant="h5"
                    p={3}
                    className={classes.shoppingBagEmpty}
                  >
                    Your shopping bag is empty
                  </Typography>
                )}

                <IconButton
                  size="large"
                  onClick={toggleShoppingBagDrawer(false)}
                >
                  <FiX />
                </IconButton>
              </Box>
              <Divider className={classes.divider} />
              <Alert variant="filled" color="warning">
                Log into atom.live to read.
              </Alert>
              <Divider className={classes.divider} />
              {removeItemAlert && (
                <Alert severity={removeItemAlert?.severity}>
                  {removeItemAlert?.message}
                </Alert>
              )}

              {loadingRemoveItem && <LoadingDots />}
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
                      <Stack sx={{ ml: 3, flexGrow: 1 }}>
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
                          size="small"
                          sx={{ width: "100px", color: grey[700] }}
                        >
                          Remove
                        </Button>
                      </Stack>
                      <Box sx={{ ml: 3, width: "50px", display: "flex" }}>
                        <Typography variant="body1" className={classes.body1}>
                          price
                        </Typography>
                      </Box>
                    </Stack>
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
                    <Stack direction="row" sx={{ p: 3, display: "flex" }}>
                      <Image
                        unoptimized
                        width="150"
                        alt={thisItem?.details?.title}
                        height="100"
                        src={thisItem?.cover_url}
                      />
                      <Stack sx={{ ml: 3, flexGrow: 1 }}>
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
                      </Stack>
                      <Box sx={{ width: "50px", display: "flex" }}>
                        <Typography variant="body1">
                          ${thisItem?.subscription_option?.price}
                        </Typography>
                      </Box>
                    </Stack>

                    <Divider className={classes.divider} />
                  </Fragment>
                );
              })}

              {cartTotal > 0 && (
                <>
                  <Box sx={{ p: 2, display: "flex" }}>
                    <Box sx={{ display: "flex", flexGrow: 1 }}>
                      <Typography variant="body1">Total</Typography>
                    </Box>

                    <Box sx={{ display: "flex", width: "50px" }}>
                      <Typography variant="body1">${cartTotal}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ m: 2 }}>
                    <TechPolicy
                      techPolicy={techPolicy}
                      handleTechPolicyChange={handleTechPolicyChange}
                    />
                  </Box>

                  <Box sx={{ pt: 1, pb: 2, pl: 2, pr: 2 }}>
                    <Button
                      sx={{ width: "49%", mr: 1 }}
                      color="primary"
                      variant="outlined"
                      onClick={handleViewCart}
                    >
                      View Bag (
                      {userDetails?.cart?.series?.length ||
                        0 + userDetails?.cart?.content?.length ||
                        0}
                      )
                    </Button>
                    <Button
                      sx={{ width: "49%" }}
                      color="primary"
                      variant="contained"
                      onClick={(e) => handleCheckout(e)}
                    >
                      Check Out
                    </Button>
                  </Box>
                </>
              )}
            </Stack>
          </Drawer>
        </>
      )}
    </>
  );
};

export default ShoppingBag;
