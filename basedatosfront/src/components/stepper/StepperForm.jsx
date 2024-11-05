import StepContext from '@context/StepContext'
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Box,
} from '@chakra-ui/react'
import { PropTypes } from 'prop-types'
import { useContext } from 'react'

const StepperForm = ({ steps }) => {
  const { activeStep, updateStepIndex } = useContext(StepContext)

  return (
    <Stepper size='lg' index={activeStep} marginBottom={16}>
      {steps.map((step, index) => (
        <Step key={index} onClick={() => updateStepIndex(index)}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink='1' flexWrap='wrap'>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>
          <StepSeparator />

        </Step>
      ))}
    </Stepper>
  )
}

StepperForm.propTypes = {
  steps: PropTypes.array
}

export default StepperForm
