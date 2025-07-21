import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';
import { User } from './types/User';
import { getRandomColors } from './colors';

function App() {
	const [user, setUser] = useState<User | null>(() => {
		try {
			const saved = localStorage.getItem('user');
			return saved ? (JSON.parse(saved) as User) : null;
		} catch (error) {
			console.error('Erro ao carregar usuário:', error);
			return null;
		}
	});
	const handleLogin = (username: string) => {
		const userObj: User = {
			id: crypto.randomUUID(),
			name: username,
			color: getRandomColors(),
		};
		setUser(userObj);
		localStorage.setItem('user', JSON.stringify(userObj));

		console.log('Usuário logado', userObj);
	};

	const handleLogout = () => {
		setUser(null);
	};

	return (
		<section className="w-full h-[100dvh] flex items-center justify-center">
			{!user ? (
				<Login onLogin={handleLogin} />
			) : (
				<Chat user={user} onLogout={handleLogout} />
			)}
		</section>
	);
}

export default App;
