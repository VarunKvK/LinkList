import Link from "next/link";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import Logout from "./buttons/Logout";
import Page from "@/models/Page";
import {mongoose} from "mongoose"


export default async function Header() {
  const session = await getServerSession(authoptions);

  // mongoose.connect(process.env.MONGODB_URI)
  // const page=await Page.findOne({owner:session?.user?.email})
  // const username= page.uri
  return (
    <header className="bg-white border-b py-4">
      {/* NavLinks */}
      <div className="max-w-4xl mx-auto flex justify-between items-center px-6">
        <Link href="/">
          <span className="font-semibold text-blue-500">Linktree</span>
        </Link>
        <nav className="flex gap-8">
          <Link href="/about">About</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        {session ? (
          <div className="flex gap-4 items-center">
            <Link href={`/profile`}>Hello {session?.user?.name}</Link>
            {/* <Link href={`/profile?created=${username}`}>Hello {session?.user.name}</Link> */}
            <Logout/>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <Link href="/login">Login</Link>
            <Link href="/register" className="bg-blue-500 text-white p-2">
              Register
            </Link>
          </div>
        )}
      </div>
      {/* NavLinks */}
    </header>
  );
}
