// Watch out for any changes in tabs
browser.tabs.onUpdated.addListener(tabUpdated);
browser.tabs.onActivated.addListener(tabActivated);
browser.tabs.onRemoved.addListener(tabRemoved);
browser.tabs.onMoved.addListener(tabMoved);
browser.windows.onRemoved.addListener(windowRemoved);

// Function to send a message
function sendMessage(msg, details) {
    browser.runtime.sendMessage({
        msg: msg,
        details: details
    });
}

function tabActivated(activeInfo) {
    sendMessage("ACTIVE_TAB_CHANGED", {
        windowId: activeInfo.windowId,
        tabId: activeInfo.tabId
    });
}

function tabUpdated(tabId, changeInfo, tab) {
    if (changeInfo.favIconUrl !== undefined) {
        sendMessage("TAB_FAV_ICON_CHANGED", {
            tabId: tabId,
            favIconUrl: changeInfo.favIconUrl
        });
    }
    if (changeInfo.pinned !== undefined) {
        sendMessage("TAB_PINNED_STATUS_CHANGED", {
            tabId: tabId,
            pinned: changeInfo.pinned
        });
    }
    if (changeInfo.title !== undefined) {
        sendMessage("TAB_TITLE_CHANGED", {
            tabId: tabId,
            title: changeInfo.title
        });
    }
}

function tabRemoved(tabId, removeInfo) {
    sendMessage("TAB_REMOVED", {
        tabId: tabId, 
        windowId: removeInfo.windowId,
        windowClosing: removeInfo.isWindowClosing
    });
}

function tabMoved(tabId, moveInfo) {
    sendMessage("TAB_MOVED", {
        tabId: tabId,
        windowId: moveInfo.windowId,
        toIndex: moveInfo.toIndex
    });
}

function windowRemoved(windowId) {
    sendMessage("WINDOW_REMOVED", {
        windowId: windowId
    });
}
