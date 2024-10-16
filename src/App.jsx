import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Product from './pages/Product'
import Pricing from "./pages/Pricing"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import AppLayout from "./pages/AppLayout"
import CityList from "./components/CityList"
import { useEffect, useState } from "react"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"
import { CitiesProvider } from "./contexts/CitiesContext"
import { AuthProvider } from "./contexts/FakeAuthContext"
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {

  return <AuthProvider>
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />}></Route>
          <Route path="product" element={<Product />}></Route>
          <Route path="pricing" element={<Pricing />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="app" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />}></Route>
            <Route path="countries" element={<CountryList />}></Route>
            <Route path="cities/:id" element={<City />}></Route>
            <Route path="form" element={<Form />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  </AuthProvider>
}

export default App
