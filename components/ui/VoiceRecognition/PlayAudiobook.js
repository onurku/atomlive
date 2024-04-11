import { Fragment, useEffect, useRef, useState } from "react";
import { useSpeechRecognition } from "react-speech-recognition";
import parse from "html-react-parser";

import { createStyles, makeStyles } from "@mui/styles";
import { common, blue } from "@mui/material/colors";
import Button from "@mui/material/Button";
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
  contentTextFontSize,
  contentTextHeight,
  title,
  language,
  page,
  pageText,
  setContentTextHeight,
  setVoiceMode, //0: default, 1: Read Aloud, 2: Audiobook
  setVoiceRecognition,
  voiceMode
}) => {
  const classes = styles();
  const [mode, setMode] = useState(0); //0: default
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
  const [searchTerm, setSearchTerm] = useState("");
  const storyContent = localStorage.getItem(title);
  const [storyContentText, setStoryContentText] = useState(pageText);
  const audioLocation = JSON.parse(storyContent).audio.location;
  const [activeAudioIndex, setActiveAudioIndex] = useState(0);
  const [activeAudioText, setActiveAudioText] = useState("");
  const [audio, setAudio] = useState(
    new Audio(`${audioLocation}${lang[language]}/${page}.mp3`)
  );
  const [audioUrl, setAudioUrl] = useState(
    language
      ? `${audioLocation}${lang["en"]}/${page}.mp3`
      : `${audioLocation}${lang[language]}/${page}.mp3`
  );
  const audioRef = useRef();
  //count how many words in pageText per paragraph
  const wordsLengthArr = pageText
    ?.split("<br/>")
    .map((elem) => elem.split(" ").join("|").split("|").length);

  let currentIndex = 0;
  const playAudio = async (e) => {
    e.stopPropagation();

    let audioFile;
    if (language) {
      audioFile = `${audioLocation}${lang[language]}/${page}.mp3`;
      console.log("audioFile:", audioFile, lang[language]);
      setAudioUrl(audioFile);
    }

    audioRef.current.currentTime = 0;
    currentIndex = 0;

    if (voiceMode === 0) {
      if (storyContent) {
        setVoiceMode(2);

        //start reading
        setVoiceRecognition("tts");
        setTimeout(async function () {
          await audioRef.current.play();
        }, 0);

        const pageAudio = `${audioLocation}${lang[language]}/json/${page}.json`;
        console.log("pageAudio:", pageAudio, lang[language]);
        const jsonTextData = await fetch(pageAudio);
        const entireText = await jsonTextData.json();
        const content = entireText.words_cleaned; //array
        const contentCompare = pageText
          ?.split("<br/>")
          .join(" ")
          .split(" - ")
          .join(" ")
          .split(" ");
        console.log("array", contentCompare);
        for (let i = 0; i < content.length; i++) {
          if (content[i].label !== contentCompare[i]) {
            console.log(
              "compare content",
              i,
              ":",
              content[i].label,
              " vs. ",
              contentCompare[i]
            );
          }
        }
        let duration = 0;
        let cumulativeDuration = 0;
        const durations = [];
        for (let i = 0; i < content.length; i++) {
          cumulativeDuration += duration;

          options.timer[i] = setTimeout(
            (function (x, cDur) {
              const prev = x > 0 ? content[x - 1].end : 0;
              duration = (content[x].end - prev) * 1000;
              durations.push(duration);
              return function () {
                setActiveAudioText(content[x].label);
                setActiveAudioIndex(x);
              };
            })(i, cumulativeDuration),
            cumulativeDuration
          );
        }
      }
    } else if (voiceMode === 2) {
      //stop reading
      setVoiceMode(0);
      setVoiceRecognition();
      //reset array index
      currentIndex = 0;
      setActiveAudioIndex(0);
      setActiveAudioText("");
      audioRef.current.pause();
      options.timer.forEach(clearTimeout);
      options.timer = [];
    }
  };

  const handleAudioEnded = () => {
    setVoiceMode(0);
    setVoiceRecognition();
  };

  const handleAudioLoaded = () => {
    if (language === "en") {
      audioRef.current.playbackRate = AUDIO_SPEED;
    }
  };

  useEffect(() => {
    setSearchTerm(transcript);
    setAudio(new Audio(`${audioLocation}${lang[language]}/${page}.mp3`));
  }, [transcript]);

  return <>
    {browserSupportsSpeechRecognition &&
      ((language && language === "en") ||
        language?.includes("es") ||
        language === "fr") && (
        <div className={classes.voiceRoot}>
          <audio
            ref={audioRef}
            src={audioUrl}
            preload="auto"
            onEnded={handleAudioEnded}
            onLoadedMetadata={handleAudioLoaded}
          />
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
              <>
                <Button
                  onClick={playAudio}
                  size="small"
                  variant="outlined"
                  color="secondary"
                >
                  Play Audiobook
                </Button>
              </>
            )}
            {voiceMode === 2 && (
              <>
                <Stack>
                  <Button
                    sx={{ display: "flex", alignSelf: "flex-end", mb: 2 }}
                    onClick={playAudio}
                    size="small"
                    variant="outlined"
                    color="secondary"
                  >
                    Stop Reading
                  </Button>
                  <Stack
                    sx={{
                      height: contentTextHeight,
                      overflowY: "scroll"
                    }}
                  >
                    {pageText?.split("<br/>").map((paragraph, index) => {
                      return <>
                        <Typography
                          variant="body1"
                          key={index}
                          gutterBottom
                          sx={{ fontSize: `${contentTextFontSize}rem` }}
                        >
                          {paragraph
                            .split(" - ")
                            .join(" ")
                            .split(" ")
                            .map((word, ind) => {
                              const newWord = word
                                ?.replace(/[:;,.|¿?¡!“”]+/g, "")
                                ?.toLowerCase();
                              newWord.split(" – ").join(" ");
                              const newAudioText = activeAudioText
                                ?.replace(/[:;,.|¿?¡!“”]+/g, "")
                                ?.toLowerCase();
                              currentIndex++;

                              if (newAudioText === newWord) {
                                console.log(
                                  "audio Text",
                                  currentIndex,
                                  activeAudioIndex,
                                  newWord,
                                  newAudioText
                                );
                              }

                              return (
                                <Fragment key={ind}>
                                  {/* {currentIndex === activeAudioIndex && (
                                <Typography variant="body1">
                                  {currentIndex}
                                  {", "} {activeAudioIndex}
                                </Typography>
                              )} */}

                                  {newAudioText === newWord &&
                                  currentIndex === activeAudioIndex + 1 ? (
                                    <Typography
                                      variant="span"
                                      sx={{
                                        border: "1px solid black",
                                        color: blue["A700"],
                                        backgroundColor: common.white,
                                        fontWeight: "bold",
                                        fontSize: `${contentTextFontSize}rem`
                                      }}
                                    >
                                      {word}{" "}
                                    </Typography>
                                  ) : (
                                    <Typography variant="span">
                                      {word}{" "}
                                    </Typography>
                                  )}
                                </Fragment>
                              );
                            })}
                        </Typography>
                      </>;
                    })}
                  </Stack>
                </Stack>
              </>
            )}
          </Stack>
        </div>
      )}
  </>;
};

export default PlayAudiobook;
