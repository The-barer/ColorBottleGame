const controls = document.querySelector('.controls')
const controlsMenu = document.createElement('div')
controlsMenu.classList.add('controlsFixed')
document.querySelector('.container').insertBefore(controlsMenu, controls)

const gameBoardBtns = [
    {
        type: 'stepback',
        inner: `<i class="fa-solid fa-arrow-left"></i>`,
        tooltip: {text: 'Шаг назад'}
    },{
        type: 'addempty',
        inner: `<i class="fa-solid fa-plus"></i>`,
        tooltip: {text: 'Добавить пустую'}
    },{
        type: 'startAgainCurrent',
        inner: `<i class="fa-solid fa-arrows-rotate"></i>`,
        tooltip: {text: 'Начать заного'}
    }
]

const startPageBtns = [
    {
        type: 'startNewGame',
        inner: `<i class="fa-solid fa-dice"></i>`,
        tooltip: {text: 'Cлучайная игра'}
    },{
        type: 'about',
        inner: `<i class="fa-solid fa-circle-info"></i>`,
        tooltip: {text: 'О игре'}
    }
]

const settingsBtns = [
    {
        type: 'saveSettings',
        inner: `<i class="fa-solid fa-floppy-disk"></i>`,
        tooltip: {text: 'Сохранить'}
    },{
        type: 'restoreSettings',
        inner: `<i class="fa-solid fa-rotate-left"></i>`,
        tooltip: {text: 'Сбросить'}
    },{
        type: 'exitPage',
        inner: `<i class="fa-solid fa-right-from-bracket"></i>`,
        tooltip: {text: 'Выйти'}
    }
]

const mainMenuBtns = [
    {
        type: 'homepage',
        inner: `<i class="fa-solid fa-house"></i>`,
        tooltip: {text: 'На главную'}
    },
    {
        type: 'settings',
        inner: `<i class="fa-solid fa-gear"></i>`,
        tooltip: {text: 'Настройки'}
    }
]


function addMenuButtons(placementObj, btns = []) {
    try {
        placementObj.removeEventListener('mouseover', createTooltip)
        placementObj.innerHTML = ''
        placementObj.addEventListener('mouseover', createTooltip)
    } catch {
        placementObj.innerHTML = ''
    }
    
    btns.forEach((btn)=> {
        placementObj.appendChild(_createButton(btn))
    })
}



function _createButton(btn = {}) {
    const button = document.createElement('button')
    button.setAttribute('data-type', btn.type)
    button.innerHTML = btn.inner
    try {
        setTooltip(button, btn.tooltip, btn.type)
    } catch {
    }
    return button
}