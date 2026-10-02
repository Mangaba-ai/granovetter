# Arcabouço Teórico

**Granovetter** · Synthetic Behavioral Inference Lab
Fundamentação do grano.Protocol para o Conselho Científico
Versão 2 · 30 de setembro de 2026

---

## Nota de leitura

Este documento deixa explícito o que o Granovetter afirma, qual teoria e qual evidência sustentam cada afirmação, e onde estão as fronteiras abertas. É a espinha de um programa de pesquisa, escrita para ser atacada por vocês.

A organização é deliberada. Cada seção sobe um degrau: a postura do laboratório, a arquitetura do método, a teoria que o fundamenta, a implementação computacional, a escada de afirmações e a validação. Em cada afirmação, a parte que mais importa não é "o que sustenta", é a fronteira aberta. É lá que o julgamento de vocês vale mais.

Uma palavra sobre o momento do campo. A simulação social com modelos de linguagem viveu, entre 2023 e 2025, uma fase de entusiasmo seguida de uma exigência de validação mais dura. O Granovetter nasce depois dessa virada e por isso trata rigor como posição, não como adorno. O protocolo inteiro não é aberto aqui, mas o arcabouço teórico é auditável.

---

## A postura do laboratório

A inteligência artificial, para o Granovetter, não é produto. É objeto de estudo. Não interessa a inteligência do modelo, interessa o comportamento humano que emerge quando ele é colocado para se comportar como gente. Quem quer produto pergunta ao modelo o que vai acontecer. O Granovetter não pergunta: constrói uma sociedade sintética e observa o que emerge dela.

Disso decorre a postura epistêmica. O Granovetter simula e antecipa múltiplos futuros prováveis. Testa hipóteses e compara cenários sob incerteza, porque a realidade é um lugar caro demais para testar uma hipótese. O resultado nunca é um veredito binário do tipo "faça ou não faça". É probabilístico e distributivo, na forma "alta probabilidade de resistência forte nas primeiras semanas, que cede se a liderança comunicar antes". Probabilidade sobre um campo de futuros, não adivinhação de um ponto.

Metodologicamente, o que o Granovetter produz é validação de construto: o comportamento simulado é comparado a referências externas e a dados reais. Não é inferência causal, que exigiria desenho experimental, e o laboratório não a reivindica. Essa disciplina é o que separa o Granovetter de um prompt bem-feito com resposta convincente, e resposta convincente é exatamente o que um modelo de linguagem faz de melhor, inclusive quando está errado.

---

## Arquitetura: grano.Protocol, grano.Mind, grano.Vitro

Três peças, três funções distintas.

**grano.Protocol** é o método. Define como o dado real vira um agente sintético, como o agente entra no ambiente, como o estímulo é aplicado, quantas rodadas de interação acontecem, quanta incerteza entra de propósito e como os resultados são comparados no fim. É o que impede que a simulação seja intuição vestida de ciência.

**grano.Mind** é o modelo de IA do Granovetter, ajustado (fine-tuning) sobre dados comportamentais reais brasileiros para simular padrões de comportamento, não para assistir ou conversar. Roda os agentes da simulação com base empírica em vez de improviso do modelo genérico.

**grano.Vitro** (o TANQUE) é o motor de simulação. Executa a dinâmica de opinião em duas rodadas de Silicon Sampling (projeção individual e projeção pós-exposição social), com um canal público onde os agentes se observam, consolidação por método Delphi e replicação Monte Carlo para estabilizar o resultado.

---

## As três esferas de atuação

O mesmo motor, três domínios. As esferas compartilham teoria, modelo e engine; mudam a fonte de dados e a pergunta.

| Esfera | Domínio | Pergunta que responde |
|---|---|---|
| **grano.Tropic** | Interior de organizações | Como cultura, decisão e mudança se propagam dentro de uma empresa específica |
| **grano.Opsis** | Mercado | Como marca, promessa e posicionamento são aceitos, resistidos ou ressignificados |
| **grano.Polis** | População e esfera pública | Como uma política ou mensagem se comporta numa população (inclui modo eleitoral, grano.Urna) |

A esfera de maior propriedade intelectual e maior exposição é a **grano.Tropic**: simular o interior de uma organização específica, ancorado em dado cultural real, é onde a literatura é mais rala e onde o Granovetter tem menos concorrência e mais a provar.

---

## A teoria-mãe: Lewin e o campo de forças

A estrutura que unifica tudo é a **Teoria de Campo de Kurt Lewin** e sua **Análise de Campo de Forças** (Force Field Analysis, 1947). Ela é a protagonista do arcabouço do mesmo modo que uma matriz central organiza teses embutidas atrás dela.

