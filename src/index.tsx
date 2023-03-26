import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './services/store'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { SnackbarProvider } from 'notistack'
import { theme } from './theme'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider>
          <CssBaseline />
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
)
