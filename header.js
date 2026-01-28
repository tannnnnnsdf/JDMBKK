/* =====================================================
   HEADER + NAVIGATION (รองรับ include)
===================================================== */
document.addEventListener('includesLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const dropdownItems = document.querySelectorAll('.has-dropdown');

  if (!menuToggle || !navMenu || !mobileOverlay) return;

  /* ---------- Utility ---------- */
  function closeMenu() {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
    dropdownItems.forEach(i => i.classList.remove('active'));
  }

  /* ---------- Mobile menu toggle ---------- */
  menuToggle.addEventListener('click', e => {
    e.stopPropagation();
    const open = navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active', open);
    mobileOverlay.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) dropdownItems.forEach(i => i.classList.remove('active'));
  });

  /* ---------- Overlay ---------- */
  mobileOverlay.addEventListener('click', closeMenu);

  /* ---------- Mobile dropdown (accordion) ---------- */
  dropdownItems.forEach(item => {
    const trigger = item.querySelector(':scope > a');
    if (!trigger) return;

    trigger.addEventListener('click', e => {
      if (window.innerWidth > 768) return;

      e.preventDefault();
      const isOpen = item.classList.contains('active');

      dropdownItems.forEach(i => i.classList.remove('active'));
      if (!isOpen) item.classList.add('active');
    });
  });

  /* ---------- Active state by URL ---------- */
  const currentPath = normalizePath(location.pathname);

  document.querySelectorAll('.nav-menu a').forEach(link => {
    const linkPath = normalizePath(link.getAttribute('href'));

    link.classList.remove('active');

    const parentDropdown = link.closest('.has-dropdown');
    if (parentDropdown) parentDropdown.classList.remove('active');

    if (
      linkPath === currentPath ||
      (linkPath !== '/' && currentPath.startsWith(linkPath + '/'))
    ) {
      link.classList.add('active');

      if (parentDropdown) {
        parentDropdown.classList.add('active');
        const parentLink =
          parentDropdown.querySelector(':scope > a');
        parentLink?.classList.add('active');
      }
    }
  });

  function normalizePath(path) {
    if (!path) return '/';
    return decodeURIComponent(path)
      .replace(/\/index\.html$/, '')
      .replace(/\/$/, '') || '/';
  }
});

/* =====================================================
   COOKIE CONSENT (ครั้งเดียวจบ)
===================================================== */
document.addEventListener('includesLoaded', () => {
  const consent = document.getElementById('cookieConsent');
  const acceptBtn = document.getElementById('acceptCookies');

  if (!consent || !acceptBtn) return;

  if (localStorage.getItem('cookiesAccepted') === 'yes') {
    consent.remove();
    return;
  }

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'yes');
    consent.remove();
  });
});