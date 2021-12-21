import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import useStyles from "../../hooks/useStyles";
import NavSideBar from "./NavSideBar";

const Header = ({ isDarkMode, toggleTheme }) => {
  const styles = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={styles.header}>
        <Toolbar>
          <NavSideBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tabledash
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button color="secondary" variant="outlined" href="/login">
              Login
            </Button>
            <Button color="secondary" variant="contained" href="/register">
              Register
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
