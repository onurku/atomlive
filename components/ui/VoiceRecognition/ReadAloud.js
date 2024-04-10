import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";

import { createStyles, makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { common, green } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Color from "@/components/styles/color";

const styles = makeStyles((theme) =>
  createStyles({
    voiceRoot: {
      marginBottom: theme.spacing(2)
    },
    panel: {
      width: "auto",
      height: "auto",
      display: "flex",
      overflowWrap: "break-word",
      whiteSpace: "normal",
      hyphens: "manual",
      flexWrap: "wrap",
      display: "flex",
      fontSize: "2rem",
      fontFamily: 'DM Sans, Roboto, "Helvetica Neue", Arial, sans-serif'
    },

    start: {
      alignSelf: "center",
      display: "flex",
      width: 30,
      height: 30,
      marginTop: theme.spacing(2),
      marginBotto: theme.spacing(2),
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: 15,
      backgroundColor: Color.hex.brightblue,
      animation: "$pulse 1.5s infinite ease-in-out both"
    },
    "@keyframes pulse": {
      "0%": {
        boxShadow: `0px 0px 5px 0px rgba(0, 0, 173, 0.3)`
      },
      "65%": {
        boxShadow: "0px 0px 5px 13px rgba(0, 0, 173, 0.3)"
      },
      "90%": {
        boxShadow: "0px 0px 5px 13px rgba(0, 0, 173, 0)"
      }
    }
  })
);
const options = { timer: [] };
const AUDIO_SPEED = 1;
const PlayAudiobook = ({
  title,
  language,
  page,
  pageText,
  contentTextHeight,
  setContentTextHeight,
  setVoiceMode,
  voiceMode,
  setVoiceRecognition
}) => {
  const classes = styles();
  const [mode, setMode] = useState(0); //0: default, 1: Read Aloud, 100: Stop Reading Aloud, 2: Audiobook, 200: Stop Reading Audiobook
  const lang = {
    en: "en-us",
    es: "es-es",
    "es-co": "es-co",
    "es-mx": "es-mx",
    fr: "fr-fr"
  };
  const {
    listening,
    transcript,
    resetTranscript,
    interimTranscript,
    finalTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();

  const [storyText, setStoryText] = useState("");
  const [isMicOn, setIsMicOn] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const storyContent = localStorage.getItem(title);
  const [storyContentText, setStoryContentText] = useState(pageText);
  const audioLocation = JSON.parse(storyContent).audio.location;

  //save state of the words of each paragraph being read. Ask user to read one paragraph at a time
  const [paragraphText, setParagraphText] = useState(
    pageText ? pageText.split("<br/>")[0].split(" ") : []
  ); //this is the paragraph that user is reading from

  const [pastText, setPastText] = useState([]);
  const [currentText, setCurrentText] = useState(
    paragraphText ? paragraphText[0] : ""
  ); //currentWord to
  const [futureText, setFutureText] = useState([]);

  const [audio, setAudio] = useState(
    new Audio(`${audioLocation}${lang[language]}/${page}.mp3`)
  );
  const [audioUrl, setAudioUrl] = useState(
    `${audioLocation}${lang[language]}/${page}.mp3`
  );
  const audioRef = useRef();
  //count how many words in pageText per paragraph
  const wordsLengthArr = pageText
    ?.split("<br/>")
    .map((elem) => elem.split(" ").join("|").split("|").length);

  const handleReadAloud = (e) => {
    e.stopPropagation();
    if (voiceMode === 0) {
      setVoiceMode(1);
      SpeechRecognition.startListening({
        continuous: true,
        language: lang[language]
      });
      setContentTextHeight("50%");
      const currentIndex = 0;
      setParagraphText();
      if (paragraphText) {
        setCurrentText(paragraphText[currentIndex]);
      }
    } else {
      setVoiceMode(0);
      SpeechRecognition.stopListening();
      setContentTextHeight("100%");
    }
  };

  const continueCheck = (index) => {
    setPastText(pastText.push(currentText));
    setCurrentText(paragraphText[index]);
    setFutureText(paragraphText.pop());
    continueCheck();
  };

  const compareTwoStringsUsingDiceCoefficient = (first, second) => {
    first = first.replace(/\s+/g, "").toLowerCase();
    second = second.replace(/\s+/g, "").toLowerCase();

    if (!first.length && !second.length) return 1; // if both are empty strings
    if (!first.length || !second.length) return 0; // if only one is empty string
    if (first === second) return 1; // identical
    if (first.length === 1 && second.length === 1) return 0; // both are 1-letter strings
    if (first.length < 2 || second.length < 2) return 0; // if either is a 1-letter string

    const firstBigrams = new Map();
    for (let i = 0; i < first.length - 1; i++) {
      const bigram = first.substring(i, i + 2);
      const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;

      firstBigrams.set(bigram, count);
    }

    let intersectionSize = 0;
    for (let i = 0; i < second.length - 1; i++) {
      const bigram = second.substring(i, i + 2);
      const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;

      if (count > 0) {
        firstBigrams.set(bigram, count - 1);
        intersectionSize++;
      }
    }

    return (2.0 * intersectionSize) / (first.length + second.length - 2);
  };

  useEffect(() => {
    setSearchTerm(transcript);
    setAudio(new Audio(`${audioLocation}${lang[language]}/${page}.mp3`));
    console.log("isMic on", isMicrophoneAvailable);

    setParagraphText(pageText?.split("<br/>")[0].split(" "));
    console.log(
      "transcript",
      transcript.toLowerCase()?.includes(currentText?.toLowerCase()),
      currentText?.toLowerCase()
    );
    if (!currentText) {
      setCurrentText(pageText?.split("<br/>")[0].split(" ")[0]);
    }
  }, [transcript, setParagraphText]);

  return (
    <>
      {browserSupportsSpeechRecognition &&
        (language === "en" ||
          language?.includes("es") ||
          language === "fr" ||
          language === "tr") && (
          <div className={classes.voiceRoot}>
            <Stack
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: voiceMode === 2 ? "row-reverse" : "row"
              }}
              direction={{ xs: "column", lg: "row" }}
              spacing={2}
            >
              {voiceMode === 0 && (
                <Button
                  onClick={handleReadAloud}
                  size="small"
                  variant="outlined"
                  color="secondary"
                >
                  Read Aloud
                </Button>
              )}
              {voiceMode === 1 && (
                <Button
                  onClick={handleReadAloud}
                  size="small"
                  variant="outlined"
                  color="secondary"
                >
                  End Reading
                </Button>
              )}
              {voiceMode === 1 && (
                <Button onClick={resetTranscript} size="small">
                  Reset
                </Button>
              )}
            </Stack>
            {voiceMode === 1 && (
              <>
                <Stack
                  sx={{ display: "flex", alignItems: "center" }}
                  direction="row"
                >
                  <Box sx={{ maxWidth: "70%" }}>
                    <Typography variant="body2">
                      Enable mic, start speaking and let's see how well you do.
                    </Typography>
                  </Box>
                  <div className={classes.start}></div>
                </Stack>
                <Box
                  sx={{
                    display: "flex",
                    mt: 5,
                    backgroundColor: "white",
                    scrollY: "auto",
                    overflowY: "scroll",
                    px: 2,
                    height: 150
                  }}
                >
                  <Typography gutterBottom variant="h5">
                    {transcript}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: contentTextHeight,
                    overflowY: "scroll",
                    width: "100%",
                    mt: 1
                  }}
                >
                  {pageText?.split("<br/>").map((paragraph, index) => {
                    return (
                      <>
                        <Typography variant="body1" key={index} gutterBottom>
                          {paragraph
                            .split(" - ")
                            .join(" ")
                            .split(" ")
                            .map((word, ind) => {
                              return (
                                <Typography key={ind} variant="span">
                                  {word}{" "}
                                </Typography>
                              );
                            })}
                        </Typography>
                      </>
                    );
                  })}
                </Box>
              </>
            )}
          </div>
        )}
    </>
  );
};

export default PlayAudiobook;
