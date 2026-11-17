
import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  CircularProgress,
  Typography,
} from "@mui/material";

import DbStructureTablePostgres from "./db_structures/postgres_structure";
import { fetchDbStructure } from "../../api/mainApi";

function DbAccordion({ endpoint }) {
  const [dbTable, setDbTable] = useState(null);
  const [showDbStructure, setShowDbStructure] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStructureData = async () => {
    // Bereits geladene Daten nur ein-/ausblenden
    if (dbTable !== null) {
      setShowDbStructure((prev) => !prev);
      return;
    }

    // Verhindert mehrfache API-Aufrufe
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await fetchDbStructure(endpoint);

      const tableStructure = DbStructureTablePostgres(
        data.tables,
        data.columns
      );

      setDbTable(tableStructure);
      setShowDbStructure(true);
    } catch (err) {
      console.error("Error fetching database structure:", err);
      setError("Die Datenbankstruktur konnte nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{ width: "100%" }}
      aria-label="Datenbankstruktur"
    >
      <Button
        variant="outlined"
        onClick={fetchStructureData}
        disabled={loading}
        aria-expanded={showDbStructure}
        aria-label="Datenbankstruktur anzeigen oder ausblenden"
      >
        {loading ? (
          <>
            <CircularProgress size={16} sx={{ mr: 1 }} />
            Lade Datenbank ...
          </>
        ) : (
          showDbStructure
            ? "Datenbank ausblenden"
            : "Zeige Datenbank"
        )}
      </Button>

      {error && (
        <Typography
          color="error"
          variant="body2"
          sx={{ mt: 1 }}
          role="alert"
        >
          {error}
        </Typography>
      )}

      {showDbStructure && dbTable && (
        <Grid
          container
          spacing={2}
          sx={{ mt: 1, width: "100%" }}
        >
          {dbTable.map((table, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
            >
              {table}
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default DbAccordion;

/* import { Box, Button, Grid } from "@mui/material";
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
 */