function playAttackSound() {
  const attackSound = new Audio('sprites/sword-35999.mp3'); 
  attackSound.volume = 0.7; 
  attackSound.play();
}



let life1 = 100;
let life2 = 100;
let gameOver = false; 


function updateLifeBar(idBar, idText, percent) {
  const bar = document.getElementById(idBar);
  const text = document.getElementById(idText);

  percent = Math.max(0, Math.min(percent, 100)); 
  bar.style.width = percent + '%';
  text.textContent = percent + '%';

 
  if (percent > 60) {
    bar.style.background = '#00ff00'; 
  } else if (percent > 30) {
    bar.style.background = '#ffcc00'; 
  } else {
    bar.style.background = '#ff1a1a'; 
  }
}


function applyDamage(attacker, target, amount = 10) {
  if (gameOver) return;

  if (attacker === 1 && life1 > 0 && life2 > 0) {
    life2 = Math.max(life2 - amount, 0); 
    updateLifeBar('life2', 'text2', life2);
    animateAttack('img1', 'sprites/attack1.gif', 'sprites/idle1.gif');
    animateHit('img2', 'sprites/gothit2.png', 'sprites/idle2.gif');
    
    if (life2 <= 0) {
      document.getElementById('img2').src = 'sprites/defeat2.gif'; 
      gameOver = true; 
    }
  } else if (attacker === 2 && life1 > 0 && life2 > 0) {
    life1 = Math.max(life1 - amount, 0); 
    updateLifeBar('life1', 'text1', life1);
    animateAttack('img2', 'sprites/attack2.gif', 'sprites/idle2.gif');
    animateHit('img1', 'sprites/gothit1.png', 'sprites/idle1.gif');
    
    if (life1 <= 0) {
      document.getElementById('img1').src = 'sprites/defeat1.gif'; 
      gameOver = true; 
    }
  }
}

function triggerSpecialEffect() {
 
  const screen = document.body;
  screen.classList.add('shake');

  
  document.body.style.backgroundColor = '#ff4c4c'; 
  setTimeout(() => {
    document.body.style.backgroundColor = ''; 
  }, 500); 

 
  const audio = new Audio('sprites/specialsound.wav'); 
  audio.volume = 0.5; 
  audio.play();

 
  setTimeout(() => {
    screen.classList.remove('shake');
  }, 500); 
}


function animateAttack(id, attackSrc, idleSrc) {
  const img = document.getElementById(id);
  img.src = attackSrc;
  setTimeout(() => {
    if (!gameOver) {
      img.src = idleSrc;
    }
  }, 1000);
}


function animateHit(id, hitSrc, idleSrc) {
  const img = document.getElementById(id);
  img.src = hitSrc;
  setTimeout(() => {
    if (!gameOver) {
      img.src = idleSrc;
    }
  }, 1000); 
}

window.onload = () => {
  updateLifeBar('life1', 'text1', life1);
  updateLifeBar('life2', 'text2', life2);
};


window.addEventListener('keydown', (e) => {
  if (e.code === 'Digit1' && !gameOver) {
    applyDamage(1, 2, 10); 
  }
});


window.addEventListener('keydown', (e) => {
  if (e.code === 'Digit2' && !gameOver) {
    applyDamage(2, 1, 10); 
  }
});


window.addEventListener('keydown', (e) => {
  if (e.code === 'Digit3' && !gameOver) {
    applySpecialAttack(1, 2); 
  }
});


window.addEventListener('keydown', (e) => {
  if (e.code === 'Digit4' && !gameOver) {
    applySpecialAttack(2, 1); 
  }
});




