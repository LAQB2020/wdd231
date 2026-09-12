const members = './data/members.json';
const membersContainer = document.querySelector('.members-container');

const listButton = document.querySelector('#list');
const gridButton = document.querySelector('#grid');

let membersData = [];

async function getMembersData() {
    const response = await fetch(members);
    membersData = await response.json();

    displayMembers(membersData);
}

const displayMembers = (members) => {
    membersContainer.innerHTML = '';

    members.forEach((member) => {

        const membersCard = document.createElement('div');
        membersCard.classList.add('member-card');

        membersCard.innerHTML = `
            <img src="./images/${member.img}" alt="${member.name}" loading="lazy">

            <div class="member-info">
                <h2>${member.name}</h2>

                <p class="category">${member.category}</p>

                <p class="phone">${member.phoneNumber}</p>

                <p class="address">${member.address}</p>

                <p class="description">${member.description}</p>

                <p class="membership">${member.membershipName} Membership</p>

                <a href="${member.url}" target="_blank">Visit Website</a>
            </div>
        `;

        membersContainer.appendChild(membersCard);
    });
};


// Cambiar a vista de lista
listButton.addEventListener('click', () => {
    membersContainer.classList.add('list-view');
    membersContainer.classList.remove('grid-view');
});


// Cambiar a vista de grid
gridButton.addEventListener('click', () => {
    membersContainer.classList.add('grid-view');
    membersContainer.classList.remove('list-view');
});


getMembersData();

