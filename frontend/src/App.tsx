import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Form from './components/Form';
import Chat from './components/Chat';

function App() {
	const [userName, setUserName] = useState<string>(
		() => localStorage.getItem('userName') || ''
	);

	const handleLogin = (username: string) => {
		console.log('Usuário logado', userName);
		setUserName(username);
	};

	return (
		<section className="w-full h-[100dvh] flex items-center justify-center">
			{!userName ? (
				<Login onLogin={handleLogin} />
			) : (
				<Chat userName={userName} />
			)}
		</section>
	);
}

export default App;
