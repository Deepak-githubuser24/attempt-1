// Smooth scroll for older browsers that don't support CSS behavior (fallback)
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 60, // offset for fixed navbar
        behavior: 'smooth'
      });
    }
  });
});

// Add shadow to navbar on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});