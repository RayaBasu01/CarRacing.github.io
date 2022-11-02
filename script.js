
const score = document.getElementById("score");
const start = document.getElementById("start");
const road = document.getElementById("road");

let cars=['car2','car3','car4','car5','car6','car7']

let player = { speed: 5 , 
               score:0};

const isCollied = (a, b) => {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top)
              || (aRect.left > bRect.right) || (aRect.right < bRect.left));
}



const moveLines = () => {
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function (item) {
        // console.log(item.y)
        if (item.y >= 2200) {
            item.y -= 2250;
        }
        item.y += player.speed;
        item.style.top = item.y + 'px';

    });
}

const ended=()=>{
    player.startgame=false;
    start.classList.remove('hidden')
    ps=player.score +1;
    start.innerHTML= `Game Over <br> Your Score : ${ps} <br>  Click to Restart the Game` 
}

const movecars = (car) => {
    let enemyCar = document.querySelectorAll('.enemyCar');

    enemyCar.forEach(function (item) {


        if(isCollied(car,item)){
            ended();
        }
        // console.log(item.y)
        if (item.y >= 2200) {
            item.y = -600;
            item.style.left = Math.floor(Math.random() * 340) + 'px';
        }

        item.y += player.speed;
        item.style.top = item.y + 'px';

    });
}

const gamePlay = () => {
    // console.log("clicked");
    let car = document.querySelector(".car")
    let gameArea = road.getBoundingClientRect();
    // console.log(gameArea)

    if (player.startgame) {
        moveLines();
        movecars(car);

        if (keys.ArrowUp && player.y > 80) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (gameArea.height - 80)) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < (gameArea.width - 50)) { player.x += player.speed }

        car.style.top = player.y + 'px';
        car.style.left = player.x + 'px';


        window.requestAnimationFrame(gamePlay);
        player.score++;
        score.innerText= "SCORE : " + player.score;
    }
}


const startgame = () => {
    // road.classList.remove('hidden');
    road.innerHTML="";
    start.classList.add('hidden');
    player.startgame = true;
    player.score=0;
    window.requestAnimationFrame(gamePlay);

    for (x = 0; x < 20; x++) {

        let roadLine = document.createElement("div")
        roadLine.setAttribute('class', 'lines')
        roadLine.y = (x * 150);
        roadLine.style.top = (x * 150) + 'px';
        road.appendChild(roadLine);
    }
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    road.appendChild(car);


    player.x = car.offsetLeft;
    player.y = car.offsetTop;


    for (x = 0; x < 8; x++) {

        let enemyCar = document.createElement("div")
        enemyCar.setAttribute('class', 'enemyCar')
        enemyCar.y = ((x + 1) * 340) * -1;
        enemyCar.style.top = enemyCar.y + 'px';
        c="'"+cars[Math.floor(Math.random()*6)]+".png'"
        console.log(c)
        enemyCar.style.backgroundImage = `url(${c})`;
        enemyCar.style.left = Math.floor(Math.random() * 340) + 'px';
        road.appendChild(enemyCar);
    }

}

start.addEventListener("click", startgame)





// ----------keys controller--------------// 


let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}


const keyDown = (e) => {
    e.preventDefault();
    keys[e.key] = true;
}

const keyUp = (e) => {
    e.preventDefault();
    keys[e.key] = false;

}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);


