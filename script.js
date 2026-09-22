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

/* Quem já respondeu o questionário: o app (mesmo endereço, pasta /app) guarda o progresso no
   navegador. Se já existe uma carteira pronta neste aparelho, o botão principal passa a dizer
   "Ver minha carteira de referência". O texto original do HTML continua valendo para os demais
   casos, inclusive se o armazenamento estiver bloqueado.

   ATENÇÃO: CHAVE e VERSAO precisam acompanhar CHAVE_ARMAZENAMENTO e VERSAO_ARMAZENAMENTO em
   app/src/state/useAppState.ts. Se o app mudar a versão, o progresso antigo deixa de valer
   (o app o descarta) e a landing volta ao texto original, de propósito. */
(function () {
  var CHAVE = "carteiraideal.estado";
  var VERSAO = 2;
  var TELAS_COM_RESULTADO = ["resultado", "carteira", "simulador", "detalheAtivo", "aprender", "trilha", "aprenderVideo"];

  try {
    var bruto = localStorage.getItem(CHAVE);
    if (!bruto) return;
    var salvo = JSON.parse(bruto);
    if (!salvo || salvo.versao !== VERSAO || TELAS_COM_RESULTADO.indexOf(salvo.screen) === -1) return;

    var cta = document.querySelector("a.cta");
    var titulo = document.querySelector("a.cta .cta-title");
    var sub = document.querySelector("a.cta .cta-sub");
    if (titulo) titulo.textContent = "Ver minha carteira de referência";
    if (sub) sub.textContent = "Suas respostas estão salvas neste aparelho";
    // ?tela=resultado avisa o app para abrir direto no resultado, em vez de continuar de
    // onde o usuário parou (ex: no meio de uma trilha de aprendizagem) — ver useAppState.ts
    if (cta) cta.setAttribute("href", "./app/?tela=resultado");
  } catch (e) {
    /* armazenamento bloqueado ou dado inválido: mantém o texto original */
  }
})();

/* Livro "Os Três Potes de Duda": liberação por confiança (honor system).
   Ao tocar no botão do livro, abre um diálogo pedindo para seguir o Instagram. Quem toca em
   "Seguir" ou em "Já sigo o perfil" libera o download. NÃO há verificação (o Instagram não
   oferece isso) e o PDF continua em /assets, acessível a quem souber o endereço: é um convite,
   não uma proteção. A liberação fica salva neste navegador; sem JavaScript, o botão da lista
   simplesmente abre o Instagram. */
(function () {
  var CHAVE = "carteiraideal.livroLiberado";
  var NOME_ARQUIVO = "Os-Tres-Potes-de-Duda.pdf";

  var link = document.getElementById("livro-link");
  var dlg = document.getElementById("livro-dialog");
  if (!link || !dlg) return;

  var sub = document.getElementById("livro-sub");
  var cadeado = document.getElementById("livro-cadeado");
  var seguir = document.getElementById("livro-seguir");
  var baixar = document.getElementById("livro-baixar");
  var jaSigo = document.getElementById("livro-ja-sigo");
  var status = document.getElementById("livro-status");
  var pdf = link.getAttribute("data-pdf");

  var liberado = false;
  try {
    liberado = localStorage.getItem(CHAVE) === "1";
  } catch (e) {
    /* armazenamento bloqueado: a liberação vale só até fechar a página */
  }

  function salvarLiberacao() {
    liberado = true;
    try {
      localStorage.setItem(CHAVE, "1");
    } catch (e) {}
  }

  /* Botão da lista: depois de liberado, baixa o PDF direto, sem abrir o diálogo.
     Usa setAttribute/removeAttribute (em vez de .hidden = true/false) porque a
     propriedade "hidden" não reflete de forma confiável em elementos SVG em todos os
     navegadores — setar o atributo direto funciona em qualquer elemento. */
  function ocultar(el, ocultar) {
    if (!el) return;
    if (ocultar) el.setAttribute("hidden", "");
    else el.removeAttribute("hidden");
  }

  function atualizarLista() {
    ocultar(cadeado, liberado);
    if (!liberado) return;
    link.setAttribute("href", pdf);
    link.setAttribute("download", NOME_ARQUIVO);
    link.removeAttribute("target");
    link.removeAttribute("aria-haspopup");
    if (sub) sub.textContent = "Livro liberado: toque para baixar";
  }

  /* Diálogo: o botão de baixar só ganha endereço depois da liberação */
  function atualizarDialogo(mensagem) {
    if (liberado) {
      baixar.setAttribute("href", pdf);
      baixar.setAttribute("download", NOME_ARQUIVO);
      baixar.removeAttribute("aria-disabled");
      baixar.classList.remove("is-locked", "btn-secondary");
      baixar.classList.add("btn-primary");
      seguir.classList.remove("btn-primary");
      seguir.classList.add("btn-secondary");
      if (jaSigo) jaSigo.hidden = true;
      status.textContent = mensagem || "Livro liberado. Toque em baixar.";
    } else {
      baixar.removeAttribute("href");
      baixar.setAttribute("aria-disabled", "true");
      status.textContent = "Siga o perfil para liberar o download.";
    }
  }

  function liberar(mensagem) {
    salvarLiberacao();
    atualizarDialogo(mensagem);
    atualizarLista();
  }

  function abrir() {
    atualizarDialogo();
    if (typeof dlg.showModal === "function") dlg.showModal();
    else dlg.setAttribute("open", "");
  }

  function fechar() {
    if (typeof dlg.close === "function") dlg.close();
    else dlg.removeAttribute("open");
  }

  link.addEventListener("click", function (ev) {
    if (liberado) return; /* segue o href: baixa o PDF */
    ev.preventDefault();
    abrir();
  });

  /* "Seguir" abre o Instagram em outra aba (comportamento normal do link) e já libera o download */
  seguir.addEventListener("click", function () {
    liberar("Perfil aberto em outra aba. Depois de seguir, volte aqui e baixe o livro.");
  });

  if (jaSigo) {
    jaSigo.addEventListener("click", function () {
      liberar("Obrigado por acompanhar! Livro liberado.");
      baixar.focus();
    });
  }

  baixar.addEventListener("click", function (ev) {
    if (baixar.getAttribute("aria-disabled") === "true") ev.preventDefault();
  });

  /* Fechar: botão X, tecla Esc (nativa) ou clique fora da caixa */
  dlg.addEventListener("click", function (ev) {
    if (ev.target === dlg || (ev.target.closest && ev.target.closest("[data-fechar]"))) fechar();
  });

  atualizarLista();
})();
