import './libs/ddscrollspy'

$(document).on('turbo:load', function(){
  if($('.home-about-page').length === 0) { return; }

  // Modern navigation scroll effect
  $(window).scroll(function(){
    if($(this).scrollTop() > 0)
      $('.modern-nav').addClass('scrolled')
    else
      $('.modern-nav').removeClass('scrolled')
  })

  // Mobile navigation toggle
  $('.nav-toggle').click(function(e){
    e.preventDefault()
    $('.nav-menu').toggleClass('active')
    $(this).toggleClass('active')
  })

  // Smooth scrolling for navigation links
  $('.nav-item[href^="#"]').click(function(e){
    e.preventDefault()
    const target = $(this.getAttribute('href'))
    if(target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 80
      }, 800)
      // Close mobile menu if open
      $('.nav-menu').removeClass('active')
      $('.nav-toggle').removeClass('active')
    }
  })

  // Scroll indicator in hero section
  $('.scroll-indicator').click(function(e){
    e.preventDefault()
    const target = $(this.getAttribute('href'))
    if(target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 80
      }, 800)
    }
  })

  // Add scroll spy functionality
  const sections = $('section[id]')
  const navItems = $('.nav-item[href^="#"]')
  
  $(window).scroll(function(){
    const scrollTop = $(this).scrollTop() + 100
    
    sections.each(function(){
      const section = $(this)
      const sectionTop = section.offset().top
      const sectionHeight = section.outerHeight()
      const sectionId = section.attr('id')
      
      if(scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        navItems.removeClass('active')
        $(`.nav-item[href="#${sectionId}"]`).addClass('active')
      }
    })
  })
})
