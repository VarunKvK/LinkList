import {useFormStatus} from "react-dom"
export default function SubmitButton({ children,className=" " }) {
    const {pending}=useFormStatus()
  return (
    <button disabled={pending} type="submit" className={"bg-blue-500 disabled:bg-blue-400 text-white disabled:text-gray-200 w-full mt-4 py-2"+className}>
      {pending && 
      <span>Saving</span>
      }
      {!pending && children}
    </button>
  );
}
