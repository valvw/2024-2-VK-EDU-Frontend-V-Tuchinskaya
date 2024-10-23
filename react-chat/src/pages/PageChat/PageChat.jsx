import React, { useEffect, useState, useRef } from 'react';
import './PageChat.scss';
import AddIcon from '@mui/icons-material/Add';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorageUtils';
import Message from '../../components/Message/Message';
import { addMessage } from '../../utils/messageUtils';

const PageChat = () => {
    const [chats, setChats] = useState([]);
    const [currentChatId, setCurrentChatId] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const messagesContainerRef = useRef(null);
    const imageInputRef = useRef(null);

    useEffect(() => {
        const savedChats = getFromLocalStorage('chats');
        if (savedChats) {
            setChats(savedChats);
            if (savedChats.length > 0) {
                setCurrentChatId(savedChats[0].id);
            }
        } else {
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/data/chatsData.json');
            const data = await response.json();
            setChats(data);
            if (data.length > 0) {
                setCurrentChatId(data[0].id);
            }
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    };

    useEffect(() => {
        if (currentChatId) {
            const updatedChats = chats.map(chat => {
                if (chat.id === currentChatId) {
                    return {
                        ...chat,
                        messages: chat.messages.map(message => {
                            return {
                                ...message,
                                status: message.status === 'unread' ? 'read' : message.status
                            };
                        })
                    };
                }
                return chat;
            });
            setChats(updatedChats);
            saveToLocalStorage('chats', updatedChats);
        }
    }, [currentChatId]);

    useEffect(() => {
        scrollToBottom();
    }, [currentChatId, chats]);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    const handleSendMessage = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && messageInput.trim()) {
            e.preventDefault();
            
            if (Array.isArray(chats)) {
                addMessage(chats, setChats, currentChatId, messageInput);
                setMessageInput(''); 
                setTimeout(scrollToBottom, 100); 
            } else {
                console.error('Chats is not an array:', chats);
            }
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                addMessage(currentChatId, reader.result, true);
                setTimeout(scrollToBottom, 100); 
            };
            reader.readAsDataURL(file);
        }
    };

    const renderMessages = () => {
        const chat = chats.find(chat => chat.id === currentChatId);
        if (!chat || !chat.messages.length) {
            return <p>No messages</p>;
        }


        return chat.messages.slice().reverse().map((message, index) => (
            <Message
                    key={message.id}
                    message={message}
                    chats={chats} 
                    setChats={setChats} 
                    chatId={currentChatId} 
                />
        ));
    };

    return (
        <>
            <div className="messages-container" ref={messagesContainerRef}> {}
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
                    onChange={handleImageChange}
                />
            </div>
        </>
    );
};

export default PageChat;
