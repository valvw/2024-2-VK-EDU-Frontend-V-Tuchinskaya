import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FloatingButton from '../../components/Button/Button';
import { getFromLocalStorage } from '../../utils/localStorageUtils'; 
import './PageChatList.scss';



const PageChatList = ({ openChat }) => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const savedChats = getFromLocalStorage('chats'); 

        if (savedChats) {
            setChats(savedChats); 
        }
    }, []);

    return (
        <>
        <div id="chat-list" className="chat-list" style={{ display: 'block' }}>
            {chats.map(chat => {
                const lastMessage = chat.messages[chat.messages.length - 1];
                const unreadCount = chat.messages.filter(msg => msg.status === 'unread' && msg.sender !== 'you').length;
                const lastMessageFromSender = chat.messages.slice().reverse().find(msg => msg.sender !== 'you');

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
                            {lastMessageFromSender && (
                            <>
                                {lastMessageFromSender.status === 'read' ? <DoneAllIcon /> : <DoneIcon />}
                                <span className="message-time">
                                    {new Date(lastMessageFromSender.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
        
        <FloatingButton />
        </>
    );
};

export default PageChatList;