import React, {useState, useMemo} from 'react'
import styled from "styled-components";
import bg from './img/bg.png'
import {MainLayout} from './styles/Layouts'
import Orb from './Components/Orb/Orb'
import Navigation from './Components/Navigation/Navigation'
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income'
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import Login from './Components/Login/login';
import Signup from './Components/Signup/Signup';
const BASE_URL = "http://localhost:5000/api/v1/";
function App() {
	const [active, setActive] = useState(1)

	const global = useGlobalContext()

	const displayData = () => {
		switch(active){
			case 1:
				return <Login setActive={setActive} />
			case 2:
				return <Dashboard />
			case 3:
				return <Income />
			case 4: 
				return <Expenses />
			case 5:
				return <Signup onNavigateToLogin={() => setActive(1)} />
			default: 
				return <Login setActive={setActive} />
		}
	}

	const orbMemo = useMemo(() => {
		return <Orb />
	},[])

	return (
		<AppStyled bg={bg} className="App">
			{active !== 1 && active !== 5 && <Navigation active={active} setActive={setActive} />}
			<main>
				{displayData()}
			</main>
		</AppStyled>
	);
}

const AppStyled = styled.div`
	height: 100vh;
	background-image: url(${props => props.bg});
	position: relative;
	display: flex;
	flex-direction: column;

	main {
		flex: 1;
		background: rgba(252, 246, 249, 0.78);
		border: 3px solid #FFFFFF;
		backdrop-filter: blur(4.5px);
		border-radius: 32px;
		overflow-x: hidden;
		margin: 1rem 2rem;
		padding: 1rem;
		
		&::-webkit-scrollbar{
			width: 0;
		}
	}

	@media (max-width: 768px) {
		main {
			margin: 1rem;
		}
	}
`;

export default App;
