import { useCallback, useState } from "react";

// Library compoenents
import { createStyles, makeStyles } from "@mui/styles";
import { common, red } from "@mui/material/colors";

//app components
import { useGetArEffects } from "@/components/hooks/useContent";
import HostAsSpeaker from "@/components/ui/LiveStreaming/HostSpeaker";
import HostAsAudience from "@/components/ui/LiveStreaming/HostAudience";
import effectsList_audience from "@/components/ui/LiveStreaming/effectsList_audience";

function Host({ bookTitle, channel, currentMode, eventRole }) {
  const { arEffects, publisher, prettyTitle, videoWidth, videoHeight } =
    useGetArEffects(bookTitle);
  const [mode, setMode] = useState(currentMode);
  console.log("videoWidth Host", videoWidth, videoHeight);
  const handleModeChange = useCallback((newMode) => (e) => {
    console.log("handleModeChange", newMode);
    const isHost = mode === "host_as_speaker" || mode === "host_as_audience";
    const isParticipant =
      mode === "participant" || mode === "participant_as_speaker";

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

  return (
    <>
      {mode === "host_as_speaker" && (
        <HostAsSpeaker
          slug={bookTitle}
          prettyTitle={prettyTitle}
          channel={channel}
          eventRole={eventRole}
          effectsList={arEffects}
          publisher={publisher}
          videoWidth={videoWidth}
          videoHeight={videoHeight}
          handleModeChange={handleModeChange}
        />
      )}
      {mode === "host_as_audience" && (
        <HostAsAudience
          slug={bookTitle}
          prettyTitle={prettyTitle}
          channel={channel}
          eventRole={eventRole}
          publisher={publisher}
          videoWidth={videoWidth}
          videoHeight={videoHeight}
          effectsList={effectsList_audience} //masks that the teacher wears as an audience in class
          effectsBook={arEffects} // this is used to allow the host to help participant navigate page clicks
          handleModeChange={handleModeChange}
        />
      )}
    </>
  );
}

export default Host;
