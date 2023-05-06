import React from "react";
import Container from "../Container";
import Logo from "./Logo";
import Serach from "./Serach";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Serach />
          </div>
        </Container>
      </div>
    </div>
  );
}
