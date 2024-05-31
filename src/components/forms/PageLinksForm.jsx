"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sections from "../layout/SectionBox";
import {
  faCloudArrowUp,
  faGripLines,
  faLink,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "../buttons/Submit";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { upload } from "@/libs/upload";
import Image from "next/image";
import { savPageLinks } from "@/actions/pageActions";
import toast from "react-hot-toast";

export default function LinksForm({ user, page }) {
  const [links, setLinks] = useState(page.links || []);
  async function save() {
    await savPageLinks(links)
    toast.success("Links saved successfully")
  }
  function addNewLinks() {
    setLinks((prev) => {
      return [
        ...prev,
        {
          key:Date.now().toString(),
          title: "",
          subtitle: "",
          icon: "",
          url: "",
        },
      ];
    });
  }
  function handleupload(ev, linkKey) {
    upload(ev, (uploadedImageUrl) => {
      setLinks((prev) => {
        const newLinks = [...prev];
        newLinks.forEach((link, index) => {
          if (link.key === linkKey) {
            link.icon = uploadedImageUrl;
          }
        });
        return newLinks;
      });
    });
  }

  function handleLinkChange(keyLinkToChange,prop,ev){
    setLinks((prev)=>{
      const newLinks = [...prev]
      newLinks.forEach((link, index) => {
        if (link.key === keyLinkToChange) {
          link[prop]=ev.target.value;
        }
      });
      return[...prev,]
    })
  }

  function removeData({ key }) {
    setLinks((prevButtons) => {
      return prevButtons.filter((link) => link.key !== key);
    });
  }

  return (
    <Sections>
      <form action={save}>
        <h2 className="text-2xl font-bold mb-4">Links</h2>
        <button
          onClick={addNewLinks}
          type="button"
          className="text-blue-500 text-lg flex gap-2 items-center cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="bg-blue-500 text-white p-1 rounded-full aspect-square"
          />
          <span>Add New</span>
        </button>
        <div className="">
          <ReactSortable handle={".handle"} list={links} setList={setLinks}>
            {links.map((l, index) => {
              return (
                <div key={l.key} className="mt-8 flex gap-2 items-center">
                  <div className="handle">
                    <FontAwesomeIcon
                      className="text-gray-700 mr-2"
                      icon={faGripLines}
                    />
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-300 w-16 h-16 rounded-full inline-block aspect-square inline-flex justify-center items-center">
                      {!l.icon && (<FontAwesomeIcon icon={faLink} />)}
                      {l.icon && (<Image src={l.icon} alt={'icon'} width={64} height={64} className="object-cover w-full h-full rounded-full"/>)}
                    </div>
                    <div className="">
                      <input
                        onChange={(ev) => handleupload(ev, l.key)}
                        id={"icon" + l.key}
                        type="file"
                        className="hidden"
                      />
                      <label
                        htmlFor={"icon" + l.key}
                        className=" mt-2 p-2 flex items-center gap-1 rounded-md text-gray-600 border"
                      >
                        <span>
                          <FontAwesomeIcon icon={faCloudArrowUp} />
                        </span>
                        <span>Change Icon</span>
                      </label>
                    </div>
                  </div>
                  <div className="grow">
                    <input type="text" value={l.title} onChange={ev=> handleLinkChange(l.key,'title',ev)} name="" placeholder="Title" />
                    <input
                     value={l.subtitle} 
                     onChange={ev=> handleLinkChange(l.key,'subtitle',ev)}
                      type="text"
                      name=""
                      placeholder="Subtitle(Optional)"
                    />
                    <input type="text" name=""  value={l.url} onChange={ev=> handleLinkChange(l.key,'url',ev)} placeholder="url" />
                  </div>
                  <button
                  onClick={() => removeData(l)}
                  className="bg-gray-200 p-2"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                </div>
              );
            })}
          </ReactSortable>
        </div>
        <div className="border-t pt-4 mt-4">
          <SubmitButton className="">
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </Sections>
  );
}
