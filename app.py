# Import the Flask class from the flask module. 'render_template' is used to render HTML files.
from flask import Flask, render_template, redirect, url_for
import os
import frontmatter
import markdown

# Create an instance of the Flask class. 
# '__name__' is a special Python variable that gets the name of the current module.
# Flask uses this to know where to look for resources like templates and static files.
app = Flask(__name__)
# Enable template auto-reload and disable static file caching during development
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.jinja_env.auto_reload = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# Directory where markdown files are stored
NOTES_DIR = "notes"

# This is a decorator that tells Flask what URL should trigger our function.
# In this case, it's the root URL of our site ("/").
@app.route("/")
# This is the function that will be executed when someone visits the root URL.
def index():
    # This function redirects the user to the 'about' page.
    return redirect(url_for("me"))

# This is the 'Me' page route.
@app.route("/me")
def me():
    return render_template("me.html", active_page="me")

# This is the 'Notes' page route.
@app.route("/notes")
def notes():

    files = os.listdir(NOTES_DIR)
    all_notes = []
    for filename in files:
        if filename.endswith(".md"):
            filepath = os.path.join(NOTES_DIR,filename)
            post = frontmatter.load(filepath)
            html_content = markdown.markdown(post.content)
            note_data = {
                'metadata': post.metadata,
                'content': html_content,
                'slug': os.path.splitext(filename)[0]
            }
            all_notes.append(note_data)

    all_notes.sort(key=lambda x: x['metadata'].get('date', ''), reverse=True)

    return render_template("notes.html", notes=all_notes, ctive_page="notes", active_page="notes")

@app.route("/notes/<slug>")
def show_note(slug):
    filepath = os.path.join(NOTES_DIR, f"{slug}.md")
    if not os.path.exists(filepath):
        return "Notes not found", 404
    
    post = frontmatter.load(filepath)
    html_content = markdown.markdown(post.content)

    return render_template("note.html", note=post, content=html_content, active_page="notes")