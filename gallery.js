/**
 * GALERIA IMERSIVA - FT.GRAFIIA
 * Lightbox, Filtros por Categoria e Animações de Scroll Reveal
 */

// ==========================================
// DADOS DAS IMAGENS
// ==========================================
const galleryData = [
    {
        src: 'images/gallery_01_cidade_montanha.jpg',
        title: 'Silhueta Urbana',
        desc: 'A cidade adormece sob o manto dourado do crepúsculo',
        categoria: 'golden paisagem'
    },
    {
        src: 'images/gallery_02_pier_sunset.jpg',
        title: 'Além do Horizonte',
        desc: 'Quatro almas contemplando o infinito',
        categoria: 'agua'
    },
    {
        src: 'images/gallery_03_lago_nuvens.jpg',
        title: 'Espelho do Céu',
        desc: 'Quando as nuvens se encontram com a água',
        categoria: 'agua paisagem'
    },
    {
        src: 'images/gallery_04_campo_sertao.jpg',
        title: 'Terra Viva',
        desc: 'A beleza crua e pura do sertão nordestino',
        categoria: 'paisagem'
    },
    {
        src: 'images/gallery_05_barragem_pessoas.jpg',
        title: 'Encontro das Águas',
        desc: 'Onde a vida pulsa entre concreto e natureza',
        categoria: 'agua'
    },
    {
        src: 'images/gallery_06_torre_dourado.jpg',
        title: 'Guardião Dourado',
        desc: 'A torre vigila o anoitecer sobre as águas calmas',
        categoria: 'golden agua'
    },
    {
        src: 'images/gallery_07_lago_quiosque.jpg',
        title: 'Refúgio Sereno',
        desc: 'Um quiosque solitário à beira do lago',
        categoria: 'agua paisagem'
    },
    {
        src: 'images/gallery_08_lago_montanhas.jpg',
        title: 'Imensidão Azul',
        desc: 'Montanhas que se curvam diante das águas',
        categoria: 'agua paisagem'
    },
    {
        src: 'images/gallery_09_por_do_sol.jpg',
        title: 'Fogo no Horizonte',
        desc: 'O sol se despede pintando o céu em chamas',
        categoria: 'golden'
    }
];

let currentImageIndex = 0;

// ==========================================
// LIGHTBOX
// ==========================================
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const title = document.getElementById('lightbox-title');
    const desc = document.getElementById('lightbox-desc');
    const current = document.getElementById('lightbox-current');
    
    img.src = galleryData[index].src;
    title.textContent = galleryData[index].title;
    desc.textContent = galleryData[index].desc;
    current.textContent = index + 1;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryData.length;
    updateLightboxImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const img = document.getElementById('lightbox-img');
    const title = document.getElementById('lightbox-title');
    const desc = document.getElementById('lightbox-desc');
    const current = document.getElementById('lightbox-current');
    
    // Animação de transição
    img.style.opacity = '0';
    img.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        img.src = galleryData[currentImageIndex].src;
        title.textContent = galleryData[currentImageIndex].title;
        desc.textContent = galleryData[currentImageIndex].desc;
        current.textContent = currentImageIndex + 1;
        
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }, 200);
}

// Fechar lightbox com ESC e navegar com setas
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// Fechar lightbox ao clicar no fundo
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
});


// ==========================================
// FILTROS POR CATEGORIA
// ==========================================
const filtroBtns = document.querySelectorAll('.filtro-btn');
const masonryItems = document.querySelectorAll('.masonry-item');

filtroBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Atualizar botão ativo
        filtroBtns.forEach(b => b.classList.remove('ativo'));
        this.classList.add('ativo');
        
        const filtro = this.getAttribute('data-filtro');
        
        masonryItems.forEach(item => {
            const categorias = item.getAttribute('data-categoria');
            
            if (filtro === 'todos' || categorias.includes(filtro)) {
                item.classList.remove('hidden');
                // Animação de entrada
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.classList.add('hidden');
            }
        });
    });
});


// ==========================================
// SCROLL REVEAL (Animação ao rolar)
// ==========================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    
    reveals.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;
        
        if (elementTop < windowHeight - revealPoint) {
            // Delay escalonado para efeito cascata
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 100);
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Adicionar transição suave à imagem do lightbox
const lightboxImg = document.getElementById('lightbox-img');
if (lightboxImg) {
    lightboxImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}
