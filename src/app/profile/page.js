import Link from "next/link";

export default function page() {

  return(
    <div className="w-full h-screen flex justify-center items-center text-white font-bigX">
      <div className="flex flex-col gap-16 text-3xl">
        <Link
          href='/profile/login'
          className="bg-purple-800 pb-2 px-2 rounded-lg text-center"
         >لدي حساب من بالفعل</Link>
        <Link 
          href='/profile/sign'
          className="bg-purple-800 pb-2 px-2 rounded-lg"
        >انشاء حساب كمستقل</Link>
      </div>
    </div>
  )
}
