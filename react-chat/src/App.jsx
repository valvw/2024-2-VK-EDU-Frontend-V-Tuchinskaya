import React, { useEffect, useState } from 'react'; 
import './App.scss';
import TopBar from './components/TopBar/TopBar';
import PageChatList from './pages/PageChatList/PageChatList';
import PageChat from './pages/PageChat/PageChat';
import ClearStorageButton from './components/ClearStorageButton/ClearStorageButton';
import { getFromLocalStorage, saveToLocalStorage } from './utils/localStorageUtils';
import { addMessage } from './utils/messageUtils';
import chatsData from '../public/data/chatsData.json'; 


const App = () => {
    const [currentChatId, setCurrentChatId] = useState(null);
    const [chats, setChats] = useState([]);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const loadChats = () => {
        const savedChats = getFromLocalStorage('chats');
        if (savedChats && savedChats.length > 0) {
            setChats(savedChats);
        } else {
            setChats(chatsData);
            saveToLocalStorage('chats', chatsData);
        }
    };

    useEffect(() => {
        loadChats();
    }, []);

    const openChat = (chatId) => {
        setCurrentChatId(chatId);
    };

    const backToChatList = () => {
        setCurrentChatId(null);
    };

    const handleSendMessage = (chatId, message) => {
        addMessage(chats, setChats, chatId, message);
    };

    const handleClearStorage = () => {
        setChats([]);
        saveToLocalStorage('chats', []); 
        loadChats(); 
    };

    const currentChat = chats.find((chat) => chat.id === currentChatId);

    return (
        <div className="chat-container">
            <TopBar
                currentPage={currentChatId === null ? 'chatList' : 'chat'}
                currentChat={currentChat}
                onBack={backToChatList}
                searchVisible={searchVisible}
                setSearchVisible={setSearchVisible}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            {currentChatId === null ? (
                <PageChatList 
                    chats={chats} 
                    openChat={openChat} 
                    searchQuery={searchQuery} 
                />
            ) : (
                <PageChat
                    currentChatId={currentChatId}
                    chats={chats}
                    setChats={setChats}
                    onSendMessage={handleSendMessage}
                />
            )}
            <ClearStorageButton onClear={handleClearStorage} />
        </div>
    );
};

export default App;
