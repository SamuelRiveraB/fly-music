const img = document.querySelector("img")
const title = document.getElementById("title")
const artist = document.getElementById("artist")
const audio = document.querySelector('audio')
const progressCont = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
let isPlaying = false

const songs=[
    {
        name: 'jacinto-1',
        title: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        title: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        title: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        title: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    },
]

function play() {
    isPlaying = true
    playBtn.classList.replace("fa-play", "fa-pause")
    playBtn.setAttribute("title", 'Pause')
    audio.play()
}

function pause() {
    isPlaying = false
    playBtn.classList.replace("fa-pause", "fa-play")
    playBtn.setAttribute("title", 'Play')
    audio.pause()
}

playBtn.addEventListener('click', () => isPlaying? pause() : play())

function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist
    audio.src = `music/${song.name}.mp3`
    img.src = `img/${song.name}.jpg`
    audio.addEventListener('loadedmetadata', () => {
        const {duration} = audio;
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60) 
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }
    });
}

let songIndex = 0

function nextSong() {
    if(songIndex >= songs.length-1) {
        songIndex = 0
    } else {
        songIndex++
    }
    loadSong(songs[songIndex])
    play()
}

function prevSong() {
    if(songIndex <= 0) {
        songIndex = songs.length - 1
    } else {
        songIndex--
    }
    loadSong(songs[songIndex])
    play()
}

loadSong(songs[songIndex])

function updateProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime}  = e.srcElement
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`
        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60) 
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

function setProgressBar(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const { duration } = audio
    audio.currentTime = (clickX / width) * duration
}

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgressBar)
audio.addEventListener('ended', nextSong)
progressCont.addEventListener('click', setProgressBar)