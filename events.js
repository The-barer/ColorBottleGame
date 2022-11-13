gameBoard.addEventListener('click', bottleEvents)
controls.addEventListener('click', controlsEvents)
controlsMenu.addEventListener('click', controlsEvents)

stopGame()
addMenuButton(controlsMenu, mainMenuBtns)


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
        if($Button.parentNode.dataset.type){
            $Button = $Button.parentNode
        }
    } else {
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
            $.info(aboutGameText)
            break
        case 'settings':
            displaySettingPage().then(()=>{
                if(gameBoard.innerHTML){
                    setCurrentPageElements('GameBoard')
                } else {setCurrentPageElements('StartPage')}
            }).catch(()=>{setCurrentPageElements('SettingsPage')} )
            
            break
        case 'homepage':
            if(gameBoard.innerHTML){
                $.confirm(alertCloseGame).then(stopGame).catch(noop)
            } else {setCurrentPageElements('StartPage')}
            break;
        case 'saveSettings':
            saveSettings(settingsList)
            break
        case 'exitPage':
            displaySettingPage().then(() => {
                if(gameBoard.innerHTML){
                    setCurrentPageElements('GameBoard')
                } else {setCurrentPageElements('StartPage')}
            })
            break
        case 'restoreSettings':
            restorDefaultSettings(settingsList)
            break;
    }
}

function startNewGame() {
    startList = createLevelList(bottlesCount.value(), emptyBottle.value(), difficulty.value())
    initGame(startList)
    setCurrentPageElements('GameBoard')
}

function stopGame() {
    setCurrentPageElements('StartPage')
    setTimeout(()=> {gameBoard.innerHTML = ''}, 200) 
}

function setCurrentPageElements(page) {
    switch (page) {
        case 'GameBoard':
            startPage.close()
            settingsPage.classList.remove('show')
            gameBoard.classList.remove('hide')
            addMenuButton(controls, gameBoardBtns)
            break;
        case 'SettingsPage':
            startPage.hide()
            gameBoard.classList.add('hide')
            addMenuButton(controls, settingsBtns)
            break;
        case 'StartPage':
            startPage.open()
            gameBoard.classList.add('hide')
            settingsPage.classList.remove('show')
            addMenuButton(controls, startPageBtns)
            break;
        default:
            break;
    }
}


const alertCloseGame = {
    title: 'Внимание',
    closeable: true,
    content: 'Текущая игра будет потеряна, вы точно хотите выйти?',
    buttons: [{text: 'Выйти', type: 'secondary'}]
}

const aboutGameText = {
    title: 'Информация о игре',
    closeable: true,
    content: `
    <h4>Цель игры собрать во всех колбах одинаковый цвет</h4><br>
    <ul> 
    <li>Выберети колбу кликнув по ней</li>
    <li>Укажите куда перелить цвет</li>
    </ul>`
}