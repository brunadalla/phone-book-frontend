import { Routes, Route, Navigate } from "react-router-dom"

import Dashboard from "../pages/Dashboard"
import { Login } from "../pages/Login"

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}
