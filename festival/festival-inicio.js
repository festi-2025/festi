document.addEventListener('DOMContentLoaded', function () {
    // ELEMENTOS GENERALES
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

    // ========================
    // CUENTA REGRESIVA FESTI
    // ========================
    const festiDate = new Date('2025-10-31T00:00:00-03:00').getTime();

    function formatTimeUnit(unit) {
        return unit.toString().padStart(2, '0');
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = festiDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            if (daysSpan) daysSpan.textContent = '¡Festi!';
            if (hoursSpan) hoursSpan.textContent = '¡Ya!';
            if (minutesSpan) minutesSpan.textContent = 'Está';
            if (secondsSpan) secondsSpan.textContent = 'Aquí!';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysSpan) daysSpan.textContent = days;
        if (hoursSpan) hoursSpan.textContent = formatTimeUnit(hours);
        if (minutesSpan) minutesSpan.textContent = formatTimeUnit(minutes);
        if (secondsSpan) secondsSpan.textContent = formatTimeUnit(seconds);
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // ========================
    // TOGGLE DEL CONTADOR FLOTANTE
    // ========================
    if (floatingCountdown && toggleButton) {
        floatingCountdown.classList.add('collapsed');
        toggleButton.textContent = '❯';

        toggleButton.addEventListener('click', () => {
            floatingCountdown.classList.toggle('collapsed');
            toggleButton.textContent = floatingCountdown.classList.contains('collapsed') ? '❯' : '❮';
        });
    }

    // ========================
    // MODAL DE PREGUNTAS FRECUENTES
    // ========================
    if (faqOvalButton && faqModal && closeModalButton) {
        faqOvalButton.addEventListener('click', () => {
            faqModal.style.display = 'block';
        });

        closeModalButton.addEventListener('click', () => {
            faqModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === faqModal) {
                faqModal.style.display = 'none';
            }
        });
    }
    // Cerrar el menú lateral al hacer clic en un enlace
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebarMenu.classList.remove('open');
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});


 // ========================
    // MENÚ LATERAL (SIDEBAR)
    // ========================
    if (hamburger && sidebarMenu && closeSidebarButton) {
        hamburger.addEventListener('click', () => {
            sidebarMenu.classList.add('open');
        });

        closeSidebarButton.addEventListener('click', () => {
            sidebarMenu.classList.remove('open');
        });

        sidebarLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                sidebarMenu.classList.remove('open');
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    event.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
});
