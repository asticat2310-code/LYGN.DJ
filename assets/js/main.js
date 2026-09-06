/* Shared UI logic: i18n toggle, dynamic contact/style rendering, marquee. */
(function () {
  var LANGS = ["en", "vi"];
  var stored;
  try {
    stored = localStorage.getItem("lygn-lang");
  } catch (e) {
    stored = null;
  }
  var lang = LANGS.indexOf(stored) !== -1 ? stored : "en";

  function t(key) {
    var dict = window.I18N[lang] || window.I18N.en;
    return dict[key] != null ? dict[key] : (window.I18N.en[key] || key);
  }

  function applyI18n() {
    document.documentElement.lang = lang;
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = t(nodes[i].getAttribute("data-i18n"));
    }
    // language toggle active state
    var toggle = document.getElementById("langToggle");
    if (toggle) {
      var spans = toggle.querySelectorAll("[data-lang]");
      for (var j = 0; j < spans.length; j++) {
        spans[j].classList.toggle("is-active", spans[j].getAttribute("data-lang") === lang);
      }
    }
  }

  function setLang(next) {
    lang = next;
    try {
      localStorage.setItem("lygn-lang", lang);
    } catch (e) {}
    applyI18n();
  }

  function renderSocials() {
    var host = document.getElementById("heroSocials");
    if (!host) return;
    var html = "";
    var order = ["instagram", "telegram", "zalo", "facebook", "whatsapp"];
    order.forEach(function (key) {
      var c = window.SITE.contacts.filter(function (x) {
        return x.key === key;
      })[0];
      if (!c) return;
      html +=
        '<a href="' +
        c.url +
        '" target="_blank" rel="noreferrer" aria-label="' +
        c.label +
        '">' +
        window.ICONS[c.icon] +
        "</a>";
    });
    host.innerHTML = html;
  }

  function renderStyles() {
    var host = document.getElementById("stylesList");
    if (!host) return;
    host.innerHTML = window.SITE.styles
      .map(function (s) {
        return '<span class="chip">' + s + "</span>";
      })
      .join("");
  }

  function renderChannels() {
    var host = document.getElementById("contactChannels");
    if (!host) return;
    host.innerHTML = window.SITE.contacts
      .map(function (c) {
        var handle = c.handleKey ? t(c.handleKey) : c.handle;
        return (
          '<a class="channel" href="' +
          c.url +
          '" target="_blank" rel="noreferrer">' +
          window.ICONS[c.icon] +
          '<span class="channel__text"><span class="channel__label">' +
          c.label +
          '</span><span class="channel__handle">' +
          handle +
          "</span></span>" +
          '<span class="channel__arrow">↗</span>' +
          "</a>"
        );
      })
      .join("");
  }

  function renderMarquee() {
    var host = document.getElementById("marqueeTrack");
    if (!host) return;
    var items = window.SITE.styles.concat(window.SITE.styles); // duplicate for seamless loop
    host.innerHTML = items
      .map(function (s) {
        return "<span>" + s + " &nbsp;/</span>";
      })
      .join("");
  }

  function setYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderSocials();
    renderStyles();
    renderChannels();
    renderMarquee();
    setYear();
    applyI18n(); // after channels render so handleKey text fills in

    var toggle = document.getElementById("langToggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var next = lang === "en" ? "vi" : "en";
        setLang(next);
        renderChannels(); // re-render for handleKey translations
        applyI18n();
      });
    }
  });
})();
