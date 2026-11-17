
import React from "react";
import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

const ImportantMsg = ({ message, type = "info" }) => {
  const colorMap = {
    success: {
      color: "success.main",
      icon: "✓",
      label: "Erfolgreich",
    },
    error: {
      color: "error.main",
      icon: "!",
      label: "Fehler",
    },
    info: {
      color: "info.main",
      icon: "i",
      label: "Information",
    },
    warning: {
      color: "warning.main",
      icon: "!",
      label: "Achtung",
    },
  };

  const config = colorMap[type] || colorMap.info;

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        mx: 2,
        my: 2,
        p: 2,
        borderRadius: 2,
        border: `1px solid ${alpha(
          theme.palette[config.color.split(".")[0]].main,
          0.25
        )}`,
        borderLeft: `4px solid ${theme.palette[config.color.split(".")[0]].main}`,
        backgroundColor: alpha(
          theme.palette[config.color.split(".")[0]].main,
          theme.palette.mode === "dark" ? 0.14 : 0.07
        ),
        transition: "all 0.2s ease",
      })}
    >
      {/* ICON */}
      <Box
        sx={(theme) => ({
          width: 30,
          height: 30,
          minWidth: 30,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: 15,
          color: theme.palette[config.color.split(".")[0]].main,
          backgroundColor: alpha(
            theme.palette[config.color.split(".")[0]].main,
            0.15
          ),
        })}
      >
        {config.icon}
      </Box>

      {/* MESSAGE */}
      <Typography
        variant="body2"
        sx={{
          color: "text.primary",
          fontWeight: 600,
          lineHeight: 1.6,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default ImportantMsg;
