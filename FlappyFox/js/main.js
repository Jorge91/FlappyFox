window.addEventListener('load',init,false);
var canvas=null,ctx=null;
var totalWidth = window.innerWidth;
var totalHeight = window.innerHeight;
var bird_x=totalWidth/4,bird_y=totalHeight/2;
var lastPress=null;
var pause=true;
var dir=1;
var unit = totalHeight/100;
var munit = unit/10;
var hunit = totalWidth/100;
var birdUnit = unit*8;
var gameover = false;
var gravity = 0;

var points = 0;
var turn = 0;
var maxPoints = 0;

var imagen_pajaro = document.getElementById("imagen_pajaro_id");
var image = new Image();
image.src = "images/firefox-512-noshadow.png";
//image.src = "images/marianBird.png";
var cloudImage = new Image();
cloudImage.src = "images/cloud2-th.png";


var KEY_ENTER=13;
var KEY_LEFT=37;
var KEY_UP=38;
var KEY_RIGHT=39;
var KEY_DOWN=40;

var startPoint = (Math.PI/180)*0;
var endPoint = (Math.PI/180)*360;

var top_enemy_x=totalWidth - 20*unit;
var top_enemy_y=totalHeight/2;
var bot_enemy_x=unit*12;
var bot_enemy_y=totalHeight/2;

var top_enemy_x2=totalWidth - 20*unit;
var top_enemy_y2=0;
var bot_enemy_x2=unit*12;
var bot_enemy_y2=totalHeight/2 - 25*unit;

var nube1x = totalWidth;
var nube1y = 10*unit;
var nube2x = 10*hunit;
var nube2y = 50*unit;
var nube3x = 50*hunit;
var nube3y = 60*unit;
var nube4x = 30*hunit;
var nube4y = 50*unit;
var nube5x = 10*hunit;
var nube5y = 10*unit;


function init(){
    

    canvas=document.getElementById('canvas');
    ctx=canvas.getContext('2d');
    ctx.canvas.width  = totalWidth;
    ctx.canvas.height = totalHeight;
    canvas.addEventListener("click", mouseClickEvent, false);
    run();
    repaint();
}

function run(){
    setTimeout(run,15);
    act();
}

function repaint(){
    requestAnimationFrame(repaint);
    paint(ctx);
}

//LOGICA DEL JUEGO
function act(){

/*
Todo se tiene que englobar en un if, para comprobar si el juego ha terminado (gameOver = false).
En ese caso, se deja de variar la lógica del juego a la espera de que se pulse una tecla, 
para reanudar con valores iniciales. También se tiene que controlar en el paint(ctx) para que se pinte 
una pantalla de Game Over.
*/
    if(lastPress==KEY_UP)
            dir=10;

    if (gameover){
        if (dir==10) {
            gameover=false;
            top_enemy_x=totalWidth - 20*unit;
            top_enemy_y=totalHeight/2;
            bot_enemy_x=unit*12;
            bot_enemy_y=totalHeight/2;

            top_enemy_x2=totalWidth - 20*unit;
            top_enemy_y2=0;
            bot_enemy_x2=unit*12;
            bot_enemy_y2=totalHeight/2 - 25*unit;
            bird_x=totalWidth/4;
            bird_y=totalHeight/2;

            points = 0;
        }


    }



    else {

        
        //Create enemy
        if (top_enemy_x + unit*12 <= 0) createEnemy();

        //Movimiento tuberías
        top_enemy_x-=unit/2;
        top_enemy_x2-=unit/2;

        //Fondo
        scenary();
   
        // Points
        points++;
        
        
        //Movimiento vertical
        if(dir==7) {
            bird_y-=2*unit;
        }

        if(dir==8) {
            bird_y-=2*unit;
        }

        if(dir==9) {
            bird_y-=2*unit;
        }

        if(dir==10) {
            bird_y-=2*unit;
            lastPress = 0;
            gravity = 0;

        }
        if(dir==0){
            bird_y+=unit;
            gravity++;
            //if (gravity>10)bird_y+=unit;
            if (gravity>25)bird_y+=unit/2;
        }
        else {
            dir--;


        }
        
        //Comprobar gameOver
        checkGameOver();
    }
}

