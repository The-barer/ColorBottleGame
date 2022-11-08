const gameBoard = document.querySelector('.gameBoard')
const controls = document.querySelector('.controls')

gameBoard.addEventListener('click', bottleEvents)
controls.addEventListener('click', controlsEvents)

let choosedState = false
let $inputElement

function bottleEvents(event) {
    let $newBottle = event.target
    if ($newBottle.classList.contains('colorPiece')) {
        $newBottle = $newBottle.parentNode
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
    }

    switch ($Button.dataset.type) {
        case 'startNewGame':
            createPlayground(9,4,2)
            break;
    
        case 'startAgainCurrent':
            createPlayground(9,4,2, false)
            break;
    }
}