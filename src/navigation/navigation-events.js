import { types } from 'mobx-state-tree'

export const NavigationEvents = types.model('NavigationEvents').volatile(() => {
  const subs = new Set()

  const fireSubscribers = (action, oldState, newState) => {
    subs.forEach(subscriber => {
      subscriber({
        type: 'action',
        action,
        state: newState,
        lastState: oldState,
      })
    })
  }

  function emptyFn() {}

  const addListener = (eventName, handler) => {
    if (eventName !== 'action') {
      return { remove: emptyFn }
    }

    subs.add(handler)

    return {
      remove: () => subs.delete(handler),
    }
  }

  return { addListener, fireSubscribers, subs }
})
