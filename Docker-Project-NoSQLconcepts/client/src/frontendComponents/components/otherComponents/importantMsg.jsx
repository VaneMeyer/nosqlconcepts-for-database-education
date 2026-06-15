import React from "react";
import { Box, Typography } from "@mui/material";

const ImportantMsg = ({ message, type }) => {
  //################# Style Settings ######################################################

  let msgStyle = {};
  if (type === "success") {
    msgStyle = {
      fontSize: "16px",
      margin: "20px",
      fontWeight: "bold",
      padding: "10px",
      borderRadius: "5px",
      backgroundColor: "#bbfccb",
      color: "black"
    };
  }
  if (type === "error") {
    msgStyle = {
      fontSize: "16px",
      margin: "20px",
      fontWeight: "bold",
      padding: "10px",
      borderRadius: "5px",
      backgroundColor: "#fcd1cf",
      color: "black"
    };
  }
  if (type === "info") {
    msgStyle = {
      fontSize: "16px",
      margin: "20px",
      fontWeight: "bold",
      padding: "10px",
      borderRadius: "5px",
      backgroundColor: "#e1edf7",
      color: "black"
    };
  }
  //################# Frontend ######################################################
  return (
    <Box style={msgStyle}>
      <Typography variant="p">{message}</Typography>
    </Box>
  );
};

export default ImportantMsg;
