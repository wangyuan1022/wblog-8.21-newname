// Modern UI Animations and Interactions

document.addEventListener('DOMContentLoaded', function() {
  // Add page enter animation
  document.body.classList.add('page-enter');
  
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe elements for scroll animations
  const scrollElements = document.querySelectorAll('.content, .self-introduce, .subscription-card, .recent-post-item, .blog-post-container');
  scrollElements.forEach(el => {
    el.classList.add('scroll-fade-in');
    observer.observe(el);
  });
  
  // Enhanced QR code toggle animation
  const qrButtons = document.querySelectorAll('.qr-button');
  qrButtons.forEach(button => {
    button.addEventListener('click', function() {
      const socialShare = this.parentElement.querySelector('.social-share');
      if (socialShare) {
        socialShare.classList.toggle('show');
        
        // Auto-hide after 5 seconds
        if (socialShare.classList.contains('show')) {
          setTimeout(() => {
            socialShare.classList.remove('show');
          }, 5000);
        }
      }
    });
  });
  
  // Enhanced like button animation
  const likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Create floating heart effect
      const heart = document.createElement('div');
      heart.innerHTML = '❤️';
      heart.style.cssText = `
        position: absolute;
        pointer-events: none;
        font-size: 20px;
        color: #ef4444;
        animation: floatUp 2s ease-out forwards;
        z-index: 1000;
      `;
      
      // Position the heart
      const rect = this.getBoundingClientRect();
      heart.style.left = rect.left + rect.width / 2 + 'px';
      heart.style.top = rect.top + 'px';
      
      document.body.appendChild(heart);
      
      // Remove after animation
      setTimeout(() => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart);
        }
      }, 2000);
    });
  });
  
  // Add floating heart keyframe if not exists
  if (!document.querySelector('#floatUpKeyframe')) {
    const style = document.createElement('style');
    style.id = 'floatUpKeyframe';
    style.textContent = `
      @keyframes floatUp {
        0% {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        100% {
          transform: translateY(-100px) scale(1.5);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Smooth scroll behavior for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Parallax effect for background
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.home-index-page, .blogs-show-page');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
  }
  
  function requestParallaxUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  // Only add parallax on larger screens
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', requestParallaxUpdate);
  }
  
  // Stagger animation for navigation items
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach((item, index) => {
    item.style.animationDelay = `${0.1 + (index * 0.1)}s`;
  });
  
  // Card tilt effect (subtle 3D effect)
  const cards = document.querySelectorAll('.content, .self-introduce, .subscription-card, .blog-post-container');
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      if (window.innerWidth > 768) { // Only on larger screens
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -5;
        const rotateY = (x - centerX) / centerX * 5;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });
  
  // Typography animation on scroll
  const headings = document.querySelectorAll('h1, h2, h3, .blog-post-title, .recent-title');
  const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
      }
    });
  }, { threshold: 0.5 });
  
  headings.forEach(heading => {
    headingObserver.observe(heading);
  });
  
  // Loading state animation
  function showLoading(element) {
    element.classList.add('loading');
    element.style.pointerEvents = 'none';
  }
  
  function hideLoading(element) {
    element.classList.remove('loading');
    element.style.pointerEvents = 'auto';
  }
  
  // Add loading animation to forms and buttons
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function() {
      const submitButton = this.querySelector('button[type="submit"], input[type="submit"]');
      if (submitButton) {
        showLoading(submitButton);
      }
    });
  });
  
  // Progressive image loading with animation
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.complete) {
      img.style.opacity = '0';
      img.addEventListener('load', function() {
        this.style.transition = 'opacity 0.5s ease';
        this.style.opacity = '1';
      });
    }
  });
  
  // Reduced motion support
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    // Disable all animations
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Performance monitoring
  function measurePerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          console.log('Page load performance:', {
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            loadComplete: perfData.loadEventEnd - perfData.loadEventStart
          });
        }, 100);
      });
    }
  }
  
  measurePerformance();
});