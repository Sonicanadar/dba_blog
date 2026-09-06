/* ==========================================================================
   STEP 'N' STYLE LOGIC ENGINE: RESPONSIVE INTERACTION PACK
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Dynamic Frost Navbar Scale Controls ---
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }

    // --- 2. Responsive Mobile Hamburger Open Controller ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
        });
    }

    // --- 3. Kinetic Fade-in Intersection Scroll Observer ---
    const animatedElements = document.querySelectorAll(
        '.overview-section, .about-container, .contact-container, .dashboard-container'
    );
    
    if (animatedElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-live');
                    observer.unobserve(entry.target); 
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        });

        animatedElements.forEach(element => revealObserver.observe(element));
    }
    // --- 4. Interactive Showcase Dynamic Template Engine ---
    const playlistContainer = document.getElementById('playlistDynamicContainer');
    const categoryTabs = document.querySelectorAll('.category-tab');
    const mainPlayer = document.getElementById('mainVideoPlayer');
    const mainSource = document.getElementById('mainVideoSource');
    const activeTitle = document.getElementById('activeTitle');
    const activeDescription = document.getElementById('activeDescription');

    const playlistDatabase = {
        weddings: [
            {
                title: "Grand Bridal Couple Waltz",
                desc: "An elegant, classic romantic ballroom entryway waltz map.",
                videoSrc: "videos/video1.mp4",
                poster: "images/soni1.jpg",
                fullDetails: "Turn your introductory moment into a timeless stage masterpiece. Our standard wedding waltz packages manage micro-timing edits and rhythm patterns built perfectly for non-professional couples."
            },
            {
                title: "Family Sangeet Fusion Mashup",
                desc: "High-octane block-rocking group performance synchronization routines.",
                videoSrc: "videos/video1.mp4",
                poster: "images/soni1.jpg",
                fullDetails: "Get the cousins, aunts, and grandparents dancing in perfect lockstep. Features highly intuitive group spacing transitions that clean up effortlessly on high-def party cameras."
            }
        ],
        birthdays: [
            {
                title: "Sweet 16 Urban Showcase",
                desc: "Slick, cutting-edge commercial hip-hop street routines.",
                videoSrc: "videos/video1.mp4",
                poster: "images/soni1.jpg",
                fullDetails: "Turn up the bass energy with intense, modern rhythmic loops matching chart-topping audio clips. Ideal for teens and dynamic youth birthday events."
            },
            {
                title: "Sweet 1 Urban Showcase",
                desc: "Slick, cutting-edge commercial hip-hop street routines.",
                videoSrc: "videos/video1.mp4",
                poster: "images/soni1.jpg",
                fullDetails: "Turn up the bass energy with intense, modern rhythmic loops matching chart-topping audio clips. Ideal for teens and dynamic youth birthday events."
            }
        ],
        corporate: [
            {
                title: "Gala Keynote Flashmob Opening",
                desc: "morale-boosting hidden choreography launch tracking blocks.",
                videoSrc: "videos/video1.mp4",
                poster: "images/soni1.jpg",
                fullDetails: "Surprise corporate attendees, push client metrics, and build company value using energetic routines choreographed directly for teams and executive leadership panels."
            }
        ]
    };

    if (playlistContainer && categoryTabs.length > 0 && mainPlayer && mainSource && activeTitle && activeDescription) {
        
        function loadSidebarCategoryPlaylist(categoryKey) {
            playlistContainer.innerHTML = ''; 
            const dynamicList = playlistDatabase[categoryKey];
            
            if (!dynamicList || dynamicList.length === 0) return;

            dynamicList.forEach((showreel, index) => {
                const card = document.createElement('div');
                card.className = `video-card ${index === 0 ? 'active' : ''}`;
                card.innerHTML = `
                    <div class="card-thumb">
                        <img src="${showreel.poster}" alt="${showreel.title}">
                        <span class="duration-badge">Showreel</span>
                    </div>
                    <div class="card-info">
                        <h4>${showreel.title}</h4>
                        <p>${showreel.desc}</p>
                    </div>
                `;
                
                card.addEventListener('click', () => {
                    document.querySelectorAll('.video-card').forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    
                    mainPlayer.setAttribute('poster', showreel.poster);
                    mainSource.setAttribute('src', showreel.videoSrc);
                    mainPlayer.load();
                    mainPlayer.play().catch(() => console.log('Autoplay deferred until client trigger'));
                    
                    activeTitle.textContent = showreel.title;
                    activeDescription.textContent = showreel.fullDetails;
                });
                
                playlistContainer.appendChild(card);
            });

            // Set primary display panel showcase defaults to target active index item 0 data mapping safely
            mainPlayer.setAttribute('poster', dynamicList[0].poster);
            mainSource.setAttribute('src', dynamicList[0].videoSrc);
            mainPlayer.load();
            activeTitle.textContent = dynamicList[0].title;
            activeDescription.textContent = dynamicList[0].fullDetails;
        }

        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                categoryTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                loadSidebarCategoryPlaylist(this.getAttribute('data-category'));
            });
        });

        // Initialize default view showcase channel content layer data mapping sets
        loadSidebarCategoryPlaylist('weddings');
    }
      // --- 5. Contact Consultation Form Submissions Pipeline ---
    const contactForm = document.getElementById('mainContactForm');
    const bookingWrapper = document.querySelector('.booking-form-wrapper');

    if (contactForm && bookingWrapper) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 1. Gather all form inputs dynamically
            const clientName = document.getElementById('fullName').value;
            const emailAddress = document.getElementById('emailAddress').value;
            const phoneNumber = document.getElementById('phoneNumber').value;
            const eventType = document.getElementById('eventType').value;
            const dancerCount = document.getElementById('dancerCount').value;
            const budgetBracket = document.getElementById('budgetBracket').value;
            const visionDetails = document.getElementById('visionDetails').value || "None provided";

            // 2. Format the message text string for WhatsApp with clean spacing and bold headers
            let waMessage = `✨ *Step 'n' Style Booking Request* ✨\n\n`;
            waMessage += `👤 *Name:* ${clientName}\n`;
            waMessage += `✉️ *Email:* ${emailAddress}\n`;
            waMessage += `📞 *Phone:* ${phoneNumber}\n`;
            waMessage += `💍 *Event Type:* ${eventType}\n`;
            waMessage += `👥 *Dancers:* ${dancerCount}\n`;
            waMessage += `💰 *Budget Package:* ${budgetBracket}\n`;
            waMessage += `📝 *Vision Details:* ${visionDetails}`;

            // 3. Encode the text string so it works safely inside a browser URL path
            const encodedMessage = encodeURIComponent(waMessage);

            // 4. Set target WhatsApp Phone Number
            const whatsappNumber = "918976029973"; 
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // 5. Replace the form with a seamless, clean WhatsApp submission card layout
            bookingWrapper.innerHTML = `
                <div class="form-success-alert" style="text-align: center; padding: 20px 10px; opacity: 0; transform: translateY(10px); transition: all 0.5s ease-out;">
                    <div class="modal-icon" style="font-size: 3.5rem; margin-bottom: 15px; text-shadow: 0 0 20px rgba(0, 240, 255, 0.5);">✨</div>
                    <h3 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 15px; text-transform: uppercase; letter-spacing: -0.5px;">
                        Roadmap Profile Ready!
                    </h3>
                    <p style="color: #a0a0ab; font-size: 1rem; line-height: 1.6; margin-bottom: 30px;">
                        Brilliant choice, <span class="highlight" style="font-weight:800; color: #ff007f; text-shadow: 0 0 15px rgba(255, 0, 127, 0.4);">${clientName}</span>!<br><br>
                        Step 'n' Style has generated your performance breakdown. Click below to securely send your details directly to our team via WhatsApp!
                    </p>
                    <a href="${whatsappURL}" target="_blank" class="btn full-width-btn" id="whatsappDirectBtn" style="text-decoration: none; display: block; box-sizing: border-box;">
                        Send to WhatsApp 🚀
                    </a>
                    <button id="resetFormBtn" style="background: transparent; border: none; color: #666; font-size: 0.85rem; margin-top: 20px; cursor: pointer; text-decoration: underline; font-weight: 700; transition: color 0.3s;">
                        Fill out another request
                    </button>
                </div>
            `;

            // Trigger a quick micro-timeout animation hook to smoothly slide up the new content
            const successAlert = bookingWrapper.querySelector('.form-success-alert');
            setTimeout(() => {
                if (successAlert) {
                    successAlert.style.opacity = '1';
                    successAlert.style.transform = 'translateY(0)';
                }
            }, 50);

            // 6. Reset listener function to reconstruct the original empty form state if requested
            const resetBtn = document.getElementById('resetFormBtn');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    location.reload(); // Quickest, safest way to restore your entire pristine template layout map
                });
            }
        });
    }
        // --- 6. Automated Light/Dark Theme Switching Module ---
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    if (themeToggleBtn) {
        // Check user browser cache memory to instantly remember their chosen theme settings
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'light') {
            document.body.classList.add('light-mode');
            themeToggleBtn.textContent = '☀️';
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            let theme = 'dark';
            if (document.body.classList.contains('light-mode')) {
                theme = 'light';
                themeToggleBtn.textContent = '☀️';
            } else {
                themeToggleBtn.textContent = '🌙';
            }
            
            // Save state selection value profiles locally inside window localStorage caches
            localStorage.setItem('theme', theme);
        });
    }

});
