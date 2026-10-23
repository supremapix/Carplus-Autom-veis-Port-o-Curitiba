# Home e estoque

A home lê o mesmo cadastro usado pelo estoque, através de `getHomeInventory()` em `src/services/vehicles.ts`. Não há uma segunda lista manual nem é necessário marcar `featured` para aparecer na vitrine.

São exibidos até oito veículos disponíveis, ordenados pela data mais recente entre `updatedAt` e `createdAt`. Empates usam a data de inclusão, o ID e o slug. Datas ausentes ou inválidas ficam por último; nenhuma data histórica é preenchida automaticamente pela seleção. IDs ou URLs repetidos são deduplicados, mantendo primeiro o registro mais recente. Reservados e vendidos não entram na vitrine. O botão de estoque completo mostra o total disponível, não apenas os oito cards.

Na arquitetura atual, o cadastro é compilado junto com o site: `src/data/mock/vehicles.mock.ts` incorpora também `src/data/olx-vehicles.ts`. Ao cadastrar ou alterar um veículo, mantenha `createdAt` como a data real de inclusão e atualize `updatedAt` com a data real da alteração. Não reescreva datas de outros veículos. Atualize também fotos/mapeamento quando necessário.

As mudanças aparecem na home quando a atualização do estoque é commitada e publicada pelo fluxo GitHub → Vercel. A próxima abertura/recarregamento da home usa esse cadastro publicado. Não existe sincronização com a OLX, CMS ativo, atualização em tempo real de abas já abertas ou persistência das funções de demonstração em memória.

Validação: `npx tsx scripts/verify-home-inventory.ts`, `npx tsx scripts/verify-olx-stock.ts`, `npm run lint` e `npm run build`. Os testes de inserção, alteração e indisponibilidade usam apenas memória no processo de teste; não modificam os arquivos do estoque real. Cards continuam usando imagens com lazy loading; a vitrine permanece limitada a oito itens.
