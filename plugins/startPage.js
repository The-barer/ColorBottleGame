function createStartPage() {
    const $page = document.createElement('div')
    $page.classList.add('startPage')
    const options = {
        Buttons: [
            `<button data-type="startNewGame">Случайная игра</button>`,
            `<button data-type="levelChoose">Выбрать уровень</button>`
        ],
        open() {
            $page.innerHTML = this.Buttons.join()
            document.querySelector('.container').appendChild($page)
            $page.addEventListener('click', startPageEvents)
            setTimeout(() => {$page.classList.add('show')}, 100)
        },
        close() {
            $page.classList = 'startPage'
            $page.removeEventListener('click', startPageEvents)
            setTimeout(() => {$page.remove()}, 200)
        },
        hide() {
            $page.classList.toggle('show')
        }   
        
    }
    return Object.assign(options) 
}
const startPage = createStartPage()

const levelChoose = {
    title: 'Пока не доступно',
    closeable: true
}

function startPageEvents(e) {
    let $Button = e.target
    if(!$Button.dataset.type) {
        $Button = e.target.parentNode
    } else if(!$Button.dataset.type){
        return
    }

    switch ($Button.dataset.type) {
        case 'startNewGame':
            startNewGame()
            startPage.close()
            break;
        case 'levelChoose':
            $.info(levelChoose)
            break;
        default:
            break;
    }
}
