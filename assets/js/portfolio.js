/* Video portfolio: renders the clip grid (portfolio.html) and the infinite
   coverflow carousel on the mobile home page (index.html), plus the shared
   lightbox player.
   Files live in /portfolio as clip-N.mp4 with a matching clip-N.jpg poster.
   Generate them from the phone clips with convert.bat (see /portfolio/README.txt). */
(function () {
  // Display order (edit to reorder): shows clip 2, 7, 1, 6, 5, 4, 3
  var CLIPS = [
    { src: "portfolio/clip-2.mp4", poster: "portfolio/clip-2.jpg" },
    { src: "portfolio/clip-7.mp4", poster: "portfolio/clip-7.jpg" },
    { src: "portfolio/clip-1.mp4", poster: "portfolio/clip-1.jpg" },
    { src: "portfolio/clip-6.mp4", poster: "portfolio/clip-6.jpg" },
    { src: "portfolio/clip-5.mp4", poster: "portfolio/clip-5.jpg" },
    { src: "portfolio/clip-4.mp4", poster: "portfolio/clip-4.jpg" },
    { src: "portfolio/clip-3.mp4", poster: "portfolio/clip-3.jpg" },
  ];

  function cardHTML(c, i) {
    var n = i + 1;
    return (
      '<div class="vcard" data-index="' + i + '" data-src="' + c.src + '" role="button" tabindex="0" aria-label="Play set ' + n + '">' +
      '<img src="' + c.poster + '" alt="Set ' + n + '" loading="lazy" onerror="this.style.opacity=0" />' +
      '<div class="vcard__play"><span></span></div>' +
      '<div class="vcard__label">Set ' + (n < 10 ? "0" + n : n) + "</div>" +
      "</div>"
    );
  }

  function renderGrid() {
    var grid = document.getElementById("videoGrid");
    if (!grid) return;
    grid.innerHTML = CLIPS.map(cardHTML).join("");
  }

  // Infinite coverflow carousel: bigger active card centered, smaller
  // neighbors peeking on each side, circular in both swipe directions.
  function initHomeCarousel() {
    var root = document.getElementById("homeCarousel");
    if (!root) return;
    root.innerHTML = '<div class="folio__track" id="homeCarouselTrack"></div>';
    var track = document.getElementById("homeCarouselTrack");
    track.innerHTML = CLIPS.map(cardHTML).join("");
    var cards = Array.prototype.slice.call(track.children);
    var len = cards.length;
    var current = 0;

    function place() {
      cards.forEach(function (el, i) {
        var diff = i - current;
        diff = ((diff % len) + len) % len;
        if (diff > len / 2) diff -= len;
        var abs = Math.abs(diff);
        var scale, opacity, z;
        if (abs === 0) {
          scale = 1.18;
          opacity = 1;
          z = 5;
        } else if (abs === 1) {
          scale = 0.82;
          opacity = 1;
          z = 4;
        } else if (abs === 2) {
          scale = 0.68;
          opacity = 0.45;
          z = 3;
        } else {
          scale = 0.55;
          opacity = 0;
          z = 1;
        }
        el.style.transform = "translate(-50%, -50%) translateX(" + diff * 38 + "vw) scale(" + scale + ")";
        el.style.opacity = opacity;
        el.style.zIndex = z;
        el.classList.toggle("is-active", abs === 0);
        el.style.pointerEvents = abs > 2 ? "none" : "auto";
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

    // Tapping a side card brings it to the center instead of opening it;
    // tapping the active (center) card falls through to the shared
    // lightbox handler in wire() below.
    track.addEventListener("click", function (e) {
      var card = e.target.closest(".vcard");
      if (!card || card.classList.contains("is-active")) return;
      e.stopPropagation();
      goto(Number(card.getAttribute("data-index")));
    });

    // Drag / swipe — works with touch and mouse, loops forever either way.
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
    // (#videoGrid) and the active card of the home-page carousel (#homeCarousel) —
    // clicks on a non-active carousel card are stopped in initHomeCarousel().
    document.addEventListener("click", function (e) {
      var card = e.target.closest(".vcard");
      if (card) open(card.getAttribute("data-src"));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        var card = e.target.closest(".vcard");
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
    renderGrid(); // portfolio.html grid
    initHomeCarousel(); // index.html mobile carousel
    wire();
  });
})();
