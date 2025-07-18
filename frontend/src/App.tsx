import React from 'react';
import Login from './components/Login';
import Form from './components/Form';
import Chat from './components/Chat';

function App() {
	return (
		<section className="w-full h-[100dvh] flex items-center justify-center">
			<Login />

			<Chat />
		</section>
	);
}

export default App;
