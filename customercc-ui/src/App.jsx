import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login';
import SignUp from './pages/Signup';
import { Account } from './pages/Account';
import { CreditCards } from './pages/CreditCards';
import ProtectedRoute from "./handlers/ProtectedRoute";
import { AuthProvider } from './handlers/AuthContext';
import Header from './components/header';
import { Copyright } from "./components/footer";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <Router>
          <Header sx={{ marginTop: 8 }} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cards"
              element={
                <ProtectedRoute>
                  <CreditCards />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
        <Copyright sx={{ mt: 20, mb: 4 }} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App
