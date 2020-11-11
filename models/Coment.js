import mongoose from 'mongoose'

const comentSchema=mongoose.Schema({
    name: String,
    email:String,
    coment:String,
    size:Number,
    date: {type:Date, default: Date.now},
    cinema: String,
    //owner:{type: String}
});

export default mongoose.model('coment',comentSchema)