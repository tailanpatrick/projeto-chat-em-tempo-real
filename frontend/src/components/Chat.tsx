import React, { useEffect, useState } from 'react';
import Form from './Form';
import MessageList from './MessageList';

const initialMessages = [
	{ id: 1, text: 'Oi, tudo bem?', isMe: false, sender: 'João' },
	{ id: 2, text: 'Tudo certo e você?', isMe: true, sender: 'Você' },
	{ id: 4, text: 'Ótimo saber!', isMe: true, sender: 'Você' },
	{ id: 4, text: 'Ótimo saber!', isMe: true, sender: 'Você' },
	{ id: 4, text: 'Ótimo saber!', isMe: true, sender: 'Você' },
	{ id: 4, text: 'Ótimo saber!', isMe: true, sender: 'Você' },
	{ id: 4, text: 'Ótimo saber!', isMe: true, sender: 'Você' },
	{ id: 3, text: 'Tranquilo por aqui!', isMe: false, sender: 'João' },
	{ id: 3, text: 'Tranquilo por aqui!', isMe: false, sender: 'João' },
	{ id: 3, text: 'Tranquilo por aqui!', isMe: false, sender: 'João' },
	{ id: 3, text: 'Tranquilo por aqui!', isMe: false, sender: 'João' },
];

const Chat = ({
	userName,
	onLogout,
}: {
	userName: string;
	onLogout: () => void;
}) => {
	const [messages, setMessages] = useState(initialMessages);

	const handleSendMessage = (text: string) => {
		if (!text.trim()) return;

		const newMessage = {
			id: messages.length + 1,
			text,
			isMe: true,
			sender: userName,
		};

		setMessages((prev) => [newMessage, ...prev]);
	};

	return (
		<section className="w-full h-full flex-col">
			<header className="p-4 flex justify-between items-center bg-[#1e1e1e] text-white sticky top-0 z-10">
				<h2 className="text-lg font-semibold">
					Seja bem vindo(a), {userName}!
				</h2>
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
