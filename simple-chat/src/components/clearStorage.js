

export function сlearStorageButton(buttonId, messagesContainerId, createChatList) {
    const button = document.getElementById(buttonId);
    const messagesContainer = document.getElementById(messagesContainerId);

    if (button && messagesContainer) {
        button.addEventListener('click', function() {
            localStorage.clear();
            messagesContainer.innerHTML = '';
            alert('Все сообщения удалены');

            if (typeof createChatList === 'function') {
                createChatList();
            }
        });
    }
}