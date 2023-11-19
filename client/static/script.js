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

// Select the elements you want to animate
const elements = document.querySelectorAll('.animate');

// Define the options for the Intersection Observer
const observerOptions = {
  root: null, // Use the viewport as the root
  rootMargin: '0px',
  threshold: 0.1 // Trigger the callback when 10% of the element is visible
};

// Define the callback for the Intersection Observer
const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    // If the element is visible, add the 'active' class
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Stop observing the element
      observer.unobserve(entry.target);
    } else {
      // If the element is not visible, remove the 'active' class
      entry.target.classList.remove('active');
    }
  });
};

// Create the Intersection Observer
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Start observing the elements
elements.forEach(element => observer.observe(element));
