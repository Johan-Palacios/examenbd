const fetchQuery = async (endPoint, data) => {
  try {
    const response = await fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.log('falle xd')
  }
}
export default fetchQuery
