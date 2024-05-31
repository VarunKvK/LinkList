import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import UsernameForm from "@/components/forms/UsernameFrom";
import { getServerSession } from "next-auth";
import {redirect} from "next/navigation"
import {mongoose} from "mongoose"
import Page from "@/models/Page"
import PageSettingForm from "@/components/forms/PageSettingForm";
import ButtonForm from "@/components/forms/PageButtonsForms";
import LinksForm from "@/components/forms/PageLinksForm";
import cloneDeep from "clone-deep"

export default async function Profile(url){
    const session= await getServerSession(authoptions);
    const {created}= url?.searchParams
    if(!session){
       return redirect("/login")
    }
    mongoose.connect(process.env.MONGODB_URI)
    const page= await Page.findOne({owner:session?.user?.email})
    const leanPage=cloneDeep(page.toJSON())
    leanPage._id=leanPage._id.toString()
    if(page){
        return(
            <>
            <PageSettingForm user={session?.user} page={leanPage}/>
            <ButtonForm user={session?.user} page={leanPage}/>
            <LinksForm user={session?.user} page={leanPage}/>
            </>
        )
    }
    return(
        <div>
            <UsernameForm username={created}/>
        </div>
    )
}