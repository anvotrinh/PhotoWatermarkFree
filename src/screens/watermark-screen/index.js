import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'

import WatermarkOption from './watermark-option'
import WatermarkOrder from './watermark-order'
import WatermarkLogo from './watermark-logo'

export default observer(({ screen = 'option' }) => {
  const [currentScreen, setCurrentScreen] = useState(screen)
  switch (currentScreen) {
    case 'option':
      return <WatermarkOption setScreen={setCurrentScreen} />
    case 'order':
      return <WatermarkOrder setScreen={setCurrentScreen} />
    case 'logo':
      return <WatermarkLogo setScreen={setCurrentScreen} />
  }
})
