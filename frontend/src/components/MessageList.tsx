import React from 'react';
import Message from './Message';
import { User } from '../types/User';

export interface Message {
	id: number;
	text: string;
	user: User;
	color: string;
	isMe?: boolean;
}

interface MessageListProps {
	messages: Message[];
	loggedUser: User;
}

const MessageList: React.FC<MessageListProps> = ({ messages, loggedUser }) => {
	return (
		<div className="flex flex-col justify-end space-y-4 px-6 pt-6 pb-4 h-full jus overflow-y-auto max-h-[calc(100vh-150px)]">
			{messages.map(({ id, text, user, color }) => (
				<Message
					key={id}
					text={text}
					sender={user.name}
					isMe={user.id === loggedUser.id}
					color={color}
				/>
			))}
		</div>
	);
};

export default MessageList;
