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

1. Crie um repositório **público** no GitHub (ex.: `carteira-ideal`).
2. **Add file → Upload files** e arraste **o conteúdo** desta pasta (`index.html`, `style.css`,
   `script.js`, `README.md` e as pastas `assets` e `app`). Clique em **Commit changes**.
3. **Settings → Pages → Build and deployment**: *Source* = **Deploy from a branch**,
   *Branch* = **main**, pasta **/ (root)** → **Save**.
4. Em 1 a 2 minutos o endereço aparece no topo da página de Pages:
   `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`
   (com o repositório chamado `SEU-USUARIO.github.io`, o endereço fica sem o nome do repositório).
5. Abra no celular e teste: landing → botão amarelo → app → questionário.

## Depois de publicar

- **Imagem de compartilhamento (WhatsApp/LinkedIn):** em `index.html`, troque
  `content="./assets/og-image.png"` pelo endereço completo, ex.:
  `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/assets/og-image.png`.
- **Links pendentes:** procure `data-todo` em `index.html` e troque cada `#` pelo endereço real
  (curso, Instagram, e-mail com `mailto:`, ícones sociais). Troque também `@carteiraideal`.
  Para editar direto no GitHub: abra o arquivo → ícone de lápis → altere → **Commit changes**.
- **Atualizar o app:** compile o projeto (`npm run build`) e substitua `app/index.html` pelo
  `dist/index.html` gerado.
