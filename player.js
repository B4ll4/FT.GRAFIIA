/**
 * MINI-PLAYER FLUTUANTE - FT.GRAFIIA
 * Atmosfera Sonora: Sade Adu & Chill Vibe
 * Sem autoplay - o visitante escolhe "Ativar a Vibe"
 */

(function() {
    var isOpen = false;
    var spotifyLoaded = false;

    // Playlist Sade Adu no Spotify (embed)
    var spotifySrc = 'https://open.spotify.com/embed/playlist/541hBdK4wuDCZvyr797UFe?utm_source=generator&theme=0';

    window.togglePlayer = function() {
        var panel = document.getElementById('musicPanel');
        var toggle = document.getElementById('musicToggle');
        var icon = document.getElementById('musicIcon');
        var iframe = document.getElementById('spotifyEmbed');

        isOpen = !isOpen;

        if (isOpen) {
            panel.classList.add('open');
            toggle.classList.add('active');
            icon.className = 'bi bi-x-lg';

            // Carregar Spotify apenas no primeiro clique (performance)
            if (!spotifyLoaded && iframe) {
                iframe.src = spotifySrc;
                spotifyLoaded = true;
            }
        } else {
            panel.classList.remove('open');
            toggle.classList.remove('active');
            icon.className = 'bi bi-music-note-beamed';
        }
    };
})();
