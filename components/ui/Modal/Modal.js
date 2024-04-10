import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
// import { ThemeProvider } from "@mui/material/styles";
// import monochrome from "theme/monochrome";
import ModalStyles from "@/components/ui/Modal/ModalStyles";

const isBrowser = typeof window !== "undefined";

const modalRoot = isBrowser ? document.getElementById("modal-root") : null;

const ModalPortal = ({ children }) => {
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current);
  });

  return createPortal(
    <div>
      <ModalStyles />
      {children}
    </div>,
    elRef.current
  );
};

export default ModalPortal;
