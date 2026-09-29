# Sobre Granovetter

## Por que esse nome?

**Granovetter** é nomeado em homenagem a **Mark Granovetter**, sociólogo clássico cujo trabalho é fundamental para entender dinâmica social e comportamento coletivo.

## Mark Granovetter (1943–)

### Contribuições Principais

1. **Social Thresholds** (Limiares Sociais)
   - Cada pessoa tem um "limiar" — o número mínimo de outros que precisam adotar algo antes que ela adote
   - Limiares variam entre indivíduos
   - Pequenas mudanças em limiares podem criar grandes mudanças em comportamento coletivo

2. **Tipping Points** (Pontos de Inflexão)
   - Um ponto crítico onde comportamento coletivo muda abruptamente
   - Não é linear: 30% adotando não leva a 40% inevitavelmente
   - Mas em algum ponto, passa-se de "minoria" para "maioria" rapidamente

3. **Behavioral Cascades** (Cascatas Comportamentais)
   - Como opiniões se propagam através de grupos
   - Efeito de informação: pessoas veem outros adotando e assumem é uma boa ideia
   - Efeito de reputação: pessoas adotam para não parecerem atrasadas

4. **Strength of Weak Ties** (Força dos Laços Fracos)
   - Conexões fracas (conhecidos distantes) propagam inovações melhor que laços fortes
   - Grupos com laços fracos são mais inovadores

### Trabalho Seminal

- **"Threshold Models of Collective Behavior"** (1978)
  - Publicado em *Journal of Mathematical Sociology*
  - Fornece modelo matemático de como grupos mudam de opinião
  - Base teórica para Granovetter

- **"The Strength of Weak Ties"** (1973)
  - Como informação circula em redes sociais
  - Por que conexões fracas são críticas para mudança

## Como Granovetter se Aplica a Simulação Organizacional

### Tipping Points Organizacionais

Quando uma empresa testa uma decisão (ex: trabalho remoto), as questões são:

- **Qual é o limiar de cada grupo?**
  - Líderes técnicos: "Se 70% da eng. quer remoto, vou me conformar"
  - Operações: "Se a executiva diz sim, preciso de suporte"
  - Jovens talentos: "Estou pronto hoje!"

- **Quando temos tipping point?**
  - 30% adoção não gera mudança
  - Mas em 60%, pode haver cascata social rápida

- **Quem são os influenciadores?**
  - Nem sempre são os líderes formais
  - Pessoas influentes em redes (laços fracos)

### Simulação via Granovetter

O projeto **Granovetter** simula exatamente isso:

1. **Round 1**: Individual thresholds (O que cada grupo quer?)
2. **Round 2+**: Cascatas sociais (Como opiniões mudam com pressão de grupo?)
3. **Análise**: Onde está o tipping point?

## Referências

- **Granovetter, M. S. (1978).** "Threshold Models of Collective Behavior." *Journal of Mathematical Sociology*, 6(3), 361-376.
- **Granovetter, M. S. (1973).** "The Strength of Weak Ties." *American Journal of Sociology*, 78(6), 1360-1380.
- **Watts, D. J. (2003).** *Six Degrees: The Science of a Connected Age.* W.W. Norton & Co.
  - Discussão moderna de cascatas em redes

## Outros Autores Relevantes

- **Daniel Kahneman & Amos Tversky**: Economia comportamental, vieses de decisão
- **Herbert Simon**: Bounded rationality, satisficing
- **Duncan Watts**: Dinâmica de cascatas em redes
- **Brian Arthur**: Economia de complexidade

---

**Filosofia**: Granovetter não apenas simula comportamento individual.
Simula o que faz comportamento *coletivo* emergir: limiares, pressão social, cascatas.

Quando você testa uma decisão em Granovetter, você está estudando dinâmica de tipping points.
