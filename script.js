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





//for burger visibility
/*document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('nav'); // Assuming this is your top nav

  function handleScroll() {
    const navBottom = nav.getBoundingClientRect().bottom;

    if (navBottom < 0) {
      burger.style.display = 'flex'; // Show burger when nav is out of view
    } else {
      burger.style.display = 'none'; // Hide when back at top
      burger.classList.remove('active'); // Reset active state
      document.querySelector('.nav-links')?.classList.remove('active');
      document.querySelector('.nav-overlay')?.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  }

  // Initial check
  handleScroll();

  // Listen for scroll changes
  window.addEventListener('scroll', handleScroll);
});
*/





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




//Show off section
/*document.addEventListener('DOMContentLoaded', function() {
  const topTrack = document.querySelector('.top-track');
  const bottomTrack = document.querySelector('.bottom-track');
  const section = document.querySelector('.show-off');
  let lastScroll = 0;
  let isScrollingDown = false;
  let animationFrame;

  function handleScroll() {
    const sectionRect = section.getBoundingClientRect();
    const sectionTop = sectionRect.top;
    const sectionHeight = sectionRect.height;
    const windowHeight = window.innerHeight;

    // Only animate when section is in view
    if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
      const scrollProgress = Math.min(Math.max(-sectionTop / windowHeight, 0), 1);
      
      if (isScrollingDown) {
        topTrack.style.transform = `translateX(${25 * scrollProgress}%)`;
        bottomTrack.style.transform = `translateX(${-25 * scrollProgress}%)`;
      } else {
        topTrack.style.transform = `translateX(${25 - 25 * scrollProgress}%)`;
        bottomTrack.style.transform = `translateX(${-25 + 25 * scrollProgress}%)`;
      }
    }
  }

  function checkScrollDirection() {
    const currentScroll = window.pageYOffset;
    isScrollingDown = currentScroll > lastScroll;
    lastScroll = currentScroll;
    
    if (!animationFrame) {
      animationFrame = requestAnimationFrame(() => {
        handleScroll();
        animationFrame = null;
      });
    }
  }

  // Initialize positions
  topTrack.style.transform = 'translateX(0%)';
  bottomTrack.style.transform = 'translateX(0%)';

  window.addEventListener('scroll', checkScrollDirection);
  
  // Cleanup on unmount if needed
  return () => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener('scroll', checkScrollDirection);
  };
});


*/






/*document.addEventListener('DOMContentLoaded', function() {
  const topTrack = document.querySelector('.top-track');
  const bottomTrack = document.querySelector('.bottom-track');
  const section = document.querySelector('.show-off');
  
  let lastScrollY = window.scrollY;
  let scrollDirection = 0; // 1 = down, -1 = up
  let scrollProgress = 0;
  let isAnimating = false;

  // Set initial positions (half off-screen)
  gsap.set(topTrack, { x: '-25%' });
  gsap.set(bottomTrack, { x: '25%' });

  function updateTracks() {
    // Calculate progress (0 to 1) based on section visibility
    const sectionRect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const visibleHeight = Math.min(sectionRect.bottom, viewportHeight) - Math.max(sectionRect.top, 0);
    scrollProgress = Math.min(Math.max(visibleHeight / viewportHeight, 0), 1);

    // Apply movement based on scroll direction
    if (scrollDirection > 0) { // Scrolling down
      gsap.to(topTrack, { x: `${-25 + scrollProgress * 25}%`, duration: 0.8, ease: "power2.out" });
      gsap.to(bottomTrack, { x: `${25 - scrollProgress * 25}%`, duration: 0.8, ease: "power2.out" });
    } else { // Scrolling up
      gsap.to(topTrack, { x: `${-25 + (1 - scrollProgress) * 25}%`, duration: 0.8, ease: "power2.out" });
      gsap.to(bottomTrack, { x: `${25 - (1 - scrollProgress) * 25}%`, duration: 0.8, ease: "power2.out" });
    }
  }

  function handleScroll() {
    const currentScrollY = window.scrollY;
    scrollDirection = Math.sign(currentScrollY - lastScrollY);
    lastScrollY = currentScrollY;

    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(() => {
        updateTracks();
        isAnimating = false;
      });
    }
  }

  window.addEventListener('scroll', handleScroll);

  // Initialize
  updateTracks();
});*/












/*document.addEventListener('DOMContentLoaded', function() {
  const topTrack = document.querySelector('.top-track');
  const bottomTrack = document.querySelector('.bottom-track');
  const section = document.querySelector('.show-off');
  
  let lastScrollY = window.scrollY;
  let scrollDirection = 0;
  let animationFrame;

  // Initial positions
  topTrack.style.transform = 'translateX(-25%)';
  bottomTrack.style.transform = 'translateX(25%)';

  function updateTracks() {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const progress = Math.min(Math.max(-sectionTop / windowHeight, 0), 1);

    if (scrollDirection > 0) { // Scrolling down
      topTrack.style.transform = `translateX(${-25 + progress * 25}%)`;
      bottomTrack.style.transform = `translateX(${25 - progress * 25}%)`;
    } else { // Scrolling up
      topTrack.style.transform = `translateX(${-25 + (1 - progress) * 25}%)`;
      bottomTrack.style.transform = `translateX(${25 - (1 - progress) * 25}%)`;
    }
  }

  function handleScroll() {
    const currentScrollY = window.scrollY;
    scrollDirection = Math.sign(currentScrollY - lastScrollY);
    lastScrollY = currentScrollY;

    if (!animationFrame) {
      animationFrame = requestAnimationFrame(() => {
        updateTracks();
        animationFrame = null;
      });
    }
  }

  window.addEventListener('scroll', handleScroll);
});*/










document.addEventListener('DOMContentLoaded', function () {
  const topTrack = document.querySelector('.top-track');
  const bottomTrack = document.querySelector('.bottom-track');
  let lastScrollY = window.scrollY;
  let animationFrame;

  let topOffset = 0;
  let bottomOffset = 0;

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

    animationFrame = null;
  }

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