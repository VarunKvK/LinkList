"use client";
import {signIn} from 'next-auth/react'

export default function LoginButton() {
  return (
    <button className="text-white bg-blue-500 px-6 py-4 flex justify-center items-center w-full"
    onClick={()=>signIn('google')}
    >
      Sign in with Google
    </button>
  );
}
