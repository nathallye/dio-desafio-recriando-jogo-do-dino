// visando um código limpo, removi todos os comentários de auxilio de estudo para o arquivo studies.js

const dino = document.querySelector('.dino');
const background = document.querySelector('.background'); 

let isJumping = false;
let isGameOver = false;
let dinoPosition = 0;

function handleKeyup(event) { 
  if (event.keyCode === 32) { 
    if (!isJumping) { 
      jump(); 
    }
  } 
};

function jump() {
  let isJumping = true;

  let upInterval = setInterval(() => { 
    if (dinoPosition >= 200) {
      // Descendo
      clearInterval(upInterval); 

      let downInterval = setInterval(() => {
        if (dinoPosition <= 0) { 
          clearInterval(downInterval); 
          isJumping = false;
        } else {
          dinoPosition -= 20;

          dino.style.bottom = dinoPosition + 'px'; 
        }
      }, 20);

    } else {
      // Subindo
      dinoPosition += 20;

      dino.style.bottom = dinoPosition + 'px'; 
    }
  }, 20); 
};

function createCactus() {
  const cactus = document.createElement('div'); 
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000; 

  if (isGameOver) return; 

  cactus.classList.add('cactus'); 
  background.appendChild(cactus); 
  cactus.style.left = 1000 + 'px'; 

  let leftInterval = setInterval(() => {
      if (cactusPosition < -60) { 
      // Saiu da tela
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && dinoPosition < 60) { 
      // Gamer over
      clearInterval(leftInterval); 
      isGameOver = true;

      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>' + '<a href="index.html" class="btn">Reload</a>';

    } else {
      cactusPosition -= 10;
    
      cactus.style.left = cactusPosition + 'px';
    }
  }, 30);

  setTimeout(createCactus, randomTime);
}

document.addEventListener('keyup', handleKeyup);

createCactus();


