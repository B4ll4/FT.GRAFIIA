/**
 * EFEITO TILT 3D - FT.GRAFIIA
 * Parallax suave nos cards de fotos da galeria masonry
 * Sutil e elegante, sem travar o site
 */

(function() {
    var maxTilt = 8;       // graus máximos de inclinação
    var maxShadow = 25;    // pixels máximos de sombra
    var perspective = 800; // perspectiva CSS

    function initTilt() {
        var items = document.querySelectorAll('.masonry-item');

        items.forEach(function(card) {
            // Definir perspectiva
            card.style.transformStyle = 'preserve-3d';
            card.style.transition = 'transform 0.15s ease-out, box-shadow 0.15s ease-out';

            card.addEventListener('mousemove', function(e) {
                var rect = card.getBoundingClientRect();
                var centerX = rect.left + rect.width / 2;
                var centerY = rect.top + rect.height / 2;

                // Posição do mouse relativa ao centro (-1 a 1)
                var mouseX = (e.clientX - centerX) / (rect.width / 2);
                var mouseY = (e.clientY - centerY) / (rect.height / 2);

                // Limitar valores
                mouseX = Math.max(-1, Math.min(1, mouseX));
                mouseY = Math.max(-1, Math.min(1, mouseY));

                // Calcular rotação (invertido para efeito natural)
                var rotateY = mouseX * maxTilt;
                var rotateX = -mouseY * maxTilt;

                // Sombra reativa
                var shadowX = -mouseX * maxShadow;
                var shadowY = -mouseY * maxShadow;

                card.style.transform = 'perspective(' + perspective + 'px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
                card.style.boxShadow = shadowX + 'px ' + shadowY + 'px 40px rgba(184, 134, 11, 0.15), 0 0 20px rgba(0, 0, 0, 0.3)';
            });

            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(' + perspective + 'px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                card.style.boxShadow = '';
            });
        });
    }

    // Iniciar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTilt);
    } else {
        initTilt();
    }

    // Desativar tilt em dispositivos touch (mobile)
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        // Não aplicar tilt em mobile para evitar comportamento estranho
        document.addEventListener('DOMContentLoaded', function() {
            var items = document.querySelectorAll('.masonry-item');
            items.forEach(function(card) {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    }
})();
