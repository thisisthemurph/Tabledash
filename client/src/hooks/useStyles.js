import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#ff867c",
      main: "#ef5350",
      dark: "#b61827",
      contrastText: "black",
    },
    secondary: {
      light: "#718792",
      main: "#455a64",
      dark: "#1c313a",
      contrastText: "white",
    },
    background: {
      paper: "white",
      paperAlt: "rgb(222, 228, 231)",
    },
  },
  header: {
    background: "crimson",
    color: "white",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(8, 44, 75)",
      dark: "#999",
      contrastText: "white",
    },
    secondary: {
      light: "#718792",
      main: "#718792",
      dark: "#1c313a",
      contrastText: "white",
    },
    background: {
      paper: "rgb(5, 30, 52)",
      paperAlt: "rgb(8, 44, 75)",
    },
  },
  header: {
    background: "black",
    color: "white",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#aaa",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#aaa",
            },
            "&:hover fieldset": {
              borderColor: "#ccc",
            },
            "&.Mui-focused fieldset": {
              borderWidth: "0.15rem",
              borderColor: "#ccc",
            },
          },
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
  },
  container: {
    padding: "1rem",
  },
  header: {
    background: theme.header.background,
    color: theme.header.color,
  },
  menuSection: {
    background: theme.palette.background.paperAlt,
  },
}));

export default useStyles;
