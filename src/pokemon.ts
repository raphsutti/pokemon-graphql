import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";

const typeDefs = gql`
  type Query {
    getPokemon(id: Int!): Pokemon
  }
  type Pokemon {
    weight: Int
    species: Species
  }
  type Species {
    name: String
    url: String
  }
`;

const resolvers = {
  Query: {
    getPokemon: async (_, { id }) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      return response.json();
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
