# Carteira Ideal

Landing de "link na bio" do Instagram + app **Carteira Ideal** (perfil de investidor e carteira de
referência). Conteúdo educacional, não é recomendação de investimento.

```
index.html      landing (link na bio)
style.css       estilos da landing
script.js       tema claro/escuro, botão "já respondeu" e liberação do livro (por confiança)
assets/         logo, fundos, fontes, imagem de compartilhamento e o livro em PDF
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
- **Links:** todos configurados. Para trocar um, procure o texto do botão em `index.html`.
  O livro em PDF fica em `assets/livro-os-tres-potes-de-duda.pdf`: para atualizá-lo, envie um
  arquivo com **o mesmo nome** para a pasta `assets`.
- **Atualizar o app:** compile o projeto (`npm run build`) e substitua `app/index.html` pelo
  `dist/index.html` gerado.

## Botão para quem já respondeu

Se o navegador já tem uma carteira salva pelo app (mesmo endereço, pasta `/app`), o botão amarelo
da landing passa a dizer **"Ver minha carteira de referência"**. Nos demais casos (visitante novo,
questionário pela metade, outro aparelho, aba anônima ou armazenamento bloqueado) ele mostra o
texto original. A lógica está no final de `script.js` e usa a mesma chave e versão de dados do app
(`carteiraideal.estado`, versão 2, em `app/src/state/useAppState.ts`). Se o app mudar essa versão,
atualize `VERSAO` em `script.js`.

## Livro liberado por confiança (bônus para seguidores)

O botão "Educação Financeira Infantil" abre um diálogo pedindo para seguir o Instagram. Quem toca em
**Seguir** ou em **Já sigo o perfil** libera o download, e a liberação fica salva no navegador
(`carteiraideal.livroLiberado`). Depois disso, o botão da lista baixa o PDF direto.

- **Não há verificação:** o Instagram não permite checar quem segue. É um convite, não uma proteção.
- **O PDF continua público** em `assets/livro-os-tres-potes-de-duda.pdf`: quem souber o endereço baixa direto.
- **Sem JavaScript**, o botão da lista simplesmente abre o Instagram.
- **Textos e endereços:** ficam em `index.html` (botão `#livro-link` e diálogo `#livro-dialog`); a lógica está
  no final de `script.js` e os estilos em `style.css` (seção "Diálogo do livro").
- **Para liberar o livro para todos** de novo, remova o botão `#livro-link` e o `<dialog>` e use um link
  direto para o PDF.
