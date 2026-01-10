# Import the Flask class from the flask module. 'render_template' is used to render HTML files.
from flask import Flask, render_template, redirect, url_for

# Create an instance of the Flask class. 
# '__name__' is a special Python variable that gets the name of the current module.
# Flask uses this to know where to look for resources like templates and static files.
app = Flask(__name__)
# Enable template auto-reload and disable static file caching during development
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.jinja_env.auto_reload = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


# This is a decorator that tells Flask what URL should trigger our function.
# In this case, it's the root URL of our site ("/").
@app.route("/")
# This is the function that will be executed when someone visits the root URL.
def index():
    # This function redirects the user to the 'about' page.
    return redirect(url_for("about"))

# This is the 'About' page route.
@app.route("/about")
def about():
    return render_template("about.html")

# This is the 'Blog' page route.
@app.route("/blog")
def blog():
    return render_template("blog.html")