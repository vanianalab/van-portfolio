/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.lightbox__close');

// Get all images with lightbox-trigger class
const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

// Add click event to each image
lightboxTriggers.forEach(img => {
  img.addEventListener('click', function() {
    lightbox.style.display = 'block';
    lightboxImg.src = this.src;
    lightboxCaption.innerHTML = this.alt;
  });
});

// Close lightbox when clicking the X button
if (closeBtn) {
  closeBtn.addEventListener('click', function() {
    lightbox.style.display = 'none';
  });
}

// Close lightbox when clicking outside the image
if (lightbox) {
  lightbox.addEventListener('click', function(event) {
    if (event.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });
}

// Close lightbox with ESC key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && lightbox) {
    lightbox.style.display = 'none';
  }
});
