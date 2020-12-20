import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import Preview from './preview'
import Generate from './generate'
import { useStores } from '../../../models/root-store'

export default observer(({ setScreen }) => {
  const {
    watermarkStore: { updateData },
  } = useStores()
  const [step, setStep] = useState('preview')

  useEffect(() => {
    updateData({
      xPercent: 0.6,
      yPercent: 0.36,
      fontSize: 37,
    })
  }, [])

  const handlePreviewNext = () => {
    setStep('generate')
  }

  const handleGenerateSuccess = () => {
    setScreen('option')
  }

  const handleBack = () => {
    setScreen('option')
  }

  switch (step) {
    case 'preview':
      return <Preview onNext={handlePreviewNext} onBack={handleBack} />
    case 'generate':
      return <Generate onSuccess={handleGenerateSuccess} onBack={handleBack} />
    default:
      return null
  }
})
