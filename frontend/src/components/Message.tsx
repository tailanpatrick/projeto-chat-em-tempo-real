import React from 'react';

interface MessageProps {
	text: string;
	sender: string;
	isMe: boolean;
	color: string;
}

const Message: React.FC<MessageProps> = ({ text, sender, isMe, color }) => {
	return (
		<div className={`flex flex-col ${isMe ? 'items-start' : 'items-end'}`}>
			<span className={`text-md font-semibold mb-1 text-${color}`}>
				{!isMe && sender}
			</span>
			<div
				className={`relative min-w-max max-w-[250px] p-[10px] text-[0.8rem] leading-[22px] font-medium rounded-[10px] ${
					isMe
						? 'bg-[#d1ffd6] text-[#121212] ml-2'
						: 'bg-[#f2f2f2] text-[#121212] mr-2'
				}`}
			>
				{text}
				<div
					className={`absolute -bottom-[6px] w-0 h-0 border-t-[10px] ${
						isMe
							? 'left-[1px] border-t-[#d1ffd6] border-r-[12px] border-r-transparent'
							: 'right-[1px] border-t-[#f2f2f2] border-l-[12px] border-l-transparent'
					}`}
				></div>
			</div>
		</div>
	);
};

export default Message;
