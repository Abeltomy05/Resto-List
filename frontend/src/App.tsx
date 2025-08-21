import { Routes, Route } from "react-router-dom";
import {Toaster} from 'react-hot-toast'
import LoginPage from "@/pages/Login-Page";
import SignupPage from "./pages/Signup-Page";
import PublicRoute from "./utils/protected/publicRoute";
import ProtectedRoute from "./utils/protected/protectedRoute";
import HomePage from "./pages/Home-page";


function App() {

  return (
    <>
      <Toaster
        position='top-center' reverseOrder={false} toastOptions={{duration:3000, style:{  background: '#333',color: '#fff',borderRadius: '8px'}}}/>

    <Routes>
       {/* Public routes */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      
      {/* Protected routes */}
       <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
    </Routes>
    </>
  )
}

export default App
