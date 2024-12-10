document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    for (const link of links) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Modal popup for recommendation letters
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    document.body.appendChild(modal);

    const modalContent = document.createElement('img');
    modalContent.style.maxWidth = '90%';
    modalContent.style.maxHeight = '90%';
    modal.appendChild(modalContent);

    const recommendationLinks = document.querySelectorAll('li a[href*="lettre_de_recommandation"], li a[href*="cover_letter"], li a[href*="Lettres%20de%20recommandation"]');
    for (const link of recommendationLinks) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            modalContent.src = this.href;
            modal.style.display = 'flex';
        });
    }

    modal.addEventListener('click', function () {
        modal.style.display = 'none';
    });
});