// =========================================================
// CURRENT DATE AND TIME
// =========================================================

const timestamp = document.querySelector("#timestamp");

const currentDate = new Date();

timestamp.value = currentDate.toISOString();


// =========================================================
// MEMBERSHIP MODALS
// =========================================================

const modalLinks = document.querySelectorAll(".modal-link");

modalLinks.forEach((link) => {

    link.addEventListener("click", () => {

        const modalId = link.dataset.modal;

        const modal = document.querySelector(`#${modalId}`);

        modal.showModal();

    });

});


// =========================================================
// CLOSE MODALS
// =========================================================

const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const modal = button.closest("dialog");

        modal.close();

    });

});