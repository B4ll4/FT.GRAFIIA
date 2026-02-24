/**
 * MISTÉRIOS - CANUDOS - LÓGICA IMERSIVA
 */

(function() {
    // 1. LANTERNA DIVINA
    const lantern = document.getElementById('lantern');
    document.addEventListener('mousemove', e => {
        lantern.style.setProperty('--x', e.clientX + 'px');
        lantern.style.setProperty('--y', e.clientY + 'px');
    });

    // 2. CANVAS DE PARTÍCULAS
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(218, 165, 32, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // 3. REVEAL TEXT ON SCROLL
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
            } else {
                entry.target.style.opacity = "0.1";
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-text').forEach(el => observer.observe(el));

    // 4. PARALLAX 3D GALLERY
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const items = document.querySelectorAll('.floating-item');
        
        items.forEach((item, index) => {
            const speed = (index + 1) * 0.2;
            const yPos = -(scrolled * speed);
            item.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.02}deg)`;
        });
    });

})();
