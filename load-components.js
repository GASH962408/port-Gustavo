// load-components.js
function loadComponent(containerId, htmlUrl, cssUrl) {
  return fetch(htmlUrl)
      .then(response => response.text())
      .then(html => {
          document.getElementById(containerId).innerHTML = html;

          if (cssUrl) {
              loadCSS(cssUrl);
          }
      })
      .catch(error => {
          console.error('Error al cargar el componente:', error);
      });
}

function loadCSS(url) {
  if (!document.querySelector(`link[href="${url}"]`)) {
      const head = document.head;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      head.appendChild(link);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
      loadComponent('header-container', 'components/header.html', 'css/header.css'),
      loadComponent('home-container', 'components/home.html', 'css/home.css'),
      loadComponent('about-container', 'components/about.html', 'css/about.css'),
      loadComponent('portfolio-container', 'components/portfolio.html', 'css/portfolio.css'),
      loadComponent('contact-container', 'components/contact.html', 'css/contact.css'),
      loadComponent('footer-container', 'components/footer.html', 'css/footer.css')
  ]).then(() => {
      // Ejecutar el código que depende de los componentes cargados
      initScripts();
  });
});
