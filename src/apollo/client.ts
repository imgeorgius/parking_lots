import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://interview-apixx07.dev.park-depot.de/",
  cache: new InMemoryCache(),
});
