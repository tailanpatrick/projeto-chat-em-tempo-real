import React from 'react';
import Form from './Form';

const Chat = () => {
	return (
		<section className="w-full h-full flex flex-col justify-between">
			<section className="flex-1"></section>

			<Form isChat={true} />
		</section>
	);
};

export default Chat;
