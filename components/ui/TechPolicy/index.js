import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { common, grey } from "@mui/material/colors";
import { FaChrome, FaFirefox, FaSafari } from "react-icons/fa";
import LaptopIcon from "@mui/icons-material/Laptop";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Color from "@/components/styles/color";

const TechPolicy = ({ panelWidth, techPolicy, handleTechPolicyChange }) => {
  return (
    <>
      <Box
        sx={{
          background: "white",
          maxWidth: panelWidth || 360,
          pt: 2,
          pl: 2,
          pr: 2,
          pb: 0,
          border: "1px solid black",
          "&:hover": {
            boxShadow: `rgb(255, 255, 255) 8px -8px 0px -3px, ${Color.hex.brightgrape} 8px -8px, rgb(255, 255, 255) 16px -16px 0px -3px, ${Color.hex.brightlavender} 16px -16px, rgb(255, 255, 255) 24px -24px 0px -3px, ${Color.hex.brightviolet} 24px -24px, rgb(255, 255, 255) 32px -32px 0px -3px, ${Color.hex.fuchsia} 32px -32px;`
            // boxShadow:
            //   `black 0px 0px 0px 1px inset, rgb(255, 255, 255) 8px -8px 0px -3px, rgb(31, 193, 27) 8px -8px, rgb(255, 255, 255) 16px -16px 0px -3px, rgb(255, 217, 19) 16px -16px, rgb(255, 255, 255) 24px -24px 0px -3px, rgb(255, 156, 85) 24px -24px, rgb(255, 255, 255) 32px -32px 0px -3px, rgb(255, 85, 85) 32px -32px;`
          }
        }}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="body2">
          We use an augmented reality technology only available on a desktop
          browser. In order to read the books, you must:
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <PhotoCameraFrontIcon sx={{ color: Color.hex.brightblue }} />
            </ListItemIcon>
            <ListItemText secondary="Turn on your webcam" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LaptopIcon sx={{ color: Color.hex.brightblue }} />
            </ListItemIcon>
            <ListItemText secondary=" Use laptop or desktop. Mobile devices not currently supported." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FaChrome
                style={{
                  fontSize: 18,
                  color: Color.hex.brightblue
                }}
              />
              <FaFirefox
                style={{
                  fontSize: 18,
                  color: Color.hex.brightblue
                }}
              />
            </ListItemIcon>
            <ListItemText secondary="Use Chrome or Firefox. Safari is not currently supported." />
          </ListItem>
        </List>
        <Stack direction="row">
          <Checkbox
            sx={{ "&:hover": { background: "white" } }}
            checked={techPolicy}
            name="technology_policy"
            onChange={handleTechPolicyChange}
          />
          <Typography sx={{ lineHeight: 5 }} variant="body2">
            I agree (required)
          </Typography>
        </Stack>
      </Box>
    </>
  );
};
export default TechPolicy;
