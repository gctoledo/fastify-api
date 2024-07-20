# Projeto didático - Fastify

Projeto de uma CRUD API super simples. O projeto foi feito com a intenção de conhecer um pouco mais do micro framework "Fastify" e o uso do Vitest para testes automatizados.

No projeto foi trabalhado o conceito de plugins, middlewares e cookies dentro do Fastify.
Foi utilizado o Knex para queries ao banco de dados.

O deploy da aplicação foi feito na Render com banco de dados PostgreSQL.

#

Rotas disponíveis:

Transações:

- /transactions/ (GET) - Seleciona todas as transações criadas pelo usuário com cookie válido

- /transactions/:id (GET) - Seleciona uma transação específica

- /transactions/balance (GET) - Seleciona o balanço das transações cadastradas pelo usuário

- /transactions/ (POST) - Cria uma transaction, gerando um cookie para contexto de futuras requisições

#

### 🔨 Guia de instalação

Para visualizar o projeto é necessário possuir o NodeJS instalado em sua máquina. Você pode fazer um clone do repositório e executar os seguintes comandos no terminal para visualizar o projeto:

Clone o projeto

```
  git clone https://github.com/gctoledo/fastify-api
```

Entre no diretório do projeto

```
  cd fastify-api
```

Instale as dependências

```
  npm install
```

Inicie o servidor

```
  npm run dev
```

## 📦 Tecnologias usadas:

- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
- ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
