# pokedex
Pokedex, avaliação de desenvolvimento web II

# Instruções para rodar o projeto
Fazer a instalação das dependências tanto no backend quando no frontend

```cmd
// Node 18.5.0
npm install
```

No backend antes de rodar a aplicação é necessário, zerar o banco de dados e fazer o _deploy_ das tabelas corretamente com os seguintes comandos
```cmd
// Zerar o banco de dados
npx prisma migrate reset 

// Deploy das tabelas
npx prisma migrate dev --name init

```

Depois de configurado o banco de dados basta rodar o comando abaixo tanto no frontend quando no backend
```cmd
npm run dev

```

E acessar a rota http://localhost:5173/login
