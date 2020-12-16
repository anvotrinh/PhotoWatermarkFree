import { RootStoreModel } from './root-store'
import { Environment } from './environment'

export async function setupRootStore() {
  const env = new Environment()
  return RootStoreModel.create({}, env)
}
