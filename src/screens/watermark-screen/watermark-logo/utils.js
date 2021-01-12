export const CODE_X_MARGIN_PERCENT = 0.02
export const CODE_Y_MARGIN_PERCENT = 0.02

export function getCodePos(w, h, codeLoc) {
  const marginX = CODE_X_MARGIN_PERCENT * w
  const marginY = CODE_Y_MARGIN_PERCENT * h
  switch (codeLoc) {
    case 'top_left':
      return {
        top: marginX,
        left: marginY,
      }
    case 'top_right':
      return {
        top: marginX,
        right: marginY,
      }
    case 'bottom_left':
      return {
        bottom: marginX,
        left: marginY,
      }
    case 'bottom_right':
      return {
        bottom: marginX,
        right: marginY,
      }
    default:
      return [0, 0]
  }
}
