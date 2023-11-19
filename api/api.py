"""Main file for API handling."""

import os
from dotenv import load_dotenv
from openai import OpenAI
from api.summary import summarize
from flask import Blueprint, request
import random

client = None
IMG_PROB = 0.05

engine = "gpt-3.5-turbo-1106"
# engine = "gpt-4"
imgEngine = "dall-e-2"
# imgEngine = "dall-e-3"

prompt = "Continue story from context & user input. Dont deviate from story. Add event that advances story discreetly, guiding user. Max length 150"""
initialized = False
def init():
    """Initialize the API."""
    # load .env file
    load_dotenv()
    # set openai key
    global client
    client = OpenAI(
        api_key=os.getenv("OPENAI_KEY"),
    )
    global initialized
    initialized = True

# ===============================================================================
context = []
def get_context():
    # lets the ai remember the last few interactions
    global context
    if len(context) > 5:
        context = context[-5:]
    return context

def add_context(text):
    global context
    context.append(text)
    # remove summary if it gets too long
    if len(context) > 5:
        context = context[-5:]
# ===============================================================================
# make api calls
def get_response(prompt, story, contextStr, text):
    if not initialized:
        print("Initializing API...")
        init()
    """Get a response from the API."""
    # create a context

    response = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": prompt + "\n\n" + story + "\n\n" + "\n\n".join(contextStr) + "\n\n" + "User: " + text + "."
            },
        ],
        model=engine,
        max_tokens=175
    )
    # get content from response
    content = response.choices[0].message.content
    # add to summary
    context.append(summarize(content, 1))

    result = {
        "text": content,
        "image": "n/a",
    }

    # roll a probability for an image
    if random.random() < IMG_PROB:
        imageResponse = client.images.generate(
            prompt="Be accurate to the story. Generate scene based on this story: " + story + "\n\n" + "\n\n".join(context) + "\n\n" + "User: " + text,
            model=imgEngine,
            n=1,
            response_format="url",
        )
        result["image"] = imageResponse.data[0].url
    return result
    
# ===============================================================================

api_bp = Blueprint("api", __name__)

@api_bp.route("/api", methods=["POST"])
def api():
    """Handle API requests."""
    data = request.json
    story = data["story"]
    context = " ".join(data["context"])
    userInput = data["text"]
    return get_response(prompt, story, context, userInput)
