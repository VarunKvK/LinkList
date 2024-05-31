"use client";

import RadioTogglers from "../formItems/ButtonTogglers";
import { faCloudArrowUp, faImage, faPalette, faPencil, faSave } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import SubmitButton from "../buttons/Submit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageAction from "@/actions/pageActions";
import toast from "react-hot-toast";
import { useState } from "react";
import Sections from "../layout/SectionBox";
import { upload } from "@/libs/upload";

export default function PageSettingForm({ page, user }) {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage);
  const [avatarImage, setAvatarImage] = useState(user.image);
  async function saveBaseSettings(formData) {
    const result = await PageAction(formData);
    if (result) {
      toast.success("Saved your data");
    }
  }

  async function handleCoverChange(ev) {
    await upload(ev,link=>{
      setBgImage(link);
    })
  }
  async function handleAvatarChange(ev) {
    await upload(ev,link=>{
      setAvatarImage(link);
    })
  }
  return (
    <div >
      <Sections>
      <form className="" action={saveBaseSettings}>
        <div
          className="h-60 min-h-[300px] flex justify-center items-center bg-cover bg-center"
          style={
            bgType === "color"
              ? { backgroundColor: bgColor }
              : { backgroundImage: `url(${bgImage})` }
          }
        >
          <div className="">
            <RadioTogglers
              defaultValue={page.bgType}
              onChange={(val) => setBgType(val)}
              options={[
                {
                  value: "color",
                  icon: faPalette,
                  label: "Color",
                },
                {
                  value: "image",
                  icon: faImage,
                  label: "Image",
                },
              ]}
            />
            {bgType === "color" && (
              <div className="p-2 border border-blue-300 mt-2 bg-white">
                <div className="flex justify-center gap-2 text-blue-500 font-semibold">
                  <span className="">Background color:</span>
                  <input
                    type="color"
                    name="bgColor"
                    defaultValue={page.bgColor}
                    onChange={(ev) => setBgColor(ev.target.value)}
                  />
                </div>
              </div>
            )}
            {bgType === "image" && (
              <div className="flex justify-center">
                <label
                  className=" text-blue-x 500 font-semibold bg-white text-center px-6 py-2 mt-2"
                  type="button"
                >
                  <input type="hidden" name="bgImage" value={bgImage} />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleCoverChange}
                  />
                  Change Image
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center -mb-12">
          <div className="relative -top-8 w-[128px] h-[128px]">
            <div className="overflow-hidden h-full rounded-full border-4 border-white shadow-lg">
            <Image
              className="w-full h-full object-cover"
              src={avatarImage}
              alt={"avatar"}
              width={128}
              height={128}
              />
              </div>
          <label htmlFor="avatar" className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow aspect-square">
            <FontAwesomeIcon icon={faPencil}/>
          </label>
            <input type="file" id="avatar" className="hidden" onChange={handleAvatarChange}/>
            <input type="hidden" name="avatarImage" value={avatarImage} />
          </div>
        </div>
        <div className="p-4">
          <label className="input-label" htmlFor="nameIn">
            Display Name
          </label>
          <input
            type="text"
            name="displayName"
            defaultValue={page.displayName}
            id="nameIn"
            placeholder="Display Name"
          />
          <label className="input-label" htmlFor="locationIn">
            Location
          </label>
          <input
            type="text"
            id="locationIn"
            name="location"
            defaultValue={page.location}
            placeholder="Where you live"
          />
          <label className="input-label" htmlFor="bioIn">
            Bio
          </label>
          <textarea
            name="bio"
            defaultValue={page.bio}
            id="bioIn"
            placeholder="Bio"
          />
          <div className="max-w-xs mx-auto">
            <SubmitButton className="">
              <FontAwesomeIcon icon={faSave} />
              <span className="ml-2">Save</span>
            </SubmitButton>
          </div>
        </div>
      </form>
      </Sections>
    </div>
  );
}
