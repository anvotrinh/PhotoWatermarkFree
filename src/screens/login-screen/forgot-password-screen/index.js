import React from 'react'
import { View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Formik } from 'formik'
import * as yup from 'yup'

import i from '../../../i18n'
import { useStores } from '../../../models/root-store'
import {
  Button,
  Input,
  Text,
  Header,
  LoadingOverlay,
  LayoutKeyboardDismiss,
  FormRow,
} from '../../../components'
import { Metrics, Colors } from '../../../theme'

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: Metrics.space.medium,
  },
  registerNow: {
    color: Colors.primary,
  },
  registerWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: Metrics.space.small,
  },
  space: {
    flex: 1,
  },
})

const formInitialValues = {
  email: '',
}

const formValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email(i.get('email_invalid'))
    .required(i.get('email_required')),
})

export default observer(() => {
  const {
    navigationStore: { goBack, replace },
    authStore: { resetPassword, isLoadingResetPassword },
  } = useStores()

  const handleRegister = () => {
    goBack()
    replace({ routeName: 'Register' })
  }

  const renderForm = ({
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
  }) => {
    return (
      <View style={styles.form}>
        <FormRow label={i.get('email')} error={touched.email && errors.email}>
          <Input
            placeholder={i.get('email_placeholder')}
            value={values.email}
            onChangeText={handleChange('email')}
            keyboardType='email-address'
            autoCapitalize='none'
          />
        </FormRow>
        <View style={styles.space} />
        <Button text={i.get('submit')} size='giant' onPress={handleSubmit} />
        <View style={styles.registerWrapper}>
          <Text category='s2'>
            {i.get('dont_have_account')}
            <Text
              category='s2'
              style={styles.registerNow}
              onPress={handleRegister}
            >
              {i.get('register_now')}
            </Text>
          </Text>
        </View>
      </View>
    )
  }

  return (
    <LayoutKeyboardDismiss>
      <LoadingOverlay isLoading={isLoadingResetPassword} />
      <Header title={i.get('forgot_password')} />
      <Formik
        initialValues={formInitialValues}
        validationSchema={formValidationSchema}
        validateOnChange={true}
        onSubmit={resetPassword}
      >
        {renderForm}
      </Formik>
    </LayoutKeyboardDismiss>
  )
})
