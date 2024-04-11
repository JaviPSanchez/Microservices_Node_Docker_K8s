module.exports = {
  // media : system's color strategy
  darkMode: "class",
  content: [
    "./public/index.html",
    "./src/**/*.{html,js}",
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./src/sections/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        customDark: "0px 0px 10px #ECF2F4",
        customLight: "0px 0px 10px #385364",
      },
      scrollbarWidth: ["hover", "focus"],
      gridTemplateColumns: {
        // Auto fit column grid
        fit: "repeat(auto-fit, minmax(250px, 1fr))",
        // Complex site-specific column configuration
        footer: "200px minmax(900px, 1fr) 100px",
      },
      fontSize: {
        "4xl": [
          "2rem",
          {
            lineHeight: "2.8rem",
            letterSpacing: "-0.01em",
            fontWeight: "400",
          },
        ],
        "12xl": [
          "12rem",
          {
            lineHeight: "10.25rem",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
      },

      colors: {
        white: "#FFFFFF",
        grey1: "#FAFAFA",
        grey2: "#F5F8F9",
        grey3: "#ECF2F4",
        grey4: "#CCDBE0",

        primary: "#06283D",
        secondary: "#1363DF",
        dark1: "#030243",
        dark2: "#8898a2",
        dark3: "#385364",
        error: "#fc8181",
      },
      lineHeight: {
        12: "1.2",
        13: "1.3",
        16: "1.6",
      },
    },
    screens: {
      xxs: { max: "450px" },
      xs: { max: "700px" },
      sm: { max: "640px" },
      md: { max: "1200px" },
      lg: { max: "1800px" },
    },
    fontFamily: {
      Rubik: ["Rubik", "sans-serif"],
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};

/*


// --- 01 TYPOGRAPHY SYSTEM

//FONTS

$rubik-sans: "Rubik", sans-serif;

// - Font sizes (px)

// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

// - Font weights

$Default-font-wheigt: 400;
$Medium-font-wheigt: 500;
$Semi-bold-font-wheigt: 600;
$Bold-font-wheigt: 700;

// - Line heights = font size * multiplier

$Default-line-height: 1;
$Small-line-height: 1.05;
$Medium-line-height: 1.2;
$Paragraph-default-line-height: 1.6;
$large-line-height: 1.8;

// - Letter spacing

$Medium-letter-spacing: -0.5px;
$Large-letter-spacing: 0.75px;

//  --- 02 COLORS

$color-primary-3: #8e806a;
$color-primary-2: #e4cda7;
$color-primary-20: #e4cda78f;
$color-primary-1: #c3b091;
$color-primary-10: #c3b09171;
$color-primary-0: #ffe6bc;

$color-white: #ffffff;
$color-black: #000000;
$color-black-opacity: hsla(0, 0%, 0%, 0.25);

$color-grey-light-1: #faf9f9;
$color-grey-light-2: #f4f2f2;
$color-grey-light-3: #f0eeee;
$color-grey-light-4: #cccccc;

$color-grey-dark-1: #1a1a1a;
$color-grey-dark-2: #333333;
$color-grey-dark-3: hsla(0, 2%, 57%, 0.171);

// --- 05 SHADOWS

$shadow-dark: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.5);
$shadow-medium: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.2);
$shadow-light: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.1);

// --- 06 BORDER RADIOUS

$Default-border-radious: 0.9rem;
$Medium-border-radious: 1.5rem;

// --- 07 WHITESPACE

// - Spacing system (px)

// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//BREAKPOINTS

$bp-largest: 75em; // 1200px / 16 px = 75rem = 75em
$bp-large: 68.75em; // 1100/16 = 68.5em
$bp-medium: 56.25em; // 900/16 = 56.25em
$bp-small: 37.5em; // 600/16 = 37.5em
$bp-smallest: 31.25em; // 500/16 = 31.25em

//TRANSITION

$transition: 0.5s cubic-bezier(0, 0, 0.58, 1);

*/
