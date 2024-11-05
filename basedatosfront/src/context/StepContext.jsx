import { createContext } from 'react'
import { PropTypes } from 'prop-types'
import { useSteps } from '@chakra-ui/react'

const StepContext = createContext()

export const StepProvider = ({ children }) => {
  const steps = [
    { title: 'Ingresar DPI', description: 'Asignar Visita' },
    { title: 'Asignar Trámite', description: 'Selección de Tramite Deseado' },
    { title: 'Confirmar Trámites', description: 'Asegurarse que los trámites sean los correctos' },
  ]

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  })

  const updateStepIndex = (index) => {
    setActiveStep(index)
  }

  return (
    <StepContext.Provider value={{ activeStep, updateStepIndex, steps }}>
      {children}
    </StepContext.Provider>
  )
}

export default StepContext

StepProvider.propTypes = {
  children: PropTypes.element
}
