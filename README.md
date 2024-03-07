# README - Aplicação de Gerenciamento de Produtos

Este README apresenta uma aplicação pronta para gerenciamento de produtos, com funcionalidades de login, registro, CRUD de produtos, pesquisa, filtragem e integração com APIs externas para listar e inserir produtos. A aplicação é baseada em um backend Node.js hospedado em Vercel Functions, utilizando Express.js para roteamento, Sequelize para interação com o banco de dados PostgreSQL fornecido pela Vercel e autenticação JWT para proteção das rotas.

## Requerido

- **Página de Login e Registro:** A aplicação possui páginas dedicadas para login e registro de usuários.
- **Página Principal de Produtos:** O acesso à página principal, onde todos os produtos disponíveis e seus detalhes são mostrados, é restrito aos usuários autenticados.
- **Operações CRUD de Produtos:** Funcionalidades de adicionar, editar e excluir produtos estão disponíveis.
- **Pesquisa e Filtragem de Produtos:** Os usuários podem pesquisar e filtrar produtos.
- **APIs Externas:** A aplicação é capaz de listar e inserir a partir de chamadas externas as respectivas rotas, suportando três estruturas diferentes para inserção de produtos.


## Frontend (React)

- **Interfaces:** Utilizado React, em conjunto com a biblioteca Antdesign.
- **Estilos:** Os estilos utilizam Motor SASS (SCSS), em conjunto com provedor de estilos das biblioteca Antdesign.
- **Responsividade:** A aplicação se comporta de maneira coerente em diferentes larguras de tela.

## Backend (Node.js em Vercel Functions)

- **API de Registro e Login:** Implementadas rotas para registro e login de usuários.
- **API RESTful para CRUD de Produtos:** Rotas para operações de criação, leitura, atualização e exclusão de produtos.
- **Utilização de Express.js e Sequelize:** Express.js para roteamento e Sequelize para interação com o banco de dados PostgreSQL.
- **Banco de Dados PostgreSQL da Vercel:** Utilização do banco de dados PostgreSQL fornecido pela Vercel para armazenamento de dados.
- **Rota Exclusiva para Consumo de Produtos Externos:** Rota dedicada para permitir que clientes externos consumam os produtos, com autenticação necessária.
- **Rota Exclusiva para Inserção de Produtos Externos:** Rota dedicada para permitir que clientes externos insiram produtos, com autenticação necessária.
- **JWT para Autenticação:** Todas as rotas requerem autenticação JWT, com tokens obtidos através do processo de login.

## Estruturas de Dados para Inserção de Produtos.

A rota de inserção de produtos pode receber três estruturas de dados diferentes:

### Estrutura 1
```json
{
   "name": "Xiaomi Redmi 9",
   "brand": "Xiaomi",
   "model": "Redmi 9",
   "price": 10000,
   "color": "red"
}
```
### Estrutura 2
```json
{
   "name": "Xiaomi Redmi 9",
   "details": {
       "brand": "Xiaomi",
       "model": "Redmi 9",
       "color": "red"
   },
   "price": 10000
}
```
### Estrutura 3
```json
[
   {
        "name": "Xiaomi Redmi 9",
        "brand": "Xiaomi",
        "model": "Redmi 9",
        "data": [
           {
        	  "price": 10000,
        	  "color": "red"
           },
          {
        	  "price": 10000,
        	  "color": "blue"
           }
        ]
   },
   {
        "name": "Iphone 14 Pro",
        "brand": "Iphone",
        "model": "14 Pro",
        "data": [
           {
        	  "price": 30000,
        	  "color": "silver"
           },
          {
        	  "price": 30100,
        	  "color": "gold"
           }
        ]
   }
]
```

## Rotas Externas Requerendo Autenticação

Para acessar as rotas externas que consomem ou inserem produtos, é necessário primeiro se cadastrar na aplicação utilizando a rota de registro e, em seguida, fazer login para obter um token de autenticação JWT. Este token deve ser incluído no cabeçalho de autorização (Authorization) de todas as solicitações.

### Rota de Registro (/api/usuario?action=register)

Para se cadastrar na aplicação, envie uma solicitação para a rota de registro fornecendo os dados necessários, como nome de usuário, e-mail e senha.

Exemplo de solicitação:

```json
POST /api/usuario?action=register
Content-Type: application/json

{
"nome": "exemplo_usuario",
"email": "exemplo@email.com",
"senha": "senha123"
}
```

### Rota de Login (/api/usuario?action=signin)

Deve fornecer email e senha, fazendo uma chamada a rota de login, que retornará o token de acesso.

Exemplo de solicitação:

```json
POST /api/usuario?action=signin
Content-Type: application/json

{
"email": "exemplo@email.com",
"senha": "senha123"
}
```

Certifique-se de incluir este token em todas as solicitações. Caso contrário, as solicitações serão negadas pelo servidor.

# Obrigado Lexart #

Estou animado para conhecê-los, e argumentar algumas das tomadas de decisões deste app. 😅

## Impressões ##

- Alguns dos conceitos aplicados eu não conhecia, ou conheci em algum momento e a muito não praticava. Foi muito bom passar estes dias construíndo e também consumindo bastante material.

- Houveram momentos de dúvidas na interpretação dos requisitos, é póssível compreender parte delas acompanhando o GitFlow da construção. Mas por fim acredito que consegui interpretar de maneira coerente.

- Houveram dúvidas sobre o que utilizar referentes a estilos ou Kits UI, por estar imaginando o que vocês gostariam de ver aplicado.

- Foram usados conceitos e tecnologias em que estou bem habituado, mas consegui sentir falta do set de tipos por não utilizar javascript a algum tempo. 😂

- Haviam planos para um setup de testes, mas enquanto priorizando o que foi pedido, não sobrou tempo. 😂





