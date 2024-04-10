//event.js
import { useCallback, useEffect, useRef, useState } from "react";

//Library components
import { createStyles, makeStyles } from "@mui/styles";
import Participant from "@/components/ui/LiveStreaming/Participant";

const styles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "block"
    }
  })
);

const ParticipantMainframe = () => {
  const classes = styles();
  const [mode, setMode] = useState("participant_as_speaker"); //host_as_speaker, host_as_audience, participant,  participant_as_speaker

  return (
    <>
      {/* if user is guest and active speaker*/}
      {(mode === "participant_as_speaker" ||
        mode === "participant_as_audience") && (
        <Participant
          bookTitle="the_king_of_the_birds"
          channel="demo_channel"
          eventRole="participant"
          currentMode={mode}
        />
      )}
    </>
  );
};

export default ParticipantMainframe;
