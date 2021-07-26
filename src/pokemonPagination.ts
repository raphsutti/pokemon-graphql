import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";
import { Resolvers } from "./generated/graphql";

const typeDefs = gql`
  type Query {
    hello(name: String): String
    getPokemons(offset: Int!, limit: Int!): Pokemons
  }

  type Pokemons {
    count: Int
    results: [Pokemon]
    hasNextPage: Boolean
    next: Boolean
  }

  type Pokemon {
    name: String
    pokemonDetail: PokemonDetail
    url: String!
  }

  type PokemonDetail {
    id: Int
    height: Int
    weight: Int
    sprites: Sprites!
  }

  type Sprites {
    front_default: String!
    back_default: String!
    front_shiny: String!
    back_shiny: String!
  }
`;

const resolvers: Resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name}`,
    getPokemons: async (_, { offset, limit }) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      return response.json();
    },
  },
  Pokemons: {
    hasNextPage: (parent) => parent.next !== null,
  },
  Pokemon: {
    pokemonDetail: async (parent) => {
      const response = await fetch(parent.url);
      return response.json();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
