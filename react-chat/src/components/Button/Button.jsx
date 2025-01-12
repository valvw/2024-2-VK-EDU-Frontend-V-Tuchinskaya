import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import './Button.scss';



const FloatingButton = ({ onClick }) => {
    return (
        <button className="floating-button" onClick={onClick}>
            <AddIcon />
        </button>
    );
};

export default FloatingButton;