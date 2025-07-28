import mongoose from 'mongoose';

const MONGODB_URI =
	process.env.MONGODB_URI ||
	'mongodb+srv://tailanpatrick06:BMl4fIV3Sei8ZMdi@cluster0.luy4ny9.mongodb.net/';

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
	console.log('Conectado ao MongoDB');
});

export default mongoose;
