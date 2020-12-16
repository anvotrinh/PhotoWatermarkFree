import { createContext, useContext } from 'react'

const RootStoreContext = createContext({})

export const RootStoreProvider = RootStoreContext.Provider

export const useStores = () => useContext(RootStoreContext)
