import mongoose from "mongoose";


const connectDB = async () => {
    if(mongoose.connections[0].readyState) {
        return true
    };
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected To DB");
        return true;
    } catch (error) {
        console.log("ERROR While Connecting To Data Base PLZ Check It Out");
        return false;
    };
};

export default connectDB;