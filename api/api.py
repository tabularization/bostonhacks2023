"""Main file for API handling."""

import os
from dotenv import load_dotenv
from openai import OpenAI
import summary

client = None

prompt = """
Continue the story based on context and current user input. 
Do not deviate from the story. After each interaction, 
add event that advances said story by guiding the user. Max length 150"""
story = "You wake up in a post-apocalyptic world"

def init():
    """Initialize the API."""
    # load .env file
    load_dotenv()
    # set openai key
    global client
    client = OpenAI(
        api_key=os.getenv("OPENAI_KEY"),
    )
    summary.init()

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
    if len(summary) > 5:
        summary = summary[-5:]
# ===============================================================================
# make api calls
def get_response(text):
    """Get a response from the API."""
    # create a context

    response = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": prompt + "\n\n" + story + "\n\n" + "\n\n".join(context) + "\n\n" + "User: " + text
            },
        ],
        model="gpt-3.5-turbo-1106",
        max_tokens=150
    )
    # get content from response
    content = response.choices[0].message.content
    print(content)
    # add to summary
    context.append(summary.summarize(content, 1))
    

# test
if __name__ == "__main__":
    init()
    while True:
        text = input("You: ")
        get_response(text)