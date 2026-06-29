import { AppBar, Toolbar, Typography } from "@mui/material";

export const Nav = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Task Manager
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
