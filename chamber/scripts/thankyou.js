
// Get the submitted form data from the URL
const params = new URLSearchParams(window.location.search);

// Display the submitted information
document.querySelector("#display-first-name").textContent =
    params.get("first-name") || "Not provided";

document.querySelector("#display-last-name").textContent =
    params.get("last-name") || "Not provided";

document.querySelector("#display-email").textContent =
    params.get("email") || "Not provided";

document.querySelector("#display-phone").textContent =
    params.get("phone") || "Not provided";

document.querySelector("#display-organization").textContent =
    params.get("organization") || "Not provided";

// Get the timestamp from the form
const timestamp = params.get("timestamp");

if (timestamp) {
    const date = new Date(timestamp);

    document.querySelector("#display-timestamp").textContent =
        date.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short"
        });
} else {
    document.querySelector("#display-timestamp").textContent =
        "Not provided";
}
