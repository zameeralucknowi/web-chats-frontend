import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import styled from 'styled-components';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ userName: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            login(formData);
        } catch (error) {
            console.error(error);
            alert("Error during login.");
        }
    };

    return (
        <LoginContainer>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="userName" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                
                {/* Link to the signup page */}
                <Link to="/signup" style={{ margin: '10px 0', textDecoration: 'none', color: '#2196F3' }}>
                    Don't have an Account? Sign Up
                </Link>

                <button type="submit">Login</button>
            </form>
        </LoginContainer>
    );
};

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    

    form {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 400px;
    }

    input {
        margin: 10px 0;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px; // Optional: rounded corners
    }

    button {
        padding: 10px;
        background-color: #2196F3;
        color: white;
        font-size: 16px;
        cursor: pointer;
        border: none; // Remove border for button
        border-radius: 4px; // Optional: rounded corners
    }
`;

export default Login;
