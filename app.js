// ----План---
// ?Сохранить текущую игру
// ?Сохранить уровень
// ?Загрузить игру(открыть уровнь)
// Подсказки для кнопок!!!

//Страница Победы - Результатов отдельным модулем
// Счетчик шагов
// Счетчик Времени
// Результаты конкретной игры
// ?Таблица рекордов, сохранение результатов
// PAuse game

//Настройки:
// Превью модули для настроек показывающие как меняются
// Выбор фона
// Выбор цветов для колб в игре

//Стартовая страница отдельным модулем
// Начать игру: Выбрать готовый уровень или создать случайный

// ?Меню выбора уровней, на главной странице (с инфо - лучшими результатами)
// ?Разблокировка уровня по мере прохождения
// ?Анимации
// ?скины бутылочек

let savedMoves = []
function colorReplace(inputElement, outputElement) {
    if(inputElement === outputElement) {
        return
    }
    const FREE = outputElement.size - outputElement.querySelectorAll('.colorPiece').length
    if(FREE === 0 || !colorMatch()) {
        return
    } else  colorMove();

    function colorMatch(){
        let outElementPieces = outputElement.querySelectorAll('.colorPiece')
        let inElementPiecse = inputElement.querySelectorAll('.colorPiece')
        try {
            return outElementPieces[outElementPieces.length-1].color === inElementPiecse[inElementPiecse.length-1].color
        } catch (error) {
            return outElementPieces.length === 0
        }
    }
    function colorMove() {
        saveState(inputElement, outputElement)
        for (let i = 0; i < FREE; i++) { 
            if(colorMatch()) {
                outputElement.appendChild(inputElement.lastChild)
            } else break 
            outputElement.colors.push(inputElement.colors.pop())
        }
        validateBottle(inputElement) 
        validateBottle(outputElement) && validateWin()
    }
    function saveState(inElement, outElement){
        savedMoves.push([[inElement, [...inElement.colors]],[outElement, [...outElement.colors]]])
    }
}

function restoreState() {
    const len = savedMoves.length
    if (len === 0){
        return
    }
    const stepBack = savedMoves.pop()
    const oneEl = stepBack[0][0]
    const twoEL = stepBack[1][0]
    oneEl.colors = stepBack[0][1]
    twoEL.colors = stepBack[1][1]
    initBottle(oneEl)
    initBottle(twoEL)
}

function validateBottle(element) {
    switch (element.childElementCount-1) {
        case 0:
            element.win = true
            break;
        case element.size:
            element.win = true
            for(let el of element.querySelectorAll('.colorPiece')){
                if(element.querySelectorAll('.colorPiece')[element.size-1].color !== el.color) {
                    element.win = false
                    break;
                }
            }
            break;
        default:
            element.win = false
            break;
    }
    return element.win
}

function validateWin() {
    const bottles = document.querySelectorAll('.bottle')
    let wingame = true
    for (const bottle of bottles) {
        if(!bottle.win){
            wingame = false
            break;
        }
    }    
    return wingame && stopGame()
}

