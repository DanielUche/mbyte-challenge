import mongoose from 'mongoose';

const DB_URI = process.env.DB_URL || '';

const db = async () => {
	try {
		console.log('Connectionn to database successful');
		return await mongoose.connect(DB_URI, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	} catch (error) {
		console.error('Error connecting to database');
	}
}

export default db;