//Library Components
import { common, grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import { isMobile } from "mobile-device-detect";
import "@fontsource/lustria";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createStyles, makeStyles } from "@mui/styles";

// App components
import ExternalLayout from "@/components/layouts/ExternalLayout";
import ExternalLayoutMobile from "@/components/layouts/ExternalLayoutMobile";
import MainTitle from "@/components/ui/MainTitle";
import BookCardItem from "@/components/ui/BookCardItem";
import Color from "@/components/styles/color";

const styles = makeStyles((theme) =>
  createStyles({
    root: {
      // backgroundImage: Color.ombre.natural,
      padding: theme.spacing(5)
    },
    subtitle: {
      fontFamily: "Lustria, Times New Roman",
      color: grey[800]
    },

    book: {
      borderLeft: `1px solid ${common.black}`,
      borderBottom: `1px solid ${common.black}`,
      [theme.breakpoints.up("xs")]: {
        borderTop: 0,
        borderRight: `1px solid ${common.black}`,
        "&:first-child": {
          borderTop: 0
        }
      },
      [theme.breakpoints.up("md")]: {
        borderTop: 0,
        "&:nth-child( odd )": {
          borderRight: 0
        },
        "&:nth-child( even )": {
          borderRight: `1px solid ${common.black}`
        },
        "&:nth-child(1)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(2)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:last-child": {
          borderRight: `1px solid ${common.black}`
        }
      },
      [theme.breakpoints.up("lg")]: {
        borderTop: 0,
        "&:nth-child( 3n + 1 )": {
          borderRight: 0
        },
        "&:nth-child( 3n+2)": {
          borderRight: 0
        },
        "&:nth-child( 3n+3)": {
          borderRight: `1px solid ${common.black}`
        },
        "&:nth-child(1)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(2)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(3)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:last-child": {
          borderRight: `1px solid ${common.black}`
        }
      },
      [theme.breakpoints.up("xxl")]: {
        borderTop: 0,
        "&:nth-child( 4n + 1 )": {
          borderRight: 0
        },
        "&:nth-child( 4n+2)": {
          borderRight: 0
        },
        "&:nth-child( 4n+3)": {
          borderRight: 0
        },
        "&:nth-child( 4n+4)": {
          borderRight: `1px solid ${common.black}`
        },
        "&:nth-child(1)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(2)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(3)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:nth-child(4)": {
          borderTop: `1px solid ${common.black}`
        },
        "&:last-child": {
          borderRight: `1px solid ${common.black}`
        }
      }
    }
  })
);

const BookList = () => {
  const classes = styles();

  return (
    <>
      <Grid container className={classes.root} justifyContent="center">
        <Grid item xs={10}>
          <MainTitle text="Let's Live Inside a Book" />
          <Typography
            align="center"
            className={classes.subtitle}
            sx={{ marginLeft: 5, marginRight: 5, marginBottom: 10 }}
            variant="h3"
          >
            Experience Reading Magic: Bilingual Books for Language Learners
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} md={6} lg={4} xxl={3} className={classes.book}>
              <BookCardItem
                about="This is a short and very sweet story about a Christmas gift. In fact it’s one of the very few traditional fairy tales with a Christmas theme. A poor shoemaker receives some unexpected help just when he needs it most. When it is close to Christmas he and his wife decided to give a gift in return."
                coverImageUrl="https://uploads-ssl.webflow.com/5fd99a2f6eb4655d66b77a18/616bd20fafee105c5e9e9fcf_1.jpg"
                title="The Elves and The Shoemaker"
                bookFormatList=""
                languageList=""
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xxl={3} className={classes.book}>
              <BookCardItem
                about="This is a short and very sweet story about a Christmas gift. In fact it’s one of the very few traditional fairy tales with a Christmas theme. A poor shoemaker receives some unexpected help just when he needs it most. When it is close to Christmas he and his wife decided to give a gift in return."
                author="Brother's Grimm"
                coverImageUrl="https://uploads-ssl.webflow.com/5fd99a2f6eb4655d66b77a18/616bd20fafee105c5e9e9fcf_1.jpg"
                title="The Elves and The Shoemaker"
                bookFormatList=""
                languageList=""
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xxl={3} className={classes.book}>
              <BookCardItem
                about="This is a short and very sweet story about a Christmas gift. In fact it’s one of the very few traditional fairy tales with a Christmas theme. A poor shoemaker receives some unexpected help just when he needs it most. When it is close to Christmas he and his wife decided to give a gift in return."
                author="Brother's Grimm"
                coverImageUrl="https://uploads-ssl.webflow.com/5fd99a2f6eb4655d66b77a18/616bd20fafee105c5e9e9fcf_1.jpg"
                title="The Elves and The Shoemaker"
                bookFormatList=""
                languageList=""
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xxl={3} className={classes.book}>
              <BookCardItem
                about="This is a short and very sweet story about a Christmas gift. In fact it’s one of the very few traditional fairy tales with a Christmas theme. A poor shoemaker receives some unexpected help just when he needs it most. When it is close to Christmas he and his wife decided to give a gift in return."
                author="Brother's Grimm"
                coverImageUrl="https://uploads-ssl.webflow.com/5fd99a2f6eb4655d66b77a18/616bd20fafee105c5e9e9fcf_1.jpg"
                title="The Elves and The Shoemaker"
                bookFormatList=""
                languageList=""
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xxl={3} className={classes.book}>
              <BookCardItem
                about="This is a short and very sweet story about a Christmas gift. In fact it’s one of the very few traditional fairy tales with a Christmas theme. A poor shoemaker receives some unexpected help just when he needs it most. When it is close to Christmas he and his wife decided to give a gift in return."
                author="Brother's Grimm"
                coverImageUrl="https://uploads-ssl.webflow.com/5fd99a2f6eb4655d66b77a18/616bd20fafee105c5e9e9fcf_1.jpg"
                title="The Elves and The Shoemaker"
                bookFormatList=""
                languageList=""
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xxl={3} className={classes.book}>
              <BookCardItem
                about="This is a short and very sweet story about a Christmas gift. In fact it’s one of the very few traditional fairy tales with a Christmas theme. A poor shoemaker receives some unexpected help just when he needs it most. When it is close to Christmas he and his wife decided to give a gift in return."
                author="Brother's Grimm"
                coverImageUrl="https://uploads-ssl.webflow.com/5fd99a2f6eb4655d66b77a18/616bd20fafee105c5e9e9fcf_1.jpg"
                title="The Elves and The Shoemaker"
                bookFormatList=""
                languageList=""
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

BookList.layout = ExternalLayout;

const BookListMobile = () => {
  return (
    <>
      <span>stories</span>
    </>
  );
};

BookListMobile.layout = ExternalLayoutMobile;

const BookListPage = isMobile ? BookListMobile : BookList;

export default BookListPage;
