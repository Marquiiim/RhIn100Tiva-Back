
# Teste RHIN100TIVA - Frontend

## Sobre o Projeto

API REST desenvolvida para gerenciamento de tarefas, com foco em organização, segurança e escalabilidade. A aplicação fornece endpoints para operações CRUD completas, incluindo suporte a paginação, controle de acesso e limitação de requisições para proteção contra abuso.

---

## Tecnologias Utilizadas

* Node.js
* Express
* CORS

---

## Requisitos

* Node.js 14 ou superior
* NPM ou Yarn

---

## Instalação

```bash
npm install
```

---


## Execução

### Ambiente de desenvolvimento

```bash
npm run dev
```

### Produção

```bash
npm start
```

---

## Endpoints

| Método | Rota           | Descrição                     |
| ------ | -------------- | ----------------------------- |
| GET    | /api/tasks     | Lista tarefas com paginação   |
| GET    | /api/tasks/:id | Retorna uma tarefa específica |
| POST   | /api/tasks     | Cria uma nova tarefa          |
| PATCH  | /api/tasks/:id | Atualiza uma tarefa existente |
| DELETE | /api/tasks/:id | Remove uma tarefa             |

---

## Parâmetros de Paginação

* `page`: número da página (padrão: 1)
* `limit`: quantidade de itens por página (padrão: 10)

---

## Segurança

### CORS

Origens permitidas:

* [https://rh-in100-tiva-front.vercel.app](https://rh-in100-tiva-front.vercel.app)
* [https://rh-in100-tiva-front-m89bs9v7o-marquiiims-projects.vercel.app](https://rh-in100-tiva-front-m89bs9v7o-marquiiims-projects.vercel.app)

---

### Rate Limiting

* Limite: 100 requisições
* Intervalo: 15 minutos

---

### URL do repo Frontend

* https://github.com/Marquiiim/RhIn100Tiva-Front

