import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#2089DC',
  },
  title: {
    position: 'absolute',
    color: 'white',
    fontSize: 25,
  },
  space: {
    flex: 1,
  },
})

export const Header = ({ navigation, title, hasBack = true, onNext }) => {
  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      {hasBack ? (
        <Button
          icon={<Icon name='ios-arrow-back' size={40} color='white' />}
          onPress={handleBack}
          type='clear'
        />
      ) : (
        <View />
      )}
      <View style={styles.space} />
      {onNext ? (
        <Button
          icon={<Icon name='ios-arrow-forward' size={40} color='white' />}
          onPress={onNext}
          type='clear'
        />
      ) : (
        <View />
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}
