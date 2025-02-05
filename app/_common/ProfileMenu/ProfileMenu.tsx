"use client";
import { LogIn, User } from "lucide-react";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { isTokenExist } from "@/actions/isTokenExist";
import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";


const ProfileMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
    window.location.reload()
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = await isTokenExist()
      if (token.bool) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }

    checkToken();
  }, []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="relative flex items-center justify-center lg:w-8 lg:h-8 h-10 w-10 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-100 transition duration-150 ease-in-out">
          <span className="absolute -left-1.5 top-0 z-20 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-85"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-700"></span>
          </span>
          <User className="lg:h-6 lg:w-6 w-6 h-6 text-gray-600" />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem className="w-full">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="flex w-full justify-between">
                <LogIn className="lg:h-6 lg:w-6 w-6 h-6 text-gray-600" /> خروج
              </button>
            ) : (
              <Link href="/login" className="flex w-full justify-between">
                <LogIn className="lg:h-6 lg:w-6 w-6 h-6 text-gray-600" /> دخول
              </Link>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileMenu;
