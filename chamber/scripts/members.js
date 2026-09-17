const membersURL = "data/members.json";

async function getMembers() {
    try {
        const response = await fetch(membersURL);

        if (!response.ok) {
            throw new Error("Could not fetch member data.");
        }

        const data = await response.json();

        displaySpotlights(data);

    } catch (error) {
        console.error("Error loading members:", error);
    }
}

function displaySpotlights(members) {

    const spotlightContainer = document.querySelector("#spotlight-container");

    if (!spotlightContainer) {
        return;
    }

    // Only Silver and Gold members
    const eligibleMembers = members.filter(
        member => member.membership === 2 || member.membership === 3
    );

    // Shuffle members randomly
    const shuffledMembers = [...eligibleMembers].sort(
        () => Math.random() - 0.5
    );

    // Select 2 or 3 members randomly
    const numberOfSpotlights = Math.random() < 0.5 ? 2 : 3;

    const selectedMembers = shuffledMembers.slice(
        0,
        numberOfSpotlights
    );

    spotlightContainer.innerHTML = "";

    selectedMembers.forEach(member => {

        const card = document.createElement("article");

        const membershipLevel =
            member.membership === 3
                ? "Gold Member"
                : "Silver Member";

        card.classList.add("spotlight-card");

        card.innerHTML = `
            <img 
                src="./images/${member.img}" 
                alt="${member.name} logo" 
                loading="lazy"
            >

            <h3>${member.name}</h3>

            <p><strong>${membershipLevel}</strong></p>

            <p>${member.address}</p>

            <p>${member.phoneNumber}</p>

            <a 
                href="${member.url}" 
                target="_blank" 
                rel="noopener"
            >
                Visit Website
            </a>
        `;

        spotlightContainer.appendChild(card);
    });
}

getMembers();