document.querySelector('.search-box a').addEventListener('click', function(e) {
    e.preventDefault();
    var inputValue = document.querySelector('.search-box input').value;
    
    var data = { search: inputValue }; // This is the data we want to send in JSON format

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
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
