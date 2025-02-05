import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

function Login({ setActive }) {
    const {loginUser, setError } = useGlobalContext();
    const [formData, setFormData] = useState({
        email: '',
        // username: '',
        password: ''
    });
    
    const handleInput = (name) => (e) => {
        setFormData({ ...formData, [name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //const { email, password } = formData;

        const loginSuccess = await loginUser(formData);

        if (loginSuccess) {
            setActive(2);
        } else {
            setError('Invalid credentials. Please try again.')
            alert('Invalid credentials. Please try again.')
        }
    };

    return (
        <LoginStyled>
            <div className="login-container">
                <div className="login-header">
                    <h1>Welcome Back!</h1>
                    <p>Please login to continue</p>
                </div>
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
                    {/* <div className="input-control">
                        <input
                            type="username"
                            value={formData.username}
                            placeholder="Username"
                            onChange={handleInput('username')}
                            required
                        />
                    </div> */}
                    <div className="input-control">
                        <input
                            type="password"
                            value={formData.password}
                            placeholder="Password"
                            onChange={handleInput('password')}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                </form>
                <div className="additional-options">
                    <p>Don't have an account? <span onClick={() => setActive(5)} style={{ cursor: 'pointer', color: 'var(--color-green)' }}>Sign Up</span></p>
                    <p>Forgot Password?</p>
                </div>
            </div>
        </LoginStyled>
    );
}

const LoginStyled = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(252, 246, 249, 0.78);
    backdrop-filter: blur(4.5px);
    border-radius: 32px;

    .login-container {
        background: white;
        border-radius: 20px;
        padding: 3rem 4rem;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        width: 100%;
        max-width: 450px;
        
        .login-header {
            text-align: center;
            margin-bottom: 2rem;
            
            h1 {
                font-size: 2.5rem;
                font-weight: 600;
                color: var(--primary-color);
                margin-bottom: 1rem;
            }
            
            p {
                color: var(--primary-color3);
            }
        }

        form {
            .input-control {
                margin-bottom: 1.5rem;
                
                input {
                    width: 100%;
                    padding: 1rem;
                    border: 2px solid #fff;
                    border-radius: 10px;
                    background: var(--background-light);
                    font-size: 1.1rem;
                    transition: all 0.3s ease;
                    
                    &:focus {
                        border-color: var(--color-green);
                        background: white;
                        box-shadow: 0px 0px 0px 4px rgba(39, 174, 96, 0.1);
                    }
                }
            }

            .submit-btn {
                width: 100%;
                padding: 1rem;
                background: var(--color-green);
                border: none;
                border-radius: 10px;
                color: white;
                font-size: 1.2rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                
                &:hover {
                    background: var(--color-green);
                    transform: translateY(-2px);
                }
            }
        }

        .additional-options {
            margin-top: 2rem;
            text-align: center;
            
            p {
                color: var(--primary-color3);
                margin: 0.5rem 0;
                
                span {
                    color: var(--color-green);
                    cursor: pointer;
                    font-weight: 600;
                    
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }

    @media (max-width: 500px) {
        .login-container {
            padding: 2rem;
        }
    }
`;

export default Login;