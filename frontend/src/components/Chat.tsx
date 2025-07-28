import React, { useEffect, useState, useRef } from 'react';
import Form from './Form';
import MessageList, { Message } from './MessageList';
import { User } from '../types/User';
import { v4 as uuidv4 } from 'uuid';

interface ChatProps {
	user: User;
	onLogout: () => void;
	socket: WebSocket | null;
}

const Chat = ({ user, onLogout, socket }: ChatProps) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const handleSendMessage = (text: string) => {
		if (!text.trim()) return;

		const newMessage: Message = {
			id: uuidv4(),
			text,
			user: user,
			color: user.color,
		};

		socket?.send(JSON.stringify(newMessage));
	};

	useEffect(() => {
		if (!socket) return;

		const handleSocketMessage = (event: MessageEvent) => {
			try {
				const receivedMessage: Message = JSON.parse(event.data);
				setMessages((prev) => [...prev, receivedMessage]);
			} catch (error) {
				console.error('Erro ao processar mensagem', error);
			}
		};

		socket.addEventListener('message', handleSocketMessage);

		return () => {
			socket.removeEventListener('message', handleSocketMessage);
		};
	}, [socket]);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<section className="w-full h-full flex flex-col">
			<header className="p-4 flex justify-between items-center bg-[#1e1e1e] text-white sticky top-0 z-10">
				<h2 className="text-lg font-semibold">Olá, {user.name}!</h2>
				<button
					onClick={onLogout}
					className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
				>
					Trocar usuário
				</button>
			</header>

			<div className="flex-1 overflow-y-auto flex flex-col justify-end pt-[10px] pb-[100px] [&::-webkit-scrollbar]:hidden">
				{' '}
				<MessageList
					messages={messages}
					loggedUser={user}
					bottomRef={messagesEndRef}
				/>
			</div>

			<div className="shrink-0">
				<Form isChat={true} onSubmit={handleSendMessage} />
			</div>
		</section>
	);
};

export default Chat;
