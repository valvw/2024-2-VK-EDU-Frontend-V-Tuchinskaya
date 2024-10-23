import React, { useEffect, useState, useRef } from 'react';
import './PageChat.scss';
import AddIcon from '@mui/icons-material/Add';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorageUtils';
import Message from '../../components/Message/Message';
import { addMessage } from '../../utils/messageUtils';



const PageChat = ({ currentChatId, chats, setChats }) => {
    const [messageInput, setMessageInput] = useState('');
    const messagesContainerRef = useRef(null);
    const imageInputRef = useRef(null);

    useEffect(() => {
        const savedChats = getFromLocalStorage('chats');
        if (savedChats) {
            setChats(savedChats);
        }
    }, [setChats]);

    
    useEffect(() => {
        if (currentChatId) {
            const updatedChats = chats.map(chat => {
                if (chat.id === currentChatId) {
                    return {
                        ...chat,
                        messages: chat.messages.map(message => ({
                            ...message,
                            status: message.sender !== 'you' && message.status === 'unread' ? 'read' : message.status,
                        })),
                    };
                }
                return chat;
            });
    
            if (JSON.stringify(updatedChats) !== JSON.stringify(chats)) {
                setChats(updatedChats);
                saveToLocalStorage('chats', updatedChats);
            }
        }
        scrollToBottom();
    }, [currentChatId, chats, setChats]);


    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    const handleSendMessage = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && messageInput.trim()) {
            e.preventDefault();
            addMessage(chats, setChats, currentChatId, messageInput);
            setMessageInput('');
        }
    };


    const renderMessages = () => {
        const chat = chats.find(chat => chat.id === currentChatId);
        if (!chat || !chat.messages.length) {
            return null;
        }

        return chat.messages.slice().reverse().map((message) => (
            <Message
                key={message.id}
                message={message}
            />
        ));
    };

    
    return (
        <>
            <div className="messages-container" ref={messagesContainerRef}>
                <div className="messages">
                    {renderMessages()}
                </div>
            </div>
            <div className="input-container" style={{ display: 'flex' }}>
                <textarea
                    id="message-input"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleSendMessage}
                    placeholder="Сообщение..."
                    rows="1"
                />
                <AddIcon onClick={() => imageInputRef.current.click()} style={{ cursor: 'pointer' }} />
                <input
                    type="file"
                    ref={imageInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                />
            </div>
        </>
    );
};

export default PageChat;
