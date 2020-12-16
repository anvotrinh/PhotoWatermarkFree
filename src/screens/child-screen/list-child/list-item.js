import React from 'react'
import { observer } from 'mobx-react-lite'
import { TouchableOpacity, View, StyleSheet, FlatList } from 'react-native'

import { ButtonCircleIcon, Text, Avatar, EmptyList } from '../../../components'
import { Metrics, Colors } from '../../../theme'
import { ChildLang } from '../../../language'

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: Colors.white,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrics.space.small,
    borderColor: Colors.primary,
    borderBottomWidth: 1,
  },
  topItem: {
    borderTopWidth: 1,
  },
  itemBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
  },
  infoWrapper: {
    flex: 1,
    marginLeft: Metrics.space.normal,
  },
  textName: {
    fontSize: 16,
  },
  btnWrapper: {
    flexDirection: 'row',
  },
  btn: {
    marginHorizontal: Metrics.space.xs,
  },
})

const Item = observer(
  ({ item, isTop, isBottom, onPress, onPressUp, onPressDown }) => {
    const handlePress = () => {
      onPress(item)
    }

    const handlePressUp = () => {
      onPressUp(item)
    }

    const handlePressDown = () => {
      onPressDown(item)
    }

    const avatarSource = item.avatar_url ? { uri: item.avatar_url } : null
    return (
      <View
        style={[
          styles.item,
          isTop && styles.topItem,
          { backgroundColor: item.color },
        ]}
      >
        <TouchableOpacity onPress={handlePress} style={styles.itemBody}>
          <Avatar size={50} source={avatarSource} />
          <View style={styles.infoWrapper}>
            <Text numberOfLines={1} style={styles.textName}>
              {item.name}
            </Text>
            <Text>{item.birthday}</Text>
            <Text>{ChildLang[item.gender] || ''}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.btnWrapper}>
          <ButtonCircleIcon
            onPress={handlePressUp}
            size={50}
            outline
            iconPack='material'
            iconName='arrow-upward'
            iconColor={Colors.black}
            iconSize={20}
            disabled={isTop}
            style={styles.btn}
          />
          <ButtonCircleIcon
            onPress={handlePressDown}
            size={50}
            outline
            iconPack='material'
            iconName='arrow-downward'
            iconColor={Colors.black}
            iconSize={20}
            disabled={isBottom}
            style={styles.btn}
          />
        </View>
      </View>
    )
  },
)

export default observer(
  ({ list, onPressItem, onPressItemUp, onPressItemDown, isLoading }) => {
    const renderItem = ({ item, index }) => {
      return (
        <Item
          item={item}
          isTop={index === 0}
          isBottom={index === list.length - 1}
          onPress={onPressItem}
          onPressUp={onPressItemUp}
          onPressDown={onPressItemDown}
        />
      )
    }

    return (
      <FlatList
        data={list.slice()}
        renderItem={renderItem}
        style={styles.flatList}
        ListEmptyComponent={
          <EmptyList
            isLoading={isLoading}
            description={ChildLang.emptyChildList}
          />
        }
      />
    )
  },
)
