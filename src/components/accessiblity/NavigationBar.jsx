import Link from "next/link";

export default function NavigationBar() {

  return (
    <div 
      className="
      w-full bg-transparent
      flex justify-end items-center mt-3 gap-10 sm:gap-24
      text-black overflow-hidden
      p-3 fixed top-0 -z-0
      font-robert
      "
    >
      <Link
        href='/profile/login'
        className="hover:border-black border-transparent border-b-2 transition ease-out duration-400"
      >
        LOGIN
      </Link>
      <Link
        href='/profile/sign'
        className="hover:border-black border-transparent border-b-2 transition ease-out duration-400 mr-7"
      >
        SING IN
      </Link>

    </div>
  );
}
