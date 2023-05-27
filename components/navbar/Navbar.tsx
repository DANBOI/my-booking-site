import React from "react";
import Container from "@/components/Container";
import Logo from "./Logo";
import Serach from "./Search";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <header className="sticky z-50 w-full border-b bg-white py-4 shadow-sm">
      <Container>
        <nav className="flex items-center justify-between gap-3">
          <Logo />
          <Serach />
          <UserMenu />
        </nav>
      </Container>
    </header>
  );
}
