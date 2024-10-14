import React, { useState, useContext } from 'react'; 
import styled from 'styled-components'; 
import { Link } from 'react-router-dom'; // Import Link
import AuthContext from '../context/AuthContext';  

const StyledForm = styled.form`   
    display: flex;   
    flex-direction: column;   
    max-width: 400px;   
    margin: 20px auto;   
    padding: 20px;   
    border: 1px solid #ccc;   
    border-radius: 8px;   
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);      

    h2 {     
        text-align: center;     
        margin-bottom: 20px;   
    }    

    input, select {     
        margin-bottom: 15px;     
        padding: 10px;     
        border: 1px solid #ccc;     
        border-radius: 4px;     
        font-size: 16px;      

        &:focus {       
            border-color: #007BFF;       
            outline: none;     
        }   
    }    

    button {     
        padding: 10px;     
        border: none;     
        border-radius: 4px;     
        background-color: #007BFF;     
        color: white;     
        font-size: 16px;     
        cursor: pointer;      

        &:hover {       
            background-color: #0056b3;     
        }   
    } 

    .link {     
        margin: 10px 0;     
        text-align: center;     
        text-decoration: none;     
        color: #2196F3; // Color for the link     
    } 
`;  

const Signup = () => {   
    const { signup } = useContext(AuthContext);   
    const [formData, setFormData] = useState({     
        fullName: '',     
        userName: '',     
        password: '',     
        confirmPassword: '',     
        gender: 'male',   
    });    

    const handleSubmit = async (e) => {     
        e.preventDefault();     
        try {         
            await signup(formData);     
        } catch (error) {         
            console.log(error);     
        }   
    };    

    return (     
        <StyledForm onSubmit={handleSubmit}>       
            <h2>Signup</h2>       
            <input         
                type="text"         
                placeholder="Full Name"         
                value={formData.fullName}         
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}         
                required       
            />       
            <input         
                type="text"         
                placeholder="Username"         
                value={formData.userName}         
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}         
                required       
            />       
            <input         
                type="password"         
                placeholder="Password"         
                value={formData.password}         
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}         
                required       
            />       
            <input         
                type="password"         
                placeholder="Confirm Password"         
                value={formData.confirmPassword}         
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}         
                required       
            />       
            <label>         
                Gender:         
                <select           
                    value={formData.gender}           
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}         
                >           
                    <option value="male">Male</option>           
                    <option value="female">Female</option>         
                </select>       
            </label>       
            
            {/* Link to the login page */}
            <Link to="/login" className="link">Already have an account? Login</Link>

            <button type="submit">Signup</button>     
        </StyledForm>   
    ); 
};  

export default Signup;



