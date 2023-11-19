function sendStoryResponse() {
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

}