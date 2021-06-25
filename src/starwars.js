import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";

const typeDefs = gql`
  type Query {
    hello(name: String): String!
    getPerson(id: Int!): Person
  }

  type Film {
    title: String
    episode_id: Int
    opening_crawl: String
    director: String
    producer: String
    release_date: String
  }

  type Person {
    name: String
    height: String
    mass: String
    hair_color: String
    skin_color: String
    eye_color: String
    birth_year: String
    gender: String
    homeworld: Homeworld
    films: [Film]
  }

  type Homeworld {
    name: String
    rotation_period: String
    orbital_period: String
    diameter: String
    climate: String
    gravity: String
    terrain: String
    surface_water: String
    population: String
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name}`,
    getPerson: async (_, { id }) => {
      const response = await fetch(`https://swapi.dev/api/people/${id}/`);
      return response.json();
    },
  },

  Person: {
    films: (parent) => {
      const promises = parent.films.map(async (url) => {
        const response = await fetch(url);
        return response.json();
      });

      return Promise.all(promises);
    },
    homeworld: async (parent) => {
      const response = await fetch(parent.homeworld);
      return response.json();
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
