import { getIn } from 'formik'

export function getArrayFieldErrorMessage(touched, errors, name) {
  const touch = getIn(touched, name)
  const error = getIn(errors, name)
  return touch && error ? error : null
}
