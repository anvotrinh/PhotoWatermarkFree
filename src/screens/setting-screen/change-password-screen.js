import React from 'react'
import { View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Formik } from 'formik'
import * as yup from 'yup'

import i from '../../i18n'
import { useStores } from '../../models/root-store'
import {
  Button,
  Input,
  LoadingOverlay,
  Header,
  LayoutKeyboardDismiss,
  FormRow,
} from '../../components'
import { Metrics } from '../../theme'

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: Metrics.space.medium,
  },
})

const formInitialValues = {
  current_password: '',
  password: '',
  confirm_password: '',
}

const formValidationSchema = yup.object().shape({
  current_password: yup.string().required(i.get('current_password_required')),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      i.get('password_weak_warning'),
    )
    .required(i.get('password_required')),
  confirm_password: yup
    .string()
    .required(i.get('confirm_password_required'))
    .test('passwords-match', i.get('passwords_not_match'), function (value) {
      return this.parent.password === value
    }),
})

const renderForm = ({
  values,
  touched,
  errors,
  handleSubmit,
  handleChange,
}) => {
  return (
    <View style={styles.form}>
      <FormRow
        label={i.get('current_password')}
        error={touched.current_password && errors.current_password}
      >
        <Input
          placeholder={i.get('current_password_placeholder')}
          value={values.current_password}
          onChangeText={handleChange('current_password')}
          secureTextEntry={true}
          autoCapitalize='none'
        />
      </FormRow>
      <FormRow
        label={i.get('new_password')}
        error={touched.password && errors.password}
      >
        <Input
          placeholder={i.get('password_placeholder')}
          value={values.password}
          onChangeText={handleChange('password')}
          secureTextEntry={true}
          autoCapitalize='none'
        />
      </FormRow>
      <FormRow
        label={i.get('confirm_new_password')}
        error={touched.confirm_password && errors.confirm_password}
      >
        <Input
          placeholder={i.get('confirm_password_placeholder')}
          value={values.confirm_password}
          onChangeText={handleChange('confirm_password')}
          secureTextEntry={true}
          autoCapitalize='none'
        />
      </FormRow>
      <View style={{ flex: 1 }} />
      <Button text={i.get('submit')} size='giant' onPress={handleSubmit} />
    </View>
  )
}

export default observer(() => {
  const {
    userStore: { changePassword, isLoadingChangePassword },
  } = useStores()

  return (
    <LayoutKeyboardDismiss>
      <LoadingOverlay isLoading={isLoadingChangePassword} />
      <Header title={i.get('change_password')} />
      <Formik
        initialValues={formInitialValues}
        validationSchema={formValidationSchema}
        validateOnChange={true}
        onSubmit={changePassword}
      >
        {renderForm}
      </Formik>
    </LayoutKeyboardDismiss>
  )
})
