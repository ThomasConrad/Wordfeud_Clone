let sizeX = window.innerWidth;
let sizeY = window.innerHeight-5;
let data;
let wordvalues = [];
let values;
let numbers;
let p1Hand = [];
let p1Coords = [];
let p2Hand = [];
let p2Coords = [];
let words;
let combs = [];
let points = [];
let boxWidth = Math.max(sizeX,sizeY)/45;
let widthFactor = 0.95;
let handFactor = [];
let tiles = [];
let board = [];
let prevMouse = [];
let dragging = 14;


let layout = [["TL","\O","\O","\O","TW","\O","\O"],["\O","DL","\O","\O","\O","TL","\O"],["\O","\O","DW","\O","\O","\O","DL"],["\O","\O","\O","TL","\O","\O","\O"],["TW","\O","\O","\O","DW","\O","DL"],["\O","TL","\O","\O","\O","TL","\O"],["\O","\O","DL","\O","DL","\O","\O"],["DL","\O","\O","DW","\O","\O","\O"]];


function preload() {
  data = loadStrings('words.txt');
}

function setup() {
    words = split(data[0],',')
    values = [1,4,4,2,1,4,3,4,1,10,5,1,3,1,1,4,10,1,1,1,2,4,4,4,4,10]
    amounts = [10,2,2,5,12,2,3,3,9,1,1,4,2,6,7,2,1,6,5,7,4,2,2,1,2,1]
    frameRate(60)
    generateHand(p1Hand);
    generateHand(p2Hand);
    board = genBoard();
    /*p1Combs = possibleWords(p1Hand);
    p1Combs.forEach(word => {
        points.push(wordToValue(word));
    });
    console.log(p1Combs);
    combs.sort(valueSort);
    console.log(p1Combs);*/

    for (let i = 0; i < 14; i++){
        handFactor.push(1.5);
    }



    //Initialize coords for hand tiles//
    //p1
    for (let i = 0; i < p1Hand.length; i++){
        let coord = [];
        coord.push((i-3)/9*(sizeX/3)+(sizeX/6)-boxWidth*handFactor[0]/2)
        coord.push((sizeY-Math.max(sizeX,sizeY)/3)/2+Math.max(sizeX,sizeY)/3-boxWidth*handFactor[0]*3/4)
        p1Coords.push(coord);
    }

    //p2
    for (let i = 0; i < p2Hand.length; i++){
        let coord = [];
        coord.push((i-3)/9*(sizeX/3)+(sizeX/6)-boxWidth*handFactor[0]/2+(2*sizeX/3))
        coord.push((sizeY-Math.max(sizeX,sizeY)/3)/2+Math.max(sizeX,sizeY)/3-boxWidth*handFactor[0]*3/4)
        p2Coords.push(coord);
    }

    //

    


    
    
    

}

function draw() {
    //Draw board//
    createCanvas(sizeX, sizeY);
    background(0);
    textSize(boxWidth/2.3)
    textAlign(CENTER, CENTER);
    for (let i = 0; i < 15; i++){
        for (let j = 0; j < 15; j++){
            fill(colourOfTile(board[i][j]));
            rect((sizeX-15*boxWidth)/2+i*boxWidth,(sizeY-15*boxWidth)/2+j*boxWidth,boxWidth*widthFactor,boxWidth*widthFactor,boxWidth/8);
            fill(color(255,255,255));
            if (board[i][j] == "\X" || board[i][j] == "\O"){
                continue;
            }
            text(board[i][j],(sizeX-15*boxWidth)/2+i*boxWidth+boxWidth/2,(sizeY-15*boxWidth)/2+j*boxWidth+boxWidth/2);
        }
    }
    noFill()
    stroke(color(255,255,255))
    ellipse(sizeX/2,sizeY/2,10)

    let i = 0    
    p1Coords.forEach(coord => {

        if (dragging == i){
            p1Coords[i] = [p1Coords[i][0]-(prevMouse[0]-mouseX),p1Coords[i][1]-(prevMouse[1]-mouseY)];
            handFactor[i] = 1;
        }

        fill(240)
        if(Math.abs(mouseX-boxWidth*handFactor[i]/2-coord[0])<boxWidth*handFactor[i]/2 && Math.abs(mouseY-boxWidth*handFactor[i]/2-coord[1])<boxWidth*handFactor[i]/2){
            fill(210);
        }
        rect(coord[0],coord[1],boxWidth*handFactor[i],boxWidth*handFactor[i],boxWidth/8)
        i++;
    });
    p2Coords.forEach(coord => {
        fill(240)
        if(Math.abs(mouseX-boxWidth*handFactor[i]/2-coord[0])<boxWidth*handFactor[i]/2 && Math.abs(mouseY-boxWidth*handFactor[i]/2-coord[1])<boxWidth*handFactor[i]/2){
            fill(210);
        }
        rect(coord[0],coord[1],boxWidth*handFactor[i],boxWidth*handFactor[i],boxWidth/8)
        i++;
    });
    prevMouse = [mouseX,mouseY];

}

