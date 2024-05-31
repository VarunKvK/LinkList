import { model, Schema } from "mongoose";

let Page

try{
    Page=model('Page');
}catch(e){
    const PageSchema = new Schema({
      // _id: { type: Schema.Types.ObjectId },
      uri: { type: String, required: true, min: 1, unique: true },
      owner: { type: String, required: true },
      displayName:{type:String,default:''},
      location:{type:String,default:''},
      bio:{type:String,default:''},
      bgType:{type:String,default:'color'},
      bgColor:{type:String,default:'#000000'},
      bgImage:{type:String},
      buttons:{type:Object,default:{}},
      links:{type:Object,default:[]}
    }, { timestamps: true});

    Page = model('Page', PageSchema);
}

export default Page;