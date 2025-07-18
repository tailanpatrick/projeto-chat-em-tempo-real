import React from 'react';

const Login = () => {
	return (
		<section className="w-[100%] max-w-[330px] bg-[#212121] rounded-md p-5">
			<h2 className="text-center font-semibold text-[1.5rem] mb-5">
				Login
			</h2>
			<form className="flex flex-col gap-4">
				<input
					type="text"
					className="border-none p-4 text-[0.85rem] font-semibold bg-[#121212] outline-none rounded-md focus:outline-[gray] focus:outline-2"
					placeholder="Seu nome"
					required
				/>
				<button
					type="submit"
					className="border-none p-4 rounded-md font-bold bg-[#ddd] text-[#121212] cursor-pointer hover:bg-[#fff]"
				>
					Entrar
				</button>
			</form>
		</section>
	);
};

export default Login;
