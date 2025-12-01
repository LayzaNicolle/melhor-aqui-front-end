# 🏙️ MelhorAqui --- Plataforma de Planejamento Participativo

### *Repositório Front-end*

## 👥 **Integrantes do Projeto**

> - Bárbara Luiza,
> - Echilin Taina,
> - Estevão Chagas,
> - Layza Nicolle,
> - Matheus Vinnycius,
> - Matheus Pablo,
> - Vinicius Simas

## 📌 **Sobre o Projeto**

O **MelhorAqui** é uma plataforma digital que estimula a participação
cidadã na melhoria do bairro.\
Através dela, moradores podem:

-   Registrar problemas e ideias de melhorias urbanas\
-   Votar nas sugestões mais importantes\
-   Acompanhar o andamento das ações da prefeitura

Este repositório contém **apenas o Front-end da aplicação**, responsável
pela interface visual e pela interação entre cidadãos e administração
pública.

## 🎯 **Objetivo do Front-end**

Criar uma interface web moderna, simples e acessível, permitindo que
usuários:

-   Cadastrem ideias e problemas urbanos\
-   Visualizem sugestões enviadas pela comunidade\
-   Votem nas propostas mais relevantes\
-   Acompanhem o status atualizado pela prefeitura\
-   Tenham uma experiência fluida tanto no modo cidadão quanto no modo
    administrador

## 👥 **Público-Alvo**

-   Moradores interessados em melhorias no bairro\
-   Gestores públicos e prefeituras\
-   Associações comunitárias\
-   Organizações sociais que acompanham transparência pública

## 🚀 **Funcionalidades do Front-end**

### 📝 **Cadastro de Ideias**

-   Formulários amigáveis\
-   Envio de título, descrição, foto, categoria e localização

### 📍 **Listagem e Visualização**

-   Filtros por categoria, status e relevância\
-   Listagem clara e responsiva\
-   Tela detalhada da ideia

### 👍 **Votação**

-   Usuário pode votar uma vez por ideia\
-   Votos atualizados em tempo real

### 🏆 **Prioridade Automática**

-   Interface exibe o índice calculado pelo back-end

### 🏛️ **Painel Administrativo**

-   Área exclusiva da prefeitura\
-   Alteração do status da ideia (Recebida, Em Análise, Concluída)

### 📢 **Transparência**

-   Página pública mostrando andamento das ações

### 👤 **Perfil do Usuário**

-   Minhas ideias\
-   Meus votos\
-   Gerenciamento básico de informações

## 🧱 **Tecnologias Utilizadas**

### **Frontend**

-   ⚛️ **Next.js (React)**\
-   📦 **Zustand** ou **Redux** (estado global)\
-   🔄 **TanStack Query (React Query)**\
-   🎨 **CSS model**

### **Outros**

-   Consumo da API usando JWT\
-   Upload de arquivos\
-   Componentização reutilizável

## 🗂️ **Arquitetura do Front-end**

    /components     → Componentes reutilizáveis
    /pages ou /app  → Rotas da aplicação
    /styles         → Estilos globais e específicos
    /services       → Requisições (API)
    /store          → Estado global
    /public         → Imagens e assets estáticos

## 🔄 **Fluxo de Uso**

1.  Usuário faz login/cadastro\
2.  Registra uma ideia\
3.  Cidadãos visualizam e votam\
4.  Sistema gera prioridade\
5.  Prefeitura altera o status\
6.  Comunidade acompanha tudo em tempo real

## 🌱 **Benefícios**

-   Interface acessível e intuitiva\
-   Processo transparente para a comunidade\
-   Maior engajamento e participação popular\
-   Base de dados organizada\
-   Foco na usabilidade para pessoas comuns

## 📈 **Possíveis Melhorias Futuras**

-   Dashboard com gráficos e indicadores\
-   Geração de relatórios PDF\
-   Mapa interativo avançado\
-   Cadastro de moradias vulneráveis\
-   Integrações com APIs externas

## 🧪 **Como Rodar o Projeto**

``` bash
npm install
npm run dev
```

Acesse em:\
👉 **http://localhost:3000**
