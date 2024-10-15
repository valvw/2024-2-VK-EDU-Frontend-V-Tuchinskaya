import './index.scss';

document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('message-input');
    const messagesContainer = document.getElementById('messages');
    const imageInput = document.getElementById('image-input');
    const attachIcon = document.querySelector('.attach-icon');

    const usernameContainer = document.querySelector('.username-container');

    const username = 'Дженнифер Дженнифер';
    const status = 'была 2 часа назад';

    function displayUsername(username) {
        const userName = document.createElement('div');
        userName.classList.add('username');
        userName.textContent = username;

        return userName;
    }

    function createStatus(status) {
        const messageStatus = document.createElement('div');
        messageStatus.classList.add('status');
        messageStatus.textContent = status;
        return messageStatus;
    }

    usernameContainer.appendChild(displayUsername(username));
    usernameContainer.appendChild(createStatus(status));

    loadMessages();

    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && !event.shiftKey && messageInput.value.trim() !== '') {
            event.preventDefault();
            addMessage(messageInput.value.trim(), 'you');
            messageInput.value = '';
        }
    });

    attachIcon.addEventListener('click', function() {
        imageInput.click();
    });

    
    imageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const base64String = event.target.result;
                addMessage(base64String, 'you', true);
            };
            reader.readAsDataURL(file);
        }
    });


    function addMessage(content, sender, isImage = false) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const message = isImage ? { image: content, sender: sender, time: timestamp } : { text: content, sender: sender, time: timestamp };

        saveMessageToLocalStorage(message);
        messagesContainer.innerHTML = '';

        loadMessages();
        scrollToBottom();
    }


    function displayMessage(message) {
        const messageElement = document.createElement('div');
        const senderClass = message.sender === 'you' ? 'you' : 'send';
        messageElement.classList.add('message', senderClass);

        if (message.image) {
            messageElement.innerHTML = `
                <div class="message-content">
                    <img src="${message.image}" alt="Image" style="max-width: 200px; max-height: 200px;">
                    <div class="message-info">
                        <span class="message-time">${message.time}</span>
                        ${message.sender === 'you' ? '<span class="material-icons message-status">done_all</span>' : ''}
                    </div>
                </div>
            `;
        } else {
            const formattedText = message.text.replace(/\n/g, '<br>');
            messageElement.innerHTML = `
                <div class="message-content">
                    <p>${formattedText}</p>
                    <div class="message-info">
                        <span class="message-time">${message.time}</span>
                        ${message.sender === 'you' ? '<span class="material-icons message-status">done_all</span>' : ''}
                    </div>
                </div>
            `;
        }

        messagesContainer.appendChild(messageElement);
    }

    function saveMessageToLocalStorage(message) {
        const messages = getMessagesFromLocalStorage();
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    
    function getMessagesFromLocalStorage() {
        const messages = localStorage.getItem('messages');
        return messages ? JSON.parse(messages) : [];
    }


    function loadMessages() {
        let messages = getMessagesFromLocalStorage();

        if (messages.length === 0) {
            const firstMessage = {
                text: 'Привет!',
                sender: 'Jennifer',
                time: '15:00'
            };
            const secondMessageWithImage = {
                image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII',
                sender: 'Jennifer',
                time: '15:01'
            };

            messages.push(firstMessage, secondMessageWithImage);
            localStorage.setItem('messages', JSON.stringify(messages));
        }

        messages.reverse().forEach(function(message) {
            displayMessage(message);
        });

        scrollToBottom(false);
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});

document.getElementById('clear-storage').addEventListener('click', function() {
    localStorage.clear();
    document.getElementById('messages').innerHTML = '';
    alert('Все сообщения удалены');
});
