import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Formik } from 'formik'
import * as yup from 'yup'

import i from '../../../i18n'
import SelectColor from './select-color'
import { useStores } from '../../../models/root-store'
import {
  Layout,
  Header,
  AvatarUpload,
  Button,
  Text,
  Input,
  SelectOption,
  FormRow,
  LoadingOverlay,
  Datepicker,
  ModalConfirm,
  ScrollView,
} from '../../../components'
import { formatDate, MIN_BIRTHDAY, MAX_BIRTHDAY } from '../../../utils/date'
import { Metrics } from '../../../theme'

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginVertical: Metrics.space.small,
  },
  btnDelete: {
    marginTop: Metrics.space.medium,
  },
  btnSubmit: {
    marginTop: Metrics.space.medium,
  },
  form: {
    paddingBottom: Metrics.space.small,
    paddingHorizontal: Metrics.space.medium,
  },
})

const defaultFormInitialValues = {
  avatar: null,
  name: '',
  birthday: new Date(),
  gender: '',
  color: '',
}

const formValidationSchema = yup.object().shape({
  avatar: yup
    .object()
    .shape({
      uri: yup.string().required(),
    })
    .nullable(),
  name: yup.string().required(i.get('nameRequired')),
  color: yup.string().required(i.get('colorRequired')),
  birthday: yup.date().required(i.get('birthdayRequired')),
  gender: yup.string().required(i.get('genderRequired')),
})

export default observer(({ navigation }) => {
  const child = navigation.getParam('child')

  const [formInitialValues, setFormInitialValues] = useState(
    defaultFormInitialValues,
  )

  const {
    childStore: {
      addChild,
      updateChild,
      deleteChild,
      isLoadingAddChild,
      isLoadingUpdateChild,
      isLoadingDeleteChild,
    },
  } = useStores()

  const [visibleModal, setVisibleModal] = useState(false)

  useEffect(() => {
    if (!child) {
      return
    }
    const { avatar_url, name, birthday, gender, color } = child
    setFormInitialValues({
      avatar: avatar_url ? { uri: avatar_url } : null,
      name,
      birthday: new Date(birthday),
      gender,
      color,
    })
  }, [child])

  const handleSubmit = values => {
    const data = {
      ...values,
      birthday: formatDate(values.birthday),
    }
    if (child) {
      updateChild(child.id, data)
    } else {
      addChild(data)
    }
  }

  const handleDeleteChild = () => {
    setVisibleModal(false)
    deleteChild(child.id)
  }

  const handleCancelConfirm = () => {
    setVisibleModal(false)
  }

  const handleDeleteConfirm = () => {
    setVisibleModal(true)
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
          <Text>{i.get('setPhoto')}</Text>
        </View>
        <FormRow label={i.get('name')} error={touched.name && errors.name}>
          <Input
            placeholder={i.get('namePlaceholder')}
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
          label={i.get('gender')}
          error={touched.gender && errors.gender}
        >
          <SelectOption
            data={i.get('genderOptions')}
            value={values.gender}
            onChange={gender => setFieldValue('gender', gender)}
          />
        </FormRow>
        <FormRow label={i.get('color')} error={touched.color && errors.color}>
          <SelectColor
            value={values.color}
            onChange={color => setFieldValue('color', color)}
          />
        </FormRow>
        <Button
          text={child ? i.get('update') : i.get('add')}
          size='large'
          onPress={handleSubmit}
          style={styles.btnSubmit}
        />
        {child && (
          <Button
            text={i.get('delete')}
            outline
            size='large'
            status='danger'
            onPress={handleDeleteConfirm}
            style={styles.btnDelete}
          />
        )}
      </View>
    )
  }

  return (
    <Layout>
      <LoadingOverlay
        isLoading={
          isLoadingAddChild || isLoadingUpdateChild || isLoadingDeleteChild
        }
      />
      <Header title={i.get('title')} />
      <ScrollView>
        <Formik
          enableReinitialize
          initialValues={formInitialValues}
          validationSchema={formValidationSchema}
          validateOnChange={true}
          onSubmit={handleSubmit}
        >
          {renderForm}
        </Formik>
      </ScrollView>
      <ModalConfirm
        visible={visibleModal}
        title={i.get('deleteConfirmTitle')}
        positiveText={i.get('ok')}
        negativeText={i.get('cancel')}
        onExecute={handleDeleteChild}
        onCancel={handleCancelConfirm}
      />
    </Layout>
  )
})
