import { useState, useEffect, useCallback } from "react";

const localCache = {};

async function requestArContent(title) {
  try {
    const res = await fetch(`/api/content/${title}`);
    const json = (await res.json()) || {}; //{} so app doesn't crash if no network connection
    if (json?.data?.metadata) {
      localCache[title] = JSON.parse(json.data.metadata);
      localCache[`series_${title}`] = json.data;

      localStorage.setItem(title, json.data.metadata);
    }
    return localCache[title];
  } catch (error) {
    // ignore
    console.error("error request content", error);
    return;
  }
}

export function useContent({ title, language, page }) {
  const [arContent, setArContent] = useState();
  const [status, setStatus] = useState("unloaded"); //unloaded, loading, loaded
  const [currentPageText, setCurrentPageText] = useState("");
  const [description, setDescription] = useState("");
  const [moral, setMoral] = useState("");
  const [languageList, setLanguageList] = useState([]);
  const [currentPageGestures, setCurrentPageGestures] = useState();

  console.log("language", language);

  useEffect(() => {
    (async () => {
      if (!title) {
        setArContent({});
        setStatus("loaded");
      } else if (localCache[title]) {
        setArContent(localCache[title]);
        setStatus("loaded");
      } else {
        setStatus("loading");
        await requestArContent(title);
        setArContent(localCache[title]);
        setStatus("loaded");
      }

      setMoral(localCache[title]?.languages[language]?.moral);
      setDescription(localCache[title]?.languages[language]?.description);
      setCurrentPageGestures(localCache[title]?.effectDetails[page]?.actions);
      setCurrentPageText(localCache[title]?.languages[language]?.story[page]);
      if (localCache[title]?.languages) {
        setLanguageList(Object.keys(localCache[title]?.languages));
      }
    })();
  }, [arContent, setCurrentPageGestures, title]);

  const setGesturesLegend = useCallback(
    (page) => {
      setCurrentPageGestures(localCache[title]?.effectDetails[page]?.actions);
    },
    [setCurrentPageGestures]
  );

  return {
    arContent,
    currentPageText,
    currentPageGestures,
    description,
    moral,
    setCurrentPageGestures,
    setGesturesLegend,
    languageList,
    status,
    language
  };
}

export function useGetLanguageList(title) {
  const [languageList, setLanguageList] = useState(["en"]);
  const [status, setStatus] = useState("unloaded"); //unloaded, loading, loaded

  useEffect(() => {
    (async () => {
      if (!title) {
        setLanguageList(["en"]);
      } else if (localCache[title]) {
        if (localCache[title]?.languages) {
          setLanguageList(Object.keys(localCache[title]?.languages));
        }

        setStatus("loaded");
      } else {
        setStatus("loading");
        await requestArContent(title);
        setLanguageList(Object.keys(localCache[title].languages));
        setStatus("loaded");
      }
    })();
  }, [title]);

  return { languageList, status };
}

export function useGetArEffects(title) {
  const [arEffects, setArEffects] = useState({});
  const [status, setStatus] = useState("unloaded"); //unloaded, loading, loaded
  const [prettyTitle, setPrettyTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publisher, setPublisher] = useState("Atom");
  const [videoWidth, setVideoWidth] = useState(1280);
  const [videoHeight, setVideoHeight] = useState(720);

  useEffect(() => {
    (async () => {
      if (!title) {
        setArEffects({});
        setStatus("loaded");
      } else if (localCache[title]) {
        setStatus("loaded");
      } else {
        setStatus("loading");
        await requestArContent(title);
        setStatus("loaded");
      }

      if (localCache) {
        const effectsList = {};

        const effectDetails = localCache[title]?.effectDetails;
        if (effectDetails) {
          for (const key in effectDetails) {
            effectsList[key] = effectDetails[key].file;
          }
        }
        setArEffects(effectsList);
        setPrettyTitle(localCache[title]?.languages["en"].title);
        setDescription(localCache[title]?.languages["en"].description);
        setPublisher(localCache[title]?.publisher);
        setVideoWidth(localCache[title]?.size.desktop.default.width);
        setVideoHeight(localCache[title]?.size.desktop.default.height);
      }
    })();
  }, [title]);

  return {
    description,
    arEffects,
    prettyTitle,
    status,
    publisher,
    videoWidth,
    videoHeight
  };
}
