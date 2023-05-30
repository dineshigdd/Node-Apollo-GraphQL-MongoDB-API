import mongoose from "mongoose";


const AuthorSchema = mongoose.Schema({
    name:String,
    age: Number,    
});


export default mongoose.model('Author', AuthorSchema);