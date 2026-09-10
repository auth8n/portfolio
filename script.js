// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Add shadow to header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 0);
});

// Magnetic Link Effect
const navLinks2 = document.querySelectorAll('.nav-links a');

navLinks2.forEach(link => {
    const text = link.querySelector('span');
    let isHovered = false;
    let currentX = 0;
    let aimX = 0;
    
    link.addEventListener('mousemove', (e) => {
        const { left, width } = e.target.getBoundingClientRect();
        const x = e.clientX - left;
        const center = width / 2;
        aimX = (x - center) * 0.3; // 30% pull strength
        
        if (!isHovered) {
            isHovered = true;
            animate();
        }
    });
    
    link.addEventListener('mouseleave', () => {
        aimX = 0;
        isHovered = false;
    });
    
    function animate() {
        currentX += (aimX - currentX) * 0.1; // Smoothing factor
        text.style.transform = `translateX(${currentX}px)`;
        
        if (isHovered || Math.abs(currentX) > 0.1) {
            requestAnimationFrame(animate);
        } else {
            text.style.transform = 'translateX(0)';
        }
    }
});


//updated js for burger
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;

    // Toggle menu function
    function toggleMenu() {
        burger.classList.toggle('active');
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    // Burger click event
    burger.addEventListener('click', toggleMenu);

    // Overlay click
    navOverlay.addEventListener('click', toggleMenu);

    // Close menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && 
            !burger.contains(e.target) && 
            navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});


//another one for animation collins godiah
document.addEventListener('DOMContentLoaded', function() {
    const heroText = document.querySelector('.hero h1');
    const baseSpeed = 0.03; // Slower base speed for better control
    let currentPosition = 0;
    let direction = 1;
    let targetDirection = 1;
    let lastScrollY = window.scrollY;
    let smoothDirection = 1;
    const smoothingFactor = 0.08; // Smoother direction changes

    // Duplicate content for seamless looping (using data-content)
    const content = heroText.getAttribute('data-content');
    heroText.innerHTML = content.repeat(6); // Creates smoother loop

    // Animation loop
    function animate(timestamp) {
        currentPosition += baseSpeed * direction;
        
        // Seamless looping
        if (currentPosition > 100) currentPosition -= 50;
        if (currentPosition < 0) currentPosition += 50;
        
        heroText.style.transform = `translateX(${-currentPosition}%)`;
        
        // Smooth direction changes
        smoothDirection += (targetDirection - smoothDirection) * smoothingFactor;
        direction = smoothDirection;
        
        requestAnimationFrame(animate);
    }

    // Scroll direction detection
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        targetDirection = currentScrollY > lastScrollY ? -1 : 1;
        lastScrollY = currentScrollY;
    });

    // Start animation
    animate();

    // Optional: Pause when not visible
    const observer = new IntersectionObserver((entries) => {
        heroText.style.opacity = entries[0].isIntersecting ? 1 : 0.5;
    }, { threshold: 0.1 });
    observer.observe(heroText);
});






//for project section in home page
document.addEventListener('DOMContentLoaded', function() {
    const projects = document.querySelectorAll('.project-item');
    const preview = document.createElement('div');
    preview.className = 'project-preview';
    document.body.appendChild(preview);

    // Remove the static img elements from HTML
    document.querySelectorAll('.project-item img').forEach(img => img.remove());

    projects.forEach(project => {
        const imgUrl = project.getAttribute('data-image'); // Add data-image="1.jpg" to each project-item
        
        project.addEventListener('mousemove', (e) => {
            // Update preview
            preview.style.backgroundImage = `url(${imgUrl})`;
            preview.style.left = `${e.clientX}px`;
            preview.style.top = `${e.clientY}px`;
            preview.classList.add('active');
            
            // Add hover effects
            project.classList.add('hover-active');
        });

        project.addEventListener('mouseleave', () => {
            preview.classList.remove('active');
            project.classList.remove('hover-active');
        });
    });
});



//For the About me circle
const wrapper = document.querySelector('.magnetic-button-wrapper');
const button = document.querySelector('.magnetic-button');

// Physics variables
let posX = 0, posY = 0;
let velX = 0, velY = 0;
const stiffness = 0.2;
const damping = 0.7;
const mouseInfluence = 3;

// Animation loop
function animate() {
    // Apply spring physics
    velX += (0 - posX) * stiffness;
    velY += (0 - posY) * stiffness;
    
    // Apply damping
    velX *= damping;
    velY *= damping;
    
    // Update position
    posX += velX;
    posY += velY;
    
    // Apply transformation
    button.style.transform = `translate(${posX}px, ${posY}px)`;
    
    requestAnimationFrame(animate);
}
animate();

// Mouse interaction
wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const mouseX = (e.clientX - centerX) * mouseInfluence;
    const mouseY = (e.clientY - centerY) * mouseInfluence;
    
    // Update velocity based on mouse position
    velX += (mouseX - posX) * 0.05;
    velY += (mouseY - posY) * 0.05;
});

wrapper.addEventListener('mouseleave', () => {
    // Gentle return to center
    velX = 0;
    velY = 0;
});



//Background img of each  item
document.addEventListener('DOMContentLoaded', function() {
  const projects = document.querySelectorAll('.project-item');
  
  projects.forEach(project => {
    const imgUrl = project.getAttribute('data-image');
    project.style.setProperty('--project-image', `url(${imgUrl})`);
  });
});





document.addEventListener('DOMContentLoaded', function () {
  const topTrack = document.querySelector('.top-track');
  const bottomTrack = document.querySelector('.bottom-track');
  let lastScrollY = window.scrollY;
  let animationFrame;

  let topOffset = 0;
  let bottomOffset = 0;
  /*
  function updateTracks() {
    // Scroll direction
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    // Add a small multiplier to control sensitivity
    const moveAmount = scrollDelta * .1; // Smaller = smoother

    // Update offsets based on scroll direction
    topOffset += -moveAmount;     // Top track goes left on scroll down
    bottomOffset += moveAmount;   // Bottom track goes right on scroll down

    // Apply transforms
    topTrack.style.transform = `translateX(${topOffset}px)`;
    bottomTrack.style.transform = `translateX(${bottomOffset}px)`;

    animationFrame = null;()
  }*/

  function handleScroll() {
    if (!animationFrame) {
      animationFrame = requestAnimationFrame(updateTracks);
    }
  }

  window.addEventListener('scroll', handleScroll);
});












//Contact Section 
document.querySelectorAll('.contact-magnetic-button-wrapper').forEach(wrapper => {
  const button = wrapper.querySelector('.contact-magnetic-button');

  wrapper.addEventListener('mousemove', e => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  wrapper.addEventListener('mouseleave', () => {
    button.style.transform = 'translate(0, 0)';
  });
});











//For time 
function updateKenyaTime() {
    const kenyaTimeElement = document.getElementById("kenya-time");
    const now = new Date();

    // Convert to Kenya time (GMT+3)
    const kenyaOffset = 3 * 60; // 3 hours in minutes
    const localOffset = now.getTimezoneOffset(); // In minutes
    const kenyaDate = new Date(now.getTime() + (kenyaOffset + localOffset) * 60000);

    const hours = String(kenyaDate.getHours()).padStart(2, '0');
    const minutes = String(kenyaDate.getMinutes()).padStart(2, '0');

    kenyaTimeElement.textContent = `${hours}:${minutes} GMT +3`;
  }

  updateKenyaTime(); // Initial run
  setInterval(updateKenyaTime, 60000); // Update every minute