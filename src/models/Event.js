import mongoose from 'mongoose';
const { Schema,model } = require("mongoose")

const EventSchema=new Schema({
    type:String,
    page:String,
    uri:String,
},{timestamps:true})

const Event=mongoose.models.Event || model('Event',EventSchema)
export default Event