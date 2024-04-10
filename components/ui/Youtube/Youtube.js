import { useEffect } from "react";

const Youtube = ({ embedId, width, height, poster = "", title, style }) => {
  useEffect(() => {}, []);

  return (
    <>
      {embedId && (
        <div
          style={{
            width,
            height,
            border: "1px solid black",
            background: `url(${poster}) top center no-repeat; background-size: cover;`,
            ...style
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${embedId}`}
            width="100%"
            height="100%"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={title ? title : "youtube video"}
          />
        </div>
      )}
    </>
  );
};

export default Youtube;
