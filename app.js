//Сохранить игру
//Загрузить игру(открыть уровнь)
//Счетчик шагов, Счетчик Времени
//Результаты конкретного уровня
// Информация о прохождение уровня, переход на следующий
// подбор-генерация цветов
// Изменять кнопки управления в зависимости от режима
// меню конструктор уровня
// меню выбора уровней(с лучими результатами)
// Анимации
// скины бутылочек

let savedMoves = []
function colorReplace(inputElement, outputElement) {
    if(inputElement === outputElement) {
        return
    }
    const FREE = outputElement.size - outputElement.childNodes.length
    if(FREE === 0 || !colorMatch()) {
        return
    } else colorMove();

    function colorMatch(){
        try {
            return outputElement.lastChild.color === inputElement.lastChild.color
        } catch (error) {
            return outputElement.childNodes.length === 0
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
    switch (element.childNodes.length) {
        case 0:
            element.win = true
            break;
        case element.size:
            element.win = true
            for(let el of element.childNodes){
                if(element.childNodes[element.size-1].color !== el.color) {
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

