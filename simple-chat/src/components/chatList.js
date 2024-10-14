import { loadChatMessages } from './chatItem';
import { updateHeader} from './topBar';


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
        username: "Jane Doe Jane Doe Jane Doe",
        messageCount: 0,
        messages: [
            { text: "Привет, как дела?", sender: "you", time: "2024-09-30T12:00:00", status: "read" },
            { text: "Привет, хорошо!", sender: "Jane", time: "2024-09-30T12:05:00", status: "read" }
        ]
    }
];

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

    chats.forEach(({ id, username, messageCount, messages }) => {
        const { text, time, status } = messages[messages.length - 1];

        const formattedTime = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const chatItem = document.createElement('div');
        chatItem.classList.add('chat-item');

        chatItem.innerHTML = `
            <span class="material-icons chat-img">account_circle</span>
            <div class="chat-info">
                <div class="chat-name">${username}</div>
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

    document.getElementById("chat-list").style.display = "none";
    document.querySelector(".floating-button").style.display = "none";

    document.getElementById("messages-container").style.display = "flex";
    document.querySelector(".input-container").style.display = "flex";

    localStorage.setItem('currentChatId', chatId);

    loadChatMessages(chatId);
};

export const backToChatListScreen = () => {
    updateHeader(false);
    createChatList();

    document.getElementById("chat-list").style.display = "block";
    document.querySelector(".floating-button").style.display = "flex";

    document.getElementById("messages-container").style.display = "none";
    document.querySelector(".input-container").style.display = "none";
};


document.addEventListener('DOMContentLoaded', () => {
    createChatList();  
    updateHeader(false);
});