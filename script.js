/**
 * SAYANTANI - Premium Art Portfolio Website
 * Production-Quality Interactive & Immersive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. DATA STORE (Curated Art Database)
    // ==========================================================================
    const artworkDatabase = {
        "1": {
            title: "Celestial Echoes",
            category: "Paintings",
            medium: "Oil & Gold Leaf on Board",
            dims: "36\" x 48\"",
            year: "2026",
            price: "$1,200",
            desc: "A breathtaking abstract landscape inspired by cosmic dust structures. Hand-layered with physical gold foil on premium heavy board and finished with high-gloss protective resin for a glassy futuristic effect.",
            img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200"
        },
        "2": {
            title: "Whispering Wilds",
            category: "Paintings",
            medium: "Acrylic on Canvas",
            dims: "40\" x 40\"",
            year: "2025",
            price: "$850",
            desc: "An organic exploration of botanical silhouettes and fluid color flows. Combining complex multi-layered watercolor washes with dynamic gold ink markings that mimic natural forest root pathways.",
            img: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200"
        },
        "3": {
            title: "The Human Silhouette",
            category: "Sketches",
            medium: "Charcoal on Fine Grain Paper",
            dims: "18\" x 24\"",
            year: "2025",
            price: "$450",
            desc: "A raw, emotional study of human anatomy and shadow. Drawn with natural willow charcoal on heavyweight museum-grade acid-free paper, showcasing delicate textures and high-contrast dramatic lighting.",
            img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200"
        },
        "4": {
            title: "Modernist Utopia",
            category: "Graphic Design",
            medium: "Digital Vector Composition",
            dims: "24\" x 36\" (Plate)",
            year: "2026",
            price: "$350",
            desc: "A high-concept architectural layouts visual study. Printed on state-of-the-art aluminum metal panels using modern sublimation techniques, giving an ultra-reflective and futuristic sheen.",
            img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200"
        },
        "5": {
            title: "Serenity of the Sea",
            category: "Paintings",
            medium: "Oil on Oak Panel",
            dims: "30\" x 30\"",
            year: "2024",
            price: "$1,600",
            desc: "A highly complex classical oil painting celebrating oceanic depths. Painstakingly painted over 6 months using old-world glazing techniques, resulting in deep luminescence and three-dimensional water movement.",
            img: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?q=80&w=1200"
        },
        "6": {
            title: "Renaissance Reborn",
            category: "Commissions",
            medium: "Bespoke Fine Art Portrait",
            dims: "24\" x 30\"",
            year: "2025",
            price: "$1,100",
            desc: "A commissioned wedding portrait custom-created for clients. Blending Renaissance-era anatomical precision with contemporary high-fashion clothing design and metallic gold-leaf highlights.",
            img: "https://images.unsplash.com/photo-1579783928621-7a13d66a6211?q=80&w=1200"
        },
        "7": {
            title: "Fragmented Realities",
            category: "Posters",
            medium: "Conceptual Poster Print",
            dims: "20\" x 30\"",
            year: "2026",
            price: "$280",
            desc: "A modern visual collage examining mental state duality in the digital era. Features elegant typographical overlays layered on top of hand-drawn sketches, silkscreen-printed on matte archival paper.",
            img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200"
        },
        "8": {
            title: "The Golden Canvas",
            category: "Paintings",
            medium: "Gold Leaf & Acrylic on Board",
            dims: "36\" x 36\"",
            year: "2025",
            price: "$950",
            desc: "A premium experimental exploration of light reflection. Created by guilding genuine 24-karat gold leaves directly onto physical board, then sculpting three-dimensional acrylic waves across its surface.",
            img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1200"
        }
    };

    // ==========================================================================
    // 2. PRELOADER & INITIALIZATION
    // ==========================================================================
    const preloader = document.getElementById('preloader');
    
    // Simulate real preloader delay
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            document.body.classList.remove('loading');
            
            // Trigger Hero entrance text reveals
            setTimeout(() => {
                document.querySelectorAll('.animate-on-load').forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
            }, 300);
        }, 1500);
    });

    // ==========================================================================
    // 3. THEME DYNAMIC SYSTEM SWITCHER
    // ==========================================================================
    const themeBtnTrigger = document.getElementById('theme-btn-trigger');
    const themeDropdown = document.getElementById('theme-dropdown');
    const themeOpts = document.querySelectorAll('.theme-opt');
    const currentThemeColorIndicator = document.querySelector('.current-theme-color');

    // Toggle theme selector dropdown
    themeBtnTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        themeDropdown.classList.toggle('show');
    });

    // Close theme dropdown on clicking outside
    document.addEventListener('click', () => {
        themeDropdown.classList.remove('show');
    });

    // Theme Switch Action
    themeOpts.forEach(opt => {
        opt.addEventListener('click', (e) => {
            const selectedTheme = opt.getAttribute('data-theme-val');
            
            // Set body attribute
            document.body.setAttribute('data-theme', selectedTheme);
            
            // Save to localStorage
            localStorage.setItem('sayantani-theme', selectedTheme);
            
            // Update UI Active states
            themeOpts.forEach(btn => btn.classList.remove('active'));
            opt.classList.add('active');
            
            // Close dropdown
            themeDropdown.classList.remove('show');
            
            // Soft feedback: trigger canvas particles refresh with theme colors
            initParticles();
        });
    });

    // Load saved theme on startup
    const savedTheme = localStorage.getItem('sayantani-theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        themeOpts.forEach(btn => {
            if (btn.getAttribute('data-theme-val') === savedTheme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // ==========================================================================
    // 4. CUSTOM LUXURY CURSOR MOVEMENT
    // ==========================================================================
    const cursorDot = document.getElementById('custom-cursor');
    const cursorFollower = document.getElementById('custom-cursor-follower');

    document.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Animate main cursor dot instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Follower trailing effect (lagged animation)
        cursorFollower.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor hover enlargements
    const hoverableElements = document.querySelectorAll('a, button, .gallery-item, .category-card, .shop-card, .option-label');
    hoverableElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hovering');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hovering');
        });
    });

    // ==========================================================================
    // 5. STICKY GLASS NAVBAR & LINK ACTIVE STATE
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky trigger
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active state navigation on scroll
        let currentSectionId = '';
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop - 120;
            const sectionHeight = sec.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Navigation slide-out toggling
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ==========================================================================
    // 6. HERO SECTION PARALLAX EFFECT & TEXT REVEALS
    // ==========================================================================
    const parallaxFrame = document.getElementById('hero-parallax-frame');
    const artworkInner = document.getElementById('hero-artwork-inner');

    if (parallaxFrame && window.innerWidth > 991) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 35;
            const y = (window.innerHeight / 2 - e.clientY) / 35;
            
            // Smoothly shift container and image in opposing directions (deep depth)
            parallaxFrame.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) translateY(${-y}px)`;
            artworkInner.style.transform = `translateX(${x/2}px) translateY(${y/2}px)`;
        });

        document.addEventListener('mouseleave', () => {
            parallaxFrame.style.transform = `rotateY(0deg) rotateX(0deg) translateY(0px)`;
            artworkInner.style.transform = `translateX(0px) translateY(0px)`;
        });
    }

    // ==========================================================================
    // 7. INTERACTIVE MASONRY FILTERING SYSTEM
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categoryLinks = document.querySelectorAll('.category-link[data-filter]');
    const galleryItems = document.querySelectorAll('.gallery-item-wrapper');

    function filterGallery(category) {
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });
    }

    // Filter by Gallery Buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterGallery(btn.getAttribute('data-filter'));
        });
    });

    // Allow Category Cards to trigger and auto-scroll to filtered gallery
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetFilter = link.getAttribute('data-filter');
            if (targetFilter) {
                // Find matching button and activate
                filterButtons.forEach(btn => {
                    if (btn.getAttribute('data-filter') === targetFilter) {
                        btn.click();
                    }
                });
            }
        });
    });

    // ==========================================================================
    // 8. LUXURY MODAL / LIGHTBOX DETAILS MANAGER
    // ==========================================================================
    const modal = document.getElementById('gallery-modal');
    const modalClose = document.getElementById('modal-close');
    const modalImg = document.getElementById('modal-img');
    const modalCat = document.getElementById('modal-cat');
    const modalTitle = document.getElementById('modal-title');
    const modalMedium = document.getElementById('modal-medium');
    const modalDims = document.getElementById('modal-dims');
    const modalYear = document.getElementById('modal-year');
    const modalDesc = document.getElementById('modal-desc');
    const modalPrice = document.getElementById('modal-price');
    const addToCollectionBtn = document.getElementById('add-to-collection-btn');

    // Open Modal
    function openArtworkModal(artworkId) {
        const item = artworkDatabase[artworkId];
        if (!item) return;

        modalImg.src = item.img;
        modalImg.alt = item.title;
        modalCat.textContent = item.category.toUpperCase();
        modalTitle.textContent = item.title;
        modalMedium.textContent = item.medium;
        modalDims.textContent = item.dims;
        modalYear.textContent = item.year;
        modalDesc.textContent = item.desc;
        modalPrice.textContent = item.price;

        modal.classList.add('show');
        document.body.classList.add('loading'); // Prevent scrolling
    }

    // Close Modal
    function closeArtworkModal() {
        modal.classList.remove('show');
        document.body.classList.remove('loading');
    }

    // Attach click events on gallery items
    const clickItems = document.querySelectorAll('.gallery-item');
    clickItems.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-id');
            openArtworkModal(id);
        });
    });

    // Attach click events on shop items view details
    const viewShopItems = document.querySelectorAll('.view-shop-item');
    viewShopItems.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            openArtworkModal(id);
        });
    });

    modalClose.addEventListener('click', closeArtworkModal);
    
    // Close modal on outside container click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeArtworkModal();
        }
    });

    // "Add to Collection" Success Micro-feedback
    addToCollectionBtn.addEventListener('click', () => {
        const originalText = addToCollectionBtn.innerHTML;
        addToCollectionBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Added To Registry!';
        addToCollectionBtn.style.backgroundColor = '#2e7d32';
        addToCollectionBtn.style.borderColor = '#2e7d32';
        addToCollectionBtn.style.color = '#ffffff';

        setTimeout(() => {
            addToCollectionBtn.innerHTML = originalText;
            addToCollectionBtn.style.backgroundColor = '';
            addToCollectionBtn.style.borderColor = '';
            addToCollectionBtn.style.color = '';
        }, 2500);
    });

    // ==========================================================================
    // 9. REVEAL ELEMENTS ON SCROLL (Intersection Observer)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve once triggered to run fluidly
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================================================
    // 10. SCROLL-LINKED TIMELINE DRAWING ENGINE
    // ==========================================================================
    const timelineProgress = document.getElementById('timeline-progress');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineSection = document.getElementById('about');

    function animateTimelineOnScroll() {
        if (!timelineProgress || !timelineSection) return;

        const scrollY = window.scrollY;
        const sectionTop = timelineSection.offsetTop;
        const sectionHeight = timelineSection.clientHeight;
        const triggerPoint = window.innerHeight * 0.45;

        // Calculate progress percentage through the timeline container
        const progressStart = sectionTop - triggerPoint;
        const progressEnd = sectionTop + sectionHeight - window.innerHeight;

        let percentage = ((scrollY - progressStart) / (progressEnd - progressStart)) * 100;
        percentage = Math.max(0, Math.min(100, percentage));

        timelineProgress.style.height = `${percentage}%`;

        // Highlight Active markers based on offset positions
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top + scrollY;
            if (scrollY + window.innerHeight * 0.55 >= itemTop) {
                item.classList.add('active-marker');
            } else {
                item.classList.remove('active-marker');
            }
        });
    }

    window.addEventListener('scroll', animateTimelineOnScroll);

    // ==========================================================================
    // 11. PREMIUM 3D TILT EFFECT ON HOVER (Shop cards)
    // ==========================================================================
    const tiltElements = document.querySelectorAll('.tilt-element');

    tiltElements.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            
            // Get mouse position relative to card center
            const mouseX = e.clientX - cardRect.left - cardWidth / 2;
            const mouseY = e.clientY - cardRect.top - cardHeight / 2;

            // Maximum angles of rotation
            const rotateX = -(mouseY / cardHeight) * 12;
            const rotateY = (mouseX / cardWidth) * 12;

            // Apply 3D matrix-like transformations
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // ==========================================================================
    // 12. COMMISSION SELECTION FORM LOGIC
    // ==========================================================================
    const optionLabels = document.querySelectorAll('.option-label');

    optionLabels.forEach(label => {
        label.addEventListener('click', () => {
            optionLabels.forEach(lbl => lbl.classList.remove('active-option'));
            label.classList.add('active-option');
        });
    });

    // ==========================================================================
    // 13. COLLECTOR TESTIMONIALS SLIDER
    // ==========================================================================
    const slides = document.querySelectorAll('.testimonial-slide');
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');
    
    let currentIndex = 0;
    let autoSlideInterval;

    // Render navigation dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot');

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        slides.forEach((slide, idx) => {
            if (idx === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        dots.forEach((dot, idx) => {
            if (idx === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoSlide();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 7000); // 7 seconds slide
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    startAutoSlide();

    // ==========================================================================
    // 14. INLINE FORM SUBMISSIONS INTERACTIVE FEEDBACK
    // ==========================================================================
    
    // Commission Proposal Form
    const commissionForm = document.getElementById('commission-form');
    if (commissionForm) {
        commissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const chosenOption = commissionForm.querySelector('input[name="commission_type"]:checked').value;
            const name = document.getElementById('comm_name').value;
            
            commissionForm.innerHTML = `
                <div class="form-success-container" style="text-align: center; padding: 3rem 1rem; animation: scaleIn 0.5s ease forwards;">
                    <div style="font-size: 4rem; color: var(--accent); margin-bottom: 1.5rem;"><i class="fa-solid fa-circle-check"></i></div>
                    <h4 style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: 1rem;">Proposal Intialized</h4>
                    <p style="color: var(--text-muted); font-size: 0.95rem; max-width: 400px; margin: 0 auto 2rem;">
                        Thank you, <strong>${name}</strong>. Your requested concept for a bespoke <strong>${chosenOption}</strong> has been received with high priority. I will personally reply within 48 hours with a customized draft proposal.
                    </p>
                    <button class="btn btn-secondary" onclick="window.location.reload();">Done</button>
                </div>
            `;
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact_name').value;
            
            contactForm.innerHTML = `
                <div class="form-success-container" style="text-align: center; padding: 4rem 1rem; animation: scaleIn 0.5s ease forwards;">
                    <div style="font-size: 4rem; color: var(--accent); margin-bottom: 1.5rem;"><i class="fa-solid fa-envelope-circle-check"></i></div>
                    <h4 style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: 1rem;">Message Transmitted</h4>
                    <p style="color: var(--text-muted); font-size: 0.95rem; max-width: 400px; margin: 0 auto 2rem;">
                        Greetings, <strong>${name}</strong>. Your visual collaboration query has been encrypted and securely beamed directly to the studio. Expect a detailed aesthetic analysis shortly.
                    </p>
                    <button class="btn btn-secondary" onclick="window.location.reload();">Back to Studio</button>
                </div>
            `;
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('news_email');
            const originalHTML = newsletterForm.innerHTML;
            
            newsletterForm.innerHTML = `
                <span style="color: var(--accent); font-family: var(--font-body); font-size: 0.85rem; letter-spacing: 0.05em; display: inline-flex; align-items: center; gap: 0.5rem; animation: fadeIn 0.5s ease;">
                    <i class="fa-solid fa-circle-check"></i> Welcome to the Circle! Check your inbox shortly.
                </span>
            `;
            
            setTimeout(() => {
                newsletterForm.innerHTML = originalHTML;
                // Re-attach event listener
                newsletterForm.addEventListener('submit', arguments.callee);
            }, 6000);
        });
    }

    // Purchase Action Buttons Microfeedback
    const buyButtons = document.querySelectorAll('.btn-shop-buy');
    buyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing';
            btn.style.pointerEvents = 'none';

            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-gift"></i> Secured!';
                btn.style.backgroundColor = '#2e7d32';
                btn.style.borderColor = '#2e7d32';
                btn.style.color = '#ffffff';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.pointerEvents = 'auto';
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }, 2000);
            }, 1200);
        });
    });

    // ==========================================================================
    // 15. FLOATING SCROLL TO TOP UTILITY
    // ==========================================================================
    const scrollTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================================================
    // 16. CANVAS FLOATING PARTICLES SYSTEM (Futuristic 30% Theme Dynamic Glows)
    // ==========================================================================
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    let particlesArray = [];
    const numberOfParticles = 40;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5; // Fine particle dots
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * -0.5 - 0.1; // Drift upward
            this.opacity = Math.random() * 0.5 + 0.15;
            this.color = '';
        }

        update(accentColor) {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around edges
            if (this.y < 0) {
                this.y = canvas.height;
                this.x = Math.random() * canvas.width;
            }
            if (this.x < 0 || this.x > canvas.width) {
                this.x = Math.random() * canvas.width;
            }

            this.color = accentColor;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow for next drawings
        }
    }

    function initParticles() {
        particlesArray = [];
        resizeCanvas();
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dynamic reading of active theme accent color
        const accentHex = getComputedStyle(document.body).getPropertyValue('--accent').trim();
        
        particlesArray.forEach(p => {
            p.update(accentHex);
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    // Fire up the Particle engine
    initParticles();
    animateParticles();

});
