'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from "next/link";
import { faChartPie, faFile, faHome } from "@fortawesome/free-solid-svg-icons";
import Logout from "@/components/buttons/Logout";
import { usePathname } from 'next/navigation';

export default function AppSideBar() {
    const path= usePathname()
    return (
    <nav className=" inline-flex flex-col mx-auto text-center mt-8 gap-4">
      <Link href={"/profile"} className={"flex gap-4 "+(path==="/profile"? "text-blue-500 font-bold":"")}>
        <FontAwesomeIcon
          icon={faFile}
          fixedWidth={true}
          className="w-6 h-6"
        />
        <span>My Page</span>
      </Link>
      <Link href={"/analytics"} className={"flex gap-4 "+(path==="/analytics"? "text-blue-500 font-bold":"")}>
        <FontAwesomeIcon
          icon={faChartPie}
          fixedWidth={true}
          className="w-6 h-6"
        />
        <span>Analytics</span>
      </Link>
      <Link href={"/"} className="flex gap-4">
        <FontAwesomeIcon
          icon={faHome}
          fixedWidth={true}
          className="w-6 h-6"
        />
        <span>Back home</span>
      </Link>
      <Logout
        className={
          "flex gap-4 itmes-center border border-blue-500 px-4 py-2 text-blue-500"
        }
        logoclassName={"w-6 h-6 text-blue-500"}
      />
    </nav>
  );
}
