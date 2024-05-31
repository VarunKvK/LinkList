import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { getServerSession } from "next-auth";
import { authoptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import AppSideBar from "@/components/layout/AppSideBar";
import { Toaster } from "react-hot-toast";
import Page from "@/models/Page";
import mongoose from "mongoose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faLink } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "LinkTree",
  description: "Generated by create next app",
};

export default async function AppTemplate({ children }) {
  const session = await getServerSession(authoptions);
  if (!session) {
    return redirect("/");
  }

  mongoose.connect(process.env.MONGODB_URI);
  const page = await Page.findOne({ owner: session?.user.email });

  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <Toaster />
        <main className="md:flex min-h-screen">
            <label htmlFor="navCheck" className="inline-flex md:hidden ml-8 mt-4 gap-1 items-center shadow p-4 rounded-md bg-white">
              <FontAwesomeIcon icon={faBars} />
              <span>Open Navigation</span>
            </label>
            <input type="checkbox" id="navCheck" className="hidden"/>
            <label htmlFor="navCheck" className="backdrop fixed inset-0 bg-black/80 z-10 hidden"></label>
          <aside className="transition-all bg-white shadow shadow-xl w-48 p-6 md:static fixed -left-[100%] top-0 bottom-0 z-20">
            <div className="sticky top-0 pt-2">
              <div className="rounded-full overflow-hidden aspect-square w-24 mx-auto">
                <Image
                  src={session?.user?.image}
                  width={256}
                  height={256}
                  alt={"avatar"}
                />
              </div>
              {page && (
                <Link
                  target="_blank"
                  href={"/" + page.uri}
                  className="flex items-center gap-1 justify-center mt-4"
                >
                  <FontAwesomeIcon icon={faLink} className="text-blue-500" />
                  <span className="">/</span>
                  <span className="">{page.uri}</span>
                </Link>
              )}
              <div className="text-center">
                <AppSideBar />
              </div>
            </div>
          </aside>
          <div className="grow">{children}</div>
        </main>
      </body>
    </html>
  );
}