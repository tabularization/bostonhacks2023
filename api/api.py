"""Main file for API handling."""

import os
from dotenv import load_dotenv

OPENAI_KEY = None
def init():
    """Initialize the API."""
    # load .env file
    load_dotenv()
    # set openai key
    global OPENAI_KEY
    OPENAI_KEY = os.getenv("OPENAI_KEY")
    
