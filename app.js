function colorReplace(inputElement, outputElement) {
    const FREE = outputElement.size - outputElement.childNodes.length
    if(FREE === 0) {
        return
    } else colorMove();

    function colorMove() {
        for (let i = 0; i < FREE; i++) {
            try {
                if(outputElement.lastChild.color === inputElement.lastChild.color) {
                    outputElement.appendChild(inputElement.lastChild)
                }
            } catch {
                try {
                    if(outputElement.childNodes.length === 0) {
                        outputElement.appendChild(inputElement.lastChild)
                    }
                } catch {
                    return
                }
            }

        }
    }
}

function validateWin() {
    const bottles = document.querySelectorAll('.bottle')
    
    bottles.forEach((bottle)=>{
        bottle.childNodes.forEach((piece)=>{
            piece.color === bottle.firstChild.color
        })
    })
    
}