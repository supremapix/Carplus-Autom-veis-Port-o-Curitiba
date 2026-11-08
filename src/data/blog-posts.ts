export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
  answer: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  sections: Array<{ id: string; title: string; paragraphs: string[]; bullets?: string[] }>;
  faqs: Array<{ q: string; a: string }>;
  sources: Array<{ name: string; url: string }>;
  cta: { label: string; href: string };
  relatedSlugs: string[];
};

export const blogPosts: BlogPost[] = [
  {
    "slug": "checklist-comprar-carro-usado-curitiba",
    "title": "Checklist para comprar carro usado em Curitiba",
    "description": "Saiba o que conferir na documentação, na avaliação mecânica e no orçamento antes de comprar um carro usado em Curitiba.",
    "category": "Compra segura",
    "datePublished": "2026-11-08",
    "dateModified": "2026-11-08",
    "readingMinutes": 4,
    "answer": "Para comprar um carro usado em Curitiba, confira a documentação e as restrições, examine o histórico de manutenção, faça avaliação mecânica independente e compare o custo completo da compra. Registre por escrito as condições negociadas antes de pagar ou assinar.",
    "image": "/images/vehicles/hyundai-hb20-limited-1-0-flex-manual-2026/01.webp",
    "imageAlt": "Hyundai HB20 prata visto de frente e de lado no pátio da Carplus Autos",
    "imageCaption": "Imagem do acervo do site da Carplus Autos. Uso ilustrativo, sem indicação de disponibilidade atual.",
    "sections": [
      {
        "id": "necessidades",
        "title": "Qual carro combina com a sua rotina?",
        "paragraphs": [
          "Comece pelo uso real: deslocamentos urbanos, viagens, passageiros, garagem e volume de bagagem. Quem circula diariamente por Curitiba pode dar mais peso à facilidade de estacionar e ao conforto no trânsito. Quem viaja com frequência deve avaliar espaço, segurança e comportamento na estrada, sempre dentro dos limites legais.",
          "Anote requisitos indispensáveis e itens apenas desejáveis. Isso ajuda a comparar veículos equivalentes e evita escolher só pela aparência. Experimente a posição de dirigir, a visibilidade e o acesso aos bancos. Se utiliza cadeirinha, confira a compatibilidade e as instruções do fabricante."
        ]
      },
      {
        "id": "documentacao",
        "title": "O que consultar antes de visitar o veículo?",
        "paragraphs": [
          "Peça os dados necessários à consulta oficial e confira se a identificação do veículo corresponde ao anúncio e aos documentos apresentados. O extrato do Detran-PR permite verificar pendências e registros relevantes. Como os dados mudam, faça uma nova consulta perto do fechamento.",
          "Uma consulta documental não revela, por si só, o estado mecânico nem todo o histórico de uso. Trate documentos, inspeção e conversa com o vendedor como verificações complementares. Se houver restrição ou informação divergente, esclareça antes de avançar."
        ],
        "bullets": [
          "Conferir placa, Renavam, ano-modelo e identificação do proprietário ou representante.",
          "Consultar débitos, multas, restrições e registros disponíveis no canal oficial.",
          "Solicitar histórico de manutenção, notas de serviços e manual, quando existentes.",
          "Perguntar sobre reparos anteriores e registrar as informações relevantes."
        ]
      },
      {
        "id": "inspecao",
        "title": "Como avaliar a condição do carro usado?",
        "paragraphs": [
          "Observe o veículo com boa iluminação. Confira pneus, vidros, faróis, cintos, comandos, ar-condicionado e sinais de umidade no interior. Diferenças de acabamento, ruídos ou desgaste merecem avaliação, mas não permitem um diagnóstico seguro por fotografia ou observação isolada.",
          "Combine uma inspeção com profissional independente de sua confiança. Peça que avalie os sistemas adequados ao modelo, incluindo freios, suspensão, motor, transmissão e possíveis vazamentos. Em híbridos e elétricos, procure alguém com capacitação e equipamentos compatíveis.",
          "No teste de condução autorizado, observe partida, resposta dos comandos, frenagem e ruídos. Evite manobras arriscadas. A vistoria documental e uma eventual avaliação cautelar têm escopos próprios: pergunte o que cada relatório cobre e não suponha que substituem um diagnóstico mecânico."
        ]
      },
      {
        "id": "orcamento",
        "title": "Como saber se o preço cabe no orçamento?",
        "paragraphs": [
          "A Fipe apresenta preços médios nacionais e serve como referência, não como preço obrigatório. Consulte a versão e o ano-modelo corretos, com o mês de referência. Conservação e condições de mercado podem explicar diferenças, que devem ser analisadas junto com as demais informações.",
          "Compare o desembolso completo, não apenas o anúncio. Reserve espaço para transferência, seguro, tributos aplicáveis, combustível e manutenção. Uma compra que consome toda a reserva pode deixar despesas previsíveis sem cobertura. Se houver financiamento, compare também entrada, CET e soma das parcelas."
        ]
      },
      {
        "id": "fechamento",
        "title": "O que conferir antes de fechar negócio?",
        "paragraphs": [
          "Releia a proposta com calma. Identifique quem vende, quem recebe e quais serviços estão incluídos. Combine como serão resolvidas pendências e quando ocorrerão entrega e transferência. Não aceite pressão para pular verificações nem envie valores para destinatários sem vínculo esclarecido com a operação.",
          "Na Carplus Autos, no Portão, em Curitiba, use este roteiro para organizar suas perguntas antes de conversar sobre um veículo. As imagens deste artigo são ilustrativas e não indicam disponibilidade atual."
        ],
        "bullets": [
          "Guardar anúncio, proposta, contrato e comprovantes.",
          "Registrar preço, forma de pagamento, itens entregues e condições negociadas.",
          "Confirmar destinatário e compensação do pagamento pelos próprios canais bancários.",
          "Planejar a transferência e conferir o documento final."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Quilometragem baixa basta para escolher um usado?",
        "a": "Não. Histórico de manutenção, tempo de uso, conservação e avaliação mecânica também precisam ser considerados."
      },
      {
        "q": "A consulta do Detran substitui a inspeção?",
        "a": "Não. Ela ajuda a conferir a situação cadastral e os registros disponíveis, mas não diagnostica a mecânica."
      },
      {
        "q": "A Fipe determina o preço da compra?",
        "a": "Não. A Fipe é uma referência média. O preço negociado depende do veículo e das condições da operação."
      }
    ],
    "sources": [
      {
        "name": "Detran-PR: consultar extrato de veículo",
        "url": "https://www.detran.pr.gov.br/servicos/Cidadao/IPVA/Consultar-extrato-de-veiculo-0A30boka"
      },
      {
        "name": "Fipe: como interpretar o preço médio de veículos",
        "url": "https://www.fipe.org.br/pt-br/indices/veiculos"
      }
    ],
    "cta": {
      "label": "Conversar sobre a compra de um usado",
      "href": "/contato"
    },
    "relatedSlugs": [
      "documentos-transferencia-veiculo-parana",
      "financiamento-entrada-cet-custo-total",
      "troca-venda-direta-consignacao"
    ]
  },
  {
    "slug": "documentos-transferencia-veiculo-parana",
    "title": "Documentos e transferência de veículo no Paraná",
    "description": "Entenda CRLV-e, ATPV-e, comunicação de venda e os cuidados para organizar a transferência de um carro no Paraná.",
    "category": "Documentação",
    "datePublished": "2026-11-08",
    "dateModified": "2026-11-08",
    "readingMinutes": 4,
    "answer": "A transferência de um veículo no Paraná exige conferir a situação cadastral, reunir os documentos das partes e do veículo, formalizar a venda e cumprir as etapas do Detran-PR. Assinar o recibo ou emitir a ATPV-e não significa que o registro já foi transferido.",
    "image": "/images/vehicles/renault-kardian-iconic-1-0-turbo-automatico-2026/01.webp",
    "imageAlt": "Renault Kardian preto visto de frente e de lado na Carplus Autos",
    "imageCaption": "Imagem do acervo do site da Carplus Autos. Uso ilustrativo, sem indicação de disponibilidade atual.",
    "sections": [
      {
        "id": "documentos",
        "title": "Quais documentos separar para a transferência?",
        "paragraphs": [
          "O ponto de partida é identificar o documento de transferência aplicável ao veículo e a situação de comprador e vendedor. Pessoa física, empresa, procurador e veículo de outro estado podem ter exigências diferentes. Consulte a lista oficial antes de agendar, porque um checklist genérico não cobre todas as situações.",
          "Como preparação, reúna documento de identificação e CPF, comprovante de endereço aceito, documentação do veículo e instrumento de transferência correspondente. Se houver representação, confirme os poderes e a forma exigida. Separe também os comprovantes e protocolos produzidos durante o processo."
        ],
        "bullets": [
          "Conferir nomes e dados das partes antes de preencher ou assinar.",
          "Identificar se será utilizado CRV físico ou ATPV-e.",
          "Verificar exigências para empresa, procuração ou registro em outro estado.",
          "Consultar débitos e restrições antes de marcar a conclusão."
        ]
      },
      {
        "id": "atpve",
        "title": "Qual é a diferença entre CRLV-e e ATPV-e?",
        "paragraphs": [
          "O CRLV-e é o documento de registro e licenciamento. A ATPV-e é a autorização utilizada para formalizar a transferência. Um arquivo não substitui o outro. O Detran-PR orienta a emissão da ATPV-e para documentos emitidos a partir de 1º de janeiro de 2021.",
          "Antes de emitir, revise a identificação do comprador, os dados do veículo e as informações da venda. No procedimento aplicável ao seu caso, confirme como as assinaturas serão feitas e validadas. Não presuma que qualquer assinatura eletrônica é aceita nem que todo processo pode ser concluído sem atendimento presencial."
        ]
      },
      {
        "id": "etapas",
        "title": "Como organizar o processo sem perder etapas?",
        "paragraphs": [
          "Monte uma sequência com responsabilidades e datas. Primeiro, verifique o cadastro e o documento aplicável. Depois, combine a formalização, os pagamentos e a entrega. Siga as orientações oficiais para vistoria, atendimento, taxas e conclusão. Ao final, confira se a mudança aparece no registro e se o documento está correto.",
          "Não trate um comprovante de agendamento como confirmação de conclusão. Acompanhe o protocolo até o fim e guarde os documentos em local seguro. Se um terceiro cuidar do procedimento, peça a identificação do serviço, os comprovantes e a informação sobre o que ainda falta."
        ],
        "bullets": [
          "Consultar a lista atualizada do serviço antes de sair de casa.",
          "Confirmar se é necessário agendar atendimento em Curitiba.",
          "Discriminar taxas oficiais e honorários de eventual prestador.",
          "Revisar os dados do documento emitido e solicitar correção se necessário."
        ]
      },
      {
        "id": "prazo",
        "title": "Qual é o prazo de transferência no Paraná?",
        "paragraphs": [
          "A página oficial consultada em 8 de novembro de 2026 apresenta a regra geral de 30 dias e informa, para o Paraná, o prazo de 60 dias conforme o Despacho nº 450/2024. Como a própria página distingue essas referências, confirme com o Detran-PR o prazo aplicável à sua operação, especialmente em casos interestaduais.",
          "Organize o procedimento desde a assinatura e não espere o último dia. Pendências documentais ou necessidade de correção podem exigir novos atendimentos. Este texto é uma orientação geral de organização, não uma análise jurídica do seu caso nem autorização para adiar obrigações."
        ]
      },
      {
        "id": "comunicacao",
        "title": "Quem deve comunicar a venda?",
        "paragraphs": [
          "O Detran-PR atribui a comunicação de venda ao vendedor. O registro da intenção de venda, usado para emitir a ATPV-e, não dispensa essa comunicação. Confira se ela foi efetivada e mantenha o comprovante: entregar as chaves e confiar apenas no compromisso do comprador deixa uma etapa importante sem verificação.",
          "Comprador e vendedor devem combinar como acompanharão cada etapa. Um contrato pode organizar responsabilidades entre as partes, mas não substitui os procedimentos exigidos pelo órgão de trânsito. Na dúvida, use os canais oficiais e explique a situação concreta do veículo."
        ]
      },
      {
        "id": "custos",
        "title": "Como planejar os custos e evitar retrabalho?",
        "paragraphs": [
          "Confira as taxas vigentes no momento da operação. Além dos valores oficiais, podem existir serviços contratados à parte, conforme o procedimento escolhido. Peça a discriminação por escrito e confirme o que está incluído antes de autorizar qualquer serviço.",
          "Leve uma lista de dúvidas à negociação: quem providencia cada documento, quem paga cada despesa, quais pendências precisam ser resolvidas e como será comprovada a conclusão. Essa organização ajuda tanto na compra particular quanto na conversa com uma loja no Portão ou em outro bairro de Curitiba."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Emitir a ATPV-e conclui a transferência?",
        "a": "Não. A emissão é uma etapa. É necessário cumprir o procedimento e confirmar a alteração do registro."
      },
      {
        "q": "Intenção de venda e comunicação de venda são iguais?",
        "a": "Não. O próprio Detran-PR esclarece que registrar a intenção não dispensa comunicar a venda."
      },
      {
        "q": "Existe um preço único informado neste guia?",
        "a": "Não. Consulte as taxas oficiais vigentes e separe eventuais serviços contratados à parte."
      }
    ],
    "sources": [
      {
        "name": "Detran-PR: transferir propriedade de veículo",
        "url": "https://www.detran.pr.gov.br/servicos/Veiculo/Compra-e-venda/Transferir-propriedade-de-veiculo-ERrZE36k"
      },
      {
        "name": "Detran-PR: registrar intenção de venda e emitir ATPV-e",
        "url": "https://www.detran.pr.gov.br/servicos/Veiculo/Compra-e-venda/Registrar-intencao-de-venda-do-veiculo-K03YMj34"
      },
      {
        "name": "Detran-PR: comunicar venda de veículo",
        "url": "https://www.detran.pr.gov.br/servicos/Veiculo/Compra-e-venda/Comunicar-venda-de-veiculo-jlNDgog1"
      }
    ],
    "cta": {
      "label": "Tirar dúvidas sobre a documentação",
      "href": "/contato"
    },
    "relatedSlugs": [
      "checklist-comprar-carro-usado-curitiba",
      "financiamento-entrada-cet-custo-total",
      "troca-venda-direta-consignacao"
    ]
  },
  {
    "slug": "financiamento-entrada-cet-custo-total",
    "title": "Financiamento de carro: entrada, CET e custo total",
    "description": "Aprenda a comparar propostas de financiamento de veículo olhando entrada, prazo, CET e desembolso total, além do valor da parcela.",
    "category": "Financiamento",
    "datePublished": "2026-11-08",
    "dateModified": "2026-11-08",
    "readingMinutes": 4,
    "answer": "Para comparar financiamentos de carro, peça propostas com o mesmo valor financiado e prazo. Avalie entrada, CET, quantidade de parcelas e desembolso total. Uma prestação menor pode resultar de um prazo maior e não significa, sozinha, uma compra mais barata.",
    "image": "/images/vehicles/toyota-corolla-cross-xrx-1-8-hibrido-automatico-2025/01.webp",
    "imageAlt": "Toyota Corolla Cross cinza em frente à fachada da Carplus Autos",
    "imageCaption": "Imagem do acervo do site da Carplus Autos. Uso ilustrativo, sem indicação de disponibilidade atual.",
    "sections": [
      {
        "id": "entrada",
        "title": "Como escolher o valor da entrada?",
        "paragraphs": [
          "A entrada reduz a parte da compra que será financiada. Mantidas as outras condições, financiar menos tende a reduzir os juros pagos em reais. Mas usar toda a reserva pode comprometer despesas que aparecem logo após a compra, como seguro, documentação e manutenção inicial.",
          "Comece pelo dinheiro disponível depois de preservar uma reserva compatível com sua realidade. Não existe neste guia um percentual de entrada ideal para todos. Compare cenários e peça a proposta efetiva: as condições dependem da instituição, do veículo e da análise de crédito. Simulação não equivale a aprovação."
        ]
      },
      {
        "id": "cet",
        "title": "O que é CET e por que ele importa?",
        "paragraphs": [
          "CET significa Custo Efetivo Total. Segundo o Banco Central, ele considera os encargos e despesas da operação, como juros, tarifas, tributos e outros custos aplicáveis. Por isso, comparar apenas a taxa de juros anunciada pode esconder diferenças importantes entre propostas.",
          "Solicite o CET anual e o demonstrativo de cálculo antes da contratação. A Resolução CMN nº 4.881 trata da apuração e da informação desse custo. Compare propostas equivalentes e verifique também os valores em reais: a taxa ajuda a comparar o crédito, enquanto o desembolso total mostra o impacto no orçamento."
        ]
      },
      {
        "id": "comparacao",
        "title": "O que colocar lado a lado nas propostas?",
        "paragraphs": [
          "Organize uma ficha por proposta e registre a data. Se o prazo ou a entrada mudar, destaque essa diferença antes de concluir qual opção é melhor. Confira também se as parcelas são iguais, quando vencem e se existe algum pagamento final diferente.",
          "Leia cada serviço adicional separadamente. Pergunte quais itens fazem parte do crédito, quais foram contratados à parte e quais são opcionais. Uma explicação verbal não substitui os valores e as condições no documento que você vai assinar."
        ],
        "bullets": [
          "Preço do veículo e valor da entrada.",
          "Valor financiado e despesas incorporadas ao saldo.",
          "Taxa de juros, CET anual e demonstrativo de cálculo.",
          "Número, valor e datas das parcelas, incluindo eventual parcela final.",
          "Custos pagos fora das parcelas e condições de produtos adicionais.",
          "Condições de atraso, liquidação antecipada e garantias do contrato."
        ]
      },
      {
        "id": "custo-total",
        "title": "Como calcular o desembolso total da compra?",
        "paragraphs": [
          "Some a entrada, todas as parcelas e os custos pagos separadamente para realizar a compra. Se as prestações forem iguais, multiplique o valor de uma pelo número de pagamentos. Se forem diferentes, some cada valor. Não conte uma despesa duas vezes quando ela já estiver embutida nas parcelas.",
          "Faça uma segunda conta para manter o carro: combustível, estacionamento, seguro, tributos e manutenção prevista. Esses gastos não são todos componentes do CET do financiamento, mas precisam caber no orçamento mensal. Uma proposta pode ter crédito competitivo e ainda assim ser pesada para sua renda.",
          "Use valores comprovados ou estimativas identificadas como estimativas. Peça cotações e revise a conta caso mude o veículo escolhido. A comparação fica mais útil quando todos os custos estão na mesma folha, em vez de espalhados por mensagens e anúncios."
        ]
      },
      {
        "id": "prazo",
        "title": "Vale a pena alongar o financiamento?",
        "paragraphs": [
          "Um prazo maior pode reduzir a prestação, mas também prolonga o compromisso e pode elevar o total de juros. O resultado depende da taxa e das demais condições de cada proposta. Compare o total final e não escolha automaticamente o maior prazo disponível.",
          "Teste uma situação de renda menor ou de despesa inesperada. Pergunte se a parcela continuaria administrável e quanto sobraria depois das despesas essenciais. Se o orçamento ficar apertado, considere rever a faixa de preço do carro ou aguardar para aumentar a entrada."
        ]
      },
      {
        "id": "assinatura",
        "title": "O que conferir antes de assinar?",
        "paragraphs": [
          "Confira quem é a instituição credora e leia a versão final do contrato. Verifique se entrada, prazo, serviços e valores correspondem à proposta aceita. Peça explicação para qualquer diferença e guarde uma cópia completa, junto com o demonstrativo do CET.",
          "As informações deste artigo são educativas. Não representam oferta de crédito da Carplus Autos, taxa disponível, promessa de aprovação ou recomendação individual. Ao conversar sobre financiamento em Curitiba, solicite as condições concretas e avalie se atendem ao seu orçamento."
        ]
      }
    ],
    "faqs": [
      {
        "q": "O menor juro significa o menor custo?",
        "a": "Não necessariamente. Compare o CET, os custos em reais e o total a pagar em propostas equivalentes."
      },
      {
        "q": "A parcela menor é sempre melhor?",
        "a": "Não. Ela pode vir acompanhada de mais parcelas e maior desembolso total."
      },
      {
        "q": "Simulação garante aprovação?",
        "a": "Não. A contratação depende da análise e das condições da instituição responsável."
      }
    ],
    "sources": [
      {
        "name": "Banco Central: cuidados ao contratar crédito",
        "url": "https://www.bcb.gov.br/meubc/faqs/p/cuidados-na-hora-de-contratar-uma-operacao-de-credito"
      },
      {
        "name": "Banco Central: Resolução CMN nº 4.881, sobre o CET",
        "url": "https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=4881&tipo=Resolu%C3%A7%C3%A3o+CMN"
      }
    ],
    "cta": {
      "label": "Conversar sobre as opções de compra",
      "href": "/contato"
    },
    "relatedSlugs": [
      "checklist-comprar-carro-usado-curitiba",
      "documentos-transferencia-veiculo-parana",
      "troca-venda-direta-consignacao"
    ]
  },
  {
    "slug": "troca-venda-direta-consignacao",
    "title": "Troca, venda direta ou consignação: como escolher?",
    "description": "Compare troca, venda direta e consignação de veículo pelo valor líquido, pelo prazo e pelas responsabilidades antes de decidir.",
    "category": "Venda e troca",
    "datePublished": "2026-11-08",
    "dateModified": "2026-11-08",
    "readingMinutes": 4,
    "answer": "A troca pode simplificar a compra do próximo carro; a venda direta exige conduzir a negociação; e a consignação envolve um intermediário nas condições do contrato. Compare o valor líquido a receber, o tempo disponível e as responsabilidades de cada modalidade antes de escolher.",
    "image": "/images/vehicles/ford-edge-titanium-3-5-v6-awd-automatico-2016/01.webp",
    "imageAlt": "Ford Edge branco visto de frente e de lado no showroom da Carplus Autos",
    "imageCaption": "Imagem do acervo do site da Carplus Autos. Uso ilustrativo, sem indicação de disponibilidade atual.",
    "sections": [
      {
        "id": "troca",
        "title": "Quando faz sentido dar o carro na troca?",
        "paragraphs": [
          "Na troca, o valor atribuído ao veículo atual entra na composição da compra de outro. A conveniência pode estar em coordenar avaliação, pagamento da diferença e entrega na mesma negociação. Isso não significa que qualquer oferta de troca seja a melhor opção financeira.",
          "Peça os números separados: preço do carro desejado, avaliação do seu usado, diferença a pagar e despesas da operação. Se houver financiamento, acrescente o custo do crédito. Uma avaliação aparentemente alta pode perder vantagem se o outro veículo ou os encargos ficarem mais caros.",
          "Compare a proposta completa com um cenário de venda do carro atual e compra posterior. Considere também como você se deslocaria durante um intervalo sem veículo. O custo e o transtorno dessa espera podem ser relevantes na sua rotina em Curitiba."
        ]
      },
      {
        "id": "venda-direta",
        "title": "O que muda na venda direta?",
        "paragraphs": [
          "A expressão pode se referir à venda ao comprador final ou à venda do carro para uma empresa, sem adquirir outro na mesma operação. Identifique qual situação está sendo proposta. Em qualquer caso, preço, forma de pagamento, entrega e documentação precisam ficar claros.",
          "A venda para particular pode exigir anúncio, atendimento, visitas, verificação de propostas e acompanhamento da transferência. A venda para uma loja pode concentrar parte dessas etapas, mas prazo e valor dependem da oferta concreta. Não existe garantia de que uma modalidade sempre pagará mais.",
          "Organize visitas com segurança e proteja documentos pessoais. Antes da entrega, confirme o recebimento pelo seu próprio canal bancário. Imagem de comprovante ou promessa de pagamento não é confirmação de dinheiro disponível. Se houver intermediário, esclareça por escrito quem compra, quem paga e quem receberá o veículo."
        ]
      },
      {
        "id": "consignacao",
        "title": "Como avaliar uma proposta de consignação?",
        "paragraphs": [
          "Na consignação, o veículo é colocado à disposição de um intermediário para venda conforme um contrato. O acordo deve esclarecer preço, remuneração, custódia e repasse. Não confunda deixar o carro em exposição com já ter vendido e recebido.",
          "Leia o contrato antes de entregar chaves e documentos. Se algum ponto estiver ausente, solicite esclarecimento por escrito. Não presuma que seguro, preparação, reparos ou transporte estão incluídos. A oferta e as condições de consignação precisam ser confirmadas com a empresa escolhida."
        ],
        "bullets": [
          "Qual é o valor líquido combinado e como a comissão será calculada?",
          "Quem pode autorizar descontos e serviços pagos?",
          "Quem fica responsável pela guarda, pelos testes e por eventuais danos?",
          "Existe cobertura de seguro e quais são suas condições?",
          "Qual é o prazo de repasse após a venda e como ele será comprovado?",
          "Há exclusividade, prazo mínimo, custo de retirada ou regra de encerramento?"
        ]
      },
      {
        "id": "avaliacao",
        "title": "Como usar a Fipe sem transformar referência em promessa?",
        "paragraphs": [
          "A Fipe informa médias nacionais e ressalta que os preços praticados variam conforme características do veículo e condições de mercado. Use a versão e o ano-modelo corretos no mês consultado. O número ajuda a iniciar a comparação, mas não determina quanto alguém pagará pelo seu carro.",
          "Leve à avaliação os registros de manutenção disponíveis e informe o estado do veículo com precisão. Pergunte como foram considerados conservação, despesas identificadas e condições da oferta. Compare valores líquidos, descontando apenas custos efetivamente informados, sem presumir percentuais de comissão ou descontos padrão."
        ]
      },
      {
        "id": "decisao",
        "title": "Qual modalidade combina com a sua prioridade?",
        "paragraphs": [
          "Se precisa de outro carro e quer coordenar as entregas, compare propostas de troca. Se tem tempo para acompanhar interessados, avalie a venda direta. Se prefere intermediação, examine contratos de consignação e o prazo de recebimento. Nenhuma dessas escolhas dispensa verificar documentos e pagamentos.",
          "O Detran-PR orienta que o vendedor faça a comunicação de venda. Depois da negociação, acompanhe essa etapa e a transferência, guardando os respectivos comprovantes. A modalidade comercial escolhida não substitui a regularização do registro.",
          "Para conversar com a Carplus Autos, no Portão, reúna os dados básicos do carro e suas prioridades de prazo e pagamento. Este guia compara modalidades de mercado; não anuncia aceitação garantida, comissão, prazo de venda ou disponibilidade de um serviço específico."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Consignação garante uma data de venda?",
        "a": "Não. Verifique o que o contrato prevê, sem presumir prazo ou preço garantido."
      },
      {
        "q": "O que devo comparar além da avaliação?",
        "a": "Valor líquido, despesas, prazo de recebimento, segurança do pagamento e responsabilidades durante a negociação."
      },
      {
        "q": "Na troca também preciso cuidar da transferência?",
        "a": "Sim. Confirme as etapas de documentação e comunicação de venda aplicáveis, mesmo que outra parte auxilie no processo."
      }
    ],
    "sources": [
      {
        "name": "Fipe: como interpretar o preço médio de veículos",
        "url": "https://www.fipe.org.br/pt-br/indices/veiculos"
      },
      {
        "name": "Detran-PR: comunicar venda de veículo",
        "url": "https://www.detran.pr.gov.br/servicos/Veiculo/Compra-e-venda/Comunicar-venda-de-veiculo-jlNDgog1"
      }
    ],
    "cta": {
      "label": "Conversar sobre venda ou troca",
      "href": "/contato"
    },
    "relatedSlugs": [
      "checklist-comprar-carro-usado-curitiba",
      "documentos-transferencia-veiculo-parana",
      "financiamento-entrada-cet-custo-total"
    ]
  }
];
