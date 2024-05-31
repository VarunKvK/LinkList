'use server'

import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import Page from "@/models/Page";
import User from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function PageAction(formData) {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authoptions);
  if (session) {

    const dataKeys=['displayName','location','bio','bgType','bgColor','bgImage']

    const dataToUpdate={}
    for(const key of dataKeys) {
      if(formData.has(key)){
        dataToUpdate[key]=formData.get(key)
      }
    }

    await Page.updateOne(
      {
        owner: session.user.email,
      },dataToUpdate
    );
    if(formData.has('avatarImage')){
      const avatarLink=formData.get('avatarImage')
      await User.updateOne({email:session.user.email},{image:avatarLink})
    }
    return true;
  }
  return false;
}

export async function savPageButtons(formData){
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authoptions);
if(session){
  const buttonsValues={}
  formData.forEach((value,key) =>{
    buttonsValues[key] = value
  })
  const dataToUpdate={buttons:buttonsValues}
  await Page.updateOne(
    {
      owner: session.user.email,
    },dataToUpdate 
  )
  return true
  }
return false
}

export async function savPageLinks(links){
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authoptions);
  if(session){
    await Page.updateOne(
      {
        owner: session.user.email,
      },{
        links:links
      } 
    )
    return true
  }
  return false
}