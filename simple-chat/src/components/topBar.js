import { backToChatListScreen } from './chatList.js';
import { chats } from './chatList.js';

export function updateHeader(isChatOpen, chat = null) {
    const topBar = document.querySelector('.top-bar');
    
    if (isChatOpen && chat) {

        const displayedUsername = chat.username.length > 18 ? chat.username.slice(0, 18) + '' : chat.username;

        topBar.innerHTML = `
            <span class="material-icons back-button">arrow_back</span>
            <div class="user-info">
                <span class="material-icons">account_circle</span>
                <div class="username-container">
                    <div class="username">${displayedUsername}</div>
                    <div class="status">был(а) 2 часа назад</div>
                </div>
            </div>
            <div class="right-icons">
                <span class="material-icons">search</span>
                <span class="material-icons">more_vert</span>
            </div>
        `;
        
        document.querySelector('.back-button')?.addEventListener('click', backToChatListScreen);
    } else {
        topBar.innerHTML = `
            <span class="material-icons">menu</span>
            <div class="bar-info">
                <div class="main-title-container">
                    <div class="bar-title">Messenger</div>
                </div>
            </div>
            <div class="right-icons">
                <span class="material-icons">search</span>
            </div>
        `;
    }
}

export const initHeader = () => {
    const currentChatId = Number(localStorage.getItem('currentChatId'));

    const chat = chats.find(c => c.id === currentChatId); 
    updateHeader(!!currentChatId, chat);
}
