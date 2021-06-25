import { ApolloServer, gql } from "apollo-server";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Pokemon {
    name: String
    url: String
  }

  type Element {
    slot: Number
    type: {
      name: String
      url: String
    }
  }

  type PokemonDetail {
    height: Int
  types: [ Element]
  weight: Int
  base_experience: Int
  forms: [
    {
      name: String
      url: String
    }
  ]
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    pokemons: [Pokemon]
  }
`;

const pokemon = [
  {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  },
  {
    name: "ivysaur",
    url: "https://pokeapi.co/api/v2/pokemon/2/",
  },
  {
    name: "venusaur",
    url: "https://pokeapi.co/api/v2/pokemon/3/",
  },
  {
    name: "charmander",
    url: "https://pokeapi.co/api/v2/pokemon/4/",
  },
  {
    name: "charmeleon",
    url: "https://pokeapi.co/api/v2/pokemon/5/",
  },
  {
    name: "charizard",
    url: "https://pokeapi.co/api/v2/pokemon/6/",
  },
  {
    name: "squirtle",
    url: "https://pokeapi.co/api/v2/pokemon/7/",
  },
  {
    name: "wartortle",
    url: "https://pokeapi.co/api/v2/pokemon/8/",
  },
  {
    name: "blastoise",
    url: "https://pokeapi.co/api/v2/pokemon/9/",
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves pokemons from the "pokemon" array above.
const resolvers = {
  Query: {
    pokemon: () => pokemon,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
