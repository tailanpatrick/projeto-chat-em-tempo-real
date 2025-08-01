import React, { FormEvent, useState } from 'react';

type FormProps = {
	isChat: boolean;
	onSubmit: (value: string) => void;
};

const Form = ({ isChat, onSubmit }: FormProps) => {
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(inputValue);
		setInputValue('');
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={
				isChat
					? 'bg-[#191919] py-4 px-5 w-full flex items-center gap-[10px] fixed bottom-0 left-0'
					: 'flex flex-col gap-4'
			}
		>
			{isChat ? (
				<textarea
					placeholder="Digite uma mensagem"
					required
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					className="resize-none border-none p-[15px] rounded-lg flex-1 bg-[#212121] outline-none text-[#f2f2f2] text-[1rem] max-h-40 overflow-y-auto"
					rows={1}
				/>
			) : (
				<input
					type="text"
					placeholder="Digite seu nome"
					required
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					className="border-none p-4 text-[0.85rem] font-semibold bg-[#121212] outline-none rounded-md focus:outline-[gray] focus:outline-2"
				/>
			)}
			<button
				type="submit"
				className={`border-none cursor-pointer rounded-md ${
					isChat
						? 'bg-transparent text-[#f2f2f2] hover:bg-white/10 active:text-[#121212] active:bg-white/50 transition-colors duration-200'
						: 'p-4 font-bold bg-[#ddd] text-[#121212] hover:bg-[#fff]'
				}`}
			>
				{isChat ? (
					<span className="material-symbols-outlined text-[2rem] p-2">
						send
					</span>
				) : (
					'Entrar'
				)}
			</button>
		</form>
	);
};

export default Form;
