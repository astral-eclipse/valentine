/**
 * Creates a fireworks animation with customizable parameters.
 * @param {number} numFireworks - The number of fireworks to create.
 * @param {number} duration - The duration (in milliseconds) for each firework burst.
 * @param {string[]} colors - An array of colors for the fireworks.
 */
function createFirework(numFireworks = 1000, duration = 2000, colors = ['#ff5733', '#33ff57', '#3333ff', '#ff33c2', '#f5ff33', '#33fff5']) {
    // Select the container element
    const container = document.querySelector('.container');
    // Get window dimensions
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    /**
     * Generates a random position within the window.
     * @returns {{x: number, y: number}} - Object containing x and y coordinates.
     */
    function getRandomPosition() {
        return {
            x: Math.random() * windowWidth,
            y: Math.random() * windowHeight
        };
    }

    /**
     * Creates a single firework particle and appends it to the container.
     * @param {string} color - Color of the firework particle.
     */
    function createParticle(color) {
        // Create a new div for the firework particle
        const particle = document.createElement('div');
        // Add the firework class to the div
        particle.classList.add('firework');
        // Set the background color
        particle.style.backgroundColor = color;
        // Get a random position
        const position = getRandomPosition();
        // Set the position
        particle.style.left = position.x + 'px';
        particle.style.top = position.y + 'px';
        // Append the particle to the container
        container.appendChild(particle);
        // Remove the particle after the specified duration
        setTimeout(() => {
            container.removeChild(particle);
        }, duration);
    }

    // Loop to create fireworks
    for (let i = 0; i < numFireworks; i++) {
        // Choose a random color from the provided colors array
        const color = colors[Math.floor(Math.random() * colors.length)];
        // Create a particle with the chosen color
        createParticle(color);
    }
}


// Variables for tracking "No" button clicks and message display
var noCounter = 0;
var noMessage = "Don't Say N";
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
        var noString = "o".repeat(noCounter + 1);
        // Construct message with increasing "No" count
        var message = `${noMessage}${noString}  ${noCounter + 1}`;
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

// Function to send message
function sendMessage(){
    // Get input values
    var params = { 
        name: document.getElementById("nameInput").value,
        message: document.getElementById("messageInput").value
    }
    // EmailJS service and template IDs
    const serviceID = "service_sfct2u6"
    const templeteID = "template_vrn0mhl"

    // Send email using EmailJS
    emailjs
        .send(serviceID, templeteID, params)
        .then((res) => {
            // Clear input fields
            document.getElementById("nameInput").value = ""
            document.getElementById("messageInput").value = ""
            // Show success alert
            alert("Your Message Have Been Sent Successfully")
        })
}
