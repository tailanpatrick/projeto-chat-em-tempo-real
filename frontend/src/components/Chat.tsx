import React, { useEffect, useState } from 'react';
import Form from './Form';
import MessageList from './MessageList';
import { User } from '../types/User';

const Chat = ({ user, onLogout }: { user: User; onLogout: () => void }) => {
	const initialMessages = [
		{
			id: 1,
			text: 'Oi, tudo bem?',
			isMe: false,
			sender: 'João',
			color: user.color,
		},
		{
			id: 2,
			text: 'Tudo certo e você?',
			isMe: true,
			sender: user.name,
			color: user.color,
		},
		{
			id: 4,
			text: 'Ótimo saber!',
			isMe: true,
			sender: user.name,
			color: user.color,
		},
		{
			id: 4,
			text: 'Ótimo saber!',
			isMe: true,
			sender: user.name,
			color: user.color,
		},
		{
			id: 4,
			text: 'Ótimo saber!',
			isMe: true,
			sender: user.name,
			color: user.color,
		},
		{
			id: 4,
			text: 'Ótimo saber!',
			isMe: true,
			sender: user.name,
			color: user.color,
		},
		{
			id: 4,
			text: 'Ótimo saber!',
			isMe: true,
			sender: user.name,
			color: user.color,
		},
		{
			id: 3,
			text: 'Tranquilo por aqui!',
			isMe: false,
			sender: 'João',
			color: user.color,
		},
		{
			id: 3,
			text: 'Tranquilo por aqui!',
			isMe: false,
			sender: 'João',
			color: user.color,
		},
		{
			id: 3,
			text: 'Tranquilo por aqui!',
			isMe: false,
			sender: 'João',
			color: user.color,
		},
		{
			id: 3,
			text: 'Tranquilo por aqui!',
			isMe: false,
			sender: 'João',
			color: user.color,
		},
	];

	const [messages, setMessages] = useState(initialMessages);

	const handleSendMessage = (text: string) => {
		if (!text.trim()) return;

		const newMessage = {
			id: messages.length + 1,
			text,
			isMe: true,
			sender: user.name,
			color: user.color,
		};

		setMessages((prev) => [newMessage, ...prev]);
	};

	return (
		<section className="w-full h-full flex-col">
			<header className="p-4 flex justify-between items-center bg-[#1e1e1e] text-white sticky top-0 z-10">
				<h2 className="text-lg font-semibold">Olá, {user.name}!</h2>
				<button
					onClick={onLogout}
					className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
				>
					Trocar usuário
				</button>
			</header>

			<div className="flex-1 overflow-y-auto flex flex-col-reverse pt-[10px] pb-[100px] [&::-webkit-scrollbar]:hidden">
				<MessageList messages={messages} />
			</div>

			<div className="shrink-0">
				<Form isChat={true} onSubmit={handleSendMessage} />
			</div>
		</section>
	);
};

export default Chat;
