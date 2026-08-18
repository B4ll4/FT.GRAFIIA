/**
 * ACALME-SE - FT.GRAFIIA
 * Mini-app interativo de colorir
 */

document.addEventListener('DOMContentLoaded', () => {
    const svg = document.getElementById('coloringSVG');
    const palette = document.getElementById('palette');
    const resetBtn = document.getElementById('resetBtn');
    const selectorBtns = document.querySelectorAll('.select-img');
    
    let currentColor = '#D4AF37'; // Dourado padrão

    // 1. GERENCIAMENTO DA PALETA
    palette.addEventListener('click', (e) => {
        if (e.target.classList.contains('color-swatch')) {
            document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
            e.target.classList.add('active');
            currentColor = e.target.getAttribute('data-color');
        }
    });

    // 2. DESENHOS EM SVG (Line Art)
    const drawings = {
        arvore: `
            <!-- Fundo -->
            <rect class="colorable" x="0" y="0" width="800" height="600" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Tronco -->
            <path class="colorable" d="M380 600 L390 400 L410 400 L420 600 Z" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Galhos -->
            <path class="colorable" d="M395 420 L320 350 L340 330 L400 400 Z" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <path class="colorable" d="M405 420 L480 350 L460 330 L400 400 Z" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Copas (Nuvens de folhas) -->
            <circle class="colorable" cx="300" cy="320" r="60" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <circle class="colorable" cx="500" cy="320" r="60" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <circle class="colorable" cx="400" cy="250" r="80" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <circle class="colorable" cx="350" cy="180" r="50" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <circle class="colorable" cx="450" cy="180" r="50" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Detalhes Chão -->
            <path class="colorable" d="M0 550 Q400 500 800 550 L800 600 L0 600 Z" fill="#ffffff" stroke="#000" stroke-width="1"/>
        `,
        lago: `
            <!-- Céu -->
            <rect class="colorable" x="0" y="0" width="800" height="300" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Margem Distante -->
            <path class="colorable" d="M0 300 Q200 250 400 300 T800 300 L800 320 L0 320 Z" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Água do Lago -->
            <rect class="colorable" x="0" y="320" width="800" height="280" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Ondas -->
            <path class="colorable" d="M100 400 Q200 380 300 400" fill="none" stroke="#000" stroke-width="2"/>
            <path class="colorable" d="M400 450 Q550 430 700 450" fill="none" stroke="#000" stroke-width="2"/>
            <path class="colorable" d="M150 520 Q300 500 450 520" fill="none" stroke="#000" stroke-width="2"/>
            <!-- Margem Próxima -->
            <path class="colorable" d="M0 580 Q400 550 800 580 L800 600 L0 600 Z" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Sol Refletido -->
            <circle class="colorable" cx="650" cy="100" r="50" fill="#ffffff" stroke="#000" stroke-width="2"/>
        `,
        ceu: `
            <!-- Fundo Céu -->
            <rect class="colorable" x="0" y="0" width="800" height="600" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Sol -->
            <circle class="colorable" cx="400" cy="200" r="100" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Raios -->
            <line x1="400" y1="50" x2="400" y2="90" stroke="#000" stroke-width="2"/>
            <line x1="400" y1="310" x2="400" y2="350" stroke="#000" stroke-width="2"/>
            <line x1="250" y1="200" x2="290" y2="200" stroke="#000" stroke-width="2"/>
            <line x1="510" y1="200" x2="550" y2="200" stroke="#000" stroke-width="2"/>
            <!-- Nuvens -->
            <path class="colorable" d="M100 400 C100 350 200 350 250 400 C300 350 400 350 400 400 L400 450 L100 450 Z" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <path class="colorable" d="M500 300 C500 250 600 250 650 300 C700 250 800 250 800 300 L800 350 L500 350 Z" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Horizonte -->
            <path class="colorable" d="M0 500 Q400 480 800 500 L800 600 L0 600 Z" fill="#ffffff" stroke="#000" stroke-width="2"/>
        `,
        igreja: `
            <!-- Fundo -->
            <rect class="colorable" x="0" y="0" width="800" height="600" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Base da Igreja -->
            <rect class="colorable" x="250" y="300" width="300" height="250" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Torre Central -->
            <rect class="colorable" x="350" y="150" width="100" height="150" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Telhado Torre -->
            <path class="colorable" d="M350 150 L400 80 L450 150 Z" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Porta -->
            <path class="colorable" d="M375 550 L375 480 Q400 460 425 480 L425 550 Z" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Janelas -->
            <rect class="colorable" x="290" y="350" width="40" height="60" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <rect class="colorable" x="470" y="350" width="40" height="60" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <circle class="colorable" cx="400" cy="220" r="15" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Cruz -->
            <line x1="400" y1="40" x2="400" y2="80" stroke="#000" stroke-width="2"/>
            <line x1="385" y1="55" x2="415" y2="55" stroke="#000" stroke-width="2"/>
        `,
        olho: `
            <!-- Fundo -->
            <rect class="colorable" x="0" y="0" width="800" height="600" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Contorno Externo do Olho -->
            <path class="colorable" d="M100 300 Q400 100 700 300 Q400 500 100 300 Z" fill="#ffffff" stroke="#000" stroke-width="4"/>
            <!-- Íris -->
            <circle class="colorable" cx="400" cy="300" r="120" fill="#ffffff" stroke="#000" stroke-width="3"/>
            <!-- Pupila -->
            <circle class="colorable" cx="400" cy="300" r="50" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Brilho no Olho -->
            <circle class="colorable" cx="430" cy="270" r="15" fill="#ffffff" stroke="#000" stroke-width="1"/>
            <!-- Detalhes Místicos -->
            <path class="colorable" d="M400 100 L400 50" stroke="#000" stroke-width="2"/>
            <path class="colorable" d="M400 500 L400 550" stroke="#000" stroke-width="2"/>
        `,
        canudos: `
            <!-- Céu -->
            <rect class="colorable" x="0" y="0" width="800" height="400" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Pórtico/Entrada -->
            <path class="colorable" d="M200 400 L200 200 L600 200 L600 400 Z" fill="#ffffff" stroke="#000" stroke-width="3"/>
            <path class="colorable" d="M200 200 Q400 100 600 200" fill="#ffffff" stroke="#000" stroke-width="3"/>
            <!-- Chão -->
            <rect class="colorable" x="0" y="400" width="800" height="200" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Montanhas ao Fundo -->
            <path class="colorable" d="M0 400 L100 300 L250 400 Z" fill="#ffffff" stroke="#000" stroke-width="1"/>
            <path class="colorable" d="M550 400 L700 280 L800 400 Z" fill="#ffffff" stroke="#000" stroke-width="1"/>
            <!-- Letreiro (Simulado) -->
            <rect class="colorable" x="300" y="220" width="200" height="40" fill="#ffffff" stroke="#000" stroke-width="1"/>
        `,
        serra: `
            <!-- Fundo -->
            <rect class="colorable" x="0" y="0" width="800" height="600" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Camadas da Serra -->
            <path class="colorable" d="M0 300 Q200 150 400 300 T800 300 L800 600 L0 600 Z" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <path class="colorable" d="M0 400 Q150 300 300 400 T600 400 T800 450 L800 600 L0 600 Z" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <path class="colorable" d="M0 500 Q200 450 400 500 T800 500 L800 600 L0 600 Z" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Estrada/Caminho -->
            <path class="colorable" d="M350 600 L390 450 L410 450 L450 600 Z" fill="#ffffff" stroke="#000" stroke-width="1"/>
            <!-- Pássaros -->
            <path class="colorable" d="M150 100 Q160 90 170 100 Q180 90 190 100" fill="none" stroke="#000" stroke-width="2"/>
            <path class="colorable" d="M220 130 Q230 120 240 130 Q250 120 260 130" fill="none" stroke="#000" stroke-width="2"/>
        `
    };

    // 3. LÓGICA DE CARREGAMENTO
    function loadDrawing(name) {
        svg.innerHTML = drawings[name];
        attachClickEvents();
    }

    function attachClickEvents() {
        const paths = svg.querySelectorAll('.colorable');
        paths.forEach(path => {
            path.addEventListener('click', (e) => {
                e.stopPropagation();
                path.setAttribute('fill', currentColor);
            });
        });
    }

    // 4. INTERAÇÕES
    selectorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            selectorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadDrawing(btn.getAttribute('data-img'));
        });
    });

    resetBtn.addEventListener('click', () => {
        const activeBtn = document.querySelector('.select-img.active');
        loadDrawing(activeBtn.getAttribute('data-img'));
    });

    // Inicialização
    loadDrawing('arvore');
});
