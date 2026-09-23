(function () {
  var cfg = window.TOGA_CONFIG || {};

  var isConfigured = function (v) {
    return !!v && v.indexOf('XXXX') === -1 && v.indexOf('要設定') === -1;
  };

  // モバイルナビの開閉
  var navToggle = document.querySelector('.js-nav-toggle');
  var nav = document.querySelector('.js-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 注文CTAボタンにStripe決済リンクを反映。未設定の場合は「準備中」表示にして誤クリックを防ぐ。
  var ctaButtons = document.querySelectorAll('[data-cta]');
  ctaButtons.forEach(function (btn) {
    var size = btn.getAttribute('data-cta'); // 'square' | 'rect'
    var link = size === 'square' ? cfg.STRIPE_LINK_SQUARE : cfg.STRIPE_LINK_RECT;

    if (isConfigured(link)) {
      btn.setAttribute('href', link);
      btn.addEventListener('click', function () {
        if (window.gtag) {
          window.gtag('event', 'begin_checkout', {
            currency: 'JPY',
            value: size === 'square' ? cfg.PRICE.SQUARE_TAX_INCLUDED : cfg.PRICE.RECT_TAX_INCLUDED,
            items: [{ item_name: size === 'square' ? '陶雅_正方形' : '陶雅_長方形' }],
          });
        }
      });
    } else {
      btn.classList.add('cta--pending');
      btn.setAttribute('href', '#');
      btn.setAttribute('aria-disabled', 'true');
      var badge = document.createElement('span');
      badge.className = 'cta__badge';
      badge.textContent = '準備中';
      btn.appendChild(badge);
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        alert('現在ご注文の準備中です。もう少々お待ちください。');
      });
    }
  });

  var yearEl = document.querySelector('.js-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// 作品画像の拡大表示（ライトボックス）
(function () {
  var items = [].slice.call(document.querySelectorAll('.gallery__item'));
  if (!items.length) return;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', '作品画像の拡大表示');
  box.innerHTML =
    '<button type="button" class="lightbox__close" aria-label="閉じる">×</button>' +
    '<button type="button" class="lightbox__nav lightbox__prev" aria-label="前の画像">‹</button>' +
    '<figure class="lightbox__figure"><img class="lightbox__img" alt=""></figure>' +
    '<button type="button" class="lightbox__nav lightbox__next" aria-label="次の画像">›</button>' +
    '<p class="lightbox__count"></p>';
  document.body.appendChild(box);

  var img = box.querySelector('.lightbox__img');
  var count = box.querySelector('.lightbox__count');
  var closeBtn = box.querySelector('.lightbox__close');
  var current = 0;
  var lastFocus = null;

  function show(i) {
    current = (i + items.length) % items.length;
    var item = items[current];
    var thumb = item.querySelector('img');
    img.src = item.getAttribute('data-full') || thumb.src;
    img.alt = thumb.alt;
    count.textContent = (current + 1) + ' / ' + items.length;
  }
  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    box.hidden = false;
    document.body.classList.add('is-lightbox-open');
    closeBtn.focus();
  }
  function close() {
    box.hidden = true;
    document.body.classList.remove('is-lightbox-open');
    img.removeAttribute('src');
    if (lastFocus) lastFocus.focus();
  }

  items.forEach(function (item, i) {
    item.addEventListener('click', function () { open(i); });
  });
  closeBtn.addEventListener('click', close);
  box.querySelector('.lightbox__prev').addEventListener('click', function () { show(current - 1); });
  box.querySelector('.lightbox__next').addEventListener('click', function () { show(current + 1); });
  box.addEventListener('click', function (e) {
    if (e.target === box || e.target.classList.contains('lightbox__figure')) close();
  });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
  });

  // スマホ: 左右スワイプで前後の画像へ（ピンチ拡大中は動かさない）
  var startX = null;
  var startY = null;
  box.addEventListener('touchstart', function (e) {
    if (e.touches.length === 1) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    } else {
      startX = null;
    }
  }, { passive: true });
  box.addEventListener('touchend', function (e) {
    if (startX === null) return;
    if (window.visualViewport && window.visualViewport.scale > 1.05) { startX = null; return; }
    var dx = e.changedTouches[0].clientX - startX;
    var dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  }, { passive: true });
})();
