import React from 'react';
import Form from './Form';
import MessageList from './MessageList';

const messages = [
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

const Chat = () => {
	return (
		<section className="w-full h-full flex flex-col">
			<div className="flex-1 overflow-y-auto flex flex-col-reverse pt-[10px] pb-[100px] [&::-webkit-scrollbar]:hidden">
				<MessageList messages={messages} />
			</div>

			<div className="shrink-0">
				<Form isChat={true} />
			</div>
		</section>
	);
};

export default Chat;
