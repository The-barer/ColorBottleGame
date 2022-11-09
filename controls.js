const controls = document.querySelector('.controls')
addNewGameButton()
addInfoButton() 

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