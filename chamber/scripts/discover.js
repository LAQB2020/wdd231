import { places } from "../data/places.mjs";


const visitMessage = document.querySelector("#visit-message");

function displayPlaces(places){

    const placesContainer = document.querySelector('.container');

    placesContainer.innerHTML="";

    places.forEach(place => {
        
        const card = document.createElement("div")
        card.classList.add("place-card");

        card.innerHTML = `
        
        <h2>${place.name}</h2> 
        
        <figure> 
            <img src="${place.image}" 
            alt="${place.name}" 
            loading="lazy" width="300"
            height="200" > 
        </figure> 
        
        <address>${place.address}</address> 
        <p>${place.description}</p> 
        <button type="button">Learn More</button> 
        
        `;
    
        placesContainer.appendChild(card);
    });

    

}



function displayVisitMessage() {

const currentVisit = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

if (!lastVisit) {

    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";

} else {

    const timeDifference = currentVisit - Number(lastVisit);
    const daysDifference = Math.floor(
        timeDifference / (1000 * 60 * 60 * 24)
    );

    if (daysDifference < 1) {

        visitMessage.textContent =
            "Back so soon! Awesome!";

    } else if (daysDifference === 1) {

        visitMessage.textContent =
            "You last visited 1 day ago.";

    } else {

        visitMessage.textContent =
            `You last visited ${daysDifference} days ago.`;
    }
}

localStorage.setItem("lastVisit", currentVisit);

}

displayPlaces(places);
displayVisitMessage();
