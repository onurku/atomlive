import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Youtube from "../../Youtube";
import Text from "../components/Text";
import { useSharedStyles } from "../styles/styles";

const useStyles = makeStyles({
  heroSharedContainer: {},
  subTitle: {
    marginTop: "8px",
    marginBottom: "16px"
  },
  top: {
    marginBottom: "76px",
    "@media (max-width: 768px)": {
      marginBottom: "44px"
    }
  },
  iframeContainer: {
    maxWidth: "819px",
    width: "100%",
    margin: "auto",
    position: "relative",
    paddingBottom: "56.25%", // for aspect ratio 16:9
    height: 0,
    overflow: "hidden",
    borderRadius: "24px",
    border: "8px solid #87CEEB"
  },
  calendlyIframe: {
    width: "100%",
    height: "440px",
    border: "none",
    borderRadius: "24px",
    "@media (min-width: 768px)": {
      height: "800px"
    }
  }
});

const Hero = () => {
  const classes = useStyles();
  const classesShared = useSharedStyles();

  return (
    <div className={classes.heroSharedContainer}>
      <div className="container-full">
        <div className="container-section-lg">
          <div className={classes.top}>
            <Grid container spacing={4} alignItems={"center"}>
              <Grid item lg={6}>
                <Text
                  className={classesShared.textSky500}
                  text="Story times"
                  tag="h1"
                  textCenter={false}
                  animateOn={false}
                />
                <Text
                  className={classes.subTitle}
                  text="It's reading time: Get to know the teachers!"
                  tag="h3"
                  textCenter={false}
                  animateOn={false}
                />
                <p
                  className={`${classesShared.text16} ${classesShared.textZinc700}`}
                >
                  Give yourself some free time and allow your child to embark on
                  a wild reading adventure! There's no better way for your child
                  to build language than reading face-to-face with a teacher.
                  Better yet, these classes are bilingual and are taught in
                  Spanish and English.
                </p>
              </Grid>
              <Grid item lg={6} xs={12}>
                <div className={classes.iframeContainer}>
                  <Youtube
                    poster="/static/new-home/thumbnail/f3kJ0CNdIa0.jpg"
                    height="100%"
                    embedId="f3kJ0CNdIa0"
                    title="Atom's video"
                    style={{
                      border: 0,
                      border: "none",
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      top: 0,
                      left: 0
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="container-section-lg">
          <iframe
            className={classes.calendlyIframe}
            src="https://calendly.com/atomlive"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Hero;
