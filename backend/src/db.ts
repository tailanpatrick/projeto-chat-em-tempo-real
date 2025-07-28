import mongoose, { Mongoose } from 'mongoose';

let cachedDb: Mongoose | null = null;

const connectDB = async (): Promise<Mongoose> => {
	if (cachedDb) {
		console.log('Utilizando conexão MongoDB em cache.');
		return cachedDb;
	}

	try {
		const MONGODB_URI = process.env.MONGODB_URI as string;

		if (!MONGODB_URI) {
			throw new Error(
				'A variável de ambiente MONGODB_URI não está definida.'
			);
		}

		console.log(
			'Tentando conectar ao MongoDB com URI (parcialmente oculta):',
			MONGODB_URI.substring(0, MONGODB_URI.indexOf('@') + 1) + '...'
		);

		const conn = await mongoose.connect(MONGODB_URI, {
			serverSelectionTimeoutMS: 15000,
		});

		cachedDb = conn;
		console.log('MongoDB Conectado com sucesso!');
		return conn;
	} catch (error: any) {
		console.error('Erro na conexão com o MongoDB:', error.message);
		process.exit(1);
	}
};

export default connectDB;
