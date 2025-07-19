import React from 'react';
import Form from './Form';

const Login = ({ onLogin }: { onLogin: (username: string) => void }) => {
	const handleSubmit = (username: string) => {
		onLogin(username);
	};

	return (
		<section className="w-[100%] max-w-[330px] bg-[#212121] rounded-md p-5">
			<h2 className="text-center font-semibold text-[1.5rem] mb-5">
				Login
			</h2>
			<Form isChat={false} onSubmit={handleSubmit} />
		</section>
	);
};

export default Login;
