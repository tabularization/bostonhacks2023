let boxContainer = document.querySelector('#search-box');


function sendStoryPrompt() {
    let data = {
        story: document.getElementById('story').value,
        context: [],
        text: ""
    }

    fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
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
