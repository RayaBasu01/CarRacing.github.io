
const score = document.getElementById("score");
const start = document.getElementById("start");
const road = document.getElementById("road");


let player = { speed: 5 };

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

const movecars = (car) => {
    let enemyCar = document.querySelectorAll('.enemyCar');

    enemyCar.forEach(function (item) {


        if(isCollied(car,item)){
            console.log("game over")
        }
        // console.log(item.y)
        if (item.y >= 750) {
            item.y = -600;
            item.style.left = Math.floor(Math.random() * 350) + 'px';
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

        if (keys.ArrowUp && player.y > 70) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (gameArea.height - 70)) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < (gameArea.width - 50)) { player.x += player.speed }

        car.style.top = player.y + 'px';
        car.style.left = player.x + 'px';


        window.requestAnimationFrame(gamePlay)
    }
}


const startgame = () => {
    road.classList.remove('hidden');
    start.classList.add('hidden');
    player.startgame = true;
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
    car.innerText = 'its a car';
    road.appendChild(car);


    player.x = car.offsetLeft;
    player.y = car.offsetTop;


    for (x = 0; x < 4; x++) {

        let enemyCar = document.createElement("div")
        enemyCar.setAttribute('class', 'enemyCar')
        enemyCar.y = ((x + 1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + 'px';
        enemyCar.style.backgroundColor = 'orange';
        enemyCar.style.left = Math.floor(Math.random() * 350) + 'px';
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


