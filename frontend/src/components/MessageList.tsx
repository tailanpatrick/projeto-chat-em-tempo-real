import React from 'react';
import Message from './Message';

interface MessageType {
	id: number;
	text: string;
	sender: string;
	isMe: boolean;
}

interface MessageListProps {
	messages: MessageType[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
	return (
		<section className="flex-1 overflow-y-auto px-[30px] pt-[30px] pb-[100px] space-y-4 flex flex-col justify-end h-full">
			{messages.map(({ id, text, sender, isMe }) => (
				<Message key={id} text={text} sender={sender} isMe={isMe} />
			))}
		</section>
	);
};

export default MessageList;
