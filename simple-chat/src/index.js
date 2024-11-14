import './index.scss';
import './components/chatList.js';
import { сlearStorageButton } from './components/clearStorage.js';


document.addEventListener('DOMContentLoaded', () => {
    сlearStorageButton('clear-storage', 'messages');
});
