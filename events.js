gameBoard.addEventListener('click', bottleEvents)
controls.addEventListener('click', controlsEvents)

let choosedState = false
let $inputElement

function bottleEvents(event) {
    let $newBottle = event.target
    if ($newBottle.classList.contains('colorPiece')) {
        $newBottle = $newBottle.parentNode
    } else if(!$newBottle.classList.contains('bottle')){
        return
    }

    if(choosedState) {
        colorReplace($inputElement, $newBottle);
        $inputElement.classList.toggle('chosed')
        choosedState = false
        return
    }
    $inputElement = $newBottle
    $inputElement.classList.toggle('chosed')
    choosedState = true
}


function controlsEvents(event) {
    let $Button = event.target
    if(!$Button.dataset.type) {
        $Button = event.target.parentNode
    } else if(!$Button.dataset.type){
        return
    }

    switch ($Button.dataset.type) {
        case 'startNewGame':
            startNewGame()
            break;
        case 'startAgainCurrent':
            initGame(startList)
            break;
        case 'stepback':
            restoreState()
            break;
        case 'addempty':
            addEmptyBottle()
            break;
        case 'about':
            aboutWindow = $.modal({...aboutModal})
            aboutWindow.open()
            break
    }
}

function startNewGame(col = 14, free = 2, piece = 5) {
    startList = createLevelList(col, free, piece)
    initGame(startList)
    controls.innerHTML = ''
    addStepBackButton()
    addStartAgainButton()
    addNewEmptyButton()
}
function stopGame() {
    controls.innerHTML = ''
    addNewGameButton()
    addInfoButton()
}