/**
 * GALERIA IMERSIVA - FT.GRAFIIA
 * Lightbox, Filtros por Categoria, Scroll Reveal e Tilt 3D
 * 31 fotografias
 */

// ==========================================
// DADOS DAS IMAGENS (31 fotos)
// ==========================================
const galleryData = [
    { src: 'images/gallery_01_cidade_montanha.jpg', title: 'Silhueta Urbana', desc: 'A cidade adormece sob o manto dourado do crepúsculo' },
    { src: 'images/gallery_02_pier_sunset.jpg', title: 'Além do Horizonte', desc: 'Quatro almas contemplando o infinito' },
    { src: 'images/gallery_03_lago_nuvens.jpg', title: 'Espelho do Céu', desc: 'Quando as nuvens se encontram com a água' },
    { src: 'images/gallery_04_campo_sertao.jpg', title: 'Terra Viva', desc: 'A beleza crua e pura do sertão nordestino' },
    { src: 'images/gallery_05_barragem_pessoas.jpg', title: 'Jorrinho de Canudos', desc: 'Onde a vida pulsa entre concreto e natureza' },
    { src: 'images/gallery_06_torre_dourado.jpg', title: 'Guardião Dourado', desc: 'A torre vigila o anoitecer sobre as águas calmas' },
    { src: 'images/gallery_07_lago_quiosque.jpg', title: 'Refúgio Sereno', desc: 'Um quiosque solitário à beira do lago' },
    { src: 'images/gallery_08_lago_montanhas.jpg', title: 'Açude de Cocorobó', desc: 'Montanhas que se curvam diante das águas' },
    { src: 'images/gallery_09_por_do_sol.jpg', title: 'Fogo no Horizonte', desc: 'O sol se despede pintando o céu em chamas' },
    { src: 'images/gallery_10_noite_quente.jpg', title: 'Banho de Sol', desc: 'A intensidade de um olhar sob as luzes da noite' },
    { src: 'images/gallery_11_planta.jpg', title: 'Natureza Viva', desc: 'A delicadeza que brota entre o concreto' },
    { src: 'images/gallery_12_rua_serra.jpg', title: 'Crepúsculo Interior', desc: 'Quando a luz dourada abraça o sertão' },
    { src: 'images/gallery_13_cuba.jpg', title: 'Estética Urbana', desc: 'A beleza escondida nas cores do cotidiano' },
    { src: 'images/gallery_14_dezembro.jpg', title: 'Serra do Cruzeiro', desc: 'O calor dourado de um fim de tarde inesquecível' },
    { src: 'images/gallery_15_syre.jpg', title: 'Syre', desc: 'A expressão que transcende a lente' },
    { src: 'images/gallery_16_paisagem.jpg', title: 'As Margens', desc: 'Onde o céu abraça a terra em silêncio' },
    { src: 'images/gallery_17_retrato.jpg', title: 'Essência', desc: 'A verdade capturada em um instante' },
    { src: 'images/gallery_18_momento.jpg', title: 'Momento Eterno', desc: 'Quando a luz dourada congela o tempo' },
    { src: 'images/gallery_19_cena.jpg', title: 'Cena Natural', desc: 'A grandiosidade que só a natureza compõe' },
    { src: 'images/gallery_20_composicao.jpg', title: 'Composição', desc: 'Geometria e luz em perfeita harmonia' },
    // NOVAS FOTOS (21-31)
    { src: 'https://ktmhdxvxwalpnlyfyyva.supabase.co/storage/v1/object/public/FOTOS/HOSANA.jpg', title: 'Hosana', desc: 'Eterna no meu coração' },
    { src: 'https://ktmhdxvxwalpnlyfyyva.supabase.co/storage/v1/object/public/FOTOS/atrasdapistaSERRA.jpg', title: 'Sombra da Serra', desc: 'A majestade da serra em um ângulo inexplorado' },
    { src: 'https://ktmhdxvxwalpnlyfyyva.supabase.co/storage/v1/object/public/FOTOS/portalquenteatualizado.jpg', title: 'Bem-vindo a Canudos', desc: '' },
    { src: 'https://ktmhdxvxwalpnlyfyyva.supabase.co/storage/v1/object/public/FOTOS/P1030094.JPG', title: 'Descanso em casa', desc: '' },
    { src: 'https://ktmhdxvxwalpnlyfyyva.supabase.co/storage/v1/object/public/FOTOS/P1030096.JPG', title: 'O menino e a vida', desc: '' },
    { src: 'https://ktmhdxvxwalpnlyfyyva.supabase.co/storage/v1/object/public/FOTOS/P1030099.JPG', title: 'Pensamento', desc: '' },
    { src: 'https://ktmhdxvxwalpnlyfyyva.supabase.co/storage/v1/object/public/FOTOS/P1030101.JPG', title: 'Traço do Tempo', desc: 'As marcas da história impressas na paisagem' },
    { src: 'https://ktmhdxvxwalpnlyfyyva.supabase.co/storage/v1/object/public/FOTOS/P1030147.JPG', title: 'Sobrevivência', desc: '' },
    { src: 'https://ktmhdxvxwalpnlyfyyva.supabase.co/storage/v1/object/public/FOTOS/P1030617.JPG', title: 'Crepúsculo Profundo', desc: 'A transição mística entre o dia e a noite' },
    { src: 'https://ktmhdxvxwalpnlyfyyva.supabase.co/storage/v1/object/public/FOTOS/P1030631.JPG', title: '1996, açude de Cocorobó', desc: '' },
    { src: 'https://ktmhdxvxwalpnlyfyyva.supabase.co/storage/v1/object/public/FOTOS/P1030664.JPG', title: 'Igreja nossa senhora de Fátima', desc: '' }
];

