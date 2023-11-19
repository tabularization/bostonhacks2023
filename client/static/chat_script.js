let currentContext = []
let isRunning = false;
function sendStoryResponse() {
    if (isRunning) {
        return;
    }
    isRunning = true;
    // get the story response from the input
    console.log("Start");
    let storyResponse = document.getElementById('storyResponse').value;
    console.log("Success:" + storyResponse);
    // create a user-text div to append to the chatbox
    let userText = document.createElement('div');
    userText.classList.add('user-text');
    userText.innerHTML = storyResponse;
    // append the user-text div to the chatbox
    let chatBox = document.querySelector('#chat-box');
    chatBox.appendChild(userText);
    // clear the input
    document.getElementById('storyResponse').value = '';
    // scroll to bottom of chatbox
    chatBox.scrollTop = chatBox.scrollHeight;

    // Create a post request to the server
    // get the first storyteller-text value
    let storytellerText = document.querySelector('.storyteller-text').innerHTML;
    let data = {
        story: storytellerText,
        context: currentContext,
        text: storyResponse
    }
    console.log(data);

    // fetch request to the server
    fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        // get the response from the server
        .then(response => response.json())
        .then(data => {
            console.log('Success:');
            console.log(data);
            // create a storyteller-text div to append to the chatbox
            let storytellerText = document.createElement('div');
            storytellerText.classList.add('storyteller-text');
            storytellerText.innerHTML = data.text;

            // check if we have a image link
            if (data.image != "n/a") {
                // create a image div to append to the chatbox
                let image = document.createElement('div');
                // add style margin-left: auto
                image.style.marginLeft = "auto";
                image.style.padding = "10px";
                // create a image element to append to the image div
                let imageElement = document.createElement('img');
                imageElement.style.borderRadius = "1rem";
                imageElement.style.width = "256px";
                imageElement.style.height = "256px";
                imageElement.src = data.image;
                // append the image element to the image div
                image.appendChild(imageElement);
                // append the image div to the storyteller-text div
                storytellerText.appendChild(image);
            }
            // append the storyteller-text div to the chatbox
            let chatBox = document.querySelector('#chat-box');
            chatBox.appendChild(storytellerText);
            // scroll to bottom of chatbox
            chatBox.scrollTop = chatBox.scrollHeight;
            // add the context to the current context
            currentContext.push(data.text);

            // remove the first element of the current context if it is longer than 10
            if (currentContext.length > 10) {
                currentContext.shift();
            }
        })
        .catch((error) => {
            console.error('Error:');
            console.error(error);
        });
    isRunning = false;
}
