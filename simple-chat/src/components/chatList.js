import { loadChatMessages } from './chatItem';
import { updateHeader } from './topBar';

export const chats = [
    {
        id: 1,
        username: "John Doe",
        messageCount: 1,
        messages: [
            { text: "Привет, как дела?", sender: "you", time: "2024-10-02T11:45:00", status: "read" },
            { text: "Привет, хорошо!", sender: "John", time: "2024-10-01T11:57:00", status: "unread" }
        ]
    },
    {
        id: 2,
        username: "Jane Doe Jane Doe Jane Doe Jane Doe",
        messageCount: 0,
        messages: [
            { text: "Привет, как дела?", sender: "you", time: "2024-09-30T12:00:00", status: "read" },
            { text: "Привет, хорошо!", sender: "Jane", time: "2024-09-30T12:05:00", status: "read" }
        ]
    }
];

export function initializeChats() {
    const storedChats = localStorage.getItem('chats');
    if (!storedChats) {
        localStorage.setItem('chats', JSON.stringify(chats));
    }
}

initializeChats();



const sortChatsByTime = () => {
    chats.sort((a, b) => {
        const messageA = a.messages[a.messages.length - 1].time;
        const messageB = b.messages[b.messages.length - 1].time;
        return new Date(messageB) - new Date(messageA); 
    });
};

const createChatList = () => {
    const chatContainer = document.getElementById('chat-list');
    chatContainer.innerHTML = '';

    sortChatsByTime();


    const storedChats = JSON.parse(localStorage.getItem('chats')) || [];

    if (storedChats.length === 0) {
        chatContainer.innerHTML = '';
        return;
    }


    chats.forEach(({ id, username, messageCount, messages }) => {
        const { text = 'Image', time, status } = messages[messages.length - 1] || {};

        const formattedTime = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const chatItem = document.createElement('div');
        chatItem.classList.add('chat-item');

        const displayedUsername = username.split(' ').slice(0, 2).join(' ');

        chatItem.innerHTML = `
            <span class="material-icons chat-img">account_circle</span>
            <div class="chat-info">
                <div class="chat-name">${displayedUsername}</div>
                <div class="chat-last-message">${text}</div>
            </div>
            <div class="chat-status">
                <div class="status-time">
                    <span class="message-status material-icons">${status === 'read' ? 'done_all' : 'done'}</span>
                    <span class="message-time">${formattedTime}</span>
                </div>
                ${messageCount > 0 ? `<div class="message-count">${messageCount}</div>` : ''}
            </div>
        `;

        chatItem.addEventListener('click', () => switchToChatScreen(id));

        chatContainer.appendChild(chatItem);
    });
};

const switchToChatScreen = (chatId) => {
    const chat = chats.find(({ id }) => id === chatId);

    updateHeader(true, chat);

    switchVisibility('chat-list', false);
    switchVisibility('floating-button', false);
    switchVisibility('messages-container', true, 'flex');
    switchVisibility('input-container', true, 'flex');

    localStorage.setItem('currentChatId', chatId);
    loadChatMessages(chatId);
};

export const backToChatListScreen = () => {
    updateHeader(false);
    createChatList();

    switchVisibility('chat-list', true, 'block');
    switchVisibility('floating-button', true, 'flex');
    switchVisibility('messages-container', false);
    switchVisibility('input-container', false);
};

const switchVisibility = (elementId, isVisible, displayType = 'none') => {
    const element = document.getElementById(elementId) || document.querySelector(`.${elementId}`);
    if (element) {
        element.style.display = isVisible ? displayType : 'none';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    createChatList();  
    updateHeader(false);
});
