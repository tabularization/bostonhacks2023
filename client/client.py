from flask import Blueprint, render_template

# register a client blueprint
client_bp = Blueprint("client", __name__)

client_bp.static_folder = "static"
client_bp.template_folder = "templates"

@client_bp.route("/")
def index():
    """Return the index page."""
    return "Hello, World!"