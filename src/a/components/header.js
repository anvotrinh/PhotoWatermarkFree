import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from '../../theme'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.baliHai,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
  },
  space: {
    flex: 1,
  },
  title: {
    color: Colors.white,
    fontSize: 25,
    position: 'absolute',
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
