import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";

const typeDefs = gql`
  type Query {
    hello(name: String): String
    getPokemons(offset: Int!, limit: Int!): Pokemons
  }

  type Pokemons {
    count: Int
    results: [Pokemon]
    hasNextPage: Boolean
  }

  type Pokemon {
    name: String
    pokemonDetail: PokemonDetail
  }

  type PokemonDetail {
    id: Int
    height: Int
    weight: Int
    sprite: String
    spriteBack: String
    spriteShiny: String
    spriteShinyBack: String
  }
`;

interface HelloArg {
  name: string;
}

interface PokemonDetail {
  id: number;
  height: number;
  weight: number;
  sprite: string;
  spriteBack: string;
  spriteShiny: string;
  spriteShinyBack: string;
}

interface Pokemon {
  name: string;
  pokemonDetail: PokemonDetail;
}

interface Pokemons {
  count: number;
  results: [Pokemon];
  hasNextPage: boolean;
}

interface GetPokemonsArg {
  offset: number;
  limit: number;
}

interface HasNextPageArg {
  next: string;
}

interface PokemonDetailArg {
  url: string;
}

interface PokemonDetail {
  id: number;
  height: number;
  weight: number;
  sprite: string;
  spriteBack: string;
  spriteShiny: string;
  spriteShinyBack: string;
}

interface SpriteArg {
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
  };
}

type Resolvers = {
  Query: {
    hello: (parent: unknown, arg: HelloArg) => string;
    getPokemons: (parent: unknown, arg: GetPokemonsArg) => Promise<Pokemons>;
  };

  Pokemons: {
    hasNextPage: (parent: HasNextPageArg) => boolean;
  };

  Pokemon: {
    pokemonDetail: (parent: PokemonDetailArg) => Promise<PokemonDetail>;
  };

  PokemonDetail: {
    sprite: (parent: SpriteArg) => string;
    spriteBack: (parent: SpriteArg) => string;
    spriteShiny: (parent: SpriteArg) => string;
    spriteShinyBack: (parent: SpriteArg) => string;
  };
};

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
  PokemonDetail: {
    sprite: (parent) => parent.sprites.front_default,
    spriteBack: (parent) => parent.sprites.back_default,
    spriteShiny: (parent) => parent.sprites.front_shiny,
    spriteShinyBack: (parent) => parent.sprites.back_shiny,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
