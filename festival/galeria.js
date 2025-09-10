document.addEventListener('DOMContentLoaded', function() {
    // --- Elementos del DOM ---
    const floatingCountdown = document.getElementById('floating-countdown');
    const toggleButton = document.getElementById('toggle-countdown');
    const faqOvalButton = document.getElementById('open-faq-modal');
    const faqModal = document.getElementById('faq-modal');
    const closeModalButton = faqModal ? faqModal.querySelector('.close-button') : null;
    const hamburger = document.getElementById('hamburger');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const closeSidebarButton = document.getElementById('close-sidebar');
    const sidebarLinks = sidebarMenu ? sidebarMenu.querySelectorAll('a') : [];
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
    const galleryTabs = document.querySelectorAll('.gallery-tabs button');
    const galleryYears = document.querySelectorAll('.gallery-year');
    const browserAddressBar = document.querySelector('.browser-address-bar');
    const navBackwardButton = document.querySelector('.browser-buttons button:first-child'); // Asumiendo que el botón "atrás" es el primero
    const navForwardButton = document.querySelector('.browser-buttons button:last-child');  // Asumiendo que el botón "adelante" es el último

    const añosGaleria = ['2024', '2025'];
    let indiceActual = 0;



    // --- Modal de Preguntas Frecuentes ---
    if (faqOvalButton && faqModal && closeModalButton) {
        faqOvalButton.addEventListener('click', () => {
            faqModal.style.display = 'block';
        });

        closeModalButton.addEventListener('click', () => {
            faqModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target == faqModal) {
                faqModal.style.display = 'none';
            }
        });
    }

    // --- Menú Lateral ---
    if (hamburger && sidebarMenu) {
        hamburger.addEventListener('click', () => {
            sidebarMenu.classList.add('open');
        });
    }

    if (closeSidebarButton && sidebarMenu) {
        closeSidebarButton.addEventListener('click', () => {
            sidebarMenu.classList.remove('open');
        });
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebarMenu) {
                sidebarMenu.classList.remove('open');
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // --- Galería ---
    function mostrarGaleria(año) {
        galleryYears.forEach(galeria => {
            galeria.classList.remove('active');
        });
        galleryTabs.forEach(boton => {
            boton.classList.remove('active');
            if (boton.textContent === año) {
                boton.classList.add('active');
            }
        });

        document.getElementById(`galeria-${año}`).classList.add('active');
        if (browserAddressBar) {
            browserAddressBar.value = `galeria/${año}`;
        }
    }

    function navegarGaleria(direccion) {
        if (direccion === 'atras') {
            indiceActual--;
            if (indiceActual < 0) {
                indiceActual = añosGaleria.length - 1;
            }
        } else if (direccion === 'adelante') {
            indiceActual++;
            if (indiceActual >= añosGaleria.length) {
                indiceActual = 0;
            }
        }
        mostrarGaleria(añosGaleria[indiceActual]);
    }

    if (galleryTabs.length > 0) {
        galleryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                mostrarGaleria(tab.textContent);
            });
        });

        // Inicializar la galería al cargar la página
        const activeTab = document.querySelector('.gallery-tabs button.active');
        if (activeTab) {
            mostrarGaleria(activeTab.textContent);
            indiceActual = añosGaleria.indexOf(activeTab.textContent);
        } else if (galleryTabs.length > 0) {
            mostrarGaleria(galleryTabs[0].textContent);
            indiceActual = 0;
        }
    }

    if (navBackwardButton) {
        navBackwardButton.addEventListener('click', () => navegarGaleria('atras'));
    }

    if (navForwardButton) {
        navForwardButton.addEventListener('click', () => navegarGaleria('adelante'));
    }

});

