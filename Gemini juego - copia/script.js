function playAttackSound() {
  const attackSound = new Audio('sprites/sword-35999.mp3'); // Path to the attack sound file
  attackSound.volume = 0.7; // You can adjust the volume here
  attackSound.play();
}



let life1 = 100;
let life2 = 100;
let gameOver = false; // Flag to stop further animations after defeat

// Update the life bars
function updateLifeBar(idBar, idText, percent) {
  const bar = document.getElementById(idBar);
  const text = document.getElementById(idText);

  percent = Math.max(0, Math.min(percent, 100)); // Prevents life from going below 0 or above 100
  bar.style.width = percent + '%';
  text.textContent = percent + '%';

  // Change the color based on health
  if (percent > 60) {
    bar.style.background = '#00ff00'; // Green
  } else if (percent > 30) {
    bar.style.background = '#ffcc00'; // Yellow
  } else {
    bar.style.background = '#ff1a1a'; // Red
  }
}

// Apply damage and handle character attacks
function applyDamage(attacker, target, amount = 10) {
  if (gameOver) return;

  if (attacker === 1 && life1 > 0 && life2 > 0) {
    life2 = Math.max(life2 - amount, 0); // Decrease life of target (Character 2)
    updateLifeBar('life2', 'text2', life2);
    animateAttack('img1', 'sprites/attack1.gif', 'sprites/idle1.gif');
    animateHit('img2', 'sprites/gothit2.png', 'sprites/idle2.gif');
    
    if (life2 <= 0) {
      document.getElementById('img2').src = 'sprites/defeat2.gif'; // Defeat animation for Player 2
      gameOver = true; // End game when life2 reaches 0
    }
  } else if (attacker === 2 && life1 > 0 && life2 > 0) {
    life1 = Math.max(life1 - amount, 0); // Decrease life of target (Character 1)
    updateLifeBar('life1', 'text1', life1);
    animateAttack('img2', 'sprites/attack2.gif', 'sprites/idle2.gif');
    animateHit('img1', 'sprites/gothit1.png', 'sprites/idle1.gif');
    
    if (life1 <= 0) {
      document.getElementById('img1').src = 'sprites/defeat1.gif'; // Defeat animation for Player 1
      gameOver = true; // End game when life1 reaches 0
    }
  }
}

// Apply special attack (resetting opponent's health to 100%)

// Trigger some cool special effect like a screen shake and background color change
function triggerSpecialEffect() {
  // Screen shake effect
  const screen = document.body;
  screen.classList.add('shake');

  // Change background color for a cool effect
  document.body.style.backgroundColor = '#ff4c4c'; // Change to a red color for the special effect
  setTimeout(() => {
    document.body.style.backgroundColor = ''; // Reset background color after a while
  }, 500); // Reset after 0.5s

  // Play sound effect for special attack
  const audio = new Audio('sprites/specialsound.wav'); // Path to your sound file
  audio.volume = 0.5; // Set volume to 50%
  audio.play();

  // Remove the screen shake effect after a short period
  setTimeout(() => {
    screen.classList.remove('shake');
  }, 500); // Shake lasts for 0.5s
}

// Handle animations for attacking
function animateAttack(id, attackSrc, idleSrc) {
  const img = document.getElementById(id);
  img.src = attackSrc;
  setTimeout(() => {
    if (!gameOver) {
      img.src = idleSrc;
    }
  }, 1000); // Attack animation lasts 1 second
}

// Handle animations for getting hit
function animateHit(id, hitSrc, idleSrc) {
  const img = document.getElementById(id);
  img.src = hitSrc;
  setTimeout(() => {
    if (!gameOver) {
      img.src = idleSrc;
    }
  }, 1000); // Hit animation lasts 1 second
}

window.onload = () => {
  updateLifeBar('life1', 'text1', life1);
  updateLifeBar('life2', 'text2', life2);
};

// Event listener for attacking with "1" (Character 1 attacks Character 2)
window.addEventListener('keydown', (e) => {
  if (e.code === 'Digit1' && !gameOver) {
    applyDamage(1, 2, 10); // Character 1 attacks Character 2
  }
});

