import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { ConfigPage } from './pages/ConfigPage'
import { PresenterPage } from './pages/PresenterPage'

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
      <AppRouter />
    </BrowserRouter>
  )
}
