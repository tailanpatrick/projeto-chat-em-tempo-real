import mongoose, { Document, Schema } from 'mongoose';
import { User } from '../types/User.js';

export interface IMessage extends Document {
	id: string;
	text: string;
	user: User;
	timestamp: Date;
}

const messageSchema = new Schema<IMessage>({
	text: { type: String, required: true },
	user: {
		type: {
			id: { type: String, required: true },
			name: { type: String, required: true },
			color: { type: String, required: true },
		},
		required: true,
	},
	timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>('Message', messageSchema);
