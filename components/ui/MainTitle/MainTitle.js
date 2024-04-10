import { createStyles, makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import "@fontsource/petrona";

const styles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(5),
      fontFamily: "Petrona, Times New Roman",
      fontWeight: 600
    }
  })
);

const MainTitle = ({ text }) => {
  const classes = styles();

  return (
    <Typography align="center" className={classes.root} variant="h3">
      {text}
    </Typography>
  );
};

export default MainTitle;
