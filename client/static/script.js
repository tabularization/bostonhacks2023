function sendStoryPrompt(storyPrompt) {
    console.log("Sending prompt...")
    let data = {
        story: storyPrompt,
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
            console.log('Success!');
            console.log(data["text"]);
            // post to chat
            fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"story": data["text"]})
            })
                .then(response => response.text())
                .then(data => {
                    console.log("Success");
                    // open /chat
                    window.open("/chat", "_self");
                })
                .catch((error) => {
                    console.error('Error:');
                    console.error(error);
                });
        })
        .catch((error) => {
            console.error('Error:');
            console.error(error);
        });
}

function createFantasy() {
    console.log("Creating fantasy...");
    let prompt = "Create the starter to a fantasy choose your own adventure story. Max length 150";
    sendStoryPrompt(prompt);
}

function createSciFi() {
    console.log("Creating sci-fi...");
    let prompt = "Create the starter to a sci-fi choose your own adventure story. Max length 150";
    sendStoryPrompt(prompt);
}

function createHorror() {
    console.log("Creating horror...");
    let prompt = "Create the starter to a horror choose your own adventure story. Max length 150";
    sendStoryPrompt(prompt);
}

function createRomance() {
    console.log("Creating romance...");
    let prompt = "Create the starter to a romance choose your own adventure story. Max length 150";
    sendStoryPrompt(prompt);
}

function createMystery() {
    console.log("Creating mystery...");
    let prompt = "Create the starter to a mystery choose your own adventure story. Max length 150";
    sendStoryPrompt(prompt);
}

function createAdventure() {
    console.log("Creating adventure...");
    let prompt = "Create the starter to an adventure choose your own adventure story. Max length 150";
    sendStoryPrompt(prompt);
}

function customPrompt() {
    let prompt = document.querySelector('#story').value;
    sendStoryPrompt(prompt);
}