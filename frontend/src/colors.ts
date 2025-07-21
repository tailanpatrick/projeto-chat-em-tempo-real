const userNameColors = [
	'#FF8FAB', // Rosa claro
	'#FFD54F', // Amarelo ouro
	'#FFB74D', // Laranja claro
	'#A5D6A7', // Verde menta
	'#81D4FA', // Azul bebê
	'#CE93D8', // Lilás claro
	'#E0E0E0', // Cinza claro
	'#FFAB91', // Coral suave
	'#FFF176', // Amarelo pastel
	'#DCE775', // Verde limão
	'#B3E5FC', // Azul claro acinzentado
];

export const getRandomColors = () => {
	const index = Math.floor(Math.random() * userNameColors.length);
	return userNameColors[index];
};
