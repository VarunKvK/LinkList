'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";


import { signOut } from "next-auth/react"
export default function Logout({className='bg-blue-500 text-white p-2 flex justify-center gap-2',logoclassName="w-6 h-6 text-gray-500 text-white"}){
    return(
        <button onClick={()=>signOut()} className={className}>
            <FontAwesomeIcon icon={faRightFromBracket} fixedWidth={true} className={logoclassName}/>
            <span>Logout</span>
        </button>
    )
}