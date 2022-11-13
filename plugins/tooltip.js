const tips = {}

function setTooltip(obj, params, idForTip) {
    if (!tips[idForTip]) {
        obj.setAttribute('data-tip', idForTip)
        tips[idForTip] = params 
    }

}

function createTooltip(e) {
    let $obj = e.target
    if(!$obj.dataset.tip) {
        if($obj.parentNode.dataset.tip){
            $obj = $obj.parentNode
        } else {
            return
        }      
    } 
    const {text, styles = []} = tips[$obj.dataset.tip]
    const tooltip = document.createElement('div')
    tooltip.classList.add('tooltip')
    tooltip.classList += ' '+(styles.join(' '))
    tooltip.innerHTML = text
    $obj.appendChild(tooltip)
    $obj.addEventListener('mouseleave', removeTooltip)
    function removeTooltip() {
        tooltip.remove() 
        $obj.removeEventListener('mouseleave',removeTooltip)
    }
}


