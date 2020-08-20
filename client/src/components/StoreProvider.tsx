import { useContext, createContext } from "react";
import { RootStoreModel } from "../store/RootStore";

const StoreContext = createContext<RootStoreModel>({} as RootStoreModel);

export const useStore = (): RootStoreModel => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
