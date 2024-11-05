import useGetFetch from '@/hooks/useGetFetch'
import TableInfo from '@/components/userInteraction/info/TableInfo'
import { Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'

const VisitantesInfo = () => {
  const { data: visitantes, loading: loadingVisitantes } = useGetFetch('http://localhost:8000/visitantes')
  return (
    <>
      <Skeleton isLoaded={!loadingVisitantes} fadeDuration={0.4}>
        {!loadingVisitantes
          ? <TableInfo
              data={visitantes}
              primaryKey='idVisitanteNumber'
              ignoreFields={['idVisitanteNumber']}
              title='Registro de Visitantes'
            />
          : <></>}
      </Skeleton>

    </>

  )
}

export default VisitantesInfo
