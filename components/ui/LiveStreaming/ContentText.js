import { Fragment, useState, useEffect, useLayoutEffect } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useContent } from "@/components/hooks/useContent";
import PlayAudiobook from "@/components/ui/VoiceRecognition";
import ReadAloud from "@/components/ui/VoiceRecognition/ReadAloud";
import ShowDescription from "@/components/ui/VoiceRecognition/ShowDescription";

const styles = makeStyles((theme) =>
  createStyles({
    contentBox: {
      padding: theme.spacing(3),
      overflowY: "auto",
      "-ms-overflow-style": "none" /* for Internet Explorer, Edge */,
      scrollbarWidth: "none" /* for Firefox */,
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        display: "none" /* for Chrome, Safari, and Opera */
      }
    },
    contentText: {
      overflowY: "scroll",
      paddingBottom: theme.spacing(3),
      scrollbarWidth: "none" /* for Firefox */,
      "-ms-overflow-style": "none" /* for Internet Explorer, Edge */,
      "&::-webkit-scrollbar": {
        display: "none" /* for Chrome, Safari, and Opera */
      }
    },
    paragraph: {
      marginBottom: theme.spacing(1),
      fontSize: "1.35rem"
    },
    contentRTL: {
      direction: "rtl"
    }
  })
);

const ContentText = ({
  contentTextFontSize = 1.3,
  contentTextHeight,
  currentLanguage = "en",
  description,
  isDisplayDescription,
  isDisplayDiscussion,
  layout_percent,
  moral,
  page,
  setContentTextHeight,
  title
}) => {
  const classes = styles();
  const { arContent, currentPageText, languageList, status } = useContent({
    title: title,
    language: currentLanguage,
    page
  });

  const [height, setHeight] = useState("");
  const [maxHeight, setMaxHeight] = useState("");
  const [pageText, setPageText] = useState(currentPageText);
  const [voice, setVoice] = useState();
  const [voiceMode, setVoiceMode] = useState(0); //0: default, 1: Read Aloud, 100: Stop Reading Aloud, 2: Audiobook, 200: Stop Reading Audiobook
  const HEIGHT_EVENT_NAVBAR = 72;

  function handleWindowResize() {
    // console.log("handleWindowResize");
    const videoHeight = (window.innerWidth / 1280) * 720 * 0.75;
    if (layout_percent === 100) {
      setHeight("auto");
      setMaxHeight(
        `${window.innerHeight - videoHeight - HEIGHT_EVENT_NAVBAR}px`
      );
    } else {
      setHeight(`${videoHeight - 48}px`); //48px is the total padding
      setMaxHeight(`${videoHeight - 48}px`);
    }
  }

  useLayoutEffect(() => {
    //executes immediately after change in layout in component, before useEffect
    // console.log("live layout_percent", layout_percent);

    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();

    setPageText(arContent?.languages[currentLanguage]?.story[page]);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, [
    currentLanguage,
    description,
    isDisplayDescription,
    layout_percent,
    moral,
    page,
    pageText,
    title
  ]);

  const handleVoiceRecognition = (mode) => {
    setVoice(mode);
  };

  const handlePageScroll = (e) => {};

  useEffect(() => {
    setPageText(arContent?.languages[currentLanguage]?.story[page]);

    console.log("contentTextHeight", contentTextHeight, description);
  }, [
    currentLanguage,
    description,
    isDisplayDescription,
    isDisplayDiscussion,
    layout_percent,
    moral,
    page,
    pageText,
    status,
    title
  ]);

  return (
    <Box
      className={classes.contentBox}
      sx={{
        height,
        maxHeight
      }}
    >
      {status === "loading" && (
        <Typography variant="body1">Loading text...</Typography>
      )}
      {status === "loaded" &&
        (!currentLanguage || (currentLanguage && isDisplayDescription)) && (
          <>
            <ShowDescription
              description={arContent?.languages[currentLanguage]?.description}
              moral={arContent?.languages[currentLanguage]?.moral}
            />
          </>
        )}
      {status === "loaded" && currentLanguage && !isDisplayDescription && (
        <>
          <Box sx={{ height: "100%" }}>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              {(voiceMode === 0 || voiceMode === 1) && (
                <></>
                // <ReadAloud
                //   title={title}
                //   language={currentLanguage}
                //   page={page}
                //   setContentTextHeight={setContentTextHeight}
                //   pageText={pageText}
                //   contentTextHeight={contentTextHeight}
                //   setVoiceRecognition={handleVoiceRecognition} //"stt" or "tts"
                //   setVoiceMode={setVoiceMode}
                //   voiceMode={voiceMode}
                // />
              )}
              {(voiceMode === 0 || voiceMode === 2) &&
                currentLanguage &&
                !isDisplayDiscussion && (
                  <>
                    <div id="top"></div>
                    <PlayAudiobook
                      contentTextFontSize={contentTextFontSize}
                      contentTextHeight={contentTextHeight}
                      language={currentLanguage ? currentLanguage : "en-us"}
                      page={page}
                      pageText={pageText}
                      setContentTextHeight={setContentTextHeight}
                      setVoiceRecognition={handleVoiceRecognition} //"stt" or "tts"
                      setVoiceMode={setVoiceMode}
                      title={title}
                      voiceMode={voiceMode}
                    />
                  </>
                )}
            </Stack>
            {voiceMode === 0 && !isDisplayDiscussion && (
              <Stack
                className={`${classes.contentText} ${
                  currentLanguage === "ar" ? classes.contentRTL : ""
                }`}
              >
                {pageText?.split("<br/>").map((paragraph, index) => {
                  return (
                    <Typography
                      key={index}
                      gutterBottom
                      variant="body1"
                      sx={{
                        fontSize: `${contentTextFontSize}rem`,
                        pb: contentTextFontSize > 1.3 ? 1 : 0
                      }}
                    >
                      {paragraph}
                    </Typography>
                  );
                })}
                <div id="bottom"></div>
              </Stack>
            )}

            {voiceMode === 0 && isDisplayDiscussion && (
              <Stack
                className={`${classes.contentText} ${
                  currentLanguage === "ar" ? classes.contentRTL : ""
                }`}
              >
                {arContent?.languages[currentLanguage]?.discussion.map(
                  (question, index) => {
                    return (
                      <Typography
                        variant="body1"
                        key={index}
                        sx={{
                          fontSize: `${contentTextFontSize}rem`
                        }}
                      >
                        {!currentLanguage?.includes("ar") && `${index + 1}. `}
                        {`${question}`}
                      </Typography>
                    );
                  }
                )}
                <div id="bottom"></div>
              </Stack>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ContentText;
