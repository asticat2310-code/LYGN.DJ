/* Video portfolio grid + lightbox player.
   Files live in /portfolio as clip-N.mp4 with a matching clip-N.jpg poster.
   Generate them from the phone clips with convert.bat (see /portfolio/README.txt). */
(function () {
  // Display order (edit to reorder the grid): shows clip 2, 7, 1, 6, 5, 4, 3
  var CLIPS = [
    { src: "portfolio/clip-2.mp4", poster: "portfolio/clip-2.jpg" },
    { src: "portfolio/clip-7.mp4", poster: "portfolio/clip-7.jpg" },
    { src: "portfolio/clip-1.mp4", poster: "portfolio/clip-1.jpg" },
    { src: "portfolio/clip-6.mp4", poster: "portfolio/clip-6.jpg" },
    { src: "portfolio/clip-5.mp4", poster: "portfolio/clip-5.jpg" },
    { src: "portfolio/clip-4.mp4", poster: "portfolio/clip-4.jpg" },
    { src: "portfolio/clip-3.mp4", poster: "portfolio/clip-3.jpg" },
  ];

  function render() {
    var grid = document.getElementById("videoGrid");
    if (!grid) return;
    grid.innerHTML = CLIPS.map(function (c, i) {
      var n = i + 1;
      return (
        '<div class="vcard" data-src="' + c.src + '" role="button" tabindex="0" aria-label="Play set ' + n + '">' +
        '<img src="' + c.poster + '" alt="Set ' + n + '" loading="lazy" onerror="this.style.opacity=0" />' +
        '<div class="vcard__play"><span></span></div>' +
        '<div class="vcard__label">Set ' + (n < 10 ? "0" + n : n) + "</div>" +
        "</div>"
      );
    }).join("");
  }

  function wire() {
    var lb = document.getElementById("lightbox");
    var stage = document.getElementById("lightboxStage");
    var video = document.getElementById("lightboxVideo");
    var close = document.getElementById("lightboxClose");
    var grid = document.getElementById("videoGrid");
    if (!lb || !stage || !video || !close || !grid) return;

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

    grid.addEventListener("click", function (e) {
      var card = e.target.closest(".vcard");
      if (card) open(card.getAttribute("data-src"));
    });
    grid.addEventListener("keydown", function (e) {
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
    render();
    wire();
  });
})();
