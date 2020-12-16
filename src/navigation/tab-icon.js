import React from 'react'
import { observer } from 'mobx-react-lite'

import { useStores } from '../models/root-store'
import { Avatar, Icon } from '../components'

const routeIcons = {
  Print: {
    pack: 'ionicons',
    name: 'md-home',
  },
  Camera: {
    pack: 'feather',
    name: 'camera',
  },
}

const size = 30

export default observer(({ routeName, color }) => {
  const {
    userStore: { profile },
  } = useStores()

  if (routeName === 'Setting') {
    const avatarSource = profile.avatar_url ? { uri: profile.avatar_url } : null
    return <Avatar source={avatarSource} size={size} bgColor={color} />
  }

  return (
    <Icon
      pack={routeIcons[routeName].pack}
      name={routeIcons[routeName].name}
      size={size}
      color={color}
    />
  )
})
