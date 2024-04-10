import { makeStyles } from "@mui/styles";

export const useSharedStyles = makeStyles({
  heroSharedContainer: {
    position: "relative",
    paddingTop: "160px",
    paddingBottom: "51px",
    background:
      "url('/static/new-home/white-bottom-decor.svg') bottom -2px center / 100% auto no-repeat, #E0F2FE",
    "@media (max-width: 768px)": {
      paddingTop: "120px"
    }
  },
  textSky500: {
    color: "#0EA5E9"
  },
  text18: {
    fontSize: "18px"
  },
  textZinc700: {
    color: "#3F3F46"
  },
  mb4: {
    marginBottom: "16px"
  },
  mt6: {
    marginTop: "24px"
  },
  mt4: {
    marginTop: "16px"
  }
});
