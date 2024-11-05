import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import theme from './libs/theme'
import App from './App.jsx'
import { RenderProvider } from '@context/RenderContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RenderProvider>
        <RouterProvider router={router} />
      </RenderProvider>
    </ChakraProvider>
  </StrictMode>
)
