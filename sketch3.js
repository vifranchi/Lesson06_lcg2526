let dataset_alfa_name = 'drone_alfa_data.csv';
let dataset_bravo_name = 'drone_bravo_data.csv';

let alfa_data;
let bravo_data;

let x_pos_alfa = []; //salvare posizioni x
let y_pos_alfa = [];
let z_pos_alfa = [];
let x_vel_alfa = [];
let y_vel_alfa = [];

let x_pos_bravo = []; //salvare posizioni x
let y_pos_bravo = [];
let z_pos_bravo = [];
let x_vel_bravo= [];
let y_vel_bravo = [];

let checkbox_alfa;
let checkbox_bravo;
let mySelect;

let pressed_x = -1;
let pressed_y = -1;

let steps = [];

let yMax = 500;
let xMax = 500;

function preload(){
  alfa_data = loadTable(dataset_alfa_name, 'csv', 'header');
  bravo_data = loadTable(dataset_bravo_name, 'csv', 'header');
}

function setup() {
  frameRate(30);
  createCanvas(xMax, yMax);

  for (let i = 0; i < alfa_data.getRowCount (); i++){
    x_pos_alfa.push(alfa_data.getNum(i, 'x_pos'));
    y_pos_alfa.push(alfa_data.getNum(i, 'y_pos'));
    z_pos_alfa.push(alfa_data.getNum(i, 'z_pos'));
    x_vel_alfa.push(alfa_data.getNum(i, 'x_vel'));
    y_vel_alfa.push(alfa_data.getNum(i, 'y_vel'));
    }
  
  for (let i = 0; i < bravo_data.getRowCount (); i ++){
    x_pos_bravo.push(bravo_data.getNum(i, 'x_pos'));
    y_pos_bravo.push(bravo_data.getNum(i, 'y_pos'));
    z_pos_bravo.push(bravo_data.getNum(i, 'z_pos'));
    x_vel_bravo.push(bravo_data.getNum(i, 'x_vel'));
    y_vel_bravo.push(bravo_data.getNum(i, 'y_vel'));
  }

  checkbox_alfa = createCheckbox('Alfa', true); //almeno un drone venga subito selezionato
  checkbox_alfa.position (165, yMax + 30);

  checkbox_bravo = createCheckbox('Bravo');
  checkbox_bravo.position (165, yMax + 50);

  mySelect = createSelect();
  mySelect.position (5, yMax + 30);

  mySelect.option('traj');
  mySelect.option('x_position');
  mySelect.option('x_position');
  mySelect.option('z_position');
  mySelect.option('x_velocity');
  mySelect.option('y_velocity');

  mySelect.selected('traj');
}

function printData(){
  textSize(16);
  let index = map(pressed_x, 0, width, 0, value_array.lenght);
  let value = value_array [index];
  fill (0);
  noStroke();
  if (pressed_x + 150 > width){
    rect (pressed_x, pressed_y, 150, 25);
    fill (255, 255, 255);
    text (loadTable, )

  }
  
}

function drawPlot(value1, value2, hover_position=true, color = ['#a65b40'] ) { 
  //terzo parametro, che di dafault 
 // è rosso ma poi può essere cambiato
  push();
  stroke (color[0], color [1], color[2]);
  noFill();

  beginShape(); //dentro si aggiungono i vertici
  for(let i = 0; i < value1.length; i++){
    let px = map(value1[i], min(value1), max(value1), 0, width);
    let ts = map(value2[i], min(value2), max(value2), 0, height);
    vertex(px,ts);
  }
  endShape();
  pop();

  if (hover_position) {
    push();
  stroke (1);
  fill (255, 0, 0);
  xi = map(value1[0], min(value1), max (value1), 0, width);
  yi = map(value2[0], min(value2), max(value2), 0, height);
  circle(xi, yi, 10); //punto iniziale
  pop();

  push();
  stroke (1);
  fill (0, 255, 0);
  xf = map(value1[value1.lenght - 1], min(value1), max(value1), 0, width);
  yf = map(value2[value2.lenght - 1], min(value2), max(value2), 0, height);
  circle (xf, yf, 10); //punto finale
  pop();
  }
}

function mouseClicked(){
  if (mouseX < 0 && mouseX < width && mouseY > 0 && mouseY < height){
    pressed_x = mouseX;
    pressed_y = mouseY;
  }

}

function draw() {
  background(220);
  let selected = mySelect.value();

  if (selected === 'traj')
  {
 
  if (checkbox_alfa.checked()){
    drawPlot(x_pos_alfa, y_pos_alfa);
  }

  if (checkbox_bravo.checked()){
    drawPlot(x_pos_bravo, y_pos_bravo, ['#616fc2']);
  }

} else if (selected === 'x_position'){
  if (checkbox_alfa.checked()){
    drawPlot(steps, x_pos_alfa, hover_position=false);
  }

  if (checkbox_bravo.checked()){
    drawPlot(steps, x_pos_bravo, hover_position=false, [255, 0, 255]);
  }
}

}
