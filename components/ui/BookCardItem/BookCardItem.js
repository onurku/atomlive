import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
//Library Components
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import { common } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import { makeStyles } from "@mui/styles";
import NextLink from "next/link";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

//App components
import Color from "@/components/styles/color";
import LoadingDots from "../LoadingDots";

const styles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    position: "relative",
    "&:hover": {
      // "-webkit-box-shadow": `-8px -8px 0 ${Color.hex.liberty}`,
      // "-moz-box-shadow": `-8px -8px 0 ${Color.hex.liberty}`,
      // boxShadow: `-8px -8px 0 ${Color.hex.liberty}`
      // boxShadow:
      //   "rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px"
      // boxShadow:
      //   "black 0px 0px 0px 1px inset, rgb(255, 255, 255) 10px -10px 0px -3px, rgb(31, 193, 27) 10px -10px, rgb(255, 255, 255) 20px -20px 0px -3px, rgb(255, 217, 19) 20px -20px, rgb(255, 255, 255) 30px -30px 0px -3px, rgb(255, 156, 85) 30px -30px, rgb(255, 255, 255) 40px -40px 0px -3px, rgb(255, 85, 85) 40px -40px;"
      // boxShadow: "0.5rem 0.5rem black, -0.5rem -0.5rem #ccc;"
    }
  },
  box: {
    background: common.black
  },
  cardmedia: {
    borderBottom: "1px solid black"
    // borderTop: "1px solid black"
  },
  cardactions: {
    display: "flex",
    marginTop: "auto"
  },
  cardcontent: {
    display: "flex"
  },
  cardheader: {
    marginLeft: 0,
    "&::after": {
      content: "Free",
      position: "absolute"
    }
  },
  cardheaderFree: {
    marginLeft: 48
  },
  ribbon: {
    backgroundColor: Color.hex.purple,
    position: "absolute",
    color: "white",
    width: 150,
    height: 26,
    zIndex: 3,
    textAlign: "center",
    textTransform: "uppercase",
    padding: 3,
    font: "Lato",
    "&::before": {
      position: "absolute",
      zIndex: -1,
      content: "",
      display: "block",
      border: "5px solid #2980b9"
    },
    "&::after": {
      position: "absolute",
      zIndex: -1,
      content: "",
      display: "block",
      border: "5px solid #2980b9"
    },
    transform: "rotate(45deg)",
    top: 20,
    right: -50
  },
  chip: {
    backgroundColor: Color.hex.neonyellow,
    padding: theme.spacing(1),
    color: "white"
  }
}));

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9"
  }
}));

const BookCardItem = ({
  alt,
  coverImageUrl,
  about,
  isFree,
  subheader,
  bookAudioFormats,
  languageList,
  title,
  isPurchased
}) => {
  const classes = styles();
  const router = useRouter();
  const { session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const handleViewDetails = () => {
    const slug = title
      .toLowerCase()
      .split(" ")
      .join("-")
      .replace("'", "")
      .replace("!", "")
      .replace("?", "");
    setLoading(true);

    if (session) {
      router.push(`/books/in/${slug}`);
    } else {
      router.push(`/sign/in?redirect=/books/in/${slug}`);
    }
  };

  return (
    <>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardmedia}
          component="img"
          alt={alt}
          width="100%"
          image={coverImageUrl}
        />
        <CardContent>
          <Stack
            sx={{ pt: 1, pr: 0, pb: 2, alignItems: "center" }}
            direction="row"
            align="center"
          >
            {isFree && (
              <Typography
                variant="body1"
                sx={{
                  justifySelf: "flex-end",
                  mr: 3,
                  pt: 1,
                  pb: 1,
                  pr: 3,
                  pl: 3,
                  background: Color.hex.neonyellow,
                  border: `1px solid ${Color.hex.liberty}`
                }}
              >
                FREE
              </Typography>
            )}
            <Typography variant="h5">{title}</Typography>
          </Stack>
          <Typography variant="body1" color="text.secondary">
            {about}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardactions}>
          <Button
            size="large"
            fullWidth
            variant="contained"
            onClick={handleViewDetails}
          >
            {!loading &&
              (isFree
                ? "Free Reading"
                : isPurchased
                ? "Start Reading"
                : "View Details")}
            {loading && <LoadingDots />}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default BookCardItem;
