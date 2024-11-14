// import mongoose from 'mongoose'

// const connectDB = async (): Promise<void> => {
//     try {
//        const connect = await mongoose.connect(process.env.MONGO_URI as string)
//         console.log(`MongoDB Connected: ${connect.connection.host}`)
//     } catch (error) {
//         console.log('MongoDB connection failed', error)
//     }
// }

// export default connectDB



import mongoose from "mongoose";

const connectDB = async(): Promise<void> =>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI as string)
        console.log(`MongoDB Connected: ${connect.connection.host}`)
    } catch (error) {
        console.log('MongoDB connection fail',error)
    }

}
export default connectDB