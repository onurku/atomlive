import { useCallback, useContext, useEffect, useRef, useState } from "react";
import axios, { post } from "axios";
import Image from "next/image";

//Library components
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";
import { MdFace } from "react-icons/md";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

//app components
import UserContext from "@/components/contexts/UserContext";
import Color from "@/components/styles/color";
import LoadingDots from "@/components/ui/LoadingDots";
import { useContent } from "@/components/hooks/useContent";

const Input = styled("input")({
  display: "none"
});

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

const ProfilePhoto = ({ person, child, index }) => {
  console.log("profilephoto", child);
  const classes = styles();
  const [user, setUser] = useContext(UserContext);
  const uploadInputRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const emptyAlert = {
    severity: "",
    content: {
      message: ""
    }
  };
  const [alert, setAlert] = useState(emptyAlert);
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    return;
  };

  const handlePhotoCapture = useCallback(
    async (e) => {
      setAlert(emptyAlert);
      console.log(e);
      const { target } = e;

      setAlert(emptyAlert);

      // if (!target.accept.includes("image")) {
      //   setAlert({
      //     severity: "error",
      //     content: {
      //       message: "File should be an image"
      //     }
      //   });
      // }

      const newPhoto = target.files[0];

      if (newPhoto?.name) {
        setPhotoName(newPhoto?.name);
      }

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPhoto(reader.result);
      });
      reader.readAsDataURL(newPhoto);
      console.log("reader", reader);

      if (photo?.size > 1e6) {
        return setAlert({
          severity: "error",
          content: {
            message: "File should be an image less than 1MB"
          }
        });
      }
      //upload result to server
      setLoading(true);

      const photoData = new FormData();
      photoData.append("photo", newPhoto, newPhoto.name);
      photoData.append("for_child", Boolean(person === "child"));
      if (person === "child") {
        photoData.append("child_uuid", child.uuid);
      }

      console.log("photoData", photoData, child.uuid);

      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };

      axios
        .post("/api/account/update_photo", photoData)
        .then((response) => response.data)
        .then((res) => {
          console.log("success", res);
          const { message, success, data } = res;
          setAlert({ severity: "success", content: { message: message } });
          const newUser = JSON.parse(localStorage.getItem("user"));
          if (person === "child") {
            newUser.children[index].photo_url = data;
          } else {
            newUser.photo_url = data;
          }

          localStorage.setItem("user", JSON.stringify(newUser));
          setUser({ ...newUser });
          console.log("ProfilePhoto user", user);
        })
        .catch((error) => {
          console.log("error", error);
          setAlert({
            severity: "error",
            content: { message: error.response.data.error }
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [setUser]
  );

  useEffect(() => {
    // const newUser = JSON.parse(localStorage.getItem("user"));
    // if (setUser) {
    //   setUser({ ...newUser });
    // }
    // console.log("ProfilePhoto user", user);
    // console.log("photo url", user?.photo_url);
  }, [setUser]);

  return (
    <>
      <Stack spacing={1} alignItems="center">
        {user?.photo_url && (
          <>
            {/* <img src={user?.photo_url} width={150} height={150} /> */}
            <Box
              sx={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                overflow: "hidden"
              }}
            >
              <Image
                loader={() => `${user?.photo_url}?${new Date()}`}
                key={`${user?.photo_url}?${new Date()}`}
                src={`${user?.photo_url}?${new Date()}`}
                alt="profile photo"
                width={150}
                height={150}
              />
            </Box>
          </>
        )}
        {!user?.photo_url && person === "child" && (
          <Avatar className={classes.avatar} src={photo ? photo : ""}>
            <MdFace size="150px" />
          </Avatar>
        )}
        {!user?.photo_url && person !== "child" && (
          <Avatar className={classes.avatar} src={photo ? photo : ""} />
        )}
        {alert?.severity?.length > 0 && (
          <Alert severity={alert.severity}>{alert.content.message}</Alert>
        )}
        <label htmlFor="contained-photo-upload">
          <Input
            ref={uploadInputRef}
            // accept="image/*"
            multiple
            type="file"
            onChange={handlePhotoCapture}
          />
          <Button
            onClick={() =>
              uploadInputRef.current && uploadInputRef.current.click()
            }
            disabled={loading}
            variant="contained"
            component="span"
          >
            {loading ? <LoadingDots /> : "Upload"}
          </Button>
        </label>
      </Stack>
    </>
  );
};

ProfilePhoto.propTypes = {
  className: PropTypes.string
};

export default ProfilePhoto;
