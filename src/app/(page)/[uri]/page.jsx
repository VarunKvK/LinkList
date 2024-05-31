import { buttons } from "@/components/forms/PageButtonsForms";
import Event from "@/models/Event";
import Page from "@/models/Page";
import User from "@/models/User";
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faTelegram,
  faTiktok,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLink,
  faLocationDot,
  faPhone,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";

export const buttonsIcons = {
  email: faEnvelope,
  mobile: faPhone,
  instagram: faInstagram,
  facebook: faFacebook,
  youtube: faYoutube,
  whatsapp: faWhatsapp,
};
export default async function UserPage({ params }) {
  const uri = params.uri;
  mongoose.connect(process.env.MONGODB_URI);
  const page = await Page.findOne({ uri });
  const session = await User.findOne({ email: page.owner });

  await Event.create({
    type: "view",
    page: page.uri,
    uri: uri,
  });

  return (
    <div className="bg-blue-950 min-h-screen">
      <div
        className="h-40 bg-cover bg-center"
        style={
          page.bgType === "color"
            ? { backgroundColor: page.bgColor }
            : { backgroundImage: `url(${page.bgImage})` }
        }
      ></div>
      <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-12">
        <Image
          className="rounded-full w-full h-full object-cover"
          src={session.image}
          alt="avatar"
          width={256}
          height={256}
        />
      </div>
      <h1 className="text-2xl text-white font-medium text-center">
        {page.displayName}
      </h1>
      <h1 className="flex justify-center gap-1 items-center text-white/70 mt-1">
        <FontAwesomeIcon icon={faLocationDot} className="h-4" />
        {page.location}
      </h1>
      <div className="mx-auto max-w-xs text-center mt-1">
        <p className="text-white">{page.bio}</p>
      </div>
      <div className="flex gap-2 justify-center items-center mt-1 pb-6">
        {Object.keys(page.buttons).map((button,index) => {
          return (
            <Link
            key={index}
              href={"/"}
              className="rounded-full bg-white p-2 flex justify-center items-center"
            >
              <FontAwesomeIcon
                icon={buttonsIcons[button]}
                className="w-5 h-5"
              />
            </Link>
          );
        })}
      </div>
      <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-4 p-4 px-8">
        {page.links.map((link,index) => {
          return (
            <Link
              key={index}
              target="_blank"
              ping={
                process.env.URL +
                "api/click?url=" +
                btoa(link.url) +
                "&page=" +
                page.uri
              }
              href={link.url}
              className="block p-2 text-white bg-indigo-800 flex"
            >
              <div className="bg-blue-700 aspect-square w-18 h-18 overflow-hidden relative -left-4 justify-center items-center flex">
                {link.icon && (
                  <Image src={link.icon} alt="image" width={80} height={80} />
                )}
                {!link.icon && (
                  <FontAwesomeIcon
                    icon={faLink}
                    className="text-white w-8 h-8"
                  />
                )}
              </div>
              <div className="flex justify-center items-center">
                <div className="">
                  <h1 className="text-white ">{link.title}</h1>
                  <p className="text-white/50  h-6 overflow-hidden">
                    {link.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
