import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import './Message.scss';

const Message = ({ message }) => {
    return (
        <div className={`message ${message.sender === 'you' ? 'you' : 'send'} ${message.isNew ? 'new-message' : ''}`}>
            <div className="message-content">
                {message.image ? (
                    <img src={message.image} alt="Image" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                ) : (
                    <p>{message.text}</p>
                )}
                <div className="message-info">
                    <span className="message-time">
                        {new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {message.sender === 'you' && (
                        <span className="message-status">
                            {message.status === 'read' ? <DoneAllIcon /> : <DoneIcon />}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Message;
