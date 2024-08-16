// Copy Contract Address
document.getElementById('contract-address').addEventListener('click', () => {
    const contractAddress = document.getElementById('contract-address').textContent.trim();
    navigator.clipboard.writeText(contractAddress).then(() => {
        alert('Contract Address Copied!');
    });
});

// Simulate a loading bar
const loadingProgress = document.querySelector('.loading-progress');
let loadPercentage = 0;

const loadingInterval = setInterval(() => {
    loadPercentage += 1;
    loadingProgress.style.width = `${loadPercentage}%`;

    if (loadPercentage >= 100) {
        clearInterval(loadingInterval);
        document.querySelector('.loading-text').textContent = "Don't wash!";

    }
}, 50);
