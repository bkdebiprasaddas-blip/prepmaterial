(function () {
  "use strict";

  var THEME_KEY = "tybca_sem5_theme";
  var LAST_SUBJECT_KEY = "tybca_sem5_last_subject";
  var DEBUG_KEY = "tybca_sem5_debug";

  var isDebug = (function () {
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.get("debug") === "1") return true;
      return window.localStorage.getItem(DEBUG_KEY) === "1";
    } catch (e) {
      return false;
    }
  })();

  function log(prefix, msg) {
    if (prefix === "[DEBUG]" && !isDebug) return;
    try {
      console.log(prefix + " " + msg);
    } catch (e) { /* no-op */ }
  }

  function logError(msg) {
    try {
      console.error("[ERROR] " + msg);
    } catch (e) { /* no-op */ }
  }

  function safeGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      logError("STORAGE read failed for " + key + ": " + e.message);
      return null;
    }
  }

  function safeSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
      log("[STORAGE]", "Saved " + key);
    } catch (e) {
      logError("STORAGE write failed for " + key + ": " + e.message);
    }
  }

  function initTheme() {
    try {
      var stored = safeGet(THEME_KEY);
      var theme = stored || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", theme);
      updateToggleLabel(theme);

      var btn = document.getElementById("themeToggle");
      if (btn) {
        btn.addEventListener("click", function () {
          var current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
          var next = current === "dark" ? "light" : "dark";
          document.documentElement.setAttribute("data-theme", next);
          safeSet(THEME_KEY, next);
          updateToggleLabel(next);
          log("[APP]", "Theme changed to " + next);
        });
      }
    } catch (e) {
      logError("initTheme failed: " + e.message);
    }
  }

  function updateToggleLabel(theme) {
    var btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = theme === "dark" ? "☀ Light mode" : "🌙 Dark mode";
  }

  function renderCards() {
    var grid = document.getElementById("subjectGrid");
    if (!grid) {
      logError("renderCards: #subjectGrid not found in DOM");
      return;
    }
    var subjects = window.TYBCA_SEM5_SUBJECTS || [];
    if (!subjects.length) {
      logError("renderCards: no subjects configured");
      grid.innerHTML = "<p>No subjects configured yet.</p>";
      return;
    }

    var frag = document.createDocumentFragment();
    subjects.forEach(function (subject) {
      var card = document.createElement("a");
      card.className = "subject-card";
      card.href = subject.file;
      card.setAttribute("aria-label", "Open " + subject.name);
      if (subject.color) card.style.setProperty("--card-accent", subject.color);
      if (subject.colorSoft) card.style.setProperty("--card-accent-soft", subject.colorSoft);
      card.addEventListener("click", function () {
        safeSet(LAST_SUBJECT_KEY, subject.id);
        log("[NAV]", "Opening subject: " + subject.name);
        log("[NAV]", "Navigation target: " + subject.file);
      });

      var icon = document.createElement("div");
      icon.className = "icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = subject.icon || "📚";

      var title = document.createElement("h2");
      title.textContent = subject.name;

      var desc = document.createElement("p");
      desc.textContent = subject.description || "";

      var action = document.createElement("span");
      action.className = "open-action";
      action.textContent = "Open Subject →";

      card.appendChild(icon);
      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(action);
      frag.appendChild(card);
    });

    grid.appendChild(frag);
    log("[APP]", "Subject cards loaded (" + subjects.length + ")");
  }

  function renderContinueStudying() {
    try {
      var lastId = safeGet(LAST_SUBJECT_KEY);
      if (!lastId) return;
      var subjects = window.TYBCA_SEM5_SUBJECTS || [];
      var subject = subjects.filter(function (s) { return s.id === lastId; })[0];
      if (!subject) {
        log("[DEBUG]", "Continue-study id not found in config: " + lastId);
        return;
      }

      var banner = document.getElementById("continueBanner");
      if (!banner) return;

      var nameEl = document.createElement("div");
      var label = document.createElement("div");
      label.className = "label";
      label.textContent = "Continue Studying";
      var name = document.createElement("div");
      name.className = "subject-name";
      name.textContent = subject.name;
      nameEl.appendChild(label);
      nameEl.appendChild(name);

      var link = document.createElement("a");
      link.href = subject.file;
      link.textContent = "Continue →";
      link.addEventListener("click", function () {
        log("[NAV]", "Continue Studying → " + subject.name);
      });

      banner.appendChild(nameEl);
      banner.appendChild(link);
      banner.hidden = false;
      log("[APP]", "Continue-study state restored: " + subject.name);
    } catch (e) {
      logError("renderContinueStudying failed: " + e.message);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    log("[APP]", "Homepage initialized");
    initTheme();
    renderCards();
    renderContinueStudying();
  });
})();
