/**
 * RELÓGIO ANALÓGICO LUXUOSO - FT.GRAFIIA
 * Desenvolvido para marcar a hora real do sistema com estilo Black & Gold
 * Ponteiro dos segundos com movimento contínuo (smooth sweep)
 */

function updateClock() {
    const now = new Date();
    
    // Obter horas, minutos e segundos
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    
    // Calcular o ângulo de rotação para cada ponteiro
    // Horas: 360° / 12 horas = 30° por hora + movimento dos minutos
    const hourDegrees = (hours * 30) + (minutes * 0.5);
    
    // Minutos: 360° / 60 minutos = 6° por minuto + movimento dos segundos
    const minuteDegrees = (minutes * 6) + (seconds * 0.1);
    
    // Segundos: 360° / 60 segundos = 6° por segundo + movimento suave dos milissegundos
    const secondDegrees = (seconds * 6) + (milliseconds * 0.006);
    
    // Selecionar os ponteiros
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');
    
    // Aplicar rotação aos ponteiros
    if (hourHand) {
        hourHand.setAttribute('transform', `rotate(${hourDegrees} 100 100)`);
    }
    
    if (minuteHand) {
        minuteHand.setAttribute('transform', `rotate(${minuteDegrees} 100 100)`);
    }
    
    if (secondHand) {
        secondHand.setAttribute('transform', `rotate(${secondDegrees} 100 100)`);
    }
}

// Atualizar o relógio a cada 50ms para movimento suave do ponteiro dos segundos
setInterval(updateClock, 50);

// Chamar uma vez imediatamente para evitar delay inicial
updateClock();

// Adicionar efeito de brilho ao passar do mouse (opcional)
const floatingClock = document.querySelector('.floating-clock');
if (floatingClock) {
    floatingClock.addEventListener('mouseenter', function() {
        this.style.boxShadow = `
            0 0 60px rgba(184, 134, 11, 0.6),
            inset 0 0 30px rgba(184, 134, 11, 0.2),
            0 8px 32px rgba(0, 0, 0, 0.8)
        `;
    });
    
    floatingClock.addEventListener('mouseleave', function() {
        this.style.boxShadow = `
            0 0 40px rgba(184, 134, 11, 0.4),
            inset 0 0 20px rgba(184, 134, 11, 0.1),
            0 8px 32px rgba(0, 0, 0, 0.6)
        `;
    });
}
