document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('adBlockToggle');
    const statusText = document.getElementById('status');

    // Check if the ad blocker is active in localStorage
    const isAdBlockActive = localStorage.getItem('adBlockerStatus') === 'active';

    // Set initial toggle state based on the stored value
    toggle.checked = isAdBlockActive;
    statusText.textContent = isAdBlockActive ? 'Ad Blocker is ON' : 'Ad Blocker is OFF';

    // Add event listener to the toggle switch
    toggle.addEventListener('change', function () {
        if (toggle.checked) {
            // Enable the ad blocker
            localStorage.setItem('adBlockerStatus', 'active');
            statusText.textContent = 'Ad Blocker is ON';

            // Enable ad-blocking rules
            chrome.declarativeNetRequest.updateDynamicRules({
                addRules: [{
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
                }]
            });
        } else {
            // Disable the ad blocker
            localStorage.setItem('adBlockerStatus', 'inactive');
            statusText.textContent = 'Ad Blocker is OFF';

            // Remove the blocking rules
            chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: [1, 2]
            });
        }
    });
});
