/* LÓGICA DE VÍDEOS - FT.GRAFIIA™ */

document.addEventListener('DOMContentLoaded', () => {
    const videoModal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoContainer');
    const closeModal = document.getElementById('closeVideoModal');
    const videoCards = document.querySelectorAll('.video-card');

    if (!videoModal || !videoContainer || !closeModal) return;

    // Abrir Modal
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoType = card.getAttribute('data-type');
            const videoSrc = card.getAttribute('data-src');
            
            videoContainer.innerHTML = '';

            if (videoType === 'youtube') {
                videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoSrc}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
            } else if (videoType === 'vimeo') {
                videoContainer.innerHTML = `<iframe src="https://player.vimeo.com/video/${videoSrc}?autoplay=1" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
            } else if (videoType === 'mp4') {
                videoContainer.innerHTML = `<video src="${videoSrc}" controls autoplay></video>`;
            }

            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Bloquear scroll
        });
    });

    // Fechar Modal
    const closeFunc = () => {
        videoModal.classList.remove('active');
        videoContainer.innerHTML = ''; // Parar o vídeo
        document.body.style.overflow = 'auto';
    };

    closeModal.addEventListener('click', closeFunc);

    // Fechar ao clicar fora do conteúdo
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeFunc();
        }
    });

    // Fechar com a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeFunc();
        }
    });
});
