"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";
export default function NavbarOld() {
  const { data: session, status }: { data: any; status: string } = useSession();
  const router = useRouter();
  return (
    <nav className="flex ml-60 bg-gray-700 py-5 px-5">
      <h1 className="text-white">Navbar</h1>
      <div>
        <ul className="flex ml-5">
          <Link href="/">
            <li className="mr-3 text-blue-300 cursor-pointer">Home</li>
          </Link>
          <Link href="/">
            <li className="mr-3 text-blue-300 cursor-pointer">Assets</li>
          </Link>
          <Link href="/manufacturers">
            <li className="mr-3 text-blue-300 cursor-pointer">Brands</li>
          </Link>
        </ul>
      </div>
      <div className="ml-auto">
        {status === "unauthenticated" ? (
          <button
            className="bg-white rounded-md px-3 text-sm h-7 cursor-pointer"
            onClick={() => {
              signIn();
            }}
          >
            Login
          </button>
        ) : (
          <div className="flex ">
            <h4 className="text-white mr-2">{session?.user?.name}</h4>
            <button
              className="bg-white rounded-md px-3 text-sm h-7 cursor-pointer"
              onClick={() => {
                signOut();
              }}
            >
              <IoIosLogOut color="red" size={20} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
