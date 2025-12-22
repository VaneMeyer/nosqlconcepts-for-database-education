import { Box, Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import DbStructureTable from "./DbStructureTable";
import DbStructureTablePostgres from "./db_structures/postgres_structure";
import { fetchDbStructure } from "../../api/mainApi";


function DbAccordion({ endpoint }) {
 
  const [dbTable, setDbTable] = useState(null);
  const [dbendpoint, setDbEndpoint] = useState(null);

  const [showDbStructure, setShowDbStructure] = useState(false);
  useEffect(() => {
    
    if (endpoint === "PostgreSQL") {
      setDbEndpoint("/getPostgreSQLStructure");
      
    }
    
  }, []);
  const fetchStructureData = async () => {
    try {
      let response = await fetchDbStructure(dbendpoint);
      response = response.data;
      
      let newDbTable;
      switch (endpoint) {
        case "PostgreSQL":
          newDbTable = DbStructureTablePostgres(
            response["tables"],
            response["columns"]
          );
          break;
       
        default:
          newDbTable = DbStructureTable(
            response["tables"],
            response["columns"]
          );
          break;
      }
      setDbTable(newDbTable);
      setShowDbStructure((prevShowDbStructure) => !prevShowDbStructure);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <Box aria-labelledby="Inspect database structure">
      <Button
        aria-label="Open database structure accordion elements"
        onClick={fetchStructureData}
      >
        Inspect and Update Database Structure
      </Button>
      {showDbStructure && (
        <Grid container spacing={2}>
          {dbTable.map((table, index) => (
            <div key={index}>{table}</div>
          ))}
       
        </Grid>
      )}{" "}
    </Box>
  );
}

export default DbAccordion;
