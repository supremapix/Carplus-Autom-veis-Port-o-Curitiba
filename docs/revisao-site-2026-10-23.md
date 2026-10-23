# Revisão da Carplus Autos — 23/10/2026

## Escopo e cobertura

Revisão de código, conteúdo e navegação das rotas públicas abaixo, com componentes compartilhados de cabeçalho, rodapé, cards, filtros, galeria, especificações, interesse, troca e compartilhamento. Nenhum dado do cadastro de veículos foi editado nesta revisão.

| Rota/template | Conferência e correções |
| --- | --- |
| `/` | Oito disponíveis pela fonte única; hero somente abaixo de 1024px; vídeo real, poster e fallback; H1 preservado; FAQ e promessas gerais revisados |
| `/estoque` | Metadados factuais, filtros e ordenação com nomes acessíveis, cards preservando preços e links |
| `/estoque/:slug` | Todas as 17 URLs verificadas: H1 único, canonical, título e JSON-LD; títulos/descrições de vendidos identificam o status; dados ausentes não viram quatro portas ou Sedan/SUV |
| `/venda-seu-carro` | Texto de avaliação sem garantia de resultado; rótulos associados; continuidade pelo WhatsApp |
| `/financiamento` | Taxas/prazos/aprovação condicionados à análise; removidas alegações de menores taxas e aprovação rápida; rótulos e continuidade pelo WhatsApp |
| `/consignacao` | Explicação e benefícios sem promessa de segurança total ou resultado garantido |
| `/empresa` | Removida promessa universal de laudo 100% aprovado e garantia de motor/câmbio; níveis de títulos corrigidos |
| `/contato` | Endereço/telefone/horários preservados; rótulos e mensagem de continuidade; teste local sem envio externo |
| `/historico-veiculos` | Metadados próprios, sem herdar título/canonical da última página; cinco vendidos preservados |
| `/politica-de-privacidade` | Atualização factual sobre preparação local de formulários, WhatsApp, Analytics e mapas; canal de contato não apresentado como nomeação de DPO |
| Página inexistente e anúncio inexistente | H1, título, canonical e `noindex, follow` próprios; texto não pressupõe que todo link ausente foi vendido |

Os nove aliases existentes foram abertos e conferidos: `/compramos-seu-carro`, `/vender-carro-curitiba`, `/troca-de-carro`, `/avaliacao-de-veiculos-curitiba` → venda; `/carros-usados-curitiba`, `/carros-seminovos-curitiba`, `/comprar-carro-curitiba` → estoque; `/loja-de-carros-curitiba`, `/loja-de-carros-portao` → empresa. URLs e destinos preservados.

## Acabamento visual

Cards: raio de 16 para 12px, hover de 6 para 2px, sombra menor, zoom de foto de 5% para 2%, título de até 22px e preço estável com algarismos tabulares. Foco de teclado explícito. Vitrine: espaçamento vertical de 64/96 para 48/64px, margem antes dos cards de 48 para 32px e gap de 24px. Retirado apenas o itálico do destaque no título. Introdução desktop: padding vertical de 48px. Cores, fontes, marca, estrutura e conteúdo dos anúncios preservados.

## Evidências de teste

- `npm run lint` (TypeScript), `npm run build`, `npx tsx scripts/verify-home-inventory.ts`, `npx tsx scripts/verify-olx-stock.ts` e `npx tsx scripts/verify-editorial.ts`.
- Home em 320, 390 e 1440px; resize em 1023/1024px; sem overflow horizontal, oito links distintos e CTA para estoque.
- Vídeo real reproduzido muted/inline; pausa confirmada; fixtures de autoplay negado, movimento reduzido e economia de dados confirmaram poster visível. Nos dois últimos modos o vídeo não é montado.
- As 17 páginas de veículos tiveram H1 único, título, canonical e JSON-LD conferidos. Nove aliases redirecionaram corretamente. Páginas não encontradas receberam `noindex`.
- Formulário de contato testado apenas no localhost: prepara link para o telefone oficial, com texto informado; não abre nem envia mensagem automaticamente.
- O teste do estoque confirma cinco registros OLX, 71 fotos locais e preservação dos 12 registros anteriores, inclusive histórico do Edge e restrição informada no HB20.

## Limitações existentes

O serviço de leads continua em memória, sem backend de envio. A interface agora informa que o usuário precisa concluir pelo WhatsApp; CPF/data de nascimento e fotos não são anexados automaticamente a essa mensagem. Persistência/CRM exigiria integração separada, sem credenciais ou serviços novos nesta tarefa.

O site é uma SPA: os metadados por rota são atualizados no navegador. Esta revisão não adiciona renderização no servidor nem altera o status HTTP das rotas inexistentes. Não promete indexação, prévias sociais ou resultados de busca. O build mantém o aviso já existente sobre o bundle acima de 500kB. A revisão factual da política não é uma auditoria jurídica nem valida práticas operacionais externas ao código.
