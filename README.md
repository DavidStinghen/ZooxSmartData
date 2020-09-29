# ZooxSmartData

ZooxSmartData é uma aplicação criada para realização de cadastros, alterações, exclusões e visualizações de cidades e estados. Para o desenvolvimento da aplicação foi criada uma API REST em Node.js para realizar as ações citadas acima. Para o frontend foi cruiado um app em Vue.js.

## Backend

Para o desenvolvimendo do backend foram utilizadas as seguintes tecnologias: Express.js para criação de rotas e middlewares de maneira mais produtiva. Para segurança da api foram utilizadas as bibliotecas express-rate-limit e helmet. Para controlar as requisições ao banco de dados foi utilizada a biblioteca mongoose.

## Frontend

Para o desenvolvimendo do frontend além do framework Vue.js foi utilizado o Vuetify para que a criação de telas fosse produtiva e responsiva, porém não foram utilizados layouts prontos. Para requisições a api foi utilizada a biblioteca axios e por fim para formatação de datas foi utilizada a biblioteca date-fns.

## Instalação

### Backend

É definido que aplicação irá ser executada em:
```
http://localhost:3333
```

Será necessário para a instalação do backend que seja utilizado um container Docker para uma imagem do MongoDB ou realizar acesso remoto via MongoDB Atlas pelo link: https://www.mongodb.com/cloud/atlas.

Caso escolha utilizar o Docker, após a instalação e incialização do mesmo execute o comando abaixo:
```
$ docker run -d --name zoox_database -p 27017:27017  mongo:latest

$ docker start zoox_database
```

Após a instalação e inicialização do container crie um arquivo .env na raiz da pasta backend igual ao arquivo .env-example e informe na constante DB_URL a string de conexão com o banco de dados MongoDB que deve se parecer com isso: 
```
DB_URL="mongodb://localhost/zoox"
```

E então realize a instalação dos pacotes e execute o servidor:
```
$ cd backend

$ npm install

$ npm start
```

### Frontend

Para a execução do frontend basta apenas seguir os passos abaixo:
```
$ cd frontend

$ npm install

$ npm run serve
```

A baseURL para conexão com API foi definida para ser:
```
http://localhost:3333
```
