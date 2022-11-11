const controls = document.querySelector('.controls')
const fixedMain = new Object({
    open() {
        this.$elem = document.createElement('div')
        this.$elem.classList.add('fixedBtn')
        this.$elem.innerHTML = `
        <button data-type="homepage"><i class="fa-solid fa-house"></i></button>
        <button data-type="settings"><i class="fa-solid fa-gear"></i></button>`
        controls.appendChild(this.$elem)
    },
    close() {
        this.$elem.remove()
    }
})




function addStepBackButton() {
    const button = `<button data-type="stepback"><i class="fa-solid fa-arrow-left"></i></button>`
    controls.innerHTML += button
}
function addNewEmptyButton() {
    const button = `<button data-type="addempty"><i class="fa-solid fa-plus"></i></button>`
    controls.innerHTML += button
}
function addStartAgainButton() {
    const button = `<button data-type="startAgainCurrent"><i class="fa-solid fa-arrows-rotate"></i></button>`
    controls.innerHTML += button
}
function addNewGameButton() {
    const button = `<button data-type="startNewGame"><i class="fa-solid fa-dice"></i></button>`
    controls.innerHTML += button
}
function addInfoButton() {
    const button = `<button data-type="about"><i class="fa-solid fa-circle-info"></i></button>`
    controls.innerHTML += button
}
function addSettingsButton() {
    const button = `<button data-type="settings"><i class="fa-solid fa-gear"></i></button>`
    controls.innerHTML += button
}
function addHomeButton() {
    const button = `<button data-type="homepage"><i class="fa-solid fa-house"></i></button>`
    controls.innerHTML += button
}
function addSaveButton() {
    const button = `<button data-type="saveSettings"><i class="fa-solid fa-floppy-disk"></i></button>`
    controls.innerHTML += button
}
function addExitButton() {
    const button = `<button data-type="exitPage"><i class="fa-solid fa-right-from-bracket"></i></button>`
    controls.innerHTML += button
}
function addRestorButton() {
    const button = `<button data-type="restoreSettings"><i class="fa-solid fa-rotate-left"></i></button>`
    controls.innerHTML += button
}

