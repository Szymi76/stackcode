import { createTheme } from "@welcome-ui/core";

const theme = createTheme({
  transformers: {},
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
      {
        url: "https://cdn.welcometothejungle.com/common/assets/fonts/welcome-font-regular-italic",
        weight: "400",
        style: "italic",
        display: "swap",
        extensions: ["woff2", "woff"],
      },
      {
        url: "https://cdn.welcometothejungle.com/common/assets/fonts/welcome-font-medium-italic",
        weight: "500",
        style: "italic",
        display: "swap",
        extensions: ["woff2", "woff"],
      },
      {
        url: "https://cdn.welcometothejungle.com/common/assets/fonts/welcome-font-bold-italic",
        weight: "600",
        style: "italic",
        display: "swap",
        extensions: ["woff2", "woff"],
      },
    ],
    "welcome-icon-font-2": [
      {
        url: "https://cdn.welcome-ui.com/fonts/master/c700984a75f61a0bb2b7b9721457b08777cecd2a/welcome-icon-font-2",
        display: "block",
        extensions: ["woff2", "woff"],
      },
    ],
  },
  fontSizes: {
    h0: "4.0625rem",
    h1: "2.8125rem",
    h2: "2.25rem",
    h3: "1.625rem",
    h4: "1.25rem",
    h5: "1rem",
    h6: "0.875rem",
    lg: "1.125rem",
    md: "1rem",
    sm: "0.875rem",
    xs: "0.75rem",
    "subtitle-md": "0.8125rem",
    "subtitle-sm": "0.6875rem",
  },
  defaultLineHeight: 1.15,
  defaultLetterSpacing: "-0.019rem",
  lineHeights: {
    html: 1.15,
    h0: "4.5rem",
    h1: "3rem",
    h2: "2.5rem",
    h3: "2rem",
    h4: "1.5rem",
    h5: "1.125rem",
    h6: "1rem",
    lg: "1.5rem",
    md: "1.125rem",
    sm: "1.125rem",
    xs: "0.875rem",
    "subtitle-md": 1.15,
    "subtitle-sm": 1.15,
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    bold: 600,
  },
  letterSpacings: {
    html: "-0.019rem",
    h0: "-0.10625rem",
    h1: "-0.075rem",
    h2: "-0.0625rem",
    h3: "-0.05625rem",
    h4: "-0.0375rem",
    h5: "-0.03125rem",
    h6: "-0.03125rem",
    lg: "-0.019rem",
    md: "-0.019rem",
    sm: "-0.019rem",
    xs: "-0.0125rem",
    "subtitle-md": "-0.0125rem",
    "subtitle-sm": "-0.0125rem",
  },
  fonts: {
    texts: "Work Sans, sans-serif",
    headings: "welcome-font, sans-serif",
    icons: "welcome-icon-font-2",
  },
  borderWidths: {
    sm: "1px",
    md: "2px",
    lg: "3px",
  },
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
  space: {
    xxs: "0.125rem",
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    xxl: "2rem",
    "3xl": "3rem",
    "4xl": "4rem",
    "5xl": "6rem",
    "6xl": "8rem",
    "7xl": "12rem",
  },
  inset: {
    xxs: "0.125rem",
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    xxl: "2rem",
    "3xl": "3rem",
    "4xl": "4rem",
    "5xl": "6rem",
    "6xl": "8rem",
    "7xl": "12rem",
  },
  icons: {
    xs: "0.75rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
    xxl: "4rem",
  },
  radii: {
    sm: "4px",
    md: "6px",
    lg: "10px",
  },
  transitions: {
    slow: "500ms cubic-bezier(0.41, 0.094, 0.54, 0.07)",
    medium: "300ms ease",
    fast: "100ms linear",
  },
  timingFunction: {
    primary: "ease",
    secondary: "linear",
    tertiary: "cubic-bezier(0.41, 0.094, 0.54, 0.07)",
  },
  shadows: {
    sm: "1px 2px 4px 0 rgba(0,0,0,0.05)",
    md: "3px 4px 10px 0 rgba(0,0,0,0.07)",
  },
  selection: {
    backgroundColor: "#36D2C9",
    color: "rgba(0, 0, 0, 1)",
  },
  underline: {
    default: [
      "\n      background-image: linear-gradient(0deg, ",
      "#36D2C9",
      ", ",
      "#36D2C9",
      " 100%);\n      background-repeat: no-repeat;\n      background-size: 100% 50%;\n      background-position-y: calc(200% - 2px);\n      transition: background-position-y 250ms, background-size 250ms, color 250ms;\n    ",
    ],
    hover: ["\n      opacity: 1;\n      background-position-y: 100%;\n      background-size: 100% 100%;\n    "],
  },
  defaultCards: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: "6px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  textsFontWeights: {
    h0: 600,
    h1: 600,
    h2: 600,
    h3: 600,
    h4: 600,
    h5: 600,
    h6: 600,
    lg: 400,
    md: 400,
    sm: 400,
    xs: 400,
    "subtitle-md": 600,
    "subtitle-sm": 500,
  },
  textsFontFamily: {
    h0: "welcome-font, sans-serif",
    h1: "welcome-font, sans-serif",
    h2: "welcome-font, sans-serif",
    h3: "welcome-font, sans-serif",
    h4: "welcome-font, sans-serif",
    h5: "welcome-font, sans-serif",
    h6: "welcome-font, sans-serif",
    "subtitle-md": "welcome-font, sans-serif",
    "subtitle-sm": "welcome-font, sans-serif",
  },
  textsFontColors: {
    h0: "rgba(0, 0, 0, 1)",
    h1: "rgba(0, 0, 0, 1)",
    h2: "rgba(0, 0, 0, 1)",
    h3: "rgba(0, 0, 0, 1)",
    h4: "rgba(0, 0, 0, 1)",
    h5: "rgba(0, 0, 0, 1)",
    h6: "rgba(0, 0, 0, 1)",
  },
  textsTextTransform: {
    "subtitle-md": "uppercase",
    "subtitle-sm": "uppercase",
  },
  texts: {
    h0: {
      color: "rgba(0, 0, 0, 1)",
      fontFamily: "welcome-font, sans-serif",
      fontWeight: 600,
      fontSize: "4.0625rem",
      lineHeight: "4.5rem",
      letterSpacing: "-0.10625rem",
    },
    h1: {
      color: "rgba(0, 0, 0, 1)",
      fontFamily: "welcome-font, sans-serif",
      fontWeight: 600,
      fontSize: "2.8125rem",
      lineHeight: "3rem",
      letterSpacing: "-0.075rem",
    },
    h2: {
      color: "rgba(0, 0, 0, 1)",
      fontFamily: "welcome-font, sans-serif",
      fontWeight: 600,
      fontSize: "2.25rem",
      lineHeight: "2.5rem",
      letterSpacing: "-0.0625rem",
    },
    h3: {
      color: "rgba(0, 0, 0, 1)",
      fontFamily: "welcome-font, sans-serif",
      fontWeight: 600,
      fontSize: "1.625rem",
      lineHeight: "2rem",
      letterSpacing: "-0.05625rem",
    },
    h4: {
      color: "rgba(0, 0, 0, 1)",
      fontFamily: "welcome-font, sans-serif",
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: "1.5rem",
      letterSpacing: "-0.0375rem",
    },
    h5: {
      color: "rgba(0, 0, 0, 1)",
      fontFamily: "welcome-font, sans-serif",
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: "1.125rem",
      letterSpacing: "-0.03125rem",
    },
    h6: {
      color: "rgba(0, 0, 0, 1)",
      fontFamily: "welcome-font, sans-serif",
      fontWeight: 600,
      fontSize: "0.875rem",
      lineHeight: "1rem",
      letterSpacing: "-0.03125rem",
    },
    lg: {
      fontWeight: 400,
      fontSize: "1.125rem",
      lineHeight: "1.5rem",
      letterSpacing: "-0.019rem",
    },
    md: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: "1.125rem",
      letterSpacing: "-0.019rem",
    },
    sm: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: "1.125rem",
      letterSpacing: "-0.019rem",
    },
    xs: {
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: "0.875rem",
      letterSpacing: "-0.0125rem",
    },
    "subtitle-md": {
      fontFamily: "welcome-font, sans-serif",
      fontWeight: 600,
      fontSize: "0.8125rem",
      lineHeight: 1.15,
      letterSpacing: "-0.0125rem",
      textTransform: "uppercase",
    },
    "subtitle-sm": {
      fontFamily: "welcome-font, sans-serif",
      fontWeight: 500,
      fontSize: "0.6875rem",
      lineHeight: 1.15,
      letterSpacing: "-0.0125rem",
      textTransform: "uppercase",
    },
  },
  alerts: {
    default: {
      display: "flex",
      maxWidth: "max-content",
      fontSize: "0.875rem",
      borderWidth: "1px",
      borderStyle: "solid",
      borderRadius: "6px",
      color: "rgba(0, 0, 0, 0.7)",
      backgroundColor: "rgba(255, 255, 255, 1)",
      borderColor: "rgba(0, 0, 0, 0.1)",
    },
    error: {
      backgroundColor: "#FFE7E7",
      borderColor: "#AF4636",
    },
    warning: {
      backgroundColor: "#FFF2DC",
      borderColor: "#B97F22",
    },
    info: {
      backgroundColor: "#EDF3FE",
      borderColor: "#106DD1",
    },
    success: {
      backgroundColor: "#E3F0EC",
      borderColor: "#00875C",
    },
    sizes: {
      sm: {
        padding: "1rem",
      },
      md: {
        padding: "1.5rem",
      },
    },
    title: {
      default: {
        color: "rgba(0, 0, 0, 1)",
      },
      error: {
        color: "rgba(0, 0, 0, 1)",
      },
      warning: {
        color: "rgba(0, 0, 0, 1)",
      },
      info: {
        color: "rgba(0, 0, 0, 1)",
      },
      success: {
        color: "rgba(0, 0, 0, 1)",
      },
    },
  },
  avatars: {
    sizes: {
      sm: "1.25rem",
      md: "1.875rem",
      lg: "2.5rem",
      xl: "3.125rem",
      xxl: "3.75rem",
    },
    text: {
      color: "rgba(255, 255, 255, 1)",
      fontWeight: 600,
    },
  },
  badges: {
    default: {
      fontFamily: "welcome-font, sans-serif",
      fontWeight: 500,
      fontSize: "0.75rem",
      lineHeight: "0.875rem",
      letterSpacing: "-0.0125rem",
    },
    variants: {
      default: {
        color: "#696F6F",
        backgroundColor: "#3AAFA9",
      },
      primary: {
        color: "rgba(0, 0, 0, 1)",
        backgroundColor: "#36D2C9",
      },
    },
    disabled: {
      default: {
        color: "#D2DDDD",
        backgroundColor: "#F3FAFA",
      },
      primary: {
        color: "#185F5B",
        backgroundColor: "#31BDB5",
      },
    },
    sizes: {
      sm: {
        padding: "0.125rem",
        height: "1rem",
        borderRadius: "0.875rem",
      },
      md: {
        padding: "0.25rem",
        height: "1.25rem",
        borderRadius: "0.875rem",
      },
    },
  },
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
    secondary: {
      color: "rgba(255, 255, 255, 1)",
      fontWeight: 600,
      fontSize: "0.75rem",
      lineHeight: "0.875rem",
      letterSpacing: 0,
      borderRadius: "6px",
      backgroundColor: "rgba(0, 0, 0, 1)",
      borderColor: "rgba(0, 0, 0, 1)",
    },
    ghost: {
      color: "rgba(0, 0, 0, 1)",
      fontWeight: 600,
      fontSize: "0.75rem",
      lineHeight: "0.875rem",
      letterSpacing: 0,
      borderRadius: "6px",
      backgroundColor: "transparent",
      borderColor: "transparent",
    },
    hover: {
      primary: {
        backgroundColor: "#57cfc8",
        borderColor: "#57cfc8",
      },
      secondary: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        borderColor: "transparent",
      },
      ghost: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      },
    },
    focus: {
      primary: {
        boxShadow: "0 0 0 3px #000",
      },
      secondary: {
        boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.55)",
      },
      tertiary: {
        boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.55)",
      },
      ghost: {
        boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.1)",
      },
      "primary-success": {
        boxShadow: "0 0 0 3px rgba(0, 135, 92, 0.5)",
      },
      "secondary-success": {
        boxShadow: "0 0 0 3px rgba(0, 135, 92, 0.5)",
      },
      "primary-warning": {
        boxShadow: "0 0 0 3px rgba(185, 127, 34, 0.5)",
      },
      "secondary-warning": {
        boxShadow: "0 0 0 3px rgba(185, 127, 34, 0.5)",
      },
      "primary-danger": {
        boxShadow: "0 0 0 3px rgba(175, 70, 54, 0.5)",
      },
      "secondary-danger": {
        boxShadow: "0 0 0 3px rgba(175, 70, 54, 0.5)",
      },
      "primary-info": {
        boxShadow: "0 0 0 3px rgba(16, 109, 209, 0.5)",
      },
      "secondary-info": {
        boxShadow: "0 0 0 3px rgba(16, 109, 209, 0.5)",
      },
    },
    active: {
      primary: {
        backgroundColor: "#EBFAFA",
        borderColor: "#EBFAFA",
      },
      secondary: {
        backgroundColor: "rgba(0, 0, 0, 0.17)",
        borderColor: "rgba(0, 0, 0, 0.17)",
      },
      tertiary: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      },
      "primary-success": {
        backgroundColor: "#45BE98",
        borderColor: "#45BE98",
      },
      "secondary-success": {
        backgroundColor: "rgba(0, 135, 92, 0.4)",
      },
      "primary-warning": {
        backgroundColor: "#ef4444",
        borderColor: "#ef4444",
      },
      "secondary-warning": {
        backgroundColor: "rgba(185, 127, 34, 0.4)",
      },
      "primary-danger": {
        backgroundColor: "#D87C6E",
        borderColor: "#D87C6E",
      },
      "secondary-danger": {
        backgroundColor: "rgba(175, 70, 54, 0.4)",
      },
      "primary-info": {
        backgroundColor: "#9AC7F7",
        borderColor: "#9AC7F7",
      },
      "secondary-info": {
        backgroundColor: "rgba(16, 109, 209, 0.4)",
      },
      ghost: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      },
    },
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
    sizes: {
      xs: {
        height: "1.5rem",
        padding: "0.25rem 0.5rem",
      },
      sm: {
        height: "2rem",
        padding: "0.5rem 0.75rem",
      },
      md: {
        fontWeight: 600,
        fontSize: "0.875rem",
        lineHeight: "1.125rem",
        letterSpacing: "-0.019rem",
        height: "2.5rem",
        padding: "0.5rem 1rem",
      },
      lg: {
        fontWeight: 600,
        fontSize: "0.875rem",
        lineHeight: "1.125rem",
        letterSpacing: "-0.019rem",
        height: "3rem",
        padding: "0.75rem 1.5rem",
      },
    },
    icon: {
      only: {
        xs: "1rem",
        sm: "1rem",
        md: "1rem",
        lg: "1.5rem",
      },
      default: {
        xs: "0.75rem",
        sm: "1rem",
        md: "1rem",
        lg: "1rem",
      },
    },
  },
  breadcrumbs: {
    list: {
      fontFamily: "welcome-font, sans-serif",
      fontWeight: 500,
      fontSize: "0.6875rem",
      lineHeight: 1.15,
      letterSpacing: "-0.0125rem",
      textTransform: "uppercase",
      padding: "0.5rem 0",
    },
    item: {
      default: {
        color: "rgba(0, 0, 0, 0.4)",
        textDecoration: "none",
      },
      hover: {
        color: "rgba(0, 0, 0, 0.7)",
      },
      active: {
        color: "rgba(0, 0, 0, 1)",
      },
    },
    separator: {
      padding: "0 0.25rem",
      color: "rgba(0, 0, 0, 0.4)",
    },
  },
  toasts: {
    default: {
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
    },
    top: {
      paddingTop: "1rem",
    },
    bottom: {
      paddingBottom: "1rem",
    },
    growls: {
      default: {
        fontWeight: 400,
        fontSize: "0.875rem",
        lineHeight: "1.125rem",
        letterSpacing: "-0.019rem",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "6px",
      },
      title: {
        fontWeight: 600,
        color: "rgba(0, 0, 0, 1)",
      },
    },
  },
  paginations: {
    default: {
      width: "2rem",
      height: "2rem",
      color: "rgba(0, 0, 0, 1)",
      fontWeight: 600,
      fontSize: "0.75rem",
    },
    item: {
      "&:hover, &:focus": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      },
      "&:focus": {
        boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.55)",
      },
    },
    active: {
      backgroundColor: "rgba(0, 0, 0, 1)",
      color: "rgba(255, 255, 255, 1)",
      "&:hover, &:focus": {
        backgroundColor: "rgba(0, 0, 0, 1)",
      },
    },
  },
  tabs: {
    tabsBorder: {
      horizontal: {
        boxShadow: "inset 0 -1px 0 rgba(0, 0, 0, 0.1)",
      },
      vertical: {
        boxShadow: "inset -1px 0 0 rgba(0, 0, 0, 0.1)",
      },
    },
    item: {
      default: {
        color: "rgba(0, 0, 0, 0.7)",
        fontWeight: 500,
        fontSize: "1rem",
        textDecoration: "none",
        lineHeight: "1.125rem",
      },
      active: {
        color: "rgba(0, 0, 0, 1)",
      },
      focus: {
        color: "rgba(0, 0, 0, 1)",
      },
      disabled: {
        color: "rgba(0, 0, 0, 0.4)",
      },
    },
    panel: {
      vertical: {
        "&:focus": {
          outline: "none",
        },
      },
      horizontal: {
        marginTop: "1.5rem",
        "&:focus": {
          outline: "none",
        },
      },
    },
    activeBar: {
      horizontal: {
        background: "#36D2C9",
        height: "2px",
      },
      vertical: {
        background: "#36D2C9",
        width: "2px",
      },
    },
    size: {
      sm: {
        marginRight: "0.75rem",
        fontSize: "0.875rem",
      },
      md: {
        marginRight: "1.5rem",
      },
    },
    icon: {
      maxWidth: "1rem",
      maxHeight: "1rem",
    },
    badge: {
      maxHeight: "1rem",
    },
  },
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
      "2": {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#3B52D0",
        backgroundColor: "#3B52D0",
        color: "rgba(255, 255, 255, 1)",
      },
      "3": {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#EE4B65",
        backgroundColor: "#EE4B65",
        color: "rgba(255, 255, 255, 1)",
      },
      "4": {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#F79D85",
        backgroundColor: "#F79D85",
        color: "rgba(0, 0, 0, 1)",
      },
      "5": {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#A5D0A8",
        backgroundColor: "#A5D0A8",
        color: "rgba(0, 0, 0, 1)",
      },
      "6": {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#267566",
        backgroundColor: "#267566",
        color: "rgba(255, 255, 255, 1)",
      },
      "7": {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#9B8CC0",
        backgroundColor: "#9B8CC0",
        color: "rgba(0, 0, 0, 1)",
      },
      default: {
        backgroundColor: "#3AAFA9",
        borderColor: "#D2DDDD",
        borderWidth: "1px",
        borderStyle: "solid",
      },
      primary: {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#36D2C9",
        backgroundColor: "#36D2C9",
        color: "rgba(0, 0, 0, 1)",
      },
      secondary: {
        backgroundColor: "#A5D0A8",
        color: "rgba(0, 0, 0, 1)",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: "1px",
        borderStyle: "solid",
      },
      success: {
        backgroundColor: "#E3F0EC",
        color: "#00875C",
        borderColor: "#99DCC7",
        borderWidth: "1px",
        borderStyle: "solid",
      },
      error: {
        backgroundColor: "#FFE7E7",
        color: "#AF4636",
        borderColor: "#EBBDB5",
        borderWidth: "1px",
        borderStyle: "solid",
      },
      warning: {
        backgroundColor: "#FFF2DC",
        color: "#B97F22",
        borderColor: "#F4DFBB",
        borderWidth: "1px",
        borderStyle: "solid",
      },
      info: {
        backgroundColor: "#EDF3FE",
        color: "#106DD1",
        borderColor: "#9AC7F7",
        borderWidth: "1px",
        borderStyle: "solid",
      },
    },
    hover: {
      "1": {
        borderColor: "rgba(0, 0, 0, 0.17)",
      },
      "2": {
        borderColor: "rgba(0, 0, 0, 0.17)",
      },
      "3": {
        borderColor: "rgba(0, 0, 0, 0.17)",
      },
      "4": {
        borderColor: "rgba(0, 0, 0, 0.17)",
      },
      "5": {
        borderColor: "rgba(0, 0, 0, 0.17)",
      },
      "6": {
        borderColor: "rgba(0, 0, 0, 0.17)",
      },
      "7": {
        borderColor: "rgba(0, 0, 0, 0.17)",
      },
      default: {
        borderColor: "#8C9494",
      },
      primary: {},
      secondary: {
        borderColor: "rgba(0, 0, 0, 0.4)",
      },
      success: {
        borderColor: "#00875C",
      },
      error: {
        borderColor: "#AF4636",
      },
      warning: {
        borderColor: "#B97F22",
      },
      info: {
        borderColor: "#106DD1",
      },
    },
    sizes: {
      xs: {
        padding: "0.125rem 0.25rem",
        height: "1.25rem",
        fontSize: "0.75rem",
        gap: "0.25rem",
      },
      sm: {
        padding: "0.25rem 0.5rem",
        height: "1.5rem",
        fontSize: "0.75rem",
        gap: "0.25rem",
      },
      md: {
        padding: "0.25rem 0.5rem",
        height: "2rem",
        fontSize: "0.875rem",
        gap: "0.5rem",
      },
    },
    icon: {
      xs: "0.75rem",
      sm: "0.75rem",
      md: "1rem",
    },
    shape: {
      xs: {
        width: "1.25rem",
        height: "1.25rem",
      },
      sm: {
        width: "1.5rem",
        height: "1.5rem",
      },
      md: {
        width: "2rem",
        height: "2rem",
      },
    },
  },
  tooltips: {
    maxWidth: "12.5rem",
    backgroundColor: "rgba(0, 0, 0, 1)",
    color: "rgba(255, 255, 255, 1)",
    padding: "0.125rem 0.5rem",
    fontSize: "0.75rem",
    lineHeight: "0.875rem",
    borderRadius: "4px",
    boxSizing: "content-box",
  },
  links: {
    default: {
      color: "rgba(0, 0, 0, 1)",
      fontWeight: 500,
      transition: "300ms ease",
    },
    withExternalLink: {
      backgroundSize: "calc(100% - 1rem - 0.25rem) 50%",
    },
    disabled: {
      color: "rgba(0, 0, 0, 0.4)",
      backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 100%)",
    },
    primary: {
      default: {},
      hover: {},
    },
    secondary: {
      default: {
        backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1) 100%)",
      },
      hover: {
        color: "rgba(255, 255, 255, 1)",
      },
    },
  },
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
  tables: {
    th: {
      color: "rgba(0, 0, 0, 0.55)",
      fontWeight: 500,
      textAlign: "left",
      borderBottomColor: "rgba(0, 0, 0, 1)",
      borderBottomWidth: "1px",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      padding: "1.5rem",
    },
    tr: {
      default: {
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
      },
      error: {
        backgroundColor: "#FFE7E7",
        color: "#AF4636",
      },
      warning: {
        backgroundColor: "#FFF2DC",
        color: "#B97F22",
      },
      info: {
        backgroundColor: "#EDF3FE",
        color: "#106DD1",
      },
      success: {
        backgroundColor: "#E3F0EC",
        color: "#00875C",
      },
      clickable: {
        cursor: "pointer",
      },
    },
  },
  cards: {
    default: {
      overflow: "hidden",
    },
    cover: {
      borderTopLeftRadius: "4px",
      borderTopRightRadius: "4px",
    },
  },
  modals: {
    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.55)",
      zIndex: 999,
    },
    default: {
      zIndex: 999,
    },
    header: {
      backgroundColor: "rgba(255, 255, 255, 1)",
      paddingTop: "2rem",
      paddingRight: "3rem",
      paddingBottom: "2rem",
      paddingLeft: "2rem",
      subtitle: {
        color: "rgba(0, 0, 0, 0.7)",
        variant: "sm",
        margin: 0,
      },
    },
    body: {
      color: "rgba(0, 0, 0, 1)",
      paddingTop: "2rem",
      paddingRight: "3rem",
      paddingBottom: "2rem",
      paddingLeft: "2rem",
    },
    footer: {
      backgroundColor: "rgba(255, 255, 255, 1)",
      borderTop: "solid rgba(0, 0, 0, 0.1)",
      children: {
        paddingRight: "2rem",
        paddingLeft: "2rem",
        paddingTop: "1rem",
        paddingBottom: "1.5rem",
      },
      informations: {
        backgroundColor: "#F3FAFA",
        paddingRight: "2rem",
        paddingLeft: "2rem",
        paddingTop: "1.5rem",
        paddingBottom: "2rem",
      },
    },
    gutter: "2rem",
    sizes: {
      xs: {
        width: "20rem",
      },
      sm: {
        width: "28.125rem",
      },
      md: {
        width: "37.5rem",
      },
      lg: {
        width: "45.625rem",
      },
      auto: {},
    },
    cover: {},
  },
  drawers: {
    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.55)",
      zIndex: 999,
    },
    default: {
      zIndex: 999,
    },
    closeButton: {
      marginRight: "1.5rem",
      marginTop: "1.5rem",
    },
    title: {
      margin: 0,
      backgroundColor: "rgba(255, 255, 255, 1)",
      padding: "1.5rem 6rem 1.5rem 1.5rem",
    },
    content: {
      padding: "3rem",
    },
    footer: {
      backgroundColor: "rgba(255, 255, 255, 1)",
      padding: "1.5rem",
    },
    sizes: {
      horizontal: {
        sm: {
          width: "25rem",
        },
        md: {
          width: "34.375rem",
        },
        lg: {
          width: "42.5rem",
        },
      },
      vertical: {
        sm: {
          height: "25rem",
        },
        md: {
          height: "34.375rem",
        },
        lg: {
          height: "42.5rem",
        },
      },
    },
  },
  loaders: {
    xs: "0.5rem",
    sm: "0.625rem",
    md: "0.9375rem",
    lg: "1.25rem",
  },
  accordions: {
    padding: "1rem",
    wrapper: {
      backgroundColor: "rgba(255, 255, 255, 1)",
      transition: "300ms ease",
      border: "1px solid rgba(0, 0, 0, 0.1)",
    },
    icon: {
      color: "rgba(0, 0, 0, 1)",
    },
    content: {
      fontSize: "0.875rem",
    },
    title: {
      color: "rgba(0, 0, 0, 1)",
      fontFamily: "welcome-font, sans-serif",
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: "1.125rem",
      letterSpacing: "-0.03125rem",
    },
  },
  swipers: {
    navigation: {
      bullet: {
        active: {
          backgroundColor: "#36D2C9",
        },
        default: {
          backgroundColor: "#D2DDDD",
        },
      },
    },
  },
  labels: {
    fontSize: "0.875rem",
    fontWeight: 500,
  },
  popovers: {
    default: {
      color: "rgba(255, 255, 255, 1)",
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: "1.125rem",
      letterSpacing: "-0.019rem",
      backgroundColor: "rgba(0, 0, 0, 1)",
      maxWidth: "43.75rem",
      zIndex: 1,
    },
    content: {
      display: "block",
      padding: "0.75rem",
    },
    title: {
      color: "rgba(255, 255, 255, 1)",
      fontFamily: "welcome-font, sans-serif",
      fontWeight: 600,
      fontSize: "0.875rem",
      lineHeight: "1rem",
      letterSpacing: "-0.03125rem",
      padding: "0.75rem 0.75rem 0.25rem",
      borderBottomColor: "rgba(255, 255, 255, 0.17)",
      borderBottomWidth: "1px",
      borderBottomStyle: "solid",
    },
  },
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
    iconPlacement: {
      xs: {
        left: "0.5rem",
        right: "0.5rem",
      },
      sm: {
        left: "0.75rem",
        right: "0.75rem",
      },
      md: {
        left: "0.75rem",
        right: "0.75rem",
      },
      lg: {
        left: "0.75rem",
        right: "0.75rem",
      },
    },
    checkableField: {
      checked: {
        color: "black",
      },
      disabled: {
        opacity: 0.4,
      },
    },
    disabled: {
      backgroundColor: "#D2DDDD",
      color: "#696F6F",
      cursor: "not-allowed",
    },
    placeholder: {
      color: "rgba(0, 0, 0, 0.4)",
    },
    focused: {
      default: {
        boxShadow: "0 0 0 3px #3AAFA9",
        borderColor: "transparent",
      },
      error: {
        boxShadow: "0 0 0 3px rgba(216, 124, 110, 1)",
      },
      warning: {
        boxShadow: "0 0 0 3px rgba(228, 174, 86, 1)",
      },
      success: {
        boxShadow: "0 0 0 3px rgba(69, 190, 152, 1)",
      },
      info: {
        boxShadow: "0 0 0 3px rgba(75, 155, 241, 1)",
      },
    },
    checkablelabel: {
      default: {},
      checked: {
        color: "rgba(0, 0, 0, 1)",
        "-webkit-text-stroke": "0.04em",
      },
    },
    select: {
      default: {
        maxHeight: "9.6875rem",
      },
      existing: {
        color: "#D2DDDD",
        cursor: "not-allowed",
      },
      highlighted: {
        backgroundColor: "#F3FAFA",
        cursor: "default",
      },
      selectedAndHighlighted: {
        backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08) 100%)",
      },
      selected: {
        color: "rgba(0, 0, 0, 1)",
        fontWeight: 600,
      },
      disabled: {
        color: "#8C9494",
        cursor: "not-allowed",
      },
    },
    fieldset: {
      "border-width": "0",
    },
  },
  hints: {
    color: "rgba(0, 0, 0, 0.55)",
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: "0.875rem",
    letterSpacing: "-0.0125rem",
  },
  checkboxes: {
    default: {
      width: "1rem",
      height: "1rem",
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
  toggles: {
    item: {
      default: {
        width: "1.625rem",
        height: "1rem",
        borderRadius: "0.5625rem",
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: "1px",
        borderStyle: "solid",
        marginTop: "0.15rem",
        "&:focus": {
          borderColor: "#36D2C9",
          boxShadow: "0 0 0 3px rgba(54, 210, 201, 1)",
        },
      },
      checked: {
        backgroundColor: "#36D2C9",
        borderColor: "#36D2C9",
      },
      disabled: {
        borderColor: "#8C9494",
        backgroundColor: "#D2DDDD",
      },
    },
    after: {
      default: {
        width: "0.75rem",
        height: "0.75rem",
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderColor: "rgba(0, 0, 0, 0.4)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "50%",
      },
      checked: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderColor: "rgba(255, 255, 255, 1)",
      },
      disabled: {
        borderColor: "transparent",
        backgroundColor: "#8C9494",
      },
    },
  },
  dateTimePickerCommon: {
    item: {
      selected: {
        color: "rgba(0, 0, 0, 1)",
        fontWeight: 600,
        backgroundColor: "#36D2C9",
        outline: "none",
      },
      today: {
        color: "rgba(0, 0, 0, 1)",
        fontWeight: 600,
      },
    },
  },
  textareas: {
    minHeight: "8.125rem",
    padding: "0.75rem",
  },
  filedrops: {
    default: {
      minHeight: "12.5rem",
    },
    dragAccept: {},
    dragReject: {},
    disabled: {
      backgroundColor: "#3AAFA9",
    },
  },
  radios: {
    default: {
      width: "1rem",
      height: "1rem",
    },
    checked: {
      color: "rgba(0, 0, 0, 1)",
      borderColor: "#36D2C9",
    },
    checkedCenteredColor: {
      default: "#36D2C9",
      disabled: "#8C9494",
    },
    withHint: {
      default: {
        fontSize: "1rem",
        color: "rgba(0, 0, 0, 1)",
      },
      hint: {
        marginTop: "0.25rem",
      },
    },
  },
  radioTabs: {
    default: {
      "&:hover": {
        backgroundColor: "#3AAFA9",
      },
    },
    checked: {
      backgroundColor: "#36D2C9",
      color: "rgba(0, 0, 0, 1)",
      borderColor: "#36D2C9",
      "&:hover": {
        backgroundColor: "#86E4DF",
      },
    },
  },
  sliders: {
    default: {
      backgroundColor: "#D2DDDD",
      backgroundImage: "linear-gradient(#36D2C9, #36D2C9)",
    },
    selector: {
      backgroundColor: "rgba(0, 0, 0, 1)",
      borderRadius: "50%",
      border: "2px solid",
      disabled: {
        backgroundColor: "#8C9494",
      },
    },
    output: {
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 1)",
        border: "1px solid rgba(0, 0, 0, 0.7)}",
        color: "rgba(255, 255, 255, 1)",
      },
    },
    focused: {
      outline: "2px solid #36D2C9",
      disabled: {
        outline: "none",
      },
    },
    disabled: {
      backgroundImage: "linear-gradient(#8C9494, #8C9494)",
    },
    rangeInput: {
      disabled: {
        backgroundColor: "#8C9494",
      },
    },
  },
  states: {
    _: null,
    motionSafe: "@media (prefers-reduced-motion: no-preference)",
    motionReduce: "@media (prefers-reduced-motion: reduce)",
    first: "&:first-child",
    last: "&:last-child",
    odd: "&:odd",
    even: "&:even",
    visited: "&:visited",
    checked: "&:checked",
    focusWithin: "&:focus-within",
    hover: "&:hover",
    focus: "&:focus",
    focusVisible: "&:focus-visible",
    active: "&:active",
    disabled: "&:disabled, &[aria-disabled=true]",
    placeholder: "&::placeholder",
  },
});

export default theme;
