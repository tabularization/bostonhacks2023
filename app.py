from flask import Flask
from client.client import client_bp

app = Flask(__name__)
app.register_blueprint(client_bp)

if __name__ == "__main__":
    app.run()