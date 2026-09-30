import { createTheme } from "@mui/material/styles";

// Central place for brand colors/typography once there's an actual brand
// direction — for now just a sane, unbranded MUI default.
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1a1a1a",
    },
  },
  shape: {
    borderRadius: 8,
  },
});
