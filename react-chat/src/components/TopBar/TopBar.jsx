import React, { useState, useEffect } from 'react';
import './TopBar.scss'; 

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';


const TopBar = ({ currentPage, currentChat, onBack }) => {
  return (
    <div className="top-bar">
      {currentPage === 'chatList' ? (
        <>
          <MenuIcon />
          <div className="bar-info">
            <div className="main-title-container">
              <div className="bar-title">Messenger</div>
            </div>
          </div>
          <div className="right-icons">
              <SearchIcon />
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
              <SearchIcon />
              <MoreVertIcon />
          </div>
        </>
      )}
    </div>
  );
};

export default TopBar;