import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

import App from "src/App";
import "src/index.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "no-cache",
    },
    mutate: {
      fetchPolicy: "no-cache",
    },
  },
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
