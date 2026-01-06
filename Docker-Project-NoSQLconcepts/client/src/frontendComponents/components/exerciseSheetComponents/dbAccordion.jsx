import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import DbStructureTablePostgres from "./db_structures/postgres_structure";
import { fetchDbStructure } from "../../api/mainApi";


function DbAccordion({ endpoint }) {
 
  const [dbTable, setDbTable] = useState(null);
  

  const [showDbStructure, setShowDbStructure] = useState(false);

  const fetchStructureData = async () => {
    try {
      let response = await fetchDbStructure(endpoint);
      response = response.data;
      
      let newDbTable = DbStructureTablePostgres(
            response["tables"],
            response["columns"]
          );
  
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
        Zeige Datenbank 
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
