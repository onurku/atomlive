import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    "@global": {
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
        fontFamily: "Lato, Roboto, Arial, Helvetica Neue",
        fontWeight: 500
      },
      html: {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        height: "100%",
        width: "100%"
      },
      body: {
        //backgroundColor: '#f4f6f8',
        height: "100%",
        width: "100%"
      },
      a: {
        textDecoration: "none"
      },
      "#root": {
        height: "100%",
        width: "100%"
      }
    }
  })
);

const ModalStyles = () => {
  useStyles();

  return null;
};

export default ModalStyles;
