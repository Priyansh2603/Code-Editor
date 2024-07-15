import React from 'react'
import { ChakraProvider,Box } from '@chakra-ui/react'
export default function Chakra() {
  return (
    <ChakraProvider>
        <Box> Hey </Box>
    </ChakraProvider>
  )
}
