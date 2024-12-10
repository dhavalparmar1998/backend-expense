import mongoose from "mongoose";

 async function connection(){
    await mongoose.connect('mongodb+srv://admin:admin@cluster1.3xukv.mongodb.net/expense_tracker');
}

export default connection;