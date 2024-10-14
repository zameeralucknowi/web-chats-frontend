import React, { useContext,useEffect} from 'react'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import {Routes,Route, Navigate} from 'react-router-dom'
import Home from './Pages/Home'
import AuthContext from './context/AuthContext'
import SocketContext from './context/Socketcontext'
import {io} from 'socket.io-client'

const App = () => {

  const {user} = useContext(AuthContext);
  const{socket,setSocket} = useContext(SocketContext)  
  useEffect(()=>{
      if(user){
          const socket = io('https://web-chats-apis.onrender.com',{
              query:{
                  userId : user._id
              }
          });
          setSocket(socket);
      }
      else{
          if(socket){
              socket.close();
              setSocket(null)
          }
      }

  },[user])

  return (
    <>
    <Routes>
      <Route path='/' element={user?< Home/>: <Navigate to={'/login'} /> } />
      <Route path='/login' element={user? <Navigate to='/' /> : <Login/>} />
      <Route path='/signup' element={user? <Navigate to='/' /> :<Signup/>} />
    </Routes>
    
    </>
  )
}

export default App