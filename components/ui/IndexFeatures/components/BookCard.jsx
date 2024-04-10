import { makeStyles } from "@mui/styles";
import { useSharedStyles } from "../styles/styles";
import { Button } from "./Button";
import Text from "./Text";

const useStyles = makeStyles({
  title: {
    fontSize: "16px"
  },
  cardFrame: {
    width: "100%",
    overflow: "hidden",
    position: "relative",
    aspectRatio: "510/285",
    borderRadius: "16px",
    marginBottom: "16px"
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  box: {
    position: "relative",
    padding: "24px",
    border: "1px solid #F4F4F5",
    borderRadius: "24px",
    transition: "all 0.15s ease",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxShadow:
      "0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)",
    "@media (max-width: 768px)": {
      padding: "16px"
    }
  },
  boxInner: {
    flex: 1
  },
  freeTag: {
    position: "absolute",
    top: "0",
    right: "36px",
    zIndex: "1"
  }
});

const BookCard = ({ isFree = false, img, title, description }) => {
  const classes = useStyles();
  const classesShared = useSharedStyles();

  return (
    <div className={classes.box}>
      {isFree && (
        <img
          className={classes.freeTag}
          src="/static/new-home/free-tag.svg"
          width={48}
          height={44}
          alt=""
        />
      )}
      <div className={classes.boxInner}>
        <div className={classes.cardFrame}>
          <img
            style={{ objectFit: "cover", width: "100%" }}
            src={img}
            alt={title}
          />
        </div>
        <div>
          <Text text={title} tag="h4" animateOn={false} />
        </div>
        {description && (
          <p
            className={`${classesShared.text16} ${classesShared.textZinc700} ${classesShared.mt4}`}
          >
            {description}
          </p>
        )}
      </div>
      <div className={`${classesShared.mt6}`}>
        <Button isRounded style={{ width: "100%" }}>
          <div className={classes.buttonContent}>
            {/* {!isFree && (
              <img
                width={24}
                height={24}
                src="/static/new-home/icon/lock.svg"
              />
            )} */}
            <div className={classes.title}>
              {isFree ? "Free Reading" : "View Details"}
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};

BookCard.displayName = "BookCard";

export default BookCard;