function scenary(){
    nube1x -= 1;

    nube2x -= 2;

    nube3x -= 3;

    nube4x -= 4;

    nube5x -= 1;

    random1 = Math.ceil(Math.random() * 100);

    if (nube1x+20*unit <= 0) {
        nube1x = totalWidth;
        nube1y = random1 * unit;}

    if (nube2x+12*unit <= 0) {
        nube2x = totalWidth;
        nube2y = random1 * unit;}

    if (nube3x+12*unit <= 0) {
        nube3x = totalWidth;
        nube3y = random1 * unit;}

    if (nube4x+12*unit <= 0) {
        nube4x = totalWidth;
        nube4y = random1 * unit;}

    if (nube5x+30*unit <= 0) {
        nube5x = totalWidth;
        nube5y = random1 * unit;}

}


function createEnemy(){
    random1 = Math.ceil(Math.random() * 100);
    random2 = Math.ceil(Math.random());
    
    //Tuberia de abajo
    top_enemy_y=totalHeight - (random1 * unit);
    if (top_enemy_y <= 25*unit) top_enemy_y = 26 * unit;
    bot_enemy_y=totalHeight - top_enemy_y;
    top_enemy_x=totalWidth - 5*unit;
    bot_enemy_x=unit*12;

    //Tuberia de arriba
    top_enemy_x2=top_enemy_x;
    top_enemy_y2=0;
    bot_enemy_x2=unit*12;
    bot_enemy_y2=top_enemy_y - 25*unit;
}

function checkGameOver() {

    //Colisiones
    if (bird_y < 0) gameover = true;
    if (bird_y+birdUnit > totalHeight) gameover = true;
    
    //Tuberia de abajo
    if ((bird_y+birdUnit >= top_enemy_y)&&((top_enemy_x <= bird_x+birdUnit)&&((top_enemy_x+unit*12) > bird_x))) gameover = true;
    //Tuberia superior
    if ((bird_y < bot_enemy_y2)&&((top_enemy_x <= bird_x+birdUnit)&&((top_enemy_x+unit*12) > bird_x))) gameover = true;

    if (gameover){
        dir=0;
        lastPress=0;
        if (points > maxPoints) maxPoints=points;
    }
}

//FUNCION DE PINTAR
function paint(ctx){
    ctx.fillStyle='#87CEFA';
    ctx.fillRect(0,0,totalWidth,totalHeight);

    //Paint fondo
    ctx.drawImage(cloudImage, nube1x, nube1y, 20*unit, 10*unit);
    ctx.drawImage(cloudImage, nube2x, nube2y, 12*unit, 6*unit);
    ctx.drawImage(cloudImage, nube3x, nube3y, 12*unit, 6*unit);
    ctx.drawImage(cloudImage, nube4x, nube4y, 12*unit, 6*unit);
    ctx.drawImage(cloudImage, nube5x, nube5y, 30*unit, 15*unit);

    //Paint pajaro
    ctx.fillStyle='#FF4500';
    //ctx.fillRect(bird_x,bird_y,birdUnit,birdUnit);
    /*ctx.beginPath();
    ctx.arc(bird_x,bird_y,birdUnit/2,startPoint,endPoint,false);
    ctx.fill();
    ctx.closePath();*/
    ctx.drawImage(image, bird_x, bird_y, birdUnit, birdUnit);
    


    //Paint enemies
    ctx.fillStyle='#32CD32';
    ctx.fillRect(top_enemy_x,top_enemy_y,bot_enemy_x,bot_enemy_y);
    ctx.fillRect(top_enemy_x2,top_enemy_y2,bot_enemy_x2,bot_enemy_y2);

    ctx.fillRect(top_enemy_x-unit,top_enemy_y,bot_enemy_x+2*unit,unit*2);
    ctx.fillRect(top_enemy_x2-unit,top_enemy_y2+bot_enemy_y2-unit,bot_enemy_x+2*unit,unit*2);

    //Debug    
    ctx.fillStyle='#F8F8FF';
    ctx.font="10px Verdana";
    ctx.fillText("Points: "+ points,0,20);


    if (gameover){
    ctx.strokeStyle = 'black';
    ctx.fillStyle='black';
    ctx.font="30px Verdana";
    ctx.lineWidth = 1;
    ctx.strokeText("PRESS TO START",10*hunit,40*unit);
    ctx.font="25px Verdana";
    ctx.strokeText("TAP TO FLY!",20*hunit,50*unit);
    ctx.font="14px Verdana";
    ctx.fillText("POINTS: "+ points,30*hunit,60*unit);
    ctx.fillText("RECORD: "+maxPoints,30*hunit,70*unit);
    }
}

function mouseClickEvent(e) {
    dir=10;
    }


document.addEventListener('keydown',function(evt){
    lastPress=evt.keyCode;
},false);

window.requestAnimationFrame=(function(){
    return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        function(callback){window.setTimeout(callback,17);};
})();