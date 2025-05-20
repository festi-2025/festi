const floatingCountdown = document.getElementById('floating-countdown');
const toggleButton = document.getElementById('toggle-countdown');
const faqOvalButton = document.getElementById('open-faq-modal');
const faqModal = document.getElementById('faq-modal');
const closeModalButton = faqModal.querySelector('.close-button');
const hamburger = document.getElementById('hamburger');
const sidebarMenu = document.getElementById('sidebar-menu');
const closeSidebarButton = document.getElementById('close-sidebar');
const sidebarLinks = sidebarMenu.querySelectorAll('a');

const daysSpan = document.getElementById('days');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');

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
floatingCountdown.classList.add('collapsed');
toggleButton.textContent = '❯';

toggleButton.addEventListener('click', () => {
    floatingCountdown.classList.toggle('collapsed');
    toggleButton.textContent = floatingCountdown.classList.contains('collapsed') ? '❯' : '❮';
});

// Funcionalidad del modal de Preguntas Frecuentes
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

document.addEventListener('DOMContentLoaded', function() {
    const closeRaffleBtn = document.getElementById('close-raffle');
    const raffleNotice = document.getElementById('father-day-raffle');
    if (closeRaffleBtn && raffleNotice) {
        setTimeout(() => {
            raffleNotice.classList.add('show');
        }, 100);

        closeRaffleBtn.addEventListener('click', function() {
            raffleNotice.style.display = 'none';
        });

        const raffleDetailsLink = document.querySelector('.raffle-details-btn');
        if (raffleDetailsLink) {
            raffleDetailsLink.addEventListener('click', function(event) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    event.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }


    // Funcionalidad del menú lateral
    hamburger.addEventListener('click', () => {
        sidebarMenu.classList.add('open');
    });

    closeSidebarButton.addEventListener('click', () => {
        sidebarMenu.classList.remove('open');
    });

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
