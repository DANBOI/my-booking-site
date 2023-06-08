"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";

import Avatar from "@/components/Avatar";
import useSignupModal from "@/hooks/useSignupModal";
import useLoginModal from "@/hooks/useLoginModal";
import useRentModal from "@/hooks/useRentModal";
import { SafeUser } from "@/types";

import MenuItem from "./MenuItem";

type Props = {
  currentUser?: SafeUser | null;
};

export default function UserMenu({ currentUser }: Props) {
  const [open, setOpen] = useState(false);
  const signupModal = useSignupModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  //   const toggleDropdown = useCallback(() => setOpen((value) => !value), []);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={currentUser ? rentModal.onOpen : loginModal.onOpen}
          className="hidden cursor-pointer whitespace-nowrap rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-primary/70 hover:text-white md:block"
        >
          Rent your home
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="flex cursor-pointer items-center gap-3 rounded-full border border-secondary p-4 text-primary transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {open && (
        <div className="absolute right-0 top-12 flex w-[40vw] flex-col overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-full">
          {currentUser ? (
            <>
              <MenuItem label="My trips" href="/trips" />
              <MenuItem label="My favorites" href="/favorites" />
              <MenuItem label="My reservations" href="/reservations" />
              <MenuItem label="My properties" href="/properties" />
              <hr />
              <MenuItem label="Logout" clickHandler={signOut} />
            </>
          ) : (
            <>
              <MenuItem label="Log In" clickHandler={loginModal.onOpen} />
              <MenuItem label="Sign up" clickHandler={signupModal.onOpen} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
