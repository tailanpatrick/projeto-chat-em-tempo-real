import React from 'react';
import Message from './Message';
import { User } from '../types/User';

export interface Message {
	id: string;
	text: string;
	user: User;
	color: string;
	isMe?: boolean;
}

interface MessageListProps {
	messages: Message[];
	loggedUser: User;
	bottomRef: React.RefObject<HTMLDivElement | null>;
}

const MessageList: React.FC<MessageListProps> = ({
	messages,
	loggedUser,
	bottomRef,
}) => {
	return (
		<div className="flex flex-col space-y-4 px-6 pt-6 pb-4 overflow-auto">
			{messages.map(({ id, text, user, color }, index) => (
				<Message
					key={index}
					text={text}
					sender={user.name}
					isMe={user.id === loggedUser.id}
					color={user.color}
				/>
			))}

			<div ref={bottomRef} />
		</div>
	);
};

export default MessageList;
