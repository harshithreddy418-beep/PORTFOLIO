// 1. Data Definitions
const teamData = {
    "MI": {
        fullName: "Mumbai Indians",
        history: "5-time Champions. Known for their 'One Family' culture.",
        players: [
            { name: "Hardik Pandya", role: "All-rounder", history: "Captain who led GT to a title, now returned home to MI." },
            { name: "Jasprit Bumrah", role: "Bowler", history: "The world's best yorker specialist, scouted by MI in 2013." },
            { name: "Suryakumar Yadav", role: "Batter", history: "Ranked No. 1 T20I batter for multiple years." }
        ]
    },
    "CSK": {
        fullName: "Chennai Super Kings",
        history: "The most consistent team in IPL history with 5 trophies.",
        players: [
            { name: "MS Dhoni", role: "Wicketkeeper-Batter", history: "The legendary 'Thala' who led CSK since the inaugural season." },
            { name: "Ruturaj Gaikwad", role: "Batter", history: "The young captain and Orange Cap winner of 2021." },
            { name: "Ravindra Jadeja", role: "All-rounder", history: "The 'Sir' of Indian cricket, famous for his 2023 final heroics." }
        ]
    },
    "RCB": {
        fullName: "Royal Challengers Bengaluru",
        history: "Known for their massive fan base and high-octane batting performances.",
        players: [
            { name: "Virat Kohli", role: "Batter", history: "The highest run-getter in IPL history." },
            { name: "Faf du Plessis", role: "Batter", history: "The experienced captain and opening powerhouse." }
        ]
    },

    "SRH": {
        fullName: "SUNRISERS HYDERABAD",
        history: "Known for their massive fan base and high-octane batting performances.",
        players: [
            { name: "Travies Head", role: "Batter", history: "The highest run-getter in IPL history." },
            { name: "Pat Cummins", role: "Bowler", history: "The experienced captain and opening powerhouse." }
        ]
    }
};

const matches = [
    { id: 1, teams: "CSK vs RCB", venue: "Chepauk", date: "March 22, 2026" },
    { id: 2, teams: "MI vs KKR", venue: "Wankhede", date: "March 23, 2026" },
    { id: 3, teams: "GT vs SRH", venue: "Narendra Modi Stadium", date: "March 24, 2026" }
];

// 2. Navigation Logic
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
    window.scrollTo(0, 0); // Scroll to top when switching
}

// 3. Load Team Cards (Fixed with Click Event)
const teamGrid = document.getElementById('team-grid');
// Use the keys from teamData so every card has data to show
Object.keys(teamData).forEach(teamKey => {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.style.cursor = 'pointer';
    card.innerHTML = `<h3>${teamKey}</h3><p>Click to view squad & history</p>`;
    
    // THE FIX: Adding the click event listener
    card.onclick = () => showTeamDetails(teamKey);
    
    teamGrid.appendChild(card);
});

// 4. Function to Show Team Details
function showTeamDetails(teamKey) {
    const data = teamData[teamKey];
    if (!data) return; // Safety check

    showSection('team-details');

    // Set Header Info
    const header = document.getElementById('team-info-header');
    header.innerHTML = `
        <h1 style="color: var(--primary); margin-top:0;">${data.fullName}</h1>
        <p class="history-text">${data.history}</p>
    `;

    // Set Players
    const playerGrid = document.getElementById('player-grid');
    playerGrid.innerHTML = data.players.map(p => `
        <div class="player-card">
            <span class="role">${p.role}</span>
            <h4>${p.name}</h4>
            <p class="player-bio">${p.history}</p>
        </div>
    `).join('');
}

// 5. Load Schedule & Ticket Dropdown
const scheduleList = document.getElementById('schedule-list');
const matchSelect = document.getElementById('match-select');

matches.forEach(match => {
    const mDiv = document.createElement('div');
    mDiv.style.padding = "15px";
    mDiv.style.borderBottom = "1px solid #333";
    mDiv.innerHTML = `<strong>${match.teams}</strong> - ${match.date} (${match.venue})`;
    scheduleList.appendChild(mDiv);

    const opt = document.createElement('option');
    opt.value = match.teams;
    opt.innerText = match.teams;
    matchSelect.appendChild(opt);
});

// 6. Booking Logic
document.getElementById('ticket-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.getElementById('booking-msg');
    msg.innerHTML = `<p style="color: green; font-weight: bold; margin-top: 10px;">✔ Booking successful for ${matchSelect.value}!</p>`;
    e.target.reset();
});