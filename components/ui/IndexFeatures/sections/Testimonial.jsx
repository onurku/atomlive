import { makeStyles } from "@mui/styles";
import Image from "next/legacy/image";
import Link from "next/link";
import "swiper/css";
import { EffectCards, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../components/Button";
import Text from "../components/Text";

import Color from "@/components/styles/color";
import { common } from "@mui/material/colors";

const useStyles = makeStyles({
  heroSection: {
    backgroundImage: "url('/static/new-home/story-time-wave-up.svg')",
    backgroundSize: "auto",
    backgroundPosition: "top center",
    backgroundRepeat: "repeat-x",
    paddingTop: "96px",
    paddingBottom: "96px",
    backgroundColor: "#0EA5E9",
    backgroundSize: "100%",
    "@media (min-width: 768px)": {
      backgroundSize: "auto",
      paddingTop: "200px",
      paddingBottom: "176px"
    }
  },
  textCenter: {
    textAlign: "center",
    marginBottom: "56px"
  },
  swiperButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    width: "64px",
    height: "64px",
    zIndex: 10,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
    "@media (max-width: 768px)": {
      width: "40px",
      height: "40px"
    },
    "&.swiper-button-prev": {
      left: "-32px",
      "@media (max-width: 768px)": {
        left: "0"
      }
    },
    "&.swiper-button-next": {
      right: "-32px",
      "@media (max-width: 768px)": {
        right: "0"
      }
    }
  },
  swiperContainer: {
    maxWidth: "700px",
    paddingLeft: "24px",
    paddingRight: "24px",
    margin: "auto"
  },
  swiperSlide: {
    height: "auto !important"
  },
  swiperSlideInner: {
    padding: "16px",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: "24px",
    height: "100% !important",
    "@media (min-width: 768px)": {
      padding: "40px"
    },
    "& p": {
      fontSize: "16px",
      marginBottom: "12px",
      "@media (min-width: 600px)": {
        fontSize: "20px"
      }
    },
    "& .author": {
      fontSize: "16px",
      fontWeight: "600",
      color: "#71717A" // text-zinc-500
    }
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    marginTop: "56px"
  },
  minButtonWidth: {
    minWidth: "272px",
    marginTop: "24px"
  },
  outlineLavender: {
    color: Color.hex.brightlavender,
    textShadow: `-1px -1px 0 ${common.black}, 1px -1px 0 ${common.black}, -1px 1px 0 ${common.black}, 1px 1px 0 ${common.black}`
  }
});

const Testimonial = () => {
  const classes = useStyles();
  const content = [
    {
      author: "Selman, Seattle, WA - USA",
      content:
        "As a parent, I’m always looking for engaging ways to encourage my son’s love for reading. Discovering atom.live was a game changer for us. It’s a wonderful platform where books come to life, with characters visualized right on screen. My son was thrilled to see himself as part of the story, which made our reading time even more special. He’s more excited than ever about story time, and I’ve noticed a remarkable increase in his imagination and interest in books. It’s heartwarming to see him so involved and animated, literally feeling like a character in every tale we read. This innovative approach to storytelling has truly enriched our reading experience."
    },
    {
      author: "Merve, mom of 2 kids",
      content:
        "Maria, our story time reader, brought so much cheerfulness and kindness to the children. After the story time, my kids were bursting with excitement, sharing all the new Spanish words they'd learned. They can't wait for the next story time, and I'm thrilled too—I just booked our second class!"
    },
    {
      author: "⁠AJ, Sunnyvale, CA",
      content:
        "Being a bilingual parent, I'm always on the lookout for engaging ways to connect with my daughter. That's why I gave Atom.live a try, and I must say, it was an absolute blast! The interactivity and fun we had while reading together were beyond anything I expected. I genuinely enjoyed the experience, and here's the best part – my daughter loved it too! If you're like me, looking to make bilingual book time not just educational but also incredibly fun, I highly recommend giving Atom.live a go. It's a game-changer!"
    },
    {
      author: "Justin and Erika, Menlo Park, CA",
      content:
        "My daughter loves these books! We've been having so much fun with them! Thank you for enriching our lives!"
    }
  ];

  return (
    <div className={classes.heroSection}>
      <div className="overflow-hidden">
        <div className="container-section">
          <div className={classes.textCenter}>
            <Text
              className={classes.outlineLavender}
              text="What parents are saying!"
              wandSrc="/static/new-home/magic-wand.svg"
              tag="h2"
              animateOn={true}
            />
          </div>
          <div className="relative">
            <button className={`${classes.swiperButton} swiper-button-prev`}>
              <Image
                width={24}
                height={24}
                src="/static/new-home/icon/arrow-left.svg"
                alt="Previous"
              />
            </button>
            <button className={`${classes.swiperButton} swiper-button-next`}>
              <Image
                width={24}
                height={24}
                src="/static/new-home/icon/arrow-right.svg"
                alt="Next"
              />
            </button>
            <div className={classes.swiperContainer}>
              <Swiper
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev"
                }}
                style={{ overflow: "visible" }}
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards, Navigation]}
                onOpen={(e) => e.preventDefault()}
              >
                {content.map((item, index) => (
                  <SwiperSlide
                    className={classes.swiperSlide}
                    key={index}
                    onOpen={(e) => e.preventDefault()}
                  >
                    <div className={classes.swiperSlideInner}>
                      <p>{`“${item.content}”`}</p>
                      <p className="author">{item.author}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className={classes.flexCenter}>
            <Button className={classes.minButtonWidth} isRounded size="lg">
              <Link href="/books">
                <a>Browse The Books</a>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
