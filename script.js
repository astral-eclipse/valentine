// Function to create fireworks animation
function createFirework() {
    // Select the container element
    const container = document.querySelector('.container');
    // Array of colors for fireworks
    const colors = ['#ff5733', '#33ff57', '#3333ff', '#ff33c2', '#f5ff33', '#33fff5']; // Add more colors if needed
    // Number of fireworks
    const numFireworks = 1000; // Increase the number of fireworks

    // Loop to create fireworks
    for (let i = 0; i < numFireworks; i++) {
        // Create a new div for each firework
        const firework = document.createElement('div');
        // Add the firework class to the div
        firework.classList.add('firework');
        // Set random background color from the colors array
        firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        // Set random position within the window
        firework.style.left = Math.random() * window.innerWidth + 'px';
        firework.style.top = Math.random() * window.innerHeight + 'px';
        // Append the firework to the container
        container.appendChild(firework);
        // Remove the firework after a delay
        setTimeout(() => {
            container.removeChild(firework);
        }, 2000); // Adjust the duration of each firework burst
    }
}

// Variables for tracking "No" button clicks and message display
var noCounter = 0;
var noMessage = "Embrace the Magic";
var yesClicked = false;

// Function to handle "Yes" button click
function confirmValentine() {
    // Create fireworks animation
    createFirework();
    // Set flag for "Yes" clicked
    yesClicked = true;
    // Clear any intervals (if any)
    clearInterval(increaseSizeInterval);
    // Remove the score div
    var scoreDiv = document.getElementById("score");
    scoreDiv.parentNode.removeChild(scoreDiv);
    // Display message input and send message button
    document.getElementById("messageInput").style.display = "block";
    document.getElementById("sendMessageBtn").style.display = "block";
}

// Function to handle "No" button click
function rejectValentine() {
    // Check if "Yes" button was not clicked
    if (!yesClicked) {
        // Generate "No" string based on the counter
        var noString = "c".repeat(noCounter + 1);
        // Construct message with increasing "No" count
        var message = `${noMessage}${noString}      ${noCounter + 1}`;
        // Increase font size of "Yes" button
        var yesButton = document.querySelector('.yes');
        var fontSize = parseInt(window.getComputedStyle(yesButton).fontSize);
        yesButton.style.fontSize = (fontSize + 3) + 'px';
        // Increment "No" counter
        noCounter++;
        // Update scores display
        updateScores(message);
    }
}

// Function to update scores display
function updateScores(message) {
    document.getElementById('noCount').textContent = message;
    document.getElementById("score").style.display = "block";
}

function sendMessage() {
    // Get input value
    var message = document.getElementById("messageInput").value.trim();

    // Check if message is not empty
    if (message !== "") {
        // Get input values
        var params = {
            name: document.getElementById("nameInput").value,
            message: message
        };
        // EmailJS service and template IDs
        const serviceID = "service_sfct2u6";
        const templeteID = "template_vrn0mhl";

        // Send email using EmailJS
        emailjs
            .send(serviceID, templeteID, params)
            .then(
                function (response) {
                    // Clear input fields
                    document.getElementById("nameInput").value = "";
                    document.getElementById("messageInput").value = "";
                    // Show success alert
                    alert("Your Message Has Been Sent Successfully");
                },
                function (error) {
                    // Show error alert
                    alert("Error sending message. Please try again later.");
                }
            );
    } else {
        // Show error alert
        alert("Please type a message before sending.");
    }
}
