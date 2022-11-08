const BOTTLE_WIDTH = 8
const COLORS = ['red', 'green', 'blue', 'yellow', "aquamarine", 'purple', 'navy', 'maroon', 'orange', '#0075A2', '#FFCBA4', '#3e5641', '#83bca9', '#ca6680']
let colorList = []

function createPlayground(bottlesCount = 2, bottlePieces = 3, emptyCount = 1, newGame = true) { 
    if(newGame || colorList.length === 0) {
        colorList = createColorList(bottlesCount, bottlePieces)
    };
    const tempColors = [...colorList]
    const gameBoard = document.querySelector('.gameBoard')
    const boardWidth = gameBoard.getBoundingClientRect().width
    const boardheight = gameBoard.getBoundingClientRect().height
    const maxBottlesInRow = Math.floor(boardWidth / (boardheight/(BOTTLE_WIDTH+2))) - 1
    const totalBottles = bottlesCount+emptyCount
    gameBoard.innerHTML = ''
    let minRows = Math.ceil(totalBottles/maxBottlesInRow)
    if(totalBottles > 5 && bottlesCount < maxBottlesInRow) {
        minRows = 2
    } 
    
    gameBoard.appendChild(newRow())

    for (let i = totalBottles; i > 0; i--) {
        if (gameBoard.lastChild.childNodes.length === Math.ceil(totalBottles/minRows)) {
            gameBoard.appendChild(newRow())
        }
        const $bottle = createBottle(bottlePieces, tempColors)
        gameBoard.lastChild.appendChild($bottle)
    }
}


function newRow() {
    const $row = document.createElement('div')
    $row.classList.add('row')
    return $row
}

function createBottle(pieces, colors = []) {
    const $bottle = document.createElement('div')
    $bottle.classList.add('bottle')
    $bottle.style.height = `${pieces*BOTTLE_WIDTH}vh`;
    $bottle.style.width = `${BOTTLE_WIDTH}vh`;
    $bottle.size = pieces
    for (let i = 0; i < pieces; i++) {
        if(colors.length > 0) {
            const piece = document.createElement('div')
            piece.classList.add('colorPiece')
            piece.style.width = `${BOTTLE_WIDTH}vh`
            piece.style.height = `${BOTTLE_WIDTH}vh`
            piece.color = colors.pop()
            piece.style.backgroundColor = piece.color
            $bottle.append(piece)
        }
    }
    return $bottle
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

