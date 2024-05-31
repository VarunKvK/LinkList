"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactSortable } from "react-sortablejs";
import Sections from "../layout/SectionBox";
import {
  faEnvelope,
  faGripLines,
  faMobile,
  faPhone,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import SubmitButton from "../buttons/Submit";
import { savPageButtons } from "@/actions/pageActions";
import toast from "react-hot-toast";

export const buttons = [
  {
    key: "email",
    label: "email",
    icon: faEnvelope,
    placeholder: "joe@gmail.com",
  },
  {
    key: "mobile",
    label: "mobile",
    icon: faMobile,
    placeholder: "220033991122",
  },
  {
    key: "instagram",
    label: "instagram",
    icon: faInstagram,
    placeholder: "url",
  },
  {
    key: "facebook",
    label: "facebook",
    placeholder: "url",
    icon: faFacebook,
  },
  {
    key: "youtube",
    label: "youtube",
    icon: faYoutube,
    placeholder: "url",
  },
  {
    key: "whatsaap",
    label: "whatsaap",
    icon: faWhatsapp,
    placeholder: "11223313121",
  },
];

export default function ButtonForm({ page, user }) {
  const pageSavedButtonKeys = Object.keys(page.buttons);
  const pageSavedButtons = pageSavedButtonKeys.map((k) =>
    buttons.find((b) => b.key === k)
  );
  const [active, setActive] = useState(pageSavedButtons);

  function addButtontoProfile(b) {
    setActive((prevButtons) => {
      return [...prevButtons, b];
    });
  }

  const availabelButtons = buttons.filter(
    (b1) => !active.find((b2) => b1.key === b2.key)
  );

  function removeData({ key }) {
    setActive((prevButtons) => {
      return prevButtons.filter((button) => button.key !== key);
    });
  }

  async function handleFormSubmit(formData) {
    await savPageButtons(formData);
    toast.success("Settings saved successfully!");
  }
  return (
    <Sections>
      <form action={handleFormSubmit}>
        <h2 className="text-xl font-bold mb-4">Buttons</h2>
        <ReactSortable list={active} setList={setActive}>
          {active.map((buttons) => {
            return (
              <div key={buttons.key} className="flex justify-center items-center p-2 mb-4">
                <div className="flex items-center gap-1 w-48">
                  <FontAwesomeIcon
                    icon={faGripLines}
                    className="text-gray-300"
                  />
                  <FontAwesomeIcon icon={buttons.icon} />
                  <p className="capitalize">{buttons.label}</p>
                </div>
                <input
                  type="text"
                  name={buttons.label}
                  placeholder={buttons.placeholder}
                  style={{ marginBottom: "0" }}
                  defaultValue={page.buttons[buttons.key]}
                />
                <button
                  onClick={() => removeData(buttons)}
                  className="bg-gray-200 p-2"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            );
          })}
        </ReactSortable>
        <div className="flex flex-wrap gap-2 border-t pt-4">
          {availabelButtons.map((b) => {
            return (
              <button
                onClick={() => addButtontoProfile(b)}
                className="capitalize flex gap-1 p-2 bg-gray-200 justify-center items-center"
              >
                <FontAwesomeIcon icon={b.icon} />
                <span>{b.label}</span>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            );
          })}
        </div>
        <div className="max-w-xs mx-auto mt-8 mb-8">
          <SubmitButton>
            <FontAwesomeIcon icon={faSave} />
            <span className="ml-2">Save</span>
          </SubmitButton>
        </div>
      </form>
    </Sections>
  );
}
