import React, {useState, useEffect} from 'react'
import './App.scss'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Landing from './pages/Landing/Landing'
import Profile from './pages/Profile/Profile'
import ForgetPassword from './pages/ForgetPassword/ForgetPassword'
import jwt from 'jwt-decode'
import {BrowserRouter,Routes,Route,Navigate,useLocation} from 'react-router-dom';
import AuthContext from './context/AuthContext'
import SaveContext from './context/SaveContext'
import Dictionary from './pages/Dictionary/Dictionary'
import NotFound404 from './pages/NotFound404/NotFound404'

function App() {

  const [user, setUser] = useState(localStorage.getItem("access") ? jwt(localStorage.getItem("access")) : null);
  const [savedState,setSavedState] = useState(JSON.parse(localStorage.getItem("savedState")))
  const [alive,setAlive] = useState(true)

  useEffect(()=>{
    // console.log(user)
    if(!user){
      // console.log("LOGGED OUT")
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
    }

  },[user])


  return (
    <AuthContext.Provider value={{user,setUser}}>
      <SaveContext.Provider value={{savedState,setSavedState}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/dictionaries/:dictionaryId" element={<ProtectedRoute user={user}><Dictionary/></ProtectedRoute>} />
            <Route path="/dictionaries" element={<ProtectedRoute user={user}><Home/></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute user={user}><Profile/></ProtectedRoute>} />
            <Route path="/login" element={<ProtectedRoute user={user} redirect="/dictionaries"><Login></Login></ProtectedRoute>}></Route>
            <Route path="/forget" element={<ProtectedRoute user={user} redirect="/dictionaries"><ForgetPassword></ForgetPassword></ProtectedRoute>}></Route>
            <Route path="/register" element={<ProtectedRoute user={user} redirect="/dictionaries"><Register></Register></ProtectedRoute>}></Route>
            <Route path="/404" element={<NotFound404></NotFound404>}></Route>
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </BrowserRouter>
      </SaveContext.Provider>
    </AuthContext.Provider>
      
    
  )
}

function ProtectedRoute({user,redirect,children}){
  const location = useLocation()

  if(!user){
    console.log('location.pathname', location.pathname)
    if(redirect){
      return children
    }
    return <Navigate to="/login" replace></Navigate>
  }
  else if (user && redirect){
    return <Navigate to={redirect} replace></Navigate>
  }
  else{

  }
  return children;
}

export default App