Duas ideias de Lewin fazem o trabalho. A primeira: comportamento é função da pessoa e do ambiente juntos, nunca da pessoa isolada (B = f(P, E)). Isso é, ao pé da letra, a tese do Granovetter de que não se simulam indivíduos isolados, e sim sistemas em interação. A segunda: toda situação está parada num equilíbrio entre forças que empurram a favor da mudança (propulsoras) e forças que resistem (restritivas). A mudança não vem de empurrar mais, vem de remover restrição. Uma decisão desloca esse equilíbrio, e o indicador de topo do Granovetter, o **Balanço de Forças**, lê para que lado o campo pende.

O campo é bilateral, cinco forças de cada lado:

- **Propulsoras:** engajamento, adesão, qualidade, inovação, produtividade.
- **Restritivas:** atrito, risco, resistência, ruído, desgaste.

Lewin dá duas coisas ao laboratório de uma vez: autoridade, por ser o pai da psicologia social e da gestão de mudança (Kotter, ADKAR e o resto descendem dele), e um medidor por natureza, já que o campo de forças é, ele próprio, um termômetro. Não é decoração acadêmica: é a origem teórica de tratar organização como campo.

---

## As teorias que preenchem o campo

Lewin é a estrutura. Cada força é preenchida por uma teoria específica e mensurável.

- **Timur Kuran, falsificação de preferências.** As pessoas escondem o que realmente pensam quando percebem risco social. É o que separa a opinião declarada da opinião privada, e explica por que uma mudança pode parecer estável e virar em cascata de repente.
- **Elisabeth Noelle-Neumann, espiral do silêncio.** Quem se percebe em minoria cala, e o silêncio de muitos parece consenso. Modela o ruído que não aparece nas pesquisas convencionais.
- **Damon Centola, contágio complexo e massa crítica.** Adesão comportamental exige reforço social de várias fontes, não uma exposição única, e vira o jogo a partir de um limiar de minoria comprometida. Modela quando a resistência cede.
- **Kahneman e Tversky, aversão à perda e desvio sistemático.** Perdas pesam mais que ganhos equivalentes. Justifica que o núcleo de custo do campo puxe legitimamente mais que o núcleo de resultado, e que os polos sejam assimétricos por teoria, não por estética.
- **Albert Hirschman, saída, voz e lealdade.** Diante de uma decisão que desagrada, uma pessoa sai, reclama ou fica quieta. Organiza as respostas possíveis à mudança em três destinos mensuráveis.

Em volta desse núcleo, o arcabouço integra a economia comportamental e a psicologia social mais amplas (Asch, Sapolsky, Coyle, Pentland, Thaler) como leitura de apoio, não como coluna.

---

## A implementação computacional

A teoria vira simulação por modelagem baseada em agentes, na linhagem de **Schelling, Axelrod e Epstein**: comportamento coletivo complexo emerge de regras locais simples. A implementação com modelos de linguagem segue **Park et al. (2023)**, os agentes generativos, e o **Silicon Sampling** de **Argyle et al. (2023)** e **Horton**, que usam o modelo para simular amostras humanas a partir de perfis.

O que o Granovetter acrescenta a essa linhagem:

1. **Grounding em dado real.** Os agentes não saem do vazio do modelo genérico. O grano.Mind é ajustado sobre dados comportamentais reais, o que reduz o viés de baseline e o achatamento de distribuição que assombram a simulação com modelos crus.
2. **Regras de interação vindas de teoria.** As dinâmicas de campo (Lewin) e as cinco teorias acima operam como regras de revisão de posição dos agentes entre rodadas, não como prompt solto.
3. **Duas rodadas com delta.** A primeira rodada (R1) projeta a posição individual. A segunda (R2) projeta a posição depois da exposição social controlada. O delta entre R1 e R2 é o sinal central: revela conformismo, resistência e narrativa emergente. É a diferença que nenhum concorrente mede.
4. **Consolidação.** Delphi para convergência e replicação Monte Carlo para estabilizar o resultado contra a variabilidade de rodada.

---

## A escada de afirmações

Três afirmações sustentam o método, em ordem de dependência. Cada uma vem com o que a sustenta e com a fronteira que o Conselho ajuda a fechar.

### Afirmação 1 · Fidelidade individual

Um modelo de linguagem ancorado em dados reais de uma pessoa reproduz o comportamento dela com fidelidade usável.

