import Color from "@/components/styles/color";
import { common } from "@mui/material/colors";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Icon from "@mui/material/Icon";
import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  selected: {
    color: Color.hex.liberty,
    background: common.white
  },
  default: {
    color: common.white,
    background: Color.hex.liberty
  }
}));

const LeftNavigationMenuItem = ({
  icon,
  isSelected,
  color,
  className,
  text,
  to,
  onClick,
  drawerWidth,
  ...props
}) => {
  const classes = styles();

  return (
    <ListItem
      sx={{
        color: isSelected ? Color.hex.liberty : Color.hex.natural,
        backgroundColor: isSelected ? Color.hex.natural : Color.hex.liberty
      }}
      disableGutters
      disablePadding
    >
      <ListItemButton href={to} component="a" onClick={onClick}>
        <ListItemIcon
          sx={{
            fontSize: 28,
            color: isSelected ? Color.hex.liberty : Color.hex.natural,
            backgroundColor: isSelected ? Color.hex.natural : Color.hex.liberty
          }}
        >
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText
          sx={{
            my: 0,
            color: isSelected ? Color.hex.liberty : Color.hex.natural
          }}
          primary={text}
          primaryTypographyProps={{
            fontSize: 16,
            fontWeight: "normal",
            letterSpacing: 0
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default LeftNavigationMenuItem;
