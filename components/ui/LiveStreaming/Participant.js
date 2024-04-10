import { useEffect, useCallback, useLayoutEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import useAgora from "@/components/libs/agora/useAgora";
import MediaPlayer from "@/components/libs/agora/MediaPlayer";

// Library compoenents
import { createStyles, makeStyles } from "@mui/styles";
import { common, red } from "@mui/material/colors";

//app components
import { useGetArEffects } from "@/components/hooks/useContent";
import ParticipantAsSpeaker from "@/components/ui/LiveStreaming/ParticipantSpeaker";
import ParticipantAsAudience from "@/components/ui/LiveStreaming/ParticipantAudience";
import effectsList_audience from "@/components/ui/LiveStreaming/effectsList_audience";

function Participant({ bookTitle, channel, currentMode, eventRole }) {
  const { effectsList } = useGetArEffects(bookTitle);
  const [mode, setMode] = useState(currentMode);

  const handleModeChange = useCallback((newMode) => (e) => {
    console.log("handleModeChange", newMode);
    const isHost = mode === "host_as_speaker" || mode === "host_as_audience";
    const isParticipant =
      mode === "participant_as_audience" || mode === "participant_as_speaker";
    const isNewHost =
      newMode === "host_as_speaker" || newMode === "host_as_audience";
    const isNewParticipant =
      newMode === "participant_as_audience" ||
      newMode === "participant_as_speaker";
    if (isHost && isNewParticipant) {
      console.error("cannot set host as participant");
      return;
    }
    if (isParticipant && isNewHost) {
      console.error("cannot set participant as host");
      return;
    }

    setMode(newMode);
  });

  console.log("participant=======", mode);
  return (
    <>
      {mode === "participant_as_speaker" && (
        <ParticipantAsSpeaker
          bookTitle={bookTitle}
          channel={channel}
          eventRole={eventRole}
          effectsList={effectsList}
          handleModeChange={handleModeChange}
        />
      )}
      {mode === "participant_as_audience" && (
        <ParticipantAsAudience
          bookTitle={bookTitle}
          channel={channel}
          eventRole={eventRole}
          effectsList={effectsList_audience}
          handleModeChange={handleModeChange}
        />
      )}
    </>
  );
}

export default Participant;
