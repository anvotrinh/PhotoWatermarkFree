import React, { useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react-lite'

import ListItem from './list-item'
import { Button, Text, Icon, LoadingOverlay } from '../../../components'
import { ChildLang } from '../../../language'
import { Colors, Metrics } from '../../../theme'
import { useStores } from '../../../models/root-store'
import { changeOrderUp, changeOrderDown } from '../../../utils/array'

const styles = StyleSheet.create({
  btnAdd: {
    backgroundColor: Colors.primary,
    borderRadius: Metrics.space.big,
    bottom: Metrics.space.normal,
    height: Metrics.space.xLarge,
    position: 'absolute',
    right: Metrics.space.normal,
    width: Metrics.space.xLarge,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.grayOpacity(0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.space.small,
  },
  headerLeft: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    marginLeft: Metrics.space.xs,
  },
})

const Header = ({ onPress }) => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <Icon
        pack='material'
        name='person-outline'
        size={35}
        fill={Colors.black}
      />
      <Text category='h5' style={styles.headerTitle}>
        {ChildLang.settingChild}
      </Text>
    </View>
    <Button
      text={ChildLang.add}
      ghost
      status='primary'
      size='giant'
      onPress={onPress}
    />
  </View>
)

export default observer(({ header, shouldGetData }) => {
  const {
    navigationStore: { navigateTo },
    childStore: {
      childs,
      getChilds,
      changeOrder,
      isLoadingListChild,
      isLoadingChangeOrder,
    },
  } = useStores()

  useEffect(() => {
    if (shouldGetData) {
      getChilds()
    }
  }, [getChilds, shouldGetData])

  const handleItemPress = child => {
    navigateTo({
      routeName: 'AddChild',
      params: {
        child,
      },
    })
  }

  const handleItemUp = child => {
    const childIds = changeOrderUp(childs, child)
    if (childIds) {
      changeOrder(childIds)
    }
  }

  const handleItemDown = child => {
    const childIds = changeOrderDown(childs, child)
    if (childIds) {
      changeOrder(childIds)
    }
  }

  const handleAddItem = () => {
    navigateTo({ routeName: 'AddChild' })
  }

  return (
    <View style={styles.container}>
      <LoadingOverlay isLoading={isLoadingListChild || isLoadingChangeOrder} />
      {header && <Header onPress={handleAddItem} />}
      <ListItem
        list={childs}
        isLoading={isLoadingListChild}
        onPressItem={handleItemPress}
        onPressItemUp={handleItemUp}
        onPressItemDown={handleItemDown}
      />
      {!header && (
        <TouchableOpacity onPress={handleAddItem} style={styles.btnAdd}>
          <Icon
            pack='entypo'
            name='plus'
            size={Metrics.space.xLarge}
            color={Colors.white}
          />
        </TouchableOpacity>
      )}
    </View>
  )
})
