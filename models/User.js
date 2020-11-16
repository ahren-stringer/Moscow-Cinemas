import mongoose from 'mongoose';

const schema=new mongoose.Schema({
    email:{type: String, required:true, unique:true},
    password: {type:String, required:true},
    coments: [{type: mongoose.Types.ObjectId, ref: 'Coment'}]
});

//module.exports=model('User', schema)
export default mongoose.model('User', schema)