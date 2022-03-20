const dino = document.querySelector('.dino');
// console.log(dino); //ṕara verificarmos se ele elemento html foi selecionado corretamente
const background = document.querySelector('.background')
// console.log(background);
let isJumping = false;
let isGameOver = false;
let dinoPosition = 0;

// vamos tratar com essa função, apenas o pressionamento da tecla espaço.
function handleKeyup(event) { // argumento event: ele é enviado para função toda vez que o usuário pressiona uma tecla pelo navegador.
  if (event.keyCode === 32) { // se o código da tecla for igual a 32(é o código da tecla espaço).
    // console.log('Pressionou a tecla espaço')
    if (!isJumping) { // se ele não estiver pulando
      // console.log(!isJumping) // o ! inverte o valor, se a var tiver false, vai retornar true e vise-versa
      jump(); // ele pula
    }
  } 
};

// função responsável pelo pulo do dino
function jump() {
  let isJumping = true;

  let upInterval = setInterval(() => { // setInterval: serve para definirmos intervalos. Tudo dentro desse bloco de código vai ser executado a cada...
    if (dinoPosition >= 150) {
      clearInterval(upInterval); // limpar os dados da função

      // Descendo
      let downInterval = setInterval(() => {
        if (dinoPosition <= 0) { // se a posição for menor ou igual a 0...
          clearInterval(downInterval); // vamos limpar o intervalo de descida para ele parar de descer.
          isJumping = false;
        } else {
          dinoPosition -= 20;

          dino.style.bottom = dinoPosition + 'px'; // alerar as propriedades de estido do elemento dino. Nesse casso, o bottom vai assumir o valor de dinoPosition em px.
        }
      }, 20);

    } else {
      // Subindo
      dinoPosition += 20;

      dino.style.bottom = dinoPosition + 'px'; 
    }
  }, 20); //20 milisegundos. Com isso, conseguimos executar o código de maneira repetida.
}

function createCactus() {
  const cactus = document.createElement('div'); // método para criar elemento html, nesse caso é uma div.
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000; // para gerar um número aleatório de cactos;

  cactus.classList.add('cactus'); // adicionar uma class a essa div criada.
  cactus.style.left = 1000 + 'px'; // atribuir ao left de cactus 1000px.
  background.appendChild(cactus); // adicionar um "filho"/ adicionar cactus ao elemento backgroud (que é uma div que possui essa class)

  let leftInterval = setInterval(() => {
      if (cactusPosition < -60) { // se o cactus sair complemente da tela, vamos limpar o intervalo e remover o elemento filho cactus de backgroud.
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && dinoPosition < 60) { // se o cactus estiver nessa posição significa que esta em contato com o dino.
      // Gamer over
      clearInterval(leftInterval); // p/ o cactus parar de ir p/ esqueda quando ele estiver em contato c/ o dino
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>'; // e se o cactus estiver em contato com o dino, vamos escrever na tela Fim de Jogo, usando o método de inserir html.
    } else {
      cactusPosition -= 10;
    
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime); // o método setTimeout serve para executarmos determinada função depois de determinado tempo (1° argumento - função que vai ser execulada; 2° argumento - tempo em milisegundos); isso nada mais é que uma função invocando ela mesma(ela dentro dela), isso se chama recursividade.
}

document.addEventListener('keyup', handleKeyup);

// addEventListener: vai 'escutar" os eventos de cliques e de teclas; 
// keyup: evento de soltar alguma tecla.

// document.addEventListener('keyup', function() { 
//   console.log('Pressionou e soltou uma tecla...')
// });

createCactus();