function applySpecialAttack(attacker, target) {
  if (gameOver) return;

  triggerSpecialEffect(); 

  if (attacker === 1 && life2 > 0) {
    life2 = 0;
    updateLifeBar('life2', 'text2', life2);
    document.getElementById('img1').src = 'sprites/special1.png';
    animateHit('img2', 'sprites/defeat2.gif', 'sprites/idle2.gif');
    triggerKOText('KO', 'Marina Guanya');
  }

  if (attacker === 2 && life1 > 0) {
    life1 = 0;
    updateLifeBar('life1', 'text1', life1);
    document.getElementById('img2').src = 'sprites/special2.png'; 
    animateHit('img1', 'sprites/defeat1.gif', 'sprites/idle1.gif');
    triggerKOText('KO', 'Helena Guanya');
  }

 
  setTimeout(() => {
    if (!gameOver) {
      document.getElementById('img1').src = 'sprites/idle1.gif';
      document.getElementById('img2').src = 'sprites/idle2.gif';
    }
  }, 1500);
}

















function triggerKOText(text, winner) {
  const koText = document.getElementById('ko-text');
  const winnerText = document.getElementById('winner');

  
  koText.querySelector('p').textContent = text;
  winnerText.textContent = winner;

 
  koText.style.display = 'block'; 
  koText.style.opacity = 1; 
  gameOver = true; 
}


function playAgain() {

  life1 = 100;
  life2 = 100;
  gameOver = false;

 
  updateLifeBar('life1', 'text1', life1);
  updateLifeBar('life2', 'text2', life2);
  document.getElementById('img1').src = 'sprites/idle1.gif';
  document.getElementById('img2').src = 'sprites/idle2.gif';


  const koText = document.getElementById('ko-text');
  koText.style.display = 'none';


}


function applyDamage(attacker, target, amount = 10) {
  if (gameOver) return;

  if (attacker === 1 && life1 > 0 && life2 > 0) {
    life2 = Math.max(life2 - amount, 0); 
    updateLifeBar('life2', 'text2', life2);
    animateAttack('img1', 'sprites/attack1.gif', 'sprites/idle1.gif');
    animateHit('img2', 'sprites/gothit2.png', 'sprites/idle2.gif');
    
    if (life2 <= 0) {
      document.getElementById('img2').src = 'sprites/defeat2.gif'; 
  
      triggerKOText('KO', 'Player 1 Wins'); 
    }
  } else if (attacker === 2 && life1 > 0 && life2 > 0) {
    life1 = Math.max(life1 - amount, 0); 
    updateLifeBar('life1', 'text1', life1);
    animateAttack('img2', 'sprites/attack2.gif', 'sprites/idle2.gif');
    animateHit('img1', 'sprites/gothit1.png', 'sprites/idle1.gif');
    
    if (life1 <= 0) {
      document.getElementById('img1').src = 'sprites/defeat1.gif';
      triggerKOText('KO', 'Player 2 Wins'); 
    }
  }
}

function applyDamage(attacker, target, amount = 10) {
  if (gameOver) return;


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




function showCleaningWoman() {
  const gameContainer = document.querySelector('.game-container'); 

  gameContainer.style.backgroundImage = 'url("/sprites/ezgif.com-animated-gif-maker%20(1).gif")';
  gameContainer.style.backgroundSize = 'contain'; 
  gameContainer.style.backgroundPosition = 'center'; 

 
  const gifDuration = 500;  

  
  setTimeout(() => {
    gameContainer.style.backgroundImage = 'none';  
  }, gifDuration);  
}


function startFixedInterval() {
  
  setInterval(() => {
    showCleaningWoman();  
  }, 20000); 
}


window.onload = startFixedInterval;



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

      if (text === "4" && !gameOver) {
        applyDamage(1, 2, 10); 
      }

      if (text === "2" && !gameOver) {
        applySpecialAttack(1, 2); 
      }

     
      if (text === "8" && !gameOver) {
        applyDamage(2, 1, 10); 
      }

      if (text === "6" && !gameOver) {
        applySpecialAttack(2, 1); 
      }
    }

    reader.releaseLock();
  } catch (error) {
    console.error("Error connectant amb l'Arduino:", error);
  }
}


window.addEventListener("click", connectSerial);






























































