// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components
import Header from './components/Header'
import Footer from './components/Footer'
import Body from './components/Body'
import Sorting from './components/Sorting'
import Searching from './components/Searching'
import Stack from './components/Stack'
import Array from './components/Array'
import LinkedList from './components/LinkedList'
import Queue from './components/Queue'
import Login from './components/Login'
import Register from './components/Register'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute><Body /></PrivateRoute>} />
        <Route path="/array" element={<PrivateRoute><Array /></PrivateRoute>} />
        <Route path="/sorting" element={<PrivateRoute><Sorting /></PrivateRoute>} />
        <Route path="/searching" element={<PrivateRoute><Searching /></PrivateRoute>} />
        <Route path="/stack" element={<PrivateRoute><Stack /></PrivateRoute>} />
        <Route path="/linkedlist" element={<PrivateRoute><LinkedList /></PrivateRoute>} />
        <Route path="/queue" element={<PrivateRoute><Queue /></PrivateRoute>} />
      </Routes>
      <Footer />
    </Router>
  )
}









