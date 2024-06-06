import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { topics } from "../data/tutorialData";

import ListItemText from "@mui/material/ListItemText";

import { Link } from "react-router-dom";

const Tutorial = () => {
  return (
    
       <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "70%" }}>
      <h1>SQL Tutorial Kapitel</h1>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List component="nav" aria-label="secondary mailbox folder">
          {topics.map((topic) => (
            <Link to={topic.link}>
              <ListItemButton>
                <ListItemText primary={topic.name} />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Box>
    </div>
    </div>
  );
};

export default Tutorial;
