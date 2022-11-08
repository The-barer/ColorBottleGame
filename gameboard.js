const gameBoard = document.querySelector('.gameBoard')
const MINBOTTLEWIDTH = 40
const DIFFICULTY = 5
const COLORS = ['red', 'green', 'blue', 'yellow', "aquamarine", 'purple', 'navy', 'maroon', 'orange', '#0075A2', '#FFCBA4', '#3e5641', '#83bca9', '#ca6680']
let colorList = ['aquamarine', '#FFCBA4', 'blue', 'navy', 'blue', 'maroon', '#3e5641', 'yellow', 'navy', 'navy', 'red', '#83bca9', 'purple', 'aquamarine', '#FFCBA4', '#83bca9', 'aquamarine', '#83bca9', 'green', 'red', 'orange', 'maroon', '#3e5641', 'red', '#FFCBA4', 'orange', '#3e5641', '#ca6680', 'yellow', '#FFCBA4', 'maroon', '#0075A2', 'yellow', '#3e5641', 'purple', 'purple', '#0075A2', 'green', 'maroon', '#ca6680', 'purple', 'aquamarine', '#83bca9', 'navy', 'blue', 'aquamarine', 'green', 'maroon', 'green', '#ca6680', '#3e5641', '#83bca9', 'orange', '#ca6680', '#ca6680', 'orange', 'navy', '#FFCBA4', '#0075A2', 'purple', '#0075A2', 'blue', 'orange', 'red', 'red', '#0075A2', 'yellow', 'green', 'yellow', 'blue']
// let colorList = ['aquamarine', '#FFCBA4', 'blue', 'navy', 'blue', 'maroon', '#3e5641', 'yellow', 'navy', 'navy', 'red', '#83bca9', 'purple', 'aquamarine', '#FFCBA4', '#83bca9', 'aquamarine', '#83bca9', 'green', 'red', 'orange', 'maroon', '#3e5641', 'red', '#FFCBA4', 'orange', '#3e5641', '#ca6680', 'yellow', '#FFCBA4', 'maroon', '#0075A2', 'yellow', '#3e5641', 'purple', 'purple', '#0075A2', 'green', 'maroon', '#ca6680', 'purple', 'aquamarine', '#83bca9', 'navy', 'blue', 'aquamarine', 'green', 'maroon', 'green', '#ca6680', '#3e5641', '#83bca9', 'orange', '#ca6680', '#ca6680', 'orange', 'navy', '#FFCBA4', '#0075A2', 'purple', '#0075A2', 'blue', 'orange', 'red', 'red', '#0075A2', 'yellow', 'green', 'yellow', 'blue']
//14,2
const startList = []


function maxElements($Element = gameBoard, pieces = DIFFICULTY, minWidth = MINBOTTLEWIDTH) {
    const maxRows = Math.floor($Element.clientHeight/((pieces+1)*minWidth))
    const maxElInRow = Math.floor($Element.clientWidth/minWidth)-1
    return maxRows*maxElInRow
}


function initGame(levelList) {
    const ROWS = levelList.length > 5 ? 2 : 1;
    const elementsInRow = levelList.length / ROWS
    const bottleWidth = gameBoard.clientWidth/(elementsInRow+2)
    const bottleHeigth = gameBoard.clientHeight/((levelList[0].size + 1)*ROWS)
    const width = bottleWidth<bottleHeigth ? bottleWidth : bottleHeigth
    gameBoard.innerHTML = ''
    gameBoard.appendChild(newRow());
    for (const $bottle of levelList) {
        $bottle.width = width
        $bottle.colors = [...$bottle.origincolors]
        if (gameBoard.lastChild.childNodes.length === elementsInRow) {
            gameBoard.appendChild(newRow());
        }
        initBottle($bottle)
        gameBoard.lastChild.appendChild($bottle)
    }
}

function createLevelList(colorCount = 6, emptyCount = 1, ) { 
    // colorList = createColorList(colorCount, DIFFICULTY) DEBUG
    const tempColors = [...colorList];
    const totalBottles = colorCount + emptyCount;
    for (let i = 0; i < totalBottles; i++) {
        const $bottle = createBottle(DIFFICULTY, tempColors, i)
        startList[i] = $bottle
    }
}

function newRow() {
    const $row = document.createElement('div')
    $row.classList.add('row')
    return $row
}

function createBottle(pieces, color = [], number) {
    const $bottle = document.createElement('div')
    $bottle.classList.add('bottle')
    $bottle.size = pieces
    $bottle.id = number
    $bottle.origincolors = []
    for (let i = 0; i < pieces; i++) {
        if(color.length>0){
            $bottle.origincolors.push(color.pop())
        }
    }
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
            piece.style.width = `${$bottle.width}px`
            piece.style.height = `${$bottle.width}px`
            piece.color = color
            piece.style.backgroundColor = color
            $bottle.append(piece)
        }
    }
}

function createColorList(elementsCount, pieces) {
    //переделать, чтоб если что дублировал цвет, но в нужном кол-ве, генерировать список цветов соответствующий кол-ву элементов.
    const randomColorList = []
    const coloredPieces = elementsCount * pieces
    for (let i = 0; i < coloredPieces; i++) {
        let colorNum = i < elementsCount ? i : i%elementsCount
        randomColorList.push(COLORS[colorNum])
        const j = Math.floor(Math.random() * (i+1))
        const tmp = randomColorList[i]
        randomColorList[i] = randomColorList[j]
        randomColorList[j] = tmp
    }
    return randomColorList
}

