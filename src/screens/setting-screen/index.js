import React from 'react'
import { View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Formik } from 'formik'
import * as yup from 'yup'

import i from '../../i18n'
import { useStores } from '../../models/root-store'
import {
  Layout,
  Header,
  AvatarUpload,
  Button,
  Text,
  Input,
  FormRow,
  LoadingOverlay,
  ScrollView,
  showMessage,
  Datepicker,
} from '../../components'
import { Metrics, Colors } from '../../theme'
import { MAX_BIRTHDAY, MIN_BIRTHDAY } from '../../utils/date'

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginVertical: Metrics.space.small,
  },
  btn: {
    justifyContent: 'space-between',
    marginBottom: Metrics.space.small,
  },
  btnSubmit: {
    marginTop: Metrics.space.medium,
  },
  content: {
    marginBottom: Metrics.space.medium,
    paddingHorizontal: Metrics.space.medium,
  },
  emailWrapper: {
    backgroundColor: Colors.whiteLilac,
    borderColor: Colors.whiteCatskill,
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
  form: {
    paddingBottom: Metrics.space.small,
  },
  textEmail: {
    marginLeft: Metrics.space.xs,
  },
})

const formValidationSchema = yup.object().shape({
  avatar: yup
    .object()
    .shape({
      uri: yup.string().required(),
    })
    .nullable(),
  name: yup.string().required(i.get('name_required')),
  birthday: yup.date().required(i.get('birthday_required')),
})

export default observer(() => {
  const {
    authStore: { logout },
    userStore: { profile, updateProfile, isLoadingUpdateProfile },
    navigationStore: { navigateTo },
  } = useStores()

  const handleSubmit = values => {
    updateProfile({ ...values }, () => {
      showMessage('success', i.get('update_profile_success'))
    })
  }

  const handleChangePassword = () => {
    navigateTo({ routeName: 'ChangePassword' })
  }

  const renderForm = ({
    values,
    touched,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
  }) => {
    return (
      <View style={styles.form}>
        <View style={styles.avatarContainer}>
          <AvatarUpload
            source={values.avatar}
            onChange={source => setFieldValue('avatar', source)}
            size={150}
          />
          <Text status='danger'>{touched.avatar && errors.avatar}</Text>
        </View>
        <FormRow label={i.get('email')}>
          <View style={styles.emailWrapper}>
            <Text style={styles.textEmail} status='info'>
              {profile.email}
            </Text>
          </View>
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
        <Button
          text={i.get('update')}
          size='large'
          onPress={handleSubmit}
          style={styles.btnSubmit}
        />
      </View>
    )
  }

  const formInitialValues = {
    avatar: profile.avatar_url ? { uri: profile.avatar_url } : null,
    name: profile.name,
    birthday: new Date(profile.birthday),
  }

  return (
    <Layout>
      <LoadingOverlay isLoading={isLoadingUpdateProfile} />
      <Header title={i.get('setting')} hasBack={false} />
      <ScrollView style={styles.content}>
        <Formik
          enableReinitialize
          initialValues={formInitialValues}
          validationSchema={formValidationSchema}
          validateOnChange={true}
          onSubmit={handleSubmit}
        >
          {renderForm}
        </Formik>
        <Button
          text={i.get('change_password')}
          onPress={handleChangePassword}
          iconPack='entypo'
          iconName='lock'
          size='large'
          outline
          style={styles.btn}
        />
        <Button
          text={i.get('logout')}
          size='large'
          appearance='outline'
          status='basic'
          outline
          onPress={logout}
        />
      </ScrollView>
    </Layout>
  )
})
