const width = document.body.offsetWidth / 1.5;
const height = 700 * width / 500;
const itemLength = width / 10;
const itemsToHeight = height / itemLength;
const numItems = Math.round(width / itemLength * 9 * height / 7 / itemLength);

const main = document.querySelector(".main");
main.style.width = width + "px";
main.style.height = height + "px";

const tetris_window = document.createElement("div");
tetris_window.classList.add("tetris_window");
tetris_window.style.width = width + "px";
tetris_window.style.height = 9 * height / 7 + "px";



for (let i = 0; i <= numItems; i++) {
    const tetris_bit = document.createElement("div");
    tetris_bit.style.width = itemLength + "px";
    tetris_bit.style.height = itemLength + "px";
    tetris_bit.classList.add("tetris_bit");
    tetris_window.appendChild(tetris_bit);
}

main.appendChild(tetris_window);

let tetris_bit_i = 0;
const tetris_bit = document.getElementsByClassName("tetris_bit");
for (let y = Math.round(9/7*height / itemLength); y > 0; y--) {
    for (let x = 1; x < width / itemLength + 1; x++) {
        tetris_bit[tetris_bit_i].setAttribute("positionX", x);
        tetris_bit[tetris_bit_i].setAttribute("positionY", y);
        tetris_bit_i++
    }
}

const initialX = 5, initialY = 15;
let mainElements = [
    [[0, 1], [0, 2], [0, 3]], //long
    [[1, 0], [0, 1], [1, 1]], //square
    [[1, 0], [0, 1], [0, 2]], //L
    [[1, 0], [1, 1], [1, 2]], //L~
    [[1, 0], [-1, 1], [0, 1]], //Z
    [[1, 0], [1, 1], [2, 1]], //Z~
    [[1, 0], [2, 0], [1, 1]] //
]

let curentElement = 0;
let elementBody = 0;

function createElement() {
    function getElementNumber() {
        return Math.round(Math.random() * (mainElements.length - 1))
    }
    curentElement = getElementNumber();
    elementBody = [
        document.querySelector(`[positionX = "${initialX}"][positionY = "${initialY}"]`),
        document.querySelector(`[positionX = "${initialX + mainElements[curentElement][0][0]}"][positionY = "${initialY + mainElements[curentElement][0][1]}"]`),
        document.querySelector(`[positionX = "${initialX + mainElements[curentElement][1][0]}"][positionY = "${initialY + mainElements[curentElement][1][1]}"]`),
        document.querySelector(`[positionX = "${initialX + mainElements[curentElement][2][0]}"][positionY = "${initialY + mainElements[curentElement][2][1]}"]`),
    ]

    for (let i = 0; i < elementBody.length; i++) {
        elementBody[i].classList.add("tetris_item")
        
    }
}

function move() {
    this.moved = true;
     let coordinate = [];
     for(let i = 0; i < elementBody.length; i++) {
         let elementBodyItem = [elementBody[i].getAttribute("positionX"), elementBody[i].getAttribute("positionY")];
         coordinate.push(elementBodyItem)
     }
     for (let i = 0; i < coordinate.length; i++) {
         console.log(coordinate[i][0],coordinate[i][1]-1);
         
        //  console.log(document.querySelector(`[positionX = "${coordinate[i][0]}"][positionY = "${coordinate[i][1]}"]`));
         
         if(coordinate[i][1] == 1 || document.querySelector(`[positionX = "${coordinate[i][0]}"][positionY = "${coordinate[i][1]-1}"]`).classList.contains("set_item")) {
            this.moved = false;
            break;
         }
         
     }
     if(this.moved) {
        for(let i = 0; i < elementBody.length; i++) {
            elementBody[i].classList.remove("tetris_item");
        }
        elementBody = []

        for (let i = 0; i < coordinate.length; i++) {
            elementBody.push(document.querySelector(`[positionX = "${coordinate[i][0]}"][positionY = "${coordinate[i][1]-1}"]`))
        }
        // console.log(elementBody);
        for(let i = 0; i < elementBody.length; i++) {
            elementBody[i].classList.add("tetris_item");
        }
     } else {
        for(let i = 0; i < elementBody.length; i++) {
            elementBody[i].classList.remove("tetris_item");
            elementBody[i].classList.add("set_item");
        }
        createElement(); 
     }
}

createElement();

// let interval = setInterval(() => {
//     move()
// }, 300);