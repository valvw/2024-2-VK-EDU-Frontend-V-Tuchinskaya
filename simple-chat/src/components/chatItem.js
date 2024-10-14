import { chats } from './chatList';

export function loadChatMessages(chatId) {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; 

    const currentChat = chats.find(chat => chat.id === chatId);

    if (!currentChat?.messages.length) {
        messagesContainer.innerHTML = '<p>No messages</p>';
        return;
    }

    currentChat.messages.forEach(message => {
        if (message.status === 'unread' && message.sender !== 'you') {
            message.status = 'read';
        }

        messagesContainer.prepend(createMessageElement(message));
    });

    currentChat.messageCount && (currentChat.messageCount = 0, saveChatsToLocalStorage());

    scrollToBottom();  
}

function createMessageElement(message) {
    const { sender, image, text, time, status } = message;

    const formattedTime = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const messageElement = document.createElement('div');
    const senderClass = sender === 'you' ? 'you' : 'send';
    messageElement.classList.add('message', senderClass);

    const formattedText = text?.replace(/\n/g, '<br>') || '';

    const messagetxt = image
        ? `<img src="${image}" alt="Image" style="max-width: 200px; max-height: 200px;">`
        : `<p>${formattedText}</p>`;

    messageElement.innerHTML = `
        <div class="message-content">
            ${messagetxt}
            <div class="message-info">
                <span class="message-time">${formattedTime}</span>
                ${sender === 'you' ? `<span class="message-status material-icons">${status === 'read' ? 'done_all' : 'done'}</span>` : ''}
            </div>
        </div>
    `;

    return messageElement;
}

function saveChatsToLocalStorage() {
    localStorage.setItem('chats', JSON.stringify(chats));
}

function addMessage(chatId, messageContent, isImage = false) {
    const currentChat = chats.find(chat => chat.id === chatId);
    if (!currentChat) return;

    const newMessage = {
        [isImage ? 'image' : 'text']: messageContent,
        sender: 'you',
        time: Date.now(),
        status: 'read',
    };

    currentChat.messages.push(newMessage);
    saveChatsToLocalStorage();
    
    const messageElement = createMessageElement(newMessage);
    messageElement.classList.add('new-message');
    const messagesContainer = document.getElementById('messages');
    messagesContainer.prepend(messageElement);

    setTimeout(() => {
        messageElement.classList.remove('new-message');
    }, 500); 
    
    scrollToBottom();
}


document.getElementById('message-input')?.addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && !event.shiftKey && this.value.trim()) {
        event.preventDefault();
        const currentChatId = localStorage.getItem('currentChatId');
        addMessage(parseInt(currentChatId), this.value.trim());
        this.value = '';
    }
});

document.querySelector('.attach-icon')?.addEventListener('click', function () {
    document.getElementById('image-input')?.click();
});

document.getElementById('image-input')?.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const base64String = event.target.result;
            const currentChatId = localStorage.getItem('currentChatId');
            addMessage(parseInt(currentChatId), base64String, true);
        };
        reader.readAsDataURL(file);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const storedChats = localStorage.getItem('chats');
    storedChats && Object.assign(chats, JSON.parse(storedChats));
});

function scrollToBottom() {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
