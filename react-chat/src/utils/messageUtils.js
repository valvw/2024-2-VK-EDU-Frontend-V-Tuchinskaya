import { saveToLocalStorage } from './localStorageUtils';


export const addMessage = (chats, setChats, chatId, content, scrollToBottom, isImage = false) => {
    const newMessage = {
        id: Date.now(),
        [isImage ? 'image' : 'text']: content,
        sender: 'you',
        time: new Date().toISOString(),
        status: 'unread',
        isNew: true
    };

    const updatedChats = chats.map(chat =>
        chat.id === chatId
            ? { ...chat, messages: [...chat.messages, newMessage] }
            : chat
    );

    setChats(updatedChats); 
    saveToLocalStorage('chats', updatedChats);

    if (typeof scrollToBottom === 'function') {
        setTimeout(scrollToBottom, 100); 
    }

    setTimeout(() => {
        const updatedChatsWithNoNew = updatedChats.map(chat =>
            chat.id === chatId
                ? {
                      ...chat,
                      messages: chat.messages.map(msg =>
                          msg.id === newMessage.id ? { ...msg, isNew: false } : msg
                      ),
                  }
                : chat
        );

        setChats(updatedChatsWithNoNew);
        saveToLocalStorage('chats', updatedChatsWithNoNew);
    }, 500);
};
