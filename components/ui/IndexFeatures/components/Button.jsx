import * as React from "react";

import { makeStyles } from "@mui/styles";
import Color from "@/components/styles/color";

const useStyles = makeStyles({
  buttonBase: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all",
    cursor: "pointer",
    border: "none",
    fontFamily: "Plus Jakarta Sans, sans-serif",
    borderRadius: "20px"
  },
  default: {
    backgroundColor: Color.hex.brightlavender,
    "&:hover": {
      backgroundColor: Color.hex.brightpink
    }
  },
  destructive: {
    backgroundColor: "#ef4444", // destructive
    "&:hover": {
      backgroundColor: Color.hex.brightpurple // destructive/90
    }
  },
  outline: {
    border: "1px solid #d4d4d8", // zinc-300
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "#fef3c7" // yellow-50
    }
  },
  secondary: {
    backgroundColor: "#64748b", // secondary
    color: "#f3f4f6", // secondary-foreground
    "&:hover": {
      backgroundColor: "rgba(100, 116, 139, 0.95)" // secondary/80
    }
  },
  ghost: {
    padding: "0",
    backgroundColor: "transparent"
  },
  link: {
    color: "#2563eb", // primary
    textDecoration: "underline",
    textDecorationOffset: "4px",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  defaultSize: {
    height: "48px", // h-12
    padding: "0 16px" // px-4
  },
  sm: {
    height: "36px", // h-9
    borderRadius: 8, // rounded-md
    padding: "0 12px" // px-3
  },
  lg: {
    height: "56px", // h-14
    borderRadius: 8, // rounded-md
    padding: "0 32px" // px-8
  },
  icon: {
    height: "40px", // h-10
    width: "40px" // w-10
  },
  rounded: {
    borderRadius: 8 // rounded-full
  }
});

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      isRounded = false,
      size = "defaultSize",
      asChild = false,
      tagName = "button",
      ...props
    },
    ref
  ) => {
    const classes = useStyles();
    let Comp = tagName;
    let combinedClasses = `${classes.buttonBase} ${classes[variant]} ${
      classes[size]
    } ${isRounded ? classes.rounded : ""} ${className}`;

    return <Comp className={combinedClasses} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button };
