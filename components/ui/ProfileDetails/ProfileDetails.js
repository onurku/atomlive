import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

//Library components
// import languageNames from '../localstore/languages.json';
// import countryNames from '../../../localstore/countries.json';
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import { common } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import { FiChevronDown, FiX } from "react-icons/fi";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import _without from "lodash/without";
import _union from "lodash/union";

//app components
import UserContext from "@/components/contexts/UserContext";
import LoadingDots from "@/components/ui/LoadingDots";
import { fetchData, postData } from "@/utils/helpers";

const styles = makeStyles({
  root: {
    display: "flex",
    width: "100%"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2,
    backgroundColor: common.white,
    border: `1px solid ${common.black}`
  },
  deleteIcon: {
    color: "rgba(0,0,0,0.8) !important"
  }
});
const ProfileDetails = ({ person }) => {
  const classes = styles();
  const { data: session, status } = useSession();

  const [user, setUser] = useContext(UserContext); //global user context

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false); //0: not loading, 1 = profile section, 2 = change password, 3 = change email section
  const router = useRouter();

  const [languages, setLanguages] = useState([]);
  const [currentLanguages, setCurrentLanguages] = useState(
    () => user?.languages || ["en"]
  );
  const [combinedLanguages, setCombinedLanguages] = useState([""]);
  const [combinedAbreviations, setCombinedAbreviations] = useState(
    user?.languages || ["en"]
  );
  const [newPassword, setNewPassword] = useState(undefined);
  const [newEmail, setNewEmail] = useState(undefined);
  const emptyAlert = {
    severity: "", //error
    content: "" //error message
  };

  const [alertMessage, setAlertMessage] = useState({
    section: undefined, //0 = profile, 1 = change password, 2 = change email
    alert: emptyAlert
  });

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem("user"));
    if (userProfile) {
      setUser(userProfile);
    }
    const langs = languages.map((lang) => languageList[lang]);
    const combinedAbreviations = _union(currentLanguages, langs);

    setCombinedAbreviations(combinedAbreviations);
    const combined = combinedAbreviations.map((elem) => swapLanguageList[elem]);
    //console.log(combined);

    setCombinedLanguages(combined);
    userValues.languages = combined;
  }, [languages, session, setUser, status]);

  const handleTitleChange = (event, newTitle) => {
    setTitle(newTitle);
  };

  const languageList = {
    // Bangla: "bn",
    Chinese: "cn",
    Danish: "de",
    Dutch: "nl",
    English: "en",
    French: "fr",
    German: "de",
    // Gujarati: "gu",
    Hindi: "in",
    Icelandic: "is",
    Italian: "it",
    Japanese: "ja",
    Korean: "kr",
    // Marathi: "mr",
    Norwegian: "no",
    Swedish: "sv",
    Polish: "pl",
    Portuguese: "pt",
    // Punjabi: "pu",
    Romanian: "ro",
    Russian: "ru",
    // Sindhi: "sd",
    Spanish: "es",
    // Tamil: "ta",
    // Telugu: "te",
    Turkish: "tr",
    // Urdu: "ur",
    Vietnamese: "vn",
    Welsh: "cy"
  };

  const swapLanguageList = Object.entries(languageList).reduce(
    (acc, [key, value]) => ((acc[value] = key), acc),
    {}
  );

  console.log(swapLanguageList);

  const langNames = Object.keys(languageList);
  const userValues = {};

  const handleCurrentLanguagesToggle = (e, newLanguages) => {
    setCurrentLanguages(newLanguages);
    console.log(newLanguages);
  };

  const handleLanguageSelect = (e) => {
    setLanguages(e.target.value);
  };

  const handleLanguageDelete = (e, value) => {
    e.preventDefault();
    setLanguages((current) => _without(current, value));
  };

  const handleCloseLanguageSelect = () => {
    userValues.languages = combinedAbreviations;
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    setLoading(2);
    setAlertMessage({
      section: 2,
      alert: emptyAlert
    });

    if (newPassword?.length < 6) {
      setLoading(0);
      return setAlertMessage({
        section: 2,
        alert: {
          severity: "error",
          content: `Password must be 6+ characters`
        }
      });
    }

    try {
      const response = await postData({
        url: "/api/account/change_password",
        data: {
          new_password: newPassword
        }
      });

      const { error, message, status } = response;

      if (error) {
        setLoading(0);
        return setAlertMessage({
          section: 2,
          alert: {
            severity: "error",
            content: `Error: ${message ? message : ""} (${
              status ? status : ""
            })`
          }
        });
      }
      //success
      setLoading(0);
      return setAlertMessage({
        section: 2,
        alert: {
          severity: "success",
          content: `Password change was successful.`
        }
      });
    } catch (error) {
      setLoading(0);
      return setAlertMessage({
        section: 2,
        alert: {
          severity: "error",
          content: `Unknown network error.`
        }
      });
    }
  };

  const onPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const onEmailChange = (e) => {
    setNewEmail(e.target.value);
    setAlertMessage({
      section: 3,
      alert: emptyAlert
    });
  };

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    setLoading(3);
    setAlertMessage({
      section: 3,
      alert: emptyAlert
    });

    if (newEmail === user.email) {
      setLoading(0);
      return setAlertMessage({
        section: 3,
        alert: {
          severity: "error",
          content: "the new email is the same as the old one."
        }
      });
    }

    try {
      const response = await postData({
        url: "/api/account/change_email",
        data: {
          new_email: newEmail
        }
      });

      const { error, message, status } = response;
      console.log("change email", response);

      if (error) {
        setLoading(0);
        return setAlertMessage({
          section: 3,
          alert: {
            severity: "error",
            content: `Error: ${message ? message : ""} (${
              status ? status : ""
            })`
          }
        });
      }
      //success
      setLoading(0);
      userProfile.email = newEmail;

      setAlertMessage({
        section: 3,
        alert: {
          severity: "success",
          content: `Email change was successful.`
        }
      });
      router.push("/account/confirmation/");
    } catch (error) {
      setLoading(0);
      return setAlertMessage({
        section: 3,
        alert: {
          type: "error",
          content: `Unknown network error.`
        }
      });
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(1);
    setAlertMessage({
      section: 1,
      alert: emptyAlert
    });

    const response = await postData({
      url: "/api/account/profile/update",
      data: userValues
    });

    console.log("handleProfileUpdate response", response);
    setLoading(0);
    const { success, message, data } = response;

    if (success) {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setAlertMessage({
        section: 1,
        alert: {
          severity: "success",
          content: "Profile Update Successful"
        }
      });
    } else {
      setAlertMessage({
        section: 1,
        alert: {
          severity: "error",
          content: response.message || "Unknown network error"
        }
      });
    }
  };

  const handleChange = (type) => (e) => {
    userValues[type] = e.target.value;
  };

  return (
    <>
      <Stack sx={{ marginTop: 3 }} spacing={4}>
        <ToggleButtonGroup
          color="primary"
          value={title || ""}
          exclusive
          fullWidth
          onChange={handleTitleChange}
        >
          <ToggleButton value="">None</ToggleButton>
          <ToggleButton value="ms">Ms</ToggleButton>
          <ToggleButton value="mrs">Mrs</ToggleButton>
          <ToggleButton value="mr">Mr</ToggleButton>
        </ToggleButtonGroup>
        <TextField
          defaultValue={user.first_name}
          value={userValues.first_name}
          fullWidth
          helperText="First name"
          label="First name"
          onChange={handleChange("first_name")}
          required
          variant="outlined"
          autoComplete="first-name"
          inputProps={{ maxLength: 100 }}
        />
        <TextField
          defaultValue={user.last_name}
          value={userValues.last_name}
          fullWidth
          helperText="Last name"
          label="Last name"
          onChange={handleChange("last_name")}
          required
          variant="outlined"
          autoComplete="last-name"
          inputProps={{ maxLength: 100 }}
        />
        <TextField
          defaultValue={user?.about}
          fullWidth
          id="about-you"
          label="About You"
          name="bio"
          helperText={`About`}
          placeholder="Write something about you..."
          multiline
          maxRows={20}
          value={userValues.about}
          variant="outlined"
          onChange={handleChange("about")}
          // inputProps={{ className: classes.textarea, maxLength: 65535 }}
        />
        <InputLabel id="language-list-future">
          Be notified of new releases in your language(s).
        </InputLabel>
        <Select
          fullWidth
          labelId="languages"
          id="languages"
          multiple
          value={combinedLanguages || []}
          onChange={handleLanguageSelect}
          onOpen={() => console.log("select opened")}
          onClose={handleCloseLanguageSelect}
          IconComponent={FiChevronDown}
          renderValue={(selected) => {
            return (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip
                    sx={{ marginRight: 1 }}
                    key={value}
                    label={value}
                    clickable
                    deleteIcon={
                      <FiX
                        className={classes.deleteIcon}
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    }
                    className={classes.chip}
                    onDelete={(e) => handleLanguageDelete(e, value)}
                    onClick={() => console.log("clicked chip")}
                  />
                ))}
              </div>
            );
          }}
        >
          {langNames.map((lang, index) => {
            return (
              <MenuItem key={lang} value={lang} sx={{ overflow: "scroll" }}>
                <Checkbox checked={combinedLanguages.includes(lang)} />
                <ListItemText primary={lang} />
              </MenuItem>
            );
          })}
        </Select>
        {alertMessage.section === 1 &&
          alertMessage.alert.severity?.length > 0 && (
            <Alert severity={alertMessage.alert.severity}>
              {alertMessage.alert.content}
            </Alert>
          )}
        <Button
          disabled={loading === 1}
          size="large"
          color="primary"
          fullWidth
          variant="contained"
          onClick={handleProfileUpdate}
        >
          {loading === 1 && <LoadingDots />}
          {loading !== 1 && "Update Profile Info"}
        </Button>
      </Stack>
      <Divider sx={{ marginTop: 5 }}>
        <Typography gutterBottom variant="h4" color="textSecondary">
          Change Account Password
        </Typography>
      </Divider>
      <Stack sx={{ marginBottom: 3, marginTop: 3 }} spacing={2}>
        <TextField
          fullWidth
          label="Enter New Password"
          name="password"
          required
          type="password"
          onChange={onPasswordChange}
          value={userValues.newPassword || ""}
          variant="outlined"
          autoComplete="new-password"
          inputProps={{ maxLength: 100 }}
        />
        {alertMessage.section === 2 &&
          alertMessage.alert.severity?.length > 0 && (
            <Alert severity={alertMessage.alert.severity}>
              {alertMessage.alert.content}
            </Alert>
          )}
        <Button
          size="large"
          color="primary"
          fullWidth
          variant="contained"
          onClick={handlePasswordUpdate}
          disabled={loading === 2}
        >
          {loading === 2 && <LoadingDots />}
          {loading !== 2 && "Change Password"}
        </Button>
      </Stack>

      <Divider sx={{ marginTop: 5 }}>
        <Typography gutterBottom variant="h4" color="textSecondary">
          Change Email Address
        </Typography>
      </Divider>

      <Stack sx={{ marginBottom: 3, marginTop: 3 }} spacing={2}>
        <Typography gutterBottom variant="h6" color="textSecondary">
          This will require verification at your new email address.
        </Typography>
        <TextField
          sx={{ marginBottom: 3 }}
          value={user?.email || ""}
          disabled
          fullWidth
          label="Old email address"
          name="email"
          type="email"
          variant="outlined"
        />
        <TextField
          sx={{ marginBottom: 3 }}
          disabled={loading === 3}
          fullWidth
          label="New email address"
          inputProps={{ maxLength: 100 }}
          name="email"
          onChange={onEmailChange}
          type="email"
          value={userValues.newEmail}
          variant="outlined"
        />
        {alertMessage.section === 3 &&
          alertMessage.alert.severity?.length > 0 && (
            <Alert severity={alertMessage.alert.severity}>
              {alertMessage.alert.content}
            </Alert>
          )}
        <Button
          color="primary"
          disabled={loading.section === 2 && loading.status === true}
          fullWidth
          onClick={handleEmailUpdate}
          size="large"
          variant="contained"
        >
          {loading === 3 && <LoadingDots />}
          {loading !== 3 && "Change Email"}
        </Button>
      </Stack>
    </>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
