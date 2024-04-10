//######### Testphase DBMS - PostgreSQL session ###########
import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import TableRowsIcon from "@mui/icons-material/TableRows";

import Header from "../../components/Header";

import StatBox from "../../components/StatBox";

import Footer from "../global/footer";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Styles for mui components
  let muiButtonStyle = {
    backgroundColor: colors.blueAccent[100],
    color: colors.grey[900],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
    margin: "10px",
  };

  useEffect(() => {}, []);

  return (
    <Box m="20px" p={7}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle={"Willkommen!"} />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "repeat(12, 1fr)" }}
        gridAutoRows={{ xs: "auto", md: "140px" }}
        gap="20px"
      >
        {/* ROW 1 */}

        <Box
          gridColumn={{ xs: "span 20", md: "span 3" }}
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="SQL Tutorial"
            link="/tutorial"
            logo={""}
            icon={<TableRowsIcon></TableRowsIcon>}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Dashboard;
