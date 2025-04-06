const elements = {
    temp: document.getElementById('temp'),
    hum: document.getElementById('hum'),
    smoke: document.getElementById('smoke'),
    motion: document.getElementById('motion'),
    motion_indicator: document.getElementById('motion_indicator'),
    last_updated: document.getElementById('last_updated'),
    connection_status: document.getElementById('connection_status'),
    cards: {
        temp: document.getElementById('temp_card'),
        hum: document.getElementById('hum_card'),
        smoke: document.getElementById('smoke_card')
    }
};

let last_data = null;
let connection_ok = true;

function updateCardState(card, value) {
    const dangerThreshold = parseInt(card.dataset.danger);
    card.className = 'block';
    if (value >= dangerThreshold) card.classList.add('alert');
}

function processData(data) {
    if (data === null) {
        if (connection_ok) {
            connection_ok = false;
            connection_status.innerHTML = 'Disconnected <span class="status_indicator alert"></span>';
        }
        return;
    }

    if (!connection_ok) {
        connection_ok = true;
        connection_status.innerHTML = 'Connected <span class="status_indicator"></span>';
    }

    last_data = data;

    elements.temp.textContent = data.temp.toFixed(1);
    elements.hum.textContent = data.hum.toFixed(0);
    elements.smoke.textContent = data.smoke.toFixed(0);
    elements.motion.textContent = data.motion ? "Detected" : "No motion";
    elements.motion_indicator.className = data.motion ? "status_indicator" : "status_indicator inactive";

    updateCardState(elements.cards.temp, data.temp);
    updateCardState(elements.cards.hum, data.hum);
    updateCardState(elements.cards.smoke, data.smoke);

    // Simplified last updated line
    elements.last_updated.innerText = 'Last updated: ' + new Date().toLocaleTimeString();
}

function fetchData() {
    const mock_data = {
        temp: Math.random() * 15 + 20,  // Simulate temperature between 20-35°C
        hum: Math.random() * 30 + 40,   // Simulate humidity between 40-70%
        smoke: Math.random() * 60,      // Simulate smoke level between 0-60ppm
        motion: Math.random() > 0.7     // 30% chance of motion
    };
    processData(mock_data);
}

fetchData();
setInterval(fetchData, 5000);
window.addEventListener('focus', fetchData);