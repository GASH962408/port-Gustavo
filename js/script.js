// js/script.js

function initScripts() {
  /*==================== toggle icon navbar ====================*/
  let menuIcon = document.querySelector('#menu-icon');
  let navbar = document.querySelector('.navbar');

  if (menuIcon && navbar) {
      menuIcon.onclick = () => {
          menuIcon.classList.toggle('bx-x');
          navbar.classList.toggle('active');
      };
  }

  /*==================== scroll sections active link ====================*/
  let sections = document.querySelectorAll('section');
  let navLinks = document.querySelectorAll('header nav a');

  window.onscroll = () => {
      sections.forEach(sec => {
          let top = window.scrollY;
          let offset = sec.offsetTop - 150;
          let height = sec.offsetHeight;
          let id = sec.getAttribute('id');

          if (top >= offset && top < offset + height) {
              navLinks.forEach(links => {
                  links.classList.remove('active');
                  let link = document.querySelector('header nav a[href*=' + id + ']');
                  if (link) {
                      link.classList.add('active');
                  }
              });
          }
      });

      /*==================== sticky navbar ====================*/
      let header = document.querySelector('header');

      if (header) {
          header.classList.toggle('sticky', window.scrollY > 100);
      }

      /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
      if (menuIcon && navbar) {
          menuIcon.classList.remove('bx-x');
          navbar.classList.remove('active');
      }
  };

  /*==================== scroll reveal ====================*/
  ScrollReveal({
      // reset: true,
      distance: '80px',
      duration: 2000,
      delay: 200
  });

  ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
  ScrollReveal().reveal('.carousel-wrapper, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
  ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
  ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

  /*==================== typed js ====================*/
  if (document.querySelector('.multiple-text')) {
      const typed = new Typed('.multiple-text', {
          strings: ['Full stack developer', 'Mechatronic Engineer', 'Challenge lover'],
          typeSpeed: 30,
          backSpeed: 50,
          backDelay: 200,
          loop: true
      });
  }

  /*==================== funcionalidad 'Leer más' ====================*/
  // Si tienes funcionalidad de 'Leer más', asegúrate de que los elementos existen
  // y de que el código se ejecuta después de que los componentes se hayan cargado.

  // Ejemplo:
  const readMoreBtn = document.querySelector('.about-content .expand-btn');
  const textContainer = document.querySelector('.about-content .text-container');

  if (readMoreBtn && textContainer) {
      readMoreBtn.addEventListener("click", function () {
          textContainer.classList.toggle("expanded");

          if (textContainer.classList.contains("expanded")) {
              readMoreBtn.textContent = "Leer menos";
          } else {
              readMoreBtn.textContent = "Leer más";
          }
      });
  }

  /*==================== Función atvImg ====================*/
  function atvImg() {
      // ... (código de la función atvImg)
      // Asegúrate de copiar todo el contenido de la función atvImg aquí
  }

  atvImg();

  /*==================== Paginación ====================*/
  // Asegúrate de que este código se ejecuta después de que los elementos estén en el DOM
  $(document).ready(function() {
      // Número de tarjetas por página
      var itemsPerPage = 3; // Cambia este valor según tus necesidades

      // Selecciona todos los elementos de tarjeta
      var items = $('.custom-skill-item');
      var numItems = items.length;

      if (numItems > 0) {
          // Oculta todas las tarjetas inicialmente
          items.hide();

          // Inicializa la paginación
          $('#pagination-container').pagination({
              items: numItems,
              itemsOnPage: itemsPerPage,
              cssStyle: '',
              prevText: '',
              nextText: '',
              useAnchors: false,
              displayedPages: 2,
              edges: 0,
              onPageClick: function(pageNumber) {
                  var showFrom = (pageNumber - 1) * itemsPerPage;
                  var showTo = showFrom + itemsPerPage;

                  items.hide().slice(showFrom, showTo).show();
              }
          });

          // Muestra las primeras tarjetas al cargar la página
          items.slice(0, itemsPerPage).show();
      }
  });
}
