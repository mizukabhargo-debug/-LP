/**
 * GA4 / Google広告 コンバージョンタグの読み込み。
 * js/config.js の値を使うため、このファイルより先に config.js を読み込むこと。
 */
(function () {
  var cfg = window.TOGA_CONFIG || {};
  var ga4Id = cfg.GA4_MEASUREMENT_ID || '';
  var adsId = cfg.GOOGLE_ADS_CONVERSION_ID || '';

  var isConfigured = function (v) {
    return !!v && v.indexOf('XXXX') === -1;
  };

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  if (!isConfigured(ga4Id) && !isConfigured(adsId)) {
    // 計測IDが未設定の間はタグを読み込まない(コンソールエラー防止・誤計測防止)
    console.info('[陶雅LP] GA4 / Google広告のIDが未設定のため、計測タグは読み込まれていません。js/config.js を編集してください。');
    return;
  }

  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(isConfigured(ga4Id) ? ga4Id : adsId);
  document.head.appendChild(script);

  gtag('js', new Date());
  if (isConfigured(ga4Id)) gtag('config', ga4Id);
  if (isConfigured(adsId)) gtag('config', adsId);
})();
