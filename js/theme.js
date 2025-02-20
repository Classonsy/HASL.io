const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const roflButton = document.getElementById('rofl-mode');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.add(savedTheme);
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    localStorage.setItem('theme', 'light-theme');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark-theme');
  }
});

// Mercedes functionality for rofl mode
function initMercedes() {
  const body = document.body;
  
  // Create Mercedes container and elements if they don't exist
  if (!document.querySelector('.mercedes-container')) {
    const container = document.createElement('div');
    container.className = 'mercedes-container';
    
    const mercedesImg = document.createElement('img');
    mercedesImg.className = 'mercedes';
    mercedesImg.src = '/Мерседес.png';
    mercedesImg.alt = 'Mercedes';
    
    const fireOverlay = document.createElement('div');
    fireOverlay.className = 'fire-overlay';
    
    // Create multiple flames with different sizes and positions
    for (let i = 0; i < 15; i++) {
      const flame = document.createElement('div');
      flame.className = 'flame';
      flame.style.left = `${Math.random() * 80 + 10}%`;
      flame.style.top = `${Math.random() * 60 + 20}%`;
      flame.style.width = `${Math.random() * 15 + 10}px`;
      flame.style.height = `${Math.random() * 15 + 10}px`;
      flame.style.animationDelay = `${Math.random() * 0.5}s`;
      fireOverlay.appendChild(flame);
    }
    
    container.appendChild(mercedesImg);
    container.appendChild(fireOverlay);
    body.appendChild(container);
    
    let state = 'driving'; // 'driving', 'broken', 'burning'
    
    container.addEventListener('click', () => {
      const mercedes = container.querySelector('.mercedes');
      const fireOverlay = container.querySelector('.fire-overlay');
      
      switch(state) {
        case 'driving':
          // Stop and break the Mercedes
          mercedes.style.animationPlayState = 'paused';
          mercedes.src = '/Сломанный мерседес.png';
          mercedes.classList.add('broken');
          state = 'broken';
          break;
          
        case 'broken':
          // Set it on fire
          mercedes.classList.add('burning');
          fireOverlay.classList.add('active');
          
          // Add dynamic flame movement
          const flames = fireOverlay.querySelectorAll('.flame');
          flames.forEach(flame => {
            gsap.to(flame, {
              y: -20,
              opacity: gsap.utils.random(0.5, 1),
              duration: gsap.utils.random(0.5, 1.5),
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut"
            });
          });
          
          state = 'burning';
          break;
      }
    });
  }
}

function initRoflEffects() {
  // Create jumpscare container
  const jumpscareContainer = document.createElement('div');
  jumpscareContainer.className = 'jumpscare-container';
  document.body.appendChild(jumpscareContainer);

  // Create floating stickers
  const stickers = [
    '/908ac5a763468c987ba4dce0df60b64d.png',
    '/0aa56121c482d97fb211b506ed6ecb5e.webp'
  ];

  stickers.forEach(src => {
    const sticker = document.createElement('img');
    sticker.src = src;
    sticker.className = 'floating-sticker';
    sticker.style.left = `${Math.random() * 80}%`;
    sticker.style.top = `${Math.random() * 80}%`;
    document.body.appendChild(sticker);

    gsap.to(sticker, {
      y: "random(-100, 100)",
      x: "random(-100, 100)",
      rotation: "random(-180, 180)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  });

  // Add jumpscare functionality
  setInterval(() => {
    if (Math.random() < 0.1 && document.body.classList.contains('rofl-mode')) {
      const jumpscare = document.createElement('img');
      jumpscare.src = Math.random() < 0.5 ? '/908ac5a763468c987ba4dce0df60b64d.png' : '/0aa56121c482d97fb211b506ed6ecb5e.webp';
      jumpscare.className = 'jumpscare';
      jumpscareContainer.appendChild(jumpscare);

      setTimeout(() => {
        jumpscare.remove();
      }, 500);
    }
  }, 5000);
}

// ROFL mode functionality
roflButton.addEventListener('click', () => {
  body.classList.toggle('rofl-mode');
  
  if (body.classList.contains('rofl-mode')) {
    initMercedes();
    initRoflEffects();
    
    // Add demonic effects
    gsap.to('.sticker', {
      rotate: 360,
      scale: 1.5,
      duration: 1,
      opacity: 0.3,
      stagger: 0.1
    });
    
    gsap.to('.product-card', {
      rotate: () => gsap.utils.random(-5, 5),
      scale: 1.05,
      duration: 0.5,
      stagger: 0.1
    });
  } else {
    // Remove all rofl mode elements
    document.querySelectorAll('.mercedes-container, .floating-sticker, .jumpscare-container').forEach(el => el.remove());
    
    // Reset effects
    gsap.to('.sticker, .product-card', {
      rotate: 0,
      scale: 1,
      duration: 0.5,
      opacity: 1
    });
  }
});

// Initialize sticker rotations
document.querySelectorAll('.sticker').forEach(sticker => {
  const rotation = sticker.dataset.rotation;
  sticker.style.setProperty('--rotation', `${rotation}deg`);
});