import React from "react";
import Container from "@/components/Container";
import { SafeUser } from "@/types";
import Logo from "./Logo";
import Serach from "./Search";
import UserMenu from "./UserMenu";

type Props = {
  currentUser?: SafeUser | null;
};

export default function Navbar({ currentUser }: Props) {
  return (
    <header className="sticky z-20 w-full border-b bg-white py-4 shadow-sm">
      <Container>
        <nav className="flex items-center justify-between gap-3">
          <Logo />
          <Serach />
          <UserMenu currentUser={currentUser} />
        </nav>
      </Container>
    </header>
  );
}
