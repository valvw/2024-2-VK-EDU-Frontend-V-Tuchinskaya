import React, { useState } from 'react';
import './CreateChatForm.scss';


const CreateChatForm = ({ onCreateChat, onClose }) => {
    const [chatName, setChatName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (chatName.trim()) {
            onCreateChat(chatName); 
            setChatName(''); 
            onClose();
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }; 

    return (
        <div className="create-chat-overlay" onClick={handleOverlayClick}> {}
            <form className="create-chat-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Введите имя чата"
                    value={chatName}
                    onChange={(e) => setChatName(e.target.value)}
                    required
                />
                <button type="submit">Создать чат</button>
            </form>
        </div>
    );
};

export default CreateChatForm;
