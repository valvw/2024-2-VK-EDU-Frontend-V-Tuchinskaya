import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FloatingButton from '../../components/Button/Button';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageUtils'; 
import './PageChatList.scss';
import CreateChatForm from '../../components/CreateChatForm/CreateChatForm';



const PageChatList = ({ openChat, searchQuery }) => {
    const [chats, setChats] = useState([]);
    const [isCreatingChat, setIsCreatingChat] = useState(false);

    
    useEffect(() => {
        const savedChats = getFromLocalStorage('chats'); 

        if (savedChats) {
            setChats(savedChats); 
        }
    }, []);


    const handleFloatingButtonClick = () => {
        setIsCreatingChat(true);
    };


    const handleCreateChat = (chatName) => {
        const newChat = {
            id: Date.now(),
            username: chatName,
            messageCount: 0,
            messages: [] 
        };
    
        setChats((prevChats) => {
            const updatedChats = [...prevChats, newChat];
            saveToLocalStorage('chats', updatedChats); 
            return updatedChats;
        });
    
        setIsCreatingChat(false);
        openChat(newChat.id);
    };


    const sortedChats = chats.slice().sort((a, b) => {
        const lastMessageA = a.messages[a.messages.length - 1];
        const lastMessageB = b.messages[b.messages.length - 1];

        const timeA = lastMessageA ? new Date(lastMessageA.time).getTime() : 0;
        const timeB = lastMessageB ? new Date(lastMessageB.time).getTime() : 0;

        return timeB - timeA;
    });


    const filteredChats = sortedChats.filter(chat => 
        chat.username.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <>
            <div id="chat-list" className="chat-list" style={{ display: 'block' }}>
                {filteredChats.map(chat => {
                    const lastMessage = chat.messages[chat.messages.length - 1];
                    const unreadCount = chat.messages.filter(msg => msg.status === 'unread' && msg.sender !== 'you').length;

                    return (
                        <div key={chat.id} className="chat-item" onClick={() => openChat(chat.id)}>
                            <AccountCircleIcon />
                            <div className="chat-info">
                                <div className="chat-name">{chat.username}</div>
                                <div className="chat-last-message">
                                    {lastMessage ? lastMessage.text : 'Нет сообщений'}
                                </div>
                            </div>
                            <div className="chat-status">
                                <div className="status-time">
                                    {lastMessage && (
                                        <>
                                            {lastMessage.status === 'read' ? <DoneAllIcon /> : <DoneIcon />}
                                            <span className="message-time">
                                                {new Date(lastMessage.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </>
                                    )}
                                </div>
                                {unreadCount > 0 && (
                                    <div className="message-count">
                                        {unreadCount}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        
            {isCreatingChat && <CreateChatForm onCreateChat={handleCreateChat} onClose={() => setIsCreatingChat(false)} />} {}
            <FloatingButton onClick={handleFloatingButtonClick} /> 
        </>
    );
};

export default PageChatList;
