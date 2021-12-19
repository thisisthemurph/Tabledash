import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: blue[800] },
    secondary: { main: blue[300] },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "rgb(102, 157, 246)" },
    background: { paper: "rgb(5, 30, 52)" },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
  },
  header: {
    background: theme.palette.secondary.main,
  },
}));

export default useStyles;
