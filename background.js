let adBlockerEnabled = false;  // Variable to track whether the ad blocker is enabled or not

const adBlockRules = [
    {
        "id": 1,
        "priority": 1,
        "action": { "type": "block" },
        "condition": { "urlFilter": "*://*googleadservices.com/*" }
    },
    {
        "id": 2,
        "priority": 1,
        "action": { "type": "block" },
        "condition": { "urlFilter": "*://*doubleclick.net/*" }
    }
];

// Function to enable ad-blocking rules
function enableAdBlock() {
    if (!adBlockerEnabled) {
        chrome.declarativeNetRequest.updateDynamicRules({
            addRules: adBlockRules
        });
        adBlockerEnabled = true;
        console.log('Ad Blocker Enabled');
    }
}

// Function to disable ad-blocking rules
function disableAdBlock() {
    if (adBlockerEnabled) {
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: adBlockRules.map(rule => rule.id)
        });
        adBlockerEnabled = false;
        console.log('Ad Blocker Disabled');
    }
}

// Listen for messages from the popup to enable or disable the ad blocker
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'enable') {
        enableAdBlock();
    } else if (message.action === 'disable') {
        disableAdBlock();
    }
    sendResponse({ status: "received" }); // Send a response back to confirm
});
