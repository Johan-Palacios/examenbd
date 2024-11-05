import RenderContext from '@context/RenderContext.jsx'
import VisitanteForm from '@pages/forms/VisitanteForm'
import Form2 from '@pages/forms/Form2'
import Sidebar from '@pages/SideBar.jsx'
import { useContext } from 'react'
import EdificiosInfo from './pages/info/EdificiosInfo'

function App () {
  const { formRender } = useContext(RenderContext)

  return (
    <>
      ? <Sidebar>
        {formRender.form1 ? <VisitanteForm /> : <></>}
        {formRender.form2 ? <Form2 /> : <></>}
        {formRender.data1 ? <EdificiosInfo /> : <></>}
        {formRender.data2 ? <VisitanteForm /> : <></>}
        {/* eslint-disable-next-line @stylistic/jsx-indent */}
        </Sidebar>
    </>
  )
}

export default App
