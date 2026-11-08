// MASTER TRACK ARRANGEMENT ARRAY
const jukeboxTracks = [
    // ALBUM 1: WHITE STONE
    { id: 1, title: "Dance Of The Guitars / The Good News Boogie", album: "White Stone", file: "music/whitestone/01_dance.mp3", forSale: true },
    { id: 2, title: "Artificial Fruit", album: "White Stone", file: "music/whitestone/02_fruit.mp3", forSale: true },
    { id: 3, title: "You Only Know Him By His Name", album: "White Stone", file: "music/whitestone/03_name.mp3", forSale: true },
    { id: 4, title: "Give Me Jesus (Island Version)", album: "White Stone", file: "music/whitestone/04_jesus.mp3", forSale: true },
    { id: 5, title: "White Stone", album: "White Stone", file: "music/whitestone/05_whitestone.mp3", forSale: true },
    { id: 6, title: "Do Right", album: "White Stone", file: "music/whitestone/06_doright.mp3", forSale: true },
    { id: 7, title: "The Light Of The World", album: "White Stone", file: "music/whitestone/07_light.mp3", forSale: true },
    { id: 8, title: "With Us You Belong", album: "White Stone", file: "music/whitestone/08_belong.mp3", forSale: true },
    { id: 9, title: "Sing Praises", album: "White Stone", file: "music/whitestone/09_sing.mp3", forSale: true },
    { id: 10, title: "Still Small Voice (Live)", album: "White Stone", file: "music/whitestone/10_voice.mp3", forSale: true },
    { id: 11, title: "Soul (Wedding Song To Shalom)", album: "White Stone", file: "music/whitestone/11_soul.mp3", forSale: true },
    { id: 12, title: "Our Father", album: "White Stone", file: "music/whitestone/12_ourfather.mp3", forSale: true },

    // ALBUM 2: MICHAEL D (SUB-TITLE: UNPLUGGED)
    { id: 13, title: "Lovely Lady", album: "Michael D - Unplugged", file: "music/unplugged/01_lovelylady.mp3", forSale: true },
    { id: 14, title: "On My Knees", album: "Michael D - Unplugged", file: "music/unplugged/02_knees.mp3", forSale: true },
    { id: 15, title: "Heart and Mind", album: "Michael D - Unplugged", file: "music/unplugged/03_heart.mp3", forSale: true },
    { id: 16, title: "Darlin'", album: "Michael D - Unplugged", file: "music/unplugged/04_darlin.mp3", forSale: true },
    { id: 17, title: "Her Eyes", album: "Michael D - Unplugged", file: "music/unplugged/05_eyes.mp3", forSale: true },
    { id: 18, title: "Why", album: "Michael D - Unplugged", file: "music/unplugged/06_why.mp3", forSale: true },
    { id: 19, title: "Sure Is Good", album: "Michael D - Unplugged", file: "music/unplugged/07_sure.mp3", forSale: true },
    { id: 20, title: "Sing Praises Intro (talk)", album: "Michael D - Unplugged", file: "music/unplugged/08_sing_intro.mp3", forSale: false },
    { id: 21, title: "Sing Praises", album: "Michael D - Unplugged", file: "music/unplugged/09_sing.mp3", forSale: true },
    { id: 22, title: "You Need Jesus", album: "Michael D - Unplugged", file: "music/unplugged/10_needjesus.mp3", forSale: true },
    { id: 23, title: "Artificial Fruit Intro (talk)", album: "Michael D - Unplugged", file: "music/unplugged/11_fruit_intro.mp3", forSale: false },
    { id: 24, title: "Artificial Fruit", album: "Michael D - Unplugged", file: "music/unplugged/12_fruit.mp3", forSale: true },
    { id: 25, title: "You Only Know Him By His Name", album: "Michael D - Unplugged", file: "music/unplugged/13_name.mp3", forSale: true },
    { id: 26, title: "The Light Of The World", album: "Michael D - Unplugged", file: "music/unplugged/14_light.mp3", forSale: true },
    { id: 27, title: "Our Father", album: "Michael D - Unplugged", file: "music/unplugged/15_ourfather.mp3", forSale: true },
    { id: 28, title: "My Spiritual Awakening (talk)", album: "Michael D - Unplugged", file: "music/unplugged/16_awakening.mp3", forSale: false },
    { id: 29, title: "Sure Is Good (4trk Update)", album: "Michael D - Unplugged", file: "music/unplugged/17_sure_update.mp3", forSale: true }
];

let currentIndex = 0;
let isPlaying = false;
const audioPlayer = new Audio();

const marqueeTitle = document.getElementById("marqueeTitle");
const marqueeAlbum = document.getElementById("marqueeAlbum");
const labelTitle = document.getElementById("labelTitle");
const paypalTrackBtn = document.getElementById("paypalTrackBtn");
const vinylRecord = document.getElementById("vinylRecord");
const playBtn = document.getElementById("playBtn");
const progressBar = document.getElementById("progressBar");
const timeDisplay = document.getElementById("timeDisplay");

function loadTrack(index) {
    const track = jukeboxTracks[index];
    marqueeTitle.textContent = track.title;
    marqueeAlbum.textContent = track.album;
    labelTitle.textContent = track.title;
    
    const coinDeck = document.querySelector(".coin-slot-bay");
    
    if (track.forSale) {
        if (coinDeck) {
            coinDeck.style.opacity = "1";
            coinDeck.style.pointerEvents = "auto";
        }
        const itemQuery = encodeURIComponent(`${track.album} - ${track.title} MP3`);
        paypalTrackBtn.href = `https://paypal.com{itemQuery}&amount=0.99&currency_code=USD`;
    } else {
        if (coinDeck) {
            coinDeck.style.opacity = "0.1";
            coinDeck.style.pointerEvents = "none";
        }
    }

    audioPlayer.src = track.file;
    progressBar.style.width = "0%";
}

function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        vinylRecord.classList.remove("spinning");
        playBtn.textContent = "PLAY";
    } else {
        audioPlayer.play().catch(e => console.log("Audio load catch context:", e));
        vinylRecord.classList.add("spinning");
        playBtn.textContent = "PAUSE";
    }
    isPlaying = !isPlaying;
}

function changeDisc(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = jukeboxTracks.length - 1;
    if (currentIndex >= jukeboxTracks.length) currentIndex = 0;
    
    loadTrack(currentIndex);
    
    if (isPlaying) {
        audioPlayer.play().catch(e => console.log("Playback engine tracking continuity error:", e));
    }
}

audioPlayer.addEventListener("timeupdate", () => {
    const current = audioPlayer.currentTime;
    const duration = audioPlayer.duration || 0;
    const percentage = (current / duration) * 100;
    progressBar.style.width = `${percentage}%`;
    timeDisplay.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
});

audioPlayer.addEventListener("ended", () => {
    changeDisc(1);
});

function formatTime(secs) {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
}

function seekAudio(event) {
    const containerWidth = event.currentTarget.clientWidth;
    const clickX = event.offsetX;
    const duration = audioPlayer.duration;
    if (duration) {
        audioPlayer.currentTime = (clickX / containerWidth) * duration;
    }
}

function openModal(id) {
    document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

// FORCE COLD BOOT MAIN COUPLING
loadTrack(currentIndex);
