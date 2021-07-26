# Pokemon GraphQL Server

This is a pet project to learn about Apollo caching using GraphQL backend and React frontend

Powers the backend for [`pokemon-frontend`](https://github.com/raphsutti/pokemon-frontend)

This GraphQL endpoint sends request to [`PokeAPI`](https://pokeapi.co/)

## How pagination merging works

Pagination in this project uses Apollo caching to prevent duplicate requests eg. the frontend is setup to load 10 Pokemon at a time. Additional requests are activated when clicking `load more` button

- First request input - offset:0, limit:10
- Second request input - offset:10, limit:10

Apollo performs merging of the two requests into one page

## Prerequisites

`yarn start src/pokemonPagination`
