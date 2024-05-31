"use client";

import GrabUsername from "@/actions/grabUsername";
import { useState } from "react";
import SubmitButton from "../buttons/Submit";
import { redirect,useRouter } from "next/navigation";

export default function UsernameForm({ username }) {
  const [taken, settaken] = useState(false);
  const router=useRouter()
  
  async function handleSubmit(formData) {
    const result = await GrabUsername(formData);
    settaken(result === false);
    if(taken===false){
      router.push("/profile?created="+formData.get('username'));
    }
  }
  return (
    <form action={handleSubmit}>
      <h1 className="mb-6 text-center text-4xl font-semibold mb-2 w-full">
        Grab your username
      </h1>
      <div className="max-w-xs mx-auto">
        <input
          type="text"
          name="username"
          placeholder="username"
          className="py-2 outline-none block mx-auto border w-full text-center"
          defaultValue={username}
        />
        <SubmitButton>
          <span>Grab</span>
        </SubmitButton>
        {taken && (
          <div className="bg-red-200 border border-red-500 p-2 mb-2 text-center text-red-500">
            This username is taken
          </div>
        )}
      </div>
    </form>
  );
}
