import PropTypes from "prop-types";
import clsx from "clsx";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { MdFace } from "react-icons/md";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import monochrome from "@/components/styles/monochrome";
import Color from "@/components/styles/color";

const user = { timezone: "PDT" };

const styles = makeStyles({
  root: {
    width: "100%"
  },
  avatar: {
    background: Color.hex.rose,
    width: 125,
    height: 125
  }
});

const ProfilePhoto = ({ person, ...rest }) => {
  const classes = styles();

  const { photo, family_name, given_name, country, city } = rest;

  const name = `${given_name ? given_name : ""} ${
    family_name ? family_name : ""
  }`;

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    return;
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name)
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
    };
  }

  return (
    <>
      <Stack spacing={1} alignItems="center">
        {/* <Typography color='textPrimary' variant='h6' align='center'>
						{name} Lien Nguyen
					</Typography>
					<Typography color='textSecondary' variant='body1' align='center'>
						{city || ""} {country || ""}
					</Typography> 
					<Typography color='textSecondary' variant='body1' align='center'>
	{`${moment().format("hh:mm A")} ${user.timezone}`} 
					</Typography>*/}
        {person === "child" ? (
          <Avatar className={classes.avatar} src={photo}>
            <MdFace size="150px" />
          </Avatar>
        ) : (
          <Avatar className={classes.avatar} src={photo} />
        )}
      </Stack>

      <Button
        sx={{ marginTop: 4 }}
        size="large"
        color="primary"
        fullWidth
        variant="contained"
        onClick={handleProfileUpdate}
      >
        Change Photo
      </Button>
    </>
  );
};

ProfilePhoto.propTypes = {
  className: PropTypes.string
};

export default ProfilePhoto;
