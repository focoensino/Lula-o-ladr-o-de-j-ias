var ladrao, diamante, laser1, laser2;
var estadoJogo;
var paredes;

function setup() {
  createCanvas(400, 400);
  montarJogo();
  estadoJogo = 'parado';
}

function draw() {
  background(0);

  if (estadoJogo == 'parado') {
    textSize(20);
    fill('white');
    text('Pressione ESPAÇO para iniciar', 60, 180);

    if (keyDown('SPACE')) {
      laser1.velocityY = 5;
      laser2.velocityY = -5;
      estadoJogo = 'play';
      
    }
  }

  if (estadoJogo == 'play') {
    // Lasers rebatem nas bordas de cima e de baixo
    laser1.bounceOff(paredes);
    laser2.bounceOff(paredes);

    // Movimento do ladrão
    if (keyDown('left')) {
      ladrao.x -= 4;
    } else if (keyDown('right')) {
      ladrao.x += 4;
    } else if (keyDown('up')) {
      ladrao.y -= 4;
    } else if (keyDown('down')) {
      ladrao.y += 4;
    }

    // Ladrão colide com as bordas
    ladrao.collide(paredes);


    // Verifica colisão com laser
    if (ladrao.isTouching(laser1) || ladrao.isTouching(laser2)) {
      estadoJogo = 'gameOver';
    }

    // Verifica vitória
    if (ladrao.isTouching(diamante)) {
      estadoJogo = 'winner';
    }
  }

  drawSprites(); // Sempre antes dos textos finais para que eles fiquem por cima

  if (estadoJogo == 'gameOver') {
    fimDeJogo();
    fill('royalblue');
    textSize(30);
    text('haha você foi capturado!', 35, 200);
    
    textSize(15);
    text('Pressione R para Reiniciar', 100, 250);
    
    if (keyDown('r')) {
      estadoJogo = 'parado';
      montarJogo();      
    }
  }

  if (estadoJogo == 'winner') {
    fimDeJogo();
    fill('cyan');  
    textSize(30); 
    text('parabéns, você foi rápido!', 30, 200);
    textSize(15);
    text('Pressione R para Reiniciar', 100, 250); 
  
    if(keyDown('r')){ 
    
       estadoJogo = 'parado'
      montarJogo()
    
    }
    
    
  }
}

function montarJogo() {
  ladrao = createSprite(200, 390, 20, 20);
  diamante = createSprite(360, 20, 20, 20);
  laser1 = createSprite(100, 200, 200, 10);
  laser1.shapeColor = 'red';
  laser2 = createSprite(300, 200, 200, 10);
  laser2.shapeColor = 'red';

  ladrao.shapeColor = 'turquoise';
  diamante.shapeColor = 'blue';

  paredes = createEdgeSprites();
}

function fimDeJogo() {
  ladrao.remove();
  diamante.remove();
  laser1.remove();
  laser2.remove();
}