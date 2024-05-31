import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import LoginButton from "@/components/buttons/LoginGoogleBtn";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login(){
    const session=await getServerSession(authoptions)
    if(session){
        redirect("/")
    }
    return(
        <div className="max-w-xs mx-auto p-4">
            <h1 className="text-center text-4xl font-semibold mb-6">Login</h1>
            <LoginButton/>
        </div>
    )
}