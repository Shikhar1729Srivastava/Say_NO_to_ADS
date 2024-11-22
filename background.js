



//changed code is here 


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
    // 🚀 Remove existing rules before adding new ones
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: adBlockRules.map(rule => rule.id)  // Remove existing rules
    }, () => {
        // After removing, add the rules
        chrome.declarativeNetRequest.updateDynamicRules({
            addRules: adBlockRules  // Then add new rules
        }).catch(error => console.error('Error adding rules:', error));  // Added error handling
    });
    adBlockerEnabled = true;
    console.log('Ad Blocker Enabled');
}

// Function to disable ad-blocking rules
function disableAdBlock() {
    // 🚀 Remove existing rules when disabling
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: adBlockRules.map(rule => rule.id)  // Remove rules by their IDs
    }).catch(error => console.error('Error removing rules:', error));  // Added error handling
    adBlockerEnabled = false;
    console.log('Ad Blocker Disabled');
}

// Listen for messages from the popup to enable or disable the ad blocker
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'enable') {
        enableAdBlock();
    } else if (message.action === 'disable') {
        disableAdBlock();
    }
    sendResponse({ status: "received" });  // Confirm the message was received
});


