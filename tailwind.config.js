/** @type {import('tailwindcss').Config} */
// The line above is a special comment that provides type information for VS Code and other editors.
// It helps with autocompletion and error checking.

// This is the main configuration object for Tailwind CSS.
module.exports = {
  // The 'content' array tells Tailwind which files to scan for class names.
  // Tailwind will then generate CSS for only the classes it finds in these files.
  content: ["./templates/**/*.html"],

  // The 'theme' object is where you can customize the design system of Tailwind.
  // You can override the default colors, fonts, spacing, etc.
  theme: {
    // The 'extend' object is where you can add new values to the default theme.
    // For example, you could add a new color or font.
    extend: {},
  },

  // The 'plugins' array is where you can add Tailwind CSS plugins.
  // Plugins can add new utilities, components, or base styles to Tailwind.
  plugins: [
    // The 'daisyui' plugin adds a set of pre-designed components to Tailwind.
    require("daisyui"),
    require("@catppuccin/tailwindcss"),
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      {
        "latte": {
          "primary": "#f5e0dc",
          "secondary": "#cba6f7",
          "accent": "#94e2d5",
          "neutral": "#11111b",
          "base-100": "#eff1f5",
          "info": "#89b4fa",
          "success": "#a6e3a1",
          "warning": "#fab387",
          "error": "#f38ba8",
        },
      },
      {
        "frappe": {
          "primary": "#f5e0dc",
          "secondary": "#cba6f7",
          "accent": "#94e2d5",
          "neutral": "#11111b",
          "base-100": "#303446",
          "info": "#89b4fa",
          "success": "#a6e3a1",
          "warning": "#fab387",
          "error": "#f38ba8",
        },
      },
      {
        "macchiato": {
          "primary": "#f5e0dc",
          "secondary": "#cba6f7",
          "accent": "#94e2d5",
          "neutral": "#11111b",
          "base-100": "#24273a",
          "info": "#89b4fa",
          "success": "#a6e3a1",
          "warning": "#fab387",
          "error": "#f38ba8",
        },
      },
      {
        "mocha": {
          "primary": "#f5e0dc",
          "secondary": "#cba6f7",
          "accent": "#94e2d5",
          "neutral": "#11111b",
          "base-100": "#1e1e2e",
          "info": "#89b4fa",
          "success": "#a6e3a1",
          "warning": "#fab387",
          "error": "#f38ba8",
        },
      },
    ],
  },
}