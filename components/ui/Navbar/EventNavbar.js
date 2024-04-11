import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/legacy/image";

import { createStyles, makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { FiBookOpen } from "react-icons/fi";
import { common, grey } from "@mui/material/colors";
import { FiList } from "react-icons/fi";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "@mui/material/Link";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

//App components
// import Entrance from "@/components/ui/Entrance/";
// import Logo from "@/components/icons/Logo";
// import ShoppingBag from "@/components/ui/ShoppingBag";
// import SideNavSlider from "@/components/ui/SideNavSlider";
import { useGetLanguageList, useContent } from "@/components/hooks/useContent";
import { languages } from "@/components/ui/Navbar/countries";
import GesturesLegend from "../LiveStreaming/GesturesLegend";
import Color from "@/components/styles/color";

const styles = makeStyles((theme) =>
  createStyles({
    discussButton: {
      justifyContent: "flex-end",
      display: "flex",
      marginLeft: theme.spacing(2),
      backgroundColor: "transparent",
      color: common.black,
      border: "1px solid transparent",
      "&:hover": {
        backgroundColor: "transparent"
      }
    },
    navbar: {
      backgroundColor: Color.hex.natural,
      padding: theme.spacing(1),
      display: "flex"
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
    },
    languageSwitch: {
      height: 42,
      display: "flex",
      alignSelf: "center",
      flexGrow: 1,
      justifyContent: "flex-end"
    },
    toggleButton: {
      textTransform: "inherit"
    }
  })
);

const EventNavbar = ({
  admin,
  arLanguageList,
  contentTextFontSize,
  currentLanguage = "en",
  currentGestures,
  discussion,
  handleLanguageSwitch,
  handleDisplayDescription,
  handleFontSizeChange,
  isDisplayDescription,
  join,
  joinState,
  leave,
  page,
  setGesturesLegend,
  slug,
  showSideNavSlider,
  title,
  toggleSideNavSlider,
  totalNumPages
}) => {
  const classes = styles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { languageList } = useGetLanguageList(slug);
  const activePageIndexLocal = localStorage.getItem("activePageIndex");
  const currentPageIndex = activePageIndexLocal
    ? JSON.parse(localStorage.getItem("activePageIndex"))[slug]
    : 0;
  console.log("currentPageIndex,", currentPageIndex);
  const [activePageIndex, setActivePageIndex] = useState(currentPageIndex);

  useEffect(() => {
    console.log("currentGestures", currentGestures, page, title);
  }, [currentGestures, page, currentLanguage, setGesturesLegend]);
  return (
    <>
      <Stack className={classes.navbar} direction="row">
        {/* <SideNavSlider
          align="flex-end"
          showSideSlider={showSideNavSlider}
          toggleSideSlider={toggleSideNavSlider}
        /> */}
        <NextLink href="/books/" passHref>
          <Link
            sx={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              pr: 1
            }}
          >
            <Image
              width="100"
              height="32"
              src="/static/logo-atom-black.svg"
              alt="Atom turns bored kids into bilingual superstars"
            />
          </Link>
        </NextLink>
        {/* <NextLink href="/books" passHref>
          <Link
            sx={{
              textDecoration: "none",
              display: "flex",
              justifyContent: "flex-end",
              pr: 2
            }}
          >
            <Stack sx={{ alignItems: "center" }}>
              <FiBookOpen color={grey[700]} size={32} />
              <Typography color={grey[700]} variant="subtitle2">
                Browse
              </Typography>
            </Stack>
          </Link>
        </NextLink> */}
        <GesturesLegend
          currentGestures={currentGestures}
          handleDisplayDescription={handleDisplayDescription}
          isDisplayDescription={isDisplayDescription}
          page={page}
          setGestures={setGesturesLegend}
          title={title}
          totalNumPages={totalNumPages}
        />
        <Stack direction="row" sx={{ flexGrow: 1, justifyContent: "flex-end" }}>
          {discussion && (
            <>
              {/* <Button
                className={classes.discussButton}
                id="discuss-button"
                aria-controls={open ? "discuss-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleDisplayDiscussion}
                // endIcon={<KeyboardArrowDownIcon />}
              >
                <FiList size={36} />
              </Button> */}
              {/* <Menu
                id="discuss-menu"
                MenuListProps={{
                  "aria-labelledby": "discuss-button"
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <Stack sx={{ px: 2 }}>
                  {discussion?.map((question, key) => {
                    return (
                      // <MenuItem onClick={handleClose} disableRipple>
                      <Typography gutterBottom variant="subtitle2" key={key}>
                        {question}
                      </Typography>
                      // </MenuItem>
                    );
                  })}
                </Stack>
              </Menu> */}
            </>
          )}
          <Stack direction="row" spacing={2}>
            <ToggleButtonGroup
              className={classes.languageSwitch}
              value={contentTextFontSize}
              onClick={handleFontSizeChange}
            >
              <Tooltip title="Decrease Font">
                <ToggleButton
                  className={classes.toggleButton}
                  value={-1}
                  aria-label={`decrease fonts`}
                  disabled={contentTextFontSize === 1.6}
                >
                  a-
                </ToggleButton>
                {/* <Button
                  size="small"
                  variant="text"
                  value={-1}
                  onClick={handleFontSizeChange}
                  disabled={contentTextFontSize === 1}
                >
                  a-
                </Button> */}
              </Tooltip>
              <Tooltip title="Increase Font">
                {/* <Button
                  size="small"
                  variant="text"
                  value={1}
                  onClick={handleFontSizeChange}
                  disabled={contentTextFontSize === 1.6}
                >
                  A+
                </Button> */}
                <ToggleButton
                  className={classes.toggleButton}
                  value={1}
                  aria-label={"increase font"}
                >
                  A+
                </ToggleButton>
              </Tooltip>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              className={classes.languageSwitch}
              value={currentLanguage}
              exclusive
              onChange={handleLanguageSwitch}
              aria-label="Switch Language"
            >
              {languageList.map((language) => {
                return (
                  <ToggleButton
                    className={classes.toggleButton}
                    key={language}
                    value={language}
                    aria-label={`${language} language`}
                  >
                    {languages[language]}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Stack>
        </Stack>
        {admin && (
          <form className="call-form">
            {/* <label>
          Channel:
          <input
            type="text"
            name="channel"
            onChange={(event) => {
              setChannel(event.target.value);
            }}
          />
        </label> */}
            <label>
              UID:
              <input
                type="text"
                name="uid"
                onChange={(event) => {
                  setUid(event.target.value);
                }}
              />
            </label>
            <div className="button-group">
              <button
                id="join"
                type="button"
                className="btn btn-primary btn-sm"
                disabled={joinState}
                onClick={join}
              >
                Join
              </button>
              <button
                id="leave"
                type="button"
                className="btn btn-primary btn-sm"
                disabled={!joinState}
                onClick={leave}
              >
                Leave
              </button>
            </div>
          </form>
        )}
      </Stack>
    </>
  );
};

export default EventNavbar;
