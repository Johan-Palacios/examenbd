import TableInfo from '@/components/userInteraction/info/TableInfo'
import useGetFetch from '@/hooks/useGetFetch'
import { Skeleton } from '@chakra-ui/react'
const EdificiosInfo = () => {
  const { data: edificios, loading: loadingEdificios } = useGetFetch('http://localhost:8000/edificios')
  return (

    <>
      <Skeleton isLoaded={!loadingEdificios} fadeDuration={0.4}>
        {!loadingEdificios
          ? <TableInfo
              data={edificios}
              primaryKey='idEdificioNumber'
              ignoreFields={['idEdificioNumber']}
              title='Registro de Edificios'
            />
          : <></>}
      </Skeleton>

    </>

  )
}

export default EdificiosInfo
