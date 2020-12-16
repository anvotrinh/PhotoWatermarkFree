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
  Text,
  Header,
  LoadingOverlay,
  LayoutKeyboardDismiss,
  FormRow,
  Datepicker,
} from '../../components'
import { Metrics, Colors } from '../../theme'
import { formatDate, MAX_BIRTHDAY, MIN_BIRTHDAY } from '../../utils/date'

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: Metrics.space.medium,
  },
  login: {
    color: Colors.primary,
  },
  loginWrapper: {
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
  name: '',
  birthday: new Date(),
  password: '',
  confirm_password: '',
}

const formValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email(i.get('email_invalid'))
    .required(i.get('email_required')),
  name: yup.string().required(i.get('name_required')),
  birthday: yup.date().required(i.get('birthday_required')),
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

export default observer(() => {
  const {
    navigationStore: { replace },
    authStore: { register, isLoadingRegister },
  } = useStores()

  const handleLogin = () => {
    replace({ routeName: 'Login' })
  }

  const handleSubmit = values => {
    const data = {
      ...values,
      birthday: formatDate(values.birthday),
    }
    register(data)
  }

  const renderForm = ({
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
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
        <FormRow label={i.get('name')} error={touched.name && errors.name}>
          <Input
            placeholder={i.get('name_placeholder')}
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
          />
        </FormRow>
        <FormRow
          label={i.get('birthday')}
          error={touched.birthday && errors.birthday}
        >
          <Datepicker
            value={values.birthday}
            onChange={date => setFieldValue('birthday', date)}
            minimumDate={MIN_BIRTHDAY}
            maximumDate={MAX_BIRTHDAY}
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
        <FormRow
          label={i.get('confirm_password')}
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
        <View style={styles.space} />
        <Button text={i.get('register')} size='giant' onPress={handleSubmit} />
        <View style={styles.loginWrapper}>
          <Text category='s2'>
            {i.get('have_an_account')}
            <Text category='s2' style={styles.login} onPress={handleLogin}>
              {i.get('login')}
            </Text>
          </Text>
        </View>
      </View>
    )
  }

  return (
    <LayoutKeyboardDismiss>
      <LoadingOverlay isLoading={isLoadingRegister} />
      <Header title={i.get('register')} />
      <Formik
        initialValues={formInitialValues}
        validationSchema={formValidationSchema}
        validateOnChange={true}
        onSubmit={handleSubmit}
      >
        {renderForm}
      </Formik>
    </LayoutKeyboardDismiss>
  )
})
