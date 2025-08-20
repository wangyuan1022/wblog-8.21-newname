// Modern Navigation Bar Behavior
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.my-navbar');
  
  if (navbar) {
    // Add scroll effect
    let scrollTimer = null;
    
    function handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    // Throttle scroll events for better performance
    window.addEventListener('scroll', function() {
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      scrollTimer = setTimeout(handleScroll, 10);
    });
    
    // Set active nav link based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      
      if (linkPath === currentPath || (currentPath === '/' && linkPath === '/')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    
    // Smooth hover effects for nav items
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      
      if (link) {
        item.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
        });
      }
    });
    
    // Enhanced mobile menu animation
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
      navbarToggler.addEventListener('click', function() {
        // Add animation class
        navbarCollapse.style.transition = 'all 0.3s ease';
        
        // Toggle expanded state
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        
        if (!isExpanded) {
          navbarCollapse.style.transform = 'translateY(-10px)';
          navbarCollapse.style.opacity = '0';
          
          setTimeout(() => {
            navbarCollapse.style.transform = 'translateY(0)';
            navbarCollapse.style.opacity = '1';
          }, 50);
        }
      });
      
      // Close mobile menu when clicking on a link
      const mobileNavLinks = navbarCollapse.querySelectorAll('.nav-link');
      mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
          if (window.innerWidth < 992) {
            navbarCollapse.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
          }
        });
      });
    }
  }
});

// Add navbar scroll effect class to body
document.body.classList.add('navbar-scroll-effect');