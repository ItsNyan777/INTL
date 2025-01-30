// Minimizar header al desplazar
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('minimizado');
    } else {
        header.classList.remove('minimizado');
    }
});

// Navegación a secciones (ejemplo)
document.getElementById('explorarBtn').addEventListener('click', () => {
    document.getElementById('juegos').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('reportarBtn').addEventListener('click', () => {
    alert('Reportar Bugs: En construcción...');
});

document.getElementById('inicioBtn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
