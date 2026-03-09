import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { AddCountryPage } from './pages/AddCountryPage/AddCountryPage'
import { CountryDetailsPage } from './pages/CountryDetailsPage/CountryDetailsPage'
import { HomePage } from './pages/HomePage/HomePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddCountryPage />} />
          <Route path="/country/:code" element={<CountryDetailsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
