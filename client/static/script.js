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


    fetch('/api', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        count++;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});


