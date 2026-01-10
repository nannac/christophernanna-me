// This is the configuration file for PostCSS.
// PostCSS is a tool for transforming CSS with JavaScript plugins.
// It's used here to run Tailwind CSS and Autoprefixer.
module.exports = {
  // The 'plugins' object is where you can define the PostCSS plugins to use.
  plugins: {
    // The 'tailwindcss' plugin processes your CSS and replaces the @tailwind directives
    // with the generated utility classes.
    tailwindcss: {},
    // The 'autoprefixer' plugin adds vendor prefixes to your CSS rules.
    // This ensures that your CSS is compatible with a wider range of browsers.
    autoprefixer: {},
  },
}