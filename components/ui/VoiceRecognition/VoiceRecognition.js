import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";
import parse from "html-react-parser";

import { createStyles, makeStyles } from "@mui/styles";
import Color from "@/components/styles/color";
import { common } from "@mui/material/colors";
import all from "@/ar_content/books/all";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const styles = makeStyles((theme) =>
  createStyles({
    actionButton: {
      backgroundColor: Color.hex.navy
    },
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
const VoiceRecognition = ({
  title,
  language,
  page,
  pageText,
  contentTextHeight,
  setContentTextHeight,
  setVoiceRecognition
}) => {
  const classes = styles();
  const [mode, setMode] = useState(0); //0: default, 1: Read Aloud, 100: Stop Reading, 2: Audiobook, 200: Reading to me
  const lang = {
    en: "en-us",
    es: "es-es",
    fr: "fr-fr",
    "es-co": "es-co",
    "es-mx": "es-mx"
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
  const [activeAudioIndex, setActiveAudioIndex] = useState(0);
  const [activeAudioText, setActiveAudioText] = useState("");
  const [audio, setAudio] = useState(
    new Audio(`${audioLocation}${lang[language]}/${page}.mp3`)
  );
  const [audioUrl, setAudioUrl] = useState(
    `${audioLocation}${lang[language]}/${page}.mp3`
  );
  console.log("audio", audioUrl);
  const audioRef = useRef();
  //count how many words in pageText per paragraph
  const wordsLengthArr = pageText
    ?.split("<br/>")
    .map((elem) => elem.split(" ").join("|").split("|").length);

  const handleReadYourself = (e) => {
    if (mode === 0) {
      setMode(1);
      SpeechRecognition.startListening({
        continuous: true,
        language: lang[language]
      });
      setContentTextHeight("50%");
    } else {
      setMode(0);
      SpeechRecognition.stopListening();
      setContentTextHeight("100%");
    }
  };

  const getWordAt = (str, pos) => {
    // Perform type conversions.
    str = String(str);
    pos = Number(pos) >>> 0;

    // Search for the word's beginning and end.
    var left = str.slice(0, pos + 1).search(/\S+$/),
      right = str.slice(pos).search(/\s/);

    // The last word in the string is a special case.
    if (right < 0) {
      return str.slice(left);
    }
    // Return the word, using the located bounds to extract it from the string.
    return str.slice(left, right + pos);
  };

  const drawTextInPanel = (words_array) => {
    // const panel = document.getElementById("panel");

    let formattedText = "";
    for (let i = 0; i < words_array.length; i++) {
      var html =
        '<span id="word_span_' +
        i +
        '" style="display:inline-block">' +
        words_array[i] +
        "</span>&nbsp;";
      // panel.innerHTML += html;
      formattedText += html;
      const storyElemText =
        '<div style="width:inherit; hyphens:manual; overflow-wrap:auto; display:inline-block">' +
        formattedText +
        "</div>";
      setStoryText(parse(storyElemText));
    }
  };

  const utterance = new SpeechSynthesisUtterance();
  let wordIndex = 0;
  let global_words = [];
  utterance.lang = lang[language];
  utterance.rate = 1;
  utterance.onend = (event) => {
    wordIndex = 0;
    setMode(0);
    setStoryText("");
    panel.style.borderBottom = "1px solid transparent";
    panel.style.paddingBottom = "0";
    panel.style.paddingTop = "0";
  };

  utterance.onboundary = (event) => {
    const word = getWordAt(pageText, event.charIndex);
    // Show Speaking word : x
    // document.getElementById("word").innerHTML = word;
    //Increase index of span to highlight
    console.info("global", global_words[wordIndex]);

    try {
      document.getElementById("word_span_" + wordIndex).style.color =
        Color.hex.blue;
      const panel = document.getElementById("panel");
      panel.style.width = "100%";
      panel.style.wordBreak = "keep-all";
      panel.style.borderBottom = "1px solid black";
      panel.style.paddingBottom = "32px";
      panel.style.paddingTop = "32px";
      panel.style.whiteSpace = "normal!important";
      panel.style.display = "inline-block";
    } catch (e) {}

    wordIndex++;
  };
  const handleReadToMe = (e) => {
    var text = pageText;
    var words = text.split("<br/>").join(" ").split(" ");
    if (mode === 0) {
      setMode(2);

      global_words = words;
      // Draw the text in a div
      drawTextInPanel(words);
      utterance.text = words.join(" ");
      speechSynthesis.speak(utterance);
    } else {
      wordIndex = 0;
      setStoryText("");
      // panel.innerHTML = "";
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
      setMode(0);
    }
  };

  let currentIndex = 0;
  const handleRead = async (e) => {
    e.stopPropagation();

    console.log("handleRead");
    var text = pageText;
    const audioFile = `${audioLocation}${lang[language]}/${page}.mp3`;
    console.log("audioFile:", audioFile, lang[language]);
    setAudioUrl(audioFile);
    audioRef.current.currentTime = 0;
    currentIndex = 0;

    if (mode === 0) {
      if (storyContent) {
        setMode(2);

        //start reading
        setVoiceRecognition("stt");
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
    } else if (mode === 2) {
      //stop reading
      setMode(0);
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
    setMode(0);
    setVoiceRecognition();
  };

  const handleAudioLoaded = () => {
    if (language === "en") {
      audioRef.current.playbackRate = AUDIO_SPEED;
      console.log("change duration to AUDIO_SPEED");
    }
  };

  useEffect(() => {
    setSearchTerm(transcript);
    setAudio(new Audio(`${audioLocation}${lang[language]}/${page}.mp3`));
    console.log("language", language);
  }, [transcript]);

  return <>
    {browserSupportsSpeechRecognition &&
      language &&
      (language === "en" ||
        language?.includes("es") ||
        language === "fr" ||
        language === "tr") && (
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
              flexDirection: mode === 2 ? "row-reverse" : "row"
            }}
            direction={{ xs: "column", lg: "row" }}
            spacing={2}
          >
            {mode === 0 && (
              <Button
                onClick={handleReadYourself}
                size="small"
                variant="outlined"
                color="secondary"
                sx={{ backgroundColor: Color.hex.navy }}
              >
                Read Aloud
              </Button>
            )}
            {mode === 1 && (
              <Button
                onClick={handleReadYourself}
                size="small"
                variant="outlined"
                color="secondary"
              >
                End Reading
              </Button>
            )}
            {mode === 1 && (
              <Button onClick={resetTranscript} size="small">
                Reset
              </Button>
            )}
            {mode === 0 && (
              <>
                <Button
                  onClick={handleRead}
                  size="small"
                  variant="outlined"
                  color="secondary"
                  sx={{ backgroundColor: Color.hex.navy }}
                >
                  Play Audiobook
                </Button>
              </>
            )}

            {mode === 2 && (
              <>
                <Stack>
                  <Button
                    sx={{ display: "flex", alignSelf: "flex-end", mb: 2 }}
                    onClick={
                      language === "en" ||
                      language?.includes("es") ||
                      language === "fr" ||
                      language === "tr"
                        ? handleRead
                        : handleReadToMe
                    }
                    size="small"
                    variant="outlined"
                    color="secondary"
                  >
                    Stop Reading
                  </Button>
                  <Stack
                    sx={{ height: contentTextHeight, overflowY: "scroll" }}
                  >
                    {pageText?.split("<br/>").map((paragraph, index) => {
                      return <>
                        <Typography
                          variant="body1"
                          key={index}
                          gutterBottom
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
                              // console.log(
                              //   "check audio",
                              //   newWord,
                              //   "vs. ",
                              //   activeAudioText
                              // );
                              const newAudioText = activeAudioText
                                ?.replace(/[:;,.|¿?¡!“”]+/g, "")
                                ?.toLowerCase();
                              currentIndex++;

                              // if (newAudioText === newWord) {
                              //   console.log(
                              //     "audio Text",
                              //     currentIndex,
                              //     activeAudioIndex,
                              //     newWord,
                              //     newAudioText
                              //   );
                              // }

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
                                        backgroundColor: common.white,
                                        color: common.brightblue,
                                        paddingLeft: 1,
                                        paddingRight: 1
                                      }}
                                    >
                                      {word.toUpperCase()}{" "}
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

          {/* <div
          id="panel"
          className={classes.panel}
          dangerouslySetInnerHTML={{ __html: storyText }}
        ></div>
        <div id="panel" className={classes.panel}>
          {storyText}
        </div> */}

          {mode === 1 && (
            <>
              <Stack
                sx={{ display: "flex", alignItems: "center" }}
                direction="row"
              >
                <Box sx={{ maxWidth: "70%" }}>
                  <Typography variant="body2">
                    Enable mic, start speaking and let's see how well you do.
                  </Typography>

                  {!isMicrophoneAvailable && (
                    <Typography variant="body2">
                      Mic is off. Please check your microphone settings.
                    </Typography>
                  )}
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
                  {interimTranscript}
                </Typography>
              </Box>
            </>
          )}
        </div>
      )}
  </>;
};

export default VoiceRecognition;
