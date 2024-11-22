

document.addEventListener('DOMContentLoaded', function () { 
    const toggle = document.getElementById('adBlockToggle');
    const statusText = document.getElementById('status');

    // Check the initial state of the ad blocker from localStorage
    const isAdBlockActive = localStorage.getItem('adBlockerStatus') === 'active';

    // Set initial toggle state based on the stored value
    toggle.checked = isAdBlockActive;
    statusText.textContent = isAdBlockActive ? 'Ad Blocker is ON' : 'Ad Blocker is OFF';

    // Ensure the background and UI states are consistent on load
    chrome.runtime.sendMessage({ action: isAdBlockActive ? 'enable' : 'disable' });

    // Add event listener to the toggle switch
    toggle.addEventListener('change', function () {
        if (toggle.checked) {
            // Enable the ad blocker
            localStorage.setItem('adBlockerStatus', 'active');
            statusText.textContent = 'Ad Blocker is ON';

            // Send a message to background.js to enable blocking
            chrome.runtime.sendMessage({ action: 'enable' }, function(response) {
                console.log(response.status);  // Log response for debugging
            });
        } else {
            // Disable the ad blocker
            localStorage.setItem('adBlockerStatus', 'inactive');
            statusText.textContent = 'Ad Blocker is OFF';

            // Send a message to background.js to disable blocking
            chrome.runtime.sendMessage({ action: 'disable' }, function(response) {
                console.log(response.status);  // Log response for debugging
            });
        }
    });
});



