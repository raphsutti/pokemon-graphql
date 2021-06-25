import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";

const typeDefs = gql`
  type Query {
    getPokemon(id: Int!): Pokemon
  }

  type Pokemon {
    weight: Int
    sprites: Sprites
    species: Species
    moves: [Move]
    types: [Type]
  }

  type Sprites {
    front_default: String
    front_shiny: String
  }

  type Species {
    name: String
    url: String
  }
  
  type Move {
    move: MoveDetail
  }

  type MoveDetail {
    name: String
    url: String
  }
  
  type Type {
    slot: Int
    type: TypeDetail
  } 

  type TypeDetail {
    name: String
    damage: Damage
  }

  type Damage {
    damage_relations: DamageRelations
  }

  type DamageRelations {
    double_damage_from: [Element]
    half_damage_from: [Element]
  }

  type Element {
    name: String
  }
`;

const resolvers = {
  Query: {
    getPokemon: async (_, { id }) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      return response.json();
    },
  },
  TypeDetail: {
    damage: async(parent) => {
      const response = await fetch(parent.url)
      return response.json();
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
