import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        user-select: none;
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
    }

    :root{
        --primary-color: #2c3e50;
        --primary-color2: rgba(44, 62, 80, 0.6);
        --primary-color3: rgba(44, 62, 80, 0.4);
        --color-green: #27ae60;
        --color-grey: #bdc3c7;
        --color-accent: #e74c3c;
        --color-delete: #c0392b;
        --background-light: rgba(252, 246, 249, 0.78);
        --border-radius: 15px;
        --box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
    }

    /* Only allow text selection in input fields and textareas when focused */
    input:focus, textarea:focus {
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
    }

    /* Remove outline and cursor styles */
    * {
        outline: none !important;
        -webkit-tap-highlight-color: transparent;
        cursor: default;
    }

    /* Add cursor pointer only to clickable elements */
    button, 
    a, 
    li,
    input[type="submit"],
    input[type="button"],
    .clickable {
        cursor: pointer;
    }

    /* Remove focus outline from inputs */
    input:focus,
    textarea:focus,
    select:focus,
    button:focus {
        outline: none;
    }

    body{
        font-family: 'Inter', sans-serif;
        font-size: clamp(1rem, 1.5vw, 1.2rem);
        background: #ecf0f1;
        color: var(--primary-color2);
        overflow: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    h1, h2, h3, h4, h5, h6{
        color: var(--primary-color);
    }

    .error{
        color: red;
        animation: shake 0.5s ease-in-out;
        @keyframes shake {
            0%{
                transform: translateX(0);
            }
            25%{
                transform: translateX(10px);
            }
            50%{
                transform: translateX(-10px);
            }
            75%{
                transform: translateX(10px);
            }
            100%{
                transform: translateX(0);
            }
        }
    }

    .amount {
        display: flex;
        align-items: center;
        
        span {
            font-size: 1.5rem;
            margin-right: 0.5rem;
        }
    }

    .rupee {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
    }
`;