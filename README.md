# Carteira Ideal

Landing de "link na bio" do Instagram + app **Carteira Ideal** (perfil de investidor e carteira de
referência). Conteúdo educacional, não é recomendação de investimento.

```
index.html      landing (link na bio)
style.css       estilos da landing
script.js       tema claro/escuro da landing
assets/         logo, fundos, fontes, imagem de compartilhamento
app/index.html  o app (versão compilada, arquivo único)
```

## Publicar no GitHub Pages

1. Use o repositório **público** `LeonardoDaher/Carteira-Ideal` (em conta gratuita, o Pages só funciona com repositório público).
2. **Add file → Upload files** e arraste **o conteúdo** desta pasta (`index.html`, `style.css`,
   `script.js`, `README.md` e as pastas `assets` e `app`). Clique em **Commit changes**.
3. **Settings → Pages → Build and deployment**: *Source* = **Deploy from a branch**,
   *Branch* = **main**, pasta **/ (root)** → **Save**.
4. Em 1 a 2 minutos o endereço aparece no topo da página de Pages:
   **https://leonardodaher.github.io/Carteira-Ideal/**
5. Abra no celular e teste: landing → botão amarelo → app → questionário.

## Depois de publicar

- **Imagem de compartilhamento (WhatsApp/LinkedIn):** já aponta para
  `https://leonardodaher.github.io/Carteira-Ideal/assets/og-image.png` e só funciona depois que o
  Pages estiver no ar. Se mudar o nome do repositório, ajuste `og:image` e `og:url` em `index.html`.
- **Links pendentes:** procure `data-todo` em `index.html` e troque cada `#` pelo endereço real
  (curso, Instagram, e-mail com `mailto:`, ícones sociais). Troque também `@carteiraideal`.
  Para editar direto no GitHub: abra o arquivo → ícone de lápis → altere → **Commit changes**.
- **Atualizar o app:** compile o projeto (`npm run build`) e substitua `app/index.html` pelo
  `dist/index.html` gerado.
