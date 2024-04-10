import { makeStyles } from "@mui/styles";
import Link from "next/link";

const useStyles = makeStyles({
  footer: {
    backgroundColor: "#082F49",
    paddingTop: "10px",
    "@media (min-width: 600px)": {
      paddingTop: "82px"
    }
  },
  containerSection: {
    paddingBottom: "56px"
  },
  maxContainer: {
    maxWidth: "817px",
    paddingLeft: "16px",
    paddingRight: "16px",
    margin: "auto"
  },
  gridContainer: {
    display: "grid",
    gap: "24px",
    gridTemplateColumns: "repeat(1, 1fr)",
    "@media (min-width: 600px)": {
      gridTemplateColumns: "repeat(3, 1fr)"
    }
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#FACC15",
    marginBottom: "24px",
    fontFamily: "Petrona, serif"
  },
  list: {
    marginTop: "16px",
    listStyleType: "none",
    "& li": {
      marginBottom: "8px"
    },
    "& a": {
      fontSize: "16px",
      fontWeight: "500",
      color: "#ffffff",
      textDecoration: "none",
      cursor: "pointer",
      "&:hover": {
        color: "#facc15"
      }
    }
  },
  borderDiv: {
    borderTop: "1px solid #0C4A6E"
  },
  bottomText: {
    padding: "16px 0",
    fontSize: "14px",
    fontWeight: "500",
    textAlign: "center",
    color: "#ffffff"
  }
});

const Footer = () => {
  const classes = useStyles();
  const content = [
    {
      title: "Languages",
      links: [
        {
          title: "English",
          link: "/books"
        },
        {
          title: "Spanish",
          link: "/books"
        },
        {
          title: "French",
          link: "/books"
        },
        {
          title: "German",
          link: "/books"
        },
        {
          title: "Italian",
          link: "/books"
        },
        {
          title: "Portuguese",
          link: "/books"
        }
      ]
    },
    {
      title: "Partners",
      links: [
        {
          title: "Classic Fairy Tales",
          link: "/publishers/atom"
        },
        // {
        //   title: "Cangrejo",
        //   link: "/publishers/cangrejo"
        // },
        {
          title: "Diveo Media",
          link: "/publishers/diveo-media"
        }
        // {
        //   title: "Esther Leung Kong",
        //   link: "/publishers/esther-leung-kong"
        // },
        // {
        //   title: "Sokheap Heng",
        //   link: "/publishers/sokheap-heng"
        // }
      ]
    },
    {
      title: "Social",
      links: [
        {
          title: "Linkedin",
          newTab: true,
          link: "https://www.linkedin.com/company/atomdotlive"
        },
        {
          title: "Youtube",
          newTab: true,
          link: "https://www.youtube.com/@atomdotlive"
        },
        {
          title: "Whatsapp",
          newTab: true,
          link: "https://wa.me/17203529271"
        }
      ]
    }
  ];

  return (
    <footer className={classes.footer}>
      <div className={classes.containerSection}>
        <div className={classes.maxContainer}>
          <div className={classes.gridContainer}>
            {content.map((item, index) => (
              <div key={index}>
                <h3 className={classes.title}>{item.title}</h3>
                <ul className={classes.list}>
                  {item.links.map((link, index) => (
                    <li key={index}>
                      <Link href={link.link} passHref>
                        <a target={link.newTab ? "_blank" : "_self"}>
                          {link.title}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={classes.borderDiv}>
        <p className={classes.bottomText}>
          At Atom, we turn bored kids into bilingual kids, by teaching them to
          read, all through stories.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
