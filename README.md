# 📰 Nuxt Posts App

//PARA O README UTILIZEI IA PARA PRATICIDADE!!!


Aplicação desenvolvida em **Nuxt 3** consumindo a API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com), com foco em SSR, performance, boas práticas e organização de código.

---

## 🚀 Funcionalidades

- **Listagem de posts** com loading states e tratamento de erro
- **Detalhamento de post** com rota dinâmica e exibição de comentários
- **SSR** habilitado por padrão via Nuxt 3
- **Cache automático** via `useAsyncData` — evita refetch desnecessário na navegação
- **Composables** reutilizáveis para abstração das chamadas de API
- **Testes** com Vitest + @nuxt/test-utils

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Motivo |
|---|---|---|
| Nuxt | 3.17 | Framework SSR com roteamento automático |
| Vue | 3.5 | Composition API moderna |
| @nuxt/ui | 3.x | Componentes acessíveis com Tailwind 4 |
| TypeScript | 5.8 | Tipagem estática e segurança em tempo de desenvolvimento |
| Vitest | 3.x | Testes unitários e de componentes |

---

## 📁 Estrutura do Projeto

```
app/
├── composables/        # Lógica reutilizável (usePosts, usePost)
├── pages/
│   ├── index.vue       # Listagem de posts
│   └── posts/
│       └── [id].vue    # Detalhe do post
└── components/         # Componentes de UI

tests/                  # Testes unitários com Vitest
public/                 # Assets estáticos
nuxt.config.ts          # Configuração do Nuxt
vitest.config.ts        # Configuração dos testes
```

---

## ⚙️ Como rodar

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/JoaoOliveiraaa/rep-teste-priv.git
cd rep-teste-priv

# Instalar dependências
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000`

### Build para produção

```bash
npm run build
npm run preview
```

### Testes

```bash
npm run test
```

---

## 🧠 Decisões técnicas

**SSR com `useAsyncData`** — Os dados são buscados no servidor antes da renderização, garantindo que o HTML chegue ao cliente já populado. Isso melhora o SEO e reduz o tempo de carregamento percebido.

**Cache via chave única** — O `useAsyncData` usa chaves únicas por rota (`posts`, `post-${id}`), então ao navegar entre páginas já visitadas os dados são servidos do cache sem nova requisição à API.

**Composables** — Toda a lógica de fetch foi abstraída em composables (`usePosts`, `usePost`), deixando os componentes de página limpos e focados apenas na apresentação.

**@nuxt/ui** — Optei por usar a biblioteca de componentes oficial do Nuxt para garantir acessibilidade e consistência visual sem reinventar a roda.

**Vitest** — Configurado com ambiente `nuxt` e `happy-dom` para testes realistas de composables e componentes.

---

## ⏱️ Tempo de desenvolvimento

Aproximadamente **3 horas**, incluindo setup, implementação das features, testes e ajustes finais.

---

## 📬 Contato

Desenvolvido por **João Pedro** para o processo seletivo da **Hit Digital**.
