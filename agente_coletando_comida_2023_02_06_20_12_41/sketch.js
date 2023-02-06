// Aluna: Camila Xavier de Medeiros
// Matéria: Sistemas Inteligentes

let vehicle; // criando a variável de veículo
let food; // criando a variável da comida

// Placar
let tamanhoDaFonte = 25;
let pontos = 0;

function setup() {
  createCanvas(800, 800);
  vehicle = new Vehicle(100,100); // criando o veículo (nosso agente que come)
  food = new Food(200,100);
  
  // configuracao dos textos da tela
  textSize(tamanhoDaFonte)
}

function draw() {
  background(0); // fundo preto
  fill('#F0F8FF'); // cor do texto
  noStroke(); // tirar a borda do texto
  
  //food = createVector(mouseX, mouseY);
  //circle(food.x, food.y, 32); //desenhando o circulo
  //vehicle.seek(food); //para o triangulo seguir o circulo (o agente seguir a comida)
  
  let sheering = vehicle.persue(food);
  vehicle.applyForce(sheering);
  
  // consigo ver a distancia entre a posição do veículo e da comida
  let d = p5.Vector.dist(vehicle.pos, food.pos); 
  
   // se a distancia entre eles for menos que o tamanho do raio dos dois, uma nova comida aparece na tela em um lugar aleatório e o veículo aparece no centro da tela, além de somar +1 no placar
  
  if(d < vehicle.r + food.r) {
    food = new Food (random(width), random (height));
    //vehicle.pos.set(width/2, height/2);
    pontos += 1;
  } 
 
  text(' Comida : '+ pontos , 10, 30)
  
  vehicle.update();
  vehicle.show();
  
  food.edges();
  food.update();
  food.show();
  
}