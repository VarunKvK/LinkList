"use client"

import { signIn } from "next-auth/react"
import { redirect,useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HeroForm({user}){

  const router=useRouter() 
  
  useEffect(()=>{
    if('localStorage' in window && window.localStorage.getItem('user')){
      const username = window.localStorage.getItem('user')
      window.localStorage.removeItem('user')
      redirect("/profile?created="+username)
    }
  },[])
  async function handleSubmit(ev){
        ev.preventDefault()
        const form=ev.target
        const username=form.querySelector("input").value
        if(username.length>0){
          if (user){
            router.push("/profile?created="+username)
          }else{
            window.localStorage.setItem("user",username)
            await signIn('google')
          }
        }
      }

    return (
        <form
        onSubmit={handleSubmit}
          className="inline-flex items-center shadow-lg bg-white shadow-gray-500/20"
        >
          <span className="bg-white py-4 pl-4">linklist.to/</span>
          <input
            type="text"
            className="input-border"
            style={{
              backgroundColor: "white",
              marginBottom: 0,
              paddingLeft: 0,
            }}
            placeholder="username"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-4 px-6 whitespace-nowrap"
          >
            Join for Free
          </button>
        </form>
    )
}