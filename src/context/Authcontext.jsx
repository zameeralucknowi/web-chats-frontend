import axios from "axios";
import { createContext, useEffect, useState } from "react";
import request from "../utils/requestMethods";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{

    const [user,setUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

    const [allUsers,setAllUsers] = useState([]);

    const [selectedUser,setSelectedUser] = useState(null);

    const [messages, setMessages] = useState([]);

    const getUsers = async()=>{
        try {
            const response = await request.get('/api/users',{
                withCredentials:true
            });
            setAllUsers(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error)
        }
    }

     const login = async(credentials) =>{
        try {
            const res = await request.post('/api/auth/login',credentials,{
                withCredentials:true
            });
            localStorage.setItem("chat-user",JSON.stringify(res?.data));
            setUser(res?.data);
        } catch (error) {
            console.log(error)
        }
    }

    const signup = async(credentials) =>{
        try {   
            const res = await request.post('/api/auth/signup',credentials,{
                withCredentials:true
            });
            localStorage.setItem("chat-user",JSON.stringify(res?.data));
            setUser(res?.data);
        } catch (error) {
            console.log(error)
        }
    }

  

    return (
    <AuthContext.Provider value={{login,user,setUser,signup,allUsers,selectedUser,setSelectedUser,getUsers,messages,setMessages}} >
        {children}
    </AuthContext.Provider>
    );

}

export default AuthContext;