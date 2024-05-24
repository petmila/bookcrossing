window.addEventListener(
  'load',
  (function () {
    const pageEnd = performance.mark('pageEnd');
    const loadTime = pageEnd.startTime;
    const serverTime =
      document.getElementsByClassName('footer__load_time')[0].textContent;
    var div_load_time = document.getElementsByClassName('footer__load_time')[0];
    div_load_time.textContent = `Page load time is (client) ${loadTime / 1000} seconds and (server) ${serverTime / 1000} seconds`;
  })(),
);
