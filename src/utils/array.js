export const changeOrderDown = (arr, ele) => {
  if (arr.length < 2) {
    return null
  }
  const eleIndex = arr.findIndex(e => e.id === ele.id)
  if (eleIndex === -1 || eleIndex >= arr.length - 1) {
    return null
  }
  return arr.map((e, index) => {
    if (index === eleIndex) {
      return arr[eleIndex + 1].id
    } else if (index === eleIndex + 1) {
      return arr[eleIndex].id
    }
    return e.id
  })
}

export const changeOrderUp = (arr, ele) => {
  if (arr.length < 2) {
    return null
  }
  const eleIndex = arr.findIndex(e => e.id === ele.id)
  if (eleIndex === -1 || eleIndex === 0) {
    return null
  }
  return arr.map((e, index) => {
    if (index === eleIndex) {
      return arr[eleIndex - 1].id
    } else if (index === eleIndex - 1) {
      return arr[eleIndex].id
    }
    return e.id
  })
}

export const sortByOrder = arr => {
  return arr.sort((a, b) => a.order > b.order)
}

export const changeOrderDownLocal = (arr, index) => {
  if (arr.length < 2) {
    return arr
  }
  if (index >= arr.length - 1) {
    return arr
  }
  return arr.map((e, i) => {
    if (i === index) {
      return arr[index + 1]
    } else if (i === index + 1) {
      return arr[index]
    }
    return e
  })
}

export const changeOrderUpLocal = (arr, index) => {
  if (arr.length < 2) {
    return arr
  }
  if (index === 0) {
    return arr
  }
  return arr.map((e, i) => {
    if (i === index) {
      return arr[index - 1]
    } else if (i === index - 1) {
      return arr[index]
    }
    return e
  })
}

export const findById = (arr, id) => {
  return arr.find(e => e.id === id)
}
