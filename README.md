# projeto21-sing me a song (frontend)


# Descrição

Aplicação dos conceitos de testes aprendidos em aula em uma aplicação de recomendações de músicas.


# Testes realizados

## Testes e2e utilizando cypress
-   Testa postagem de uma nova recomendação: testa se a recomendação é criada e aparece com sucesso
-   Testa downvote: testa caso de sucesso
-   Testa downvote: testa se a recomendação é excluida ao ultrapassar -5 votos
-   Testa upvote: testa caso de sucesso
-   Testa GET /recommendations: Testa se aparece o numero correto de recomendações
-   Testa GET /recommendations/random: testa se é direcionado pra rota correta e se aparece uma única recomendação
-   Testa GET /recommendations/top/:amount: Testa se é direcionado pra rota correta e se aparece o número correto de recomendações

</br>

# Rodar localmente

Clone o projeto

```bash
  git clone https://github.com/LuigiTanaka/sing-me-a-song-front.git
```

Vá até a pasta do projeto

```bash
  cd sing-me-a-song-front/
```

Instale as dependências

```bash
  npm install
```

Rode o comando 
```bash
  npm start
```

## Variáveis de ambiente

Para rodar esse projeto, você vai precisar adicionar a seguinte variável de ambiente no seu arquivo .env

`REACT_APP_API_BASE_URL= url da porta onde está rodando o backend #http://localhost:5000`

</br>

## Realizar testes
Para realizar os testes, será necessário deixar rodando tanto o front-end quanto o back-end

### Front-end
Na pasta correspondente ao front-end, rode o comando

```bash
  npm start
```

### Back-end
Na pasta correspondente ao back-end, rode o comando

```bash
  npm run dev
```

### Testes e2e
Para realizar os testes e2e, será necessário inicializar o cypress pelo comando

```bash
  npx cypress open
```

Feito isso, basta seguir os seguintes passos:
-   Selecione a opção E2E Testing
-   Escolha o browser que preferir (recomendação: Electron)
-   Por fim, selecione os arquivos correspondentes aos testes que deseja realizar




## API Reference
Para a criação dos testes, foi necessária também a criação de rotas no back-end para auxiliar na verificação das respostas esperadas.

### Rota para limpar o banco de dados

```http
POST /e2e/reset
```

### Rota para obter uma recomendação pelo nome

```http
GET /e2e/:name
```

#### Request:

| Params      | Tipo      | Descrição      |
| :---------- | :-------- | :-------------------- |
| `name` | `string` | nome da recomendação desejada |

####

</br>

#### Response:

```json
{
  "id": 1
  "name": "nome da recomendação",
  "youtubeLink": "https://www.youtube.com/watch?v=chwyjJbcs1Y",
  "score": 0
}
```

#

### Rota para criar um número aleatório (entre 0 e 15) recomendações

```http
POST /e2e/create
```

#### Response:

```json
{
  "numberOfCreatedRecommendations": 10
}
```

#


</br>

## Autor

-   Luigi Tanaka, estudante da Driven Education 
<br/>
