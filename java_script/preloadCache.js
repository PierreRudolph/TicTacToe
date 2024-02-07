let backgroundMusic = 'sound/battle-time.mp3';
let laodingState = 0;
let images = [
    'img/kreis.png',
    'img/pause.png',
    'img/play.png',
    'img/singleplayer.png',
    'img/twoplayer.png',
    'img/x.png'
]
let audioFiles = [
    'sound/computer-processing-short.mp3',
    'sound/Spieler-1-sound.mp3',
    'sound/Spieler-2-sound.mp3',
    'sound/winning-sound-reverse.mp3',
    'sound/winning-sound.mp3'
]


async function loadImagesToCache() {
    for (let i = 0; i < 5; i++) {
        bodyOverflowOnOff(1);
        animateLoadingBark(i);
        await loadAudio(audioFiles[i]);
        await loadImage(images[i]);
    }
    await canPlayAudio(backgroundMusic);
    animateLoadingBark(5);
    changeLoadingText();
    setTimeout(() => { closeImpressumOrPrivacyPolicy('preload-screen'); }, 200);
}


const loadAudio = path => {
    return new Promise((resolve, reject) => {
        const audio = new Audio();
        audio.src = path;
        audio.preload = 'auto';
        audio.oncanplaythrough = () => {
            resolve(audio);
        }
        audio.onerror = e => {
            reject(e);
        }
    })
}


const canPlayAudio = bgMusic => {
    return new Promise((resolve, reject) => {
        const audio = new Audio();
        audio.src = bgMusic;
        audio.preload = 'auto';
        audio.oncanplay = () => {
            resolve(audio);
        }
        audio.onerror = e => {
            reject(e);
        }
    })
}


const loadImage = path => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
            resolve(img);
        }
        img.onerror = e => {
            reject(e);
        }
    })
}


function animateLoadingBark(newState) {
    laodingState = newState * 2 + '0';
    let bark = document.getElementById('loading-bark');
    bark.style = `border-width:${laodingState}px`;
}


function changeLoadingText() {
    let text = document.getElementById('loading-text');
    text.innerHTML = 'Fertig!'
}
