import React from "react";
import Container from "@/components/Container";
import Logo from "./Logo";
import Serach from "./Search";

export default function Navbar() {
  return (
    <header className="sticky w-full py-4 border-b bg-white z-50 shadow-sm">
      <Container>
        <nav className="flex justify-between items-center gap-3 md:gap-0">
          <Logo />
          <Serach />
        </nav>
      </Container>
    </header>
  );
}
