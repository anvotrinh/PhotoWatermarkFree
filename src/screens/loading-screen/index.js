import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { useStores } from '../../models/root-store'
import { Layout, LoadingOverlay } from '../../components'

export default observer(() => {
  const {
    authStore: { setup },
  } = useStores()

  useEffect(() => {
    setup()
  }, [setup])

  return (
    <Layout>
      <LoadingOverlay isLoading={true} />
    </Layout>
  )
})
