import TableInfo from '@/components/userInteraction/info/TableInfo'
import useGetFetch from '@/hooks/useGetFetch'
import { Skeleton } from '@chakra-ui/react'

const FuncionariosInfo = () => {
  const { data: tramites, loading: loadingTramites } = useGetFetch('http://localhost:8000/tramites')
  return (
    <>
      <Skeleton isLoaded={!loadingTramites} fadeDuration={0.4}>
        {!loadingTramites
          ? <TableInfo
              data={tramites}
              primaryKey='idTramiteNumber'
              ignoreFields={['idTramiteNumber']}
              title='Registro de Tramites'
            />
          : <></>}
      </Skeleton>

    </>

  )
}

export default FuncionariosInfo
