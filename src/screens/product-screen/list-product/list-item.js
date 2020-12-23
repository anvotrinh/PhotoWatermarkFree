import React from 'react'
import { observer } from 'mobx-react-lite'
import { TouchableOpacity, View, StyleSheet, FlatList } from 'react-native'
import FastImage from 'react-native-fast-image'

import i from '../../../i18n'
import { Text, EmptyList, Icon } from '../../../components'
import { Metrics, Colors } from '../../../theme'

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: Colors.wildSand,
  },
  item: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    height: 130,
    marginTop: Metrics.space.small,
    padding: 15,
  },
  itemImage: {
    borderColor: Colors.primary,
    borderWidth: 1,
    height: 100,
    width: 100,
  },
  itemInfo: {
    flex: 1,
    marginLeft: Metrics.space.normal,
  },
  itemInfoIcon: {
    width: 20,
  },
  itemInfoRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: Metrics.space.xs,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
})

const Item = observer(({ item, onPress }) => {
  if (!item.image_urls) return null
  const imageUrl = item.image_urls.split(',')[0]

  const handlePress = () => {
    onPress(item)
  }
  const totalStock = item.stocks.split(',').reduce((total, stockStr) => {
    return parseInt(total, 10) + parseInt(stockStr, 10) || 0
  })
  return (
    <TouchableOpacity style={styles.item} onPress={handlePress}>
      <FastImage source={{ uri: imageUrl }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <View style={styles.itemInfoRow}>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        <View style={styles.itemInfoRow}>
          <Icon
            name='dollar'
            pack='font-awesome'
            size={15}
            style={styles.itemInfoIcon}
          />
          <Text>{`${i.get('price')}: ${item.price.toLocaleString()}đ`}</Text>
        </View>
        <View style={styles.itemInfoRow}>
          <Icon
            name='layers'
            pack='feather'
            size={15}
            style={styles.itemInfoIcon}
          />
          <Text>{`${i.get('stock')}: ${totalStock}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
})

export default observer(({ list, onPressItem, isLoading }) => {
  const renderItem = ({ item }) => {
    return <Item item={item} onPress={onPressItem} />
  }

  return (
    <FlatList
      data={list.slice()}
      renderItem={renderItem}
      ListEmptyComponent={<EmptyList isLoading={isLoading} />}
      style={styles.flatList}
    />
  )
})
