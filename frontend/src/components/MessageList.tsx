import React from 'react';
import Message from './Message';

interface MessageType {
	id: number;
	text: string;
	sender: string;
	color: string;
	isMe: boolean;
}

interface MessageListProps {
	messages: MessageType[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
	return (
		<div className="flex flex-col space-y-4 px-[30px] pt-[30px] pb-[20px]">
			{messages.map(({ id, text, sender, isMe, color }) => (
				<Message
					key={id}
					text={text}
					sender={sender}
					isMe={isMe}
					color={color}
				/>
			))}
		</div>
	);
};

export default MessageList;
