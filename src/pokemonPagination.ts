import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch"

const typeDefs = gql`
type Query {
  hello(name:String):String
  getPokemons(offset:Int!, limit:Int!): Pokemons
}

type Pokemons {
  count: Int
  results: [Pokemon]
}

type Pokemon {
  name: String
  pokemonDetail: PokemonDetail
}

type PokemonDetail{
  height: Int
  weight: Int
  sprite: String
  spriteShiny: String
}
`

const resolvers = {
  Query: {
    hello: (_,{name}) => `Hello ${name}`,
    getPokemons: async (_,{offset, limit}) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      return response.json()
    }
  },
  Pokemon: {
    pokemonDetail: async (parent) => {
      const response = await fetch(parent.url)
      return response.json()
    }
  },
  PokemonDetail: {
    sprite: (parent) => parent.sprites.front_default,
    spriteShiny: (parent) => parent.sprites.front_shiny,
  }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
})
