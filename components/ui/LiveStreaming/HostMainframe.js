//event.js
import { useCallback, useEffect, useRef, useState } from "react";

//Library components
import { createStyles, makeStyles } from "@mui/styles";
import Host from "@/components/ui/LiveStreaming/Host";

const styles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "block"
    }
  })
);

const HostMainframe = ({ slug }) => {
  const classes = styles();
  const [mode, setMode] = useState("host_as_speaker"); //host_as_speaker, host_as_audience, participant,  participant_as_speaker

  return (
    <>
      {/* if user is host and active speaker */}
      {(mode === "host_as_speaker" || mode === "host_as_audience") && (
        <Host
          bookTitle={slug}
          channel="demo_channel"
          eventRole="participant"
          currentMode={mode}
        />
      )}
    </>
  );
};

export default HostMainframe;
