document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los enlaces de navegación que apuntan a un ancla (#) o a una página específica
    const navLinks = document.querySelectorAll('nav a[href^="#"], nav a[href$=".html#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Si el enlace apunta a otra página HTML con un ancla
            if (href.includes('.html#')) {
                const parts = href.split('#');
                const page = parts[0];
                const anchor = parts[1];

                // Redirige a la página principal y luego se desplaza al ancla
                if (window.location.pathname.endsWith(page)) {
                    // Si ya estamos en la página correcta, solo hacemos scroll
                    const targetElement = document.getElementById(anchor);
                    if (targetElement) {
                        e.preventDefault(); // Previene el salto instantáneo
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                } else {
                    // Si no estamos en la página correcta, redirigimos y el scroll se hará al cargar
                    // No prevenimos el default aquí, dejamos que el navegador haga la redirección
                }
            } 
            // Si el enlace es solo un ancla dentro de la misma página
            else if (href.startsWith('#')) {
                e.preventDefault(); // Previene el comportamiento por defecto del salto instantáneo
                const targetId = href.substring(1); // Remueve el '#'
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});