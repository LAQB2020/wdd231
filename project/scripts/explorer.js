const componentsContainer = document.querySelector("#components-container");

const searchInput = document.querySelector("#component-search");

const filterButtons = document.querySelectorAll(".filter-button");

const modal = document.querySelector("#component-details");

const modalContent = document.querySelector("#modal-component-content");

const closeModalButton = document.querySelector("#close-modal");

let components = [];

let currentFilter = "all";


// Get component data from JSON
async function getComponents() {

    try {

        const response = await fetch("./data/components.json");

        if (!response.ok) {
            throw new Error("Could not load component data.");
        }

        const data = await response.json();

        components = data.components;

        displayComponents(components);

    } catch (error) {

        console.error("Error:", error);

        componentsContainer.innerHTML = `
            <p class="error-message">
                Sorry, the components could not be loaded.
            </p>
        `;
    }
}


// Display component cards
function displayComponents(componentList) {

    componentsContainer.innerHTML = "";

    if (componentList.length === 0) {

        componentsContainer.innerHTML = `
            <p class="no-results">
                No components were found.
            </p>
        `;

        return;
    }


    componentList.forEach(component => {

        const card = document.createElement("article");

        card.classList.add("component-card");


        card.innerHTML = `
            <img
                src="./images/${component.image}"
                alt="${component.name}"
                loading="lazy"
                width="400"
                height="300"
            >

            <div class="component-card-content">

                <p class="component-category">
                    ${component.category}
                </p>

                <h2>${component.name}</h2>

                <p>
                    <strong>Part Number:</strong>
                    ${component.partNumber}
                </p>

                <p>
                    <strong>Aircraft:</strong>
                    ${component.aircraftApplication}
                </p>

                <p>
                    <strong>Manufacturer:</strong>
                    ${component.manufacturer}
                </p>

                <button
                    type="button"
                    class="details-button"
                    data-id="${component.id}"
                >
                    View Details
                </button>

            </div>
        `;


        componentsContainer.appendChild(card);

    });
}


// Filter components
function filterComponents() {

    const searchTerm = searchInput.value.toLowerCase().trim();


    const filteredComponents = components.filter(component => {

        const matchesCategory =
            currentFilter === "all" ||
            component.category === currentFilter;


        const matchesSearch =
            component.name.toLowerCase().includes(searchTerm) ||
            component.partNumber.toLowerCase().includes(searchTerm) ||
            component.manufacturer.toLowerCase().includes(searchTerm);


        return matchesCategory && matchesSearch;

    });


    displayComponents(filteredComponents);
}


// Filter button events
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentFilter = button.dataset.filter;


        filterButtons.forEach(button => {
            button.classList.remove("active");
        });


        button.classList.add("active");


        filterComponents();

    });

});


// Search event
searchInput.addEventListener("input", () => {

    filterComponents();

});


// Open modal
componentsContainer.addEventListener("click", event => {

    if (!event.target.classList.contains("details-button")) {
        return;
    }


    const componentId = event.target.dataset.id;


    const selectedComponent = components.find(
        component => component.id === componentId
    );


    if (selectedComponent) {
        showComponentDetails(selectedComponent);
    }

});


// Display modal information
function showComponentDetails(component) {

    const materials = component.materials
        .map(material => `<li>${material}</li>`)
        .join("");


    modalContent.innerHTML = `
        <img
            src="./images/${component.image}"
            alt="${component.name}"
            width="500"
            height="350"
        >

        <p class="component-category">
            ${component.category}
        </p>

        <h2>${component.name}</h2>

        <p>
            <strong>Part Number:</strong>
            ${component.partNumber}
        </p>

        <p>
            <strong>Aircraft Application:</strong>
            ${component.aircraftApplication}
        </p>

        <p>
            <strong>Landing Gear System:</strong>
            ${component.landingGearSystem}
        </p>

        <p>
            <strong>Manufacturer:</strong>
            ${component.manufacturer}
        </p>

        <p>
            <strong>Function:</strong>
            ${component.function}
        </p>

        <p>
            <strong>Description:</strong>
            ${component.description}
        </p>

        <h3>Materials</h3>

        <ul>
            ${materials}
        </ul>
    `;


    modal.showModal();

}


// Close modal
closeModalButton.addEventListener("click", () => {

    modal.close();

});


// Close modal when clicking outside the content
modal.addEventListener("click", event => {

    if (event.target === modal) {
        modal.close();
    }

});


// Load components when page loads
getComponents();