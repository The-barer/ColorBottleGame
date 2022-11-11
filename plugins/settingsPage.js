const settingsPage = document.querySelector('.settings')
const setPieces = {
    title: 'Pieces of color',
    defaultValue: 4,
    minValue: 2,
    maxValue: 9,
    preview: ' '
}
const setBottles = {
    title: 'Colored Bottles',
    defaultValue: 6,
    minValue: 4,
    maxValue: 21,
    preview: ' '
}
const setEmptyBottles = {
    title: 'Empty Bottles',
    defaultValue: 1,
    minValue: 1,
    maxValue: 4,
    preview: ' '
}
const alerSaveSettings = {
    title: 'Изменение настроек игры',
    content: 'Новые настройки не сохранены, хотите сохранить?',
    buttons: [{text: 'Сохранить', type: 'confirm'}]
}
const alerNewGameSettings = {
    title: 'Настройки изменены',
    closeable: true,
    content: 'Хотите начать новую игру?',
    buttons: [{text: 'Новая игра', type: 'confirm'}, {text: 'Продолжить', type: 'primary'}]
}
const difficulty = createSetting(setPieces)
const emptyBottle = createSetting(setEmptyBottles)
const bottlesCount = createSetting(setBottles)
const settingsList = [difficulty, emptyBottle, bottlesCount]

function createSetting(param) {
    const $option = document.createElement('div')
    $option.classList.add('option')
    $option.title = param.title
    $option.defaultValue = param.defaultValue
    $option.value = param.defaultValue
    $option.preview = param.preview
    function setterBtn (e) {
        let $Button = e.target
        if(!$Button.dataset.setter) {
            $Button = $Button.parentNode
        } else if(!$Button.dataset.setter){
            return
        }
        switch ($Button.dataset.setter) {
            case 'minus':
                $option.value--
                if($option.value < param.minValue) {
                    $option.value = param.maxValue
                }
                $option.dataValue.innerHTML = $option.value
                break;
            case 'plus':
                $option.value++
                if($option.value > param.maxValue) {
                    $option.value = param.minValue
                }
                $option.dataValue.innerHTML = $option.value
                break;
        }
    }
    methods = {
        open() {
            $option.addEventListener('click', setterBtn)
            $option.innerHTML =`
            <div class="preview">${$option.preview || '$ELEMENT_OF_PREVIEW'}</div>
            <div class="title">${$option.title || ''}</div>
            <div class="setter">
                <button class="left" data-setter="${'minus'}"><i class="fa-sharp fa-solid fa-angle-left"></i></button>
                <div class="datasetter" data-value>${$option.value}</div>
                <button class="right" data-setter="${'plus'}"><i class="fa-sharp fa-solid fa-angle-right"></i></button>
            </div>`
            settingsPage.appendChild($option)
            $option.dataValue = $option.querySelector('[data-value]')
            this.restorDefault()
        },
        restorDefault() {
            $option.value = $option.defaultValue
            if($option.dataValue) {$option.dataValue.innerHTML = $option.value}
        },
        value(arg) {
            if(arg === undefined) {
                return $option.defaultValue
            }
            if(arg > param.maxValue){
                $option.value = param.maxValue
            } else if (arg < param.minValue){
                $option.value = param.minValue
            } else {
                $option.value = arg
            }
            if($option.dataValue) {$option.dataValue.innerHTML = $option.value}
        },
        changed() {
            return $option.value !== $option.defaultValue
        },
        save() {
            $option.defaultValue = $option.value
        },
        destroy() {
            this.restorDefault()
            $option.removeEventListener('click', setterBtn)
            $option.remove()
        }
    }
    return methods
}

function saveSettings(settingsToSave = []) {
    let somethingChanged = false
    settingsToSave.forEach(option => {
        if(option.changed()) {
            option.save()
            somethingChanged = true
        }
    })
    if(somethingChanged){
        $.confirm(alerNewGameSettings)
            .then(() => startNewGame())
            .catch(noop)
    }
}

function restorDefaultSettings(settingsToRestore = []) {
    settingsToRestore.forEach(option => {
        if(option.changed()) {
            option.restorDefault()
        }
    })
}

function chekSettings(settingsToChek = []) {
    return settingsToChek.filter(option => option.changed())
}

async function displaySettingPage() {
    if (settingsPage.classList.contains('show')) {     
        try {
            const changedElements = chekSettings(settingsList)
            if(changedElements.length > 0) {
                await $.confirm(alerSaveSettings)
                saveSettings(changedElements)
            }
        } catch {}

        settingsPage.classList.remove('show')
        setTimeout (()=> {
            settingsList.forEach((obj) => obj.destroy())
        }, 500)
        return Promise.resolve()
    } else {
        settingsPage.classList.add('show')
        settingsList.forEach((obj) => {
            obj.open()
        })
        return Promise.reject()
    }
}

