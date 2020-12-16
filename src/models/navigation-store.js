import { types } from 'mobx-state-tree'
import { NavigationActions, StackActions } from 'react-navigation'

import { PrimaryNavigator } from '../navigation/primary-navigator'
import { NavigationEvents } from '../navigation/navigation-events'

const DEFAULT_STATE = PrimaryNavigator.router.getStateForAction(
  NavigationActions.init(),
  null,
)

function findCurrentRoute(navState) {
  const route = navState.routes[navState.index]
  if (route.routes) {
    return findCurrentRoute(route)
  }
  return route
}

export const NavigationStoreModel = NavigationEvents.named('NavigationStore')
  .props({
    state: types.optional(types.frozen(), DEFAULT_STATE),
  })
  .preProcessSnapshot(snapshot => {
    if (!snapshot || !snapshot.state) {
      return snapshot
    }
    try {
      PrimaryNavigator.router.getPathAndParamsForState(snapshot.state)
      return snapshot
    } catch (e) {
      return { ...snapshot, state: DEFAULT_STATE }
    }
  })
  .actions(self => ({
    actionSubscribers() {
      return self.subs
    },
    dispatch(action, shouldPush = true) {
      const previousNavState = shouldPush ? self.state : null
      self.state =
        PrimaryNavigator.router.getStateForAction(action, previousNavState) ||
        self.state
      self.fireSubscribers(action, previousNavState, self.state)
      return true
    },
    reset() {
      self.state = DEFAULT_STATE
    },
    findCurrentRoute() {
      return findCurrentRoute(self.state)
    },
  }))
  .actions(self => ({
    navigateTo(options) {
      self.dispatch(NavigationActions.navigate(options))
    },
    goBack(options) {
      self.dispatch(NavigationActions.back(options))
    },
    replace(options) {
      self.dispatch(StackActions.replace(options))
    },
    popToTop(options) {
      self.dispatch(StackActions.popToTop(options))
    },
  }))
