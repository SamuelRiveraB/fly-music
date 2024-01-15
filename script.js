const img = document.querySelector("img")
const title = document.getElementById("title")
const artist = document.getElementById("artist")
const audio = document.querySelector('audio')
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
        title: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    }
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

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)