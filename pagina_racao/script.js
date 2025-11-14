function toggleMenu() {
    document.getElementById("menu").classList.toggle("show");
}

const headerHeight = 120;

// Fecha o menu e controla links
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", event => {
        const menu = document.getElementById("menu");
        menu.classList.remove("show");

        const targetId = link.getAttribute("href");

        // Se o link começar com # → scroll suave
        if (targetId.startsWith("#")) {
            event.preventDefault();

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
    });
});
