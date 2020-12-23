import mongoose from 'mongoose'

const comentSchema=mongoose.Schema({
    name: String,
    email:String,
    coment:String,
    place: String,
    size:Number,
    date: {type:Date, default: Date.now},
    owner: [{type: mongoose.Types.ObjectId, ref: 'User'}]
});

export default mongoose.model('coment',comentSchema)