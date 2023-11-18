from imgur_python import Imgur
import os
from os import path
from dotenv import load_dotenv

imgurClient = None
def init():
    """Initialize the API."""
    # load .env file
    load_dotenv()
    global imgurClient
    imgurClient = Imgur({
        "client_id": os.getenv("IMGUR_CLIENT_ID"),
        "client_secret": os.getenv("IMGUR_CLIENT_SECRET"),
    })

def uploadImage(image):
    """Upload an image to imgur."""
    # upload image
    file = path.realpath("api/" + image)
    print(file)
    response = imgurClient.image_upload(file, "a", "b")
    print(response)

# test
init()
uploadImage("pic.png")