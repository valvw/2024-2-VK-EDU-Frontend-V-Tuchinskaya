import React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import './ClearStorageButton.scss';

const ClearStorageButton = ({ onClear }) => {
    const handleClearStorage = () => {
        onClear();
        alert('Все сообщения удалены');
    };

    return (
        <button id="clear-storage" className="clear-btn" onClick={handleClearStorage}>
            <RefreshIcon />
        </button>
    );
};

export default ClearStorageButton;
