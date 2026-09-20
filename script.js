var THEME_COLORS = { dark: "#0a0d13", light: "#f6f7fb" };

function applyTheme(isLight) {
  var button = document.querySelector("#switch button");
  var meta = document.querySelector('meta[name="theme-color"]');

  if (button) button.setAttribute("aria-pressed", String(isLight));
  if (meta) meta.setAttribute("content", isLight ? THEME_COLORS.light : THEME_COLORS.dark);
}

function toggleMode() {
  var html = document.documentElement;
  var isLight = html.classList.toggle("light");

  applyTheme(isLight);

  try {
    localStorage.setItem("theme", isLight ? "light" : "dark");
  } catch (e) {
    /* modo privado / storage bloqueado: segue sem salvar */
  }
}

// Sincroniza o botão e a cor da barra do navegador com o tema já aplicado no <head>
applyTheme(document.documentElement.classList.contains("light"));

// Aviso de desenvolvimento: links ainda sem endereço definitivo
(function () {
  var pending = document.querySelectorAll('a[href="#"][data-todo]');
  if (!pending.length || !window.console) return;
  var names = [];
  Array.prototype.forEach.call(pending, function (a) {
    var n = a.getAttribute("data-todo");
    if (names.indexOf(n) === -1) names.push(n);
  });
  console.warn("[Carteira Ideal] Links pendentes em index.html: " + names.join(", "));
})();
