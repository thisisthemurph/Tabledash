import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import NavSideBar from "./NavSideBar";

const Header = ({ isDarkMode, toggleTheme }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
