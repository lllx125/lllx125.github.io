(function () {
  var root = document.documentElement;
  root.classList.remove("no-js");

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) {
      return null;
    }
  }

  // Theme toggle: explicit choice overrides the system preference.
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      if (!current) {
        current = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      store("theme", next);
    });
  }

  // Icons
  if (window.lucide) window.lucide.createIcons();

  // Profile photo: keep the initials until a photo actually loads.
  var photo = document.querySelector(".avatar img");
  if (photo) {
    var showPhoto = function () { photo.hidden = false; };
    var dropPhoto = function () { photo.remove(); };
    photo.addEventListener("load", showPhoto);
    photo.addEventListener("error", dropPhoto);
    if (photo.complete) photo.naturalWidth ? showPhoto() : dropPhoto();
  }

  // Reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Research: flip timeline order
  var timeline = document.querySelector(".timeline");
  var orderBtn = document.querySelector(".order-toggle");
  if (timeline && orderBtn) {
    var label = orderBtn.querySelector("span");
    var apply = function (newest) {
      timeline.classList.toggle("reversed", newest);
      label.textContent = newest ? "Newest first" : "Oldest first";
    };
    apply(store("research-order") === "newest");
    orderBtn.addEventListener("click", function () {
      var newest = !timeline.classList.contains("reversed");
      apply(newest);
      store("research-order", newest ? "newest" : "oldest");
    });
  }

  // Research: slide-deck lightbox (one PNG per page: <deck>-1.png ... <deck>-N.png)
  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    var lbImg = lightbox.querySelector("img");
    var lbPdf = lightbox.querySelector(".lb-pdf");
    var lbCount = lightbox.querySelector(".lb-count");
    var prevBtn = lightbox.querySelector(".lb-nav.prev");
    var nextBtn = lightbox.querySelector(".lb-nav.next");
    var deck = null, pages = 1, page = 1, title = "";
    var src = function (n) { return deck + "-" + n + ".png"; };
    var show = function (n) {
      page = Math.min(Math.max(n, 1), pages);
      lbImg.src = src(page);
      lbImg.alt = title + ", slide " + page + " of " + pages;
      lbCount.textContent = page + " / " + pages;
      prevBtn.disabled = page === 1;
      nextBtn.disabled = page === pages;
      if (page < pages) new Image().src = src(page + 1);
    };
    var close = function () {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    };
    document.querySelectorAll(".slide-thumb").forEach(function (btn) {
      var n = btn.querySelector(".zoom .n");
      if (n) n.textContent = btn.dataset.pages + " slides";
      btn.addEventListener("click", function () {
        deck = btn.dataset.deck;
        pages = parseInt(btn.dataset.pages, 10) || 1;
        title = btn.querySelector("img").alt;
        lbPdf.href = btn.dataset.pdf;
        show(1);
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
        lightbox.querySelector(".close").focus();
      });
    });
    prevBtn.addEventListener("click", function () { show(page - 1); });
    nextBtn.addEventListener("click", function () { show(page + 1); });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.closest(".close")) close();
    });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") show(page + 1);
      else if (e.key === "ArrowLeft") show(page - 1);
    });
    var touchX = null;
    lightbox.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) show(page + (dx < 0 ? 1 : -1));
      touchX = null;
    });
  }
})();
