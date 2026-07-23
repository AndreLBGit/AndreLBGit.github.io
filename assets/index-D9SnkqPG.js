// André Luiz Batista · JS vanilla mínimo
// 1) Reveal suave por seção (IntersectionObserver)
// 2) Indicador de seção ativa no header
// 3) Filtro de publicações por ano

// ---------- 1) Reveal ----------
const alvos = document.querySelectorAll(
  ".section-head, .prose p, .timeline, .formacao-list, .complementar-list, .areas, .pub-filters, .pub-list, .capitulo, .duas-colunas, .premios-list, .footer-inner"
);
alvos.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visivel");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
);
alvos.forEach((el) => observer.observe(el));

// ---------- 2) Seção ativa no header ----------
const linksNav = document.querySelectorAll("[data-nav]");
const secoes = [...linksNav]
  .map((a) => document.getElementById(a.dataset.nav))
  .filter(Boolean);

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        linksNav.forEach((a) =>
          a.classList.toggle("ativa", a.dataset.nav === entry.target.id)
        );
      }
    });
  },
  { rootMargin: "-30% 0px -60% 0px" }
);
secoes.forEach((s) => navObserver.observe(s));

// ---------- 3) Filtro de publicações ----------
const botoes = document.querySelectorAll(".filter-btn");
const itens = document.querySelectorAll(".pub-item");

botoes.forEach((btn) => {
  btn.addEventListener("click", () => {
    const ano = btn.dataset.ano;
    botoes.forEach((b) => b.classList.toggle("ativo", b === btn));
    itens.forEach((item) => {
      const mostrar = ano === "todos" || item.dataset.ano === ano;
      item.classList.toggle("oculto", !mostrar);
    });
  });
});
