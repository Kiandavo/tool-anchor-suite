
export const initScrollAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.scroll-fade-in, .scroll-scale-in').forEach((el) => {
    observer.observe(el);
  });

  return () => observer.disconnect();
};
