gameBoard.addEventListener('click', bottleEvents)
controls.addEventListener('click', controlsEvents)
controlsMenu.addEventListener('click', controlsEvents)
addMenuButtons(controlsMenu, mainMenuBtns)

stopGame()



let choosedState = false
let $inputElement

function bottleEvents(event) {
    let $newBottle = event.target
    if ($newBottle.classList.contains('colorPiece') || $newBottle.classList.contains('bottleform')) {
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
            addMenuButtons(controls, gameBoardBtns)
            controls.appendChild(timeButton)
            break;
        case 'SettingsPage':
            startPage.hide()
            gameBoard.classList.add('hide')
            addMenuButtons(controls, settingsBtns)
            break;
        case 'StartPage':
            startPage.open()
            gameBoard.classList.add('hide')
            settingsPage.classList.remove('show')
            addMenuButtons(controls, startPageBtns)
            break;
        default:
            break;
    }
}


const alertCloseGame = {
    title: '????????????????',
    closeable: true,
    content: '?????????????? ???????? ?????????? ????????????????, ???? ?????????? ???????????? ???????????',
    buttons: [{text: '??????????', type: 'secondary'}]
}

const aboutGameText = {
    title: '???????????????????? ?? ????????',
    closeable: true,
    content: `
    <h4>???????? ???????? ?????????????? ???? ???????? ???????????? ???????????????????? ????????</h4><br>
    <ul> 
    <li>???????????????? ?????????? ?????????????? ???? ??????</li>
    <li>?????????????? ???????? ???????????????? ????????</li>
    </ul>`
}