**Sustenta:** Park et al. (2024) construíram agentes a partir de entrevistas e surveys de 1.052 pessoas e mediram a acurácia contra a consistência teste-reteste de duas semanas dos próprios participantes. Os agentes ancorados em entrevista mais survey atingiram 86% dessa consistência, contra 74% dos baseados só em dados demográficos, e o grounding reduziu o viés de acurácia entre grupos. É a base empírica do princípio de ancorar o syn em dado real.

**Fronteira aberta:** a fidelidade individual perde força fora de amostras bem representadas e é sensível ao achatamento de variância do modelo cru (Bisbee et al., 2024). O Granovetter trata isso com fine-tuning em dado real e com um validador de fidelidade que guarda contra esse achatamento.

### Afirmação 2 · Emergência coletiva

Conjuntos de agentes reproduzem dinâmica de grupo (conformismo, homofilia, formação de comunidade) sem serem instruídos a isso.

**Sustenta:** He et al. (2026, British Journal of Psychology) mostraram homofilia emergindo sozinha numa sociedade de chatbots, sem prompt sobre como humanos interagem. No grano.Vitro, as quatro dinâmicas centrais (espiral do silêncio, cascata de preferências, saída-voz-lealdade e massa crítica) foram testadas e confirmadas como fenômenos que emergem das regras, não que são forçados nelas. É o lastro do delta R1 para R2.

**Fronteira aberta:** garantir que a dinâmica coletiva simulada corresponda à real e não a um artefato amplificado do viés do modelo. É a pergunta central para o Conselho, e a razão de o peso epistêmico do Granovetter estar no coletivo, onde a simulação é mais defensável, mais do que na trajetória de uma persona isolada.

### Afirmação 3 · Aplicação às três esferas

A mesma máquina se aplica ao interior de uma organização (grano.Tropic), ao mercado (grano.Opsis) e à população (grano.Polis).

**Sustenta:** para o mercado e a população, a linhagem de Silicon Sampling e de agentes generativos já cobre boa parte do caminho. Para o interior organizacional, o análogo publicado mais próximo é Zhu et al. (2024), simulação de comportamento organizacional com agentes de linguagem. O diferencial do Granovetter é o grounding em dado cultural real e específico da organização, contra concorrentes que simulam audiências externas ou genéricas.

**Fronteira aberta:** a grano.Tropic é território de validação mínima na literatura, e o contexto organizacional traz um problema próprio, a sicofância e o efeito de demanda: um agente que sabe estar "na empresa X" tende a responder o que agrada. É a fronteira de maior IP e maior risco, tratada como programa de pesquisa, não como fato consumado.

---

## Validação e fronteiras

O Granovetter valida por construto, comparando comportamento simulado a referências externas.

- **Referência externa.** Correlação de construto de pearson_r 0.788 contra o AgentSociety.
- **Contribuição da identidade.** Validação por permutação na metodologia de Thalmann, Binz e Schulz confirmou que a identidade do agente contribui informação preditiva (+0.193 R²) e que perfis não vistos generalizam tão bem quanto perfis vistos.
- **Guarda de fidelidade.** Um validador dedicado protege contra o achatamento de distribuição documentado por Bisbee et al.

Corroboração externa das afirmações: Park et al. (2024) para a fidelidade individual, He et al. (2026) para a emergência coletiva.

As fronteiras honestas, que são onde o Conselho entra, estão listadas na seção final.

---

## O campo: AI Behavioral Science

O Granovetter é um laboratório de AI Behavioral Science, o campo que trata sistemas de IA como objeto empírico de estudo comportamental. A linhagem vem do "Machine Behaviour" de Rahwan et al. (2019, Nature). O campo, já com contorno próprio, opera em três frentes, e o Granovetter atua nas três ao mesmo tempo: usar IA para avançar a ciência comportamental, usar a ciência comportamental para estudar e desenhar a IA, e entender como IA e humanos se influenciam ao interagir.

A consequência prática dessa identidade é a doutrina de validação. Como o próprio modelo tem comportamento e viés que se misturam ao sinal humano, caracterizar e descontar esse viés não é opcional, é parte do método.

---

## Tabela-resumo

