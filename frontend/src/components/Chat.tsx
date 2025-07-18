import React from 'react';
import Form from './Form';

const messages = [
	{ id: 1, text: 'Oi, tudo bem?', isMe: false, sender: 'João' },
	{ id: 2, text: 'Tudo certo e você?', isMe: true, sender: 'Você' },
	{ id: 3, text: 'Tranquilo por aqui!', isMe: false, sender: 'João' },
	{ id: 4, text: 'Ótimo saber!', isMe: true, sender: 'Você' },
];

const Chat = () => {
	return (
		<section className="w-full h-full">
			<section className="flex-1 h-full flex flex-col justify-end px-[30px] pt-[30px] pb-[90px] space-y-4 overflow-y-auto">
				{messages.map((msg) => (
					<div
						key={msg.id}
						className={`flex flex-col ${
							msg.isMe ? 'items-start' : 'items-end'
						}`}
					>
						<span
							className={`text-sm font-semibold mb-1 ${
								msg.isMe ? 'text-green-600' : 'text-gray-600'
							}`}
						>
							{msg.sender}
						</span>
						<div
							className={`relative min-w-max max-w-[250px] p-[10px] text-[0.9rem] leading-[22px] font-medium rounded-[10px] ${
								msg.isMe
									? 'bg-[#d1ffd6] text-[#121212] ml-2'
									: 'bg-[#f2f2f2] text-[#121212] mr-2'
							}`}
						>
							{msg.text}
							<div
								className={`absolute -bottom-[6px] w-0 h-0 border-t-[10px] ${
									msg.isMe
										? 'left-[1px] border-t-[#d1ffd6] border-r-[12px] border-r-transparent'
										: 'right-[1px] border-t-[#f2f2f2] border-l-[12px] border-l-transparent'
								}`}
							></div>
						</div>
					</div>
				))}
			</section>

			<Form isChat={true} />
		</section>
	);
};

export default Chat;
