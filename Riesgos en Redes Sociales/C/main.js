function goTo(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const yOffset = -125;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
}