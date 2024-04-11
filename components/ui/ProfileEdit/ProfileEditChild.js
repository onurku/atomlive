import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/legacy/image";

//library components
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { blue, common } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Typography from "@mui/material/Typography";

//app components
import UserContext from "@/components/contexts/UserContext";
import ProfileDetailsChild from "@/components/ui/ProfileDetails/ProfileDetailsChild";

const user = { timezone: "PDT" };

const styles = makeStyles({
  editChild: {
    position: "absolute",
    top: 0,
    right: "calc(50% - 54px)",
    backgroundColor: blue[800],
    "&:hover": { backgroundColor: blue[500] }
  },
  childPhoto: {
    borderRadius: "50%"
  }
});

const ProfileEditChild = ({
  child,
  index,
  handleEditChild,
  handleEditModeChange
}) => {
  const classes = styles();
  const [user, setUser] = useContext(UserContext);

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

  useEffect(() => {});

  return (
    <>
      {/* <Avatar {...stringAvatar("Kent Dodds")} />
        <Avatar {...stringAvatar("Jed Watson")} />
        <Avatar {...stringAvatar("Tim Neutkens")} /> */}
      <Box
        sx={{
          position: "relative",
          pr: 2,
          pb: 2
        }}
      >
        {child?.photo_url ? (
          <Image
            loader={() => `${child?.photo_url}?${new Date()}`}
            key={`${child?.photo_url}?${new Date()}`}
            src={`${child?.photo_url}?${new Date()}`}
            alt={`${child?.first_name} profile photo`}
            width={160}
            height={160}
            className={classes.childPhoto}
          />
        ) : (
          <Avatar
            {...stringAvatar(`${child.first_name} ${child.last_name}`)}
            sx={{
              bgcolor: stringToColor(`${child.first_name}_${child.last_name}`),
              width: 160,
              height: 160,
              color: common.black
            }}
          >
            {child.first_name}
          </Avatar>
        )}

        <IconButton
          className={classes.editChild}
          aria-label="edit-child"
          size="small"
          onClick={handleEditChild({ child, index })}
        >
          <ModeEditIcon sx={{ color: common.white }} />
        </IconButton>
      </Box>
    </>
  );
};

export default ProfileEditChild;
