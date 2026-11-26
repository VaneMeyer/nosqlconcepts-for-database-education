import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// --------------------------------------------------
// COLOR TOKENS
// --------------------------------------------------

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#E2E8F0",
          200: "#CBD5E1",
          300: "#94A3B8",
          400: "#64748B",
          500: "#475569",
          600: "#334155",
          700: "#273449",
          800: "#1E293B",
          900: "#0F172A",
        },

        primary: {
          100: "#DCE6FF",
          200: "#B9CCFF",
          300: "#94AEF5",
          400: "#7795E5",
          500: "#6385DF",
          600: "#4969C8",
          700: "#3854A5",
          800: "#263D7D",
          900: "#182A58",
        },

        greenAccent: {
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },

        redAccent: {
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
        },

        blueAccent: {
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },

        custom01: {
          100: "#1E293B",
          200: "#4969C8",
          300: "#FCD34D",
          400: "#FB923C",
          500: "#F87171",
          600: "#273449",
          700: "#334155",
          800: "#6385DF",
          900: "#94AEF5",
        },
      }
    : {
        grey: {
          100: "#0F172A",
          200: "#1E293B",
          300: "#334155",
          400: "#475569",
          500: "#64748B",
          600: "#94A3B8",
          700: "#CBD5E1",
          800: "#E2E8F0",
          900: "#F8FAFC",
        },

        primary: {
          100: "#4969C8",
          200: "#3854A5",
          300: "#7795E5",
          400: "#94AEF5",
          500: "#6385DF",
          600: "#DCE6FF",
          700: "#E8EEFF",
          800: "#EFF3FF",
          900: "#F8FAFF",
        },

        greenAccent: {
          100: "#064E3B",
          200: "#065F46",
          300: "#047857",
          400: "#059669",
          500: "#10B981",
          600: "#34D399",
          700: "#6EE7B7",
          800: "#A7F3D0",
          900: "#D1FAE5",
        },

        redAccent: {
          100: "#7F1D1D",
          200: "#991B1B",
          300: "#B91C1C",
          400: "#DC2626",
          500: "#EF4444",
          600: "#F87171",
          700: "#FCA5A5",
          800: "#FECACA",
          900: "#FEE2E2",
        },

        blueAccent: {
          100: "#1E3A8A",
          200: "#1E40AF",
          300: "#1D4ED8",
          400: "#2563EB",
          500: "#3B82F6",
          600: "#60A5FA",
          700: "#93C5FD",
          800: "#BFDBFE",
          900: "#DBEAFE",
        },

        custom01: {
          100: "#F8FAFC",
          200: "#4969C8",
          300: "#FCD34D",
          400: "#FB923C",
          500: "#F87171",
          600: "#E8EEFF",
          700: "#F1F5F9",
          800: "#4969C8",
          900: "#6385DF",
        },
      }),
});

// --------------------------------------------------
// MUI THEME SETTINGS
// --------------------------------------------------

