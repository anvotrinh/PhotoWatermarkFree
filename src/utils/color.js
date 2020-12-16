function hexToRgb(hexColor) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor)
  if (!result) {
    return [0, 0, 0]
  }
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ]
}

export function opacityFunction(hexColor) {
  return opacity => {
    const [r, g, b] = hexToRgb(hexColor)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }
}
