/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

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
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    /*==================== sticky navbar ====================*/
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/*==================== scroll reveal ====================*/
ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/*==================== typed js ====================*/
const typed = new Typed('.multiple-text', {
    strings: ['Full stack developer', 'Mechatronic Engineer', 'Challenge lover'],
    typeSpeed: 30,
    backSpeed: 50,
    backDelay: 200,
    loop: true
});

/*==================== funcionalidad 'Leer más' ====================*/
document.addEventListener("DOMContentLoaded", () => {
    // Selecciona el botón y el contenedor de texto específicos de la sección 'Sobre mí'
    const readMoreBtn = document.querySelector('.about-content .expand-btn');
    const textContainer = document.querySelector('.about-content .text-container');

    // Verifica que los elementos existen
    if (readMoreBtn && textContainer) {
        readMoreBtn.addEventListener("click", function () {
            // Alterna la clase 'expanded' en el contenedor de texto
            textContainer.classList.toggle("expanded");

            // Cambia el texto del botón según el estado
            if (textContainer.classList.contains("expanded")) {
                readMoreBtn.textContent = "Leer menos";
            } else {
                readMoreBtn.textContent = "Leer más";
            }
        });
    }

    /*==================== funcionalidad 'Leer más' en otras secciones (opcional) ====================*/
    // Si tienes más botones 'Leer más' en otras secciones, puedes utilizar el siguiente código:

    const buttons = document.querySelectorAll(".services-box .expand-btn");

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            // Selecciona el contenedor de texto en el mismo 'services-box'
            const textContainer = button.previousElementSibling;

            // Alterna la clase 'expanded' en el contenedor de texto
            textContainer.classList.toggle("expanded");

            // Cambia el texto del botón según el estado
            if (textContainer.classList.contains("expanded")) {
                button.textContent = "Leer menos";
            } else {
                button.textContent = "Leer más";
            }
        });
    });
});

