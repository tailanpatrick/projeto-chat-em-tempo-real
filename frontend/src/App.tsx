import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Form from './components/Form';
import Chat from './components/Chat';

function App() {
	const [userName, setUserName] = useState<string>(
		() => localStorage.getItem('user_name') || ''
	);

	const handleLogin = (username: string) => {
		console.log('Usuário logado', userName);
		setUserName(username);
		localStorage.setItem('user_name', username);
	};

	const handleLogout = () => {
		setUserName('');
	};

	return (
		<section className="w-full h-[100dvh] flex items-center justify-center">
			{!userName ? (
				<Login onLogin={handleLogin} />
			) : (
				<Chat userName={userName} onLogout={handleLogout} />
			)}
		</section>
	);
}

export default App;
