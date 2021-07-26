import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Pokemon = {
  __typename?: 'Pokemon';
  name?: Maybe<Scalars['String']>;
  pokemonDetail?: Maybe<PokemonDetail>;
  url: Scalars['String'];
};

export type PokemonDetail = {
  __typename?: 'PokemonDetail';
  id?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Int']>;
  sprites: Sprites;
  sprite?: Maybe<Scalars['String']>;
  spriteBack?: Maybe<Scalars['String']>;
  spriteShiny?: Maybe<Scalars['String']>;
  spriteShinyBack?: Maybe<Scalars['String']>;
};

export type Pokemons = {
  __typename?: 'Pokemons';
  count?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<Pokemon>>>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  next?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']>;
  getPokemons?: Maybe<Pokemons>;
};


export type QueryHelloArgs = {
  name?: Maybe<Scalars['String']>;
};


export type QueryGetPokemonsArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
};

export type Sprites = {
  __typename?: 'Sprites';
  front_default: Scalars['String'];
  back_default: Scalars['String'];
  front_shiny: Scalars['String'];
  back_shiny: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Pokemon: ResolverTypeWrapper<Pokemon>;
  String: ResolverTypeWrapper<Scalars['String']>;
  PokemonDetail: ResolverTypeWrapper<PokemonDetail>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Pokemons: ResolverTypeWrapper<Pokemons>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Query: ResolverTypeWrapper<{}>;
  Sprites: ResolverTypeWrapper<Sprites>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Pokemon: Pokemon;
  String: Scalars['String'];
  PokemonDetail: PokemonDetail;
  Int: Scalars['Int'];
  Pokemons: Pokemons;
  Boolean: Scalars['Boolean'];
  Query: {};
  Sprites: Sprites;
};

export type PokemonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pokemon'] = ResolversParentTypes['Pokemon']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pokemonDetail?: Resolver<Maybe<ResolversTypes['PokemonDetail']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['PokemonDetail'] = ResolversParentTypes['PokemonDetail']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sprites?: Resolver<ResolversTypes['Sprites'], ParentType, ContextType>;
  sprite?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  spriteBack?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  spriteShiny?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  spriteShinyBack?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pokemons'] = ResolversParentTypes['Pokemons']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  results?: Resolver<Maybe<Array<Maybe<ResolversTypes['Pokemon']>>>, ParentType, ContextType>;
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  next?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryHelloArgs, never>>;
  getPokemons?: Resolver<Maybe<ResolversTypes['Pokemons']>, ParentType, ContextType, RequireFields<QueryGetPokemonsArgs, 'offset' | 'limit'>>;
};

export type SpritesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sprites'] = ResolversParentTypes['Sprites']> = {
  front_default?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  back_default?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  front_shiny?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  back_shiny?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Pokemon?: PokemonResolvers<ContextType>;
  PokemonDetail?: PokemonDetailResolvers<ContextType>;
  Pokemons?: PokemonsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Sprites?: SpritesResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
