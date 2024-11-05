const fetchInsert = async (endPoint, data, toast, errMessage, doneMessage) => {
  const insertToast = toast({
    title: 'Conectando con el servidor',
    description: 'Cargando...',
    status: 'loading',
  })

  try {
    const response = await fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    toast.close(insertToast)
    if (response.ok) {
      toast({
        title: 'Inserción Exitosa',
        description: doneMessage,
        status: 'success',
      })
    }
    if (!response.ok) {
      toast({
        title: 'Error',
        description: errMessage,
        status: 'error',
      })
    }
  } catch (error) {
    toast({
      title: 'Error',
      description: 'No se pudo establecer conexión con el servidor',
      status: 'error',
    })
  }
}
export default fetchInsert
