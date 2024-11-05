import { Search2Icon } from '@chakra-ui/icons'
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useState } from 'react'

const TableInfo = ({ data, edit, remove, primaryKey, title, ignoreFields = [] }) => {
  const [filterText, setFilterText] = useState('')
  const headerBgColor = useColorModeValue('blue.500', 'blue.700')
  const headerColor = useColorModeValue('white', 'white')
  const rowHoverColor = useColorModeValue('gray.100', 'gray.600')
  const rowBgColor = useColorModeValue('white', 'gray.800')

  const headers = data.length > 0 ? Object.keys(data[0]).filter((header) => !ignoreFields.includes(header)) : []

  const filteredData = data.filter((row) =>
    headers.some((header) =>
      row[header]?.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  )

  return (
    <>
      <InputGroup>
        <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
          <Search2Icon />

        </InputLeftElement>

        <Input
          placeholder='Busqueda Interactiva...'
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          mb={4}
          maxW='300px'
        />
      </InputGroup>
      <TableContainer boxShadow='md' borderRadius='md'>
        <Table variant='simple' size='sm'>
          <TableCaption>{title}</TableCaption>
          <Thead backgroundColor={headerColor}>
            <Tr backgroundColor={headerBgColor}>
              {headers.map((header) => (
                <Th key={header} isNumeric={typeof data[0][header] === 'number'}>
                  {header}
                </Th>
              ))}
              {(edit || remove) && <Th>Actions</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((row, rowIndex) => (
              <Tr key={row[primaryKey] || rowIndex} _hover={{ backgroundColor: rowHoverColor }} backgroundColor={rowIndex % 2 === 0 ? rowBgColor : 'transparent'}>
                {headers.map((header) => (
                  <Td key={header} isNumeric={typeof row[header] === 'number'} padding={4}>
                    {row[header]}
                  </Td>
                ))}
                {(edit || remove) && (
                  <Td>
                    {edit && (
                      <Button
                        colorScheme='blue'
                        size='sm'
                        onClick={() => edit(row)} // Pasa el objeto completo
                        mr={2}
                      >
                        Edit
                      </Button>
                    )}
                    {remove && (
                      <Button
                        colorScheme='red'
                        size='sm'
                        onClick={() => remove(row)} // Pasa el objeto completo
                      >
                        Remove
                      </Button>
                    )}
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

// PropTypes para definir la estructura esperada
TableInfo.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  edit: PropTypes.func,
  remove: PropTypes.func,
  primaryKey: PropTypes.string.isRequired,
  title: PropTypes.string,
  ignoreFields: PropTypes.array
}

export default TableInfo
