import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppNewLayout from "./frontendComponents/App";
import { CustomThemeProvider } from "./frontendComponents/global/ThemeProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
 
    <CustomThemeProvider>
      <AppNewLayout />
    </CustomThemeProvider>

   
  </React.StrictMode>
);