// Event listener for attacking with "2" (Character 2 attacks Character 1)
window.addEventListener('keydown', (e) => {
  if (e.code === 'Digit2' && !gameOver) {
    applyDamage(2, 1, 10); // Character 2 attacks Character 1
  }
});

// Event listener for special attack with "3" (Player 1 special attack)
window.addEventListener('keydown', (e) => {
  if (e.code === 'Digit3' && !gameOver) {
    applySpecialAttack(1, 2); // Player 1 special attack on Player 2
  }
});

// Event listener for special attack with "4" (Player 2 special attack)
window.addEventListener('keydown', (e) => {
  if (e.code === 'Digit4' && !gameOver) {
    applySpecialAttack(2, 1); // Player 2 special attack on Player 1
  }
});




function applySpecialAttack(attacker, target) {
  if (gameOver) return;

  triggerSpecialEffect(); // Sonido + shake + color de fondo

  if (attacker === 1 && life2 > 0) {
    life2 = 0;
    updateLifeBar('life2', 'text2', life2);
    document.getElementById('img1').src = 'sprites/special1.png'; // Cambia a imagen del especial
    animateHit('img2', 'sprites/defeat2.gif', 'sprites/idle2.gif');
    triggerKOText('KO', 'Marina Guanya');
  }

  if (attacker === 2 && life1 > 0) {
    life1 = 0;
    updateLifeBar('life1', 'text1', life1);
    document.getElementById('img2').src = 'sprites/special2.png'; // Cambia a imagen del especial
    animateHit('img1', 'sprites/defeat1.gif', 'sprites/idle1.gif');
    triggerKOText('KO', 'Helena Guanya');
  }

  // Volver a idle después de un rato (por si no es gameOver aún)
  setTimeout(() => {
    if (!gameOver) {
      document.getElementById('img1').src = 'sprites/idle1.gif';
      document.getElementById('img2').src = 'sprites/idle2.gif';
    }
  }, 1500);
}
















// Function to show KO text and winner, make it stay forever
function triggerKOText(text, winner) {
  const koText = document.getElementById('ko-text');
  const winnerText = document.getElementById('winner');

  // Set the KO text and winner
  koText.querySelector('p').textContent = text;
  winnerText.textContent = winner;

  // Display the KO text
  koText.style.display = 'block'; // Make KO text visible
  koText.style.opacity = 1; // Make KO text fully visible (no fade-out effect)
  gameOver = true; // Set gameOver to true to stop further interactions
}

// Play Again function to reset the game
function playAgain() {
  // Reset game state
  life1 = 100;
  life2 = 100;
  gameOver = false;

  // Reset characters' life bars and images
  updateLifeBar('life1', 'text1', life1);
  updateLifeBar('life2', 'text2', life2);
  document.getElementById('img1').src = 'sprites/idle1.gif';
  document.getElementById('img2').src = 'sprites/idle2.gif';

  // Hide KO text and reset winner
  const koText = document.getElementById('ko-text');
  koText.style.display = 'none';

  // Reset any other necessary variables (e.g., score, actions)
  // (Optional) Reset any animations or sounds here if applicable
}

// Apply damage and handle character attacks
function applyDamage(attacker, target, amount = 10) {
  if (gameOver) return;

  if (attacker === 1 && life1 > 0 && life2 > 0) {
    life2 = Math.max(life2 - amount, 0); // Decrease life of target (Character 2)
    updateLifeBar('life2', 'text2', life2);
    animateAttack('img1', 'sprites/attack1.gif', 'sprites/idle1.gif');
    animateHit('img2', 'sprites/gothit2.png', 'sprites/idle2.gif');
    
    if (life2 <= 0) {
      document.getElementById('img2').src = 'sprites/defeat2.gif'; // Defeat animation for Player 2
  
      triggerKOText('KO', 'Player 1 Wins'); // Show KO and winner after normal attack
    }
  } else if (attacker === 2 && life1 > 0 && life2 > 0) {
    life1 = Math.max(life1 - amount, 0); // Decrease life of target (Character 1)
    updateLifeBar('life1', 'text1', life1);
    animateAttack('img2', 'sprites/attack2.gif', 'sprites/idle2.gif');
    animateHit('img1', 'sprites/gothit1.png', 'sprites/idle1.gif');
    
    if (life1 <= 0) {
      document.getElementById('img1').src = 'sprites/defeat1.gif'; // Defeat animation for Player 1
      triggerKOText('KO', 'Player 2 Wins'); // Show KO and winner after normal attack
    }
  }
}

