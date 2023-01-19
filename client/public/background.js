chrome.tabs.onUpdated.addListener((tabId,tab) => {
        console.log("background open")
        chrome.tabs.sendMessage(tabId, {
            type: "Open"
        })
})