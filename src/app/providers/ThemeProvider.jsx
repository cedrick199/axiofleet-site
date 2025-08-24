// src/app/providers/ThemeProvider.jsx
import * as React from "react";
import PropTypes from "prop-types";
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from "@mui/material";

function makeTheme() {
  return createTheme({
    palette: { mode: "dark", primary: { main: "#1976d2" } },
    shape: { borderRadius: 12 },
    components: {
      MuiTextField: { defaultProps: { variant: "outlined", size: "medium" } },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            minHeight: 56,
            alignItems: "center",
            "& .MuiOutlinedInput-notchedOutline": { borderRadius: 12 },
          },
          input: { paddingTop: 14, paddingBottom: 14 },
        },
      },
      MuiSelect: {
        defaultProps: { variant: "outlined", size: "medium" },
        styleOverrides: { select: { paddingTop: 14, paddingBottom: 14 } },
      },
      MuiButton: { styleOverrides: { root: { borderRadius: 12 } } },
      MuiDialog: { defaultProps: { keepMounted: true } },
      MuiPaper: { styleOverrides: { rounded: { borderRadius: 20 } } },
    },
  });
}

export default function ThemeProvider({ children }) {
  const theme = React.useMemo(makeTheme, []);
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.info("%c[Axio Theme] overrides actifs", "color:#60a5fa;font-weight:700");
  }, []);
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </MuiThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
