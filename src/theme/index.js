import { CssBaseline } from "@mui/material";
import {
  alpha,
  createTheme,
  ThemeProvider as MUIThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import customizeComponents from "./customizations";
import { createContext, useMemo, useState } from "react";

const PRIMARY = {
  lighter: "#EDE7F6",
  light: "#B39DDB",
  main: "#673AB7",
  dark: "#5E35B1",
  darker: "#4527A0",
  contrastText: "#FFF",
};
const SECONDARY = {
  lighter: "#E3F2FD",
  light: "#90CAF9",
  main: "#2196F3",
  dark: "#1E88E5",
  darker: "#1565C0",
  contrastText: "#FFF",
};
const SUCCESS = {
  light: "#B0D9B1",
  main: "#79AC78",
  dark: "#618264",
  contrastText: "#FFF",
};

const ERROR = {
  light: "#EF9A9A",
  main: "#F44336",
  dark: "#C62828",
  contrastText: "#FFFFFF",
};
const PENDING = {
  lighter: "#DFE3E8",
  light: "#C4CDD5",
  main: "#637381",
  dark: "#454F5B",
  darker: "#212B36",
  contrastText: "#FFFFFF",
};

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

const breakpoints = {
  values: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
  },
};

function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const themeOptions = (mode) =>
    mode === "light"
      ? {
          palette: {
            primary: PRIMARY,
            secondary: SECONDARY,
            success: SUCCESS,
            error: ERROR,
            pending: PENDING,
            text: {
              primary: GREY[800],
              secondary: GREY[600],
              disabled: GREY[500],
            },
            background: { paper: "#fff", default: "#fff", neutral: GREY[200] },
            action: {
              active: GREY[600],
              hover: GREY[500_8],
              selected: GREY[500_16],
              disabled: GREY[500_80],
              disabledBackground: GREY[500_24],
              focus: GREY[500_24],
              hoverOpacity: 0.08,
              disabledOpacity: 0.48,
            },
          },
          breakpoints,
          shape: { borderRadius: 8 },
        }
      : {
          palette: {
            mode: "dark",
            primary: PRIMARY,
            secondary: SECONDARY,
            success: SUCCESS,
            error: ERROR,
            pending: PENDING,
            text: {
              primary: GREY[0],
              secondary: GREY[200],
              disabled: GREY[400],
              header: "white",
            },
            background: {
              default: "rgb(40, 36, 61)",
              paper: "rgb(55, 51, 82)",
            },
          },
          breakpoints,
          shape: { borderRadius: 8 },
        };
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  let theme = useMemo(() => createTheme(themeOptions(mode)), [mode]);
  theme.components = customizeComponents(theme);
  theme = responsiveFontSizes(theme);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
}
export const ColorModeContext = createContext({ toggleColorMode: () => {} });
export default ThemeProvider;
