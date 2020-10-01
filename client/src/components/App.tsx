import React from "react";
import { connectReduxDevtools } from "mst-middlewares";
import { createStore } from "../store/createStore";
import { StoreProvider } from "./StoreProvider";
import Layout from "./Layout";

export const rootStore = createStore();
// eslint-disable-next-line @typescript-eslint/no-var-requires
connectReduxDevtools(require("remotedev"), rootStore);

function App(): JSX.Element {
  return (
    <StoreProvider value={rootStore}>
      <Layout />
    </StoreProvider>
  );
}

export default App;
