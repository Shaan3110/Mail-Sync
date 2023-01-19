chrome.tabs.onUpdated.addListener((tabId,tab) => {
    if(tab.url && (tab.url.includes("internshala") || tab.url.includes("meet.google.com"))) {
        
    }
})