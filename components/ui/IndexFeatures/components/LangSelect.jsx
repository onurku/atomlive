import { countryNames } from "@/components/ui/Navbar/countries";
import Popover from "@mui/material/Popover";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useScreenSize from "../hooks/useScreenSize";

const screenSizeThresholds = {
  xl: 10,
  lg: 8,
  md: 6,
  sm: 3
};

const useStyles = makeStyles({
  buttonStyle: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "16px",
    padding: "12px",
    borderRadius: "20px",
    border: "1px solid #F4F4F5",
    backgroundColor: "transparent",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    width: "calc(33.333% - 12px)",
    "@media (min-width: 600px)": {
      width: "136px"
    }
  },
  buttonStyleHorizontal: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px",
    borderRadius: "20px",
    border: "1px solid #F4F4F5",
    backgroundColor: "transparent",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    width: "100%"
  },
  activeButton: {
    borderColor: "#0EA5E9"
  },
  titleShort: {
    fontSize: "16px",
    fontWeight: "500",
    fontFamily: "inherit",
    "@media (max-width: 600px)": {
      fontSize: "14px"
    }
  },
  flagContainer: {
    display: "flex",
    gap: "12px",
    justifyContent: "center"
  },
  flag: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  flagWrap: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    overflow: "hidden"
  },
  flagWrapSmall: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    overflow: "hidden"
  },
  popoverContent: {
    width: "288px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  textCenter: {
    fontSize: "16px",
    fontWeight: "semibold",
    textAlign: "center"
  }
});

const LangSelect = ({ onSelect }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [currentActive, setCurrentActive] = useState("United States");
  const screenSize = useScreenSize();
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [notDisplayedCountries, setNotDisplayedCountries] = useState([]);
  const selectedCountries = [
    { name: "United States", language: "English" },
    { name: "Spain", language: "Spanish" },
    { name: "France", language: "French" },
    { name: "Germany", language: "German" },
    { name: "Italy", language: "Italian" },
    { name: "Portugal", language: "Portuguese" },
    { name: "Russian Federation", language: "Russian" },
    { name: "Argentina", language: "Spanish" },
    { name: "Turkey", language: "Turkish" },
    { name: "Samoa", language: "Samoan" },
    { name: "Yemen", language: "Arabic" },
    { name: "South Africa", language: "Zulu" },
    { name: "Brazil", language: "Portuguese" },
    { name: "Canada", language: "English/French" },
    { name: "Australia", language: "English" },
    { name: "Japan", language: "Japanese" },
    { name: "India", language: "Hindi" },
    { name: "Mexico", language: "Spanish" },
    { name: "United Kingdom", language: "English" }
  ];

  const selectActiveCountry = (newCountry, language) => {
    setCurrentActive(newCountry);
    if (onSelect) {
      onSelect({
        ...countries[newCountry],
        name: newCountry,
        language: language
      });
    }
  };

  useEffect(() => {
    let maxItems = screenSizeThresholds[screenSize] || screenSizeThresholds.md;

    if (selectedCountries.length > maxItems) {
      maxItems -= 1;
    }

    const newDisplayedCountries = selectedCountries.slice(0, maxItems);
    const newRemainingCountries = selectedCountries.slice(maxItems);

    if (
      JSON.stringify(newDisplayedCountries) !==
      JSON.stringify(displayedCountries)
    ) {
      setDisplayedCountries(newDisplayedCountries);
    }
    if (
      JSON.stringify(newRemainingCountries) !==
      JSON.stringify(notDisplayedCountries)
    ) {
      setNotDisplayedCountries(newRemainingCountries);
    }
  }, [
    screenSize,
    selectedCountries,
    displayedCountries,
    notDisplayedCountries
  ]);

  const countries = countryNames;

  return (
    <div className={classes.flagContainer}>
      {displayedCountries.map((item, index) => (
        <button
          key={index}
          onClick={() => selectActiveCountry(item.name, item.language)}
          className={`${classes.buttonStyle} ${
            item.name === currentActive ? classes.activeButton : ""
          }`}
        >
          <div className={classes.flagWrap}>
            <img
              className={classes.flag}
              src={`https://flagcdn.com/flags/w1160/${countries[
                item.name
              ]?.code.toLowerCase()}.webp`}
              alt=""
            />
          </div>
          <p className={classes.titleShort}>{item.language}</p>
        </button>
      ))}
      <button className={`${classes.buttonStyle}`} onClick={handleClick}>
        <div className={classes.flagWrap}>
          <img
            className={classes.flag}
            src="/static/new-home/icon/more-big.svg"
            alt=""
          />
        </div>
        <p className={classes.titleShort}>More</p>
      </button>
      <Popover
        PaperProps={{
          sx: {
            borderRadius: "16px",
            marginTop: "8px"
          }
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <div className={classes.popoverContent}>
          {notDisplayedCountries.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                handleClose();
                selectActiveCountry(item.name, item.language);
              }}
              className={`${classes.buttonStyleHorizontal} ${
                item.name === currentActive ? classes.activeButton : ""
              }`}
            >
              <div className={classes.flagWrapSmall}>
                <img
                  className={classes.flag}
                  src={`https://flagcdn.com/flags/w1160/${countries[
                    item.name
                  ]?.code.toLowerCase()}.webp`}
                  alt=""
                />
              </div>
              <p className={classes.titleShort}>{item.language}</p>
            </button>
          ))}
        </div>
      </Popover>
    </div>
  );
};

LangSelect.propTypes = {
  onChange: PropTypes.func
};

LangSelect.displayName = "LangSelect";

export default LangSelect;
