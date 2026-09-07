/* Video portfolio: renders the fixed 3-video mobile home block (index.html),
   the full gallery grid on the dedicated portfolio page (portfolio.html), and
   wires the shared lightbox player used by both.
   Files live in /portfolio as <name>.mp4 with a matching <name>.jpg poster.
   Generate them from the phone clips with convert.bat (see /portfolio/README.txt). */
(function () {
  // The 3 videos featured on the mobile home page: center is the main/hero
  // clip, left/right are the two clips the client added named "2" and "1".
  var HOME_CENTER = { src: "portfolio/clip-1.mp4", poster: "portfolio/clip-1.jpg", label: "Set 1" };
  var HOME_LEFT = { src: "portfolio/new-2.mp4", poster: "portfolio/new-2.jpg", label: "Set 2" };
  var HOME_RIGHT = { src: "portfolio/new-1.mp4", poster: "portfolio/new-1.jpg", label: "Set 3" };

  // Everything else lives on the dedicated portfolio page.
  var GALLERY_CLIPS = [
    { src: "portfolio/clip-2.mp4", poster: "portfolio/clip-2.jpg", label: "Set 4" },
    { src: "portfolio/clip-3.mp4", poster: "portfolio/clip-3.jpg", label: "Set 5" },
    { src: "portfolio/clip-4.mp4", poster: "portfolio/clip-4.jpg", label: "Set 6" },
    { src: "portfolio/clip-5.mp4", poster: "portfolio/clip-5.jpg", label: "Set 7" },
    { src: "portfolio/clip-6.mp4", poster: "portfolio/clip-6.jpg", label: "Set 8" },
    { src: "portfolio/clip-7.mp4", poster: "portfolio/clip-7.jpg", label: "Set 9" },
    { src: "portfolio/clip-8.mp4", poster: "portfolio/clip-8.jpg", label: "Set 10" },
    { src: "portfolio/clip-9.mp4", poster: "portfolio/clip-9.jpg", label: "Set 11" },
    { src: "portfolio/clip-10.mp4", poster: "portfolio/clip-10.jpg", label: "Set 12" },
    { src: "portfolio/clip-11.mp4", poster: "portfolio/clip-11.jpg", label: "Set 13" },
    { src: "portfolio/clip-12.mp4", poster: "portfolio/clip-12.jpg", label: "Set 14" },
    { src: "portfolio/clip-13.mp4", poster: "portfolio/clip-13.jpg", label: "Set 15" },
  ];

  var PHOTOS = [
    { src: "photo_2026-09-07_01-52-43.jpg", alt: "DJ LYGN" },
    { src: "photo_2026-09-07_01-56-55.jpg", alt: "DJ LYGN performing" },
    { src: "photo_2026-09-07_01-57-09.jpg", alt: "DJ LYGN behind the decks" },
  ];

  function videoCardHTML(c, extraClass) {
    return (
      '<div class="vcard' + (extraClass ? " " + extraClass : "") + '" data-src="' + c.src + '" role="button" tabindex="0" aria-label="Play ' + c.label + '">' +
      '<img src="' + c.poster + '" alt="' + c.label + '" loading="lazy" onerror="this.style.opacity=0" />' +
      '<div class="vcard__play"><span></span></div>' +
      '<div class="vcard__label">' + c.label + "</div>" +
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

  // Fixed 3-video row on the mobile home page: left / big-center / right, no swipe.
  function renderHomeVideos() {
    var host = document.getElementById("homeVideos");
    if (!host) return;
    host.innerHTML =
      videoCardHTML(HOME_LEFT) +
      videoCardHTML(HOME_CENTER, "vcard--center") +
      videoCardHTML(HOME_RIGHT);
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
    // (#videoGrid) and the home-page fixed 3-video row (#homeVideos). Photo
    // cards are plain links (no data-src) so they're left to their default
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
    renderHomeVideos(); // index.html mobile home teaser
    renderGallery(); // portfolio.html: everything else + photos
    wire();
  });
})();
