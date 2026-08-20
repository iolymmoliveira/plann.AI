# 🧠Plann.AI

Educador financeiro com simulações personalizadas, insights gerados por IA e conversa contextual.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

Projeto desenvolvido para o desafio **[Santander 2026 - AI React Front-end](https://app.santanderopenacademy.com/pt-BR/program/santander-bootcamp-tech-2026-1-semestre)**, realizado na **[DIO](https://www.dio.me/)**.

## 📚 Índice

- [Sobre o projeto](#-sobre-o-projeto)
- [Preview](#-preview)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Melhorias implementadas](#-melhorias-implementadas)
- [Como executar](#-como-executar)
- [Como testar o fluxo principal](#-como-testar-o-fluxo-principal)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Aprendizados](#-aprendizados)
- [Autora](#-autora)

## 💡 Sobre o projeto

O Plann.AI ajuda o usuário a transformar uma meta financeira em um plano de ação. A aplicação coleta dados de renda, custos, dívidas, objetivo, valor e prazo; calcula a economia mensal disponível e envia o contexto para a API Gemini para gerar um diagnóstico personalizado.

Depois de visualizar o resultado, o usuário pode conversar com o educador financeiro sobre aquela simulação. Simulações e conversas ficam disponíveis posteriormente no navegador, permitindo acompanhar planos diferentes sem misturar seus dados.

## 🖥️ Preview

Os protótipos utilizados no desenvolvimento das telas de histórico e conversa estão disponíveis no próprio projeto:

| Histórico                                                                                                                                       | Conversa com o educador                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [Light desktop](src/assets/images/simulation_history_light_desktop.png) · [Dark desktop](src/assets/images/simulation_history_dark_desktop.png) | [Light](src/assets/images/talk_light.png) · [Dark](src/assets/images/talk_dark.png) |
| [Light mobile](src/assets/images/simulation_history_light_mobile.png) · [Dark mobile](src/assets/images/simulation_history_dark_mobile.png)     | Layout responsivo no mesmo card de insights                                         |

## ✨ Funcionalidades

- 💰 **Simulação financeira em etapas:** coleta renda mensal, custos fixos, dívidas, nome da meta, custo e prazo.
- 📊 **Resultado detalhado:** exibe custo da meta, prazo, economia mensal, renda, despesas e dívidas.
- 🤖 **Insight personalizado:** gera diagnóstico, viabilidade, sugestões práticas, ideias de renda extra, investimentos e mensagem motivacional com a API Gemini.
- 💬 **Conversa contextual:** permite fazer múltiplas perguntas sobre a simulação atual e mantém o histórico de mensagens visível.
- 🕒 **Histórico de simulações:** lista os planos salvos, ordenados pelos mais recentes.
- 🔍 **Detalhes de simulações anteriores:** reabre o resultado pelo identificador da simulação e recupera o insight já salvo.
- 🗑️ **Exclusão:** remove uma simulação do histórico.
- 💾 **Persistência local:** salva simulações, insights e conversas no `localStorage` do navegador.
- 🌙 **Temas light e dark:** respeita a preferência do sistema e permite alternar o tema pela interface.
- 📱 **Layout responsivo:** adapta formulário, resultados, histórico e conversa para desktop e mobile.
- ⏳ **Estados de loading:** utiliza skeleton no carregamento inicial do insight e feedback durante respostas da conversa.
- ⚠️ **Tratamento de erros:** informa falhas na geração do insight ou da resposta e permite tentar novamente.

## 🧰 Tecnologias

### Front-end

- React 19
- TypeScript
- Vite
- React Router DOM

### Estilização e interface

- Tailwind CSS 4
- `@fontsource/inter`
- `lucide-react`
- `tailwind-merge`
- `react-loading-skeleton`

### IA e persistência

- API Gemini Generative Language, consumida por `fetch`.
- `localStorage` para simulações, insights, conversas e preferência de tema.

O projeto utiliza o React Compiler configurado no `vite.config.ts` por meio do plugin oficial do React e do Babel.

## 🚀 Melhorias implementadas

### Histórico de simulações

- Registros salvos com `id`, data de criação, dados do formulário e insight gerado.
- Listagem ordenada pelas simulações mais recentes.
- Exclusão persistente pelo identificador da simulação.
- Navegação para `/resultado/:id`, recuperando os dados e o insight corretos sem gerar o resultado novamente.

### Conversa contextual com IA

- Perguntas enviadas com os dados da simulação atual e o histórico anterior como contexto.
- Conversas persistidas no `localStorage` por `simulationId`, evitando misturar planos diferentes.
- Suporte a múltiplas perguntas, com recuperação automática da conversa ao retornar ao resultado.

### Usabilidade e responsividade

- Card de conversa com altura máxima em telas grandes e rolagem interna para mensagens extensas.
- Scroll automático para a mensagem mais recente após o envio, a resposta da IA e a recuperação do histórico.
- Em telas menores, o card pode se expandir naturalmente para evitar corte de conteúdo.
- Formulário em etapas com progresso, navegação entre passos e máscara para valores monetários.

### Estados de carregamento e erro

- Skeleton durante a geração do insight inicial.
- Feedback visual enquanto a IA processa uma pergunta.
- Mensagens de erro com opção de tentar novamente.
- Perguntas com falha não são persistidas como respostas válidas e o histórico anterior é preservado.

### Temas light e dark

- Temas implementados com os tokens existentes em `src/styles/theme.css`.
- Preferência inicial baseada no tema do sistema e persistência da escolha no `localStorage`.
- Componentes reutilizam as mesmas variáveis de cor nos resultados, histórico e conversa.

### Reutilização de componentes com `tailwind-merge`

- A biblioteca `tailwind-merge` foi adicionada para combinar classes Tailwind sem conflitos.
- O componente `Button` mantém estilos base, variantes e ícones, mas permite que cada uso aplique classes específicas com segurança.
- Essa composição permitiu reutilizar o mesmo botão em ações diferentes, como navegação, exclusão, retry e envio de perguntas, sem duplicar componentes ou estilos.

## 🛠️ Como executar

### Pré-requisitos

- Node.js compatível com TypeScript 6 e Vite 8.
- npm.
- Uma chave de API do Google Gemini para gerar insights e respostas.

### Clonar e instalar

```bash
git clone https://github.com/iolymmoliveira/plann.AI.git
cd plann.AI
npm install
```

### Configurar a API

Crie um arquivo **`.env`** na raiz, usando **`.env.example`** como referência:

```typescript
VITE_GEMINI_API_KEY = sua_chave_de_api
```

````

### Executar em desenvolvimento

```bash
npm run dev
````

Depois, acesse a URL local exibida pelo Vite, normalmente **`http://localhost:5173`**.

### Outros scripts

```bash
npm run build    # typecheck e build de produção
npm run preview  # pré-visualiza o build
npm run lint     # executa o ESLint
npm run format   # formata os arquivos com Prettier
```

## 🧪 Como testar o fluxo principal

1. Acesse a aplicação e avance pelos seis passos da simulação.
2. Informe renda, custos fixos, dívidas, nome da meta, custo e prazo.
3. Envie o formulário em **Gerar simulação**.
4. Confira os indicadores financeiros e aguarde o insight personalizado.
5. Faça uma pergunta no campo da conversa e verifique a resposta contextualizada.
6. Envie outras perguntas e confirme o scroll automático e o histórico da conversa.
7. Acesse **Histórico** no cabeçalho.
8. Abra uma simulação em **Ver detalhes** e confirme que os dados e o insight são os mesmos.
9. Exclua uma simulação e confirme a atualização da lista.
10. Alterne entre os temas light e dark e redimensione a janela para verificar a responsividade.

O comando `npm run build` verifica o typecheck e a geração do bundle de produção.

## 🗂️ Estrutura do projeto

```text
src/
├── components/
│   ├── features/
│   │   ├── Insights/              # Conteúdo e erro dos insights
│   │   ├── Simulation/             # Formulário em etapas
│   │   ├── SimulationHistory/      # Lista, estatísticas e ações do histórico
│   │   └── SimulationResults/      # Cards, conversa e resultados
│   └── shared/                     # Header, layout, botões, inputs e hero
├── context/theme/                  # Contexto e provider de tema
├── data/                           # Tipos, etapas e prompts da IA
├── hooks/                          # Storage, insight, conversa e tema
├── pages/                          # Formulário, resultado e histórico
├── services/                       # Integração com a API Gemini
├── styles/                         # Tokens de tema
└── utils/                          # Máscara de moeda e cálculos financeiros
```

As rotas são definidas em `src/router.tsx`:

- `/`: formulário de nova simulação.
- `/resultado/:id`: resultado e conversa de uma simulação.
- `/historico`: histórico de simulações salvas.

## 📖 Aprendizados

Durante o desenvolvimento, pratiquei a construção de uma aplicação React tipada com componentes pequenos e responsabilidades separadas. O fluxo exigiu organizar um formulário progressivo, controlar estado local, formatar valores monetários e calcular a economia mensal necessária para cada meta.

Também aprofundei a integração com IA generativa, estruturando prompts com o contexto financeiro da simulação e tratando respostas diferentes: JSON estruturado para o diagnóstico e texto livre para a conversa. A persistência em `localStorage` reforçou a necessidade de associar dados por identificador e recuperar o estado correto após a navegação.

Por fim, trabalhei responsividade, temas, estados de carregamento e erro, scroll interno e acessibilidade básica em ações e campos de formulário. Essas decisões ajudaram a transformar o protótipo em uma experiência navegável e reutilizável.

## 👩‍💻 Autora

**Ioly Oliveira**

- [GitHub](https://github.com/iolymmoliveira)
- [Repositório do projeto](https://github.com/iolymmoliveira/plann.AI)
