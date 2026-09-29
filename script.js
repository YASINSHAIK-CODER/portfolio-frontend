const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (event) {

    // Stop normal HTML form submission
    event.preventDefault();

    // Get values from form
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation
    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[A-Za-z0-9]+@[A-Za-z0-9]+(\.[A-Za-z0-9]+)+$/;
    const subjectRegex = /^[A-Za-z ]+$/;
    const messageRegex = /^[A-Za-z0-9 ]+$/;

    if (!nameRegex.test(name)) {
        alert("Name should contain only letters and spaces.");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!subjectRegex.test(subject)) {
        alert("Subject should contain only letters and spaces.");
        return;
    }

    if (!messageRegex.test(message)) {
        alert("Message should contain only letters, numbers and spaces.");
        return;
    }

    // Create JSON object
    const contact = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    console.log("Sending:", contact);

    try {

        const response = await fetch("http://localhost:8080/contact", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(contact)
        });

        if (response.ok) {

            const data = await response.json();

            console.log("Saved in database:", data);

            alert("Message sent successfully!");

            // Clear form
            form.reset();

        } else {

            console.error("Server error:", response.status);

            alert("Failed to save message.");

        }

    } catch (error) {

        console.error("Connection error:", error);

        alert("Cannot connect to Spring Boot server.");

    }

});


/* =========================
   SNOW EFFECT - FULL WEBSITE
========================= */

const snowContainer = document.getElementById("snow-container");

if (snowContainer) {

    const snowflakeCount = 60;

    for (let i = 0; i < snowflakeCount; i++) {

        const snowflake = document.createElement("span");

        snowflake.className = "snowflake";
        snowflake.innerHTML = "❄";

        // Random horizontal position
        snowflake.style.left = Math.random() * 100 + "vw";

        // Random size
        snowflake.style.fontSize =
            Math.random() * 8 + 5 + "px";

        // Random transparency
        snowflake.style.opacity =
            Math.random() * 0.5 + 0.3;

        // Random falling speed
        snowflake.style.animationDuration =
            Math.random() * 8 + 8 + "s";

        // Random starting delay
        snowflake.style.animationDelay =
            Math.random() * 10 + "s";

        snowContainer.appendChild(snowflake);
    }
}