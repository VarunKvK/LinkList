'use server'

import { authoptions } from "@/app/api/auth/[...nextauth]/route"
import Page from "@/models/Page"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"

export default async function GrabUsername(formData){
    const username=formData.get('username')
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        const existingPageDoc = await Page.findOne({uri: username});

        if(existingPageDoc){
            return false;
        } else {
            const session = await getServerSession(authoptions);
            await Page.create({
                uri: username,
                owner: session?.user.email
            });
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}
