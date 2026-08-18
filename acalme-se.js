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
        hosana: `
            <!-- Fundo -->
            <rect class="colorable" x="0" y="0" width="800" height="600" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Raios de Luz -->
            <path class="colorable" d="M400 300 L0 0 L100 0 Z" fill="#ffffff" stroke="#000" stroke-width="1"/>
            <path class="colorable" d="M400 300 L200 0 L300 0 Z" fill="#ffffff" stroke="#000" stroke-width="1"/>
            <path class="colorable" d="M400 300 L400 0 L500 0 Z" fill="#ffffff" stroke="#000" stroke-width="1"/>
            <path class="colorable" d="M400 300 L600 0 L800 0 Z" fill="#ffffff" stroke="#000" stroke-width="1"/>
            <path class="colorable" d="M400 300 L800 200 L800 400 Z" fill="#ffffff" stroke="#000" stroke-width="1"/>
            <path class="colorable" d="M400 300 L800 600 L600 600 Z" fill="#ffffff" stroke="#000" stroke-width="1"/>
            <path class="colorable" d="M400 300 L400 600 L200 600 Z" fill="#ffffff" stroke="#000" stroke-width="1"/>
            <path class="colorable" d="M400 300 L0 600 L0 400 Z" fill="#ffffff" stroke="#000" stroke-width="1"/>
            <!-- Coração Central -->
            <path class="colorable" d="M400 450 C250 350 300 200 400 280 C500 200 550 350 400 450 Z" fill="#ffffff" stroke="#000" stroke-width="3"/>
            <!-- Auréola -->
            <circle class="colorable" cx="400" cy="220" r="40" fill="#ffffff" stroke="#000" stroke-width="2"/>
        `,
        canudos: `
            <!-- Fundo/Céu -->
            <rect class="colorable" x="0" y="0" width="800" height="400" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Sol -->
            <circle class="colorable" cx="600" cy="150" r="80" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Montanhas -->
            <path class="colorable" d="M0 400 L200 200 L400 400 Z" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <path class="colorable" d="M300 400 L500 150 L700 400 Z" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <path class="colorable" d="M600 400 L800 250 L800 400 Z" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Chão -->
            <rect class="colorable" x="0" y="400" width="800" height="200" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <!-- Igreja de Canudos (Simplificada) -->
            <path class="colorable" d="M350 400 L350 300 L450 300 L450 400 Z" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <path class="colorable" d="M350 300 L400 230 L450 300 Z" fill="#ffffff" stroke="#000" stroke-width="2"/>
            <rect class="colorable" x="385" y="340" width="30" height="60" fill="#ffffff" stroke="#000" stroke-width="1"/>
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
    loadDrawing('hosana');
});
