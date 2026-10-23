# Home e estoque

A home lê o mesmo cadastro usado pelo estoque, através de `getHomeInventory()` em `src/services/vehicles.ts`. Não há uma segunda lista manual nem é necessário marcar `featured` para aparecer na vitrine.

São exibidos até oito veículos disponíveis, ordenados pela data mais recente entre `updatedAt` e `createdAt`. Empates usam a data de inclusão, o ID e o slug. Datas ausentes ou inválidas ficam por último; nenhuma data histórica é preenchida automaticamente pela seleção. IDs ou URLs repetidos são deduplicados, mantendo primeiro o registro mais recente. Reservados e vendidos não entram na vitrine. O botão de estoque completo mostra o total disponível, não apenas os oito cards.

Na arquitetura atual, o cadastro é compilado junto com o site: `src/data/mock/vehicles.mock.ts` incorpora também `src/data/olx-vehicles.ts`. Ao cadastrar ou alterar um veículo, mantenha `createdAt` como a data real de inclusão e atualize `updatedAt` com a data real da alteração. Não reescreva datas de outros veículos. Atualize também fotos/mapeamento quando necessário.

As mudanças aparecem na home quando a atualização do estoque é commitada e publicada pelo fluxo GitHub → Vercel. A próxima abertura/recarregamento da home usa esse cadastro publicado. Não existe sincronização com a OLX, CMS ativo, atualização em tempo real de abas já abertas ou persistência das funções de demonstração em memória.

Validação: `npx tsx scripts/verify-home-inventory.ts`, `npx tsx scripts/verify-olx-stock.ts`, `npm run lint` e `npm run build`. Os testes de inserção, alteração e indisponibilidade usam apenas memória no processo de teste; não modificam os arquivos do estoque real. Cards continuam usando imagens com lazy loading; a vitrine permanece limitada a oito itens.

## Hero mobile

A hero é montada somente abaixo de 1024px (o breakpoint `lg` já usado no site). Em desktop, inclusive no primeiro carregamento, seu vídeo não é inserido no DOM; a introdução existente com o único H1 começa após o cabeçalho. O listener de `matchMedia` acompanha redimensionamentos e desmonta a mídia ao entrar no desktop.

No mobile, usa o vídeo já existente `https://img.carplusautos.com.br/autos-no-portao.mp4` e o poster real `https://img.carplusautos.com.br/hero.webp`. Mantém autoplay sem som e playsInline, controles de som/pausa com rótulos acessíveis e CTA para o estoque. O poster só desaparece após o evento de reprodução efetiva. Erro ou autoplay recusado mantém a foto visível. Movimento reduzido ou `navigator.connection.saveData` (quando disponível) impede a montagem do vídeo. Preferências de movimento também desativam os letreiros animados.

Verificação visual feita em 320, 390 e 1440px, com resize em 1023/1024px, pausa real e navegação. Para reproduzir fallbacks em desenvolvimento, abra `/scripts/hero-preview.html?mode=blocked`, `?mode=reduced` ou `?mode=save-data` no Vite. Essa fixture simula políticas do navegador sem alterar estoque e não integra o build publicado. Verifique poster carregado e visível, CTA e ausência de vídeo nos dois últimos modos.
