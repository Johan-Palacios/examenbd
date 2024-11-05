import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Stack, useToast } from '@chakra-ui/react'
import FormBase from '../../components/forms/FormBase.jsx'
import { useState } from 'react'
import fetchInsert from '@utils/fetch/fetchInsert.js'

const VisitanteForm = () => {
  const toast = useToast()
  const [dpi, setDPI] = useState()
  const [nombre, setNombre] = useState()
  const [apellido, setApellido] = useState()
  const [telefono, setTelefono] = useState()
  const [direccion, setDireccion] = useState()
  const fetchInsertVisitante = async (data) => {
    await fetchInsert('http://localhost:8000/insertar-visitante',
      data,
      toast,
      'No se pudo insertar el Visitante', 'Visitante Guardado')
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const vistanteData = { dpi: parseInt(dpi), nombre, apellido, telefono, direccion }
    fetchInsertVisitante(vistanteData)
    e.target.reset()
    setDPI('')
  }
  const handleDPI = (e) => {
    const input = e.target.value
    if (/^\d{0,13}$/.test(input)) {
      setDPI(input)
    }
  }

  return (
    <>
      <FormBase onSubmit={handleSubmit} nameForm='Form 2'>
        <FormControl>
          <Stack spacing={4}>

            <FormLabel>DPI Visitante </FormLabel>
            <Input type='text' inputMode='numeric' maxLength={13} minLength={13} placeholder='Ejemplo: 2979348101301' value={dpi} required onChange={(e) => handleDPI(e)} />

            <FormLabel>Nombre Visitante </FormLabel>
            <Input type='text' placeholder='Ejemplo: Juan Emiliano' maxLength={50} required onChange={(e) => setNombre(e.target.value)} />

            <FormLabel>Apellidos Visitante </FormLabel>
            <Input type='text' placeholder='Ejemplo:  Paredes Camposeco' required maxLength={50} onChange={(e) => setApellido(e.target.value)} />

            <FormLabel>Telefono Visitante </FormLabel>
            <InputGroup>
              <InputLeftAddon>+502</InputLeftAddon>
              <Input type='tel' placeholder='Ejemplo: 54214310' maxLength={8} minLength={8} required onChange={(e) => setTelefono(e.target.value)} />
            </InputGroup>

            <FormLabel>Dirección Visitante </FormLabel>
            <Input type='text' placeholder='Ejemplo:  Zona XX, Avenida XXXX ...' maxLength={250} required onChange={(e) => setDireccion(e.target.value)} />

            <Button
              mt={4}
              colorScheme='teal'
              type='submit'
            >
              Guardar
            </Button>

          </Stack>
        </FormControl>
      </FormBase>

    </>
  )
}
export default VisitanteForm
