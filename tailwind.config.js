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
    // The 'catppuccin' plugin adds a set of color themes to Tailwind.
    require("@catppuccin/tailwindcss")({
      // prefix to use, e.g. `cat-pink` becomes `ctp-pink`
      prefix: "ctp",
      // which flavour of colours to use by default, in the `:root`
      defaultFlavour: "latte",
    }),
    require("@tailwindcss/typography"),
  ],
}