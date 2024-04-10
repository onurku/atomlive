import { createStyles, makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import "@fontsource/petrona";
import Color from "@/components/styles/color";

const styles = makeStyles((theme) =>
  createStyles({
    root: {
      color: Color.hex.lavender,
      fontFamily: "Petrona, Times New Roman",
      fontWeight: 600
    }
  })
);

const Subtitle = ({ text }) => {
  const classes = styles();

  return (
    <Typography align="center" className={classes.root} variant="h5">
      {text}
    </Typography>
  );
};

export default Subtitle;
