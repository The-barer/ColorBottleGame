const timerEl = createTimerEL(controls)


function createTimerEL() {
    const $time = document.createElement('div')
    $time.classList.add('timer')
    $time.current = 0
    $time.texted = '00:00'
    $time.limit = 3600
    $time.stopped = true
    methods = {
        result: '',
        startTime() {
            if(!$time.stopped) {
                return
            }
            this.result = 'Старт'
            $time.stopped = false
            const timer = setInterval(() => {
                if ($time.stopped) {
                    clearInterval(timer)
                    return
                }
                setTime()
                renderTime()
            }, 1000);
        },
        stopTime() {
            $time.stopped = true
            if ($time.current === $time.limit) {
                this.result = 'Превышен лимит'
            } else {
                this.result = timeToText($time.current) 
            }
            console.log("Ваше время: " + this.result);
        },
        show(placementObj){
            placementObj.appendChild($time)
            renderTime()
        },
        clear() {
            $time.current = 0
            this.result = ""
        },
        destroy(){
            $time.remove()
        }
    }
    function setTime() {
        $time.current++
        if($time.current === $time.limit) {
            this.stopTime()
            return
        } 
    }
    
    function renderTime() {
        $time.innerHTML = `${timeToText($time.current)}`
    }
    function timeToText (time) {
        let minutes = parseInt(time/60)
        let seconds = time%60  
        if(minutes < 10) {minutes = '0'+minutes};
        if(seconds < 10) {seconds = '0'+seconds};
        return `${minutes}:${seconds}`
    }
    return methods
}

const timeButton = _createButton({
    type: 'btn-time',
    inner: `<i class="fa-solid fa-clock"></i>`,
    tooltip: { text: 'Время' }
})

timeButton.onclick = function () {
    if(timerEl.result === ""){
        timerEl.show(timeButton)
        timerEl.startTime()
    } else {
        timerEl.stopTime()
        timerEl.clear()
        timerEl.destroy()
    }
}
