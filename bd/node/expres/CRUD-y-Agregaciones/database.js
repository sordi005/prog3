import mongoose from "mongoose";

export const connectDB = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/crud-y-agregaciones', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error de conexión a MongoDB:", error);
    process.exit(1);
  }
};