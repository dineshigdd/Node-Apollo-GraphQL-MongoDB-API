import mongoose, { Schema } from "mongoose";


export const BookSchema = new mongoose.Schema({
    title: String,
    authorId:{
        type: Schema.Types.ObjectId,
        ref:'Author',
        required:true
    }
})

export default mongoose.model( 'Book', BookSchema );