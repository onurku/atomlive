import React, { useEffect } from "react";

const Calendly = ({ height = 800, width = 480 }) => {
  useEffect(() => {
    // const head = document.querySelector("head");
    // const script = document.createElement("script");
    // script.setAttribute(
    //   "src",
    //   "https://assets.calendly.com/assets/external/widget.js"
    // );
    // head.appendChild(script);
  }, []);

  return (
    <div
      style={{
        width,
        height,
        minWidth: 320
      }}
    >
      <iframe
        src="https://calendly.com/atomlive"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  );
};

export default Calendly;
