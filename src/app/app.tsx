import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ConfigPage } from './pages/ConfigPage'
import { PresenterPage } from './pages/PresenterPage'
import { CssBaseline, CssVarsProvider } from '@mui/joy'

const AppRouter = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<ConfigPage />} />
        <Route path="/present" element={<PresenterPage />} />
      </Routes>
    </main>
  )
}

export const App = () => {
  return (
    <BrowserRouter>
      <CssVarsProvider>
        <CssBaseline />
        <AppRouter />
      </CssVarsProvider>
    </BrowserRouter>
  )
}
