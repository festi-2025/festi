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
    const raffleModal = document.getElementById('miModal'); // Modal de la rifa (asumo que tienes este ID en tu HTML)

    // --- Funciones del Modal de la Rifa ---
    function mostrarDetalles(nombreSorteo) {
        const modalTitulo = document.getElementById('modalTitulo');
        const modalDetalles = document.getElementById('modalDetalles');
        if (modalTitulo && modalDetalles && raffleModal) {
            modalTitulo.textContent = nombreSorteo;
            let detalles = "";
            switch (nombreSorteo) {
                case 'Rifa Día del Padre':
                    detalles = "<p>Valor: $1500</p> <p>El sorteo se realizará el día viernes 13/6. Nos comunicaremos con los ganadores por correo electrónico.</p><p>Premios:</p><ul><li>Set Matero</li><li>Kit de Desayuno</li><li>Auriculares Bluetooth</li></ul>";
                    break;
                default:
                    detalles = "<p>Próximamente más detalles.</p>";
            }
            modalDetalles.innerHTML = detalles;
            raffleModal.style.display = "block"; // Mostrar el modal de la rifa
        }
    }

    function cerrarModal() {
        if (raffleModal) {
            raffleModal.style.display = "none";
        }
    }

    window.onclick = function (event) {
        if (raffleModal && event.target == raffleModal) {
            raffleModal.style.display = "none";
        }
        if (faqModal && event.target == faqModal) {
            faqModal.style.display = "none";
        }
    };

    // --- Funciones de Estilo (Volteo y Desenfoque) ---
    function blurOtherItems(item) {
        const sorteos = document.querySelectorAll('.sorteo-item');
        sorteos.forEach(sorteo => {
            if (sorteo !== item) {
                sorteo.classList.add('blurred');
            }
        });
    }

    function clearBlur() {
        const sorteos = document.querySelectorAll('.sorteo-item');
        sorteos.forEach(sorteo => sorteo.classList.remove('blurred'));
    }

    // --- Contador Flotante ---
    if (daysSpan && hoursSpan && minutesSpan && secondsSpan) {
        // Establecemos la fecha objetivo para el 8 de noviembre de 2025
        const festiDate = new Date('2025-11-08T00:00:00-03:00').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = festiDate - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
                daysSpan.textContent = '¡Festi!';
                hoursSpan.textContent = '¡Ya!';
                minutesSpan.textContent = 'Está';
                secondsSpan.textContent = 'Aquí!';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysSpan.textContent = days;
            hoursSpan.textContent = hours.toString().padStart(2, '0');
            minutesSpan.textContent = minutes.toString().padStart(2, '0');
            secondsSpan.textContent = seconds.toString().padStart(2, '0');
        }

        // Iniciar el contador
        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);

        // Funcionalidad del botón de toggle del contador
        if (floatingCountdown && toggleButton) {
            floatingCountdown.classList.add('collapsed');
            toggleButton.textContent = '❯';

            toggleButton.addEventListener('click', () => {
                floatingCountdown.classList.toggle('collapsed');
                toggleButton.textContent = floatingCountdown.classList.contains('collapsed') ? '❯' : '❮';
            });
        }
    }

    // --- Modal de Preguntas Frecuentes ---
    if (faqOvalButton && faqModal && closeModalButton) {
        faqOvalButton.addEventListener('click', () => {
            faqModal.style.display = 'block';
        });

        closeModalButton.addEventListener('click', () => {
            faqModal.style.display = 'none';
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
});