import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import Youtube from "../../Youtube";
import Text from "../components/Text";
import { useSharedStyles } from "../styles/styles";

const useStyles = makeStyles({
  top: {
    marginBottom: "56px",
    "@media (max-width: 768px)": {
      marginBottom: "44px"
    },
    "@media (max-width: 1200px)": {
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  videoFrame: {
    overflow: "hidden",
    position: "relative",
    paddingBottom: "56.25%",
    height: 0,
    borderRadius: "24px",
    marginBottom: "16px"
  },
  box: {
    padding: "24px",
    border: "1px solid #F4F4F5",
    borderRadius: "24px",
    transition: "all 0.15s ease",
    backgroundColor: "#ffffff",
    display: "block",
    height: "100%",
    cursor: "pointer",
    boxShadow:
      "0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)",
    "&:hover": {
      borderColor: "#0EA5E9",
      boxShadow:
        "0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.10)"
    },
    "@media (max-width: 768px)": {
      padding: "16px"
    }
  }
});

const MeetOurTeacher = () => {
  const classes = useStyles();
  const classesShared = useSharedStyles();
  const content = [
    {
      title: "Meet Maria, from Dominican Republic!",
      description:
        "Meet Maria, a multilingual dental student from the Dominican Republic with a passion for teaching. Having been immersed in an English-teaching environment from an early age, Maria brings a unique, hands-on approach to her instruction, drawing on her experiences assisting her mother at her English institute. ",
      videoId: "Ew7-b07APDY"
    },
    {
      title: "Meet Cindy, from Nicaragua!",
      description:
        "Meet Cindy, a seasoned English teacher hailing from Nicaragua with seven years of experience working with children. Cindy brings her personal passions into her work; she is a big fan of music, particularly K-pop, and is a proud member of the BTS Army.",
      videoId: "z3Mf0iv2Y_M"
    },
    {
      title: "Meet Miriam, from Spain!",
      description: (
        <>
          Meet Miriam, teacher from Spain who has been devotedly teaching
          English to children between ages 3-17 for over a year. <br /> <br />
          With a wealth of experience working with various age groups, she is
          skilled at observing children's reactions, gauging their individual
          needs, and fostering a learning environment where children can grow at
          their own pace, gaining confidence while having fun.
        </>
      ),
      videoId: "_mduni8QqOM"
    },
    {
      title: "Meet Cindy, from Venezuela!",
      description:
        "Meet Cindy, a seasoned language teacher originally from Venezuela and currently residing in Colombia. With a decade of experience in teaching children, Cindy brings a playful and immersive approach to learning. She strives to make learning fun through games, songs, and activities that help children understand story contexts and learn new vocabulary in Spanish.",
      videoId: "NMFzZaa-Wds"
    },
    {
      title: "Meet Daniel, from Mexico!",
      description:
        "Meet Daniel, a teacher from Tijuana, Mexico, with a passion for playing guitar, video games, puzzles, and walking his dogs. He finds joy in using the Atom platform for teaching, which enables him to narrate creative stories in an engaging manner. He is thrilled to be part of your learning journey and can't wait to share his innovative teaching style with you.",
      videoId: "CaogZj5jXv4"
    },
    {
      title: "Meet Eiling, from Venezuela",
      description:
        "Meet Eiling, an teacher from Venezuela who has been working with children aged 3-10 years since she received her bachelor's degree in 2010. Eiling brings a joyful energy to her classes; she loves traveling, dancing, singing, and baking and strives to share this zest for life with her students.",
      videoId: "Fj6rQ3jKz5Y"
    }
  ];

  return (
    <div className="container-page">
      <div className="container-full">
        <div className="container-section-lg">
          <div className={classes.top}>
            <Text text="Meet Our Teacher" tag="h2" animateOn={false} />
          </div>
          <Grid container spacing={3}>
            {content.map((item, index) => (
              <Grid item lg={4} sm={6} key={item}>
                <Link href="/">
                  <div className={classes.box}>
                    <div key={index} className={classes.videoFrame}>
                      <Youtube
                        poster={`/static/new-home/thumbnail/${item.videoId}.jpg`}
                        height="100%"
                        embedId={item.videoId}
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
                    <div className={classesShared.mb4}>
                      <Text
                        text={item.title}
                        tag="h4"
                        textCenter={false}
                        animateOn={false}
                      />
                    </div>
                    <p
                      className={`${classesShared.text16} ${classesShared.textZinc700}`}
                    >
                      {item.description}
                    </p>
                  </div>
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default MeetOurTeacher;
