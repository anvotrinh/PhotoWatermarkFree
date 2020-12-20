import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'

import i from '../../../i18n'
import { useStores } from '../../../models/root-store'
import { Input, CheckBox, FormRow } from '../../../components'
import { Colors, Metrics } from '../../../theme'

const styles = StyleSheet.create({
  checkBox: {
    backgroundColor: Colors.white,
    marginLeft: Metrics.space.xs,
    paddingHorizontal: Metrics.space.xs,
    paddingVertical: Metrics.space.small,
  },
  container: {
    marginBottom: Metrics.space.normal,
    paddingHorizontal: Metrics.space.small,
  },
  prefixTextLabel: {
    color: Colors.gray,
    fontWeight: 'bold',
  },
  textCheckBox: {
    fontWeight: 'bold',
  },
})

export default observer(({ mode, setMode }) => {
  const {
    watermarkStore: { orderPrefix, updateData },
  } = useStores()

  return (
    <View style={styles.container}>
      <CheckBox
        text={i.get('mark_by_order')}
        style={styles.checkBox}
        textStyle={styles.textCheckBox}
        checked={mode === 'order'}
        onChange={() => setMode('order')}
      />
      {mode === 'order' && (
        <FormRow
          label={i.get('prefix_text')}
          labelStyle={styles.prefixTextLabel}
        >
          <Input
            value={orderPrefix}
            onChangeText={orderPrefix => updateData({ orderPrefix })}
          />
        </FormRow>
      )}
    </View>
  )
})
