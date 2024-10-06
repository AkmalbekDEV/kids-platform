import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthContext.jsx'
import ThemeProvider from './context/ThemeContext.jsx'
import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <ChakraProvider>
        <BrowserRouter>
          <AuthProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </AuthProvider>
        </BrowserRouter>
      </ChakraProvider>
    </I18nextProvider>
  </StrictMode>,
)

// <Avatar bg='teal.500' />