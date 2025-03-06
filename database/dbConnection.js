import mongoose from "mongoose";
import { config } from "dotenv";
config();

export const connection = () => {
  mongoose
    .connect(`mongodb+srv://ayushk986:${encodeURIComponent('ayush_123')}@expense-tracker.rqbeoe2.mongodb.net/?retryWrites=true&w=majority&appName=Expense-tracker`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "MERN_AUTHENTICATION",
    })
    .then(() => {
      console.log("Connected to MongoDB Atlas.");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB Atlas:", err);
    });
};