// Apply special attack (resetting opponent's health to 100%)


function applyDamage(attacker, target, amount = 10) {
  if (gameOver) return;

  // 🔊 Play sound on normal attack
  playAttackSound();

  if (attacker === 1 && life1 > 0 && life2 > 0) {
    life2 = Math.max(life2 - amount, 0);
    updateLifeBar('life2', 'text2', life2);
    animateAttack('img1', 'sprites/attack1.gif', 'sprites/idle1.gif');
    animateHit('img2', 'sprites/gothit2.png', 'sprites/idle2.gif');
    
    if (life2 <= 0) {
      document.getElementById('img2').src = 'sprites/defeat2.gif';
      triggerKOText('KO', 'Marina Guanya');
    }
  } else if (attacker === 2 && life1 > 0 && life2 > 0) {
    life1 = Math.max(life1 - amount, 0);
    updateLifeBar('life1', 'text1', life1);
    animateAttack('img2', 'sprites/attack2.gif', 'sprites/idle2.gif');
    animateHit('img1', 'sprites/gothit1.png', 'sprites/idle1.gif');
    
    if (life1 <= 0) {
      document.getElementById('img1').src = 'sprites/defeat1.gif';
      triggerKOText('KO', 'Helena Guanya');
    
    }
  }
}



// Function to display the cleaning woman GIF
function showCleaningWoman() {
  const gameContainer = document.querySelector('.game-container'); // Ensure you have this class in your HTML

  // Set the cleaning woman GIF as the background image
  gameContainer.style.backgroundImage = 'url("/sprites/ezgif.com-animated-gif-maker%20(1).gif")';
  gameContainer.style.backgroundSize = 'contain'; // Make sure the image covers the container
  gameContainer.style.backgroundPosition = 'center'; // Center the image within the container

  // Duration of the GIF (in milliseconds) - adjust this based on the actual duration of your GIF
  const gifDuration = 500;  // Adjust based on how long the GIF lasts

  // Remove the background after the GIF duration is finished
  setTimeout(() => {
    gameContainer.style.backgroundImage = 'none';  // Remove the background image after the GIF finishes
  }, gifDuration);  // Time for when the GIF will finish (in milliseconds)
}

// Function to start showing the cleaning woman at fixed intervals
function startFixedInterval() {
  // Show the cleaning woman every 20 seconds (20000 milliseconds)
  setInterval(() => {
    showCleaningWoman();  // Call the function every 20 seconds
  }, 20000); // Set the interval to 20 seconds
}

// Start the interval when the page loads
window.onload = startFixedInterval;


// Funció per connectar amb l'Arduino i escoltar entrades dels pins digitals
async function connectSerial() {
  try {
    console.log("Intentant connectar amb l'Arduino...");
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    const reader = port.readable.getReader();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      let text = new TextDecoder().decode(value).trim();
      console.log("Rebut des de l'Arduino:", text);

      // Jugador 1
      if (text === "4" && !gameOver) {
        applyDamage(1, 2, 10); // Atac normal jugador 1
      }

      if (text === "2" && !gameOver) {
        applySpecialAttack(1, 2); // Atac especial jugador 1
      }

      // Jugador 2
      if (text === "8" && !gameOver) {
        applyDamage(2, 1, 10); // Atac normal jugador 2
      }

      if (text === "6" && !gameOver) {
        applySpecialAttack(2, 1); // Atac especial jugador 2
      }
    }

    reader.releaseLock();
  } catch (error) {
    console.error("Error connectant amb l'Arduino:", error);
  }
}

// Iniciar connexió quan es faci clic a la pantalla
window.addEventListener("click", connectSerial);






























































