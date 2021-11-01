import mongoose from 'mongoose'


const connectDB = async () => {

    try {
        const atlasUrl = process.env.MONGO_URL;
        const url = atlasUrl
        mongoose.Promise = global.Promise
        const conn = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true

        })
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`)

    }
}

export default connectDB