function atvImg() {
  var d = document,
      de = d.documentElement,
      bd = d.getElementsByTagName('body')[0],
      htm = d.getElementsByTagName('html')[0],
      win = window,
      imgs = d.querySelectorAll('.atvImg'),
      totalImgs = imgs.length,
      supportsTouch = 'ontouchstart' in win || navigator.msMaxTouchPoints;

  if (totalImgs <= 0) {
      return;
  }

  for (var l = 0; l < totalImgs; l++) {

      var thisImg = imgs[l],
          layerElems = thisImg.querySelectorAll('.atvImg-layer'),
          totalLayerElems = layerElems.length;

      if (totalLayerElems <= 0) {
          continue;
      }

      while (thisImg.firstChild) {
          thisImg.removeChild(thisImg.firstChild);
      }

      var containerHTML = d.createElement('div'),
          shineHTML = d.createElement('div'),
          shadowHTML = d.createElement('div'),
          layersHTML = d.createElement('div'),
          layers = [];

      thisImg.id = 'atvImg__' + l;
      containerHTML.className = 'atvImg-container';
      shineHTML.className = 'atvImg-shine';
      shadowHTML.className = 'atvImg-shadow';
      layersHTML.className = 'atvImg-layers';

      for (var i = 0; i < totalLayerElems; i++) {
          var layer = d.createElement('div'),
              imgSrc = layerElems[i].getAttribute('data-img');

          layer.className = 'atvImg-rendered-layer';
          layer.setAttribute('data-layer', i);
          layer.style.backgroundImage = 'url(' + imgSrc + ')';
          layersHTML.appendChild(layer);

          layers.push(layer);
      }

      containerHTML.appendChild(shadowHTML);
      containerHTML.appendChild(layersHTML);
      containerHTML.appendChild(shineHTML);
      thisImg.appendChild(containerHTML);

      var w = thisImg.clientWidth || thisImg.offsetWidth || thisImg.scrollWidth;
      thisImg.style.transform = 'perspective(' + w * 3 + 'px)';

      if (supportsTouch) {
          win.preventScroll = false;

          (function (_thisImg, _layers, _totalLayers, _shine) {
              thisImg.addEventListener('touchmove', function (e) {
                  if (win.preventScroll) {
                      e.preventDefault();
                  }
                  processMovement(e, true, _thisImg, _layers, _totalLayers, _shine);
              });
              thisImg.addEventListener('touchstart', function (e) {
                  win.preventScroll = true;
                  processEnter(e, _thisImg);
              });
              thisImg.addEventListener('touchend', function (e) {
                  win.preventScroll = false;
                  processExit(e, _thisImg, _layers, _totalLayers, _shine);
              });
          })(thisImg, layers, totalLayerElems, shineHTML);
      } else {
          (function (_thisImg, _layers, _totalLayers, _shine) {
              thisImg.addEventListener('mousemove', function (e) {
                  processMovement(e, false, _thisImg, _layers, _totalLayers, _shine);
              });
              thisImg.addEventListener('mouseenter', function (e) {
                  processEnter(e, _thisImg);
              });
              thisImg.addEventListener('mouseleave', function (e) {
                  processExit(e, _thisImg, _layers, _totalLayers, _shine);
              });
          })(thisImg, layers, totalLayerElems, shineHTML);
      }
  }

  function processMovement(e, touchEnabled, elem, layers, totalLayers, shine) {
      var bdst = bd.scrollTop || htm.scrollTop,
          bdsl = bd.scrollLeft,
          pageX = (touchEnabled) ? e.touches[0].pageX : e.pageX,
          pageY = (touchEnabled) ? e.touches[0].pageY : e.pageY,
          offsets = elem.getBoundingClientRect(),
          w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth,
          h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight,
          wMultiple = 320 / w,
          offsetX = 0.52 - (pageX - offsets.left - bdsl) / w,
          offsetY = 0.52 - (pageY - offsets.top - bdst) / h,
          dy = (pageY - offsets.top - bdst) - h / 2,
          dx = (pageX - offsets.left - bdsl) - w / 2,
          yRotate = (offsetX - dx) * (0.03 * wMultiple),  // Reducido el factor de rotación en Y
          xRotate = (dy - offsetY) * (0.05 * wMultiple),  // Reducido el factor de rotación en X
          imgCSS = 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)',
          arad = Math.atan2(dy, dx),
          angle = arad * 180 / Math.PI - 90;

      if (angle < 0) {
          angle = angle + 360;
      }

      // Limitar la rotación para que sea más suave
      xRotate = Math.max(Math.min(xRotate, 10), -10); // Limita la rotación en X a 10 grados
      yRotate = Math.max(Math.min(yRotate, 10), -10); // Limita la rotación en Y a 10 grados
      imgCSS = 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)';

      if (elem.firstChild.className.indexOf(' over') != -1) {
          imgCSS += ' scale3d(1.15,1.15,1.15)';  // Reducir el valor de escala
      }
      elem.firstChild.style.transform = imgCSS;

      shine.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (pageY - offsets.top - bdst) / h * 0.4 + ') 0%,rgba(255,255,255,0) 80%)';
      shine.style.transform = 'translateX(' + (offsetX * totalLayers) - 0.1 + 'px) translateY(' + (offsetY * totalLayers) - 0.1 + 'px)';

      var revNum = totalLayers;
      for (var ly = 0; ly < totalLayers; ly++) {
          layers[ly].style.transform = 'translateX(' + (offsetX * revNum) * ((ly * 1.5) / wMultiple) + 'px) translateY(' + (offsetY * totalLayers) * ((ly * 1.5) / wMultiple) + 'px)';
          revNum--;
      }
  }

  function processEnter(e, elem) {
      elem.firstChild.className += ' over';
  }

  function processExit(e, elem, layers, totalLayers, shine) {
      var container = elem.firstChild;
      container.className = container.className.replace(' over', '');
      container.style.transform = '';
      shine.style.cssText = '';

      for (var ly = 0; ly < totalLayers; ly++) {
          layers[ly].style.transform = '';
      }
  }
}

atvImg();

$(document).ready(function() {
  // Número de tarjetas por página
  var itemsPerPage = 3; // Cambia este valor según tus necesidades

  // Selecciona todos los elementos de tarjeta
  var items = $('.custom-skill-item');
  var numItems = items.length;

  // Oculta todas las tarjetas inicialmente
  items.hide();

  // Inicializa la paginación sin los botones "Anterior" y "Siguiente"
  $('#pagination-container').pagination({
    items: numItems,
    itemsOnPage: itemsPerPage,
    cssStyle: '',
    // Removemos el texto de "Anterior" y "Siguiente" estableciendo las cadenas vacías
    prevText: '',
    nextText: '',
    // Opciones para ocultar los botones "Anterior" y "Siguiente"
    useAnchors: false,
    displayedPages: 2, // Número de páginas a mostrar (en tu caso, 2)
    edges: 0, // Número de páginas de borde (al principio y al final)
    onPageClick: function(pageNumber) {
      // Calcula los índices inicial y final de las tarjetas a mostrar
      var showFrom = (pageNumber - 1) * itemsPerPage;
      var showTo = showFrom + itemsPerPage;

      // Oculta todas las tarjetas y muestra solo las correspondientes a la página actual
      items.hide().slice(showFrom, showTo).show();
    }
  });

  // Muestra las primeras tarjetas al cargar la página
  items.slice(0, itemsPerPage).show();
});
