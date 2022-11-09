const $ = {}

Element.prototype.appendAfter = function (obj) {
    obj.parentElement.insertBefore(this, obj.nextSibling)
} 
function noop(){}

function _createFooterButtons(buttons = []) {
    const button = document.createElement('div')
    if (buttons.length === 0) {
        return button
    } 
    else {
        button.classList.add("modal-footer")
        button.setAttribute('data-footer',"")
        buttons.forEach((btn) => {
            const $btn = document.createElement('button')
            $btn.classList= `btn btn-${btn.type}`
            $btn.innerHTML = btn.text
            $btn.onclick = btn.func || noop
            button.appendChild($btn)
        })
        return button
    }
}

function _createModalWindow(params) {
    const modal = document.createElement('div')
    let closeable, closeElement
    if(params.closeable) {
        closeable = `data-type="closemodal"`
        closeElement = `<span class="modal-close" data-type="closemodal">&times;</span>`
    }

    modal.classList = 'modalWindow'

    modal.insertAdjacentHTML("afterbegin",`
    <div class="modal-overlay" ${closeable}>
    <div class="modal-window">
        <div class="modal-title"><span data-title>${params.title || ''}</span>${closeElement}</div>
        <div class="modal-body" data-content>${params.content || ''}</div>
    </div>
    </div>
    `);

    const content = modal.querySelector('[data-content]')
    _createFooterButtons(params.buttons).appendAfter(content)

    document.body.appendChild(modal)
    return modal
}


$.modal = function (params) {
    const ANIMATION_DURATION = 200
    const $modal = _createModalWindow(params);
    let isCloseing = false

    const modalClicked = (event) => {
        const type = event.target.dataset.type
        if (type === 'closemodal') {
            methods.close();
        }
        if (type === 'okk'){
            methods.log()
            console.log("WTF?");
        }
    }
    
    const methods = {
        open() {
            if (!isCloseing) {
                $modal.classList = 'tbmodal opened'
                $modal.addEventListener('click', modalClicked)
            }
        },
        close() {
            isCloseing = true
            $modal.classList = 'tbmodal closing'
            $modal.removeEventListener('click', modalClicked)
            setTimeout(() => {
                if (typeof params.onClose === 'function') {
                    params.onClose()
                }
                isCloseing = false
                $modal.classList = 'tbmodal'}
                , ANIMATION_DURATION)
        },
        destroy() {
            $modal.remove()
        },
        setTitle(html) {
            const title = $modal.querySelector('[data-title]')
            title.innerHTML = html
        },
        setContent(obj) {
            const content = $modal.querySelector('[data-content]')
            content.appendChild(obj)
        }
    }
    return methods
}



const aboutModal = {
    title: 'About',
    closeable: true,
    content: `
    <h4>Цель игры собрать во всех колбах одинаковый цвет</h4><br>
    <ul> 
    <li>Выберети колбу кликнув по ней</li>
    <li>Укажите куда перелить цвет</li>
    </ul>`,
    onClose() {
        aboutWindow.destroy()
    },
    buttons: [
        {text: 'OK', type: 'primary', func(){aboutWindow.close()} },
    ]
}



function setPiecesElement() {
    const $elem = document.createElement('div')
    $elem.innerHTML = `<i class="fa-sharp fa-solid fa-angle-left" data-type="easier"></i>
    <i class="fa-sharp fa-solid fa-angle-right" data-type="harder"></i>`
    $elem.classList.add('setPieces')

    const $bottle = createBottle(['red','green','blue'], 3)
    $bottle.width = 30
    initBottle($bottle)
    $elem.insertBefore($bottle, $elem.childNodes[1])
    return $elem
}
