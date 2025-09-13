const faqOvalButton = document.getElementById('open-faq-modal');
const faqModal = document.getElementById('faq-modal');
const closeModalButton = faqModal.querySelector('.close-button');
const hamburger = document.getElementById('hamburger');
const sidebarMenu = document.getElementById('sidebar-menu');
const closeSidebarButton = document.getElementById('close-sidebar');
const sidebarLinks = sidebarMenu.querySelectorAll('a');

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
    // Funcionalidad del menú lateral
    hamburger.addEventListener('click', () => {
        sidebarMenu.classList.add('open');
    });

    closeSidebarButton.addEventListener('click', () => {
        sidebarMenu.classList.remove('open');
    });

    // Cerrar el menú al hacer clic en un enlace
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            sidebarMenu.classList.remove('open');
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                event.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Funcionalidad del aviso de la rifa
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
});
