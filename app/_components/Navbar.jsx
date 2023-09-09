"use client";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { auth } from "../firebase";

const Navbar = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <nav className="bg-white border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <ul className="font-medium flex justify-end items-center w-full  p-0   flex-row space-x-8 mt-0 border-0    ">
          <li>
            <Link
              href="/"
              className="block   rounded bg-transparent text-blue-700 p-0  0"
              aria-current="page"
            >
              Home
            </Link>
          </li>
          <li>
            <button
              onClick={handleSignOut}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
