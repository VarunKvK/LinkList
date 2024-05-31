import HeroForm from "@/components/forms/HeroForm";
import { getServerSession } from "next-auth";
import { authoptions } from "../api/auth/[...nextauth]/route";
import Page from "@/models/Page";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import mongoose from "mongoose";

export default async function Home() {
  mongoose.connect(process.env.MONGODB_URI)
  const session = await getServerSession(authoptions);
  const page = await Page.findOne({ owner: session?.user?.email });
  return (
    <main>
      <section className="pt-32">
        <div className="max-w-md mb-8">
          <h1 className="text-6xl font-bold">
            Your one link
            <br /> for everything
          </h1>
        </div>
        <h2 className="text-gray-500 text-xl mt-6">
          Share your links, social profiles, contact info and more on one page
        </h2>

        <div className="mt-8">
          {page ?(<Link href={`/profile`} className="text-xl underline font-semibold flex gap-2 items-center">Get to your profile<FontAwesomeIcon className="text-blue-500" icon={faArrowRight}/> </Link>) : (<HeroForm user={session} />)}
        </div>
      </section>
    </main>
  );
}
