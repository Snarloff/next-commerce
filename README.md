# Ecommerce Fullstack

[![Versão](https://img.shields.io/badge/vers%C3%A3o-1.0.0-brightgreen)](link-para-a-versao)
[![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-blue)](link-para-a-licenca)
[![Dependências](https://img.shields.io/badge/depend%C3%AAncias-11-yellow)](link-para-as-dependencias)
[![Último Commit](https://img.shields.io/badge/%C3%BAltimo%20commit-outubro%202023-orange)](https://github.com/Snarloff/next-commerce/commit/7b9bcb922e6b8e96780f21ad8f222ac054f89b22)

![image](https://github.com/Snarloff/next-commerce/assets/46792575/6e052996-45ed-441b-ae59-c626c91267cb)
![image](https://github.com/Snarloff/next-commerce/assets/46792575/791fca21-bc1a-4209-8b28-8e63385405eb)
![image](https://github.com/Snarloff/next-commerce/assets/46792575/9fce8c3b-3f89-4f78-8016-3f48c13448a2)

Este é um projeto de ecommerce fullstack que engloba a implementação de um aplicativo de loja online, incluindo recursos como autenticação de usuário, pagamento, listagem de produtos e gerenciamento de carrinho. O projeto utiliza uma variedade de tecnologias no frontend e no backend para criar uma experiência de compra completa.

## Visão Geral

O Ecommerce Fullstack é uma aplicação de ecommerce completa com as seguintes funcionalidades:

1. Frontend em React com Next.js 13, incluindo o uso de API Routes para criar rotas de backend.
2. Autenticação de usuário fornecida pelo serviço Clerk.
3. Pagamentos e listagem de produtos implementados usando Strepi.
4. Banco de dados Vercel Postgres para armazenamento de dados.
5. Controle de estado do carrinho e outros recursos usando Zustand.
6. Estilo e layout responsivos com Tailwind CSS.
7. Linter configurado com ESLint e Prettier usando o pacote de configuração personalizado [@snarloff/eslint-config](https://www.npmjs.com/package/@snarloff/eslint-config).

## Tecnologias Utilizadas

O projeto faz uso de diversas tecnologias e pacotes:

- [React](https://reactjs.org/): Biblioteca de JavaScript para criar interfaces de usuário.
- [Next.js](https://nextjs.org/): Framework React para aplicativos web.
- [Tailwind CSS](https://tailwindcss.com/): Estrutura de estilo utilitário.
- [Clerk](https://docs.clerk.dev/): Serviço de autenticação.
- [Strepi](https://strelapi.com/): Plataforma de ecommerce.
- [Prisma](https://prisma.io/): Camada de acesso a dados para Node.js e TypeScript.
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres): Banco de dados Postgres hospedado na Vercel.
- [Zustand](https://zustand.surge.sh/): Biblioteca para gerenciamento de estado.
- [ESLint](https://eslint.org/): Linter para JavaScript/TypeScript.
- [Prettier](https://prettier.io/): Formatador de código.

## Instruções de Uso

Para executar o projeto em sua máquina, siga os passos abaixo:

1. Clone este repositório:

   ```shell
   git clone https://github.com/Snarloff/next-commerce.git
   ```

2. Navegue até o diretório do projeto:

   ```shell
   cd ecommerce-fullstack
   ```

3. Instale as dependências:

   ```shell
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```shell
   npm run dev
   ```

O aplicativo estará disponível em `http://localhost:3000`.

Certifique-se de configurar corretamente as variáveis de ambiente necessárias para a autenticação com o serviço Clerk, as informações de pagamento com Strepi, bem como as configurações de acesso ao banco de dados Vercel Postgres.

## Contribuições

Contribuições são bem-vindas! Se você deseja contribuir para este projeto, siga as diretrizes de contribuição e envie um pull request.

## Problemas e Sugestões

Se você encontrar problemas ou tiver sugestões para melhorar este projeto, por favor, abra uma issue neste repositório.
