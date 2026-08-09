const lotusMark = `
  <svg class="brand__mark" viewBox="0 0 72 56" aria-hidden="true">
    <g fill="currentColor">
      <path d="M36 42C26 33 26 19 36 5c10 14 10 28 0 37Z"></path>
      <path d="M32 43C20 39 13 28 16 14c13 6 20 16 16 29Z"></path>
      <path d="M40 43c12-4 19-15 16-29-13 6-20 16-16 29Z"></path>
      <path d="M27 46C14 47 5 40 3 28c12 0 21 6 24 18Z"></path>
      <path d="M45 46c13 1 22-6 24-18-12 0-21 6-24 18Z"></path>
      <path d="M36 49C20 54 8 50 1 40c14-2 25 1 35 9Z"></path>
      <path d="M36 49c16 5 28 1 35-9-14-2-25 1-35 9Z"></path>
    </g>
  </svg>`;

const brand = (homeHref = "index.html") => `
  <a class="brand" href="${homeHref}" aria-label="Lotus Med — Accueil">
    ${lotusMark}
    <span>
      <span class="brand__name">LOTUSMED</span>
      <span class="brand__tagline">Santé · Bien-être</span>
    </span>
  </a>`;

const icon = (name) => {
  const paths = {
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z"></path>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.8 5.6a2 2 0 0 1-2.4 0L2 7"></path>',
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle>',
    clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>',
    arrow: '<path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path>',
    play: '<path fill="currentColor" stroke="none" d="m8 5 11 7-11 7Z"></path>',
    pause: '<path d="M9 5v14M15 5v14"></path>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"></path><path d="m9 12 2 2 4-4"></path>',
    home: '<path d="m3 11 9-8 9 8"></path><path d="M5 10v10h14V10"></path><path d="M9 20v-6h6v6"></path>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z"></path>',
    info: '<circle cx="12" cy="12" r="9"></circle><path d="M12 11v5"></path><path d="M12 8h.01"></path>'
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.info}</svg>`;
};

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const page = document.body.dataset.page || "home";
    const links = [
      ["home", "index.html", "Accueil"],
      ["infirmiers", "soins-infirmiers.html", "Soins infirmiers"],
      ["soins", "soins.html", "Nos soins"],
      ["lpg", "lpg.html", "LPG"],
      ["tarifs", "tarifs.html", "Tarifs"],
      ["about", "a-propos.html", "À propos"]
    ];
    this.innerHTML = `
      <div class="utility-bar">
        <div class="container utility-bar__inner">
          <div class="utility-bar__group">
            <span>Cabinet à Genève</span>
            <span>Infirmière &amp; lymphothérapeute diplômée</span>
          </div>
          <div class="utility-bar__group">
            <a href="tel:+41794696250">079 469 62 50</a>
            <a href="mailto:rosseletnara@yahoo.com">rosseletnara@yahoo.com</a>
          </div>
        </div>
      </div>
      <header class="site-header" data-site-header>
        <div class="container site-header__inner">
          ${brand()}
          <nav class="main-nav" aria-label="Navigation principale">
            <div class="main-nav__links" id="main-navigation" data-menu>
              ${links.map(([key, href, label]) => `<a class="main-nav__link" href="${href}"${page === key ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
              <a class="button button--primary main-nav__mobile-cta" href="contact.html#formulaire">Demander un rendez-vous</a>
            </div>
            <a class="button button--primary" href="contact.html#formulaire">Demander un rendez-vous</a>
            <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-navigation" aria-label="Ouvrir le menu" data-menu-toggle><span></span></button>
          </nav>
        </div>
      </header>`;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-about">
              ${brand()}
              <p>Soins infirmiers à domicile, lymphothérapie, massages thérapeutiques et LPG Endermologie® Cellu M6 Alliance à Genève.</p>
            </div>
            <div class="footer-column">
              <h2>Explorer</h2>
              <ul class="footer-links">
                <li><a href="a-propos.html">À propos</a></li>
                <li><a href="soins.html">Nos soins</a></li>
                <li><a href="lpg.html">Programmes LPG</a></li>
                <li><a href="tarifs.html">Tarifs</a></li>
              </ul>
            </div>
            <div class="footer-column">
              <h2>Informations</h2>
              <ul class="footer-links">
                <li><a href="contact.html">Contact</a></li>
                <li><a href="mentions-legales.html">Mentions légales</a></li>
                <li><a href="politique-confidentialite.html">Confidentialité</a></li>
              </ul>
            </div>
            <div class="footer-column footer-contact">
              <h2>Lotus Med Genève</h2>
              <p>Rue Moillebeau 42<br>1202 Genève</p>
              <p><a href="tel:+41794696250">079 469 62 50</a><br><a href="mailto:rosseletnara@yahoo.com">rosseletnara@yahoo.com</a></p>
            </div>
          </div>
          <div class="footer-disclaimer">
            Les informations présentées sur ce site sont fournies à titre informatif et ne remplacent pas un diagnostic, une consultation ou un avis médical. Les indications et le protocole de chaque soin sont définis après une évaluation personnalisée. En cas de doute, demandez conseil à votre médecin. En cas d’urgence médicale, contactez le <strong>144</strong>.
          </div>
          <div class="footer-bottom">
            <span>© <span data-current-year></span> LOTUS MED. Tous droits réservés.</span>
            <span>Prendre soin de vous, naturellement.</span>
          </div>
        </div>
      </footer>
      <nav class="mobile-actions" aria-label="Actions rapides">
        <a class="button button--secondary" href="tel:+41794696250">${icon("phone")} Appeler</a>
        <a class="button button--primary" href="contact.html#formulaire">Demander</a>
      </nav>`;
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);
document.documentElement.classList.add("components-ready");

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-current-year]").forEach((year) => {
    year.textContent = new Date().getFullYear();
  });

  const header = document.querySelector("[data-site-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");

  const closeMenu = () => {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Ouvrir le menu");
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Ouvrir le menu" : "Fermer le menu");
      menu.classList.toggle("is-open", !open);
      document.body.classList.toggle("menu-open", !open);
      if (!open) requestAnimationFrame(() => menu.querySelector("a")?.focus());
    });
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1200) closeMenu();
    });
    document.addEventListener("keydown", (event) => {
      const menuIsOpen = toggle.getAttribute("aria-expanded") === "true";
      if (event.key === "Escape" && menuIsOpen) {
        closeMenu();
        toggle.focus();
      }
      if (event.key === "Tab" && menuIsOpen) {
        const links = [...menu.querySelectorAll("a")];
        const first = links[0];
        const last = toggle;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 16);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -45px" });
    reveals.forEach((element) => observer.observe(element));
    document.documentElement.classList.add("motion-ready");
  } else {
    reveals.forEach((element) => element.classList.add("is-visible"));
  }

  document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      document.querySelectorAll(".faq-item[open]").forEach((other) => {
        if (other !== item) other.removeAttribute("open");
      });
    });
  });

  initStoryPlayer();
  initContactForms();
});

function initStoryPlayer() {
  const player = document.querySelector("[data-story-player]");
  if (!player) return;

  const slides = [...player.querySelectorAll("[data-story-slide]")];
  const mainPlay = player.querySelector("[data-story-play]");
  const toggle = player.querySelector("[data-story-toggle]");
  const next = player.querySelector("[data-story-next]");
  let index = 0;
  let playing = false;
  let timer = null;

  const setSlide = (newIndex) => {
    index = (newIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === index));
    const progress = player.querySelector(".story-player__progress span");
    if (progress && playing) {
      progress.style.animation = "none";
      requestAnimationFrame(() => {
        progress.style.animation = "";
      });
    }
  };

  const updateControl = () => {
    if (!toggle) return;
    toggle.innerHTML = playing ? icon("pause") : icon("play");
    toggle.setAttribute("aria-label", playing ? "Mettre la présentation en pause" : "Lire la présentation");
  };

  const schedule = () => {
    window.clearInterval(timer);
    if (playing) timer = window.setInterval(() => setSlide(index + 1), 7000);
  };

  const setPlaying = (shouldPlay) => {
    playing = shouldPlay;
    player.classList.toggle("is-playing", playing);
    updateControl();
    schedule();
  };

  mainPlay?.addEventListener("click", () => setPlaying(true));
  toggle?.addEventListener("click", () => setPlaying(!playing));
  next?.addEventListener("click", () => {
    setSlide(index + 1);
    schedule();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && playing) setPlaying(false);
  });
  setSlide(0);
  updateControl();
}

function initContactForms() {
  const requestedService = new URLSearchParams(window.location.search).get("prestation");
  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    const status = form.querySelector("[data-form-status]");
    const serviceSelect = form.querySelector('select[name="prestation"]');
    if (requestedService && serviceSelect) {
      const exactOption = [...serviceSelect.options].find((option) => option.value.toLocaleLowerCase("fr") === requestedService.toLocaleLowerCase("fr"));
      if (exactOption) serviceSelect.value = exactOption.value;
      else {
        const fallback = [...serviceSelect.options].find((option) => option.value === "Autre demande");
        if (fallback) serviceSelect.value = fallback.value;
      }
    }
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      status?.classList.remove("is-visible", "is-error");

      if (!form.checkValidity()) {
        form.reportValidity();
        if (status) {
          status.textContent = "Merci de compléter les champs obligatoires et d’accepter le traitement de votre demande.";
          status.classList.add("is-visible", "is-error");
        }
        return;
      }

      const data = new FormData(form);
      const subject = `Demande de rendez-vous — ${data.get("prestation") || "Lotus Med"}`;
      const body = [
        `Nom : ${data.get("nom")}`,
        `Téléphone : ${data.get("telephone")}`,
        `E-mail : ${data.get("email")}`,
        `Prestation : ${data.get("prestation")}`,
        "Consentement au traitement de la demande : accepté",
        "",
        "Message :",
        data.get("message")
      ].join("\n");

      if (status) {
        status.textContent = "Votre messagerie va s’ouvrir avec votre demande préremplie. Vous pourrez la relire avant l’envoi.";
        status.classList.add("is-visible");
      }
      window.location.href = `mailto:rosseletnara@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  });
}
