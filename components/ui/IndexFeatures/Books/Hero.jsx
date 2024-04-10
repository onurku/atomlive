import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "swiper/css";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BookCard from "../components/BookCard";
import Text from "../components/Text";
import { useSharedStyles } from "../styles/styles";

const useStyles = makeStyles({
  subTitle: {
    marginTop: "8px",
    marginBottom: "16px"
  },
  top: {
    marginBottom: "76px",
    "@media (max-width: 768px)": {
      marginBottom: "44px"
    },
    "@media (max-width: 1200px)": {
      textAlign: "center"
    }
  },
  swiperSlide: {
    height: "auto !important"
  },
  swiperContainer: {
    maxWidth: "424px",
    marginLeft: "auto",
    "@media (max-width: 1200px)": {
      marginRight: "auto"
    }
  }
});

const Hero = () => {
  const classes = useStyles();
  const classesShared = useSharedStyles();
  const content = [
    {
      title: "The Elves And The Shoemaker",
      img: "https://uploads-ssl.webflow.com/5fd99a2f6eb4655d66b77a18/616bd20f0c6cdf5c9d49c99e_4.jpg"
    },
    {
      title: "The King Of The Birds",
      img: "https://uploads-ssl.webflow.com/5fd99a2f6eb4655d66b77a18/61dd1f9a08fd1ef2f94b1348_3.jpg"
    }
  ];

  return (
    <div className={classesShared.heroSharedContainer}>
      <div className="overflow-hidden container-full">
        <div className="container-section-lg">
          <div className={classes.top}>
            <Grid container spacing={4} alignItems={"center"}>
              <Grid item lg={6}>
                <Text
                  className={classesShared.textSky500}
                  text="Experience Reading Magic"
                  tag="h3"
                  textCenter={false}
                  animateOn={false}
                />
                <Text
                  className={classes.subTitle}
                  text="Inspire your kids to daily reading, and language learning."
                  tag="h3"
                  textCenter={false}
                  animateOn={false}
                />
                <p
                  className={`${classesShared.text16} ${classesShared.textZinc700}`}
                >
                  No matter what your child's language or reading level, your
                  child's native and target languages are easily accessible.
                  Every book is available in at least 2 languages.
                </p>
              </Grid>
              <Grid item lg={6} xs={12}>
                <div className="relative">
                  <div className={classes.swiperContainer}>
                    <Swiper
                      style={{ overflow: "visible" }}
                      effect={"cards"}
                      grabCursor={true}
                      modules={[EffectCards]}
                    >
                      {content.map((item, index) => (
                        <SwiperSlide
                          className={classes.swiperSlide}
                          key={index}
                        >
                          <BookCard isFree title={item.title} img={item.img} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
