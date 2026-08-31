let musicStarted = false;

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bg-music');
    const volSlider = document.getElementById('vol-slider');

    if (audio) {
        audio.volume = 0.25;
        if (volSlider) volSlider.value = 0.25;
    }

    // Détection d'interaction pour lancement automatique
    const startAudioFurtivement = () => {
        if (!musicStarted && audio) {
            audio.volume = 0.25;
            audio.play().then(() => {
                musicStarted = true;
                updateAudioTerminalUI(true);
                ['click', 'scroll', 'keydown', 'touchstart'].forEach(evt =>
                    window.removeEventListener(evt, startAudioFurtivement)
                );
            }).catch(() => {});
        }
    };

    ['click', 'scroll', 'keydown', 'touchstart'].forEach(evt =>
        window.addEventListener(evt, startAudioFurtivement, { once: true })
    );
});

function changeVolume(val) {
    const audio = document.getElementById('bg-music');
    if (audio) audio.volume = parseFloat(val);
}

function updateAudioTerminalUI(isPlaying) {
    const widget = document.querySelector('.poi-audio-widget');
    const text = document.getElementById('music-text');
    const status = document.getElementById('music-status');
    if (isPlaying) {
        if (widget) widget.classList.add('playing');
        if (text) text.innerText = "PAUSE AUDIO";
        if (status) status.innerText = "[ STATUS : PLAYING ]";
    } else {
        if (widget) widget.classList.remove('playing');
        if (text) text.innerText = "PLAY AUDIO";
        if (status) status.innerText = "[ STATUS : STANDBY ]";
    }
}

function toggleMusic() {
    const audio = document.getElementById('bg-music');
    if (!audio) return;
    if (audio.paused) {
        audio.play().then(() => {
            musicStarted = true;
            updateAudioTerminalUI(true);
        }).catch(() => {});
    } else {
        audio.pause();
        updateAudioTerminalUI(false);
    }
}