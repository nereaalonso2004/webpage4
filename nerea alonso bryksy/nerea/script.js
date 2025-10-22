const toggle = document.querySelector('.nav__toggle');
const linksList = document.getElementById('menu-links');

function setOpen(open) {
  linksList.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
}

toggle.addEventListener('click', () => {
  const open = !linksList.classList.contains('is-open');
  setOpen(open);
});

linksList.addEventListener('click', (e) => {
  const a = e.target.closest('a[data-target]');
  if (!a) return;

  setOpen(false);

  const sel = a.getAttribute('data-target');
  const target = document.querySelector(sel);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

const sectionIds = ['#wildyriftian', '#tracingart', '#ningh', '#vitality'];
const anchors = sectionIds.map((id) => ({
  id,
  el: document.querySelector(`a[data-target="${id}"]`)
}));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const hash = `#${entry.target.id}`;
      const match = anchors.find((a) => a.id === hash);
      if (match && match.el) {
        if (entry.isIntersecting) {
          anchors.forEach((a) => a.el?.classList.remove('active'));
          match.el.classList.add('active');
        }
      }
    });
  },
  {
    rootMargin: `-${getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-height')
      .trim()} 0px -70% 0px`,
    threshold: 0.1
  }
);

sectionIds.forEach((id) => {
  const sec = document.querySelector(id);
  if (sec) observer.observe(sec);
});