| Camada | Afirmação | O que sustenta | Fronteira aberta |
|---|---|---|---|
| Teoria-mãe | Comportamento é um campo de forças propulsoras e restritivas | Lewin, Force Field Analysis; B = f(P,E) | Traduzir o campo em métrica estável entre rodadas |
| Forças | Cada força tem teoria própria e mensurável | Kuran, Noelle-Neumann, Centola, Kahneman-Tversky, Hirschman | Calibrar peso relativo das forças por domínio |
| Fidelidade individual | LLM ancorado em dado real reproduz uma pessoa | Park 2024 (86% vs teste-reteste), Argyle 2023, Park 2023 | Variância comprimida; guardada por fine-tuning e validador de fidelidade |
| Emergência coletiva | Grupos de agentes reproduzem dinâmica social sozinhos | He 2026; emergência das 4 dinâmicas confirmada no grano.Vitro | Correspondência coletivo simulado vs real; delta pode nascer comprimido |
| Aplicação (3 esferas) | Mesma máquina: grano.Tropic, grano.Opsis, grano.Polis | Zhu 2024 (org); Silicon Sampling (mercado/população) | Interior organizacional pouco validado; sicofância |
| Campo | Lab de AI Behavioral Science | Rahwan 2019; campo consolidado em 2025 | Ausência de padrão metodológico único; daí a validação cruzada |

---

## Bibliografia de coluna

Enxuta e por função. Alguns detalhes bibliográficos ainda precisam de conferência final antes de circular (ver nota ao fim).

**Teoria comportamental (o campo de forças e o que o preenche)**
1. Lewin, K. (1947). *Frontiers in Group Dynamics* / Field Theory e Force Field Analysis.
2. Kuran, T. (1995). *Private Truths, Public Lies* (falsificação de preferências).
3. Noelle-Neumann, E. (1974). *The Spiral of Silence*.
4. Centola, D. (2018). *How Behavior Spreads* / massa crítica e ponto de virada (Science, 2018).
5. Kahneman, D. e Tversky, A. (1979). *Prospect Theory* (aversão à perda).
6. Hirschman, A. O. (1970). *Exit, Voice, and Loyalty*.

**Linhagem da simulação (modelagem por agentes e LLM)**
7. Schelling, T. (1971); Axelrod, R. (1984); Epstein, J. (1996). Fundações da modelagem baseada em agentes.
8. Park, J. S. et al. (2023). *Generative Agents: Interactive Simulacra of Human Behavior*. arXiv:2304.03442.
9. Argyle, L. P. et al. (2023). *Out of One, Many: Using Language Models to Simulate Human Samples*. Political Analysis (Silicon Sampling).
10. Horton, J. J. (2023). *Large Language Models as Simulated Economic Agents*.
11. Park, J. S. et al. (2024). *LLM Agents Grounded in Self-Reports Enable General-Purpose Simulation of Individuals*. arXiv:2411.10109.

**Validação e limites**
12. He, J. K. et al. (2026). *Artificial Intelligence Chatbots Mimic Human Collective Behaviour*. British Journal of Psychology.
13. Zhu, C. et al. (2024). *Generative Organizational Behavior Simulation ... A Holacracy Perspective*. arXiv:2408.11826.
14. Bisbee, J. et al. (2024). Distribuições estreitas de opinião em LLMs (guarda de fidelidade).
15. Thalmann, Binz e Schulz. Validação por permutação da contribuição de identidade.
16. Anthis, J. R. et al. (2025). *LLM Social Simulations Are a Promising Research Method*. ICML. arXiv:2504.02234.
17. Rahwan, I. et al. (2019). *Machine Behaviour*. Nature.

**Reservatório (fundo de poço, não coluna)**
- Awesome-LLM-in-Social-Science (simulação e validade social).
- Awesome-LLM-Psychometrics (validade de traço e de instrumento dos agentes).
- A newsletter grano.Thesis, caderno de pesquisa do laboratório.

---

## Onde precisamos do Conselho

O documento termina com as perguntas abertas que valem o tempo de vocês.

1. **O delta comprimido.** Se a variância individual nasce achatada, como desenhar o segundo round para que a resistência coletiva não seja subestimada? Amostragem, fine-tuning para restaurar variância, validação cruzada entre modelos?
2. **Validação da grano.Tropic.** Qual seria um protocolo mínimo defensável para validar o interior organizacional, dado que não há benchmark público de interior de empresa?
3. **Sicofância em contexto organizacional.** Como detectar e descontar o efeito de demanda quando o agente sabe em que organização está inserido?
4. **A fronteira do indivíduo.** Onde, exatamente, o Granovetter para de afirmar fidelidade individual e passa a afirmar apenas distribuição coletiva?

---

## Nota sobre citações

Esta versão foi montada para discussão. Alguns detalhes bibliográficos (ano exato, veículo, páginas) ainda precisam de conferência final antes de qualquer circulação para fora do Conselho. Citação errada na frente de cientistas custa caro, então o passo seguinte é fechar a bibliografia com precisão.