export const themeSettings = (mode) => {
  const colors = tokens(mode);
  const isDark = mode === "dark";

  return {
    palette: {
      mode,

      primary: {
        main: isDark ? "#7795E5" : "#4969C8",
        light: isDark ? "#94AEF5" : "#6385DF",
        dark: isDark ? "#4969C8" : "#3854A5",
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
      },

      error: {
        main: "#EF4444",
        light: "#FEE2E2",
        dark: "#B91C1C",
      },

      warning: {
        main: "#F59E0B",
        light: "#FEF3C7",
        dark: "#B45309",
      },

      info: {
        main: "#3B82F6",
        light: "#DBEAFE",
        dark: "#1D4ED8",
      },

      neutral: {
        dark: colors.grey[700],
        main: colors.grey[500],
        light: colors.grey[100],
      },

      custom: {
        appBar: mode === "light" ? "#E8EFF2" : "#263746",
        appBarText: mode === "light" ? "#263746" : "#FFFFFF",
      },

      background: {
        default: isDark ? "#0F172A" : "#184e87", //"#F8FAFC"
        paper: isDark ? "#1E293B" : "#FFFFFF", //"#FFFFFF"
      },

      text: {
        primary: isDark ? "#F1F5F9" : "#1E293B",
        secondary: isDark ? "#94A3B8" : "#64748B",
        disabled: isDark ? "#64748B" : "#94A3B8",
      },

      divider: isDark ? "#334155" : "#E5EAF0",

      action: {
        hover: isDark
          ? "rgba(148, 163, 184, 0.08)"
          : "rgba(73, 105, 200, 0.05)",
        selected: isDark
          ? "rgba(99, 133, 223, 0.16)"
          : "rgba(73, 105, 200, 0.09)",
        disabledBackground: isDark ? "#334155" : "#F1F5F9",
      },
    },

    typography: {
      fontFamily: ["Inter", "Roboto", "Arial", "sans-serif"].join(","),

      fontSize: 13,

      h1: {
        fontSize: "2.5rem",
        fontWeight: 750,
        letterSpacing: "-1px",
      },

      h2: {
        fontSize: "2rem",
        fontWeight: 700,
        letterSpacing: "-0.7px",
      },

      h3: {
        fontSize: "1.75rem",
        fontWeight: 700,
      },

      h4: {
        fontSize: "1.4rem",
        fontWeight: 700,
      },

      h5: {
        fontSize: "1.15rem",
        fontWeight: 650,
      },

      h6: {
        fontSize: "1rem",
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

    shadows: [
      "none",
      "0px 1px 3px rgba(15,23,42,0.04)",
      "0px 2px 6px rgba(15,23,42,0.05)",
      "0px 4px 12px rgba(15,23,42,0.06)",
      "0px 4px 16px rgba(15,23,42,0.07)",
      "0px 6px 20px rgba(15,23,42,0.08)",
      "0px 8px 24px rgba(15,23,42,0.09)",
      ...Array(18).fill("0px 8px 24px rgba(15,23,42,0.09)"),
    ],

    // --------------------------------------------------
    // COMPONENT OVERRIDES
    // --------------------------------------------------

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark ? "#0F172A" : "#F8FAFC",
            transition: "background-color 0.2s ease",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            border: `1px solid ${isDark ? "#334155" : "#E5EAF0"}`,
            backgroundImage: "none",
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
            transition: "all 0.2s ease",
          },

          containedPrimary: {
            "&:hover": {
              backgroundColor: isDark ? "#4969C8" : "#3854A5",
              boxShadow: "0 4px 12px rgba(73,105,200,0.2)",
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
            backgroundColor: isDark ? "#1E293B" : "#FFFFFF",

            "& fieldset": {
              borderColor: isDark ? "#475569" : "#E2E8F0",
            },

            "&:hover fieldset": {
              borderColor: isDark ? "#7795E5" : "#94A3B8",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#4969C8",
            },
          },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: isDark ? "#94A3B8" : "#64748B",
          },
        },
      },

      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${isDark ? "#334155" : "#E5EAF0"}`,
          },

          head: {
            fontWeight: 700,
            color: isDark ? "#E2E8F0" : "#334155",
            backgroundColor: isDark ? "#273449" : "#F1F5F9",
          },
        },
      },

      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: isDark ? "rgba(148,163,184,0.05)" : "#F8FAFC",
            },
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
          },
        },
      },
    },
  };
};

// --------------------------------------------------
// COLOR MODE CONTEXT
// --------------------------------------------------

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [],
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};

/*  import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";


export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#1F2A40",
          500: "#141b2d",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0",
          500: "#141b2d",
          600: "#434957",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
      
        custom01: {
          100: "#101226", // mui buttons
          200: "#045a8d", // time line chart
          300: "#e6c775", // light yellow
          400: "#f38c73", // light orange
          500: "#f16272", // light red
          600: "#cfe0e8", // topbar background
          700: "#d5d7e6", // course summary and bar/pie chart
          800: "#5a79a5", // blue
          900: "#89a7cf", // light blue
        },
        
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
 */
