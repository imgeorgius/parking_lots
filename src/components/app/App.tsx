import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";

import AppSwitch from "@/components/app/AppSwitch";
import { AppRoutes } from "@/components/app/AppRoutes";
import { store } from "@/store";
import { client } from "@/apollo";

import "@/App.scss";

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <AppSwitch appRoutes={AppRoutes} />
    </Provider>
  </ApolloProvider>
);

export default App;
