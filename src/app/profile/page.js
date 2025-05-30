import Link from "next/link";
import { loginWithCookies } from "../../../lib/serverFunctions";
import UserProfile from "@/components/interfaces/UserProfile";
export default async function page() {

  const user = await loginWithCookies();

  if(!user) return(
    <div className="w-full h-screen flex justify-center items-center text-white font-bigX">
      <div className="flex flex-col gap-12 text-2xl -4">
        <Link
          href='/profile/login'
          className="bg-black rotate-3 hover:rotate-0 transition ease-out duration-500 pb-2 px-2 ml-4 text-center"
         >لدي حساب من بالفعل</Link>
        <Link 
          href='/profile/sign'
          className="bg-black -rotate-2 hover:-rotate-0 transition ease-out duration-500 pb-2 px-2 mr-4 text-center"
        >انشاء حساب كمستقل</Link>
      </div>
    </div>
  )
  return <UserProfile userData={user} />
}
