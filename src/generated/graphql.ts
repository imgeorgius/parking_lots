/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Lot = {
  __typename?: 'Lot';
  address: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  live_date?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  size: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type LotWhereInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  distinctStatuses?: Maybe<Array<Maybe<Statuses>>>;
  distinctTypes?: Maybe<Array<Maybe<Types>>>;
  getAllParkingLots?: Maybe<Array<Maybe<Lot>>>;
};


export type QueryGetAllParkingLotsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LotWhereInput>;
};

export type Statuses = {
  __typename?: 'Statuses';
  status: Scalars['String']['output'];
};

export type Types = {
  __typename?: 'Types';
  type: Scalars['String']['output'];
};

export type GetAllParkingLotsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllParkingLotsQuery = { __typename?: 'Query', getAllParkingLots?: Array<{ __typename?: 'Lot', id: string, address: string, image?: string | null, name: string, size: number, status: string, type: string } | null> | null };


export const GetAllParkingLotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllParkingLots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllParkingLots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<GetAllParkingLotsQuery, GetAllParkingLotsQueryVariables>;