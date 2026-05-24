document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Toggle mobile navigation
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile navigation when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    
    function changeLinkState() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', changeLinkState);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show a success message
            alert('Thank you for your message. I will get back to you soon!');
            contactForm.reset();
        });
    }
    
    // Animation on scroll with Intersection Observer for cards
    const animateElements = document.querySelectorAll('.skill-card, .research-card, .project-card, .achievement-card, .certificate-card');
    
    const fadeInOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const fadeInOnScroll = new IntersectionObserver(function(entries, fadeInOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                fadeInOnScroll.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    // Add fade-in class to all animatable elements
    animateElements.forEach(element => {
        element.classList.add('fade-in');
        fadeInOnScroll.observe(element);
    });
    
    // Fixed Skill bars animation
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const animateSkills = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get width from data-width attribute
                const width = entry.target.getAttribute('data-width');
                if (width) {
                    // Set the width after a short delay for better animation
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                }
                animateSkills.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all skill bars
    skillBars.forEach(bar => {
        // Make sure all bars start at zero
        bar.style.width = '0%';
        animateSkills.observe(bar);
    });

    // Also animate language bars in the hero section
    const languageBars = document.querySelectorAll('.language-item .progress-bar');
    languageBars.forEach(bar => {
        bar.style.width = '0%';  // Reset to 0 for animation
        animateSkills.observe(bar);
    });
});