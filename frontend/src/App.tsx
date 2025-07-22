import React, { useEffect, useRef, useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';
import { User } from './types/User';
import { getRandomColors } from './colors';
import { v4 as uuidv4 } from 'uuid';

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

	const ws = useRef<WebSocket | null>(null);

	useEffect(() => {
		if (!user) return;

		const socket = new WebSocket(
			process.env.WEB_SOCKET_SERVER_URL as string
		);

		socket.onopen = () => {
			console.log('✅ Socket conectado');
		};

		socket.onerror = (err) => {
			console.error('❌ Erro no WebSocket:', err);
		};

		socket.onclose = () => {
			console.warn('🔌 Socket fechado');
		};

		ws.current = socket;
	}, [user]);

	const handleLogin = (username: string) => {
		const userObj: User = {
			id: uuidv4(),
			name: username,
			color: getRandomColors(),
		};
		setUser(userObj);
		localStorage.setItem('user', JSON.stringify(userObj));
	};

	const handleLogout = () => {
		ws.current?.close();
		setUser(null);
		localStorage.removeItem('user');
	};

	return (
		<section className="w-full h-[100dvh] flex items-center justify-center overflow-hidden">
			{!user ? (
				<Login onLogin={handleLogin} />
			) : (
				<Chat user={user} onLogout={handleLogout} socket={ws.current} />
			)}
		</section>
	);
}

export default App;
