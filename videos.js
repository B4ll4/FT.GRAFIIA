/* LÓGICA DE VÍDEOS - EXCLUSIVO HTML5 NATIVO - FT.GRAFIIA™ */

document.addEventListener('DOMContentLoaded', () => {
    const videoModal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoContainer');
    const closeModal = document.getElementById('closeVideoModal');
    const videoCards = document.querySelectorAll('.video-card');

    if (!videoModal || !videoContainer || !closeModal) return;

    // Abrir Modal
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoSrc = card.getAttribute('data-src');
            
            videoContainer.innerHTML = '';

            // Implementação nativa HTML5
            videoContainer.innerHTML = `
                <video controls playsinline preload="auto" width="100%" style="width:100%; height:100%; object-fit:contain;">
                    <source src="${videoSrc}" type="video/mp4">
                    Seu navegador não suporta a reprodução de vídeos.
                </video>
            `;

            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Bloquear scroll
            
            // Iniciar o vídeo automaticamente após o carregamento
            const videoElement = videoContainer.querySelector('video');
            if (videoElement) {
                videoElement.play().catch(error => {
                    console.log("Autoplay bloqueado pelo navegador, aguardando interação.");
                });
            }
        });
    });

    // Fechar Modal
    const closeFunc = () => {
        const videoElement = videoContainer.querySelector('video');
        if (videoElement) {
            videoElement.pause();
        }
        videoModal.classList.remove('active');
        videoContainer.innerHTML = ''; // Limpar conteúdo para garantir parada total
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
