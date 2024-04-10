import { useCallback, useContext, useEffect, useState } from "react";
import moment from "moment";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Color from "@/components/styles/color";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import { FiX } from "react-icons/fi";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

//app components
import UserContext from "@/components/contexts/UserContext";
import LoadingDots from "@/components/ui/LoadingDots";
import Modal from "@/components/ui/Modal";
import { deleteData, postData, patchData } from "@/utils/helpers";
import _without from "lodash/without";

const styles = makeStyles({
  grid: {
    paddingTop: 24,
    marginBottom: 24,
    background: Color.ombre.beige
  },
  dialogTitle: {
    display: "flex",
    justifyContent: "right",
    alignItems: "right"
  },
  closeButton: {
    position: "absolute !important",
    top: 0,
    right: 0
  }
});

const ProfileDetailsChild = ({ child, setEdit }) => {
  const classes = styles();
  const [user, setUser] = useContext(UserContext);
  const defaultDob = "2020-01-01";
  const [loading, setLoading] = useState(0);
  const [alert, setAlert] = useState(undefined);
  const [
    showDeleteChildConfirmationModal,
    setShowDeleteChildConfirmationModal
  ] = useState(false);
  const childInitial = {};
  if (child) {
    childInitial.first_name = child.first_name || "";
    childInitial.last_name = child.last_name || "";
    childInitial.date_of_birth = child.date_of_birth || ""; //date_of_birth is a string
    childInitial.childUuid = child.uuid;
  }
  const [childProfile, setChildProfile] = useState(childInitial);

  const childInfo = {};

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      console.log("user", user);
    }

    return () => {
      mounted = false;
    };
  }, [childProfile, setUser, setEdit]);

  const toggleDeleteChildModal = (type) => (e) => {
    setAlert(undefined);
    setShowDeleteChildConfirmationModal(!showDeleteChildConfirmationModal);
  };

  const handleDeleteChild = async (e) => {
    e.preventDefault();
    setAlert(undefined);
    setLoading(true);

    childProfile.date_of_birth = moment(
      new Date(childProfile.date_of_birth)
    ).format();

    console.log("child for submit", childProfile);

    const childData = {
      url: "/api/account/profile/update/child",
      data: {
        childUuid: child.uuid
      }
    };

    const response = await deleteData(childData);

    const { message, success, data } = response || {};
    console.log("child profile delete", response);
    setLoading(false);

    const newUser = data;
    setUser(newUser); // user object returned even if no error

    if (!success) {
      const newAlert = {
        severity: "error",
        content: `Error: ${message ? message : ""}`
      };

      return setAlert(newAlert);
    }

    //success

    const newAlertSuccess = {
      severity: "success",
      content: `Child was successfully removed from your profile.`
    };

    if (setAlert) {
      setAlert(newAlertSuccess);
    }

    if (setEdit) {
      setEdit({ mode: false });
    }
  };

  const handleChange = (type) => (e) => {
    childInfo[type] = e.target.value;
    const newChild = Object.assign(childProfile, childInfo);
    setChildProfile(newChild);
  };

  const handleChildProfileUpdate = async (e) => {
    e.preventDefault();
    setAlert(undefined);
    setLoading(true);
    console.log("child for submit", childProfile);

    const childData = {
      url: "/api/account/profile/update/child",
      data: childProfile
    };

    let response;
    if (child) {
      console.log("PATCH");
      response = await patchData(childData);
    } else {
      console.log("POST");
      response = await postData(childData);
    }

    const { message, success, data } = response;
    console.log("child profile update", response);

    setLoading(false);
    const newUser = data;
    setUser(newUser);

    if (!success) {
      const newAlert = {
        severity: "error",
        content: `${message || ""}`
      };
      return setAlert(newAlert);
    }

    //success
    const newAlertSuccess = {
      severity: "success",
      content: `Profile was successfully updated.`
    };

    if (setAlert) {
      setAlert(newAlertSuccess);
    }

    if (setEdit) {
      console.log("edit exists");
      setEdit({ mode: false });
    }
  };

  return (
    <>
      {showDeleteChildConfirmationModal && (
        <Modal>
          <Dialog
            maxWidth="sm"
            fullWidth={true}
            open={showDeleteChildConfirmationModal}
            onClose={toggleDeleteChildModal(false)}
            aria-labelledby="confirm-delete-child"
            aria-describedby="confirm-delete-child"
          >
            <DialogTitle className={classes.dialogTitle}>
              <IconButton
                size="large"
                className={classes.closeButton}
                onClick={toggleDeleteChildModal(false)}
              >
                <FiX />
              </IconButton>
            </DialogTitle>
            <DialogContent id="confirm-delete-child">
              <Typography variant="h4" gutterBottom>
                Are you sure?
              </Typography>
              <Typography variant="body1" gutterBottom>
                Confirm that you would like to remove this child from your
                profile.
              </Typography>
              {alert?.severity?.length > 0 && (
                <Alert severity={alert?.severity}>{alert?.content}</Alert>
              )}
              <DialogActions>
                <Button
                  variant="outlined"
                  onClick={toggleDeleteChildModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  disabled={loading}
                  variant="contained"
                  onClick={handleDeleteChild}
                >
                  {loading ? <LoadingDots /> : "Confirm"}
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </Modal>
      )}
      <Stack spacing={2}>
        <TextField
          defaultValue={childProfile.first_name}
          fullWidth
          label="First name"
          name="first_name"
          onChange={handleChange("first_name")}
          value={childInfo.first_name}
          variant="outlined"
          autoComplete="first-name"
          inputProps={{ maxLength: 100 }}
        />
        <TextField
          defaultValue={childProfile.last_name}
          fullWidth
          fullWidth
          label="Last Name"
          name="last_name"
          onChange={handleChange("last_name")}
          value={childInfo.last_name}
          variant="outlined"
          autoComplete="last-name"
          inputProps={{ maxLength: 100 }}
        />
        {/* <TextField
        defaultValue={childProfile?.grade}
        fullWidth
        label="Grade"
        name="grade"
        onChange={handleChange("grade")}
        value={child.grade}
        variant="outlined"
        autoComplete="grade"
        inputProps={{ maxLength: 100 }}
      /> */}
        <TextField
          defaultValue={childProfile.date_of_birth}
          fullWidth
          label="Date of Birth"
          name="date_of_birth"
          InputLabelProps={{
            shrink: true,
            required: false
          }}
          onChange={handleChange("date_of_birth")}
          type="date"
          value={childInfo.date_of_birth}
          // value={moment(childInfo.date_of_birth).format("YYYY-MM-DD")}
        />
        {alert?.severity?.length > 0 && (
          <Alert severity={alert?.severity}>{alert?.content}</Alert>
        )}
        <Button
          fullWidth
          size="large"
          color="primary"
          variant="contained"
          disabled={loading ? loading : false}
          onClick={handleChildProfileUpdate}
        >
          {loading ? <LoadingDots /> : "Save"}
        </Button>
        {child && (
          <Button
            fullWidth
            size="small"
            color="primary"
            variant="outlined"
            onClick={toggleDeleteChildModal(true)}
          >
            Delete Child from Profile
          </Button>
        )}
      </Stack>
    </>
  );
};

export default ProfileDetailsChild;
