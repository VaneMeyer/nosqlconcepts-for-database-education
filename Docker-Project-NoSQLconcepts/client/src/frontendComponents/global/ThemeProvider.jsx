
import {
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
} from "react";

import {
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";

import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ColorModeContext = createContext();

// --------------------------------------------------
// CUSTOM THEME PROVIDER
// --------------------------------------------------

export function CustomThemeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  // --------------------------------------------------
  // DARK MODE CSS CLASS
  // --------------------------------------------------

  useEffect(() => {
    const root = document.documentElement;

    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode]);

  // --------------------------------------------------
  // THEME CONFIGURATION
  // --------------------------------------------------

  const theme = useMemo(() => {
    const isDark = mode === "dark";

    const primary = isDark ? "#7795E5" : "#4969C8";
    const primaryLight = isDark ? "#94AEF5" : "#6385DF";
    const primaryDark = isDark ? "#4969C8" : "#3854A5";

    const background = isDark ? "#0F172A" : "#F8FAFC";
    const paper = isDark ? "#1E293B" : "#FFFFFF";

    const textPrimary = isDark ? "#F1F5F9" : "#1E293B";
    const textSecondary = isDark ? "#94A3B8" : "#64748B";

    const divider = isDark ? "#334155" : "#E5EAF0";

    return createTheme({
      palette: {
        mode,

        primary: {
          main: primary,
          light: primaryLight,
          dark: primaryDark,
          contrastText: "#FFFFFF",
        },

        secondary: {
          main: "#10B981",
          light: "#34D399",
          dark: "#059669",
          contrastText: "#FFFFFF",
        },

        success: {
          main: "#10B981",
          light: "#D1FAE5",
          dark: "#047857",
          contrastText: "#FFFFFF",
        },

        error: {
          main: "#EF4444",
          light: "#FEE2E2",
          dark: "#B91C1C",
          contrastText: "#FFFFFF",
        },

        warning: {
          main: "#F59E0B",
          light: "#FEF3C7",
          dark: "#B45309",
          contrastText: "#FFFFFF",
        },

        info: {
          main: "#3B82F6",
          light: "#DBEAFE",
          dark: "#1D4ED8",
          contrastText: "#FFFFFF",
        },

        background: {
          default: background,
          paper: paper,
        },

        text: {
          primary: textPrimary,
          secondary: textSecondary,
          disabled: isDark ? "#64748B" : "#94A3B8",
        },

        divider,

        action: {
          hover: isDark
            ? "rgba(148,163,184,0.08)"
            : "rgba(73,105,200,0.05)",

          selected: isDark
            ? "rgba(99,133,223,0.16)"
            : "rgba(73,105,200,0.09)",

          disabledBackground: isDark
            ? "#334155"
            : "#F1F5F9",
        },
      },

      // --------------------------------------------------
      // TYPOGRAPHY
      // --------------------------------------------------

      typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

        h1: {
          fontWeight: 750,
          letterSpacing: "-1px",
        },

        h2: {
          fontWeight: 700,
          letterSpacing: "-0.7px",
        },

        h3: {
          fontWeight: 700,
        },

        h4: {
          fontWeight: 700,
        },

        h5: {
          fontWeight: 650,
        },

        h6: {
          fontWeight: 650,
        },

        body1: {
          fontSize: "0.95rem",
          lineHeight: 1.6,
        },

        body2: {
          fontSize: "0.85rem",
          lineHeight: 1.6,
        },

        button: {
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.875rem",
        },
      },

      shape: {
        borderRadius: 10,
      },

      // --------------------------------------------------
      // COMPONENT OVERRIDES
      // --------------------------------------------------

      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: background,
              color: textPrimary,
              transition: "background-color 0.2s ease, color 0.2s ease",
            },
          },
        },

        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 12,
              border: `1px solid ${divider}`,
              backgroundImage: "none",
              backgroundColor: paper,
              boxShadow: isDark
                ? "0 4px 16px rgba(0,0,0,0.15)"
                : "0 4px 16px rgba(15,23,42,0.05)",
              transition: "all 0.25s ease",
            },
          },
        },

        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: "none",
            },
          },
        },

        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              padding: "8px 18px",
              boxShadow: "none",
              textTransform: "none",
              transition: "all 0.2s ease",
            },

            containedPrimary: {
              "&:hover": {
                backgroundColor: primaryDark,
                boxShadow: `0 4px 12px ${alpha(primary, 0.2)}`,
              },
            },

            outlined: {
              borderColor: isDark ? "#475569" : "#CBD5E1",
            },
          },
        },

        MuiIconButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              transition: "all 0.2s ease",
            },
          },
        },

        MuiTextField: {
          defaultProps: {
            size: "small",
          },
        },

        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              backgroundColor: paper,

              "& fieldset": {
                borderColor: divider,
              },

              "&:hover fieldset": {
                borderColor: primaryLight,
              },

              "&.Mui-focused fieldset": {
                borderColor: primary,
              },
            },
          },
        },

        MuiTableCell: {
          styleOverrides: {
            root: {
              borderBottom: `1px solid ${divider}`,
            },

            head: {
              fontWeight: 700,
              color: textPrimary,
              backgroundColor: isDark ? "#273449" : "#F1F5F9",
            },
          },
        },

        MuiTooltip: {
          styleOverrides: {
            tooltip: {
              backgroundColor: isDark ? "#F1F5F9" : "#1E293B",
              color: isDark ? "#1E293B" : "#FFFFFF",
              fontSize: "0.75rem",
              borderRadius: 6,
              padding: "6px 10px",
            },
          },
        },

        MuiLinearProgress: {
          styleOverrides: {
            root: {
              height: 7,
              borderRadius: 10,
              backgroundColor: isDark ? "#334155" : "#E8EDF5",
            },

            bar: {
              borderRadius: 10,
              background: "linear-gradient(90deg, #6385DF, #4969C8)",
            },
          },
        },

        MuiChip: {
          styleOverrides: {
            root: {
              borderRadius: 7,
              fontWeight: 600,
            },
          },
        },

        MuiDialog: {
          styleOverrides: {
            paper: {
              borderRadius: 14,
              backgroundImage: "none",
              backgroundColor: paper,
            },
          },
        },
      },
    });
  }, [mode]);

  // --------------------------------------------------
  // PROVIDER
  // --------------------------------------------------

  return (
    <ColorModeContext.Provider
      value={{ mode, toggleColorMode }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

// --------------------------------------------------
// COLOR MODE HOOK
// --------------------------------------------------

export const useColorMode = () => useContext(ColorModeContext);