let currentImageIndex = 0;

// ==========================================
// LIGHTBOX
// ==========================================
function openLightbox(index) {
    currentImageIndex = index;
    var lightbox = document.getElementById('lightbox');
    var img = document.getElementById('lightbox-img');
    var title = document.getElementById('lightbox-title');
    var desc = document.getElementById('lightbox-desc');
    var current = document.getElementById('lightbox-current');
    var total = document.getElementById('lightbox-total');
    
    // Efeito especial para "Bem-vindo a Canudos" (Index 22)
    if (index === 22) {
        img.style.transition = 'opacity 0.8s ease, transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1)';
        img.style.opacity = '0';
        img.style.transform = 'scale(1.05)';
        
        // Criar overlay se não existir
        let overlay = document.getElementById('canudos-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'canudos-overlay';
            overlay.className = 'special-overlay';
            overlay.innerHTML = '<span>Conheça nossa história</span>';
            document.querySelector('.lightbox-content').appendChild(overlay);
        }
        
        overlay.style.display = 'flex';
        overlay.style.opacity = '0';
        
        setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
            overlay.style.opacity = '1';
        }, 50);

        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => { overlay.style.display = 'none'; }, 800);
        }, 2500);
    } else {
        img.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }
    
    img.src = galleryData[index].src;
    title.textContent = galleryData[index].title;
    desc.textContent = galleryData[index].desc;
    current.textContent = index + 1;
    total.textContent = galleryData.length;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
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
    var img = document.getElementById('lightbox-img');
    var title = document.getElementById('lightbox-title');
    var desc = document.getElementById('lightbox-desc');
    var current = document.getElementById('lightbox-current');
    
    img.style.opacity = '0';
    img.style.transform = 'scale(0.9)';
    
    setTimeout(function() {
        img.src = galleryData[currentImageIndex].src;
        title.textContent = galleryData[currentImageIndex].title;
        desc.textContent = galleryData[currentImageIndex].desc;
        current.textContent = currentImageIndex + 1;
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }, 200);
}

// Teclado: ESC, setas
document.addEventListener('keydown', function(e) {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// Fechar ao clicar no fundo
document.addEventListener('DOMContentLoaded', function() {
    var lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) closeLightbox();
        });
    }
});

// ==========================================
// FILTROS POR CATEGORIA
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    var filtroBtns = document.querySelectorAll('.filtro-btn');
    var masonryItems = document.querySelectorAll('.masonry-item');

    filtroBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            filtroBtns.forEach(function(b) { b.classList.remove('ativo'); });
            btn.classList.add('ativo');
            
            var filtro = btn.getAttribute('data-filtro');
            
            masonryItems.forEach(function(item) {
                var categorias = item.getAttribute('data-categoria') || '';
                if (filtro === 'todos' || categorias.indexOf(filtro) !== -1) {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(function() {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
});

// ==========================================
// SCROLL REVEAL
// ==========================================
function revealOnScroll() {
    var reveals = document.querySelectorAll('.reveal');
    var windowHeight = window.innerHeight;
    
    reveals.forEach(function(element, index) {
        var elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 80) {
            setTimeout(function() {
                element.classList.add('visible');
            }, Math.min(index * 80, 800));
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Transição suave para imagem do lightbox
document.addEventListener('DOMContentLoaded', function() {
    var lightboxImg = document.getElementById('lightbox-img');
    if (lightboxImg) {
        lightboxImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }
});

// TRANSIÇÃO DEEP FADE PARA MISTÉRIOS
document.querySelectorAll('.mysteries-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = href;
        }, 1500);
    });
});
