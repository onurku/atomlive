//Library Components
import Button from "@mui/material/Button";
import { common, grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import { isMobile } from "mobile-device-detect";
import "@fontsource/lustria";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createStyles, makeStyles } from "@mui/styles";

// App components
import ExternalLayout from "@/components/layouts/ExternalLayout";
import ExternalLayoutMobile from "@/components/layouts/ExternalLayoutMobile";
import MainTitle from "@/components/ui/MainTitle";
import BookCardItem from "@/components/ui/BookCardItem";
import Color from "@/components/styles/color";
import { postData } from "@/utils/helpers";

const styles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundImage: Color.ombre.natural,
      padding: theme.spacing(5)
    },
    subtitle: {
      fontFamily: "Lustria, Times New Roman",
      color: grey[800]
    },

    book: {
      borderLeft: `1px solid ${common.black}`,
      borderBottom: `1px solid ${common.black}`,
      [theme.breakpoints.up("xs")]: {
        borderTop: 0,
        borderRight: `1px solid ${common.black}`,
        "&:first-child": {
          borderTop: 0
        }
      },
      [theme.breakpoints.up("md")]: {
        borderTop: 0,
        "&:nth-child( odd )": {
          borderRight: 0
        },
        "&:nth-child( even )": {
          borderRight: `1px solid ${common.black}`
        },
        "&:nth-child(1)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(2)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:last-child": {
          borderRight: `1px solid ${common.black}`
        }
      },
      [theme.breakpoints.up("lg")]: {
        borderTop: 0,
        "&:nth-child( 3n + 1 )": {
          borderRight: 0
        },
        "&:nth-child( 3n+2)": {
          borderRight: 0
        },
        "&:nth-child( 3n+3)": {
          borderRight: `1px solid ${common.black}`
        },
        "&:nth-child(1)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(2)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(3)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:last-child": {
          borderRight: `1px solid ${common.black}`
        }
      },
      [theme.breakpoints.up("xxl")]: {
        borderTop: 0,
        "&:nth-child( 4n + 1 )": {
          borderRight: 0
        },
        "&:nth-child( 4n+2)": {
          borderRight: 0
        },
        "&:nth-child( 4n+3)": {
          borderRight: 0
        },
        "&:nth-child( 4n+4)": {
          borderRight: `1px solid ${common.black}`
        },
        "&:nth-child(1)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(2)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(3)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(4)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:last-child": {
          borderRight: `1px solid ${common.black}`
        }
      }
    }
  })
);

const handleAddToCart = async (e) => {
  e.preventDefault();
  console.log("handleAddToCart", e);

  const response = await postData({
    url: "/api/cart",
    data: {
      item: {
        item_type_id: 1,
        content_uuid: "a75dae12-e26f-4baa-8c46-4042155b48ed",
        subscription_length: "annually"
      }
    }
  });

  const { success, message } = response;

  console.log(response);
};

const BookList = () => {
  const classes = styles();

  return (
    <>
      <Grid container className={classes.root} justifyContent="center">
        <Grid item xs={10}>
          <Button onClick={handleAddToCart} variant="contained" size="small">
            Add to cart
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

BookList.layout = ExternalLayout;

const BookListMobile = () => {
  return (
    <>
      <span>stories</span>
    </>
  );
};

BookListMobile.layout = ExternalLayoutMobile;

const BookListPage = isMobile ? BookListMobile : BookList;

export default BookListPage;
