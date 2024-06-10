import mongoose from "mongoose";
const { Schema } = mongoose;

const chatSchema = new Schema({
  username: String,
  message: String,
  timestamp: Date,
});

const chatModel = mongoose.model("Chat", chatSchema);

export default chatModel;
