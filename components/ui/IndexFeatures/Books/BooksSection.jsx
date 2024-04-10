import { Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import BookCard from "../components/BookCard";
import { Button } from "../components/Button";
import LangSelect from "../components/LangSelect";
import { useSharedStyles } from "../styles/styles";

const useStyles = makeStyles({
  videoFrame: {
    overflow: "hidden",
    position: "relative",
    paddingBottom: "56.25%",
    height: 0,
    borderRadius: "24px",
    marginBottom: "16px"
  },
  title: {
    fontSize: "16px"
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "56px",
    "@media (max-width: 768px)": {
      marginTop: "32px"
    }
  },
  filterWrap: {
    marginBottom: "32px",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "32px",
    "@media (max-width: 768px)": {
      marginBottom: "20px",
      marginTop: "20px"
    }
  }
});

const BooksSection = () => {
  const classes = useStyles();
  const classesShared = useSharedStyles();
  const content = [
    {
      title: "Old Mother Frost",
      description:
        "A young girl named Maria lives with her stepmother and stepsister. The stepmother is mean to the girl, assigns her to work all day. The young girl's finger bled one day from working on the spindle. She has to go to the well to wash off the blood and fell into the well. And so her fortune of adventure begins.",
      img: "https://uploads-ssl.webflow.com/5fd99a2f6eb4655d66b77a18/61dd24473abe164ed678e3ef_2.jpg"
    },
    {
      title: "The Three Sons Of Fortune",
      description:
        "A dying farmer summons his three sons to his bedside before dying. He doesn't have large property to leave to his sons, but he gives each a meaningful item. He gives his first son a rooster, his second son a scythe, and his third son a cat, and advises them to value each item and make the most fortune out of it. This books illustrates each adventure of each son.",
      img: "https://uploads-ssl.webflow.com/5fd99a2f6eb4655d66b77a18/61de17078ccd32ff2d39b0ad_1.jpg"
    },
    {
      title: "The Hare And The Hedgehog",
      description:
        "An arrogant hare challenges a seemingly slow hedgehog to a race. Confident in his speed, the hare takes a nap during the race, underestimating the hedgehog's abilities. The hedgehog cleverly enlists the help of his family to confuse the hare, leading to the hare's eventual defeat. The story teaches a moral lesson about humility and the triumph of intelligence over arrogance.",
      img: "https://uploads-ssl.webflow.com/5fd99a2f6eb4655d66b77a18/61dd4e0e0bcefe4a74ee70a0_2.jpg"
    },
    {
      title: "The Three Little Men In The Woods",
      description:
        "A stepmother is being cruel to her stepdaughter. She asks her go out to pick strawberries in the middle of winter, in hope that the stepdaughter freezes to death and dies. The stepdaughter finds three men who asks for her help. She helps them, and in return, they give her many blessings.",
      img: "https://uploads-ssl.webflow.com/5fd99a2f6eb4655d66b77a18/61de2c45cff4408c13bf44b9_2.jpg"
    },
    {
      title: "The Fairy's Two Gifts",
      description:
        "A fairy who appears as an old woman knocks on the door of two houses, one house of a rich man and the other of a poor man. The rich man rejected her and the poor man welcomed her with open arms. After her stay, she blessed the poor man with a lot of wealth and luck. On the other hand, the rich man realizes he has missed the opportunity and tries to make it up.",
      img: "https://uploads-ssl.webflow.com/5fd99a2f6eb4655d66b77a18/61dd27ba3699250e42df133b_2.jpg"
    },
    {
      title: "The Wolf And The Seven Goslings",
      description:
        "A mother goose has seven goslings. She has to go out one and she must leave them alone at home. Every time she warns them not to open the door to anybody but her and they always promise to obey her rule.",
      img: "https://uploads-ssl.webflow.com/5fd99a2f6eb4655d66b77a18/61de8b9ea88d8807cadab867_2.jpg"
    }
  ];

  const handleOnSelectLang = (newLang) => {
    console.log(newLang);
  };

  return (
    <div className="container-page">
      <div className="container-full">
        <div className="container-section-lg">
          <LangSelect onSelect={(newLang) => handleOnSelectLang(newLang)} />
          <div className={classes.filterWrap}>
            <Select className="select-button" defaultValue={10}>
              <MenuItem value={10}>Classic Fairy Tales</MenuItem>
              <MenuItem value={20}>Little Stories</MenuItem>
            </Select>
          </div>
          <Grid container spacing={3}>
            {content.map((item, index) => (
              <Grid item lg={4} sm={6} key={index}>
                <BookCard
                  title={item.title}
                  img={item.img}
                  description={item.description}
                />
              </Grid>
            ))}
          </Grid>
          <div className={classes.buttonContainer}>
            <Button variant="outline" sx={{ width: "176px" }}>
              <div className={classes.buttonContent}>
                <div className={classes.title}>Show more</div>
                <img
                  width={24}
                  height={24}
                  src="/static/new-home/icon/chevron-down.svg"
                />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksSection;
