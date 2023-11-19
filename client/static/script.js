<<<<<<< HEAD
let count = 0;
let arr = [];


document.querySelector('.search-box a').addEventListener('click', function(e) {
    e.preventDefault();
    var inputValue = document.querySelector('.search-box input').value;
    if (count == 0) {
        var data = { story: inputValue, context: "none", userInput: "none" }; // This is the data we want to send in JSON format
    } if (count == 5) {
        var data = { story: inputValue, context: "none", userInput: "none" }; // This is the data we want to send in JSON format
    }

    // i want the data to be sent to the server in the format of { story (string): "inputValue"",
    // (where inputValue is the first value of the user response), context (string): "context" (where context is the last 5 api return requests, if there is 5), (string) userInput: "current user input"}
    // the server will then return the next api request, which will be displayed on the screen
    var data = { story: inputValue }; // This is the data we want to send in JSON format

=======
let boxContainer = document.querySelector('#search-box');


function sendStoryPrompt() {
    let data = {
        story: document.getElementById('story').value,
        context: [],
        text: ""
    }
>>>>>>> 401304174fcb5c9d6b54afdc6a37e90c5cb13e33

    fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
<<<<<<< HEAD
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        count++;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});


=======
        .then(response => response.json())
        .then(data => {
            console.log('Success:');
            console.log(data);
            document.createElement('p').innerHTML = data.text;

        })
        .catch((error) => {
            console.error('Error:');
            console.error(error);
        });
}
>>>>>>> 401304174fcb5c9d6b54afdc6a37e90c5cb13e33
