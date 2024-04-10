import React, { useState } from "react";
import { Box, IconButton, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [username, setUsername] = useState(localStorage.getItem("token"));
  return (
    <Box
      sx={{ backgroundColor: `${colors.blueAccent[100]}` }}
      display="flex"
      justifyContent="space-between"
      p={2}
    >
      <Box display="flex">
        <Typography
          variant="h3"
          color={colors.grey[900]}
          sx={{ marginRight: "20px", display: "flex", alignItems: "center" }}
        >
          NoSQLconcepts
        </Typography>
        <Box display="flex" alignItems="center">
          <Link to="/">
            <IconButton
              sx={{
                color: colors.grey[900],
                "&:hover": { backgroundColor: `${colors.blueAccent[200]}` },
              }}
            >
              <HomeOutlinedIcon />
              Dashboard
            </IconButton>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
function TopBar() {
  return <Topbar />;
}

export default TopBar;
