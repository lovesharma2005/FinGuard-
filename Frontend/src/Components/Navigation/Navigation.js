import React from 'react'
import styled from 'styled-components'
import { signout } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'
import { useGlobalContext } from '../../context/globalContext';

function Navigation({active, setActive}) {
    const { user } = useGlobalContext();
    const handleSignOut = () => {
        // Add any cleanup logic here (like clearing tokens/state)
        setActive(1); // Navigate back to login page
    };

    return (
        <NavStyled>
            <div className="user-con">
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <div className="text">
                    <h1>{user.data.user.username}</h1>
                    <p>{user.data.user.email}</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active': ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className="bottom-nav">
                <li onClick={handleSignOut}>
                    {signout} Sign Out
                </li>
            </div>
        </NavStyled>
    )
}

const NavStyled = styled.nav`
    padding: 1rem 2rem;
    width: 100%;
    height: 80px;
    background: white;
    border-bottom: 3px solid var(--background-light);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    user-select: none;

    .user-con {
        display: flex;
        align-items: center;
        gap: 1rem;
        
        img {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid var(--color-green);
            padding: .2rem;
        }
        
        h2 {
            color: var(--primary-color);
            font-size: 1.3rem;
        }
        
        p {
            color: var(--primary-color3);
            font-size: 0.9rem;
        }
        user-select: none;
        
        h2, p {
            user-select: none;
        }
    }

    .menu-items {
        flex: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3rem;

        li {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            color: var(--primary-color3);
            cursor: pointer;
            transition: all .4s ease-in-out;
            padding: 0.5rem 1rem;
            border-radius: 30px;
            font-weight: 500;
            user-select: none;
            -webkit-user-select: none;

            &:hover {
                color: var(--primary-color);
                background: var(--background-light);
            }

            svg {
                font-size: 1.4rem;
            }
        }
    }

    .active {
        background: var(--primary-color) !important;
        color: white !important;
        border-radius: 30px;
    }

    .bottom-nav {
        li {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            color: var(--color-delete);
            cursor: pointer;
            transition: all .4s ease-in-out;
            padding: 0.5rem 1rem;
            border-radius: 30px;
            font-weight: 500;
            user-select: none;
            -webkit-user-select: none;

            &:hover {
                background: var(--color-delete);
                color: white;
            }

            svg {
                font-size: 1.4rem;
            }
        }
    }

    @media (max-width: 768px) {
        padding: 1rem;
        
        .menu-items {
            display: none;
        }
        
        .user-con {
            .text {
                display: none;
            }
        }
    }`;
export default Navigation