import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";

import AppSwitch from "@/components/app/AppSwitch";
import { AppRoutes } from "@/components/app/AppRoutes";
import { store } from "@/store";

import "@/App.scss";

const client = new ApolloClient({
  uri: "https://interview-apixx07.dev.park-depot.de/",
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <AppSwitch appRoutes={AppRoutes} />
    </Provider>
  </ApolloProvider>
);

export default App;