function mousePressed(){
    let i = 0
    p1Coords.forEach(coord => {
        if(Math.abs(mouseX-boxWidth*handFactor[i]/2-coord[0])<boxWidth*handFactor[i]/2 && Math.abs(mouseY-boxWidth*handFactor[i]/2-coord[1])<boxWidth*handFactor[i]/2){
            dragging = i;
        }
        i++;

    });
    p2Coords.forEach(coord => {
        if(Math.abs(mouseX-boxWidth*handFactor[i]/2-coord[0])<boxWidth*handFactor[i]/2 && Math.abs(mouseY-boxWidth*handFactor[i]/2-coord[1])<boxWidth*handFactor[i]/2){
            fill(210);
        }
        i++;

    });

}
function mouseReleased(){
    dragging = 14;
}


function valueSort(a, b) {
    return wordToValue(b) - wordToValue(a);
}
  


function colourOfTile(arg){
    if (arg == "\O"){
        return color(45,48,54);
    }
    else if (arg == "TL"){
        return color(72,101,169);
    }
    else if (arg == "DL"){
        return color(114,156,103);
    }
    else if (arg == "DW"){
        return color(192,120,33);
    }
    else if (arg == "TW"){
        return color(130,60,64);
    }
    else if (arg == "\X"){
        return color(102,68,98);
    }
    else{
        return color(240);
    }
}

function genBoard(){
    let generated = [];
    for (let i = 0; i < 15;i++){
        let lane = [];
        for (let j = 0; j < 15; j++){
            lane.push(genHelper(i,j));
        }
        generated.push(lane);
    }
    return generated;
}

function genHelper(X,Y){
    if (X == 7 && Y == 7){
        return "\X";
    }
    else if(X < 8 && Y < 7){
        return layout[X][Y];
    }
    else if (X > 7 && Y < 8){
        return layout[Y][14-X];
    }
    else if (X < 7 && Y > 6){
        return layout[14-Y][X];
    }
    else if (X > 6 && Y > 7){
        return layout[14-X][14-Y];
    }
}

function wordToValue(word){
    word = word.split('');
    let value = 0;
    word.forEach(letter => {
        value += values[letter.charCodeAt(0)-65]
    });
    return value;
}


function possibleWords(_hand){
    let posWords = [];
    words.forEach(word => {
        if(isPossible(word.split(''),_hand)){
            posWords.push(word);
        }
    });

    return posWords;
}

function isPossible(curWord, inHand){
    curHand = inHand.slice();
    if(curWord.length > curHand.length){ return false; }
    for (let i = 0; i < curWord.length;i++){
        let has = false;
        for ( let j = 0; j < curHand.length;j++){

            if (curWord[i] == curHand[j]){
                curHand.splice(j,1);
                has = true;
                break;
            }

        }
        if (!has) {return false;}
    }
    return true;
}


function generateHand(playerHand){
    for(let i = 0;i < 7;i++){
        let r = int(random(102))
        drawLetter(0,0,r,playerHand);
    }
}

function drawLetter(prev,turn,rand,playerHand){
    
    if (rand < amounts[turn] + prev){
        playerHand.push(String.fromCharCode(65+turn));
        return turn;
    }
    else{
        drawLetter(amounts[turn] + prev,turn+1,rand,playerHand);
    }
}