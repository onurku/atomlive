import { forwardRef } from "react";
import Link from "next/link";
import { makeStyles } from "@mui/styles";
import { common, grey } from "@mui/material/colors";
import Color from "@/components/styles/color";

export default forwardRef(({ to, size, variant, selected, ...props }, ref) => {
  const styles = makeStyles({
    root: {
      color: variant === "secondary" ? common.black : common.white,
      backgroundColor:
        variant === "secondary" ? Color.hex.neonyellow : Color.hex.liberty,
      textDecoration: "none",
      "&.selected": {
        background: grey[800]
      },
      padding: size === "large" ? 16 : "8px 16px",
      display: "inline-block",
      width: "auto",
      margin: "auto",
      border:
        variant === "secondary"
          ? `1px solid ${Color.hex.liberty}`
          : `1px solid ${Color.hex.white}`
    }
  });

  const classes = styles();

  const itemColor = `${classes.root} ${selected ? "selected" : ""}`;

  return (
    <Link sx={{ justifyContent: "center", alignContent: "center" }} href={to}>
      <a className={itemColor} {...props} ref={ref} />
    </Link>
  );
});
