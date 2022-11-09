const gameBoard = document.querySelector('.gameBoard')
const MINBOTTLEWIDTH = 40
const MAX_ADDEMPTY = 2
const DIFFICULTY = 5
const COLORS = ['red', 'green', 'blue', 'yellow', "aquamarine", 'purple', 'navy', 'maroon', 'orange', '#0075A2', '#FFCBA4', '#3e5641', '#ca6680']

let startList = []


function maxElements($Element = gameBoard, pieces = DIFFICULTY, minWidth = MINBOTTLEWIDTH) {
    const maxRows = Math.floor($Element.clientHeight/((pieces+1)*minWidth))
    const maxElInRow = Math.floor($Element.clientWidth/minWidth)-1
    return maxRows*maxElInRow
}


function initGame(levelList) {
    const elemSize = levelList[0]
    const elemsCount = levelList.length -1
    const ROWS = elemsCount > 5 ? 2 : 1;
    const elemCurrentGameWidth = setBottleWidth(elemSize, elemsCount, ROWS)
    
    gameBoard.innerHTML = ''
    gameBoard.appendChild(newRow());
    for (let i = 0; i < elemsCount; i++) {
        if (gameBoard.lastChild.childNodes.length === Math.ceil(elemsCount / ROWS)) {
            gameBoard.appendChild(newRow());
        }
        const $bottle = createBottle(levelList[i+1], elemSize)
        $bottle.width = elemCurrentGameWidth
        initBottle($bottle)
        gameBoard.lastChild.appendChild($bottle)
    }
}

function createLevelList(colors, emptyCount, pieces) { 
    const level = [pieces, ...createColorList(colors, pieces)]
    level.length += emptyCount
    return level
}

function setBottleWidth(eSize, eCount , rows) {
    const vertSize = ((eSize + 1)*rows)
    const horSize = Math.ceil((eCount - 1) / rows) + (MAX_ADDEMPTY || 1)
    const eWidth = gameBoard.clientWidth / horSize
    const eHeigth = gameBoard.clientHeight / vertSize
    return eWidth < eHeigth ? eWidth : eHeigth
}

function newRow() {
    const $row = document.createElement('div')
    $row.classList.add('row')
    return $row
}

function createBottle(colors = [], maxSize) {
    const currentBottles = document.querySelectorAll('.bottle').length || 0
    const $bottle = document.createElement('div')
    $bottle.classList.add('bottle')
    $bottle.size = maxSize
    $bottle.id = currentBottles+1
    $bottle.origincolors = [...colors]
    $bottle.colors = [...colors]
    return $bottle
}

function initBottle($bottle){
    $bottle.innerHTML = ''
    $bottle.style.height = `${$bottle.size*$bottle.width}px`;
    $bottle.style.width = `${$bottle.width}px`;
    if($bottle.colors.length > 0) {
        for (let color of $bottle.colors) {
            const piece = document.createElement('div')
            piece.classList.add('colorPiece')
            piece.style.height = `${$bottle.width}px`
            piece.color = color
            piece.style.backgroundColor = color
            $bottle.append(piece)
        }
    }
}


function createColorList(colorsCount, pieces) {
    const randomList = []
    for (let i = 0; i < colorsCount * pieces; i++) {
        randomList.push(COLORS[i % colorsCount % COLORS.length])
        const j = Math.floor(Math.random() * (i+1))
        const tmp = randomList[i]
        randomList[i] = randomList[j]
        randomList[j] = tmp
    }
    const resultList = []
    for (let j = 0 ; j < colorsCount; j++) {
        resultList[j] = randomList.slice((j*pieces), pieces + (j*pieces))
    }
    return resultList
}

function addEmptyBottle() {
    const currentBottles = document.querySelectorAll('.bottle')
    if(currentBottles.length >= startList.length - 1 + MAX_ADDEMPTY) {
        return
    }
    const ROWS = gameBoard.childNodes
    const inRow = Math.floor(currentBottles.length/ROWS.length)
    const curSize = currentBottles[0].size
    const curWidth = currentBottles[0].width
    for (const row of ROWS) {
        if(row.childNodes.length <= inRow){
            const newOne = createBottle([], curSize)
            newOne.width = curWidth
            initBottle(newOne)
            row.appendChild(newOne)
            break
        }
    }
}


// const colTest = ['red', 'green', 'blue', 'yellow']

// function test(colorsCount) {
//     const tmp = []
//     const e = colTest.length

//     for (let i = 0; i < colorsCount*2; i++) {
//         tmp.push(colTest[i % colorsCount % e])
//     }
//     console.log(tmp);
// }



