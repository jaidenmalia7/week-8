window.addEventListener('load', function () {
    let socket = io();
    socket.on('connect', function () {
        console.log("Connected");
    });

    let chatBox = document.getElementById('chat-box-msgs');
    let nameInput = document.getElementById('name-input');
    let msgInput = document.getElementById('msg-input');
    let sendButton = document.getElementById('send-button');

    // Generate a random color for the user
    let userColor = getRandomColor();

    socket.on('msg', function (data) {
        console.log("Message arrived!");
        console.log(data);

        // Create a message element without boxes
        let msgEl = document.createElement('p');
        msgEl.innerHTML = '<span style="color:' + data.color + ';">' + data.name + ':</span> ' + data.msg;

        chatBox.appendChild(msgEl);
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    sendButton.addEventListener('click', function () {
        sendMessage();
    });

    // Listen for the "Enter" key press in the message input field
    msgInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            sendMessage();
        }
    });

    // Function to send the message
    function sendMessage() {
        let curName = nameInput.value;
        let curMsg = msgInput.value;

        if (curName && curMsg) {
            let msgObj = { "name": curName, "msg": curMsg, "color": userColor };

            socket.emit('msg', msgObj);

            // Clear the message input field
            msgInput.value = "";
        }
    }

    // Function to generate a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
