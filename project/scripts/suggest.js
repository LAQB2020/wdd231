const form = document.querySelector("#component-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const componentRequest = {
        userName: document.querySelector("#user-name").value,
        email: document.querySelector("#email").value,
        componentName: document.querySelector("#component-name").value,
        aircraft: document.querySelector("#aircraft").value,
        landingGear: document.querySelector("#landing-gear").value,
        manufacturer: document.querySelector("#manufacturer").value,
        partNumber: document.querySelector("#part-number").value,
        function: document.querySelector("#function").value,
        description: document.querySelector("#description").value
    };

    localStorage.setItem(
        "componentRequest",
        JSON.stringify(componentRequest)
    );

    window.location.href = "thankyou.html";
});