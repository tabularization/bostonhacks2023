from flask import Flask
import client
import api
from client.client import client_bp
from api.api import api_bp

app = Flask(__name__)
app.register_blueprint(client_bp)
app.register_blueprint(api_bp)

if __name__ == "__main__":
    api.api.init()
    api.summary.init()
    app.run()