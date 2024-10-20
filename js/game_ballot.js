function startMiniGame() {
    // Create a new window for the mini game
    const gameWindow = window.open("", "Ballot Game", "width=400,height=400");
    
    // Create content for the game window
    gameWindow.document.write(`
        <html>
            <head>
                <title>Ballot Game</title>
                <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                <script src="https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.browser.js"></script>
                <style>
                    body { 
                        font-family: 'Barlow', sans-serif; 
                        text-align: center; 
                        padding: 20px; 
                        position: relative; /* Ensure canvas can be positioned absolutely */
                    }
                    button { 
                        margin-top: 10px; 
                        font-family: 'Barlow', sans-serif; 
                        background-color: #ded9ca !important; /* Set custom background color with !important */
                        border: none; /* Remove default border */
                        color: #333; /* Set text color for better contrast */
                    }
                    button:hover {
                        background-color: #d0c4b4; /* Optional: Change background color on hover */
                    }
                    @keyframes rainbow {
                        0% { color: red; }
                        14% { color: orange; }
                        28% { color: yellow; }
                        42% { color: green; }
                        57% { color: blue; }
                        71% { color: indigo; }
                        85% { color: violet; }
                        100% { color: red; }
                    }
                    .rainbow-text {
                        animation: rainbow 8s linear infinite;
                        font-size: 2.5em;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <canvas id="confetti-canvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;"></canvas>
                <div class="rainbow-text">THE BTO LOTTERY</div>
                <h3>Try your luck at balloting for a BTO!</h3>
                <br>
                <button id="ballot-button" class="btn">Ballot!</button>
                <p><br>Outcome:</p>
                <p id="result"></p>
                <p id="attempts">You have tried: 0 times</p>
                <script>
                    const jsConfetti = new JSConfetti(); // Initialize jsConfetti
                    let clickCount = 0;

                    // Handle ballot button click
                    document.getElementById('ballot-button').addEventListener('click', function() {
                        clickCount++;
                        const randomChance = Math.random(); // Generates a number between 0 and 1
                        const resultText = randomChance < 0.2 ? "Congrats! Your ballot is successful!<br>Enjoy your married life!" : "Your ballot is not successful!<br>There goes your $10!";
                        document.getElementById('result').innerHTML = resultText;
                        document.getElementById('attempts').innerHTML = "You have tried: " + clickCount + " times";

                        // If the ballot is successful, trigger confetti
                        if (randomChance < 0.2) {
                            jsConfetti.addConfetti({
                                emojis: ['🌈', '⚡️', '🍆', '💫'],
                                emojiSize: 40,
                            });
                        }
                    });
                </script>
            </body>
        </html>
    `);

    // Close the document to render the content
    gameWindow.document.close();
}