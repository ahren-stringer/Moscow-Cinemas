import mongoose from 'mongoose'

const photosSchema=mongoose.Schema({
    photoLarge: String,
    photosSlider:Array,
    cinema: String,
    //owner:{type: String}
});

export default mongoose.model('photos',photosSchema)