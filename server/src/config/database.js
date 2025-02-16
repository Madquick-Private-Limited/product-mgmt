import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const ConnectDB = async () => {
try {
    const connection = await connect(MONGO_URI);
    console.log(`Connected to MongoDB: ${connection.connection.host}`);
} catch (error) {
    console.error(`Error in database connection: ${err}`);
    process.exit(1);
}
};

export { ConnectDB};