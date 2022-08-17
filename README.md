<h1 align="center"> Blogs-API 💻 </h1>

<div align="center">

 ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
 ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
 ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
 ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
 ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
 ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

</div>
<br/> <br/>

<div align="center">

![figure](BrazucaBrowsing.png)

</div>

<h2 align="left"> Sobre: </h2>

<p> Uma API REST de blog posts feita em Node.js, aplicando arquitetura MSC, consumindo o  banco MySql através da criação de models no ORM Sequelize.
</p>

## Tecnologias utilizadas:

- Node.js;
- Express.js;
- JWT;
- Sequelize;
- MySql;
- Arquitetura MSC;

## Rodando o projeto localmente:

```bash
git clone git@github.com:GabrielFerrariR/Blogs-API.git
cd Blogs-API/
npm install
npm start
```

Usando docker

```bash
docker-compose up -d
docker exec -it <container node> bash
npm install
npm run db
npm start 
```

## Visualizando as rotas com Swagger:

Acesse o localhost:PORT/doc para visualizar as rotas da API e suas descrições.

![REST-API](swagger.png)