import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'

import i from '../../../i18n'
import ListItem from './list-item'
import { Layout, Header, LoadingOverlay, Button } from '../../../components'
import { useStores } from '../../../models/root-store'
import { Metrics } from '../../../theme'

const styles = StyleSheet.create({
  btnAdd: {
    margin: Metrics.space.small,
  },
})

export default observer(() => {
  const {
    navigationStore: { navigateTo },
    productStore: { products, getProducts, isLoadingListProduct },
  } = useStores()

  useEffect(() => {
    getProducts()
  }, [])

  const handleItemPress = product => {
    navigateTo({
      routeName: 'AddProduct',
      params: {
        product,
      },
    })
  }

  const handleAddItem = () => {
    navigateTo({ routeName: 'AddProduct' })
  }

  return (
    <Layout>
      <LoadingOverlay isLoading={isLoadingListProduct} />
      <Header onPress={handleAddItem} />
      <ListItem
        list={products}
        onPressItem={handleItemPress}
        isLoading={isLoadingListProduct}
      />
      <Button
        onPress={handleAddItem}
        text={i.get('add_new_product')}
        style={styles.btnAdd}
      />
    </Layout>
  )
})
