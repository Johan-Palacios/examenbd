/* eslint-disable react/jsx-handler-names */
import { Flex, Text, Box, Collapse, useDisclosure, Icon } from '@chakra-ui/react'
import NavItem from './NavItem.jsx'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useContext } from 'react'
import RenderContext from '@context/RenderContext.jsx'

const SidebarContent = (props) => {
  const handleCosa2 = useDisclosure()
  const handleCosa1 = useDisclosure()
  const { updateRenderContext } = useContext(RenderContext)
  const handleForm1 = () => {
    updateRenderContext('form1')
  }

  const handleForm2 = () => {
    updateRenderContext('form2')
  }

  const handleData1 = () => {
    updateRenderContext('data1')
  }

  const handleData2 = () => {
    updateRenderContext('data2')
  }

  return (
    <Box
      as='nav'
      pos='fixed'
      top='0'
      left='0'
      zIndex='sticky'
      h='full'
      pb='10'
      overflowX='hidden'
      overflowY='auto'
      bg='white'
      _dark={{
        bg: 'gray.800',
      }}
      border
      color='inherit'
      borderRightWidth='1px'
      w='60'
      {...props}
    >
      <Flex px='4' py='5' align='center'>
        <Text
          fontSize='2xl'
          ml='2'
          color='brand.500'
          _dark={{
            color: 'white',
          }}
          fontWeight='semibold'
        >
          Registro de Cosa
        </Text>
      </Flex>
      <Flex
        direction='column'
        as='nav'
        fontSize='sm'
        color='gray.600'
        aria-label='Main Navigation'
      >

        <NavItem onClick={handleCosa1.onToggle}>
          Gestionar Tabla 1
          <Icon
            as={ChevronDownIcon}
            ml='auto'
            transform={handleCosa1.isOpen && 'rotate(90deg)'}
          />
        </NavItem>
        <Collapse in={handleCosa1.isOpen}>
          <NavItem pl='12' py='2' onClick={handleForm1}>
            Agregar cosa 1
          </NavItem>

          <NavItem pl='12' py='2' onClick={handleData1}>
            Ver cosa 1
          </NavItem>
        </Collapse>

        <NavItem onClick={handleCosa2.onToggle}>
          Gestionar cosa 2
          <Icon
            as={ChevronDownIcon}
            ml='auto'
            transform={handleCosa2.isOpen && 'rotate(90deg)'}
          />
        </NavItem>
        <Collapse in={handleCosa2.isOpen}>
          <NavItem pl='12' py='2' onClick={handleForm2}>
            Agregar cosa 2
          </NavItem>

          <NavItem pl='12' py='2' onClick={handleData2}>
            Ver cosa 2
          </NavItem>
        </Collapse>
      </Flex>
    </Box>
  )
}

export default SidebarContent
