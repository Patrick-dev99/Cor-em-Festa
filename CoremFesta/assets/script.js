// script.js - versão otimizada e comentada

/* ======================
   Menu móvel toggle
====================== */
const menuToggle = document.getElementById('menuToggle');
const mobileDrawer = document.getElementById('mobile-drawer');
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
  menuToggle.setAttribute('aria-expanded', !expanded);
  mobileDrawer.classList.toggle('show');
});

// Fechar menu móvel ao clicar em um link
const mobileLinks = mobileDrawer.querySelectorAll('a');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileDrawer.classList.remove('show');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ======================
   Cards hover efeito para touch
====================== */
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('touchstart', () => card.classList.add('hover'));
  card.addEventListener('touchend', () => card.classList.remove('hover'));
});

/* ======================
   Animação suave das seções ao rolar
====================== */
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });
sections.forEach(section => observer.observe(section));

/* ======================
   Busca responsiva (desktop e mobile)
====================== */
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');

searchButton.addEventListener('click', () => {
  searchInput.classList.toggle('show');
  searchInput.focus();
});

/* ======================
   Busca em tempo real nos cards
====================== */
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  let anyVisible = false;

  cards.forEach(card => {
    const cardText = card.querySelector('p');
    cardText.innerHTML = cardText.textContent; // remove destaque

    if (cardText.textContent.toLowerCase().includes(query)) {
      card.style.display = 'block';
      card.style.border = '2px solid var(--accent)';
      anyVisible = true;
      if (query) {
        const regex = new RegExp(`(${query})`, 'gi');
        cardText.innerHTML = cardText.textContent.replace(regex, '<mark>$1</mark>');
      }
    } else {
      card.style.display = 'none';
    }
  });
});