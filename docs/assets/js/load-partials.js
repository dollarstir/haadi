(function () {
  function basePath() {
    var path = window.location.pathname;
    if (path.endsWith("/")) return path;
    var i = path.lastIndexOf("/");
    return i <= 0 ? "/" : path.slice(0, i + 1);
  }

  var root = basePath();

  function url(p) {
    if (root === "/") return p;
    return root + p;
  }

  Promise.all([
    fetch(url("partials/header.html")).then(function (r) {
      if (!r.ok) throw new Error("header");
      return r.text();
    }),
    fetch(url("partials/footer.html")).then(function (r) {
      if (!r.ok) throw new Error("footer");
      return r.text();
    }),
  ])
    .then(function (parts) {
      var headerSlot = document.getElementById("header-slot");
      var footerSlot = document.getElementById("footer-slot");
      if (headerSlot) headerSlot.innerHTML = parts[0];
      if (footerSlot) footerSlot.innerHTML = parts[1];

      var fy = document.getElementById("footer-year");
      if (fy) fy.textContent = String(new Date().getFullYear());

      var path = window.location.pathname;
      var page;
      if (path.endsWith("/")) {
        page = "index.html";
      } else {
        var segs = path.split("/").filter(Boolean);
        page = segs.length ? segs[segs.length - 1] : "index.html";
        if (page.indexOf(".") === -1) page = "index.html";
      }

      document.querySelectorAll(".nav a").forEach(function (link) {
        var href = link.getAttribute("href");
        if (!href) return;
        var target = href.split("/").pop();
        if (
          target === page ||
          (page === "index.html" && (target === "index.html" || href === "./"))
        ) {
          link.setAttribute("aria-current", "page");
        }
      });

      var toggle = document.querySelector(".nav-toggle");
      var nav = document.querySelector(".nav");
      if (toggle && nav) {
        toggle.addEventListener("click", function () {
          var open = !nav.classList.contains("is-open");
          nav.classList.toggle("is-open", open);
          toggle.setAttribute("aria-expanded", open);
        });
        nav.querySelectorAll("a").forEach(function (a) {
          a.addEventListener("click", function () {
            nav.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
          });
        });
      }
    })
    .catch(function () {
      var slot = document.getElementById("header-slot");
      if (slot)
        slot.innerHTML =
          '<p style="padding:1rem;color:#9aa5b8;">Load this site via a local server (e.g. <code>cd docs && python3 -m http.server</code>) or GitHub Pages so navigation can load.</p>';
    });
})();
