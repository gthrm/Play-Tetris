let tetris = document.createElement('div');
tetris.classList.add('tetris');

for (let i=1; i<181; i++) {
    let excel = document.createElement('div');
    excel.classList.add('excel');
    tetris.appendChild(excel);
}

let main = document.getElementsByClassName('main')[0];
main.appendChild(tetris);

let excel = document.getElementsByClassName('excel');
let i = 0;

for (let y=18; y>0; y--) {
    for (let x=1; x<11; x++) {
        excel[i].setAttribute('posX', x);
        excel[i].setAttribute('posY', y);
        i++;
    }
}

let x = 5, y = 15;
let mainArr=[[[0,1],[0,2],[0,3],[[-1,1],[0,0],[1,-1],[2,-2]],[[1,-1],[0,0],[-1,1],[-2,2]],[[-1,1],[0,0],[1,-1],[2,-2]],[[1,-1],[0,0],[-1,1],[-2,2]]],[[1,0],[0,1],[1,1],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]]],[[1,0],[0,1],[0,2][[0,0],[-1,1],[1,0],[2,-1]],[[1,-1],[1,-1],[-1,0],[-1,0]],[[-1,0],[0,-1],[2,-2],[1,-1]],[[0,-1],[0,-1],[-2,0],[-2,0]]],[[1,0],[1,1],[1,2],[[0,0],[0,0],[1,-1],[-1,-1]],[[0,-1],[-1,0],[-2,1],[1,0]],[[2,0],[0,0],[1,-1],[1,-1]],[[-2,0],[1,-1],[0,0],[-1,1]]],[[1,0],[1,1],[2,1],[[2,-1],[0,0],[1,-1],[-1,0]],[[-2,0],[0,-1],[-1,0],[1,-1]],[[2,-1],[0,0],[1,-1],[-1,0]],[[-2,0],[0,-1],[-1,0],[1,-1]]],[[1,0],[-1,1],[0,1],[[0,-1],[-1,0],[2,-1],[1,0]],[[0,0],[1,-1],[-2,0],[-1,-1]],[[0,-1],[-1,0],[2,-1],[1,0]],[[0,0],[1,-1],[-2,0],[-1,-1]]],[[1,0],[2,0],[1,1],[[1,-1],[0,0],[0,0],[0,0]],[[0,0],[-1,0],[-1,0],[1,-1]],[[1,-1],[1,-1],[1,-1],[0,0]],[[-2,0],[0,-1],[0,-1],[-1,-1]]],]

let currentFigure = 0;
let figureBody = 0;
let rotate = 1;

function create() {
    function getRandom() {
        return Math.round(Math.random()*(mainArr.length-1))
    }

    rotate = 1;
    currentFigure = getRandom();

    figureBody = [
        document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`),
    ]

    for (let i=0; i<figureBody.length; i++) {
        figureBody[i].classList.add('figure');
    }
}
create();

function move() {
    let moveFlag = true;
    let coordinates = [
        [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
        [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
        [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
        [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],
    ];


    for (let i=0; i<coordinates.length; i++) {
        if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1] - 1}"]`).classList.contains('set')) {
            moveFlag = false;
            break;
        }
    }
    //if (moveFlag) == сокращённая запись if (moveFlag == true)
    if (moveFlag) {
        for (let i = 0; i<figureBody.length; i++) {
            figureBody[i].classList.remove('figure');
        }
        figureBody = [
            document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] - 1}"]`),
            document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] - 1}"]`),
            document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] - 1}"]`),
            document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] - 1}"]`),
        ];
        for (let i = 0; i<figureBody.length; i++) {
            figureBody[i].classList.add('figure');
        }
    } /* действия при moveFlag == false */
     else {
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.remove('figure');
            figureBody[i].classList.add('set');
        }
        create();
     }
}

let interval = setInterval(() => {
    move();
}, 300);

let flag = true;

window.addEventListener('keydown', function (e) {

    let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
    let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
    let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
    let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];

    function getNewState (a) { // функция принимает в себя технический параметр a, равный либо 1, либо -1, в зависимости от того какую клавишу мы нажмём на клавиатуре
        
        flag = true;

        let figureNew = [
            document.querySelector(`[posX = "${+coordinates1[0] + a}"][posY = "${coordinates1[1]}"]`),
            document.querySelector(`[posX = "${+coordinates2[0] + a}"][posY = "${coordinates2[1]}"]`),
            document.querySelector(`[posX = "${+coordinates3[0] + a}"][posY = "${coordinates3[1]}"]`),
            document.querySelector(`[posX = "${+coordinates4[0] + a}"][posY = "${coordinates4[1]}"]`),
        ];

        for (let i=0; i<figureNew.length; i++) {
            if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                flag = false;
            }
        }

        if (flag == true) {
            for (let i = 0; i<figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            }

            figureBody = figureNew;

            for (let i = 0; i<figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }
        }

    }

    if (e.keyCode == 37) { //keyCode == 37 - стрелка влево
        getNewState(-1);
    } else if (e.keyCode == 39) { //keyCode == 39 - стрелка вправо
        getNewState(1);
    } else if (e.keyCode == 40) { //keyCode == 40 - стрелка вниз
        move();
    } else if (e.keyCode == 38) { //keyCode == 38 - стрелка вверх
        flag = true;

        let figureNew = [
            document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY = "${
            +coordinates1[1] + mainArr[currentFigure][rotate + 2][0][1]}"]`),
            document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY = "${
            +coordinates2[1] + mainArr[currentFigure][rotate + 2][1][1]}"]`),
            document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY = "${
            +coordinates3[1] + mainArr[currentFigure][rotate + 2][2][1]}"]`),
            document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY = "${
            +coordinates4[1] + mainArr[currentFigure][rotate + 2][3][1]}"]`),
        ];

        for (let i=0; i<figureNew.length; i++) {
            if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                flag = false;
            }
        }

        if (flag == true) {
            for (let i = 0; i<figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            }

            figureBody = figureNew;

            for (let i = 0; i<figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }

            if (rotate < 4) {
                rotate++;
            } else {
                rotate = 1;
            }
        }
    } 
    


})
