document.addEventListener('DOMContentLoaded', () => {
  // --- Header Scrolled Effect ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Menu Toggle ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

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

  // Close mobile menu if clicked outside
  document.addEventListener('click', (e) => {
    if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  // --- Services Tabs Switching ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.services-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      // Add active to current button
      btn.classList.add('active');

      // Hide all panes
      tabPanes.forEach(p => p.classList.remove('active'));
      // Show target pane
      const targetPane = document.getElementById(btn.getAttribute('data-tab'));
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // --- Booking Modal Functionality ---
  const modal = document.getElementById('booking-modal');
  const openModalBtns = document.querySelectorAll('.open-booking-btn');
  const closeModalBtn = document.getElementById('modal-close');
  const serviceSelect = document.getElementById('booking-service');
  const bookingForm = document.getElementById('booking-form');
  const bookingFormState = document.getElementById('booking-form-state');
  const bookingSuccessState = document.getElementById('booking-success-state');
  const successCloseBtn = document.getElementById('success-close-btn');

  // Open Modal
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Reset form states
      bookingForm.reset();
      bookingFormState.style.display = 'block';
      bookingSuccessState.style.display = 'none';
      
      // Check if button has a specific service assigned
      const serviceId = btn.getAttribute('data-service');
      if (serviceId) {
        serviceSelect.value = serviceId;
      } else {
        serviceSelect.selectedIndex = 0;
      }
      
      // Show Modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop background scrolling
    });
  });

  // Close Modal
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  closeModalBtn.addEventListener('click', closeModal);
  successCloseBtn.addEventListener('click', closeModal);

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // --- Booking Form Submit & WhatsApp Funnel ---
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('booking-name').value;
    const phone = document.getElementById('booking-phone').value;
    const service = serviceSelect.value;
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    const message = document.getElementById('booking-message').value;

    // Update success screen details
    document.getElementById('summary-name').textContent = name;
    document.getElementById('summary-service').textContent = service;
    document.getElementById('summary-phone').textContent = phone;

    // Create WhatsApp URL text
    const waPhone = '14036081128'; // Raji's Salon Phone
    const waText = `Hello Raji, I would like to request a beauty appointment.
*Name:* ${name}
*Phone:* ${phone}
*Service:* ${service}
*Preferred Date:* ${date}
*Preferred Time:* ${time}
*Special Notes:* ${message || 'None'}`;

    const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;
    
    // Attach WhatsApp link to button
    const whatsappBtn = document.getElementById('whatsapp-btn');
    whatsappBtn.href = waLink;

    // Switch Modal View State
    bookingFormState.style.display = 'none';
    bookingSuccessState.style.display = 'block';
  });

  // --- Scroll To Top Button ---
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
