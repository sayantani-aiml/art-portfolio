document.addEventListener("DOMContentLoaded", () => {
    
    // --- Theme Switcher ---
    const themeBtns = document.querySelectorAll('.theme-btn');
    const htmlEl = document.documentElement;

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const theme = btn.getAttribute('data-set-theme');
            htmlEl.setAttribute('data-theme', theme);
        });
    });

    // --- Sticky Navbar with Blur ---
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- Scroll Reveal Animations (Intersection Observer) ---
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Play once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal, .timeline-item').forEach(el => {
        observer.observe(el);
    });

    // --- Generate Masonry Grid Items ---
    const masonryGrid = document.querySelector('.masonry-grid');
    const artworks = [
        { src: 'https://picsum.photos/seed/m1/600/800', title: 'Serenity', desc: 'Charcoal on Paper.', price: '$350' },
        { src: 'https://picsum.photos/seed/m2/600/500', title: 'Urban Flow', desc: 'Digital Illustration.', price: '$200' },
        { src: 'https://picsum.photos/seed/m3/600/900', title: 'Crimson Tide', desc: 'Acrylic Painting.', price: '$800' },
        { src: 'https://picsum.photos/seed/m4/600/600', title: 'Geometry', desc: 'Poster Design.', price: '$100' },
        { src: 'https://picsum.photos/seed/m5/600/1000', title: 'The Gaze', desc: 'Oil on Canvas.', price: '$1200' },
        { src: 'https://picsum.photos/seed/m6/600/700', title: 'Minimal', desc: 'Mixed Media.', price: '$400' }
    ];

    artworks.forEach(art => {
        const div = document.createElement('div');
        div.className = 'masonry-item scroll-reveal';
        div.innerHTML = `<img src="${art.src}" loading="lazy" alt="${art.title}">`;
        div.addEventListener('click', () => openModal(art));
        masonryGrid.appendChild(div);
    });

    // --- Modal Logic ---
    const modal = document.getElementById('art-modal');
    const closeBtn = document.querySelector('.close');

    function openModal(art) {
        document.getElementById('modal-img').src = art.src;
        document.getElementById('modal-title').textContent = art.title;
        document.getElementById('modal-desc').textContent = art.desc;
        document.getElementById('modal-price').textContent = art.price;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent scrolling
    }

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // --- Hover Tilt Effect (3D Card) ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none'; // remove transition for smooth tracking
        });
    });

    // --- Commission Type Toggle ---
    const typeBtns = document.querySelectorAll('.type-btn');
    typeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            typeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // --- Hero Background Particles (Canvas) ---
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent');
            ctx.globalAlpha = 0.4;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < 60; i++) {
            particlesArray.push(new Particle());
        }
    }
    initParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
});
