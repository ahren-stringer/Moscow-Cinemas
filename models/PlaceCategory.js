import mongoose from 'mongoose'

const PlaceCategorySchema=mongoose.Schema({
    categoryUrl: String,
    category: String,
    places: [{type: mongoose.Types.ObjectId, ref: 'place'}]
});

export default mongoose.model('placeCategory',PlaceCategorySchema)