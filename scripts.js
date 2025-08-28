// 視差滾動
window.addEventListener('scroll', () => {
  document.querySelectorAll('.parallax').forEach(el => {
    const speed = parseFloat(el.dataset.speed) || 0.5;
    const offset = window.scrollY * speed;
    el.style.backgroundPosition = `center ${-offset}px`;
  });
});

// 動畫進場
const fadeIns = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

fadeIns.forEach(el => observer.observe(el));

// 平滑滾動，僅攔截 href 以 # 開頭的錨點
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');

    // 只攔截頁內錨點（#contact 等）
    if (href.startsWith('#')) {
      e.preventDefault(); // 阻止預設跳轉
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60, // 預留導覽列高度
          behavior: 'smooth'
        });
      }
    }
    // 其他 href（如 works.html）不攔截，正常跳轉
  });
});


// 回到最上面按鈕
const backToTop = document.createElement('button');
backToTop.id = 'backToTop';
backToTop.textContent = '↑';
document.body.appendChild(backToTop);

Object.assign(backToTop.style, {
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  backgroundColor: '#333',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  fontSize: '20px',
  cursor: 'pointer',
  display: 'none',
  zIndex: '999'
});

window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Lightbox 點圖放大
document.querySelectorAll('.work-item img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0, 0, 0, 0.8); display: flex;
      justify-content: center; align-items: center; z-index: 1000;
    `;
    const fullImg = document.createElement('img');
    fullImg.src = img.src;
    fullImg.style.cssText = 'max-width: 80%; max-height: 80%; border-radius: 10px; box-shadow: 0 0 20px #fff;';
    overlay.appendChild(fullImg);
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  });
});

