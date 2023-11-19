from flask import Flask
import api
from client.client import client_bp
from api.api import api_bp

app = Flask(__name__)
app.register_blueprint(client_bp)
app.register_blueprint(api_bp)

api.api.init()
api.summary.init()
app.run()