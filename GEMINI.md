# Project Overview

This is a personal website and blog built with Flask and Tailwind CSS. The backend is a simple Flask application that serves HTML pages, while the frontend uses Tailwind CSS for styling.

## Building and Running

To build the CSS and run the development server, use the following command:

```bash
npm run dev
```

This will start the Flask development server and watch for changes in the CSS files.

## Development Conventions

The project uses a standard Flask project structure. The main application logic is in `app.py`, templates are in the `templates` directory, and static files are in the `static` directory.

The frontend uses Tailwind CSS. The main CSS file is `static/css/input.css`, which is compiled to `static/css/output.css`.

## Dependency Management

Python dependencies are managed with `pip` and the `requirements.txt` file. To install the dependencies, run:

```bash
pip install -r requirements.txt
```

## Project History

- **Initial Setup:**
  - Initialized a new Flask project.
  - Set up Python dependency management using `requirements.txt` and added `Flask`, `python-dotenv`, and `gunicorn`.
  - Configured the project for editable installation with `pip install -e .`.
  - Set up the frontend toolchain using npm, creating a `package.json` file.
  - Added frontend dependencies: `tailwindcss`, `daisyui`, `postcss`, and `autoprefixer`.

- **File Structure:**
  - Created the main Flask application file: `app.py`.
  - Created the directory structure for `static` files and `templates`.
  - Added the input stylesheet for Tailwind: `static/css/input.css`.
  - Created a base HTML template (`templates/base.html`) and a home page template (`templates/index.html`).

- **Configuration:**
  - Configured `tailwind.config.js` to process the template files and enable the DaisyUI plugin.
  - Configured `postcss.config.js` to use `tailwindcss` and `autoprefixer`.
  - Added an npm script (`build:css`) to compile the CSS.
  - Added a `dev` script to `package.json` using `concurrently` to run the CSS compiler and Flask server together.

- **UI and Routing:**
  - Added a navigation bar to the base template with links to "About" and "Blog".
  - Updated the base template to center the page content.
  - Set the "About" page as the default index route.
  - Created placeholder pages for "About" and "Blog".

- **Navbar Active State:**
  - Modified `app.py` to pass an `active_page` variable to the templates.
  - Updated `templates/base.html` to use the `active_page` variable to apply the `active` class to the current navigation link.