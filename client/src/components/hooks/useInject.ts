

import { useStore } from "../StoreProvider";
import { RootStoreModel } from "../../store/RootStore";

export type MapStore<T> = (store: RootStoreModel) => T

const defaultMapStore: MapStore<RootStoreModel> = store => store


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useInject = <T>(mapStore?: MapStore<T>) => {
  const store = useStore()
  return (mapStore || defaultMapStore)(store)
}

export default useInject
