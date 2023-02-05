import { createTheme, WuiTheme } from "@welcome-ui/core";

const theme = createTheme({
  // Kolory
  colors: {
    black: "#17252a",
    "dark-green": "#2b7a78",
    green: "#3aafa9",
    "green-hover": "#57cfc8",
    "light-green": "#def2f1",
    "very-light-green": "#f1f9f9",
    "light-gray": "rgba(0, 0, 0, 0.1)",
    gray: "rgba(0, 0, 0, 0.55)",
    white: "#feffff",
  },

  // Rodzaje czcionek
  fontFaces: {
    "welcome-font": [
      {
        url: "https://cdn.welcometothejungle.com/common/assets/fonts/welcome-font-regular",
        weight: "400",
        display: "swap",
        extensions: ["woff2", "woff"],
      },
      {
        url: "https://cdn.welcometothejungle.com/common/assets/fonts/welcome-font-medium",
        weight: "500",
        display: "swap",
        extensions: ["woff2", "woff"],
      },
      {
        url: "https://cdn.welcometothejungle.com/common/assets/fonts/welcome-font-bold",
        weight: "600",
        display: "swap",
        extensions: ["woff2", "woff"],
      },
    ],
  },

  // Rozmiary tekstu
  fontSizes: {
    lg: "2.5rem",
    md: "1.5rem",
    sm: "0.875rem",
    xs: "0.75rem",
  },

  // Grubość tekstu
  fontWeights: {
    sm: 400,
    md: 500,
    lg: 600,
  },

  // Ustawienie czionek
  fonts: {
    texts: "Work Sans, sans-serif",
    headings: "welcome-font, sans-serif",
  },

  // Rozmiary ekranu
  screens: {
    xs: 0,
    sm: 480,
    md: 736,
    lg: 980,
    xl: 1280,
    xxl: 1440,
    "3xl": 1620,
    "4xl": 1920,
  },

  // Wybrany element (CHYBA)
  selection: {
    backgroundColor: "#36D2C9",
    color: "rgba(0, 0, 0, 1)",
  },

  // Teksty
  texts: {
    h1: {
      color: "rgba(0, 0, 0, 1)",
      fontFamily: "welcome-font, sans-serif",
      fontWeight: 600,
      fontSize: "2.8125rem",
      lineHeight: "3rem",
      letterSpacing: "-0.075rem",
      margin: "0",
      "margin-bottom": "1.75rem",
    },
    h3: {
      fontWeight: 500,
      fontSize: "2rem",
      lineHeight: "1.5rem",
      letterSpacing: "-0.019rem",
    },
    h5: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: "1.125rem",
      letterSpacing: "-0.019rem",
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: "0.875rem",
      letterSpacing: "-0.0125rem",
    },
  },

  // Przyciski
  buttons: {
    primary: {
      color: "#FEFFFF",
      fontWeight: 600,
      fontSize: "0.75rem",
      lineHeight: "0.875rem",
      letterSpacing: 0,
      borderRadius: "6px",
      backgroundColor: "#3AAFA9",
      borderColor: "#3AAFA9",
    },
    hover: {
      primary: {
        backgroundColor: "#81d4cf",
        borderColor: "#81d4cf",
      },
    },
    active: {
      primary: {
        backgroundColor: "#2b7a78",
        borderColor: "#2b7a78",
      },
    },
  },

  // Hover
  hover: {
    primary: {
      backgroundColor: "#57cfc8",
      borderColor: "#57cfc8",
    },
  },

  // Wyłączony
  disabled: {
    color: "#696F6F",
    fontWeight: 600,
    fontSize: "0.75rem",
    lineHeight: "0.875rem",
    letterSpacing: 0,
    borderRadius: "6px",
    backgroundColor: "#D2DDDD",
    borderColor: "#D2DDDD",
    "&:focus": {
      boxShadow: "0 0 0 3px rgba(210, 221, 221, 0.5)",
    },
  },

  // Tagi
  tags: {
    default: {
      fontWeight: 500,
      backgroundColor: "rgba(255, 255, 255, 1)",
      color: "#464A4A",
    },
    variants: {
      "1": {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#8CB3DB",
        backgroundColor: "#8CB3DB",
        color: "rgba(0, 0, 0, 1)",
      },
    },
  },

  // Checkboxes
  checkboxes: {
    default: {
      width: "1.25rem",
      height: "1.25rem",
      flexShrink: 0,
    },
    disabled: {
      borderColor: "#8C9494",
    },
    checked: {
      color: "rgba(0, 0, 0, 1)",
      backgroundColor: "#3aafa9",
      borderColor: "#3aafa9",
    },
  },

  // Dropdown
  dropdownMenu: {
    inner: {
      fontSize: "0.875rem",
      minWidth: "8.125rem",
    },
    item: {
      padding: "0.5rem 0.75rem",
      backgroundColor: "transparent",
      color: "#696F6F",
      "&:hover": {
        backgroundColor: "#3AAFA9",
        color: "rgba(0, 0, 0, 1)",
      },
      "&:focus": {
        backgroundColor: "#3AAFA9",
        color: "rgba(0, 0, 0, 1)",
      },
      "&[disabled]": {
        backgroundColor: "transparent",
        color: "#D2DDDD",
        cursor: "not-allowed",
      },
    },
    separator: {
      backgroundColor: "#3AAFA9",
    },
  },

  // Fields
  defaultFields: {
    default: {
      color: "rgba(0, 0, 0, 1)",
      fontSize: "0.875rem",
      lineHeight: "1rem",
      fontWeight: 400,
      backgroundColor: "rgba(255, 255, 255, 1)",
      borderColor: "rgba(0, 0, 0, 0.1)",
      borderWidth: "1px",
      borderStyle: "solid",
      outline: "none",
      borderRadius: "6px",
    },
    sizes: {
      xs: {
        height: "1.5rem",
        paddingTop: "0.25rem",
        paddingRight: "0.5rem",
        paddingBottom: "0.25rem",
        paddingLeft: "0.5rem",
      },
      sm: {
        height: "2rem",
        paddingTop: "0.5rem",
        paddingRight: "0.75rem",
        paddingBottom: "0.5rem",
        paddingLeft: "0.75rem",
      },
      md: {
        height: "2.5rem",
        paddingTop: "0.75rem",
        paddingRight: "0.75rem",
        paddingBottom: "0.75rem",
        paddingLeft: "0.75rem",
      },
      lg: {
        height: "3rem",
        paddingTop: "1rem",
        paddingRight: "0.75rem",
        paddingBottom: "1rem",
        paddingLeft: "0.75rem",
      },
    },
    focused: {
      default: {
        boxShadow: "0 0 0 3px #3AAFA9",
        borderColor: "transparent",
      },
    },
  },
});

export default theme;
