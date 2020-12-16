import React from 'react'
import { View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Formik } from 'formik'
import * as yup from 'yup'

import i from '../../i18n'
import { useStores } from '../../models/root-store'
import {
  FormRow,
  Button,
  Text,
  Input,
  LoadingOverlay,
  Header,
  LayoutKeyboardDismiss,
} from '../../components'
import { Metrics, Colors } from '../../theme'

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: Metrics.space.medium,
  },
  btnForgotPassword: {
    justifyContent: 'flex-end',
    paddingRight: 0,
  },
  registerWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Metrics.space.small,
  },
  registerNow: {
    color: Colors.primary,
  },
})

const formInitialValues = {
  email: '',
  password: '',
}

const formValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email(i.get('email_invalid'))
    .required(i.get('email_required')),
  password: yup.string().required(i.get('password_required')),
})

export default observer(() => {
  const {
    navigationStore: { navigateTo, replace },
    authStore: { login, isLoadingLogin },
  } = useStores()

  const handleForgotPassword = () => {
    navigateTo({ routeName: 'ForgotPassword' })
  }

  const handleRegister = () => {
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
        <FormRow
          label={i.get('password')}
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
        <Button
          text={i.get('forgot_password')}
          onPress={handleForgotPassword}
          ghost
          status='basic'
          style={styles.btnForgotPassword}
        />
        <View style={{ flex: 1 }} />
        <Button text={i.get('login')} size='giant' onPress={handleSubmit} />
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
      <LoadingOverlay isLoading={isLoadingLogin} />
      <Header title={i.get('login')} />
      <Formik
        initialValues={formInitialValues}
        validationSchema={formValidationSchema}
        validateOnChange={true}
        onSubmit={login}
      >
        {renderForm}
      </Formik>
    </LayoutKeyboardDismiss>
  )
})
