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
