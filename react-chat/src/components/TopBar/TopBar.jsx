import React, { useState } from 'react';
import './TopBar.scss'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';


const TopBar = ({ currentPage, currentChat, onBack, searchVisible, setSearchVisible, searchQuery, setSearchQuery }) => {
    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };

    return (
        <div className="top-bar">
            <div className="top-bar-header">
                {currentPage === 'chatList' ? (
                    <>
                        <MenuIcon />
                        <div className="bar-info">
                            <div className="main-title-container">
                                <div className="bar-title">Messenger</div>
                            </div>
                        </div>
                        <div className="right-icons">
                            <SearchIcon onClick={toggleSearch} />
                        </div>
                    </>
                ) : (
                    <>
                        <ArrowBackIcon onClick={onBack} />
                        <div className="user-info">
                            <AccountCircleIcon />
                            <div className="username-container">
                                <div className="username">{currentChat?.username}</div>
                                <div className="status">был(а) 2 часа назад</div>
                            </div>
                        </div>
                        <div className="right-icons">
                            <SearchIcon onClick={toggleSearch} />
                            <MoreVertIcon />
                        </div>
                    </>
                )}
            </div>
            {searchVisible && (
                <input
                    type="text"
                    placeholder="Поиск чата..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            )}
        </div>
    );
};

export default TopBar;
