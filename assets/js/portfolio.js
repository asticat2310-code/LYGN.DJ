/* Video portfolio: renders the swipeable 3-video mobile carousel on the home
   page (index.html), the full gallery grid on the dedicated portfolio page
   (portfolio.html), and wires the shared lightbox player used by both.
   Files live in /portfolio as <name>.mp4 with a matching <name>.jpg poster.
   Generate them from the phone clips with convert.bat (see /portfolio/README.txt). */
(function () {
  // The 3 videos featured on the mobile home carousel (center is the main clip).
  var HOME_LEFT = { src: "portfolio/new-2.mp4", poster: "portfolio/new-2.jpg" };
  var HOME_CENTER = { src: "portfolio/clip-2.mp4", poster: "portfolio/clip-2.jpg" };
  var HOME_RIGHT = { src: "portfolio/new-1.mp4", poster: "portfolio/new-1.jpg" };

  // Everything else lives on the dedicated portfolio page.
  var GALLERY_CLIPS = [
    { src: "portfolio/clip-1.mp4", poster: "portfolio/clip-1.jpg" },
    { src: "portfolio/clip-3.mp4", poster: "portfolio/clip-3.jpg" },
    { src: "portfolio/clip-4.mp4", poster: "portfolio/clip-4.jpg" },
    { src: "portfolio/clip-5.mp4", poster: "portfolio/clip-5.jpg" },
    { src: "portfolio/clip-6.mp4", poster: "portfolio/clip-6.jpg" },
    { src: "portfolio/clip-7.mp4", poster: "portfolio/clip-7.jpg" },
    { src: "portfolio/clip-8.mp4", poster: "portfolio/clip-8.jpg" },
    { src: "portfolio/clip-9.mp4", poster: "portfolio/clip-9.jpg" },
    { src: "portfolio/clip-10.mp4", poster: "portfolio/clip-10.jpg" },
    { src: "portfolio/clip-11.mp4", poster: "portfolio/clip-11.jpg" },
    { src: "portfolio/clip-12.mp4", poster: "portfolio/clip-12.jpg" },
    { src: "portfolio/clip-13.mp4", poster: "portfolio/clip-13.jpg" },
  ];

  var PHOTOS = [
    { src: "photo_2026-09-07_01-52-43.jpg", alt: "DJ LYGN" },
    { src: "photo_2026-09-07_01-56-55.jpg", alt: "DJ LYGN performing" },
    { src: "photo_2026-09-07_01-57-09.jpg", alt: "DJ LYGN behind the decks" },
  ];

  // No visible label on any card — just a poster and a play icon.
  function videoCardHTML(c, extraClass) {
    return (
      '<div class="vcard' + (extraClass ? " " + extraClass : "") + '" data-src="' + c.src + '" role="button" tabindex="0" aria-label="Play video">' +
      '<img src="' + c.poster + '" alt="DJ LYGN live" loading="lazy" onerror="this.style.opacity=0" />' +
      '<div class="vcard__play"><span></span></div>' +
      "</div>"
    );
  }

  function photoCardHTML(p) {
    return (
      '<a class="vcard vcard--photo" href="' + p.src + '" target="_blank" rel="noreferrer" aria-label="' + p.alt + '">' +
      '<img src="' + p.src + '" alt="' + p.alt + '" loading="lazy" />' +
      "</a>"
    );
  }

  // Swipeable 3-video carousel on the mobile home page: bigger active card
  // centered, smaller neighbors peeking on each side, loops both ways.
  function initHomeCarousel() {
    var root = document.getElementById("homeCarousel");
    if (!root) return;
    var clips = [HOME_LEFT, HOME_CENTER, HOME_RIGHT];
    root.innerHTML = '<div class="folio__track" id="homeCarouselTrack"></div>';
    var track = document.getElementById("homeCarouselTrack");
    track.innerHTML = clips.map(function (c) { return videoCardHTML(c); }).join("");
    var cards = Array.prototype.slice.call(track.children);
    var len = cards.length;
    var current = 1; // start centered on HOME_CENTER

    function place() {
      cards.forEach(function (el, i) {
        var diff = i - current;
        diff = ((diff % len) + len) % len;
        if (diff > len / 2) diff -= len;
        var abs = Math.abs(diff);
        var scale = abs === 0 ? 1.18 : 0.82;
        el.style.transform = "translate(-50%, -50%) translateX(" + diff * 38 + "vw) scale(" + scale + ")";
        el.style.zIndex = abs === 0 ? 5 : 4;
        el.classList.toggle("is-active", abs === 0);
      });
    }
    function goto(i) {
      current = ((i % len) + len) % len;
      place();
    }
    function next() {
      goto(current + 1);
    }
    function prev() {
      goto(current - 1);
    }

    place();
    window.addEventListener("resize", place);

    // Drag / swipe — works with touch and mouse, loops forever either way.
    // A tap on any of the 3 cards (centered or not) opens it directly via the
    // shared click delegation in wire() below.
    var dragging = false;
    var startX = 0;
    var dragPx = 0;
    var THRESHOLD = 40;

    function setTrackOffset(px, animate) {
      track.style.transition = animate ? "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)" : "none";
      track.style.transform = "translateX(" + px + "px)";
    }

    root.addEventListener("pointerdown", function (e) {
      dragging = true;
      startX = e.clientX;
      dragPx = 0;
      setTrackOffset(0, false);
      root.setPointerCapture(e.pointerId);
    });
    root.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      dragPx = e.clientX - startX;
      setTrackOffset(dragPx, false);
    });
    function endDrag() {
      if (!dragging) return;
      dragging = false;
      if (dragPx <= -THRESHOLD) next();
      else if (dragPx >= THRESHOLD) prev();
      setTrackOffset(0, true);
    }
    root.addEventListener("pointerup", endDrag);
    root.addEventListener("pointercancel", endDrag);
    root.addEventListener("pointerleave", function () {
      if (dragging) endDrag();
    });
  }

  // Dedicated portfolio page: every remaining video plus all photos.
  function renderGallery() {
    var grid = document.getElementById("videoGrid");
    if (!grid) return;
    grid.innerHTML = GALLERY_CLIPS.map(function (c) {
      return videoCardHTML(c);
    }).join("") + PHOTOS.map(photoCardHTML).join("");
  }

  function wire() {
    var lb = document.getElementById("lightbox");
    var stage = document.getElementById("lightboxStage");
    var video = document.getElementById("lightboxVideo");
    var close = document.getElementById("lightboxClose");
    if (!lb || !stage || !video || !close) return;

    function open(src) {
      video.src = src;
      lb.classList.add("is-open");
      stage.classList.remove("is-paused");
      document.body.style.overflow = "hidden";
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    }
    function shut() {
      lb.classList.remove("is-open");
      video.pause();
      video.removeAttribute("src");
      video.load();
      document.body.style.overflow = "";
    }
    function toggle() {
      if (video.paused) video.play();
      else video.pause();
    }

    // Delegate on the document so this works for both the portfolio-page grid
    // (#videoGrid) and any card in the home-page carousel (#homeCarousel).
    // Photo cards are plain links (no data-src) so they keep their default
    // "open image in a new tab" behaviour.
    document.addEventListener("click", function (e) {
      var card = e.target.closest(".vcard[data-src]");
      if (card) open(card.getAttribute("data-src"));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        var card = e.target.closest(".vcard[data-src]");
        if (card) {
          e.preventDefault();
          open(card.getAttribute("data-src"));
        }
      }
    });

    // No native <video controls> (its close/fullscreen chrome differs per OS and
    // isn't ours to style) — tap the video to play/pause, use our own close button.
    video.addEventListener("click", toggle);
    video.addEventListener("play", function () {
      stage.classList.remove("is-paused");
    });
    video.addEventListener("pause", function () {
      stage.classList.add("is-paused");
    });

    close.addEventListener("click", shut);
    lb.addEventListener("click", function (e) {
      if (e.target === lb) shut();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lb.classList.contains("is-open")) shut();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHomeCarousel(); // index.html mobile home carousel (3 videos)
    renderGallery(); // portfolio.html: everything else + photos
    wire();
  });
})();
