import React, { useEffect, useState, useRef } from 'react'; // Importe useRef
import Form from './Form';
import MessageList from './MessageList';
import { User } from '../types/User';

interface ChatProps {
	user: User;
	onLogout: () => void;
	socket: WebSocket | null;
}

interface Message {
	id: number;
	text: string;
	user: User;
	color: string;
}

const Chat = ({ user, onLogout, socket }: ChatProps) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const messagesEndRef = useRef<HTMLDivElement>(null); // Ref para rolar até o final

	const handleSendMessage = (text: string) => {
		if (!text.trim()) return;

		const newMessage: Message = {
			id: messages.length + 1,
			text,
			user: user,
			color: user.color,
		};

		// Crucial: Adiciona a nova mensagem AO FINAL do array
		setMessages((prev) => [...prev, newMessage]);

		socket?.send(JSON.stringify(newMessage));
	};

	useEffect(() => {
		if (!socket) return;

		const handleSocketMessage = (event: MessageEvent) => {
			// Renomeada para clareza
			try {
				const receivedMessage: Message = JSON.parse(event.data);
				// Crucial: Adiciona a mensagem recebida AO FINAL do array
				setMessages((prev) => [...prev, receivedMessage]);
			} catch (error) {
				console.error('Erro ao processar mensagem', error);
			}
		};

		// Anexa o event listener corretamente
		socket.addEventListener('message', handleSocketMessage);

		// Função de limpeza para remover o listener quando o componente desmontar ou o socket mudar
		return () => {
			socket.removeEventListener('message', handleSocketMessage);
		};
	}, [socket]); // Dependência no 'socket'

	// Rola para o final sempre que as mensagens mudam
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]); // Disparado quando o array 'messages' é atualizado

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

			{/* Contêiner para as mensagens:
                - flex flex-col: Empilha as mensagens de cima para baixo.
                - justify-end: Alinha o conteúdo à parte inferior quando há espaço extra.
            */}
			<div className="flex-1 overflow-y-auto flex flex-col h-full justify-end pt-[10px] pb-[100px] [&::-webkit-scrollbar]:hidden">
				<MessageList messages={messages} loggedUser={user} />
				{/* Elemento para rolar para a visualização, posicionado no final */}
				<div ref={messagesEndRef} />
			</div>

			<div className="shrink-0">
				<Form isChat={true} onSubmit={handleSendMessage} />
			</div>
		</section>
	);
};

export default Chat;
