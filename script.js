const audio = document.querySelector('audio')
const prev = document.getElementById('prev')
const playBtn = document.getElementById('play')
const next = document.getElementById('next')
let playing = false

function play() {
    playing = true
    playBtn.classList.replace("fa-play", "fa-pause")
    playBtn.setAttribute("title", 'Pause')
    audio.play()
}

function pause() {
    playing = false
    playBtn.classList.replace("fa-pause", "fa-play")
    playBtn.setAttribute("title", 'Play')
    audio.pause()
}

playBtn.addEventListener('click', () => playing? pause() : play()) 