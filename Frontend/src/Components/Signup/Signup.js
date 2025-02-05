import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

function Signup({ onNavigateToLogin }) {
    const { signupUser, setError } = useGlobalContext();
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: ''
    });

    const handleInput = (name) => (e) => {
        setFormData({ ...formData, [name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await signupUser(formData); 
        if (success) {
            onNavigateToLogin(); 
        } else {
            alert(setError);
        }
    };

    return (
        <SignupStyled>
            <div className="signup-container">
                <h1>Create Your Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-control">
                        <input
                            type="email"
                            value={formData.email}
                            placeholder="Email"
                            onChange={handleInput('email')}
                            required
                        />
                    </div>
                    <div className="input-control">
                        <input
                            type="text"
                            value={formData.username}
                            placeholder="Username"
                            onChange={handleInput('username')}
                            required
                        />
                    </div>
                    <div className="input-control">
                        <input
                            type="password"
                            value={formData.password}
                            placeholder="Password"
                            onChange={handleInput('password')}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Sign Up</button>
                </form>
                <p className="login-link">Already have an account? <span onClick={onNavigateToLogin} style={{ cursor: 'pointer', color: 'var(--color-green)' }}>Login</span></p>
            </div>
        </SignupStyled>
    );
}

const SignupStyled = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #e0f7fa, #b2ebf2); /* Lighter gradient for a fresh look */
    color: #333;

    .signup-container {
        background: white;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        width: 400px;
        text-align: center;

        h1 {
            margin-bottom: 1.5rem;
            font-size: 2rem;
            color: var(--primary-color);
            font-family: 'Arial', sans-serif;
        }

        .input-control {
            margin-bottom: 1rem;

            input {
                width: 100%;
                padding: 1rem;
                border: 2px solid #e0e0e0;
                border-radius: 5px;
                font-size: 1rem;
                transition: border-color 0.3s;

                &:focus {
                    border-color: var(--color-green);
                    outline: none;
                }
            }
        }

        .submit-btn {
            width: 100%;
            padding: 1rem;
            background: var(--color-green);
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.3s;

            &:hover {
                background: darkgreen;
            }
        }

        .login-link {
            margin-top: 1rem;
            font-size: 0.9rem;

            span {
                color: var(--color-green);
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
`;

export default Signup;