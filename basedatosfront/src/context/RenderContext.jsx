import { createContext, useState } from 'react'
import { PropTypes } from 'prop-types'

const RenderContext = createContext()

export const RenderProvider = ({ children }) => {
  const [formRender, setFormRender] = useState({
    form1: false,
    form2: false,
    data1: false,
    data2: false
  })

  const updateRenderContext = (componentKey) => {
    setFormRender((prevVisibility) => {
      const newVisibility = Object.keys(prevVisibility).reduce((acc, key) => {
        acc[key] = false
        return acc
      }, {})

      newVisibility[componentKey] = !prevVisibility[componentKey]

      return newVisibility
    })
  }

  return (
    <RenderContext.Provider value={{ formRender, updateRenderContext }}>
      {children}
    </RenderContext.Provider>
  )
}

export default RenderContext

RenderProvider.propTypes = {
  children: PropTypes.element
}
