/**
 * RELÓGIO ANALÓGICO LUXUOSO - FT.GRAFIIA
 * Hora real do sistema com Smooth Sweep contínuo (requestAnimationFrame)
 * Estética: Black & Gold
 */

(function() {
    function updateClock() {
        const now = new Date();
        
        const hours = now.getHours() % 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ms = now.getMilliseconds();

        // Smooth sweep: inclui milissegundos para movimento 100% contínuo
        const hourDeg   = (hours * 30) + (minutes * 0.5) + (seconds * (0.5/60));
        const minuteDeg = (minutes * 6) + (seconds * 0.1) + (ms * 0.0001);
        const secondDeg = (seconds * 6) + (ms * 0.006);

        // Aplicar em TODOS os relógios na página (index + portfolio)
        const hourHands   = document.querySelectorAll('.hour-hand');
        const minuteHands = document.querySelectorAll('.minute-hand');
        const secondHands = document.querySelectorAll('.second-hand');

        hourHands.forEach(h   => h.setAttribute('transform', 'rotate(' + hourDeg + ' 100 100)'));
        minuteHands.forEach(m => m.setAttribute('transform', 'rotate(' + minuteDeg + ' 100 100)'));
        secondHands.forEach(s => s.setAttribute('transform', 'rotate(' + secondDeg + ' 100 100)'));

        requestAnimationFrame(updateClock);
    }

    // Iniciar imediatamente com requestAnimationFrame (60fps = ultra smooth)
    requestAnimationFrame(updateClock);

    // Efeito de brilho ao hover
    document.querySelectorAll('.floating-clock').forEach(function(clock) {
        clock.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 60px rgba(184,134,11,0.6), inset 0 0 30px rgba(184,134,11,0.2), 0 8px 32px rgba(0,0,0,0.8)';
        });
        clock.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
})();
