const componentDetails = document.querySelector("#component-details");

const savedRequest = localStorage.getItem("componentRequest");

if (savedRequest) {

    const componentRequest = JSON.parse(savedRequest);

    componentDetails.innerHTML = `
        <h2>${componentRequest.componentName}</h2>

        <p>
            <strong>Submitted by:</strong>
            ${componentRequest.userName}
        </p>

        <p>
            <strong>Email:</strong>
            ${componentRequest.email}
        </p>

        <p>
            <strong>Aircraft Application:</strong>
            ${componentRequest.aircraft}
        </p>

        <p>
            <strong>Landing Gear System:</strong>
            ${componentRequest.landingGear}
        </p>

        <p>
            <strong>Manufacturer:</strong>
            ${componentRequest.manufacturer}
        </p>

        <p>
            <strong>Part Number:</strong>
            ${componentRequest.partNumber || "Not provided"}
        </p>

        <p>
            <strong>Function:</strong>
            ${componentRequest.function}
        </p>

        <p>
            <strong>Additional Information:</strong>
            ${componentRequest.description || "None provided"}
        </p>
    `;

} else {

    componentDetails.innerHTML = `
        <p>No component request was found.</p>
    `;
}