import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { FieldArray, Formik } from 'formik'
import ImagePicker from 'react-native-image-crop-picker'
import * as yup from 'yup'

import i from '../../../i18n'
import { useStores } from '../../../models/root-store'
import {
  Layout,
  Header,
  Button,
  Input,
  FormRow,
  LoadingOverlay,
  ModalConfirm,
  ScrollView,
  Increaser,
  ImageUpload,
  Text,
  showMessage,
  Modal,
} from '../../../components'
import { Metrics } from '../../../theme'
import { getArrayFieldErrorMessage } from '../../../utils/form'
import { toFullLocalPath } from '../../../utils/file'

const styles = StyleSheet.create({
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
  variation: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: Metrics.space.normal,
  },
  variationImage: {
    flex: 1,
  },
  variationStock: {
    flex: 1,
    padding: Metrics.space.small,
  },
  variationsAddBtn: {
    flex: 1,
    marginRight: Metrics.space.xs,
  },
  variationsBtnWrapper: {
    flexDirection: 'row',
  },
  variationsStockBtn: {
    flex: 1,
    marginLeft: Metrics.space.xs,
  },
})

const defaultFormInitialValues = {
  name: '',
  price: '0',
  variations: [],
}

const formValidationSchema = yup.object().shape({
  name: yup.string().required(i.get('name_required')),
  price: yup.number().required(i.get('price_required')),
  variations: yup
    .array()
    .of(
      yup.object().shape({
        image: yup
          .object()
          .shape({
            uri: yup.string().required(),
          })
          .required('image_url_required'),
        stock: yup.number().required('stock_required'),
      }),
    )
    .required(i.get('variations_required')),
})

export default observer(({ navigation }) => {
  const product = navigation.getParam('product')

  const [formInitialValues, setFormInitialValues] = useState(
    defaultFormInitialValues,
  )

  const {
    productStore: {
      addProduct,
      updateProduct,
      deleteProduct,
      isLoadingAddProduct,
      isLoadingUpdateProduct,
      isLoadingDeleteProduct,
    },
  } = useStores()

  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [allStockModalVisible, setAllStockModalVisible] = useState(false)
  const [allStock, setAllStock] = useState('0')

  useEffect(() => {
    if (!product) {
      return
    }
    const { name, price, image_urls, stocks } = product
    const stockArray = stocks.split(',')
    const variations = image_urls.split(',').map((imageUrl, i) => ({
      image: { uri: imageUrl },
      stock: stockArray[i],
    }))
    setFormInitialValues({
      name,
      price: price ? price.toString() : '0',
      variations,
    })
  }, [product])

  const handleSubmit = values => {
    if (product) {
      updateProduct(product.id, values)
    } else {
      addProduct(values)
    }
  }

  const handleDeleteProduct = () => {
    setDeleteModalVisible(false)
    deleteProduct(product.id)
  }

  const handleCancelConfirm = () => {
    setDeleteModalVisible(false)
  }

  const handleDeleteConfirm = () => {
    setDeleteModalVisible(true)
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
    const renderVariations = ({ remove, push }) => {
      const handleAddVariations = async () => {
        try {
          const images = await ImagePicker.openPicker({
            multiple: true,
            maxFiles: 100,
          })
          images.forEach(i => {
            const variation = {
              stock: '0',
              image: { uri: toFullLocalPath(i.path) },
            }
            push(variation)
          })
        } catch (e) {
          if (e.message === 'User cancelled image selection') {
            return
          }
          showMessage('success', e.message)
        }
      }

      const handleChangeAllStockSubmit = () => {
        for (const index in values.variations) {
          setFieldValue(`variations.${index}.stock`, allStock)
        }
        setAllStockModalVisible(false)
      }

      const variations = values.variations.map((variation, index) => {
        const stockFieldName = `variations.${index}.stock`
        const imageFieldName = `variations.${index}.image`
        return (
          <View style={styles.variation} key={index}>
            <View style={styles.variationImage}>
              <ImageUpload
                source={variation.image}
                onChange={source => setFieldValue(imageFieldName, source)}
                onRemove={() => remove(index)}
              />
              <Text status='danger'>
                {getArrayFieldErrorMessage(touched, errors, imageFieldName)}
              </Text>
            </View>
            <FormRow
              label={i.get('stock')}
              error={getArrayFieldErrorMessage(touched, errors, stockFieldName)}
              containerStyle={styles.variationStock}
            >
              <Increaser
                value={variation.stock}
                onChange={handleChange(stockFieldName)}
              />
            </FormRow>
          </View>
        )
      })
      return (
        <>
          <View style={styles.variationsBtnWrapper}>
            <Button
              size='small'
              text={i.get('add_variations')}
              iconName='plus'
              iconPack='ant-design'
              onPress={handleAddVariations}
              style={styles.variationsAddBtn}
            />
            <Button
              status='basic'
              outline
              size='small'
              text={i.get('change_all_stock')}
              onPress={() => setAllStockModalVisible(true)}
              style={styles.variationsStockBtn}
            />
          </View>
          {variations}
          <Modal
            visible={allStockModalVisible}
            onBackdropPress={() => setAllStockModalVisible(false)}
          >
            <Input
              value={allStock}
              onChangeText={setAllStock}
              keyboardType='numeric'
            />
            <Button
              text={i.get('submit')}
              onPress={handleChangeAllStockSubmit}
            />
          </Modal>
        </>
      )
    }
    return (
      <View style={styles.form}>
        <FormRow label={i.get('name')} error={touched.name && errors.name}>
          <Input
            placeholder={i.get('name_placeholder')}
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
          />
        </FormRow>
        <FormRow label={i.get('price')} error={touched.price && errors.price}>
          <Input
            placeholder={i.get('price_placeholder')}
            value={values.price}
            onChangeText={handleChange('price')}
            onBlur={handleBlur('price')}
            keyboardType='numeric'
          />
        </FormRow>
        <FormRow
          label={i.get('variation')}
          error={
            touched.variations && typeof errors.variations === 'string'
              ? errors.variations
              : null
          }
        >
          <FieldArray name='variations' render={renderVariations} />
        </FormRow>
        <Button
          text={product ? i.get('update') : i.get('add')}
          size='large'
          onPress={handleSubmit}
          style={styles.btnSubmit}
        />
        {product && (
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
          isLoadingAddProduct ||
          isLoadingUpdateProduct ||
          isLoadingDeleteProduct
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
        visible={deleteModalVisible}
        title={i.get('deleteConfirmTitle')}
        positiveText={i.get('ok')}
        negativeText={i.get('cancel')}
        onExecute={handleDeleteProduct}
        onCancel={handleCancelConfirm}
      />
    </Layout>
  )
})
